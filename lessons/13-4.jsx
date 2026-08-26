/* ===========================================================================
   Grade 4 · Topic 13 · LESSON 13-4 · Equivalence with Metric Units of Length
   Standard 4.MD.A.1   I can ... convert between millimetres, centimetres,
   metres and kilometres, where every factor is a power of ten.
   =========================================================================== */

const M = {
  cmMm: om(mnor("1 cm = 10 mm")),
  mCm: om(mnor("1 m = 100 cm")),
  kmM: om(mnor("1 km = 1,000 m")),
  chain: om(mnor("mm \u2192 cm \u2192 m \u2192 km \u00b7 each step is ten, ten, then a thousand")),
  place: om(mnor("multiplying by ten shifts every digit one place")),
  four: om(mt("4\u00d7100=400")),
  rule: om(mnor("metric factors are always tens \u00b7 so it is place value, not arithmetic")),
  hard: om(mnor("2 km 350 m = ? metres")),
  hard: om(mnor("2 km 350 m = ? metres")),
  swyk: om(mnor("7 m = ? cm")),
  swykAnswer: om(mt("7\u00d7100=700"))
};

/* the metric bar, one step at a time */
const makeBar134 = (pair) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const pairs = {
    cm: { n: 10, big: "cm", small: "mm", copies: 1, numbered: true,
      note: "a centimetre on your ruler, cut into millimetres" },
    m: { n: 100, big: "m", small: "cm", copies: 1, numbered: false,
      note: "a metre stick, cut into centimetres" },
    m4: { n: 100, big: "m", small: "cm", copies: 4, numbered: false,
      note: "four metre sticks laid end to end" }
  };
  const j = pairs[pair];
  D.txt(ctx, j.note, W / 2, 26, { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  D.unitBar(ctx, { x: 58, y: 62, w: W - 116, h: 36, n: j.n, big: j.big, small: j.small,
    copies: j.copies, numbered: j.numbered, prog: 1, bigCol: "#2D70B3", smallCol: "#FA7E19" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "every metric factor is a ten, a hundred or a thousand",
    W / 2, H - 14, { size: 13, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

/* the place-value shift that a metric conversion really is */
const makeShift134 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2;
  const rows = [
    { s: "4 m", note: "start in metres", col: "#EAF4F2" },
    { s: "4 \u00d7 100", note: "a hundred centimetres in every metre", col: "#2D70B3" },
    { s: "400 cm", note: "two zeros arrived \u2014 the digits shifted two places", col: "#34D399" }
  ];
  for (let r = 0; r <= step && r < rows.length; r++) {
    const fresh = r === step;
    D.txt(ctx, rows[r].s, cx, 56 + r * 52,
      { size: 30, col: rows[r].col, font: "marker",
        alpha: fresh ? 0.72 + Math.sin(frame / 14) * 0.24 : 1 });
    if (fresh) {
      D.txt(ctx, rows[r].note, cx, 82 + r * 52,
        { size: 11.5, col: "rgba(234,244,242,.62)", font: "marker" });
    }
  }
  if (step >= 2) {
    D.table(ctx, { x: 120, y: H - 84, w: W - 240, rh: 24,
      head: ["metres", "centimetres"], rows: [["1", "100"], ["4", "400"]], prog: 1 });
  } else {
    D.txt(ctx, "watch what happens to the digits", W / 2, H - 14,
      { size: 12.5, col: "#C9A227", font: "marker" });
  }
};

const drawWarm134 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "four metric facts", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  const facts = ["1 cm = 10 mm", "1 m = 100 cm", "1 km = 1,000 m", "1 m = 1,000 mm"];
  facts.forEach((s, k) => {
    const a = D.at(f, 50 + k * 90, 160 + k * 90);
    D.txt(ctx, s, W / 2, 70 + k * 38, { size: 19, col: "#6042A6", font: "marker", alpha: a });
  });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 480, 570) });
};

