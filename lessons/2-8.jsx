/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-8 · Problem Solving: Reasoning
   Standard MP.2   I can ... reason about a word problem, draw a diagram that
   shows the relationship, and decide which operation it needs.
   =========================================================================== */

const M = {
  known: om(mt("1,284"), mnor(" and "), mt(""), mt("867")),
  partPart: om(mt("1,284+867=2,151")),
  wholePart: om(mt("2,151-867=1,284")),
  compare: om(mt("1,284-867=417")),
  twoStep: om(mt("1,284+867=2,151"), mnor(", then "), mt("2,500-2,151=349")),
  question: om(mnor("what is missing — a part, or the whole?")),
  swykStep1: om(mt("2,340+1,875=4,215")),
  swykAnswer: om(mt("5,000-4,215=785"))
};

/* Warm-Up: the same two numbers, three different diagrams */
const makeDiagram = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 56, w = W - 112, y = 96;
  if (kind === "sum") {
    D.strip(ctx, { x: x, y: y, w: w, h: 48, prog: 1, total: "?",
      parts: [{ v: 1284, label: "1,284", col: "#2D70B3", sub: "Saturday" },
              { v: 867, label: "867", col: "#FA7E19", sub: "Sunday" }] });
    D.txt(ctx, "both parts known — the whole is missing", W / 2, H - 34,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "add", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  } else if (kind === "missing") {
    D.strip(ctx, { x: x, y: y, w: w, h: 48, prog: 1, total: 2151,
      parts: [{ v: 867, label: "867", col: "#FA7E19", sub: "Sunday" },
              { v: 1284, label: "?", col: "#2D70B3", sub: "Saturday" }] });
    D.txt(ctx, "the whole and one part known", W / 2, H - 34,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "subtract", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.strip(ctx, { x: x, y: y - 26, w: w, h: 38, prog: 1,
      parts: [{ v: 1284, label: "1,284", col: "#2D70B3", sub: "Saturday" }] });
    D.strip(ctx, { x: x, y: y + 32, w: w * (867 / 1284), h: 38, prog: 1,
      parts: [{ v: 867, label: "867", col: "#FA7E19", sub: "Sunday" }] });
    const gx = x + w * (867 / 1284);
    ctx.save();
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.8; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(gx, y - 30); ctx.lineTo(gx, y + 74); ctx.stroke();
    ctx.restore();
    D.txt(ctx, "?", (gx + x + w) / 2, y + 51, { size: 18, col: "#C9A227", font: "marker" });
    D.txt(ctx, "two amounts compared — the gap is missing", W / 2, H - 34,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "subtract to find the difference", W / 2, H - 12, { size: 15, col: "#34D399", font: "marker" });
  }
};

/* Launch: the book fair over two days, question hidden at first */
const drawFair = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 300), p3 = D.at(f, 310, 440);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school book fair", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const days = [{ n: 1284, label: "Saturday", col: "#2D70B3" }, { n: 867, label: "Sunday", col: "#FA7E19" }];
  days.forEach((d, k) => {
    const a = D.at(p2, k * 0.35, k * 0.35 + 0.6);
    if (a <= 0) return;
    const bw = (d.n / 1400) * (W - 170);
    ctx.save();
    ctx.globalAlpha = a * 0.72;
    D.rr(ctx, 96, 58 + k * 58, bw, 38, 7);
    ctx.fillStyle = d.col; ctx.fill();
    ctx.restore();
    D.txt(ctx, d.label, 90, 77 + k * 58, { size: 12, col: d.col, font: "marker", align: "right", alpha: a });
    D.txt(ctx, d.n.toLocaleString("en-US"), 96 + bw + 10, 77 + k * 58,
      { size: 15, col: "#EAF4F2", font: "marker", align: "left", alpha: a });
  });
  if (p3 > 0) {
    D.txt(ctx, "the target was 2,500 books", W / 2, 172,
      { size: 13, col: "rgba(234,244,242,.7)", font: "marker", alpha: p3 });
    D.txt(ctx, "what question could you ask?", W / 2, H - 20,
      { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 380, 460) });
  }
};

