#!/usr/bin/env node
/* render-shot.js — print what a stamped deck actually shows on each week
   screen (text + which figures drew), for eyeballing the copy without a
   browser.  node scripts/render-shot.js <file> [screenIndex …] */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const { JSDOM, VirtualConsole } = require("jsdom");
const babel = require("@babel/standalone");
const umd = (p) => fs.readFileSync(path.join(ROOT, "node_modules", p), "utf8");
const REACT = umd("react/umd/react.production.min.js");
const REACT_DOM = umd("react-dom/umd/react-dom.production.min.js");
const GSAP = umd("gsap/dist/gsap.min.js");

function extract(html) {
  const plain = []; let jsx = null;
  const re = /<script([^>]*)>([\s\S]*?)<\/script>/g; let m;
  while ((m = re.exec(html)) !== null) {
    if (!m[2].trim()) continue;
    if (/type="text\/babel"/.test(m[1])) jsx = m[2];
    else if (!/src=/.test(m[1])) plain.push(m[2]);
  }
  return { plain, jsx };
}
(async () => {
  const file = process.argv[2];
  const want = process.argv.slice(3).map(Number);
  const html = fs.readFileSync(file, "utf8");
  const { plain, jsx } = extract(html);
  const dom = new JSDOM(html, { url: "http://localhost/x.html", runScripts: "outside-only", pretendToBeVisual: true, virtualConsole: new VirtualConsole() });
  const w = dom.window;
  w.matchMedia = (q) => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } });
  w.eval(REACT); w.eval(REACT_DOM); w.eval(GSAP);
  plain.forEach((s) => w.eval(s));
  const compiled = babel.transform(jsx, { presets: [["react", { runtime: "classic" }]] }).code;
  const h = w.eval("(function(){\n" + compiled + "\n;return { SEQ: SEQ };})();");
  const doc = w.document;
  const ticks = (n) => new Promise((res) => { let k = 0; const step = () => { if (++k >= n) res(); else w.requestAnimationFrame(step); }; w.requestAnimationFrame(step); });
  await ticks(3);
  const gate = Array.from(doc.querySelectorAll("button")).find((b) => /^\s*4[A-C]/.test(b.textContent));
  if (gate) { gate.click(); await ticks(3); }
  const idxs = want.length ? want : h.SEQ.metas.map((m, i) => i).filter((i) => typeof h.SEQ.visuals[i] === "string" ? h.SEQ.visuals[i].startsWith("week:") : true);
  for (const i of idxs) {
    doc.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Home", bubbles: true }));
    for (let k = 0; k < i; k++) doc.dispatchEvent(new w.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    await ticks(3);
    const screen = doc.querySelector(".screen") || doc.getElementById("root");
    const canvases = doc.querySelectorAll("canvas").length;
    const txt = (screen.textContent || "").replace(/\s+/g, " ").trim();
    console.log("\n===== screen " + (i + 1) + "/" + h.SEQ.metas.length + "  [" + (typeof h.SEQ.visuals[i] === "string" ? h.SEQ.visuals[i] : "lesson " + h.SEQ.visuals[i]) + "]  stage " + h.SEQ.stages[i] + " · " + canvases + " canvas =====");
    console.log(txt.slice(0, 1500));
  }
})();
