/* ===========================================================================
   Grade 4 · Topic 13 · BOSS — THE MUDDLER of the Measure Market
   Standards 4.MD.A.1 / 4.MD.A.2 / 4.MD.A.3 review, run as a whole-class
   boss battle on the projector. The boss is beaten by reasoning, not speed:
   identify → execute → defend a planted misconception → multi-step → transfer.
   Damage is dealt when the CLASS proves an answer; the teacher lands the
   strike. Dojo taps (press P) reward the students who led the reasoning.
   =========================================================================== */

const M = {
  ydft:  om(mnor("6 yards = ? feet")),
  ftin:  om(mnor("4 feet = ? inches")),
  mcm:   om(mnor("3 m = ? cm")),
  kmm:   om(mnor("2 km = ? m")),
  galqt: om(mnor("3 gallons = ? quarts")),
  ptc:   om(mnor("5 pints = ? cups")),
  kgg:   om(mnor("2 kg = ? g")),
  lboz:  om(mnor("3 pounds = ? ounces")),
  trapA: om(mnor("5 m = 50 cm \u00b7 true or trap?")),
  trapAFix: om(mnor("1 m = 100 cm, so 5 m = 500 cm")),
  trapB: om(mnor("3 ft 2 in = 32 in \u00b7 true or trap?")),
  trapBFix: om(mt("3\u00d712+2=38")),
  peri:  om(mt("2\u00d7(12+8)=40")),
  area:  om(mt("12\u00d78=96")),
  jugs:  om(mnor("2 \u00d7 3 L = 6,000 mL")),
  cups:  om(mt("25\u00d7250=6{,}250")),
  rule:  om(mnor("bigger unit \u2192 smaller unit \u00b7 multiply"))
};

/* ---- the boss lives across screens: module state, no storage needed ------ */
const BOSS = { max: 120, hp: 120, hits: {}, lastHit: 0 };
const bossDamage = (id, dmg) => {
  if (BOSS.hits[id]) return;
  BOSS.hits[id] = dmg;
  BOSS.hp = Math.max(0, BOSS.hp - dmg);
  BOSS.lastHit = Date.now();
  try {
    tone(BOSS.hp === 0
      ? [[659, 0, .1], [880, .1, .1], [1108, .2, .12], [1318.5, .3, .4]]
      : [[196, 0, .1, "sawtooth", .14], [98, .05, .22, "sawtooth", .1], [1567, .02, .07]]);
  } catch (e) {}
};

