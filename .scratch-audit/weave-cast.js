const fs = require("fs");

/* (file, caseN, supportId, textReplacements) */
const OPS = [
  ["1-1", 0, "hafizah", [
    ["The lantern reveals evidence—but never answers.",
     "The lantern reveals evidence—but never answers. Hafizah, the Lantern Keeper, sets it down and lifts the damaged page."]
  ]],
  ["1-1", 9, "hafizah", []],
  ["1-5", 7, "hafizah", []],
  ["1-5", 13, "hafizah", []],
  ["2-1", 0, "abulaila", [
    ["The merchant checks before the ink dries",
     "Abu Laila, the merchant, checks before the ink dries"]
  ]],
  ["2-1", 7, "abulaila", []],
  ["2-8", 7, "rashed", [
    ["text=\"", "text=\"Rashed's report, from the rival school, arrives "]
  ]],
  ["2-8", 13, "ihsan", []],
  ["3-2", 0, "khalida", [
    ["The foreman promises the order fits on one truck",
     "Khalida, the foreman, promises the order fits on one truck"]
  ]],
  ["3-2", 8, "khalida", []],
  ["4-7", 0, "khalida", [
    ["jammed midway, holding the morning's plan.",
     "jammed midway, holding the morning's plan. It is Khalida's lift, and the repair is hers to sign."]
  ]],
  ["4-7", 12, "khalida", []],
  ["5-1", 0, "mansur", [
    ["all shared by 4. The 3 is always there.",
     "all shared by 4. The 3 is always there. Mansur, the caravan master, counts nothing twice."]
  ]],
  ["5-1", 8, "mansur", []],
  ["5-10", 6, "rashed", [
    ["The other district's report arrives, polished:",
     "Rashed's report from the rival school arrives, polished:"]
  ]],
  ["5-10", 12, "zafir", []],
  ["6-1", 0, "salma", [
    ["One bar is longer, and the short bar repeats inside it.",
     "One bar is longer, and the short bar repeats inside it. Salma, the council scribe, keeps the decision board open."]
  ]],
  ["6-1", 9, "salma", []],
  ["6-5", 9, "salma", []],
  ["6-6", 11, "zafir", []],
  ["7-1", 0, "mariam", [
    ["The same pieces, the different shapes.",
     "The same pieces, the different shapes. Mariam, the architect, will sign only a certificate with no missing pair."]
  ]],
  ["7-1", 9, "mariam", []],
  ["7-3", 3, "mariam", []],
  ["7-3", 11, "mariam", []],
  ["7-5", 9, "zafir", []]
];

let edits = 0;
for (const [f, caseN, id, tweaks] of OPS) {
  const p = "lessons/" + f + ".jsx";
  let s = fs.readFileSync(p, "utf8");
  const lines = s.split("\n");
  const ci = lines.findIndex((l) => l.trim() === "case " + caseN + ":");
  if (ci === -1) throw new Error(f + " case " + caseN + " not found");
  // find the opening tag line within the case block
  let ti = -1;
  for (let i = ci; i < Math.min(ci + 14, lines.length); i++) {
    if (/<StoryShell lane=|<StoryHandoff/.test(lines[i])) { ti = i; break; }
  }
  if (ti === -1) throw new Error(f + " case " + caseN + " tag not found");
  const tag = lines[ti];
  if (tag.includes("support=")) { console.log("skip (already woven):", f, caseN); continue; }
  if (/<StoryHandoff\s*$/.test(tag.trim()) || tag.trim() === "<StoryHandoff") {
    lines[ti] = tag.replace("<StoryHandoff", "<StoryHandoff support=\"" + id + "\"");
  } else {
    // StoryShell: insert before the closing > of the opening line
    lines[ti] = tag.replace(/\s*>?$/, " support=\"" + id + "\"");
  }
  // text tweaks
  for (const [from, to] of tweaks) {
    if (!s.includes(from)) throw new Error(f + " tweak anchor missing: " + from.slice(0, 40));
    s = s.replace(from, to);
  }
  fs.writeFileSync(p, lines.join("\n"));
  edits++;
  console.log("woven", f, "case", caseN, "→", id);
}
console.log("total woven screens:", edits);
