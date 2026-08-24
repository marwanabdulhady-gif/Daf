/* ===========================================================================
   Grade 4 · Topic 8 · LESSON 8-3 · Generate Equivalent Fractions: Multiplication
   Standard 4.NF.A.1   I can ... make an equivalent fraction by multiplying the
   top and the bottom by the same number.
   =========================================================================== */

const M = {
  start: om(mfrac(2, 3)),
  result: om(mfrac(8, 12)),
  work: om(mfrac(2, 3), mt("=")),
  equation: om(mfrac(2, 3), mt("="), mfrac(8, 12)),
  factorTxt: om(mnor("multiply top and bottom by the same number")),
  other: om(mfrac(2, 3), mt("="), mfrac(6, 9)),
  rule: om(mnor("multiply the top and the bottom by the same number")),
  swyk: om(mfrac(3, 5)),
  swykAnswer: om(mfrac(3, 5), mt("="), mfrac(9, 15))
};

/* the operation acting on both numbers at once */
const makeOp83 = (k) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const n2 = ((a,b)=>a*b)(2, k), d2 = ((a,b)=>a*b)(3, k);
  const cx = W / 2;
  D.txt(ctx, String(2), cx - 120, 78, { size: 30, col: "#EAF4F2", font: "marker" });
  D.marker(ctx, [[cx - 148, 96], [cx - 92, 96]], 1, "rgba(234,244,242,.8)", 2);
  D.txt(ctx, String(3), cx - 120, 122, { size: 30, col: "#EAF4F2", font: "marker" });

  D.txt(ctx, "=", cx - 40, 100, { size: 24, col: "rgba(234,244,242,.6)", font: "marker" });

  D.txt(ctx, String(n2), cx + 60, 78, { size: 30, col: "#34D399", font: "marker" });
  D.marker(ctx, [[cx + 32, 96], [cx + 88, 96]], 1, "rgba(234,244,242,.8)", 2);
  D.txt(ctx, String(d2), cx + 60, 122, { size: 30, col: "#34D399", font: "marker" });

  /* the same operation looping over both */
  ["×" + k, "×" + k].forEach(function (lbl, r) {
    const y = r === 0 ? 60 : 140;
    const pts = [];
    for (var s = 0; s <= 14; s++) {
      const t = s / 14;
      pts.push([cx - 108 + (168) * t, y + (r === 0 ? -1 : 1) * Math.sin(Math.PI * t) * 22]);
    }
    D.marker(ctx, pts, 1, "#C9A227", 2);
    D.txt(ctx, lbl, cx - 24, y + (r === 0 ? -30 : 30), { size: 15, col: "#C9A227", font: "marker" });
  });

  D.fracBar(ctx, { x: 74, y: 176, w: W - 148, h: 44, den: 3, num: 2, prog: 1, col: "#2D70B3", label: false });
  D.txt(ctx, k === 4 ? "8/12 — the same amount, four times as many pieces" : "do the same thing to both numbers",
    W / 2, H - 14, { size: 13.5, col: k === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

/* the two bars side by side proving nothing changed */
const makeProof83 = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 66, y: 56, w: W - 132, h: 48, den: 3, num: 2, prog: 1, col: "#2D70B3" });
  if (on) {
    D.fracBar(ctx, { x: 66, y: 150, w: W - 132, h: 48, den: 12, num: 8, prog: 1, col: "#388C46" });
    ctx.save();
    ctx.strokeStyle = "rgba(201,162,39,.75)"; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(66 + (W - 132) * (2 / 3), 48);
    ctx.lineTo(66 + (W - 132) * (2 / 3), 208);
    ctx.stroke();
    ctx.restore();
  }
  D.txt(ctx, on ? "the shaded edges line up exactly" : "draw the second bar to check",
    W / 2, H - 14, { size: 13.5, col: on ? "#34D399" : "#C9A227", font: "marker" });
};