/* ---- the Muddler itself --------------------------------------------------- */
const drawMuddler = (opts) => (ctx, W, H, frame) => {
  const o = opts || {};
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  const f = o.fixed ? 1 : BOSS.hp / BOSS.max;
  const hurt = !o.fixed && Date.now() - BOSS.lastHit < 430;
  const sh = hurt ? Math.sin(frame * 2.4) * 5 : Math.sin(frame / 22) * 2;
  const cx = W / 2 + sh, base = H - 18;
  const bw = Math.min(W * 0.42, 240), bh = Math.min(H * 0.5, 150);
  const top = base - bh - 34;

  /* HP bar */
  if (!o.fixed) {
    const bx = W * 0.14, bwid = W * 0.72;
    D.txt(ctx, "THE MUDDLER", cx, 16, { size: 13, col: "#F2938F", font: "marker" });
    D.rr(ctx, bx, 26, bwid, 13, 7); ctx.fillStyle = "rgba(255,255,255,.12)"; ctx.fill();
    if (f > 0) { D.rr(ctx, bx, 26, Math.max(10, bwid * f), 13, 7);
      ctx.fillStyle = f > .5 ? "#C74440" : f > .25 ? "#FA7E19" : "#C9A227"; ctx.fill(); }
    D.txt(ctx, BOSS.hp + " / " + BOSS.max, cx, 33, { size: 9.5, col: "#fff" });
  } else {
    D.txt(ctx, "THE MEASURE MARKET \u00b7 REOPENED", cx, 20, { size: 13, col: "#34D399", font: "marker" });
  }

  /* pile of scrambled signs under it */
  ctx.save(); ctx.translate(cx, base);
  [[-70, -8, -0.18, "4 m?"], [58, -6, 0.14, "312 km?"], [-8, -4, 0.04, "2 kL?"]].forEach((s) => {
    ctx.save(); ctx.translate(s[0], s[1]); ctx.rotate(o.fixed ? 0 : s[2]);
    D.rr(ctx, -30, -14, 60, 16, 4);
    ctx.fillStyle = o.fixed ? "rgba(52,211,153,.18)" : "rgba(255,255,255,.1)"; ctx.fill();
    D.txt(ctx, o.fixed ? s[3].replace("?", "").replace("km", "m").replace("kL", "L") : s[3],
      0, -6, { size: 9.5, col: o.fixed ? "#34D399" : "rgba(234,244,242,.75)" });
    ctx.restore();
  });
  ctx.restore();

  /* body */
  D.rr(ctx, cx - bw / 2, top, bw, bh, 26);
  const g = ctx.createLinearGradient(0, top, 0, top + bh);
  g.addColorStop(0, o.fixed ? "#1AA79B" : "#4A5A66"); g.addColorStop(1, o.fixed ? "#0A5F58" : "#2A3742");
  ctx.fillStyle = g; ctx.fill();
  if (hurt) { ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 3; ctx.stroke(); }

  /* wobbly arms */
  ctx.strokeStyle = o.fixed ? "#0A5F58" : "#3A4954"; ctx.lineWidth = 9; ctx.lineCap = "round";
  const wob = o.fixed ? 4 : (1.3 - f) * 16;
  [[-1, 0], [1, Math.PI]].forEach((a) => {
    ctx.beginPath();
    ctx.moveTo(cx + a[0] * bw / 2, top + bh * 0.4);
    ctx.quadraticCurveTo(cx + a[0] * (bw / 2 + 44), top + bh * 0.2 + Math.sin(frame / 9 + a[1]) * wob,
      cx + a[0] * (bw / 2 + 30), top - 16 + Math.cos(frame / 11 + a[1]) * wob);
    ctx.stroke();
  });

  /* one big eye — smug, worried, cracked, beaten, or happy */
  const ex = cx, ey = top + bh * 0.36, er = bh * 0.2;
  ctx.beginPath(); ctx.arc(ex, ey, er, 0, 7); ctx.fillStyle = "#EAF4F2"; ctx.fill();
  if (o.fixed || f === 0) {
    if (o.fixed) { /* happy arc */
      ctx.beginPath(); ctx.arc(ex, ey + 2, er * 0.5, Math.PI * 1.15, Math.PI * 1.85);
      ctx.strokeStyle = "#10242B"; ctx.lineWidth = 4; ctx.stroke();
    } else { /* X eye */
      ctx.strokeStyle = "#10242B"; ctx.lineWidth = 4;
      const k = er * 0.4;
      ctx.beginPath(); ctx.moveTo(ex - k, ey - k); ctx.lineTo(ex + k, ey + k);
      ctx.moveTo(ex + k, ey - k); ctx.lineTo(ex - k, ey + k); ctx.stroke();
    }
  } else {
    const px = ex + Math.sin(frame / 16) * er * 0.3, py = ey + (f < 0.5 ? er * 0.25 : 0);
    ctx.beginPath(); ctx.arc(px, py, er * (f < 0.5 ? 0.3 : 0.42), 0, 7);
    ctx.fillStyle = "#10242B"; ctx.fill();
    if (f < 0.7) { /* a worry brow */
      ctx.strokeStyle = "#10242B"; ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(ex - er * 0.9, ey - er * 1.15);
      ctx.lineTo(ex + er * 0.5, ey - er * 0.8); ctx.stroke();
    }
  }

  /* two unit dials — scrambled while it lives, honest when fixed */
  const dials = o.fixed || f === 0 ? ["m", "mL"] : ["km?", "kL?"];
  [-1, 1].forEach((s, i) => {
    const dx = cx + s * bw * 0.26, dy = top + bh * 0.74;
    ctx.beginPath(); ctx.arc(dx, dy, 17, 0, 7); ctx.fillStyle = "#10242B"; ctx.fill();
    ctx.beginPath(); ctx.arc(dx, dy, 17, 0, 7); ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 2; ctx.stroke();
    const ang = o.fixed || f === 0 ? -Math.PI / 2 : Math.sin(frame / 7 + i * 2) * 1.2 - Math.PI / 2;
    ctx.beginPath(); ctx.moveTo(dx, dy);
    ctx.lineTo(dx + Math.cos(ang) * 11, dy + Math.sin(ang) * 11);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.5; ctx.stroke();
    D.txt(ctx, dials[i], dx, dy + 22, { size: 9, col: o.fixed || f === 0 ? "#34D399" : "#F2938F" });
  });

  /* sparks as it weakens */
  if (!o.fixed && f > 0 && f < 0.4 && frame % 7 < 3) {
    for (let i = 0; i < 3; i++) {
      const sx = cx + (Math.sin(frame * 3 + i * 40) * bw) / 2, sy = top + ((i * 37 + frame * 5) % bh);
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(sx - 5, sy); ctx.lineTo(sx + 2, sy - 6); ctx.lineTo(sx + 6, sy + 3); ctx.stroke();
    }
  }
  if (o.fixed) {
    const pulse = 0.5 + Math.sin(frame / 12) * 0.4;
    D.star8(ctx, cx, top - 26, 15, 1, "#C9A227", 2);
    D.txt(ctx, "it measures honestly now", cx, H - 6, { size: 11.5, col: "#34D399", font: "marker" });
  } else if (f === 0) {
    D.txt(ctx, "the muddle is broken", cx, H - 6, { size: 11.5, col: "#34D399", font: "marker" });
  }
};

