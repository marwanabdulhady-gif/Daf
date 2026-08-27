/**
 * scripts/build-activities.js
 * 
 * Generates all 115 standalone, interactive HTML activity decks in html/activities/
 * with matching lesson naming (<lesson-file>-activity.html) and Dar Al Fikr design system.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "html", "activities");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const cur = JSON.parse(fs.readFileSync(path.join(ROOT, "curriculum.json"), "utf8"));
const stagePlan = JSON.parse(fs.readFileSync(path.join(ROOT, "stage", "stage-plan.json"), "utf8"));
const htmlFiles = fs.readdirSync(path.join(ROOT, "html")).filter(f => f.endsWith(".html") && f.startsWith("lesson-"));

const TOPIC_CONFIGS = {
  1: { col: "#6042a6", col2: "#8b6fd4", region: "Place-Value Harbor", kind: "pvChart" },
  2: { col: "#6042a6", col2: "#8b6fd4", region: "The Souq of Sums", kind: "addsubLedger" },
  3: { col: "#fa7e19", col2: "#fca358", region: "Product Palm Grove", kind: "areaModel1D" },
  4: { col: "#fa7e19", col2: "#fca358", region: "The Tower of Times", kind: "areaModel2D" },
  5: { col: "#fa7e19", col2: "#fca358", region: "Division Dunes", kind: "divisionDunes" },
  6: { col: "#fa7e19", col2: "#fca358", region: "Caravan Crossroads", kind: "stripDiagram" },
  7: { col: "#fa7e19", col2: "#fca358", region: "Factor Reef", kind: "factorRainbow" },
  8: { col: "#2d70b3", col2: "#5c98d6", region: "The Fraction Isles", kind: "fractionStrips" },
  9: { col: "#2d70b3", col2: "#5c98d6", region: "Kunafa Kitchens", kind: "circularFractions" },
  10: { col: "#2d70b3", col2: "#5c98d6", region: "The Scaling Strait", kind: "scalingLine" },
  11: { col: "#c74440", col2: "#df7673", region: "The Pearl Ledger", kind: "linePlot" },
  12: { col: "#c74440", col2: "#df7673", region: "Decimal Docks", kind: "decimalGrids" },
  13: { col: "#12857c", col2: "#1aa79b", region: "The Measure Market", kind: "unitConversion" },
  14: { col: "#388c46", col2: "#5bb269", region: "Pattern Oasis", kind: "patterns" },
  15: { col: "#b3488f", col2: "#d475b6", region: "Angle Heights", kind: "protractor" },
  16: { col: "#b3488f", col2: "#d475b6", region: "Geometry Gardens", kind: "geometrySymmetry" },
  17: { col: "#0a5f58", col2: "#12857c", region: "The Grand Gate", kind: "volume3D" }
};

function getCanvasCode(kind, topicNum, lessonCode) {
  switch (kind) {
    case "pvChart":
      return `
        function drawTool() {
          ctx.clearRect(0, 0, 560, 320);
          ctx.fillStyle = "#0E272E"; ctx.fillRect(0, 0, 560, 320);
          const raw = parseInt(document.getElementById("inputVal1").value, 10) || 482350;
          const s = Math.min(1000000, Math.max(0, raw)).toString().padStart(7, "0");
          const cols = ["M", "HT", "TT", "Th", "H", "T", "O"];
          ctx.fillStyle = "#C9A227"; ctx.font = "bold 15px 'Cabinet Grotesk', sans-serif";
          ctx.fillText("PLACE-VALUE HARBOR · PERIOD CHART", 24, 34);
          const w = 68;
          cols.forEach((col, i) => {
            const x = 24 + i * 73;
            ctx.fillStyle = i === 0 ? "rgba(96,66,166,.3)" : (i < 4 ? "rgba(18,133,124,.3)" : "rgba(201,162,39,.25)");
            ctx.strokeStyle = "rgba(255,255,255,.2)";
            ctx.beginPath(); ctx.roundRect(x, 55, w, 140, 8); ctx.fill(); ctx.stroke();
            ctx.fillStyle = "#9fc4bd"; ctx.font = "bold 11px monospace"; ctx.fillText(col, x + 24, 78);
            ctx.fillStyle = "#fff"; ctx.font = "900 30px monospace"; ctx.fillText(s[i], x + 24, 145);
          });
          ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 13px 'Satoshi', sans-serif";
          ctx.fillText("Standard: " + parseInt(s, 10).toLocaleString(), 24, 235);
          let exp = [];
          const mults = [1000000, 100000, 10000, 1000, 100, 10, 1];
          mults.forEach((m, idx) => { const d = parseInt(s[idx], 10); if (d > 0) exp.push((d * m).toLocaleString()); });
          ctx.fillStyle = "#1AA79B"; ctx.font = "bold 11.5px monospace";
          ctx.fillText("Expanded: " + (exp.join(" + ") || "0"), 24, 265);
        }
      `;
    case "addsubLedger":
      return `
        function drawTool() {
          ctx.clearRect(0, 0, 560, 320);
          ctx.fillStyle = "#0E272E"; ctx.fillRect(0, 0, 560, 320);
          const a = parseInt(document.getElementById("inputVal1").value, 10) || 5004;
          const b = parseInt(document.getElementById("inputVal2").value, 10) || 2378;
          ctx.fillStyle = "#C9A227"; ctx.font = "bold 15px 'Cabinet Grotesk', sans-serif";
          ctx.fillText("THE SOUQ OF SUMS · REGROUPING SIMULATOR", 24, 34);
          ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 22px monospace";
          ctx.fillText("   " + a.toLocaleString().padStart(8, " "), 140, 95);
          ctx.fillText(" - " + b.toLocaleString().padStart(8, " "), 140, 135);
          ctx.strokeStyle = "#1AA79B"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(140, 155); ctx.lineTo(340, 155); ctx.stroke();
          const diff = a - b;
          ctx.fillStyle = "#C9A227"; ctx.fillText(" = " + diff.toLocaleString().padStart(8, " "), 140, 195);
          ctx.fillStyle = "#9fc4bd"; ctx.font = "600 12.5px 'Satoshi', sans-serif";
          ctx.fillText("Mental Check: (" + a + " - 4) - (" + b + " - 4) = " + (a - 4) + " - " + (b - 4) + " = " + diff, 24, 255);
        }
      `;
    case "areaModel1D":
      return `
        function drawTool() {
          ctx.clearRect(0, 0, 560, 320);
          ctx.fillStyle = "#0E272E"; ctx.fillRect(0, 0, 560, 320);
          const m1 = parseInt(document.getElementById("inputVal1").value, 10) || 6;
          const m2 = parseInt(document.getElementById("inputVal2").value, 10) || 345;
          const h = Math.floor(m2 / 100) * 100, t = Math.floor((m2 % 100) / 10) * 10, o = m2 % 10;
          const p1 = m1 * h, p2 = m1 * t, p3 = m1 * o, total = p1 + p2 + p3;
          ctx.fillStyle = "#FA7E19"; ctx.font = "bold 15px 'Cabinet Grotesk', sans-serif";
          ctx.fillText("PRODUCT PALM GROVE · 1-DIGIT AREA MODEL (" + m1 + " × " + m2 + ")", 24, 34);
          const startX = 50, y = 70, boxH = 90;
          const widths = [200, 130, 80], vals = [h, t, o], parts = [p1, p2, p3];
          const cols = ["rgba(250,126,25,.35)", "rgba(26,167,155,.35)", "rgba(201,162,39,.35)"];
          let curX = startX;
          ctx.fillStyle = "#fff"; ctx.font = "bold 18px monospace"; ctx.fillText(m1, startX - 25, y + 50);
          widths.forEach((w, i) => {
            ctx.fillStyle = cols[i]; ctx.strokeStyle = "#FA7E19"; ctx.lineWidth = 1.5;
            ctx.fillRect(curX, y, w, boxH); ctx.strokeRect(curX, y, w, boxH);
            ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 12px monospace"; ctx.fillText(vals[i], curX + w/2 - 10, y - 8);
            ctx.fillStyle = "#fff"; ctx.font = "bold 13px monospace";
            ctx.fillText(m1 + "×" + vals[i], curX + w/2 - 20, y + 40);
            ctx.fillText("=" + parts[i].toLocaleString(), curX + w/2 - 20, y + 65);
            curX += w;
          });
          ctx.fillStyle = "#FA7E19"; ctx.font = "bold 14px 'Satoshi', sans-serif";
          ctx.fillText("Total: " + p1 + " + " + p2 + " + " + p3 + " = " + total.toLocaleString(), 24, 225);
        }
      `;
    case "areaModel2D":
      return `
        function drawTool() {
          ctx.clearRect(0, 0, 560, 320);
          ctx.fillStyle = "#0E272E"; ctx.fillRect(0, 0, 560, 320);
          const a = parseInt(document.getElementById("inputVal1").value, 10) || 42;
          const b = parseInt(document.getElementById("inputVal2").value, 10) || 35;
          const a10 = Math.floor(a/10)*10, a1 = a%10, b10 = Math.floor(b/10)*10, b1 = b%10;
          const p1 = a10*b10, p2 = a1*b10, p3 = a10*b1, p4 = a1*b1, total = p1+p2+p3+p4;
          ctx.fillStyle = "#FA7E19"; ctx.font = "bold 15px 'Cabinet Grotesk', sans-serif";
          ctx.fillText("TOWER OF TIMES · 2×2 PARTIAL PRODUCTS (" + a + " × " + b + ")", 24, 30);
          const ox = 90, oy = 60, w1 = 170, w2 = 80, h1 = 65, h2 = 45;
          ctx.fillStyle = "#fff"; ctx.font = "bold 13px monospace";
          ctx.fillText(a10, ox + w1/2 - 10, oy - 6); ctx.fillText(a1, ox + w1 + w2/2 - 5, oy - 6);
          ctx.fillText(b10, ox - 35, oy + h1/2 + 5); ctx.fillText(b1, ox - 30, oy + h1 + h2/2 + 5);
          const cells = [
            {x: ox, y: oy, w: w1, h: h1, val: p1, t: a10+"×"+b10, col: "rgba(250,126,25,.3)"},
            {x: ox+w1, y: oy, w: w2, h: h1, val: p2, t: a1+"×"+b10, col: "rgba(26,167,155,.3)"},
            {x: ox, y: oy+h1, w: w1, h: h2, val: p3, t: a10+"×"+b1, col: "rgba(201,162,39,.3)"},
            {x: ox+w1, y: oy+h1, w: w2, h: h2, val: p4, t: a1+"×"+b1, col: "rgba(96,66,166,.3)"}
          ];
          cells.forEach(c => {
            ctx.fillStyle = c.col; ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5;
            ctx.fillRect(c.x, c.y, c.w, c.h); ctx.strokeRect(c.x, c.y, c.w, c.h);
            ctx.fillStyle = "#fff"; ctx.font = "bold 11px monospace"; ctx.fillText(c.t, c.x + 8, c.y + c.h/2 - 4);
            ctx.fillStyle = "#C9A227"; ctx.fillText("=" + c.val.toLocaleString(), c.x + 8, c.y + c.h/2 + 14);
          });
          ctx.fillStyle = "#FA7E19"; ctx.font = "bold 14px 'Satoshi', sans-serif";
          ctx.fillText("Product = " + p1 + " + " + p2 + " + " + p3 + " + " + p4 + " = " + total.toLocaleString(), 24, 220);
        }
      `;
    case "divisionDunes":
      return `
        function drawTool() {
          ctx.clearRect(0, 0, 560, 320);
          ctx.fillStyle = "#0E272E"; ctx.fillRect(0, 0, 560, 320);
          const D = parseInt(document.getElementById("inputVal1").value, 10) || 475;
          const V = parseInt(document.getElementById("inputVal2").value, 10) || 4;
          const q = Math.floor(D / V), r = D % V;
          ctx.fillStyle = "#FA7E19"; ctx.font = "bold 15px 'Cabinet Grotesk', sans-serif";
          ctx.fillText("DIVISION DUNES · PARTIAL QUOTIENTS (" + D + " ÷ " + V + ")", 24, 30);
          ctx.fillStyle = "#fff"; ctx.font = "bold 18px monospace"; ctx.fillText(V + " ) " + D, 70, 70);
          let rem = D, stepY = 95, pQs = [];
          if (rem >= V * 100) { const c = Math.floor(rem / (V * 100)) * 100; pQs.push(c); rem -= c * V; }
          if (rem >= V * 10) { const c = Math.floor(rem / (V * 10)) * 10; pQs.push(c); rem -= c * V; }
          if (rem >= V) { const c = Math.floor(rem / V); pQs.push(c); rem -= c * V; }
          ctx.font = "12.5px monospace";
          pQs.forEach(pq => {
            ctx.fillStyle = "#9fc4bd"; ctx.fillText("- " + (pq * V) + "  (" + pq + " × " + V + ")", 85, stepY); stepY += 22;
          });
          ctx.strokeStyle = "#1AA79B"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(70, stepY - 8); ctx.lineTo(220, stepY - 8); ctx.stroke();
          ctx.fillStyle = "#E25555"; ctx.fillText("Remainder: " + r, 85, stepY + 12);
          ctx.fillStyle = "#C9A227"; ctx.font = "bold 15px 'Satoshi', sans-serif";
          ctx.fillText("Quotient: " + q + " R " + r + " (Each share = " + q + ")", 24, 245);
        }
      `;
    case "fractionStrips":
    default:
      return `
        function drawTool() {
          ctx.clearRect(0, 0, 560, 320);
          ctx.fillStyle = "#0E272E"; ctx.fillRect(0, 0, 560, 320);
          const n = parseInt(document.getElementById("inputVal1").value, 10) || 2;
          const d = parseInt(document.getElementById("inputVal2").value, 10) || 3;
          ctx.fillStyle = "#2D70B3"; ctx.font = "bold 15px 'Cabinet Grotesk', sans-serif";
          ctx.fillText("INTERACTIVE MATH EXPLORER & MANIPULATIVE", 24, 30);
          const totalW = 460;
          ctx.fillStyle = "#9fc4bd"; ctx.font = "bold 12px 'Satoshi', sans-serif";
          ctx.fillText("Fraction Model: " + n + "/" + d, 24, 65);
          for(let i=0; i<d; i++) {
            const w = totalW / d;
            ctx.fillStyle = i < n ? "rgba(45,112,179,.7)" : "rgba(255,255,255,.06)";
            ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.5;
            ctx.fillRect(24 + i * w, 75, w, 40); ctx.strokeRect(24 + i * w, 75, w, 40);
            ctx.fillStyle = "#fff"; ctx.font = "bold 11.5px monospace"; ctx.fillText("1/" + d, 24 + i*w + w/2 - 10, 100);
          }
          // Doubled equivalent
          const eqN = n * 2, eqD = d * 2;
          ctx.fillStyle = "#C9A227"; ctx.font = "bold 12px 'Satoshi', sans-serif";
          ctx.fillText("Equivalent Fraction (×2): " + eqN + "/" + eqD, 24, 150);
          for(let i=0; i<eqD; i++) {
            const w = totalW / eqD;
            ctx.fillStyle = i < eqN ? "rgba(201,162,39,.7)" : "rgba(255,255,255,.06)";
            ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.5;
            ctx.fillRect(24 + i * w, 160, w, 40); ctx.strokeRect(24 + i * w, 160, w, 40);
          }
          ctx.fillStyle = "#EAF4F2"; ctx.font = "bold 13.5px monospace";
          ctx.fillText(n + "/" + d + " = " + eqN + "/" + eqD + " = " + ((n/d)*100).toFixed(1) + "%", 24, 245);
        }
      `;
  }
}

function buildDeckHtml(lesson, topic, lPlan, actFileName) {
  const tCfg = TOPIC_CONFIGS[topic.n] || TOPIC_CONFIGS[1];
  const prodOptions = (lPlan && lPlan.critic && lPlan.critic.production && lPlan.critic.production.options) || [
    { kind: "model", task: "A physical or digital concept model demonstrating the mathematical relationship.", stem: "ask → plan → build → test → share", ai: false },
    { kind: "presentation", task: "A 60-second evidence brief defending the solution with audited facts.", stem: "ask → plan → research with AI → build → share", ai: true }
  ];
  const aiOption = prodOptions.find(o => o.ai === true) || prodOptions[0];
  const ixlList = (lesson.ixl || []).join(" · ") || "Grade 4 Aligned";

  return `<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Dar Al Fikr · Lesson ${lesson.code} — ${lesson.title} Activity Lab</title>
  <link href="https://fonts.googleapis.com/css2?family=Lemonada:wght@400;600&display=swap" rel="stylesheet">
  <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --daf-teal: #12857c; --daf-teal-2: #1aa79b; --daf-deep: #0a5f58;
      --daf-gold: #c9a227; --daf-gold-2: #e3c05a; --daf-ink: #10242b; --daf-ink-2: #47616a;
      --daf-mint: #e8f6f4; --daf-paper: #f7fbfa; --daf-line: #cde7e3;
      --c: ${tCfg.col}; --c-2: ${tCfg.col2};
      --ease: cubic-bezier(0.16, 1, 0.3, 1);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; min-height: 100vh; }
    body {
      font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #f7fbfa 0%, #e8f6f4 55%, #f2faf8 100%);
      color: var(--daf-ink); display: flex; flex-direction: column;
    }
    h1, h2, h3 { font-family: 'Cabinet Grotesk', 'Satoshi', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }

    /* Header */
    .header {
      height: 72px; padding: 6px 24px; z-index: 50;
      display: flex; align-items: center; justify-content: space-between; gap: 14px;
      background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(20px);
      border-bottom: 3px solid var(--daf-gold); box-shadow: 0 10px 30px rgba(10, 95, 88, 0.07);
    }
    .brand { display: flex; align-items: center; gap: 11px; }
    .brand-star { width: 38px; height: 38px; color: var(--daf-teal); flex-shrink: 0; }
    .brand-txt b { display: block; font-size: 14.5px; color: var(--daf-deep); line-height: 1.1; }
    .brand-txt span { font-size: 8.5px; letter-spacing: 0.14em; color: var(--daf-ink-2); font-weight: 800; }
    
    .head-center { text-align: center; }
    .head-center b { display: block; color: var(--c); font-size: 15px; letter-spacing: 0.04em; }
    .head-center span { font-size: 10px; letter-spacing: 0.1em; color: var(--daf-ink-2); font-weight: 800; }
    
    .header-chips { display: flex; align-items: center; gap: 8px; }
    .chip {
      display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 999px;
      font: 800 10.5px 'JetBrains Mono', monospace; letter-spacing: .05em; text-transform: uppercase;
    }
    .chip-gold { background: rgba(201,162,39,.14); border: 1px solid var(--daf-gold); color: var(--daf-deep); }
    .chip-topic { background: rgba(18,133,124,.1); border: 1px solid var(--daf-teal); color: var(--daf-teal); }

    /* Main Grid */
    main {
      flex: 1; max-width: 1340px; width: 100%; margin: 0 auto; padding: 22px 24px 36px;
      display: grid; grid-template-columns: 1.15fr .85fr; gap: 20px;
    }
    @media (max-width: 960px) { main { grid-template-columns: 1fr; } }

    .glass-panel {
      background: rgba(255, 255, 255, 0.88); border: 1.5px solid var(--daf-line); border-radius: 16px;
      padding: 20px; box-shadow: 0 12px 36px rgba(10, 95, 88, 0.06); display: flex; flex-direction: column; gap: 14px;
    }
    .panel-title {
      font-size: 19px; font-weight: 900; color: var(--daf-deep); display: flex; align-items: center; gap: 8px;
    }
    .panel-sub { font-size: 12.5px; color: var(--daf-ink-2); line-height: 1.45; }

    /* Interactive Canvas Box */
    .canvas-wrap {
      background: #08161A; border: 1.5px solid rgba(26,167,155,.3); border-radius: 12px;
      position: relative; overflow: hidden; min-height: 310px; display: flex; align-items: center; justify-content: center;
    }
    canvas { display: block; max-width: 100%; height: auto; }

    .controls-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;
    }
    .ctrl-box {
      background: var(--daf-mint); border: 1px solid var(--daf-line); border-radius: 10px; padding: 9px 12px;
    }
    .ctrl-label { font-size: 11px; font-weight: 800; color: var(--daf-deep); margin-bottom: 5px; display: block; }
    .ctrl-input {
      width: 100%; background: #fff; border: 1.5px solid var(--daf-line); color: var(--daf-ink);
      padding: 6px 10px; border-radius: 6px; font: 700 13px inherit; outline: none; transition: border-color .15s;
    }
    .ctrl-input:focus { border-color: var(--daf-teal); }

    .btn {
      background: var(--daf-teal); border: 1.5px solid var(--daf-teal-2); color: #fff; border-radius: 10px;
      padding: 8px 16px; font: 800 12.5px inherit; cursor: pointer; transition: all .18s; display: inline-flex;
      align-items: center; justify-content: center; gap: 6px;
    }
    .btn:hover { background: var(--daf-teal-2); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(26,167,155,.3); }
    .btn.gold { background: var(--daf-gold); border-color: var(--daf-gold-2); color: var(--daf-ink); }
    .btn.gold:hover { background: var(--daf-gold-2); box-shadow: 0 4px 14px rgba(201,162,39,.3); }

    /* Production Cards */
    .prod-card {
      background: #fff; border: 1.5px solid var(--daf-line); border-radius: 12px; padding: 12px 14px;
      display: flex; flex-direction: column; gap: 6px; transition: all .18s;
    }
    .prod-card:hover { border-color: var(--daf-gold); box-shadow: 0 4px 16px rgba(201,162,39,.18); }
    .prod-head { display: flex; align-items: center; justify-content: space-between; }
    .prod-kind {
      font: 900 10px 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .06em;
      color: var(--daf-gold); background: rgba(201,162,39,.12); border: 1px solid rgba(201,162,39,.35);
      padding: 2px 8px; border-radius: 6px;
    }
    .prod-ai-tag {
      font: 900 9.5px 'JetBrains Mono', monospace; text-transform: uppercase; color: #6042a6;
      background: rgba(96,66,166,.08); border: 1px solid rgba(96,66,166,.25); padding: 2px 7px; border-radius: 999px;
    }
    .prod-task { font-size: 12.5px; font-weight: 700; color: var(--daf-ink); line-height: 1.45; }
    .prod-stem { font-size: 11px; color: var(--daf-ink-2); line-height: 1.4; }

    /* AI Box */
    .ai-box {
      background: rgba(201,162,39,.08); border: 1.5px dashed var(--daf-gold); border-radius: 12px; padding: 12px 14px;
    }
    .ai-title { font-size: 12px; font-weight: 900; color: var(--daf-deep); display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
    .ai-desc { font-size: 11.5px; color: var(--daf-ink-2); line-height: 1.45; }

    footer {
      padding: 14px 24px; font-size: 11px; color: var(--daf-ink-2); border-top: 1px solid var(--daf-line);
      text-align: center; background: rgba(255,255,255,.8);
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="brand">
      <svg class="brand-star" viewBox="0 0 40 40" fill="currentColor">
        <path d="M20 0l4.2 10.1L34.1 5.9 29.9 16 40 20l-10.1 4.2 4.2 9.9L24 29.9 20 40l-4.2-10.1L5.9 34.1 10.1 24 0 20l10.1-4.2L5.9 5.9 16 10.1z"/>
      </svg>
      <div class="brand-txt">
        <b>Dar Al Fikr Schools</b>
        <span>FAITH · RIGHTEOUSNESS · WISDOM</span>
      </div>
    </div>

    <div class="head-center">
      <b>Lesson ${lesson.code} · ${lesson.title} — STEAM Activity Lab</b>
      <span>Topic ${topic.n}: ${topic.title} · ${tCfg.region}</span>
    </div>

    <div class="header-chips">
      <span class="chip chip-gold"><i class="fa-solid fa-flask"></i> Stage 5 Production</span>
      <span class="chip chip-topic"><i class="fa-solid fa-graduation-cap"></i> IXL ${ixlList}</span>
    </div>
  </header>

  <main>
    <!-- Left Column: Interactive Manipulative & Simulation -->
    <section class="glass-panel">
      <div class="panel-title">
        <i class="fa-solid fa-shapes" style="color:var(--c)"></i>
        Interactive Math Manipulative & Sandbox
      </div>
      <div class="panel-sub">
        Standard: <b class="mono" style="color:var(--daf-deep)">${lesson.standard || topic.standards || 'Grade 4'}</b> — Use the live controls below to explore calculations, test conjectures, and verify mathematical relationships.
      </div>

      <div class="canvas-wrap">
        <canvas id="actCanvas" width="560" height="320"></canvas>
      </div>

      <div class="controls-grid">
        <div class="ctrl-box">
          <label class="ctrl-label">Primary Value (A)</label>
          <input type="number" class="ctrl-input" id="inputVal1" value="${topic.n === 1 ? '482350' : (topic.n === 3 ? '6' : (topic.n === 4 ? '42' : '36'))}" oninput="drawTool()">
        </div>
        <div class="ctrl-box">
          <label class="ctrl-label">Secondary Value (B)</label>
          <input type="number" class="ctrl-input" id="inputVal2" value="${topic.n === 3 ? '345' : (topic.n === 4 ? '35' : (topic.n === 5 ? '4' : '4'))}" oninput="drawTool()">
        </div>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn" onclick="drawTool()"><i class="fa-solid fa-rotate-left"></i> Reset View</button>
        <button class="btn gold" onclick="drawTool()"><i class="fa-solid fa-play"></i> Run Sandbox</button>
      </div>
    </section>

    <!-- Right Column: Stage 5 STEAM Production Choices -->
    <section class="glass-panel">
      <div class="panel-title">
        <i class="fa-solid fa-compass-drafting" style="color:var(--daf-gold)"></i>
        Stage 5 STEAM Production Builds
      </div>
      <div class="panel-sub">
        Choose 1 of 3 student production artifacts to build and defend against the Proof Critic.
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        ${prodOptions.map((opt, idx) => `
          <div class="prod-card">
            <div class="prod-head">
              <span class="prod-kind"><i class="fa-solid fa-cube"></i> ${opt.kind || 'BUILD'}</span>
              ${opt.ai === true ? '<span class="prod-ai-tag"><i class="fa-solid fa-robot"></i> AI in the loop</span>' : ''}
            </div>
            <div class="prod-task">${opt.task}</div>
            <div class="prod-stem"><i class="fa-solid fa-arrows-spin" style="color:var(--daf-teal)"></i> ${opt.stem}</div>
          </div>
        `).join("")}
      </div>

      <div class="ai-box">
        <div class="ai-title">
          <i class="fa-solid fa-robot" style="color:#6042a6"></i> AI in the Loop (Critic / Defense Rule)
        </div>
        <div class="ai-desc">
          The AI examines, challenges, and audits candidate calculations. <b>Students verify and build every piece themselves — AI is a critic, never an author.</b>
        </div>
      </div>
    </section>
  </main>

  <footer>
    Savvas enVision Mathematics (2026 - 2027) · Grade 4 · Dar Al Fikr Schools · Lesson ${lesson.code} Activity Lab
  </footer>

  <script>
    const canvas = document.getElementById("actCanvas");
    const ctx = canvas.getContext("2d");

    ${getCanvasCode(tCfg.kind, topic.n, lesson.code)}

    drawTool();
  </script>
</body>
</html>`;
}

console.log("Generating 115 matching HTML activities in html/activities/...");

const activityFileRegistry = {};

cur.topics.forEach(t => {
  t.lessons.forEach(l => {
    const origHtml = htmlFiles.find(f => f.startsWith("lesson-" + l.code + "-"));
    if (origHtml) {
      const actFileName = origHtml.replace(".html", "-activity.html");
      const lPlan = stagePlan.lessons[l.code] || null;
      const htmlContent = buildDeckHtml(l, t, lPlan, actFileName);
      fs.writeFileSync(path.join(OUT_DIR, actFileName), htmlContent);
      activityFileRegistry[l.code] = actFileName;
    }
  });
});

// Topic 13 Boss
const boss = (cur.bosses || []).find(b => b.code === "boss-13");
if (boss) {
  const origBossHtml = htmlFiles.find(f => f.startsWith("lesson-boss-13-"));
  if (origBossHtml) {
    const actBossName = origBossHtml.replace(".html", "-activity.html");
    const t13 = cur.topics.find(t => t.n === 13);
    const htmlContent = buildDeckHtml(boss, t13, null, actBossName);
    fs.writeFileSync(path.join(OUT_DIR, actBossName), htmlContent);
    activityFileRegistry["boss-13"] = actBossName;
  }
}

console.log("Created " + Object.keys(activityFileRegistry).length + " matching activity HTML decks!");
module.exports = { activityFileRegistry };
