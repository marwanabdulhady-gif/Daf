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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "An array of chairs. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Counting them one by one is not the plan.",
      rail: { launch: "I am not asking how many yet. Just look.",
        monitor: ["Counting a row", "Counting the rows", "Estimating"],
        connect: "Who noticed something nobody else did?",
        misconception: "Counting one square at a time." } },

    { phase: "launch", title: "Four rows of <em>twenty-three</em>",
      lead: "The hall has 4 rows with 23 chairs in each. Estimate first.",
      goal: "Create the need — a big array needs a better idea than counting.",
      pull: "Let us cut it somewhere useful.",
      rail: { launch: "Roughly how many chairs? Do not count.",
        monitor: ["Rounding to 4 x 20", "Adding 23 four times", "Counting in ones"],
        connect: "What number would be easier to multiply by than 23?",
        misconception: "Believing you must know the fact 4 x 23 by heart." } },

    { phase: "monitor", title: "Cut it at the <em>ten</em>",
      lead: "Split the array into twenty and three. Two easy multiplications appear.",
      goal: "Decomposing a factor turns one hard fact into two easy ones.",
      pull: "Those two answers have a name.",
      rail: { launch: "Predict the two pieces before you tap.",
        monitor: ["Splitting at 20", "Splitting somewhere else", "Explaining why 20 is easy"],
        connect: "Why cut at twenty and not at ten or fifteen?",
        misconception: "Thinking the split changes the total." } },

    { phase: "monitor", title: "The <em>partial products</em>",
      lead: "Write each piece, then add them.",
      goal: "Name the parts and record them.",
      pull: "Match some arrays to their partial products.",
      rail: { launch: "Predict each partial product before you reveal it.",
        monitor: ["Writing 4 x 20 first", "Writing both then adding", "Forgetting the second part"],
        connect: "What happens if you forget one part?",
        misconception: "Adding the factors instead of the products." } },

    { phase: "monitor", title: "Match the <em>split</em>",
      lead: "Which pair of partial products came from that array? No grading until the class commits.",
      goal: "Read a split backwards.",
      pull: "Two students split the same array differently.",
      rail: { launch: "Look at the tens part first.",
        monitor: ["Checking the tens", "Checking the ones", "Adding to test"],
        connect: "How did you know which pair belonged?",
        misconception: "Matching by the size of the numbers." } },

    { phase: "connect", title: "Two ways to <em>split it</em>",
      lead: "Ruba split 23 into 20 and 3. Nasser split it into 10, 10 and 3. Both give 92.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Splitting by place value", "Splitting into equal tens", "Adding all the parts"],
        connect: "Which split gives the fewest pieces to add?",
        misconception: "Believing only one split is allowed." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Cut at the ten. Multiply each piece. Add the pieces back together.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the cut", "Naming each piece", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting to add the parts at the end." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the split", "Testing on a new array", "Asking about three-digit factors"],
        connect: "Would this still work for 4 x 234?",
        misconception: "Thinking arrays only work for two-digit numbers." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write both partial products.",
        monitor: ["Splitting at 20", "Writing both parts", "Adding correctly"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Writing only 3 x 20 and stopping." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the same idea, drawn as a rectangle.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the array", "Ready for area models"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [split, setSplit] = useState(false);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawChairs} height={252} award={award}
          notices={["There are 4 rows", "Each row has 23", "It is a rectangle", "It is nearly 100 chairs"]}
          wonders={["How many chairs?", "Could I split it?", "Is there a quicker way than counting?"]} />;

      case 1:
        return <LaunchEstimate draw={drawChairs} height={252} award={award}
          label="About how many chairs?" min={40} max={160} start={92} unit="chairs"
          after="Locked. Now let us cut the array somewhere useful."
          note="4 x 20 is easy. 4 x 23 is not — yet." />;

      case 2:
        return <ExploreChips draw={makeArraySplit(split)} height={256}
          label="Cut the array"
          value={split ? 1 : 0}
          onPick={(v) => setSplit(v === 1)}
          chips={[{ v: 0, label: "whole array" }, { v: 1, label: "split at 20" }]}
          caption={<MathEl omml={split ? M.total : M.problem} size="xl" display="block" />}
          footnote="Nothing was added or removed — the same squares, in two groups." />;

      case 3:
        return <ExploreChips draw={makePartials(shown)} height={252}
          label="Write the partial products"
          value={shown}
          onPick={(v) => setShown(v)}
          chips={[{ v: 1, label: "the tens part" }, { v: 2, label: "add the ones part" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Partial means part of the answer. You need every part." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[
            { id: "p1", text: "80 + 12", target: "a1" },
            { id: "p2", text: "60 + 18", target: "a2" },
            { id: "p3", text: "100 + 25", target: "a3" }
          ]}
          targets={[
            { id: "a1", label: "4 rows of 23" }, { id: "a2", label: "3 rows of 26" }, { id: "a3", label: "5 rows of 25" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Ruba's way — 20 and 3", omml: M.total, h: 92,
                  quote: "I cut it at the ten, so I only had two pieces." }}
          right={{ name: "Nasser's way — 10, 10 and 3", omml: M.splitTens, h: 92,
                   quote: "I cut it into two tens and a three." }}
          same={["Both get 92", "Both split at friendly numbers", "Both add the parts back"]}
          diff={["Ruba has two parts, Nasser has three", "Nasser's pieces are smaller", "Ruba's is quicker to add"]} />;

      case 6:
        return <BoardScreen draw={drawBoard33} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "split at the ten, multiply each part, add the parts" }]}
          hand={"cut the factor at its tens · multiply each piece · add every piece back"}
          cards={[
            { title: "The array we cut", omml: M.answer, note: "80 from the tens, 12 from the ones" },
            { title: "Tap to see both parts", omml: M.splitTens, revealOmml: M.total, reveal: true,
              note: "the parts must add back to the whole" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Use partial products to work out 3 × 26."
          omml={M.swyk}
          options={[{ v: "a", text: "68" }, { v: "b", text: "78" }, { v: "c", text: "60" }, { v: "d", text: "618" }]}
          right="b"
          support={{
            yes: "Yes — 3 × 20 = 60 and 3 × 6 = 18, and 60 + 18 = 78.",
            notYet: "Not yet — did you add both parts?",
            draw: drawSupport33, h: 84,
            hint: "The blue part is 3 × 20. The orange part is 3 × 6. Add them."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find something arranged in rows at home and work out the total by splitting at a ten." />;

      default: return null;
    }
  }
};
