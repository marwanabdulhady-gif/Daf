/* ===========================================================================
   Grade 4 · Topic 16 · LESSON 16-3 · Classify Quadrilaterals
   Standard 4.G.A.2   I can ... classify four-sided shapes, and understand that
   a shape can belong to several families at once.
   =========================================================================== */

const M = {
  quad: om(mnor("a quadrilateral is any closed shape with four straight sides")),
  trapezoid: om(mnor("a trapezoid has at least one pair of parallel sides")),
  parallelogram: om(mnor("a parallelogram has two pairs of parallel sides")),
  rectangle: om(mnor("a rectangle is a parallelogram with four right angles")),
  square: om(mnor("a square is a rectangle with four equal sides")),
  nested: om(mnor("every square is a rectangle \u00b7 not every rectangle is a square")),
  rule: om(mnor("count the parallel pairs \u00b7 then check the corners \u00b7 then the sides")),
  swyk: om(mnor("four right angles and four equal sides")),
  swykAnswer: om(mnor("a square \u2014 and also a rectangle"))
};

const QUAD163 = {
  trap: { pts: [[0.16, 0], [1, 0], [1.2, 0.62], [0, 0.62]], right: [], ticks: [0, 0, 0, 0],
    name: "trapezoid", why: "one pair of parallel sides" },
  para: { pts: [[0.22, 0], [1.16, 0], [0.94, 0.62], [0, 0.62]], right: [], ticks: [1, 2, 1, 2],
    name: "parallelogram", why: "two pairs of parallel sides, opposite sides equal" },
  rect: { pts: [[0, 0], [1.2, 0], [1.2, 0.62], [0, 0.62]], right: [0, 1, 2, 3], ticks: [1, 2, 1, 2],
    name: "rectangle", why: "a parallelogram with four right angles" },
  square: { pts: [[0.1, 0], [0.72, 0], [0.72, 0.62], [0.1, 0.62]], right: [0, 1, 2, 3], ticks: [1, 1, 1, 1],
    name: "square", why: "a rectangle with four equal sides" }
};

