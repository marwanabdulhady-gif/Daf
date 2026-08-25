/* ===========================================================================
   Grade 4 · Topic 4 · LESSON 4-7 · Problem Solving: Make Sense and Persevere
   Standard MP.1   I can ... make sense of a multi-step problem, plan the
   steps, and keep going when the first idea does not finish it.
   =========================================================================== */

const M = {
  step1: om(mt("18\u00d724=432")),
  step2: om(mt("432-350=82")),
  wrong: om(mt("18\u00d724-350")),
  plan: om(mnor("what do I know \u00b7 what am I asked \u00b7 what must I find first")),
  compare: om(mt("24\u00d718")),
  swykStep: om(mt("26\u00d715=390")),
  swykAnswer: om(mt("500-390=110"))
};

/* the planning frame filling in */
const makePlan = (picked) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [
    { key: "know", label: "I know", text: "18 crates, 24 bottles in each", col: "#2D70B3" },
    { key: "ask", label: "I am asked", text: "how many are left after 350 are sold", col: "#6042A6" },
    { key: "first", label: "I must find first", text: "the total number of bottles", col: "#FA7E19" },
    { key: "then", label: "Then", text: "subtract the 350 sold", col: "#388C46" }
  ];
  let y = 44;
  rows.forEach(function (r) {
    const on = picked.indexOf(r.key) !== -1;
    ctx.save();
    ctx.globalAlpha = on ? 1 : 0.2;
    D.rr(ctx, 34, y, W - 68, 38, 8);
    ctx.fillStyle = on ? "rgba(234,244,242,.06)" : "rgba(234,244,242,.02)";
    ctx.fill();
    ctx.strokeStyle = on ? r.col : "rgba(234,244,242,.15)";
    ctx.lineWidth = on ? 1.8 : 1;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, r.label, 108, y + 19, { size: 11.5, col: r.col, font: "mono", weight: 700, alpha: on ? 1 : 0.3 });
    D.txt(ctx, on ? r.text : "\u2026", W / 2 + 60, y + 19,
      { size: 13.5, col: "#EAF4F2", font: "marker", alpha: on ? 1 : 0.25 });
    y += 46;
  });
  D.txt(ctx, picked.length === 4 ? "now the plan is complete \u2014 and only now do you calculate"
                                 : "a plan before a calculation",
    W / 2, H - 16, { size: 13.5, col: picked.length === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

/* persevering: the first idea does not finish the job */
const makePersevere = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  if (step === 0) {
    D.strip(ctx, { x: x, y: 78, w: w, h: 44, prog: 1, total: "?",
      parts: [{ v: 350, label: "350 sold", col: "#C74440" }, { v: 82, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "I cannot subtract yet \u2014 I do not know the whole", W / 2, H - 40,
      { size: 14.5, col: "#C74440", font: "marker" });
    D.txt(ctx, "that is not failure, that is the middle step talking", W / 2, H - 16,
      { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  } else if (step === 1) {
    const parts = [];
    for (let k = 0; k < 18; k++) parts.push({ v: 24, label: "", col: "#2D70B3" });
    D.strip(ctx, { x: x, y: 78, w: w, h: 44, prog: 1, total: 432, parts: parts });
    D.txt(ctx, "18 crates \u00d7 24 bottles = 432", W / 2, H - 40,
      { size: 15, col: "#34D399", font: "marker" });
    D.txt(ctx, "now I know the whole", W / 2, H - 16,
      { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
  } else {
    D.strip(ctx, { x: x, y: 78, w: w, h: 44, prog: 1, total: 432,
      parts: [{ v: 350, label: "350 sold", col: "#C74440" }, { v: 82, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "432 \u2212 350 = 82 bottles left", W / 2, H - 40,
      { size: 16, col: "#34D399", font: "marker" });
    D.txt(ctx, "the middle answer unlocked the question", W / 2, H - 16,
      { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
  }
};

const drawDepot = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the water depot", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      const a = D.at(p2, (r * 6 + c) / 18, (r * 6 + c) / 18 + 0.4);
      if (a <= 0) continue;
      ctx.save();
      ctx.globalAlpha = a * 0.85;
      D.rr(ctx, 76 + c * ((W - 180) / 6), 48 + r * 44, (W - 200) / 6, 34, 6);
      ctx.fillStyle = "#2D70B3"; ctx.globalAlpha = a * 0.22; ctx.fill();
      ctx.globalAlpha = a; ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();
      D.txt(ctx, "24", 76 + c * ((W - 180) / 6) + (W - 200) / 12, 68 + r * 44,
        { size: 12, col: "#EAF4F2", font: "marker", alpha: a });
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "18 crates \u00b7 24 bottles each \u00b7 350 sold", W / 2, 194,
      { size: 13.5, col: "rgba(234,244,242,.78)", font: "marker", alpha: p3 });
    D.txt(ctx, "what could you ask?", W / 2, H - 16,
      { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard47 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "When the first step is not the answer" });
  const stages = [
    { p: [20, 170], label: "I know", text: "18 crates of 24, and 350 sold", col: "#2D70B3" },
    { p: [180, 330], label: "I am asked", text: "how many are left", col: "#6042A6" },
    { p: [340, 490], label: "First", text: "18 \u00d7 24 = 432", col: "#FA7E19" },
    { p: [500, 650], label: "Then", text: "432 \u2212 350 = 82", col: "#388C46" }
  ];
  let y = 104;
  stages.forEach(function (s) {
    const a = D.at(f, s.p[0], s.p[1]);
    if (a <= 0) { y += 72; return; }
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, 78, y - 22, W - 156, 52, 9);
    ctx.strokeStyle = s.col; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, s.label, 140, y + 3, { size: 12.5, col: s.col, font: "mono", weight: 700, alpha: a });
    D.txt(ctx, s.text, W / 2 + 70, y + 3, { size: 15, col: "#EAF4F2", font: "marker", alpha: a });
    if (y > 104) D.marker(ctx, [[W / 2, y - 44], [W / 2, y - 26]], a, "rgba(201,162,39,.6)", 2);
    y += 72;
  });
  const p4 = D.at(f, 660, 780);
  if (p4 > 0) {
    D.txt(ctx, "a first answer that is not THE answer is progress, not a mistake",
      W / 2, H - 34, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 46, H - 36, 16, D.at(f, 700, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport47 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 30, w: W - 48, h: 38, prog: 1, total: 500,
    parts: [{ v: 390, label: "26 \u00d7 15 = 390", col: "#12857C" }, { v: 110, label: "?", col: "#C9A227" }] });
};


/* Critique: the depot manager's polished plan, with a hidden gap */
const makeJammed = (found, onFound) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onFound) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onFound(!found) });
  D.txt(ctx, "the depot manager's plan for the lift", W / 2, 26, { size: 13, col: "#2D70B3", font: "marker" });
  const lines = [
    { t: "the lift moves crates of 24 bottles", ok: true },
    { t: "18 crates × 24 = 432 bottles", ok: true },
    { t: "350 sold = 14 full crates, so 432 − 336 = 96 left", ok: false }
  ];
  let y = 62;
  lines.forEach((l) => {
    const flagged = found && !l.ok;
    ctx.save();
    D.rr(ctx, 30, y - 15, W - 60, 34, 7);
    ctx.fillStyle = flagged ? "rgba(199,68,64,.18)" : "rgba(234,244,242,.04)";
    ctx.fill();
    if (flagged) { ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    D.txt(ctx, l.t, W / 2, y + 2, { size: 12.5, col: flagged ? "#C74440" : "#EAF4F2", font: "marker" });
    y += 42;
  });
  D.txt(ctx, found ? "350 bottles is not a whole number of crates — count bottles, not crates"
                   : "polished — but which line has no evidence behind it?",
    W / 2, H - 18, { size: 12.5, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

/* Revision: choose the step that unjams the plan */
const makeUnjam = (pick, onPick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onPick) D.tap(ctx, { x: 56, y: 40, w: W - 112, h: 110, value: 0, on: (v, tx) => {
    const opts = [W / 2 - 150, W / 2, W / 2 + 150];
    let best = 0, bd = Infinity;
    opts.forEach((x, i) => { const d = Math.abs(x - tx); if (d < bd) { bd = d; best = i; } });
    onPick(best);
  }});
  const opts = ["432 − 350", "432 − 336", "350 − 336"];
  opts.forEach((o, i) => {
    const x = W / 2 + (i - 1) * 150;
    const chosen = pick === i;
    ctx.save();
    D.rr(ctx, x - 62, 44, 124, 34, 8);
    ctx.fillStyle = chosen ? (i === 0 ? "rgba(18,133,124,.25)" : "rgba(199,68,64,.18)") : "rgba(234,244,242,.05)";
    ctx.fill();
    ctx.strokeStyle = chosen ? (i === 0 ? "#12857C" : "#C74440") : "rgba(234,244,242,.3)";
    ctx.lineWidth = chosen ? 2 : 1; ctx.stroke();
    ctx.restore();
    D.txt(ctx, o, x, 61, { size: 13, col: chosen ? (i === 0 ? "#34D399" : "#C74440") : "#EAF4F2", font: "mono", weight: 700 });
  });
  D.txt(ctx, "step 1 held: 18 × 24 = 432 bottles", W / 2, 108, { size: 13.5, col: "#34D399", font: "marker" });
  if (pick === 0) {
    D.txt(ctx, "step 2: 432 − 350 = 82 bottles left", W / 2, 146, { size: 15, col: "#34D399", font: "marker" });
    D.txt(ctx, "the unjammed plan — bottles, not crates", W / 2, H - 18,
      { size: 13, col: "#C9A227", font: "marker" });
  } else if (pick > 0) {
    D.txt(ctx, pick === 1 ? "that subtracts 14 crates' worth — but 350 is not 14 crates"
                          : "that is only the extra bottles in the last crate",
      W / 2, 150, { size: 13.5, col: "#C74440", font: "marker" });
    D.txt(ctx, "which step takes all 350 bottles from the 432?", W / 2, H - 18,
      { size: 13, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, "the second step is still jammed — choose it", W / 2, 150,
      { size: 13.5, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

const LESSON = {
  code: "4-7",
  storageKey: "daf-g4-t4-l7",
  title: "Problem Solving: Make Sense and Persevere",
  unit: "GRADE 4 · TOPIC 4 · LESSON 4-7 · MP.1",
  math: M,
  ixl: ["RM5"],

  metas: [
    { phase: "warmup", title: "The <em>jammed lift</em>",
      lead: "The water depot: 18 crates of 24 bottles, 350 sold — and the lift, jammed midway, holding the morning's plan.",
      goal: "Notice the three numbers — and that only two of them belong in the first step.",
      pull: "Three numbers, and only two of them belong in the first step.",
      rail: { launch: "Fictional frame. Read the depot — no working yet.",
        monitor: ["Counting the crates", "Reading the 350 sold", "Wonding which number comes first"],
        connect: "Which two numbers meet in the first step?",
        misconception: "Subtracting 350 from 24 by reflex." } },

    { phase: "launch", title: "About how many <em>bottles</em> altogether?",
      lead: "18 × 24. Lock the estimate before the plan is written.",
      goal: "Estimate before planning — the estimate carries the decision.",
      pull: "The depot counts are simulated — the planning works on any numbers.",
      rail: { launch: "Give the estimate and what you rounded.",
        monitor: ["Rounding 18 to 20", "Rounding 24 to 20", "Multiplying the rounds"],
        connect: "What will the middle answer be near?",
        misconception: "Estimating the final answer before the middle step." } },

    { phase: "monitor", title: "Zayd writes the <em>plan</em> before the calculation",
      lead: "I know · I am asked · I must find first · then. A plan before a calculation.",
      goal: "Plan the two steps before touching a number.",
      pull: "A plan before a calculation.",
      rail: { launch: "Before each line: is it a fact, a question, or a step?",
        monitor: ["Naming what is known", "Naming what is asked", "Naming the middle step"],
        connect: "Why must the total come before the subtraction?",
        misconception: "Starting to calculate before the plan is complete." } },

    { phase: "monitor", title: "The first idea <em>does not finish</em> the job",
      lead: "350 sold — but I cannot subtract yet: I do not know the whole. That is not failure; that is the middle step talking.",
      goal: "Persevere: a first answer that is not the answer is progress, not a mistake.",
      pull: "That is not failure — that is the middle step talking.",
      rail: { launch: "Name the number that is missing before the subtraction.",
        monitor: ["Seeing the gap", "Finding the middle step", "Returning to the total"],
        connect: "What unlocked the question?",
        misconception: "Guessing the total because the first step felt stuck." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Four questions from the depot. Each one needs one step — or two.",
      goal: "Recognise the hidden middle step before modelling.",
      pull: "Do I already know every number I need?",
      rail: { launch: "Say the middle answer before you place the question.",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Noura works in <em>bottles</em>. Yasir works in <em>crates</em>",
      lead: "Noura: total first, then take away 350. Yasir: how many crates is 350 first. Both reach 82.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the bottle route", "Following the crate route", "Checking both reach 82"],
        connect: "Which plan is simpler to write down?",
        misconception: "Believing one route is the only route." } },

    { phase: "monitor", title: "The plan's <em>hidden gap</em>",
      lead: "The depot manager's polished plan: 350 sold is 14 full crates, so 432 − 336 = 96 left. One line has no evidence.",
      goal: "Critique a polished plan: find the step that does not follow.",
      pull: "350 bottles is not a whole number of crates.",
      rail: { launch: "Each line must follow from the line before it.",
        monitor: ["Checking the total line", "Checking the crate conversion", "Flagging the 96 claim"],
        connect: "What did the plan pretend 350 bottles were?",
        misconception: "Accepting the final line because the plan is polished." } },

    { phase: "monitor", title: "Unjam the <em>plan</em>",
      lead: "The total held: 432 bottles. Now choose the step that takes all 350 bottles from it.",
      goal: "Revise the plan by supplying the correct step.",
      pull: "Count bottles, not crates.",
      rail: { launch: "What does each candidate step actually subtract?",
        monitor: ["Reading 432 − 350", "Discarding 432 − 336", "Discarding 350 − 336"],
        connect: "How do you know the unjammed plan now holds?",
        misconception: "Choosing the step that uses the most familiar numbers." } },

    { phase: "synth", title: "On the <em>board</em>: when the first step is not the answer",
      lead: "I know · I am asked · First · Then. A first answer that is not the answer is progress, not a mistake.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stage", "Naming the middle answer", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Stopping at the first calculable number." } },

    { phase: "synth", title: "Small actions make <em>machines</em>",
      lead: "The rule goes into the plan — and the window reminds the class how big systems are built from small, understood actions.",
      goal: "Connect the lesson to the history of useful knowledge behind the lift.",
      pull: "A plan you can re-check is a plan people can trust.",
      rail: { launch: "Read the window as history of a method, not a story about people's faith.",
        monitor: ["Connecting partial products to small actions", "Asking about the sources", "Testing the rule on their own work"],
        connect: "Where in your own life do small understood parts combine?",
        misconception: "Reading the window as an invention claim." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "26 boxes of 15 pens, an order for 500. How many more are needed?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write the plan before the calculation.",
        monitor: ["Naming the middle step", "Multiplying 26 × 15", "Subtracting from 500"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 390 — the middle step instead of what was asked." } },

    { phase: "monitor", title: "The lift asks for <em>perseverance</em>",
      lead: "Before the morning plan is signed, the class says what the jam taught it.",
      goal: "Close the chapter on the standard, not the score.",
      pull: "A first answer that is not the answer is progress, not a mistake.",
      rail: { launch: "Ask for the rule in students' own words before the plan is signed.",
        monitor: ["Naming the middle step", "Naming the revision", "Saying 'progress' unprompted"],
        connect: "What would you refuse to sign, and why?",
        misconception: "Treating a stuck step as a failure." } },

    { phase: "connect", title: "The morning is <em>planned</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next chapter: production is complete — the crates now need equal delivery loads and leftovers.",
      rail: { launch: "Ask three students how they would unjam a plan.",
        monitor: ["Able to explain the plan", "Still stops at the stuck step", "Ready for division"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [picked, setPicked] = useState([]);
    const [step, setStep] = useState(0);
    const [gap, setGap] = useState(false);
    const [pick, setPick] = useState(-1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The jammed lift"
            text="The water depot: 18 crates of 24 bottles, 350 sold — and the lift, jammed midway, holding the morning's plan."
            clue="Three numbers, and only two belong in the first step.">
            <NoticeWonder draw={drawDepot} height={256} award={award}
              notices={["There are 18 crates", "Each holds 24", "350 have been sold", "There are three numbers"]}
              wonders={["How many are left?", "Do I multiply or subtract?", "Which number comes first?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the plan"
            text="Omar asks for the estimate before the plan is written — 18 × 24, rounded at a friendly place."
            clue="Three numbers, and only two of them belong in the first step.">
            <LaunchEstimate draw={drawDepot} height={256} award={award}
              label="About how many bottles altogether?" min={200} max={700} start={430} unit="bottles"
              after="Locked. Now let us plan before we calculate."
              note="The depot counts are simulated — the planning works on any numbers." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd writes the plan first"
            text="He can light each line of the plan — the class must name what each line is before it lights."
            clue="A plan before a calculation">
            <ExploreChips draw={makePlan(picked)} height={258}
              label="Complete the plan"
              value={picked.length}
              onPick={(v) => {
                const keys = ["know", "ask", "first", "then"];
                setPicked(keys.slice(0, v));
              }}
              chips={[{ v: 0, label: "start" }, { v: 1, label: "I know" }, { v: 2, label: "I am asked" }, { v: 3, label: "find first" }, { v: 4, label: "then" }]}
              caption={<MathEl omml={M.plan} size="lg" display="block" />}
              footnote="Now the plan is complete — and only now do you calculate." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The first idea does not finish the job"
            text="350 sold — but the subtraction is stuck: the whole is not known yet. Zayd steps through the middle answer."
            clue="That is not failure — that is the middle step talking">
            <ExploreChips draw={makePersevere(step)} height={256}
              label="Step through the stuck plan"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "stuck" }, { v: 1, label: "the middle answer" }, { v: 2, label: "the question" }]}
              caption={<MathEl omml={M.step1} size="lg" display="block" />}
              footnote="The middle answer unlocked the question." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="One step or two?"
            text="Omar and Zayd lay four questions from the depot on the table. Each one needs one step — or two."
            clue="Do I already know every number I need?">
            <CardSort award={award} columns={2} commitLabel="Sort the questions"
              items={[
                { id: "p1", text: "How many bottles altogether?", target: "one" },
                { id: "p2", text: "How many are left after 350 are sold?", target: "two" },
                { id: "p3", text: "How many bottles in 5 crates?", target: "one" },
                { id: "p4", text: "How many full crates were sold?", target: "two" }
              ]}
              targets={[
                { id: "one", label: "one step" },
                { id: "two", label: "two steps — something must be found first" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 82"
            text="Noura works in bottles. Yasir works in crates. Both reach 82 — Yasir's first step has a remainder to think about."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Noura's plan — bottles", omml: M.step2, h: 92,
                      quote: "Total first, then take away the 350." }}
              right={{ name: "Yasir's plan — crates", omml: M.compare, h: 92,
                       quote: "I worked out how many crates 350 bottles is first." }}
              same={["Both reach 82", "Both need two steps", "Both use all three numbers"]}
              diff={["Noura works in bottles, Yasir in crates",
                     "Yasir's first step has a remainder to think about",
                     "Noura's plan is simpler to write down"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The plan's hidden gap"
            text="The depot manager presents: 350 sold is 14 full crates, so 432 − 336 = 96 left. Omar reads it line by line — one step has no evidence."
            clue="350 bottles is not a whole number of crates">
            <ExploreChips draw={makeJammed(gap, setGap)} height={252}
              label="Does the polished plan hold?"
              value={gap ? 1 : 0}
              onPick={(v) => setGap(v === 1)}
              chips={[{ v: 0, label: "no gap — it is polished" }, { v: 1, label: "the gap is the crate count" }]}
              caption={<MathEl omml={M.step1} size="lg" display="block" />}
              footnote="A polished plan can still hide a faulty step." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar unjams the plan"
            text="The total held: 432 bottles. Now choose the step that takes all 350 bottles from it — and the unjammed plan appears."
            clue="Count bottles, not crates">
            <ExploreChips draw={makeUnjam(pick, setPick)} height={252}
              label="Choose the missing second step"
              value={pick}
              onPick={(v) => setPick(v)}
              chips={[{ v: 0, label: "432 − 350" }, { v: 1, label: "432 − 336" }, { v: 2, label: "350 − 336" }]}
              caption={<MathEl omml={M.step2} size="lg" display="block" />}
              footnote="The unjammed plan holds when every step follows from the one before." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The plan is drawn, not declared"
            text="Zayd builds only what the class can justify: the stages in order, the middle answer named, the question answered."
            clue="A first answer that is not the answer is progress, not a mistake">
            <BoardScreen draw={drawBoard47} height={430}
              caption="When the first step is not the answer." />
          </StoryShell>
        );

      case 9:
        return (
          <STEMWindow window={STORY && STORY.stemWindows && STORY.stemWindows[0]}>
            <RuleScreen award={award}
              ommls={[{ omml: M.plan, alt: "what do I know · what am I asked · what must I find first" }]}
              hand={"name what you know · name what you are asked · find the middle step · then calculate"}
              cards={[
                { title: "The plan we defended", omml: M.step2, note: "432 − 350 = 82" },
                { title: "Tap to see the middle step", omml: M.compare, revealOmml: M.step1, reveal: true,
                  note: "the middle answer is part of the argument" }
              ]} />
          </STEMWindow>
        );

      case 10:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs a two-step he can defend"
            text="26 boxes of 15 pens, an order for 500. Write the plan — then both steps, in order."
            clue="390 is the middle step — 110 is the answer">
            <ShowWhatYouKnow award={award}
              prompt="A shop has 26 boxes of 15 pens. It needs 500 pens for an order. How many more are needed?"
              omml={M.swykStep}
              options={[{ v: "a", text: "390" }, { v: "b", text: "110" }, { v: "c", text: "890" }, { v: "d", text: "474" }]}
              right="b"
              support={{
                yes: "Yes — 26 × 15 = 390, then 500 − 390 = 110.",
                notYet: "Not yet — 390 is the middle step. What was actually asked?",
                draw: drawSupport47, h: 82,
                hint: "The question asks how many MORE are needed, not how many there are."
              }} />
          </StoryShell>
        );

      case 11:
        return (
          <AmanahWindow window={STORY && STORY.amanahWindows && STORY.amanahWindows[0]}>
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#10242B", marginBottom: "14px" }}>Perseverance</div>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#10242B", maxWidth: "520px", margin: "0 auto 10px" }}>
                The jammed lift taught the class that a stuck step is not a stopped plan. The early believers were known for their perseverance through difficulty, and Bilal ibn Rabah's steady service is remembered among them.
              </p>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5B6B70", maxWidth: "520px", margin: "0 auto" }}>
                Perseverance means staying with the question until every step of the answer has evidence behind it.
              </p>
            </div>
          </AmanahWindow>
        );

      case 12:
        return (
          <StoryHandoff
            title="The morning is planned"
            text="Omar signs the unjammed plan. Production is complete — but equal delivery loads and leftover pieces must now be planned. The crates lead directly to division."
            artifact="Depot plan · unjammed and signed"
            next="Production is complete, but equal delivery loads and leftover pieces must now be planned. The crates lead directly to division.">
            <Closing game={game} omml={M.plan}
              action="Plan a real two-step problem tonight: write what you know, what you are asked, and the middle step." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
