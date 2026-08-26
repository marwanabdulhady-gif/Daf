const fs = require("fs");
const p = "story/story-map.json";
const map = JSON.parse(fs.readFileSync(p, "utf8"));
/* The class is boys only (school policy): every student character in the
   fiction lane is a boy. Protagonists live in characters.main (checked for
   gender "boy"); the class ensemble and the rival Rashed are listed here and
   checked the same way. Adult quest givers are community adults, not
   students, and stay in characters.supporting. */
map.characters.ensemble = [
  { id: "rashed", name: "Rashed", role: "the rival school's student — the Rival's Report" },
  { id: "musa", name: "Musa", role: "the Splitter (decomposition)" },
  { id: "hassan", name: "Hassan", role: "the Rounder (estimation)" },
  { id: "hani", name: "Hani", role: "class student" },
  { id: "samer", name: "Samer", role: "class student" },
  { id: "karam", name: "Karam", role: "class student" },
  { id: "layth", name: "Layth", role: "class student" },
  { id: "numan", name: "Numan", role: "class student" },
  { id: "anees", name: "Anees", role: "class student" },
  { id: "joud", name: "Joud", role: "class student" },
  { id: "lamees", name: "Lamees", role: "class student" },
  { id: "mazin", name: "Mazin", role: "class student" },
  { id: "firas", name: "Firas", role: "class student" },
  { id: "marwan", name: "Marwan", role: "class student" },
  { id: "qais", name: "Qais", role: "class student" },
  { id: "nidal", name: "Nidal", role: "class student" },
  { id: "sultan", name: "Sultan", role: "class student" },
  { id: "ghassan", name: "Ghassan", role: "class student" },
  { id: "hadeel", name: "Hadeel", role: "class student" },
  { id: "lutfi", name: "Lutfi", role: "class student" },
  { id: "iyad", name: "Iyad", role: "class student" },
  { id: "anas", name: "Anas", role: "class student" },
  { id: "bashir", name: "Bashir", role: "class student" },
  { id: "khalil", name: "Khalil", role: "class student" },
  { id: "ibrahim", name: "Ibrahim", role: "class student" },
  { id: "faisal", name: "Faisal", role: "class student" },
  { id: "rayan", name: "Rayan", role: "class student" },
  { id: "nasser", name: "Nasser", role: "class student" },
  { id: "salem", name: "Salem", role: "class student" },
  { id: "tarek", name: "Tarek", role: "class student" },
  { id: "nawaf", name: "Nawaf", role: "class student" },
  { id: "talal", name: "Talal", role: "class student" },
  { id: "khalid", name: "Khalid", role: "class student" },
  { id: "kareem", name: "Kareem", role: "class student" },
  { id: "ziad", name: "Ziad", role: "class student" },
  { id: "ziyad", name: "Ziyad", role: "class student" },
  { id: "amal", name: "Amal", role: "class student" },
  { id: "nada", name: "Nada", role: "class student" },
  { id: "rakan", name: "Rakan", role: "class student" },
  { id: "adel", name: "Adel", role: "class student" },
  { id: "majed", name: "Majed", role: "class student" },
  { id: "fahad", name: "Fahad", role: "class student" },
  { id: "hamza", name: "Hamza", role: "class student" },
  { id: "rami", name: "Rami", role: "class student" }
].map((e) => Object.assign({ gender: "boy" }, e));
fs.writeFileSync(p, JSON.stringify(map, null, 2) + "\n");
console.log("ensemble added:", map.characters.ensemble.length, "boys");
