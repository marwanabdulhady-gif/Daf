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
  rule: om(mnor("a late condition changes the order — find the total first")),
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


/* estimate gate: a reasonable answer sits near the estimate */
const makeCheck64 = (found, onFound) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onFound) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onFound(!found) });
  const lines = [
    { t: "estimate first: 4 × 25 = 100", ok: true },
    { t: "100 ÷ 3 ≈ 33, about", ok: true },
    { t: "the exact answer must sit near 33", ok: false }
  ];
  let y = 62;
  lines.forEach((l) => {
    const flagged = found && !l.ok;
    ctx.save();
    D.rr(ctx, 30, y - 15, W - 60, 34, 7);
    ctx.fillStyle = flagged ? "rgba(18,133,124,.22)" : "rgba(234,244,242,.04)";
    ctx.fill();
    if (flagged) { ctx.strokeStyle = "#12857C"; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    D.txt(ctx, l.t, W / 2, y + 2, { size: 13.5, col: "#EAF4F2", font: "marker" });
    y += 42;
  });
  D.txt(ctx, found ? "the exact 32 sits right next to 33 — the estimate caught the disasters"
                   : "an estimate is a net, not a trap — what does it catch?",
    W / 2, H - 18, { size: 13, col: found ? "#34D399" : "#C9A227", font: "marker" });
};

