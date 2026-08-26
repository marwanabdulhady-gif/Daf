#!/usr/bin/env node
/* Validate story coverage and flexible screen recommendations against curriculum.json. */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const curriculum = JSON.parse(fs.readFileSync(path.join(ROOT, "curriculum.json"), "utf8"));
const story = JSON.parse(fs.readFileSync(path.join(ROOT, "story", "story-map.json"), "utf8"));

const expected = curriculum.topics.flatMap((topic) =>
  topic.lessons.map((lesson) => ({ topic: topic.n, code: lesson.code, title: lesson.title }))
);
const actual = story.units.flatMap((unit) =>
  unit.lessons.map((lesson) => ({ topic: unit.topic, code: lesson.code, title: lesson.curriculumTitle, lesson }))
);
const shapes = new Map(story.screenDesign.lessonShapes.map((shape) => [shape.id, shape]));
const errors = [];

if (story.schemaVersion < 2) errors.push("story schema must support flexible screen plans");
const mainCharacters = (story.characters && story.characters.main) || [];
if (mainCharacters.length !== 2) errors.push("the frame must have exactly two main characters");
if (mainCharacters.some((character) => character.gender !== "boy")) errors.push("all main characters must be boys");
/* The class is boys only: every student character (the ensemble and the
   rival) must be a boy. Adult quest givers are community adults, not students. */
const ensemble = (story.characters && story.characters.ensemble) || [];
ensemble.forEach((member) => {
  if (member.gender !== "boy") errors.push("ensemble student " + member.name + " must be a boy (the class is boys only)");
});
if (expected.length !== actual.length) errors.push(`coverage differs: curriculum ${expected.length}, story ${actual.length}`);

expected.forEach((item, index) => {
  const got = actual[index];
  if (!got || got.topic !== item.topic || got.code !== item.code || got.title !== item.title) {
    errors.push(`lesson order/content mismatch at ${item.code}`);
    return;
  }
  const plan = got.lesson.screenPlan;
  if (!plan) { errors.push(`${item.code}: missing screenPlan`); return; }
  const shape = shapes.get(plan.shape);
  if (!shape) errors.push(`${item.code}: unknown lesson shape ${plan.shape}`);
  if (!Number.isInteger(plan.recommended) || plan.recommended < 1) errors.push(`${item.code}: invalid recommended count`);
  const limits = String(plan.planningBand || "").split("–").map(Number);
  if (limits.length !== 2 || limits.some(Number.isNaN)) errors.push(`${item.code}: invalid planning band`);
  else if (plan.recommended < limits[0] || plan.recommended > limits[1]) errors.push(`${item.code}: target outside planning band`);
  for (const key of ["storyBeat", "technique", "storyMove", "studentMission", "handoff"])
    if (!got.lesson[key]) errors.push(`${item.code}: missing ${key}`);
  /* A lesson that has been implemented ships its handoff text in the deck; the
     map record must then carry the real handoff, not the authoring instruction. */
  if (got.lesson.implementationStatus && /^end on the object/i.test(got.lesson.handoff || ""))
    errors.push(`${item.code}: implemented lesson still has a generic author-instruction handoff`);
});

const usedShapes = new Set(actual.map((entry) => entry.lesson.screenPlan && entry.lesson.screenPlan.shape));
if (usedShapes.size < 5) errors.push(`screen planning is not sufficiently varied (${usedShapes.size} shapes used)`);

if (errors.length) {
  errors.forEach((error) => console.error("FAIL", error));
  process.exit(1);
}

const targets = actual.reduce((counts, entry) => {
  const n = entry.lesson.screenPlan.recommended;
  counts[n] = (counts[n] || 0) + 1;
  return counts;
}, {});
console.log(`story plan OK · ${actual.length} lessons · ${usedShapes.size} lesson shapes`);
console.log("recommended screen counts · " + Object.entries(targets).map(([n, count]) => `${n}: ${count}`).join(" · "));
