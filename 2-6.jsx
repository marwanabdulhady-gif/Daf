/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-6 · Subtract Greater Numbers
   Standard 4.NBT.B.4   I can ... subtract numbers up to six digits,
   keeping every place lined up.
   =========================================================================== */

const M = {
  problem: om(mt("482,517-96,348")),
  answer: om(mt("482,517-96,348=386,169")),
  estimate: om(mt("483,000-96,000=387,000")),
  regroup: om(mnor("line up the places, not the edges")),
  traded: om(mt("17-8=9")),
  check: om(mt("386,169+96,348=482,517")),
  swyk: om(mt("310,254-87,169")),
  swykAnswer: om(mt("310,254-87,169=223,085"))
};

const drawStock = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 290), p3 = D.at(f, 300, 430);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two towns in Makkah Region", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, {
    x: 60, y: 62, w: W - 120, h: 46, prog: p2, total: 482517,
    parts: [{ v: 96348, label: "96,348", col: "#C74440" }, { v: 386169, label: "?", col: "#2D70B3" }]
  });
  if (p3 > 0) {
    D.txt(ctx, "482,517 people in the larger town", W / 2, 142,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: p3 });
    D.txt(ctx, "how many more than the smaller town?", W / 2, H - 20, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const makeColumnSub = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 132, y: 30, w: 264, a: 482517, b: 96348, op: "-", prog: step / 6, t: frame, cw: 26 });
  const notes = ["line the places up", "ones: 7 − 8 needs a trade, 17 − 8 = 9",
                 "tens: 0 − 4 needs a trade, 10 − 4 = 6", "hundreds: 4 − 3 = 1",
                 "thousands: 1 − 6 needs a trade, 11 − 6 = 5",
                 "ten thousands: 7 − 9 needs a trade, 17 − 9 = 8", "hundred thousands: 3 − 0 = 3"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 13.5, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeAlign = (mode) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = "482517", b = mode === 1 ? " 96348" : "96348 ";
  const cw = 46, x0 = W / 2 - 3 * cw;
  const names = ["hund. th.", "ten th.", "thousands", "hundreds", "tens", "ones"];
  for (let i = 0; i < 6; i++) {
    D.txt(ctx, names[i], x0 + i * cw + cw / 2, 40,
      { size: 9, col: "rgba(234,244,242,.45)", font: "mono", weight: 600 });
    ctx.save();
    D.rr(ctx, x0 + i * cw + 4, 54, cw - 8, 84, 7);
    ctx.strokeStyle = "rgba(234,244,242,.18)"; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
    D.txt(ctx, a[i], x0 + i * cw + cw / 2, 78, { size: 24, col: "#EAF4F2", font: "marker" });
    if (b[i] !== " ") {
      D.txt(ctx, b[i], x0 + i * cw + cw / 2, 118,
        { size: 24, col: mode === 1 ? "#34D399" : "#C74440", font: "marker" });
    }
  }
  D.txt(ctx, mode === 1 ? "lined up on the right — the ones sit under the ones"
                        : "lined up on the left — the 9 is pretending to be ten thousands",
    W / 2, H - 40, { size: 14, col: mode === 1 ? "#34D399" : "#C74440", font: "marker" });
  D.txt(ctx, mode === 1 ? "482,517 − 96,348 = 386,169" : "this gives a nonsense answer",
    W / 2, H - 16, { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const drawBoard25 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "What does crossing out really mean?" });
  const p1 = D.at(f, 20, 210), p2 = D.at(f, 220, 380), p3 = D.at(f, 390, 550), p4 = D.at(f, 550, 700);
  D.columnOp(ctx, { x: W / 2 - 210, y: 86, w: 220, a: 482517, b: 96348, op: "-", prog: p1, t: frame, cw: 36 });
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
  D.columnOp(ctx, { x: W / 2 - 100, y: -14, w: 200, a: 310254, b: 87169, op: "-", prog: 1, cw: 26 });
};

const LESSON = {
  code: "2-6",
  storageKey: "daf-g4-t2-l6",
  title: "Subtract Greater Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-6 · 4.NBT.B.4",
  math: M,
  ixl: ["TSJ", "WLN", "YPD"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A bar with one part missing. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "The missing part has a name: the difference.",
      rail: { launch: "I am not asking you to work it out. Just describe what you see.",
        monitor: ["Noticing the whole is 534", "Noticing one part is unknown", "Estimating the gap"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the bar as two separate numbers rather than a part and a whole." } },

    { phase: "launch", title: "How many <em>more</em>?",
      lead: "One town has 482,517 people. The other has 96,348. How many more? Estimate first.",
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

    { phase: "monitor", title: "Line up the <em>places</em>",
      lead: "Six digits over five. Where does the smaller number go?",
      goal: "Place alignment is the whole difficulty with greater numbers.",
      pull: "Which of these will need a trade?",
      rail: { launch: "Before you tap: which column should the 8 of 96,348 sit in?",
        monitor: ["Aligning from the right", "Aligning from the left", "Using the place labels"],
        connect: "What goes wrong if you line them up on the left?",
        misconception: "Lining the numbers up by their left edge." } },

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
          notices={["The whole is 482,517", "One part is missing", "96,348 is much smaller", "The missing part is bigger"]}
          wonders={["How many more?", "Is it about 400,000?", "How do I line them up?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStock} height={256} award={award}
          label="About how many more people?" min={200000} max={500000} start={390000} unit=""
          after="Locked. Keep it — you will check your exact answer against it."
          note="Round both numbers, then subtract the friendly ones." />;

      case 2:
        return <ExploreChips draw={makeColumnSub(step)} height={262}
          label="Step through the columns"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "set up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" },
                  { v: 3, label: "hundreds" }, { v: 4, label: "thousands" }, { v: 5, label: "ten th." }, { v: 6, label: "hund. th." }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="A crossed-out digit is a number that has been renamed, not reduced." />;

      case 3:
        return <ExploreChips draw={makeAlign(traded ? 1 : 0)} height={252}
          label="Line the two numbers up"
          value={traded ? 1 : 0}
          onPick={(v) => setTraded(v === 1)}
          chips={[{ v: 0, label: "align left" }, { v: 1, label: "align right" }]}
          caption={<MathEl omml={traded ? M.answer : M.regroup} size="lg" display="block" />}
          footnote="A five-digit number has nothing in the hundred thousands. Line up the ones and the rest follow." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "s1", text: "482,517 − 96,348", target: "yes" },
            { id: "s2", text: "579,684 − 236,412", target: "no" },
            { id: "s3", text: "412,050 − 187,300", target: "yes" },
            { id: "s4", text: "846,975 − 325,410", target: "no" }
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
          prompt="Subtract 310,254 − 87,169."
          omml={M.swyk}
          options={[{ v: "a", text: "223,085" }, { v: "b", text: "233,085" }, { v: "c", text: "222,915" }, { v: "d", text: "397,423" }]}
          right="a"
          support={{
            yes: "Yes — and 223,085 + 87,169 = 310,254, so it checks out.",
            notYet: "Not yet — check that 87,169 is lined up under the right places.",
            draw: drawSupport25, h: 96,
            hint: "87,169 has five digits. Its 8 belongs under the ten thousands."
          }} />;

      case 9:
        return <Closing game={game} omml={M.answer}
          action="Find two populations online, subtract them, and check by adding your answer back." />;

      default: return null;
    }
  }
};
