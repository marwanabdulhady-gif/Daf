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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two bars, one longer than the other. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "The shorter bar fits into the longer one a whole number of times.",
      rail: { launch: "I am not asking for an answer yet. Just look at the two bars.",
        monitor: ["Comparing the lengths", "Counting the equal parts", "Reading the labels"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the longer bar as an amount rather than a comparison." } },

    { phase: "launch", title: "Four <em>times as many</em>",
      lead: "Layla read 12 books. Omar read 4 times as many. Estimate first.",
      goal: "Create the need — the words decide the operation.",
      pull: "Estimate first, then we will draw it.",
      rail: { launch: "Read the sentence twice. Does it say MORE, or TIMES AS MANY?",
        monitor: ["Adding when it says times", "Multiplying correctly", "Asking what the words mean"],
        connect: "Which two words changed everything?",
        misconception: "Reading 4 times as many as 4 more." } },

    { phase: "monitor", title: "Two kinds of <em>comparison</em>",
      lead: "Same two people. Change two words and the bar changes shape.",
      goal: "Additive and multiplicative comparison look different on a bar.",
      pull: "Some problems need a second step.",
      rail: { launch: "Predict how long the second bar will be before you tap.",
        monitor: ["Drawing equal parts for times", "Drawing an extra piece for more", "Mixing the two up"],
        connect: "How can you tell the two bars apart at a glance?",
        misconception: "Drawing the same bar for both kinds of comparison." } },

    { phase: "monitor", title: "A problem in <em>two steps</em>",
      lead: "How many MORE did Omar read? Find his total first.",
      goal: "Multi-step problems chain two diagrams together.",
      pull: "Sort some questions by how many steps they need.",
      rail: { launch: "What must you work out before you can answer?",
        monitor: ["Finding the middle number first", "Trying one step", "Working backwards"],
        connect: "Why can the second step not come first?",
        misconception: "Subtracting 4 from 12." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Sort each question. No grading until the class commits.",
      goal: "Recognise a hidden middle step.",
      pull: "Two students wrote different equations for the same problem.",
      rail: { launch: "Ask: do I already know every number I need?",
        monitor: ["Counting the unknowns", "Checking what is given", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers rather than the unknowns." } },

    { phase: "connect", title: "Two <em>ways</em> to write it",
      lead: "Hana wrote 4 × 12 = b. Faisal drew four bars and counted. Both got 48.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Writing one equation", "Writing two", "Using a letter for the unknown"],
        connect: "What is the letter standing for in each one?",
        misconception: "Using the same letter for two different unknowns." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Draw Layla's bar. Copy it four times. That is what times as many means.",
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
        connect: "How would the bar change if it said 4 more instead?",
        misconception: "Treating the bar as decoration rather than a decision tool." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the bar before you calculate.",
        monitor: ["Drawing first", "Finding the middle step", "Answering the actual question"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Adding 7 and 9 to get 16." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: comparisons that hide a division.",
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
        return <NoticeWonder draw={makeCompareBar61("times")} height={256} award={award}
          notices={["One bar is longer", "The short bar repeats", "They start in the same place", "The long one has equal parts"]}
          wonders={["How many times longer?", "What is the total?", "Do I add or multiply?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory61} height={256} award={award}
          label="How many books did Omar read?" min={12} max={80} start={48} unit="books"
          after="Locked. Now let us draw what the words actually say."
          note="Four times as many is not the same as four more." />;

      case 2:
        return <ExploreChips draw={makeCompareBar61(kind)} height={256}
          label="Which comparison is it?"
          value={kind}
          onPick={(v) => setKind(v)}
          chips={[{ v: "times", label: "4 times as many" }, { v: "more", label: "12 more" }]}
          caption={<MathEl omml={kind === "times" ? M.compare : M.addCompare} size="xl" display="block" />}
          footnote="Times as many repeats the bar. More adds a piece to it." />;

      case 3:
        return <ExploreChips draw={makeSteps61(step)} height={266}
          label="How many more did Omar read?"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
          caption={<MathEl omml={M.answer} size="lg" display="block" />}
          footnote="The answer to step 1 becomes a number you need in step 2." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "q1", text: "How many did Omar read?", target: "one" }, { id: "q2", text: "How many more than Layla?", target: "two" }, { id: "q3", text: "How many did they read altogether?", target: "two" }, { id: "q4", text: "How many books is 4 times 12?", target: "one" }]}
          targets={[
            { id: "one", label: "one step" },
            { id: "two", label: "two steps — something must be found first" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Hana's way — one equation", omml: M.step1, h: 92, quote: "Four times twelve. I wrote it straight down." }}
          right={{ name: "Faisal's way — draw and count", omml: M.answer, h: 92, quote: "I drew four bars of 12 and added them." }}
          same={["Both get 48", "Both use the number 4", "Both treat 12 as one unit"]}
          diff={["Hana multiplies, Faisal adds", "Faisal's takes longer", "Hana's works for bigger numbers"]} />;

      case 6:
        return <BoardScreen draw={drawBoard61} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "times as many multiplies · how many more adds" }]}
          hand={"times as many → copy the bar · how many more → add a piece to the bar"}
          cards={[
            { title: "The comparison we drew", omml: M.compare, note: "four copies of Layla's 12" },
            { title: "Tap to see the other kind", omml: M.addCompare, revealOmml: M.answer, reveal: true,
              note: "how many more is a different question" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Sara has 9 stickers. Noura has 7 times as many. How many does Noura have?"
          omml={M.swyk}
          options={[{ v: "a", text: "16" }, { v: "b", text: "63" }, { v: "c", text: "54" }, { v: "d", text: "72" }]}
          right="b"
          support={{
            yes: "Yes — 7 copies of 9 is 63.",
            notYet: "Not yet — draw the bars and look at what is missing.",
            draw: drawSupport61, h: 82,
            hint: "Times as many means copy the bar, not add to it."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find two amounts at home and say one as times as many of the other." />;

      default: return null;
    }
  }
};
