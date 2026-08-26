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
    { phase: "warmup", title: "Will the <em>beams</em> fit?",
      lead: "The beam run for the tower roof: 38 lengths, 52 books per bundle. Before any cutting, the estimate must say whether they fit.",
      goal: "Notice the numbers hide a friendly pair — and a near pair.",
      pull: "38 rounds up, 52 rounds down — the two errors work against each other.",
      rail: { launch: "Fictional frame. Read the order — no exact work yet.",
        monitor: ["Noticing 38 is near 40", "Noticing 52 is near 50", "Wonding which estimate is safe"],
        connect: "Which way should each number round for this decision?",
        misconception: "Rounding both numbers the same way by habit." } },

    { phase: "launch", title: "About how many <em>books</em> to order?",
      lead: "38 × 52. Lock the estimate before the bundles are cut.",
      goal: "Estimate the product by rounding both factors.",
      pull: "The order counts are simulated — the estimate works on any run.",
      rail: { launch: "Give the estimate and what you rounded each factor to.",
        monitor: ["Rounding 38 to 40", "Rounding 52 to 50", "Multiplying the rounds"],
        connect: "Why do the two rounding errors partly cancel?",
        misconception: "Rounding only one factor and multiplying by the other exactly." } },

    { phase: "monitor", title: "Zayd rounds <em>both</em>, then checks the drift",
      lead: "Round both factors — then see how far the estimate sits from the exact answer.",
      goal: "Rounding both ways: the estimate is a range, not a guess.",
      pull: "Both rounded up would make the estimate too big — here one goes up and one goes down.",
      rail: { launch: "Before you tap: which way did each factor round?",
        monitor: ["Rounding 38 up", "Rounding 52 down", "Reading the drift"],
        connect: "Why is 2,000 safe for this decision?",
        misconception: "Reporting an estimate without its direction." } },

    { phase: "monitor", title: "Omar looks for a <em>friendly pair</em>",
      lead: "Compatible numbers are picked because they are easy — not because they are nearest.",
      goal: "Use a compatible pair when the factors invite one.",
      pull: "Compatible numbers are picked because they are easy, not because they are nearest.",
      rail: { launch: "Before you tap: which pair do you already know by heart?",
        monitor: ["Spotting 40 and 50", "Multiplying the pair", "Saying why it is compatible"],
        connect: "How is a compatible pair different from just rounding?",
        misconception: "Believing compatible numbers must be the nearest round numbers." } },

    { phase: "monitor", title: "Which answers could be <em>real</em>?",
      lead: "Four claimed products for the run. The estimate catches the impossible ones.",
      goal: "Use the estimate to flag an answer that cannot be right.",
      pull: "Close to my estimate — or nowhere near.",
      rail: { launch: "Compare each claim to your estimate before you sort.",
        monitor: ["Comparing claims to 2,000", "Spotting 197 as too small", "Spotting 13,630 as too big"],
        connect: "What made the impossible claims impossible?",
        misconception: "Accepting any tidy-looking product." } },

    { phase: "connect", title: "Areej <em>rounds</em>. Bader finds <em>compatible pairs</em>",
      lead: "Areej: round both to tens. Bader: pick a pair he knows by heart. Both land near 1,976.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing rounding and compatible pairs", "Checking both are near 1,976", "Saying when each helps"],
        connect: "Which method would you use for 35 × 42?",
        misconception: "Believing rounding is the only estimation strategy." } },

    { phase: "synth", title: "On the <em>board</em>: round both factors",
      lead: "Round both factors to numbers you can multiply in your head. The estimate carries its direction.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming each round", "Naming the direction", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Rounding both factors up and calling the estimate safe." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "47 × 29 — round both factors to the nearest ten. What is the estimate?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Round each factor on its own line.",
        monitor: ["Rounding 47 to 50", "Rounding 29 to 30", "Multiplying 50 × 30"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 1,200 — only one factor was rounded." } },

    { phase: "connect", title: "The beams are <em>estimated</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the production frame becomes an array — rows and columns as parts of one product.",
      rail: { launch: "Ask three students to say their estimate and its direction.",
        monitor: ["Able to explain the rounding", "Still rounds one factor only", "Ready for arrays"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [which, setWhich] = useState("both");
    const [on, setOn] = useState(false);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Will the beams fit?"
            text="The beam run for the tower roof: 38 lengths, 52 books per bundle. Before any cutting, the estimate must say whether they fit."
            clue="The two rounding errors work against each other">
            <NoticeWonder draw={drawSouq} height={254} award={award}
              notices={["38 is near 40", "52 is near 50", "The product is near 2,000", "One rounds up, one rounds down"]}
              wonders={["About how many books altogether?", "Is 2,000 a safe estimate?", "What if both numbers rounded up?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the cut"
            text="Omar asks for the estimate before the bundles are cut — the roof run needs a number that says the beams fit."
            clue="Round both factors to numbers you can multiply in your head.">
            <LaunchEstimate draw={drawSouq} height={254} award={award}
              label="About how many books to order?" min={1000} max={3000} start={2000} unit="books"
              after="Locked. Now let us see which numbers you changed."
              note="The order counts are simulated — the estimate works on any run." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd rounds both, then checks the drift"
            text="He can round both factors or show the drift — the class must say which way each factor went."
            clue="38 rounds up, 52 rounds down">
            <ExploreChips draw={makeRoundBoth43(which)} height={256}
              label="Round, then compare"
              value={which}
              onPick={(v) => setWhich(v)}
              chips={[{ v: "both", label: "round both" }, { v: "drift", label: "how far off?" }]}
              caption={<MathEl omml={which === "both" ? M.rounded : M.exact} size="xl" display="block" />}
              footnote="38 rounds up, 52 rounds down — the two errors work against each other." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar looks for a friendly pair"
            text="His pairs are picked because they are easy — 40 and 50 — not because they are nearest."
            clue="Compatible numbers are picked because they are easy, not because they are nearest.">
            <ExploreChips draw={makeCompatible(on)} height={252}
              label="Look for a friendly pair"
              value={on ? 1 : 0}
              onPick={(v) => setOn(v === 1)}
              chips={[{ v: 0, label: "the products" }, { v: 1, label: "reveal the pairs" }]}
              caption={<MathEl omml={M.compatible} size="xl" display="block" />}
              footnote="Compatible numbers are picked because they are easy, not because they are nearest." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Which answers could be real?"
            text="Omar and Zayd lay four claimed products on the table. The estimate catches the ones that cannot be right."
            clue="Close to my estimate — or nowhere near">
            <CardSort award={award} columns={2} commitLabel="Check the claims"
              items={[
                { id: "a1", text: "38 × 52 = 1,976", target: "ok" },
                { id: "a2", text: "38 × 52 = 197", target: "no" },
                { id: "a3", text: "47 × 29 = 1,363", target: "ok" },
                { id: "a4", text: "47 × 29 = 13,630", target: "no" }
              ]}
              targets={[
                { id: "ok", label: "reasonable — close to my estimate" },
                { id: "no", label: "not reasonable — nowhere near" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one safe estimate"
            text="Areej rounds both to tens. Bader picks a compatible pair he knows by heart. Both land near 1,976."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Areej's way — round to tens", omml: M.rounded, h: 92,
                      quote: "40 times 50 is 2,000, and that is easy." }}
              right={{ name: "Bader's way — compatible pair", omml: M.compatible, h: 92,
                       quote: "I look for a pair I already know by heart." }}
              same={["Both give a friendly product", "Both are close to 1,976", "Both can be done in the head"]}
              diff={["Areej always rounds to tens", "Bader picks whatever is easiest",
                     "Bader's works well with 25s and 50s"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The estimate is drawn with its direction"
            text="Zayd builds only what the class can justify: both factors rounded, the direction named, the decision made."
            clue="Round both factors to numbers you can multiply in your head.">
            <BoardScreen draw={drawBoard43} height={430}
              caption="Round both factors to numbers you can multiply in your head." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the checked estimate"
            text="47 × 29, rounded to the nearest ten. Show the estimate — and what it protects."
            clue="50 × 30 = 1,500">
            <ShowWhatYouKnow award={award}
              prompt="Estimate 47 × 29 by rounding both factors to the nearest ten."
              omml={M.swyk}
              options={[{ v: "a", text: "1,200" }, { v: "b", text: "1,500" }, { v: "c", text: "800" }, { v: "d", text: "15,000" }]}
              right="b"
              support={{
                yes: "Yes — 50 × 30 = 1,500. The exact answer, 1,363, is close.",
                notYet: "Not yet — round each factor on its own line first.",
                draw: drawSupport43, h: 82,
                hint: "Is 47 nearer to 40 or 50? Now do the same for 29."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The beams are estimated"
            text="Omar signs the estimate with its direction — the beams fit. Zayd spreads the production frame: rows and columns, waiting to be read as parts of one product."
            artifact="Tower plan · beams estimated"
            next="The production frame reveals rows and columns as parts of one product.">
            <Closing game={game} omml={M.rule}
              action="Estimate a real two-factor product tonight two ways — rounding and a compatible pair — and say which was safer." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
