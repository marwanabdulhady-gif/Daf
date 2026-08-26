#!/usr/bin/env node
/* ===========================================================================
   check-stage-plan.js — validate stage/stage-plan.json (the seven-stage
   structure for all 114 lessons) against the curriculum and the lesson
   sources. Deterministic and independent of the generator's internal state.
   =========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const curriculum = JSON.parse(fs.readFileSync(path.join(ROOT, "curriculum.json"), "utf8"));

let plan;
try {
  plan = JSON.parse(fs.readFileSync(path.join(ROOT, "stage", "stage-plan.json"), "utf8"));
} catch (e) {
  console.error("FAIL cannot read stage/stage-plan.json:", e.message);
  process.exit(1);
}

const errors = [];
const push = (m) => errors.push(m);

if (plan.schemaVersion !== 1) push("schemaVersion must be 1");
if (!Array.isArray(plan.stages) || plan.stages.length !== 7) push("stages must list exactly 7 stages");
else {
  plan.stages.forEach((s, i) => {
    if (s.n !== i + 1) push("stage " + (i + 1) + " has wrong n");
    for (const k of ["key", "name", "timing", "aim"]) if (!s[k]) push("stage " + s.n + " missing " + k);
  });
}

const codes = curriculum.topics.flatMap((t) => t.lessons.map((l) => l.code));
const got = Object.keys(plan.lessons || {});
codes.forEach((c) => { if (!plan.lessons[c]) push("missing lesson " + c); });
got.forEach((c) => { if (codes.indexOf(c) === -1) push("unknown lesson " + c); });
if (got.length !== codes.length) push("coverage: curriculum " + codes.length + ", plan " + got.length);

const hasArabic = (s) => /[\u0600-\u06FF]/.test(s);

/* ---- per-topic authored improvements (stage/topics/*.json) ---------------- */
/* The deepening pass is done topic by topic. Authored fields replace the
   generated ones; where a topic file exists we also require the things that
   make the pass real: the independent item is a genuinely new item (not the
   guided item re-shown) and the harder lane (if any) is complete. */
const topicsDir = path.join(ROOT, "stage", "topics");
const overrides = {};
let authoredTopics = 0;
if (fs.existsSync(topicsDir)) {
  for (const f of fs.readdirSync(topicsDir).filter((x) => x.endsWith(".json")).sort()) {
    const t = JSON.parse(fs.readFileSync(path.join(topicsDir, f), "utf8"));
    authoredTopics++;
    /* the deepening pass is research-first: the topic file must carry the
       approved sources its STEM productions are grounded in */
    if (!Array.isArray(t.sources) || t.sources.length === 0 ||
        t.sources.some((s) => typeof s !== "string" || !s))
      push("topic " + t.topic + ": missing research sources for the STEM productions");
    for (const code of Object.keys(t.lessons || {})) overrides[code] = t;
  }
}

