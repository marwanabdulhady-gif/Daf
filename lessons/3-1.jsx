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

const makePattern = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: W / 2 - 80, y: 48, w: 160, h: 180, value: 0, on: () => onStep((step % 4) + 1) });
  D.pvPattern(ctx, { a: 3, b: 4, steps: 4, x: W / 2 - 60, y: 54, prog: step / 4, t: frame, lh: 42 });
  D.txt(ctx, step === 4 ? "the digits never change — only the zeros grow"
                        : "watch what happens to the zeros",
    W / 2, H - 18, { size: 13.5, col: step === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeBlocksScale = (unit, onUnit) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onUnit) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onUnit(unit === 1 ? 10 : unit === 10 ? 100 : 1) });
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
    { phase: "warmup", title: "Four deliveries, <em>one pattern</em>",
      lead: "Shade tiles arrive in bundles of tens, hundreds and thousands. Four deliveries are logged on the plan — and something stays exactly the same.",
      goal: "Notice the pattern before any calculating — the digits stay, the places grow.",
      pull: "Something is staying exactly the same all the way down.",
      rail: { launch: "Fictional frame. I am not asking you to work anything out. Just look down the list.",
        monitor: ["Noticing the 12", "Counting the zeros", "Predicting the next line"],
        connect: "Who noticed something nobody else did?",
        misconception: "Seeing four unrelated facts instead of one pattern." } },

    { phase: "launch", title: "Five buses, <em>forty seats</em> each",
      lead: "The trip to the grove site: 5 buses, 40 seats in each. How many seats altogether? You already know 5 × 4.",
      goal: "Create the need — a basic fact can carry a much bigger one.",
      pull: "The trip roster is simulated — the place-value idea works on any batch.",
      rail: { launch: "Nobody counts 40 five times. What do you already know that helps?",
        monitor: ["Adding 40 five times", "Using 5 × 4 then adding a zero", "Thinking in tens"],
        connect: "What basic fact is hiding inside this problem?",
        misconception: "Adding a zero as a rule with no meaning behind it." } },

    { phase: "monitor", title: "Follow the <em>pattern</em>",
      lead: "Reveal one delivery at a time. Watch the digits and watch the zeros.",
      goal: "The basic fact stays; the place value changes.",
      pull: "The digits never change — only the zeros grow.",
      rail: { launch: "Predict each line before Zayd reveals it.",
        monitor: ["Predicting correctly", "Counting zeros carefully", "Explaining in place-value words"],
        connect: "How many zeros will 3 × 40,000 have?",
        misconception: "Counting the zeros in the answer instead of in the factor." } },

    { phase: "monitor", title: "Bundles beside the <em>dry channel</em>",
      lead: "Four ones, four tens, four hundreds. The groups never change — only the unit they hold.",
      goal: "The pattern is a place-value fact, not a zero trick.",
      pull: "3 groups of 4 hundreds is 12 hundreds.",
      rail: { launch: "Before you tap: how many blocks will there be?",
        monitor: ["Counting the blocks", "Naming the unit", "Reading 12 hundreds as 1,200"],
        connect: "Why is 12 hundreds written as 1,200?",
        misconception: "Reading 12 hundreds as 12,00." } },

    { phase: "monitor", title: "Match the <em>product</em>",
      lead: "Which expression gives that answer? No grading until the class commits.",
      goal: "Read the pattern backwards.",
      pull: "Look at the basic fact first, then the zeros.",
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

    { phase: "synth", title: "On the <em>board</em>: multiply the fact, attach the place",
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
        monitor: ["Naming the fact and the place", "Testing on a new fact", "Asking about hundreds"],
        connect: "What happens when the factor is 1,000?",
        misconception: "Attaching zeros to the basic fact's answer instead of the factor." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "6 × 700 — the basic fact first, then the place.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write the basic fact first.",
        monitor: ["Writing 6 × 7", "Attaching the hundreds place", "Reading 42 hundreds"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 420 — the hundreds place was missed." } },

    { phase: "connect", title: "The first delivery is <em>counted</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the foreman's quick promise — one truck for the whole order.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain the place", "Still counts zeros only", "Ready for two-digit factors"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(1);
    const [unit, setUnit] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Four deliveries, one pattern"
            text="The grove's first deliveries are logged: bundles of tens, hundreds and thousands of shade tiles. Four lines on the plan — and the digits barely move."
            clue="Something stays the same all the way down">
            <NoticeWonder draw={makePattern(4)} height={256} award={award}
              notices={["The 12 is always there", "The zeros keep growing", "Each line multiplies by 10", "The digits never change"]}
              wonders={["Why do the zeros just move across?", "Does it work for any fact?", "What is 3 × 40,000?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Five buses to the grove site"
            text="Omar checks the trip roster: 5 buses, 40 seats in each. The grove site waits — but first, how many seats altogether?"
            clue="A basic fact is hiding inside the problem">
            <LaunchEstimate draw={drawBuses} height={258} award={award}
              label="About how many seats altogether?" min={150} max={250} start={200} unit="seats"
              after="Locked. Now follow the pattern and see why it works."
              note="The trip roster is simulated — the place-value idea works on any batch." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd reveals the deliveries one at a time"
            text="He can reveal any line, but the class must predict the product before the zeros move."
            clue="The digits never change — only the zeros grow">
            <ExploreChips draw={makePattern(step, setStep)} height={256}
              label="Reveal one delivery at a time"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 1, label: "3 × 4" }, { v: 2, label: "3 × 40" }, { v: 3, label: "3 × 400" }, { v: 4, label: "3 × 4,000" }]}
              caption={<MathEl omml={step === 1 ? M.fact : step === 2 ? M.tens : step === 3 ? M.hundreds : M.thousands} size="lg" display="block" />}
              footnote="The basic fact stays; the place value changes." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="both"
            title="Bundles beside the dry channel"
            text="Omar and Zayd lay the bundles out: three groups of four — ones, tens or hundreds. The groups never change; the unit they hold does."
            clue="3 groups of 4 hundreds is 12 hundreds">
            <ExploreChips draw={makeBlocksScale(unit, setUnit)} height={256}
              label="Three groups of four — what is the unit?"
              value={unit}
              onPick={(v) => setUnit(v)}
              chips={[{ v: 1, label: "four ones" }, { v: 10, label: "four tens" }, { v: 100, label: "four hundreds" }]}
              caption={<MathEl omml={M.why} size="lg" display="block" />}
              footnote="The pattern is a place-value fact, not a zero trick." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the product"
            text="Three products from the delivery log. Each one belongs to exactly one expression."
            clue="Look at the basic fact first, then the zeros">
            <CardSort award={award} columns={3}
              items={[
                { id: "m1", text: "1,200", target: "h" },
                { id: "m2", text: "120", target: "t" },
                { id: "m3", text: "12,000", target: "th" }
              ]}
              targets={[
                { id: "t", label: "3 × 40" },
                { id: "h", label: "3 × 400" },
                { id: "th", label: "3 × 4,000" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two ways to say why"
            text="Amal counts the zeros. Basil names the unit. Both get 1,200 — for different reasons."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Amal's way — count the zeros", omml: M.tens, h: 92,
                      quote: "3 times 4 is 12, and there is one zero to copy across." }}
              right={{ name: "Basil's way — name the unit", omml: M.why, h: 92,
                       quote: "3 times 4 hundreds is 12 hundreds." }}
              same={["Both get 1,200", "Both start from 3 × 4", "Both are quick"]}
              diff={["Amal counts, Basil names the unit", "Basil can explain why", "Amal's is faster to say"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The pattern is drawn into the grove plan"
            text="Zayd builds only what the class can justify: the fact multiplied, the place attached."
            clue="Multiply the fact, then attach the place">
            <BoardScreen draw={drawBoard31} height={430}
              caption="Multiply the fact, then attach the place." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the grove plan with its reason, not alone."
            clue="The zero belongs to the factor's place, not to the answer">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "multiply the fact, then attach the place" }]}
              hand={"find the basic fact · multiply it · attach the factor's place to the answer"}
              cards={[
                { title: "The pattern we followed", omml: M.thousands, note: "the 12 never moves" },
                { title: "Tap to move the place", omml: M.tens, revealOmml: M.hundreds, reveal: true,
                  note: "the zero moves from the tens to the hundreds" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a product he can defend"
            text="6 × 700. Show the basic fact first — then the place."
            clue="42 hundreds is 4,200">
            <ShowWhatYouKnow award={award}
              prompt="What is 6 × 700?"
              omml={M.swyk}
              options={[{ v: "a", text: "4,200" }, { v: "b", text: "420" }, { v: "c", text: "42,000" }, { v: "d", text: "670" }]}
              right="a"
              support={{
                yes: "Yes — 6 × 7 = 42, so 6 × 700 is 42 hundreds: 4,200.",
                notYet: "Not yet — what is the basic fact first?",
                draw: drawSupport31, h: 96,
                hint: "6 × 7 = 42. Now attach the factor's place."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The first delivery is counted"
            text="Omar logs the bundles of tens into the grove plan. Zayd reads the foreman's note: eight crates of dates for the market — and a promise that the whole order fits on one truck."
            artifact="Grove plan · bundles of tens counted"
            next="The foreman's quick promise: the whole order fits on one truck — can the class estimate before the truck arrives?">
            <Closing game={game} omml={M.rule}
              action="Find a multiple-of-ten multiplication at home, and say which basic fact is doing the work." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
