/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-8 · Multiply a Whole Number by a Fraction
   Standard 5.NF.B.4a   I can ... find a fraction of a whole number, and see
   why the answer is smaller than the number I started with.
   =========================================================================== */

const M = {
  problem: om(mfrac(3, 4), mnor(" of 12")),
  divideFirst: om(mnor("12 \u00f7 4 = 3, then 3 \u00d7 3 = 9")),
  multiplyFirst: om(mnor("3 \u00d7 12 = 36, then 36 \u00f7 4 = 9")),
  answer: om(mfrac(3, 4), mt("\u00d712="), mt("9")),
  smaller: om(mnor("multiplying by a fraction under one makes the answer smaller")),
  ofMeans: om(mnor("\u201cof\u201d means multiply, even with fractions")),
  rule: om(mnor("divide by the denominator \u00b7 multiply by the numerator")),
  swyk: om(mfrac(2, 3), mnor(" of 15")),
  swykAnswer: om(mt("15\u00f73=5"), mnor(", then "), mt("2\u00d75=10"))
};

/* twelve counters, grouped into quarters */
const makeGroups178 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const total = 12, cols = 4, per = 3;
  const gw = (W - 120) / cols;
  const taken = step === 0 ? 0 : step === 1 ? 0 : 9;

  for (let g = 0; g < cols; g++) {
    const gx = 60 + g * gw;
    if (step >= 1) {
      ctx.save();
      ctx.globalAlpha = 0.9;
      D.rr(ctx, gx + 6, 54, gw - 14, 92, 9);
      ctx.strokeStyle = step >= 2 && g < 3 ? "#388C46" : "rgba(234,244,242,.35)";
      ctx.lineWidth = step >= 2 && g < 3 ? 2.4 : 1.4;
      ctx.stroke();
      ctx.restore();
      D.txt(ctx, "1/4", gx + gw / 2, 164,
        { size: 12, col: step >= 2 && g < 3 ? "#388C46" : "rgba(234,244,242,.5)", font: "marker" });
    }
    for (let c = 0; c < per; c++) {
      const idx = g * per + c;
      const on = step < 2 || idx < taken;
      const a = Math.min(1, Math.max(0, (frame / 5 - idx * 3) / 10)) * 0.3 + 0.7;
      ctx.save();
      ctx.globalAlpha = a * (on ? 1 : 0.22);
      ctx.beginPath();
      ctx.arc(gx + gw / 2, 78 + c * 30, 11, 0, Math.PI * 2);
      ctx.fillStyle = step >= 2 && on ? "#388C46" : "#2D70B3";
      ctx.fill();
      ctx.restore();
    }
  }
  D.txt(ctx, ["twelve counters", "shared into four equal groups",
    "three of the four groups taken"][step],
    W / 2, 28, { size: 13.5, col: "rgba(234,244,242,.68)", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, step === 2 ? "three quarters of 12 is 9" : step === 1 ? "each group is three counters"
       : "what is three quarters of them?",
    W / 2, H - 14, { size: 14, col: step === 2 ? "#34D399" : "#C9A227", font: "marker",
      alpha: pulse + 0.4 });
};

/* two orders of operations, same answer */
const makeOrder178 = (way) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const lines = way === "divide"
    ? [["12 \u00f7 4 = 3", "one quarter of twelve"], ["3 \u00d7 3 = 9", "three of those quarters"]]
    : [["3 \u00d7 12 = 36", "three whole lots of twelve"], ["36 \u00f7 4 = 9", "then cut into four"]];

  D.txt(ctx, way === "divide" ? "divide first, then multiply" : "multiply first, then divide",
    W / 2, 32, { size: 14.5, col: "#C9A227", font: "marker" });
  lines.forEach((L, k) => {
    D.txt(ctx, L[0], W / 2, 86 + k * 62,
      { size: 26, col: k ? "#34D399" : "#2D70B3", font: "marker" });
    D.txt(ctx, L[1], W / 2, 112 + k * 62,
      { size: 11.5, col: "rgba(234,244,242,.62)", font: "marker" });
  });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, way === "divide" ? "the numbers stay small all the way"
       : "correct, but 36 is bigger than anything in the question",
    W / 2, H - 14, { size: 13, col: way === "divide" ? "#34D399" : "#FA7E19", font: "marker",
      alpha: pulse + 0.4 });
};

const drawWarm178 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  for (let k = 0; k < 12; k++) {
    const a = D.at(f, 20 + k * 26, 110 + k * 26);
    if (a <= 0) continue;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.arc(74 + (k % 6) * ((W - 148) / 5), 92 + Math.floor(k / 6) * 52, 13, 0, Math.PI * 2);
    ctx.fillStyle = "#6042A6"; ctx.fill();
    ctx.restore();
  }
  D.txt(ctx, "twelve counters on the table", W / 2, 30,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 440, 530) });
};

