/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-5 · Use Partial Quotients to Divide
   Standard 4.NBT.B.6   I can ... divide a 2-digit number by taking out chunks of
   groups, then adding the chunks.
   =========================================================================== */

const M = {
  problem: om(mt("96\u00f76")),
  answer: om(mt("96\u00f76=16")),
  bigChunk: om(mt("6\u00d710=60")),
  chunks: om(mt("10 + 6 = 16")),
  estimate: om(mt("6×10=60")),
  rule: om(mnor("take out easy chunks · then add the chunks")),
  swyk: om(mt("84\u00f77")),
  swykAnswer: om(mt("84\u00f77=12"))
};

const CHUNKS = [{ q: 10, label: "10 groups" }, { q: 6, label: "6 groups" }];

const makeLadder55 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.partialQuotients(ctx, {
    dividend: 96, divisor: 6, chunks: CHUNKS, shown: n,
    x: W / 2 - 110, y: 46, w: 150, lh: 34
  });
  D.txt(ctx, n >= CHUNKS.length ? "nothing left — the chunks add to 16" : "take out a chunk you can do in your head",
    W / 2, H - 14, { size: 13, col: n >= CHUNKS.length ? "#34D399" : "#C9A227", font: "marker" });
};

/* the same division as a growing rectangle — area model read backwards */
const makeArea55 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cols = CHUNKS.slice(0, n).map(function (c) { return { v: c.q }; });
  if (cols.length === 0) return;
  D.areaModel(ctx, { x: 74, y: 76, w: W - 132, h: 92, rowV: 6, cols: cols, prog: 1, showSum: false });
  const used = CHUNKS.slice(0, n).reduce(function (s, c) { return s + c.q * 6; }, 0);
  D.txt(ctx, "used " + used.toLocaleString("en-US") + " of 96", W / 2, 42,
    { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, n >= CHUNKS.length ? "the widths add to the quotient: 16"
                                : "still " + (96 - used).toLocaleString("en-US") + " to place",
    W / 2, H - 16, { size: 14, col: n >= CHUNKS.length ? "#34D399" : "#C9A227", font: "marker" });
};

