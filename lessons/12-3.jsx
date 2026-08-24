/* ===========================================================================
   Grade 4 · Topic 12 · LESSON 12-3 · Compare Decimals
   Standard 4.NF.C.7   I can ... compare two decimals by place value, and know
   why the longer decimal is not automatically the bigger one.
   =========================================================================== */

const M = {
  pair: om(mnor("0.4 and 0.38")),
  compare: om(mnor("0.4 > 0.38")),
  align: om(mnor("0.40 and 0.38 \u2014 now compare hundredths")),
  tenthsFirst: om(mnor("4 tenths beats 3 tenths, so nothing else matters")),
  wrongIdea: om(mnor("\u201c38 is bigger than 4, so 0.38 is bigger\u201d")),
  sameWhole: om(mnor("compare only if the wholes are the same size")),
  rule: om(mnor("line up the point \u00b7 compare tenths \u00b7 only then hundredths")),
  swyk: om(mnor("0.7 and 0.65")),
  swykAnswer: om(mnor("0.7 is greater"))
};

/* two grids side by side, so the comparison is visible before it is written */
const makeGrids123 = (pair) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const pairs = {
    p1: { a: 40, b: 38, aL: "0.4", bL: "0.38", sign: ">" },
    p2: { a: 25, b: 52, aL: "0.25", bL: "0.52", sign: "<" },
    p3: { a: 60, b: 60, aL: "0.6", bL: "0.60", sign: "=" }
  };
  const j = pairs[pair];
  const s = Math.min(112, H - 116);
  D.decGrid(ctx, { x: W / 2 - s - 52, y: 36, s: s, tenths: false, shaded: j.a, prog: 1,
    col: "#2D70B3", label: j.aL });
  D.decGrid(ctx, { x: W / 2 + 52, y: 36, s: s, tenths: false, shaded: j.b, prog: 1,
    col: "#FA7E19", label: j.bL });

  const pulse = 0.55 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, j.sign, W / 2, 36 + s / 2 + 4,
    { size: 46, col: "#C9A227", font: "marker", alpha: pulse + 0.35 });

  const notes = {
    p1: "40 squares beats 38 squares \u2014 even though 38 looks like a bigger number",
    p2: "25 squares is fewer than 52 squares",
    p3: "the same 60 squares, written two ways"
  };
  D.txt(ctx, notes[pair], W / 2, H - 14, { size: 13, col: "#34D399", font: "marker" });
};

/* the place-value column method */
const makeColumns123 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cw = 62;
  const heads = ["ones", "tenths", "hundredths"];
  const rows = [["0", "4", step >= 1 ? "0" : ""], ["0", "3", "8"]];

  heads.forEach((h, k) => {
    D.txt(ctx, h, cx + (k - 1) * cw, 42,
      { size: 12, col: k === 1 && step >= 2 ? "#34D399" : "rgba(234,244,242,.65)",
        font: "marker" });
  });
  D.marker(ctx, [[cx - 1.7 * cw, 56], [cx + 1.7 * cw, 56]], 1, "rgba(201,162,39,.5)", 1.6);

  rows.forEach((r, ri) => {
    r.forEach((d, k) => {
      if (!d) return;
      const fresh = ri === 0 && k === 2 && step === 1;
      D.txt(ctx, d, cx + (k - 1) * cw, 92 + ri * 48,
        { size: 30, col: fresh ? "#C9A227" : "#EAF4F2", font: "marker",
          alpha: fresh ? 0.6 + Math.sin(frame / 12) * 0.35 : 1 });
    });
    /* the decimal point */
    D.txt(ctx, ".", cx - 0.5 * cw + 2, 100 + ri * 48, { size: 30, col: "#C9A227", font: "marker" });
  });

  if (step >= 2) {
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    ctx.save();
    ctx.globalAlpha = pulse + 0.4;
    D.rr(ctx, cx - cw / 2 + 4, 70, cw - 8, 96, 8);
    ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "4 tenths beats 3 tenths \u2014 stop here", W / 2, H - 34,
      { size: 15, col: "#34D399", font: "marker" });
    D.txt(ctx, "0.4 > 0.38", W / 2, H - 12, { size: 14, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, step === 0 ? "line up the decimal points"
         : "pad the short one with a zero so both have two places",
      W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
  }
};

const drawWarm123 = (ctx, W, H, frame) => {
  const CYCLE = 580, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(104, H - 112);
  D.decGrid(ctx, { x: W / 2 - s - 46, y: 40, s: s, tenths: false, shaded: 40,
    prog: D.at(f, 20, 250), col: "#6042A6", label: "0.4" });
  D.decGrid(ctx, { x: W / 2 + 46, y: 40, s: s, tenths: false, shaded: 38,
    prog: D.at(f, 250, 480), col: "#6042A6", label: "0.38" });
  D.txt(ctx, "two decimals, shaded on identical squares", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 460, 550) });
};

