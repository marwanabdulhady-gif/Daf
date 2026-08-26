const fs = require("fs");
const TWEAKS = [
  ["lessons/1-1.jsx",
   "The lantern reveals evidence—but never answers.",
   "The lantern reveals evidence—but never answers. Hafizah, the Lantern Keeper, sets it down and lifts the damaged page."],
  ["lessons/2-1.jsx",
   "The merchant checks before the ink dries",
   "Abu Laila, the merchant, checks before the ink dries"],
  ["lessons/2-8.jsx",
   "Zayd reads the auditor's solution line by line. One step has no evidence behind it — flag it.",
   "Rashed, from the rival school, lays his polished solution on the auditor's desk. Zayd reads it line by line — one step has no evidence behind it. Flag it."],
  ["lessons/3-2.jsx",
   "The foreman promises the order fits on one truck",
   "Khalida, the foreman, promises the order fits on one truck"],
  ["lessons/4-7.jsx",
   "jammed midway, holding the morning's plan.",
   "jammed midway, holding the morning's plan. It is Khalida's lift, and the repair is hers to sign."],
  ["lessons/5-1.jsx",
   "all shared by 4. The 3 is always there.",
   "all shared by 4. The 3 is always there. Mansur, the caravan master, counts nothing twice."],
  ["lessons/5-10.jsx",
   "The other district's report arrives, polished:",
   "Rashed's report from the rival school arrives, polished:"],
  ["lessons/6-1.jsx",
   "One bar is longer, and the short bar repeats inside it.",
   "One bar is longer, and the short bar repeats inside it. Salma, the council scribe, keeps the decision board open."],
  ["lessons/7-1.jsx",
   "The same pieces, the different shapes.",
   "The same pieces, the different shapes. Mariam, the architect, will sign only a certificate with no missing pair."]
];
for (const [f, from, to] of TWEAKS) {
  let s = fs.readFileSync(f, "utf8");
  if (!s.includes(from)) throw new Error("anchor missing in " + f + ": " + from.slice(0, 40));
  if (s.includes(to)) { console.log("already applied:", f); continue; }
  s = s.replace(from, to);
  fs.writeFileSync(f, s);
  console.log("tweaked", f);
}
