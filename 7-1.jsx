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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Twelve tiles, arranged three different ways. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Every arrangement uses all twelve tiles.",
      rail: { launch: "I am not asking how many arrangements. Just look.",
        monitor: ["Counting the tiles in one rectangle", "Noticing all three have 12", "Reading the labels"],
        connect: "Who noticed something nobody else did?",
        misconception: "Thinking the rectangles hold different numbers of tiles." } },

    { phase: "launch", title: "How many <em>rectangles</em> from twelve tiles?",
      lead: "Every tile must be used, and the rectangle must be full. Estimate first.",
      goal: "Create the need — arrangements and factors are the same thing.",
      pull: "Each rectangle is going to give you two numbers.",
      rail: { launch: "Try to make one on your desk. Then another.",
        monitor: ["Finding 3 x 4", "Finding 2 x 6", "Forgetting 1 x 12"],
        connect: "Does a single row of 12 count as a rectangle?",
        misconception: "Counting 3 x 4 and 4 x 3 as different rectangles." } },

    { phase: "monitor", title: "Reveal each <em>rectangle</em>",
      lead: "One at a time. Read the two numbers off the sides.",
      goal: "A factor pair is the two side lengths of a rectangle.",
      pull: "What about a number that will not make a rectangle?",
      rail: { launch: "Predict the next rectangle before you tap.",
        monitor: ["Finding all three", "Missing 1 x 12", "Naming the pairs"],
        connect: "How do you know you have found them all?",
        misconception: "Stopping before 1 x 12." } },

    { phase: "monitor", title: "Test a number — <em>factor or not</em>?",
      lead: "Try to build rows of 5. Watch the last row.",
      goal: "A non-factor leaves gaps — that is what a remainder looks like.",
      pull: "Now list every factor of 12.",
      rail: { launch: "Predict whether the rectangle will come out full.",
        monitor: ["Spotting the gaps", "Counting the leftovers", "Dividing to check"],
        connect: "What do the gaps tell you about 12 ÷ 5?",
        misconception: "Calling 5 a factor because 12 tiles can be arranged near enough." } },

    { phase: "monitor", title: "Factor or <em>not</em>?",
      lead: "Sort each number. No grading until the class commits.",
      goal: "Apply the test to unfamiliar numbers.",
      pull: "Two students listed the factors differently.",
      rail: { launch: "Ask: does it divide 12 with nothing left?",
        monitor: ["Dividing to test", "Building rectangles", "Guessing"],
        connect: "Which was hardest to decide, and why?",
        misconception: "Assuming any smaller number is a factor." } },

    { phase: "connect", title: "Two ways to <em>find them all</em>",
      lead: "Yara built rectangles. Fahad divided 12 by 1, 2, 3 in order. Both found six factors.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Building shapes", "Dividing in order", "Pairing them up"],
        connect: "Whose method proves nothing was missed?",
        misconception: "Believing a random search finds them all." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Each rectangle gives two factors. Collect them and you have the whole list.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next rectangle", "Reading both sides", "Restating it in their own words"],
        connect: "Who can say what a factor is in one sentence?",
        misconception: "Listing a factor twice from the same rectangle." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the no-remainder test", "Testing on a new number", "Pairing factors up"],
        connect: "Does every number have 1 and itself as factors?",
        misconception: "Forgetting 1 and the number itself." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. List them in order, smallest first.",
        monitor: ["Working in order", "Pairing them", "Missing 16 itself"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Listing 1, 2, 4, 8 and forgetting 16." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: finding factors without drawing anything.",
      rail: { launch: "Ask three students to say what a factor is.",
        monitor: ["Able to explain it to someone else", "Still needs the tiles", "Ready to work in pairs"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [active, setActive] = useState(0);
    const [n, setN] = useState(3);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeRects(2)} height={256} award={award}
          notices={["They all use 12 tiles", "The shapes are different", "One is a single row", "The sides are labelled"]}
          wonders={["How many rectangles are there?", "Why those numbers?", "Would 5 work?"]} />;

      case 1:
        return <LaunchEstimate draw={drawTiles71} height={256} award={award}
          label="How many different rectangles from 12 tiles?" min={1} max={8} start={3} unit="rectangles"
          after="Locked. Now let us build them one at a time."
          note="Turning a rectangle sideways does not make a new one." />;

      case 2:
        return <ExploreChips draw={makeRects(active)} height={256}
          label="Reveal each rectangle"
          value={active}
          onPick={(v) => setActive(v)}
          chips={PAIRS12.map((p, k) => ({ v: k, label: p[0] + " × " + p[1] }))}
          caption={<MathEl omml={active === 0 ? M.pair1 : active === 1 ? M.pair2 : M.pair3} size="xl" display="block" />}
          footnote="Each rectangle hands you two factors at once." />;

      case 3:
        return <ExploreChips draw={makeTest(n)} height={256}
          label="Try rows of ..."
          value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 3, label: "3" }, { v: 4, label: "4" }, { v: 5, label: "5" }, { v: 6, label: "6" }]}
          caption={<MathEl omml={12 % n === 0 ? M.all : M.notFactor} size="lg" display="block" />}
          footnote="A gap in the last row means it is not a factor." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "f1", text: "3", target: "yes" }, { id: "f2", text: "5", target: "no" },
            { id: "f3", text: "6", target: "yes" }, { id: "f4", text: "8", target: "no" }
          ]}
          targets={[
            { id: "yes", label: "a factor of 12" },
            { id: "no", label: "not a factor of 12" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Yara's way — build rectangles", omml: M.pair3, h: 92,
                  quote: "Every rectangle I can build gives me two factors." }}
          right={{ name: "Fahad's way — divide in order", omml: M.all, h: 92,
                   quote: "I tried 1, then 2, then 3, and wrote down what worked." }}
          same={["Both find 1, 2, 3, 4, 6 and 12", "Both use the no-remainder test", "Both pair the factors up"]}
          diff={["Yara draws, Fahad divides", "Fahad's order proves none are missed",
                 "Yara can see why they come in pairs"]} />;

      case 6:
        return <BoardScreen draw={drawBoard71} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "a factor divides the number with nothing left over" }]}
          hand={"build every full rectangle \u00b7 read both sides \u00b7 that is the factor list"}
          cards={[
            { title: "The factors we found", omml: M.all, note: "three rectangles, six factors" },
            { title: "Tap to see a non-factor", omml: M.pair2, revealOmml: M.notFactor, reveal: true,
              note: "5 leaves gaps in the rectangle" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Which list gives every factor of 16?"
          omml={M.swyk}
          options={[{ v: "a", text: "1,2,4,8" }, { v: "b", text: "1,2,4,8,16" }, { v: "c", text: "2,4,8" }, { v: "d", text: "1,2,3,4,8,16" }]}
          right="b"
          support={{
            yes: "Yes — 1×16, 2×8 and 4×4. The 4 only counts once.",
            notYet: "Not yet — check the very smallest and the very largest.",
            draw: drawSupport71, h: 82,
            hint: "Every number has 1 and itself as factors."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a number of things at home and arrange them into every rectangle you can." />;

      default: return null;
    }
  }
};
