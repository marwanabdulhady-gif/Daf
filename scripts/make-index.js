/* make-index.js — generates index.html: THE MAP OF NUMERIA & CURRICULUM HUB.
   Includes:
   - Interactive World Map of Numeria (17 topic regions)
   - 16 Chapters View (organized by topic / chapter with full lesson links)
   - Semester 1 Weekly Distribution (Weeks 1 to 19, Academic Year 2026 - 2027)
   - Semester 2 Weekly Distribution (Weeks 1 to 19, Academic Year 2026 - 2027)
   - Interactive Activities & STEAM Manipulatives Lab (19 standalone tools)
   State lives in localStorage (daf.map.v1). */

const fs = require("fs");
const path = require("path");
const { ACTIVITIES } = require("./build-activities");

const cur = JSON.parse(fs.readFileSync("curriculum.json", "utf8"));
const files = fs.existsSync("html") ? fs.readdirSync("html").filter(f => f.endsWith(".html")) : [];
const fileFor = (code) => {
  const norm = code.replace(".", "-");
  return files.find((f) => f.startsWith("lesson-" + norm + "-"));
};

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

const topicData = cur.topics.map((t, i) => {
  const r = REGIONS[i];
  const lessons = t.lessons.map((l) => ({
    code: l.code, title: l.title, std: l.standard || t.standards, file: fileFor(l.code) || null,
    ixl: l.ixl || []
  }));
  const boss = (cur.bosses || []).find((b) => b.topic === t.n);
  return {
    n: t.n, topic: t.title, name: r.name, col: r.col, blurb: r.blurb,
    x: POS[i][0], y: POS[i][1], lessons,
    boss: boss ? { name: boss.name, file: fileFor(boss.code) || null } : null
  };
});

// Semester 1 (2026 - 2027)
const SEMESTER_1 = [
  { week: 1, title: "Orientation, Reinforcement & Diagnostic Assessment", lessons: [], notes: "Orientation · Reinforcement · Diagnostic Assessment", activityFile: "activity-week01-diagnostic-readiness-map.html" },
  { week: 2, title: "Place Value Through One Million & Comparing Whole Numbers", lessons: ["1.1", "1.2", "1.3"], activityFile: "activity-ch01-place-value-census-chart.html" },
  { week: 3, title: "Rounding Whole Numbers & Mental Math Addition/Subtraction", lessons: ["1.4", "2.1"], activityFile: "activity-ch01-place-value-census-chart.html" },
  { week: 4, title: "Estimating Sums/Differences & Adding Multi-Digit Numbers", lessons: ["2.2", "2.3", "2.4"], activityFile: "activity-ch02-souq-of-sums-mental-math.html" },
  { week: 5, title: "Subtracting Multi-Digit Numbers & Across Zeros", lessons: ["2.5", "2.6", "2.7"], activityFile: "activity-ch02-souq-of-sums-mental-math.html" },
  { week: 6, title: "Multiplication by Multiples of 10, 100, 1000, Estimates & Arrays", lessons: ["3.1", "3.2", "3.3"], activityFile: "activity-ch03-area-model-multiplication-lab.html" },
  { week: 7, title: "Area Models, Mental Math Multiplication & Problem Solving", lessons: ["3.4", "3.6", "3.8"], activityFile: "activity-ch03-area-model-multiplication-lab.html" },
  { week: 8, title: "Multiplying Multiples of 10, 2-Digit Models & Estimation", lessons: ["4.1", "4.2", "4.3"], activityFile: "activity-ch04-tower-of-times-partial-products.html" },
  { week: 9, title: "Area Models / Partial Products & Mental Math Quotients / Estimates", lessons: ["4.5", "5.1", "5.2"], activityFile: "activity-ch04-tower-of-times-partial-products.html" },
  { week: 10, title: "Greater Dividends, Interpreting Remainders & Partial Quotients", lessons: ["5.3", "5.4", "5.5"], activityFile: "activity-ch05-division-dunes-quotient-lab.html" },
  { week: 11, title: "Greater Dividends Division & Solving Comparison Problems", lessons: ["5.6", "6.1", "6.2"], activityFile: "activity-ch05-division-dunes-quotient-lab.html" },
  { week: 12, title: "Multi-Step Problem Solving & Modeling", lessons: ["6.3", "6.5", "6.6"], activityFile: "activity-ch06-caravan-multi-step-problem-lab.html" },
  { week: 13, title: "Understanding Factors & Repeated Reasoning", lessons: ["7.1", "7.2", "7.3"], activityFile: "activity-ch07-factor-reef-pairs-explorer.html" },
  { week: 14, title: "Prime, Composite Numbers & Multiples", lessons: ["7.4", "7.5"], activityFile: "activity-ch07-factor-reef-pairs-explorer.html" },
  { week: 15, title: "Equivalent Fractions (Area Models, Number Lines & Multiplication)", lessons: ["8.1", "8.2", "8.3"], activityFile: "activity-ch08-fraction-isles-equivalence-strips.html" },
  { week: 16, title: "Equivalent Fractions (Division, Benchmarks & Comparison)", lessons: ["8.4", "8.5", "8.6"], activityFile: "activity-ch08-fraction-isles-equivalence-strips.html" },
  { week: 17, title: "General Revision", lessons: [], notes: "Comprehensive Semester 1 Review (Chapters 1 to 8)", activityFile: "activity-sem1-general-revision-arena.html" },
  { week: 18, title: "General Revision", lessons: [], notes: "Exam Preparation, Gap Map Closure & Intervention", activityFile: "activity-sem1-general-revision-arena.html" },
  { week: 19, title: "SEMESTER 1 - FINAL EXAMINATIONS", lessons: [], notes: "Semester 1 Final Examinations Administration", activityFile: "activity-sem1-general-revision-arena.html" }
];

