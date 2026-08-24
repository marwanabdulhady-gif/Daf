/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-3 · Mental Math: Estimate Quotients for Greater Dividends
   Standard 4.NBT.B.6   I can ... estimate a quotient when the dividend runs into
   the thousands.
   =========================================================================== */

const M = {
  problem: om(mt("3170\u00f78")),
  compatible: om(mt("3200\u00f78=400")),
  exact: om(mt("3170\u00f78=about 396")),
  why: om(mnor("3200 is close to 3170, and 8 divides it exactly")),
  other: om(mt("2400\u00f78=300")),
  rule: om(mnor("use the nearest number the divisor goes into exactly")),
  swyk: om(mt("5600\u00f79")),
  swykAnswer: om(mt("5400\u00f79=600"))
};

/* the number line of nearby multiples of the divisor */
const makeCompat = (pick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const lo = 2400, hi = 4000;
  const x = 62, w = W - 124, y = H / 2 + 4;
  const px = function (n) { return x + ((n - lo) / (hi - lo)) * w; };
  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.7)", 2.2);

  const marks = [{ v: 2400 }, { v: 3200 }, { v: 4000 }];
  marks.forEach(function (m) {
    const on = m.v === pick;
    ctx.save();
    ctx.strokeStyle = on ? "#C9A227" : "rgba(234,244,242,.4)";
    ctx.lineWidth = on ? 2.4 : 1.4;
    ctx.beginPath(); ctx.moveTo(px(m.v), y - (on ? 13 : 8)); ctx.lineTo(px(m.v), y + (on ? 13 : 8)); ctx.stroke();
    ctx.restore();
    D.txt(ctx, m.v.toLocaleString("en-US"), px(m.v), y + 30,
      { size: 11.5, col: on ? "#C9A227" : "rgba(234,244,242,.5)", font: "marker" });
    D.txt(ctx, "\u00f78 = " + (m.v / 8), px(m.v), y + 50,
      { size: 10.5, col: on ? "#34D399" : "rgba(234,244,242,.3)", font: "mono", weight: 600 });
  });

  ctx.save();
  ctx.beginPath(); ctx.arc(px(3170), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#FA7E19"; ctx.fill(); ctx.restore();
  D.txt(ctx, "3170", px(3170), y - 28, { size: 15, col: "#FA7E19", font: "marker" });
  D.txt(ctx, "the number we actually have", W / 2, 32,
    { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
  D.txt(ctx, "3170 \u00f7 8 is about " + (pick / 8).toLocaleString("en-US"),
    W / 2, H - 16, { size: 16, col: "#C9A227", font: "marker" });
};

/* how close each candidate estimate lands */
const makeClose53 = (pick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [{ v: 2400, note: "too low" }, { v: 3200, note: "closest" }, { v: 4000, note: "too high" }];
  rows.forEach(function (r, k) {
    const on = r.v === pick;
    const a = on ? 1 : 0.4;
    D.txt(ctx, r.v.toLocaleString("en-US") + " \u00f7 8", W / 2 - 48, 66 + k * 46,
      { size: 18, col: on ? "#C9A227" : "#EAF4F2", font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 24, 66 + k * 46, { size: 15, col: "rgba(234,244,242,.5)", font: "marker", alpha: a });
    D.txt(ctx, String(r.v / 8), W / 2 + 44, 66 + k * 46,
      { size: 20, col: on ? "#34D399" : "#EAF4F2", font: "marker", align: "right", alpha: a });
    D.txt(ctx, r.note, W / 2 + 74, 66 + k * 46,
      { size: 11, col: on ? "#C9A227" : "rgba(234,244,242,.4)", font: "mono", weight: 600, align: "left", alpha: a });
  });
  D.txt(ctx, "the exact answer is about 396", W / 2, H - 40, { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "a compatible number is one the divisor goes into exactly", W / 2, H - 16,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawStory53 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "pilgrim coaches leaving Jeddah", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (var g = 0; g < 8; g++) {
    var a = D.at(p2, g / 8, g / 8 + 0.5);
    if (a <= 0) continue;
    var gx = 44 + g * ((W - 100) / 8);
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, gx, 58, (W - 120) / 8, 52, 7);
    ctx.fillStyle = "#2D70B3"; ctx.globalAlpha = a * 0.2; ctx.fill();
    ctx.globalAlpha = a; ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "?", gx + (W - 120) / (2 * 8), 88, { size: 16, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "3,170 travellers · 8 coaches", W / 2, 142, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "about how many on each coach?", W / 2, H - 16, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard53 = (ctx, W, H, frame) => {
  const CYCLE = 760, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Find a number that divides neatly" });
  const p1 = D.at(f, 20, 150), p2 = D.at(f, 160, 340), p3 = D.at(f, 350, 520), p4 = D.at(f, 520, 680);
  D.txt(ctx, "3170 \u00f7 8", W / 2, 100, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });
  if (p2 > 0) {
    D.txt(ctx, "8 does not go into 3170 neatly", W / 2, 158,
      { size: 15, col: "#C74440", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "but it goes into 3200 exactly", W / 2, 208,
      { size: 16, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "3200 \u00f7 8 = 400", W / 2, 258,
      { size: 26, col: "#34D399", font: "marker", alpha: D.at(f, 400, 490) });
  }
  if (p4 > 0) {
    var yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "close matters, but easy matters more", W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 560, 650) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 600, 700), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport53 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "9 \u00d7 600 = 5400", W / 2, 30, { size: 18, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "5400 is the nearest number 9 divides exactly", W / 2, 58,
    { size: 12.5, col: "#C9A227", font: "marker" });
  D.txt(ctx, "so 5600 \u00f7 9 is about 600", W / 2, 82,
    { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

const LESSON = {
  code: "5-3",
  storageKey: "daf-g4-t5-l3",
  title: "Mental Math: Estimate Quotients for Greater Dividends",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-3 · 4.NBT.B.6",
  math: M,
  ixl: ["MPG", "VC2"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A number line with some marks picked out. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Some of those numbers divide neatly. Most do not.",
      rail: { launch: "I am not asking you to divide anything. Just look at the marks.",
        monitor: ["Noticing the marks are spaced evenly", "Reading the divisions underneath", "Spotting the orange dot"],
        connect: "Who noticed something nobody else did?",
        misconception: "Assuming the nearest mark is always the best one to use." } },

    { phase: "launch", title: "Three thousand travellers, <em>eight coaches</em>",
      lead: "3,170 travellers, 8 coaches. The organiser needs a number in the next minute.",
      goal: "Create the need — an estimate is enough, and it must be easy.",
      pull: "Estimate first, then we will find a friendly number.",
      rail: { launch: "No pencils. About how many each?",
        monitor: ["Trying the exact division", "Rounding to the nearest hundred", "Looking for a number that divides"],
        connect: "What makes a number easy to divide by 8?",
        misconception: "Rounding to the nearest ten even when it does not divide." } },

    { phase: "monitor", title: "Find a <em>compatible number</em>",
      lead: "Not the nearest number — the nearest number the divisor goes into exactly.",
      goal: "Compatible numbers are chosen for divisibility, not for nearness.",
      pull: "Which choice gets you closest?",
      rail: { launch: "Predict which mark you would use before you tap.",
        monitor: ["Choosing a multiple of the divisor", "Choosing the nearest round number", "Testing by dividing"],
        connect: "Why is a multiple of 8 so much easier here?",
        misconception: "Confusing rounding with finding a compatible number." } },

    { phase: "monitor", title: "How <em>close</em> did you get?",
      lead: "Compare each candidate against the exact answer.",
      goal: "A good estimate is close AND easy.",
      pull: "Now sort some answers for reasonableness.",
      rail: { launch: "Predict which will be closest before you tap.",
        monitor: ["Measuring the gap", "Preferring the easiest", "Balancing both"],
        connect: "Would you rather be closer, or faster?",
        misconception: "Believing the closest estimate is always worth the extra work." } },

    { phase: "monitor", title: "Reasonable or <em>not</em>?",
      lead: "Sort each answer against your estimate. No grading until the class commits.",
      goal: "Use an estimate to catch a wrong answer.",
      pull: "Two students chose different compatible numbers.",
      rail: { launch: "Estimate first, then judge each answer.",
        monitor: ["Comparing against the estimate", "Checking the digit count", "Dividing exactly"],
        connect: "Which one was obviously wrong, and how did you know?",
        misconception: "Judging by whether the answer looks tidy." } },

    { phase: "connect", title: "Two <em>friendly numbers</em>",
      lead: "Rasha used 3,200. Waleed used 2,400. Both are compatible with 8.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Choosing below", "Choosing above", "Choosing for a purpose"],
        connect: "If you must not run short, which estimate do you want?",
        misconception: "Believing there is only one compatible number." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Look for the nearest number the divisor goes into exactly. Divide that instead.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming the multiple", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Rounding first and hoping it divides." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the compatible number", "Testing on a new division", "Checking the direction of the error"],
        connect: "If you estimate with a bigger number, is your answer too big or too small?",
        misconception: "Forgetting that a bigger dividend gives a bigger quotient." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the compatible number you used.",
        monitor: ["Finding a multiple of 9", "Rounding instead", "Dividing exactly"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Rounding 5,600 to 6,000, which 9 does not divide." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: what to do with the bit that is left over.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the line", "Ready for the next step"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [pick, setPick] = useState(3200);
    const [close, setClose] = useState(3200);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeCompat(3200)} height={254} award={award}
          notices={["The marks are evenly spaced", "Each one divides exactly", "The orange dot is between two marks", "8 goes into all of them"]}
          wonders={["Which mark should I use?", "Why not just round?", "How close will I get?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory53} height={254} award={award}
          label="About how many travellers per coach?" min={100} max={800} start={400} unit="people"
          after="Locked. Now let us find a number that divides neatly."
          note="8 does not divide 3,170 neatly. But 8 × 4 = 32, so 3,200 is perfect." />;

      case 2:
        return <ExploreChips draw={makeCompat(pick)} height={254}
          label="Pick a compatible number"
          value={pick}
          onPick={(v) => setPick(v)}
          chips={[{ v: 2400, label: "2,400" }, { v: 3200, label: "3,200" }, { v: 4000, label: "4,000" }]}
          caption={<MathEl omml={M.compatible} size="xl" display="block" />}
          footnote="Compatible means the divisor goes into it with nothing left over." />;

      case 3:
        return <ExploreChips draw={makeClose53(close)} height={254}
          label="Compare the candidates"
          value={close}
          onPick={(v) => setClose(v)}
          chips={[{ v: 2400, label: "2,400" }, { v: 3200, label: "3,200" }, { v: 4000, label: "4,000" }]}
          caption={<MathEl omml={M.exact} size="lg" display="block" />}
          footnote="Closer is better — but only if it is still easy." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "b1", text: "3,170 ÷ 8 ≈ 400", target: "ok" }, { id: "b2", text: "3,170 ÷ 8 ≈ 40", target: "no" }, { id: "b3", text: "3,170 ÷ 8 ≈ 4,000", target: "no" }, { id: "b4", text: "3,170 ÷ 8 ≈ 396", target: "ok" }]}
          targets={[
            { id: "ok", label: "reasonable — close to my estimate" },
            { id: "no", label: "not reasonable — nowhere near" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Rasha's way — use 3,200", omml: M.compatible, h: 92, quote: "8 goes into 3,200 exactly 400 times." }}
          right={{ name: "Waleed's way — use 2,400", omml: M.other, h: 92, quote: "8 goes into 2,400 exactly 300 times." }}
          same={["Both use a multiple of 8", "Both use a basic fact", "Both give a sensible size"]}
          diff={["3,200 is far closer to 3,170", "Waleed knows his is too low", "Rasha's estimate is almost exact"]} />;

      case 6:
        return <BoardScreen draw={drawBoard53} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "use the nearest number the divisor goes into exactly" }]}
          hand={"look for the nearest multiple of the divisor · divide that · use it to check the real answer"}
          cards={[
            { title: "The estimate we made", omml: M.compatible, note: "the exact answer is about 396" },
            { title: "Tap for the other choice", omml: M.exact, revealOmml: M.other, reveal: true,
              note: "a different compatible number, a different estimate" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Estimate 5,600 ÷ 9 using a compatible number."
          omml={M.swyk}
          options={[{ v: "a", text: "about 60" }, { v: "b", text: "about 600" }, { v: "c", text: "about 6,000" }, { v: "d", text: "about 500" }]}
          right="b"
          support={{
            yes: "Yes — 9 goes into 5,400 exactly 600 times, and 5,400 is close to 5,600.",
            notYet: "Not yet — look for a number nearby that 9 divides exactly.",
            draw: drawSupport53, h: 92,
            hint: "9 × 6 = 54, so 9 × 600 = 5,400."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Estimate how many days are in a large number of hours by finding a compatible number." />;

      default: return null;
    }
  }
};
