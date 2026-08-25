/* ===========================================================================
   Grade 4 · Topic 6 · LESSON 6-2 · Continue to Solve Comparison Problems
   Standard 4.OA.A.2   I can ... find the unknown in a comparison, even when it
   is the small bar or the number of times.
   =========================================================================== */

const M = {
  compare: om(mt("90÷6=15")),
  addCompare: om(mt("90-15=75")),
  answer: om(mt("90÷6=15")),
  step1: om(mt("90÷6=15")),
  step2: om(mt("15×2=30")),
  unknown: om(mnor("the unknown can be any part of the comparison")),
  rule: om(mnor("if the whole is known, divide · if a part is known, multiply")),
  swyk: om(mt("84÷7")),
  swykAnswer: om(mt("84÷7=12"))
};

/* the two comparison shapes, side by side */
const makeCompareBar62 = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  if (kind === "times") {
    D.strip(ctx, { x: x, y: 60, w: w * 0.16666666666666666, h: 40, prog: 1,
      parts: [{ v: 15, label: "15", col: "#FA7E19", sub: "one crate" }] });
    const parts = [];
    for (let k = 0; k < 6; k++) parts.push({ v: 15, label: "15", col: "#2D70B3" });
    D.strip(ctx, { x: x, y: 128, w: w, h: 40, prog: 1, total: "?", parts: parts });
    D.txt(ctx, "6 times as many \u2014 multiply", W / 2, H - 34,
      { size: 14.5, col: "#C9A227", font: "marker" });
    D.txt(ctx, "90÷6=15", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.strip(ctx, { x: x, y: 60, w: w * 0.16666666666666666, h: 40, prog: 1,
      parts: [{ v: 15, label: "15", col: "#FA7E19", sub: "one crate" }] });
    D.strip(ctx, { x: x, y: 128, w: w * 0.16666666666666666 + 90, h: 40, prog: 1,
      parts: [{ v: 15, label: "15", col: "#2D70B3" }, { v: 15, label: "+15", col: "#388C46" }] });
    D.txt(ctx, "15 more \u2014 add", W / 2, H - 34, { size: 14.5, col: "#C9A227", font: "marker" });
    D.txt(ctx, "90-15=75", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  }
};

/* two-step problem building up */
const makeSteps62 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  D.strip(ctx, { x: x, y: 62, w: w * 1, h: 42, prog: step >= 1 ? 1 : 0.001,
    total: step >= 1 ? 90 : null, parts: [{ v: 15, label: "15", col: "#2D70B3" }, { v: 15, label: "15", col: "#2D70B3" }, { v: 15, label: "15", col: "#2D70B3" }, { v: 15, label: "15", col: "#2D70B3" }, { v: 15, label: "15", col: "#2D70B3" }, { v: 15, label: "15", col: "#2D70B3" }] });
  if (step >= 1) D.txt(ctx, "step 1: 90÷6=15", W / 2, 130, { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 168, w: w, h: 42, prog: 1, total: 30, parts: [{ v: 15, label: "15", col: "#388C46" }, { v: 15, label: "15", col: "#388C46" }] });
    D.txt(ctx, "step 2: 15×2=30", W / 2, 240, { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "two crates hold 30 bottles" : "one step will not answer it",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

const drawStory62 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "crates in the store room", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const x = 62, w = W - 124;
  D.strip(ctx, { x: x, y: 56, w: w * 0.16666666666666666, h: 38, prog: p2,
    parts: [{ v: 15, label: "15", col: "#FA7E19", sub: "one crate" }] });
  const parts = [];
  for (let k = 0; k < 6; k++) parts.push({ v: 15, label: "?", col: "#2D70B3" });
  D.strip(ctx, { x: x, y: 122, w: w, h: 38, prog: p2, parts: parts });
  if (p3 > 0) {
    D.txt(ctx, "6 equal crates · 90 bottles in total", W / 2, 186, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many in one crate?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard62 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Which part is missing?" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 610), p4 = D.at(f, 610, 760);
  const x = 96, w = W - 192;
  D.strip(ctx, { x: x, y: 112, w: w * 0.16666666666666666, h: 44, prog: p1,
    parts: [{ v: 15, label: "15", col: "#FA7E19", sub: "one crate" }] });
  if (p2 > 0) {
    const parts = [];
    for (let k = 0; k < 6; k++) parts.push({ v: 15, label: "15", col: "#2D70B3" });
    D.strip(ctx, { x: x, y: 196, w: w, h: 44, prog: p2, total: 90, parts: parts });
  }
  if (p3 > 0) D.txt(ctx, "90÷6=15", W / 2, 292, { size: 20, col: "#34D399", font: "marker", alpha: p3 });
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the whole known means divide — a part known means multiply", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 650, 750) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 690, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport62 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 26, w: W - 48, h: 38, prog: 1, total: 84, parts: [{ v: 12, label: "12", col: "#FA7E19" }, { v: 72, label: "?", col: "#2D70B3" }] });
};

const LESSON = {
  code: "6-2",
  storageKey: "daf-g4-t6-l2",
  title: "Continue to Solve Comparison Problems",
  unit: "GRADE 4 · TOPIC 6 · LESSON 6-2 · 4.OA.A.2",
  math: M,
  ixl: ["AH8", "9GX"],

  metas: [
    { phase: "warmup", title: "The claim <em>changes direction</em>",
      lead: "90 bottles in 6 equal crates. This time the whole is known — and one crate is the question.",
      goal: "Notice the unknown has moved: the whole is given, one part is missing.",
      pull: "When the total is the known number, division is coming.",
      rail: { launch: "Fictional frame. Look at the bar — no working yet.",
        monitor: ["Seeing the known whole", "Counting the equal parts", "Finding the question mark"],
        connect: "Where is the unknown this time?",
        misconception: "Multiplying 90 × 6 — the operation followed the numbers, not the question." } },

    { phase: "launch", title: "How many bottles in <em>one crate</em>?",
      lead: "90 bottles, 6 equal crates. Lock the per-crate number before the bar is drawn.",
      goal: "Create the need — a known whole and equal parts ask for division.",
      pull: "The crate count is simulated — the comparison works on any fair share.",
      rail: { launch: "Give a per-crate number and say why the operation is division.",
        monitor: ["Dividing 90 by 6", "Estimating first", "Checking by multiplying back"],
        connect: "Why does a known whole point to division?",
        misconception: "Answering 540 — the whole was multiplied by the parts." } },

    { phase: "monitor", title: "Zayd draws <em>which comparison it is</em>",
      lead: "Six times as many repeats the bar. Fifteen more adds a piece. The drawing decides the operation.",
      goal: "Represent the comparison precisely, with the unknown where the question puts it.",
      pull: "Times as many repeats the bar. More adds a piece to it.",
      rail: { launch: "Before you tap: which comparison are the words making?",
        monitor: ["Copying the bar six times", "Placing the unknown part", "Comparing the two bars"],
        connect: "How do the two comparisons differ, on the same bar?",
        misconception: "Drawing the bar the same way for both comparisons." } },

    { phase: "monitor", title: "The <em>two-step</em> crate question",
      lead: "How many bottles in two crates? Step 1: one crate. Step 2: twice as many.",
      goal: "Model a two-step comparison from a known whole.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: { launch: "What do you have to work out before you can answer?",
        monitor: ["Finding 90 ÷ 6 first", "Multiplying 15 × 2", "Naming the middle answer"],
        connect: "Why can't the two-crate total come first?",
        misconception: "Dividing 90 by 2 — two crates are not half the city." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Four crate questions from the warehouse. Each one needs one step — or two.",
      goal: "Recognise the hidden middle step in a moved unknown.",
      pull: "Do I already know every number I need?",
      rail: { launch: "Say the middle answer before you place the question.",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Reem <em>divides</em>. Ziad <em>builds up</em>",
      lead: "Reem: 90 shared into 6. Ziad: adds 15 six times until it reaches 90. Both find 15.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the division", "Counting Ziad's builds", "Checking both reach 15"],
        connect: "Which direction checks the other?",
        misconception: "Believing building up is guessing, not checking." } },

    { phase: "synth", title: "On the <em>board</em>: the unknown goes where the question is",
      lead: "Whole known, parts equal — divide. One part known, multiplier given — multiply. The bar shows which.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Placing the unknown", "Choosing the operation", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Picking the operation from the biggest number in the sentence." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "84 pens, 7 equal boxes. How many in one box?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say where the unknown sits before dividing.",
        monitor: ["Placing the unknown part", "Dividing 84 by 7", "Checking by multiplying back"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 588 — the whole was multiplied by the boxes." } },

    { phase: "connect", title: "The direction is <em>drawn</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: a plan with three steps — costs, capacity and remaining resources in one scenario.",
      rail: { launch: "Ask three students to say where the unknown sits.",
        monitor: ["Able to explain the placement", "Still follows the biggest number", "Ready for multi-step plans"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("times");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The claim changes direction"
            text="90 bottles in 6 equal crates. This time the whole is known — and one crate is the question. The unknown has moved."
            clue="When the total is the known number, division is coming.">
            <NoticeWonder draw={makeCompareBar62("times")} height={256} award={award}
              notices={["One bar is longer", "The short bar repeats", "They start in the same place", "The long one has equal parts"]}
              wonders={["How many times longer?", "What is the total?", "Do I add or multiply?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The crate, before the bar"
            text="Omar sets the warehouse's question: 90 bottles, 6 equal crates — about how many per crate, and why is the operation division?"
            clue="A known whole and equal parts ask for division.">
            <LaunchEstimate draw={drawStory62} height={256} award={award}
              label="How many bottles in one crate?" min={5} max={40} start={15} unit="bottles"
              after="Locked. Now let us draw what the words actually say."
              note="The crate count is simulated — the comparison works on any fair share." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd draws the moved unknown"
            text="He can draw either comparison — the class must place the unknown where the question puts it."
            clue="The unknown goes where the question is.">
            <ExploreChips draw={makeCompareBar62(kind)} height={256}
              label="Which comparison is it?"
              value={kind}
              onPick={(v) => setKind(v)}
              chips={[{ v: "times", label: "6 times as many" }, { v: "more", label: "15 more" }]}
              caption={<MathEl omml={kind === "times" ? M.compare : M.addCompare} size="xl" display="block" />}
              footnote="Times as many repeats the bar. More adds a piece to it." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The two-step crate question"
            text="How many bottles in two crates? Omar builds the answer one step at a time — the middle answer shown."
            clue="One crate first — then twice as many.">
            <ExploreChips draw={makeSteps62(step)} height={266}
              label="How many bottles in two crates?"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
              caption={<MathEl omml={M.answer} size="lg" display="block" />}
              footnote="The answer to step 1 becomes a number you need in step 2." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="One step or two?"
            text="Omar and Zayd lay four warehouse questions on the board. Each one needs one step — or two."
            clue="Do I already know every number I need?">
            <CardSort award={award} columns={2}
              items={[{ id: "r1", text: "How many in one crate?", target: "one" }, { id: "r2", text: "How many in two crates?", target: "two" }, { id: "r3", text: "How many more in 4 crates than 1?", target: "two" }, { id: "r4", text: "90 shared into 6 equal crates", target: "one" }]}
              targets={[
                { id: "one", label: "one step" },
                { id: "two", label: "two steps — something must be found first" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 15"
            text="Reem divides the whole. Ziad builds 15 up six times until it reaches 90. Both find the crate."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Reem's way — divide", omml: M.step1, h: 92, quote: "Ninety shared into six equal parts." }}
              right={{ name: "Ziad's way — build up", omml: M.answer, h: 92, quote: "I added 15 six times to check it reached 90." }}
              same={["Both find 15", "Both use six equal parts", "Both can check the other"]}
              diff={["Reem divides, Ziad multiplies up", "Ziad needed a good first guess", "Reem's works straight away"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The direction is drawn, not declared"
            text="Zayd builds only what the class can justify: the whole known, the parts equal, the unknown placed."
            clue="If the whole is known, divide · if a part is known, multiply.">
            <BoardScreen draw={drawBoard62} height={430}
              caption="If the whole is known, divide · if a part is known, multiply." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the crate report"
            text="84 pens, 7 equal boxes. Say where the unknown sits — then divide."
            clue="7 × 12 = 84 checks the answer.">
            <ShowWhatYouKnow award={award}
              prompt="A shop has 84 pens in 7 equal boxes. How many pens are in one box?"
              omml={M.swyk}
              options={[{ v: "a", text: "77" }, { v: "b", text: "12" }, { v: "c", text: "588" }, { v: "d", text: "91" }]}
              right="b"
              support={{
                yes: "Yes — 84 shared into 7 equal boxes is 12 each.",
                notYet: "Not yet — draw the bars and look at what is missing.",
                draw: drawSupport62, h: 82,
                hint: "The total is known and the boxes are equal, so divide."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The direction is drawn"
            text="Omar signs the crate report: the unknown placed, the operation chosen, the check shown. The next scenario is bigger: three steps in one plan — costs, capacity, and what is left."
            artifact="Council board · moved unknowns drawn"
            next="A plan with three steps — costs, capacity and remaining resources in one scenario.">
            <Closing game={game} omml={M.rule}
              action="Find a total at home that splits into equal groups and work out one group." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
