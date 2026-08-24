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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A division being taken apart in stages. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "The numbers on the right are going to add up to something.",
      rail: { launch: "I am not asking for the answer. Just describe what is happening.",
        monitor: ["Noticing the subtractions", "Reading the column on the right", "Watching the number shrink"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the right-hand column as separate answers rather than parts of one." } },

    { phase: "launch", title: "Seven hundred and thirty-eight dates, <em>six boxes</em>",
      lead: "738 dates packed into 6 equal boxes. Estimate first.",
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
      lead: "Lina took 100 then 20 then 3. Sami took 100 six times over. Both reach 123.",
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
        connect: "What happens when the last chunk does not come out exactly?",
        misconception: "Stopping while there is still enough left for another group." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show your chunks, then add them.",
        monitor: ["Taking a big first chunk", "Adding the chunks", "Checking the leftover"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Forgetting the remainder of 1." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: sharing place value blocks instead of chunking.",
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
        return <NoticeWonder draw={makeLadder56(CHUNKS.length)} height={260} award={award}
          notices={["The big number keeps shrinking", "There is a column on the right", "Each step subtracts", "It ends near zero"]}
          wonders={["What do the right-hand numbers mean?", "Could I take bigger chunks?", "Is that the answer?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory56} height={256} award={award}
          label="About how many dates per box?" min={50} max={300} start={120} unit="dates"
          after="Locked. Now let us take it out in chunks."
          note="6 × 100 = 600. That one chunk does most of the work." />;

      case 2:
        return <ExploreChips draw={makeLadder56(n)} height={260}
          label="Take out one chunk at a time"
          value={n}
          onPick={(v) => setN(v)}
          chips={CHUNKS.map((c, k) => ({ v: k + 1, label: "\u2212 " + (c.q * 6).toLocaleString("en-US") }))}
          caption={<MathEl omml={M.chunks} size="lg" display="block" />}
          footnote="Every chunk is a number of groups you could see straight away." />;

      case 3:
        return <ExploreChips draw={makeArea56(m)} height={256}
          label="Build the rectangle"
          value={m}
          onPick={(v) => setM(v)}
          chips={CHUNKS.map((c, k) => ({ v: k + 1, label: "+ " + c.q }))}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="The height is the divisor. The widths add up to the answer." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[{ id: "u1", text: "123", target: "v1" }, { id: "u2", text: "214 r 1", target: "v2" }, { id: "u3", text: "96", target: "v3" }]}
          targets={[{ id: "v1", label: "738 ÷ 6" }, { id: "v2", label: "857 ÷ 4" }, { id: "v3", label: "672 ÷ 7" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Lina's way — hundreds, tens, ones", omml: M.bigChunk, h: 92, quote: "100 groups, then 20, then 3." }}
          right={{ name: "Sami's way — same chunk repeated", omml: M.chunks, h: 92, quote: "I kept taking 100 groups until I could not." }}
          same={["Both get 123", "Both subtract multiples of 6", "Both add their chunks"]}
          diff={["Lina took three steps, Sami took more", "Lina used place value to choose", "Sami never had to think about size"]} />;

      case 6:
        return <BoardScreen draw={drawBoard56} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "start with the biggest chunk you can see" }]}
          hand={"how many groups can you see? · take them out · look at what is left · add the chunks"}
          cards={[
            { title: "The division we did", omml: M.answer, note: "100 groups, then 20, then 3" },
            { title: "Tap to see the chunks", omml: M.estimate, revealOmml: M.chunks, reveal: true,
              note: "the chunks add up to the quotient" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Use partial quotients for 857 ÷ 4."
          omml={M.swyk}
          options={[{ v: "a", text: "214" }, { v: "b", text: "214 r 1" }, { v: "c", text: "213 r 5" }, { v: "d", text: "200 r 57" }]}
          right="b"
          support={{
            yes: "Yes — 200 groups uses 800, then 14 more groups uses 56, leaving 1.",
            notYet: "Not yet — check whether another whole group would still fit.",
            draw: drawSupport56, h: 96,
            hint: "After 200 groups you have 57 left. How many more fours fit, and what is left?"
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Divide a three-digit number at home by taking out a chunk of one hundred groups first." />;

      default: return null;
    }
  }
};