const drawStory178 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "twelve dates in the lunchbox", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let k = 0; k < 12; k++) {
    const a = D.at(f, 50 + k * 24, 140 + k * 24);
    if (a <= 0) continue;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.arc(74 + (k % 6) * ((W - 148) / 5), 84 + Math.floor(k / 6) * 50, 13, 0, Math.PI * 2);
    ctx.fillStyle = "#FA7E19"; ctx.fill();
    ctx.restore();
  }
  if (p3 > 0) {
    D.txt(ctx, "Khalil eats three quarters of them. how many is that?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard178 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Divide by the bottom, multiply by the top" });
  const p1 = D.at(f, 20, 260), p2 = D.at(f, 300, 520), p3 = D.at(f, 560, 760), p4 = D.at(f, 780, 920);
  const cols = 4, gw = (W - 340) / cols, x0 = 170;

  for (let g = 0; g < cols; g++) {
    const gx = x0 + g * gw;
    const a = D.at(f, 20 + g * 60, 130 + g * 60);
    if (a <= 0) continue;
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, gx + 8, 100, gw - 18, 108, 10);
    ctx.strokeStyle = p2 > 0 && g < 3 ? "#388C46" : "rgba(234,244,242,.35)";
    ctx.lineWidth = p2 > 0 && g < 3 ? 2.4 : 1.4;
    ctx.stroke();
    ctx.restore();
    for (let c = 0; c < 3; c++) {
      ctx.save();
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(gx + gw / 2, 126 + c * 32, 12, 0, Math.PI * 2);
      ctx.fillStyle = p2 > 0 && g < 3 ? "#388C46" : "#2D70B3";
      ctx.fill();
      ctx.restore();
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "12 \u00f7 4 = 3        3 \u00d7 3 = 9", W / 2, 268,
      { size: 24, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "three quarters of 12 is 9", W / 2, 320,
      { size: 22, col: "#34D399", font: "marker", alpha: p4 });
    D.txt(ctx, "the answer is smaller than 12, because we took less than the whole",
      W / 2, H - 24, { size: 14.5, col: "rgba(234,244,242,.78)", font: "marker", alpha: D.at(f, 840, 930) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 870, 940), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport178 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "15 \u00f7 3 = 5", W / 2 - 80, 34, { size: 20, col: "#2D70B3", font: "marker" });
  D.txt(ctx, "2 \u00d7 5 = 10", W / 2 + 80, 34, { size: 20, col: "#34D399", font: "marker" });
  D.txt(ctx, "one third of fifteen is five, so two thirds is ten", W / 2, H - 10,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "17-8",
  storageKey: "daf-g4-t17-l8",
  title: "Multiply a Whole Number by a Fraction",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-8 · 5.NF.B.4a",
  math: M,
  ixl: ["NJE"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Twelve counters appear on the table. No question yet.",
      goal: "Establish the whole before any fraction of it is asked for.",
      pull: "Twelve is a very shareable number.",
      rail: { launch: "Describe what you see. Do not group them yet.",
        monitor: ["Counting twelve", "Suggesting groupings", "Noticing twelve divides well"],
        connect: "How many equal groups could twelve make?",
        misconception: "Counting the arrangement rather than the total." } },

    { phase: "launch", title: "Twelve dates in the <em>lunchbox</em>",
      lead: "Khalil eats three quarters of the twelve dates. Estimate how many that is.",
      goal: "Create the need for finding a fraction of a whole number.",
      pull: "Now let us group them.",
      rail: { launch: "More or fewer than six? Commit before you calculate.",
        monitor: ["Estimating nine", "Estimating three", "Reasoning from a half"],
        connect: "Must the answer be less than twelve? Why?",
        misconception: "Expecting multiplication to make the answer bigger." } },

    { phase: "monitor", title: "Group, then <em>take</em>",
      lead: "The denominator says how many groups. The numerator says how many to take.",
      goal: "The two numbers of a fraction do two different jobs.",
      pull: "Does the order of the two steps matter?",
      rail: { launch: "How many groups does the four ask for?",
        monitor: ["Making four groups", "Taking three of them", "Counting the result"],
        connect: "Which number made the groups, and which took them?",
        misconception: "Taking four groups because the denominator is four." } },

    { phase: "monitor", title: "Divide first, or <em>multiply</em> first?",
      lead: "Both orders reach nine. One keeps the numbers small.",
      goal: "Order is a choice, not a rule.",
      pull: "Now judge some answers.",
      rail: { launch: "Predict which order you would rather do in your head.",
        monitor: ["Dividing first", "Multiplying first", "Noticing both give nine"],
        connect: "Which order would you choose for 3/4 of 400?",
        misconception: "Believing only one order is allowed." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Practise the size sense that catches wrong answers.",
      pull: "Two students found the same answer differently.",
      rail: { launch: "For each one ask: should the answer be bigger or smaller than the whole?",
        monitor: ["Checking the size", "Recomputing", "Sketching the groups"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Giving an answer bigger than the whole number." } },

    { phase: "connect", title: "Two ways to <em>get nine</em>",
      lead: "Qais divided then multiplied. Ibrahim multiplied then divided.",
      goal: "Both routes are correct; one is friendlier mentally.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one they would do without paper.",
        monitor: ["Dividing first", "Multiplying first", "Comparing the two"],
        connect: "Why does dividing first keep the numbers small?",
        misconception: "Thinking the two routes give different answers." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Four groups of three. Take three of them. Nine.",
      goal: "The moment fraction-of-a-whole is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Group the counters with them.",
        monitor: ["Predicting the group size", "Taking three groups", "Naming the answer"],
        connect: "Who can say what each number of the fraction did?",
        misconception: "Learning the rule without the grouping picture." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Two steps, and every fraction of a whole number falls out.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Dividing by the denominator", "Multiplying by the numerator", "Checking the size"],
        connect: "Why is the answer smaller than the whole?",
        misconception: "Assuming multiplication always increases." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on fraction of a whole.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Divide by three first.",
        monitor: ["Dividing 15 by 3", "Multiplying by 2", "Answering 5"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 5 by stopping after the division." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: dividing a whole number by a unit fraction.",
      rail: { launch: "Three students state the two steps.",
        monitor: ["Divides then multiplies", "Stops after one step", "Ready to divide"],
        connect: "Who is finding a fraction of something at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [way, setWay] = useState("divide");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm178} height={256} award={award}
          notices={["There are twelve counters", "They are in two rows", "Twelve shares evenly", "They are all the same"]}
          wonders={["How many groups could I make?", "What is half of them?", "What is three quarters?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory178} height={256} award={award}
          label="How many dates does Khalil eat?" min={1} max={12} start={6} unit="dates"
          after="Locked. Now let us group them properly."
          note="Three quarters is more than a half, and less than all of them." />;

      case 2:
        return <ExploreChips draw={makeGroups178(step)} height={256}
          label="Group them, then take some" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "twelve counters" }, { v: 1, label: "four equal groups" },
                  { v: 2, label: "take three groups" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="The bottom number makes the groups. The top number takes them." />;

      case 3:
        return <ExploreChips draw={makeOrder178(way)} height={256}
          label="Which order?" value={way}
          onPick={(v) => setWay(v)}
          chips={[{ v: "divide", label: "divide first" }, { v: "multiply", label: "multiply first" }]}
          caption={<MathEl omml={M.divideFirst} size="lg" display="block" />}
          footnote="Both are correct — dividing first keeps the numbers small." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "f1", text: "3/4 of 12 = 9", target: "yes" },
                  { id: "f2", text: "3/4 of 12 = 36", target: "no" },
                  { id: "f3", text: "2/3 of 15 = 10", target: "yes" },
                  { id: "f4", text: "2/3 of 15 = 45", target: "no" }]}
          targets={[{ id: "yes", label: "smaller than the whole, as it must be" },
                    { id: "no", label: "not yet — that is bigger than the whole" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Qais's way — divide then multiply", omml: M.divideFirst, h: 92,
            quote: "A quarter of twelve is three, and three of those is nine." }}
          right={{ name: "Ibrahim's way — multiply then divide", omml: M.multiplyFirst, h: 92,
            quote: "Three twelves is thirty six, and a quarter of that is nine." }}
          same={["Both give 9", "Both use the same two numbers", "Both are correct"]}
          diff={["Qais's numbers stay small", "Ibrahim's grow first", "Qais's is easier in your head"]} />;

      case 6:
        return <BoardScreen draw={drawBoard178} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "divide by the denominator, then multiply by the numerator" }]}
          hand={"the bottom makes the groups · the top takes them · check the answer is smaller"}
          cards={[{ title: "The amount we found", omml: M.answer, note: "three quarters of twelve" },
                  { title: "Tap for the surprise", omml: M.ofMeans, revealOmml: M.smaller, reveal: true,
                    note: "multiplying does not always make things bigger" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is two thirds of 15?" omml={M.swyk}
          options={[{ v: "a", text: "5" }, { v: "b", text: "10" }, { v: "c", text: "30" }, { v: "d", text: "45" }]}
          right="b"
          support={{ yes: "Yes — 15 ÷ 3 = 5, then 2 × 5 = 10.",
            notYet: "Not yet — dividing is only the first step; you still have to take two groups.",
            draw: drawSupport178, h: 96, hint: "One third is five, so two thirds is ten." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Count a group of objects at home and find three quarters of them." />;

      default: return null;
    }
  }
};
