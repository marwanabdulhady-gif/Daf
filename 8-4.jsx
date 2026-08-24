/* ===========================================================================
   Grade 4 · Topic 8 · LESSON 8-4 · Generate Equivalent Fractions: Division
   Standard 4.NF.A.1   I can ... make an equivalent fraction in simpler terms by
   dividing the top and the bottom by a common factor.
   =========================================================================== */

const M = {
  start: om(mfrac(8, 12)),
  result: om(mfrac(2, 3)),
  work: om(mfrac(8, 12), mt("=")),
  equation: om(mfrac(8, 12), mt("="), mfrac(2, 3)),
  factorTxt: om(mnor("divide top and bottom by a common factor")),
  other: om(mfrac(8, 12), mt("="), mfrac(4, 6)),
  rule: om(mnor("divide the top and the bottom by the same factor")),
  swyk: om(mfrac(6, 9)),
  swykAnswer: om(mfrac(6, 9), mt("="), mfrac(2, 3))
};

/* the operation acting on both numbers at once */
const makeOp84 = (k) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const n2 = ((a,b)=>a/b)(8, k), d2 = ((a,b)=>a/b)(12, k);
  const cx = W / 2;
  D.txt(ctx, String(8), cx - 120, 78, { size: 30, col: "#EAF4F2", font: "marker" });
  D.marker(ctx, [[cx - 148, 96], [cx - 92, 96]], 1, "rgba(234,244,242,.8)", 2);
  D.txt(ctx, String(12), cx - 120, 122, { size: 30, col: "#EAF4F2", font: "marker" });

  D.txt(ctx, "=", cx - 40, 100, { size: 24, col: "rgba(234,244,242,.6)", font: "marker" });

  D.txt(ctx, String(n2), cx + 60, 78, { size: 30, col: "#34D399", font: "marker" });
  D.marker(ctx, [[cx + 32, 96], [cx + 88, 96]], 1, "rgba(234,244,242,.8)", 2);
  D.txt(ctx, String(d2), cx + 60, 122, { size: 30, col: "#34D399", font: "marker" });

  /* the same operation looping over both */
  ["÷" + k, "÷" + k].forEach(function (lbl, r) {
    const y = r === 0 ? 60 : 140;
    const pts = [];
    for (var s = 0; s <= 14; s++) {
      const t = s / 14;
      pts.push([cx - 108 + (168) * t, y + (r === 0 ? -1 : 1) * Math.sin(Math.PI * t) * 22]);
    }
    D.marker(ctx, pts, 1, "#C9A227", 2);
    D.txt(ctx, lbl, cx - 24, y + (r === 0 ? -30 : 30), { size: 15, col: "#C9A227", font: "marker" });
  });

  D.fracBar(ctx, { x: 74, y: 176, w: W - 148, h: 44, den: 12, num: 8, prog: 1, col: "#2D70B3", label: false });
  D.txt(ctx, k === 4 ? "2/3 — the simplest name for this amount" : "only a common factor will work",
    W / 2, H - 14, { size: 13.5, col: k === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

/* the two bars side by side proving nothing changed */
const makeProof84 = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 66, y: 56, w: W - 132, h: 48, den: 12, num: 8, prog: 1, col: "#2D70B3" });
  if (on) {
    D.fracBar(ctx, { x: 66, y: 150, w: W - 132, h: 48, den: 3, num: 2, prog: 1, col: "#388C46" });
    ctx.save();
    ctx.strokeStyle = "rgba(201,162,39,.75)"; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(66 + (W - 132) * (8 / 12), 48);
    ctx.lineTo(66 + (W - 132) * (8 / 12), 208);
    ctx.stroke();
    ctx.restore();
  }
  D.txt(ctx, on ? "the shaded edges line up exactly" : "draw the second bar to check",
    W / 2, H - 14, { size: 13.5, col: on ? "#34D399" : "#C9A227", font: "marker" });
};

