#!/usr/bin/env node
/* Build the standalone storytelling curriculum plan from story/story-map.json. */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const input = path.join(ROOT, "story", "story-map.json");
const output = path.join(ROOT, "docs", "plans", "storytelling-curriculum-plan.html");
const data = JSON.parse(fs.readFileSync(input, "utf8"));
const json = JSON.stringify(data).replace(/</g, "\\u003c");

const html = `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Storytelling Curriculum Plan · Dar Al Fikr Grade 4 Mathematics</title>
<style>
:root{
  --night:#071e27;--night2:#0d3440;--paper:#f7f4ec;--ink:#122a31;--muted:#5b7075;
  --teal:#12857c;--teal2:#1aa79b;--gold:#c9a227;--gold2:#edd47a;--blue:#2d70b3;
  --green:#388c46;--purple:#6042a6;--red:#c74440;--line:#d9e5e1;--cream:#fffdf7;
  --shadow:0 18px 45px rgba(7,30,39,.10);--r:18px;
}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.65 Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:inherit}.hero{position:relative;overflow:hidden;background:
 radial-gradient(circle at 78% 18%,rgba(201,162,39,.18),transparent 28%),
 radial-gradient(circle at 8% 110%,rgba(26,167,155,.2),transparent 36%),
 linear-gradient(138deg,var(--night),var(--night2));color:white;padding:64px 26px 72px}
.hero:after{content:"";position:absolute;inset:-80px -20px;opacity:.1;background-image:
 linear-gradient(45deg,transparent 47%,var(--gold) 48%,var(--gold) 52%,transparent 53%),
 linear-gradient(-45deg,transparent 47%,var(--gold) 48%,var(--gold) 52%,transparent 53%);background-size:54px 54px;transform:rotate(7deg)}
.hero-in{position:relative;z-index:1;max-width:1180px;margin:auto;display:grid;grid-template-columns:1.4fr .6fr;gap:48px;align-items:center}
.kicker{font-size:11px;font-weight:900;letter-spacing:.2em;color:var(--gold2);text-transform:uppercase}.hero h1{font-size:clamp(38px,6vw,75px);line-height:.94;letter-spacing:-.055em;margin:14px 0 20px;max-width:850px}.hero h1 em{font-style:normal;color:var(--gold2)}
.hero .lead{font-size:18px;color:#cce6e3;max-width:780px;margin:0}.lantern{width:210px;height:210px;margin:auto;border:2px solid rgba(237,212,122,.55);transform:rotate(45deg);display:grid;place-items:center;box-shadow:0 0 70px rgba(201,162,39,.18);border-radius:30px}.lantern span{transform:rotate(-45deg);text-align:center}.lantern b{display:block;font-size:54px;color:var(--gold2);line-height:1}.lantern small{display:block;letter-spacing:.18em;font-weight:900;color:#b8d7d2;margin-top:12px}
.nav{position:sticky;top:0;z-index:20;background:rgba(7,30,39,.96);backdrop-filter:blur(14px);color:white;border-top:1px solid rgba(255,255,255,.08)}.nav-in{max-width:1180px;margin:auto;padding:10px 20px;display:flex;gap:8px;overflow:auto}.nav a{text-decoration:none;white-space:nowrap;padding:7px 11px;border-radius:999px;font-size:12px;font-weight:800;color:#b9d4d0}.nav a:hover{background:rgba(255,255,255,.09);color:white}
.wrap{max-width:1180px;margin:auto;padding:38px 24px 90px}.section{scroll-margin-top:70px;margin:42px 0 64px}.eyebrow{font-size:10px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:var(--teal)}h2{font-size:clamp(28px,4vw,43px);line-height:1.08;letter-spacing:-.035em;margin:7px 0 12px}h3{font-size:20px;line-height:1.2;margin:0 0 8px}h4{font-size:15px;margin:0 0 4px}.intro{font-size:17px;color:var(--muted);max-width:800px;margin:0 0 24px}
.verdict{background:var(--night);color:#d9edeb;border-radius:var(--r);padding:26px 28px;display:grid;grid-template-columns:auto 1fr;gap:20px;box-shadow:var(--shadow)}.verdict .yes{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:var(--gold);color:var(--night);font-size:20px;font-weight:1000}.verdict h3{color:white}.verdict p{margin:0}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.card{background:var(--cream);border:1px solid var(--line);border-radius:var(--r);padding:21px;box-shadow:0 4px 16px rgba(7,30,39,.045)}.card .n{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:9px;background:#e4f4f1;color:var(--teal);font-weight:950;font-size:12px;margin-bottom:12px}.card p{margin:5px 0 0;color:var(--muted)}
.lanes{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;background:white;box-shadow:var(--shadow)}.lane{padding:24px;border-right:1px solid var(--line)}.lane:last-child{border:0}.lane .tag,.tag{display:inline-block;padding:4px 9px;border-radius:999px;font-size:9px;letter-spacing:.12em;text-transform:uppercase;font-weight:950;margin-bottom:9px}.fiction .tag{background:#e9e2f7;color:var(--purple)}.history .tag{background:#dfeefa;color:var(--blue)}.sacred .tag{background:#e5f2e6;color:var(--green)}.lane li{margin:5px 0;color:var(--muted)}
.loop{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-top:24px}.loop-step{position:relative;background:white;border:1px solid var(--line);border-top:5px solid var(--teal);border-radius:13px;padding:14px 12px;min-height:178px}.loop-step:nth-child(2){border-top-color:#fa7e19}.loop-step:nth-child(3){border-top-color:var(--blue)}.loop-step:nth-child(4){border-top-color:var(--teal2)}.loop-step:nth-child(5){border-top-color:var(--green)}.loop-step:nth-child(6){border-top-color:var(--red)}.loop-step:nth-child(7){border-top-color:var(--gold)}.loop-step b{font-size:12px;display:block;margin-bottom:3px}.loop-step em{display:inline-block;font-style:normal;font:900 9px ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--teal);background:#e4f4f1;padding:2px 6px;border-radius:999px;margin-bottom:7px}.loop-step p{font-size:12px;line-height:1.48;color:var(--muted);margin:0}.shape-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}.shape{background:white;border:1px solid var(--line);border-radius:13px;padding:15px}.shape strong{display:flex;justify-content:space-between;gap:10px;font-size:13px}.shape strong span{color:var(--purple);font:900 11px ui-monospace,SFMono-Regular,Menlo,monospace}.shape p{font-size:12px;color:var(--muted);margin:6px 0 0}.screen-pill{display:inline-block;margin-top:6px;padding:3px 7px;border-radius:999px;background:#e4f4f1;color:var(--teal);font-size:9px;font-weight:950;letter-spacing:.04em}
.act{margin:26px 0 12px;display:flex;align-items:center;gap:10px;color:var(--teal);font-size:12px;text-transform:uppercase;letter-spacing:.13em;font-weight:950}.act:after{content:"";height:1px;background:var(--line);flex:1}.unit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.unit{background:white;border:1px solid var(--line);border-radius:var(--r);overflow:hidden}.unit summary{list-style:none;cursor:pointer;padding:18px 20px;display:grid;grid-template-columns:44px 1fr auto;gap:14px;align-items:center}.unit summary::-webkit-details-marker{display:none}.unit summary:hover{background:#fbfdfc}.unit-no{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:var(--night);color:var(--gold2);font-weight:950}.unit-title b{display:block;font-size:15px}.unit-title span{font-size:11px;color:var(--muted)}.chev{color:var(--teal);font-size:19px;transition:.2s}.unit[open] .chev{transform:rotate(45deg)}.unit-body{border-top:1px solid var(--line);padding:18px 20px;background:#fffdf8}.q{font-size:16px;font-weight:850;color:var(--night);margin:0 0 14px}.meta{display:grid;grid-template-columns:1fr 1fr;gap:10px}.meta div{border-left:3px solid var(--gold);padding-left:10px;font-size:12px;color:var(--muted)}.meta b{display:block;color:var(--ink);font-size:10px;letter-spacing:.08em;text-transform:uppercase}.bridge{margin-top:15px;padding:12px 14px;border-radius:11px;background:var(--night);color:#d8ece8;font-size:12px}.bridge b{color:var(--gold2)}
.toolbar{position:sticky;top:54px;z-index:10;background:rgba(247,244,236,.96);backdrop-filter:blur(10px);padding:11px 0;display:flex;gap:9px;align-items:center}.search{flex:1;min-width:180px;border:1px solid #bcd0cb;border-radius:12px;padding:11px 14px;background:white;font:inherit;outline:none}.search:focus{border-color:var(--teal);box-shadow:0 0 0 3px rgba(18,133,124,.12)}.filter{border:1px solid #bcd0cb;border-radius:12px;padding:11px;background:white;color:var(--ink)}.count{font-size:12px;color:var(--muted);white-space:nowrap}.lesson-list{display:grid;gap:12px}.lesson-unit{background:white;border:1px solid var(--line);border-radius:var(--r);overflow:hidden}.lesson-unit>summary{list-style:none;cursor:pointer;padding:17px 20px;font-weight:900;display:flex;justify-content:space-between;gap:10px}.lesson-unit>summary::-webkit-details-marker{display:none}.lesson-unit>summary span{color:var(--teal);font-size:12px}.lesson-table{border-top:1px solid var(--line)}.lesson{display:grid;grid-template-columns:70px 1.05fr .95fr 1.2fr;gap:15px;padding:15px 20px;border-bottom:1px solid #edf2f0}.lesson:last-child{border:0}.code{font:800 12px ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--teal)}.lesson b{font-size:13px}.lesson small{display:block;color:var(--muted);line-height:1.45;margin-top:3px}.tech{display:inline-block;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;color:var(--purple);background:#eee7f8;padding:3px 7px;border-radius:999px;margin-bottom:5px}
.rubric{width:100%;border-collapse:collapse;background:white;border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow)}.rubric th{background:var(--night);color:white;text-align:left;padding:12px 14px;font-size:11px;letter-spacing:.07em}.rubric td{padding:12px 14px;border-bottom:1px solid var(--line);vertical-align:top}.rubric tr:last-child td{border:0}.rubric td:first-child{font-weight:850}
.guardrails{counter-reset:rule;display:grid;grid-template-columns:1fr 1fr;gap:10px}.rule{counter-increment:rule;background:white;border:1px solid var(--line);border-radius:13px;padding:14px 16px;display:grid;grid-template-columns:28px 1fr;gap:10px}.rule:before{content:counter(rule);display:grid;place-items:center;width:27px;height:27px;border-radius:50%;background:#f7e9e7;color:var(--red);font-weight:950;font-size:11px}.rule p{margin:2px 0;color:var(--muted);font-size:13px}
.roadmap{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.phase{background:white;border:1px solid var(--line);border-radius:15px;padding:18px}.phase strong{display:block;color:var(--teal);font-size:11px;text-transform:uppercase;letter-spacing:.1em}.phase b{display:block;margin:5px 0}.phase p{font-size:12px;color:var(--muted);margin:0}.callout{margin-top:18px;border-left:6px solid var(--gold);padding:16px 18px;background:#fffbeb;border-radius:0 13px 13px 0}.callout p{margin:0}.footer{background:var(--night);color:#9cc0ba;padding:28px;text-align:center;font-size:12px}.footer b{color:var(--gold2)}
@media(max-width:900px){.hero-in{grid-template-columns:1fr}.lantern{display:none}.grid,.lanes{grid-template-columns:1fr}.lane{border-right:0;border-bottom:1px solid var(--line)}.loop{grid-template-columns:repeat(2,1fr)}.shape-grid{grid-template-columns:repeat(2,1fr)}.unit-grid{grid-template-columns:1fr}.lesson{grid-template-columns:56px 1fr}.lesson>div:nth-child(3),.lesson>div:nth-child(4){grid-column:2}.roadmap{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.hero{padding-top:44px}.wrap{padding-inline:15px}.grid,.guardrails,.roadmap,.shape-grid{grid-template-columns:1fr}.loop{grid-template-columns:1fr}.meta{grid-template-columns:1fr}.lesson{display:block}.lesson>div{margin-bottom:8px}.toolbar{top:52px;flex-wrap:wrap}.search{width:100%}.hero h1{font-size:42px}}
@media print{.nav,.toolbar{display:none}.hero{padding:28px}.hero h1{font-size:38px}.section{break-inside:avoid;margin:25px 0}.unit-grid{grid-template-columns:1fr}.unit,.lesson-unit{break-inside:avoid}details>*{display:block!important}.lesson{grid-template-columns:55px 1fr 1fr 1fr}.wrap{max-width:none}.footer{background:white;color:#555}.lantern{display:none}}
</style>
</head>
<body>
<header class="hero">
  <div class="hero-in">
    <div>
      <div class="kicker">Dar Al Fikr Schools · Grade 4 Mathematics · Design proposal</div>
      <h1>The Lantern of <em>Numeria</em></h1>
      <p class="lead">A complete storytelling frame for 17 connected units and 114 lessons—using the craft of <i>One Thousand and One Nights</i>, source-checked Muslim STEM history, project-based learning and a protected Seerah values strand.</p>
    </div>
    <div class="lantern"><span><b>17</b><small>LINKED FOLIOS</small></span></div>
  </div>
</header>
<nav class="nav"><div class="nav-in">
  <a href="#answer">The answer</a><a href="#frame">The frame</a><a href="#lanes">Three lanes</a><a href="#loop">Every lesson</a><a href="#spine">17 units</a><a href="#all-lessons">114 lessons</a><a href="#pbl">STEM + PBL</a><a href="#safety">Religious safety</a><a href="#build">Build plan</a>
</div></nav>
<main class="wrap">
<section class="section" id="answer">
  <div class="eyebrow">Direct answer</div><h2>Yes—but integrate them in three different ways.</h2>
  <div class="verdict"><div class="yes">YES</div><div><h3>Use the Nights for narrative craft, Muslim inventions for inquiry, and Seerah for verified ethical reflection.</h3><p>Do not merge all three into one fantasy. The fictional children may enter mysteries and make mathematical decisions. Historical scientists stay documented historical people. The Prophet Muhammad ﷺ and his companions stay in a separate, reviewed sacred-history lane—never avatars, game characters or sources of invented word-problem numbers.</p></div></div>
</section>

<section class="section" id="frame">
  <div class="eyebrow">The frame story</div><h2>A city built on amanah, one folio at a time.</h2>
  <p class="intro">In present-day Jeddah, Omar and Zayd—explicitly fictional Grade 4 boy archivists—find a brass lantern containing a water-damaged civic design journal. The class restores 17 linked folios and uses the recovered mathematics to design Numeria, an explicitly fictional exhibition city.</p>
  <div class="grid">
    <article class="card"><span class="n">1</span><h3>Year-long question</h3><p>${data.drivingQuestion}</p></article>
    <article class="card"><span class="n">2</span><h3>Recurring objects</h3><p>The brass lantern, the damaged journal, a city seal, student method cards and one physical unit artifact. Callbacks create continuity without long exposition.</p></article>
    <article class="card"><span class="n">3</span><h3>The Nights technique</h3><p>End when curiosity is highest: an invoice reveals repeated batches; a verified measurement forms a pattern; a flat plan asks for volume. The next lesson answers the exact need.</p></article>
  </div>
  <h3 style="margin-top:24px">The two boy protagonists</h3>
  <div class="grid">
    <article class="card"><span class="n">O</span><h3>Omar · evidence keeper</h3><p>Examines records and measurements, asks whether claims are supported, notices missing information and maintains the Evidence Folio.</p></article>
    <article class="card"><span class="n">Z</span><h3>Zayd · model builder</h3><p>Builds diagrams and prototypes, tests strategies, makes productive mistakes and maintains the Design Folio.</p></article>
    <article class="card"><span class="n">↔</span><h3>Roles rotate</h3><p>Both boys reason, build, question and revise. Omar is not always correct, and Zayd is never limited to hands-on work.</p></article>
  </div>
</section>

<section class="section" id="lanes">
  <div class="eyebrow">Narrative architecture</div><h2>Three lanes. Never blur the labels.</h2>
  <p class="intro">Different truth status needs different visual treatment, language and review.</p>
  <div class="lanes">
    <article class="lane fiction"><span class="tag">Fictional frame</span><h3>Omar, Zayd and Numeria</h3><ul><li>Two fictional Grade 4 boys who may speak, choose, fail, revise and face design consequences.</li><li>Omar begins as evidence keeper; Zayd begins as model builder. Both roles rotate.</li><li>Clearly labelled “Our story” on screen.</li></ul></article>
    <article class="lane history"><span class="tag">Documented STEM</span><h3>History of useful knowledge</h3><ul><li>Source-checked people, manuscripts, tools and reconstructions.</li><li>Uses “documented,” “described,” “developed” and “transmitted” precisely.</li><li>Never reduces cumulative knowledge to “one hero invented everything.”</li></ul></article>
    <article class="lane sacred"><span class="tag">Amanah Window</span><h3>Seerah and companions</h3><ul><li>Short, reverent, chronological and reviewed.</li><li>No depictions, invented dialogue, quantities or role-play.</li><li>Values reflection follows the math; sacred history is never the game mechanic.</li></ul></article>
  </div>
</section>

<section class="section" id="loop">
  <div class="eyebrow">Flexible lesson architecture</div><h2>Keep the learning beats. Vary the number of screens.</h2>
  <p class="intro">${data.screenDesign.principle} ${data.screenDesign.typicalSpan}</p>
  <div class="loop" id="loopGrid"></div>
  <h3 style="margin-top:26px">Six planning shapes—not six templates</h3>
  <p class="intro">Each lesson now has a recommended shape and screen count based on its mathematical demand. The planning band guides authoring; it is not a cap.</p>
  <div class="shape-grid" id="shapeGrid"></div>
  <div class="callout"><p><b>Time and cognition come first:</b> 20–30 seconds for a callback when needed, up to 60 seconds for the hook, then sustained student work. Add a screen only for a distinct question, representation, action, evidence set, misconception, decision or accessibility scaffold. If a class can advance the plot without doing the mathematics, redesign it.</p></div>
</section>

<section class="section" id="spine">
  <div class="eyebrow">The connected curriculum</div><h2>17 chapters, 17 artifacts, one final exhibition.</h2>
  <p class="intro">Open any chapter to see its driving question, STEM anchor, protected Seerah window, PBL artifact and exact bridge to the next unit.</p>
  <div id="unitSpine"></div>
</section>

<section class="section" id="all-lessons">
  <div class="eyebrow">Complete lesson map</div><h2>Every one of the 114 lessons has a story job.</h2>
  <p class="intro">This is the content-authoring map, not a claim that all story text is already embedded in the decks. Every lesson has its own recommended screen count and planning band. Search by lesson, technique, lesson shape, mission or standard.</p>
  <div class="toolbar"><input id="search" class="search" type="search" placeholder="Search 13-6, fractions, cliffhanger, line plot…"><select id="topicFilter" class="filter"><option value="">All 17 topics</option></select><span class="count" id="lessonCount"></span></div>
  <div class="lesson-list" id="lessonList"></div>
</section>

<section class="section" id="pbl">
  <div class="eyebrow">STEM + PBL integration</div><h2>One useful artifact per unit—not 114 crafts.</h2>
  <p class="intro">Each lesson adds evidence, a calculation, a tested model or a design decision to the unit artifact. The unit closes with critique and a public handoff.</p>
  <table class="rubric"><thead><tr><th>Dimension</th><th>What students must show</th><th>Evidence</th><th>Weight</th></tr></thead><tbody>
    <tr><td>Mathematics</td><td>Accurate Grade 4 content and labelled representations.</td><td>Calculations, OMML equations, models and checks.</td><td>40%</td></tr>
    <tr><td>Reasoning</td><td>A decision defended with evidence; misconceptions revised.</td><td>Method card, critique note and oral explanation.</td><td>25%</td></tr>
    <tr><td>STEM process</td><td>Ask, imagine, plan, make/test and improve at an age-appropriate scale.</td><td>Prototype or data display plus one revision.</td><td>20%</td></tr>
    <tr><td>Amanah reflection</td><td>Truthful measurement, fair representation and responsible use.</td><td>One short reflection linked to the student’s own work.</td><td>10%</td></tr>
    <tr><td>Communication</td><td>Clear labels and a concise explanation for a real audience.</td><td>Exhibition caption or explanation to another class.</td><td>5%</td></tr>
  </tbody></table>
  <div class="grid" style="margin-top:15px">
    <article class="card"><span class="n">A</span><h3>Launch</h3><p>Inspect a real object, reconstruction, image, data set or local Jeddah problem. Students notice and ask before receiving vocabulary.</p></article>
    <article class="card"><span class="n">B</span><h3>Investigate</h3><p>The unit’s mathematics is the instrument students need to measure, model, compare, predict or optimize within Grade 4 scope.</p></article>
    <article class="card"><span class="n">C</span><h3>Exhibit</h3><p>Teams present the artifact to another class or families. The audience asks for mathematical evidence, not story trivia.</p></article>
  </div>
</section>

<section class="section" id="safety">
  <div class="eyebrow">Religious and historical integrity</div><h2>Approval is part of the content model.</h2>
  <p class="intro">These are release gates, not optional style advice.</p>
  <div class="guardrails" id="guardrailList"></div>
  <div class="callout"><p><b>Required record for every Amanah Window:</b> exact student-facing text · primary/approved secondary source · translation used · Islamic Studies reviewer · review date · status. Unapproved cards remain teacher-only placeholders.</p></div>
</section>

<section class="section" id="build">
  <div class="eyebrow">Implementation roadmap</div><h2>Pilot one unit before rewriting 114 decks.</h2>
  <div class="roadmap">
    <article class="phase"><strong>Phase 1 · Approve</strong><b>Narrative bible</b><p>Approve the fictional premise, character names, truth-status labels, Seerah policy and source template.</p></article>
    <article class="phase"><strong>Phase 2 · Prototype</strong><b>Topic 13 pilot</b><p>Build StoryRecap, MissionCard, STEMWindow, AmanahWindow and StoryHandoff in the shared engine. Author seven measurement lessons.</p></article>
    <article class="phase"><strong>Phase 3 · Teach</strong><b>Six-week evidence</b><p>Observe story recall, mathematical talk, time-on-math, hard-lane take-up and quality of the measurement artifact.</p></article>
    <article class="phase"><strong>Phase 4 · Scale</strong><b>Author in four acts</b><p>Only after review, add the remaining lesson beats in batches. Rebuild and verify after every topic.</p></article>
  </div>
  <div class="grid" style="margin-top:15px">
    <article class="card"><h3>Data already prepared</h3><p><code>story/story-map.json</code> contains the 17 unit arcs and all 114 lesson beats. It is separate from <code>curriculum.json</code> until the frame is approved.</p></article>
    <article class="card"><h3>Shared components to add</h3><p><code>StoryRecap</code> · <code>MissionCard</code> · <code>STEMWindow</code> · <code>AmanahWindow</code> · <code>StoryHandoff</code>. One engine change can serve every lesson.</p></article>
    <article class="card"><h3>Definition of done</h3><p>Math standard preserved · source status visible · bridge points forward · PBL evidence named · no sacred fictionalization · guardrails and browser sweep pass.</p></article>
  </div>
</section>
</main>
<footer class="footer"><b>The Lantern of Numeria</b> · flexible-screen planning proposal generated from <code>story/story-map.json</code> · 17 units · 114 lesson beats · Seerah content requires qualified school review before student release.</footer>
<script>const DATA=${json};</script>
<script>
const esc=(s)=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const groupBy=(xs,key)=>xs.reduce((a,x)=>(a[key(x)]=a[key(x)]||[],a[key(x)].push(x),a),{});
const loop=document.getElementById("loopGrid");
DATA.screenDesign.phases.forEach((x,i)=>{const el=document.createElement("article");el.className="loop-step";el.innerHTML='<b>'+esc(x.label)+'</b><em>'+esc(x.usualScreens)+' screen'+(x.usualScreens==='1'?'':'s')+' · '+(x.required?'core':'optional')+'</em><p>'+esc(x.move)+'</p>';loop.appendChild(el)});
const shapeGrid=document.getElementById("shapeGrid");
DATA.screenDesign.lessonShapes.forEach(x=>{const el=document.createElement("article");el.className="shape";el.innerHTML='<strong>'+esc(x.label)+'<span>'+esc(x.recommended)+' target · '+esc(x.planningBand)+'</span></strong><p>'+esc(x.useWhen)+'</p>';shapeGrid.appendChild(el)});
const spine=document.getElementById("unitSpine");
const acts=groupBy(DATA.units,u=>u.act);
Object.entries(acts).forEach(([act,units])=>{const ah=document.createElement("div");ah.className="act";ah.textContent=act;spine.appendChild(ah);const grid=document.createElement("div");grid.className="unit-grid";units.forEach(u=>{const d=document.createElement("details");d.className="unit";d.innerHTML='<summary><span class="unit-no">'+u.topic+'</span><span class="unit-title"><b>'+esc(u.chapter)+'</b><span>'+esc(u.curriculumTitle)+'</span></span><span class="chev">+</span></summary><div class="unit-body"><p class="q">'+esc(u.question)+'</p><div class="meta"><div><b>STEM history anchor</b>'+esc(u.stem)+'</div><div><b>Protected Seerah window</b>'+esc(u.seerah)+'</div><div><b>PBL product</b>'+esc(u.pbl)+'</div><div><b>Unit artifact</b>'+esc(u.artifact)+'</div></div><div class="bridge"><b>Bridge forward · </b>'+esc(u.bridge)+'</div></div>';grid.appendChild(d)});spine.appendChild(grid)});
const filter=document.getElementById("topicFilter");DATA.units.forEach(u=>{const o=document.createElement("option");o.value=u.topic;o.textContent='Topic '+u.topic+' · '+u.chapter;filter.appendChild(o)});
const list=document.getElementById("lessonList"),search=document.getElementById("search"),count=document.getElementById("lessonCount");
function renderLessons(){const q=search.value.trim().toLowerCase(),f=filter.value;list.innerHTML="";let shown=0;DATA.units.forEach(u=>{if(f&&String(u.topic)!==f)return;const matches=u.lessons.filter(l=>!q||JSON.stringify(l).toLowerCase().includes(q)||u.chapter.toLowerCase().includes(q));if(!matches.length)return;shown+=matches.length;const d=document.createElement("details");d.className="lesson-unit";d.open=!!q||!!f;d.innerHTML='<summary>Topic '+u.topic+' · '+esc(u.chapter)+'<span>'+matches.length+' lesson'+(matches.length===1?'':'s')+'</span></summary><div class="lesson-table"></div>';const table=d.querySelector(".lesson-table");matches.forEach(l=>{const row=document.createElement("article");row.className="lesson";row.innerHTML='<div><span class="code">'+esc(l.code)+'</span><small>'+esc(l.standard)+'</small><span class="screen-pill">'+esc(l.screenPlan.recommended)+' target · '+esc(l.screenPlan.planningBand)+'</span></div><div><b>'+esc(l.storyBeat)+'</b><small>'+esc(l.curriculumTitle)+'</small><small><b>'+esc(l.screenPlan.shapeLabel)+' · </b>'+esc(l.screenPlan.reason)+'</small></div><div><span class="tech">'+esc(l.technique)+'</span><small>'+esc(l.storyMove)+'</small></div><div><b>Student mission</b><small>'+esc(l.studentMission)+'</small><small><b>Handoff · </b>'+esc(l.handoff)+'</small></div>';table.appendChild(row)});list.appendChild(d)});count.textContent=shown+' of 114 lessons'}
search.addEventListener("input",renderLessons);filter.addEventListener("change",renderLessons);renderLessons();
const guards=document.getElementById("guardrailList");DATA.guardrails.forEach(g=>{const d=document.createElement("article");d.className="rule";d.innerHTML='<p>'+esc(g)+'</p>';guards.appendChild(d)});
</script>
</body>
</html>`;

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, html);
console.log(`built ${path.relative(ROOT, output)} (${data.units.length} units, ${data.units.reduce((n,u)=>n+u.lessons.length,0)} lessons)`);
