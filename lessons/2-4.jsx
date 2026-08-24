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

const makeBigAdd = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 130, y: 34, w: 260, a: 142857, b: 96344, op: "+", prog: step / 6, t: frame, cw: 38 });
  const notes = ["line the places up", "ones: 7 + 4 = 11", "tens: 1 + 5 + 4 = 10",
                 "hundreds: 1 + 8 + 3 = 12", "thousands: 1 + 2 + 6 = 9", "ten thousands: 4 + 9 = 13",
                 "hundred thousands: 1 + 1 = 2"];
  D.txt(ctx, notes[step], W / 2, H - 16, { size: 13.5, col: step === 6 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeThreeAddends = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const nums = [12450, 8375, 6120];
  const cw = 34, right = W / 2 + 110;
  const n = 6;
  const xOf = (i) => right - (n - i) * cw + cw / 2;
  nums.forEach((v, r) => {
    const s = String(v).padStart(n, " ");
    const a = r < shown ? 1 : 0.18;
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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two days of visitors. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "One number has six digits and one has five. That matters.",
      rail: { launch: "I am not asking for a total yet. Just look at the two bars.",
        monitor: ["Comparing the bars", "Reading the numbers by periods", "Noticing the different lengths"],
        connect: "Who noticed something nobody else did?",
        misconception: "Assuming the longer bar has more digits by definition." } },

    { phase: "launch", title: "Two days on the <em>waterfront</em>",
      lead: "142,857 came on Friday and 96,344 on Saturday. Estimate the total.",
      goal: "Create the need — and a check for the exact answer.",
      pull: "Now let us line the places up carefully.",
      rail: { launch: "Round both to the nearest thousand first.",
        monitor: ["Rounding to thousands", "Adding the leading digits", "Going straight to the algorithm"],
        connect: "What should the exact answer be close to?",
        misconception: "Lining the numbers up by their left edge." } },

    { phase: "monitor", title: "Line up the <em>places</em>",
      lead: "Six digits over five. Step through every column.",
      goal: "Place alignment is the whole difficulty with greater numbers.",
      pull: "What if there are three numbers to add?",
      rail: { launch: "Predict each column before you step.",
        monitor: ["Aligning from the right", "Aligning from the left", "Tracking the carries"],
        connect: "Which column was the hardest to keep track of?",
        misconception: "Aligning the leftmost digits so 9 sits under 1." } },

    { phase: "monitor", title: "Three <em>addends</em>",
      lead: "Stack them up. The columns do not change — only how many digits you add.",
      goal: "Extend the algorithm to three numbers.",
      pull: "Which of these sums will carry more than once?",
      rail: { launch: "Add the ones column out loud together.",
        monitor: ["Adding pairs then the third", "Adding all three at once", "Losing the carry"],
        connect: "Does the order you add the three digits change the answer?",
        misconception: "Adding the first two, then forgetting to include the carry with the third." } },

    { phase: "monitor", title: "How many <em>carries</em>?",
      lead: "Sort each sum by how many columns will regroup. No grading until the class commits.",
      goal: "Predict regrouping before calculating.",
      pull: "Two students set the same sum out differently.",
      rail: { launch: "Scan the columns from the right without calculating.",
        monitor: ["Checking each column", "Calculating fully first", "Estimating from the digits"],
        connect: "Which column tipped it over?",
        misconception: "Counting the digits instead of checking the columns." } },

    { phase: "connect", title: "Two ways to <em>set it out</em>",
      lead: "Hana lined up on grid paper. Yazan wrote place labels above. Same answer.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Using the grid", "Labelling the places", "Working without support"],
        connect: "What are both students protecting against?",
        misconception: "Believing neatness is optional here." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Line up the ones. Everything else follows. Then work right to left.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Watching the alignment", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Thinking greater numbers need a different method." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the alignment rule", "Testing on a six-digit sum", "Checking against the estimate"],
        connect: "Would this still work with a million?",
        misconception: "Believing there is a limit to how far the method goes." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Estimate first, then calculate.",
        monitor: ["Aligning carefully", "Estimating first", "Tracking every carry"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Misaligning the five-digit number against the six-digit one." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: taking numbers apart instead of putting them together.",
      rail: { launch: "Ask three students to say the alignment rule.",
        monitor: ["Able to explain it to someone else", "Still needs grid paper", "Ready to subtract"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawPilgrims} height={258} award={award}
          notices={["Friday has more", "One number has six digits", "Both are over 90,000", "The bars are different lengths"]}
          wonders={["What is the total?", "Will it pass 200,000?", "How do I line them up?"]} />;

      case 1:
        return <LaunchEstimate draw={drawPilgrims} height={258} award={award}
          label="About how many visitors over the two days?" min={150000} max={350000} start={240000} unit=""
          after="Locked. Keep it — you will check your exact answer against it."
          note="Round both to the nearest thousand and add those." />;

      case 2:
        return <ExploreChips draw={makeBigAdd(step)} height={262}
          label="Step through the columns"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "set up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" },
                  { v: 3, label: "hundreds" }, { v: 4, label: "thousands" }, { v: 5, label: "ten th." }, { v: 6, label: "hund. th." }]}
          caption={<MathEl omml={M.answer} size="lg" display="block" />}
          footnote="The five-digit number has nothing in the hundred thousands — that is fine." />;

      case 3:
        return <ExploreChips draw={makeThreeAddends(shown)} height={252}
          label="Add a third number to the stack"
          value={shown}
          onPick={(v) => setShown(v)}
          chips={[{ v: 1, label: "one number" }, { v: 2, label: "two" }, { v: 3, label: "three" }]}
          caption={<MathEl omml={M.three} size="lg" display="block" />}
          footnote="Three digits in a column can carry 2 — not just 1." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[
            { id: "c1", text: "241,300 + 158,400", target: "one" },
            { id: "c2", text: "142,857 + 96,344", target: "many" },
            { id: "c3", text: "312,045 + 126,432", target: "none" }
          ]}
          targets={[
            { id: "none", label: "no regrouping at all" },
            { id: "one", label: "regroups once" },
            { id: "many", label: "regroups in several columns" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Hana's way — grid paper", omml: M.lineUp, h: 92,
                  quote: "One digit per square, so nothing can drift." }}
          right={{ name: "Yazan's way — label the places", omml: M.carryChain, h: 92,
                   quote: "I write the place names above the columns first." }}
          same={["Both keep the places lined up", "Both work right to left", "Both get 239,201"]}
          diff={["Hana uses squares, Yazan uses labels", "Yazan can say each column out loud", "Hana's is faster to set up"]} />;

      case 6:
        return <BoardScreen draw={drawBoard24} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.lineUp, alt: "line up the places, not the edges" }]}
          hand={"line up the ones · work right to left · carry into the next place, however many columns there are"}
          cards={[
            { title: "The sum we built", omml: M.answer, note: "our estimate was 239,000" },
            { title: "Tap to see three addends", omml: M.estimate, revealOmml: M.three, reveal: true,
              note: "the same columns, one more digit each time" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Add 205,368 + 47,915."
          omml={M.swyk}
          options={[{ v: "a", text: "243,283" }, { v: "b", text: "253,283" }, { v: "c", text: "252,273" }, { v: "d", text: "684,518" }]}
          right="b"
          support={{
            yes: "Yes — and 205,000 + 48,000 = 253,000, so it is reasonable.",
            notYet: "Not yet — check that the 47,915 is lined up under the right places.",
            draw: drawSupport24, h: 96,
            hint: "47,915 has five digits. Its 4 belongs under the ten thousands, not the hundred thousands."
          }} />;

      case 9:
        return <Closing game={game} omml={M.lineUp}
          action="Find two numbers over 10,000 at home or online, add them, and check against an estimate." />;

      default: return null;
    }
  }
};
