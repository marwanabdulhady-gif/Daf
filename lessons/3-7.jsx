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

const makeChooser = (id, onId) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onId) { const order = ["near", "round", "messy"]; D.tap(ctx, { x: W / 2 - 150, y: 130, w: 300, h: 40, value: 0, on: () => { const i = order.indexOf(id); onId(order[(i + 1) % order.length]); } }); }
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

const makeCompare3 = (n, onN) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [
    ["partial products", "1,800 + 240 + 42", 3, "#2D70B3"],
    ["overshoot", "6 × 350 − 6 × 3", 2, "#FA7E19"],
    ["repeated addition", "347 six times", 6, "#C74440"]
  ];
  rows.forEach(function (r, k) {
    var a = k < n ? 1 : 0.18;
    if (onN) D.tap(ctx, { x: 70, y: 62 + k * 52 - 16, w: W - 140, h: 40, value: k + 1, on: function (v) { onN(v); } });
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
    { phase: "warmup", title: "Three methods at the <em>gate</em>",
      lead: "Three contractors stand at the gate with one order each: 7 × 99, 4 × 250 and 6 × 347. Each holds a different strategy.",
      goal: "Notice the numbers before the methods — the numbers pick the method.",
      pull: "Look at the numbers before you choose a method.",
      rail: { launch: "Fictional frame. Just read the three orders — no working yet.",
        monitor: ["Noticing 99 is near 100", "Spotting the 25 inside 250", "Calling 347 messy"],
        connect: "Would you work all three the same way?",
        misconception: "Using one method for every product out of habit." } },

    { phase: "launch", title: "Estimate <em>7 × 99</em> first",
      lead: "The first contractor's order: 7 × 99. Estimate before the method is chosen.",
      goal: "Create the need — one of these three barely needs any work at all.",
      pull: "One of these three barely needs any work at all.",
      rail: { launch: "Give the estimate and what the 99 made you think of.",
        monitor: ["Rounding 99 to 100", "Saying the answer is a bit less", "Estimating by rows"],
        connect: "Why is 99 almost free to multiply?",
        misconception: "Estimating 7 × 99 as 630 — the wrong direction." } },

    { phase: "monitor", title: "The <em>chooser</em>",
      lead: "Tap a product and the method that suits it appears — the feature in the numbers does the choosing.",
      goal: "Match each product to the strategy its numbers invite.",
      pull: "The feature you spot in the numbers is what picks the method.",
      rail: { launch: "Before you tap: say what the numbers have.",
        monitor: ["Naming the near-hundred", "Naming the hidden fact", "Naming the messy digits"],
        connect: "What did each method borrow from the numbers?",
        misconception: "Choosing by speed of memory instead of the numbers." } },

    { phase: "monitor", title: "Three methods, <em>one</em> product",
      lead: "6 × 347 three ways: partial products, overshoot, repeated addition. Correct is not the same as efficient.",
      goal: "Compare methods on the same product and judge efficiency.",
      pull: "Correct is not the same as efficient.",
      rail: { launch: "Predict which method is longest before you reveal it.",
        monitor: ["Following the partials", "Following the overshoot", "Counting the repeated additions"],
        connect: "Which method would you trust for a check, and which for speed?",
        misconception: "Believing the first correct method is always the best." } },

    { phase: "monitor", title: "Match the <em>method</em>",
      lead: "Three new products at the gate. Each one invites exactly one strategy.",
      goal: "Choose the strategy from the numbers, on purpose.",
      pull: "Read the numbers, then the method.",
      rail: { launch: "Say the feature before you place the product.",
        monitor: ["Spotting 98 near 100", "Spotting the 25 fact", "Sending 463 to partials"],
        connect: "Which product could actually use two methods?",
        misconception: "Sorting by the size of the answer." } },

    { phase: "connect", title: "Sara <em>overshoots</em>. Omar <em>splits</em>",
      lead: "Sara: 7 × 100 − 7. Omar: split the 99 into 90 and 9. Both get 693.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the two routes", "Checking both reach 693", "Saying when each helps"],
        connect: "Which method would you use for 7 × 102?",
        misconception: "Believing overshoot works in both directions." } },

    { phase: "synth", title: "On the <em>board</em>: the numbers pick the method",
      lead: "Read the numbers. Find the feature. Choose the method that uses it.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the feature", "Choosing the method", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Choosing the method before reading the numbers." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "Look at the numbers before you choose a method.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the feature first", "Choosing overshoot for 198", "Saying what to take off"],
        connect: "What feature does 198 have?",
        misconception: "Overshooting without taking back the full amount." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "8 × 198 — which strategy suits it, and what do you take off?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Name the feature, then the method.",
        monitor: ["Stretching 198 to 200", "Counting eight twos", "Subtracting 16 from 1,600"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Taking off 2 instead of 16 — one extra per row." } },

    { phase: "connect", title: "The contract is <em>earned</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the grove model stands — the council will defend a claim.",
      rail: { launch: "Ask three students to say how they choose.",
        monitor: ["Able to explain the choice", "Still uses one method always", "Ready for the grove model"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [id, setId] = useState("near");
    const [n, setN] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Three methods at the gate"
            text="Three contractors stand at the gate with one order each: 7 × 99, 4 × 250 and 6 × 347. Each holds a different strategy."
            clue="The numbers pick the method">
            <NoticeWonder draw={drawShop} height={252} award={award}
              notices={["99 is nearly 100", "250 has a 25 in it", "347 looks messy", "They are all times a single digit"]}
              wonders={["Would I do them the same way?", "Which is quickest?", "Is there a rule for choosing?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The first contractor's order"
            text="Omar takes the first slip — 7 × 99 — and asks for the estimate before any method is chosen."
            clue="One of these three barely needs any work at all.">
            <LaunchEstimate draw={drawShop} height={252} award={award}
              label="Estimate 7 × 99" min={400} max={1000} start={700} unit=""
              after="Locked. Now let us match each product to a method."
              note="The order counts are simulated — the choosing works on any product." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd runs the chooser"
            text="He can tap any product — the class must say what feature in the numbers picks the method."
            clue="The feature you spot in the numbers is what picks the method">
            <ExploreChips draw={makeChooser(id, setId)} height={252}
              label="Tap a product"
              value={id}
              onPick={(v) => setId(v)}
              chips={CASES.map((c) => ({ v: c.id, label: c.label }))}
              caption={<MathEl omml={id === "near" ? M.nearWork : id === "round" ? M.roundWork : M.messyWork} size="lg" display="block" />}
              footnote="The feature you spot in the numbers is what picks the method." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Three methods, one product"
            text="6 × 347 three ways. Zayd reveals each method — the class must judge which is efficient, not just correct."
            clue="Correct is not the same as efficient">
            <ExploreChips draw={makeCompare3(n, setN)} height={252}
              label="Reveal each method for 6 × 347"
              value={n}
              onPick={(v) => setN(v)}
              chips={[{ v: 1, label: "partial products" }, { v: 2, label: "+ overshoot" }, { v: 3, label: "+ repeated addition" }]}
              caption={<MathEl omml={M.messyWork} size="lg" display="block" />}
              footnote="Correct is not the same as efficient." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the method"
            text="Three more products arrive at the gate. Each one invites exactly one strategy."
            clue="Read the numbers, then the method">
            <CardSort award={award} columns={3}
              items={[
                { id: "c1", text: "9 × 98", target: "over" },
                { id: "c2", text: "4 × 25", target: "fact" },
                { id: "c3", text: "7 × 463", target: "partial" }
              ]}
              targets={[
                { id: "over", label: "overshoot and take back" },
                { id: "fact", label: "a fact I already know" },
                { id: "partial", label: "partial products" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two contractors, one 693"
            text="Sara overshoots to 100 and takes back. Omar splits the 99 into 90 and 9. Both get 693."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Sara's way — overshoot", omml: M.nearWork, h: 92,
                      quote: "99 is one away from 100, so I did 700 minus 7." }}
              right={{ name: "Omar's way — partial products", omml: M.messyWork, h: 92,
                       quote: "I split 99 into 90 and 9 and multiplied both." }}
              same={["Both get 693", "Both are correct", "Both use place value somewhere"]}
              diff={["Sara does two steps, Omar does three", "Omar's method always works",
                     "Sara's only helps when a factor is near a ten"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The choosing is drawn, not declared"
            text="Zayd builds only what the class can justify: the feature named, the method chosen, the product protected."
            clue="The numbers pick the method">
            <BoardScreen draw={drawBoard37} height={430}
              caption="Look at the numbers before you choose a method." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the grove plan with its reason, not alone."
            clue="The feature in the numbers does the choosing">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "look at the numbers before you choose a method" }]}
              hand={"read the numbers · name the feature · choose the method that uses it"}
              cards={[
                { title: "The near-hundred case", omml: M.nearWork, note: "700, then take off 7" },
                { title: "Tap to see the hidden fact", omml: M.round, revealOmml: M.roundWork, reveal: true,
                  note: "4 × 25 = 100, so 4 × 250 = 1,000" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar chooses for 8 × 198"
            text="The last slip at the gate. Name the feature — then the method — then what you take off."
            clue="Stretching 198 to 200 adds 2 to each of the 8 rows">
            <ShowWhatYouKnow award={award}
              prompt="Which strategy suits 8 × 198 best, and what do you take off?"
              omml={M.swyk}
              options={[{ v: "a", text: "take off 2" }, { v: "b", text: "take off 16" }, { v: "c", text: "take off 8" }, { v: "d", text: "no shortcut" }]}
              right="b"
              support={{
                yes: "Yes — 8 × 200 = 1,600, take off 8 × 2 = 16, so 1,584.",
                notYet: "Not yet — you added 2 to each of the eight groups.",
                draw: drawSupport37, h: 96,
                hint: "Stretching 198 to 200 adds 2 to every one of the 8 rows."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The contract is earned"
            text="Omar signs the order with the method named beside it. The grove's final model waits for the council — and inside the model, a rolled blueprint of a workshop tower."
            artifact="Grove plan · strategies chosen by the numbers"
            next="The grove model stands before the council — and a rolled blueprint inside the model shows a two-digit workshop tower.">
            <Closing game={game} omml={M.rule}
              action="Choose the method for a real product tonight and say the feature that made you choose." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
