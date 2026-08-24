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

const makeArea = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel(ctx, {
    x: 62, y: 76, w: W - 110, h: 96, rowV: 3,
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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A rectangle cut into pieces. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Each piece is a multiplication you already know.",
      rail: { launch: "I am not asking for a total yet. Just describe the rectangle.",
        monitor: ["Counting the pieces", "Reading the numbers on top", "Noticing the pieces are different widths"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the pieces as separate problems rather than parts of one." } },

    { phase: "launch", title: "Three groups of <em>2,146</em>",
      lead: "A stadium block seats 2,146. Three blocks are open today. Estimate first.",
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
      lead: "Dima drew four regions. Rakan used expanded form with no rectangle. Both give 6,438.",
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
        connect: "How many regions would a five-digit number need?",
        misconception: "Thinking the model is only for small numbers." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write every partial product.",
        monitor: ["Listing all parts", "Adding correctly", "Estimating first"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Writing three partial products for a four-digit factor." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: doing it in your head, without a rectangle.",
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
        return <LaunchEstimate draw={drawStory35} height={254} award={award}
          label="About how many seats in three blocks?" min={3000} max={9000} start={6000} unit="seats"
          after="Locked. Now let us build it region by region."
          note="3 x 2,000 is easy. The rest is just more regions." />;

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
          items={[{ id: "y1", text: "6,000 + 300 + 120 + 18", target: "u1" }, { id: "y2", text: "4,000 + 1,200 + 80 + 20", target: "u2" }, { id: "y3", text: "10,000 + 400 + 60 + 10", target: "u3" }]}
          targets={[{ id: "u1", label: "3 × 2,146" }, { id: "u2", label: "4 × 1,325" }, { id: "u3", label: "5 × 2,092" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Dima's way — four regions", omml: M.parts, h: 92, quote: "One region for thousands, hundreds, tens and ones." }}
          right={{ name: "Rakan's way — expanded form", omml: M.answer, h: 92, quote: "I wrote 2,146 out in full and multiplied each part." }}
          same={["Both get 6,438", "Both use four parts", "Both rely on place value"]}
          diff={["Dima draws, Rakan writes", "Rakan needs no rectangle", "Dima can see the sizes"]} />;

      case 6:
        return <BoardScreen draw={drawBoard35} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "four places means four regions" }]}
          hand={"one region for every place · multiply each · add all four"}
          cards={[
            { title: "The product we built", omml: M.answer, note: "our estimate was 6,000" },
            { title: "Tap to see the parts", omml: M.estimate, revealOmml: M.parts, reveal: true,
              note: "every region, added up" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Use an area model to work out 4 × 1,325."
          omml={M.swyk}
          options={[{ v: "a", text: "5,200" }, { v: "b", text: "5,300" }, { v: "c", text: "4,300" }, { v: "d", text: "53,000" }]}
          right="b"
          support={{
            yes: "Yes — 4,000 + 1,200 + 80 + 20 = 5,300.",
            notYet: "Not yet — check that you added every region.",
            draw: drawSupport35, h: 84,
            hint: "Four regions: 4 × 1,000, 4 × 300, 4 × 20 and 4 × 5."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Write a four-digit number in expanded form and multiply it by 3 on paper." />;

      default: return null;
    }
  }
};
