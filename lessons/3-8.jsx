/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-8 · Problem Solving: Model with Math
   Standard MP.4   I can ... draw a bar diagram for a multiplication problem
   and write the equation that matches it.
   =========================================================================== */

const M = {
  equal: om(mt("6\u00d7145=870")),
  compare: om(mt("4\u00d7128=512")),
  twoStep: om(mt("6\u00d7145=870"), mnor(", then "), mt("1,000-870=130")),
  unknown: om(mnor("the unknown goes where the question is")),
  swykStep: om(mt("7\u00d7186=1,302")),
  swykAnswer: om(mt("1,500-1,302=198"))
};

const makeBar = (kind, onKind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onKind) { const order = ["equal", "compare", "part"]; D.tap(ctx, { x: 62, y: 56, w: W - 124, h: 110, value: 0, on: () => { const i = order.indexOf(kind); onKind(order[(i + 1) % order.length]); } }); }
  const x = 62, w = W - 124;
  if (kind === "equal") {
    const parts = [];
    for (let k = 0; k < 6; k++) parts.push({ v: 145, label: "145", col: "#2D70B3" });
    D.strip(ctx, { x: x, y: 78, w: w, h: 46, prog: 1, total: "?", parts: parts });
    D.txt(ctx, "6 equal groups of 145 — the total is missing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "multiply", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  } else if (kind === "compare") {
    D.strip(ctx, { x: x, y: 60, w: w * 0.25, h: 38, prog: 1,
      parts: [{ v: 128, label: "128", col: "#FA7E19", sub: "Layth" }] });
    D.strip(ctx, { x: x, y: 124, w: w, h: 38, prog: 1,
      parts: [{ v: 128, label: "128", col: "#2D70B3" }, { v: 128, label: "128", col: "#2D70B3" },
              { v: 128, label: "128", col: "#2D70B3" }, { v: 128, label: "?", col: "#2D70B3" }] });
    D.txt(ctx, "4 times as many — the bigger amount is missing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "multiply", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.strip(ctx, { x: x, y: 60, w: w, h: 42, prog: 1, total: 1000,
      parts: [{ v: 870, label: "6 × 145", col: "#12857C" }, { v: 130, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "the total is known, one part is missing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "multiply, then subtract", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  }
};

const makeSteps = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: 62, y: 56, w: W - 124, h: 120, value: 0, on: () => onStep((step + 1) % 3) });
  const x = 62, w = W - 124;
  const parts = [];
  for (let k = 0; k < 6; k++) parts.push({ v: 145, label: "145", col: "#2D70B3" });
  D.strip(ctx, { x: x, y: 62, w: w * 0.87, h: 40, prog: step >= 1 ? 1 : 0.001, total: step >= 1 ? 870 : null, parts: parts });
  if (step >= 1) D.txt(ctx, "step 1: 6 × 145 = 870", W / 2, 130, { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 168, w: w, h: 40, prog: 1, total: 1000,
      parts: [{ v: 870, label: "870 packed", col: "#12857C" }, { v: 130, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "step 2: 1,000 − 870 = 130", W / 2, 238, { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "130 books still to pack" : "one step will not answer the question",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

const drawWarehouse = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 330), p3 = D.at(f, 340, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "packing books for the book fair", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let b = 0; b < 6; b++) {
    const a = D.at(p2, b / 6, b / 6 + 0.4);
    if (a <= 0) continue;
    const bx = 44 + b * ((W - 100) / 6);
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, bx, 56, (W - 130) / 6, 52, 7);
    ctx.fillStyle = "#2D70B3"; ctx.globalAlpha = a * 0.22; ctx.fill();
    ctx.globalAlpha = a; ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "145", bx + (W - 130) / 12, 84, { size: 14, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "6 boxes of 145 · the order is for 1,000", W / 2, 140,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: p3 });
    D.txt(ctx, "what could you ask?", W / 2, H - 18,
      { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard38 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Draw it, then write it" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 210, 380), p3 = D.at(f, 390, 560), p4 = D.at(f, 560, 720);
  const parts = [];
  for (let k = 0; k < 6; k++) parts.push({ v: 145, label: "145", col: "#2D70B3" });
  D.strip(ctx, { x: 92, y: 112, w: (W - 184) * 0.87, h: 44, prog: p1, total: p2 > 0 ? 870 : "?", parts: parts });
  if (p2 > 0) D.txt(ctx, "6 × 145 = 870", W / 2, 200, { size: 18, col: "#34D399", font: "marker", alpha: p2 });
  if (p3 > 0) {
    D.strip(ctx, { x: 92, y: 236, w: W - 184, h: 44, prog: p3, total: 1000,
      parts: [{ v: 870, label: "870", col: "#12857C" }, { v: 130, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "1,000 − 870 = 130", W / 2, 318, { size: 18, col: "#34D399", font: "marker", alpha: D.at(f, 440, 530) });
  }
  if (p4 > 0) {
    const yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the bar shows the relationship — the equation just writes it down",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 600, 690) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 640, 740), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport38 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 30, w: W - 48, h: 38, prog: 1, total: 1500,
    parts: [{ v: 1302, label: "7 × 186 = 1,302", col: "#12857C" }, { v: 198, label: "?", col: "#C9A227" }] });
};


/* Critique: the grove team's polished claim, with a hidden gap */
const makeClaim = (found, onFound) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onFound) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onFound(!found) });
  D.txt(ctx, "the grove team's claim to the council", W / 2, 26, { size: 13, col: "#2D70B3", font: "marker" });
  const lines = [
    { t: "we packed 6 boxes of 145 books", ok: true },
    { t: "6 × 145 = 870 packed", ok: true },
    { t: "so we have 870 to spare", ok: false }
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
  D.txt(ctx, found ? "the order was 1,000 — 870 packed leaves 130 still to pack"
                   : "polished — but which line has no evidence behind it?",
    W / 2, H - 18, { size: 13, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

/* Revision: choose the second step that completes the two-step model */
const makeFix = (pick, onPick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onPick) D.tap(ctx, { x: 56, y: 40, w: W - 112, h: 110, value: 0, on: (v, tx) => {
    const opts = [W / 2 - 150, W / 2, W / 2 + 150];
    let best = 0, bd = Infinity;
    opts.forEach((x, i) => { const d = Math.abs(x - tx); if (d < bd) { bd = d; best = i; } });
    onPick(best);
  }});
  const opts = ["1,000 − 870", "870 − 130", "1,000 − 145"];
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
  D.txt(ctx, "step 1 held: 6 × 145 = 870 packed", W / 2, 108, { size: 13.5, col: "#34D399", font: "marker" });
  if (pick === 0) {
    D.txt(ctx, "step 2: 1,000 − 870 = 130 still to pack", W / 2, 146, { size: 15, col: "#34D399", font: "marker" });
    D.txt(ctx, "the corrected claim — the council can check both steps", W / 2, H - 18,
      { size: 13, col: "#C9A227", font: "marker" });
  } else if (pick > 0) {
    D.txt(ctx, pick === 1 ? "that subtracts the spare from the packed — backwards"
                          : "that uses one box instead of the whole order",
      W / 2, 150, { size: 13.5, col: "#C74440", font: "marker" });
    D.txt(ctx, "which step takes the packed books from the 1,000 order?", W / 2, H - 18,
      { size: 13, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, "the second step is still missing — choose it", W / 2, 150,
      { size: 13.5, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

const LESSON = {
  code: "3-8",
  storageKey: "daf-g4-t3-l8",
  title: "Problem Solving: Model with Math",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-8 · MP.4",
  math: M,
  ixl: ["TFH"],

  metas: [
    { phase: "warmup", title: "The grove model <em>stands</em>",
      lead: "The council table: 6 boxes of 145 books packed for the grove, an order for 1,000 — and the team's model waiting to be defended.",
      goal: "Notice the model: the unknown goes where the question is.",
      pull: "The warehouse counts are simulated — the modelling works on any order.",
      rail: { launch: "Fictional frame. Look at the boxes and the order — no working yet.",
        monitor: ["Counting the boxes", "Reading the 1,000 order", "Wonding what the model needs"],
        connect: "Where in the model is the question?",
        misconception: "Starting with an equation before a diagram." } },

    { phase: "launch", title: "Which model <em>doesn't belong</em>?",
      lead: "Three bar diagrams and a bare pair of numbers. Three of them are models; one is not.",
      goal: "Find the card that is not a model — and why it fails.",
      pull: "A model needs a shape the question can sit in.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reading the equal-groups bar", "Reading the compare bar", "Flagging the bare numbers"],
        connect: "What does a model need that the numbers alone do not have?",
        misconception: "Treating any two numbers as a model." } },

    { phase: "monitor", title: "Zayd draws the <em>model</em>",
      lead: "Equal groups, times as many, or a missing part — the bar takes the shape of the question.",
      goal: "Choose the diagram that fits, before choosing the operation.",
      pull: "Where the question mark sits tells you which operation you need.",
      rail: { launch: "Predict where the question mark will sit before you tap.",
        monitor: ["Placing the unknown", "Naming the shape", "Matching shape to operation"],
        connect: "Which shape does 6 boxes of 145 need?",
        misconception: "Drawing the bar before knowing what is unknown." } },

    { phase: "monitor", title: "The <em>two-step</em> model",
      lead: "How many are still to pack? Step 1: the total packed. Step 2: the order minus that total.",
      goal: "Chain two steps in one model — step 1 feeds step 2.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: { launch: "What do you have to work out before you can answer?",
        monitor: ["Finding 6 × 145 first", "Subtracting from 1,000 first", "Naming the middle answer"],
        connect: "Why can the second step not come first?",
        misconception: "Subtracting 145 from 1,000 and stopping." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Four questions from the grove. Each one needs one step or two.",
      goal: "Recognise the hidden middle step before modelling.",
      pull: "Ask: do I already know every number I need?",
      rail: { launch: "Say the middle answer before you place the question.",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Fatima <em>writes two</em>. Hamza writes <em>one</em>",
      lead: "Fatima: one equation at a time, the middle answer shown. Hamza: the whole chain in one line. Both reach 130.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the two equations", "Reading the one-line chain", "Finding the middle answer in each"],
        connect: "Which form would you defend to the council, and why?",
        misconception: "Believing the shorter equation is always clearer." } },

    { phase: "monitor", title: "The claim's <em>hidden gap</em>",
      lead: "The grove team presents: 870 packed, so they have 870 to spare. Polished — but one line has no evidence.",
      goal: "Critique a defended claim: find the step that does not follow.",
      pull: "The total packed is not the spare.",
      rail: { launch: "Each line must follow from the line before it.",
        monitor: ["Checking the packed total", "Checking the order number", "Flagging the spare claim"],
        connect: "What number was the claim pretending was the order?",
        misconception: "Accepting the final line because the claim sounds confident." } },

    { phase: "monitor", title: "Supply the <em>missing step</em>",
      lead: "The total held: 870 packed. Now choose the step that takes it from the 1,000 order.",
      goal: "Revise the model by supplying the missing step.",
      pull: "The corrected claim holds when every step follows.",
      rail: { launch: "What does each candidate step actually answer?",
        monitor: ["Reading 1,000 − 870", "Discarding 870 − 130", "Discarding 1,000 − 145"],
        connect: "How do you know the revised model now holds?",
        misconception: "Choosing the step that uses the most familiar numbers." } },

    { phase: "synth", title: "On the <em>board</em>: the unknown goes where the question is",
      lead: "Draw the model. Place the unknown. Write the equations the model shows.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next bar", "Placing the unknown", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Writing equations with no diagram behind them." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "The model is the argument: every number in it has a job.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming each bar's job", "Checking the add-back", "Testing on a new problem"],
        connect: "Which number in the model is the easiest to misplace?",
        misconception: "Dropping the middle answer from a two-step model." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "7 crates of 186 pens, an order for 1,500. How many are still needed?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the model before you calculate.",
        monitor: ["Drawing first", "Finding the middle step", "Checking against an estimate"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 1,302 — the packed total instead of what is still needed." } },

    { phase: "monitor", title: "The council asks for <em>steadiness</em>",
      lead: "Before the seal, the class says what the grove taught it about carrying a claim.",
      goal: "Close the unit on the standard, not the score.",
      pull: "A model you can re-check is a model people can trust.",
      rail: { launch: "Ask for the rule in students' own words before the seal.",
        monitor: ["Naming the unknown's place", "Naming the two steps", "Saying 'check' unprompted"],
        connect: "What would you refuse to defend, and why?",
        misconception: "Treating the seal as a reward for speed." } },

    { phase: "connect", title: "The grove model is <em>defended</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next chapter: the workshop tower — two-digit multiplication at once.",
      rail: { launch: "Ask three students how they would defend the model.",
        monitor: ["Able to explain the model", "Still needs the bars", "Ready for two-digit factors"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("equal");
    const [step, setStep] = useState(0);
    const [gap, setGap] = useState(false);
    const [pick, setPick] = useState(-1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The grove model stands"
            text="The council table: 6 boxes of 145 books packed for the grove, an order for 1,000 — and the team's model waiting to be defended."
            clue="The unknown goes where the question is">
            <NoticeWonder draw={drawWarehouse} height={256} award={award}
              notices={["There are 6 boxes", "Each box holds 145", "The order is 1,000", "The model has a question mark"]}
              wonders={["How many books are packed?", "How many are still to pack?", "Where does the unknown sit?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Which model doesn't belong?"
            text="Omar lays four cards before the council: three bar diagrams and a bare pair of numbers. One of them is not a model."
            clue="A model needs a shape the question can sit in.">
            <WODB award={award}
              prompt="Three bar diagrams and a pair of numbers. Which one doesn't belong?"
              cards={[
                { id: "a", draw: makeBar("equal"), h: 112, why: "Equal groups with the total missing — multiply" },
                { id: "b", draw: makeBar("compare"), h: 112, why: "The only one with two separate bars, comparing" },
                { id: "c", draw: makeBar("part"), h: 112, why: "The total is known and a part is missing — subtract" },
                { id: "d", text: "6 and 145", why: "The only card with no diagram at all" }
              ]} />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd draws the model"
            text="He can draw any of the three shapes — the class must name the relationship before the bars appear."
            clue="Where the question mark sits tells you the operation">
            <ExploreChips draw={makeBar(kind, setKind)} height={254}
              label="Choose the diagram that fits"
              value={kind}
              onPick={(v) => setKind(v)}
              chips={[{ v: "equal", label: "equal groups" }, { v: "compare", label: "times as many" }, { v: "part", label: "part missing" }]}
              caption={<MathEl omml={M.unknown} size="lg" display="block" />}
              footnote="Where the question mark sits tells you which operation you need." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The two-step model"
            text="How many are still to pack? Omar builds the answer one step at a time — step 1 feeds step 2."
            clue="What do you have to work out before you can answer?">
            <ExploreChips draw={makeSteps(step, setStep)} height={266}
              label="How many are still to pack?"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
              caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
              footnote="The answer to step 1 becomes a number you need in step 2." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="One step or two?"
            text="Omar and Zayd lay four questions from the grove on the table. Each one needs one step — or two."
            clue="Do I already know every number I need?">
            <CardSort award={award} columns={2} commitLabel="Sort the questions"
              items={[
                { id: "q1", text: "How many books in 6 boxes?", target: "one" },
                { id: "q2", text: "Layth read 4 times as many as 128", target: "one" },
                { id: "q3", text: "How many are still to pack?", target: "two" },
                { id: "q4", text: "How many more boxes are needed?", target: "two" }
              ]}
              targets={[
                { id: "one", label: "one step" },
                { id: "two", label: "two steps — something must be worked out first" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 130"
            text="Fatima writes one equation at a time, the middle answer shown. Hamza puts the whole chain in one line. Both reach 130."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Fatima's way — one step at a time", omml: M.equal, h: 92,
                      quote: "First I find the total, then I write a second equation." }}
              right={{ name: "Hamza's way — one equation", omml: M.twoStep, h: 92,
                       quote: "I put the whole thing in one line." }}
              same={["Both reach 130", "Both multiply then subtract", "Both use a letter for the unknown"]}
              diff={["Fatima writes two equations", "Hamza's is shorter but harder to read",
                     "Fatima's shows the middle answer"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The claim's hidden gap"
            text="The grove team presents to the council: 870 packed, so they have 870 to spare. Zayd reads it line by line — one step has no evidence."
            clue="The total packed is not the spare">
            <ExploreChips draw={makeClaim(gap, setGap)} height={252}
              label="Does the defended claim hold?"
              value={gap ? 1 : 0}
              onPick={(v) => setGap(v === 1)}
              chips={[{ v: 0, label: "no gap — it is polished" }, { v: 1, label: "the gap is the second step" }]}
              caption={<MathEl omml={M.equal} size="lg" display="block" />}
              footnote="A confident claim can still hide a faulty step." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar supplies the missing step"
            text="The packed total held: 870. Now choose the step that takes it from the 1,000 order — and the corrected claim appears."
            clue="The corrected claim holds when every step follows">
            <ExploreChips draw={makeFix(pick, setPick)} height={252}
              label="Choose the missing second step"
              value={pick}
              onPick={(v) => setPick(v)}
              chips={[{ v: 0, label: "1,000 − 870" }, { v: 1, label: "870 − 130" }, { v: 2, label: "1,000 − 145" }]}
              caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
              footnote="The council can check both steps of the revised model." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The model is drawn, not declared"
            text="Zayd builds only what the class can justify: the bars drawn, the unknown placed, the equations the model shows."
            clue="The unknown goes where the question is">
            <BoardScreen draw={drawBoard38} height={430}
              caption="The unknown goes where the question is." />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the grove plan with its reason, not alone."
            clue="Every number in the model has a job">
            <RuleScreen award={award}
              ommls={[{ omml: M.unknown, alt: "the unknown goes where the question is" }]}
              hand={"draw the model · place the unknown · write the equations the model shows"}
              cards={[
                { title: "The model we defended", omml: M.twoStep, note: "870 packed, 130 still to pack" },
                { title: "Tap to see the middle answer", omml: M.equal, revealOmml: M.compare, reveal: true,
                  note: "the middle answer is part of the argument" }
              ]} />
          </StoryShell>
        );

      case 10:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar defends a two-step he can check"
            text="7 crates of 186 pens, an order for 1,500. Show both steps — in order — before the seal."
            clue="The middle step is the packed total">
            <ShowWhatYouKnow award={award}
              prompt="A school packs 7 crates of 186 pens. The order is for 1,500 pens. How many are still needed?"
              omml={M.swykStep}
              options={[{ v: "a", text: "1,302" }, { v: "b", text: "198" }, { v: "c", text: "288" }, { v: "d", text: "1,314" }]}
              right="b"
              support={{
                yes: "Yes — 7 × 186 = 1,302, then 1,500 − 1,302 = 198.",
                notYet: "Not yet — what do you have to work out before you can answer?",
                draw: drawSupport38, h: 82,
                hint: "The question asks how many are STILL NEEDED, not how many are packed."
              }} />
          </StoryShell>
        );

      case 11:
        return (
          <AmanahWindow window={STORY && STORY.amanahWindows && STORY.amanahWindows[0]}>
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#10242B", marginBottom: "14px" }}>Steadiness</div>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#10242B", maxWidth: "520px", margin: "0 auto 10px" }}>
                The grove taught the class that a claim is carried, not shouted. Every number in the model has a job, and the model is checked before it is defended.
              </p>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5B6B70", maxWidth: "520px", margin: "0 auto" }}>
                Steadiness means staying with the question until every step of the answer has evidence behind it.
              </p>
            </div>
          </AmanahWindow>
        );

      case 12:
        return (
          <StoryHandoff
            title="The grove model is defended"
            text="Omar signs the defended model. Inside it, a rolled blueprint unrolls: a workshop tower, fabricating many two-digit panels at once. The grove design works — but it needs a larger multiplication model."
            artifact="Grove model · defended before the council"
            next="The grove design works, but its workshop fabricates many two-digit panels at once. A larger multiplication model is required.">
            <Closing game={game} omml={M.unknown}
              action="Draw a bar model for a real two-step problem tonight and write the equations it shows." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
