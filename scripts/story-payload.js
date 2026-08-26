/* ===========================================================================
   STORY PAYLOAD · single source of the DAF_STORY data stamped into each deck
   build.sh (via story-for-lesson.js) and scripts/check-story-foundation.js
   both build the payload through this module, so an embedded story payload can
   never drift from story/story-map.json + story/stem-sources.json +
   story/amanah-sources.json unnoticed.
   =========================================================================== */
"use strict";

/* Controlled status vocabulary for STEM source-registry windows
   (docs/research/README.md). Only PUBLISHABLE_STATUS windows may be embedded
   in a student-facing deck. */
const STATUSES = ["source-checked", "pending-review", "blocked", "rejected"];
const PUBLISHABLE_STATUS = "source-checked";

/* Amanah (Seerah) approval states — PR 02. A window may ship student-facing
   only as `approved` with the complete audit record (reviewer, review date,
   source, translation, exact student text). Everything else stays registry-
   only and is never embedded. */
const AMANAH_STATUSES = ["draft", "pending-review", "approved", "blocked", "rejected"];

function isPublishableWindow(window) {
  return !!(window && window.status === PUBLISHABLE_STATUS);
}

/* The six-field audit record (docs/plans/storytelling-curriculum-plan.html,
   "Required record for every Amanah Window"). */
function isApprovedAmanahWindow(window) {
  return !!(window
    && window.status === "approved"
    && typeof window.studentText === "string" && window.studentText.trim()
    && typeof window.reviewer === "string" && window.reviewer.trim()
    && typeof window.reviewDate === "string" && window.reviewDate.trim()
    && typeof window.source === "string" && window.source.trim()
    && typeof window.translation === "string" && window.translation.trim());
}

/* Prohibited attribution wording in student-facing STEM text (PR 01 decision
   H2: the numeral tradition is cumulative and cross-cultural — never "one
   person invented X"). */
const STUDENT_TEXT_BANS = [
  /\binvented\b/i,
  /\bfirst to\b/i,
  /\bdiscovered (?:the )?zero\b/i,
  /\bsole (?:inventor|creator)\b/i
];

/* Unit STEM anchors may quote a banned form only to reject it — e.g.
   "without claiming that one culture invented irrigation". The cue must sit
   within 60 characters before the banned word. */
const NEGATION_CUES = /\b(?:not|no|never|without|avoid(?:s|ing)?|claim(?:ing|ed)? that)\b/i;
const NEGATION_WINDOW = 60;

/* Build the payload embedded as window.DAF_STORY in one standalone deck.
   `registries` is { stem, amanah } (either may be { windows: [] }).
   Returns null for codes absent from the story map (e.g. bosses, until a
   later roadmap PR maps them). */
function buildPayload(map, registries, code) {
  const stem = registries.stem || { windows: [] };
  const amanah = registries.amanah || { windows: [] };
  let unit = null, lesson = null, lessonIndex = -1;
  for (const candidate of (map.units || [])) {
    const index = candidate.lessons.findIndex((item) => item.code === code);
    if (index >= 0) { unit = candidate; lesson = candidate.lessons[index]; lessonIndex = index; break; }
  }
  if (!unit || !lesson) return null;
  return {
    title: map.title,
    characters: (map.characters.main || []).map(({ id, name, gender, role, functions }) =>
      ({ id, name, gender, role, functions })),
    /* Supporting fictional cast (docs/plans/narrative/03): quest givers, the
       guide and the rival. Fiction lane only — never rendered in stem/amanah. */
    supporting: (map.characters.supporting || []).map(({ id, name, role, doors, prop }) =>
      ({ id, name, role, doors, prop })),
    unit: {
      topic: unit.topic,
      chapter: unit.chapter,
      question: unit.question,
      artifact: unit.artifact,
      pbl: unit.pbl,
      bridge: unit.bridge,
      lessonCount: unit.lessons.length,
      lessonCodes: unit.lessons.map((l) => l.code)
    },
    lesson: Object.assign({}, lesson, { index: lessonIndex, numberInUnit: lessonIndex + 1 }),
    stemWindows: (stem.windows || []).filter((window) =>
      (window.lessonCodes || []).includes(code) && isPublishableWindow(window)),
    /* Amanah windows are unit-level: by default they ride on the unit's final
       lesson, or on the explicit lessonCodes when a later authoring PR chooses
       another placement. Approved windows only — the merge policy allows
       anything else to exist solely in the blocked registry, never in a deck. */
    amanahWindows: (amanah.windows || []).filter((window) => {
      if (!isApprovedAmanahWindow(window)) return false;
      if (Array.isArray(window.lessonCodes) && window.lessonCodes.length)
        return window.lessonCodes.includes(code);
      return window.unit === unit.topic && lessonIndex === unit.lessons.length - 1;
    })
  };
}

/* Exact serialization the build stamps into the deck. */
function serializePayload(payload) {
  return payload === null ? "null" : JSON.stringify(payload).replace(/</g, "\\u003c");
}

module.exports = {
  STATUSES,
  PUBLISHABLE_STATUS,
  AMANAH_STATUSES,
  STUDENT_TEXT_BANS,
  NEGATION_CUES,
  NEGATION_WINDOW,
  isPublishableWindow,
  isApprovedAmanahWindow,
  buildPayload,
  serializePayload
};
