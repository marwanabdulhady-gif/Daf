/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-5 · More Use Area Models and Partial Products to Multiply
   Standard 4.NBT.B.5   I can ... use an area model for a 4-digit number times a
   1-digit number, and add four partial products.
   =========================================================================== */

const M = {
  problem: om(mt("3\u00d72146")),
  answer: om(mt("3\u00d72146=6,438")),
  parts: om(mt("6,000 + 300 + 120 + 18")),
  estimate: om(mt("3×2,000=6,000")),
  decompose: om(mt("2146"), mnor(" = "), mt("2,000 + 100 + 40 + 6")),
  rule: om(mnor("four places means four regions")),
  swyk: om(mt("4\u00d71325")),
  swykAnswer: om(mt("4,000 + 1,200 + 80 + 20 = 5,300"))
};

const COLS = [{ v: 2000 }, { v: 100 }, { v: 40 }, { v: 6 }];

const makeArea = (n, onN) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onN) D.tap(ctx, { x: 62, y: 70, w: W - 110, h: 110, value: 0, on: () => onN(n === COLS.length ? 1 : n + 1) });
  D.areaModel(ctx, {
    x: 62, y: 76, w: W - 110, h: 96, rowV: 3,
    cols: COLS.slice(0, n), prog: 1, showSum: n === COLS.length
  });
  D.txt(ctx, n === COLS.length ? "every piece counted" : "keep going — one piece is still missing",
    W / 2, H - 16, { size: 13, col: n === COLS.length ? "#34D399" : "#C9A227", font: "marker" });
};

