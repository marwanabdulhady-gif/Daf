/* ===========================================================================
   Grade 4 · Topic 12 · LESSON 12-6 · Problem Solving: Look For and Use
   Structure
   Standard MP.7 · 4.NF.C   I can ... notice a pattern in a set of decimals and
   use it instead of calculating every step.
   =========================================================================== */

const M = {
  seq: om(mnor("0.05 \u00b7 0.10 \u00b7 0.15 \u00b7 0.20 \u00b7 ...")),
  step: om(mnor("every step adds 5 hundredths")),
  tenth: om(mnor("every second step lands on a tenth")),
  shortcut: om(mnor("20 steps of 0.05 = 20 \u00d7 ") , mfrac(5, 100), mnor(" = 1.00")),
  pairs: om(mnor("0.35 + 0.65 = 1.00 \u2014 the halalas make a whole riyal")),
  longWay: om(mnor("0.05 + 0.05 + 0.05 + ... twenty times")),
  rule: om(mnor("look for the repeat \u00b7 use it \u00b7 do not recalculate")),
  swyk: om(mnor("0.85 + ? = 1.00")),
  swykAnswer: om(mnor("0.15"))
};

/* the growing savings jar — a sequence with visible structure */
const makeSeq126 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 70, w = W - 140, y = 118;
  const px = D.fracLine(ctx, { x: x, y: y, w: w, den: 10, whole: 1, prog: 1, labelAll: false });

  for (let k = 1; k <= n; k++) {
    const v = k * 0.05;
    const cx = x + v * w;
    const onTenth = k % 2 === 0;
    const a = Math.min(1, Math.max(0, (frame / 4 - k * 4) / 12));
    ctx.save();
    ctx.globalAlpha = 0.45 + a * 0.55;
    ctx.beginPath();
    ctx.arc(cx, y, onTenth ? 6 : 4, 0, Math.PI * 2);
    ctx.fillStyle = onTenth ? "#C9A227" : "#2D70B3";
    ctx.fill();
    ctx.restore();
    if (onTenth && k <= 10) {
      D.txt(ctx, (v).toFixed(1), cx, y - 20,
        { size: 10.5, col: "#C9A227", font: "mono", weight: 700 });
    }
  }
  D.txt(ctx, "Salma saves 5 halalas every day", W / 2, 30,
    { size: 13.5, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "after " + n + (n === 1 ? " day: " : " days: ") + (n * 0.05).toFixed(2) + " SR",
    W / 2, 62, { size: 19, col: "#34D399", font: "marker" });

  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, n >= 20 ? "twenty days is exactly one riyal"
       : "every second day lands exactly on a tenth of a riyal",
    W / 2, H - 30, { size: 13.5, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
  D.txt(ctx, n >= 20 ? "20 \u00d7 5 halalas = 100 halalas" : "0.05, 0.10, 0.15, 0.20 \u2026",
    W / 2, H - 10, { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
};

/* pairs that make a whole riyal — the structure worth memorising */
const makePairs126 = (a) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(112, H - 116);
  const b = 100 - a;
  D.decGrid(ctx, { x: W / 2 - s - 40, y: 34, s: s, tenths: false, shaded: a, prog: 1,
    col: "#2D70B3", label: (a / 100).toFixed(2) + " SR", sub: a + " halalas" });
  D.decGrid(ctx, { x: W / 2 + 40, y: 34, s: s, tenths: false, shaded: b, prog: 1,
    col: "#FA7E19", label: (b / 100).toFixed(2) + " SR", sub: b + " halalas" });
  D.txt(ctx, "+", W / 2, 34 + s / 2, { size: 32, col: "#C9A227", font: "marker" });

  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, a + " + " + b + " = 100 halalas = 1.00 SR", W / 2, H - 32,
    { size: 16, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
  D.txt(ctx, "the two shaded parts fill exactly one square", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawWarm126 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "a list that is going somewhere", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  const vals = ["0.05", "0.10", "0.15", "0.20", "0.25", "0.30", "?", "?"];
  vals.forEach((v, k) => {
    const a = D.at(f, 50 + k * 55, 150 + k * 55);
    D.txt(ctx, v, 62 + (k % 4) * ((W - 124) / 3), 88 + Math.floor(k / 4) * 62,
      { size: 26, col: v === "?" ? "#C9A227" : "#6042A6", font: "marker", alpha: a });
  });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 500, 580) });
};

const drawStory126 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "Salma's savings jar", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let k = 0; k < 8; k++) {
    const a = D.at(f, 70 + k * 34, 170 + k * 34);
    if (a <= 0) continue;
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, 60 + k * ((W - 120) / 8) + 4, 60, (W - 120) / 8 - 10, 36, 6);
    ctx.strokeStyle = "#FA7E19"; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "5", 60 + k * ((W - 120) / 8) + (W - 120) / 16, 82,
      { size: 15, col: "#FA7E19", font: "marker", alpha: a });
  }
  D.txt(ctx, "five halalas a day", W / 2, 124,
    { size: 13, col: "rgba(234,244,242,.7)", font: "marker", alpha: D.at(f, 260, 380) });
  if (p3 > 0) {
    D.txt(ctx, "how many days until the jar holds exactly one riyal?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard126 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Use the structure, skip the arithmetic" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 260, 480), p3 = D.at(f, 500, 720), p4 = D.at(f, 740, 940);
  const x = 140, w = W - 280, y = 176;

  D.txt(ctx, "0.05 \u00b7 0.10 \u00b7 0.15 \u00b7 0.20 \u00b7 0.25 \u00b7 0.30 \u00b7 \u2026", W / 2, 106,
    { size: 19, col: "#FA7E19", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.fracLine(ctx, { x: x, y: y, w: w, den: 10, whole: 1, prog: p2, labelAll: false });
    for (let k = 1; k <= 20; k++) {
      const a = D.at(f, 280 + k * 10, 340 + k * 10);
      if (a <= 0) continue;
      const cx = x + (k * 0.05) * w;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.beginPath(); ctx.arc(cx, y, k % 2 === 0 ? 5.5 : 3.8, 0, Math.PI * 2);
      ctx.fillStyle = k % 2 === 0 ? "#C9A227" : "#2D70B3";
      ctx.fill();
      ctx.restore();
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "the pattern lands on a tenth every second step", W / 2, 246,
      { size: 15, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "so ten tenths needs twenty steps", W / 2, 276,
      { size: 15, col: "#2D70B3", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "20 \u00d7 0.05 = 1.00 SR", W / 2, 324,
      { size: 26, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "nobody added twenty numbers \u2014 the structure did the work",
      W / 2, H - 26, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 820, 940) });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 860, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport126 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = H - 18;
  D.decGrid(ctx, { x: W / 2 - s - 28, y: 9, s: s, tenths: false, shaded: 85, prog: 1,
    col: "#2D70B3", label: null });
  D.decGrid(ctx, { x: W / 2 + 28, y: 9, s: s, tenths: false, shaded: 15, prog: 1,
    col: "#388C46", label: null });
  D.txt(ctx, "85 shaded, 15 empty \u2014 together one whole square", W / 2, H - 5,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "12-6",
  storageKey: "daf-g4-t12-l6",
  title: "Problem Solving: Look For and Use Structure",
  unit: "GRADE 4 · TOPIC 12 · LESSON 12-6 · MP.7 · 4.NF.C",
  math: M,
  ixl: ["K5N", "UGK"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A list of decimals appears one at a time, then two question marks. No question yet.",
      goal: "Let the class find the repeat before it is named.",
      pull: "Something is happening every single step.",
      rail: { launch: "Describe the list. Do not fill in the question marks yet.",
        monitor: ["Naming the step size", "Noticing the tenths", "Reading the pattern aloud"],
        connect: "What is the same about every jump?",
        misconception: "Reading 0.05 to 0.10 as a jump of five." } },

    { phase: "launch", title: "Salma's <em>savings jar</em>",
      lead: "Salma puts five halalas into her jar every day. Estimate how many days until the jar holds exactly one riyal.",
      goal: "Create the need for a shortcut instead of twenty additions.",
      pull: "Now let us look for the repeat.",
      rail: { launch: "Commit to a number of days before you calculate anything.",
        monitor: ["Estimating around twenty", "Guessing a hundred", "Reasoning in tenths"],
        connect: "Why is a hundred days too many?",
        misconception: "Confusing the number of halalas with the number of days." } },

    { phase: "monitor", title: "Follow the <em>repeat</em>",
      lead: "Add a day at a time and watch where the dots land.",
      goal: "The structure — every second step is a tenth — appears on its own.",
      pull: "There is a second piece of structure worth knowing.",
      rail: { launch: "Predict where the tenth marks will be.",
        monitor: ["Spotting the alternating pattern", "Counting to twenty", "Adding one at a time"],
        connect: "How many days for one tenth of a riyal?",
        misconception: "Recalculating each total from scratch." } },

    { phase: "monitor", title: "Pairs that make <em>one riyal</em>",
      lead: "Shade one grid and the other fills the rest. Every pair adds to a hundred halalas.",
      goal: "Complements to one are the most useful decimal structure in the topic.",
      pull: "Now judge some shortcuts.",
      rail: { launch: "Predict the partner before you tap.",
        monitor: ["Finding the complement", "Counting the empty squares", "Adding to 100"],
        connect: "What is the partner of 0.35, and how did you get it?",
        misconception: "Making pairs add to 10 rather than 100." } },

    { phase: "monitor", title: "Shortcut or <em>slog</em>?",
      lead: "Sort each approach. No grading until the class commits.",
      goal: "Reward noticing structure over grinding through arithmetic.",
      pull: "Two students found the answer differently.",
      rail: { launch: "For each one, ask what it would cost you in time.",
        monitor: ["Choosing the structure", "Choosing to add repeatedly", "Explaining why the shortcut works"],
        connect: "Which shortcut would you actually trust?",
        misconception: "Using a shortcut without checking it applies." } },

    { phase: "connect", title: "Two ways to <em>get there</em>",
      lead: "Hala added 0.05 twenty times. Omar noticed twenty fives make a hundred halalas.",
      goal: "The long way is not wrong — it is just slower and riskier.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one would survive a hundred days.",
        monitor: ["Adding repeatedly", "Using the multiplication", "Checking one against the other"],
        connect: "What did Omar see that Hala did not?",
        misconception: "Believing structure is guessing." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Every second step is a tenth. Ten tenths is a riyal. So twenty steps.",
      goal: "The moment the structure habit is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Plot the dots with them and let the pattern land.",
        monitor: ["Predicting the tenth marks", "Counting the steps", "Naming the shortcut"],
        connect: "Who can say the structure without the picture?",
        misconception: "Seeing a pattern that only holds for the first few terms." } },

    { phase: "synth", title: "The habit \u2014 <em>and why it works</em>",
      lead: "Three questions to ask before you start calculating anything.",
      goal: "Generalise the habit, not just this answer.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the three questions aloud, once.",
        monitor: ["Looking for a repeat", "Testing the repeat", "Using it"],
        connect: "What must you do before trusting a pattern?",
        misconception: "Using a pattern without testing it on a case you can check." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on complements to one.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. How many halalas are missing?",
        monitor: ["Counting up to a hundred", "Answering 0.25", "Sketching a grid"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Making the pair add to 0.90 instead of 1.00." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close the topic on a habit, not a fact.",
      pull: "Tomorrow: Topic 13 — finding equivalence in units of measure.",
      rail: { launch: "Three students name a structure they used today.",
        monitor: ["Looks for structure first", "Still calculates blindly", "Ready for measurement"],
        connect: "Who is spotting a pattern at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(4);
    const [a, setA] = useState(35);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm126} height={256} award={award}
          notices={["Every jump is 0.05", "Every second one ends in zero", "The numbers are growing", "0.10, 0.20, 0.30 are all tenths"]}
          wonders={["What comes next?", "When does it reach one?", "Could I skip ahead?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory126} height={256} award={award}
          label="How many days until the jar holds one riyal?" min={5} max={40} start={15} unit="days"
          after="Locked. Now let us find the repeat instead of adding."
          note="One riyal is a hundred halalas, and five go in each day." />;

      case 2:
        return <ExploreChips draw={makeSeq126(n)} height={256}
          label="Add a day at a time" value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 4, label: "4 days" }, { v: 8, label: "8 days" },
                  { v: 12, label: "12 days" }, { v: 20, label: "20 days" }]}
          caption={<MathEl omml={M.shortcut} size="xl" display="block" />}
          footnote="Notice where the gold dots land before you count anything." />;

      case 3:
        return <ExploreChips draw={makePairs126(a)} height={256}
          label="Find the partner that makes one riyal" value={a}
          onPick={(v) => setA(v)}
          chips={[{ v: 25, label: "0.25" }, { v: 35, label: "0.35" },
                  { v: 60, label: "0.60" }, { v: 85, label: "0.85" }]}
          caption={<MathEl omml={M.pairs} size="lg" display="block" />}
          footnote="The empty squares are always the partner — you never have to calculate them." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "d1", text: "20 × 0.05 = 1.00", target: "yes" },
                  { id: "d2", text: "0.35 + 0.65 = 1.00", target: "yes" },
                  { id: "d3", text: "10 × 0.05 = 1.00", target: "no" },
                  { id: "d4", text: "0.35 + 0.75 = 1.00", target: "no" }]}
          targets={[{ id: "yes", label: "structure that holds" },
                    { id: "no", label: "not yet — test it on the grid" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Hala's way — add them all", omml: M.longWay, h: 92,
            quote: "I added five halalas twenty times and got to a riyal." }}
          right={{ name: "Omar's way — use the structure", omml: M.shortcut, h: 92,
            quote: "Twenty fives is a hundred halalas. That is one riyal." }}
          same={["Both give twenty days", "Both use five halalas a day", "Both can be checked on the line"]}
          diff={["Hala does twenty additions", "Omar does one multiplication", "Omar's works for a whole year"]} />;

      case 6:
        return <BoardScreen draw={drawBoard126} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "look for the repeat, use it, do not recalculate" }]}
          hand={"what repeats? · does it hold every time? · use it instead of adding"}
          cards={[{ title: "The structure we used", omml: M.step, note: "every second step is a tenth" },
                  { title: "Tap for the pair structure", omml: M.tenth, revealOmml: M.pairs, reveal: true,
                    note: "halalas that complete a riyal" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Faisal has saved 0.85 SR. How much more does he need for one riyal?"
          omml={M.swyk}
          options={[{ v: "a", text: "0.25 SR" }, { v: "b", text: "0.15 SR" }, { v: "c", text: "0.05 SR" }, { v: "d", text: "1.15 SR" }]}
          right="b"
          support={{ yes: "Yes — 85 and 15 halalas make a hundred, which is one riyal.",
            notYet: "Not yet — count the empty squares on the grid.",
            draw: drawSupport126, h: 100, hint: "A hundred halalas make a riyal, so ask what 85 needs to reach 100." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a repeating pattern at home — prices, steps, days — and predict the tenth term without listing them." />;

      default: return null;
    }
  }
};
