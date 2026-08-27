#!/usr/bin/env node
/* ===========================================================================
   extract-week-content.js — read the weekly planning files and turn them into
   the machine-readable content the lesson decks teach from.

       weeks/week-02.md                → Semester 1, Week 02
       weeks/S2 week-01 (7).md         → Semester 2, Week 07
       weeks/week-17.md / S2 …(17)     → revision, orientation and exam weeks

   The rule that governs this whole script is the one printed at the top of
   every week file:

       "Every number, example, and problem below stays exactly as printed."

   So the extractor never re-writes a sentence, never re-orders a number and
   never invents a problem. It *slices* the printed text into the shapes the
   deck can render (paragraph · list · table · worked step · item · answer
   choices), attaches the model that belongs to each item (place-value chart,
   number line, area model, fraction strip, clock, line plot …) and — only
   where the printed text makes the answer computable — records the answer so
   the boy gets feedback in seconds instead of days.

   Output: weeks/week-content.json (committed; stamped into the decks of the
   matching week folder as window.DAF_WEEK by scripts/stamp-weeks.js).

   Run: node scripts/extract-week-content.js [--quiet]
   =========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const W = require("./lib-weekmath");

const ROOT = path.resolve(__dirname, "..");
const WEEKS_DIR = path.join(ROOT, "weeks");
const OUT = path.join(WEEKS_DIR, "week-content.json");

/* ==========================================================================
   0 · text plumbing
   ========================================================================== */
/* Arabic-script runs stay in the teacher's printed file; the decks are
   English-only (guardrail G5a), so the two fixed classroom terms travel as
   their transliteration instead. */
const ARABIC_GLOSS = [
  [/آداب\s*صفنا/g, "Adaab Saffna — our class charter"],
  [/آداب/g, "Adaab (honouring knowledge)"]
];
function deArabic(s) {
  let out = String(s);
  for (const [re, g] of ARABIC_GLOSS) out = out.replace(re, g);
  /* any other Arabic script left: drop the run, keep the sentence readable */
  out = out.replace(/[\u0600-\u06FF][\u0600-\u06FF\s\u060C]*/g, "");
  return out.replace(/[ \t]{2,}/g, " ").replace(/\s+([.,;:])/g, "$1").trim();
}
function clean(s) {
  let out = W.flatFractions(deArabic(s)).replace(/\*\*/g, "").replace(/`/g, "").replace(/\*/g, "");
  out = out.replace(/\u2011/g, "-").replace(/\u00a0/g, " ")
    .replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
    .replace(/\u2013|\u2014/g, "-").replace(/\u2026/g, "...");
  return out.trim();
}

/* ---- inline markdown → the tiny run grammar the deck renders -------------
   run: {t:"t"|"b"|"i"|"c", v} so **bold**, *em* and `code` survive the trip
   into the slide without ever trusting raw HTML. */
function runs(s) {
  const src = String(s == null ? "" : s).replace(/\r/g, "");
  const out = [];
  let buf = "", i = 0;
  /* keep the spaces at the edges of a run: "360° ÷ " + "a" needs the gap, or
     an italic variable glues itself to the operator */
  const soft = (v) => W.flatFractions(deArabic(String(v == null ? "" : v)))
    .replace(/\u2011/g, "-").replace(/\u00a0/g, " ")
    .replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
    .replace(/\u2013|\u2014/g, "-").replace(/\u2026/g, "...")
    .replace(/[ \t]{2,}/g, " ");
  const flush = () => { if (soft(buf).trim()) out.push({ t: "t", v: soft(buf) }); buf = ""; };
  const add = (t, v) => { const c = soft(v); if (c.trim()) out.push({ t, v: c }); };
  while (i < src.length) {
    if (src.slice(i, i + 2) === "**") {
      const end = src.indexOf("**", i + 2);
      if (end > 0) { flush(); add("b", src.slice(i + 2, end)); i = end + 2; continue; }
    }
    if (src[i] === "`") {
      const end = src.indexOf("`", i + 1);
      if (end > 0) { flush(); add("c", src.slice(i + 1, end)); i = end + 1; continue; }
    }
    if (src[i] === "*" && !/\s/.test(src[i + 1] || "") && (!buf || /[\s([{]/.test(buf.slice(-1)))) {
      const end = src.indexOf("*", i + 1);
      if (end > i + 1) { flush(); add("i", src.slice(i + 1, end)); i = end + 1; continue; }
    }
    buf += src[i++];
  }
  flush();
  return out.length ? out : [{ t: "t", v: "" }];
}
function plain(s) {
  return clean(String(s).replace(/\*\*/g, "").replace(/`/g, "").replace(/\*/g, ""));
}

/* ==========================================================================
   1 · markdown → blocks
   ========================================================================== */
const isTableRow = (l) => /^\s*\|.*\|\s*$/.test(l);
const splitRow = (l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => clean(c));
const isSepRow = (l) => /^\s*\|[\s:|-]+\|\s*$/.test(l);

/* A block is one of: p · list · nums · table · code · kv · steps · quote */
function toBlocks(lines) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    if (!line.trim() || /^---+$/.test(line.trim())) { i++; continue; }

    /* a heading inside a section body (### Skills checklists under a ## Day) */
    const hh = line.match(/^#{1,6}\s+(.+)$/);
    if (hh) { blocks.push({ t: "head", text: clean(hh[1]) }); i++; continue; }
    /* fenced code — in these files that is a worked layout (algorithm steps,
       a竖式, a chart skeleton), so it becomes a mono work panel */
    if (/^```/.test(line.trim())) {
      const code = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) code.push(lines[i++]);
      i++;
      blocks.push({ t: "code", lines: code.map((l) => l.replace(/\t/g, "  ")) });
      continue;
    }
    /* table */
    if (isTableRow(line)) {
      const rows = [];
      let head = [];
      while (i < lines.length && isTableRow(lines[i])) {
        if (!isSepRow(lines[i])) {
          const cells = splitRow(lines[i]);
          if (!head.length) head = cells; else rows.push(cells);
        }
        i++;
      }
      blocks.push({ t: "table", head, rows });
      continue;
    }
    /* bullet list */
    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        let txt = lines[i].replace(/^\s*[-*+]\s+/, "").replace(/^\[[ xX]\]\s*/, "");
        i++;
        /* indented continuation lines belong to this bullet */
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*[-*+]\s+/.test(lines[i])) {
          txt += " " + lines[i].trim(); i++;
        }
        items.push({ text: clean(txt), runs: runs(txt) });
      }
      blocks.push({ t: "list", items });
      continue;
    }
    /* labelled paragraph — "**Step 1** Subtract ones." / "**Expanded form:** …" */
    const kv = line.match(/^\s*(\*\*[^*]+\*\*|[^:]{2,46}?)\s*[:.!?]?\s{1,3}(?=\S)(.*)$/);
    if (/^\s*\*\*Step\s*\d/i.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\*\*Step\s*\d/i.test(lines[i])) {
        const m = lines[i].match(/^\s*\*\*(Step\s*\d+)\*\*\s*:?\s*(.*)$/i);
        let label = m ? m[1] : "Step", text = m ? m[2] : lines[i];
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*\*\*Step\s*\d/i.test(lines[i])) {
          text += " " + lines[i].trim(); i++;
        }
        items.push({ label: clean(label), text: clean(text), runs: runs(text) });
      }
      blocks.push({ t: "steps", items });
      continue;
    }
    /* a bold lead-in that is a label, not a sentence: **Look Back!** … */
    const lead = line.match(/^\s*\*\*(.{2,40}?)\*\*\s*[:!]?\s*(.*)$/);
    if (lead && !lead[2].trim().match(/^[a-z]/)) {
      const label = lead[1], rest = lead[2];
      let bodyLines = [rest];
      i++;
      while (i < lines.length && lines[i].trim() && !/^(\||```|\s*[-*+]\s|\*\*)/.test(lines[i])) bodyLines.push(lines[i++]);
      const text = bodyLines.join(" ").trim();
      blocks.push({ t: "kv", label: clean(label.replace(/[.!?]$/, "")), text: clean(text), runs: runs(text) });
      continue;
    }
    /* paragraph (soft-wrapped) */
    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() &&
           !/^(\||```|\s*[-*+]\s|\s*\d+[.)]\s|#{1,6}\s|\*\*(Step|Look Back|Convince|Estimate|Expanded|Number name|Answer|Solution))/i.test(lines[i]) &&
           !/^\s*\*\*[^*]+\*\*\s*[:.!]?\s+\S/.test(lines[i])) {
      para.push(lines[i]); i++;
    }
    const text = para.join(" ").replace(/\s{2,}/g, " ").trim();
    if (!text) continue;
    blocks.push({ t: "p", text: clean(text), runs: runs(text) });
  }
  return blocks;
}

