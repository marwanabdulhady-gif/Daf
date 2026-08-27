/* ===========================================================================
   Grade 4 · Topic 7 · LESSON 7-2 · Factors
   Standard 4.OA.B.4   I can ... find the factors of a number by testing 1, 2,
   3 and so on in order.
   =========================================================================== */

const M = {
  left: om(mnor("factors of 24: "), mt("1,2,3,4,6,8,12,24")),
  right: om(mt("24\u00f77"), mnor(" leaves a remainder")),
  reveal: om(mnor("stop when the pairs meet")),
  rule: om(mnor("test 1, 2, 3 ... in order \u00b7 stop when the pair repeats")),
  swyk: om(mnor("is 6 a factor of 42?")),
  swykAnswer: om(mt("42\u00f76=7"))
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

const drawBoard72 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Test in order, collect in pairs" });
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
    D.txt(ctx, "when the two numbers in a pair meet, you have them all",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 630, 730) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 670, 770), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawStory72 = (ctx, W, H, frame) => {
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

const drawSupport72 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.numberGrid(ctx, { n: 42, cols: 7, x: 26, y: 8, w: W - 52, ch: 19,
    sets: [{ nums: [1,2,3,6,7,14,21,42], col: "#34D399" }] });
};

const LESSON = {
  code: "7-2",
  storageKey: "daf-g4-t7-l2",
  title: "Factors",
  unit: "GRADE 4 · TOPIC 7 · LESSON 7-2 · 4.OA.B.4",
  math: M,
  ixl: ["PWS", "U9N"],

  metas: [
    { phase: "warmup", title: "The grid that <em>lights up</em>",
      lead: "On the reef grid, some numbers light up when tested against 24 — 1 and 24, 2 and 12, 3 and 8. 7 stays dark.",
      goal: "Notice factors light up in pairs, and the testing can stop.",
      pull: "How do you know you have found them all?",
      rail: { launch: "Fictional frame. Look at the lit numbers — no working yet.",
        monitor: ["Seeing the pairs", "Noticing the gaps", "Wondering when to stop"],
        connect: "What do the lit numbers share?",
        misconception: "Testing numbers at random, in no order." } },

    { phase: "launch", title: "How many factors does <em>24 have</em>?",
      lead: "The architect's certificate: every factor pair of 24, none missing. Lock your guess first.",
      goal: "Create the need — a guess is fine; a method is what stops you missing one.",
      pull: "A guess is fine. A method is what stops you missing one.",
      rail: { launch: "Give a factor count and say how you would prove it.",
        monitor: ["Guessing 8", "Planning the order", "Asking about the stopping point"],
        connect: "What would prove your count is complete?",
        misconception: "Calling the list done after the first two pairs." } },

    { phase: "monitor", title: "Zayd tests <em>in order</em>",
      lead: "1, 2, 3, 4, 5, 6 — tested in order, each hit writes down a partner. Testing in order cannot skip one by accident.",
      goal: "Test candidates in order; each factor found writes its partner.",
      pull: "Test in order and you cannot skip one by accident.",
      rail: { launch: "Before each test: what partner would a hit give?",
        monitor: ["Testing 1 and 24", "Testing 2 and 12", "Writing the partners"],
        connect: "Why does the order protect the list?",
        misconception: "Testing only the 'nice' numbers." } },

    { phase: "monitor", title: "Pair them up — and <em>stop when they meet</em>",
      lead: "1×24, 2×12, 3×8, 4×6. When the two numbers in a pair are next to each other, there are no more.",
      goal: "Stop the search when the pairs meet in the middle.",
      pull: "Once the two numbers in a pair are next to each other, there are no more.",
      rail: { launch: "Before each pair: have the pairs met yet?",
        monitor: ["Pairing 1 with 24", "Pairing 3 with 8", "Stopping at 4 and 6"],
        connect: "Why do the pairs closing in prove completeness?",
        misconception: "Testing past the meeting point and double-counting." } },

    { phase: "monitor", title: "Factor of <em>24</em> or not?",
      lead: "Four candidates from the reef crew. Each one must pass the no-remainder test.",
      goal: "Sort candidates into factors and non-factors of 24.",
      pull: "Divides with nothing left over — that is the test.",
      rail: { launch: "Before each placement: what is the remainder?",
        monitor: ["Testing 6 with no remainder", "Testing 7 with a remainder", "Naming 8 and its partner"],
        connect: "What does the remainder tell you?",
        misconception: "Sorting by how the number looks instead of the test." } },

    { phase: "connect", title: "Numan <em>tests everything</em>. Ziad <em>stops at the meeting</em>",
      lead: "Numan checks all 24 numbers to be safe. Ziad stops at 4 and 6, because they met. Both find eight factors.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Counting Numan's tests", "Finding Ziad's stopping point", "Comparing the lists"],
        connect: "What does Ziad know that saves him nineteen tests?",
        misconception: "Believing stopping early is always careless." } },

    { phase: "synth", title: "On the <em>board</em>: test in order, stop at the meeting",
      lead: "Test 1, 2, 3... in order. Write both numbers of each pair. Stop when they meet: four pairs, eight factors.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Testing in order", "Writing the pairs", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Stopping at the first pair instead of the meeting point." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "The pairs close in like the reef tide: when they meet, the middle is found and the list is complete.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the meeting point", "Counting the pairs", "Testing on a new number"],
        connect: "Where do the pairs meet for 36?",
        misconception: "Answering with the pairs' smaller numbers only." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "Is 6 a factor of 42?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Run the test, then name the partner.",
        monitor: ["Dividing 42 by 6", "Finding the partner 7", "Checking the remainder"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 'no' without running the test." } },

    { phase: "connect", title: "The certificate is <em>half signed</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the same method, bigger tiles — does it survive?",
      rail: { launch: "Ask three students to give a full pair list.",
        monitor: ["Able to explain the stopping point", "Still tests randomly", "Ready for bigger tiles"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [a, setA] = useState(1);
    const [b, setB] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell opener lane="fiction" character="lantern"
            title="Pairy has hidden some partners on the reef grid"
            text="Pairy has hidden some partners on the reef grid. Test the numbers in order and find every pair for 24."
            clue="Find every pair. Stop only when the partners meet.">
            <NoticeWonder draw={makeSearch(24)} height={256} award={award}
              notices={["Some numbers are green", "1 and 24 are both green", "There are gaps", "8 is green but 7 is not"]}
              wonders={["Why those numbers?", "Is there a pattern?", "How many are there?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The architect's certificate"
            text="Omar reads the certificate's demand: every factor pair of 24, none missing. Lock your guess before the method runs."
            clue="A guess is fine. A method is what stops you missing one.">
            <LaunchEstimate draw={drawStory72} height={256} award={award}
              label="How many factors does 24 have?" min={2} max={16} start={8} unit="factors"
              after="Locked. Now let us build the list properly."
              note="The tile counts are simulated — the pair method works on any number." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd tests in order"
            text="He can test any candidate — but the method runs in order, and each hit writes down its partner."
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
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar pairs them up"
            text="Each pair written: 1×24, 2×12, 3×8, 4×6. When the pairs meet, the search stops."
            clue="Once the two numbers in a pair are next to each other, there are no more.">
            <ExploreChips draw={makePairUp(b)} height={256}
              label="Pair them up" value={b}
              onPick={(v) => setB(v)}
              chips={[{ v: 1, label: "1 × 24" }, { v: 2, label: "+ 2 × 12" }, { v: 3, label: "+ 3 × 8" }, { v: 4, label: "+ 4 × 6" }]}
              caption={<MathEl omml={M.reveal} size="lg" display="block" />}
              footnote="Once the two numbers in a pair are next to each other, there are no more." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Factor of 24 or not?"
            text="Omar and Zayd lay four candidates on the reef board. Each one must pass the no-remainder test."
            clue="Divides with nothing left over — that is the test.">
            <CardSort award={award} columns={2}
              items={[{ id: "n1", text: "6", target: "yes" }, { id: "n2", text: "7", target: "no" }, { id: "n3", text: "8", target: "yes" }, { id: "n4", text: "9", target: "no" }]}
              targets={[{ id: "yes", label: "a factor of 24" }, { id: "no", label: "not a factor of 24" }]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one list"
            text="Numan tests all 24 numbers to be safe. Ziad stops when the pairs meet. Both lists hold eight factors."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Numan's way — test everything", omml: M.left, h: 92, quote: "I checked all 24 numbers to be safe." }}
              right={{ name: "Ziad's way — stop at the meeting", omml: M.right, h: 92, quote: "I stopped at 4 and 6 because they met." }}
              same={["Both find eight factors", "Both test in order", "Both use the no-remainder test"]}
              diff={["Numan does 24 tests, Ziad does 6", "Ziad needs to know when to stop", "Numan is slower but never doubts it"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The pair method is drawn, not declared"
            text="Zayd builds only what the class can justify: the order, the pairs, the meeting point."
            clue="Test in order · stop when the pair repeats.">
            <BoardScreen draw={drawBoard72} height={430}
              caption="Test in order · stop when the pair repeats." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The pairs close in like the reef tide: when they meet, the middle is found and the list is complete."
            clue="The meeting point is the certificate.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "test 1, 2, 3 in order and stop when the pair repeats" }]}
              hand={"test in order · write both numbers of each pair · stop when they meet"}
              cards={[
                { title: "The factors of 24", omml: M.left, note: "four pairs, eight factors" },
                { title: "Tap to see a non-factor", omml: M.right, revealOmml: M.reveal, reveal: true, note: "7 does not divide 24" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar runs the test"
            text="Is 6 a factor of 42? Run the test — then name the partner."
            clue="42 ÷ 6 = 7 exactly.">
            <ShowWhatYouKnow award={award}
              prompt="Is 6 a factor of 42?" omml={M.swyk}
              options={[{ v: "a", text: "no" }, { v: "b", text: "yes" }, { v: "c", text: "only if you round" }, { v: "d", text: "cannot tell" }]}
              right="b"
              support={{ yes: "Yes — 42 ÷ 6 = 7 exactly, so 6 and 7 are a factor pair of 42.", notYet: "Not yet — work through it in order.",
                draw: drawSupport72, h: 82, hint: "Try 6 × 7. Does it land exactly on 42?" }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The certificate is half signed"
            text="Omar signs the pair list: eight factors, none missing. The architect turns to the bigger tiles — the same method must survive when the rectangles grow."
            artifact="Reef kit · certified factor pairs"
            next="The rectangle pattern repeats — the same method, bigger tiles.">
            <Closing game={game} omml={M.rule} action="Pick any number under 50 at home and list all its factors in order." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