/* the plan as a board: gather first, then share */
const makePlan64 = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: 30, y: 40, w: W - 60, h: H - 80, value: 0, on: () => onStep((step + 1) % 4) });
  const rows = [
    { n: "1", t: "4 × 24 = 96 — the total chairs", col: "#2D70B3" },
    { n: "2", t: "96 ÷ 3 = 32 — per hall", col: "#FA7E19" },
    { n: "✓", t: "32 × 3 = 96 — every chair accounted for", col: "#388C46" }
  ];
  let y = 70;
  rows.forEach((r, k) => {
    const on = k < step;
    ctx.save();
    D.rr(ctx, 30, y - 18, W - 60, 42, 8);
    ctx.fillStyle = on ? "rgba(234,244,242,.06)" : "rgba(234,244,242,.02)";
    ctx.fill();
    ctx.strokeStyle = on ? r.col : "rgba(234,244,242,.15)";
    ctx.lineWidth = on ? 2 : 1; ctx.stroke();
    ctx.restore();
    D.txt(ctx, r.n, 52, y + 3, { size: 15, col: r.col, font: "mono", weight: 700, alpha: on ? 1 : 0.3 });
    D.txt(ctx, on ? r.t : "…", W / 2 + 30, y + 3, { size: 14.5, col: "#EAF4F2", font: "marker", alpha: on ? 1 : 0.25 });
    y += 52;
  });
  D.txt(ctx, step === 3 ? "the decision board: every step, every check"
                       : "a plan the council can sign",
    W / 2, H - 16, { size: 13, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const LESSON = {
  code: "6-4",
  storageKey: "daf-g4-t6-l4",
  title: "More Model Multi-Step Problems",
  unit: "GRADE 4 · TOPIC 6 · LESSON 6-4 · MP.4",
  math: M,
  ixl: ["CZQ"],

  metas: [
    { phase: "warmup", title: "A condition <em>arrives late</em>",
      lead: "4 rows of 24 chairs, 3 halls. The plan was one division — then the condition arrived: the halls must be equal.",
      goal: "Notice a new constraint can change which operations belong in the plan.",
      pull: "Two different operations, and the order matters.",
      rail: { launch: "Fictional frame. Look at the plan — no working yet.",
        monitor: ["Counting the rows", "Counting the halls", "Finding the question mark"],
        connect: "What did the late condition change?",
        misconception: "Dividing one row by the halls — a row is not the whole." } },

    { phase: "launch", title: "About how many chairs <em>per hall</em>?",
      lead: "4 × 25 = 100, and 100 ÷ 3 ≈ 33. The estimate says the answer sits near 33.",
      goal: "Create the need — estimate the final answer before the total exists.",
      pull: "The estimate is a net: it catches the disasters.",
      rail: { launch: "Give a per-hall range and say how you got it.",
        monitor: ["Estimating 4 × 25", "Dividing 100 by 3", "Checking the range"],
        connect: "Why estimate the answer before finding the total?",
        misconception: "Estimating only the total and trusting the final division." } },

    { phase: "monitor", title: "Zayd builds the <em>chain</em>",
      lead: "Step 1: 4 × 24 = 96 — the total chairs. Step 2: 96 ÷ 3 = 32 — per hall. The late condition is now in the plan.",
      goal: "Model the revised plan with the middle answer shown.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: { launch: "Before step 2: which number from step 1 is it using?",
        monitor: ["Finding 96 first", "Dividing 96 by 3", "Naming the middle answer"],
        connect: "Why can the per-hall number not come first?",
        misconception: "Dividing 24 by 3 — one row is not the whole." } },

    { phase: "monitor", title: "The number that was <em>never found</em>",
      lead: "A polished plan says 24 ÷ 3 = 8, so each hall gets 8. One number was never found — the total chairs.",
      goal: "Spot the missing middle step when a condition changes the plan.",
      pull: "One row is not the whole.",
      rail: { launch: "Each line must follow from the line before it.",
        monitor: ["Checking line 1", "Checking line 2", "Flagging the skipped total"],
        connect: "What number did the plan pretend to have?",
        misconception: "Accepting a tidy final line from a flawed plan." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Four hall questions. Each one needs one step — or two.",
      goal: "Recognise the hidden middle step in a revised plan.",
      pull: "Do I already know every number I need?",
      rail: { launch: "Say the middle answer before you place the question.",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Mazin <em>gathers first</em>. Nasser <em>shares first</em>",
      lead: "Mazin: 96 chairs, then shared by 3. Nasser: each row of 24 splits into 8 per hall, four times. Both get 32.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following Mazin's total", "Counting Nasser's shares", "Checking both reach 32"],
        connect: "Why is Mazin's total useful for other questions?",
        misconception: "Believing share-first is always faster." } },

    { phase: "monitor", title: "The <em>estimate gate</em>",
      lead: "The exact 32 walks in; the estimate said about 33. The net catches the disasters and lets the reasonable through.",
      goal: "Use the estimate to check the final answer of a revised plan.",
      pull: "An estimate is a net, not a trap — what does it catch?",
      rail: { launch: "Before the gate: where does 32 sit against 33?",
        monitor: ["Comparing 32 to 33", "Flagging place slips", "Letting the reasonable through"],
        connect: "What would the estimate have caught?",
        misconception: "Trusting the chain's last line without a check." } },

    { phase: "monitor", title: "The <em>decision board</em>",
      lead: "The revised plan as the council signs it: the total first, the share second, the check third.",
      goal: "Write the revised plan so another person can re-check it.",
      pull: "A plan the council can sign.",
      rail: { launch: "Before each line: which step is it?",
        monitor: ["Writing the total line", "Writing the share line", "Writing the check"],
        connect: "What would you add to make the plan re-checkable?",
        misconception: "Writing only the final answer on a decision board." } },

    { phase: "synth", title: "On the <em>board</em>: a late condition changes the order",
      lead: "The condition arrived late — so the total comes first, and the share comes second.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the condition", "Reordering the steps", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Keeping the old order when a condition changes the plan." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "Gather first, then share — the middle answer changes the plan, and the plan is written for the re-check.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the middle step", "Checking with the estimate", "Testing on a new plan"],
        connect: "Which line of the revised plan is the easiest to get wrong?",
        misconception: "Answering with a row's share instead of a hall's share." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "5 boxes of 24 books, shared equally between 3 classes. How many per class?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the middle step.",
        monitor: ["Finding 5 × 24", "Dividing 120 by 3", "Naming what was asked"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 8 — a box's share was called a class's share." } },

    { phase: "connect", title: "The revised plan is <em>signed</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the council's final calculation — the complete proposal, one defensible recommendation.",
      rail: { launch: "Ask three students to say how a late condition changes a plan.",
        monitor: ["Able to explain the reorder", "Still keeps the old order", "Ready for the final recommendation"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [found, setFound] = useState(false);
    const [check, setCheck] = useState(false);
    const [plan, setPlan] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="A condition arrives late"
            text="4 rows of 24 chairs, 3 halls. The plan was one division — then the condition arrived: the halls must be equal."
            clue="Two different operations, and the order matters.">
            <NoticeWonder draw={drawStory64} height={256} award={award}
              notices={["Four equal rows", "Three equal shares", "The bars are different lengths", "There is a question mark"]}
              wonders={["How many chairs in total?", "Do I multiply or divide?", "Which comes first?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The range, before the total"
            text="Omar asks the seating clerk's question: about how many chairs per hall — with a fast range, before the total exists?"
            clue="4 × 25 = 100, and 100 ÷ 3 ≈ 33.">
            <LaunchEstimate draw={drawStory64} height={256} award={award}
              label="About how many chairs per hall?" min={10} max={60} start={32} unit="chairs"
              after="Locked. Now let us find the number nobody gave us."
              note="The chair counts are simulated — the planning works on any multi-step problem." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds the revised chain"
            text="He can build the plan step by step — the class must name the number step 2 borrows from step 1."
            clue="The total first — the late condition is now in the plan.">
            <ExploreChips draw={makeChain64(step)} height={266}
              label="How many chairs per hall?"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
              caption={<MathEl omml={M.chain} size="lg" display="block" />}
              footnote="The answer to step 1 becomes a number you need in step 2." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The number that was never found"
            text="A polished plan on the board: 24 ÷ 3 = 8, so each hall gets 8. Omar reads it line by line — one number was never found."
            clue="One row is not the whole.">
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
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="One step or two?"
            text="Omar and Zayd lay four hall questions on the table. Each one needs one step — or two."
            clue="Do I already know every number I need?">
            <CardSort award={award} columns={2}
              items={[{ id: "t1", text: "How many chairs altogether?", target: "one" }, { id: "t2", text: "How many chairs per hall?", target: "two" }, { id: "t3", text: "How many chairs in one row?", target: "one" }, { id: "t4", text: "How many more does one hall need for 40?", target: "two" }]}
              targets={[
                { id: "one", label: "one step" },
                { id: "two", label: "two steps — something must be found first" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 32"
            text="Mazin gathers the total first. Nasser shares each row first. Both halls get 32."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Mazin's way — multiply then divide", omml: M.step1, h: 92, quote: "96 chairs altogether, then shared by 3." }}
              right={{ name: "Nasser's way — share each row", omml: M.chain, h: 92, quote: "Each row of 24 splits into 8 per hall, four times." }}
              same={["Both get 32", "Both use all the numbers", "Both need two operations"]}
              diff={["Mazin gathers first, Nasser shares first", "Nasser does four small divisions", "Mazin's total is useful for other questions"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate gate"
            text="The exact 32 walks in; the estimate said about 33. Omar runs the gate: the net catches the disasters, the reasonable ones pass."
            clue="An estimate is a net, not a trap.">
            <ExploreChips draw={makeCheck64(check, setCheck)} height={252}
              label="Does the answer sit where the estimate said?"
              value={check ? 1 : 0}
              onPick={(v) => setCheck(v === 1)}
              chips={[{ v: 0, label: "three lines" }, { v: 1, label: "check the range" }]}
              caption={<MathEl omml={M.step2} size="lg" display="block" />}
              footnote="Whatever the plan, an estimate catches the disasters." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The decision board"
            text="Zayd writes the revised plan the way the council signs it: the total first, the share second, the check third."
            clue="A plan the council can sign.">
            <ExploreChips draw={makePlan64(plan, setPlan)} height={256}
              label="Write the decision board"
              value={plan}
              onPick={(v) => setPlan(v)}
              chips={[{ v: 0, label: "blank" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }, { v: 3, label: "the check" }]}
              caption={<MathEl omml={M.chain} size="lg" display="block" />}
              footnote="Every step, every check — a plan someone else can re-check." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The revised plan is drawn, not declared"
            text="Zayd builds only what the class can justify: the condition named, the order changed, the check shown."
            clue="A late condition changes the order — find the total first.">
            <BoardScreen draw={drawBoard64} height={430}
              caption="A late condition changes the order — find the total first." />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="Gather first, then share — the middle answer changes the plan, and the plan is written for the re-check."
            clue="The middle step is part of the argument.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "a late condition changes the order — find the total first" }]}
              hand={"draw what you know · find the number that is missing · then answer the question asked"}
              cards={[
                { title: "The middle step", omml: M.step1, note: "not the answer, but the key to it" },
                { title: "Tap for the real answer", omml: M.wrong, revealOmml: M.step2, reveal: true,
                  note: "one row is not the whole" }
              ]} />
          </StoryShell>
        );

      case 10:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the revised plan"
            text="5 boxes of 24 books, 3 classes. Show the middle step — then the share."
            clue="120 is the middle step. The question asks per class.">
            <ShowWhatYouKnow award={award}
              prompt="A school has 5 boxes of 24 books, shared equally between 3 classes. How many books per class?"
              omml={M.swyk}
              options={[{ v: "a", text: "8" }, { v: "b", text: "40" }, { v: "c", text: "120" }, { v: "d", text: "15" }]}
              right="b"
              support={{
                yes: "Yes — 5 × 24 = 120 books, and 120 ÷ 3 = 40 each.",
                notYet: "Not yet — what did you have to work out before you could answer?",
                draw: drawSupport64, h: 82,
                hint: "Gather all the books first, then share them."
              }} />
          </StoryShell>
        );

      case 11:
        return (
          <StoryHandoff
            title="The revised plan is signed"
            text="Omar signs the revised plan: the condition in, the order changed, the check shown. The council now holds the complete proposal — and exactly one defensible recommendation."
            artifact="Council board · revised multi-step plan"
            next="The council's final calculation — the complete proposal, one defensible recommendation.">
            <Closing game={game} omml={M.rule}
              action="Find something at home that must be gathered then shared, and draw both bars." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
