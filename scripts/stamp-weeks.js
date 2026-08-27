#!/usr/bin/env node
/* ===========================================================================
   stamp-weeks.js — put each week's printed content INTO that week's decks.

   weeks/Semester-1/Week-02-…/lesson-1-1-….html is a copy of the built deck.
   This script makes it the copy a teacher opens on Wednesday:

     · it re-copies the freshly built deck, its STEAM activity and its lesson
       source from html/ + lessons/ (so the week folder is never stale),
     · it stamps window.DAF_WEEK = { …} — this week's slice of the week file
       (focus, FIKR routine, I-can statement, Essential Question, the Visual
       Learning Bridge, the printed practice/problem-solving/assessment runs)
       into the deck, which the engine renders as extra slides,
     · it pins a week brief on the activity lab,
     · and it schedules any lesson the week file teaches that the folder was
       missing, so the folder and the planning file agree.

   Run after building:  node scripts/stamp-weeks.js   (rebuild-all.sh does it)
   =========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

const CONTENT_PATH = path.join(ROOT, "weeks", "week-content.json");
if (!fs.existsSync(CONTENT_PATH)) {
  console.error("weeks/week-content.json is missing — run node scripts/extract-week-content.js first.");
  process.exit(1);
}
const CONTENT = JSON.parse(fs.readFileSync(CONTENT_PATH, "utf8"));
const CURRICULUM = JSON.parse(fs.readFileSync(path.join(ROOT, "curriculum.json"), "utf8"));

const htmlDir = path.join(ROOT, "html");
const actDir = path.join(htmlDir, "activities");
const lessonsDir = path.join(ROOT, "lessons");
const htmlFiles = fs.existsSync(htmlDir) ? fs.readdirSync(htmlDir).filter((f) => f.endsWith(".html")) : [];
const actFiles = fs.existsSync(actDir) ? fs.readdirSync(actDir).filter((f) => f.endsWith("-activity.html")) : [];

const norm = (code) => String(code).replace(".", "-");
const findDeck = (code) => htmlFiles.find((f) => f.startsWith(`lesson-${norm(code)}-`) && !f.endsWith("-activity.html"));
const findAct = (code) => actFiles.find((f) => f.startsWith(`lesson-${norm(code)}-`) && f.endsWith("-activity.html"));

const lessonMeta = {};
CURRICULUM.topics.forEach((t) => t.lessons.forEach((l) => {
  lessonMeta[l.code] = { title: l.title, standard: l.standard || t.standards, ixl: (l.ixl || []).join(" · "), topic: t.n, topicTitle: t.title };
}));

function pad2(n) { return n < 10 ? "0" + n : String(n); }

/* ---- which folder does this week own? ----------------------------------- */
function weekFolder(semester, week) {
  const semDir = path.join(ROOT, "weeks", "Semester-" + semester);
  if (!fs.existsSync(semDir)) return null;
  const want = "Week-" + pad2(week) + "-";
  const hit = fs.readdirSync(semDir).filter((d) => d.startsWith(want) &&
    fs.statSync(path.join(semDir, d)).isDirectory());
  return hit.length ? path.join(semDir, hit[0]) : null;
}

