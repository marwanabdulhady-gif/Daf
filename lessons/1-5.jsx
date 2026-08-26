/* ===========================================================================
   SAVVAS enVision Mathematics · Grade 4 · Topic 1
   LESSON 1-5 · Problem Solving: Construct Arguments   Standard: MP.3
   I can ... construct a math argument about place value, and critique the
            reasoning of others.
   Story beat: "The seal of the first folio" — both teams at the council table.
   =========================================================================== */

const M = {
  pair: om(mt("4,697,000"), mnor(" and "), mt("4,679,000")),
  diff: om(mt("4,697,000−4,679,000=18,000")),
  decide: om(mt("90,000>70,000")),
  conclusion: om(mt("4,697,000>4,679,000")),
  sameStart: om(mnor("both have "), mt("7"), mnor(" digits")),
  goodArgument: om(mnor("claim"), mt("+"), mnor("evidence"), mt("+"), mnor("conclusion"))
};

/* ---- lesson-specific drawings ------------------------------------------- */

/* Council table: two statement cards and the seal of Folio 1 */
const drawCouncil = (ctx, W, H, frame) => {
  const f = frame % 1100;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  /* the table */
  const pT = D.at(f, 0, 140);
  ctx.save();
  ctx.globalAlpha = pT;
  D.rr(ctx, W / 2 - 110, H - 52, 220, 26, 6);
  ctx.fillStyle = "rgba(201,162,39,.25)"; ctx.fill();
  ctx.strokeStyle = "rgba(201,162,39,.6)"; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.restore();
  D.txt(ctx, "THE COUNCIL TABLE", W / 2, H - 37, { size: 10, col: "#C9A227", font: "mono", weight: 700, alpha: pT });

  const cards = [
    { who: "TEAM A", num: "4,697,000", col: "#388C46", x: 16, a: D.at(f, 120, 340) },
    { who: "TEAM B", num: "4,679,000", col: "#2D70B3", x: W / 2 + 8, a: D.at(f, 240, 460) }
  ];
  const cw = W / 2 - 30;
  cards.forEach((c) => {
    if (c.a <= 0) return;
    ctx.save();
    ctx.globalAlpha = c.a;
    D.rr(ctx, c.x, 36, cw, 118, 12);
    ctx.fillStyle = "rgba(255,255,255,.05)"; ctx.fill();
    ctx.strokeStyle = c.col; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, c.who + " defends", c.x + cw / 2, 60, { size: 11, col: c.col, font: "mono", weight: 700, alpha: c.a });
    D.txt(ctx, c.num, c.x + cw / 2, 100, { size: 27, col: "#EAF4F2", font: "marker", alpha: c.a });
    D.txt(ctx, "“this is the restored line”", c.x + cw / 2, 136, { size: 11, col: "rgba(234,244,242,.6)", font: "marker", alpha: c.a });
  });
  /* the seal waits at the top */
  const pS = D.at(f, 520, 760);
  if (pS > 0) {
    D.star8(ctx, W / 2, 186, 15 + pS * 2, pS, "rgba(201,162,39," + (0.35 + pS * 0.5) + ")", 1.8);
    D.txt(ctx, "the seal of Folio 1 waits for an argument — not a volume", W / 2, H - 12,
      { size: 12, col: "#C9A227", font: "marker", alpha: pS });
  }
};

