/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-7 · Subtract Across Zeros
   Standard 4.NBT.B.4   I can ... subtract from a number with zeros by
   regrouping across more than one place.
   =========================================================================== */

const M = {
  problem: om(mt("4,000-1,362")),
  answer: om(mt("4,000-1,362=2,638")),
  rename: om(mt("4,000"), mnor(" is also "), mt("3"), mnor(" thousands "), mt("9"), mnor(" hundreds "), mt("9"), mnor(" tens "), mt("10"), mnor(" ones")),
  chain: om(mnor("keep going left until you find something to trade")),
  estimate: om(mt("4,000-1,400=2,600")),
  check: om(mt("2,638+1,362=4,000")),
  swyk: om(mt("6,000-2,475")),
  swykAnswer: om(mt("6,000-2,475=3,525"))
};

/* Launch: an empty shelf — nothing in the ones, tens or hundreds to take from */
const drawZeros = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 300), p3 = D.at(f, 310, 440);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvChart(ctx, { x: 40, y: 34, w: W - 80, digits: "4000", slots: 4, prog: p1, rowH: 32, t: frame });
  if (p2 > 0) {
    ["ones", "tens", "hundreds"].forEach((name, n) => {
      const a = D.at(p2, n * 0.25, n * 0.25 + 0.5);
      if (a <= 0) return;
      const cw = (W - 80) / 4;
      const cx = 40 + (3 - n) * cw + cw / 2;
      D.txt(ctx, "empty", cx, 158, { size: 11, col: "#C74440", font: "marker", alpha: a });
    });
  }
  if (p3 > 0) {
    D.txt(ctx, "we need to take away 1,362", W / 2, 190,
      { size: 15, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "but there is nothing to take from", W / 2, H - 20,
      { size: 14, col: "#C74440", font: "marker", alpha: D.at(f, 380, 460) });
  }
};

/* Monitor A: the borrow chain, one hop at a time */
const makeChain = (hop, onHop) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const stages = ["4000", "3(10)00", "39(10)0", "399(10)"];
  const digitSets = [["4", "0", "0", "0"], ["3", "10", "0", "0"], ["3", "9", "10", "0"], ["3", "9", "9", "10"]];
  const labels = [
    "no ones, no tens, no hundreds",
    "take one thousand — it becomes 10 hundreds",
    "take one hundred — it becomes 10 tens",
    "take one ten — it becomes 10 ones"
  ];
  const cw = 74, x0 = W / 2 - 2 * cw;
  const names = ["thousands", "hundreds", "tens", "ones"];
  if (onHop) for (let i = 0; i < 4; i++)
    D.tap(ctx, { x: x0 + i * cw, y: 56, w: cw, h: 64, value: i, on: (v) => onHop(v) });
  digitSets[hop].forEach((d, i) => {
    const changed = digitSets[hop][i] !== digitSets[0][i];
    D.txt(ctx, names[i], x0 + i * cw + cw / 2, 46,
      { size: 10, col: "rgba(234,244,242,.45)", font: "mono", weight: 600 });
    ctx.save();
    ctx.globalAlpha = 1;
    D.rr(ctx, x0 + i * cw + 6, 62, cw - 12, 52, 8);
    ctx.strokeStyle = changed ? "#C9A227" : "rgba(234,244,242,.22)";
    ctx.lineWidth = changed ? 2 : 1;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, d, x0 + i * cw + cw / 2, 90,
      { size: 26, col: changed ? "#C9A227" : "#EAF4F2", font: "marker" });
  });
  if (hop > 0) {
    const fromI = hop - 1;
    const ax0 = x0 + fromI * cw + cw / 2, ax1 = x0 + hop * cw + cw / 2;
    const pts = [];
    for (let s = 0; s <= 14; s++) {
      const t = s / 14;
      pts.push([ax0 + (ax1 - ax0) * t, 138 + Math.sin(Math.PI * t) * 20]);
    }
    D.marker(ctx, pts, 1, "#FA7E19", 2.2);
  }
  D.txt(ctx, labels[hop], W / 2, H - 42, { size: 14, col: hop === 3 ? "#34D399" : "#C9A227", font: "marker" });
  if (hop === 3) D.txt(ctx, "still 4,000 — just renamed", W / 2, H - 18,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
};

