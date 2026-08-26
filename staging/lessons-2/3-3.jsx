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

const makeArraySplit = (split) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
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

const makePartials = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [["4 × 20", 80, "#2D70B3"], ["4 × 3", 12, "#FA7E19"]];
  rows.forEach((r, n) => {
    const a = n < shown ? 1 : 0.2;
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
    {
      phase: "warmup",
      title: "Rows that <em>tell the total</em>",
      lead: "The grove's seating is set in four rows of twenty-three chairs. The rows are visible — the total is not.",
      goal: "An invitation — an array is a multiplication you can see.",
      pull: "4 × 20 is easy. 4 × 23 is not — yet.",
      rail: {
        launch: "Fictional frame. Ask only: how is the seating arranged, and what total is hiding in it?",
        monitor: ["Counting the rows", "Counting a row", "Wonding how to total without counting 92 chairs"],
        connect: "What multiplication do the rows already show?",
        misconception: "Counting chair by chair instead of row by row."
      }
    },
    {
      phase: "launch",
      title: "The class locks the estimate <em>before the cut</em>",
      lead: "Four rows of twenty-three. The estimate goes in first — 4 × 20 = 80 is the safety net for the exact total.",
      goal: "Estimate the array product before computing it.",
      pull: "The total must land near 80, or the model is wrong.",
      rail: {
        launch: "State that the seating counts are simulated planning data.",
        monitor: ["Rounding 23 to 20", "Computing 4 × 20 = 80", "Keeping the estimate in view"],
        connect: "Which part of 23 did the estimate keep?",
        misconception: "Estimating 4 × 30 and forgetting which way it bends."
      }
    },
    {
      phase: "monitor",
      title: "Zayd cuts the array <em>at the ten</em>",
      lead: "He can cut the 4 × 23 array at the twenty — the class chooses the cut before the line appears.",
      goal: "Split the array at the ten into a 20-part and a 3-part.",
      pull: "Nothing was added or removed — the same squares, in two groups.",
      rail: {
        launch: "Ask what the cut does to the total before it appears.",
        monitor: ["Seeing the 4 × 20 block", "Seeing the 4 × 3 strip", "Checking the total is unchanged"],
        connect: "Why cut at 20 and not at 21?",
        misconception: "Thinking the cut changes the total."
      }
    },
    {
      phase: "monitor",
      title: "Omar writes the <em>partial products</em>",
      lead: "He can write each part of the answer — the class chooses the part before it appears.",
      goal: "Multiply each part: 4 × 20 = 80, then 4 × 3 = 12.",
      pull: "Partial means part of the answer. You need every part.",
      rail: {
        launch: "Predict the next partial product before it is written.",
        monitor: ["Writing 4 × 20 = 80", "Writing 4 × 3 = 12", "Holding both parts in view"],
        connect: "What does 'partial' mean in partial products?",
        misconception: "Multiplying 4 × 23 as 4 × 2 + 4 × 3 = 20 — splitting the digits, not the ten."
      }
    },
    {
      phase: "monitor",
      title: "The parts need <em>their labels</em>",
      lead: "Four lines of the model's working are mixed up. The class files each as a part of the answer or the whole answer before the folio signs.",
      goal: "Separate partial products from the total in a record.",
      pull: "80 + 12 = 92 — the parts add to the whole the array showed.",
      rail: {
        launch: "Do not grade until the class commits to all four files.",
        monitor: ["Naming 80 and 12 as parts", "Naming 92 as the whole", "Matching the array to 4 × 23"],
        connect: "Which label would the grove plan file under 'the total'?",
        misconception: "Filing 80 as the answer because it is the first product."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em> to the array",
      lead: "The boys step back. Real student methods for the array take the board.",
      goal: "Compare methods and name a reusable one in the Sijill.",
      pull: "One counts the rows; one splits and multiplies.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both reach 92", "Comparing row-counting to partial products", "Explaining when the split pays off"],
        connect: "When does the split become easier than the count?",
        misconception: "Believing the array must be counted to be trusted."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Split at the ten. Multiply each part. Add the parts.",
      goal: "Build the partial-products rule publicly from the methods compared.",
      pull: "The estimate 80 was the model's safety net all along.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Re-running 80 + 12 = 92", "Comparing to the 80 estimate"],
        connect: "Which part of the rule is the estimate checking?",
        misconception: "Adding the parts before both are written."
      }
    },
    {
      phase: "synth",
      title: "Rows that <em>raise water</em>",
      lead: "The class turns to the history: how repeated rows and repeated lifts made big work out of small, understood actions.",
      goal: "Connect the array split to the documented history of repeated-row machines.",
      pull: "Repetition, arranged well, does the work of many.",
      rail: {
        launch: "Use described and documented — never invented by one person.",
        monitor: ["Linking repeated rows to repeated pots", "Naming the 1206 treatise's five lift chapters", "Asking why repetition was the design"],
        connect: "What does a row of chairs and a row of pots both have in common?",
        misconception: "Attributing the machines to a single inventor."
      }
    },
    {
      phase: "swyk",
      title: "The class totals only an array it can <em>re-split</em>",
      lead: "A fresh seating: 3 rows of 26. Use partial products — and be ready to show the split.",
      goal: "Multiply with partial products independently.",
      pull: "A total you can re-split into 60 + 18 is a total you can defend.",
      rail: {
        launch: "Two minutes. Require the split and both parts, not only the total.",
        monitor: ["Splitting 26 into 20 + 6", "Computing 3 × 20 = 60", "Computing 3 × 6 = 18 and adding"],
        connect: "Where did the 60 come from, and the 18?",
        misconception: "Answering 92 from the previous array instead of re-splitting 3 × 26."
      }
    },
    {
      phase: "connect",
      title: "The rows are totalled — <em>and the roof appears</em>",
      lead: "The seating rows are totalled by split, not count. Then the workshop's first roof section is set out — and it does not split as neatly as 23 did.",
      goal: "Close on one action: split, multiply, add — on your own array.",
      pull: "Tomorrow: the roof split into useful parts.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Re-splitting products", "Trusting the parts", "Ready for area models"],
        connect: "Where have you split a big count into friendly parts?",
        misconception: "Remembering the chairs but not the split-multiply-add rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [split, setSplit] = useState(0);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Seating set in rows"
            text="The lantern shows the grove's new seating: four rows of twenty-three chairs, set out under the shade. The rows are visible to anyone — the total of 92 is not written anywhere yet."
            clue="An array is a multiplication you can see">
            <NoticeWonder draw={drawChairs} height={256} award={award}
              notices={["Four rows", "Twenty-three in each row", "The total is not counted", "4 × 20 would be easy"]}
              wonders={["How do we total without counting 92 chairs?", "Where should the array be cut?", "What does a cut do to the total?"]}
              footnote="The story sets the rows. The split is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The class locks the estimate before the cut"
            text="Omar rounds the row to 20 and Zayd computes 4 × 20 = 80. The exact total must land near 80 — or the model is wrong."
            clue="80 is the safety net for 92">
            <LaunchEstimate draw={drawChairs} height={256} award={award}
              label="About how many chairs?"
              min={40} max={160} start={92} unit="chairs"
              after="Locked. Now let us cut the array somewhere useful."
              note="4 × 20 is easy. 4 × 23 is not — yet. Counts are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd cuts the array at the ten"
            text="He can cut the 4 × 23 array at the twenty. The class chooses the cut before the line appears — nothing is added or removed."
            clue="The same squares, in two groups">
            <ExploreChips draw={makeArraySplit(split)} height={252}
              label="Cut the array"
              value={split}
              onPick={(v) => setSplit(v)}
              chips={[{ v: 0, label: "whole array" }, { v: 1, label: "split at 20" }]}
              caption={<MathEl omml={M.problem} size="xl" display="block" />}
              footnote="Nothing was added or removed — the same squares, in two groups." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar writes the partial products"
            text="He can write each part of the answer as it appears. The class chooses the part before it is written — partial means part of the answer."
            clue="You need every part">
            <ExploreChips draw={makePartials(shown)} height={252}
              label="Write the partial products"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[{ v: 1, label: "the tens part" }, { v: 2, label: "add the ones part" }]}
              caption={<MathEl omml={M.total} size="xl" display="block" />}
              footnote="4 × 20 = 80 and 4 × 3 = 12 — the parts add to the whole the array showed." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The parts need their labels"
            text="Omar reads each line of the model's working while Zayd files it. The class commits all four before the folio signs."
            clue="Parts of the answer, or the whole answer?">
            <CardSort award={award} columns={2} commitLabel="Label the four lines"
              items={[
                { id: "s1", text: "4 × 20 = 80", target: "t1" },
                { id: "s2", text: "4 × 3 = 12", target: "t1" },
                { id: "s3", text: "80 + 12 = 92", target: "t2" },
                { id: "s4", text: "4 × 23 = 92", target: "t2" }
              ]}
              targets={[
                { id: "t1", label: "Part of the answer" },
                { id: "t2", label: "Whole answer" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest array methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One counts the rows; one splits and multiplies">
          <CompareConnect award={award}
            left={{ name: "Aya's way — count the rows", omml: M.answer, h: 92,
                    quote: "23 + 23 + 23 + 23 — four rows, added honestly." }}
            right={{ name: "Musa's way — split and multiply", omml: M.splitTens, h: 92,
                     quote: "4 × 20 and 4 × 3 — the split does the counting for me." }}
            same={["Both reach 92", "Both trust the array", "Both can be re-checked"]}
            diff={["Aya's grows slow as the rows grow", "Musa's split pays off at bigger rows", "Musa's parts are the estimate's parts"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Split at the ten · multiply each part · add the parts">
            <BoardScreen draw={drawBoard33} height={380}
              caption="The estimate 80 was the model's safety net all along." />
          </StoryShell>
        );

      case 7:
        return (
          <STEMWindow window={STORY && STORY.stemWindows && STORY.stemWindows[0]}>
            <RuleScreen award={award}
              ommls={[{ omml: M.splitTens, alt: "4 × 20 = 80" },
                      { omml: M.splitOnes, alt: "4 × 3 = 12" },
                      { omml: M.total, alt: "80 + 12 = 92" }]}
              hand={"split at the ten · multiply each part · add the parts"}
              cards={[
                { title: "The array", omml: M.answer, note: "four rows of twenty-three" },
                { title: "The split", omml: M.rule, note: "the rule the grove now uses" }
              ]} />
          </STEMWindow>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The class totals only an array it can re-split"
            text="A fresh seating: 3 rows of 26 chairs. Use partial products — and be ready to show the split that built your total."
            clue="26 splits into 20 and 6">
            <ShowWhatYouKnow award={award}
              prompt="Use partial products to work out 3 × 26."
              options={[{ v: "a", text: "68" }, { v: "b", text: "78" }, { v: "c", text: "60" }, { v: "d", text: "618" }]}
              right="b"
              support={{
                yes: "Yes — 3 × 20 = 60 and 3 × 6 = 18; 60 + 18 = 78.",
                notYet: "Not yet — split the 26, multiply each part, then add the parts.",
                draw: drawSupport33, h: 84,
                hint: "26 is 20 and 6 — what is 3 of each?"
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The rows are totalled — and the roof appears"
            text="The seating rows are totalled by split, not count: 80 + 12 = 92, defended. Then the workshop's first roof section is set out across the grove — and it does not split as neatly as 23 did."
            artifact="Grove plan · array total (split + partials)"
            next="The roof section is set — and it splits into useful parts in a new way.">
            <Closing game={game} omml={M.total}
              action="Tonight: split a product at the ten, multiply each part, and add — on a number of your own." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