/* Scan the two census lines place by place */
const makeCensusScan = (step, onScan) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = "4697000", b = "4679000";
  const cw = Math.min(50, (W - 80) / 7), x0 = W / 2 - (7 * cw) / 2;
  const yA = 74, yB = 130;
  const names = ["millions", "hundred\\nthousands", "ten\\nthousands", "thousands", "hundreds", "tens", "ones"];
  for (let i = 0; i < 7; i++) {
    const cx = x0 + i * cw + cw / 2;
    if (onScan) D.tap(ctx, { x: x0 + i * cw, y: yA - 24, w: cw, h: (yB - yA) + 48, value: i, on: onScan });
    const scanned = i < step;
    const active = i === step;
    const dim = i > step;
    const col = dim ? "rgba(234,244,242,.28)" : scanned ? "rgba(234,244,242,.62)" : "#EAF4F2";
    if (active) {
      ctx.save();
      ctx.globalAlpha = 0.55 + Math.sin(frame / 12) * 0.3;
      D.rr(ctx, cx - cw / 2 + 2, yA - 24, cw - 4, (yB - yA) + 48, 8);
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
    }
    D.txt(ctx, a[i], cx, yA, { size: 26, col: active ? "#C9A227" : col, font: "marker" });
    D.txt(ctx, b[i], cx, yB, { size: 26, col: active ? "#C9A227" : col, font: "marker" });
    if (scanned && a[i] === b[i]) D.txt(ctx, "same", cx, yB + 30, { size: 9, col: "rgba(52,211,153,.75)", font: "mono", weight: 700 });
  }
  if (step === 2) {
    D.txt(ctx, "9 beats 7 — the argument stops here", W / 2, yB + 66, { size: 15, col: "#C9A227", font: "marker" });
    D.txt(ctx, "4,697,000 is the greater reading", W / 2, H - 20, { size: 14, col: "#34D399", font: "marker" });
  } else if (step === 1) {
    D.txt(ctx, "the hundred thousands match — keep going", W / 2, yB + 66, { size: 14, col: "#EAF4F2", font: "marker" });
  } else if (step === 0) {
    D.txt(ctx, "start at the greatest place", W / 2, yB + 66, { size: 14, col: "#EAF4F2", font: "marker" });
  } else {
    D.txt(ctx, "we already knew it at the ten thousands place", W / 2, yB + 66,
      { size: 12, col: "rgba(234,244,242,.55)", font: "marker" });
  }
};

/* The two readings subtracted — the gap the argument must account for */
const makeDiff = (pick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const p1 = D.at(frame % 500, 0, 160), p2 = D.at(frame % 500, 200, 360);
  D.txt(ctx, "4,697,000", W / 2, 66, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });
  D.txt(ctx, "− 4,679,000", W / 2, 108, { size: 30, col: "#EAF4F2", font: "marker", alpha: D.at(frame % 500, 100, 240) });
  if (p2 > 0) {
    D.marker(ctx, [[W / 2 - 90, 128], [W / 2 + 90, 128]], p2, "rgba(201,162,39,.5)", 1.8);
    D.txt(ctx, "the gap between the readings", W / 2, 152, { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: p2 });
  }
  const right = pick === 2;
  D.txt(ctx, right ? "18,000" : "the gap is " + ["180", "1,800", "18,000", "180,000"][pick],
    W / 2, 186, { size: 20, col: right ? "#34D399" : "#C9A227", font: "marker", alpha: D.at(frame % 500, 300, 420) });
  D.txt(ctx, right ? "the difference is exactly 18,000 — the argument must account for it"
                   : "which gap is the right size?", W / 2, H - 16,
    { size: 12, col: right ? "#34D399" : "#C9A227", font: "marker" });
};

/* an argument assembling from the pieces the student picks */
const makeArgument = (picked) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [
    { key: "claim", label: "Claim", text: "Team A's reading is the restored line.", col: "#6042A6" },
    { key: "numbers", label: "Numbers", text: "4,697,000 and 4,679,000", col: "#2D70B3" },
    { key: "place", label: "Place value", text: "They match until the ten-thousands place.", col: "#FA7E19" },
    { key: "compare", label: "Compare", text: "90,000 is greater than 70,000.", col: "#C9A227" },
    { key: "conclusion", label: "So", text: "4,697,000 is the greater reading.", col: "#388C46" }
  ];
  let y = 34;
  rows.forEach((r) => {
    const on = picked.indexOf(r.key) !== -1;
    ctx.save();
    ctx.globalAlpha = on ? 1 : 0.22;
    D.rr(ctx, 26, y, W - 52, 34, 8);
    ctx.fillStyle = on ? "rgba(234,244,242,.07)" : "rgba(234,244,242,.03)";
    ctx.fill();
    ctx.strokeStyle = on ? r.col : "rgba(234,244,242,.15)";
    ctx.lineWidth = on ? 1.8 : 1;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, r.label, 74, y + 17, { size: 11, col: r.col, font: "mono", weight: 700, alpha: on ? 1 : 0.3 });
    D.txt(ctx, on ? r.text : "…", W / 2 + 44, y + 17,
      { size: 13.5, col: "#EAF4F2", font: "marker", alpha: on ? 1 : 0.25 });
    y += 42;
  });
  const done = picked.length === 5;
  D.txt(ctx, done ? "that is a complete argument" : "a claim on its own is not an argument",
    W / 2, H - 16, { size: 13, col: done ? "#34D399" : "rgba(234,244,242,.55)", font: "marker" });
};

