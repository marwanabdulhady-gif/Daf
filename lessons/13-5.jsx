/* ===========================================================================
   Grade 4 · Topic 13 · LESSON 13-5 · Equivalence with Metric Units of
   Capacity and Mass
   Standard 4.MD.A.1   I can ... convert between millilitres and litres, and
   between grams and kilograms.
   =========================================================================== */

const M = {
  litre: om(mnor("1 L = 1,000 mL")),
  kilo: om(mnor("1 kg = 1,000 g")),
  same: om(mnor("both use the same factor \u2014 a thousand")),
  three: om(mt("3\u00d71,000=3,000")),
  half: om(mnor("half a litre = 500 mL")),
  choose: om(mnor("pick the unit that keeps the number readable")),
  rule: om(mnor("kilo means a thousand \u00b7 milli means a thousandth")),
  hard: om(mnor("1 L 500 mL + 750 mL + 2 L = ? mL")),
  hard: om(mnor("1 L 500 mL + 750 mL + 2 L = ? mL")),
  swyk: om(mnor("4 kg = ? g")),
  swykAnswer: om(mt("4\u00d71,000=4,000"))
};

/* the litre bottle filling from millilitre cups */
const makeFill135 = (mode) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const modes = {
    l: { n: 10, big: "L", small: "100 mL", copies: 1,
      note: "one litre bottle, filled by ten hundred-millilitre cups" },
    l3: { n: 10, big: "L", small: "100 mL", copies: 3,
      note: "three litre bottles" },
    kg: { n: 10, big: "kg", small: "100 g", copies: 1,
      note: "one kilogram, made of ten hundred-gram weights" },
    kg2: { n: 10, big: "kg", small: "100 g", copies: 2,
      note: "two kilograms" }
  };
  const j = modes[mode];
  D.txt(ctx, j.note, W / 2, 26, { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  D.unitBar(ctx, { x: 58, y: 62, w: W - 116, h: 36, n: j.n, big: j.big, small: j.small,
    copies: j.copies, numbered: false, prog: 1,
    bigCol: mode.charAt(0) === "l" ? "#2D70B3" : "#6042A6", smallCol: "#FA7E19",
    label: false });
  const total = j.n * j.copies * 100;
  D.txt(ctx, j.copies + " " + j.big + " = " + total.toLocaleString("en-US") + " " +
        (mode.charAt(0) === "l" ? "mL" : "g"),
    W / 2, H - 40, { size: 17, col: "#C9A227", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "a thousand small units in every big one, capacity or mass",
    W / 2, H - 14, { size: 12.5, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

/* choosing a sensible metric unit */
const makeChoose135 = (item) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const items = {
    spoon: { name: "a spoon of medicine", best: "mL", vals: ["5 mL", "0.005 L"], units: ["mL", "L"] },
    bottle: { name: "a bottle of water", best: "L", vals: ["1,500 mL", "1.5 L"], units: ["mL", "L"] },
    date: { name: "one date", best: "g", vals: ["8 g", "0.008 kg"], units: ["g", "kg"] },
    boy: { name: "a Grade 4 student", best: "kg", vals: ["32,000 g", "32 kg"], units: ["g", "kg"] }
  };
  const j = items[item];
  D.txt(ctx, "which unit describes " + j.name + " comfortably?", W / 2, 32,
    { size: 14, col: "#C9A227", font: "marker" });
  j.units.forEach((u, k) => {
    const bw = (W - 120) / 2, bx = 60 + k * bw;
    const best = u === j.best;
    ctx.save();
    ctx.globalAlpha = best ? 1 : 0.42;
    D.rr(ctx, bx + 14, 66, bw - 28, 66, 10);
    ctx.strokeStyle = best ? "#34D399" : "rgba(234,244,242,.35)";
    ctx.lineWidth = best ? 2.4 : 1.3;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, j.vals[k], bx + bw / 2, 92,
      { size: 21, col: best ? "#34D399" : "rgba(234,244,242,.5)", font: "marker" });
    D.txt(ctx, "in " + u, bx + bw / 2, 118,
      { size: 11.5, col: best ? "#C9A227" : "rgba(234,244,242,.4)", font: "marker" });
  });
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, "both are exactly the same amount", W / 2, H - 34,
    { size: 13.5, col: "rgba(234,244,242,.7)", font: "marker" });
  D.txt(ctx, "the " + j.best + " version is the one you would actually say out loud",
    W / 2, H - 12, { size: 13, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

const drawWarm135 = (ctx, W, H, frame) => {
  const CYCLE = 580, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two labels from the supermarket", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "1.5 L", W / 2 - 110, 100, { size: 34, col: "#6042A6", font: "marker",
    alpha: D.at(f, 60, 220) });
  D.txt(ctx, "1,500 mL", W / 2 + 110, 100, { size: 34, col: "#6042A6", font: "marker",
    alpha: D.at(f, 240, 400) });
  D.txt(ctx, "printed on the same bottle", W / 2, 152,
    { size: 13, col: "rgba(234,244,242,.7)", font: "marker", alpha: D.at(f, 400, 500) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 460, 550) });
};

const drawStory135 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "juice for the Grade 4 sports day", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.unitBar(ctx, { x: 58, y: 62, w: W - 116, h: 34, n: 10, big: "L", small: "100 mL",
    copies: 3, numbered: false, prog: D.at(f, 60, 360),
    bigCol: "#FA7E19", smallCol: "#2D70B3", label: false });
  if (p3 > 0) {
    D.txt(ctx, "three litres of juice. how many millilitres is that?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard135 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Kilo means a thousand" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 260, 480), p3 = D.at(f, 500, 720), p4 = D.at(f, 740, 940);

  D.unitBar(ctx, { x: 130, y: 92, w: W - 260, h: 30, n: 10, big: "L", small: "100 mL",
    copies: 1, numbered: false, prog: p1, bigCol: "#2D70B3", smallCol: "#FA7E19", label: false });
  D.txt(ctx, "1 L = 1,000 mL", W / 2, 188, { size: 18, col: "#2D70B3", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.unitBar(ctx, { x: 130, y: 214, w: W - 260, h: 30, n: 10, big: "kg", small: "100 g",
      copies: 1, numbered: false, prog: p2, bigCol: "#6042A6", smallCol: "#FA7E19", label: false });
    D.txt(ctx, "1 kg = 1,000 g", W / 2, 310, { size: 18, col: "#6042A6", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "the same factor twice \u2014 capacity and mass behave identically",
      W / 2, 344, { size: 15, col: "#EAF4F2", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "kilo = a thousand of them \u00b7 milli = a thousandth of one",
      W / 2, H - 26, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport135 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.table(ctx, { x: 30, y: 8, w: W - 60, rh: 24,
    head: ["kilograms", "grams"], rows: [["1", "1,000"], ["4", "4,000"]], prog: 1 });
};

const LESSON = {
  code: "13-5",
  storageKey: "daf-g4-t13-l5",
  title: "Equivalence with Metric Units of Capacity and Mass",
  unit: "GRADE 4 · TOPIC 13 · LESSON 13-5 · 4.MD.A.1",
  math: M,
  ixl: ["ZXS", "UJW", "4W9", "WZY"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "The same bottle carries two labels. No question yet.",
      goal: "Notice that one amount has two readable names.",
      pull: "One of these numbers is a thousand times the other.",
      rail: { launch: "Read both labels. Do not decide which is bigger yet.",
        monitor: ["Reading 1.5 L", "Reading 1,500 mL", "Saying they must be equal"],
        connect: "Which number is bigger? Which amount is bigger?",
        misconception: "Believing 1,500 mL is more juice than 1.5 L." } },

    { phase: "launch", title: "Juice for <em>sports day</em>",
      lead: "Three litres of juice are bought for sports day. Estimate the amount in millilitres.",
      goal: "Create the need for the litre-to-millilitre factor.",
      pull: "Now let us fill the bottle.",
      rail: { launch: "Commit to a number of millilitres before you calculate.",
        monitor: ["Estimating three thousand", "Estimating thirty", "Reasoning a thousand per litre"],
        connect: "How many millilitres in one litre?",
        misconception: "Answering 300 by using a hundred instead of a thousand." } },

    { phase: "monitor", title: "Fill the <em>litre</em>",
      lead: "Ten hundred-millilitre cups fill one litre bottle. The same picture works for a kilogram.",
      goal: "One factor covers both capacity and mass.",
      pull: "But which unit should you actually use?",
      rail: { launch: "Predict the total millilitres before you tap.",
        monitor: ["Counting ten hundreds", "Naming a thousand", "Transferring it to mass"],
        connect: "What changed when we switched to kilograms?",
        misconception: "Expecting mass to use a different factor from capacity." } },

    { phase: "monitor", title: "Which unit is <em>readable</em>?",
      lead: "Both versions are exactly the same amount. Only one is worth saying out loud.",
      goal: "Unit choice is a judgement about readability.",
      pull: "Now judge some conversions.",
      rail: { launch: "Say your choice before you tap.",
        monitor: ["Choosing by size", "Choosing by number of digits", "Choosing at random"],
        connect: "Why do we not weigh students in grams?",
        misconception: "Believing only one version is correct." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each conversion. No grading until the class commits.",
      goal: "Catch the wrong-factor error under scrutiny.",
      pull: "Two students converted the same amount differently.",
      rail: { launch: "For each one ask: is the factor a thousand?",
        monitor: ["Naming the factor", "Counting zeros", "Checking the direction"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Using a hundred for a litre-to-millilitre conversion." } },

    { phase: "connect", title: "Two ways to <em>say it</em>",
      lead: "Layla wrote 2,500 g. Faisal wrote 2 kg 500 g. Both weighed the same rice.",
      goal: "Mixed units and single units both work.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which is easier to add to another weight.",
        monitor: ["Using one unit", "Using mixed units", "Converting between the two"],
        connect: "Which form would a shop label use?",
        misconception: "Reading 2 kg 500 g as 2,050 g." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "A thousand millilitres in a litre. A thousand grams in a kilogram. Same factor.",
      goal: "The moment the metric prefix idea is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build both bars with them, one under the other.",
        monitor: ["Predicting the second bar", "Naming the factor", "Restating the prefix rule"],
        connect: "What does 'kilo' actually mean?",
        misconception: "Treating each metric unit as an unrelated fact." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Two prefixes, and the whole system falls into place.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Naming the prefix", "Choosing the factor", "Checking the direction"],
        connect: "What would a kilometre be, using the same prefix?",
        misconception: "Learning kilo and milli as separate unconnected words." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on kilogram-to-gram conversion.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. How many grams in one kilogram?",
        monitor: ["Multiplying by a thousand", "Multiplying by a hundred", "Using the table"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 400 by using a hundred." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: perimeter and area problems.",
      rail: { launch: "Three students say what kilo and milli mean.",
        monitor: ["Knows both prefixes", "Still guesses the factor", "Ready for perimeter"],
        connect: "Who is reading a bottle label at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [mode, setMode] = useState("l");
    const [item, setItem] = useState("spoon");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm135} height={256} award={award}
          notices={["One label says 1.5 L", "The other says 1,500 mL", "It is the same bottle", "1,500 is a thousand times 1.5"]}
          wonders={["Are they the same amount?", "How many mL in a litre?", "Which label would I use?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory135} height={256} award={award}
          label="How many millilitres of juice?" min={30} max={5000} start={1500} unit="mL"
          after="Locked. Now let us fill one litre and count."
          note="A small water bottle is about 500 mL, so a litre is two of them." />;

      case 2:
        return <ExploreChips draw={makeFill135(mode)} height={256}
          label="Fill the big unit" value={mode}
          onPick={(v) => setMode(v)}
          chips={[{ v: "l", label: "1 litre" }, { v: "l3", label: "3 litres" },
                  { v: "kg", label: "1 kilogram" }, { v: "kg2", label: "2 kilograms" }]}
          caption={<MathEl omml={M.same} size="xl" display="block" />}
          footnote="Ten hundreds make a thousand, whether you are pouring or weighing." />;

      case 3:
        return <ExploreChips draw={makeChoose135(item)} height={256}
          label="Pick the readable unit" value={item}
          onPick={(v) => setItem(v)}
          chips={[{ v: "spoon", label: "a spoon of medicine" }, { v: "bottle", label: "a water bottle" },
                  { v: "date", label: "one date" }, { v: "boy", label: "a Grade 4 student" }]}
          caption={<MathEl omml={M.choose} size="lg" display="block" />}
          footnote="Both versions are equally true — one of them is just easier to say." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "2 L = 2,000 mL", target: "yes" },
                  { id: "c2", text: "2 L = 200 mL", target: "no" },
                  { id: "c3", text: "3 kg = 3,000 g", target: "yes" },
                  { id: "c4", text: "3 kg = 300 g", target: "no" }]}
          targets={[{ id: "yes", label: "correct — a thousand each time" },
                    { id: "no", label: "not yet — count the zeros" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Layla's way — one unit", omml: M.kilo, h: 92,
            quote: "I wrote the whole thing in grams: 2,500 g." }}
          right={{ name: "Faisal's way — mixed units", omml: M.half, h: 92,
            quote: "Two kilograms and five hundred grams. That is how the label reads." }}
          same={["Both describe the same rice", "Both use 1,000 g per kg", "Both are correct"]}
          diff={["Layla uses one unit", "Faisal uses two", "Layla's is easier to add"]} />;

      case 6:
        return <BoardScreen draw={drawBoard135} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "kilo means a thousand, milli means a thousandth" }]}
          hand={"kilo → multiply by a thousand · milli → a thousand of them make one"}
          cards={[{ title: "Capacity", omml: M.litre, note: "a thousand millilitres in a litre" },
                  { title: "Tap for mass", omml: M.same, revealOmml: M.kilo, reveal: true,
                    note: "a thousand grams in a kilogram" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          hard={{ prompt: "Three bottles hold 1 L 500 mL, 750 mL and 2 L. How many millilitres altogether?", omml: M.hard,
                  answer: "4,250 mL",
                  hint: "Put every amount into millilitres first: 1,500 + 750 + 2,000." }}
          hard={{ prompt: "The harder one \u2014 two steps.", omml: M.hard,
                  answer: "4,250 mL",
                  hint: "Put every amount into millilitres first: 1,500 + 750 + 2,000." }}
          prompt="A bag of rice weighs 4 kilograms. How many grams is that?" omml={M.swyk}
          options={[{ v: "a", text: "400 g" }, { v: "b", text: "40 g" }, { v: "c", text: "4,000 g" }, { v: "d", text: "1,004 g" }]}
          right="c"
          support={{ yes: "Yes — a thousand grams in every kilogram, four times over.",
            notYet: "Not yet — kilo means a thousand, not a hundred.",
            draw: drawSupport135, h: 96, hint: "4 × 1,000 = 4,000, so three zeros arrive." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a bottle and a food packet at home and rewrite each label in the other unit." />;

      default: return null;
    }
  }
};
