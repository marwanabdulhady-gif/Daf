const fs = require("fs");
const p = "story/story-map.json";
const map = JSON.parse(fs.readFileSync(p, "utf8"));
map.characters.supporting = [
  { id: "hafizah", name: "Hafizah", role: "the Lantern Keeper", doors: [1, 17], prop: "lantern" },
  { id: "zafir", name: "Ustadh Zafir", role: "the traveling scholar", doors: [2, 5, 6, 7, 13, 17], prop: "compass" },
  { id: "rashed", name: "Rashed", role: "the Rival's Report", doors: [2, 5, 6, 7, 13, 17], prop: "clipboard" },
  { id: "abulaila", name: "Abu Laila", role: "the merchant of the souq", doors: [2], prop: "ledger" },
  { id: "ihsan", name: "Ihsan", role: "the auditor", doors: [2, 6], prop: "seal" },
  { id: "khalida", name: "Khalida", role: "the foreman", doors: [3, 4], prop: "ruler" },
  { id: "mansur", name: "Mansur", role: "the caravan master", doors: [5], prop: "tally" },
  { id: "salma", name: "Salma", role: "the council scribe", doors: [6], prop: "quill" },
  { id: "mariam", name: "Mariam", role: "the architect", doors: [7, 14, 16], prop: "compass" },
  { id: "munira", name: "Munira", role: "the ferrywoman of the Fraction Isles", doors: [8], prop: "oar" },
  { id: "farida", name: "Farida", role: "the head cook", doors: [9], prop: "ladle" },
  { id: "zaynab", name: "Zaynab", role: "the clockmaker", doors: [10], prop: "key" },
  { id: "rashid", name: "Rashid", role: "the pearl diver", doors: [11], prop: "mask" },
  { id: "amina", name: "Amina", role: "the dockmaster", doors: [12], prop: "clipboard" },
  { id: "yusuf", name: "Yusuf", role: "the market warden", doors: [13], prop: "balance" },
  { id: "farid", name: "Farid", role: "the astronomer", doors: [15], prop: "astrolabe" }
];
fs.writeFileSync(p, JSON.stringify(map, null, 2) + "\n");
console.log("supporting cast added:", map.characters.supporting.length);
