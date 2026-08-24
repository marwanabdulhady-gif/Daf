/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-2 · Compare Decimals
   Standard 5.NBT.A.3b   I can ... compare decimals to thousandths using place
   value, and pad with zeros so the places line up.
   =========================================================================== */

const M = {
  pair: om(mnor("0.4 and 0.375")),
  pad: om(mnor("0.400 and 0.375 \u2014 now every place has a digit")),
  compare: om(mnor("0.4 > 0.375")),
  fromLeft: om(mnor("compare from the left \u00b7 stop at the first difference")),
  padSafe: om(mnor("adding zeros on the end never changes the value")),
  order: om(mnor("0.375 < 0.4 < 0.42")),
  rule: om(mnor("line up the point \u00b7 pad with zeros \u00b7 compare from the left")),
  swyk: om(mnor("0.6 and 0.582")),
  swykAnswer: om(mnor("0.6 is greater"))
};

/* the padded column comparison */
const makeCols172 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2, cw = 60;
  const heads = ["ones", "tenths", "hundredths", "thousandths"];
  const rows = [["0", "4", step >= 1 ? "0" : "", step >= 1 ? "0" : ""], ["0", "3", "7", "5"]];

  heads.forEach((h, k) => {
    D.txt(ctx, h, cx + (k - 1.5) * cw, 40,
      { size: 11, col: k === 1 && step >= 2 ? "#34D399" : "rgba(234,244,242,.62)", font: "mono", weight: 700 });
  });
  D.marker(ctx, [[cx - 2.2 * cw, 54], [cx + 2.2 * cw, 54]], 1, "rgba(201,162,39,.5)", 1.6);

  rows.forEach((r, ri) => {
    r.forEach((d, k) => {
      if (!d) return;
      const fresh = ri === 0 && k >= 2 && step === 1;
      D.txt(ctx, d, cx + (k - 1.5) * cw, 92 + ri * 50,
        { size: 28, col: fresh ? "#C9A227" : "#EAF4F2", font: "marker",
          alpha: fresh ? 0.6 + Math.sin(frame / 12) * 0.35 : 1 });
    });
    D.txt(ctx, ".", cx - 1.02 * cw, 100 + ri * 50, { size: 28, col: "#C9A227", font: "marker" });
  });

  if (step >= 2) {
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    ctx.save();
    ctx.globalAlpha = pulse + 0.4;
    D.rr(ctx, cx - 0.5 * cw + 4, 70, cw - 8, 98, 8);
    ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "4 tenths beats 3 tenths \u2014 stop right there", W / 2, H - 34,
      { size: 15, col: "#34D399", font: "marker" });
    D.txt(ctx, "0.4 > 0.375", W / 2, H - 12, { size: 14, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, step === 0 ? "line up the decimal points"
         : "pad the short one so every place has a digit",
      W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
  }
};

/* three decimals put in order on a line */
const makeOrder172 = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 74, w = W - 148, y = H / 2 + 24;
  const lo = 0.3, hi = 0.5;
  const px = (v) => x + ((v - lo) / (hi - lo)) * w;

  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.8)", 2.2);
  for (let t = 30; t <= 50; t += 2) {
    const v = t / 100, big = t % 10 === 0;
    ctx.save();
    ctx.strokeStyle = big ? "rgba(234,244,242,.85)" : "rgba(234,244,242,.4)";
    ctx.lineWidth = big ? 2 : 1.2;
    ctx.beginPath();
    ctx.moveTo(px(v), y - (big ? 9 : 5)); ctx.lineTo(px(v), y + (big ? 9 : 5));
    ctx.stroke();
    ctx.restore();
    if (big) D.txt(ctx, v.toFixed(1), px(v), y + 26,
      { size: 12, col: "#EAF4F2", font: "marker" });
  }

  const pts = [{ v: 0.375, l: "0.375", c: "#2D70B3" }, { v: 0.4, l: "0.4", c: "#FA7E19" },
               { v: 0.42, l: "0.42", c: "#388C46" }];
  pts.slice(0, shown).forEach((p, k) => {
    const a = Math.min(1, Math.max(0, (frame / 5 - k * 10) / 12)) * 0.35 + 0.65;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(px(p.v), y, 7, 0, Math.PI * 2);
    ctx.fillStyle = p.c; ctx.fill();
    ctx.restore();
    D.txt(ctx, p.l, px(p.v), y - 24 - (k % 2) * 22,
      { size: 14, col: p.c, font: "marker", alpha: a });
  });

  D.txt(ctx, "the line never lies about which is bigger", W / 2, 28,
    { size: 13, col: "rgba(234,244,242,.68)", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, shown >= 3 ? "0.375 < 0.4 < 0.42" : "add another decimal",
    W / 2, H - 12, { size: shown >= 3 ? 16 : 13,
      col: shown >= 3 ? "#34D399" : "#C9A227", font: "marker", alpha: pulse + 0.4 });
};

