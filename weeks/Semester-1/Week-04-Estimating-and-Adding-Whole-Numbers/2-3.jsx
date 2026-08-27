/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-3 · Add Whole Numbers
   Standard 4.NBT.B.4   I can ... add multi-digit numbers using the standard
   algorithm, and explain the regrouping.
   =========================================================================== */

const M = {
  problem: om(mt("268+154")),
  expanded: om(mt("200+100"), mnor(", "), mt("60+50"), mnor(", "), mt("8+4")),
  regroupOnes: om(mt("8+4=12"), mnor(" — that is "), mt("1"), mnor(" ten and "), mt("2"), mnor(" ones")),
  regroupTens: om(mt("1+6+5=12"), mnor(" tens")),
  answer: om(mt("268+154=422")),
  estimate: om(mt("270+150=420")),
  swyk: om(mt("376+248")),
  swykAnswer: om(mt("376+248=624"))
};

const drawLibrary = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 280), p3 = D.at(f, 290, 420);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school library", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const shelves = [{ n: 268, x: W * 0.3, col: "#2D70B3", label: "Arabic" },
                   { n: 154, x: W * 0.7, col: "#FA7E19", label: "English" }];
  shelves.forEach((s, k) => {
    const a = D.at(p2, k * 0.3, k * 0.3 + 0.6);
    if (a <= 0) return;
    for (let r = 0; r < 6; r++) {
      const bars = Math.min(10, Math.round((s.n / 300) * 10));
      for (let c = 0; c < bars; c++) {
        const ba = D.at(p2, k * 0.3 + (r * bars + c) / 90, k * 0.3 + (r * bars + c) / 90 + 0.2);
        if (ba <= 0) continue;
        ctx.save();
        ctx.globalAlpha = ba * 0.8;
        D.rr(ctx, s.x - 52 + c * 10, 52 + r * 15, 7, 12, 1.5);
        ctx.fillStyle = s.col; ctx.fill();
        ctx.restore();
      }
    }
    D.txt(ctx, s.label, s.x, 156, { size: 12, col: s.col, font: "marker", alpha: a });
    D.txt(ctx, String(s.n), s.x, 180, { size: 22, col: "#EAF4F2", font: "marker", alpha: a });
  });
  if (p3 > 0) D.txt(ctx, "how many books altogether?", W / 2, H - 20,
    { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
};

const makeColumnAdd = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: W / 2 - 90, y: 30, w: 180, h: H - 70, value: 0, on: () => onStep((step + 1) % 4) });
  D.columnOp(ctx, { x: W / 2 - 90, y: 30, w: 180, a: 268, b: 154, op: "+", prog: step / 3, t: frame, cw: 42 });
  const notes = ["start with the ones — tap to step", "8 + 4 = 12 — write 2, carry 1 ten",
                 "1 + 6 + 5 = 12 tens — write 2, carry 1 hundred", "1 + 2 + 1 = 4 hundreds"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 14, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeExpandedAdd = (shown, onShown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [["hundreds", 200, 100, 300, "#6042A6"], ["tens", 60, 50, 110, "#2D70B3"], ["ones", 8, 4, 12, "#FA7E19"]];
  rows.forEach((r, n) => {
    const a = n < shown ? 1 : 0.2;
    const y = 52 + n * 46;
    if (onShown) D.tap(ctx, { x: 40, y: y - 20, w: W - 80, h: 40, value: n + 1, on: (v) => onShown(v) });
    D.txt(ctx, r[0], 64, y, { size: 12, col: r[4], font: "mono", weight: 700, align: "left", alpha: a });
    D.txt(ctx, r[1] + " + " + r[2] + " = " + r[3], W / 2 + 30, y,
      { size: 17, col: "#EAF4F2", font: "marker", alpha: a });
  });
  if (shown === 3) {
    D.marker(ctx, [[64, 196], [W - 64, 196]], 1, "rgba(201,162,39,.5)", 1.6);
    D.txt(ctx, "300 + 110 + 12 = 422", W / 2, 222, { size: 19, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, "add one place at a time", W / 2, H - 16, { size: 13, col: "#C9A227", font: "marker" });
  }
};

const drawBoard23 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Where does the carried 1 come from?" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 210, 380), p3 = D.at(f, 400, 560), p4 = D.at(f, 560, 700);
  D.columnOp(ctx, { x: W / 2 - 168, y: 86, w: 168, a: 268, b: 154, op: "+", prog: p1, t: frame, cw: 46 });
  if (p2 > 0) {
    D.txt(ctx, "8 + 4 = 12", W / 2 + 90, 140, { size: 17, col: "#FA7E19", font: "marker", alpha: p2 });
    D.txt(ctx, "12 ones = 1 ten and 2 ones", W / 2 + 90, 168,
      { size: 13, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 250, 340) });
  }
  if (p3 > 0) {
    D.txt(ctx, "the 1 is a whole ten —", W / 2 + 90, 210, { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "it moves to the tens column", W / 2 + 90, 234,
      { size: 14, col: "#C9A227", font: "marker", alpha: D.at(f, 440, 520) });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "carrying is not a trick — it is trading ten ones for one ten",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 600, 680) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 630, 730), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport23 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 70, y: -14, w: 140, a: 376, b: 248, op: "+", prog: 1, cw: 34 });
};

