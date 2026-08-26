#!/usr/bin/env node
/* ===========================================================================
   STORY FOUNDATION CHECK (PR 01 follow-up issue #14 · extended for PR 02
   issue #16)
   Validates the storytelling foundation that the ordered roadmap builds on:
     A.  stem source registry (v2) — schema, controlled status vocabulary,
         https sources with re-verification dates, lesson-code/topic
         consistency, prohibited-attribution lint, image provenance records
     A2. Amanah registry — schema, approval-state vocabulary, and the
         six-field audit record that `approved` requires
     B.  story data is Arabic-script-free
     C.  embedded payload freshness — every built lesson deck must embed
         exactly what story-map.json + stem-sources.json + amanah-sources.json
         produce now; unmapped decks (bosses) must embed an explicit null
     D.  sacred-lane guard — no deck may use raw lane="amanah" (the
         AmanahWindow component is the only path), every embedded Amanah
         window must be fully approved, and no built deck may contain any
         <img> element until image provenance is demonstrated
     E.  implemented-lesson integrity — a lesson marked implemented must have
         a built deck, a real handoff, and (if it renders a STEM window) its
         registry source URLs in the deck; the 1-1 pilot additionally carries
         both lane labels and its simulated-data label
   Human evidence quality and qualified religious approval still require
   reviewer judgment — this check is structural.
   =========================================================================== */
const fs = require("fs");
const path = require("path");
const {
  STATUSES, AMANAH_STATUSES, STUDENT_TEXT_BANS, NEGATION_CUES, NEGATION_WINDOW,
  isApprovedAmanahWindow, buildPayload, serializePayload
} = require("./story-payload.js");

const ROOT = path.resolve(__dirname, "..");
const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const curriculum = readJson(path.join(ROOT, "curriculum.json"));
const map = readJson(path.join(ROOT, "story", "story-map.json"));
const loadOpt = (name) => {
  const p = path.join(ROOT, "story", name);
  return fs.existsSync(p) ? readJson(p) : { windows: [] };
};
const registry = loadOpt("stem-sources.json");
const amanah = loadOpt("amanah-sources.json");

const lessons = curriculum.topics.flatMap((t) => t.lessons.map((l) => ({ code: l.code, topic: t.n })));
const files = fs.existsSync(path.join(ROOT, "html"))
  ? fs.readdirSync(path.join(ROOT, "html")).filter((f) => f.endsWith(".html"))
  : [];

const errors = [];
const err = (m) => errors.push(m);
const TODAY = new Date().toISOString().slice(0, 10);
const isIsoDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || "") && !Number.isNaN(Date.parse(s));

