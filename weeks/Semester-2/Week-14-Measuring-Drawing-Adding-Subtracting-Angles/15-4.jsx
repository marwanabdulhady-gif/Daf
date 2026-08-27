/* ===========================================================================
   Grade 4 · Topic 15 · LESSON 15-4 · Measure and Draw Angles
   Standard 4.MD.C.6   I can ... use a protractor to measure an angle and to
   draw one of a given size.
   =========================================================================== */

const M = {
  place: om(mnor("centre on the vertex \u00b7 zero line on one ray")),
  read: om(mnor("read where the second ray crosses the scale")),
  which: om(mnor("acute angles read under 90 \u00b7 obtuse angles read over 90")),
  measured: om(mnor("this angle measures 55 degrees")),
  draw: om(mnor("mark the degree, then join it to the vertex")),
  check: om(mnor("check the answer against a right angle before you write it")),
  rule: om(mnor("centre \u00b7 zero line \u00b7 read the scale \u00b7 then sense-check")),
  swyk: om(mnor("an angle a little wider than a square corner")),
  swykAnswer: om(mnor("about 100 degrees, not 80"))
};

/* the three placement steps */
const makePlace154 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cy = H - 52, r = Math.min(140, H - 82);

  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 55,
    protractor: step >= 1, prog: 1,
    col: "#2D70B3", arcCol: step >= 2 ? "#34D399" : "#C9A227",
    label: step >= 2 ? "55\u00b0" : false });

  if (step === 0) {
    const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
    ctx.save();
    ctx.globalAlpha = pulse + 0.4;
    ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "the vertex", cx - 70, cy + 22, { size: 12, col: "#C9A227", font: "marker" });
  }
  if (step >= 1) {
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    D.marker(ctx, [[cx, cy], [cx + r * 1.06, cy]], 1,
      step === 1 ? "#C9A227" : "rgba(201,162,39,.45)", step === 1 ? 3.4 : 2.2);
    if (step === 1) {
      D.txt(ctx, "zero line sits on this ray", cx + 20, cy + 26,
        { size: 12, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
    }
  }
  const heads = ["find the vertex", "lay the protractor on it",
    "read where the other ray crosses"];
  D.txt(ctx, heads[step], W / 2, 26, { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, step === 2 ? "55 degrees \u2014 and it is less than a square corner, so that fits"
       : "the centre hole goes exactly on the vertex",
    W / 2, H - 12, { size: 12.5, col: step === 2 ? "#34D399" : "rgba(234,244,242,.65)",
      font: "marker" });
};

/* the two scales trap: acute versus obtuse */
const makeScale154 = (deg) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cy = H - 50, r = Math.min(136, H - 80);
  const acute = deg < 90;

  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: deg, protractor: true, prog: 1,
    col: "#2D70B3", arcCol: acute ? "#34D399" : "#FA7E19", label: deg + "\u00b0",
    square: deg === 90 });

  const other = 180 - deg;
  const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
  D.txt(ctx, "the scale shows " + deg + " and " + other + " at the same place", W / 2, 26,
    { size: 13, col: "rgba(234,244,242,.68)", font: "marker" });
  D.txt(ctx, deg === 90 ? "a square corner \u2014 both scales say 90"
       : acute ? "this opening is less than a square corner, so read " + deg
       : "this opening is more than a square corner, so read " + deg,
    W / 2, H - 12, { size: 13.5, col: acute ? "#34D399" : "#FA7E19", font: "marker",
      alpha: pulse + 0.4 });
};

const drawWarm154 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cy = H - 46, r = Math.min(128, H - 78);
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 55, protractor: true,
    prog: D.at(f, 20, 420), col: "#6042A6", arcCol: "#6042A6", label: false });
  D.txt(ctx, "a tool laid over an angle", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 440, 530) });
};

