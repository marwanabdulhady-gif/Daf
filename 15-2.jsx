/* ===========================================================================
   Grade 4 · Topic 15 · LESSON 15-2 · Understand Angles and Unit Angles
   Standard 4.MD.C.5   I can ... see an angle as a fraction of a full turn, and
   understand one degree as the unit angle.
   =========================================================================== */

const M = {
  fullTurn: om(mnor("a full turn is 360 degrees")),
  quarter: om(mfrac(1, 4), mnor(" of a turn = 90 degrees")),
  turns: {
    2: om(mfrac(1, 2), mnor(" of a turn = 180 degrees")),
    3: om(mfrac(1, 3), mnor(" of a turn = 120 degrees")),
    4: om(mfrac(1, 4), mnor(" of a turn = 90 degrees")),
    6: om(mfrac(1, 6), mnor(" of a turn = 60 degrees"))
  },
  half: om(mfrac(1, 2), mnor(" of a turn = 180 degrees")),
  unitAngle: om(mnor("one degree is "), mfrac(1, 360), mnor(" of a full turn")),
  countUnits: om(mnor("an angle of 90 degrees is 90 one-degree angles side by side")),
  sixth: om(mfrac(1, 6), mnor(" of a turn = 60 degrees")),
  rule: om(mnor("cut the full turn into 360 \u00b7 each piece is one degree")),
  swyk: om(mfrac(1, 3), mnor(" of a full turn")),
  swykAnswer: om(mt("360\u00f73=120"), mnor(" degrees"))
};

