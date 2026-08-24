/* ===========================================================================
   Grade 4 · Topic 10 · LESSON 10-2 · Multiply a Fraction by a Whole Number:
   Use Models
   Standard 4.NF.B.4b   I can ... use bars and number lines to multiply a
   fraction by a whole number, and read the answer as a mixed number.
   =========================================================================== */

const M = {
  problem: om(mt("4\u00d7"), mfrac(3, 5)),
  answer: om(mt("4\u00d7"), mfrac(3, 5), mt("="), mfrac(12, 5)),
  mixed: om(mfrac(12, 5), mt("=2"), mfrac(2, 5)),
  unitChain: om(mt("4\u00d7"), mfrac(3, 5), mt("=4\u00d7 3\u00d7"), mfrac(1, 5), mt("=12\u00d7"), mfrac(1, 5)),
  repeated: om(mfrac(3, 5), mt("+"), mfrac(3, 5), mt("+"), mfrac(3, 5), mt("+"), mfrac(3, 5)),
  other: om(mt("3\u00d7"), mfrac(2, 3), mt("="), mfrac(6, 3), mt("=2")),
  rule: om(mnor("copy the fraction, count all the pieces, then rename")),
  swyk: om(mt("3\u00d7"), mfrac(3, 4)),
  swykAnswer: om(mfrac(9, 4), mt("=2"), mfrac(1, 4))
};

