/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-8 · Problem Solving: Reasoning
   Standard MP.2   I can ... reason about a word problem, draw a diagram that
   shows the relationship, and decide which operation it needs.
   =========================================================================== */

const M = {
  known: om(mt("1,284"), mnor(" and "), mt(""), mt("867")),
  partPart: om(mt("1,284+867=2,151")),
  wholePart: om(mt("2,151-867=1,284")),
  compare: om(mt("1,284-867=417")),
  twoStep: om(mt("1,284+867=2,151"), mnor(", then "), mt("2,500-2,151=349")),
  question: om(mnor("what is missing — a part, or the whole?")),
  swykStep1: om(mt("2,340+1,875=4,215")),
  swykAnswer: om(mt("5,000-4,215=785"))
};

/* Warm-Up: the same two numbers, three different diagrams */
const makeDiagram = (kind, onKind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 56, w = W - 112, y = 96;
  if (onKind) {
    const order = ["sum", "missing", "compare"];
    D.tap(ctx, { x: x, y: 64, w: w, h: 112, value: 0, on: () => {
      const i = order.indexOf(kind);
      onKind(order[(i + 1) % order.length]);
    }});
  }
  if (kind === "sum") {
    D.strip(ctx, { x: x, y: y, w: w, h: 48, prog: 1, total: "?",
      parts: [{ v: 1284, label: "1,284", col: "#2D70B3", sub: "Saturday" },
              { v: 867, label: "867", col: "#FA7E19", sub: "Sunday" }] });
    D.txt(ctx, "both parts known — the whole is missing", W / 2, H - 34,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "add", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  } else if (kind === "missing") {
    D.strip(ctx, { x: x, y: y, w: w, h: 48, prog: 1, total: 2151,
      parts: [{ v: 867, label: "867", col: "#FA7E19", sub: "Sunday" },
              { v: 1284, label: "?", col: "#2D70B3", sub: "Saturday" }] });
    D.txt(ctx, "the whole and one part known", W / 2, H - 34,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "subtract", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.strip(ctx, { x: x, y: y - 26, w: w, h: 38, prog: 1,
      parts: [{ v: 1284, label: "1,284", col: "#2D70B3", sub: "Saturday" }] });
    D.strip(ctx, { x: x, y: y + 32, w: w * (867 / 1284), h: 38, prog: 1,
      parts: [{ v: 867, label: "867", col: "#FA7E19", sub: "Sunday" }] });
    const gx = x + w * (867 / 1284);
    ctx.save();
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.8; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(gx, y - 30); ctx.lineTo(gx, y + 74); ctx.stroke();
    ctx.restore();
    D.txt(ctx, "?", (gx + x + w) / 2, y + 51, { size: 18, col: "#C9A227", font: "marker" });
    D.txt(ctx, "two amounts compared — the gap is missing", W / 2, H - 34,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "subtract to find the difference", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  }
};

/* Launch: the book fair over two days, question hidden at first */
const drawFair = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 300), p3 = D.at(f, 310, 440);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school book fair", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const days = [{ n: 1284, label: "Saturday", col: "#2D70B3" }, { n: 867, label: "Sunday", col: "#FA7E19" }];
  days.forEach((d, k) => {
    const a = D.at(p2, k * 0.35, k * 0.35 + 0.6);
    if (a <= 0) return;
    const bw = (d.n / 1400) * (W - 170);
    ctx.save();
    ctx.globalAlpha = a * 0.72;
    D.rr(ctx, 96, 58 + k * 58, bw, 38, 7);
    ctx.fillStyle = d.col; ctx.fill();
    ctx.restore();
    D.txt(ctx, d.label, 90, 77 + k * 58, { size: 12, col: d.col, font: "marker", align: "right", alpha: a });
    D.txt(ctx, d.n.toLocaleString("en-US"), 96 + bw + 10, 77 + k * 58,
      { size: 15, col: "#EAF4F2", font: "marker", align: "left", alpha: a });
  });
  if (p3 > 0) {
    D.txt(ctx, "the target was 2,500 books", W / 2, 172,
      { size: 13, col: "rgba(234,244,242,.7)", font: "marker", alpha: p3 });
    D.txt(ctx, "what question could you ask?", W / 2, H - 20,
      { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 380, 460) });
  }
};

