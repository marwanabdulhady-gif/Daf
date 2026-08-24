/* make-index.js — generates index.html: THE MAP OF NUMERIA.
   A class-level world map: 17 topic regions along one route. Finishing a topic
   (and its boss, where one exists) lets the teacher stamp the region REBUILT —
   it gets its colour back on the projector. State lives in this browser only
   (localStorage daf.map.v1); no accounts, no server, no per-student anything. */
const fs = require("fs");
const cur = JSON.parse(fs.readFileSync("curriculum.json", "utf8"));
const files = fs.existsSync("html") ? fs.readdirSync("html") : [];
const fileFor = (code) => files.find((f) => f.startsWith("lesson-" + code + "-"));

const REGIONS = [
  { n: 1,  name: "Place-Value Harbor",  col: "#6042A6", blurb: "Where every ship is worth ten of the one before." },
  { n: 2,  name: "The Souq of Sums",    col: "#6042A6", blurb: "Nothing leaves this market without a regrouped total." },
  { n: 3,  name: "Product Palm Grove",  col: "#FA7E19", blurb: "One-digit multipliers grow in orderly rows." },
  { n: 4,  name: "The Tower of Times",  col: "#FA7E19", blurb: "Two-digit by two-digit, floor by partial floor." },
  { n: 5,  name: "Division Dunes",      col: "#FA7E19", blurb: "Share the caravan loads; watch for remainders in the sand." },
  { n: 6,  name: "Caravan Crossroads",  col: "#FA7E19", blurb: "Multi-step problems meet here from every direction." },
  { n: 7,  name: "Factor Reef",         col: "#FA7E19", blurb: "Every number breaks into the pairs that built it." },
  { n: 8,  name: "The Fraction Isles",  col: "#2D70B3", blurb: "Different names, same island — equivalence rules the water." },
  { n: 9,  name: "Kunafa Kitchens",     col: "#2D70B3", blurb: "Add and subtract the slices; the tray never lies." },
  { n: 10, name: "The Scaling Strait",  col: "#2D70B3", blurb: "Whole numbers times fractions, current times distance." },
  { n: 11, name: "The Pearl Ledger",    col: "#C74440", blurb: "Line plots of every diver's haul, to the eighth of an inch." },
  { n: 12, name: "Decimal Docks",       col: "#C74440", blurb: "Tenths and hundredths tie up side by side." },
  { n: 13, name: "The Measure Market",  col: "#12857C", blurb: "Cubits to metres, jugs to cups — units trade honestly here." },
  { n: 14, name: "Pattern Oasis",       col: "#388C46", blurb: "Rules repeat like palm rows; say the next before it grows." },
  { n: 15, name: "Angle Heights",       col: "#B3488F", blurb: "Degrees are counted one turn at a time up these cliffs." },
  { n: 16, name: "Geometry Gardens",    col: "#B3488F", blurb: "Lines, angles and symmetry, planted in beds." },
  { n: 17, name: "The Grand Gate",      col: "#0A5F58", blurb: "The road out of Numeria — first steps into Grade 5." }
];

/* serpentine positions on a 1440x900 board */
const POS = [
  [150, 175], [430, 130], [710, 170], [990, 125], [1270, 170],
  [1290, 355], [1010, 395], [730, 350], [450, 395], [170, 350],
  [150, 570], [430, 615], [710, 565], [990, 615], [1270, 570],
  [1000, 790], [640, 800]
];

