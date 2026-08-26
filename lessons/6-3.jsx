/* ===========================================================================
   Grade 4 · Topic 6 · LESSON 6-3 · Model Multi-Step Problems
   Standard MP.4   I can ... draw a bar diagram that shows both steps of a
   problem before I calculate anything.
   =========================================================================== */

const M = {
  step1: om(mt("3×28=84")),
  step2: om(mt("140-84=56")),
  chain: om(mt("3×28=84"), mnor(", then "), mt("140-84=56")),
  hidden: om(mnor("the total sold was never worked out")),
  wrong: om(mt("140-28=112")),
  rule: om(mnor("find the number that was never given, then answer the question")),
  swyk: om(mt("4×39=156")),
  swykAnswer: om(mt("200-156=44"))
};

/* the diagram growing one step at a time */
const makeChain63 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  D.strip(ctx, { x: x, y: 58, w: w * 0.42, h: 42, prog: step >= 1 ? 1 : 0.001,
    total: step >= 1 ? 84 : "?", parts: [{ v: 28, label: "28", col: "#2D70B3" }, { v: 28, label: "28", col: "#2D70B3" }, { v: 28, label: "28", col: "#2D70B3" }] });
  if (step >= 1) D.txt(ctx, "step 1: 3×28=84", W / 2, 124, { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 162, w: w, h: 42, prog: 1, total: 140, parts: [{ v: 84, label: "84 sold", col: "#12857C" }, { v: 56, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "step 2: 140-84=56", W / 2, 234, { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "56 shirts are left" : "the question is not answered yet",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

/* spot the missing middle step */
const makeHidden63 = (found) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const lines = [{ t: "There are 3 boxes of 28 shirts.", gap: false }, { t: "The shop had 140 shirts.", gap: false }, { t: "So 140 \u2212 28 = 112 are left.", gap: true }];
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
  D.txt(ctx, found ? "140 − 28 uses one box, not three" : "which number do you not actually have yet?",
    W / 2, H - 16, { size: 13.5, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

const drawStory63 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school uniform shop", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, { x: 60, y: 58, w: (W - 120) * 0.42, h: 40, prog: p2, parts: [{ v: 28, label: "28", col: "#2D70B3" }, { v: 28, label: "28", col: "#2D70B3" }, { v: 28, label: "28", col: "#2D70B3" }] });
  D.strip(ctx, { x: 60, y: 126, w: W - 120, h: 40, prog: p2, parts: [{ v: 84, label: "84 sold", col: "#12857C" }, { v: 56, label: "?", col: "#C9A227" }] });
  if (p3 > 0) {
    D.txt(ctx, "3 boxes of 28 shirts · 140 shirts in stock", W / 2, 192, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many are left after the boxes are sold?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard63 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Two bars, one problem" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 620), p4 = D.at(f, 620, 770);
  const x = 96, w = W - 192;
  D.strip(ctx, { x: x, y: 112, w: w * 0.42, h: 44, prog: p1, total: p2 > 0 ? 84 : "?", parts: [{ v: 28, label: "28", col: "#2D70B3" }, { v: 28, label: "28", col: "#2D70B3" }, { v: 28, label: "28", col: "#2D70B3" }] });
  if (p2 > 0) D.txt(ctx, "3×28=84", W / 2, 198, { size: 19, col: "#34D399", font: "marker", alpha: p2 });
  if (p3 > 0) {
    D.strip(ctx, { x: x, y: 232, w: w, h: 44, prog: p3, total: 140, parts: [{ v: 84, label: "84 sold", col: "#12857C" }, { v: 56, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "140-84=56", W / 2, 318, { size: 19, col: "#34D399", font: "marker", alpha: D.at(f, 500, 600) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the first bar makes the number the second bar needs", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 760) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 800), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport63 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 26, w: W - 48, h: 38, prog: 1, total: 200, parts: [{ v: 156, label: "156 packed", col: "#12857C" }, { v: 44, label: "?", col: "#C9A227" }] });
};


/* estimate gate: a reasonable answer sits near the estimate */
const makeCheck63 = (found, onFound) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onFound) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onFound(!found) });
  const lines = [
    { t: "estimate first: 3 × 30 = 90", ok: true },
    { t: "140 − 90 = 50, about", ok: true },
    { t: "the exact answer must sit near 50", ok: false }
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
  D.txt(ctx, found ? "the exact 56 sits right next to 50 — the estimate caught the disasters"
                   : "an estimate is a net, not a trap — what does it catch?",
    W / 2, H - 18, { size: 13, col: found ? "#34D399" : "#C9A227", font: "marker" });
};

/* the plan as a board: the multi-step decision board */
const makePlan63 = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: 30, y: 40, w: W - 60, h: H - 80, value: 0, on: () => onStep((step + 1) % 4) });
  const rows = [
    { n: "1", t: "3 × 28 = 84 — the total sold", col: "#2D70B3" },
    { n: "2", t: "140 − 84 = 56 — what is left", col: "#FA7E19" },
    { n: "✓", t: "56 + 84 = 140 — every number accounted for", col: "#388C46" }
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
  code: "6-3",
  storageKey: "daf-g4-t6-l3",
  title: "Model Multi-Step Problems",
  unit: "GRADE 4 · TOPIC 6 · LESSON 6-3 · MP.4",
  math: M,
  ixl: ["G8Z"],

  metas: [
    { phase: "warmup", title: "The plan with <em>three steps</em>",
      lead: "3 boxes of 28 shirts, 140 shirts in stock. The question asks what is left — and the number you need has not been given.",
      goal: "Notice a plan that hides a number: the total sold was never worked out.",
      pull: "You are given 3, 28 and 140 — but not the number you actually need.",
      rail: { launch: "Fictional frame. Look at the plan — no working yet.",
        monitor: ["Counting the given numbers", "Finding the question mark", "Wonding what is missing"],
        connect: "Which number does the plan need that nobody gave?",
        misconception: "Subtracting 28 from 140 — one box is not the whole sale." } },

    { phase: "launch", title: "About how many shirts <em>are left</em>?",
      lead: "The stock clerk wants a fast range: 3 × 30 = 90, so 140 − 90 ≈ 50.",
      goal: "Create the need — estimate the final answer before the middle step exists.",
      pull: "The estimate is a net: it catches the disasters.",
      rail: { launch: "Give a range for what is left, and say how you got it.",
        monitor: ["Estimating 3 × 30", "Subtracting from 140", "Checking the range is sensible"],
        connect: "Why estimate the answer before finding the middle number?",
        misconception: "Estimating only the middle step and trusting the final subtraction." } },

    { phase: "monitor", title: "Zayd builds the <em>chain</em>",
      lead: "Step 1: 3 × 28 = 84. Step 2: 140 − 84 = 56. The answer to step 1 becomes the number step 2 needs.",
      goal: "Model the two steps with the middle answer shown.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: { launch: "Before step 2: which number from step 1 is it using?",
        monitor: ["Finding 84 first", "Subtracting 84 from 140", "Naming the middle answer"],
        connect: "Why can step 2 not come first?",
        misconception: "Subtracting before the total exists." } },

    { phase: "monitor", title: "The number that was <em>never found</em>",
      lead: "A polished plan says 140 − 28 = 112. One number was never found — the total sold.",
      goal: "Spot the missing middle step in a flawed plan.",
      pull: "The total sold was never worked out.",
      rail: { launch: "Each line must follow from the line before it.",
        monitor: ["Checking line 1", "Checking line 2", "Flagging the skipped total"],
        connect: "What number did the plan pretend to have?",
        misconception: "Accepting a tidy final line from a flawed plan." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Four stock questions. Each one needs one step — or two.",
      goal: "Recognise the hidden middle step in a plan.",
      pull: "Do I already know every number I need?",
      rail: { launch: "Say the middle answer before you place the question.",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Lamees <em>multiplies then subtracts</em>. Rayan <em>subtracts three times</em>",
      lead: "Lamees: 3 × 28 = 84, then 140 − 84. Rayan: takes 28 off, then again, then again. Both get 56.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following Lamees's total", "Counting Rayan's takes", "Checking both reach 56"],
        connect: "Why is Lamees's total useful for other questions?",
        misconception: "Believing the longer method is always more careful." } },

    { phase: "monitor", title: "The <em>estimate gate</em>",
      lead: "The exact 56 walks in. The estimate said about 50. The net catches the disasters and lets the reasonable through.",
      goal: "Use the estimate to check the final answer of a multi-step plan.",
      pull: "An estimate is a net, not a trap — what does it catch?",
      rail: { launch: "Before the gate: where does 56 sit against 50?",
        monitor: ["Comparing 56 to 50", "Flagging place slips", "Letting the reasonable through"],
        connect: "What would the estimate have caught?",
        misconception: "Trusting the chain's last line without a check." } },

    { phase: "monitor", title: "The <em>decision board</em>",
      lead: "The plan as the council signs it: step 1, step 2, the check — every number accounted for.",
      goal: "Write the plan so another person can re-check it.",
      pull: "A plan the council can sign.",
      rail: { launch: "Before each line: which step is it?",
        monitor: ["Writing the total-sold line", "Writing the left line", "Writing the check"],
        connect: "What would you add to make the plan re-checkable?",
        misconception: "Writing only the final answer on a decision board." } },

    { phase: "synth", title: "On the <em>board</em>: find the number that was never given",
      lead: "Draw what you know. Find the number that is missing. Then answer the question asked.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the missing number", "Building the chain", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Answering the middle step as if it were the question." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "The middle answer is not the answer — it is the key to it.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the middle step", "Checking with the estimate", "Testing on a new plan"],
        connect: "Which line of the plan is the easiest to get wrong?",
        misconception: "Subtracting one group from the whole instead of the total." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "4 crates of 39 books, 200 books total. How many are unpacked?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the middle step.",
        monitor: ["Finding 4 × 39", "Subtracting 156 from 200", "Naming what was asked"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 156 — the middle step was called the answer." } },

    { phase: "connect", title: "The plan is <em>boarded</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: a condition arrives late — and the order of the plan changes.",
      rail: { launch: "Ask three students to say the missing number in a plan.",
        monitor: ["Able to explain the chain", "Still skips the middle step", "Ready for a late condition"],
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
            title="The plan with three steps"
            text="3 boxes of 28 shirts, 140 shirts in stock. The plan asks what is left — and the number it needs has not been given."
            clue="The total sold was never worked out.">
            <NoticeWonder draw={drawStory63} height={256} award={award}
              notices={["There are three equal boxes", "One bar is much longer", "There is a question mark", "140 is the whole"]}
              wonders={["How many in the boxes altogether?", "What is left?", "Do I multiply or subtract?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The range, before the middle step"
            text="Omar asks the stock clerk's question: about how many shirts are left — with a fast range, before the total exists?"
            clue="3 × 30 = 90, so 140 − 90 ≈ 50.">
            <LaunchEstimate draw={drawStory63} height={256} award={award}
              label="About how many shirts are left?" min={20} max={140} start={56} unit="shirts"
              after="Locked. Now let us find the number nobody gave us."
              note="The stock counts are simulated — the planning works on any multi-step problem." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds the chain"
            text="He can build the plan step by step — the class must name the number step 2 borrows from step 1."
            clue="The answer to step 1 becomes a number you need in step 2.">
            <ExploreChips draw={makeChain63(step)} height={266}
              label="How many shirts are left?"
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
            text="A polished plan on the board: 140 − 28 = 112. Omar reads it line by line — one number was never found."
            clue="140 − 28 uses one box, not three.">
            <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              <Sketch draw={makeHidden63(found)} height={252} />
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
            text="Omar and Zayd lay four stock questions on the table. Each one needs one step — or two."
            clue="Do I already know every number I need?">
            <CardSort award={award} columns={2}
              items={[{ id: "s1", text: "How many shirts in 3 boxes?", target: "one" }, { id: "s2", text: "How many are left after the boxes sell?", target: "two" }, { id: "s3", text: "How many shirts in one box?", target: "one" }, { id: "s4", text: "How many boxes could 140 fill?", target: "two" }]}
              targets={[
                { id: "one", label: "one step" },
                { id: "two", label: "two steps — something must be found first" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 56"
            text="Lamees multiplies then subtracts. Rayan subtracts three times. Both reach 56."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Lamees's way — multiply then subtract", omml: M.step1, h: 92, quote: "Three 28s is 84, then 140 take away 84." }}
              right={{ name: "Rayan's way — subtract three times", omml: M.chain, h: 92, quote: "I took 28 off, then again, then again." }}
              same={["Both get 56", "Both use all three numbers", "Both need more than one calculation"]}
              diff={["Lamees takes two steps, Rayan takes three", "Rayan never finds the total", "Lamees's total is useful for other questions"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate gate"
            text="The exact 56 walks in; the estimate said about 50. Omar runs the gate: the net catches the disasters, the reasonable ones pass."
            clue="An estimate is a net, not a trap.">
            <ExploreChips draw={makeCheck63(check, setCheck)} height={252}
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
            text="Zayd writes the plan the way the council signs it: step 1, step 2, the check — every number accounted for."
            clue="A plan the council can sign.">
            <ExploreChips draw={makePlan63(plan, setPlan)} height={256}
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
            title="The plan is drawn, not declared"
            text="Zayd builds only what the class can justify: the missing number found, the chain built, the check shown."
            clue="Find the number that was never given, then answer the question.">
            <BoardScreen draw={drawBoard63} height={430}
              caption="Find the number that was never given, then answer the question." />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The middle answer is not the answer — it is the key to it."
            clue="The middle step is part of the argument.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "find the number that was never given, then answer the question" }]}
              hand={"draw what you know · find the number that is missing · then answer the question asked"}
              cards={[
                { title: "The middle step", omml: M.step1, note: "not the answer, but the key to it" },
                { title: "Tap for the real answer", omml: M.wrong, revealOmml: M.step2, reveal: true,
                  note: "the question asked what is LEFT" }
              ]} />
          </StoryShell>
        );

      case 10:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the board"
            text="4 crates of 39 books, 200 books total. Show the middle step — then what was asked."
            clue="156 is the middle step. The question asks what is UNPACKED.">
            <ShowWhatYouKnow award={award}
              prompt="A factory packs 4 crates of 39 books. It started with 200 books. How many are unpacked?"
              omml={M.swyk}
              options={[{ v: "a", text: "156" }, { v: "b", text: "44" }, { v: "c", text: "161" }, { v: "d", text: "356" }]}
              right="b"
              support={{
                yes: "Yes — 4 × 39 = 156 packed, and 200 − 156 = 44 left.",
                notYet: "Not yet — what did you have to work out before you could answer?",
                draw: drawSupport63, h: 82,
                hint: "156 is the middle step. The question asks how many are UNPACKED."
              }} />
          </StoryShell>
        );

      case 11:
        return (
          <StoryHandoff
            title="The plan is boarded"
            text="Omar signs the decision board: the missing number found, the chain built, the check shown. But a late condition is on its way — the halls must be seated, and the order of the plan will change."
            artifact="Council board · three-step plan"
            next="A condition arrives late — a new constraint changes which operations belong in the plan.">
            <Closing game={game} omml={M.rule}
              action="Find a two-step problem at home tonight and draw both bars before solving." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
