/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-6 · Subtract Greater Numbers
   Standard 4.NBT.B.4   I can ... subtract numbers up to six digits,
   keeping every place lined up.
   =========================================================================== */

const M = {
  problem: om(mt("482,517-96,348")),
  answer: om(mt("482,517-96,348=386,169")),
  estimate: om(mt("483,000-96,000=387,000")),
  regroup: om(mnor("line up the places, not the edges")),
  traded: om(mt("17-8=9")),
  check: om(mt("386,169+96,348=482,517")),
  swyk: om(mt("310,254-87,169")),
  swykAnswer: om(mt("310,254-87,169=223,085"))
};

const drawStock = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 290), p3 = D.at(f, 300, 430);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two towns in Makkah Region", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, {
    x: 60, y: 62, w: W - 120, h: 46, prog: p2, total: 482517,
    parts: [{ v: 96348, label: "96,348", col: "#C74440" }, { v: 386169, label: "?", col: "#2D70B3" }]
  });
  if (p3 > 0) {
    D.txt(ctx, "482,517 people in the larger town", W / 2, 142,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: p3 });
    D.txt(ctx, "how many more than the smaller town?", W / 2, H - 20, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const makeColumnSub = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: W / 2 - 132, y: 30, w: 264, h: H - 70, value: 0, on: () => onStep((step + 1) % 7) });
  D.columnOp(ctx, { x: W / 2 - 132, y: 30, w: 264, a: 482517, b: 96348, op: "-", prog: step / 6, t: frame, cw: 26 });
  const notes = ["line the places up — tap to step", "ones: 7 − 8 needs a trade, 17 − 8 = 9",
                 "tens: 0 − 4 needs a trade, 10 − 4 = 6", "hundreds: 4 − 3 = 1",
                 "thousands: 1 − 6 needs a trade, 11 − 6 = 5",
                 "ten thousands: 7 − 9 needs a trade, 17 − 9 = 8", "hundred thousands: 3 − 0 = 3"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 13.5, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeAlign = (mode, onMode) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onMode) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onMode(mode === 1 ? 0 : 1) });
  const a = "482517", b = mode === 1 ? " 96348" : "96348 ";
  const cw = 46, x0 = W / 2 - 3 * cw;
  const names = ["hund. th.", "ten th.", "thousands", "hundreds", "tens", "ones"];
  for (let i = 0; i < 6; i++) {
    D.txt(ctx, names[i], x0 + i * cw + cw / 2, 40,
      { size: 9, col: "rgba(234,244,242,.45)", font: "mono", weight: 600 });
    ctx.save();
    D.rr(ctx, x0 + i * cw + 4, 54, cw - 8, 84, 7);
    ctx.strokeStyle = "rgba(234,244,242,.18)"; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
    D.txt(ctx, a[i], x0 + i * cw + cw / 2, 78, { size: 24, col: "#EAF4F2", font: "marker" });
    if (b[i] !== " ") {
      D.txt(ctx, b[i], x0 + i * cw + cw / 2, 118,
        { size: 24, col: mode === 1 ? "#34D399" : "#C74440", font: "marker" });
    }
  }
  D.txt(ctx, mode === 1 ? "lined up on the right — the ones sit under the ones"
                        : "lined up on the left — the 9 is pretending to be ten thousands",
    W / 2, H - 40, { size: 14, col: mode === 1 ? "#34D399" : "#C74440", font: "marker" });
  D.txt(ctx, mode === 1 ? "482,517 − 96,348 = 386,169" : "this gives a nonsense answer",
    W / 2, H - 16, { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const drawBoard25 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "What does crossing out really mean?" });
  const p1 = D.at(f, 20, 210), p2 = D.at(f, 220, 380), p3 = D.at(f, 390, 550), p4 = D.at(f, 550, 700);
  D.columnOp(ctx, { x: W / 2 - 210, y: 86, w: 220, a: 482517, b: 96348, op: "-", prog: p1, t: frame, cw: 36 });
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
  D.columnOp(ctx, { x: W / 2 - 100, y: -14, w: 200, a: 310254, b: 87169, op: "-", prog: 1, cw: 26 });
};

