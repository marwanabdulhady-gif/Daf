/* ===========================================================================
   Grade 4 · Topic 15 · LESSON 15-1 · Lines, Rays, and Angles
   Standard 4.G.A.1   I can ... name a point, line, line segment, ray and angle,
   and tell them apart by what happens at the ends.
   =========================================================================== */

const M = {
  point: om(mnor("a point marks one exact place")),
  segment: om(mnor("a segment has two endpoints")),
  ray: om(mnor("a ray has one endpoint and goes on forever the other way")),
  line: om(mnor("a line goes on forever in both directions")),
  angle: om(mnor("an angle is two rays sharing one endpoint")),
  ends: om(mnor("count the endpoints, then count the arrows")),
  vertex: om(mnor("the shared endpoint is called the vertex")),
  rule: om(mnor("the ends tell you the name \u00b7 dot stops, arrow does not")),
  swyk: om(mnor("one endpoint, one arrow \u2014 what is it?")),
  swykAnswer: om(mnor("a ray"))
};

/* the four figures, one at a time */
const makeFig151 = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const info = {
    segment: { label: "line segment", sub: "two endpoints \u2014 it stops at both ends" },
    ray: { label: "ray", sub: "one endpoint, one arrow \u2014 it stops once" },
    line: { label: "line", sub: "two arrows \u2014 it never stops" },
    point: { label: "point", sub: "one exact place, no length at all" }
  };
  const j = info[kind];
  D.lineFig(ctx, { x: 70, y: 52, w: W - 140, h: 76, kind: kind, prog: 1,
    col: "#2D70B3", label: j.label, sub: j.sub });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "endpoints: " + (kind === "segment" ? "2" : kind === "ray" ? "1" : kind === "point" ? "1" : "0") +
       "    arrows: " + (kind === "line" ? "2" : kind === "ray" ? "1" : "0"),
    W / 2, H - 34, { size: 14, col: "#C9A227", font: "marker" });
  D.txt(ctx, "the ends are the whole story", W / 2, H - 12,
    { size: 12.5, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

/* the angle: two rays sharing a vertex */
const makeAngle151 = (deg) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.angleFig(ctx, { cx: W / 2 - 40, cy: H - 82, r: Math.min(124, H - 112), start: 0, deg: deg,
    prog: 1, col: "#2D70B3", arcCol: "#C9A227",
    label: deg + "\u00b0", square: deg === 90 });
  D.txt(ctx, "two rays, one shared endpoint", W / 2, 26,
    { size: 13, col: "rgba(234,244,242,.65)", font: "marker" });
  D.txt(ctx, "the shared endpoint is the vertex", W / 2 + 66, H - 48,
    { size: 12, col: "#C9A227", font: "marker" });
  const names = { 45: "acute \u2014 less than a right angle", 90: "right \u2014 exactly a square corner",
    130: "obtuse \u2014 more than a right angle", 180: "straight \u2014 a flat line" };
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, names[deg], W / 2, H - 12,
    { size: 14, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

const drawWarm151 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const kinds = ["segment", "ray", "line"];
  kinds.forEach((k, i) => {
    const a = D.at(f, 30 + i * 150, 180 + i * 150);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    D.lineFig(ctx, { x: 70, y: 40 + i * 58, w: W - 140, h: 34, kind: k, prog: 1, col: "#6042A6" });
    ctx.restore();
  });
  D.txt(ctx, "three drawings that look almost the same", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look at the ends", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 480, 570) });
};

const drawStory151 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the prayer mat lines in the school hall", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.lineFig(ctx, { x: 70, y: 48, w: W - 140, h: 60, kind: "parallel",
    prog: D.at(f, 60, 300), col: "#FA7E19" });
  D.angleFig(ctx, { cx: W / 2 - 60, cy: H - 46, r: 78, start: 0, deg: 50,
    prog: D.at(f, 240, 460), col: "#2D70B3", arcCol: "#C9A227", label: false });
  if (p3 > 0) {
    D.txt(ctx, "which of these is a line, and which is an angle?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard151 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Read the ends, then name it" });
  const kinds = [
    { k: "segment", label: "segment", at: [20, 190] },
    { k: "ray", label: "ray", at: [200, 370] },
    { k: "line", label: "line", at: [380, 550] }
  ];
  kinds.forEach((j, i) => {
    const a = D.at(f, j.at[0], j.at[1]);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    D.lineFig(ctx, { x: 140, y: 92 + i * 66, w: W / 2 - 180, h: 40, kind: j.k,
      prog: 1, col: "#2D70B3", label: j.label });
    ctx.restore();
  });

  const p3 = D.at(f, 560, 760), p4 = D.at(f, 780, 940);
  if (p3 > 0) {
    D.angleFig(ctx, { cx: W / 2 + 110, cy: 250, r: 108, start: 0, deg: 55,
      prog: p3, col: "#388C46", arcCol: "#C9A227", label: "angle" });
    D.txt(ctx, "two rays that share a vertex", W / 2 + 150, 288,
      { size: 13.5, col: "rgba(234,244,242,.7)", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "a dot means it stops \u00b7 an arrow means it never does",
      W / 2, H - 26, { size: 16, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport151 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.lineFig(ctx, { x: 30, y: 14, w: W - 60, h: 34, kind: "ray", prog: 1,
    col: "#2D70B3", label: "one dot, one arrow" });
};

const LESSON = {
  code: "15-1",
  storageKey: "daf-g4-t15-l1",
  title: "Lines, Rays, and Angles",
  unit: "GRADE 4 · TOPIC 15 · LESSON 15-1 · 4.G.A.1",
  math: M,
  ixl: ["9MK", "R5K"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Three drawings appear that look almost identical. No question yet.",
      goal: "Force attention onto the ends before any name is given.",
      pull: "The middles are the same. The ends are not.",
      rail: { launch: "Describe the three drawings. Do not name them yet.",
        monitor: ["Noticing the dots", "Noticing the arrows", "Saying the middles match"],
        connect: "What is actually different between them?",
        misconception: "Judging by length instead of by the ends." } },

    { phase: "launch", title: "Lines in the school <em>hall</em>",
      lead: "The prayer mat lines run down the hall, and two of them meet at a corner. Which parts are lines, and which are angles?",
      goal: "Create the need for precise geometric names.",
      pull: "Now let us name them properly.",
      rail: { launch: "Point at something you would call a line. Now something you would call an angle.",
        monitor: ["Naming the straight parts", "Naming the corner", "Confusing the two"],
        connect: "Can an angle exist without rays?",
        misconception: "Calling the whole corner shape a line." } },

    { phase: "monitor", title: "Count the <em>ends</em>",
      lead: "Two endpoints, one endpoint, or none at all. That is the whole classification.",
      goal: "The names become a counting exercise, not vocabulary to memorise.",
      pull: "Now build an angle out of two rays.",
      rail: { launch: "Predict the name before you tap.",
        monitor: ["Counting the dots", "Counting the arrows", "Naming correctly"],
        connect: "Which two are easiest to mix up, and why?",
        misconception: "Calling a ray a line because it looks long." } },

    { phase: "monitor", title: "Two rays make an <em>angle</em>",
      lead: "Keep one ray still and swing the other. The opening is the angle.",
      goal: "Introduce acute, right, obtuse and straight as sizes of opening.",
      pull: "Now sort some figures.",
      rail: { launch: "Predict the name before you tap each size.",
        monitor: ["Comparing to a right angle", "Naming acute and obtuse", "Spotting the straight angle"],
        connect: "What is the benchmark you are comparing everything to?",
        misconception: "Thinking a longer ray means a bigger angle." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each statement. No grading until the class commits.",
      goal: "Catch the classic vocabulary confusions as a group.",
      pull: "Two students described the same figure differently.",
      rail: { launch: "For each one, count the ends before you decide.",
        monitor: ["Counting endpoints", "Checking arrows", "Checking the vertex"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Believing a segment and a line are the same thing drawn differently." } },

    { phase: "connect", title: "Two ways to <em>describe it</em>",
      lead: "Noura described the corner by its rays. Ziad described it by how far it opens.",
      goal: "A figure has both a structure and a size.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one would let you draw it.",
        monitor: ["Describing the rays", "Describing the opening", "Naming the vertex"],
        connect: "Which description tells you the size?",
        misconception: "Believing naming a figure also tells you its measure." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "A dot means it stops. An arrow means it never does.",
      goal: "The moment the classification is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw all four with them, side by side.",
        monitor: ["Predicting the ends", "Naming each figure", "Locating the vertex"],
        connect: "Who can name all four without looking?",
        misconception: "Memorising the names without the endpoint rule." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that names every straight figure you will meet.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Counting endpoints", "Counting arrows", "Naming the vertex"],
        connect: "What does an angle need that a line does not?",
        misconception: "Forgetting that an angle needs a shared endpoint." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on the vocabulary.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Count the dots, then the arrows.",
        monitor: ["Counting one dot", "Counting one arrow", "Naming a ray"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 'line' because part of it has an arrow." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: what an angle actually measures.",
      rail: { launch: "Three students name a figure they saw today.",
        monitor: ["Names all four", "Still mixes ray and line", "Ready to measure"],
        connect: "Who is spotting an angle at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("segment");
    const [deg, setDeg] = useState(45);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm151} height={256} award={award}
          notices={["One has dots at both ends", "One has an arrow", "One has two arrows", "The middles look the same"]}
          wonders={["Do they have different names?", "Does the arrow mean forever?", "Which one is a line?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory151} height={256} award={award}
          label="How many different figures can you name here?" min={1} max={6} start={2} unit="names"
          after="Locked. Now let us name each one carefully."
          note="Look at what happens at the ends of every drawing." />;

      case 2:
        return <ExploreChips draw={makeFig151(kind)} height={256}
          label="Count the ends" value={kind}
          onPick={(v) => setKind(v)}
          chips={[{ v: "point", label: "point" }, { v: "segment", label: "segment" },
                  { v: "ray", label: "ray" }, { v: "line", label: "line" }]}
          caption={<MathEl omml={M.ends} size="xl" display="block" />}
          footnote="A dot stops the figure. An arrow says it carries on forever." />;

      case 3:
        return <ExploreChips draw={makeAngle151(deg)} height={256}
          label="Swing the second ray" value={deg}
          onPick={(v) => setDeg(v)}
          chips={[{ v: 45, label: "acute" }, { v: 90, label: "right" },
                  { v: 130, label: "obtuse" }, { v: 180, label: "straight" }]}
          caption={<MathEl omml={M.angle} size="lg" display="block" />}
          footnote="The rays can be any length — only the opening matters." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "a1", text: "a ray has one endpoint", target: "yes" },
                  { id: "a2", text: "a segment has one endpoint", target: "no" },
                  { id: "a3", text: "an angle has a vertex", target: "yes" },
                  { id: "a4", text: "a line has two endpoints", target: "no" }]}
          targets={[{ id: "yes", label: "true — check the ends" },
                    { id: "no", label: "not yet — count again" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Noura's way — describe the parts", omml: M.angle, h: 92,
            quote: "Two rays, and they share their endpoint. That endpoint is the vertex." }}
          right={{ name: "Ziad's way — describe the opening", omml: M.vertex, h: 92,
            quote: "It opens less than a square corner, so it is an acute angle." }}
          same={["Both describe the same figure", "Both mention the vertex", "Both are correct"]}
          diff={["Noura names the parts", "Ziad names the size", "Only Ziad's tells you how wide it is"]} />;

      case 6:
        return <BoardScreen draw={drawBoard151} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "the ends tell you the name; a dot stops, an arrow does not" }]}
          hand={"count the dots · count the arrows · then say the name"}
          cards={[{ title: "The figure we named", omml: M.ray, note: "one dot, one arrow" },
                  { title: "Tap for the angle", omml: M.segment, revealOmml: M.angle, reveal: true,
                    note: "two rays with a shared endpoint" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A figure has one endpoint and one arrow. What is it?" omml={M.swyk}
          options={[{ v: "a", text: "a line" }, { v: "b", text: "a ray" }, { v: "c", text: "a segment" }, { v: "d", text: "an angle" }]}
          right="b"
          support={{ yes: "Yes — one end stops, the other goes on forever.",
            notYet: "Not yet — a line has arrows at both ends.",
            draw: drawSupport151, h: 90, hint: "One dot and one arrow is exactly a ray." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a ray, a segment and an angle somewhere at home and name each one out loud." />;

      default: return null;
    }
  }
};
