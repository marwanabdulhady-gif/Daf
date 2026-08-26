/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-8 · Continue Sharing to Divide
   Standard 4.NBT.B.6   I can ... share a 3-digit number into equal groups, and
   report a remainder when one is left.
   =========================================================================== */

const M = {
  problem: om(mt("278\u00f74")),
  answer: om(mt("278\u00f74=69 r 2")),
  shareTens: om(mnor("share the tens first: "), mt("6"), mnor(" tens each")),
  regroup: om(mnor("regroup what is left, then share the ones")),
  check: om(mt("69\u00d74+2=278")),
  rule: om(mnor("share hundreds, then tens, then ones")),
  swyk: om(mt("365\u00f73")),
  swykAnswer: om(mt("365\u00f73=121 r 2"))
};

/* place-value blocks being shared, tens then ones */
const makeShareBlocks58 = (stage) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const groups = 4, s = 6.5, base = H - 62;
  const gw = (W - 90) / groups;
  for (var g = 0; g < groups; g++) {
    var gx = 46 + g * gw;
    ctx.save();
    D.rr(ctx, gx, 44, gw - 12, base - 34, 8);
    ctx.strokeStyle = "rgba(234,244,242,.24)"; ctx.lineWidth = 1.3; ctx.stroke();
    ctx.restore();
    if (stage >= 1) {
      for (var t = 0; t < 6; t++) {
        D.digitBlocks(ctx, { x: gx + 10 + t * 12, y: base - s * 10, unit: 10, prog: 1, col: "#2D70B3", s: s });
      }
    }
    if (stage >= 2) {
      for (var o = 0; o < 9; o++) {
        D.digitBlocks(ctx, { x: gx + 10 + (o % 4) * 10, y: base - s - Math.floor(o / 4) * 10,
          unit: 1, prog: 1, col: "#C9A227", s: s });
      }
    }
    D.txt(ctx, stage >= 2 ? "69" : stage >= 1 ? "6 tens" : "?",
      gx + (gw - 12) / 2, base + 20, { size: 12.5, col: "#EAF4F2", font: "marker" });
  }
  const captions = [
    "278 to share between 4",
    "the tens are shared \u2014 38 still to go",
    "69 in each group, 2 left over"
  ];
  D.txt(ctx, captions[stage], W / 2, 28,
    { size: 14.5, col: stage === 2 ? "#34D399" : "#C9A227", font: "marker" });
  if (stage === 1) D.txt(ctx, "regroup the leftover ten into ones", W / 2, H - 14,
    { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

/* the written record beside the sharing */
const makeRecord58 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.partialQuotients(ctx, {
    dividend: 278, divisor: 4, chunks: [{ q: 60, label: "tens" }, { q: 9, label: "ones" }], shown: step,
    x: W / 2 - 96, y: 50, w: 130, lh: 32
  });
  D.txt(ctx, step >= 2 ? "60 + 9 = 69, remainder 2" : "one place at a time",
    W / 2, H - 14, { size: 13, col: step >= 2 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawStory58 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 350), p3 = D.at(f, 360, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "books packed into four crates", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.shareGroups(ctx, { total: 38, groups: 4, dealt: Math.floor(38 * p2),
    x: 50, y: 52, w: W - 150, h: 92, s: 10 });
  if (p3 > 0) {
    D.txt(ctx, "278 books · 4 crates", W / 2, H - 40, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many books in each crate?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard58 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Keep going down the places" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 600), p4 = D.at(f, 600, 760);
  const groups = 4, s = 7, base = 250;
  const gw = (W - 220) / groups;
  for (var g = 0; g < groups; g++) {
    var gx = 110 + g * gw;
    var a = D.at(p1, g / groups, g / groups + 0.5);
    if (a <= 0) continue;
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, gx, 108, gw - 14, base - 100, 8);
    ctx.strokeStyle = "rgba(234,244,242,.28)"; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.restore();
    if (p2 > 0) {
      for (var t = 0; t < 6; t++) {
        D.digitBlocks(ctx, { x: gx + 10 + t * 13, y: base - s * 10 - 8, unit: 10, prog: p2, col: "#2D70B3", s: s });
      }
    }
    if (p3 > 0) {
      for (var o = 0; o < 9; o++) {
        D.digitBlocks(ctx, { x: gx + 10 + (o % 4) * 11, y: base - s - 8 - Math.floor(o / 4) * 11,
          unit: 1, prog: p3, col: "#C9A227", s: s });
      }
    }
  }
  if (p3 > 0) D.txt(ctx, "69 in each group", W / 2, base + 34,
    { size: 17, col: "#34D399", font: "marker", alpha: p3 });
  if (p4 > 0) {
    var yb = H - 40;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "when nothing more will go round, what is left is the remainder", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 640, 740) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 680, 780), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport58 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.shareGroups(ctx, { total: 38, groups: 3, dealt: 38, x: 34, y: 14, w: W - 110, h: 54, s: 7 });
};

const LESSON = {
  code: "5-8",
  storageKey: "daf-g4-t5-l8",
  title: "Continue Sharing to Divide",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-8 · 4.NBT.B.6",
  math: M,
  ixl: ["5FE", "JYD", "UFM"],

  metas: [
    { phase: "warmup", title: "The share that <em>crosses a place</em>",
      lead: "278 books, 4 crates. The 2 hundreds will not go round at all — the share has to cross from hundreds to tens.",
      goal: "Notice a share can cross a place: 2 hundreds become 22 tens.",
      pull: "278 is 2 hundreds, 7 tens and 8 ones — the hundreds will not go round.",
      rail: { launch: "Fictional frame. Watch the sharing — no working yet.",
        monitor: ["Seeing the stuck hundreds", "Predicting the regroup", "Counting the rounds"],
        connect: "What happens to the 2 hundreds that will not go round?",
        misconception: "Stopping when the hundreds cannot be shared." } },

    { phase: "launch", title: "About how many <em>books per crate</em>?",
      lead: "278 books, 4 crates. Lock the per-crate number before the crossing begins.",
      goal: "Create the need — a three-place share needs the crossing.",
      pull: "The book count is simulated — the crossing works on any division.",
      rail: { launch: "Give a per-crate number and say what you saw.",
        monitor: ["Estimating with 280 ÷ 4", "Predicting 69", "Noticing the remainder 2"],
        connect: "What will the 2 hundreds become?",
        misconception: "Answering 6 r 178 — the share stopped at the hundreds." } },

    { phase: "monitor", title: "Zayd shares the <em>tens first</em>",
      lead: "The 2 hundreds become 22 tens. Six tens go to each crate, two tens are left — they cross into the ones.",
      goal: "Share hundreds, then tens, then ones — regrouping across each place.",
      pull: "The share continues after the largest place is exhausted.",
      rail: { launch: "Before each crossing: what is being regrouped?",
        monitor: ["Regrouping the hundreds", "Sharing the 22 tens", "Regrouping the 2 tens"],
        connect: "Why did the tens have to be crossed twice?",
        misconception: "Leaving the unshared tens unregrouped." } },

    { phase: "monitor", title: "Write it down <em>as you go</em>",
      lead: "Every line of the record is a handful of blocks: 6 tens each, then the crossed ones.",
      goal: "Record the crossing as it happens — the record is the proof.",
      pull: "Every line of the record is a handful of blocks.",
      rail: { launch: "Before each line: which handful is it?",
        monitor: ["Writing the tens line", "Writing the ones line", "Naming the remainder 2"],
        connect: "How does the record prove 69 r 2?",
        misconception: "Recording the quotient without the remainder." } },

    { phase: "monitor", title: "Match the <em>share</em>",
      lead: "Three shares from the warehouse. Each one belongs to one division.",
      goal: "Check a three-place share against its division.",
      pull: "Multiply back and add the remainder.",
      rail: { launch: "Check each claim by multiplying back before you place it.",
        monitor: ["Multiplying back 278 ÷ 4", "Checking 365 ÷ 3 with its remainder", "Checking 504 ÷ 6"],
        connect: "Which claim failed its check?",
        misconception: "Checking the quotient and ignoring the remainder." } },

    { phase: "connect", title: "Dana follows <em>places</em>. Yousef chooses <em>chunks</em>",
      lead: "Dana: hundreds, tens, ones, always. Yousef: 60 groups, then 9. Both get 69 remainder 2.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the orders", "Checking both end at 69 r 2", "Saying which is easier to record"],
        connect: "When do chunks beat the fixed place order?",
        misconception: "Believing the place order is the only valid order." } },

    { phase: "synth", title: "On the <em>board</em>: the share crosses the place",
      lead: "Hundreds, then tens, then ones — each crossing shown, each remainder named.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the crossing", "Naming the regroup", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Crossing a place without regrouping the amount." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "365 between 3 groups — the share crosses places, and two are left over.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the crossings.",
        monitor: ["Sharing the hundreds", "Sharing the tens", "Naming the remainder 2"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 121 — the remainder was dropped." } },

    { phase: "connect", title: "The crates are <em>balanced</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: three loading methods — read the numbers before you pick.",
      rail: { launch: "Ask three students to say the crossing in their own words.",
        monitor: ["Able to explain the regrouping", "Still stops at a place", "Ready to choose a method"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [stage, setStage] = useState(0);
    const [step, setStep] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The share that crosses a place"
            text="278 books, 4 crates. The 2 hundreds will not go round at all — the share has to cross from hundreds to tens."
            clue="The hundreds will not go round — they become tens.">
            <NoticeWonder draw={drawStory58} height={256} award={award}
              notices={["They are dealt one at a time", "The groups fill up evenly", "There are 4 groups", "Some are left at the end"]}
              wonders={["How many each?", "Is there a faster way?", "What about the leftovers?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The books per crate, before the crossing"
            text="Omar asks the warehouse's question: 278 books, 4 crates — about how many per crate, and what will the stuck hundreds become?"
            clue="2 hundreds become 22 tens.">
            <LaunchEstimate draw={drawStory58} height={256} award={award}
              label="About how many books per crate?" min={30} max={120} start={70} unit="books"
              after="Locked. Now let us share the tens first."
              note="The book count is simulated — the crossing works on any division." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd shares across the place"
            text="He can stop the sharing at any crossing — the class must see the hundreds become tens, and the tens become ones."
            clue="The share continues after the largest place is exhausted.">
            <ExploreChips draw={makeShareBlocks58(stage)} height={258}
              label="Share by place value"
              value={stage}
              onPick={(v) => setStage(v)}
              chips={[{ v: 0, label: "before sharing" }, { v: 1, label: "share the tens" }, { v: 2, label: "share the ones" }]}
              caption={<MathEl omml={stage >= 2 ? M.answer : M.shareTens} size="xl" display="block" />}
              footnote="A place that will not go round is regrouped into the next one down." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar writes it down as he goes"
            text="His record is a handful of blocks per line — the crossings and the remainder in the same drawing."
            clue="Every line of the record is a handful of blocks.">
            <ExploreChips draw={makeRecord58(step)} height={256}
              label="Write it down as you go"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 1, label: "the tens" }, { v: 2, label: "the ones" }]}
              caption={<MathEl omml={M.regroup} size="lg" display="block" />}
              footnote="The remainder is part of the answer — 69 r 2." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the share"
            text="Omar and Zayd lay three shares on the warehouse board. Each one must survive its multiply-back check."
            clue="Multiply back and add the remainder.">
            <CardSort award={award} columns={3}
              items={[{ id: "u1", text: "69 r 2", target: "v1" }, { id: "u2", text: "121 r 2", target: "v2" }, { id: "u3", text: "84", target: "v3" }]}
              targets={[{ id: "v1", label: "278 ÷ 4" }, { id: "v2", label: "365 ÷ 3" }, { id: "v3", label: "504 ÷ 6" }]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 69 r 2"
            text="Dana follows the places, always. Yousef chooses chunks — 60, then 9. Both end at 69 remainder 2."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Dana's way — place by place", omml: M.shareTens, h: 92, quote: "Hundreds first, then tens, then ones." }}
              right={{ name: "Yousef's way — chunks", omml: M.answer, h: 92, quote: "I took out 60 groups, then 9 more." }}
              same={["Both get 69 remainder 2", "Both work from the biggest units", "Both check by multiplying back"]}
              diff={["Dana follows the places, Yousef chooses chunks", "Yousef can take any size chunk", "Dana's steps are always the same"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The crossing is drawn, not declared"
            text="Zayd builds only what the class can justify: the crossings shown, the remainders named, the record keeping them honest."
            clue="Share hundreds, then tens, then ones.">
            <BoardScreen draw={drawBoard58} height={430}
              caption="Share hundreds, then tens, then ones." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the balanced crates"
            text="365 between 3 groups. Show the crossings — and the remainder named."
            clue="1 hundred each, 2 tens each, 1 one each, and 2 left over.">
            <ShowWhatYouKnow award={award}
              prompt="Share 365 between 3 groups."
              omml={M.swyk}
              options={[{ v: "a", text: "121" }, { v: "b", text: "121 r 2" }, { v: "c", text: "120 r 5" }, { v: "d", text: "122" }]}
              right="b"
              support={{
                yes: "Yes — 1 hundred each, 2 tens each, 1 one each, and 2 left over.",
                notYet: "Not yet — share the tens first, then regroup what is left.",
                draw: drawSupport58, h: 92,
                hint: "After sharing the hundreds and tens you have 5 ones. Three go round, two do not."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The crates are balanced"
            text="Omar signs the balanced crates: every crossing shown, every remainder named. Three loading methods now stand at the gate — the numbers themselves decide which one to trust."
            artifact="Caravan schedule · three-place shares"
            next="Three loading methods at the gate — read the numbers before you pick a method.">
            <Closing game={game} omml={M.rule}
              action="Share a three-digit number of things at home and say what the remainder means." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
