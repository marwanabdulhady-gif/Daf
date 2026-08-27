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
    { phase: "warmup", title: "The final <em>production schedule</em>",
      lead: "47 × 28, but written as a column: four lines, four colours, each line matched to a region of the model.",
      goal: "Notice the record can be shorter — the rectangle becomes a column of four.",
      pull: "Do I still need the rectangle?",
      rail: { launch: "Fictional frame. Look at the link between model and lines — no total yet.",
        monitor: ["Matching colours to regions", "Reading the four lines", "Wonding if the rectangle is needed"],
        connect: "What does the column save, and what must it keep?",
        misconception: "Dropping the model and the lines with it." } },

    { phase: "launch", title: "About how many <em>tiles</em>?",
      lead: "47 × 28. Lock the estimate before the schedule is shortened.",
      goal: "Estimate the product before the column form.",
      pull: "Drawing a rectangle for every product would take all lesson.",
      rail: { launch: "Give the estimate and what you rounded.",
        monitor: ["Rounding 47 to 50", "Rounding 28 to 30", "Multiplying 50 × 30"],
        connect: "What will the first line of the column be near?",
        misconception: "Estimating by the two smallest regions." } },

    { phase: "monitor", title: "Zayd links the <em>model and the lines</em>",
      lead: "Each line is a region, in colour. Ones first, then tens — the same order every time.",
      goal: "Write the four partial products in a column that matches the model.",
      pull: "Ones first, then tens — the same order every time.",
      rail: { launch: "Before each line: which region is it?",
        monitor: ["Writing the ones × ones line", "Writing the cross lines", "Writing the tens × tens line"],
        connect: "Why can the order never be random?",
        misconception: "Writing the lines in any order and losing track." } },

    { phase: "monitor", title: "What if a line is <em>missing</em>?",
      lead: "The schedule has a gap. Find the missing region and repair the total.",
      goal: "A missing line changes the total by a whole region — find it and fix it.",
      pull: "Count your lines. There should be four.",
      rail: { launch: "Before you tap: which region is missing?",
        monitor: ["Counting the lines", "Finding the missing colour", "Repairing the total"],
        connect: "How much was the total short by?",
        misconception: "Adding the three lines and calling the total done." } },

    { phase: "monitor", title: "Complete or <em>incomplete</em>?",
      lead: "Four sums from the schedule. Some are complete — all four regions; some have a gap.",
      goal: "Check a partial-product list for missing regions.",
      pull: "Complete means four regions, all of them.",
      rail: { launch: "Count the parts in each sum before you place it.",
        monitor: ["Counting four parts", "Spotting a dropped corner", "Comparing to the model"],
        connect: "Which missing part hurts the total most?",
        misconception: "Treating any three-part sum as complete." } },

    { phase: "connect", title: "Salem starts with the <em>ones</em>. Bandar starts with the <em>tens</em>",
      lead: "Salem: ones first, like column addition. Bandar: biggest region first, so she can check early. Both get 1,316.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the starting regions", "Checking both add to 1,316", "Saying which order feels safer"],
        connect: "Which starting region would you check against your estimate first?",
        misconception: "Believing the order changes the total." } },

    { phase: "synth", title: "On the <em>board</em>: four products, one column, added once",
      lead: "Write the four lines. Add them once. The rectangle is the check behind the column.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next line", "Matching lines to regions", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Adding the lines twice, or adding digits instead of lines." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "Four products. Written in a column. Added once.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the four lines", "Checking the add-back", "Testing on a new product"],
        connect: "Which line is easiest to write wrong?",
        misconception: "Writing 4 × 8 as 32 in the hundreds place." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "52 × 34 — the column, four lines, added once.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write all four lines.",
        monitor: ["Writing 50 × 30", "Writing the cross lines", "Adding 1,500 + 60 + 800 + 32"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 1,568 — the 200 was dropped." } },

    { phase: "connect", title: "The schedule is <em>final</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the lift is jammed, and the obvious plan fails midway.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain the column", "Still drops a line", "Ready for problem solving"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(1);
    const [fixed, setFixed] = useState(false);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The final production schedule"
            text="47 × 28, written as a column: four lines, four colours, each line matched to a region of the model."
            clue="Do I still need the rectangle?">
            <NoticeWonder draw={makeLink(4)} height={262} award={award}
              notices={["Four regions and four lines", "The colours match", "The biggest number is 800", "They add to 1,316"]}
              wonders={["Do I still need the rectangle?", "Does the order matter?", "What if I miss one?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the shortening"
            text="Omar asks for the estimate before the schedule is shortened — the column must stay near it."
            clue="Drawing a rectangle for every product would take all lesson.">
            <LaunchEstimate draw={drawGarden46} height={256} award={award}
              label="About how many tiles?" min={800} max={2200} start={1500} unit="tiles"
              after="Locked. Now let us shorten the record."
              note="The schedule counts are simulated — the column works on any two-digit by two-digit." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd links the model and the lines"
            text="He can write one line at a time — the class must name the region each line stands for."
            clue="Ones first, then tens — the same order every time.">
            <ExploreChips draw={makeLink(step)} height={262}
              label="Write one line at a time"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 1, label: "line 1" }, { v: 2, label: "+ line 2" }, { v: 3, label: "+ line 3" }, { v: 4, label: "+ line 4" }]}
              caption={<MathEl omml={M.parts} size="lg" display="block" />}
              footnote="Each line is a region, in colour — the rectangle is the check behind the column." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="What if a line is missing?"
            text="The schedule has a gap. Omar finds the missing region and repairs the total."
            clue="Count your lines. There should be four.">
            <ExploreChips draw={makeMissing(fixed)} height={262}
              label="Find the missing line"
              value={fixed ? 1 : 0}
              onPick={(v) => setFixed(v === 1)}
              chips={[{ v: 0, label: "the gap" }, { v: 1, label: "repair it" }]}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="A missing line changes the total by a whole region." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Complete or incomplete?"
            text="Omar and Zayd lay four sums from the schedule on the table. Some are complete; some have a gap."
            clue="Complete means four regions, all of them">
            <CardSort award={award} columns={2} commitLabel="Check the schedule"
              items={[
                { id: "r1", text: "800 + 320 + 140 + 56", target: "ok" },
                { id: "r2", text: "320 + 140 + 56", target: "no" },
                { id: "r3", text: "600 + 240 + 120 + 48", target: "ok" },
                { id: "r4", text: "600 + 48", target: "no" }
              ]}
              targets={[
                { id: "ok", label: "complete — four partial products" },
                { id: "no", label: "incomplete — a region is missing" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 1,316"
            text="Salem starts with the ones. Bandar starts with the biggest region. Both get 1,316."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Salem's way — ones first", omml: M.parts, h: 92,
                      quote: "I always start with the ones, like column addition." }}
              right={{ name: "Bandar's way — tens first", omml: M.answer, h: 92,
                       quote: "I start with the biggest region so I can check it early." }}
              same={["Both write four lines", "Both add once at the end", "Both get 1,316"]}
              diff={["Salem starts small, Bandar starts big",
                     "Bandar can compare her first line with her estimate",
                     "Salem's order matches the algorithm he already knows"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The schedule is drawn, not declared"
            text="Zayd builds only what the class can justify: the four lines written, the regions matched, the single add."
            clue="Four products · written in a column · added once">
            <BoardScreen draw={drawBoard46} height={430}
              caption="Four products · written in a column · added once." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the tower's plan with its reason, not alone."
            clue="The rectangle is the check behind the column">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "four products written in a column, added once" }]}
              hand={"write the four products in a column · match each line to a region · add once"}
              cards={[
                { title: "The schedule we built", omml: M.answer, note: "our estimate was 1,500" },
                { title: "Tap to see the order", omml: M.parts, revealOmml: M.order, reveal: true,
                  note: "ones first, then tens — the same order every time" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a schedule with four lines"
            text="52 × 34. Write the column — and all four lines."
            clue="1,500 + 60 + 800 + 32 = 1,768">
            <ShowWhatYouKnow award={award}
              prompt="Use partial products to work out 52 × 34."
              omml={M.swyk}
              options={[{ v: "a", text: "1,668" }, { v: "b", text: "1,768" }, { v: "c", text: "268" }, { v: "d", text: "1,560" }]}
              right="b"
              support={{
                yes: "Yes — 1,500 + 60 + 800 + 32 = 1,768, and 50 × 30 = 1,500 says that is reasonable.",
                notYet: "Not yet — count your lines. There should be four.",
                draw: drawSupport46, h: 92,
                hint: "The four regions are 50×30, 50×4, 2×30 and 2×4."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The schedule is final"
            text="Omar signs the schedule with the model behind it. Then the lift shudders and stops — the depot's plan for the morning fails midway, and the team must persevere."
            artifact="Tower plan · final production schedule"
            next="The lift is jammed and the obvious plan fails midway — the team must persist and revise without guessing.">
            <Closing game={game} omml={M.rule}
              action="Write a two-digit by two-digit product as a column of four tonight and match each line to its region." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
