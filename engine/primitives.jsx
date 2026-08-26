const { useState, useEffect, useRef, useReducer, useMemo, Component } = React;
const D = window.DAFDraw;

/* ===========================================================================
   PRIMITIVES  ·  shared by every Grade 4 lesson in this topic
   =========================================================================== */

/* ===========================================================================
   THE SEVEN STAGES — the structural spine of every lesson
   Content at home. Thinking in class. Evidence on the wall.

   A learning unit is not finished when the content has been covered. It is
   finished when the student can show what they made from it.

   The lesson file owns its mathematical content (metas + Visual cases); the
   engine wraps that content in the seven-stage sequence (see app.jsx,
   stageSequence()). Stages 1, 2, 4 and 5 are engine screens fed by the
   per-lesson stage plan stamped as window.DAF_STAGE at build time.
   =========================================================================== */
const STAGES = {
  1: { key: "prep",     name: "Preparation",           timing: "Before class",
       aim: "Compress the material and send it. First exposure happens at home, at the student's own pace." },
  2: { key: "diagnose", name: "Intelligent Diagnose",  timing: "5\u20138 min",
       aim: "Build a gap map, not a grade. What do they actually know?" },
  3: { key: "build",    name: "Knowledge Building",    timing: "15\u201320 min",
       aim: "Close the flagged gaps, then model one richer example, thinking out loud." },
  4: { key: "practice", name: "Practice",              timing: "10\u201315 min",
       aim: "Guided, then independent — with feedback that arrives in seconds, not days." },
  5: { key: "produce",  name: "Production / B",        timing: "10\u201315 min",
       aim: "A genuinely new situation. AI enters here — as a critic, never as an author." },
  6: { key: "gate",     name: "Mastery Gate",          timing: "5\u20138 min",
       aim: "One individual task that decides the next path for each student." },
  7: { key: "wall",     name: "Smart Production",      timing: "5\u20138 min",
       aim: "A final product the student is willing to put their name on." }
};

/* Lesson phases — colour tells the room where it is in the lesson. The six
   stage-3/6/7 phases below are the working mechanics inside the stages;
   prep, diagnose, practice and produce are the engine stage screens. */
const PHASES = {
  prep:      { c: "#4A6FA5", c2: "#7292BE", label: "Preparation" },
  diagnose:  { c: "#6042A6", c2: "#8B6FD4", label: "Intelligent Diagnose" },
  warmup:  { c: "#6042A6", c2: "#8B6FD4", label: "Warm-Up" },
  launch:  { c: "#FA7E19", c2: "#FFA94D", label: "Launch" },
  monitor: { c: "#2D70B3", c2: "#4A9BE0", label: "Monitor" },
  connect: { c: "#12857C", c2: "#1AA79B", label: "Connect" },
  synth:   { c: "#388C46", c2: "#5CB863", label: "Synthesis" },
  practice:{ c: "#B3488F", c2: "#D87BB4", label: "Practice" },
  produce: { c: "#C9A227", c2: "#E3C05A", label: "Production" },
  swyk:    { c: "#C74440", c2: "#E0665F", label: "Mastery Gate" }
};

/* ---- OMML authoring helpers (every symbol in every lesson goes through these) */
const mt   = (t) => `<m:r><m:t>${t}</m:t></m:r>`;
const mnor = (t) => `<m:r><m:rPr><m:nor/></m:rPr><m:t>${t}</m:t></m:r>`;
const mfrac = (n, d) => `<m:f><m:num>${mt(n)}</m:num><m:den>${mt(d)}</m:den></m:f>`;
const om   = (...parts) => `<m:oMath>${parts.join("")}</m:oMath>`;

