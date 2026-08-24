/* ===========================================================================
   Grade 4 · Topic 10 · LESSON 10-1 · Fractions as Multiples of Unit Fractions
   Standard 4.NF.B.4a   I can ... see any fraction as a number of copies of one
   unit fraction, and write that as a multiplication.
   =========================================================================== */

const M = {
  unit: om(mfrac(1, 6)),
  five: om(mfrac(5, 6)),
  asMult: om(mfrac(5, 6), mt("=5\u00d7"), mfrac(1, 6)),
  asSum: om(mfrac(1, 6), mt("+"), mfrac(1, 6), mt("+"), mfrac(1, 6), mt("+"), mfrac(1, 6), mt("+"), mfrac(1, 6)),
  countTxt: om(mnor("five copies of one sixth")),
  overOne: om(mfrac(9, 4), mt("=9\u00d7"), mfrac(1, 4)),
  general: om(mfrac("a", "b"), mt("=a\u00d7"), mfrac(1, "b")),
  rule: om(mnor("the numerator counts the copies \u00b7 the denominator names the copy")),
  swyk: om(mfrac(7, 8)),
  swykAnswer: om(mt("7\u00d7"), mfrac(1, 8))
};

/* the kunafa tray: one piece, then copies of it */
const makeCopies101 = (copies) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124, pw = w / 6;

  D.fracBar(ctx, { x: x, y: 78, w: w, h: 56, den: 6, num: copies, prog: 1,
    col: copies === 5 ? "#388C46" : "#2D70B3", label: false });

  /* halo every copy that has been counted, one at a time */
  for (let k = 0; k < copies; k++) {
    const pulse = 0.4 + Math.sin(frame / 15 + k * 0.7) * 0.25;
    ctx.save();
    ctx.globalAlpha = pulse;
    D.rr(ctx, x + k * pw + 2.5, 74, pw - 5, 64, 6);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, "1/6", x + (k + 0.5) * pw, 56, { size: 11.5, col: "#C9A227", font: "mono", weight: 700 });
  }

  D.txt(ctx, copies === 0 ? "the tray is cut into 6 equal pieces"
       : copies + (copies === 1 ? " copy of one sixth" : " copies of one sixth"),
    W / 2, H - 42, { size: 15, col: copies === 5 ? "#34D399" : "#EAF4F2", font: "marker" });
  D.txt(ctx, copies === 0 ? "one piece is the unit fraction"
       : copies + " \u00d7 1/6 = " + copies + "/6",
    W / 2, H - 18, { size: 13, col: "#C9A227", font: "marker" });
};

/* the same counting on a number line — every hop is one sixth */
const makeHops101 = (hops) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 70, w = W - 140, y = H / 2 + 14;
  const px = D.fracLine(ctx, { x: x, y: y, w: w, den: 6, whole: 1, prog: 1, labelAll: true,
    marks: hops > 0 ? [{ n: hops, den: 6, col: "#34D399" }] : [] });
  for (let k = 0; k < hops; k++) {
    const from = px(k, 6), to = px(k + 1, 6);
    const pts = [];
    for (let s = 0; s <= 14; s++) {
      const t = s / 14;
      pts.push([from + (to - from) * t, y - Math.sin(Math.PI * t) * 26]);
    }
    D.marker(ctx, pts, 1, "#388C46", 2);
    D.txt(ctx, "1/6", (from + to) / 2, y - 38, { size: 10.5, col: "#388C46", font: "mono", weight: 700 });
  }
  D.txt(ctx, hops === 0 ? "start at zero" : hops + " hops of one sixth land on " + hops + "/6",
    W / 2, 32, { size: 14.5, col: hops === 0 ? "#EAF4F2" : "#34D399", font: "marker" });
};

