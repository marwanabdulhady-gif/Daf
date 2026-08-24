/* ===========================================================================
   SAVVAS enVision Mathematics · Grade 4 · Topic 1
   LESSON 1-3 · Compare Whole Numbers                    Standard: 4.NBT.A.2
   I can ... compare two multi-digit numbers using place value, and record the
            comparison with the symbols for greater than, less than or equal.
   =========================================================================== */

const M = {
  pair: om(mt("394,284>328,234")),
  pairLess: om(mt("328,234<394,284")),
  sameStart: om(mt("6,716>6,714")),
  equalPair: om(mt("12,050=12,050")),
  greaterSym: om(mt(">")),
  lessSym: om(mt("<")),
  equalSym: om(mt("=")),
  firstDiff: om(mnor("compare the first place that is "), mt("different")),
  swykPair: om(mt("47,891"), mnor(" and "), mt("47,918")),
  swykAnswer: om(mt("47,891<47,918"))
};

/* ---- drawings ------------------------------------------------------------ */

/* two numbers aligned in a chart, scanning left to right */
const makeScanner = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = "394284", b = "328234";
  const cw = Math.min(52, (W - 90) / 6), x0 = W / 2 - (6 * cw) / 2;
  const yA = 74, yB = 132;
  const places = ["hundred\nthousands", "ten\nthousands", "thousands", "hundreds", "tens", "ones"];

  for (let i = 0; i < 6; i++) {
    const cx = x0 + i * cw + cw / 2;
    const scanned = i < step;
    const active = i === step;
    const dim = i > step;
    const col = dim ? "rgba(234,244,242,.28)" : scanned ? "rgba(234,244,242,.62)" : "#EAF4F2";
    if (active) {
      ctx.save();
      ctx.globalAlpha = 0.55 + Math.sin(frame / 12) * 0.3;
      D.rr(ctx, cx - cw / 2 + 2, yA - 26, cw - 4, 84, 8);
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
    }
    D.txt(ctx, a[i], cx, yA, { size: 30, col: active ? "#C9A227" : col, font: "marker" });
    D.txt(ctx, b[i], cx, yB, { size: 30, col: active ? "#C9A227" : col, font: "marker" });
    if (scanned) D.txt(ctx, "same", cx, yB + 34, { size: 9.5, col: "rgba(52,211,153,.75)", font: "mono", weight: 700 });
  }

  if (step === 1) {
    D.txt(ctx, "9 is greater than 2 — stop here", W / 2, yB + 72, { size: 16, col: "#C9A227", font: "marker" });
    D.txt(ctx, "394,284 is the greater number", W / 2, H - 22, { size: 15, col: "#34D399", font: "marker" });
  } else if (step === 0) {
    D.txt(ctx, "start at the greatest place", W / 2, yB + 72, { size: 15, col: "#EAF4F2", font: "marker" });
  } else {
    D.txt(ctx, "we already knew at the ten thousands place", W / 2, yB + 72,
      { size: 13, col: "rgba(234,244,242,.55)", font: "marker" });
  }
};

/* number line placement */
const drawLinePlace = (ctx, W, H, frame) => {
  const CYCLE = 520, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 100, 240), p3 = D.at(f, 240, 360);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 56, w = W - 112, y = H / 2 + 10;
  const lo = 300000, hi = 400000;
  const px = (n) => x + ((n - lo) / (hi - lo)) * w;
  D.marker(ctx, [[x, y], [x + w, y]], p1, "rgba(234,244,242,.75)", 2.4);
  if (p1 > 0.6) {
    [[lo, "300,000"], [hi, "400,000"]].forEach((t) => {
      ctx.save(); ctx.strokeStyle = "#EAF4F2"; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(px(t[0]), y - 12); ctx.lineTo(px(t[0]), y + 12); ctx.stroke(); ctx.restore();
      D.txt(ctx, t[1], px(t[0]), y + 32, { size: 12, col: "#EAF4F2", font: "marker" });
    });
  }
  [[328234, "328,234", "#2D70B3", p2], [394284, "394,284", "#388C46", p3]].forEach((pt) => {
    if (pt[3] <= 0) return;
    ctx.save();
    ctx.globalAlpha = pt[3];
    ctx.beginPath(); ctx.arc(px(pt[0]), y, 7, 0, Math.PI * 2);
    ctx.fillStyle = pt[2]; ctx.fill();
    ctx.restore();
    D.txt(ctx, pt[1], px(pt[0]), y - 26, { size: 14, col: pt[2], font: "marker", alpha: pt[3] });
  });
  if (p3 > 0.8) D.txt(ctx, "further right means greater", W / 2, H - 18,
    { size: 13, col: "#C9A227", font: "marker" });
};

