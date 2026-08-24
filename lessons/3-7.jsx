/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-7 · Choose a Strategy to Multiply
   Standard 4.NBT.B.5   I can ... look at the numbers first, then choose the
   strategy that suits them.
   =========================================================================== */

const M = {
  near: om(mt("7\u00d799")),
  nearWork: om(mt("7\u00d7100-7=693")),
  round: om(mt("4\u00d7250")),
  roundWork: om(mt("4\u00d725=100"), mnor(", so "), mt("1,000")),
  messy: om(mt("6\u00d7347")),
  messyWork: om(mt("1,800+240+42=2,082")),
  rule: om(mnor("look at the numbers before you choose a method")),
  swyk: om(mt("8\u00d7198")),
  swykAnswer: om(mt("8\u00d7200-16=1,584"))
};

const CASES = [
  { id: "near", label: "7 × 99", why: "one factor sits just under a hundred",
    pick: "overshoot and take back", col: "#FA7E19", work: "7 × 100 = 700, take off 7 → 693" },
  { id: "round", label: "4 × 250", why: "a friendly fact is hiding inside",
    pick: "use a known fact", col: "#6042A6", work: "4 × 25 = 100, so 4 × 250 = 1,000" },
  { id: "messy", label: "6 × 347", why: "no shortcut — the digits are all awkward",
    pick: "partial products", col: "#2D70B3", work: "1,800 + 240 + 42 = 2,082" }
];

const makeChooser = (id) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const c = CASES.filter(function (k) { return k.id === id; })[0];
  D.txt(ctx, c.label, W / 2, 58, { size: 34, col: "#EAF4F2", font: "marker" });
  D.marker(ctx, [[W / 2 - 120, 82], [W / 2 + 120, 82]], 1, "rgba(201,162,39,.45)", 1.6);
  D.txt(ctx, c.why, W / 2, 108, { size: 14, col: "rgba(234,244,242,.75)", font: "marker" });
  ctx.save();
  ctx.globalAlpha = 0.6 + Math.sin(frame / 15) * 0.3;
  D.rr(ctx, W / 2 - 150, 130, 300, 40, 9);
  ctx.strokeStyle = c.col; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();
  D.txt(ctx, c.pick, W / 2, 150, { size: 16, col: c.col, font: "marker" });
  D.txt(ctx, c.work, W / 2, H - 20, { size: 15, col: "#34D399", font: "marker" });
};

