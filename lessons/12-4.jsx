/* ===========================================================================
   Grade 4 · Topic 12 · LESSON 12-4 · Add Fractions with Denominators of 10
   or 100
   Standard 4.NF.C.5   I can ... rewrite tenths as hundredths so that two
   fractions can be added.
   =========================================================================== */

const M = {
  problem: om(mfrac(3, 10), mt("+"), mfrac(25, 100)),
  rewrite: om(mfrac(3, 10), mt("="), mfrac(30, 100)),
  answer: om(mfrac(30, 100), mt("+"), mfrac(25, 100), mt("="), mfrac(55, 100)),
  asDecimal: om(mfrac(55, 100), mnor(" = 0.55")),
  why: om(mnor("you can only add pieces that are the same size")),
  other: om(mfrac(4, 10), mt("+"), mfrac(7, 100), mt("="), mfrac(47, 100)),
  rule: om(mnor("make every piece a hundredth \u00b7 then just count them")),
  swyk: om(mfrac(6, 10), mt("+"), mfrac(9, 100)),
  swykAnswer: om(mfrac(69, 100))
};

/* the two grids, then the rewrite, then the joined total */
const makeAdd124 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(112, H - 118);
  const lx = W / 2 - s - 48, rx = W / 2 + 48;

  if (step === 0) {
    D.decGrid(ctx, { x: lx, y: 34, s: s, tenths: true, shaded: 30, prog: 1,
      col: "#2D70B3", label: "3/10", sub: "three strips" });
    D.decGrid(ctx, { x: rx, y: 34, s: s, tenths: false, shaded: 25, prog: 1,
      col: "#FA7E19", label: "25/100", sub: "twenty five squares" });
    D.txt(ctx, "+", W / 2, 34 + s / 2, { size: 34, col: "#C9A227", font: "marker" });
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    D.txt(ctx, "the pieces are different sizes \u2014 they cannot be counted together",
      W / 2, H - 14, { size: 13.5, col: "#E0665F", font: "marker", alpha: pulse + 0.4 });
  } else if (step === 1) {
    D.decGrid(ctx, { x: lx, y: 34, s: s, tenths: false, shaded: 30, prog: 1,
      col: "#388C46", label: "30/100", sub: "each strip cut into ten" });
    D.decGrid(ctx, { x: rx, y: 34, s: s, tenths: false, shaded: 25, prog: 1,
      col: "#FA7E19", label: "25/100", sub: "unchanged" });
    D.txt(ctx, "+", W / 2, 34 + s / 2, { size: 34, col: "#C9A227", font: "marker" });
    D.txt(ctx, "same amount, smaller pieces \u2014 now both are hundredths",
      W / 2, H - 14, { size: 13.5, col: "#34D399", font: "marker" });
  } else {
    D.decGrid(ctx, { x: W / 2 - s / 2, y: 30, s: s, tenths: false, shaded: 55, prog: 1,
      col: "#388C46", label: "55/100 = 0.55", sub: "thirty joined by twenty five" });
    D.txt(ctx, "3/10 + 25/100 = 55/100", W / 2, H - 34,
      { size: 17, col: "#C9A227", font: "marker" });
    D.txt(ctx, "just over half the square", W / 2, H - 12,
      { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
  }
};

/* the written chain that matches the grids */
const makeChain124 = (line) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [
    { s: "3/10 + 25/100", col: "#EAF4F2", note: "the pieces do not match" },
    { s: "= 30/100 + 25/100", col: "#2D70B3", note: "ten times as many pieces, ten times the count" },
    { s: "= 55/100", col: "#FA7E19", note: "now they can simply be counted" },
    { s: "= 0.55", col: "#34D399", note: "and written as a decimal" }
  ];
  for (let r = 0; r <= line && r < rows.length; r++) {
    const fresh = r === line;
    D.txt(ctx, rows[r].s, W / 2, 44 + r * 42,
      { size: 21, col: rows[r].col, font: "marker",
        alpha: fresh ? 0.72 + Math.sin(frame / 14) * 0.24 : 1 });
    if (fresh) {
      D.txt(ctx, rows[r].note, W / 2, 66 + r * 42,
        { size: 11.5, col: "rgba(234,244,242,.6)", font: "marker" });
    }
  }
  D.decGrid(ctx, { x: W / 2 - 34, y: H - 96, s: 68, tenths: line === 0, prog: 1,
    shaded: line === 0 ? 30 : line === 1 ? 30 : 55,
    col: line >= 2 ? "#388C46" : "#2D70B3", label: null });
  D.txt(ctx, line >= 2 ? "55 hundredths" : line === 1 ? "30 hundredths" : "3 tenths",
    W / 2, H - 12, { size: 12, col: "#C9A227", font: "marker" });
};

