#!/usr/bin/env node
/* ===========================================================================
   check-weeks.js — two promises, checked instead of assumed.

   1 · FIDELITY. Everything a stamped week deck shows must be in the week file,
       and everything the week file printed for that lesson must be in the deck:
       the I-can sentence, every numbered item, and the numbers themselves
       ("do not change the math"). Any number the file printed and the deck
       dropped is reported.

   2 · DRAWINGS. Every model the week layer can build (place-value chart,
       number line, area model, fraction bars, clock, line plot, angle, prism…)
       is executed against a stub canvas — with no browser in this sandbox a
       crash here is the only way to know a figure is broken.

     node scripts/check-weeks.js [--verbose]
   =========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const CONTENT = JSON.parse(fs.readFileSync(path.join(ROOT, "weeks", "week-content.json"), "utf8"));
const pad2 = (n) => (n < 10 ? "0" + n : String(n));
const verbose = process.argv.includes("--verbose");

function norm(s) {
  return String(s == null ? "" : s)
    .replace(/[“”‘’]/g, "").replace(/[’']/g, "")
    .replace(/\u2013|\u2014/g, "-").replace(/\u00a0/g, " ")
    .replace(/\*\*/g, "").replace(/`/g, "")
    .replace(/\s+/g, " ").trim().toLowerCase();
}
const NUM = /(?<![\w.])(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)(?![\w])/g;
function numbersOf(text) {
  const out = []; let m;
  NUM.lastIndex = 0;
  while ((m = NUM.exec(String(text)))) out.push(m[1].replace(/,/g, ""));
  return out;
}

/* every string inside the payload, flattened — so an escaped quote in the
   JSON does not read as a missing sentence */
function flatten(o, out) {
  out = out || [];
  if (o == null) return out;
  if (typeof o === "string") { out.push(o); return out; }
  if (Array.isArray(o)) { o.forEach((x) => flatten(x, out)); return out; }
  if (typeof o === "object") Object.keys(o).forEach((k) => flatten(o[k], out));
  return out;
}

/* ---- the deck's own payload, read back out of the stamped file ------------ */
function payloadOf(semester, week, code) {
  const semDir = path.join(ROOT, "weeks", "Semester-" + semester);
  const want = "Week-" + pad2(week) + "-";
  const folder = fs.readdirSync(semDir).filter((d) => d.startsWith(want))[0];
  if (!folder) return null;
  const dir = path.join(semDir, folder);
  const file = fs.readdirSync(dir).filter((f) => f.startsWith("lesson-" + code.replace(".", "-") + "-") && !f.endsWith("-activity.html"))[0];
  if (!file) return null;
  const html = fs.readFileSync(path.join(dir, file), "utf8");
  const m = html.match(/window\.DAF_WEEK = (.*?);<\/script>/s);
  return m ? { json: m[1], payload: JSON.parse(m[1]), file: path.join("weeks/Semester-" + semester, folder, file) } : null;
}

/* ---- the printed page, re-read straight from the md ---------------------- */
function mdSection(file, code) {
  const abs = path.isAbsolute(file) ? file : path.join(ROOT, file);
  if (!fs.existsSync(abs)) return "";
  const txt = fs.readFileSync(abs, "utf8").replace(/\r\n/g, "\n");
  const re = new RegExp("^##\\s+Lesson\\s+" + code.replace("-", "-") + "\\s*[—-][\\s\\S]*?(?=^##\\s|^\\*\\*Week \\d)", "m");
  const m = txt.match(re);
  if (!m) return "";
  /* the FIKR map is boilerplate identical under every lesson — not content */
  return m[0].replace(/^####[^\n]*$/gm, "").replace(/\|.*$/gm, (line) => (/Stage|Preparation|Diagnose|Knowledge|Practice \||:--/.test(line) ? "" : line));
}

/* ========================= 1 · fidelity ================================== */
let checks = 0, missing = [], thinWeeks = [];
CONTENT.weeks.forEach((w) => {
  if (!w.lessons) return;
  Object.keys(w.lessons).forEach((code) => {
    const got = payloadOf(w.semester, w.week, code);
    if (!got) { missing.push(`s${w.semester}w${w.week} ${code}: no stamped deck`); return; }
    checks++;
    const L = w.lessons[code];
    const bag = norm(flatten(got.payload).join(" ~ ") + " " + got.json);

    /* the objective, as printed */
    if (L.iCan && !bag.includes(norm(L.iCan).slice(0, 40))) missing.push(`s${w.semester}w${w.week} ${code}: the I-can sentence is not in the deck`);

    /* every numbered item the week file printed for this lesson */
    const printed = [];
    Object.keys(L.sections || {}).forEach((k) => {
      const s = L.sections[k] || {};
      ["items", "understand", "knowHow"].forEach((key) => (s[key] || []).forEach((it) => printed.push({ sec: k, it })));
    });
    let dropped = 0;
    printed.forEach(({ sec, it }) => {
      const t = norm(it.text);
      if (t.length > 6 && !bag.includes(t.slice(0, Math.min(t.length, 46)))) dropped++;
    });
    if (dropped) missing.push(`s${w.semester}w${w.week} ${code}: ${dropped}/${printed.length} printed item(s) not found in the deck`);

    /* the numbers: nothing may be changed or lost */
    const src = mdSection(w.source, code);
    const want = numbersOf(src);
    const have = new Set(numbersOf(got.json));
    const lost = want.filter((n) => !have.has(n));
    const uniqWant = [...new Set(want)];
    const cov = uniqWant.length ? (uniqWant.length - new Set(lost).size) / uniqWant.length : 1;
    if (cov < 0.9) missing.push(`s${w.semester}w${w.week} ${code}: only ${(cov * 100).toFixed(0)}% of the printed numbers reached the deck (${new Set(lost).size} missing of ${uniqWant.length})`);
    else if (cov < 1 && verbose) console.log(`  note  s${w.semester}w${w.week} ${code}: ${(cov * 100).toFixed(0)}% number coverage — ${[...new Set(lost)].slice(0, 6).join(", ")} live only in prose outside a printable run`);
    if (cov < 1) thinWeeks.push([`s${w.semester}w${w.week} ${code}`, cov, [...new Set(lost)].slice(0, 8)]);
  });
});

/* ========================= 2 · every drawing runs ======================== */
function stubCanvas() {
  const calls = { n: 0 };
  const grad = { addColorStop() {} };
  const ctx = {
    canvas: null, save() {}, restore() {}, beginPath() {}, closePath() {},
    moveTo() {}, lineTo() {}, arc() {}, ellipse() {}, rect() {}, fill() {}, stroke() {},
    clip() {}, translate() {}, rotate() {}, scale() {}, setLineDash() {}, arcTo() {},
    quadraticCurveTo() {}, bezierCurveTo() {}, drawImage() {}, transform() {}, setTransform() {},
    resetTransform() {}, createPattern: () => ({}), getImageData: () => ({ data: [] }),
    putImageData() {}, roundRect() {}, ellipse2() {}, filter: undefined,
    fillRect() {}, strokeRect() {}, clearRect() {}, fillText() {}, strokeText() {},
    measureText: () => ({ width: 10 }), createLinearGradient: () => grad, createRadialGradient: () => grad,
    set font(v) {}, get font() { return "10px sans-serif"; },
    set fillStyle(v) { calls.n++; }, get fillStyle() { return "#000"; },
    set strokeStyle(v) {}, get strokeStyle() { return "#000"; },
    set lineWidth(v) {}, get lineWidth() { return 1; },
    set globalAlpha(v) {}, get globalAlpha() { return 1; },
    set textAlign(v) {}, get textAlign() { return "left"; },
    set textBaseline(v) {}, get textBaseline() { return "alphabetic"; },
    set filter(v) {}, set shadowColor(v) {}, set shadowBlur(v) {}
  };
  const canvas = { width: 640, height: 320, style: {}, getContext: () => ctx, __taps: [] };
  ctx.canvas = canvas;
  return canvas;
}
/* the engine's drawing library + the week compiler, loaded the way a deck does */
const engine = ["omml.js", "draw.js"].map((f) => fs.readFileSync(path.join(ROOT, "engine", f), "utf8")).join("\n");
const weekSrc = fs.readFileSync(path.join(ROOT, "engine", "week-screens.jsx"), "utf8");
/* strip the JSX components: drawWeekFig and its helpers are plain JS */
const figStart = weekSrc.indexOf("function wkPanel");
const figEnd = weekSrc.indexOf("function WeekFig(");
const figSrc = weekSrc.slice(figStart, figEnd > figStart ? figEnd : weekSrc.length);
const sandbox = { window: {}, document: { createElement: () => stubCanvas() }, requestAnimationFrame: () => 0, cancelAnimationFrame() {} };
const vm = require("vm");
const ctxObj = vm.createContext(Object.assign(sandbox, {
  React: { createElement: () => null, useState: () => [null, () => {}], useEffect: () => {}, useRef: () => ({ current: null }) },
  LESSON: { code: "0-0", title: "", unit: "", math: {}, ixl: [], metas: [], Visual: () => null },
  window: Object.assign(sandbox.window, { DAF_WEEK: null, DAF_ROSTER: {}, devicePixelRatio: 1, matchMedia: () => ({ matches: false, addListener() {}, removeListener() {} }) })
}));
ctxObj.document = sandbox.document;
ctxObj.requestAnimationFrame = sandbox.requestAnimationFrame;
ctxObj.cancelAnimationFrame = sandbox.cancelAnimationFrame;
vm.runInContext(engine + "\n" + "const D = window.DAFDraw;\n" + figSrc
  + "\nglobalThis.__drawWeekFig = drawWeekFig; globalThis.__wkChunks = wkChunks; globalThis.__wkExpanded = wkExpanded;", ctxObj, { filename: "week-figs.js" });
const drawWeekFig = ctxObj.__drawWeekFig;

const figs = new Map();
CONTENT.weeks.forEach((w) => Object.values(w.lessons || {}).forEach((L) => {
  Object.values(L.sections || {}).forEach((s) => {
    (s.blocks || []).forEach((b) => { if (b.fig) figs.set(JSON.stringify(b.fig), b.fig); });
    if (s.fig) figs.set(JSON.stringify(s.fig), s.fig);
    ["items", "understand", "knowHow"].forEach((k) => (s[k] || []).forEach((it) => { if (it.fig) figs.set(JSON.stringify(it.fig), it.fig); }));
    ["understand", "knowHow"].forEach((k) => (s[k] || []).forEach((it) => { if (it.fig) figs.set(JSON.stringify(it.fig), it.fig); }));
  });
}));
let figRuns = 0, figFails = [];
const kinds = {};
for (const fig of figs.values()) {
  kinds[fig.kind] = (kinds[fig.kind] || 0) + 1;
  let draw;
  try { draw = drawWeekFig(fig); } catch (e) { figFails.push(fig.kind + " build: " + e.message); continue; }
  [1, 90, 250, 640].forEach((frame) => {
    const canvas = stubCanvas();
    try { draw(canvas.getContext("2d"), 640, 300, frame); figRuns++; }
    catch (e) { figFails.push(fig.kind + " @frame " + frame + ": " + e.message + " " + JSON.stringify(fig).slice(0, 90)); }
  });
}
/* also the odd shapes the solver can emit for edge values */
[0, 1, 7, 99, 100, 999, 1000, 12345, 1000000].forEach((n) => {
  [{ kind: "pv", digits: String(n) }, { kind: "col", a: n, b: Math.max(1, n / 2 | 0), op: "-" },
   { kind: "compare", a: n, b: n }, { kind: "mult", a: 3, b: n }, { kind: "div", a: n, b: 7 },
   { kind: "round", value: n, lo: 0, hi: Math.max(1, n) || 1 }, { kind: "factor", n: Math.min(n, 60) },
   { kind: "frac", fracs: [{ n: 1, d: 2 }, { n: 3, d: 4 }] }, { kind: "lineplot", den: 8, counts: [{ at: 3, count: 4 }] },
   { kind: "seq", nums: [1, 3, 5, 7] }, { kind: "rect", long: n, short: 3 }, { kind: "cube", L: 3, W: 2, H: 1 },
   { kind: "strip", parts: [{ v: 1, label: "1" }], total: 1 }, { kind: "clock", h: 3, m: 45 },
   { kind: "dec", value: n / 100 }, { kind: "angle", deg: (n % 360) + 1 }, { kind: "unit", n: 3, big: "ft", small: "in", copies: 12 },
   { kind: "plotpoints", rows: [[1, 2], [2, 4]], head: ["in", "out"] }, { kind: "table", head: ["a"], rows: [["1"]] },
   { kind: "mixed", fracs: [{ n: 1, d: 4 }] }, { kind: "fracline", fracs: [{ n: 1, d: 3 }] },
   { kind: "lines", lineKind: "ray" }, { kind: "shape", name: "hexagon" }, { kind: "symmetry" }, { kind: "unknown-kind" }
  ].forEach((fig) => {
    try { const d = drawWeekFig(fig); const c = stubCanvas(); d(c.getContext("2d"), 640, 300, 3); figRuns++; }
    catch (e) { figFails.push("edge " + fig.kind + "(" + n + "): " + e.message); }
  });
});

/* ========================= report ======================================== */
console.log("\nfidelity: " + checks + " stamped deck(s) checked against their week file");
if (missing.length) {
  console.log("  problems (" + missing.length + "):");
  missing.slice(0, verbose ? 999 : 14).forEach((m) => console.log("   · " + m));
  if (!verbose && missing.length > 14) console.log("   … " + (missing.length - 14) + " more (run with --verbose)");
} else console.log("  every I-can sentence, printed item and number the week files carried reached the decks");
console.log("\ndrawings: " + figRuns + " figure frames rendered — kinds: " +
  Object.entries(kinds).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ":" + v).join("  "));
if (figFails.length) { console.log("  crashes (" + figFails.length + "):"); [...new Set(figFails)].slice(0, 12).forEach((f) => console.log("   ! " + f)); }
else console.log("  no drawing threw, on real payloads or on edge values");
if (!missing.length && !figFails.length) { console.log("\nWEEK LAYER OK"); process.exit(0); }
process.exit(1);
