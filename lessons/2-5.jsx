/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-5 · Subtract Whole Numbers
   Standard 4.NBT.B.4   I can ... subtract multi-digit numbers using the
   standard algorithm, and explain the regrouping.
   =========================================================================== */

const M = {
  problem: om(mt("534-268")),
  answer: om(mt("534-268=266")),
  estimate: om(mt("530-270=260")),
  regroup: om(mt("4"), mnor(" ones cannot take "), mt("8"), mnor(" — trade a ten")),
  traded: om(mt("14-8=6")),
  check: om(mt("266+268=534")),
  swyk: om(mt("725-348")),
  swykAnswer: om(mt("725-348=377"))
};

const drawStock = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 290), p3 = D.at(f, 300, 430);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the canteen stockroom", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, {
    x: 60, y: 62, w: W - 120, h: 46, prog: p2, total: 534,
    parts: [{ v: 268, label: "268 sold", col: "#C74440" }, { v: 266, label: "?", col: "#2D70B3" }]
  });
  if (p3 > 0) {
    D.txt(ctx, "534 juice cartons at the start", W / 2, 142,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: p3 });
    D.txt(ctx, "how many are left?", W / 2, H - 20, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const makeColumnSub = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 90, y: 30, w: 180, a: 534, b: 268, op: "-", prog: step / 3, t: frame, cw: 42 });
  const notes = ["start with the ones", "4 cannot take 8 — trade a ten, now 14 − 8 = 6",
                 "2 tens cannot take 6 — trade a hundred, now 12 − 6 = 6", "4 − 2 = 2 hundreds"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 13.5, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeTrade = (traded) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = 8, base = H - 74;
  /* three tens rods and four ones, then one rod breaks into ten ones */
  const rods = traded ? 2 : 3;
  const ones = traded ? 14 : 4;
  for (let r = 0; r < rods; r++) {
    D.digitBlocks(ctx, { x: 80 + r * 26, y: base - s * 10, unit: 10, prog: 1, col: "#2D70B3", s: s });
  }
  for (let o = 0; o < ones; o++) {
    const col = o < (ones - (traded ? 10 : 0)) ? "#FA7E19" : "#C9A227";
    D.digitBlocks(ctx, {
      x: 210 + (o % 7) * 14, y: base - s - Math.floor(o / 7) * 14, unit: 1, prog: 1, col: col, s: s
    });
  }
  D.txt(ctx, rods + " tens", 106, base + 22, { size: 12.5, col: "#2D70B3", font: "marker" });
  D.txt(ctx, ones + " ones", 254, base + 22, { size: 12.5, col: "#FA7E19", font: "marker" });
  D.txt(ctx, traded ? "one ten became ten ones — now 14 ones can give away 8"
                    : "4 ones cannot give away 8",
    W / 2, 36, { size: 14.5, col: traded ? "#34D399" : "#C74440", font: "marker" });
  if (!traded) D.txt(ctx, "tap to trade a ten", W / 2, H - 16,
    { size: 12.5, col: "#C9A227", font: "marker" });
};

const drawBoard25 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "What does crossing out really mean?" });
  const p1 = D.at(f, 20, 210), p2 = D.at(f, 220, 380), p3 = D.at(f, 390, 550), p4 = D.at(f, 550, 700);
  D.columnOp(ctx, { x: W / 2 - 176, y: 86, w: 176, a: 534, b: 268, op: "-", prog: p1, t: frame, cw: 46 });
  if (p2 > 0) {
    D.txt(ctx, "4 ones cannot take 8", W / 2 + 86, 138, { size: 16, col: "#C74440", font: "marker", alpha: p2 });
    D.txt(ctx, "so trade one ten for ten ones", W / 2 + 86, 166,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 260, 350) });
  }
  if (p3 > 0) {
    D.txt(ctx, "3 tens becomes 2 tens", W / 2 + 86, 208, { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "4 ones becomes 14 ones", W / 2 + 86, 232, { size: 14, col: "#C9A227", font: "marker", alpha: D.at(f, 430, 510) });
    D.txt(ctx, "the number itself has not changed", W / 2 + 86, 262,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 470, 550) });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "regrouping renames the number — it never changes its value",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 590, 670) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 620, 720), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport25 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 70, y: -14, w: 140, a: 725, b: 348, op: "-", prog: 1, cw: 34 });
};