const drawStory84 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "eight twelfths of a tray", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 66, y: 58, w: W - 132, h: 50, den: 12, num: 8, prog: p2, col: "#FA7E19" });
  if (p3 > 0) {
    D.txt(ctx, "the tray is cut into twelfths, eight are taken", W / 2, 150, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "is there a simpler way to say that?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard84 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Fewer, bigger pieces" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 430), p3 = D.at(f, 450, 620), p4 = D.at(f, 620, 760);
  D.fracBar(ctx, { x: 108, y: 108, w: W - 216, h: 50, den: 12, num: 8, prog: p1, col: "#2D70B3" });
  if (p2 > 0) D.fracBar(ctx, { x: 108, y: 208, w: W - 216, h: 50, den: 3, num: 2, prog: p2, col: "#388C46" });
  if (p3 > 0) {
    D.txt(ctx, "8/12 = 2/3", W / 2, 316, { size: 22, col: "#C9A227", font: "marker", alpha: p3 });
    ctx.save();
    ctx.globalAlpha = p3;
    ctx.strokeStyle = "rgba(201,162,39,.7)"; ctx.lineWidth = 2.2; ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(108 + (W - 216) * (8 / 12), 100);
    ctx.lineTo(108 + (W - 216) * (8 / 12), 268);
    ctx.stroke();
    ctx.restore();
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "dividing top and bottom by 4 glues every four pieces into one", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 750) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport84 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 12, w: W - 52, h: 30, den: 9, num: 6, prog: 1, col: "#2D70B3", label: false });
  D.fracBar(ctx, { x: 26, y: 56, w: W - 52, h: 30, den: 3, num: 2, prog: 1, col: "#388C46", label: false });
};