class Boundary extends Component {
  constructor(p) { super(p); this.state = { bad: false }; }
  static getDerivedStateFromError() { return { bad: true }; }
  componentDidUpdate(prev) {
    if (prev.children !== this.props.children && this.state.bad) this.setState({ bad: false });
  }
  render() {
    return this.state.bad ? (
      <div className="glass-panel" style={{ textAlign: "center", borderColor: "var(--stop)" }}>
        <b style={{ color: "var(--stop)", fontSize: "17px" }}>Visual component reset.</b>
        <p style={{ color: "var(--daf-ink-2)", marginTop: "8px", fontSize: "13px" }}>
          Press <span className="kbd">R</span> to replay, or move to another screen.
        </p>
      </div>
    ) : this.props.children;
  }
}

const Icon = ({ name }) => <i className={`fa-solid ${name}`} />;

function Star8({ className, style }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3">
        <rect x="22" y="22" width="56" height="56" />
        <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
      </g>
    </svg>
  );
}

/* --- THE ONLY WAY MATH IS ALLOWED ON SCREEN: OMML in, MathML out ---------
   No numerals prop in this edition — western digits, always.               */
function MathEl({ omml, display, size, alt, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    window.DAFMath.render(ref.current, omml, {
      display: display === "block" ? "block" : "inline"
    });
    /* MathML never wraps, so a long sentence set as math would silently run off
       the panel. Shrink it until it fits, once layout has settled. */
    const host = ref.current;
    const id = requestAnimationFrame(() => {
      const m = host.querySelector("math");
      /* some DOM implementations (jsdom) give MathML nodes no style object */
      if (!m || !m.style) return;
      m.style.fontSize = "";
      const avail = host.getBoundingClientRect().width;
      if (!avail) return;
      let px = parseFloat(window.getComputedStyle(m).fontSize) || 24;
      let guard = 0;
      /* a block-level <math> is stretched to the container, so overflow shows up
         as scrollWidth, not as a wider bounding box */
      while (m.scrollWidth > avail - 2 && px > 13 && guard++ < 24) {
        px -= 1.5;
        m.style.fontSize = px + "px";
      }
    });
    return () => cancelAnimationFrame(id);
  }, [omml, display]);
  return (
    <span
      ref={ref}
      role="math"
      aria-label={alt || undefined}
      className={(display === "block" ? "math-block " : "math-inline ") + "math-" + (size || "md")}
      style={style}
    />
  );
}

/* --- canvas host: fit + phase-gated loop, cleaned up on unmount ---------- */
function Sketch({ draw, height, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || !cv.getContext) return;
    let st;
    try { st = D.fit(cv); } catch (e) { return; }
    const stop = D.loop((frame) => {
      if (!st.W || !st.H) return;
      st.ctx.clearRect(0, 0, st.W, st.H);
      D.clearTaps(cv);
      draw(st.ctx, st.W, st.H, frame);
    });
    return () => { stop(); if (st.destroy) st.destroy(); };
  }, [draw]);
  /* The canvas itself is interactive: drawings register tappable regions
     (D.tap) and pointer taps are dispatched to them — the drawing IS the
     control. Chips stay as the accessible fallback. */
  const pointer = (e, down) => {
    const cv = ref.current;
    if (!cv) return;
    const r = cv.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const hit = D.hit(cv, x, y);
    cv.style.cursor = hit ? "pointer" : "default";
    if (down && hit && hit.on) hit.on(hit.value, x, y);
  };
  return (
    <canvas
      ref={ref}
      onClick={(e) => pointer(e, true)}
      onMouseMove={(e) => pointer(e, false)}
      style={Object.assign({ width: "100%", height: (height || 300) + "px", display: "block" }, style || {})}
    />
  );
}

function XPBar({ xp, max }) {
  return (
    <div className="xp-wrap">
      <span className="xp-num">{xp} XP</span>
      <div className="xp-track">
        <div className="xp-fill" style={{ width: Math.min(100, (xp / max) * 100) + "%" }} />
      </div>
    </div>
  );
}

/* ===========================================================================
   THE XP ECONOMY
   Every value here is published to the students. Nothing is earned by clicking:
   the only ways to earn are locking a prediction, committing as a class, being
   right first time, taking the harder question, and getting a method named.
   =========================================================================== */
