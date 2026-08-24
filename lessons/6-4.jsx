/* ===========================================================================
   Grade 4 · Topic 6 · LESSON 6-4 · More Model Multi-Step Problems
   Standard MP.4   I can ... draw a bar diagram when the two steps use
   different operations.
   =========================================================================== */

const M = {
  step1: om(mt("4×24=96")),
  step2: om(mt("96÷3=32")),
  chain: om(mt("4×24=96"), mnor(", then "), mt("96÷3=32")),
  hidden: om(mnor("the total number of chairs was never found")),
  wrong: om(mt("24÷3=8")),
  rule: om(mnor("@RULE@")),
  swyk: om(mt("5×24=120")),
  swykAnswer: om(mt("120÷3=40"))
};

/* the diagram growing one step at a time */
const makeChain64 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  D.strip(ctx, { x: x, y: 58, w: w * 0.5, h: 42, prog: step >= 1 ? 1 : 0.001,
    total: step >= 1 ? 96 : "?", parts: [{ v: 24, label: "24", col: "#2D70B3" }, { v: 24, label: "24", col: "#2D70B3" }, { v: 24, label: "24", col: "#2D70B3" }, { v: 24, label: "24", col: "#2D70B3" }] });
  if (step >= 1) D.txt(ctx, "step 1: 4×24=96", W / 2, 124, { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 162, w: w, h: 42, prog: 1, total: 32, parts: [{ v: 32, label: "32", col: "#388C46" }, { v: 32, label: "32", col: "#388C46" }, { v: 32, label: "32", col: "#388C46" }] });
    D.txt(ctx, "step 2: 96÷3=32", W / 2, 234, { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "32 chairs go to each hall" : "the question is not answered yet",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

/* spot the missing middle step */
const makeHidden64 = (found) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const lines = [{ t: "There are 4 rows of 24 chairs.", gap: false }, { t: "They must be shared into 3 halls.", gap: false }, { t: "So 24 \u00f7 3 = 8 chairs per hall.", gap: true }];
  let y = 62;
  lines.forEach(function (l, k) {
    const flagged = found && l.gap;
    ctx.save();
    D.rr(ctx, 44, y - 18, W - 88, 38, 7);
    ctx.fillStyle = flagged ? "rgba(199,68,64,.18)" : "rgba(234,244,242,.04)";
    ctx.fill();
    if (flagged) { ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    D.txt(ctx, l.t, W / 2, y + 2, { size: 13.5, col: "#EAF4F2", font: "marker" });
    y += 48;
  });
  D.txt(ctx, found ? "24 ÷ 3 shares one row, not all four" : "which number do you not actually have yet?",
    W / 2, H - 16, { size: 13.5, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

const drawStory64 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "chairs for three halls", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, { x: 60, y: 58, w: (W - 120) * 0.5, h: 40, prog: p2, parts: [{ v: 24, label: "24", col: "#2D70B3" }, { v: 24, label: "24", col: "#2D70B3" }, { v: 24, label: "24", col: "#2D70B3" }, { v: 24, label: "24", col: "#2D70B3" }] });
  D.strip(ctx, { x: 60, y: 126, w: W - 120, h: 40, prog: p2, parts: [{ v: 32, label: "32", col: "#388C46" }, { v: 32, label: "32", col: "#388C46" }, { v: 32, label: "32", col: "#388C46" }] });
  if (p3 > 0) {
    D.txt(ctx, "4 rows of 24 chairs · 3 halls", W / 2, 192, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many chairs for each hall?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard64 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Multiply, then divide" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 620), p4 = D.at(f, 620, 770);
  const x = 96, w = W - 192;
  D.strip(ctx, { x: x, y: 112, w: w * 0.5, h: 44, prog: p1, total: p2 > 0 ? 96 : "?", parts: [{ v: 24, label: "24", col: "#2D70B3" }, { v: 24, label: "24", col: "#2D70B3" }, { v: 24, label: "24", col: "#2D70B3" }, { v: 24, label: "24", col: "#2D70B3" }] });
  if (p2 > 0) D.txt(ctx, "4×24=96", W / 2, 198, { size: 19, col: "#34D399", font: "marker", alpha: p2 });
  if (p3 > 0) {
    D.strip(ctx, { x: x, y: 232, w: w, h: 44, prog: p3, total: 32, parts: [{ v: 32, label: "32", col: "#388C46" }, { v: 32, label: "32", col: "#388C46" }, { v: 32, label: "32", col: "#388C46" }] });
    D.txt(ctx, "96÷3=32", W / 2, 318, { size: 19, col: "#34D399", font: "marker", alpha: D.at(f, 500, 600) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "gather them all first, then share them out", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 760) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 800), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport64 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 26, w: W - 48, h: 38, prog: 1, total: 120, parts: [{ v: 40, label: "40", col: "#388C46" }, { v: 40, label: "40", col: "#388C46" }, { v: 40, label: "40", col: "#388C46" }] });
};

const LESSON = {
  code: "6-4",
  storageKey: "daf-g4-t6-l4",
  title: "More Model Multi-Step Problems",
  unit: "GRADE 4 · TOPIC 6 · LESSON 6-4 · MP.4",
  math: M,
  ixl: ["CZQ"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two bars, and a question mark. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "There is a number here you do not have yet.",
      rail: { launch: "I am not asking for an answer. Just describe the two bars.",
        monitor: ["Reading the known numbers", "Spotting the question mark", "Comparing the lengths"],
        connect: "Who noticed something nobody else did?",
        misconception: "Assuming every number in the picture is given." } },

    { phase: "launch", title: "Four rows, <em>three halls</em>",
      lead: "4 rows of 24 chairs shared equally between 3 halls. Estimate first.",
      goal: "Create the need — the question needs a number nobody gave you.",
      pull: "Estimate first, then find the missing middle.",
      rail: { launch: "Try to answer it in one step. What stops you?",
        monitor: ["Getting stuck", "Finding the middle number", "Guessing"],
        connect: "Which number did you have to work out first?",
        misconception: "Dividing one row instead of the whole." } },

    { phase: "monitor", title: "Build it in <em>two steps</em>",
      lead: "Find the total number of chairs first. Only then can you share them.",
      goal: "Multi-step problems chain two diagrams together.",
      pull: "Some working looks right and still misses a step.",
      rail: { launch: "Predict the middle number before you tap.",
        monitor: ["Finding the middle first", "Skipping to the end", "Checking against an estimate"],
        connect: "Why can the second step not come first?",
        misconception: "Dividing before multiplying." } },

    { phase: "monitor", title: "Find the <em>missing step</em>",
      lead: "Every line here is true. One number was never worked out.",
      goal: "Critique working, not just produce it.",
      pull: "Now sort some questions by how many steps they need.",
      rail: { launch: "Read it line by line. Where does a number appear from nowhere?",
        monitor: ["Checking each line", "Looking for the jump", "Rewriting the working"],
        connect: "Which number was assumed rather than found?",
        misconception: "Accepting working because every line is individually true." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Sort each question. No grading until the class commits.",
      goal: "Recognise a hidden middle step.",
      pull: "Two students solved the same problem in a different order.",
      rail: { launch: "Ask: do I already know every number I need?",
        monitor: ["Counting the unknowns", "Checking what is given", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers rather than the unknowns." } },

    { phase: "connect", title: "Two <em>routes</em>, one answer",
      lead: "Maya multiplied then divided. Nasser shared each row, then added. Both got 32.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following one route", "Following the other", "Checking both agree"],
        connect: "Why do both routes work?",
        misconception: "Believing there is only one correct order." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Draw the four rows. Join them into one bar. Then cut that bar into three.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next bar", "Naming the middle number", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Writing the equation before drawing anything." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the middle step", "Testing on a new problem", "Answering the actual question"],
        connect: "How do you know when you have finished?",
        misconception: "Stopping at the first number you can calculate." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the bar, find the middle number, then answer.",
        monitor: ["Finding the middle step", "Answering the middle step", "Checking the question"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Dividing 24 by 3 and answering 8." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: choosing the operations yourself.",
      rail: { launch: "Ask three students to name the middle step in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready for harder problems"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [found, setFound] = useState(false);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawStory64} height={256} award={award}
          notices={["Four equal rows", "Three equal shares", "The bars are different lengths", "There is a question mark"]}
          wonders={["How many chairs in total?", "Do I multiply or divide?", "Which comes first?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory64} height={256} award={award}
          label="About how many chairs per hall?" min={10} max={60} start={32} unit="chairs"
          after="Locked. Now let us find the number nobody gave us."
          note="Two different operations, and the order matters." />;

      case 2:
        return <ExploreChips draw={makeChain64(step)} height={266}
          label="How many chairs per hall?"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
          caption={<MathEl omml={M.chain} size="lg" display="block" />}
          footnote="The answer to step 1 becomes a number you need in step 2." />;

      case 3:
        return (
          <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
            <Sketch draw={makeHidden64(found)} height={252} />
            <div style={{ textAlign: "center" }}>
              <button className="btn btn-primary" disabled={found}
                style={{ opacity: found ? 0.5 : 1 }}
                onClick={() => { setFound(true); }}>
                <Icon name="fa-magnifying-glass" /> Show the number that was never found
              </button>
            </div>
            <div className="glass-card" style={{ cursor: "default", textAlign: "center", background: "var(--daf-mint)" }}>
              <MathEl omml={M.hidden} size="lg" display="block" />
            </div>
          </div>
        );

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "t1", text: "How many chairs altogether?", target: "one" }, { id: "t2", text: "How many chairs per hall?", target: "two" }, { id: "t3", text: "How many chairs in one row?", target: "one" }, { id: "t4", text: "How many more does one hall need for 40?", target: "two" }]}
          targets={[
            { id: "one", label: "one step" },
            { id: "two", label: "two steps — something must be found first" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Maya's way — multiply then divide", omml: M.step1, h: 92, quote: "96 chairs altogether, then shared by 3." }}
          right={{ name: "Nasser's way — share each row", omml: M.chain, h: 92, quote: "Each row of 24 splits into 8 per hall, four times." }}
          same={["Both get 32", "Both use all the numbers", "Both need two operations"]}
          diff={["Maya gathers first, Nasser shares first", "Nasser does four small divisions", "Maya's total is useful for other questions"]} />;

      case 6:
        return <BoardScreen draw={drawBoard64} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "@RULE@" }]}
          hand={"draw what you know · find the number that is missing · then answer the question asked"}
          cards={[
            { title: "The middle step", omml: M.step1, note: "not the answer, but the key to it" },
            { title: "Tap for the real answer", omml: M.wrong, revealOmml: M.step2, reveal: true,
              note: "one row is not the whole" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A school has 5 boxes of 24 books, shared equally between 3 classes. How many books per class?"
          omml={M.swyk}
          options={[{ v: "a", text: "8" }, { v: "b", text: "40" }, { v: "c", text: "120" }, { v: "d", text: "15" }]}
          right="b"
          support={{
            yes: "Yes — 5 × 24 = 120 books, and 120 ÷ 3 = 40 each.",
            notYet: "Not yet — what did you have to work out before you could answer?",
            draw: drawSupport64, h: 82,
            hint: "Gather all the books first, then share them."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find something at home that must be gathered then shared, and draw both bars." />;

      default: return null;
    }
  }
};
