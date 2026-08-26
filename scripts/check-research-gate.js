#!/usr/bin/env node
/* Structural gate only: human/source/religious review cannot be automated. */
const fs = require("fs");
const path = require("path");
const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/check-research-gate.js docs/research/pr-NN-scope.md");
  process.exit(2);
}
const full = path.resolve(file);
if (!fs.existsSync(full)) { console.error("FAIL missing research report: " + file); process.exit(1); }
const text = fs.readFileSync(full, "utf8");
const required = [
  "## Questions investigated",
  "## Evidence and decision matrix",
  "## Mathematical verification",
  "## Open risks and deferred work",
  "## Gate verdict"
];
const failures = required.filter((heading) => !text.includes(heading));
const sourceLinks = (text.match(/https:\/\//g) || []).length;
if (sourceLinks < 2) failures.push("fewer than two linked sources");
/* docs/research/README.md template: every report records student-facing
   wording and reviewer status, so the structure check enforces both. */
if (!/student-facing/i.test(text)) failures.push("no student-facing wording recorded");
if (!/reviewer|religious scope/i.test(text)) failures.push("no reviewer or religious-scope statement");
if (!/\*\*PASS[^\n]*\*\*/.test(text)) failures.push("no explicit bold PASS gate verdict");
if (/\bTBD\b|TODO|INSERT SOURCE/i.test(text)) failures.push("unresolved placeholder text");
if (failures.length) {
  failures.forEach((failure) => console.error("FAIL " + failure));
  process.exit(1);
}
console.log(`research gate structure OK · ${file} · ${sourceLinks} linked sources`);
console.log("Human evidence quality and qualified religious approval still require reviewer judgment.");
