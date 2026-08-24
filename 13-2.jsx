/* ===========================================================================
   Grade 4 · Topic 13 · LESSON 13-2 · Equivalence with Customary Units of
   Capacity
   Standard 4.MD.A.1   I can ... convert between cups, pints, quarts and
   gallons, and see how they nest inside each other.
   =========================================================================== */

const M = {
  cupPint: om(mnor("1 pint = 2 cups")),
  pintQuart: om(mnor("1 quart = 2 pints")),
  quartGallon: om(mnor("1 gallon = 4 quarts")),
  gallonCup: om(mnor("1 gallon = 16 cups")),
  chain: om(mt("4\u00d72\u00d72=16")),
  bigToSmall: om(mnor("each step down doubles the count")),
  rule: om(mnor("count the small unit inside the big one, then multiply")),
  hard: om(mnor("1 gallon 2 pints = ? cups")),
  hard: om(mnor("1 gallon 2 pints = ? cups")),
  swyk: om(mnor("3 quarts = ? cups")),
  swykAnswer: om(mt("3\u00d74=12"))
};

/* the nesting ladder: gallon → quarts → pints → cups */
const makeNest132 = (level) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  const rows = [
    { n: 1, label: "gallon", col: "#6042A6" },
    { n: 4, label: "quarts", col: "#2D70B3" },
    { n: 8, label: "pints", col: "#388C46" },
    { n: 16, label: "cups", col: "#FA7E19" }
  ];
  for (let r = 0; r <= level; r++) {
    const j = rows[r];
    const pw = w / j.n;
    const y = 48 + r * 44;
    for (let k = 0; k < j.n; k++) {
      const a = Math.min(1, Math.max(0, (frame / 5 - k * 2) / 10)) * 0.35 + 0.65;
      ctx.save();
      ctx.globalAlpha = r === level ? a : 1;
      D.rr(ctx, x + k * pw + 1.2, y, pw - 2.4, 32, 5);
      ctx.fillStyle = j.col; ctx.globalAlpha = (r === level ? a : 1) * 0.55;
      ctx.fill();
      ctx.globalAlpha = r === level ? a : 1;
      ctx.strokeStyle = "rgba(234,244,242,.8)"; ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }
    D.txt(ctx, j.n + " " + j.label, x + w + 44, y + 16,
      { size: 12.5, col: j.col, font: "marker" });
  }
  D.txt(ctx, "every row holds exactly the same amount of liquid", W / 2, 26,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, level === 3 ? "one gallon is sixteen cups"
       : "each row cuts the one above it in half",
    W / 2, H - 14, { size: 13.5, col: level === 3 ? "#34D399" : "#C9A227", font: "marker",
      alpha: pulse + 0.4 });
};

/* the single-step conversion bar */
const makeStep132 = (pair) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const pairs = {
    pc: { n: 2, big: "pint", small: "cup", copies: 1 },
    qp: { n: 2, big: "quart", small: "pint", copies: 1 },
    gq: { n: 4, big: "gallon", small: "quart", copies: 1 },
    qc: { n: 4, big: "quart", small: "cup", copies: 3 }
  };
  const j = pairs[pair];
  D.unitBar(ctx, { x: 62, y: 62, w: W - 124, h: 36, n: j.n, big: j.big, small: j.small,
    copies: j.copies, prog: 1, bigCol: "#2D70B3", smallCol: "#FA7E19" });
  D.txt(ctx, "pour the big container into the small ones", W / 2, 26,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  D.txt(ctx, "nothing spilled \u2014 the amount is identical", W / 2, H - 14,
    { size: 13, col: "#34D399", font: "marker" });
};

const drawWarm132 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 160;
  const rows = [[1, "#6042A6"], [4, "#6042A6"], [8, "#6042A6"], [16, "#6042A6"]];
  rows.forEach((r, ri) => {
    const a = D.at(f, 30 + ri * 110, 150 + ri * 110);
    if (a <= 0) return;
    const pw = w / r[0];
    for (let k = 0; k < r[0]; k++) {
      ctx.save();
      ctx.globalAlpha = a * 0.6;
      D.rr(ctx, x + k * pw + 1.2, 46 + ri * 44, pw - 2.4, 30, 5);
      ctx.fillStyle = r[1]; ctx.fill();
      ctx.globalAlpha = a;
      ctx.strokeStyle = "rgba(234,244,242,.7)"; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();
    }
  });
  D.txt(ctx, "four rows, all exactly as long as each other", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 500, 590) });
};

