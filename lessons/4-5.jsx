/* ===========================================================================
   Grade 4 · Topic 4 · LESSON 4-5 · Area Models and Partial Products
   Standard 4.NBT.B.5   I can ... use an area model to multiply two 2-digit
   numbers, and connect each region to its partial product.
   =========================================================================== */

const M = {
  problem: om(mt("47\u00d728")),
  answer: om(mt("47\u00d728=1,316")),
  parts: om(mt("800 + 320 + 140 + 56")),
  estimate: om(mt("50×30=1,500")),
  decompose: om(mt("47"), mnor(" = "), mt("40 + 7"), mnor("  and  "), mt("28"), mnor(" = "), mt("20 + 8")),
  rule: om(mnor("each region is one partial product")),
  swyk: om(mt("36\u00d724")),
  swykAnswer: om(mt("600 + 240 + 120 + 48 = 864"))
};

const ROWS = [{ v: 40 }, { v: 7 }];
const COLS = [{ v: 20 }, { v: 8 }];

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
    D.txt(ctx, String(1,316).replace(/\B(?=(\d{3})+(?!\d))/g, ","), W / 2 + 84, ly + 30,
      { size: 24, col: "#34D399", font: "marker", align: "right" });
  }
  D.txt(ctx, shown === list.length ? "every region appears in the list" : "one partial product at a time",
    W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
};

