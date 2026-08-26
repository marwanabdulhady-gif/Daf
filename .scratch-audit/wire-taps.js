/* Auto-wire tap-to-advance/cycle/toggle onto make* canvas factories.
   Applies a full-canvas D.tap that cycles integer/string chip values or
   toggles a boolean, then updates the call site to pass the setter. */
const fs = require("fs");
const path = require("path");
const ROOT = "/home/user/Daf";

const factoryRe = /const (make\w+) = \((\w+)\) => \(ctx, W, H, frame\) => \{/g;
const bgRe = /ctx\.fillStyle = "#0B1F24"; ctx\.fill\(\);/;

const codes = process.argv.slice(2);
for (const code of codes) {
  const file = path.join(ROOT, "lessons", code + ".jsx");
  let s = fs.readFileSync(file, "utf8");
  const orig = s;
  const matches = [...s.matchAll(factoryRe)];
  let wired = 0;
  for (const m of matches) {
    const fname = m[1];
    const param = m[2];
    const factoryStart = m.index;
    const callToken = "draw={" + fname + "(" + param + ")}";
    if (s.indexOf(callToken) === -1) continue;
    const callIdx = s.indexOf(callToken);
    const after = s.slice(callIdx, callIdx + 600);
    const setterM = after.match(/onPick=\{\(v\) => (set\w+)\(([^)]*)\)/);
    if (!setterM) continue;
    const setter = setterM[1];
    const argExpr = setterM[2];
    const isBool = /\b===\s*1\b/.test(argExpr);
    const onParam = "on" + param[0].toUpperCase() + param.slice(1);
    const chipsM = after.match(/chips=\{\[([\s\S]*?)\]\}/);
    let vals = [];
    if (chipsM) vals = [...chipsM[1].matchAll(/v:\s*("?)([^,}\n]+)\1/g)].map((m) => m[2].trim());
    const isString = vals.length > 0 && vals[0].startsWith('"');
    let tapCb;
    if (isBool) {
      tapCb = "() => " + setter + "(!" + param + ")";
    } else if (isString) {
      tapCb = "() => { const _o=[" + vals.join(", ") + "]; const _i=_o.indexOf(" + param + "); " + setter + "(_o[(_i+1)%_o.length]); }";
    } else if (vals.length > 0) {
      tapCb = "() => { const _o=[" + vals.map((v) => parseInt(v, 10)).join(", ") + "]; const _i=_o.indexOf(" + param + "); " + setter + "(_o[(_i+1)%_o.length]); }";
    } else {
      tapCb = "() => " + setter + "(" + param + "+1)";
    }
    bgRe.lastIndex = factoryStart;
    const bgM = bgRe.exec(s);
    if (!bgM || bgM.index < factoryStart) continue;
    const insertAt = bgM.index + bgM[0].length;
    const tapLine = "\n  if (" + onParam + ") D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: " + tapCb + " });";
    s = s.slice(0, insertAt) + tapLine + s.slice(insertAt);
    s = s.replace(callToken, "draw={" + fname + "(" + param + ", " + onParam + ")}");
    wired++;
  }
  if (s !== orig) {
    fs.writeFileSync(file, s);
    console.log("wired " + code + " (" + wired + " factories)");
  } else {
    console.log("skipped " + code + " (no changes)");
  }
}
