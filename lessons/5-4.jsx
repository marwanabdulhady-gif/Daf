/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-4 · Interpret Remainders
   Standard 4.OA.A.3 / 4.NBT.B.6   I can ... work out what the remainder means
   in the story, and answer the question that was actually asked.
   =========================================================================== */

const M = {
  problem: om(mt("38\u00f74=9 r 2")),
  quotient: om(mnor("how many full groups? \u2192 "), mt("9")),
  roundUp: om(mnor("how many needed for everyone? \u2192 "), mt("10")),
  remainder: om(mnor("how many left over? \u2192 "), mt("2")),
  check: om(mt("9\u00d74+2=38")),
  rule: om(mnor("the story decides what to do with the remainder")),
  swyk: om(mt("50\u00f76=8 r 2")),
  swykAnswer: om(mnor("9 tables are needed"))
};

/* sharing 38 into 4 groups, with the leftovers boxed */
const makeShare54 = (dealt) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.shareGroups(ctx, { total: 38, groups: 4, dealt: dealt, x: 52, y: 56, w: W - 160, h: 104, s: 11 });
  D.txt(ctx, dealt >= 38 ? "9 in each group, 2 left over" : "dealing them out one at a time",
    W / 2, 32, { size: 15, col: dealt >= 38 ? "#34D399" : "#C9A227", font: "marker" });
  D.txt(ctx, dealt >= 38 ? "the 2 cannot be shared without breaking one" : dealt + " of 38 dealt",
    W / 2, H - 14, { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

/* the same division, three different questions */
const makeInterpret = (kind) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cfg = {
    drop: { q: "How many full teams of 4?", a: "9 teams", note: "the 2 left over do not make a team",
            col: "#2D70B3", show: 9 },
    up:   { q: "How many cars to carry everyone?", a: "10 cars", note: "the last 2 still need a car",
            col: "#388C46", show: 10 },
    rem:  { q: "How many are left without a team?", a: "2 students", note: "the answer IS the remainder",
            col: "#C9A227", show: 2 }
  }[kind];

  D.txt(ctx, cfg.q, W / 2, 46, { size: 16, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "38 \u00f7 4 = 9 r 2", W / 2, 82, { size: 20, col: "rgba(234,244,242,.6)", font: "marker" });

  const n = cfg.show;
  const per = Math.min(10, n);
  for (var k = 0; k < n; k++) {
    var cx = W / 2 - (per - 1) * 21 + (k % per) * 42;
    var cy = 132 + Math.floor(k / per) * 40;
    ctx.save();
    ctx.globalAlpha = 0.9;
    D.rr(ctx, cx - 15, cy - 14, 30, 28, 5);
    ctx.fillStyle = cfg.col;
    ctx.globalAlpha = (kind === "up" && k === n - 1) ? 0.32 : 0.72;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = cfg.col;
    ctx.lineWidth = (kind === "up" && k === n - 1) ? 2 : 1.2;
    if (kind === "up" && k === n - 1) ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.restore();
  }
  D.txt(ctx, cfg.a, W / 2, H - 44, { size: 20, col: cfg.col, font: "marker" });
  D.txt(ctx, cfg.note, W / 2, H - 18, { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

const drawSportsDay = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "sports day teams", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (var k = 0; k < 38; k++) {
    var a = D.at(p2, k / 38, k / 38 + 0.25);
    if (a <= 0) continue;
    var cx = 56 + (k % 13) * ((W - 130) / 13);
    var cy = 62 + Math.floor(k / 13) * 34;
    D.fig(ctx, cx, cy + 16, k >= 36 ? "#C9A227" : "#12857C", a);
  }
  if (p3 > 0) {
    D.txt(ctx, "38 students \u00b7 teams of 4", W / 2, 172,
      { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "what happens to the last two?", W / 2, H - 16,
      { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard54 = (ctx, W, H, frame) => {
  const CYCLE = 820, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Same division, three different answers" });
  const p1 = D.at(f, 20, 160);
  D.txt(ctx, "38 \u00f7 4 = 9 r 2", W / 2, 100, { size: 28, col: "#EAF4F2", font: "marker", alpha: p1 });
  const rows = [
    { p: [170, 330], q: "How many full teams?", a: "9", note: "drop the remainder", col: "#2D70B3" },
    { p: [340, 500], q: "How many cars for everyone?", a: "10", note: "round the quotient up", col: "#388C46" },
    { p: [510, 660], q: "How many left over?", a: "2", note: "the remainder IS the answer", col: "#C9A227" }
  ];
  var y = 168;
  rows.forEach(function (r) {
    var a = D.at(f, r.p[0], r.p[1]);
    if (a <= 0) { y += 68; return; }
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, 76, y - 22, W - 152, 52, 9);
    ctx.strokeStyle = r.col; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, r.q, W / 2 - 90, y + 3, { size: 14, col: "#EAF4F2", font: "marker", alpha: a });
    D.txt(ctx, r.a, W / 2 + 120, y + 3, { size: 20, col: r.col, font: "marker", alpha: a });
    D.txt(ctx, r.note, W / 2 + 210, y + 3,
      { size: 10.5, col: "rgba(234,244,242,.55)", font: "mono", weight: 600, alpha: a });
    y += 68;
  });
  var p4 = D.at(f, 670, 800);
  if (p4 > 0) {
    D.txt(ctx, "read the question again before you write the answer",
      W / 2, H - 32, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 46, H - 34, 16, D.at(f, 710, 810), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport54 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.shareGroups(ctx, { total: 50, groups: 6, dealt: 50, x: 34, y: 16, w: W - 110, h: 52, s: 7 });
  D.txt(ctx, "8 at each table, 2 still standing", W / 2, H - 10,
    { size: 12, col: "#C9A227", font: "marker" });
};


/* the passengers left at the gate: one division, three honest endings */
const makeGate54 = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onStep((step + 1) % 4) });
  D.txt(ctx, "38 students · the cars seat 4", W / 2, 30, { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker" });
  /* nine full cars of four, plus two waiting */
  for (let c = 0; c < 9; c++) {
    const x = 52 + (c % 9) * ((W - 104) / 9) + 6;
    const on = step >= 1;
    ctx.save();
    ctx.globalAlpha = on ? 1 : 0.3;
    D.rr(ctx, x, 66, (W - 104) / 9 - 12, 40, 6);
    ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.8; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "4", x + (W - 104) / 18 - 6, 86, { size: 13, col: "#EAF4F2", font: "marker", alpha: on ? 1 : 0.3 });
  }
  /* the two who cannot be shared */
  const waitX = W / 2 - 14;
  for (let p = 0; p < 2; p++) {
    ctx.save();
    ctx.globalAlpha = step >= 1 ? 1 : 0.35;
    ctx.beginPath(); ctx.arc(waitX + p * 26, 140, 9, 0, Math.PI * 2);
    ctx.fillStyle = "#FA7E19"; ctx.fill();
    ctx.restore();
  }
  const endings = [
    { t: "the gate asks: what happens to the last two?", col: "rgba(234,244,242,.6)" },
    { t: "drop: 9 full cars — the answer to 'how many full cars?'", col: "#EAF4F2" },
    { t: "round up: 10 cars — the answer to 'so everyone rides?'", col: "#34D399" },
    { t: "report: 2 left over — the remainder, named and kept", col: "#C9A227" }
  ];
  D.txt(ctx, endings[step].t, W / 2, H - 20, { size: 13.5, col: endings[step].col, font: "marker" });
};

const LESSON = {
  code: "5-4",
  storageKey: "daf-g4-t5-l4",
  title: "Interpret Remainders",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-4 · 4.OA.A.3",
  math: M,
  ixl: ["7BS", "PYQ", "5WV"],

  metas: [
    { phase: "warmup", title: "The division that <em>won't close</em>",
      lead: "38 students, teams of 4. Nine teams fill, and two are still standing — a different colour, because they do not fit.",
      goal: "Notice a remainder is a number with a job to do.",
      pull: "The division will not come out exactly. That is the whole lesson.",
      rail: { launch: "Fictional frame. Look at the deal — no working yet.",
        monitor: ["Counting the full teams", "Noticing the two left over", "Wonding what happens to them"],
        connect: "What are the last two for?",
        misconception: "Thinking a remainder means the division was done wrong." } },

    { phase: "launch", title: "How many <em>full teams</em> of 4?",
      lead: "38 ÷ 4. Lock the number of complete teams before the leftovers are decided.",
      goal: "Create the need — the quotient and the remainder answer different questions.",
      pull: "Nine in each group, and two that cannot be shared.",
      rail: { launch: "Give the full-team count and say what you are ignoring.",
        monitor: ["Counting full groups", "Estimating first", "Asking about the leftovers"],
        connect: "What does 9 r 2 actually tell you?",
        misconception: "Reading the remainder as an error to erase." } },

    { phase: "monitor", title: "Zayd deals them <em>out</em>",
      lead: "Twelve, twenty-four, thirty-six, all 38 — the deal shows the nine in each group and the two that stop.",
      goal: "See the quotient and the remainder in the same picture.",
      pull: "Nine in each group, and two that cannot be shared.",
      rail: { launch: "Predict the leftovers before the deal finishes.",
        monitor: ["Counting full groups", "Naming the remainder", "Checking 9 × 4 + 2"],
        connect: "Why do exactly two stop?",
        misconception: "Dealing the last two into a tenth group of four." } },

    { phase: "monitor", title: "The numbers never changed — <em>the question did</em>",
      lead: "Full teams? Cars needed? Left over? The same 38 ÷ 4 answers all three — differently.",
      goal: "Change the question and the remainder's meaning changes with it.",
      pull: "The numbers never changed. Only the question did.",
      rail: { launch: "Before you tap: what is the question asking for?",
        monitor: ["Dropping the remainder", "Rounding the quotient up", "Reporting the remainder"],
        connect: "How did the answer change without the numbers changing?",
        misconception: "Believing one division has only one answer." } },

    { phase: "monitor", title: "What is the remainder <em>for</em>?",
      lead: "Three honest endings for one division: drop it, round up, or report it. The story decides.",
      goal: "Interpret the remainder as another group, leftovers, or an incomplete group.",
      pull: "The story decides what to do with the remainder.",
      rail: { launch: "Before you tap: which question is the gate asking?",
        monitor: ["Naming the ending", "Justifying it with the story", "Checking the arithmetic"],
        connect: "Which ending would be wrong for this story, and why?",
        misconception: "Always rounding the quotient up, whatever the story." } },

    { phase: "monitor", title: "Sort the <em>questions</em>",
      lead: "Three box questions. Each one needs a different ending for its remainder.",
      goal: "Match questions to remainder interpretations.",
      pull: "Do I already know what the leftover is for?",
      rail: { launch: "Say the ending before you place the question.",
        monitor: ["Spotting the full-box question", "Spotting the hold-them-all question", "Spotting the leftovers question"],
        connect: "What made each question different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "connect", title: "Sana said <em>9</em>. Ibrahim said <em>10</em>",
      lead: "Sana dropped the remainder. Ibrahim rounded up. They answered different questions — neither is wrong.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Naming the question each answered", "Checking both divided 38 by 4", "Saying which story needs which"],
        connect: "Which question did the gate actually ask?",
        misconception: "Believing the longer answer is the better one." } },

    { phase: "synth", title: "On the <em>board</em>: the story decides",
      lead: "Divide. Then read the question again. Drop the remainder, round up, or report it — on purpose.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Re-reading the question", "Naming the ending", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Answering 9 r 2 as if it were a final answer." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One division, three honest endings. The question chooses.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the ending", "Checking with the story", "Testing on a new problem"],
        connect: "Which ending is the hardest to get right?",
        misconception: "Rounding up when the story asks for full groups." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "50 guests, tables of 6. How many tables so everyone has a seat?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say the question before the arithmetic.",
        monitor: ["Dividing 50 by 6", "Naming the ending", "Rounding up on purpose"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 8 — the two standing guests have no seat." } },

    { phase: "connect", title: "The gate is <em>explained</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: unload a useful chunk — take out the groups you can see.",
      rail: { launch: "Ask three students to say which ending they chose and why.",
        monitor: ["Able to explain the interpretation", "Still erases the remainder", "Ready for partial quotients"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [dealt, setDealt] = useState(12);
    const [kind, setKind] = useState("drop");
    const [gate, setGate] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The division that won't close"
            text="38 students, teams of 4. Nine teams fill, and two are still standing at the gate — a different colour, because they do not fit."
            clue="A remainder is a number with a job to do.">
            <NoticeWonder draw={drawSportsDay} height={256} award={award}
              notices={["There are 38 students", "Teams of 4", "Two are a different colour", "It will not come out evenly"]}
              wonders={["How many teams?", "What happens to the last two?", "Can a team have 5?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The full teams, before the leftovers"
            text="Omar asks the gate's first question: 38 ÷ 4 — how many complete teams, exactly?"
            clue="Nine in each group, and two that cannot be shared.">
            <LaunchEstimate draw={drawSportsDay} height={256} award={award}
              label="How many full teams of 4?" min={4} max={16} start={9} unit="teams"
              after="Locked. Now let us deal them out and see."
              note="The student count is simulated — the remainder idea works on any division." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd deals them out"
            text="He can stop the deal anywhere — the class must see the full groups and the leftovers in the same picture."
            clue="The quotient and the remainder live in the same deal.">
            <ExploreChips draw={makeShare54(dealt)} height={256}
              label="Deal the students out"
              value={dealt}
              onPick={(v) => setDealt(v)}
              chips={[{ v: 12, label: "12 dealt" }, { v: 24, label: "24 dealt" }, { v: 36, label: "36 dealt" }, { v: 38, label: "all 38" }]}
              caption={<MathEl omml={M.problem} size="xl" display="block" />}
              footnote="Nine in each group, and two that cannot be shared." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The numbers never changed — the question did"
            text="Omar changes the question at the gate, not the numbers: full teams? cars for everyone? what is left?"
            clue="One division answers three questions — differently.">
            <ExploreChips draw={makeInterpret(kind)} height={258}
              label="Change the question"
              value={kind}
              onPick={(v) => setKind(v)}
              chips={[{ v: "drop", label: "full teams?" }, { v: "up", label: "cars needed?" }, { v: "rem", label: "left over?" }]}
              caption={<MathEl omml={kind === "drop" ? M.quotient : kind === "up" ? M.roundUp : M.remainder} size="lg" display="block" />}
              footnote="The numbers never changed. Only the question did." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The passengers left at the gate"
            text="Zayd builds the gate scene: nine full cars, two waiting. Each honest ending is a different answer to a different question."
            clue="The story decides what to do with the remainder.">
            <ExploreChips draw={makeGate54(gate)} height={258}
              label="What happens at the gate?"
              value={gate}
              onPick={(v) => setGate(v)}
              chips={[{ v: 0, label: "the question" }, { v: 1, label: "drop" }, { v: 2, label: "round up" }, { v: 3, label: "report" }]}
              caption={<MathEl omml={M.rule} size="lg" display="block" />}
              footnote="Drop it, round up, or report it — on purpose, never by accident." />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Sort the questions"
            text="Omar and Zayd lay three box questions on the table. Each one needs a different ending for its remainder."
            clue="Do I already know what the leftover is for?">
            <CardSort award={award} columns={3}
              items={[
                { id: "k1", text: "How many full boxes of 4?", target: "drop" },
                { id: "k2", text: "How many boxes to hold them all?", target: "up" },
                { id: "k3", text: "How many will not fit in a full box?", target: "rem" }
              ]}
              targets={[
                { id: "drop", label: "drop the remainder" },
                { id: "up", label: "round the quotient up" },
                { id: "rem", label: "the remainder is the answer" }
              ]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, two right answers"
            text="Sana said 9 — full teams. Ibrahim said 10 — cars for everyone. Different questions, different endings."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Sana said 9", omml: M.quotient, h: 92,
                      quote: "Only 9 teams are complete, so the answer is 9." }}
              right={{ name: "Ibrahim said 10", omml: M.roundUp, h: 92,
                       quote: "Every student needs a car, so we need 10." }}
              same={["Both divided 38 by 4", "Both got 9 remainder 2", "Both used the remainder"]}
              diff={["Sana dropped it, Ibrahim rounded up",
                     "They answered different questions",
                     "Neither of them is wrong"]} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The story decides — on the board"
            text="Zayd builds only what the class can justify: the division, the re-read question, the chosen ending."
            clue="Divide · then read the question again · drop it, round up, or report it.">
            <BoardScreen draw={drawBoard54} height={430}
              caption="The story decides what to do with the remainder." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="One division, three honest endings. The question chooses; the arithmetic obeys."
            clue="The remainder is never an error — it is a number waiting for its job.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "the story decides what to do with the remainder" }]}
              hand={"divide · then read the question again · drop it, round up, or report it"}
              cards={[
                { title: "The division we did", omml: M.problem, note: "9 in each group, 2 left over" },
                { title: "Tap to check it", omml: M.remainder, revealOmml: M.check, reveal: true,
                  note: "multiply back and add the remainder" }
              ]} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the gate report"
            text="50 guests, tables of 6. Say the question — then the ending."
            clue="The two standing guests still need a seat.">
            <ShowWhatYouKnow award={award}
              prompt="50 guests are seated at tables of 6. How many tables are needed so everyone has a seat?"
              omml={M.swyk}
              options={[{ v: "a", text: "8" }, { v: "b", text: "9" }, { v: "c", text: "2" }, { v: "d", text: "8 r 2" }]}
              right="b"
              support={{
                yes: "Yes — 8 full tables and 2 guests left, so a 9th table is needed.",
                notYet: "Not yet — where do the last two guests sit?",
                draw: drawSupport54, h: 92,
                hint: "8 tables seat 48. Two guests are still standing."
              }} />
          </StoryShell>
        );

      case 10:
        return (
          <StoryHandoff
            title="The gate is explained"
            text="Omar signs the gate report: every remainder interpreted, every ending justified. The next manifest is long — the plan is to unload in useful chunks, the groups you can see straight away."
            artifact="Caravan schedule · remainders interpreted"
            next="Unload a useful chunk — take out the groups you can see, instead of one group at a time.">
            <Closing game={game} omml={M.rule}
              action="Share something at home that does not divide evenly, and say out loud what you did with the leftovers." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
