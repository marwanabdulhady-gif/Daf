/* ===========================================================================
   Grade 4 · Topic 16 · LESSON 16-4 · Line Symmetry
   Standard 4.G.A.3   I can ... test whether a line is a line of symmetry, and
   count how many a shape has.
   =========================================================================== */

const M = {
  test: om(mnor("fold along the line \u00b7 do the halves match exactly?")),
  square4: om(mnor("a square has four lines of symmetry")),
  rect2: om(mnor("a rectangle has two, not four")),
  none: om(mnor("some shapes have none at all")),
  notDiagonal: om(mnor("the diagonal of a rectangle is not a line of symmetry")),
  equi3: om(mnor("an equilateral triangle has three")),
  rule: om(mnor("a fold line only counts if both halves land on each other")),
  swyk: om(mnor("how many lines of symmetry does a rectangle have?")),
  swykAnswer: om(mnor("two"))
};

/* a shape with a candidate fold line, and the verdict */
const makeFold164 = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 60, cy = H / 2 + 4;
  const w = 168, h = 100;
  const cases = {
    vert: { ok: true, m: [[cx, cy - h / 2 - 18], [cx, cy + h / 2 + 18]],
      why: "the two halves land exactly on each other" },
    horiz: { ok: true, m: [[cx - w / 2 - 18, cy], [cx + w / 2 + 18, cy]],
      why: "the top folds exactly onto the bottom" },
    diag: { ok: false, m: [[cx - w / 2 - 12, cy - h / 2 - 12], [cx + w / 2 + 12, cy + h / 2 + 12]],
      why: "the long side would have to land on the short one" }
  };
  const j = cases[which];

  D.polyFig(ctx, { pts: [[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2],
                         [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]],
    prog: 1, col: "#2D70B3", rightAngles: [0, 1, 2, 3], fill: true,
    mirror: j.m, mirrorCol: j.ok ? "#34D399" : "#C74440" });

  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, j.ok ? "yes \u2014 a line of symmetry" : "no \u2014 not a line of symmetry",
    W / 2 + 120, cy - 16, { size: 17, col: j.ok ? "#34D399" : "#E0665F", font: "marker",
      alpha: pulse + 0.4 });
  D.txt(ctx, j.why, W / 2 + 120, cy + 14,
    { size: 12, col: "rgba(234,244,242,.72)", font: "marker" });
  D.txt(ctx, "fold the rectangle along the dashed line", W / 2, 26,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  D.txt(ctx, "the test is always the same: do the halves match?",
    W / 2, H - 14, { size: 12.5, col: "#C9A227", font: "marker" });
};

