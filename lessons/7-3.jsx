/* ===========================================================================
   Grade 4 · Topic 7 · LESSON 7-3 · Repeated Reasoning
   Standard MP.8   I can ... use the same repeated check to find every
   factor pair, and know when to stop.
   =========================================================================== */

const M = {
  left: om(mnor("factors of 24: "), mt("1,2,3,4,6,8,12,24")),
  right: om(mt("24\u00f77"), mnor(" leaves a remainder")),
  reveal: om(mnor("stop when the pairs meet")),
  rule: om(mnor("test 1, 2, 3 ... in order \u00b7 stop when the pair repeats")),
  swyk: om(mnor("factor pairs of 36")),
  swykAnswer: om(mt("6\u00d76=36"))
};

const F24 = [1, 2, 3, 4, 6, 8, 12, 24];

const makeSearch = (upto) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const found = F24.filter(function (v) { return v <= upto; });
  D.numberGrid(ctx, { n: 24, cols: 8, x: 60, y: 52, w: W - 120, ch: 30,
    sets: [{ nums: found, col: "#34D399" },
           { nums: [upto], col: "#C9A227", ring: true }] });
  D.txt(ctx, "testing up to " + upto, W / 2, 32, { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, upto >= 6 ? "1, 2, 3, 4, 6, 8, 12, 24 \u2014 that is all of them"
                       : "keep testing in order",
    W / 2, H - 16, { size: 13.5, col: upto >= 6 ? "#34D399" : "#C9A227", font: "marker" });
};

