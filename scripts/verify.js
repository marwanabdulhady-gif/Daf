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
  /* The engine interleaves its own stage screens around the lesson's metas, so
     the guardrail counts only the lesson's own block (metas: … Visual:), not
     the stage metas defined in app.jsx. */
  const mStart = jsx.indexOf("metas: [");
  const vStart = jsx.indexOf("Visual: function");
  const lessonBlock = (mStart > -1 && vStart > mStart) ? jsx.slice(mStart, vStart) : jsx;
  const nMetas = (lessonBlock.match(/phase: "/g) || []).length;
  const nCases = (jsx.match(/^\s*case \d+:/gm) || []).length;
  /* Flexible lessons: require live mathematical canvases in roughly 70% of the
     sequence, with a floor of four. Do not silently turn a longer lesson into
     text slides, but do not force an eight-screen lesson to pretend it has ten. */
  const minSketches = Math.max(4, Math.ceil(nMetas * 0.7));
  ok(sketches >= minSketches, file + ` · G7 live canvases (${sketches}/${nMetas}, minimum ${minSketches})`);
  ok(/try \{\s*ReactDOM\.createRoot/.test(jsx), file + " · G11 offline fallback");
  ok(nMetas >= 1 && nMetas === nCases, file + ` · G12 metas(${nMetas}) === cases(${nCases})`);
  ok(/registerPreset\("daf-react"[\s\S]*runtime:\s*"classic"/.test(src), file + " · G13 classic jsx runtime");
  ok(/tag === "input"/.test(jsx), file + " · keyboard yields to inputs");
  ok(/D\.board\(/.test(jsx), file + " · has a board screen");
  ok(/setProperty\("--c"/.test(jsx), file + " · phase colour drives --c");
  ok(!/<\/script>/.test(jsx), file + " · no premature script terminator");
  /* G20 — the seven-stage structure. Lesson decks must carry the engine's
     stage machinery and a stamped plan with all seven stages' content.
     Review decks (bosses) keep their original sequence and skip this. */
  ok(/const STAGES = \{/.test(jsx) && /function stageSequence/.test(jsx), file + " · G20a seven-stage engine present");
  const codeM = file.match(/^lesson-(\d+-\d+)/);
  if (codeM) {
    const stM = src.match(/window\.DAF_STAGE = (\{[\s\S]*?\});<\/script>/);
    let entry = null;
    try { entry = stM && JSON.parse(stM[1]); } catch (e) {}
    const l = entry && entry.lessons && entry.lessons[codeM[1]];
    ok(!!stM, file + " · G20b DAF_STAGE stamped");
    ok(!!l, file + " · G20c stage plan covers " + codeM[1]);
    if (l) {
      const okShape = l.screens && ["prep", "diagnose", "practice", "critic"].every((k) => l.screens[k] && l.screens[k].phase && l.screens[k].title && l.screens[k].rail)
        && Array.isArray(l.prep.home) && l.prep.home.length === 3 && Array.isArray(l.prep.objects) && l.prep.objects.length >= 2
        && Array.isArray(l.diagnose.claims) && l.diagnose.claims.length === 4
        && Array.isArray(l.practice.items) && l.practice.items.length >= 2
        && l.critic && l.critic.situation && l.critic.mission && Array.isArray(l.critic.challenges) && l.critic.challenges.length === 3
        && l.critic.production && l.critic.production.kind && l.critic.production.task && l.critic.production.stem
        && l.gate && Array.isArray(l.gate.ixl) && l.gate.ixl.length > 0
        && l.wall && l.wall.artifact && l.wall.next;
      ok(okShape, file + " · G20d all seven stages have content");
    }
  }
  console.log((fail === before ? "  PASS  " : "  ---   ") + file + "  (" + nMetas + " lesson screens"
    + (codeM ? " + 4 stage screens" : "") + ")");
}
console.log(`\n${files.length} lesson(s) · ${pass} checks passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