/* a run of numbered items (1. / 12) — an item may carry answer options,
   tick-boxes or its own little table (the True/False assessment grids) */
const OPT_RE = /^\s*(?:[-*+]\s*)?\(?([A-E])\)?[.)]?\s+(\S.{0,90}?)\s*$/;
/* "For 9-11, write each number name." / "In 3-6, subtract." — the printed
   direction that governs a RUN of bare items. Keep it attached to the items
   it covers; it is not ours to rephrase. */
function dirOf(line) {
  const m = clean(line).match(/^(?:For|In)\s*(?:problems|Items|Nos\.)?\s*(\d{1,3})\s*[-–—]\s*(\d{1,3})\s*[,.:]?\s*(.*)$/i);
  if (!m) return null;
  return { min: +m[1], max: +m[2], text: clean(m[3]) };
}
function splitItems(lines) {
  const items = [];
  const stem = [];
  let i = 0;
  const itemRe = /^\s*(\d{1,3})[.)]\s+(.*)$/;
  const stopRe = /^(\||```|#{1,6}\s|\s*[-*+]\s*\(?[A-E]\)?[.)]?\s)|\*\*\s*(Do You|Look Back|Convince)/i;
  const dirs = [];
  while (i < lines.length) {
    const l = lines[i];
    const m = l.match(itemRe);
    if (!m) {
      if (l.trim() && !isTableRow(l) && !/^[\s]*[-*_]{3,}\s*$/.test(l)) {
        const d = dirOf(l);
        if (d) dirs.push(d); else stem.push(l);
      }
      i++; continue;
    }
    const n = +m[1];
    let body = m[2];
    i++;
    while (i < lines.length) {
      const nx = lines[i];
      if (!nx.trim() || itemRe.test(nx) || stopRe.test(nx.trim()) || /^\s*\*\*[^*]+\*\*\s*[:!]?/.test(nx) && !body.trim()) break;
      if (isTableRow(nx) || /^```/.test(nx.trim()) || /^#{1,6}\s/.test(nx)) break;
      if (/^\s*[-*+]\s/.test(nx)) { body += " " + nx.replace(/^\s*[-*+]\s*/, "").trim(); i++; continue; }
      body += " " + nx.trim(); i++;
    }
    /* options / tick-boxes / a table that belongs to this item */
    const options = [], boxes = [];
    let table = null;
    while (i < lines.length) {
      if (!lines[i].trim()) {
        /* a blank line then a table still belongs to the item */
        let j = i;
        while (j < lines.length && !lines[j].trim()) j++;
        if (j < lines.length && isTableRow(lines[j]) && !options.length && !table) { i = j; continue; }
        if (j < lines.length && (OPT_RE.test(lines[j]) || /^\s*[-*+]\s*\[[ xX]\]/.test(lines[j]))) { i = j; continue; }
        break;
      }
      const om = lines[i].match(OPT_RE);
      const bm = lines[i].match(/^\s*[-*+]\s*\[[ xX]\]\s*(.+)$/);
      if (isTableRow(lines[i]) && !options.length && !table) {
        const rows = []; let head = [];
        while (i < lines.length && isTableRow(lines[i])) {
          if (!isSepRow(lines[i])) { const cells = splitRow(lines[i]); if (!head.length) head = cells; else rows.push(cells); }
          i++;
        }
        table = { head, rows }; continue;
      }
      if (om && !/^\s*\d+[.)]/.test(lines[i])) { options.push({ v: om[1], text: clean(om[2]) }); i++; continue; }
      if (bm) { boxes.push(clean(bm[1])); i++; continue; }
      break;
    }
    let work = null;
    {
      let j = i;
      while (j < lines.length && !lines[j].trim()) j++;
      if (j < lines.length && /^```/.test(lines[j].trim())) {
        const code = []; let k = j + 1;
        while (k < lines.length && !/^```/.test(lines[k].trim())) code.push(lines[k++]);
        if (k < lines.length) { i = k + 1; work = code; }
      }
    }
    const item = makeItem(n, body, options.length ? options : null, boxes.length ? boxes : null);
    if (work) { item.work = work; solveWork(item); }
    /* the printed direction that governs this item — a numbered range wins,
       otherwise a loose instruction line right above a bare item */
    const bare = /^[\s\d.,+\-()×÷/½⅓⅔¼¾⁄₀-₹]*$/.test(W.flatFractions(item.text));
    const ranged = dirs.find((d) => d.min >= 0 && n >= d.min && n <= d.max);
    if (ranged) item.dir = ranged.text;
    else if (bare) {
      const last = [...stem].reverse().find((s) => /[.!?]\s*$/.test(s.trim()));
      if (last && /write|find|subtract|add|multiply|divide|round|compare|complete|estimate|order|identify|select/i.test(last)) item.dir = clean(last).replace(/\*\*/g, "");
    }
    if (item.dir && !item.text.trim().match(/[a-z]{4}/i)) item.hay = item.dir + " " + item.text;
    else if (item.dir) item.hay = item.dir + " · item " + n + ": " + item.text;
    if (item.dir) solveItem(item), deriveFigure(item);
    if (table) { item.table = table; item.fig = item.fig || figureForTable(table); }
    solveTable(item);
    items.push(item);
  }
  return { stem: stem.filter((x) => x.trim()).map((x) => clean(x)).join(" "), items };
}

const TAG_RE = /^\s*\*\*([^*]{2,46})\*\*\s*[:.]?\s*/;
function makeItem(n, body, options, boxes) {
  const bare0 = false;
  let tag = null, text = String(body).trim();
  const t = text.match(TAG_RE);
  if (t) {
    const cand = clean(t[1]);
    if (!/^(Step|Look Back|Estimate|Answer|Do You)/i.test(cand)) { tag = cand; text = text.slice(t[0].length); }
  }
  const item = { n, tag, text: clean(text), runs: runs(text) };
  if (options && options.length) item.options = options;
  if (boxes && boxes.length) item.checkbox = boxes;
  const num = text.match(/\b([\d][\d,]*(?:\.\d+)?)\b/g);
  if (num) item.numbers = num.map((s) => s.replace(/,/g, ""));
  solveItem(item);
  deriveFigure(item);
  return item;
}

/* ==========================================================================
   2 · answers that the printed text already contains
   ========================================================================== */
