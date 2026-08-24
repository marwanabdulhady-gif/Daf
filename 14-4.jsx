/* ===========================================================================
   Grade 4 · Topic 14 · LESSON 14-4 · Problem Solving: Look For and Use
   Structure
   Standard MP.7 · 4.OA.C.5   I can ... find the structure in a growing pattern
   and write a rule that reaches any figure without building it.
   =========================================================================== */

const M = {
  figures: om(mnor("figure 1 has 4 tiles \u00b7 figure 2 has 7 \u00b7 figure 3 has 10")),
  step: om(mnor("each figure adds 3 tiles")),
  structure: om(mnor("1 tile in the middle, then 3 arms of the figure number")),
  ruleDirect: om(mnor("tiles = 3 \u00d7 figure number + 1")),
  test: om(mt("3\u00d73+1=10"), mnor(" \u2014 it fits figure 3")),
  far: om(mt("3\u00d720+1=61"), mnor(" tiles in figure 20")),
  rule: om(mnor("see the part that repeats and the part that never changes")),
  swyk: om(mnor("figure 10 \u2014 how many tiles?")),
  swykAnswer: om(mt("3\u00d710+1=31"))
};

/* the growing tile figure: a centre plus three arms */
const drawFig144 = (ctx, cx, cy, n, s, hot, a) => {
  ctx.save();
  ctx.globalAlpha = a;
  /* the fixed centre tile */
  D.rr(ctx, cx - s / 2, cy - s / 2, s, s, 3);
  ctx.fillStyle = hot === "centre" ? "#C9A227" : "#6042A6";
  ctx.globalAlpha = a * 0.7; ctx.fill();
  ctx.globalAlpha = a;
  ctx.strokeStyle = "rgba(234,244,242,.75)"; ctx.lineWidth = 1.3; ctx.stroke();
  /* three arms of length n */
  const dirs = [[0, -1], [1, 0], [0, 1]];
  dirs.forEach((d) => {
    for (let k = 1; k <= n; k++) {
      D.rr(ctx, cx - s / 2 + d[0] * k * s, cy - s / 2 + d[1] * k * s, s, s, 3);
      ctx.fillStyle = hot === "arms" ? "#34D399" : "#2D70B3";
      ctx.globalAlpha = a * 0.62; ctx.fill();
      ctx.globalAlpha = a;
      ctx.strokeStyle = "rgba(234,244,242,.6)"; ctx.lineWidth = 1.1; ctx.stroke();
    }
  });
  ctx.restore();
};

/* the first three figures side by side */
const makeGrow144 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = 17;
  const slots = 3;
  for (let k = 0; k < slots; k++) {
    const on = k < n;
    const cx = (W / (slots + 1)) * (k + 1);
    const a = on ? 1 : 0.16;
    drawFig144(ctx, cx, 112, k + 1, s, null, a);
    D.txt(ctx, "figure " + (k + 1), cx, H - 56,
      { size: 12, col: on ? "#EAF4F2" : "rgba(234,244,242,.28)", font: "marker" });
    D.txt(ctx, (3 * (k + 1) + 1) + " tiles", cx, H - 36,
      { size: 13, col: on ? "#C9A227" : "rgba(234,244,242,.25)", font: "marker" });
  }
  D.txt(ctx, "the figures grow \u2014 what stays the same?", W / 2, 26,
    { size: 13, col: "rgba(234,244,242,.65)", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, n >= 3 ? "4, 7, 10 \u2014 three more tiles each time"
       : "keep going",
    W / 2, H - 12, { size: 13.5, col: n >= 3 ? "#34D399" : "#C9A227", font: "marker",
      alpha: pulse + 0.4 });
};

/* the structure: one fixed tile plus three arms */
const makeStruct144 = (part) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  drawFig144(ctx, W / 2 - 40, 108, 3, 20, part, 1);

  const lines = {
    none: ["figure 3, built from twenty by twenty tiles", ""],
    centre: ["one tile never moves \u2014 the centre", "that is the + 1 in the rule"],
    arms: ["three arms, each as long as the figure number", "that is the 3 \u00d7 figure number"]
  };
  const j = lines[part] || lines.none;
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, j[0], W / 2, H - 42, { size: 15,
    col: part === "centre" ? "#C9A227" : part === "arms" ? "#34D399" : "rgba(234,244,242,.7)",
    font: "marker", alpha: part ? pulse + 0.4 : 1 });
  if (j[1]) {
    D.txt(ctx, j[1], W / 2, H - 18,
      { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
  }
  if (part === "arms" || part === "centre") {
    D.txt(ctx, "tiles = 3 \u00d7 figure + 1", W / 2 + 130, 108,
      { size: 16, col: "#C9A227", font: "marker" });
  }
};

const drawWarm144 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  for (let k = 0; k < 3; k++) {
    const a = D.at(f, 30 + k * 130, 160 + k * 130);
    if (a <= 0) continue;
    drawFig144(ctx, (W / 4) * (k + 1), 116, k + 1, 16, null, a);
    D.txt(ctx, "figure " + (k + 1), (W / 4) * (k + 1), H - 40,
      { size: 11.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: a });
  }
  D.txt(ctx, "three figures from the same family", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 14,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 480, 570) });
};