/* spot the gap in a flawed argument */
const makeCritique = (found) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "Team B's argument", W / 2, 28, { size: 13, col: "#2D70B3", font: "marker" });
  const lines = [
    { t: "Both readings have 7 digits.", ok: true },
    { t: "So they are about the same size.", ok: true },
    { t: "Ours came first in the ledger.", ok: true },
    { t: "So ours must be the original.", ok: false }
  ];
  let y = 66;
  lines.forEach((l) => {
    const flagged = found && !l.ok;
    ctx.save();
    ctx.globalAlpha = 1;
    D.rr(ctx, 30, y - 15, W - 60, 32, 7);
    ctx.fillStyle = flagged ? "rgba(199,68,64,.18)" : "rgba(234,244,242,.04)";
    ctx.fill();
    if (flagged) {
      ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.restore();
    D.txt(ctx, l.t, W / 2, y + 2, { size: 13.5, col: "#EAF4F2", font: "marker" });
    y += 42;
  });
  D.txt(ctx, found ? "the last step has no place-value evidence behind it"
                   : "which step does not follow from the one before?",
    W / 2, H - 18, { size: 13, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

/* Board: the anatomy of a good argument */
const drawBoard15 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "What makes an argument, not a guess?" });
  const stages = [
    { p: [20, 150], label: "Claim", text: "Team A's reading is the restored census line.", col: "#6042A6" },
    { p: [140, 290], label: "Evidence", text: "4,697,000 vs 4,679,000 — ten-thousands: 90,000 and 70,000", col: "#2D70B3" },
    { p: [280, 430], label: "Reason", text: "The first place that differs decides it.", col: "#FA7E19" },
    { p: [420, 570], label: "Conclusion", text: "So 4,697,000 is the greater reading (by 18,000).", col: "#388C46" }
  ];
  let y = 96;
  stages.forEach((s) => {
    const a = D.at(f, s.p[0], s.p[1]);
    if (a <= 0) { y += 74; return; }
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, 62, y - 22, W - 124, 52, 9);
    ctx.strokeStyle = s.col; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, s.label, 118, y + 3, { size: 12.5, col: s.col, font: "mono", weight: 700, alpha: a });
    D.txt(ctx, s.text, W / 2 + 52, y + 3, { size: 14, col: "#EAF4F2", font: "marker", alpha: a });
    if (y > 96) {
      D.marker(ctx, [[W / 2, y - 44], [W / 2, y - 26]], a, "rgba(201,162,39,.6)", 2);
    }
    y += 74;
  });
  const p4 = D.at(f, 560, 700);
  if (p4 > 0) {
    const yb = H - 38;
    D.txt(ctx, "numbers · place value · a conclusion that answers the question",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 620, 720), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport15 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = "4697000", b = "4679000";
  const cw = Math.min(38, (W - 40) / 7), x0 = W / 2 - (7 * cw) / 2;
  for (let i = 0; i < 7; i++) {
    const cx = x0 + i * cw + cw / 2;
    const same = a[i] === b[i];
    D.txt(ctx, a[i], cx, 24, { size: 17, col: same ? "rgba(234,244,242,.5)" : "#C9A227", font: "marker" });
    D.txt(ctx, b[i], cx, 52, { size: 17, col: same ? "rgba(234,244,242,.5)" : "#C9A227", font: "marker" });
  }
  D.txt(ctx, "ten-thousands", x0 + 2.5 * cw, 74, { size: 9.5, col: "#C9A227", font: "mono", weight: 700 });
};

