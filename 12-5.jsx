/* ===========================================================================
   Grade 4 · Topic 12 · LESSON 12-5 · Solve Word Problems Involving Money
   Standard 4.MD.A.2   I can ... solve money problems, treating halalas as
   hundredths of a riyal.
   =========================================================================== */

const M = {
  prices: om(mnor("kunafa 4.75 SR \u00b7 laban 2.60 SR")),
  total: om(mnor("4.75 + 2.60 = 7.35 SR")),
  change: om(mnor("10.00 \u2212 7.35 = 2.65 SR")),
  halala: om(mnor("1 halala = ") , mfrac(1, 100), mnor(" of a riyal = 0.01 SR")),
  asFraction: om(mnor("4.75 SR = 4 riyals and "), mfrac(75, 100), mnor(" of a riyal")),
  lineUp: om(mnor("line up the decimal point, not the last digit")),
  rule: om(mnor("riyals under riyals \u00b7 halalas under halalas \u00b7 then add or subtract")),
  swyk: om(mnor("3.40 SR + 1.85 SR")),
  swykAnswer: om(mnor("5.25 SR"))
};

/* the two prices and the running total, in a money column */
const makeTill125 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2;

  const rows = [
    { s: "4.75", note: "kunafa", col: "#FA7E19" },
    { s: "2.60", note: "laban", col: "#2D70B3" }
  ];
  rows.forEach((r, k) => {
    D.txt(ctx, r.s, cx + 30, 62 + k * 46, { size: 30, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, r.note, cx - 70, 62 + k * 46, { size: 13, col: r.col, font: "marker" });
  });
  D.txt(ctx, "+", cx - 22, 108, { size: 26, col: "#C9A227", font: "marker" });
  D.marker(ctx, [[cx - 34, 128], [cx + 92, 128]], 1, "rgba(234,244,242,.8)", 2.2);

  if (step >= 1) {
    /* the alignment guide */
    const pulse = 0.45 + Math.sin(frame / 14) * 0.28;
    ctx.save();
    ctx.globalAlpha = pulse + 0.35;
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(cx + 41, 38); ctx.lineTo(cx + 41, 186); ctx.stroke();
    ctx.restore();
    D.txt(ctx, "the points line up", cx + 41, 28,
      { size: 11, col: "#C9A227", font: "mono", weight: 700 });
  }
  if (step >= 2) {
    D.txt(ctx, "7.35", cx + 30, 162, { size: 32, col: "#34D399", font: "marker" });
    D.txt(ctx, "total", cx - 70, 162, { size: 13, col: "#34D399", font: "marker" });
    D.txt(ctx, "seven riyals and thirty five halalas", W / 2, H - 32,
      { size: 14, col: "#C9A227", font: "marker" });
    D.txt(ctx, "75 + 60 halalas is 135 \u2014 that is one whole riyal and 35 left",
      W / 2, H - 12, { size: 12, col: "rgba(234,244,242,.7)", font: "marker" });
  } else {
    D.txt(ctx, step === 0 ? "two prices from the school canteen"
         : "the decimal points must sit above each other",
      W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
  }
};

/* halalas as hundredths of a riyal, on a grid */
const makeHalala125 = (amount) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(120, H - 112);
  const amounts = { 1: "0.01 SR", 25: "0.25 SR", 50: "0.50 SR", 75: "0.75 SR" };
  D.decGrid(ctx, { x: W / 2 - s - 40, y: 34, s: s, tenths: false, shaded: amount, prog: 1,
    col: "#388C46", label: amount + " halalas", sub: "out of a hundred in one riyal" });
  D.txt(ctx, amounts[amount], W / 2 + 68, 34 + s / 2 - 8,
    { size: 34, col: "#C9A227", font: "marker" });
  D.txt(ctx, amount === 50 ? "half a riyal" : amount === 25 ? "a quarter of a riyal"
       : amount === 75 ? "three quarters of a riyal" : "one halala",
    W / 2 + 68, 34 + s / 2 + 26, { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "one riyal is a hundred halalas \u2014 exactly like a hundredths grid",
    W / 2, H - 14, { size: 13, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

const drawWarm125 = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the canteen price list", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  const items = [["kunafa", "4.75 SR"], ["laban", "2.60 SR"], ["dates", "3.05 SR"], ["water", "1.00 SR"]];
  items.forEach((it, k) => {
    const a = D.at(f, 60 + k * 70, 180 + k * 70);
    D.txt(ctx, it[0], W / 2 - 90, 62 + k * 34, { size: 15, col: "#EAF4F2", font: "marker", alpha: a });
    D.txt(ctx, it[1], W / 2 + 92, 62 + k * 34, { size: 15, col: "#FA7E19", font: "marker", alpha: a });
  });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 400, 500) });
};