/* the full turn, cut into fractions */
const makeTurn152 = (den) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 20, cy = H / 2 + 8, r = Math.min(96, H / 2 - 26);
  const deg = 360 / den;

  /* the whole circle in faint outline */
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(234,244,242,.6)"; ctx.lineWidth = 1.6; ctx.stroke();
  ctx.restore();

  /* every cut of the turn */
  for (let k = 0; k < den; k++) {
    const a = (-k * deg * Math.PI) / 180;
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = "rgba(234,244,242,.55)"; ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.stroke();
    ctx.restore();
  }

  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: deg, prog: 1,
    col: "#2D70B3", arcCol: "#C9A227", label: deg + "\u00b0", square: den === 4 });

  D.txt(ctx, "a full turn cut into " + den + " equal parts", W / 2, 26,
    { size: 13, col: "rgba(234,244,242,.68)", font: "marker" });
  D.txt(ctx, "1/" + den + " of 360\u00b0", cx + r + 62, cy - 14,
    { size: 17, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "= " + deg + "\u00b0", cx + r + 62, cy + 14,
    { size: 21, col: "#34D399", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "360 \u00f7 " + den + " = " + deg, W / 2, H - 12,
    { size: 13, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
};

/* the unit angle: one degree, stacked up */
const makeUnit152 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = 90, cy = H - 56, r = Math.min(154, H - 84);

  /* every one-degree slice up to n */
  for (let k = 0; k < n; k++) {
    const a0 = (-k * Math.PI) / 180, a1 = (-(k + 1) * Math.PI) / 180;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a0, a1, true);
    ctx.closePath();
    ctx.fillStyle = k % 10 === 0 ? "#C9A227" : "#2D70B3";
    ctx.fill();
    ctx.restore();
  }
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: n, prog: 1,
    col: "#EAF4F2", arcCol: "#34D399", label: false, square: n === 90 });

  D.txt(ctx, n + " one-degree angles, side by side", W / 2 + 30, 34,
    { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "= " + n + "\u00b0", W / 2 + 60, 70,
    { size: 26, col: "#34D399", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, n === 90 ? "ninety of them fill a square corner exactly"
       : "one degree is the unit \u2014 angles are counted in them",
    W / 2, H - 12, { size: 13, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
};

const drawWarm152 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cy = H / 2 + 10, r = Math.min(90, H / 2 - 30);
  const turn = D.at(f, 30, 460) * 360;
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(234,244,242,.6)"; ctx.lineWidth = 1.6; ctx.stroke();
  ctx.restore();
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: Math.max(1, turn), prog: 1,
    col: "#6042A6", arcCol: "#6042A6", label: false });
  D.txt(ctx, "one ray staying still, one ray turning", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just watch", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 480, 570) });
};

const drawStory152 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the classroom door swinging open", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const cx = W / 2 - 90, cy = H - 54, r = Math.min(132, H - 86);
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 90 * D.at(f, 60, 380),
    prog: 1, col: "#FA7E19", arcCol: "#C9A227", label: false });
  if (p3 > 0) {
    D.txt(ctx, "the door opened a quarter turn. how many degrees is that?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard152 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "One degree is one three-hundred-and-sixtieth" });
  const p1 = D.at(f, 20, 280), p3 = D.at(f, 480, 700), p4 = D.at(f, 740, 940);
  const cx = W / 2 - 150, cy = 232, r = 108;

  ctx.save();
  ctx.globalAlpha = p1 * 0.4;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(234,244,242,.7)"; ctx.lineWidth = 1.8; ctx.stroke();
  ctx.restore();
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 90, prog: p1,
    col: "#2D70B3", arcCol: "#C9A227", label: "90\u00b0", square: true });
  D.txt(ctx, "a full turn is 360\u00b0", cx, 100,
    { size: 16, col: "#EAF4F2", font: "marker", alpha: p1 });

  if (p3 > 0) {
    D.table(ctx, { x: W / 2 + 20, y: 138, w: 300, rh: 26,
      head: ["fraction of a turn", "degrees"],
      rows: [["1/2", "180"], ["1/4", "90"], ["1/6", "60"], ["1/360", "1"]], prog: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "an angle is measured by how many one-degree angles fit inside it",
      W / 2, H - 26, { size: 15.5, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport152 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "360 \u00f7 3 = 120", W / 2, 34, { size: 22, col: "#2D70B3", font: "marker" });
  D.txt(ctx, "a third of a full turn is 120 degrees", W / 2, H - 12,
    { size: 12, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "15-2",
  storageKey: "daf-g4-t15-l2",
  title: "Understand Angles and Unit Angles",
  unit: "GRADE 4 · TOPIC 15 · LESSON 15-2 · 4.MD.C.5",
  math: M,
  ixl: ["N72", "Q68"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "One ray stays put while the other turns all the way round. No question yet.",
      goal: "See an angle as an amount of turn rather than a shape.",
      pull: "The opening grows and grows, then closes again.",
      rail: { launch: "Describe what is happening. Do not use numbers yet.",
        monitor: ["Describing the turn", "Noticing it returns to the start", "Naming a right angle on the way"],
        connect: "How would you describe how far it has turned?",
        misconception: "Describing the angle by the length of the rays." } },

    { phase: "launch", title: "The door swinging <em>open</em>",
      lead: "The classroom door swings a quarter turn open. Estimate how many degrees that is.",
      goal: "Create the need for a unit of turn.",
      pull: "Now let us cut the full turn up.",
      rail: { launch: "Commit to a number of degrees before you calculate.",
        monitor: ["Estimating ninety", "Estimating twenty five", "Reasoning from a full turn"],
        connect: "How many degrees is a whole turn?",
        misconception: "Answering 25 because a quarter is 25 out of 100." } },

    { phase: "monitor", title: "Cut the <em>full turn</em>",
      lead: "Divide 360 into equal parts and read the angle each part makes.",
      goal: "Every common angle is a fraction of a full turn.",
      pull: "So how small can a piece be?",
      rail: { launch: "Predict the degrees before you tap.",
        monitor: ["Dividing 360", "Recognising 90", "Recognising 60"],
        connect: "Why is 360 such a convenient number to cut up?",
        misconception: "Thinking a full turn is 100 degrees." } },

    { phase: "monitor", title: "One degree is the <em>unit</em>",
      lead: "Stack one-degree slices side by side and watch them fill an angle.",
      goal: "Degrees are counted, exactly like centimetres or eighths.",
      pull: "Now judge some statements.",
      rail: { launch: "How many of these tiny slices will fill a square corner?",
        monitor: ["Counting the slices", "Recognising ninety", "Linking to the fraction"],
        connect: "How is a degree like a centimetre?",
        misconception: "Believing a degree is a length rather than an amount of turn." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each statement. No grading until the class commits.",
      goal: "Test the fraction-of-a-turn idea under scrutiny.",
      pull: "Two students described the same angle differently.",
      rail: { launch: "For each one, divide 360 in your head first.",
        monitor: ["Dividing 360", "Checking against a right angle", "Guessing"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Saying a half turn is 90 degrees." } },

    { phase: "connect", title: "Two ways to <em>say the size</em>",
      lead: "Salma said a quarter of a turn. Omar said ninety degrees.",
      goal: "Fractions of a turn and degrees are two names for one size.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one you can measure with a tool.",
        monitor: ["Using fractions", "Using degrees", "Converting between them"],
        connect: "Which one would you write on a diagram?",
        misconception: "Believing only degrees count as a real measurement." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Cut a full turn into 360. Each piece is one degree. Count them.",
      goal: "The moment the unit angle is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw the full turn first, then cut it.",
        monitor: ["Predicting the degrees", "Reading the table", "Restating the unit"],
        connect: "Who can say what one degree actually is?",
        misconception: "Treating 360 as arbitrary rather than convenient." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that turns every angle into a count.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Dividing 360", "Naming the unit", "Checking against a right angle"],
        connect: "What fraction of a turn is 30 degrees?",
        misconception: "Forgetting the full turn is 360, not 100." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on fractions of a turn.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Divide 360 by three.",
        monitor: ["Dividing 360", "Answering 33", "Checking it beats 90"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 33 by dividing 100 by three." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: measuring an angle by counting unit angles.",
      rail: { launch: "Three students say what a degree is.",
        monitor: ["Knows the full turn", "Still guesses", "Ready to measure"],
        connect: "Who is finding a right angle at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [den, setDen] = useState(4);
    const [n, setN] = useState(30);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm152} height={256} award={award}
          notices={["One ray never moves", "The other keeps turning", "It passes a square corner", "It gets back where it started"]}
          wonders={["How far has it turned?", "Is there a number for that?", "What is a whole turn worth?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory152} height={256} award={award}
          label="How many degrees is a quarter turn?" min={10} max={180} start={60} unit="°"
          after="Locked. Now let us cut the full turn up."
          note="A whole turn brings the ray right back to where it started." />;

      case 2:
        return <ExploreChips draw={makeTurn152(den)} height={256}
          label="Cut the full turn" value={den}
          onPick={(v) => setDen(v)}
          chips={[{ v: 2, label: "halves" }, { v: 3, label: "thirds" },
                  { v: 4, label: "quarters" }, { v: 6, label: "sixths" }]}
          caption={<MathEl omml={M.turns[den]} size="xl" display="block" />}
          footnote="360 divides neatly by lots of numbers — that is exactly why it was chosen." />;

      case 3:
        return <ExploreChips draw={makeUnit152(n)} height={256}
          label="Stack one-degree slices" value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 10, label: "10" }, { v: 30, label: "30" },
                  { v: 60, label: "60" }, { v: 90, label: "90" }]}
          caption={<MathEl omml={M.countUnits} size="lg" display="block" />}
          footnote="A degree is to an angle what a centimetre is to a length." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "a half turn is 180°", target: "yes" },
                  { id: "b2", text: "a half turn is 90°", target: "no" },
                  { id: "b3", text: "a sixth of a turn is 60°", target: "yes" },
                  { id: "b4", text: "a full turn is 100°", target: "no" }]}
          targets={[{ id: "yes", label: "true — 360 divided properly" },
                    { id: "no", label: "not yet — check the full turn" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Salma's way — a fraction of a turn", omml: M.quarter, h: 92,
            quote: "The door went a quarter of the way round." }}
          right={{ name: "Omar's way — in degrees", omml: M.countUnits, h: 92,
            quote: "That is ninety one-degree angles, so ninety degrees." }}
          same={["Both describe the same opening", "Both come from 360", "Both are correct"]}
          diff={["Salma uses a fraction", "Omar uses a count", "Only Omar's can be read off a protractor"]} />;

      case 6:
        return <BoardScreen draw={drawBoard152} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "cut the full turn into 360; each piece is one degree" }]}
          hand={"a full turn is 360° · a fraction of a turn is 360 divided by the denominator"}
          cards={[{ title: "The unit angle", omml: M.unitAngle, note: "one degree" },
                  { title: "Tap for another fraction", omml: M.half, revealOmml: M.sixth, reveal: true,
                    note: "360 divided by six" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="How many degrees are in one third of a full turn?" omml={M.swyk}
          options={[{ v: "a", text: "33°" }, { v: "b", text: "60°" }, { v: "c", text: "120°" }, { v: "d", text: "90°" }]}
          right="c"
          support={{ yes: "Yes — 360 ÷ 3 = 120 degrees.",
            notYet: "Not yet — a full turn is 360 degrees, not 100.",
            draw: drawSupport152, h: 90, hint: "Divide 360 by three, and check the answer beats a right angle." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Open a door a quarter turn and a half turn at home, and say the degrees out loud." />;

      default: return null;
    }
  }
};
