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

const LESSON = {
  code: "5-4",
  storageKey: "daf-g4-t5-l4",
  title: "Interpret Remainders",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-4 · 4.OA.A.3",
  math: M,
  ixl: ["7BS", "PYQ", "5WV"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Thirty-eight students, and teams of four. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Two of them are a different colour. That is not decoration.",
      rail: { launch: "I am not asking how many teams. Just look at the picture.",
        monitor: ["Counting in fours", "Spotting the two gold figures", "Estimating the teams"],
        connect: "Who noticed something nobody else did?",
        misconception: "Assuming everything must divide evenly." } },

    { phase: "launch", title: "What about the <em>last two</em>?",
      lead: "38 students, teams of 4. The division does not come out exactly.",
      goal: "Create the need — the leftover needs a decision, not just a number.",
      pull: "Estimate the teams, then we will deal with the leftovers.",
      rail: { launch: "How many teams? And then — what about the two left standing?",
        monitor: ["Saying 9 remainder 2", "Saying 9 and a half", "Arguing about the last two"],
        connect: "Does the maths tell you what to do with them?",
        misconception: "Writing 9.5 teams." } },

    { phase: "monitor", title: "Deal them <em>out</em>",
      lead: "One at a time, into four groups. Watch what is left at the end.",
      goal: "See the remainder physically before naming it.",
      pull: "The same 9 remainder 2 can mean three different things.",
      rail: { launch: "Predict how many each group will get.",
        monitor: ["Dealing evenly", "Counting each group", "Noticing the two that cannot go"],
        connect: "Why can the last two not be shared?",
        misconception: "Putting the last two in one group to make it fair-ish." } },

    { phase: "monitor", title: "Three <em>questions</em>, three answers",
      lead: "Same numbers. Same division. The question decides the answer.",
      goal: "Drop it, round up, or report it — the story chooses.",
      pull: "Now sort some questions by what they need.",
      rail: { launch: "Read each question out loud before you tap.",
        monitor: ["Matching question to action", "Always answering 9", "Explaining the car question"],
        connect: "Which question needed the answer to go UP?",
        misconception: "Giving the same answer to all three questions." } },

    { phase: "monitor", title: "What does the <em>remainder</em> mean here?",
      lead: "Sort each question. No grading until the class commits.",
      goal: "Apply the decision to unfamiliar stories.",
      pull: "Two students answered the same problem differently — and both were right.",
      rail: { launch: "Ask: does everyone still need to be carried?",
        monitor: ["Reading the question carefully", "Answering by habit", "Explaining their choice"],
        connect: "Which word in the question gave it away?",
        misconception: "Deciding by the numbers instead of by the story." } },

    { phase: "connect", title: "Two <em>right</em> answers",
      lead: "Sana said 9. Ibrahim said 10. Neither made a mistake.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Defending 9", "Defending 10", "Noticing they answered different questions"],
        connect: "What question was each of them answering?",
        misconception: "Believing one of them must be wrong." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One division. Three questions. Drop it, round up, or report it.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next row", "Naming the action", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Learning three rules instead of one habit — read the question." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the three actions", "Testing on a new story", "Checking with 9 × 4 + 2"],
        connect: "How can you check a division with a remainder?",
        misconception: "Forgetting the remainder when checking by multiplying back." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Divide, then read the question again.",
        monitor: ["Getting 8 r 2", "Rounding up to 9", "Answering 8"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 8 and leaving two guests standing." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: dividing bigger numbers, one chunk at a time.",
      rail: { launch: "Ask three students what they do with a remainder.",
        monitor: ["Able to explain all three actions", "Still answers by habit", "Ready for partial quotients"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [dealt, setDealt] = useState(12);
    const [kind, setKind] = useState("drop");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawSportsDay} height={256} award={award}
          notices={["There are 38 students", "Teams of 4", "Two are a different colour", "It will not come out evenly"]}
          wonders={["How many teams?", "What happens to the last two?", "Can a team have 5?"]} />;

      case 1:
        return <LaunchEstimate draw={drawSportsDay} height={256} award={award}
          label="How many full teams of 4?" min={4} max={16} start={9} unit="teams"
          after="Locked. Now let us deal them out and see."
          note="The division will not come out exactly. That is the whole lesson." />;

      case 2:
        return <ExploreChips draw={makeShare54(dealt)} height={256}
          label="Deal the students out"
          value={dealt}
          onPick={(v) => setDealt(v)}
          chips={[{ v: 12, label: "12 dealt" }, { v: 24, label: "24 dealt" }, { v: 36, label: "36 dealt" }, { v: 38, label: "all 38" }]}
          caption={<MathEl omml={M.problem} size="xl" display="block" />}
          footnote="Nine in each group, and two that cannot be shared." />;

      case 3:
        return <ExploreChips draw={makeInterpret(kind)} height={258}
          label="Change the question"
          value={kind}
          onPick={(v) => setKind(v)}
          chips={[{ v: "drop", label: "full teams?" }, { v: "up", label: "cars needed?" }, { v: "rem", label: "left over?" }]}
          caption={<MathEl omml={kind === "drop" ? M.quotient : kind === "up" ? M.roundUp : M.remainder} size="lg" display="block" />}
          footnote="The numbers never changed. Only the question did." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[
            { id: "k1", text: "How many full boxes of 4?", target: "drop" },
            { id: "k2", text: "How many boxes to hold them all?", target: "up" },
            { id: "k3", text: "How many will not fit in a full box?", target: "rem" }
          ]}
          targets={[
            { id: "drop", label: "drop the remainder" },
            { id: "up", label: "round the quotient up" },
            { id: "rem", label: "the remainder is the answer" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Sana said 9", omml: M.quotient, h: 92,
                  quote: "Only 9 teams are complete, so the answer is 9." }}
          right={{ name: "Ibrahim said 10", omml: M.roundUp, h: 92,
                   quote: "Every student needs a car, so we need 10." }}
          same={["Both divided 38 by 4", "Both got 9 remainder 2", "Both used the remainder"]}
          diff={["Sana dropped it, Ibrahim rounded up",
                 "They answered different questions",
                 "Neither of them is wrong"]} />;

      case 6:
        return <BoardScreen draw={drawBoard54} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "the story decides what to do with the remainder" }]}
          hand={"divide \u00b7 then read the question again \u00b7 drop it, round up, or report it"}
          cards={[
            { title: "The division we did", omml: M.problem, note: "9 in each group, 2 left over" },
            { title: "Tap to check it", omml: M.remainder, revealOmml: M.check, reveal: true,
              note: "multiply back and add the remainder" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="50 guests are seated at tables of 6. How many tables are needed so everyone has a seat?"
          omml={M.swyk}
          options={[{ v: "a", text: "8" }, { v: "b", text: "9" }, { v: "c", text: "2" }, { v: "d", text: "8 r 2" }]}
          right="b"
          support={{
            yes: "Yes — 8 full tables and 2 guests left, so a 9th table is needed.",
            notYet: "Not yet — where do the last two guests sit?",
            draw: drawSupport54, h: 92,
            hint: "8 tables seat 48. Two guests are still standing."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Share something at home that does not divide evenly, and say out loud what you did with the leftovers." />;

      default: return null;
    }
  }
};
