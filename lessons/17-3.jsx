/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-3 · Use Models to Add and Subtract Decimals
   Standard 5.NBT.B.7   I can ... add and subtract decimals using hundredths
   grids, and line up the point when I write it down.
   =========================================================================== */

const M = {
  addModel: om(mnor("0.34 + 0.28 = 0.62")),
  regroup: om(mnor("12 hundredths regroup into one tenth and two hundredths")),
  subModel: om(mnor("0.62 \u2212 0.28 = 0.34")),
  lineUp: om(mnor("line up the decimal point, not the last digit")),
  wrongLine: om(mnor("0.34 + 0.5 is not 0.39")),
  checkBack: om(mnor("add the answer back to check a subtraction")),
  rule: om(mnor("same places under same places \u00b7 regroup at ten \u00b7 keep the point")),
  swyk: om(mnor("0.45 + 0.37")),
  swykAnswer: om(mnor("0.82"))
};

/* two grids joined, then the total */
const makeAdd173 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(110, H - 118);

  if (step < 2) {
    D.decGrid(ctx, { x: W / 2 - s - 48, y: 34, s: s, shaded: 34, prog: 1,
      col: "#2D70B3", label: "0.34", sub: "34 hundredths" });
    ctx.save();
    ctx.globalAlpha = step >= 1 ? 1 : 0.28;
    D.decGrid(ctx, { x: W / 2 + 48, y: 34, s: s, shaded: 28, prog: 1,
      col: "#FA7E19", label: "0.28", sub: "28 hundredths" });
    ctx.restore();
    D.txt(ctx, "+", W / 2, 34 + s / 2, { size: 34, col: "#C9A227", font: "marker" });
    D.txt(ctx, step === 0 ? "the first amount, shaded" : "the second amount, ready to join",
      W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
  } else {
    D.decGrid(ctx, { x: W / 2 - s / 2, y: 30, s: s, shaded: 62, prog: 1,
      col: "#388C46", label: "0.62", sub: "62 hundredths altogether" });
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    D.txt(ctx, "34 + 28 = 62 hundredths", W / 2, H - 34,
      { size: 16, col: "#34D399", font: "marker" });
    D.txt(ctx, "six whole strips and two squares over", W / 2, H - 12,
      { size: 12.5, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
  }
};

/* the written column, with the alignment trap */
const makeCol173 = (way) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2;
  const good = way === "point";

  const rows = good ? [["0.34", 0], ["0.50", 0]] : [["0.34", 0], ["0.5", 18]];
  rows.forEach((r, k) => {
    D.txt(ctx, r[0], cx + 40 - r[1], 78 + k * 44,
      { size: 30, col: "#EAF4F2", font: "marker" });
  });
  D.txt(ctx, "+", cx - 46, 122, { size: 26, col: "#C9A227", font: "marker" });
  D.marker(ctx, [[cx - 60, 142], [cx + 92, 142]], 1, "rgba(234,244,242,.8)", 2.2);
  D.txt(ctx, good ? "0.84" : "0.39", cx + 40, 180,
    { size: 32, col: good ? "#34D399" : "#E0665F", font: "marker" });

  /* the alignment guide */
  const pulse = 0.45 + Math.sin(frame / 14) * 0.28;
  ctx.save();
  ctx.globalAlpha = pulse + 0.35;
  ctx.strokeStyle = good ? "#C9A227" : "#C74440";
  ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(cx + 40 - 27, 54); ctx.lineTo(cx + 40 - 27, 200);
  ctx.stroke();
  ctx.restore();

  D.txt(ctx, good ? "points lined up" : "last digits lined up", W / 2, 30,
    { size: 13.5, col: good ? "#34D399" : "#E0665F", font: "marker" });
  D.txt(ctx, good ? "0.5 became 0.50 \u2014 same value, matching places"
       : "the 5 landed in the hundredths column, where it does not belong",
    W / 2, H - 14, { size: 13, col: good ? "#C9A227" : "#E0665F", font: "marker" });
};

const drawWarm173 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(104, H - 112);
  D.decGrid(ctx, { x: W / 2 - s - 44, y: 38, s: s, shaded: 34,
    prog: D.at(f, 20, 250), col: "#6042A6", label: "0.34" });
  D.decGrid(ctx, { x: W / 2 + 44, y: 38, s: s, shaded: 28,
    prog: D.at(f, 250, 480), col: "#6042A6", label: "0.28" });
  D.txt(ctx, "+", W / 2, 38 + s / 2, { size: 30, col: "#C9A227", font: "marker",
    alpha: D.at(f, 460, 540) });
  D.txt(ctx, "two shaded squares, waiting to be joined", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
};

const drawStory173 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "filling the class water jug", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const s = Math.min(104, H - 108);
  D.decGrid(ctx, { x: W / 2 - s - 44, y: 40, s: s, shaded: 34,
    prog: D.at(f, 60, 280), col: "#FA7E19", label: "0.34 L" });
  D.decGrid(ctx, { x: W / 2 + 44, y: 40, s: s, shaded: 28,
    prog: D.at(f, 200, 400), col: "#FA7E19", label: "0.28 L" });
  if (p3 > 0) {
    D.txt(ctx, "how much water is in the jug altogether?", W / 2, H - 12,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard173 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Join the squares, then write it down" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 260, 460), p3 = D.at(f, 500, 700), p4 = D.at(f, 740, 940);
  const s = 104;

  D.decGrid(ctx, { x: W / 2 - s - 140, y: 92, s: s, shaded: 34, prog: p1,
    col: "#2D70B3", label: "0.34" });
  if (p2 > 0) {
    D.decGrid(ctx, { x: W / 2 - s / 2, y: 92, s: s, shaded: 28, prog: p2,
      col: "#FA7E19", label: "+ 0.28" });
  }
  if (p3 > 0) {
    D.decGrid(ctx, { x: W / 2 + 140, y: 92, s: s, shaded: 62, prog: p3,
      col: "#388C46", label: "= 0.62" });
  }
  if (p4 > 0) {
    D.txt(ctx, "34 hundredths and 28 hundredths is 62 hundredths",
      W / 2, 268, { size: 17, col: "#EAF4F2", font: "marker", alpha: p4 });
    D.txt(ctx, "0.34 + 0.28 = 0.62", W / 2, 312,
      { size: 26, col: "#C9A227", font: "marker", alpha: D.at(f, 790, 890) });
    D.txt(ctx, "in the column, the decimal points must sit above each other",
      W / 2, H - 24, { size: 14.5, col: "rgba(234,244,242,.78)", font: "marker", alpha: D.at(f, 840, 940) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 880, 955), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport173 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = H - 18;
  D.decGrid(ctx, { x: W / 2 - s / 2, y: 9, s: s, shaded: 82, prog: 1,
    col: "#2D70B3", label: null });
  D.txt(ctx, "45 + 37 = 82 hundredths", W / 2 + s / 2 + 90, H / 2,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "17-3",
  storageKey: "daf-g4-t17-l3",
  title: "Use Models to Add and Subtract Decimals",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-3 · 5.NBT.B.7",
  math: M,
  ixl: ["6TF", "JRX", "9SL"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two hundredths grids, shaded different amounts, with a plus between them. No question yet.",
      goal: "Recall the hundredths grid from Topic 12 before adding.",
      pull: "The squares are the same size on both grids.",
      rail: { launch: "Describe both grids. Do not add anything yet.",
        monitor: ["Counting the shaded squares", "Reading the decimals", "Noticing the squares match"],
        connect: "Why does it matter that the squares are the same size?",
        misconception: "Trying to add the grids as whole numbers." } },

    { phase: "launch", title: "Filling the <em>water jug</em>",
      lead: "0.34 litres go in, then 0.28 litres more. Estimate the total.",
      goal: "Create the need for decimal addition with regrouping.",
      pull: "Now let us join the squares.",
      rail: { launch: "More or less than half a litre? Commit first.",
        monitor: ["Estimating just over 0.6", "Adding to 0.52", "Reasoning in hundredths"],
        connect: "Will the total pass six tenths?",
        misconception: "Answering 0.512 by writing the digits side by side." } },

    { phase: "monitor", title: "Join the <em>squares</em>",
      lead: "34 hundredths and 28 hundredths. Count them all.",
      goal: "Addition is counting hundredths, with a regroup at ten.",
      pull: "Now write it in a column.",
      rail: { launch: "Predict the total in hundredths before you tap.",
        monitor: ["Counting in hundredths", "Regrouping at ten", "Reading the answer as a decimal"],
        connect: "What happened when the hundredths passed ten?",
        misconception: "Forgetting to regroup twelve hundredths." } },

    { phase: "monitor", title: "Line up the <em>point</em>",
      lead: "The same sum, written two ways. Only one is honest.",
      goal: "Alignment is the whole written method.",
      pull: "Now judge some finished work.",
      rail: { launch: "What must line up, and what must not?",
        monitor: ["Aligning the points", "Aligning the last digits", "Padding with a zero"],
        connect: "Where did the 5 end up in the wrong version?",
        misconception: "Right-aligning the digits like whole numbers." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each calculation. No grading until the class commits.",
      goal: "Expose alignment and regrouping errors as a group.",
      pull: "Two students checked their answers differently.",
      rail: { launch: "For each one, check the point lined up.",
        monitor: ["Checking the alignment", "Checking the regroup", "Estimating first"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Writing 0.34 + 0.5 = 0.39." } },

    { phase: "connect", title: "Two ways to <em>check</em>",
      lead: "Qais added the answer back. Anees shaded a grid to see it.",
      goal: "Every subtraction can be checked by adding.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one catches a regrouping slip.",
        monitor: ["Adding back", "Shading a grid", "Estimating"],
        connect: "Which check is quickest?",
        misconception: "Never checking at all." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "34 hundredths, 28 hundredths, 62 hundredths. Then write it with the points lined up.",
      goal: "The moment the model and the column are connected.",
      pull: "Say it in one sentence.",
      rail: { launch: "Shade all three grids with them.",
        monitor: ["Predicting the total", "Naming the regroup", "Writing the column"],
        connect: "Who can say what must line up?",
        misconception: "Treating the model and the column as separate methods." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence covering every decimal sum and difference.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Aligning the point", "Regrouping at ten", "Keeping the point in the answer"],
        connect: "What do you do when the two numbers have different lengths?",
        misconception: "Dropping the point out of the answer." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on decimal addition.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Add the hundredths first.",
        monitor: ["Regrouping 12 hundredths", "Aligning the point", "Answering 0.712"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 0.712 by writing the digits together." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: estimating a decimal times a whole number.",
      rail: { launch: "Three students say what must line up.",
        monitor: ["Aligns and regroups", "Still right-aligns", "Ready to estimate"],
        connect: "Who is adding two prices at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [way, setWay] = useState("point");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm173} height={256} award={award}
          notices={["Both grids have a hundred squares", "One has 34 shaded", "The other has 28", "There is a plus sign"]}
          wonders={["What is the total?", "Will it pass one whole?", "Can I just add 34 and 28?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory173} height={256} award={award}
          label="How much water altogether?" min={10} max={100} start={50} unit="/ 100 L"
          after="Locked. Now let us join the squares."
          note="Both amounts are counts of hundredths, so they can simply be added." />;

      case 2:
        return <ExploreChips draw={makeAdd173(step)} height={256}
          label="Join the shaded squares" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the first amount" }, { v: 1, label: "the second amount" },
                  { v: 2, label: "join them" }]}
          caption={<MathEl omml={M.addModel} size="xl" display="block" />}
          footnote="Twelve hundredths regrouped into one tenth and two hundredths." />;

      case 3:
        return <ExploreChips draw={makeCol173(way)} height={256}
          label="Which column is honest?" value={way}
          onPick={(v) => setWay(v)}
          chips={[{ v: "point", label: "line up the point" }, { v: "digits", label: "line up the last digits" }]}
          caption={<MathEl omml={M.lineUp} size="lg" display="block" />}
          footnote="Pad the shorter number with a zero and the columns take care of themselves." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "0.34 + 0.28 = 0.62", target: "yes" },
                  { id: "c2", text: "0.34 + 0.28 = 0.512", target: "no" },
                  { id: "c3", text: "0.34 + 0.5 = 0.84", target: "yes" },
                  { id: "c4", text: "0.34 + 0.5 = 0.39", target: "no" }]}
          targets={[{ id: "yes", label: "correct — the point held" },
                    { id: "no", label: "not yet — check the alignment" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Qais's way — add it back", omml: M.checkBack, h: 92,
            quote: "0.34 plus 0.28 gives 0.62, so my subtraction was right." }}
          right={{ name: "Anees's way — shade a grid", omml: M.subModel, h: 92,
            quote: "I shaded 62 and rubbed out 28. Thirty four left." }}
          same={["Both check the same answer", "Both use hundredths", "Both agree"]}
          diff={["Qais uses arithmetic", "Anees uses a picture", "Qais's is quicker in a test"]} />;

      case 6:
        return <BoardScreen draw={drawBoard173} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "same places under same places, regroup at ten, keep the point" }]}
          hand={"line up the point · pad with zeros · add the hundredths · regroup at ten"}
          cards={[{ title: "The sum we modelled", omml: M.addModel, note: "sixty two hundredths" },
                  { title: "Tap for the classic slip", omml: M.lineUp, revealOmml: M.wrongLine, reveal: true,
                    note: "the 5 landed in the wrong column" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is 0.45 + 0.37?" omml={M.swyk}
          options={[{ v: "a", text: "0.712" }, { v: "b", text: "0.82" }, { v: "c", text: "0.72" }, { v: "d", text: "8.2" }]}
          right="b"
          support={{ yes: "Yes — 45 and 37 hundredths make 82 hundredths.",
            notYet: "Not yet — twelve hundredths regroup into one tenth and two.",
            draw: drawSupport173, h: 100, hint: "Count the hundredths: 45 + 37 = 82." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Add two decimal amounts at home, lining up the points, then check by estimating." />;

      default: return null;
    }
  }
};