const makeLadder = (shown, onShown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const palette = ["#2D70B3", "#FA7E19", "#6042A6", "#388C46"];
  let sum = 0;
  COLS.forEach((c, n) => {
    const a = n < shown ? 1 : 0.18;
    if (onShown) D.tap(ctx, { x: W / 2 - 90, y: 62 + n * 40 - 16, w: 200, h: 36, value: n + 1, on: (v) => onShown(v) });
    const p = 3 * c.v;
    if (n < shown) sum += p;
    D.txt(ctx, "3 \u00d7 " + c.v, W / 2 - 40, 62 + n * 40,
      { size: 18, col: palette[n % 4], font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 18, 62 + n * 40, { size: 15, col: "rgba(234,244,242,.55)", font: "marker", alpha: a });
    D.txt(ctx, String(p), W / 2 + 74, 62 + n * 40,
      { size: 20, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
  });
  const ly = 62 + COLS.length * 40 - 16;
  if (shown === COLS.length) {
    D.marker(ctx, [[W / 2 - 110, ly], [W / 2 + 84, ly]], 1, "rgba(201,162,39,.6)", 1.8);
    D.txt(ctx, String(6,438), W / 2 + 74, ly + 30,
      { size: 25, col: "#34D399", font: "marker", align: "right" });
  }
  D.txt(ctx, shown === COLS.length ? "add every partial product" : "one partial product at a time",
    W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
};

const drawStory35 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 330), p3 = D.at(f, 340, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "pilgrims on three coaches", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.areaModel(ctx, {
    x: 68, y: 60, w: W - 120, h: 78, rowV: 3, cols: COLS, prog: p2,
    showProducts: p3 > 0.3, showSum: false
  });
  if (p3 > 0) D.txt(ctx, "3 coaches of 2,146 seats — how many in total?", W / 2, H - 18,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard35 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Four places, four regions" });
  const p1 = D.at(f, 20, 300), p2 = D.at(f, 320, 520), p3 = D.at(f, 530, 700);
  D.areaModel(ctx, { x: 96, y: 116, w: W - 190, h: 108, rowV: 3, cols: COLS, prog: p1, showSum: false });
  if (p2 > 0) {
    D.txt(ctx, "6,000 + 300 + 120 + 18", W / 2, 288, { size: 17, col: "#EAF4F2", font: "marker", alpha: p2 });
    D.txt(ctx, "= 6,438", W / 2, 322, { size: 24, col: "#34D399", font: "marker", alpha: D.at(f, 400, 500) });
  }
  if (p3 > 0) {
    const yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the method does not change — only how many regions you draw", W / 2, yb - 2,
      { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 570, 660) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 610, 710), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport35 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel(ctx, { x: 40, y: 26, w: W - 76, h: 44, rowV: 4, cols: [{ v: 1000 }, { v: 300 }, { v: 20 }, { v: 5 }], prog: 1, showSum: false });
};

const LESSON = {
  code: "3-5",
  storageKey: "daf-g4-t3-l5",
  title: "More Use Area Models and Partial Products to Multiply",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-5 · 4.NBT.B.5",
  math: M,
  ixl: ["S5P", "SEG", "H7A", "CJW"],

  metas: [
    { phase: "warmup", title: "The courtyard with the <em>awkward side</em>",
      lead: "The next rectangle is longer: 2,146 on one side. Four places — and the split is no longer in the obvious place.",
      goal: "Notice the model now needs four regions, not three.",
      pull: "Four places means four regions.",
      rail: { launch: "Fictional frame. Look at the long side — no total yet.",
        monitor: ["Counting the places in 2,146", "Seeing the 100 gap between digits", "Wonding where the cut goes now"],
        connect: "How many regions does this rectangle need?",
        misconception: "Carrying over the three-region habit into a four-place number." } },

    { phase: "launch", title: "Three rows of <em>2,146</em>",
      lead: "About how many? Lock the estimate before the four regions are built.",
      goal: "Estimate the four-place product first.",
      pull: "3 × 2,000 is easy — and it is most of the answer.",
      rail: { launch: "Give the estimate and what you rounded.",
        monitor: ["Rounding 2,146 to 2,000", "Multiplying 3 × 2,000", "Saying the exact answer is a bit more"],
        connect: "Why is 6,000 so much of the total?",
        misconception: "Rounding to 2,100 and losing the 100 region." } },

    { phase: "monitor", title: "Zayd builds the <em>four regions</em>",
      lead: "Thousands, hundreds, tens, ones — one region for each place, even the gap places.",
      goal: "Build the area model with a region for every place in the number.",
      pull: "Every place in 2,146 gets its own region.",
      rail: { launch: "Predict each region's width before it appears.",
        monitor: ["Adding the 2,000 region", "Adding the 100 region", "Seeing the 40 and 6 regions"],
        connect: "Why is there a 100 region when the digits are 2-1-4-6?",
        misconception: "Skipping a place because its digit is small." } },

    { phase: "monitor", title: "The <em>four</em> partial products",
      lead: "6,000 + 300 + 120 + 18 — every region has to appear in the list.",
      goal: "Multiply each region and add all four parts.",
      pull: "One missing region changes the total by hundreds.",
      rail: { launch: "Which region first?",
        monitor: ["Multiplying the thousands region", "Multiplying the hundreds region", "Adding all four parts"],
        connect: "What would the total be if the 100 region was missing?",
        misconception: "Answering 6,338 — the 100 region was dropped." } },

    { phase: "monitor", title: "Match the <em>model</em>",
      lead: "Three partial-product sums. Each one belongs to one courtyard.",
      goal: "Read four-part models back to their products.",
      pull: "The regions always match the digits.",
      rail: { launch: "Name the digits each sum's regions describe.",
        monitor: ["Reading 6,000 + 300 + 120 + 18", "Reading 4,000 + 1,200 + 80 + 20", "Checking part counts match"],
        connect: "How do you know which product a model belongs to?",
        misconception: "Matching by the first (biggest) part only." } },

    { phase: "connect", title: "Dima <em>draws</em>. Rakan <em>writes</em>",
      lead: "Dima uses four regions. Rakan writes the number out in full and multiplies each part. Both get 6,438.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing drawing and writing", "Checking both reach 6,438", "Naming the four parts in each"],
        connect: "Which form would you use for 3 × 9,006?",
        misconception: "Believing the expanded form hides the regions." } },

    { phase: "synth", title: "On the <em>board</em>: four places, four regions",
      lead: "Draw the rectangle. Cut it at every place. Multiply each region. Add them all.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming each of the four regions", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Cutting at 2,100 and 46 instead of at the places." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "Four places means four regions. Multiply. Add them all.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming all four regions", "Checking the add-back", "Testing on a new product"],
        connect: "Which region is easiest to forget in a four-place number?",
        misconception: "Dropping the middle regions from the sum." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "4 × 1,325 — the area model, all four regions added.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the four regions.",
        monitor: ["Cutting 1,325 at its places", "Multiplying each region", "Adding all four parts"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 5,200 — the 300 region was dropped." } },

    { phase: "connect", title: "The courtyard is <em>planned</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: no paper at all — the delivery is delayed.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain the four regions", "Still drops a middle region", "Ready for mental strategies"],
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
            title="The courtyard with the awkward side"
            text="The next rectangle is longer: 2,146 on one side. Four places — and the split is no longer in the obvious place."
            clue="Four places means four regions">
            <NoticeWonder draw={makeArea(COLS.length)} height={254} award={award}
              notices={["The long side has four places", "Each region carries a number", "The regions are very different sizes", "One side is a single digit"]}
              wonders={["What is the total?", "Where does the cut go now?", "Which region is easiest to forget?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Three rows of 2,146"
            text="Omar asks for the estimate before the four regions are built — 3 × 2,146, rounded at a friendly place."
            clue="3 × 2,000 is easy — and it is most of the answer.">
            <LaunchEstimate draw={drawStory35} height={254} award={award}
              label="About how many altogether?" min={5500} max={7500} start={6400} unit="units"
              after="Locked. Now build the four regions."
              note="The courtyard plan is simulated — the area model works on any product." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds the four regions"
            text="He can add one region at a time — the class must predict each width, even the ones between the digits."
            clue="Every place in 2,146 gets its own region">
            <ExploreChips draw={makeArea(n, setN)} height={254}
              label="Add one region at a time"
              value={n}
              onPick={(v) => setN(v)}
              chips={COLS.map((c, k) => ({ v: k + 1, label: "+ " + c.v.toLocaleString("en-US") }))}
              caption={<MathEl omml={M.decompose} size="lg" display="block" />}
              footnote="Four places means four regions — even the gap places." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The four partial products"
            text="He can reveal each partial — the class must see that every region appears in the list."
            clue="One missing region changes the total by hundreds">
            <ExploreChips draw={makeLadder(shown, setShown)} height={254}
              label="Write the partial products"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={COLS.map((c, k) => ({ v: k + 1, label: k === 0 ? "first part" : "+ part " + (k + 1) }))}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="Every region has to appear in the list." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the model"
            text="Omar and Zayd lay three partial-product sums on the table. Each one belongs to one courtyard."
            clue="The regions always match the digits">
            <CardSort award={award} columns={3}
              items={[{ id: "y1", text: "6,000 + 300 + 120 + 18", target: "u1" }, { id: "y2", text: "4,000 + 1,200 + 80 + 20", target: "u2" }, { id: "y3", text: "10,000 + 400 + 60 + 10", target: "u3" }]}
              targets={[{ id: "u1", label: "3 × 2,146" }, { id: "u2", label: "4 × 1,325" }, { id: "u3", label: "5 × 2,092" }]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 6,438"
            text="Dima draws four regions. Rakan writes the number out in full and multiplies each part. Both get 6,438."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Dima's way — four regions", omml: M.parts, h: 92, quote: "One region for thousands, hundreds, tens and ones." }}
              right={{ name: "Rakan's way — expanded form", omml: M.answer, h: 92, quote: "I wrote 2,146 out in full and multiplied each part." }}
              same={["Both get 6,438", "Both use four parts", "Both rely on place value"]}
              diff={["Dima draws, Rakan writes", "Rakan needs no rectangle", "Dima can see the sizes"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The model is drawn, not declared"
            text="Zayd builds only what the class can justify: the rectangle cut at every place, each region multiplied, all four added."
            clue="Four places means four regions">
            <BoardScreen draw={drawBoard35} height={430}
              caption="Four places means four regions." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the grove plan with its reason, not alone."
            clue="Every region, added up">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "four places means four regions" }]}
              hand={"cut the long factor at every place · one region for each · multiply each · add them all"}
              cards={[
                { title: "The product we built", omml: M.answer, note: "our estimate was 6,000" },
                { title: "Tap to see the parts", omml: M.estimate, revealOmml: M.parts, reveal: true,
                  note: "all four regions, added up" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a total with every region"
            text="4 × 1,325. Show the area model — and all four regions added."
            clue="4,000 + 1,200 + 80 + 20 = 5,300">
            <ShowWhatYouKnow award={award}
              prompt="Use an area model to work out 4 × 1,325."
              omml={M.swyk}
              options={[{ v: "a", text: "5,200" }, { v: "b", text: "5,300" }, { v: "c", text: "4,300" }, { v: "d", text: "53,000" }]}
              right="b"
              support={{
                yes: "Yes — 4,000 + 1,200 + 80 + 20 = 5,300.",
                notYet: "Not yet — check that you added every region.",
                draw: drawSupport35, h: 84,
                hint: "Four regions: 4 × 1,000, 4 × 300, 4 × 20 and 4 × 5."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The courtyard is planned"
            text="Omar signs the courtyard total with all four regions beside it. The delivery note arrives late — and with it, no paper, no board, and an order that must be updated in the air."
            artifact="Grove plan · courtyard priced by four regions"
            next="The delivery is delayed — with no paper available, the order must be updated with a mental strategy.">
            <Closing game={game} omml={M.rule}
              action="Draw an area model for a 4-digit number times a single digit and show it to someone." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