// Semester 2 (2026 - 2027)
const SEMESTER_2 = [
  { week: 1, title: "Equivalent Fractions (Area Models, Number Lines & Multiplication)", lessons: ["8.1", "8.2", "8.3"], activityFile: "activity-ch08-fraction-isles-equivalence-strips.html" },
  { week: 2, title: "Equivalent Fractions (Division, Benchmarks & Comparison)", lessons: ["8.4", "8.5", "8.6"], activityFile: "activity-ch08-fraction-isles-equivalence-strips.html" },
  { week: 3, title: "Fraction Addition & Decomposing Fractions", lessons: ["9.1", "9.2", "9.3"], activityFile: "activity-ch09-kunafa-kitchen-fraction-addition.html" },
  { week: 4, title: "Subtracting Like Denominators, Mixed Numbers Modeling", lessons: ["9.5", "9.6", "9.7"], activityFile: "activity-ch09-kunafa-kitchen-fraction-addition.html" },
  { week: 5, title: "Add/Subtract Mixed Numbers & Unit Fraction Multiples", lessons: ["9.8", "9.9", "10.1"], activityFile: "activity-ch09-kunafa-kitchen-fraction-addition.html" },
  { week: 6, title: "Multiplying Fractions by Whole Numbers & Time Problems", lessons: ["10.2", "10.3", "10.4"], activityFile: "activity-ch10-scaling-strait-fraction-multiplier.html" },
  { week: 7, title: "Reading, Making & Using Line Plots", lessons: ["11.1", "11.2", "11.3"], activityFile: "activity-ch11-pearl-ledger-line-plot-diver.html" },
  { week: 8, title: "Critique Reasoning & Fractions and Decimals", lessons: ["11.4", "12.1", "12.2"], activityFile: "activity-ch11-pearl-ledger-line-plot-diver.html" },
  { week: 9, title: "Comparing Decimals, Tenths/Hundredths & Money Problems", lessons: ["12.3", "12.4", "12.5"], activityFile: "activity-ch12-decimal-docks-tenths-hundredths.html" },
  { week: 10, title: "Decimal Structure & Customary Length and Capacity", lessons: ["12.6", "13.1", "13.2"], activityFile: "activity-ch12-decimal-docks-tenths-hundredths.html" },
  { week: 11, title: "Customary Weight & Metric Length, Capacity and Mass", lessons: ["13.3", "13.4", "13.5"], activityFile: "activity-ch13-boss-measure-market-battle.html" },
  { week: 12, title: "Perimeter & Area Problems, Number Sequences & Rules", lessons: ["13.6", "14.1", "14.2"], activityFile: "activity-ch13-boss-measure-market-battle.html" },
  { week: 13, title: "Repeating Shapes Patterns & Understanding Angles", lessons: ["14.3", "15.1", "15.2"], activityFile: "activity-ch14-pattern-oasis-sequence-builder.html" },
  { week: 14, title: "Measuring, Drawing & Adding/Subtracting Angles", lessons: ["15.4", "15.5"], activityFile: "activity-ch15-angle-heights-protractor-lab.html" },
  { week: 15, title: "Lines, Classifying Triangles & Quadrilaterals", lessons: ["16.1", "16.2", "16.3"], activityFile: "activity-ch16-geometry-gardens-symmetry-studio.html" },
  { week: 16, title: "Line Symmetry & Drawing Symmetrical Shapes", lessons: ["16.4", "16.5"], activityFile: "activity-ch16-geometry-gardens-symmetry-studio.html" },
  { week: 17, title: "General Revision", lessons: [], notes: "Comprehensive Semester 2 Review (Chapters 8 to 16)", activityFile: "activity-sem2-general-revision-arena.html" },
  { week: 18, title: "General Revision", lessons: [], notes: "Exam Preparation, Geometry & Fraction Mastery", activityFile: "activity-sem2-general-revision-arena.html" },
  { week: 19, title: "SEMESTER 2 - FINAL EXAMINATIONS", lessons: [], notes: "Semester 2 Final Examinations Administration", activityFile: "activity-sem2-general-revision-arena.html" }
];

