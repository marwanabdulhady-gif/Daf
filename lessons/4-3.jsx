/* ===========================================================================
   Grade 4 · Topic 4 · LESSON 4-3 · Estimate: Use Rounding or Compatible Numbers
   Standard 4.NBT.B.5   I can ... estimate a 2-digit by 2-digit product by
   rounding, or by using compatible numbers.
   =========================================================================== */

const M = {
  problem: om(mt("38\u00d752")),
  rounded: om(mt("40\u00d750=2,000")),
  compatible: om(mt("40\u00d750")),
  exact: om(mt("38\u00d752=1,976")),
  bothUp: om(mnor("both rounded up \u2192 the estimate is too big")),
  swyk: om(mt("47\u00d729")),
  swykAnswer: om(mt("50\u00d730=1,500")),
  rule: om(mnor("round both factors to numbers you can multiply in your head"))
};

const makeRoundBoth43 = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (which === "both") {
    D.roundLine(ctx, { x: 62, y: 62, w: W - 124, lo: 30, hi: 40, value: 38, prog: 1 });
    D.roundLine(ctx, { x: 62, y: 158, w: W - 124, lo: 50, hi: 60, value: 52, prog: 1 });
    D.txt(ctx, "40 × 50 = 2,000", W / 2, H - 42, { size: 19, col: "#C9A227", font: "marker" });
    D.txt(ctx, "one rounded up, one rounded down", W / 2, H - 16,
      { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
  } else {
    const pairs = [["38 × 52", 1976, "#EAF4F2"], ["40 × 50", 2000, "#C9A227"], ["40 × 52", 2080, "#FA7E19"]];
    pairs.forEach(function (p, k) {
      D.txt(ctx, p[0], W / 2 - 40, 74 + k * 46, { size: 20, col: p[2], font: "marker", align: "right" });
      D.txt(ctx, "=", W / 2 - 16, 74 + k * 46, { size: 16, col: "rgba(234,244,242,.5)", font: "marker" });
      D.txt(ctx, p[1].toLocaleString("en-US"), W / 2 + 80, 74 + k * 46,
        { size: 21, col: k === 0 ? "#34D399" : "#EAF4F2", font: "marker", align: "right" });
      if (k > 0) {
        var gap = p[1] - 1976;
        D.txt(ctx, "+" + gap, W - 72, 74 + k * 46,
          { size: 12, col: "#C74440", font: "mono", weight: 700 });
      }
    });
    D.txt(ctx, "rounding both up pushes the estimate further away", W / 2, H - 16,
      { size: 13, col: "#C9A227", font: "marker" });
  }
};

const makeCompatible = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const pairs = on
    ? [["25 × 41", "25 × 40", 1000], ["19 × 51", "20 × 50", 1000], ["48 × 26", "50 × 25", 1250]]
    : [["25 × 41", "?", 0], ["19 × 51", "?", 0], ["48 × 26", "?", 0]];
  pairs.forEach(function (p, k) {
    D.txt(ctx, p[0], 92, 70 + k * 48, { size: 19, col: "#EAF4F2", font: "marker", align: "left" });
    D.marker(ctx, [[188, 64 + k * 48], [242, 64 + k * 48]], on ? 1 : 0.2, "#C9A227", 1.8);
    D.txt(ctx, p[1], 280, 70 + k * 48,
      { size: 19, col: on ? "#6042A6" : "rgba(234,244,242,.3)", font: "marker", align: "left" });
    if (on) D.txt(ctx, "\u2248 " + p[2].toLocaleString("en-US"), W - 90, 70 + k * 48,
      { size: 17, col: "#34D399", font: "marker", align: "right" });
  });
  D.txt(ctx, on ? "compatible numbers are pairs that multiply easily"
                : "which friendly pair is hiding in each one?",
    W / 2, H - 18, { size: 13.5, col: on ? "#34D399" : "#C9A227", font: "marker" });
};