/* Monitor: build a two-step solution one step at a time */
const makeTwoStep = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: 56, y: 56, w: W - 112, h: H - 100, value: 0, on: () => onStep((step + 1) % 3) });
  const x = 56, w = W - 112;
  D.strip(ctx, { x: x, y: 62, w: w * (2151 / 2500), h: 42, prog: step >= 1 ? 1 : 0.001,
    parts: [{ v: 1284, label: "1,284", col: "#2D70B3" }, { v: 867, label: "867", col: "#FA7E19" }] });
  if (step >= 1) D.txt(ctx, "step 1: 1,284 + 867 = 2,151", W / 2, 128,
    { size: 14, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 168, w: w, h: 42, prog: 1, total: 2500,
      parts: [{ v: 2151, label: "2,151 sold", col: "#12857C" }, { v: 349, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "step 2: 2,500 − 2,151 = 349", W / 2, 240, { size: 14, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "349 books short of the target" : "one step is not enough to answer it",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

const drawBoard28 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Which operation does this problem need?" });
  const p1 = D.at(f, 20, 180), p2 = D.at(f, 190, 360), p3 = D.at(f, 370, 540), p4 = D.at(f, 550, 700);

  D.txt(ctx, "draw what you know", W / 2, 88, { size: 15, col: "#EAF4F2", font: "marker", alpha: p1 });
  if (p1 > 0.4) {
    D.strip(ctx, { x: 92, y: 116, w: W - 184, h: 42, prog: p1, total: "?",
      parts: [{ v: 1284, label: "1,284", col: "#2D70B3" }, { v: 867, label: "867", col: "#FA7E19" }] });
  }
  if (p2 > 0) {
    D.txt(ctx, "the whole is missing → add", W / 2, 196,
      { size: 15, col: "#34D399", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.strip(ctx, { x: 92, y: 232, w: W - 184, h: 42, prog: p3, total: 2500,
      parts: [{ v: 2151, label: "2,151", col: "#12857C" }, { v: 349, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "a part is missing → subtract", W / 2, 306,
      { size: 15, col: "#34D399", font: "marker", alpha: D.at(f, 430, 520) });
  }
  if (p4 > 0) {
    const yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the diagram tells you the operation — not the words in the question",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 590, 680) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 630, 730), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport28 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 30, w: W - 48, h: 38, prog: 1, total: 5000,
    parts: [{ v: 4215, label: "4,215 raised", col: "#12857C" }, { v: 785, label: "?", col: "#C9A227" }] });
};


/* Critique: the auditor's polished solution, with a hidden gap */
const makeAudit = (found, onFound) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onFound) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onFound(!found) });
  D.txt(ctx, "the auditor's polished solution", W / 2, 26, { size: 13, col: "#2D70B3", font: "marker" });
  const lines = [
    { t: "step 1: 1,284 + 867 = 2,151", ok: true },
    { t: "the total of the two days is 2,151", ok: true },
    { t: "so the remainder is 2,151", ok: false }
  ];
  let y = 62;
  lines.forEach((l) => {
    const flagged = found && !l.ok;
    ctx.save();
    D.rr(ctx, 30, y - 15, W - 60, 34, 7);
    ctx.fillStyle = flagged ? "rgba(199,68,64,.18)" : "rgba(234,244,242,.04)";
    ctx.fill();
    if (flagged) { ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    D.txt(ctx, l.t, W / 2, y + 2, { size: 13.5, col: flagged ? "#C74440" : "#EAF4F2", font: "marker" });
    y += 42;
  });
  D.txt(ctx, found ? "the second step is missing — the target was 2,500, not 2,151"
                   : "polished — but which step has no evidence behind it?",
    W / 2, H - 18, { size: 13, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

/* Revision: choose the second step that completes the two-step solution */
const makeRevision = (pick, onPick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onPick) D.tap(ctx, { x: 56, y: 40, w: W - 112, h: 110, value: 0, on: (v, tx) => {
    const opts = [W / 2 - 150, W / 2, W / 2 + 150];
    let best = 0, bd = Infinity;
    opts.forEach((x, i) => { const d = Math.abs(x - tx); if (d < bd) { bd = d; best = i; } });
    onPick(best);
  }});
  const opts = ["2,500 − 2,151", "2,151 − 867", "2,500 − 1,284"];
  opts.forEach((o, i) => {
    const x = W / 2 + (i - 1) * 150;
    const chosen = pick === i;
    ctx.save();
    D.rr(ctx, x - 62, 44, 124, 34, 8);
    ctx.fillStyle = chosen ? (i === 0 ? "rgba(18,133,124,.25)" : "rgba(199,68,64,.18)") : "rgba(234,244,242,.05)";
    ctx.fill();
    ctx.strokeStyle = chosen ? (i === 0 ? "#12857C" : "#C74440") : "rgba(234,244,242,.3)";
    ctx.lineWidth = chosen ? 2 : 1; ctx.stroke();
    ctx.restore();
    D.txt(ctx, o, x, 61, { size: 13, col: chosen ? (i === 0 ? "#34D399" : "#C74440") : "#EAF4F2", font: "mono", weight: 700 });
  });
  D.txt(ctx, "step 1 held: 1,284 + 867 = 2,151", W / 2, 108, { size: 13.5, col: "#34D399", font: "marker" });
  if (pick === 0) {
    D.txt(ctx, "step 2: 2,500 − 2,151 = 349", W / 2, 146, { size: 15, col: "#34D399", font: "marker" });
    D.txt(ctx, "349 books short of the target — the corrected two-step", W / 2, H - 18,
      { size: 13, col: "#C9A227", font: "marker" });
  } else if (pick > 0) {
    D.txt(ctx, pick === 1 ? "that answers how much more Saturday sold — not the target"
                          : "that answers the gap to Saturday alone — not the target",
      W / 2, 150, { size: 13.5, col: "#C74440", font: "marker" });
    D.txt(ctx, "which step subtracts the total from the 2,500 target?", W / 2, H - 18,
      { size: 13, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, "the second step is still missing — choose it", W / 2, 150,
      { size: 13.5, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

const LESSON = {
  code: "2-8",
  storageKey: "daf-g4-t2-l8",
  title: "Problem Solving: Reasoning",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-8 · MP.2",
  math: M,
  ixl: ["CZM", "RJJ", "F5H"],

  metas: [
    { phase: "warmup", title: "A polished solution <em>under the seal</em>",
      lead: "The auditor's desk: 1,284 books Saturday, 867 Sunday, a 2,500 target — and a sealed solution that looks perfect.",
      goal: "Reason before answers — a polished line can still hide a gap.",
      pull: "The fair's counts are simulated — the reasoning works on any three numbers.",
      rail: { launch: "Fictional frame. Look at the numbers — do not solve anything yet.",
        monitor: ["Noticing the target 2,500", "Asking what question the numbers answer", "Trusting the polish"],
        connect: "What could the numbers be used to find?",
        misconception: "Assuming a tidy solution is a correct one." } },

    { phase: "launch", title: "Which card has a <em>hidden gap</em>?",
      lead: "Four audit cards from the sealed solution. Three are valid. One does not follow.",
      goal: "Find the card that does not belong — and the step it skips.",
      pull: "Every card has a reason. Only one reason fails.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Checking the total", "Checking the compare", "Reading the last card twice"],
        connect: "Which claim needs a step nobody wrote?",
        misconception: "Choosing the card with the biggest number." } },

    { phase: "monitor", title: "Draw what you <em>know</em>",
      lead: "Pick the diagram that matches the question you are answering.",
      goal: "Part-part-whole and comparison are different shapes.",
      pull: "Where the question mark sits tells you the operation.",
      rail: { launch: "Predict where the question mark will sit before you tap.",
        monitor: ["Placing the unknown correctly", "Confusing part and whole", "Drawing two bars for a comparison"],
        connect: "Where is the unknown in each diagram?",
        misconception: "Drawing one bar for a comparison problem." } },

    { phase: "monitor", title: "What is <em>missing</em>?",
      lead: "Same diagrams, sharper question: a part, the whole, or the difference?",
      goal: "Name the missing piece before choosing the operation.",
      pull: "A missing whole means add. A missing part means subtract.",
      rail: { launch: "Say what is missing before you say what to do.",
        monitor: ["Naming the missing whole", "Naming the missing part", "Naming the difference"],
        connect: "How does the missing piece change the operation?",
        misconception: "Treating the diagram as decoration rather than a decision tool." } },

    { phase: "monitor", title: "Sort the <em>four equations</em>",
      lead: "Four lines from the fair. Each one belongs to a different shape.",
      goal: "Classify equations by the relationship they show.",
      pull: "One of them needs two steps.",
      rail: { launch: "Name the shape each equation shows.",
        monitor: ["Spotting part + part", "Spotting whole − part", "Spotting the two-step"],
        connect: "Which line cannot be answered from the two days alone?",
        misconception: "Sorting by the operation symbol instead of the relationship." } },

    { phase: "monitor", title: "A problem in <em>two steps</em>",
      lead: "How far from the 2,500 target? You cannot answer that in one move.",
      goal: "Multi-step problems chain two diagrams together.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: { launch: "What do you have to work out before you can answer the question?",
        monitor: ["Finding the total first", "Subtracting from 2,500 first", "Trying to do it in one step"],
        connect: "Why can the second step not come first?",
        misconception: "Subtracting 867 from 2,500 and stopping." } },

    { phase: "connect", title: "Diagram first, or <em>equation first</em>?",
      lead: "Hassan draws the bars, then writes the equation. Musa writes the equation, then names each number. Both reach 349.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the diagram route", "Following the equation route", "Checking both give 349"],
        connect: "Which route would catch the auditor's gap?",
        misconception: "Believing there is only one correct order." } },

    { phase: "monitor", title: "The polished solution's <em>hidden gap</em>",
      lead: "Read the auditor's solution line by line. One step has no evidence behind it.",
      goal: "Critique a polished argument: find the step that does not follow.",
      pull: "The total is not the remainder.",
      rail: { launch: "Each line must follow from the line before it.",
        monitor: ["Checking step 1", "Checking the total line", "Flagging the remainder claim"],
        connect: "What number was the solution pretending was the target?",
        misconception: "Accepting the final line because the solution looks polished." } },

    { phase: "monitor", title: "Choose the <em>missing step</em>",
      lead: "The total held: 2,151. Now choose the step that subtracts it from the 2,500 target.",
      goal: "Revise the solution by supplying the missing step.",
      pull: "Step 1 feeds step 2.",
      rail: { launch: "What does each candidate step actually answer?",
        monitor: ["Reading 2,500 − 2,151", "Discarding 2,151 − 867", "Discarding 2,500 − 1,284"],
        connect: "How do you know the revised solution now holds?",
        misconception: "Choosing the step that uses the most familiar numbers." } },

    { phase: "synth", title: "On the <em>board</em>: sign only what the parts prove",
      lead: "Draw what you know. See what is missing. The diagram names the operation.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next bar", "Naming the unknown", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Hunting for key words like altogether or left." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "Budget 5,000. Rows 2,340 and 1,875. The remainder?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the diagram before you calculate.",
        monitor: ["Drawing first", "Finding the middle step", "Checking against an estimate"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering with the total raised instead of the amount still needed." } },

    { phase: "synth", title: "Why ledgers can be <em>re-checked</em>",
      lead: "The seal is earned, not assumed — the written record is what makes the audit possible.",
      goal: "Connect the lesson to the history of useful knowledge behind the ledger.",
      pull: "A record you can re-check is a record people can trust.",
      rail: { launch: "Read the window as history of a method, not a story about people's faith.",
        monitor: ["Connecting place value to checkable records", "Asking about the sources", "Testing the rule on their own work"],
        connect: "Where in your own life do you re-check a record?",
        misconception: "Reading the window as an invention claim." } },

    { phase: "monitor", title: "The seal asks for <em>evidence</em>",
      lead: "Before the seal is pressed, the class says what the seal actually protects.",
      goal: "Close the unit on the standard, not the score.",
      pull: "Sign only what the parts prove.",
      rail: { launch: "Ask for the rule in students' own words before the seal.",
        monitor: ["Naming the missing piece first", "Naming the two steps", "Saying 'evidence' unprompted"],
        connect: "What would you refuse to sign, and why?",
        misconception: "Treating the seal as a reward for speed." } },

    { phase: "connect", title: "The ledger is <em>signed</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next chapter: repeated batches need multiplication, not repeated addition.",
      rail: { launch: "Ask three students how they decide which operation to use.",
        monitor: ["Able to explain it to someone else", "Still needs the diagram", "Ready for Topic 3"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("sum");
    const [step, setStep] = useState(0);
    const [gap, setGap] = useState(false);
    const [pick, setPick] = useState(-1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="A polished solution under the seal"
            text="The auditor's desk at the book fair: 1,284 books Saturday, 867 Sunday, a 2,500 target — and a sealed solution that looks perfect."
            clue="A polished line can still hide a gap">
            <NoticeWonder draw={drawFair} height={256} award={award}
              notices={["The target is 2,500", "Both days are under 1,400", "The solution is already sealed", "Nothing has been re-checked yet"]}
              wonders={["What question could these numbers answer?", "Does the sealed solution hold?", "How would you check a polished answer?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Four audit cards, one hidden gap"
            text="Omar unseals four audit cards. Three follow the evidence. One does not — find it before the seal is pressed again."
            clue="Every card has a reason. Only one reason fails.">
            <WODB award={award}
              prompt="Four audit cards from the sealed solution. Three are valid. One hides a gap — which one doesn't belong?"
              cards={[
                { id: "a", omml: M.partPart, why: "valid — both parts are known, so the total is 2,151" },
                { id: "b", omml: M.wholePart, why: "valid — take away Sunday and Saturday comes back" },
                { id: "c", omml: M.compare, why: "valid — Saturday sold 417 more than Sunday" },
                { id: "d", text: "the total is 2,151, so the remainder is 2,151", why: "the hidden gap — the total is not the remainder; the target is 2,500" }
              ]} />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd draws the diagram that fits"
            text="He can draw any of the three shapes — the class must name the relationship before the bars appear."
            clue="Where the question mark sits tells you the operation">
            <ExploreChips draw={makeDiagram(kind, setKind)} height={252}
              label="Choose the diagram that fits"
              value={kind}
              onPick={(v) => setKind(v)}
              chips={[{ v: "sum", label: "part + part → the total" }, { v: "missing", label: "whole − part" }, { v: "compare", label: "compare the two" }]}
              caption={<MathEl omml={kind === "sum" ? M.partPart : kind === "missing" ? M.wholePart : M.compare} size="lg" display="block" />}
              footnote="Where the question mark sits tells you which operation you need." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar asks what is missing"
            text="Same diagrams, sharper question: a part, the whole, or the difference? Name it before you choose the operation."
            clue="A missing whole means add — a missing part means subtract">
            <ExploreChips draw={makeDiagram(kind, setKind)} height={252}
              label="What is missing?"
              value={kind}
              onPick={(v) => setKind(v)}
              chips={[{ v: "sum", label: "the whole is missing" }, { v: "missing", label: "a part is missing" }, { v: "compare", label: "the difference is missing" }]}
              caption={<MathEl omml={M.question} size="lg" display="block" />}
              footnote="The missing piece names the operation." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Sort the four equations"
            text="Omar and Zayd lay four lines from the fair on the table. Each one belongs to a different shape."
            clue="One of them needs two steps">
            <CardSort award={award} columns={4} commitLabel="Sort the shapes"
              items={[
                { id: "q1", text: "1,284 + 867 = 2,151", target: "pp" },
                { id: "q2", text: "2,151 − 867 = 1,284", target: "wp" },
                { id: "q3", text: "1,284 − 867 = 417", target: "cmp" },
                { id: "q4", text: "2,500 − 2,151 = 349", target: "two" }
              ]}
              targets={[
                { id: "pp", label: "part + part" },
                { id: "wp", label: "whole − part" },
                { id: "cmp", label: "compare" },
                { id: "two", label: "two steps" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The two-step budget problem"
            text="How far from the 2,500 target? Omar builds the answer one step at a time — step 1 feeds step 2."
            clue="What do you have to work out before you can answer?">
            <ExploreChips draw={makeTwoStep(step, setStep)} height={266}
              label="How far from the 2,500 target?"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1: the total" }, { v: 2, label: "step 2: the remainder" }]}
              caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
              footnote="The answer to step 1 becomes a number you need in step 2." />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, the same 349"
            text="Hassan draws the diagram first, then writes the equation. Musa writes the equation, then names each number. Both reach 349."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Hassan's way — diagram first, then equation", omml: M.partPart, h: 92,
                      quote: "I drew the bars — the question mark told me to add." }}
              right={{ name: "Musa's way — equation, then name the parts", omml: M.twoStep, h: 92,
                       quote: "I wrote 2,500 − 2,151, then named each number." }}
              same={["Both reach 349", "Both use the total from step 1", "Both can defend the answer"]}
              diff={["Hassan's diagram shows the target bar", "Musa's names make the steps explicit", "Hassan's route catches a missing step visually"]} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build" support="rashed"
            title="The polished solution's hidden gap"
            text="Rashed, from the rival school, lays his polished solution on the auditor's desk. Zayd reads it line by line — one step has no evidence behind it. Flag it."
            clue="The total is not the remainder">
            <ExploreChips draw={makeAudit(gap, setGap)} height={252}
              label="Does the polished solution hold?"
              value={gap ? 1 : 0}
              onPick={(v) => setGap(v === 1)}
              chips={[{ v: 0, label: "no gap — it is polished" }, { v: 1, label: "the gap is the second step" }]}
              caption={<MathEl omml={M.partPart} size="lg" display="block" />}
              footnote="A polished answer can still hide a faulty step." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar supplies the missing step"
            text="The total held: 2,151. Now choose the step that subtracts it from the 2,500 target — and the corrected two-step appears."
            clue="Step 1 feeds step 2">
            <ExploreChips draw={makeRevision(pick, setPick)} height={252}
              label="Choose the missing second step"
              value={pick}
              onPick={(v) => setPick(v)}
              chips={[{ v: 0, label: "2,500 − 2,151" }, { v: 1, label: "2,151 − 867" }, { v: 2, label: "2,500 − 1,284" }]}
              caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
              footnote="The revised solution holds when every step follows from the one before." />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The shared rule is drawn into the ledger"
            text="Zayd builds only what the class can justify: draw what you know, find the missing piece, name the operation."
            clue="Sign only what the parts prove">
            <BoardScreen draw={drawBoard28} height={430}
              caption="Sign only what the parts prove." />
          </StoryShell>
        );

      case 10:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a two-step he can defend"
            text="Budget 5,000, rows 2,340 and 1,875. Show both steps — in order — before the seal."
            clue="The middle step is the total">
            <ShowWhatYouKnow award={award}
              prompt="Budget 5,000; rows 2,340 and 1,875. The remainder?"
              omml={M.swykStep1}
              options={[{ v: "a", text: "785" }, { v: "b", text: "1,145" }, { v: "c", text: "2,151" }, { v: "d", text: "784" }]}
              right="a"
              support={{
                yes: "Yes — 2,340 + 1,875 = 4,215, then 5,000 − 4,215 = 785: both steps, in order.",
                notYet: "Not yet — what do you have to work out before you can answer?",
                draw: drawSupport28, h: 82,
                hint: "The question asks how much MORE is needed, not how much was raised."
              }} />
          </StoryShell>
        );

      case 11:
        return (
          <STEMWindow window={STORY && STORY.stemWindows && STORY.stemWindows[0]}>
            <RuleScreen award={award}
              ommls={[{ omml: M.partPart, alt: "both parts known, the whole is missing" },
                     { omml: M.twoStep, alt: "step 1 feeds step 2" }]}
              hand={"draw what you know · find where the question mark sits · a missing whole means add, a missing part means subtract"}
              cards={[
                { title: "The total we found", omml: M.partPart, note: "both parts were known" },
                { title: "Tap to see the second step", omml: M.wholePart, revealOmml: M.twoStep, reveal: true,
                  note: "step 1 feeds step 2" }
              ]} />
          </STEMWindow>
        );

      case 12:
        return (
          <AmanahWindow window={STORY && STORY.amanahWindows && STORY.amanahWindows[0]}>
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#10242B", marginBottom: "14px" }}>The seal asks for evidence</div>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#10242B", maxWidth: "520px", margin: "0 auto 10px" }}>
                Every number under the seal is backed by a step the class can check. The audit is finished when the parts prove the whole.
              </p>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5B6B70", maxWidth: "520px", margin: "0 auto" }}>
                A ledger is signed not because it is polished, but because each line follows from the one before it.
              </p>
            </div>
          </AmanahWindow>
        );

      case 13:
        return (
          <StoryHandoff support="ihsan"
            title="The ledger is signed"
            text="Omar signs the audited ledger. Under the cover, an order card slips free — every item listed in repeated batches, and the workshop needs multiplication, not repeated addition."
            artifact="Audited ledger · signed"
            next="An order card slips from under the cover — every item listed in repeated batches. The workshop needs multiplication, not repeated addition.">
            <Closing game={game} omml={M.question}
              action="Name a two-step problem from life tonight; write both steps before the answer." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
