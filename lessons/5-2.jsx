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
    { phase: "warmup", title: "Marks that <em>divide exactly</em>",
      lead: "On the number line, some marks divide by 6 with nothing left over — and 245 sits between two of them.",
      goal: "Notice that an estimate can be a number that divides cleanly.",
      pull: "Why not just round? Some nearby numbers divide — and some do not.",
      rail: { launch: "Fictional frame. Look at the marks — no working yet.",
        monitor: ["Noticing the even gaps", "Finding 240 and 300", "Wonding which mark to use"],
        connect: "What do all the green marks have in common?",
        misconception: "Rounding first and checking later." } },

    { phase: "launch", title: "About how many <em>bottles per class</em>?",
      lead: "245 water bottles, 6 classes. The caravan master needs a fast number, not a slow one.",
      goal: "Create the need — 6 does not go into 245 neatly, but it goes into 240.",
      pull: "The bottle count is simulated — the compatible idea works on any manifest.",
      rail: { launch: "Give a per-class number and the mark you used.",
        monitor: ["Picking 240", "Picking 245 and dividing anyway", "Estimating by rounding only"],
        connect: "Why is 240 easier than 245?",
        misconception: "Rounding 245 to 250, which 6 does not divide." } },

    { phase: "monitor", title: "Zayd picks a <em>compatible number</em>",
      lead: "180, 240, 300 — each divides by 6 exactly. Compatible means the divisor goes in with nothing left over.",
      goal: "Choose the compatible number that is also close.",
      pull: "Compatible means the divisor goes into it with nothing left over.",
      rail: { launch: "Before you tap: which mark would you trust?",
        monitor: ["Choosing 240", "Checking 180 divides", "Comparing closeness"],
        connect: "Which compatible number is closest to 245?",
        misconception: "Picking a number that divides but is far away." } },

    { phase: "monitor", title: "Omar compares the <em>candidates</em>",
      lead: "Each candidate is easy — but only some are close. Closer is better, but only if it is still easy.",
      goal: "Judge a compatible estimate by ease and closeness together.",
      pull: "Closer is better — but only if it is still easy.",
      rail: { launch: "Before you tap: which candidate earns the trust?",
        monitor: ["Comparing 180 and 240", "Saying 240 is closer", "Checking both are easy"],
        connect: "What makes 240 the better candidate than 180?",
        misconception: "Picking the closest number even if it does not divide." } },

    { phase: "monitor", title: "Which estimates <em>survive</em>?",
      lead: "Four claimed estimates for 245 ÷ 6. The compatible number catches the disasters.",
      goal: "Flag an estimate that cannot be right.",
      pull: "Close to my estimate — or nowhere near.",
      rail: { launch: "Compare each claim to your compatible estimate before you sort.",
        monitor: ["Comparing claims to 40", "Spotting 4 as too small", "Spotting 400 as too big"],
        connect: "What made the impossible estimates impossible?",
        misconception: "Accepting a tidy-looking estimate." } },

    { phase: "connect", title: "Anas uses <em>240</em>. Majed uses <em>180</em>",
      lead: "Anas: 240, nearly exact. Majed: 180, safely low. Both are honest estimates.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing closeness", "Comparing ease", "Saying which decision needs which"],
        connect: "When is a safely-low estimate the right one?",
        misconception: "Believing only the closest estimate counts." } },

    { phase: "synth", title: "On the <em>board</em>: the nearest number the divisor goes into",
      lead: "Look for the nearest multiple of the divisor. Divide that. Use it to check the real answer.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Finding the compatible mark", "Dividing it", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Rounding without checking the divisor goes in." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "430 ÷ 7 — the compatible number first.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say the compatible number aloud.",
        monitor: ["Finding 420", "Dividing 420 by 7", "Checking closeness"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Estimating 40 — the place was dropped." } },

    { phase: "connect", title: "The range is <em>agreed</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: a larger manifest — the dividend is too big for the first strategy.",
      rail: { launch: "Ask three students to say their compatible number.",
        monitor: ["Able to explain the choice", "Still rounds without checking", "Ready for bigger dividends"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [pick, setPick] = useState(240);
    const [close, setClose] = useState(240);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Marks that divide exactly"
            text="On the manifest's number line, some marks divide by 6 with nothing left over — and 245 bottles sits between two of them."
            clue="An estimate can be a number that divides cleanly.">
            <NoticeWonder draw={makeCompat(240)} height={254} award={award}
              notices={["The marks are evenly spaced", "Each one divides exactly", "The orange dot is between two marks", "6 goes into all of them"]}
              wonders={["Which mark should I use?", "Why not just round?", "How close will I get?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="A fast number, not a slow one"
            text="Omar asks the transport team's question: 245 bottles, 6 classes — about how many each, quickly?"
            clue="6 does not go into 245 neatly — but it goes into 240.">
            <LaunchEstimate draw={drawStory52} height={254} award={award}
              label="About how many bottles per class?" min={20} max={80} start={40} unit="bottles"
              after="Locked. Now let us find a number that divides neatly."
              note="The bottle count is simulated — the compatible idea works on any manifest." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd picks a compatible number"
            text="He can test any candidate mark — the class must say which one divides exactly and is also close."
            clue="Compatible means the divisor goes into it with nothing left over.">
            <ExploreChips draw={makeCompat(pick)} height={254}
              label="Pick a compatible number"
              value={pick}
              onPick={(v) => setPick(v)}
              chips={[{ v: 180, label: "180" }, { v: 240, label: "240" }, { v: 300, label: "300" }]}
              caption={<MathEl omml={M.compatible} size="xl" display="block" />}
              footnote="Compatible means the divisor goes into it with nothing left over." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar compares the candidates"
            text="Each candidate is easy — the question is which one is also close enough to trust."
            clue="Closer is better — but only if it is still easy.">
            <ExploreChips draw={makeClose52(close)} height={254}
              label="Compare the candidates"
              value={close}
              onPick={(v) => setClose(v)}
              chips={[{ v: 180, label: "180" }, { v: 240, label: "240" }, { v: 300, label: "300" }]}
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
              items={[{ id: "a1", text: "245 ÷ 6 ≈ 41", target: "ok" }, { id: "a2", text: "245 ÷ 6 ≈ 4", target: "no" }, { id: "a3", text: "245 ÷ 6 ≈ 400", target: "no" }, { id: "a4", text: "245 ÷ 6 ≈ 40", target: "ok" }]}
              targets={[
                { id: "ok", label: "reasonable — close to my estimate" },
                { id: "no", label: "not reasonable — nowhere near" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, two honest estimates"
            text="Anas uses 240 — nearly exact. Majed uses 180 — safely low. Both tell the truth about the range."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Anas's way — use 240", omml: M.compatible, h: 92, quote: "6 goes into 240 exactly 40 times." }}
              right={{ name: "Majed's way — use 180", omml: M.other, h: 92, quote: "6 goes into 180 exactly 30 times." }}
              same={["Both use a multiple of 6", "Both are easy to do in the head", "Both give a sensible size"]}
              diff={["240 is much closer to 245", "Majed knows his answer is too low", "Anas's estimate is nearly exact"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn with its reason"
            text="Zayd builds only what the class can justify: the compatible mark found, divided, and held up to the real number."
            clue="The nearest number the divisor goes into exactly.">
            <BoardScreen draw={drawBoard52} height={430}
              caption="Use the nearest number the divisor goes into exactly." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the range"
            text="430 ÷ 7. Name the compatible number — then the estimate."
            clue="7 × 6 = 42, so 7 × 60 = 420.">
            <ShowWhatYouKnow award={award}
              prompt="Estimate 430 ÷ 7 using a compatible number."
              omml={M.swyk}
              options={[{ v: "a", text: "about 40" }, { v: "b", text: "about 60" }, { v: "c", text: "about 6" }, { v: "d", text: "about 600" }]}
              right="b"
              support={{
                yes: "Yes — 7 goes into 420 exactly 60 times, and 420 is very close to 430.",
                notYet: "Not yet — look for a number nearby that 7 divides exactly.",
                draw: drawSupport52, h: 92,
                hint: "7 × 6 = 42, so 7 × 60 = 420."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The range is agreed"
            text="Omar signs the fast range. The next manifest is a different animal: 3,170 travellers, 8 coaches — the dividend is too large for the first strategy."
            artifact="Caravan schedule · quotient range agreed"
            next="A larger manifest — the dividend is too large for the first estimate strategy.">
            <Closing game={game} omml={M.rule}
              action="Share a number of things at home between 6 people and estimate before you count." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