/* the number the item is about: its own text first, then the printed direction */
function targetNumber(item, hay) {
  const own = item.text.replace(/,/g, "").match(/(?<![\d.])(\d{2,7})(?![\d.])/);
  if (own) return +own[1];
  const m = hay.match(/(?<![\d.,])\d{1,3}(?:,\d{3})+(?![\d.,])|(?<![\d.])\d{2,7}(?![\d.])/);
  return m ? +m[0].replace(/,/g, "") : null;
}
function solveTable(item) {
  if (!item.table) return;
  const rows = item.table.rows || [];
  const solved = [];
  let ok = 0;
  for (const r of rows) {
    const cell = (r || []).find((c) => /[<>]|\u2610|=/i.test(String(c)));
    if (!cell) continue;
    const a = String(cell).match(/([\d.,]+)\s*([<>])\s*([\d.,]+)/);
    if (!a) { solved.push(null); continue; }
    const x = parseFloat(a[1].replace(/,/g, "")), y = parseFloat(a[3].replace(/,/g, ""));
    if (isNaN(x) || isNaN(y)) { solved.push(null); continue; }
    const truth = a[2] === ">" ? x > y : x < y;
    ok++; solved.push({ truth, note: W.group(x) + (x > y ? " > " : x < y ? " < " : " = ") + W.group(y) });
  }
  if (ok === rows.length && ok > 0) {
    item.tableSolved = solved;
    item.answer = rows.map((r, i) => (solved[i] ? (solved[i].truth ? "True" : "False") : "?")).join(" · ");
    item.answerNote = "read the comparison, then decide True or False";
  }
}
function solveItem(item) {
  const text = item.text || "";
  const hay = item.hay || text;
  const low = hay.toLowerCase();
  const set = (ans, note) => { if (ans) { item.answer = String(ans); item.answerNote = note || "computed from the printed numbers"; } };
  let m;
  /* only ever answer the number the item is really about: one number in the
     line, or a bare item carrying the printed direction ("7,622" under
     "Write each number in expanded form.") */
  const nums = (hay.match(/\b\d[\d,.]*/g) || []).filter((x) => /[\d]/.test(x));
  const bareItem = !/[a-z]/i.test(item.text);
  const single = nums.length === 1;
  const answerable = bareItem || single;

  /* expanded form */
  if (answerable && /expanded form/i.test(hay)) {
    m = hay.match(/write\s+([\d,]+)\s+in expanded form/i);
    const n = m ? +m[1].replace(/,/g, "") : targetNumber(item, hay);
    if (n && n >= 10) return set(W.expandedForm(n), "expanded form of the printed number");
  }
  /* number name */
  if (answerable && /number names?/i.test(hay) && !/expanded/i.test(hay)) {
    m = hay.match(/write\s+([\d,]+)\s+(?:using|in|with)\s+number names?/i);
    const n = m ? +m[1].replace(/,/g, "") : targetNumber(item, hay);
    if (n != null && (bareItem || hay.indexOf(W.group(n)) >= 0)) return set(W.numberName(n), "number name of the printed number");
  }

  /* comparison with a box: 2,643 [?] 2,643 */
  if (/☐|⬜/.test(text) && bareItem) {
    const cmp = (/☐|⬜/.test(text) ? text : hay).match(/([\d][\d,]*(?:\.\d+)?(?:\s*\+\s*[\d,]+)*)\s*(?:☐|⬜|\[\s*\])\s*([\d][\d,]*(?:\.\d+)?(?:\s*\+\s*[\d,]+)*)/);
    if (cmp) {
      const a = sideValue(cmp[1]), b = sideValue(cmp[2]);
      if (a != null && b != null) {
        const sym = a > b ? ">" : a < b ? "<" : "=";
        return set(plainOf(a) + " " + sym + " " + plainOf(b) + (a === b ? "  (equal)" : ""),
          "compare the two values as printed");
      }
    }
  }

  /* rounding */
  m = hay.match(/round\s+([\d,]+)\s+to the nearest\s+(ten|hundred|thousand|ten thousands?|hundred thousands?|millions?)/i) ||
      hay.match(/([\d,]+)\s+(?:rounded to|to) the nearest\s+(ten|hundred|thousand|ten thousands?|hundred thousands?|millions?)/i);
  if (m) {
    const n = +m[1].replace(/,/g, "");
    const place = m[2].toLowerCase().replace(/s$/, m[2].trim() === "tens" ? "s" : "");
    const r = W.roundTo(n, place === "ten thousand" ? 1e4 : place === "hundred thousand" ? 1e5 : W.PLACE_VALUE[place]);
    if (r != null) return set(W.group(r), "rounded with the 5-or-greater rule on the printed number line");
  }

  /* which digit sits in a place */
  m = hay.match(/what digit is in the\s+(ones|tens|hundreds|thousands|ten thousands|hundred thousands|millions?)\s+place in\s+([\d,]+)/i);
  if (m) {
    const s = m[2].replace(/,/g, "");
    const p = W.PLACE_VALUE[m[1]] || W.PLACE_VALUE[m[1].replace(/s$/, "")] ||
              (m[1].indexOf("ten thousand") >= 0 ? 1e4 : m[1].indexOf("hundred thousand") >= 0 ? 1e5 : 0);
    if (p) {
      const digit = Math.floor(+s / p) % 10;
      return set(digit + " (worth " + W.group(digit * p) + ")", "read the digit out of the printed number");
    }
  }

  /* ten-times relationships */
  m = hay.match(/how many times greater is the\s*(\d)\s*in\s*([\d,]+)\s*than the\s*(\d)\s*in\s*([\d,]+)/i);
  if (m) {
    const a = placeValue(+m[1], m[2]), b = placeValue(+m[3], m[4]);
    if (a && b && a.value && b.value && a.value % b.value === 0) {
      return set(a.value / b.value + " times greater (" + W.group(a.value) + " vs " + W.group(b.value) + ")",
        "same digit, two places — read the places off the printed numbers");
    }
  }
  m = text.match(/is the value of the\s*(\d)\s*in the\s+(\w+)\s+place ten times as great as the value of the\s*(\d)\s*in the\s+(\w+)\s+place/i);
  if (m) {
    const p1 = W.PLACE_VALUE[m[2]], p2 = W.PLACE_VALUE[m[4]];
    if (p1 && p2) {
      const v1 = +m[1] * p1, v2 = +m[3] * p2;
      const yes = v1 === v2 * 10;
      return set((yes ? "Yes - " : "No - ") + W.group(v1) + " is " + (v2 ? W.group(round(v1 / v2)) : "?") +
                 " times " + W.group(v2) + "; the places differ by 10 only when the digits match" +
                 (p1 === p2 * 10 ? " (hundreds IS ten tens here)" : ""),
        "compare the two values, not the two digits");
    }
  }

  /* unit conversion: "3 ft = ___ in" */
  const conv = W.convert(hay);
  if (conv && conv.value != null) {
    return set(plainOf(conv.value) + " " + conv.to, "printed equivalence: 1 " + conv.from + " = " + plainOf(convTable(conv)) + " " + conv.to);
  }

  /* clock / elapsed time */
  const times = text.match(/\b\d{1,2}:\d{2}\s*(?:a\.m\.|p\.m\.|am|pm)?/gi);
  if (times && /elapsed|how long|end|finish|start/i.test(text)) {
    const a = W.clockToMin(times[0]);
    if (a != null) {
      const mins = elapsedMinutes(text);
      if (mins != null) return set(W.minToClock(a + (/(end|finish|after)/i.test(text) ? mins : -mins), suffixOf(times[0])),
        "hop the hours then the minutes on the printed clock");
    }
  }

  /* rectangle area / perimeter with both dimensions printed */
  const dim = text.match(/(?:length|is)\s*([\d.]+)\s*(ft|feet|m|meter|meter|meters|in|inch|inches|cm|yd|yard|miles?|units?)[^0-9]{0,24}?(?:and|,)?\s*(?:width|is)?\s*([\d.]+)\s*(ft|feet|m|meter|meters|in|inch|inches|cm|yd|yard|miles?|units?)/i);
  if (dim && /area|perimeter|tape|fence|grass|cover/i.test(text)) {
    const L = +dim[1], Wd = +dim[3];
    const area = L * Wd, per = 2 * (L + Wd);
    const unit = dim[2].replace(/s$/, "");
    if (/area/i.test(text) && !/perimeter/i.test(text)) return set(W.group(round(area)) + " square " + unit, "area = length x width");
    if (/perimeter/i.test(text) && !/area/i.test(text)) return set(W.group(round(per)) + " " + unit + "s", "perimeter = 2 x (length + width)");
    return set("area " + W.group(round(area)) + " sq " + unit + ", perimeter " + W.group(round(per)) + " " + unit + "s", "area = L x W · perimeter = 2(L + W)");
  }

  /* money: "3 items at SAR 1.25; change from SAR 5" */
  m = text.match(/(\d+)\s+(?:items?|books?|sandwiches?|tickets?|pens?|bags?)\s+at\s+SAR\s*([\d.]+)/i);
  if (m) {
    const total = +m[1] * +m[2];
    const pay = (text.match(/change from\s+SAR\s*([\d.]+)/i) || [])[1];
    if (pay) return set("total SAR " + money(total) + ", change SAR " + money(+pay - total), "multiply, then subtract from the money handed over");
    return set("SAR " + money(total), "price x how many");
  }

  /* a question that ends in its own computation */
  if (/what is the (difference|sum|product|quotient)|how much is|find the (difference|sum|product|quotient)/i.test(hay)) {
    const tail = hay.match(/([\d][\d,]*(?:\.\d+)?)\s*[\u2212\u00d7\u00f7+\-*\/]\s*([\d][\d,]*(?:\.\d+)?)(?![\d.])/);
    if (tail) {
      const ex = W.readExpr(tail[0].replace(/,/g, ""));
      if (ex && ex.value) {
        const v = ex.value;
        const txt = v.d != null && v.d !== 1 ? W.fmtR(v) : (v.d === 1 ? W.group(v.n) : W.group(Math.round(v.v * 1000) / 1000));
        return set(txt, "the computation the item asks for, worked");
      }
    }
  }

  /* a bare computation: "154 - 89", "8 × 700", "3/8 + 2/8" */
  let ex = W.readExpr(text.replace(/^(?:Estimate|Use mental math|Find|Subtract|Add|Multiply|Divide|Solve|Complete)\s*:?/i, ""));
  if (!ex) ex = W.readExpr(hay.replace(/^(?:Estimate|Use mental math|Find|Subtract|Add|Multiply|Divide|Solve|Complete)\s*:?/i, ""));
  if (ex && ex.value) {
    const isDiv = /÷/.test(ex.expression);
    if (isDiv && ex.value.d != null && ex.value.d !== 1) {
      const q = Math.trunc(ex.value.n / ex.value.d);
      const rem = ex.value.n - q * ex.value.d;
      const whole = rem === 0 ? "remainder 0" : "R " + rem;
      return set(W.group(q) + " " + whole, "quotient and remainder from the printed division");
    }
    return set(plainOf(ex.value), "the printed computation, worked");
  }
}
function round(n) { return Math.round(n * 1000) / 1000; }
function money(n) { return (Math.round(n * 100) / 100).toFixed(2); }
function plainOf(v) {
  if (v && typeof v === "object" && (v.d != null || v.v != null)) return W.fmtR(v.d != null && v.d !== 1 ? v : R0(v), {});
  return typeof v === "number" ? (/^\d+$/.test(String(v)) ? W.group(v) : String(round(v))) : String(v);
}
function R0(v) { return Number.isInteger(v) ? { n: v, d: 1, v } : null; }
function sideValue(s) {
  const parts = s.split("+").map((p) => parseFloat(p.replace(/[^0-9.]/g, "")));
  if (parts.some((x) => isNaN(x))) return null;
  return parts.reduce((a, b) => a + b, 0);
}
function placeValue(digit, numStr) {
  const s = numStr.replace(/,/g, "");
  if (!new RegExp(digit).test(s)) return null;
  for (let i = 0; i < s.length; i++) {
    if (+s[i] === digit) return { digit, value: digit * Math.pow(10, s.length - 1 - i) };
  }
  return null;
}
function convTable(conv) {
  for (const fam of W.UNIT_FAMILIES) {
    if (fam.table[conv.from.toLowerCase().replace(/\.$/, "")] != null) {
      return fam.table[conv.from.toLowerCase().replace(/\.$/, "")] / fam.table[conv.to.toLowerCase().replace(/\.$/, "")];
    }
  }
  return 1;
}
function elapsedMinutes(text) {
  let m = text.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\s*(?:and\s*)?(\d+)?\s*(?:minutes?|mins?)?/i);
  if (m) return Math.round(+m[1] * 60 + (m[2] ? +m[2] : 0));
  m = text.match(/(\d+)\s*(?:minutes?|mins?)/i);
  if (m) return +m[1];
  m = text.match(/(\d+)\s*(?:hours?|hrs?)/i);
  if (m) return +m[1] * 60;
  m = text.match(/(\d+)\s*\/\s*(\d+)\s*(?:of an\s*)?hour/i);
  if (m) return Math.round(+m[1] / +m[2] * 60);
  return null;
}
function suffixOf(t) { const m = String(t).match(/(a\.m\.|p\.m\.|am|pm)/i); return m ? m[1] : ""; }