const data = cur.topics.map((t, i) => {
  const r = REGIONS[i];
  const lessons = t.lessons.map((l) => ({
    code: l.code, title: l.title, std: l.standard || t.standards, file: fileFor(l.code) || null
  }));
  const boss = (cur.bosses || []).find((b) => b.topic === t.n);
  return {
    n: t.n, topic: t.title, name: r.name, col: r.col, blurb: r.blurb,
    x: POS[i][0], y: POS[i][1], lessons,
    boss: boss ? { name: boss.name, file: fileFor(boss.code) || null } : null
  };
});

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NUMERIA — Dar Al Fikr · Grade 4 Mathematics</title>
<style>
  :root{
    --teal:#12857C; --teal2:#1AA79B; --deep:#0A5F58; --gold:#C9A227; --ink:#10242B;
    --mint:#E8F6F4; --line:#CDE7E3; --board:#0B1F24; --sand:#123239; --ruin:#31424A;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:
    radial-gradient(1200px 700px at 75% -10%, #14343C 0%, var(--board) 62%);
    color:#EAF4F2;min-height:100vh}
  header{display:flex;align-items:center;gap:18px;padding:20px 30px 12px;flex-wrap:wrap}
  .brand{display:flex;align-items:center;gap:12px}
  .brand svg{width:40px;height:40px;color:var(--gold)}
  .brand b{display:block;font-size:15px;letter-spacing:.02em}
  .brand span{display:block;font-size:9.5px;letter-spacing:.22em;color:#9fc4bd}
  .world{flex:1;min-width:260px;text-align:center}
  .world h1{font-size:30px;letter-spacing:.14em;color:var(--gold);font-weight:900}
  .world p{font-size:11.5px;color:#9fc4bd;letter-spacing:.06em}
  .prog{min-width:220px;text-align:end}
  .prog b{font-size:13px}
  .prog-bar{height:9px;border-radius:6px;background:rgba(255,255,255,.1);margin-top:6px;overflow:hidden}
  .prog-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--teal2),var(--gold));border-radius:6px;transition:width .6s}
  .note{margin:0 30px 10px;padding:9px 14px;border:1px dashed rgba(201,162,39,.5);border-radius:10px;
    font-size:11.5px;color:#cfb659;background:rgba(201,162,39,.07)}
  .stage{position:relative;margin:4px 22px 26px}
  svg.map{width:100%;height:auto;display:block}
  .node{cursor:pointer}
  .node circle.face{transition:all .25s}
  .node:hover circle.face{filter:brightness(1.25)}
  .node text{pointer-events:none;user-select:none}
  .panel{position:fixed;top:0;inset-inline-end:0;height:100vh;width:min(430px,94vw);z-index:50;
    background:#0E272E;border-inline-start:1.5px solid rgba(201,162,39,.35);
    box-shadow:-18px 0 50px rgba(0,0,0,.5);transform:translateX(110%);transition:transform .28s ease;
    display:flex;flex-direction:column}
  .panel.open{transform:none}
  .p-head{padding:20px 22px 14px;border-bottom:1px solid rgba(255,255,255,.08)}
  .p-region{font-size:21px;font-weight:900}
  .p-topic{font-size:11.5px;color:#9fc4bd;margin-top:3px}
  .p-blurb{font-size:12.5px;color:#cfe8e3;margin-top:8px;font-style:italic}
  .p-actions{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
  .btn{border:1.5px solid rgba(255,255,255,.25);background:rgba(255,255,255,.06);color:#EAF4F2;
    border-radius:10px;padding:8px 14px;font:700 12px inherit;cursor:pointer;transition:all .15s}
  .btn:hover{border-color:var(--gold);color:#fff}
  .btn.gold{background:var(--gold);border-color:var(--gold);color:var(--ink)}
  .btn.gold:hover{filter:brightness(1.1)}
  .p-list{flex:1;overflow:auto;padding:12px 16px 24px}
  .p-lesson{display:block;text-decoration:none;color:#EAF4F2;border:1px solid rgba(255,255,255,.1);
    border-radius:10px;padding:9px 12px;margin-bottom:7px;transition:all .15s;background:rgba(255,255,255,.03)}
  .p-lesson:hover{border-color:var(--teal2);background:rgba(26,167,155,.1)}
  .p-lesson.dead{opacity:.4;cursor:default}
  .p-lesson .c{font:800 10.5px "Courier New",monospace;color:var(--teal2)}
  .p-lesson .t{font-size:12.5px;font-weight:700;margin-top:1px}
  .p-lesson .s{font-size:10px;color:#9fc4bd;margin-top:2px}
  .p-boss{border-color:rgba(201,162,39,.55);background:rgba(201,162,39,.08)}
  .p-boss .c{color:var(--gold)}
  .p-boss:hover{border-color:var(--gold);background:rgba(201,162,39,.16)}
  .p-close{position:absolute;top:14px;inset-inline-end:14px;background:none;border:none;color:#9fc4bd;
    font-size:20px;cursor:pointer}
  .p-close:hover{color:#fff}
  footer{padding:0 30px 26px;font-size:10.5px;color:#5f7d78;text-align:center;letter-spacing:.05em}
</style>
</head>
<body>
<header>
  <div class="brand">
    <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
      <path d="M20 0l4.2 10.1L34.1 5.9 29.9 16 40 20l-10.1 4.2 4.2 9.9L24 29.9 20 40l-4.2-10.1L5.9 34.1 10.1 24 0 20l10.1-4.2L5.9 5.9 16 10.1z"/>
    </svg>
    <div><b>Dar Al Fikr Schools</b><span>FAITH · RIGHTEOUSNESS · WISDOM</span></div>
  </div>
  <div class="world">
    <h1>NUMERIA</h1>
    <p>THE LOST CITY OFF THE JEDDAH COAST · REBUILT ONE TOPIC AT A TIME · GRADE 4 MATHEMATICS</p>
  </div>
  <div class="prog">
    <b><span id="doneCount">0</span> / 17 regions rebuilt</b>
    <div class="prog-bar"><i id="progFill" style="width:0%"></i></div>
  </div>
</header>
<div class="note"><b>Projector note:</b> in an app preview this map cannot open lesson files — download the
folder and open index.html in a real browser. Region stamps save in this browser only.</div>
<div class="stage">
  <svg class="map" id="map" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"></svg>
</div>
<aside class="panel" id="panel">
  <button class="p-close" id="pClose" title="Close">&#10005;</button>
  <div class="p-head">
    <div class="p-region" id="pRegion"></div>
    <div class="p-topic" id="pTopic"></div>
    <div class="p-blurb" id="pBlurb"></div>
    <div class="p-actions">
      <button class="btn gold" id="pStamp"></button>
    </div>
  </div>
  <div class="p-list" id="pList"></div>
</aside>
<footer>Savvas enVision Mathematics (2024) · Grade 4 · 17 topics · 114 lessons · region stamps: localStorage daf.map.v1</footer>
<script>
const DATA = ${JSON.stringify(data)};
const KEY = "daf.map.v1";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } };
const save = (st) => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
let state = load();

const svg = document.getElementById("map");
const NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  (parent || svg).appendChild(e); return e;
};

function draw() {
  svg.innerHTML = "";
  /* sea + shore hints */
  el("rect", { x: 0, y: 0, width: 1440, height: 900, rx: 26, fill: "rgba(18,133,124,.06)" });
  for (let i = 0; i < 6; i++)
    el("path", { d: "M" + (30 + i * 12) + " " + (700 + i * 26) + " q 40 -14 80 0 t 80 0 t 80 0",
      fill: "none", stroke: "rgba(26,167,155,.25)", "stroke-width": 2, "stroke-linecap": "round" });
  /* the route */
  let d = "";
  DATA.forEach((r, i) => { d += (i ? " L " : "M ") + r.x + " " + r.y; });
  el("path", { d, fill: "none", stroke: "rgba(201,162,39,.45)", "stroke-width": 3,
    "stroke-dasharray": "2 10", "stroke-linecap": "round" });

  DATA.forEach((r) => {
    const on = !!state[r.n];
    const g = el("g", { class: "node", transform: "translate(" + r.x + "," + r.y + ")" });
    g.addEventListener("click", () => openPanel(r));
    /* ruin rubble or glow */
    if (on) el("circle", { r: 40, fill: r.col, opacity: .18 }, g);
    el("circle", { class: "face", r: 27, fill: on ? r.col : "#31424A",
      stroke: on ? "#C9A227" : "rgba(255,255,255,.25)", "stroke-width": on ? 3.5 : 1.5,
      "stroke-dasharray": on ? "none" : "5 4" }, g);
    el("text", { y: 6, "text-anchor": "middle", "font-size": 17, "font-weight": 900,
      fill: on ? "#fff" : "#8ba3a0" }, g).textContent = r.n;
    if (on) {
      const st = el("path", { transform: "translate(20,-26) scale(0.55)",
        d: "M0 -14l3 7 7-3-3 7 7 3-7 3 3 7-7-3-3 7-3-7-7 3 3-7-7-3 7-3-3-7 7 3z", fill: "#C9A227" }, g);
    }
    el("text", { y: 48, "text-anchor": "middle", "font-size": 13, "font-weight": 800,
      fill: on ? "#EAF4F2" : "#71898f" }, g).textContent = r.name;
    el("text", { y: 63, "text-anchor": "middle", "font-size": 9.5, "letter-spacing": 1,
      fill: on ? "#9fc4bd" : "#546a70" }, g).textContent = on ? "REBUILT" : "IN RUINS \\u00b7 TOPIC " + r.n;
  });
  const done = DATA.filter((r) => state[r.n]).length;
  document.getElementById("doneCount").textContent = done;
  document.getElementById("progFill").style.width = (done / 17 * 100) + "%";
}

let current = null;
function openPanel(r) {
  current = r;
  document.getElementById("pRegion").textContent = r.n + " \\u00b7 " + r.name;
  document.getElementById("pRegion").style.color = r.col === "#31424A" ? "#fff" : r.col;
  document.getElementById("pTopic").textContent = "TOPIC " + r.n + " \\u00b7 " + r.topic + " \\u00b7 " + r.lessons.length + " lessons";
  document.getElementById("pBlurb").textContent = "\\u201c" + r.blurb + "\\u201d";
  const stamp = document.getElementById("pStamp");
  stamp.textContent = state[r.n] ? "\\u2605 Rebuilt \\u2014 tap to undo" : "Stamp this region REBUILT";
  const list = document.getElementById("pList");
  list.innerHTML = "";
  r.lessons.forEach((l) => {
    const a = document.createElement(l.file ? "a" : "div");
    a.className = "p-lesson" + (l.file ? "" : " dead");
    if (l.file) a.href = "html/" + l.file;
    a.innerHTML = '<span class="c">' + l.code + '</span><div class="t">' + l.title +
      '</div><div class="s">' + (l.std || "") + "</div>";
    list.appendChild(a);
  });
  if (r.boss && r.boss.file) {
    const a = document.createElement("a");
    a.className = "p-lesson p-boss";
    a.href = "html/" + r.boss.file;
    a.innerHTML = '<span class="c">BOSS</span><div class="t">\\u2694 ' + r.boss.name +
      '</div><div class="s">whole-class battle \\u00b7 run it as the topic review</div>';
    list.appendChild(a);
  } else {
    const dv = document.createElement("div");
    dv.className = "p-lesson dead";
    dv.innerHTML = '<span class="c">BOSS</span><div class="t">This region\\u2019s boss has not surfaced yet</div>';
    list.appendChild(dv);
  }
  document.getElementById("panel").classList.add("open");
}
document.getElementById("pStamp").addEventListener("click", () => {
  if (!current) return;
  state[current.n] = !state[current.n];
  save(state); draw(); openPanel(current);
});
document.getElementById("pClose").addEventListener("click", () =>
  document.getElementById("panel").classList.remove("open"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") document.getElementById("panel").classList.remove("open");
});
draw();
</script>
</body>
</html>
`;

fs.writeFileSync("index.html", html);
const built = data.reduce((a, t) => a + t.lessons.filter((l) => l.file).length, 0);
console.log("index.html — map of Numeria · " + built + " lesson links · " +
  data.filter((t) => t.boss && t.boss.file).length + " boss(es) on the map");
