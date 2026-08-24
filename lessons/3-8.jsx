/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-8 · Problem Solving: Model with Math
   Standard MP.4   I can ... draw a bar diagram for a multiplication problem
   and write the equation that matches it.
   =========================================================================== */

const M = {
  equal: om(mt("6\u00d7145=870")),
  compare: om(mt("4\u00d7128=512")),
  twoStep: om(mt("6\u00d7145=870"), mnor(", then "), mt("1,000-870=130")),
  unknown: om(mnor("the unknown goes where the question is")),
  swykStep: om(mt("7\u00d7186=1,302")),
  swykAnswer: om(mt("1,500-1,302=198"))
};

const makeBar = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  if (kind === "equal") {
    const parts = [];
    for (let k = 0; k < 6; k++) parts.push({ v: 145, label: "145", col: "#2D70B3" });
    D.strip(ctx, { x: x, y: 78, w: w, h: 46, prog: 1, total: "?", parts: parts });
    D.txt(ctx, "6 equal groups of 145 — the total is missing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "multiply", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  } else if (kind === "compare") {
    D.strip(ctx, { x: x, y: 60, w: w * 0.25, h: 38, prog: 1,
      parts: [{ v: 128, label: "128", col: "#FA7E19", sub: "Layla" }] });
    D.strip(ctx, { x: x, y: 124, w: w, h: 38, prog: 1,
      parts: [{ v: 128, label: "128", col: "#2D70B3" }, { v: 128, label: "128", col: "#2D70B3" },
              { v: 128, label: "128", col: "#2D70B3" }, { v: 128, label: "?", col: "#2D70B3" }] });
    D.txt(ctx, "4 times as many — the bigger amount is missing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "multiply", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.strip(ctx, { x: x, y: 60, w: w, h: 42, prog: 1, total: 1000,
      parts: [{ v: 870, label: "6 × 145", col: "#12857C" }, { v: 130, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "the total is known, one part is missing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "multiply, then subtract", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  }
};

const makeSteps = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  const parts = [];
  for (let k = 0; k < 6; k++) parts.push({ v: 145, label: "145", col: "#2D70B3" });
  D.strip(ctx, { x: x, y: 62, w: w * 0.87, h: 40, prog: step >= 1 ? 1 : 0.001, total: step >= 1 ? 870 : null, parts: parts });
  if (step >= 1) D.txt(ctx, "step 1: 6 × 145 = 870", W / 2, 130, { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 168, w: w, h: 40, prog: 1, total: 1000,
      parts: [{ v: 870, label: "870 packed", col: "#12857C" }, { v: 130, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "step 2: 1,000 − 870 = 130", W / 2, 238, { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "130 books still to pack" : "one step will not answer the question",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

const drawWarehouse = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 330), p3 = D.at(f, 340, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "packing books for the book fair", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let b = 0; b < 6; b++) {
    const a = D.at(p2, b / 6, b / 6 + 0.4);
    if (a <= 0) continue;
    const bx = 44 + b * ((W - 100) / 6);
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, bx, 56, (W - 130) / 6, 52, 7);
    ctx.fillStyle = "#2D70B3"; ctx.globalAlpha = a * 0.22; ctx.fill();
    ctx.globalAlpha = a; ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "145", bx + (W - 130) / 12, 84, { size: 14, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "6 boxes of 145 · the order is for 1,000", W / 2, 140,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: p3 });
    D.txt(ctx, "what could you ask?", W / 2, H - 18,
      { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard38 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Draw it, then write it" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 210, 380), p3 = D.at(f, 390, 560), p4 = D.at(f, 560, 720);
  const parts = [];
  for (let k = 0; k < 6; k++) parts.push({ v: 145, label: "145", col: "#2D70B3" });
  D.strip(ctx, { x: 92, y: 112, w: (W - 184) * 0.87, h: 44, prog: p1, total: p2 > 0 ? 870 : "?", parts: parts });
  if (p2 > 0) D.txt(ctx, "6 × 145 = 870", W / 2, 200, { size: 18, col: "#34D399", font: "marker", alpha: p2 });
  if (p3 > 0) {
    D.strip(ctx, { x: 92, y: 236, w: W - 184, h: 44, prog: p3, total: 1000,
      parts: [{ v: 870, label: "870", col: "#12857C" }, { v: 130, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "1,000 − 870 = 130", W / 2, 318, { size: 18, col: "#34D399", font: "marker", alpha: D.at(f, 440, 530) });
  }
  if (p4 > 0) {
    const yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the bar shows the relationship — the equation just writes it down",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 600, 690) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 640, 740), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport38 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 30, w: W - 48, h: 38, prog: 1, total: 1500,
    parts: [{ v: 1302, label: "7 × 186 = 1,302", col: "#12857C" }, { v: 198, label: "?", col: "#C9A227" }] });
};

const LESSON = {
  code: "3-8",
  storageKey: "daf-g4-t3-l8",
  title: "Problem Solving: Model with Math",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-8 · MP.4",
  math: M,
  ixl: ["TFH"],

  metas: [
    { phase: "warmup", title: "Which bar <em>doesn't belong</em>?",
      lead: "Three diagrams for multiplication problems. Every one has a reason.",
      goal: "Reasoning before answers — no card is wrong.",
      pull: "Where the question mark sits changes everything.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reasoning from the unknown", "Reasoning from the number of bars", "Reasoning from the operation"],
        connect: "Can every card be the odd one out?",
        misconception: "Choosing the operation from a key word instead of the structure." } },

    { phase: "launch", title: "Six boxes, <em>one order</em>",
      lead: "6 boxes hold 145 books each. The order is for 1,000. What could you ask?",
      goal: "Create the need — numbers alone do not say what to do.",
      pull: "Estimate an answer to your own question first.",
      rail: { launch: "Do not solve anything. Just tell me a question these numbers could answer.",
        monitor: ["Asking for the total", "Asking how many are missing", "Asking how many more boxes"],
        connect: "Which question needs two steps?",
        misconception: "Assuming there is only one possible question." } },

    { phase: "monitor", title: "Draw what you <em>know</em>",
      lead: "Equal groups, a comparison, or a missing part. Pick the shape that fits.",
      goal: "The diagram names the operation.",
      pull: "Some questions need two bars, not one.",
      rail: { launch: "Predict where the question mark will sit before you tap.",
        monitor: ["Placing the unknown correctly", "Drawing equal groups", "Confusing compare with total"],
        connect: "Where is the unknown in each one?",
        misconception: "Drawing one bar for a comparison problem." } },

    { phase: "monitor", title: "A problem in <em>two steps</em>",
      lead: "How many are still to pack? You cannot answer that in one move.",
      goal: "Multi-step problems chain two diagrams.",
      pull: "Sort some questions by how many steps they need.",
      rail: { launch: "What must you work out before you can answer?",
        monitor: ["Multiplying first", "Subtracting first", "Trying one step"],
        connect: "Why can the second step not come first?",
        misconception: "Subtracting 145 from 1,000 and stopping." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Sort each question. No grading until the class commits.",
      goal: "Recognise a hidden middle step.",
      pull: "Two students wrote different equations for the same problem.",
      rail: { launch: "Ask yourself: do I already know every number I need?",
        monitor: ["Counting the unknowns", "Checking what is given", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers rather than the unknowns." } },

    { phase: "connect", title: "Two <em>equations</em>, one problem",
      lead: "Fatima wrote 6 × 145 = b. Hamza wrote 1,000 − 6 × 145 = b. Both are right.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Writing the first step only", "Writing both steps in one line", "Using a letter for the unknown"],
        connect: "What is b standing for in each equation?",
        misconception: "Using the same letter for two different unknowns." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Draw the bar. Find the question mark. Then write the equation that says the same thing.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next bar", "Naming the unknown", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Writing the equation before drawing anything." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the unknown", "Testing on a new problem", "Asking about three-step problems"],
        connect: "Does the bar still help when there are three steps?",
        misconception: "Treating the bar as decoration rather than a decision tool." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the bar before you calculate.",
        monitor: ["Drawing first", "Finding the middle step", "Checking against an estimate"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering with the number packed instead of the number left." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next topic: multiplying by two-digit numbers.",
      rail: { launch: "Ask three students how they decide which operation to use.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready for Topic 4"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("equal");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Three bar diagrams. Which one doesn't belong?"
          cards={[
            { id: "a", draw: makeBar("equal"), h: 112, why: "Equal groups with the total missing — multiply" },
            { id: "b", draw: makeBar("compare"), h: 112, why: "The only one with two separate bars, comparing" },
            { id: "c", draw: makeBar("part"), h: 112, why: "The total is known and a part is missing — subtract" },
            { id: "d", text: "6 and 145", why: "The only card with no diagram at all" }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawWarehouse} height={256} award={award}
          label="About how many books are in the 6 boxes?" min={500} max={1200} start={870} unit="books"
          after="Locked. Now decide what your question actually needs."
          note="The order is for 1,000. That number is going to matter." />;

      case 2:
        return <ExploreChips draw={makeBar(kind)} height={254}
          label="Choose the diagram that fits"
          value={kind}
          onPick={(v) => setKind(v)}
          chips={[{ v: "equal", label: "equal groups" }, { v: "compare", label: "times as many" }, { v: "part", label: "part missing" }]}
          caption={<MathEl omml={M.unknown} size="lg" display="block" />}
          footnote="Where the question mark sits tells you which operation you need." />;

      case 3:
        return <ExploreChips draw={makeSteps(step)} height={266}
          label="How many are still to pack?"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
          caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
          footnote="The answer to step 1 becomes a number you need in step 2." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "q1", text: "How many books in 6 boxes?", target: "one" },
            { id: "q2", text: "Layla read 4 times as many as 128", target: "one" },
            { id: "q3", text: "How many are still to pack?", target: "two" },
            { id: "q4", text: "How many more boxes are needed?", target: "two" }
          ]}
          targets={[
            { id: "one", label: "one step" },
            { id: "two", label: "two steps — something must be worked out first" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Fatima's way — one step at a time", omml: M.equal, h: 92,
                  quote: "First I find the total, then I write a second equation." }}
          right={{ name: "Hamza's way — one equation", omml: M.twoStep, h: 92,
                   quote: "I put the whole thing in one line." }}
          same={["Both reach 130", "Both multiply then subtract", "Both use a letter for the unknown"]}
          diff={["Fatima writes two equations", "Hamza's is shorter but harder to read",
                 "Fatima's shows the middle answer"]} />;

      case 6:
        return <BoardScreen draw={drawBoard38} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.unknown, alt: "the unknown goes where the question is" }]}
          hand={"draw the bar \u00b7 mark the unknown \u00b7 write the equation that says the same thing"}
          cards={[
            { title: "The total we found", omml: M.equal, note: "6 equal groups of 145" },
            { title: "Tap to see the second step", omml: M.compare, revealOmml: M.twoStep, reveal: true,
              note: "step 1 feeds step 2" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A school packs 7 crates of 186 pens. The order is for 1,500 pens. How many are still needed?"
          omml={M.swykStep}
          options={[{ v: "a", text: "1,302" }, { v: "b", text: "198" }, { v: "c", text: "288" }, { v: "d", text: "1,314" }]}
          right="b"
          support={{
            yes: "Yes \u2014 7 \u00d7 186 = 1,302, then 1,500 \u2212 1,302 = 198.",
            notYet: "Not yet \u2014 what do you have to work out before you can answer?",
            draw: drawSupport38, h: 82,
            hint: "The question asks how many are STILL NEEDED, not how many are packed."
          }} />;

      case 9:
        return <Closing game={game} omml={M.unknown}
          action="Find a real multiplication at home \u2014 packs, rows, prices \u2014 and draw its bar before you solve it." />;

      default: return null;
    }
  }
};
