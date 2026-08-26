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
    {
      phase: "warmup",
      title: "The auditor's <em>challenge</em>",
      lead: "A polished solution sits under the auditor's seal. It looks finished. The class must decide whether to sign it.",
      goal: "An invitation — a polished answer can still hide a faulty step.",
      pull: "Signing the seal is a reasoning act, not a compliment.",
      rail: {
        launch: "Fictional frame. Ask only: what is under the seal, and what does signing it mean?",
        monitor: ["Noticing the solution looks complete", "Wonding where a gap could hide", "Noticing the two-step problem"],
        connect: "What would 'checking a solution' look like here?",
        misconception: "Signing because the solution is neatly written."
      }
    },
    {
      phase: "launch",
      title: "Four lines, <em>one doesn't belong</em>",
      lead: "The auditor's solution has four lines. Three are sound reasoning; one is not. Which line doesn't belong?",
      goal: "Distinguish sound reasoning from a broken step in a written solution.",
      pull: "The odd line is not the wrong number — it is the missing step.",
      rail: {
        launch: "Ask for the line and the reason before the class commits.",
        monitor: ["Reading each line as a claim", "Testing the step behind each line", "Naming the missing step in line d"],
        connect: "What makes a line of reasoning 'belong'?",
        misconception: "Rejecting the line with the smallest number."
      }
    },
    {
      phase: "monitor",
      title: "Zayd draws the <em>same numbers three ways</em>",
      lead: "He can draw the same two numbers as three different diagrams. The class chooses the diagram that fits the question.",
      goal: "Match a question mark's position to the operation it needs.",
      pull: "Where the question mark sits tells you which operation you need.",
      rail: {
        launch: "Ask where the question mark sits before the diagram appears.",
        monitor: ["Naming total unknown", "Naming part unknown", "Naming difference unknown"],
        connect: "Which diagram would a 'how much more' question need?",
        misconception: "Choosing the diagram by the size of the numbers."
      }
    },
    {
      phase: "monitor",
      title: "Omar asks what is <em>missing</em>",
      lead: "He can pose the same numbers as a missing-part question. The class names what is missing before the diagram answers.",
      goal: "Name the unknown — a part, the whole, or the difference — before operating.",
      pull: "part, whole, or difference — name it first",
      rail: {
        launch: "Ask the class to say the unknown out loud before selecting.",
        monitor: ["Naming a part", "Naming the whole", "Naming the difference"],
        connect: "How does naming the unknown choose the operation?",
        misconception: "Operating first and naming the unknown afterwards."
      }
    },
    {
      phase: "monitor",
      title: "The four lines need <em>labels</em>",
      lead: "Omar reads each line of the auditor's working while Zayd labels it. The class commits every line to its reasoning type before the folio files it.",
      goal: "Classify reasoning lines: part-part, whole-part, compare, two-step.",
      pull: "A labelled solution can be checked line by line.",
      rail: {
        launch: "Do not grade until the class commits to all four labels.",
        monitor: ["Naming part + part = whole", "Naming whole − part = part", "Separating the two-step line"],
        connect: "Which label is hardest to spot in real work?",
        misconception: "Labelling every subtraction as 'compare'."
      }
    },
    {
      phase: "monitor",
      title: "Omar walks the <em>two-step problem</em>",
      lead: "The budget is 2,500; the two rows total 2,151. He can walk the two steps — the class chooses the step before it is revealed.",
      goal: "Use the answer of step 1 as a number needed in step 2.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: {
        launch: "Ask what step 1 produces before step 2 is allowed to start.",
        monitor: ["Computing 1,284 + 867 = 2,151", "Using 2,151 in 2,500 − 2,151", "Naming the 349 remainder"],
        connect: "What would step 2 be without step 1's answer?",
        misconception: "Subtracting 1,284 from 2,500 and calling it the remainder."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways to check</em>",
      lead: "The boys step back. Real student methods for checking a solution take the board.",
      goal: "Compare methods and name a reusable one in the Sijill.",
      pull: "One method draws first; one writes first. Both can find the gap.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both find the missing step", "Comparing diagram-first to equation-first", "Explaining which catches gaps faster"],
        connect: "When does drawing first save the check?",
        misconception: "Believing a neat solution needs no checking."
      }
    },
    {
      phase: "monitor",
      title: "The polished line has <em>a gap</em>",
      lead: "The auditor's last line: 'The total is 2,151, so the remainder is 2,151.' The class decides whether the solution has a gap.",
      goal: "Locate the step with no reasoning behind it.",
      pull: "A critique names the gap — it does not just say 'no'.",
      rail: {
        launch: "Ask the class to quote the gap in one sentence before committing.",
        monitor: ["Testing the last line", "Seeing that the remainder needs 5,000 − 2,151", "Naming the missing step 2"],
        connect: "What would the corrected line say?",
        misconception: "Rejecting the whole solution because one line is broken."
      }
    },
    {
      phase: "monitor",
      title: "Omar writes the <em>corrected line</em>",
      lead: "He can write the corrected second step. The class chooses the line that actually answers the question.",
      goal: "Revise a broken step into a step that answers the question.",
      pull: "The correction must answer the question, not just be a true equation.",
      rail: {
        launch: "Ask which line answers 'how much more is needed' before committing.",
        monitor: ["Choosing 2,500 − 2,151 = 349", "Rejecting true-but-irrelevant lines", "Checking the corrected total"],
        connect: "What made the broken line look polished?",
        misconception: "Accepting a true equation that answers a different question."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Draw the situation. Name the unknown. Walk the steps in order. Check the line that looks most polished.",
      goal: "Build the reasoning rule publicly from the methods compared.",
      pull: "The seal is signed by the reasoning, not the handwriting.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Naming the unknown first", "Checking the polished line last"],
        connect: "Which part of the rule would catch the auditor's gap first?",
        misconception: "Checking the arithmetic but never the question each line answers."
      }
    },
    {
      phase: "swyk",
      title: "The class signs only a solution it can <em>re-run</em>",
      lead: "A final two-step card: 2,340 in week one, 1,875 in week two, goal 5,000. How much more is needed — and what are the two steps?",
      goal: "Solve a two-step problem and state both steps.",
      pull: "A solution with both steps stated earns the seal.",
      rail: {
        launch: "Two minutes. Require both steps, not only the final number.",
        monitor: ["Computing 2,340 + 1,875 = 4,215", "Computing 5,000 − 4,215 = 785", "Stating the steps in order"],
        connect: "Which step would a rushed solution skip?",
        misconception: "Answering 4,215 — the total raised, not the amount still needed."
      }
    },
    {
      phase: "synth",
      title: "Why ledgers can be <em>re-checked</em>",
      lead: "The class turns to the history: why a written record with place value can be re-run by anyone, and why that made budgets trustworthy.",
      goal: "Connect part-whole reasoning to the documented history of written, checkable records.",
      pull: "A record you can re-check is a record people can trust.",
      rail: {
        launch: "Use described and documented — never invented by one person.",
        monitor: ["Linking re-checking to place value", "Connecting the audit to the window", "Asking who benefits from checkable records"],
        connect: "Why does a re-checkable ledger change who can trust a budget?",
        misconception: "Attributing checkable records to a single inventor."
      }
    },
    {
      phase: "monitor",
      title: "The seal asks for <em>evidence</em>",
      lead: "Whether or not the window opens, the unit's values reflection stands: a record is signed only when its evidence can be re-checked.",
      goal: "Reflect on trust and checkability after the mathematics.",
      pull: "Trust, like a total, is earned by evidence that can be re-run.",
      rail: {
        launch: "Keep the reflection short and tied to the lesson's audit.",
        monitor: ["Connecting the seal to the add-backs of the unit", "Naming what 're-checkable' means", "Keeping the reflection out of the XP economy"],
        connect: "Where in your life does 'show the working' earn trust?",
        misconception: "Treating the reflection as a points event."
      }
    },
    {
      phase: "connect",
      title: "The seal is signed — <em>and the batches arrive</em>",
      lead: "The auditor's solution is corrected, re-run and signed. Then an order card slips from under the cover: every item listed in repeated batches.",
      goal: "Close the unit and open Chapter 3's multiplication need.",
      pull: "Repeated batches ask for multiplication, not repeated addition.",
      rail: {
        launch: "Name the completed artifact, then reveal only the next chapter's need.",
        monitor: ["Restating the reasoning rule", "Seeing the batches on the order card", "Feeling the repeated-addition strain"],
        connect: "Where have you 're-run the working' before trusting a number?",
        misconception: "Remembering the seal but not the name-the-unknown-first rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("sum");
    const [missing, setMissing] = useState(0);
    const [step, setStep] = useState(0);
    const [gap, setGap] = useState(0);
    const [fix, setFix] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="A polished solution under the seal"
            text="The lantern shows the auditor's desk: a solution written neatly, a seal waiting. The class must decide whether the reasoning — not the handwriting — earns the signature."
            clue="The most polished line is the one to check last">
            <NoticeWonder draw={drawFair} height={256} award={award}
              notices={["The solution is neatly written", "It has two steps", "The seal is not signed yet", "Two numbers are used three times"]}
              wonders={["Could a neat solution still be wrong?", "Where would a gap hide?", "What does signing the seal actually check?"]}
              footnote="The story raises the stakes. The reasoning is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar reads the four lines aloud"
            text="Omar reads each line of the auditor's solution while Zayd holds the numbers. One line does not belong — the class commits before the folio explains why."
            clue="The odd line is not the wrong number — it is the missing step">
            <WODB award={award}
              prompt="Four lines of the auditor's solution. Which one doesn't belong?"
              cards={[
                { id: "a", text: "1,284 + 867 = 2,151", why: "Part + part = whole — both parts are known, the total is found." },
                { id: "b", text: "2,151 − 867 = 1,284", why: "Whole − part = part — the total is known, the missing part is found." },
                { id: "c", text: "1,284 − 867 = 417", why: "Part − part = difference — comparing two known parts." },
                { id: "d", text: "The total is 2,151, so the remainder is 2,151.", why: "This line skips step 2 — the remainder needs 5,000 − 2,151. This is the gap." }
              ]} />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd draws the same numbers three ways"
            text="He can draw 1,284 and 867 as three different diagrams. The class chooses the diagram that fits the question before the operation is named."
            clue="Where the question mark sits tells you the operation">
            <ExploreChips draw={makeDiagram(kind)} height={252}
              label="Choose the diagram that fits"
              value={kind}
              onPick={(v) => setKind(v)}
              chips={[{ v: "sum", label: "total unknown" }, { v: "missing", label: "part unknown" }, { v: "compare", label: "difference unknown" }]}
              caption={<MathEl omml={M.question} size="lg" display="block" />}
              footnote="Where the question mark sits tells you which operation you need." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar asks what is missing"
            text="He poses the same numbers as a missing-part question. The class names what is missing before the diagram answers."
            clue="Part, whole, or difference — name it first">
            <ExploreChips draw={makeTwoStep(0)} height={252}
              label="What is missing in this question?"
              value={missing}
              onPick={(v) => setMissing(v)}
              chips={[{ v: 0, label: "a part" }, { v: 1, label: "the whole" }, { v: 2, label: "the difference" }]}
              caption={<MathEl omml={M.question} size="lg" display="block" />}
              footnote="Naming the unknown chooses the operation." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The four lines need labels"
            text="Omar reads each line while Zayd labels it. The class commits every line to its reasoning type before the folio files it."
            clue="A labelled solution can be checked line by line">
            <CardSort award={award} columns={4} commitLabel="Label the four lines"
              items={[
                { id: "s1", text: "1,284 + 867 = 2,151", target: "t1" },
                { id: "s2", text: "2,151 − 867 = 1,284", target: "t2" },
                { id: "s3", text: "1,284 − 867 = 417", target: "t3" },
                { id: "s4", text: "2,500 − 2,151 = 349", target: "t4" }
              ]}
              targets={[
                { id: "t1", label: "Part + part = whole" },
                { id: "t2", label: "Whole − part = part" },
                { id: "t3", label: "Compare" },
                { id: "t4", label: "Two-step" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar walks the two-step problem"
            text="The budget is 2,500; the two rows total 2,151. He can walk the two steps — the class chooses the step before it is revealed."
            clue="The answer to step 1 becomes a number you need in step 2">
            <ExploreChips draw={makeTwoStep(step)} height={252}
              label="How far from the 2,500 target?"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
              caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
              footnote="The answer to step 1 becomes a number you need in step 2." />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest checking methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One method draws first; one writes first">
          <CompareConnect award={award}
            left={{ name: "Aya's way — diagram first", omml: M.partPart, h: 92,
                    quote: "I draw the situation, name the unknown, and only then write the equation." }}
            right={{ name: "Musa's way — equation first", omml: M.wholePart, h: 92,
                     quote: "I write the steps, then re-run each one to see it answers the question." }}
            same={["Both find the missing step 2", "Both re-run the working", "Both sign only what they can re-check"]}
            diff={["Aya's diagram catches a misnamed unknown", "Musa's re-run catches a broken step", "Aya opens with the picture, Musa with the symbols"]} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The polished line has a gap"
            text="The auditor's last line, alone: 'The total is 2,151, so the remainder is 2,151.' The class decides whether the solution has a gap — and names it."
            clue="A critique names the gap — it does not just say no">
            <ExploreChips draw={makeTwoStep(1)} height={252}
              label="Does this solution have a gap?"
              value={gap}
              onPick={(v) => setGap(v)}
              chips={[{ v: 0, label: "no gap" }, { v: 1, label: "the gap is the second step" }]}
              caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
              footnote="Step 1 is true. The remainder still needs 5,000 − 2,151." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar writes the corrected line"
            text="He can write the corrected second step. The class chooses the line that actually answers 'how much more is needed.'"
            clue="The correction must answer the question, not just be true">
            <ExploreChips draw={makeTwoStep(2)} height={252}
              label="Which line corrects the solution?"
              value={fix}
              onPick={(v) => setFix(v)}
              chips={[
                { v: 0, label: "2,500 − 2,151 = 349" },
                { v: 1, label: "2,151 − 867 = 1,284" },
                { v: 2, label: "2,500 − 1,284 = 1,216" }
              ]}
              caption={<MathEl omml={M.twoStep} size="lg" display="block" />}
              footnote="The corrected step uses step 1's answer and answers the question." />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Draw · name the unknown · walk the steps · check the polished line">
            <BoardScreen draw={drawBoard28} height={380}
              caption="The seal is signed by the reasoning, not the handwriting." />
          </StoryShell>
        );

      case 10:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The class signs only a solution it can re-run"
            text="A final two-step card: 2,340 raised in week one, 1,875 in week two, goal 5,000 — simulated figures, like every number in this unit. How much more is needed, and what are the two steps?"
            clue="Step 1 finds the total raised. Step 2 finds what is still needed.">
            <ShowWhatYouKnow award={award}
              prompt="A charity raised 2,340 riyals in week one and 1,875 in week two. The goal is 5,000. How much more is needed?"
              omml={M.swykStep1}
              options={[{ v: "a", text: "785" }, { v: "b", text: "4,215" }, { v: "c", text: "2,660" }, { v: "d", text: "1,145" }]}
              right="a"
              support={{
                yes: "Yes — step 1: 2,340 + 1,875 = 4,215 raised. Step 2: 5,000 − 4,215 = 785 still needed.",
                notYet: "Not yet — what does step 1 find, and what does step 2 subtract it from?",
                draw: drawSupport28, h: 84,
                hint: "The total raised is a number you need in step 2."
              }} />
          </StoryShell>
        );

      case 11:
        return (
          <STEMWindow window={STORY && STORY.stemWindows && STORY.stemWindows[0]}>
            <RuleScreen award={award}
              ommls={[{ omml: M.partPart, alt: "part + part = whole" },
                      { omml: M.wholePart, alt: "whole − part = part" }]}
              hand={"name the unknown first · walk the steps in order · check the polished line"}
              cards={[
                { title: "The unit's habit", omml: M.check, note: "every total and difference was add-back checked" },
                { title: "The audit", omml: M.twoStep, note: "the two-step question the seal was signed on" }
              ]} />
          </STEMWindow>
        );

      case 12:
        return (
          <AmanahWindow window={STORY && STORY.amanahWindows && STORY.amanahWindows[0]}>
            <div className="glass-panel" style={{ padding: "18px 20px" }}>
              <b style={{ fontSize: "14px", color: "var(--daf-deep)" }}>The seal asks for evidence</b>
              <p style={{ fontSize: "12.5px", color: "var(--daf-ink-2)", margin: "8px 0 0", lineHeight: 1.55 }}>
                Throughout this unit, a record was signed only when its working could be re-run:
                every total add-back checked, every difference closed, every polished line tested
                against the question it answers. Trust, like a total, is earned by evidence that
                can be re-checked — not by neatness, and not by authority.
              </p>
            </div>
          </AmanahWindow>
        );

      case 13:
        return (
          <StoryHandoff
            title="The seal is signed — and the batches arrive"
            text="The auditor's solution is corrected, re-run and signed. Then an order card slips from under the cover: every item listed in repeated batches — and repeated addition will not carry the workshop through them."
            artifact="Audited ledger · signed (reasoning checked line by line)"
            next="Every item listed in repeated batches — the workshop needs multiplication, not repeated addition.">
            <Closing game={game} omml={M.question}
              action="Tonight: find a two-step number in real life. Write both steps, and check that the last one answers the question." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