const drawStory83 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two thirds of a ribbon", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 66, y: 58, w: W - 132, h: 50, den: 3, num: 2, prog: p2, col: "#FA7E19" });
  if (p3 > 0) {
    D.txt(ctx, "the ribbon is cut into thirds, two are used", W / 2, 150, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "what if it were cut into twelfths instead?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard83 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Do it to both, or not at all" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 430), p3 = D.at(f, 450, 620), p4 = D.at(f, 620, 760);
  D.fracBar(ctx, { x: 108, y: 108, w: W - 216, h: 50, den: 3, num: 2, prog: p1, col: "#2D70B3" });
  if (p2 > 0) D.fracBar(ctx, { x: 108, y: 208, w: W - 216, h: 50, den: 12, num: 8, prog: p2, col: "#388C46" });
  if (p3 > 0) {
    D.txt(ctx, "2/3 = 8/12", W / 2, 316, { size: 22, col: "#C9A227", font: "marker", alpha: p3 });
    ctx.save();
    ctx.globalAlpha = p3;
    ctx.strokeStyle = "rgba(201,162,39,.7)"; ctx.lineWidth = 2.2; ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(108 + (W - 216) * (2 / 3), 100);
    ctx.lineTo(108 + (W - 216) * (2 / 3), 268);
    ctx.stroke();
    ctx.restore();
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "multiplying top and bottom by 4 cuts every piece into 4", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 750) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport83 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 12, w: W - 52, h: 30, den: 5, num: 3, prog: 1, col: "#2D70B3", label: false });
  D.fracBar(ctx, { x: 26, y: 56, w: W - 52, h: 30, den: 15, num: 9, prog: 1, col: "#388C46", label: false });
};

