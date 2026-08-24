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
  title: "Area Models and Partial Products",
  unit: "GRADE 4 · TOPIC 4 · LESSON 4-5 · 4.NBT.B.5",
  math: M,
  ixl: ["8K7", "ERB"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A rectangle cut into four pieces. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Four pieces, not two. Something has changed.",
      rail: { launch: "I am not asking for a total yet. Just describe the rectangle.",
        monitor: ["Counting four regions", "Reading the edge numbers", "Noticing both sides are split"],
        connect: "Who noticed something nobody else did?",
        misconception: "Expecting two regions because yesterday had two." } },

    { phase: "launch", title: "Forty-seven rows of <em>twenty-eight</em>",
      lead: "A plantation has 47 rows with 28 palms in each. Estimate first.",
      goal: "Create the need — when both factors are awkward, both get split.",
      pull: "Estimate first, then we will build all four pieces.",
      rail: { launch: "Roughly how many? Round both in your head.",
        monitor: ["Rounding both", "Splitting one factor only", "Trying repeated addition"],
        connect: "Why does splitting one factor not finish the job?",
        misconception: "Splitting only the first factor and stopping." } },

    { phase: "monitor", title: "Fill all <em>four regions</em>",
      lead: "Tens by tens, tens by ones, ones by tens, ones by ones.",
      goal: "Two splits make four partial products.",
      pull: "Now write those four pieces in a list.",
      rail: { launch: "Predict each region before you tap.",
        monitor: ["Working in reading order", "Naming each region", "Missing the ones-by-ones corner"],
        connect: "Which region is biggest, and why?",
        misconception: "Forgetting the small ones-by-ones region." } },

    { phase: "monitor", title: "Add the <em>four parts</em>",
      lead: "Miss one and the answer is wrong — even the smallest one.",
      goal: "Record and total four partial products.",
      pull: "Match some grids to their partial products.",
      rail: { launch: "Predict each line before you reveal it.",
        monitor: ["Listing all four", "Adding as they go", "Dropping the smallest"],
        connect: "How much does the smallest part change the answer?",
        misconception: "Stopping after the two largest parts." } },

    { phase: "monitor", title: "Match the <em>grid</em>",
      lead: "Which set of four belongs to that grid? No grading until the class commits.",
      goal: "Read a four-region model backwards.",
      pull: "Two students recorded the same product differently.",
      rail: { launch: "Look at the biggest region first.",
        monitor: ["Checking the tens-by-tens part", "Checking the corner", "Adding to test"],
        connect: "How did you know which belonged?",
        misconception: "Matching by the total instead of the parts." } },

    { phase: "connect", title: "Two ways to <em>record it</em>",
      lead: "Rana labelled every region. Faris only wrote the four products. Both give 1,316.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Using the grid", "Using a list", "Checking both totals"],
        connect: "Which record would you trust under time pressure?",
        misconception: "Believing the grid and the list are different methods." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Split both factors. Four regions. Multiply each. Add all four.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next region", "Naming each product", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting to add all four parts." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming both decompositions", "Testing on a new product", "Checking against an estimate"],
        connect: "Which region would disappear if one factor had no ones?",
        misconception: "Thinking two splits give two partial products." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write all four partial products.",
        monitor: ["Listing four parts", "Adding correctly", "Estimating first"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Adding only the two biggest regions." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: writing it without drawing the rectangle at all.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the grid", "Ready for the next step"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeGrid(4)} height={256} award={award}
          notices={["There are four pieces", "Both sides are split", "One piece is much bigger", "The corner piece is tiny"]}
          wonders={["Why four?", "Do I add them all?", "What is the total?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory45} height={256} award={award}
          label="About how many palm trees?" min={800} max={2200} start={1500} unit="trees"
          after="Locked. Now let us fill in all four regions."
          note="50 × 30 gets you close. Now for the exact number." />;

      case 2:
        return <ExploreChips draw={makeGrid(n)} height={256}
          label="Fill one region at a time"
          value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 1, label: "region 1" }, { v: 2, label: "region 2" }, { v: 3, label: "region 3" }, { v: 4, label: "region 4" }]}
          caption={<MathEl omml={M.decompose} size="lg" display="block" />}
          footnote="Two splits across and two down — that is four pieces, always." />;

      case 3:
        return <ExploreChips draw={makeLadder(shown)} height={256}
          label="Write the partial products"
          value={shown}
          onPick={(v) => setShown(v)}
          chips={[{ v: 1, label: "part 1" }, { v: 2, label: "+ part 2" }, { v: 3, label: "+ part 3" }, { v: 4, label: "+ part 4" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="The smallest region still changes the answer." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[{ id: "h1", text: "800 + 320 + 140 + 56", target: "u1" }, { id: "h2", text: "600 + 240 + 120 + 48", target: "u2" }, { id: "h3", text: "1,000 + 250 + 200 + 50", target: "u3" }]}
          targets={[{ id: "u1", label: "47 × 28" }, { id: "u2", label: "36 × 24" }, { id: "u3", label: "45 × 25" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Rana's way — label everything", omml: M.parts, h: 92, quote: "I write the numbers on every edge first." }}
          right={{ name: "Faris's way — just the four", omml: M.answer, h: 92, quote: "I go round the grid and write the four answers." }}
          same={["Both get 1,316", "Both use four regions", "Both split by place value"]}
          diff={["Rana labels the edges", "Faris writes less", "Rana catches her own mistakes faster"]} />;

      case 6:
        return <BoardScreen draw={drawBoard45} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "each region is one partial product" }]}
          hand={"split both factors · four regions · multiply each · add all four"}
          cards={[
            { title: "The product we built", omml: M.answer, note: "our estimate was 1,500" },
            { title: "Tap to see the four parts", omml: M.estimate, revealOmml: M.parts, reveal: true,
              note: "every region, added up" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Use an area model to work out 36 × 24."
          omml={M.swyk}
          options={[{ v: "a", text: "744" }, { v: "b", text: "864" }, { v: "c", text: "840" }, { v: "d", text: "624" }]}
          right="b"
          support={{
            yes: "Yes — 600 + 240 + 120 + 48 = 864.",
            notYet: "Not yet — check that you added all four regions.",
            draw: drawSupport45, h: 92,
            hint: "The four regions are 30×20, 30×4, 6×20 and 6×4."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find two two-digit numbers on a receipt and multiply them with an area model." />;

      default: return null;
    }
  }
};
