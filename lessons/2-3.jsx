/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-3 · Add Whole Numbers
   Standard 4.NBT.B.4   I can ... add multi-digit numbers using the standard
   algorithm, and explain the regrouping.
   =========================================================================== */

const M = {
  problem: om(mt("268+154")),
  expanded: om(mt("200+100"), mnor(", "), mt("60+50"), mnor(", "), mt("8+4")),
  regroupOnes: om(mt("8+4=12"), mnor(" — that is "), mt("1"), mnor(" ten and "), mt("2"), mnor(" ones")),
  regroupTens: om(mt("1+6+5=12"), mnor(" tens")),
  answer: om(mt("268+154=422")),
  estimate: om(mt("270+150=420")),
  swyk: om(mt("376+248")),
  swykAnswer: om(mt("376+248=624"))
};

const drawLibrary = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 280), p3 = D.at(f, 290, 420);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school library", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const shelves = [{ n: 268, x: W * 0.3, col: "#2D70B3", label: "Arabic" },
                   { n: 154, x: W * 0.7, col: "#FA7E19", label: "English" }];
  shelves.forEach((s, k) => {
    const a = D.at(p2, k * 0.3, k * 0.3 + 0.6);
    if (a <= 0) return;
    for (let r = 0; r < 6; r++) {
      const bars = Math.min(10, Math.round((s.n / 300) * 10));
      for (let c = 0; c < bars; c++) {
        const ba = D.at(p2, k * 0.3 + (r * bars + c) / 90, k * 0.3 + (r * bars + c) / 90 + 0.2);
        if (ba <= 0) continue;
        ctx.save();
        ctx.globalAlpha = ba * 0.8;
        D.rr(ctx, s.x - 52 + c * 10, 52 + r * 15, 7, 12, 1.5);
        ctx.fillStyle = s.col; ctx.fill();
        ctx.restore();
      }
    }
    D.txt(ctx, s.label, s.x, 156, { size: 12, col: s.col, font: "marker", alpha: a });
    D.txt(ctx, String(s.n), s.x, 180, { size: 22, col: "#EAF4F2", font: "marker", alpha: a });
  });
  if (p3 > 0) D.txt(ctx, "how many books altogether?", W / 2, H - 20,
    { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
};

const makeColumnAdd = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 90, y: 30, w: 180, a: 268, b: 154, op: "+", prog: step / 3, t: frame, cw: 42 });
  const notes = ["start with the ones", "8 + 4 = 12 — write 2, carry 1 ten",
                 "1 + 6 + 5 = 12 tens — write 2, carry 1 hundred", "1 + 2 + 1 = 4 hundreds"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 14, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeExpandedAdd = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [["hundreds", 200, 100, 300, "#6042A6"], ["tens", 60, 50, 110, "#2D70B3"], ["ones", 8, 4, 12, "#FA7E19"]];
  rows.forEach((r, n) => {
    const a = n < shown ? 1 : 0.2;
    const y = 52 + n * 46;
    D.txt(ctx, r[0], 64, y, { size: 12, col: r[4], font: "mono", weight: 700, align: "left", alpha: a });
    D.txt(ctx, r[1] + " + " + r[2] + " = " + r[3], W / 2 + 30, y,
      { size: 17, col: "#EAF4F2", font: "marker", alpha: a });
  });
  if (shown === 3) {
    D.marker(ctx, [[64, 196], [W - 64, 196]], 1, "rgba(201,162,39,.5)", 1.6);
    D.txt(ctx, "300 + 110 + 12 = 422", W / 2, 222, { size: 19, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, "add one place at a time", W / 2, H - 16, { size: 13, col: "#C9A227", font: "marker" });
  }
};

const drawBoard23 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Where does the carried 1 come from?" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 210, 380), p3 = D.at(f, 400, 560), p4 = D.at(f, 560, 700);
  D.columnOp(ctx, { x: W / 2 - 168, y: 86, w: 168, a: 268, b: 154, op: "+", prog: p1, t: frame, cw: 46 });
  if (p2 > 0) {
    D.txt(ctx, "8 + 4 = 12", W / 2 + 90, 140, { size: 17, col: "#FA7E19", font: "marker", alpha: p2 });
    D.txt(ctx, "12 ones = 1 ten and 2 ones", W / 2 + 90, 168,
      { size: 13, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 250, 340) });
  }
  if (p3 > 0) {
    D.txt(ctx, "the 1 is a whole ten —", W / 2 + 90, 210, { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "it moves to the tens column", W / 2 + 90, 234,
      { size: 14, col: "#C9A227", font: "marker", alpha: D.at(f, 440, 520) });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "carrying is not a trick — it is trading ten ones for one ten",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 600, 680) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 630, 730), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport23 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 70, y: -14, w: 140, a: 376, b: 248, op: "+", prog: 1, cw: 34 });
};

