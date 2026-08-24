/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-4 · Estimate the Product of a Decimal and a
   Whole Number
   Standard 5.NBT.B.7   I can ... round a decimal to a friendly number and use
   it to estimate a product, and say whether the estimate is high or low.
   =========================================================================== */

const M = {
  problem: om(mnor("6 \u00d7 3.85")),
  roundUp: om(mnor("3.85 rounds to 4, so about 6 \u00d7 4 = 24")),
  high: om(mnor("we rounded up, so 24 is a little too high")),
  roundDown: om(mnor("or round to 3.9: 6 \u00d7 3.9 is about 23.4")),
  exact: om(mnor("the exact answer is 23.1")),
  benchmarks: om(mnor("round to the nearest whole \u00b7 or to the nearest tenth")),
  rule: om(mnor("round, multiply, then say whether the estimate is high or low")),
  swyk: om(mnor("estimate 4 \u00d7 2.9")),
  swykAnswer: om(mnor("about 12, and a little too high"))
};

/* the rounding move, on a number line */
const makeRound174 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 78, w = W - 156, y = 122;
  const lo = 3, hi = 4;
  const px = (v) => x + ((v - lo) / (hi - lo)) * w;

  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.8)", 2.4);
  for (let t = 0; t <= 10; t++) {
    const v = 3 + t / 10, big = t % 5 === 0;
    ctx.save();
    ctx.strokeStyle = big ? "rgba(234,244,242,.85)" : "rgba(234,244,242,.4)";
    ctx.lineWidth = big ? 2.2 : 1.2;
    ctx.beginPath(); ctx.moveTo(px(v), y - (big ? 10 : 6)); ctx.lineTo(px(v), y + (big ? 10 : 6));
    ctx.stroke();
    ctx.restore();
    if (big) D.txt(ctx, v.toFixed(1), px(v), y + 28, { size: 13, col: "#EAF4F2", font: "marker" });
  }
  D.txt(ctx, "halfway", px(3.5), y - 26, { size: 10.5, col: "#C9A227", font: "mono", weight: 700 });

  /* the value */
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.beginPath(); ctx.arc(px(3.85), y, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#FA7E19"; ctx.fill();
  ctx.restore();
  D.txt(ctx, "3.85", px(3.85), y - 44, { size: 15, col: "#FA7E19", font: "marker" });

  if (step >= 1) {
    const pts = [];
    for (let s2 = 0; s2 <= 16; s2++) {
      const t = s2 / 16;
      pts.push([px(3.85) + (px(4) - px(3.85)) * t, y - 20 - Math.sin(Math.PI * t) * 22]);
    }
    D.marker(ctx, pts, 1, "#388C46", 2.2);
    D.txt(ctx, "rounds up to 4", px(4) + 4, y - 62,
      { size: 13.5, col: "#388C46", font: "marker" });
  }
  D.txt(ctx, step === 0 ? "3.85 is past the halfway mark" : "so it rounds up to 4",
    W / 2, 30, { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, step >= 1 ? "6 \u00d7 4 = 24 \u2014 an estimate, not the answer"
       : "which whole number is it nearer to?",
    W / 2, H - 12, { size: 13.5, col: step >= 1 ? "#34D399" : "#C9A227", font: "marker",
      alpha: step >= 1 ? pulse + 0.4 : 1 });
};

/* high or low, checked against the exact answer */
const makeJudge174 = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cases = {
    whole: { est: 24, from: "3.85 rounds to 4", dir: "high", note: "we made each of the six bigger" },
    tenth: { est: 23.4, from: "3.85 rounds to 3.9", dir: "high", note: "closer, and still a little high" },
    down: { est: 18, from: "3.85 rounds down to 3", dir: "low", note: "we made each of the six smaller" }
  };
  const j = cases[which];
  const x = 80, w = W - 160, y = H - 74;
  const lo = 16, hi = 26;
  const px = (v) => x + ((v - lo) / (hi - lo)) * w;

  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.8)", 2.2);
  for (let v = 16; v <= 26; v += 2) {
    ctx.save();
    ctx.strokeStyle = "rgba(234,244,242,.6)"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(px(v), y - 8); ctx.lineTo(px(v), y + 8); ctx.stroke();
    ctx.restore();
    D.txt(ctx, String(v), px(v), y + 26, { size: 11.5, col: "rgba(234,244,242,.6)", font: "mono", weight: 600 });
  }
  /* the exact answer */
  ctx.save();
  ctx.beginPath(); ctx.arc(px(23.1), y, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#34D399"; ctx.fill();
  ctx.restore();
  D.txt(ctx, "exact 23.1", px(23.1), y - 46, { size: 13, col: "#34D399", font: "marker" });
  /* the estimate */
  const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
  ctx.save();
  ctx.globalAlpha = pulse + 0.4;
  ctx.beginPath(); ctx.arc(px(j.est), y, 8, 0, Math.PI * 2);
  ctx.strokeStyle = j.dir === "high" ? "#FA7E19" : "#C74440"; ctx.lineWidth = 2.4; ctx.stroke();
  ctx.restore();
  D.txt(ctx, "estimate " + j.est, px(j.est), y - 24,
    { size: 13.5, col: j.dir === "high" ? "#FA7E19" : "#C74440", font: "marker" });

  D.txt(ctx, j.from, W / 2, 34, { size: 15, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "the estimate is too " + j.dir + " \u2014 " + j.note, W / 2, H - 12,
    { size: 13.5, col: j.dir === "high" ? "#FA7E19" : "#C74440", font: "marker" });
};

const drawWarm174 = (ctx, W, H, frame) => {
  const CYCLE = 580, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "one calculation, three answers offered", W / 2, 30,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "6 \u00d7 3.85", W / 2, 84, { size: 30, col: "#EAF4F2", font: "marker",
    alpha: D.at(f, 40, 160) });
  ["about 24", "about 2.4", "about 240"].forEach((s, k) => {
    const a = D.at(f, 180 + k * 90, 300 + k * 90);
    D.txt(ctx, s, W / 2, 132 + k * 34, { size: 18, col: "#6042A6", font: "marker", alpha: a });
  });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 470, 550) });
};

