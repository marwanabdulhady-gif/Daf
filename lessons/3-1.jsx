/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-1 · Multiply by Multiples of 10, 100 and 1,000
   Standard 4.NBT.B.5   I can ... use a basic fact and place value to multiply
   by a multiple of ten.
   =========================================================================== */

const M = {
  fact: om(mt("3×4=12")),
  tens: om(mt("3×40=120")),
  hundreds: om(mt("3×400=1,200")),
  thousands: om(mt("3×4,000=12,000")),
  why: om(mt("3×4"), mnor(" hundreds = "), mt("12"), mnor(" hundreds")),
  buses: om(mt("5×40=200")),
  rule: om(mnor("multiply the fact, then attach the place")),
  swyk: om(mt("6×700")),
  swykAnswer: om(mt("6×7=42"), mnor(", so "), mt("6×700=4,200"))
};

const drawBuses = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 300), p3 = D.at(f, 310, 440);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school trip", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let b = 0; b < 5; b++) {
    const a = D.at(p2, b / 5, b / 5 + 0.4);
    if (a <= 0) continue;
    const bx = 42 + b * ((W - 96) / 5);
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, bx, 60, (W - 130) / 5, 46, 8);
    ctx.fillStyle = "#C9A227"; ctx.globalAlpha = a * 0.22; ctx.fill();
    ctx.globalAlpha = a; ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "40", bx + (W - 130) / 10, 84, { size: 17, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "5 buses, 40 seats in each", W / 2, 136, { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many seats altogether?", W / 2, H - 20,
      { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 370, 450) });
  }
};

