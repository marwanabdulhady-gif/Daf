/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-1 · Finding Sums and Differences with Mental Math
   Standard 4.NBT.B.4     I can ... use properties and compensation to add and
   subtract in my head.
   =========================================================================== */

const M = {
  problem: om(mt("199+46")),
  compensated: om(mt("200+45=245")),
  moveOne: om(mnor("move "), mt("1"), mnor(" across, the total does not change")),
  breakApart: om(mt("199+40+6")),
  assoc: om(mt("(199+1)+45")),
  sub: om(mt("245-99")),
  subComp: om(mt("246-100=146")),
  swyk: om(mt("298+57")),
  swykWork: om(mt("300+55=355"))
};

const money = (n) => n + " riyals";

/* Warm-Up / Launch: the canteen counter, two prices, then the swap */
const drawCanteen = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 100), p2 = D.at(f, 100, 250), p3 = D.at(f, 260, 420);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "school canteen", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });

  const items = [
    { name: "juice carton", v: 199, x: W * 0.3, col: "#FA7E19" },
    { name: "sandwich", v: 46, x: W * 0.7, col: "#2D70B3" }
  ];
  items.forEach((it, n) => {
    const a = D.at(p1, n * 0.3, n * 0.3 + 0.6);
    if (a <= 0) return;
    ctx.save();
    ctx.globalAlpha = a * 0.8;
    D.rr(ctx, it.x - 52, 46, 104, 54, 9);
    ctx.strokeStyle = it.col; ctx.lineWidth = 1.8; ctx.stroke();
    ctx.restore();
    D.txt(ctx, it.name, it.x, 64, { size: 11.5, col: it.col, font: "marker", alpha: a });
    D.txt(ctx, String(it.v), it.x, 88, { size: 22, col: "#EAF4F2", font: "marker", alpha: a });
  });

  if (p2 > 0) {
    D.txt(ctx, "199 + 46", W / 2, 132, { size: 22, col: "#EAF4F2", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    /* the single riyal hops across */
    const t = D.at(f, 260, 360);
    const x0 = items[1].x, x1 = items[0].x;
    const hx = x0 + (x1 - x0) * D.easeOut(t);
    const hy = 168 - Math.sin(Math.PI * t) * 26;
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(hx, hy, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#C9A227"; ctx.fill();
    ctx.restore();
    D.txt(ctx, "1", hx, hy, { size: 12, col: "#0B1F24", font: "marker" });
    if (t >= 1) {
      D.txt(ctx, "200 + 45 = 245", W / 2, H - 26,
        { size: 20, col: "#34D399", font: "marker", alpha: D.at(f, 360, 430) });
    }
  }
};

/* Monitor A: the compensation slider */
const makeCompensate = (k, onK) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = 199 + k, b = 46 - k;
  const x = 50, w = W - 100, y = H / 2 + 6;
  const total = 245;
  const aw = (a / total) * w;
  if (onK) D.tap(ctx, { x: x, y: y - 30, w: w, h: 58, value: 0, on: (v, tx) =>
    onK(Math.max(0, Math.min(46, Math.round((tx - x) / w * 46)))) });
  D.strip(ctx, {
    x: x, y: y - 26, w: w, h: 50, prog: 1, total: 245,
    parts: [
      { v: a, label: String(a), col: "#FA7E19" },
      { v: b, label: String(b), col: "#2D70B3" }
    ]
  });
  D.txt(ctx, a + " + " + b + " = 245", W / 2, y + 60, { size: 19, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, k === 1 ? "now it is easy in your head" : "the total never moves — tap the bar to move one across",
    W / 2, H - 18, { size: 13, col: k === 1 ? "#34D399" : "#C9A227", font: "marker" });
};

/* Monitor B: breaking the second addend apart by place value */
const makeBreakApart = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const stops = [199, 239, 245];
  const labels = ["start at 199", "+ 40", "+ 6"];
  const x = 54, w = W - 108, y = H / 2 + 14;
  const lo = 190, hi = 250;
  const px = (n) => x + ((n - lo) / (hi - lo)) * w;
  if (onStep) D.tap(ctx, { x: x, y: y - 64, w: w, h: 110, value: 0, on: (v, tx) => {
    let best = 0, bd = Infinity;
    stops.forEach((s, i) => { const d = Math.abs(px(s) - tx); if (d < bd) { bd = d; best = i; } });
    onStep(best);
  }});
  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.7)", 2.2);
  [190, 200, 210, 220, 230, 240, 250].forEach((n) => {
    ctx.save(); ctx.strokeStyle = "rgba(234,244,242,.4)"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(px(n), y - 7); ctx.lineTo(px(n), y + 7); ctx.stroke(); ctx.restore();
    D.txt(ctx, String(n), px(n), y + 24, { size: 10, col: "rgba(234,244,242,.5)", font: "mono", weight: 500 });
  });
  for (let i = 0; i <= step; i++) {
    ctx.save();
    ctx.beginPath(); ctx.arc(px(stops[i]), y, 6, 0, Math.PI * 2);
    ctx.fillStyle = i === step ? "#C9A227" : "rgba(52,211,153,.8)"; ctx.fill();
    ctx.restore();
    D.txt(ctx, String(stops[i]), px(stops[i]), y - 24, { size: 13, col: "#EAF4F2", font: "marker" });
    if (i > 0) {
      const pts = [];
      for (let s = 0; s <= 14; s++) {
        const t = s / 14;
        pts.push([px(stops[i - 1]) + (px(stops[i]) - px(stops[i - 1])) * t, y - Math.sin(Math.PI * t) * 30]);
      }
      D.marker(ctx, pts, 1, "#FA7E19", 2.2);
      D.txt(ctx, labels[i], (px(stops[i - 1]) + px(stops[i])) / 2, y - 52,
        { size: 12, col: "#FA7E19", font: "marker" });
    }
  }
  D.txt(ctx, step === 2 ? "199 + 40 + 6 = 245" : "break the 46 into friendly jumps",
    W / 2, H - 16, { size: 14, col: step === 2 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawBoard21 = (ctx, W, H, frame) => {
  const CYCLE = 720, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Make one number friendly" });
  const p1 = D.at(f, 20, 140), p2 = D.at(f, 140, 300), p3 = D.at(f, 300, 470), p4 = D.at(f, 460, 620);

  D.txt(ctx, "199 + 46", W / 2, 100, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.strip(ctx, {
      x: 90, y: 148, w: W - 180, h: 44, prog: p2, total: 245,
      parts: [{ v: 199, label: "199", col: "#FA7E19" }, { v: 46, label: "46", col: "#2D70B3" }]
    });
  }
  if (p3 > 0) {
    D.strip(ctx, {
      x: 90, y: 250, w: W - 180, h: 44, prog: p3, total: 245,
      parts: [{ v: 200, label: "200", col: "#FA7E19" }, { v: 45, label: "45", col: "#2D70B3" }]
    });
    D.txt(ctx, "give 1 to the 199, take 1 from the 46", W / 2, 316,
      { size: 14, col: "#C9A227", font: "marker", alpha: D.at(f, 340, 420) });
  }
  if (p4 > 0) {
    const yb = H - 44;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the total stays the same — only the parts moved", W / 2, yb - 2,
      { size: 16, col: "#C9A227", font: "marker", alpha: D.at(f, 500, 580) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 540, 640), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport21 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, {
    x: 24, y: 30, w: W - 48, h: 38, prog: 1, total: 355,
    parts: [{ v: 300, label: "300", col: "#FA7E19" }, { v: 55, label: "55", col: "#2D70B3" }]
  });
};

const LESSON = {
  code: "2-1",
  storageKey: "daf-g4-t2-l1",
  title: "Finding Sums and Differences with Mental Math",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-1 · 4.NBT.B.4",
  math: M,
  ixl: ["D7B", "D9R", "Q8M"],

  metas: [
    { phase: "warmup", title: "The pen <em>hovers</em> over 199 + 46",
      lead: "Fresh ink at the canteen counter: 199 and 46. The merchant's pen hovers — one slip and the line is inked for good.",
      goal: "Notice near-round numbers before any calculating.",
      pull: "How do you check a total before it becomes permanent?",
      rail: { launch: "Fictional frame. I am not asking for the total yet — just look at the two prices and the hovering pen.",
        monitor: ["Noticing 199 is nearly 200", "Seeing the pen hover", "Wonding how to check before committing"],
        connect: "What makes 199 nearly a friendly number?",
        misconception: "Reaching for paper before looking at the numbers." } },

    { phase: "launch", title: "Sixty seconds <em>before the ink dries</em>",
      lead: "199 + 46. No pencil. What is your checked prediction?",
      goal: "Lock a prediction, then check it the way the merchant does.",
      pull: "The canteen prices are simulated — the move works on any two numbers.",
      rail: { launch: "Hands down, eyes on the counter. Give a prediction and say what you are checking.",
        monitor: ["Rounding 199 to 200", "Splitting the 46", "Adding straight away"],
        connect: "Who changed a number before adding?",
        misconception: "Believing mental maths means the written method done silently." } },

    { phase: "monitor", title: "Zayd moves <em>one</em> across",
      lead: "Take from the sandwich, give to the juice. Watch the total bar.",
      goal: "Compensation: the total is protected when you move an amount across.",
      pull: "Whatever you take from one part, you must give to the other.",
      rail: { launch: "Predict the total before you move anything.",
        monitor: ["Watching the total bar", "Taking from the 46 as well as giving to the 199", "Explaining why the total holds"],
        connect: "Why does the total not change?",
        misconception: "Adding 1 to one part without taking it from the other." } },

    { phase: "monitor", title: "Ink only the <em>checked</em> lines",
      lead: "Four lines from the counter: some protect the total, some take a different route.",
      goal: "Sort working into compensation and break-apart & associate.",
      pull: "A checked line is one you can defend.",
      rail: { launch: "Read each line out loud before you place it.",
        monitor: ["Looking for a changed number", "Looking for a split", "Checking the total is kept"],
        connect: "How could you tell the two kinds apart?",
        misconception: "Thinking any mental method is compensation." } },

    { phase: "connect", title: "Aya <em>rounds</em>. Musa <em>splits</em>",
      lead: "Aya rounds to friendly and adjusts back. Musa breaks into hundreds, tens, ones. Both get 245.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Seeing 200 inside both", "Preferring the number line", "Choosing by the numbers in front of them"],
        connect: "Which strategy would you choose for 402 minus 199?",
        misconception: "Believing one strategy must always be used." } },

    { phase: "synth", title: "On the <em>board</em>: check, then commit",
      lead: "Draw the two parts. Move one across. The total bar never changes length.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Watching the total bar", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Treating the bar as a picture rather than a promise about the total." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "The ink is still wet: 298 + 57. What is the checked total?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the friendly numbers you used.",
        monitor: ["Making 300", "Splitting the 57", "Adding straight down"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Adding 2 to 298 and forgetting to take 2 from 57." } },

    { phase: "connect", title: "The ledger line is <em>inked</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: three bids sit under sealed covers.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready to estimate"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [k, setK] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern" support="abulaila"
            title="The merchant's pen hovers over 199 + 46"
            text="Two prices at the canteen counter, fresh ink beside them. Abu Laila, the merchant, checks before the ink dries — an error written down becomes permanent."
            clue="One of those numbers is almost a friendly number">
            <NoticeWonder draw={drawCanteen} height={256} award={award}
              notices={["199 is nearly 200", "The pen is still hovering", "Both prices are under 250", "An error becomes ink"]}
              wonders={["How do you check before you commit?", "What sits next to 199 + 46?", "What does move one across mean?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Sixty seconds before the ink dries"
            text="Omar holds the counter receipt up to the light. The class has one estimate to lock before the merchant commits the total to the ledger."
            clue="Estimate first — then make it friendly">
            <LaunchEstimate draw={drawCanteen} height={256} award={award}
              label="What is 199 + 46?" min={200} max={320} start={240} unit="total"
              after="Locked. Now check it the way the merchant does."
              note="The canteen prices are simulated — the move works on any two prices." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd moves one riyal across the bar"
            text="He can move any amount from one price to the other — but the class must predict the total before the bar moves."
            clue="Whatever you take, you must give">
            <ExploreChips draw={makeCompensate(k, setK)} height={250}
              label="Move riyals from the sandwich to the juice"
              value={k}
              onPick={(v) => setK(v)}
              chips={[{ v: 0, label: "199 + 46 as is" }, { v: 1, label: "move 1 across" }, { v: 2, label: "move 2 across" }, { v: 6, label: "move 6 across" }]}
              caption={<MathEl omml={M.compensated} size="xl" display="block" />}
              footnote="Move one across — the total does not change." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="both"
            title="Only checked lines get inked"
            text="Omar and Zayd lay four counter lines on the table. The ledger only accepts working the class can defend."
            clue="A changed number is compensation — a split number is break-apart">
            <CardSort award={award} columns={2} commitLabel="Ink the checked lines"
              items={[
                { id: "w1", text: "199 + 46 → 200 + 45", target: "comp" },
                { id: "w2", text: "245 − 99 → 246 − 100", target: "comp" },
                { id: "w3", text: "199 + 40 + 6", target: "split" },
                { id: "w4", text: "(199 + 1) + 45", target: "split" }
              ]}
              targets={[
                { id: "comp", label: "compensation — a number was changed to make it friendly" },
                { id: "split", label: "break apart & associate — a number was split by place value" }
              ]} />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, the same total"
            text="Aya rounds to a friendly number and adjusts back. Musa breaks the number into hundreds, tens and ones. Both reach 245."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Aya's way — round to friendly, adjust back", omml: M.compensated, h: 92,
                      quote: "I gave the 199 one riyal from the 46." }}
              right={{ name: "Musa's way — break into hundreds, tens, ones", omml: M.breakApart, h: 92,
                       quote: "I added the forty first, then the six." }}
              same={["Both get 245", "Both avoid writing it down", "Both make a friendly number on the way"]}
              diff={["Aya changes a number, Musa splits one", "Musa takes two steps", "Aya's is faster when a number is near a ten"]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The shared rule is drawn into the ledger"
            text="Zayd builds only what the class can justify from the two merchant methods."
            clue="The total bar never changes length">
            <BoardScreen draw={drawBoard21} height={430}
              caption="Mental math before the ink: check, then commit." />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a total he can defend"
            text="The ink is still wet on the next line. Give the friendly pair before the teacher reveals the check."
            clue="Whatever you give, you must take">
            <ShowWhatYouKnow award={award}
              prompt="The ink is still wet: 298 + 57. What is the checked total?"
              omml={M.swyk}
              options={[{ v: "a", text: "355" }, { v: "b", text: "345" }, { v: "c", text: "353" }, { v: "d", text: "365" }]}
              right="a"
              support={{
                yes: "Yes — 300 + 55 = 355: move two across; the total does not change.",
                notYet: "Not yet — whatever you give, you must take.",
                draw: drawSupport21, h: 82,
                hint: "Move two across to make 300."
              }} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryHandoff support="abulaila"
            title="The ledger line is inked"
            text="Omar signs the checked line into the souq ledger. Zayd lifts three sealed bid cards from the counter — and only one of those totals is even possible."
            artifact="Souq ledger · mental-math checked lines"
            next="Three bids sit under sealed covers — which total is even possible?">
            <Closing game={game} omml={M.moveOne}
              action="Pick a near-round sum from real life, check it in your head, and say what you moved." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};