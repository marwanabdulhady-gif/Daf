/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-2 · Estimate Products
   Standard 4.NBT.B.5   I can ... estimate a product by rounding, and decide
   whether an answer is reasonable.
   =========================================================================== */

const M = {
  problem: om(mt("8×235")),
  estimate: om(mt("8×200=1,600")),
  closer: om(mt("8×240=1,920")),
  exact: om(mt("8×235=1,880")),
  under: om(mnor("rounded down → the real answer is bigger")),
  over: om(mnor("rounded up → the real answer is smaller")),
  rule: om(mnor("round one factor to a basic fact you know")),
  swyk: om(mt("6×512")),
  swykAnswer: om(mt("6×500=3,000"))
};

const drawCrates = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 320), p3 = D.at(f, 330, 450);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "boxes of dates for the market", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let c = 0; c < 8; c++) {
    const a = D.at(p2, c / 8, c / 8 + 0.35);
    if (a <= 0) continue;
    const bx = 40 + (c % 4) * ((W - 100) / 4);
    const by = 52 + Math.floor(c / 4) * 62;
    ctx.save();
    ctx.globalAlpha = a * 0.9;
    D.rr(ctx, bx, by, (W - 130) / 4, 46, 7);
    ctx.fillStyle = "#FA7E19"; ctx.globalAlpha = a * 0.2; ctx.fill();
    ctx.globalAlpha = a; ctx.strokeStyle = "#FA7E19"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "235", bx + (W - 130) / 8, by + 25, { size: 15, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p3 > 0) D.txt(ctx, "8 boxes · about how many dates?", W / 2, H - 18,
    { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
};

const makeRoundFactor = (to, onTo) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onTo) D.tap(ctx, { x: 62, y: 60, w: W - 124, h: 80, value: 0, on: () => onTo(to === 100 ? 10 : 100) });
  const cfg = to === 100 ? { lo: 200, hi: 300 } : { lo: 230, hi: 240 };
  D.roundLine(ctx, { x: 62, y: 88, w: W - 124, lo: cfg.lo, hi: cfg.hi, value: 235, prog: 1 });
  const rounded = to === 100 ? 200 : 240;
  D.txt(ctx, "8 × " + rounded + " = " + (8 * rounded).toLocaleString("en-US"), W / 2, H - 46,
    { size: 19, col: "#C9A227", font: "marker" });
  D.txt(ctx, to === 100 ? "rounded down, so the real answer is bigger"
                        : "rounded up, so the real answer is smaller",
    W / 2, H - 18, { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const makeOverUnder = (which, onWhich) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onWhich) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onWhich(which === "under" ? "over" : "under") });
  const exact = 1880;
  const est = which === "under" ? 1600 : 1920;
  const x = 60, w = W - 120, y = H / 2 + 8;
  const lo = 1500, hi = 2000;
  const px = (n) => x + ((n - lo) / (hi - lo)) * w;
  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.7)", 2.2);
  [1500, 1600, 1700, 1800, 1900, 2000].forEach((n) => {
    ctx.save(); ctx.strokeStyle = "rgba(234,244,242,.35)"; ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.moveTo(px(n), y - 6); ctx.lineTo(px(n), y + 6); ctx.stroke(); ctx.restore();
    D.txt(ctx, n.toLocaleString("en-US"), px(n), y + 24,
      { size: 9.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 500 });
  });
  ctx.save(); ctx.beginPath(); ctx.arc(px(exact), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#34D399"; ctx.fill(); ctx.restore();
  D.txt(ctx, "exact 1,880", px(exact), y - 26, { size: 12.5, col: "#34D399", font: "marker" });
  ctx.save(); ctx.beginPath(); ctx.arc(px(est), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#C9A227"; ctx.fill(); ctx.restore();
  D.txt(ctx, "estimate " + est.toLocaleString("en-US"), px(est), y + 52,
    { size: 12.5, col: "#C9A227", font: "marker" });
  D.txt(ctx, which === "under" ? "an under-estimate — safe if you must not over-order"
                              : "an over-estimate — safe if you must not run short",
    W / 2, 36, { size: 14, col: "#EAF4F2", font: "marker" });
};

const drawBoard32 = (ctx, W, H, frame) => {
  const CYCLE = 740, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "About how many?" });
  const p1 = D.at(f, 20, 140), p2 = D.at(f, 150, 330), p3 = D.at(f, 340, 490), p4 = D.at(f, 490, 640);
  D.txt(ctx, "8 × 235", W / 2, 96, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });
  if (p2 > 0) D.roundLine(ctx, { x: 90, y: 176, w: W - 180, lo: 200, hi: 300, value: 235, prog: p2 });
  if (p3 > 0) {
    D.txt(ctx, "235 is nearer to 200", W / 2, 250, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "8 × 2 = 16, so 8 × 200 = 1,600", W / 2, 282,
      { size: 17, col: "#34D399", font: "marker", alpha: D.at(f, 390, 470) });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "round to a fact you know, then attach the place",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 530, 610) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 570, 670), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport32 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.roundLine(ctx, { x: 40, y: 34, w: W - 80, lo: 500, hi: 600, value: 512, prog: 1 });
};

