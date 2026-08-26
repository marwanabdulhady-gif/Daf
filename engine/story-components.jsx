/* ===========================================================================
   STORY LAYER · fictional boys, truth-status lanes, folio progress and STEM
   Reusable by every lesson. Sacred history never enters these fictional parts.
   =========================================================================== */
const STORY = window.DAF_STORY || null;

function StoryCharacter({ id, pose, size }) {
  const who = id === "zayd" ? "zayd" : "omar";
  const zayd = who === "zayd";
  const s = size || 76;
  const wave = pose === "present" || pose === "question";
  const build = pose === "build";
  const skin = zayd ? "#B9784B" : "#9C633F";
  const shirt = zayd ? "#2D70B3" : "#12857C";
  const accent = zayd ? "#FA7E19" : "#C9A227";
  const label = zayd ? "Zayd, the model builder" : "Omar, the evidence keeper";
  return (
    <svg className="story-character" style={{ width: s + "px", height: (s * 1.12) + "px" }}
      viewBox="0 0 100 112" role="img" aria-label={label}>
      <title>{label}</title>
      <ellipse cx="50" cy="106" rx="32" ry="5" fill="rgba(7,30,39,.13)" />
      <path d="M29 103 L33 61 Q50 51 67 61 L72 103 Z" fill={shirt} />
      <path d="M37 63 Q50 74 63 63" fill="none" stroke={accent} strokeWidth="3" />
      <rect x="43" y="48" width="14" height="15" rx="6" fill={skin} />
      <circle cx="50" cy="34" r="21" fill={skin} />
      <path d={zayd ? "M30 31 Q33 8 51 11 Q70 11 72 34 Q62 22 52 22 Q39 25 30 31" : "M30 29 Q35 9 51 11 Q69 10 71 31 Q60 20 48 22 Q38 24 30 29"} fill="#172E35" />
      <circle cx="42" cy="35" r="2.2" fill="#10242B" /><circle cx="58" cy="35" r="2.2" fill="#10242B" />
      <path d="M43 44 Q50 49 58 43" fill="none" stroke="#6E3F2D" strokeWidth="2" strokeLinecap="round" />
      {wave ? (
        <g><path d="M32 68 Q17 58 19 40" fill="none" stroke={skin} strokeWidth="8" strokeLinecap="round" />
          <circle cx="20" cy="37" r="5" fill={skin} /></g>
      ) : (
        <path d="M33 69 Q23 82 25 96" fill="none" stroke={skin} strokeWidth="8" strokeLinecap="round" />
      )}
      {build ? (
        <g><path d="M67 69 Q79 76 76 91" fill="none" stroke={skin} strokeWidth="8" strokeLinecap="round" />
          <rect x="68" y="86" width="21" height="11" rx="2" fill={accent} />
          <path d="M72 90h13M76 87v10M82 87v10" stroke="#fff" strokeWidth="1" /></g>
      ) : (
        <path d="M67 69 Q78 82 75 96" fill="none" stroke={skin} strokeWidth="8" strokeLinecap="round" />
      )}
      {!zayd && (
        <g transform="translate(63 72) rotate(-14)"><rect width="21" height="27" rx="2" fill="#FFFDF7" stroke={accent} strokeWidth="2" />
          <path d="M5 7h11M5 12h9M5 17h11" stroke={shirt} strokeWidth="1.5" /></g>
      )}
    </svg>
  );
}

