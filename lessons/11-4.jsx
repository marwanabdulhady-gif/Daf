/* ===========================================================================
   Grade 4 · Topic 11 · LESSON 11-4 · Problem Solving: Critique Reasoning
   Standard MP.3 · 4.MD.B.4   I can ... decide whether somebody else's
   conclusion about a line plot is justified, and say exactly where it fails.
   =========================================================================== */

const M = {
  claim: om(mnor("\u201cmost of the jumps were over half a metre\u201d")),
  counts: om(mt("1+3+2+5+3+2=16"), mnor(" jumps")),
  over: om(mt("5+3+2=10"), mnor(" jumps over "), mfrac(4, 8)),
  under: om(mt("1+3+2=6"), mnor(" jumps at or under "), mfrac(4, 8)),
  verdict: om(mnor("10 out of 16 is more than half \u2014 the claim holds")),
  badClaim: om(mnor("\u201cthe tallest stack means the longest jump\u201d")),
  rule: om(mnor("check the claim against the marks \u00b7 say which marks decide it")),
  swyk: om(mnor("\u201chalf the class jumped exactly "), mfrac(5, 8), mnor(" m\u201d")),
  swykAnswer: om(mt("5"), mnor(" of 16 is not half"))
};

/* the long-jump data, in eighths of a metre */
const JUMP14 = { 2: 1, 3: 3, 4: 2, 5: 5, 6: 3, 7: 2 };

/* the plot with the marks that decide the claim called out */
const makeCheck114 = (side) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 92, w = W - 184, y = H - 96;
  const px = D.linePlot(ctx, { x: x, y: y, w: w, den: 8, max: 8, counts: JUMP14,
    prog: 1, col: "rgba(120,150,160,.55)", axisLabel: "distance in metres",
    title: "Standing long jump, Grade 4 sports day" });

  /* re-draw the relevant half in a strong colour */
  const keys = Object.keys(JUMP14).map(Number);
  const chosen = side === "over" ? keys.filter((n) => n > 4)
    : side === "under" ? keys.filter((n) => n <= 4) : [];
  chosen.forEach((n) => {
    const cx = px(n);
    for (let m = 0; m < JUMP14[n]; m++) {
      const cy = y - 16 - m * 17;
      const col = side === "over" ? "#388C46" : "#FA7E19";
      D.marker(ctx, [[cx - 5.4, cy - 5.4], [cx + 5.4, cy + 5.4]], 1, col, 2.4);
      D.marker(ctx, [[cx + 5.4, cy - 5.4], [cx - 5.4, cy + 5.4]], 1, col, 2.4);
    }
  });

  /* the half-metre line */
  const hx = px(4);
  const pulse = 0.4 + Math.sin(frame / 15) * 0.25;
  ctx.save();
  ctx.globalAlpha = pulse + 0.35;
  ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.8; ctx.setLineDash([5, 4]);
  ctx.beginPath(); ctx.moveTo(hx, 44); ctx.lineTo(hx, y - 4); ctx.stroke();
  ctx.restore();
  D.txt(ctx, "half a metre", hx, 36, { size: 11, col: "#C9A227", font: "mono", weight: 700 });

  const msg = side === "over" ? "10 jumps landed beyond half a metre"
    : side === "under" ? "6 jumps landed at half a metre or shorter"
    : "which marks decide whether the claim is true?";
  D.txt(ctx, msg, W / 2, H - 12,
    { size: 13.5, col: side === "over" ? "#34D399" : side === "under" ? "#FA7E19" : "rgba(234,244,242,.6)",
      font: "marker" });
};

