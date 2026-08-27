/* ===========================================================================
   5 · CHROME — header, rail, overview, math inventory, frame
   English only: no lang state, no dir switching, no L key.
   Generic: every lesson-specific value comes from the LESSON object.
   =========================================================================== */

function Ambient() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current;
    if (!c || !c.getContext) return;
    const x = c.getContext("2d");
    if (!x) return;
    let w, h, id;
    const ps = Array.from({ length: 46 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.9 + 0.6,
      vx: (Math.random() - 0.5) * 0.00016, vy: (Math.random() - 0.5) * 0.00016,
      g: Math.random() > 0.55
    }));
    function size() {
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.width = window.innerWidth * dpr;
      h = c.height = window.innerHeight * dpr;
    }
    function draw() {
      if (!x || !w || !h) return;
      try {
        x.clearRect(0, 0, w, h);
        for (const p of ps) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
          if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
          x.beginPath();
          x.arc(p.x * w, p.y * h, p.r * Math.min(window.devicePixelRatio || 1, 2), 0, Math.PI * 2);
          x.fillStyle = p.g ? "rgba(201,162,39,.22)" : "rgba(18,133,124,.20)";
          x.fill();
        }
        id = requestAnimationFrame(draw);
      } catch (e) {}
    }
    size(); draw();
    window.addEventListener("resize", size);
    return () => { if (id) cancelAnimationFrame(id); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} className="ambient" />;
}

function Header({ game, onOverview, onRail, onMath, onDojo }) {
  return (
    <header className="header">
      <div className="brand">
        <Star8 className="brand-star" />
        <div className="brand-txt">
          <b>Dar Al Fikr Schools</b>
          <span>FAITH · RIGHTEOUSNESS · WISDOM</span>
        </div>
      </div>
      <div className="head-center">
        <b>{LESSON.title}</b>
        <span>{LESSON.unit}</span>
      </div>
      <div className="header-right">
        <button className="class-chip" onClick={onDojo} title="Class dojo — points, random picker, attendance (P)">
          <b>{game.section}</b>
          <span>{Object.keys(game.present).filter((n) => game.present[n]).length} here</span>
          <em>★ {game.classXp}</em>
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onMath} title="Math inventory (M)">
          <Icon name="fa-square-root-variable" />
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onRail} title="Teacher rail (T)">
          <Icon name="fa-chalkboard-user" />
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onOverview} title="Overview (O)">
          <Icon name="fa-table-cells-large" />
        </button>
      </div>
    </header>
  );
}

