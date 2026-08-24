/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-10 · Model Volume
   Standard 5.MD.C.3 / 5.MD.C.5   I can ... measure volume by counting unit
   cubes, and see why length times width times height gives the same number.
   =========================================================================== */

const M = {
  unitCube: om(mnor("one unit cube has a volume of one cubic unit")),
  layer: om(mnor("one layer is 4 \u00d7 3 = 12 cubes")),
  stack: om(mnor("2 layers of 12 is 24 cubes")),
  formula: om(mnor("V = l \u00d7 w \u00d7 h")),
  worked: om(mt("4\u00d73\u00d72=24"), mnor(" cubic units")),
  cubicUnits: om(mnor("volume is counted in cubes, so the unit is cubic")),
  rule: om(mnor("count one layer \u00b7 multiply by the number of layers")),
  swyk: om(mnor("a box 5 by 2 by 3")),
  swykAnswer: om(mt("5\u00d72\u00d73=30"))
};

/* the box, built layer by layer */
const makeBox1710 = (stage) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(26, (H - 120) / 6);
  const shapes = {
    one: { L: 1, W: 1, H: 1, note: "one unit cube \u2014 volume 1 cubic unit" },
    layer: { L: 4, W: 3, H: 1, note: "one layer: 4 along and 3 across is 12 cubes" },
    full: { L: 4, W: 3, H: 2, note: "two layers of 12 is 24 cubes" }
  };
  const j = shapes[stage];
  const ox = W / 2 - (j.L - j.W) * s * 0.433 - 10;
  const oy = 78;

  D.cubePrism(ctx, { x: ox, y: oy, s: s, L: j.L, W: j.W, H: j.H, prog: 1,
    col: stage === "full" ? "#388C46" : "#2D70B3",
    lLabel: j.L + " long", wLabel: j.W + " wide", hLabel: j.H + " high" });

  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, j.note, W / 2, H - 34, { size: 14.5, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "volume = " + (j.L * j.W * j.H) + " cubic units", W / 2, H - 12,
    { size: 14, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

/* counting versus the formula */
const makeFormula1710 = (way) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(24, (H - 140) / 6);
  D.cubePrism(ctx, { x: W / 2 - 116, y: 76, s: s, L: 4, W: 3, H: 2, prog: 1,
    col: way === "formula" ? "#388C46" : "#2D70B3", labels: false });

  if (way === "count") {
    D.txt(ctx, "count every cube", W / 2 + 130, 96,
      { size: 15, col: "#2D70B3", font: "marker" });
    D.txt(ctx, "1, 2, 3 ... 24", W / 2 + 130, 128,
      { size: 21, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, "slow, and the middle ones are hidden", W / 2 + 130, 158,
      { size: 11.5, col: "rgba(234,244,242,.6)", font: "marker" });
  } else {
    D.txt(ctx, "count one layer, then the layers", W / 2 + 130, 96,
      { size: 14.5, col: "#388C46", font: "marker" });
    D.txt(ctx, "4 \u00d7 3 = 12", W / 2 + 130, 128, { size: 21, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, "12 \u00d7 2 = 24", W / 2 + 130, 158, { size: 21, col: "#34D399", font: "marker" });
  }
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, way === "formula" ? "so V = l \u00d7 w \u00d7 h, and no cube is missed"
       : "you cannot see the cubes inside the box",
    W / 2, H - 14, { size: 13.5, col: way === "formula" ? "#34D399" : "#FA7E19", font: "marker",
      alpha: pulse + 0.4 });
};

const drawWarm1710 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = 24;
  D.cubePrism(ctx, { x: W / 2 - 92, y: 82, s: s, L: 4, W: 3, H: 2,
    prog: D.at(f, 20, 480), col: "#6042A6", labels: false });
  D.txt(ctx, "a box being built out of identical cubes", W / 2, 30,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just watch", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 500, 590) });
};

const drawStory1710 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 420, 560);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "packing the school library boxes", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.cubePrism(ctx, { x: W / 2 - 92, y: 76, s: 24, L: 4, W: 3, H: 2,
    prog: D.at(f, 60, 400), col: "#FA7E19",
    lLabel: "4", wLabel: "3", hLabel: "2" });
  if (p3 > 0) {
    D.txt(ctx, "how many cube-shaped books fit in the box?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard1710 = (ctx, W, H, frame) => {
  const CYCLE = 980, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "One layer, then the layers" });
  const p2 = D.at(f, 320, 560), p3 = D.at(f, 600, 800), p4 = D.at(f, 820, 960);
  const s = 30;

  D.cubePrism(ctx, { x: 250, y: 150, s: s, L: 4, W: 3, H: 1,
    prog: D.at(f, 20, 300), col: "#2D70B3", lLabel: "4", wLabel: "3", hLabel: "1" });
  if (p2 > 0) {
    D.cubePrism(ctx, { x: W - 280, y: 150, s: s, L: 4, W: 3, H: 2,
      prog: p2, col: "#388C46", lLabel: "4", wLabel: "3", hLabel: "2" });
  }
  if (p3 > 0) {
    D.txt(ctx, "one layer is 4 \u00d7 3 = 12 cubes", W / 2, 300,
      { size: 17, col: "#2D70B3", font: "marker", alpha: p3 });
    D.txt(ctx, "two layers is 12 \u00d7 2 = 24 cubes", W / 2, 332,
      { size: 17, col: "#388C46", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "V = l \u00d7 w \u00d7 h = 24 cubic units", W / 2, 378,
      { size: 24, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "the formula is only a shortcut for counting the cubes",
      W / 2, H - 20, { size: 14.5, col: "rgba(234,244,242,.78)", font: "marker", alpha: D.at(f, 880, 970) });
    D.star8(ctx, W - 44, H - 24, 14, D.at(f, 900, 975), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport1710 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.cubePrism(ctx, { x: W / 2 - 50, y: 22, s: 12, L: 5, W: 2, H: 3, prog: 1,
    col: "#2D70B3", labels: false });
  D.txt(ctx, "5 \u00d7 2 = 10 in a layer, and 3 layers", W / 2 + 110, H / 2,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "17-10",
  storageKey: "daf-g4-t17-l10",
  title: "Model Volume",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-10 · 5.MD.C.3",
  math: M,
  ixl: ["YD2"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A box builds itself out of identical cubes. No question yet.",
      goal: "Meet volume as a count of cubes before any formula.",
      pull: "Every cube is exactly the same size.",
      rail: { launch: "Describe what is happening. Do not count yet.",
        monitor: ["Noticing the cubes are identical", "Noticing the layers", "Trying to count"],
        connect: "Why does it matter that the cubes are identical?",
        misconception: "Describing the box by its outside faces only." } },

    { phase: "launch", title: "Packing the library <em>boxes</em>",
      lead: "A box is 4 books long, 3 across and 2 high. Estimate how many books it holds.",
      goal: "Create the need for a reliable way to count hidden cubes.",
      pull: "Now let us build it up.",
      rail: { launch: "Commit to a number before you count anything.",
        monitor: ["Estimating around 24", "Adding 4, 3 and 2", "Counting the visible ones"],
        connect: "Can you see every book in the box?",
        misconception: "Answering 9 by adding the three dimensions." } },

    { phase: "monitor", title: "One cube, one layer, one <em>box</em>",
      lead: "Start with a single cube, then a layer, then the whole box.",
      goal: "Volume is built up from a unit, exactly like length and area.",
      pull: "Now compare counting with the formula.",
      rail: { launch: "How many cubes will one layer hold?",
        monitor: ["Counting one layer", "Multiplying 4 by 3", "Counting the whole box"],
        connect: "What did adding the second layer do to the count?",
        misconception: "Counting only the cubes you can see." } },

    { phase: "monitor", title: "Count, or <em>calculate</em>?",
      lead: "Counting works until the cubes are hidden. The formula never misses one.",
      goal: "The formula is justified as a safer count.",
      pull: "Now judge some volumes.",
      rail: { launch: "How many cubes are completely hidden inside?",
        monitor: ["Counting one by one", "Using layers", "Noticing hidden cubes"],
        connect: "Why is the formula safer than counting?",
        misconception: "Believing the formula is a different idea from counting." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each volume. No grading until the class commits.",
      goal: "Practise the formula and its unit.",
      pull: "Two students found the same volume differently.",
      rail: { launch: "For each one, check the unit as well as the number.",
        monitor: ["Multiplying all three", "Adding them", "Checking cubic units"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Giving a volume in square units." } },

    { phase: "connect", title: "Two ways to reach <em>24</em>",
      lead: "Layla multiplied the layer by the height. Faisal multiplied all three at once.",
      goal: "Layer-then-height and l × w × h are the same calculation.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask where the layer went in Faisal's version.",
        monitor: ["Finding the layer first", "Multiplying all three", "Comparing"],
        connect: "Which two numbers make the layer?",
        misconception: "Believing the formula must be applied in one fixed order." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One layer is twelve. Two layers is twenty four. Cubic units.",
      goal: "The moment the volume formula is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build the layer, then the second layer, with them.",
        monitor: ["Predicting the layer", "Multiplying by the height", "Naming the unit"],
        connect: "Who can say why the unit is cubic?",
        misconception: "Reporting volume with no unit at all." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One formula, and it is only a shortcut for counting cubes.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Finding the layer", "Multiplying by the height", "Writing cubic units"],
        connect: "What does each letter in the formula stand for?",
        misconception: "Learning l × w × h with no cubes behind it." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on volume.",
      pull: "Well done. That is the last lesson of Grade 4.",
      rail: { launch: "Two minutes. Find one layer first.",
        monitor: ["Finding the 10-cube layer", "Multiplying by three", "Adding the dimensions"],
        connect: "Collect answers to close the year.",
        misconception: "Answering 10 by adding 5, 2 and 3." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close the whole course on a habit, not a fact.",
      pull: "That is the end of Grade 4 — and the start of Grade 5.",
      rail: { launch: "Three students state the volume formula and its unit.",
        monitor: ["Counts then calculates", "Adds the dimensions", "Ready for Grade 5"],
        connect: "Who is measuring a box at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [stage, setStage] = useState("one");
    const [way, setWay] = useState("count");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm1710} height={256} award={award}
          notices={["The cubes are all the same", "It is built in layers", "Some cubes are hidden", "It makes a box shape"]}
          wonders={["How many cubes altogether?", "Can I count the hidden ones?", "Is there a quicker way?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory1710} height={256} award={award}
          label="How many books fit in the box?" min={5} max={60} start={20} unit="books"
          after="Locked. Now let us build it up from one cube."
          note="Four along, three across, and two layers high." />;

      case 2:
        return <ExploreChips draw={makeBox1710(stage)} height={256}
          label="Build it up" value={stage}
          onPick={(v) => setStage(v)}
          chips={[{ v: "one", label: "one cube" }, { v: "layer", label: "one layer" },
                  { v: "full", label: "the whole box" }]}
          caption={<MathEl omml={M.worked} size="xl" display="block" />}
          footnote="Volume is a count of cubes, so the unit is cubic units." />;

      case 3:
        return <ExploreChips draw={makeFormula1710(way)} height={256}
          label="Count them, or calculate?" value={way}
          onPick={(v) => setWay(v)}
          chips={[{ v: "count", label: "count every cube" }, { v: "formula", label: "layer × height" }]}
          caption={<MathEl omml={M.formula} size="lg" display="block" />}
          footnote="The formula is a shortcut for counting — not a different idea." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "h1", text: "4 × 3 × 2 = 24 cubic units", target: "yes" },
                  { id: "h2", text: "4 + 3 + 2 = 9 cubic units", target: "no" },
                  { id: "h3", text: "one layer is 12 cubes", target: "yes" },
                  { id: "h4", text: "the volume is 24 square units", target: "no" }]}
          targets={[{ id: "yes", label: "correct — cubes, counted properly" },
                    { id: "no", label: "not yet — check the working or the unit" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Layla's way — layer then height", omml: M.stack, h: 92,
            quote: "One layer is twelve, and there are two layers." }}
          right={{ name: "Faisal's way — all three at once", omml: M.formula, h: 92,
            quote: "Four times three times two. Twenty four." }}
          same={["Both give 24 cubic units", "Both use all three dimensions", "Both count every cube"]}
          diff={["Layla builds it up", "Faisal uses the formula", "Faisal's hides where the layer went"]} />;

      case 6:
        return <BoardScreen draw={drawBoard1710} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.formula, alt: "volume equals length times width times height" }]}
          hand={"count one layer · multiply by the number of layers · answer in cubic units"}
          cards={[{ title: "The box we filled", omml: M.worked, note: "twenty four cubic units" },
                  { title: "Tap for the unit", omml: M.unitCube, revealOmml: M.cubicUnits, reveal: true,
                    note: "cubes counted means cubic units" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A box is 5 cubes long, 2 wide and 3 high. What is its volume?" omml={M.swyk}
          options={[{ v: "a", text: "10 cubic units" }, { v: "b", text: "30 cubic units" },
                    { v: "c", text: "10 square units" }, { v: "d", text: "30 square units" }]}
          right="b"
          support={{ yes: "Yes — a layer of 10 cubes, three layers high.",
            notYet: "Not yet — you have found the layer; now multiply by the height.",
            draw: drawSupport1710, h: 100, hint: "5 × 2 = 10 in one layer, and 10 × 3 = 30." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a box at home, count one layer of something inside it, and work out the volume." />;

      default: return null;
    }
  }
};
