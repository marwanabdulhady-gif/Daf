/* ===========================================================================
   Grade 4 · Topic 15 · LESSON 15-3 · Measure with Unit Angles
   Standard 4.MD.C.5b   I can ... measure an angle by counting how many equal
   unit angles fit inside it.
   =========================================================================== */

const M = {
  wedge: om(mnor("one wedge from the fan is 30 degrees")),
  count: om(mnor("4 wedges fill the angle, so 4 \u00d7 30 = 120 degrees")),
  counts: {
    60: om(mnor("2 wedges of 60 degrees fill it \u00b7 2 \u00d7 60 = 120")),
    30: om(mnor("4 wedges of 30 degrees fill it \u00b7 4 \u00d7 30 = 120")),
    20: om(mnor("6 wedges of 20 degrees fill it \u00b7 6 \u00d7 20 = 120")),
    10: om(mnor("12 wedges of 10 degrees fill it \u00b7 12 \u00d7 10 = 120"))
  },
  additive: om(mnor("angle measures add \u2014 wedges never overlap")),
  smallerUnit: om(mnor("smaller wedges give a more exact answer")),
  tenDeg: om(mt("12\u00d710=120"), mnor(" degrees with ten-degree wedges")),
  compare: om(mnor("the angle did not change \u2014 only the wedge did")),
  rule: om(mnor("count the unit angles \u00b7 multiply by the size of one")),
  swyk: om(mnor("5 wedges of 30 degrees")),
  swykAnswer: om(mt("5\u00d730=150"))
};

/* the angle filled with wedges of the chosen size */
const makeWedge153 = (unit) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = 96, cy = H - 58, r = Math.min(162, H - 88);
  const target = 120;
  const n = Math.round(target / unit);

  for (let k = 0; k < n; k++) {
    const a = Math.min(1, Math.max(0, (frame / 5 - k * 6) / 12));
    if (a <= 0) continue;
    const a0 = (-k * unit * Math.PI) / 180, a1 = (-(k + 1) * unit * Math.PI) / 180;
    ctx.save();
    ctx.globalAlpha = a * 0.55;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a0, a1, true);
    ctx.closePath();
    ctx.fillStyle = k % 2 ? "#2D70B3" : "#388C46";
    ctx.fill();
    ctx.globalAlpha = a;
    ctx.strokeStyle = "rgba(234,244,242,.7)"; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.restore();
  }
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: target, prog: 1, noArc: true,
    col: "#EAF4F2", arcCol: "#C9A227", label: false });

  D.txt(ctx, "one wedge = " + unit + "\u00b0", W / 2 + 60, 38,
    { size: 15, col: "#C9A227", font: "marker" });
  D.txt(ctx, n + " wedges fit inside", W / 2 + 60, 70,
    { size: 15, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, n + " \u00d7 " + unit + " = " + (n * unit) + "\u00b0", W / 2 + 60, 106,
    { size: 25, col: "#34D399", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "the angle never changed \u2014 only the wedge you counted with",
    W / 2, H - 12, { size: 13, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
};

/* two angles joined: measures add */
const makeAdd153 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 30, cy = H - 54, r = Math.min(150, H - 84);

  if (step >= 1) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 40, prog: 1,
      col: "rgba(234,244,242,.55)", arcCol: "#2D70B3", label: "40\u00b0" });
  }
  if (step >= 2) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 40, deg: 50, prog: 1,
      col: "rgba(234,244,242,.55)", arcCol: "#FA7E19", label: "50\u00b0" });
  }
  if (step >= 3) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r * 0.72, start: 0, deg: 90, prog: 1,
      col: "rgba(0,0,0,0)", arcCol: "#34D399", label: false, square: true });
    D.txt(ctx, "40 + 50 = 90\u00b0", W / 2 + 110, 90,
      { size: 24, col: "#34D399", font: "marker" });
  }
  if (step === 0) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 90, prog: 1,
      col: "#EAF4F2", arcCol: "#C9A227", label: "?", square: false });
  }
  D.txt(ctx, ["one angle, size unknown", "the first piece is 40\u00b0",
    "the second piece is 50\u00b0", "the two pieces make the whole"][step],
    W / 2, 26, { size: 13.5, col: "rgba(234,244,242,.68)", font: "marker" });
  D.txt(ctx, step === 3 ? "angle measures add, just like lengths do"
       : "the pieces do not overlap and leave no gap",
    W / 2, H - 12, { size: 13, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawWarm153 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 60, cy = H - 52, r = Math.min(140, H - 84);
  const n = Math.floor(D.at(f, 30, 440) * 4);
  for (let k = 0; k < n; k++) {
    const a0 = (-k * 30 * Math.PI) / 180, a1 = (-(k + 1) * 30 * Math.PI) / 180;
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a0, a1, true); ctx.closePath();
    ctx.fillStyle = "#6042A6"; ctx.fill();
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = "rgba(234,244,242,.6)"; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.restore();
  }
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 120, prog: 1, noArc: true,
    col: "#EAF4F2", arcCol: "#C9A227", label: false });
  D.txt(ctx, "identical wedges dropped into one angle", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just watch", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 470, 560) });
};