function StoryLantern({ size }) {
  const s = size || 64;
  return (
    <svg className="story-lantern" style={{ width: s + "px", height: s + "px" }} viewBox="0 0 80 80" role="img" aria-label="The brass lantern">
      <title>The brass lantern</title>
      <path d="M31 8h18M35 8v8h10V8" fill="none" stroke="#8A6D1B" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 22 Q40 12 54 22 L59 57 Q40 69 21 57 Z" fill="#F8E8A5" stroke="#8A6D1B" strokeWidth="3" />
      <path d="M30 25h20l4 28H26z" fill="#FFF8D8" stroke="#C9A227" strokeWidth="2" />
      <path d="M40 27v24M28 40h24" stroke="#C9A227" strokeWidth="2" opacity=".8" />
      <circle cx="40" cy="40" r="7" fill="#C9A227" opacity=".42" />
      <path d="M26 61h28M31 67h18" stroke="#8A6D1B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ===========================================================================
   SUPPORTING CAST · fictional quest givers, the guide and the rival
   (docs/plans/narrative/03-supporting-cast.md). Original fictional people of
   present-day Jeddah — flat vector, modest contemporary clothing. Sacred
   history never enters these fictional parts; labels come from the payload.
   =========================================================================== */
const SUPPORTING = {
  hafizah:  { label: "Hafizah, the Lantern Keeper", jacket: "#6B5B73", accent: "#C9CDD3", skin: "#A06B45", head: "scarf", glasses: true, prop: "lantern" },
  zafir:    { label: "Ustadh Zafir, the traveling scholar", jacket: "#4A6B8A", accent: "#C9A227", skin: "#8A5A3B", head: "hair", hair: "#3A2E28", prop: "compass" },
  rashed:   { label: "Rashed, the Rival's Report", boy: true, jacket: "#7A5CA8", accent: "#F2938F", skin: "#9C633F", head: "hair", hair: "#172E35", prop: "clipboard" },
  abulaila: { label: "Abu Laila, the merchant of the souq", jacket: "#7A4E2D", accent: "#C9A227", skin: "#9C633F", head: "cap", cap: "#C9CDD3", prop: "ledger" },
  ihsan:    { label: "Ihsan, the auditor", jacket: "#3A4A5A", accent: "#C9A227", skin: "#8A5A3B", head: "hair", hair: "#2A2E33", glasses: true, prop: "seal" },
  khalida:  { label: "Khalida, the foreman", jacket: "#5A6B7A", accent: "#FA7E19", skin: "#A06B45", head: "helmet", helmet: "#FA7E19", prop: "ruler" },
  mansur:   { label: "Mansur, the caravan master", jacket: "#5A7A6B", accent: "#C9A227", skin: "#8A5A3B", head: "hair", hair: "#2A2E33", prop: "tally" },
  salma:    { label: "Salma, the council scribe", jacket: "#5A6B7A", accent: "#F2938F", skin: "#A06B45", head: "scarf", scarf: "#F2938F", prop: "quill" },
  mariam:   { label: "Mariam, the architect", jacket: "#5A4A6B", accent: "#C9A227", skin: "#A06B45", head: "band", band: "#C9A227", hair: "#2A2E33", prop: "compass" },
  munira:   { label: "Munira, the ferrywoman of the Fraction Isles", jacket: "#2D70B3", accent: "#C9A227", skin: "#A06B45", head: "scarf", scarf: "#2D70B3", prop: "oar" },
  farida:   { label: "Farida, the head cook", jacket: "#7A4E5A", accent: "#F2938F", skin: "#A06B45", head: "scarf", scarf: "#F2938F", prop: "ladle" },
  zaynab:   { label: "Zaynab, the clockmaker", jacket: "#4A6B8A", accent: "#C9A227", skin: "#A06B45", head: "band", band: "#C9A227", hair: "#2A2E33", prop: "key" },
  rashid:   { label: "Rashid, the pearl diver", jacket: "#3A6B7A", accent: "#C9CDD3", skin: "#9C633F", head: "hair", hair: "#2A2E33", prop: "mask" },
  amina:    { label: "Amina, the dockmaster", jacket: "#5A6B7A", accent: "#2D70B3", skin: "#A06B45", head: "cap", cap: "#2D70B3", prop: "clipboard" },
  yusuf:    { label: "Yusuf, the market warden", jacket: "#5A4A3A", accent: "#C75440", skin: "#8A5A3B", head: "hair", hair: "#2A2E33", prop: "balance" },
  farid:    { label: "Farid, the astronomer", jacket: "#4A4A6B", accent: "#6042A6", skin: "#8A5A3B", head: "band", band: "#6042A6", hair: "#2A2E33", prop: "astrolabe" }
};

function SupportProp({ kind, accent, jacket }) {
  switch (kind) {
    case "lantern":
      return <g transform="translate(64 66) scale(0.62)"><path d="M11 0h8M13 0v4h4V0" fill="none" stroke="#8A6D1B" strokeWidth="2.4" strokeLinecap="round" /><path d="M7 9 Q15 4 23 9 L25 26 Q15 31 5 26 Z" fill="#F8E8A5" stroke="#8A6D1B" strokeWidth="2" /><path d="M9 28h12M11 31h8" stroke="#8A6D1B" strokeWidth="2" strokeLinecap="round" /></g>;
    case "compass":
      return <g transform="translate(74 84)"><circle r="9" fill="none" stroke={accent} strokeWidth="2.4" /><path d="M0 -6 L3 3 L-3 3 Z" fill={accent} /><path d="M0 9 v6 M-4 15 h8" stroke={accent} strokeWidth="1.6" fill="none" /></g>;
    case "clipboard":
      return <g transform="translate(66 72) rotate(8)"><rect width="18" height="24" rx="2" fill="#FFFDF7" stroke={accent} strokeWidth="2" /><rect x="4" y="-2" width="10" height="5" rx="1.5" fill={accent} /><path d="M4 8h10M4 13h8M4 18h10" stroke={jacket} strokeWidth="1.4" /></g>;
    case "ledger":
      return <g transform="translate(63 70) rotate(-14)"><rect width="22" height="28" rx="2" fill="#FFFDF7" stroke={accent} strokeWidth="2" /><path d="M5 8h12M5 13h10M5 18h12M5 23h8" stroke={jacket} strokeWidth="1.5" /></g>;
    case "seal":
      return <g transform="translate(76 82)"><circle r="8" fill="none" stroke={accent} strokeWidth="3" /><circle r="3" fill={accent} /><path d="M-8 8 Q-12 16 -6 18" stroke={accent} strokeWidth="2" fill="none" /></g>;
    case "ruler":
      return <g transform="translate(64 74) rotate(24)"><rect width="30" height="7" rx="1.5" fill="#C9CDD3" stroke={accent} strokeWidth="1.4" /><path d="M5 0v4M10 0v3M15 0v4M20 0v3M25 0v4" stroke={jacket} strokeWidth="1.2" /></g>;
    case "tally":
      return <g transform="translate(74 70) rotate(8)"><rect x="-2" width="5" height="30" rx="2" fill="#C9CDD3" stroke={accent} strokeWidth="1.4" /><path d="M-2 8h5M-2 14h5M-2 20h5" stroke={jacket} strokeWidth="1.4" /></g>;
    case "quill":
      return <g transform="translate(70 66) rotate(30)"><path d="M0 26 Q6 10 26 0 Q18 16 8 24 Z" fill="#FFFDF7" stroke={accent} strokeWidth="1.6" /><path d="M2 24 L14 8" stroke={accent} strokeWidth="1.2" /></g>;
    case "oar":
      return <g transform="translate(72 60) rotate(18)"><path d="M2 0 v44" stroke="#8A6D1B" strokeWidth="3" strokeLinecap="round" /><ellipse cx="2" cy="48" rx="7" ry="10" fill="none" stroke="#8A6D1B" strokeWidth="2.6" /></g>;
    case "ladle":
      return <g transform="translate(72 68) rotate(12)"><path d="M0 0 v26" stroke={accent} strokeWidth="3" strokeLinecap="round" /><circle cx="0" cy="32" r="7" fill="none" stroke={accent} strokeWidth="2.6" /></g>;
    case "key":
      return <g transform="translate(76 76)"><circle r="7" fill="none" stroke={accent} strokeWidth="2.6" /><path d="M0 7 v10 M0 13 h5 M0 17 h4" stroke={accent} strokeWidth="2.2" /></g>;
    case "mask":
      return <g transform="translate(72 78)"><circle cx="-6" r="6" fill="none" stroke={accent} strokeWidth="2.4" /><circle cx="6" r="6" fill="none" stroke={accent} strokeWidth="2.4" /><path d="M0 -5 v-6 M-11 -3 Q-16 -8 -14 -12 M11 -3 Q16 -8 14 -12" stroke={accent} strokeWidth="1.6" fill="none" /></g>;
    case "balance":
      return <g transform="translate(74 72)"><path d="M0 0 v18 M-10 18 h20" stroke={accent} strokeWidth="2.4" /><path d="M-14 2 h28" stroke={accent} strokeWidth="2.2" /><path d="M-14 2 l-4 8 h8 Z M14 2 l-4 8 h8 Z" fill="none" stroke={accent} strokeWidth="1.8" /></g>;
    case "astrolabe":
      return <g transform="translate(76 82)"><circle r="10" fill="none" stroke={accent} strokeWidth="2.4" /><circle r="5" fill="none" stroke={accent} strokeWidth="1.4" /><path d="M0 -10 L4 0 L0 10 L-4 0 Z" fill="none" stroke={accent} strokeWidth="1.4" /></g>;
    default: return null;
  }
}

function SupportCharacter({ id, size }) {
  const c = SUPPORTING[id];
  if (!c) return null;
  const s = size || 48;
  const H = c.boy ? 112 : 120;
  const payload = (STORY && STORY.supporting || []).find((p) => p.id === id);
  const label = payload ? payload.name + ", " + payload.role : c.label;
  const scarfCol = c.scarf || c.accent;
  return (
    <svg className="story-character story-support" style={{ width: s + "px", height: (s * H / 100) + "px" }}
      viewBox={"0 0 100 " + H} role="img" aria-label={label}>
      <title>{label}</title>
      <ellipse cx="50" cy={H - 7} rx="32" ry="5" fill="rgba(7,30,39,.13)" />
      <path d={c.boy ? "M31 103 L34 64 Q50 55 66 64 L70 103 Z" : "M28 110 L33 60 Q50 50 67 60 L72 110 Z"} fill={c.jacket} />
      <path d={c.boy ? "M38 66 Q50 76 62 66" : "M37 63 Q50 74 63 63"} fill="none" stroke={c.accent} strokeWidth="3" />
      <rect x="43" y="46" width="14" height="15" rx="6" fill={c.skin} />
      <circle cx="50" cy="33" r="21" fill={c.skin} />
      {c.head === "scarf" && <path d="M27 30 Q28 9 50 8 Q72 9 73 30 Q73 42 66 44 L66 26 Q50 18 34 26 L34 44 Q27 42 27 30 Z M66 42 Q74 52 68 60 L62 50 Z" fill={scarfCol} />}
      {c.head === "hair" && <path d="M30 29 Q34 9 51 10 Q69 10 71 30 Q61 19 49 21 Q38 23 30 29 Z" fill={c.hair} />}
      {c.head === "cap" && <><path d="M28 28 Q32 10 50 10 Q68 10 72 28 Q50 20 28 28 Z" fill={c.cap} /><path d="M26 28 h48" stroke={c.cap} strokeWidth="4" strokeLinecap="round" /></>}
      {c.head === "helmet" && <><path d="M28 30 Q30 8 50 8 Q70 8 72 30 Q50 22 28 30 Z" fill={c.helmet} /><path d="M25 30 h50" stroke={c.helmet} strokeWidth="4" strokeLinecap="round" /></>}
      {c.head === "band" && <><path d="M30 29 Q34 9 51 10 Q69 10 71 30 Q61 19 49 21 Q38 23 30 29 Z" fill={c.hair} /><path d="M28 27 Q50 16 72 27" stroke={c.band} strokeWidth="4" fill="none" strokeLinecap="round" /></>}
      <circle cx="42" cy="34" r="2.2" fill="#10242B" /><circle cx="58" cy="34" r="2.2" fill="#10242B" />
      {c.glasses && <><circle cx="42" cy="34" r="6" fill="none" stroke="#10242B" strokeWidth="1.4" /><circle cx="58" cy="34" r="6" fill="none" stroke="#10242B" strokeWidth="1.4" /><path d="M48 34h4" stroke="#10242B" strokeWidth="1.4" /></>}
      <path d="M43 43 Q50 48 58 42" fill="none" stroke="#6E3F2D" strokeWidth="2" strokeLinecap="round" />
      <path d={c.boy ? "M33 70 Q24 82 26 94" : "M32 66 Q22 82 24 98"} fill="none" stroke={c.skin} strokeWidth="8" strokeLinecap="round" />
      <path d={c.boy ? "M67 70 Q76 80 74 90" : "M68 66 Q78 78 76 88"} fill="none" stroke={c.skin} strokeWidth="8" strokeLinecap="round" />
      <circle cx={c.boy ? 74 : 76} cy={c.boy ? 91 : 90} r="5" fill={c.skin} />
      <SupportProp kind={c.prop} accent={c.accent} jacket={c.jacket} />
    </svg>
  );
}


function UnitShapeMotif({ topic }) {
  if (topic !== 1) return <Star8 className="story-motif" />;
  return (
    <svg className="story-motif" viewBox="0 0 180 100" aria-hidden="true">
      <path d="M8 85 Q28 52 48 85 Q68 52 88 85 Q108 52 128 85 Q148 52 172 85" fill="none" stroke="currentColor" strokeWidth="3" />
      {[14, 42, 70, 98, 126, 154].map((x, i) => <rect key={x} x={x} y={18 + (i % 2) * 10} width="20" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />)}
      <path d="M18 58h140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5" />
    </svg>
  );
}

/* Pips light from the class's stamped folio state when this computer has it
   (daf.folio.v1); otherwise they fall back to position in the unit. The state
   is class-level only — never student data — and non-critical: a cleared
   browser changes nothing else in the deck. */
function FolioProgress({ label }) {
  if (!STORY) return null;
  const n = STORY.lesson.numberInUnit, total = STORY.unit.lessonCount;
  const codes = (STORY.unit && STORY.unit.lessonCodes) || [];
  const stamped = (window.DAF_FOLIO && window.DAF_FOLIO.lessons) || null;
  const done = (i) => stamped ? !!stamped[codes[i]] : i < n;
  return (
    <div className="folio-progress" aria-label={`Folio progress ${n} of ${total}`}>
      <div className="folio-label"><b>Folio {STORY.unit.topic}</b><span>{label || STORY.unit.chapter}</span></div>
      <div className="folio-pips">
        {Array.from({ length: total }, (_, i) => <i key={i} className={done(i) ? "restored" : ""} />)}
      </div>
      <em>{n}/{total}</em>
    </div>
  );
}

const STORY_LANES = {
  fiction: { label: "Our story", icon: "fa-book-open", cls: "fiction" },
  stem: { label: "History of useful knowledge", icon: "fa-compass-drafting", cls: "stem" },
  amanah: { label: "Amanah Window", icon: "fa-book", cls: "amanah" }
};

function StoryShell({ lane, character, pose, support, title, text, clue, children, compact }) {
  const info = STORY_LANES[lane || "fiction"];
  const topic = STORY && STORY.unit ? STORY.unit.topic : 0;
  return (
    <div className={"story-shell lane-" + info.cls + (compact ? " compact" : "")}>
      <div className="story-ribbon">
        <UnitShapeMotif topic={topic} />
        <div className="story-cast">
          {character === "both" ? <><StoryCharacter id="omar" pose={pose} size={52} /><StoryCharacter id="zayd" pose={pose} size={52} /></>
            : character === "lantern" ? <StoryLantern size={58} />
            : character ? <StoryCharacter id={character} pose={pose} size={60} />
            : <StoryLantern size={54} />}
          {support ? <SupportCharacter id={support} size={46} /> : null}
        </div>
        <div className="story-ribbon-copy">
          <span className="story-lane"><Icon name={info.icon} /> {info.label}</span>
          <b>{title}</b>
          <p>{text}</p>
          {clue && <small><Icon name="fa-key" /> {clue}</small>}
        </div>
        <FolioProgress />
      </div>
      <div className="story-content">{children}</div>
    </div>
  );
}

function STEMWindow({ window: item, children }) {
  if (!item) return <>{children}</>;
  return (
    <StoryShell lane="stem" title={item.title} text={item.studentText} clue={item.inquiry} compact>
      <div className="stem-layout">
        <div className="stem-source-card">
          <div className="stem-status"><Icon name="fa-circle-check" /> {item.status}</div>
          <h3>Why this matters now</h3>
          <p>{item.modernConnection}</p>
          <details>
            <summary>Teacher source notes</summary>
            <p>{item.teacherNote}</p>
            {(item.sources || []).map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}
          </details>
        </div>
        <div className="stem-math">{children}</div>
      </div>
    </StoryShell>
  );
}

function StoryHandoff({ title, text, artifact, next, support, children }) {
  const code = (typeof LESSON !== "undefined" && LESSON.code) || "";
  const [stamped, setStamped] = useState(false);
  const [saved, setSaved] = useState(true);
  useEffect(() => {
    setStamped(!!(window.DAF_FOLIO && window.DAF_FOLIO.lessons && window.DAF_FOLIO.lessons[code]));
  }, [code]);
  const stamp = () => {
    const cls = window.DAF_CURRENT_CLASS;
    if (!cls || !code) return;
    const on = !(window.DAF_FOLIO && window.DAF_FOLIO.lessons && window.DAF_FOLIO.lessons[code]);
    setSaved(folioStamp(cls, code, on));
    window.DAF_FOLIO = folioFor(cls);
    setStamped(!!(window.DAF_FOLIO.lessons && window.DAF_FOLIO.lessons[code]));
  };
  return (
    <StoryShell lane="fiction" character="both" pose="present" support={support} title={title} text={text}
      clue={next ? "Next folio clue · " + next : null}>
      <div className="handoff-artifact">
        <span><Icon name="fa-stamp" /></span>
        <div><b>Artifact updated</b><p>{artifact}</p></div>
        <button className={"btn btn-ghost btn-sm folio-stamp" + (stamped ? " on" : "")} onClick={stamp}
          title="Class record on this computer — no points involved">
          <Icon name={stamped ? "fa-rotate-left" : "fa-stamp"} />
          {stamped ? "Folio page restored · tap to undo" : "Restore this folio page"}
        </button>
        {!saved && <small className="folio-save-note">Folio change could not be saved on this computer — export the class folio from the dojo before you leave.</small>}
      </div>
      {children}
    </StoryShell>
  );
}

/* ===========================================================================
   AMANAH WINDOW · sacred-history lane (PR 02). Reverent, chronological,
   non-gamified: no XP, no clue mechanics, no invented dialogue or quantities.
   Only registry windows in `approved` state with the complete six-field audit
   record (studentText, source, translation, reviewer, reviewDate) ever render
   here; the payload embeds approved windows only, so an unapproved window is
   invisible to the deck entirely.
   =========================================================================== */
const AMANAH_LANE = "amanah";

function AmanahWindow({ window: item, children }) {
  const approved = !!(item
    && item.status === "approved"
    && item.studentText && item.reviewer && item.reviewDate && item.source && item.translation);
  if (!approved) return <>{children}</>;
  return (
    <StoryShell lane={AMANAH_LANE} title={item.title || "Amanah Window"} text={item.studentText} compact>
      <div className="amanah-layout">
        <div className="amanah-card">
          <div className="amanah-status"><Icon name="fa-book" /> Reviewed · {item.reviewer} · {item.reviewDate}</div>
          <h3>Values reflection</h3>
          <p>The reflection follows the mathematics of this lesson; sacred history is never the game mechanic.</p>
          <details>
            <summary>Teacher review record</summary>
            <p>Source: {item.source}</p>
            <p>Translation used: {item.translation}</p>
          </details>
        </div>
        <div className="stem-math">{children}</div>
      </div>
    </StoryShell>
  );
}