/* counting the lines of symmetry of different shapes */
const makeCount164 = (shape) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 40, cy = H / 2 + 6;
  const s = Math.min(72, (H - 110) / 2);

  const shapes = {
    square: { pts: [[-s, -s], [s, -s], [s, s], [-s, s]],
      lines: [[[0, -s - 16], [0, s + 16]], [[-s - 16, 0], [s + 16, 0]],
              [[-s - 12, -s - 12], [s + 12, s + 12]], [[s + 12, -s - 12], [-s - 12, s + 12]]],
      n: 4, name: "square" },
    rect: { pts: [[-s * 1.5, -s * 0.7], [s * 1.5, -s * 0.7], [s * 1.5, s * 0.7], [-s * 1.5, s * 0.7]],
      lines: [[[0, -s * 0.7 - 16], [0, s * 0.7 + 16]], [[-s * 1.5 - 16, 0], [s * 1.5 + 16, 0]]],
      n: 2, name: "rectangle" },
    tri: { pts: [[-s, s * 0.7], [0, -s], [s, s * 0.7]],
      lines: [[[0, -s - 14], [0, s * 0.7 + 14]]],
      n: 1, name: "isosceles triangle" },
    scalene: { pts: [[-s * 1.2, s * 0.7], [-s * 0.1, -s], [s * 1.3, s * 0.7]],
      lines: [], n: 0, name: "scalene triangle" }
  };
  const j = shapes[shape];
  const pts = j.pts.map((p) => [cx + p[0], cy + p[1]]);

  D.polyFig(ctx, { pts: pts, prog: 1, col: "#6042A6", fill: true, mirror: null });
  j.lines.forEach((L, k) => {
    const a = Math.min(1, Math.max(0, (frame / 4 - k * 7) / 10));
    if (a <= 0) return;
    ctx.save();
    ctx.globalAlpha = a * 0.9;
    ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.2; ctx.setLineDash([7, 5]);
    ctx.beginPath();
    ctx.moveTo(cx + L[0][0], cy + L[0][1]);
    ctx.lineTo(cx + L[1][0], cy + L[1][1]);
    ctx.stroke();
    ctx.restore();
  });

  D.txt(ctx, j.name, W / 2 + 140, cy - 22, { size: 16, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, j.n + (j.n === 1 ? " line" : " lines"), W / 2 + 140, cy + 12,
    { size: 26, col: j.n ? "#34D399" : "#E0665F", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, j.n === 0 ? "no fold makes the halves match"
       : "test every fold before you count",
    W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
};

const drawWarm164 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cy = H / 2 + 6, s = Math.min(66, (H - 100) / 2);
  D.polyFig(ctx, { pts: [[cx - s, cy - s], [cx + s, cy - s], [cx + s, cy + s], [cx - s, cy + s]],
    prog: D.at(f, 20, 220), col: "#6042A6", fill: true,
    mirror: [[cx, cy - s - 18], [cx, cy + s + 18]], mirrorAlpha: D.at(f, 240, 420) });
  D.txt(ctx, "a shape and a dashed line through it", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 470, 560) });
};

