/* ===========================================================================
   Grade 4 · Topic 16 · LESSON 16-5 · Draw Shapes with Line Symmetry
   Standard 4.G.A.3   I can ... complete a shape so that a given line becomes a
   line of symmetry.
   =========================================================================== */

const M = {
  mirrorPoint: om(mnor("every point must have a partner the same distance the other side")),
  measure: om(mnor("count the squares to the line, then count the same again")),
  join: om(mnor("mark all the partners first \u00b7 join them last")),
  checkFold: om(mnor("check by folding: the halves must land on each other")),
  twoLines: om(mnor("a shape can be built to have two lines of symmetry")),
  wrongJoin: om(mnor("joining before marking gives a lopsided shape")),
  rule: om(mnor("reflect every corner \u00b7 then join \u00b7 then fold to check")),
  swyk: om(mnor("a corner 3 squares left of the line")),
  swykAnswer: om(mnor("its partner is 3 squares right of the line"))
};

/* the grid-and-mirror builder */
const makeBuild165 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const g = 22;
  const cols = Math.floor((W - 120) / g), rows = Math.floor((H - 90) / g);
  const x0 = W / 2 - (cols * g) / 2, y0 = 44;
  const mx = x0 + Math.floor(cols / 2) * g;

  /* the grid */
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "rgba(234,244,242,.7)"; ctx.lineWidth = 1;
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath(); ctx.moveTo(x0 + c * g, y0); ctx.lineTo(x0 + c * g, y0 + rows * g); ctx.stroke();
  }
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath(); ctx.moveTo(x0, y0 + r * g); ctx.lineTo(x0 + cols * g, y0 + r * g); ctx.stroke();
  }
  ctx.restore();

  /* the mirror line */
  ctx.save();
  ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.4; ctx.setLineDash([7, 5]);
  ctx.beginPath(); ctx.moveTo(mx, y0 - 8); ctx.lineTo(mx, y0 + rows * g + 8); ctx.stroke();
  ctx.restore();

  /* the given half: corners in grid units left of the line */
  const half = [[-3, 0], [-1, 0], [-1, 2], [-3, 4]];
  const abs = (p) => [mx + p[0] * g, y0 + p[1] * g];
  const dot = (p, col, a) => {
    ctx.save(); ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(p[0], p[1], 5, 0, Math.PI * 2);
    ctx.fillStyle = col; ctx.fill(); ctx.restore();
  };

  D.marker(ctx, half.map(abs), 1, "#2D70B3", 2.6);
  half.forEach((p) => dot(abs(p), "#2D70B3", 1));

  if (step >= 1) {
    half.forEach((p, k) => {
      const a = Math.min(1, Math.max(0, (frame / 5 - k * 8) / 12));
      if (a <= 0) return;
      const q = abs([-p[0], p[1]]);
      dot(q, "#C9A227", a);
      ctx.save();
      ctx.globalAlpha = a * 0.55;
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(abs(p)[0], abs(p)[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
      ctx.restore();
    });
  }
  if (step >= 2) {
    D.marker(ctx, half.map((p) => abs([-p[0], p[1]])), 1, "#FA7E19", 2.6);
    D.marker(ctx, [abs(half[0]), abs([-half[0][0], half[0][1]])], 1, "#FA7E19", 2.6);
    D.marker(ctx, [abs(half[3]), abs([-half[3][0], half[3][1]])], 1, "#FA7E19", 2.6);
  }
  const heads = ["half a shape, and a mirror line",
    "mark each corner's partner \u2014 same distance, other side",
    "now join the partners up"];
  D.txt(ctx, heads[step], W / 2, 24, { size: 13, col: "rgba(234,244,242,.68)", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, step === 2 ? "fold along the green line and the halves land exactly"
       : "count the squares across \u2014 never guess the distance",
    W / 2, H - 12, { size: 13, col: step === 2 ? "#34D399" : "#C9A227", font: "marker",
      alpha: pulse + 0.4 });
};

/* mark first or join first? */
const makeOrder165 = (way) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cy = H / 2 + 6, g = 24;
  const half = [[-3, -2], [-1, -2], [-1, 0], [-3, 2]];
  const abs = (p) => [cx + p[0] * g, cy + p[1] * g];
  const wrong = [[3, -2], [1, -1], [2, 1], [3, 2]];

  ctx.save();
  ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.2; ctx.setLineDash([7, 5]);
  ctx.beginPath(); ctx.moveTo(cx, cy - 78); ctx.lineTo(cx, cy + 78); ctx.stroke();
  ctx.restore();

  D.marker(ctx, half.map(abs), 1, "#2D70B3", 2.6);
  const other = way === "mark" ? half.map((p) => [-p[0], p[1]]) : wrong;
  D.marker(ctx, other.map(abs), 1, way === "mark" ? "#34D399" : "#C74440", 2.6);
  D.marker(ctx, [abs(half[0]), abs(other[0])], 1, way === "mark" ? "#34D399" : "#C74440", 2.6);
  D.marker(ctx, [abs(half[3]), abs(other[3])], 1, way === "mark" ? "#34D399" : "#C74440", 2.6);

  const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
  D.txt(ctx, way === "mark" ? "corners marked first, then joined"
       : "joined by eye, without marking the partners",
    W / 2, 26, { size: 13.5, col: "rgba(234,244,242,.68)", font: "marker" });
  D.txt(ctx, way === "mark" ? "the fold works \u2014 every corner has its partner"
       : "the fold fails \u2014 the corners do not line up",
    W / 2, H - 14, { size: 14, col: way === "mark" ? "#34D399" : "#E0665F", font: "marker",
      alpha: pulse + 0.4 });
};

const drawWarm165 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cy = H / 2 + 6, g = 24;
  const half = [[-3, -2], [-1, -2], [-1, 0], [-3, 2]];
  const abs = (p) => [cx + p[0] * g, cy + p[1] * g];
  ctx.save();
  ctx.globalAlpha = D.at(f, 20, 200);
  ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.2; ctx.setLineDash([7, 5]);
  ctx.beginPath(); ctx.moveTo(cx, cy - 76); ctx.lineTo(cx, cy + 76); ctx.stroke();
  ctx.restore();
  D.marker(ctx, half.map(abs), D.at(f, 120, 400), "#6042A6", 2.8);
  D.txt(ctx, "half a shape, and a line waiting beside it", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 440, 530) });
};

