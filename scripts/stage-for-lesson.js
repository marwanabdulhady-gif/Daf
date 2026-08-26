#!/usr/bin/env node
/* stage-for-lesson.js <code> — print the window.DAF_STAGE payload for one
   lesson: its seven-stage plan entry, or {} for review decks (bosses) that
   carry no stage plan and keep their original sequence. */
"use strict";
const fs = require("fs");
const path = require("path");
const code = process.argv[2];
if (!code) { console.error("usage: stage-for-lesson.js <lesson-code>"); process.exit(1); }
const plan = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "stage", "stage-plan.json"), "utf8"));
const entry = (plan.lessons || {})[code];
process.stdout.write(JSON.stringify(entry ? { lessons: { [code]: entry } } : {}));
