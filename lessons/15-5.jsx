/* ===========================================================================
   Grade 4 · Topic 15 · LESSON 15-5 · Add and Subtract Angle Measures
   Standard 4.MD.C.7   I can ... add and subtract angle measures, and find a
   missing angle when the whole is known.
   =========================================================================== */

const M = {
  join: om(mt("35+55=90"), mnor(" degrees")),
  missing: om(mnor("the whole is 90, one part is 35, so the other is 55")),
  straight: om(mt("180\u2212115=65"), mnor(" degrees")),
  equation: om(mnor("part + part = whole \u00b7 whole \u2212 part = part")),
  aroundPoint: om(mt("90+90+90+90=360"), mnor(" degrees round a point")),
  checkBack: om(mnor("add the two parts back together to check")),
  rule: om(mnor("write the equation first \u00b7 then solve it")),
  swyk: om(mnor("a straight angle split into 40 and ?")),
  swykAnswer: om(mt("180\u221240=140"))
};

/* two angles joined at a shared ray */
const makeJoin155 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 40, cy = H - 50, r = Math.min(150, H - 80);

  if (step >= 1) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 35, prog: 1,
      col: "rgba(234,244,242,.6)", arcCol: "#2D70B3", label: "35\u00b0" });
  }
  if (step >= 2) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 35, deg: 55, prog: 1,
      col: "rgba(234,244,242,.6)", arcCol: "#FA7E19", label: "55\u00b0" });
  }
  if (step === 0) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 90, prog: 1,
      col: "#EAF4F2", arcCol: "#C9A227", label: "?", square: true });
  }
  if (step >= 3) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r * 0.62, start: 0, deg: 90, prog: 1,
      col: "rgba(0,0,0,0)", arcCol: "#34D399", label: false, square: true });
    D.txt(ctx, "35 + 55 = 90\u00b0", W / 2 + 116, 96,
      { size: 24, col: "#34D399", font: "marker" });
    D.txt(ctx, "the two parts make a right angle", W / 2 + 116, 128,
      { size: 12, col: "rgba(234,244,242,.7)", font: "marker" });
  }
  const heads = ["a right angle, cut into two pieces", "the first piece is 35\u00b0",
    "the second piece is 55\u00b0", "the two pieces make the whole"];
  D.txt(ctx, heads[step], W / 2, 26, { size: 13.5, col: "rgba(234,244,242,.68)", font: "marker" });
  D.txt(ctx, step === 3 ? "part plus part equals whole"
       : "no overlap, no gap \u2014 so the measures add",
    W / 2, H - 12, { size: 13, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

/* the missing angle in three settings */
const makeMissing155 = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 30, cy = H - 48, r = Math.min(140, H - 78);
  const cases = {
    right: { whole: 90, part: 35, name: "inside a right angle", eq: "90 \u2212 35 = 55" },
    straight: { whole: 180, part: 115, name: "inside a straight angle", eq: "180 \u2212 115 = 65" },
    point: { whole: 360, part: 250, name: "all the way round a point", eq: "360 \u2212 250 = 110" }
  };
  const j = cases[which];
  const shownR = which === "point" ? r * 0.86 : r;

  D.angleFig(ctx, { cx: cx, cy: cy - (which === "point" ? 44 : 0), r: shownR,
    start: 0, deg: j.part, prog: 1,
    col: "rgba(234,244,242,.6)", arcCol: "#2D70B3", label: j.part + "\u00b0" });
  D.angleFig(ctx, { cx: cx, cy: cy - (which === "point" ? 44 : 0), r: shownR,
    start: j.part, deg: j.whole - j.part, prog: 1,
    col: "rgba(234,244,242,.6)", arcCol: "#C9A227", label: "?" });

  D.txt(ctx, j.name + " \u2014 the whole is " + j.whole + "\u00b0", W / 2, 26,
    { size: 13.5, col: "rgba(234,244,242,.68)", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, j.eq, W / 2 + 96, 82, { size: 24, col: "#34D399", font: "marker" });
  D.txt(ctx, "whole minus the part you know", W / 2, H - 12,
    { size: 13, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
};

const drawWarm155 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 30, cy = H - 46, r = Math.min(134, H - 78);
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 35,
    prog: D.at(f, 20, 220), col: "rgba(234,244,242,.6)", arcCol: "#6042A6", label: "35\u00b0" });
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 35, deg: 55,
    prog: D.at(f, 240, 460), col: "rgba(234,244,242,.6)", arcCol: "#6042A6", label: "55\u00b0" });
  D.txt(ctx, "one corner, cut into two", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 480, 570) });
};

