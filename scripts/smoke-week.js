#!/usr/bin/env node
/* ===========================================================================
   smoke-week.js — render a STAMPED week deck in jsdom and walk it.

   The week layer (engine/week-screens.jsx) adds real screens to the deck —
   the week's own Solve & Share, Visual Learning Bridge, printed practice
   runs, the problem-solving page, the assessment item and the closing card.
   This harness boots one stamped file, counts the screens, opens every week
   lane, clicks every reveal and fails on any render error.

     node scripts/smoke-week.js "weeks/Semester-1/Week-02-…/lesson-1-1-….html" […]
     node scripts/smoke-week.js --all            (every stamped deck, 1 at a time)
     node scripts/smoke-week.js --sample 12      (a spread across both semesters)
   =========================================================================== */
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

function extractScripts(html) {
  const plain = [];
  let jsx = null;
  const re = /<script([^>]*)>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const body = m[2];
    if (!body.trim()) continue;
    if (/type="text\/babel"/.test(m[1])) jsx = body;
    else if (!/src=/.test(m[1])) plain.push(body);
  }
  return { plain, jsx };
}

async function smoke(file) {
  const html = fs.readFileSync(file, "utf8");
  const { plain, jsx } = extractScripts(html);
  const rel = path.relative(ROOT, file);
  const fail = (msg) => { console.error("FAIL " + rel + " — " + msg); return 1; };
  if (!jsx) return fail("no babel block");
  const wkM = html.match(/window\.DAF_WEEK = (.*?);<\/script>/s);
  if (!wkM) return fail("no window.DAF_WEEK stamped");
  let payload;
  try { payload = JSON.parse(wkM[1]); } catch (e) { return fail("DAF_WEEK does not parse: " + e.message); }
  const codeM = path.basename(file).match(/lesson-(\d+-\d+)-/);
  const isWeekDeck = payload.deck === true;
  if (!isWeekDeck && (!codeM || !payload.lessons || !payload.lessons[codeM[1]])) {
    return fail("payload has no entry for " + (codeM ? codeM[1] : "this lesson"));
  }

  const errors = [];
  const vc = new VirtualConsole();
  const noise = (m) => /Could not parse CSS/.test(m) || /getContext\(\) method: without installing the canvas/.test(m);
  vc.on("jsdomError", (e) => { const m = String(e.message || e); if (!noise(m)) errors.push("jsdom: " + m.slice(0, 260)); });
  vc.on("error", (...a) => errors.push("console.error: " + a.map(String).join(" ").slice(0, 300)));
  vc.on("warn", (...a) => { const m = a.map(String).join(" "); if (!noise(m)) errors.push("console.warn: " + m.slice(0, 260)); });

  const dom = new JSDOM(html, { url: "http://localhost/" + path.basename(file), runScripts: "outside-only", pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  w.matchMedia = (q) => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } });
  w.addEventListener("error", (e) => errors.push("window.onerror: " + String(e.message).slice(0, 260)));

  let handle = null;
  try {
    w.eval(REACT); w.eval(REACT_DOM); w.eval(GSAP);
    plain.forEach((s) => w.eval(s));
    const compiled = babel.transform(jsx, { presets: [["react", { runtime: "classic" }]] }).code;
    handle = w.eval("(function(){\n" + compiled + "\n;return { SEQ: SEQ, LESSON: LESSON, WEEK: (typeof WEEK!=='undefined'?WEEK:null), plan: (typeof weekScreenPlan==='function'?weekScreenPlan():null) };})();");
  } catch (e) {
    return fail("boot — " + String(e.message).slice(0, 400));
  }
  if (!handle || !handle.SEQ) return fail("bundle did not define SEQ");
  if (!handle.WEEK) return fail("WEEK is null at runtime — the payload never reached the engine");

  const doc = w.document;
  const ticks = (n) => new Promise((res) => { let k = 0; const step = () => { if (++k >= n) res(); else w.requestAnimationFrame(step); }; w.requestAnimationFrame(step); });
  await ticks(3);
  const rootHtml = () => (doc.getElementById("root") || { innerHTML: "" }).innerHTML;
  if (rootHtml().length < 300 || /offline sandboxed preview/i.test(rootHtml())) {
    errors.slice(0, 4).forEach((e) => console.error("   " + e));
    return fail("did not paint");
  }
  /* the class gate */
  const gateBtn = Array.from(doc.querySelectorAll("button")).find((b) => /^\s*4[A-C]/.test(b.textContent));
  if (gateBtn) { gateBtn.click(); await ticks(3); }

  const seq = handle.SEQ;
  let weekIdx = seq.visuals.map((v, i) => (typeof v === "string" && v.slice(0, 5) === "week:" ? i : -1)).filter((i) => i >= 0);
  if (isWeekDeck) weekIdx = seq.visuals.map((v, i) => (typeof v === "number" ? i : -1)).filter((i) => i >= 0);
  if (!weekIdx.length) return fail("no week screens in the sequence");
  if (isWeekDeck && seq.metas.length < 3) return fail("week deck has only " + seq.metas.length + " screens");
  const keys = weekIdx.map((i) => (typeof seq.visuals[i] === "string" ? seq.visuals[i].slice(5) : "screen " + (i + 1)));
  /* every stage 1..7 still present, and every week screen actually renders */
  if (!isWeekDeck) {
    const stages = new Set(seq.stages);
    [1, 2, 3, 4, 5, 6, 7].forEach((s) => { if (!stages.has(s)) errors.push("stage " + s + " missing from the sequence"); });
  }

  let reveals = 0;
  for (const i of weekIdx) {
    w.postMessage ? w.postMessage({ type: "set-slide", step: i }, "*") : null;
    if (seq.visuals[i] === "stage:none") continue;
    /* navigate with the keyboard for reliability */
    const go = () => { doc.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Home", bubbles: true })); };
    go();
    for (let k = 0; k < i; k++) doc.dispatchEvent(new w.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    await ticks(3);
    const chip = (doc.querySelector(".stage-chip") || { textContent: "" }).textContent;
    const want = "Stage " + seq.stages[i];
    if (seq.stages[i] > 0 && chip.indexOf(want) < 0) errors.push("screen " + (i + 1) + " (" + keys[weekIdx.indexOf(i)] + ") chip says " + JSON.stringify(chip.trim().slice(0, 40)) + ", want " + want);
    const body = (doc.querySelector(".wk-panel") || { textContent: "" }).textContent || "";
    if (body.replace(/\s+/g, " ").length < 60) errors.push(keys[weekIdx.indexOf(i)] + " screen painted almost nothing (" + body.length + " chars)");
    /* click every reveal / lane / pager control the week screen offers */
    const btns = Array.from(doc.querySelectorAll(".wk-panel button"));
    for (const b of btns) {
      const label = b.textContent.trim();
      if (/Check my answer|Show the model|I had it|Next|Independent|Do You|Problem|Quick|Guided|Board/i.test(label)) { b.click(); reveals++; await ticks(2); }
    }
    const after = (doc.querySelector(".wk-panel") || { textContent: "" }).textContent || "";
    /* lanes switch which items show, so only demand that it still painted */
    if (after.replace(/\s+/g, " ").length < 40) errors.push(keys[weekIdx.indexOf(i)] + " screen went blank after interaction");
  }
  /* the header must name the week (lesson copies carry the chip; a week deck is
     the whole week, so it shows in its own title instead) */
  if (!isWeekDeck) {
    const head = (doc.querySelector(".week-chip") || { textContent: "" }).textContent;
    if (!new RegExp("Sem " + payload.semester).test(head)) errors.push("header chip missing — got " + JSON.stringify(head.slice(0, 40)));
  }

  if (errors.length) { errors.slice(0, 8).forEach((e) => console.error("   " + e)); return fail(errors.length + " problem(s)"); }
  console.log("  ok   " + rel + " · " + seq.metas.length + " screens (" + keys.length + (isWeekDeck ? " week-deck" : " from the week: " + keys.join(", ")) + ") · " + reveals + " reveals");
  return 0;
}

(async function () {
  const args = process.argv.slice(2);
  let files = args.filter((a) => !a.startsWith("--"));
  if (args.includes("--all") || args.includes("--sample")) {
    const found = [];
    ["Semester-1", "Semester-2"].forEach((sem) => {
      const dir = path.join(ROOT, "weeks", sem);
      if (!fs.existsSync(dir)) return;
      fs.readdirSync(dir).forEach((w) => {
        const d = path.join(dir, w);
        if (!fs.statSync(d).isDirectory()) return;
        fs.readdirSync(d).forEach((f) => {
          if (f.endsWith("-activity.html")) return;
          if (/^lesson-\d+-\d+-.*\.html$/.test(f) || /^week-\d+-.*\.html$/.test(f)) found.push(path.join(d, f));
        });
      });
    });
    if (args.includes("--sample")) {
      const n = +(args[args.indexOf("--sample") + 1] || 12);
      const step = Math.max(1, Math.floor(found.length / n));
      files = found.filter((_, i) => i % step === 0).slice(0, n);
    } else files = found;
  }
  if (!files.length) { console.error("give it a stamped file, or --all / --sample N"); process.exit(2); }
  let bad = 0;
  for (const f of files) bad += await smoke(f);
  console.log((bad ? "FAILED " + bad + " of " : "all clear — ") + files.length + " stamped deck(s) walked");
  process.exit(bad ? 1 : 0);
})();
