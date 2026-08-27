/* ===========================================================================
   Grade 4 · Topic 11 · LESSON 11-3 · Use Line Plots to Solve Problems
   Standard 4.MD.B.4   I can ... use a line plot to answer questions that need
   adding or subtracting fractions.
   =========================================================================== */

const M = {
  difference: om(mfrac(7, 8), mt("\u2212"), mfrac(2, 8), mt("="), mfrac(5, 8)),
  totalTwo: om(mfrac(5, 8), mt("+"), mfrac(5, 8), mt("="), mfrac(10, 8), mt("=1"), mfrac(2, 8)),
  allShort: om(mt("2\u00d7"), mfrac(2, 8), mt("="), mfrac(4, 8)),
  mostCommonTotal: om(mt("4\u00d7"), mfrac(5, 8), mt("="), mfrac(20, 8), mt("=2"), mfrac(4, 8)),
  question: om(mnor("how much longer is the longest than the shortest?")),
  rule: om(mnor("read the two values off the scale first \u00b7 then do the fraction work")),
  swyk: om(mnor("total length of the three longest ribbons")),
  swykAnswer: om(mfrac(7, 8), mt("+"), mfrac(7, 8), mt("+"), mfrac(6, 8), mt("="), mfrac(20, 8))
};

/* the plant-height data, in eighths of a metre */
const PLANT13 = { 2: 2, 3: 1, 4: 3, 5: 4, 6: 2, 7: 2 };

/* the plot with a question-specific pair of values called out */
const makeQuestion113 = (q) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 90, w = W - 180, y = H - 100;
  const px = D.linePlot(ctx, { x: x, y: y, w: w, den: 8, max: 8, counts: PLANT13,
    prog: 1, col: "#2D70B3", axisLabel: "height in metres",
    title: "Heights of the class sunflower seedlings" });

  const jobs = {
    range: { a: 2, b: 7, col: "#C74440", txt: "7/8 \u2212 2/8 = 5/8 taller", cap: "longest minus shortest" },
    tallest: { a: 7, b: 7, col: "#388C46", txt: "7/8 + 7/8 = 14/8 = 1 and 6/8", cap: "the two tallest together" },
    common: { a: 5, b: 5, col: "#FA7E19", txt: "4 \u00d7 5/8 = 20/8 = 2 and 4/8", cap: "all four of the most common" }
  };
  const j = jobs[q];
  if (j) {
    /* underline the two columns in play */
    [j.a, j.b].forEach((n) => {
      const cx = px(n);
      const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
      ctx.save();
      ctx.globalAlpha = pulse + 0.35;
      D.rr(ctx, cx - 16, y - 16 - (PLANT13[n] || 0) * 17 - 6, 32,
        (PLANT13[n] || 0) * 17 + 24, 8);
      ctx.strokeStyle = j.col; ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    });
    if (j.a !== j.b) {
      const topN = Math.max(PLANT13[j.a] || 0, PLANT13[j.b] || 0);
      const y2 = y - 16 - topN * 17 - 26;
      D.marker(ctx, [[px(j.a), y2], [px(j.b), y2]], 1, j.col, 2);
      D.txt(ctx, "5/8", (px(j.a) + px(j.b)) / 2, y2 - 12,
        { size: 13, col: j.col, font: "marker" });
    }
    D.txt(ctx, j.txt, W / 2, H - 30, { size: 16, col: j.col, font: "marker" });
    D.txt(ctx, j.cap, W / 2, H - 10,
      { size: 11.5, col: "rgba(234,244,242,.6)", font: "marker" });
  } else {
    D.txt(ctx, "pick a question and the plot will show you where to look",
      W / 2, H - 14, { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

/* the subtraction, done on a fraction bar so the answer is not just symbols */
const makeWork113 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 66, w = W - 132;
  D.fracBar(ctx, { x: x, y: 54, w: w, h: 40, den: 8, num: 7, prog: 1,
    col: "#2D70B3", label: false });
  D.txt(ctx, "tallest: 7/8", x - 4, 40, { size: 12.5, col: "#2D70B3", font: "marker" });

  if (step >= 1) {
    D.fracBar(ctx, { x: x, y: 122, w: w, h: 40, den: 8, num: 2, prog: 1,
      col: "#FA7E19", label: false });
    D.txt(ctx, "shortest: 2/8", x - 2, 108, { size: 12.5, col: "#FA7E19", font: "marker" });
  }
  if (step >= 2) {
    const pw = w / 8;
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    ctx.save();
    ctx.globalAlpha = pulse + 0.4;
    D.rr(ctx, x + 2 * pw, 50, 5 * pw, 48, 7);
    ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.4; ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, "the difference is 5 eighth-pieces", W / 2, H - 34,
      { size: 15, col: "#34D399", font: "marker" });
    D.txt(ctx, "7/8 \u2212 2/8 = 5/8", W / 2, H - 12,
      { size: 14, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, step === 0 ? "read the tallest off the plot" : "now read the shortest",
      W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
  }
};

const drawWarm113 = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.linePlot(ctx, { x: 90, y: H - 88, w: W - 180, den: 8, max: 8, counts: PLANT13,
    prog: D.at(f, 20, 420), col: "#6042A6",
    title: "Heights of the class sunflower seedlings",
    axisLabel: "height in metres" });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 400, 500) });
};

