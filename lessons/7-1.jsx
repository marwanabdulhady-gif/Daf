/* ===========================================================================
   Grade 4 · Topic 7 · LESSON 7-1 · Understand Factors
   Standard 4.OA.B.4   I can ... build every rectangle for a number and read
   its factor pairs off them.
   =========================================================================== */

const M = {
  pair1: om(mt("1\u00d712=12")),
  pair2: om(mt("2\u00d76=12")),
  pair3: om(mt("3\u00d74=12")),
  all: om(mnor("factors of 12: "), mt("1,2,3,4,6,12")),
  notFactor: om(mt("12\u00f75"), mnor(" leaves a remainder")),
  rule: om(mnor("a factor divides the number with nothing left over")),
  swyk: om(mnor("factors of 16")),
  swykAnswer: om(mt("1,2,4,8,16"))
};

const PAIRS12 = [[1, 12], [2, 6], [3, 4]];

const makeRects = (active) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.factorRects(ctx, { n: 12, pairs: PAIRS12, active: active, x: 30, y: 54, w: W - 60, h: 110, cell: 11 });
  D.txt(ctx, "every rectangle has exactly 12 squares", W / 2, 30,
    { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, active >= PAIRS12.length - 1 ? "three rectangles, six factors"
                                          : "keep going \u2014 is there another rectangle?",
    W / 2, H - 16, { size: 13.5, col: active >= PAIRS12.length - 1 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeTest = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = Math.ceil(12 / n);
  const cell = 18, gap = 3;
  const gx = W / 2 - (n * (cell + gap)) / 2;
  const gy = 66;
  let placed = 0;
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < n; c++) {
      if (placed >= 12) {
        ctx.save();
        D.rr(ctx, gx + c * (cell + gap), gy + r * (cell + gap), cell, cell, 3);
        ctx.strokeStyle = "#C74440"; ctx.lineWidth = 1.6; ctx.setLineDash([3, 3]); ctx.stroke();
        ctx.restore();
        continue;
      }
      ctx.save();
      D.rr(ctx, gx + c * (cell + gap), gy + r * (cell + gap), cell, cell, 3);
      ctx.fillStyle = (12 % n === 0) ? "#34D399" : "#2D70B3";
      ctx.globalAlpha = 0.75; ctx.fill();
      ctx.restore();
      placed++;
    }
  }
  const ok = 12 % n === 0;
  D.txt(ctx, "rows of " + n, W / 2, 40, { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, ok ? n + " is a factor of 12" : n + " is not a factor of 12",
    W / 2, H - 40, { size: 16, col: ok ? "#34D399" : "#C74440", font: "marker" });
  D.txt(ctx, ok ? "the rectangle is complete" : "the last row has gaps",
    W / 2, H - 16, { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

const drawTiles71 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "arranging 12 tiles", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.factorRects(ctx, { n: 12, pairs: PAIRS12, active: Math.floor(p2 * 3), x: 30, y: 52, w: W - 60, h: 100, cell: 10 });
  if (p3 > 0) D.txt(ctx, "how many different rectangles can you make?", W / 2, H - 16,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard71 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Every rectangle is a factor pair" });
  const p1 = D.at(f, 20, 340), p2 = D.at(f, 360, 540), p3 = D.at(f, 560, 720);
  D.factorRects(ctx, { n: 12, pairs: PAIRS12, active: Math.floor(p1 * 3),
    x: 80, y: 106, w: W - 160, h: 130, cell: 13 });
  if (p2 > 0) {
    D.txt(ctx, "1, 2, 3, 4, 6, 12", W / 2, 300, { size: 24, col: "#C9A227", font: "marker", alpha: p2 });
    D.txt(ctx, "each rectangle gives two factors", W / 2, 336,
      { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 420, 520) });
  }
  if (p3 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "a factor fills the rectangle exactly \u2014 no gaps, no leftovers",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 600, 700) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 640, 740), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport71 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.factorRects(ctx, { n: 16, pairs: [[1, 16], [2, 8], [4, 4]], active: 2,
    x: 24, y: 14, w: W - 48, h: 52, cell: 6 });
};

const LESSON = {
  code: "7-1",
  storageKey: "daf-g4-t7-l1",
  title: "Understand Factors",
  unit: "GRADE 4 · TOPIC 7 · LESSON 7-1 · 4.OA.B.4",
  math: M,
  ixl: ["8ZV"],

  metas: [
    { phase: "warmup", title: "A tile with more than <em>one shape</em>",
      lead: "12 reef tiles make three different rectangles: 1×12, 2×6, 3×4. The same pieces, the different shapes. Mariam, the architect, will sign only a certificate with no missing pair.",
      goal: "Notice a factor: each rectangle hands you two numbers that multiply to the tile count.",
      pull: "Each rectangle hands you two factors at once.",
      rail: { launch: "Fictional frame. Look at the rectangles — no working yet.",
        monitor: ["Counting the rectangles", "Reading the side labels", "Wonding why those numbers"],
        connect: "What do the side labels of each rectangle multiply to?",
        misconception: "Thinking a number has only one rectangular shape." } },

    { phase: "launch", title: "How many rectangles <em>from 12 tiles</em>?",
      lead: "The architect will cast the module in whatever shapes 12 tiles allow. How many are there?",
      goal: "Create the need — turning a rectangle sideways does not make a new one.",
      pull: "Turning a rectangle sideways does not make a new one.",
      rail: { launch: "Give a rectangle count and say how you are keeping them straight.",
        monitor: ["Counting 1×12, 2×6, 3×4", "Not counting 6×2 again", "Estimating first"],
        connect: "Why is 6×2 the same rectangle as 2×6?",
        misconception: "Counting a sideways rectangle as a new one." } },

    { phase: "monitor", title: "Zayd reveals <em>each rectangle</em>",
      lead: "1×12, 2×6, 3×4 — each reveal hands the class two factors at once.",
      goal: "Build every full rectangle and read both sides.",
      pull: "Each rectangle hands you two factors at once.",
      rail: { launch: "Before each reveal: what two numbers does the side carry?",
        monitor: ["Reading 1 and 12", "Reading 2 and 6", "Reading 3 and 4"],
        connect: "Which side-pair have we not seen yet?",
        misconception: "Staying at the first rectangle found." } },

    { phase: "monitor", title: "Try rows of <em>three, four, five, six</em>",
      lead: "Rows of 3 and 4 close with no gap; rows of 5 leave a hole. A gap means not a factor.",
      goal: "Test a candidate by trying it: nothing left over means factor.",
      pull: "A gap in the last row means it is not a factor.",
      rail: { launch: "Before each try: will the last row close?",
        monitor: ["Trying rows of 5", "Seeing the gap", "Naming 5 a non-factor"],
        connect: "How do you know 5 is not a factor of 12?",
        misconception: "Calling every smaller number a factor." } },

    { phase: "monitor", title: "Factor or <em>not</em>?",
      lead: "Four candidates from the reef crew. Each one must pass the no-remainder test.",
      goal: "Sort candidates into factors and non-factors of 12.",
      pull: "Divides with nothing left over — that is the test.",
      rail: { launch: "Before each placement: what is the remainder?",
        monitor: ["Testing 3 with no remainder", "Testing 5 with a remainder", "Naming 6 and its partner"],
        connect: "What does the remainder tell you?",
        misconception: "Sorting by size instead of by the test." } },

    { phase: "connect", title: "Firas <em>builds</em>. Fahad <em>divides in order</em>",
      lead: "Firas builds every rectangle. Fahad tries 1, then 2, then 3, and writes down what worked. Both find 1, 2, 3, 4, 6, 12.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the rectangles", "Following the ordered tests", "Comparing the factor lists"],
        connect: "Which method proves none are missed?",
        misconception: "Believing one found pair is the whole list." } },

    { phase: "synth", title: "On the <em>board</em>: the factor list",
      lead: "Build every full rectangle. Read both sides. That is the factor list: 1, 2, 3, 4, 6, 12.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Building the rectangles", "Reading the pairs", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Listing only the pairs' smaller numbers." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "A factor divides the number with nothing left over — and it always arrives with a partner.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the test", "Pairing the factors", "Testing on a new number"],
        connect: "Which two numbers does every number have for certain?",
        misconception: "Forgetting 1 and the number itself." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "Which list gives every factor of 16?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Test in order, stop when the pairs meet.",
        monitor: ["Testing 1, 2, 4", "Noting 4 × 4", "Including 1 and 16"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 1, 2, 4, 8 — the 16 was dropped." } },

    { phase: "connect", title: "The module's <em>first shape</em> is found",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the architect accepts the module only when no factor pair is missing.",
      rail: { launch: "Ask three students to give a number's factor list.",
        monitor: ["Able to explain the test", "Still stops at the first pair", "Ready for the full pair list"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [active, setActive] = useState(0);
    const [n, setN] = useState(3);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern" support="mariam"
            title="A tile with more than one shape"
            text="12 reef tiles make three different rectangles: 1×12, 2×6, 3×4. The same pieces, the different shapes."
            clue="Each rectangle hands you two factors at once.">
            <NoticeWonder draw={makeRects(2)} height={256} award={award}
              notices={["They all use 12 tiles", "The shapes are different", "One is a single row", "The sides are labelled"]}
              wonders={["How many rectangles are there?", "Why those numbers?", "Would 5 work?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The module's possible shapes"
            text="Omar asks the architect's question: 12 tiles — how many different rectangles, and how do we keep the sideways ones from double-counting?"
            clue="Turning a rectangle sideways does not make a new one.">
            <LaunchEstimate draw={drawTiles71} height={256} award={award}
              label="How many different rectangles from 12 tiles?" min={1} max={8} start={3} unit="rectangles"
              after="Locked. Now let us build them one at a time."
              note="The tile counts are simulated — the factor idea works on any number." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd reveals each rectangle"
            text="He can reveal any rectangle — the class must read both sides before the next appears."
            clue="Each rectangle hands you two factors at once.">
            <ExploreChips draw={makeRects(active)} height={256}
              label="Reveal each rectangle"
              value={active}
              onPick={(v) => setActive(v)}
              chips={PAIRS12.map((p, k) => ({ v: k, label: p[0] + " × " + p[1] }))}
              caption={<MathEl omml={active === 0 ? M.pair1 : active === 1 ? M.pair2 : M.pair3} size="xl" display="block" />}
              footnote="Each rectangle hands you two factors at once." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar tests the candidates"
            text="Rows of 3 and 4 close with no gap; rows of 5 leave a hole. Omar runs the no-remainder test."
            clue="A gap in the last row means it is not a factor.">
            <ExploreChips draw={makeTest(n)} height={256}
              label="Try rows of ..."
              value={n}
              onPick={(v) => setN(v)}
              chips={[{ v: 3, label: "3" }, { v: 4, label: "4" }, { v: 5, label: "5" }, { v: 6, label: "6" }]}
              caption={<MathEl omml={12 % n === 0 ? M.all : M.notFactor} size="lg" display="block" />}
              footnote="A gap in the last row means it is not a factor." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Factor or not?"
            text="Omar and Zayd lay four candidates from the reef crew on the board. Each one must pass the no-remainder test."
            clue="Divides with nothing left over — that is the test.">
            <CardSort award={award} columns={2}
              items={[
                { id: "f1", text: "3", target: "yes" }, { id: "f2", text: "5", target: "no" },
                { id: "f3", text: "6", target: "yes" }, { id: "f4", text: "8", target: "no" }
              ]}
              targets={[
                { id: "yes", label: "a factor of 12" },
                { id: "no", label: "not a factor of 12" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one factor list"
            text="Firas builds every rectangle. Fahad divides in order. Both lists read 1, 2, 3, 4, 6, 12."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Firas's way — build rectangles", omml: M.pair3, h: 92,
                      quote: "Every rectangle I can build gives me two factors." }}
              right={{ name: "Fahad's way — divide in order", omml: M.all, h: 92,
                       quote: "I tried 1, then 2, then 3, and wrote down what worked." }}
              same={["Both find 1, 2, 3, 4, 6 and 12", "Both use the no-remainder test", "Both pair the factors up"]}
              diff={["Firas draws, Fahad divides", "Fahad's order proves none are missed",
                     "Firas can see why they come in pairs"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The factor list is drawn, not declared"
            text="Zayd builds only what the class can justify: the rectangles, the tests, the pairs."
            clue="A factor divides the number with nothing left over.">
            <BoardScreen draw={drawBoard71} height={430}
              caption="A factor divides the number with nothing left over." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="A factor divides the number with nothing left over — and it always arrives with a partner."
            clue="Factors come in pairs.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "a factor divides the number with nothing left over" }]}
              hand={"build every full rectangle · read both sides · that is the factor list"}
              cards={[
                { title: "The factors we found", omml: M.all, note: "three rectangles, six factors" },
                { title: "Tap to see a non-factor", omml: M.pair2, revealOmml: M.notFactor, reveal: true,
                  note: "5 leaves gaps in the rectangle" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the first shape"
            text="Which list gives every factor of 16?"
            clue="1 and 16 are certain. 4 × 4 means 4 counts once.">
            <ShowWhatYouKnow award={award}
              prompt="Which list gives every factor of 16?"
              omml={M.swyk}
              options={[{ v: "a", text: "1,2,4,8" }, { v: "b", text: "1,2,4,8,16" }, { v: "c", text: "2,4,8" }, { v: "d", text: "1,2,3,4,8,16" }]}
              right="b"
              support={{
                yes: "Yes — 1×16, 2×8 and 4×4. The 4 only counts once.",
                notYet: "Not yet — check the very smallest and the very largest.",
                draw: drawSupport71, h: 82,
                hint: "Every number has 1 and itself as factors."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff support="mariam"
            title="The module's first shape is found"
            text="Omar signs the first shape: 12 tiles, three rectangles, six factors. But the architect's certificate is stricter — she will accept the module only when no factor pair is missing."
            artifact="Reef kit · first factor list"
            next="Every possible rectangle — the architect accepts the module only when no factor pair is missing.">
            <Closing game={game} omml={M.rule}
              action="Find a number of things at home and arrange them into every rectangle you can." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
