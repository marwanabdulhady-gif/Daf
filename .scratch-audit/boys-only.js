const fs = require("fs");
const MAP = {
  Aya: "Hassan", Sara: "Hani", Huda: "Samer", Rana: "Karam", Layla: "Layth",
  Ola: "Numan", Reem: "Anees", Noura: "Joud", Dina: "Lamees", Maya: "Mazin",
  Yara: "Firas", Zahra: "Marwan", Hala: "Qais", Aisha: "Nidal", Amira: "Sultan",
  Hana: "Ghassan", Rima: "Hadeel", Lama: "Lutfi", Lina: "Iyad", Dalia: "Anas",
  Sana: "Bashir"
};
const files = [];
for (let t = 1; t <= 7; t++) {
  for (const f of fs.readdirSync("lessons")) {
    if (new RegExp("^" + t + "-\\d+.*\\.jsx$").test(f)) files.push("lessons/" + f);
  }
}
for (const f of ["docs/plans/narrative/01-characters-and-arcs.md", "docs/plans/narrative/02-quests.md", "docs/plans/narrative/03-supporting-cast.md", "docs/plans/narrative/00-epic-architecture.md", "story/story-map.json"]) files.push(f);
let total = 0;
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let s = fs.readFileSync(f, "utf8");
  let n = 0;
  for (const [from, to] of Object.entries(MAP)) {
    const rx = new RegExp("\\b" + from + "\\b", "g");
    n += (s.match(rx) || []).length;
    s = s.replace(rx, to);
  }
  if (n) { fs.writeFileSync(f, s); total += n; console.log(f, ":", n, "renames"); }
}
console.log("total renames:", total);
