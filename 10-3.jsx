/* ===========================================================================
   Grade 4 · Topic 10 · LESSON 10-3 · Multiply a Fraction by a Whole Number:
   Use Symbols
   Standard 4.NF.B.4b   I can ... multiply a whole number by a fraction without
   drawing anything, and say why the denominator does not change.
   =========================================================================== */

const M = {
  problem: om(mt("6\u00d7"), mfrac(2, 3)),
  step1: om(mt("6\u00d7"), mfrac(2, 3), mt("="), mfrac("6\u00d72", 3)),
  answer: om(mt("6\u00d7"), mfrac(2, 3), mt("="), mfrac(12, 3), mt("=4")),
  general: om(mt("n\u00d7"), mfrac("a", "b"), mt("="), mfrac("n\u00d7a", "b")),
  whyDen: om(mnor("the whole number counts the pieces \u2014 it never re-cuts them")),
  other: om(mt("5\u00d7"), mfrac(3, 8), mt("="), mfrac(15, 8), mt("=1"), mfrac(7, 8)),
  rule: om(mnor("multiply the numerator \u00b7 keep the denominator \u00b7 rename")),
  swyk: om(mt("7\u00d7"), mfrac(2, 5)),
  swykAnswer: om(mfrac(14, 5), mt("=2"), mfrac(4, 5))
};

/* the written chain, built one line at a time, with a bar to keep it honest */
const makeChain103 = (line) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2;

  const rows = [
    { s: "6 \u00d7 2/3", col: "#EAF4F2", note: "six groups of two thirds" },
    { s: "= (6 \u00d7 2) / 3", col: "#2D70B3", note: "the 6 multiplies the count, not the piece" },
    { s: "= 12/3", col: "#FA7E19", note: "twelve third-pieces" },
    { s: "= 4", col: "#34D399", note: "twelve thirds fill exactly four wholes" }
  ];
  for (let r = 0; r <= line && r < rows.length; r++) {
    const fresh = r === line;
    const a = fresh ? 0.72 + Math.sin(frame / 14) * 0.24 : 1;
    D.txt(ctx, rows[r].s, cx, 40 + r * 40,
      { size: r === 0 ? 21 : 20, col: rows[r].col, font: "marker", alpha: a });
    if (fresh) {
      D.txt(ctx, rows[r].note, cx, 62 + r * 40,
        { size: 11.5, col: "rgba(234,244,242,.6)", font: "marker" });
    }
  }

  /* the honesty check: the bar always shows twelve thirds */
  D.mixedBar(ctx, { x: 52, y: H - 74, w: W - 104, wholes: 4, den: 3,
    num: line === 0 ? 2 : line === 1 ? 2 : 12, h: 30, prog: 1,
    col: line >= 3 ? "#388C46" : "#2D70B3", label: false });
  D.txt(ctx, line >= 2 ? "12 third-pieces" : "one group of 2/3", W / 2, H - 18,
    { size: 12, col: "#C9A227", font: "marker" });
};

/* the denominator trap, shown side by side */
const makeTrap103 = (side) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const half = W / 2;
  const pulse = 0.55 + Math.sin(frame / 15) * 0.3;

  D.txt(ctx, "6 \u00d7 2/3 = 12/3", half / 2, 30,
    { size: 17, col: side === "right" ? "#34D399" : "rgba(234,244,242,.4)", font: "marker" });
  D.txt(ctx, "6 \u00d7 2/3 = 12/18", half + half / 2, 30,
    { size: 17, col: side === "wrong" ? "#E0665F" : "rgba(234,244,242,.4)", font: "marker" });

  ctx.save();
  ctx.globalAlpha = side === "right" ? 1 : 0.28;
  D.mixedBar(ctx, { x: 26, y: 66, w: half - 52, wholes: 4, den: 3, num: 12, h: 44, prog: 1,
    col: "#388C46", label: false });
  ctx.restore();
  ctx.save();
  ctx.globalAlpha = side === "wrong" ? 1 : 0.28;
  D.fracBar(ctx, { x: half + 26, y: 66, w: half - 52, h: 44, den: 18, num: 12, prog: 1,
    col: "#C74440", label: false });
  ctx.restore();

  D.txt(ctx, "thirds \u2014 the pieces we actually have", half / 2, 132,
    { size: 11.5, col: "#34D399", font: "marker", alpha: side === "right" ? pulse + 0.4 : 0.35 });
  D.txt(ctx, "eighteenths \u2014 who cut these?", half + half / 2, 132,
    { size: 11.5, col: "#E0665F", font: "marker", alpha: side === "wrong" ? pulse + 0.4 : 0.35 });

  D.marker(ctx, [[half, 18], [half, H - 76]], 1, "rgba(234,244,242,.18)", 1.4);
  D.txt(ctx, side === "wrong"
      ? "12/18 is smaller than one whole \u2014 six groups cannot shrink"
      : "12/3 is four whole bottles \u2014 that matches six groups",
    W / 2, H - 50, { size: 14, col: side === "wrong" ? "#E0665F" : "#C9A227", font: "marker" });
  D.txt(ctx, "the picture and the writing have to agree", W / 2, H - 22,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker" });
};