const drawStory45 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 350), p3 = D.at(f, 360, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "a date-palm plantation", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.areaModel2(ctx, { x: 86, y: 58, w: W - 150, h: 100, rows: ROWS, cols: COLS,
    prog: p2, showSum: false });
  if (p3 > 0) D.txt(ctx, "47 rows of 28 palms — how many trees?", W / 2, H - 16,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard45 = (ctx, W, H, frame) => {
  const CYCLE = 820, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Where does each partial product live?" });
  const p1 = D.at(f, 20, 340), p2 = D.at(f, 360, 540), p3 = D.at(f, 560, 720);
  D.areaModel2(ctx, { x: 132, y: 112, w: W - 250, h: 140, rows: ROWS, cols: COLS,
    prog: p1, showSum: false });
  if (p2 > 0) {
    D.txt(ctx, "800 + 320 + 140 + 56", W / 2, 300, { size: 16, col: "#EAF4F2", font: "marker", alpha: p2 });
    D.txt(ctx, "= 1,316", W / 2, 336, { size: 24, col: "#34D399", font: "marker", alpha: D.at(f, 430, 520) });
  }
  if (p3 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the biggest region is tens by tens — the smallest is ones by ones", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 600, 690) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 640, 740), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport45 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel2(ctx, { x: 52, y: 22, w: W - 96, h: 56, rows: [{ v: 30 }, { v: 6 }], cols: [{ v: 20 }, { v: 4 }],
    prog: 1, showSum: false });
};

const LESSON = {
  code: "4-5",
  storageKey: "daf-g4-t4-l5",
  title: "More Use Area Models and Partial Products to Multiply",
  unit: "GRADE 4 · TOPIC 4 · LESSON 4-5 · 4.NBT.B.5",
  math: M,
  ixl: ["8K7", "ERB"],

  metas: [
    { phase: "warmup", title: "Rooms inside the <em>rectangle</em>",
      lead: "The tower plan partitions a large rectangle into rooms: 47 by 28, four regions, the corner one tiny.",
      goal: "Notice the area model is the same frame, one room per place value.",
      pull: "Each region is one partial product.",
      rail: { launch: "Fictional frame. Look at the rooms — no total yet.",
        monitor: ["Counting the rooms", "Reading the edge numbers", "Noticing the corner room"],
        connect: "Why is each room a different size?",
        misconception: "Thinking all four regions must be the same size." } },

    { phase: "launch", title: "About how many <em>palm trees</em>?",
      lead: "47 × 28. Lock the estimate before the rooms are priced.",
      goal: "Estimate the product before the exact model.",
      pull: "50 × 30 gets you close. Now for the exact number.",
      rail: { launch: "Give the estimate and what you rounded.",
        monitor: ["Rounding 47 to 50", "Rounding 28 to 30", "Multiplying 50 × 30"],
        connect: "Why is 1,500 near but above the exact answer?",
        misconception: "Rounding both factors down by habit." } },

    { phase: "monitor", title: "Zayd prices the <em>rooms</em>",
      lead: "40 × 20, 40 × 8, 7 × 20, 7 × 8 — one room at a time.",
      goal: "Price each region; every place meets every place.",
      pull: "Every room has a price, even the tiny one.",
      rail: { launch: "Predict each room before it is priced.",
        monitor: ["Pricing 40 × 20", "Pricing 7 × 8", "Seeing all four rooms priced"],
        connect: "Which room is cheapest, and does it still count?",
        misconception: "Skipping the corner room because it is small." } },

    { phase: "monitor", title: "The <em>four</em> partial products",
      lead: "800 + 320 + 140 + 56 — every room has to appear in the list.",
      goal: "Write all four partial products and add them once.",
      pull: "The smallest room still changes the total.",
      rail: { launch: "Which room first?",
        monitor: ["Writing 800", "Writing 320 and 140", "Writing the corner 56"],
        connect: "What would the total be if the corner was missing?",
        misconception: "Answering 1,260 — the corner 56 was dropped." } },

    { phase: "monitor", title: "Match the <em>model</em>",
      lead: "Three partial-product sums. Each one belongs to one tower plan.",
      goal: "Read four-part models back to their products.",
      pull: "The parts always match the digits.",
      rail: { launch: "Name the digits each sum's parts describe.",
        monitor: ["Reading 800 + 320 + 140 + 56", "Reading 600 + 240 + 120 + 48", "Checking all four parts match"],
        connect: "How do you know which product a model belongs to?",
        misconception: "Matching by the biggest two parts only." } },

    { phase: "connect", title: "Rana <em>labels</em>. Faris writes <em>the four</em>",
      lead: "Rana labels every edge first. Faris goes round the grid and writes the four answers. Both get 1,316.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the labelling styles", "Checking both reach 1,316", "Seeing where each form catches mistakes"],
        connect: "Which form catches your own mistakes faster?",
        misconception: "Believing writing less is always faster." } },

    { phase: "synth", title: "On the <em>board</em>: each region is one partial product",
      lead: "Partition the rectangle. Price each room. Add them all.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming each room", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Partitioning at a number that is not a place value." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "Each region is one partial product. Every room, added.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the four rooms", "Checking the add-back", "Testing on a new product"],
        connect: "Which room is easiest to forget?",
        misconception: "Dropping the ones × ones corner." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "36 × 24 — the plan, all four rooms priced.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Price all four rooms.",
        monitor: ["Splitting 36 at 30", "Splitting 24 at 20", "Adding all four parts"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 840 — the corner 24 was dropped." } },

    { phase: "connect", title: "The rooms are <em>priced</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the final production schedule, written in a column.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain the rooms", "Still drops the corner", "Ready for the column form"],
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
            title="Rooms inside the rectangle"
            text="The tower plan partitions a large rectangle into rooms: 47 by 28, four regions, the corner one tiny."
            clue="Each region is one partial product">
            <NoticeWonder draw={makeGrid(4)} height={256} award={award}
              notices={["There are four pieces", "Both sides are split", "One piece is much bigger", "The corner piece is tiny"]}
              wonders={["Why four?", "Do I add them all?", "What is the total?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the rooms"
            text="Omar asks for the estimate before the rooms are priced — the plan needs a number the council can defend."
            clue="50 × 30 gets you close. Now for the exact number.">
            <LaunchEstimate draw={drawStory45} height={256} award={award}
              label="About how many palm trees?" min={800} max={2200} start={1500} unit="trees"
              after="Locked. Now let us fill in all four regions."
              note="The plan counts are simulated — the model works on any two-digit by two-digit." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd prices the rooms"
            text="He can price one room at a time — the class must predict each price before it appears."
            clue="Every room has a price, even the tiny one">
            <ExploreChips draw={makeGrid(n)} height={256}
              label="Price one room at a time"
              value={n}
              onPick={(v) => setN(v)}
              chips={[{ v: 1, label: "room 1" }, { v: 2, label: "room 2" }, { v: 3, label: "room 3" }, { v: 4, label: "room 4" }]}
              caption={<MathEl omml={M.decompose} size="lg" display="block" />}
              footnote="47 = 40 + 7 and 28 = 20 + 8 — four rooms, four prices." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The four partial products"
            text="He can reveal each partial — the class must see that every room appears in the list."
            clue="The smallest room still changes the total">
            <ExploreChips draw={makeLadder(shown)} height={256}
              label="Write the partial products"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[{ v: 1, label: "part 1" }, { v: 2, label: "+ part 2" }, { v: 3, label: "+ part 3" }, { v: 4, label: "+ part 4" }]}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="The smallest room still changes the total." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the model"
            text="Omar and Zayd lay three partial-product sums on the table. Each one belongs to one tower plan."
            clue="The parts always match the digits">
            <CardSort award={award} columns={3}
              items={[{ id: "h1", text: "800 + 320 + 140 + 56", target: "u1" }, { id: "h2", text: "600 + 240 + 120 + 48", target: "u2" }, { id: "h3", text: "1,000 + 250 + 200 + 50", target: "u3" }]}
              targets={[{ id: "u1", label: "47 × 28" }, { id: "u2", label: "36 × 24" }, { id: "u3", label: "45 × 25" }]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 1,316"
            text="Rana labels every edge first. Faris goes round the grid and writes the four answers. Both get 1,316."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Rana's way — label everything", omml: M.parts, h: 92, quote: "I write the numbers on every edge first." }}
              right={{ name: "Faris's way — just the four", omml: M.answer, h: 92, quote: "I go round the grid and write the four answers." }}
              same={["Both get 1,316", "Both use four regions", "Both split by place value"]}
              diff={["Rana labels the edges", "Faris writes less", "Rana catches her own mistakes faster"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The plan is drawn, not declared"
            text="Zayd builds only what the class can justify: the rectangle partitioned, each room priced, all of them added."
            clue="Each region is one partial product">
            <BoardScreen draw={drawBoard45} height={430}
              caption="Each region is one partial product." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the tower's plan with its reason, not alone."
            clue="Every room, added up">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "each region is one partial product" }]}
              hand={"partition the rectangle · price each room · multiply each · add them all"}
              cards={[
                { title: "The plan we priced", omml: M.answer, note: "our estimate was 1,500" },
                { title: "Tap to see the rooms", omml: M.estimate, revealOmml: M.parts, reveal: true,
                  note: "all four rooms, added up" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a total with every room"
            text="36 × 24. Show the plan — and all four rooms priced."
            clue="600 + 240 + 120 + 48 = 864">
            <ShowWhatYouKnow award={award}
              prompt="Use an area model to work out 36 × 24."
              omml={M.swyk}
              options={[{ v: "a", text: "744" }, { v: "b", text: "864" }, { v: "c", text: "840" }, { v: "d", text: "624" }]}
              right="b"
              support={{
                yes: "Yes — 600 + 240 + 120 + 48 = 864.",
                notYet: "Not yet — check that you added all four regions.",
                draw: drawSupport45, h: 92,
                hint: "The four regions are 30×20, 30×4, 6×20 and 6×4."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The rooms are priced"
            text="Omar signs the plan with every room beside it. The final production schedule is due before the bell — and this time it must be written in a column, not a rectangle."
            artifact="Tower plan · rooms priced"
            next="The final production schedule: four products written in a column and added once.">
            <Closing game={game} omml={M.rule}
              action="Price a two-digit by two-digit plan tonight and show all four rooms." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