const makePattern = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvPattern(ctx, { a: 3, b: 4, steps: 4, x: W / 2 - 60, y: 54, prog: step / 4, t: frame, lh: 42 });
  D.txt(ctx, step === 4 ? "the digits never change — only the zeros grow"
                        : "watch what happens to the zeros",
    W / 2, H - 18, { size: 13.5, col: step === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeBlocksScale = (unit) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const names = { 1: "ones", 10: "tens", 100: "hundreds" };
  const cols = { 1: "#C9A227", 10: "#2D70B3", 100: "#6042A6" };
  const base = H - 66, s = unit === 100 ? 4.2 : 7;
  for (let g = 0; g < 3; g++) {
    for (let k = 0; k < 4; k++) {
      const gx = 58 + g * ((W - 120) / 3) + k * (unit === 100 ? 46 : unit === 10 ? 17 : 13);
      if (unit === 1) D.digitBlocks(ctx, { x: gx, y: base - s, unit: 1, prog: 1, col: cols[1], s: s });
      else if (unit === 10) D.digitBlocks(ctx, { x: gx, y: base - s * 10, unit: 10, prog: 1, col: cols[10], s: s });
      else D.digitBlocks(ctx, { x: gx, y: base - s * 10, unit: 100, prog: 1, col: cols[100], s: s });
    }
    D.txt(ctx, "4 " + names[unit], 58 + g * ((W - 120) / 3) + 40, base + 22,
      { size: 11, col: cols[unit], font: "marker" });
  }
  D.txt(ctx, "3 groups of 4 " + names[unit] + " = 12 " + names[unit], W / 2, 36,
    { size: 15.5, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "= " + (12 * unit).toLocaleString("en-US"), W / 2, H - 16,
    { size: 17, col: "#34D399", font: "marker" });
};

const drawBoard31 = (ctx, W, H, frame) => {
  const CYCLE = 760, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Why do the zeros just move across?" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 250, 420), p3 = D.at(f, 430, 600);
  D.pvPattern(ctx, { a: 3, b: 4, steps: 4, x: W / 2 - 70, y: 100, prog: p1, t: frame, lh: 44 });
  if (p2 > 0) {
    D.txt(ctx, "3 × 4 hundreds is 12 hundreds", W / 2, 282,
      { size: 16, col: "#C9A227", font: "marker", alpha: p2 });
    D.txt(ctx, "and 12 hundreds is written 1,200", W / 2, 310,
      { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 300, 380) });
  }
  if (p3 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the fact does the work — the place value carries the zeros",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 470, 550) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 510, 610), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport31 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvPattern(ctx, { a: 6, b: 7, steps: 3, x: W / 2 - 60, y: 22, prog: 1, lh: 30 });
};

const LESSON = {
  code: "3-1",
  storageKey: "daf-g4-t3-l1",
  title: "Multiply by Multiples of 10, 100, and 1,000",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-1 · 4.NBT.B.5",
  math: M,
  ixl: ["W6B", "2RP"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Four multiplications, stacked. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Something is staying exactly the same all the way down.",
      rail: { launch: "I am not asking you to work anything out. Just look down the list.",
        monitor: ["Noticing the 12", "Counting the zeros", "Predicting the next line"],
        connect: "Who noticed something nobody else did?",
        misconception: "Seeing four unrelated facts instead of one pattern." } },

    { phase: "launch", title: "Five buses, <em>forty seats</em> each",
      lead: "How many seats altogether? You already know 5 × 4.",
      goal: "Create the need — a basic fact can carry a much bigger one.",
      pull: "Estimate first, then we will see why it works.",
      rail: { launch: "Nobody counts 40 five times. What do you already know that helps?",
        monitor: ["Adding 40 five times", "Using 5 x 4 then adding a zero", "Thinking in tens"],
        connect: "What basic fact is hiding inside this problem?",
        misconception: "Adding a zero as a rule with no meaning behind it." } },

    { phase: "monitor", title: "Follow the <em>pattern</em>",
      lead: "Reveal one line at a time. Watch the digits and watch the zeros.",
      goal: "The basic fact stays; the place value changes.",
      pull: "But why does it work? Let us build it with blocks.",
      rail: { launch: "Predict each line before you reveal it.",
        monitor: ["Predicting correctly", "Counting zeros carefully", "Explaining in place-value words"],
        connect: "How many zeros will 3 x 40,000 have?",
        misconception: "Counting the zeros in the answer instead of in the factor." } },

    { phase: "monitor", title: "Three groups of <em>four</em>",
      lead: "Four ones, four tens, four hundreds. The groups never change.",
      goal: "The pattern is a place-value fact, not a zero trick.",
      pull: "Now match some products to their expressions.",
      rail: { launch: "Before you tap: how many blocks will there be?",
        monitor: ["Counting the blocks", "Naming the unit", "Reading 12 hundreds as 1,200"],
        connect: "Why is 12 hundreds written as 1,200?",
        misconception: "Reading 12 hundreds as 12,00." } },

    { phase: "monitor", title: "Match the <em>product</em>",
      lead: "Which expression gives that answer? No grading until the class commits.",
      goal: "Read the pattern backwards.",
      pull: "Two students explained the zeros differently.",
      rail: { launch: "Look at the basic fact first, then the zeros.",
        monitor: ["Using the basic fact", "Counting zeros", "Calculating fully"],
        connect: "Which part did you check first?",
        misconception: "Matching by the number of digits." } },

    { phase: "connect", title: "Two ways to <em>say why</em>",
      lead: "Amal counts zeros. Basil thinks in hundreds. Both get 1,200.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Counting zeros fluently", "Naming the unit", "Using both together"],
        connect: "Whose explanation would help if you forgot the rule?",
        misconception: "Believing the zero-counting shortcut is the mathematics." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "3 × 4 hundreds is 12 hundreds. Twelve hundreds is 1,200.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next line", "Naming the unit each time", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Memorising add the zeros without the unit." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the fact and the place", "Testing on a new fact", "Asking about 50 x 40"],
        connect: "What happens when both factors have zeros?",
        misconception: "Applying the rule when the basic fact itself ends in zero, as in 5 x 4 = 20." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write the basic fact first.",
        monitor: ["Writing 6 x 7 first", "Counting zeros", "Guessing the size"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Writing 420 instead of 4,200." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: is my product about right?",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the blocks", "Ready to estimate"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(1);
    const [unit, setUnit] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makePattern(4)} height={256} award={award}
          notices={["The 12 is always there", "One more zero each line", "The 3 never changes", "The answers get ten times bigger"]}
          wonders={["What comes next?", "Why does the 12 stay?", "Does it work for any fact?"]} />;

      case 1:
        return <LaunchEstimate draw={drawBuses} height={258} award={award}
          label="How many seats on 5 buses of 40?" min={50} max={400} start={200} unit="seats"
          after="Locked. Now let us see the pattern behind it."
          note="You already know 5 x 4. That fact is doing most of the work." />;

      case 2:
        return <ExploreChips draw={makePattern(step)} height={256}
          label="Reveal one line at a time"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 1, label: "3 × 4" }, { v: 2, label: "× 40" }, { v: 3, label: "× 400" }, { v: 4, label: "× 4,000" }]}
          caption={<MathEl omml={M.thousands} size="xl" display="block" />}
          footnote="The basic fact stays the same. Only the place value moves." />;

      case 3:
        return <ExploreChips draw={makeBlocksScale(unit)} height={256}
          label="Three groups of four ..."
          value={unit}
          onPick={(v) => setUnit(v)}
          chips={[{ v: 1, label: "ones" }, { v: 10, label: "tens" }, { v: 100, label: "hundreds" }]}
          caption={<MathEl omml={M.why} size="lg" display="block" />}
          footnote="Twelve of anything works the same way — it is the unit that changes." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[
            { id: "m1", text: "1,200", target: "h" },
            { id: "m2", text: "120", target: "t" },
            { id: "m3", text: "12,000", target: "th" }
          ]}
          targets={[
            { id: "t", label: "3 × 40" }, { id: "h", label: "3 × 400" }, { id: "th", label: "3 × 4,000" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Amal's way — count the zeros", omml: M.hundreds, h: 92,
                  quote: "3 times 4 is 12, then I copy across the two zeros." }}
          right={{ name: "Basil's way — name the unit", omml: M.why, h: 92,
                   quote: "Three groups of four hundreds is twelve hundreds." }}
          same={["Both get 1,200", "Both start from 3 x 4", "Both are quick"]}
          diff={["Amal counts, Basil names the unit", "Basil can explain why", "Amal's is faster to say"]} />;

      case 6:
        return <BoardScreen draw={drawBoard31} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "multiply the fact, then attach the place" }]}
          hand={"find the basic fact · multiply it · then attach the same place value the factor had"}
          cards={[
            { title: "The seats we counted", omml: M.buses, note: "5 x 4 = 20, so 5 x 40 = 200" },
            { title: "Tap to climb one more place", omml: M.hundreds, revealOmml: M.thousands, reveal: true,
              note: "the fact never changes" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is 6 × 700?"
          omml={M.swyk}
          options={[{ v: "a", text: "420" }, { v: "b", text: "4,200" }, { v: "c", text: "42,000" }, { v: "d", text: "4,020" }]}
          right="b"
          support={{
            yes: "Yes — 6 × 7 = 42, and 42 hundreds is 4,200.",
            notYet: "Not yet — write the basic fact first, then attach the place.",
            draw: drawSupport31, h: 96,
            hint: "6 × 7 = 42. Now, 42 what? Ones, tens or hundreds?"
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a price ending in zeros at home and multiply it by a single digit in your head." />;

      default: return null;
    }
  }
};
