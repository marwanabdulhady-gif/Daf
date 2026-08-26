const fs = require("fs");
const p = "scripts/check-story-plan.js";
let s = fs.readFileSync(p, "utf8");
const anchor = 'if (mainCharacters.some((character) => character.gender !== "boy")) errors.push("all main characters must be boys");';
if (!s.includes(anchor)) throw new Error("checker anchor missing");
const neu = anchor + '\n/* The class is boys only: every student character (the ensemble and the\n   rival) must be a boy. Adult quest givers are community adults, not students. */\nconst ensemble = (story.characters && story.characters.ensemble) || [];\nensemble.forEach((member) => {\n  if (member.gender !== "boy") errors.push("ensemble student " + member.name + " must be a boy (the class is boys only)");\n});';
s = s.replace(anchor, neu);
fs.writeFileSync(p, s);
console.log("checker extended");
