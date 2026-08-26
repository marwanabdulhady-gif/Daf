/* ===========================================================================
   Grade 4 · Topic 16 · LESSON 16-1 · Lines
   Standard 4.G.A.1   I can ... tell parallel, perpendicular and intersecting
   lines apart, and find them in real things.
   =========================================================================== */

const M = {
  parallel: om(mnor("parallel lines never meet, however far they run")),
  perpendicular: om(mnor("perpendicular lines meet at a right angle")),
  intersecting: om(mnor("intersecting lines cross at one point")),
  both: om(mnor("perpendicular lines are intersecting lines with a square corner")),
  test: om(mnor("do they meet? \u00b7 if so, is the corner square?")),
  notParallel: om(mnor("lines that look close can still meet eventually")),
  rule: om(mnor("ask whether they meet \u00b7 then ask what kind of corner")),
  swyk: om(mnor("two lines cross at a square corner")),
  swykAnswer: om(mnor("perpendicular"))
};

/* the three relationships, one at a time */
const makePair161 = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const info = {
    parallel: { label: "parallel", sub: "the arrows show they never meet",
      meet: "no", corner: "\u2014" },
    perpendicular: { label: "perpendicular", sub: "the small square marks a right angle",
      meet: "yes", corner: "square" },
    intersecting: { label: "intersecting", sub: "they cross, but not at a right angle",
      meet: "yes", corner: "not square" }
  };
  const j = info[kind];
  D.lineFig(ctx, { x: 80, y: 42, w: W - 160, h: 104, kind: kind, prog: 1,
    col: "#2D70B3", label: j.label, sub: j.sub });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "do they meet? " + j.meet + "        corner: " + j.corner,
    W / 2, H - 32, { size: 14, col: "#C9A227", font: "marker" });
  D.txt(ctx, "two questions settle every pair of lines", W / 2, H - 10,
    { size: 12.5, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

/* real things in the school, with the lines called out */
const makeReal161 = (thing) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cy = H / 2 + 6;

  if (thing === "window") {
    D.polyFig(ctx, { pts: [[cx - 140, cy - 62], [cx + 140, cy - 62], [cx + 140, cy + 62], [cx - 140, cy + 62]],
      prog: 1, col: "#2D70B3", rightAngles: [0, 1, 2, 3], fill: false, width: 2.4 });
    D.marker(ctx, [[cx, cy - 62], [cx, cy + 62]], 1, "#FA7E19", 2.2);
    D.marker(ctx, [[cx - 140, cy], [cx + 140, cy]], 1, "#FA7E19", 2.2);
    D.txt(ctx, "the classroom window frame", cx, 26,
      { size: 13, col: "rgba(234,244,242,.68)", font: "marker" });
    D.txt(ctx, "the two long sides are parallel \u00b7 every corner is perpendicular",
      cx, H - 14, { size: 13, col: "#C9A227", font: "marker" });
  } else if (thing === "rails") {
    D.marker(ctx, [[70, cy - 34], [W - 70, cy - 34]], 1, "#2D70B3", 3);
    D.marker(ctx, [[70, cy + 34], [W - 70, cy + 34]], 1, "#2D70B3", 3);
    for (let k = 0; k < 7; k++) {
      const x = 92 + k * ((W - 184) / 6);
      D.marker(ctx, [[x, cy - 46], [x, cy + 46]], 1, "rgba(250,126,25,.75)", 2);
    }
    D.txt(ctx, "the railing along the Corniche", cx, 26,
      { size: 13, col: "rgba(234,244,242,.68)", font: "marker" });
    D.txt(ctx, "the two rails are parallel \u00b7 each post is perpendicular to both",
      cx, H - 14, { size: 13, col: "#C9A227", font: "marker" });
  } else {
    D.marker(ctx, [[70, cy + 52], [W - 70, cy - 52]], 1, "#2D70B3", 3);
    D.marker(ctx, [[70, cy - 58], [W - 70, cy + 44]], 1, "#388C46", 3);
    const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
    ctx.save();
    ctx.globalAlpha = pulse + 0.4;
    ctx.beginPath(); ctx.arc(cx + 4, cy - 4, 13, 0, Math.PI * 2);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "two paths crossing in the school garden", cx, 26,
      { size: 13, col: "rgba(234,244,242,.68)", font: "marker" });
    D.txt(ctx, "they intersect \u2014 but the corner is not square",
      cx, H - 14, { size: 13, col: "#C9A227", font: "marker" });
  }
};

const drawWarm161 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const kinds = ["parallel", "perpendicular", "intersecting"];
  const bw = (W - 60) / 3;
  kinds.forEach((k, i) => {
    const a = D.at(f, 30 + i * 140, 190 + i * 140);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    D.lineFig(ctx, { x: 20 + i * bw, y: 52, w: bw - 14, h: 96, kind: k, prog: 1, col: "#6042A6" });
    ctx.restore();
  });
  D.txt(ctx, "three pairs of lines, side by side", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 500, 590) });
};