const drawStory153 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "a paper fan from the art room", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const cx = W / 2 - 60, cy = H - 46, r = Math.min(136, H - 80);
  const n = Math.floor(D.at(f, 60, 380) * 4);
  for (let k = 0; k < n; k++) {
    const a0 = (-k * 30 * Math.PI) / 180, a1 = (-(k + 1) * 30 * Math.PI) / 180;
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a0, a1, true); ctx.closePath();
    ctx.fillStyle = "#FA7E19"; ctx.fill();
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = "rgba(234,244,242,.6)"; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.restore();
  }
  if (p3 > 0) {
    D.txt(ctx, "each fold is 30 degrees. how wide is the open fan?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard153 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Count the wedges, then multiply" });
  const p3 = D.at(f, 480, 700), p4 = D.at(f, 720, 920);
  const cx = 210, cy = 330, r = 180;

  for (let k = 0; k < 4; k++) {
    const a = D.at(f, 20 + k * 90, 130 + k * 90);
    if (a <= 0) continue;
    const a0 = (-k * 30 * Math.PI) / 180, a1 = (-(k + 1) * 30 * Math.PI) / 180;
    ctx.save();
    ctx.globalAlpha = a * 0.55;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a0, a1, true); ctx.closePath();
    ctx.fillStyle = k % 2 ? "#2D70B3" : "#388C46"; ctx.fill();
    ctx.globalAlpha = a;
    ctx.strokeStyle = "rgba(234,244,242,.7)"; ctx.lineWidth = 1.3; ctx.stroke();
    ctx.restore();
    D.txt(ctx, String(k + 1), cx + Math.cos((-(k + 0.5) * 30 * Math.PI) / 180) * r * 0.7,
      cy + Math.sin((-(k + 0.5) * 30 * Math.PI) / 180) * r * 0.7,
      { size: 15, col: "#EAF4F2", font: "marker", alpha: a });
  }
  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 120, noArc: true,
    prog: D.at(f, 20, 200), col: "#EAF4F2", arcCol: "#C9A227", label: false });

  if (p3 > 0) {
    D.txt(ctx, "four wedges, each 30\u00b0", W / 2 + 190, 150,
      { size: 18, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "4 \u00d7 30 = 120\u00b0", W / 2 + 190, 196,
      { size: 28, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "measuring an angle is counting, exactly like measuring a length",
      W / 2, H - 26, { size: 15, col: "rgba(234,244,242,.8)", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 860, 940), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport153 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "5 \u00d7 30 = 150", W / 2, 34, { size: 22, col: "#2D70B3", font: "marker" });
  D.txt(ctx, "five wedges, each thirty degrees", W / 2, H - 12,
    { size: 12, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "15-3",
  storageKey: "daf-g4-t15-l3",
  title: "Measure with Unit Angles",
  unit: "GRADE 4 · TOPIC 15 · LESSON 15-3 · 4.MD.C.5b",
  math: M,
  ixl: ["RK8", "LUJ"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Identical wedges drop into one angle until it is full. No question yet.",
      goal: "See measuring as filling, before any number appears.",
      pull: "The wedges never overlap and never leave a gap.",
      rail: { launch: "Describe what the wedges are doing. Do not count yet.",
        monitor: ["Noticing they are identical", "Counting them", "Noticing no gaps"],
        connect: "Why does it matter that the wedges are all the same?",
        misconception: "Thinking wedges of different sizes could be mixed." } },

    { phase: "launch", title: "The paper <em>fan</em>",
      lead: "A fan opens out, and every fold is 30 degrees wide. Estimate the angle of the open fan.",
      goal: "Create the need for count-times-unit.",
      pull: "Now let us count the wedges.",
      rail: { launch: "Commit to a number of degrees before you calculate.",
        monitor: ["Counting the folds", "Multiplying by thirty", "Guessing from the shape"],
        connect: "What two things do you need to know to measure it?",
        misconception: "Adding 4 and 30 instead of multiplying." } },

    { phase: "monitor", title: "Count the <em>wedges</em>",
      lead: "Same angle, three different wedge sizes. Watch the count change and the angle stay.",
      goal: "Count times unit size is the measurement.",
      pull: "Now join two angles together.",
      rail: { launch: "Predict the count before you tap each wedge size.",
        monitor: ["Counting the wedges", "Multiplying by the unit", "Noticing the angle is unchanged"],
        connect: "Why did the answer stay 120 every time?",
        misconception: "Believing a smaller wedge makes the angle smaller." } },

    { phase: "monitor", title: "Angles <em>add up</em>",
      lead: "Split one angle into two pieces and put them back together.",
      goal: "Establish additivity before lesson 15-5 needs it.",
      pull: "Now judge some measurements.",
      rail: { launch: "Predict the total before the last step.",
        monitor: ["Adding the pieces", "Checking against a right angle", "Noticing no overlap"],
        connect: "What would go wrong if the pieces overlapped?",
        misconception: "Multiplying the two pieces instead of adding." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each measurement. No grading until the class commits.",
      goal: "Practise count-times-unit under scrutiny.",
      pull: "Two students measured the same angle differently.",
      rail: { launch: "For each one, name the wedge size and the count.",
        monitor: ["Multiplying count by unit", "Adding instead", "Checking against 90"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Reporting the count as if it were the measure." } },

    { phase: "connect", title: "Two <em>wedge sizes</em>",
      lead: "Qais used four thirty-degree wedges. Ibrahim used twelve ten-degree wedges.",
      goal: "A smaller unit gives a bigger count but the same measure.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one measures a tricky angle better.",
        monitor: ["Using big wedges", "Using small wedges", "Noticing both give 120"],
        connect: "When would you want the smaller wedge?",
        misconception: "Believing more wedges means a bigger angle." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Four wedges. Each one thirty degrees. So one hundred and twenty.",
      goal: "The moment measuring-by-counting is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Drop the wedges in with them, counting aloud.",
        monitor: ["Counting aloud", "Multiplying", "Restating the rule"],
        connect: "Who can say the rule without the picture?",
        misconception: "Skipping the multiplication and reporting the count." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that works for every measuring tool you own.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Naming the unit", "Counting", "Multiplying"],
        connect: "How is this the same as measuring with a ruler?",
        misconception: "Treating angle measurement as a different kind of thing." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on count-times-unit.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Multiply the count by the wedge size.",
        monitor: ["Multiplying 5 by 30", "Adding 5 and 30", "Checking it beats 90"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 35 by adding." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: the protractor, which is just a fan of one-degree wedges.",
      rail: { launch: "Three students state the rule.",
        monitor: ["Multiplies confidently", "Still reports the count", "Ready for the protractor"],
        connect: "Who is folding a fan at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [unit, setUnit] = useState(30);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm153} height={256} award={award}
          notices={["The wedges are all the same", "Four of them fill the angle", "There are no gaps", "They do not overlap"]}
          wonders={["How big is one wedge?", "How big is the whole angle?", "What if the wedges were smaller?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory153} height={256} award={award}
          label="How wide is the open fan?" min={30} max={300} start={100} unit="°"
          after="Locked. Now let us count the wedges properly."
          note="Each fold is 30 degrees, and you can see how many folds there are." />;

      case 2:
        return <ExploreChips draw={makeWedge153(unit)} height={256}
          label="Change the wedge size" value={unit}
          onPick={(v) => setUnit(v)}
          chips={[{ v: 60, label: "60° wedges" }, { v: 30, label: "30° wedges" },
                  { v: 20, label: "20° wedges" }, { v: 10, label: "10° wedges" }]}
          caption={<MathEl omml={M.counts[unit]} size="xl" display="block" />}
          footnote="Smaller wedges mean a bigger count — never a bigger angle." />;

      case 3:
        return <ExploreChips draw={makeAdd153(step)} height={256}
          label="Split it, then join it" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the whole angle" }, { v: 1, label: "first piece" },
                  { v: 2, label: "second piece" }, { v: 3, label: "add them" }]}
          caption={<MathEl omml={M.additive} size="lg" display="block" />}
          footnote="No overlap and no gap — so the two measures simply add." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "4 wedges of 30° = 120°", target: "yes" },
                  { id: "c2", text: "4 wedges of 30° = 34°", target: "no" },
                  { id: "c3", text: "12 wedges of 10° = 120°", target: "yes" },
                  { id: "c4", text: "12 wedges of 10° = 12°", target: "no" }]}
          targets={[{ id: "yes", label: "correct — count times unit" },
                    { id: "no", label: "not yet — that is just the count" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Qais's way — four big wedges", omml: M.count, h: 92,
            quote: "Four wedges of thirty degrees. A hundred and twenty." }}
          right={{ name: "Ibrahim's way — twelve small ones", omml: M.tenDeg, h: 92,
            quote: "Twelve wedges of ten degrees. Also a hundred and twenty." }}
          same={["Both measure 120°", "Both count then multiply", "Both fill the same angle"]}
          diff={["Qais counts four", "Ibrahim counts twelve", "Ibrahim's can measure 125° too"]} />;

      case 6:
        return <BoardScreen draw={drawBoard153} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "count the unit angles and multiply by the size of one" }]}
          hand={"how big is one wedge? · how many fit? · multiply"}
          cards={[{ title: "The measurement we made", omml: M.count, note: "four wedges of thirty" },
                  { title: "Tap for a smaller unit", omml: M.smallerUnit, revealOmml: M.tenDeg, reveal: true,
                    note: "same angle, twelve wedges" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="An angle is filled by 5 wedges, each 30 degrees wide. How big is it?"
          omml={M.swyk}
          options={[{ v: "a", text: "35°" }, { v: "b", text: "5°" }, { v: "c", text: "150°" }, { v: "d", text: "30°" }]}
          right="c"
          support={{ yes: "Yes — five wedges of thirty degrees each.",
            notYet: "Not yet — the count has to be multiplied by the wedge size.",
            draw: drawSupport153, h: 90, hint: "5 × 30 = 150, which is more than a right angle." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Fold a paper fan at home, count the folds, and work out its angle." />;

      default: return null;
    }
  }
};
