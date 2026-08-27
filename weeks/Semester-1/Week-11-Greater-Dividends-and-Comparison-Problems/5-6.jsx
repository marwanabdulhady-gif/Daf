/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-6 · Use Partial Quotients to Divide: Greater Dividends
   Standard 4.NBT.B.6   I can ... divide a 3-digit or 4-digit number using partial
   quotients, and handle a remainder.
   =========================================================================== */

const M = {
  problem: om(mt("738\u00f76")),
  answer: om(mt("738\u00f76=123")),
  bigChunk: om(mt("6\u00d7100=600")),
  chunks: om(mt("100 + 20 + 3 = 123")),
  estimate: om(mt("6×100=600")),
  rule: om(mnor("start with the biggest chunk you can see")),
  swyk: om(mt("857\u00f74")),
  swykAnswer: om(mt("857\u00f74=214 r 1"))
};

const CHUNKS = [{ q: 100, label: "100 groups" }, { q: 20, label: "20 groups" }, { q: 3, label: "3 groups" }];

const makeLadder56 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.partialQuotients(ctx, {
    dividend: 738, divisor: 6, chunks: CHUNKS, shown: n,
    x: W / 2 - 110, y: 46, w: 150, lh: 30
  });
  D.txt(ctx, n >= CHUNKS.length ? "nothing left — the chunks add to 123" : "take out a chunk you can do in your head",
    W / 2, H - 14, { size: 13, col: n >= CHUNKS.length ? "#34D399" : "#C9A227", font: "marker" });
};

/* the same division as a growing rectangle — area model read backwards */
const makeArea56 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cols = CHUNKS.slice(0, n).map(function (c) { return { v: c.q }; });
  if (cols.length === 0) return;
  D.areaModel(ctx, { x: 74, y: 76, w: W - 132, h: 92, rowV: 6, cols: cols, prog: 1, showSum: false });
  const used = CHUNKS.slice(0, n).reduce(function (s, c) { return s + c.q * 6; }, 0);
  D.txt(ctx, "used " + used.toLocaleString("en-US") + " of 738", W / 2, 42,
    { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, n >= CHUNKS.length ? "the widths add to the quotient: 123"
                                : "still " + (738 - used).toLocaleString("en-US") + " to place",
    W / 2, H - 16, { size: 14, col: n >= CHUNKS.length ? "#34D399" : "#C9A227", font: "marker" });
};