const drawStory174 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "six bottles of laban at the canteen", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let k = 0; k < 6; k++) {
    const a = D.at(f, 50 + k * 44, 160 + k * 44);
    if (a <= 0) continue;
    const bx = 70 + k * ((W - 140) / 6);
    ctx.save(); ctx.globalAlpha = a;
    D.rr(ctx, bx + 8, 56, (W - 140) / 6 - 20, 66, 8);
    ctx.strokeStyle = "#FA7E19"; ctx.lineWidth = 1.8; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "3.85", bx + (W - 140) / 12, 92,
      { size: 13, col: "#FA7E19", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "roughly how many riyals will six bottles cost?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard174 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Round, multiply, then judge the estimate" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 260, 460), p3 = D.at(f, 500, 700), p4 = D.at(f, 740, 920);

  D.txt(ctx, "6 \u00d7 3.85", W / 2, 108, { size: 26, col: "#EAF4F2", font: "marker", alpha: p1 });
  if (p2 > 0) {
    D.txt(ctx, "3.85 is nearer to 4 than to 3", W / 2, 156,
      { size: 17, col: "#FA7E19", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "6 \u00d7 4 = 24", W / 2, 208, { size: 30, col: "#C9A227", font: "marker", alpha: p3 });
    D.table(ctx, { x: W / 2 - 190, y: 246, w: 380, rh: 26,
      head: ["rounded to", "estimate", "exact"],
      rows: [["4", "24", "23.1"], ["3.9", "23.4", "23.1"]], prog: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "we rounded up six times, so the estimate must be too high",
      W / 2, H - 24, { size: 15, col: "#34D399", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 860, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport174 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "2.9 rounds to 3", W / 2, 30, { size: 19, col: "#2D70B3", font: "marker" });
  D.txt(ctx, "4 \u00d7 3 = 12, and we rounded up", W / 2, 62,
    { size: 16, col: "#34D399", font: "marker" });
  D.txt(ctx, "so the real answer is a little under 12", W / 2, H - 10,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "17-4",
  storageKey: "daf-g4-t17-l4",
  title: "Estimate the Product of a Decimal and a Whole Number",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-4 · 5.NBT.B.7",
  math: M,
  ixl: ["EDG"],

  metas: [
    { phase: "warmup", title: "Which one <em>doesn't belong</em>?",
      lead: "One calculation and three offered answers. Every card has a defensible reason.",
      goal: "Use size sense to eliminate answers before calculating.",
      pull: "Two of these are nowhere near.",
      rail: { launch: "Pick a card and say why. No single intended answer.",
        monitor: ["Reasoning from six lots of four", "Spotting the misplaced point", "Guessing"],
        connect: "Which answer could not possibly be right?",
        misconception: "Believing a decimal product must be small." } },

    { phase: "launch", title: "Six bottles of <em>laban</em>",
      lead: "Each bottle costs 3.85 riyals and Faisal buys six. Estimate the total.",
      goal: "Create the need for a rounding estimate.",
      pull: "Now let us round it properly.",
      rail: { launch: "Commit to a rough total before you calculate.",
        monitor: ["Rounding to 4", "Rounding to 3", "Adding 6 and 3.85"],
        connect: "Which whole number is 3.85 nearest to?",
        misconception: "Answering about 9 by adding instead of multiplying." } },

    { phase: "monitor", title: "Round, then <em>multiply</em>",
      lead: "Put 3.85 on a number line and see which whole number it is nearer to.",
      goal: "Rounding is a decision made on a line, not a rule about digits.",
      pull: "But is the estimate too high or too low?",
      rail: { launch: "Which side of halfway is it on?",
        monitor: ["Locating 3.85", "Comparing to 3.5", "Rounding up"],
        connect: "Why do we round before multiplying, not after?",
        misconception: "Rounding to 3 because the first digit is 3." } },

    { phase: "monitor", title: "Too high, or too <em>low</em>?",
      lead: "Three different roundings, three different estimates, one exact answer.",
      goal: "An estimate is more useful when you know its direction.",
      pull: "Now judge some estimates.",
      rail: { launch: "Predict whether each estimate lands above or below.",
        monitor: ["Reasoning from the rounding direction", "Comparing to the exact answer", "Guessing"],
        connect: "How can you know it is too high before you see the exact answer?",
        misconception: "Believing an estimate is just a wrong answer." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each estimate. No grading until the class commits.",
      goal: "Practise judging reasonableness.",
      pull: "Two students estimated the same product differently.",
      rail: { launch: "For each one, ask what the decimal was rounded to.",
        monitor: ["Checking the rounding", "Checking the direction", "Recomputing"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Accepting an estimate that is ten times out." } },

    { phase: "connect", title: "Two useful <em>estimates</em>",
      lead: "Layla rounded to the nearest whole. Yousef rounded to the nearest tenth.",
      goal: "A closer rounding gives a closer estimate, for more work.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which is closer and which is quicker.",
        monitor: ["Rounding to a whole", "Rounding to a tenth", "Comparing to 23.1"],
        connect: "When is the rough estimate good enough?",
        misconception: "Believing the closer estimate is the only correct one." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Round to four. Six fours are twenty four. We rounded up six times, so it is too high.",
      goal: "The moment estimation with direction is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Round with them, then multiply, then judge.",
        monitor: ["Predicting the rounding", "Multiplying", "Naming the direction"],
        connect: "Who can say why it must be too high?",
        misconception: "Stopping at the estimate without judging it." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Three steps, and every estimate comes with a direction attached.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the three steps aloud, once.",
        monitor: ["Rounding", "Multiplying", "Naming high or low"],
        connect: "What if you round one number up and another down?",
        misconception: "Reporting an estimate as if it were exact." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on estimating with direction.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Round first, then say high or low.",
        monitor: ["Rounding 2.9 to 3", "Multiplying by four", "Naming the direction"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering about 8 by rounding 2.9 down to 2." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: finding a common denominator for two fractions.",
      rail: { launch: "Three students give an estimate and its direction.",
        monitor: ["Rounds and judges", "Only rounds", "Ready for fractions"],
        connect: "Who is estimating a shopping total at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [which, setWhich] = useState("whole");

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Pick a card. Every one of them has a defensible reason."
          cards={[
            { id: "a1", text: "about 24", why: "The only one near six lots of four." },
            { id: "a2", text: "about 2.4", why: "The only one smaller than a single bottle." },
            { id: "a3", text: "about 240", why: "The only one ten times too big." },
            { id: "a4", text: "about 9.85", why: "The only one that came from adding, not multiplying." }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawStory174} height={256} award={award}
          label="Roughly how many riyals for six bottles?" min={5} max={40} start={20} unit="SR"
          after="Locked. Now let us round the price properly."
          note="Each bottle is nearly four riyals, and there are six of them." />;

      case 2:
        return <ExploreChips draw={makeRound174(step)} height={256}
          label="Round it on the line" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "where is 3.85?" }, { v: 1, label: "round it" }]}
          caption={<MathEl omml={M.roundUp} size="lg" display="block" />}
          footnote="Rounding is a decision about which whole number is nearer." />;

      case 3:
        return <ExploreChips draw={makeJudge174(which)} height={256}
          label="High or low?" value={which}
          onPick={(v) => setWhich(v)}
          chips={[{ v: "whole", label: "round to 4" }, { v: "tenth", label: "round to 3.9" },
                  { v: "down", label: "round to 3" }]}
          caption={<MathEl omml={M.high} size="lg" display="block" />}
          footnote="Round up and the estimate is high; round down and it is low." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "6 × 3.85 is about 24", target: "yes" },
                  { id: "b2", text: "6 × 3.85 is about 240", target: "no" },
                  { id: "b3", text: "the estimate 24 is a bit high", target: "yes" },
                  { id: "b4", text: "the estimate 24 is a bit low", target: "no" }]}
          targets={[{ id: "yes", label: "reasonable" },
                    { id: "no", label: "not yet — check the size" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Layla's way — nearest whole", omml: M.roundUp, h: 92,
            quote: "Four riyals each, six bottles, about twenty four." }}
          right={{ name: "Yousef's way — nearest tenth", omml: M.roundDown, h: 92,
            quote: "3.9 each, so about 23.4 — much closer." }}
          same={["Both are estimates", "Both round up", "Both are a little too high"]}
          diff={["Layla's is quicker", "Yousef's is closer", "Both beat guessing"]} />;

      case 6:
        return <BoardScreen draw={drawBoard174} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "round, multiply, then say whether the estimate is high or low" }]}
          hand={"round the decimal · multiply · then say high or low, and why"}
          cards={[{ title: "The estimate we made", omml: M.roundUp, note: "about twenty four" },
                  { title: "Tap for the exact answer", omml: M.high, revealOmml: M.exact, reveal: true,
                    note: "just under our estimate, as predicted" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Estimate 4 × 2.9, and say whether your estimate is high or low." omml={M.swyk}
          options={[{ v: "a", text: "about 8, low" }, { v: "b", text: "about 12, high" },
                    { v: "c", text: "about 12, low" }, { v: "d", text: "about 120, high" }]}
          right="b"
          support={{ yes: "Yes — 2.9 rounds up to 3, so 12 is a little more than the real answer.",
            notYet: "Not yet — 2.9 is nearer to 3 than to 2.",
            draw: drawSupport174, h: 96, hint: "Rounding up four times makes the estimate too high." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Estimate a shopping total at home, then say whether your estimate was high or low." />;

      default: return null;
    }
  }
};