const drawStory154 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the ramp at the Corniche skate park", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const cx = W / 2 - 70, cy = H - 44, r = Math.min(128, H - 78);
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 35,
    prog: D.at(f, 60, 380), col: "#FA7E19", arcCol: "#C9A227", label: "?" });
  if (p3 > 0) {
    D.txt(ctx, "estimate the ramp angle before anybody measures it",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard154 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Centre, zero line, read, check" });
  const p1 = D.at(f, 20, 300), p3 = D.at(f, 520, 720), p4 = D.at(f, 760, 940);
  const cx = W / 2 - 130, cy = 320, r = 170;

  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 55, protractor: true, prog: p1,
    col: "#2D70B3", arcCol: "#C9A227", label: "55\u00b0" });

  if (p3 > 0) {
    const lines = ["1 \u00b7 centre hole on the vertex", "2 \u00b7 zero line along one ray",
      "3 \u00b7 read where the other ray crosses", "4 \u00b7 check against a square corner"];
    lines.forEach((s, k) => {
      const a = D.at(f, 520 + k * 60, 620 + k * 60);
      D.txt(ctx, s, W / 2 + 190, 130 + k * 40,
        { size: 15.5, col: k === 3 ? "#34D399" : "#EAF4F2", font: "marker", alpha: a });
    });
  }
  if (p4 > 0) {
    D.txt(ctx, "55\u00b0 is less than a right angle \u2014 and the drawing agrees",
      W / 2, H - 26, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 880, 955), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport154 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.angleFig(ctx, { cx: W / 2, cy: H - 12, r: H - 26, start: 0, deg: 100, prog: 1,
    col: "#2D70B3", arcCol: "#FA7E19", label: "100\u00b0" });
};

