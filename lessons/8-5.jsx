/* ===========================================================================
   Grade 4 · Topic 8 · LESSON 8-5 · Use Benchmarks to Compare Fractions
   Standard 4.NF.A.2   I can ... compare two fractions by checking each one
   against a landmark like one half.
   =========================================================================== */

const M = {
  a: om(mfrac(3, 8)),
  b: om(mfrac(5, 6)),
  answer: om(mfrac(3, 8), mt("<"), mfrac(5, 6)),
  bench: om(mnor("one is under a half, the other is over it")),
  common: om(mfrac(9, 24), mt("<"), mfrac(20, 24)),
  rule: om(mnor("if one is under a half and the other is over, you already know")),
  swyk: om(mfrac(2, 5), mnor(" and "), mfrac(4, 7)),
  swykAnswer: om(mfrac(2, 5), mt("<"), mfrac(4, 7))
};

/* both fractions against the half-way landmark */
const makeBench85 = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cfg = which === "a" ? { n: 3, d: 8, col: "#2D70B3" } : { n: 5, d: 6, col: "#FA7E19" };
  D.fracBar(ctx, { x: 62, y: 74, w: W - 124, h: 54, den: cfg.d, num: cfg.n, prog: 1, col: cfg.col });
  ctx.save();
  ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.4; ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(62 + (W - 124) / 2, 62);
  ctx.lineTo(62 + (W - 124) / 2, 142);
  ctx.stroke();
  ctx.restore();
  D.txt(ctx, "half", 62 + (W - 124) / 2, 50, { size: 12.5, col: "#C9A227", font: "marker" });
  const over = cfg.n / cfg.d > 0.5;
  D.txt(ctx, over ? "more than a half" : "less than a half", W / 2, H - 40,
    { size: 16, col: over ? "#34D399" : "#C74440", font: "marker" });
  D.txt(ctx, "compare each one with the landmark, not with each other",
    W / 2, H - 16, { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

/* both fractions rewritten with the same denominator */
const makeCommon85 = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 62, y: 52, w: W - 124, h: 44,
    den: on ? 24 : 8, num: on ? 9 : 3, prog: 1, col: "#2D70B3" });
  D.fracBar(ctx, { x: 62, y: 148, w: W - 124, h: 44,
    den: on ? 24 : 6, num: on ? 20 : 5, prog: 1, col: "#FA7E19" });
  if (on) {
    ctx.save();
    ctx.strokeStyle = "rgba(201,162,39,.6)"; ctx.lineWidth = 1.6; ctx.setLineDash([4, 4]);
    for (var k = 1; k < 24; k++) {
      const gx = 62 + ((W - 124) * k) / 24;
      ctx.beginPath(); ctx.moveTo(gx, 44); ctx.lineTo(gx, 200); ctx.stroke();
    }
    ctx.restore();
  }
  D.txt(ctx, on ? "same size pieces \u2014 now just count them" : "different pieces \u2014 hard to compare",
    W / 2, H - 14, { size: 13.5, col: on ? "#34D399" : "#C74440", font: "marker" });
};

const drawStory85 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two water bottles", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 62, y: 52, w: W - 124, h: 44, den: 8, num: 3, prog: p2, col: "#2D70B3" });
  D.fracBar(ctx, { x: 62, y: 138, w: W - 124, h: 44, den: 6, num: 5, prog: p2, col: "#FA7E19" });
  if (p3 > 0) D.txt(ctx, "which bottle has more left?", W / 2, H - 16,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard85 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Use a landmark" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 430), p3 = D.at(f, 450, 620), p4 = D.at(f, 620, 760);
  D.fracBar(ctx, { x: 108, y: 106, w: W - 216, h: 48, den: 8, num: 3, prog: p1, col: "#2D70B3" });
  if (p2 > 0) D.fracBar(ctx, { x: 108, y: 200, w: W - 216, h: 48, den: 6, num: 5, prog: p2, col: "#FA7E19" });
  if (p3 > 0) {
    ctx.save();
    ctx.globalAlpha = p3;
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.4; ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(108 + (W - 216) / 2, 96);
    ctx.lineTo(108 + (W - 216) / 2, 258);
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, "3/8 < 5/6", W / 2, 306, { size: 22, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "under a half beats nothing — over a half beats everything under it", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 750) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport85 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 12, w: W - 52, h: 30, den: 5, num: 2, prog: 1, col: "#2D70B3", label: false });
  D.fracBar(ctx, { x: 26, y: 56, w: W - 52, h: 30, den: 7, num: 4, prog: 1, col: "#FA7E19", label: false });
};