const LESSON = {
  code: "8-4",
  storageKey: "daf-g4-t8-l4",
  title: "Generate Equivalent Fractions: Division",
  unit: "GRADE 4 · TOPIC 8 · LESSON 8-4 · 4.NF.A.1",
  math: M,
  ixl: ["GSG", "JMX"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A fraction, and the same fraction written with smaller numbers. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "Something was undone — above the line and below it.",
      rail: { launch: "I am not asking for a rule yet. Just look at the two numbers.",
        monitor: ["Comparing top and bottom", "Spotting the same operation twice", "Reading the bar"],
        connect: "Who noticed something nobody else did?",
        misconception: "Thinking the fraction got smaller because the numbers did." } },

    { phase: "launch", title: "Twelfths into <em>thirds</em>", lead: "Eight twelfths of a tray. Can that be said with smaller numbers? Estimate first.",
      goal: "Create the need — drawing every time is slow.",
      pull: "Estimate first, then find the shortcut.",
      rail: { launch: "Do not draw it yet. Guess the simplest name.",
        monitor: ["Drawing to find it", "Trying numbers", "Spotting the operation"],
        connect: "What did you do to the top? And to the bottom?",
        misconception: "Dividing by a number that does not go into both." } },

    { phase: "monitor", title: "Divide <em>both</em>", lead: "Pick a factor of both numbers and divide by it.",
      goal: "Only a common factor keeps the fraction whole.", pull: "Prove it with the bars.",
      rail: { launch: "Predict both new numbers before you tap.",
        monitor: ["Applying it to both", "Applying it to one", "Checking with the bar"],
        connect: "What happens if you divide by a number that is not a factor of both?", misconception: "Dividing by a number that leaves a remainder." } },

    { phase: "monitor", title: "Prove it with the <em>bars</em>",
      lead: "Draw both fractions. If the shaded edges line up, they are equivalent.",
      goal: "The symbol rule and the picture must agree.",
      pull: "Now sort some pairs.",
      rail: { launch: "Predict where the second bar's edge will fall.",
        monitor: ["Lining the edges up", "Trusting the symbols only", "Checking both"],
        connect: "What would it look like if the rule were applied to only one number?",
        misconception: "Believing the symbols need no checking." } },

    { phase: "monitor", title: "Simplified correctly or <em>not</em>?", lead: "Sort each pair. No grading until the class commits.",
      goal: "Apply the rule to unfamiliar pairs.",
      pull: "Two students used different numbers and both were right.",
      rail: { launch: "Test each pair before you place it.",
        monitor: ["Using the rule", "Sketching bars", "Guessing"],
        connect: "Which pair was hardest, and why?",
        misconception: "Subtracting the same number instead of dividing." } },

    { phase: "connect", title: "Two <em>different</em> answers, both right", lead: "Rana divided by 2 and got four sixths. Nabil divided by 4 and got two thirds. Both are equivalent.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Using a small factor", "Using a bigger one", "Checking both work"],
        connect: "How many equivalent fractions does one fraction have?",
        misconception: "Believing there is only one equivalent fraction." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "Eight twelfths. Divide both by four. Two thirds. The shaded edge does not move.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the second bar", "Naming the operation", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Learning 8/12 = 2/3 by heart instead of the operation." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the operation", "Testing on a new fraction", "Explaining why the amount holds"],
        connect: "How do you know when you cannot simplify any further?", misconception: "Stopping before the fraction is in its simplest form." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Do the same thing to both numbers.",
        monitor: ["Applying it to both", "Applying it to one", "Sketching to check"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Dividing only the denominator to get 2/9." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: comparing fractions using landmarks.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready for the next idea"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [k, setK] = useState(2);
    const [on, setOn] = useState(false);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeOp84(4)} height={256} award={award}
          notices={["Both numbers got smaller", "The same arrow appears twice", "The bar did not change", "4 appears twice"]} wonders={["Why the same number twice?", "Could I use a different number?", "Is it still the same amount?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory84} height={256} award={award}
          label="What is the smallest denominator that works?" min={2} max={12} start={3} unit=""
          after="Locked. Now let us find the shortcut."
          note="Thirds are four times as big as twelfths." />;

      case 2:
        return <ExploreChips draw={makeOp84(k)} height={256}
          label="Divide both numbers by ..." value={k}
          onPick={(v) => setK(v)}
          chips={[{ v: 2, label: "÷ 2" }, { v: 4, label: "÷ 4" }]}
          caption={<MathEl omml={M.equation} size="xl" display="block" />}
          footnote="The number must divide BOTH the top and the bottom exactly." />;

      case 3:
        return <ExploreChips draw={makeProof84(on)} height={256}
          label="Check it with the bars"
          value={on ? 1 : 0}
          onPick={(v) => setOn(v === 1)}
          chips={[{ v: 0, label: "first bar only" }, { v: 1, label: "draw the second" }]}
          caption={<MathEl omml={M.equation} size="xl" display="block" />}
          footnote="The symbols and the picture must tell the same story." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "s1", text: "8/12 → 2/3", target: "yes" }, { id: "s2", text: "9/12 → 3/5", target: "no" }, { id: "s3", text: "6/8 → 3/4", target: "yes" }, { id: "s4", text: "10/15 → 5/10", target: "no" }]}
          targets={[
            { id: "yes", label: "equivalent" },
            { id: "no", label: "not equivalent" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Rana's way — divide by 2", omml: M.equation, h: 92, quote: "Eight twelfths becomes four sixths." }}
          right={{ name: "Nabil's way — divide by 4", omml: M.other, h: 92, quote: "Eight twelfths becomes two thirds in one move." }}
          same={["Both divide top and bottom", "Both keep the same amount", "Both are equal to 8/12"]} diff={["Rana uses 2, Nabil uses 4", "Nabil reaches simplest form at once", "Rana could divide again"]} />;

      case 6:
        return <BoardScreen draw={drawBoard84} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "divide the top and the bottom by the same factor" }]}
          hand={"find a factor of both numbers · divide the top by it · divide the bottom by it too"}
          cards={[
            { title: "The fraction we simplified", omml: M.equation, note: "eight twelfths, glued into thirds" },
            { title: "Tap for another one", omml: M.start, revealOmml: M.other, reveal: true,
              note: "a smaller factor, a halfway step" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Divide the top and bottom of six ninths by 3. What do you get?" omml={M.swyk} options={[{ v: "a", text: "6/3" }, { v: "b", text: "2/3" }, { v: "c", text: "3/6" }, { v: "d", text: "2/9" }]} right="b"
          support={{ yes: "Yes — 6 ÷ 3 = 2 and 9 ÷ 3 = 3, so 6/9 = 2/3.", notYet: "Not yet — whatever you do to the top, do to the bottom.",
            draw: drawSupport84, h: 96, hint: "Divide BOTH numbers by 3." }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Find a fraction at home with big numbers and write it in its simplest form." />;

      default: return null;
    }
  }
};