const LESSON = {
  code: "8-3",
  storageKey: "daf-g4-t8-l3",
  title: "Generate Equivalent Fractions: Multiplication",
  unit: "GRADE 4 · TOPIC 8 · LESSON 8-3 · 4.NF.A.1",
  math: M,
  ixl: ["7CY", "7LH"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A fraction, and the same fraction written with bigger numbers. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "Something was done twice — once above the line, once below.",
      rail: { launch: "I am not asking for a rule yet. Just look at the two numbers.",
        monitor: ["Comparing top and bottom", "Spotting the same operation twice", "Reading the bar"],
        connect: "Who noticed something nobody else did?",
        misconception: "Thinking the fraction got bigger because the numbers did." } },

    { phase: "launch", title: "Thirds into <em>twelfths</em>", lead: "Two thirds of a ribbon. If it were cut into twelfths, how many would be used? Estimate first.",
      goal: "Create the need — drawing every time is slow.",
      pull: "Estimate first, then find the shortcut.",
      rail: { launch: "Do not draw it yet. Guess how many twelfths.",
        monitor: ["Drawing to find it", "Trying numbers", "Spotting the operation"],
        connect: "What did you do to the top? And to the bottom?",
        misconception: "Guessing 2 twelfths because the numerator was 2." } },

    { phase: "monitor", title: "Multiply <em>both</em>", lead: "Pick a number and multiply the top and bottom by it.",
      goal: "One operation, applied twice.", pull: "Prove it with the bars.",
      rail: { launch: "Predict both new numbers before you tap.",
        monitor: ["Applying it to both", "Applying it to one", "Checking with the bar"],
        connect: "What happens if you multiply only the top?", misconception: "Multiplying only the numerator." } },

    { phase: "monitor", title: "Prove it with the <em>bars</em>",
      lead: "Draw both fractions. If the shaded edges line up, they are equivalent.",
      goal: "The symbol rule and the picture must agree.",
      pull: "Now sort some pairs.",
      rail: { launch: "Predict where the second bar's edge will fall.",
        monitor: ["Lining the edges up", "Trusting the symbols only", "Checking both"],
        connect: "What would it look like if the rule were applied to only one number?",
        misconception: "Believing the symbols need no checking." } },

    { phase: "monitor", title: "Equivalent or <em>not</em>?", lead: "Sort each pair. No grading until the class commits.",
      goal: "Apply the rule to unfamiliar pairs.",
      pull: "Two students used different numbers and both were right.",
      rail: { launch: "Test each pair before you place it.",
        monitor: ["Using the rule", "Sketching bars", "Guessing"],
        connect: "Which pair was hardest, and why?",
        misconception: "Adding the same number instead of multiplying." } },

    { phase: "connect", title: "Two <em>different</em> answers, both right", lead: "Dana multiplied by 3. Yusuf multiplied by 4. Both made a fraction equal to two thirds.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Using a small factor", "Using a bigger one", "Checking both work"],
        connect: "How many equivalent fractions does one fraction have?",
        misconception: "Believing there is only one equivalent fraction." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "Two thirds. Multiply both by four. Eight twelfths. The shaded edge does not move.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the second bar", "Naming the operation", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Learning 2/3 = 8/12 by heart instead of the operation." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the operation", "Testing on a new fraction", "Explaining why the amount holds"],
        connect: "How many equivalent fractions does two thirds have?", misconception: "Believing there is only one right answer." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Do the same thing to both numbers.",
        monitor: ["Applying it to both", "Applying it to one", "Sketching to check"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Multiplying only the denominator to get 3/15." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: going the other way, with division.",
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
        return <NoticeWonder draw={makeOp83(4)} height={256} award={award}
          notices={["Both numbers got bigger", "The same arrow appears twice", "The bar did not change", "4 appears twice"]} wonders={["Why the same number twice?", "Could I use a different number?", "Is it still the same amount?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory83} height={256} award={award}
          label="How many twelfths?" min={1} max={12} start={8} unit="/ 12"
          after="Locked. Now let us find the shortcut."
          note="Twelfths are four times as small as thirds." />;

      case 2:
        return <ExploreChips draw={makeOp83(k)} height={256}
          label="Multiply both numbers by ..." value={k}
          onPick={(v) => setK(v)}
          chips={[{ v: 2, label: "× 2" }, { v: 3, label: "× 3" }, { v: 4, label: "× 4" }]}
          caption={<MathEl omml={M.equation} size="xl" display="block" />}
          footnote="Multiplying both by the same number is the same as cutting every piece." />;

      case 3:
        return <ExploreChips draw={makeProof83(on)} height={256}
          label="Check it with the bars"
          value={on ? 1 : 0}
          onPick={(v) => setOn(v === 1)}
          chips={[{ v: 0, label: "first bar only" }, { v: 1, label: "draw the second" }]}
          caption={<MathEl omml={M.equation} size="xl" display="block" />}
          footnote="The symbols and the picture must tell the same story." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "m1", text: "2/3 and 8/12", target: "yes" }, { id: "m2", text: "2/3 and 4/5", target: "no" }, { id: "m3", text: "3/4 and 9/12", target: "yes" }, { id: "m4", text: "1/2 and 3/5", target: "no" }]}
          targets={[
            { id: "yes", label: "equivalent" },
            { id: "no", label: "not equivalent" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Dana's way — times 3", omml: M.equation, h: 92, quote: "Two thirds becomes six ninths." }}
          right={{ name: "Yusuf's way — times 4", omml: M.other, h: 92, quote: "Two thirds becomes eight twelfths." }}
          same={["Both multiply top and bottom", "Both keep the same amount", "Both are equal to two thirds"]} diff={["Dana uses 3, Yusuf uses 4", "Yusuf gets smaller pieces", "There are infinitely many more"]} />;

      case 6:
        return <BoardScreen draw={drawBoard83} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "multiply the top and the bottom by the same number" }]}
          hand={"pick any number · multiply the top by it · multiply the bottom by it too"}
          cards={[
            { title: "The fraction we made", omml: M.equation, note: "two thirds, cut four times finer" },
            { title: "Tap for another one", omml: M.start, revealOmml: M.other, reveal: true,
              note: "a different multiplier, a different name" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Multiply the top and bottom of three fifths by 3. What do you get?" omml={M.swyk} options={[{ v: "a", text: "3/15" }, { v: "b", text: "9/15" }, { v: "c", text: "6/8" }, { v: "d", text: "9/5" }]} right="b"
          support={{ yes: "Yes — 3 × 3 = 9 and 5 × 3 = 15, so 3/5 = 9/15.", notYet: "Not yet — whatever you do to the top, do to the bottom.",
            draw: drawSupport83, h: 96, hint: "Multiply BOTH numbers by 3." }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Write one fraction at home and make three different equivalent fractions from it." />;

      default: return null;
    }
  }
};
