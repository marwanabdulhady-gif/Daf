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

const makeArea = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel(ctx, {
    x: 62, y: 76, w: W - 110, h: 96, rowV: 6,
    cols: COLS.slice(0, n), prog: 1, showSum: n === COLS.length
  });
  D.txt(ctx, n === COLS.length ? "every piece counted" : "keep going — one piece is still missing",
    W / 2, H - 16, { size: 13, col: n === COLS.length ? "#34D399" : "#C9A227", font: "marker" });
};

const makeLadder = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const palette = ["#2D70B3", "#FA7E19", "#6042A6", "#388C46"];
  let sum = 0;
  COLS.forEach((c, n) => {
    const a = n < shown ? 1 : 0.18;
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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A rectangle cut into pieces. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Each piece is a multiplication you already know.",
      rail: { launch: "I am not asking for a total yet. Just describe the rectangle.",
        monitor: ["Counting the pieces", "Reading the numbers on top", "Noticing the pieces are different widths"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the pieces as separate problems rather than parts of one." } },

    { phase: "launch", title: "Six rows of <em>134 palms</em>",
      lead: "A grove has 6 rows with 134 date palms in each. Estimate first.",
      goal: "Create the need — a hard product becomes several easy ones.",
      pull: "Estimate first, then we will build it piece by piece.",
      rail: { launch: "Roughly how many? Round one factor in your head.",
        monitor: ["Rounding to estimate", "Adding repeatedly", "Trying the algorithm"],
        connect: "Which factor is worth breaking apart?",
        misconception: "Breaking apart the single-digit factor instead of the long one." } },

    { phase: "monitor", title: "Build the <em>area model</em>",
      lead: "Add one region at a time and watch the partial products appear.",
      goal: "Each region is one partial product.",
      pull: "Now write those pieces in a list.",
      rail: { launch: "Predict each region's product before you tap.",
        monitor: ["Naming each region", "Multiplying by place value", "Losing a region"],
        connect: "Which region is the biggest, and why?",
        misconception: "Making the regions equal width regardless of value." } },

    { phase: "monitor", title: "Add the <em>partial products</em>",
      lead: "Every region has to be counted. Miss one and the answer is wrong.",
      goal: "Record and total the parts.",
      pull: "Match some models to their expressions.",
      rail: { launch: "Predict each line before you reveal it.",
        monitor: ["Listing all parts", "Adding as they go", "Dropping the smallest part"],
        connect: "What happens if you leave one out?",
        misconception: "Stopping after the largest partial product." } },

    { phase: "monitor", title: "Match the <em>model</em>",
      lead: "Which set of partial products belongs to that model? No grading until the class commits.",
      goal: "Read an area model backwards.",
      pull: "Two students drew the same product differently.",
      rail: { launch: "Look at the number of regions first.",
        monitor: ["Counting regions", "Checking the largest part", "Adding to test"],
        connect: "How did you know which belonged?",
        misconception: "Matching by the total instead of the parts." } },

    { phase: "connect", title: "Two ways to <em>break it up</em>",
      lead: "Maha used three regions. Adnan used two, then split again. Both give 804.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Splitting by place value", "Splitting another way", "Checking both totals"],
        connect: "Which split gives the fewest pieces?",
        misconception: "Believing place value is the only legal split." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One rectangle, one region per place. Multiply each, then add them all.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next region", "Naming each product", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting to add the parts at the end." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the decomposition", "Testing on a new product", "Checking against an estimate"],
        connect: "Would this still work for a four-digit number?",
        misconception: "Thinking the model is only for small numbers." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write every partial product.",
        monitor: ["Listing all parts", "Adding correctly", "Estimating first"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Adding only the hundreds and the ones." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the same rectangle, with a four-digit number.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the rectangle", "Ready for the next strategy"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeArea(COLS.length)} height={254} award={award}
          notices={["It is cut into pieces", "Each piece has a number", "The pieces are different sizes", "One side is a single digit"]}
          wonders={["What is the total?", "Why cut it there?", "Do I add the pieces?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory34} height={254} award={award}
          label="About how many palm trees?" min={400} max={1200} start={800} unit="trees"
          after="Locked. Now let us build it region by region."
          note="6 x 100 is easy. 6 x 134 becomes easy once it is cut up." />;

      case 2:
        return <ExploreChips draw={makeArea(n)} height={254}
          label="Add one region at a time"
          value={n}
          onPick={(v) => setN(v)}
          chips={COLS.map((c, k) => ({ v: k + 1, label: "+ " + c.v }))}
          caption={<MathEl omml={M.decompose} size="lg" display="block" />}
          footnote="The widths follow the place values — that is why they are not equal." />;

      case 3:
        return <ExploreChips draw={makeLadder(shown)} height={254}
          label="Write the partial products"
          value={shown}
          onPick={(v) => setShown(v)}
          chips={COLS.map((c, k) => ({ v: k + 1, label: k === 0 ? "first part" : "+ part " + (k + 1) }))}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Every region has to appear in the list." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[{ id: "x1", text: "600 + 180 + 24", target: "t1" }, { id: "x2", text: "800 + 40 + 12", target: "t2" }, { id: "x3", text: "1,000 + 150 + 20", target: "t3" }]}
          targets={[{ id: "t1", label: "6 × 134" }, { id: "t2", label: "4 × 213" }, { id: "t3", label: "5 × 234" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Maha's way — three regions", omml: M.parts, h: 92, quote: "One region for the hundreds, the tens and the ones." }}
          right={{ name: "Adnan's way — two, then split", omml: M.answer, h: 92, quote: "I did 6 x 130 first, then added 6 x 4." }}
          same={["Both get 804", "Both use place value", "Both add every part"]}
          diff={["Maha has three parts, Adnan has two", "Adnan uses a bigger first chunk", "Maha's regions match the digits exactly"]} />;

      case 6:
        return <BoardScreen draw={drawBoard34} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "one region for each place · multiply · add them all" }]}
          hand={"cut the long factor at its places · one region for each · multiply each · add them all"}
          cards={[
            { title: "The product we built", omml: M.answer, note: "our estimate was 780" },
            { title: "Tap to see the parts", omml: M.estimate, revealOmml: M.parts, reveal: true,
              note: "every region, added up" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Use an area model to work out 4 × 213."
          omml={M.swyk}
          options={[{ v: "a", text: "812" }, { v: "b", text: "852" }, { v: "c", text: "840" }, { v: "d", text: "8,412" }]}
          right="b"
          support={{
            yes: "Yes — 800 + 40 + 12 = 852.",
            notYet: "Not yet — check that you added every region.",
            draw: drawSupport34, h: 84,
            hint: "The three regions are 4 × 200, 4 × 10 and 4 × 3."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Draw an area model for a 3-digit number times a single digit and show it to someone." />;

      default: return null;
    }
  }
};