const XP = {
  estimate:     5,    /* lock an estimate .............. once per lesson  */
  commit:       5,    /* the class commits on the sort . once per lesson  */
  sprint:       10,   /* sprint item, right first try .. stage 4          */
  swykStandard: 15,   /* standard question, right ...... first try only   */
  hardAttempt:  15,   /* took the harder question ...... paid for trying  */
  hardCorrect:  25,   /* harder question, right ........ on top of the 15 */
  production:   15,   /* defended the production ....... stage 5          */
  sijill:       30,   /* method named into the Sijill .. teacher issued   */
  exhibition:   50    /* exhibition contribution ....... teacher issued   */
};
/* ceiling without a Sijill entry: 5 + 5 + 10 + 15 + 15 + 25 + 15 = 90 XP per
   lesson (estimate, commit, sprint, gate standard, harder lane both legs,
   defended production). 120 with a Sijill entry. The Mastery Gate lanes
   themselves pay nothing — routing is a judgement, not a reward. */

const BADGES = [
  { id: "estimator", icon: "fa-bullseye",             label: "Estimator",
    metric: "estimates", tiers: [3, 8, 15],  how: "lock an estimate" },
  { id: "modeler",   icon: "fa-shapes",               label: "Model Builder",
    metric: "hard",      tiers: [3, 10, 25], how: "take the harder question" },
  { id: "spotter",   icon: "fa-magnifying-glass",     label: "Strategy Spotter",
    metric: "sijill",    tiers: [1, 3, 6],   how: "get a method into the Sijill" },
  { id: "notation",  icon: "fa-square-root-variable", label: "Precise Notation",
    metric: "correct",   tiers: [5, 20, 40], how: "answer correctly first time" }
];
const TIER_NAMES = ["", "bronze", "silver", "gold"];

function badgeTier(b, stats) {
  const v = (stats && stats[b.metric]) || 0;
  let t = 0;
  for (let i = 0; i < b.tiers.length; i++) if (v >= b.tiers[i]) t = i + 1;
  return t;
}

function Badges({ stats }) {
  return (
    <div className="badge-row">
      {BADGES.map((b) => {
        const t = badgeTier(b, stats);
        return (
          <div key={b.id} className={"badge" + (t ? " on tier-" + t : "")}
            title={b.label + (t ? " · " + TIER_NAMES[t] : " · " + b.how)}>
            <Icon name={b.icon} />
          </div>
        );
      })}
    </div>
  );
}

/* what a running XP total is currently worth, from roster.json */
function xpWorth(xp) {
  const R = (window.DAF_ROSTER || {});
  const tiers = R.markTiers || [];
  let marks = 0;
  for (let i = 0; i < tiers.length; i++) if (xp >= tiers[i].xp) marks = tiers[i].marks;
  const privs = (R.privileges || []).filter((p) => xp >= p.xp);
  const next = (R.privileges || []).find((p) => xp < p.xp);
  return { marks: marks, unlocked: privs, next: next };
}

/* ===========================================================================
   GAME STORE  ·  board mode — one deck on the projector, the whole class in it
   =========================================================================== */
const BLANK = { xp: 0, estimates: 0, commits: 0, correct: 0, hard: 0, hardOk: 0, sijill: 0,
                plus: 0, minus: 0 };

function freshGame() {
  return { section: null, confirmed: false, present: {}, s: {},
           classXp: 0, flash: null, t0: Date.now(), sijillNames: {}, log: [] };
}

/* Paste a class list in any shape a teacher already has it: one per line, comma
   separated, tab separated from a spreadsheet, or a numbered list. */
function parseNames(text) {
  const out = [], seen = {};
  String(text || "")
    .split(/[\n\r,;\t]+/)
    .forEach((raw) => {
      const n = raw.replace(/^\s*\d+\s*[.)\-:]\s*/, "").replace(/^[\-\u2022*]\s*/, "")
                   .replace(/\s+/g, " ").trim();
      if (!n) return;
      const k = n.toLowerCase();
      if (seen[k]) return;
      seen[k] = 1;
      out.push(n);
    });
  return out;
}