/* ---- A. stem source registry (v2) ------------------------------------------ */
const seen = new Set();
(registry.windows || []).forEach((w, i) => {
  const tag = w.id || ("window[" + i + "]");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(w.id || "")) err(tag + ": id must be a lowercase slug");
  if (seen.has(w.id)) err(tag + ": duplicate window id");
  seen.add(w.id);
  if (!Number.isInteger(w.topic) || w.topic < 1 || w.topic > 17)
    err(tag + ": topic must be an integer 1-17");
  if (!Array.isArray(w.lessonCodes) || !w.lessonCodes.length)
    err(tag + ": lessonCodes must be a non-empty array");
  (w.lessonCodes || []).forEach((code) => {
    const lesson = lessons.find((l) => l.code === code);
    if (!lesson) err(tag + ": unknown lesson code " + code);
    else if (lesson.topic !== w.topic)
      err(tag + ": lesson " + code + " is in topic " + lesson.topic + " but the window says topic " + w.topic);
  });
  ["title", "studentText", "inquiry", "modernConnection", "teacherNote"].forEach((field) => {
    if (typeof w[field] !== "string" || !w[field].trim()) err(tag + ": missing " + field);
  });
  if (!Array.isArray(w.sources) || !w.sources.length) err(tag + ": needs at least one source");
  (w.sources || []).forEach((s) => {
    if (!s.label || !/^https:\/\//i.test(s.url || "")) err(tag + ": source needs a label and an https URL");
    /* registry v2: every source carries the date it was last verified */
    if (!isIsoDate(s.accessed)) err(tag + ": source " + (s.label || s.url) + " needs an ISO accessed date");
    else if (s.accessed > TODAY) err(tag + ": source " + (s.label || s.url) + " accessed date is in the future");
  });
  if (!STATUSES.includes(w.status))
    err(tag + ": status " + JSON.stringify(w.status) + " is outside the controlled vocabulary (" + STATUSES.join(" / ") + ")");
  if (typeof w.studentText === "string") STUDENT_TEXT_BANS.forEach((re) => {
    const m = w.studentText.match(re);
    if (m) err(tag + ": student-facing text contains prohibited claim wording " + JSON.stringify(m[0]));
  });
  /* image provenance (registry v2): an image may exist only with a complete record */
  if (w.image) {
    const k = w.image;
    const kinds = ["historical-object", "modern-reconstruction", "original-illustration", "student-work"];
    if (!kinds.includes(k.kind)) err(tag + ": image.provenance.kind outside vocabulary (" + kinds.join(" / ") + ")");
    if (!k.rights || !String(k.rights).trim()) err(tag + ": image needs a rights record (license + holder)");
    if (!/^https:\/\//i.test(k.source || "")) err(tag + ": image needs an https source");
    if (!isIsoDate(k.date)) err(tag + ": image needs an ISO date");
    if (k.kind === "modern-reconstruction" && !/reconstruction/i.test(k.credit || "" + k.rights))
      err(tag + ": reconstructions must be labelled as reconstructions in the credit");
  }
});
const windowCount = (registry.windows || []).length;

/* Unit STEM anchors may quote a banned form only to reject it. */
let anchorScanned = 0;
(map.units || []).forEach((u) => {
  if (typeof u.stem !== "string") return;
  anchorScanned++;
  const lowered = u.stem.toLowerCase();
  let from = 0;
  while (true) {
    const idx = lowered.indexOf("invented", from);
    if (idx === -1) break;
    if (!NEGATION_CUES.test(u.stem.slice(Math.max(0, idx - NEGATION_WINDOW), idx)))
      err("topic " + u.topic + " STEM anchor contains an un-negated \"invented\" claim");
    from = idx + "invented".length;
  }
});

/* ---- A2. Amanah registry ---------------------------------------------------- */
const aSeen = new Set();
let amanahApproved = 0;
(amanah.windows || []).forEach((w, i) => {
  const tag = w.id || ("amanah[" + i + "]");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(w.id || "")) err(tag + ": id must be a lowercase slug");
  if (aSeen.has(w.id)) err(tag + ": duplicate window id");
  aSeen.add(w.id);
  if (!Number.isInteger(w.topic) || w.topic < 1 || w.topic > 17)
    err(tag + ": topic must be an integer 1-17");
  if (typeof w.description !== "string" || !w.description.trim()) err(tag + ": missing description (planning text)");
  if (!AMANAH_STATUSES.includes(w.status))
    err(tag + ": status " + JSON.stringify(w.status) + " is outside the approval vocabulary (" + AMANAH_STATUSES.join(" / ") + ")");
  if (w.studentText !== null && typeof w.studentText !== "string")
    err(tag + ": studentText must be null until approved, then a string");
  if (w.status === "approved") {
    amanahApproved++;
    /* the six-field audit record — all must be present, exactly as the plan
       page requires; this is what the payload embeds and the deck renders */
    if (!isApprovedAmanahWindow(w))
      err(tag + ": approved window lacks the full audit record (studentText, source, translation, reviewer, reviewDate)");
    if (isIsoDate(w.reviewDate) && w.reviewDate > TODAY)
      err(tag + ": reviewDate is in the future");
    if (typeof w.studentText === "string") STUDENT_TEXT_BANS.forEach((re) => {
      const m = w.studentText.match(re);
      if (m) err(tag + ": approved student-facing text contains prohibited wording " + JSON.stringify(m[0]));
    });
  }
  if (w.status !== "approved" && typeof w.studentText === "string" && w.studentText.trim())
    err(tag + ": non-approved window carries student-facing text — strip it until review passes");
});

/* ---- B. story data is Arabic-script-free ------------------------------------ */
[[ "story-map.json", map], ["stem-sources.json", registry], ["amanah-sources.json", amanah]].forEach(([name, data]) => {
  if (/[؀-ۿ]/.test(JSON.stringify(data))) err(name + ": contains Arabic script");
});