/* ==========================================================================
   3 · the model that belongs to a printed item
   ========================================================================== */
function deriveFigure(item) {
  const text = item.text || "";
  const hay = item.hay || text;
  const bare = !/[a-z]{4,}/i.test(text.replace(/SAR|ft|feet|m\b|in\b|cm|yd|hr|oz|lb|gal|qt|pt|cup|kg|g\b|L\b|ml\b/i, ""));
  const nums = (text.replace(/,/g, "").match(/\b\d+(?:\.\d+)?\b/g) || []).map(Number);
  const fracRe = /(\d+)\s*\/\s*(\d+)/g;
  const fracs = [];
  let fm;
  while ((fm = fracRe.exec(W.flatFractions(text)))) fracs.push({ n: +fm[1], d: +fm[2] });

  /* comparison: two numbers and a box / "compare" */
  if (/☐|⬜/.test(text) || /^compare\b/i.test(text)) {
    const a = text.replace(/,/g, "").match(/(\d+(?:\.\d+)?)\s*(?:☐|⬜|\[\s*\])/);
    const b = text.replace(/,/g, "").match(/(?:☐|⬜|\[\s*\])\s*(\d+(?:\.\d+)?)/);
    if (a && b) return (item.fig = { kind: "compare", a: +a[1], b: +b[1] });
  }
  /* rounding */
  let m = text.match(/round\s+([\d,]+)\s+to the nearest\s+(ten|hundred|thousand|ten thousands?|hundred thousands?|millions?)/i);
  if (m) {
    const v = +m[1].replace(/,/g, "");
    const p = W.PLACE_VALUE[m[2].toLowerCase().replace(/s$/, "")] || W.PLACE_VALUE[m[2].toLowerCase()];
    if (p) {
      const lo = Math.floor(v / p) * p;
      return (item.fig = { kind: "round", value: v, lo, hi: lo + p, place: m[2].toLowerCase() });
    }
  }
  /* expanded form / place value of a big number */
  m = text.match(/\b(\d{4,7})(?:,\d{3})?\b/);
  if (/expanded form|place-value chart|digit in the|value of the digit|which place|standard form/i.test(hay) && m) {
    const digits = (text.match(/\b\d[\d,]{2,}\b/) || [""])[0].replace(/,/g, "");
    if (digits.length >= 3) return (item.fig = { kind: "pv", digits });
  }
  /* fractions on the page */
  if (fracs.length) {
    if (/number line|benchmark/i.test(hay)) return (item.fig = { kind: "fracline", fracs });
    if (/mixed|whole number of/i.test(hay)) return (item.fig = { kind: "mixed", fracs });
    return (item.fig = { kind: "frac", fracs });
  }
  /* decimals */
  m = text.match(/\b\d*\.?\d+\b/g);
  if (m && /\b0\.\d+\b|\b\d+\.\d+\b/.test(hay) && /decimal|tenths|hundredths|money|SAR/i.test(hay)) {
    const v = parseFloat((text.match(/\b\d+\.\d+\b/) || [0])[0]);
    if (v > 0) return (item.fig = { kind: "dec", value: v });
  }
  /* angles */
  m = text.match(/(\d{1,3})\s*(?:°|degrees?)/i);
  if (m) return (item.fig = { kind: "angle", deg: +m[1], label: text.slice(0, 60) });
  if (/ray|line segment|parallel|perpendicular|vertex|point\b/i.test(hay) && /line|ray|segment|parallel|perpendicular/i.test(hay)) {
    const kind = /parallel/i.test(text) ? "parallel" : /perpendicular/i.test(text) ? "perpendicular"
      : /ray/i.test(text) ? "ray" : /segment/i.test(text) ? "segment" : "line";
    return (item.fig = { kind: "lines", lineKind: kind });
  }
  if (/symmetr/i.test(hay)) return (item.fig = { kind: "symmetry" });
  if (/triangle|quadrilateral|square|rectangle|rhombus|trapezoid|pentagon|hexagon/i.test(hay) && /classif|side|angle|shape/i.test(hay)) {
    const name = (hay.match(/equilateral|isosceles|scalene|right|square|rectangle|rhombus|trapezoid|parallelogram/i) || ["shape"])[0];
    return (item.fig = { kind: "shape", name: name.toLowerCase() });
  }
  /* area / perimeter / volume */
  m = text.match(/(\d+(?:\.\d+)?)\s*(?:ft|feet|m|meter|meters|in|inch|inches|cm|yd|yards|units?)\b[^0-9]{0,20}?(?:by|x|×|and)\s*(\d+(?:\.\d+)?)\s*(?:ft|feet|m|meter|meters|in|inch|inches|cm|yd|yards|units?)/i);
  if (m) {
    if (/volume|cube|cubic/i.test(hay)) return (item.fig = { kind: "cube", L: +m[1], W: +m[2], H: +(text.match(/(\d+)\s*(?:ft|m|in|units?)[^0-9]*high/i) || [0, m[1]])[1] });
    return (item.fig = { kind: "rect", long: +m[1], short: +m[2], mode: /area/i.test(hay) ? "area" : /perimeter/i.test(hay) ? "perimeter" : "both" });
  }
  /* multiplication → area model */
  m = text.match(/\b(\d{1,4})\s*[×x*]\s*(\d{1,4})\b/i);
  if (m && (bare || /multiply|product|area model|array|partial product|times/i.test(text))) {
    return (item.fig = { kind: "mult", a: +m[1], b: +m[2] });
  }
  /* division → partial quotients */
  m = text.replace(/,/g, "").match(/\b(\d{2,6})\s*[÷/]\s*(\d{1,2})\b/);
  if (m && bare) return (item.fig = { kind: "div", a: +m[1], b: +m[2] });
  /* a bare computation → the column algorithm; a worded one → the bar model */
  m = text.replace(/[−–—]/g, "-").replace(/,/g, "").match(/\b(\d{1,7}(?:\.\d+)?)\s*([+\-])\s*(\d{1,7}(?:\.\d+)?)\b/);
  if (m && bare) {
    return (item.fig = { kind: "col", a: +m[1], b: +m[3], op: m[2] === "-" ? "-" : "+", dec: /\.\d/.test(m[1] + m[3]) });
  }
  /* money / SAR → the strip model */
  const amounts = (text.match(/SAR\s*([\d.]+)/g) || []).map((s) => parseFloat(s.replace(/[^\d.]/g, "")));
  if (amounts.length >= 2 && /total|change|altogether|bought|paid|spend|cost|left/i.test(text)) {
    return (item.fig = { kind: "strip", parts: amounts.map((v) => ({ v, label: String(v) })), total: null });
  }
  /* clock */
  const clock = text.match(/\b(\d{1,2}):(\d{2})\b/);
  if (clock && /time|clock|elapsed|a\.m\.|p\.m\.|o'?clock/i.test(hay)) {
    return (item.fig = { kind: "clock", h: +clock[1], m: +clock[2] });
  }
  /* factors / multiples */
  m = hay.match(/\bfactors? of\s+(\d{1,3})\b|\bmultiples? of\s+(\d{1,3})\b/i);
  if (m) return (item.fig = { kind: "factor", n: +(m[1] || m[2]), mode: /multiples/i.test(hay) ? "multiples" : "factors" });
  /* sequences / patterns */
  m = text.match(/\b(\d{1,4})\s*,\s*(\d{1,4})\s*,\s*(\d{1,4})\b(?:\s*,\s*(\d{1,4}))?(?:\s*,\s*(\d{1,4}))?/);
  if (m && /pattern|sequence|rule|next|term/i.test(hay)) {
    return (item.fig = { kind: "seq", nums: m.slice(1).filter((x) => x != null && x !== "").map(Number) });
  }
  if (/start\s*\(?\s*(\d+)\s*\)?\s*,?\s*(add|subtract)\s+(\d+)/i.test(text)) {
    const sm = text.match(/start\s*\(?\s*(\d+)\s*\)?\s*,?\s*(add|subtract)\s+(\d+)/i);
    return (item.fig = { kind: "seq", rule: { start: +sm[1], op: /add/i.test(sm[2]) ? "+" : "-", step: +sm[3] } });
  }
  /* line plots from a data table are attached at the table level */
  if (/(line plot|data|scores|measured)/i.test(hay) && nums.length >= 3) {
    return (item.fig = { kind: "bars", nums });
  }
  /* generic word-problem bar model: three or four printed amounts */
  if (nums.length >= 3 && /(how many|how much|more than|fewer|total|left|remain|each|times as many)/i.test(hay)) {
    return (item.fig = { kind: "bars", nums: nums.slice(0, 5) });
  }
  return null;
}