/* the scrambled city, before the boss shows itself */
const drawScrambled = (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "Jeddah, this morning", W / 2, 24, { size: 13, col: "rgba(234,244,242,.65)", font: "marker" });
  const signs = [
    ["CORNICHE WALK", "4 m", "#F2938F"],
    ["KING FAHD FOUNTAIN", "312 km high", "#F2938F"],
    ["FRESH LABAN", "2 kL glass", "#F2938F"],
    ["ONE DATE (FRUIT)", "8 kg", "#F2938F"]
  ];
  const w = Math.min(190, W / 4 - 18);
  signs.forEach((s, i) => {
    const x = W / 2 + (i - 1.5) * (w + 14) - w / 2;
    const y = H * 0.34 + Math.sin(frame / 18 + i * 1.7) * 6;
    ctx.save(); ctx.translate(x + w / 2, y + 32); ctx.rotate(Math.sin(i * 2.4) * 0.06); ctx.translate(-(x + w / 2), -(y + 32));
    ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(x + w / 2, y + 60); ctx.lineTo(x + w / 2, H - 16); ctx.stroke();
    D.rr(ctx, x, y, w, 62, 9); ctx.fillStyle = "rgba(255,255,255,.09)"; ctx.fill();
    D.txt(ctx, s[0], x + w / 2, y + 18, { size: 9.5, col: "rgba(234,244,242,.8)" });
    D.txt(ctx, s[1], x + w / 2, y + 40, { size: 15, col: s[2], font: "marker" });
    ctx.restore();
  });
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, "every sign in the city changed overnight \u2014 the numbers stayed, the units did not",
    W / 2, H - 12, { size: 12.5, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
};

