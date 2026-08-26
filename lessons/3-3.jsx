/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-3 · Use Arrays and Partial Products to Multiply
   Standard 4.NBT.B.5   I can ... break an array at the tens and add the
   partial products.
   =========================================================================== */

const M = {
  problem: om(mt("4×23")),
  splitTens: om(mt("4×20=80")),
  splitOnes: om(mt("4×3=12")),
  total: om(mt("80+12=92")),
  answer: om(mt("4×23=92")),
  rule: om(mnor("split at the ten · multiply each part · add the parts")),
  swyk: om(mt("3×26")),
  swykAnswer: om(mt("60+18=78"))
};

const makeArraySplit = (split, onSplit) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onSplit) D.tap(ctx, { x: 0, y: 0, w: W, h: H, value: 0, on: () => onSplit(!split) });
  const cell = 11, gap = 2;
  const gw = 23 * (cell + gap) + (split ? 18 : 0);
  const x = W / 2 - gw / 2, y = 62;
  D.array(ctx, { x: x, y: y, rows: 4, cols: 23, cell: cell, gap: gap,
    splitAt: split ? 20 : 0, splitGap: 18, col: "#2D70B3", col2: "#FA7E19", prog: 1 });
  D.txt(ctx, "4", x - 18, y + 26, { size: 19, col: "#C9A227", font: "marker" });
  if (split) {
    D.txt(ctx, "20", x + 10 * (cell + gap), y - 16, { size: 15, col: "#2D70B3", font: "marker" });
    D.txt(ctx, "3", x + 21.5 * (cell + gap) + 18, y - 16, { size: 15, col: "#FA7E19", font: "marker" });
    D.txt(ctx, "4 × 20 = 80", x + 10 * (cell + gap), y + 78, { size: 15, col: "#2D70B3", font: "marker" });
    D.txt(ctx, "4 × 3 = 12", x + 21.5 * (cell + gap) + 18, y + 78, { size: 14, col: "#FA7E19", font: "marker" });
    D.txt(ctx, "80 + 12 = 92", W / 2, H - 20, { size: 18, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, "23", x + 11.5 * (cell + gap), y - 16, { size: 15, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, "counting all 92 squares would take a while", W / 2, H - 20,
      { size: 13.5, col: "#C9A227", font: "marker" });
  }
};

const makePartials = (shown, onShown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [["4 × 20", 80, "#2D70B3"], ["4 × 3", 12, "#FA7E19"]];
  rows.forEach((r, n) => {
    const a = n < shown ? 1 : 0.2;
    if (onShown) D.tap(ctx, { x: W / 2 - 120, y: 74 + n * 46 - 20, w: 240, h: 40, value: n + 1, on: (v) => onShown(v) });
    D.txt(ctx, r[0], W / 2 - 60, 74 + n * 46, { size: 20, col: r[2], font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 34, 74 + n * 46, { size: 17, col: "rgba(234,244,242,.6)", font: "marker", alpha: a });
    D.txt(ctx, String(r[1]), W / 2 + 30, 74 + n * 46, { size: 22, col: "#EAF4F2", font: "marker", alpha: a });
  });
  if (shown >= 2) {
    D.marker(ctx, [[W / 2 - 110, 148], [W / 2 + 70, 148]], 1, "rgba(201,162,39,.6)", 1.8);
    D.txt(ctx, "92", W / 2 + 30, 178, { size: 26, col: "#34D399", font: "marker" });
    D.txt(ctx, "these are called partial products", W / 2, H - 18,
      { size: 13.5, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, "one part at a time", W / 2, H - 18, { size: 13.5, col: "#C9A227", font: "marker" });
  }
};

const drawChairs = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school hall", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const cell = 9, gap = 2;
  const gw = 23 * (cell + gap);
  D.array(ctx, { x: W / 2 - gw / 2, y: 48, rows: 4, cols: 23, cell: cell, gap: gap,
    col: "#12857C", prog: p2 });
  if (p3 > 0) {
    D.txt(ctx, "4 rows of 23 chairs", W / 2, 112, { size: 14, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many chairs?", W / 2, H - 18, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard33 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Break it where it is friendly" });
  const p1 = D.at(f, 20, 180), p2 = D.at(f, 190, 340), p3 = D.at(f, 350, 520), p4 = D.at(f, 520, 680);
  const cell = 12, gap = 2;
  const split = p2 > 0.5;
  const gw = 23 * (cell + gap) + (split ? 20 : 0);
  const x = W / 2 - gw / 2, y = 104;
  D.array(ctx, { x: x, y: y, rows: 4, cols: 23, cell: cell, gap: gap,
    splitAt: split ? 20 : 0, splitGap: 20, col: "#2D70B3", col2: "#FA7E19", prog: p1 });
  D.txt(ctx, "4", x - 20, y + 28, { size: 20, col: "#C9A227", font: "marker", alpha: p1 });
  if (p2 > 0.5) {
    D.txt(ctx, "20", x + 10 * (cell + gap), y - 18, { size: 16, col: "#2D70B3", font: "marker", alpha: p2 });
    D.txt(ctx, "3", x + 21.5 * (cell + gap) + 20, y - 18, { size: 16, col: "#FA7E19", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "4 × 20 = 80", W / 2 - 90, y + 96, { size: 17, col: "#2D70B3", font: "marker", alpha: p3 });
    D.txt(ctx, "4 × 3 = 12", W / 2 + 90, y + 96, { size: 17, col: "#FA7E19", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 30], [W - 70, yb - 30]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "80 + 12 = 92 — the parts always add back to the whole",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 560, 640) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 600, 700), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport33 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cell = 8, gap = 2, gw = 26 * (cell + gap) + 14;
  D.array(ctx, { x: W / 2 - gw / 2, y: 16, rows: 3, cols: 26, cell: cell, gap: gap,
    splitAt: 20, splitGap: 14, col: "#2D70B3", col2: "#FA7E19", prog: 1 });
  D.txt(ctx, "3 × 20 = 60", W / 2 - 70, 68, { size: 13, col: "#2D70B3", font: "marker" });
  D.txt(ctx, "3 × 6 = 18", W / 2 + 70, 68, { size: 13, col: "#FA7E19", font: "marker" });
};

const LESSON = {
  code: "3-3",
  storageKey: "daf-g4-t3-l3",
  title: "Use Arrays and Partial Products to Multiply",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-3 · 4.NBT.B.5",
  math: M,
  ixl: ["GUB", "8UH"],

  metas: [
    { phase: "warmup", title: "Rows that <em>tell the total</em>",
      lead: "The grove opening in the school hall: 4 rows of 23 chairs. The plan shows equal rows — but the total count is hidden.",
      goal: "Notice the rectangle: rows times columns is a product.",
      pull: "One repeated row, multiplied, describes the whole hall.",
      rail: { launch: "Fictional frame. Look at the rows — no counting yet.",
        monitor: ["Noticing the 4 rows", "Counting one row's 23", "Seeing the rectangle"],
        connect: "What do the rows have that counting one by one does not?",
        misconception: "Counting all 92 chairs instead of using the rows." } },

    { phase: "launch", title: "About how many <em>chairs</em>?",
      lead: "4 × 23. Lock the estimate before the array is cut.",
      goal: "Estimate the array product first.",
      pull: "4 × 20 is easy. 4 × 23 is not — yet.",
      rail: { launch: "Give a total and what you rounded.",
        monitor: ["Rounding 23 to 20", "Multiplying 4 × 20", "Saying the answer is a bit more"],
        connect: "Why is the exact answer bigger than 80?",
        misconception: "Estimating the rows instead of the row length." } },

    { phase: "monitor", title: "Zayd cuts the <em>array</em>",
      lead: "Whole array, or split at the ten — the same squares, in two groups.",
      goal: "Split the array at a friendly number; nothing is added or removed.",
      pull: "The cut is a rename, like the trades in subtraction.",
      rail: { launch: "Before you tap: where should the cut go?",
        monitor: ["Cutting at 20", "Seeing 20 and 3", "Checking the total is unchanged"],
        connect: "Why does cutting not change the count?",
        misconception: "Believing the cut creates new squares." } },

    { phase: "monitor", title: "The <em>partial</em> products",
      lead: "4 × 20 and 4 × 3 — part of the answer, not the whole thing.",
      goal: "Multiply each piece, then add every piece back.",
      pull: "Partial means part of the answer. You need every part.",
      rail: { launch: "Which piece first — the tens or the ones?",
        monitor: ["Multiplying 4 × 20", "Multiplying 4 × 3", "Adding the parts back"],
        connect: "What would the answer be if one part was missing?",
        misconception: "Answering 80 and forgetting the ones part." } },

    { phase: "monitor", title: "Match the <em>split</em>",
      lead: "Three partial-product sums. Each one belongs to one array.",
      goal: "Read partial products back to their arrays.",
      pull: "The parts always add back to the whole.",
      rail: { launch: "Name the rows and the row length each sum describes.",
        monitor: ["Reading 80 + 12 as 4 × 23", "Reading 60 + 18 as 3 × 26", "Reading 100 + 25 as 5 × 25"],
        connect: "How do you know which array a sum belongs to?",
        misconception: "Matching by the total only, not the parts." } },

    { phase: "connect", title: "Ruba cuts <em>once</em>. Nasser cuts <em>twice</em>",
      lead: "Ruba: 20 and 3. Nasser: 10, 10 and 3. Both get 92.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the piece sizes", "Counting the parts", "Checking both add to 92"],
        connect: "Which cut is quicker, and which is safer?",
        misconception: "Believing only one cut point is allowed." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "Cut the factor at its tens. Multiply each piece. Add every piece back.",
      goal: "Generalise after the model, never before it.",
      pull: "A record you can re-check is a record people can trust.",
      rail: { launch: "Read it together, one voice — then read the window as history of the method.",
        monitor: ["Naming the split", "Naming the add-back", "Connecting repetition to the window"],
        connect: "Where else do repeated rows do the work of counting?",
        misconception: "Splitting the factor but dropping a part from the sum." } },

    { phase: "synth", title: "On the <em>board</em>: break it where it is friendly",
      lead: "Draw the array. Cut at the ten. The parts add back to the whole.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming each partial", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Cutting at a place that is not a ten." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "3 × 26 — partial products. The parts add back to the answer.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show both parts.",
        monitor: ["Splitting 26 at 20", "Multiplying each part", "Adding 60 + 18"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 68 — the tens and ones were added as digits." } },

    { phase: "connect", title: "The grove model <em>stands</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the roof split into useful parts.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain the split", "Still counts the whole array", "Ready for area models"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [split, setSplit] = useState(false);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Rows that tell the total"
            text="The grove opening in the school hall: 4 rows of 23 chairs. The plan shows equal rows — but the total count is hidden."
            clue="One repeated row, multiplied, describes the whole hall">
            <NoticeWonder draw={drawChairs} height={252} award={award}
              notices={["There are 4 rows", "Each row has 23", "It is a rectangle", "It is nearly 100 chairs"]}
              wonders={["How many chairs?", "Could I split it?", "Is there a quicker way than counting?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the cut"
            text="Omar asks for the estimate before the array is cut — 4 × 23, rounded at a friendly number."
            clue="4 × 20 is easy. 4 × 23 is not — yet.">
            <LaunchEstimate draw={drawChairs} height={252} award={award}
              label="About how many chairs?" min={40} max={160} start={92} unit="chairs"
              after="Locked. Now cut the array somewhere useful."
              note="The hall layout is simulated — the split works on any array." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd cuts the array at the ten"
            text="He can cut it at 20 or leave it whole — the class must see that nothing is added or removed."
            clue="The cut is a rename — like the trades in subtraction">
            <ExploreChips draw={makeArraySplit(split, setSplit)} height={256}
              label="Cut the array"
              value={split ? 1 : 0}
              onPick={(v) => setSplit(v === 1)}
              chips={[{ v: 0, label: "whole array" }, { v: 1, label: "split at 20" }]}
              caption={<MathEl omml={split ? M.total : M.problem} size="xl" display="block" />}
              footnote="Nothing was added or removed — the same squares, in two groups." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The partial products, one part at a time"
            text="He can reveal each partial — the class must say both parts before the total counts."
            clue="Partial means part of the answer. You need every part.">
            <ExploreChips draw={makePartials(shown, setShown)} height={252}
              label="Write the partial products"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[{ v: 1, label: "the tens part" }, { v: 2, label: "add the ones part" }]}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="Partial means part of the answer. You need every part." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the split"
            text="Omar and Zayd lay three partial-product sums on the table. Each one belongs to one array."
            clue="The parts always add back to the whole">
            <CardSort award={award} columns={3}
              items={[
                { id: "p1", text: "80 + 12", target: "a1" },
                { id: "p2", text: "60 + 18", target: "a2" },
                { id: "p3", text: "100 + 25", target: "a3" }
              ]}
              targets={[
                { id: "a1", label: "4 rows of 23" },
                { id: "a2", label: "3 rows of 26" },
                { id: "a3", label: "5 rows of 25" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 92"
            text="Ruba cuts once, at the ten. Nasser cuts twice, into two tens and a three. Both get 92."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Ruba's way — 20 and 3", omml: M.total, h: 92,
                      quote: "I cut it at the ten, so I only had two pieces." }}
              right={{ name: "Nasser's way — 10, 10 and 3", omml: M.splitTens, h: 92,
                       quote: "I cut it into two tens and a three." }}
              same={["Both get 92", "Both split at friendly numbers", "Both add the parts back"]}
              diff={["Ruba has two parts, Nasser has three", "Nasser's pieces are smaller", "Ruba's is quicker to add"]} />
          </StoryShell>
        );

      case 6:
        return (
          <STEMWindow window={STORY && STORY.stemWindows && STORY.stemWindows[0]}>
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "split at the ten, multiply each part, add the parts" }]}
              hand={"cut the factor at its tens · multiply each piece · add every piece back"}
              cards={[
                { title: "The array we cut", omml: M.answer, note: "80 from the tens, 12 from the ones" },
                { title: "Tap to see both parts", omml: M.splitTens, revealOmml: M.total, reveal: true,
                  note: "the parts must add back to the whole" }
              ]} />
          </STEMWindow>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The model is drawn, not declared"
            text="Zayd builds only what the class can justify: the array cut, the partials named, the add-back shown."
            clue="The parts always add back to the whole">
            <BoardScreen draw={drawBoard33} height={430}
              caption="Break it where it is friendly." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a total with every part"
            text="3 × 26. Show both partial products — and the add-back."
            clue="60 + 18 = 78">
            <ShowWhatYouKnow award={award}
              prompt="Use partial products to work out 3 × 26."
              omml={M.swyk}
              options={[{ v: "a", text: "78" }, { v: "b", text: "68" }, { v: "c", text: "60" }, { v: "d", text: "618" }]}
              right="a"
              support={{
                yes: "Yes — 3 × 20 = 60 and 3 × 6 = 18, and 60 + 18 = 78.",
                notYet: "Not yet — did you add both parts?",
                draw: drawSupport33, h: 84,
                hint: "The blue part is 3 × 20. The orange part is 3 × 6. Add them."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The grove model stands"
            text="Omar signs the total with every part beside it. Zayd unrolls the next plan: a long roof, and its area model waiting to be partitioned."
            artifact="Grove plan · array total by partials"
            next="The next plan is a long roof — its area model is easier to price once it is partitioned.">
            <Closing game={game} omml={M.rule}
              action="Find something arranged in rows at home and work out the total by splitting at a ten." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
