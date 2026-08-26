#!/usr/bin/env node
/* ===========================================================================
   smoke-stage.js — jsdom render smoke for the seven-stage decks.

   Chrome is not available in this sandbox, so this harness does the next
   best thing a CI box can do: it loads a BUILT lesson file into jsdom with
   the real React 18 / ReactDOM / GSAP / Babel-standalone UMD builds (the
   same files the CDN registry serves), polyfills the two browser APIs jsdom
   lacks (matchMedia, requestAnimationFrame), then DRIVES the deck like a
   teacher would:

     1. opens the class gate and picks a class
     2. walks every screen with the arrow key
     3. votes the gap map, runs the practice sprint, commits the critic's
        method, defends all three challenges, taps the gate lanes and posts
        to the evidence wall

   Any render crash, error-boundary trip or missing stage screen fails the
   lesson. Usage: node scripts/smoke-stage.js <code> [code …]
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
    const attrs = m[1];
    const body = m[2];
    if (!body.trim()) continue;
    if (/type="text\/babel"/.test(attrs)) jsx = body;
    else if (!/src=/.test(attrs)) plain.push(body);
  }
  return { plain, jsx };
}

async function smoke(code, title) {
  const files = fs.readdirSync(path.join(ROOT, "html")).filter((f) => f.startsWith("lesson-" + code + "-"));
  if (!files.length) { console.error("FAIL " + code + ": no built file"); return 1; }
  const html = fs.readFileSync(path.join(ROOT, "html", files[0]), "utf8");
  const { plain, jsx } = extractScripts(html);
  if (!jsx) { console.error("FAIL " + code + ": no babel block"); return 1; }

  const errors = [];
  const vc = new VirtualConsole();
  const jsdomNoise = (msg) =>
    /Could not parse CSS/.test(msg) || /* font/link noise, not a deck error */
    /HTMLCanvasElement.s getContext\(\) method: without installing the canvas/.test(msg); /* jsdom has no canvas */
  vc.on("jsdomError", (e) => {
    const msg = String(e.message || e);
    if (jsdomNoise(msg)) return;
    errors.push("jsdom: " + msg.slice(0, 300));
  });
  vc.on("error", (...a) => errors.push("console.error: " + a.map(String).join(" ").slice(0, 400)));
  vc.on("warn", (...a) => errors.push("console.warn: " + a.map(String).join(" ").slice(0, 300)));
  const dom = new JSDOM(html, {
    url: "http://localhost/" + files[0],
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole: vc
  });
  const w = dom.window;
  /* the two browser APIs jsdom lacks */
  w.matchMedia = (q) => ({
    matches: false, media: q,
    addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {},
    dispatchEvent() { return false; }
  });
  w.addEventListener("error", (e) => errors.push("window.onerror: " + String(e.message).slice(0, 300)));

  const run = (src) => w.eval(src);
  /* Each w.eval is its own script, so the bundle's top-level consts (SEQ,
     LESSON, PHASES…) would vanish between evals — the browser compiles all of
     this as ONE script. Wrap the compiled bundle in an IIFE that returns the
     handles the probes need; everything else persists on window as usual. */
  let handle = null;
  try {
    run(REACT); run(REACT_DOM); run(GSAP);
    plain.forEach(run);
    const compiled = babel.transform(jsx, {
      presets: [["react", { runtime: "classic" }]]
    }).code;
    handle = run("(function(){\n" + compiled + "\n;return { SEQ: SEQ, LESSON: LESSON };})();");
  } catch (e) {
    console.error("FAIL " + code + ": boot — " + String(e.message).slice(0, 400));
    return 1;
  }
  if (!handle || !handle.SEQ) {
    console.error("FAIL " + code + ": boot — bundle did not define SEQ");
    return 1;
  }
  const doc = w.document;
  const ticks = (n) => new Promise((res) => { let k = 0; const step = () => { if (++k >= n) res(); else w.requestAnimationFrame(step); }; w.requestAnimationFrame(step); });
  await ticks(4);

  const rootHtml = () => doc.getElementById("root").innerHTML;
  /* the fallback notice only ever REPLACES #root's content — the string also
     occurs in the bundle source inside <body>, so check the root, not the body */
  if (rootHtml().length < 300 || /offline sandboxed preview/i.test(rootHtml())) {
    console.error("FAIL " + code + ": did not paint (offline fallback or empty root)");
    errors.slice(0, 8).forEach((e) => console.error("   " + e));
    console.error("   root: " + rootHtml().slice(0, 200).replace(/\s+/g, " "));
    return 1;
  }

  /* ---- pick a class at the gate ------------------------------------------ */
  const gateBtn = Array.from(doc.querySelectorAll("button")).find((b) => /^\s*4A/.test(b.textContent));
  if (!gateBtn) { console.error("FAIL " + code + ": class gate not found"); return 1; }
  gateBtn.click();
  await ticks(4);

  const plan = (JSON.parse(w.eval("JSON.stringify(window.DAF_STAGE)")).lessons || {})[code] || null;
  const hasPlan = !!plan;
  const metasN = handle.SEQ.metas.length;
  const stageOf = handle.SEQ.stages;
  if (hasPlan) {
    const stagesSeen = new Set(stageOf);
    const need = new Set([1, 2, 3, 4, 5, 6, 7]);
    if (![...need].every((s) => stagesSeen.has(s))) {
      console.error("FAIL " + code + ": stage coverage missing — " + [...stagesSeen].sort());
      return 1;
    }
  }

  const key = (k) => w.dispatchEvent(new w.KeyboardEvent("keydown", { key: k, bubbles: true }));
  const text = (sel) => { const el = doc.querySelector(sel); return el ? el.textContent : ""; };
  const stageChip = () => text(".stage-chip");
  const phaseTag = () => text(".phase-tag");

  /* ---- walk the deck, interacting with each stage screen ------------------ */
  let interacted = { gap: 0, sprint: 0, critic: 0, gate: 0, wall: 0 };

  for (let i = 0; i < metasN; i++) {
    const st = stageOf[i];
    if (st > 0) {
      const chip = stageChip();
      if (!chip.includes("Stage " + st)) {
        console.error("FAIL " + code + ": screen " + (i + 1) + " chip says " + JSON.stringify(chip) + " expected Stage " + st);
        return 1;
      }
    }
    if (st === 2 && i === 1) {
      /* vote the gap map: alternate can / not yet */
      const votes = doc.querySelectorAll(".gap-vote button");
      votes.forEach((b, k) => { b.click(); });
      await ticks(3);
      interacted.gap = votes.length;
      if (!text(".gap-verdict")) { console.error("FAIL " + code + ": no gap verdict after voting"); return 1; }
    }
    if (st === 4) {
      /* run the sprint to completion: always pick the RIGHT option, first try */
      const items = plan.practice.items;
      let cur = 0;
      while (cur < items.length && stageChip().includes("Stage 4")) {
        const it = items[cur];
        if (it.mode === "harder") {
          const reveal = Array.from(doc.querySelectorAll("button")).find((b) => /The class answers — reveal/.test(b.textContent));
          if (!reveal) { console.error("FAIL " + code + ": harder lane reveal missing"); return 1; }
          reveal.click(); await ticks(3);
        } else {
          const cards = Array.from(doc.querySelectorAll("div.glass-card")).filter((c) => c.style.minHeight === "56px");
          if (cards.length !== it.options.length) { console.error("FAIL " + code + ": sprint options not rendered (" + cards.length + ")"); return 1; }
          const rightIdx = it.options.findIndex((o) => o.v === it.right);
          cards[rightIdx].click(); await ticks(3);
        }
        const nextBtn = Array.from(doc.querySelectorAll("button")).find((b) => /Next item|Sprint complete/.test(b.textContent));
        if (!nextBtn) { console.error("FAIL " + code + ": sprint item " + (cur + 1) + " did not resolve"); return 1; }
        nextBtn.click(); await ticks(3);
        cur++;
        interacted.sprint++;
      }
      if (!/Sprint complete —/.test(doc.body.innerHTML)) { console.error("FAIL " + code + ": sprint never finished"); return 1; }
    }
    if (st === 5) {
      /* commit the right method, then defend all three challenges */
      const methodRight = plan.critic.method.right;
      const methodOpts = doc.querySelectorAll(".critic-opt");
      if (methodOpts.length === 3) {
        methodOpts[methodRight].click();
        await ticks(3);
        const begin = Array.from(doc.querySelectorAll("button")).find((b) => /Begin the critique/.test(b.textContent));
        if (!begin) { console.error("FAIL " + code + ": critique did not begin (method pick)"); return 1; }
        begin.click();
        await ticks(3);
        for (let c = 0; c < plan.critic.challenges.length; c++) {
          const opts = doc.querySelectorAll(".critic-opt");
          if (opts.length !== 3) { console.error("FAIL " + code + ": challenge " + (c + 1) + " options missing"); return 1; }
          opts[plan.critic.challenges[c].right].click();
          await ticks(3);
          const nextBtn = Array.from(doc.querySelectorAll("button")).find((b) => /Next challenge|Accept the production/.test(b.textContent));
          if (!nextBtn) { console.error("FAIL " + code + ": challenge " + (c + 1) + " not accepted"); return 1; }
          nextBtn.click();
          await ticks(3);
          interacted.critic++;
        }
        if (!/Production accepted/.test(doc.body.innerHTML)) { console.error("FAIL " + code + ": production never accepted"); return 1; }
      }
    }
    if (st === 6) {
      /* the gate: answer the formative check (simple: pick a card; harder
         lane: reveal both), then tap the forward lane — the dojo opens armed,
         close it with Done, and confirm the reteach recipe is printed */
      const swykCards = Array.from(doc.querySelectorAll("div.glass-card")).filter((c) => c.style.minHeight === "62px");
      if (swykCards.length) {
        swykCards[0].click(); await ticks(3);
      } else {
        const reveal = Array.from(doc.querySelectorAll("button")).find((b) => /Reveal both answers/.test(b.textContent));
        if (!reveal) { console.error("FAIL " + code + ": gate check neither simple nor harder-lane"); return 1; }
        reveal.click(); await ticks(3);
      }
      const lanes = doc.querySelectorAll(".gate-lane-btn");
      if (lanes.length !== 2) { console.error("FAIL " + code + ": gate lanes not visible (" + lanes.length + ")"); return 1; }
      lanes[0].click(); await ticks(3);
      const done = Array.from(doc.querySelectorAll("button")).find((b) => b.textContent.trim() === "Done");
      if (!done) { console.error("FAIL " + code + ": dojo did not open for the gate lane"); return 1; }
      done.click(); await ticks(3);
      interacted.gate = 2;
      if (!text(".gate-recipe")) { console.error("FAIL " + code + ": gate recipe missing (IXL + reopen)"); return 1; }
      if (!/IXL/.test(text(".gate-recipe"))) { console.error("FAIL " + code + ": gate recipe has no IXL codes"); return 1; }
    }
    if (st === 7) {
      const post = Array.from(doc.querySelectorAll("button")).find((b) => /Post a student's version/.test(b.textContent));
      if (!post) { console.error("FAIL " + code + ": evidence wall missing on final screen"); return 1; }
      post.click(); await ticks(2); post.click(); await ticks(2);
      interacted.wall = 2;
      if (!text(".wall-artifact")) { console.error("FAIL " + code + ": wall artifact missing"); return 1; }
    }
    /* error-boundary trip anywhere = failure */
    if (/Visual component reset/.test(rootHtml())) {
      console.error("FAIL " + code + ": error boundary tripped on screen " + (i + 1) + " (Stage " + st + ")");
      errors.slice(0, 8).forEach((e) => console.error("   " + e));
      return 1;
    }
    if (i < metasN - 1) { key("ArrowRight"); await ticks(3); }
  }

  if (errors.length) {
    console.error("FAIL " + code + ": runtime errors:\n  " + errors.slice(0, 5).join("\n  "));
    return 1;
  }
  console.log("PASS " + code + " · " + metasN + " screens · stages " +
    stageOf.map((s) => s).join("") +
    " · gap-votes " + interacted.gap + " · sprint-steps " + interacted.sprint +
    " · challenges " + interacted.critic + " · gate-lanes " + interacted.gate +
    " · wall-posts " + interacted.wall +
    " · last: " + phaseTag().trim());
  w.close();
  return 0;
}

(async () => {
  const args = process.argv.slice(2);
  if (!args.length) { console.error("usage: smoke-stage.js <code> [code …]"); process.exit(2); }
  let fails = 0;
  for (const code of args) {
    if ((await smoke(code)) !== 0) fails++;
  }
  process.exit(fails ? 1 : 0);
})();
