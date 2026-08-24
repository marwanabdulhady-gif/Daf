/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-7 · Use Sharing to Divide
   Standard 4.NBT.B.6   I can ... share place-value blocks into equal groups,
   biggest units first.
   =========================================================================== */

const M = {
  problem: om(mt("52\u00f74")),
  answer: om(mt("52\u00f74=13")),
  shareTens: om(mnor("share the tens first: "), mt("1"), mnor(" tens each")),
  regroup: om(mnor("regroup what is left, then share the ones")),
  check: om(mt("13\u00d74=52")),
  rule: om(mnor("share the biggest units first, then regroup")),
  swyk: om(mt("75\u00f75")),
  swykAnswer: om(mt("75\u00f75=15"))
};

/* place-value blocks being shared, tens then ones */
const makeShareBlocks57 = (stage) => (ctx, W, H, frame) => {
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
      for (var t = 0; t < 1; t++) {
        D.digitBlocks(ctx, { x: gx + 10 + t * 12, y: base - s * 10, unit: 10, prog: 1, col: "#2D70B3", s: s });
      }
    }
    if (stage >= 2) {
      for (var o = 0; o < 3; o++) {
        D.digitBlocks(ctx, { x: gx + 10 + (o % 4) * 10, y: base - s - Math.floor(o / 4) * 10,
          unit: 1, prog: 1, col: "#C9A227", s: s });
      }
    }
    D.txt(ctx, stage >= 2 ? "13" : stage >= 1 ? "1 tens" : "?",
      gx + (gw - 12) / 2, base + 20, { size: 12.5, col: "#EAF4F2", font: "marker" });
  }
  const captions = [
    "52 to share between 4",
    "the tens are shared \u2014 12 still to go",
    "13 in each group — nothing left over"
  ];
  D.txt(ctx, captions[stage], W / 2, 28,
    { size: 14.5, col: stage === 2 ? "#34D399" : "#C9A227", font: "marker" });
  if (stage === 1) D.txt(ctx, "regroup the leftover ten into ones", W / 2, H - 14,
    { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

/* the written record beside the sharing */
const makeRecord57 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.partialQuotients(ctx, {
    dividend: 52, divisor: 4, chunks: [{ q: 10, label: "tens" }, { q: 3, label: "ones" }], shown: step,
    x: W / 2 - 96, y: 50, w: 130, lh: 32
  });
  D.txt(ctx, step >= 2 ? "10 + 3 = 13" : "one place at a time",
    W / 2, H - 14, { size: 13, col: step >= 2 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawStory57 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 350), p3 = D.at(f, 360, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "dates shared between four plates", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.shareGroups(ctx, { total: 52, groups: 4, dealt: Math.floor(52 * p2),
    x: 50, y: 52, w: W - 150, h: 92, s: 9 });
  if (p3 > 0) {
    D.txt(ctx, "52 dates · 4 plates", W / 2, H - 40, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many on each plate?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard57 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Share the tens, then the ones" });
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
      for (var t = 0; t < 1; t++) {
        D.digitBlocks(ctx, { x: gx + 10 + t * 13, y: base - s * 10 - 8, unit: 10, prog: p2, col: "#2D70B3", s: s });
      }
    }
    if (p3 > 0) {
      for (var o = 0; o < 3; o++) {
        D.digitBlocks(ctx, { x: gx + 10 + (o % 4) * 11, y: base - s - 8 - Math.floor(o / 4) * 11,
          unit: 1, prog: p3, col: "#C9A227", s: s });
      }
    }
  }
  if (p3 > 0) D.txt(ctx, "13 in each group", W / 2, base + 34,
    { size: 17, col: "#34D399", font: "marker", alpha: p3 });
  if (p4 > 0) {
    var yb = H - 40;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the leftover ten is not lost — it becomes ten ones", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 640, 740) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 680, 780), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport57 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.shareGroups(ctx, { total: 75, groups: 5, dealt: 75, x: 34, y: 14, w: W - 110, h: 54, s: 7 });
};

const LESSON = {
  code: "5-7",
  storageKey: "daf-g4-t5-l7",
  title: "Use Sharing to Divide",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-7 · 4.NBT.B.6",
  math: M,
  ixl: ["8QG", "M49"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Counters being dealt into equal groups. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Dealing one at a time works. It is just slow.",
      rail: { launch: "I am not asking how many each. Just watch the dealing.",
        monitor: ["Counting the groups", "Counting one group", "Predicting the end"],
        connect: "Who noticed something nobody else did?",
        misconception: "Believing sharing must always be one at a time." } },

    { phase: "launch", title: "Fifty-two dates, <em>four plates</em>",
      lead: "52 dates shared equally between 4 plates. Estimate first.",
      goal: "Create the need — share the big units first.",
      pull: "Estimate first, then share the tens.",
      rail: { launch: "Roughly how many each? Then \u2014 what would you share first?",
        monitor: ["Dealing one at a time", "Sharing tens first", "Guessing"],
        connect: "Why start with the tens and not the ones?",
        misconception: "Starting with the ones and losing track." } },

    { phase: "monitor", title: "Share the <em>tens</em> first",
      lead: "Hand out whole tens. Then look at what will not go round.",
      goal: "Sharing by place value, biggest units first.",
      pull: "The leftover ten has to be broken up.",
      rail: { launch: "Predict how many tens each group gets.",
        monitor: ["Sharing tens evenly", "Noticing the leftover", "Regrouping into ones"],
        connect: "What do you do with a ten that will not go round?",
        misconception: "Throwing away the leftover ten." } },

    { phase: "monitor", title: "The written <em>record</em>",
      lead: "The same sharing, written down one place at a time.",
      goal: "Connect the blocks to the written method.",
      pull: "Now match some divisions to their answers.",
      rail: { launch: "Predict each line before you step.",
        monitor: ["Matching blocks to lines", "Working tens then ones", "Losing the remainder"],
        connect: "Where are the tens in the written record?",
        misconception: "Reading the written record as a different method." } },

    { phase: "monitor", title: "Match the <em>quotient</em>",
      lead: "Which answer belongs to that division? No grading until the class commits.",
      goal: "Estimate first, then match.",
      pull: "Two students shared the same amount differently.",
      rail: { launch: "Estimate each one before you place it.",
        monitor: ["Estimating first", "Dividing exactly", "Checking by multiplying back"],
        connect: "Which did you estimate and which did you calculate?",
        misconception: "Matching by the size of the dividend alone." } },

    { phase: "connect", title: "Two ways to <em>share it</em>",
      lead: "Hala shared the tens first. Nawaf dealt one at a time. Both got 13.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Sharing tens first", "Dealing one at a time", "Checking both answers"],
        connect: "Whose method would still work with a thousand counters?",
        misconception: "Believing dealing one at a time is just as good." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Share the tens. Regroup what is left. Share the ones. Count what one group holds.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next share", "Naming the regroup", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting the regroup step." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the order of places", "Testing on a new division", "Checking by multiplying back"],
        connect: "What would happen with 5,200 dates?",
        misconception: "Sharing the ones before the tens." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Share the tens first.",
        monitor: ["Sharing tens first", "Regrouping correctly", "Reporting the remainder"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Sharing the ones first and losing a ten." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: sharing when the numbers get bigger.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the blocks", "Ready to choose a strategy"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [stage, setStage] = useState(0);
    const [step, setStep] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawStory57} height={256} award={award}
          notices={["They are dealt one at a time", "The groups fill up evenly", "There are 4 groups", "Some are left at the end"]}
          wonders={["How many each?", "Is there a faster way?", "What about the leftovers?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory57} height={256} award={award}
          label="About how many dates per plate?" min={5} max={30} start={13} unit="dates"
          after="Locked. Now let us share the tens first."
          note="52 is 5 tens and 2 ones. Only 4 of those tens will go round." />;

      case 2:
        return <ExploreChips draw={makeShareBlocks57(stage)} height={258}
          label="Share by place value"
          value={stage}
          onPick={(v) => setStage(v)}
          chips={[{ v: 0, label: "before sharing" }, { v: 1, label: "share the tens" }, { v: 2, label: "share the ones" }]}
          caption={<MathEl omml={stage >= 2 ? M.answer : M.shareTens} size="xl" display="block" />}
          footnote="A ten that will not go round is broken into ten ones." />;

      case 3:
        return <ExploreChips draw={makeRecord57(step)} height={256}
          label="Write it down as you go"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 1, label: "the tens" }, { v: 2, label: "the ones" }]}
          caption={<MathEl omml={M.regroup} size="lg" display="block" />}
          footnote="Every line of the record is a handful of blocks." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[{ id: "s1", text: "13", target: "t1" }, { id: "s2", text: "15", target: "t2" }, { id: "s3", text: "12", target: "t3" }]}
          targets={[{ id: "t1", label: "52 ÷ 4" }, { id: "t2", label: "75 ÷ 5" }, { id: "t3", label: "72 ÷ 6" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Hala's way — tens first", omml: M.shareTens, h: 92, quote: "One ten each, then I broke the last one up." }}
          right={{ name: "Nawaf's way — one at a time", omml: M.answer, h: 92, quote: "I dealt them out like cards until they ran out." }}
          same={["Both get 13", "Both share equally", "Both end with nothing left over"]}
          diff={["Hala shares tens, Nawaf shares ones", "Nawaf takes 52 moves", "Hala's method still works with hundreds"]} />;

      case 6:
        return <BoardScreen draw={drawBoard57} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "share the biggest units first, then regroup" }]}
          hand={"share the tens · regroup what will not go round · share the ones · count one group"}
          cards={[
            { title: "The sharing we did", omml: M.answer, note: "one ten and three ones each" },
            { title: "Tap to check it", omml: M.shareTens, revealOmml: M.check, reveal: true,
              note: "multiply back to prove it" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Share 75 between 5 groups."
          omml={M.swyk}
          options={[{ v: "a", text: "12" }, { v: "b", text: "15" }, { v: "c", text: "14" }, { v: "d", text: "13 r 5" }]}
          right="b"
          support={{
            yes: "Yes — one ten each uses 50, then 25 ones share as 5 each. 10 + 5 = 15.",
            notYet: "Not yet — share the tens first, then regroup what is left.",
            draw: drawSupport57, h: 92,
            hint: "Share the 7 tens first: 5 go round, 2 are left to regroup."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Share a handful of things at home into equal groups by giving out tens first." />;

      default: return null;
    }
  }
};
