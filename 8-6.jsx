/* ===========================================================================
   Grade 4 · Topic 8 · LESSON 8-6 · Compare Fractions
   Standard 4.NF.A.2   I can ... compare two fractions by rewriting them with a
   common denominator, or by using a number line.
   =========================================================================== */

const M = {
  a: om(mfrac(5, 8)),
  b: om(mfrac(2, 3)),
  answer: om(mfrac(5, 8), mt("<"), mfrac(2, 3)),
  bench: om(mnor("both are over a half — the landmark does not settle it")),
  common: om(mfrac(15, 24), mt("<"), mfrac(16, 24)),
  rule: om(mnor("same denominator means you can just count the pieces")),
  swyk: om(mfrac(3, 4), mnor(" and "), mfrac(5, 6)),
  swykAnswer: om(mfrac(3, 4), mt("<"), mfrac(5, 6))
};

/* both fractions against the half-way landmark */
const makeBench86 = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cfg = which === "a" ? { n: 5, d: 8, col: "#2D70B3" } : { n: 2, d: 3, col: "#FA7E19" };
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
const makeCommon86 = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 62, y: 52, w: W - 124, h: 44,
    den: on ? 24 : 8, num: on ? 15 : 5, prog: 1, col: "#2D70B3" });
  D.fracBar(ctx, { x: 62, y: 148, w: W - 124, h: 44,
    den: on ? 24 : 3, num: on ? 16 : 2, prog: 1, col: "#FA7E19" });
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

const drawStory86 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two juice jugs", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 62, y: 52, w: W - 124, h: 44, den: 8, num: 5, prog: p2, col: "#2D70B3" });
  D.fracBar(ctx, { x: 62, y: 138, w: W - 124, h: 44, den: 3, num: 2, prog: p2, col: "#FA7E19" });
  if (p3 > 0) D.txt(ctx, "which jug has more?", W / 2, H - 16,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard86 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "When the landmark is not enough" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 430), p3 = D.at(f, 450, 620), p4 = D.at(f, 620, 760);
  D.fracBar(ctx, { x: 108, y: 106, w: W - 216, h: 48, den: 8, num: 5, prog: p1, col: "#2D70B3" });
  if (p2 > 0) D.fracBar(ctx, { x: 108, y: 200, w: W - 216, h: 48, den: 3, num: 2, prog: p2, col: "#FA7E19" });
  if (p3 > 0) {
    ctx.save();
    ctx.globalAlpha = p3;
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.4; ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(108 + (W - 216) / 2, 96);
    ctx.lineTo(108 + (W - 216) / 2, 258);
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, "5/8 < 2/3", W / 2, 306, { size: 22, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "make the pieces the same size, then the bigger numerator wins", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 750) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport86 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 12, w: W - 52, h: 30, den: 4, num: 3, prog: 1, col: "#2D70B3", label: false });
  D.fracBar(ctx, { x: 26, y: 56, w: W - 52, h: 30, den: 6, num: 5, prog: 1, col: "#FA7E19", label: false });
};

