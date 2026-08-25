/* ===========================================================================
   Grade 4 · Topic 6 · LESSON 6-5 · Solve Multi-Step Problems
   Standard 4.OA.A.3   I can ... solve a multi-step problem and decide
   whether my answer is reasonable.
   =========================================================================== */

const M = {
  step1: om(mt("6×18=108")),
  step2: om(mt("150-108=42")),
  chain: om(mt("6×18=108"), mnor(", then "), mt("150-108=42")),
  hidden: om(mnor("the number baked was never worked out")),
  wrong: om(mt("150-18=132")),
  rule: om(mnor("@RULE@")),
  swyk: om(mt("7×24=168")),
  swykAnswer: om(mt("200-168=32"))
};

/* the diagram growing one step at a time */
const makeChain65 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  D.strip(ctx, { x: x, y: 58, w: w * 0.72, h: 42, prog: step >= 1 ? 1 : 0.001,
    total: step >= 1 ? 108 : "?", parts: [{ v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }] });
  if (step >= 1) D.txt(ctx, "step 1: 6×18=108", W / 2, 124, { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 162, w: w, h: 42, prog: 1, total: 150, parts: [{ v: 108, label: "108 baked", col: "#12857C" }, { v: 42, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "step 2: 150-108=42", W / 2, 234, { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "42 more cupcakes are needed" : "the question is not answered yet",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

/* spot the missing middle step */
const makeHidden65 = (found) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const lines = [{ t: "There are 6 trays of 18 cupcakes.", gap: false }, { t: "The order is for 150 cupcakes.", gap: false }, { t: "So 150 \u2212 18 = 132 more are needed.", gap: true }];
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
  D.txt(ctx, found ? "150 − 18 uses one tray, not six" : "which number do you not actually have yet?",
    W / 2, H - 16, { size: 13.5, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

const drawStory65 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the bake sale", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, { x: 60, y: 58, w: (W - 120) * 0.42, h: 40, prog: p2, parts: [{ v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }] });
  D.strip(ctx, { x: 60, y: 126, w: W - 120, h: 40, prog: p2, parts: [{ v: 108, label: "108 baked", col: "#12857C" }, { v: 42, label: "?", col: "#C9A227" }] });
  if (p3 > 0) {
    D.txt(ctx, "6 trays of 18 cupcakes · an order for 150", W / 2, 192, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many more must be baked?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard65 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Is the answer reasonable?" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 620), p4 = D.at(f, 620, 770);
  const x = 96, w = W - 192;
  D.strip(ctx, { x: x, y: 112, w: w * 0.72, h: 44, prog: p1, total: p2 > 0 ? 108 : "?", parts: [{ v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }] });
  if (p2 > 0) D.txt(ctx, "6×18=108", W / 2, 198, { size: 19, col: "#34D399", font: "marker", alpha: p2 });
  if (p3 > 0) {
    D.strip(ctx, { x: x, y: 232, w: w, h: 44, prog: p3, total: 150, parts: [{ v: 108, label: "108 baked", col: "#12857C" }, { v: 42, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "150-108=42", W / 2, 318, { size: 19, col: "#34D399", font: "marker", alpha: D.at(f, 500, 600) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "estimate first \u2014 it catches a wrong middle step", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 760) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 800), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport65 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 26, w: W - 48, h: 38, prog: 1, total: 200, parts: [{ v: 168, label: "168 folded", col: "#12857C" }, { v: 32, label: "?", col: "#C9A227" }] });
};

const LESSON = {
  code: "6-5",
  storageKey: "daf-g4-t6-l5",
  title: "Solve Multi-Step Problems",
  unit: "GRADE 4 · TOPIC 6 · LESSON 6-5 · 4.OA.A.3",
  math: M,
  ixl: ["U58", "K6X", "X64"],

  metas: [
    { phase: "warmup", title: "The council's <em>final calculation</em>",
      lead: "6 trays of 18 cupcakes, an order for 150. The council holds the complete proposal — and exactly one defensible recommendation.",
      goal: "Notice the full proposal: every number in it has a job.",
      pull: "You are given 6, 18 and 150 — and the question: how many more are needed?",
      rail: { launch: "Fictional frame. Look at the proposal — no working yet.",
        monitor: ["Counting the trays", "Reading the order", "Finding what is asked"],
        connect: "Which number does the question need that nobody gave?",
        misconception: "Subtracting 18 from 150 — one tray is not the whole bake." } },

    { phase: "launch", title: "About how many more are <em>needed</em>?",
      lead: "6 × 20 = 120, so 150 − 120 ≈ 30. The estimate says the answer sits near 30.",
      goal: "Create the need — estimate the final answer before the middle step exists.",
      pull: "The estimate is a net: it catches the disasters.",
      rail: { launch: "Give a range for how many more, and say how you got it.",
        monitor: ["Estimating 6 × 20", "Subtracting from 150", "Checking the range"],
        connect: "Why estimate the answer before finding the middle number?",
        misconception: "Estimating only the middle step and trusting the final subtraction." } },

    { phase: "monitor", title: "Zayd builds the <em>chain</em>",
      lead: "Step 1: 6 × 18 = 108 — the number baked. Step 2: 150 − 108 = 42 — how many more. The middle answer shown.",
      goal: "Model the complete proposal with the middle answer shown.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: { launch: "Before step 2: which number from step 1 is it using?",
        monitor: ["Finding 108 first", "Subtracting 108 from 150", "Naming the middle answer"],
        connect: "Why can step 2 not come first?",
        misconception: "Subtracting before the total baked exists." } },

    { phase: "monitor", title: "The number that was <em>never found</em>",
      lead: "A polished report says 150 − 18 = 132 more are needed. One number was never found — the number baked.",
      goal: "Spot the missing middle step in a polished report.",
      pull: "150 − 18 uses one tray, not six.",
      rail: { launch: "Each line must follow from the line before it.",
        monitor: ["Checking line 1", "Checking line 2", "Flagging the skipped bake total"],
        connect: "What number did the report pretend to have?",
        misconception: "Accepting a tidy final line from a flawed report." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Four bake-sale questions. Each one needs one step — or two.",
      goal: "Recognise the hidden middle step in the complete proposal.",
      pull: "Do I already know every number I need?",
      rail: { launch: "Say the middle answer before you place the question.",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Huda <em>subtracts</em>. Salem <em>counts up</em>",
      lead: "Huda: 150 − 108 = 42. Salem: from 108, counts up to 150 — 42. Both reach the recommendation.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following Huda's subtraction", "Counting Salem's up-count", "Checking both reach 42"],
        connect: "Which direction is easier to check, and why?",
        misconception: "Believing the shorter method is always the safer one." } },

    { phase: "synth", title: "On the <em>board</em>: the recommendation shows its middle answer",
      lead: "Draw what you know. Find the number that is missing. Then answer the question asked.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the middle number", "Building the chain", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Answering the middle step as if it were the question." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "A defensible plan shows its middle answer — the council re-checks the step, not just the result.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the middle step", "Checking with the estimate", "Testing on a new proposal"],
        connect: "Which line of the recommendation is the easiest to get wrong?",
        misconception: "Subtracting one tray from the order instead of the total baked." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "7 packs of 24 flyers, a need for 200. How many more are needed?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the middle step.",
        monitor: ["Finding 7 × 24", "Subtracting 168 from 200", "Naming what was asked"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 168 — the middle step was called the answer." } },

    { phase: "connect", title: "The recommendation is <em>defended</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: a plan that would not cooperate — a tempting path reaches a dead end.",
      rail: { launch: "Ask three students to defend a recommendation in their own words.",
        monitor: ["Able to explain the middle step", "Still hides the middle step", "Ready for the dead end"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [found, setFound] = useState(false);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The council's final calculation"
            text="6 trays of 18 cupcakes, an order for 150. The council holds the complete proposal — and exactly one defensible recommendation."
            clue="The question needs a number nobody gave.">
            <NoticeWonder draw={drawStory65} height={256} award={award}
              notices={["There are six equal trays", "One bar is much longer", "There is a question mark", "150 is the order"]}
              wonders={["How many were baked?", "How many more are needed?", "Is my answer sensible?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The range, before the middle step"
            text="Omar asks the bake-sale's question: about how many more cupcakes are needed — with a fast range, before the total exists?"
            clue="6 × 20 = 120, so 150 − 120 ≈ 30.">
            <LaunchEstimate draw={drawStory65} height={256} award={award}
              label="About how many more are needed?" min={10} max={150} start={42} unit="cupcakes"
              after="Locked. Now let us find the number nobody gave us."
              note="The bake-sale counts are simulated — the planning works on any multi-step problem." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds the chain"
            text="He can build the proposal step by step — the class must name the number step 2 borrows from step 1."
            clue="The answer to step 1 becomes a number you need in step 2.">
            <ExploreChips draw={makeChain65(step)} height={266}
              label="How many more must be baked?"
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
            text="A polished report on the board: 150 − 18 = 132 more are needed. Omar reads it line by line — one number was never found."
            clue="150 − 18 uses one tray, not six.">
            <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              <Sketch draw={makeHidden65(found)} height={252} />
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
            text="Omar and Zayd lay four bake-sale questions on the table. Each one needs one step — or two."
            clue="Do I already know every number I need?">
            <CardSort award={award} columns={2}
              items={[{ id: "s1", text: "How many cupcakes were baked?", target: "one" }, { id: "s2", text: "How many more must be baked?", target: "two" }, { id: "s3", text: "How many cupcakes on one tray?", target: "one" }, { id: "s4", text: "How many trays would 150 need?", target: "two" }]}
              targets={[
                { id: "one", label: "one step" },
                { id: "two", label: "two steps — something must be found first" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 42"
            text="Huda subtracts: 150 − 108. Salem counts up from 108 to 150. Both reach 42."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Huda's way — multiply then subtract", omml: M.step1, h: 92, quote: "Six 18s is 108, then 150 take away 108." }}
              right={{ name: "Salem's way — count up", omml: M.chain, h: 92, quote: "From 108 I counted up to 150." }}
              same={["Both get 42", "Both use all three numbers", "Both need more than one calculation"]}
              diff={["Huda subtracts, Salem counts up", "Salem never subtracts at all", "Both are easy to check"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The recommendation is drawn, not declared"
            text="Zayd builds only what the class can justify: the middle number found, the chain built, the recommendation shown."
            clue="A defensible plan shows its middle answer.">
            <BoardScreen draw={drawBoard65} height={430}
              caption="The recommendation shows its middle answer." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="A defensible plan shows its middle answer — the council re-checks the step, not just the result."
            clue="The middle step is part of the argument.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "a defensible plan shows its middle answer" }]}
              hand={"draw what you know · find the number that is missing · then answer the question asked"}
              cards={[
                { title: "The middle step", omml: M.step1, note: "not the answer, but the key to it" },
                { title: "Tap for the real answer", omml: M.wrong, revealOmml: M.step2, reveal: true,
                  note: "the question asked how many MORE" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the recommendation"
            text="7 packs of 24 flyers, a need for 200. Show the middle step — then what was asked."
            clue="168 is the middle step. The question asks how many MORE.">
            <ShowWhatYouKnow award={award}
              prompt="A club folds 7 packs of 24 flyers. It needs 200 flyers. How many more are needed?"
              omml={M.swyk}
              options={[{ v: "a", text: "168" }, { v: "b", text: "32" }, { v: "c", text: "176" }, { v: "d", text: "368" }]}
              right="b"
              support={{
                yes: "Yes — 7 × 24 = 168 folded, and 200 − 168 = 32 more are needed.",
                notYet: "Not yet — what did you have to work out before you could answer?",
                draw: drawSupport65, h: 82,
                hint: "168 is the middle step. The question asks how many MORE are needed."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The recommendation is defended"
            text="Omar signs the recommendation: the middle answer shown, the check ready. But the next plan will not cooperate — a tempting path reaches a dead end, and only a new representation saves it."
            artifact="Council board · defensible recommendation"
            next="A plan that would not cooperate — a tempting path reaches a dead end; persistence and a new representation are required.">
            <Closing game={game} omml={M.rule}
              action="Estimate a two-step answer at home before you work it out exactly." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
