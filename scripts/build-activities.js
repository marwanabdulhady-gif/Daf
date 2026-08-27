/**
 * scripts/build-activities.js
 * 
 * Generates standalone, interactive HTML math activity decks and manipulatives
 * into html/activities/ with clean naming and rich canvas interactivity.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "html", "activities");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function makeActivityHtml(config) {
  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Dar Al Fikr · Grade 4 Math Activity — ${config.title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Lemonada:wght@400;600&display=swap" rel="stylesheet">
  <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --bg: #0B1F24; --panel: #102D35; --panel2: #163A44; --line: rgba(255,255,255,.12);
      --teal: #12857C; --teal2: #1AA79B; --gold: #C9A227; --gold2: #E5BE3E;
      --ink: #10242B; --mint: #E8F6F4; --text: #EAF4F2; --sub: #9fc4bd;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
      background: radial-gradient(1200px 700px at 75% -10%, #14343C 0%, var(--bg) 62%);
      color: var(--text); min-height: 100vh; display: flex; flex-direction: column;
    }
    header {
      padding: 16px 28px; border-bottom: 1px solid var(--line);
      display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;
      background: rgba(11,31,36,.6); backdrop-filter: blur(8px);
    }
    .brand { display: flex; align-items: center; gap: 12px; }
    .brand svg { width: 34px; height: 34px; color: var(--gold); }
    .brand-title { font-weight: 800; font-size: 14px; letter-spacing: .02em; }
    .brand-sub { font-size: 9.5px; letter-spacing: .18em; color: var(--sub); text-transform: uppercase; }
    .act-badge {
      display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px;
      background: rgba(201,162,39,.15); border: 1px solid var(--gold); border-radius: 20px;
      color: var(--gold); font-size: 11.5px; font-weight: 800; font-family: 'Cabinet Grotesk', sans-serif;
    }
    main {
      flex: 1; max-width: 1280px; width: 100%; margin: 0 auto; padding: 24px 28px;
      display: grid; grid-template-columns: 1.1fr .9fr; gap: 24px;
    }
    @media (max-width: 900px) { main { grid-template-columns: 1fr; } }
    
    .card {
      background: var(--panel); border: 1px solid var(--line); border-radius: 16px;
      padding: 22px; box-shadow: 0 10px 30px rgba(0,0,0,.35); display: flex; flex-direction: column; gap: 16px;
    }
    .card-title {
      font-size: 20px; font-weight: 900; color: #fff; font-family: 'Cabinet Grotesk', sans-serif;
      display: flex; align-items: center; gap: 10px;
    }
    .card-sub { font-size: 13px; color: var(--sub); line-height: 1.5; }
    
    /* Interactive Workspace */
    .canvas-wrap {
      background: #08161A; border: 1.5px solid rgba(26,167,155,.3); border-radius: 12px;
      position: relative; overflow: hidden; min-height: 320px; display: flex; align-items: center; justify-content: center;
    }
    canvas { display: block; max-width: 100%; height: auto; }
    
    .controls-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;
    }
    .ctrl-box {
      background: rgba(255,255,255,.04); border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px;
    }
    .ctrl-label { font-size: 11px; font-weight: 700; color: var(--sub); margin-bottom: 6px; display: block; }
    .ctrl-input {
      width: 100%; background: #08161A; border: 1px solid rgba(255,255,255,.2); color: #fff;
      padding: 6px 10px; border-radius: 6px; font: 700 13px inherit; outline: none;
    }
    .ctrl-input:focus { border-color: var(--teal2); box-shadow: 0 0 8px rgba(26,167,155,.4); }
    
    .btn {
      background: var(--teal); border: 1.5px solid var(--teal2); color: #fff; border-radius: 10px;
      padding: 9px 16px; font: 800 13px inherit; cursor: pointer; transition: all .18s; display: inline-flex;
      align-items: center; justify-content: center; gap: 8px;
    }
    .btn:hover { background: var(--teal2); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(26,167,155,.4); }
    .btn.gold { background: var(--gold); border-color: var(--gold2); color: var(--ink); }
    .btn.gold:hover { background: var(--gold2); box-shadow: 0 4px 14px rgba(201,162,39,.4); }
    
    /* STEM Steps */
    .stem-timeline { display: flex; flex-direction: column; gap: 12px; }
    .stem-step {
      background: rgba(255,255,255,.03); border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px;
      display: flex; gap: 12px; align-items: flex-start;
    }
    .step-num {
      width: 26px; height: 26px; border-radius: 50%; background: var(--teal); color: #fff;
      font: 900 12px 'Cabinet Grotesk', sans-serif; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .step-content b { display: block; font-size: 13px; color: var(--gold); margin-bottom: 2px; }
    .step-content p { font-size: 12px; color: var(--sub); line-height: 1.4; }
    
    .ai-box {
      background: rgba(201,162,39,.08); border: 1.5px dashed rgba(201,162,39,.5); border-radius: 12px; padding: 14px 16px;
    }
    .ai-title { font-size: 12.5px; font-weight: 800; color: var(--gold); display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .ai-desc { font-size: 11.5px; color: #e1d6a6; line-height: 1.45; }
    
    footer {
      padding: 16px 28px; font-size: 11px; color: var(--sub); border-top: 1px solid var(--line);
      text-align: center; background: rgba(11,31,36,.6);
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <svg viewBox="0 0 40 40" fill="currentColor">
        <path d="M20 0l4.2 10.1L34.1 5.9 29.9 16 40 20l-10.1 4.2 4.2 9.9L24 29.9 20 40l-4.2-10.1L5.9 34.1 10.1 24 0 20l10.1-4.2L5.9 5.9 16 10.1z"/>
      </svg>
      <div>
        <div class="brand-title">Dar Al Fikr Schools · Math Department</div>
        <div class="brand-sub">Savvas enVision Mathematics · Grade 4 (2026 - 2027)</div>
      </div>
    </div>
    <div class="act-badge">
      <i class="fa-solid fa-flask"></i> ${config.badge}
    </div>
  </header>

  <main>
    <!-- Left Column: Interactive Tool / Sandbox -->
    <section class="card">
      <div class="card-title">
        <i class="fa-solid fa-shapes" style="color:var(--teal2)"></i>
        ${config.title}
      </div>
      <div class="card-sub">${config.description}</div>
      
      <div class="canvas-wrap">
        <canvas id="actCanvas" width="580" height="340"></canvas>
      </div>

      <div class="controls-grid">
        ${config.controlsHtml}
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn" id="resetBtn" onclick="resetCanvas()"><i class="fa-solid fa-rotate-left"></i> Reset</button>
        <button class="btn gold" id="actionBtn" onclick="runAction()"><i class="fa-solid fa-play"></i> ${config.actionBtnText || 'Run Simulation'}</button>
      </div>
    </section>

    <!-- Right Column: STEM Inquiry & Production Steps -->
    <section class="card">
      <div class="card-title">
        <i class="fa-solid fa-compass-drafting" style="color:var(--gold)"></i>
        STEAM Inquiry Build
      </div>
      
      <div class="stem-timeline">
        <div class="stem-step">
          <div class="step-num">1</div>
          <div class="step-content">
            <b>ASK & DEFINE</b>
            <p>${config.stemAsk}</p>
          </div>
        </div>
        <div class="stem-step">
          <div class="step-num">2</div>
          <div class="step-content">
            <b>PLAN & MODEL</b>
            <p>${config.stemPlan}</p>
          </div>
        </div>
        <div class="stem-step">
          <div class="step-num">3</div>
          <div class="step-content">
            <b>BUILD & TEST</b>
            <p>${config.stemBuild}</p>
          </div>
        </div>
        <div class="stem-step">
          <div class="step-num">4</div>
          <div class="step-content">
            <b>SHARE & DEFEND</b>
            <p>${config.stemShare}</p>
          </div>
        </div>
      </div>

      <div class="ai-box">
        <div class="ai-title">
          <i class="fa-solid fa-robot"></i> AI in the Loop (Critic / Audit Challenge)
        </div>
        <div class="ai-desc">
          ${config.aiChallenge}
        </div>
      </div>
    </section>
  </main>

  <footer>
    Savvas enVision Mathematics · Grade 4 · Academic Year 2026 - 2027 · Dar Al Fikr Interactive Lessons
  </footer>

  <script>
    const canvas = document.getElementById("actCanvas");
    const ctx = canvas.getContext("2d");

    ${config.canvasScript}
  </script>
</body>
</html>`;
}

// 19 Complete Activity Configurations
const ACTIVITIES = [
  {
    fileName: "activity-week01-diagnostic-readiness-map.html",
    title: "Diagnostic Math Readiness Gap Map",
    badge: "Week 01 · Diagnostic Lab",
    description: "Map class readiness claims, vote on foundational prerequisites, and identify whole-class gap priorities before starting Chapter 1.",
    chapterNum: null,
    semesters: [{ sem: 1, week: 1 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Focus Concept</label>
        <select class="ctrl-input" id="gapSelect" onchange="drawMap()">
          <option value="placeValue">Place Value (Gr 3 -> 4)</option>
          <option value="operations">Addition & Subtraction</option>
          <option value="multFacts">Multiplication Facts</option>
        </select>
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Confidence Level</label>
        <input type="range" class="ctrl-input" id="confSlider" min="0" max="100" value="70" oninput="drawMap()">
      </div>
    `,
    actionBtnText: "Update Map",
    stemAsk: "What foundational place-value and operation skills does our class need to reinforce?",
    stemPlan: "Vote on four diagnostic readiness statements to establish a real-time classroom gap map.",
    stemBuild: "Use the interactive map to identify which skill lanes require immediate review before Topic 1.",
    stemShare: "Present the whole-class gap map on the board and agree on this week's mastery goals.",
    aiChallenge: "Ask the AI to generate three diagnostic counter-examples where students commonly confuse digit value with place value.",
    canvasScript: `
      function drawMap() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        const conf = parseInt(document.getElementById("confSlider").value, 10);
        const gap = document.getElementById("gapSelect").value;
        
        ctx.fillStyle = "#C9A227";
        ctx.font = "bold 18px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("DIAGNOSTIC GAP MAP — GRADE 4 READINESS", 30, 45);
        
        const labels = ["Place Value Patterns", "Mental Addition", "Subtraction Regrouping", "Array Models"];
        labels.forEach((lbl, i) => {
          const y = 85 + i * 55;
          ctx.fillStyle = "#EAF4F2";
          ctx.font = "600 13px 'Satoshi', sans-serif";
          ctx.fillText(lbl, 30, y + 16);
          
          ctx.fillStyle = "rgba(255,255,255,.1)";
          ctx.beginPath();
          ctx.roundRect(220, y, 300, 24, 6);
          ctx.fill();
          
          const val = Math.min(300, (conf * (0.8 + i * 0.1) / 100) * 300);
          ctx.fillStyle = val > 200 ? "#1AA79B" : (val > 120 ? "#C9A227" : "#E25555");
          ctx.beginPath();
          ctx.roundRect(220, y, val, 24, 6);
          ctx.fill();
          
          ctx.fillStyle = "#fff";
          ctx.font = "bold 11px monospace";
          ctx.fillText(Math.round(val/3) + "%", 530, y + 16);
        });
      }
      function resetCanvas() { document.getElementById("confSlider").value = 70; drawMap(); }
      function runAction() { drawMap(); }
      drawMap();
    `
  },
  {
    fileName: "activity-ch01-place-value-census-chart.html",
    title: "Place-Value Harbor: Interactive Census Chart",
    badge: "Chapter 01 · Place Value Lab",
    description: "Explore numbers up to 1,000,000 across periods (Millions, Thousands, Ones) and model the 10x value shift.",
    chapterNum: 1,
    semesters: [{ sem: 1, week: 2 }, { sem: 1, week: 3 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Enter Number (&le; 1,000,000)</label>
        <input type="number" class="ctrl-input" id="pvNum" value="482350" min="0" max="1000000" oninput="drawPV()">
      </div>
    `,
    actionBtnText: "Show Expanded Form",
    stemAsk: "How does the position of each digit in a 6-digit census number determine its total worth?",
    stemPlan: "Deconstruct a civic population number into standard, expanded, and period forms.",
    stemBuild: "Construct an annotated place-value chart showing the 10x value growth across adjacent columns.",
    stemShare: "Read your multi-digit figure aloud period-by-period and defend each zero's role as a place holder.",
    aiChallenge: "Ask AI to generate a population figure with identical digits in two places (e.g. 70,700) and explain how many times greater the first digit is than the second.",
    canvasScript: `
      function drawPV() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const raw = parseInt(document.getElementById("pvNum").value, 10) || 0;
        const s = raw.toString().padStart(7, "0");
        const cols = ["Millions", "H-Thousands", "T-Thousands", "Thousands", "Hundreds", "Tens", "Ones"];
        
        ctx.fillStyle = "#C9A227";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("PLACE-VALUE HARBOR · PERIOD EXPLORER", 30, 40);
        
        const w = 70;
        cols.forEach((col, i) => {
          const x = 35 + i * 73;
          ctx.fillStyle = (i === 0) ? "rgba(96,66,166,.25)" : ((i < 4) ? "rgba(18,133,124,.25)" : "rgba(201,162,39,.18)");
          ctx.strokeStyle = "rgba(255,255,255,.2)";
          ctx.beginPath();
          ctx.roundRect(x, 65, w, 150, 8);
          ctx.fill(); ctx.stroke();
          
          ctx.fillStyle = "#9fc4bd";
          ctx.font = "bold 9.5px 'Satoshi', sans-serif";
          ctx.fillText(col.slice(0,6), x + 6, 85);
          
          ctx.fillStyle = "#fff";
          ctx.font = "900 32px monospace";
          ctx.fillText(s[i], x + 24, 155);
        });
        
        ctx.fillStyle = "#EAF4F2";
        ctx.font = "600 13px 'Satoshi', sans-serif";
        ctx.fillText("Standard Form: " + raw.toLocaleString(), 35, 255);
        
        ctx.fillStyle = "#1AA79B";
        ctx.font = "bold 12px monospace";
        let exp = [];
        const mults = [1000000, 100000, 10000, 1000, 100, 10, 1];
        mults.forEach((m, idx) => {
          const d = parseInt(s[idx], 10);
          if (d > 0) exp.push((d * m).toLocaleString());
        });
        ctx.fillText("Expanded: " + (exp.join(" + ") || "0"), 35, 285);
      }
      function resetCanvas() { document.getElementById("pvNum").value = 482350; drawPV(); }
      function runAction() { drawPV(); }
      drawPV();
    `
  },
  {
    fileName: "activity-ch02-souq-of-sums-mental-math.html",
    title: "The Souq of Sums: Mental Math & Regrouping Simulator",
    badge: "Chapter 02 · Addition & Subtraction",
    description: "Simulate multi-digit addition with regrouping and subtraction across zeros using interactive ledger strips.",
    chapterNum: 2,
    semesters: [{ sem: 1, week: 4 }, { sem: 1, week: 5 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">First Number</label>
        <input type="number" class="ctrl-input" id="numA" value="5004" oninput="drawSouq()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Second Number</label>
        <input type="number" class="ctrl-input" id="numB" value="2378" oninput="drawSouq()">
      </div>
    `,
    actionBtnText: "Compute Difference",
    stemAsk: "How does regrouping work step-by-step when subtracting across consecutive zeros?",
    stemPlan: "Model multi-digit transactions using place-value borrowing and mental compensation strategies.",
    stemBuild: "Simulate trade ledger balances and verify each regrouping step visually.",
    stemShare: "Defend your mental subtraction strategy (compensation vs standard algorithm) to a peer.",
    aiChallenge: "Ask AI to critique why students often make the error of writing 5004 - 2378 = 3374 instead of 2626.",
    canvasScript: `
      function drawSouq() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const a = parseInt(document.getElementById("numA").value, 10) || 0;
        const b = parseInt(document.getElementById("numB").value, 10) || 0;
        
        ctx.fillStyle = "#C9A227";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("SOUQ OF SUMS · REGULATION LEDGER", 30, 40);
        
        ctx.fillStyle = "#EAF4F2";
        ctx.font = "bold 24px monospace";
        ctx.fillText("   " + a.toLocaleString().padStart(8, " "), 140, 100);
        ctx.fillText(" - " + b.toLocaleString().padStart(8, " "), 140, 140);
        
        ctx.strokeStyle = "#1AA79B";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(140, 160);
        ctx.lineTo(340, 160);
        ctx.stroke();
        
        const diff = a - b;
        ctx.fillStyle = "#C9A227";
        ctx.fillText(" = " + diff.toLocaleString().padStart(8, " "), 140, 200);
        
        ctx.fillStyle = "#9fc4bd";
        ctx.font = "600 13px 'Satoshi', sans-serif";
        ctx.fillText("Estimated Difference (Nearest 1000): " + (Math.round(a/1000)*1000 - Math.round(b/1000)*1000).toLocaleString(), 30, 260);
        ctx.fillText("Mental Compensation: (" + a + " - 4) - (" + b + " - 4) = " + (a-4) + " - " + (b-4), 30, 290);
      }
      function resetCanvas() { document.getElementById("numA").value = 5004; document.getElementById("numB").value = 2378; drawSouq(); }
      function runAction() { drawSouq(); }
      drawSouq();
    `
  },
  {
    fileName: "activity-ch03-area-model-multiplication-lab.html",
    title: "Product Palm Grove: 1-Digit Area Model Lab",
    badge: "Chapter 03 · 1-Digit Multiplication",
    description: "Deconstruct 1-digit by 3-digit products into visual partial-product rectangles in the palm grove.",
    chapterNum: 3,
    semesters: [{ sem: 1, week: 6 }, { sem: 1, week: 7 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">1-Digit Multiplier</label>
        <input type="number" class="ctrl-input" id="m1" value="6" min="2" max="9" oninput="drawGrove()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Multi-Digit Factor</label>
        <input type="number" class="ctrl-input" id="m2" value="345" min="10" max="999" oninput="drawGrove()">
      </div>
    `,
    actionBtnText: "Compute Area",
    stemAsk: "How do partial products combine to give the total area of a multi-section palm grove?",
    stemPlan: "Break the multi-digit factor into hundreds, tens, and ones, then multiply each region.",
    stemBuild: "Draw the scaled rectangular area model and label each partition with its partial product.",
    stemShare: "Present your decomposed model and verify the sum matches the standard multiplication algorithm.",
    aiChallenge: "Ask AI to verify if breaking 6 x 345 into (6 x 300) + (6 x 40) + (6 x 5) uses the distributive property correctly.",
    canvasScript: `
      function drawGrove() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const m1 = parseInt(document.getElementById("m1").value, 10) || 1;
        const m2 = parseInt(document.getElementById("m2").value, 10) || 100;
        
        const h = Math.floor(m2 / 100) * 100;
        const t = Math.floor((m2 % 100) / 10) * 10;
        const o = m2 % 10;
        
        ctx.fillStyle = "#FA7E19";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("PRODUCT PALM GROVE · AREA MODEL (" + m1 + " × " + m2 + ")", 30, 40);
        
        const startX = 60, y = 80, boxH = 100;
        const p1 = m1 * h, p2 = m1 * t, p3 = m1 * o;
        const total = p1 + p2 + p3;
        
        // 3 Partition Boxes
        const widths = [220, 140, 80];
        const vals = [h, t, o];
        const parts = [p1, p2, p3];
        const cols = ["rgba(250,126,25,.35)", "rgba(26,167,155,.35)", "rgba(201,162,39,.35)"];
        
        let curX = startX;
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px monospace";
        ctx.fillText(m1, startX - 25, y + 55);
        
        widths.forEach((w, i) => {
          ctx.fillStyle = cols[i];
          ctx.strokeStyle = "#FA7E19";
          ctx.lineWidth = 1.5;
          ctx.fillRect(curX, y, w, boxH);
          ctx.strokeRect(curX, y, w, boxH);
          
          ctx.fillStyle = "#EAF4F2";
          ctx.font = "bold 13px monospace";
          ctx.fillText(vals[i], curX + w/2 - 12, y - 10);
          
          ctx.fillStyle = "#fff";
          ctx.font = "bold 14px monospace";
          ctx.fillText(m1 + "×" + vals[i], curX + w/2 - 25, y + 45);
          ctx.fillText("=" + parts[i].toLocaleString(), curX + w/2 - 25, y + 70);
          
          curX += w;
        });
        
        ctx.fillStyle = "#FA7E19";
        ctx.font = "bold 15px 'Satoshi', sans-serif";
        ctx.fillText("Total Product: " + p1 + " + " + p2 + " + " + p3 + " = " + total.toLocaleString(), 30, 240);
      }
      function resetCanvas() { document.getElementById("m1").value = 6; document.getElementById("m2").value = 345; drawGrove(); }
      function runAction() { drawGrove(); }
      drawGrove();
    `
  },
  {
    fileName: "activity-ch04-tower-of-times-partial-products.html",
    title: "The Tower of Times: 2-Digit Area Model Builder",
    badge: "Chapter 04 · 2-Digit Multiplication",
    description: "Construct 4-box area models to calculate 2-digit by 2-digit products floor-by-floor.",
    chapterNum: 4,
    semesters: [{ sem: 1, week: 8 }, { sem: 1, week: 9 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Top Factor (e.g. 42)</label>
        <input type="number" class="ctrl-input" id="tA" value="42" min="10" max="99" oninput="drawTower()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Side Factor (e.g. 35)</label>
        <input type="number" class="ctrl-input" id="tB" value="35" min="10" max="99" oninput="drawTower()">
      </div>
    `,
    actionBtnText: "Calculate Floors",
    stemAsk: "How do 4 rectangular sub-areas combine when multiplying two 2-digit factors?",
    stemPlan: "Decompose both factors into tens and ones, setting up a 2x2 partial product grid.",
    stemBuild: "Calculate each floor's partial product (tens×tens, tens×ones, ones×tens, ones×ones) and sum them.",
    stemShare: "Present your Tower calculation and explain how rounding helps verify if the product is reasonable.",
    aiChallenge: "Ask AI to generate a common estimation trap where rounding 42x35 gives 40x40=1600 instead of 40x35=1400.",
    canvasScript: `
      function drawTower() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const a = parseInt(document.getElementById("tA").value, 10) || 40;
        const b = parseInt(document.getElementById("tB").value, 10) || 30;
        
        const a10 = Math.floor(a/10)*10, a1 = a%10;
        const b10 = Math.floor(b/10)*10, b1 = b%10;
        
        ctx.fillStyle = "#FA7E19";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("TOWER OF TIMES · 2×2 PARTIAL PRODUCTS (" + a + " × " + b + ")", 30, 35);
        
        const p1 = a10 * b10, p2 = a1 * b10, p3 = a10 * b1, p4 = a1 * b1;
        const total = p1 + p2 + p3 + p4;
        
        // Grid 2x2
        const ox = 100, oy = 70, w1 = 180, w2 = 90, h1 = 75, h2 = 55;
        
        // Labels
        ctx.fillStyle = "#fff"; ctx.font = "bold 14px monospace";
        ctx.fillText(a10, ox + w1/2 - 10, oy - 8);
        ctx.fillText(a1, ox + w1 + w2/2 - 5, oy - 8);
        ctx.fillText(b10, ox - 35, oy + h1/2 + 5);
        ctx.fillText(b1, ox - 30, oy + h1 + h2/2 + 5);
        
        const cells = [
          {x: ox, y: oy, w: w1, h: h1, val: p1, text: a10 + "×" + b10, col: "rgba(250,126,25,.3)"},
          {x: ox + w1, y: oy, w: w2, h: h1, val: p2, text: a1 + "×" + b10, col: "rgba(26,167,155,.3)"},
          {x: ox, y: oy + h1, w: w1, h: h2, val: p3, text: a10 + "×" + b1, col: "rgba(201,162,39,.3)"},
          {x: ox + w1, y: oy + h1, w: w2, h: h2, val: p4, text: a1 + "×" + b1, col: "rgba(96,66,166,.3)"}
        ];
        
        cells.forEach(c => {
          ctx.fillStyle = c.col; ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5;
          ctx.fillRect(c.x, c.y, c.w, c.h); ctx.strokeRect(c.x, c.y, c.w, c.h);
          ctx.fillStyle = "#fff"; ctx.font = "bold 12px monospace";
          ctx.fillText(c.text, c.x + 10, c.y + c.h/2 - 5);
          ctx.fillStyle = "#C9A227";
          ctx.fillText("=" + c.val.toLocaleString(), c.x + 10, c.y + c.h/2 + 15);
        });
        
        ctx.fillStyle = "#FA7E19"; ctx.font = "bold 15px 'Satoshi', sans-serif";
        ctx.fillText("Total Product: " + p1 + " + " + p2 + " + " + p3 + " + " + p4 + " = " + total.toLocaleString(), 30, 240);
      }
      function resetCanvas() { document.getElementById("tA").value = 42; document.getElementById("tB").value = 35; drawTower(); }
      function runAction() { drawTower(); }
      drawTower();
    `
  },
  {
    fileName: "activity-ch05-division-dunes-quotient-lab.html",
    title: "Division Dunes: Partial Quotients Sandbox",
    badge: "Chapter 05 · Division Strategies",
    description: "Explore sharing caravan cargo into equal loads and calculating partial quotients with remainders.",
    chapterNum: 5,
    semesters: [{ sem: 1, week: 9 }, { sem: 1, week: 10 }, { sem: 1, week: 11 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Dividend (Total Cargo)</label>
        <input type="number" class="ctrl-input" id="divD" value="475" min="10" max="999" oninput="drawDunes()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Divisor (Camels)</label>
        <input type="number" class="ctrl-input" id="divV" value="4" min="2" max="9" oninput="drawDunes()">
      </div>
    `,
    actionBtnText: "Divide Cargo",
    stemAsk: "How can large caravan supplies be distributed equally using partial quotient chunks?",
    stemPlan: "Identify easy multiple chunks (e.g. 100x, 10x) to subtract from the total dividend.",
    stemBuild: "Track each partial quotient on the division dunes board until the remainder is smaller than the divisor.",
    stemShare: "Explain what happens to the remainder in real-life contexts (drop it, round up, or split it).",
    aiChallenge: "Ask AI to generate three real-life word problems where the remainder is handled differently (one where you add 1 camel, one where you drop it).",
    canvasScript: `
      function drawDunes() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const D = parseInt(document.getElementById("divD").value, 10) || 100;
        const V = parseInt(document.getElementById("divV").value, 10) || 2;
        
        const q = Math.floor(D / V);
        const r = D % V;
        
        ctx.fillStyle = "#FA7E19";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("DIVISION DUNES · PARTIAL QUOTIENTS (" + D + " ÷ " + V + ")", 30, 35);
        
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px monospace";
        ctx.fillText(V + " ) " + D, 80, 80);
        
        let rem = D;
        let stepY = 110;
        let pQs = [];
        
        // Compute chunks
        if (rem >= V * 100) { const c = Math.floor(rem / (V * 100)) * 100; pQs.push(c); rem -= c * V; }
        if (rem >= V * 10) { const c = Math.floor(rem / (V * 10)) * 10; pQs.push(c); rem -= c * V; }
        if (rem >= V) { const c = Math.floor(rem / V); pQs.push(c); rem -= c * V; }
        
        ctx.font = "14px monospace";
        pQs.forEach(pq => {
          ctx.fillStyle = "#9fc4bd";
          ctx.fillText("- " + (pq * V) + "  (" + pq + " × " + V + ")", 95, stepY);
          stepY += 25;
        });
        
        ctx.strokeStyle = "#1AA79B"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(80, stepY - 10); ctx.lineTo(240, stepY - 10); ctx.stroke();
        
        ctx.fillStyle = "#E25555";
        ctx.fillText("Remainder: " + r, 95, stepY + 15);
        
        ctx.fillStyle = "#C9A227";
        ctx.font = "bold 16px 'Satoshi', sans-serif";
        ctx.fillText("Quotient: " + q + " R " + r + "  (Each camel gets " + q + " units)", 30, 270);
      }
      function resetCanvas() { document.getElementById("divD").value = 475; document.getElementById("divV").value = 4; drawDunes(); }
      function runAction() { drawDunes(); }
      drawDunes();
    `
  },
  {
    fileName: "activity-ch06-caravan-multi-step-problem-lab.html",
    title: "Caravan Crossroads: Multi-Step Strip Model Lab",
    badge: "Chapter 06 · Multi-Step Problem Solving",
    description: "Construct multi-part strip diagrams to break complex, multi-operation word problems into manageable steps.",
    chapterNum: 6,
    semesters: [{ sem: 1, week: 11 }, { sem: 1, week: 12 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Caravan A Sacks</label>
        <input type="number" class="ctrl-input" id="sA" value="120" oninput="drawCrossroads()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Multiplier (Caravan B = N × A)</label>
        <input type="number" class="ctrl-input" id="sM" value="3" min="2" max="6" oninput="drawCrossroads()">
      </div>
    `,
    actionBtnText: "Model Total",
    stemAsk: "How do comparison bars help us identify whether to multiply, add, or subtract first in multi-step scenarios?",
    stemPlan: "Draw strip diagrams comparing Caravan A and Caravan B before calculating the combined total.",
    stemBuild: "Calculate the hidden sub-step (Caravan B amount) before answering the main question (Total sacks).",
    stemShare: "Explain your multi-step equation: Total = A + (N × A) to a partner.",
    aiChallenge: "Ask AI to critique a student solution that adds 120 + 3 instead of multiplying 120 x 3.",
    canvasScript: `
      function drawCrossroads() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const a = parseInt(document.getElementById("sA").value, 10) || 50;
        const m = parseInt(document.getElementById("sM").value, 10) || 2;
        const b = a * m;
        const total = a + b;
        
        ctx.fillStyle = "#FA7E19";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("CARAVAN CROSSROADS · COMPARISON STRIP MODEL", 30, 35);
        
        // Strip A
        ctx.fillStyle = "#9fc4bd"; ctx.font = "bold 13px 'Satoshi', sans-serif";
        ctx.fillText("Caravan A: " + a + " sacks", 30, 80);
        ctx.fillStyle = "#1AA79B";
        ctx.fillRect(30, 90, 80, 30);
        ctx.fillStyle = "#fff"; ctx.font = "bold 12px monospace"; ctx.fillText(a, 60, 110);
        
        // Strip B
        ctx.fillStyle = "#9fc4bd"; ctx.font = "bold 13px 'Satoshi', sans-serif";
        ctx.fillText("Caravan B (" + m + " times as many): " + b + " sacks", 30, 150);
        for(let i=0; i<m; i++) {
          ctx.fillStyle = "#C9A227";
          ctx.fillRect(30 + i * 85, 160, 80, 30);
          ctx.fillStyle = "#10242B"; ctx.font = "bold 12px monospace"; ctx.fillText(a, 60 + i * 85, 180);
        }
        
        // Total Bracket
        ctx.fillStyle = "#FA7E19"; ctx.font = "bold 15px 'Satoshi', sans-serif";
        ctx.fillText("Step 1 (Find Caravan B): " + a + " × " + m + " = " + b + " sacks", 30, 240);
        ctx.fillText("Step 2 (Combine All): " + a + " + " + b + " = " + total + " total sacks", 30, 270);
      }
      function resetCanvas() { document.getElementById("sA").value = 120; document.getElementById("sM").value = 3; drawCrossroads(); }
      function runAction() { drawCrossroads(); }
      drawCrossroads();
    `
  },
  {
    fileName: "activity-ch07-factor-reef-pairs-explorer.html",
    title: "Factor Reef: Factor Rainbow & Primes Explorer",
    badge: "Chapter 07 · Factors & Multiples",
    description: "Discover all factor pairs of a target number, construct factor rainbows, and classify as prime or composite.",
    chapterNum: 7,
    semesters: [{ sem: 1, week: 13 }, { sem: 1, week: 14 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Target Number (1 - 100)</label>
        <input type="number" class="ctrl-input" id="fNum" value="36" min="1" max="100" oninput="drawReef()">
      </div>
    `,
    actionBtnText: "Find Factor Pairs",
    stemAsk: "How do factor pairs reveal whether a reef number is prime or composite?",
    stemPlan: "Test divisibility from 1 up to the square root of the number to identify all pair bonds.",
    stemBuild: "Construct a visual factor rainbow connecting each complementary factor pair.",
    stemShare: "Present your factor rainbow and explain why 1 is neither prime nor composite.",
    aiChallenge: "Ask AI to generate a list of all prime numbers under 50 and verify how many have exactly 2 factors.",
    canvasScript: `
      function drawReef() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const n = parseInt(document.getElementById("fNum").value, 10) || 12;
        let factors = [];
        for(let i=1; i<=n; i++) { if(n % i === 0) factors.push(i); }
        
        const isPrime = factors.length === 2;
        
        ctx.fillStyle = "#FA7E19";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("FACTOR REEF · FACTOR RAINBOW FOR " + n, 30, 35);
        
        // Factor chips
        const startX = 40, spacing = Math.min(50, 480 / factors.length);
        factors.forEach((f, idx) => {
          const x = startX + idx * spacing;
          ctx.fillStyle = "#1AA79B";
          ctx.beginPath(); ctx.arc(x, 180, 16, 0, Math.PI*2); ctx.fill();
          ctx.fillStyle = "#fff"; ctx.font = "bold 12px monospace";
          ctx.fillText(f, f < 10 ? x - 4 : x - 8, 184);
        });
        
        // Rainbow arcs
        for(let i=0; i<Math.floor(factors.length/2); i++) {
          const x1 = startX + i * spacing;
          const x2 = startX + (factors.length - 1 - i) * spacing;
          const mx = (x1 + x2) / 2;
          const r = (x2 - x1) / 2;
          
          ctx.strokeStyle = "rgba(201,162,39," + (0.9 - i*0.15) + ")";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(mx, 180, r, Math.PI, 0, false);
          ctx.stroke();
        }
        
        ctx.fillStyle = isPrime ? "#1AA79B" : "#C9A227";
        ctx.font = "bold 15px 'Satoshi', sans-serif";
        ctx.fillText("Classification: " + (isPrime ? "PRIME (Only 2 factors: 1 and " + n + ")" : "COMPOSITE (" + factors.length + " factors)"), 30, 240);
        
        ctx.fillStyle = "#9fc4bd"; ctx.font = "13px monospace";
        let pairs = [];
        for(let i=0; i<Math.ceil(factors.length/2); i++) {
          pairs.push(factors[i] + " × " + factors[factors.length - 1 - i]);
        }
        ctx.fillText("Pairs: " + pairs.join("  ·  "), 30, 275);
      }
      function resetCanvas() { document.getElementById("fNum").value = 36; drawReef(); }
      function runAction() { drawReef(); }
      drawReef();
    `
  },
  {
    fileName: "activity-ch08-fraction-isles-equivalence-strips.html",
    title: "The Fraction Isles: Equivalent Fraction Strips",
    badge: "Chapter 08 · Fraction Equivalence",
    description: "Align fraction strips and number lines to visually prove equivalence between halves, fourths, sixths, and eighths.",
    chapterNum: 8,
    semesters: [{ sem: 1, week: 15 }, { sem: 1, week: 16 }, { sem: 2, week: 1 }, { sem: 2, week: 2 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Numerator</label>
        <input type="number" class="ctrl-input" id="frN" value="2" min="1" max="8" oninput="drawIsles()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Denominator</label>
        <input type="number" class="ctrl-input" id="frD" value="3" min="2" max="12" oninput="drawIsles()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Multiplier (n)</label>
        <input type="number" class="ctrl-input" id="frM" value="2" min="2" max="4" oninput="drawIsles()">
      </div>
    `,
    actionBtnText: "Generate Equivalent",
    stemAsk: "Why does multiplying both numerator and denominator by the same number create an equivalent fraction?",
    stemPlan: "Model original fraction bar and split each part by multiplier 'n' to produce equal area.",
    stemBuild: "Show that 2/3 and 4/6 cover the exact same distance on the 0-to-1 number line.",
    stemShare: "Demonstrate benchmark comparison using 1/2 as the reference point.",
    aiChallenge: "Ask AI to generate two fractions that appear close (e.g. 5/8 and 7/12) and prove which is greater using benchmarks.",
    canvasScript: `
      function drawIsles() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const n = parseInt(document.getElementById("frN").value, 10) || 1;
        const d = parseInt(document.getElementById("frD").value, 10) || 2;
        const m = parseInt(document.getElementById("frM").value, 10) || 2;
        
        const eqN = n * m, eqD = d * m;
        
        ctx.fillStyle = "#2D70B3";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("FRACTION ISLES · EQUIVALENCE STRIPS", 30, 35);
        
        const totalW = 480;
        // Strip 1
        ctx.fillStyle = "#9fc4bd"; ctx.font = "bold 13px 'Satoshi', sans-serif";
        ctx.fillText("Original Fraction: " + n + "/" + d, 30, 70);
        
        for(let i=0; i<d; i++) {
          const w = totalW / d;
          ctx.fillStyle = i < n ? "rgba(45,112,179,.6)" : "rgba(255,255,255,.05)";
          ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.5;
          ctx.fillRect(30 + i * w, 80, w, 40);
          ctx.strokeRect(30 + i * w, 80, w, 40);
          ctx.fillStyle = "#fff"; ctx.font = "bold 12px monospace";
          ctx.fillText("1/" + d, 30 + i*w + w/2 - 10, 105);
        }
        
        // Strip 2
        ctx.fillStyle = "#C9A227"; ctx.font = "bold 13px 'Satoshi', sans-serif";
        ctx.fillText("Equivalent Fraction (×" + m + "): " + eqN + "/" + eqD, 30, 160);
        
        for(let i=0; i<eqD; i++) {
          const w = totalW / eqD;
          ctx.fillStyle = i < eqN ? "rgba(201,162,39,.6)" : "rgba(255,255,255,.05)";
          ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.5;
          ctx.fillRect(30 + i * w, 170, w, 40);
          ctx.strokeRect(30 + i * w, 170, w, 40);
          if (w > 25) {
            ctx.fillStyle = "#10242B"; ctx.font = "bold 10px monospace";
            ctx.fillText("1/" + eqD, 30 + i*w + w/2 - 10, 195);
          }
        }
        
        ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 14px monospace";
        ctx.fillText(n + "/" + d + " = (" + n + " × " + m + ") / (" + d + " × " + m + ") = " + eqN + "/" + eqD, 30, 260);
      }
      function resetCanvas() { document.getElementById("frN").value = 2; document.getElementById("frD").value = 3; document.getElementById("frM").value = 2; drawIsles(); }
      function runAction() { drawIsles(); }
      drawIsles();
    `
  },
  {
    fileName: "activity-ch09-kunafa-kitchen-fraction-addition.html",
    title: "Kunafa Kitchens: Like Denominator Fraction Slicer",
    badge: "Chapter 09 · Fraction Addition",
    description: "Slice circular kunafa trays to add and subtract fractions with like denominators and mixed numbers.",
    chapterNum: 9,
    semesters: [{ sem: 2, week: 3 }, { sem: 2, week: 4 }, { sem: 2, week: 5 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">First Fraction (a/d)</label>
        <input type="number" class="ctrl-input" id="kA" value="3" min="1" max="8" oninput="drawKunafa()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Second Fraction (b/d)</label>
        <input type="number" class="ctrl-input" id="kB" value="4" min="1" max="8" oninput="drawKunafa()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Denominator (d)</label>
        <input type="number" class="ctrl-input" id="kD" value="8" min="3" max="12" oninput="drawKunafa()">
      </div>
    `,
    actionBtnText: "Combine Trays",
    stemAsk: "Why does the denominator stay the same when we combine slices with equal unit sizes?",
    stemPlan: "Shade slices from Tray 1 and Tray 2 into a combined tray model.",
    stemBuild: "Identify when the sum forms an improper fraction (e.g. 7/8 + 3/8 = 10/8 = 1 2/8).",
    stemShare: "Demonstrate decomposing mixed numbers into whole units and leftover fractional slices.",
    aiChallenge: "Ask AI to critique why adding numerators AND denominators (e.g. 3/8 + 4/8 = 7/16) is mathematically incorrect.",
    canvasScript: `
      function drawKunafa() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const a = parseInt(document.getElementById("kA").value, 10) || 1;
        const b = parseInt(document.getElementById("kB").value, 10) || 1;
        const d = parseInt(document.getElementById("kD").value, 10) || 8;
        
        const sum = a + b;
        const wholes = Math.floor(sum / d);
        const rem = sum % d;
        
        ctx.fillStyle = "#2D70B3";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("KUNAFA KITCHENS · FRACTION ADDITION & MIXED NUMBERS", 30, 35);
        
        // Circular Trays
        function drawTray(cx, cy, r, slices, color, label) {
          const step = (Math.PI * 2) / d;
          for(let i=0; i<d; i++) {
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, i * step, (i+1) * step);
            ctx.fillStyle = i < slices ? color : "rgba(255,255,255,.06)";
            ctx.fill();
            ctx.strokeStyle = "#0E272E"; ctx.lineWidth = 2;
            ctx.stroke();
          }
          ctx.fillStyle = "#fff"; ctx.font = "bold 12px 'Satoshi', sans-serif";
          ctx.fillText(label, cx - 25, cy + r + 22);
        }
        
        drawTray(100, 120, 50, a, "rgba(45,112,179,.8)", a + "/" + d);
        ctx.fillStyle = "#C9A227"; ctx.font = "bold 24px monospace"; ctx.fillText("+", 185, 125);
        drawTray(250, 120, 50, b, "rgba(26,167,155,.8)", b + "/" + d);
        ctx.fillStyle = "#C9A227"; ctx.font = "bold 24px monospace"; ctx.fillText("=", 335, 125);
        
        drawTray(430, 120, 50, Math.min(d, sum), "rgba(201,162,39,.8)", sum + "/" + d);
        
        ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 15px 'Satoshi', sans-serif";
        let resStr = a + "/" + d + " + " + b + "/" + d + " = " + sum + "/" + d;
        if (wholes > 0 && rem > 0) resStr += " = " + wholes + " " + rem + "/" + d;
        else if (wholes > 0 && rem === 0) resStr += " = " + wholes;
        ctx.fillText("Result: " + resStr, 30, 260);
      }
      function resetCanvas() { document.getElementById("kA").value = 3; document.getElementById("kB").value = 4; document.getElementById("kD").value = 8; drawKunafa(); }
      function runAction() { drawKunafa(); }
      drawKunafa();
    `
  },
  {
    fileName: "activity-ch10-scaling-strait-fraction-multiplier.html",
    title: "The Scaling Strait: Whole Number × Fraction Lab",
    badge: "Chapter 10 · Fraction Multiplication",
    description: "Scale repeated unit fractions to multiply whole numbers by fractions and solve elapsed time problems.",
    chapterNum: 10,
    semesters: [{ sem: 2, week: 5 }, { sem: 2, week: 6 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Whole Multiplier (n)</label>
        <input type="number" class="ctrl-input" id="scN" value="4" min="2" max="8" oninput="drawStrait()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Fraction (a/b)</label>
        <input type="number" class="ctrl-input" id="scA" value="2" min="1" max="5" oninput="drawStrait()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Denominator</label>
        <input type="number" class="ctrl-input" id="scB" value="5" min="2" max="10" oninput="drawStrait()">
      </div>
    `,
    actionBtnText: "Scale Route",
    stemAsk: "How is multiplying 4 × 2/5 identical to repeated hops on a fractional number line?",
    stemPlan: "Model n copies of a/b as (n × a) / b.",
    stemBuild: "Plot the successive hops along the open number line to find the total distance.",
    stemShare: "Connect fraction scaling to elapsed time problems (e.g. 3 sessions of 3/4 hour = 9/4 = 2 1/4 hours).",
    aiChallenge: "Ask AI to generate a recipe scaling word problem involving 6 batches of 2/3 cup flour and solve it with mixed numbers.",
    canvasScript: `
      function drawStrait() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const n = parseInt(document.getElementById("scN").value, 10) || 3;
        const a = parseInt(document.getElementById("scA").value, 10) || 2;
        const b = parseInt(document.getElementById("scB").value, 10) || 5;
        
        const totalNum = n * a;
        const wholes = Math.floor(totalNum / b);
        const rem = totalNum % b;
        
        ctx.fillStyle = "#2D70B3";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("SCALING STRAIT · " + n + " × (" + a + "/" + b + ")", 30, 35);
        
        // Number line
        const ox = 40, oy = 140, maxUnits = Math.max(4, wholes + 2), lineW = 480;
        const unitW = lineW / maxUnits;
        
        ctx.strokeStyle = "#9fc4bd"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + lineW, oy); ctx.stroke();
        
        for(let u=0; u<=maxUnits; u++) {
          const x = ox + u * unitW;
          ctx.beginPath(); ctx.moveTo(x, oy - 8); ctx.lineTo(x, oy + 8); ctx.stroke();
          ctx.fillStyle = "#fff"; ctx.font = "bold 12px monospace";
          ctx.fillText(u, x - 4, oy + 24);
        }
        
        // Hops
        let curHopX = ox;
        const hopW = (a / b) * unitW;
        for(let i=0; i<n; i++) {
          ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(curHopX + hopW/2, oy, hopW/2, Math.PI, 0, false);
          ctx.stroke();
          ctx.fillStyle = "#C9A227"; ctx.font = "10px monospace";
          ctx.fillText("+" + a + "/" + b, curHopX + hopW/2 - 10, oy - hopW/2 - 5);
          curHopX += hopW;
        }
        
        ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 15px 'Satoshi', sans-serif";
        ctx.fillText("Total: " + n + " × " + a + "/" + b + " = " + totalNum + "/" + b + (wholes > 0 ? " = " + wholes + " " + rem + "/" + b : ""), 30, 240);
      }
      function resetCanvas() { document.getElementById("scN").value = 4; document.getElementById("scA").value = 2; document.getElementById("scB").value = 5; drawStrait(); }
      function runAction() { drawStrait(); }
      drawStrait();
    `
  },
  {
    fileName: "activity-ch11-pearl-ledger-line-plot-diver.html",
    title: "The Pearl Ledger: Fractional Line Plot Studio",
    badge: "Chapter 11 · Line Plots",
    description: "Plot pearl diver hauls measured in eighths and quarters of an inch on an interactive fractional line plot.",
    chapterNum: 11,
    semesters: [{ sem: 2, week: 7 }, { sem: 2, week: 8 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Add Pearl Size (in eighths)</label>
        <select class="ctrl-input" id="pearlSize">
          <option value="1">1/8 in</option>
          <option value="2">2/8 (1/4) in</option>
          <option value="3">3/8 in</option>
          <option value="4">4/8 (1/2) in</option>
          <option value="5">5/8 in</option>
          <option value="6">6/8 (3/4) in</option>
          <option value="7">7/8 in</option>
          <option value="8">1 in</option>
        </select>
      </div>
    `,
    actionBtnText: "Add Pearl Data",
    stemAsk: "How does a line plot help us find the difference between the largest and smallest pearl sizes collected?",
    stemPlan: "Mark an 'X' above each measurement tick on the fractional scale.",
    stemBuild: "Analyze the pearl cluster and calculate total weight and range of measurements.",
    stemShare: "Critique a sample conclusion about which measurement frequency was most common.",
    aiChallenge: "Ask AI to generate 8 fractional measurements and create a question asking for the total combined length of all pearls greater than 1/2 inch.",
    canvasScript: `
      let pearlData = [2, 3, 3, 4, 4, 4, 6, 7];
      function drawLedger() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        ctx.fillStyle = "#C74440";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("PEARL LEDGER · FRACTIONAL LINE PLOT (EIGHTHS)", 30, 35);
        
        const ox = 50, oy = 200, lineW = 460;
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + lineW, oy); ctx.stroke();
        
        const labels = ["0", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4", "7/8", "1"];
        const counts = {};
        for(let i=0; i<=8; i++) counts[i] = 0;
        pearlData.forEach(p => counts[p] = (counts[p] || 0) + 1);
        
        for(let i=0; i<=8; i++) {
          const x = ox + (i / 8) * lineW;
          ctx.beginPath(); ctx.moveTo(x, oy - 6); ctx.lineTo(x, oy + 6); ctx.stroke();
          ctx.fillStyle = "#9fc4bd"; ctx.font = "bold 11px monospace";
          ctx.fillText(labels[i], x - 8, oy + 22);
          
          // Plot X's
          for(let k=0; k<counts[i]; k++) {
            const py = oy - 16 - k * 18;
            ctx.fillStyle = "#C9A227"; ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
            ctx.fillText("✕", x - 6, py);
          }
        }
        
        ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 13px 'Satoshi', sans-serif";
        ctx.fillText("Total Pearls Logged: " + pearlData.length, 30, 265);
        ctx.fillText("Most Frequent Size: 1/2 in (3 pearls)", 30, 290);
      }
      function resetCanvas() { pearlData = [2, 3, 3, 4, 4, 4, 6, 7]; drawLedger(); }
      function runAction() {
        const val = parseInt(document.getElementById("pearlSize").value, 10);
        pearlData.push(val); drawLedger();
      }
      drawLedger();
    `
  },
  {
    fileName: "activity-ch12-decimal-docks-tenths-hundredths.html",
    title: "Decimal Docks: Tenths & Hundredths Grid Tool",
    badge: "Chapter 12 · Decimal Place Value",
    description: "Compare tenths and hundredths side-by-side using 10-strip and 100-grid visual models and money conversions.",
    chapterNum: 12,
    semesters: [{ sem: 2, week: 8 }, { sem: 2, week: 9 }, { sem: 2, week: 10 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Tenths (0.0 - 1.0)</label>
        <input type="number" class="ctrl-input" id="decT" value="0.7" step="0.1" min="0" max="1" oninput="drawDocks()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Hundredths (0.00 - 1.00)</label>
        <input type="number" class="ctrl-input" id="decH" value="0.45" step="0.05" min="0" max="1" oninput="drawDocks()">
      </div>
    `,
    actionBtnText: "Compare Decimals",
    stemAsk: "Why is 0.7 equivalent to 0.70 and greater than 0.45?",
    stemPlan: "Color 7 tenths strips and 45 hundredths cells to compare overall area.",
    stemBuild: "Write decimal comparisons using >, <, and = signs.",
    stemShare: "Connect hundredths to Saudi Riyals and halalas (e.g. 0.45 SAR = 45 halalas).",
    aiChallenge: "Ask AI to explain the misconception where students think 0.45 is larger than 0.7 because 45 is greater than 7.",
    canvasScript: `
      function drawDocks() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const t = parseFloat(document.getElementById("decT").value) || 0;
        const h = parseFloat(document.getElementById("decH").value) || 0;
        
        ctx.fillStyle = "#C74440";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("DECIMAL DOCKS · TENTHS & HUNDREDTHS GRID", 30, 35);
        
        // 10-Strips Grid
        const ox1 = 50, oy1 = 70, size = 130;
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1;
        for(let i=0; i<10; i++) {
          ctx.fillStyle = (i < Math.round(t*10)) ? "rgba(18,133,124,.8)" : "rgba(255,255,255,.05)";
          ctx.fillRect(ox1 + i*(size/10), oy1, size/10, size);
          ctx.strokeRect(ox1 + i*(size/10), oy1, size/10, size);
        }
        ctx.fillStyle = "#fff"; ctx.font = "bold 13px monospace";
        ctx.fillText(t.toFixed(1) + " (" + Math.round(t*10) + "/10)", ox1 + 25, oy1 + size + 22);
        
        // Comparison symbol
        ctx.fillStyle = "#C9A227"; ctx.font = "bold 28px monospace";
        ctx.fillText(t > h ? ">" : (t < h ? "<" : "="), 235, oy1 + size/2 + 8);
        
        // 100-Cell Grid
        const ox2 = 300, oy2 = 70;
        const totalShaded = Math.round(h * 100);
        for(let col=0; col<10; col++) {
          for(let row=0; row<10; row++) {
            const cellIdx = col * 10 + row;
            ctx.fillStyle = (cellIdx < totalShaded) ? "rgba(201,162,39,.8)" : "rgba(255,255,255,.05)";
            ctx.fillRect(ox2 + col*(size/10), oy2 + row*(size/10), size/10, size/10);
            ctx.strokeRect(ox2 + col*(size/10), oy2 + row*(size/10), size/10, size/10);
          }
        }
        ctx.fillStyle = "#fff"; ctx.font = "bold 13px monospace";
        ctx.fillText(h.toFixed(2) + " (" + totalShaded + "/100)", ox2 + 20, oy2 + size + 22);
        
        ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 14px 'Satoshi', sans-serif";
        ctx.fillText("Money Equivalence: " + t.toFixed(2) + " SAR vs " + h.toFixed(2) + " SAR", 30, 270);
      }
      function resetCanvas() { document.getElementById("decT").value = 0.7; document.getElementById("decH").value = 0.45; drawDocks(); }
      function runAction() { drawDocks(); }
      drawDocks();
    `
  },
  {
    fileName: "activity-ch13-boss-measure-market-battle.html",
    title: "The Measure Market: Unit Equivalence & Boss Battle",
    badge: "Chapter 13 · Measurement Boss Battle",
    description: "Convert units of length, capacity, and mass to defeat The Muddler of the Measure Market in a whole-class review duel.",
    chapterNum: 13,
    semesters: [{ sem: 2, week: 10 }, { sem: 2, week: 11 }, { sem: 2, week: 12 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Unit Type</label>
        <select class="ctrl-input" id="measType" onchange="drawMarket()">
          <option value="length">Length (Meters -> cm)</option>
          <option value="capacity">Capacity (Liters -> mL)</option>
          <option value="weight">Mass (kg -> g)</option>
        </select>
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Quantity</label>
        <input type="number" class="ctrl-input" id="measVal" value="5" min="1" max="20" oninput="drawMarket()">
      </div>
    `,
    actionBtnText: "Attack Boss",
    stemAsk: "How do multiplicative ratios convert larger metric units into smaller equivalents?",
    stemPlan: "Construct conversion tables (1 m = 100 cm, 1 L = 1000 mL, 1 kg = 1000 g).",
    stemBuild: "Calculate perimeter and area of trading stalls to solve the boss riddles.",
    stemShare: "Present your unit conversion table to claim victory over The Muddler.",
    aiChallenge: "Ask AI to generate three tricky measurement multi-step questions involving perimeter of gardens and converting remaining centimeters.",
    canvasScript: `
      function drawMarket() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const type = document.getElementById("measType").value;
        const val = parseInt(document.getElementById("measVal").value, 10) || 1;
        
        let unitBig = "meters", unitSmall = "centimeters", mult = 100;
        if(type === "capacity") { unitBig = "liters"; unitSmall = "milliliters"; mult = 1000; }
        else if(type === "weight") { unitBig = "kilograms"; unitSmall = "grams"; mult = 1000; }
        
        const res = val * mult;
        
        ctx.fillStyle = "#12857C";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("MEASURE MARKET · BOSS BATTLE ARENA", 30, 35);
        
        // Boss HP Bar
        ctx.fillStyle = "#E25555";
        ctx.fillRect(30, 60, 520, 20);
        ctx.fillStyle = "#fff"; ctx.font = "bold 11px monospace";
        ctx.fillText("BOSS HP: THE MUDDLER OF MEASURE (Vulnerable to Correct Conversions)", 40, 75);
        
        // Conversion Table
        ctx.fillStyle = "#fff"; ctx.font = "bold 14px 'Satoshi', sans-serif";
        ctx.fillText("Conversion Ratio: 1 " + unitBig.slice(0,-1) + " = " + mult + " " + unitSmall, 30, 125);
        
        ctx.fillStyle = "rgba(18,133,124,.3)";
        ctx.fillRect(30, 145, 520, 60);
        ctx.strokeStyle = "#1AA79B"; ctx.strokeRect(30, 145, 520, 60);
        
        ctx.fillStyle = "#C9A227"; ctx.font = "bold 20px monospace";
        ctx.fillText(val + " " + unitBig + " = " + res.toLocaleString() + " " + unitSmall, 60, 182);
        
        ctx.fillStyle = "#1AA79B"; ctx.font = "bold 14px 'Satoshi', sans-serif";
        ctx.fillText("⚔️ Attack Damage: " + res + " XP dealt to The Muddler!", 30, 250);
      }
      function resetCanvas() { document.getElementById("measVal").value = 5; drawMarket(); }
      function runAction() { drawMarket(); }
      drawMarket();
    `
  },
  {
    fileName: "activity-ch14-pattern-oasis-sequence-builder.html",
    title: "Pattern Oasis: Sequence & Repeating Shapes Lab",
    badge: "Chapter 14 · Algebra Patterns",
    description: "Generate arithmetic number rules and repeating geometric sequences to predict future pattern terms.",
    chapterNum: 14,
    semesters: [{ sem: 2, week: 12 }, { sem: 2, week: 13 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Start Number</label>
        <input type="number" class="ctrl-input" id="patStart" value="4" oninput="drawOasis()">
      </div>
      <div class="ctrl-box">
        <label class="ctrl-label">Rule (Add / Multiply)</label>
        <select class="ctrl-input" id="patRule" onchange="drawOasis()">
          <option value="add6">Add 6</option>
          <option value="mult2">Multiply by 2</option>
          <option value="add8">Add 8</option>
        </select>
      </div>
    `,
    actionBtnText: "Generate Terms",
    stemAsk: "What features (odd/even, unit digit patterns) appear in a sequence that follow a consistent rule?",
    stemPlan: "Calculate the first 6 terms of the number rule and analyze pattern features.",
    stemBuild: "Construct a repeating shape pattern and predict the 20th shape in the sequence.",
    stemShare: "Explain why every term in 'start at 4, add 6' will always end in an even digit (4, 0, 6, 2, 8).",
    aiChallenge: "Ask AI to give a pattern rule with both an addition and subtraction step and solve for the 10th term.",
    canvasScript: `
      function drawOasis() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        let start = parseInt(document.getElementById("patStart").value, 10) || 2;
        const rule = document.getElementById("patRule").value;
        
        ctx.fillStyle = "#388C46";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("PATTERN OASIS · NUMBER SEQUENCES", 30, 35);
        
        let terms = [start];
        for(let i=1; i<6; i++) {
          if(rule === "add6") terms.push(terms[i-1] + 6);
          else if(rule === "mult2") terms.push(terms[i-1] * 2);
          else if(rule === "add8") terms.push(terms[i-1] + 8);
        }
        
        terms.forEach((t, i) => {
          const x = 40 + i * 85;
          ctx.fillStyle = "rgba(56,140,70,.35)";
          ctx.beginPath(); ctx.roundRect(x, 80, 70, 60, 8); ctx.fill();
          ctx.strokeStyle = "#388C46"; ctx.lineWidth = 1.5; ctx.stroke();
          
          ctx.fillStyle = "#fff"; ctx.font = "bold 16px monospace";
          ctx.fillText(t, x + 20, 115);
          
          ctx.fillStyle = "#9fc4bd"; ctx.font = "10px monospace";
          ctx.fillText("Term " + (i+1), x + 15, 133);
        });
        
        ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 14px 'Satoshi', sans-serif";
        ctx.fillText("Pattern Analysis: All terms are " + (terms.every(x => x%2===0) ? "EVEN" : "MIXED"), 30, 200);
        ctx.fillText("Next term (Term 7): " + (rule === "add6" ? terms[5]+6 : (rule==="mult2"?terms[5]*2:terms[5]+8)), 30, 230);
      }
      function resetCanvas() { document.getElementById("patStart").value = 4; drawOasis(); }
      function runAction() { drawOasis(); }
      drawOasis();
    `
  },
  {
    fileName: "activity-ch15-angle-heights-protractor-lab.html",
    title: "Angle Heights: Interactive Protractor Studio",
    badge: "Chapter 15 · Angle Measurement",
    description: "Measure angles in degrees using a circular 360° and 180° protractor and solve additive angle puzzles.",
    chapterNum: 15,
    semesters: [{ sem: 2, week: 13 }, { sem: 2, week: 14 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Angle Degree (°)</label>
        <input type="range" class="ctrl-input" id="angDeg" min="10" max="180" value="65" oninput="drawAngles()">
      </div>
    `,
    actionBtnText: "Measure Angle",
    stemAsk: "How does a protractor relate 1/360th unit turns to full degree angles?",
    stemPlan: "Align the vertex and baseline ray with 0° on the protractor scale.",
    stemBuild: "Measure acute, right, and obtuse angles and find missing adjacent angle values.",
    stemShare: "Demonstrate that two adjacent angles forming a straight line sum to 180°.",
    aiChallenge: "Ask AI to generate a geometric puzzle with three adjacent angles that form a 90° right angle, with one angle unknown.",
    canvasScript: `
      function drawAngles() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const deg = parseInt(document.getElementById("angDeg").value, 10) || 45;
        
        ctx.fillStyle = "#B3488F";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("ANGLE HEIGHTS · PROTRACTOR MEASUREMENT STUDIO", 30, 35);
        
        const cx = 240, cy = 200, r = 120;
        
        // Semi-circle Protractor
        ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 0, false); ctx.stroke();
        
        // Ticks
        for(let a=0; a<=180; a+=15) {
          const rad = (180 - a) * Math.PI / 180;
          const x1 = cx + (r - 10) * Math.cos(rad);
          const y1 = cy - (r - 10) * Math.sin(rad);
          const x2 = cx + r * Math.cos(rad);
          const y2 = cy - r * Math.sin(rad);
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
        
        // Base Ray
        ctx.strokeStyle = "#1AA79B"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
        
        // Angle Ray
        const targetRad = (180 - deg) * Math.PI / 180;
        ctx.strokeStyle = "#C9A227";
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(targetRad), cy - r * Math.sin(targetRad));
        ctx.stroke();
        
        // Arc
        ctx.strokeStyle = "#B3488F"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx, cy, 40, (180 - deg)*Math.PI/180, Math.PI, false); ctx.stroke();
        
        ctx.fillStyle = "#fff"; ctx.font = "bold 18px monospace";
        ctx.fillText(deg + "°", cx + 50, cy - 30);
        
        const type = deg < 90 ? "ACUTE" : (deg === 90 ? "RIGHT" : "OBTUSE");
        ctx.fillStyle = "#B3488F"; ctx.font = "bold 14px 'Satoshi', sans-serif";
        ctx.fillText("Classification: " + type + " ANGLE", 30, 275);
      }
      function resetCanvas() { document.getElementById("angDeg").value = 65; drawAngles(); }
      function runAction() { drawAngles(); }
      drawAngles();
    `
  },
  {
    fileName: "activity-ch16-geometry-gardens-symmetry-studio.html",
    title: "Geometry Gardens: Lines & Symmetry Studio",
    badge: "Chapter 16 · Geometry & Symmetry",
    description: "Classify 2D shapes (triangles, quadrilaterals) and draw lines of symmetry across garden polygons.",
    chapterNum: 16,
    semesters: [{ sem: 2, week: 15 }, { sem: 2, week: 16 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Choose Polygon</label>
        <select class="ctrl-input" id="geoShape" onchange="drawGeo()">
          <option value="square">Square (4 Lines)</option>
          <option value="rect">Rectangle (2 Lines)</option>
          <option value="equiTri">Equilateral Triangle (3 Lines)</option>
          <option value="isoTri">Isosceles Triangle (1 Line)</option>
        </select>
      </div>
    `,
    actionBtnText: "Draw Symmetry",
    stemAsk: "How do lines of symmetry divide a 2D geometric shape into congruent mirror halves?",
    stemPlan: "Identify parallel and perpendicular sides, angles, and symmetrical fold lines.",
    stemBuild: "Draw dashed lines of symmetry across regular and irregular quadrilaterals.",
    stemShare: "Classify triangles by side length (equilateral, isosceles, scalene) and angle type.",
    aiChallenge: "Ask AI to explain why a parallelogram has NO lines of symmetry even though opposite sides are congruent.",
    canvasScript: `
      function drawGeo() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const s = document.getElementById("geoShape").value;
        
        ctx.fillStyle = "#B3488F";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("GEOMETRY GARDENS · SHAPES & SYMMETRY", 30, 35);
        
        const cx = 260, cy = 160;
        ctx.fillStyle = "rgba(179,72,143,.25)"; ctx.strokeStyle = "#B3488F"; ctx.lineWidth = 2.5;
        
        if (s === "square") {
          ctx.fillRect(cx - 60, cy - 60, 120, 120); ctx.strokeRect(cx - 60, cy - 60, 120, 120);
          // Dashed symmetry
          ctx.strokeStyle = "#C9A227"; ctx.setLineDash([5,5]);
          ctx.beginPath(); ctx.moveTo(cx, cy - 80); ctx.lineTo(cx, cy + 80); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cx - 80, cy); ctx.lineTo(cx + 80, cy); ctx.stroke();
          ctx.setLineDash([]);
        } else if (s === "rect") {
          ctx.fillRect(cx - 90, cy - 50, 180, 100); ctx.strokeRect(cx - 90, cy - 50, 180, 100);
          ctx.strokeStyle = "#C9A227"; ctx.setLineDash([5,5]);
          ctx.beginPath(); ctx.moveTo(cx, cy - 70); ctx.lineTo(cx, cy + 70); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cx - 110, cy); ctx.lineTo(cx + 110, cy); ctx.stroke();
          ctx.setLineDash([]);
        } else if (s === "equiTri") {
          ctx.beginPath(); ctx.moveTo(cx, cy - 70); ctx.lineTo(cx + 70, cy + 50); ctx.lineTo(cx - 70, cy + 50); ctx.closePath();
          ctx.fill(); ctx.stroke();
          ctx.strokeStyle = "#C9A227"; ctx.setLineDash([5,5]);
          ctx.beginPath(); ctx.moveTo(cx, cy - 85); ctx.lineTo(cx, cy + 65); ctx.stroke();
          ctx.setLineDash([]);
        } else if (s === "isoTri") {
          ctx.beginPath(); ctx.moveTo(cx, cy - 80); ctx.lineTo(cx + 50, cy + 60); ctx.lineTo(cx - 50, cy + 60); ctx.closePath();
          ctx.fill(); ctx.stroke();
          ctx.strokeStyle = "#C9A227"; ctx.setLineDash([5,5]);
          ctx.beginPath(); ctx.moveTo(cx, cy - 95); ctx.lineTo(cx, cy + 75); ctx.stroke();
          ctx.setLineDash([]);
        }
        
        ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 14px 'Satoshi', sans-serif";
        ctx.fillText("Shape: " + s.toUpperCase() + " · Dashed Yellow Lines = Lines of Symmetry", 30, 275);
      }
      function resetCanvas() { document.getElementById("geoShape").value = "square"; drawGeo(); }
      function runAction() { drawGeo(); }
      drawGeo();
    `
  },
  {
    fileName: "activity-sem1-general-revision-arena.html",
    title: "Semester 1 General Revision Arena",
    badge: "Semester 1 · General Revision",
    description: "Comprehensive multi-domain review covering Chapters 1 to 8 (Place value, 4 operations, factors, and fractions).",
    chapterNum: null,
    semesters: [{ sem: 1, week: 17 }, { sem: 1, week: 18 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Review Domain</label>
        <select class="ctrl-input" id="revDomain" onchange="drawRev1()">
          <option value="ch12">Place Value & Add/Sub</option>
          <option value="ch34">Multiplication (1 & 2-Digit)</option>
          <option value="ch56">Division & Multi-Step</option>
          <option value="ch78">Factors & Fractions</option>
        </select>
      </div>
    `,
    actionBtnText: "Generate Practice Challenge",
    stemAsk: "Which core problem-solving models from Semester 1 need final reinforcement before exams?",
    stemPlan: "Review high-frequency test questions across place value, operations, and fraction equivalence.",
    stemBuild: "Complete timed multi-skill sprint tasks and defend mathematical reasoning on the board.",
    stemShare: "Participate in mock mastery gate assessments and peer critique.",
    aiChallenge: "Ask AI to generate a 5-question multi-topic review quiz tailored to Grade 4 Semester 1 benchmarks.",
    canvasScript: `
      function drawRev1() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const d = document.getElementById("revDomain").value;
        
        ctx.fillStyle = "#C9A227";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("SEMESTER 1 · COMPREHENSIVE REVISION ARENA", 30, 35);
        
        ctx.fillStyle = "rgba(201,162,39,.15)";
        ctx.fillRect(30, 60, 520, 150);
        ctx.strokeStyle = "#C9A227"; ctx.strokeRect(30, 60, 520, 150);
        
        ctx.fillStyle = "#fff"; ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        if(d === "ch12") {
          ctx.fillText("Topic 1 & 2 Challenge: 40,000 - 18,345 & Explain Place Value", 50, 100);
          ctx.fillStyle = "#9fc4bd"; ctx.font = "13px 'Satoshi', sans-serif";
          ctx.fillText("Model subtracting across zeros and using compensation.", 50, 135);
        } else if(d === "ch34") {
          ctx.fillText("Topic 3 & 4 Challenge: Area Model for 48 × 36", 50, 100);
          ctx.fillStyle = "#9fc4bd"; ctx.font = "13px 'Satoshi', sans-serif";
          ctx.fillText("Decompose into 4 partial product boxes and verify with estimation.", 50, 135);
        } else if(d === "ch56") {
          ctx.fillText("Topic 5 & 6 Challenge: 645 ÷ 5 & Two-Step Word Problem", 50, 100);
          ctx.fillStyle = "#9fc4bd"; ctx.font = "13px 'Satoshi', sans-serif";
          ctx.fillText("Use partial quotients and construct a comparison strip diagram.", 50, 135);
        } else if(d === "ch78") {
          ctx.fillText("Topic 7 & 8 Challenge: Find Factors of 48 & Prove 3/4 = 9/12", 50, 100);
          ctx.fillStyle = "#9fc4bd"; ctx.font = "13px 'Satoshi', sans-serif";
          ctx.fillText("Construct factor rainbow and align equivalent fraction number lines.", 50, 135);
        }
        
        ctx.fillStyle = "#1AA79B"; ctx.font = "bold 14px 'Satoshi', sans-serif";
        ctx.fillText("🏆 Semester 1 Mastery Status: Ready for Final Examinations", 30, 260);
      }
      function resetCanvas() { drawRev1(); }
      function runAction() { drawRev1(); }
      drawRev1();
    `
  },
  {
    fileName: "activity-sem2-general-revision-arena.html",
    title: "Semester 2 General Revision Arena",
    badge: "Semester 2 · General Revision",
    description: "Comprehensive multi-domain review covering Chapters 8 to 16 (Fractions, decimals, measurement, geometry).",
    chapterNum: null,
    semesters: [{ sem: 2, week: 17 }, { sem: 2, week: 18 }],
    controlsHtml: `
      <div class="ctrl-box">
        <label class="ctrl-label">Review Domain</label>
        <select class="ctrl-input" id="rev2Domain" onchange="drawRev2()">
          <option value="ch910">Fraction Operations</option>
          <option value="ch1112">Line Plots & Decimals</option>
          <option value="ch1314">Measurement & Patterns</option>
          <option value="ch1516">Angles & Geometry</option>
        </select>
      </div>
    `,
    actionBtnText: "Generate Practice Challenge",
    stemAsk: "Which geometry, measurement, and decimal concepts from Semester 2 need final polish?",
    stemPlan: "Review fractions with unlike representations, protractor readings, and geometric classifications.",
    stemBuild: "Solve multi-step measurement conversions and perimeter/area composite problems.",
    stemShare: "Present your shape classification reasoning and decimal comparisons.",
    aiChallenge: "Ask AI to generate a comprehensive Grade 4 Semester 2 final exam review worksheet with answer defense guidelines.",
    canvasScript: `
      function drawRev2() {
        ctx.clearRect(0,0,580,340);
        ctx.fillStyle = "#0E272E";
        ctx.fillRect(0,0,580,340);
        
        const d = document.getElementById("rev2Domain").value;
        
        ctx.fillStyle = "#12857C";
        ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        ctx.fillText("SEMESTER 2 · COMPREHENSIVE REVISION ARENA", 30, 35);
        
        ctx.fillStyle = "rgba(18,133,124,.15)";
        ctx.fillRect(30, 60, 520, 150);
        ctx.strokeStyle = "#1AA79B"; ctx.strokeRect(30, 60, 520, 150);
        
        ctx.fillStyle = "#fff"; ctx.font = "bold 16px 'Cabinet Grotesk', sans-serif";
        if(d === "ch910") {
          ctx.fillText("Topic 9 & 10 Challenge: 2 3/8 + 1 7/8 & 5 × 3/4", 50, 100);
          ctx.fillStyle = "#9fc4bd"; ctx.font = "13px 'Satoshi', sans-serif";
          ctx.fillText("Convert improper fraction sums into mixed numbers and model repeated addition.", 50, 135);
        } else if(d === "ch1112") {
          ctx.fillText("Topic 11 & 12 Challenge: Compare 0.8 and 0.75 on Grid", 50, 100);
          ctx.fillStyle = "#9fc4bd"; ctx.font = "13px 'Satoshi', sans-serif";
          ctx.fillText("Convert to hundredths and plot measurement data onto a fractional line plot.", 50, 135);
        } else if(d === "ch1314") {
          ctx.fillText("Topic 13 & 14 Challenge: Convert 4 L to mL & Area of 12m × 8m", 50, 100);
          ctx.fillStyle = "#9fc4bd"; ctx.font = "13px 'Satoshi', sans-serif";
          ctx.fillText("Apply conversion ratios and calculate rectangle perimeter and area.", 50, 135);
        } else if(d === "ch1516") {
          ctx.fillText("Topic 15 & 16 Challenge: Measure 135° Angle & Lines of Symmetry", 50, 100);
          ctx.fillStyle = "#9fc4bd"; ctx.font = "13px 'Satoshi', sans-serif";
          ctx.fillText("Classify triangles by sides/angles and draw lines of symmetry on polygons.", 50, 135);
        }
        
        ctx.fillStyle = "#C9A227"; ctx.font = "bold 14px 'Satoshi', sans-serif";
        ctx.fillText("🏆 Semester 2 Mastery Status: Ready for Final Examinations", 30, 260);
      }
      function resetCanvas() { drawRev2(); }
      function runAction() { drawRev2(); }
      drawRev2();
    `
  }
];

// Write all activity files to html/activities/
console.log("Generating 19 interactive activities in html/activities/...");
ACTIVITIES.forEach(act => {
  const htmlContent = makeActivityHtml(act);
  const outPath = path.join(OUT_DIR, act.fileName);
  fs.writeFileSync(outPath, htmlContent);
  console.log("  Created: html/activities/" + act.fileName);
});

module.exports = { ACTIVITIES };
console.log("Activities generation complete!");
