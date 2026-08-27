/* ===========================================================================
   Grade 4 · Topic 13 · LESSON 13-7 · Problem Solving: Precision
   Standard MP.6 · 4.MD.A   I can ... be precise: convert to a common unit,
   label every answer, and check the answer makes sense.
   =========================================================================== */

const M = {
  mixed: om(mnor("2 m of ribbon and 60 cm of ribbon")),
  common: om(mnor("200 cm + 60 cm = 260 cm")),
  wrong: om(mnor("2 + 60 = 62 \u2014 62 of what?")),
  labelled: om(mnor("260 cm, or 2 m 60 cm")),
  checklist: om(mnor("same unit \u00b7 correct arithmetic \u00b7 unit on the answer")),
  reasonable: om(mnor("2 m 60 cm is a bit longer than a metre stick and a half")),
  rule: om(mnor("precision is three checks, not one careful moment")),
  hard: om(mnor("a 2 m shelf holds books of 45 cm, 45 cm and 60 cm, how much is left?")),
  swyk: om(mnor("1 kg 200 g + 800 g")),
  swykAnswer: om(mnor("2,000 g = 2 kg"))
};

/* the three-check routine */
const makeCheck137 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();

  const heads = ["same unit?", "arithmetic right?", "unit on the answer?"];
  const cols = ["#FA7E19", "#2D70B3", "#388C46"];
  const bw = (W - 90) / 3;
  for (let k = 0; k < 3; k++) {
    const bx = 45 + k * bw;
    const on = k <= step;
    ctx.save();
    ctx.globalAlpha = on ? 1 : 0.24;
    D.rr(ctx, bx + 5, 22, bw - 10, 32, 8);
    ctx.strokeStyle = cols[k]; ctx.lineWidth = k === step ? 2.4 : 1.4;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, heads[k], bx + bw / 2, 38,
      { size: 12, col: on ? cols[k] : "rgba(234,244,242,.3)", font: "marker" });
  }

  if (step === 0) {
    D.txt(ctx, "2 m", W / 2 - 90, 96, { size: 30, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, "+", W / 2, 96, { size: 26, col: "#C9A227", font: "marker" });
    D.txt(ctx, "60 cm", W / 2 + 90, 96, { size: 30, col: "#EAF4F2", font: "marker" });
    const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
    D.txt(ctx, "these cannot be added \u2014 the units do not match", W / 2, 148,
      { size: 14.5, col: "#E0665F", font: "marker", alpha: pulse + 0.4 });
    D.txt(ctx, "2 + 60 = 62 would be 62 of nothing at all", W / 2, H - 14,
      { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  } else if (step === 1) {
    D.txt(ctx, "200 cm", W / 2 - 90, 96, { size: 30, col: "#2D70B3", font: "marker" });
    D.txt(ctx, "+", W / 2, 96, { size: 26, col: "#C9A227", font: "marker" });
    D.txt(ctx, "60 cm", W / 2 + 90, 96, { size: 30, col: "#2D70B3", font: "marker" });
    D.marker(ctx, [[W / 2 - 150, 118], [W / 2 + 150, 118]], 1, "rgba(234,244,242,.7)", 2);
    D.txt(ctx, "260 cm", W / 2, 152, { size: 32, col: "#34D399", font: "marker" });
    D.txt(ctx, "both in centimetres now, so the sum is honest", W / 2, H - 14,
      { size: 13, col: "#34D399", font: "marker" });
  } else {
    D.unitBar(ctx, { x: 58, y: 78, w: W - 116, h: 30, n: 100, big: "m", small: "cm",
      copies: 2, numbered: false, prog: 1, bigCol: "#6042A6", smallCol: "#FA7E19",
      label: false, split: 18 });
    D.txt(ctx, "260 cm  =  2 m 60 cm", W / 2, H - 40,
      { size: 20, col: "#C9A227", font: "marker" });
    D.txt(ctx, "a bit longer than a metre stick and a half \u2014 that is believable",
      W / 2, H - 14, { size: 12.5, col: "#34D399", font: "marker" });
  }
};

/* spot the imprecision */
const makeSpot137 = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cases = {
    a: { s: "2 m + 60 cm = 62", fault: "no unit, and the units were never matched", ok: false },
    b: { s: "2 m + 60 cm = 260 cm", fault: "matched, calculated and labelled", ok: true },
    c: { s: "2 m + 60 cm = 260", fault: "right number, but 260 of what?", ok: false },
    d: { s: "2 m + 60 cm = 80 cm", fault: "labelled, but the conversion was wrong", ok: false }
  };
  const j = cases[which];
  D.txt(ctx, "one answer per card \u2014 which one is precise?", W / 2, 30,
    { size: 13, col: "rgba(234,244,242,.65)", font: "marker" });
  D.txt(ctx, j.s, W / 2, 96, { size: 28, col: j.ok ? "#34D399" : "#E0665F", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, j.fault, W / 2, 146,
    { size: 15, col: j.ok ? "#34D399" : "#E0665F", font: "marker", alpha: pulse + 0.4 });
  D.txt(ctx, j.ok ? "all three checks passed" : "one of the three checks failed",
    W / 2, H - 14, { size: 12.5, col: "#C9A227", font: "marker" });
};

const drawWarm137 = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "one answer, written four ways", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  const lines = ["62", "260", "260 cm", "2 m 60 cm"];
  lines.forEach((s, k) => {
    const a = D.at(f, 50 + k * 80, 150 + k * 80);
    D.txt(ctx, s, W / 2, 74 + k * 38, { size: 22, col: "#6042A6", font: "marker", alpha: a });
  });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 440, 530) });
};

