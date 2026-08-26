/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-4 · Use Area Models and Partial Products to Multiply
   Standard 4.NBT.B.5   I can ... draw an area model for a 2-digit or 3-digit
   number times a 1-digit number, and add the partial products.
   =========================================================================== */

const M = {
  problem: om(mt("6\u00d7134")),
  answer: om(mt("6\u00d7134=804")),
  parts: om(mt("600 + 180 + 24")),
  estimate: om(mt("6×130=780")),
  decompose: om(mt("134"), mnor(" = "), mt("100 + 30 + 4")),
  rule: om(mnor("one region for each place · multiply · add them all")),
  swyk: om(mt("4\u00d7213")),
  swykAnswer: om(mt("800 + 40 + 12 = 852"))
};

const COLS = [{ v: 100 }, { v: 30 }, { v: 4 }];

const makeArea = (n, onN) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onN) D.tap(ctx, { x: 62, y: 70, w: W - 110, h: 110, value: 0, on: () => onN(n === COLS.length ? 1 : n + 1) });
  D.areaModel(ctx, {
    x: 62, y: 76, w: W - 110, h: 96, rowV: 6,
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
    const p = 6 * c.v;
    if (n < shown) sum += p;
    D.txt(ctx, "6 \u00d7 " + c.v, W / 2 - 40, 62 + n * 40,
      { size: 18, col: palette[n % 4], font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 18, 62 + n * 40, { size: 15, col: "rgba(234,244,242,.55)", font: "marker", alpha: a });
    D.txt(ctx, String(p), W / 2 + 74, 62 + n * 40,
      { size: 20, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
  });
  const ly = 62 + COLS.length * 40 - 16;
  if (shown === COLS.length) {
    D.marker(ctx, [[W / 2 - 110, ly], [W / 2 + 84, ly]], 1, "rgba(201,162,39,.6)", 1.8);
    D.txt(ctx, String(804), W / 2 + 74, ly + 30,
      { size: 25, col: "#34D399", font: "marker", align: "right" });
  }
  D.txt(ctx, shown === COLS.length ? "add every partial product" : "one partial product at a time",
    W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
};

const drawStory34 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 330), p3 = D.at(f, 340, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "a date-palm grove", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.areaModel(ctx, {
    x: 68, y: 60, w: W - 120, h: 78, rowV: 6, cols: COLS, prog: p2,
    showProducts: p3 > 0.3, showSum: false
  });
  if (p3 > 0) D.txt(ctx, "6 rows of 134 palms — how many trees?", W / 2, H - 18,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard34 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "One rectangle, one region per place" });
  const p1 = D.at(f, 20, 300), p2 = D.at(f, 320, 520), p3 = D.at(f, 530, 700);
  D.areaModel(ctx, { x: 96, y: 116, w: W - 190, h: 108, rowV: 6, cols: COLS, prog: p1, showSum: false });
  if (p2 > 0) {
    D.txt(ctx, "600 + 180 + 24", W / 2, 288, { size: 17, col: "#EAF4F2", font: "marker", alpha: p2 });
    D.txt(ctx, "= 804", W / 2, 322, { size: 24, col: "#34D399", font: "marker", alpha: D.at(f, 400, 500) });
  }
  if (p3 > 0) {
    const yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "every place gets its own region, and every region gets added", W / 2, yb - 2,
      { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 570, 660) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 610, 710), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport34 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel(ctx, { x: 40, y: 26, w: W - 76, h: 44, rowV: 4, cols: [{ v: 200 }, { v: 10 }, { v: 3 }], prog: 1, showSum: false });
};

const LESSON = {
  code: "3-4",
  storageKey: "daf-g4-t3-l4",
  title: "Use Area Models and Partial Products to Multiply",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-4 · 4.NBT.B.5",
  math: M,
  ixl: ["NA7", "SP2", "VR5", "SSA"],

  metas: [
    { phase: "warmup", title: "The roof split into <em>useful parts</em>",
      lead: "The grove's roof plan: one long rectangle, already cut into pieces. Each piece carries a number — and the sizes are not equal.",
      goal: "Notice the area model: one region for each place value.",
      pull: "The widths follow the place values — that is why they are not equal.",
      rail: { launch: "Fictional frame. Look at the pieces — no total yet.",
        monitor: ["Seeing the 100, 30 and 4 widths", "Noticing the single-digit side", "Wonding whether the pieces add up"],
        connect: "Why are the pieces different sizes?",
        misconception: "Thinking the regions must be equal to count." } },

    { phase: "launch", title: "Six rows of <em>134 palms</em>",
      lead: "About how many palm trees? Lock the estimate before the regions are built.",
      goal: "Estimate the product before the area model.",
      pull: "6 × 130 is easy. 6 × 134 becomes easy once it is cut up.",
      rail: { launch: "Give the estimate and what you rounded.",
        monitor: ["Rounding 134 to 130", "Multiplying 6 × 130", "Saying the exact answer is a bit more"],
        connect: "Why is the exact answer bigger than 780?",
        misconception: "Estimating the rows instead of the row length." } },

    { phase: "monitor", title: "Zayd builds the <em>regions</em>",
      lead: "One region at a time — hundreds, tens, ones. Every place gets its own region.",
      goal: "Build the area model region by region.",
      pull: "The widths follow the place values.",
      rail: { launch: "Predict the next region's width before it appears.",
        monitor: ["Adding the 100 region", "Adding the 30 region", "Seeing the 4 region"],
        connect: "Why is the 30 region narrower than the 100 region?",
        misconception: "Drawing equal regions instead of place-value regions." } },

    { phase: "monitor", title: "The <em>partial products</em>, one region at a time",
      lead: "6 × 100, 6 × 30, 6 × 4 — every region has to appear in the list.",
      goal: "Multiply each region and add every part.",
      pull: "Every region has to appear in the list.",
      rail: { launch: "Which region first?",
        monitor: ["Multiplying the hundreds region", "Multiplying the tens region", "Multiplying the ones region"],
        connect: "What would the total be if a region was missing?",
        misconception: "Dropping the ones region from the sum." } },

    { phase: "monitor", title: "Match the <em>model</em>",
      lead: "Three partial-product sums. Each one belongs to one roof.",
      goal: "Read area models back to their products.",
      pull: "The regions always match the digits.",
      rail: { launch: "Name the digits each sum's regions describe.",
        monitor: ["Reading 600 + 180 + 24", "Reading 800 + 40 + 12", "Reading 1,000 + 150 + 20"],
        connect: "How do you know which product a model belongs to?",
        misconception: "Matching by the total only, not the regions." } },

    { phase: "connect", title: "Maha uses <em>three</em> regions. Adnan uses <em>two</em>",
      lead: "Maha: one region for each place. Adnan: a big first chunk, then the rest. Both get 804.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the region counts", "Checking both sums reach 804", "Naming the digits each region covers"],
        connect: "Which model would you draw for 6 × 199?",
        misconception: "Believing only one region per digit is allowed." } },

    { phase: "synth", title: "On the <em>board</em>: one rectangle, one region per place",
      lead: "Draw the rectangle. Cut it at the places. Multiply each region. Add them all.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming each region", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Cutting the rectangle at equal widths." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One region for each place. Multiply. Add them all.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the regions", "Checking the add-back", "Testing on a new product"],
        connect: "Which region is easiest to forget?",
        misconception: "Forgetting that the 4 region is 24, not 4." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "4 × 213 — the area model, every region added.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Draw the three regions.",
        monitor: ["Cutting 213 at its places", "Multiplying each region", "Adding 800 + 40 + 12"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 840 — the ones region was dropped." } },

    { phase: "connect", title: "The roof is <em>priced</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the courtyard with the awkward side.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain the regions", "Still draws equal pieces", "Ready for awkward splits"],
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
            title="The roof split into useful parts"
            text="The grove's roof plan is one long rectangle, already cut into pieces. Each piece carries a number — and the sizes are not equal."
            clue="The widths follow the place values">
            <NoticeWonder draw={makeArea(COLS.length)} height={254} award={award}
              notices={["It is cut into pieces", "Each piece has a number", "The pieces are different sizes", "One side is a single digit"]}
              wonders={["What is the total?", "Why cut it there?", "Do I add the pieces?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Six rows of 134 palms"
            text="Omar asks for the estimate before the regions are built — the grove plan needs a number the council can defend."
            clue="6 × 130 is easy. 6 × 134 becomes easy once it is cut up.">
            <LaunchEstimate draw={drawStory34} height={254} award={award}
              label="About how many palm trees?" min={400} max={1200} start={800} unit="trees"
              after="Locked. Now let us build it region by region."
              note="The grove plan is simulated — the area model works on any product." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds the regions"
            text="He can add one region at a time — the class must predict each width before it appears."
            clue="The widths follow the place values">
            <ExploreChips draw={makeArea(n, setN)} height={254}
              label="Add one region at a time"
              value={n}
              onPick={(v) => setN(v)}
              chips={COLS.map((c, k) => ({ v: k + 1, label: "+ " + c.v }))}
              caption={<MathEl omml={M.decompose} size="lg" display="block" />}
              footnote="The widths follow the place values — that is why they are not equal." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The partial products, one region at a time"
            text="He can reveal each partial — the class must see that every region appears in the list."
            clue="Every region has to appear in the list">
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
            text="Omar and Zayd lay three partial-product sums on the table. Each one belongs to one roof."
            clue="The regions always match the digits">
            <CardSort award={award} columns={3}
              items={[{ id: "x1", text: "600 + 180 + 24", target: "t1" }, { id: "x2", text: "800 + 40 + 12", target: "t2" }, { id: "x3", text: "1,000 + 150 + 20", target: "t3" }]}
              targets={[{ id: "t1", label: "6 × 134" }, { id: "t2", label: "4 × 213" }, { id: "t3", label: "5 × 234" }]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 804"
            text="Maha uses one region for each place. Adnan takes a big first chunk, then the rest. Both get 804."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Maha's way — three regions", omml: M.parts, h: 92, quote: "One region for the hundreds, the tens and the ones." }}
              right={{ name: "Adnan's way — two, then split", omml: M.answer, h: 92, quote: "I did 6 x 130 first, then added 6 x 4." }}
              same={["Both get 804", "Both use place value", "Both add every part"]}
              diff={["Maha has three parts, Adnan has two", "Adnan uses a bigger first chunk", "Maha's regions match the digits exactly"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The model is drawn, not declared"
            text="Zayd builds only what the class can justify: the rectangle cut at its places, each region multiplied, all of them added."
            clue="Every place gets its own region, and every region gets added">
            <BoardScreen draw={drawBoard34} height={430}
              caption="One rectangle, one region per place." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the grove plan with its reason, not alone."
            clue="Every region, added up">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "one region for each place · multiply · add them all" }]}
              hand={"cut the long factor at its places · one region for each · multiply each · add them all"}
              cards={[
                { title: "The product we built", omml: M.answer, note: "our estimate was 780" },
                { title: "Tap to see the parts", omml: M.estimate, revealOmml: M.parts, reveal: true,
                  note: "every region, added up" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a total with every region"
            text="4 × 213. Show the area model — and every region added."
            clue="800 + 40 + 12 = 852">
            <ShowWhatYouKnow award={award}
              prompt="Use an area model to work out 4 × 213."
              omml={M.swyk}
              options={[{ v: "a", text: "812" }, { v: "b", text: "852" }, { v: "c", text: "840" }, { v: "d", text: "8,412" }]}
              right="b"
              support={{
                yes: "Yes — 800 + 40 + 12 = 852.",
                notYet: "Not yet — check that you added every region.",
                draw: drawSupport34, h: 84,
                hint: "The three regions are 4 × 200, 4 × 10 and 4 × 3."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The roof is priced"
            text="Omar signs the roof total with every region beside it. Zayd unrolls the next plan: a courtyard with an awkward side — and a rectangle that does not split in the obvious place."
            artifact="Grove plan · roof priced by regions"
            next="The next courtyard has an awkward side — that rectangle does not split in the obvious place.">
            <Closing game={game} omml={M.rule}
              action="Draw an area model for a 3-digit number times a single digit and show it to someone." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