for (const code of codes) {
  const L = plan.lessons[code];
  if (!L) continue;
  const where = code + ": ";

  /* screens — the four engine metas */
  for (const k of ["prep", "diagnose", "practice", "critic"]) {
    const s = L.screens && L.screens[k];
    if (!s) { push(where + "missing screens." + k); continue; }
    for (const f of ["phase", "title", "lead", "goal", "pull"])
      if (typeof s[f] !== "string" || !s[f]) push(where + "screens." + k + "." + f + " invalid");
    const r = s.rail || {};
    if (typeof r.launch !== "string" || !Array.isArray(r.monitor) || r.monitor.length !== 3 ||
        typeof r.connect !== "string" || typeof r.misconception !== "string")
      push(where + "screens." + k + ".rail invalid");
  }
  if (L.screens) {
    if (L.screens.prep && L.screens.prep.phase !== "prep") push(where + "prep phase");
    if (L.screens.diagnose && L.screens.diagnose.phase !== "diagnose") push(where + "diagnose phase");
    if (L.screens.practice && L.screens.practice.phase !== "practice") push(where + "practice phase");
    if (L.screens.critic && L.screens.critic.phase !== "produce") push(where + "critic phase");
  }

  /* stage 1 */
  const P = L.prep || {};
  if (!Array.isArray(P.objects) || P.objects.length < 2 || P.objects.some((k) => typeof k !== "string"))
    push(where + "prep.objects must be ≥2 math keys");
  /* the objects must exist in the lesson's M — cross-check the source */
  if (P.objects && P.objects.length) {
    const src = fs.readFileSync(path.join(ROOT, "lessons", code + ".jsx"), "utf8");
    const mm = src.indexOf("const M = {");
    const mBlock = src.slice(mm, src.indexOf("};", mm));
    const mKeys = new Set([...mBlock.matchAll(/^\s{2}([A-Za-z0-9_]+)\s*:/gm)].map((x) => x[1]));
    P.objects.forEach((k) => { if (!mKeys.has(k)) push(where + "prep.objects key " + k + " not in lesson M"); });
  }
  if (!Array.isArray(P.home) || P.home.length !== 3 || P.home.some((h) => typeof h !== "string" || !h))
    push(where + "prep.home must be exactly 3 questions");

  /* stage 2 */
  const D = L.diagnose || {};
  if (!Array.isArray(D.claims) || D.claims.length !== 4 || D.claims.some((c) => typeof c !== "string" || c.length < 12))
    push(where + "diagnose.claims must be 4 checkpoint statements");

  /* stage 4 */
  const PR = L.practice || {};
  if (!Array.isArray(PR.items) || PR.items.length < 2 || PR.items.length > 3)
    push(where + "practice.items must be 2–3");
  else {
    if (PR.items[0].mode !== "guided") push(where + "practice item 1 must be guided");
    if (PR.items[1].mode !== "independent") push(where + "practice item 2 must be independent");
    if (PR.items.length === 3 && PR.items[2].mode !== "harder") push(where + "practice item 3 must be harder");
    PR.items.forEach((it, i) => {
      if (typeof it.prompt !== "string" || !it.prompt) push(where + "practice item " + (i + 1) + " prompt");
      if (it.mode === "harder") {
        if (typeof it.answer !== "string" || !it.answer) push(where + "practice harder item needs answer");
        return;
      }
      if (!Array.isArray(it.options) || it.options.length < 2 || it.options.length > 4)
        push(where + "practice item " + (i + 1) + " needs 2–4 options");
      if (!it.options.every((o) => o.v && (o.text || o.math)))
        push(where + "practice item " + (i + 1) + " options need v + text/math");
      if (!it.options.some((o) => o.v === it.right))
        push(where + "practice item " + (i + 1) + " right option missing");
      if (i === 0 && typeof it.hint !== "string" || !it.yes || !it.notYet)
        push(where + "practice item " + (i + 1) + " needs yes/notYet" + (i === 0 ? "/hint" : ""));
    });
  }

  /* the deepening pass, where present: the independent item must be a new
     item, not the guided one re-shown, and the harder lane must be complete */
  if (overrides[code] && PR.items && PR.items.length >= 2) {
    if (PR.items[1].prompt === PR.items[0].prompt) push(where + "independent item is the guided item re-shown");
    if (PR.items[1].options && PR.items[0].options &&
        JSON.stringify(PR.items[1].options) === JSON.stringify(PR.items[0].options))
      push(where + "independent item offers the same options as the guided item");
    const harder = PR.items.find((it) => it.mode === "harder");
    if (harder && (typeof harder.prompt !== "string" || !harder.prompt ||
                   typeof harder.answer !== "string" || !harder.answer))
      push(where + "harder lane incomplete (needs prompt + answer)");
  }

  /* stage 5 */
  const C = L.critic || {};
  if (typeof C.situation !== "string" || !C.situation) push(where + "critic.situation missing");
  if (typeof C.mission !== "string" || !C.mission) push(where + "critic.mission missing");
  /* the production phase must offer 2–3 buildable STEM options, one of which
     runs AI in the loop (the student uses the AI to research/challenge and
     writes every line themselves — AI critic, never author) */
  const P5 = C.production || {};
  if (!Array.isArray(P5.options) || P5.options.length < 2 || P5.options.length > 3)
    push(where + "critic.production must offer 2–3 options");
  else {
    P5.options.forEach((o, i) => {
      if (typeof o.kind !== "string" || !o.kind || typeof o.task !== "string" || !o.task ||
          typeof o.stem !== "string" || !o.stem)
        push(where + "critic.production.option[" + i + "] incomplete (needs kind + task + STEM cycle)");
    });
    if (!P5.options.some((o) => o.ai === true))
      push(where + "critic.production must include one AI-integrated option (ai: true)");
  }
  if (!C.method || !Array.isArray(C.method.options) || C.method.options.length !== 3 ||
      !C.method.options.every((o) => typeof o === "string" && o.length > 0))
    push(where + "critic.method must offer 3 non-empty string options");
  else if (!(C.method.right >= 0 && C.method.right < 3)) push(where + "critic.method.right out of range");
  else if (new Set(C.method.options).size !== 3) push(where + "critic.method duplicate options");
  if (!Array.isArray(C.challenges) || C.challenges.length !== 3)
    push(where + "critic.challenges must be 3 (trap · reasoning · transfer)");
  else C.challenges.forEach((ch, i) => {
    if (typeof ch.tag !== "string" || typeof ch.question !== "string" || typeof ch.explain !== "string")
      push(where + "challenge " + (i + 1) + " fields");
    if (!Array.isArray(ch.options) || ch.options.length !== 3 ||
        !ch.options.every((o) => typeof o === "string" && o.length > 0))
      push(where + "challenge " + (i + 1) + " needs 3 non-empty string options");
    else if (!(ch.right >= 0 && ch.right < 3)) push(where + "challenge " + (i + 1) + " right out of range");
    else if (new Set(ch.options).size !== 3) push(where + "challenge " + (i + 1) + " duplicate options");
  });

  /* stage 6 */
  const G = L.gate || {};
  if (!Array.isArray(G.ixl) || G.ixl.length === 0) push(where + "gate.ixl must list the lesson's IXL codes");
  if (!Number.isInteger(G.revisitOld) || G.revisitOld < 0) push(where + "gate.revisitOld must be the board case index");

  /* stage 7 */
  const W = L.wall || {};
  if (typeof W.artifact !== "string" || !W.artifact) push(where + "wall.artifact missing");
  if (typeof W.next !== "string" || !W.next) push(where + "wall.next missing");

  /* guardrails: english only, no latex in any plan string */
  const dump = JSON.stringify(L);
  if (hasArabic(dump)) push(where + "Arabic characters in plan (English-only deck)");
  if (/\\frac|\\sqrt/.test(dump)) push(where + "LaTeX in plan (OMML only)");
  (D.claims || []).concat(P.home || []).forEach((s) => {
    if (typeof s === "string" && /(^|\s)>(?![>\s])/m.test(s)) push(where + "naked > in " + s.slice(0, 40));
  });
}

if (errors.length) {
  errors.forEach((e) => console.error("FAIL", e));
  process.exit(1);
}
console.log("stage plan OK · " + codes.length + " lessons · 7 stages each · " +
  authoredTopics + " of " + curriculum.topics.length + " topics deepened (" +
  Object.keys(overrides).length + " lessons)");