/* Launch: two Red Sea dive depths */
const drawDepths = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  const p1 = D.at(f, 0, 100), p2 = D.at(f, 90, 240), p3 = D.at(f, 240, 350);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  /* water */
  ctx.save();
  ctx.globalAlpha = 0.16 * p1;
  D.rr(ctx, 10, 40, W - 20, H - 56, 10);
  ctx.fillStyle = "#2D70B3"; ctx.fill();
  ctx.restore();
  D.marker(ctx, [[14, 42], [W - 14, 42]], p1, "rgba(103,232,249,.7)", 2.4);
  D.txt(ctx, "Red Sea", W / 2, 24, { size: 12.5, col: "#67E8F9", font: "marker", alpha: p1 });

  const sites = [
    { name: "Abu Tair", v: 1834, x: W * 0.3, col: "#FA7E19" },
    { name: "Shaab Nazar", v: 1843, x: W * 0.7, col: "#C9A227" }
  ];
  sites.forEach((s, n) => {
    const a = D.at(p2, n * 0.3, n * 0.3 + 0.6);
    if (a <= 0) return;
    const depth = 60 + (s.v - 1800) * 3.4;
    D.marker(ctx, [[s.x, 44], [s.x, 44 + depth * a]], 1, s.col, 2);
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(s.x, 44 + depth, 6, 0, Math.PI * 2);
    ctx.fillStyle = s.col; ctx.fill();
    ctx.restore();
    D.txt(ctx, s.name, s.x, 44 + depth + 24, { size: 12, col: s.col, font: "marker", alpha: a });
    if (p3 > 0) D.txt(ctx, s.v.toLocaleString("en-US") + " m", s.x, 44 + depth + 46,
      { size: 16, col: "#EAF4F2", font: "marker", alpha: p3 });
  });
  if (p3 > 0.7) D.txt(ctx, "which site is deeper?", W / 2, H - 16,
    { size: 13, col: "#C9A227", font: "marker" });
};

