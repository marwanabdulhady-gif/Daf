const fs = require("fs"), path = require("path");
const babel = require("@babel/standalone");
const files = fs.readdirSync("html").filter(f => f.endsWith(".html"));
let pass = 0, fail = 0;
const ok = (c, m, extra) => { if (c) pass++; else { fail++; console.log("  FAIL  " + m + (extra ? "\n        " + extra : "")); } };

for (const file of files) {
  const src = fs.readFileSync(path.join("html", file), "utf8");
  const before = fail;
  const m = src.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/);
  ok(!!m, file + " · babel block found");
  const jsx = m ? m[1] : "";
  try { babel.transform(jsx, { presets: ["react"] }); ok(true, ""); }
  catch (e) { ok(false, file + " · G1 babel compile", e.message); }
  ok(!/style=\{\{[^}]*:\s*var\(--/.test(jsx), file + " · G2 unquoted css var");
  ok(!/\\frac|\\sqrt/.test(jsx), file + " · G4a LaTeX");
  ok(!/[\u00bc\u00bd\u00be]/.test(jsx), file + " · G4b vulgar fraction");
  ok(!/<sup>|<sub>/.test(jsx), file + " · G4c sup/sub");
  ok(/m:oMath/.test(jsx), file + " · G4e math authored in OMML");
  ok(!/[\u0600-\u06FF]/.test(src), file + " · G5a english only");
  ok(!/dir\s*=\s*["']rtl["']/.test(src), file + " · G5b no rtl");
  ok(!/\{\s*ar\s*:/.test(jsx), file + " · G6a no bilingual objects");
  ok(!/toLowerCase\(\)\s*===\s*"l"/.test(jsx), file + " · G6d no L key");
  const sketches = (jsx.match(/<Sketch|draw=\{/g) || []).length;
  ok(sketches >= 8, file + " · G7 live canvases (" + sketches + ")");
  ok(/try \{\s*ReactDOM\.createRoot/.test(jsx), file + " · G11 offline fallback");
  const nMetas = (jsx.match(/^\s*\{?\s*phase: "/gm) || []).length;
  const nCases = (jsx.match(/^\s*case \d+:/gm) || []).length;
  ok(nMetas === nCases, file + ` · G12 metas(${nMetas}) === cases(${nCases})`);
  ok(/registerPreset\("daf-react"[\s\S]*runtime:\s*"classic"/.test(src), file + " · G13 classic jsx runtime");
  ok(/tag === "input"/.test(jsx), file + " · keyboard yields to inputs");
  ok(/D\.board\(/.test(jsx), file + " · has a board screen");
  ok(/setProperty\("--c"/.test(jsx), file + " · phase colour drives --c");
  ok(!/<\/script>/.test(jsx), file + " · no premature script terminator");
  console.log((fail === before ? "  PASS  " : "  ---   ") + file + "  (" + nMetas + " screens)");
}
console.log(`\n${files.length} lesson(s) · ${pass} checks passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