const LESSON = {
  code: "2-5",
  storageKey: "daf-g4-t2-l5",
  title: "Subtract Whole Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-5 · 4.NBT.B.4",
  math: M,
  ixl: ["FCP", "6SZ"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A bar with one part missing. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "The missing part has a name: the difference.",
      rail: { launch: "I am not asking you to work it out. Just describe what you see.",
        monitor: ["Noticing the whole is 534", "Noticing one part is unknown", "Estimating the gap"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the bar as two separate numbers rather than a part and a whole." } },

    { phase: "launch", title: "How many <em>are left</em>?",
      lead: "534 cartons at the start of the week. 268 were sold. Estimate first.",
      goal: "Create the need — and a check for the exact answer.",
      pull: "Now let us take it apart one column at a time.",
      rail: { launch: "Round both first. Roughly how many are left?",
        monitor: ["Rounding to 530 and 270", "Counting up from 268", "Going straight to the algorithm"],
        connect: "What should the exact answer be close to?",
        misconception: "Subtracting the smaller digit from the larger one in each column." } },

    { phase: "monitor", title: "One <em>column</em> at a time",
      lead: "Start with the ones. Step through and watch the trade.",
      goal: "The algorithm as a sequence of place-value trades.",
      pull: "What is actually being crossed out?",
      rail: { launch: "Predict each column before you step.",
        monitor: ["Starting from the ones", "Taking the smaller from the larger", "Tracking both trades"],
        connect: "Why can you not just do 8 take away 4?",
        misconception: "Flipping the digits to avoid regrouping — the classic 4 minus 8 becomes 8 minus 4." } },

    { phase: "monitor", title: "Trade one <em>ten</em>",
      lead: "Watch a ten rod break into ten ones.",
      goal: "Regrouping is a physical trade, not a written trick.",
      pull: "Which of these will need a trade?",
      rail: { launch: "Before you tap: how many ones will there be after the trade?",
        monitor: ["Counting the new ones", "Noticing the tens went down by one", "Checking the total is unchanged"],
        connect: "Is it still the same number of cartons?",
        misconception: "Thinking the trade adds ten to the number." } },

    { phase: "monitor", title: "Will it need a <em>trade</em>?",
      lead: "Sort each subtraction before you calculate. No grading until the class commits.",
      goal: "Predict regrouping from the digits.",
      pull: "Two students checked the same answer differently.",
      rail: { launch: "Look only at the ones column first.",
        monitor: ["Comparing the ones digits", "Checking every column", "Calculating fully first"],
        connect: "Which column did you check, and why that one?",
        misconception: "Assuming a bigger number on top means no trade." } },

    { phase: "connect", title: "Two ways to <em>check it</em>",
      lead: "Lina added her answer back. Sami counted up from 268. Both landed on 534.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Adding the answer back", "Counting up in jumps", "Re-doing the subtraction"],
        connect: "Why does adding the answer back prove it?",
        misconception: "Checking by repeating the same method and the same mistake." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One ten becomes ten ones. The number is renamed, not changed.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming the trade", "Restating it in their own words"],
        connect: "Who can say what the crossing out means in one sentence?",
        misconception: "Saying borrow without saying what is borrowed or from where." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the trade", "Testing on a bigger difference", "Checking by adding back"],
        connect: "What happens if the next place is a zero?",
        misconception: "Assuming there is always a ten available next door." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Estimate, calculate, then check by adding back.",
        monitor: ["Estimating first", "Trading correctly", "Checking by addition"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Doing 5 minus 8 as 8 minus 5 in the ones column." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the same method, with much bigger numbers.",
      rail: { launch: "Ask three students to say what a trade means.",
        monitor: ["Able to explain it to someone else", "Still needs the blocks", "Ready for greater numbers"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [traded, setTraded] = useState(false);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawStock} height={256} award={award}
          notices={["The whole is 534", "One part is missing", "268 were sold", "The missing part is smaller"]}
          wonders={["How many are left?", "Is it about half?", "Do I add or subtract?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStock} height={256} award={award}
          label="About how many cartons are left?" min={100} max={400} start={260} unit="cartons"
          after="Locked. Keep it — you will check your exact answer against it."
          note="Round both numbers, then subtract the friendly ones." />;

      case 2:
        return <ExploreChips draw={makeColumnSub(step)} height={262}
          label="Step through the columns"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "set it up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="A crossed-out digit is a number that has been renamed, not reduced." />;

      case 3:
        return <ExploreChips draw={makeTrade(traded)} height={252}
          label="Trade a ten for ten ones"
          value={traded ? 1 : 0}
          onPick={(v) => setTraded(v === 1)}
          chips={[{ v: 0, label: "before the trade" }, { v: 1, label: "after the trade" }]}
          caption={<MathEl omml={traded ? M.traded : M.regroup} size="lg" display="block" />}
          footnote="Three tens and four ones is the same amount as two tens and fourteen ones." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "s1", text: "534 − 268", target: "yes" },
            { id: "s2", text: "579 − 236", target: "no" },
            { id: "s3", text: "412 − 187", target: "yes" },
            { id: "s4", text: "846 − 325", target: "no" }
          ]}
          targets={[
            { id: "yes", label: "needs a trade" },
            { id: "no", label: "no trade needed" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Lina's way — add it back", omml: M.check, h: 92,
                  quote: "If my answer is right, it adds back to 534." }}
          right={{ name: "Sami's way — count up", omml: M.estimate, h: 92,
                   quote: "From 268 up to 534 in jumps: 32, then 234." }}
          same={["Both check the same answer", "Both connect adding and subtracting", "Both land on 534"]}
          diff={["Lina adds, Sami counts up", "Sami never subtracts at all", "Lina's check is faster to write"]} />;

      case 6:
        return <BoardScreen draw={drawBoard25} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.regroup, alt: "four ones cannot take eight, trade a ten" }]}
          hand={"start on the right · if the top digit is too small, trade one from the next place · ten arrive, one leaves"}
          cards={[
            { title: "The difference we found", omml: M.answer, note: "our estimate was 260 — close" },
            { title: "Tap to check it by adding", omml: M.traded, revealOmml: M.check, reveal: true,
              note: "adding the answer back proves it" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Subtract 725 − 348."
          omml={M.swyk}
          options={[{ v: "a", text: "377" }, { v: "b", text: "423" }, { v: "c", text: "387" }, { v: "d", text: "1,073" }]}
          right="a"
          support={{
            yes: "Yes — and 377 + 348 = 725, so it checks out.",
            notYet: "Not yet — look at the ones column. Can 5 give away 8?",
            draw: drawSupport25, h: 96,
            hint: "Trade a ten: 15 − 8 = 7. Then the tens are 1, not 2."
          }} />;

      case 9:
        return <Closing game={game} omml={M.answer}
          action="Subtract two three-digit numbers at home, then check by adding your answer back." />;

      default: return null;
    }
  }
};
