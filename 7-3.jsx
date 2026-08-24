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

const LESSON = {
  code: "7-3",
  storageKey: "daf-g4-t7-l3",
  title: "Repeated Reasoning",
  unit: "GRADE 4 · TOPIC 7 · LESSON 7-3 · MP.8",
  math: M,
  ixl: ["URL"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Some numbers up to 24 are highlighted. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "They come in pairs, though it may not look like it yet.",
      rail: { launch: "I am not asking for a rule yet. Just look at the highlighted numbers.",
        monitor: ["Spotting the gaps between them", "Reading them aloud", "Predicting the next one"],
        connect: "Who noticed something nobody else did?",
        misconception: "Assuming the highlighted numbers are random." } },

    { phase: "launch", title: "Find <em>every</em> factor pair of 24", lead: "Not just some pairs \u2014 all of them. Estimate how many pairs there are.",
      goal: "Create the need — a list you can trust beats a list you guessed.",
      pull: "Estimate first, then we will build the list properly.",
      rail: { launch: "Do not list them yet. Just guess how many there will be.",
        monitor: ["Guessing", "Working in order", "Using division to test"],
        connect: "How will you know when you have them all?",
        misconception: "Guessing without a system and missing some." } },

    { phase: "monitor", title: "The <em>same question</em>, every time", lead: "Does 1 divide it? Does 2? Does 3? Same question, new number.",
      goal: "Repeated reasoning: one question, applied in order.", pull: "Each one you find hands you a second.",
      rail: { launch: "Predict the next one before you tap.",
        monitor: ["Working in order", "Jumping around", "Checking each one"],
        connect: "Why test in order rather than jumping about?", misconception: "Skipping 3 because it looks unlikely." } },

    { phase: "monitor", title: "Know when to <em>stop</em>", lead: "When the two numbers of a pair meet, there is nothing left to find.",
      goal: "Stopping early loses pairs; going on repeats them.", pull: "Now sort some numbers.",
      rail: { launch: "Predict the partner before you tap.",
        monitor: ["Testing carefully", "Guessing", "Explaining the test"],
        connect: "Why can you stop at 4 and 6?", misconception: "Carrying on past the meeting point and repeating pairs." } },

    { phase: "monitor", title: "Factor of 24 or <em>not</em>?", lead: "Sort each number. No grading until the class commits.",
      goal: "Apply the test to unfamiliar numbers.",
      pull: "Two students organised their search differently.",
      rail: { launch: "Test each one before you place it.",
        monitor: ["Dividing to test", "Recognising by sight", "Guessing"],
        connect: "Which was hardest to place, and why?",
        misconception: "Assuming every even number is a factor." } },

    { phase: "connect", title: "Two ways to <em>be sure</em>", lead: "Sana wrote every pair as she found it. Marwan wrote only the small number and paired up at the end. Both found four pairs.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Working in order", "Working in pairs", "Checking nothing is missed"],
        connect: "Whose method proves nothing was missed?",
        misconception: "Believing a random search is enough." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "Test in order. Write each pair. Stop when the two numbers in a pair meet.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next mark", "Naming the pattern", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Listing 4 × 6 and 6 × 4 as different pairs." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the test", "Testing on a new number", "Explaining the edge case"],
        connect: "Does every number have an even number of factors?", misconception: "Forgetting that a square number has a repeated factor." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Work in order, not at random.",
        monitor: ["Working in order", "Testing each one", "Guessing"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Missing 6 \u00d7 6 because the two numbers are the same." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: numbers that make only one rectangle.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the grid", "Ready for the next idea"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [a, setA] = useState(1);
    const [b, setB] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeSearch(24)} height={256} award={award}
          notices={["Some numbers are green", "1 and 24 are both green", "There are gaps", "8 is green but 7 is not"]} wonders={["Why those numbers?", "Is there a pattern?", "How many are there?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory73} height={256} award={award}
          label="How many factor pairs does 24 have?" min={1} max={10} start={4} unit="pairs"
          after="Locked. Now let us build the list properly."
          note="The same question asked over and over is what proves nothing is missing." />;

      case 2:
        return <ExploreChips draw={makeSearch(a)} height={256}
          label="Test each number in order" value={a}
          onPick={(v) => setA(v)}
          chips={[{ v: 1, label: "1" }, { v: 2, label: "2" }, { v: 3, label: "3" }, { v: 4, label: "4" }, { v: 5, label: "5" }, { v: 6, label: "6" }]}
          caption={<MathEl omml={M.left} size="lg" display="block" />}
          footnote="Test in order and you cannot skip one by accident." />;

      case 3:
        return <ExploreChips draw={makePairUp(b)} height={256}
          label="Pair them up" value={b}
          onPick={(v) => setB(v)}
          chips={[{ v: 1, label: "1 × 24" }, { v: 2, label: "+ 2 × 12" }, { v: 3, label: "+ 3 × 8" }, { v: 4, label: "+ 4 × 6" }]}
          caption={<MathEl omml={M.reveal} size="lg" display="block" />}
          footnote="Once the two numbers in a pair are next to each other, there are no more." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "n1", text: "6", target: "yes" }, { id: "n2", text: "7", target: "no" }, { id: "n3", text: "8", target: "yes" }, { id: "n4", text: "9", target: "no" }]} targets={[{ id: "yes", label: "a factor of 24" }, { id: "no", label: "not a factor of 24" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Sana's way — write both as you go", omml: M.left, h: 92, quote: "Every time one works I write both numbers down." }}
          right={{ name: "Marwan's way — pair up at the end", omml: M.right, h: 92, quote: "I list 1, 2, 3, 4 then work out each partner." }}
          same={["Both find four pairs", "Both test in order", "Both stop at 4 and 6"]} diff={["Sana records as she goes, Marwan at the end", "Marwan writes less", "Sana can see the pairs closing in"]} />;

      case 6:
        return <BoardScreen draw={drawBoard73} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "test 1, 2, 3 in order and stop when the pair repeats" }]}
          hand={"test in order · write both numbers of each pair · stop when they meet"}
          cards={[
            { title: "The factors of 24", omml: M.left, note: "four pairs, eight factors" },
            { title: "Tap to see a non-factor", omml: M.right, revealOmml: M.reveal, reveal: true, note: "7 does not divide 24" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="How many factor pairs does 36 have?" omml={M.swyk} options={[{ v: "a", text: "4" }, { v: "b", text: "5" }, { v: "c", text: "8" }, { v: "d", text: "9" }]} right="b"
          support={{ yes: "Yes — 42 ÷ 6 = 7 exactly, so 6 and 7 are a factor pair of 42.", notYet: "Not yet — work through it in order.",
            draw: drawSupport73, h: 82, hint: "Try 6 × 7. Does it land exactly on 42?" }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Pick a number under 50 and write every factor pair, stopping when they meet." />;

      default: return null;
    }
  }
};
