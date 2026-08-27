/* ===========================================================================
   Grade 4 · Topic 7 · LESSON 7-4 · Prime and Composite Numbers
   Standard 4.OA.B.4   I can ... tell whether a number is prime or composite
   by how many factors it has.
   =========================================================================== */

const M = {
  left: om(mnor("prime: exactly "), mt("2"), mnor(" factors")),
  right: om(mnor("composite: more than "), mt("2"), mnor(" factors")),
  reveal: om(mnor("1 is neither \u2014 it has only one factor")),
  rule: om(mnor("count the factors \u00b7 exactly two means prime")),
  swyk: om(mnor("is 21 prime or composite?")),
  swykAnswer: om(mt("3\u00d77=21"))
};

const PRIMES = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47];

const makeSieve = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const marks = [];
  const base = [2, 3, 5];
  for (var i = 0; i < step && i < base.length; i++) {
    for (var m = base[i] * 2; m <= 50; m += base[i]) marks.push(m);
  }
  D.numberGrid(ctx, { n: 50, cols: 10, x: 58, y: 44, w: W - 116, ch: 21,
    sets: [{ nums: marks, col: "#C74440" },
           { nums: step >= 3 ? PRIMES.filter(function (p) { return p <= 50; }) : [], col: "#34D399" },
           { nums: [1], col: "#C9A227", ring: true }] });
  const notes = ["nothing crossed out yet", "multiples of 2 crossed out",
                 "multiples of 3 as well", "what survives is prime"];
  D.txt(ctx, notes[step], W / 2, H - 14,
    { size: 13.5, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeCount = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const facs = [];
  for (var k = 1; k <= n; k++) if (n % k === 0) facs.push(k);
  const prime = facs.length === 2;
  D.txt(ctx, String(n), W / 2, 56, { size: 40, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "factors: " + facs.join(", "), W / 2, 106,
    { size: 17, col: "#C9A227", font: "marker" });
  const pairs = [];
  for (var q = 0; q < facs.length; q++) if (facs[q] * facs[q] <= n) pairs.push([facs[q], n / facs[q]]);
  D.factorRects(ctx, { n: n, pairs: pairs, active: pairs.length - 1,
    x: 40, y: 130, w: W - 80, h: 70, cell: 7 });
  D.txt(ctx, facs.length + " factors \u2014 " + (prime ? "prime" : n === 1 ? "neither" : "composite"),
    W / 2, H - 14, { size: 16, col: prime ? "#34D399" : n === 1 ? "#C9A227" : "#FA7E19", font: "marker" });
};

const drawBoard74 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "How many factors does it have?" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 220, 400), p3 = D.at(f, 420, 590), p4 = D.at(f, 590, 740);
  D.txt(ctx, "7", W / 2 - 130, 130, { size: 40, col: "#34D399", font: "marker", alpha: p1 });
  D.txt(ctx, "12", W / 2 + 130, 130, { size: 40, col: "#FA7E19", font: "marker", alpha: p1 });
  if (p2 > 0) {
    D.txt(ctx, "1, 7", W / 2 - 130, 186, { size: 18, col: "#EAF4F2", font: "marker", alpha: p2 });
    D.txt(ctx, "1, 2, 3, 4, 6, 12", W / 2 + 130, 186, { size: 18, col: "#EAF4F2", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "exactly 2 factors", W / 2 - 130, 234, { size: 15, col: "#34D399", font: "marker", alpha: p3 });
    D.txt(ctx, "more than 2 factors", W / 2 + 130, 234, { size: 15, col: "#FA7E19", font: "marker", alpha: p3 });
    D.txt(ctx, "PRIME", W / 2 - 130, 282, { size: 22, col: "#34D399", font: "marker", alpha: D.at(f, 480, 570) });
    D.txt(ctx, "COMPOSITE", W / 2 + 130, 282, { size: 22, col: "#FA7E19", font: "marker", alpha: D.at(f, 500, 590) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "1 is neither \u2014 it has only one factor, itself",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 630, 730) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 670, 770), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawStory74 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 350), p3 = D.at(f, 360, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "numbers to fifty", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.numberGrid(ctx, { n: 50, cols: 10, x: 56, y: 44, w: W - 112, ch: 22,
    sets: [{ nums: [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47].slice(0, Math.ceil([2,3,5,7,11,13,17,19,23,29,31,37,41,43,47].length * p2)), col: "#34D399" }] });
  if (p3 > 0) D.txt(ctx, "what do the green numbers have in common?", W / 2, H - 14,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawSupport74 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.numberGrid(ctx, { n: 21, cols: 7, x: 26, y: 8, w: W - 52, ch: 19,
    sets: [{ nums: [1,3,7,21], col: "#34D399" }] });
};

const LESSON = {
  code: "7-4",
  storageKey: "daf-g4-t7-l4",
  title: "Prime and Composite Numbers",
  unit: "GRADE 4 · TOPIC 7 · LESSON 7-4 · 4.OA.B.4",
  math: M,
  ixl: ["L9R"],

  metas: [
    { phase: "warmup", title: "The <em>indivisible</em> border tile",
      lead: "7 tiles make only 1 × 7 — one rectangular pair. Most tiles make several; some make exactly one. And 1 makes none.",
      goal: "Notice a number that cannot be split into a rectangular pair: exactly two factors.",
      pull: "7 tiles make only 1 × 7. That is the whole idea.",
      rail: { launch: "Fictional frame. Look at the lit numbers — no working yet.",
        monitor: ["Seeing 2 lit", "Noticing the even numbers dark", "Wondering why 1 is special"],
        connect: "What is different about the numbers that stay lit?",
        misconception: "Thinking a single pair means the tile is broken." } },

    { phase: "launch", title: "How many such numbers <em>under 50</em>?",
      lead: "The border tile must be cast in every count that makes only one rectangular pair. How many are there under 50?",
      goal: "Create the need — count the numbers with exactly two factors.",
      pull: "Exactly two factors: 1 and itself.",
      rail: { launch: "Give a count and say how you would prove each one.",
        monitor: ["Testing 2, 3, 5", "Checking the factor lists", "Estimating first"],
        connect: "What would prove a number makes only one pair?",
        misconception: "Answering by feel instead of by factor lists." } },

    { phase: "monitor", title: "Zayd crosses out the <em>multiples</em>",
      lead: "Cross out the multiples of 2, then 3, then 5 — whatever survives has no factor but 1 and itself.",
      goal: "Use crossing out multiples to find the exactly-two-factor numbers.",
      pull: "Anything crossed out has a factor other than 1 and itself.",
      rail: { launch: "Before each round: which numbers die this time?",
        monitor: ["Crossing the even numbers", "Crossing the 3-multiples", "Watching the survivors"],
        connect: "Why does crossing out prove composite?",
        misconception: "Crossing out the number itself along with its multiples." } },

    { phase: "monitor", title: "Count the factors of <em>7, 12, 13, 1</em>",
      lead: "7 has exactly two factors. 12 has six. 13 has two. And 1 has only one — neither prime nor composite.",
      goal: "Count factors: exactly two means prime, more means composite, one means neither.",
      pull: "Exactly two factors means prime. More than two means composite.",
      rail: { launch: "Before each count: what do you expect?",
        monitor: ["Counting 7's two factors", "Counting 12's six", "Naming 1's single factor"],
        connect: "Why is 1 special?",
        misconception: "Calling 1 prime because it is small." } },

    { phase: "monitor", title: "Prime or <em>composite</em>?",
      lead: "Four tiles from the reef crew. Each one must show its factor count before it is named.",
      goal: "Sort numbers into prime and composite by factor count.",
      pull: "The factor count decides the name.",
      rail: { launch: "Before each placement: what is the factor count?",
        monitor: ["Counting 13's factors", "Counting 15's three", "Counting 27's four"],
        connect: "Which count earns which name?",
        misconception: "Sorting by odd/even instead of by factor count." } },

    { phase: "connect", title: "Hadeel <em>crosses out</em>. Bassel <em>counts factors</em>",
      lead: "Hadeel crosses out multiples across the whole grid. Bassel lists each number's factors and counts. Both agree which are prime.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Following the crossing-out", "Following the factor counts", "Checking both lists agree"],
        connect: "When is crossing-out faster than counting?",
        misconception: "Believing one method is the only valid one." } },

    { phase: "synth", title: "On the <em>board</em>: count the factors",
      lead: "List the factors. Count them. Two means prime, more means composite, one means neither.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Listing the factors", "Counting them", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Naming by the number's appearance instead of its factors." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "The border tile is indivisible because its only partners are 1 and itself — the strongest border there is.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the two-factor rule", "Checking 1's case", "Testing on a new number"],
        connect: "Why does 'exactly two' make the border strong?",
        misconception: "Answering 'prime' for 1 or for 9." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "Is 21 prime or composite?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. List the factors, then name it.",
        monitor: ["Testing 3 into 21", "Finding 3 × 7", "Naming it composite"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering prime because 21 is odd." } },

    { phase: "connect", title: "The border tile is <em>cast</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the tiles that keep landing on the same marks — multiples.",
      rail: { launch: "Ask three students to prove a number's name.",
        monitor: ["Able to explain the factor count", "Still guesses by appearance", "Ready for multiples"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [a, setA] = useState(0);
    const [b, setB] = useState(7);

    switch (i) {
      case 0:
        return (
          <StoryShell opener lane="fiction" character="lantern"
            title="Some tiles make many rectangles"
            text="Some tiles make many rectangles. Some make only one. Help the builders name the special tiles prime, composite, or neither."
            clue="A prime number has exactly two factors.">
            <NoticeWonder draw={makeSieve(3)} height={256} award={award}
              notices={["2 is green", "Most even numbers are not", "The gaps get bigger", "1 is not green"]}
              wonders={["Why those numbers?", "Is 1 special?", "Do they ever stop?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The border tile's count"
            text="Omar asks the architect's question: how many counts under 50 make only one rectangular pair — and what proves each one?"
            clue="Exactly two factors: 1 and itself.">
            <LaunchEstimate draw={drawStory74} height={256} award={award}
              label="How many such numbers under 50?" min={5} max={30} start={15} unit="numbers"
              after="Locked. Now let us build the list properly."
              note="The tile counts are simulated — the factor rule works on any number." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd crosses out the multiples"
            text="He can run each crossing-out round — the class must say which numbers die, and why dying means composite."
            clue="Anything crossed out has a factor other than 1 and itself.">
            <ExploreChips draw={makeSieve(a)} height={256}
              label="Cross out the multiples" value={a}
              onPick={(v) => setA(v)}
              chips={[{ v: 0, label: "start" }, { v: 1, label: "× 2" }, { v: 2, label: "× 3" }, { v: 3, label: "× 5" }]}
              caption={<MathEl omml={M.left} size="lg" display="block" />}
              footnote="Anything crossed out has a factor other than 1 and itself." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar counts the factors"
            text="He can count any number's factors — the class must say what the count earns: prime, composite, or neither."
            clue="Exactly two means prime. More means composite. One means neither.">
            <ExploreChips draw={makeCount(b)} height={256}
              label="Count the factors of ..." value={b}
              onPick={(v) => setB(v)}
              chips={[{ v: 7, label: "7" }, { v: 12, label: "12" }, { v: 13, label: "13" }, { v: 1, label: "1" }]}
              caption={<MathEl omml={M.right} size="lg" display="block" />}
              footnote="Exactly two factors means prime. More than two means composite." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Prime or composite?"
            text="Omar and Zayd lay four reef tiles on the board. Each one must show its factor count before it is named."
            clue="The factor count decides the name.">
            <CardSort award={award} columns={2}
              items={[{ id: "p1", text: "13", target: "prime" }, { id: "p2", text: "15", target: "comp" }, { id: "p3", text: "23", target: "prime" }, { id: "p4", text: "27", target: "comp" }]}
              targets={[{ id: "prime", label: "prime — exactly two factors" }, { id: "comp", label: "composite — more than two" }]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one prime list"
            text="Hadeel crosses out multiples across the grid. Bassel counts each number's factors. Both lists agree."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Hadeel's way — cross out multiples", omml: M.left, h: 92, quote: "If it is a multiple of something, it is composite." }}
              right={{ name: "Bassel's way — count factors", omml: M.right, h: 92, quote: "I list the factors and count them." }}
              same={["Both agree which are prime", "Both use factors", "Both treat 1 as special"]}
              diff={["Hadeel works on many numbers at once", "Bassel checks one number deeply", "Hadeel's is faster for a whole grid"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The factor count is drawn, not declared"
            text="Zayd builds only what the class can justify: the lists, the counts, the names."
            clue="Count the factors · exactly two means prime.">
            <BoardScreen draw={drawBoard74} height={430}
              caption="Count the factors · exactly two means prime." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The border tile is indivisible because its only partners are 1 and itself — the strongest border there is."
            clue="Two factors is the whole certificate.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "count the factors · exactly two means prime" }]}
              hand={"list the factors · count them · two means prime, more means composite, one means neither"}
              cards={[
                { title: "Prime", omml: M.left, note: "exactly two factors: 1 and itself" },
                { title: "Tap for the special case", omml: M.right, revealOmml: M.reveal, reveal: true, note: "1 has only one factor" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar names the tile"
            text="Is 21 prime or composite? List the factors — then name it."
            clue="Odd does not mean prime. Try 3.">
            <ShowWhatYouKnow award={award}
              prompt="Is 21 prime or composite?" omml={M.swyk}
              options={[{ v: "a", text: "prime" }, { v: "b", text: "composite" }, { v: "c", text: "neither" }, { v: "d", text: "both" }]}
              right="b"
              support={{ yes: "Yes — 3 × 7 = 21, so it has four factors: 1, 3, 7 and 21.", notYet: "Not yet — work through it in order.",
                draw: drawSupport74, h: 82, hint: "21 is odd, but odd does not mean prime. Try dividing by 3." }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The border tile is cast"
            text="Omar signs the prime list: every count under 50 named by its factor count. The architect's next schedule is stranger — the tiles keep landing on the same marks, again and again."
            artifact="Reef kit · certified prime border"
            next="When will the teams meet? — cleaning and inspection cycles overlap on particular days.">
            <Closing game={game} omml={M.rule} action="Pick a number between 20 and 40 at home and prove whether it is prime." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
