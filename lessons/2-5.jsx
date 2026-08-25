/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-5 · Subtract Whole Numbers
   Standard 4.NBT.B.4   I can ... subtract multi-digit numbers using the
   standard algorithm, and explain the regrouping.
   =========================================================================== */

const M = {
  problem: om(mt("534-268")),
  answer: om(mt("534-268=266")),
  estimate: om(mt("530-270=260")),
  regroup: om(mt("4"), mnor(" ones cannot take "), mt("8"), mnor(" — trade a ten")),
  traded: om(mt("14-8=6")),
  check: om(mt("266+268=534")),
  swyk: om(mt("725-348")),
  swykAnswer: om(mt("725-348=377"))
};

const drawStock = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 290), p3 = D.at(f, 300, 430);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the canteen stockroom", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, {
    x: 60, y: 62, w: W - 120, h: 46, prog: p2, total: 534,
    parts: [{ v: 268, label: "268 sold", col: "#C74440" }, { v: 266, label: "?", col: "#2D70B3" }]
  });
  if (p3 > 0) {
    D.txt(ctx, "534 juice cartons at the start", W / 2, 142,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: p3 });
    D.txt(ctx, "how many are left?", W / 2, H - 20, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const makeColumnSub = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: W / 2 - 90, y: 30, w: 180, h: H - 70, value: 0, on: () => onStep((step + 1) % 4) });
  D.columnOp(ctx, { x: W / 2 - 90, y: 30, w: 180, a: 534, b: 268, op: "-", prog: step / 3, t: frame, cw: 42 });
  const notes = ["start with the ones — tap to step", "4 cannot take 8 — trade a ten, now 14 − 8 = 6",
                 "2 tens cannot take 6 — trade a hundred, now 12 − 6 = 6", "4 − 2 = 2 hundreds"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 13.5, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeTrade = (traded, onTrade) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onTrade) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onTrade(!traded) });
  const s = 8, base = H - 74;
  /* three tens rods and four ones, then one rod breaks into ten ones */
  const rods = traded ? 2 : 3;
  const ones = traded ? 14 : 4;
  for (let r = 0; r < rods; r++) {
    D.digitBlocks(ctx, { x: 80 + r * 26, y: base - s * 10, unit: 10, prog: 1, col: "#2D70B3", s: s });
  }
  for (let o = 0; o < ones; o++) {
    const col = o < (ones - (traded ? 10 : 0)) ? "#FA7E19" : "#C9A227";
    D.digitBlocks(ctx, {
      x: 210 + (o % 7) * 14, y: base - s - Math.floor(o / 7) * 14, unit: 1, prog: 1, col: col, s: s
    });
  }
  D.txt(ctx, rods + " tens", 106, base + 22, { size: 12.5, col: "#2D70B3", font: "marker" });
  D.txt(ctx, ones + " ones", 254, base + 22, { size: 12.5, col: "#FA7E19", font: "marker" });
  D.txt(ctx, traded ? "one ten became ten ones — now 14 ones can give away 8"
                    : "4 ones cannot give away 8",
    W / 2, 36, { size: 14.5, col: traded ? "#34D399" : "#C74440", font: "marker" });
  if (!traded) D.txt(ctx, "tap to trade a ten", W / 2, H - 16,
    { size: 12.5, col: "#C9A227", font: "marker" });
};

const drawBoard25 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "What does crossing out really mean?" });
  const p1 = D.at(f, 20, 210), p2 = D.at(f, 220, 380), p3 = D.at(f, 390, 550), p4 = D.at(f, 550, 700);
  D.columnOp(ctx, { x: W / 2 - 176, y: 86, w: 176, a: 534, b: 268, op: "-", prog: p1, t: frame, cw: 46 });
  if (p2 > 0) {
    D.txt(ctx, "4 ones cannot take 8", W / 2 + 86, 138, { size: 16, col: "#C74440", font: "marker", alpha: p2 });
    D.txt(ctx, "so trade one ten for ten ones", W / 2 + 86, 166,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 260, 350) });
  }
  if (p3 > 0) {
    D.txt(ctx, "3 tens becomes 2 tens", W / 2 + 86, 208, { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "4 ones becomes 14 ones", W / 2 + 86, 232, { size: 14, col: "#C9A227", font: "marker", alpha: D.at(f, 430, 510) });
    D.txt(ctx, "the number itself has not changed", W / 2 + 86, 262,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 470, 550) });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "regrouping renames the number — it never changes its value",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 590, 670) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 620, 720), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport25 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 70, y: -14, w: 140, a: 725, b: 348, op: "-", prog: 1, cw: 34 });
};