const drawStory155 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the eight-point star on the school gate", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const cx = W / 2 - 40, cy = H - 44, r = Math.min(130, H - 78);
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 35,
    prog: D.at(f, 60, 300), col: "#FA7E19", arcCol: "#2D70B3", label: "35\u00b0" });
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 35, deg: 55,
    prog: D.at(f, 200, 420), col: "#FA7E19", arcCol: "#C9A227", label: "?" });
  if (p3 > 0) {
    D.txt(ctx, "the whole corner is a right angle. how big is the second piece?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard155 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Part plus part equals whole" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 260, 460), p3 = D.at(f, 500, 700), p4 = D.at(f, 740, 940);
  const cx = W / 2 - 150, cy = 330, r = 170;

  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 35, prog: p1,
    col: "rgba(234,244,242,.6)", arcCol: "#2D70B3", label: "35\u00b0" });
  if (p2 > 0) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 35, deg: 55, prog: p2,
      col: "rgba(234,244,242,.6)", arcCol: "#FA7E19", label: "55\u00b0" });
  }
  if (p3 > 0) {
    D.txt(ctx, "35 + 55 = 90", W / 2 + 160, 150,
      { size: 26, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "90 \u2212 35 = 55", W / 2 + 160, 200,
      { size: 26, col: "#34D399", font: "marker", alpha: p3 });
    D.txt(ctx, "the same three numbers, two ways round",
      W / 2 + 160, 234, { size: 13.5, col: "rgba(234,244,242,.7)", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "write the equation before you touch the numbers",
      W / 2, H - 26, { size: 16, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 880, 955), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport155 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.angleFig(ctx, { cx: W / 2 - 20, cy: H - 10, r: H - 24, start: 0, deg: 40, prog: 1,
    col: "rgba(234,244,242,.6)", arcCol: "#2D70B3", label: "40\u00b0" });
  D.angleFig(ctx, { cx: W / 2 - 20, cy: H - 10, r: H - 24, start: 40, deg: 140, prog: 1,
    col: "rgba(234,244,242,.6)", arcCol: "#34D399", label: "140\u00b0" });
  D.txt(ctx, "a straight angle is 180\u00b0", W / 2 + 130, H / 2,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "15-5",
  storageKey: "daf-g4-t15-l5",
  title: "Add and Subtract Angle Measures",
  unit: "GRADE 4 · TOPIC 15 · LESSON 15-5 · 4.MD.C.7",
  math: M,
  ixl: ["VJY", "YUA", "MBL"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "One corner appears, then a ray splits it into two pieces. No question yet.",
      goal: "See a whole angle as the sum of its parts.",
      pull: "The two pieces sit inside one corner.",
      rail: { launch: "Describe the two pieces. Do not add anything yet.",
        monitor: ["Naming both measures", "Noticing they share a ray", "Noticing no gap"],
        connect: "What do the two pieces make together?",
        misconception: "Thinking the split changes the size of the whole." } },

    { phase: "launch", title: "The corner of the <em>school gate</em>",
      lead: "A right-angled corner of the gate star is split into a 35 degree piece and one more. Estimate the second piece.",
      goal: "Create the need for the part-part-whole equation.",
      pull: "Now let us join them properly.",
      rail: { launch: "Commit to a number before you calculate.",
        monitor: ["Subtracting from 90", "Guessing 35", "Reasoning about the right angle"],
        connect: "What must the two pieces add up to?",
        misconception: "Assuming the two pieces must be equal." } },

    { phase: "monitor", title: "Join the <em>pieces</em>",
      lead: "Two angles that share a ray simply add.",
      goal: "Additivity, shown before it is written.",
      pull: "Now work the other way.",
      rail: { launch: "Predict the total before the last step.",
        monitor: ["Adding the parts", "Checking against a right angle", "Noticing the shared ray"],
        connect: "What has to be true for the measures to add?",
        misconception: "Adding angles that overlap." } },

    { phase: "monitor", title: "Find the <em>missing</em> one",
      lead: "Right angle, straight angle, all the way round a point. Same move each time.",
      goal: "Subtraction finds a part when the whole is known.",
      pull: "Now judge some equations.",
      rail: { launch: "What is the whole in each case?",
        monitor: ["Naming the whole", "Subtracting", "Checking by adding back"],
        connect: "How do you know the whole is 180 and not 90?",
        misconception: "Using 90 as the whole for a straight angle." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each equation. No grading until the class commits.",
      goal: "Practise choosing the right whole and the right operation.",
      pull: "Two students found the same missing angle differently.",
      rail: { launch: "For each one, name the whole before you check the arithmetic.",
        monitor: ["Naming the whole", "Checking the operation", "Adding back to check"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Subtracting the whole from the part." } },

    { phase: "connect", title: "Two ways to <em>find it</em>",
      lead: "Sana subtracted from 90. Faisal counted up from 35 to 90.",
      goal: "Subtraction and counting on agree.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one they would check with.",
        monitor: ["Subtracting", "Counting on", "Adding back to check"],
        connect: "How can you prove either answer is right?",
        misconception: "Never checking the answer at all." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Thirty five plus fifty five is ninety. And ninety take thirty five is fifty five.",
      goal: "The moment the part-part-whole structure is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build both pieces with them before writing anything.",
        monitor: ["Predicting the second piece", "Writing the equation", "Checking by adding"],
        connect: "Who can say both equations?",
        misconception: "Learning the two equations as separate facts." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence covering every missing-angle question.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Naming the whole", "Writing the equation", "Solving it"],
        connect: "What are the three wholes you should know by heart?",
        misconception: "Solving before identifying the whole." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on missing angles.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. What is a straight angle worth?",
        monitor: ["Using 180", "Using 90", "Checking by adding back"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 50 by using 90 as the whole." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: choosing the right tool for the job.",
      rail: { launch: "Three students name the three wholes.",
        monitor: ["Knows 90, 180, 360", "Still guesses the whole", "Ready to choose tools"],
        connect: "Who is finding a split corner at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [which, setWhich] = useState("right");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm155} height={256} award={award}
          notices={["The corner is split in two", "One piece is 35 degrees", "The other is 55", "They share a ray"]}
          wonders={["Do they add to something neat?", "Is the whole a right angle?", "What if I only knew one piece?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory155} height={256} award={award}
          label="How big is the second piece?" min={5} max={90} start={45} unit="°"
          after="Locked. Now let us join the two pieces."
          note="The whole corner is a right angle, so the two pieces must fill it." />;

      case 2:
        return <ExploreChips draw={makeJoin155(step)} height={256}
          label="Build the whole from the parts" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the whole" }, { v: 1, label: "first piece" },
                  { v: 2, label: "second piece" }, { v: 3, label: "add them" }]}
          caption={<MathEl omml={M.join} size="xl" display="block" />}
          footnote="They share a ray, so nothing overlaps and nothing is missed." />;

      case 3:
        return <ExploreChips draw={makeMissing155(which)} height={256}
          label="Find the missing angle" value={which}
          onPick={(v) => setWhich(v)}
          chips={[{ v: "right", label: "in a right angle" }, { v: "straight", label: "in a straight angle" },
                  { v: "point", label: "round a point" }]}
          caption={<MathEl omml={M.equation} size="lg" display="block" />}
          footnote="The three wholes worth knowing: 90, 180 and 360." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "e1", text: "90 − 35 = 55", target: "yes" },
                  { id: "e2", text: "35 − 90 = 55", target: "no" },
                  { id: "e3", text: "180 − 115 = 65", target: "yes" },
                  { id: "e4", text: "90 − 115 = 25", target: "no" }]}
          targets={[{ id: "yes", label: "correct — the right whole" },
                    { id: "no", label: "not yet — check the whole" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Sana's way — subtract", omml: M.missing, h: 92,
            quote: "The whole is ninety, one part is thirty five, so ninety take thirty five." }}
          right={{ name: "Faisal's way — count on", omml: M.checkBack, h: 92,
            quote: "From thirty five up to ninety is fifty five." }}
          same={["Both give 55°", "Both use the same whole", "Both can be checked by adding"]}
          diff={["Sana subtracts", "Faisal counts on", "Faisal's is also the check"]} />;

      case 6:
        return <BoardScreen draw={drawBoard155} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "write the equation first, then solve it" }]}
          hand={"what is the whole? · what part do you know? · write it · then solve it"}
          cards={[{ title: "The parts we joined", omml: M.join, note: "part plus part is whole" },
                  { title: "Tap for all the way round", omml: M.straight, revealOmml: M.aroundPoint, reveal: true,
                    note: "a full turn is 360" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A straight angle is split into a 40 degree piece and one more. How big is the other?"
          omml={M.swyk}
          options={[{ v: "a", text: "50°" }, { v: "b", text: "140°" }, { v: "c", text: "320°" }, { v: "d", text: "40°" }]}
          right="b"
          support={{ yes: "Yes — a straight angle is 180, and 180 − 40 = 140.",
            notYet: "Not yet — a straight angle is 180 degrees, not 90.",
            draw: drawSupport155, h: 100, hint: "Name the whole first, then subtract the part you know." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a corner at home that is split in two and work out the missing piece." />;

      default: return null;
    }
  }
};
