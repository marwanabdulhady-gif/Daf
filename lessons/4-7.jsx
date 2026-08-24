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

const LESSON = {
  code: "4-7",
  storageKey: "daf-g4-t4-l7",
  title: "Problem Solving: Make Sense and Persevere",
  unit: "GRADE 4 · TOPIC 4 · LESSON 4-7 · MP.1",
  math: M,
  ixl: ["RM5"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Crates of bottles, and a number that has already been sold. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "There are three numbers here. Not all of them go in the first step.",
      rail: { launch: "I am not asking you to solve anything. What do you see?",
        monitor: ["Counting the crates", "Noticing the 350", "Asking what the question is"],
        connect: "Who noticed something nobody else did?",
        misconception: "Assuming all three numbers belong in one calculation." } },

    { phase: "launch", title: "What could you <em>ask</em>?",
      lead: "18 crates. 24 bottles in each. 350 already sold.",
      goal: "Create the need — the numbers do not name the question.",
      pull: "Estimate an answer to your own question first.",
      rail: { launch: "Do not solve. Just give me a question these numbers could answer.",
        monitor: ["Asking for the total", "Asking how many are left", "Asking how many crates were sold"],
        connect: "Which question needs two steps?",
        misconception: "Assuming there is only one possible question." } },

    { phase: "monitor", title: "Make a <em>plan</em> first",
      lead: "What do I know, what am I asked, what must I find first.",
      goal: "Planning is a step, not a delay.",
      pull: "Now try the plan — and notice where it stalls.",
      rail: { launch: "Fill the frame in any order. Say when it feels complete.",
        monitor: ["Starting with what they know", "Jumping to the calculation", "Naming the middle step"],
        connect: "Which line was hardest to fill?",
        misconception: "Treating the plan as writing out the question again." } },

    { phase: "monitor", title: "Get <em>stuck</em>, then keep going",
      lead: "Try to subtract first. You cannot — yet. That is the lesson.",
      goal: "Persevering means finding the middle step, not trying harder.",
      pull: "Sort some problems by where the sticking point is.",
      rail: { launch: "Try the subtraction first, on purpose. What stops you?",
        monitor: ["Noticing the whole is unknown", "Subtracting 350 from 24", "Finding the total first"],
        connect: "What did being stuck actually tell you?",
        misconception: "Reading being stuck as being wrong." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Sort each question. No grading until the class commits.",
      goal: "Recognise a hidden middle step.",
      pull: "Two students planned the same problem differently.",
      rail: { launch: "Ask: do I already know every number I need?",
        monitor: ["Counting the unknowns", "Checking what is given", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers rather than the unknowns." } },

    { phase: "connect", title: "Two <em>plans</em>, one answer",
      lead: "Noura found the total first. Yasir worked out how many crates were sold. Both reach 82.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Multiplying then subtracting", "Working in crates", "Checking both give 82"],
        connect: "Why do both routes work?",
        misconception: "Believing there is only one correct order." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Know. Asked. Find first. Then. Four lines, and the problem opens.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next line", "Naming the middle step", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Filling the frame in without using it." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the middle step", "Testing on a new problem", "Checking the answer against the question"],
        connect: "What do you do when your first answer is not what was asked?",
        misconception: "Stopping at the first number you can calculate." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write your plan before you calculate.",
        monitor: ["Multiplying first", "Finding the middle step", "Answering the actual question"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 390 — the middle step, not the question." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next topic: dividing by one-digit numbers.",
      rail: { launch: "Ask three students what they do when they get stuck.",
        monitor: ["Able to explain the plan", "Still needs the frame", "Ready for Topic 5"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [picked, setPicked] = useState([]);
    const [step, setStep] = useState(0);
    const order = ["know", "ask", "first", "then"];

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawDepot} height={256} award={award}
          notices={["There are 18 crates", "Each holds 24", "350 have been sold", "There are three numbers"]}
          wonders={["How many are left?", "Do I multiply or subtract?", "Which number comes first?"]} />;

      case 1:
        return <LaunchEstimate draw={drawDepot} height={256} award={award}
          label="About how many bottles altogether?" min={200} max={700} start={430} unit="bottles"
          after="Locked. Now let us plan before we calculate."
          note="Three numbers, and only two of them belong in the first step." />;

      case 2:
        return <ExploreChips draw={makePlan(picked)} height={258}
          label="Fill in the plan"
          value={null}
          onPick={(v) => {
            if (picked.indexOf(v) !== -1) return;
            const next = picked.concat([v]);
            setPicked(next);
          }}
          chips={order.map((k) => ({
            v: k,
            label: (picked.indexOf(k) !== -1 ? "\u2713 " : "+ ") +
              ({ know: "I know", ask: "I am asked", first: "Find first", then: "Then" })[k]
          }))}
          caption={<MathEl omml={M.plan} size="lg" display="block" />}
          footnote="The plan is where you decide the order — not while you are calculating." />;

      case 3:
        return <ExploreChips draw={makePersevere(step)} height={256}
          label="Try it, get stuck, keep going"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "subtract first" }, { v: 1, label: "find the total" }, { v: 2, label: "now subtract" }]}
          caption={<MathEl omml={step === 0 ? M.wrong : step === 1 ? M.step1 : M.step2} size="lg" display="block" />}
          footnote="Being stuck is information. It tells you which step is missing." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "p1", text: "How many bottles altogether?", target: "one" },
            { id: "p2", text: "How many are left after 350 are sold?", target: "two" },
            { id: "p3", text: "How many bottles in 5 crates?", target: "one" },
            { id: "p4", text: "How many full crates were sold?", target: "two" }
          ]}
          targets={[
            { id: "one", label: "one step" },
            { id: "two", label: "two steps — something must be found first" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Noura's plan — bottles", omml: M.step2, h: 92,
                  quote: "Total first, then take away the 350." }}
          right={{ name: "Yasir's plan — crates", omml: M.compare, h: 92,
                   quote: "I worked out how many crates 350 bottles is first." }}
          same={["Both reach 82", "Both need two steps", "Both use all three numbers"]}
          diff={["Noura works in bottles, Yasir in crates",
                 "Yasir's first step has a remainder to think about",
                 "Noura's plan is simpler to write down"]} />;

      case 6:
        return <BoardScreen draw={drawBoard47} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.plan, alt: "what do I know, what am I asked, what must I find first" }]}
          hand={"write what you know \u00b7 write what is asked \u00b7 name the middle step \u00b7 only then calculate"}
          cards={[
            { title: "The middle step", omml: M.step1, note: "not the answer, but the key to it" },
            { title: "Tap for the real answer", omml: M.wrong, revealOmml: M.step2, reveal: true,
              note: "the question asked how many are LEFT" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A shop has 26 boxes of 15 pens. It needs 500 pens for an order. How many more are needed?"
          omml={M.swykStep}
          options={[{ v: "a", text: "390" }, { v: "b", text: "110" }, { v: "c", text: "890" }, { v: "d", text: "474" }]}
          right="b"
          support={{
            yes: "Yes \u2014 26 \u00d7 15 = 390, then 500 \u2212 390 = 110.",
            notYet: "Not yet \u2014 390 is the middle step. What was actually asked?",
            draw: drawSupport47, h: 82,
            hint: "The question asks how many MORE are needed, not how many there are."
          }} />;

      case 9:
        return <Closing game={game} omml={M.plan}
          action="Find a two-step problem at home tonight and write the plan before you solve it." />;

      default: return null;
    }
  }
};
