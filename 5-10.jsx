/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-10 · Problem Solving: Model with Math
   Standard MP.4   I can ... draw a bar diagram for a division problem, write
   the equation, and decide what the remainder means.
   =========================================================================== */

const M = {
  equal: om(mt("144\u00f76=24")),
  twoStep: om(mt("144\u00f76=24"), mnor(", then "), mt("24\u00d72=48")),
  remainder: om(mt("100\u00f78=12 r 4")),
  unknown: om(mnor("the unknown is the size of one group")),
  swykStep: om(mt("150\u00f74=37 r 2")),
  swykAnswer: om(mnor("38 boxes are needed"))
};

const makeBar510 = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  if (kind === "size") {
    const parts = [];
    for (let k = 0; k < 6; k++) parts.push({ v: 24, label: "?", col: "#2D70B3" });
    D.strip(ctx, { x: x, y: 80, w: w, h: 46, prog: 1, total: 144, parts: parts });
    D.txt(ctx, "the whole is known, 6 equal groups", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "divide to find the size of one group", W / 2, H - 16,
      { size: 15, col: "#34D399", font: "marker" });
  } else if (kind === "count") {
    const parts = [];
    for (let k = 0; k < 6; k++) parts.push({ v: 24, label: "24", col: "#FA7E19" });
    D.strip(ctx, { x: x, y: 80, w: w, h: 46, prog: 1, total: 144, parts: parts });
    D.txt(ctx, "the whole is known, each group holds 24", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "divide to find how many groups", W / 2, H - 16,
      { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.strip(ctx, { x: x, y: 62, w: w * 0.5, h: 40, prog: 1,
      parts: [{ v: 24, label: "24", col: "#2D70B3", sub: "one class" }] });
    D.strip(ctx, { x: x, y: 128, w: w, h: 40, prog: 1,
      parts: [{ v: 24, label: "24", col: "#388C46" }, { v: 24, label: "24", col: "#388C46" }] });
    D.txt(ctx, "twice as many \u2014 multiply after dividing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "two steps", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  }
};

const makeSteps510 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  const parts = [];
  for (let k = 0; k < 6; k++) parts.push({ v: 24, label: step >= 1 ? "24" : "?", col: "#2D70B3" });
  D.strip(ctx, { x: x, y: 62, w: w, h: 42, prog: 1, total: 144, parts: parts });
  if (step >= 1) D.txt(ctx, "step 1: 144 \u00f7 6 = 24 in each class", W / 2, 130,
    { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 166, w: w * 0.34, h: 40, prog: 1, total: 48,
      parts: [{ v: 24, label: "24", col: "#388C46" }, { v: 24, label: "24", col: "#388C46" }] });
    D.txt(ctx, "step 2: 2 classes need 24 \u00d7 2 = 48", W / 2, 236,
      { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "48 books for the two classes" : "one step will not answer it",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

const drawLibrary510 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "sharing the new books", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 24; c++) {
      const a = D.at(p2, (r * 24 + c) / 144, (r * 24 + c) / 144 + 0.2);
      if (a <= 0) continue;
      ctx.save();
      ctx.globalAlpha = a * 0.75;
      D.rr(ctx, 56 + c * ((W - 130) / 24), 50 + r * 19, (W - 150) / 24, 13, 2);
      ctx.fillStyle = "#2D70B3"; ctx.fill();
      ctx.restore();
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "144 books \u00b7 6 classes", W / 2, 182,
      { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "what could you ask?", W / 2, H - 16,
      { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard510 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Draw it, then write it" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 210, 380), p3 = D.at(f, 400, 570), p4 = D.at(f, 580, 740);
  const parts = [];
  for (let k = 0; k < 6; k++) parts.push({ v: 24, label: p2 > 0.5 ? "24" : "?", col: "#2D70B3" });
  D.strip(ctx, { x: 96, y: 116, w: W - 192, h: 46, prog: p1, total: 144, parts: parts });
  if (p2 > 0) D.txt(ctx, "144 \u00f7 6 = 24", W / 2, 206, { size: 20, col: "#34D399", font: "marker", alpha: p2 });
  if (p3 > 0) {
    D.strip(ctx, { x: 96, y: 244, w: (W - 192) * 0.34, h: 44, prog: p3, total: 48,
      parts: [{ v: 24, label: "24", col: "#388C46" }, { v: 24, label: "24", col: "#388C46" }] });
    D.txt(ctx, "24 \u00d7 2 = 48", W / 2, 326, { size: 20, col: "#34D399", font: "marker", alpha: D.at(f, 450, 540) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the bar shows the relationship \u2014 the equation writes it down",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 620, 720) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 660, 760), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport510 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.shareGroups(ctx, { total: 150, groups: 4, dealt: 150, x: 34, y: 14, w: W - 110, h: 56, s: 4.6 });
  D.txt(ctx, "37 in each box, 2 still loose", W / 2, H - 8,
    { size: 12, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "5-10",
  storageKey: "daf-g4-t5-l10",
  title: "Problem Solving: Model with Math",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-10 · MP.4",
  math: M,
  ixl: ["SLS"],

  metas: [
    { phase: "warmup", title: "Which bar <em>doesn't belong</em>?",
      lead: "Three diagrams for division problems. Every one has a reason.",
      goal: "Reasoning before answers — no card is wrong.",
      pull: "Where the question mark sits changes the whole problem.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reasoning from the unknown", "Reasoning from the number of bars", "Reasoning from the operation"],
        connect: "Can every card be the odd one out?",
        misconception: "Choosing the operation from a key word instead of the structure." } },

    { phase: "launch", title: "A hundred and forty-four <em>books</em>",
      lead: "144 new books, 6 classes. What could you ask?",
      goal: "Create the need — numbers alone do not say what to do.",
      pull: "Estimate an answer to your own question first.",
      rail: { launch: "Do not solve anything. Just give me a question these numbers could answer.",
        monitor: ["Asking how many each", "Asking how many classes", "Asking about two classes together"],
        connect: "Which question needs two steps?",
        misconception: "Assuming there is only one possible question." } },

    { phase: "monitor", title: "Draw what you <em>know</em>",
      lead: "Is the size of a group missing, or the number of groups?",
      goal: "Two kinds of division look different on a bar.",
      pull: "Some questions need a second step after the division.",
      rail: { launch: "Predict where the question mark will sit before you tap.",
        monitor: ["Placing the unknown correctly", "Confusing size with number", "Drawing two bars"],
        connect: "Where is the unknown in each diagram?",
        misconception: "Drawing the same bar for both kinds of division." } },

    { phase: "monitor", title: "A problem in <em>two steps</em>",
      lead: "How many books do two classes get? Divide, then multiply.",
      goal: "Multi-step problems chain a division to another operation.",
      pull: "Sort some questions by how many steps they need.",
      rail: { launch: "What must you work out before you can answer?",
        monitor: ["Dividing first", "Trying to do it in one step", "Multiplying at the end"],
        connect: "Why can the multiplication not come first?",
        misconception: "Dividing 144 by 2 to find two classes." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Sort each question. No grading until the class commits.",
      goal: "Recognise a hidden middle step.",
      pull: "Two students wrote different equations for the same problem.",
      rail: { launch: "Ask: do I already know every number I need?",
        monitor: ["Counting the unknowns", "Checking what is given", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers rather than the unknowns." } },

    { phase: "connect", title: "Two <em>equations</em>, one problem",
      lead: "Amira wrote 144 ÷ 6 = b. Khalid wrote (144 ÷ 6) × 2 = b. Both are right.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Writing the first step only", "Writing both steps in one line", "Using a letter for the unknown"],
        connect: "What is b standing for in each equation?",
        misconception: "Using the same letter for two different unknowns." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Draw the bar. Find the question mark. Write the equation that says the same thing.",
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
        monitor: ["Naming the unknown", "Testing on a new problem", "Deciding about a remainder"],
        connect: "What if the division leaves a remainder?",
        misconception: "Ignoring a remainder inside a word problem." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the bar, divide, then read the question again.",
        monitor: ["Getting 37 r 2", "Rounding up to 38", "Answering 37"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 37 and leaving two pens loose." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next topic: using all four operations to solve problems.",
      rail: { launch: "Ask three students how they decide which operation to use.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready for Topic 6"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("size");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Three bar diagrams. Which one doesn't belong?"
          cards={[
            { id: "a", draw: makeBar510("size"), h: 110, why: "The size of each group is missing — divide" },
            { id: "b", draw: makeBar510("count"), h: 110, why: "The number of groups is missing — also divide" },
            { id: "c", draw: makeBar510("two"), h: 110, why: "The only one with two bars — it needs a second step" },
            { id: "d", text: "144 and 6", why: "The only card with no diagram at all" }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawLibrary510} height={256} award={award}
          label="About how many books for each class?" min={5} max={60} start={24} unit="books"
          after="Locked. Now decide what your question actually needs."
          note="Numbers on their own do not tell you whether to divide or multiply." />;

      case 2:
        return <ExploreChips draw={makeBar510(kind)} height={254}
          label="Choose the diagram that fits"
          value={kind}
          onPick={(v) => setKind(v)}
          chips={[{ v: "size", label: "size unknown" }, { v: "count", label: "number of groups unknown" }, { v: "two", label: "two steps" }]}
          caption={<MathEl omml={M.unknown} size="lg" display="block" />}
          footnote="Where the question mark sits tells you what to do." />;

      case 3:
        return <ExploreChips draw={makeSteps510(step)} height={266}
          label="How many for two classes?"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
          caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
          footnote="The answer to step 1 becomes a number you need in step 2." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "q1", text: "How many books for each class?", target: "one" },
            { id: "q2", text: "How many books do two classes get?", target: "two" },
            { id: "q3", text: "How many classes get 24 books?", target: "one" },
            { id: "q4", text: "How many are left after 5 classes take theirs?", target: "two" }
          ]}
          targets={[
            { id: "one", label: "one step" },
            { id: "two", label: "two steps — something must be found first" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Amira's way — one step at a time", omml: M.equal, h: 92,
                  quote: "First I find one class, then I write a second equation." }}
          right={{ name: "Khalid's way — one equation", omml: M.twoStep, h: 92,
                   quote: "I put the whole thing in one line with brackets." }}
          same={["Both reach 48", "Both divide then multiply", "Both use a letter for the unknown"]}
          diff={["Amira writes two equations", "Khalid's is shorter but harder to read",
                 "Amira's shows the middle answer"]} />;

      case 6:
        return <BoardScreen draw={drawBoard510} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.unknown, alt: "the unknown is the size of one group" }]}
          hand={"draw the bar \u00b7 mark the unknown \u00b7 write the equation \u00b7 then decide about any remainder"}
          cards={[
            { title: "The division we did", omml: M.equal, note: "6 equal classes" },
            { title: "Tap for a remainder case", omml: M.twoStep, revealOmml: M.remainder, reveal: true,
              note: "the story decides what to do with the 4" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="150 pens are packed into boxes of 4. How many boxes are needed so every pen is packed?"
          omml={M.swykStep}
          options={[{ v: "a", text: "37" }, { v: "b", text: "38" }, { v: "c", text: "2" }, { v: "d", text: "37 r 2" }]}
          right="b"
          support={{
            yes: "Yes \u2014 37 full boxes and 2 pens left, so a 38th box is needed.",
            notYet: "Not yet \u2014 where do the last two pens go?",
            draw: drawSupport510, h: 92,
            hint: "37 boxes hold 148 pens. Two pens are still loose."
          }} />;

      case 9:
        return <Closing game={game} omml={M.unknown}
          action="Find a real sharing problem at home tonight and draw its bar before you solve it." />;

      default: return null;
    }
  }
};