/* launch story — the tray arrives whole and pieces leave */
const drawStory101 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 340), p3 = D.at(f, 360, 500);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the kunafa tray at break time", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 62, y: 62, w: W - 124, h: 54, den: 6, num: 5, prog: p2,
    col: "#FA7E19", label: false });
  if (p3 > 0) {
    D.txt(ctx, "Yousef took one piece. So did Layla, Salma, Omar and Reem.",
      W / 2, 152, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how much of the tray has gone?", W / 2, H - 18,
      { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard101 = (ctx, W, H, frame) => {
  const CYCLE = 860, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "One piece, counted five times" });
  const p1 = D.at(f, 20, 180), p2 = D.at(f, 190, 400), p3 = D.at(f, 410, 580), p4 = D.at(f, 600, 820);
  const x = 104, w = W - 208, pw = w / 6;

  D.fracBar(ctx, { x: x, y: 104, w: w, h: 50, den: 6, num: 1, prog: p1, col: "#2D70B3", label: false });
  D.txt(ctx, "one sixth \u2014 the unit", x + pw / 2, 90, { size: 13, col: "#2D70B3", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.fracBar(ctx, { x: x, y: 196, w: w, h: 50, den: 6, num: 5, prog: p2, col: "#388C46", label: false });
    for (let k = 0; k < 5; k++) {
      const a = D.at(f, 200 + k * 34, 250 + k * 34);
      if (a <= 0) continue;
      D.txt(ctx, String(k + 1), x + (k + 0.5) * pw, 221,
        { size: 17, col: "#0B1F24", font: "marker", alpha: a });
    }
    D.txt(ctx, "count the copies, do not re-cut the tray", W / 2, 268,
      { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "5/6 = 5 \u00d7 1/6", W / 2, 316, { size: 24, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the top number was never a mystery \u2014 it was always a count",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 780) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 720, 830), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport101 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 16, w: W - 52, h: 32, den: 8, num: 7, prog: 1, col: "#2D70B3", label: false });
  D.txt(ctx, "seven eighth-pieces \u2014 so seven copies of 1/8", W / 2, 72,
    { size: 12, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "10-1",
  storageKey: "daf-g4-t10-l1",
  title: "Fractions as Multiples of Unit Fractions",
  unit: "GRADE 4 · TOPIC 10 · LESSON 10-1 · 4.NF.B.4a",
  math: M,
  ixl: ["XKJ", "VYG", "EXQ", "8J3", "DSB"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A tray in six equal pieces. Five of them are outlined one at a time. No question yet.",
      goal: "Get every student to say something about a picture they already understand.",
      pull: "Those outlines are all the same size.",
      rail: { launch: "No answer needed. Tell me what the gold outlines are doing.",
        monitor: ["Counting the outlined pieces", "Naming one piece as one sixth", "Noticing all the pieces match"],
        connect: "Someone said 'five ones'. Five of what?",
        misconception: "Reading 5/6 as five wholes and six pieces." } },

    { phase: "launch", title: "Five friends, <em>one piece each</em>",
      lead: "The kunafa tray is cut into six equal pieces. Five students each take one. Estimate how much of the tray is gone.",
      goal: "Create the need to describe a fraction as a repeated amount.",
      pull: "Now count the pieces instead of guessing.",
      rail: { launch: "Do not calculate. Look at the tray and commit to a number.",
        monitor: ["Estimating close to the whole", "Saying five sixths", "Saying five out of six"],
        connect: "Everyone said something like five. Five of what unit?",
        misconception: "Estimating in halves because the tray looks nearly full." } },

    { phase: "monitor", title: "Count the <em>copies</em>",
      lead: "Add one copy of one sixth at a time. Watch what happens to the top number.",
      goal: "The numerator is revealed as a count, not a new number.",
      pull: "The same count, but on a line.",
      rail: { launch: "Predict the fraction before you add the next copy.",
        monitor: ["Saying the count out loud", "Watching the denominator stay at six", "Trying to change the denominator too"],
        connect: "Why does the six never move?",
        misconception: "Writing 5/30 by multiplying the denominator as well." } },

    { phase: "monitor", title: "Five hops of <em>one sixth</em>",
      lead: "Every hop is the same length. Count the hops, then read where you land.",
      goal: "A second representation of the same repeated unit.",
      pull: "Some of these statements are true and some are not.",
      rail: { launch: "How long is one hop? Say it before you press.",
        monitor: ["Hopping in unit fractions", "Counting tick marks instead of hops", "Predicting the landing point"],
        connect: "How is a hop the same as a piece of the tray?",
        misconception: "Counting the tick at zero as the first hop." } },

    { phase: "monitor", title: "True or <em>not yet</em>?",
      lead: "Sort each statement. Nothing is graded until the whole class commits.",
      goal: "Separate a genuine multiple of a unit fraction from a look-alike.",
      pull: "Two students wrote the same fraction two different ways.",
      rail: { launch: "Check the size of the piece before you check the count.",
        monitor: ["Checking the denominator matches", "Counting the copies", "Sketching a bar to test one"],
        connect: "What is wrong with the ones you rejected?",
        misconception: "Believing 3 × 1/4 = 3/12 because both numbers get multiplied." } },

    { phase: "connect", title: "Adding or <em>multiplying</em>?",
      lead: "Noura wrote it as a long addition. Faisal wrote it as one multiplication. Both are describing the same tray.",
      goal: "Multiplication is exposed as shorthand for repeated addition of a unit fraction.",
      pull: "Let us draw it on the board.",
      rail: { launch: "Show both. Do not say which one you prefer.",
        monitor: ["Matching the five plus signs to the five", "Preferring the shorter form", "Explaining why they agree"],
        connect: "Which one would you rather write for twenty copies?",
        misconception: "Thinking multiplication always makes a number bigger." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One sixth. Counted five times. Five sixths. The piece never changed size.",
      goal: "The moment the idea is taught, not displayed.",
      pull: "Now say it as a rule.",
      rail: { launch: "Draw the unit first and hold it there while they name it.",
        monitor: ["Predicting the result bar", "Naming the unit fraction", "Restating the count in their words"],
        connect: "Who can say what the top number counts?",
        misconception: "Losing track of the unit when the count grows past the whole." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that works for every fraction you will ever meet.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud together, once.",
        monitor: ["Naming the unit for a new fraction", "Testing it past one whole", "Explaining the denominator"],
        connect: "Does it still work when the fraction is bigger than one?",
        misconception: "Assuming the rule stops working above one whole." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on the unit-fraction idea.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Ask yourself what one piece is called.",
        monitor: ["Naming the unit first", "Multiplying both numbers", "Sketching a bar to check"],
        connect: "Collect the answers to open tomorrow's lesson.",
        misconception: "Answering 7/56 by multiplying the denominator too." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can genuinely do tonight.",
      pull: "Tomorrow: multiplying a fraction by a whole number with models.",
      rail: { launch: "Ask three students to name a unit fraction they saw today.",
        monitor: ["Can explain it without a picture", "Still needs the bar", "Ready for the next step"],
        connect: "Who is teaching this at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [copies, setCopies] = useState(0);
    const [hops, setHops] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeCopies101(5)} height={256} award={award}
          notices={["The tray is cut into six", "Five pieces are outlined", "Every outline is the same size", "One piece is called one sixth"]}
          wonders={["Why is one sixth written on each piece?", "Could I write this as a times?", "What if six pieces were taken?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory101} height={256} award={award}
          label="How many sixths of the tray have gone?" min={1} max={6} start={3} unit="/ 6"
          after="Locked. Now let us count the pieces properly."
          note="Every student took exactly one piece, and every piece is the same size." />;

      case 2:
        return <ExploreChips draw={makeCopies101(copies)} height={256}
          label="Add one copy at a time" value={copies}
          onPick={(v) => setCopies(v)}
          chips={[{ v: 0, label: "empty tray" }, { v: 1, label: "1 copy" }, { v: 2, label: "2 copies" },
                  { v: 3, label: "3 copies" }, { v: 5, label: "5 copies" }]}
          caption={<MathEl omml={M.asMult} size="xl" display="block" />}
          footnote="The denominator names the piece. The numerator counts how many of them." />;

      case 3:
        return <ExploreChips draw={makeHops101(hops)} height={256}
          label="Hop along in sixths" value={hops}
          onPick={(v) => setHops(v)}
          chips={[{ v: 0, label: "at zero" }, { v: 2, label: "2 hops" }, { v: 4, label: "4 hops" }, { v: 5, label: "5 hops" }]}
          caption={<MathEl omml={M.countTxt} size="lg" display="block" />}
          footnote="Every hop is exactly one unit fraction long." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "5/6 = 5 × 1/6", target: "yes" },
                  { id: "b2", text: "3/4 = 3 × 1/12", target: "no" },
                  { id: "b3", text: "9/4 = 9 × 1/4", target: "yes" },
                  { id: "b4", text: "2/5 = 2 × 2/5", target: "no" }]}
          targets={[{ id: "yes", label: "true — copies of the unit fraction" },
                    { id: "no", label: "not yet — the unit is wrong" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Noura's way — repeated addition", omml: M.asSum, h: 92,
            quote: "One sixth five times. I wrote every single one." }}
          right={{ name: "Faisal's way — one multiplication", omml: M.asMult, h: 92,
            quote: "Five copies. I just wrote five times one sixth." }}
          same={["Both give 5/6", "Both keep the sixth as the piece", "Both count five things"]}
          diff={["Noura writes five terms, Faisal writes one", "Faisal's is faster for big counts", "Noura's shows the counting"]} />;

      case 6:
        return <BoardScreen draw={drawBoard101} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.general, alt: "a over b equals a times one over b" }]}
          hand={"name the piece · count the copies · write it as a multiplication"}
          cards={[{ title: "The tray we modelled", omml: M.asMult, note: "five copies of one sixth" },
                  { title: "Tap to test it past one whole", omml: M.rule, revealOmml: M.overOne, reveal: true,
                    note: "nine quarter-pieces is still just a count" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Which multiplication describes seven eighths?" omml={M.swyk}
          options={[{ v: "a", text: "7 × 1/8" }, { v: "b", text: "8 × 1/7" }, { v: "c", text: "7 × 7/8" }, { v: "d", text: "7 × 1/56" }]}
          right="a"
          support={{ yes: "Yes — one eighth, counted seven times.",
            notYet: "Not yet — one piece of this bar is one eighth.",
            draw: drawSupport101, h: 92, hint: "The denominator names the piece; the numerator counts the copies." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Cut something at home into equal pieces, take some, and write it as a multiplication." />;

      default: return null;
    }
  }
};
