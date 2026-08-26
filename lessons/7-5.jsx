/* ===========================================================================
   Grade 4 · Topic 7 · LESSON 7-5 · Multiples
   Standard 4.OA.B.4   I can ... find the multiples of a number and tell
   multiples apart from factors.
   =========================================================================== */

const M = {
  left: om(mnor("multiples of 6: "), mt("6,12,18,24,30")),
  right: om(mnor("a factor divides it \u00b7 a multiple contains it")),
  reveal: om(mnor("the multiples go on forever")),
  rule: om(mnor("a multiple is what you get when you count in that number")),
  swyk: om(mnor("is 45 a multiple of 5?")),
  swykAnswer: om(mt("5\u00d79=45"))
};

const M6 = [6,12,18,24,30,36,42,48];
const M4 = [4,8,12,16,20,24,28,32,36,40,44,48];

const makeMultiples75 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (step === 0) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: (v, tx) => {} });
  const mult6 = [6, 12, 18, 24, 30, 36, 42, 48];
  const mult4 = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];
  const meet = [12, 24, 36, 48];
  D.numberGrid(ctx, { n: 50, cols: 10, x: 58, y: 44, w: W - 116, ch: 21,
    sets: [{ nums: mult6.slice(0, Math.ceil(mult6.length * (step >= 1 ? 1 : 0.4))), col: "#C9A227" },
           { nums: step >= 3 ? mult4 : [], col: "#2D70B3" },
           { nums: step >= 3 ? meet : [], col: "#34D399", ring: true }] });
  const notes = ["count in sixes — every landing is a multiple of 6",
                 "the gap is always 6: 6, 12, 18, 24 ...",
                 "the inspection team counts in fours — the rings are the days they meet"];
  D.txt(ctx, notes[Math.min(step, 2)], W / 2, H - 14, { size: 13.5, col: step >= 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeCount = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const isMult = n % 6 === 0;
  D.txt(ctx, String(n), W / 2, 54, { size: 38, col: "#EAF4F2", font: "marker" });
  const rows = Math.floor(n / 6), rem = n % 6;
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < 6; c++) {
      ctx.save();
      D.rr(ctx, W / 2 - 96 + c * 32, 92 + r * 22, 28, 18, 3);
      ctx.fillStyle = "#34D399"; ctx.globalAlpha = 0.7; ctx.fill();
      ctx.restore();
    }
  }
  for (var e = 0; e < rem; e++) {
    ctx.save();
    D.rr(ctx, W / 2 - 96 + e * 32, 92 + rows * 22, 28, 18, 3);
    ctx.strokeStyle = "#C74440"; ctx.lineWidth = 1.6; ctx.setLineDash([3, 3]); ctx.stroke();
    ctx.restore();
  }
  D.txt(ctx, isMult ? n + " is a multiple of 6" : n + " is not a multiple of 6",
    W / 2, H - 14, { size: 16, col: isMult ? "#34D399" : "#C74440", font: "marker" });
};