const LESSON = {
  code: "8-5",
  storageKey: "daf-g4-t8-l5",
  title: "Use Benchmarks to Compare Fractions",
  unit: "GRADE 4 · TOPIC 8 · LESSON 8-5 · 4.NF.A.2",
  math: M,
  ixl: ["LUS", "EHJ", "UKZ"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two fractions with different denominators. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "One is nearly empty. One is nearly full.",
      rail: { launch: "I am not asking which is bigger. Just look at the two bars.",
        monitor: ["Comparing the shaded edges", "Comparing the numerators", "Counting the pieces"],
        connect: "Who noticed something nobody else did?",
        misconception: "Comparing the numerators as if the pieces were the same size." } },

    { phase: "launch", title: "Which bottle has <em>more</em>?", lead: "One is three eighths full. The other is five sixths. Estimate which has more.",
      goal: "Create the need — different sized pieces cannot be counted against each other.",
      pull: "Estimate first, then find a fair way to compare.",
      rail: { launch: "Which is bigger? Now \u2014 how would you convince someone?",
        monitor: ["Comparing numerators", "Comparing denominators", "Asking for a picture"],
        connect: "Why is comparing the top numbers not enough?",
        misconception: "Saying 5/6 is bigger only because 5 is bigger than 3." } },

    { phase: "monitor", title: "Check against <em>one half</em>", lead: "Is each fraction more or less than a half? That may settle it on its own.",
      goal: "A landmark lets you compare without a common denominator.", pull: "When the landmark does not settle it, make the pieces match.",
      rail: { launch: "Predict which side of the landmark each one falls.",
        monitor: ["Using the half line", "Comparing to each other", "Explaining the landmark"],
        connect: "If one is under a half and one is over, do you need anything else?", misconception: "Comparing the two fractions with each other instead of with the landmark." } },

    { phase: "monitor", title: "Make the pieces the <em>same size</em>",
      lead: "Rewrite both with the same denominator, then just count.",
      goal: "A common denominator turns comparison into counting.",
      pull: "Now sort some pairs.",
      rail: { launch: "Predict the common denominator before you tap.",
        monitor: ["Finding a common denominator", "Guessing", "Checking with the bars"],
        connect: "Why is counting fair once the pieces match?",
        misconception: "Changing only one of the two fractions." } },

    { phase: "monitor", title: "Which is <em>greater</em>?",
      lead: "Sort each pair. No grading until the class commits.",
      goal: "Apply both strategies to unfamiliar pairs.",
      pull: "Two students compared the same pair differently.",
      rail: { launch: "Choose your strategy before you calculate.",
        monitor: ["Using benchmarks", "Using common denominators", "Guessing"],
        connect: "Which pair suited the landmark method best?",
        misconception: "Using one strategy for every pair." } },

    { phase: "connect", title: "Two ways to <em>be certain</em>", lead: "Anees used the half landmark. Karim rewrote both as twenty-fourths. Both say five sixths is greater.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Using the landmark", "Using common denominators", "Choosing by the numbers"],
        connect: "When is the landmark method quicker?",
        misconception: "Believing only one method counts as proper maths." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "Three eighths sits left of the line. Five sixths sits right of it. Done.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the second bar", "Watching the landmark", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Comparing bars that are not the same length." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the strategy", "Testing on a new pair", "Explaining the piece size"],
        connect: "What if BOTH fractions are over a half?", misconception: "Assuming the landmark always settles it." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say which strategy you used.",
        monitor: ["Using a landmark", "Finding a common denominator", "Comparing numerators"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Comparing 2 and 4 without checking the piece sizes." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: comparing when the landmark is not enough.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the bars", "Ready to argue in writing"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [which, setWhich] = useState("a");
    const [on, setOn] = useState(false);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawStory85} height={256} award={award}
          notices={["The bars are different", "One is nearly full", "The pieces are different sizes", "3 and 5 are on top"]} wonders={["Which is bigger?", "Can I just compare 3 and 5?", "Do the pieces match?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory85} height={256} award={award}
          label="Which has more? (1 = first, 2 = second)" min={1} max={2} start={1} unit=""
          after="Locked. Now let us find a way to be certain."
          note="Eighths and sixths are different sizes, so the top numbers cannot be compared directly." />;

      case 2:
        return <ExploreChips draw={makeBench85(which)} height={256}
          label="Compare each with one half"
          value={which}
          onPick={(v) => setWhich(v)}
          chips={[{ v: "a", label: "3/8" }, { v: "b", label: "5/6" }]}
          caption={<MathEl omml={M.bench} size="lg" display="block" />}
          footnote="Half of 8 is 4, so 3 eighths is under. Half of 6 is 3, so 5 sixths is over." />;

      case 3:
        return <ExploreChips draw={makeCommon85(on)} height={256}
          label="Give them the same denominator"
          value={on ? 1 : 0}
          onPick={(v) => setOn(v === 1)}
          chips={[{ v: 0, label: "as they are" }, { v: 1, label: "rewrite both" }]}
          caption={<MathEl omml={on ? M.common : M.answer} size="xl" display="block" />}
          footnote="Once the pieces match, the bigger numerator wins." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "c1", text: "3/8 and 5/6", target: "second" }, { id: "c2", text: "5/8 and 1/3", target: "first" }, { id: "c3", text: "2/5 and 3/4", target: "second" }, { id: "c4", text: "7/8 and 2/6", target: "first" }]}
          targets={[{ id: "first", label: "the first one is greater" }, { id: "second", label: "the second one is greater" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Anees's way — the half landmark", omml: M.bench, h: 92, quote: "One is under a half, one is over. Done." }}
          right={{ name: "Karim's way — same denominator", omml: M.common, h: 92, quote: "I made both into twenty-fourths and counted." }}
          same={["Both say 5/6 is greater", "Both are convincing", "Both use the size of the pieces"]} diff={["Anees needs no calculation", "Karim's works even when both are over a half", "Anees is faster here"]} />;

      case 6:
        return <BoardScreen draw={drawBoard85} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "if one is under a half and the other is over, you already know" }]}
          hand={"check each against one half · if they land on opposite sides, you are finished"}
          cards={[
            { title: "The comparison we made", omml: M.answer, note: "settled by the landmark alone" },
            { title: "Tap for the other method", omml: M.bench, revealOmml: M.common, reveal: true,
              note: "common denominators work every time" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Which is greater, two fifths or four sevenths?" omml={M.swyk} options={[{ v: "a", text: "2/5" }, { v: "b", text: "4/7" }, { v: "c", text: "they are equal" }, { v: "d", text: "cannot tell" }]} right="b"
          support={{ yes: "Yes — 2/5 is under a half and 4/7 is over it.", notYet: "Not yet — the pieces are not the same size yet.",
            draw: drawSupport85, h: 96, hint: "Half of 5 is 2.5, so 2 fifths is under. Half of 7 is 3.5, so 4 sevenths is over." }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Find two fractions at home and decide which is bigger using the half landmark." />;

      default: return null;
    }
  }
};
