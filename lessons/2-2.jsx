/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-2 · Estimate Sums and Differences
   Standard 4.NBT.B.4     I can ... estimate sums and differences of
   multi-digit numbers, and say whether an answer is reasonable.
   =========================================================================== */

const M = {
  problem: om(mt("4,285+3,671")),
  roundThousand: om(mt("4,000+4,000=8,000")),
  roundHundred: om(mt("4,300+3,700=8,000")),
  exact: om(mt("4,285+3,671=7,956")),
  diffProblem: om(mt("8,142-2,905")),
  diffEstimate: om(mt("8,000-3,000=5,000")),
  swyk: om(mt("5,218+2,874")),
  swykEstimate: om(mt("5,000+3,000=8,000")),
  reasonable: om(mnor("close enough to check the answer"))
};

/* Warm-Up / Launch: a receipt, and the estimate hovering beside it */
const drawReceipt = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 260), p3 = D.at(f, 270, 420);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  ctx.save();
  ctx.globalAlpha = p1 * 0.9;
  D.rr(ctx, W / 2 - 116, 26, 232, H - 74, 10);
  ctx.strokeStyle = "rgba(234,244,242,.4)"; ctx.lineWidth = 1.6; ctx.stroke();
  ctx.restore();
  D.txt(ctx, "book fair", W / 2, 48, { size: 12, col: "#C9A227", font: "marker", alpha: p1 });

  const rows = [["Monday", 4285], ["Tuesday", 3671]];
  rows.forEach((r, n) => {
    const a = D.at(p2, n * 0.4, n * 0.4 + 0.5);
    if (a <= 0) return;
    D.txt(ctx, r[0], W / 2 - 92, 84 + n * 34, { size: 13, col: "rgba(234,244,242,.7)", font: "marker", align: "left", alpha: a });
    D.txt(ctx, r[1].toLocaleString("en-US"), W / 2 + 92, 84 + n * 34,
      { size: 17, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
  });

  if (p3 > 0) {
    D.marker(ctx, [[W / 2 - 96, 136], [W / 2 + 96, 136]], p3, "rgba(234,244,242,.5)", 1.6);
    D.txt(ctx, "about how many books?", W / 2, 168, { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "4,000 + 4,000 = 8,000", W / 2, H - 34,
      { size: 19, col: "#34D399", font: "marker", alpha: D.at(f, 360, 450) });
  }
};

/* Monitor A: round both addends on their own line */
const makeRoundBoth = (place, onPlace) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onPlace) D.tap(ctx, { x: 62, y: 56, w: W - 124, h: 190, value: 0, on: () => onPlace(place === 1000 ? 100 : 1000) });
  const cfg = place === 1000
    ? [{ v: 4285, lo: 4000, hi: 5000 }, { v: 3671, lo: 3000, hi: 4000 }]
    : [{ v: 4285, lo: 4200, hi: 4300 }, { v: 3671, lo: 3600, hi: 3700 }];
  cfg.forEach((c, n) => {
    D.roundLine(ctx, { x: 62, y: 62 + n * 96, w: W - 124, lo: c.lo, hi: c.hi, value: c.v, prog: 1 });
  });
  const est = place === 1000 ? "4,000 + 4,000 = 8,000" : "4,300 + 3,700 = 8,000";
  D.txt(ctx, est, W / 2, H - 18, { size: 16, col: "#C9A227", font: "marker" });
};