const drawBoard75 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Factor or multiple?" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 220, 400), p3 = D.at(f, 420, 590), p4 = D.at(f, 590, 750);
  D.txt(ctx, "3", W / 2 - 130, 130, { size: 40, col: "#2D70B3", font: "marker", alpha: p1 });
  D.txt(ctx, "12", W / 2 + 130, 130, { size: 40, col: "#34D399", font: "marker", alpha: p1 });
  if (p2 > 0) {
    D.txt(ctx, "divides 12", W / 2 - 130, 186, { size: 16, col: "#EAF4F2", font: "marker", alpha: p2 });
    D.txt(ctx, "contains 3", W / 2 + 130, 186, { size: 16, col: "#EAF4F2", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "smaller, fits inside", W / 2 - 130, 234, { size: 14, col: "#2D70B3", font: "marker", alpha: p3 });
    D.txt(ctx, "bigger, built from it", W / 2 + 130, 234, { size: 14, col: "#34D399", font: "marker", alpha: p3 });
    D.txt(ctx, "FACTOR", W / 2 - 130, 282, { size: 22, col: "#2D70B3", font: "marker", alpha: D.at(f, 480, 570) });
    D.txt(ctx, "MULTIPLE", W / 2 + 130, 282, { size: 22, col: "#34D399", font: "marker", alpha: D.at(f, 500, 590) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "3 is a factor of 12 \u00b7 12 is a multiple of 3 \u00b7 same fact, two words",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 630, 730) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 670, 770), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawStory75 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 350), p3 = D.at(f, 360, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "counting in sixes", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.numberGrid(ctx, { n: 50, cols: 10, x: 56, y: 44, w: W - 112, ch: 22,
    sets: [{ nums: [6,12,18,24,30,36,42,48].slice(0, Math.ceil(8 * p2)), col: "#C9A227" }] });
  if (p3 > 0) D.txt(ctx, "what would come after 48?", W / 2, H - 14,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawSupport75 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.numberGrid(ctx, { n: 45, cols: 9, x: 26, y: 8, w: W - 52, ch: 19,
    sets: [{ nums: [5,10,15,20,25,30,35,40,45], col: "#C9A227" }] });
};

const LESSON = {
  code: "7-5",
  storageKey: "daf-g4-t7-l5",
  title: "Multiples",
  unit: "GRADE 4 · TOPIC 7 · LESSON 7-5 · 4.OA.B.4",
  math: M,
  ixl: ["EFB"],

  metas: [
    { phase: "warmup", title: "When will the <em>teams meet</em>?",
      lead: "The cleaning team lands every 6 days: 6, 12, 18, 24... The inspection team lands every 4 days. On which days do they meet?",
      goal: "Notice a multiple: where you land when you count in that number.",
      pull: "The gap is always 6 — that is counting in sixes.",
      rail: { launch: "Fictional frame. Look at the marked days — no working yet.",
        monitor: ["Seeing the even marks", "Reading the constant gap", "Wonding what comes after 48"],
        connect: "What do all the marked days share?",
        misconception: "Thinking a multiple must be bigger than the number (a number is a multiple of itself)." } },

    { phase: "launch", title: "How many multiples of 6 <em>under 50</em>?",
      lead: "The maintenance calendar needs every landing day under 50. How many are there?",
      goal: "Create the need — counting in sixes, the landings are the multiples.",
      pull: "Every number you land on is a multiple of 6.",
      rail: { launch: "Give a landing-day count and say how you would prove it.",
        monitor: ["Counting in sixes", "Writing 6, 12, 18", "Estimating first"],
        connect: "What would prove your list is complete under 50?",
        misconception: "Stopping the list too early." } },

    { phase: "monitor", title: "Zayd counts in <em>sixes</em>",
      lead: "6, 12, 18, 24, 30, 36, 42, 48 — each landing is a multiple. The inspection team counts in fours; the rings are the days they meet.",
      goal: "Build a multiple list by counting in the number, and find common landings.",
      pull: "The gap is always the number itself.",
      rail: { launch: "Before each landing: what is the next one?",
        monitor: ["Adding 6 each time", "Spotting 12, 24, 36, 48 as shared", "Naming the meeting days"],
        connect: "Why do the teams meet exactly on the ringed days?",
        misconception: "Finding the meeting days by guessing instead of listing." } },

    { phase: "monitor", title: "A full last <em>row</em> means multiple",
      lead: "24 tiles in rows of 6: four full rows, no gap. 25 tiles: a gap. A full last row means it is a multiple.",
      goal: "Test a candidate for being a multiple: does it land on a full row?",
      pull: "A full last row means it is a multiple of 6.",
      rail: { launch: "Before each test: will the last row close?",
        monitor: ["Testing 24 with full rows", "Testing 30 with full rows", "Testing 42 with full rows"],
        connect: "How does this test relate to dividing?",
        misconception: "Calling a number a multiple because it is even." } },

    { phase: "monitor", title: "Factor or <em>multiple</em>?",
      lead: "Four claims from the reef crew: some name a factor, some name a multiple. Same fact, two directions.",
      goal: "Sort claims into factor and multiple — the same fact, two words.",
      pull: "A factor divides it · a multiple contains it.",
      rail: { launch: "Before each placement: which direction is the claim in?",
        monitor: ["Reading 3 for 12 as a factor", "Reading 24 for 6 as a multiple", "Comparing the directions"],
        connect: "How are the two directions of the same fact different?",
        misconception: "Sorting factor claims as multiples." } },

    { phase: "connect", title: "Samer <em>skip-counts</em>. Adel <em>multiplies</em>",
      lead: "Samer keeps adding 6 and writes down where she lands. Adel does 6 times 1, 6 times 2, 6 times 3. Both lists agree.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the skip-count", "Following the multiplications", "Comparing the lists"],
        connect: "When is multiplying faster than skip-counting?",
        misconception: "Believing only the adding method gives multiples." } },

    { phase: "synth", title: "On the <em>board</em>: factor or multiple?",
      lead: "3 divides 12 — 3 is a factor, smaller, fits inside. 12 contains 3 — 12 is a multiple, bigger, built from it. Same fact, two words.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the factor direction", "Naming the multiple direction", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Answering 'factor' when the claim is built from the number." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "A multiple is what you get when you count in that number — the landings go on forever, and the gaps never change.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the landings", "Checking the constant gap", "Testing on a new number"],
        connect: "Which numbers are multiples of every number?",
        misconception: "Forgetting that a number is a multiple of itself." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "Is 45 a multiple of 5?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Land on it or divide it.",
        monitor: ["Counting in fives", "Checking 5 × 9", "Landing on 45"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering no without landing on the number." } },

    { phase: "connect", title: "The calendar is <em>marked</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Act I ends here — the reef, the tiles, the cycles. The next door opens onto the Fraction Isles.",
      rail: { launch: "Ask three students to give a multiple list.",
        monitor: ["Able to explain the landings", "Still guesses the list", "Ready for the Fraction Isles"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [a, setA] = useState(0);
    const [b, setB] = useState(24);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="When will the teams meet?"
            text="The cleaning team lands every 6 days: 6, 12, 18, 24... The inspection team lands every 4 days. On which days do they meet?"
            clue="The gap is always 6 — that is counting in sixes.">
            <NoticeWonder draw={makeMultiples75(1)} height={256} award={award}
              notices={["They are all even", "The gap is always 6", "It starts at 6", "48 is the last one shown"]}
              wonders={["What comes next?", "Do they ever stop?", "Is 6 a multiple of itself?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The landing days, before the count"
            text="Omar asks the maintenance calendar's question: how many landing days under 50 — and what would prove the list is complete?"
            clue="Every number you land on is a multiple of 6.">
            <LaunchEstimate draw={drawStory75} height={256} award={award}
              label="How many multiples of 6 under 50?" min={2} max={20} start={8} unit="multiples"
              after="Locked. Now let us build the list properly."
              note="The calendar days are simulated — the multiple idea works on any number." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd counts in sixes"
            text="He can run the counting in stages — and when the inspection team's fours appear, the ringed days are where the teams meet."
            clue="The rings are the days both teams land.">
            <ExploreChips draw={makeMultiples75(a)} height={256}
              label="Count in sixes — and find the meetings" value={a}
              onPick={(v) => setA(v)}
              chips={[{ v: 1, label: "count in sixes" }, { v: 2, label: "see the gap" }, { v: 3, label: "the inspection team" }]}
              caption={<MathEl omml={M.left} size="lg" display="block" />}
              footnote="Every number you land on is a multiple of 6 — the rings are the shared landings." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar tests the full rows"
            text="He can test any candidate: rows of 6, and a full last row means it lands. The gap means it does not."
            clue="A full last row means it is a multiple of 6.">
            <ExploreChips draw={makeCount(b)} height={256}
              label="Test rows of six" value={b}
              onPick={(v) => setB(v)}
              chips={[{ v: 24, label: "24" }, { v: 30, label: "30" }, { v: 36, label: "36" }, { v: 42, label: "42" }]}
              caption={<MathEl omml={M.right} size="lg" display="block" />}
              footnote="A full last row means it is a multiple of 6." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Factor or multiple?"
            text="Omar and Zayd lay four claims from the reef crew on the board. Same fact, two directions — each claim names one of them."
            clue="A factor divides it · a multiple contains it.">
            <CardSort award={award} columns={2}
              items={[{ id: "p1", text: "3 for 12", target: "fac" }, { id: "p2", text: "24 for 6", target: "mul" }, { id: "p3", text: "5 for 20", target: "fac" }, { id: "p4", text: "30 for 5", target: "mul" }]}
              targets={[
                { id: "fac", label: "a factor — it divides the number" },
                { id: "mul", label: "a multiple — it contains the number" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one multiple list"
            text="Samer skip-counts by adding 6. Adel multiplies 6 by 1, 2, 3... Both lists agree."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Samer's way — skip count", omml: M.left, h: 92, quote: "I keep adding 6 and write down where I land." }}
              right={{ name: "Adel's way — multiply", omml: M.right, h: 92, quote: "I do 6 times 1, 6 times 2, 6 times 3." }}
              same={["Both give 6, 12, 18, 24", "Both start at 6", "Both could go on forever"]}
              diff={["Samer adds, Adel multiplies", "Adel can jump straight to the tenth one", "Samer's is easier to say out loud"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The two directions, on the board"
            text="Zayd builds only what the class can justify: 3 fits inside 12, and 12 is built from 3 — the same fact, read two ways."
            clue="3 is a factor of 12 · 12 is a multiple of 3 · same fact, two words.">
            <BoardScreen draw={drawBoard75} height={430}
              caption="Same fact, two words." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="A multiple is what you get when you count in that number — the landings go on forever, and the gaps never change."
            clue="The landings never stop.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "a multiple is what you get when you count in that number" }]}
              hand={"count in the number · every landing is a multiple · the gap is always the number itself"}
              cards={[
                { title: "The multiples we made", omml: M.left, note: "6, 12, 18, 24 — counting in sixes" },
                { title: "Tap for the direction", omml: M.right, revealOmml: M.reveal, reveal: true,
                  note: "a factor divides in; a multiple comes out of counting" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar lands on the test"
            text="Is 45 a multiple of 5? Land on it — or divide it."
            clue="Count in fives: do you land on 45?">
            <ShowWhatYouKnow award={award}
              prompt="Is 45 a multiple of 5?" omml={M.swyk}
              options={[{ v: "a", text: "no" }, { v: "b", text: "yes" }, { v: "c", text: "only if you round" }, { v: "d", text: "cannot tell" }]}
              right="b"
              support={{ yes: "Yes — count in fives: 5, 10, 15, 20, 25, 30, 35, 40, 45. We land on it (5 × 9 = 45).", notYet: "Not yet — land on the number or divide it.",
                draw: drawSupport75, h: 82, hint: "Count in fives: 5, 10, 15 ... do you land on 45?" }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff support="zafir"
            title="The calendar is marked"
            text="Omar signs the maintenance calendar: every landing day marked, every meeting ringed. Act I closes here — the number, the provision, the systems. The next door opens onto the Fraction Isles, where two names can mean the same share."
            artifact="Reef kit · certified multiple calendar"
            next="Two gardens, one water share — two different-looking shares that may cover the same part.">
            <Closing game={game} omml={M.rule} action="Count in sevens at home and write down the first ten multiples." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