const drawWarm124 = (ctx, W, H, frame) => {
  const CYCLE = 580, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(106, H - 112);
  D.decGrid(ctx, { x: W / 2 - s - 46, y: 38, s: s, tenths: true, shaded: 30,
    prog: D.at(f, 20, 250), col: "#6042A6", label: "3/10" });
  D.decGrid(ctx, { x: W / 2 + 46, y: 38, s: s, tenths: false, shaded: 25,
    prog: D.at(f, 250, 480), col: "#6042A6", label: "25/100" });
  D.txt(ctx, "+", W / 2, 38 + s / 2, { size: 30, col: "#C9A227", font: "marker",
    alpha: D.at(f, 460, 540) });
  D.txt(ctx, "two squares, cut differently", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
};

const drawStory124 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "painting the classroom wall display", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const s = Math.min(104, H - 108);
  D.decGrid(ctx, { x: W / 2 - s - 44, y: 40, s: s, tenths: true, shaded: 30,
    prog: D.at(f, 60, 280), col: "#FA7E19", label: "Salma: 3/10" });
  D.decGrid(ctx, { x: W / 2 + 44, y: 40, s: s, tenths: false, shaded: 25,
    prog: D.at(f, 200, 400), col: "#FA7E19", label: "Yousef: 25/100" });
  if (p3 > 0) {
    D.txt(ctx, "how much of the display is painted altogether?", W / 2, H - 12,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard124 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Make the pieces match, then count" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 460), p3 = D.at(f, 480, 700), p4 = D.at(f, 720, 940);
  const s = 104;

  D.decGrid(ctx, { x: W / 2 - s - 130, y: 92, s: s, tenths: true, shaded: 30, prog: p1,
    col: "#2D70B3", label: "3/10" });
  if (p2 > 0) {
    D.decGrid(ctx, { x: W / 2 - s / 2, y: 92, s: s, tenths: false, shaded: 30, prog: p2,
      col: "#388C46", label: "= 30/100" });
  }
  if (p3 > 0) {
    D.decGrid(ctx, { x: W / 2 + 130, y: 92, s: s, tenths: false, shaded: 25, prog: p3,
      col: "#FA7E19", label: "+ 25/100" });
  }
  if (p4 > 0) {
    D.txt(ctx, "30 hundredths and 25 hundredths is 55 hundredths",
      W / 2, 268, { size: 17, col: "#EAF4F2", font: "marker", alpha: p4 });
    D.txt(ctx, "3/10 + 25/100 = 55/100 = 0.55", W / 2, 312,
      { size: 24, col: "#C9A227", font: "marker", alpha: D.at(f, 780, 880) });
    D.txt(ctx, "cutting a strip into ten changes the name, never the amount",
      W / 2, H - 26, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 840, 940) });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport124 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = H - 18;
  D.decGrid(ctx, { x: W / 2 - s / 2, y: 9, s: s, tenths: false, shaded: 69, prog: 1,
    col: "#2D70B3", label: null });
  D.txt(ctx, "sixty from the tenths, nine more squares", W / 2 + s / 2 + 96, H / 2,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "12-4",
  storageKey: "daf-g4-t12-l4",
  title: "Add Fractions with Denominators of 10 or 100",
  unit: "GRADE 4 · TOPIC 12 · LESSON 12-4 · 4.NF.C.5",
  math: M,
  ixl: ["9RJ", "TZH"],

  metas: [
    { phase: "warmup", title: "Which one <em>doesn't belong</em>?",
      lead: "Four amounts written as fractions. Every card has a defensible reason.",
      goal: "Get tenths and hundredths sitting next to each other before adding.",
      pull: "Two of these are the same amount.",
      rail: { launch: "Pick a card and say why. No single intended answer.",
        monitor: ["Arguing from the denominator", "Arguing from the size", "Spotting the equal pair"],
        connect: "Which two could swap places without changing anything?",
        misconception: "Judging size by the numerator alone." } },

    { phase: "launch", title: "Two painters, <em>one wall</em>",
      lead: "Salma painted 3/10 of the display. Yousef painted 25/100 of it. Estimate how much is painted.",
      goal: "Create the need to make the pieces match before adding.",
      pull: "Now let us make them the same size.",
      rail: { launch: "More than half or less? Commit before you calculate.",
        monitor: ["Estimating just over a half", "Adding 3 and 25", "Reasoning in hundredths"],
        connect: "Why can't we just add 3 and 25?",
        misconception: "Answering 28/110 by adding both parts of both fractions." } },

    { phase: "monitor", title: "Make the pieces <em>match</em>",
      lead: "Cut each tenth-strip into ten. The amount does not move, but the name does.",
      goal: "The rewrite is a re-cut, not a new number.",
      pull: "Now write it down.",
      rail: { launch: "Predict how many hundredths three tenths becomes.",
        monitor: ["Cutting into ten", "Multiplying top and bottom by ten", "Changing the amount"],
        connect: "Why does the shading stay exactly where it was?",
        misconception: "Believing the rewrite makes the fraction bigger." } },

    { phase: "monitor", title: "The written <em>chain</em>",
      lead: "One line at a time. The grid underneath must always agree.",
      goal: "Every written step is checked against the model.",
      pull: "Now judge some finished work.",
      rail: { launch: "Predict the next line before you press.",
        monitor: ["Rewriting the tenths", "Adding the numerators", "Adding the denominators too"],
        connect: "Which line is the one people skip?",
        misconception: "Adding 10 and 100 to get a denominator of 110." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each calculation. No grading until the class commits.",
      goal: "Catch the denominator error while it is cheap.",
      pull: "Two students added the same pair differently.",
      rail: { launch: "Check first whether the pieces were made to match.",
        monitor: ["Checking the rewrite", "Checking the denominator", "Sketching a grid"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Writing 3/10 + 25/100 = 28/110." } },

    { phase: "connect", title: "Two ways to <em>add it</em>",
      lead: "Noura rewrote everything as hundredths. Ziad turned both into decimals first.",
      goal: "Decimal addition and fraction addition are the same move.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one is easier to check with a grid.",
        monitor: ["Rewriting as hundredths", "Converting to decimals", "Comparing the two totals"],
        connect: "Why do both routes give 0.55?",
        misconception: "Thinking decimals obey different rules from fractions." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Three strips become thirty squares. Thirty and twenty five is fifty five.",
      goal: "The moment the rewrite is taught, not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Cut the strips with them, one at a time.",
        monitor: ["Predicting 30 hundredths", "Adding the counts", "Naming the decimal"],
        connect: "Who can say why the amount did not change?",
        misconception: "Recutting the wrong grid." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that covers every tenths-and-hundredths sum you will meet.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Rewriting the tenths", "Keeping the denominator", "Writing the decimal"],
        connect: "What if both fractions were already hundredths?",
        misconception: "Rewriting the hundredths as tenths and losing the remainder." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on the rewrite.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Turn the tenths into hundredths first.",
        monitor: ["Rewriting 6/10 as 60/100", "Adding the counts", "Adding the denominators"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 15/110 by adding everything in sight." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: money problems, where hundredths are called halalas.",
      rail: { launch: "Three students explain the rewrite in their own words.",
        monitor: ["Rewrites confidently", "Still adds denominators", "Ready for money"],
        connect: "Who is adding two decimals at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [line, setLine] = useState(0);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Pick a card. Every one of them has a defensible reason."
          cards={[
            { id: "a1", text: "3/10", why: "The only one written in tenths." },
            { id: "a2", text: "30/100", why: "The same amount as 3/10, but cut smaller." },
            { id: "a3", text: "25/100", why: "The only one that is not three tenths." },
            { id: "a4", text: "0.3", why: "The only one written as a decimal." }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawStory124} height={256} award={award}
          label="How much of the display is painted?" min={10} max={90} start={50} unit="/ 100"
          after="Locked. Now let us make the pieces the same size."
          note="Three tenths is more than a quarter, and 25/100 is exactly a quarter." />;

      case 2:
        return <ExploreChips draw={makeAdd124(step)} height={256}
          label="Make the pieces match, then join them" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "as they are" }, { v: 1, label: "cut the strips" }, { v: 2, label: "join them" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Cutting a strip into ten changes the name, never the amount." />;

      case 3:
        return <ExploreChips draw={makeChain124(line)} height={256}
          label="Write the next line" value={line}
          onPick={(v) => setLine(v)}
          chips={[{ v: 0, label: "the problem" }, { v: 1, label: "rewrite the tenths" },
                  { v: 2, label: "add" }, { v: 3, label: "as a decimal" }]}
          caption={<MathEl omml={M.asDecimal} size="lg" display="block" />}
          footnote="The grid underneath never disagrees with the writing." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "3/10 + 25/100 = 55/100", target: "yes" },
                  { id: "b2", text: "3/10 + 25/100 = 28/110", target: "no" },
                  { id: "b3", text: "4/10 + 7/100 = 47/100", target: "yes" },
                  { id: "b4", text: "4/10 + 7/100 = 11/100", target: "no" }]}
          targets={[{ id: "yes", label: "correct — pieces made to match" },
                    { id: "no", label: "not yet — the pieces never matched" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Noura's way — all hundredths", omml: M.answer, h: 92,
            quote: "I made everything hundredths, then counted them." }}
          right={{ name: "Ziad's way — decimals first", omml: M.asDecimal, h: 92,
            quote: "0.3 plus 0.25. I lined up the points and added." }}
          same={["Both give 0.55", "Both need the places to match", "Both agree with the grid"]}
          diff={["Noura stays in fractions", "Ziad switches to decimals", "Ziad's needs the point lined up"]} />;

      case 6:
        return <BoardScreen draw={drawBoard124} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "make every piece a hundredth, then just count them" }]}
          hand={"rewrite the tenths as hundredths · add the counts · keep the hundredth · write the decimal"}
          cards={[{ title: "The sum we built", omml: M.answer, note: "fifty five hundredths" },
                  { title: "Tap for a harder one", omml: M.why, revealOmml: M.other, reveal: true,
                    note: "seven hundredths does not fill a strip" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is six tenths plus nine hundredths?" omml={M.swyk}
          options={[{ v: "a", text: "15/110" }, { v: "b", text: "15/100" }, { v: "c", text: "69/100" }, { v: "d", text: "96/100" }]}
          right="c"
          support={{ yes: "Yes — 60 hundredths and 9 more is 69 hundredths, or 0.69.",
            notYet: "Not yet — six tenths is sixty hundredths.",
            draw: drawSupport124, h: 100, hint: "Rewrite 6/10 as 60/100 before you add anything." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Write two amounts, one in tenths and one in hundredths, and add them without a picture." />;

      default: return null;
    }
  }
};
