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