/* the printed working with one box in it (634 − 2☐7 = 337): try every digit
   and keep the one the printed equality accepts. Nothing else is inferred. */
function solveWork(item) {
  const raw = (item.work || []).join("\n");
  if (!/[\u2610\u25a1]/.test(raw) && !/\[\s*\]/.test(raw)) return;
  const digits = raw.replace(/[\u2610\u25a1]/g, "\u2610").replace(/\[\s*\]/g, "\u2610");
  const rows = digits.split("\n").map((r) => r.trim()).filter((r) => /\d/.test(r));
  if (rows.length < 2) return;
  for (let d = 0; d <= 9; d++) {
    const filled = rows.map((r) => r.split("\u2610").join(String(d)));
    const eq = filled.find((r) => /=/.test(r));
    if (!eq) continue;
    const sides = eq.split("=").map((x) => x.trim());
    if (sides.length !== 2) continue;
    const a = evalSide(sides[0]), b = evalSide(sides[1]);
    if (a == null || b == null) continue;
    if (Math.abs(a - b) < 1e-9) {
      item.answer = String(d);
      item.answerNote = "the only digit that makes the printed working true";
      item.workSolved = filled;
      return;
    }
  }
  /* the竖式 form: top, one operated line, the rule, then the answer underneath */
  if (rows.length >= 3 && rows.slice(1, rows.length - 1).join("").match(/^\s*[\u2212+\-\u00d7\u00f7*]/)) {
    const top = rows[0], bottom = rows[rows.length - 1];
    const mid = rows.slice(1, rows.length - 1).join(" ").trim();
    const op = /^\s*([\u2212+\-\u00d7\u00f7*])/.exec(mid)[1];
    const operand = mid.replace(/^\s*[\u2212+\-\u00d7\u00f7*]\s*/, "").replace(/\s+/g, "");
    const want = op === "+" ? "sum" : op;
    for (let d = 0; d <= 9; d++) {
      const a = numSide(top.replace(/\s+/g, "")), b = numSide(operand.split("\u2610").join(String(d))), c = numSide(bottom.replace(/\s+/g, ""));
      if (a == null || b == null || c == null) continue;
      const ok = op === "+" ? a + b === c : op === "-" || op === "\u2212" ? a - b === c
        : op === "*" || op === "\u00d7" ? a * b === c : b !== 0 && a / b === c;
      if (ok) {
        item.answer = String(d);
        item.answerNote = "the only digit that makes the printed column true";
        item.workSolved = [top, mid.replace(operand, operand.split("\u2610").join(String(d))), bottom];
        return;
      }
    }
  }
}
function numSide(s) {
  const t = String(s).replace(/[^\d.]/g, "");
  return t && isFinite(+t) ? +t : null;
}
function evalSide(side) {
  const m = String(side).replace(/\s+/g, " ").match(/^([\d.,]+)\s*([-+\u2212\u00d7\u00f7*/])\s*([\d.,]+)$/);
  if (!m) return numSide(side);
  const a = parseFloat(m[1].replace(/,/g, "")), b = parseFloat(m[3].replace(/,/g, ""));
  const op = m[2] === "\u2212" ? "-" : m[2] === "\u00d7" ? "*" : m[2] === "\u00f7" ? "/" : m[2];
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  return b ? a / b : null;
}

/* figures for tables and code panels — the printed data becomes the picture */
function figureForTable(tbl) {
  const rows = tbl.rows || [];
  const head = tbl.head || [];
  const numeric = rows.map((r) => r.map((c) => {
    const n = parseFloat(String(c).replace(/[^0-9.\-]/g, ""));
    return isNaN(n) ? null : n;
  }));
  const allNum = numeric.every((r) => r.filter((x) => x != null).length === r.length);
  /* line plot: first column is a fraction label, last column a count */
  const fracCol = rows.filter((r) => /\d+\s*\/\s*\d+/.test(String(r[0])));
  if (fracCol.length >= 2 && head.length === 2 && allNum) {
    const dens = fracCol.map((r) => +String(r[0]).split("/")[1]);
    const den = dens.sort((a, b) => b - a)[0] || 1;
    const counts = rows.map((r) => {
      const parts = String(r[0]).match(/(\d+)\s*\/\s*(\d+)/);
      if (!parts) return 0;
      return { at: (+parts[1] * den) / +parts[2], count: +(r[r.length - 1].match(/\d+/) || [0, 0])[0] };
    });
    return { kind: "lineplot", den, counts };
  }
  if (allNum && rows.length >= 2 && rows[0].length >= 2 && /hour|time|day|week|x|input/i.test(head.join(" "))) {
    return { kind: "plotpoints", rows: numeric, head };
  }
  if (allNum) return { kind: "bars", nums: numeric.map((r) => r[r.length - 1]).filter((v) => v != null).slice(0, 6) };
  return null;
}