const drawSouq = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 330), p3 = D.at(f, 340, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school book order", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (var r = 0; r < 5; r++) {
    for (var c = 0; c < 10; c++) {
      var a = D.at(p2, (r * 10 + c) / 50, (r * 10 + c) / 50 + 0.3);
      if (a <= 0) continue;
      ctx.save();
      ctx.globalAlpha = a * 0.7;
      D.rr(ctx, 70 + c * ((W - 160) / 10), 52 + r * 22, (W - 180) / 10, 16, 3);
      ctx.fillStyle = "#FA7E19"; ctx.fill();
      ctx.restore();
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "38 classes \u00b7 52 books each", W / 2, 186,
      { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "about how many books to order?", W / 2, H - 16,
      { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard43 = (ctx, W, H, frame) => {
  const CYCLE = 760, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Two awkward numbers, one easy estimate" });
  const p1 = D.at(f, 20, 140), p2 = D.at(f, 150, 320), p3 = D.at(f, 330, 490), p4 = D.at(f, 490, 650);
  D.txt(ctx, "38 × 52", W / 2, 94, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });
  if (p2 > 0) D.roundLine(ctx, { x: 96, y: 168, w: W - 192, lo: 30, hi: 40, value: 38, prog: p2 });
  if (p3 > 0) D.roundLine(ctx, { x: 96, y: 264, w: W - 192, lo: 50, hi: 60, value: 52, prog: p3 });
  if (p4 > 0) {
    var yb = H - 40;
    D.marker(ctx, [[70, yb - 30], [W - 70, yb - 30]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "40 × 50 = 2,000 — close enough to check the real answer",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 530, 620) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 570, 670), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport43 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.roundLine(ctx, { x: 40, y: 30, w: W - 80, lo: 40, hi: 50, value: 47, prog: 1 });
};

const LESSON = {
  code: "4-3",
  storageKey: "daf-g4-t4-l3",
  title: "Estimate: Use Rounding or Compatible Numbers",
  unit: "GRADE 4 · TOPIC 4 · LESSON 4-3 · 4.NBT.B.5",
  math: M,
  ixl: ["2TR", "WGL", "KLA"],

  metas: [
    { phase: "warmup", title: "Which estimate <em>doesn't belong</em>?",
      lead: "Four estimates for 38 × 52. Every one has a reason.",
      goal: "Reasoning before answers — no card is wrong.",
      pull: "Rounding both the same way has a cost.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reasoning from the rounding", "Reasoning from closeness", "Reasoning from ease"],
        connect: "Can every card be the odd one out?",
        misconception: "Assuming the closest estimate is always the best." } },

    { phase: "launch", title: "Thirty-eight classes, <em>fifty-two books</em>",
      lead: "The school must order books. Nobody needs the exact number yet.",
      goal: "Create the need — an estimate is enough to place an order.",
      pull: "Estimate first, then we will see how you rounded.",
      rail: { launch: "No pencils. About how many books?",
        monitor: ["Rounding both", "Rounding one", "Multiplying exactly"],
        connect: "Which numbers did you change, and why those?",
        misconception: "Believing an estimate is only for when you cannot do the real sum." } },

    { phase: "monitor", title: "Round <em>both</em> factors",
      lead: "Each number gets its own line. Then multiply the friendly pair.",
      goal: "Estimating a product means rounding both factors.",
      pull: "How far off does that leave you?",
      rail: { launch: "Predict each rounded factor before you tap.",
        monitor: ["Rounding both to tens", "Rounding only one", "Rounding to hundreds"],
        connect: "Why round both rather than just one?",
        misconception: "Rounding after multiplying." } },

    { phase: "monitor", title: "Which way did it <em>drift</em>?",
      lead: "Compare each estimate with the exact answer.",
      goal: "Know the direction and size of your error.",
      pull: "There is another way to find a friendly pair.",
      rail: { launch: "Predict above or below before you tap.",
        monitor: ["Linking both up to too big", "Noticing one up one down cancels", "Measuring the gap"],
        connect: "Why is 40 × 50 closer than 40 × 52?",
        misconception: "Thinking an over-estimate is a mistake." } },

    { phase: "monitor", title: "Find the <em>compatible pair</em>",
      lead: "Sometimes a friendly pair is hiding that is not the nearest ten.",
      goal: "Compatible numbers are chosen for ease, not for nearness.",
      pull: "Now judge some answers for reasonableness.",
      rail: { launch: "Which pairs do you know instantly?",
        monitor: ["Spotting 25 and 4", "Spotting doubles", "Rounding to tens anyway"],
        connect: "When is a compatible pair better than rounding?",
        misconception: "Believing compatible numbers must be the nearest ten." } },

    { phase: "connect", title: "Two ways to <em>get friendly</em>",
      lead: "Areej rounded to tens. Bader used a compatible pair. Both estimates work.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Rounding to tens", "Choosing compatible numbers", "Choosing for a purpose"],
        connect: "Which estimate would you use to place an order, and why?",
        misconception: "Believing only rounding to the nearest ten is allowed." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One line each. Round both. Multiply the friendly pair.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Finding halfway first", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Rounding the answer instead of the factors." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming both rounded factors", "Predicting over or under", "Testing on a new product"],
        connect: "If both factors round up, what do you know about your estimate?",
        misconception: "Forgetting that rounding both up always over-estimates." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show both rounded factors.",
        monitor: ["Rounding 47 to 50", "Rounding 29 to 30", "Multiplying exactly"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Rounding 29 down to 20." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the exact answer, in four pieces.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the line", "Ready for four regions"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [which, setWhich] = useState("both");
    const [on, setOn] = useState(false);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Four estimates for 38 × 52. Which one doesn't belong?"
          cards={[
            { id: "a", text: "2,000", why: "One factor up, one down — the errors partly cancel" },
            { id: "b", text: "2,080", why: "Only the 38 was rounded, so it is closer but more work" },
            { id: "c", text: "1,976", why: "The only one that is not an estimate — it is exact" },
            { id: "d", text: "2,400", why: "Both rounded up hard — the only estimate that is far too big" }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawSouq} height={254} award={award}
          label="About how many books to order?" min={1000} max={3000} start={2000} unit="books"
          after="Locked. Now let us see which numbers you changed."
          note="The order goes in today. Exact can wait." />;

      case 2:
        return <ExploreChips draw={makeRoundBoth43(which)} height={256}
          label="Round, then compare"
          value={which}
          onPick={(v) => setWhich(v)}
          chips={[{ v: "both", label: "round both" }, { v: "drift", label: "how far off?" }]}
          caption={<MathEl omml={which === "both" ? M.rounded : M.exact} size="xl" display="block" />}
          footnote="38 rounds up, 52 rounds down — the two errors work against each other." />;

      case 3:
        return <ExploreChips draw={makeCompatible(on)} height={252}
          label="Look for a friendly pair"
          value={on ? 1 : 0}
          onPick={(v) => setOn(v === 1)}
          chips={[{ v: 0, label: "the products" }, { v: 1, label: "reveal the pairs" }]}
          caption={<MathEl omml={M.compatible} size="xl" display="block" />}
          footnote="Compatible numbers are picked because they are easy, not because they are nearest." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "a1", text: "38 × 52 = 1,976", target: "ok" },
            { id: "a2", text: "38 × 52 = 197", target: "no" },
            { id: "a3", text: "47 × 29 = 1,363", target: "ok" },
            { id: "a4", text: "47 × 29 = 13,630", target: "no" }
          ]}
          targets={[
            { id: "ok", label: "reasonable — close to my estimate" },
            { id: "no", label: "not reasonable — nowhere near" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Areej's way — round to tens", omml: M.rounded, h: 92,
                  quote: "40 times 50 is 2,000, and that is easy." }}
          right={{ name: "Bader's way — compatible pair", omml: M.compatible, h: 92,
                   quote: "I look for a pair I already know by heart." }}
          same={["Both give a friendly product", "Both are close to 1,976", "Both can be done in the head"]}
          diff={["Areej always rounds to tens", "Bader picks whatever is easiest",
                 "Bader's works well with 25s and 50s"]} />;

      case 6:
        return <BoardScreen draw={drawBoard43} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "round both factors to numbers you can multiply in your head" }]}
          hand={"round both factors \u00b7 multiply the friendly pair \u00b7 then check the real answer against it"}
          cards={[
            { title: "The estimate we made", omml: M.rounded, note: "the exact answer is 1,976" },
            { title: "Tap to see the danger", omml: M.exact, revealOmml: M.bothUp, reveal: true,
              note: "rounding both up always over-estimates" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Estimate 47 × 29 by rounding both factors to the nearest ten."
          omml={M.swyk}
          options={[{ v: "a", text: "1,200" }, { v: "b", text: "1,500" }, { v: "c", text: "800" }, { v: "d", text: "15,000" }]}
          right="b"
          support={{
            yes: "Yes — 50 × 30 = 1,500. The exact answer, 1,363, is close.",
            notYet: "Not yet — round each factor on its own line first.",
            draw: drawSupport43, h: 82,
            hint: "Is 47 nearer to 40 or 50? Now do the same for 29."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Estimate the cost of about 20 of something at the shop, then check the real total." />;

      default: return null;
    }
  }
};
