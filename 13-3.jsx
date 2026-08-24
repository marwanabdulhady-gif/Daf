/* ===========================================================================
   Grade 4 · Topic 13 · LESSON 13-3 · Equivalence with Customary Units of
   Weight
   Standard 4.MD.A.1   I can ... convert between ounces, pounds and tons, and
   pick a sensible unit for a real object.
   =========================================================================== */

const M = {
  poundOunce: om(mnor("1 pound = 16 ounces")),
  tonPound: om(mnor("1 ton = 2,000 pounds")),
  three: om(mt("3\u00d716=48")),
  choose: om(mnor("choose the unit that gives a comfortable number")),
  compare: om(mnor("40 ounces > 2 pounds")),
  bothWays: om(mnor("2 pounds = 32 ounces, and 40 > 32")),
  rule: om(mnor("convert both to the same unit before you compare")),
  hard: om(mnor("which is heavier: 3 lb 4 oz, or 50 oz?")),
  hard: om(mnor("which is heavier: 3 lb 4 oz, or 50 oz?")),
  swyk: om(mnor("5 pounds = ? ounces")),
  swykAnswer: om(mt("5\u00d716=80"))
};

/* the pound / ounce bar */
const makeBar133 = (pair) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const pairs = {
    p1: { n: 16, big: "pound", small: "ounce", copies: 1, numbered: true,
      note: "a bag of dates is about one pound" },
    p2: { n: 16, big: "pound", small: "ounce", copies: 2, numbered: false,
      note: "two bags of dates" },
    p3: { n: 16, big: "pound", small: "ounce", copies: 3, numbered: false,
      note: "three bags \u2014 the count grows by sixteen each time" }
  };
  const j = pairs[pair];
  D.txt(ctx, j.note, W / 2, 26, { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  D.unitBar(ctx, { x: 58, y: 62, w: W - 116, h: 36, n: j.n, big: j.big, small: j.small,
    copies: j.copies, numbered: j.numbered, prog: 1, bigCol: "#2D70B3", smallCol: "#FA7E19" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "pounds \u00d7 16 = ounces", W / 2, H - 14,
    { size: 13.5, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

/* choosing a sensible unit for real objects */
const makeChoose133 = (item) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const items = {
    date: { name: "one date", best: "ounce", vals: ["about 1 ounce", "0.06 pounds", "a tiny fraction of a ton"] },
    bag: { name: "a bag of rice", best: "pound", vals: ["160 ounces", "about 10 pounds", "0.005 tons"] },
    car: { name: "a car", best: "ton", vals: ["48,000 ounces", "3,000 pounds", "about 1.5 tons"] }
  };
  const j = items[item];
  D.txt(ctx, "which unit describes " + j.name + " comfortably?", W / 2, 30,
    { size: 14, col: "#C9A227", font: "marker" });
  const units = ["ounce", "pound", "ton"];
  units.forEach((u, k) => {
    const bw = (W - 100) / 3, bx = 50 + k * bw;
    const best = u === j.best;
    ctx.save();
    ctx.globalAlpha = best ? 1 : 0.42;
    D.rr(ctx, bx + 8, 62, bw - 16, 62, 9);
    ctx.strokeStyle = best ? "#34D399" : "rgba(234,244,242,.35)";
    ctx.lineWidth = best ? 2.4 : 1.3;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, u, bx + bw / 2, 84,
      { size: 15, col: best ? "#34D399" : "rgba(234,244,242,.55)", font: "marker" });
    D.txt(ctx, j.vals[k], bx + bw / 2, 108,
      { size: 11, col: best ? "#C9A227" : "rgba(234,244,242,.4)", font: "marker" });
  });
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, "the " + j.best + " gives a number you can actually picture",
    W / 2, H - 34, { size: 13.5, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
  D.txt(ctx, "all three are true \u2014 only one is useful", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawWarm133 = (ctx, W, H, frame) => {
  const CYCLE = 580, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two labels on the same bag", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "2 lb", W / 2 - 110, 96, { size: 34, col: "#6042A6", font: "marker",
    alpha: D.at(f, 60, 220) });
  D.txt(ctx, "32 oz", W / 2 + 110, 96, { size: 34, col: "#6042A6", font: "marker",
    alpha: D.at(f, 240, 400) });
  D.txt(ctx, "same bag, same weight", W / 2, 150,
    { size: 13, col: "rgba(234,244,242,.7)", font: "marker", alpha: D.at(f, 400, 500) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 460, 550) });
};

const drawStory133 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "dates for the school iftar", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.unitBar(ctx, { x: 58, y: 62, w: W - 116, h: 34, n: 16, big: "pound", small: "ounce",
    copies: 3, numbered: false, prog: D.at(f, 60, 360),
    bigCol: "#FA7E19", smallCol: "#2D70B3" });
  if (p3 > 0) {
    D.txt(ctx, "three pounds of dates. how many ounces is that?", W / 2, H - 14,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard133 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Ounces, pounds and tons" });
  const p1 = D.at(f, 20, 300), p3 = D.at(f, 460, 680), p4 = D.at(f, 700, 920);

  D.unitBar(ctx, { x: 130, y: 96, w: W - 260, h: 34, n: 16, big: "pound", small: "ounce",
    copies: 1, prog: p1, bigCol: "#2D70B3", smallCol: "#FA7E19" });

  if (p3 > 0) {
    D.table(ctx, { x: 200, y: 222, w: W - 400, rh: 26,
      head: ["pounds", "ounces"], rows: [["1", "16"], ["2", "32"], ["3", "48"]], prog: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "pounds \u00d7 16 = ounces \u00b7 tons \u00d7 2,000 = pounds", W / 2, 344,
      { size: 19, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "to compare two weights, put them both in the same unit first",
      W / 2, H - 26, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 780, 900) });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 840, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport133 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.unitBar(ctx, { x: 26, y: 12, w: W - 52, h: 22, n: 16, big: "pound", small: "ounce",
    copies: 5, numbered: false, prog: 1, bigCol: "#2D70B3", smallCol: "#FA7E19",
    split: 12, label: false });
  D.txt(ctx, "five pounds, each holding sixteen ounces", W / 2, H - 8,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "13-3",
  storageKey: "daf-g4-t13-l3",
  title: "Equivalence with Customary Units of Weight",
  unit: "GRADE 4 · TOPIC 13 · LESSON 13-3 · 4.MD.A.1",
  math: M,
  ixl: ["TVC", "SVP", "MKS"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "One bag of dates carries two different labels. No question yet.",
      goal: "Notice that one weight can be written two ways.",
      pull: "Nobody added anything to the bag.",
      rail: { launch: "Read both labels. Do not decide which is bigger yet.",
        monitor: ["Reading 2 lb", "Reading 32 oz", "Saying they must be equal"],
        connect: "Which number is bigger? Which weight is bigger?",
        misconception: "Believing 32 oz is heavier than 2 lb." } },

    { phase: "launch", title: "Dates for the <em>iftar</em>",
      lead: "The school buys 3 pounds of dates. Estimate how many ounces that is.",
      goal: "Create the need for the pound-to-ounce factor.",
      pull: "Now let us count the ounces.",
      rail: { launch: "Commit to a number of ounces before you calculate.",
        monitor: ["Estimating around fifty", "Estimating three", "Reasoning sixteen per pound"],
        connect: "Will the number of ounces be more or fewer than three?",
        misconception: "Answering 19 by adding 3 and 16." } },

    { phase: "monitor", title: "Sixteen ounces in a <em>pound</em>",
      lead: "Fill one pound with ounces, then two, then three.",
      goal: "The factor is counted, then reused.",
      pull: "But which unit should you actually use?",
      rail: { launch: "Predict the count for two pounds before you tap.",
        monitor: ["Counting the ounces", "Adding sixteen each time", "Multiplying"],
        connect: "How would you find the ounces in ten pounds?",
        misconception: "Adding one for each extra pound instead of sixteen." } },

    { phase: "monitor", title: "Which unit is <em>useful</em>?",
      lead: "All three units can describe any object. Only one gives a comfortable number.",
      goal: "Unit choice is a judgement, not a rule.",
      pull: "Now judge some conversions.",
      rail: { launch: "Say your choice out loud before you tap.",
        monitor: ["Choosing by size of object", "Choosing by size of number", "Choosing at random"],
        connect: "Why not measure a car in ounces?",
        misconception: "Believing only one unit is technically correct." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each statement. No grading until the class commits.",
      goal: "Practise converting before comparing.",
      pull: "Two students compared the same pair differently.",
      rail: { launch: "For each one ask: are both weights in the same unit?",
        monitor: ["Converting before comparing", "Comparing the raw numbers", "Checking the factor"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Comparing 40 ounces with 2 pounds by comparing 40 with 2." } },

    { phase: "connect", title: "Two ways to <em>compare</em>",
      lead: "Omar turned both into ounces. Reem turned both into pounds.",
      goal: "Either common unit works, as long as both are converted.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one avoids fractions.",
        monitor: ["Converting up", "Converting down", "Checking the verdict matches"],
        connect: "Which conversion gave whole numbers?",
        misconception: "Converting only one of the two quantities." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Sixteen ounces make a pound. Two thousand pounds make a ton.",
      goal: "The moment the weight ladder is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build the bar, then the table, then the rule.",
        monitor: ["Predicting the table", "Naming the factor", "Restating the comparison rule"],
        connect: "Who can say why we convert before comparing?",
        misconception: "Memorising 16 and 2,000 without the direction." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that makes every weight comparison safe.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Choosing a common unit", "Converting both", "Comparing"],
        connect: "Which common unit would you pick, and why?",
        misconception: "Comparing numbers that carry different units." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on pound-to-ounce conversion.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. How many ounces in one pound?",
        monitor: ["Multiplying by sixteen", "Adding sixteen", "Sketching the bar"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 21 by adding 5 and 16." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: the metric system, where every factor is a ten.",
      rail: { launch: "Three students name a sensible unit for an object.",
        monitor: ["Converts and compares", "Still compares raw numbers", "Ready for metric"],
        connect: "Who is reading a weight label at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [pair, setPair] = useState("p1");
    const [item, setItem] = useState("date");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm133} height={256} award={award}
          notices={["One label says 2 lb", "The other says 32 oz", "It is the same bag", "32 is bigger than 2"]}
          wonders={["Are they the same weight?", "How many ounces in a pound?", "Which label would I use?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory133} height={256} award={award}
          label="How many ounces of dates?" min={3} max={80} start={30} unit="oz"
          after="Locked. Now let us count the ounces properly."
          note="An ounce is much smaller than a pound, so expect a bigger number." />;

      case 2:
        return <ExploreChips draw={makeBar133(pair)} height={256}
          label="Fill the pounds with ounces" value={pair}
          onPick={(v) => setPair(v)}
          chips={[{ v: "p1", label: "1 pound" }, { v: "p2", label: "2 pounds" }, { v: "p3", label: "3 pounds" }]}
          caption={<MathEl omml={M.three} size="xl" display="block" />}
          footnote="Every extra pound adds another sixteen ounces." />;

      case 3:
        return <ExploreChips draw={makeChoose133(item)} height={256}
          label="Pick a sensible unit" value={item}
          onPick={(v) => setItem(v)}
          chips={[{ v: "date", label: "one date" }, { v: "bag", label: "a bag of rice" }, { v: "car", label: "a car" }]}
          caption={<MathEl omml={M.choose} size="lg" display="block" />}
          footnote="All three units are correct — only one of them is helpful." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "3 lb = 48 oz", target: "yes" },
                  { id: "c2", text: "3 lb = 19 oz", target: "no" },
                  { id: "c3", text: "40 oz > 2 lb", target: "yes" },
                  { id: "c4", text: "2 lb > 40 oz", target: "no" }]}
          targets={[{ id: "yes", label: "correct — same unit, then compare" },
                    { id: "no", label: "not yet — units were mixed" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Omar's way — everything in ounces", omml: M.bothWays, h: 92,
            quote: "Two pounds is 32 ounces, and 40 beats 32." }}
          right={{ name: "Reem's way — everything in pounds", omml: M.compare, h: 92,
            quote: "Forty ounces is two and a half pounds, which beats two." }}
          same={["Both say 40 oz is heavier", "Both convert one of the weights", "Both use 16 oz per pound"]}
          diff={["Omar converts up", "Reem converts down", "Omar's stays in whole numbers"]} />;

      case 6:
        return <BoardScreen draw={drawBoard133} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "convert both to the same unit before you compare" }]}
          hand={"same unit first · then compare · pick the unit that avoids fractions"}
          cards={[{ title: "The factor we counted", omml: M.poundOunce, note: "sixteen ounces in a pound" },
                  { title: "Tap for the biggest unit", omml: M.choose, revealOmml: M.tonPound, reveal: true,
                    note: "tons are for lorries, not lunchboxes" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          hard={{ prompt: "Which is heavier \u2014 a bag of dates marked 3 lb 4 oz, or one marked 50 oz?", omml: M.hard,
                  answer: "3 lb 4 oz",
                  hint: "3 pounds is 48 ounces, plus 4 makes 52 \u2014 and 52 beats 50." }}
          hard={{ prompt: "The harder one \u2014 two steps.", omml: M.hard,
                  answer: "3 lb 4 oz",
                  hint: "3 pounds is 48 ounces, plus 4 makes 52 \u2014 and 52 beats 50." }}
          prompt="A sack of flour weighs 5 pounds. How many ounces is that?" omml={M.swyk}
          options={[{ v: "a", text: "21 oz" }, { v: "b", text: "80 oz" }, { v: "c", text: "5 oz" }, { v: "d", text: "16 oz" }]}
          right="b"
          support={{ yes: "Yes — five pounds, each holding sixteen ounces.",
            notYet: "Not yet — each pound contributes sixteen ounces, so multiply.",
            draw: drawSupport133, h: 100, hint: "5 × 16 = 80." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find two food packets at home and put their weights into the same unit to compare them." />;

      default: return null;
    }
  }
};
