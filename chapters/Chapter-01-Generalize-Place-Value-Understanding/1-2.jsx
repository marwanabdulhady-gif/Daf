/* ===========================================================================
   SAVVAS enVision Mathematics · Grade 4 · Topic 1
   LESSON 1-2 · Place Value Relationships            Standard: 4.NBT.A.1
   I can ... recognise that a digit in one place is worth ten times what the
            same digit is worth in the place to its right.
   Story beat: "The digit that moved one chair" — Zayd leads (role rotation).
   =========================================================================== */

const M = {
  twoSevens: om(mt("7,700")),
  leftSeven: om(mt("7,000")),
  rightSeven: om(mt("700")),
  tenTimes: om(mt("7,000=10×700")),
  divideBack: om(mt("7,000÷700=10")),
  rule: om(mnor("each place is "), mt("10"), mnor(" times the place on its right")),
  chain: om(mt("1→10→100→1,000")),
  sixHundred: om(mt("600=10×60")),
  forty: om(mt("40=10×4")),
  swykStatement: om(mt("3,000=10×300"))
};

/* ---- lesson-specific drawings ------------------------------------------- */

/* Cold open: the lantern projection — a digit slides one chair to the left */
const drawSlide = (ctx, W, H, frame) => {
  const CYCLE = 900, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  /* district count 7,700 in a place-value row */
  const digits = "7700";
  const cw = 52, x0 = W / 2 - (digits.length * cw) / 2, yD = 74;
  const names = ["thousands", "hundreds", "tens", "ones"];
  for (let i = 0; i < 4; i++) {
    D.txt(ctx, digits[i], x0 + i * cw + cw / 2, yD, { size: 40, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, names[i], x0 + i * cw + cw / 2, yD + 26, { size: 10.5, col: "rgba(234,244,242,.5)", font: "marker" });
  }
  D.txt(ctx, ",", x0 + cw - 6, yD + 12, { size: 36, col: "rgba(234,244,242,.45)", font: "marker" });

  /* the right-hand 7 glows, then a ghost of it slides one place left */
  const glow = D.at(f, 0, 260);
  const slide = D.at(f, 300, 620);
  const hx = x0 + 1 * cw + cw / 2;
  D.rr(ctx, hx - cw / 2 + 4, yD - 34, cw - 8, 52, 8);
  ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2;
  ctx.globalAlpha = 0.35 + glow * 0.65; ctx.stroke(); ctx.globalAlpha = 1;
  D.txt(ctx, "700", hx, yD + 52, { size: 15, col: "#2D70B3", font: "marker", alpha: glow });

  const tx = x0 + 0 * cw + cw / 2;
  if (slide > 0) {
    const gx = hx + (tx - hx) * slide;
    ctx.save();
    ctx.globalAlpha = 0.85 * (1 - slide * 0.3);
    D.txt(ctx, "7", gx, yD - 44, { size: 34, col: "#C9A227", font: "marker" });
    ctx.restore();
    D.marker(ctx, [[hx, yD - 40], [gx, yD - 40]], slide, "rgba(201,162,39,.6)", 1.6);
  }
  const done = D.at(f, 640, 780);
  D.txt(ctx, "same digit — one chair left — worth 10 times as much", W / 2, H - 22,
    { size: 13, col: "#C9A227", font: "marker", alpha: done });
};

/* Launch: the two 7s in 7,700 take turns lighting up */
const drawTwoSevens = (ctx, W, H, frame) => {
  const CYCLE = 400, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const digits = "7700";
  const cw = 52, x0 = W / 2 - (digits.length * cw) / 2, yD = 84;
  const hot = f < CYCLE / 2 ? 0 : 1;
  for (let i = 0; i < digits.length; i++) {
    const isHot = i === hot;
    D.txt(ctx, digits[i], x0 + i * cw + cw / 2, yD,
      { size: 44, col: isHot ? "#C9A227" : "rgba(234,244,242,.45)", font: "marker" });
  }
  D.txt(ctx, ",", x0 + cw - 6, yD + 14, { size: 40, col: "rgba(234,244,242,.45)", font: "marker" });
  const label = hot === 0 ? "this 7 is worth 7,000" : "this 7 is worth 700";
  const col = hot === 0 ? "#388C46" : "#2D70B3";
  const hx = x0 + hot * cw + cw / 2;
  D.marker(ctx, [[hx, yD + 32], [hx, yD + 66]], 1, col, 2);
  D.txt(ctx, label, W / 2, yD + 88, { size: 16, col: col, font: "marker" });
  D.txt(ctx, "same digit — different value", W / 2, H - 24,
    { size: 13, col: "#C9A227", font: "marker" });
};

/* Monitor A: the ten-times machine — a bottom-aligned staircase of blocks */
const makeTenTimes = (step, onTap) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const units = [1, 10, 100, 1000];
  const names = ["one", "ten", "hundred", "thousand"];
  const cols = ["#C9A227", "#2D70B3", "#6042A6", "#388C46"];
  const slotW = W / 4;
  const base = H - 58;
  const s = 8;
  D.marker(ctx, [[18, base + 3], [W - 18, base + 3]], 1, "rgba(234,244,242,.18)", 1.2);
  for (let i = 0; i < 4; i++) {
    const cx = slotW * i + slotW / 2;
    const on = i <= step;
    const live = i === step;
    const a = on ? (live ? 0.75 + Math.sin(frame / 15) * 0.25 : 1) : 0.16;
    if (onTap) D.tap(ctx, { x: slotW * i, y: 0, w: slotW, h: H, value: i, on: onTap });
    if (i === 0)      D.digitBlocks(ctx, { x: cx - s / 2, y: base - s, unit: 1, prog: a, col: cols[0], s: s });
    else if (i === 1) D.digitBlocks(ctx, { x: cx - s / 2, y: base - s * 10, unit: 10, prog: a, col: cols[1], s: s });
    else if (i === 2) D.digitBlocks(ctx, { x: cx - s * 5, y: base - s * 10, unit: 100, prog: a, col: cols[2], s: s });
    else              D.digitBlocks(ctx, { x: cx - s * 5 - 6, y: base - s * 10 + 6, unit: 1000, prog: a, col: cols[3], s: s });
    D.txt(ctx, names[i], cx, base + 22, { size: 12.5, col: on ? cols[i] : "rgba(234,244,242,.25)", font: "marker" });
    D.txt(ctx, units[i].toLocaleString("en-US"), cx, base + 42,
      { size: 15, col: on ? "#EAF4F2" : "rgba(234,244,242,.25)", font: "marker" });
    if (i > 0) {
      const ax = slotW * i;
      const aa = i <= step ? 1 : 0.18;
      D.marker(ctx, [[ax - 20, base - 116], [ax + 16, base - 116]], aa, "#C9A227", 2);
      D.txt(ctx, "×10", ax, base - 134, { size: 13, col: "#C9A227", font: "marker", alpha: aa });
    }
  }
};