/* the strategy board: majlis floor, layers appear as strikes land */
const drawMajlis = (ctx, W, H, frame) => {
  D.board(ctx, W, H, { t: frame, title: "The school majlis \u00b7 12 m by 8 m" });
  const rw = Math.min(W * 0.44, 330), rh = rw * (8 / 12);
  const x = W / 2 - rw / 2, y = H * 0.3;
  D.rr(ctx, x, y, rw, rh, 4); ctx.fillStyle = "rgba(45,112,179,.25)"; ctx.fill();
  ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 3; ctx.strokeRect(x, y, rw, rh);
  D.txt(ctx, "12 m", x + rw / 2, y - 12, { size: 13, col: "#EAF4F2" });
  D.txt(ctx, "8 m", x - 26, y + rh / 2, { size: 13, col: "#EAF4F2" });
  if (BOSS.hits["p4a"]) {
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 5; ctx.strokeRect(x - 6, y - 6, rw + 12, rh + 12);
    D.txt(ctx, "skirting \u00b7 perimeter 40 m \u00d7 15 SAR = 600 SAR", W / 2, y + rh + 30,
      { size: 12.5, col: "#C9A227", font: "marker" });
  }
  if (BOSS.hits["p4b"]) {
    D.txt(ctx, "carpet \u00b7 area 96 sq m \u00d7 40 SAR = 3,840 SAR", W / 2, y + rh + 52,
      { size: 12.5, col: "#34D399", font: "marker" });
    D.txt(ctx, "total \u00b7 600 + 3,840 = 4,440 SAR", W / 2, y + rh + 76,
      { size: 14, col: "#EAF4F2", font: "marker" });
  }
  if (!BOSS.hits["p4a"] && !BOSS.hits["p4b"])
    D.txt(ctx, "two jobs, two measures \u2014 which needs perimeter, which needs area?",
      W / 2, H - 16, { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker" });
};

/* the final strike: jugs against cups, drawn as capacity bars */
const drawJugs = (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  const bx = W * 0.14, bw = W * 0.72;
  D.txt(ctx, "what Hani HAS \u00b7 two 3 L jugs", bx + bw / 2, 22, { size: 11.5, col: "#4A9BE0" });
  D.rr(ctx, bx, 32, bw, 26, 8); ctx.fillStyle = "rgba(74,155,224,.3)"; ctx.fill();
  const have = bw * (6000 / 6250);
  D.rr(ctx, bx, 32, have, 26, 8); ctx.fillStyle = "#2D70B3"; ctx.fill();
  D.txt(ctx, "6,000 mL", bx + have / 2, 45, { size: 12, col: "#fff" });
  D.txt(ctx, "what the ORDER needs \u00b7 25 cups of 250 mL", bx + bw / 2, 86, { size: 11.5, col: "#FFA94D" });
  D.rr(ctx, bx, 96, bw, 26, 8); ctx.fillStyle = "#FA7E19"; ctx.fill();
  D.txt(ctx, "6,250 mL", bx + bw / 2, 109, { size: 12, col: "#fff" });
  ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(bx + have, 28); ctx.lineTo(bx + have, 128); ctx.stroke();
  const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
  D.txt(ctx, "the gap is one cup \u2014 250 mL short", bx + have, 142,
    { size: 12.5, col: "#F2938F", font: "marker", alpha: pulse + 0.4 });
};

/* ---- battle UI ------------------------------------------------------------ */
function HpStrip({ tick }) {
  const f = BOSS.hp / BOSS.max;
  return (
    <div className="glass-card" style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: "12px" }}>
      <b style={{ fontSize: "12px", color: "#C74440", letterSpacing: ".08em", whiteSpace: "nowrap" }}>THE MUDDLER</b>
      <div style={{ flex: 1, height: "12px", borderRadius: "7px", background: "rgba(199,68,64,.15)", overflow: "hidden" }}>
        <div style={{ width: Math.max(2, f * 100) + "%", height: "100%", borderRadius: "7px",
          background: f > .5 ? "#C74440" : f > .25 ? "#FA7E19" : "#C9A227", transition: "width .5s" }} />
      </div>
      <b style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>{BOSS.hp} / {BOSS.max}</b>
    </div>
  );
}

function StrikeCard({ id, dmg, tick, bump, title, omml, ommlAlt, claim, answer, why }) {
  const done = !!BOSS.hits[id];
  const [open, setOpen] = useState(done);
  return (
    <div className="glass-card" style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px", textAlign: "start" }}>
      {title && <b style={{ fontSize: "12px" }}>{title}</b>}
      {claim && <div style={{ fontSize: "12.5px", color: "#C74440", fontWeight: 800 }}>
        <Icon name="fa-masks-theater" /> The Muddler claims: {claim}</div>}
      {omml && <MathEl omml={omml} alt={ommlAlt} size="lg" display="block" />}
      {!open ? (
        <button className="btn btn-ghost btn-sm" style={{ alignSelf: "start" }}
          onClick={() => setOpen(true)}>
          <Icon name="fa-eye" /> Boards up, then reveal
        </button>
      ) : (
        <div className="gsap-auto" style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          <div style={{ fontWeight: 900, fontSize: "13px", color: "var(--ok)" }}>{answer}</div>
          {why && <div style={{ fontSize: "11.5px", color: "var(--daf-ink-2)" }}>{why}</div>}
          {!done ? (
            <button className="btn btn-gold btn-sm" style={{ alignSelf: "start" }}
              onClick={() => { bossDamage(id, dmg); bump(); }}>
              <Icon name="fa-bolt" /> The class proved it — strike −{dmg}
            </button>
          ) : (
            <b style={{ fontSize: "11.5px", color: "var(--ok)" }}><Icon name="fa-check" /> HIT · −{dmg}</b>
          )}
        </div>
      )}
    </div>
  );
}

function BattleScreen({ items, cols, note }) {
  const [tick, setTick] = useState(0);
  const bump = () => setTick((t) => t + 1);
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <HpStrip tick={tick} />
      <Sketch draw={drawMuddler()} height={150} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(" + (cols || 2) + ", 1fr)", gap: "9px" }}>
        {items.map((it) => <StrikeCard key={it.id} bump={bump} tick={tick} {...it} />)}
      </div>
      {note && <div style={{ fontSize: "11.5px", color: "var(--daf-ink-2)", textAlign: "center" }}>{note}</div>}
    </div>
  );
}

