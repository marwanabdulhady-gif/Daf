/* Activity-lab artifact export — runs the REAL generated code.

   Every html/activities/*-activity.html ships an `exportArtifactCard()` that
   composites the live sandbox plus the student's own claim onto a branded PNG.
   This test executes that function from the shipped files against a stub DOM
   and a recording 2D context, so a regression in the drawing or the download
   path fails here rather than in front of a class.

   Plain node, no browser: the context records calls instead of rasterising. */
"use strict";

const fs = require("fs");
const path = require("path");

const ACT_DIR = path.join(__dirname, "..", "html", "activities");
const files = fs.readdirSync(ACT_DIR).filter((f) => /^lesson-.*-activity\.html$/.test(f)).sort();

let pass = 0, fail = 0;
const ok = (c, m, extra) => { if (c) pass++; else { fail++; console.log("  FAIL  " + m + (extra ? "\n        " + extra : "")); } };

/* ---- a 2D context that records instead of rasterising ------------------- */
function makeCtx(w, h) {
  const calls = [];
  const ctx = {
    canvas: { width: w, height: h },
    _calls: calls,
    _texts: [],
    measureText: (t) => ({ width: String(t).length * 7 })
  };
  const METHODS = ["clearRect", "fillRect", "strokeRect", "beginPath", "closePath", "moveTo",
    "lineTo", "quadraticCurveTo", "bezierCurveTo", "arc", "arcTo", "ellipse", "rect", "roundRect",
    "fill", "stroke", "clip", "save", "restore", "translate", "rotate", "scale", "transform",
    "setTransform", "setLineDash", "drawImage", "fillText", "strokeText"];
  for (const m of METHODS) {
    ctx[m] = function () {
      calls.push({ m: m, a: Array.prototype.slice.call(arguments) });
      if (m === "fillText" || m === "strokeText") ctx._texts.push(String(arguments[0]));
      return undefined;
    };
  }
  return ctx;
}

/* ---- the smallest DOM the artifact code touches ------------------------- */
function makeDom(values) {
  const nodes = {};
  const made = { canvases: [], anchors: [] };

  const input = (id, v) => ({ id: id, value: v, className: "", textContent: "" });
  nodes.actCanvas = { id: "actCanvas", width: 560, height: 320, _ctx: null, getContext() { if (!this._ctx) this._ctx = makeCtx(this.width, this.height); return this._ctx; } };
  nodes.inputVal1 = input("inputVal1", "482350");
  nodes.inputVal2 = input("inputVal2", "4");
  nodes.artifactName = input("artifactName", values.name);
  nodes.artifactClass = input("artifactClass", values.cls);
  nodes.artifactNote = input("artifactNote", values.note);
  nodes.artifactStatus = input("artifactStatus", "");

  const document = {
    _made: made,
    getElementById: (id) => nodes[id] || null,
    createElement: (tag) => {
      if (tag === "canvas") {
        const c = { width: 0, height: 0, _ctx: null, _png: "data:image/png;base64,AAAA",
          getContext() { if (!this._ctx) this._ctx = makeCtx(this.width, this.height); return this._ctx; },
          toDataURL() { return this._png; } };
        made.canvases.push(c);
        return c;
      }
      const a = { href: "", download: "", clicked: 0, removed: 0, click() { this.clicked++; }, remove() { this.removed++; } };
      made.anchors.push(a);
      return a;
    },
    body: { appendChild() {}, removeChild() {} }
  };
  return { document: document, nodes: nodes, made: made };
}

/* ---- run one activity's real script ------------------------------------- */
function runActivity(file, values) {
  const src = fs.readFileSync(path.join(ACT_DIR, file), "utf8");
  const m = src.match(/<script>([\s\S]*?)<\/script>/);
  if (!m) throw new Error("no inline script in " + file);
  const dom = makeDom(values);
  /* the real drawTool() needs roundRect and friends; the recorder supplies them */
  const sandbox = new Function("document", "window", "Date", "setTimeout",
    m[1] + "\nreturn { exportArtifactCard: exportArtifactCard, ARTIFACT: ARTIFACT, drawTool: drawTool };");
  const api = sandbox(dom.document, { print() {} }, Date, (fn) => fn());
  return { api: api, dom: dom };
}

