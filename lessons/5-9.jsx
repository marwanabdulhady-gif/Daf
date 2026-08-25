/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-9 · Choose a Strategy to Divide
   Standard 4.NBT.B.6   I can ... look at the numbers first, then choose the
   division strategy that suits them.
   =========================================================================== */

const M = {
  mental: om(mt("2,400\u00f76=400")),
  chunk: om(mt("738\u00f76=123")),
  share: om(mt("52\u00f74=13")),
  estimateFirst: om(mnor("estimate first \u00b7 every time")),
  rule: om(mnor("read the numbers before you pick a method")),
  swyk: om(mt("4,800\u00f78")),
  swykAnswer: om(mt("48\u00f78=6"), mnor(", so "), mt("600"))
};

const CASES = [
  { id: "mental", label: "2,400 ÷ 6", why: "the dividend is a basic fact with zeros",
    pick: "mental math", col: "#388C46", work: "24 ÷ 6 = 4, so 2,400 ÷ 6 = 400" },
  { id: "chunk", label: "738 ÷ 6", why: "big, but easy chunks are visible",
    pick: "partial quotients", col: "#2D70B3", work: "100 + 20 + 3 = 123" },
  { id: "share", label: "52 ÷ 4", why: "small enough to share with blocks",
    pick: "sharing by place value", col: "#FA7E19", work: "one ten each, then three ones" }
];

const makeChooser59 = (id) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const c = CASES.filter(function (k) { return k.id === id; })[0];
  D.txt(ctx, c.label, W / 2, 58, { size: 32, col: "#EAF4F2", font: "marker" });
  D.marker(ctx, [[W / 2 - 120, 82], [W / 2 + 120, 82]], 1, "rgba(201,162,39,.45)", 1.6);
  D.txt(ctx, c.why, W / 2, 108, { size: 14, col: "rgba(234,244,242,.75)", font: "marker" });
  ctx.save();
  ctx.globalAlpha = 0.6 + Math.sin(frame / 15) * 0.3;
  D.rr(ctx, W / 2 - 158, 130, 316, 40, 9);
  ctx.strokeStyle = c.col; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();
  D.txt(ctx, c.pick, W / 2, 150, { size: 16, col: c.col, font: "marker" });
  D.txt(ctx, c.work, W / 2, H - 20, { size: 15, col: "#34D399", font: "marker" });
};