const LESSON = {
  code: "3-2",
  storageKey: "daf-g4-t3-l2",
  title: "Estimate Products",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-2 · 4.NBT.B.5",
  math: M,
  ixl: ["WDG"],

  metas: [
    { phase: "warmup", title: "Eight crates, <em>one promise</em>",
      lead: "Eight crates of dates for the market, 235 in each. The foreman promises the whole order fits on one truck — before anyone counts.",
      goal: "Notice the order is a product — and that the promise can be checked with an estimate.",
      pull: "The crate counts are simulated — the estimate works on any order.",
      rail: { launch: "Fictional frame. Just look at the crates — no exact work yet.",
        monitor: ["Noticing 235 is near 200 and 240", "Wonding how big the order is", "Trusting the promise"],
        connect: "How could you check the promise without counting every date?",
        misconception: "Believing the exact product is needed before a decision." } },

    { phase: "launch", title: "The estimate <em>before the promise</em>",
      lead: "8 × 235. Round one factor to a fact you know — what does the order come to?",
      goal: "Estimate the product by rounding one factor.",
      pull: "Round one factor to a basic fact you know.",
      rail: { launch: "Give the estimate and the factor you rounded.",
        monitor: ["Rounding 235 to 200", "Rounding 235 to 240", "Multiplying the rounds"],
        connect: "Which rounding is easier, and which is closer?",
        misconception: "Rounding both factors and losing the basic fact." } },

    { phase: "monitor", title: "Zayd rounds the <em>factor</em>",
      lead: "To the hundred, or to the ten — each round gives a different promise.",
      goal: "Choose the rounding place the decision needs.",
      pull: "Rounded down → the real answer is bigger. Rounded up → it is smaller.",
      rail: { launch: "Predict the estimate before the line shows it.",
        monitor: ["Rounding to 200", "Rounding to 240", "Saying which way the round went"],
        connect: "Why does rounding down mean the real answer is bigger?",
        misconception: "Believing the estimate is always smaller than the exact product." } },

    { phase: "monitor", title: "Which answers could be <em>real</em>?",
      lead: "Four claimed products for the order. The estimate catches the impossible ones.",
      goal: "Use the estimate to flag an answer that cannot be right.",
      pull: "Close to my estimate — or nowhere near.",
      rail: { launch: "Compare each claim to your estimate before you sort.",
        monitor: ["Comparing claims to the estimate", "Spotting 188 as too small", "Spotting 18,800 as too big"],
        connect: "What made the impossible claims impossible?",
        misconception: "Accepting any tidy-looking product." } },

    { phase: "monitor", title: "Omar names the <em>direction</em>",
      lead: "Rounded down or rounded up? The estimate is a range, not a guess.",
      goal: "Say whether the exact product sits above or below the estimate.",
      pull: "The estimate carries its direction.",
      rail: { launch: "Before you tap: which way did the round go?",
        monitor: ["Naming rounded-down", "Naming rounded-up", "Placing the exact answer"],
        connect: "How does the direction help you check the exact product?",
        misconception: "Reporting an estimate without its direction." } },

    { phase: "connect", title: "Huda rounds <em>coarse</em>. Zaid rounds <em>close</em>",
      lead: "Huda rounds to 200, Zaid to 240. Both estimates defend the order.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the rounding places", "Comparing ease and closeness", "Checking both are near 1,880"],
        connect: "Which rounding would you use for a delivery decision?",
        misconception: "Thinking finer rounding is always better." } },

    { phase: "synth", title: "On the <em>board</em>: a promise with a range",
      lead: "Round one factor to a fact you know. The estimate is a range, with a direction.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the basic fact", "Naming the direction", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Estimating both factors at once." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "6 × 512 — rounded to the nearest hundred, what is the estimate?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Round the three-digit factor first.",
        monitor: ["Rounding 512 to 500", "Using 6 × 5", "Saying the direction"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 30,000 — a zero was added to the estimate." } },

    { phase: "connect", title: "The promise is <em>checked</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: equal rows of panels — but the total count is hidden.",
      rail: { launch: "Ask three students to say their estimate and its direction.",
        monitor: ["Able to explain the rounding", "Still rounds both factors", "Ready for arrays"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [to, setTo] = useState(100);
    const [which, setWhich] = useState("under");

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Eight crates, one promise"
            text="Eight crates of dates for the market, 235 in each. The foreman promises the order fits on one truck — before anyone has counted."
            clue="A promise can be checked with an estimate">
            <NoticeWonder draw={drawCrates} height={256} award={award}
              notices={["Each crate holds 235", "There are eight crates", "235 is near 200 and 240", "The truck promise is untested"]}
              wonders={["About how many dates in total?", "Which rounding is easier?", "Can the estimate check the promise?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the promise"
            text="Omar asks for the estimate before the foreman's promise stands — round one factor to a fact you know."
            clue="Round one factor to a basic fact you know">
            <LaunchEstimate draw={drawCrates} height={260} award={award}
              label="8 × 235 — the estimate before the promise" min={1400} max={2200} start={1600} unit="dates"
              after="Locked. Now round the factor and see which way the estimate sits."
              note="The crate counts are simulated — the estimate works on any order." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd rounds the factor"
            text="He can round 235 to the hundred or to the ten — the class must say which estimate each round gives."
            clue="Rounded down → the real answer is bigger">
            <ExploreChips draw={makeRoundFactor(to, setTo)} height={252}
              label="Round the 235, then multiply by 8"
              value={to}
              onPick={(v) => setTo(v)}
              chips={[{ v: 100, label: "round to the hundred" }, { v: 10, label: "round to the ten" }]}
              caption={<MathEl omml={to === 100 ? M.estimate : M.closer} size="xl" display="block" />}
              footnote="Rounded down → the real answer is bigger. Rounded up → it is smaller." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="both"
            title="Which answers could be real?"
            text="Four merchants claim products for the order. The estimate catches the ones that cannot be right."
            clue="Close to my estimate — or nowhere near">
            <CardSort award={award} columns={2} commitLabel="Check the claims"
              items={[
                { id: "r1", text: "8 × 235 = 1,880", target: "ok" },
                { id: "r2", text: "8 × 235 = 188", target: "no" },
                { id: "r3", text: "8 × 235 = 18,800", target: "no" },
                { id: "r4", text: "7 × 412 = 2,884", target: "ok" }
              ]}
              targets={[
                { id: "ok", label: "reasonable — close to my estimate" },
                { id: "no", label: "not reasonable — nowhere near" }
              ]} />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar names the direction"
            text="Rounded down or rounded up? His estimate is a range — and the direction tells you where the exact product sits."
            clue="The estimate carries its direction">
            <ExploreChips draw={makeOverUnder(which, setWhich)} height={250}
              label="Which way does the round sit?"
              value={which}
              onPick={(v) => setWhich(v)}
              chips={[{ v: "under", label: "rounded down" }, { v: "over", label: "rounded up" }]}
              caption={<MathEl omml={which === "under" ? M.under : M.over} size="lg" display="block" />}
              footnote="The exact product sits on the far side of the estimate." />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one defensible order"
            text="Huda rounds to 200, Zaid to 240. Both estimates sit near the exact 1,880 — for different reasons."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Huda's way — round to 200", omml: M.estimate, h: 92,
                      quote: "8 times 2 is 16, so 8 times 200 is 1,600." }}
              right={{ name: "Zaid's way — round to 240", omml: M.closer, h: 92,
                       quote: "8 times 24 is 192, so 8 times 240 is 1,920." }}
              same={["Both round one factor", "Both use a fact they know", "Both are close to 1,880"]}
              diff={["Huda's is easier", "Zaid's is closer", "Huda knows hers is too small"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The estimate is drawn with its direction"
            text="Zayd builds only what the class can justify: the factor rounded, the fact named, the direction stated."
            clue="A promise with a range">
            <BoardScreen draw={drawBoard32} height={430}
              caption="An estimate is a promise with a range." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the checked promise"
            text="6 × 512, rounded to the nearest hundred. Show the estimate — and the direction."
            clue="512 is nearer to 500 than to 600">
            <ShowWhatYouKnow award={award}
              prompt="Estimate 6 × 512 by rounding to the nearest hundred."
              omml={M.swyk}
              options={[{ v: "a", text: "3,000" }, { v: "b", text: "300" }, { v: "c", text: "3,600" }, { v: "d", text: "30,000" }]}
              right="a"
              support={{
                yes: "Yes — 6 × 5 = 30, so 6 × 500 = 3,000. The exact answer, 3,072, is close.",
                notYet: "Not yet — round 512 first, then use the basic fact.",
                draw: drawSupport32, h: 82,
                hint: "Is 512 nearer to 500 or 600? Now what is 6 × 5?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The promise is checked"
            text="Omar files the estimate beside the exact 1,880 — the promise holds. Zayd unrolls the grove plan: equal rows of shade panels, but the total count is hidden."
            artifact="Grove plan · product estimated"
            next="The plan shows equal rows of panels — but the total count is hidden. How can you tell it without counting every panel?">
            <Closing game={game} omml={M.rule}
              action="Estimate the cost of 6 of something at the shop before you check the real price." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