const makeColumnZeros = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: W / 2 - 96, y: 30, w: 192, h: H - 70, value: 0, on: () => onStep((step + 1) % 5) });
  D.columnOp(ctx, { x: W / 2 - 96, y: 30, w: 192, a: 4000, b: 1362, op: "-", prog: step / 4, t: frame, cw: 44 });
  const notes = ["set it up — tap to step", "ones: nothing to take from — start the chain",
                 "tens: 9 − 6 = 3", "hundreds: 9 − 3 = 6", "thousands: 3 − 1 = 2"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 13.5, col: step === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawBoard27 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "There is nothing next door — now what?" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 230, 400), p3 = D.at(f, 400, 570), p4 = D.at(f, 570, 720);
  D.columnOp(ctx, { x: W / 2 - 180, y: 82, w: 190, a: 4000, b: 1362, op: "-", prog: p1, t: frame, cw: 46 });
  if (p2 > 0) {
    D.txt(ctx, "0 ones cannot take 2", W / 2 + 96, 132, { size: 15, col: "#C74440", font: "marker", alpha: p2 });
    D.txt(ctx, "and the tens are empty too", W / 2 + 96, 158,
      { size: 13.5, col: "#C74440", font: "marker", alpha: D.at(f, 270, 350) });
  }
  if (p3 > 0) {
    D.txt(ctx, "keep going left", W / 2 + 96, 198, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "4,000 = 3 thousands, 9 hundreds,", W / 2 + 96, 226,
      { size: 12.5, col: "rgba(234,244,242,.8)", font: "marker", alpha: D.at(f, 440, 520) });
    D.txt(ctx, "9 tens and 10 ones", W / 2 + 96, 248,
      { size: 12.5, col: "rgba(234,244,242,.8)", font: "marker", alpha: D.at(f, 460, 540) });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "one thousand can be renamed all the way down to ten ones",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 610, 690) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 650, 750), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport27 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 82, y: -14, w: 164, a: 6000, b: 2475, op: "-", prog: 1, cw: 34 });
};

