#!/usr/bin/env node
/* ===========================================================================
   build-week-decks.js — a deck for every week that teaches no numbered lesson

   Semester 1 opens with an orientation and diagnostic week and closes with two
   revision weeks and the examination week; Semester 2 ends the same way. Those
   folders held a README and nothing to project, while the week files
   (weeks/week-17.md, weeks/S2 week-01 (19).md …) carry the must-know lists,
   the Quick Practice runs, the skills checklist and the exam structure.

   This script assembles a real deck for each of them out of the same engine
   every lesson uses — head.html, the drawing primitives, the week layer —
   with lessons/week-deck.jsx as its lesson source and the week's own slice of
   weeks/week-content.json as its only content. Nothing is authored twice.

     node scripts/build-week-decks.js          (rebuild-all.sh runs it last)
   =========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ROOT = path.resolve(__dirname, "..");

const CONTENT = JSON.parse(fs.readFileSync(path.join(ROOT, "weeks", "week-content.json"), "utf8"));
const pad2 = (n) => (n < 10 ? "0" + n : String(n));

const cap = (arr, n) => (arr || []).slice(0, n);
function trimBlocks(blocks, n) {
  return cap(blocks, n == null ? 14 : n).map((b) => {
    if (!b) return null;
    if (b.t === "table") return { t: "table", head: b.head, rows: cap(b.rows, 14), fig: b.fig || null };
    if (b.t === "code") return { t: "code", lines: cap(b.lines, 16) };
    if (b.t === "list" || b.t === "nums") return { t: b.t, items: cap(b.items, 16).map((x) => ({ text: x.text, runs: x.runs })) };
    if (b.t === "steps") return { t: "steps", items: cap(b.items, 10) };
    return b;
  }).filter(Boolean);
}
function trimItems(items) {
  return cap(items, 12).map((it) => ({
    n: it.n, tag: it.tag || null, text: it.text, dir: it.dir || null,
    options: it.options || null, checkbox: it.checkbox || null,
    table: it.table ? { head: it.table.head, rows: cap(it.table.rows, 12) } : null,
    answer: it.answer || null, answerNote: it.answerNote || null, fig: it.fig || null
  }));
}
function trimSection(s, n) {
  if (!s) return null;
  const out = { heading: s.heading, blocks: trimBlocks(s.blocks, n), items: trimItems(s.items) };
  if (s.stem) out.stem = s.stem;
  return (out.blocks.length || out.items.length) ? out : null;
}

function payloadFor(week) {
  const p = {
    semester: week.semester, week: week.week, kind: week.kind || "revision",
    deck: true, title: week.title, focus: week.focus, topic: week.topic,
    year: week.year, source: week.source, cycle: week.cycle || null,
    banner: cap(week.banner, 4), essentialQuestions: cap(week.essentialQuestions, 4),
    fikr: cap((week.fikr || []).map((f) => ({ stage: f.stage, time: f.time, do: f.do })), 8),
    sections: cap((week.sections || []).map((s) => trimSection(s)).filter(Boolean), 10),
    lessons: {},
    deckCode: "week-" + week.semester + "-" + pad2(week.week)
  };
  if ((week.days || []).length) {
    p.days = week.days.map((d) => ({
      n: d.n, day: d.day, title: d.title,
      mustKnow: cap(d.mustKnow, 8), vocab: cap((d.vocab || []).filter((v) => !/^-+$/.test(v)), 10),
      blocks: trimBlocks(d.blocks, 8), items: trimItems(d.items)
    }));
  }
  if (week.examScope) p.examScope = { head: week.examScope.head, rows: cap(week.examScope.rows, 14) };
  if ((week.examNotes || []).length) p.examNotes = trimBlocks(week.examNotes, 8);
  if (week.homework) p.homework = trimSection(week.homework, 10);
  if (week.diagnostic) p.diagnostic = trimSection(week.diagnostic, 14);
  return p;
}

const KIND_SLUG = { orientation: "orientation-and-diagnostic", revision: "general-revision", exam: "final-examinations" };
function slugOf(week) {
  const raw = String(week.focus || week.title || "");
  const t = raw.replace(/^Semester\s*\d\s*[—-]\s*/i, "").replace(/^Week\s*\d+\s*[—-]\s*/i, "")
    .replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
  const generic = !t || /^week-?\d*$/.test(t) || /general-revision|final-examinations|orientation/.test(t);
  /* the non-lesson weeks have stable, readable names — they are not lesson decks */
  return (generic ? (KIND_SLUG[week.kind] || "revision") : t).slice(0, 46);
}

