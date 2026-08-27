/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-6 · Mental Math Strategies for Multiplication
   Standard 4.NBT.B.5   I can ... use properties and compensation to multiply
   in my head.
   =========================================================================== */

const M = {
  problem: om(mt("5×18")),
  compensate: om(mt("5×20-5×2=90")),
  breakApart: om(mt("5×10+5×8=90")),
  doubleHalve: om(mt("5×18=10×9=90")),
  assoc: om(mt("4×25×3=100×3")),
  rule: om(mnor("change the numbers, protect the product")),
  swyk: om(mt("6×49")),
  swykAnswer: om(mt("6×50-6=294"))
};

/* compensation: 5 x 20 rectangle with a slice taken off */
const makeCompensate = (cut, onCut) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onCut) D.tap(ctx, { x: 78, y: 60, w: W - 150, h: 100, value: 0, on: () => onCut(!cut) });
  const x = 78, y = 66, w = W - 150, h = 96;
  const keepW = w * (18 / 20);
  ctx.save();
  ctx.globalAlpha = 0.24;
  D.rr(ctx, x, y, keepW, h, 6);
  ctx.fillStyle = "#2D70B3"; ctx.fill();
  ctx.restore();
  ctx.save();
  D.rr(ctx, x, y, keepW, h, 6);
  ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.8; ctx.stroke();
  ctx.restore();
  D.txt(ctx, "5", x - 22, y + h / 2, { size: 19, col: "#C9A227", font: "marker" });
  D.txt(ctx, "18", x + keepW / 2, y - 16, { size: 15, col: "#2D70B3", font: "marker" });
  D.txt(ctx, "90", x + keepW / 2, y + h / 2, { size: 22, col: "#EAF4F2", font: "marker" });

  if (cut) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    D.rr(ctx, x + keepW, y, w - keepW, h, 6);
    ctx.fillStyle = "#C74440"; ctx.fill();
    ctx.restore();
    ctx.save();
    D.rr(ctx, x + keepW, y, w - keepW, h, 6);
    ctx.strokeStyle = "#C74440"; ctx.lineWidth = 1.8; ctx.setLineDash([4, 4]); ctx.stroke();
    ctx.restore();
    D.txt(ctx, "2", x + keepW + (w - keepW) / 2, y - 16, { size: 14, col: "#C74440", font: "marker" });
    D.txt(ctx, "10", x + keepW + (w - keepW) / 2, y + h / 2, { size: 15, col: "#C74440", font: "marker" });
    D.txt(ctx, "5 × 20 = 100, then take off 5 × 2 = 10", W / 2, H - 40,
      { size: 15, col: "#C9A227", font: "marker" });
    D.txt(ctx, "100 − 10 = 90", W / 2, H - 16, { size: 17, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, "5 × 18 is awkward — but 5 × 20 is not", W / 2, H - 24,
      { size: 14, col: "#C9A227", font: "marker" });
  }
};

