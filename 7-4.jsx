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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A grid of numbers with some picked out in green. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "Every green number resists being split.",
      rail: { launch: "I am not asking for a rule yet. Just look at the highlighted numbers.",
        monitor: ["Spotting the gaps between them", "Reading them aloud", "Predicting the next one"],
        connect: "Who noticed something nobody else did?",
        misconception: "Looking for an arithmetic pattern in the gaps." } },

    { phase: "launch", title: "Numbers that <em>will not split</em>", lead: "Some numbers make only one rectangle. Estimate how many there are under 50.",
      goal: "Create the need — a list you can trust beats a list you guessed.",
      pull: "Estimate first, then we will build the list properly.",
      rail: { launch: "Try to make two different rectangles from 7 tiles. What happens?",
        monitor: ["Guessing", "Working in order", "Using division to test"],
        connect: "How will you know when you have them all?",
        misconception: "Believing every number can be split into equal groups." } },

    { phase: "monitor", title: "Cross out the <em>multiples</em>", lead: "Every multiple of 2, then of 3, then of 5. Watch what survives.",
      goal: "A composite number is a multiple of something smaller.", pull: "Now count factors directly.",
      rail: { launch: "Predict the next one before you tap.",
        monitor: ["Working in order", "Jumping around", "Checking each one"],
        connect: "Why is 2 itself not crossed out?", misconception: "Crossing out 2 along with the other even numbers." } },

    { phase: "monitor", title: "Count the <em>factors</em>", lead: "Two factors means prime. More means composite.",
      goal: "The definition is a count, not a feeling.", pull: "Now sort some numbers.",
      rail: { launch: "Predict the number of factors before you tap.",
        monitor: ["Testing carefully", "Guessing", "Explaining the test"],
        connect: "What is special about 1?", misconception: "Calling 1 prime." } },

    { phase: "monitor", title: "Prime or <em>composite</em>?", lead: "Sort each number. No grading until the class commits.",
      goal: "Apply the test to unfamiliar numbers.",
      pull: "Two students organised their search differently.",
      rail: { launch: "Test each one before you place it.",
        monitor: ["Dividing to test", "Recognising by sight", "Guessing"],
        connect: "Which was hardest to place, and why?",
        misconception: "Assuming all odd numbers are prime." } },

    { phase: "connect", title: "Two ways to <em>be sure</em>", lead: "Rima crossed out multiples. Bassel counted factors one number at a time. Both agree on the primes.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Working in order", "Working in pairs", "Checking nothing is missed"],
        connect: "Whose method proves nothing was missed?",
        misconception: "Believing a random search is enough." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "Seven has two factors. Twelve has six. Count them and the label follows.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next mark", "Naming the pattern", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Calling a number prime because it looks awkward." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the test", "Testing on a new number", "Explaining the edge case"],
        connect: "Is 2 the only even prime?", misconception: "Thinking prime means odd." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Work in order, not at random.",
        monitor: ["Working in order", "Testing each one", "Guessing"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Calling 21 prime because it is odd." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: multiples instead of factors.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the grid", "Ready for the next idea"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [a, setA] = useState(0);
    const [b, setB] = useState(7);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeSieve(3)} height={256} award={award}
          notices={["2 is green", "Most even numbers are not", "The gaps get bigger", "1 is not green"]} wonders={["Why those numbers?", "Is 1 special?", "Do they ever stop?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory74} height={256} award={award}
          label="How many such numbers under 50?" min={5} max={30} start={15} unit="numbers"
          after="Locked. Now let us build the list properly."
          note="7 tiles make only 1 × 7. That is the whole idea." />;

      case 2:
        return <ExploreChips draw={makeSieve(a)} height={256}
          label="Cross out the multiples" value={a}
          onPick={(v) => setA(v)}
          chips={[{ v: 0, label: "start" }, { v: 1, label: "× 2" }, { v: 2, label: "× 3" }, { v: 3, label: "× 5" }]}
          caption={<MathEl omml={M.left} size="lg" display="block" />}
          footnote="Anything crossed out has a factor other than 1 and itself." />;

      case 3:
        return <ExploreChips draw={makeCount(b)} height={256}
          label="Count the factors of ..." value={b}
          onPick={(v) => setB(v)}
          chips={[{ v: 7, label: "7" }, { v: 12, label: "12" }, { v: 13, label: "13" }, { v: 1, label: "1" }]}
          caption={<MathEl omml={M.right} size="lg" display="block" />}
          footnote="Exactly two factors means prime. More than two means composite." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "p1", text: "13", target: "prime" }, { id: "p2", text: "15", target: "comp" }, { id: "p3", text: "23", target: "prime" }, { id: "p4", text: "27", target: "comp" }]} targets={[{ id: "prime", label: "prime — exactly two factors" }, { id: "comp", label: "composite — more than two" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Rima's way — cross out multiples", omml: M.left, h: 92, quote: "If it is a multiple of something, it is composite." }}
          right={{ name: "Bassel's way — count factors", omml: M.right, h: 92, quote: "I list the factors and count them." }}
          same={["Both agree which are prime", "Both use factors", "Both treat 1 as special"]} diff={["Rima works on many numbers at once", "Bassel checks one number deeply", "Rima's is faster for a whole grid"]} />;

      case 6:
        return <BoardScreen draw={drawBoard74} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "count the factors · exactly two means prime" }]}
          hand={"list the factors · count them · two means prime, more means composite, one means neither"}
          cards={[
            { title: "Prime", omml: M.left, note: "exactly two factors: 1 and itself" },
            { title: "Tap for the special case", omml: M.right, revealOmml: M.reveal, reveal: true, note: "1 has only one factor" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Is 21 prime or composite?" omml={M.swyk} options={[{ v: "a", text: "prime" }, { v: "b", text: "composite" }, { v: "c", text: "neither" }, { v: "d", text: "both" }]} right="b"
          support={{ yes: "Yes — 3 × 7 = 21, so it has four factors: 1, 3, 7 and 21.", notYet: "Not yet — work through it in order.",
            draw: drawSupport74, h: 82, hint: "21 is odd, but odd does not mean prime. Try dividing by 3." }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Pick a number between 20 and 40 at home and prove whether it is prime." />;

      default: return null;
    }
  }
};