ok(files.length === 115, "all 115 activity labs present", "found " + files.length);

/* ---- 1. a complete card exports and downloads --------------------------- */
{
  const file = "lesson-1-1-numbers-through-one-million-activity.html";
  const { api, dom } = runActivity(file, {
    name: "Amina Karim", cls: "4A",
    note: "I claim 482,350 has 4 hundred-thousands because the chart shows 4 in the HT seat."
  });

  ok(typeof api.exportArtifactCard === "function", file + " · exportArtifactCard ships");
  ok(api.ARTIFACT && api.ARTIFACT.code === "1-1", file + " · card carries the lesson code");
  ok(/Place-Value Harbor/.test(api.ARTIFACT.topic), file + " · card carries the topic region", api.ARTIFACT.topic);
  ok(/4\.NBT/.test(api.ARTIFACT.standard), file + " · card carries the standard", api.ARTIFACT.standard);

  api.exportArtifactCard();

  ok(dom.made.canvases.length === 1, file + " · one card canvas is built");
  const card = dom.made.canvases[0];
  ok(card.width === 900 && card.height === 1240, file + " · card is 900x1240", card.width + "x" + card.height);

  /* branding, lesson identity, the sandbox and the student's own words */
  const texts = card._ctx._texts.join(" | ");
  ok(/Dar Al Fikr Schools/.test(texts), file + " · card is branded with the school");
  ok(/FAITH · RIGHTEOUSNESS · WISDOM/.test(texts), file + " · card carries the tagline");
  ok(/STAGE 5 · ARTIFACT CARD/.test(texts), file + " · card is labelled Stage 5");
  ok(/LESSON 1-1/.test(texts), file + " · card names the lesson");
  ok(/Numbers Through One Million/.test(texts), file + " · card carries the lesson title");
  ok(/482,350 has 4 hundred-thousands/.test(texts), file + " · the student's claim is on the card");
  ok(/Amina Karim/.test(texts), file + " · the student's name is on the card");
  ok(/4A/.test(texts), file + " · the class is on the card");

  /* the live sandbox is composited in, not re-drawn */
  const draws = card._ctx._calls.filter((c) => c.m === "drawImage");
  ok(draws.length === 1, file + " · the sandbox canvas is composited onto the card");
  ok(draws.length === 1 && draws[0].a[0] === dom.nodes.actCanvas, file + " · what is composited is the live sandbox");

  /* the download */
  ok(dom.made.anchors.length === 1, file + " · one download anchor is created");
  const a = dom.made.anchors[0];
  ok(a && /^data:image\/png/.test(a.href), file + " · the anchor carries PNG data");
  ok(a && a.download === "daf-artifact-1-1-Amina-Karim.png", file + " · filename is branded + named",
    a && a.download);
  ok(a && a.clicked === 1, file + " · the download is triggered");
  ok(/Saved daf-artifact-1-1-Amina-Karim\.png/.test(dom.nodes.artifactStatus.textContent),
    file + " · the status confirms the save", dom.nodes.artifactStatus.textContent);
  ok(dom.nodes.artifactStatus.className === "artifact-status", file + " · success is not styled as an error");
}

/* ---- 2. the claim is the student's, never the AI's ---------------------- */
{
  const file = "lesson-1-1-numbers-through-one-million-activity.html";
  const { api, dom } = runActivity(file, { name: "", cls: "", note: "" });
  api.exportArtifactCard();
  const texts = dom.made.canvases[0]._ctx._texts.join(" | ");
  ok(/claim left blank/.test(texts), file + " · a blank claim is marked as the student's to write", texts.slice(0, 120));
  ok(!/I claim that/.test(texts), file + " · no claim text is invented for the student");
  ok(dom.made.anchors[0].download === "daf-artifact-1-1-student.png",
    file + " · an unnamed card still downloads under a safe filename", dom.made.anchors[0].download);
  ok(/add your name/.test(dom.nodes.artifactStatus.textContent),
    file + " · the teacher is nudged to get a name", dom.nodes.artifactStatus.textContent);
}