const drawWarm172 = (ctx, W, H, frame) => {
  const CYCLE = 580, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two decimals, side by side", W / 2, 30,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "0.4", W / 2 - 110, 116, { size: 44, col: "#6042A6", font: "marker",
    alpha: D.at(f, 60, 220) });
  D.txt(ctx, "0.375", W / 2 + 110, 116, { size: 44, col: "#6042A6", font: "marker",
    alpha: D.at(f, 240, 400) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 440, 530) });
};

const drawStory172 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two long jump results at sports day", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.txt(ctx, "Omar", W / 2 - 110, 84, { size: 15, col: "#EAF4F2", font: "marker", alpha: D.at(f, 50, 180) });
  D.txt(ctx, "2.4 m", W / 2 - 110, 122, { size: 30, col: "#FA7E19", font: "marker", alpha: D.at(f, 80, 220) });
  D.txt(ctx, "Faisal", W / 2 + 110, 84, { size: 15, col: "#EAF4F2", font: "marker", alpha: D.at(f, 180, 310) });
  D.txt(ctx, "2.375 m", W / 2 + 110, 122, { size: 30, col: "#2D70B3", font: "marker", alpha: D.at(f, 210, 340) });
  if (p3 > 0) {
    D.txt(ctx, "who jumped further \u2014 and how do you know?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard172 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Pad the places, then compare from the left" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 260, 460), p3 = D.at(f, 500, 700), p4 = D.at(f, 740, 920);

  D.decChart(ctx, { x: 170, y: 88, w: W - 340, digits: "0.400", prog: p1, highlight: 1 });
  if (p2 > 0) {
    D.decChart(ctx, { x: 170, y: 200, w: W - 340, digits: "0.375", prog: p2, highlight: 1 });
  }
  if (p3 > 0) {
    D.txt(ctx, "4 tenths against 3 tenths", W / 2, 316,
      { size: 18, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "0.4 > 0.375", W / 2, 354,
      { size: 26, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "more digits does not mean more value \u2014 the leftmost place decides",
      W / 2, H - 24, { size: 15, col: "rgba(234,244,242,.78)", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 860, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport172 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "0.600", W / 2 - 80, 34, { size: 24, col: "#34D399", font: "marker" });
  D.txt(ctx, "0.582", W / 2 + 80, 34, { size: 24, col: "#C74440", font: "marker" });
  D.txt(ctx, "6 tenths beats 5 tenths", W / 2, H - 12,
    { size: 12, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "17-2",
  storageKey: "daf-g4-t17-l2",
  title: "Compare Decimals",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-2 · 5.NBT.A.3b",
  math: M,
  ixl: ["K2F"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two decimals appear: one short, one long. No question yet.",
      goal: "Provoke the digit-counting instinct so it can be examined.",
      pull: "One of these has more digits. That is not the same as being bigger.",
      rail: { launch: "Describe the two numbers. Do not decide which is bigger yet.",
        monitor: ["Counting the digits", "Reading the tenths", "Comparing 4 and 375"],
        connect: "Which one do you think is bigger, and why?",
        misconception: "Assuming the longer decimal is larger." } },

    { phase: "launch", title: "Two <em>long jumps</em>",
      lead: "Omar jumped 2.4 m and Faisal jumped 2.375 m. Who went further?",
      goal: "Create the need for a comparison method that survives different lengths.",
      pull: "Now let us line the places up.",
      rail: { launch: "Commit to a name before you calculate.",
        monitor: ["Comparing the tenths", "Comparing 4 with 375", "Using a number line"],
        connect: "Both start with 2 — so where do you look next?",
        misconception: "Choosing Faisal because 375 is bigger than 4." } },

    { phase: "monitor", title: "Pad, then <em>compare</em>",
      lead: "Give every place a digit, then compare from the left.",
      goal: "Padding removes the illusion that longer means bigger.",
      pull: "Now put three of them in order.",
      rail: { launch: "What can you safely add to the end of a decimal?",
        monitor: ["Padding with zeros", "Comparing from the left", "Comparing from the right"],
        connect: "Why does adding zeros not change the value?",
        misconception: "Believing 0.4 and 0.400 are different numbers." } },

    { phase: "monitor", title: "Put them in <em>order</em>",
      lead: "Three decimals on one line. The line never lies.",
      goal: "Ordering, checked against a visual scale.",
      pull: "Now judge some comparisons.",
      rail: { launch: "Predict the order before you tap.",
        monitor: ["Bracketing between tenths", "Placing 0.375 correctly", "Ordering left to right"],
        connect: "Which two were closest together?",
        misconception: "Placing 0.375 above 0.4 on the line." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each comparison. No grading until the class commits.",
      goal: "Hunt the longer-means-bigger error together.",
      pull: "Two students argued the same pair differently.",
      rail: { launch: "For each one, name the place that decides it.",
        monitor: ["Naming the deciding place", "Padding mentally", "Counting digits"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Claiming 0.375 > 0.4 because 375 > 4." } },

    { phase: "connect", title: "Two ways to <em>settle it</em>",
      lead: "Salma padded to three places. Ibrahim used a number line.",
      goal: "Symbolic and visual comparisons must agree.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which is faster for ten numbers.",
        monitor: ["Padding", "Using the line", "Checking they agree"],
        connect: "Which method would you use to sort a whole list?",
        misconception: "Believing the number line is only for beginners." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Pad the places. Compare from the left. Stop at the first difference.",
      goal: "The moment the comparison rule is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Fill both charts with them, then compare.",
        monitor: ["Padding", "Comparing tenths", "Stopping early"],
        connect: "Who can say why we start on the left?",
        misconception: "Comparing the last digits first, like whole numbers." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Three steps, and no decimal comparison can trick you.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the three steps aloud, once.",
        monitor: ["Lining up the point", "Padding", "Comparing from the left"],
        connect: "When do you actually need the thousandths?",
        misconception: "Padding on the wrong end." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on comparing decimals.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Pad the short one first.",
        monitor: ["Padding to 0.600", "Comparing tenths", "Counting digits"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 0.582 because it has more digits." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: adding and subtracting decimals with models.",
      rail: { launch: "Three students compare a pair out loud.",
        monitor: ["Pads then compares", "Still counts digits", "Ready to add"],
        connect: "Who is comparing two prices at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm172} height={256} award={award}
          notices={["One has one digit after the point", "The other has three", "Both start with zero", "375 looks like a big number"]}
          wonders={["Which is bigger?", "Does more digits mean more?", "Can I add zeros to the short one?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory172} height={256} award={award}
          label="How many thousandths apart are they?" min={0} max={100} start={40} unit="/ 1000"
          after="Locked. Now let us line the places up."
          note="Both jumps start with 2, so the tenths place decides it." />;

      case 2:
        return <ExploreChips draw={makeCols172(step)} height={256}
          label="Pad, then compare" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "line up the point" }, { v: 1, label: "pad with zeros" },
                  { v: 2, label: "compare from the left" }]}
          caption={<MathEl omml={M.pad} size="lg" display="block" />}
          footnote="Zeros on the end are free — they never change the value." />;

      case 3:
        return <ExploreChips draw={makeOrder172(shown)} height={256}
          label="Add them to the line" value={shown}
          onPick={(v) => setShown(v)}
          chips={[{ v: 1, label: "0.375" }, { v: 2, label: "and 0.4" }, { v: 3, label: "and 0.42" }]}
          caption={<MathEl omml={M.order} size="lg" display="block" />}
          footnote="The number line is the honest check on any comparison." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "0.4 > 0.375", target: "yes" },
                  { id: "b2", text: "0.375 > 0.4", target: "no" },
                  { id: "b3", text: "0.4 = 0.400", target: "yes" },
                  { id: "b4", text: "0.400 > 0.4", target: "no" }]}
          targets={[{ id: "yes", label: "correct — decided by place" },
                    { id: "no", label: "not yet — digits are not value" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Salma's way — pad the places", omml: M.pad, h: 92,
            quote: "I wrote 0.400 so both had three places, then compared." }}
          right={{ name: "Ibrahim's way — use the line", omml: M.order, h: 92,
            quote: "I marked both on a number line. 0.4 sits further right." }}
          same={["Both give 0.4 > 0.375", "Both use place value", "Both agree with each other"]}
          diff={["Salma pads and compares", "Ibrahim locates them", "Salma's is faster for a long list"]} />;

      case 6:
        return <BoardScreen draw={drawBoard172} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "line up the point, pad with zeros, compare from the left" }]}
          hand={"same whole? · pad to the same length · compare from the left · stop at the first difference"}
          cards={[{ title: "The pair we compared", omml: M.compare, note: "the tenths settled it" },
                  { title: "Tap for why padding is safe", omml: M.fromLeft, revealOmml: M.padSafe, reveal: true,
                    note: "zeros on the end add nothing" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Which is greater, 0.6 or 0.582?" omml={M.swyk}
          options={[{ v: "a", text: "0.582" }, { v: "b", text: "0.6" }, { v: "c", text: "they are equal" }, { v: "d", text: "cannot tell" }]}
          right="b"
          support={{ yes: "Yes — 0.600 against 0.582, and 6 tenths beats 5 tenths.",
            notYet: "Not yet — pad 0.6 to 0.600 and compare the tenths.",
            draw: drawSupport172, h: 96, hint: "The leftmost place where they differ decides it." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find two decimals of different lengths at home and put them in order." />;

      default: return null;
    }
  }
};
