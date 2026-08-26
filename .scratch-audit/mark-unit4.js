const fs = require("fs");
const p = "story/story-map.json";
const map = JSON.parse(fs.readFileSync(p, "utf8"));
const handoffs = {
  "4-1": "The long order card: a two-digit order repeated for tens of customers. A larger model is needed.",
  "4-2": "Before any cutting, the class must choose rounding or compatible numbers for a safe estimate. Will the beams fit?",
  "4-3": "The production frame reveals rows and columns as parts of one product.",
  "4-4": "The roof plan is partitioned into rooms — each one a region, each region a partial product.",
  "4-5": "The final production schedule: four products written in a column and added once.",
  "4-6": "The lift is jammed and the obvious plan fails midway — the team must persist and revise without guessing."
};
const unit = map.units.find(u => u.topic === 4);
for (const l of unit.lessons) {
  if (handoffs[l.code]) l.handoff = handoffs[l.code];
  l.implementationStatus = "story-built";
}
map.status = "Topics 1-4 story-built · remaining topics mapped for later PRs";
fs.writeFileSync(p, JSON.stringify(map, null, 2) + "\n");
console.log("unit 4 marked story-built");
