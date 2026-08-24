/* ===========================================================================
   Grade 4 · Topic 6 · LESSON 6-5 · Solve Multi-Step Problems
   Standard 4.OA.A.3   I can ... solve a multi-step problem and decide
   whether my answer is reasonable.
   =========================================================================== */

const M = {
  step1: om(mt("3×28=84")),
  step2: om(mt("150-108=42")),
  chain: om(mt("3×28=84"), mnor(", then "), mt("150-108=42")),
  hidden: om(mnor("the number baked was never worked out")),
  wrong: om(mt("150-18=132")),
  rule: om(mnor("@RULE@")),
  swyk: om(mt("4×39=156")),
  swykAnswer: om(mt("200-168=32"))
};

/* the diagram growing one step at a time */
const makeChain65 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  D.strip(ctx, { x: x, y: 58, w: w * 0.72, h: 42, prog: step >= 1 ? 1 : 0.001,
    total: step >= 1 ? 108 : "?", parts: [{ v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }] });
  if (step >= 1) D.txt(ctx, "step 1: 3×28=84", W / 2, 124, { size: 14.5, col: "#34D399", font: "marker" });
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
  D.txt(ctx, found ? "140 − 28 uses one box, not three" : "which number do you not actually have yet?",
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
    D.txt(ctx, "3 boxes of 28 shirts · 140 shirts in stock", W / 2, 192, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many more must be baked?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard65 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Is the answer reasonable?" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 620), p4 = D.at(f, 620, 770);
  const x = 96, w = W - 192;
  D.strip(ctx, { x: x, y: 112, w: w * 0.72, h: 44, prog: p1, total: p2 > 0 ? 108 : "?", parts: [{ v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }, { v: 18, label: "18", col: "#2D70B3" }] });
  if (p2 > 0) D.txt(ctx, "3×28=84", W / 2, 198, { size: 19, col: "#34D399", font: "marker", alpha: p2 });
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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two bars, and a question mark. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "There is a number here you do not have yet.",
      rail: { launch: "I am not asking for an answer. Just describe the two bars.",
        monitor: ["Reading the known numbers", "Spotting the question mark", "Comparing the lengths"],
        connect: "Who noticed something nobody else did?",
        misconception: "Assuming every number in the picture is given." } },

    { phase: "launch", title: "Six trays, <em>one hundred and fifty ordered</em>",
      lead: "6 trays of 18 cupcakes are baked. 150 were ordered. Estimate how many more are needed.",
      goal: "Create the need — the question needs a number nobody gave you.",
      pull: "Estimate first, then find the missing middle.",
      rail: { launch: "Try to answer it in one step. What stops you?",
        monitor: ["Getting stuck", "Finding the middle number", "Guessing"],
        connect: "Which number did you have to work out first?",
        misconception: "Subtracting 18 once instead of six times." } },

    { phase: "monitor", title: "Build it in <em>two steps</em>",
      lead: "Find how many are baked first. Only then can you see the shortfall.",
      goal: "Multi-step problems chain two diagrams together.",
      pull: "Some working looks right and still misses a step.",
      rail: { launch: "Predict the middle number before you tap.",
        monitor: ["Finding the middle first", "Skipping to the end", "Checking against an estimate"],
        connect: "Why can the second step not come first?",
        misconception: "Subtracting before multiplying." } },

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
      lead: "Huda multiplied then subtracted. Salem counted up from 108 to 150. Both got 42.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following one route", "Following the other", "Checking both agree"],
        connect: "Why do both routes work?",
        misconception: "Believing there is only one correct order." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Draw the six trays. Total them. Then draw the order and find the gap.",
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
        misconception: "Answering 156 — the number packed, not the number left." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: making sense of a problem when no method is obvious.",
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
        return <NoticeWonder draw={drawStory65} height={256} award={award}
          notices={["There are six equal trays", "One bar is much longer", "There is a question mark", "150 is the order"]}
          wonders={["How many were baked?", "How many more are needed?", "Is my answer sensible?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory65} height={256} award={award}
          label="About how many more are needed?" min={10} max={150} start={42} unit="cupcakes"
          after="Locked. Now let us find the number nobody gave us."
          note="You are given 3, 28 and 140 — but not the number you actually need." />;

      case 2:
        return <ExploreChips draw={makeChain65(step)} height={266}
          label="How many more must be baked?"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
          caption={<MathEl omml={M.chain} size="lg" display="block" />}
          footnote="The answer to step 1 becomes a number you need in step 2." />;

      case 3:
        return (
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
        );

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "s1", text: "How many cupcakes were baked?", target: "one" }, { id: "s2", text: "How many more must be baked?", target: "two" }, { id: "s3", text: "How many cupcakes on one tray?", target: "one" }, { id: "s4", text: "How many trays would 150 need?", target: "two" }]}
          targets={[
            { id: "one", label: "one step" },
            { id: "two", label: "two steps — something must be found first" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Huda's way — multiply then subtract", omml: M.step1, h: 92, quote: "Six 18s is 108, then 150 take away 108." }}
          right={{ name: "Salem's way — count up", omml: M.chain, h: 92, quote: "From 108 I counted up to 150." }}
          same={["Both get 42", "Both use all three numbers", "Both need more than one calculation"]}
          diff={["Huda subtracts, Salem counts up", "Salem never subtracts at all", "Both are easy to check"]} />;

      case 6:
        return <BoardScreen draw={drawBoard65} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "@RULE@" }]}
          hand={"draw what you know · find the number that is missing · then answer the question asked"}
          cards={[
            { title: "The middle step", omml: M.step1, note: "not the answer, but the key to it" },
            { title: "Tap for the real answer", omml: M.wrong, revealOmml: M.step2, reveal: true,
              note: "the question asked what is LEFT" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A club folds 7 packs of 24 flyers. It needs 200 flyers. How many more are needed?"
          omml={M.swyk}
          options={[{ v: "a", text: "168" }, { v: "b", text: "32" }, { v: "c", text: "176" }, { v: "d", text: "368" }]}
          right="b"
          support={{
            yes: "Yes — 4 × 39 = 156 packed, and 200 − 156 = 44 left.",
            notYet: "Not yet — what did you have to work out before you could answer?",
            draw: drawSupport65, h: 82,
            hint: "168 is the middle step. The question asks how many MORE are needed."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Estimate a two-step answer at home before you work it out exactly." />;

      default: return null;
    }
  }
};
