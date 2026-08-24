/* ===========================================================================
   Grade 4 · Topic 5 · LESSON 5-2 · Mental Math: Estimate Quotients
   Standard 4.NBT.B.6   I can ... estimate a quotient by choosing a compatible
   number the divisor divides exactly.
   =========================================================================== */

const M = {
  problem: om(mt("245\u00f76")),
  compatible: om(mt("240\u00f76=40")),
  exact: om(mt("245\u00f76=about 41")),
  why: om(mnor("240 is close to 245, and 6 divides it exactly")),
  other: om(mt("180\u00f76=30")),
  rule: om(mnor("use the nearest number the divisor goes into exactly")),
  swyk: om(mt("430\u00f77")),
  swykAnswer: om(mt("420\u00f77=60"))
};

/* the number line of nearby multiples of the divisor */
const makeCompat = (pick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const lo = 180, hi = 300;
  const x = 62, w = W - 124, y = H / 2 + 4;
  const px = function (n) { return x + ((n - lo) / (hi - lo)) * w; };
  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.7)", 2.2);

  const marks = [{ v: 180 }, { v: 240 }, { v: 300 }];
  marks.forEach(function (m) {
    const on = m.v === pick;
    ctx.save();
    ctx.strokeStyle = on ? "#C9A227" : "rgba(234,244,242,.4)";
    ctx.lineWidth = on ? 2.4 : 1.4;
    ctx.beginPath(); ctx.moveTo(px(m.v), y - (on ? 13 : 8)); ctx.lineTo(px(m.v), y + (on ? 13 : 8)); ctx.stroke();
    ctx.restore();
    D.txt(ctx, m.v.toLocaleString("en-US"), px(m.v), y + 30,
      { size: 11.5, col: on ? "#C9A227" : "rgba(234,244,242,.5)", font: "marker" });
    D.txt(ctx, "\u00f76 = " + (m.v / 6), px(m.v), y + 50,
      { size: 10.5, col: on ? "#34D399" : "rgba(234,244,242,.3)", font: "mono", weight: 600 });
  });

  ctx.save();
  ctx.beginPath(); ctx.arc(px(245), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#FA7E19"; ctx.fill(); ctx.restore();
  D.txt(ctx, "245", px(245), y - 28, { size: 15, col: "#FA7E19", font: "marker" });
  D.txt(ctx, "the number we actually have", W / 2, 32,
    { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
  D.txt(ctx, "245 \u00f7 6 is about " + (pick / 6).toLocaleString("en-US"),
    W / 2, H - 16, { size: 16, col: "#C9A227", font: "marker" });
};

/* how close each candidate estimate lands */
const makeClose52 = (pick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [{ v: 180, note: "too low" }, { v: 240, note: "closest" }, { v: 300, note: "too high" }];
  rows.forEach(function (r, k) {
    const on = r.v === pick;
    const a = on ? 1 : 0.4;
    D.txt(ctx, r.v.toLocaleString("en-US") + " \u00f7 6", W / 2 - 48, 66 + k * 46,
      { size: 18, col: on ? "#C9A227" : "#EAF4F2", font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 24, 66 + k * 46, { size: 15, col: "rgba(234,244,242,.5)", font: "marker", alpha: a });
    D.txt(ctx, String(r.v / 6), W / 2 + 44, 66 + k * 46,
      { size: 20, col: on ? "#34D399" : "#EAF4F2", font: "marker", align: "right", alpha: a });
    D.txt(ctx, r.note, W / 2 + 74, 66 + k * 46,
      { size: 11, col: on ? "#C9A227" : "rgba(234,244,242,.4)", font: "mono", weight: 600, align: "left", alpha: a });
  });
  D.txt(ctx, "the exact answer is about 41", W / 2, H - 40, { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "a compatible number is one the divisor goes into exactly", W / 2, H - 16,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawStory52 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "water bottles for sports day", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (var g = 0; g < 6; g++) {
    var a = D.at(p2, g / 6, g / 6 + 0.5);
    if (a <= 0) continue;
    var gx = 44 + g * ((W - 100) / 6);
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, gx, 58, (W - 120) / 6, 52, 7);
    ctx.fillStyle = "#2D70B3"; ctx.globalAlpha = a * 0.2; ctx.fill();
    ctx.globalAlpha = a; ctx.strokeStyle = "#2D70B3"; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "?", gx + (W - 120) / (2 * 6), 88, { size: 16, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "245 bottles · 6 classes", W / 2, 142, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "about how many for each class?", W / 2, H - 16, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard52 = (ctx, W, H, frame) => {
  const CYCLE = 760, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Find a number that divides neatly" });
  const p1 = D.at(f, 20, 150), p2 = D.at(f, 160, 340), p3 = D.at(f, 350, 520), p4 = D.at(f, 520, 680);
  D.txt(ctx, "245 \u00f7 6", W / 2, 100, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });
  if (p2 > 0) {
    D.txt(ctx, "6 does not go into 245 neatly", W / 2, 158,
      { size: 15, col: "#C74440", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "but it goes into 240 exactly", W / 2, 208,
      { size: 16, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "240 \u00f7 6 = 40", W / 2, 258,
      { size: 26, col: "#34D399", font: "marker", alpha: D.at(f, 400, 490) });
  }
  if (p4 > 0) {
    var yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "close matters, but easy matters more", W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 560, 650) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 600, 700), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport52 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "7 \u00d7 60 = 420", W / 2, 30, { size: 18, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "420 is the nearest number 7 divides exactly", W / 2, 58,
    { size: 12.5, col: "#C9A227", font: "marker" });
  D.txt(ctx, "so 430 \u00f7 7 is about 60", W / 2, 82,
    { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

const LESSON = {
  code: "5-2",
  storageKey: "daf-g4-t5-l2",
  title: "Mental Math: Estimate Quotients",
  unit: "GRADE 4 · TOPIC 5 · LESSON 5-2 · 4.NBT.B.6",
  math: M,
  ixl: ["CWE"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A number line with some marks picked out. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "Some of those numbers divide neatly. Most do not.",
      rail: { launch: "I am not asking you to divide anything. Just look at the marks.",
        monitor: ["Noticing the marks are spaced evenly", "Reading the divisions underneath", "Spotting the orange dot"],
        connect: "Who noticed something nobody else did?",
        misconception: "Assuming the nearest mark is always the best one to use." } },

    { phase: "launch", title: "Two hundred and forty-five bottles, <em>six classes</em>",
      lead: "245 bottles shared between 6 classes. Nobody needs the exact number yet.",
      goal: "Create the need — an estimate is enough, and it must be easy.",
      pull: "Estimate first, then we will find a friendly number.",
      rail: { launch: "No pencils. About how many each?",
        monitor: ["Trying the exact division", "Rounding to the nearest hundred", "Looking for a number that divides"],
        connect: "What makes a number easy to divide by 6?",
        misconception: "Rounding to the nearest ten even when it does not divide." } },

    { phase: "monitor", title: "Find a <em>compatible number</em>",
      lead: "Not the nearest number — the nearest number the divisor goes into exactly.",
      goal: "Compatible numbers are chosen for divisibility, not for nearness.",
      pull: "Which choice gets you closest?",
      rail: { launch: "Predict which mark you would use before you tap.",
        monitor: ["Choosing a multiple of the divisor", "Choosing the nearest round number", "Testing by dividing"],
        connect: "Why is a multiple of 6 so much easier here?",
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
      lead: "Dalia used 240. Majed used 180. Both are compatible with 6.",
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
        monitor: ["Finding a multiple of 7", "Rounding instead", "Dividing exactly"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Rounding 430 to 400, which 7 does not divide." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the same idea with much bigger numbers.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the line", "Ready for the next step"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [pick, setPick] = useState(240);
    const [close, setClose] = useState(240);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeCompat(240)} height={254} award={award}
          notices={["The marks are evenly spaced", "Each one divides exactly", "The orange dot is between two marks", "6 goes into all of them"]}
          wonders={["Which mark should I use?", "Why not just round?", "How close will I get?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory52} height={254} award={award}
          label="About how many bottles per class?" min={20} max={80} start={40} unit="bottles"
          after="Locked. Now let us find a number that divides neatly."
          note="6 does not go into 245 neatly. But it goes into 240 perfectly." />;

      case 2:
        return <ExploreChips draw={makeCompat(pick)} height={254}
          label="Pick a compatible number"
          value={pick}
          onPick={(v) => setPick(v)}
          chips={[{ v: 180, label: "180" }, { v: 240, label: "240" }, { v: 300, label: "300" }]}
          caption={<MathEl omml={M.compatible} size="xl" display="block" />}
          footnote="Compatible means the divisor goes into it with nothing left over." />;

      case 3:
        return <ExploreChips draw={makeClose52(close)} height={254}
          label="Compare the candidates"
          value={close}
          onPick={(v) => setClose(v)}
          chips={[{ v: 180, label: "180" }, { v: 240, label: "240" }, { v: 300, label: "300" }]}
          caption={<MathEl omml={M.exact} size="lg" display="block" />}
          footnote="Closer is better — but only if it is still easy." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "a1", text: "245 ÷ 6 ≈ 41", target: "ok" }, { id: "a2", text: "245 ÷ 6 ≈ 4", target: "no" }, { id: "a3", text: "245 ÷ 6 ≈ 400", target: "no" }, { id: "a4", text: "245 ÷ 6 ≈ 40", target: "ok" }]}
          targets={[
            { id: "ok", label: "reasonable — close to my estimate" },
            { id: "no", label: "not reasonable — nowhere near" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Dalia's way — use 240", omml: M.compatible, h: 92, quote: "6 goes into 240 exactly 40 times." }}
          right={{ name: "Majed's way — use 180", omml: M.other, h: 92, quote: "6 goes into 180 exactly 30 times." }}
          same={["Both use a multiple of 6", "Both are easy to do in the head", "Both give a sensible size"]}
          diff={["240 is much closer to 245", "Majed knows his answer is too low", "Dalia's estimate is nearly exact"]} />;

      case 6:
        return <BoardScreen draw={drawBoard52} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "use the nearest number the divisor goes into exactly" }]}
          hand={"look for the nearest multiple of the divisor · divide that · use it to check the real answer"}
          cards={[
            { title: "The estimate we made", omml: M.compatible, note: "the exact answer is about 41" },
            { title: "Tap for the other choice", omml: M.exact, revealOmml: M.other, reveal: true,
              note: "a different compatible number, a different estimate" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Estimate 430 ÷ 7 using a compatible number."
          omml={M.swyk}
          options={[{ v: "a", text: "about 40" }, { v: "b", text: "about 60" }, { v: "c", text: "about 6" }, { v: "d", text: "about 600" }]}
          right="b"
          support={{
            yes: "Yes — 7 goes into 420 exactly 60 times, and 420 is very close to 430.",
            notYet: "Not yet — look for a number nearby that 7 divides exactly.",
            draw: drawSupport52, h: 92,
            hint: "7 × 6 = 42, so 7 × 60 = 420."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Share a number of things at home between 6 people and estimate before you count." />;

      default: return null;
    }
  }
};