const drawStory132 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "laban for the Grade 4 picnic", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.unitBar(ctx, { x: 58, y: 62, w: W - 116, h: 34, n: 4, big: "gallon", small: "quart",
    copies: 2, prog: D.at(f, 60, 360), bigCol: "#FA7E19", smallCol: "#2D70B3" });
  if (p3 > 0) {
    D.txt(ctx, "two gallons of laban. how many quart jugs will that fill?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard132 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Gallon, quart, pint, cup" });
  const x = 140, w = W - 340;
  const rows = [
    { n: 1, label: "1 gallon", col: "#6042A6", at: [20, 200] },
    { n: 4, label: "4 quarts", col: "#2D70B3", at: [210, 400] },
    { n: 8, label: "8 pints", col: "#388C46", at: [410, 600] },
    { n: 16, label: "16 cups", col: "#FA7E19", at: [610, 800] }
  ];
  rows.forEach((j, r) => {
    const a = D.at(f, j.at[0], j.at[1]);
    if (a <= 0) return;
    const pw = w / j.n;
    const y = 100 + r * 48;
    for (let k = 0; k < j.n; k++) {
      ctx.save();
      ctx.globalAlpha = a * 0.55;
      D.rr(ctx, x + k * pw + 1.2, y, pw - 2.4, 34, 5);
      ctx.fillStyle = j.col; ctx.fill();
      ctx.globalAlpha = a;
      ctx.strokeStyle = "rgba(234,244,242,.8)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.restore();
    }
    D.txt(ctx, j.label, x + w + 62, y + 17, { size: 14, col: j.col, font: "marker", alpha: a });
  });
  const p4 = D.at(f, 820, 950);
  if (p4 > 0) {
    D.txt(ctx, "4 \u00d7 2 \u00d7 2 = 16 \u2014 a gallon holds sixteen cups", W / 2, 332,
      { size: 19, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "the liquid never changed \u2014 only the size of the container",
      W / 2, H - 26, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 870, 950) });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 890, 955), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport132 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.unitBar(ctx, { x: 26, y: 12, w: W - 52, h: 22, n: 4, big: "quart", small: "cup",
    copies: 3, prog: 1, bigCol: "#2D70B3", smallCol: "#FA7E19", numbered: false,
    split: 12, label: false });
  D.txt(ctx, "three quarts, each holding four cups", W / 2, H - 8,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "13-2",
  storageKey: "daf-g4-t13-l2",
  title: "Equivalence with Customary Units of Capacity",
  unit: "GRADE 4 · TOPIC 13 · LESSON 13-2 · 4.MD.A.1",
  math: M,
  ixl: ["WGQ", "WND"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Four rows appear, each one cut into more pieces than the last. No question yet.",
      goal: "Notice the doubling before it is named.",
      pull: "Every row is exactly as long as the one above it.",
      rail: { launch: "Describe the four rows. Do not name the units yet.",
        monitor: ["Counting the pieces", "Noticing the doubling", "Noticing the equal lengths"],
        connect: "What happens to the count each time we go down a row?",
        misconception: "Thinking the bottom row holds more liquid." } },

    { phase: "launch", title: "Laban for the <em>picnic</em>",
      lead: "Two gallons of laban are bought for the picnic. Estimate how many quart jugs that fills.",
      goal: "Create the need for the capacity conversions.",
      pull: "Now let us pour it out.",
      rail: { launch: "Commit to a number of jugs before you calculate.",
        monitor: ["Estimating eight", "Estimating two", "Reasoning four per gallon"],
        connect: "Will the number of jugs be more or fewer than two?",
        misconception: "Answering 2 because there are 2 gallons." } },

    { phase: "monitor", title: "One <em>pour</em> at a time",
      lead: "Take one container and pour it into the next size down.",
      goal: "Each single-step conversion is counted, not recalled.",
      pull: "Now stack all four sizes up.",
      rail: { launch: "Predict how many will fill before you tap.",
        monitor: ["Counting the small containers", "Naming the factor", "Handling three quarts"],
        connect: "Which two conversions have the same factor?",
        misconception: "Assuming every capacity conversion uses the same factor." } },

    { phase: "monitor", title: "The whole <em>ladder</em>",
      lead: "Gallon, quarts, pints, cups. Each row splits the one above it in two.",
      goal: "See the chain of factors that gives 16 cups in a gallon.",
      pull: "Now judge some conversions.",
      rail: { launch: "Predict how many cups before we get to the last row.",
        monitor: ["Doubling each row", "Multiplying the factors", "Counting the bottom row"],
        connect: "Where does the sixteen come from?",
        misconception: "Adding 4, 2 and 2 instead of multiplying them." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each conversion. No grading until the class commits.",
      goal: "Practise choosing the right factor under scrutiny.",
      pull: "Two students converted the same amount differently.",
      rail: { launch: "For each one ask which two units are involved.",
        monitor: ["Naming the factor", "Checking the direction", "Sketching the ladder"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Using the pint-to-cup factor for a quart-to-cup conversion." } },

    { phase: "connect", title: "Two ways to reach <em>cups</em>",
      lead: "Ziad went gallon to quarts to pints to cups. Salma multiplied by sixteen.",
      goal: "A chain of steps and one big factor agree.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask where the sixteen came from.",
        monitor: ["Stepping down the ladder", "Using 16 directly", "Checking one against the other"],
        connect: "Why is 4 × 2 × 2 the same as multiplying by 16?",
        misconception: "Believing the shortcut is a different rule." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One gallon. Four quarts. Eight pints. Sixteen cups. Same liquid.",
      goal: "The moment the ladder is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build all four rows with them.",
        monitor: ["Predicting the next row", "Naming the total", "Restating the chain"],
        connect: "Who can say the whole ladder from memory?",
        misconception: "Memorising the rows without the doubling." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence, and the whole ladder follows from it.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Naming the factor", "Multiplying", "Checking the answer is bigger"],
        connect: "How many cups in half a gallon?",
        misconception: "Applying a factor without checking which two units are involved." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on capacity conversion.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. How many cups in one quart?",
        monitor: ["Using four cups per quart", "Using two", "Sketching the ladder"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 6 by using the pint factor." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: ounces, pounds and tons.",
      rail: { launch: "Three students recite the ladder.",
        monitor: ["Knows the ladder", "Still confuses factors", "Ready for weight"],
        connect: "Who is checking a bottle label at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [pair, setPair] = useState("pc");
    const [level, setLevel] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm132} height={256} award={award}
          notices={["Each row has twice as many pieces", "All four rows are the same length", "The last row has sixteen", "The first row is one whole"]}
          wonders={["What are the pieces?", "Why does it keep doubling?", "How many small ones in the big one?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory132} height={256} award={award}
          label="How many quart jugs will two gallons fill?" min={1} max={16} start={6} unit="jugs"
          after="Locked. Now let us pour it out one step at a time."
          note="A quart is smaller than a gallon, so expect more of them." />;

      case 2:
        return <ExploreChips draw={makeStep132(pair)} height={256}
          label="Pour it into the next size down" value={pair}
          onPick={(v) => setPair(v)}
          chips={[{ v: "pc", label: "pint → cups" }, { v: "qp", label: "quart → pints" },
                  { v: "gq", label: "gallon → quarts" }, { v: "qc", label: "3 quarts → cups" }]}
          caption={<MathEl omml={M.quartGallon} size="xl" display="block" />}
          footnote="Nothing spilled — the amount of liquid is identical in both rows." />;

      case 3:
        return <ExploreChips draw={makeNest132(level)} height={256}
          label="Build the ladder" value={level}
          onPick={(v) => setLevel(v)}
          chips={[{ v: 0, label: "gallon" }, { v: 1, label: "quarts" },
                  { v: 2, label: "pints" }, { v: 3, label: "cups" }]}
          caption={<MathEl omml={M.chain} size="lg" display="block" />}
          footnote="Four, then double, then double again — that is where sixteen comes from." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "2 quarts = 8 cups", target: "yes" },
                  { id: "b2", text: "2 quarts = 4 cups", target: "no" },
                  { id: "b3", text: "1 gallon = 8 pints", target: "yes" },
                  { id: "b4", text: "1 gallon = 4 cups", target: "no" }]}
          targets={[{ id: "yes", label: "correct — the right factor" },
                    { id: "no", label: "not yet — wrong pair of units" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Ziad's way — down the ladder", omml: M.chain, h: 92,
            quote: "Gallon to quarts, quarts to pints, pints to cups. Sixteen." }}
          right={{ name: "Salma's way — one factor", omml: M.gallonCup, h: 92,
            quote: "I know a gallon is sixteen cups, so I multiplied straight away." }}
          same={["Both give 16 cups", "Both describe one gallon", "Both make the number bigger"]}
          diff={["Ziad steps three times", "Salma uses one fact", "Ziad's works even if you forget"]} />;

      case 6:
        return <BoardScreen draw={drawBoard132} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "count the small unit inside the big one, then multiply" }]}
          hand={"which two units? · how many small in one big? · multiply"}
          cards={[{ title: "The step we poured", omml: M.quartGallon, note: "four quarts in a gallon" },
                  { title: "Tap for the whole chain", omml: M.bigToSmall, revealOmml: M.gallonCup, reveal: true,
                    note: "four, doubled, doubled again" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          hard={{ prompt: "A recipe for the picnic needs 1 gallon 2 pints of laban. How many cups is that?", omml: M.hard,
                  answer: "20 cups",
                  hint: "16 cups in a gallon, and 2 pints is 4 more cups." }}
          hard={{ prompt: "The harder one \u2014 two steps.", omml: M.hard,
                  answer: "20 cups",
                  hint: "16 cups in a gallon, and 2 pints is 4 more cups." }}
          prompt="A recipe needs 3 quarts of milk. How many cups is that?" omml={M.swyk}
          options={[{ v: "a", text: "6 cups" }, { v: "b", text: "12 cups" }, { v: "c", text: "3 cups" }, { v: "d", text: "48 cups" }]}
          right="b"
          support={{ yes: "Yes — four cups in every quart, three times over.",
            notYet: "Not yet — a quart holds four cups, not two.",
            draw: drawSupport132, h: 100, hint: "2 pints per quart and 2 cups per pint means 4 cups per quart." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a drink container at home and work out how many cups it holds." />;

      default: return null;
    }
  }
};
