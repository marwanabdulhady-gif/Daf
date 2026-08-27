#!/usr/bin/env node
/* Validate the narrative-to-production contract for every built lesson. */
"use strict";
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const map = JSON.parse(fs.readFileSync(path.join(root, "story/story-map.json"), "utf8"));
const topics = JSON.parse(fs.readFileSync(path.join(root, "curriculum.json"), "utf8")).topics;
const plans = new Map();
for (let n = 1; n <= 17; n++) {
  const p = JSON.parse(fs.readFileSync(path.join(root, `stage/topics/${n}.json`), "utf8"));
  for (const [code, lesson] of Object.entries(p.lessons)) plans.set(code, lesson);
}
const errors = [];
const seenChapters = new Set();
let lessons = 0;
for (const unit of map.units || []) {
  if (seenChapters.has(unit.chapter)) errors.push(`T${unit.topic}: duplicate quest chapter "${unit.chapter}"`);
  seenChapters.add(unit.chapter);
  for (const lesson of unit.lessons || []) {
    lessons++;
    const id = lesson.code;
    for (const field of ["storyBeat", "storyMove", "studentMission", "handoff"])
      if (!lesson[field] || !String(lesson[field]).trim()) errors.push(`${id}: missing narrative field ${field}`);
    if (!unit.artifact || !unit.pbl) errors.push(`T${unit.topic}: missing quest artifact or PBL product`);
    const plan = plans.get(id);
    if (!plan) { errors.push(`${id}: missing stage plan`); continue; }
    const options = (((plan.critic || {}).production || {}).options || []);
    const ai = options.filter((o) => o.ai === true);
    if (options.length < 2 || options.length > 3) errors.push(`${id}: production has ${options.length} options; expected 2 or 3`);
    if (ai.length !== 1) errors.push(`${id}: production has ${ai.length} AI options; expected exactly 1`);
    options.forEach((o, i) => {
      for (const field of ["kind", "task", "stem"])
        if (!o[field] || !String(o[field]).trim()) errors.push(`${id}: option ${i + 1} missing ${field}`);
      if (o.ai === true && !/AI|ai/.test(`${o.task} ${o.stem}`)) errors.push(`${id}: AI option ${i + 1} does not name AI`);
    });
  }
}
for (const topic of topics) for (const lesson of topic.lessons) if (lesson.built && !map.units.some((u) => u.lessons.some((l) => l.code === lesson.code))) errors.push(`${lesson.code}: built lesson absent from story map`);
if (seenChapters.size !== 17) errors.push(`expected 17 unique quests, found ${seenChapters.size}`);
if (errors.length) { console.error(errors.map((e) => `FAIL ${e}`).join("\n")); process.exit(1); }
console.log(`quest-production OK · ${seenChapters.size} unique quests · ${lessons} lessons · every lesson has story beat, mission, handoff, and 2–3 production options with exactly one AI critic`);
