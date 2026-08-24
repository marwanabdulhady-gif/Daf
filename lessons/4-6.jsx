/* ===========================================================================
   Grade 4 · Topic 4 · LESSON 4-6 · Use Partial Products to Multiply by 2-Digit
   Numbers                            Standard 4.NBT.B.5
   I can ... record four partial products without drawing the rectangle.
   =========================================================================== */

const M = {
  problem: om(mt("47\u00d728")),
  answer: om(mt("47\u00d728=1,316")),
  parts: om(mt("800+320+140+56")),
  order: om(mnor("ones first, then tens \u2014 the same order every time")),
  estimate: om(mt("50\u00d730=1,500")),
  rule: om(mnor("four products \u00b7 written in a column \u00b7 added once")),
  swyk: om(mt("52\u00d734")),
  swykAnswer: om(mt("1,500+60+800+32=1,768"))
};

const ROWS = [{ v: 40 }, { v: 7 }];
const COLS = [{ v: 20 }, { v: 8 }];

/* the grid and the written record, side by side */
const makeLink = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const gw = (W - 120) * 0.46;
  D.areaModel2(ctx, { x: 62, y: 66, w: gw, h: 104, rows: ROWS, cols: COLS,
    prog: step / 4, showSum: false });

  const list = [[7, 8, 56], [7, 20, 140], [40, 8, 320], [40, 20, 800]];
  const palette = ["#388C46", "#6042A6", "#FA7E19", "#2D70B3"];
  const rx = W - 96;
  D.txt(ctx, "47", rx, 46, { size: 19, col: "#EAF4F2", font: "marker", align: "right" });
  D.txt(ctx, "\u00d7 28", rx, 72, { size: 19, col: "#EAF4F2", font: "marker", align: "right" });
  D.marker(ctx, [[rx - 92, 84], [rx + 6, 84]], 1, "rgba(234,244,242,.7)", 1.8);
  list.forEach(function (p, k) {
    const a = k < step ? 1 : 0.16;
    D.txt(ctx, String(p[2]), rx, 108 + k * 27,
      { size: 18, col: palette[k], font: "marker", align: "right", alpha: a });
    D.txt(ctx, p[0] + "\u00d7" + p[1], rx - 60, 108 + k * 27,
      { size: 10.5, col: palette[k], font: "mono", weight: 600, align: "right", alpha: a });
  });
  if (step === 4) {
    D.marker(ctx, [[rx - 92, 222], [rx + 6, 222]], 1, "rgba(201,162,39,.6)", 1.8);
    D.txt(ctx, "1,316", rx, 246, { size: 22, col: "#34D399", font: "marker", align: "right" });
  }
  D.txt(ctx, step === 4 ? "each region became one line of the record"
                        : "watch a region turn into a line",
    W / 2, H - 14, { size: 13, col: step === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

/* spot the missing partial product */
const makeMissing = (fixed) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const list = [[56, true], [140, true], [320, true], [800, fixed]];
  const rx = W / 2 + 60;
  D.txt(ctx, "47", rx, 52, { size: 20, col: "#EAF4F2", font: "marker", align: "right" });
  D.txt(ctx, "\u00d7 28", rx, 80, { size: 20, col: "#EAF4F2", font: "marker", align: "right" });
  D.marker(ctx, [[rx - 96, 94], [rx + 6, 94]], 1, "rgba(234,244,242,.7)", 1.8);
  list.forEach(function (p, k) {
    if (!p[1]) {
      ctx.save();
      ctx.globalAlpha = 0.5 + Math.sin(frame / 12) * 0.3;
      D.rr(ctx, rx - 96, 104 + k * 30, 102, 26, 5);
      ctx.strokeStyle = "#C74440"; ctx.lineWidth = 1.8; ctx.setLineDash([4, 3]); ctx.stroke();
      ctx.restore();
      D.txt(ctx, "?", rx - 44, 122 + k * 30, { size: 18, col: "#C74440", font: "marker" });
      return;
    }
    D.txt(ctx, String(p[0]), rx, 122 + k * 30, { size: 19, col: "#EAF4F2", font: "marker", align: "right" });
  });
  D.marker(ctx, [[rx - 96, 232], [rx + 6, 232]], 1, "rgba(201,162,39,.6)", 1.8);
  D.txt(ctx, fixed ? "1,316" : "516", rx, 256,
    { size: 22, col: fixed ? "#34D399" : "#C74440", font: "marker", align: "right" });
  D.txt(ctx, fixed ? "with 40 \u00d7 20 = 800 back in, the answer is right"
                   : "the biggest region has been left out",
    W / 2, H - 16, { size: 14, col: fixed ? "#34D399" : "#C74440", font: "marker" });
};

const drawGarden46 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 350), p3 = D.at(f, 360, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "tiles for the school garden", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.areaModel2(ctx, { x: 90, y: 56, w: W - 160, h: 100, rows: ROWS, cols: COLS, prog: p2, showSum: false });
  if (p3 > 0) D.txt(ctx, "47 by 28 \u2014 how many tiles?", W / 2, H - 16,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard46 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "From four regions to four lines" });
  const p1 = D.at(f, 20, 260), p2 = D.at(f, 280, 480), p3 = D.at(f, 500, 680);
  const gw = (W - 240) * 0.5;
  D.areaModel2(ctx, { x: 108, y: 112, w: gw, h: 130, rows: ROWS, cols: COLS, prog: p1, showSum: false });
  if (p2 > 0) {
    const list = [[7, 8, 56], [7, 20, 140], [40, 8, 320], [40, 20, 800]];
    const palette = ["#388C46", "#6042A6", "#FA7E19", "#2D70B3"];
    const rx = W - 132;
    list.forEach(function (p, k) {
      const a = D.at(p2, k / 4, k / 4 + 0.5);
      if (a <= 0) return;
      D.txt(ctx, String(p[2]), rx, 128 + k * 32,
        { size: 20, col: palette[k], font: "marker", align: "right", alpha: a });
      D.marker(ctx, [[108 + gw + 12, 128 + k * 32], [rx - 68, 128 + k * 32]], a, "rgba(201,162,39,.3)", 1.2);
    });
    D.marker(ctx, [[rx - 96, 262], [rx + 6, 262]], D.at(f, 420, 500), "rgba(201,162,39,.6)", 1.8);
    D.txt(ctx, "1,316", rx, 288, { size: 24, col: "#34D399", font: "marker", align: "right", alpha: D.at(f, 440, 520) });
  }
  if (p3 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the rectangle can go \u2014 the four lines carry everything",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 550, 640) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 590, 690), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport46 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel2(ctx, { x: 52, y: 22, w: W - 96, h: 56,
    rows: [{ v: 50 }, { v: 2 }], cols: [{ v: 30 }, { v: 4 }], prog: 1, showSum: false });
};

