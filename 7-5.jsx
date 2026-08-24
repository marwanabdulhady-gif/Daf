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

const makeSieve = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const marks = [];
  const base = [2, 3, 5];
  for (var i = 0; i < step && i < base.length; i++) {
    for (var m = base[i] * 2; m <= 50; m += base[i]) marks.push(m);
  }
  D.numberGrid(ctx, { n: 50, cols: 10, x: 58, y: 44, w: W - 116, ch: 21,
    sets: [{ nums: marks, col: "#C75440" },
           { nums: step >= 3 ? PRIMES.filter(function (p) { return p <= 50; }) : [], col: "#34D399" },
           { nums: [1], col: "#C9A227", ring: true }] });
  const notes = ["start at 6", "multiples of 2 crossed out",
                 "multiples of 3 as well", "what survives is prime"];
  D.txt(ctx, notes[step], W / 2, H - 14,
    { size: 13.5, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
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
    sets: [{ nums: [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47].slice(0, Math.ceil([2,3,5,7,11,13,17,19,23,29,31,37,41,43,47].length * p2)), col: "#34D399" }] });
  if (p3 > 0) D.txt(ctx, "what would come after 48?", W / 2, H - 14,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawSupport75 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.numberGrid(ctx, { n: 21, cols: 7, x: 26, y: 8, w: W - 52, ch: 19,
    sets: [{ nums: [1,3,7,21], col: "#34D399" }] });
};

const LESSON = {
  code: "7-5",
  storageKey: "daf-g4-t7-l5",
  title: "Multiples",
  unit: "GRADE 4 · TOPIC 7 · LESSON 7-5 · 4.OA.B.4",
  math: M,
  ixl: ["EFB"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A grid with every sixth number picked out. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "The gaps between them are all the same size.",
      rail: { launch: "I am not asking for a rule yet. Just look at the highlighted numbers.",
        monitor: ["Spotting the gaps between them", "Reading them aloud", "Predicting the next one"],
        connect: "Who noticed something nobody else did?",
        misconception: "Confusing this with the factors of 6." } },

    { phase: "launch", title: "Counting in <em>sixes</em>", lead: "Start at 6 and keep adding 6. Estimate how many you get before 50.",
      goal: "Create the need — a list you can trust beats a list you guessed.",
      pull: "Estimate first, then we will build the list properly.",
      rail: { launch: "Count in sixes out loud together. Where do you stop before 50?",
        monitor: ["Guessing", "Working in order", "Using division to test"],
        connect: "How will you know when you have them all?",
        misconception: "Starting the multiples at 0 or at 1 instead of at 6." } },

    { phase: "monitor", title: "Count in <em>sixes</em>", lead: "Add 6 each time. Then look at the multiples of 4 as well.",
      goal: "A multiple is a number you land on by skip counting.", pull: "Now test a number directly.",
      rail: { launch: "Predict the next one before you tap.",
        monitor: ["Working in order", "Jumping around", "Checking each one"],
        connect: "Is 6 a multiple of 6?", misconception: "Leaving 6 itself out of its own multiples." } },

    { phase: "monitor", title: "Test a <em>number</em>", lead: "Build it in rows of 6. A full last row means it is a multiple.",
      goal: "A multiple leaves no gap in the last row.", pull: "Now sort some numbers.",
      rail: { launch: "Predict whether the last row will be full.",
        monitor: ["Testing carefully", "Guessing", "Explaining the test"],
        connect: "What does a gap in the last row mean?", misconception: "Calling 30 a multiple of 4 because it is even." } },

    { phase: "monitor", title: "Factor or <em>multiple</em>?", lead: "Sort each number. No grading until the class commits.",
      goal: "Apply the test to unfamiliar numbers.",
      pull: "Two students organised their search differently.",
      rail: { launch: "Test each one before you place it.",
        monitor: ["Dividing to test", "Recognising by sight", "Guessing"],
        connect: "Which was hardest to place, and why?",
        misconception: "Swapping the two words around." } },

    { phase: "connect", title: "Two ways to <em>be sure</em>", lead: "Huda skip counted. Adel multiplied 6 by 1, 2, 3. Both got the same list.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Working in order", "Working in pairs", "Checking nothing is missed"],
        connect: "Whose method proves nothing was missed?",
        misconception: "Believing a random search is enough." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "3 fits inside 12. 12 is built from 3. One fact, two words.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next mark", "Naming the pattern", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Using factor and multiple as if they mean the same thing." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the test", "Testing on a new number", "Explaining the edge case"],
        connect: "Can a number be a multiple of itself?", misconception: "Believing multiples must be bigger than the number." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Work in order, not at random.",
        monitor: ["Working in order", "Testing each one", "Guessing"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Saying no because 45 is odd." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next topic: fractions.",
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
          notices={["They are all even", "The gap is always 6", "It starts at 6", "48 is the last one shown"]} wonders={["What comes next?", "Do they ever stop?", "Is 6 a multiple of itself?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory75} height={256} award={award}
          label="How many multiples of 6 under 50?" min={2} max={20} start={8} unit="multiples"
          after="Locked. Now let us build the list properly."
          note="7 tiles make only 1 × 7. That is the whole idea." />;

      case 2:
        return <ExploreChips draw={makeSieve(a)} height={256}
          label="Cross out the multiples" value={a}
          onPick={(v) => setA(v)}
          chips={[{ v: 0, label: "start" }, { v: 1, label: "× 2" }, { v: 2, label: "× 3" }, { v: 3, label: "× 5" }]}
          caption={<MathEl omml={M.left} size="lg" display="block" />}
          footnote="Every number you land on is a multiple of 6." />;

      case 3:
        return <ExploreChips draw={makeCount(b)} height={256}
          label="Count the factors of ..." value={b}
          onPick={(v) => setB(v)}
          chips={[{ v: 24, label: "24" }, { v: 30, label: "30" }, { v: 36, label: "36" }, { v: 42, label: "42" }]}
          caption={<MathEl omml={M.right} size="lg" display="block" />}
          footnote="A full last row means it is a multiple of 6." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "p1", text: "3 for 12", target: "fac" }, { id: "p2", text: "24 for 6", target: "mul" }, { id: "p3", text: "5 for 20", target: "fac" }, { id: "p4", text: "30 for 5", target: "mul" }]} targets={[{ id: "prime", label: "prime — exactly two factors" }, { id: "comp", label: "composite — more than two" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Huda's way — skip count", omml: M.left, h: 92, quote: "I keep adding 6 and write down where I land." }}
          right={{ name: "Adel's way — multiply", omml: M.right, h: 92, quote: "I do 6 times 1, 6 times 2, 6 times 3." }}
          same={["Both give 6, 12, 18, 24", "Both start at 6", "Both could go on forever"]} diff={["Huda adds, Adel multiplies", "Adel can jump straight to the tenth one", "Huda's is easier to say out loud"]} />;

      case 6:
        return <BoardScreen draw={drawBoard75} height={430} />;

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
          prompt="Is 45 a multiple of 5?" omml={M.swyk} options={[{ v: "a", text: "no" }, { v: "b", text: "yes" }, { v: "c", text: "only if you round" }, { v: "d", text: "cannot tell" }]} right="b"
          support={{ yes: "Yes — 3 × 7 = 21, so it has four factors: 1, 3, 7 and 21.", notYet: "Not yet — work through it in order.",
            draw: drawSupport75, h: 82, hint: "Count in fives: 5, 10, 15 ... do you land on 45?" }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Count in sevens at home and write down the first ten multiples." />;

      default: return null;
    }
  }
};
