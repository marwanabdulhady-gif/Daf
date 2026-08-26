/* ===========================================================================
   Grade 4 · Topic 6 · LESSON 6-1 · Solve Comparison Problems
   Standard 4.OA.A.2   I can ... tell the difference between how many more and
   how many times as many, and solve both.
   =========================================================================== */

const M = {
  compare: om(mt("4×12=48")),
  addCompare: om(mt("12+12=24")),
  answer: om(mt("4×12=48")),
  step1: om(mt("4×12=48")),
  step2: om(mt("48-12=36")),
  unknown: om(mnor("times as many means multiply")),
  rule: om(mnor("times as many multiplies · how many more adds")),
  swyk: om(mt("7×9")),
  swykAnswer: om(mt("7×9=63"))
};

/* the two comparison shapes, side by side */
const makeCompareBar61 = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  if (kind === "times") {
    D.strip(ctx, { x: x, y: 60, w: w * 0.25, h: 40, prog: 1,
      parts: [{ v: 12, label: "12", col: "#FA7E19", sub: "Layla" }] });
    const parts = [];
    for (let k = 0; k < 4; k++) parts.push({ v: 12, label: "12", col: "#2D70B3" });
    D.strip(ctx, { x: x, y: 128, w: w, h: 40, prog: 1, total: "?", parts: parts });
    D.txt(ctx, "4 times as many \u2014 multiply", W / 2, H - 34,
      { size: 14.5, col: "#C9A227", font: "marker" });
    D.txt(ctx, "4×12=48", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.strip(ctx, { x: x, y: 60, w: w * 0.25, h: 40, prog: 1,
      parts: [{ v: 12, label: "12", col: "#FA7E19", sub: "Layla" }] });
    D.strip(ctx, { x: x, y: 128, w: w * 0.25 + 90, h: 40, prog: 1,
      parts: [{ v: 12, label: "12", col: "#2D70B3" }, { v: 12, label: "+12", col: "#388C46" }] });
    D.txt(ctx, "12 more \u2014 add", W / 2, H - 34, { size: 14.5, col: "#C9A227", font: "marker" });
    D.txt(ctx, "12+12=24", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  }
};

/* two-step problem building up */
const makeSteps61 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  D.strip(ctx, { x: x, y: 62, w: w * 1, h: 42, prog: step >= 1 ? 1 : 0.001,
    total: step >= 1 ? 48 : null, parts: [{ v: 12, label: "12", col: "#2D70B3" }, { v: 12, label: "12", col: "#2D70B3" }, { v: 12, label: "12", col: "#2D70B3" }, { v: 12, label: "12", col: "#2D70B3" }] });
  if (step >= 1) D.txt(ctx, "step 1: 4×12=48", W / 2, 130, { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 168, w: w, h: 42, prog: 1, total: 48, parts: [{ v: 12, label: "12", col: "#FA7E19" }, { v: 36, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "step 2: 48-12=36", W / 2, 240, { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "Omar read 36 more books than Layla" : "one step will not answer it",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

const drawStory61 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the reading challenge", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const x = 62, w = W - 124;
  D.strip(ctx, { x: x, y: 56, w: w * 0.25, h: 38, prog: p2,
    parts: [{ v: 12, label: "12", col: "#FA7E19", sub: "Layla" }] });
  const parts = [];
  for (let k = 0; k < 4; k++) parts.push({ v: 12, label: "?", col: "#2D70B3" });
  D.strip(ctx, { x: x, y: 122, w: w, h: 38, prog: p2, parts: parts });
  if (p3 > 0) {
    D.txt(ctx, "Layla read 12 books · Omar read 4 times as many", W / 2, 186, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many did Omar read?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard61 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "More, or times as many?" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 610), p4 = D.at(f, 610, 760);
  const x = 96, w = W - 192;
  D.strip(ctx, { x: x, y: 112, w: w * 0.25, h: 44, prog: p1,
    parts: [{ v: 12, label: "12", col: "#FA7E19", sub: "Layla" }] });
  if (p2 > 0) {
    const parts = [];
    for (let k = 0; k < 4; k++) parts.push({ v: 12, label: "12", col: "#2D70B3" });
    D.strip(ctx, { x: x, y: 196, w: w, h: 44, prog: p2, total: 48, parts: parts });
  }
  if (p3 > 0) D.txt(ctx, "4×12=48", W / 2, 292, { size: 20, col: "#34D399", font: "marker", alpha: p3 });
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "four equal bars, not one bar with something added", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 650, 750) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 690, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport61 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 26, w: W - 48, h: 38, prog: 1, total: 63, parts: [{ v: 9, label: "9", col: "#FA7E19" }, { v: 54, label: "?", col: "#2D70B3" }] });
};

const LESSON = {
  code: "6-1",
  storageKey: "daf-g4-t6-l1",
  title: "Solve Comparison Problems",
  unit: "GRADE 4 · TOPIC 6 · LESSON 6-1 · 4.OA.A.2",
  math: M,
  ixl: ["GGE", "YCW"],

  metas: [
    { phase: "warmup", title: "Two districts, <em>two claims</em>",
      lead: "District A serves 12 families. District B claims to serve four times as many. One bar is longer, and the short bar repeats.",
      goal: "Notice a comparison bar: the unknown can be a multiple, or a difference.",
      pull: "Do I add or multiply?",
      rail: { launch: "Fictional frame. Look at the bars — no working yet.",
        monitor: ["Counting the repeated short bar", "Noticing the long bar's length", "Wonding what the claim means"],
        connect: "What does 'four times as many' actually show on the bar?",
        misconception: "Reading 'times as many' as 'more than'." } },

    { phase: "launch", title: "How many books did <em>Omar read</em>?",
      lead: "Layla read 12 books. Omar read four times as many. Lock the answer before the bar is drawn.",
      goal: "Create the need — four times as many is not four more.",
      pull: "Four times as many is not the same as four more.",
      rail: { launch: "Give the answer and say which operation the words invited.",
        monitor: ["Multiplying 4 × 12", "Adding 12 + 4", "Reading the claim carefully"],
        connect: "Why do the words point to multiplication?",
        misconception: "Answering 16 — 'four' was read as 'four more'." } },

    { phase: "monitor", title: "Zayd draws <em>which comparison it is</em>",
      lead: "Four times as many repeats the bar. Twelve more adds a piece to it. The bar shows the difference.",
      goal: "Represent comparison problems precisely: copy the bar, or add a piece.",
      pull: "Times as many repeats the bar. More adds a piece to it.",
      rail: { launch: "Before you tap: which comparison are the words making?",
        monitor: ["Copying the bar four times", "Adding one piece of 12", "Comparing the two bars"],
        connect: "How are the two bars different, and by how much?",
        misconception: "Drawing one bar for both comparisons." } },

    { phase: "monitor", title: "The <em>two-step</em> comparison",
      lead: "How many more books did Omar read than Layla? Step 1: Omar's total. Step 2: the difference.",
      goal: "Model a two-step comparison with the middle answer shown.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: { launch: "What do you have to work out before you can find the difference?",
        monitor: ["Finding 4 × 12 first", "Subtracting 12", "Naming the middle answer"],
        connect: "Why can't the difference come first?",
        misconception: "Subtracting before the multiple exists." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Four questions from the two districts. Each one needs one step — or two.",
      goal: "Recognise the hidden middle step in a comparison.",
      pull: "Do I already know every number I need?",
      rail: { launch: "Say the middle answer before you place the question.",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Hana <em>writes one equation</em>. Faisal <em>draws four bars</em>",
      lead: "Hana: 4 × 12, straight down. Faisal: four bars of 12, added. Both get 48.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the equation", "Counting the bars", "Checking both reach 48"],
        connect: "Which form would survive a bigger multiplier?",
        misconception: "Believing drawing is only for small numbers." } },

    { phase: "synth", title: "On the <em>board</em>: times as many multiplies, how many more adds",
      lead: "Copy the bar for 'times as many'. Add a piece for 'more'. The board shows which the words mean.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Reading the words", "Choosing the bar move", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Swapping the operations without re-reading the words." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "The bar is the translation: words become a picture, the picture becomes an equation.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Translating the words", "Choosing the operation", "Testing on a new comparison"],
        connect: "Which phrase is the trap, and what does it mean?",
        misconception: "Answering the total when the question asks the difference." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "Sara has 9 stickers. Noura has 7 times as many. How many does Noura have?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say what the words mean before the arithmetic.",
        monitor: ["Reading 'times as many'", "Multiplying 7 × 9", "Not adding 7"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 16 — the multiplier was added." } },

    { phase: "connect", title: "The claims are <em>drawn</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the claim changes direction — the unknown moves to a new place on the bar.",
      rail: { launch: "Ask three students to translate a comparison in their own words.",
        monitor: ["Able to explain the bar move", "Still reads 'times' as 'more'", "Ready for a moved unknown"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("times");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern" support="salma"
            title="Two districts, two claims"
            text="District A serves 12 families. District B claims four times as many. One bar is longer, and the short bar repeats inside it. Salma, the council scribe, keeps the decision board open."
            clue="Times as many repeats the bar — more adds a piece.">
            <NoticeWonder draw={makeCompareBar61("times")} height={256} award={award}
              notices={["One bar is longer", "The short bar repeats", "They start in the same place", "The long one has equal parts"]}
              wonders={["How many times longer?", "What is the total?", "Do I add or multiply?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The claim, before the bar"
            text="Omar sets the council's first rule: draw what the words say before any arithmetic. Layla read 12 — Omar read four times as many."
            clue="Four times as many is not the same as four more.">
            <LaunchEstimate draw={drawStory61} height={256} award={award}
              label="How many books did Omar read?" min={12} max={80} start={48} unit="books"
              after="Locked. Now let us draw what the words actually say."
              note="The reading counts are simulated — the comparison works on any two amounts." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd draws which comparison it is"
            text="He can draw either comparison — the class must say which one the words are making."
            clue="Times as many repeats the bar. More adds a piece to it.">
            <ExploreChips draw={makeCompareBar61(kind)} height={256}
              label="Which comparison is it?"
              value={kind}
              onPick={(v) => setKind(v)}
              chips={[{ v: "times", label: "4 times as many" }, { v: "more", label: "12 more" }]}
              caption={<MathEl omml={kind === "times" ? M.compare : M.addCompare} size="xl" display="block" />}
              footnote="Times as many repeats the bar. More adds a piece to it." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The two-step comparison"
            text="How many more books did Omar read? Omar builds the answer one step at a time — the middle answer shown."
            clue="The answer to step 1 becomes a number you need in step 2.">
            <ExploreChips draw={makeSteps61(step)} height={266}
              label="How many more did Omar read?"
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
            text="Omar and Zayd lay four district questions on the table. Each one needs one step — or two."
            clue="Do I already know every number I need?">
            <CardSort award={award} columns={2}
              items={[{ id: "q1", text: "How many did Omar read?", target: "one" }, { id: "q2", text: "How many more than Layla?", target: "two" }, { id: "q3", text: "How many did they read altogether?", target: "two" }, { id: "q4", text: "How many books is 4 times 12?", target: "one" }]}
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
            text="Hana writes one equation. Faisal draws four bars. Both reach 48."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Hana's way — one equation", omml: M.step1, h: 92, quote: "Four times twelve. I wrote it straight down." }}
              right={{ name: "Faisal's way — draw and count", omml: M.answer, h: 92, quote: "I drew four bars of 12 and added them." }}
              same={["Both get 48", "Both use the number 4", "Both treat 12 as one unit"]}
              diff={["Hana multiplies, Faisal adds", "Faisal's takes longer", "Hana's works for bigger numbers"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The comparison is drawn, not declared"
            text="Zayd builds only what the class can justify: the words translated, the bar moved, the equation written."
            clue="Times as many multiplies · how many more adds.">
            <BoardScreen draw={drawBoard61} height={430}
              caption="Times as many multiplies · how many more adds." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The bar is the translation: words become a picture, the picture becomes an equation."
            clue="The picture decides the operation.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "times as many multiplies · how many more adds" }]}
              hand={"times as many → copy the bar · how many more → add a piece to the bar"}
              cards={[
                { title: "The comparison we drew", omml: M.compare, note: "four copies of Layla's 12" },
                { title: "Tap to see the other kind", omml: M.addCompare, revealOmml: M.answer, reveal: true,
                  note: "how many more is a different question" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the drawn claim"
            text="Sara has 9 stickers. Noura has 7 times as many. Say what the words mean — then the answer."
            clue="7 copies of 9, not 7 more.">
            <ShowWhatYouKnow award={award}
              prompt="Sara has 9 stickers. Noura has 7 times as many. How many does Noura have?"
              omml={M.swyk}
              options={[{ v: "a", text: "16" }, { v: "b", text: "63" }, { v: "c", text: "54" }, { v: "d", text: "72" }]}
              right="b"
              support={{
                yes: "Yes — 7 copies of 9 is 63.",
                notYet: "Not yet — draw the bars and look at what is missing.",
                draw: drawSupport61, h: 82,
                hint: "Times as many means copy the bar, not add to it."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff support="salma"
            title="The claims are drawn"
            text="Omar signs the drawn claim. But the second district's report turns the bar around: now the whole is known, and one part is the question."
            artifact="Council board · comparison claims drawn"
            next="The claim changes direction — the unknown moves to a new place on the bar.">
            <Closing game={game} omml={M.rule}
              action="Find two amounts at home and say one as times as many of the other." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