/* ---- C. embedded payload freshness ------------------------------------------- */
const registries = { stem: registry, amanah: amanah };
let freshLessonDecks = 0, nullBossDecks = 0;
const deckSrc = {};
for (const f of files) {
  const src = fs.readFileSync(path.join(ROOT, "html", f), "utf8");
  deckSrc[f] = src;
  const codeMatch = f.match(/^lesson-(boss-[0-9]+|[0-9]+-[0-9]+)-/);
  if (!codeMatch) continue;
  const code = codeMatch[1];
  const expected = buildPayload(map, registries, code);
  const m = src.match(/<script>window\.DAF_STORY = ([\s\S]*?)<\/script>/);
  if (expected === null) {
    if (!m || m[1].trim().replace(/;\s*$/, "") !== "null")
      err(f + ": unmapped deck must embed DAF_STORY = null");
    else nullBossDecks++;
  } else {
    if (!m) { err(f + ": missing DAF_STORY payload"); continue; }
    if (m[1].trim().replace(/;\s*$/, "") !== serializePayload(expected))
      err(f + ": DAF_STORY payload is stale vs story data — run ./rebuild-all.sh");
    else freshLessonDecks++;
  }
}

/* ---- D. sacred-lane guard + imagery guard ------------------------------------- */
for (const f of files) {
  const src = deckSrc[f];
  const babel = src.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/);
  /* raw lane="amanah" authoring is banned — AmanahWindow is the only path */
  if (babel && /lane\s*[:=]\s*["']amanah["']/.test(babel[1]))
    err(f + ": uses raw lane=\"amanah\" — render sacred content only through the approved AmanahWindow component");
  if (/<img[\s>]/i.test(src))
    err(f + ": contains an <img> element — no imagery ships without a registry provenance record (PR 02 phase rule)");
  const payload = src.match(/<script>window\.DAF_STORY = ([\s\S]*?)<\/script>/);
  if (payload) {
    const p = payload[1].trim().replace(/;\s*$/, "");
    if (p !== "null") {
      try {
        (JSON.parse(p).amanahWindows || []).forEach((w) => {
          if (!isApprovedAmanahWindow(w))
            err(f + ": embedded Amanah window is not fully approved — unreviewed sacred content may never ship");
        });
      } catch (e) { /* unparseable payloads are already reported by section C */ }
    }
  }
}

/* ---- E. implemented-lesson integrity ------------------------------------------- */
let implemented = 0;
(map.units || []).forEach((u) => (u.lessons || []).forEach((l) => {
  if (!l.implementationStatus) return;
  implemented++;
  const f = files.find((x) => x.startsWith("lesson-" + l.code + "-"));
  if (!f) { err(l.code + ": marked " + l.implementationStatus + " but has no built deck"); return; }
  if (/^end on the object/i.test(l.handoff || ""))
    err(l.code + ": implemented lesson still has a generic author-instruction handoff");
  const src = deckSrc[f] || "";
  const babel = (src.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/) || [])[1] || "";
  const payload = (src.match(/<script>window\.DAF_STORY = ([\s\S]*?)<\/script>/) || [])[1] || "";
  if (babel.includes("STEMWindow")) {
    const windows = (JSON.parse(payload.replace(/;\s*$/, "")) || {}).stemWindows || [];
    windows.forEach((w) => (w.sources || []).forEach((s) => {
      if (!src.includes(s.url)) err(l.code + ": STEM window source URL missing from deck: " + s.url);
    }));
  }
  /* the 1-1 pilot must visibly carry both truth lanes and its simulated-data label */
  if (l.code === "1-1" && babel.includes("StoryShell")) {
    if (!babel.includes("lane=\"fiction\"") || !babel.includes("lane=\"stem\""))
      err("1-1: pilot deck must render both the fiction and the stem truth lanes");
    if (!babel.includes("simulated"))
      err("1-1: pilot deck must label its civic number as simulated");
  }
}));

/* ---- summary --------------------------------------------------------------------- */
if (errors.length) {
  errors.forEach((e) => console.error("FAIL " + e));
  process.exit(1);
}
console.log(`story foundation OK · ${freshLessonDecks} lesson decks fresh · ${nullBossDecks} unmapped deck(s) embed null`);
console.log(`  stem registry: ${windowCount} window(s), statuses in ${STATUSES.join(" / ")} · ${anchorScanned} STEM anchors linted · re-verification dates enforced`);
console.log(`  amanah registry: ${(amanah.windows || []).length} window(s), ${amanahApproved} approved, rest registry-only · six-field audit record enforced`);
console.log(`  sacred-lane + imagery guards clean across ${files.length} deck(s) · ${implemented} implemented lesson(s) consistent`);
console.log("Human evidence quality and qualified religious approval still require reviewer judgment.");
