/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-1 · Mental Math: Find Quotients
   Standard 4.NBT.B.6   I can ... use a basic fact and place value to divide
   numbers that end in zeros.
   =========================================================================== */

const M = {
  fact: om(mt("12\u00f74=3")),
  tens: om(mt("120\u00f74=30")),
  hundreds: om(mt("1,200\u00f74=300")),
  thousands: om(mt("12,000\u00f74=3,000")),
  why: om(mt("12"), mnor(" hundreds \u00f7 "), mt("4"), mnor(" = "), mt("3"), mnor(" hundreds")),
  buses: om(mt("240\u00f76=40")),
  rule: om(mnor("divide the fact \u00b7 then keep the place")),
  swyk: om(mt("3,500\u00f77")),
  swykAnswer: om(mt("35\u00f77=5"), mnor(", so "), mt("500"))
};

const STEPS = [
  { d: 12, label: "12 ÷ 4" },
  { d: 120, label: "120 ÷ 4" },
  { d: 1200, label: "1,200 ÷ 4" },
  { d: 12000, label: "12,000 ÷ 4" }
];

const makeDivLadder = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  STEPS.forEach(function (s, k) {
    var a = k < n ? 1 : 0.16;
    var live = k === n - 1;
    var y = 56 + k * 44;
    var q = s.d / 4;
    D.txt(ctx, s.label, W / 2 - 40, y, { size: 21, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 16, y, { size: 17, col: "rgba(234,244,242,.55)", font: "marker", alpha: a });
    D.txt(ctx, q.toLocaleString("en-US"), W / 2 + 78, y,
      { size: 22, col: "#34D399", font: "marker", align: "right", alpha: a });
    var zeros = String(s.d).length - 2;
    D.txt(ctx, zeros <= 0 ? "the basic fact" : zeros + " zero" + (zeros > 1 ? "s" : "") + " in both",
      W - 66, y, { size: 10.5, col: "#C9A227", font: "mono", weight: 700, align: "right", alpha: a });
    if (live) {
      ctx.save();
      ctx.globalAlpha = 0.5 + Math.sin(frame / 14) * 0.3;
      D.rr(ctx, W / 2 - 176, y - 18, 300, 36, 7);
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.8; ctx.stroke();
      ctx.restore();
    }
  });
  D.txt(ctx, n === 4 ? "the 3 never moves — the zeros travel with it"
                     : "watch the zeros on both sides",
    W / 2, H - 16, { size: 13.5, col: n === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeShareUnits = (unit) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const names = { 1: "ones", 10: "tens", 100: "hundreds" };
  const cols = { 1: "#C9A227", 10: "#2D70B3", 100: "#6042A6" };
  const base = H - 66, s = unit === 100 ? 4.4 : 7;
  for (var g = 0; g < 4; g++) {
    var gx = 60 + g * ((W - 130) / 4);
    ctx.save();
    D.rr(ctx, gx - 8, 44, (W - 150) / 4, base - 34, 8);
    ctx.strokeStyle = "rgba(234,244,242,.22)"; ctx.lineWidth = 1.3; ctx.stroke();
    ctx.restore();
    for (var k = 0; k < 3; k++) {
      if (unit === 1) D.digitBlocks(ctx, { x: gx + k * 13, y: base - s, unit: 1, prog: 1, col: cols[1], s: s });
      else if (unit === 10) D.digitBlocks(ctx, { x: gx + k * 15, y: base - s * 10, unit: 10, prog: 1, col: cols[10], s: s });
      else D.digitBlocks(ctx, { x: gx + k * 20, y: base - s * 10, unit: 100, prog: 1, col: cols[100], s: s });
    }
    D.txt(ctx, "3 " + names[unit], gx + (W - 150) / 8 - 8, base + 20,
      { size: 10.5, col: cols[unit], font: "marker" });
  }
  D.txt(ctx, "12 " + names[unit] + " shared into 4 groups", W / 2, 28,
    { size: 15, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "each group gets 3 " + names[unit] + " = " + (3 * unit).toLocaleString("en-US"),
    W / 2, H - 16, { size: 15, col: "#34D399", font: "marker" });
};

const drawBuses51 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 320), p3 = D.at(f, 330, 450);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school trip home", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (var b = 0; b < 6; b++) {
    var a = D.at(p2, b / 6, b / 6 + 0.4);
    if (a <= 0) continue;
    var bx = 40 + b * ((W - 100) / 6);
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, bx, 60, (W - 130) / 6, 44, 7);
    ctx.fillStyle = "#C9A227"; ctx.globalAlpha = a * 0.2; ctx.fill();
    ctx.globalAlpha = a; ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "?", bx + (W - 130) / 12, 84, { size: 17, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "240 students \u00b7 6 buses \u00b7 shared equally", W / 2, 136,
      { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many on each bus?", W / 2, H - 18,
      { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard51 = (ctx, W, H, frame) => {
  const CYCLE = 760, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Why do the zeros come along?" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 250, 420), p3 = D.at(f, 430, 600);
  STEPS.slice(0, 3).forEach(function (s, k) {
    var a = D.at(p1, k / 3, k / 3 + 0.5);
    if (a <= 0) return;
    D.txt(ctx, s.label + " = " + (s.d / 4).toLocaleString("en-US"), W / 2, 108 + k * 46,
      { size: 22, col: "#EAF4F2", font: "marker", alpha: a });
  });
  if (p2 > 0) {
    D.txt(ctx, "12 hundreds shared by 4 is 3 hundreds", W / 2, 262,
      { size: 16, col: "#C9A227", font: "marker", alpha: p2 });
    D.txt(ctx, "and 3 hundreds is written 300", W / 2, 292,
      { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 300, 380) });
  }
  if (p3 > 0) {
    var yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the fact does the work \u2014 the place value keeps the size",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 470, 550) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 510, 610), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport51 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "35 \u00f7 7 = 5", W / 2, 30, { size: 20, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "3,500 is 35 hundreds", W / 2, 58, { size: 13, col: "#C9A227", font: "marker" });
  D.txt(ctx, "so the answer is 5 hundreds", W / 2, 82,
    { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const LESSON = {
  code: "5-1",
  storageKey: "daf-g4-t5-l1",
  title: "Mental Math: Find Quotients",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-1 · 4.NBT.B.6",
  math: M,
  ixl: ["7FH", "2K3", "6J4"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Four divisions, stacked. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "One digit stays put the whole way down.",
      rail: { launch: "I am not asking you to work anything out. Just look down the list.",
        monitor: ["Noticing the 3", "Counting zeros on both sides", "Predicting the next line"],
        connect: "Who noticed something nobody else did?",
        misconception: "Seeing four unrelated facts instead of one pattern." } },

    { phase: "launch", title: "Two hundred and forty students, <em>six buses</em>",
      lead: "Shared equally. You already know 24 ÷ 6.",
      goal: "Create the need — a basic fact can carry a much bigger one.",
      pull: "Estimate first, then we will see why it works.",
      rail: { launch: "Nobody counts 240 students one at a time. What fact helps?",
        monitor: ["Sharing one at a time", "Using 24 ÷ 6 then adding a zero", "Thinking in tens"],
        connect: "What basic fact is hiding inside this problem?",
        misconception: "Adding a zero as a rule with no meaning behind it." } },

    { phase: "monitor", title: "Follow the <em>pattern</em>",
      lead: "Reveal one line at a time. Watch the digits and watch the zeros.",
      goal: "The basic fact stays; the place value changes.",
      pull: "But why? Share the blocks and see.",
      rail: { launch: "Predict each line before you reveal it.",
        monitor: ["Predicting correctly", "Counting zeros carefully", "Explaining in place-value words"],
        connect: "How many zeros will 120,000 ÷ 4 have?",
        misconception: "Adding zeros to the answer that were never in the dividend." } },

    { phase: "monitor", title: "Share <em>twelve of something</em>",
      lead: "Twelve ones, twelve tens, twelve hundreds. The sharing never changes.",
      goal: "The pattern is a place-value fact, not a zero trick.",
      pull: "Now match some quotients to their expressions.",
      rail: { launch: "Before you tap: how many will each group get?",
        monitor: ["Counting the blocks", "Naming the unit", "Reading 3 hundreds as 300"],
        connect: "Why is 3 hundreds written as 300?",
        misconception: "Reading 3 hundreds as 3." } },

    { phase: "monitor", title: "Match the <em>quotient</em>",
      lead: "Which division gives that answer? No grading until the class commits.",
      goal: "Read the pattern backwards.",
      pull: "Two students explained the zeros differently.",
      rail: { launch: "Look at the basic fact first, then the zeros.",
        monitor: ["Using the basic fact", "Counting zeros", "Calculating fully"],
        connect: "Which part did you check first?",
        misconception: "Matching by the number of digits." } },

    { phase: "connect", title: "Two ways to <em>say why</em>",
      lead: "Hind counts zeros. Saud thinks in hundreds. Both get 300.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Counting zeros fluently", "Naming the unit", "Using both together"],
        connect: "Whose explanation survives if you forget the rule?",
        misconception: "Believing the zero-counting shortcut is the mathematics." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "12 hundreds shared by 4 is 3 hundreds. Three hundreds is 300.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next line", "Naming the unit each time", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Memorising cross off the zeros without the unit." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the fact and the place", "Testing on a new fact", "Asking about 240 ÷ 60"],
        connect: "What happens when the divisor has zeros too?",
        misconception: "Cancelling zeros without checking there are enough on both sides." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write the basic fact first.",
        monitor: ["Writing 35 ÷ 7 first", "Counting zeros", "Guessing the size"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 50 instead of 500." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: when the numbers are not so tidy.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the blocks", "Ready to estimate"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [unit, setUnit] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeDivLadder(4)} height={256} award={award}
          notices={["The 3 is always there", "Zeros appear on both sides", "The 4 never changes", "The answers get ten times bigger"]}
          wonders={["What comes next?", "Why does the 3 stay?", "Does it work for any fact?"]} />;

      case 1:
        return <LaunchEstimate draw={drawBuses51} height={256} award={award}
          label="How many students on each bus?" min={10} max={80} start={40} unit="students"
          after="Locked. Now let us see the pattern behind it."
          note="You already know 24 ÷ 6. That fact is doing most of the work." />;

      case 2:
        return <ExploreChips draw={makeDivLadder(n)} height={256}
          label="Reveal one line at a time"
          value={n}
          onPick={(v) => setN(v)}
          chips={STEPS.map((s, k) => ({ v: k + 1, label: s.label }))}
          caption={<MathEl omml={M.hundreds} size="xl" display="block" />}
          footnote="The basic fact stays the same. Only the place value moves." />;

      case 3:
        return <ExploreChips draw={makeShareUnits(unit)} height={256}
          label="Share twelve ..."
          value={unit}
          onPick={(v) => setUnit(v)}
          chips={[{ v: 1, label: "ones" }, { v: 10, label: "tens" }, { v: 100, label: "hundreds" }]}
          caption={<MathEl omml={M.why} size="lg" display="block" />}
          footnote="Twelve of anything shares the same way — it is the unit that changes." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[
            { id: "d1", text: "300", target: "e1" },
            { id: "d2", text: "30", target: "e2" },
            { id: "d3", text: "3,000", target: "e3" }
          ]}
          targets={[
            { id: "e2", label: "120 ÷ 4" }, { id: "e1", label: "1,200 ÷ 4" }, { id: "e3", label: "12,000 ÷ 4" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Hind's way — count the zeros", omml: M.hundreds, h: 92,
                  quote: "12 ÷ 4 is 3, then I copy across the two zeros." }}
          right={{ name: "Saud's way — name the unit", omml: M.why, h: 92,
                   quote: "Twelve hundreds shared by four is three hundreds." }}
          same={["Both get 300", "Both start from 12 ÷ 4", "Both are quick"]}
          diff={["Hind counts, Saud names the unit", "Saud can explain why", "Hind's is faster to say"]} />;

      case 6:
        return <BoardScreen draw={drawBoard51} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "divide the fact, then keep the place" }]}
          hand={"find the basic fact \u00b7 divide it \u00b7 the answer keeps the place value the dividend had"}
          cards={[
            { title: "The buses we filled", omml: M.buses, note: "24 ÷ 6 = 4, so 240 ÷ 6 = 40" },
            { title: "Tap to climb one more place", omml: M.hundreds, revealOmml: M.thousands, reveal: true,
              note: "the fact never changes" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is 3,500 ÷ 7?"
          omml={M.swyk}
          options={[{ v: "a", text: "50" }, { v: "b", text: "500" }, { v: "c", text: "5,000" }, { v: "d", text: "5" }]}
          right="b"
          support={{
            yes: "Yes — 35 ÷ 7 = 5, and 35 hundreds shared by 7 is 5 hundreds.",
            notYet: "Not yet — write the basic fact first, then keep the place.",
            draw: drawSupport51, h: 96,
            hint: "3,500 is 35 hundreds. What is 35 ÷ 7?"
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a number ending in zeros at home and share it by a single digit in your head." />;

      default: return null;
    }
  }
};
