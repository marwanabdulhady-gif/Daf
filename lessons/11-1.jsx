/* ===========================================================================
   Grade 4 · Topic 11 · LESSON 11-1 · Read Line Plots
   Standard 4.MD.B.4   I can ... read a line plot whose scale is in fractions,
   and answer questions about the data on it.
   =========================================================================== */

const M = {
  scale: om(mnor("the scale counts in quarter units")),
  mostCommon: om(mfrac(2, 4), mnor(" was measured 4 times")),
  howMany: om(mt("2+1+4+3+2=12"), mnor(" leaves")),
  longest: om(mfrac(3, 4), mnor(" is the longest leaf")),
  spread: om(mfrac(3, 4), mt("\u2212"), mt("0"), mt("="), mfrac(3, 4)),
  rule: om(mnor("one mark = one measurement \u00b7 the scale tells you the size")),
  swyk: om(mnor("how many leaves were shorter than half a unit?")),
  swykAnswer: om(mt("2+1=3"), mnor(" leaves"))
};

/* the leaf data — index is the numerator over 4 */
const LEAF11 = { 0: 2, 1: 1, 2: 4, 3: 3, 4: 2 };

/* the plot, with one value highlighted at a time */
const makePlot111 = (hot) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.linePlot(ctx, { x: 96, y: H - 96, w: W - 192, den: 4, max: 4, counts: LEAF11,
    prog: 1, col: "#2D70B3", highlight: hot, showCounts: true,
    title: "Length of leaves collected on the Corniche walk",
    axisLabel: "length in units" });
  if (hot != null) {
    const c = LEAF11[hot] || 0;
    const words = ["zero", "one quarter", "two quarters", "three quarters", "one whole"][hot];
    D.txt(ctx, c + (c === 1 ? " leaf measured " : " leaves measured ") + words,
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, "every cross stands for exactly one leaf", W / 2, H - 12,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

/* the same data as a pile of rulers — where the marks come from */
const makeRulers111 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const lens = [2, 3, 2, 4, 1, 2, 3, 0, 2, 3, 4, 0];
  const shown = step === 0 ? 3 : step === 1 ? 7 : 12;
  D.txt(ctx, "each leaf is measured to the nearest quarter unit", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker" });
  const rowH = 15, x0 = 70, full = W - 260;
  for (let i = 0; i < shown && i < 12; i++) {
    const a = Math.min(1, Math.max(0, (frame / 5 - i * 3) / 10));
    ctx.save();
    ctx.globalAlpha = a * 0.9;
    D.rr(ctx, x0, 42 + i * rowH, Math.max(6, (lens[i] / 4) * full), rowH - 5, 3);
    ctx.fillStyle = "#388C46"; ctx.fill();
    ctx.restore();
    D.txt(ctx, lens[i] + "/4", x0 + full + 26, 42 + i * rowH + 5,
      { size: 10.5, col: "rgba(234,244,242,.65)", font: "mono", weight: 700, alpha: a });
  }
  D.txt(ctx, shown + " of 12 leaves measured", W / 2, H - 14,
    { size: 13, col: shown === 12 ? "#34D399" : "#EAF4F2", font: "marker" });
};

const drawWarm111 = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.linePlot(ctx, { x: 96, y: H - 88, w: W - 192, den: 4, max: 4, counts: LEAF11,
    prog: D.at(f, 20, 420), col: "#6042A6",
    title: "Twelve leaves, measured and plotted", axisLabel: "length in units" });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 400, 500) });
};

