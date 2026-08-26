/* ===========================================================================
   Grade 4 · Topic 9 · LESSON 9-10 · Problem Solving: Model with Math
   Standard MP.4   I can ... draw a bar diagram for a fraction problem
   and write the equation that matches it.
   =========================================================================== */

const M = {
  equal: om(mfrac(3, 8), mt("+"), mfrac(2, 8), mt("="), mfrac(5, 8)),
  twoStep: om(mfrac(3, 8), mt("+"), mfrac(2, 8), mt("="), mfrac(5, 8), mnor(", then "), mfrac(8, 8), mt("-"), mfrac(5, 8), mt("="), mfrac(3, 8)),
  remainder: om(mt("1"), mfrac(1, 4), mt("+"), mt("2"), mfrac(3, 4), mt("=4")),
  unknown: om(mnor("the unknown is the missing part of the whole")),
  swykStep: om(mfrac(4, 10), mt("+"), mfrac(3, 10), mt("="), mfrac(7, 10)),
  swykAnswer: om(mfrac(3, 10), mnor(" is left"))
};

const makeBar910 = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  if (kind === "size") {
    D.fracBar(ctx, { x: x, y: 76, w: w, h: 48, den: 8, num: 5, prog: 1, col: "#2D70B3", label: false });
    D.txt(ctx, "two parts joined \u2014 the total is missing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "add the parts", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  } else if (kind === "count") {
    D.fracBar(ctx, { x: x, y: 76, w: w, h: 48, den: 8, num: 8, prog: 1, col: "#12857C", label: false });
    ctx.save();
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.2; ctx.setLineDash([5, 4]);
    D.rr(ctx, x + w * 0.625, 72, w * 0.375, 56, 6); ctx.stroke();
    ctx.restore();
    D.txt(ctx, "the whole is known, one part is missing", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "subtract to find the part", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.fracBar(ctx, { x: x, y: 56, w: w, h: 40, den: 8, num: 5, prog: 1, col: "#2D70B3", label: false });
    D.fracBar(ctx, { x: x, y: 132, w: w, h: 40, den: 8, num: 3, prog: 1, col: "#C9A227", label: false });
    D.txt(ctx, "add first, then subtract from the whole", W / 2, H - 40,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "two steps", W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
  }
};

const makeSteps910 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124;
  D.fracBar(ctx, { x: x, y: 58, w: w, h: 42, den: 8, num: step >= 1 ? 5 : 3, prog: 1,
    col: "#2D70B3", label: false });
  if (step >= 1) D.txt(ctx, "step 1: 3/8 + 2/8 = 5/8 eaten", W / 2, 126,
    { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.fracBar(ctx, { x: x, y: 162, w: w, h: 42, den: 8, num: 3, prog: 1, col: "#C9A227", label: false });
    D.txt(ctx, "step 2: 8/8 \u2212 5/8 = 3/8 left", W / 2, 230,
      { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "three eighths of the tray is left" : "one step will not answer it",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

const drawLibrary910 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "a tray of kunafa at break", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 62, y: 56, w: W - 124, h: 50, den: 8, num: 5, prog: p2, col: "#FA7E19", label: false });
  if (p3 > 0) {
    D.txt(ctx, "3/8 eaten, then 2/8 more", W / 2, 152,
      { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "what could you ask?", W / 2, H - 16,
      { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard910 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Draw it, then write it" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 210, 380), p3 = D.at(f, 400, 570), p4 = D.at(f, 580, 740);
  D.fracBar(ctx, { x: 96, y: 112, w: W - 192, h: 46, den: 8, num: 5, prog: p1, col: "#2D70B3", label: false });
  if (p2 > 0) D.txt(ctx, "3/8 + 2/8 = 5/8", W / 2, 202, { size: 20, col: "#34D399", font: "marker", alpha: p2 });
  if (p3 > 0) {
    D.fracBar(ctx, { x: 96, y: 236, w: W - 192, h: 46, den: 8, num: 3, prog: p3, col: "#C9A227", label: false });
    D.txt(ctx, "8/8 \u2212 5/8 = 3/8", W / 2, 326, { size: 20, col: "#34D399", font: "marker", alpha: D.at(f, 450, 540) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the bar shows the relationship \u2014 the equation writes it down",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 620, 720) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 660, 760), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport910 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 14, w: W - 52, h: 34, den: 10, num: 7, prog: 1, col: "#2D70B3", label: false });
  D.txt(ctx, "7 tenths used \u2014 how much is left of the whole?", W / 2, 74,
    { size: 12, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "9-10",
  storageKey: "daf-g4-t9-l10",
  title: "Problem Solving: Model with Math",
  unit: "GRADE 4 · TOPIC 9 · LESSON 9-10 · MP.4",
  math: M,
  ixl: ["XBR", "6KM", "YB5"],

  metas: [
    { phase: "warmup", title: "Which bar <em>doesn't belong</em>?",
      lead: "Three diagrams for fraction problems. Every one has a reason.",
      goal: "Reasoning before answers — no card is wrong.",
      pull: "Where the question mark sits changes the whole problem.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reasoning from the unknown", "Reasoning from the number of bars", "Reasoning from the operation"],
        connect: "Can every card be the odd one out?",
        misconception: "Choosing the operation from a key word instead of the structure." } },

    { phase: "launch", title: "A tray of <em>kunafa</em>",
      lead: "Three eighths eaten, then two eighths more. What could you ask?",
      goal: "Create the need — numbers alone do not say what to do.",
      pull: "Estimate an answer to your own question first.",
      rail: { launch: "Do not solve anything. Just give me a question these numbers could answer.",
        monitor: ["Asking how many each", "Asking how many classes", "Asking about two classes together"],
        connect: "Which question needs two steps?",
        misconception: "Assuming there is only one possible question." } },

    { phase: "monitor", title: "Draw what you <em>know</em>",
      lead: "Is a part missing, or the whole?",
      goal: "Joining and removing look different on a bar.",
      pull: "Some questions need a second step after the division.",
      rail: { launch: "Predict where the question mark will sit before you tap.",
        monitor: ["Placing the unknown correctly", "Confusing size with number", "Drawing two bars"],
        connect: "Where is the unknown in each diagram?",
        misconception: "Drawing the same bar for both kinds of division." } },

    { phase: "monitor", title: "A problem in <em>two steps</em>",
      lead: "How much is LEFT? Add the eaten parts, then take them from the whole.",
      goal: "Multi-step fraction problems chain an addition to a subtraction.",
      pull: "Sort some questions by how many steps they need.",
      rail: { launch: "What must you work out before you can answer?",
        monitor: ["Dividing first", "Trying to do it in one step", "Multiplying at the end"],
        connect: "Why can the multiplication not come first?",
        misconception: "Subtracting 3/8 from the whole and forgetting the other 2/8." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Sort each question. No grading until the class commits.",
      goal: "Recognise a hidden middle step.",
      pull: "Two students wrote different equations for the same problem.",
      rail: { launch: "Ask: do I already know every number I need?",
        monitor: ["Counting the unknowns", "Checking what is given", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers rather than the unknowns." } },

    { phase: "connect", title: "Two <em>equations</em>, one problem",
      lead: "Sultan wrote 3/8 + 2/8 = b. Khalid wrote 8/8 − (3/8 + 2/8) = b. Both are right.",
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
        monitor: ["Getting 7/10", "Subtracting from the whole", "Answering 7/10"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 7/10 and leaving two pens loose." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next topic: multiplying fractions by whole numbers.",
      rail: { launch: "Ask three students how they decide which operation to use.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready for Topic 10"],
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
            { id: "a", draw: makeBar910("size"), h: 110, why: "The size of each group is missing — divide" },
            { id: "b", draw: makeBar910("count"), h: 110, why: "The number of groups is missing — also divide" },
            { id: "c", draw: makeBar910("two"), h: 110, why: "The only one with two bars — it needs a second step" },
            { id: "d", text: "144 and 6", why: "The only card with no diagram at all" }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawLibrary910} height={256} award={award}
          label="How much of the tray has been eaten?" min={1} max={8} start={5} unit="/ 8"
          after="Locked. Now decide what your question actually needs."
          note="Numbers on their own do not tell you whether to add or subtract." />;

      case 2:
        return <ExploreChips draw={makeBar910(kind)} height={254}
          label="Choose the diagram that fits"
          value={kind}
          onPick={(v) => setKind(v)}
          chips={[{ v: "size", label: "total unknown" }, { v: "count", label: "part unknown" }, { v: "two", label: "two steps" }]}
          caption={<MathEl omml={M.unknown} size="lg" display="block" />}
          footnote="Where the question mark sits tells you what to do." />;

      case 3:
        return <ExploreChips draw={makeSteps910(step)} height={266}
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
            { id: "q2", text: "How much of the tray is left?", target: "two" },
            { id: "q3", text: "How many classes get 24 books?", target: "one" },
            { id: "q4", text: "How many are left after 5 classes take theirs?", target: "two" }
          ]}
          targets={[
            { id: "one", label: "one step" },
            { id: "two", label: "two steps — something must be found first" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Sultan's way — one step at a time", omml: M.equal, h: 92,
                  quote: "First I add what was eaten, then I take it away." }}
          right={{ name: "Khalid's way — one equation", omml: M.twoStep, h: 92,
                   quote: "I put the whole thing in one line with brackets." }}
          same={["Both reach 3/8", "Both add then subtract", "Both use a letter for the unknown"]}
          diff={["Sultan writes two equations", "Khalid's is shorter but harder to read",
                 "Sultan's shows the middle answer"]} />;

      case 6:
        return <BoardScreen draw={drawBoard910} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.unknown, alt: "the unknown is the missing part of the whole" }]}
          hand={"draw the bar \u00b7 mark the unknown \u00b7 write the equation \u00b7 keep the denominator"}
          cards={[
            { title: "The addition we did", omml: M.equal, note: "two parts of the same tray" },
            { title: "Tap for a mixed-number case", omml: M.twoStep, revealOmml: M.remainder, reveal: true,
              note: "the same idea with wholes and parts" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A bottle was full. 4/10 was drunk, then 3/10 more. How much is left?"
          omml={M.swykStep}
          options={[{ v: "a", text: "7/10" }, { v: "b", text: "3/10" }, { v: "c", text: "1/10" }, { v: "d", text: "7/20" }]}
          right="b"
          support={{
            yes: "Yes \u2014 4/10 + 3/10 = 7/10 drunk, and 10/10 \u2212 7/10 = 3/10 left.",
            notYet: "Not yet \u2014 what do you have to work out before you can answer?",
            draw: drawSupport910, h: 92,
            hint: "7/10 is the middle step. The question asks how much is LEFT."
          }} />;

      case 9:
        return <Closing game={game} omml={M.unknown}
          action="Find a real fraction problem at home tonight and draw its bar before you solve it." />;

      default: return null;
    }
  }
};