const drawStory164 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the eight-point star on the school badge", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const cx = W / 2, cy = H / 2 + 10, r = Math.min(70, (H - 110) / 2);
  D.star8(ctx, cx, cy, r, D.at(f, 60, 320), "#FA7E19", 2.6);
  for (let k = 0; k < 4; k++) {
    const a = D.at(f, 260 + k * 40, 360 + k * 40);
    if (a <= 0) continue;
    const ang = (k * Math.PI) / 4;
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    ctx.strokeStyle = "#34D399"; ctx.lineWidth = 1.8; ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(ang) * (r + 16), cy - Math.sin(ang) * (r + 16));
    ctx.lineTo(cx + Math.cos(ang) * (r + 16), cy + Math.sin(ang) * (r + 16));
    ctx.stroke();
    ctx.restore();
  }
  if (p3 > 0) {
    D.txt(ctx, "how many ways can you fold the badge in half?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard164 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Fold it: do the halves match?" });
  const p3 = D.at(f, 560, 760), p4 = D.at(f, 780, 940);
  const cy = 216, s = 74;

  const shapes = [
    { cx: 240, pts: [[-s, -s], [s, -s], [s, s], [-s, s]],
      lines: 4, label: "square \u00b7 4" },
    { cx: W / 2, pts: [[-s * 1.4, -s * 0.62], [s * 1.4, -s * 0.62], [s * 1.4, s * 0.62], [-s * 1.4, s * 0.62]],
      lines: 2, label: "rectangle \u00b7 2" },
    { cx: W - 240, pts: [[-s * 1.1, s * 0.66], [0, -s], [s * 1.15, s * 0.66]],
      lines: 0, label: "scalene \u00b7 0" }
  ];
  shapes.forEach((j, i) => {
    const a = D.at(f, 20 + i * 160, 190 + i * 160);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    D.polyFig(ctx, { pts: j.pts.map((p) => [j.cx + p[0], cy + p[1]]), prog: 1,
      col: "#2D70B3", fill: true });
    if (j.lines >= 1) {
      ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2; ctx.setLineDash([7, 5]);
      ctx.beginPath(); ctx.moveTo(j.cx, cy - s - 18); ctx.lineTo(j.cx, cy + s + 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(j.cx - s * 1.5, cy); ctx.lineTo(j.cx + s * 1.5, cy); ctx.stroke();
    }
    if (j.lines === 4) {
      ctx.beginPath(); ctx.moveTo(j.cx - s - 12, cy - s - 12); ctx.lineTo(j.cx + s + 12, cy + s + 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(j.cx + s + 12, cy - s - 12); ctx.lineTo(j.cx - s - 12, cy + s + 12); ctx.stroke();
    }
    ctx.restore();
    D.txt(ctx, j.label, j.cx, 328, { size: 15, col: "#C9A227", font: "marker", alpha: a });
  });

  if (p3 > 0) {
    D.txt(ctx, "the diagonal of a rectangle looks promising \u2014 and fails the test",
      W / 2, 366, { size: 15.5, col: "#E0665F", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "a fold line only counts if both halves land on each other",
      W / 2, H - 24, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport164 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 60, cy = H / 2, w = 120, h = 52;
  D.polyFig(ctx, { pts: [[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2],
                         [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]],
    prog: 1, col: "#2D70B3", fill: true,
    mirror: [[cx, cy - h / 2 - 12], [cx, cy + h / 2 + 12]] });
  D.txt(ctx, "one across, one down \u2014 the diagonals fail", W / 2 + 110, cy,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "16-4",
  storageKey: "daf-g4-t16-l4",
  title: "Line Symmetry",
  unit: "GRADE 4 · TOPIC 16 · LESSON 16-4 · 4.G.A.3",
  math: M,
  ixl: ["9FD", "MWS"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A shape appears, then a dashed line through it. No question yet.",
      goal: "Introduce the fold line before it is named.",
      pull: "That line is asking a question about the two halves.",
      rail: { launch: "Describe the shape and the line. Do not judge them yet.",
        monitor: ["Noticing the two halves", "Noticing the halves match", "Describing the line"],
        connect: "What would happen if you folded along the line?",
        misconception: "Thinking any line through the middle is a line of symmetry." } },

    { phase: "launch", title: "The school <em>badge</em>",
      lead: "The eight-point star on the badge can be folded in half several ways. Estimate how many.",
      goal: "Create the need for a reliable test rather than a guess.",
      pull: "Now let us test one fold at a time.",
      rail: { launch: "Commit to a number of folds before we test any.",
        monitor: ["Estimating four", "Estimating two", "Trying to picture the folds"],
        connect: "How would you check whether a fold works?",
        misconception: "Counting lines that look nice rather than testing them." } },

    { phase: "monitor", title: "Fold it and <em>check</em>",
      lead: "Three candidate lines on one rectangle. Only two of them pass.",
      goal: "The test is the definition.",
      pull: "Now count the lines on other shapes.",
      rail: { launch: "Predict pass or fail before you tap.",
        monitor: ["Applying the fold test", "Accepting the diagonal", "Explaining the failure"],
        connect: "Why does the diagonal fail on a rectangle?",
        misconception: "Assuming the diagonal of any rectangle is a line of symmetry." } },

    { phase: "monitor", title: "Count the <em>lines</em>",
      lead: "Square, rectangle, isosceles triangle, scalene triangle.",
      goal: "Systematically test all folds before counting.",
      pull: "Now judge some claims.",
      rail: { launch: "Predict the count before you tap.",
        monitor: ["Testing every fold", "Counting four for the square", "Counting zero"],
        connect: "Which shape surprised you?",
        misconception: "Assuming every shape has at least one line of symmetry." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each claim. No grading until the class commits.",
      goal: "Practise the fold test under scrutiny.",
      pull: "Two students counted the same shape differently.",
      rail: { launch: "For each one, imagine the fold before you decide.",
        monitor: ["Applying the test", "Counting from memory", "Checking the diagonal"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Saying a rectangle has four lines because a square does." } },

    { phase: "connect", title: "Two ways to <em>test it</em>",
      lead: "Joud folded the paper. Faisal checked whether each point had a matching partner.",
      goal: "Folding and matching points are the same test.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which works when you cannot fold the paper.",
        monitor: ["Folding physically", "Matching points", "Comparing the two"],
        connect: "How would you test a shape drawn on the board?",
        misconception: "Believing you must physically fold to be sure." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Four for the square. Two for the rectangle. None for the scalene triangle.",
      goal: "The moment the test is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Test every candidate line with them.",
        monitor: ["Predicting the counts", "Rejecting the diagonal", "Restating the test"],
        connect: "Who can say the test in one sentence?",
        misconception: "Counting lines without testing them." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence, and no fold line can fool you.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Applying the test", "Testing every candidate", "Counting carefully"],
        connect: "Why do we test rather than look?",
        misconception: "Trusting the eye over the fold." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on counting lines of symmetry.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Test the diagonal as well as the middles.",
        monitor: ["Testing all four", "Answering two", "Answering four"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering four because a square has four." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: drawing your own symmetrical shapes.",
      rail: { launch: "Three students state the fold test.",
        monitor: ["Tests every line", "Counts by eye", "Ready to draw"],
        connect: "Who is folding something at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [which, setWhich] = useState("vert");
    const [shape, setShape] = useState("square");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm164} height={256} award={award}
          notices={["The shape is a square", "The line goes down the middle", "The two halves look the same", "The line is dashed"]}
          wonders={["What does the line mean?", "Could I fold it?", "Are there other lines?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory164} height={256} award={award}
          label="How many ways can the badge fold in half?" min={0} max={10} start={2} unit="ways"
          after="Locked. Now let us test the folds one at a time."
          note="Every fold must leave the two halves lying exactly on top of each other." />;

      case 2:
        return <ExploreChips draw={makeFold164(which)} height={256}
          label="Test each candidate line" value={which}
          onPick={(v) => setWhich(v)}
          chips={[{ v: "vert", label: "down the middle" }, { v: "horiz", label: "across the middle" },
                  { v: "diag", label: "corner to corner" }]}
          caption={<MathEl omml={M.test} size="xl" display="block" />}
          footnote="A line through the middle is not automatically a line of symmetry." />;

      case 3:
        return <ExploreChips draw={makeCount164(shape)} height={256}
          label="Count the lines" value={shape}
          onPick={(v) => setShape(v)}
          chips={[{ v: "square", label: "square" }, { v: "rect", label: "rectangle" },
                  { v: "tri", label: "isosceles" }, { v: "scalene", label: "scalene" }]}
          caption={<MathEl omml={M.square4} size="lg" display="block" />}
          footnote="Some shapes have four. Some have one. Some have none at all." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "d1", text: "a square has 4 lines", target: "yes" },
                  { id: "d2", text: "a rectangle has 4 lines", target: "no" },
                  { id: "d3", text: "a scalene triangle has 0", target: "yes" },
                  { id: "d4", text: "every shape has at least 1", target: "no" }]}
          targets={[{ id: "yes", label: "true — the fold test agrees" },
                    { id: "no", label: "not yet — try the fold" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Joud's way — fold the paper", omml: M.test, h: 92,
            quote: "I folded it and the edges lined up exactly." }}
          right={{ name: "Faisal's way — match the points", omml: M.notDiagonal, h: 92,
            quote: "Every corner has to have a partner the same distance from the line." }}
          same={["Both are the same test", "Both reject the diagonal", "Both give 2 for a rectangle"]}
          diff={["Joud needs paper", "Faisal can do it on the board", "Faisal's works on a drawing"]} />;

      case 6:
        return <BoardScreen draw={drawBoard164} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "a fold line only counts if both halves land on each other" }]}
          hand={"draw a candidate line · fold along it · do the halves match? · then count"}
          cards={[{ title: "Four for a square", omml: M.square4, note: "two middles and two diagonals" },
                  { title: "Tap for the rectangle", omml: M.notDiagonal, revealOmml: M.rect2, reveal: true,
                    note: "the diagonals do not work" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="How many lines of symmetry does a rectangle that is not a square have?"
          omml={M.swyk}
          options={[{ v: "a", text: "0" }, { v: "b", text: "1" }, { v: "c", text: "2" }, { v: "d", text: "4" }]}
          right="c"
          support={{ yes: "Yes — one across and one down; the diagonals fail.",
            notYet: "Not yet — a rectangle is not a square, so the diagonals do not work.",
            draw: drawSupport164, h: 96, hint: "Fold corner to corner and the long side lands on the short one." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Fold three things at home in half and say how many ways each one works." />;

      default: return null;
    }
  }
};
