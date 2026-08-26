const fs = require("fs");
const p = "story/story-map.json";
const map = JSON.parse(fs.readFileSync(p, "utf8"));
const handoffs = {
  "3-1": "The foreman's quick promise: the whole order fits on one truck — can the class estimate before the truck arrives?",
  "3-2": "The plan shows equal rows of panels — but the total count is hidden. How can you tell it without counting every panel?",
  "3-3": "The next plan is a long roof — its area model is easier to price once it is partitioned.",
  "3-4": "The next courtyard has an awkward side — that rectangle does not split in the obvious place.",
  "3-5": "The delivery is delayed — with no paper available, the order must be updated with a mental strategy.",
  "3-6": "Three methods at the gate — three contractors, one order. Which strategy earns the contract?",
  "3-7": "The grove model stands before the council — and a rolled blueprint inside the model shows a two-digit workshop tower."
};
const unit = map.units.find(u => u.topic === 3);
for (const l of unit.lessons) {
  if (handoffs[l.code]) l.handoff = handoffs[l.code];
  l.implementationStatus = "story-built";
}
map.status = "pilot complete (Topic 1) · Topics 2-3 story-built · Topic 4 story data mapped, authoring in progress";
fs.writeFileSync(p, JSON.stringify(map, null, 2) + "\n");
console.log("unit 3 marked story-built");