const LESSON = {
  code: "2-7",
  storageKey: "daf-g4-t2-l7",
  title: "Subtract Across Zeros",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-7 · 4.NBT.B.4",
  math: M,
  ixl: ["LZZ"],

  metas: [
    { phase: "warmup", title: "The line of <em>silent zeros</em>",
      lead: "Water damage erased the regrouping marks from the ledger. All that is left: 4,000 — and the ones, tens and hundreds are silent.",
      goal: "Notice there is nothing next door to trade — the trade must keep going left.",
      pull: "The warehouse counts are simulated — the chain works on any zeros.",
      rail: { launch: "Fictional frame. Describe the chart — no working yet.",
        monitor: ["Noticing the zeros are empty", "Noticing 1,362 must come out", "Wonding where the trade starts"],
        connect: "Where can the first trade begin?",
        misconception: "Answering 0 − 2 as a negative and stopping." } },

    { phase: "launch", title: "4,000 − 1,362, <em>estimated</em>",
      lead: "The difference before the chain runs — estimated to the nearest hundred.",
      goal: "Estimate the across-zero difference before regrouping.",
      pull: "Keep going left until you find something to trade.",
      rail: { launch: "Round 1,362. What is 4,000 − 1,400?",
        monitor: ["Rounding the subtrahend", "Subtracting the rounds", "Checking the gap is plausible"],
        connect: "What should the exact difference be near?",
        misconception: "Subtracting 2 from 0 in the ones without starting a chain." } },

    { phase: "monitor", title: "Zayd starts the <em>borrow chain</em>",
      lead: "Nothing in the ones, tens or hundreds — so the trade starts in the thousands and hops left to right.",
      goal: "Rename 4,000 as 3 thousands, 9 hundreds, 9 tens, 10 ones — one hop at a time.",
      pull: "Keep going left until you find something to trade.",
      rail: { launch: "Before each hop: what becomes what?",
        monitor: ["Trading a thousand for ten hundreds", "Trading a hundred for ten tens", "Trading a ten for ten ones"],
        connect: "Did the value of 4,000 change as it was renamed?",
        misconception: "Believing the rename changes the number's value." } },

    { phase: "monitor", title: "Omar steps the <em>renamed row</em>",
      lead: "Now the columns can be subtracted: 10 − 2, 9 − 6, 9 − 3, 3 − 1.",
      goal: "Subtract after the chain has done its work.",
      pull: "The renamed row is still 4,000.",
      rail: { launch: "Predict each column of the renamed row.",
        monitor: ["Subtracting 10 − 2", "Subtracting 9 − 6", "Reading 2,638"],
        connect: "Which column needed the chain?",
        misconception: "Forgetting to reduce the column that lent out its ten." } },

    { phase: "monitor", title: "Ink the <em>renamed row</em>",
      lead: "Four pieces of the rename. Each one belongs in exactly one place.",
      goal: "Sort the renamed row by place value.",
      pull: "3,9,9,10 is still 4,000.",
      rail: { launch: "Name the place each piece belongs to.",
        monitor: ["Placing the 3 thousands", "Placing the 9 hundreds", "Placing the 10 ones"],
        connect: "Why is 10 ones not in the ones box forever?",
        misconception: "Leaving 10 ones instead of renaming them." } },

    { phase: "connect", title: "Hassan renames <em>at once</em>. Musa trades one place at a time",
      lead: "Hassan writes 3,9,9,10 in one go. Musa hops the chain column by column. Both reach 2,638.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the two routes", "Checking both end at 2,638", "Saying the value never changed"],
        connect: "Which route is easier to check?",
        misconception: "Believing the one-shot rename skips the trades." } },

    { phase: "synth", title: "On the <em>board</em>: the trade keeps going left",
      lead: "Draw the zeros. Start the chain in the thousands. Hop right until the ones can give.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Following each hop", "Saying the value is unchanged", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Stopping the chain at the first zero." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "6,000 − 2,475 — the difference across the zeros?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Start the chain in the thousands.",
        monitor: ["Renaming across two zeros", "Subtracting the renamed row", "Checking against 3,600"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 3,575 — the tens chain was skipped." } },

    { phase: "connect", title: "The across-zeros ledger is <em>annotated</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the auditor's polished solution under the seal.",
      rail: { launch: "Ask three students to say where their chain started.",
        monitor: ["Able to explain the chain", "Still stops at the first zero", "Ready for two-step problems"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [hop, setHop] = useState(0);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The line of silent zeros"
            text="Water crossed the ledger and erased the regrouping marks. All that survives: 4,000 in the warehouse, 1,362 to ship — and a line of silent zeros between them."
            clue="The trade must keep going left">
            <NoticeWonder draw={drawZeros} height={256} award={award}
              notices={["The ones, tens and hundreds are empty", "1,362 must come out of 4,000", "The regrouping marks are gone", "Only the thousands hold anything"]}
              wonders={["Where can the first trade begin?", "What is 4,000 renamed as?", "How do you check across the zeros?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The difference, estimated before the chain"
            text="Omar asks for the estimate before any hop is made — the difference must sit near it."
            clue="Round 1,362, then subtract the rounds">
            <LaunchEstimate draw={drawZeros} height={256} award={award}
              label="4,000 − 1,362 — the difference, estimated" min={2000} max={3200} start={2600} unit="estimate"
              after="Locked. Now start the borrow chain in the thousands."
              note="The warehouse counts are simulated — the chain works on any zeros." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd starts the borrow chain"
            text="Nothing next door — so he takes from the thousands and hops right, one rename at a time."
            clue="Keep going left until you find something to trade">
            <ExploreChips draw={makeChain(hop, setHop)} height={252}
              label="Rename 4,000 one hop at a time"
              value={hop}
              onPick={(v) => setHop(v)}
              chips={[{ v: 0, label: "nothing to take from" }, { v: 1, label: "trade from the thousands" }, { v: 2, label: "trade from the hundreds" }, { v: 3, label: "trade from the tens" }]}
              caption={<MathEl omml={M.rename} size="lg" display="block" />}
              footnote="Still 4,000 — just renamed." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar steps the renamed row"
            text="The chain has done its work — now each column can be subtracted in turn."
            clue="10 − 2, then 9 − 6, then 9 − 3, then 3 − 1">
            <ExploreChips draw={makeColumnZeros(step, setStep)} height={252}
              label="Step the columns of 4,000 − 1,362"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "set it up" }, { v: 1, label: "start the chain" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }, { v: 4, label: "thousands" }]}
              caption={<MathEl omml={M.answer} size="lg" display="block" />}
              footnote="The renamed row is still 4,000." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Ink the renamed row"
            text="Omar and Zayd lay four pieces of the rename on the table. The ledger wants each one in its own place."
            clue="3, 9, 9, 10 is still 4,000">
            <CardSort award={award} columns={4} commitLabel="Ink the renamed row"
              items={[
                { id: "p1", text: "3 thousands", target: "thou" },
                { id: "p2", text: "9 hundreds", target: "hund" },
                { id: "p3", text: "9 tens", target: "tens" },
                { id: "p4", text: "10 ones", target: "ones" }
              ]}
              targets={[
                { id: "thou", label: "thousands" },
                { id: "hund", label: "hundreds" },
                { id: "tens", label: "tens" },
                { id: "ones", label: "ones" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 2,638"
            text="Hassan renames the whole row at once. Musa trades one place at a time. Both reach 2,638."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Hassan's way — rename the row at once", omml: M.rename, h: 92,
                      quote: "4,000 is also 3 thousands, 9 hundreds, 9 tens, 10 ones." }}
              right={{ name: "Musa's way — trade one place at a time", omml: M.chain, h: 92,
                       quote: "Keep going left until you find something to trade." }}
              same={["Both reach 2,638", "Both keep the value unchanged", "Both can be checked by adding back"]}
              diff={["Hassan's row is one line", "Musa's chain is four hops", "Musa's hops are easier to verify"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The chain is drawn, not declared"
            text="Zayd builds only what the class can justify: the zeros, the chain from the thousands, the hops right."
            clue="One thousand can be renamed all the way down to ten ones">
            <BoardScreen draw={drawBoard27} height={430}
              caption="Silent zeros: the trade keeps going left." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the across-zeros ledger"
            text="6,000 − 2,475. Show the difference — and the chain that made it."
            clue="Start the chain in the thousands">
            <ShowWhatYouKnow award={award}
              prompt="6,000 − 2,475 — the difference across the zeros?"
              omml={M.swyk}
              options={[{ v: "a", text: "3,525" }, { v: "b", text: "3,575" }, { v: "c", text: "3,425" }, { v: "d", text: "4,525" }]}
              right="a"
              support={{
                yes: "Yes — the chain runs across both zeros and 3,525 adds back to 6,000.",
                notYet: "Not yet — add it back: the difference plus 2,475 must be 6,000.",
                draw: drawSupport27, h: 82,
                hint: "0 ones cannot take 5 — and the tens are empty too. Where does the chain start?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="Every trade is annotated"
            text="Omar signs the across-zeros ledger with every trade annotated. The auditor leans in, lays a polished solution under the seal — and a polished answer can still hide a faulty step."
            artifact="Across-zeros ledger · every trade annotated"
            next="The auditor lays a polished solution under the seal — but a polished answer can still hide a faulty step.">
            <Closing game={game} omml={M.chain}
              action="Subtract across two zeros tonight — a bill, a distance — and annotate every trade." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