function gameReducer(g, a) {
  switch (a.type) {
    case "section": {
      const names = ((window.DAF_ROSTER || {}).sections || {})[a.section] || [];
      const present = {}, s = {};
      names.forEach((n) => { present[n] = true; s[n] = Object.assign({}, BLANK); });
      return Object.assign({}, g, { section: a.section, present: present, s: s,
                                    confirmed: true, t0: Date.now() });
    }
    /* a class typed or pasted in at the gate — same shape, no roster.json entry.
       The lesson starts at once; attendance is a toggle inside the dojo screen. */
    case "roster": {
      const present = {}, s = {};
      (a.names || []).forEach((n) => { present[n] = true; s[n] = Object.assign({}, BLANK); });
      return Object.assign({}, g, { section: a.section || "Class", present: present, s: s,
                                    confirmed: true, t0: Date.now() });
    }
    case "presence": {
      const present = Object.assign({}, g.present);
      present[a.name] = !present[a.name];
      return Object.assign({}, g, { present: present });
    }
    case "confirm": return Object.assign({}, g, { confirmed: true, t0: Date.now() });
    case "addStudent": {
      const n = String(a.name || "").trim();
      if (!n || g.s[n]) return g;
      const s = Object.assign({}, g.s); s[n] = Object.assign({}, BLANK);
      const present = Object.assign({}, g.present); present[n] = true;
      return Object.assign({}, g, { s: s, present: present });
    }
    case "grant": {
      const s = Object.assign({}, g.s);
      let added = 0;
      const names = (a.names || []).filter((n) => s[n] || g.present[n]);
      names.forEach((n) => {
        const cur = Object.assign({}, s[n] || BLANK);
        cur.xp += a.amount;
        if (a.amount >= 0) cur.plus = (cur.plus || 0) + a.amount;
        else cur.minus = (cur.minus || 0) - a.amount;
        /* a metric only ever counts up: taking points back does not un-count
           an estimate that was actually locked */
        if (a.metric && a.amount > 0) cur[a.metric] = (cur[a.metric] || 0) + 1;
        s[n] = cur;
        added += a.amount;
      });
      if (!names.length) return g;
      const entry = { id: (g.log.length ? g.log[g.log.length - 1].id : 0) + 1,
                      at: Date.now(), names: names, amount: a.amount,
                      metric: a.metric || "", reason: a.reason || a.text || "" };
      return Object.assign({}, g, {
        s: s, classXp: g.classXp + added, flash: a.text || null,
        log: g.log.concat([entry])
      });
    }
    /* ClassDojo-style undo — the last thing you tapped comes straight back off */
    case "undo": {
      if (!g.log.length) return g;
      const last = g.log[g.log.length - 1];
      const s = Object.assign({}, g.s);
      last.names.forEach((n) => {
        const cur = Object.assign({}, s[n] || BLANK);
        cur.xp -= last.amount;
        if (last.amount >= 0) cur.plus = Math.max(0, (cur.plus || 0) - last.amount);
        else cur.minus = Math.max(0, (cur.minus || 0) + last.amount);
        if (last.metric && last.amount > 0) cur[last.metric] = Math.max(0, (cur[last.metric] || 0) - 1);
        s[n] = cur;
      });
      return Object.assign({}, g, {
        s: s, classXp: g.classXp - last.amount * last.names.length,
        log: g.log.slice(0, -1),
        flash: "Undone \u00b7 " + (last.reason || (last.amount + " XP"))
      });
    }
    case "sijill": {
      const sn = Object.assign({}, g.sijillNames);
      sn[a.slot] = a.name;
      return Object.assign({}, g, { sijillNames: sn });
    }
    case "clearFlash": return Object.assign({}, g, { flash: null });
    case "load": return Object.assign({}, g, a.state);
    case "reset": return freshGame();
    default: return g;
  }
}
