/* ===========================================================================
   ROUTINE LIBRARY
   The Amplify Desmos instructional routines as prop-driven components, so a
   lesson file only supplies content and its own canvas drawings.
   =========================================================================== */

/* the Sijill hook — App fills this in; the routines read it directly so no
   lesson file has to be touched */
const SIJILL = { fn: null, named: {} };

/* ---- Warm-Up · Notice and Wonder ---------------------------------------- */
function NoticeWonder({ draw, height, notices, wonders, award, footnote }) {
  const [gotN, setGotN] = useState([]);
  const [gotW, setGotW] = useState([]);
  const add = (list, set, v) => {
    if (list.indexOf(v) !== -1) return;
    set(list.concat([v]));   /* contributions are not paid — talking is not the currency */
  };
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <Sketch draw={draw} height={height || 250} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {[
          { k: "n", head: "I notice", seeds: notices, list: gotN, set: setGotN, col: "var(--m-blue)" },
          { k: "w", head: "I wonder", seeds: wonders, list: gotW, set: setGotW, col: "var(--m-purple)" }
        ].map((col) => (
          <div key={col.k} className="glass-card" style={{ cursor: "default" }}>
            <div style={{ fontWeight: 900, fontSize: "12px", color: col.col, marginBottom: "8px" }}>{col.head}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {col.seeds.map((s) => {
                const on = col.list.indexOf(s) !== -1;
                return (
                  <button key={s} onClick={() => add(col.list, col.set, s)}
                    className={"btn btn-sm " + (on ? "btn-primary" : "btn-ghost")} style={{ fontWeight: 700 }}>
                    {on ? "✓ " : "+ "}{s}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: "11px", color: "var(--daf-ink-2)", textAlign: "center" }}>
        {footnote || "Every contribution counts — there is no wrong answer here."}
      </div>
    </div>
  );
}

/* ---- Warm-Up · Which one doesn't belong --------------------------------- */
/* cards: [{ id, omml?, text?, draw?, why }] — every card has a real reason.  */
function WODB({ cards, award, prompt }) {
  const [picked, setPicked] = useState(null);
  return (
    <div className="glass-panel">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {cards.map((c) => (
          <div key={c.id}
            className={"glass-card" + (picked === c.id ? " chosen" : "")}
            onClick={() => setPicked(c.id)}
            style={{
              textAlign: "center", padding: "14px 10px", minHeight: "128px",
              display: "flex", flexDirection: "column", justifyContent: "center", gap: "7px"
            }}>
            {c.draw && <Sketch draw={c.draw} height={c.h || 92} />}
            {c.omml && <MathEl omml={c.omml} size="xl" />}
            {c.text && (
              <div className="mono" style={{ fontSize: "26px", fontWeight: 700, color: "var(--daf-ink)" }}>{c.text}</div>
            )}
            {picked === c.id && (
              <div style={{ fontSize: "11px", color: "var(--c)", fontWeight: 800, lineHeight: 1.4 }}>{c.why}</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "13px", textAlign: "center", fontSize: "11.5px", color: "var(--daf-ink-2)" }}>
        {picked ? "Good. Now convince your partner — then try another card."
                : (prompt || "Pick a card. Every one of them has a defensible reason.")}
      </div>
    </div>
  );
}

/* ---- Launch · a drawing plus a locked estimate --------------------------- */
function LaunchEstimate({ draw, height, label, min, max, start, unit, award, after, note }) {
  const [guess, setGuess] = useState(start);
  const [locked, setLocked] = useState(false);
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
      <Sketch draw={draw} height={height || 250} />
      <div className="glass-card" style={{ cursor: "default" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontWeight: 900, fontSize: "12px", color: "var(--c)" }}>{label}</span>
          <span className="mono" style={{ fontSize: "20px", fontWeight: 700, color: "var(--c)" }}>
            {guess.toLocaleString("en-US")}{unit ? " " + unit : ""}
          </span>
        </div>
        <input type="range" min={min} max={max} value={guess} disabled={locked}
          onChange={(e) => setGuess(+e.target.value)}
          style={{ width: "100%", accentColor: "var(--c)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--daf-ink-2)", marginTop: "4px" }}>
          <span>{min.toLocaleString("en-US")}</span><span>{max.toLocaleString("en-US")}</span>
        </div>
        {!locked ? (
          <button className="btn btn-primary" style={{ marginTop: "11px", width: "100%" }}
            onClick={() => { setLocked(true); award(XP.estimate, "estimates", "the class locked an estimate", "class"); }}>
            <Icon name="fa-lock" /> Lock my estimate
          </button>
        ) : (
          <div style={{ marginTop: "11px", fontSize: "12px", color: "var(--daf-ink-2)", lineHeight: 1.5 }}>
            {after || "Locked. We will not reveal the answer — we will build it together."}
          </div>
        )}
      </div>
      {note && <div style={{ textAlign: "center", fontSize: "11px", color: "var(--daf-ink-2)" }}>{note}</div>}
    </div>
  );
}

/* ---- Monitor · a canvas plus a row of choice chips ---------------------- */
function ExploreChips({ draw, height, label, chips, value, onPick, caption, footnote }) {
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
      <Sketch draw={draw} height={height || 250} />
      <div className="chip-bar">
        <div className="chip-label">{label}</div>
        <div className="chip-row">
          {chips.map((c) => (
            <button key={c.v} onClick={() => onPick(c.v)}
              className={"btn btn-sm " + (value === c.v ? "btn-primary" : "btn-ghost")}>
              {c.omml ? <MathEl omml={c.omml} size="md" /> : c.label}
            </button>
          ))}
        </div>
      </div>
      {caption && (
        <div className="stage-line">
          {caption}
          {footnote && <div style={{ fontSize: "11px", color: "var(--daf-ink-2)", marginTop: "6px" }}>{footnote}</div>}
        </div>
      )}
    </div>
  );
}

/* ---- Monitor · card sort ------------------------------------------------- */
/* items: [{id, omml?|text?, target}]   targets: [{id, label, draw?, h?}]      */
function CardSort({ items, targets, award, columns, commitLabel }) {
  const [sel, setSel] = useState(null);
  const [pairs, setPairs] = useState({});
  const [committed, setCommitted] = useState(false);
  const place = (tid) => {
    if (!sel || committed) return;
    setPairs((p) => Object.assign({}, p, { [sel]: tid }));
    setSel(null);
  };
  const allPlaced = Object.keys(pairs).length === items.length;
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "9px", justifyContent: "center", flexWrap: "wrap" }}>
        {items.map((it) => {
          const placed = pairs[it.id];
          return (
            <div key={it.id} onClick={() => !committed && !placed && setSel(it.id)}
              className={"glass-card" + (sel === it.id ? " chosen" : "")}
              style={{ padding: "9px 16px", opacity: placed ? 0.32 : 1 }}>
              {it.omml ? <MathEl omml={it.omml} size="lg" />
                       : <span className="mono" style={{ fontSize: "16px", fontWeight: 700 }}>{it.text}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(" + (columns || targets.length) + ", 1fr)", gap: "9px" }}>
        {targets.map((t) => {
          const owner = Object.keys(pairs).find((k) => pairs[k] === t.id);
          const item = items.find((i) => i.id === owner);
          const right = item && item.target === t.id;
          return (
            <div key={t.id} onClick={() => place(t.id)} className="glass-card"
              style={{
                minHeight: "132px", display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "6px", textAlign: "center",
                borderColor: committed && owner ? (right ? "var(--ok)" : "var(--warn)") : undefined,
                borderWidth: committed && owner ? "2px" : "1px"
              }}>
              {t.draw && <Sketch draw={t.draw} height={t.h || 74} />}
              {t.omml && <MathEl omml={t.omml} size="xl" />}
              <div style={{ fontSize: "10.5px", color: "var(--daf-ink-2)", fontWeight: 700, lineHeight: 1.35 }}>{t.label}</div>
              {owner && (item.omml
                ? <MathEl omml={item.omml} size="md" />
                : <span className="mono" style={{ fontSize: "13px", fontWeight: 700, color: "var(--c)" }}>{item.text}</span>)}
              {committed && owner && (
                <div style={{ fontSize: "10.5px", fontWeight: 900, color: right ? "var(--ok)" : "var(--warn)" }}>
                  {right ? "matched" : "not yet — check the place value"}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="btn btn-primary" disabled={!allPlaced || committed}
          style={{ opacity: !allPlaced || committed ? 0.45 : 1 }}
          onClick={() => { setCommitted(true); award(XP.commit, "commits", "the class committed", "class"); }}>
          <Icon name="fa-check-double" /> {commitLabel || "The class is ready — check"}
        </button>
        {!committed && (
          <div style={{ fontSize: "10.5px", color: "var(--daf-ink-2)", marginTop: "7px" }}>
            No grading until the class commits.
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Connect · two named student strategies ----------------------------- */
function CompareConnect({ left, right, same, diff, award }) {
  const [tab, setTab] = useState("same");
  const list = tab === "same" ? same : diff;
  const panel = (s, col, slot) => (
    <div className="glass-card" style={{ cursor: "default", borderColor: col }}>
      <div style={{ fontWeight: 900, fontSize: "12px", color: col, marginBottom: "8px" }}>{s.name}</div>
      {s.draw
        ? <Sketch draw={s.draw} height={s.h || 96} />
        : <div style={{ minHeight: (s.h || 96) + "px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {s.omml ? <MathEl omml={s.omml} size="xl" />
                    : <span className="mono" style={{ fontSize: "22px", fontWeight: 700 }}>{s.text}</span>}
          </div>}
      <div style={{ fontSize: "11.5px", color: "var(--daf-ink-2)", marginTop: "6px" }}>{s.quote}</div>
      {SIJILL.fn && (
        <button className="sijill-btn" onClick={() => SIJILL.fn(slot)}>
          <Icon name="fa-feather" /> {SIJILL.named[slot]
            ? "Sijill \u00b7 " + SIJILL.named[slot]
            : "This was ______'s method"}
        </button>
      )}
    </div>
  );
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
        {panel(left, "var(--m-blue)", "left")}
        {panel(right, "var(--m-orange)", "right")}
      </div>
      <div style={{ display: "flex", gap: "7px", justifyContent: "center" }}>
        {[{ k: "same", label: "What is the same?" }, { k: "diff", label: "What is different?" }].map((b) => (
          <button key={b.k} className={"btn btn-sm " + (tab === b.k ? "btn-primary" : "btn-ghost")}
            onClick={() => setTab(b.k)}>
            {b.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {list.map((s) => (
          <div key={s} className="gsap-auto" style={{
            background: "var(--daf-mint)", borderRadius: "9px", padding: "9px 13px",
            fontSize: "12px", fontWeight: 700, color: "var(--daf-deep)", borderLeft: "3px solid var(--c)"
          }}>{s}</div>
        ))}
      </div>
    </div>
  );
}

/* ---- Synthesis · the board ---------------------------------------------- */
function BoardScreen({ draw, height, caption }) {
  return (
    <div className="glass-panel board-panel" style={{ padding: 0 }}>
      <div className="board-stage">
        <Sketch draw={draw} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: "12px" }} />
        <div className="stage-caption">{caption || "The drawing restarts on its own — look up at any moment and it is building itself again."}</div>
      </div>
    </div>
  );
}

/* ---- Synthesis · the rule ------------------------------------------------ */
function RuleScreen({ ommls, hand, cards, award }) {
  const [opened, setOpened] = useState({});
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "center" }}>
      <div style={{
        background: "#0B1F24", borderRadius: "16px", padding: "24px 18px",
        border: "2px solid var(--daf-gold)", position: "relative", overflow: "hidden"
      }}>
        <Star8 style={{
          position: "absolute", width: "170px", height: "170px", right: "-40px",
          top: "-40px", color: "var(--daf-gold)", opacity: 0.14
        }} />
        <div style={{ color: "var(--daf-gold)", fontSize: "10.5px", letterSpacing: "0.16em", fontWeight: 900, marginBottom: "12px" }}>
          Memorise this one
        </div>
        <div style={{ color: "#EAF4F2", display: "flex", gap: "30px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          {ommls.map((o, n) => <MathEl key={n} omml={o.omml || o} size="xl" alt={o.alt} />)}
        </div>
        <div className="hand" style={{ color: "#C9A227", fontSize: "13px", marginTop: "12px", lineHeight: 1.5 }}>{hand}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {cards.map((c) => (
          <div key={c.title} className="glass-card"
            onClick={() => {
              if (!c.reveal || opened[c.title]) return;
              setOpened((o) => Object.assign({}, o, { [c.title]: true }));
            }}
            style={{ cursor: c.reveal ? "pointer" : "default" }}>
            <div style={{ fontSize: "10.5px", fontWeight: 900, color: "var(--c)", marginBottom: "7px" }}>{c.title}</div>
            <MathEl omml={opened[c.title] && c.revealOmml ? c.revealOmml : c.omml} size="lg" />
            {c.note && <div style={{ fontSize: "11px", color: "var(--daf-ink-2)", marginTop: "6px" }}>{c.note}</div>}
            {c.reveal && !opened[c.title] && (
              <div style={{ fontSize: "10.5px", color: "var(--c)", marginTop: "6px", fontWeight: 800 }}>
                <Icon name="fa-hand-pointer" /> tap to test it
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: "10.5px", color: "var(--daf-ink-2)" }}>
        Every symbol on this screen is authored in OMML — press M to copy it into Word.
      </div>
    </div>
  );
}

/* ---- Show what you know --------------------------------------------------- */
/* Board mode. Two doors: everyone chooses privately and writes an answer, then
   the teacher reveals and taps who did what. Taking the harder question is paid
   whether or not it comes out right — that is the whole point of it.            */

function AwardRow({ label, sub, amount, count, onPick, col }) {
  return (
    <button className={"award-row" + (count != null ? " done" : "")} onClick={onPick}
      style={{ borderColor: col }}>
      <span className="ar-main">
        <b style={{ color: col }}>{label}</b>
        <em>{sub}</em>
      </span>
      <span className="ar-xp" style={{ background: col }}>+{amount}</span>
      <span className="ar-cta">
        {count != null ? count + " awarded" : <span><Icon name="fa-hand-pointer" /> choose</span>}
      </span>
    </button>
  );
}

function QuestionPanel({ tone, tag, prompt, omml, answer, hint, draw, height, revealed }) {
  return (
    <div className="q-panel" style={{ borderColor: tone }}>
      <div className="q-tag" style={{ background: tone }}>{tag}</div>
      <div className="q-prompt">{prompt}</div>
      {draw && <Sketch draw={draw} height={height || 84} />}
      {omml && <MathEl omml={omml} size="lg" display="block" />}
      {revealed && (
        <div className="gsap-auto q-answer">
          <div className="q-answer-v" style={{ color: tone }}>{answer}</div>
          {hint && <div className="q-hint">{hint}</div>}
        </div>
      )}
    </div>
  );
}

function ShowWhatYouKnow({ prompt, draw, height, omml, options, right, support, award, hard }) {
  const [revealed, setRevealed] = useState(false);
  const [pick, setPick] = useState(null);
  const [given, setGiven] = useState({});
  const mark = (k) => (n) => setGiven((g) => Object.assign({}, g, { [k]: n }));
  const rightText = (options.find((o) => o.v === right) || {}).text || "";

  /* ---- lessons that do not yet carry a hard lane keep the original screen ---- */
  if (!hard) {
    const chosenRight = pick !== null && pick === right;
    return (
      <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px", textAlign: "center" }}>
        <div style={{ fontSize: "12.5px", fontWeight: 800, color: "var(--daf-ink-2)", lineHeight: 1.5 }}>{prompt}</div>
        {draw && <Sketch draw={draw} height={height || 96} />}
        {omml && <MathEl omml={omml} size="xl" display="block" />}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(" + options.length + ", 1fr)", gap: "9px" }}>
          {options.map((o) => {
            const chosen = pick === o.v, isRight = o.v === right;
            return (
              <div key={o.v} className={"glass-card" + (chosen ? " chosen" : "")}
                onClick={() => { if (pick === null) setPick(o.v); }}
                style={{
                  padding: "15px 8px", fontWeight: 900, fontSize: "18px",
                  fontFamily: "'JetBrains Mono', monospace", minHeight: "62px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderColor: pick !== null && chosen ? (isRight ? "var(--ok)" : "var(--warn)") : undefined,
                  borderWidth: pick !== null && chosen ? "2px" : "1px",
                  color: pick !== null && chosen ? (isRight ? "var(--ok)" : "var(--warn)") : "var(--daf-ink)"
                }}>
                {o.omml ? <MathEl omml={o.omml} size="lg" /> : o.text}
              </div>
            );
          })}
        </div>
        {pick !== null && (
          <div className="gsap-auto">
            {chosenRight
              ? <div style={{ color: "var(--ok)", fontWeight: 900, fontSize: "13px" }}>{support.yes}</div>
              : <div>
                  <div style={{ color: "var(--warn)", fontWeight: 900, fontSize: "13px", marginBottom: "7px" }}>{support.notYet}</div>
                  {support.draw && <Sketch draw={support.draw} height={support.h || 84} />}
                  {support.hint && <div style={{ fontSize: "11.5px", color: "var(--daf-ink-2)", marginTop: "6px" }}>{support.hint}</div>}
                </div>}
            <div style={{ marginTop: "10px" }}>
              <AwardRow label="Correct, first time" sub="tap the students who got it right"
                amount={XP.swykStandard} count={given.std} col="var(--ok)"
                onPick={() => award(XP.swykStandard, "correct", "Who got it right, first time?", "pick", mark("std"))} />
            </div>
          </div>
        )}
        {pick !== null && <GateLanes award={award} />}
      </div>
    );
  }

  /* ---- the two doors ------------------------------------------------------- */
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div className="lane-head">
        <b>Choose one. Write your answer. Do not call it out.</b>
        <span>Taking the harder question earns XP whether or not you get it right.</span>
      </div>

      <div className="lane-grid">
        <QuestionPanel tone="var(--m-blue)" tag="STANDARD" prompt={prompt} omml={omml}
          draw={draw} height={height} revealed={revealed}
          answer={rightText} hint={support && support.hint} />
        <QuestionPanel tone="var(--daf-gold)" tag="HARDER" prompt={hard.prompt} omml={hard.omml}
          draw={hard.draw} height={hard.height} revealed={revealed}
          answer={hard.answer} hint={hard.hint} />
      </div>

      {!revealed ? (
        <button className="btn btn-primary" style={{ alignSelf: "center", minWidth: "260px" }}
          onClick={() => setRevealed(true)}>
          <Icon name="fa-eye" /> Reveal both answers
        </button>
      ) : (
        <div className="award-stack gsap-auto">
          <AwardRow label="Took the harder question" sub="tap everyone who chose it — right or wrong"
            amount={XP.hardAttempt} count={given.hard} col="var(--daf-gold)"
            onPick={() => award(XP.hardAttempt, "hard", "Who took the harder question?", "pick", mark("hard"))} />
          <AwardRow label="Harder question, correct" sub="of those, who got it right"
            amount={XP.hardCorrect} count={given.hardOk} col="var(--ok)"
            onPick={() => award(XP.hardCorrect, "hardOk", "Who got the harder one right?", "pick", mark("hardOk"))} />
          <AwardRow label="Standard question, correct" sub="first attempt only"
            amount={XP.swykStandard} count={given.std} col="var(--m-blue)"
            onPick={() => award(XP.swykStandard, "correct", "Who got it right, first time?", "pick", mark("std"))} />
        </div>
      )}
      {revealed && <GateLanes award={award} />}
    </div>
  );
}

/* ---- Close --------------------------------------------------------------- */
function Closing({ game, action, omml }) {
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
        {BADGES.map((b) => {
          const earners = Object.keys(game.s || {}).filter((n) => badgeTier(b, game.s[n]) > 0).length;
          return (
            <div key={b.id} style={{ textAlign: "center", width: "96px" }}>
              <div className={"badge" + (earners ? " on" : "")}
                style={{ width: "54px", height: "54px", fontSize: "20px", margin: "0 auto 6px" }}>
                <Icon name={b.icon} />
              </div>
              <div style={{ fontSize: "10px", fontWeight: 800, color: earners ? "var(--daf-gold)" : "var(--daf-ink-2)" }}>
                {b.label}
              </div>
              <div style={{ fontSize: "9.5px", color: "var(--daf-ink-2)" }}>{earners} students</div>
            </div>
          );
        })}
      </div>
      <div style={{ background: "var(--daf-mint)", borderRadius: "14px", padding: "18px", border: "1px solid var(--daf-line)" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.12em", fontWeight: 900, color: "var(--daf-deep)", marginBottom: "9px" }}>
          One action tonight
        </div>
        <div style={{ fontSize: "15px", fontWeight: 800, color: "var(--daf-ink)", lineHeight: 1.5 }}>{action}</div>
        {omml && <div style={{ marginTop: "11px" }}><MathEl omml={omml} size="lg" /></div>}
      </div>
      <div className="mono" style={{ fontSize: "26px", fontWeight: 700, color: "var(--daf-gold)" }}>
        {game.classXp} XP earned by the class today
      </div>
      <div style={{ fontSize: "11px", color: "var(--daf-ink-2)" }}>
        Press <span className="kbd">N</span> for the class ledger, or export the tracking sheet from there.
      </div>
    </div>
  );
}

/* ===========================================================================
   THE SEVEN STAGES · engine screens
   Content at home. Thinking in class. Evidence on the wall.

   Stage 1 Preparation · Stage 2 Intelligent Diagnose · Stage 4 Practice ·
   Stage 5 Production / B (proof-mastery gate) are rendered by the engine
   from the per-lesson stage plan stamped as window.DAF_STAGE at build time
   (scripts/make-stage-plan.js → stage/stage-plan.json). Stages 3, 6 and 7
   wrap the lesson's own screens: its explore → connect → board arc is the
   knowledge build, its formative check is the mastery gate (routing added
   by GateLanes below) and its closing becomes the evidence wall.
   =========================================================================== */

/* The stage plan for this lesson — present in the 114 curriculum decks,
   absent in review decks (bosses), which keep their original sequence. */
function stagePlan() {
  return (window.DAF_STAGE && window.DAF_STAGE.lessons &&
    window.DAF_STAGE.lessons[LESSON.code]) || null;
}

/* ---- generic canvas: a briefing paper with the SENT stamp --------------- */
const drawPrepBrief = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  const p1 = D.at(f, 0, 140), p2 = D.at(f, 130, 300), p3 = D.at(f, 320, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const pw = Math.min(W * 0.52, 300), ph = H - 56, px = W / 2 - pw / 2 - 14, py = 28;
  /* paper */
  ctx.save();
  ctx.globalAlpha = p1;
  D.rr(ctx, px, py, pw, ph, 8);
  ctx.fillStyle = "#F7FBFA"; ctx.fill();
  ctx.strokeStyle = "#CDE7E3"; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.restore();
  if (p1 > 0) {
    D.txt(ctx, "BRIEFING", px + pw / 2, py + 24, { size: 13, col: "#12857C", font: "marker", alpha: p1 });
    D.marker(ctx, [[px + 24, py + 38], [px + pw - 24, py + 38]], p1, "rgba(18,133,124,.5)", 1.4);
  }
  /* the three home-question lines write themselves */
  for (let i = 0; i < 3; i++) {
    const a = D.at(p2, i / 3, i / 3 + 0.55);
    if (a <= 0) continue;
    const ly = py + 64 + i * 34;
    D.rr(ctx, px + 24, ly - 8, 10, 10, 2.5);
    ctx.fillStyle = "#C9A227"; ctx.globalAlpha = a; ctx.fill(); ctx.globalAlpha = 1;
    D.marker(ctx, [[px + 44, ly - 2], [px + 44 + (pw - 76) * a, ly - 2]], 1, "rgba(16,36,43,.55)", 2);
  }
  /* the envelope flies in and the stamp lands */
  if (p2 > 0.6) {
    const t = D.at(f, 300, 470);
    const ex = px + pw + 30 - t * 46, ey = py + 10 + Math.sin(t * 5) * 4 - t * 8;
    ctx.save();
    ctx.globalAlpha = t;
    ctx.setLineDash([4, 5]);
    D.marker(ctx, [[px + pw - 160, py + 16], [ex + 8, ey + 6]], t, "rgba(201,162,39,.6)", 1.2);
    ctx.setLineDash([]);
    ctx.fillStyle = "#12857C";
    ctx.beginPath();
    ctx.moveTo(ex, ey); ctx.lineTo(ex + 22, ey + 8); ctx.lineTo(ex, ey + 16); ctx.lineTo(ex + 6, ey + 8);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  if (p3 > 0) {
    const s = 1 + (1 - p3) * 0.6;
    ctx.save();
    ctx.translate(px + pw - 52, py + ph - 44);
    ctx.rotate(-0.18);
    ctx.scale(s, s);
    D.rr(ctx, -34, -17, 68, 34, 6);
    ctx.strokeStyle = "rgba(201,162,39," + p3 + ")"; ctx.lineWidth = 2; ctx.stroke();
    D.txt(ctx, "SENT", 0, 4, { size: 13, col: "rgba(201,162,39," + p3 + ")", font: "marker" });
    ctx.restore();
  }
  D.txt(ctx, "first exposure · at home · at their own pace", W / 2, H - 14,
    { size: 11, col: "#53CDBF", font: "marker", alpha: D.at(f, 440, 540) });
};

/* ---- generic canvas: the class gap map ----------------------------------- */
const drawGapMap = (claims, votes) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const n = claims.length, rowH = Math.min(34, (H - 44) / n), y0 = 22;
  for (let i = 0; i < n; i++) {
    const y = y0 + i * rowH;
    const v = votes[i] || null;
    D.txt(ctx, String(i + 1), 24, y + rowH / 2 - 6, { size: 11, col: "#53CDBF", font: "marker" });
    const bx = 42, bw = W - 120;
    D.rr(ctx, bx, y + 2, bw, rowH - 12, (rowH - 12) / 2);
    ctx.fillStyle = "rgba(255,255,255,.07)"; ctx.fill();
    if (v === "can") {
      const p = D.at(frame % 500, i * 40, i * 40 + 160);
      D.rr(ctx, bx, y + 2, Math.max(14, bw * p), rowH - 12, (rowH - 12) / 2);
      ctx.fillStyle = "#12857C"; ctx.fill();
      D.txt(ctx, "HOLDS", bx + bw + 8, y + rowH / 2 - 6,
        { size: 9, col: "#34D399", font: "marker", alpha: p });
    } else if (v === "notYet") {
      const p = D.at(frame % 500, i * 40, i * 40 + 160);
      D.rr(ctx, bx, y + 2, Math.max(14, bw * 0.34 * p), rowH - 12, (rowH - 12) / 2);
      ctx.fillStyle = "#E0A526"; ctx.fill();
      D.rr(ctx, bx + bw * 0.34, y + 2, bw * 0.66, rowH - 12, (rowH - 12) / 2);
      ctx.strokeStyle = "rgba(224,165,38,.5)"; ctx.lineWidth = 1.4; ctx.setLineDash([5, 5]);
      ctx.stroke(); ctx.setLineDash([]);
      D.txt(ctx, "GAP", bx + bw + 8, y + rowH / 2 - 6,
        { size: 9, col: "#E0A526", font: "marker", alpha: p });
    } else {
      D.txt(ctx, "—", bx + bw / 2, y + rowH / 2 - 6, { size: 10, col: "rgba(255,255,255,.25)", font: "marker" });
    }
  }
  D.txt(ctx, "known", 42, H - 12, { size: 10, col: "#53CDBF", font: "marker" });
  D.txt(ctx, "missing", W - 76, H - 12, { size: 10, col: "#E0A526", font: "marker" });
};

/* ---- generic canvas: the practice sprint track ---------------------------- */
const drawSprint = (total, idx, doneN, finished) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const n = total, x0 = W * 0.16, x1 = W * 0.84, y = H / 2 - 6;
  /* the connector */
  const reach = finished ? 1 : Math.max(0, Math.min(1, (doneN + 0.5) / Math.max(1, n - 1)));
  D.marker(ctx, [[x0, y], [x0 + (x1 - x0) * reach, y]], 1, "rgba(201,162,39,.5)", 2.4);
  for (let i = 0; i < n; i++) {
    const x = x0 + ((x1 - x0) / Math.max(1, n - 1)) * i;
    const done = i < doneN, cur = i === idx && !finished;
    if (done) {
      D.star8(ctx, x, y, 13, 1, "rgba(201,162,39,.9)", 1.6);
      D.txt(ctx, "\u2713", x, y + 34, { size: 13, col: "#34D399", font: "marker" });
    } else if (cur) {
      const pulse = 1 + Math.sin(frame / 14) * 0.16;
      ctx.beginPath();
      ctx.arc(x, y, 15 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(227,192,90,.8)"; ctx.lineWidth = 2; ctx.stroke();
      D.txt(ctx, String(i + 1), x, y + 4, { size: 12, col: "#E3C05A", font: "marker" });
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,.1)"; ctx.fill();
      D.txt(ctx, String(i + 1), x, y + 4, { size: 11, col: "rgba(255,255,255,.4)", font: "marker" });
    }
  }
  /* the seconds dial: feedback arrives in seconds, not days — no pressure,
     just the pace of the loop */
  const dx = W - 46, dy = 40, r = 17, ang = ((frame % 300) / 300) * Math.PI * 2 - Math.PI / 2;
  ctx.beginPath(); ctx.arc(dx, dy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,.18)"; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(dx, dy, r, -Math.PI / 2, ang);
  ctx.strokeStyle = "rgba(227,192,90,.75)"; ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(dx, dy); ctx.lineTo(dx + Math.cos(ang) * (r - 5), dy + Math.sin(ang) * (r - 5));
  ctx.strokeStyle = "#E3C05A"; ctx.lineWidth = 1.6; ctx.stroke();
  D.txt(ctx, "seconds", dx, dy + r + 14, { size: 9, col: "#53CDBF", font: "marker" });
};

/* ---- generic canvas: the critic's inspection lamp -------------------------- */
const drawCritic = (chDone, accepted, chCount) => (ctx, W, H, frame) => {
  const CYCLE = 520, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  /* the student's work card */
  const cw = W * 0.4, chh = H - 58, cx = W * 0.1, cy = 29;
  D.rr(ctx, cx, cy, cw, chh, 9);
  ctx.fillStyle = "#F7FBFA"; ctx.fill();
  for (let i = 0; i < 4; i++) {
    D.marker(ctx, [[cx + 20, cy + 34 + i * 26], [cx + 20 + (cw - 56) * (0.5 + 0.5 * Math.sin(i * 2.1)), cy + 34 + i * 26]], 1,
      "rgba(16,36,43,.4)", 2);
  }
  D.txt(ctx, "THE STUDENTS' WORK", cx + cw / 2, cy + 14, { size: 10, col: "#12857C", font: "marker" });
  /* the lamp swings over it — it examines, it never writes */
  const swing = Math.sin(frame / 26) * 0.5;
  const ax = W * 0.62, ay = 12;
  const lx = ax + Math.sin(swing) * (W * 0.16), ly = ay + Math.cos(swing) * (W * 0.16) * 0.9;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(lx, ly);
  ctx.lineTo(lx - 26, ly + chh * 0.62);
  ctx.lineTo(lx + 26, ly + chh * 0.62);
  ctx.closePath();
  ctx.fillStyle = "rgba(227,192,90,.13)"; ctx.fill();
  ctx.restore();
  D.marker(ctx, [[ax, ay], [lx, ly]], 1, "rgba(255,255,255,.4)", 2);
  D.star8(ctx, lx, ly, 9, 1, "rgba(227,192,90,.95)", 1.5);
  /* the checkpoint dial */
  for (let i = 0; i < chCount; i++) {
    const x = W - 78, y = 52 + i * 34;
    const done = i < chDone, cur = i === chDone && !accepted;
    if (done) {
      D.star8(ctx, x, y, 11, 1, "rgba(201,162,39,.9)", 1.5);
    } else if (cur) {
      const p = 1 + Math.sin(frame / 14) * 0.18;
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4); ctx.scale(p, p);
      D.rr(ctx, -9, -9, 18, 18, 3);
      ctx.strokeStyle = "rgba(227,192,90,.85)"; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
    } else {
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4);
      D.rr(ctx, -8, -8, 16, 16, 3);
      ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.restore();
    }
  }
  if (accepted) {
    const a = D.at(f, 0, 140);
    ctx.save();
    ctx.translate(W / 2, H / 2 + 8);
    ctx.rotate(-0.14);
    D.rr(ctx, -92, -24, 184, 48, 8);
    ctx.strokeStyle = "rgba(201,162,39," + a + ")"; ctx.lineWidth = 2.5; ctx.stroke();
    D.txt(ctx, "PRODUCTION ACCEPTED", 0, 5, { size: 14, col: "rgba(201,162,39," + a + ")", font: "marker" });
    ctx.restore();
  }
  D.txt(ctx, "critic \u00b7 never author", W * 0.3, H - 12, { size: 10, col: "#53CDBF", font: "marker", alpha: D.at(f, 120, 240) });
};

/* ---- stage 1 · Preparation ------------------------------------------------ */
/* The compressed briefing, sent before class. First exposure happened at
   home, at each student's own pace — this screen recovers it and states the
   deal: content lives at home, the classroom is reserved for thinking. */
function StagePrep() {
  const plan = stagePlan();
  if (!plan) return null;
  const P = plan.prep;
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Sketch draw={drawPrepBrief} height={168} />
      <div className="prep-sent">
        <span className="prep-stamp"><Icon name="fa-paper-plane" /> Sent before class</span>
        <span>first exposure at home · at each student's own pace</span>
      </div>
      <div>
        <div className="prep-label">The compressed material</div>
        <div className="prep-objs">
          {P.objects.map((k) => (
            <div key={k} className="prep-obj"><MathEl omml={LESSON.math[k]} size="lg" display="block" /></div>
          ))}
        </div>
      </div>
      <div>
        <div className="prep-label">Asked at home</div>
        <div className="chip-row">
          {P.home.map((q) => (
            <span key={q} className="prep-q"><Icon name="fa-lightbulb" /> {q}</span>
          ))}
        </div>
      </div>
      <div className="prep-foot">Content lives at home. The classroom is reserved for thinking.</div>
    </div>
  );
}

/* ---- stage 2 · Intelligent Diagnose ---------------------------------------- */
/* A quick, low-stakes probe. The class votes each checkpoint — we are
   building a gap map (what is known, what is missing), not a grade. Nothing
   on this screen is scored, named or stored. */
function GapMap() {
  const plan = stagePlan();
  if (!plan) return null;
  const claims = plan.diagnose.claims;
  const [votes, setVotes] = useState({});
  const vote = (i, v) => setVotes((p) => Object.assign({}, p, { [i]: p[i] === v ? null : v }));
  const allVoted = claims.every((_, i) => votes[i]);
  const gaps = claims.filter((c, i) => votes[i] === "notYet");
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
      <Sketch draw={drawGapMap(claims, votes)} height={132} />
      <div className="gap-rows">
        {claims.map((c, i) => (
          <div key={i} className={"gap-row" + (votes[i] ? " set" : "")}>
            <span className="gap-claim">{c}</span>
            <span className="gap-vote">
              <button className={"btn btn-sm " + (votes[i] === "can" ? "btn-primary" : "btn-ghost")}
                onClick={() => vote(i, "can")}>
                <Icon name="fa-check" /> We can
              </button>
              <button className={"btn btn-sm gap-no" + (votes[i] === "notYet" ? " on" : "")}
                onClick={() => vote(i, "notYet")}>
                <Icon name="fa-circle-question" /> Not yet
              </button>
            </span>
          </div>
        ))}
      </div>
      {allVoted && (
        <div className={"gap-verdict" + (gaps.length ? " gaps" : " clear")}>
          {gaps.length
            ? <span><Icon name="fa-map-pin" /> The gap map flags: <b>{gaps.join(" · ")}</b> — knowledge building closes exactly these.</span>
            : <span><Icon name="fa-map-pin" /> No gaps flagged — the build goes straight to the richer example.</span>}
        </div>
      )}
      <div className="prep-foot">An instrument for catching gaps, not for scoring students. No names, no marks, no pressure.</div>
    </div>
  );
}

/* ---- stage 4 · Practice ------------------------------------------------------ */
/* Guided, then independent — with feedback that arrives in seconds, not days.
   Item one runs with the model open; item two runs with it closed. The
   lesson's own check question is the material, so practice is the same math
   the gate will judge. Right first try is paid (XP.sprint). */
function PracticeSprint({ award }) {
  const plan = stagePlan();
  if (!plan) return null;
  const items = plan.practice.items;
  const model = plan.practice.model;
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState(null);
  const [misses, setMisses] = useState(0);
  const [doneN, setDoneN] = useState(0);
  const [given, setGiven] = useState({});
  const [hardRevealed, setHardRevealed] = useState(false);
  const mark = (k) => (n) => setGiven((g) => Object.assign({}, g, { [k]: n }));

  const finished = idx >= items.length;
  const item = finished ? null : items[idx];
  const isRight = pick !== null && pick === item.right;
  const okFirst = isRight && misses === 0;
  const optOmml = (o) => o.math ? LESSON.math[o.math] : null;

  const advance = () => {
    if (item.mode === "harder") {
      setIdx(idx + 1); setPick(null); setMisses(0); setDoneN(doneN + 1);
      return;
    }
    setIdx(idx + 1); setPick(null); setMisses(0);
    if (idx + 1 < items.length) setDoneN(doneN + 1);
  };

  if (finished) {
    return (
      <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px", textAlign: "center" }}>
        <Sketch draw={drawSprint(items.length, -1, items.length, true)} height={130} />
        <div style={{ fontSize: 15, fontWeight: 900, color: "var(--daf-deep)" }}>
          Sprint complete — {items.length} items, every answer met in the moment.
        </div>
        <div style={{ fontSize: 12, color: "var(--daf-ink-2)" }}>
          Feedback arrived in seconds, not days. That is what practice is for.
        </div>
      </div>
    );
  }

  const modeTag = item.mode === "guided"
    ? { t: "Item " + (idx + 1) + " of " + items.length + " · guided — the model stays open", col: "var(--m-blue)" }
    : item.mode === "harder"
      ? { t: "Item " + (idx + 1) + " of " + items.length + " · the harder lane", col: "var(--daf-gold)" }
      : { t: "Item " + (idx + 1) + " of " + items.length + " · independent — no model until it is missed", col: "var(--c)" };

  /* ---- the harder lane: reveal, then the teacher checks the class -------- */
  if (item.mode === "harder") {
    const revealed = hardRevealed;
    return (
      <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "center" }}>
        <Sketch draw={drawSprint(items.length, idx, doneN, false)} height={110} />
        <div className="sprint-mode" style={{ color: modeTag.col }}>{modeTag.t}</div>
        <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.5 }}>{item.prompt}</div>
        {item.math && LESSON.math[item.math] && (
          <div><MathEl omml={LESSON.math[item.math]} size="lg" display="block" /></div>
        )}
        {item.hint && !revealed && (
          <div style={{ fontSize: 11.5, color: "var(--daf-ink-2)" }}><Icon name="fa-lightbulb" /> {item.hint}</div>
        )}
        {!revealed ? (
          <button className="btn btn-primary" style={{ alignSelf: "center", minWidth: 240 }}
            onClick={() => setHardRevealed(true)}>
            <Icon name="fa-eye" /> The class answers — reveal
          </button>
        ) : (
          <div className="award-stack gsap-auto">
            <div style={{ fontSize: 13, fontWeight: 900, color: "var(--daf-gold)" }}>{item.answer}</div>
            <AwardRow label="Took the harder question" sub="tap everyone who chose it — right or wrong"
              amount={XP.hardAttempt} count={given.hard} col="var(--daf-gold)"
              onPick={() => award(XP.hardAttempt, "hard", "Who took the harder question?", "pick", mark("hard"))} />
            <AwardRow label="Harder question, correct" sub="of those, who got it right"
              amount={XP.hardCorrect} count={given.hardOk} col="var(--ok)"
              onPick={() => award(XP.hardCorrect, "hardOk", "Who got the harder one right?", "pick", mark("hardOk"))} />
            <button className="btn btn-ghost" style={{ alignSelf: "center" }} onClick={advance}>
              Sprint complete <Icon name="fa-arrow-right" />
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ---- guided and independent: pick, get feedback in seconds ------------- */
  return (
    <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Sketch draw={drawSprint(items.length, idx, doneN, false)} height={104} />
      <div className="sprint-mode" style={{ color: modeTag.col }}>{modeTag.t}</div>
      <div style={{ display: "flex", gap: "12px", alignItems: "stretch" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.5, marginBottom: "9px" }}>{item.prompt}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(" + item.options.length + ", 1fr)", gap: "8px" }}>
            {item.options.map((o) => {
              const chosen = pick === o.v, rightOpt = o.v === item.right;
              return (
                <div key={o.v} className={"glass-card" + (chosen ? " chosen" : "")}
                  onClick={() => { if (pick === null) { setPick(o.v); if (o.v !== item.right) setMisses((m) => m + 1); } }}
                  style={{
                    padding: "13px 8px", fontWeight: 900, fontSize: 17,
                    fontFamily: "'JetBrains Mono', monospace", minHeight: "56px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderColor: pick !== null && chosen ? (rightOpt ? "var(--ok)" : "var(--warn)") : undefined,
                    borderWidth: pick !== null && chosen ? "2px" : "1px",
                    color: pick !== null && chosen ? (rightOpt ? "var(--ok)" : "var(--warn)") : "var(--daf-ink)"
                  }}>
                  {optOmml(o) ? <MathEl omml={optOmml(o)} size="md" /> : o.text}
                </div>
              );
            })}
          </div>
        </div>
        <div className={"sprint-model" + (item.mode === "guided" ? " open" : pick !== null && !isRight ? " open" : "")}>
          <div className="sprint-model-tag">
            <Icon name="fa-chalkboard" /> {item.mode === "guided" ? "The model — open" : "The model — closed"}
          </div>
          {item.mode === "guided" ? (
            model.map((k) => (
              <div key={k} className="sprint-model-math"><MathEl omml={LESSON.math[k]} size="md" /></div>
            ))
          ) : pick !== null && !isRight ? (
            model.map((k) => (
              <div key={k} className="sprint-model-math"><MathEl omml={LESSON.math[k]} size="md" /></div>
            ))
          ) : (
            <div className="sprint-model-empty">Open only after a miss.</div>
          )}
        </div>
      </div>
      {pick !== null && (
        <div className="gsap-auto sprint-fb">
          {isRight ? (
            <div style={{ color: "var(--ok)", fontWeight: 900, fontSize: 13, marginBottom: "8px" }}>{item.yes}</div>
          ) : (
            <div>
              <div style={{ color: "var(--warn)", fontWeight: 900, fontSize: 13, marginBottom: "5px" }}>{item.notYet}</div>
              {item.hint && <div style={{ fontSize: 11.5, color: "var(--daf-ink-2)" }}><Icon name="fa-lightbulb" /> {item.hint}</div>}
              <button className="btn btn-sm btn-ghost" style={{ marginTop: "7px" }}
                onClick={() => { setPick(null); }}>
                <Icon name="fa-rotate-left" /> Try again
              </button>
            </div>
          )}
          {isRight && (
            <div>
              {okFirst
                ? <AwardRow label="Right, first try" sub="tap the students who had it first time"
                    amount={XP.sprint} count={given.s} col="var(--ok)"
                    onPick={() => award(XP.sprint, "correct", "Sprint — right first try", "pick", mark("s"))} />
                : <div style={{ fontSize: 11.5, color: "var(--daf-ink-2)" }}>
                    <Icon name="fa-medal" /> The class had it — the first-try award went to the ones who had it clean.
                  </div>}
              <button className="btn btn-primary" style={{ marginTop: "9px", alignSelf: "center", minWidth: 200 }}
                onClick={advance}>
                {idx + 1 < items.length ? "Next item" : "Sprint complete"} <Icon name="fa-arrow-right" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---- stage 5 · Production / B — the Proof-Mastery Gate ------------------------ */
/* A genuinely new situation: the class commits to the method its work rests
   on, then the critic examines it — three challenges, each defended with
   evidence. The critic examines, challenges and critiques. It never writes
   the work. AI enters here — as a critic, never as an author. */
function CriticBoard({ award }) {
  const plan = stagePlan();
  if (!plan) return null;
  const C = plan.critic;
  const [stage, setStage] = useState("method");       /* method | 0..2 | done */
  const [pick, setPick] = useState(null);
  const [misses, setMisses] = useState(0);
  const [chDone, setChDone] = useState(0);
  const [given, setGiven] = useState({});
  const mark = (k) => (n) => setGiven((g) => Object.assign({}, g, { [k]: n }));
  const accepted = stage === "done";
  const ch = typeof stage === "number" ? C.challenges[stage] : null;
  const optText = (o) => o; /* options are plain strings in the plan */

  const methodRight = pick !== null && stage === "method" && pick === C.method.right;
  const chRight = pick !== null && ch && pick === ch.right;

  const reset = () => { setPick(null); setMisses(0); };

  return (
    <div className="glass-panel critic-panel" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Sketch draw={drawCritic(chDone, accepted, C.challenges.length)} height={148} />

      <div className="critic-brief">
        <div className="critic-brief-tag"><Icon name="fa-location-crosshairs" /> A genuinely new situation</div>
        <div>{C.situation}</div>
        <div className="critic-mission"><b>The mission: </b>{C.mission}</div>
      </div>

      {stage === "method" && (
        <div className="critic-step gsap-auto">
          <div className="critic-q">Before the critique, the critic asks: which method does your work rest on?</div>
          <div className="chip-row" style={{ flexDirection: "column", alignItems: "stretch" }}>
            {C.method.options.map((o, i) => (
              <div key={i} className={"glass-card critic-opt" + (pick === i ? " chosen" : "")}
                onClick={() => { if (pick === null) { setPick(i); if (i !== C.method.right) setMisses((m) => m + 1); } }}
                style={{
                  borderColor: pick !== null && pick === i
                    ? (i === C.method.right ? "var(--ok)" : "var(--warn)") : undefined,
                  borderWidth: pick !== null && pick === i ? "2px" : "1px"
                }}>
                {optText(o)}
              </div>
            ))}
          </div>
          {pick !== null && (methodRight
            ? <div className="critic-ok gsap-auto"><Icon name="fa-shield-halved" /> Safe to defend. The critic begins.</div>
            : <div className="critic-no gsap-auto"><Icon name="fa-triangle-exclamation" /> The critic raises an eyebrow — that wobbles under questioning. Choose the method your evidence supports.
                <button className="btn btn-sm btn-ghost" style={{ marginLeft: 10 }} onClick={reset}><Icon name="fa-rotate-left" /> Choose again</button>
              </div>)}
          {methodRight && (
            <button className="btn btn-primary" style={{ marginTop: 9 }} onClick={() => { setStage(0); setPick(null); setMisses(0); }}>
              <Icon name="fa-magnifying-glass" /> Begin the critique
            </button>
          )}
        </div>
      )}

      {ch && (
        <div className="critic-step gsap-auto">
          <div className="critic-head">
            <span className="critic-who"><Icon name="fa-lightbulb" /> Hafizah · the proof critic</span>
            <span className="critic-rule">critic — never author</span>
          </div>
          <div className={"critic-tag t" + chDone}>{ch.tag}</div>
          <div className="critic-q">{ch.question}</div>
          <div className="chip-row" style={{ flexDirection: "column", alignItems: "stretch" }}>
            {ch.options.map((o, i) => (
              <div key={i} className={"glass-card critic-opt" + (pick === i ? " chosen" : "")}
                onClick={() => { if (pick === null) { setPick(i); if (i !== ch.right) setMisses((m) => m + 1); } }}
                style={{
                  borderColor: pick !== null && pick === i
                    ? (i === ch.right ? "var(--ok)" : "var(--warn)") : undefined,
                  borderWidth: pick !== null && pick === i ? "2px" : "1px"
                }}>
                {optText(o)}
              </div>
            ))}
          </div>
          {pick !== null && (chRight ? (
            <div className="critic-ok gsap-auto">
              <Icon name="fa-shield-halved" /> {ch.explain}
              <button className="btn btn-primary" style={{ marginTop: 9, marginLeft: 10 }}
                onClick={() => {
                  if (stage + 1 < C.challenges.length) { setStage(stage + 1); setPick(null); setMisses(0); setChDone(chDone + 1); }
                  else { setStage("done"); setPick(null); setChDone(C.challenges.length); }
                }}>
                {stage + 1 < C.challenges.length ? "Next challenge" : "Accept the production"} <Icon name="fa-arrow-right" />
              </button>
            </div>
          ) : (
            <div className="critic-no gsap-auto">
              <Icon name="fa-magnifying-glass" /> The critic does not correct. It makes the class check the evidence — defend it again.
              <button className="btn btn-sm btn-ghost" style={{ marginLeft: 10 }} onClick={reset}><Icon name="fa-rotate-left" /> Defend again</button>
            </div>
          ))}
        </div>
      )}

      {accepted && (
        <div className="critic-done gsap-auto">
          <div className="critic-stamp"><Icon name="fa-stamp" /> Production accepted</div>
          <div className="critic-rule-note">
            The critic examined, challenged and critiqued. It never generated the work — the production is the students'.
          </div>
          <AwardRow label="Defended the production" sub="tap the students who led the defence"
            amount={XP.production} count={given.prod} col="var(--daf-gold)"
            onPick={() => award(XP.production, null, "Defended the production through the critic", "pick", mark("prod"))} />
        </div>
      )}
    </div>
  );
}

/* ---- stage 6 · the gate lanes (inside ShowWhatYouKnow) ---------------------- */
/* The formative check now routes: one individual task decides the next path
   for each student. Two lanes — forward, or reteach — the teacher taps. The
   gate pays nothing; it is a judgement, not a reward. The reteach lane
   carries the prescription: IXL codes plus a reopen of the model. */
function GateLanes({ award }) {
  const plan = stagePlan();
  if (!plan) return null;
  /* lessons with formative checks mid-build keep those plain — only the
     stage-6 gate (the lesson's last check) carries the routing lanes */
  if (window.__DAF_FINAL_GATE_CASE != null &&
      window.__DAF_FINAL_GATE_CASE !== window.__DAF_ACTIVE_CASE) return null;
  const G = plan.gate;
  const [fwd, setFwd] = useState(null);
  const [ret, setRet] = useState(null);
  const revisit = (G.revisitOld != null) ? G.revisitOld + 2 : null;
  const reopen = () => {
    try { window.postMessage({ type: "set-slide", step: revisit }, "*"); } catch (e) {}
  };
  return (
    <div className="gate-lanes gsap-auto">
      <div className="gate-lanes-head">
        <Icon name="fa-signs-post" /> The gate decides the next path
        <span>one individual task · forward, or into reteaching</span>
      </div>
      <div className="gate-lane-grid">
        <div className="gate-lane fwd">
          <b><Icon name="fa-arrow-trend-up" /> Forward — mastered</b>
          <span>on to the next lesson</span>
          <button className="btn btn-sm btn-primary gate-lane-btn"
            onClick={() => award(0, "gate", "Who cleared the gate to the forward lane?", "pick", (n) => setFwd(n))}>
            <Icon name="fa-hand-pointer" /> {fwd != null ? fwd + " tapped" : "Tap the students"}
          </button>
        </div>
        <div className="gate-lane ret">
          <b><Icon name="fa-rotate-left" /> Reteach — revisit the model</b>
          <span>same math, second pass</span>
          <button className="btn btn-sm btn-ghost gate-lane-btn"
            onClick={() => award(0, "reteach", "Who takes the reteach lane?", "pick", (n) => setRet(n))}>
            <Icon name="fa-hand-pointer" /> {ret != null ? ret + " tapped" : "Tap the students"}
          </button>
        </div>
      </div>
      <div className="gate-recipe">
        <span>
          <Icon name="fa-book" /> Reteach: IXL{" "}
          {(G.ixl || []).map((c) => <em key={c} className="mono">{c}</em>)}
        </span>
        {revisit != null && (
          <button className="btn btn-sm btn-ghost" onClick={reopen}>
            <Icon name="fa-chalkboard" /> Reopen the model (slide {String(revisit + 1).padStart(2, "0")})
          </button>
        )}
      </div>
    </div>
  );
}

/* ---- stage 7 · the evidence wall (rendered by the app on the final screen) -- */
/* The unit closes with a tangible artifact the student is willing to put
   their name on. The teacher posts each student's version to the wall —
   evidence on the wall that learning truly happened. First post stamps the
   class folio, like the story handoff. */
function EvidenceWall({ game, award }) {
  const plan = stagePlan();
  if (!plan) return null;
  const present = Object.keys(game.s || {}).filter((n) => game.present[n]);
  const slots = Math.max(6, Math.min(24, present.length || 8));
  const [posted, setPosted] = useState(0);
  const [given, setGiven] = useState({});
  const mark = (n) => setGiven((g) => Object.assign({}, g, { wall: n }));
  const date = new Date().toISOString().slice(0, 10);
  const post = () => {
    if (posted >= slots) return;
    if (posted === 0) { try { folioStamp(game.section, LESSON.code); } catch (e) {} }
    setPosted(posted + 1);
  };
  return (
    <div className="glass-panel wall-panel" style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
      <div className="wall-head">
        <Star8 style={{ width: 15, height: 15, color: "var(--daf-gold)" }} />
        <b>The evidence wall</b>
        <span>stage 7 · smart production</span>
      </div>
      <div className="wall-artifact">
        <div className="wall-art-label">The artifact this class is willing to stand behind</div>
        <div className="wall-art-name">{plan.wall.artifact}</div>
        <div className="wall-art-sub">made by {game.section} · {date} · a unit is finished when the student can show what they made from it</div>
      </div>
      <div className="wall-grid">
        {Array.from({ length: slots }, (_, i) => (
          <span key={i} className={"wall-slot" + (i < posted ? " on" : "")}>
            {i < posted ? <Icon name="fa-star" /> : <Star8 style={{ width: 11, height: 11, opacity: 0.3 }} />}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn btn-primary" disabled={posted >= slots}
          style={{ opacity: posted >= slots ? 0.45 : 1 }} onClick={post}>
          <Icon name="fa-image" /> Post a student's version
        </button>
        {posted > 0 && (
          <button className="btn btn-ghost" onClick={() => setPosted(0)}>
            <Icon name="fa-eraser" /> Clear the wall
          </button>
        )}
      </div>
      <AwardRow label="Posted the artifact to the wall" sub="teacher issued — once for this unit's evidence"
        amount={XP.exhibition} count={given.wall} col="var(--daf-gold)"
        onPick={() => award(XP.exhibition, null, "Posted the artifact to the evidence wall", "pick", mark)} />
      <div className="prep-foot">Evidence on the wall: not what was taught, but what the class made from it.</div>
    </div>
  );
}