const drawStory55 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "chairs for the assembly", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (var g = 0; g < 6; g++) {
    var a = D.at(p2, g / 6, g / 6 + 0.5);
    if (a <= 0) continue;
    var gx = 46 + g * ((W - 104) / 6);
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, gx, 56, (W - 126) / 6, 56, 7);
    ctx.fillStyle = "#12857C"; ctx.globalAlpha = a * 0.2; ctx.fill();
    ctx.globalAlpha = a; ctx.strokeStyle = "#12857C"; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "?", gx + (W - 126) / (2 * 6), 88, { size: 17, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "96 chairs · 6 equal rows", W / 2, 146, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many chairs in each row?", W / 2, H - 16, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard55 = (ctx, W, H, frame) => {
  const CYCLE = 820, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Chunks you can already see" });
  const p1 = D.at(f, 20, 420), p2 = D.at(f, 440, 620), p3 = D.at(f, 620, 780);
  const shown = Math.ceil(p1 * CHUNKS.length);
  D.partialQuotients(ctx, {
    dividend: 96, divisor: 6, chunks: CHUNKS, shown: shown,
    x: W / 2 - 150, y: 96, w: 170, lh: 34
  });
  if (p2 > 0) {
    D.txt(ctx, "10 + 6 = 16", W / 2 + 60, H - 96,
      { size: 15, col: "#C9A227", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    var yb = H - 42;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "you never had to know 96 ÷ 6 — only 6 × 10 and 6 × 6", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 760) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 800), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport55 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.partialQuotients(ctx, { dividend: 84, divisor: 7, chunks: [{ q: 10 }, { q: 2 }],
    x: W / 2 - 96, y: 16, w: 120, lh: 22 });
};

const LESSON = {
  code: "5-5",
  storageKey: "daf-g4-t5-l5",
  title: "Use Partial Quotients to Divide",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-5 · 4.NBT.B.6",
  math: M,
  ixl: ["BTM", "7LG"],

  metas: [
    { phase: "warmup", title: "A division that <em>shrink-wraps</em>",
      lead: "96 ÷ 6, taken out in chunks: the big number keeps shrinking, and a column of right-hand numbers grows — 10, then 6.",
      goal: "Notice partial quotients: each step is a number of groups you could see.",
      pull: "What do the right-hand numbers mean?",
      rail: { launch: "Fictional frame. Look at the column — no working yet.",
        monitor: ["Reading the shrinking number", "Reading the right-hand column", "Wonding if that is the answer"],
        connect: "What are the numbers on the right?",
        misconception: "Thinking the first chunk taken out is the whole answer." } },

    { phase: "launch", title: "About how many <em>chairs per row</em>?",
      lead: "96 chairs, 6 rows. The foreman starts with 6 × 10 = 60 and sees what is left.",
      goal: "Create the need — take out the groups you can see.",
      pull: "You know 6 × 10 = 60. Start there and see what is left.",
      rail: { launch: "Give a per-row number and the chunk you would take first.",
        monitor: ["Taking 10 groups", "Taking 6 groups", "Estimating first"],
        connect: "Which chunk is easiest to see in 96?",
        misconception: "Taking one group at a time, forever." } },

    { phase: "monitor", title: "Zayd takes out <em>useful chunks</em>",
      lead: "Sixty out, then thirty-six out — each chunk is a number of groups he could see straight away.",
      goal: "Remove large, easy groups instead of one group at a time.",
      pull: "Every chunk is a number of groups you could see straight away.",
      rail: { launch: "Before each chunk: how many groups did you see?",
        monitor: ["Taking 10 groups", "Seeing 6 more groups in 36", "Adding the chunks"],
        connect: "Why stop at 10 + 6 and not keep going?",
        misconception: "Stopping at the first chunk and calling it the answer." } },

    { phase: "monitor", title: "The <em>rectangle</em> behind the chunks",
      lead: "The height is the divisor; the widths are the chunks. 10 + 6 = 16, and the rectangle closes at 96.",
      goal: "See the partial quotients as widths of one rectangle.",
      pull: "The widths add up to the answer.",
      rail: { launch: "Before each width: what is its area?",
        monitor: ["Naming the 10-width", "Naming the 6-width", "Adding the widths"],
        connect: "How do you know the rectangle holds all 96?",
        misconception: "Adding the areas again after adding the widths." } },

    { phase: "monitor", title: "Match the <em>quotient</em>",
      lead: "Three quotients from the inventory. Each one belongs to one division.",
      goal: "Check a partial-quotient answer against its division.",
      pull: "Multiply back: divisor × answer = the big number.",
      rail: { launch: "Check each claim by multiplying back before you place it.",
        monitor: ["Multiplying back 96 ÷ 6", "Checking 84 ÷ 7", "Checking 92 ÷ 4"],
        connect: "Which claim failed its check?",
        misconception: "Matching by the number of digits." } },

    { phase: "connect", title: "Zahra takes <em>big chunks</em>. Omar takes <em>small ones</em>",
      lead: "Zahra: 10, then 6. Omar: five at a time until it ran out. Both get 16.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing chunk sizes", "Counting the steps", "Adding the chunks in each"],
        connect: "When are small chunks the safer choice?",
        misconception: "Believing bigger chunks are always better." } },

    { phase: "synth", title: "On the <em>board</em>: take out easy chunks, add the chunks",
      lead: "How many groups can you see? Take them out. Look at what is left. Add the chunks.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Choosing the first chunk", "Seeing what is left", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting the last small chunk in the sum." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "The chunks are the answer, wearing a coat of steps.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the chunks", "Checking the sum of chunks", "Testing on a new division"],
        connect: "Which chunk is the easiest to forget?",
        misconception: "Answering with a chunk instead of the sum of chunks." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "84 ÷ 7 — partial quotients. Which chunks add to the answer?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show your chunks.",
        monitor: ["Taking 10 groups", "Seeing 2 more in 14", "Adding 10 + 2"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 10 r 14 — the last chunk was never added." } },

    { phase: "connect", title: "The manifest is <em>unloaded</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the longest inventory sheet — the same strategy, a greater dividend.",
      rail: { launch: "Ask three students to say their chunks in order.",
        monitor: ["Able to explain the chunks", "Still takes one at a time", "Ready for three-digit dividends"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [m, setM] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="A division that shrink-wraps"
            text="96 ÷ 6, taken out in chunks: the big number keeps shrinking, and a column of right-hand numbers grows — the partial quotients."
            clue="What do the right-hand numbers mean?">
            <NoticeWonder draw={makeLadder55(CHUNKS.length)} height={260} award={award}
              notices={["The big number keeps shrinking", "There is a column on the right", "Each step subtracts", "It ends near zero"]}
              wonders={["What do the right-hand numbers mean?", "Could I take bigger chunks?", "Is that the answer?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The chairs per row, before the count"
            text="Omar asks the foreman's question: 96 chairs, 6 rows — about how many per row, using the chunks you can see?"
            clue="6 × 10 = 60 does most of the work.">
            <LaunchEstimate draw={drawStory55} height={256} award={award}
              label="About how many chairs per row?" min={5} max={40} start={16} unit="chairs"
              after="Locked. Now let us take it out in chunks."
              note="The chair count is simulated — the chunk idea works on any manifest." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd takes out useful chunks"
            text="He can take one chunk at a time — the class must name the groups in each chunk before it is out."
            clue="Every chunk is a number of groups you could see straight away.">
            <ExploreChips draw={makeLadder55(n)} height={260}
              label="Take out one chunk at a time"
              value={n}
              onPick={(v) => setN(v)}
              chips={CHUNKS.map((c, k) => ({ v: k + 1, label: "\u2212 " + (c.q * 6).toLocaleString("en-US") }))}
              caption={<MathEl omml={M.chunks} size="lg" display="block" />}
              footnote="Every chunk is a number of groups you could see straight away." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rectangle behind the chunks"
            text="The height is the divisor; the widths are the chunks. When the rectangle closes, the widths have added the answer."
            clue="The widths add up to the answer.">
            <ExploreChips draw={makeArea55(m)} height={256}
              label="Build the rectangle"
              value={m}
              onPick={(v) => setM(v)}
              chips={CHUNKS.map((c, k) => ({ v: k + 1, label: "+ " + c.q }))}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="The height is the divisor. The widths add up to the answer." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the quotient"
            text="Omar and Zayd lay three quotients on the inventory sheet. Each one must survive its multiply-back check."
            clue="Divisor × answer = the big number.">
            <CardSort award={award} columns={3}
              items={[{ id: "s1", text: "16", target: "t1" }, { id: "s2", text: "12", target: "t2" }, { id: "s3", text: "23", target: "t3" }]}
              targets={[{ id: "t1", label: "96 ÷ 6" }, { id: "t2", label: "84 ÷ 7" }, { id: "t3", label: "92 ÷ 4" }]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 16"
            text="Zahra takes big chunks. Omar takes small ones until they ran out. Both chunks add to 16."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Zahra's way — big chunks", omml: M.bigChunk, h: 92, quote: "I took 10 rows out at once, then the last 6." }}
              right={{ name: "Omar's way — smaller chunks", omml: M.chunks, h: 92, quote: "I took 5 at a time until I ran out." }}
              same={["Both get 16", "Both subtract multiples of 6", "Both add their chunks at the end"]}
              diff={["Zahra took two steps, Omar took three", "Omar's chunks were easier to see", "Zahra finished faster"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The chunks are drawn, not declared"
            text="Zayd builds only what the class can justify: the chunks seen, the remainders left, the widths added."
            clue="Take out easy chunks · then add the chunks.">
            <BoardScreen draw={drawBoard55} height={430}
              caption="Take out easy chunks · then add the chunks." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The chunks are the answer, wearing a coat of steps."
            clue="The sum of the chunks is the quotient.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "take out easy chunks · then add the chunks" }]}
              hand={"how many groups can you see? · take them out · look at what is left · add the chunks"}
              cards={[
                { title: "The division we did", omml: M.answer, note: "10 groups, then 6 more" },
                { title: "Tap to see the chunks", omml: M.estimate, revealOmml: M.chunks, reveal: true,
                  note: "the chunks add up to the quotient" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the inventory"
            text="84 ÷ 7. Show your chunks — then their sum."
            clue="7 × 10 = 70 leaves 14 — that is 2 more groups.">
            <ShowWhatYouKnow award={award}
              prompt="Use partial quotients for 84 ÷ 7."
              omml={M.swyk}
              options={[{ v: "a", text: "10" }, { v: "b", text: "12" }, { v: "c", text: "14" }, { v: "d", text: "11 r 7" }]}
              right="b"
              support={{
                yes: "Yes — 7 × 10 = 70 leaves 14, and 7 × 2 = 14. So 10 + 2 = 12.",
                notYet: "Not yet — check whether another whole group would still fit.",
                draw: drawSupport55, h: 96,
                hint: "After taking 10 groups you still have 14 left — that is 2 more groups."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The manifest is unloaded"
            text="Omar signs the inventory: every chunk seen, every width added. The next sheet is the longest of the season — the same strategy must now survive a three-digit dividend."
            artifact="Caravan schedule · partial quotients"
            next="The longest inventory sheet — the same partial-quotient strategy must survive a greater dividend.">
            <Closing game={game} omml={M.rule}
              action="Share about a hundred small things at home into equal groups by taking out chunks of ten." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
