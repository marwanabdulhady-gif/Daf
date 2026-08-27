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
        && l.critic.production && Array.isArray(l.critic.production.options) && l.critic.production.options.length >= 2 && l.critic.production.options.length <= 3
        && l.critic.production.options.every((o) => o.kind && o.task && o.stem)
        && l.critic.production.options.some((o) => o.ai === true)
        && l.gate && Array.isArray(l.gate.ixl) && l.gate.ixl.length > 0
        && l.wall && l.wall.artifact && l.wall.next;
      ok(okShape, file + " · G20d all seven stages have content");
    }
  }
  /* G21 — print. Ctrl+P must produce a handout, not a clipped 100vh screenshot.
     The deck is a viewport-locked app, so the print block has to exist and has
     to release that lock. */
  const printM = src.match(/@media print\s*\{/);
  ok(!!printM, file + " · G21a print stylesheet present");
  if (printM) {
    /* take the balanced @media print block */
    let depth = 0, end = -1;
    const braceAt = src.indexOf("{", printM.index);
    for (let k = braceAt; k < src.length; k++) {
      if (src[k] === "{") depth++;
      else if (src[k] === "}") { depth--; if (depth === 0) { end = k; break; } }
    }
    const block = end > -1 ? src.slice(braceAt, end + 1) : "";
    ok(/@page\s*\{/.test(block), file + " · G21b print sets an @page size");
    ok(/html,\s*body,\s*#root[^{]*\{[^}]*overflow:\s*visible/.test(block),
      file + " · G21c print releases the viewport lock");
    ok(/\.nav[^{]*\{[^}]*display:\s*none/.test(block), file + " · G21d print drops the projector nav");

    /* G22 — the answer choices in ExploreChips are <button class="btn">, so a
       blanket `.btn { display: none !important }` would print a worksheet with
       no questions on it. The override has to actually win the cascade:
       both !important, so specificity decides. Parse the rules for real —
       a substring test on ".btn {" misses selector lists and passes vacuously. */
    const inner = block.slice(1, -1);
    const rules = [];
    {
      let at = 0;
      while (at < inner.length) {
        const open = inner.indexOf("{", at);
        if (open === -1) break;
        let depth = 1, k = open + 1;
        while (k < inner.length && depth > 0) {
          if (inner[k] === "{") depth++;
          else if (inner[k] === "}") depth--;
          k++;
        }
        rules.push({ sel: inner.slice(at, open).trim(), body: inner.slice(open + 1, k - 1) });
        at = k;
      }
    }
    const spec = (s) => (s.match(/#[\w-]+/g) || []).length * 100
      + (s.match(/\.[\w-]+|\[[^\]]*\]|::?[\w-]+/g) || []).length;
    /* does this selector reach a <button class="btn"> (inside .chip-row or not)? */
    const hitsOption = (s) => {
      const last = s.split(/[\s>+~]+/).pop() || "";
      return last === "button" || last.startsWith("button.") || last.startsWith("button:")
        || /(^|\.)btn([.:\[]|$)/.test(last);
    };
    const parts = (r) => r.sel.split(",").map((s) => s.trim()).filter(hitsOption);
    const hiding = rules.filter((r) => /display:\s*none\s*!important/.test(r.body) && parts(r).length);
    const keeping = rules.filter((r) => /display:\s*(?:inline-flex|inline-block|flex|block)\s*!important/.test(r.body) && parts(r).length);
    const best = (list) => list.reduce((m, r) => Math.max(m, ...parts(r).map(spec)), 0);
    if (hiding.length) {
      ok(keeping.length > 0 && best(keeping) > best(hiding),
        file + ` · G22a answer choices stay printable (hide ${best(hiding)} vs keep ${best(keeping)})`);
      /* Specificity alone is not enough: an override aimed at a class that no
         longer wraps the option buttons wins the cascade and matches nothing.
         Tie the override to the wrapper the engine actually renders. */
      const keepSels = keeping.map((r) => r.sel).join(" ");
      const wrapper = (keepSels.match(/\.([\w-]+)\s+\.btn\b/) || [])[1];
      ok(!!wrapper && new RegExp('className="?' + wrapper).test(jsx)
        && new RegExp('<button[^]*?className=\\{?"?btn').test(
          jsx.slice(Math.max(0, jsx.indexOf('"' + wrapper + '"') - 40), jsx.indexOf('"' + wrapper + '"') + 400)),
        file + ` · G22b the override targets a real option wrapper (${wrapper || "none found"})`);
    } else {
      ok(true, file + " · G22a answer choices stay printable (no blanket hide)");
      ok(true, file + " · G22b the override targets a real option wrapper (no blanket hide)");
    }
  }

  /* G23 — the class folio has to travel both ways. Export alone is a dead end:
     a teacher who cannot load the backup on the second machine has lost the
     stamps anyway. */
  ok(/function folioExport\s*\(/.test(src), file + " · G23a folio export ships");
  /* word-boundary the names: folioImportFile_DISABLED must not satisfy a
     substring test and leave decks shipping an export with no way back in */
  ok(/function folioMerge\s*\(/.test(src) && /function folioImportFile\s*\(/.test(src),
    file + " · G23b folio import ships");
  ok(/[^A-Za-z_]folioImportFile\s*\(/.test(jsx), file + " · G23c folio import is wired to a control");

  console.log((fail === before ? "  PASS  " : "  ---   ") + file + "  (" + nMetas + " lesson screens"
    + (codeM ? " + 4 stage screens" : "") + ")");
}
console.log(`\n${files.length} lesson(s) · ${pass} checks passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
