const fs = require("fs");
const p = "story/story-map.json";
const map = JSON.parse(fs.readFileSync(p, "utf8"));
map.title = "The Lantern of Numeria — The Tale of the Seventeen Doors";
map.premise = "In present-day Jeddah, two fictional Grade 4 archivists, Omar and Zayd, find a brass lantern holding a water-damaged civic design journal. Their class restores seventeen linked folios — each restored folio is one of the city's seventeen doors, each unit is a quest through one door, and each lesson is a mission of that quest. A stain of confusion in the journal's margins (the Muddler of the Measure Market, whose face the class meets only at door 13) is what damaged them; the stain is labelled fictional, like Numeria. Using each recovered idea, the class designs Numeria: an explicitly fictional exhibition city built on amanah, evidence and beneficial knowledge, and ends the year writing the letter forward to the Grade 5 class. Narrative contract: docs/plans/narrative/00-epic-architecture.md.";
fs.writeFileSync(p, JSON.stringify(map, null, 2) + "\n");
console.log("title:", map.title);
