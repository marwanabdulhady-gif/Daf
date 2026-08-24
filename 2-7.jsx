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
const makeChain = (hop) => (ctx, W, H, frame) => {
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

const makeColumnZeros = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 96, y: 30, w: 192, a: 4000, b: 1362, op: "-", prog: step / 4, t: frame, cw: 44 });
  const notes = ["set it up", "ones: nothing to take from — start the chain",
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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A number with three empty places. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Those zeros are about to cause trouble.",
      rail: { launch: "I am not asking anything yet. Just look at the chart.",
        monitor: ["Noticing the three zeros", "Naming the 4 as thousands", "Saying it looks easy"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading a zero as nothing at all rather than as an empty place." } },

    { phase: "launch", title: "Nothing to <em>take from</em>",
      lead: "4,000 − 1,362. The ones, tens and hundreds are all empty.",
      goal: "Create the need — the usual one-step trade is not available.",
      pull: "Estimate first, then we will find something to trade.",
      rail: { launch: "Try it the usual way. Where do you get stuck?",
        monitor: ["Getting stuck at the ones", "Writing 0 minus 2 as 2", "Looking left for help"],
        connect: "Where is the nearest place that actually has something?",
        misconception: "Writing 0 − 2 = 2 because the digits are flipped." } },

    { phase: "monitor", title: "The <em>chain</em> of trades",
      lead: "Hop left until you find a place with something in it, then hand it back down.",
      goal: "Regrouping across zeros is a chain, not a single step.",
      pull: "Now watch it happen in the columns.",
      rail: { launch: "Predict what each place will hold after the hop.",
        monitor: ["Following the chain", "Trading only once", "Checking the value is unchanged"],
        connect: "Is it still 4,000 after all those trades?",
        misconception: "Believing the number gets smaller each time you rename it." } },

    { phase: "monitor", title: "Now in the <em>columns</em>",
      lead: "The same chain, written the way you will write it.",
      goal: "Connect the renaming to the standard notation.",
      pull: "Which of these will need a chain?",
      rail: { launch: "Predict each column before you step.",
        monitor: ["Writing the 9s", "Losing track of the thousands digit", "Checking against the estimate"],
        connect: "Why are there two 9s in the middle?",
        misconception: "Writing 10 in every column instead of 9, 9, 10." } },

    { phase: "monitor", title: "Chain or <em>single trade</em>?",
      lead: "Sort each subtraction. No grading until the class commits.",
      goal: "Recognise when a chain will be needed.",
      pull: "Two students wrote the renaming differently.",
      rail: { launch: "Look at the digits to the left of the ones.",
        monitor: ["Spotting the zeros", "Calculating fully first", "Checking each column"],
        connect: "What is the signal that a chain is coming?",
        misconception: "Assuming any number with a zero needs a chain." } },

    { phase: "connect", title: "Two ways to <em>write it</em>",
      lead: "Jood crossed out step by step. Talal renamed 4,000 in one go.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Crossing out one at a time", "Renaming in one move", "Mixing the two and losing track"],
        connect: "Are these different methods, or the same one written differently?",
        misconception: "Thinking the one-step rename is a shortcut with different rules." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One thousand becomes ten hundreds, then one hundred becomes ten tens, then one ten becomes ten ones.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Following the chain", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Seeing the row of 9s as a rule to memorise rather than a result." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the chain", "Testing on a five-digit number", "Checking by adding back"],
        connect: "What would 10,000 − 1 look like?",
        misconception: "Believing the method breaks for longer chains." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Estimate, calculate, then check by adding back.",
        monitor: ["Renaming across the zeros", "Estimating first", "Checking by addition"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Writing 10 in the hundreds and tens instead of 9." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: deciding which operation a problem needs at all.",
      rail: { launch: "Ask three students to describe the chain in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the chart", "Ready for word problems"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [hop, setHop] = useState(0);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawZeros} height={256} award={award}
          notices={["Three places are empty", "Only the thousands has a digit", "It is 4,000", "The zeros hold the places"]}
          wonders={["What if I have to subtract?", "Can I take from an empty place?", "Where do I get ones from?"]} />;

      case 1:
        return <LaunchEstimate draw={drawZeros} height={256} award={award}
          label="About what is 4,000 − 1,362?" min={1500} max={4000} start={2600} unit=""
          after="Locked. Now let us find something to trade."
          note="Round 1,362 to 1,400 and take that from 4,000." />;

      case 2:
        return <ExploreChips draw={makeChain(hop)} height={258}
          label="Hop left to find something to trade"
          value={hop}
          onPick={(v) => setHop(v)}
          chips={[{ v: 0, label: "stuck" }, { v: 1, label: "trade a thousand" }, { v: 2, label: "trade a hundred" }, { v: 3, label: "trade a ten" }]}
          caption={<MathEl omml={M.rename} size="lg" display="block" />}
          footnote="Every trade renames the number. The value never moves." />;

      case 3:
        return <ExploreChips draw={makeColumnZeros(step)} height={258}
          label="Step through the columns"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "set up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" },
                  { v: 3, label: "hundreds" }, { v: 4, label: "thousands" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="9, 9, then 10 — that is what the chain leaves behind." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "z1", text: "4,000 − 1,362", target: "chain" },
            { id: "z2", text: "4,530 − 1,362", target: "single" },
            { id: "z3", text: "8,004 − 2,375", target: "chain" },
            { id: "z4", text: "6,481 − 2,350", target: "single" }
          ]}
          targets={[
            { id: "chain", label: "needs a chain of trades" },
            { id: "single", label: "one trade is enough" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Jood's way — one cross-out at a time", omml: M.chain, h: 92,
                  quote: "I did each trade separately so I could see it." }}
          right={{ name: "Talal's way — rename in one go", omml: M.rename, h: 92,
                   quote: "I wrote 3, 9, 9, 10 straight away." }}
          same={["Both end with 3, 9, 9 and 10", "Both keep the value at 4,000", "Both get 2,638"]}
          diff={["Jood shows each hop", "Talal writes it in one move", "Jood's is safer while it is new"]} />;

      case 6:
        return <BoardScreen draw={drawBoard27} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.chain, alt: "keep going left until you find something to trade" }]}
          hand={"empty places cannot give · hop left to the first place that can · hand it back down, ten at a time"}
          cards={[
            { title: "The difference we found", omml: M.answer, note: "our estimate was 2,600" },
            { title: "Tap to check it by adding", omml: M.estimate, revealOmml: M.check, reveal: true,
              note: "adding the answer back proves it" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Subtract 6,000 − 2,475."
          omml={M.swyk}
          options={[{ v: "a", text: "3,525" }, { v: "b", text: "4,525" }, { v: "c", text: "3,475" }, { v: "d", text: "3,635" }]}
          right="a"
          support={{
            yes: "Yes — and 3,525 + 2,475 = 6,000, so it checks out.",
            notYet: "Not yet — rename 6,000 first, before you subtract anything.",
            draw: drawSupport27, h: 96,
            hint: "6,000 is 5 thousands, 9 hundreds, 9 tens and 10 ones."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rename}
          action="Write 1,000 as hundreds, tens and ones on a scrap of paper and show someone why it is still 1,000." />;

      default: return null;
    }
  }
};
