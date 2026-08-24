/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-2 · Estimate Sums and Differences
   Standard 4.NBT.B.4     I can ... estimate sums and differences of
   multi-digit numbers, and say whether an answer is reasonable.
   =========================================================================== */

const M = {
  problem: om(mt("4,285+3,671")),
  roundThousand: om(mt("4,000+4,000=8,000")),
  roundHundred: om(mt("4,300+3,700=8,000")),
  exact: om(mt("4,285+3,671=7,956")),
  diffProblem: om(mt("8,142-2,905")),
  diffEstimate: om(mt("8,000-3,000=5,000")),
  swyk: om(mt("5,218+2,874")),
  swykEstimate: om(mt("5,000+3,000=8,000")),
  reasonable: om(mnor("close enough to check the answer"))
};

/* Warm-Up / Launch: a receipt, and the estimate hovering beside it */
const drawReceipt = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 260), p3 = D.at(f, 270, 420);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  ctx.save();
  ctx.globalAlpha = p1 * 0.9;
  D.rr(ctx, W / 2 - 116, 26, 232, H - 74, 10);
  ctx.strokeStyle = "rgba(234,244,242,.4)"; ctx.lineWidth = 1.6; ctx.stroke();
  ctx.restore();
  D.txt(ctx, "book fair", W / 2, 48, { size: 12, col: "#C9A227", font: "marker", alpha: p1 });

  const rows = [["Monday", 4285], ["Tuesday", 3671]];
  rows.forEach((r, n) => {
    const a = D.at(p2, n * 0.4, n * 0.4 + 0.5);
    if (a <= 0) return;
    D.txt(ctx, r[0], W / 2 - 92, 84 + n * 34, { size: 13, col: "rgba(234,244,242,.7)", font: "marker", align: "left", alpha: a });
    D.txt(ctx, r[1].toLocaleString("en-US"), W / 2 + 92, 84 + n * 34,
      { size: 17, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
  });

  if (p3 > 0) {
    D.marker(ctx, [[W / 2 - 96, 136], [W / 2 + 96, 136]], p3, "rgba(234,244,242,.5)", 1.6);
    D.txt(ctx, "about how many books?", W / 2, 168, { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "4,000 + 4,000 = 8,000", W / 2, H - 34,
      { size: 19, col: "#34D399", font: "marker", alpha: D.at(f, 360, 450) });
  }
};

/* Monitor A: round both addends on their own line */
const makeRoundBoth = (place) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cfg = place === 1000
    ? [{ v: 4285, lo: 4000, hi: 5000 }, { v: 3671, lo: 3000, hi: 4000 }]
    : [{ v: 4285, lo: 4200, hi: 4300 }, { v: 3671, lo: 3600, hi: 3700 }];
  cfg.forEach((c, n) => {
    D.roundLine(ctx, { x: 62, y: 62 + n * 96, w: W - 124, lo: c.lo, hi: c.hi, value: c.v, prog: 1 });
  });
  const est = place === 1000 ? "4,000 + 4,000 = 8,000" : "4,300 + 3,700 = 8,000";
  D.txt(ctx, est, W / 2, H - 18, { size: 16, col: "#C9A227", font: "marker" });
};

/* Monitor B: how close is the estimate to the exact answer? */
const makeCloseness = (place) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const exact = 7956;
  const est = place === 1000 ? 8000 : place === 100 ? 8000 : 7960;
  const x = 56, w = W - 112, y = H / 2 + 6;
  const lo = 7800, hi = 8100;
  const px = (n) => x + ((n - lo) / (hi - lo)) * w;
  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.7)", 2.2);
  [7800, 7900, 8000, 8100].forEach((n) => {
    ctx.save(); ctx.strokeStyle = "rgba(234,244,242,.4)"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(px(n), y - 7); ctx.lineTo(px(n), y + 7); ctx.stroke(); ctx.restore();
    D.txt(ctx, n.toLocaleString("en-US"), px(n), y + 24, { size: 10.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 500 });
  });
  ctx.save();
  ctx.beginPath(); ctx.arc(px(exact), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#34D399"; ctx.fill(); ctx.restore();
  D.txt(ctx, "exact 7,956", px(exact), y - 26, { size: 12.5, col: "#34D399", font: "marker" });

  ctx.save();
  ctx.beginPath(); ctx.arc(px(est), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#C9A227"; ctx.fill(); ctx.restore();
  D.txt(ctx, "estimate " + est.toLocaleString("en-US"), px(est), y + 50, { size: 12.5, col: "#C9A227", font: "marker" });

  const gap = Math.abs(est - exact);
  D.txt(ctx, "off by " + gap, W / 2, 34, { size: 15, col: gap <= 20 ? "#34D399" : "#FA7E19", font: "marker" });
  D.txt(ctx, place === 10 ? "rounding to a smaller place gets you closer"
                          : "close enough to check whether an answer makes sense",
    W / 2, H - 14, { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawBoard22 = (ctx, W, H, frame) => {
  const CYCLE = 740, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Is that answer reasonable?" });
  const p1 = D.at(f, 20, 150), p2 = D.at(f, 150, 320), p3 = D.at(f, 320, 480), p4 = D.at(f, 470, 630);

  D.txt(ctx, "4,285 + 3,671", W / 2, 96, { size: 28, col: "#EAF4F2", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.roundLine(ctx, { x: 84, y: 168, w: W - 168, lo: 4000, hi: 5000, value: 4285, prog: p2 });
  }
  if (p3 > 0) {
    D.roundLine(ctx, { x: 84, y: 268, w: W - 168, lo: 3000, hi: 4000, value: 3671, prog: p3 });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "4,000 + 4,000 = 8,000 — so the answer should be near 8,000",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 510, 590) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 550, 650), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport22 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.roundLine(ctx, { x: 40, y: 32, w: W - 80, lo: 5000, hi: 6000, value: 5218, prog: 1 });
};

const LESSON = {
  code: "2-2",
  storageKey: "daf-g4-t2-l2",
  title: "Estimate Sums and Differences",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-2 · 4.NBT.B.4",
  math: M,
  ixl: ["DU5", "5TQ", "5F9", "GWS"],

  metas: [
    { phase: "warmup", title: "Which estimate <em>doesn't belong</em>?",
      lead: "Four estimates for the same sum. Every one of them has a reason.",
      goal: "Reasoning before answers — no card is wrong.",
      pull: "Some estimates are closer than others. Does that always matter?",
      rail: { launch: "Choose a card, then convince your partner.",
        monitor: ["Reasoning from the rounding place", "Reasoning from how close it is", "Reasoning from ease"],
        connect: "Can every card be the odd one out?",
        misconception: "Assuming the closest estimate is always the best one." } },

    { phase: "launch", title: "About how many <em>books</em>?",
      lead: "The book fair sold 4,285 on Monday and 3,671 on Tuesday. Nobody needs the exact number yet.",
      goal: "Create the need — an estimate answers a different question than an exact sum.",
      pull: "Estimate first. Then we will see how close you were.",
      rail: { launch: "The head teacher wants a number for the newsletter by lunchtime. Exact, or about?",
        monitor: ["Adding exactly", "Rounding both to thousands", "Rounding only one number"],
        connect: "When is about good enough, and when is it not?",
        misconception: "Estimating is what you do when you cannot do the real thing." } },

    { phase: "monitor", title: "Round <em>both</em> numbers",
      lead: "Put each number on its own line and find the nearer end.",
      goal: "Estimating a sum means rounding each addend first.",
      pull: "Different rounding places give different estimates. Which is better?",
      rail: { launch: "Predict each rounded number before you tap.",
        monitor: ["Rounding both to the same place", "Rounding to different places", "Rounding only the bigger number"],
        connect: "Why round both to the same place?",
        misconception: "Rounding after adding instead of before." } },

    { phase: "monitor", title: "How <em>close</em> is close enough?",
      lead: "Compare each estimate against the exact answer.",
      goal: "A smaller rounding place gives a closer estimate — and more work.",
      pull: "Sort some estimates and decide which place each used.",
      rail: { launch: "Predict whether the estimate will land above or below the exact answer.",
        monitor: ["Measuring the gap", "Noticing both rounded up", "Judging good enough for the purpose"],
        connect: "What would make an estimate too rough to be useful?",
        misconception: "Believing an estimate is wrong because it is not exact." } },

    { phase: "monitor", title: "Sort the <em>estimates</em>",
      lead: "Which rounding place produced each estimate? No grading until the class commits.",
      goal: "Read an estimate backwards to find the strategy.",
      pull: "Two students estimated the same difference differently.",
      rail: { launch: "Look at the zeros. What do they tell you?",
        monitor: ["Counting zeros", "Checking against the original numbers", "Rounding again to test"],
        connect: "How did you know which place was used?",
        misconception: "Matching by the leading digit only." } },

    { phase: "connect", title: "Over or <em>under</em>?",
      lead: "Dana rounded both up. Bilal rounded one up and one down.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Predicting over or under", "Explaining why both up means too big", "Choosing for a purpose"],
        connect: "If you must not run out of chairs, do you want an over-estimate or an under-estimate?",
        misconception: "Thinking an over-estimate is a mistake." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One line for each number. Round each to the nearer end. Then add the friendly numbers.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Finding halfway first", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Rounding the answer instead of the addends." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Linking to rounding", "Testing on a difference", "Asking which place to choose"],
        connect: "Does the same rule work for subtraction?",
        misconception: "Rounding both numbers up in a subtraction and expecting the same accuracy." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show your two rounded numbers.",
        monitor: ["Rounding both to thousands", "Adding exactly then rounding", "Rounding to hundreds"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Rounding 2,874 down to 2,000." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the exact answer, column by column.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the line", "Ready for the algorithm"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [place, setPlace] = useState(1000);
    const [closeness, setCloseness] = useState(1000);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Four estimates for 4,285 + 3,671. Which one doesn't belong?"
          cards={[
            { id: "a", text: "8,000", why: "Both rounded to the nearest thousand — the quickest estimate" },
            { id: "b", text: "7,960", why: "Rounded to the nearest ten — the closest, and the most work" },
            { id: "c", text: "7,956", why: "The only one that is not an estimate at all — it is exact" },
            { id: "d", text: "7,900", why: "Both rounded down — the only estimate below the exact answer" }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawReceipt} height={262} award={award}
          label="About how many books were sold in total?"
          min={6000} max={10000} start={8000} unit="books"
          after="Locked. Now let us see how you would defend that number."
          note="The newsletter needs a number by lunchtime, not a perfect one." />;

      case 2:
        return <ExploreChips draw={makeRoundBoth(place)} height={262}
          label="Round both numbers to the ..."
          value={place}
          onPick={(v) => setPlace(v)}
          chips={[{ v: 1000, label: "nearest thousand" }, { v: 100, label: "nearest hundred" }]}
          caption={<MathEl omml={place === 1000 ? M.roundThousand : M.roundHundred} size="xl" display="block" />}
          footnote="Round each addend first, then add the friendly numbers." />;

      case 3:
        return <ExploreChips draw={makeCloseness(closeness)} height={252}
          label="Compare each estimate with the exact answer"
          value={closeness}
          onPick={(v) => setCloseness(v)}
          chips={[{ v: 1000, label: "to thousands" }, { v: 100, label: "to hundreds" }, { v: 10, label: "to tens" }]}
          caption={<MathEl omml={M.exact} size="lg" display="block" />}
          footnote="Closer costs more effort. Choose the estimate that fits the job." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[
            { id: "e1", text: "8,000", target: "th" },
            { id: "e2", text: "7,960", target: "te" },
            { id: "e3", text: "7,900", target: "hu" }
          ]}
          targets={[
            { id: "th", label: "rounded to the nearest thousand" },
            { id: "hu", label: "rounded to the nearest hundred, both down" },
            { id: "te", label: "rounded to the nearest ten" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Dana's way — round both up", omml: M.roundThousand, h: 92,
                  quote: "I rounded both up, so I know the real answer is smaller." }}
          right={{ name: "Bilal's way — one up, one down", omml: M.roundHundred, h: 92,
                   quote: "One went up and one went down, so they cancel out a bit." }}
          same={["Both land near 8,000", "Both round before adding", "Both are useful for the newsletter"]}
          diff={["Dana knows hers is too big", "Bilal's is closer to the exact answer", "Dana's is faster to do in her head"]} />;

      case 6:
        return <BoardScreen draw={drawBoard22} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.reasonable, alt: "close enough to check the answer" }]}
          hand={"round each number first · add or subtract the friendly numbers · use it to check the exact answer"}
          cards={[
            { title: "The sum we estimated", omml: M.roundThousand, note: "the exact answer is 7,956" },
            { title: "Tap to test it on a difference", omml: M.diffProblem, revealOmml: M.diffEstimate, reveal: true,
              note: "the same rule works for subtraction" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Estimate 5,218 + 2,874 by rounding both to the nearest thousand."
          omml={M.swyk}
          options={[{ v: "a", text: "7,000" }, { v: "b", text: "8,000" }, { v: "c", text: "8,100" }, { v: "d", text: "9,000" }]}
          right="b"
          support={{
            yes: "Yes — 5,000 + 3,000 = 8,000. The exact answer, 8,092, is close.",
            notYet: "Not yet — round each number on its own line first.",
            draw: drawSupport22, h: 82,
            hint: "Is 5,218 nearer to 5,000 or 6,000? Now do the same for 2,874."
          }} />;

      case 9:
        return <Closing game={game} omml={M.roundThousand}
          action="Estimate the total of two prices at the shop before you reach the till, then check the receipt." />;

      default: return null;
    }
  }
};