/* a section with no item-level model still deserves the board picture: the
   printed prose carries the numbers, so read the first math-looking line out
   of it and hand it to the same figure reader the items use. */
function figureFromProse(text, code) {
  const t = String(text || "");
  const lines = t.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const mathish = (l) => {
    const bare = l.replace(/[a-z]{3,}/gi, "").replace(/\*\*/g, "");
    return /\d/.test(bare) && /[=+\-−×÷<>:\/]/.test(bare);
  };
  const pick = lines.find((l) => l.length < 160 && mathish(l))
    || lines.find((l) => l.length < 120 && /\d/.test(l))
    || lines.sort((a, b) => b.length - a.length)[0] || "";
  const fake = { text: clean(pick), numbers: (pick.match(/\d[\d,.]*/g) || []).map((x) => x.replace(/,/g, "")) };
  deriveFigure(fake);
  if (fake.fig) return fake.fig;
  /* nothing matched: give the topic's own model, with the numbers on the page */
  const nums = (t.replace(/,/g, "").match(/\b\d+(?:\.\d+)?\b/g) || []).map(Number).filter((x) => isFinite(x));
  const topic = parseInt(String(code).split("-")[0], 10);
  const fr = (t.match(/(\d+)\s*\/\s*(\d+)/) || []).slice(1).map(Number);
  switch (topic) {
    case 1: return nums.length ? { kind: "pv", digits: String(Math.max.apply(null, nums.filter((n) => n >= 100 && n <= 9999999)) || 0) } : null;
    case 2: return nums.length >= 2 ? { kind: "col", a: nums[0], b: nums[1], op: /subtract|difference|left|more/i.test(t) ? "-" : "+" } : null;
    case 3: case 4: return nums.length >= 2 ? { kind: "mult", a: nums[0], b: nums[1] } : null;
    case 5: return nums.length >= 2 ? { kind: "div", a: Math.max.apply(null, nums), b: Math.min.apply(null, nums.filter((n) => n > 1)) || 2 } : null;
    case 6: return nums.length >= 2 ? { kind: "bars", nums: nums.slice(0, 5) } : null;
    case 7: return nums.length ? { kind: "factor", n: Math.min(60, nums.find((n) => n >= 2 && n <= 60) || 12), mode: /multiple/i.test(t) ? "multiples" : "factors" } : null;
    case 8: case 9: case 10:
      if (fr.length === 2) return { kind: /number line|benchmark/i.test(t) ? "fracline" : "frac", fracs: [{ n: fr[0], d: fr[1] }] };
      return null;
    case 11: return null;
    case 12: { const d = (t.match(/\b\d+\.\d+\b/) || [])[0]; return d ? { kind: "dec", value: parseFloat(d) } : null; }
    case 13: return nums.length >= 2 ? { kind: "rect", long: nums[0], short: nums[1], mode: /perimeter/i.test(t) ? "perimeter" : "area" } : null;
    case 14: return nums.length >= 3 ? { kind: "seq", nums: nums.slice(0, 6) } : null;
    case 15: { const deg = (t.match(/(\d{1,3})\s*(?:°|degrees?)/i) || [])[1]; return deg ? { kind: "angle", deg: +deg } : null; }
    case 16: { const nm = (t.match(/equilateral|isosceles|scalene|square|rectangle|rhombus|trapezoid|parallelogram|pentagon|hexagon/i) || [])[0];
      return /symmetr/i.test(t) ? { kind: "symmetry" } : (nm ? { kind: "shape", name: nm.toLowerCase() } : (degTest(t))); }
    case 17: return nums.length >= 3 ? { kind: "cube", L: nums[0], W: nums[1], H: nums[2] } : null;
    default: return null;
  }
}
function degTest(t) {
  const m = t.match(/(\d{1,3})\s*(?:°|degrees?)/i);
  return m ? { kind: "angle", deg: +m[1] } : null;
}
function attachSectionFigures(lesson) {
  Object.keys(lesson.sections || {}).forEach((k) => {
    const sec = lesson.sections[k];
    if (!sec || sec.fig) return;
    const has = (sec.items || []).concat(sec.understand || [], sec.knowHow || []).some((x) => x.fig)
      || (sec.blocks || []).some((b) => b.fig);
    if (has) return;
    const prose = (sec.blocks || []).map((b) => (b.label ? b.label + ": " : "") + (b.text || "")
      + (b.lines ? "\n" + b.lines.join("\n") : "")
      + (b.rows ? "\n" + b.rows.map((r) => r.join(" ")).join("\n") : "")
      + (b.items ? "\n" + b.items.map((x) => x.text).join("\n") : "")).join("\n")
      + "\n" + ((sec.items || []).concat(sec.knowHow || [], sec.understand || []).map((x) => x.text).join("\n"));
    const fig = figureFromProse(prose, lesson.code);
    if (fig) sec.fig = fig;
  });
}

/* ==========================================================================
   4 · a lesson block, as printed
   ========================================================================== */
const LESSON_RE = /^Lesson\s+(\d+)-(\d+)\s*[—-]\s*(.+)$/;
const SECTION_MAP = {
  "solve & share": "solveShare",
  "essential question": "essentialQuestion",
  "essential questions": "essentialQuestion",
  "visual learning bridge": "bridge",
  "guided practice": "guided",
  "independent practice": "independent",
  "practice": "guided",
  "problem solving": "problemSolving",
  "problem solving and hot": "problemSolving",
  "assessment practice": "assessment",
  "homework / fluency": "homework",
  "vocabulary check": "vocabulary",
  "vocabulary": "vocabulary",
  "quick practice": "quickPractice",
  "must-know": "mustKnow",
  "exit ticket": "exitTicket",
  "performance task": "performanceTask",
  "stem": "stem"
};
function sectionKey(heading) {
  const h = plain(heading).toLowerCase().replace(/[():].*$/, "").trim();
  if (SECTION_MAP[h]) return SECTION_MAP[h];
  if (/^another example/.test(h)) return "anotherExample";
  if (/^more /.test(h)) return "guided";
  if (/fluency|homework/.test(h)) return "homework";
  if (/problem solving/.test(h)) return "problemSolving";
  if (/assessment|review/.test(h)) return "assessment";
  if (/practice/.test(h)) return "quickPractice";
  if (/vocabulary|terms/.test(h)) return "vocabulary";
  if (/stem|project|3-act|performance/.test(h)) return "stem";
  if (/notes|close|preview|opening|summary/.test(h)) return null;
  return "extras";
}

/* some weeks — the Semester 2 set especially — print a section heading as a
   bold label on its own line instead of a real heading. Promote the labels the
   FIKR frame names so the section lands where the frame expects it. */
const LABEL_HEADINGS = /^(Independent Practice|Problem Solving|Assessment Practice|Guided Practice|Solve & Share|Visual Learning Bridge|Another Example.*|Essential Questions?|Vocabulary check|Quick Practice|Must-know|Exit Ticket|Higher Order Thinking)$/i;
function normalizeLabels(lines) {
  return lines.map((l) => {
    const m = l.match(/^\s*\*\*([^*]{3,60})\*\*\s*:?\s*$/);
    if (m && LABEL_HEADINGS.test(m[1].trim())) return "### " + m[1].trim();
    return l;
  });
}

/* the FIKR map is the same seven rows under every lesson — it belongs to the
   frame, not to the day's mathematics, so it never rides into a deck */
function stripFikrMap(lines) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^####\s+/.test(l)) {
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      if (j < lines.length && /^\s*\|/.test(lines[j]) && /this lesson as printed|What you do/i.test(lines[j])) {
        while (j < lines.length && /^\s*\|/.test(lines[j])) j++;
        i = j - 1; continue;
      }
      continue;
    }
    out.push(l);
  }
  return out;
}