/* the four families, one at a time */
const makeQuad163 = (key) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const j = QUAD163[key];
  const s = Math.min(180, H - 118);
  const x0 = W / 2 - 190, y0 = 54;
  const pts = j.pts.map((p) => [x0 + p[0] * s, y0 + p[1] * s * 1.5]);

  D.polyFig(ctx, { pts: pts, prog: 1, col: "#2D70B3", sideTicks: j.ticks,
    rightAngles: j.right, fill: true });

  D.txt(ctx, j.name, W / 2 + 128, 96, { size: 24, col: "#34D399", font: "marker" });
  D.txt(ctx, j.why, W / 2 + 128, 130, { size: 12.5, col: "rgba(234,244,242,.72)", font: "marker" });

  const also = { trap: "", para: "also a trapezoid", rect: "also a parallelogram and a trapezoid",
    square: "also a rectangle, a parallelogram and a trapezoid" };
  if (also[key]) {
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    D.txt(ctx, also[key], W / 2, H - 14,
      { size: 13, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
  } else {
    D.txt(ctx, "start with the widest family and work inwards",
      W / 2, H - 14, { size: 12.5, col: "rgba(234,244,242,.62)", font: "marker" });
  }
};

/* the nesting: which families does a square belong to? */
const makeNest163 = (level) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const names = ["quadrilateral", "trapezoid", "parallelogram", "rectangle", "square"];
  const cols = ["#6042A6", "#2D70B3", "#388C46", "#FA7E19", "#C9A227"];

  for (let k = 0; k <= level; k++) {
    const pad = k * 22;
    const a = k === level ? 0.6 + Math.sin(frame / 14) * 0.3 + 0.1 : 1;
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, 46 + pad, 44 + pad * 0.72, W - 92 - pad * 2, H - 116 - pad * 1.44, 10);
    ctx.strokeStyle = cols[k]; ctx.lineWidth = k === level ? 2.6 : 1.6;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, names[k], 46 + pad + 66, 44 + pad * 0.72 + 14,
      { size: 12, col: cols[k], font: "marker", alpha: a });
  }
  D.txt(ctx, "each family sits inside the one before it", W / 2, 26,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  D.txt(ctx, level >= 4 ? "a square belongs to all five families at once"
       : "keep going \u2014 the shapes get more special, not less",
    W / 2, H - 14, { size: 13.5, col: level >= 4 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawWarm163 = (ctx, W, H, frame) => {
  const CYCLE = 660, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const keys = ["trap", "para", "rect", "square"];
  const bw = (W - 60) / 4;
  keys.forEach((k, i) => {
    const a = D.at(f, 30 + i * 120, 180 + i * 120);
    if (a <= 0) return;
    const j = QUAD163[k];
    const s = Math.min(bw - 26, 96);
    const x0 = 30 + i * bw + 8, y0 = 62;
    ctx.save(); ctx.globalAlpha = a;
    D.polyFig(ctx, { pts: j.pts.map((p) => [x0 + p[0] * s, y0 + p[1] * s * 1.4]),
      prog: 1, col: "#6042A6", fill: true });
    ctx.restore();
  });
  D.txt(ctx, "four shapes, all with four sides", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 520, 610) });
};

const drawStory163 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the tiles on the school corridor floor", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const s = 74;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const a = D.at(f, 50 + (r * 4 + c) * 34, 160 + (r * 4 + c) * 34);
      if (a <= 0) continue;
      const x0 = 72 + c * ((W - 144) / 4), y0 = 50 + r * 62;
      ctx.save(); ctx.globalAlpha = a;
      D.polyFig(ctx, { pts: [[x0, y0], [x0 + s, y0], [x0 + s, y0 + 50], [x0, y0 + 50]],
        prog: 1, col: "#FA7E19", fill: true, rightAngles: r === 0 ? [0] : [] });
      ctx.restore();
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "how many correct names does one of these tiles have?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard163 = (ctx, W, H, frame) => {
  const CYCLE = 980, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Families inside families" });
  const names = ["quadrilateral", "trapezoid", "parallelogram", "rectangle", "square"];
  const cols = ["#6042A6", "#2D70B3", "#388C46", "#FA7E19", "#C9A227"];

  for (let k = 0; k < 5; k++) {
    const a = D.at(f, 20 + k * 130, 180 + k * 130);
    if (a <= 0) continue;
    const pad = k * 30;
    ctx.save(); ctx.globalAlpha = a;
    D.rr(ctx, 150 + pad, 96 + pad * 0.62, W - 300 - pad * 2, 240 - pad * 1.24, 12);
    ctx.strokeStyle = cols[k]; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, names[k], 150 + pad + 84, 96 + pad * 0.62 + 15,
      { size: 13.5, col: cols[k], font: "marker", alpha: a });
  }
  const p4 = D.at(f, 720, 940);
  if (p4 > 0) {
    D.txt(ctx, "every square is a rectangle \u2014 but not every rectangle is a square",
      W / 2, H - 26, { size: 16, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 870, 955), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport163 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = H - 30;
  D.polyFig(ctx, { pts: [[W / 2 - s / 2, 12], [W / 2 + s / 2, 12], [W / 2 + s / 2, 12 + s], [W / 2 - s / 2, 12 + s]],
    prog: 1, col: "#2D70B3", rightAngles: [0, 1, 2, 3], sideTicks: [1, 1, 1, 1], fill: true });
  D.txt(ctx, "four right angles and four equal sides", W / 2 + s, H / 2,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "16-3",
  storageKey: "daf-g4-t16-l3",
  title: "Classify Quadrilaterals",
  unit: "GRADE 4 · TOPIC 16 · LESSON 16-3 · 4.G.A.2",
  math: M,
  ixl: ["A6V", "6CT", "PTK", "58M"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Four shapes appear, and every one of them has four sides. No question yet.",
      goal: "See that four-sided shapes vary in specific, describable ways.",
      pull: "One of them is a special version of another.",
      rail: { launch: "Describe the four shapes. Do not name them yet.",
        monitor: ["Noticing parallel sides", "Noticing right angles", "Noticing equal sides"],
        connect: "Which two shapes are most alike?",
        misconception: "Sorting by size or tilt rather than by properties." } },

    { phase: "launch", title: "The corridor <em>tiles</em>",
      lead: "Every tile on the corridor floor has four sides. How many correct names does one tile have?",
      goal: "Create the need for a family structure rather than one label each.",
      pull: "Now let us build the families.",
      rail: { launch: "Commit to a number of names before we start.",
        monitor: ["Saying one", "Saying more than one", "Asking what counts"],
        connect: "Could one shape honestly belong to several families?",
        misconception: "Assuming each shape has exactly one name." } },

    { phase: "monitor", title: "Four <em>families</em>",
      lead: "Count the parallel pairs, then check the corners, then check the sides.",
      goal: "Each family is defined by adding one condition.",
      pull: "So which families does a square belong to?",
      rail: { launch: "Predict the name before you tap.",
        monitor: ["Counting parallel pairs", "Checking right angles", "Checking equal sides"],
        connect: "What did each new family add?",
        misconception: "Thinking a rectangle is not a parallelogram." } },

    { phase: "monitor", title: "Families inside <em>families</em>",
      lead: "Each family sits inside the one before it. A square is at the very centre.",
      goal: "The hierarchy, made visible.",
      pull: "Now judge some statements.",
      rail: { launch: "Predict which box the square will end up in.",
        monitor: ["Following the nesting", "Naming all the families", "Reversing the nesting"],
        connect: "Why is the square box the smallest?",
        misconception: "Reversing the hierarchy: 'every rectangle is a square'." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each statement. No grading until the class commits.",
      goal: "Force careful reasoning about 'every' and 'some'.",
      pull: "Two students described the same tile differently.",
      rail: { launch: "For each one, try to find a shape that breaks it.",
        monitor: ["Testing with a counter-example", "Checking the nesting", "Guessing"],
        connect: "Which statement needed a counter-example?",
        misconception: "Believing 'every rectangle is a square'." } },

    { phase: "connect", title: "Two <em>true</em> names",
      lead: "Reem called the tile a rectangle. Ibrahim called it a parallelogram.",
      goal: "A shape can carry several correct names at once.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask whether either is wrong.",
        monitor: ["Naming the most specific", "Naming a wider family", "Listing both"],
        connect: "Which name is the most useful, and why?",
        misconception: "Insisting only the most specific name is correct." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Quadrilateral, trapezoid, parallelogram, rectangle, square. Each one inside the last.",
      goal: "The moment the hierarchy is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw the nested boxes with them.",
        monitor: ["Predicting the next box", "Naming the condition added", "Restating the nesting"],
        connect: "Who can say the five families in order?",
        misconception: "Learning the five names as an unordered list." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Three checks, in order, and every quadrilateral finds its families.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Counting parallel pairs", "Checking corners", "Checking sides"],
        connect: "What is the one-way sentence about squares and rectangles?",
        misconception: "Reversing 'every square is a rectangle'." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on the hierarchy.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Name it, then name its family.",
        monitor: ["Naming square", "Adding rectangle", "Naming only one"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Saying a square is not a rectangle." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: folding shapes in half.",
      rail: { launch: "Three students name a shape and its families.",
        monitor: ["Uses the hierarchy", "Gives one name only", "Ready for symmetry"],
        connect: "Who is naming a tile at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [key, setKey] = useState("trap");
    const [level, setLevel] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm163} height={256} award={award}
          notices={["All four have four sides", "Some have right angles", "Some have parallel sides", "One has all sides equal"]}
          wonders={["Do they all have names?", "Is a square a rectangle?", "Which is the most special?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory163} height={256} award={award}
          label="How many correct names does one tile have?" min={1} max={5} start={1} unit="names"
          after="Locked. Now let us build the families."
          note="Think about parallel sides, right angles and equal sides separately." />;

      case 2:
        return <ExploreChips draw={makeQuad163(key)} height={256}
          label="Add one condition at a time" value={key}
          onPick={(v) => setKey(v)}
          chips={[{ v: "trap", label: "trapezoid" }, { v: "para", label: "parallelogram" },
                  { v: "rect", label: "rectangle" }, { v: "square", label: "square" }]}
          caption={<MathEl omml={M.rectangle} size="xl" display="block" />}
          footnote="Each family adds one more condition to the family before it." />;

      case 3:
        return <ExploreChips draw={makeNest163(level)} height={256}
          label="Nest the families" value={level}
          onPick={(v) => setLevel(v)}
          chips={[{ v: 0, label: "quadrilateral" }, { v: 1, label: "trapezoid" },
                  { v: 2, label: "parallelogram" }, { v: 3, label: "rectangle" }, { v: 4, label: "square" }]}
          caption={<MathEl omml={M.nested} size="lg" display="block" />}
          footnote="The boxes get smaller because the shapes get more special." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "every square is a rectangle", target: "yes" },
                  { id: "c2", text: "every rectangle is a square", target: "no" },
                  { id: "c3", text: "every rectangle is a parallelogram", target: "yes" },
                  { id: "c4", text: "every trapezoid is a parallelogram", target: "no" }]}
          targets={[{ id: "yes", label: "true — the nesting says so" },
                    { id: "no", label: "not yet — find a counter-example" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Reem's way — the specific name", omml: M.rectangle, h: 92,
            quote: "Four right angles and two pairs of parallel sides. It is a rectangle." }}
          right={{ name: "Ibrahim's way — the wider family", omml: M.parallelogram, h: 92,
            quote: "Both pairs of opposite sides are parallel, so it is a parallelogram." }}
          same={["Both describe the same tile", "Both are true", "Both check parallel sides"]}
          diff={["Reem names the smallest family", "Ibrahim names a wider one", "Reem's tells you more"]} />;

      case 6:
        return <BoardScreen draw={drawBoard163} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "count the parallel pairs, then check the corners, then the sides" }]}
          hand={"four sides? · how many parallel pairs? · right angles? · equal sides?"}
          cards={[{ title: "The tightest family", omml: M.square, note: "a rectangle with equal sides" },
                  { title: "Tap for the one-way sentence", omml: M.rectangle, revealOmml: M.nested, reveal: true,
                    note: "it only works in one direction" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A shape has four right angles and four equal sides. What is it?" omml={M.swyk}
          options={[{ v: "a", text: "only a square" }, { v: "b", text: "a square and a rectangle" },
                    { v: "c", text: "only a rectangle" }, { v: "d", text: "a trapezoid only" }]}
          right="b"
          support={{ yes: "Yes — and it is also a parallelogram and a trapezoid.",
            notYet: "Not yet — a square meets every condition a rectangle needs.",
            draw: drawSupport163, h: 96, hint: "Every square passes the rectangle test as well." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a four-sided shape at home and list every family it belongs to." />;

      default: return null;
    }
  }
};