/* Monitor B: the value chain under one number */
const makeValueChain = (idx, onTap) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvChart(ctx, { x: 26, y: 26, w: W - 52, digits: "666", slots: 3, prog: 1, highlight: idx, t: frame, rowH: 34, onTap: (v) => onTap && onTap(v) });
  const vals = [600, 60, 6];
  D.txt(ctx, "the 6 here is worth " + vals[idx], W / 2, H - 62, { size: 16, col: "#C9A227", font: "marker" });
  if (idx < 2) {
    D.txt(ctx, vals[idx] + " = 10 × " + vals[idx + 1], W / 2, H - 32,
      { size: 15, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, "and 6 is the smallest place here", W / 2, H - 32,
      { size: 13, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

/* Board: the x10 staircase */
const drawBoard12 = (ctx, W, H, frame) => {
  const CYCLE = 700, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Why is one 7 worth more than the other?" });
  const p1 = D.at(f, 20, 130), p2 = D.at(f, 120, 270), p3 = D.at(f, 260, 400), p4 = D.at(f, 400, 550);
  const digits = "7700";
  const cw = 54, x0 = W / 2 - (digits.length * cw) / 2, yD = 118;
  for (let i = 0; i < digits.length; i++) {
    const a = D.at(p1, i / 4, i / 4 + 0.4);
    if (a <= 0) continue;
    D.txt(ctx, digits[i], x0 + i * cw + cw / 2, yD, { size: 42, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p1 > 0.8) D.txt(ctx, ",", x0 + cw - 6, yD + 14, { size: 38, col: "#C9A227", font: "marker" });
  if (p2 > 0) {
    [["7,000", 0, "#388C46"], ["700", 1, "#2D70B3"]].forEach((v, n) => {
      const a = D.at(p2, n * 0.35, n * 0.35 + 0.5);
      if (a <= 0) return;
      const hx = x0 + v[1] * cw + cw / 2;
      D.marker(ctx, [[hx, yD + 26], [hx, yD + 60]], a, v[2], 2);
      D.txt(ctx, v[0], hx, yD + 80, { size: 19, col: v[2], font: "marker", alpha: a });
    });
  }
  if (p3 > 0) {
    const ax0 = x0 + cw * 1.5, ax1 = x0 + cw * 0.5, ay = yD + 118;
    const pts = [];
    for (let s = 0; s <= 16; s++) {
      const t = s / 16;
      pts.push([ax0 + (ax1 - ax0) * t, ay + Math.sin(Math.PI * t) * 26]);
    }
    D.marker(ctx, pts, p3, "#C9A227", 2.4);
    D.txt(ctx, "× 10", (ax0 + ax1) / 2, ay + 48, { size: 17, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    const yb = H - 46;
    D.marker(ctx, [[60, yb - 30], [W - 60, yb - 30]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "a digit is worth 10 times the same digit one place to its right",
      W / 2, yb - 2, { size: 16, col: "#C9A227", font: "marker", alpha: D.at(f, 440, 520) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 500, 600), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport12 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvChart(ctx, { x: 16, y: 8, w: W - 32, digits: "3300", slots: 4, prog: 1, rowH: 24 });
};

/* ---- the lesson ---------------------------------------------------------- */
const LESSON = {
  code: "1-2",
  storageKey: "daf-g4-t1-l2",
  title: "Place Value Relationships",
  unit: "GRADE 4 · TOPIC 1 · LESSON 1-2 · 4.NBT.A.1",
  math: M,
  ixl: ["9DJ", "YAV", "D7G", "J5M", "B5N"],

  metas: [
    {
      phase: "warmup",
      title: "The digit that <em>moved one chair</em>",
      lead: "In the lantern projection a digit slides one place left — and the district count changes tenfold.",
      goal: "Notice that position, not the digit, decided the new value.",
      pull: "A damaged place-value key is hiding in the census folio.",
      rail: {
        launch: "Fictional frame. Ask only: what moved, and what changed?\n",
        monitor: ["Noticing the digit stayed 7", "Noticing it moved one place", "Wonding why the value changed"],
        connect: "Which noticing could help a clerk rebuild the key?",
        misconception: "Thinking the new count came from a different digit."
      }
    },
    {
      phase: "launch",
      title: "The census office needs a <em>place-value key</em>",
      lead: "Two 7s in 7,700 are worth different amounts. Lock a prediction: how many times bigger?\n",
      goal: "Predict the ten-times relationship before the model appears.",
      pull: "The district figures are simulated planning data, not live counts.",
      rail: {
        launch: "State that the district counts are simulated planning data.",
        monitor: ["Comparing the two 7s", "Estimating the ratio", "Naming thousands and hundreds"],
        connect: "What makes the left 7 worth more with no new digit?",
        misconception: "Treating the district numbers as current Jeddah statistics."
      }
    },
    {
      phase: "monitor",
      title: "Zayd builds the <em>ten-times staircase</em>",
      lead: "Each step up is ten blocks of the step below. Test which step holds which place.",
      goal: "Build the 10-times relationship as a movable model.",
      pull: "Omar wants the key written so another clerk can check it.",
      rail: {
        launch: "Predict the column value before selecting a step.",
        monitor: ["Reading values from the staircase", "Counting blocks", "Naming the ×10 arrow"],
        connect: "Which step would hold the thousands of 4,697,000?",
        misconception: "Counting blocks instead of reading the place label."
      }
    },
    {
      phase: "monitor",
      title: "Omar reads the <em>value chain</em>",
      lead: "Three 6s in 666 carry three different values. Pick a 6 and prove its value.",
      goal: "State digit and value together for any place in a number.",
      pull: "The chain works backwards too: ÷10 one place right.",
      rail: {
        launch: "Ask for the value before the relationship line appears.",
        monitor: ["Pairing digit with place name", "Writing the ×10 statement", "Checking with ÷10"],
        connect: "Why does the same 6 mean 600, 60 or 6?",
        misconception: "Saying the digit instead of its value."
      }
    },
    {
      phase: "monitor",
      title: "Three cards on the key are <em>damaged</em>",
      lead: "The place-value key lost its answers. Commit to all three repairs before the folio checks.",
      goal: "Apply the ten-times relationship to repair records.",
      pull: "Adding a zero is not the same as understanding ×10.",
      rail: {
        launch: "Do not grade until the class commits to all three repairs.",
        monitor: ["Reading the relationship both ways", "Testing with ÷10", "Catching the 40 = 10 × 4 case"],
        connect: "Which direction — ×10 left or ÷10 right — checked your answer?",
        misconception: "Saying ×10 means 'add a zero' and stopping there (23 × 10 is 23 tens, not '23 with a 0')."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two methods</em>",
      lead: "The boys step back. Real student strategies for the ten-times rule take the board.",
      goal: "Compare methods and name the reusable rule in the Sijill.",
      pull: "Zayd will draw the shared rule on the Evidence Board.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Using blocks vs writing ×10", "Checking with division", "Explaining why both work"],
        connect: "Where do both methods use the same ten-times fact?",
        misconception: "Treating one representation as the only real method."
      }
    },
    {
      phase: "synth",
      title: "The rule enters the <em>Evidence Folio</em>",
      lead: "Each place is ten times the place on its right — and one tenth of the place on its left.",
      goal: "Build the rule publicly from the strategies just compared.",
      pull: "This one rule keeps written records honest.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Applying it to a new number", "Using ÷10 in reverse"],
        connect: "Which direction of the rule caught your earlier mistake?",
        misconception: "Applying the rule only to the left, never checking right."
      }
    },
    {
      phase: "synth",
      title: "Why written records <em>keep their places</em>",
      lead: "Positional numerals helped keep accounts, trade and administrative records checkable.",
      goal: "Connect the ten-times rule to the documented history of useful knowledge.",
      pull: "Now use the key to complete the census card.",
      rail: {
        launch: "Use developed, described, transmitted — not invented by one person.",
        monitor: ["Linking position to checkability", "Connecting records to the rule", "Asking who needed the method"],
        connect: "Why would a clerk trust a record where every place is predictable?",
        misconception: "Claiming one person invented positional notation."
      }
    },
    {
      phase: "swyk",
      title: "Can we complete the <em>census card</em>?",
      lead: "One key card is missing: 3,000 = 10 × ? — defend the value that fits.",
      goal: "Use the ten-times relationship independently to complete the record.",
      pull: "A completed key card restores the second fragment of Folio 1.",
      rail: {
        launch: "Two minutes. Require a ten-times reason, not only a letter.",
        monitor: ["Testing with ÷10", "Using the chart", "Placing 300 in the hundreds"],
        connect: "Which check — ×10 or ÷10 — settled it fastest?",
        misconception: "Choosing 300 because 'it has the same digits' rather than the ten-times relationship."
      }
    },
    {
      phase: "connect",
      title: "Fragment two is <em>restored</em>",
      lead: "The place-value key is back in the folio — and two district cards both claim the bigger count.",
      goal: "Close with a transfer task and the comparison cliffhanger.",
      pull: "Next: two districts, one clinic, and only comparison evidence to settle it.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next mathematical need.",
        monitor: ["Explaining the rule", "Using the key card", "Ready to compare numbers"],
        connect: "Where at home does one digit's position change a value?",
        misconception: "Remembering the story but not the ten-times rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [which, setWhich] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The digit that moved one chair"
            text="Omar and Zayd replay the census line in the lantern. One digit slides a single place left — and the district count changes tenfold. The digit never changed.\n"
            clue="What changed: the digit, or its chair?">
            <NoticeWonder draw={drawSlide} height={238} award={award}
              notices={["The digit stayed 7", "It moved one place", "Its value changed", "The count changed tenfold"]}
              wonders={["Why does moving change the value?", "What would sliding right do?", "Does it work for every digit?"]}
              footnote="The lantern shows the motion. The class must name the mathematical reason." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="A clerk needs a key, not a guess"
            text="The census office's place-value key is damaged. Omar marks the district figures as simulated planning data — then asks how much bigger the left 7 really is.\n"
            clue="Lock a prediction before the frame moves">
            <LaunchEstimate draw={drawTwoSevens} height={235} award={award}
              label="How many times bigger is the left 7's value than the right 7's?"
              min={2} max={12} start={6} unit="times"
              after="Locked. Now build the evidence instead of waiting for a reveal."
              note="District counts here are simulated planning data — the rule works on any number." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds the ten-times staircase"
            text="One step up is ten blocks of the step below. He can climb it, but the class must predict each step's value before selecting.\n"
            clue="The ×10 arrows are the rule in picture form">
            <ExploreChips draw={makeTenTimes(step, setStep)} height={225}
              label="Climb the staircase — which place are you on?"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "ones" }, { v: 1, label: "tens" }, { v: 2, label: "hundreds" }, { v: 3, label: "thousands" }]}
              caption={<MathEl omml={M.rule} size="lg" display="block" />}
              footnote="Each step is worth ten times the step to its right." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar reads the value chain"
            text="Three 6s, three different values. He wants each one proven — the digit alone is not evidence.\n"
            clue="Digit and value are two pieces of the same card">
            <ExploreChips draw={makeValueChain(which, setWhich)} height={225}
              label="Pick a 6 in 666 and prove its value"
              value={which}
              onPick={(v) => setWhich(v)}
              chips={[{ v: 0, label: "the 6 in the hundreds" }, { v: 1, label: "the 6 in the tens" }, { v: 2, label: "the 6 in the ones" }]}
              caption={<MathEl omml={M.sixHundred} size="lg" display="block" />}
              footnote="The chain works backwards too: ÷10 one place right." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="Water blurred three key cards"
            text="Omar reads each relationship aloud while Zayd checks it with division. The class must commit before the folio marks a repair.\n"
            clue="A repair that survives ÷10 is a real repair">
            <CardSort award={award} columns={3} commitLabel="Seal the three repairs"
              items={[
                { id: "s1", text: "7,000 = 10 × ?", target: "t1" },
                { id: "s2", text: "600 = 10 × ?", target: "t2" },
                { id: "s3", text: "40 = 10 × ?", target: "t3" }
              ]}
              targets={[
                { id: "t1", label: "700" },
                { id: "t2", label: "60" },
                { id: "t3", label: "4" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest ten-times methods now come from students in this room. Compare them, then preserve one in the Sijill.\n"
            clue="Two representations, one relationship">
          <CompareConnect award={award}
            left={{
              name: "Hassan's way — climb the staircase", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 400, 0, 140);
                D.txt(ctx, "1 → 10 → 100 → 1,000", W / 2, H / 2 - 8, { size: 19, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "each step ×10", W / 2, H / 2 + 22, { size: 11, col: "#C9A227", font: "marker", alpha: D.at(frame % 400, 120, 220) });
              },
              quote: "I climb one step and the value jumps ten times."
            }}
            right={{
              name: "Musa's way — write it and check it", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 400, 0, 140);
                D.txt(ctx, "7,000 = 10 × 700", W / 2, H / 2 - 14, { size: 18, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "7,000 ÷ 700 = 10", W / 2, H / 2 + 18, { size: 13, col: "#34D399", font: "marker", alpha: D.at(frame % 400, 160, 280) });
              },
              quote: "I write the ×10, then check it with ÷10."
            }}
            same={["Both use the ten-times relationship",
                   "Both work for any digit in any place",
                   "Both can check the answer backwards"]}
            diff={["Hassan climbs blocks, Musa writes symbols",
                   "Hassan shows the jump, Musa shows the proof",
                   "Musa's check works when the blocks are too big"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The shared rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods.\n"
            clue="Left ×10 · right ÷10">
            <BoardScreen draw={drawBoard12} height={380}
              caption="The ten-times rule — not a story click — restores the key." />
          </StoryShell>
        );

      case 7:
        return (
          <STEMWindow window={STORY && STORY.stemWindows && STORY.stemWindows[0]}>
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "each place is 10 times the place on its right" },
                      { omml: M.chain, alt: "1, 10, 100, 1,000" }]}
              hand={"Left = ×10 · Right = ÷10 · check both directions"}
              cards={[
                { title: "The rule", omml: M.tenTimes, note: "7,000 is ten 700s" },
                { title: "The check", omml: M.divideBack, note: "divide back to verify" }
              ]} />
          </STEMWindow>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar stamps only a card he can defend"
            text="The missing key card must hold the ten-times relationship. Give the reason before the teacher reveals the model.\n"
            clue="This card joins the census key in the folio">
            <ShowWhatYouKnow award={award}
              prompt="The census key card is damaged: 3,000 = 10 × ? Which value completes it?"
              options={[{ v: "a", text: "30" }, { v: "b", text: "300" }, { v: "c", text: "3,000" }, { v: "d", text: "30,000" }]}
              right="b"
              support={{
                yes: "Yes — 3,000 ÷ 10 = 300, and 300 × 10 = 3,000. The 300 sits in the hundreds.",
                notYet: "Not yet — check both directions: ×10 going left, ÷10 going right.",
                draw: drawSupport12, h: 84,
                hint: "Which place is the 300 in?"
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The place-value key is restored"
            text="Omar files the key into the Evidence Folio. Zayd points at two district cards in the lantern projection — each claims to serve the bigger count.\n"
            artifact="Population and services brief · place-value key"
            next="Two districts, one clinic — which number is really bigger, and what settles it?">
            <Closing game={game} omml={M.swykStatement}
              action="Find a number where moving one digit one place changes its value. Record what the ten-times rule says about it." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