const LESSON = {
  code: "2-5",
  storageKey: "daf-g4-t2-l5",
  title: "Subtract Whole Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-5 · 4.NBT.B.4",
  math: M,
  ixl: ["FCP", "6SZ"],

  metas: [
    { phase: "warmup", title: "The reserve <em>and the spend</em>",
      lead: "534 juice cartons in the stockroom. 268 sold. The approved spend is written beside the reserve.",
      goal: "Notice the missing part — it has a name: the difference.",
      pull: "The stockroom counts are simulated — the regrouping works on any pair.",
      rail: { launch: "Fictional frame. Just describe the bar — no working yet.",
        monitor: ["Noticing the whole is 534", "Noticing one part is unknown", "Estimating the gap"],
        connect: "What is the missing part called?",
        misconception: "Reading the bar as two separate numbers rather than a part and a whole." } },

    { phase: "launch", title: "How many are <em>left</em>?",
      lead: "534 − 268. The reserve, estimated first — then the difference proven.",
      goal: "Estimate the difference before the algorithm.",
      pull: "The difference must be near the estimate.",
      rail: { launch: "Give an estimate and the place you rounded to.",
        monitor: ["Rounding to tens", "Subtracting the rounds", "Checking the gap is plausible"],
        connect: "What should the exact difference be near?",
        misconception: "Subtracting the smaller digit from the bigger digit in each column." } },

    { phase: "monitor", title: "Zayd steps the <em>subtraction</em>",
      lead: "Ones, tens, hundreds — each column trades before it is subtracted.",
      goal: "Subtract by place, trading a ten or a hundred when a column cannot give.",
      pull: "Trade, then subtract.",
      rail: { launch: "Predict the trade before Zayd steps the column.",
        monitor: ["Trading a ten for the ones", "Trading a hundred for the tens", "Checking the hundreds after the trades"],
        connect: "Why did the tens column change before it was touched?",
        misconception: "Answering 8 − 4 = 4 in the ones instead of ungrouping a ten." } },

    { phase: "monitor", title: "Omar trades <em>one ten</em>",
      lead: "4 ones cannot take 8. Trade one ten — the number is renamed, its value does not change.",
      goal: "See ungrouping as a rename, not a change of value.",
      pull: "Subtraction does not commute: never answer 8 − 4 instead of ungrouping.",
      rail: { launch: "Before you tap: how many ones can give away 8?",
        monitor: ["Trading one ten for ten ones", "Counting 14 − 8 = 6", "Saying the value stayed the same"],
        connect: "Did 534 become a different number when you traded?",
        misconception: "Subtraction treated as commutative — 73 − 25 answered as 5 − 3." } },

    { phase: "monitor", title: "Check by <em>adding back</em>",
      lead: "Four lines from the stockroom: some prove the difference, some are just the story.",
      goal: "Verify a difference by adding it back to the subtrahend.",
      pull: "Difference + subtrahend = minuend.",
      rail: { launch: "Name what each line is doing before you place it.",
        monitor: ["Spotting the add-back", "Spotting the estimate", "Asking what 268 − 266 would mean"],
        connect: "Which line proves 266?",
        misconception: "Treating the estimate 530 − 270 as the answer." } },

    { phase: "connect", title: "Aya trades. <em>Musa adds back.</em>",
      lead: "Aya trades, then subtracts. Musa adds the difference back to verify. Both defend 266.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the trades", "Following the add-back", "Seeing both defend 266"],
        connect: "Which check would catch a trade made the wrong way?",
        misconception: "Believing the add-back is only for checking, never for finding the difference." } },

    { phase: "synth", title: "On the <em>board</em>: subtract by place, verify by adding back",
      lead: "Draw the columns. Trade the ten. The regrouping renames the number — it never changes its value.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the trade as it is drawn", "Saying the value is unchanged", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Crossing out digits without saying what was traded." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "725 − 348 — the proven difference?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the trades you made.",
        monitor: ["Trading in the ones", "Trading in the tens", "Adding the difference back"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 387 — the tens trade was forgotten." } },

    { phase: "connect", title: "The reserve is <em>proven</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the warehouse expansion plan arrives.",
      rail: { launch: "Ask three students to say where their trade happened.",
        monitor: ["Able to explain the trade", "Still needs the blocks", "Ready for four-place differences"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [traded, setTraded] = useState(false);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The reserve and the spend"
            text="The stockroom bar: 534 cartons at the start, 268 sold, and the council's approved spend written beside the reserve. The missing part is the difference."
            clue="The missing part has a name">
            <NoticeWonder draw={drawStock} height={256} award={award}
              notices={["The whole is 534", "One part is 268", "The other part is unknown", "The spend is written beside the reserve"]}
              wonders={["How many cartons are left?", "Which column will need a trade?", "How is the difference checked?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The reserve, estimated first"
            text="Omar asks for the estimate before any trade is made — the reserve report must carry a difference the class can prove."
            clue="Round both numbers, then subtract the rounds">
            <LaunchEstimate draw={drawStock} height={256} award={award}
              label="534 − 268 — the reserve, estimated first" min={200} max={350} start={250} unit="cartons"
              after="Locked. Now step the subtraction and find the trades."
              note="The stockroom counts are simulated — the regrouping works on any pair." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd steps the subtraction"
            text="He can step any column, but the class must predict the trade before the column changes."
            clue="Trade, then subtract">
            <ExploreChips draw={makeColumnSub(step, setStep)} height={252}
              label="Step the columns of 534 − 268"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "start with the ones" }, { v: 1, label: "the ones trade" }, { v: 2, label: "the tens trade" }, { v: 3, label: "the hundreds" }]}
              caption={<MathEl omml={M.regroup} size="lg" display="block" />}
              footnote="4 ones cannot take 8 — trade a ten, now 14 − 8 = 6." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar trades one ten"
            text="His blocks show it plainly: 4 ones cannot give away 8 — so one ten is ungrouped into ten ones."
            clue="The number is renamed — its value does not change">
            <ExploreChips draw={makeTrade(traded, setTraded)} height={252}
              label="Can 4 ones give away 8?"
              value={traded ? 1 : 0}
              onPick={(v) => setTraded(v === 1)}
              chips={[{ v: 0, label: "no trade" }, { v: 1, label: "trade a ten" }]}
              caption={<MathEl omml={M.traded} size="lg" display="block" />}
              footnote="Subtraction does not commute: never answer 8 − 4 instead of ungrouping." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Check by adding back"
            text="Omar and Zayd lay four lines from the stockroom on the table. The reserve report wants the difference proven — difference plus sold equals the start."
            clue="Difference + subtrahend = minuend">
            <CardSort award={award} columns={2} commitLabel="Prove the difference"
              items={[
                { id: "s1", text: "266 + 268 = 534", target: "check" },
                { id: "s2", text: "268 − 266", target: "story" },
                { id: "s3", text: "530 − 270 = 260", target: "check" },
                { id: "s4", text: "266", target: "story" }
              ]}
              targets={[
                { id: "check", label: "a check — it proves the difference" },
                { id: "story", label: "part of the story — not a check" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 266"
            text="Aya trades, then subtracts. Musa adds the difference back to verify. Both defend 266."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Aya's way — trade, then subtract", omml: M.traded, h: 92,
                      quote: "I ungrouped a ten, then 14 − 8 = 6." }}
              right={{ name: "Musa's way — add back to verify", omml: M.check, h: 92,
                       quote: "266 back into 268 gives 534 — the start." }}
              same={["Both defend 266", "Both trade before subtracting", "Both can be checked"]}
              diff={["Aya's work shows the trades", "Musa's work proves the difference", "Musa's check catches a lost trade"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The trade is drawn, not declared"
            text="Zayd builds only what the class can justify: the ten ungrouped, the columns renamed, the value unchanged."
            clue="Regrouping renames the number — it never changes its value">
            <BoardScreen draw={drawBoard25} height={430}
              caption="Subtract by place; verify by adding back." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the reserve report"
            text="725 − 348. Show the difference — and the add-back that proves it."
            clue="Difference + sold = the start">
            <ShowWhatYouKnow award={award}
              prompt="725 − 348 — the proven difference?"
              omml={M.swyk}
              options={[{ v: "a", text: "377" }, { v: "b", text: "387" }, { v: "c", text: "375" }, { v: "d", text: "477" }]}
              right="a"
              support={{
                yes: "Yes — the trades run left and 377 adds back to 725.",
                notYet: "Not yet — add it back: 377 + 348 must be 725.",
                draw: drawSupport25, h: 82,
                hint: "5 ones cannot take 8 — the ones trade. Then the tens must take the ten."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The reserve is proven"
            text="Omar signs the reserve report — difference, and the add-back beside it. Zayd carries the warehouse expansion plan in: the reserve and the spend now stretch across more places."
            artifact="Reserve report · difference + check"
            next="The warehouse expansion plan arrives — the reserve and the spend now stretch across more places.">
            <Closing game={game} omml={M.check}
              action="Subtract two real amounts tonight — a bill, a distance — and add the difference back." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