const LESSON = {
  code: "2-6",
  storageKey: "daf-g4-t2-l6",
  title: "Subtract Greater Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-6 · 4.NBT.B.4",
  math: M,
  ixl: ["TSJ", "WLN", "YPD"],

  metas: [
    { phase: "warmup", title: "The expansion plan <em>beside the reserve</em>",
      lead: "One town in Makkah Region has 482,517 people; the other 96,348. The expansion plan needs the difference.",
      goal: "Notice that the two numbers have different lengths — and that the places must still line up.",
      pull: "The town figures are simulated — the method works on any city-sized pair.",
      rail: { launch: "Fictional frame. Just look at the bar — no working yet.",
        monitor: ["Noticing the whole is 482,517", "Noticing the shorter number", "Estimating the gap"],
        connect: "Where should the 9 of 96,348 sit?",
        misconception: "Lining up the shorter number on the left edge." } },

    { phase: "launch", title: "How many <em>more</em>?",
      lead: "482,517 − 96,348. The difference, estimated to the nearest thousand first.",
      goal: "Estimate the big difference before the exact one.",
      pull: "The exact answer must sit near the estimate.",
      rail: { launch: "Round both to thousands. Roughly how many more?",
        monitor: ["Rounding to 483,000 and 96,000", "Subtracting the rounds", "Checking the gap is plausible"],
        connect: "What should the exact difference be near?",
        misconception: "Subtracting the smaller digit from the larger one in each column." } },

    { phase: "monitor", title: "Zayd lines the <em>places</em> up",
      lead: "Right-aligned on the ones, or left-aligned on the edges? The columns do not forgive a misread.",
      goal: "Line up the places, not the edges — the wrong column misreads.",
      pull: "Line up the places, not the edges.",
      rail: { launch: "Before you tap: where does the 9 sit?",
        monitor: ["Placing the 9 in the ten-thousands", "Seeing the ones under the ones", "Reading the misaligned 9 as ten thousands"],
        connect: "Why does the left-aligned version give nonsense?",
        misconception: "Lining up by the left edge so 96,348 starts in the hundred-thousands." } },

    { phase: "monitor", title: "Omar steps the <em>big subtraction</em>",
      lead: "Ones to hundred-thousands — the trades run left, through zeros when they appear.",
      goal: "Subtract six places with every trade shown.",
      pull: "17 − 8 = 9, and the trades keep going left.",
      rail: { launch: "Predict the trade before Omar steps the column.",
        monitor: ["Trading through the ones", "Trading when the tens hit zero", "Checking the hundred-thousands"],
        connect: "What happened in the tens when the ones traded?",
        misconception: "Answering 8 − 7 in the ones instead of ungrouping." } },

    { phase: "monitor", title: "The add-back <em>proves it</em>",
      lead: "Four lines from the expansion report: some verify the difference, some are just the story.",
      goal: "Verify the big difference by adding it back.",
      pull: "Difference + the smaller town = the larger town.",
      rail: { launch: "Name what each line is doing before you place it.",
        monitor: ["Spotting the add-back", "Spotting the estimate", "Asking what 96,348 − 386,169 would mean"],
        connect: "Which line proves 386,169?",
        misconception: "Treating the estimate 483,000 − 96,000 as the answer." } },

    { phase: "connect", title: "Hassan estimates and <em>adds back</em>. Musa aligns and trades",
      lead: "Hassan: estimate, subtract, add back. Musa: align, trade, verify. Both defend 386,169.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Checking the exact against 387,000", "Following the trades", "Seeing both defend the same number"],
        connect: "Which step would catch a misaligned column first?",
        misconception: "Believing the estimate replaces the exact difference." } },

    { phase: "synth", title: "On the <em>board</em>: the expansion holds",
      lead: "Places aligned, trades shown, the value never changed by a regrouping.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Lining up by the ones", "Following the trades", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Crossing out digits without saying what was traded." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "310,254 − 87,169 — the verified difference?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Line up the places, then trade.",
        monitor: ["Lining up by the ones", "Trading through the zeros", "Adding the difference back"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 223,185 — a trade was lost in the tens." } },

    { phase: "connect", title: "The expansion is <em>verified</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: water damage erases the regrouping marks.",
      rail: { launch: "Ask three students to say how they lined the numbers up.",
        monitor: ["Able to explain the alignment", "Still lines up by the edges", "Ready for across-zero subtractions"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [mode, setMode] = useState(1);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The expansion plan beside the reserve"
            text="The warehouse expansion plan opens beside the reserve ledger: 482,517 people in the larger town, 96,348 in the smaller. The plan needs the difference."
            clue="The places must still line up">
            <NoticeWonder draw={drawStock} height={256} award={award}
              notices={["One number has six digits, one has five", "The bar is almost full", "The difference is unknown", "The plan is waiting"]}
              wonders={["How many more people in the larger town?", "Where should the 9 of 96,348 sit?", "What estimate should the difference be near?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The difference, estimated first"
            text="Omar asks for the estimate to the nearest thousand before the expansion report is written — the difference must sit near it."
            clue="Round both to thousands, then subtract the rounds">
            <LaunchEstimate draw={drawStock} height={256} award={award}
              label="482,517 − 96,348 — the difference, estimated first" min={300000} max={450000} start={387000} unit="people"
              after="Locked. Now line up the places and step the big subtraction."
              note="The town figures are simulated — the method works on any city-sized pair." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd lines the places up"
            text="He can align the two numbers on the ones or on the left edges — the class must say which column each digit joins."
            clue="Line up the places, not the edges">
            <ExploreChips draw={makeAlign(mode, setMode)} height={252}
              label="Where should 96,348 sit under 482,517?"
              value={mode}
              onPick={(v) => setMode(v)}
              chips={[{ v: 1, label: "line up the places" }, { v: 0, label: "line up the edges" }]}
              caption={<MathEl omml={M.regroup} size="lg" display="block" />}
              footnote="Line up the places, not the edges." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar steps the big subtraction"
            text="He can step any column, but the class must predict the trade before the column changes."
            clue="The trades run left — through zeros when they appear">
            <ExploreChips draw={makeColumnSub(step, setStep)} height={252}
              label="Step the columns of 482,517 − 96,348"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "line up the places" }, { v: 1, label: "ones" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }, { v: 4, label: "thousands" }, { v: 5, label: "ten thousands" }, { v: 6, label: "hundred thousands" }]}
              caption={<MathEl omml={M.traded} size="lg" display="block" />}
              footnote="17 − 8 = 9 — and the trades keep going left." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="The add-back proves it"
            text="Omar and Zayd lay four lines from the expansion report on the table. The report wants the difference verified — difference plus the smaller town equals the larger."
            clue="Difference + the smaller town = the larger town">
            <CardSort award={award} columns={2} commitLabel="Verify the report"
              items={[
                { id: "e1", text: "386,169 + 96,348 = 482,517", target: "check" },
                { id: "e2", text: "96,348 − 386,169", target: "story" },
                { id: "e3", text: "483,000 − 96,000 = 387,000", target: "check" },
                { id: "e4", text: "386,169", target: "story" }
              ]}
              targets={[
                { id: "check", label: "a check — it verifies the difference" },
                { id: "story", label: "part of the story — not a check" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 386,169"
            text="Hassan estimates, subtracts and adds back. Musa aligns, trades and verifies. Both defend 386,169."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Hassan's way — estimate, subtract, add back", omml: M.estimate, h: 92,
                      quote: "483,000 − 96,000 is 387,000 — the exact difference sits near it." }}
              right={{ name: "Musa's way — align, trade, verify", omml: M.check, h: 92,
                       quote: "The places line up on the ones, and the add-back proves 386,169." }}
              same={["Both defend 386,169", "Both line up by the places", "Both can be verified"]}
              diff={["Hassan's estimate catches a wildly wrong total", "Musa's alignment catches a misplaced digit", "Hassan works fast, Musa works sure"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The expansion holds"
            text="Zayd builds only what the class can justify: the places aligned, the trades shown, the value unchanged by every regrouping."
            clue="Places aligned, trades shown">
            <BoardScreen draw={drawBoard25} height={430}
              caption="The expansion holds: places aligned, trades shown." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the expansion report"
            text="310,254 − 87,169. Show the verified difference — and the add-back beside it."
            clue="Difference + the smaller town = the larger town">
            <ShowWhatYouKnow award={award}
              prompt="310,254 − 87,169 — the verified difference?"
              omml={M.swyk}
              options={[{ v: "a", text: "223,085" }, { v: "b", text: "223,185" }, { v: "c", text: "213,085" }, { v: "d", text: "233,085" }]}
              right="a"
              support={{
                yes: "Yes — the trades run left and 223,085 adds back to 310,254.",
                notYet: "Not yet — add it back: 223,085 + 87,169 must be 310,254.",
                draw: drawSupport25, h: 82,
                hint: "4 ones cannot take 9 — the ones trade. Then the tens must take the ten."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The expansion is verified"
            text="Omar signs the expansion report — difference, and the add-back beside it. A drop of water crosses the ledger and erases the regrouping marks — across a line of silent zeros."
            artifact="Expansion report · verified"
            next="Water damage erases the regrouping marks — across a line of silent zeros.">
            <Closing game={game} omml={M.regroup}
              action="Subtract two five-place numbers tonight and line them up by the ones." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
