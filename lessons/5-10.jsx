/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-10 · Problem Solving: Model with Math
   Standard MP.4   I can ... draw a bar diagram for a division problem, write
   the equation, and decide what the remainder means.
   =========================================================================== */

const M = {
  equal: om(mt("144\u00f76=24")),
  twoStep: om(mt("144\u00f76=24"), mnor(", then "), mt("24\u00d72=48")),
  remainder: om(mt("100\u00f78=12 r 4")),
  unknown: om(mnor("the unknown is the size of one group")),
  swykStep: om(mt("150\u00f74=37 r 2")),
  swykAnswer: om(mnor("38 boxes are needed"))
};

const makeBar510 = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  if (kind === "size") {
    const parts = [];
    for (let k = 0; k < 6; k++) parts.push({ v: 24, label: "?", col: "#2D70B3" });
    D.strip(ctx, { x: x, y: 80, w: w, h: 46, prog: 1, total: 144, parts: parts });
    D.txt(ctx, "the whole is known, 6 equal groups", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "divide to find the size of one group", W / 2, H - 16,
      { size: 15, col: "#34D399", font: "marker" });
  } else if (kind === "count") {
    const parts = [];
    for (let k = 0; k < 6; k++) parts.push({ v: 24, label: "24", col: "#FA7E19" });
    D.strip(ctx, { x: x, y: 80, w: w, h: 46, prog: 1, total: 144, parts: parts });
    D.txt(ctx, "the whole is known, each group holds 24", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "divide to find how many groups", W / 2, H - 16,
      { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.strip(ctx, { x: x, y: 62, w: w * 0.5, h: 40, prog: 1,
      parts: [{ v: 24, label: "24", col: "#2D70B3", sub: "one class" }] });
    D.strip(ctx, { x: x, y: 128, w: w, h: 40, prog: 1,
      parts: [{ v: 24, label: "24", col: "#388C46" }, { v: 24, label: "24", col: "#388C46" }] });
    D.txt(ctx, "twice as many \u2014 multiply after dividing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "two steps", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  }
};

const makeSteps510 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  const parts = [];
  for (let k = 0; k < 6; k++) parts.push({ v: 24, label: step >= 1 ? "24" : "?", col: "#2D70B3" });
  D.strip(ctx, { x: x, y: 62, w: w, h: 42, prog: 1, total: 144, parts: parts });
  if (step >= 1) D.txt(ctx, "step 1: 144 \u00f7 6 = 24 in each class", W / 2, 130,
    { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 166, w: w * 0.34, h: 40, prog: 1, total: 48,
      parts: [{ v: 24, label: "24", col: "#388C46" }, { v: 24, label: "24", col: "#388C46" }] });
    D.txt(ctx, "step 2: 2 classes need 24 \u00d7 2 = 48", W / 2, 236,
      { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "48 books for the two classes" : "one step will not answer it",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

const drawLibrary510 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "sharing the new books", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 24; c++) {
      const a = D.at(p2, (r * 24 + c) / 144, (r * 24 + c) / 144 + 0.2);
      if (a <= 0) continue;
      ctx.save();
      ctx.globalAlpha = a * 0.75;
      D.rr(ctx, 56 + c * ((W - 130) / 24), 50 + r * 19, (W - 150) / 24, 13, 2);
      ctx.fillStyle = "#2D70B3"; ctx.fill();
      ctx.restore();
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "144 books \u00b7 6 classes", W / 2, 182,
      { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "what could you ask?", W / 2, H - 16,
      { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard510 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Draw it, then write it" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 210, 380), p3 = D.at(f, 400, 570), p4 = D.at(f, 580, 740);
  const parts = [];
  for (let k = 0; k < 6; k++) parts.push({ v: 24, label: p2 > 0.5 ? "24" : "?", col: "#2D70B3" });
  D.strip(ctx, { x: 96, y: 116, w: W - 192, h: 46, prog: p1, total: 144, parts: parts });
  if (p2 > 0) D.txt(ctx, "144 \u00f7 6 = 24", W / 2, 206, { size: 20, col: "#34D399", font: "marker", alpha: p2 });
  if (p3 > 0) {
    D.strip(ctx, { x: 96, y: 244, w: (W - 192) * 0.34, h: 44, prog: p3, total: 48,
      parts: [{ v: 24, label: "24", col: "#388C46" }, { v: 24, label: "24", col: "#388C46" }] });
    D.txt(ctx, "24 \u00d7 2 = 48", W / 2, 326, { size: 20, col: "#34D399", font: "marker", alpha: D.at(f, 450, 540) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the bar shows the relationship \u2014 the equation writes it down",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 620, 720) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 660, 760), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport510 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.shareGroups(ctx, { total: 150, groups: 4, dealt: 150, x: 34, y: 14, w: W - 110, h: 56, s: 4.6 });
  D.txt(ctx, "37 in each box, 2 still loose", W / 2, H - 8,
    { size: 12, col: "#C9A227", font: "marker" });
};


/* critique: a competing district report with a missing middle step */
const makeClaim510 = (found, onFound) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onFound) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onFound(!found) });
  D.txt(ctx, "the rival district's impact report", W / 2, 26, { size: 13, col: "#2D70B3", font: "marker" });
  const lines = [
    { t: "144 books shared into 6 classes", ok: true },
    { t: "each class gets 144 ÷ 6 = 24", ok: true },
    { t: "so two classes get 144 ÷ 2 = 72", ok: false }
  ];
  let y = 60;
  lines.forEach((l) => {
    const flagged = found && !l.ok;
    ctx.save();
    D.rr(ctx, 30, y - 15, W - 60, 34, 7);
    ctx.fillStyle = flagged ? "rgba(199,68,64,.18)" : "rgba(234,244,242,.04)";
    ctx.fill();
    if (flagged) { ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    D.txt(ctx, l.t, W / 2, y + 2, { size: 13, col: flagged ? "#C74440" : "#EAF4F2", font: "marker" });
    y += 42;
  });
  D.txt(ctx, found ? "two classes get 24 each, twice — 48, not 72"
                   : "polished — but which line skips a step?",
    W / 2, H - 18, { size: 13, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

/* revision: choose the step that repairs the report */
const makeFix510 = (pick, onPick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onPick) D.tap(ctx, { x: 56, y: 40, w: W - 112, h: 110, value: 0, on: (v, tx) => {
    const opts = [W / 2 - 150, W / 2, W / 2 + 150];
    let best = 0, bd = Infinity;
    opts.forEach((x, i) => { const d = Math.abs(x - tx); if (d < bd) { bd = d; best = i; } });
    onPick(best);
  }});
  const opts = ["24 × 2", "144 ÷ 2", "144 − 24"];
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
  D.txt(ctx, "step 1 held: 144 ÷ 6 = 24 per class", W / 2, 108, { size: 13.5, col: "#34D399", font: "marker" });
  if (pick === 0) {
    D.txt(ctx, "step 2: 24 × 2 = 48 — the corrected report", W / 2, 146, { size: 15, col: "#34D399", font: "marker" });
    D.txt(ctx, "two classes get two shares, not half the whole", W / 2, H - 18,
      { size: 13, col: "#C9A227", font: "marker" });
  } else if (pick > 0) {
    D.txt(ctx, pick === 1 ? "that splits the whole in half — two classes are not half the city"
                          : "that subtracts one share from the whole — a different question",
      W / 2, 150, { size: 13.5, col: "#C74440", font: "marker" });
    D.txt(ctx, "which step takes two shares of 24?", W / 2, H - 18,
      { size: 13, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, "the second step is still missing — choose it", W / 2, 150,
      { size: 13.5, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

const LESSON = {
  code: "5-10",
  storageKey: "daf-g4-t5-l10",
  title: "Problem Solving: Model with Math",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-10 · MP.4",
  math: M,
  ixl: ["SLS"],

  metas: [
    { phase: "warmup", title: "The <em>dispatch board</em>",
      lead: "144 donated books, 6 classes. The board holds the whole allocation — and a question mark on one bar.",
      goal: "Notice the model: the unknown is the size of one group.",
      pull: "Numbers on their own do not tell you whether to divide or multiply.",
      rail: { launch: "Fictional frame. Look at the board — no working yet.",
        monitor: ["Reading the 144", "Counting the 6 classes", "Finding the question mark"],
        connect: "What does the question mark stand for?",
        misconception: "Starting with a number before the diagram." } },

    { phase: "launch", title: "Three diagrams — which <em>doesn't belong</em>?",
      lead: "Three bar diagrams and a bare pair of numbers. One of them is not a model at all.",
      goal: "Distinguish a model from a pair of numbers.",
      pull: "A model needs a shape the question can sit in.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reading the size-unknown bar", "Reading the two-step bar", "Flagging the bare numbers"],
        connect: "What does a model have that numbers alone do not?",
        misconception: "Treating any two numbers as a model." } },

    { phase: "monitor", title: "Zayd draws the <em>diagram that fits</em>",
      lead: "Size unknown? Number of groups unknown? Two steps? The bar takes the shape of the question.",
      goal: "Choose the diagram before choosing the operation.",
      pull: "Where the question mark sits tells you what to do.",
      rail: { launch: "Predict where the question mark will sit before you tap.",
        monitor: ["Placing the unknown", "Naming the shape", "Matching shape to operation"],
        connect: "Which shape does 144 books, 6 classes need?",
        misconception: "Drawing the bars before knowing what is unknown." } },

    { phase: "monitor", title: "The <em>two-step</em> allocation",
      lead: "How many books for two classes? Step 1: one class. Step 2: twice as many.",
      goal: "Model a two-step allocation with the middle answer shown.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: { launch: "What do you have to work out before you can answer?",
        monitor: ["Finding 144 ÷ 6 first", "Multiplying 24 × 2", "Naming the middle answer"],
        connect: "Why can the second step not come first?",
        misconception: "Dividing 144 by 2 — two classes are not half the city." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Four allocation questions. Each one needs one step — or two.",
      goal: "Recognise the hidden middle step before modelling.",
      pull: "Do I already know every number I need?",
      rail: { launch: "Say the middle answer before you place the question.",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Sultan <em>writes two</em>. Khalid writes <em>one</em>",
      lead: "Sultan: one step at a time, the middle answer shown. Khalid: one line with brackets. Both reach 48.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the two equations", "Reading the one-line chain", "Checking both show the middle answer"],
        connect: "Which form would the council sign faster, and why?",
        misconception: "Believing the shorter equation is always clearer." } },

    { phase: "monitor", title: "The rival district's <em>impact report</em>",
      lead: "The other district's report looks polished: 144 ÷ 6 = 24, so two classes get 144 ÷ 2 = 72. One line skips a step.",
      goal: "Critique a polished model: find the step that does not follow.",
      pull: "Two classes get two shares, not half the whole.",
      rail: { launch: "Each line must follow from the line before it.",
        monitor: ["Checking step 1", "Checking step 2", "Flagging the skipped share"],
        connect: "What number did the report pretend to have?",
        misconception: "Accepting the final line because the report is polished." } },

    { phase: "monitor", title: "Omar repairs the <em>report</em>",
      lead: "Step 1 held: 24 per class. Now choose the step that takes two shares.",
      goal: "Revise the model by supplying the correct step.",
      pull: "Two classes get 24 each, twice — 48, not 72.",
      rail: { launch: "What does each candidate step actually compute?",
        monitor: ["Reading 24 × 2", "Discarding 144 ÷ 2", "Discarding 144 − 24"],
        connect: "How do you know the repaired report now holds?",
        misconception: "Choosing the step that uses the biggest numbers." } },

    { phase: "synth", title: "On the <em>board</em>: the unknown goes where the question is",
      lead: "Draw the bar. Mark the unknown. Write the equation. Then decide about any remainder.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Placing the unknown", "Writing the equation", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Hunting for key words instead of drawing the model." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "The diagram is the argument: every number in it has a job.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming each bar's job", "Checking the middle answer", "Testing on a new allocation"],
        connect: "Which number in the model is the easiest to misplace?",
        misconception: "Answering the middle step as if it were the question." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "150 pens, boxes of 4. How many boxes so every pen is packed?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the bar, then decide about the remainder.",
        monitor: ["Dividing 150 by 4", "Naming the remainder", "Rounding up on purpose"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 37 — the two loose pens have no box." } },

    { phase: "monitor", title: "The board asks for <em>preparation</em>",
      lead: "Before the seal, the class says what the caravan taught it about planning ahead.",
      goal: "Close the quest on the standard, not the score.",
      pull: "A plan you can re-check is a plan people can trust.",
      rail: { launch: "Ask for the rule in students' own words before the seal.",
        monitor: ["Naming the middle step", "Naming the remainder decision", "Saying 'check' unprompted"],
        connect: "What would you refuse to sign, and why?",
        misconception: "Treating the seal as a reward for speed." } },

    { phase: "connect", title: "The dispatch board is <em>signed</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next door: two districts, two plans, and no single operation that tells the whole story.",
      rail: { launch: "Ask three students how they would repair a flawed report.",
        monitor: ["Able to explain the repair", "Still trusts polished reports", "Ready for multi-step problems"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("size");
    const [step, setStep] = useState(0);
    const [found, setFound] = useState(false);
    const [pick, setPick] = useState(-1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The dispatch board"
            text="144 donated books, 6 classes. The board holds the whole allocation — and a question mark on one bar."
            clue="The unknown is the size of one group.">
            <NoticeWonder draw={drawLibrary510} height={256} award={award}
              notices={["There are 144 books", "Six classes share them", "One bar has a question mark", "The remainder will need a decision"]}
              wonders={["How many per class?", "What does the question mark stand for?", "Where do the leftovers go?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Three diagrams — which doesn't belong?"
            text="Omar lays three bar diagrams and a bare pair of numbers before the board. One of them is not a model at all."
            clue="A model needs a shape the question can sit in.">
            <WODB award={award}
              prompt="Three bar diagrams and a pair of numbers. Which one doesn't belong?"
              cards={[
                { id: "a", draw: makeBar510("size"), h: 110, why: "The size of each group is missing — divide" },
                { id: "b", draw: makeBar510("count"), h: 110, why: "The number of groups is missing — also divide" },
                { id: "c", draw: makeBar510("two"), h: 110, why: "The only one with two bars — it needs a second step" },
                { id: "d", text: "144 and 6", why: "The only card with no diagram at all" }
              ]} />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd draws the diagram that fits"
            text="He can draw any of the three shapes — the class must name the relationship before the bars appear."
            clue="Where the question mark sits tells you what to do.">
            <ExploreChips draw={makeBar510(kind)} height={254}
              label="Choose the diagram that fits"
              value={kind}
              onPick={(v) => setKind(v)}
              chips={[{ v: "size", label: "size unknown" }, { v: "count", label: "number of groups unknown" }, { v: "two", label: "two steps" }]}
              caption={<MathEl omml={M.unknown} size="lg" display="block" />}
              footnote="Where the question mark sits tells you what to do." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The two-step allocation"
            text="How many books for two classes? Omar builds the answer one step at a time — the middle answer shown."
            clue="The answer to step 1 becomes a number you need in step 2.">
            <ExploreChips draw={makeSteps510(step)} height={266}
              label="How many for two classes?"
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
            text="Omar and Zayd lay four allocation questions on the board. Each one needs one step — or two."
            clue="Do I already know every number I need?">
            <CardSort award={award} columns={2}
              items={[
                { id: "q1", text: "How many books for each class?", target: "one" },
                { id: "q2", text: "How many books do two classes get?", target: "two" },
                { id: "q3", text: "How many classes get 24 books?", target: "one" },
                { id: "q4", text: "How many are left after 5 classes take theirs?", target: "two" }
              ]}
              targets={[
                { id: "one", label: "one step" },
                { id: "two", label: "two steps — something must be found first" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 48"
            text="Sultan writes one step at a time, the middle answer shown. Khalid writes one line with brackets. Both reach 48."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Sultan's way — one step at a time", omml: M.equal, h: 92,
                      quote: "First I find one class, then I write a second equation." }}
              right={{ name: "Khalid's way — one equation", omml: M.twoStep, h: 92,
                       quote: "I put the whole thing in one line with brackets." }}
              same={["Both reach 48", "Both divide then multiply", "Both use a letter for the unknown"]}
              diff={["Sultan writes two equations", "Khalid's is shorter but harder to read",
                     "Sultan's shows the middle answer"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build" support="rashed"
            title="The rival district's impact report"
            text="Rashed's report from the rival school arrives, polished: 144 ÷ 6 = 24, so two classes get 144 ÷ 2 = 72. Zayd reads it line by line — one line skips a step."
            clue="Two classes get two shares, not half the whole.">
            <ExploreChips draw={makeClaim510(found, setFound)} height={252}
              label="Does the polished report hold?"
              value={found ? 1 : 0}
              onPick={(v) => setFound(v === 1)}
              chips={[{ v: 0, label: "no gap — it is polished" }, { v: 1, label: "the gap is the skipped share" }]}
              caption={<MathEl omml={M.equal} size="lg" display="block" />}
              footnote="A polished report can still hide a faulty step." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar repairs the report"
            text="Step 1 held: 24 per class. Now choose the step that takes two shares — and the corrected report appears."
            clue="Two classes get 24 each, twice.">
            <ExploreChips draw={makeFix510(pick, setPick)} height={252}
              label="Choose the missing second step"
              value={pick}
              onPick={(v) => setPick(v)}
              chips={[{ v: 0, label: "24 × 2" }, { v: 1, label: "144 ÷ 2" }, { v: 2, label: "144 − 24" }]}
              caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
              footnote="The repaired report holds when every step follows from the one before." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The model is drawn, not declared"
            text="Zayd builds only what the class can justify: the bar, the unknown placed, the equation, the remainder decided."
            clue="The unknown goes where the question is.">
            <BoardScreen draw={drawBoard510} height={430}
              caption="The unknown goes where the question is." />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The diagram is the argument: every number in it has a job."
            clue="The middle answer is part of the argument.">
            <RuleScreen award={award}
              ommls={[{ omml: M.unknown, alt: "the unknown is the size of one group" }]}
              hand={"draw the bar · mark the unknown · write the equation · then decide about any remainder"}
              cards={[
                { title: "The division we did", omml: M.equal, note: "6 equal classes" },
                { title: "Tap for a remainder case", omml: M.twoStep, revealOmml: M.remainder, reveal: true,
                  note: "the story decides what to do with the 4" }
              ]} />
          </StoryShell>
        );

      case 10:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the dispatch board"
            text="150 pens, boxes of 4. Draw the model — then decide what the remainder is for."
            clue="The two loose pens still need a box.">
            <ShowWhatYouKnow award={award}
              prompt="150 pens are packed into boxes of 4. How many boxes are needed so every pen is packed?"
              omml={M.swykStep}
              options={[{ v: "a", text: "37" }, { v: "b", text: "38" }, { v: "c", text: "2" }, { v: "d", text: "37 r 2" }]}
              right="b"
              support={{
                yes: "Yes — 37 full boxes and 2 pens left, so a 38th box is needed.",
                notYet: "Not yet — where do the last two pens go?",
                draw: drawSupport510, h: 92,
                hint: "37 boxes hold 148 pens. Two pens are still loose."
              }} />
          </StoryShell>
        );

      case 11:
        return (
          <AmanahWindow window={STORY && STORY.amanahWindows && STORY.amanahWindows[0]}>
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#10242B", marginBottom: "14px" }}>Preparation</div>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#10242B", maxWidth: "520px", margin: "0 auto 10px" }}>
                The caravan taught the class that a plan is a promise: every number in it checked, every remainder named, every step shown. Preparation is how care is shown to people, long before the day itself.
              </p>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5B6B70", maxWidth: "520px", margin: "0 auto" }}>
                The dispatch board is signed when its plan survives a re-check — and when it can be handed to someone else who has not seen it before.
              </p>
            </div>
          </AmanahWindow>
        );

      case 12:
        return (
          <StoryHandoff support="zafir"
            title="The dispatch board is signed"
            text="Omar signs the dispatch board: the allocation, the middle answers, the remainders decided. Two districts now bring two plans to the council — and no single operation tells the whole story."
            artifact="Dispatch board · signed allocation"
            next="Two districts, two plans — which plan best serves the city when no single operation tells the whole story?">
            <Closing game={game} omml={M.unknown}
              action="Find a real sharing problem at home tonight and draw its bar before you solve it." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