/* double and halve */
const makeDoubleHalve = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onStep(step === 0 ? 1 : 0) });
  const pairs = [[5, 18], [10, 9]];
  const p = pairs[step];
  const x = 82, y = 68, w = (W - 160) * (p[1] / 18), h = 22 + p[0] * 6;
  ctx.save();
  ctx.globalAlpha = 0.24;
  D.rr(ctx, x, y, w, h, 6);
  ctx.fillStyle = step === 0 ? "#2D70B3" : "#388C46"; ctx.fill();
  ctx.restore();
  ctx.save();
  D.rr(ctx, x, y, w, h, 6);
  ctx.strokeStyle = step === 0 ? "#2D70B3" : "#388C46"; ctx.lineWidth = 1.8; ctx.stroke();
  ctx.restore();
  D.txt(ctx, String(p[0]), x - 22, y + h / 2, { size: 19, col: "#C9A227", font: "marker" });
  D.txt(ctx, String(p[1]), x + w / 2, y - 16, { size: 16, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "90", x + w / 2, y + h / 2, { size: 22, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, step === 0 ? "5 rows of 18" : "double the 5, halve the 18 — same 90 squares",
    W / 2, H - 40, { size: 14.5, col: step === 0 ? "#C9A227" : "#34D399", font: "marker" });
  D.txt(ctx, step === 0 ? "tap to double and halve" : "10 × 9 = 90",
    W / 2, H - 16, { size: 14, col: "rgba(234,244,242,.7)", font: "marker" });
};

const drawMarket = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 320), p3 = D.at(f, 330, 450);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "prayer mats for the hall", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 18; c++) {
      const a = D.at(p2, (r * 18 + c) / 90, (r * 18 + c) / 90 + 0.14);
      if (a <= 0) continue;
      ctx.save();
      ctx.globalAlpha = a * 0.8;
      D.rr(ctx, 60 + c * ((W - 130) / 18), 48 + r * 20, (W - 150) / 18, 15, 2);
      ctx.fillStyle = "#12857C"; ctx.fill();
      ctx.restore();
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "5 rows of 18 mats", W / 2, 166, { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "can you do it without writing?", W / 2, H - 16,
      { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard36 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Change the numbers, keep the product" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 210, 400), p3 = D.at(f, 410, 560), p4 = D.at(f, 560, 700);
  const x = 110, y = 116, w = W - 220, h = 100;
  const keepW = w * (18 / 20);
  ctx.save(); ctx.globalAlpha = 0.22 * p1;
  D.rr(ctx, x, y, keepW, h, 6); ctx.fillStyle = "#2D70B3"; ctx.fill(); ctx.restore();
  ctx.save(); ctx.globalAlpha = p1;
  D.rr(ctx, x, y, keepW, h, 6); ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
  D.txt(ctx, "5", x - 24, y + h / 2, { size: 20, col: "#C9A227", font: "marker", alpha: p1 });
  D.txt(ctx, "18", x + keepW / 2, y - 18, { size: 16, col: "#2D70B3", font: "marker", alpha: p1 });

  if (p2 > 0) {
    ctx.save(); ctx.globalAlpha = 0.18 * p2;
    D.rr(ctx, x + keepW, y, w - keepW, h, 6); ctx.fillStyle = "#C74440"; ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha = p2;
    D.rr(ctx, x + keepW, y, w - keepW, h, 6);
    ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.restore();
    D.txt(ctx, "2", x + keepW + (w - keepW) / 2, y - 18, { size: 15, col: "#C74440", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "5 × 20 = 100", W / 2, y + h + 40, { size: 18, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "take off the extra 5 × 2 = 10", W / 2, y + h + 70,
      { size: 15, col: "#C74440", font: "marker", alpha: D.at(f, 450, 530) });
  }
  if (p4 > 0) {
    const yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "make it friendly, then undo exactly what you changed",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 600, 680) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 630, 730), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport36 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 40, y = 20, w = W - 90, h = 46;
  const keepW = w * (49 / 50);
  ctx.save(); ctx.globalAlpha = 0.22;
  D.rr(ctx, x, y, keepW, h, 5); ctx.fillStyle = "#2D70B3"; ctx.fill(); ctx.restore();
  ctx.save(); D.rr(ctx, x, y, keepW, h, 5);
  ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
  ctx.save(); D.rr(ctx, x + keepW, y, w - keepW, h, 3);
  ctx.strokeStyle = "#C74440"; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
  D.txt(ctx, "6", x - 16, y + h / 2, { size: 15, col: "#C9A227", font: "marker" });
  D.txt(ctx, "49", x + keepW / 2, y - 10, { size: 12, col: "#2D70B3", font: "marker" });
  D.txt(ctx, "6 × 50 = 300, then take off 6", W / 2, y + h + 22,
    { size: 13, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "3-6",
  storageKey: "daf-g4-t3-l6",
  title: "Mental Math Strategies for Multiplication",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-6 · 4.NBT.B.5",
  math: M,
  ixl: ["YR9", "5C8", "B6N"],

  metas: [
    { phase: "warmup", title: "The delayed <em>delivery</em>",
      lead: "The delivery note is late and the paper is gone. Five rows of 18 prayer mats at the market — the order must be updated in the air.",
      goal: "Notice the product hides a friendly number one step away.",
      pull: "Change the numbers, protect the product.",
      rail: { launch: "Fictional frame. Just look at the rows — no working yet.",
        monitor: ["Noticing 18 is near 20", "Seeing five rows", "Wonding what a mental method is"],
        connect: "What friendly number is 18 almost touching?",
        misconception: "Reaching for the paper before trying the head." } },

    { phase: "launch", title: "Five rows of <em>eighteen mats</em>",
      lead: "How many prayer mats? No pencil — what did your brain do first?",
      goal: "Create the need — 5 × 20 is easy, 5 × 18 is not yet.",
      pull: "5 × 20 is easy. 5 × 18 is not — yet.",
      rail: { launch: "Hands down. Give a total, and say what you did to the numbers.",
        monitor: ["Adding 18 five times", "Stretching 18 to 20", "Splitting 18 into 10 and 8"],
        connect: "Who changed the numbers before multiplying?",
        misconception: "Believing mental math means the written method done silently." } },

    { phase: "monitor", title: "Zayd stretches to <em>20</em>, then cuts",
      lead: "Overshoot to 5 × 20, then take the extra back — five twos, one for each row.",
      goal: "Compensation: change the numbers, protect the product.",
      pull: "You added 2 to every one of the 5 rows — so you must take off 5 twos.",
      rail: { launch: "Predict the total before the slice is cut.",
        monitor: ["Stretching to 20", "Counting five twos", "Subtracting 10 from 100"],
        connect: "Why are there five twos, not just one?",
        misconception: "Taking off only one 2 instead of 5 × 2." } },

    { phase: "monitor", title: "Omar <em>doubles and halves</em>",
      lead: "Twice as many rows, half as long — the squares never left the rectangle.",
      goal: "Reshape the factors when one is even and the other can halve.",
      pull: "5 × 18 = 10 × 9 — the same squares, a new shape.",
      rail: { launch: "Before you tap: how many rows after the reshape?",
        monitor: ["Doubling the rows", "Halving the length", "Seeing 10 × 9"],
        connect: "Did the total change when the shape changed?",
        misconception: "Thinking the reshape changes the product." } },

    { phase: "monitor", title: "Name the <em>strategy</em>",
      lead: "Three pieces of working. Each one is a different strategy.",
      goal: "Sort the working so the class can choose a strategy on purpose.",
      pull: "Read each working before you place it.",
      rail: { launch: "Say what the working does to the numbers.",
        monitor: ["Spotting the overshoot", "Spotting the split", "Spotting the reshape"],
        connect: "How could you tell them apart?",
        misconception: "Thinking any mental method is compensation." } },

    { phase: "connect", title: "Wafa <em>overshoots</em>. Jamal <em>splits</em>",
      lead: "Wafa: 5 × 20 − 5 × 2. Jamal: 5 × 10 + 5 × 8. Both get 90.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing overshoot and split", "Checking both reach 90", "Choosing by the numbers"],
        connect: "Which strategy would you choose for 6 × 49?",
        misconception: "Believing one strategy must always be used." } },

    { phase: "synth", title: "On the <em>board</em>: change the numbers, protect the product",
      lead: "Draw the rectangle. Change its shape. Count that the squares never left.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Watching the area stay fixed", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Changing one factor without protecting the product." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "6 × 49 in your head. What do you take off after 6 × 50?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say the strategy out loud.",
        monitor: ["Stretching 49 to 50", "Counting six ones", "Subtracting 6 from 300"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Taking off 1 instead of 6 — one extra per row." } },

    { phase: "connect", title: "The order is <em>updated</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: three methods at the gate — three contractors, one order.",
      rail: { launch: "Ask three students to say their strategy in their own words.",
        monitor: ["Able to explain the strategy", "Still adds by repeated rows", "Ready to choose between methods"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [cut, setCut] = useState(false);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The delayed delivery"
            text="The delivery note is late and the paper is gone. Five rows of 18 prayer mats at the market — the order must be updated in the air."
            clue="A friendly number is one step away">
            <NoticeWonder draw={drawMarket} height={252} award={award}
              notices={["There are 5 rows", "Each row has 18", "18 is near 20", "There is no paper"]}
              wonders={["How many mats in total?", "Can I change the rows and keep the total?", "Which change is friendliest?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Five rows of eighteen mats"
            text="Omar asks for the mental total before the order is updated — no pencil, just the numbers."
            clue="5 × 20 is easy. 5 × 18 is not — yet.">
            <LaunchEstimate draw={drawMarket} height={252} award={award}
              label="How many prayer mats?" min={40} max={160} start={90} unit="mats"
              after="Locked. Now let us see what your brain did to make it easy."
              note="The market counts are simulated — the strategies work on any product." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd stretches to 20, then cuts"
            text="He can stretch the rows to 20 — the class must say what has to be taken back."
            clue="You added 2 to every one of the 5 rows">
            <ExploreChips draw={makeCompensate(cut, setCut)} height={252}
              label="Stretch it to 20, then cut the extra off"
              value={cut ? 1 : 0}
              onPick={(v) => setCut(v === 1)}
              chips={[{ v: 0, label: "5 × 18" }, { v: 1, label: "stretch to 5 × 20" }]}
              caption={<MathEl omml={M.compensate} size="xl" display="block" />}
              footnote="You added 2 to every one of the 5 rows — so you must take off 5 twos." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar doubles and halves"
            text="His rectangle changes shape — twice as many rows, half as long — but the squares never leave."
            clue="5 × 18 = 10 × 9 — the same squares, a new shape">
            <ExploreChips draw={makeDoubleHalve(step, setStep)} height={252}
              label="Reshape the rectangle"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "5 × 18" }, { v: 1, label: "double and halve" }]}
              caption={<MathEl omml={M.doubleHalve} size="xl" display="block" />}
              footnote="Twice as many rows, half as long — the squares never left." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Name the strategy"
            text="Omar and Zayd lay three pieces of working on the table. Each one is a different strategy."
            clue="Read each working before you place it">
            <CardSort award={award} columns={3}
              items={[
                { id: "w1", text: "5 × 20 − 5 × 2", target: "comp" },
                { id: "w2", text: "5 × 10 + 5 × 8", target: "split" },
                { id: "w3", text: "10 × 9", target: "reshape" }
              ]}
              targets={[
                { id: "comp", label: "compensation — overshoot, then take back" },
                { id: "split", label: "breaking apart by place value" },
                { id: "reshape", label: "double one, halve the other" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 90"
            text="Wafa overshoots to 20 and takes back. Jamal splits the 18 into 10 and 8. Both get 90."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Wafa's way — overshoot", omml: M.compensate, h: 92,
                      quote: "I did 5 times 20, then took off the two extra in each row." }}
              right={{ name: "Jamal's way — split it", omml: M.breakApart, h: 92,
                       quote: "Ten of them, then eight of them." }}
              same={["Both get 90", "Both avoid writing it down", "Both use a friendly number"]}
              diff={["Wafa subtracts at the end, Jamal adds", "Jamal never overshoots",
                     "Wafa's is faster when the number is near a ten"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The strategy is drawn, not declared"
            text="Zayd builds only what the class can justify: the shape changed, the product protected."
            clue="Change the numbers, protect the product">
            <BoardScreen draw={drawBoard36} height={430}
              caption="Change the numbers, protect the product." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar updates the order in the air"
            text="6 × 49. Say the strategy first — then the number you take off."
            clue="Stretching 49 to 50 adds 1 to each of the 6 rows">
            <ShowWhatYouKnow award={award}
              prompt="Work out 6 × 49 in your head. What do you take off after 6 × 50?"
              omml={M.swyk}
              options={[{ v: "a", text: "1" }, { v: "b", text: "6" }, { v: "c", text: "50" }, { v: "d", text: "49" }]}
              right="b"
              support={{
                yes: "Yes — 6 × 50 = 300, take off 6, so 294.",
                notYet: "Not yet — you added 1 to each of the six groups.",
                draw: drawSupport36, h: 96,
                hint: "You stretched 49 to 50. That is 1 extra in every one of the 6 rows."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The order is updated"
            text="Omar updates the order in the air and signs it from memory. At the gate, three contractors step up to the same order — each holding a different multiplication strategy."
            artifact="Grove plan · order updated mentally"
            next="Three methods at the gate — three contractors, one order. Which strategy earns the contract?">
            <Closing game={game} omml={M.rule}
              action="Change a product in your head tonight — stretch, split or reshape — and say which you chose and why." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