const LESSON = {
  code: "boss-13",
  storageKey: "daf-g4-t13-boss",
  title: "BOSS \u00b7 The Muddler of the Measure Market",
  unit: "GRADE 4 \u00b7 TOPIC 13 BOSS \u00b7 4.MD.A REVIEW",
  math: M,
  ixl: [],

  metas: [
    { phase: "warmup", title: "Something is <em>wrong</em> in Jeddah",
      lead: "Overnight, every measurement in the city scrambled. The numbers stayed. The units did not.",
      goal: "Reactivate unit sense before naming a single rule.",
      pull: "Something did this. Let us meet it.",
      rail: { launch: "Read the signs together. Ask only: what is wrong here?",
        monitor: ["Laughing at the absurd sizes", "Naming the unit that would fix it", "Estimating the real value"],
        connect: "The number 312 was never wrong. What was?",
        misconception: "Thinking the number and the measurement are the same thing." } },

    { phase: "launch", title: "THE <em>MUDDLER</em>",
      lead: "A muddling machine has taken over the Measure Market. It has 120 HP and one weakness: reasoning it cannot survive.",
      goal: "Set the rules of engagement: boards up, no call-outs, a strike lands only when the class can defend the answer.",
      pull: "Phase 1 — spot its nonsense.",
      rail: { launch: "Announce the five phases. A strike is earned by a WHY, not a shout.",
        monitor: ["Reading the HP bar", "Predicting what the phases will ask", "Choosing board partners"],
        connect: "Why can this boss not be beaten by being fast?",
        misconception: "Treating the battle as a race instead of a defence of reasons." } },

    { phase: "monitor", title: "Phase 1 \u00b7 Spot the <em>nonsense</em>",
      lead: "Four scrambled signs. Fix the unit on your board, then defend it. Each proven fix is a strike.",
      goal: "Choosing a sensible unit is the identify step \u2014 no converting yet.",
      pull: "It felt that. Phase 2 \u2014 convert to strike.",
      rail: { launch: "For each sign: does the NUMBER need to change, or the UNIT?",
        monitor: ["Fixing the unit and keeping the number", "Arguing from a known benchmark", "Estimating a plausible value instead"],
        connect: "The fountain really is 312 of something. How do you know it is metres?",
        misconception: "Fixing a wrong unit by changing the number instead." } },

    { phase: "monitor", title: "Phase 2 \u00b7 Convert to <em>strike</em> \u2014 length",
      lead: "The Muddler hides behind scrambled lengths. Convert, show the multiplication, strike.",
      goal: "Bigger unit to smaller unit \u2014 multiply by the count of small units inside one big one.",
      pull: "Half its armour is gone. Now capacity and mass.",
      rail: { launch: "Before each one ask: bigger to smaller, or smaller to bigger?",
        monitor: ["Naming the factor first", "Using the unit bar picture", "Multiplying without naming why"],
        connect: "Why does the number always get BIGGER here?",
        misconception: "Adding the factor instead of multiplying by it." } },

    { phase: "monitor", title: "Phase 2 \u00b7 Capacity and <em>mass</em>",
      lead: "Same rule, different measures. Gallons, pints, kilograms, pounds \u2014 four more strikes.",
      goal: "The multiply rule transfers across every measurement system.",
      pull: "It is wounded \u2014 and desperate. Beware its traps.",
      rail: { launch: "Say the equivalence out loud before converting: one gallon holds four quarts.",
        monitor: ["Stating the equivalence first", "Chaining two steps", "Mixing up the customary factors"],
        connect: "What stayed the same across all eight conversions so far?",
        misconception: "Believing metric and customary need different rules \u2014 the rule is identical, only the factors differ." } },

    { phase: "connect", title: "Phase 3 \u00b7 <em>Defend</em> \u2014 it fights back",
      lead: "The Muddler now speaks. It offers two conversions that SOUND right. Agree, and it heals. Catch the trick, and it takes double damage.",
      goal: "Defending against a planted misconception is harder than executing \u2014 and worth more.",
      pull: "Its dials are cracking. Phase 4 \u2014 outthink it.",
      rail: { launch: "Read each claim in the Muddler's confident voice. Ask: true or trap?",
        monitor: ["Testing the claim with 1 m = 100 cm", "Converting the mixed units properly", "Agreeing with the trap \u2014 open the unit bar again"],
        connect: "Why is add-a-zero so tempting \u2014 and when DOES it work?",
        misconception: "5 m = 50 cm by appending a zero; 3 ft 2 in = 32 in by gluing digits." } },

    { phase: "synth", title: "Phase 4 \u00b7 The <em>strategy</em> board",
      lead: "The school majlis: 12 m by 8 m. Skirting costs 15 SAR per metre. Carpet costs 40 SAR per square metre. Two jobs, two measures, two strikes.",
      goal: "Choosing perimeter or area for each job IS the mathematics.",
      pull: "One strike left. Make it count.",
      rail: { launch: "Do not calculate yet. First: which job is a length-around, which is a cover-the-inside?",
        monitor: ["Sorting the two jobs before computing", "2\u00d7(12+8) for the border", "Multiplying 12\u00d78 for the carpet"],
        connect: "Why does the skirting use metres but the carpet use square metres?",
        misconception: "Using 12\u00d78 for both jobs because it is the only multiplication in sight." } },

    { phase: "swyk", title: "Phase 5 \u00b7 The <em>final</em> strike",
      lead: "Hani's Corniche stand: two 3-litre jugs of laban. A school group orders 25 cups of 250 mL. Does she have enough? Prove it either way.",
      goal: "Transfer: convert, compare, and defend a yes-or-no with numbers.",
      pull: "The muddle is broken.",
      rail: { launch: "Take a stand first \u2014 enough or not enough \u2014 then earn your answer.",
        monitor: ["Converting both sides to mL", "Comparing 6,000 with 6,250", "Answering only she is short without saying by how much"],
        connect: "Being 250 mL short \u2014 how much is that in cups? Why does the unit of the ANSWER matter?",
        misconception: "Comparing 6 litres with 6,250 without putting both in the same unit." } },

    { phase: "synth", title: "The Measure Market <em>reopens</em>",
      lead: "The machine measures honestly now. Every strike came from a defended reason \u2014 open the dojo and pay the strikers.",
      goal: "Name who led the reasoning; the class sees that arguments, not speed, won.",
      pull: "Stamp the region on the map.",
      rail: { launch: "Replay the best argument of the battle in the student's own words.",
        monitor: ["Naming which phase was hardest", "Claiming the trap they caught", "Retelling the final-strike reasoning"],
        connect: "Which single idea beat this boss? (Bigger unit to smaller \u2014 multiply.)",
        misconception: "Remembering the battle but not the rule that won it." } },

    { phase: "swyk", title: "Region <em>rebuilt</em>",
      lead: "Topic 13 is complete. On the class map, the Measure Market gets its colour back.",
      goal: "Close the topic: one rule, one map stamp, one thing to tell someone at home.",
      pull: "Next region awaits.",
      rail: { launch: "Open the class map on the projector and mark the region rebuilt, together.",
        monitor: ["Saying the rule unprompted", "Choosing what to measure at home", "Asking which boss comes next"],
        connect: "What will the next region's boss have to fear from this class?",
        misconception: "Filing the rule under this boss only \u2014 it converts every unit pair they will ever meet." } }
  ],

  Visual({ i, award, game }) {
    switch (i) {
      case 0:
        return (
          <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "center" }}>
            <Sketch draw={drawScrambled} height={300} />
            <div style={{ fontSize: "12.5px", color: "var(--daf-ink-2)", lineHeight: 1.6 }}>
              A 4-metre Corniche. A fountain 312 kilometres tall. A two-kilolitre glass of laban.
              <b> The numbers are fine — someone muddled every unit in the city.</b>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Sketch draw={drawMuddler()} height={280} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
              {[["1", "IDENTIFY", "fix its nonsense units"],
                ["2", "EXECUTE", "convert to strike"],
                ["3", "DEFEND", "catch its traps"],
                ["4", "STRATEGY", "perimeter or area?"],
                ["5", "TRANSFER", "one real problem"]].map((p) => (
                <div key={p[0]} className="glass-card" style={{ padding: "9px 6px", textAlign: "center" }}>
                  <b style={{ fontSize: "15px", color: "var(--daf-gold)", display: "block" }}>{p[0]}</b>
                  <b style={{ fontSize: "10px", letterSpacing: ".08em" }}>{p[1]}</b>
                  <div style={{ fontSize: "10px", color: "var(--daf-ink-2)", marginTop: "2px" }}>{p[2]}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: "12px", color: "var(--daf-ink-2)", textAlign: "center" }}>
              A strike lands only when the class can <b>defend</b> the answer. Wrong answers cost nothing —
              the Muddler simply waits.
            </div>
          </div>
        );

      case 2:
        return <BattleScreen cols={2} note="Fix the UNIT, keep the number — then say how you know."
          items={[
            { id: "p1a", dmg: 5, title: "CORNICHE WALK \u00b7 4 m?",
              answer: "4 kilometres.", why: "Four metres is two strides \u2014 a benchmark walk along the sea needs km." },
            { id: "p1b", dmg: 5, title: "KING FAHD FOUNTAIN \u00b7 312 km?",
              answer: "312 metres.", why: "312 km would reach space. The world's tallest fountain is metres tall." },
            { id: "p1c", dmg: 5, title: "FRESH LABAN \u00b7 2 kL glass?",
              answer: "About 250 mL \u2014 the sensible unit is millilitres.", why: "Two kilolitres is two thousand bottles. A glass is measured in mL." },
            { id: "p1d", dmg: 5, title: "ONE DATE (FRUIT) \u00b7 8 kg?",
              answer: "8 grams.", why: "8 kg is a watermelon. One date is a few grams \u2014 small masses take g." }
          ]} />;

      case 3:
        return <BattleScreen cols={2} note="Bigger unit \u2192 smaller unit \u00b7 multiply by how many fit inside one."
          items={[
            { id: "p2a", dmg: 5, omml: M.ydft, ommlAlt: "6 yards = ? feet",
              answer: "18 feet.", why: "Three feet in every yard \u2014 6 \u00d7 3." },
            { id: "p2b", dmg: 5, omml: M.ftin, ommlAlt: "4 feet = ? inches",
              answer: "48 inches.", why: "Twelve inches in every foot \u2014 4 \u00d7 12." },
            { id: "p2c", dmg: 5, omml: M.mcm, ommlAlt: "3 m = ? cm",
              answer: "300 cm.", why: "One hundred centimetres in every metre \u2014 3 \u00d7 100." },
            { id: "p2d", dmg: 5, omml: M.kmm, ommlAlt: "2 km = ? m",
              answer: "2,000 m.", why: "A thousand metres in every kilometre \u2014 2 \u00d7 1,000." }
          ]} />;

      case 4:
        return <BattleScreen cols={2} note="Say the equivalence aloud first, then multiply."
          items={[
            { id: "p3a", dmg: 5, omml: M.galqt, ommlAlt: "3 gallons = ? quarts",
              answer: "12 quarts.", why: "Four quarts in every gallon \u2014 3 \u00d7 4." },
            { id: "p3b", dmg: 5, omml: M.ptc, ommlAlt: "5 pints = ? cups",
              answer: "10 cups.", why: "Two cups in every pint \u2014 5 \u00d7 2." },
            { id: "p3c", dmg: 5, omml: M.kgg, ommlAlt: "2 kg = ? g",
              answer: "2,000 g.", why: "A thousand grams in every kilogram \u2014 2 \u00d7 1,000." },
            { id: "p3d", dmg: 5, omml: M.lboz, ommlAlt: "3 pounds = ? ounces",
              answer: "48 ounces.", why: "Sixteen ounces in every pound \u2014 3 \u00d7 16." }
          ]} />;

      case 5:
        return <BattleScreen cols={2} note="Catching a trap deals DOUBLE damage \u2014 defending beats executing."
          items={[
            { id: "trapA", dmg: 10, claim: "\u201c5 m = 50 cm. To go to centimetres you just add a zero.\u201d",
              omml: M.trapA, ommlAlt: "5 m = 50 cm, true or trap?",
              answer: "TRAP. 1 m = 100 cm, so 5 m = 500 cm.",
              why: "Add-a-zero is \u00d710 \u2014 but a metre holds a HUNDRED centimetres. The factor is the whole rule." },
            { id: "trapB", dmg: 10, claim: "\u201c3 ft 2 in = 32 inches. Just push the digits together.\u201d",
              omml: M.trapB, ommlAlt: "3 ft 2 in = 32 in, true or trap?",
              answer: "TRAP. 3 \u00d7 12 + 2 = 38 inches.",
              why: "The 3 counts feet, the 2 counts inches \u2014 gluing digits mixes two different units into one number." }
          ]} />;

      case 6:
        return <MajlisScreen />;

      case 7:
        return <FinalScreen />;

      case 8:
        return <VictoryScreen award={award} />;

      case 9:
        return (
          <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "center" }}>
            <Sketch draw={drawMuddler({ fixed: true })} height={250} />
            <MathEl omml={M.rule} alt="bigger unit to smaller unit, multiply" size="xl" display="block" />
            <div style={{ fontSize: "12.5px", color: "var(--daf-ink-2)", lineHeight: 1.6 }}>
              Open <b>index.html</b> on the projector and stamp the <b>Measure Market</b> rebuilt.
              At home: find one label — a bottle, a snack, a road sign — and check the Muddler
              never touched it.
            </div>
          </div>
        );

      default: return null;
    }
  }
};

