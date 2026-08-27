/* ===========================================================================
   Grade 4 · Topic 16 · LESSON 16-2 · Classify Triangles
   Standard 4.G.A.2   I can ... classify a triangle by its angles and by its
   sides, and know that every triangle gets one name from each list.
   =========================================================================== */

const M = {
  byAngles: om(mnor("by angles: right \u00b7 acute \u00b7 obtuse")),
  bySides: om(mnor("by sides: equilateral \u00b7 isosceles \u00b7 scalene")),
  twoNames: om(mnor("every triangle gets one name from each list")),
  rightScalene: om(mnor("this one is right and scalene")),
  equalMarks: om(mnor("the tick marks show which sides are equal")),
  onlyOne: om(mnor("a triangle can have at most one right or obtuse angle")),
  rule: om(mnor("look at the angles \u00b7 then look at the sides \u00b7 give it both names")),
  swyk: om(mnor("three equal sides \u2014 what is it?")),
  swykAnswer: om(mnor("equilateral, and acute"))
};

const TRI162 = {
  right: { pts: [[0, 1], [0, 0], [1.35, 1]], right: [1], ticks: [0, 0, 0],
    angleName: "right", sideName: "scalene" },
  acute: { pts: [[0, 1], [0.62, 0], [1.24, 1]], right: [], ticks: [1, 1, 2],
    angleName: "acute", sideName: "isosceles" },
  obtuse: { pts: [[0, 1], [0.42, 0.42], [1.5, 1]], right: [], ticks: [0, 0, 0],
    angleName: "obtuse", sideName: "scalene" },
  equi: { pts: [[0, 1], [0.55, 0.048], [1.1, 1]], right: [], ticks: [1, 1, 1],
    angleName: "acute", sideName: "equilateral" }
};

/* one triangle, drawn to fill the panel, with both names */
const makeTri162 = (key) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const j = TRI162[key];
  const s = Math.min(140, H - 116);
  const x0 = W / 2 - s * 0.78, y0 = 50;
  const pts = j.pts.map((p) => [x0 + p[0] * s, y0 + p[1] * s]);

  D.polyFig(ctx, { pts: pts, prog: 1, col: "#2D70B3", sideTicks: j.ticks,
    rightAngles: j.right, fill: true });

  D.txt(ctx, "by its angles", W / 2 + 130, 74,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker" });
  D.txt(ctx, j.angleName, W / 2 + 130, 100,
    { size: 21, col: "#FA7E19", font: "marker" });
  D.txt(ctx, "by its sides", W / 2 + 130, 140,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker" });
  D.txt(ctx, j.sideName, W / 2 + 130, 166,
    { size: 21, col: "#34D399", font: "marker" });

  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "one name from each list, every single time",
    W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
};

/* what the tick marks mean */
const makeTicks162 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const sets = {
    0: { ticks: [0, 0, 0], name: "scalene", sub: "no sides marked \u2014 all three are different" },
    2: { ticks: [1, 1, 0], name: "isosceles", sub: "two sides carry one tick each, so those two match" },
    3: { ticks: [1, 1, 1], name: "equilateral", sub: "all three carry a tick, so all three match" }
  };
  const j = sets[n];
  const s = Math.min(138, H - 112);
  const x0 = W / 2 - s * 0.9, y0 = 48;
  const pts = [[x0, y0 + s], [x0 + s * 0.6, y0], [x0 + s * 1.2, y0 + s]];

  D.polyFig(ctx, { pts: pts, prog: 1, col: "#6042A6", sideTicks: j.ticks, fill: true });
  D.txt(ctx, j.name, W / 2 + 132, 108, { size: 24, col: "#34D399", font: "marker" });
  D.txt(ctx, "sides with the same number of ticks are equal", W / 2, 26,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  D.txt(ctx, j.sub, W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
};

const drawWarm162 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const keys = ["right", "acute", "obtuse"];
  const bw = (W - 60) / 3;
  keys.forEach((k, i) => {
    const a = D.at(f, 30 + i * 150, 200 + i * 150);
    if (a <= 0) return;
    const j = TRI162[k];
    const s = Math.min(bw - 40, H - 120);
    const x0 = 30 + i * bw + 12, y0 = 54;
    ctx.save(); ctx.globalAlpha = a;
    D.polyFig(ctx, { pts: j.pts.map((p) => [x0 + p[0] * s * 0.7, y0 + p[1] * s]),
      prog: 1, col: "#6042A6", rightAngles: j.right, fill: true });
    ctx.restore();
  });
  D.txt(ctx, "three triangles, all quite different", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 510, 600) });
};

