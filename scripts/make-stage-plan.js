#!/usr/bin/env node
/* ===========================================================================
   make-stage-plan.js — rebuild the 114 lessons into THE SEVEN STAGES.

   The lesson files own the mathematical content (metas, Visual cases, OMML,
   canvas). The seven-stage architecture is owned by the engine; this script
   generates the per-lesson *stage data* the engine needs, deterministically,
   from what each lesson already contains plus the story map:

     stage 1 Preparation        → the compressed briefing sent before class
                                  (headline objects + the home questions)
     stage 2 Intelligent        → four checkpoint claims for the gap map
                                  Diagnose (not a grade)
     stage 4 Practice           → the lesson's own check, run guided then
                                  independent (seconds-fast feedback)
     stage 5 Production / B     → a genuinely new situation (the story move +
     (Proof-Mastery Gate)        mission) with a scripted critic: three
                                  challenges, never an author
     stage 6 Mastery Gate       → the lesson's formative check now routes:
                                  IXL prescription + revisit deep link
     stage 7 Smart Production   → the artifact for the evidence wall

   Stages 3 and 7 wrap the lesson's existing screens (its explore → connect →
   board arc is Knowledge Building; its handoff/close is Smart Production) —
   the engine inserts the stage boundaries, this file supplies the content.

   Output: stage/stage-plan.json — committed, stamped per lesson at build
   time (window.DAF_STAGE). Deterministic: same inputs → same bytes.
   =========================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const { parseLit, openTagAt, attr, normalize, readString } = require("./lib-parse");

const curriculum = JSON.parse(fs.readFileSync(path.join(ROOT, "curriculum.json"), "utf8"));
const storyMap = JSON.parse(fs.readFileSync(path.join(ROOT, "story", "story-map.json"), "utf8"));

/* ---- deterministic shuffle so option order is stable across rebuilds ----- */
function seedFor(code) {
  let h = 2166136261;
  for (let i = 0; i < code.length; i++) { h ^= code.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(list, rnd) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---- wire forms: math references become plain keys into LESSON.math -------- */
function mathKey(ref) {
  if (!ref) return null;
  const id = ref.id || ref;
  if (typeof id !== "string") return null;
  return id.startsWith("M.") ? id.slice(2) : id;
}
function optsToWire(options) {
  return options.map((o) =>
    o.text !== undefined ? { v: o.v, text: o.text } : { v: o.v, math: mathKey(o.omml) });
}

/* ---- per-lesson extraction ------------------------------------------------ */
function parseLesson(code) {
  const src = fs.readFileSync(path.join(ROOT, "lessons", code + ".jsx"), "utf8");
  const out = { code, src };

  const mi = src.indexOf("metas: [");
  if (mi < 0) throw new Error(code + ": no metas");
  out.metas = parseLit(src, mi + 7)[0];

  const ii = src.indexOf("ixl: [");
  if (ii < 0) throw new Error(code + ": no ixl");
  out.ixl = parseLit(src, ii + 5)[0];

  const mm = src.indexOf("const M = {");
  out.mKeys = [...src.slice(mm, src.indexOf("};", mm)).matchAll(/^\s{2}([A-Za-z0-9_]+)\s*:/gm)].map((x) => x[1]);

  const swTag = openTagAt(src, "ShowWhatYouKnow");
  if (!swTag) throw new Error(code + ": no ShowWhatYouKnow");
  out.swyk = {
    prompt: attr(swTag, "prompt"),
    options: normalize(attr(swTag, "options")),
    right: attr(swTag, "right"),
    support: normalize(attr(swTag, "support")),
    hard: attr(swTag, "hard") ? normalize(attr(swTag, "hard")) : null
  };

  const rsTag = openTagAt(src, "RuleScreen");
  out.hand = rsTag ? attr(rsTag, "hand") : null;

  const nwTag = openTagAt(src, "NoticeWonder");
  out.wonders = nwTag ? (attr(nwTag, "wonders") ? normalize(attr(nwTag, "wonders")) : null) : null;
  const wodbTag = openTagAt(src, "WODB");
  let wodbCards = null;
  if (wodbTag) {
    try { wodbCards = normalize(attr(wodbTag, "cards")); }
    catch (e) {
      /* some lessons build cards with function calls (draw: makeBar("equal")) —
         beyond the literal grammar. Only the why strings matter here. */
      const re2 = new RegExp("(?:^|\\s)cards=(\\{)");
      const em = wodbTag.match(re2);
      let j = em.index + em[0].length, d = 1;
      while (j < wodbTag.length && d > 0) {
        if (wodbTag[j] === '"' || wodbTag[j] === "'") { j = readString(wodbTag, j); continue; }
        if (wodbTag[j] === "{") d++; else if (wodbTag[j] === "}") d--;
        j++;
      }
      const block = wodbTag.slice(em.index + em[0].length, j - 1);
      const whys = [...block.matchAll(/why:\s*"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]);
      if (!whys.length) throw new Error(code + ": WODB cards have no why strings");
      wodbCards = whys.map((w, i) => ({ id: "w" + i, why: w }));
    }
  }
  out.wodbCards = wodbCards;

  const clTag = openTagAt(src, "Closing");
  out.action = clTag ? attr(clTag, "action") : null;

  const shTag = openTagAt(src, "StoryHandoff");
  out.artifact = shTag ? attr(shTag, "artifact") : null;
  out.next = shTag ? attr(shTag, "next") : null;

  /* the old case index of the BoardScreen (the model the gate reopens) */
  const caseRe = /^      case (\d+):/gm;
  const bounds = [];
  let m;
  while ((m = caseRe.exec(src)) !== null) bounds.push({ n: +m[1], at: m.index });
  let boardOld = -1;
  for (let i = 0; i < bounds.length; i++) {
    const end = i + 1 < bounds.length ? bounds[i + 1].at : src.indexOf("  }", bounds[i].at);
    if (src.slice(bounds[i].at, end).indexOf("<BoardScreen") !== -1) { boardOld = bounds[i].n; break; }
  }
  out.boardOld = boardOld;
  return out;
}

/* ---- claim form: "I can ..." for action goals, the statement otherwise ---- */
function claimFrom(goal) {
  const g = goal.trim().replace(/\.$/, "");
  const isStatement = /^(The|A|An|I)\b/.test(g) || /^([A-Z][a-z]+) is\b/.test(g);
  if (!isStatement) return "I can " + g.charAt(0).toLowerCase() + g.slice(1) + ".";
  return g + ".";
}

/* ---- one lesson's stage plan ---------------------------------------------- */
function planFor(code, lessonTitle, standard) {
  const L = parseLesson(code);
  const rnd = mulberry32(seedFor(code));

  /* story map entry (same order as curriculum) */
  const sm = storyMap.units.flatMap((u) => u.lessons).find((x) => x.code === code);
  if (!sm) throw new Error(code + ": missing from story map");
  const unit = storyMap.units.find((u) => u.lessons.some((l) => l.code === code));

  /* ---- stage 1 · Preparation -------------------------------------------- */
  let home;
  if (L.wonders && L.wonders.length >= 3) {
    home = L.wonders.slice(0, 3).map((w) => w.replace(/\.$/, ""));
  } else if (L.wodbCards && L.wodbCards.length >= 2) {
    home = [
      "Which one doesn't belong — every card has a defensible reason",
      L.wodbCards[0].why.replace(/\.$/, ""),
      L.wodbCards[1].why.replace(/\.$/, "")
    ];
  } else {
    throw new Error(code + ": no home-question source (wonders or WODB cards)");
  }

  /* ---- stage 2 · Intelligent Diagnose ------------------------------------ */
  /* claims come from the build screens (metas 2..5) — the monitor, connect
     and synthesis goals are student actions. metas[1] is the launch screen;
     its goal is phrased from the designer's seat ("create the need") and
     would read wrong as a student claim. */
  const claims = [2, 3, 4, 5].map((i) => claimFrom(L.metas[i].goal));

  /* ---- stage 4 · Practice -------------------------------------------------- */
  const s = L.swyk;
  const items = [
    { mode: "guided", prompt: s.prompt, options: optsToWire(s.options), right: s.right,
      yes: s.support.yes, notYet: s.support.notYet, hint: s.support.hint },
    { mode: "independent", prompt: s.prompt, options: optsToWire(s.options), right: s.right,
      yes: s.support.yes, notYet: s.support.notYet }
  ];
  if (s.hard) {
    items.push({ mode: "harder", prompt: s.hard.prompt,
      math: mathKey(s.hard.omml), answer: s.hard.answer, hint: s.hard.hint || null });
  }

  /* ---- stage 5 · Production / B — Proof-Mastery Gate ---------------------- */
  const swykMeta = L.metas[L.metas.findIndex((m) => m.phase === "swyk")];
  const mon = swykMeta.rail.monitor;
  /* the method the work rests on: the RuleScreen hand where the lesson has
     one; otherwise the BoardScreen meta's lead — the rule the board built
     publicly, word for word what the class's work is based on. */
  let hand = L.hand;
  if (!hand && L.boardOld >= 0) hand = (L.metas[L.boardOld] || {}).lead || null;
  if (!hand) throw new Error(code + ": no method source (RuleScreen hand or board lead)");
  const methodOpts = shuffle([hand, swykMeta.rail.misconception, "Copy the example and change the labels"], rnd);
  const methodRight = methodOpts.indexOf(hand);
  const ch1Opts = shuffle([
    "We checked against this: " + mon[0].toLowerCase(),
    "It can't fail — the answer matches the example",
    "The numbers look right, so the method must be right"
  ], rnd);
  const ch2Opts = shuffle([
    mon[1],
    "Because it worked once",
    "Because it matches the example"
  ], rnd);
  const actionShort = (L.action || sm.studentMission).replace(/\.$/, "");
  const ch3Opts = shuffle([
    actionShort,
    "Copy the lesson's numbers and change the labels",
    "Ask the class what they think first"
  ], rnd);
  const critic = {
    situation: sm.storyMove,
    mission: sm.studentMission,
    method: { options: methodOpts, right: methodRight },
    challenges: [
      { tag: "The trap",
        question: "The critic reads the work and names the most likely trap in it: " + swykMeta.rail.misconception +
          " How does your production dodge it?",
        options: ch1Opts, right: ch1Opts.findIndex((o) => o.startsWith("We checked")),
        explain: "The critic never corrects — it makes the class check its own evidence." },
      { tag: "The reasoning",
        question: swykMeta.rail.connect,
        options: ch2Opts, right: ch2Opts.indexOf(mon[1]),
        explain: "A reason tied to the structure survives a new situation; a reason tied to one answer does not." },
      { tag: "The transfer",
        question: "Last, the critic asks for transfer — " + sm.studentMission + " What is the first move?",
        options: ch3Opts, right: ch3Opts.indexOf(actionShort),
        explain: "Transfer is the first move, not the answer. The critic stops there — the work is the students'." }
    ]
  };

  /* ---- stage 6 · Mastery Gate ---------------------------------------------- */
  const gate = { ixl: L.ixl, revisitOld: L.boardOld };

  /* ---- stage 7 · Smart Production ------------------------------------------ */
  const wall = {
    artifact: L.artifact || unit.artifact,
    next: L.next || L.metas[L.metas.length - 1].pull
  };

  /* ---- the four engine screens (metas the engine renders) ------------------ */
  const screens = {
    prep: {
      phase: "prep",
      title: "The briefing was <em>sent before class</em>",
      lead: "First exposure happened at home, at each student's own pace. This is the compressed material the class met before class.",
      goal: "Recover the first exposure, so class time begins with thinking — not with content delivery.",
      pull: "Now the probe: what does the class already hold?",
      rail: {
        launch: "Do not teach here. Confirm the briefing reached the class, then ask what they wondered at home.",
        monitor: ["Reading the core objects aloud", "Recalling the home questions", "Comparing notes against the briefing"],
        connect: "Which of the home questions does today's work answer?",
        misconception: "Treating the briefing as a finished lesson. It is first exposure, not mastery."
      }
    },
    diagnose: {
      phase: "diagnose",
      title: "The <em>gap map</em> — not a grade",
      lead: "Four checkpoints from the briefing. The class votes what it already holds. We are mapping gaps, not scoring students.",
      goal: "Build a gap map: what is known, and what is missing.",
      pull: "Knowledge building closes exactly what the map flags.",
      rail: {
        launch: "Say it out loud: this screen is an instrument, not a test. No names, no marks, no pressure.",
        monitor: ["Voting honestly over confident guesses", "Naming a gap without blame", "Connecting a gap back to the briefing"],
        connect: "Which flagged gap is the most expensive one to leave open?",
        misconception: "Turning the probe into a grade, or letting confident guessing mask a real gap."
      }
    },
    practice: {
      phase: "practice",
      title: "Practice — feedback in <em>seconds, not days</em>",
      lead: "First with the model open, then with it closed. Every answer is met in the moment, not after a delayed correction.",
      goal: "Guided, then independent — learning happens at the moment of doing.",
      pull: "Now a genuinely new situation. The critic arrives — as a critic, never as an author.",
      rail: {
        launch: "Item one is supported: the model stays open. Item two is independent: no model until it is missed.",
        monitor: ["Using the model before answering", "Self-checking after a miss", "Moving on without waiting for the teacher"],
        connect: "Where did the seconds-fast feedback change what the class did next?",
        misconception: "Treating the supported item as the exam and the independent item as a warm-up."
      }
    },
    critic: {
      phase: "produce",
      title: "A genuinely <em>new situation</em>",
      lead: "The class defends its method in a situation it has not seen before. AI enters here — as a critic, never as an author.",
      goal: "Transfer the method into new territory and defend it through critique.",
      pull: "One individual task now decides each student's next path.",
      rail: {
        launch: "The critic examines, challenges and critiques. It never writes the work — the students produce, the critic presses.",
        monitor: ["Stating the method before the critique", "Defending with evidence from the work", "Distinguishing a trap from a method"],
        connect: "Which challenge actually changed the work, and which one did it already survive?",
        misconception: "Letting the critic — or the deck — supply the answer. The production must be the students'."
      }
    }
  };

  return {
    code,
    title: lessonTitle,
    standard,
    screens,
    prep: { objects: L.mKeys.slice(0, 2), home },
    diagnose: { claims },
    practice: { model: L.mKeys.slice(0, 2), items },
    critic,
    gate,
    wall
  };
}

/* ---- per-topic authored improvements --------------------------------------
   The files under stage/topics/ are a teacher-facing deepening pass, done
   topic by topic: home questions that genuinely work as first exposure,
   gap-map claims that probe what the class actually knows, a truly new
   independent item, the harder lane, and topic-level stage screen copy.
   Authored fields replace the generated ones; everything else stays
   generated and deterministic. A topic with no file yet runs the generated
   plan unchanged. */
const overridesByCode = {};
let overrideTopicCount = 0;
(function loadOverrides() {
  const dir = path.join(ROOT, "stage", "topics");
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json")).sort()) {
    const t = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    overrideTopicCount++;
    for (const [code, o] of Object.entries(t.lessons || {})) overridesByCode[code] = { topic: t, o };
  }
})();

function applyOverrides(code, entry) {
  const ov = overridesByCode[code];
  if (!ov) return entry;
  const { topic, o } = ov;
  /* topic-level stage screen copy — one voice per unit arc */
  for (const [k, s] of Object.entries(topic.screens || {})) {
    if (entry.screens[k]) Object.assign(entry.screens[k], s);
  }
  /* lesson-level fields */
  for (const [k, s] of Object.entries(o.screens || {})) {
    if (entry.screens[k]) Object.assign(entry.screens[k], s);
  }
  if (o.prep) {
    if (Array.isArray(o.prep.home)) entry.prep.home = o.prep.home;
    if (Array.isArray(o.prep.objects)) entry.prep.objects = o.prep.objects;
  }
  if (o.diagnose && Array.isArray(o.diagnose.claims)) entry.diagnose.claims = o.diagnose.claims;
  if (o.practice) {
    if (o.practice.independent) {
      const i = entry.practice.items.findIndex((it) => it.mode === "independent");
      if (i !== -1) entry.practice.items[i] = Object.assign({}, entry.practice.items[i], o.practice.independent);
      else entry.practice.items.splice(1, 0, Object.assign({ mode: "independent" }, o.practice.independent));
    }
    if (o.practice.harder && !entry.practice.items.some((it) => it.mode === "harder")) {
      entry.practice.items.push(Object.assign({ mode: "harder" }, o.practice.harder));
    }
  }
  if (o.wall) Object.assign(entry.wall, o.wall);
  return entry;
}

/* ---- build all 114 --------------------------------------------------------- */
const lessons = {};
const errors = [];
curriculum.topics.forEach((t) => {
  t.lessons.forEach((l) => {
    try { lessons[l.code] = applyOverrides(l.code, planFor(l.code, l.title, l.standard)); }
    catch (e) { errors.push(e.message); }
  });
});

if (errors.length) {
  errors.forEach((e) => console.error("FAIL", e));
  process.exit(1);
}

const plan = {
  schemaVersion: 1,
  generated: "deterministic from lessons/*.jsx + story/story-map.json — run scripts/make-stage-plan.js after any lesson edit",
  stages: [
    { n: 1, key: "prep", name: "Preparation", timing: "Before class", aim: "Compress the material and send it. First exposure happens at home, at the student's own pace." },
    { n: 2, key: "diagnose", name: "Intelligent Diagnose", timing: "5–8 min", aim: "Build a gap map, not a grade. What do they actually know?" },
    { n: 3, key: "build", name: "Knowledge Building", timing: "15–20 min", aim: "Close the flagged gaps, then model one richer example, thinking out loud." },
    { n: 4, key: "practice", name: "Practice", timing: "10–15 min", aim: "Guided, then independent — with feedback that arrives in seconds, not days." },
    { n: 5, key: "produce", name: "Production / B — Proof-Mastery Gate", timing: "10–15 min", aim: "A genuinely new situation. AI enters here — as a critic, never as an author." },
    { n: 6, key: "gate", name: "Mastery Gate", timing: "5–8 min", aim: "One individual task that decides the next path for each student." },
    { n: 7, key: "wall", name: "Smart Production", timing: "5–8 min", aim: "A final product the student is willing to put their name on." }
  ],
  lessons
};

fs.mkdirSync(path.join(ROOT, "stage"), { recursive: true });
const outPath = path.join(ROOT, "stage", "stage-plan.json");
fs.writeFileSync(outPath, JSON.stringify(plan, null, 2) + "\n");
console.log("stage plan written · " + Object.keys(plan.lessons).length + " lessons · " +
  (fs.statSync(outPath).size / 1024).toFixed(0) + " KB · " +
  overrideTopicCount + " of " + curriculum.topics.length + " topics deepened");
