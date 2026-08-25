/* ===========================================================================
   Grade 4 · Topic 4 · LESSON 4-1 · Multiply Multiples of 10
   Standard 4.NBT.B.5   I can ... multiply two multiples of ten using a basic
   fact and place value.
   =========================================================================== */

const M = {
  fact: om(mt("3\u00d74=12")),
  oneTen: om(mt("30\u00d74=120")),
  bothTens: om(mt("30\u00d740=1,200")),
  why: om(mt("3"), mnor(" tens \u00d7 "), mt("4"), mnor(" tens = "), mt("12"), mnor(" hundreds")),
  tiles: om(mt("40\u00d720=800")),
  rule: om(mnor("multiply the fact \u00b7 then count the zeros in both factors")),
  swyk: om(mt("60\u00d750")),
  swykAnswer: om(mt("6\u00d75=30"), mnor(", so "), mt("3,000"))
};

const STEPS = [
  { a: 3, b: 4, label: "3 × 4" },
  { a: 30, b: 4, label: "30 × 4" },
  { a: 30, b: 40, label: "30 × 40" }
];

const makeZeroLadder = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  STEPS.forEach(function (s, k) {
    var a = k < n ? 1 : 0.16;
    var live = k === n - 1;
    var y = 66 + k * 52;
    var prod = s.a * s.b;
    D.txt(ctx, s.label, W / 2 - 46, y, { size: 24, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 18, y, { size: 18, col: "rgba(234,244,242,.55)", font: "marker", alpha: a });
    D.txt(ctx, prod.toLocaleString("en-US"), W / 2 + 84, y,
      { size: 25, col: "#34D399", font: "marker", align: "right", alpha: a });
    var zeros = String(s.a).length - 1 + (String(s.b).length - 1);
    D.txt(ctx, zeros === 0 ? "no zeros" : zeros + " zero" + (zeros > 1 ? "s" : ""),
      W - 74, y, { size: 11.5, col: "#C9A227", font: "mono", weight: 700, alpha: a });
    if (live) {
      ctx.save();
      ctx.globalAlpha = 0.5 + Math.sin(frame / 14) * 0.3;
      D.rr(ctx, W / 2 - 190, y - 21, 340, 42, 8);
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.8; ctx.stroke();
      ctx.restore();
    }
  });
  D.txt(ctx, n === 3 ? "the 12 never moves — the zeros just add up"
                     : "watch the zeros in the factors",
    W / 2, H - 18, { size: 13.5, col: n === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeTileGrid = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const gw = Math.min(W - 150, 320), gh = 130;
  const x = (W - gw) / 2 + 16, y = 62;
  const cols = on ? 4 : 40, rows = on ? 3 : 30;
  const cw = gw / cols, ch = gh / rows;
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      ctx.save();
      ctx.globalAlpha = on ? 0.55 : 0.3;
      D.rr(ctx, x + c * cw + 1, y + r * ch + 1, cw - 2, ch - 2, on ? 4 : 1);
      ctx.fillStyle = "#2D70B3"; ctx.fill();
      ctx.restore();
      if (on) {
        D.txt(ctx, "100", x + c * cw + cw / 2, y + r * ch + ch / 2,
          { size: 12, col: "#EAF4F2", font: "marker" });
      }
    }
  }
  D.txt(ctx, on ? "3 tens" : "30", x - 26, y + gh / 2, { size: 15, col: "#C9A227", font: "marker" });
  D.txt(ctx, on ? "4 tens" : "40", x + gw / 2, y - 16, { size: 15, col: "#C9A227", font: "marker" });
  D.txt(ctx, on ? "12 squares of 100 = 1,200" : "1,200 little squares — nobody is counting those",
    W / 2, H - 40, { size: 15, col: on ? "#34D399" : "#C74440", font: "marker" });
  D.txt(ctx, on ? "a ten times a ten is a hundred" : "tap to group them into hundreds",
    W / 2, H - 16, { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const drawTiles = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "tiling the courtyard", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const gw = Math.min(W - 160, 300), gh = 120, x = (W - gw) / 2, y = 48;
  for (var r = 0; r < 30; r++) {
    for (var c = 0; c < 40; c++) {
      var a = D.at(p2, (r * 40 + c) / 1200, (r * 40 + c) / 1200 + 0.3);
      if (a <= 0) continue;
      ctx.save();
      ctx.globalAlpha = a * 0.35;
      ctx.fillStyle = "#12857C";
      ctx.fillRect(x + c * (gw / 40), y + r * (gh / 30), gw / 40 - 0.5, gh / 30 - 0.5);
      ctx.restore();
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "30 rows of 40 tiles", W / 2, y + gh + 26,
      { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many tiles?", W / 2, H - 16, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard41 = (ctx, W, H, frame) => {
  const CYCLE = 760, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "A ten times a ten is a hundred" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 230, 400), p3 = D.at(f, 410, 570), p4 = D.at(f, 560, 700);
  D.txt(ctx, "30 × 40", W / 2, 96, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });
  if (p1 > 0.5) {
    D.txt(ctx, "3 tens × 4 tens", W / 2, 136,
      { size: 17, col: "#C9A227", font: "marker", alpha: D.at(f, 120, 220) });
  }
  if (p2 > 0) {
    D.txt(ctx, "3 × 4 = 12", W / 2 - 100, 194, { size: 19, col: "#2D70B3", font: "marker", alpha: p2 });
    D.txt(ctx, "ten × ten = hundred", W / 2 + 110, 194, { size: 17, col: "#6042A6", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "12 hundreds", W / 2, 250, { size: 22, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "= 1,200", W / 2, 292, { size: 26, col: "#34D399", font: "marker", alpha: D.at(f, 450, 540) });
  }
  if (p4 > 0) {
    var yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "count the zeros in both factors — that is how many the product gets",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 600, 680) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 630, 730), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport41 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "6 × 5 = 30", W / 2, 28, { size: 19, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "60 has one zero · 50 has one zero", W / 2, 56,
    { size: 12.5, col: "#C9A227", font: "marker" });
  D.txt(ctx, "so the product gets two more zeros", W / 2, 80,
    { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

const LESSON = {
  code: "4-1",
  storageKey: "daf-g4-t4-l1",
  title: "Multiply Multiples of 10",
  unit: "GRADE 4 · TOPIC 4 · LESSON 4-1 · 4.NBT.B.5",
  math: M,
  ixl: ["A6Y"],

  metas: [
    { phase: "warmup", title: "Three lines, <em>one fact</em>",
      lead: "The tower's first production log: 3 × 4, 30 × 4, 30 × 40. Each floor makes a multiple-of-ten batch — and the 12 never moves.",
      goal: "Notice the pattern: the basic fact stays, the zeros add up.",
      pull: "Something stays exactly the same all the way down.",
      rail: { launch: "Fictional frame. I am not asking you to work anything out. Just look down the list.",
        monitor: ["Noticing the 12", "Counting zeros in both factors", "Predicting the next line"],
        connect: "Who noticed something nobody else did?",
        misconception: "Counting the zeros in the answer instead of in the factors." } },

    { phase: "launch", title: "Thirty rows of <em>forty tiles</em>",
      lead: "The tower's courtyard floor: 30 rows of 40 tiles. Nobody counts 1,200 tiles one at a time.",
      goal: "Create the need — a basic fact can carry a much bigger one.",
      pull: "The courtyard counts are simulated — the rule works on any floor.",
      rail: { launch: "Roughly how many tiles? Do not count.",
        monitor: ["Using 3 × 4 then adding zeros", "Adding 40 thirty times", "Estimating wildly"],
        connect: "What basic fact is hiding in this problem?",
        misconception: "Adding one zero instead of two." } },

    { phase: "monitor", title: "Zayd reveals the <em>batch lines</em>",
      lead: "One floor at a time. The digits never move — the zeros come from both factors.",
      goal: "Zeros come from both factors, not just one.",
      pull: "One zero from the 30, one from the 40 — two in the product.",
      rail: { launch: "Predict each line before Zayd reveals it.",
        monitor: ["Predicting correctly", "Counting zeros in both factors", "Explaining in tens and hundreds"],
        connect: "How many zeros will 300 × 40 have?",
        misconception: "Adding a zero per answer digit instead of per factor." } },

    { phase: "monitor", title: "Group them into <em>hundreds</em>",
      lead: "Thirty by forty is a grid. Group it and it becomes twelve hundreds.",
      goal: "A ten times a ten is a hundred — that is where the zeros come from.",
      pull: "Each grouped square is ten by ten — a hundred tiles.",
      rail: { launch: "Before you tap: how many groups of 100 will there be?",
        monitor: ["Counting the groups", "Naming the unit", "Reading 12 hundreds as 1,200"],
        connect: "Why is each grouped square worth 100?",
        misconception: "Thinking each grouped square is worth 10." } },

    { phase: "monitor", title: "Match the <em>product</em>",
      lead: "Three products from the production log. Each one belongs to one batch.",
      goal: "Read the zero pattern backwards.",
      pull: "Look at the basic fact first, then the zeros.",
      rail: { launch: "Look at the basic fact first, then the zeros.",
        monitor: ["Using the basic fact", "Counting zeros", "Calculating fully"],
        connect: "Which part did you check first?",
        misconception: "Matching by the number of digits in the answer." } },

    { phase: "connect", title: "Nada <em>counts</em>. Tarek <em>names units</em>",
      lead: "Nada counts the zeros. Tarek thinks in tens and hundreds. Both get 1,200.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Counting zeros fluently", "Naming the unit", "Using both together"],
        connect: "Whose explanation survives if you forget the rule?",
        misconception: "Believing the zero count is the mathematics rather than a consequence of it." } },

    { phase: "synth", title: "On the <em>board</em>: the 12 never moves",
      lead: "3 tens times 4 tens. Twelve, and a hundred. Twelve hundreds.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next line", "Naming the unit", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Memorising add two zeros without the unit." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the fact and the zeros", "Testing on a new fact", "Asking about 50 × 40"],
        connect: "What happens when the basic fact itself ends in a zero?",
        misconception: "Writing 50 × 40 as 200 because 5 × 4 = 20 and only two zeros are copied." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "60 × 50 — the basic fact first, then the zeros.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write the basic fact first.",
        monitor: ["Writing 6 × 5 first", "Counting both zeros", "Forgetting the zero inside 30"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 300 instead of 3,000." } },

    { phase: "connect", title: "The first floors are <em>logged</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the long order card — two-digit orders, repeated by tens of customers.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the grid", "Ready for 23 × 40"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [on, setOn] = useState(false);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Ten floors begin at once"
            text="The workshop tower's first production log: 3 × 4, 30 × 4, 30 × 40. Each floor makes a multiple-of-ten batch — and the 12 never moves."
            clue="The digits never change — the zeros add up">
            <NoticeWonder draw={makeZeroLadder(3)} height={254} award={award}
              notices={["The 12 is always there", "The zeros keep growing", "Both factors gain a zero", "The answers get bigger fast"]}
              wonders={["Where do the zeros come from?", "Does it work for any fact?", "What is 300 × 40?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Thirty rows of forty tiles"
            text="Omar checks the courtyard floor of the tower: 30 rows of 40 tiles. The workshop needs a number before the tiles are cut."
            clue="You already know 3 × 4 — that fact is doing most of the work.">
            <LaunchEstimate draw={drawTiles} height={254} award={award}
              label="About how many tiles?" min={200} max={3000} start={1200} unit="tiles"
              after="Locked. Now let us see where the zeros come from."
              note="The courtyard counts are simulated — the rule works on any floor." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd reveals the batch lines"
            text="He can reveal any line, but the class must predict the product before the zeros add up."
            clue="One zero from the 30, one from the 40">
            <ExploreChips draw={makeZeroLadder(n)} height={254}
              label="Reveal one line at a time"
              value={n}
              onPick={(v) => setN(v)}
              chips={STEPS.map((s, k) => ({ v: k + 1, label: s.label }))}
              caption={<MathEl omml={M.bothTens} size="xl" display="block" />}
              footnote="One zero from the 30 and one from the 40 — two in the product." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="both"
            title="Group the courtyard into hundreds"
            text="Omar and Zayd group the single tiles — ten by ten — and the floor becomes twelve hundreds."
            clue="Each grouped square is a hundred tiles">
            <ExploreChips draw={makeTileGrid(on)} height={254}
              label="Group the tiles"
              value={on ? 1 : 0}
              onPick={(v) => setOn(v === 1)}
              chips={[{ v: 0, label: "1,200 single tiles" }, { v: 1, label: "group into hundreds" }]}
              caption={<MathEl omml={M.why} size="lg" display="block" />}
              footnote="Each grouped square is ten by ten — a hundred tiles." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the product"
            text="Three products from the production log. Each one belongs to exactly one batch."
            clue="Look at the basic fact first, then the zeros">
            <CardSort award={award} columns={3}
              items={[
                { id: "z1", text: "1,200", target: "g1" },
                { id: "z2", text: "120", target: "g2" },
                { id: "z3", text: "12,000", target: "g3" }
              ]}
              targets={[
                { id: "g2", label: "30 × 4" }, { id: "g1", label: "30 × 40" }, { id: "g3", label: "300 × 40" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 1,200"
            text="Nada counts the zeros. Tarek names the units. Both get 1,200 — for different reasons."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Nada's way — count the zeros", omml: M.bothTens, h: 92,
                      quote: "3 times 4 is 12, and there are two zeros to copy across." }}
              right={{ name: "Tarek's way — name the units", omml: M.why, h: 92,
                       quote: "Three tens times four tens is twelve hundreds." }}
              same={["Both get 1,200", "Both start from 3 × 4", "Both are quick"]}
              diff={["Nada counts, Tarek names units", "Tarek can explain why", "Nada's is faster to say"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the production log"
            text="Zayd builds only what the class can justify: the fact multiplied, the zeros from both factors attached."
            clue="The 12 never moves — the zeros just add up">
            <BoardScreen draw={drawBoard41} height={430}
              caption="The 12 never moves — the zeros just add up." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the tower's plan with its reason, not alone."
            clue="When the fact ends in a zero, that zero counts too">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "multiply the fact, then count the zeros in both factors" }]}
              hand={"find the basic fact · multiply it · count the zeros in BOTH factors · attach them all"}
              cards={[
                { title: "The tiles we counted", omml: M.bothTens, note: "30 × 40, two zeros" },
                { title: "Tap to see the danger case", omml: M.tiles, revealOmml: M.swykAnswer, reveal: true,
                  note: "when the fact itself ends in zero, that zero counts too" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a batch he can defend"
            text="60 × 50. Show the basic fact first — then the zeros."
            clue="6 × 5 = 30, then two more zeros">
            <ShowWhatYouKnow award={award}
              prompt="What is 60 × 50?"
              omml={M.swyk}
              options={[{ v: "a", text: "300" }, { v: "b", text: "3,000" }, { v: "c", text: "30,000" }, { v: "d", text: "110" }]}
              right="b"
              support={{
                yes: "Yes — 6 × 5 = 30, plus two more zeros from the factors, so 3,000.",
                notYet: "Not yet — the fact 6 × 5 already ends in a zero. Count that one too.",
                draw: drawSupport41, h: 96,
                hint: "30, then two more zeros: 3,000."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The first floors are logged"
            text="Omar signs the batch totals into the tower's log. Under the cover, a long order card slips out: a two-digit order, repeated for tens of customers at once."
            artifact="Tower log · first floors counted"
            next="The long order card: a two-digit order repeated for tens of customers. A larger model is needed.">
            <Closing game={game} omml={M.rule}
              action="Find two multiples of ten at home — prices, distances — and multiply them in your head." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