function Overview({ current, onSelect, onClose }) {
  return (
    <div className="modal">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2><Icon name="fa-table-cells-large" /> Overview</h2>
          <span style={{ fontSize: "12px", color: "#a9c9c4" }}>Jump to any facilitator checkpoint.</span>
        </div>
        <button className="btn btn-gold btn-sm" onClick={onClose}>
          <Icon name="fa-xmark" /> Close
        </button>
      </div>
      <div className="scroll-y" style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
        gap: "11px", flex: 1, paddingRight: "8px"
      }}>
        {SEQ.metas.map((m, idx) => {
          const ph = PHASES[m.phase];
          const stg = SEQ.stages[idx];
          const on = idx === current;
          return (
            <div key={idx} onClick={() => { onSelect(idx); onClose(); }}
              style={{
                background: on ? "linear-gradient(135deg," + ph.c + "," + ph.c2 + ")" : "rgba(255,255,255,.08)",
                border: on ? "2px solid var(--daf-gold)" : "1px solid rgba(255,255,255,.15)",
                borderRadius: "12px", padding: "13px", cursor: "pointer"
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: "10px", color: on ? "#fff" : "var(--daf-gold)" }}>
                  {String(idx + 1).padStart(2, "0")}{stg ? " · S" + stg : ""}
                </span>
                <span style={{
                  fontSize: "9px", fontWeight: 900, letterSpacing: ".08em",
                  color: on ? "#fff" : ph.c2, background: on ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.08)",
                  padding: "2px 7px", borderRadius: "999px"
                }}>{ph.label}</span>
              </div>
              <div style={{ fontSize: "12.5px", fontWeight: 800, color: "#fff", lineHeight: 1.35 }}
                dangerouslySetInnerHTML={{ __html: m.title.replace(/<\/?em>/g, "") }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeacherRail({ meta, onClose }) {
  const r = meta.rail;
  return (
    <aside className="rail scroll-y">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b style={{ color: "var(--daf-gold)", fontSize: "13px" }}>
          <Icon name="fa-chalkboard-user" /> Teacher
        </b>
        <button className="btn btn-ghost btn-sm" onClick={onClose}><Icon name="fa-xmark" /></button>
      </div>
      <h4>SAY THIS OUT LOUD</h4>
      <div className="say">{r.launch}</div>
      <h4>MONITOR FOR</h4>
      {r.monitor.map((m, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px",
          background: "rgba(255,255,255,.05)", borderRadius: "8px", padding: "8px 10px"
        }}>
          <span className="mono" style={{ color: "var(--daf-gold)", fontSize: "11px" }}>{i + 1}</span>
          <span style={{ fontSize: "12px", flex: 1, color: "#cfe6e2" }}>{m}</span>
        </div>
      ))}
      <h4>CONNECT QUESTION</h4>
      <p>{r.connect}</p>
      <h4>ANTICIPATED MISCONCEPTION</h4>
      <p style={{ color: "#f2c9c7" }}>{r.misconception}</p>
      {STORY && (STORY.stemWindows || []).length > 0 && (
        <div>
          <h4>SOURCES · HISTORY OF USEFUL KNOWLEDGE</h4>
          {STORY.stemWindows.map((w) => (
            <div key={w.id} style={{
              marginBottom: "8px", background: "rgba(255,255,255,.05)",
              borderRadius: "8px", padding: "8px 10px"
            }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#cfe6e2" }}>
                {w.title}{" "}
                <span className="mono" style={{ fontSize: "10px", color: "var(--daf-gold)" }}>{w.status}</span>
              </div>
              <p style={{ fontSize: "11.5px", color: "#cfe6e2", margin: "5px 0 0", lineHeight: 1.5 }}>
                {w.teacherNote}
              </p>
              {(w.sources || []).map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer"
                  style={{ display: "block", fontSize: "11px", color: "#9cc0ba", marginTop: "4px" }}>
                  {s.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
      {LESSON.ixl && LESSON.ixl.length > 0 && (
        <div>
          <h4>IXL PRACTICE TO ASSIGN</h4>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {LESSON.ixl.map((c) => (
              <span key={c} className="mono" style={{
                fontSize: "11px", fontWeight: 700, color: "#0B1F24",
                background: "var(--daf-gold)", padding: "3px 9px", borderRadius: "6px"
              }}>{c}</span>
            ))}
          </div>
          <p style={{ fontSize: "10.5px", color: "#8fb3ad", marginTop: "7px" }}>
            IXL skill codes for this lesson (enVision 2024 alignment).
          </p>
        </div>
      )}
      <div style={{ marginTop: "20px", fontSize: "10.5px", color: "#8fb3ad", lineHeight: 1.8 }}>
        <span className="kbd">←</span> <span className="kbd">→</span> navigate ·{" "}
        <span className="kbd">R</span> replay ·{" "}
        <span className="kbd">O</span> overview ·{" "}
        <span className="kbd">M</span> math inventory ·{" "}
        <span className="kbd">N</span> class ledger ·{" "}
        <span className="kbd">P</span> points ·{" "}
        <span className="kbd">T</span> this rail
      </div>
    </aside>
  );
}

/* Every OMML string in the deck, ready to paste into Word as a live equation */
function MathInventory({ onClose }) {
  const [copied, setCopied] = useState(null);
  const entries = Object.keys(LESSON.math).map((k) => ({ k: k, omml: LESSON.math[k] }));
  const copy = (k, s) => {
    try {
      const clean = s.replace(/\s+/g, " ").trim();
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(clean);
      else {
        const ta = document.createElement("textarea");
        ta.value = clean; document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
      }
      setCopied(k); setTimeout(() => setCopied(null), 1600);
    } catch (e) {}
  };
  return (
    <div className="modal">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h2><Icon name="fa-square-root-variable" /> Math inventory</h2>
          <span style={{ fontSize: "12px", color: "#a9c9c4" }}>
            Every symbol in this lesson is authored in OMML — paste it into Word and it stays a live equation.
          </span>
        </div>
        <button className="btn btn-gold btn-sm" onClick={onClose}>
          <Icon name="fa-xmark" /> Close
        </button>
      </div>
      <div className="scroll-y" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", paddingRight: "8px" }}>
        {entries.map((e) => (
          <div key={e.k} style={{
            display: "flex", alignItems: "center", gap: "14px",
            background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)",
            borderRadius: "11px", padding: "11px 14px"
          }}>
            <span className="mono" style={{ fontSize: "11px", color: "var(--daf-gold)", minWidth: "132px" }}>{e.k}</span>
            <span style={{ background: "#fff", borderRadius: "8px", padding: "5px 12px", minWidth: "104px", textAlign: "center" }}>
              <MathEl omml={e.omml} size="md" />
            </span>
            <code style={{
              flex: 1, fontSize: "10px", color: "#9fc2bd", overflow: "hidden",
              whiteSpace: "nowrap", textOverflow: "ellipsis", fontFamily: "'JetBrains Mono', monospace"
            }}>{e.omml.replace(/\s+/g, " ").slice(0, 92)}…</code>
            <button className={"btn btn-sm " + (copied === e.k ? "btn-gold" : "btn-ghost")} onClick={() => copy(e.k, e.omml)}>
              <Icon name={copied === e.k ? "fa-check" : "fa-copy"} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Frame({ meta, stage, children, quest }) {
  const vref = useRef(null);
  useEffect(() => {
    if (!window.gsap || !vref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const items = vref.current.querySelectorAll(".glass-panel, .glass-card, .gsap-auto");
      if (items.length) {
        window.gsap.fromTo(items,
          { y: 22, opacity: 0, scale: 0.985 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.55, ease: "power3.out" });
      }
    } catch (e) {}
  }, [meta.title]);

  const ph = PHASES[meta.phase];
  const st = stage && STAGES[stage];
  return (
    <div className="screen">
      <section className="copy">
        <Star8 className="copy-star" />
        {st && (
          <div className="stage-chip" title={st.aim}>
            <span>Stage {stage}</span><em>{st.name}</em><span>{st.timing}</span>
          </div>
        )}
        <div className="phase-tag"><Star8 style={{ width: "12px", height: "12px" }} /> {ph.label}</div>
        <h1 dangerouslySetInnerHTML={{ __html: meta.title }} />
        <p className="lead">{meta.lead}</p>
        <div className="goal"><b>Goal · </b>{meta.goal}</div>
        {quest && <div className="quest-strip" role="note">
          <b><Icon name="fa-route" /> Quest · {quest.storyBeat}</b>
          <span>{quest.studentMission}</span>
        </div>}
      </section>
      <section className="visual" ref={vref}>
        <Boundary>{children}</Boundary>
      </section>
    </div>
  );
}

/* ===========================================================================
   THE SEVEN STAGES · sequence assembly
   Content at home. Thinking in class. Evidence on the wall.

   The lesson file keeps its own metas + Visual switch untouched — its
   mathematical content is stage 3 (knowledge building) from the cold open
   through the board, stage 6 (the mastery gate) at its formative check, and
   stage 7 (smart production) at its closing. The engine interleaves the four
   stage screens around that content:

     0  stage 1  Preparation         (engine — the briefing sent before class)
     1  stage 2  Intelligent Diagnose (engine — the gap map, not a grade)
     2… stage 3  Knowledge Building   (lesson screens 0 … swyk-1)
     …  stage 4  Practice            (engine — guided, then independent)
     …  stage 5  Production / B       (engine — the critic, never an author)
     …  stage 6  Mastery Gate         (the lesson's formative check + lanes)
     …  stage 7  Smart Production     (the lesson's closing + the wall)

   Review decks (bosses) carry no stage plan and keep their original
   sequence — stageSequence() degrades to the identity mapping for them.
   =========================================================================== */
function stageSequence() {
  const metas = LESSON.metas;
  const plan = (window.DAF_STAGE && window.DAF_STAGE.lessons &&
    window.DAF_STAGE.lessons[LESSON.code]) || null;
  let swykIdx = -1;
  metas.forEach((m, i) => { if (m.phase === "swyk") swykIdx = i; });
  const out = { metas: metas.slice(), stages: metas.map(() => 0),
                visuals: metas.map((m, i) => i), plan: plan, offset: 0 };
  if (!plan || !plan.screens || swykIdx < 1 || swykIdx >= metas.length - 1) return out;
  const S = plan.screens;
  /* the LAST swyk case is the stage-6 gate; earlier formative checks in the
     same lesson keep their plain check UI (GateLanes reads this) */
  window.__DAF_FINAL_GATE_CASE = swykIdx;
  out.offset = 2;
  out.metas = [S.prep, S.diagnose];
  out.stages = [1, 2];
  out.visuals = ["stage:prep", "stage:diagnose"];
  for (let i = 0; i < swykIdx; i++) { out.metas.push(metas[i]); out.stages.push(3); out.visuals.push(i); }
  out.metas.push(S.practice, S.critic, metas[swykIdx]);
  out.stages.push(4, 5, 6);
  out.visuals.push("stage:practice", "stage:critic", swykIdx);
  for (let i = swykIdx + 1; i < metas.length; i++) { out.metas.push(metas[i]); out.stages.push(7); out.visuals.push(i); }
  return out;
}
const SEQ = stageSequence();

function StageScreens({ k, award, game }) {
  switch (k) {
    case "prep": return <StagePrep />;
    case "diagnose": return <GapMap />;
    case "practice": return <PracticeSprint award={award} />;
    case "critic": return <CriticBoard award={award} />;
    default: return null;
  }
}

/* ===========================================================================
   6 · APP
   =========================================================================== */
/* ===========================================================================
   BOARD MODE  ·  the class roster, attendance, attribution and export
   =========================================================================== */
const ROSTER = window.DAF_ROSTER || { sections: {} };
const BEHAV = ROSTER.behaviours || { positive: [], needsWork: [], steps: [1, 5, 10] };

/* Pasted classes are remembered on this computer where the browser allows it,
   so the list only has to be pasted once, not once per lesson. Opened from a
   file:// path some browsers refuse storage — the paste box always still works. */
const CLASS_STORE = "daf.classes.v1";
function loadClasses() {
  try { return JSON.parse(window.localStorage.getItem(CLASS_STORE) || "{}") || {}; }
  catch (e) { return {}; }
}
function saveClass(name, names) {
  try {
    const all = loadClasses();
    all[name] = names;
    window.localStorage.setItem(CLASS_STORE, JSON.stringify(all));
  } catch (e) {}
}
function dropClass(name) {
  try {
    const all = loadClasses();
    delete all[name];
    window.localStorage.setItem(CLASS_STORE, JSON.stringify(all));
  } catch (e) {}
}

function SectionGate({ onStart }) {
  const built = Object.keys(ROSTER.sections || {});
  const [saved, setSaved] = useState(loadClasses);
  const savedNames = Object.keys(saved);
  const [tab, setTab] = useState(built.length || savedNames.length ? "saved" : "paste");
  const [label, setLabel] = useState("");
  const [text, setText] = useState("");
  const [remember, setRemember] = useState(true);
  const parsed = parseNames(text);

  const start = () => {
    if (!parsed.length) return;
    const nm = (label || "").trim() || "Class";
    if (remember) { saveClass(nm, parsed); }
    onStart(nm, parsed);
  };

  return (
    <div className="gate">
      <div className="gate-card wide">
        <Star8 style={{ width: "48px", height: "48px", color: "var(--daf-gold)", margin: "0 auto 10px", display: "block" }} />
        <h2>Which class is in the room?</h2>
        <p>{LESSON.code} · {LESSON.title}</p>

        <div className="gate-tabs">
          <button className={"gate-tab" + (tab === "saved" ? " on" : "")} onClick={() => setTab("saved")}>
            <Icon name="fa-users" /> My classes
          </button>
          <button className={"gate-tab" + (tab === "paste" ? " on" : "")} onClick={() => setTab("paste")}>
            <Icon name="fa-paste" /> Paste a name list
          </button>
        </div>

        {tab === "saved" ? (
          <div>
            <div className="gate-sections">
              {built.map((n) => (
                <button key={n} className="btn btn-primary"
                  onClick={() => onStart(n, (ROSTER.sections || {})[n] || [])}>
                  {n}<em>{((ROSTER.sections || {})[n] || []).length}</em>
                </button>
              ))}
              {savedNames.map((n) => (
                <span key={n} className="saved-class">
                  <button className="btn btn-gold" onClick={() => onStart(n, saved[n])}>
                    {n}<em>{saved[n].length}</em>
                  </button>
                  <button className="saved-x" title="Forget this class"
                    onClick={() => { dropClass(n); setSaved(loadClasses()); }}>
                    <Icon name="fa-xmark" />
                  </button>
                </span>
              ))}
            </div>
            {!built.length && !savedNames.length && (
              <div className="gate-note">No classes saved yet — paste a name list.</div>
            )}
            <div className="gate-note">
              Not your class? <b style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setTab("paste")}>Paste a different list.</b>
            </div>
          </div>
        ) : (
          <div className="paste-wrap">
            <input className="paste-name" value={label} maxLength={24}
              placeholder="Class name — 4A, 4B, Grade 4 Green…"
              onChange={(e) => setLabel(e.target.value)} />
            <textarea className="paste-area" value={text}
              placeholder={"Paste the whole class here.\n\nOne name per line, or separated by commas — straight out of a register, a spreadsheet column or a WhatsApp list all work. Numbering like 1. or 1) is stripped."}
              onChange={(e) => setText(e.target.value)} />
            <div className="paste-foot">
              <span className="paste-count">
                <b>{parsed.length}</b> {parsed.length === 1 ? "student" : "students"} read
                {parsed.length ? " · " + parsed.slice(0, 3).join(", ") + (parsed.length > 3 ? "…" : "") : ""}
              </span>
              <label className="paste-remember">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember on this computer
              </label>
            </div>
            <button className="btn btn-primary" disabled={!parsed.length}
              style={{ marginTop: "12px", minWidth: "260px", opacity: parsed.length ? 1 : .45 }}
              onClick={start}>
              <Icon name="fa-arrow-right" /> Start with {parsed.length} student{parsed.length === 1 ? "" : "s"}
            </button>
          </div>
        )}
        <div className="gate-note">Nothing is tracked until a class is chosen.</div>
      </div>
    </div>
  );
}

/* ===========================================================================
   THE DOJO  ·  one full-screen class board — press P, or tap the class chip
   ClassDojo rules: arm a reason once, then every student you tap gets it
   INSTANTLY — sound, floating points, bouncing bubble. No select-then-confirm.
   Undo is always one tap away. Attendance is a mode, not a gate.
   =========================================================================== */

/* -- tiny synthesised sounds: no files, works offline ---------------------- */
let __ac = null;
function tone(seq) {
  try {
    __ac = __ac || new (window.AudioContext || window.webkitAudioContext)();
    if (__ac.state === "suspended") __ac.resume();
    const t = __ac.currentTime;
    seq.forEach((n) => {
      const o = __ac.createOscillator(), g = __ac.createGain();
      o.type = n[3] || "sine"; o.frequency.value = n[0];
      g.gain.setValueAtTime(0.0001, t + n[1]);
      g.gain.exponentialRampToValueAtTime(n[4] || 0.09, t + n[1] + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + n[1] + n[2]);
      o.connect(g); g.connect(__ac.destination);
      o.start(t + n[1]); o.stop(t + n[1] + n[2] + 0.05);
    });
  } catch (e) {}
}
const sndPlus  = () => tone([[880, 0, .12], [1318.5, .085, .22]]);
const sndMinus = () => tone([[311, 0, .16, "triangle"], [233, .11, .26, "triangle"]]);
const sndTick  = () => tone([[1046, 0, .05, "square", .03]]);
const sndLand  = () => tone([[659, 0, .1], [880, .09, .1], [1318.5, .18, .3]]);

/* -- deterministic cheerful avatar per name -------------------------------- */
const AV_SKINS = [
  ["#2D70B3", "#6BB1F0"], ["#388C46", "#7ED08C"], ["#6042A6", "#A98BE3"],
  ["#FA7E19", "#FFBD73"], ["#C74440", "#F2938F"], ["#12857C", "#53CDBF"],
  ["#B3488F", "#E795C9"], ["#8A6D1B", "#E3C65B"]
];
function nameHash(n) {
  let h = 5381;
  for (let i = 0; i < n.length; i++) h = ((h * 33) ^ n.charCodeAt(i)) >>> 0;
  return h;
}
function Avatar({ name }) {
  const h = nameHash(String(name));
  const skin = AV_SKINS[h % AV_SKINS.length];
  const gid = "av" + (h % 99991);
  const rx = 16 + (h >> 3) % 12;          /* body roundness */
  const hat = (h >> 5) % 3;               /* 0 antenna · 1 horns · 2 tuft   */
  const eyes = (h >> 7) % 4 === 0 ? 1 : 2; /* the occasional cyclops        */
  const smile = 40 + ((h >> 9) % 6);
  return (
    <svg viewBox="0 0 64 64" className="dj-av" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skin[1]} /><stop offset="1" stopColor={skin[0]} />
        </linearGradient>
      </defs>
      {hat === 0 && <g><line x1="32" y1="12" x2="32" y2="4" stroke={skin[0]} strokeWidth="3" />
        <circle cx="32" cy="4" r="3.4" fill={skin[1]} /></g>}
      {hat === 1 && <g><path d="M14 16 L10 5 L22 11 Z" fill={skin[0]} />
        <path d="M50 16 L54 5 L42 11 Z" fill={skin[0]} /></g>}
      {hat === 2 && <g><circle cx="26" cy="8" r="4" fill={skin[1]} />
        <circle cx="34" cy="6" r="4.6" fill={skin[0]} /><circle cx="41" cy="9" r="3.4" fill={skin[1]} /></g>}
      <rect x="7" y="10" width="50" height="48" rx={rx} fill={"url(#" + gid + ")"} />
      {eyes === 2 ? (
        <g><circle cx="23" cy="30" r="7" fill="#fff" /><circle cx="41" cy="30" r="7" fill="#fff" />
          <circle cx="24.5" cy="31" r="3" fill="#10242B" /><circle cx="42.5" cy="31" r="3" fill="#10242B" /></g>
      ) : (
        <g><circle cx="32" cy="29" r="9.5" fill="#fff" /><circle cx="33" cy="30.5" r="4" fill="#10242B" /></g>
      )}
      <path d={"M24 " + smile + " Q32 " + (smile + 7) + " 40 " + smile}
        fill="none" stroke="#10242B" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function Dojo({ game, dispatch, job, onClose }) {
  const steps = (BEHAV.steps || [1, 5, 10]).slice(0, 3);
  const [armed, setArmed] = useState({ amount: steps[0] || 1, reason: "Quick +" + (steps[0] || 1), metric: null });
  const [mode, setMode] = useState("points");        /* "points" | "attendance" */
  const [bursts, setBursts] = useState({});          /* name -> {k, amt} for animations */
  const [hot, setHot] = useState(null);              /* random-picker spotlight */
  const [spinning, setSpinning] = useState(false);
  const [extra, setExtra] = useState("");
  const jobTaps = useRef([]);

  const all = Object.keys(game.s);
  const present = all.filter((n) => game.present[n]);
  const last = game.log.length ? game.log[game.log.length - 1] : null;

  const fire = (names, amount, reason, metric) => {
    /* amount 0 with a metric is a RECORDED lane (the mastery gate): it logs
       who was tapped without paying points — a judgement, not a reward. */
    if (!names.length || (amount === 0 && !metric)) return;
    dispatch({ type: "grant", names: names, amount: amount, metric: metric || null, reason: reason });
    (amount >= 0 ? sndPlus : sndMinus)();
    if (amount === 0) return;
    setBursts((b) => {
      const nb = Object.assign({}, b);
      names.forEach((n) => { nb[n] = { k: ((b[n] && b[n].k) || 0) + 1, amt: amount }; });
      return nb;
    });
  };

  /* finishing hands the tap count back to the lesson screen (SWYK rows) */
  const finish = () => {
    if (job) {
      if (job.done) job.done(jobTaps.current.length);
      jobTaps.current = [];
    }
    onClose();
  };

  const tap = (n) => {
    if (mode === "attendance") { dispatch({ type: "presence", name: n }); sndTick(); return; }
    if (!game.present[n]) return;
    if (spinning) return;
    if (hot) setHot(null);
    if (job) {
      fire([n], job.amount, job.text || "Lesson award", job.metric);
      jobTaps.current.push(n);
      if (job.single) {
        if (job.slot) dispatch({ type: "sijill", slot: job.slot, name: n });
        setTimeout(finish, 650);
      }
      return;
    }
    fire([n], armed.amount, armed.reason, armed.metric);
  };

  const everyone = () => {
    if (mode === "attendance" || !present.length) return;
    if (job) { fire(present, job.amount, job.text || "Lesson award", job.metric);
               jobTaps.current = jobTaps.current.concat(present); return; }
    fire(present, armed.amount, armed.reason, armed.metric);
  };

  const spin = () => {
    if (spinning || present.length < 2 || mode === "attendance") return;
    setSpinning(true); setHot(null);
    const order = present.slice();
    const target = order[Math.floor(Math.random() * order.length)];
    let i = 0, hops = 12 + Math.floor(Math.random() * 6), delay = 70;
    const step = () => {
      if (i < hops) { setHot(order[i % order.length]); sndTick(); i++; delay *= 1.15; setTimeout(step, delay); }
      else { setHot(target); sndLand(); setSpinning(false); }
    };
    step();
  };

  const addName = () => {
    parseNames(extra).forEach((n) => dispatch({ type: "addStudent", name: n }));
    setExtra("");
  };

  /* the dojo owns its own keys so closing always settles a pending award */
  useEffect(() => {
    const fn = (e) => {
      const tg = ((e.target && e.target.tagName) || "").toLowerCase();
      if (tg === "input" || tg === "textarea" || tg === "select") return;
      const k = (e.key || "").toLowerCase();
      if (e.key === "Escape" || k === "p" || k === "n") { e.preventDefault(); finish(); }
      if (k === "u" && game.log.length) { e.preventDefault(); dispatch({ type: "undo" }); sndTick(); }
    };
    addEventListener("keydown", fn);
    return () => removeEventListener("keydown", fn);
  }, [job, game.log.length]);

  const chip = (label, icon, amount, metric, kind, key) => (
    <button key={key} className={"dj-chip " + kind +
        (armed.reason === label && armed.amount === amount ? " on" : "")}
      onClick={() => { setArmed({ amount: amount, reason: label, metric: metric || null }); sndTick(); }}>
      <Icon name={icon} /><span>{label}</span><em>{amount > 0 ? "+" + amount : amount}</em>
    </button>
  );

  return (
    <div className="dojo">
      <div className="dj-top">
        <div className="dj-title">
          <b>{game.section}</b>
          <span>{present.length} of {all.length} here · <em className="dj-star">★ {game.classXp}</em></span>
        </div>
        {job ? (
          <div className="dj-job">
            <Icon name="fa-bullseye" />
            <span>{job.text}</span>
            <em>{job.amount === 0 ? "record only — tap students"
              : job.amount > 0 ? "+" + job.amount + " each — tap students"
              : job.amount + " each — tap students"}</em>
          </div>
        ) : (
          <div className="dj-tools">
            <button className="btn btn-ghost btn-sm" onClick={spin} disabled={spinning}>
              <Icon name="fa-dice" /> Random
            </button>
            <button className="btn btn-ghost btn-sm" onClick={everyone}>
              <Icon name="fa-users" /> Everyone {armed.amount > 0 ? "+" + armed.amount : armed.amount}
            </button>
            <button className={"btn btn-sm " + (mode === "attendance" ? "btn-gold" : "btn-ghost")}
              onClick={() => { setMode(mode === "attendance" ? "points" : "attendance"); setHot(null); }}>
              <Icon name="fa-user-check" /> Attendance
            </button>
          </div>
        )}
        <div className="dj-tools">
          <button className="btn btn-ghost btn-sm" disabled={!last} style={{ opacity: last ? 1 : .4 }}
            onClick={() => { dispatch({ type: "undo" }); sndTick(); }}>
            <Icon name="fa-rotate-left" /> Undo
          </button>
          <button className="btn btn-gold btn-sm" onClick={finish}>
            <Icon name={job ? "fa-check" : "fa-xmark"} /> {job ? "Done" : "Close"}
          </button>
        </div>
      </div>

      {!job && mode === "points" && (
        <div className="dj-reasons">
          {steps.map((v) => chip("Quick +" + v, "fa-bolt", v, null, "good", "q" + v))}
          {(BEHAV.positive || []).map((b, i) => chip(b.label, b.icon || "fa-star", b.xp, b.metric, "good", "p" + i))}
          <span className="dj-sep" />
          {(BEHAV.needsWork || []).map((b, i) => chip(b.label, b.icon || "fa-circle-minus", b.xp, null, "bad", "n" + i))}
        </div>
      )}
      {!job && mode === "attendance" && (
        <div className="dj-reasons dj-att">
          <span className="dj-att-note"><Icon name="fa-hand-pointer" /> Tap a student to flip here / absent.</span>
          <input value={extra} placeholder="Someone missing? Type a name"
            onChange={(e) => setExtra(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addName(); }} />
          <button className="btn btn-ghost btn-sm" onClick={addName}><Icon name="fa-plus" /> Add</button>
        </div>
      )}

      <div className="dj-grid">
        {all.map((n) => {
          const st = game.s[n] || BLANK;
          const b = bursts[n];
          const away = !game.present[n];
          return (
            <button key={n} onClick={() => tap(n)}
              className={"dj-card" + (away ? " away" : "") + (hot === n ? " hot" : "")}>
              {b && <span key={"burst" + b.k} className={"dj-burst" + (b.amt < 0 ? " neg" : "")}>
                {b.amt > 0 ? "+" + b.amt : b.amt}</span>}
              <span key={"pop" + ((b && b.k) || 0)}
                className={"dj-body" + (b ? (b.amt < 0 ? " shake" : " pop") : "")}>
                <Avatar name={n} />
                <span className={"dj-bubble" + (st.xp < 0 ? " neg" : "")}>{st.xp}</span>
              </span>
              <span className="dj-name">{n}</span>
              {away && <span className="dj-away-tag">absent</span>}
            </button>
          );
        })}
      </div>

      <div className="dj-foot">
        <span className="dj-last">
          {last
            ? <span><em className={last.amount < 0 ? "neg" : "pos"}>
                {last.amount > 0 ? "+" + last.amount : last.amount}</em>{" "}
                {last.names.length === 1 ? last.names[0] : last.names.length + " students"} · {last.reason}</span>
            : <span>Arm a reason above, then tap students — every tap lands instantly.</span>}
        </span>
        <span className="dj-exports">
          <a onClick={() => exportSheet(game, "csv")}><Icon name="fa-file-csv" /> class sheet</a>
          <a onClick={() => exportSheet(game, "log")}><Icon name="fa-list-check" /> points log</a>
          <a onClick={() => folioExport(game.section)} title="Download the class folio stamps as JSON (this computer only)"><Icon name="fa-file-import" /> folio export</a>
          <a onClick={() => {
            if (window.confirm("Clear the folio stamps for " + game.section + " on this computer?")) {
              folioReset(game.section);
              window.DAF_FOLIO = folioFor(game.section);
            }
          }} title="Remove this class's folio stamps from this computer"><Icon name="fa-eraser" /> reset folio</a>
        </span>
        <span className="dj-note">
          Folio state lives only on this computer — export before switching machines; reset clears it. It stores class lesson stamps only, never student names.
        </span>
      </div>
    </div>
  );
}

/* ---- the tracking sheet -------------------------------------------------- */
function exportSheet(game, kind) {
  const stamp = new Date().toISOString().slice(0, 10);
  const mins = Math.max(1, Math.round((Date.now() - game.t0) / 60000));
  const rows = Object.keys(game.s).map((n) => {
    const st = game.s[n];
    return {
      date: stamp, section: game.section, student: n,
      lesson: LESSON.code, title: LESSON.title, standard: (LESSON.unit.split("·").pop() || "").trim(),
      present: game.present[n] ? 1 : 0,
      xp: st.xp, points_given: st.plus || 0, points_taken: st.minus || 0,
      estimates: st.estimates, commits: st.commits,
      correct: st.correct, hard_taken: st.hard, hard_correct: st.hardOk,
      sijill: st.sijill, minutes: mins
    };
  });
  const toCsv = (list) => {
    const cols = Object.keys(list[0] || {});
    return [cols.join(",")].concat(list.map((r) =>
      cols.map((c) => ('"' + String(r[c]).replace(/"/g, '""') + '"')).join(","))).join("\n");
  };
  let blob, name;
  if (kind === "json") {
    blob = new Blob([JSON.stringify({ lesson: LESSON.code, section: game.section,
      date: stamp, minutes: mins, rows: rows, log: game.log }, null, 1)], { type: "application/json" });
    name = "daf-" + game.section + "-" + LESSON.code + "-" + stamp + ".json";
  } else if (kind === "log") {
    const list = game.log.length ? game.log.map((e) => ({
      date: stamp, section: game.section, lesson: LESSON.code,
      time: new Date(e.at).toTimeString().slice(0, 5),
      amount: e.amount, reason: e.reason, students: e.names.join(" | "), count: e.names.length
    })) : [{ date: stamp, section: game.section, lesson: LESSON.code, time: "", amount: 0,
             reason: "no points recorded", students: "", count: 0 }];
    blob = new Blob(["\ufeff" + toCsv(list)], { type: "text/csv;charset=utf-8" });
    name = "daf-" + game.section + "-" + LESSON.code + "-points-log-" + stamp + ".csv";
  } else {
    blob = new Blob(["\ufeff" + toCsv(rows)], { type: "text/csv;charset=utf-8" });
    name = "daf-" + game.section + "-" + LESSON.code + "-" + stamp + ".csv";
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 400);
}

function App() {
  const url = (() => { try { return new URL(location.href); } catch (e) { return null; } })();
  const init = (() => {
    const s = parseInt((url && url.searchParams.get("slide")) || "0", 10);
    return isNaN(s) ? 0 : Math.max(0, Math.min(SEQ.metas.length - 1, s));
  })();

  const [i, setI] = useState(init);
  const [replay, setReplay] = useState(0);
  const [overview, setOverview] = useState(false);
  const [rail, setRail] = useState(false);
  const [mathList, setMathList] = useState(false);

  const [game, dispatch] = useReducer(gameReducer, null, freshGame);
  const [dojo, setDojo] = useState(false);
  const [dojoJob, setDojoJob] = useState(null);

  /* award(amount, metric, text, mode, done)
     mode "class" — everyone present, no interruption, just the flash
     mode "pick"  — opens the dojo armed with this reason; every tap lands     */
  const award = (amount, metric, text, mode, done) => {
    if (mode === "pick") { setDojoJob({ amount: amount, metric: metric, text: text, done: done }); setDojo(true); return; }
    const names = Object.keys(game.s).filter((n) => game.present[n]);
    if (!names.length) return;
    dispatch({ type: "grant", names: names, amount: amount, metric: metric, reason: text,
               text: "+" + amount + " \u00b7 whole class \u00b7 " + text });
    setTimeout(() => dispatch({ type: "clearFlash" }), 1700);
  };

  const sijill = (slot, col) => {
    setDojoJob({ amount: XP.sijill, metric: "sijill", slot: slot, single: true,
                 text: "Whose method was this? It goes into the Sijill for the year." });
    setDojo(true);
  };
  SIJILL.fn = sijill;
  SIJILL.named = game.sijillNames || {};

  const meta = SEQ.metas[i];
  /* which lesson case the engine is currently rendering — GateLanes uses it
     to know whether this check is the stage-6 gate or a mid-build check */
  window.__DAF_ACTIVE_CASE = typeof SEQ.visuals[i] === "number" ? SEQ.visuals[i] : null;
  useEffect(() => {
    const ph = PHASES[meta.phase];
    document.documentElement.style.setProperty("--c", ph.c);
    document.documentElement.style.setProperty("--c-2", ph.c2);
  }, [i]);

  /* Durable story state (PR 02): the class's folio cache is class-level only
     (lesson stamps, no student data), lives on this computer and refreshes
     when a class is picked. Missing or cleared storage degrades silently to
     position-based folio pips. */
  useEffect(() => {
    window.DAF_CURRENT_CLASS = (game && game.section) || null;
    window.DAF_FOLIO = folioFor(window.DAF_CURRENT_CLASS);
  }, [game && game.section]);

  useEffect(() => setReplay((r) => r + 1), [i]);

  /* keyboard — plain LTR: right advances, left goes back */
  useEffect(() => {
    const go = (d) => setI((x) => Math.max(0, Math.min(SEQ.metas.length - 1, x + d)));
    const fn = (e) => {
      const k = e.key;
      if (k === "Escape") { setOverview(false); setMathList(false); setRail(false); return; }
      /* never hijack a form control: a student adjusting a slider with the
         arrow keys must move the slider, not the lesson. */
      var tag = ((e.target && e.target.tagName) || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" ||
          (e.target && e.target.isContentEditable)) return;
      if (dojo) return; /* the dojo owns its own keys, including Esc, P, N */
      if (k.toLowerCase() === "p" || k.toLowerCase() === "n") { setDojo(true); return; }
      if (overview || mathList) return;
      if (k === "ArrowRight" || k === " " || k === "PageDown" || k === "ArrowDown") { e.preventDefault(); go(1); }
      else if (k === "ArrowLeft" || k === "PageUp" || k === "ArrowUp") { e.preventDefault(); go(-1); }
      else if (k === "Home") setI(0);
      else if (k === "End") setI(SEQ.metas.length - 1);
      else if (k.toLowerCase() === "r") setReplay((r) => r + 1);
      else if (k.toLowerCase() === "o") setOverview(true);
      else if (k.toLowerCase() === "t") setRail((v) => !v);
      else if (k.toLowerCase() === "m") setMathList(true);
    };
    addEventListener("keydown", fn);
    return () => removeEventListener("keydown", fn);
  }, [overview, mathList, dojo]);

  useEffect(() => {
    const mh = (e) => {
      if (e && e.data && e.data.type === "set-slide" && typeof e.data.step === "number") {
        setI(Math.max(0, Math.min(SEQ.metas.length - 1, e.data.step)));
      }
    };
    addEventListener("message", mh);
    return () => removeEventListener("message", mh);
  }, []);

  if (!game.section) return <SectionGate
    onStart={(n, list) => dispatch({ type: "roster", section: n, names: list })} />;

  return (
    <div className="app">
      <Boundary><Ambient /></Boundary>
      <Header game={game} onDojo={() => setDojo(true)}
        onOverview={() => setOverview(true)}
        onRail={() => setRail((v) => !v)}
        onMath={() => setMathList(true)} />
      <div className="progress" style={{ width: ((i + 1) / SEQ.metas.length) * 100 + "%" }} />

      {game.flash && !dojo && <div className="flash">{game.flash}</div>}

      <div className="stage-wrap" key={i + "-" + replay}>
        <Frame meta={meta} stage={SEQ.stages[i]} quest={i === 0 && typeof STORY !== "undefined" ? STORY.lesson : null}>
          {typeof SEQ.visuals[i] === "string"
            ? <StageScreens k={SEQ.visuals[i].slice(6)} award={award} game={game} />
            : <LESSON.Visual i={SEQ.visuals[i]} award={award} game={game} />}
          {SEQ.stages[i] === 7 && <EvidenceWall game={game} award={award} />}
        </Frame>
      </div>

      <div className="dots">
        {SEQ.metas.map((m, n) => (
          <span key={n} onClick={() => setI(n)}
            className={"dot" + (n === i ? " active" : "")}
            title={"Stage " + SEQ.stages[n] + " · " + PHASES[m.phase].label}
            style={n === i ? { background: PHASES[m.phase].c } : undefined} />
        ))}
      </div>

      <div className="nav">
        <button title="Replay (R)" onClick={() => setReplay((r) => r + 1)}><Icon name="fa-rotate-right" /></button>
        <button disabled={i === 0} onClick={() => setI(i - 1)}><Icon name="fa-chevron-left" /></button>
        <span className="counter">{String(i + 1).padStart(2, "0")} / {SEQ.metas.length}</span>
        <button disabled={i === SEQ.metas.length - 1} onClick={() => setI(i + 1)}><Icon name="fa-chevron-right" /></button>
      </div>

      <footer className="footer">
        <span>Dar Al Fikr Schools · {LESSON.code}</span>
        <span className="pull">{meta.pull}</span>
        <span className="mono">{String(i + 1).padStart(2, "0")} / {SEQ.metas.length}</span>
      </footer>

      {overview && <Overview current={i} onSelect={setI} onClose={() => setOverview(false)} />}
      {mathList && <MathInventory onClose={() => setMathList(false)} />}
      {rail && <TeacherRail meta={meta} onClose={() => setRail(false)} />}
      {dojo && <Dojo game={game} dispatch={dispatch} job={dojoJob}
        onClose={() => { setDojo(false); setDojoJob(null); }} />}
    </div>
  );
}

try {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
} catch (e) {
  document.body.innerHTML =
    '<div style="padding:48px;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#0B1F24;color:#EAF4F2;font-family:system-ui">' +
    '<h1 style="color:#C9A227;margin-bottom:14px">Dar Al Fikr Schools</h1>' +
    '<p style="max-width:560px;line-height:1.7;color:#a9c9c4">This interactive lesson is built with React and GSAP. ' +
    'In an offline sandboxed preview the CDN scripts cannot load.<br/><br/>' +
    '<b style="color:#C9A227">Download the file and open it directly in a browser.</b></p></div>';
}