const drawStory162 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the roof trusses in the sports hall", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let k = 0; k < 3; k++) {
    const a = D.at(f, 60 + k * 100, 200 + k * 100);
    if (a <= 0) continue;
    const bx = 70 + k * ((W - 140) / 3);
    const bw = (W - 140) / 3 - 24;
    ctx.save(); ctx.globalAlpha = a;
    D.polyFig(ctx, { pts: [[bx, 152], [bx + bw / 2, 62], [bx + bw, 152]],
      prog: 1, col: "#FA7E19", sideTicks: [1, 1, 0], fill: true });
    ctx.restore();
  }
  if (p3 > 0) {
    D.txt(ctx, "how many names does each of these triangles deserve?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard162 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Two lists, one name from each" });
  const p3 = D.at(f, 520, 720), p4 = D.at(f, 760, 940);
  const keys = ["right", "acute", "obtuse"];
  const bw = (W - 300) / 3;

  keys.forEach((k, i) => {
    const a = D.at(f, 20 + i * 150, 170 + i * 150);
    if (a <= 0) return;
    const j = TRI162[k];
    const s = 108;
    const x0 = 160 + i * bw, y0 = 100;
    ctx.save(); ctx.globalAlpha = a;
    D.polyFig(ctx, { pts: j.pts.map((p) => [x0 + p[0] * s * 0.9, y0 + p[1] * s]),
      prog: 1, col: "#2D70B3", rightAngles: j.right, sideTicks: j.ticks, fill: true });
    ctx.restore();
    D.txt(ctx, j.angleName, x0 + s * 0.5, 244,
      { size: 15, col: "#FA7E19", font: "marker", alpha: a });
    D.txt(ctx, j.sideName, x0 + s * 0.5, 268,
      { size: 15, col: "#34D399", font: "marker", alpha: a });
  });

  if (p3 > 0) {
    D.txt(ctx, "angles: right \u00b7 acute \u00b7 obtuse", W / 2, 320,
      { size: 17, col: "#FA7E19", font: "marker", alpha: p3 });
    D.txt(ctx, "sides: equilateral \u00b7 isosceles \u00b7 scalene", W / 2, 352,
      { size: 17, col: "#34D399", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "a triangle can have at most one right or obtuse angle",
      W / 2, H - 26, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport162 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = H - 24;
  D.polyFig(ctx, { pts: [[W / 2 - s * 0.55, 12 + s], [W / 2, 12], [W / 2 + s * 0.55, 12 + s]],
    prog: 1, col: "#2D70B3", sideTicks: [1, 1, 1], fill: true });
  D.txt(ctx, "three ticks \u2014 all three sides equal", W / 2 + s, H / 2,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "16-2",
  storageKey: "daf-g4-t16-l2",
  title: "Classify Triangles",
  unit: "GRADE 4 · TOPIC 16 · LESSON 16-2 · 4.G.A.2",
  math: M,
  ixl: ["7QK", "5UV", "U59"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Three triangles appear, one after another. No question yet.",
      goal: "Notice that they differ in two separate ways.",
      pull: "Some differ in their corners, some in their sides.",
      rail: { launch: "Describe the three triangles. Do not sort them yet.",
        monitor: ["Describing the corners", "Describing the sides", "Noticing the square corner"],
        connect: "Are you describing corners or sides?",
        misconception: "Sorting by size or orientation instead of shape." } },

    { phase: "launch", title: "The roof <em>trusses</em>",
      lead: "The sports hall roof is made of triangles. How many names does each one deserve?",
      goal: "Create the need for two independent classifications.",
      pull: "Now let us name them.",
      rail: { launch: "Commit to a number of names before we start.",
        monitor: ["Saying one name", "Saying two", "Asking what counts as a name"],
        connect: "Could one triangle honestly have two correct names?",
        misconception: "Assuming each triangle has exactly one name." } },

    { phase: "monitor", title: "Two names, one <em>triangle</em>",
      lead: "Look at the angles for the first name. Look at the sides for the second.",
      goal: "Both classifications always apply.",
      pull: "But what do the tick marks mean?",
      rail: { launch: "Predict both names before you tap.",
        monitor: ["Naming by angles", "Naming by sides", "Giving only one name"],
        connect: "Which name did you find easier to see?",
        misconception: "Believing a right triangle cannot also be isosceles." } },

    { phase: "monitor", title: "What the <em>ticks</em> mean",
      lead: "Sides with the same number of ticks have the same length.",
      goal: "Read side markings correctly rather than eyeballing.",
      pull: "Now sort some triangles.",
      rail: { launch: "Count the ticks before you name it.",
        monitor: ["Counting the ticks", "Matching ticks to names", "Measuring by eye"],
        connect: "Why do we mark the sides instead of measuring them?",
        misconception: "Judging equal sides by eye on a stretched drawing." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each statement. No grading until the class commits.",
      goal: "Practise both classifications under scrutiny.",
      pull: "Two students named the same triangle differently.",
      rail: { launch: "For each one, decide whether it is about angles or sides.",
        monitor: ["Separating the two lists", "Checking the ticks", "Checking the corner"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Claiming a triangle can have two right angles." } },

    { phase: "connect", title: "Two <em>true</em> names",
      lead: "Khalil called it right-angled. Yousef called it scalene. Neither is wrong.",
      goal: "The two lists are independent, not competing.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask whether either is wrong.",
        monitor: ["Naming by angle", "Naming by side", "Combining both"],
        connect: "What is the full name of the triangle?",
        misconception: "Arguing about which single name is correct." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Angles first. Then sides. Every triangle gets one name from each list.",
      goal: "The moment the double classification is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Name all three triangles with them, twice over.",
        monitor: ["Predicting the angle name", "Predicting the side name", "Restating the rule"],
        connect: "Who can give a full two-word name?",
        misconception: "Learning six names as one flat list." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Two lists, and every triangle you will ever meet fits both.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Checking the angles", "Counting the ticks", "Giving both names"],
        connect: "Why can there be at most one obtuse angle?",
        misconception: "Believing equilateral triangles have no angle name." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on double classification.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Give it both names.",
        monitor: ["Naming equilateral", "Adding the angle name", "Giving only one name"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Stopping at 'equilateral' without an angle name." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: sorting four-sided shapes.",
      rail: { launch: "Three students give a full two-word name.",
        monitor: ["Gives both names", "Still gives one", "Ready for quadrilaterals"],
        connect: "Who is finding a triangle at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [key, setKey] = useState("right");
    const [n, setN] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm162} height={256} award={award}
          notices={["One has a square corner", "One is tall and thin", "One is stretched sideways", "One has two equal sides"]}
          wonders={["Do they have names?", "Is it about corners or sides?", "Can one triangle have two names?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory162} height={256} award={award}
          label="How many names does each triangle deserve?" min={1} max={4} start={1} unit="names"
          after="Locked. Now let us look at angles and sides separately."
          note="There are two completely different things you could look at." />;

      case 2:
        return <ExploreChips draw={makeTri162(key)} height={256}
          label="Give it both names" value={key}
          onPick={(v) => setKey(v)}
          chips={[{ v: "right", label: "square corner" }, { v: "acute", label: "all corners small" },
                  { v: "obtuse", label: "one wide corner" }, { v: "equi", label: "all sides equal" }]}
          caption={<MathEl omml={M.twoNames} size="xl" display="block" />}
          footnote="The angle name and the side name are decided independently." />;

      case 3:
        return <ExploreChips draw={makeTicks162(n)} height={256}
          label="Read the tick marks" value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 0, label: "no ticks" }, { v: 2, label: "two ticks" }, { v: 3, label: "three ticks" }]}
          caption={<MathEl omml={M.equalMarks} size="lg" display="block" />}
          footnote="Never judge equal sides by eye — read the marks." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "a triangle can be right and scalene", target: "yes" },
                  { id: "b2", text: "a triangle can have two right angles", target: "no" },
                  { id: "b3", text: "equilateral triangles are acute", target: "yes" },
                  { id: "b4", text: "scalene means two equal sides", target: "no" }]}
          targets={[{ id: "yes", label: "true" },
                    { id: "no", label: "not yet — check the two lists" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Khalil's way — by the angles", omml: M.byAngles, h: 92,
            quote: "It has a square corner, so it is a right triangle." }}
          right={{ name: "Yousef's way — by the sides", omml: M.bySides, h: 92,
            quote: "No two sides are marked equal, so it is scalene." }}
          same={["Both describe the same triangle", "Both are correct", "Both read the markings"]}
          diff={["Khalil looks at corners", "Yousef looks at sides", "Together they give the full name"]} />;

      case 6:
        return <BoardScreen draw={drawBoard162} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "look at the angles, then the sides, and give it both names" }]}
          hand={"angles: right, acute, obtuse · sides: equilateral, isosceles, scalene"}
          cards={[{ title: "The triangle we named", omml: M.rightScalene, note: "one name from each list" },
                  { title: "Tap for a limit", omml: M.twoNames, revealOmml: M.onlyOne, reveal: true,
                    note: "the other two angles must be small" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A triangle has three sides marked equal. What are its two names?" omml={M.swyk}
          options={[{ v: "a", text: "scalene, right" }, { v: "b", text: "equilateral, acute" },
                    { v: "c", text: "isosceles, obtuse" }, { v: "d", text: "equilateral only" }]}
          right="b"
          support={{ yes: "Yes — three equal sides means all three angles are equal and small.",
            notYet: "Not yet — every triangle also gets an angle name.",
            draw: drawSupport162, h: 96, hint: "Three ticks means equilateral, and all its corners are under 90." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a triangle at home and give it both names, angles first." />;

      default: return null;
    }
  }
};
