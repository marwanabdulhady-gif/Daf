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

function FolioProgress({ label }) {
  if (!STORY) return null;
  const n = STORY.lesson.numberInUnit, total = STORY.unit.lessonCount;
  return (
    <div className="folio-progress" aria-label={`Folio progress ${n} of ${total}`}>
      <div className="folio-label"><b>Folio {STORY.unit.topic}</b><span>{label || STORY.unit.chapter}</span></div>
      <div className="folio-pips">
        {Array.from({ length: total }, (_, i) => <i key={i} className={i < n ? "restored" : ""} />)}
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

function StoryShell({ lane, character, pose, title, text, clue, children, compact }) {
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

function StoryHandoff({ title, text, artifact, next, children }) {
  return (
    <StoryShell lane="fiction" character="both" pose="present" title={title} text={text}
      clue={next ? "Next folio clue · " + next : null}>
      <div className="handoff-artifact">
        <span><Icon name="fa-stamp" /></span>
        <div><b>Artifact updated</b><p>{artifact}</p></div>
      </div>
      {children}
    </StoryShell>
  );
}
