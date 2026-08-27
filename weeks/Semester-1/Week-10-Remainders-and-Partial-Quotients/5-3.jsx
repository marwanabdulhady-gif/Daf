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
    { phase: "warmup", title: "A manifest too <em>large</em> for the old marks",
      lead: "3,170 travellers, 8 coaches. The old number line is crowded — but 8 × 4 = 32, so 3,200 is waiting just above.",
      goal: "Notice the compatible number hides in a basic fact.",
      pull: "The traveller count is simulated — the compatible idea works on any manifest.",
      rail: { launch: "Fictional frame. Look at the marks — no working yet.",
        monitor: ["Finding 2,400, 3,200, 4,000", "Noticing the even gaps", "Wonding which mark to trust"],
        connect: "Which mark sits just above 3,170?",
        misconception: "Rounding 3,170 to 3,200 without checking 8 goes in." } },

    { phase: "launch", title: "About how many <em>travellers per coach</em>?",
      lead: "The transport team needs the load per coach before the gates open — fast.",
      goal: "Create the need — 8 does not divide 3,170, but 8 × 4 = 32 says 3,200 is perfect.",
      pull: "8 × 4 = 32, so 3,200 divides exactly.",
      rail: { launch: "Give a per-coach number and the mark you used.",
        monitor: ["Picking 3,200", "Picking 2,400 and calling it close", "Estimating by rounding only"],
        connect: "Why is 3,200 the natural mark here?",
        misconception: "Picking 3,100 — 8 does not go into it." } },

    { phase: "monitor", title: "Zayd tests the <em>compatible marks</em>",
      lead: "2,400, 3,200, 4,000 — each divides by 8 exactly. The question is which one earns the trust.",
      goal: "Choose the compatible number that is close and easy.",
      pull: "Compatible means the divisor goes into it with nothing left over.",
      rail: { launch: "Before you tap: which mark would you trust?",
        monitor: ["Choosing 3,200", "Checking each divides", "Comparing closeness"],
        connect: "Which compatible number is closest to 3,170?",
        misconception: "Picking 4,000 because it divides — and ignoring how far it is." } },

    { phase: "monitor", title: "Omar compares the <em>candidates</em>",
      lead: "Each candidate is easy — only one is also close. 3,200 sits 30 above the manifest.",
      goal: "Judge a compatible estimate by ease and closeness together.",
      pull: "Closer is better — but only if it is still easy.",
      rail: { launch: "Before you tap: which candidate earns the trust?",
        monitor: ["Comparing 2,400 and 3,200", "Saying 3,200 is 30 away", "Checking both divide"],
        connect: "What makes 3,200 the better candidate than 2,400?",
        misconception: "Picking the roundest-looking number." } },

    { phase: "monitor", title: "Which estimates <em>survive</em>?",
      lead: "Four claimed estimates for 3,170 ÷ 8. The compatible number catches the disasters.",
      goal: "Flag an estimate that cannot be right.",
      pull: "Close to my estimate — or nowhere near.",
      rail: { launch: "Compare each claim to your compatible estimate before you sort.",
        monitor: ["Comparing claims to 400", "Spotting 40 as too small", "Spotting 4,000 as too big"],
        connect: "What made the impossible estimates impossible?",
        misconception: "Accepting a tidy-looking estimate." } },

    { phase: "connect", title: "Rasha uses <em>3,200</em>. Waleed uses <em>2,400</em>",
      lead: "Rasha: almost exact. Waleed: safely low. Both are honest — and only one is close.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing closeness", "Comparing ease", "Saying which decision needs which"],
        connect: "When would the safely-low estimate be the better plan?",
        misconception: "Believing the rounder number is always the closer one." } },

    { phase: "synth", title: "On the <em>board</em>: the fact hides the mark",
      lead: "8 × 4 = 32 says 3,200 divides exactly. Divide 3,200 by 8, and the real answer must sit near 400.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Finding the mark from the fact", "Dividing it", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Rounding the dividend without using a basic fact." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "5,600 ÷ 9 — the compatible number first.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say the basic fact that hides the mark.",
        monitor: ["Finding 5,400 from 9 × 6", "Dividing 5,400 by 9", "Checking closeness"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Estimating 60 — the place was dropped." } },

    { phase: "connect", title: "The large manifest is <em>ranged</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: the manifest divides cleanly — but not for everyone. Two are left at the gate.",
      rail: { launch: "Ask three students to say their compatible number.",
        monitor: ["Able to explain the choice", "Still rounds without a fact", "Ready for remainders"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [pick, setPick] = useState(3200);
    const [close, setClose] = useState(3200);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="A manifest too large for the old marks"
            text="3,170 travellers, 8 coaches. The old number line is crowded — but 8 × 4 = 32, so 3,200 is waiting just above the manifest."
            clue="The compatible number hides in a basic fact.">
            <NoticeWonder draw={makeCompat(3200)} height={254} award={award}
              notices={["The marks are evenly spaced", "Each one divides exactly", "The orange dot is between two marks", "8 goes into all of them"]}
              wonders={["Which mark should I use?", "Why not just round?", "How close will I get?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The load per coach, before the gates open"
            text="Omar asks the transport team's question: 3,170 travellers, 8 coaches — about how many each, fast?"
            clue="8 × 4 = 32, so 3,200 is perfect.">
            <LaunchEstimate draw={drawStory53} height={254} award={award}
              label="About how many travellers per coach?" min={100} max={800} start={400} unit="people"
              after="Locked. Now let us find a number that divides neatly."
              note="The traveller count is simulated — the compatible idea works on any manifest." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd tests the compatible marks"
            text="He can test any candidate mark — the class must say which one divides exactly and is also close."
            clue="Compatible means the divisor goes into it with nothing left over.">
            <ExploreChips draw={makeCompat(pick)} height={254}
              label="Pick a compatible number"
              value={pick}
              onPick={(v) => setPick(v)}
              chips={[{ v: 2400, label: "2,400" }, { v: 3200, label: "3,200" }, { v: 4000, label: "4,000" }]}
              caption={<MathEl omml={M.compatible} size="xl" display="block" />}
              footnote="Compatible means the divisor goes into it with nothing left over." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar compares the candidates"
            text="Each candidate is easy — the question is which one is also close enough to trust."
            clue="3,200 sits just 30 above the manifest.">
            <ExploreChips draw={makeClose53(close)} height={254}
              label="Compare the candidates"
              value={close}
              onPick={(v) => setClose(v)}
              chips={[{ v: 2400, label: "2,400" }, { v: 3200, label: "3,200" }, { v: 4000, label: "4,000" }]}
              caption={<MathEl omml={M.exact} size="lg" display="block" />}
              footnote="Closer is better — but only if it is still easy." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Which estimates survive?"
            text="Omar and Zayd lay four claimed estimates on the board. The compatible number catches the disasters."
            clue="Close to my estimate — or nowhere near.">
            <CardSort award={award} columns={2}
              items={[{ id: "b1", text: "3,170 ÷ 8 ≈ 400", target: "ok" }, { id: "b2", text: "3,170 ÷ 8 ≈ 40", target: "no" }, { id: "b3", text: "3,170 ÷ 8 ≈ 4,000", target: "no" }, { id: "b4", text: "3,170 ÷ 8 ≈ 396", target: "ok" }]}
              targets={[
                { id: "ok", label: "reasonable — close to my estimate" },
                { id: "no", label: "not reasonable — nowhere near" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, two honest ranges"
            text="Rasha uses 3,200 — almost exact. Waleed uses 2,400 — safely low. Only one is close."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Rasha's way — use 3,200", omml: M.compatible, h: 92, quote: "8 goes into 3,200 exactly 400 times." }}
              right={{ name: "Waleed's way — use 2,400", omml: M.other, h: 92, quote: "8 goes into 2,400 exactly 300 times." }}
              same={["Both use a multiple of 8", "Both use a basic fact", "Both give a sensible size"]}
              diff={["3,200 is far closer to 3,170", "Waleed knows his is too low", "Rasha's estimate is almost exact"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The fact hides the mark"
            text="Zayd builds only what the class can justify: the basic fact, the mark it names, the division, the range."
            clue="8 × 4 = 32 says 3,200 divides exactly.">
            <BoardScreen draw={drawBoard53} height={430}
              caption="The fact hides the mark — and the mark ranges the answer." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the large range"
            text="5,600 ÷ 9. Name the basic fact that hides the mark — then the estimate."
            clue="9 × 6 = 54, so 9 × 600 = 5,400.">
            <ShowWhatYouKnow award={award}
              prompt="Estimate 5,600 ÷ 9 using a compatible number."
              omml={M.swyk}
              options={[{ v: "a", text: "about 60" }, { v: "b", text: "about 600" }, { v: "c", text: "about 6,000" }, { v: "d", text: "about 500" }]}
              right="b"
              support={{
                yes: "Yes — 9 goes into 5,400 exactly 600 times, and 5,400 is close to 5,600.",
                notYet: "Not yet — look for a number nearby that 9 divides exactly.",
                draw: drawSupport53, h: 92,
                hint: "9 × 6 = 54, so 9 × 600 = 5,400."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The large manifest is ranged"
            text="Omar signs the large range. But the next manifest divides cleanly for the carts — and not for the people. When the loading is done, two passengers are still standing at the gate."
            artifact="Caravan schedule · large manifest ranged"
            next="The manifest divides cleanly for the carts — but not for the people. Two are left at the gate.">
            <Closing game={game} omml={M.rule}
              action="Estimate how many days are in a large number of hours by finding a compatible number." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