/* Board: the comparison algorithm */
const drawBoard13 = (ctx, W, H, frame) => {
  const CYCLE = 760, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Which number is greater?" });
  const p1 = D.at(f, 20, 130), p2 = D.at(f, 130, 270), p3 = D.at(f, 270, 430), p4 = D.at(f, 430, 600);

  const a = "394284", b = "328234";
  const cw = 46, x0 = W / 2 - (6 * cw) / 2, yA = 106, yB = 164;
  for (let i = 0; i < 6; i++) {
    const av = D.at(p1, i / 6, i / 6 + 0.35);
    if (av <= 0) continue;
    const cx = x0 + i * cw + cw / 2;
    D.txt(ctx, a[i], cx, yA, { size: 30, col: "#EAF4F2", font: "marker", alpha: av });
    D.txt(ctx, b[i], cx, yB, { size: 30, col: "#EAF4F2", font: "marker", alpha: av });
  }

  /* scan left to right */
  if (p2 > 0) {
    const cx0 = x0 + cw / 2;
    D.marker(ctx, [[cx0 - 18, yB + 34], [cx0 + cw + 18, yB + 34]], p2, "rgba(201,162,39,.6)", 2);
    D.txt(ctx, "same", cx0, yB + 54, { size: 11, col: "#34D399", font: "marker", alpha: p2 });
  }

  if (p3 > 0) {
    const cx1 = x0 + cw * 1.5;
    ctx.save();
    ctx.globalAlpha = p3;
    D.rr(ctx, cx1 - cw / 2 + 2, yA - 26, cw - 4, 84, 8);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "9 is greater than 2", cx1 + 118, yA + 26,
      { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 320, 400) });
    D.txt(ctx, "the first place that differs decides it", W / 2, yB + 88,
      { size: 14, col: "#EAF4F2", font: "marker", alpha: D.at(f, 350, 430) });
  }

  if (p4 > 0) {
    const yb = H - 44;
    D.marker(ctx, [[60, yb - 30], [W - 60, yb - 30]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "394,284  is greater than  328,234", W / 2, yb - 2,
      { size: 18, col: "#C9A227", font: "marker", alpha: D.at(f, 470, 550) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 520, 620), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport13 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = "47891", b = "47918";
  const cw = Math.min(40, (W - 40) / 5), x0 = W / 2 - (5 * cw) / 2;
  for (let i = 0; i < 5; i++) {
    const cx = x0 + i * cw + cw / 2;
    const same = a[i] === b[i];
    D.txt(ctx, a[i], cx, 26, { size: 21, col: same ? "rgba(234,244,242,.5)" : "#C9A227", font: "marker" });
    D.txt(ctx, b[i], cx, 58, { size: 21, col: same ? "rgba(234,244,242,.5)" : "#C9A227", font: "marker" });
  }
};

/* ---- the lesson ---------------------------------------------------------- */
const LESSON = {
  code: "1-3",
  storageKey: "daf-g4-t1-l3",
  title: "Compare Whole Numbers",
  unit: "GRADE 4 · TOPIC 1 · LESSON 1-3 · 4.NBT.A.2",
  math: M,
  ixl: ["6Y2", "USN", "94E"],

  metas: [
    { phase: "warmup",
      title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two numbers, lined up. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Lining them up was not an accident.",
      rail: { launch: "I am not asking which is bigger yet. Just look.",
        monitor: ["Noticing the same number of digits", "Noticing a place where they match", "Noticing where they split"],
        connect: "Who noticed something nobody else did?",
        misconception: "Comparing the last digit first." } },

    { phase: "launch",
      title: "Which dive site is <em>deeper</em>?",
      lead: "Abu Tair reaches 1,834 m. Shaab Nazar reaches 1,843 m. They look almost the same.",
      goal: "Create the need — a careful method beats a glance.",
      pull: "Estimate first, then we will check place by place.",
      rail: { launch: "Read both numbers out loud. Do they sound different?",
        monitor: ["Guessing from the last digit", "Comparing the tens", "Lining the numbers up"],
        connect: "Which place actually decided it?",
        misconception: "Longer-looking means greater. Do not correct it — ask them to line the numbers up." } },

    { phase: "monitor",
      title: "Scan from the <em>greatest place</em>",
      lead: "Step one place at a time. Stop the moment the digits differ.",
      goal: "Build the compare algorithm as a habit, not a rule to recite.",
      pull: "Same answer, different picture. Let us see it on a line.",
      rail: { launch: "Predict where the numbers will split before you step.",
        monitor: ["Stepping one place at a time", "Jumping straight to the difference", "Checking every place anyway"],
        connect: "Why can you stop as soon as the digits differ?",
        misconception: "Continuing past the deciding place and changing the answer." } },

    { phase: "monitor",
      title: "Put them on a <em>number line</em>",
      lead: "The greater number sits further to the right.",
      goal: "A second representation for the same comparison.",
      pull: "Now record it with a symbol.",
      rail: { launch: "Where would you place each number between 300,000 and 400,000?",
        monitor: ["Estimating position", "Using the hundred thousands", "Checking against the midpoint"],
        connect: "How does the line agree with the chart?",
        misconception: "Placing numbers by their last digits." } },

    { phase: "monitor",
      title: "Choose the <em>symbol</em>",
      lead: "Drag each pair to the symbol that makes it true.",
      goal: "Record a comparison correctly.",
      pull: "Two students explained the same comparison differently.",
      rail: { launch: "Read each pair out loud before you place it.",
        monitor: ["Reading left to right", "Reversing the pair", "Checking with the chart"],
        connect: "How do you read that statement out loud?",
        misconception: "Pointing the symbol the wrong way." } },

    { phase: "connect",
      title: "Two ways to <em>say it</em>",
      lead: "Maryam wrote it one way. Ziad wrote it the other. Both are true.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Seeing both statements as the same fact", "Preferring greater than", "Flipping the order carefully"],
        connect: "What has to change when you swap the numbers around?",
        misconception: "Thinking one order is correct and the other is wrong." } },

    { phase: "synth",
      title: "On the <em>board</em>",
      lead: "Line them up. Start at the greatest place. The first place that differs decides it.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Lining digits up carefully", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Comparing digit counts instead of place values." } },

    { phase: "synth",
      title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Linking to place value", "Testing on a fresh pair", "Asking about numbers of different lengths"],
        connect: "What if one number has more digits than the other?",
        misconception: "Assuming equal length is required." } },

    { phase: "swyk",
      title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write your thinking, not just your answer.",
        monitor: ["Lining the numbers up", "Scanning from the left", "Stopping at the deciding place"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Comparing the ones place because the digits look bigger there." } },

    { phase: "connect",
      title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: how do we round a number to a friendly one?",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the chart", "Ready to round"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <NoticeWonder draw={makeScanner(0)} height={258} award={award}
            notices={["They both have six digits", "The first digits match", "The second digits are different", "They are lined up"]}
            wonders={["Which is bigger?", "Does the first digit decide?", "What if they matched all the way?"]} />
        );

      case 1:
        return (
          <LaunchEstimate draw={drawDepths} height={264} award={award}
            label="How many metres deeper is the deeper site?"
            min={1} max={40} start={12} unit="m"
            after="Locked. Now let us compare them place by place."
            note="They look almost identical. A glance is not enough." />
        );

      case 2:
        return (
          <ExploreChips draw={makeScanner(step)} height={258}
            label="Step through the places, left to right"
            value={step}
            onPick={(v) => setStep(v)}
            chips={[
              { v: 0, label: "hundred thousands" }, { v: 1, label: "ten thousands" },
              { v: 2, label: "thousands" }, { v: 3, label: "hundreds" }
            ]}
            caption={<MathEl omml={M.pair} size="xl" display="block" />}
            footnote="Once the digits differ, you can stop — nothing to the right can change it." />
        );

      case 3:
        return (
          <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
            <Sketch draw={drawLinePlace} height={256} />
            <div className="glass-card" style={{ cursor: "default", textAlign: "center", background: "var(--daf-mint)" }}>
              <MathEl omml={M.pairLess} size="xl" display="block" />
              <div style={{ fontSize: "11px", color: "var(--daf-ink-2)", marginTop: "6px" }}>
                The same comparison, written the other way round.
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <CardSort award={award} columns={3} commitLabel="The class is ready — check the symbols"
            items={[
              { id: "p1", text: "6,716 ? 6,714", target: "gt" },
              { id: "p2", text: "12,217 ? 21,127", target: "lt" },
              { id: "p3", text: "12,050 ? 12,050", target: "eq" }
            ]}
            targets={[
              { id: "gt", omml: M.greaterSym, label: "is greater than" },
              { id: "lt", omml: M.lessSym, label: "is less than" },
              { id: "eq", omml: M.equalSym, label: "is equal to" }
            ]} />
        );

      case 5:
        return (
          <CompareConnect award={award}
            left={{ name: "Maryam's way — greater than", omml: M.pair, h: 92,
                    quote: "I put the bigger number first and used greater than." }}
            right={{ name: "Ziad's way — less than", omml: M.pairLess, h: 92,
                     quote: "I put the smaller number first and used less than." }}
            same={["Both are true statements", "Both compare the same two numbers",
                   "Both were decided at the ten thousands place"]}
            diff={["The order of the numbers is swapped", "The symbol points the other way",
                   "They are read out loud differently"]} />
        );

      case 6:
        return <BoardScreen draw={drawBoard13} height={430} />;

      case 7:
        return (
          <RuleScreen award={award}
            ommls={[{ omml: M.firstDiff, alt: "compare the first place that is different" }]}
            hand={"line the numbers up · start at the greatest place · the first place that differs decides it"}
            cards={[
              { title: "The pair we compared", omml: M.pair, note: "decided at the ten thousands place" },
              { title: "Tap to test it on a close pair", omml: M.sameStart, revealOmml: M.equalPair, reveal: true,
                note: "when every place matches, the numbers are equal" }
            ]} />
        );

      case 8:
        return (
          <ShowWhatYouKnow award={award}
            prompt="Which statement is true?"
            omml={M.swykPair}
            options={[
              { v: "a", text: "47,891 is greater" }, { v: "b", text: "47,918 is greater" },
              { v: "c", text: "they are equal" }, { v: "d", text: "you cannot tell" }
            ]}
            right="b"
            support={{
              yes: "Yes — they match until the hundreds place, where 9 beats 8.",
              notYet: "Not yet — line them up and scan from the left.",
              draw: drawSupport13, h: 84,
              hint: "The gold digits are the first ones that differ. Which is greater there?"
            }} />
        );

      case 9:
        return (
          <Closing game={game} omml={M.pair}
            action="Find two prices at home and write a true comparison using a symbol." />
        );

      default:
        return null;
    }
  }
};
