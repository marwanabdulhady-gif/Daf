/* ===========================================================================
   Grade 4 · Topic 4 · LESSON 4-4 · Arrays and Partial Products
   Standard 4.NBT.B.5   I can ... see a 2-digit by 2-digit product as four
   partial products, and pick the model that matches.
   =========================================================================== */

const M = {
  problem: om(mt("24\u00d736")),
  answer: om(mt("24\u00d736=864")),
  parts: om(mt("600 + 120 + 180 + 24")),
  estimate: om(mt("20×40=800")),
  decompose: om(mt("24"), mnor(" = "), mt("20 + 4"), mnor("  and  "), mt("36"), mnor(" = "), mt("30 + 6")),
  rule: om(mnor("two splits make four partial products")),
  swyk: om(mt("23\u00d715")),
  swykAnswer: om(mt("200 + 100 + 30 + 15 = 345"))
};

const ROWS = [{ v: 20 }, { v: 4 }];
const COLS = [{ v: 30 }, { v: 6 }];

const makeGrid = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel2(ctx, {
    x: 82, y: 74, w: W - 140, h: 118, rows: ROWS, cols: COLS,
    prog: n / 4, showSum: n === 4
  });
  const notes = ["four regions to fill", "one region done", "two regions done",
                 "three regions done", "all four regions counted"];
  D.txt(ctx, notes[n], W / 2, H - 16,
    { size: 13, col: n === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeLadder = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const palette = ["#2D70B3", "#FA7E19", "#6042A6", "#388C46"];
  const list = [];
  for (let r = 0; r < ROWS.length; r++)
    for (let c = 0; c < COLS.length; c++)
      list.push([ROWS[r].v, COLS[c].v, ROWS[r].v * COLS[c].v]);
  let total = 0;
  list.forEach(function (p, k) {
    const a = k < shown ? 1 : 0.18;
    if (k < shown) total += p[2];
    D.txt(ctx, p[0] + " \u00d7 " + p[1], W / 2 - 46, 56 + k * 38,
      { size: 17, col: palette[k % 4], font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 22, 56 + k * 38, { size: 14, col: "rgba(234,244,242,.5)", font: "marker", alpha: a });
    D.txt(ctx, p[2].toLocaleString("en-US"), W / 2 + 84, 56 + k * 38,
      { size: 19, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
  });
  const ly = 56 + list.length * 38 - 14;
  if (shown === list.length) {
    D.marker(ctx, [[W / 2 - 120, ly], [W / 2 + 94, ly]], 1, "rgba(201,162,39,.6)", 1.8);
    D.txt(ctx, String(864).replace(/\B(?=(\d{3})+(?!\d))/g, ","), W / 2 + 84, ly + 30,
      { size: 24, col: "#34D399", font: "marker", align: "right" });
  }
  D.txt(ctx, shown === list.length ? "every region appears in the list" : "one partial product at a time",
    W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
};

const drawStory44 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 350), p3 = D.at(f, 360, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "a car park at the Corniche", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.areaModel2(ctx, { x: 86, y: 58, w: W - 150, h: 100, rows: ROWS, cols: COLS,
    prog: p2, showSum: false });
  if (p3 > 0) D.txt(ctx, "24 rows of 36 spaces — how many cars?", W / 2, H - 16,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard44 = (ctx, W, H, frame) => {
  const CYCLE = 820, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Two splits, four pieces" });
  const p1 = D.at(f, 20, 340), p2 = D.at(f, 360, 540), p3 = D.at(f, 560, 720);
  D.areaModel2(ctx, { x: 132, y: 112, w: W - 250, h: 140, rows: ROWS, cols: COLS,
    prog: p1, showSum: false });
  if (p2 > 0) {
    D.txt(ctx, "600 + 120 + 180 + 24", W / 2, 300, { size: 16, col: "#EAF4F2", font: "marker", alpha: p2 });
    D.txt(ctx, "= 864", W / 2, 336, { size: 24, col: "#34D399", font: "marker", alpha: D.at(f, 430, 520) });
  }
  if (p3 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "every pair of pieces meets in a region — and every region counts", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 600, 690) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 640, 740), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport44 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel2(ctx, { x: 52, y: 22, w: W - 96, h: 56, rows: [{ v: 20 }, { v: 3 }], cols: [{ v: 10 }, { v: 5 }],
    prog: 1, showSum: false });
};

const LESSON = {
  code: "4-4",
  storageKey: "daf-g4-t4-l4",
  title: "Arrays and Partial Products",
  unit: "GRADE 4 · TOPIC 4 · LESSON 4-4 · 4.NBT.B.5",
  math: M,
  ixl: ["ASZ"],

  metas: [
    { phase: "warmup", title: "The frame becomes an <em>array</em>",
      lead: "The production frame: 24 by 36, cut twice across and twice down. Four pieces — and the corner piece is tiny.",
      goal: "Notice two splits make four partial products.",
      pull: "Two splits across and two down — that is four pieces, always.",
      rail: { launch: "Fictional frame. Look at the frame — no total yet.",
        monitor: ["Counting the pieces", "Seeing both sides split", "Noticing the tiny corner"],
        connect: "Why four pieces and not two?",
        misconception: "Splitting only one factor and getting two pieces." } },

    { phase: "launch", title: "About how many <em>spaces</em>?",
      lead: "24 × 36. Lock the estimate before the four regions are filled.",
      goal: "Estimate the two-digit by two-digit product first.",
      pull: "Both numbers are awkward. Both are about to be split.",
      rail: { launch: "Give the estimate and what you rounded.",
        monitor: ["Rounding 24 to 20", "Rounding 36 to 40", "Multiplying 20 × 40"],
        connect: "Why is 800 close but not exact?",
        misconception: "Estimating the product by adding the two numbers." } },

    { phase: "monitor", title: "Zayd fills the <em>regions</em>",
      lead: "20 × 30, 20 × 6, 4 × 30, 4 × 6 — one region at a time.",
      goal: "Fill the array region by region, every place meeting every place.",
      pull: "Every region is one partial product.",
      rail: { launch: "Predict each region before it is filled.",
        monitor: ["Multiplying 20 × 30", "Multiplying 4 × 6", "Seeing all four regions"],
        connect: "Which region is the smallest, and does it matter?",
        misconception: "Dropping the tiny corner region from the total." } },

    { phase: "monitor", title: "The <em>four</em> partial products",
      lead: "600 + 120 + 180 + 24 — every region has to appear in the list.",
      goal: "Write all four partial products and add them once.",
      pull: "The smallest region still changes the answer.",
      rail: { launch: "Which region first?",
        monitor: ["Writing 600", "Writing 120 and 180", "Writing the corner 24"],
        connect: "What would the total be if the corner was missing?",
        misconception: "Answering 900 — the corner 24 was dropped." } },

    { phase: "monitor", title: "Match the <em>model</em>",
      lead: "Three partial-product sums. Each one belongs to one frame.",
      goal: "Read four-part models back to their products.",
      pull: "The parts always match the digits.",
      rail: { launch: "Name the digits each sum's parts describe.",
        monitor: ["Reading 600 + 120 + 180 + 24", "Reading 200 + 100 + 30 + 15", "Checking all four parts match"],
        connect: "How do you know which product a model belongs to?",
        misconception: "Matching by the two biggest parts only." } },

    { phase: "connect", title: "Lama <em>draws</em>. Ziyad <em>writes</em>",
      lead: "Lama: the grid, all four pieces at once. Ziyad: a column of four products. Both get 864.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing grid and column", "Checking both reach 864", "Finding a missing part in each form"],
        connect: "Which form catches a missing region fastest?",
        misconception: "Believing the column form is the only form." } },

    { phase: "synth", title: "On the <em>board</em>: two splits make four partial products",
      lead: "Split each factor at its ten. Fill the four regions. Add them all.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming each region", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Splitting a factor at a number that is not its ten." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "Two splits make four partial products. Every region, added.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the four regions", "Checking the add-back", "Testing on a new product"],
        connect: "Which region is easiest to forget?",
        misconception: "Forgetting the ones × ones corner region." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "23 × 15 — the frame, all four regions added.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the four regions.",
        monitor: ["Splitting 23 at 20", "Splitting 15 at 10", "Adding all four parts"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 330 — the corner 15 was dropped." } },

    { phase: "connect", title: "The frame is <em>read</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the roof plan, partitioned into rooms.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain the four regions", "Still drops the corner", "Ready for area models"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The frame becomes an array"
            text="The production frame: 24 by 36, cut twice across and twice down. Four pieces — and the corner piece is tiny."
            clue="Two splits make four partial products">
            <NoticeWonder draw={makeGrid(4)} height={256} award={award}
              notices={["There are four pieces", "Both sides are split", "One piece is much bigger", "The corner piece is tiny"]}
              wonders={["Why four?", "Do I add them all?", "What is the total?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the frame"
            text="Omar asks for the estimate before the four regions are filled — the frame needs a number the workshop can defend."
            clue="Both numbers are awkward. Both are about to be split.">
            <LaunchEstimate draw={drawStory44} height={256} award={award}
              label="About how many parking spaces?" min={400} max={1600} start={800} unit="spaces"
              after="Locked. Now let us fill in all four regions."
              note="The frame counts are simulated — the model works on any two-digit by two-digit." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd fills the regions"
            text="He can fill one region at a time — the class must predict each product before it appears."
            clue="Every region is one partial product">
            <ExploreChips draw={makeGrid(n)} height={256}
              label="Fill one region at a time"
              value={n}
              onPick={(v) => setN(v)}
              chips={[{ v: 1, label: "region 1" }, { v: 2, label: "region 2" }, { v: 3, label: "region 3" }, { v: 4, label: "region 4" }]}
              caption={<MathEl omml={M.decompose} size="lg" display="block" />}
              footnote="Two splits across and two down — that is four pieces, always." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The four partial products"
            text="He can reveal each partial — the class must see that every region appears in the list."
            clue="The smallest region still changes the answer">
            <ExploreChips draw={makeLadder(shown)} height={256}
              label="Write the partial products"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[{ v: 1, label: "part 1" }, { v: 2, label: "+ part 2" }, { v: 3, label: "+ part 3" }, { v: 4, label: "+ part 4" }]}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="The smallest region still changes the answer." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the model"
            text="Omar and Zayd lay three partial-product sums on the table. Each one belongs to one frame."
            clue="The parts always match the digits">
            <CardSort award={award} columns={3}
              items={[{ id: "g1", text: "600 + 120 + 180 + 24", target: "t1" }, { id: "g2", text: "200 + 100 + 30 + 15", target: "t2" }, { id: "g3", text: "400 + 80 + 100 + 20", target: "t3" }]}
              targets={[{ id: "t1", label: "24 × 36" }, { id: "t2", label: "23 × 15" }, { id: "t3", label: "24 × 25" }]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 864"
            text="Lama draws the grid. Ziyad writes a column of four. Both get 864."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Lama's way — the grid", omml: M.parts, h: 92, quote: "I can see all four pieces at once." }}
              right={{ name: "Ziyad's way — a column of four", omml: M.answer, h: 92, quote: "I list the four products and add them." }}
              same={["Both get 864", "Both have four parts", "Both split each factor by place value"]}
              diff={["Lama draws, Ziyad writes", "Ziyad is faster once he trusts it", "Lama can see which part is missing"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The model is drawn, not declared"
            text="Zayd builds only what the class can justify: both factors split, all four regions filled, all of them added."
            clue="Two splits make four partial products">
            <BoardScreen draw={drawBoard44} height={430}
              caption="Two splits make four partial products." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the tower's plan with its reason, not alone."
            clue="Every region, added up">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "two splits make four partial products" }]}
              hand={"split each factor at its ten · fill the four regions · multiply each · add them all"}
              cards={[
                { title: "The frame we built", omml: M.answer, note: "our estimate was 800" },
                { title: "Tap to see the parts", omml: M.estimate, revealOmml: M.parts, reveal: true,
                  note: "all four regions, added up" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a total with every region"
            text="23 × 15. Show the frame — and all four regions added."
            clue="200 + 100 + 30 + 15 = 345">
            <ShowWhatYouKnow award={award}
              prompt="Use an area model to work out 23 × 15."
              omml={M.swyk}
              options={[{ v: "a", text: "345" }, { v: "b", text: "330" }, { v: "c", text: "300" }, { v: "d", text: "3,450" }]}
              right="a"
              support={{
                yes: "Yes — 200 + 100 + 30 + 15 = 345.",
                notYet: "Not yet — check that you added all four regions.",
                draw: drawSupport44, h: 92,
                hint: "The four regions are 20×10, 20×5, 3×10 and 3×5."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The frame is read"
            text="Omar signs the frame total with every region beside it. The roof plan unrolls next: a long rectangle, partitioned into rooms that must each be priced."
            artifact="Tower plan · frame read as an array"
            next="The roof plan is partitioned into rooms — each one a region, each region a partial product.">
            <Closing game={game} omml={M.rule}
              action="Draw a two-digit by two-digit area model tonight and show all four regions." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