const drawStory123 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 380, 520);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two runners on the 100 metre track", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracLine(ctx, { x: 70, y: 92, w: W - 140, den: 10, whole: 1, prog: D.at(f, 60, 300),
    labelAll: true, marks: [{ n: 4, den: 10, col: "#2D70B3", label: "Omar 0.4" }] });
  D.fracLine(ctx, { x: 70, y: 168, w: W - 140, den: 10, whole: 1, prog: D.at(f, 180, 420),
    labelAll: true, marks: [{ n: 3.8, den: 10, col: "#FA7E19", label: "Reem 0.38", up: true }] });
  if (p3 > 0) {
    D.txt(ctx, "who has run further \u2014 Omar or Reem?", W / 2, H - 12,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard123 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Compare the tenths before anything else" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 260, 460), p3 = D.at(f, 480, 680), p4 = D.at(f, 700, 920);
  const s = 108;

  D.decGrid(ctx, { x: W / 2 - s - 60, y: 92, s: s, tenths: false, shaded: 40, prog: p1,
    col: "#2D70B3", label: "0.4 = 0.40" });
  if (p2 > 0) {
    D.decGrid(ctx, { x: W / 2 + 60, y: 92, s: s, tenths: false, shaded: 38, prog: p2,
      col: "#FA7E19", label: "0.38" });
  }
  if (p3 > 0) {
    D.txt(ctx, ">", W / 2, 146, { size: 44, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "4 tenths against 3 tenths \u2014 the hundredths never get a vote",
      W / 2, 268, { size: 16, col: "#EAF4F2", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "0.4 > 0.38", W / 2, 316, { size: 28, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "more digits does not mean more value \u2014 the place is what counts",
      W / 2, H - 26, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 790, 890) });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 840, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport123 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = H - 20;
  D.decGrid(ctx, { x: W / 2 - s - 34, y: 10, s: s, tenths: false, shaded: 70, prog: 1,
    col: "#2D70B3", label: null });
  D.decGrid(ctx, { x: W / 2 + 34, y: 10, s: s, tenths: false, shaded: 65, prog: 1,
    col: "#C74440", label: null });
  D.txt(ctx, "70 squares against 65 squares", W / 2, H - 6,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "12-3",
  storageKey: "daf-g4-t12-l3",
  title: "Compare Decimals",
  unit: "GRADE 4 · TOPIC 12 · LESSON 12-3 · 4.NF.C.7",
  math: M,
  ixl: ["CV7", "DY5", "EAL", "T2W"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two identical squares, shaded 0.4 and 0.38. No question yet.",
      goal: "Let the picture settle the comparison before any rule appears.",
      pull: "One of these looks bigger than its number suggests.",
      rail: { launch: "Describe both squares. Do not say which is bigger yet.",
        monitor: ["Counting whole strips", "Counting small squares", "Noticing they are close"],
        connect: "Which looks bigger, and does the writing agree?",
        misconception: "Deciding from the number of digits." } },

    { phase: "launch", title: "Omar or <em>Reem</em>?",
      lead: "Omar has run 0.4 of the track. Reem has run 0.38. Estimate who is ahead.",
      goal: "Create the need for a reliable comparison method.",
      pull: "Now let us compare properly.",
      rail: { launch: "Commit to a runner before you calculate anything.",
        monitor: ["Reasoning from tenths", "Reasoning from 38 vs 4", "Using the line"],
        connect: "Why does 38 look bigger than 4?",
        misconception: "Reading the digits after the point as a whole number." } },

    { phase: "monitor", title: "Shade both, <em>then decide</em>",
      lead: "Same square, same hundred cells, two different amounts shaded.",
      goal: "Ground the comparison in a countable picture.",
      pull: "Now do it without the picture.",
      rail: { launch: "Predict the sign before you tap.",
        monitor: ["Counting squares", "Counting whole strips first", "Trusting the digits"],
        connect: "Which pair surprised you?",
        misconception: "Assuming 0.6 and 0.60 are different amounts." } },

    { phase: "monitor", title: "Line up the <em>places</em>",
      lead: "Write both numbers in columns, pad the short one, compare from the left.",
      goal: "The written method, checked against the picture.",
      pull: "Now judge some comparisons.",
      rail: { launch: "Which column do you look at first, and why the left?",
        monitor: ["Padding with a zero", "Comparing tenths first", "Comparing hundredths first"],
        connect: "Why can we stop as soon as the tenths differ?",
        misconception: "Comparing the rightmost digits first, like a whole number." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each comparison. No grading until the class commits.",
      goal: "Hunt the 'longer means bigger' error together.",
      pull: "Two students argued the same pair differently.",
      rail: { launch: "For each one, name the place that decides it.",
        monitor: ["Naming the deciding place", "Padding mentally", "Counting digits"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Claiming 0.38 > 0.4 because 38 > 4." } },

    { phase: "connect", title: "Two ways to <em>argue it</em>",
      lead: "Hala padded to 0.40 and compared hundredths. Faisal stopped at the tenths.",
      goal: "Both arguments are valid; one is shorter.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask when padding is genuinely needed.",
        monitor: ["Padding then comparing", "Stopping at the tenths", "Checking with a grid"],
        connect: "When would you have to look at the hundredths?",
        misconception: "Believing padding changes the value." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Tenths first. Hundredths only if the tenths tie.",
      goal: "The moment the comparison rule is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Shade both grids with them, then write the sign.",
        monitor: ["Predicting the sign", "Naming the deciding place", "Restating the rule"],
        connect: "Who can say why we compare from the left?",
        misconception: "Comparing without checking the wholes are the same." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Three steps, in order, and you never need a picture again.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the three steps aloud, once.",
        monitor: ["Lining up the point", "Comparing tenths", "Moving right only on a tie"],
        connect: "What has to be true before the rule is safe to use?",
        misconception: "Comparing decimals of different wholes, like 1.2 and 0.99, by digits alone." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on comparing decimals.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Look at the tenths first.",
        monitor: ["Comparing 7 tenths with 6 tenths", "Padding to 0.70", "Counting digits"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 0.65 because it has more digits." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: adding fractions with denominators of ten and a hundred.",
      rail: { launch: "Three students compare a pair out loud.",
        monitor: ["Compares from the left", "Still counts digits", "Ready to add"],
        connect: "Who is comparing two prices at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [pair, setPair] = useState("p1");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm123} height={256} award={award}
          notices={["Both squares have a hundred cells", "One has four full strips", "The other is nearly four strips", "They are very close"]}
          wonders={["Which one is bigger?", "Does 0.38 beat 0.4?", "Why does 38 look bigger than 4?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory123} height={256} award={award}
          label="How many hundredths ahead is the leader?" min={0} max={20} start={5} unit="/ 100"
          after="Locked. Now let us settle who is ahead."
          note="0.4 means four tenths, which is forty hundredths." />;

      case 2:
        return <ExploreChips draw={makeGrids123(pair)} height={256}
          label="Shade both and compare" value={pair}
          onPick={(v) => setPair(v)}
          chips={[{ v: "p1", label: "0.4 and 0.38" }, { v: "p2", label: "0.25 and 0.52" },
                  { v: "p3", label: "0.6 and 0.60" }]}
          caption={<MathEl omml={M.compare} size="xl" display="block" />}
          footnote="Both squares must be the same size or the comparison means nothing." />;

      case 3:
        return <ExploreChips draw={makeColumns123(step)} height={256}
          label="Compare in columns" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "line up the point" }, { v: 1, label: "pad with a zero" }, { v: 2, label: "compare tenths" }]}
          caption={<MathEl omml={M.tenthsFirst} size="lg" display="block" />}
          footnote="Always start at the biggest place, exactly as with whole numbers." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "0.4 > 0.38", target: "yes" },
                  { id: "c2", text: "0.38 > 0.4", target: "no" },
                  { id: "c3", text: "0.6 = 0.60", target: "yes" },
                  { id: "c4", text: "0.60 > 0.6", target: "no" }]}
          targets={[{ id: "yes", label: "correct — decided by place" },
                    { id: "no", label: "not yet — digits are not value" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Hala's way — pad and compare", omml: M.align, h: 92,
            quote: "I wrote 0.40 so both had two places, then compared 40 with 38." }}
          right={{ name: "Faisal's way — stop at the tenths", omml: M.tenthsFirst, h: 92,
            quote: "Four tenths beats three tenths. I did not need the rest." }}
          same={["Both give 0.4 > 0.38", "Both compare from the left", "Both agree with the grids"]}
          diff={["Hala pads first", "Faisal stops early", "Hala's method still works when the tenths tie"]} />;

      case 6:
        return <BoardScreen draw={drawBoard123} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "line up the point, compare tenths, only then hundredths" }]}
          hand={"same size whole? · line up the point · compare from the left · stop at the first difference"}
          cards={[{ title: "The pair we compared", omml: M.compare, note: "the tenths settled it" },
                  { title: "Tap for the trap", omml: M.sameWhole, revealOmml: M.wrongIdea, reveal: true,
                    note: "counting digits is not comparing" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Which is greater, 0.7 or 0.65?" omml={M.swyk}
          options={[{ v: "a", text: "0.65" }, { v: "b", text: "0.7" }, { v: "c", text: "they are equal" }, { v: "d", text: "cannot tell" }]}
          right="b"
          support={{ yes: "Yes — seven tenths is seventy hundredths, and 70 beats 65.",
            notYet: "Not yet — more digits does not mean more value.",
            draw: drawSupport123, h: 100, hint: "Pad 0.7 to 0.70 and compare the hundredths." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find two prices at home that differ by less than a riyal and say which is greater, and why." />;

      default: return null;
    }
  }
};
