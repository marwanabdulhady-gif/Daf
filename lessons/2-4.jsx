/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-4 · Add Greater Numbers
   Standard 4.NBT.B.4   I can ... add multi-digit numbers up to six digits,
   including three addends, using the standard algorithm.
   =========================================================================== */

const M = {
  problem: om(mt("142,857+96,344")),
  answer: om(mt("142,857+96,344=239,201")),
  estimate: om(mt("143,000+96,000=239,000")),
  three: om(mt("12,450+8,375+6,120=26,945")),
  lineUp: om(mnor("line up the places, not the edges")),
  carryChain: om(mt("7+4=11"), mnor(", then "), mt("1+5+4=10")),
  swyk: om(mt("205,368+47,915")),
  swykAnswer: om(mt("205,368+47,915=253,283"))
};

const drawPilgrims = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 300), p3 = D.at(f, 300, 430);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "visitors to the Jeddah waterfront", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const bars = [{ n: 142857, label: "Friday", col: "#2D70B3" }, { n: 96344, label: "Saturday", col: "#FA7E19" }];
  const maxN = 150000;
  bars.forEach((b, k) => {
    const a = D.at(p2, k * 0.35, k * 0.35 + 0.6);
    if (a <= 0) return;
    const bw = (b.n / maxN) * (W - 150);
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, 84, 60 + k * 62, bw, 40, 7);
    ctx.fillStyle = b.col; ctx.globalAlpha = a * 0.7; ctx.fill();
    ctx.restore();
    D.txt(ctx, b.label, 78, 80 + k * 62, { size: 12, col: b.col, font: "marker", align: "right", alpha: a });
    D.txt(ctx, b.n.toLocaleString("en-US"), 84 + bw + 10, 80 + k * 62,
      { size: 15, col: "#EAF4F2", font: "marker", align: "left", alpha: a });
  });
  if (p3 > 0) D.txt(ctx, "how many over the two days?", W / 2, H - 22,
    { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
};

const makeBigAdd = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: W / 2 - 130, y: 34, w: 260, h: H - 70, value: 0, on: () => onStep((step + 1) % 7) });
  D.columnOp(ctx, { x: W / 2 - 130, y: 34, w: 260, a: 142857, b: 96344, op: "+", prog: step / 6, t: frame, cw: 38 });
  const notes = ["line the places up — tap to step", "ones: 7 + 4 = 11", "tens: 1 + 5 + 4 = 10",
                 "hundreds: 1 + 8 + 3 = 12", "thousands: 1 + 2 + 6 = 9", "ten thousands: 4 + 9 = 13",
                 "hundred thousands: 1 + 1 = 2"];
  D.txt(ctx, notes[step], W / 2, H - 16, { size: 13.5, col: step === 6 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeThreeAddends = (shown, onShown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const nums = [12450, 8375, 6120];
  const cw = 34, right = W / 2 + 110;
  const n = 6;
  const xOf = (i) => right - (n - i) * cw + cw / 2;
  nums.forEach((v, r) => {
    const s = String(v).padStart(n, " ");
    const a = r < shown ? 1 : 0.18;
    if (onShown) D.tap(ctx, { x: right - n * cw - 12, y: 56 + r * 36 - 14, w: n * cw + 24, h: 30, value: r + 1, on: (v) => onShown(v) });
    for (let i = 0; i < n; i++) {
      if (s[i] === " ") continue;
      D.txt(ctx, s[i], xOf(i), 56 + r * 36, { size: 24, col: "#EAF4F2", font: "marker", alpha: a });
    }
  });
  D.txt(ctx, "+", right - n * cw - 14, 128, { size: 24, col: "#C9A227", font: "marker" });
  D.marker(ctx, [[right - n * cw - 24, 148], [right + 4, 148]], 1, "rgba(234,244,242,.8)", 2.2);
  if (shown === 3) {
    const s = String(26945).padStart(n, " ");
    for (let i = 0; i < n; i++) {
      if (s[i] === " ") continue;
      D.txt(ctx, s[i], xOf(i), 178, { size: 26, col: "#34D399", font: "marker" });
    }
    D.txt(ctx, "three addends — the same columns, one extra digit to add", W / 2, H - 16,
      { size: 13, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, "add one number at a time to the stack", W / 2, H - 16,
      { size: 13, col: "#C9A227", font: "marker" });
  }
};

const drawBoard24 = (ctx, W, H, frame) => {
  const CYCLE = 760, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Bigger numbers, same rule" });
  const p1 = D.at(f, 20, 230), p2 = D.at(f, 240, 400), p3 = D.at(f, 420, 600);
  D.columnOp(ctx, { x: W / 2 - 150, y: 84, w: 300, a: 142857, b: 96344, op: "+", prog: p1, t: frame, cw: 44 });
  if (p2 > 0) {
    D.txt(ctx, "96,344 has five digits, 142,857 has six", W / 2, 250,
      { size: 14, col: "#C9A227", font: "marker", alpha: p2 });
    D.txt(ctx, "line up the ones, and the rest follow", W / 2, 278,
      { size: 14, col: "#EAF4F2", font: "marker", alpha: D.at(f, 300, 380) });
  }
  if (p3 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the method never changes — only the number of columns does",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 470, 550) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 510, 610), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport24 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 96, y: -16, w: 192, a: 205368, b: 47915, op: "+", prog: 1, cw: 30 });
};

const LESSON = {
  code: "2-4",
  storageKey: "daf-g4-t2-l4",
  title: "Add Greater Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-4 · 4.NBT.B.4",
  math: M,
  ixl: ["26W", "X8G", "KTH", "ERL"],

  metas: [
    { phase: "warmup", title: "A second bundle, <em>city-sized</em>",
      lead: "142,857 visitors Friday, 96,344 Saturday. The numbers outgrow the old three-column ledger.",
      goal: "Notice that one number has six digits and one has five — and that the places must still line up.",
      pull: "The visitor counts are simulated — the method works on any city-sized pair.",
      rail: { launch: "Fictional frame. Just look at the two bars — no total yet.",
        monitor: ["Reading the numbers by periods", "Noticing the different lengths", "Wonding how the columns will line up"],
        connect: "Where do the two numbers start to line up?",
        misconception: "Lining up the numbers by their left edges instead of by place." } },

    { phase: "launch", title: "The estimate <em>before the exact</em>",
      lead: "142,857 + 96,344. The council wants the estimate first — then the audited exact total.",
      goal: "Estimate city-sized numbers to the nearest thousand.",
      pull: "Line up the places, not the edges.",
      rail: { launch: "Give the estimate and the place you rounded to.",
        monitor: ["Rounding to thousands", "Adding 143,000 and 96,000", "Checking the estimate is plausible"],
        connect: "What should the exact total be near?",
        misconception: "Estimating by adding the first digits only." } },

    { phase: "monitor", title: "Zayd steps the <em>carry chain</em>",
      lead: "Ones to hundred-thousands — each column trades before the next one is touched.",
      goal: "Add six places with the carries chaining correctly.",
      pull: "7 + 4 = 11, then 1 + 5 + 4 = 10 — the carry chain.",
      rail: { launch: "Predict each column before Zayd steps it.",
        monitor: ["Following the carried ten", "Adding the carry into the next column", "Checking a column after the chain"],
        connect: "What happens in the tens when the ones trade?",
        misconception: "Forgetting the carry — or adding the carry into the next digit." } },

    { phase: "monitor", title: "Omar stacks <em>three addends</em>",
      lead: "12,450 + 8,375 + 6,120. The stack grows, the columns stay the same.",
      goal: "Line up places for three addends — one extra digit to add, not a new method.",
      pull: "Line up the places, not the edges.",
      rail: { launch: "Which place does each digit of 12,450 join?",
        monitor: ["Lining up the ones", "Reading a number by periods", "Adding the third row into a column"],
        connect: "Why does 12,450 start two columns to the left of 6,120?",
        misconception: "Writing 8,375 under 12,450's left edge." } },

    { phase: "monitor", title: "Sort the <em>carry chain</em>",
      lead: "Four lines from the big sum: some are carries, some are the total the chain produced.",
      goal: "Recognise each column event in the chain.",
      pull: "A carry changes the column above it.",
      rail: { launch: "Name the column each line belongs to.",
        monitor: ["Reading a sum as a trade", "Spotting the chain", "Finding the final total"],
        connect: "Which line is the answer, and which are the trades?",
        misconception: "Treating the carried ten as part of the column below it." } },

    { phase: "connect", title: "Hassan estimates first. <em>Musa chains.</em>",
      lead: "Hassan: estimate first, then exact. Musa: carry chain, one column at a time. Both defend 239,201.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Checking the exact total against 239,000", "Following the chain", "Seeing both defend the same number"],
        connect: "Which step would catch an error first?",
        misconception: "Believing the estimate replaces the exact total." } },

    { phase: "synth", title: "On the <em>board</em>: bigger numbers, same rule",
      lead: "Line the ones up and the rest follows. The method never changes — only the number of columns does.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Lining up by the ones", "Following the chain", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Starting the chain at the left edge of the longer number." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "205,368 + 47,915 — the audited total?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Line up the places first.",
        monitor: ["Lining up by the ones", "Chaining the carries", "Checking against an estimate"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 252,283 — a carry was lost in the chain." } },

    { phase: "connect", title: "The city order is <em>audited</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the council approves the spend — what remains?",
      rail: { launch: "Ask three students to say how they lined the numbers up.",
        monitor: ["Able to explain the chain", "Still lines up by the edges", "Ready for three addends"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [shown, setShown] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="A second bundle, city-sized"
            text="The waterfront counts arrive: 142,857 on Friday, 96,344 on Saturday. The old three-column ledger cannot hold them."
            clue="The places must still line up">
            <NoticeWonder draw={drawPilgrims} height={256} award={award}
              notices={["One number has six digits, one has five", "Both are near a hundred thousand", "The Friday bar is longer", "The old columns are too short"]}
              wonders={["About how many visitors altogether?", "How will the columns line up?", "What estimate should the exact total be near?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the exact"
            text="Omar asks for the estimate to the nearest thousand before the audited total is written into the city order."
            clue="Round both to thousands, then add the rounds">
            <LaunchEstimate draw={drawPilgrims} height={256} award={award}
              label="142,857 + 96,344 — the estimate before the exact" min={200000} max={260000} start={239000} unit="visitors"
              after="Locked. Now step the carry chain and audit the exact total."
              note="The visitor counts are simulated — the method works on any city-sized pair." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd steps the carry chain"
            text="He can step any column, but the class must predict the trade before the chain moves on."
            clue="7 + 4 = 11, then 1 + 5 + 4 = 10 — the carry chain">
            <ExploreChips draw={makeBigAdd(step, setStep)} height={252}
              label="Step the columns of 142,857 + 96,344"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "line up the places" }, { v: 1, label: "ones" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }, { v: 4, label: "thousands" }, { v: 5, label: "ten thousands" }, { v: 6, label: "hundred thousands" }]}
              caption={<MathEl omml={M.carryChain} size="lg" display="block" />}
              footnote="Each carry changes the column above it — the chain runs left." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar stacks three addends"
            text="The market's second stack: 12,450, 8,375 and 6,120. One extra digit to add — not a new method."
            clue="Line up the places, not the edges">
            <ExploreChips draw={makeThreeAddends(shown, setShown)} height={252}
              label="Add one number at a time to the stack"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[{ v: 0, label: "start" }, { v: 1, label: "12,450" }, { v: 2, label: "+ 8,375" }, { v: 3, label: "+ 6,120" }]}
              caption={<MathEl omml={M.lineUp} size="lg" display="block" />}
              footnote="Line up the places, not the edges." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Sort the carry chain"
            text="Omar and Zayd lay four lines from the big sum on the table. The ledger wants the trades and the total kept apart."
            clue="A carry changes the column above it">
            <CardSort award={award} columns={2} commitLabel="Mark the chain"
              items={[
                { id: "c1", text: "7 + 4 = 11", target: "carry" },
                { id: "c2", text: "1 + 5 + 4 = 10", target: "carry" },
                { id: "c3", text: "4 + 9 + 1 = 14", target: "carry" },
                { id: "c4", text: "239,201", target: "total" }
              ]}
              targets={[
                { id: "carry", label: "a carry — a trade into the column above" },
                { id: "total", label: "the column total the chain produced" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one audited total"
            text="Hassan estimates first and then checks the exact. Musa chains the carries column by column. Both defend 239,201."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Hassan's way — estimate first, then exact", omml: M.estimate, h: 92,
                      quote: "143,000 + 96,000 is 239,000 — the exact total must sit near it." }}
              right={{ name: "Musa's way — carry chain, one column at a time", omml: M.carryChain, h: 92,
                       quote: "Each column trades before the next is touched." }}
              same={["Both reach 239,201", "Both line up the places", "Both can defend the total"]}
              diff={["Hassan's estimate catches a wildly wrong total", "Musa's chain catches a lost carry", "Hassan works fast, Musa works sure"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The columns are redesigned, the places do not change"
            text="Zayd builds only what the class can justify: the ones lined up, the chain run left, the total audited."
            clue="The method never changes — only the number of columns does">
            <BoardScreen draw={drawBoard24} height={430}
              caption="Redesign the columns: the places don't change." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the city order with its audit"
            text="205,368 + 47,915. Show the audited total — and the chain that made it."
            clue="Line up the places, not the edges">
            <ShowWhatYouKnow award={award}
              prompt="205,368 + 47,915 — the audited total?"
              omml={M.swyk}
              options={[{ v: "a", text: "253,283" }, { v: "b", text: "252,283" }, { v: "c", text: "253,183" }, { v: "d", text: "263,283" }]}
              right="a"
              support={{
                yes: "Yes — the chain runs left and the total is 253,283.",
                notYet: "Not yet — which column lost its carry?",
                draw: drawSupport24, h: 82,
                hint: "8 + 5 = 13 — the ones trade. Then the tens must take the ten."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The city order is audited"
            text="Omar signs the city order with its audit. The council approves the spend — and the reserve ledger opens to the question nobody has answered yet: what remains, and how do you prove it?"
            artifact="City order · audited total"
            next="The council approves the spend — what remains in the reserve, and how do you prove it?">
            <Closing game={game} omml={M.lineUp}
              action="Add three numbers from a real list tonight — a bill, a route, a score — and line up the places." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