const drawStory137 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 380, 520);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two pieces of ribbon in the art cupboard", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, { x: 62, y: 96, w: W - 124, h: 48, prog: D.at(f, 60, 340),
    parts: [{ v: 200, label: "2 m", col: "#2D70B3", sub: "the long piece" },
            { v: 60, label: "60 cm", col: "#FA7E19", sub: "the short piece" }],
    total: "?" });
  if (p3 > 0) {
    D.txt(ctx, "how much ribbon is there altogether?", W / 2, H - 14,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard137 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Three checks, every single time" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 460), p3 = D.at(f, 480, 700), p4 = D.at(f, 720, 920);

  D.txt(ctx, "1 \u00b7 same unit?    2 m becomes 200 cm", W / 2, 108,
    { size: 17, col: "#FA7E19", font: "marker", alpha: p1 });
  if (p2 > 0) {
    D.txt(ctx, "2 \u00b7 arithmetic right?    200 + 60 = 260", W / 2, 152,
      { size: 17, col: "#2D70B3", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "3 \u00b7 unit on the answer?    260 cm", W / 2, 196,
      { size: 17, col: "#388C46", font: "marker", alpha: p3 });
    D.unitBar(ctx, { x: 150, y: 232, w: W - 300, h: 28, n: 100, big: "m", small: "cm",
      copies: 2, numbered: false, prog: p3, bigCol: "#6042A6", smallCol: "#FA7E19",
      label: false, split: 16 });
  }
  if (p4 > 0) {
    D.txt(ctx, "260 cm = 2 m 60 cm", W / 2, 344,
      { size: 24, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "a number with no unit is not an answer \u2014 it is just a number",
      W / 2, H - 24, { size: 14.5, col: "rgba(234,244,242,.78)", font: "marker", alpha: D.at(f, 800, 900) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 850, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport137 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "1 kg 200 g = 1,200 g", W / 2, 26, { size: 15, col: "#2D70B3", font: "marker" });
  D.txt(ctx, "1,200 g + 800 g = 2,000 g", W / 2, 54, { size: 15, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "2,000 g = 2 kg", W / 2, 84, { size: 15, col: "#34D399", font: "marker" });
};

const LESSON = {
  code: "13-7",
  storageKey: "daf-g4-t13-l7",
  title: "Problem Solving: Precision",
  unit: "GRADE 4 · TOPIC 13 · LESSON 13-7 · MP.6 · 4.MD.A",
  math: M,
  ixl: ["A2E", "UST", "KXC"],

  metas: [
    { phase: "warmup", title: "Which one <em>doesn't belong</em>?",
      lead: "Four ways of writing an answer to the same question. Every card has a defensible reason.",
      goal: "Put labelling on the table before precision is named.",
      pull: "Only two of these are actually answers.",
      rail: { launch: "Pick a card and say why. No single intended answer.",
        monitor: ["Arguing from the missing unit", "Arguing from the number", "Spotting the two correct ones"],
        connect: "Which of these would you accept in a test?",
        misconception: "Believing a bare number is an acceptable answer." } },

    { phase: "launch", title: "Two pieces of <em>ribbon</em>",
      lead: "The art cupboard has a 2 metre piece and a 60 centimetre piece. Estimate the total.",
      goal: "Create the need for a common unit before adding.",
      pull: "Now let us do it carefully.",
      rail: { launch: "Commit to a total in centimetres before you calculate.",
        monitor: ["Converting the metres", "Adding 2 and 60", "Reasoning from a metre stick"],
        connect: "Can 2 and 60 be added as they stand?",
        misconception: "Answering 62 by adding numbers with different units." } },

    { phase: "monitor", title: "The three <em>checks</em>",
      lead: "Same unit. Correct arithmetic. Unit on the answer. In that order.",
      goal: "Precision becomes a routine, not a personality trait.",
      pull: "Now spot the imprecise ones.",
      rail: { launch: "Which check do you think people fail most often?",
        monitor: ["Converting first", "Adding correctly", "Remembering the unit"],
        connect: "Which check would have caught the answer 62?",
        misconception: "Treating the unit as decoration added at the end." } },

    { phase: "monitor", title: "Spot the <em>imprecision</em>",
      lead: "Four finished answers. Only one passes all three checks.",
      goal: "Diagnose exactly which check failed.",
      pull: "Now sort some of your own.",
      rail: { launch: "For each card, name which check it failed.",
        monitor: ["Naming the failed check", "Spotting the missing unit", "Spotting the bad conversion"],
        connect: "Which wrong answer was the most convincing?",
        misconception: "Accepting an answer because the number looks familiar." } },

    { phase: "monitor", title: "Precise or <em>not yet</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Practise the three checks on new problems.",
      pull: "Two students answered the same question differently.",
      rail: { launch: "Run all three checks on every card.",
        monitor: ["Checking the unit match", "Checking the arithmetic", "Checking the label"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Checking only the arithmetic." } },

    { phase: "connect", title: "Two precise <em>answers</em>",
      lead: "Qais wrote 260 cm. Omar wrote 2 m 60 cm. Both are precise.",
      goal: "Precision does not mean one single acceptable form.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask whether either is wrong.",
        monitor: ["Using one unit", "Using mixed units", "Converting between them"],
        connect: "When would each form be more useful?",
        misconception: "Believing mixed units are less precise." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Match the units. Do the arithmetic. Label the answer. Then check it is believable.",
      goal: "The moment the precision routine is taught.",
      pull: "Say the three checks.",
      rail: { launch: "Walk all three checks with them, out loud.",
        monitor: ["Predicting each step", "Naming the unit", "Judging the answer"],
        connect: "Who can say all three checks without looking?",
        misconception: "Rushing to the arithmetic first." } },

    { phase: "synth", title: "The routine \u2014 <em>and why it works</em>",
      lead: "Three checks that catch almost every measurement mistake.",
      goal: "Generalise the habit, not just this answer.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the three checks aloud, once.",
        monitor: ["Converting first", "Labelling the answer", "Judging reasonableness"],
        connect: "Which check is the one you personally skip?",
        misconception: "Believing precision slows you down." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on precision.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Convert to grams first.",
        monitor: ["Converting the kilograms", "Adding correctly", "Labelling the answer"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 1,001 by adding 1 kg and 200 g as plain numbers." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close the topic on a habit, not a fact.",
      pull: "Tomorrow: Topic 14 — generating and analysing patterns.",
      rail: { launch: "Three students recite the three checks.",
        monitor: ["Runs all three", "Still skips the unit", "Ready for patterns"],
        connect: "Who is labelling a measurement at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [which, setWhich] = useState("a");

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Pick a card. Every one of them has a defensible reason."
          cards={[
            { id: "a1", text: "62", why: "The only one where the units were never matched." },
            { id: "a2", text: "260", why: "The right number, but it has no unit at all." },
            { id: "a3", text: "260 cm", why: "The only single-unit answer that is fully labelled." },
            { id: "a4", text: "2 m 60 cm", why: "The only one written in two units at once." }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawStory137} height={256} award={award}
          label="How much ribbon altogether?" min={60} max={400} start={150} unit="cm"
          after="Locked. Now let us run the three checks."
          note="A metre is a hundred centimetres, so the long piece is 200 cm." />;

      case 2:
        return <ExploreChips draw={makeCheck137(step)} height={256}
          label="Run the three checks" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "same unit?" }, { v: 1, label: "arithmetic right?" },
                  { v: 2, label: "unit on the answer?" }]}
          caption={<MathEl omml={M.common} size="xl" display="block" />}
          footnote="A number with no unit is not an answer — it is just a number." />;

      case 3:
        return <ExploreChips draw={makeSpot137(which)} height={256}
          label="Which check did each one fail?" value={which}
          onPick={(v) => setWhich(v)}
          chips={[{ v: "a", label: "= 62" }, { v: "b", label: "= 260 cm" },
                  { v: "c", label: "= 260" }, { v: "d", label: "= 80 cm" }]}
          caption={<MathEl omml={M.checklist} size="lg" display="block" />}
          footnote="Three checks. Failing any one of them makes the answer imprecise." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "3 m + 40 cm = 340 cm", target: "yes" },
                  { id: "b2", text: "3 m + 40 cm = 43", target: "no" },
                  { id: "b3", text: "1 kg + 500 g = 1,500 g", target: "yes" },
                  { id: "b4", text: "1 kg + 500 g = 501 g", target: "no" }]}
          targets={[{ id: "yes", label: "precise — all three checks pass" },
                    { id: "no", label: "not yet — a check failed" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Qais's way — one unit", omml: M.common, h: 92,
            quote: "I turned everything into centimetres and wrote 260 cm." }}
          right={{ name: "Omar's way — mixed units", omml: M.labelled, h: 92,
            quote: "Two whole metres and sixty centimetres left over." }}
          same={["Both are the same length", "Both carry a unit", "Both pass all three checks"]}
          diff={["Qais uses one unit", "Omar uses two", "Qais's is easier to add again"]} />;

      case 6:
        return <BoardScreen draw={drawBoard137} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "precision is three checks, not one careful moment" }]}
          hand={"same unit? · arithmetic right? · unit on the answer? · and is it believable?"}
          cards={[{ title: "The three checks", omml: M.checklist, note: "run them in order" },
                  { title: "Tap for the last question", omml: M.labelled, revealOmml: M.reasonable, reveal: true,
                    note: "does the answer make sense in the real world?" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          hard={{ prompt: "A 2 m shelf holds books of 45 cm, 45 cm and 60 cm. How much space is left?", omml: M.hard,
                  answer: "50 cm",
                  hint: "2 m is 200 cm; 45 + 45 + 60 = 150; 200 \u2212 150 = 50." }}
          prompt="A bag holds 1 kg 200 g of rice. Another holds 800 g. What is the total?"
          omml={M.swyk}
          options={[{ v: "a", text: "1,001 g" }, { v: "b", text: "2,000 g" }, { v: "c", text: "1,000 g" }, { v: "d", text: "2,000" }]}
          right="b"
          support={{ yes: "Yes — 1,200 g and 800 g make 2,000 g, which is 2 kg.",
            notYet: "Not yet — convert the kilograms to grams before adding.",
            draw: drawSupport137, h: 100, hint: "1 kg 200 g is 1,200 g, and 1,200 + 800 = 2,000." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Add two measurements at home in different units, and label your answer properly." />;

      default: return null;
    }
  }
};