const drawStory56 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "dates boxed for the market", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
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
    D.txt(ctx, "738 dates · 6 equal boxes", W / 2, 146, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many dates in each box?", W / 2, H - 16, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard56 = (ctx, W, H, frame) => {
  const CYCLE = 820, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Big chunks first" });
  const p1 = D.at(f, 20, 420), p2 = D.at(f, 440, 620), p3 = D.at(f, 620, 780);
  const shown = Math.ceil(p1 * CHUNKS.length);
  D.partialQuotients(ctx, {
    dividend: 738, divisor: 6, chunks: CHUNKS, shown: shown,
    x: W / 2 - 150, y: 96, w: 170, lh: 30
  });
  if (p2 > 0) {
    D.txt(ctx, "100 + 20 + 3 = 123", W / 2 + 60, H - 96,
      { size: 15, col: "#C9A227", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    var yb = H - 42;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "hundreds first, then tens, then ones — the same order as everything else", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 760) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 800), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport56 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.partialQuotients(ctx, { dividend: 857, divisor: 4, chunks: [{ q: 200 }, { q: 14 }],
    x: W / 2 - 96, y: 16, w: 120, lh: 22 });
};

const LESSON = {
  code: "5-6",
  storageKey: "daf-g4-t5-l6",
  title: "Use Partial Quotients to Divide: Greater Dividends",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-6 · 4.NBT.B.6",
  math: M,
  ixl: ["EGL", "6UL"],

  metas: [
    { phase: "warmup", title: "The longest <em>inventory sheet</em>",
      lead: "738 dates, 6 boxes. The chunks are 100, 20 and 3 — the same strategy, a bigger dividend.",
      goal: "Notice the strategy survives when the dividend grows.",
      pull: "Start with the biggest chunk you can see.",
      rail: { launch: "Fictional frame. Look at the ladder — no working yet.",
        monitor: ["Reading the 100-chunk", "Reading the 20 and 3", "Wonding why that order"],
        connect: "Which chunk is the biggest you can see in 738?",
        misconception: "Starting with the ones — the smallest chunk first." } },

    { phase: "launch", title: "About how many <em>dates per box</em>?",
      lead: "738 dates, 6 boxes. The foreman starts with 6 × 100 = 600 — one chunk does most of the work.",
      goal: "Create the need — a bigger dividend needs a bigger first chunk.",
      pull: "6 × 100 = 600. That one chunk does most of the work.",
      rail: { launch: "Give a per-box number and your first chunk.",
        monitor: ["Taking 100 groups", "Estimating first", "Asking what is left"],
        connect: "Why is 100 the natural first chunk for 738?",
        misconception: "Taking ten groups when a hundred will fit." } },

    { phase: "monitor", title: "Zayd takes the <em>hundred-chunk</em> first",
      lead: "Six hundred out, then one hundred and twenty out, then eighteen. Each chunk is a number of groups he could see.",
      goal: "Order the chunks from biggest to visible.",
      pull: "Every chunk is a number of groups you could see straight away.",
      rail: { launch: "Before each chunk: how many groups did you see?",
        monitor: ["Taking 100 groups", "Seeing 20 in 138", "Seeing 3 in 18"],
        connect: "Why stop at 100 + 20 + 3?",
        misconception: "Adding the chunks twice." } },

    { phase: "monitor", title: "The <em>rectangle</em> closes at 738",
      lead: "The widths are 100, 20 and 3. When the rectangle closes, 100 + 20 + 3 = 123 dates per box.",
      goal: "See the partial quotients as widths of one rectangle.",
      pull: "The widths add up to the answer.",
      rail: { launch: "Before each width: what is its area?",
        monitor: ["Naming the 100-width", "Naming the 20-width", "Adding the widths"],
        connect: "How do you know the rectangle holds all 738?",
        misconception: "Confusing the areas with the widths." } },

    { phase: "monitor", title: "Match the <em>quotient</em>",
      lead: "Three quotients from the inventory. Each one must survive its multiply-back check.",
      goal: "Check a partial-quotient answer against its division.",
      pull: "Divisor × answer = the big number.",
      rail: { launch: "Check each claim by multiplying back before you place it.",
        monitor: ["Multiplying back 738 ÷ 6", "Checking 857 ÷ 4 with its remainder", "Checking 672 ÷ 7"],
        connect: "Which claim failed its check?",
        misconception: "Matching by the number of digits." } },

    { phase: "connect", title: "Iyad uses <em>place value</em>. Sami repeats the <em>chunk</em>",
      lead: "Iyad: 100, then 20, then 3 — chosen by place value. Sami: keeps taking 100 groups until he could not.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing chunk choices", "Checking both sum to 123", "Saying which is faster"],
        connect: "When does repeating one chunk beat choosing new ones?",
        misconception: "Believing place-value ordering is the only order." } },

    { phase: "synth", title: "On the <em>board</em>: start with the biggest chunk you can see",
      lead: "100 groups, then 20, then 3. The chunks are the answer, in order.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Choosing the first chunk", "Seeing what is left", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting the ones chunk in a three-digit division." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "The biggest chunk first — the rest of the strategy is unchanged.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the chunks", "Checking the sum", "Testing on a new dividend"],
        connect: "What is the biggest chunk you could see in 857 ÷ 4?",
        misconception: "Answering with the last chunk instead of the sum." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "857 ÷ 4 — partial quotients, with the remainder named.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show your chunks and your remainder.",
        monitor: ["Taking 200 groups", "Seeing 14 more", "Naming the remainder 1"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 200 r 57 — the second chunk was never taken." } },

    { phase: "connect", title: "The long sheet is <em>unloaded</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: one share at every table — the equality must be visible.",
      rail: { launch: "Ask three students to say their chunks in order.",
        monitor: ["Able to explain the ordering", "Still starts with the ones", "Ready for sharing division"],
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
            title="The longest inventory sheet"
            text="738 dates, 6 boxes. The ladder shows the chunks 100, 20 and 3 — the same strategy, a bigger dividend."
            clue="Start with the biggest chunk you can see.">
            <NoticeWonder draw={makeLadder56(CHUNKS.length)} height={260} award={award}
              notices={["The big number keeps shrinking", "There is a column on the right", "Each step subtracts", "It ends near zero"]}
              wonders={["What do the right-hand numbers mean?", "Could I take bigger chunks?", "Is that the answer?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The dates per box, before the count"
            text="Omar asks the foreman's question: 738 dates, 6 boxes — about how many per box, with the biggest chunk first?"
            clue="6 × 100 = 600 does most of the work.">
            <LaunchEstimate draw={drawStory56} height={256} award={award}
              label="About how many dates per box?" min={50} max={300} start={120} unit="dates"
              after="Locked. Now let us take it out in chunks."
              note="The date count is simulated — the chunk idea works on any manifest." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd takes the hundred-chunk first"
            text="He can take one chunk at a time — the class must name the groups in each before it is out."
            clue="100 groups, then 20, then 3 — chosen by place value.">
            <ExploreChips draw={makeLadder56(n)} height={260}
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
            title="The rectangle closes at 738"
            text="The widths are 100, 20 and 3. When the rectangle closes, the widths have added the answer."
            clue="The widths add up to the answer.">
            <ExploreChips draw={makeArea56(m)} height={256}
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
            text="Omar and Zayd lay three quotients on the long sheet. Each one must survive its multiply-back check."
            clue="Divisor × answer + remainder = the big number.">
            <CardSort award={award} columns={3}
              items={[{ id: "u1", text: "123", target: "v1" }, { id: "u2", text: "214 r 1", target: "v2" }, { id: "u3", text: "96", target: "v3" }]}
              targets={[{ id: "v1", label: "738 ÷ 6" }, { id: "v2", label: "857 ÷ 4" }, { id: "v3", label: "672 ÷ 7" }]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 123"
            text="Iyad chooses chunks by place value. Sami repeats the hundred-chunk until he could not. Both sum to 123."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Iyad's way — hundreds, tens, ones", omml: M.bigChunk, h: 92, quote: "100 groups, then 20, then 3." }}
              right={{ name: "Sami's way — same chunk repeated", omml: M.chunks, h: 92, quote: "I kept taking 100 groups until I could not." }}
              same={["Both get 123", "Both subtract multiples of 6", "Both add their chunks"]}
              diff={["Iyad took three steps, Sami took more", "Iyad used place value to choose", "Sami never had to think about size"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The ordering is drawn, not declared"
            text="Zayd builds only what the class can justify: the biggest chunk first, the visible chunks after, the widths added."
            clue="Start with the biggest chunk you can see.">
            <BoardScreen draw={drawBoard56} height={430}
              caption="Start with the biggest chunk you can see." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The biggest chunk first — the rest of the strategy is unchanged."
            clue="The sum of the chunks is the quotient.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "start with the biggest chunk you can see" }]}
              hand={"how many groups can you see? · take them out · look at what is left · add the chunks"}
              cards={[
                { title: "The division we did", omml: M.answer, note: "100 groups, then 20, then 3" },
                { title: "Tap to see the chunks", omml: M.estimate, revealOmml: M.chunks, reveal: true,
                  note: "the chunks add up to the quotient" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the long sheet"
            text="857 ÷ 4. Show your chunks — and the remainder named."
            clue="200 groups uses 800; 14 more groups uses 56; one date is left.">
            <ShowWhatYouKnow award={award}
              prompt="Use partial quotients for 857 ÷ 4."
              omml={M.swyk}
              options={[{ v: "a", text: "214" }, { v: "b", text: "214 r 1" }, { v: "c", text: "213 r 5" }, { v: "d", text: "200 r 57" }]}
              right="b"
              support={{
                yes: "Yes — 200 groups uses 800, then 14 more groups uses 56, leaving 1.",
                notYet: "Not yet — check whether another whole group would still fit.",
                draw: drawSupport56, h: 96,
                hint: "After 200 groups you have 57 left. How many more fours fit, and what is left?"
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The long sheet is unloaded"
            text="Omar signs the long sheet: chunks in order, remainder named. The next job is different — the supplies must be dealt one round at a time, so the equality is visible to every table."
            artifact="Caravan schedule · greater dividends"
            next="One share at every table — supplies are dealt one round at a time so the equality is visible.">
            <Closing game={game} omml={M.rule}
              action="Divide a three-digit number at home by taking out a chunk of one hundred groups first." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