/* board + final screens share one tick so the HP bar updates live */
function MajlisScreen() {
  const [tick, setTick] = useState(0);
  const bump = () => setTick((t) => t + 1);
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <HpStrip tick={tick} />
      <Sketch draw={drawMajlis} height={270} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px" }}>
        <StrikeCard id="p4a" dmg={10} tick={tick} bump={bump} omml={M.peri} ommlAlt="2 times (12 plus 8) = 40"
          title="Job 1 \u00b7 skirting board around the walls \u00b7 15 SAR per m"
          answer="Perimeter: 2 \u00d7 (12 + 8) = 40 m \u2192 600 SAR."
          why="Around the edge is a length \u2014 metres, not square metres." />
        <StrikeCard id="p4b" dmg={10} tick={tick} bump={bump} omml={M.area} ommlAlt="12 times 8 = 96"
          title="Job 2 \u00b7 carpet across the floor \u00b7 40 SAR per sq m"
          answer="Area: 12 \u00d7 8 = 96 sq m \u2192 3,840 SAR. Total 4,440 SAR."
          why="Covering the inside is an area \u2014 the square metres do the pricing." />
      </div>
    </div>
  );
}

function FinalScreen() {
  const [tick, setTick] = useState(0);
  const bump = () => setTick((t) => t + 1);
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <HpStrip tick={tick} />
      <Sketch draw={drawJugs} height={165} />
      <StrikeCard id="p5" dmg={20} tick={tick} bump={bump} omml={M.cups} ommlAlt="25 times 250 = 6,250"
        title="FINAL STRIKE \u00b7 does Hani have enough laban? Prove it."
        answer="NOT enough. She has 6,000 mL; the order needs 6,250 mL \u2014 short by 250 mL, exactly one cup."
        why="Both sides must wear the same unit before they can be compared. 2 \u00d7 3 L = 6,000 mL against 25 \u00d7 250 = 6,250 mL." />
      <div style={{ fontSize: "11.5px", color: "var(--daf-ink-2)", textAlign: "center" }}>
        The strike lands only when the class states the decision <b>and</b> the gap — precision is the point.
      </div>
    </div>
  );
}