/* Monitor B: how close is the estimate to the exact answer? */
const makeCloseness = (place, onPlace) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onPlace) { const order = [1000, 100, 10]; D.tap(ctx, { x: 56, y: H / 2 - 40, w: W - 112, h: 80, value: 0, on: () => { const i = order.indexOf(place); onPlace(order[(i + 1) % order.length]); } }); }
  const exact = 7956;
  const est = place === 1000 ? 8000 : place === 100 ? 8000 : 7960;
  const x = 56, w = W - 112, y = H / 2 + 6;
  const lo = 7800, hi = 8100;
  const px = (n) => x + ((n - lo) / (hi - lo)) * w;
  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.7)", 2.2);
  [7800, 7900, 8000, 8100].forEach((n) => {
    ctx.save(); ctx.strokeStyle = "rgba(234,244,242,.4)"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(px(n), y - 7); ctx.lineTo(px(n), y + 7); ctx.stroke(); ctx.restore();
    D.txt(ctx, n.toLocaleString("en-US"), px(n), y + 24, { size: 10.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 500 });
  });
  ctx.save();
  ctx.beginPath(); ctx.arc(px(exact), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#34D399"; ctx.fill(); ctx.restore();
  D.txt(ctx, "exact 7,956", px(exact), y - 26, { size: 12.5, col: "#34D399", font: "marker" });

  ctx.save();
  ctx.beginPath(); ctx.arc(px(est), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#C9A227"; ctx.fill(); ctx.restore();
  D.txt(ctx, "estimate " + est.toLocaleString("en-US"), px(est), y + 50, { size: 12.5, col: "#C9A227", font: "marker" });

  const gap = Math.abs(est - exact);
  D.txt(ctx, "off by " + gap, W / 2, 34, { size: 15, col: gap <= 20 ? "#34D399" : "#FA7E19", font: "marker" });
  D.txt(ctx, place === 10 ? "rounding to a smaller place gets you closer"
                          : "close enough to check whether an answer makes sense",
    W / 2, H - 14, { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawBoard22 = (ctx, W, H, frame) => {
  const CYCLE = 740, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Is that answer reasonable?" });
  const p1 = D.at(f, 20, 150), p2 = D.at(f, 150, 320), p3 = D.at(f, 320, 480), p4 = D.at(f, 470, 630);

  D.txt(ctx, "4,285 + 3,671", W / 2, 96, { size: 28, col: "#EAF4F2", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.roundLine(ctx, { x: 84, y: 168, w: W - 168, lo: 4000, hi: 5000, value: 4285, prog: p2 });
  }
  if (p3 > 0) {
    D.roundLine(ctx, { x: 84, y: 268, w: W - 168, lo: 3000, hi: 4000, value: 3671, prog: p3 });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "4,000 + 4,000 = 8,000 — so the answer should be near 8,000",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 510, 590) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 550, 650), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport22 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.roundLine(ctx, { x: 40, y: 32, w: W - 80, lo: 5000, hi: 6000, value: 5218, prog: 1 });
};

const LESSON = {
  code: "2-2",
  storageKey: "daf-g4-t2-l2",
  title: "Estimate Sums and Differences",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-2 · 4.NBT.B.4",
  math: M,
  ixl: ["DU5", "5TQ", "5F9", "GWS"],

  metas: [
    { phase: "warmup", title: "Two days of the fair <em>under sealed covers</em>",
      lead: "Monday 4,285 books. Tuesday 3,671. The totals sit under sealed covers — the council wants a number for the newsletter before lunch.",
      goal: "Notice that an estimate can answer a real question before the exact sum.",
      pull: "The fair's book counts are simulated — the rounding works on any pair.",
      rail: { launch: "Fictional frame. I am not asking for the exact total yet — just look at the two sealed lines.",
        monitor: ["Noticing both are near 4,000 and 3,000", "Guessing wildly", "Wonding how close must be close enough"],
        connect: "When is about good enough, and when is it not?",
        misconception: "Assuming the closest estimate is always the best one." } },

    { phase: "launch", title: "Before the covers open",
      lead: "4,285 + 3,671. What total do you trust for the newsletter?",
      goal: "Lock an estimate to the nearest hundred or thousand.",
      pull: "An estimate is a decision with a reason.",
      rail: { launch: "The head teacher needs a number by lunch. Exact, or about?",
        monitor: ["Rounding both to thousands", "Rounding both to hundreds", "Adding exactly before estimating"],
        connect: "Which precision does this decision actually need?",
        misconception: "Estimating only one number and adding it to the other exactly." } },

    { phase: "monitor", title: "Zayd rounds <em>both</em> addends",
      lead: "Thousands, or hundreds — round both numbers, then add the rounds.",
      goal: "Round both addends to the same place before adding.",
      pull: "Both rounds give 8,000 — the decision is which place to round to.",
      rail: { launch: "Predict the estimate before the line shows it.",
        monitor: ["Rounding both numbers", "Adding the rounds", "Choosing the place on purpose"],
        connect: "Why do both places give 8,000 here?",
        misconception: "Rounding one addend and leaving the other exact." } },

    { phase: "monitor", title: "Which bid could be <em>real</em>?",
      lead: "Three merchants bid totals for the two days. The ledger catches the impossible one.",
      goal: "Use the estimate to flag an answer that cannot be right.",
      pull: "The first caught error of the unit.",
      rail: { launch: "Compare each bid to your 8,000 before you sort.",
        monitor: ["Comparing bids to the estimate", "Sorting by digits", "Checking 11,956 is too far"],
        connect: "What made the impossible bid impossible?",
        misconception: "Accepting any total that looks tidy." } },

    { phase: "monitor", title: "How close is <em>close enough</em>?",
      lead: "Slide the rounding place and watch the estimate land against the exact answer.",
      goal: "Closer rounding is not free — it costs work; choose the place the decision needs.",
      pull: "A smaller place gets you closer.",
      rail: { launch: "How far off is each estimate — and does the difference matter here?",
        monitor: ["Reading the gap", "Choosing thousands for speed", "Choosing tens for precision"],
        connect: "When would you round to tens instead of thousands?",
        misconception: "Believing only the exact answer is ever useful." } },

    { phase: "connect", title: "Aya rounds <em>coarse</em>. Musa rounds <em>fine</em>",
      lead: "Aya rounds to thousands, Musa to hundreds. Both reach 8,000 for a different reason.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the rounding places", "Comparing the work each takes", "Checking both reach 8,000"],
        connect: "Which rounding would you use for a budget of ten thousand?",
        misconception: "Thinking finer rounding is always better." } },

    { phase: "synth", title: "On the <em>board</em>: an estimate with a reason",
      lead: "Round both addends. Add the rounds. The answer should sit near the estimate.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next line", "Naming the rounding place", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Estimating without naming the place rounded to." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "The council opens the final cover: 5,218 + 2,874. Which total is reasonable?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Round both addends first.",
        monitor: ["Rounding to thousands", "Adding the rounds", "Checking against 8,000"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Reporting the exact sum when an estimate was asked for." } },

    { phase: "connect", title: "The reasonable bid is <em>unsealed</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the first market row — exact, with a check beside it.",
      rail: { launch: "Ask three students to say their estimate and its reason.",
        monitor: ["Able to explain the place choice", "Still rounds only one number", "Ready to check answers"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [place, setPlace] = useState(1000);
    const [close, setClose] = useState(1000);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Two days of the fair under sealed covers"
            text="The council table holds the book fair's sealed totals — 4,285 for Monday, 3,671 for Tuesday. The newsletter goes out before lunch."
            clue="A number the council can act on, not a number that is exact">
            <NoticeWonder draw={drawReceipt} height={256} award={award}
              notices={["Both days are near a thousand", "Monday is closer to 4,000", "The covers are still sealed", "The newsletter is waiting"]}
              wonders={["About how many books altogether?", "Does the council need the exact number?", "How close must close be?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar locks the estimate before the covers open"
            text="Before anyone breaks a seal, the class commits one total it trusts. The council needs it by lunch — exact or about?"
            clue="Round to a place the decision can live with">
            <LaunchEstimate draw={drawReceipt} height={256} award={award}
              label="What total do you trust for 4,285 + 3,671?" min={6000} max={10000} start={8000} unit="books"
              after="Locked. Now round both addends and see if the line holds."
              note="The fair's book counts are simulated — the rounding works on any pair." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd rounds both addends on the line"
            text="He can round both numbers to thousands or to hundreds — the class must say which estimate each place gives."
            clue="Round BOTH numbers to the same place, then add the rounds">
            <ExploreChips draw={makeRoundBoth(place, setPlace)} height={252}
              label="Round both addends, then add the rounds"
              value={place}
              onPick={(v) => setPlace(v)}
              chips={[{ v: 1000, label: "round both to thousands" }, { v: 100, label: "round both to hundreds" }]}
              caption={<MathEl omml={place === 1000 ? M.roundThousand : M.roundHundred} size="xl" display="block" />}
              footnote="Both places give 8,000 here — the decision is which place the decision needs." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="both"
            title="Which bid could be real?"
            text="Three merchants bid totals for the two days. The ledger catches the one that cannot be right."
            clue="Compare each bid to the 8,000 estimate">
            <CardSort award={award} columns={2} commitLabel="Mark the ledger"
              items={[
                { id: "bA", text: "Bid A · 7,956", target: "possible" },
                { id: "bB", text: "Bid B · 11,956", target: "impossible" },
                { id: "bC", text: "Bid C · 8,056", target: "possible" }
              ]}
              targets={[
                { id: "possible", label: "reasonable — near the estimate" },
                { id: "impossible", label: "impossible — too far from the estimate" }
              ]} />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar asks how close is close enough"
            text="He slides the rounding place and watches the estimate land against the exact answer — 7,956."
            clue="A smaller place gets you closer — at the cost of more work">
            <ExploreChips draw={makeCloseness(close, setClose)} height={252}
              label="How close is the estimate to the exact 7,956?"
              value={close}
              onPick={(v) => setClose(v)}
              chips={[{ v: 1000, label: "round to thousands" }, { v: 100, label: "round to hundreds" }, { v: 10, label: "round to tens" }]}
              caption={<MathEl omml={M.reasonable} size="lg" display="block" />}
              footnote="Close enough to check whether an answer makes sense." />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 8,000"
            text="Aya rounds coarse to thousands. Musa rounds fine to hundreds. Both reach 8,000 — for different reasons."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Aya's way — round both, add the rounds", omml: M.roundThousand, h: 92,
                      quote: "I rounded both to 4,000 — the total is about 8,000." }}
              right={{ name: "Musa's way — a finer place", omml: M.roundHundred, h: 92,
                       quote: "I rounded to hundreds — 4,300 + 3,700 is still 8,000." }}
              same={["Both reach 8,000", "Both round both addends", "Both defend the number to the council"]}
              diff={["Aya's place is coarser and faster", "Musa's place is finer and nearer", "Aya's is enough for a newsletter; Musa's for a tighter budget"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The estimate is drawn with its reason"
            text="Zayd builds only what the class can justify: both addends rounded, the rounds added, the exact answer near."
            clue="The estimate carries its rounding place">
            <BoardScreen draw={drawBoard22} height={430}
              caption="An estimate is a decision with a reason." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The council opens the final cover"
            text="5,218 + 2,874. Which total do you report — and with what rounding place?"
            clue="Round both addends, then add the rounds">
            <ShowWhatYouKnow award={award}
              prompt="The council opens the final cover: 5,218 + 2,874. Which total is reasonable?"
              omml={M.swyk}
              options={[{ v: "a", text: "8,000" }, { v: "b", text: "7,000" }, { v: "c", text: "9,000" }, { v: "d", text: "8,092" }]}
              right="a"
              support={{
                yes: "Yes — 5,000 + 3,000 = 8,000, close enough to check the answer.",
                notYet: "Not yet — round both addends first, then add the rounds.",
                draw: drawSupport22, h: 82,
                hint: "5,218 rounds to 5,000. What does 2,874 round to?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The reasonable bid is unsealed"
            text="Omar files the estimate with its reason. Zayd carries the first market row to the ledger — this time the total must be exact, with a check beside it."
            artifact="Souq ledger · reasonable bid unsealed"
            next="The first market row must be combined exactly — with a check beside the total.">
            <Closing game={game} omml={M.reasonable}
              action="Estimate a real sum two ways tonight — a different rounding place each time — and say which precision the decision needed." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