/* ---- the payload a single deck receives ---------------------------------- */
const cap = (arr, n) => (arr || []).slice(0, n);
function trimBlocks(blocks, n) {
  return (blocks || []).slice(0, n).map((b) => {
    if (b.t === "table") return { t: "table", head: b.head, rows: cap(b.rows, 24), fig: b.fig || null };
    if (b.t === "code") return { t: "code", lines: cap(b.lines, 24) };
    if (b.t === "list" || b.t === "nums") return { t: b.t, items: cap(b.items, 30) };
    if (b.t === "steps") return { t: "steps", items: cap(b.items, 14) };
    return b;
  });
}
function trimSection(s, opts) {
  if (!s) return null;
  const o = opts || {};
  const keep = (items, n) => (items || []).slice(0, n == null ? 999 : n).map((it) => ({
    n: it.n, tag: it.tag || null, text: it.text, runs: it.runs || null, dir: it.dir || null,
    numbers: cap(it.numbers, 12), options: it.options || null, boxes: it.checkbox || null,
    table: it.table ? { head: it.table.head, rows: cap(it.table.rows, 24) } : null,
    work: it.work || null, workSolved: it.workSolved || null,
    answer: it.answer || null, answerNote: it.answerNote || null, fig: it.fig || null
  }));
  const out = {
    heading: s.heading,
    blocks: trimBlocks(s.blocks, o.blocks == null ? 14 : o.blocks),
    items: keep(s.items, o.items == null ? 999 : o.items)
  };
  if (s.stem) out.stem = s.stem;
  if (s.understand) out.understand = keep(s.understand, 12);
  if (s.knowHow) out.knowHow = keep(s.knowHow, 999);
  if (s.convince) out.convince = s.convince;
  if (s.lookBack) out.lookBack = s.lookBack;
  return out;
}
function buildPayload(week, code) {
  const L = week.lessons[code];
  const sections = {};
  Object.keys(L.sections || {}).forEach((k) => {
    const t = trimSection(L.sections[k], { blocks: k === "bridge" || k === "anotherExample" ? 16 : 12 });
    if (t && (t.blocks.length || t.items.length || (t.understand && t.understand.length) || (t.knowHow && t.knowHow.length))) sections[k] = t;
  });
  /* the route drawing on the week-open slide wants every lesson of the week;
     only this one carries its full content, to keep the file lean */
  const siblings = {};
  Object.keys(week.lessons).forEach((c) => { siblings[c] = { code: c, title: week.lessons[c].title, page: week.lessons[c].page }; });
  siblings[code] = { code, title: L.title, page: L.page, iCan: L.iCan || null, iCanAlso: L.iCanAlso || null, sections };
  return {
    semester: week.semester, week: week.week, kind: week.kind || "lesson",
    title: week.title, focus: week.focus, topic: week.topic, year: week.year, volume: week.volume || null,
    cycle: week.cycle || null,
    iqra: (week.banner || []).slice(1, 2).map((b) => String(b).replace(/\*\*/g, "")).join(" ") || null,
    essentialQuestions: cap(week.essentialQuestions, 4),
    fikr: cap((week.fikr || []).map((f) => ({ stage: f.stage, time: f.time, do: f.do })), 8),
    homework: week.homework ? trimSection(week.homework, { blocks: 6 }) : null,
    stem: (week.sections || []).filter((s) => /STEM|Project|3-Act|Performance|diagnostic|orientation|Review What/i.test(s.heading))[0]
      ? trimSection((week.sections || []).filter((s) => /STEM|Project|3-Act|Performance|diagnostic|orientation|Review What/i.test(s.heading))[0], { blocks: 6 }) : null,
    sections: cap((week.sections || []).filter((s) => !s.heading.match(/STEM|Project|3-Act|Performance|diagnostic|orientation|Review What|Homework|fluency/i))
      .map((s) => ({ heading: s.heading, blocks: trimBlocks(s.blocks, 5) })), 4),
    lessons: siblings
  };
}