const makeEstimateGate = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "738 \u00f7 6", W / 2, 46, { size: 24, col: "#EAF4F2", font: "marker" });
  const answers = [
    { v: "123", ok: true }, { v: "13", ok: false }, { v: "1,230", ok: false }
  ];
  answers.forEach(function (a, k) {
    const cx = W / 2 - 150 + k * 150;
    ctx.save();
    ctx.globalAlpha = 1;
    D.rr(ctx, cx - 58, 86, 116, 50, 8);
    ctx.strokeStyle = on ? (a.ok ? "#34D399" : "#C74440") : "rgba(234,244,242,.3)";
    ctx.lineWidth = on ? 2 : 1.2;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, a.v, cx, 112, { size: 21, col: on ? (a.ok ? "#34D399" : "#C74440") : "#EAF4F2", font: "marker" });
    if (on) D.txt(ctx, a.ok ? "matches the estimate" : "nowhere near", cx, 152,
      { size: 10.5, col: a.ok ? "#34D399" : "#C74440", font: "mono", weight: 600 });
  });
  D.txt(ctx, on ? "6 \u00d7 100 = 600, so the answer is near 120" : "which of these could be right?",
    W / 2, H - 40, { size: 15, col: on ? "#C9A227" : "#EAF4F2", font: "marker" });
  D.txt(ctx, on ? "an estimate rules out two of them instantly" : "tap to estimate first",
    W / 2, H - 16, { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

const drawThreeJobs = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "three jobs on one morning", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  CASES.forEach(function (c, k) {
    const a = D.at(p2, k * 0.28, k * 0.28 + 0.6);
    if (a <= 0) return;
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, 44, 52 + k * 52, W - 88, 42, 8);
    ctx.strokeStyle = c.col; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.restore();
    D.txt(ctx, c.label, 104, 73 + k * 52, { size: 18, col: "#EAF4F2", font: "marker", alpha: a });
    D.txt(ctx, c.why, W / 2 + 90, 73 + k * 52,
      { size: 11.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: a });
  });
  if (p3 > 0) D.txt(ctx, "same operation, three different best methods", W / 2, H - 16,
    { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard59 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Read the numbers first" });
  const stages = [
    { p: [20, 170], q: "Is it a basic fact with zeros?", a: "do it in your head", col: "#388C46" },
    { p: [180, 330], q: "Is it big, with easy chunks?", a: "partial quotients", col: "#2D70B3" },
    { p: [340, 490], q: "Is it small enough to model?", a: "share by place value", col: "#FA7E19" }
  ];
  let y = 116;
  stages.forEach(function (s) {
    const a = D.at(f, s.p[0], s.p[1]);
    if (a <= 0) { y += 74; return; }
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, 76, y - 24, W - 152, 54, 9);
    ctx.strokeStyle = s.col; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, s.q, W / 2 - 60, y + 2, { size: 14, col: "#EAF4F2", font: "marker", alpha: a });
    D.txt(ctx, s.a, W / 2 + 190, y + 2, { size: 13.5, col: s.col, font: "marker", alpha: a });
    y += 74;
  });
  const p4 = D.at(f, 520, 680);
  if (p4 > 0) {
    const yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "and whichever you choose \u2014 estimate first",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 560, 650) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 600, 700), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport59 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "48 \u00f7 8 = 6", W / 2, 30, { size: 19, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "4,800 is 48 hundreds", W / 2, 58, { size: 13, col: "#C9A227", font: "marker" });
  D.txt(ctx, "so the answer is 6 hundreds", W / 2, 82,
    { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const LESSON = {
  code: "5-9",
  storageKey: "daf-g4-t5-l9",
  title: "Choose a Strategy to Divide",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-9 · 4.NBT.B.6",
  math: M,
  ixl: ["GE8", "DKK", "2UB"],

  metas: [
    { phase: "warmup", title: "Three jobs at the <em>gate</em>",
      lead: "2,400 ÷ 6, 738 ÷ 6 and 52 ÷ 4 wait at the gate — one barely needs any work at all.",
      goal: "Notice the numbers invite different strategies.",
      pull: "Would I do them the same way?",
      rail: { launch: "Fictional frame. Read the three jobs — no working yet.",
        monitor: ["Noticing the zeros in 2,400", "Noticing 738 is the biggest", "Noticing 52 is small"],
        connect: "Which job looks easiest, and why?",
        misconception: "Using one method for everything, out of habit." } },

    { phase: "launch", title: "Estimate <em>738 ÷ 6</em> first",
      lead: "The middle job needs an estimate before any method is chosen — 6 × 100 = 600, so about 120.",
      goal: "Create the need — the estimate is the safety net for every method.",
      pull: "One of these three barely needs any work at all.",
      rail: { launch: "Give the estimate and the compatible number you used.",
        monitor: ["Using 600", "Saying about 120", "Comparing to the other jobs"],
        connect: "Why estimate before choosing the method?",
        misconception: "Choosing the method and estimating after the fact." } },

    { phase: "monitor", title: "Zayd matches <em>jobs to methods</em>",
      lead: "Zeros and a fact? In your head. Big with easy chunks? Partial quotients. Small? Share it.",
      goal: "Match each division to the strategy its numbers invite.",
      pull: "The feature you spot in the numbers is what picks the method.",
      rail: { launch: "Before you tap: what feature does the job have?",
        monitor: ["Spotting the zeros", "Spotting the easy chunks", "Spotting the small dividend"],
        connect: "What feature did you use to choose?",
        misconception: "Picking the method before reading the numbers." } },

    { phase: "monitor", title: "The <em>estimate gate</em>",
      lead: "Three answers walk in. The estimate lets the disasters out and the reasonable ones through.",
      goal: "Whatever the method, an estimate catches the disasters.",
      pull: "Whatever method you choose, an estimate catches the disasters.",
      rail: { launch: "Before the gate: which answers survive?",
        monitor: ["Checking each answer against the estimate", "Flagging the place-value slip", "Letting the reasonable ones through"],
        connect: "What would the estimate have caught?",
        misconception: "Trusting the method's answer without a check." } },

    { phase: "monitor", title: "Sort the <em>jobs</em>",
      lead: "Three more jobs at the gate. Each one invites exactly one strategy.",
      goal: "Choose the division strategy the numbers invite.",
      pull: "Read the numbers before you pick a method.",
      rail: { launch: "Say the feature before you place the job.",
        monitor: ["Sending 3,600 ÷ 9 to mental math", "Sending 894 ÷ 6 to chunks", "Sending 64 ÷ 4 to sharing"],
        connect: "Which feature decided each choice?",
        misconception: "Sorting by the size of the numbers only." } },

    { phase: "connect", title: "Aisha <em>chunks</em>. Talal <em>shares</em>",
      lead: "Aisha: 100, then 20, then 3. Talal: hundreds, tens, ones. Both get 123 — and both check against the estimate.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing chunk choices", "Comparing fixed order", "Checking both use the estimate"],
        connect: "When does chunk-choice beat fixed order?",
        misconception: "Believing one strategy is the best for every job." } },

    { phase: "synth", title: "On the <em>board</em>: read the numbers first",
      lead: "Zeros and a fact? Head. Big with easy chunks? Chunks. Small? Share it. Always estimate first.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the feature", "Choosing the method", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting the estimate when the method is familiar." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "The method serves the numbers, not the other way round.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the feature", "Choosing the method", "Checking with the estimate"],
        connect: "Which method would you pick for 4,800 ÷ 8, and why?",
        misconception: "Answering 60 — the method was right, the place was not." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "4,800 ÷ 8 — the method first, then the answer.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say the feature, the method, the answer.",
        monitor: ["Spotting the zeros", "Choosing mental math", "Keeping the hundreds place"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 600 — the place kept was wrong." } },

    { phase: "connect", title: "The gate is <em>staffed</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the dispatch board — the full allocation, and two districts with competing reports.",
      rail: { launch: "Ask three students to say a feature, a method, a check.",
        monitor: ["Able to explain the choice", "Still uses one method always", "Ready for the dispatch board"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [id, setId] = useState("mental");
    const [on, setOn] = useState(false);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Three jobs at the gate"
            text="2,400 ÷ 6, 738 ÷ 6 and 52 ÷ 4 wait at the gate. One of them barely needs any work at all."
            clue="The numbers invite different strategies.">
            <NoticeWonder draw={drawThreeJobs} height={252} award={award}
              notices={["2,400 has zeros", "738 is the biggest", "52 is small", "They all divide by a single digit"]}
              wonders={["Would I do them the same way?", "Which is quickest?", "Is there a rule for choosing?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the method"
            text="Omar sets the gate's first rule: estimate the middle job before any method is chosen."
            clue="6 × 100 = 600, so 738 ÷ 6 is about 120.">
            <LaunchEstimate draw={drawThreeJobs} height={252} award={award}
              label="Estimate 738 ÷ 6" min={50} max={300} start={120} unit=""
              after="Locked. Now let us match each job to a method."
              note="The job counts are simulated — the choosing works on any division." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd matches jobs to methods"
            text="He can open any job — the class must name the feature that picks its method."
            clue="The feature you spot in the numbers is what picks the method.">
            <ExploreChips draw={makeChooser59(id)} height={252}
              label="Tap a division"
              value={id}
              onPick={(v) => setId(v)}
              chips={CASES.map((c) => ({ v: c.id, label: c.label }))}
              caption={<MathEl omml={id === "mental" ? M.mental : id === "chunk" ? M.chunk : M.share} size="lg" display="block" />}
              footnote="The feature you spot in the numbers is what picks the method." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar runs the estimate gate"
            text="Three answers walk in. The estimate lets the disasters out and the reasonable ones through."
            clue="Whatever the method, an estimate catches the disasters.">
            <ExploreChips draw={makeEstimateGate(on)} height={252}
              label="Which answers survive an estimate?"
              value={on ? 1 : 0}
              onPick={(v) => setOn(v === 1)}
              chips={[{ v: 0, label: "three answers" }, { v: 1, label: "estimate first" }]}
              caption={<MathEl omml={M.estimateFirst} size="lg" display="block" />}
              footnote="Whatever method you choose, an estimate catches the disasters." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Sort the jobs"
            text="Omar and Zayd lay three more jobs on the board. Each one invites exactly one strategy."
            clue="Say the feature before you place the job.">
            <CardSort award={award} columns={3}
              items={[
                { id: "c1", text: "3,600 ÷ 9", target: "mental" },
                { id: "c2", text: "894 ÷ 6", target: "chunk" },
                { id: "c3", text: "64 ÷ 4", target: "share" }
              ]}
              targets={[
                { id: "mental", label: "mental math — a fact with zeros" },
                { id: "chunk", label: "partial quotients" },
                { id: "share", label: "share by place value" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 123"
            text="Aisha chooses chunks — 100, then 20, then 3. Talal follows the places. Both check against the estimate."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Aisha's way — chunks", omml: M.chunk, h: 92,
                      quote: "I took out 100 groups, then 20, then 3." }}
              right={{ name: "Talal's way — place by place", omml: M.share, h: 92,
                       quote: "Hundreds, then tens, then ones." }}
              same={["Both get 123", "Both work from the biggest units", "Both check against an estimate"]}
              diff={["Aisha chooses her chunks", "Talal follows a fixed order",
                     "Aisha finishes in fewer steps when she spots a big chunk"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The choosing is drawn, not declared"
            text="Zayd builds only what the class can justify: the feature named, the method chosen, the estimate held behind it."
            clue="Read the numbers before you pick a method.">
            <BoardScreen draw={drawBoard59} height={430}
              caption="Read the numbers before you pick a method." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The method serves the numbers, not the other way round."
            clue="The estimate is the safety net for every method.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "read the numbers before you pick a method" }]}
              hand={"zeros and a fact? in your head · big with easy chunks? partial quotients · small? share it · always estimate first"}
              cards={[
                { title: "The easy one", omml: M.mental, note: "2,400 ÷ 6 needs no working at all" },
                { title: "Tap for the safety net", omml: M.chunk, revealOmml: M.estimateFirst, reveal: true,
                  note: "every method needs an estimate behind it" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the gate log"
            text="4,800 ÷ 8. Say the feature — then the method — then the answer."
            clue="48 hundreds ÷ 8 is 6 hundreds.">
            <ShowWhatYouKnow award={award}
              prompt="What is 4,800 ÷ 8?"
              omml={M.swyk}
              options={[{ v: "a", text: "60" }, { v: "b", text: "600" }, { v: "c", text: "6,000" }, { v: "d", text: "6" }]}
              right="b"
              support={{
                yes: "Yes — 48 ÷ 8 = 6, and 48 hundreds shared by 8 is 6 hundreds.",
                notYet: "Not yet — this one is a basic fact with zeros. No long working needed.",
                draw: drawSupport59, h: 96,
                hint: "4,800 is 48 hundreds. What is 48 ÷ 8?"
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The gate is staffed"
            text="Omar signs the gate log: every job matched to its method, every answer checked by estimate. The last board of the caravan is the dispatch board itself — the full allocation, and two districts already arguing about what it means."
            artifact="Caravan schedule · strategies chosen"
            next="The dispatch board: the full allocation — and two districts with competing impact reports.">
            <Closing game={game} omml={M.rule}
              action="Pick any division at home, say which strategy it deserves, estimate, then do it." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