const makePairUp = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const pairs = [[1, 24], [2, 12], [3, 8], [4, 6]];
  pairs.forEach(function (p, k) {
    const a = k < shown ? 1 : 0.16;
    const y = 66 + k * 44;
    D.txt(ctx, String(p[0]), W / 2 - 70, y, { size: 22, col: "#2D70B3", font: "marker", alpha: a });
    D.txt(ctx, "\u00d7", W / 2 - 34, y, { size: 16, col: "rgba(234,244,242,.5)", font: "marker", alpha: a });
    D.txt(ctx, String(p[1]), W / 2 + 6, y, { size: 22, col: "#FA7E19", font: "marker", alpha: a });
    D.txt(ctx, "= 24", W / 2 + 74, y, { size: 16, col: "rgba(234,244,242,.6)", font: "marker", alpha: a });
  });
  D.txt(ctx, shown === 4 ? "4 and 6 are next to each other \u2014 stop here"
                         : "each test gives you two factors at once",
    W / 2, H - 16, { size: 13.5, col: shown === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawBoard73 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "The same check, over and over" });
  const p1 = D.at(f, 20, 380), p2 = D.at(f, 400, 580), p3 = D.at(f, 590, 740);
  const pairs = [[1, 24], [2, 12], [3, 8], [4, 6]];
  pairs.forEach(function (p, k) {
    const a = D.at(p1, k / 4, k / 4 + 0.4);
    if (a <= 0) return;
    D.txt(ctx, p[0] + " \u00d7 " + p[1] + " = 24", W / 2, 116 + k * 46,
      { size: 21, col: "#EAF4F2", font: "marker", alpha: a });
  });
  if (p2 > 0) D.txt(ctx, "1, 2, 3, 4, 6, 8, 12, 24", W / 2, 312,
    { size: 22, col: "#C9A227", font: "marker", alpha: p2 });
  if (p3 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the same question each time \u2014 that is what makes it safe",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 630, 730) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 670, 770), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawStory73 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 350), p3 = D.at(f, 360, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the factors of 24", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.numberGrid(ctx, { n: 24, cols: 8, x: 56, y: 44, w: W - 112, ch: 22,
    sets: [{ nums: [1,2,3,4,6,8,12,24].slice(0, Math.ceil([1,2,3,4,6,8,12,24].length * p2)), col: "#34D399" }] });
  if (p3 > 0) D.txt(ctx, "how do you know you have found them all?", W / 2, H - 14,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawSupport73 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.numberGrid(ctx, { n: 36, cols: 6, x: 26, y: 8, w: W - 52, ch: 19,
    sets: [{ nums: [1,2,3,4,6,9,12,18,36], col: "#34D399" }] });
};


/* repeated reasoning: the same pair method as the tiles grow 24 → 36 → 48 */
const makeGrow73 = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: 30, y: 40, w: W - 60, h: H - 80, value: 0, on: () => onStep((step + 1) % 4) });
  const rows = [
    { n: "24", t: "1×24 · 2×12 · 3×8 · 4×6", col: "#2D70B3" },
    { n: "36", t: "1×36 · 2×18 · 3×12 · 4×9 · 6×6", col: "#FA7E19" },
    { n: "48", t: "1×48 · 2×24 · 3×16 · 4×12 · 6×8", col: "#6042A6" }
  ];
  let y = 70;
  rows.forEach((r, k) => {
    const on = k < step;
    ctx.save();
    D.rr(ctx, 30, y - 18, W - 60, 40, 8);
    ctx.fillStyle = on ? "rgba(234,244,242,.06)" : "rgba(234,244,242,.02)";
    ctx.fill();
    ctx.strokeStyle = on ? r.col : "rgba(234,244,242,.15)";
    ctx.lineWidth = on ? 2 : 1; ctx.stroke();
    ctx.restore();
    D.txt(ctx, r.n, 56, y + 2, { size: 16, col: r.col, font: "mono", weight: 700, alpha: on ? 1 : 0.3 });
    D.txt(ctx, on ? r.t : "…", W / 2 + 40, y + 2, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: on ? 1 : 0.25 });
    y += 48;
  });
  D.txt(ctx, step === 3 ? "the same method, every size — the pairs close in the same way"
                       : "the reef tiles grow — does the method survive?",
    W / 2, H - 16, { size: 13, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

/* the Missing Pair: a factor list that stopped too early */
const makeMissingPair73 = (found, onFound) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onFound) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onFound(!found) });
  D.txt(ctx, "a confident factor list for 24", W / 2, 30, { size: 13, col: "#2D70B3", font: "marker" });
  const lines = [
    { t: "1, 2, 3, 4, 6 — that is all the factors of 24", gap: true }
  ];
  let y = 74;
  lines.forEach((l) => {
    const flagged = found && l.gap;
    ctx.save();
    D.rr(ctx, 30, y - 15, W - 60, 34, 7);
    ctx.fillStyle = flagged ? "rgba(199,68,64,.18)" : "rgba(234,244,242,.04)";
    ctx.fill();
    if (flagged) { ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    D.txt(ctx, l.t, W / 2, y + 2, { size: 13.5, col: flagged ? "#C74440" : "#EAF4F2", font: "marker" });
    y += 42;
  });
  D.txt(ctx, found ? "8, 12 and 24 are missing — the testing stopped too early"
                   : "does the list really stop there?",
    W / 2, H - 18, { size: 13, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

/* the pairs of 36, one pair at a time — the self-pair meets in the middle */
const makePair36 = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  const pairs = [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]];
  pairs.forEach(function (p, k) {
    const a = k < shown ? 1 : 0.16;
    const y = 58 + k * 40;
    D.txt(ctx, String(p[0]), W / 2 - 80, y, { size: 20, col: "#2D70B3", font: "marker", alpha: a });
    D.txt(ctx, "\u00d7", W / 2 - 44, y, { size: 15, col: "rgba(234,244,242,.5)", font: "marker", alpha: a });
    D.txt(ctx, String(p[1]), W / 2 - 6, y, { size: 20, col: "#FA7E19", font: "marker", alpha: a });
    D.txt(ctx, "= 36", W / 2 + 52, y, { size: 15, col: "rgba(234,244,242,.6)", font: "marker", alpha: a });
  });
  D.txt(ctx, shown === 5 ? "6 \u00d7 6 meets itself \u2014 the list is complete"
                         : "each test gives you two factors at once",
    W / 2, H - 16, { size: 13.5, col: shown === 5 ? "#34D399" : "#C9A227", font: "marker" });
};

const LESSON = {
  code: "7-3",
  storageKey: "daf-g4-t7-l3",
  title: "Repeated Reasoning",
  unit: "GRADE 4 · TOPIC 7 · LESSON 7-3 · MP.8",
  math: M,
  ixl: ["URL"],

  metas: [
    { phase: "warmup", title: "The method that <em>repeats</em>",
      lead: "The pair method ran on 24. The reef tiles are growing — 36, then 48. The method must run again, the same way.",
      goal: "Notice repeated reasoning: the same method, the same checks, a bigger tile.",
      pull: "How do you know you have found them all — every time?",
      rail: { launch: "Fictional frame. Look at the list for 24 — no working yet.",
        monitor: ["Reading the pairs of 24", "Predicting the pairs of 36", "Wonding what stays the same"],
        connect: "What part of the method never changes, tile after tile?",
        misconception: "Starting each new tile with a new, random method." } },

    { phase: "launch", title: "How many factors does <em>36 have</em>?",
      lead: "The bigger tile: the same order, the same meeting point. Lock your guess first.",
      goal: "Create the need — the method must survive a tile it has not seen.",
      pull: "A guess is fine. The method is what makes the guess checkable.",
      rail: { launch: "Give a pair count and say where the pairs will meet.",
        monitor: ["Guessing 5 pairs", "Predicting 6 × 6", "Planning the order"],
        connect: "Where do the pairs meet for 36?",
        misconception: "Assuming the meeting point is always the same number." } },

    { phase: "monitor", title: "Zayd runs the method on <em>24</em>",
      lead: "Test in order: 1, 2, 3, 4, 5, 6. Each hit writes its partner; the list closes at 4 and 6.",
      goal: "Run the repeated reasoning once, out loud, on the known tile.",
      pull: "Test in order and you cannot skip one by accident.",
      rail: { launch: "Before each test: what partner would a hit give?",
        monitor: ["Testing in order", "Writing the partners", "Stopping at the meeting"],
        connect: "Which step of the method did you watch most carefully?",
        misconception: "Skipping tests because the answer 'feels' right." } },

    { phase: "monitor", title: "The same method on <em>36 and 48</em>",
      lead: "The tiles grow: 36, then 48. The method runs the same way — and the pairs close in the same place they should.",
      goal: "Repeat the method on bigger tiles without changing it.",
      pull: "The same method, every size — the pairs close in the same way.",
      rail: { launch: "Before each tile: where will the pairs meet?",
        monitor: ["Running the order on 36", "Running the order on 48", "Comparing the meeting points"],
        connect: "What changed between tiles, and what did not?",
        misconception: "Changing the order to 'fit' a bigger tile." } },

    { phase: "monitor", title: "Pair them up — <em>stop when they meet</em>",
      lead: "1×36, 2×18, 3×12, 4×9, 6×6. When a pair meets itself, the list is complete.",
      goal: "Find the meeting point, including a pair with itself.",
      pull: "Once the two numbers in a pair are next to each other, there are no more.",
      rail: { launch: "Before each pair: have the pairs met yet?",
        monitor: ["Pairing 1 with 36", "Finding 6 × 6", "Stopping at the meeting"],
        connect: "Why does 6 × 6 count as one pair, not two?",
        misconception: "Counting a self-pair twice." } },

    { phase: "monitor", title: "The <em>missing pair</em> on the board",
      lead: "A confident list for 24: 1, 2, 3, 4, 6 — that is all. But 8, 12 and 24 are missing; the testing stopped too early.",
      goal: "Critique an incomplete list: the method, not the guess, is the certificate.",
      pull: "8, 12 and 24 are missing — the testing stopped too early.",
      rail: { launch: "Each claim must name the test that produced it.",
        monitor: ["Checking the order was run", "Finding the skipped tests", "Flagging the early stop"],
        connect: "What would have caught the missing pairs?",
        misconception: "Accepting a list because it looks neat." } },

    { phase: "connect", title: "Numan <em>re-checks every tile</em>. Ziad <em>trusts the meeting</em>",
      lead: "Numan re-runs the whole order on every tile. Ziad runs it once and checks the meeting point. Both lists hold.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Counting Numan's re-checks", "Finding Ziad's meeting check", "Comparing the lists"],
        connect: "What does the meeting point save?",
        misconception: "Believing the first tile's method must be redone from scratch each time." } },

    { phase: "synth", title: "On the <em>board</em>: the same check, over and over",
      lead: "1×24, 2×12, 3×8, 4×6 — and the same four moves on 36, and the same on 48. The repeated check is what makes it safe.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the four moves", "Watching them repeat", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Memorising the lists instead of the method." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "A method that repeats is a pattern you can trust: same order, same tests, same stopping rule, bigger tile.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the repeated steps", "Checking the stopping rule", "Testing on a new tile"],
        connect: "What would break the pattern?",
        misconception: "Answering by guessing the list's length instead of running the method." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "How many factor pairs does 36 have?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Run the method, then count the pairs.",
        monitor: ["Testing in order", "Finding 6 × 6", "Counting five pairs"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 4 — the self-pair 6 × 6 was missed." } },

    { phase: "synth", title: "The <em>certification</em> board",
      lead: "Same order, same tests, same stopping rule — run three times, three complete lists. The certification is the repetition.",
      goal: "A repeated method, certified on three tiles.",
      pull: "The tile may grow — the method does not change.",
      rail: { launch: "Point to the three lists and name what ran the same.",
        monitor: ["Naming the repeated moves", "Checking each stopping point", "Saying the method did the work"],
        connect: "What would the certificate look like for a tile of 100?",
        misconception: "Certifying by memorising lists instead of the method." } },

    { phase: "connect", title: "The method is <em>certified</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the indivisible border tile — some counts make only one rectangular pair.",
      rail: { launch: "Ask three students to run the method on a new number.",
        monitor: ["Able to explain the stopping rule", "Still guesses the list length", "Ready for the indivisible tile"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [a, setA] = useState(1);
    const [b, setB] = useState(1);
    const [grow, setGrow] = useState(0);
    const [found, setFound] = useState(false);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The method that repeats"
            text="The pair method ran on 24. The reef tiles are growing — 36, then 48. The method must run again, the same way."
            clue="Same order, same tests, same stopping rule — bigger tile.">
            <NoticeWonder draw={makeSearch(24)} height={256} award={award}
              notices={["Some numbers are green", "1 and 24 are both green", "There are gaps", "8 is green but 7 is not"]}
              wonders={["Why those numbers?", "Is there a pattern?", "How do you know it works on a bigger tile?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The bigger tile's guess"
            text="Omar asks the certificate's question: how many factor pairs does 36 have — with the method ready to check the guess?"
            clue="A guess is fine. The method is what makes the guess checkable.">
            <LaunchEstimate draw={drawStory73} height={256} award={award}
              label="How many factor pairs does 36 have?" min={2} max={8} start={5} unit="pairs"
              after="Locked. Now let us run the method — the same four moves."
              note="The tile counts are simulated — the repeated method works on any number." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd runs the method on 24"
            text="He can test any candidate — but the method runs in order, and each hit writes its partner."
            clue="Test in order and you cannot skip one by accident.">
            <ExploreChips draw={makeSearch(a)} height={256}
              label="Test each number in order" value={a}
              onPick={(v) => setA(v)}
              chips={[{ v: 1, label: "1" }, { v: 2, label: "2" }, { v: 3, label: "3" }, { v: 4, label: "4" }, { v: 5, label: "5" }, { v: 6, label: "6" }]}
              caption={<MathEl omml={M.left} size="lg" display="block" />}
              footnote="Test in order and you cannot skip one by accident." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build" support="mariam"
            title="The same method on bigger tiles"
            text="The tiles grow — 36, then 48 — and the method runs the same way on each, the pairs closing in the same way."
            clue="The same method, every size.">
            <ExploreChips draw={makeGrow73(grow)} height={256}
              label="Run the method on each tile"
              value={grow}
              onPick={(v) => setGrow(v)}
              chips={[{ v: 0, label: "no tiles" }, { v: 1, label: "tile 24" }, { v: 2, label: "+ tile 36" }, { v: 3, label: "+ tile 48" }]}
              caption={<MathEl omml={M.reveal} size="lg" display="block" />}
              footnote="The same method, every size — the pairs close in the same way." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar pairs 36 up"
            text="Each pair written: 1×36, 2×18, 3×12, 4×9, 6×6. When a pair meets itself, the list is complete."
            clue="A pair with itself counts once.">
            
            {/* pair screen for 36 */}
            <ExploreChips draw={makePair36(b)} height={256}
              label="Pair them up" value={b}
              onPick={(v) => setB(v)}
              chips={[{ v: 1, label: "1 × 36" }, { v: 2, label: "+ 2 × 18" }, { v: 3, label: "+ 3 × 12" }, { v: 4, label: "+ 4 × 9" }, { v: 5, label: "+ 6 × 6" }]}
              caption={<MathEl omml={M.reveal} size="lg" display="block" />}
              footnote="Once the two numbers in a pair are next to each other, there are no more." />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The missing pair on the board"
            text="A confident list for 24 walks in: 1, 2, 3, 4, 6 — that is all. Omar runs the method against it — and three pairs are missing."
            clue="The method, not the guess, is the certificate.">
            <ExploreChips draw={makeMissingPair73(found, setFound)} height={252}
              label="Does the list survive the method?"
              value={found ? 1 : 0}
              onPick={(v) => setFound(v === 1)}
              chips={[{ v: 0, label: "it looks complete" }, { v: 1, label: "run the method" }]}
              caption={<MathEl omml={M.left} size="lg" display="block" />}
              footnote="8, 12 and 24 are missing — the testing stopped too early." />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one repeated method"
            text="Numan re-checks every tile from scratch. Ziad runs the method once and checks the meeting point. Both lists hold."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Numan's way — test everything", omml: M.left, h: 92, quote: "I re-run the whole order on every tile, to be safe." }}
              right={{ name: "Ziad's way — trust the meeting", omml: M.reveal, h: 92, quote: "I run the order once and check the pairs meet." }}
              same={["Both find the full list", "Both use the same four moves", "Both can re-check on demand"]}
              diff={["Numan re-runs everything", "Ziad checks the stopping point", "Ziad's check is what the method guarantees"]} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The repeated check, on the board"
            text="Zayd builds only what the class can justify: the four moves, run three times, the lists closing the same way."
            clue="The same question each time — that is what makes it safe.">
            <BoardScreen draw={drawBoard73} height={430}
              caption="The same check, over and over." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="A method that repeats is a pattern you can trust: same order, same tests, same stopping rule, bigger tile."
            clue="The repetition is the certificate.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "test 1, 2, 3 ... in order · stop when the pair repeats" }]}
              hand={"same order · same tests · same stopping rule · the tile may grow, the method does not change"}
              cards={[
                { title: "The tile we ran it on", omml: M.left, note: "24: four pairs, eight factors" },
                { title: "Tap to see the stopping rule", omml: M.reveal, revealOmml: M.right, reveal: true,
                  note: "when the pairs meet, the list is complete" }
              ]} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar counts the pairs"
            text="How many factor pairs does 36 have? Run the method — then count."
            clue="1×36, 2×18, 3×12, 4×9, 6×6.">
            <ShowWhatYouKnow award={award}
              prompt="How many factor pairs does 36 have?" omml={M.swyk}
              options={[{ v: "a", text: "4" }, { v: "b", text: "5" }, { v: "c", text: "8" }, { v: "d", text: "9" }]}
              right="b"
              support={{ yes: "Yes — 1×36, 2×18, 3×12, 4×9, 6×6: five pairs, and 6 × 6 is where the pairs meet.", notYet: "Not yet — run the method in order, then count the pairs.",
                draw: drawSupport73, h: 82, hint: "Test in order: 1, 2, 3, 4, 5, 6. Where do the pairs meet?" }} />
          </StoryShell>
        );

      case 10:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The method is certified"
            text="The method is certified on three tiles: same order, same tests, same stopping rule. The architect's next tile is stranger — it will make only one rectangular pair."
            clue="Some counts make only one rectangular pair — others make many.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "the same method, every size" }]}
              hand={"run the method · write the pairs · stop at the meeting · the tile may grow, the method does not change"}
              cards={[
                { title: "The certified method", omml: M.left, note: "24, 36 and 48 all ran the same way" },
                { title: "Tap for the next mystery", omml: M.swykAnswer, reveal: true,
                  note: "6 × 6: a pair that meets itself — some tiles will have only one" }
              ]} />
          </StoryShell>
        );

      case 11:
        return (
          <StoryHandoff support="mariam"
            title="The method is certified"
            text="Omar and Zayd sign the certification: the method ran the same way on every tile. The architect slides the next tile across the table — it will make only one rectangular pair, and that is not a flaw."
            artifact="Reef kit · certified repeated method"
            next="The indivisible border tile — some counts make only one rectangular pair; others make many.">
            <Closing game={game} omml={M.rule} action="Pick a number under 50 and write every factor pair, stopping when they meet." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
