/* ===========================================================================
   Grade 4 · Topic 9 · LESSON 9-2 · Decompose Fractions
   Standard 4.NF.B.3b   I can ... break a fraction into a sum of smaller
   fractions, in more than one way.
   =========================================================================== */

const M = {
  whole: om(mfrac(5, 8)),
  unitSum: om(mfrac(1, 8), mt("+"), mfrac(1, 8), mt("+"), mfrac(1, 8), mt("+"), mfrac(1, 8), mt("+"), mfrac(1, 8)),
  twoPlusThree: om(mfrac(2, 8), mt("+"), mfrac(3, 8)),
  fourPlusOne: om(mfrac(4, 8), mt("+"), mfrac(1, 8)),
  many: om(mnor("more than one way \u00b7 always the same total")),
  mixed: om(mt("1"), mfrac(1, 4), mt("="), mfrac(4, 4), mt("+"), mfrac(1, 4)),
  rule: om(mnor("the parts must add back to the whole fraction")),
  swyk: om(mfrac(7, 10)),
  swykAnswer: om(mfrac(4, 10), mt("+"), mfrac(3, 10))
};

const WAYS = [
  { id: "units", parts: [1, 1, 1, 1, 1], label: "all unit fractions" },
  { id: "two", parts: [2, 3], label: "2 and 3" },
  { id: "four", parts: [4, 1], label: "4 and 1" }
];