const LESSON = {
  code: "2-3",
  storageKey: "daf-g4-t2-l3",
  title: "Add Whole Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-3 · 4.NBT.B.4",
  math: M,
  ixl: ["DWQ", "M8W"],

  metas: [
    { phase: "warmup", title: "The first market row <em>under the awning</em>",
      lead: "268 books on one shelf, 154 on the other. The first row of the souq ledger waits for its total.",
      goal: "Notice that adding these will need a trade — and a check.",
      pull: "The row's counts are simulated — the regrouping works on any pair.",
      rail: { launch: "Fictional frame. Just look at the two shelves — no adding yet.",
        monitor: ["Noticing the ones column will pass ten", "Estimating first", "Wonding where the carried 1 comes from"],
        connect: "Which column will be the first to trade?",
        misconception: "Believing a carry is a mark to copy, not a trade." } },

    { phase: "launch", title: "The row's total <em>before the ledger</em>",
      lead: "268 + 154. Lock the estimate before the exact total is written.",
      goal: "Create the need — the ledger wants a total the class can check.",
      pull: "Regroup, then adjust — check both columns.",
      rail: { launch: "Give a total, and say what it is close to.",
        monitor: ["Rounding 268 to 270", "Rounding 154 to 150", "Adding the rounds"],
        connect: "What should the exact total be near?",
        misconception: "Skipping the estimate and going straight to the algorithm." } },

    { phase: "monitor", title: "Zayd steps the <em>columns</em>",
      lead: "Ones, tens, hundreds — each step trades before it moves on.",
      goal: "Add by place, carrying the ten that is traded.",
      pull: "Regroup, then adjust — check both columns.",
      rail: { launch: "Predict each column before Zayd steps it.",
        monitor: ["Trading ten ones for one ten", "Adding the carried ten", "Checking the tens after the carry"],
        connect: "Why must the tens column change after the trade?",
        misconception: "Regrouping without adjusting — the carried ten vanishes." } },

    { phase: "monitor", title: "Omar adds the <em>places</em> apart",
      lead: "Hundreds, tens, ones — the expanded form is the check beside the total.",
      goal: "See the same sum place by place, with no carries to hide.",
      pull: "The expanded form is the check beside the total.",
      rail: { launch: "Add one place at a time — which is easiest first?",
        monitor: ["Adding the hundreds row", "Adding the tens row", "Seeing 12 ones become part of the total"],
        connect: "How does 110 + 12 stay 422 with the 300?",
        misconception: "Adding the ones row and forgetting it changed the tens." } },

    { phase: "monitor", title: "Record the <em>check</em>",
      lead: "Four lines from the row: some are regroupings, some are checks.",
      goal: "Sort the working so the ledger shows the regrouping and the check.",
      pull: "A total without a check is a guess.",
      rail: { launch: "Name what each line is doing before you place it.",
        monitor: ["Spotting the trades", "Spotting the estimate", "Comparing 422 with 420"],
        connect: "Which line proves the total?",
        misconception: "Treating the estimate 270 + 150 as the answer." } },

    { phase: "connect", title: "Hassan carries. <em>Musa expands.</em>",
      lead: "Hassan's columns show the trades; Musa's rows show the places. Both reach 422.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the carry in Hassan's work", "Following the rows in Musa's", "Seeing both end at 422"],
        connect: "Which work makes the carried ten easier to find?",
        misconception: "Believing the expanded form is only for checking, never for solving." } },

    { phase: "synth", title: "On the <em>board</em>: add by place, check by place",
      lead: "Draw the columns. Trade the ten. The equals sign means same value — not an answer coming.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the trade as it is drawn", "Reading the equals sign as same value", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Reading equals as 'the answer is coming' in long equation strings." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "376 + 248 — the checked total?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the trades you made.",
        monitor: ["Trading in the ones", "Adding the carried ten", "Checking both columns"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Writing 614 — the carried ten was lost." } },

    { phase: "connect", title: "The first row is <em>inked</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: a second bundle — city-sized, and bigger than the old columns.",
      rail: { launch: "Ask three students to say where their trade happened.",
        monitor: ["Able to explain the carry", "Still needs the expanded rows", "Ready for four-place numbers"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [shown, setShown] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The first market row under the awning"
            text="The first row of the souq ledger: 268 books on one shelf, 154 on the other. The merchant's pen waits for a total — and a check beside it."
            clue="Adding these will need a trade">
            <NoticeWonder draw={drawLibrary} height={256} award={award}
              notices={["Both rows are under 300", "The ones column will pass ten", "The totals are near 270 and 150", "No check is written yet"]}
              wonders={["What will the row total be?", "Where does the carried 1 come from?", "How is the total checked?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The row's total before the ledger"
            text="Omar asks for an estimate before any column is stepped — the ledger only accepts a total the class can check."
            clue="Regroup, then adjust — check both columns">
            <LaunchEstimate draw={drawLibrary} height={256} award={award}
              label="The row's total before the ledger: 268 + 154" min={350} max={500} start={420} unit="books"
              after="Locked. Now step the columns and see where the trade happens."
              note="The row's counts are simulated — the regrouping works on any pair." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd steps the columns, one trade at a time"
            text="He can step any column, but the class must predict the trade before the column changes."
            clue="Regroup, then adjust — check both columns">
            <ExploreChips draw={makeColumnAdd(step, setStep)} height={252}
              label="Step the columns of 268 + 154"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "start with the ones" }, { v: 1, label: "the ones trade" }, { v: 2, label: "the tens" }, { v: 3, label: "the hundreds" }]}
              caption={<MathEl omml={M.regroupOnes} size="lg" display="block" />}
              footnote="Write the 2, carry the 1 ten — then check the tens column." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar adds the places apart"
            text="Hundreds, tens, ones — his expanded rows are the check that sits beside the column total."
            clue="The expanded form is the check beside the total">
            <ExploreChips draw={makeExpandedAdd(shown, setShown)} height={252}
              label="Add one place at a time"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[{ v: 0, label: "start" }, { v: 1, label: "hundreds" }, { v: 2, label: "tens" }, { v: 3, label: "ones + total" }]}
              caption={<MathEl omml={M.expanded} size="lg" display="block" />}
              footnote="The expanded form is the check beside the total." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Record the check"
            text="Omar and Zayd lay four lines from the row on the table. The ledger wants the regrouping shown — and the check beside the total."
            clue="A trade changes a column; a check proves the total">
            <CardSort award={award} columns={2} commitLabel="Record the check"
              items={[
                { id: "r1", text: "8 + 4 = 12 → 1 ten 2 ones", target: "regroup" },
                { id: "r2", text: "1 + 6 + 5 = 12 tens", target: "regroup" },
                { id: "r3", text: "270 + 150 = 420", target: "check" },
                { id: "r4", text: "268 + 154 = 422", target: "check" }
              ]}
              targets={[
                { id: "regroup", label: "a regrouping — a trade happened" },
                { id: "check", label: "a check — it proves the total" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 422"
            text="Hassan's columns show the trades; Musa's expanded rows show the places. Both reach 422."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Hassan's way — columns with carries", omml: M.answer, h: 92,
                      quote: "I added the columns and wrote each carry as a trade." }}
              right={{ name: "Musa's way — expanded by place", omml: M.expanded, h: 92,
                       quote: "I added the hundreds, then the tens, then the ones." }}
              same={["Both reach 422", "Both add place by place", "Both can be checked"]}
              diff={["Hassan's carries are hidden in the columns", "Musa's rows show every place", "Musa's form is the check beside the total"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The trade is drawn, not declared"
            text="Zayd builds only what the class can justify: the ten traded, the columns adjusted, the total checked."
            clue="Carrying is not a trick — it is a trade">
            <BoardScreen draw={drawBoard23} height={430}
              caption="Add by place, check by place." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the row only with its check"
            text="376 + 248. Show the total — and the trade that made it."
            clue="The carried ten must appear in both columns">
            <ShowWhatYouKnow award={award}
              prompt="376 + 248 — the checked total?"
              omml={M.swyk}
              options={[{ v: "a", text: "624" }, { v: "b", text: "614" }, { v: "c", text: "634" }, { v: "d", text: "622" }]}
              right="a"
              support={{
                yes: "Yes — 6 + 8 = 14 ones: one ten and 4 ones; 624 is the checked total.",
                notYet: "Not yet — where did the carried ten go?",
                draw: drawSupport23, h: 82,
                hint: "6 ones + 8 ones is 14 ones — one ten and 4 ones."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The first row is inked"
            text="Omar signs the row with its check beside the total. Zayd lifts a second bundle from under the awning — city-sized, and bigger than the old columns."
            artifact="Souq ledger · first market row (total + check)"
            next="A second bundle arrives — city-sized, and bigger than the old columns.">
            <Closing game={game} omml={M.answer}
              action="Add two real receipts tonight and write the check beside the total." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
