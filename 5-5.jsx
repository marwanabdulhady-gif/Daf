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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A division being taken apart in stages. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "The numbers on the right are going to add up to something.",
      rail: { launch: "I am not asking for the answer. Just describe what is happening.",
        monitor: ["Noticing the subtractions", "Reading the column on the right", "Watching the number shrink"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the right-hand column as separate answers rather than parts of one." } },

    { phase: "launch", title: "Ninety-six chairs, <em>six rows</em>",
      lead: "96 chairs arranged in 6 equal rows. Estimate first.",
      goal: "Create the need — you do not have to find the whole quotient at once.",
      pull: "Estimate first, then take it out in chunks.",
      rail: { launch: "Roughly how many each? Use a compatible number.",
        monitor: ["Estimating with a friendly number", "Trying to guess exactly", "Sharing one at a time"],
        connect: "What is the biggest easy chunk you could take out first?",
        misconception: "Believing you must find the exact answer in one step." } },

    { phase: "monitor", title: "Take out a <em>chunk</em>",
      lead: "Pull out as many groups as you can see easily. Then look at what is left.",
      goal: "Partial quotients: several easy steps beat one hard one.",
      pull: "The same steps make a rectangle. Watch.",
      rail: { launch: "Predict how much will be left after the first chunk.",
        monitor: ["Taking a big chunk first", "Taking tens at a time", "Taking one group at a time"],
        connect: "Does it matter which chunk you take first?",
        misconception: "Thinking there is one correct set of chunks." } },

    { phase: "monitor", title: "The same steps, as a <em>rectangle</em>",
      lead: "Each chunk is a slice. The widths add up to the quotient.",
      goal: "Connect partial quotients to the area model they already know.",
      pull: "Now match some ladders to their answers.",
      rail: { launch: "Predict how wide the next slice will be.",
        monitor: ["Linking chunk to slice", "Adding the widths", "Losing track of the total"],
        connect: "Where is the quotient in this picture?",
        misconception: "Reading the area as the answer instead of the width." } },

    { phase: "monitor", title: "Match the <em>quotient</em>",
      lead: "Which answer belongs to that division? No grading until the class commits.",
      goal: "Estimate first, then match.",
      pull: "Two students chunked the same division differently.",
      rail: { launch: "Estimate each one before you place it.",
        monitor: ["Estimating first", "Dividing exactly", "Checking by multiplying back"],
        connect: "Which did you estimate, and which did you calculate?",
        misconception: "Matching by the size of the dividend alone." } },

    { phase: "connect", title: "Two ways to <em>chunk it</em>",
      lead: "Zahra took 10 groups then 6. Omar took 5, then 5, then 6. Both reach 16.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Taking big chunks", "Taking small chunks", "Checking both totals"],
        connect: "Whose method took fewer steps? Whose was safer?",
        misconception: "Believing bigger chunks are always better." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Take out what you can see. Subtract. Look again. Add the chunks at the end.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next chunk", "Tracking what is left", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting to add the chunks together at the end." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the chunks", "Testing on a new division", "Checking against an estimate"],
        connect: "What tells you to stop taking chunks?",
        misconception: "Stopping while there is still enough left for another group." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show your chunks, then add them.",
        monitor: ["Taking a big first chunk", "Adding the chunks", "Checking the leftover"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Stopping at 10 groups and answering 10." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the same ladder with much bigger numbers.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs small chunks", "Ready for the next method"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [m, setM] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeLadder55(CHUNKS.length)} height={260} award={award}
          notices={["The big number keeps shrinking", "There is a column on the right", "Each step subtracts", "It ends near zero"]}
          wonders={["What do the right-hand numbers mean?", "Could I take bigger chunks?", "Is that the answer?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory55} height={256} award={award}
          label="About how many chairs per row?" min={5} max={40} start={16} unit="chairs"
          after="Locked. Now let us take it out in chunks."
          note="You know 6 × 10 = 60. Start there and see what is left." />;

      case 2:
        return <ExploreChips draw={makeLadder55(n)} height={260}
          label="Take out one chunk at a time"
          value={n}
          onPick={(v) => setN(v)}
          chips={CHUNKS.map((c, k) => ({ v: k + 1, label: "\u2212 " + (c.q * 6).toLocaleString("en-US") }))}
          caption={<MathEl omml={M.chunks} size="lg" display="block" />}
          footnote="Every chunk is a number of groups you could see straight away." />;

      case 3:
        return <ExploreChips draw={makeArea55(m)} height={256}
          label="Build the rectangle"
          value={m}
          onPick={(v) => setM(v)}
          chips={CHUNKS.map((c, k) => ({ v: k + 1, label: "+ " + c.q }))}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="The height is the divisor. The widths add up to the answer." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[{ id: "s1", text: "16", target: "t1" }, { id: "s2", text: "12", target: "t2" }, { id: "s3", text: "23", target: "t3" }]}
          targets={[{ id: "t1", label: "96 ÷ 6" }, { id: "t2", label: "84 ÷ 7" }, { id: "t3", label: "92 ÷ 4" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Zahra's way — big chunks", omml: M.bigChunk, h: 92, quote: "I took 10 rows out at once, then the last 6." }}
          right={{ name: "Omar's way — smaller chunks", omml: M.chunks, h: 92, quote: "I took 5 at a time until I ran out." }}
          same={["Both get 16", "Both subtract multiples of 6", "Both add their chunks at the end"]}
          diff={["Zahra took two steps, Omar took three", "Omar's chunks were easier to see", "Zahra finished faster"]} />;

      case 6:
        return <BoardScreen draw={drawBoard55} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "take out easy chunks · then add the chunks" }]}
          hand={"how many groups can you see? · take them out · look at what is left · add the chunks"}
          cards={[
            { title: "The division we did", omml: M.answer, note: "10 groups, then 6 more" },
            { title: "Tap to see the chunks", omml: M.estimate, revealOmml: M.chunks, reveal: true,
              note: "the chunks add up to the quotient" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Use partial quotients for 84 ÷ 7."
          omml={M.swyk}
          options={[{ v: "a", text: "10" }, { v: "b", text: "12" }, { v: "c", text: "14" }, { v: "d", text: "11 r 7" }]}
          right="b"
          support={{
            yes: "Yes — 7 × 10 = 70 leaves 14, and 7 × 2 = 14. So 10 + 2 = 12.",
            notYet: "Not yet — check whether another whole group would still fit.",
            draw: drawSupport55, h: 96,
            hint: "After taking 10 groups you still have 14 left — that is 2 more groups."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Share about a hundred small things at home into equal groups by taking out chunks of ten." />;

      default: return null;
    }
  }
};
