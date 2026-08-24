/* ===========================================================================
   Grade 4 · Topic 14 · LESSON 14-2 · Patterns: Number Rules
   Standard 4.OA.C.5   I can ... work out the rule that turns one column of a
   table into the other, and use it on a value that is not in the table.
   =========================================================================== */

const M = {
  table: om(mnor("bags 1 2 3 4 \u00b7 dates 8 16 24 32")),
  ruleMul: om(mnor("dates = bags \u00d7 8")),
  ruleAdd: om(mnor("each new bag adds 8 more dates")),
  bothSame: om(mnor("adding 8 four times is the same as multiplying by 4")),
  far: om(mt("12\u00d78=96"), mnor(" dates in 12 bags")),
  wrongRule: om(mnor("\u201cadd 8\u201d alone cannot reach the twelfth bag quickly")),
  law: om(mnor("test the rule on every row before you trust it")),
  swyk: om(mnor("in = 1 2 3 4 \u00b7 out = 5 10 15 20. what is the rule?")),
  swykAnswer: om(mnor("out = in \u00d7 5"))
};

/* the table filling, with the rule tested on each row */
const makeTable142 = (rows) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const all = [["1", "8"], ["2", "16"], ["3", "24"], ["4", "32"]];
  D.table(ctx, { x: 96, y: 40, w: W - 192, rh: 28, head: ["bags", "dates"],
    rows: all.slice(0, rows), prog: 1 });

  if (rows >= 2) {
    /* the tested rule, ticked off row by row */
    for (let r = 1; r < rows; r++) {
      const a = Math.min(1, Math.max(0, (frame / 5 - r * 8) / 12));
      D.txt(ctx, "\u00d7 8", W - 84, 40 + 28 * (r + 0.5),
        { size: 12, col: "#388C46", font: "mono", weight: 700, alpha: a });
    }
  }
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, rows >= 4 ? "the rule survived all four rows"
       : "one row is never enough to know the rule",
    W / 2, H - 34, { size: 14, col: rows >= 4 ? "#34D399" : "#C9A227", font: "marker",
      alpha: pulse + 0.4 });
  D.txt(ctx, rows >= 4 ? "dates = bags \u00d7 8" : "keep testing",
    W / 2, H - 12, { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

/* the two rules compared: add-each-time versus multiply */
const makeRules142 = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const target = which === "far" ? 12 : 4;
  const cols = Math.min(target, 6);
  const bw = (W - 90) / cols;

  D.txt(ctx, which === "add" ? "add 8 for each new bag"
       : which === "mul" ? "bags \u00d7 8 gives the dates straight away"
       : "how many dates in twelve bags?",
    W / 2, 30, { size: 14, col: "#C9A227", font: "marker" });

  if (which === "far") {
    D.txt(ctx, "adding eight, twelve times over ...", W / 2, 78,
      { size: 15, col: "#C74440", font: "marker" });
    D.txt(ctx, "8 16 24 32 40 48 56 64 72 80 88 96", W / 2, 108,
      { size: 15, col: "rgba(234,244,242,.55)", font: "mono", weight: 600 });
    const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
    D.txt(ctx, "or just 12 \u00d7 8 = 96", W / 2, 158,
      { size: 26, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
    D.txt(ctx, "the multiplying rule reaches any row in one step",
      W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
    return;
  }

  for (let k = 0; k < cols; k++) {
    const bx = 45 + k * bw;
    const val = (k + 1) * 8;
    const a = Math.min(1, Math.max(0, (frame / 5 - k * 6) / 12)) * 0.35 + 0.65;
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, bx + 6, 60, bw - 12, 52, 8);
    ctx.strokeStyle = which === "add" ? "#FA7E19" : "#2D70B3";
    ctx.lineWidth = 1.8; ctx.stroke();
    ctx.restore();
    D.txt(ctx, String(val), bx + bw / 2, 88,
      { size: 21, col: which === "add" ? "#FA7E19" : "#2D70B3", font: "marker", alpha: a });
    D.txt(ctx, (k + 1) + " bag" + (k ? "s" : ""), bx + bw / 2, 128,
      { size: 11, col: "rgba(234,244,242,.6)", font: "mono", weight: 600, alpha: a });
    if (which === "add" && k > 0) {
      D.txt(ctx, "+8", bx, 152, { size: 11.5, col: "#FA7E19", font: "mono", weight: 700, alpha: a });
    }
    if (which === "mul") {
      D.txt(ctx, (k + 1) + " \u00d7 8", bx + bw / 2, 152,
        { size: 11.5, col: "#2D70B3", font: "mono", weight: 700, alpha: a });
    }
  }
  D.txt(ctx, which === "add" ? "you must know the row before to use this one"
       : "you can jump straight to any row you like",
    W / 2, H - 14, { size: 13, col: which === "mul" ? "#34D399" : "rgba(234,244,242,.7)",
      font: "marker" });
};

const drawWarm142 = (ctx, W, H, frame) => {
  const CYCLE = 580, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.table(ctx, { x: 96, y: 46, w: W - 192, rh: 28, head: ["bags", "dates"],
    rows: [["1", "8"], ["2", "16"], ["3", "24"], ["4", "?"]],
    prog: D.at(f, 20, 400) });
  D.txt(ctx, "a table with one cell missing", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 420, 510) });
};

const drawStory142 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "bags of dates for the iftar table", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let bag = 0; bag < 4; bag++) {
    const a = D.at(f, 60 + bag * 70, 180 + bag * 70);
    if (a <= 0) continue;
    const bx = 60 + bag * ((W - 120) / 4);
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, bx + 6, 56, (W - 120) / 4 - 14, 74, 9);
    ctx.strokeStyle = "#FA7E19"; ctx.lineWidth = 1.8; ctx.stroke();
    ctx.restore();
    for (let d = 0; d < 8; d++) {
      ctx.save();
      ctx.globalAlpha = a * 0.8;
      ctx.beginPath();
      ctx.arc(bx + 22 + (d % 4) * 17, 78 + Math.floor(d / 4) * 22, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#C9A227"; ctx.fill();
      ctx.restore();
    }
    D.txt(ctx, "8", bx + (W - 120) / 8, 148,
      { size: 12, col: "rgba(234,244,242,.65)", font: "mono", weight: 700, alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "every bag holds eight dates. how many in twelve bags?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard142 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Find the rule, then test every row" });
  const p2 = D.at(f, 340, 560), p3 = D.at(f, 580, 760), p4 = D.at(f, 780, 920);

  D.table(ctx, { x: 220, y: 96, w: W - 440, rh: 28, head: ["bags", "dates"],
    rows: [["1", "8"], ["2", "16"], ["3", "24"], ["4", "32"]],
    prog: D.at(f, 20, 320) });

  if (p2 > 0) {
    for (let r = 0; r < 4; r++) {
      const a = D.at(f, 340 + r * 50, 420 + r * 50);
      if (a <= 0) continue;
      D.txt(ctx, "\u00d7 8", W / 2 + 150, 96 + 28 * (r + 1.5),
        { size: 14, col: "#388C46", font: "mono", weight: 700, alpha: a });
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "dates = bags \u00d7 8", W / 2, 268,
      { size: 24, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "and it works on every row, not just the first",
      W / 2, 300, { size: 14, col: "rgba(234,244,242,.7)", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "so twelve bags: 12 \u00d7 8 = 96 dates", W / 2, 348,
      { size: 20, col: "#34D399", font: "marker", alpha: p4 });
    D.txt(ctx, "a rule that only works on one row is not a rule",
      W / 2, H - 24, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 840, 930) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 860, 935), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport142 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.table(ctx, { x: 30, y: 6, w: W - 60, rh: 22, head: ["in", "out"],
    rows: [["1", "5"], ["2", "10"], ["3", "15"]], prog: 1 });
};

const LESSON = {
  code: "14-2",
  storageKey: "daf-g4-t14-l2",
  title: "Patterns: Number Rules",
  unit: "GRADE 4 · TOPIC 14 · LESSON 14-2 · 4.OA.C.5",
  math: M,
  ixl: ["UZ6", "HDS"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A two-column table builds itself, with one cell left blank. No question yet.",
      goal: "Let the class see the relationship before naming a rule.",
      pull: "There is more than one way to describe what is happening.",
      rail: { launch: "Describe the table. Do not fill the blank yet.",
        monitor: ["Reading down a column", "Reading across a row", "Naming the gap"],
        connect: "Did you look down the column or across the row?",
        misconception: "Only ever reading down the column." } },

    { phase: "launch", title: "Bags of <em>dates</em>",
      lead: "Every bag holds eight dates. Estimate how many dates are in twelve bags.",
      goal: "Create the need for a rule that reaches a far-off row.",
      pull: "Now let us test a rule.",
      rail: { launch: "Commit to a number before you calculate.",
        monitor: ["Multiplying by eight", "Adding eight repeatedly", "Estimating around a hundred"],
        connect: "Would you want to add eight twelve times?",
        misconception: "Answering 20 by adding 12 and 8." } },

    { phase: "monitor", title: "Test the rule on <em>every row</em>",
      lead: "A rule that works on the first row proves nothing. Check them all.",
      goal: "Rule-finding requires verification.",
      pull: "There are two rules here, not one.",
      rail: { launch: "Guess a rule from the first row, then watch it get tested.",
        monitor: ["Proposing times eight", "Proposing plus seven", "Testing the second row"],
        connect: "What rule fits row one but fails row two?",
        misconception: "Accepting a rule after checking a single row." } },

    { phase: "monitor", title: "Add each time, or <em>multiply</em>?",
      lead: "Both descriptions are true. Only one gets you to the twelfth bag quickly.",
      goal: "Distinguish a recursive rule from a direct one.",
      pull: "Now judge some rules.",
      rail: { launch: "Which rule would you use for the hundredth bag?",
        monitor: ["Preferring the multiplication", "Adding repeatedly", "Explaining the difference"],
        connect: "What does the adding rule need that the multiplying rule does not?",
        misconception: "Believing the two rules describe different patterns." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each proposed rule. No grading until the class commits.",
      goal: "Practise rejecting rules that fit only one row.",
      pull: "Two students described the same table differently.",
      rail: { launch: "Test every rule on the second row before deciding.",
        monitor: ["Testing on row two", "Accepting from row one", "Checking all four rows"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Accepting 'add 7' because 1 + 7 = 8." } },

    { phase: "connect", title: "Two true <em>descriptions</em>",
      lead: "Reem said each bag adds eight. Faisal said dates equals bags times eight.",
      goal: "Both are correct; one is more powerful.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one answers 'bag one hundred'.",
        monitor: ["Describing the step", "Describing the relationship", "Linking the two"],
        connect: "Why do the two descriptions agree?",
        misconception: "Thinking only the multiplication counts as a rule." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One rule, tested on all four rows, then used on a row that was never there.",
      goal: "The moment rule-finding is taught as a discipline.",
      pull: "Say it in one sentence.",
      rail: { launch: "Test the rule on every row out loud.",
        monitor: ["Predicting each product", "Confirming the rule", "Extending to twelve"],
        connect: "Who can say why one row is never enough?",
        misconception: "Guessing a rule and never checking it." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence about rules, worth more than any single rule.",
      goal: "Generalise the method, not the answer.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Testing all rows", "Writing the rule properly", "Using it on a new value"],
        connect: "What is the first thing you do after guessing a rule?",
        misconception: "Writing the rule as a bare number with no operation." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on finding a rule.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Test your rule on the last row too.",
        monitor: ["Finding times five", "Finding plus four", "Testing on row two"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 'add 4' because 1 + 4 = 5." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: patterns made of shapes instead of numbers.",
      rail: { launch: "Three students state a rule and how they tested it.",
        monitor: ["Always tests the rule", "Still guesses from row one", "Ready for shapes"],
        connect: "Who is making a table at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [rows, setRows] = useState(1);
    const [which, setWhich] = useState("add");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm142} height={256} award={award}
          notices={["The left column counts up by one", "The right column jumps by eight", "One cell is missing", "Every right number is a multiple of eight"]}
          wonders={["What goes in the blank?", "Is there a rule?", "What about twelve bags?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory142} height={256} award={award}
          label="How many dates in twelve bags?" min={12} max={150} start={50} unit="dates"
          after="Locked. Now let us find a rule we can trust."
          note="Four bags hold thirty two, so twelve bags hold three times that." />;

      case 2:
        return <ExploreChips draw={makeTable142(rows)} height={256}
          label="Test the rule row by row" value={rows}
          onPick={(v) => setRows(v)}
          chips={[{ v: 1, label: "1 row" }, { v: 2, label: "2 rows" },
                  { v: 3, label: "3 rows" }, { v: 4, label: "all 4 rows" }]}
          caption={<MathEl omml={M.ruleMul} size="xl" display="block" />}
          footnote="A rule that fits one row is a guess. A rule that fits every row is a rule." />;

      case 3:
        return <ExploreChips draw={makeRules142(which)} height={256}
          label="Two ways to describe it" value={which}
          onPick={(v) => setWhich(v)}
          chips={[{ v: "add", label: "add 8 each time" }, { v: "mul", label: "bags × 8" },
                  { v: "far", label: "twelve bags" }]}
          caption={<MathEl omml={M.far} size="lg" display="block" />}
          footnote="The adding rule needs the row before it. The multiplying rule does not." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "dates = bags × 8", target: "yes" },
                  { id: "b2", text: "dates = bags + 7", target: "no" },
                  { id: "b3", text: "each bag adds 8", target: "yes" },
                  { id: "b4", text: "each bag adds 1", target: "no" }]}
          targets={[{ id: "yes", label: "works on every row" },
                    { id: "no", label: "not yet — fails row two" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Reem's way — the step", omml: M.ruleAdd, h: 92,
            quote: "Every new bag puts another eight dates on the table." }}
          right={{ name: "Faisal's way — the relationship", omml: M.ruleMul, h: 92,
            quote: "Whatever the bag number is, times it by eight." }}
          same={["Both fit every row", "Both give 32 for four bags", "Both are correct"]}
          diff={["Reem needs the row before", "Faisal can jump anywhere", "Faisal's answers bag one hundred"]} />;

      case 6:
        return <BoardScreen draw={drawBoard142} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.law, alt: "test the rule on every row before you trust it" }]}
          hand={"guess from one row · test on all the others · then use it somewhere new"}
          cards={[{ title: "The rule we tested", omml: M.ruleMul, note: "it held on all four rows" },
                  { title: "Tap for its limit", omml: M.ruleAdd, revealOmml: M.wrongRule, reveal: true,
                    note: "adding is true, but slow" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A table shows in = 1, 2, 3, 4 and out = 5, 10, 15, 20. What is the rule?"
          omml={M.swyk}
          options={[{ v: "a", text: "out = in + 4" }, { v: "b", text: "out = in × 5" },
                    { v: "c", text: "out = in + 5" }, { v: "d", text: "out = in × 4" }]}
          right="b"
          support={{ yes: "Yes — and it works on all four rows, not just the first.",
            notYet: "Not yet — test your rule on the second row.",
            draw: drawSupport142, h: 96, hint: "'in + 4' gives 5 for row one, but 6 for row two, and the table says 10." }} />;

      case 9:
        return <Closing game={game} omml={M.law}
          action="Make a two-column table at home, give it to someone, and see if they can find your rule." />;

      default: return null;
    }
  }
};