const drawWarm103 = (ctx, W, H, frame) => {
  const CYCLE = 520, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "yesterday's picture, today's writing", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.mixedBar(ctx, { x: 54, y: 56, w: W - 108, wholes: 4, den: 3, num: 12, h: 40,
    prog: D.at(f, 60, 300), col: "#2D70B3", label: false });
  D.txt(ctx, "6 \u00d7 2/3", W / 2, 138, { size: 22, col: "#EAF4F2", font: "marker", alpha: D.at(f, 300, 420) });
  D.txt(ctx, "can you finish it without looking at the bar?", W / 2, H - 18,
    { size: 13, col: "#C9A227", font: "marker", alpha: D.at(f, 380, 480) });
};

const drawBoard103 = (ctx, W, H, frame) => {
  const CYCLE = 880, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Why the denominator holds still" });
  const p1 = D.at(f, 20, 190), p2 = D.at(f, 200, 400), p3 = D.at(f, 420, 600), p4 = D.at(f, 620, 840);
  const x = 100, w = W - 200;

  D.mixedBar(ctx, { x: x, y: 96, w: w, wholes: 4, den: 3, num: 12, h: 42, prog: p1,
    col: "#2D70B3", label: false });
  D.txt(ctx, "six groups of two thirds, laid end to end", W / 2, 158,
    { size: 13.5, col: "rgba(234,244,242,.7)", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.txt(ctx, "6 \u00d7 2/3 = (6 \u00d7 2) / 3", W / 2, 204,
      { size: 22, col: "#FA7E19", font: "marker", alpha: p2 });
    D.txt(ctx, "the 6 acts on the count", W / 2, 230,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "= 12/3 = 4", W / 2, 282, { size: 26, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "twelve third-pieces fill four wholes exactly", W / 2, 310,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    const yb = H - 34;
    D.marker(ctx, [[70, yb - 24], [W - 70, yb - 24]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "multiplying the bottom would mean cutting pieces nobody cut",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 680, 800) });
    D.star8(ctx, W - 44, yb - 2, 15, D.at(f, 740, 860), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport103 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.mixedBar(ctx, { x: 22, y: 14, w: W - 44, wholes: 3, den: 5, num: 14, h: 30, prog: 1,
    col: "#2D70B3", label: false });
  D.txt(ctx, "7 groups × 2 fifth-pieces = 14 fifth-pieces", W / 2, 68,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "10-3",
  storageKey: "daf-g4-t10-l3",
  title: "Multiply a Fraction by a Whole Number: Use Symbols",
  unit: "GRADE 4 · TOPIC 10 · LESSON 10-3 · 4.NF.B.4b",
  math: M,
  ixl: ["JLH", "X48"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Yesterday's bar and today's expression, side by side. No question yet.",
      goal: "Bridge from the model the class already trusts to the symbols.",
      pull: "The bar and the writing must agree.",
      rail: { launch: "You have seen this bar before. What is different today?",
        monitor: ["Recognising yesterday's bar", "Reading the expression", "Predicting the answer"],
        connect: "Someone predicted four. What in the picture says four?",
        misconception: "Believing symbols are a new topic rather than the same idea." } },

    { phase: "launch", title: "Six groups, <em>no drawing allowed</em>",
      lead: "Six of two thirds. Estimate the answer before anybody writes anything.",
      goal: "Force reasoning about size before procedure.",
      pull: "Now build the written chain.",
      rail: { launch: "Two thirds is a bit less than one. Six of them is about what?",
        monitor: ["Reasoning 'a bit less than six'", "Reasoning from four wholes", "Guessing under one"],
        connect: "Why can the answer not be smaller than two thirds?",
        misconception: "Assuming a fraction answer must be less than one." } },

    { phase: "monitor", title: "Build the <em>chain</em>",
      lead: "One line at a time. The bar underneath must always match what you wrote.",
      goal: "Every written step is checked against the model.",
      pull: "Now look at the classic mistake.",
      rail: { launch: "Predict the next line before you press.",
        monitor: ["Multiplying only the numerator", "Reaching 12/3", "Simplifying to 4"],
        connect: "Which line is the one people get wrong?",
        misconception: "Stopping at 12/3 and not recognising it as a whole number." } },

    { phase: "monitor", title: "Two answers, <em>one picture</em>",
      lead: "Someone wrote twelve eighteenths. Compare it with twelve thirds.",
      goal: "Make the denominator error visibly absurd.",
      pull: "Now sort some finished work.",
      rail: { launch: "Which bar could possibly be six groups of two thirds?",
        monitor: ["Comparing the shaded amounts", "Noticing 12/18 is under one", "Explaining who cut the eighteenths"],
        connect: "Six groups made the amount smaller. Is that possible?",
        misconception: "Multiplying numerator and denominator together." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each line of work. Nothing is graded until the class commits.",
      goal: "Practise the symbolic move under scrutiny.",
      pull: "Two students wrote the same problem differently.",
      rail: { launch: "Check the denominator first, then the count.",
        monitor: ["Checking the denominator", "Checking the rename", "Estimating to test"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Adding the whole number to the numerator instead of multiplying." } },

    { phase: "connect", title: "Two ways to <em>write it</em>",
      lead: "Ibrahim wrote the whole number as a fraction over one. Sana multiplied the top straight away.",
      goal: "Connect the shortcut to the general rule for multiplying fractions.",
      pull: "On the board.",
      rail: { launch: "Show both. Ask which one explains itself.",
        monitor: ["Writing 6 as 6/1", "Multiplying tops and bottoms", "Noticing 3 × 1 is 3"],
        connect: "Why does 6/1 × 2/3 give the same denominator?",
        misconception: "Thinking the two written methods are different rules." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "The whole number counts pieces. It does not cut them.",
      goal: "The moment the idea is taught, not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build the bar first, then write over it.",
        monitor: ["Predicting the numerator", "Naming the unchanged denominator", "Restating it in their words"],
        connect: "Who can say why the bottom number holds still?",
        misconception: "Reciting the rule without the reason." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One line worth memorising, with the reason attached.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Applying it to a new product", "Renaming the improper answer", "Explaining the denominator"],
        connect: "When will the answer be a whole number?",
        misconception: "Forgetting the final rename." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on the symbolic method.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Multiply the top only.",
        monitor: ["Multiplying the numerator", "Multiplying the denominator too", "Renaming the answer"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 14/35 by multiplying the denominator." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: solving problems about time.",
      rail: { launch: "Three students state the rule in their own words.",
        monitor: ["Fluent without a picture", "Still checks with a bar", "Ready for word problems"],
        connect: "Who is explaining this at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [line, setLine] = useState(0);
    const [side, setSide] = useState("right");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm103} height={256} award={award}
          notices={["The bar is cut into thirds", "There are four whole bars", "The expression says six times two thirds", "The bar is completely full"]}
          wonders={["Is the answer exactly four?", "Do I still need the bar?", "What happens to the three?"]} />;

      case 1:
        return <LaunchEstimate draw={drawWarm103} height={256} award={award}
          label="Six groups of two thirds is about..." min={1} max={8} start={3} unit="wholes"
          after="Locked. Now write it line by line."
          note="Two thirds is a little less than one whole, and there are six of them." />;

      case 2:
        return <ExploreChips draw={makeChain103(line)} height={256}
          label="Write the next line" value={line}
          onPick={(v) => setLine(v)}
          chips={[{ v: 0, label: "the problem" }, { v: 1, label: "multiply the top" },
                  { v: 2, label: "count the pieces" }, { v: 3, label: "rename" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="The bar underneath never disagrees with the writing." />;

      case 3:
        return <ExploreChips draw={makeTrap103(side)} height={256}
          label="Which one can be true?" value={side}
          onPick={(v) => setSide(v)}
          chips={[{ v: "right", label: "12/3" }, { v: "wrong", label: "12/18" }]}
          caption={<MathEl omml={M.whyDen} size="lg" display="block" />}
          footnote="Six groups of anything cannot end up smaller than one group." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "e1", text: "6 × 2/3 = 12/3", target: "yes" },
                  { id: "e2", text: "6 × 2/3 = 12/18", target: "no" },
                  { id: "e3", text: "5 × 3/8 = 15/8", target: "yes" },
                  { id: "e4", text: "5 × 3/8 = 8/8", target: "no" }]}
          targets={[{ id: "yes", label: "correct — top multiplied, bottom kept" },
                    { id: "no", label: "not yet — the bottom moved" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Ibrahim's way — write six as a fraction", omml: M.step1, h: 92,
            quote: "Six is six over one. Then I multiply tops and bottoms." }}
          right={{ name: "Sana's way — straight to the top", omml: M.answer, h: 92,
            quote: "Six times two is twelve. The thirds do not change." }}
          same={["Both give 12/3", "Both leave the denominator as 3", "Both finish at four wholes"]}
          diff={["Ibrahim uses the general fraction rule", "Sana uses the shortcut", "Ibrahim's shows why the 3 survives"]} />;

      case 6:
        return <BoardScreen draw={drawBoard103} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.general, alt: "n times a over b equals n times a, over b" }]}
          hand={"multiply the top by the whole number · keep the bottom · rename at the end"}
          cards={[{ title: "The product we wrote", omml: M.answer, note: "it landed on a whole number" },
                  { title: "Tap for one that does not", omml: M.rule, revealOmml: M.other, reveal: true,
                    note: "fifteen eighths is one whole and seven eighths" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Seven students each walk two fifths of a kilometre along the Corniche. How far in total?"
          omml={M.swyk}
          options={[{ v: "a", text: "14/35" }, { v: "b", text: "9/5" }, { v: "c", text: "14/5" }, { v: "d", text: "2/35" }]}
          right="c"
          support={{ yes: "Yes — 14 fifth-pieces, which is 2 and 4/5 kilometres.",
            notYet: "Not yet — the fifths stay fifths.",
            draw: drawSupport103, h: 92, hint: "Multiply only the numerator: 7 × 2 = 14." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Write three multiplications of a whole number by a fraction, and rename each answer without drawing." />;

      default: return null;
    }
  }
};