const drawStory161 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the railing along the Corniche", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const cy = H / 2 + 8;
  D.marker(ctx, [[70, cy - 30], [W - 70, cy - 30]], D.at(f, 50, 220), "#FA7E19", 3);
  D.marker(ctx, [[70, cy + 30], [W - 70, cy + 30]], D.at(f, 150, 320), "#FA7E19", 3);
  for (let k = 0; k < 7; k++) {
    const a = D.at(f, 240 + k * 22, 330 + k * 22);
    if (a <= 0) continue;
    const x = 92 + k * ((W - 184) / 6);
    ctx.save(); ctx.globalAlpha = a;
    D.marker(ctx, [[x, cy - 42], [x, cy + 42]], 1, "#2D70B3", 2);
    ctx.restore();
  }
  if (p3 > 0) {
    D.txt(ctx, "how many kinds of line pair can you find here?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard161 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Two questions settle every pair" });
  const kinds = [
    { k: "parallel", label: "parallel", at: [20, 200] },
    { k: "perpendicular", label: "perpendicular", at: [220, 400] },
    { k: "intersecting", label: "intersecting", at: [420, 600] }
  ];
  const bw = (W - 300) / 3;
  kinds.forEach((j, i) => {
    const a = D.at(f, j.at[0], j.at[1]);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    D.lineFig(ctx, { x: 150 + i * bw, y: 96, w: bw - 20, h: 110, kind: j.k, prog: 1,
      col: "#2D70B3", label: j.label });
    ctx.restore();
  });

  const p3 = D.at(f, 620, 800), p4 = D.at(f, 800, 930);
  if (p3 > 0) {
    D.txt(ctx, "1 \u00b7 do they ever meet?", W / 2, 282,
      { size: 18, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "2 \u00b7 if they do, is the corner square?", W / 2, 318,
      { size: 18, col: "#EAF4F2", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "perpendicular lines are just intersecting lines with a square corner",
      W / 2, H - 26, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 860, 935), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport161 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.lineFig(ctx, { x: 40, y: 8, w: W - 80, h: H - 34, kind: "perpendicular", prog: 1,
    col: "#2D70B3", label: "a square corner where they cross" });
};

const LESSON = {
  code: "16-1",
  storageKey: "daf-g4-t16-l1",
  title: "Lines",
  unit: "GRADE 4 · TOPIC 16 · LESSON 16-1 · 4.G.A.1",
  math: M,
  ixl: ["JL7", "DSU"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Three pairs of lines appear side by side. No question yet.",
      goal: "Notice the two things that distinguish them before any name is given.",
      pull: "Two of these pairs meet. One never will.",
      rail: { launch: "Describe the three pairs. Do not name them yet.",
        monitor: ["Noticing one pair never meets", "Noticing a square corner", "Noticing the arrows"],
        connect: "What two questions would sort all three?",
        misconception: "Deciding by how the lines are tilted." } },

    { phase: "launch", title: "The railing at the <em>Corniche</em>",
      lead: "The railing has two long rails and a row of posts. How many kinds of line pair can you find?",
      goal: "Create the need for precise line vocabulary.",
      pull: "Now let us name each pair.",
      rail: { launch: "Commit to a number before you name anything.",
        monitor: ["Spotting the parallel rails", "Spotting perpendicular posts", "Missing one relationship"],
        connect: "Which pair of lines will never meet, however long the railing?",
        misconception: "Saying the rails meet because the drawing stops." } },

    { phase: "monitor", title: "Meet, or <em>never meet</em>?",
      lead: "Two questions, in order. Do they meet? If so, is the corner square?",
      goal: "The classification becomes two yes-or-no questions.",
      pull: "Now find them in real things.",
      rail: { launch: "Predict the name before you tap.",
        monitor: ["Asking whether they meet", "Checking the corner", "Naming correctly"],
        connect: "Which two names could describe the same pair?",
        misconception: "Believing perpendicular and intersecting are opposites." } },

    { phase: "monitor", title: "Find them in <em>real things</em>",
      lead: "A window, a railing, two garden paths.",
      goal: "The vocabulary attaches to things students see every day.",
      pull: "Now judge some statements.",
      rail: { launch: "Point at a pair of lines before you tap.",
        monitor: ["Finding parallel pairs", "Finding right angles", "Finding a non-square crossing"],
        connect: "Which real object had all three kinds?",
        misconception: "Assuming all crossings are perpendicular." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each statement. No grading until the class commits.",
      goal: "Test the two-question routine under scrutiny.",
      pull: "Two students described the same pair differently.",
      rail: { launch: "For each one, ask the two questions in order.",
        monitor: ["Asking whether they meet", "Checking the corner", "Guessing from the picture"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Calling any crossing pair perpendicular." } },

    { phase: "connect", title: "Two true <em>descriptions</em>",
      lead: "Qais said the window corner is perpendicular. Ziad said those lines intersect.",
      goal: "Perpendicular is a special case of intersecting.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask whether either is wrong.",
        monitor: ["Naming perpendicular", "Naming intersecting", "Seeing the overlap"],
        connect: "Which description tells you more?",
        misconception: "Thinking only one of the two names can be correct." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Do they meet? If they do, is the corner square? That is the whole classification.",
      goal: "The moment the routine is taught.",
      pull: "Say the two questions.",
      rail: { launch: "Draw all three pairs with them.",
        monitor: ["Predicting each name", "Asking the two questions", "Restating the overlap"],
        connect: "Who can say both questions in order?",
        misconception: "Memorising three names with no test." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Two questions, three names, no guessing.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Asking whether they meet", "Checking the corner", "Naming the pair"],
        connect: "Can a pair be parallel and perpendicular at once?",
        misconception: "Believing parallel lines can meet if drawn long enough." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on line vocabulary.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Do they meet, and is the corner square?",
        monitor: ["Answering perpendicular", "Answering intersecting", "Answering parallel"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering parallel for lines that clearly cross." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: sorting triangles by their sides and angles.",
      rail: { launch: "Three students name a pair of lines they saw today.",
        monitor: ["Uses the two questions", "Still guesses", "Ready for triangles"],
        connect: "Who is finding parallel lines at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [kind, setKind] = useState("parallel");
    const [thing, setThing] = useState("window");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm161} height={256} award={award}
          notices={["One pair never meets", "One pair makes a square corner", "One pair crosses at a slant", "They all have arrows"]}
          wonders={["Do they have names?", "Can lines meet twice?", "Is a slanted crossing special?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory161} height={256} award={award}
          label="How many kinds of line pair can you find?" min={1} max={4} start={2} unit="kinds"
          after="Locked. Now let us name each pair properly."
          note="Look at the two rails, and then at a rail and a post." />;

      case 2:
        return <ExploreChips draw={makePair161(kind)} height={256}
          label="Ask the two questions" value={kind}
          onPick={(v) => setKind(v)}
          chips={[{ v: "parallel", label: "never meet" }, { v: "perpendicular", label: "square corner" },
                  { v: "intersecting", label: "cross at a slant" }]}
          caption={<MathEl omml={M.test} size="xl" display="block" />}
          footnote="Do they meet? And if so, what kind of corner do they make?" />;

      case 3:
        return <ExploreChips draw={makeReal161(thing)} height={256}
          label="Find them in real things" value={thing}
          onPick={(v) => setThing(v)}
          chips={[{ v: "window", label: "window frame" }, { v: "rails", label: "the railing" },
                  { v: "paths", label: "garden paths" }]}
          caption={<MathEl omml={M.both} size="lg" display="block" />}
          footnote="Most crossings in the real world are not square at all." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "a1", text: "parallel lines never meet", target: "yes" },
                  { id: "a2", text: "parallel lines meet at a point", target: "no" },
                  { id: "a3", text: "perpendicular lines make a right angle", target: "yes" },
                  { id: "a4", text: "all crossing lines are perpendicular", target: "no" }]}
          targets={[{ id: "yes", label: "true — check the two questions" },
                    { id: "no", label: "not yet — ask again" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Qais's way — perpendicular", omml: M.perpendicular, h: 92,
            quote: "They cross and the corner is square, so they are perpendicular." }}
          right={{ name: "Ziad's way — intersecting", omml: M.intersecting, h: 92,
            quote: "They cross at a point, so they intersect." }}
          same={["Both describe the same pair", "Both are true", "Both say the lines meet"]}
          diff={["Qais names the corner", "Ziad only says they cross", "Qais's tells you more"]} />;

      case 6:
        return <BoardScreen draw={drawBoard161} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "ask whether they meet, then ask what kind of corner" }]}
          hand={"do they meet? · if not, parallel · if yes, is the corner square?"}
          cards={[{ title: "Never meeting", omml: M.parallel, note: "however far they run" },
                  { title: "Tap for the special crossing", omml: M.intersecting, revealOmml: M.perpendicular, reveal: true,
                    note: "intersecting, with a square corner" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Two lines cross and the corner they make is square. What are they?"
          omml={M.swyk}
          options={[{ v: "a", text: "parallel" }, { v: "b", text: "perpendicular" },
                    { v: "c", text: "not lines" }, { v: "d", text: "never meeting" }]}
          right="b"
          support={{ yes: "Yes — they intersect, and the corner is a right angle.",
            notYet: "Not yet — parallel lines never meet at all.",
            draw: drawSupport161, h: 96, hint: "They meet, and the corner is square: that is perpendicular." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a parallel pair and a perpendicular pair at home and name them out loud." />;

      default: return null;
    }
  }
};