const makeCompare3 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [
    ["partial products", "1,800 + 240 + 42", 3, "#2D70B3"],
    ["overshoot", "6 × 350 − 6 × 3", 2, "#FA7E19"],
    ["repeated addition", "347 six times", 6, "#C74440"]
  ];
  rows.forEach(function (r, k) {
    var a = k < n ? 1 : 0.18;
    D.txt(ctx, r[0], 70, 62 + k * 52, { size: 14, col: r[3], font: "marker", align: "left", alpha: a });
    D.txt(ctx, r[1], W / 2 + 40, 62 + k * 52, { size: 15, col: "#EAF4F2", font: "marker", alpha: a });
    for (var s = 0; s < r[2]; s++) {
      ctx.save();
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(W - 96 + (s % 3) * 15, 56 + k * 52 + Math.floor(s / 3) * 14, 4, 0, Math.PI * 2);
      ctx.fillStyle = r[3]; ctx.fill();
      ctx.restore();
    }
  });
  D.txt(ctx, "each dot is one step you have to do", W - 96, H - 44,
    { size: 10.5, col: "rgba(234,244,242,.55)", font: "mono", weight: 600 });
  D.txt(ctx, n === 3 ? "all three give 2,082 — they do not all cost the same"
                     : "reveal the next method",
    W / 2, H - 16, { size: 13.5, col: n === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawShop = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "three orders on one morning", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  CASES.forEach(function (c, k) {
    var a = D.at(p2, k * 0.28, k * 0.28 + 0.6);
    if (a <= 0) return;
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, 44, 52 + k * 52, W - 88, 42, 8);
    ctx.strokeStyle = c.col; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.restore();
    D.txt(ctx, c.label, 100, 73 + k * 52, { size: 19, col: "#EAF4F2", font: "marker", alpha: a });
    D.txt(ctx, c.why, W / 2 + 80, 73 + k * 52,
      { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: a });
  });
  if (p3 > 0) D.txt(ctx, "same operation, three different best methods", W / 2, H - 16,
    { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard37 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Read the numbers first" });
  const stages = [
    { p: [20, 170], q: "Is a factor near a ten or a hundred?", a: "overshoot and take back", col: "#FA7E19" },
    { p: [180, 330], q: "Is there a fact you already know inside it?", a: "use the fact and the place", col: "#6042A6" },
    { p: [340, 490], q: "Neither?", a: "partial products, every time", col: "#2D70B3" }
  ];
  var y = 108;
  stages.forEach(function (s) {
    var a = D.at(f, s.p[0], s.p[1]);
    if (a <= 0) { y += 76; return; }
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, 76, y - 24, W - 152, 56, 9);
    ctx.strokeStyle = s.col; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, s.q, W / 2 - 60, y + 2, { size: 14, col: "#EAF4F2", font: "marker", alpha: a });
    D.txt(ctx, s.a, W / 2 + 190, y + 2, { size: 13.5, col: s.col, font: "marker", alpha: a });
    y += 76;
  });
  var p4 = D.at(f, 520, 680);
  if (p4 > 0) {
    var yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the numbers choose the strategy — not the page you are on",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 560, 650) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 600, 700), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport37 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "8 × 198", W / 2, 26, { size: 22, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "198 is only 2 away from 200", W / 2, 54,
    { size: 13, col: "#C9A227", font: "marker" });
  D.txt(ctx, "8 × 200 = 1,600, then take off 8 × 2", W / 2, 78,
    { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const LESSON = {
  code: "3-7",
  storageKey: "daf-g4-t3-l7",
  title: "Choose a Strategy to Multiply",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-7 · 4.NBT.B.5",
  math: M,
  ixl: ["QKA", "G7M"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Three multiplications side by side. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "They are all multiplication. They do not all want the same treatment.",
      rail: { launch: "I am not asking you to solve any of them. Just look at the numbers.",
        monitor: ["Noticing 99 is near 100", "Noticing 25 inside 250", "Saying 347 looks hard"],
        connect: "Who noticed something nobody else did?",
        misconception: "Treating every product as the same kind of job." } },

    { phase: "launch", title: "Three orders, three <em>different jobs</em>",
      lead: "7 × 99, 4 × 250 and 6 × 347. Same operation, very different numbers.",
      goal: "Create the need — strategy choice is a decision, not a habit.",
      pull: "Estimate one of them, then we will pick methods.",
      rail: { launch: "Which of these three would you do first, and why that one?",
        monitor: ["Choosing the easiest", "Choosing left to right", "Spotting the near-hundred"],
        connect: "What made one of them look easier than the others?",
        misconception: "Using the most recently taught method for everything." } },

    { phase: "monitor", title: "Match the numbers to a <em>method</em>",
      lead: "Tap each product and see which strategy fits it.",
      goal: "Link a feature of the numbers to a choice of method.",
      pull: "Does the choice really save work? Let us count the steps.",
      rail: { launch: "Predict the method before you tap.",
        monitor: ["Spotting near numbers", "Spotting known facts", "Defaulting to one method"],
        connect: "What feature of the numbers did you look at first?",
        misconception: "Choosing by the size of the numbers alone." } },

    { phase: "monitor", title: "Count the <em>steps</em>",
      lead: "Three methods for 6 × 347. All correct. Not all cheap.",
      goal: "Efficiency is a real reason to choose.",
      pull: "Now sort some products by the strategy they deserve.",
      rail: { launch: "Predict which method has the fewest steps.",
        monitor: ["Counting steps", "Preferring the familiar", "Noticing repeated addition is worst"],
        connect: "Is the shortest method always the safest for you?",
        misconception: "Confusing fewest steps with easiest to get right." } },

    { phase: "monitor", title: "Sort by <em>strategy</em>",
      lead: "Which method does each product deserve? No grading until the class commits.",
      goal: "Apply the decision to unfamiliar numbers.",
      pull: "Two students chose differently on the same product.",
      rail: { launch: "Look at the numbers before you look at the options.",
        monitor: ["Spotting near-hundreds", "Spotting known facts", "Defaulting to partial products"],
        connect: "Which one was hardest to place, and why?",
        misconception: "Sorting by the size of the answer." } },

    { phase: "connect", title: "Two students, <em>two choices</em>",
      lead: "Sara overshot for 7 × 99. Omar used partial products. Both got 693.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Defending a choice", "Counting steps", "Changing their mind with reason"],
        connect: "Is Omar wrong? What would you say to him?",
        misconception: "Thinking a slower correct method is a mistake." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Ask three questions of the numbers, in order. The answer names your method.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Asking the questions in order", "Skipping to the last one", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Reading the flow chart as a rule rather than a habit of looking." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the feature they look for", "Testing on a new product", "Defending a choice"],
        connect: "Which strategy never lets you down, even when it is slow?",
        misconception: "Believing there is one best method for everything." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Name your strategy, then use it.",
        monitor: ["Spotting 198 near 200", "Using partial products", "Taking off 16"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Taking off 2 instead of 8 twos." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: turning a word problem into an equation.",
      rail: { launch: "Ask three students what they look at first.",
        monitor: ["Able to explain it to someone else", "Still defaults to one method", "Ready to model problems"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [id, setId] = useState("near");
    const [n, setN] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawShop} height={252} award={award}
          notices={["99 is nearly 100", "250 has a 25 in it", "347 looks messy", "They are all times a single digit"]}
          wonders={["Would I do them the same way?", "Which is quickest?", "Is there a rule for choosing?"]} />;

      case 1:
        return <LaunchEstimate draw={drawShop} height={252} award={award}
          label="Estimate 7 × 99" min={400} max={1000} start={700} unit=""
          after="Locked. Now let us match each product to a method."
          note="One of these three barely needs any work at all." />;

      case 2:
        return <ExploreChips draw={makeChooser(id)} height={252}
          label="Tap a product"
          value={id}
          onPick={(v) => setId(v)}
          chips={CASES.map((c) => ({ v: c.id, label: c.label }))}
          caption={<MathEl omml={id === "near" ? M.nearWork : id === "round" ? M.roundWork : M.messyWork} size="lg" display="block" />}
          footnote="The feature you spot in the numbers is what picks the method." />;

      case 3:
        return <ExploreChips draw={makeCompare3(n)} height={252}
          label="Reveal each method for 6 × 347"
          value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 1, label: "partial products" }, { v: 2, label: "+ overshoot" }, { v: 3, label: "+ repeated addition" }]}
          caption={<MathEl omml={M.messyWork} size="lg" display="block" />}
          footnote="Correct is not the same as efficient." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[
            { id: "c1", text: "9 × 98", target: "over" },
            { id: "c2", text: "4 × 25", target: "fact" },
            { id: "c3", text: "7 × 463", target: "partial" }
          ]}
          targets={[
            { id: "over", label: "overshoot and take back" },
            { id: "fact", label: "a fact I already know" },
            { id: "partial", label: "partial products" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Sara's way — overshoot", omml: M.nearWork, h: 92,
                  quote: "99 is one away from 100, so I did 700 minus 7." }}
          right={{ name: "Omar's way — partial products", omml: M.messyWork, h: 92,
                   quote: "I split 99 into 90 and 9 and multiplied both." }}
          same={["Both get 693", "Both are correct", "Both use place value somewhere"]}
          diff={["Sara does two steps, Omar does three", "Omar's method always works",
                 "Sara's only helps when a factor is near a ten"]} />;

      case 6:
        return <BoardScreen draw={drawBoard37} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "look at the numbers before you choose a method" }]}
          hand={"near a ten? overshoot \u00b7 a known fact inside? use it \u00b7 neither? partial products"}
          cards={[
            { title: "The easy one", omml: M.nearWork, note: "7 \u00d7 99 barely needs any work" },
            { title: "Tap for the one with no shortcut", omml: M.messy, revealOmml: M.messyWork, reveal: true,
              note: "partial products never lets you down" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Which strategy suits 8 × 198 best, and what do you take off?"
          omml={M.swyk}
          options={[{ v: "a", text: "take off 2" }, { v: "b", text: "take off 16" }, { v: "c", text: "take off 8" }, { v: "d", text: "no shortcut" }]}
          right="b"
          support={{
            yes: "Yes — 8 \u00d7 200 = 1,600, take off 8 \u00d7 2 = 16, so 1,584.",
            notYet: "Not yet — you added 2 to each of the eight groups.",
            draw: drawSupport37, h: 96,
            hint: "Stretching 198 to 200 adds 2 to every one of the 8 rows."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Pick any two numbers at home, say which strategy they deserve, then use it." />;

      default: return null;
    }
  }
};