const LESSON = {
  code: "15-4",
  storageKey: "daf-g4-t15-l4",
  title: "Measure and Draw Angles",
  unit: "GRADE 4 · TOPIC 15 · LESSON 15-4 · 4.MD.C.6",
  math: M,
  ixl: ["NCN", "R9K"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A half-circle tool appears over an angle, marked all the way round. No question yet.",
      goal: "Meet the protractor as a fan of unit angles, not a mystery object.",
      pull: "Those marks are the wedges from yesterday.",
      rail: { launch: "Describe the tool. Do not read any number yet.",
        monitor: ["Counting the marks", "Noticing the centre", "Noticing the numbers"],
        connect: "What are all those little marks?",
        misconception: "Seeing the protractor as unrelated to unit angles." } },

    { phase: "launch", title: "The skate park <em>ramp</em>",
      lead: "The ramp at the Corniche rises at an angle. Estimate it in degrees before measuring.",
      goal: "Estimate first so the measurement can be sense-checked.",
      pull: "Now let us place the tool properly.",
      rail: { launch: "Is it more or less than a square corner? Commit, then choose a number.",
        monitor: ["Comparing to 90", "Guessing wildly", "Reasoning from a half turn"],
        connect: "What are you comparing it against?",
        misconception: "Estimating with no benchmark at all." } },

    { phase: "monitor", title: "Place, then <em>read</em>",
      lead: "Centre hole on the vertex, zero line along one ray, then read the other ray.",
      goal: "Placement is the whole skill; reading is trivial once it is right.",
      pull: "But which of the two numbers do you read?",
      rail: { launch: "What has to line up before you look at any number?",
        monitor: ["Centring on the vertex", "Aligning the zero line", "Reading the scale"],
        connect: "Which step do people get wrong most often?",
        misconception: "Lining the protractor edge up with the ray instead of the zero line." } },

    { phase: "monitor", title: "Which <em>scale</em>?",
      lead: "Every mark carries two numbers. Only one of them can be right.",
      goal: "Resolve the double-scale confusion with a benchmark.",
      pull: "Now judge some measurements.",
      rail: { launch: "Before reading, ask: is this more or less than a square corner?",
        monitor: ["Comparing to 90 first", "Reading the wrong scale", "Explaining the choice"],
        connect: "Which reading is impossible for this angle, and why?",
        misconception: "Reading 125 for an angle that is clearly acute." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each measurement. No grading until the class commits.",
      goal: "Practise the sense-check that catches scale errors.",
      pull: "Two students measured the same angle differently.",
      rail: { launch: "For each one, compare with a right angle before you decide.",
        monitor: ["Sense-checking against 90", "Recomputing", "Checking the placement"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Trusting a reading that contradicts the picture." } },

    { phase: "connect", title: "Measuring and <em>drawing</em>",
      lead: "Anees measured an angle. Yousef drew one of exactly 130 degrees.",
      goal: "Drawing is measuring run backwards.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask what is the same about the two jobs.",
        monitor: ["Placing the protractor", "Marking the degree first", "Joining to the vertex"],
        connect: "What is the first step in both jobs?",
        misconception: "Drawing the second ray before marking the degree." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Centre. Zero line. Read. Then check it against a square corner.",
      goal: "The moment the protractor routine is taught.",
      pull: "Say the four steps.",
      rail: { launch: "Lay the tool with them, step by step.",
        monitor: ["Naming each step", "Reading the scale", "Sense-checking"],
        connect: "Who can say all four steps in order?",
        misconception: "Skipping the final sense-check." } },

    { phase: "synth", title: "The routine \u2014 <em>and why it works</em>",
      lead: "Four steps that make the double scale harmless.",
      goal: "Generalise the routine, not the number.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the four steps aloud, once.",
        monitor: ["Centring", "Aligning", "Reading", "Checking"],
        connect: "Which step stops you reading the wrong scale?",
        misconception: "Believing a protractor cannot be misread." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on the double scale.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Is it more or less than a square corner?",
        monitor: ["Comparing to 90 first", "Reading 80", "Explaining the choice"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 80 for an angle that is clearly obtuse." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: adding and subtracting angle measures.",
      rail: { launch: "Three students say the four steps.",
        monitor: ["Places and checks", "Still reads both scales", "Ready to combine angles"],
        connect: "Who is measuring a corner at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [deg, setDeg] = useState(55);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm154} height={256} award={award}
          notices={["The tool is a half circle", "It is marked from 0 to 180", "There is a centre point", "The marks are tiny wedges"]}
          wonders={["How do I line it up?", "Which number do I read?", "Why are there two sets of numbers?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory154} height={256} award={award}
          label="How many degrees is the ramp?" min={5} max={175} start={90} unit="°"
          after="Locked. Now let us place the protractor properly."
          note="Compare it with a square corner first — that is your benchmark." />;

      case 2:
        return <ExploreChips draw={makePlace154(step)} height={256}
          label="Place it step by step" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "find the vertex" }, { v: 1, label: "lay the tool" },
                  { v: 2, label: "read the scale" }]}
          caption={<MathEl omml={M.place} size="xl" display="block" />}
          footnote="If the centre or the zero line is out, every reading after it is wrong." />;

      case 3:
        return <ExploreChips draw={makeScale154(deg)} height={256}
          label="Which of the two numbers?" value={deg}
          onPick={(v) => setDeg(v)}
          chips={[{ v: 40, label: "acute" }, { v: 90, label: "right" }, { v: 130, label: "obtuse" }]}
          caption={<MathEl omml={M.which} size="lg" display="block" />}
          footnote="A square corner is your benchmark — decide before you read." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "d1", text: "an acute angle read as 55°", target: "yes" },
                  { id: "d2", text: "an acute angle read as 125°", target: "no" },
                  { id: "d3", text: "an obtuse angle read as 130°", target: "yes" },
                  { id: "d4", text: "an obtuse angle read as 50°", target: "no" }]}
          targets={[{ id: "yes", label: "the reading matches the picture" },
                    { id: "no", label: "not yet — wrong scale" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Anees's job — measure it", omml: M.read, h: 92,
            quote: "I lined up the vertex and the zero line, then read 55." }}
          right={{ name: "Yousef's job — draw it", omml: M.draw, h: 92,
            quote: "I marked 130 on the scale first, then joined it to the vertex." }}
          same={["Both start at the vertex", "Both use the zero line", "Both check against 90"]}
          diff={["Anees reads the scale", "Yousef marks it", "Drawing is measuring run backwards"]} />;

      case 6:
        return <BoardScreen draw={drawBoard154} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "centre, zero line, read the scale, then sense-check" }]}
          hand={"centre on the vertex · zero along a ray · read · then check against a square corner"}
          cards={[{ title: "The angle we measured", omml: M.measured, note: "acute, so under 90" },
                  { title: "Tap for the last step", omml: M.which, revealOmml: M.check, reveal: true,
                    note: "the check is what saves you" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="An angle is a little wider than a square corner. The scale shows 80 and 100. What is it?"
          omml={M.swyk}
          options={[{ v: "a", text: "80°" }, { v: "b", text: "100°" }, { v: "c", text: "90°" }, { v: "d", text: "180°" }]}
          right="b"
          support={{ yes: "Yes — wider than a right angle means the reading must be over 90.",
            notYet: "Not yet — 80 is less than a right angle, and this one is wider.",
            draw: drawSupport154, h: 100, hint: "Compare with a square corner before you read the scale." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Measure three corners at home and say whether each is acute, right or obtuse first." />;

      default: return null;
    }
  }
};