/* Monitor: build a two-step solution one step at a time */
const makeTwoStep = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 56, w = W - 112;
  D.strip(ctx, { x: x, y: 62, w: w * (2151 / 2500), h: 42, prog: step >= 1 ? 1 : 0.001,
    parts: [{ v: 1284, label: "1,284", col: "#2D70B3" }, { v: 867, label: "867", col: "#FA7E19" }] });
  if (step >= 1) D.txt(ctx, "step 1: 1,284 + 867 = 2,151", W / 2, 128,
    { size: 14, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 168, w: w, h: 42, prog: 1, total: 2500,
      parts: [{ v: 2151, label: "2,151 sold", col: "#12857C" }, { v: 349, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "step 2: 2,500 − 2,151 = 349", W / 2, 240, { size: 14, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "349 books short of the target" : "one step is not enough to answer it",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

const drawBoard28 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Which operation does this problem need?" });
  const p1 = D.at(f, 20, 180), p2 = D.at(f, 190, 360), p3 = D.at(f, 370, 540), p4 = D.at(f, 550, 700);

  D.txt(ctx, "draw what you know", W / 2, 88, { size: 15, col: "#EAF4F2", font: "marker", alpha: p1 });
  if (p1 > 0.4) {
    D.strip(ctx, { x: 92, y: 116, w: W - 184, h: 42, prog: p1, total: "?",
      parts: [{ v: 1284, label: "1,284", col: "#2D70B3" }, { v: 867, label: "867", col: "#FA7E19" }] });
  }
  if (p2 > 0) {
    D.txt(ctx, "the whole is missing → add", W / 2, 196,
      { size: 15, col: "#34D399", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.strip(ctx, { x: 92, y: 232, w: W - 184, h: 42, prog: p3, total: 2500,
      parts: [{ v: 2151, label: "2,151", col: "#12857C" }, { v: 349, label: "?", col: "#C9A227" }] });
    D.txt(ctx, "a part is missing → subtract", W / 2, 306,
      { size: 15, col: "#34D399", font: "marker", alpha: D.at(f, 430, 520) });
  }
  if (p4 > 0) {
    const yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the diagram tells you the operation — not the words in the question",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 590, 680) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 630, 730), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport28 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 30, w: W - 48, h: 38, prog: 1, total: 5000,
    parts: [{ v: 4215, label: "4,215 raised", col: "#12857C" }, { v: 785, label: "?", col: "#C9A227" }] });
};

const LESSON = {
  code: "2-8",
  storageKey: "daf-g4-t2-l8",
  title: "Problem Solving: Reasoning",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-8 · MP.2",
  math: M,
  ixl: ["CZM", "RJJ", "F5H"],

  metas: [
    { phase: "warmup", title: "Which diagram <em>doesn't belong</em>?",
      lead: "The same two numbers, drawn three ways. Every one has a reason.",
      goal: "Reasoning before answers — no card is wrong.",
      pull: "The diagram decides the operation.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reasoning from what is missing", "Reasoning from the operation", "Reasoning from the shape"],
        connect: "Can every card be the odd one out?",
        misconception: "Choosing the operation from a key word instead of the structure." } },

    { phase: "launch", title: "What <em>question</em> could you ask?",
      lead: "1,284 books on Saturday. 867 on Sunday. The target was 2,500.",
      goal: "Create the need — the numbers do not tell you what to do with them.",
      pull: "Estimate an answer to your own question first.",
      rail: { launch: "Do not solve anything. Just tell me a question these numbers could answer.",
        monitor: ["Asking for the total", "Asking how many more on Saturday", "Asking how far from the target"],
        connect: "Which question needs more than one step?",
        misconception: "Assuming there is only one possible question." } },

    { phase: "monitor", title: "Draw what you <em>know</em>",
      lead: "Pick the diagram that matches the question you are answering.",
      goal: "Part-part-whole and comparison are different shapes.",
      pull: "Some questions need two diagrams.",
      rail: { launch: "Predict where the question mark will sit before you tap.",
        monitor: ["Placing the unknown correctly", "Confusing part and whole", "Drawing two bars for a comparison"],
        connect: "Where is the unknown in each diagram?",
        misconception: "Drawing one bar for a comparison problem." } },

    { phase: "monitor", title: "A problem in <em>two steps</em>",
      lead: "How far from the target? You cannot answer that in one move.",
      goal: "Multi-step problems chain two diagrams together.",
      pull: "Sort some problems by how many steps they need.",
      rail: { launch: "What do you have to work out before you can answer the question?",
        monitor: ["Finding the total first", "Subtracting from 2,500 first", "Trying to do it in one step"],
        connect: "Why can the second step not come first?",
        misconception: "Subtracting 867 from 2,500 and stopping." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Sort each question. No grading until the class commits.",
      goal: "Recognise a hidden middle step.",
      pull: "Two students solved the same problem in a different order.",
      rail: { launch: "Ask yourself: do I already know every number I need?",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Two ways to <em>get there</em>",
      lead: "Ghada added first. Sultan subtracted first. Both reached 349.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Adding then subtracting", "Subtracting twice", "Checking both give 349"],
        connect: "Why do both routes work?",
        misconception: "Believing there is only one correct order." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Draw what you know. See what is missing. The diagram names the operation.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next bar", "Naming the unknown", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Hunting for key words like altogether or left." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming part and whole", "Testing on a new problem", "Asking about three-step problems"],
        connect: "Does this still work when there are three steps?",
        misconception: "Treating the diagram as decoration rather than a decision tool." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the diagram before you calculate.",
        monitor: ["Drawing first", "Finding the middle step", "Checking against an estimate"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering with the total raised instead of the amount still needed." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next topic: multiplying by one-digit numbers.",
      rail: { launch: "Ask three students how they decide which operation to use.",
        monitor: ["Able to explain it to someone else", "Still needs the diagram", "Ready for Topic 3"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("sum");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="The same two numbers, drawn three ways. Which doesn't belong?"
          cards={[
            { id: "a", draw: makeDiagram("sum"), h: 108, why: "Both parts are known — this one needs adding" },
            { id: "b", draw: makeDiagram("missing"), h: 108, why: "The whole is known — this one needs subtracting" },
            { id: "c", draw: makeDiagram("compare"), h: 108, why: "The only one with two separate bars, comparing" },
            { id: "d", text: "1,284 and 867", why: "The only card with no diagram at all — just numbers" }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawFair} height={262} award={award}
          label="About how many books were sold over both days?"
          min={1500} max={3000} start={2150} unit="books"
          after="Locked. Now decide what your question actually needs."
          note="Numbers on their own do not tell you whether to add or subtract." />;

      case 2:
        return <ExploreChips draw={makeDiagram(kind)} height={252}
          label="Choose the diagram that fits"
          value={kind}
          onPick={(v) => setKind(v)}
          chips={[{ v: "sum", label: "total unknown" }, { v: "missing", label: "part unknown" }, { v: "compare", label: "difference unknown" }]}
          caption={<MathEl omml={M.question} size="lg" display="block" />}
          footnote="Where the question mark sits tells you which operation you need." />;

      case 3:
        return <ExploreChips draw={makeTwoStep(step)} height={266}
          label="How far from the 2,500 target?"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
          caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
          footnote="The answer to step 1 becomes a number you need in step 2." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "q1", text: "How many books altogether?", target: "one" },
            { id: "q2", text: "How many more on Saturday?", target: "one" },
            { id: "q3", text: "How far from the 2,500 target?", target: "two" },
            { id: "q4", text: "If 300 were returned, how many were kept?", target: "two" }
          ]}
          targets={[
            { id: "one", label: "one step" },
            { id: "two", label: "two steps — something must be worked out first" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Ghada's way — add, then subtract", omml: M.twoStep, h: 92,
                  quote: "I found the total first, then took it from 2,500." }}
          right={{ name: "Sultan's way — subtract twice", omml: M.compare, h: 92,
                   quote: "I took Saturday off the target, then Sunday off what was left." }}
          same={["Both reach 349", "Both use all three numbers", "Both need two steps"]}
          diff={["Ghada adds first", "Sultan never finds the total", "Ghada's total is useful for other questions"]} />;

      case 6:
        return <BoardScreen draw={drawBoard28} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.question, alt: "what is missing, a part or the whole" }]}
          hand={"draw what you know · find where the question mark sits · a missing whole means add, a missing part means subtract"}
          cards={[
            { title: "The total we found", omml: M.partPart, note: "both parts were known" },
            { title: "Tap to see the second step", omml: M.wholePart, revealOmml: M.twoStep, reveal: true,
              note: "step 1 feeds step 2" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A charity raised 2,340 riyals in week one and 1,875 in week two. The goal is 5,000. How much more is needed?"
          omml={M.swykStep1}
          options={[{ v: "a", text: "465" }, { v: "b", text: "785" }, { v: "c", text: "4,215" }, { v: "d", text: "2,660" }]}
          right="b"
          support={{
            yes: "Yes — 2,340 + 1,875 = 4,215, then 5,000 − 4,215 = 785.",
            notYet: "Not yet — what do you have to work out before you can answer?",
            draw: drawSupport28, h: 82,
            hint: "The question asks how much MORE is needed, not how much was raised."
          }} />;

      case 9:
        return <Closing game={game} omml={M.question}
          action="Find a two-step problem in real life tonight — a bill, a journey, a score — and draw the bar for it." />;

      default: return null;
    }
  }
};