const drawStory144 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the mosaic border being laid in the school hall", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let k = 0; k < 3; k++) {
    const a = D.at(f, 60 + k * 110, 190 + k * 110);
    if (a <= 0) continue;
    drawFig144(ctx, (W / 4) * (k + 1), 112, k + 1, 16, null, a);
    D.txt(ctx, (3 * (k + 1) + 1) + " tiles", (W / 4) * (k + 1), H - 44,
      { size: 12, col: "#FA7E19", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "how many tiles will figure twenty need?", W / 2, H - 14,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard144 = (ctx, W, H, frame) => {
  const CYCLE = 980, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "One fixed tile, three growing arms" });
  const p2 = D.at(f, 300, 500), p3 = D.at(f, 520, 720), p4 = D.at(f, 760, 960);

  drawFig144(ctx, W / 2 - 130, 150, 3, 22, null, D.at(f, 20, 260));

  if (p2 > 0) {
    D.txt(ctx, "the centre tile never changes", W / 2 + 110, 116,
      { size: 15, col: "#C9A227", font: "marker", alpha: p2 });
    D.txt(ctx, "the three arms are as long as the figure number",
      W / 2 + 110, 148, { size: 15, col: "#34D399", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "tiles = 3 \u00d7 figure + 1", W / 2 + 110, 200,
      { size: 21, col: "#2D70B3", font: "marker", alpha: p3 });
    D.table(ctx, { x: W / 2 - 40, y: 250, w: 300, rh: 24, head: ["figure", "tiles"],
      rows: [["1", "4"], ["2", "7"], ["3", "10"], ["20", "61"]], prog: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "figure 20 needs 61 tiles \u2014 and nobody built it",
      W / 2, H - 52, { size: 19, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "look for the part that repeats and the part that never moves",
      W / 2, H - 24, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 850, 960) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 890, 970), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport144 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.table(ctx, { x: 26, y: 6, w: W - 52, rh: 22, head: ["figure", "tiles"],
    rows: [["1", "4"], ["2", "7"], ["10", "31"]], prog: 1 });
};

const LESSON = {
  code: "14-4",
  storageKey: "daf-g4-t14-l4",
  title: "Problem Solving: Look For and Use Structure",
  unit: "GRADE 4 · TOPIC 14 · LESSON 14-4 · MP.7 · 4.OA.C.5",
  math: M,
  ixl: ["NVV"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Three tile figures from the same family appear one after another. No question yet.",
      goal: "Let the class see both the growth and the fixed part.",
      pull: "Something in these figures never changes.",
      rail: { launch: "Describe the three figures. Do not count anything yet.",
        monitor: ["Describing the arms", "Noticing the centre tile", "Counting tiles"],
        connect: "What is the same in all three figures?",
        misconception: "Seeing only the growth and missing the fixed centre." } },

    { phase: "launch", title: "The mosaic <em>border</em>",
      lead: "Figure 1 uses 4 tiles, figure 2 uses 7, figure 3 uses 10. Estimate the tiles in figure 20.",
      goal: "Create the need for structure rather than counting.",
      pull: "Now let us look at how the figure is built.",
      rail: { launch: "Commit to a number before you calculate.",
        monitor: ["Estimating around sixty", "Multiplying 20 by 4", "Adding three repeatedly"],
        connect: "Would you want to build figure twenty to find out?",
        misconception: "Answering 80 by multiplying the figure number by four." } },

    { phase: "monitor", title: "Watch it <em>grow</em>",
      lead: "Add one figure at a time and read the tile counts underneath.",
      goal: "Establish the step of three before explaining it.",
      pull: "But where does the three come from?",
      rail: { launch: "Predict the next tile count before you tap.",
        monitor: ["Adding three", "Reading the counts", "Noticing the arms grow"],
        connect: "Why does it go up by exactly three?",
        misconception: "Expecting the step to grow as the figures get bigger." } },

    { phase: "monitor", title: "Take the figure <em>apart</em>",
      lead: "One tile in the middle that never moves. Three arms that grow with the figure number.",
      goal: "The structure explains the rule instead of just fitting it.",
      pull: "Now judge some rules.",
      rail: { launch: "Which tiles change, and which one does not?",
        monitor: ["Identifying the centre", "Counting arm length", "Linking to the rule"],
        connect: "Where does the plus one come from?",
        misconception: "Writing 3 × figure and forgetting the centre tile." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each rule. No grading until the class commits.",
      goal: "Reject rules that fit figure one but nothing else.",
      pull: "Two students found the same answer differently.",
      rail: { launch: "Test every rule on figure three, not figure one.",
        monitor: ["Testing on figure three", "Accepting from figure one", "Checking the plus one"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Accepting 'figure × 4' because it fits figure one." } },

    { phase: "connect", title: "Two ways to reach figure <em>twenty</em>",
      lead: "Layla added three, nineteen times. Yousef used three times twenty plus one.",
      goal: "The structural rule beats the step rule at distance.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one they would trust.",
        monitor: ["Adding repeatedly", "Using the rule", "Checking they agree"],
        connect: "How many additions did Layla have to get right?",
        misconception: "Adding three twenty times instead of nineteen." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Three arms of the figure number, plus one tile that never moves.",
      goal: "The moment structure is taught as the source of the rule.",
      pull: "Say it in one sentence.",
      rail: { launch: "Take the figure apart with them before writing the rule.",
        monitor: ["Naming the fixed part", "Naming the growing part", "Writing the rule"],
        connect: "Who can point at the plus one in the picture?",
        misconception: "Treating the rule as a pattern in the numbers only." } },

    { phase: "synth", title: "The habit \u2014 <em>and why it works</em>",
      lead: "One sentence you can use on any growing pattern you ever meet.",
      goal: "Generalise the habit, not this rule.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Finding the fixed part", "Finding the repeated part", "Testing the rule"],
        connect: "What must you always do before trusting a rule?",
        misconception: "Writing a rule without testing it on a second figure." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on using a structural rule.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Use the rule, do not count tiles.",
        monitor: ["Using 3 × 10 + 1", "Forgetting the plus one", "Adding three ten times"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 30 by leaving out the centre tile." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close the topic on a habit, not a fact.",
      pull: "Tomorrow: Topic 15 — measuring and drawing angles.",
      rail: { launch: "Three students name the fixed and growing parts.",
        monitor: ["Finds structure first", "Still counts", "Ready for angles"],
        connect: "Who is finding a growing pattern at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [part, setPart] = useState(null);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm144} height={256} award={award}
          notices={["Each figure has three arms", "The arms get longer", "There is one tile in the middle", "The middle tile never moves"]}
          wonders={["How many tiles in figure ten?", "Is there a rule?", "Why three arms?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory144} height={256} award={award}
          label="How many tiles in figure twenty?" min={20} max={120} start={50} unit="tiles"
          after="Locked. Now let us look at how the figure is built."
          note="Figure 3 needs ten tiles, and each figure adds three more." />;

      case 2:
        return <ExploreChips draw={makeGrow144(n)} height={256}
          label="Add a figure at a time" value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 1, label: "figure 1" }, { v: 2, label: "figure 2" }, { v: 3, label: "figure 3" }]}
          caption={<MathEl omml={M.figures} size="xl" display="block" />}
          footnote="Four, seven, ten. The step is three — but why three?" />;

      case 3:
        return <ExploreChips draw={makeStruct144(part)} height={256}
          label="Take the figure apart" value={part}
          onPick={(v) => setPart(v)}
          chips={[{ v: "centre", label: "the fixed tile" }, { v: "arms", label: "the three arms" }]}
          caption={<MathEl omml={M.ruleDirect} size="lg" display="block" />}
          footnote="The picture explains the rule — it does not just happen to fit it." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "d1", text: "tiles = 3 × figure + 1", target: "yes" },
                  { id: "d2", text: "tiles = figure × 4", target: "no" },
                  { id: "d3", text: "each figure adds 3", target: "yes" },
                  { id: "d4", text: "tiles = 3 × figure", target: "no" }]}
          targets={[{ id: "yes", label: "works on every figure" },
                    { id: "no", label: "not yet — test it on figure 3" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Layla's way — add three, again and again", omml: M.step, h: 92,
            quote: "Four, seven, ten, thirteen ... I kept adding three." }}
          right={{ name: "Yousef's way — use the structure", omml: M.far, h: 92,
            quote: "Three arms of twenty, plus the middle tile. Sixty one." }}
          same={["Both give 61 tiles", "Both fit the picture", "Both use the step of three"]}
          diff={["Layla adds nineteen times", "Yousef calculates once", "Only Yousef's reaches figure 200"]} />;

      case 6:
        return <BoardScreen draw={drawBoard144} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "see the part that repeats and the part that never changes" }]}
          hand={"what never changes? · what grows, and by how much? · write it · test it"}
          cards={[{ title: "The structure we found", omml: M.structure, note: "a centre and three arms" },
                  { title: "Tap to test the rule", omml: M.ruleDirect, revealOmml: M.test, reveal: true,
                    note: "it must fit a figure you can actually count" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Using the same pattern, how many tiles does figure 10 need?" omml={M.swyk}
          options={[{ v: "a", text: "30" }, { v: "b", text: "31" }, { v: "c", text: "40" }, { v: "d", text: "13" }]}
          right="b"
          support={{ yes: "Yes — three arms of ten, plus the centre tile.",
            notYet: "Not yet — do not forget the tile in the middle.",
            draw: drawSupport144, h: 96, hint: "3 × 10 = 30 arm tiles, and then + 1 for the centre." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Build a growing pattern from three objects at home and write a rule for the tenth one." />;

      default: return null;
    }
  }
};