const drawStory134 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the long jump pit on the school field", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.unitBar(ctx, { x: 58, y: 62, w: W - 116, h: 34, n: 100, big: "m", small: "cm",
    copies: 4, numbered: false, prog: D.at(f, 60, 360),
    bigCol: "#FA7E19", smallCol: "#2D70B3" });
  if (p3 > 0) {
    D.txt(ctx, "the pit is 4 metres long. how many centimetres is that?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard134 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Metric conversions are place value" });
  const p1 = D.at(f, 20, 260), p2 = D.at(f, 280, 480), p3 = D.at(f, 500, 720), p4 = D.at(f, 740, 940);

  D.unitBar(ctx, { x: 130, y: 92, w: W - 260, h: 32, n: 10, big: "cm", small: "mm",
    copies: 1, prog: p1, bigCol: "#2D70B3", smallCol: "#FA7E19" });

  if (p2 > 0) {
    D.table(ctx, { x: 180, y: 212, w: W - 360, rh: 25,
      head: ["km", "m", "cm", "mm"],
      rows: [["1", "1,000", "100,000", "1,000,000"], [null, "1", "100", "1,000"], [null, null, "1", "10"]],
      prog: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "every step to the right multiplies by ten", W / 2, 322,
      { size: 16, col: "#EAF4F2", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "4 m = 400 cm \u2014 the digits shifted, nothing was calculated",
      W / 2, 356, { size: 18, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "this is the same base ten you learned in Topic 1",
      W / 2, H - 24, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 830, 940) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport134 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.table(ctx, { x: 30, y: 8, w: W - 60, rh: 24,
    head: ["metres", "centimetres"], rows: [["1", "100"], ["7", "700"]], prog: 1 });
};

const LESSON = {
  code: "13-4",
  storageKey: "daf-g4-t13-l4",
  title: "Equivalence with Metric Units of Length",
  unit: "GRADE 4 · TOPIC 13 · LESSON 13-4 · 4.MD.A.1",
  math: M,
  ixl: ["Z5S", "NWG", "STH"],

  metas: [
    { phase: "warmup", title: "Which one <em>doesn't belong</em>?",
      lead: "Four metric facts. Every one of them has a defensible reason.",
      goal: "Spot that the factors are all powers of ten before the rule is stated.",
      pull: "Every factor here is made only of ones and zeros.",
      rail: { launch: "Pick a fact and say why. No single intended answer.",
        monitor: ["Arguing from the factor", "Arguing from the units", "Spotting the thousands"],
        connect: "What do all four factors have in common?",
        misconception: "Expecting metric factors like 12 or 16." } },

    { phase: "launch", title: "The long jump <em>pit</em>",
      lead: "The pit is 4 metres long. Estimate its length in centimetres.",
      goal: "Create the need for the metre-to-centimetre factor.",
      pull: "Now let us count them.",
      rail: { launch: "Commit to a number of centimetres before you calculate.",
        monitor: ["Estimating four hundred", "Estimating forty", "Reasoning a hundred per metre"],
        connect: "How many centimetres are on a metre stick?",
        misconception: "Answering 40 by using ten instead of a hundred." } },

    { phase: "monitor", title: "Cut the <em>metric</em> unit",
      lead: "Cut a centimetre into millimetres, then a metre into centimetres.",
      goal: "Count each factor once so it is owned, not memorised.",
      pull: "Now watch what happens to the digits.",
      rail: { launch: "Predict how many will fit before you tap.",
        monitor: ["Counting ten millimetres", "Naming a hundred centimetres", "Handling four metres"],
        connect: "How many millimetres in a whole metre?",
        misconception: "Using ten for every metric step." } },

    { phase: "monitor", title: "It is <em>place value</em>",
      lead: "Multiplying by a hundred does not need a calculation — the digits shift.",
      goal: "Connect metric conversion back to Topic 1 place value.",
      pull: "Now judge some conversions.",
      rail: { launch: "Predict how many zeros will appear.",
        monitor: ["Shifting digits", "Doing long multiplication", "Counting zeros"],
        connect: "Why does multiplying by a hundred add two zeros?",
        misconception: "Adding two zeros to the wrong end." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each conversion. No grading until the class commits.",
      goal: "Catch the wrong-power-of-ten error.",
      pull: "Two students converted the same length differently.",
      rail: { launch: "For each one ask: which factor does this pair of units use?",
        monitor: ["Naming the factor", "Counting zeros", "Checking the direction"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Using 1,000 where 100 belongs." } },

    { phase: "connect", title: "Two ways to reach <em>millimetres</em>",
      lead: "Bashir went metres to centimetres to millimetres. Ibrahim multiplied by a thousand.",
      goal: "A chain of tens and one big power of ten agree.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask where the thousand came from.",
        monitor: ["Stepping twice", "Using 1,000 directly", "Counting the zeros"],
        connect: "Why is 100 × 10 the same as 1,000?",
        misconception: "Adding 100 and 10 to get the factor." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Ten, a hundred, a thousand. Every metric step is a shift of the digits.",
      goal: "The moment the metric rule is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build the bar, then the table, then the rule.",
        monitor: ["Predicting the table", "Naming the factor", "Restating the shift"],
        connect: "Who can say why metric is easier than customary?",
        misconception: "Learning metric as a new set of arbitrary facts." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that makes the whole metric system one idea.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Naming the power of ten", "Shifting the digits", "Checking the answer is bigger"],
        connect: "Which pair of units uses a thousand?",
        misconception: "Applying the same power of ten to every pair." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on metre-to-centimetre conversion.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. How many centimetres in one metre?",
        monitor: ["Multiplying by a hundred", "Multiplying by ten", "Using the table"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 70 by using ten instead of a hundred." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: metric capacity and mass, with the very same tens.",
      rail: { launch: "Three students name a metric factor.",
        monitor: ["Knows the powers of ten", "Still guesses the factor", "Ready for mass"],
        connect: "Who is measuring something in centimetres tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [pair, setPair] = useState("cm");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Pick a card. Every one of them has a defensible reason."
          cards={[
            { id: "a1", text: "1 cm = 10 mm", why: "The only factor that is a single ten." },
            { id: "a2", text: "1 m = 100 cm", why: "The only one whose factor is a hundred." },
            { id: "a3", text: "1 km = 1,000 m", why: "The only one about kilometres." },
            { id: "a4", text: "1 m = 1,000 mm", why: "The only one that skips a whole unit." }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawStory134} height={256} award={award}
          label="How many centimetres long is the pit?" min={40} max={800} start={200} unit="cm"
          after="Locked. Now let us count the centimetres."
          note="A metre stick has a hundred centimetre marks on it." />;

      case 2:
        return <ExploreChips draw={makeBar134(pair)} height={256}
          label="Cut the metric unit" value={pair}
          onPick={(v) => setPair(v)}
          chips={[{ v: "cm", label: "cm → mm" }, { v: "m", label: "m → cm" }, { v: "m4", label: "4 m → cm" }]}
          caption={<MathEl omml={M.mCm} size="xl" display="block" />}
          footnote="Metric factors are only ever tens, hundreds and thousands." />;

      case 3:
        return <ExploreChips draw={makeShift134(step)} height={256}
          label="Watch the digits shift" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "4 metres" }, { v: 1, label: "× 100" }, { v: 2, label: "400 cm" }]}
          caption={<MathEl omml={M.place} size="lg" display="block" />}
          footnote="This is the same base ten you met in Topic 1." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "3 m = 300 cm", target: "yes" },
                  { id: "b2", text: "3 m = 30 cm", target: "no" },
                  { id: "b3", text: "2 km = 2,000 m", target: "yes" },
                  { id: "b4", text: "2 km = 200 m", target: "no" }]}
          targets={[{ id: "yes", label: "correct — the right power of ten" },
                    { id: "no", label: "not yet — count the zeros" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Bashir's way — two steps", omml: M.chain, h: 92,
            quote: "Metres to centimetres, then centimetres to millimetres." }}
          right={{ name: "Ibrahim's way — one jump", omml: M.kmM, h: 92,
            quote: "A metre is a thousand millimetres, so I multiplied once." }}
          same={["Both give the same answer", "Both use powers of ten", "Both make the number bigger"]}
          diff={["Bashir steps twice", "Ibrahim jumps once", "Bashir's shows where the thousand comes from"]} />;

      case 6:
        return <BoardScreen draw={drawBoard134} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "metric factors are always tens, so it is place value not arithmetic" }]}
          hand={"which pair of units? · which power of ten? · shift the digits"}
          cards={[{ title: "The conversion we counted", omml: M.mCm, note: "a hundred centimetres in a metre" },
                  { title: "Tap for the biggest step", omml: M.cmMm, revealOmml: M.kmM, reveal: true,
                    note: "a thousand metres in a kilometre" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          hard={{ prompt: "The Corniche walking path is 2 km 350 m long. How many metres is that?", omml: M.hard,
                  answer: "2,350 m",
                  hint: "2 km is 2,000 m, then add the 350." }}
          hard={{ prompt: "The harder one \u2014 two steps.", omml: M.hard,
                  answer: "2,350 m",
                  hint: "2 km is 2,000 m, then add the 350." }}
          prompt="The classroom wall is 7 metres long. How many centimetres is that?" omml={M.swyk}
          options={[{ v: "a", text: "70 cm" }, { v: "b", text: "700 cm" }, { v: "c", text: "7,000 cm" }, { v: "d", text: "107 cm" }]}
          right="b"
          support={{ yes: "Yes — a hundred centimetres in every metre, seven times over.",
            notYet: "Not yet — a metre holds a hundred centimetres, not ten.",
            draw: drawSupport134, h: 96, hint: "Multiplying by a hundred adds two zeros: 7 becomes 700." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Measure a room at home in metres, then write the same length in centimetres." />;

      default: return null;
    }
  }
};