const LESSON = {
  code: "2-3",
  storageKey: "daf-g4-t2-l3",
  title: "Add Whole Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-3 · 4.NBT.B.4",
  math: M,
  ixl: ["DWQ", "M8W"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two shelves of books. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "Adding them will need a trade.",
      rail: { launch: "I am not asking for the total yet. Just look.",
        monitor: ["Estimating by eye", "Noticing one shelf is fuller", "Reading the numbers"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading 268 and 154 as separate facts rather than a sum." } },

    { phase: "launch", title: "How many books <em>altogether</em>?",
      lead: "268 Arabic titles and 154 English titles. Estimate before you calculate.",
      goal: "Create the need — and an estimate to check the answer against.",
      pull: "Now let us find the exact number, one place at a time.",
      rail: { launch: "Round both first. Roughly how many?",
        monitor: ["Rounding to 270 and 150", "Adding hundreds only", "Going straight to the algorithm"],
        connect: "What should the exact answer be close to?",
        misconception: "Skipping the estimate and losing the check." } },

    { phase: "monitor", title: "One <em>column</em> at a time",
      lead: "Start with the ones. Step through and watch the carry appear.",
      goal: "The algorithm as a sequence of place-value trades.",
      pull: "Where did that little 1 actually come from?",
      rail: { launch: "Predict each column before you step.",
        monitor: ["Starting from the ones", "Starting from the left", "Forgetting to add the carry"],
        connect: "What does the carried 1 stand for?",
        misconception: "Writing 12 in the ones column." } },

    { phase: "monitor", title: "The <em>same sum</em>, written open",
      lead: "Add each place separately, then put the parts back together.",
      goal: "Expanded addition explains the carry.",
      pull: "Which sums will need a trade at all?",
      rail: { launch: "Predict each place total before you reveal it.",
        monitor: ["Adding place by place", "Noticing 110 is more than one hundred", "Recombining the parts"],
        connect: "Where is the carried ten in this version?",
        misconception: "Losing the zeros when writing the place values." } },

    { phase: "monitor", title: "Will it need <em>regrouping</em>?",
      lead: "Sort each sum before you calculate it. No grading until the class commits.",
      goal: "Predict regrouping from the digits.",
      pull: "Two students explained the carry differently.",
      rail: { launch: "Look only at the ones column first.",
        monitor: ["Checking the ones", "Checking every column", "Calculating fully first"],
        connect: "Which column did you check, and why that one?",
        misconception: "Assuming bigger numbers always need regrouping." } },

    { phase: "connect", title: "Two ways to <em>explain the carry</em>",
      lead: "Noor used the open method. Kareem used the columns. Same 422.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Finding 110 inside the carry", "Preferring the columns", "Using the open method to check"],
        connect: "Where is the 110 hiding in Kareem's method?",
        misconception: "Believing the algorithm is a different kind of maths." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Ten ones become one ten. The one moves left because it is worth ten.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming the trade", "Restating it in their own words"],
        connect: "Who can say what carrying means in one sentence?",
        misconception: "Saying carry the one without saying one what." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the trade", "Testing on a bigger sum", "Checking against the estimate"],
        connect: "Does the same trade happen in the tens column?",
        misconception: "Thinking regrouping only happens in the ones." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Estimate first, then calculate.",
        monitor: ["Estimating first", "Working right to left", "Adding the carry in"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Forgetting to add the carried ten into the tens column." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the same method, with much bigger numbers.",
      rail: { launch: "Ask three students to say what the carried 1 means.",
        monitor: ["Able to explain it to someone else", "Still needs the open method", "Ready for greater numbers"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawLibrary} height={258} award={award}
          notices={["One shelf has more", "Both are under 300", "268 is nearly 270", "They are different languages"]}
          wonders={["How many altogether?", "Will it pass 400?", "Do I need to trade?"]} />;

      case 1:
        return <LaunchEstimate draw={drawLibrary} height={258} award={award}
          label="About how many books in total?" min={300} max={600} start={420} unit="books"
          after="Locked. Keep that number — you will check your exact answer against it."
          note="An estimate is not a guess. It is your safety net." />;

      case 2:
        return <ExploreChips draw={makeColumnAdd(step)} height={262}
          label="Step through the columns"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "set it up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Always start on the right. The carry travels left." />;

      case 3:
        return <ExploreChips draw={makeExpandedAdd(shown)} height={252}
          label="Reveal each place"
          value={shown}
          onPick={(v) => setShown(v)}
          chips={[{ v: 1, label: "hundreds" }, { v: 2, label: "+ tens" }, { v: 3, label: "+ ones" }]}
          caption={<MathEl omml={M.regroupTens} size="lg" display="block" />}
          footnote="110 tens is more than a hundred — that extra hundred is the second carry." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "s1", text: "268 + 154", target: "yes" },
            { id: "s2", text: "241 + 137", target: "no" },
            { id: "s3", text: "455 + 329", target: "yes" },
            { id: "s4", text: "512 + 236", target: "no" }
          ]}
          targets={[
            { id: "yes", label: "needs regrouping" },
            { id: "no", label: "no regrouping needed" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Noor's way — open method", omml: M.expanded, h: 92,
                  quote: "I added each place, then put them together." }}
          right={{ name: "Kareem's way — columns", omml: M.answer, h: 92,
                   quote: "Ones, then tens, then hundreds, carrying as I go." }}
          same={["Both get 422", "Both start from the ones", "Both trade ten ones for a ten"]}
          diff={["Noor writes every part", "Kareem's carry is a small 1", "Noor's shows why, Kareem's is faster"]} />;

      case 6:
        return <BoardScreen draw={drawBoard23} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.regroupOnes, alt: "eight plus four is twelve, one ten and two ones" }]}
          hand={"start on the right · ten of anything becomes one of the next place · the carry moves left"}
          cards={[
            { title: "The sum we built", omml: M.answer, note: "our estimate was 420 — close" },
            { title: "Tap to see the tens trade", omml: M.estimate, revealOmml: M.regroupTens, reveal: true,
              note: "the tens column regroups too" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Add 376 + 248."
          omml={M.swyk}
          options={[{ v: "a", text: "514" }, { v: "b", text: "614" }, { v: "c", text: "624" }, { v: "d", text: "5,114" }]}
          right="c"
          support={{
            yes: "Yes — 6 + 8 = 14, carry 1; 1 + 7 + 4 = 12, carry 1; 1 + 3 + 2 = 6.",
            notYet: "Not yet — check whether you added each carry in.",
            draw: drawSupport23, h: 96,
            hint: "The ones made 14 and the tens made 12. Both need a trade."
          }} />;

      case 9:
        return <Closing game={game} omml={M.answer}
          action="Add two three-digit numbers from a receipt at home, and say out loud what each carry is worth." />;

      default: return null;
    }
  }
};
