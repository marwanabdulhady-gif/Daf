/* ===========================================================================
   Grade 4 · Topic 8 · LESSON 8-1 · Equivalent Fractions: Area Models
   Standard 4.NF.A.1   I can ... show that two fractions are equivalent by
   cutting the same whole into more pieces.
   =========================================================================== */

const M = {
  half: om(mfrac(1, 2)),
  twoFourths: om(mfrac(2, 4)),
  fourEighths: om(mfrac(4, 8)),
  chain: om(mfrac(1, 2), mt("="), mfrac(2, 4), mt("="), mfrac(4, 8)),
  sameShade: om(mnor("more pieces \u00b7 smaller pieces \u00b7 same amount")),
  thirds: om(mfrac(2, 3), mt("="), mfrac(4, 6)),
  rule: om(mnor("cutting every piece in two does not change how much is shaded")),
  swyk: om(mfrac(3, 4)),
  swykAnswer: om(mfrac(3, 4), mt("="), mfrac(6, 8))
};

const makeSplit = (split) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 60, y: 76, w: W - 120, h: 62, den: 2, num: 1, split: split, prog: 1 });
  D.txt(ctx, "the shaded part never moved", W / 2, 38,
    { size: 14, col: "#EAF4F2", font: "marker" });
  const names = { 1: "one half", 2: "two quarters", 4: "four eighths" };
  D.txt(ctx, names[split] + " \u2014 the same amount", W / 2, H - 16,
    { size: 14.5, col: split > 1 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeStack = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [[2, 1], [4, 2], [8, 4]];
  rows.forEach(function (r, k) {
    if (k >= n) return;
    D.fracBar(ctx, { x: 56, y: 38 + k * 62, w: W - 112, h: 34,
      den: r[0], num: r[1], prog: 1, col: "#2D70B3" });
  });
  if (n >= 3) {
    ctx.save();
    ctx.strokeStyle = "rgba(201,162,39,.7)"; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(56 + (W - 112) / 2, 32);
    ctx.lineTo(56 + (W - 112) / 2, 38 + 2 * 62 + 38);
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, "the edge lines up every time", W / 2, H - 10,
      { size: 13.5, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, "add the next bar", W / 2, H - 10, { size: 13, col: "#C9A227", font: "marker" });
  }
};

const drawCake = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 300), p3 = D.at(f, 320, 450);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "one tray of kunafa", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 62, y: 56, w: W - 124, h: 54, den: 2, num: 1,
    split: p2 > 0.6 ? 2 : 1, prog: p2, col: "#FA7E19" });
  if (p3 > 0) {
    D.txt(ctx, "cut every piece in half again", W / 2, 152,
      { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "is there more to eat now?", W / 2, H - 16,
      { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard81 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "More pieces, same amount" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 220, 400), p3 = D.at(f, 420, 600), p4 = D.at(f, 600, 750);
  D.fracBar(ctx, { x: 100, y: 104, w: W - 200, h: 48, den: 2, num: 1, prog: p1, col: "#2D70B3" });
  if (p2 > 0) D.fracBar(ctx, { x: 100, y: 190, w: W - 200, h: 48, den: 4, num: 2, prog: p2, col: "#2D70B3" });
  if (p3 > 0) D.fracBar(ctx, { x: 100, y: 276, w: W - 200, h: 48, den: 8, num: 4, prog: p3, col: "#2D70B3" });
  if (p3 > 0.6) {
    ctx.save();
    ctx.globalAlpha = D.at(f, 520, 620);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.4; ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(100 + (W - 200) / 2, 96);
    ctx.lineTo(100 + (W - 200) / 2, 336);
    ctx.stroke();
    ctx.restore();
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the cut moved \u2014 the amount did not",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 640, 730) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 680, 780), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport81 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 16, w: W - 52, h: 36, den: 4, num: 3, split: 2, prog: 1, col: "#2D70B3" });
};

const LESSON = {
  code: "8-1",
  storageKey: "daf-g4-t8-l1",
  title: "Equivalent Fractions: Area Models",
  unit: "GRADE 4 · TOPIC 8 · LESSON 8-1 · 4.NF.A.1",
  math: M,
  ixl: ["HYC"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "One tray, cut in half, then cut again. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "The knife moved. Did the amount?",
      rail: { launch: "I am not asking how much yet. Just watch the cutting.",
        monitor: ["Counting the pieces", "Noticing the shaded edge", "Saying there is more now"],
        connect: "Who noticed something nobody else did?",
        misconception: "Believing more pieces means more to eat." } },

    { phase: "launch", title: "Is there <em>more to eat</em>?",
      lead: "Half a tray, then every piece cut in half again. Estimate how much is shaded now.",
      goal: "Create the need — the number changes but the amount does not.",
      pull: "Watch the shaded edge, not the number of pieces.",
      rail: { launch: "Hands up if there is more now. Hands up if there is the same.",
        monitor: ["Saying more because 2 is bigger than 1", "Watching the edge", "Saying the same"],
        connect: "What would have to happen for there to be more?",
        misconception: "Comparing the numerators alone." } },

    { phase: "monitor", title: "Cut it <em>again</em>",
      lead: "Each cut doubles the pieces. Watch the shaded edge stay exactly where it is.",
      goal: "Equivalence is the same amount named differently.",
      pull: "Stack them up and the edges line up.",
      rail: { launch: "Predict the new fraction before you tap.",
        monitor: ["Doubling both numbers", "Doubling only the bottom", "Watching the edge"],
        connect: "What happened to both numbers each time?",
        misconception: "Doubling the denominator but not the numerator." } },

    { phase: "monitor", title: "Line them <em>up</em>",
      lead: "Three bars, three names, one edge.",
      goal: "Stacked bars make equivalence visible at a glance.",
      pull: "Now match some equivalent pairs.",
      rail: { launch: "Predict where the edge will fall on the next bar.",
        monitor: ["Lining the edges up", "Counting pieces", "Reading the fractions"],
        connect: "Why do all three edges meet?",
        misconception: "Thinking bars of different denominators cannot be compared." } },

    { phase: "monitor", title: "Equivalent or <em>not</em>?",
      lead: "Sort each pair. No grading until the class commits.",
      goal: "Apply the test to unfamiliar pairs.",
      pull: "Two students explained the same equivalence differently.",
      rail: { launch: "Sketch each one before you decide.",
        monitor: ["Drawing to check", "Doubling to check", "Guessing"],
        connect: "Which pair was hardest, and why?",
        misconception: "Assuming a bigger denominator means a smaller fraction always." } },

    { phase: "connect", title: "Two ways to <em>see it</em>",
      lead: "Shuraym watched the shaded edge. Munir counted pieces in each bar. Both say one half equals four eighths.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Watching the edge", "Counting pieces", "Doing both"],
        connect: "Whose way would work without a drawing?",
        misconception: "Believing you must always draw to be sure." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One half. Two quarters. Four eighths. Three names, one edge.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next bar", "Watching the dashed line", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Learning the three fractions by heart instead of the idea." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the doubling", "Testing on thirds", "Asking about cutting into three"],
        connect: "What if you cut every piece into three instead of two?",
        misconception: "Thinking only halving works." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Sketch the bar before you answer.",
        monitor: ["Doubling both numbers", "Doubling one", "Drawing to check"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 3/8 by doubling only the denominator." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the same idea on a number line.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready for number lines"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [split, setSplit] = useState(1);
    const [n, setN] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawCake} height={256} award={award}
          notices={["It was cut in half", "Now there are more pieces", "The shaded edge did not move", "The pieces are smaller"]}
          wonders={["Is there more now?", "Why does the edge stay?", "What do we call it now?"]} />;

      case 1:
        return <LaunchEstimate draw={drawCake} height={256} award={award}
          label="How many pieces are shaded after the second cut?" min={1} max={8} start={2} unit="pieces"
          after="Locked. Now watch the edge, not the pieces."
          note="More pieces is not the same as more cake." />;

      case 2:
        return <ExploreChips draw={makeSplit(split)} height={256}
          label="Cut every piece again"
          value={split}
          onPick={(v) => setSplit(v)}
          chips={[{ v: 1, label: "halves" }, { v: 2, label: "cut in 2" }, { v: 4, label: "cut in 4" }]}
          caption={<MathEl omml={split === 1 ? M.half : split === 2 ? M.twoFourths : M.fourEighths} size="xl" display="block" />}
          footnote="Both numbers double. The amount does not." />;

      case 3:
        return <ExploreChips draw={makeStack(n)} height={256}
          label="Stack the bars"
          value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 1, label: "halves" }, { v: 2, label: "+ quarters" }, { v: 3, label: "+ eighths" }]}
          caption={<MathEl omml={M.chain} size="xl" display="block" />}
          footnote="Different names, same point on the bar." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "e1", text: "1/2 and 3/6", target: "yes" },
            { id: "e2", text: "1/3 and 2/5", target: "no" },
            { id: "e3", text: "2/3 and 4/6", target: "yes" },
            { id: "e4", text: "3/4 and 4/5", target: "no" }
          ]}
          targets={[
            { id: "yes", label: "equivalent — same amount" },
            { id: "no", label: "not equivalent" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Shuraym's way — watch the edge", omml: M.sameShade, h: 92,
                  quote: "The shaded part ends in exactly the same place." }}
          right={{ name: "Munir's way — count pieces", omml: M.chain, h: 92,
                   quote: "Four out of eight is the same as one out of two." }}
          same={["Both say the amount is unchanged", "Both use the same bar", "Both get four eighths"]}
          diff={["Shuraym looks, Munir counts", "Munir's works without a picture", "Shuraym's shows why instantly"]} />;

      case 6:
        return <BoardScreen draw={drawBoard81} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "cutting every piece in two does not change how much is shaded" }]}
          hand={"cut every piece the same way \u00b7 both numbers grow \u00b7 the amount stays exactly where it was"}
          cards={[
            { title: "The chain we built", omml: M.chain, note: "three names for one amount" },
            { title: "Tap to cut into three", omml: M.half, revealOmml: M.thirds, reveal: true,
              note: "it works for any equal cut" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Cut every quarter in half. What is three quarters called now?"
          omml={M.swyk}
          options={[{ v: "a", text: "3/8" }, { v: "b", text: "6/8" }, { v: "c", text: "3/2" }, { v: "d", text: "6/4" }]}
          right="b"
          support={{
            yes: "Yes — 3/4 = 6/8. Both numbers doubled.",
            notYet: "Not yet — if the pieces double, the shaded pieces double too.",
            draw: drawSupport81, h: 78,
            hint: "Three shaded quarters become six shaded eighths."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Cut something at home into halves, then quarters, and show someone the amount did not change." />;

      default: return null;
    }
  }
};