const LESSON = {
  code: "4-6",
  storageKey: "daf-g4-t4-l6",
  title: "Use Partial Products to Multiply by 2-Digit Numbers",
  unit: "GRADE 4 · TOPIC 4 · LESSON 4-6 · 4.NBT.B.5",
  math: M,
  ixl: ["XLZ", "MLC", "GZG"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A rectangle on the left, a written record on the right. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Four regions. Four lines. That is not a coincidence.",
      rail: { launch: "I am not asking for a total. Just look at both sides.",
        monitor: ["Matching a region to a line", "Counting four of each", "Reading the numbers"],
        connect: "Who noticed something nobody else did?",
        misconception: "Treating the written record as a different method." } },

    { phase: "launch", title: "Forty-seven by <em>twenty-eight</em>",
      lead: "The garden needs tiles. Drawing the rectangle every time is slow.",
      goal: "Create the need — keep the mathematics, drop the drawing.",
      pull: "Estimate first, then we will shorten the record.",
      rail: { launch: "Roughly how many tiles? Round both.",
        monitor: ["Rounding to 50 x 30", "Drawing the grid", "Going straight to a written method"],
        connect: "What is the drawing actually doing for you?",
        misconception: "Believing the rectangle is the mathematics rather than a picture of it." } },

    { phase: "monitor", title: "Each region becomes a <em>line</em>",
      lead: "Fill a region and watch it appear in the column on the right.",
      goal: "Connect the model to the written record, one piece at a time.",
      pull: "What happens if a line goes missing?",
      rail: { launch: "Predict which line will appear next.",
        monitor: ["Matching region to line", "Working in a fixed order", "Losing track of which is done"],
        connect: "Why is it worth always working in the same order?",
        misconception: "Writing the lines in a random order and losing one." } },

    { phase: "monitor", title: "Find the <em>missing part</em>",
      lead: "This record gives 516. The real answer is 1,316. What went wrong?",
      goal: "The biggest region is the easiest to forget and the most costly.",
      pull: "Now sort some records as complete or not.",
      rail: { launch: "Do not recalculate. Look at what is written.",
        monitor: ["Comparing against an estimate", "Counting the lines", "Recalculating everything"],
        connect: "How would an estimate have caught this?",
        misconception: "Trusting a written answer that is nowhere near the estimate." } },

    { phase: "monitor", title: "Complete or <em>not</em>?",
      lead: "Sort each record. No grading until the class commits.",
      goal: "Check a record by counting its parts.",
      pull: "Two students ordered their lines differently.",
      rail: { launch: "Count the lines before you add anything.",
        monitor: ["Counting to four", "Estimating first", "Adding it all up"],
        connect: "What is the quickest check?",
        misconception: "Assuming a neat record is a complete one." } },

    { phase: "connect", title: "Two <em>orders</em>, one answer",
      lead: "Salem started with the ones. Dana started with the tens. Both got 1,316.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Starting from the ones", "Starting from the tens", "Keeping a fixed habit"],
        connect: "Does the order change the answer? Does it change the risk?",
        misconception: "Believing one order is mathematically required." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Four regions become four lines. Add them once, at the end.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next line", "Matching to the region", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Adding as you go and losing a partial product." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the four products", "Testing on a new pair", "Checking against an estimate"],
        connect: "How many lines would a three-digit factor need?",
        misconception: "Thinking there are always exactly four lines." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write all four lines, then add once.",
        monitor: ["Writing four lines", "Estimating first", "Adding correctly"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Leaving out the 50 x 30 line." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: problems that need more than one calculation.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the grid", "Ready for multi-step problems"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(1);
    const [fixed, setFixed] = useState(false);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeLink(4)} height={262} award={award}
          notices={["Four regions and four lines", "The colours match", "The biggest number is 800", "They add to 1,316"]}
          wonders={["Do I still need the rectangle?", "Does the order matter?", "What if I miss one?"]} />;

      case 1:
        return <LaunchEstimate draw={drawGarden46} height={256} award={award}
          label="About how many tiles?" min={800} max={2200} start={1500} unit="tiles"
          after="Locked. Now let us shorten the record."
          note="Drawing a rectangle for every product would take all lesson." />;

      case 2:
        return <ExploreChips draw={makeLink(step)} height={262}
          label="Turn each region into a line"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 1, label: "7 × 8" }, { v: 2, label: "7 × 20" }, { v: 3, label: "40 × 8" }, { v: 4, label: "40 × 20" }]}
          caption={<MathEl omml={M.parts} size="lg" display="block" />}
          footnote="Ones first, then tens — a fixed order is what stops you losing one." />;

      case 3:
        return <ExploreChips draw={makeMissing(fixed)} height={262}
          label="This record gives 516. Fix it."
          value={fixed ? 1 : 0}
          onPick={(v) => setFixed(v === 1)}
          chips={[{ v: 0, label: "as written" }, { v: 1, label: "add the missing line" }]}
          caption={<MathEl omml={fixed ? M.answer : M.estimate} size="xl" display="block" />}
          footnote="An estimate of 1,500 would have caught this instantly." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "r1", text: "800 + 320 + 140 + 56", target: "ok" },
            { id: "r2", text: "320 + 140 + 56", target: "no" },
            { id: "r3", text: "600 + 240 + 120 + 48", target: "ok" },
            { id: "r4", text: "600 + 48", target: "no" }
          ]}
          targets={[
            { id: "ok", label: "complete — four partial products" },
            { id: "no", label: "incomplete — a region is missing" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Salem's way — ones first", omml: M.parts, h: 92,
                  quote: "I always start with the ones, like column addition." }}
          right={{ name: "Dana's way — tens first", omml: M.answer, h: 92,
                   quote: "I start with the biggest region so I can check it early." }}
          same={["Both write four lines", "Both add once at the end", "Both get 1,316"]}
          diff={["Salem starts small, Dana starts big",
                 "Dana can compare her first line with her estimate",
                 "Salem's order matches the algorithm he already knows"]} />;

      case 6:
        return <BoardScreen draw={drawBoard46} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "four products, written in a column, added once" }]}
          hand={"split both factors \u00b7 write four products in a fixed order \u00b7 add once at the end"}
          cards={[
            { title: "The product we recorded", omml: M.answer, note: "our estimate was 1,500" },
            { title: "Tap to see the order", omml: M.parts, revealOmml: M.order, reveal: true,
              note: "a fixed order is what protects you" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Use partial products to work out 52 × 34."
          omml={M.swyk}
          options={[{ v: "a", text: "1,668" }, { v: "b", text: "1,768" }, { v: "c", text: "268" }, { v: "d", text: "1,560" }]}
          right="b"
          support={{
            yes: "Yes — 1,500 + 60 + 800 + 32 = 1,768, and 50 × 30 = 1,500 says that is reasonable.",
            notYet: "Not yet — count your lines. There should be four.",
            draw: drawSupport46, h: 92,
            hint: "The four regions are 50×30, 50×4, 2×30 and 2×4."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Multiply two two-digit numbers tonight using four lines, and check against an estimate first." />;

      default: return null;
    }
  }
};
