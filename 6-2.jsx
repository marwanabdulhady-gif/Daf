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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two bars, one longer than the other. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "The shorter bar fits into the longer one a whole number of times.",
      rail: { launch: "I am not asking for an answer yet. Just look at the two bars.",
        monitor: ["Comparing the lengths", "Counting the equal parts", "Reading the labels"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the longer bar as an amount rather than a comparison." } },

    { phase: "launch", title: "Ninety bottles, <em>six equal crates</em>",
      lead: "The total is known this time, not the small bar. Estimate first.",
      goal: "Create the need — the words decide the operation.",
      pull: "Estimate first, then we will draw it.",
      rail: { launch: "Read the sentence twice. Does it say MORE, or TIMES AS MANY?",
        monitor: ["Adding when it says times", "Multiplying correctly", "Asking what the words mean"],
        connect: "Which two words changed everything?",
        misconception: "Multiplying 90 by 6 because the words say times as many." } },

    { phase: "monitor", title: "Two kinds of <em>comparison</em>",
      lead: "Same crates. Change what is missing and the operation flips.",
      goal: "Additive and multiplicative comparison look different on a bar.",
      pull: "Some problems need a second step.",
      rail: { launch: "Predict how long the second bar will be before you tap.",
        monitor: ["Drawing equal parts for times", "Drawing an extra piece for more", "Mixing the two up"],
        connect: "How can you tell the two bars apart at a glance?",
        misconception: "Drawing the same bar for both kinds of comparison." } },

    { phase: "monitor", title: "A problem in <em>two steps</em>",
      lead: "How many bottles in two crates? Find one crate first.",
      goal: "Multi-step problems chain two diagrams together.",
      pull: "Sort some questions by how many steps they need.",
      rail: { launch: "What must you work out before you can answer?",
        monitor: ["Finding the middle number first", "Trying one step", "Working backwards"],
        connect: "Why can the second step not come first?",
        misconception: "Dividing 90 by 2 to find two crates." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Sort each question. No grading until the class commits.",
      goal: "Recognise a hidden middle step.",
      pull: "Two students wrote different equations for the same problem.",
      rail: { launch: "Ask: do I already know every number I need?",
        monitor: ["Counting the unknowns", "Checking what is given", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers rather than the unknowns." } },

    { phase: "connect", title: "Two <em>ways</em> to write it",
      lead: "Reem divided 90 by 6. Ziad kept adding 15 until he reached 90. Both found 15.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Writing one equation", "Writing two", "Using a letter for the unknown"],
        connect: "What is the letter standing for in each one?",
        misconception: "Using the same letter for two different unknowns." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Draw the whole. Split it into six equal bars. One bar is the answer.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next bar", "Naming the unknown", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Hunting for key words instead of drawing the relationship." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the comparison type", "Testing on a new problem", "Checking the answer against the question"],
        connect: "What if you knew one crate and the total, but not how many crates?",
        misconception: "Treating the bar as decoration rather than a decision tool." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the bar before you calculate.",
        monitor: ["Drawing first", "Finding the middle step", "Answering the actual question"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Multiplying 84 by 7." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: drawing problems that need more than one bar.",
      rail: { launch: "Ask three students how they decide which operation to use.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready for the next step"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("times");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeCompareBar62("times")} height={256} award={award}
          notices={["One bar is longer", "The short bar repeats", "They start in the same place", "The long one has equal parts"]}
          wonders={["How many times longer?", "What is the total?", "Do I add or multiply?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory62} height={256} award={award}
          label="How many bottles in one crate?" min={5} max={40} start={15} unit="bottles"
          after="Locked. Now let us draw what the words actually say."
          note="When the total is the known number, division is coming." />;

      case 2:
        return <ExploreChips draw={makeCompareBar62(kind)} height={256}
          label="Which comparison is it?"
          value={kind}
          onPick={(v) => setKind(v)}
          chips={[{ v: "times", label: "6 times as many" }, { v: "more", label: "15 more" }]}
          caption={<MathEl omml={kind === "times" ? M.compare : M.addCompare} size="xl" display="block" />}
          footnote="Times as many repeats the bar. More adds a piece to it." />;

      case 3:
        return <ExploreChips draw={makeSteps62(step)} height={266}
          label="How many bottles in two crates?"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
          caption={<MathEl omml={M.answer} size="lg" display="block" />}
          footnote="The answer to step 1 becomes a number you need in step 2." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "r1", text: "How many in one crate?", target: "one" }, { id: "r2", text: "How many in two crates?", target: "two" }, { id: "r3", text: "How many more in 4 crates than 1?", target: "two" }, { id: "r4", text: "90 shared into 6 equal crates", target: "one" }]}
          targets={[
            { id: "one", label: "one step" },
            { id: "two", label: "two steps — something must be found first" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Reem's way — divide", omml: M.step1, h: 92, quote: "Ninety shared into six equal parts." }}
          right={{ name: "Ziad's way — build up", omml: M.answer, h: 92, quote: "I added 15 six times to check it reached 90." }}
          same={["Both find 15", "Both use six equal parts", "Both can check the other"]}
          diff={["Reem divides, Ziad multiplies up", "Ziad needed a good first guess", "Reem's works straight away"]} />;

      case 6:
        return <BoardScreen draw={drawBoard62} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "if the whole is known, divide · if a part is known, multiply" }]}
          hand={"whole known → divide · one part known → multiply · draw it first either way"}
          cards={[
            { title: "The comparison we solved", omml: M.compare, note: "90 split into 6 equal bars" },
            { title: "Tap to see the other kind", omml: M.addCompare, revealOmml: M.answer, reveal: true,
              note: "a different unknown, a different operation" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A shop has 84 pens in 7 equal boxes. How many pens are in one box?"
          omml={M.swyk}
          options={[{ v: "a", text: "77" }, { v: "b", text: "12" }, { v: "c", text: "588" }, { v: "d", text: "91" }]}
          right="b"
          support={{
            yes: "Yes — 84 shared into 7 equal boxes is 12 each.",
            notYet: "Not yet — draw the bars and look at what is missing.",
            draw: drawSupport62, h: 82,
            hint: "The total is known and the boxes are equal, so divide."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a total at home that splits into equal groups and work out one group." />;

      default: return null;
    }
  }
};