function VictoryScreen({ award }) {
  const [given, setGiven] = useState({});
  const mark = (k) => (n) => setGiven((g) => Object.assign({}, g, { [k]: n }));
  const beaten = BOSS.hp === 0;
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Sketch draw={beaten ? drawMuddler({ fixed: true }) : drawMuddler()} height={210} />
      {!beaten && (
        <div style={{ textAlign: "center", fontSize: "12.5px", fontWeight: 800, color: "var(--warn)" }}>
          {BOSS.hp} HP remains — the Muddler limps off to lick its wounds. Go back with the arrow keys
          and land the strikes it dodged; it cannot heal.
        </div>
      )}
      <div className="award-stack">
        <AwardRow label="Led a strike with clear reasoning" sub="tap the students whose argument landed a hit"
          amount={XP.swykStandard} count={given.led} col="var(--ok)"
          onPick={() => award(XP.swykStandard, "correct", "Who led a strike with clear reasoning?", "pick", mark("led"))} />
        <AwardRow label="Caught a trap in Phase 3" sub="defending beats executing — tap the trap-catchers"
          amount={XP.hardCorrect} count={given.trap} col="var(--daf-gold)"
          onPick={() => award(XP.hardCorrect, "hard", "Who caught the Muddler's trap?", "pick", mark("trap"))} />
        <AwardRow label="Named the winning rule" sub="bigger unit to smaller — multiply"
          amount={XP.hardAttempt} count={given.rule} col="var(--m-blue)"
          onPick={() => award(XP.hardAttempt, "correct", "Who named the rule that won?", "pick", mark("rule"))} />
      </div>
    </div>
  );
}