/* ---- injection ----------------------------------------------------------- */
const OLD_WEEK = /\s*<script>window\.DAF_WEEK = [\s\S]*?<\/script>\n/;
function stampDeck(html, payload) {
  let out = html.replace(OLD_WEEK, "\n");
  const block = "    <script>window.DAF_WEEK = " + JSON.stringify(payload) + ";</script>\n";
  const marker = '    <script type="text/babel"';
  const i = out.indexOf(marker);
  if (i < 0) throw new Error("no babel block found — is this a built deck?");
  return out.slice(0, i) + block + out.slice(i);
}
function weekBriefHtml(week, code) {
  const L = week.lessons && week.lessons[code];
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const strip = (s) => String(s == null ? "" : s).replace(/\*\*/g, "").replace(/`/g, "");
  const line = (k, v) => v ? `<div class="wb-row"><b>${esc(k)}</b><span>${esc(v)}</span></div>` : "";
  const prod = (week.fikr || []).filter((f) => /4 Production|5 Mastery|6 Smart/i.test(f.stage)).map((f) => `<li><b>${esc(f.stage)}</b> ${esc(f.time)} — ${esc(strip(f.do))}</li>`).join("");
  const ic = L && L.iCan ? `I can ${strip(L.iCan)}` : "";
  const eq = L && L.sections && L.sections.essentialQuestion && L.sections.essentialQuestion.blocks.length
    ? strip(L.sections.essentialQuestion.blocks.map((b) => b.text || "").join(" ")) : "";
  const task = [ic, eq].filter(Boolean).join("  ·  ");
  return [
`<style>`,
`#daf-week-brief{position:fixed;right:14px;bottom:14px;z-index:9999;max-width:360px;`,
`font-family:Satoshi,system-ui,sans-serif;font-size:12px;color:#10242b;`,
`background:rgba(255,255,255,.96);border:1.5px solid #cde7e3;border-left:4px solid #c9a227;`,
`border-radius:12px;box-shadow:0 14px 34px rgba(10,95,88,.18);overflow:hidden}`,
`#daf-week-brief>summary{cursor:pointer;list-style:none;padding:8px 12px;font-weight:900;`,
`display:flex;gap:8px;align-items:center;font-size:11px;letter-spacing:.06em}`,
`#daf-week-brief>summary::-webkit-details-marker{display:none}`,
`#daf-week-brief .wb-tag{background:#12857c;color:#fff;border-radius:999px;padding:2px 9px;`,
`font:800 9.5px "JetBrains Mono",monospace;letter-spacing:.1em}`,
`#daf-week-brief .wb-body{padding:0 12px 10px;display:flex;flex-direction:column;gap:7px;max-height:44vh;overflow:auto}`,
`#daf-week-brief .wb-row{display:grid;grid-template-columns:78px 1fr;gap:8px;align-items:baseline}`,
`#daf-week-brief .wb-row b{font:800 9px "JetBrains Mono",monospace;letter-spacing:.09em;text-transform:uppercase;color:#0a5f58}`,
`#daf-week-brief .wb-task{background:#e8f6f4;border-radius:9px;padding:7px 9px;font-weight:700;line-height:1.45}`,
`#daf-week-brief ul{margin:0;padding-left:15px;display:flex;flex-direction:column;gap:4px}`,
`#daf-week-brief li b{color:#0a5f58}`,
`</style>`,
`<details id="daf-week-brief"><summary><span class="wb-tag">WEEK ${pad2(week.week)} · SEM ${week.semester}</span>`,
`Lab brief — Semester ${week.semester} Week ${pad2(week.week)} · Lesson ${esc(code)}</summary>`,
`<div class="wb-body">`,
task ? `<div class="wb-task">${esc(task)}</div>` : "",
line("Focus", week.focus), line("Topic", week.topic), line("Page", L && L.page),
`<div class="wb-row"><b>How we run it</b><span>${esc(week.cycle || "content at home · thinking in class · evidence on the wall")}</span></div>`,
prod ? `<ul>${prod}</ul>` : "",
L && L.iCanAlso ? `<div class="wb-row"><b>Also</b><span>I can also ${esc(strip(L.iCanAlso))}</span></div>` : "",
`<div class="wb-row"><b>Source</b><span>${esc(week.source || ("weeks/" + (week.semester === 1 ? "week-" : "S2 week-01 (") + week.week + ").md"))}</span></div>`,
`</div></details>`
  ].join("");
}

/* ---- README for the week folder ------------------------------------------ */
const KIND_TITLE = { orientation: "Orientation, Reinforcement & Diagnostic Assessment",
  revision: "General Revision", exam: "Final Examinations", lesson: "Lesson Week" };