/* two students' reasoning, side by side, with the flaw exposed */
const makeReason114 = (who) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const half = W / 2;
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;

  D.txt(ctx, "Omar", half / 2, 26, { size: 13, col: who === "omar" ? "#34D399" : "rgba(234,244,242,.4)", font: "marker" });
  D.txt(ctx, "Sana", half + half / 2, 26, { size: 13, col: who === "sana" ? "#E0665F" : "rgba(234,244,242,.4)", font: "marker" });

  const lines = {
    omar: ["I counted the crosses to the right", "of half a metre: 5 + 3 + 2 = 10.", "Ten out of sixteen is more than half,", "so the claim is justified."],
    sana: ["The tallest stack is at 5/8,", "so most people jumped 5/8.", "5/8 is more than half a metre,", "so the claim is justified."]
  };
  const cols = { omar: "#34D399", sana: "#E0665F" };
  ["omar", "sana"].forEach((k, idx) => {
    const cx = idx === 0 ? half / 2 : half + half / 2;
    lines[k].forEach((s, r) => {
      D.txt(ctx, s, cx, 58 + r * 22,
        { size: 12.5, col: who === k ? cols[k] : "rgba(234,244,242,.32)", font: "marker" });
    });
  });

  D.marker(ctx, [[half, 18], [half, H - 68]], 1, "rgba(234,244,242,.18)", 1.4);

  if (who === "omar") {
    D.txt(ctx, "the reasoning names the marks that decide it", W / 2, H - 44,
      { size: 14, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
    D.txt(ctx, "right answer, and the argument holds", W / 2, H - 20,
      { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
  } else if (who === "sana") {
    D.txt(ctx, "right answer \u2014 but only 5 of 16 jumped 5/8", W / 2, H - 44,
      { size: 14, col: "#E0665F", font: "marker", alpha: pulse + 0.4 });
    D.txt(ctx, "the tallest stack is not the majority", W / 2, H - 20,
      { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
  } else {
    D.txt(ctx, "both conclude the claim is true \u2014 is both reasoning sound?",
      W / 2, H - 30, { size: 13.5, col: "#C9A227", font: "marker" });
  }
};

const drawWarm114 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.linePlot(ctx, { x: 92, y: H - 88, w: W - 184, den: 8, max: 8, counts: JUMP14,
    prog: D.at(f, 20, 400), col: "#6042A6",
    title: "Standing long jump, Grade 4 sports day",
    axisLabel: "distance in metres" });
  D.txt(ctx, "\u201cmost of the jumps were over half a metre\u201d \u2014 is that true?",
    W / 2, H - 12, { size: 13, col: "#C9A227", font: "marker", alpha: D.at(f, 380, 500) });
};

const drawStory114 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 380, 520);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "sports day, sixteen jumps recorded", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.linePlot(ctx, { x: 92, y: H - 94, w: W - 184, den: 8, max: 8, counts: JUMP14,
    prog: D.at(f, 70, 360), col: "#FA7E19", axisLabel: "distance in metres" });
  if (p3 > 0) {
    D.txt(ctx, "how many jumps went further than half a metre?", W / 2, H - 14,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard114 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Critiquing a claim about data" });
  const p2 = D.at(f, 340, 520), p3 = D.at(f, 540, 720), p4 = D.at(f, 760, 940);

  const px = D.linePlot(ctx, { x: 150, y: 228, w: W - 300, den: 8, max: 8, counts: JUMP14,
    prog: D.at(f, 20, 320), col: "#2D70B3", axisLabel: "distance in metres" });

  if (p2 > 0) {
    const hx = px(4);
    ctx.save();
    ctx.globalAlpha = p2;
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(hx, 118); ctx.lineTo(hx, 232); ctx.stroke();
    ctx.restore();
    D.txt(ctx, "the claim is about half a metre \u2014 so draw that line first",
      W / 2, 300, { size: 14.5, col: "#C9A227", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "beyond it: 5 + 3 + 2 = 10        at or under it: 1 + 3 + 2 = 6",
      W / 2, 334, { size: 15, col: "#388C46", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "10 of 16 is more than half \u2014 the claim is justified",
      W / 2, 372, { size: 17, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "a right answer can still have wrong reasoning behind it",
      W / 2, H - 24, { size: 13.5, col: "rgba(234,244,242,.7)", font: "marker", alpha: D.at(f, 840, 940) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport114 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.linePlot(ctx, { x: 50, y: H - 26, w: W - 100, den: 8, max: 8, counts: JUMP14,
    prog: 1, col: "#2D70B3", highlight: 5, r: 3.8, gapY: 10, labelAll: false });
};

const LESSON = {
  code: "11-4",
  storageKey: "daf-g4-t11-l4",
  title: "Problem Solving: Critique Reasoning",
  unit: "GRADE 4 · TOPIC 11 · LESSON 11-4 · MP.3 · 4.MD.B.4",
  math: M,
  ixl: ["4D9", "JVG"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Sixteen long jumps and one claim printed underneath. No verdict yet.",
      goal: "Get the claim into the room before anyone is asked to judge it.",
      pull: "Deciding this needs more than a glance.",
      rail: { launch: "Read the claim. Do not vote yet.",
        monitor: ["Finding half a metre on the scale", "Counting one side", "Noticing the tallest stack"],
        connect: "What would you need to count to settle this?",
        misconception: "Judging the claim from the tallest stack alone." } },

    { phase: "launch", title: "Is the claim <em>justified</em>?",
      lead: "Somebody claims most of the jumps went further than half a metre. Estimate how many actually did.",
      goal: "Create the need to count deliberately rather than eyeball.",
      pull: "Now count the marks that decide it.",
      rail: { launch: "Give me a number for how many cleared half a metre.",
        monitor: ["Estimating from the right-hand side", "Counting exactly", "Forgetting where half a metre is"],
        connect: "How many would you need for 'most' to be true?",
        misconception: "Assuming 'most' means 'the biggest single group'." } },

    { phase: "monitor", title: "Count the marks that <em>decide it</em>",
      lead: "Draw the half-metre line, then count each side.",
      goal: "A claim is tested against specific marks, not an impression.",
      pull: "Now look at two students' reasoning.",
      rail: { launch: "Where exactly is half a metre on this scale?",
        monitor: ["Locating 4/8 as a half", "Counting each side", "Including 4/8 on the wrong side"],
        connect: "Does 'over half a metre' include the jumps at exactly 4/8?",
        misconception: "Counting the 4/8 jumps as 'over' half a metre." } },

    { phase: "monitor", title: "Same answer, <em>different reasoning</em>",
      lead: "Omar and Sana both say the claim is true. Only one of them has justified it.",
      goal: "Separate a correct conclusion from a sound argument.",
      pull: "Now sort some reasoning of your own.",
      rail: { launch: "Both got the right verdict. Read the reasons carefully.",
        monitor: ["Checking Sana's count", "Spotting the majority error", "Accepting both"],
        connect: "How many people actually jumped 5/8?",
        misconception: "Accepting an argument because the conclusion happens to be right." } },

    { phase: "monitor", title: "Sound or <em>not yet</em>?",
      lead: "Sort each piece of reasoning. Nothing is graded until the class commits.",
      goal: "Practise critiquing the argument, not the answer.",
      pull: "Two students disagreed about a second claim.",
      rail: { launch: "Ask of each one: which marks does this argument use?",
        monitor: ["Checking the counts named", "Checking the boundary", "Confusing tallest with most"],
        connect: "Which one was the most convincing wrong argument?",
        misconception: "Grading the conclusion rather than the reasoning." } },

    { phase: "connect", title: "How to <em>disagree well</em>",
      lead: "Layla says the claim fails. Yousef says it holds. Both point at the plot.",
      goal: "Model the language of a mathematical disagreement.",
      pull: "On the board.",
      rail: { launch: "Notice that both name the marks they are using.",
        monitor: ["Naming specific counts", "Naming the boundary", "Arguing from impression"],
        connect: "What one sentence settles this disagreement?",
        misconception: "Disagreeing without naming any evidence." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Draw the boundary. Count both sides. Then judge the claim.",
      goal: "The moment the critique routine is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw the half-metre line with them before counting.",
        monitor: ["Predicting the two counts", "Judging the claim", "Naming the flaw in the other argument"],
        connect: "Who can state the routine in order?",
        misconception: "Judging before drawing the boundary." } },

    { phase: "synth", title: "The routine \u2014 <em>and why it works</em>",
      lead: "Two steps that turn an opinion into an argument.",
      goal: "Generalise the critique habit, not just this verdict.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Naming the deciding marks", "Checking the boundary", "Stating a verdict"],
        connect: "What makes a reason count as evidence?",
        misconception: "Believing a right answer proves the reasoning." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on critiquing a claim.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Count the crosses at 5/8, then count them all.",
        monitor: ["Counting the 5/8 stack", "Counting the total", "Comparing 5 with half of 16"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Calling the tallest stack 'half the class'." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close the topic on a habit, not a fact.",
      pull: "Tomorrow: Topic 12 — understanding and comparing decimals.",
      rail: { launch: "Three students name the deciding marks for a claim.",
        monitor: ["Critiques the reasoning", "Only checks the answer", "Ready for decimals"],
        connect: "Who is testing a claim at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [side, setSide] = useState(null);
    const [who, setWho] = useState(null);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm114} height={256} award={award}
          notices={["Sixteen crosses altogether", "The tallest stack is at 5/8", "Half a metre is 4/8", "Some jumps were under a half"]}
          wonders={["Does 'most' mean more than eight?", "Do the 4/8 jumps count?", "How would I prove it?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory114} height={256} award={award}
          label="How many jumps went further than half a metre?" min={0} max={16} start={8} unit="jumps"
          after="Locked. Now count the marks that actually decide it."
          note="Half a metre is 4/8 — find it on the scale before you count." />;

      case 2:
        return <ExploreChips draw={makeCheck114(side)} height={256}
          label="Count each side of the half-metre line" value={side}
          onPick={(v) => setSide(v)}
          chips={[{ v: "over", label: "beyond half a metre" }, { v: "under", label: "at or under half a metre" }]}
          caption={<MathEl omml={M.over} size="lg" display="block" />}
          footnote="A jump of exactly 4/8 is not further than half a metre." />;

      case 3:
        return <ExploreChips draw={makeReason114(who)} height={256}
          label="Whose reasoning holds up?" value={who}
          onPick={(v) => setWho(v)}
          chips={[{ v: "omar", label: "Omar's reason" }, { v: "sana", label: "Sana's reason" }]}
          caption={<MathEl omml={M.verdict} size="lg" display="block" />}
          footnote="Both reached the right verdict. Only one of them proved it." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "e1", text: "10 of 16 cleared it, so 'most' holds", target: "yes" },
                  { id: "e2", text: "the tallest stack is 5/8, so 'most' holds", target: "no" },
                  { id: "e3", text: "6 of 16 did not clear it", target: "yes" },
                  { id: "e4", text: "everyone at 4/8 cleared half a metre", target: "no" }]}
          targets={[{ id: "yes", label: "sound — names the deciding marks" },
                    { id: "no", label: "not yet — the evidence does not fit" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Layla — the claim fails", omml: M.under, h: 92,
            quote: "Six jumps did not clear it. That is a lot of people." }}
          right={{ name: "Yousef — the claim holds", omml: M.over, h: 92,
            quote: "Ten of sixteen cleared it, and ten is more than half of sixteen." }}
          same={["Both count real marks", "Both use the same boundary", "Both totals add to 16"]}
          diff={["Layla counts the ones that failed", "Yousef compares 10 with half of 16", "Only Yousef answers the actual claim"]} />;

      case 6:
        return <BoardScreen draw={drawBoard114} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "check the claim against the marks and say which marks decide it" }]}
          hand={"draw the boundary · count both sides · judge the claim · name your evidence"}
          cards={[{ title: "The reasoning that holds", omml: M.over, note: "it names the marks it uses" },
                  { title: "Tap for the one that does not", omml: M.claim, revealOmml: M.badClaim, reveal: true,
                    note: "the tallest stack was only 5 of 16" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Someone claims half the class jumped exactly 5/8 of a metre. Is that justified?"
          omml={M.swyk}
          options={[{ v: "a", text: "yes — 5/8 is the tallest" }, { v: "b", text: "no — only 5 of 16" },
                    { v: "c", text: "yes — 5 is half of 10" }, { v: "d", text: "no — nobody jumped 5/8" }]}
          right="b"
          support={{ yes: "Yes — the tallest stack is 5 crosses, and half of 16 is 8.",
            notYet: "Not yet — count the crosses at 5/8 and compare with half of 16.",
            draw: drawSupport114, h: 96, hint: "Tallest is not the same as most, and 5 is not 8." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a claim about numbers at home — on a packet or a screen — and say which figures decide it." />;

      default: return null;
    }
  }
};
