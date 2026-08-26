const fs = require("fs");
const p = "story/story-map.json";
const map = JSON.parse(fs.readFileSync(p, "utf8"));
const handoffs = {
  "5-1": "How many carts, approximately? The next manifest will not divide cleanly.",
  "5-2": "A larger manifest — the dividend is too large for the first estimate strategy.",
  "5-3": "The manifest divides cleanly for the carts — but not for the people. Two are left at the gate.",
  "5-4": "Unload a useful chunk — take out the groups you can see, not one group at a time.",
  "5-5": "The longest inventory sheet — the same partial-quotient strategy must survive a greater dividend.",
  "5-6": "One share at every table — supplies are dealt one round at a time so the equality is visible.",
  "5-7": "The share crosses a place — the hundreds will not go round.",
  "5-8": "Three loading methods at the gate — read the numbers before you pick a method.",
  "5-9": "The dispatch board: the full allocation — and two districts with competing impact reports.",
  "5-10": "Two districts, two plans — which plan best serves the city when no single operation tells the whole story?",
  "6-1": "The claim changes direction — the unknown moves to a new place on the bar.",
  "6-2": "A plan with three steps — costs, capacity and remaining resources in one scenario.",
  "6-3": "A condition arrives late — a new constraint changes which operations belong in the plan.",
  "6-4": "The council's final calculation — the complete proposal, one defensible recommendation.",
  "6-5": "A plan that would not cooperate — a tempting path reaches a dead end; persistence and a new representation are required.",
  "6-6": "A tile with more than one shape — the module that must fit every design.",
  "7-1": "Every possible rectangle — the architect accepts the module only when no factor pair is missing.",
  "7-2": "The rectangle pattern repeats — the same method, bigger tiles.",
  "7-3": "The indivisible border tile — some counts make only one rectangular pair; others make many.",
  "7-4": "When will the teams meet? — cleaning and inspection cycles overlap on particular days.",
  "7-5": "Two gardens, one water share — two different-looking shares that may cover the same part."
};
for (const t of [5, 6, 7]) {
  const u = map.units.find((x) => x.topic === t);
  for (const l of u.lessons) {
    l.handoff = handoffs[l.code];
    l.implementationStatus = "story-built";
  }
}
map.status = "Topics 1-7 story-built · remaining topics mapped for later PRs";
fs.writeFileSync(p, JSON.stringify(map, null, 2) + "\n");
console.log("units 5-7 marked story-built");