const drawStory113 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the seedlings on the classroom window sill", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.linePlot(ctx, { x: 90, y: H - 94, w: W - 180, den: 8, max: 8, counts: PLANT13,
    prog: D.at(f, 70, 380), col: "#FA7E19", axisLabel: "height in metres" });
  if (p3 > 0) {
    D.txt(ctx, "how much taller is the tallest seedling than the shortest?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard113 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "The plot gives the numbers, you do the maths" });
  const p2 = D.at(f, 380, 560), p3 = D.at(f, 580, 760), p4 = D.at(f, 780, 920);

  const px = D.linePlot(ctx, { x: 150, y: 236, w: W - 300, den: 8, max: 8, counts: PLANT13,
    prog: D.at(f, 20, 360), col: "#2D70B3", axisLabel: "height in metres" });

  if (p2 > 0) {
    D.txt(ctx, "step 1 \u00b7 read the two values: 2/8 and 7/8", W / 2, 310,
      { size: 15, col: "#FA7E19", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.fracBar(ctx, { x: 190, y: 328, w: W - 380, h: 26, den: 8, num: 7, prog: p3,
      col: "#388C46", label: false });
    D.txt(ctx, "step 2 \u00b7 do the fraction work: 7/8 \u2212 2/8 = 5/8", W / 2, 380,
      { size: 17, col: "#C9A227", font: "marker", alpha: D.at(f, 640, 740) });
  }
  if (p4 > 0) {
    D.txt(ctx, "the answer is a length, so it needs the unit: five eighths of a metre",
      W / 2, H - 24, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 830, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport113 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.mixedBar(ctx, { x: 22, y: 14, w: W - 44, wholes: 3, den: 8, num: 20, h: 30,
    prog: 1, col: "#2D70B3", label: false });
  D.txt(ctx, "7/8 + 7/8 + 6/8 = 20/8 = 2 and 4/8 metres", W / 2, 68,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "11-3",
  storageKey: "daf-g4-t11-l3",
  title: "Use Line Plots to Solve Problems",
  unit: "GRADE 4 · TOPIC 11 · LESSON 11-3 · 4.MD.B.4",
  math: M,
  ixl: ["6JV"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Fourteen seedlings, measured in eighths of a metre. No question yet.",
      goal: "Rebuild the reading habit before any calculation is asked for.",
      pull: "Two of these heights are about to matter a lot.",
      rail: { launch: "Describe the plot. Do not calculate anything.",
        monitor: ["Naming the tallest", "Naming the most common", "Counting the seedlings"],
        connect: "Which value would you say is typical?",
        misconception: "Reading the stack height as a plant height." } },

    { phase: "launch", title: "Tallest minus <em>shortest</em>",
      lead: "How much taller is the tallest seedling than the shortest? Estimate first.",
      goal: "Create the need to combine reading a plot with fraction subtraction.",
      pull: "Now read the two values off the plot.",
      rail: { launch: "Roughly how much taller? Commit before you calculate.",
        monitor: ["Estimating over a half", "Estimating a whole metre", "Reading both ends"],
        connect: "Can the difference be bigger than the tallest plant?",
        misconception: "Subtracting the counts instead of the heights." } },

    { phase: "monitor", title: "Read, then <em>subtract</em>",
      lead: "Read the tallest, read the shortest, then take one from the other on a bar.",
      goal: "Split the problem into a reading step and a fraction step.",
      pull: "The same plot answers other questions too.",
      rail: { launch: "Which step do people get wrong: the reading or the subtracting?",
        monitor: ["Reading both values first", "Subtracting the eighths", "Subtracting the counts"],
        connect: "Why must the answer be in eighths of a metre?",
        misconception: "Answering 5 with no unit at all." } },

    { phase: "monitor", title: "Three questions, <em>one plot</em>",
      lead: "The same display answers a difference, a sum and a repeated addition.",
      goal: "Show that a line plot is a source of numbers, not one fixed question.",
      pull: "Now judge some finished answers.",
      rail: { launch: "For each question, say which columns you will look at.",
        monitor: ["Locating the right columns", "Choosing the operation", "Renaming the answer"],
        connect: "Which question needed multiplication?",
        misconception: "Using the same operation for every question about a plot." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Expose count-versus-value confusion under scrutiny.",
      pull: "Two students answered the same question differently.",
      rail: { launch: "For each one, ask: is this a count or a length?",
        monitor: ["Checking against the plot", "Checking the unit", "Recomputing"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Reporting a count when the question asked for a length." } },

    { phase: "connect", title: "Two ways to <em>total it</em>",
      lead: "Anees added the four fives one at a time. Faisal multiplied four by five eighths.",
      goal: "Connect the topic's fraction multiplication back to data.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one is faster with ten plants.",
        monitor: ["Adding repeatedly", "Multiplying by the count", "Renaming to a mixed number"],
        connect: "Where does the four come from on the plot?",
        misconception: "Multiplying by the value instead of by the count." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Read the numbers off the plot. Then do the fraction work. Then put the unit back on.",
      goal: "The moment the two-step habit is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Do the reading step out loud before touching the fractions.",
        monitor: ["Reading both values", "Doing the subtraction", "Adding the unit"],
        connect: "Who can name the three steps?",
        misconception: "Dropping the unit from the final answer." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that turns any line plot into a fraction problem.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the values first", "Choosing the operation", "Renaming the answer"],
        connect: "Which part of the rule do people skip?",
        misconception: "Calculating before reading the plot properly." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on plot-plus-fraction problems.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Find the three tallest first.",
        monitor: ["Reading the three tallest", "Adding eighths", "Renaming the total"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Adding the counts instead of the heights." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: deciding whether somebody else's reasoning holds up.",
      rail: { launch: "Three students say the three steps.",
        monitor: ["Reads then calculates", "Still jumps to the numbers", "Ready to critique others"],
        connect: "Who is explaining a plot at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [q, setQ] = useState(null);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm113} height={256} award={award}
          notices={["The scale is in eighths", "Four seedlings are 5/8 tall", "The tallest is 7/8", "Nothing is shorter than 2/8"]}
          wonders={["How much taller is the tallest?", "How tall are they altogether?", "What is a typical height?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory113} height={256} award={award}
          label="How much taller is the tallest than the shortest?" min={1} max={8} start={3} unit="/ 8 m"
          after="Locked. Now read the two values properly."
          note="Both heights are on the plot — you do not have to guess them." />;

      case 2:
        return <ExploreChips draw={makeWork113(step)} height={256}
          label="Read, then subtract" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "read the tallest" }, { v: 1, label: "read the shortest" }, { v: 2, label: "find the difference" }]}
          caption={<MathEl omml={M.difference} size="xl" display="block" />}
          footnote="The eighths never change size, so you just count the pieces between them." />;

      case 3:
        return <ExploreChips draw={makeQuestion113(q)} height={256}
          label="One plot, three questions" value={q}
          onPick={(v) => setQ(v)}
          chips={[{ v: "range", label: "how much taller?" },
                  { v: "tallest", label: "two tallest together" },
                  { v: "common", label: "all four of the most common" }]}
          caption={<MathEl omml={M.mostCommonTotal} size="lg" display="block" />}
          footnote="The plot supplies the numbers. The question supplies the operation." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "d1", text: "7/8 − 2/8 = 5/8 m", target: "yes" },
                  { id: "d2", text: "7/8 − 2/8 = 5/16 m", target: "no" },
                  { id: "d3", text: "4 × 5/8 = 20/8 m", target: "yes" },
                  { id: "d4", text: "the difference is 5 plants", target: "no" }]}
          targets={[{ id: "yes", label: "correct — a length in eighths" },
                    { id: "no", label: "not yet — check the unit" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Anees's way — add them up", omml: M.totalTwo, h: 92,
            quote: "Five eighths four times. I wrote them all out." }}
          right={{ name: "Faisal's way — multiply by the count", omml: M.mostCommonTotal, h: 92,
            quote: "There are four crosses, so four times five eighths." }}
          same={["Both give 20/8 metres", "Both use the count from the plot", "Both rename to 2 and 4/8"]}
          diff={["Anees adds, Faisal multiplies", "Faisal's works for ten plants", "Anees's shows the repeat"]} />;

      case 6:
        return <BoardScreen draw={drawBoard113} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "read the two values off the scale, then do the fraction work" }]}
          hand={"read the plot · choose the operation · rename · put the unit back on"}
          cards={[{ title: "The difference we found", omml: M.difference, note: "five eighths of a metre" },
                  { title: "Tap for the repeated one", omml: M.question, revealOmml: M.mostCommonTotal, reveal: true,
                    note: "the count comes straight off the plot" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is the total height of the three tallest seedlings?" omml={M.swyk}
          options={[{ v: "a", text: "20/8 m" }, { v: "b", text: "20/24 m" }, { v: "c", text: "3 m" }, { v: "d", text: "7/8 m" }]}
          right="a"
          support={{ yes: "Yes — 7/8 + 7/8 + 6/8 = 20/8, which is 2 and 4/8 metres.",
            notYet: "Not yet — the eighths stay eighths when you add them.",
            draw: drawSupport113, h: 96, hint: "The two tallest are both 7/8, and the next is 6/8." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Take yesterday's measurements and answer two questions from your own plot." />;

      default: return null;
    }
  }
};
