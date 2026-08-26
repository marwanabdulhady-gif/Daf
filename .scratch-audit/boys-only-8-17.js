const fs = require("fs");
const MAP = {
  Aya: "Hassan", Sara: "Hani", Huda: "Samer", Rana: "Karam", Layla: "Layth",
  Ola: "Numan", Reem: "Anees", Noura: "Joud", Dina: "Lamees", Maya: "Mazin",
  Yara: "Firas", Zahra: "Marwan", Hala: "Qais", Aisha: "Nidal", Amira: "Sultan",
  Hana: "Ghassan", Rima: "Hadeel", Lama: "Lutfi", Lina: "Iyad", Dalia: "Anas",
  Sana: "Bashir",
  Salma: "Khalil" /* students only: topics 8-17 baselines; the 6-x adult scribe is untouched */
};
let total = 0;
for (const f of fs.readdirSync("lessons")) {
  if (!/^(8|9|1[0-7])-\d+.*\.jsx$/.test(f) && f !== "boss-13.jsx") continue;
  let s = fs.readFileSync("lessons/" + f, "utf8");
  let n = 0;
  for (const [from, to] of Object.entries(MAP)) {
    const rx = new RegExp("\\b" + from + "\\b", "g");
    n += (s.match(rx) || []).length;
    s = s.replace(rx, to);
  }
  if (n) { fs.writeFileSync("lessons/" + f, s); total += n; }
}
console.log("topics 8-17 + boss renames:", total);