/* ---- 3. awkward input cannot break the export --------------------------- */
{
  const file = "lesson-1-1-numbers-through-one-million-activity.html";
  const longNote = "I claim this because ".repeat(60);
  const { api, dom } = runActivity(file, {
    name: "  محمد / <script>x</script>   Bob ",
    cls: "4A",
    note: longNote
  });
  api.exportArtifactCard();
  const a = dom.made.anchors[0];
  ok(a && a.clicked === 1, file + " · export survives a messy name");
  ok(a && !/[^\x20-\x7E]/.test(a.download) && !/\s/.test(a.download) && !/</.test(a.download),
    file + " · the filename is sanitised", a && a.download);
  const claimLines = dom.made.canvases[0]._ctx._calls.filter((c) => c.m === "fillText");
  ok(claimLines.length < 80, file + " · an over-long claim is truncated, not drawn forever",
    claimLines.length + " fillText calls");
  ok(/…/.test(dom.made.canvases[0]._ctx._texts.join("")), file + " · truncation is visible on the card");
}

/* ---- 4. a throwing context degrades to a status message, never a crash --- */
{
  const file = "lesson-1-1-numbers-through-one-million-activity.html";
  const { api, dom } = runActivity(file, { name: "X", cls: "4A", note: "ok" });
  dom.document.createElement = (tag) => {
    if (tag === "canvas") {
      const c = makeCtx(10, 10);
      c.width = 10; c.height = 10;
      c.drawImage = () => { throw new Error("canvas is tainted"); };
      c.toDataURL = () => "data:image/png;base64,AAAA";
      return c;
    }
    return { href: "", download: "", click() {}, remove() {} };
  };
  let threw = false;
  try { api.exportArtifactCard(); } catch (e) { threw = true; }
  ok(!threw, file + " · export failure does not throw into the page");
  ok(/Export failed/.test(dom.nodes.artifactStatus.textContent),
    file + " · the failure is reported to the teacher", dom.nodes.artifactStatus.textContent);
  ok(dom.nodes.artifactStatus.className === "artifact-status err", file + " · the failure is styled as an error");
}

/* ---- 5. every activity ships a working export --------------------------- */
{
  let missing = [], broken = [], noBrand = [];
  for (const f of files) {
    let api;
    try { api = runActivity(f, { name: "Test", cls: "4B", note: "My claim is here." }).api; }
    catch (e) { broken.push(f + " (" + e.message + ")"); continue; }
    if (typeof api.exportArtifactCard !== "function") { missing.push(f); continue; }
    try {
      const r = runActivity(f, { name: "Test", cls: "4B", note: "My claim is here." });
      r.api.exportArtifactCard();
      const t = r.dom.made.canvases[0]._ctx._texts.join(" | ");
      if (!/Dar Al Fikr Schools/.test(t) || !/My claim is here\./.test(t)) noBrand.push(f);
      if (!r.dom.made.anchors[0] || r.dom.made.anchors[0].clicked !== 1) noBrand.push(f + " (no download)");
    } catch (e) { broken.push(f + " (" + e.message + ")"); }
  }
  ok(missing.length === 0, "every activity ships exportArtifactCard", missing.slice(0, 3).join(", "));
  ok(broken.length === 0, "every activity exports without throwing", broken.slice(0, 3).join(", "));
  ok(noBrand.length === 0, "every card is branded and carries the student's claim", noBrand.slice(0, 3).join(", "));
}

/* ---- 6. the print worksheet ships alongside it -------------------------- */
{
  let noPrint = [], noSheet = [], noGrid = [];
  for (const f of files) {
    const s = fs.readFileSync(path.join(ACT_DIR, f), "utf8");
    if (!/@media print/.test(s)) noPrint.push(f);
    if (!/class="print-sheet"/.test(s)) noSheet.push(f);
    if (!/class="ps-grid"/.test(s)) noGrid.push(f);
  }
  ok(noPrint.length === 0, "every activity has a print stylesheet", noPrint.slice(0, 3).join(", "));
  ok(noSheet.length === 0, "every activity has a paper worksheet", noSheet.slice(0, 3).join(", "));
  ok(noGrid.length === 0, "every worksheet has a graph grid to draw on", noGrid.slice(0, 3).join(", "));
}

console.log(`\nactivity-artifact: ${pass} passed, ${fail} failed (${files.length} labs exercised)`);
process.exit(fail ? 1 : 0);
