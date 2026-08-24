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
const makeCompensate = (cut) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
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
const makeDoubleHalve = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
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
    { phase: "warmup", title: "Which strategy <em>doesn't belong</em>?",
      lead: "Four ways to work out 5 × 18. Every one has a reason.",
      goal: "Reasoning before answers — no card is wrong.",
      pull: "All four give 90. They do not all cost the same effort.",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reasoning from ease", "Reasoning from the property used", "Reasoning from the number of steps"],
        connect: "Can every card be the odd one out?",
        misconception: "Assuming the shortest method is always the best." } },

    { phase: "launch", title: "Five rows of <em>eighteen</em>",
      lead: "The hall needs 5 rows of 18 prayer mats. No pencil.",
      goal: "Create the need — 18 is awkward, 20 is not.",
      pull: "Estimate first, then we will make it friendly.",
      rail: { launch: "Hands down. What is the total, and what did your brain do first?",
        monitor: ["Adding 18 five times", "Using 5 x 20", "Splitting 18 into 10 and 8"],
        connect: "Who changed a number before multiplying?",
        misconception: "Believing mental maths means picturing the written method." } },

    { phase: "monitor", title: "Overshoot, then <em>take it back</em>",
      lead: "Multiply by 20 instead, then remove what you added.",
      goal: "Compensation in multiplication removes a whole group, not one unit.",
      pull: "There is another trick hiding in these numbers.",
      rail: { launch: "Predict how much you will have to take off.",
        monitor: ["Taking off 2", "Taking off 5 x 2", "Explaining why it is 10"],
        connect: "Why do you take off 10 and not 2?",
        misconception: "Subtracting 2 instead of 5 groups of 2." } },

    { phase: "monitor", title: "Double one, <em>halve the other</em>",
      lead: "Twice as many rows, half as long. The rectangle keeps its area.",
      goal: "The associative property, seen as a reshaped rectangle.",
      pull: "Name each strategy when you meet it.",
      rail: { launch: "Predict the new pair of numbers before you tap.",
        monitor: ["Doubling and halving correctly", "Doubling both", "Checking the product"],
        connect: "Why does the product not change?",
        misconception: "Doubling one factor without halving the other." } },

    { phase: "monitor", title: "Name the <em>strategy</em>",
      lead: "Match each piece of working to its strategy. No grading until the class commits.",
      goal: "Name the strategies so students can choose one on purpose.",
      pull: "Two students used different strategies on the same numbers.",
      rail: { launch: "Read each one out loud before you place it.",
        monitor: ["Spotting a changed factor", "Spotting a split", "Spotting a doubling"],
        connect: "Which strategy suits numbers ending in 9?",
        misconception: "Calling every mental method compensation." } },

    { phase: "connect", title: "Two ways to <em>make it easy</em>",
      lead: "Wafa overshot to 20. Jamal split 18 into 10 and 8. Both got 90.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Overshooting", "Splitting", "Choosing by the numbers given"],
        connect: "Which would you choose for 6 x 49?",
        misconception: "Believing one strategy must always be used." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Stretch the rectangle to 20, then cut off the piece you added.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the extra strip", "Naming its size", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting to undo the change." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the change and the undo", "Testing on a new product", "Choosing a strategy deliberately"],
        connect: "Which numbers make compensation worth using?",
        misconception: "Using compensation when the number is nowhere near a ten." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show what you changed and what you took off.",
        monitor: ["Using 6 x 50", "Taking off 6", "Taking off 1"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Taking off 1 instead of 6." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: choosing the right strategy for any product.",
      rail: { launch: "Ask three students to name a strategy and when they would use it.",
        monitor: ["Able to explain it to someone else", "Still needs the rectangle", "Ready to choose freely"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [cut, setCut] = useState(false);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Four ways to reach 5 × 18 = 90. Which one doesn't belong?"
          cards={[
            { id: "a", omml: M.compensate, why: "Overshoots to 20, then takes the extra back" },
            { id: "b", omml: M.breakApart, why: "Splits 18 by place value into 10 and 8" },
            { id: "c", omml: M.doubleHalve, why: "The only one that changes both factors at once" },
            { id: "d", text: "18+18+18+18+18", why: "The only one that does not multiply at all" }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawMarket} height={252} award={award}
          label="How many prayer mats?" min={40} max={160} start={90} unit="mats"
          after="Locked. Now let us see what your brain did to make it easy."
          note="5 x 20 is easy. 5 x 18 is not — yet." />;

      case 2:
        return <ExploreChips draw={makeCompensate(cut)} height={252}
          label="Stretch it to 20, then cut the extra off"
          value={cut ? 1 : 0}
          onPick={(v) => setCut(v === 1)}
          chips={[{ v: 0, label: "5 × 18" }, { v: 1, label: "stretch to 5 × 20" }]}
          caption={<MathEl omml={M.compensate} size="xl" display="block" />}
          footnote="You added 2 to every one of the 5 rows — so you must take off 5 twos." />;

      case 3:
        return <ExploreChips draw={makeDoubleHalve(step)} height={252}
          label="Reshape the rectangle"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "5 × 18" }, { v: 1, label: "double and halve" }]}
          caption={<MathEl omml={M.doubleHalve} size="xl" display="block" />}
          footnote="Twice as many rows, half as long — the squares never left." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[
            { id: "w1", text: "5 × 20 − 5 × 2", target: "comp" },
            { id: "w2", text: "5 × 10 + 5 × 8", target: "split" },
            { id: "w3", text: "10 × 9", target: "reshape" }
          ]}
          targets={[
            { id: "comp", label: "compensation — overshoot, then take back" },
            { id: "split", label: "breaking apart by place value" },
            { id: "reshape", label: "double one, halve the other" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Wafa's way — overshoot", omml: M.compensate, h: 92,
                  quote: "I did 5 times 20, then took off the two extra in each row." }}
          right={{ name: "Jamal's way — split it", omml: M.breakApart, h: 92,
                   quote: "Ten of them, then eight of them." }}
          same={["Both get 90", "Both avoid writing it down", "Both use a friendly number"]}
          diff={["Wafa subtracts at the end, Jamal adds", "Jamal never overshoots",
                 "Wafa's is faster when the number is near a ten"]} />;

      case 6:
        return <BoardScreen draw={drawBoard36} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "change the numbers, protect the product" }]}
          hand={"make one factor friendly · do the easy multiplication · then undo exactly what you changed"}
          cards={[
            { title: "The product we built", omml: M.compensate, note: "5 rows, 2 extra in each" },
            { title: "Tap for another strategy", omml: M.problem, revealOmml: M.doubleHalve, reveal: true,
              note: "double one factor, halve the other" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Work out 6 × 49 in your head. What do you take off after 6 × 50?"
          omml={M.swyk}
          options={[{ v: "a", text: "1" }, { v: "b", text: "6" }, { v: "c", text: "50" }, { v: "d", text: "49" }]}
          right="b"
          support={{
            yes: "Yes — 6 × 50 = 300, take off 6, so 294.",
            notYet: "Not yet — you added 1 to each of the six groups.",
            draw: drawSupport36, h: 96,
            hint: "You stretched 49 to 50. That is 1 extra in every one of the 6 rows."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Multiply a price ending in 9 by a small number in your head tonight, using overshoot and take back." />;

      default: return null;
    }
  }
};