/* four groups of three fifths, stacked, then poured into wholes */
const makeGroups102 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 58, w = W - 116;
  const shown = step === 0 ? 1 : step === 1 ? 4 : 4;

  if (step < 2) {
    /* one bar per group of 3/5 */
    for (let g = 0; g < 4; g++) {
      const on = g < shown;
      ctx.save();
      ctx.globalAlpha = on ? 1 : 0.16;
      D.fracBar(ctx, { x: x, y: 26 + g * 46, w: w * 0.78, h: 32, den: 5, num: 3, prog: 1,
        col: "#FA7E19", label: false });
      ctx.restore();
      D.txt(ctx, "3/5", x + w * 0.78 + 30, 42 + g * 46,
        { size: 13, col: on ? "#FA7E19" : "rgba(234,244,242,.25)", font: "marker" });
    }
    D.txt(ctx, shown === 1 ? "one group of three fifths" : "four groups of three fifths",
      W / 2, H - 34, { size: 15, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, shown === 1 ? "how many fifths altogether if we take four?" : "12 fifth-pieces in total",
      W / 2, H - 12, { size: 12.5, col: "#C9A227", font: "marker" });
  } else {
    /* poured into wholes */
    D.mixedBar(ctx, { x: x, y: 60, w: w, wholes: 3, den: 5, num: 12, h: 46, prog: 1,
      col: "#388C46", label: false });
    const pulse = 0.45 + Math.sin(frame / 16) * 0.25;
    D.txt(ctx, "12/5 = 2 wholes and 2 fifths", W / 2, 148,
      { size: 17, col: "#34D399", font: "marker" });
    D.txt(ctx, "the pieces never changed size \u2014 only how they are grouped",
      W / 2, H - 34, { size: 13, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
    D.txt(ctx, "same 12 fifths, tidier name", W / 2, H - 12,
      { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
  }
};

/* the same product as repeated hops on one long number line */
const makeHopLine102 = (groups) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120, y = H / 2 + 18;
  const px = D.fracLine(ctx, { x: x, y: y, w: w, den: 5, whole: 3, prog: 1,
    marks: groups > 0 ? [{ n: groups * 3, den: 5, col: "#34D399" }] : [] });
  for (let g = 0; g < groups; g++) {
    const from = px(g * 3, 5), to = px((g + 1) * 3, 5);
    const pts = [];
    for (let s = 0; s <= 16; s++) {
      const t = s / 16;
      pts.push([from + (to - from) * t, y - Math.sin(Math.PI * t) * 34]);
    }
    D.marker(ctx, pts, 1, g % 2 ? "#2D70B3" : "#FA7E19", 2.2);
    D.txt(ctx, "3/5", (from + to) / 2, y - 48, { size: 11.5, col: g % 2 ? "#2D70B3" : "#FA7E19", font: "mono", weight: 700 });
  }
  D.txt(ctx, groups === 0 ? "start at zero" : groups + " jumps of three fifths",
    W / 2, 28, { size: 14.5, col: "#EAF4F2", font: "marker" });
  if (groups === 4) {
    D.txt(ctx, "landed on 12/5, which is 2 and 2/5", W / 2, H - 14,
      { size: 13.5, col: "#34D399", font: "marker" });
  }
};

const drawStory102 = (ctx, W, H, frame) => {
  const CYCLE = 660, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 380), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "four bottles of laban for the class trip", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let g = 0; g < 4; g++) {
    const a = D.at(f, 120 + g * 55, 240 + g * 55);
    if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha = a;
    D.fracBar(ctx, { x: 66, y: 48 + g * 40, w: W - 200, h: 28, den: 5, num: 3, prog: 1,
      col: "#FA7E19", label: false });
    ctx.restore();
    D.txt(ctx, "3/5 full", W - 96, 62 + g * 40, { size: 12, col: "#FA7E19", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "each bottle is three fifths full. how much laban is that in total?",
      W / 2, H - 16, { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard102 = (ctx, W, H, frame) => {
  const CYCLE = 900, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Four copies, then rename" });
  const p1 = D.at(f, 20, 250), p2 = D.at(f, 260, 460), p3 = D.at(f, 470, 640), p4 = D.at(f, 660, 860);
  const x = 100, w = W - 200;

  /* the four groups going up */
  for (let g = 0; g < 4; g++) {
    const a = D.at(f, 20 + g * 55, 130 + g * 55);
    if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha = a;
    D.fracBar(ctx, { x: x, y: 84 + g * 34, w: w * 0.6, h: 24, den: 5, num: 3, prog: 1,
      col: "#FA7E19", label: false });
    ctx.restore();
    D.txt(ctx, "3/5", x + w * 0.6 + 26, 96 + g * 34, { size: 12.5, col: "#FA7E19", font: "marker", alpha: a });
  }
  if (p2 > 0) {
    D.txt(ctx, "12 fifth-pieces altogether", x + w * 0.6 / 2, 240,
      { size: 15, col: "#EAF4F2", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.mixedBar(ctx, { x: x, y: 264, w: w, wholes: 3, den: 5, num: 12, h: 38, prog: p3,
      col: "#388C46", label: false });
    D.txt(ctx, "12/5 = 2 and 2/5", W / 2, 336,
      { size: 22, col: "#C9A227", font: "marker", alpha: D.at(f, 540, 630) });
  }
  if (p4 > 0) {
    const yb = H - 34;
    D.marker(ctx, [[70, yb - 24], [W - 70, yb - 24]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "count the pieces first \u2014 rename them last",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 710, 820) });
    D.star8(ctx, W - 44, yb - 2, 15, D.at(f, 760, 880), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport102 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.mixedBar(ctx, { x: 24, y: 14, w: W - 48, wholes: 3, den: 4, num: 9, h: 30, prog: 1,
    col: "#2D70B3", label: false });
  D.txt(ctx, "three lots of three quarters is nine quarter-pieces", W / 2, 68,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const drawWrong102 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 22, y: 14, w: W - 44, h: 28, den: 5, num: 3, prog: 1, col: "#C74440", label: false });
  D.txt(ctx, "12/20 would need twentieth-pieces \u2014 nobody cut them", W / 2, 62,
    { size: 11, col: "#E0665F", font: "marker" });
};

const LESSON = {
  code: "10-2",
  storageKey: "daf-g4-t10-l2",
  title: "Multiply a Fraction by a Whole Number: Use Models",
  unit: "GRADE 4 · TOPIC 10 · LESSON 10-2 · 4.NF.B.4b",
  math: M,
  ixl: ["Q7B", "Y5C", "CZ7"],

  metas: [
    { phase: "warmup", title: "Which one <em>doesn't belong</em>?",
      lead: "Four ways of showing repeated fractions. Every card has a defensible reason.",
      goal: "Warm up the language of groups before any procedure appears.",
      pull: "Everyone can defend a different card.",
      rail: { launch: "Pick a card and convince your partner. There is no single right answer.",
        monitor: ["Arguing from the number of groups", "Arguing from the size of the piece", "Arguing from the total"],
        connect: "Did anyone change their mind after hearing someone else?",
        misconception: "Assuming there is one intended answer." } },

    { phase: "launch", title: "Four bottles, <em>three fifths</em> each",
      lead: "Four bottles of laban are packed for the trip. Each is three fifths full. Estimate the total.",
      goal: "Create the need to add a fraction to itself several times.",
      pull: "Estimate locked. Now build it.",
      rail: { launch: "Is the total more than two bottles or less? Commit before you calculate.",
        monitor: ["Estimating just over two", "Estimating under one", "Reasoning from 'more than half each'"],
        connect: "Who can justify an answer bigger than two whole bottles?",
        misconception: "Assuming four fractions must still be less than one whole." } },

    { phase: "monitor", title: "Stack the <em>groups</em>",
      lead: "Draw one group of three fifths, then all four, then pour them together.",
      goal: "The model produces twelve fifths before any symbol is written.",
      pull: "The same product as jumps on a line.",
      rail: { launch: "Count the shaded pieces aloud as each bar appears.",
        monitor: ["Counting in fifths", "Counting bars instead of pieces", "Predicting more than two wholes"],
        connect: "How many fifth-pieces did we count? What is that as wholes?",
        misconception: "Writing 12/20 by multiplying the denominator by four." } },

    { phase: "monitor", title: "Four jumps of <em>three fifths</em>",
      lead: "Same problem, moving forward instead of stacking up.",
      goal: "A number line makes the mixed-number answer visible.",
      pull: "Now judge some finished work.",
      rail: { launch: "Predict which whole number you will pass on the way.",
        monitor: ["Jumping in equal lengths", "Reading past one whole", "Losing the count at the whole"],
        connect: "Where exactly did we cross the number one?",
        misconception: "Restarting the count at every whole number." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort the finished work. No grading until the class commits.",
      goal: "Catch the denominator-multiplying error while it is cheap.",
      pull: "Two students solved it differently.",
      rail: { launch: "Ask of each one: did anybody cut new pieces?",
        monitor: ["Checking the denominator", "Checking the rename", "Sketching to test one"],
        connect: "Explain the wrong ones as if you were the student who wrote them.",
        misconception: "Multiplying numerator and denominator by the whole number." } },

    { phase: "connect", title: "Two ways to <em>get there</em>",
      lead: "Hala added three fifths four times. Ziad counted twelve fifth-pieces at once. Same answer.",
      goal: "Repeated addition and grouping are the same move.",
      pull: "Let us build it on the board.",
      rail: { launch: "Show both without hinting at a favourite.",
        monitor: ["Matching the four terms to the four groups", "Preferring the shorter route", "Explaining the rename"],
        connect: "Which one is easier if there were twenty bottles?",
        misconception: "Believing the two methods can give different answers." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Four groups. Twelve fifth-pieces. Two wholes and two fifths.",
      goal: "The moment the lesson is taught, not displayed.",
      pull: "Say it as a rule.",
      rail: { launch: "Draw the bars with them, one at a time.",
        monitor: ["Predicting the total pieces", "Naming the rename", "Restating it in their own words"],
        connect: "Why is renaming the last step and not the first?",
        misconception: "Renaming before all the pieces have been counted." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "The model already told you. Now write it down.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the chain from left to right, once, together.",
        monitor: ["Naming the unit fraction", "Testing it on a new product", "Explaining why the denominator holds"],
        connect: "What does the whole number actually do to the picture?",
        misconception: "Thinking multiplication must always make the answer bigger than both numbers." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Count the pieces before you rename.",
        monitor: ["Counting quarter-pieces", "Multiplying the denominator", "Sketching to check"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 9/12 by multiplying the denominator." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action that can be done tonight.",
      pull: "Tomorrow: the same products without drawing anything.",
      rail: { launch: "Three students name a product they modelled today.",
        monitor: ["Can explain without a bar", "Still needs the bar", "Ready for symbols"],
        connect: "Who is showing this to someone at home?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [groups, setGroups] = useState(0);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Pick a card. Every one of them has a defensible reason."
          cards={[
            { id: "c1", text: "4 × 3/5", why: "The only one written as a multiplication." },
            { id: "c2", text: "3/5 + 3/5 + 3/5 + 3/5", why: "The only one written as an addition." },
            { id: "c3", text: "12/5", why: "The only one already totalled up." },
            { id: "c4", text: "5 × 3/4", why: "The only one whose pieces are not fifths." }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawStory102} height={256} award={award}
          label="How many fifths of laban altogether?" min={4} max={20} start={10} unit="/ 5"
          after="Locked. Now let us stack the bottles up."
          note="Each bottle holds the same amount, and each is three fifths full." />;

      case 2:
        return <ExploreChips draw={makeGroups102(step)} height={256}
          label="Build the four groups" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "one group" }, { v: 1, label: "all four groups" }, { v: 2, label: "pour into wholes" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Nobody cut a new piece. Only fifths were counted." />;

      case 3:
        return <ExploreChips draw={makeHopLine102(groups)} height={256}
          label="Jump three fifths at a time" value={groups}
          onPick={(v) => setGroups(v)}
          chips={[{ v: 0, label: "at zero" }, { v: 1, label: "1 jump" }, { v: 2, label: "2 jumps" },
                  { v: 3, label: "3 jumps" }, { v: 4, label: "4 jumps" }]}
          caption={<MathEl omml={M.mixed} size="xl" display="block" />}
          footnote="Passing a whole number does not restart the count." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "d1", text: "4 × 3/5 = 12/5", target: "yes" },
                  { id: "d2", text: "4 × 3/5 = 12/20", target: "no" },
                  { id: "d3", text: "3 × 2/3 = 6/3", target: "yes" },
                  { id: "d4", text: "3 × 2/3 = 5/3", target: "no" }]}
          targets={[{ id: "yes", label: "correct — the piece size held" },
                    { id: "no", label: "not yet — look at the pieces", draw: drawWrong102, h: 74 }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Hala's way — add it four times", omml: M.repeated, h: 92,
            quote: "Three fifths, three fifths, three fifths, three fifths. Twelve fifths." }}
          right={{ name: "Ziad's way — count every piece", omml: M.unitChain, h: 92,
            quote: "Each group has 3 fifth-pieces. Four groups is 12 of them." }}
          same={["Both end at 12/5", "Both keep fifths as the piece", "Both can be renamed to 2 and 2/5"]}
          diff={["Hala writes four terms", "Ziad counts unit fractions", "Ziad's method survives twenty groups"]} />;

      case 6:
        return <BoardScreen draw={drawBoard102} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "copy the fraction, count all the pieces, then rename" }]}
          hand={"count the groups · count the pieces in each · total the pieces · rename"}
          cards={[{ title: "The product we modelled", omml: M.answer, note: "four groups of three fifths" },
                  { title: "Tap for one that lands on a whole", omml: M.mixed, revealOmml: M.other, reveal: true,
                    note: "sometimes the pieces fill the wholes exactly" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Three friends each drink three quarters of a bottle. How much is that?" omml={M.swyk}
          options={[{ v: "a", text: "9/12" }, { v: "b", text: "9/4" }, { v: "c", text: "6/4" }, { v: "d", text: "3/4" }]}
          right="b"
          support={{ yes: "Yes — nine quarter-pieces, which is 2 and 1/4.",
            notYet: "Not yet — nobody cut the quarters into smaller pieces.",
            draw: drawSupport102, h: 92, hint: "Count the quarter-pieces: three in each of three groups." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find three equal containers at home, guess how full each one is, and total it as a multiplication." />;

      default: return null;
    }
  }
};