const LESSON = {
  code: "8-6",
  storageKey: "daf-g4-t8-l6",
  title: "Compare Fractions",
  unit: "GRADE 4 · TOPIC 8 · LESSON 8-6 · 4.NF.A.2",
  math: M,
  ixl: ["M8N", "99U", "7XF", "7GK"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two fractions with different denominators. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Both are more than half full. The landmark will not help this time.",
      rail: { launch: "I am not asking which is bigger. Just look at the two bars.",
        monitor: ["Comparing the shaded edges", "Comparing the numerators", "Counting the pieces"],
        connect: "Who noticed something nobody else did?",
        misconception: "Comparing the numerators as if the pieces were the same size." } },

    { phase: "launch", title: "Both over <em>a half</em>", lead: "Five eighths and two thirds. Both are more than half. Estimate which is bigger.",
      goal: "Create the need — different sized pieces cannot be counted against each other.",
      pull: "Estimate first, then find a fair way to compare.",
      rail: { launch: "Which is bigger? Now \u2014 how would you convince someone?",
        monitor: ["Comparing numerators", "Comparing denominators", "Asking for a picture"],
        connect: "Why is comparing the top numbers not enough?",
        misconception: "Assuming the one with the bigger numerator wins." } },

    { phase: "monitor", title: "The landmark <em>runs out</em>", lead: "Check each against a half. Both are over. Now what?",
      goal: "Knowing when a strategy fails is part of using it.", pull: "Make the pieces the same size and count.",
      rail: { launch: "Predict which side of the landmark each one falls.",
        monitor: ["Using the half line", "Comparing to each other", "Explaining the landmark"],
        connect: "Why can the landmark not finish this one?", misconception: "Forcing the landmark to give an answer it cannot give." } },

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

    { phase: "connect", title: "Two ways to <em>be certain</em>", lead: "Hala rewrote both as twenty-fourths. Jamal placed both on one number line. Both say two thirds is greater.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Using the landmark", "Using common denominators", "Choosing by the numbers"],
        connect: "When is the landmark method quicker?",
        misconception: "Believing only one method counts as proper maths." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "Fifteen twenty-fourths against sixteen twenty-fourths. Same pieces, so count them.",
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
        connect: "Is there always a common denominator you can find?", misconception: "Believing some fraction pairs cannot be compared." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say which strategy you used.",
        monitor: ["Using a landmark", "Finding a common denominator", "Comparing numerators"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Choosing 3/4 because 4 is a smaller denominator." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: writing an argument that proves your comparison.",
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
        return <NoticeWonder draw={drawStory86} height={256} award={award}
          notices={["Both are over half", "The bars are close", "The pieces differ", "5 and 2 are on top"]} wonders={["Which is bigger?", "Are they nearly the same?", "How can I be sure?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory86} height={256} award={award}
          label="Which has more? (1 = first, 2 = second)" min={1} max={2} start={1} unit=""
          after="Locked. Now let us find a way to be certain."
          note="The half landmark says both are over. It cannot separate them." />;

      case 2:
        return <ExploreChips draw={makeBench86(which)} height={256}
          label="Compare each with one half"
          value={which}
          onPick={(v) => setWhich(v)}
          chips={[{ v: "a", label: "5/8" }, { v: "b", label: "2/3" }]}
          caption={<MathEl omml={M.bench} size="lg" display="block" />}
          footnote="Both are over the line, so the landmark alone will not settle this one." />;

      case 3:
        return <ExploreChips draw={makeCommon86(on)} height={256}
          label="Give them the same denominator"
          value={on ? 1 : 0}
          onPick={(v) => setOn(v === 1)}
          chips={[{ v: 0, label: "as they are" }, { v: 1, label: "rewrite both" }]}
          caption={<MathEl omml={on ? M.common : M.answer} size="xl" display="block" />}
          footnote="Once the pieces match, the bigger numerator wins." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "d1", text: "5/8 and 2/3", target: "second" }, { id: "d2", text: "3/4 and 5/8", target: "first" }, { id: "d3", text: "4/6 and 5/6", target: "second" }, { id: "d4", text: "7/10 and 3/5", target: "first" }]}
          targets={[{ id: "first", label: "the first one is greater" }, { id: "second", label: "the second one is greater" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Hala's way — common denominator", omml: M.bench, h: 92, quote: "Fifteen twenty-fourths against sixteen." }}
          right={{ name: "Jamal's way — one number line", omml: M.common, h: 92, quote: "I marked both on the same line and looked." }}
          same={["Both say 2/3 is greater", "Both make the pieces comparable", "Both are convincing"]} diff={["Hala calculates, Jamal draws", "Jamal needs an accurate line", "Hala's works for any pair"]} />;

      case 6:
        return <BoardScreen draw={drawBoard86} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "same denominator means you can just count the pieces" }]}
          hand={"find a denominator both fit · rewrite both · the bigger numerator now wins"}
          cards={[
            { title: "The comparison we made", omml: M.answer, note: "settled by common denominators" },
            { title: "Tap for the other method", omml: M.bench, revealOmml: M.common, reveal: true,
              note: "the landmark could not finish this one" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Which is greater, three quarters or five sixths?" omml={M.swyk} options={[{ v: "a", text: "3/4" }, { v: "b", text: "5/6" }, { v: "c", text: "they are equal" }, { v: "d", text: "cannot tell" }]} right="b"
          support={{ yes: "Yes — as twelfths, 3/4 = 9/12 and 5/6 = 10/12.", notYet: "Not yet — the pieces are not the same size yet.",
            draw: drawSupport86, h: 96, hint: "Twelfths work for both. What does each become?" }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Compare two fractions at home by rewriting them with the same denominator." />;

      default: return null;
    }
  }
};
