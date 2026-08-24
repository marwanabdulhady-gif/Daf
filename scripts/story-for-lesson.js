#!/usr/bin/env node
/* Emit the small, classroom-safe story payload embedded in one standalone deck. */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const code = process.argv[2];
const map = JSON.parse(fs.readFileSync(path.join(ROOT, "story", "story-map.json"), "utf8"));
const sourceFile = path.join(ROOT, "story", "stem-sources.json");
const sourceData = fs.existsSync(sourceFile)
  ? JSON.parse(fs.readFileSync(sourceFile, "utf8"))
  : { windows: [] };

let unit = null, lesson = null, lessonIndex = -1;
for (const candidate of map.units) {
  const index = candidate.lessons.findIndex((item) => item.code === code);
  if (index >= 0) { unit = candidate; lesson = candidate.lessons[index]; lessonIndex = index; break; }
}

if (!unit || !lesson) {
  process.stdout.write("null");
  process.exit(0);
}

const payload = {
  title: map.title,
  characters: map.characters.main.map(({ id, name, gender, role, functions }) =>
    ({ id, name, gender, role, functions })),
  unit: {
    topic: unit.topic,
    chapter: unit.chapter,
    question: unit.question,
    artifact: unit.artifact,
    pbl: unit.pbl,
    bridge: unit.bridge,
    lessonCount: unit.lessons.length
  },
  lesson: Object.assign({}, lesson, { index: lessonIndex, numberInUnit: lessonIndex + 1 }),
  stemWindows: sourceData.windows.filter((window) =>
    (window.lessonCodes || []).includes(code)
  )
};
process.stdout.write(JSON.stringify(payload).replace(/</g, "\\u003c"));