const drawStory165 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "designing a tile for the art room wall", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const cx = W / 2, cy = H / 2 + 8, g = 24;
  const half = [[-3, -2], [-1, -2], [-1, 0], [-3, 2]];
  const abs = (p) => [cx + p[0] * g, cy + p[1] * g];
  ctx.save();
  ctx.globalAlpha = D.at(f, 40, 200);
  ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.2; ctx.setLineDash([7, 5]);
  ctx.beginPath(); ctx.moveTo(cx, cy - 76); ctx.lineTo(cx, cy + 76); ctx.stroke();
  ctx.restore();
  D.marker(ctx, half.map(abs), D.at(f, 120, 380), "#FA7E19", 2.8);
  if (p3 > 0) {
    D.txt(ctx, "how many corners will the finished tile have?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard165 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Reflect every corner, then join" });
  const p2 = D.at(f, 300, 520), p3 = D.at(f, 540, 760), p4 = D.at(f, 780, 940);
  const cx = W / 2, cy = 232, g = 34;
  const half = [[-3, -2], [-1, -2], [-1, 0], [-3, 2]];
  const abs = (p) => [cx + p[0] * g, cy + p[1] * g];

  ctx.save();
  ctx.globalAlpha = D.at(f, 20, 160);
  ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.4; ctx.setLineDash([8, 6]);
  ctx.beginPath(); ctx.moveTo(cx, cy - 108); ctx.lineTo(cx, cy + 108); ctx.stroke();
  ctx.restore();
  D.marker(ctx, half.map(abs), D.at(f, 60, 280), "#2D70B3", 3);

  if (p2 > 0) {
    half.forEach((p, k) => {
      const a = D.at(f, 300 + k * 50, 400 + k * 50);
      if (a <= 0) return;
      const q = abs([-p[0], p[1]]);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.beginPath(); ctx.arc(q[0], q[1], 6, 0, Math.PI * 2);
      ctx.fillStyle = "#C9A227"; ctx.fill();
      ctx.globalAlpha = a * 0.5;
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.3; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(abs(p)[0], abs(p)[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
      ctx.restore();
    });
  }
  if (p3 > 0) {
    D.marker(ctx, half.map((p) => abs([-p[0], p[1]])), p3, "#FA7E19", 3);
    D.marker(ctx, [abs(half[0]), abs([-half[0][0], half[0][1]])], p3, "#FA7E19", 3);
    D.marker(ctx, [abs(half[3]), abs([-half[3][0], half[3][1]])], p3, "#FA7E19", 3);
  }
  if (p4 > 0) {
    D.txt(ctx, "mark every partner first \u2014 join them only at the end",
      W / 2, H - 24, { size: 16, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport165 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cy = H / 2, g = 20;
  ctx.save();
  ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
  ctx.beginPath(); ctx.moveTo(cx, 8); ctx.lineTo(cx, H - 8); ctx.stroke();
  ctx.restore();
  [[-3, 0], [3, 0]].forEach((p, k) => {
    ctx.save();
    ctx.beginPath(); ctx.arc(cx + p[0] * g, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = k ? "#C9A227" : "#2D70B3"; ctx.fill();
    ctx.restore();
  });
  D.txt(ctx, "3 squares left, 3 squares right", W / 2, H - 6,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "16-5",
  storageKey: "daf-g4-t16-l5",
  title: "Draw Shapes with Line Symmetry",
  unit: "GRADE 4 · TOPIC 16 · LESSON 16-5 · 4.G.A.3",
  math: M,
  ixl: ["SQF"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Half a shape appears, with a dashed line beside it. No question yet.",
      goal: "Set up the completion task before it is asked for.",
      pull: "Something is missing on the other side.",
      rail: { launch: "Describe what is there. Do not draw anything yet.",
        monitor: ["Counting the corners", "Noticing the empty side", "Noticing the grid"],
        connect: "What is the dashed line for?",
        misconception: "Thinking the shape is already finished." } },

    { phase: "launch", title: "Designing an art room <em>tile</em>",
      lead: "Half a tile design is drawn, and the dashed line must become a line of symmetry. Estimate how many corners the finished tile will have.",
      goal: "Create the need for point-by-point reflection.",
      pull: "Now let us reflect the corners.",
      rail: { launch: "Commit to a number of corners before we start.",
        monitor: ["Doubling the corners", "Forgetting the shared corners", "Guessing"],
        connect: "Do the corners on the line get doubled too?",
        misconception: "Doubling every corner including those on the line." } },

    { phase: "monitor", title: "Mark, then <em>join</em>",
      lead: "Count the squares across to the line, then count the same again on the other side.",
      goal: "Reflection is done corner by corner, counting squares.",
      pull: "Does the order actually matter?",
      rail: { launch: "How far is that corner from the line? Count it aloud.",
        monitor: ["Counting squares", "Estimating by eye", "Marking every partner"],
        connect: "Why count squares rather than look?",
        misconception: "Placing partners by eye instead of counting." } },

    { phase: "monitor", title: "Order <em>matters</em>",
      lead: "Marking first gives a shape that folds. Joining first does not.",
      goal: "Show why the routine has that order.",
      pull: "Now judge some finished drawings.",
      rail: { launch: "Predict which one will fold properly.",
        monitor: ["Marking first", "Joining first", "Testing the fold"],
        connect: "What exactly goes wrong when you join first?",
        misconception: "Believing a symmetrical-looking shape is symmetrical." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each finished drawing. No grading until the class commits.",
      goal: "Practise checking a completion by folding.",
      pull: "Two students completed the same half differently.",
      rail: { launch: "For each one, pick a corner and check its partner.",
        monitor: ["Checking distances", "Folding mentally", "Accepting by eye"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Accepting a drawing because it looks balanced." } },

    { phase: "connect", title: "Two ways to <em>complete it</em>",
      lead: "Layla reflected every corner. Omar traced the half and flipped the tracing over.",
      goal: "Both methods implement the same reflection.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one you can do on a whiteboard.",
        monitor: ["Reflecting corners", "Tracing and flipping", "Comparing results"],
        connect: "Why do both give the same shape?",
        misconception: "Believing tracing is cheating." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Every corner gets a partner. Then, and only then, join them up.",
      goal: "The moment the drawing routine is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Reflect each corner with them, counting squares aloud.",
        monitor: ["Counting squares", "Marking partners", "Joining last"],
        connect: "Who can say the three steps?",
        misconception: "Joining as you go." } },

    { phase: "synth", title: "The routine \u2014 <em>and why it works</em>",
      lead: "Three steps, and the fold always works.",
      goal: "Generalise the routine, not this shape.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the three steps aloud, once.",
        monitor: ["Reflecting", "Joining", "Folding to check"],
        connect: "What is the final check?",
        misconception: "Skipping the fold check at the end." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on reflecting a point.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Count the squares to the line.",
        monitor: ["Counting three", "Counting six", "Answering on the line"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Placing the partner six squares away instead of three." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: deciding whether somebody else's geometry reasoning holds.",
      rail: { launch: "Three students state the three steps.",
        monitor: ["Reflects then joins", "Still joins by eye", "Ready to critique"],
        connect: "Who is designing a symmetrical tile at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [way, setWay] = useState("mark");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm165} height={256} award={award}
          notices={["Only half a shape is drawn", "There is a dashed green line", "The shape has four corners", "The other side is empty"]}
          wonders={["What goes on the other side?", "How do I know where?", "Will it be the same shape?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory165} height={256} award={award}
          label="How many corners will the finished tile have?" min={4} max={12} start={8} unit="corners"
          after="Locked. Now let us reflect the corners one at a time."
          note="Every corner off the line will gain a partner on the other side." />;

      case 2:
        return <ExploreChips draw={makeBuild165(step)} height={256}
          label="Reflect, then join" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the given half" }, { v: 1, label: "mark the partners" },
                  { v: 2, label: "join them up" }]}
          caption={<MathEl omml={M.measure} size="xl" display="block" />}
          footnote="Count squares across to the line, then count the same again." />;

      case 3:
        return <ExploreChips draw={makeOrder165(way)} height={256}
          label="Does the order matter?" value={way}
          onPick={(v) => setWay(v)}
          chips={[{ v: "mark", label: "mark, then join" }, { v: "join", label: "join by eye" }]}
          caption={<MathEl omml={M.join} size="lg" display="block" />}
          footnote="A shape that looks balanced is not necessarily symmetrical." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "e1", text: "partner is the same distance away", target: "yes" },
                  { id: "e2", text: "partner is twice as far away", target: "no" },
                  { id: "e3", text: "corners on the line stay put", target: "yes" },
                  { id: "e4", text: "corners on the line get doubled", target: "no" }]}
          targets={[{ id: "yes", label: "true — the fold works" },
                    { id: "no", label: "not yet — try folding it" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Layla's way — reflect each corner", omml: M.mirrorPoint, h: 92,
            quote: "I counted the squares for every corner, then joined them." }}
          right={{ name: "Omar's way — trace and flip", omml: M.checkFold, h: 92,
            quote: "I traced the half, flipped the paper over and drew round it." }}
          same={["Both give the same shape", "Both make the fold work", "Both keep distances equal"]}
          diff={["Layla counts squares", "Omar uses tracing paper", "Layla's works on a whiteboard"]} />;

      case 6:
        return <BoardScreen draw={drawBoard165} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "reflect every corner, then join, then fold to check" }]}
          hand={"count squares to the line · mark the partner · join last · then fold to check"}
          cards={[{ title: "The reflection rule", omml: M.mirrorPoint, note: "same distance, other side" },
                  { title: "Tap for the order", omml: M.join, revealOmml: M.wrongJoin, reveal: true,
                    note: "joining first goes wrong" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A corner sits 3 squares left of the mirror line. Where does its partner go?"
          omml={M.swyk}
          options={[{ v: "a", text: "3 squares right" }, { v: "b", text: "6 squares right" },
                    { v: "c", text: "on the line" }, { v: "d", text: "3 squares left" }]}
          right="a"
          support={{ yes: "Yes — the same distance, on the other side.",
            notYet: "Not yet — the partner is the same distance from the line, not double.",
            draw: drawSupport165, h: 96, hint: "Count three squares to the line, then three more the other way." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Draw half a shape on squared paper and ask someone at home to complete it." />;

      default: return null;
    }
  }
};
