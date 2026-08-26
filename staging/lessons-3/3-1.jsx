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
    {
      phase: "warmup",
      title: "Bundles beside the <em>dry channel</em>",
      lead: "The grove's shade material is stacked in rows of forty beside the dry irrigation channel. Five rows — and a question about the total.",
      goal: "An invitation — a basic fact can carry the whole multiplication.",
      pull: "You already know 5 × 4. That fact is about to do most of the work.",
      rail: {
        launch: "Fictional frame. Ask only: how is the material stacked, and what fact sits inside the total?",
        monitor: ["Noticing rows of forty", "Finding the 5 × 4 inside 5 × 40", "Wonding what 'attach the place' means"],
        connect: "What do 3 × 4, 3 × 40 and 3 × 400 have in common?",
        misconception: "Thinking bigger numbers need a bigger fact."
      }
    },
    {
      phase: "launch",
      title: "Zayd wants the total <em>before the count</em>",
      lead: "Five channels of forty bundles. Zayd locks an estimate from the fact he knows — the exact count can wait.",
      goal: "Use a basic fact to estimate a product with a multiple.",
      pull: "5 × 4 = 20 — so 5 × 40 lands near 200.",
      rail: {
        launch: "State that the bundle counts are simulated planning data.",
        monitor: ["Finding the basic fact", "Scaling it to tens", "Locking the estimate"],
        connect: "Which part of 5 × 40 did the fact 5 × 4 decide?",
        misconception: "Counting forty by forty five times instead of using the fact."
      }
    },
    {
      phase: "monitor",
      title: "Zayd reveals the <em>pattern</em> one line at a time",
      lead: "He can reveal 3 × 4, then × 40, then × 400, then × 4,000 — the class chooses the line before it appears.",
      goal: "See the fact stay constant while the place moves.",
      pull: "The basic fact stays the same. Only the place value moves.",
      rail: {
        launch: "Predict the next product before the line is revealed.",
        monitor: ["Reading 3 × 4 = 12", "Scaling to 120, 1,200, 12,000", "Naming what stayed and what moved"],
        connect: "What is the 3 in 40 actually a multiple of?",
        misconception: "Saying 3 × 40 = 120 because 'add a zero' — instead of: 3 × 4 tens = 12 tens."
      }
    },
    {
      phase: "monitor",
      title: "Omar scales the <em>unit</em>, not the number",
      lead: "He can show three groups of four as ones, tens or hundreds — the class picks the unit before the blocks scale.",
      goal: "Multiply the fact, then attach the place — the unit is what changes.",
      pull: "Twelve of anything works the same way — it is the unit that changes.",
      rail: {
        launch: "Ask what 'twelve' is measuring before the blocks appear.",
        monitor: ["Seeing 12 ones", "Seeing 12 tens = 120", "Seeing 12 hundreds = 1,200"],
        connect: "Why is 3 × 40 the same question as 3 × 4 with different units?",
        misconception: "Treating 40 as 'four and a zero' instead of four tens."
      }
    },
    {
      phase: "monitor",
      title: "The four lines need <em>their places</em>",
      lead: "Four products are mixed up with their scaling. The class files each line under its place before the folio commits.",
      goal: "Name the scaling: fact, ×10, ×100 or ×1,000.",
      pull: "A product is the fact plus a place — say both.",
      rail: {
        launch: "Do not grade until the class commits to all four files.",
        monitor: ["Naming the fact", "Naming ×10 and ×100", "Naming ×1,000"],
        connect: "Which line would 'add a zero' get wrong?",
        misconception: "Filing 3 × 400 under ×10 because 'there are two zeros'."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em> to the product",
      lead: "The boys step back. Real student methods for multiples take the board.",
      goal: "Compare methods and name a reusable one in the Sijill.",
      pull: "One method counts zeros; one attaches places. Only one survives 23 × 10.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Testing 'add a zero' on 23 × 10", "Seeing 23 × 10 as 23 tens", "Explaining which method generalises"],
        connect: "Why does 'add a zero' break on 23 × 10?",
        misconception: "Believing 'add a zero' is the rule instead of 'multiply the fact, attach the place'."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Multiply the fact. Attach the place. Say both out loud.",
      goal: "Build the multiples rule publicly from the methods compared.",
      pull: "The fact did the work. The place did the scaling.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Applying it to 5 × 40", "Saying 'fours' and 'forty' distinctly"],
        connect: "Which part of the rule stops 'add a zero'?",
        misconception: "Memorising 12, 120, 1,200 without the place language."
      }
    },
    {
      phase: "swyk",
      title: "Zayd signs only a product he can <em>unbuild</em>",
      lead: "A fresh line: 6 × 700. What is the product — and what is the fact doing inside it?",
      goal: "Multiply by a multiple independently and name the fact + place.",
      pull: "A product you can unbuild into fact + place is a product you can defend.",
      rail: {
        launch: "Two minutes. Require the fact and the place, not only the number.",
        monitor: ["Naming 6 × 7 = 42", "Naming 'hundreds'", "Composing 4,200"],
        connect: "What would 6 × 7,000 be, and which place attached?",
        misconception: "Answering 420 — the fact without the place."
      }
    },
    {
      phase: "connect",
      title: "The bundle counts are <em>filed</em>",
      lead: "The grove's bundle counts are filed as fact + place. Then the foreman's voice carries across the yard: a date order lands, and he promises a number by sundown.",
      goal: "Close on one action: unbuild a product into fact + place.",
      pull: "Tomorrow: the exact can wait — the estimate must be defensible.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Unbuilding products", "Saying places aloud", "Ready to estimate products"],
        connect: "Where have you 'attached a place' to a fact you knew?",
        misconception: "Remembering the bundles but not the fact + place rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(1);
    const [unit, setUnit] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Rows of forty beside the dry channel"
            text="The lantern shows the grove's shade material stacked in rows of forty bundles beside the dry irrigation channel. Five rows — and the grove plan needs the total."
            clue="A basic fact is hiding inside the total">
            <NoticeWonder draw={drawBuses} height={256} award={award}
              notices={["The rows hold forty each", "There are five rows", "The total is not counted yet", "5 × 4 is already known"]}
              wonders={["How can 5 × 4 help with 5 × 40?", "What is 'a place' attached to a fact?", "Would the trick work for hundreds?"]}
              footnote="The story sets the rows. The fact + place is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="zayd" pose="question"
            title="Zayd locks the estimate from a fact he knows"
            text="Zayd marks the bundle counts as simulated planning data — then scales the fact 5 × 4 = 20 up to tens before the class counts a single bundle."
            clue="5 × 4 = 20, so 5 × 40 lands near 200">
            <LaunchEstimate draw={drawBuses} height={256} award={award}
              label="How many bundles on 5 rows of 40?"
              min={50} max={400} start={200} unit="bundles"
              after="Locked. Now let us see the pattern behind your number."
              note="Bundle counts are simulated planning data. The fact 5 × 4 is doing most of the work." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd reveals the pattern one line at a time"
            text="He can reveal the pattern from 3 × 4 up to 3 × 4,000. The class chooses the line before it appears — the fact stays, the place moves."
            clue="Only the place value moves">
            <ExploreChips draw={makePattern(step)} height={252}
              label="Reveal one line of the pattern"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 1, label: "3 × 4" }, { v: 2, label: "3 × 40" }, { v: 3, label: "3 × 400" }, { v: 4, label: "3 × 4,000" }]}
              caption={<MathEl omml={M.fact} size="xl" display="block" />}
              footnote="The basic fact stays the same. Only the place value moves." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar scales the unit, not the number"
            text="He can show three groups of four as ones, tens or hundreds. The class picks the unit before the blocks scale — twelve of anything works the same way."
            clue="It is the unit that changes">
            <ExploreChips draw={makeBlocksScale(unit)} height={252}
              label="Three groups of four …"
              value={unit}
              onPick={(v) => setUnit(v)}
              chips={[{ v: 1, label: "ones" }, { v: 10, label: "tens" }, { v: 100, label: "hundreds" }]}
              caption={<MathEl omml={M.why} size="lg" display="block" />}
              footnote="3 × 4 tens is 12 tens — the fact multiplied, the place attached." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The four lines need their places"
            text="Omar reads each product while Zayd files it under its scaling. The class commits all four before the folio signs."
            clue="Say the fact and the place — both">
            <CardSort award={award} columns={4} commitLabel="File the four lines"
              items={[
                { id: "s1", text: "3 × 4 = 12", target: "t1" },
                { id: "s2", text: "3 × 40 = 120", target: "t2" },
                { id: "s3", text: "3 × 400 = 1,200", target: "t3" },
                { id: "s4", text: "3 × 4,000 = 12,000", target: "t4" }
              ]}
              targets={[
                { id: "t1", label: "fact" },
                { id: "t2", label: "× 10" },
                { id: "t3", label: "× 100" },
                { id: "t4", label: "× 1,000" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest multiple methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One method counts zeros; one attaches places">
          <CompareConnect award={award}
            left={{ name: "Lina's way — count the zeros", omml: M.tens, h: 92,
                    quote: "3 × 40 has one zero, so 12 gets a zero: 120." }}
            right={{ name: "Musa's way — attach the place", omml: M.hundreds, h: 92,
                     quote: "3 × 4 hundreds is 12 hundreds — that is 1,200. The place says it." }}
            same={["Both reach the right product for 3 × 40 and 3 × 400", "Both use the fact 3 × 4 = 12"]}
            diff={["Lina's breaks on 23 × 10 — 230 is '23 with a zero', not 23 tens", "Musa's says 23 × 10 is 23 tens = 230 with a reason", "Musa's generalises to any multiple"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Multiply the fact · attach the place">
            <BoardScreen draw={drawBoard31} height={380}
              caption="The fact did the work. The place did the scaling." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Zayd signs only a product he can unbuild"
            text="A fresh line for the grove plan: 6 × 700. What is the product — and what fact is doing the work inside it?"
            clue="6 × 7 = 42 — now say the place">
            <ShowWhatYouKnow award={award}
              prompt="What is 6 × 700?"
              options={[{ v: "a", text: "420" }, { v: "b", text: "4,200" }, { v: "c", text: "42,000" }, { v: "d", text: "4,020" }]}
              right="b"
              support={{
                yes: "Yes — 6 × 7 = 42, and the place is hundreds: 42 hundreds is 4,200.",
                notYet: "Not yet — name the fact, then attach the place the 700 carries.",
                draw: drawSupport31, h: 84,
                hint: "What is 6 × 7, and what is a 700 made of?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The bundle counts are filed"
            text="Omar files the grove's bundle counts as fact + place. Then the foreman's voice carries across the yard: a date order has landed on his desk, and he promises a number by sundown — exact can wait, but the estimate must be defensible."
            artifact="Grove plan · bundle counts (fact + place)"
            next="The foreman promises a number by sundown — the estimate must be defensible.">
            <Closing game={game} omml={M.buses}
              action="Tonight: take a fact you know and attach a place to it. Say the product and unbuild it." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