const drawStory111 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "Joud's science homework", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.linePlot(ctx, { x: 96, y: H - 94, w: W - 192, den: 4, max: 4, counts: LEAF11,
    prog: D.at(f, 80, 380), col: "#FA7E19", axisLabel: "length in units" });
  if (p3 > 0) {
    D.txt(ctx, "how many leaves did she measure altogether?", W / 2, H - 14,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard111 = (ctx, W, H, frame) => {
  const CYCLE = 900, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Reading a line plot in quarters" });
  const p2 = D.at(f, 300, 520), p3 = D.at(f, 540, 720), p4 = D.at(f, 740, 880);

  D.linePlot(ctx, { x: 150, y: 250, w: W - 300, den: 4, max: 4, counts: LEAF11,
    prog: D.at(f, 20, 420), col: "#2D70B3", showCounts: true,
    axisLabel: "length in units" });

  if (p2 > 0) {
    D.txt(ctx, "count the crosses in a column \u2192 how many leaves at that length",
      W / 2, 322, { size: 14, col: "#EAF4F2", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "count every cross \u2192 how many leaves altogether: 12",
      W / 2, 348, { size: 14, col: "#FA7E19", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "the tallest stack is the length that happened most often",
      W / 2, 378, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, 374, 15, D.at(f, 800, 890), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport111 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.linePlot(ctx, { x: 46, y: H - 30, w: W - 92, den: 4, max: 4,
    counts: { 0: 2, 1: 1 }, prog: 1, col: "#C74440", r: 4.4, gapY: 13,
    labelAll: true });
};

const LESSON = {
  code: "11-1",
  storageKey: "daf-g4-t11-l1",
  title: "Read Line Plots",
  unit: "GRADE 4 · TOPIC 11 · LESSON 11-1 · 4.MD.B.4",
  math: M,
  ixl: ["G8K", "JVG"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A line plot builds itself, one cross at a time. No question yet.",
      goal: "Let the class describe the display before anyone has to interpret it.",
      pull: "Every cross came from a real measurement.",
      rail: { launch: "Do not answer anything. Describe what appears.",
        monitor: ["Counting crosses in a stack", "Reading the fraction scale", "Noticing the tallest column"],
        connect: "Someone counted twelve. Twelve of what?",
        misconception: "Reading the height of a stack as a length rather than a count." } },

    { phase: "launch", title: "Twelve leaves on the <em>Corniche</em>",
      lead: "Joud measured every leaf she collected to the nearest quarter of a unit and plotted them. Estimate how many leaves she had.",
      goal: "Create the need to count marks rather than read a height.",
      pull: "Now let us see where the marks came from.",
      rail: { launch: "Do not count carefully yet. Give me a number you can defend.",
        monitor: ["Estimating from the stacks", "Counting one column only", "Reading the scale as the answer"],
        connect: "What exactly are we counting: leaves or lengths?",
        misconception: "Answering 4 because there are five positions on the scale." } },

    { phase: "monitor", title: "Where the <em>marks</em> came from",
      lead: "Twelve leaves, each measured to the nearest quarter unit. Watch them turn into crosses.",
      goal: "Connect the raw measurements to the display.",
      pull: "Now read the finished plot.",
      rail: { launch: "Predict which quarter will get the tallest stack.",
        monitor: ["Matching a leaf to a position", "Counting the leaves", "Noticing repeats"],
        connect: "Two leaves were the same length. What happens on the plot?",
        misconception: "Believing every leaf needs its own position on the scale." } },

    { phase: "monitor", title: "Read one <em>column</em> at a time",
      lead: "Tap a value on the scale. The stack above it tells you how many.",
      goal: "Practise the two readings: which length, and how many.",
      pull: "Now judge some statements about this plot.",
      rail: { launch: "Say the sentence out loud before you tap.",
        monitor: ["Naming the fraction correctly", "Counting the crosses", "Confusing count with length"],
        connect: "Which column tells you the most common length?",
        misconception: "Saying '4' when the length is 2/4 and the count is 4." } },

    { phase: "monitor", title: "True or <em>not yet</em>?",
      lead: "Sort each statement about the plot. Nothing is graded until the class commits.",
      goal: "Force careful reading of a display everyone thinks is easy.",
      pull: "Two students answered the same question differently.",
      rail: { launch: "Point at the part of the plot that settles each one.",
        monitor: ["Checking against the plot", "Counting twice", "Mixing up count and length"],
        connect: "Which statement was hardest to decide?",
        misconception: "Reading the number of positions as the number of leaves." } },

    { phase: "connect", title: "Two ways to <em>count</em>",
      lead: "Ziad counted every cross one by one. Qais added the column totals. Both got twelve.",
      goal: "Adding the column counts is the reliable route on a big plot.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one survives fifty leaves.",
        monitor: ["Counting one by one", "Adding column totals", "Losing count"],
        connect: "Which method would you trust with a hundred marks?",
        misconception: "Recounting from scratch each time instead of using column totals." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One cross is one measurement. The position tells you the size.",
      goal: "The moment the reading rule is taught, not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build the plot with them, then annotate it.",
        monitor: ["Predicting a column total", "Naming the fraction", "Restating the rule"],
        connect: "Who can say what one cross means?",
        misconception: "Treating the plot as a bar chart with heights that are values." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Two things to read on every line plot, in this order.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the rule aloud, once, together.",
        monitor: ["Naming the scale unit", "Counting the marks", "Combining columns"],
        connect: "What would change if the scale were in eighths?",
        misconception: "Ignoring the scale label and assuming whole numbers." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on reading a fractional scale.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Find half a unit on the scale first.",
        monitor: ["Locating 2/4 as a half", "Adding the two columns to its left", "Including 2/4 by mistake"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Including the leaves at exactly half when the question says shorter." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: making a line plot from your own measurements.",
      rail: { launch: "Three students say what one cross means.",
        monitor: ["Reads both count and length", "Still confuses the two", "Ready to make one"],
        connect: "Who is measuring something at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [hot, setHot] = useState(null);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm111} height={256} award={award}
          notices={["The scale counts in quarters", "One column is taller than the rest", "There are twelve crosses", "Every cross is the same size"]}
          wonders={["What was being measured?", "How many leaves altogether?", "Why are the numbers fractions?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory111} height={256} award={award}
          label="How many leaves did Joud measure?" min={4} max={24} start={10} unit="leaves"
          after="Locked. Now let us see where each cross came from."
          note="One cross on the plot means one leaf was that length." />;

      case 2:
        return <ExploreChips draw={makeRulers111(step)} height={256}
          label="Measure the leaves" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "first 3" }, { v: 1, label: "first 7" }, { v: 2, label: "all 12" }]}
          caption={<MathEl omml={M.howMany} size="xl" display="block" />}
          footnote="Leaves the same length simply stack on top of each other." />;

      case 3:
        return <ExploreChips draw={makePlot111(hot)} height={256}
          label="Read one value at a time" value={hot}
          onPick={(v) => setHot(v)}
          chips={[{ v: 0, label: "0" }, { v: 1, label: "1/4" }, { v: 2, label: "2/4" },
                  { v: 3, label: "3/4" }, { v: 4, label: "1" }]}
          caption={<MathEl omml={M.mostCommon} size="lg" display="block" />}
          footnote="The position is the length. The height of the stack is the count." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "a1", text: "12 leaves in total", target: "yes" },
                  { id: "a2", text: "5 leaves in total", target: "no" },
                  { id: "a3", text: "2/4 was the most common", target: "yes" },
                  { id: "a4", text: "4 was the most common", target: "no" }]}
          targets={[{ id: "yes", label: "true — the plot says so" },
                    { id: "no", label: "not yet — count vs length" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Ziad's way — count every cross", omml: M.howMany, h: 92,
            quote: "One, two, three ... I pointed at every single one." }}
          right={{ name: "Qais's way — add the columns", omml: M.spread, h: 92,
            quote: "Two, then one, then four, then three, then two. Twelve." }}
          same={["Both give 12 leaves", "Both use every mark once", "Both read the same plot"]}
          diff={["Ziad counts singly", "Qais uses column totals", "Qais's is safer with a hundred marks"]} />;

      case 6:
        return <BoardScreen draw={drawBoard111} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "one mark equals one measurement; the scale tells you the size" }]}
          hand={"read the scale first · then count the marks in the column"}
          cards={[{ title: "The most common length", omml: M.mostCommon, note: "the tallest stack" },
                  { title: "Tap for the longest leaf", omml: M.scale, revealOmml: M.longest, reveal: true,
                    note: "the mark furthest to the right" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Using Joud's plot, how many leaves were shorter than half a unit?" omml={M.swyk}
          options={[{ v: "a", text: "2" }, { v: "b", text: "3" }, { v: "c", text: "7" }, { v: "d", text: "12" }]}
          right="b"
          support={{ yes: "Yes — 2 leaves at 0 and 1 leaf at 1/4.",
            notYet: "Not yet — only the columns to the left of 2/4 count.",
            draw: drawSupport111, h: 96, hint: "Half a unit is 2/4, and 'shorter than' does not include it." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Measure five things at home to the nearest half unit and write the lengths down for tomorrow." />;

      default: return null;
    }
  }
};