function assemble(payload, outFile) {
  const head = fs.readFileSync(path.join(ROOT, "engine", "head.html"), "utf8")
    .replace("<!--PAGE_TITLE-->", "Dar Al Fikr · Grade 4 · " + payload.title);
  const plain = ["omml.js", "draw.js", "folio-state.js", "creatures.js"].map((f) => fs.readFileSync(path.join(ROOT, "engine", f), "utf8")).join("\n");
  const jsx = ["primitives.jsx", "story-components.jsx", "routines.jsx",
               "week-deck.jsx", "week-screens.jsx", "app.jsx"]
    .map((f) => fs.readFileSync(path.join(f === "week-deck.jsx" ? ROOT + "/lessons" : ROOT + "/engine", f), "utf8")).join("\n");
  const roster = fs.readFileSync(path.join(ROOT, "roster.json"), "utf8");
  const out = [
    head,
    "    <script>\n" + plain + "\n    </" + "script>",
    '    <script>window.DAF_ROSTER = ' + roster + ";</" + "script>",
    "    <script>window.DAF_STORY = {};</" + "script>",
    "    <script>window.DAF_WEEK = " + JSON.stringify(payload) + ";</" + "script>",
    '    <script type="text/babel" data-presets="daf-react">\n' + jsx + "\n    </" + "script>",
    "  </body>\n</html>\n"
  ].join("\n");
  fs.writeFileSync(outFile, out);
  return out.length;
}

function main() {
  const quiet = process.argv.includes("--quiet");
  let built = 0;
  CONTENT.weeks.forEach((week) => {
    if (week.lessons && Object.keys(week.lessons).length) return;  /* stamped by stamp-weeks.js */
    const want = "Week-" + pad2(week.week) + "-";
    const semDir = path.join(ROOT, "weeks", "Semester-" + week.semester);
    if (!fs.existsSync(semDir)) return;
    const folder = fs.readdirSync(semDir).filter((d) => d.startsWith(want) && fs.statSync(path.join(semDir, d)).isDirectory())[0];
    if (!folder) return;
    const dir = path.join(semDir, folder);
    const payload = payloadFor(week);
    const file = path.join(dir, "week-" + pad2(week.week) + "-" + slugOf(week) + ".html");
    const bytes = assemble(payload, file);
    /* the deck is listed in the folder README too, so it is not missed */
    const readmePath = path.join(dir, "README.md");
    if (fs.existsSync(readmePath)) {
      let md = fs.readFileSync(readmePath, "utf8");
      const link = "[`" + path.basename(file) + "`](./" + path.basename(file) + ")";
      const line = `- **This week's own deck:** ${link} — the orientation / revision / examination screens, drawn from \`${week.source}\`. Open it like any lesson deck.\n`;
      md = md.replace(/^\s*-\s+\*\*This week's own deck:\*\*.*\n(\s*\n)?/gm, "");
      md = md.replace("## Instructions for teachers & students", line + "\n## Instructions for teachers & students");
      fs.writeFileSync(readmePath, md);
    }
    built++;
    if (!quiet) console.log(`  deck  weeks/Semester-${week.semester}/${folder}/${path.basename(file)}  (${(bytes / 1024).toFixed(0)} KB · ${payload.days ? payload.days.length + " days" : (payload.sections || []).length + " pages"})`);
  });
  if (!quiet) console.log("built " + built + " week deck(s) for the weeks that teach no numbered lesson");
  return built;
}
if (require.main === module) main();
module.exports = { main, payloadFor, assemble };