const drawStory125 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "Faisal at the canteen with a ten riyal note", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, { x: 62, y: 108, w: W - 124, h: 58, prog: D.at(f, 70, 340),
    parts: [{ v: 4.75, label: "4.75", col: "#FA7E19", sub: "kunafa" },
            { v: 2.60, label: "2.60", col: "#2D70B3", sub: "laban" },
            { v: 2.65, label: "?", col: "#388C46", sub: "change" }],
    total: 10 });
  if (p3 > 0) {
    D.txt(ctx, "how much change should Faisal get?", W / 2, H - 14,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard125 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Riyals under riyals, halalas under halalas" });
  const p1 = D.at(f, 20, 240), p3 = D.at(f, 500, 700), p4 = D.at(f, 720, 920);
  const cx = W / 2;

  D.txt(ctx, "4.75", cx + 40, 118, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });
  D.txt(ctx, "2.60", cx + 40, 162, { size: 30, col: "#EAF4F2", font: "marker",
    alpha: D.at(f, 140, 320) });
  D.txt(ctx, "+", cx - 30, 162, { size: 26, col: "#C9A227", font: "marker", alpha: D.at(f, 180, 320) });
  D.marker(ctx, [[cx - 44, 182], [cx + 104, 182]], D.at(f, 300, 440), "rgba(234,244,242,.8)", 2.2);

  if (p3 > 0) {
    D.txt(ctx, "7.35", cx + 40, 220, { size: 32, col: "#34D399", font: "marker", alpha: p3 });
    D.txt(ctx, "75 halalas + 60 halalas = 135 halalas = 1 riyal 35 halalas",
      W / 2, 268, { size: 14.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "change from ten: 10.00 \u2212 7.35 = 2.65 SR", W / 2, 320,
      { size: 20, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "the point never moves \u2014 it is the boundary between riyals and halalas",
      W / 2, H - 26, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 800, 900) });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 850, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport125 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "3.40", W / 2 + 10, 26, { size: 22, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "1.85", W / 2 + 10, 54, { size: 22, col: "#EAF4F2", font: "marker" });
  D.marker(ctx, [[W / 2 - 40, 66], [W / 2 + 54, 66]], 1, "rgba(234,244,242,.8)", 1.8);
  D.txt(ctx, "5.25", W / 2 + 10, 90, { size: 22, col: "#34D399", font: "marker" });
  D.txt(ctx, "40 + 85 halalas = 125 = 1 riyal 25", W / 2 - 150, 58,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "12-5",
  storageKey: "daf-g4-t12-l5",
  title: "Solve Word Problems Involving Money",
  unit: "GRADE 4 · TOPIC 12 · LESSON 12-5 · 4.MD.A.2",
  math: M,
  ixl: ["2D5", "RTE", "92H"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "The canteen price list, one item at a time. No question yet.",
      goal: "Notice that every price has exactly two places after the point.",
      pull: "Those two digits have a name.",
      rail: { launch: "Describe the prices. Do not add anything yet.",
        monitor: ["Noticing two places every time", "Reading 1.00 as one riyal", "Comparing two prices"],
        connect: "Why do all the prices have two digits after the point?",
        misconception: "Reading 3.05 as three riyals fifty." } },

    { phase: "launch", title: "Faisal's <em>ten riyal note</em>",
      lead: "Faisal buys kunafa at 4.75 SR and laban at 2.60 SR with a ten riyal note. Estimate his change.",
      goal: "Create the need for careful decimal arithmetic with a real consequence.",
      pull: "Now let us add the two prices.",
      rail: { launch: "Round both prices in your head first. What is roughly left?",
        monitor: ["Rounding to 5 and 3", "Adding exactly", "Forgetting the change step"],
        connect: "Is the change more or less than three riyals?",
        misconception: "Subtracting only one of the two items." } },

    { phase: "monitor", title: "Line up the <em>point</em>",
      lead: "Write the two prices with their decimal points above each other, then add.",
      goal: "Alignment is the whole method.",
      pull: "But what exactly is a halala?",
      rail: { launch: "What has to line up, and what does not?",
        monitor: ["Aligning the points", "Aligning the last digits", "Regrouping the halalas"],
        connect: "What happened when 75 and 60 halalas were added?",
        misconception: "Right-aligning the digits instead of the decimal points." } },

    { phase: "monitor", title: "A halala is a <em>hundredth</em>",
      lead: "One riyal is a hundred halalas — the same square you have been shading all topic.",
      goal: "Money is the everyday model for hundredths.",
      pull: "Now judge some finished work.",
      rail: { launch: "How many halalas make one riyal?",
        monitor: ["Linking 50 halalas to a half", "Reading 0.25 as a quarter", "Confusing halalas with tenths"],
        connect: "What fraction of a riyal is 75 halalas?",
        misconception: "Treating a halala as a tenth of a riyal." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each money calculation. No grading until the class commits.",
      goal: "Expose alignment and regrouping errors as a group.",
      pull: "Two students found the change differently.",
      rail: { launch: "For each one, check the point lined up.",
        monitor: ["Checking the alignment", "Checking the regroup", "Estimating first"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Writing 4.75 + 2.6 as 4.75 + 2.06." } },

    { phase: "connect", title: "Two ways to find the <em>change</em>",
      lead: "Reem subtracted the total from ten. Ibrahim counted up from 7.35 to 10.00.",
      goal: "Counting up is the shopkeeper's method and it is legitimate.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one they would use at a till.",
        monitor: ["Subtracting in columns", "Counting up in stages", "Checking by adding back"],
        connect: "How would you check either answer?",
        misconception: "Believing counting up is 'not proper subtraction'." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Riyals under riyals. Halalas under halalas. Then add, then take away.",
      goal: "The moment the money routine is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Write the column with them and draw the alignment line.",
        monitor: ["Predicting the regroup", "Naming the total", "Finding the change"],
        connect: "Who can say what the point actually separates?",
        misconception: "Dropping the trailing zero and misaligning next time." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that makes every money problem the same problem.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Aligning the point", "Regrouping the halalas", "Writing two places in the answer"],
        connect: "Why must the answer keep two places?",
        misconception: "Writing 5.2 instead of 5.20 for an answer in riyals." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on adding money.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Add the halalas first and watch for the regroup.",
        monitor: ["Regrouping 125 halalas", "Aligning the point", "Answering 4.125"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 4.125 by treating halalas as thousandths." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: spotting structure that saves you the arithmetic.",
      rail: { launch: "Three students say what a halala is worth.",
        monitor: ["Aligns and regroups", "Still right-aligns", "Ready for structure"],
        connect: "Who is checking a receipt at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [amount, setAmount] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm125} height={256} award={award}
          notices={["Every price has two digits after the point", "Water is exactly one riyal", "Dates cost 3.05", "Kunafa is the most expensive"]}
          wonders={["What are the two digits called?", "Why does water say 1.00?", "How much for two items?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory125} height={256} award={award}
          label="How much change from ten riyals?" min={0} max={10} start={4} unit="SR"
          after="Locked. Now let us add the two prices properly."
          note="Round to 5 and 3 in your head: about eight riyals spent." />;

      case 2:
        return <ExploreChips draw={makeTill125(step)} height={256}
          label="Add the two prices" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the two prices" }, { v: 1, label: "line up the point" }, { v: 2, label: "add" }]}
          caption={<MathEl omml={M.total} size="xl" display="block" />}
          footnote="A hundred halalas make one riyal, so 135 halalas regroups." />;

      case 3:
        return <ExploreChips draw={makeHalala125(amount)} height={256}
          label="How much of a riyal?" value={amount}
          onPick={(v) => setAmount(v)}
          chips={[{ v: 1, label: "1 halala" }, { v: 25, label: "25 halalas" },
                  { v: 50, label: "50 halalas" }, { v: 75, label: "75 halalas" }]}
          caption={<MathEl omml={M.halala} size="lg" display="block" />}
          footnote="This is the same hundredths square you shaded in lesson 12-1." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "4.75 + 2.60 = 7.35", target: "yes" },
                  { id: "c2", text: "4.75 + 2.6 = 5.01", target: "no" },
                  { id: "c3", text: "10.00 − 7.35 = 2.65", target: "yes" },
                  { id: "c4", text: "10.00 − 7.35 = 3.35", target: "no" }]}
          targets={[{ id: "yes", label: "correct — the point stayed put" },
                    { id: "no", label: "not yet — check the alignment" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Reem's way — subtract", omml: M.change, h: 92,
            quote: "Ten take away seven riyals thirty five. I did it in columns." }}
          right={{ name: "Ibrahim's way — count up", omml: M.lineUp, h: 92,
            quote: "From 7.35 to 8 is 65 halalas, then two more riyals. 2.65." }}
          same={["Both give 2.65 SR", "Both respect a hundred halalas to a riyal", "Both can be checked by adding back"]}
          diff={["Reem subtracts", "Ibrahim counts on", "Ibrahim's is what a shopkeeper does"]} />;

      case 6:
        return <BoardScreen draw={drawBoard125} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "riyals under riyals, halalas under halalas, then add or subtract" }]}
          hand={"line up the point · add the halalas · regroup at a hundred · keep two places"}
          cards={[{ title: "The total we found", omml: M.total, note: "seven riyals thirty five" },
                  { title: "Tap for the fraction view", omml: M.prices, revealOmml: M.asFraction, reveal: true,
                    note: "a price is a whole number and a fraction" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Salma buys dates for 3.40 SR and juice for 1.85 SR. What does she pay?"
          omml={M.swyk}
          options={[{ v: "a", text: "4.125 SR" }, { v: "b", text: "5.25 SR" }, { v: "c", text: "4.25 SR" }, { v: "d", text: "5.125 SR" }]}
          right="b"
          support={{ yes: "Yes — 40 + 85 halalas is 125, which regroups to one riyal and 25.",
            notYet: "Not yet — a hundred halalas make a riyal, so 125 halalas regroups.",
            draw: drawSupport125, h: 100, hint: "Line up the points, add the halalas, then carry the riyal." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Add two real prices at home, then work out the change from a ten riyal note." />;

      default: return null;
    }
  }
};
