/* ===========================================================================
   WEEK DECK · the generic deck for a week that teaches no numbered lesson

   Semester opening (orientation), the two revision weeks and the examination
   week are weeks of the syllabus that have no `lessons/X-Y.jsx` behind them —
   yet the week file for each of them is full of material the boys must work
   through: must-know lists, Quick Practice runs, the skills checklist, the
   exam structure, the diagnostic.

   scripts/build-week-decks.js assembles a normal deck (same engine, same
   design system, same drawing primitives) whose only content is
   `window.DAF_WEEK` — that file's week, sliced by
   scripts/extract-week-content.js. This file turns that payload into screens:

     0            the week itself — focus, the FIKR routine, the route
     1 … n-1      one screen per printed section (per revision day)
     n            the closing: what to take home, muhasabah, the signed card

   Nothing is invented: every line on every screen is a line of the week file.
   ========================================================================== */

const WDeck = (function () {
  const W = (typeof window !== "undefined" && window.DAF_WEEK) || null;
  if (!W) return null;

  /* ---- which screens does this week need? -------------------------------- */
  const list = [];
  list.push({ kind: "intro" });
  if ((W.days || []).length) {
    W.days.forEach((d, i) => list.push({ kind: "day", day: d, n: i + 1 }));
  }
  (W.sections || []).forEach((s) => {
    if (/^Day\s/i.test(s.heading || "")) return;
    const has = (s.blocks || []).length || (s.items || []).length;
    if (has) list.push({ kind: "section", sec: s });
  });
  if (W.diagnostic) list.push({ kind: "section", sec: W.diagnostic, diagnostic: true });
  if (W.examScope) list.push({ kind: "exam" });
  if (W.homework) list.push({ kind: "section", sec: W.homework, homework: true });
  list.push({ kind: "close" });

  const firstFigOf = (obj) => {
    const src = obj || {};
    const withFig = (src.items || []).concat(src.understand || [], src.knowHow || []).find((x) => x && x.fig);
    if (withFig) return withFig.fig;
    const blk = (src.blocks || []).find((b) => b && b.fig);
    return blk ? blk.fig : null;
  };

  /* ---- drawings ----------------------------------------------------------- */
  const drawWeekCover = (ctx, W2, H, frame) => {
    D.rr(ctx, 0, 0, W2, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
    const f = frame % 900;
    const days = (W.days || []).length || (W.sections || []).length || 1;
    /* the week's path, day by day */
    const y = H * 0.62, x0 = 40, x1 = W2 - 40;
    D.marker(ctx, [[x0, y], [x1, y]], D.at(f, 0, 260), "rgba(234,244,242,.5)", 2.2);
    for (let i = 0; i < days; i++) {
      const cx = days === 1 ? (x0 + x1) / 2 : x0 + (x1 - x0) * (i / (days - 1));
      const a = D.at(f, 120 + i * 70, 260 + i * 70);
      D.star8(ctx, cx, y, 11, a, "rgba(201,162,39,.85)", 1.7);
      D.txt(ctx, (W.days ? "Day " + (i + 1) : (i + 1) + ""), cx, y - 24, { size: 11, col: "rgba(234,244,242,.7)", font: "marker", alpha: a });
    }
    D.txt(ctx, "SEMESTER " + W.semester + " \u00b7 WEEK " + (W.week < 10 ? "0" : "") + W.week, W2 / 2, H * 0.2,
      { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 180) });
    D.txt(ctx, (W.kind || "revision").toUpperCase() + " \u00b7 " + (W.focus || "").toUpperCase(), W2 / 2, H * 0.2 + 24,
      { size: 11, col: "rgba(234,244,242,.66)", font: "marker", alpha: D.at(f, 90, 260) });
    D.txt(ctx, "every number exactly as printed in " + (W.source || "the week file"), W2 / 2, H * 0.85,
      { size: 11, col: "#34D399", font: "marker", alpha: D.at(f, 420, 620) });
  };

  const drawDayMap = (n, total, kind) => (ctx, W2, H, frame) => {
    wkPanel(ctx, W2, H, null, frame);
    const f = frame % 760;
    const y = H / 2 + 8, x0 = 34, x1 = W2 - 34;
    D.marker(ctx, [[x0, y], [x1, y]], 1, "rgba(234,244,242,.4)", 2);
    for (let i = 1; i <= total; i++) {
      const cx = x0 + (x1 - x0) * ((i - 1) / Math.max(1, total - 1));
      const on = i === n;
      D.star8(ctx, cx, y, on ? 14 : 8, D.at(f, i * 40, i * 40 + 160), on ? "#C9A227" : "rgba(234,244,242,.45)", 1.7);
    }
    D.txt(ctx, kind + " " + n + " of " + total, W2 / 2, 18, { size: 11.5, col: "rgba(234,244,242,.6)", font: "marker" });
  };

  /* ---- screens ------------------------------------------------------------ */
  function Intro() {
    return (
      <div className="wk-panel glass-panel">
        <div className="wk-open-head">
          <div className="wk-badge">
            <span>Semester {W.semester}</span>
            <b>Week {W.week < 10 ? "0" + W.week : W.week}</b>
            <span className="mono">{W.year}</span>
          </div>
          <div className="wk-open-title">
            <h2>{W.title || W.focus}</h2>
            <div className="wk-open-sub">
              {W.focus && <span><Icon name="fa-bullseye" /> {W.focus}</span>}
              {W.topic && <span><Icon name="fa-layer-group" /> {W.topic}</span>}
              <span className="mono"><Icon name="fa-file-lines" /> {W.source}</span>
            </div>
          </div>
        </div>
        <div className="wk-cols">
          <div className="wk-col">
            {(W.banner || []).slice(0, 4).map((b, i) => (
              <p className="wk-p" key={i}>{String(b).replace(/\*\*/g, "")}</p>
            ))}
            {W.cycle && <div className="wk-card"><b><Icon name="fa-route" /> The cycle this week</b><p className="wk-p">{W.cycle}</p></div>}
          </div>
          <div className="wk-col">
            <div className="wk-fig"><Sketch draw={drawWeekCover} height={190} /></div>
            {(W.essentialQuestions || []).length > 0 && (
              <div className="wk-eq-box">
                <b><Icon name="fa-circle-question" /> Essential Questions</b>
                {W.essentialQuestions.map((q, i) => <p key={i}>{q}</p>)}
              </div>
            )}
          </div>
        </div>
        {(W.fikr || []).length > 0 && (
          <div className="wk-fikr">
            <b>How the week runs \u00b7 {W.kind || "revision"} cycle</b>
            <div className="wk-fikr-grid">
              {W.fikr.map((s, i) => (
                <div key={i} className="wk-fikr-cell">
                  <span className="mono">{s.time}</span><b>{s.stage}</b><p>{s.do}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  function DayScreen({ d, n }) {
    const fig = firstFigOf({ items: d.items, blocks: d.blocks });
    const blocks = [{ t: "head", text: "Must-know" }].concat((d.mustKnow || []).map((m) => ({ t: "p", text: m })));
    return (
      <div className="wk-panel glass-panel">
        <div className="wk-cols">
          <div className="wk-col">
            <WkSectionHead label={d.day || ("Day " + n)} title={d.title || "Today's review"} />
            <WkBlocks blocks={blocks} max={10} />
            {(d.vocab || []).length > 0 && (
              <div className="wk-card"><b><Icon name="fa-spell-check" /> Vocabulary check</b>
                <div className="wk-opts">{d.vocab.map((v, i) => <span key={i} className="wk-tag">{v}</span>)}</div>
              </div>
            )}
            {d.blocks && d.blocks.length > 0 && <WkBlocks blocks={d.blocks} max={6} />}
          </div>
          <div className="wk-col">
            <div className="wk-fig"><Sketch draw={drawDayMap(n, W.days.length, "Day")} height={92} /></div>
            {(d.items || []).length > 0 && (
              <WkItemList items={d.items} label="Quick Practice \u2014 as printed" per={3} />
            )}
            {fig && <WeekFig fig={fig} height={160} caption="the model, drawn from the printed numbers" />}
          </div>
        </div>
      </div>
    );
  }

  function SectionScreen({ sec, diagnostic, homework }) {
    const blocks = (sec.blocks || []);
    const items = sec.items || [];
    const fig = firstFigOf(sec);
    return (
      <div className="wk-panel glass-panel">
        <WkSectionHead label={homework ? "Homework / fluency" : diagnostic ? "Diagnostic" : "From the week file"}
          title={sec.heading} sub={sec.stem || ""} />
        <div className="wk-cols">
          <div className="wk-col">
            <WkBlocks blocks={blocks} max={12} />
            {blocks.length > 12 && <div className="wk-more mono">{blocks.length - 12} more line(s) on the printed page</div>}
          </div>
          <div className="wk-col">
            {fig && <WeekFig fig={fig} height={168} />}
            {items.length > 0 && <WkItemList items={items} label="As printed" per={4} />}
          </div>
        </div>
      </div>
    );
  }

  function ExamScreen() {
    const sc = W.examScope || {};
    return (
      <div className="wk-panel glass-panel">
        <WkSectionHead label="The paper" title="Exam scope, exactly as the department printed it" />
        <div className="wk-cols">
          <div className="wk-col">
            <WkTable head={sc.head} rows={sc.rows} />
            {(W.examNotes || []).length > 0 && <WkBlocks blocks={W.examNotes} max={6} />}
          </div>
          <div className="wk-col">
            {(W.sections || []).filter((s) => /Standards|Skills|Structure|Administration|After/i.test(s.heading || ""))
              .slice(0, 3).map((s, i) => (
                <div key={i} className="wk-card">
                  <b><Icon name="fa-list-check" /> {s.heading}</b>
                  <WkBlocks blocks={s.blocks} max={10} />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  function CloseScreen() {
    return (
      <div className="wk-panel glass-panel">
        <WkSectionHead label="Closing" title="What the boy takes home from this week" />
        <div className="wk-cols">
          <div className="wk-col">
            {W.homework && (
              <div className="wk-card"><b><Icon name="fa-house-chimney-window" /> Homework / fluency</b>
                <WkBlocks blocks={W.homework.blocks} max={8} /></div>
            )}
            {(W.sections || []).filter((s) => /After the Exam|Administration/i.test(s.heading || "")).map((s, i) => (
              <div key={i} className="wk-card"><b><Icon name="fa-clipboard-check" /> {s.heading}</b>
                <WkBlocks blocks={s.blocks} max={6} /></div>
            ))}
          </div>
          <div className="wk-col">
            <div className="wk-card wk-muha">
              <b><Icon name="fa-moon" /> Muhasabah</b>
              <ul className="wk-list">
                <li>Which must-know can I explain without looking?</li>
                <li>Which Quick Practice item did I check honestly?</li>
                <li>What will I ask about on the day of the paper?</li>
              </ul>
            </div>
            <div className="wk-card">
              <b><Icon name="fa-pen-nib" /> The signed card</b>
              <p className="wk-p">A three-line &ldquo;my method&rdquo; card, with the name on it — the week's evidence for the wall.</p>
            </div>
            <div className="wk-foot">
              <span><Icon name="fa-laptop" /> SavvasRealize.com — Topic Assessments, Reteaching sets, Practice Buddy</span>
              <span className="mono">Dar Al Fikr Boys School · Jeddah</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---- the LESSON the engine drives -------------------------------------- */
  const title = (W.title || ("Week " + W.week)).replace(/^Semester\s*\d\s*[—-]\s*/i, "");
  const kindLabel = W.kind === "exam" ? "Final Examinations" : W.kind === "orientation" ? "Orientation & Diagnostic" : "General Revision";
  const M = { week: om(mt("Semester" + W.semester + "-Week" + (W.week < 10 ? "0" : "") + W.week)) };
  const metas = list.map((sc) => {
    const label = sc.kind === "intro" ? "the week before it starts"
      : sc.kind === "day" ? (sc.day.title || ("Day " + sc.n))
      : sc.kind === "exam" ? "the paper and its scope"
      : sc.kind === "close" ? "signed work, then muhasabah"
      : (sc.sec.heading || "from the week file");
    return {
      phase: sc.kind === "intro" ? "warmup" : sc.kind === "close" ? "synth" : sc.kind === "day" ? "monitor" : "connect",
      title: sc.kind === "intro"
        ? "Semester " + W.semester + " · <em>Week " + (W.week < 10 ? "0" + W.week : W.week) + "</em> \u2014 " + kindLabel
        : label,
      lead: sc.kind === "day"
        ? "Must-know, then the Quick Practice run, exactly as the week file prints it."
        : sc.kind === "intro" ? (W.focus || "") : (W.focus || kindLabel),
      goal: sc.kind === "exam" ? "Know the shape of the paper before you sit it."
        : sc.kind === "close" ? "Leave with something signed."
        : "Recover what the term built, item by item.",
      pull: "Nothing here is invented — it is the department's own page.",
      rail: {
        launch: sc.kind === "day"
          ? "Read the must-know list aloud, one line per boy, before anyone opens the practice run."
          : "Set the frame from the week file, then hand the room over to the boys.",
        monitor: sc.kind === "day"
          ? ["He can say the rule, not just do it", "He checks with an estimate", "He names the item he is unsure of"]
          : ["Every boy has the week's plan in front of him", "The printed numbers stay untouched"],
        connect: sc.kind === "day" ? "Which of these must-knows did we use last week too?" : "Where does this week's page touch the ones before it?",
        misconception: "Treating revision as re-reading instead of re-doing."
      }
    };
  });

  return {
    code: W.deckCode || ("week-" + W.semester + "-" + W.week),
    storageKey: "daf-g4-week-s" + W.semester + "-" + W.week,
    title: "Week " + (W.week < 10 ? "0" + W.week : W.week) + " \u00b7 " + kindLabel,
    unit: "GRADE 4 \u00b7 SEMESTER " + W.semester + " \u00b7 WEEK " + (W.week < 10 ? "0" + W.week : W.week) + " \u00b7 " + kindLabel.toUpperCase(),
    math: M,
    ixl: [],
    metas,
    Visual: function ({ i }) {
      const sc = list[i];
      if (!sc) return null;
      switch (sc.kind) {
        case "intro": return <Intro />;
        case "day": return <DayScreen d={sc.day} n={sc.n} />;
        case "exam": return <ExamScreen />;
        case "close": return <CloseScreen />;
        default: return <SectionScreen sec={sc.sec} diagnostic={sc.diagnostic} homework={sc.homework} />;
      }
    }
  };
})();

/* the engine drives whatever LESSON the source defines — for a week deck the
   whole object above is built from the week file, nothing else */
const LESSON = WDeck || { code: "week-none", storageKey: "daf-g4-week-none", title: "Week deck",
  unit: "GRADE 4", math: {}, ixl: [], metas: [{ phase: "warmup", title: "No week payload", lead: "", goal: "", pull: "",
  rail: { launch: "", monitor: [], connect: "", misconception: "" } }], Visual: () => null };