function parseLesson(headText, bodyLinesRaw) {
  const bodyLines = stripFikrMap(normalizeLabels(bodyLinesRaw));
  const m = headText.match(LESSON_RE);
  const code = m[1] + "-" + m[2];
  let title = clean(m[3]);
  let page = null;
  const pm = title.match(/\((?:p+\.?|pp\.?)\s*([\d,\-\u2013 ]+)\)/);
  if (pm) { page = "p. " + pm[1].trim(); title = title.replace(pm[0], "").trim(); }
  const lesson = { code, title: title.replace(/\s+/g, " "), page, sections: {} };

  /* split on ### sub-headings (some S2 weeks have none: everything is the body) */
  const parts = [];
  let cur = { heading: null, lines: [] };
  for (const line of bodyLines) {
    const h = line.match(/^###\s+(.+)$/);
    if (h) { parts.push(cur); cur = { heading: h[1].trim(), lines: [] }; continue; }
    if (/^####\s+/.test(line)) {      /* the per-lesson FIKR map: boilerplate, skip it */
      parts.push(cur); cur = { heading: "\u0000skip", lines: [] }; continue;
    }
    if (/^##\s+/.test(line)) { parts.push(cur); cur = { heading: null, lines: [] }; parts.push(cur); cur = { heading: "\u0000tail", lines: [] }; continue; }
    cur.lines.push(line);
  }
  parts.push(cur);

  for (const p of parts) {
    if (p.heading === "\u0000skip" || p.heading === "\u0000tail" || !p.lines.join("").trim()) continue;
    const key = p.heading ? sectionKey(p.heading) : "body";
    if (key == null) { pushWeekStyle(lesson, p); continue; }
    addSection(lesson, p.heading ? clean(p.heading) : "As printed", key, p.lines);
  }
  /* "**I can…**" and "**I can also**" live above the first ### */
  const head = bodyLines.join("\n");
  const ic = head.match(/\*\*I can…?\*\*\s*(.+)/);
  if (ic) lesson.iCan = clean(ic[1]).replace(/\s*\\+\s*/g, " ").replace(/\s{2,}/g, " ").trim();
  const ica = head.match(/\*\*I can also\*\*\s*(.+)/);
  if (ica) lesson.iCanAlso = clean(ica[1]).replace(/\s*\\+\s*/g, " ").trim();
  const eq = head.match(/\*\*Essential Question[s]?:\*\*\s*(.+)/i);
  if (eq && !lesson.sections.essentialQuestion) {
    lesson.sections.essentialQuestion = { heading: "Essential Question", questions: splitQuestions(eq[1]) };
  }
  if (lesson.sections.body) {
    const keep = lesson.sections.body.blocks.filter((b) => {
      const a = plain(b.text || ""), lb = plain(b.label || "");
      return !/^\*{0,2}I can\b/i.test(a) && !/^\*{0,2}I can\b/i.test(lb) &&
             !/FIKR map/i.test(a + " " + lb);
    });
    if (!keep.length) delete lesson.sections.body;
    else lesson.sections.body.blocks = keep;
  }
  if (!lesson.sections.bridge && lesson.sections.body) {
    lesson.sections.bridge = lesson.sections.body;
    lesson.sections.bridge.heading = "As printed this week";
    delete lesson.sections.body;
  }
  if (!Object.keys(lesson.sections).length) addSection(lesson, "As printed", "body", bodyLines);
  attachSectionFigures(lesson);
  return lesson;
}
function splitQuestions(s) {
  return clean(s).split(/(?<=[?.])\s+(?=[A-Z0-9])/).map((q) => q.trim()).filter(Boolean);
}
function pushWeekStyle(lesson, p) {
  lesson.weekNotes = (lesson.weekNotes || []).concat(toBlocks(p.lines));
}

/* the sections the book prints as a numbered run of exercises */
const ITEMISH = { guided: 1, independent: 1, problemSolving: 1, assessment: 1,
  quickPractice: 1, exitTicket: 1, homework: 1, vocabulary: 0 };

/* one ### section → {stem, blocks, items} with the textbook's own voice kept */
function addSection(lesson, heading, key, lines) {
  const S = lesson.sections[key] || (lesson.sections[key] = { heading, blocks: [], items: [] });
  if (!S.heading) S.heading = heading;
  const list = lines.slice();
  let understand = null, knowHow = null, mode = null, buf = [];
  const flush = (target) => {
    if (!buf.length) return;
    const t = lesson.sections[key];
    /* a section the book prints as a numbered run becomes items; prose stays blocks */
    if (target || ITEMISH[key]) {
      const { stem, items } = splitItems(buf);
      if (items.length) {
        if (stem) t.stem = (t.stem ? t.stem + " " : "") + stem;
        t.items.push(...items);
      } else t.blocks.push(...toBlocks(buf));
    } else t.blocks.push(...toBlocks(buf));
    buf = [];
  };
  for (let i = 0; i < list.length; i++) {
    const line = list[i];
    const dyu = line.match(/^\s*\*\*\s*(Do You Understand|Do You Know How)\??\s*\*\*/i);
    if (dyu) {
      flush(mode);
      mode = /Understand/i.test(dyu[1]) ? "understand" : "knowHow";
      if (mode === "understand") understand = true; else knowHow = true;
      continue;
    }
    if (/^\s*\*\*\s*(Look Back!?)\s*\*\*/i.test(line)) {
      flush(mode);
      const rest = line.replace(/^\s*\*\*Look Back!?\*\*\s*:?!?\s*/i, "");
      S.lookBack = clean(rest || (list[i + 1] || "").trim());
      i++;
      continue;
    }
    if (/^\s*\*\*\s*(Convince Me!?)\s*\*\*/i.test(line)) {
      flush(mode);
      const rest = line.replace(/^\s*\*\*Convince Me!?\*\*\s*:?!?\s*/i, "");
      let txt = rest.trim();
      while (i + 1 < list.length && list[i + 1].trim() && !/^\s*(\||```|\*\*|###|\d+[.)])/.test(list[i + 1])) txt += " " + list[++i].trim();
      S.convince = clean(txt);
      continue;
    }
    buf.push(line);
  }
  flush(mode);
  if (understand) S.hasUnderstand = true;
  if (knowHow) S.hasKnowHow = true;
  /* items split back into the two guided lanes the FIKR frame asks for */
  if (key === "guided" && S.items.length) {
    const u = S.items.filter((it) => it.n <= 2 || /what do you notice|explain|describe/i.test(it.text));
    const k = S.items.filter((it) => !u.includes(it));
    if (u.length && k.length) { S.understand = u; S.knowHow = k; S.items = []; }
    else { S.knowHow = S.items; S.items = []; }
  }
  /* a table sitting in a section is data: give it the matching chart */
  S.blocks.forEach((b) => {
    if (b.t === "table" && !b.fig) {
      const f = figureForTable(b);
      if (f) b.fig = f;
    }
  });
  return S;
}

/* ==========================================================================
   5 · a week file → a week object
   ========================================================================== */
function fileNameMeta(file) {
  const base = path.basename(file, ".md");
  const s2 = /^S2\s+week-\s*0?(\d+)\s*\((\d+)\)/i.test(base);
  if (s2) { const m = base.match(/^S2\s+week-\s*0?(\d+)\s*\((\d+)\)/i); return { semester: 2, week: +m[2], file: base }; }
  const m = base.match(/^week-0?(\d+)$/i);
  if (m) return { semester: 1, week: +m[1], file: base };
  return null;
}

function parseWeek(file) {
  const meta = fileNameMeta(file);
  if (!meta) return null;
  const raw = fs.readFileSync(path.join(WEEKS_DIR, path.basename(file)), "utf8").replace(/\r\n/g, "\n");
  const lines = raw.split("\n");

  const week = {
    semester: meta.semester, week: meta.week, source: "weeks/" + meta.file + ".md",
    title: "", focus: "", topic: "", year: "2026-2027", banner: [],
    essentialQuestions: [], fikr: [], lessons: {}, sections: [], kind: "lesson"
  };

  const h1 = (lines.find((l) => l.startsWith("# ")) || "").replace(/^#\s*/, "");
  week.title = clean(h1.replace(/^Semester\s*\d\s*[—-]\s*/i, ""));

  /* split on ## */
  const chunks = [];
  let cur = { heading: null, lines: [] };
  for (const l of lines) {
    if (/^##\s+/.test(l)) { chunks.push(cur); cur = { heading: l.replace(/^##\s+/, "").trim(), lines: [] }; continue; }
    if (/^#\s+/.test(l)) continue;
    cur.lines.push(l);
  }
  chunks.push(cur);

  for (const c of chunks) {
    const head = c.heading || "";
    const body = c.lines;
    if (!head) {
      for (const l of body) {
        const f = l.match(/^\*\*Focus:\*\*\s*(.+)$/); if (f) week.focus = clean(f[1]);
        const tp = l.match(/^\*\*Topics?:\*\*\s*(.+)$/i); if (tp) week.topic = clean(tp[1]);
        const yr = l.match(/^\*\*Academic Year:\*\*\s*(.+)$/); if (yr) week.year = clean(yr[1]).replace(/\s*\\+$/, "");
        const vol = l.match(/^\*\*Volume\s*(\d)\*\*/i); if (vol) week.volume = "Volume " + vol[1];
        if (/^>\s*/.test(l) && clean(l.replace(/^>\s*/, "").replace(/\\+$/, ""))) {
          week.banner.push(clean(l.replace(/^>\s*/, "")));
        }
      }
      continue;
    }
    if (/^This week's lesson routine/i.test(head)) {
      const rows = body.filter(isTableRow).filter((l) => !isSepRow(l)).map(splitRow);
      rows.shift();
      week.fikr = rows.map((r) => ({ stage: clean((r[0] || "").replace(/\*\*/g, "")), time: clean(r[1]), do: clean(r[2]) }))
        .filter((r) => r.stage);
      const cycle = body.find((l) => /^\*\*.+\*\*/.test(l) && !/I can/.test(l));
      if (cycle) week.cycle = clean(cycle).replace(/\*\*/g, "").replace(/\s*\\+\s*$/, "");
      const eq = body.join("\n").match(/\*\*Essential Questions?:\*\*\s*(.+)/i);
      if (eq) week.essentialQuestions = splitQuestions(eq[1]);
      continue;
    }
    if (LESSON_RE.test(head)) {
      /* the whole lesson (its ### sections too) arrived in one chunk */
      const rest = body.slice();
      const nextHead = rest.findIndex((l, idx) => idx > 0 && /^##\s+/.test(l));
      const mine = nextHead < 0 ? rest : rest.slice(0, nextHead);
      const lesson = parseLesson(head, mine);
      week.lessons[lesson.code] = lesson;
      continue;
    }
    if (/^Day\s+\d/i.test(head)) {
      week.kind = week.kind === "lesson" ? "revision" : week.kind;
      const day = { day: clean(head.replace(/^Day\s+(\d+)\s*[—-]\s*/i, "$1 · ")), blocks: [], items: [], mustKnow: [], vocab: [] };
      const dm = head.match(/^Day\s+(\d+)\s*(?:[—-]\s*(.+))?/i);
      day.n = +dm[1]; day.title = clean(dm[2] || "");
      const sub = [];
      let curS = { heading: null, lines: [] };
      for (const l of body) {
        if (/^###\s+/.test(l)) { sub.push(curS); curS = { heading: l.replace(/^###\s+/, "").trim(), lines: [] }; continue; }
        curS.lines.push(l);
      }
      sub.push(curS);
      for (const s of sub) {
        const key = s.heading ? sectionKey(s.heading) : "body";
        if (key === "mustKnow") day.mustKnow = toBlocks(s.lines).flatMap((b) => b.t === "list" ? b.items : []).map((x) => x.text);
        else if (key === "quickPractice") {
          const { items } = splitItems(s.lines);
          day.items = items;
          if (!items.length) day.blocks = toBlocks(s.lines);
        } else if (key === "vocabulary") {
          day.vocab = clean(s.lines.join(" ")).split(/\s*[·,]\s*/).filter(Boolean);
        } else day.blocks.push(...toBlocks([s.heading ? "### " + s.heading : "", ...s.lines]));
      }
      (week.days = week.days || []).push(day);
      continue;
    }
    if (/^Exam Scope/i.test(head)) {
      week.kind = "exam";
      const rows = body.filter(isTableRow).filter((l) => !isSepRow(l)).map(splitRow);
      const headRow = rows.shift() || [];
      week.examScope = { head: headRow, rows };
      const rest = body.filter((l) => !isTableRow(l) && !isSepRow(l) && l.trim());
      if (rest.length) (week.examNotes = []).push(...toBlocks(rest));
      continue;
    }
    const sec = { heading: clean(head), blocks: [], items: [] };
    const numbered = splitItems(body);
    if (numbered.items.length >= 2) {
      sec.stem = numbered.stem;
      sec.items = numbered.items;
      const otherLines = body.filter((l) => numbered.items.some((it) => false) ? false : true);
      sec.blocks = toBlocks(body.filter((l) => !/^\s*\d+[.)]\s/.test(l) && l.trim()));
    } else {
      sec.blocks = toBlocks(body);
    }
    if (sec.blocks.length || sec.items.length) {
      if (/homework|fluency/i.test(head)) week.homework = sec;
      else if (/orientation activities|review what you know/i.test(head)) week.diagnostic = sec;
      (week.sections = week.sections || []).push(sec);
    }
  }

  if (week.days && !Object.keys(week.lessons).length) week.kind = week.kind === "exam" ? "exam" : "revision";
  if (!Object.keys(week.lessons).length && !week.days && /orientation|diagnostic/i.test(week.focus + week.title)) week.kind = "orientation";
  return week;
}

/* ==========================================================================
   6 · run
   ========================================================================== */
function main() {
  const quiet = process.argv.includes("--quiet");
  const files = fs.readdirSync(WEEKS_DIR).filter((f) => /^week-\d+\.md$/i.test(f) || /^S2\s+week-\s*\d+\s*\(\d+\)\.md$/i.test(f))
    .sort((a, b) => {
      const ma = fileNameMeta(a), mb = fileNameMeta(b);
      return (ma.semester - mb.semester) || (ma.week - mb.week);
    });
  const weeks = [];
  for (const f of files) {
    const w = parseWeek(f);
    if (w) weeks.push(w);
  }
  /* cross-index so a deck can find every week that schedules it */
  const index = {};
  weeks.forEach((w) => {
    Object.keys(w.lessons).forEach((code) => {
      (index[code] = index[code] || []).push({ semester: w.semester, week: w.week, source: w.source });
    });
  });

  const out = {
    schema: "daf-week-content/1",
    note: "Extracted verbatim from the weekly planning files in weeks/. Numbers are never altered: scripts/extract-week-content.js.",
    program: "Savvas enVision Mathematics · Grade 4 · Dar Al Fikr Schools",
    weeks: weeks.map((w) => ({ semester: w.semester, week: w.week, file: "weeks/" + path.basename(w.source), slug: "s" + w.semester + "-week-" + String(w.week).padStart(2, "0"), ...w })),
    lessonIndex: index,
    weeksDir: {
      "1": weeks.filter((w) => w.semester === 1).map((w) => w.week),
      "2": weeks.filter((w) => w.semester === 2).map((w) => w.week)
    }
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 1));

  if (!quiet) {
    let nl = 0, ni = 0, na = 0, nf = 0;
    weeks.forEach((w) => Object.values(w.lessons).forEach((l) => {
      nl++;
      Object.values(l.sections).forEach((s) => {
        ni += (s.items || []).length + (s.understand || []).length + (s.knowHow || []).length;
        na += (s.items || []).concat(s.understand || [], s.knowHow || []).filter((it) => it.answer).length;
        nf += (s.items || []).concat(s.understand || [], s.knowHow || []).filter((it) => it.fig).length;
        (s.blocks || []).forEach((b) => { if (b.fig) nf++; });
      });
    }));
    console.log("weeks: " + weeks.length + " · lessons with content: " + nl + " · printed items: " + ni +
      " · answers computed: " + na + " · figures attached: " + nf);
    console.log("wrote " + path.relative(ROOT, OUT) + " (" + (fs.statSync(OUT).size / 1024).toFixed(0) + " KB)");
  }
  return out;
}
if (require.main === module) main();
module.exports = { main, parseWeek, parseLesson, clean, runs, toBlocks, sectionKey, solveItem, deriveFigure };