const makeDecomp = (id) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const way = WAYS.filter(function (w) { return w.id === id; })[0];
  const x = 66, w = W - 132, pw = w / 8;
  D.fracBar(ctx, { x: x, y: 70, w: w, h: 52, den: 8, num: 5, prog: 1, col: "#2D70B3", label: false });
  const cols = ["#FA7E19", "#6042A6", "#388C46", "#C74440", "#67E8F9"];
  let from = 0;
  way.parts.forEach(function (p, k) {
    ctx.save();
    ctx.globalAlpha = 0.9;
    D.rr(ctx, x + from * pw + 2, 66, p * pw - 4, 60, 5);
    ctx.strokeStyle = cols[k % cols.length]; ctx.lineWidth = 2.2; ctx.setLineDash([5, 3]);
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, p + "/8", x + (from + p / 2) * pw, 146,
      { size: 13.5, col: cols[k % cols.length], font: "marker" });
    from += p;
  });
  D.txt(ctx, way.parts.map(function (p) { return p + "/8"; }).join(" + ") + " = 5/8",
    W / 2, H - 38, { size: 16, col: "#34D399", font: "marker" });
  D.txt(ctx, "the shaded amount never changed", W / 2, H - 14,
    { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

const makeCount = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 66, w = W - 132, pw = w / 8;
  D.fracBar(ctx, { x: x, y: 74, w: w, h: 52, den: 8, num: n, prog: 1, col: "#2D70B3", label: false });
  for (var k = 0; k < n; k++) {
    D.txt(ctx, "1/8", x + (k + 0.5) * pw, 100, { size: 12, col: "#EAF4F2", font: "marker" });
  }
  D.txt(ctx, n + " copies of one eighth", W / 2, 44, { size: 15, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, n === 5 ? "5/8 is five one-eighths" : "keep adding unit fractions",
    W / 2, H - 16, { size: 14, col: n === 5 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawPizza = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "sharing five slices", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 66, y: 58, w: W - 132, h: 50, den: 8, num: 5, prog: p2, col: "#FA7E19" });
  if (p3 > 0) {
    D.txt(ctx, "five of the eight slices are taken", W / 2, 152,
      { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "in how many ways could two people split them?", W / 2, H - 16,
      { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard92 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "One amount, many splits" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 220, 400), p3 = D.at(f, 420, 600), p4 = D.at(f, 610, 760);
  const x = 108, w = W - 216, pw = w / 8;
  const rows = [{ parts: [1,1,1,1,1], y: 108, p: p1 }, { parts: [2,3], y: 190, p: p2 }, { parts: [4,1], y: 272, p: p3 }];
  const cols = ["#FA7E19", "#6042A6", "#388C46", "#C74440", "#67E8F9"];
  rows.forEach(function (r) {
    if (r.p <= 0) return;
    D.fracBar(ctx, { x: x, y: r.y, w: w, h: 44, den: 8, num: 5, prog: r.p, col: "#2D70B3", label: false });
    var from = 0;
    r.parts.forEach(function (pp, k) {
      ctx.save();
      ctx.globalAlpha = r.p;
      D.rr(ctx, x + from * pw + 2, r.y - 3, pp * pw - 4, 50, 5);
      ctx.strokeStyle = cols[k % cols.length]; ctx.lineWidth = 2; ctx.setLineDash([5, 3]); ctx.stroke();
      ctx.restore();
      from += pp;
    });
  });
  if (p4 > 0) {
    var yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "however you cut it, the parts add back to five eighths",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 650, 750) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 690, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport92 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 16, w: W - 52, h: 34, den: 10, num: 7, prog: 1, col: "#2D70B3", label: false });
  D.txt(ctx, "7 tenths \u2014 split it any way you like", W / 2, 72,
    { size: 12, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "9-2",
  storageKey: "daf-g4-t9-l2",
  title: "Decompose Fractions",
  unit: "GRADE 4 · TOPIC 9 · LESSON 9-2 · 4.NF.B.3b",
  math: M,
  ixl: ["N2Z", "UEW", "UX6"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Five shaded pieces, with dashed boxes grouping them. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "The grouping changed. The amount did not.",
      rail: { launch: "I am not asking for a total. Just look at the boxes.",
        monitor: ["Counting the shaded pieces", "Reading the group sizes", "Noticing the total is the same"],
        connect: "Who noticed something nobody else did?",
        misconception: "Thinking the grouping changes the amount." } },

    { phase: "launch", title: "Five slices, <em>two people</em>",
      lead: "Five eighths of a tray. In how many ways could two people split it? Estimate first.",
      goal: "Create the need — one fraction can be written as many sums.",
      pull: "Every split must add back to five eighths.",
      rail: { launch: "Suggest one way. Now another. Keep going.",
        monitor: ["Finding 1 and 4", "Finding 2 and 3", "Trying to use pieces that do not exist"],
        connect: "What must every split have in common?",
        misconception: "Splitting into parts that do not add to the original." } },

    { phase: "monitor", title: "All the way down to <em>unit fractions</em>",
      lead: "Five eighths is five copies of one eighth.",
      goal: "Every fraction is a count of unit fractions.",
      pull: "Now group them differently.",
      rail: { launch: "Predict how many unit fractions before you tap.",
        monitor: ["Counting one eighth at a time", "Naming the unit", "Losing count"],
        connect: "Why is one eighth the natural building block here?",
        misconception: "Calling 5/8 five wholes." } },

    { phase: "monitor", title: "Group them <em>differently</em>",
      lead: "Two and three. Four and one. All units. Same amount every time.",
      goal: "Decomposition is not unique — but the total is.",
      pull: "Now sort some splits.",
      rail: { launch: "Predict the sum before you tap.",
        monitor: ["Checking the total", "Trying an invalid split", "Naming each part"],
        connect: "How would you check a split is valid?",
        misconception: "Believing there is one correct decomposition." } },

    { phase: "monitor", title: "Valid split or <em>not</em>?",
      lead: "Sort each one. No grading until the class commits.",
      goal: "The parts must add back exactly.",
      pull: "Two students split it differently and both were right.",
      rail: { launch: "Add the parts before you decide.",
        monitor: ["Adding the parts", "Checking the denominator", "Guessing"],
        connect: "What went wrong in the ones you rejected?",
        misconception: "Accepting a split whose parts do not total the original." } },

    { phase: "connect", title: "Two <em>splits</em>, both right",
      lead: "Iyad split it 2 and 3. Basil split it 4 and 1. Both add to five eighths.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Adding each split back", "Preferring one", "Finding a third"],
        connect: "How many valid splits are there altogether?",
        misconception: "Believing one split is more correct." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Three different groupings of the same five eighths.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next grouping", "Adding the parts", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Learning the three splits instead of the idea." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Checking the parts add back", "Testing on tenths", "Asking about mixed numbers"],
        connect: "How would you decompose one and a quarter?",
        misconception: "Forgetting that a whole is four quarters." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Check your parts add back.",
        monitor: ["Adding the parts", "Keeping the denominator", "Guessing"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Choosing a pair that adds to the wrong total." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: adding without any picture at all.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready to add in symbols"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [id, setId] = useState("units");

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeDecomp("two")} height={256} award={award}
          notices={["Five pieces are shaded", "The boxes group them", "The total is the same", "The bar is in eighths"]}
          wonders={["Could I group them another way?", "Does the total change?", "How many ways are there?"]} />;

      case 1:
        return <LaunchEstimate draw={drawPizza} height={256} award={award}
          label="How many different two-way splits?" min={1} max={8} start={4} unit="ways"
          after="Locked. Now let us break it right down."
          note="Every split has to add back to five eighths." />;

      case 2:
        return <ExploreChips draw={makeCount(n)} height={256}
          label="Build it from unit fractions"
          value={n}
          onPick={(v) => setN(v)}
          chips={[1, 2, 3, 4, 5].map((k) => ({ v: k, label: k + " × 1/8" }))}
          caption={<MathEl omml={M.unitSum} size="lg" display="block" />}
          footnote="One eighth is the building block. Five of them make five eighths." />;

      case 3:
        return <ExploreChips draw={makeDecomp(id)} height={256}
          label="Group them a different way"
          value={id}
          onPick={(v) => setId(v)}
          chips={WAYS.map((w) => ({ v: w.id, label: w.label }))}
          caption={<MathEl omml={id === "units" ? M.unitSum : id === "two" ? M.twoPlusThree : M.fourPlusOne} size="lg" display="block" />}
          footnote="Different grouping, same shaded amount." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "d1", text: "2/8 + 3/8", target: "yes" },
            { id: "d2", text: "2/8 + 2/8", target: "no" },
            { id: "d3", text: "1/8 + 4/8", target: "yes" },
            { id: "d4", text: "3/8 + 3/8", target: "no" }
          ]}
          targets={[
            { id: "yes", label: "a valid split of 5/8" },
            { id: "no", label: "does not add to 5/8" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Iyad's split — 2 and 3", omml: M.twoPlusThree, h: 92,
                  quote: "I gave two eighths to one and three to the other." }}
          right={{ name: "Basil's split — 4 and 1", omml: M.fourPlusOne, h: 92,
                   quote: "I gave four eighths to one and one to the other." }}
          same={["Both add to 5/8", "Both use eighths", "Both use all five pieces"]}
          diff={["Iyad's split is more even", "Basil's gives one person most of it",
                 "There are other valid splits too"]} />;

      case 6:
        return <BoardScreen draw={drawBoard92} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "the parts must add back to the whole fraction" }]}
          hand={"break it into unit fractions \u00b7 group them however you like \u00b7 check they add back"}
          cards={[
            { title: "The splits we found", omml: M.many, note: "three ways, one amount" },
            { title: "Tap for a mixed number", omml: M.whole, revealOmml: M.mixed, reveal: true,
              note: "a whole is four quarters" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Which pair adds back to seven tenths?"
          omml={M.swyk}
          options={[{ v: "a", text: "3/10 + 3/10" }, { v: "b", text: "4/10 + 3/10" }, { v: "c", text: "5/10 + 3/10" }, { v: "d", text: "7/10 + 1/10" }]}
          right="b"
          support={{
            yes: "Yes — 4 tenths and 3 tenths make 7 tenths.",
            notYet: "Not yet — add your two parts and see what you get.",
            draw: drawSupport92, h: 84,
            hint: "The two top numbers must add to 7."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Take a fraction of something at home and split it two different ways for two people." />;

      default: return null;
    }
  }
};