function enrichSemester(semList) {
  return semList.map(w => {
    const enrichedLessons = w.lessons.map(code => {
      const norm = code.replace(".", "-");
      const parts = norm.split("-");
      const chNum = parseInt(parts[0], 10);
      const t = cur.topics.find(top => top.n === chNum);
      const l = t ? t.lessons.find(les => les.code === norm || les.code === code) : null;
      return {
        code,
        chapter: chNum,
        title: l ? l.title : code,
        std: l ? (l.standard || t.standards) : "",
        file: fileFor(code)
      };
    });
    return { ...w, lessonDetails: enrichedLessons };
  });
}

const s1Data = enrichSemester(SEMESTER_1);
const s2Data = enrichSemester(SEMESTER_2);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NUMERIA — Dar Al Fikr · Grade 4 Mathematics Curriculum Hub (2026 - 2027)</title>
<style>
  :root{
    --teal:#12857C; --teal2:#1AA79B; --deep:#0A5F58; --gold:#C9A227; --ink:#10242B;
    --mint:#E8F6F4; --line:#CDE7E3; --board:#0B1F24; --sand:#123239; --ruin:#31424A;
    --card:#102D35; --card-hover:#163A44;
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
  
  /* Tabs */
  .nav-tabs{display:flex;gap:10px;margin:12px 30px 16px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.1);overflow-x:auto}
  .tab-btn{background:rgba(255,255,255,.05);color:#9fc4bd;border:1.5px solid rgba(255,255,255,.15);
    border-radius:10px;padding:9px 18px;font:700 13px inherit;cursor:pointer;transition:all .18s;white-space:nowrap}
  .tab-btn:hover{background:rgba(255,255,255,.1);color:#fff;border-color:var(--teal2)}
  .tab-btn.active{background:var(--teal);color:#fff;border-color:var(--teal2);box-shadow:0 0 14px rgba(18,133,124,.5)}

  .tab-content{display:none;margin:0 30px 30px}
  .tab-content.active{display:block}

  .note{margin:0 30px 14px;padding:9px 14px;border:1px dashed rgba(201,162,39,.5);border-radius:10px;
    font-size:11.5px;color:#cfb659;background:rgba(201,162,39,.07)}
  .stage{position:relative;margin:4px 0 26px}
  svg.map{width:100%;height:auto;display:block}
  .node{cursor:pointer}
  .node circle.face{transition:all .25s}
  .node:hover circle.face{filter:brightness(1.25)}
  .node text{pointer-events:none;user-select:none}
  
  .panel{position:fixed;top:0;inset-inline-end:0;height:100vh;width:min(450px,94vw);z-index:50;
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

  /* Grid Views */
  .grid-container{display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:18px;margin-top:14px}
  .grid-card{background:var(--card);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:18px;
    transition:all .2s;display:flex;flex-direction:column}
  .grid-card:hover{background:var(--card-hover);border-color:var(--teal2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
  .card-badge{display:inline-block;padding:3px 8px;border-radius:6px;font:800 11px "Courier New",monospace;
    background:rgba(26,167,155,.2);color:var(--teal2);margin-bottom:8px}
  .card-title{font-size:16px;font-weight:800;color:#fff;margin-bottom:6px}
  .card-sub{font-size:12px;color:#9fc4bd;margin-bottom:14px}
  .lesson-chip-list{display:flex;flex-direction:column;gap:6px;flex:1}
  .lesson-chip{display:flex;align-items:center;gap:10px;text-decoration:none;color:#EAF4F2;background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px 10px;font-size:12px;transition:all .15s}
  .lesson-chip:hover{border-color:var(--gold);background:rgba(201,162,39,.1);color:#fff}
  .chip-code{font:800 11px "Courier New",monospace;color:var(--gold);min-width:32px}
  .chip-title{flex:1;font-weight:600}
  .chip-std{font-size:10px;color:#8faaa5}

  .folder-link-btn{display:inline-flex;align-items:center;gap:6px;margin-top:12px;padding:7px 12px;font-size:11.5px;
    font-weight:700;color:var(--teal2);border:1px solid var(--teal2);border-radius:8px;text-decoration:none;transition:all .15s}
  .folder-link-btn:hover{background:var(--teal2);color:#0B1F24}

  .section-header{margin-bottom:12px}
  .section-header h2{font-size:22px;color:var(--gold);font-weight:800}
  .section-header p{font-size:12.5px;color:#9fc4bd;margin-top:3px}

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
    <p>CURRICULUM HUB & INTERACTIVE LESSONS · GRADE 4 MATHEMATICS (2026 - 2027)</p>
  </div>
  <div class="prog">
    <b><span id="doneCount">0</span> / 17 regions rebuilt</b>
    <div class="prog-bar"><i id="progFill" style="width:0%"></i></div>
  </div>
</header>

<div class="nav-tabs">
  <button class="tab-btn active" onclick="showTab('mapView')">&#128506; World Map View</button>
  <button class="tab-btn" onclick="showTab('chaptersView')">&#128218; Chapters View (1–16)</button>
  <button class="tab-btn" onclick="showTab('sem1View')">&#128197; Semester 1 (2026–2027)</button>
  <button class="tab-btn" onclick="showTab('sem2View')">&#128197; Semester 2 (2026–2027)</button>
  <button class="tab-btn" onclick="showTab('activitiesView')">&#127912; Activities & STEAM Labs</button>
</div>

<!-- TAB 1: WORLD MAP -->
<div id="mapView" class="tab-content active">
  <div class="note"><b>Interactive World Map:</b> Click on any region along the caravan route to view lessons, standards, and stamp regions rebuilt.</div>
  <div class="stage">
    <svg class="map" id="map" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"></svg>
  </div>
</div>

<!-- TAB 2: CHAPTERS VIEW -->
<div id="chaptersView" class="tab-content">
  <div class="section-header">
    <h2>16 Chapters of Grade 4 Mathematics</h2>
    <p>Complete curriculum aligned with Savvas enVision Mathematics (2026 - 2027). Each chapter folder contains standalone interactive HTML, JSX source decks, and STEAM production activities.</p>
  </div>
  <div class="grid-container" id="chaptersGrid"></div>
</div>

<!-- TAB 3: SEMESTER 1 -->
<div id="sem1View" class="tab-content">
  <div class="section-header">
    <h2>Semester 1 Curriculum Distribution (2026 - 2027)</h2>
    <p>19 Weeks · Place Value, Addition/Subtraction, Multiplication, Division, Factors & Fraction Equivalence</p>
  </div>
  <div class="grid-container" id="sem1Grid"></div>
</div>

<!-- TAB 4: SEMESTER 2 -->
<div id="sem2View" class="tab-content">
  <div class="section-header">
    <h2>Semester 2 Curriculum Distribution (2026 - 2027)</h2>
    <p>19 Weeks · Fraction Operations, Decimals, Measurement, Patterns, Geometry & Angle Measurement</p>
  </div>
  <div class="grid-container" id="sem2Grid"></div>
</div>

<!-- TAB 5: ACTIVITIES LAB -->
<div id="activitiesView" class="tab-content">
  <div class="section-header">
    <h2>Standalone STEAM Production Activities & Manipulatives</h2>
    <p>Interactive student production sandboxes, AI-in-the-loop inquiry tools, and review boss battles for projector and independent practice.</p>
  </div>
  <div class="grid-container" id="activitiesGrid"></div>
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

<footer>Savvas enVision Mathematics (Grade 4) · 17 topics · 114 lessons · 19 STEAM activities · Academic Year 2026 - 2027</footer>

<script>
const DATA = ${JSON.stringify(topicData)};
const S1 = ${JSON.stringify(s1Data)};
const S2 = ${JSON.stringify(s2Data)};
const ACTS = ${JSON.stringify(ACTIVITIES)};

const KEY = "daf.map.v1";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } };
const save = (st) => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
let state = load();

function showTab(id) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  const tabIds = ["mapView", "chaptersView", "sem1View", "sem2View", "activitiesView"];
  const btns = Array.from(document.querySelectorAll(".tab-btn"));
  const idx = tabIds.indexOf(id);
  if (idx >= 0 && btns[idx]) btns[idx].classList.add("active");
}

const svg = document.getElementById("map");
const NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  (parent || svg).appendChild(e); return e;
};

function draw() {
  svg.innerHTML = "";
  el("rect", { x: 0, y: 0, width: 1440, height: 900, rx: 26, fill: "rgba(18,133,124,.06)" });
  for (let i = 0; i < 6; i++)
    el("path", { d: "M" + (30 + i * 12) + " " + (700 + i * 26) + " q 40 -14 80 0 t 80 0 t 80 0",
      fill: "none", stroke: "rgba(26,167,155,.25)", "stroke-width": 2, "stroke-linecap": "round" });
  let d = "";
  DATA.forEach((r, i) => { d += (i ? " L " : "M ") + r.x + " " + r.y; });
  el("path", { d, fill: "none", stroke: "rgba(201,162,39,.45)", "stroke-width": 3,
    "stroke-dasharray": "2 10", "stroke-linecap": "round" });

  DATA.forEach((r) => {
    const on = !!state[r.n];
    const g = el("g", { class: "node", transform: "translate(" + r.x + "," + r.y + ")" });
    g.addEventListener("click", () => openPanel(r));
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
  }
  document.getElementById("panel").classList.add("open");
}

// Render Chapters Grid
function renderChapters() {
  const container = document.getElementById("chaptersGrid");
  container.innerHTML = "";
  DATA.forEach(t => {
    const card = document.createElement("div");
    card.className = "grid-card";
    const pad = t.n < 10 ? "0" + t.n : "" + t.n;
    const folderSlug = "Chapter-" + pad + "-" + t.topic.replace(/[:,]/g, "").replace(/\\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
    
    let htmlContent = '<div class="card-badge">CHAPTER ' + t.n + '</div>';
    htmlContent += '<div class="card-title">' + t.topic + '</div>';
    htmlContent += '<div class="card-sub">' + t.lessons.length + ' Lessons &middot; ' + t.name + '</div>';
    htmlContent += '<div class="lesson-chip-list">';
    
    t.lessons.forEach(l => {
      const href = l.file ? ("html/" + l.file) : "#";
      htmlContent += '<a class="lesson-chip" href="' + href + '">';
      htmlContent += '<span class="chip-code">' + l.code + '</span>';
      htmlContent += '<span class="chip-title">' + l.title + '</span>';
      htmlContent += '</a>';
    });
    
    if (t.boss && t.boss.file) {
      htmlContent += '<a class="lesson-chip" href="html/' + t.boss.file + '" style="border-color:rgba(201,162,39,.6);background:rgba(201,162,39,.1);">';
      htmlContent += '<span class="chip-code" style="color:var(--gold)">BOSS</span>';
      htmlContent += '<span class="chip-title">' + t.boss.name + '</span>';
      htmlContent += '</a>';
    }
    
    htmlContent += '</div>';
    htmlContent += '<a class="folder-link-btn" href="chapters/' + folderSlug + '">&#128193; Open Chapter Folder</a>';
    card.innerHTML = htmlContent;
    container.appendChild(card);
  });
}

// Render Semesters Grid
function renderSemester(semData, containerId, semFolder) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  semData.forEach(w => {
    const card = document.createElement("div");
    card.className = "grid-card";
    const pad = w.week < 10 ? "0" + w.week : "" + w.week;
    
    let htmlContent = '<div class="card-badge">WEEK ' + w.week + '</div>';
    htmlContent += '<div class="card-title">' + w.title + '</div>';
    
    if (w.notes) {
      htmlContent += '<div class="card-sub" style="color:var(--gold)">' + w.notes + '</div>';
    } else {
      htmlContent += '<div class="card-sub">' + w.lessonDetails.length + ' Scheduled Lessons</div>';
    }
    
    htmlContent += '<div class="lesson-chip-list">';
    if (w.lessonDetails && w.lessonDetails.length > 0) {
      w.lessonDetails.forEach(l => {
        const href = l.file ? ("html/" + l.file) : "#";
        htmlContent += '<a class="lesson-chip" href="' + href + '">';
        htmlContent += '<span class="chip-code">' + l.code + '</span>';
        htmlContent += '<span class="chip-title">' + l.title + '</span>';
        htmlContent += '</a>';
      });
    } else {
      htmlContent += '<div style="font-size:12px;color:#9fc4bd;padding:8px 0;font-style:italic;">' + (w.notes || "Classroom activities & review") + '</div>';
    }

    if (w.activityFile) {
      htmlContent += '<a class="lesson-chip" href="html/activities/' + w.activityFile + '" style="border-color:rgba(26,167,155,.6);background:rgba(26,167,155,.12);">';
      htmlContent += '<span class="chip-code" style="color:var(--teal2)">&#127912;</span>';
      htmlContent += '<span class="chip-title">Launch Weekly Activity</span>';
      htmlContent += '</a>';
    }
    
    htmlContent += '</div>';
    card.innerHTML = htmlContent;
    container.appendChild(card);
  });
}

// Render Activities Grid
function renderActivities() {
  const container = document.getElementById("activitiesGrid");
  container.innerHTML = "";
  ACTS.forEach(act => {
    const card = document.createElement("div");
    card.className = "grid-card";
    
    let htmlContent = '<div class="card-badge">' + act.badge + '</div>';
    htmlContent += '<div class="card-title">' + act.title + '</div>';
    htmlContent += '<div class="card-sub">' + act.description + '</div>';
    htmlContent += '<div style="flex:1"></div>';
    htmlContent += '<a class="folder-link-btn" href="html/activities/' + act.fileName + '" style="background:var(--teal);color:#fff;border-color:var(--teal2);justify-content:center;">&#9654; Launch Activity Sandbox</a>';
    
    card.innerHTML = htmlContent;
    container.appendChild(card);
  });
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
renderChapters();
renderSemester(S1, "sem1Grid", "Semester-1");
renderSemester(S2, "sem2Grid", "Semester-2");
renderActivities();
</script>
</body>
</html>
`;

fs.writeFileSync("index.html", html);
const built = topicData.reduce((a, t) => a + t.lessons.filter((l) => l.file).length, 0);
console.log("index.html — map & curriculum hub with activities tab · " + built + " lesson links · " +
  ACTIVITIES.length + " interactive activities");