function weekReadme(week, entries) {
  const sem = week.semester === 1 ? "Semester 1" : "Semester 2";
  const strip = (s) => String(s == null ? "" : s).replace(/\*\*/g, "").replace(/`/g, "");
  let head = strip(String(week.title || "").replace(/^Week\s*\d+\s*[—-]\s*/i, "")).replace(new RegExp("^" + sem + "\\s*[—-]\\s*", "i"), "").trim();
  if (!head || new RegExp("^week\\s*\\d*$", "i").test(head)) head = strip(week.focus) || KIND_TITLE[week.kind] || "Week " + week.week;
  let md = `# ${sem} — Week ${pad2(week.week)}: ${head}\n\n`;
  md += `**Academic Year:** ${week.year}  \n**Department:** Mathematics · Grade 4  \n`;
  md += `**Source file:** \`${week.source}\`  \n`;
  if (week.topic) md += `**Topic:** ${strip(week.topic)}  \n`;
  if (week.focus) md += `**Focus:** ${strip(week.focus)}  \n\n`;
  md += `> ${strip(week.iqra || "Begin with Bismillah. Seek knowledge as a trust. Be precise in measure (amanah).")}\n\n`;
  md += `---\n\n`;
  if (!entries.length) {
    md += `## This week has its own deck\n\n`;
    md += `This week teaches no numbered lesson — it is a${/^[aeiou]/i.test(KIND_TITLE[week.kind] || "revision") ? "n" : ""} ${KIND_TITLE[week.kind] || "revision"} week. `
      + `\`week-${pad2(week.week)}-*.html\` in this folder is the deck for it: the FIKR routine, the must-know lists, `
      + `the Quick Practice runs, the skills checklist and the exam structure, all read out of \`${week.source}\` and `
      + `nothing else. Open it in any browser like a lesson deck (\`O\` for the overview, \`\u2190 \u2192\` to walk it, `
      + `\`T\` for the teacher rail).\n\n`;
  } else {
  md += `## The week's own content is inside these decks\n\n`;
  md += `Each \`lesson-*.html\` in this folder carries this week's printed page — the *I can…* statement, the Essential `
      + `Question, Solve & Share, the Visual Learning Bridge, the Another Example, the guided / independent runs, the `
      + `Problem Solving page, Assessment Practice and the homework line. They open as extra slides inside the seven `
      + `stages (the deck counts them in its overview, press \`O\`), and every one of them keeps the numbers exactly as `
      + `printed in \`${week.source}\`.\n\n`;
  md += `| Lesson | Title | enVision page | Slides this week adds | Printed items | Computed answer keys | Deck | Activity lab |\n`;
  md += `|---|---|---|---|---|---|---|---|\n`;
  entries.forEach((e) => {
    md += `| **${e.code}** | ${e.title} | ${e.page || "—"} | ${e.slides} | ${e.items} | ${e.keys} | \`${e.deck}\` | \`${e.act}\` |\n`;
  });
  }
  md += `\n## FIKR routine for this week (do not change the math)\n\n`;
  if (week.cycle) md += `**${strip(week.cycle)}**\n\n`;
  md += `| Stage | Time | What you do |\n|---|---|---|\n`;
  (week.fikr || []).forEach((f) => { md += `| **${f.stage}** | ${f.time} | ${strip(f.do)} |\n`; });
  if ((week.essentialQuestions || []).length) {
    md += `\n**Essential Questions:** ` + week.essentialQuestions.join(" ") + `\n\n`;
  }
  if (week.days && week.days.length) {
    md += `## Revision days\n\n`;
    week.days.forEach((d) => {
      md += `### Day ${d.n} — ${d.title}\n\n`;
      if ((d.mustKnow || []).length) md += `**Must-know**\n\n` + d.mustKnow.map((m) => `- ${m}`).join("\n") + `\n\n`;
      if ((d.items || []).length) md += `**Quick Practice** (${d.items.length} items, as printed)\n\n`
        + d.items.slice(0, 8).map((it) => `1. ${it.text}`).join("\n") + `\n\n`;
    });
  }
  if ((week.sections || []).length) {
    md += `## More from the week file\n\n`;
    week.sections.forEach((s) => {
      md += `### ${s.heading}\n\n`;
      (s.blocks || []).slice(0, 6).forEach((b) => {
        if (b.t === "list" || b.t === "nums") md += b.items.slice(0, 12).map((x) => `- ${x.text}`).join("\n") + "\n\n";
        else if (b.t === "table") md += `| ${b.head.join(" | ")} |\n|${b.head.map(() => "---").join("|")}|\n`
          + b.rows.slice(0, 10).map((r) => "| " + r.join(" | ") + " |").join("\n") + "\n\n";
        else if (b.t === "code") md += "```\n" + (b.lines || []).join("\n") + "\n```\n\n";
        else md += `- ${(b.text || b.label || "").replace(/\*\*/g, "")}\n`;
      });
      (s.items || []).slice(0, 6).forEach((it) => { md += `1. **${it.n}.** ${it.text}\n`; });
      if ((s.items || []).length) md += "\n";
    });
  }
  if (week.homework) {
    md += `## Homework / fluency\n\n`;
    (week.homework.blocks || []).slice(0, 8).forEach((b) => {
      if (b.t === "list" || b.t === "nums") md += b.items.map((x) => `- ${x.text}`).join("\n") + "\n\n";
      else if (b.text) md += `- ${b.text}\n`;
    });
    md += "\n";
  }
  md += `## Instructions for teachers & students\n\n`;
  md += `- **Interactive Slides:** launch the \`lesson-*.html\` file in any browser — it opens on the class roster and walks the seven stages.\n`;
  md += `- **STEAM Activity Labs:** launch \`lesson-*-activity.html\`; the bottom-right card carries this week's lab brief.\n`;
  md += `- **No internet needed** for the deck itself; SavvasRealize.com is the online companion listed in the week file.\n`;
  return md;
}

/* ---- run ------------------------------------------------------------------ */
function main() {
  const quiet = process.argv.includes("--quiet");
  const stats = { decks: 0, acts: 0, added: 0, weeks: 0, bytes: 0 };
  const missing = [];
  CONTENT.weeks.forEach((week) => {
    const dir = weekFolder(week.semester, week.week);
    if (!dir) { missing.push("s" + week.semester + "w" + week.week); return; }
    stats.weeks++;
    const codes = Object.keys(week.lessons || {});
    const entries = [];
    codes.forEach((code) => {
      const deck = findDeck(code);
      if (!deck) { missing.push("no built deck for " + code); return; }
      const srcHtml = fs.readFileSync(path.join(htmlDir, deck), "utf8");
      const payload = buildPayload(week, code);
      const out = stampDeck(srcHtml, payload);
      fs.writeFileSync(path.join(dir, deck), out);
      stats.decks++; stats.bytes += out.length;
      /* the lesson source too, so a teacher can see what the deck is built from */
      const jsx = path.join(lessonsDir, norm(code) + ".jsx");
      if (fs.existsSync(jsx)) fs.copyFileSync(jsx, path.join(dir, norm(code) + ".jsx"));
      const act = findAct(code);
      let actName = "—";
      if (act) {
        const actHtml = fs.readFileSync(path.join(actDir, act), "utf8")
          .replace(/<!--\s*DAF-WEEK-BRIEF[\s\S]*?-->/g, "");
        const i = actHtml.lastIndexOf("</body>");
        const stamped = i >= 0
          ? actHtml.slice(0, i) + `<!-- DAF-WEEK-BRIEF -->` + weekBriefHtml(week, code) + `<!-- /DAF-WEEK-BRIEF -->` + actHtml.slice(i)
          : actHtml;
        fs.writeFileSync(path.join(dir, act), stamped);
        stats.acts++; actName = act;
      }
      const L = week.lessons[code];
      let items = 0, keys = 0;
      Object.keys(L.sections || {}).forEach((k) => {
        const s = L.sections[k] || {};
        const all = (s.items || []).concat(s.understand || [], s.knowHow || []);
        items += all.length; keys += all.filter((it) => it.answer).length;
      });
      entries.push({
        code, title: L.title, page: L.page, deck, act: actName,
        slides: countWeekScreens(week, code), items, keys
      });
    });
    if (!entries.length) {
      /* orientation, revision and exam weeks: no lesson decks to stamp —
         the week file itself becomes the deck (build-week-decks.js) */
    }
    fs.writeFileSync(path.join(dir, "README.md"), weekReadme(week, entries));
  });
  if (!quiet) {
    console.log(`stamped ${stats.decks} lesson decks + ${stats.acts} activity labs across ${stats.weeks} week folders ` +
      `(${(stats.bytes / 1048576).toFixed(1)} MB written)`);
    if (missing.length) console.log("notes: " + missing.join(", "));
  }
  return stats;
}

/* how many screens the engine will add for this lesson in this week */
function countWeekScreens(week, code) {
  const L = (week.lessons || {})[code];
  if (!L) return 0;
  const s = L.sections || {};
  let n = 2; /* the week opening + the week closing */
  if (s.bridge || s.solveShare) n++;
  if (s.anotherExample) n++;
  n++; /* practice lane */
  if (s.problemSolving || s.stem) n++;
  if (s.assessment) n++;
  return n;
}

if (require.main === module) main();
module.exports = { main, buildPayload, stampDeck, weekFolder, findDeck, findAct, pad2 };
