/* ===========================================================================
   SAVVAS enVision Mathematics · Grade 4 · Topic 1
   LESSON 1-2 · Place Value Relationships                Standard: 4.NBT.A.1
   I can ... recognise that a digit in one place is worth ten times what the
            same digit is worth in the place to its right.
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
  fourty: om(mt("40=10×4")),
  swykStatement: om(mt("3,300")),
  swykWork: om(mt("3,000=10×300"))
};

/* ---- drawings ------------------------------------------------------------ */

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
const makeTenTimes = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();

  const units = [1, 10, 100, 1000];
  const names = ["one", "ten", "hundred", "thousand"];
  const cols = ["#C9A227", "#2D70B3", "#6042A6", "#388C46"];
  const slotW = W / 4;
  const base = H - 58;      /* every block sits on this line */
  const s = 8;

  D.marker(ctx, [[18, base + 3], [W - 18, base + 3]], 1, "rgba(234,244,242,.18)", 1.2);

  for (let i = 0; i < 4; i++) {
    const cx = slotW * i + slotW / 2;
    const on = i <= step;
    const live = i === step;
    const a = on ? (live ? 0.75 + Math.sin(frame / 15) * 0.25 : 1) : 0.16;

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
const makeValueChain = (idx) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvChart(ctx, { x: 26, y: 26, w: W - 52, digits: "666", slots: 3, prog: 1, highlight: idx, t: frame, rowH: 34 });
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
    { phase: "warmup",
      title: "Which one <em>doesn't belong</em>?",
      lead: "In three of these the 3 is worth the same. Pick a card and defend it.",
      goal: "Reasoning before answers — no card is wrong.",
      pull: "The same digit does not always mean the same amount.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reasoning from the position", "Reasoning from the value", "Counting the digits after it"],
        connect: "Can every card be the odd one out?",
        misconception: "Judging by the size of the whole number instead of the place of the 3." } },

    { phase: "launch",
      title: "Two sevens in <em>7,700</em>",
      lead: "Same digit, written twice. Are they worth the same?",
      goal: "Create the need — position changes value.",
      pull: "How many times bigger? Let us build it.",
      rail: { launch: "Point at the left 7 and the right 7. Are they the same?",
        monitor: ["Saying they are the same because the digit is the same", "Naming 7,000 and 700", "Saying ten times without proof"],
        connect: "How could we prove one is ten times the other?",
        misconception: "Same digit means same value. Do not correct it — ask for proof." } },

    { phase: "monitor",
      title: "The <em>ten times</em> machine",
      lead: "Step up one place at a time. Watch the blocks.",
      goal: "See the ten-times relationship physically before naming it.",
      pull: "Now find the same pattern inside one number.",
      rail: { launch: "Predict the next block before you tap.",
        monitor: ["Counting the blocks", "Noticing each is ten of the last", "Predicting ten thousand"],
        connect: "What stays the same each time you step up?",
        misconception: "Thinking each block adds ten rather than multiplies by ten." } },

    { phase: "monitor",
      title: "One digit, <em>three values</em>",
      lead: "666 has three sixes. Tap each one.",
      goal: "The place decides the value, not the digit.",
      pull: "Two students explained this differently. Let us compare.",
      rail: { launch: "Predict the value before you tap.",
        monitor: ["Reading the value from the chart", "Counting zeros", "Using times ten between places"],
        connect: "How do you get from 60 to 600?",
        misconception: "Saying the middle 6 is worth 6." } },

    { phase: "monitor",
      title: "Match the <em>value</em> to the number",
      lead: "In which number is the 6 worth that much? No grading until the class commits.",
      goal: "Apply the relationship in an unfamiliar order.",
      pull: "Now let us write the rule down properly.",
      rail: { launch: "There is no single right order — only a right match.",
        monitor: ["Counting places from the right", "Using the chart", "Trial and error, then checking"],
        connect: "Which place did you look at first, and why?",
        misconception: "Matching by the position on the page instead of the place value." } },

    { phase: "connect",
      title: "Two ways to <em>show it</em>",
      lead: "Noura multiplied. Faisal divided. Both prove the same thing.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Seeing multiply and divide as the same fact", "Preferring the blocks", "Generalising to any place"],
        connect: "Where does the number 10 appear in both?",
        misconception: "Treating multiplying and dividing as unrelated." } },

    { phase: "synth",
      title: "On the <em>board</em>",
      lead: "Mark both sevens. Write what each is worth. Then draw the jump between them.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Linking back to the blocks", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Memorising add a zero with no meaning attached." } },

    { phase: "synth",
      title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Linking to the blocks", "Testing it on a fresh number", "Asking what happens going right"],
        connect: "What happens if you move one place to the right instead?",
        misconception: "Using the rule only left to right." } },

    { phase: "swyk",
      title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write your thinking, not just your answer.",
        monitor: ["Using the chart", "Using times ten", "Checking with division"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 10 more instead of 10 times." } },

    { phase: "connect",
      title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: which of two big numbers is greater?",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the blocks", "Ready to compare numbers"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [idx, setIdx] = useState(0);

    switch (i) {
      case 0:
        return (
          <WODB award={award}
            prompt="In which of these is the 3 worth 300?"
            cards={[
              { id: "a", text: "1,342", why: "The 3 is in the hundreds place — worth 300" },
              { id: "b", text: "5,300", why: "The 3 is in the hundreds place — worth 300" },
              { id: "c", text: "8,043", why: "The only one where the 3 is worth 3, not 300" },
              { id: "d", text: "6,932", why: "The 3 is in the tens place — worth 30, and it is the only even-digit neighbour" }
            ]} />
        );

      case 1:
        return (
          <LaunchEstimate draw={drawTwoSevens} height={262} award={award}
            label="How many times bigger is the left 7 than the right 7?"
            min={2} max={20} start={5} unit="times"
            after="Locked. Now let us build the answer with blocks."
            note="Both digits are 7. Only their places are different." />
        );

      case 2:
        return (
          <ExploreChips draw={makeTenTimes(step)} height={260}
            label="Step up one place"
            value={step}
            onPick={(v) => setStep(v)}
            chips={[{ v: 0, label: "one" }, { v: 1, label: "ten" }, { v: 2, label: "hundred" }, { v: 3, label: "thousand" }]}
            caption={<MathEl omml={M.chain} size="xl" display="block" />}
            footnote="Each block is made of ten of the block before it." />
        );

      case 3:
        return (
          <ExploreChips draw={makeValueChain(idx)} height={250}
            label="Tap a 6 in 666"
            value={idx}
            onPick={(v) => setIdx(v)}
            chips={[{ v: 0, label: "left 6" }, { v: 1, label: "middle 6" }, { v: 2, label: "right 6" }]}
            caption={<MathEl omml={M.sixHundred} size="xl" display="block" />}
            footnote="Move one place left and the value is ten times bigger." />
        );

      case 4:
        return (
          <CardSort award={award} columns={3}
            items={[
              { id: "v1", text: "the 6 is worth 6,000", target: "n1" },
              { id: "v2", text: "the 6 is worth 600", target: "n2" },
              { id: "v3", text: "the 6 is worth 60", target: "n3" }
            ]}
            targets={[
              { id: "n1", label: "6,214" },
              { id: "n2", label: "2,613" },
              { id: "n3", label: "4,065" }
            ]} />
        );

      case 5:
        return (
          <CompareConnect award={award}
            left={{
              name: "Noura's way — multiply up", omml: M.tenTimes, h: 92,
              quote: "I started at 700 and multiplied by 10."
            }}
            right={{
              name: "Faisal's way — divide back", omml: M.divideBack, h: 92,
              quote: "I started at 7,000 and divided by 700."
            }}
            same={["Both use the number 10", "Both compare the same two sevens", "Both prove one is ten times the other"]}
            diff={["Noura multiplies, Faisal divides", "Noura starts small, Faisal starts big", "Division checks the multiplication"]} />
        );

      case 6:
        return <BoardScreen draw={drawBoard12} height={430} />;

      case 7:
        return (
          <RuleScreen award={award}
            ommls={[{ omml: M.rule, alt: "each place is ten times the place on its right" }]}
            hand={"move one place left · the value is ten times bigger · move one place right · it is ten times smaller"}
            cards={[
              { title: "The number we built", omml: M.tenTimes, note: "the two sevens in 7,700" },
              { title: "Tap to test it on tens", omml: M.fourty, revealOmml: M.sixHundred, reveal: true,
                note: "the rule works at every place" }
            ]} />
        );

      case 8:
        return (
          <ShowWhatYouKnow award={award}
            prompt="In 3,300, how does the value of the left 3 compare with the value of the right 3?"
            omml={M.swykStatement}
            options={[
              { v: "a", text: "10 more" }, { v: "b", text: "10 times as much" },
              { v: "c", text: "100 times as much" }, { v: "d", text: "the same" }
            ]}
            right="b"
            support={{
              yes: "Yes — 3,000 is 10 times 300.",
              notYet: "Not yet — put it in the chart and read both values.",
              draw: drawSupport12, h: 84,
              hint: "What is the left 3 worth? What is the right 3 worth? How do you get from one to the other?"
            }} />
        );

      case 9:
        return (
          <Closing game={game} omml={M.rule}
            action="Find a number at home with a repeated digit and tell someone what each one is worth." />
        );

      default:
        return null;
    }
  }
};
