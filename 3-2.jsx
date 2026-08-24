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

const makeRoundFactor = (to) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cfg = to === 100 ? { lo: 200, hi: 300 } : { lo: 230, hi: 240 };
  D.roundLine(ctx, { x: 62, y: 88, w: W - 124, lo: cfg.lo, hi: cfg.hi, value: 235, prog: 1 });
  const rounded = to === 100 ? 200 : 240;
  D.txt(ctx, "8 × " + rounded + " = " + (8 * rounded).toLocaleString("en-US"), W / 2, H - 46,
    { size: 19, col: "#C9A227", font: "marker" });
  D.txt(ctx, to === 100 ? "rounded down, so the real answer is bigger"
                        : "rounded up, so the real answer is smaller",
    W / 2, H - 18, { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const makeOverUnder = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
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
    { phase: "warmup", title: "Which estimate <em>doesn't belong</em>?",
      lead: "Four estimates for 8 × 235. Every one has a reason.",
      goal: "Reasoning before answers — no card is wrong.",
      pull: "Closer is not always better. It depends what you need it for.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reasoning from the rounding", "Reasoning from closeness", "Reasoning from ease"],
        connect: "Can every card be the odd one out?",
        misconception: "Assuming the closest estimate is always the best one." } },

    { phase: "launch", title: "Eight boxes of <em>dates</em>",
      lead: "Each box holds 235. The trader needs a number now, not a perfect one.",
      goal: "Create the need — an estimate answers a different question.",
      pull: "Estimate first, then we will see how you did it.",
      rail: { launch: "No pencils. About how many dates?",
        monitor: ["Rounding 235 to 200", "Rounding to 240", "Multiplying exactly"],
        connect: "Which number did you change, and why that one?",
        misconception: "Rounding the 8 as well and losing the fact." } },

    { phase: "monitor", title: "Round to a fact you <em>know</em>",
      lead: "Put 235 on a line and choose an end.",
      goal: "Estimating a product means rounding one factor.",
      pull: "Is your estimate above the real answer or below it?",
      rail: { launch: "Predict the rounded factor before you tap.",
        monitor: ["Rounding to hundreds", "Rounding to tens", "Rounding both factors"],
        connect: "Why do we leave the 8 alone?",
        misconception: "Rounding the single-digit factor to 10." } },

    { phase: "monitor", title: "Over or <em>under</em>?",
      lead: "See where each estimate sits against the exact answer.",
      goal: "Know the direction of your error before you need it.",
      pull: "Now judge some answers for reasonableness.",
      rail: { launch: "Predict above or below before you tap.",
        monitor: ["Linking rounding down to under", "Linking rounding up to over", "Guessing"],
        connect: "When would you deliberately choose an over-estimate?",
        misconception: "Thinking an over-estimate means a mistake." } },

    { phase: "monitor", title: "Reasonable or <em>not</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Use an estimate to catch a wrong answer.",
      pull: "Two students estimated the same product differently.",
      rail: { launch: "Estimate first, then judge each answer.",
        monitor: ["Comparing against the estimate", "Checking the digit count", "Calculating exactly"],
        connect: "Which one was obviously wrong, and how did you know?",
        misconception: "Judging by whether the answer looks tidy." } },

    { phase: "connect", title: "Two ways to <em>round it</em>",
      lead: "Huda rounded to 200. Zaid rounded to 240. Both are useful.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Choosing the easy fact", "Choosing the closer number", "Choosing for a purpose"],
        connect: "Which estimate would you use to order boxes, and why?",
        misconception: "Believing only one rounding place is allowed." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Round one factor to something you can multiply in your head. Then attach the place.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming the basic fact", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Rounding after multiplying." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the basic fact", "Testing on a new product", "Predicting over or under"],
        connect: "Can you tell before you calculate whether your estimate is too big?",
        misconception: "Forgetting that rounding down always under-estimates a product." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the rounded factor you used.",
        monitor: ["Rounding to 500", "Rounding to 510", "Multiplying exactly"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Rounding 512 up to 600." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the exact product, built from an array.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the line", "Ready for arrays"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [to, setTo] = useState(100);
    const [which, setWhich] = useState("under");

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Four estimates for 8 × 235. Which one doesn't belong?"
          cards={[
            { id: "a", text: "1,600", why: "Rounded 235 down to 200 — the easiest fact to use" },
            { id: "b", text: "1,920", why: "Rounded 235 up to 240 — much closer, more work" },
            { id: "c", text: "1,880", why: "The only one that is not an estimate — it is exact" },
            { id: "d", text: "2,400", why: "The only one that rounds both factors, and is far off" }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawCrates} height={260} award={award}
          label="About how many dates in 8 boxes of 235?"
          min={800} max={3000} start={1800} unit="dates"
          after="Locked. Now let us see which number you rounded."
          note="The trader needs a number now. Exact can wait." />;

      case 2:
        return <ExploreChips draw={makeRoundFactor(to)} height={252}
          label="Round 235 to the ..."
          value={to}
          onPick={(v) => setTo(v)}
          chips={[{ v: 100, label: "nearest hundred" }, { v: 10, label: "nearest ten" }]}
          caption={<MathEl omml={to === 100 ? M.estimate : M.closer} size="xl" display="block" />}
          footnote="The 8 stays as it is — it is already a fact you know." />;

      case 3:
        return <ExploreChips draw={makeOverUnder(which)} height={250}
          label="Where does each estimate sit?"
          value={which}
          onPick={(v) => setWhich(v)}
          chips={[{ v: "under", label: "8 × 200" }, { v: "over", label: "8 × 240" }]}
          caption={<MathEl omml={which === "under" ? M.under : M.over} size="lg" display="block" />}
          footnote="If you round the factor down, the product must come out smaller." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "r1", text: "8 × 235 = 1,880", target: "ok" },
            { id: "r2", text: "8 × 235 = 188", target: "no" },
            { id: "r3", text: "8 × 235 = 18,800", target: "no" },
            { id: "r4", text: "7 × 412 = 2,884", target: "ok" }
          ]}
          targets={[
            { id: "ok", label: "reasonable — close to my estimate" },
            { id: "no", label: "not reasonable — nowhere near" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Huda's way — round to 200", omml: M.estimate, h: 92,
                  quote: "8 times 2 is 16, so 8 times 200 is 1,600." }}
          right={{ name: "Zaid's way — round to 240", omml: M.closer, h: 92,
                   quote: "8 times 24 is 192, so 8 times 240 is 1,920." }}
          same={["Both round one factor", "Both use a fact they know", "Both are close to 1,880"]}
          diff={["Huda's is easier", "Zaid's is closer", "Huda knows hers is too small"]} />;

      case 6:
        return <BoardScreen draw={drawBoard32} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "round one factor to a basic fact you know" }]}
          hand={"round one factor · use the basic fact · attach the place · then check the real answer against it"}
          cards={[
            { title: "The estimate we made", omml: M.estimate, note: "the exact answer is 1,880" },
            { title: "Tap for a closer estimate", omml: M.exact, revealOmml: M.closer, reveal: true,
              note: "rounding to tens costs more effort" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Estimate 6 × 512 by rounding to the nearest hundred."
          omml={M.swyk}
          options={[{ v: "a", text: "300" }, { v: "b", text: "3,000" }, { v: "c", text: "3,600" }, { v: "d", text: "30,000" }]}
          right="b"
          support={{
            yes: "Yes — 6 × 5 = 30, so 6 × 500 = 3,000. The exact answer, 3,072, is close.",
            notYet: "Not yet — round 512 first, then use the basic fact.",
            draw: drawSupport32, h: 82,
            hint: "Is 512 nearer to 500 or 600? Now what is 6 × 5?"
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Estimate the cost of 6 of something at the shop before you check the real price." />;

      default: return null;
    }
  }
};