/* ---- the lesson ---------------------------------------------------------- */
const LESSON = {
  code: "1-5",
  storageKey: "daf-g4-t1-l5",
  title: "Problem Solving: Construct Arguments",
  unit: "GRADE 4 · TOPIC 1 · LESSON 1-5 · MP.3",
  math: M,
  ixl: ["EFV", "XVJ"],

  metas: [
    {
      phase: "warmup",
      title: "The seal of the <em>first folio</em>",
      lead: "Two teams stand at the council table, each defending a reading of the restored census line. The seal of Folio 1 waits.",
      goal: "Notice that the two statements differ by only 18,000 — and that the seal asks for an argument.",
      pull: "Volume is not evidence.",
      rail: {
        launch: "Fictional frame. Ask only: what do the two teams claim, and what is different?",
        monitor: ["Noticing both readings are close", "Comparing digit by digit", "Asking what wins the seal"],
        connect: "What would settle a dispute this close?",
        misconception: "Thinking the louder or first team wins by default."
      }
    },
    {
      phase: "launch",
      title: "The seal needs <em>evidence, not volume</em>",
      lead: "Both readings are simulated census figures. Lock a prediction: how many places must an argument check before it decides?",
      goal: "Predict where the first difference lands before the scan.",
      pull: "A claim is the beginning of an argument, never the end.",
      rail: {
        launch: "State that both readings are simulated census data.",
        monitor: ["Predicting the deciding place", "Checking the shared 4 and 6", "Arguing from the left"],
        connect: "Why can't the council just average the two readings?",
        misconception: "Saying 'mine looks bigger' with no place-value evidence."
      }
    },
    {
      phase: "monitor",
      title: "Zayd builds the argument <em>piece by piece</em>",
      lead: "A claim alone is not an argument. Add the pieces until the structure is complete.",
      goal: "Assemble claim, numbers, place value, comparison and conclusion.",
      pull: "Each piece earns its place.",
      rail: {
        launch: "Ask which piece is missing before the next one appears.",
        monitor: ["Ordering the pieces", "Separating claim from evidence", "Naming the comparison"],
        connect: "Which piece would an argument fail without?",
        misconception: "Treating the conclusion as the whole argument."
      }
    },
    {
      phase: "monitor",
      title: "Omar scans for the <em>first difference</em>",
      lead: "Two seven-digit readings line up. Highlight the place where they first differ.",
      goal: "Find the deciding place in a close comparison.",
      pull: "Same is evidence too — it tells the argument to keep going.",
      rail: {
        launch: "Predict the deciding place before the scan confirms it.",
        monitor: ["Checking places left to right", "Saying 'same' for equal places", "Stopping at the ten thousands"],
        connect: "Why does the argument stop at the ten-thousands place?",
        misconception: "Checking the ones place first because the numbers are 'close there'."
      }
    },
    {
      phase: "monitor",
      title: "The class critiques <em>Team B's case</em>",
      lead: "Team B's argument has a gap. Find the step that does not follow from the one before.",
      goal: "Critique reasoning by locating the step with no evidence.",
      pull: "A critique names the gap — it does not just say 'no'.",
      rail: {
        launch: "Ask the class to quote the gap before flagging it.",
        monitor: ["Reading each step in order", "Testing 'came first in the ledger'", "Naming the missing evidence"],
        connect: "What would make Team B's argument complete?",
        misconception: "Rejecting the whole argument because its conclusion is wrong."
      }
    },
    {
      phase: "monitor",
      title: "Four statements need <em>labels</em>",
      lead: "The council clerk mixes up the pieces. Sort each statement into its role in an argument.",
      goal: "Identify claims, evidence and conclusions in written arguments.",
      pull: "A start is not yet evidence.",
      rail: {
        launch: "Do not grade until the class commits to all four labels.",
        monitor: ["Separating claim from conclusion", "Spotting the weak 'start'", "Quoting the evidence line"],
        connect: "Which label is hardest to spot in real life?",
        misconception: "Calling 'both have 7 digits' evidence when it only sets up the comparison."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two methods</em>",
      lead: "The boys step back. Real student strategies for arguing from numbers take the board.",
      goal: "Compare construct-first and critique-first strategies; name one in the Sijill.",
      pull: "Building and checking are two sides of the same discipline.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Ordering the build", "Hunting the gap", "Explaining when each method helps"],
        connect: "When is critique-first the better opening move?",
        misconception: "Believing critique means being negative rather than precise."
      }
    },
    {
      phase: "synth",
      title: "The anatomy of an argument <em>enters the folio</em>",
      lead: "Claim. Evidence. Reason. Conclusion — in that order, every time.",
      goal: "Build the argument structure publicly from the strategies just compared.",
      pull: "This is the same structure the council will sign.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the four parts", "Applying it to the census pair", "Checking the conclusion answers the claim"],
        connect: "Which part fails most often when people argue about numbers?",
        misconception: "Writing a conclusion that answers a different question than the claim."
      }
    },
    {
      phase: "swyk",
      title: "The council hears <em>both teams</em>",
      lead: "Team A defends 4,697,000; Team B defends 4,679,000. Which reading is supported — and what decides it?",
      goal: "Use place-value evidence to choose between two close readings.",
      pull: "A correct reading needs the deciding place, not just the answer.",
      rail: {
        launch: "Two minutes. Require the deciding place, not only an option letter.",
        monitor: ["Scanning from the greatest place", "Naming the ten-thousands place", "Saying 9 beats 7"],
        connect: "Which place decided it — and what are the values there?",
        misconception: "Choosing the reading with the 'nicer' digits instead of comparing places."
      }
    },
    {
      phase: "monitor",
      title: "The argument must account for <em>the gap</em>",
      lead: "How big is the difference between the two readings? The council wants the argument to account for it.",
      goal: "Compute and state the difference between two close large numbers.",
      pull: "A complete argument names what the winner beats the other by.",
      rail: {
        launch: "Ask for the gap before the subtraction reveals it.",
        monitor: ["Subtracting place by place", "Keeping the zeros", "Saying 18,000, not 1,800"],
        connect: "Why does the gap belong in the argument at all?",
        misconception: "Dropping a zero and reporting 1,800 as the difference."
      }
    },
    {
      phase: "monitor",
      title: "Team B's <em>last move</em>",
      lead: "Team B says: 'Our reading came first in the ledger, so it must be the original.' Find the gap.",
      goal: "Critique a reasoning error: order of appearance is not place-value evidence.",
      pull: "The gap is the difference between a statement and its evidence.",
      rail: {
        launch: "Ask the class to quote the gap in one sentence.",
        monitor: ["Testing the 'came first' step", "Distinguishing order from evidence", "Naming what the step would need"],
        connect: "What evidence would make 'came first' into a real argument?",
        misconception: "Answering the conclusion instead of examining the step that leads to it."
      }
    },
    {
      phase: "synth",
      title: "The seal is ready to <em>land</em>",
      lead: "Claim plus evidence plus conclusion — the class's argument is complete and checkable.",
      goal: "State the full argument for the restored census line before the seal lands.",
      pull: "The Sijill names the structure, not the students.",
      rail: {
        launch: "Have one student state the claim, one the evidence, one the conclusion.",
        monitor: ["Holding the four-part structure", "Quoting the deciding place", "Stating the 18,000 gap"],
        connect: "What makes this an argument rather than an opinion?",
        misconception: "Skipping the evidence and jumping from claim to conclusion."
      }
    },
    {
      phase: "swyk",
      title: "The class delivers the <em>defence</em>",
      lead: "The council asks the room, not the teams: which statement is supported, and what is the deciding evidence?",
      goal: "Construct the complete argument independently: statement, place, values, gap.",
      pull: "A defended statement earns the seal of Folio 1.",
      rail: {
        launch: "Two minutes. Require claim, evidence and conclusion in one breath.",
        monitor: ["Stating the deciding place", "Saying 90,000 beats 70,000", "Naming the 18,000 difference"],
        connect: "Which part of the argument would survive the council's toughest question?",
        misconception: "Giving only the winning number with no place-value evidence."
      }
    },
    {
      phase: "connect",
      title: "Folio one is <em>sealed</em>",
      lead: "The seal lands on a record the council can re-check. Then the council opens the budget ledger — and it is damaged.",
      goal: "Close the unit artifact and open Chapter 2 with its mathematical need.",
      pull: "Next chapter: the budget ledger audit — and the workshop that will multiply it.",
      rail: {
        launch: "Name the completed artifact, then reveal only the next chapter's need.",
        monitor: ["Explaining the argument structure", "Using the difference as evidence", "Ready for multi-digit operations"],
        connect: "Where have you had to defend a number with evidence before?",
        misconception: "Remembering the seal but not the argument structure that earned it."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [pieces, setPieces] = useState(0);
    const [scan, setScan] = useState(0);
    const [gap, setGap] = useState(0);
    const [critique, setCritique] = useState(0);
    const allKeys = ["claim", "numbers", "place", "compare", "conclusion"];

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The seal of the first folio"
            text="Two teams stand at the council table. Each defends a reading of the restored census line. The seal of Folio 1 waits — it lands on an argument, not on volume."
            clue="The two readings differ by only 18,000">
            <NoticeWonder draw={drawCouncil} height={238} award={award}
              notices={["Two teams, one table", "Two different readings", "The numbers are very close", "The seal is still unlanded"]}
              wonders={["What settles a dispute this close?", "Is a claim enough to win?", "What would the council demand?"]}
              footnote="The story sets the stakes. The argument is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The seal needs evidence, not volume"
            text="Omar marks both readings as simulated census data — then asks how far an argument must scan before it decides."
            clue="Lock a prediction before the scan moves">
            <LaunchEstimate draw={drawCouncil} height={235} award={award}
              label="How many places must we check before 4,697,000 and 4,679,000 settle?"
              min={1} max={7} start={3} unit="places"
              after="Locked. Now build the argument and see where the evidence lands."
              note="Both readings are simulated census data — the argument works on any close pair." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds the argument piece by piece"
            text="A claim alone is not an argument. Add the pieces until the structure is complete — the folio shows what is still missing."
            clue="Each piece earns its place">
            <ExploreChips draw={makeArgument(allKeys.slice(0, pieces))} height={225}
              label="How many pieces does the argument have so far?"
              value={pieces}
              onPick={(v) => setPieces(v)}
              chips={[
                { v: 1, label: "claim only" },
                { v: 2, label: "+ the numbers" },
                { v: 3, label: "+ the place" },
                { v: 4, label: "+ the comparison" },
                { v: 5, label: "+ the conclusion" }
              ]}
              caption={<MathEl omml={M.goodArgument} size="lg" display="block" />}
              footnote="A claim on its own is not an argument." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar scans for the first difference"
            text="Two seven-digit readings line up. He highlights one place at a time — the class chooses where they first differ."
            clue="Same is evidence too — it says keep going">
            <ExploreChips draw={makeCensusScan(scan, setScan)} height={225}
              label="Where do the two readings first differ?"
              value={scan}
              onPick={(v) => setScan(v)}
              chips={[{ v: 0, label: "millions" }, { v: 1, label: "hundred thousands" }, { v: 2, label: "ten thousands" }, { v: 3, label: "thousands" }]}
              caption={<MathEl omml={M.decide} size="lg" display="block" />}
              footnote="The first differing place decides the comparison." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="Team B's case has a gap"
            text="Omar reads Team B's argument line by line. Zayd waits for the class to find the step that does not follow."
            clue="A critique names the gap — it does not just say no">
            <ExploreChips draw={makeCritique(critique === 1)} height={225}
              label="Which step has no evidence behind it?"
              value={critique}
              onPick={(v) => setCritique(v)}
              chips={[{ v: 0, label: "reading the steps…" }, { v: 1, label: "the last step — 'came first' " }]}
              caption={<MathEl omml={M.sameStart} size="md" display="block" />}
              footnote="Both readings have 7 digits — that sets up the comparison; it does not win it." />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The clerk mixed up the pieces"
            text="Four statements from the hearing, shuffled. Sort each into its role before the folio checks."
            clue="A start is not yet evidence">
            <CardSort award={award} columns={2} commitLabel="Label the four statements"
              items={[
                { id: "s1", text: "My city is bigger.", target: "t1" },
                { id: "s2", text: "13,637 and 13,533 match until the hundreds, and 600 beats 500.", target: "t2" },
                { id: "s3", text: "So 13,637 is the greater number.", target: "t3" },
                { id: "s4", text: "Both numbers have 5 digits.", target: "t4" }
              ]}
              targets={[
                { id: "t1", label: "Claim" },
                { id: "t2", label: "Evidence" },
                { id: "t3", label: "Conclusion" },
                { id: "t4", label: "A start (not evidence)" }
              ]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest argument strategies now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="Building and checking are two sides of the same discipline">
          <CompareConnect award={award}
            left={{
              name: "Aya's way — build in order", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 500, 0, 160);
                D.txt(ctx, "claim → numbers → place", W / 2, H / 2 - 22, { size: 15, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "→ compare → conclusion", W / 2, H / 2 + 6, { size: 15, col: "#EAF4F2", font: "marker", alpha: D.at(frame % 500, 120, 260) });
                D.txt(ctx, "every piece before the seal", W / 2, H / 2 + 34, { size: 12, col: "#C9A227", font: "marker", alpha: D.at(frame % 500, 240, 360) });
              },
              quote: "I build it in order, so nothing is missing when I speak."
            }}
            right={{
              name: "Musa's way — hunt the gap first", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 500, 0, 160);
                D.txt(ctx, "read every step in order", W / 2, H / 2 - 22, { size: 15, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "ask: what evidence backs this step?", W / 2, H / 2 + 6, { size: 13, col: "#2D70B3", font: "marker", alpha: D.at(frame % 500, 140, 280) });
                D.txt(ctx, "flag the step with none", W / 2, H / 2 + 34, { size: 12, col: "#C9A227", font: "marker", alpha: D.at(frame % 500, 260, 380) });
              },
              quote: "I check the opponent's case first — the gap tells me what my argument must include."
            }}
            same={["Both use claim, evidence, conclusion",
                   "Both rely on place-value evidence",
                   "Both can be checked by a third person"]}
            diff={["Aya opens by building, Musa opens by testing",
                   "Musa needs a case to examine first",
                   "Aya's order is the one the council signs"]} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build" support="hafizah"
            title="The argument's anatomy is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Claim · Evidence · Reason · Conclusion">
            <BoardScreen draw={drawBoard15} height={380}
              caption="The argument structure — not a louder voice — earns the seal." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The council hears both teams"
            text="Team A defends 4,697,000; Team B defends 4,679,000. Name the supported reading — and the place that decides it."
            clue="The deciding place is the ten-thousands">
            <ShowWhatYouKnow award={award}
              prompt="Which reading of the census line is supported by the place-value evidence?"
              options={[{ v: "a", text: "4,697,000" }, { v: "b", text: "4,679,000" }, { v: "c", text: "They are equal" }, { v: "d", text: "Cannot be compared" }]}
              right="a"
              support={{
                yes: "Yes — the ten-thousands places differ first: 90,000 beats 70,000, so 4,697,000 is greater.",
                notYet: "Not yet — scan from the greatest place and find the first place that differs.",
                draw: drawSupport15, h: 84,
                hint: "The millions and hundred-thousands match. Keep going."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The argument must account for the gap"
            text="The council asks how much larger the winning reading is. The gap must belong in the argument."
            clue="Subtract place by place — the zeros matter">
            <ExploreChips draw={makeDiff(gap)} height={225}
              label="How big is the gap between the two readings?"
              value={gap}
              onPick={(v) => setGap(v)}
              chips={[{ v: 0, label: "180" }, { v: 1, label: "1,800" }, { v: 2, label: "18,000" }, { v: 3, label: "180,000" }]}
              caption={<MathEl omml={M.diff} size="lg" display="block" />}
              footnote="A complete argument names what the winner beats the other by." />
          </StoryShell>
        );

      case 10:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Team B's last move"
            text="Team B: “Our reading came first in the ledger, so it must be the original.” Omar asks the class to find the gap."
            clue="Order in a ledger is not place-value evidence">
            <ShowWhatYouKnow award={award}
              prompt="What is the gap in Team B's argument?"
              options={[
                { v: "a", text: "Ledger order is not evidence about which number is greater" },
                { v: "b", text: "The ledger is too old to trust" },
                { v: "c", text: "7 is actually bigger than 9" },
                { v: "d", text: "Both readings are equal" }
              ]}
              right="a"
              support={{
                yes: "Yes — 'came first' says nothing about place value. The argument skips the evidence step.",
                notYet: "Not yet — read each step and ask what evidence backs it.",
                draw: makeCritique(true), h: 84,
                hint: "The last step has no place-value evidence behind it."
              }} />
          </StoryShell>
        );

      case 11:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The seal is ready to land"
            text="Claim plus evidence plus conclusion — the class's argument is complete and checkable. State it before the seal lands."
            clue="The Sijill names the structure, not the students">
            <RuleScreen award={award}
              ommls={[{ omml: M.conclusion, alt: "4,697,000 is greater than 4,679,000" },
                      { omml: M.diff, alt: "the difference is 18,000" }]}
              hand={"claim + evidence + conclusion — in that order"}
              cards={[
                { title: "The deciding place", omml: M.decide, note: "ten-thousands: 9 beats 7" },
                { title: "The gap", omml: M.diff, note: "the argument accounts for 18,000" }
              ]} />
          </StoryShell>
        );

      case 12:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The class delivers the defence"
            text="The council asks the room: which statement is supported, and what is the deciding evidence?"
            clue="One breath: statement, place, values, gap">
            <ShowWhatYouKnow award={award}
              prompt="Deliver the defence: which statement is supported — and with what deciding evidence?"
              options={[
                { v: "a", text: "4,697,000 — ten-thousands: 90,000 beats 70,000, a gap of 18,000" },
                { v: "b", text: "4,679,000 — it has a 7 in the ten-thousands" },
                { v: "c", text: "Both — the difference is too small to matter" },
                { v: "d", text: "Neither — seven-digit numbers cannot be compared" }
              ]}
              right="a"
              support={{
                yes: "Yes — claim, evidence (the first differing place), conclusion, and the gap. That is an argument.",
                notYet: "Not yet — a complete defence states the place, the values there, and the gap.",
                draw: drawSupport15, h: 84,
                hint: "Same structure the folio just drew: claim, evidence, conclusion."
              }} />
          </StoryShell>
        );

      case 13:
        return (
          <StoryHandoff support="hafizah"
            title="Folio one is sealed"
            text="The seal lands on a record the council can re-check. Then the council opens the budget ledger — and it is damaged. The recovered population is much larger than expected, and services cannot be planned until the ledger is audited."
            artifact="Population and services brief · completed census folio with place-value key"
            next="The damaged budget ledger — audit it, or the council cannot plan a single service.">
            <Closing game={game} omml={M.conclusion}
              action="Write your own argument about a comparison from this unit: claim, evidence, conclusion — and the place that decided it." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
