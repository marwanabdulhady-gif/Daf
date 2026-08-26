/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-4 · Use Area Models and Partial Products to Multiply
   Standard 4.NBT.B.5   I can ... draw an area model for a 2-digit or 3-digit
   number times a 1-digit number, and add the partial products.
   =========================================================================== */

const M = {
  problem: om(mt("6\u00d7134")),
  answer: om(mt("6\u00d7134=804")),
  parts: om(mt("600 + 180 + 24")),
  estimate: om(mt("6×130=780")),
  decompose: om(mt("134"), mnor(" = "), mt("100 + 30 + 4")),
  rule: om(mnor("one region for each place · multiply · add them all")),
  swyk: om(mt("4\u00d7213")),
  swykAnswer: om(mt("800 + 40 + 12 = 852"))
};

const COLS = [{ v: 100 }, { v: 30 }, { v: 4 }];

const makeArea = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel(ctx, {
    x: 62, y: 76, w: W - 110, h: 96, rowV: 6,
    cols: COLS.slice(0, n), prog: 1, showSum: n === COLS.length
  });
  D.txt(ctx, n === COLS.length ? "every piece counted" : "keep going — one piece is still missing",
    W / 2, H - 16, { size: 13, col: n === COLS.length ? "#34D399" : "#C9A227", font: "marker" });
};

const makeLadder = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const palette = ["#2D70B3", "#FA7E19", "#6042A6", "#388C46"];
  let sum = 0;
  COLS.forEach((c, n) => {
    const a = n < shown ? 1 : 0.18;
    const p = 6 * c.v;
    if (n < shown) sum += p;
    D.txt(ctx, "6 \u00d7 " + c.v, W / 2 - 40, 62 + n * 40,
      { size: 18, col: palette[n % 4], font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 18, 62 + n * 40, { size: 15, col: "rgba(234,244,242,.55)", font: "marker", alpha: a });
    D.txt(ctx, String(p), W / 2 + 74, 62 + n * 40,
      { size: 20, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
  });
  const ly = 62 + COLS.length * 40 - 16;
  if (shown === COLS.length) {
    D.marker(ctx, [[W / 2 - 110, ly], [W / 2 + 84, ly]], 1, "rgba(201,162,39,.6)", 1.8);
    D.txt(ctx, String(804), W / 2 + 74, ly + 30,
      { size: 25, col: "#34D399", font: "marker", align: "right" });
  }
  D.txt(ctx, shown === COLS.length ? "add every partial product" : "one partial product at a time",
    W / 2, H - 14, { size: 13, col: "#C9A227", font: "marker" });
};

const drawStory34 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 330), p3 = D.at(f, 340, 460);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "a date-palm grove", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.areaModel(ctx, {
    x: 68, y: 60, w: W - 120, h: 78, rowV: 6, cols: COLS, prog: p2,
    showProducts: p3 > 0.3, showSum: false
  });
  if (p3 > 0) D.txt(ctx, "6 rows of 134 palms — how many trees?", W / 2, H - 18,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard34 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "One rectangle, one region per place" });
  const p1 = D.at(f, 20, 300), p2 = D.at(f, 320, 520), p3 = D.at(f, 530, 700);
  D.areaModel(ctx, { x: 96, y: 116, w: W - 190, h: 108, rowV: 6, cols: COLS, prog: p1, showSum: false });
  if (p2 > 0) {
    D.txt(ctx, "600 + 180 + 24", W / 2, 288, { size: 17, col: "#EAF4F2", font: "marker", alpha: p2 });
    D.txt(ctx, "= 804", W / 2, 322, { size: 24, col: "#34D399", font: "marker", alpha: D.at(f, 400, 500) });
  }
  if (p3 > 0) {
    const yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "every place gets its own region, and every region gets added", W / 2, yb - 2,
      { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 570, 660) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 610, 710), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport34 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel(ctx, { x: 40, y: 26, w: W - 76, h: 44, rowV: 4, cols: [{ v: 200 }, { v: 10 }, { v: 3 }], prog: 1, showSum: false });
};

const LESSON = {
  code: "3-4",
  storageKey: "daf-g4-t3-l4",
  title: "Use Area Models and Partial Products to Multiply",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-4 · 4.NBT.B.5",
  math: M,
  ixl: ["NA7", "SP2", "VR5", "SSA"],

  metas: [
    {
      phase: "warmup",
      title: "The roof split into <em>useful parts</em>",
      lead: "The grove's long roof has to be priced: six panels of 134 riyals each. The foreman says the price is easier when the roof is cut into useful parts.",
      goal: "An invitation — an area model is a multiplication you can cut.",
      pull: "6 × 100 is easy. 6 × 134 becomes easy once it is cut up.",
      rail: {
        launch: "Fictional frame. Ask only: what has to be priced, and how would you cut the long roof?",
        monitor: ["Seeing 134 as 100 + 30 + 4", "Wonding why the cuts sit at the places", "Noticing the widths are not equal"],
        connect: "Where should the cuts go, and why there?",
        misconception: "Cutting the 134 anywhere that looks tidy, breaking the place values."
      }
    },
    {
      phase: "launch",
      title: "The class locks the price <em>before the cuts</em>",
      lead: "Six panels of 134. The estimate goes in first: 6 × 130 = 780 is the safety net for the exact price.",
      goal: "Estimate the product before partitioning the model.",
      pull: "The price must land near 780, or the model is wrong.",
      rail: {
        launch: "State that the panel prices are simulated planning data.",
        monitor: ["Rounding 134 to 130", "Computing 6 × 130 = 780", "Keeping the estimate in view"],
        connect: "Which part of 134 did the estimate drop?",
        misconception: "Estimating 6 × 100 and forgetting the 34 is still owed."
      }
    },
    {
      phase: "monitor",
      title: "Zayd cuts the roof <em>at the places</em>",
      lead: "He can add one region at a time, cutting at 100, then 30, then 4 — the class chooses the cut before it appears.",
      goal: "Partition the area model at the place values.",
      pull: "The widths follow the place values — that is why they are not equal.",
      rail: {
        launch: "Predict the width of the next region before it is cut.",
        monitor: ["Cutting at the 100", "Cutting at the 30", "Cutting at the 4"],
        connect: "Why do the cuts sit where they do?",
        misconception: "Cutting the roof into equal strips."
      }
    },
    {
      phase: "monitor",
      title: "Omar prices <em>one region at a time</em>",
      lead: "He can write the partial product for each region as it appears — the class chooses the region before its price is written.",
      goal: "Multiply each region: 6 × 100, 6 × 30, 6 × 4.",
      pull: "Every region has to appear in the list.",
      rail: {
        launch: "Predict the next partial product before it is written.",
        monitor: ["Pricing the 100-part as 600", "Pricing the 30-part as 180", "Pricing the 4-part as 24"],
        connect: "Why is the 30-part worth 180 and not 30?",
        misconception: "Listing the parts (100, 30, 4) and calling that the product."
      }
    },
    {
      phase: "monitor",
      title: "The slip needs <em>regions and a sum</em>",
      lead: "Four lines of the price slip are mixed up. The class files each as a region of the model or the sum of the regions before the folio signs.",
      goal: "Separate the partial products from their total in a record.",
      pull: "600 + 180 + 24 = 804 — the regions add to the whole price.",
      rail: {
        launch: "Do not grade until the class commits to all four files.",
        monitor: ["Naming 600, 180, 24 as regions", "Naming 804 as the sum", "Checking the regions add back"],
        connect: "Which line would the grove plan file as 'the price'?",
        misconception: "Filing 600 as the price because it is the first region."
      }
    },
    {
      phase: "monitor",
      title: "The foreman's <em>shortcut</em>",
      lead: "The foreman offers a second cut: price the 130-part in one go (6 × 130 = 780) and hold the 4. The class chooses the cut before the model shows it.",
      goal: "Choose a partition and see its consequence: fewer regions, a held part.",
      pull: "Fewer regions to track — but the held part has to come back.",
      rail: {
        launch: "Ask what the two-region cut gives up before revealing it.",
        monitor: ["Seeing 780 + 24", "Noticing the held 24", "Comparing the two slips"],
        connect: "When is the shortcut the better cut?",
        misconception: "Pricing the 130-part and forgetting the held 4."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two cuts</em> of the same roof",
      lead: "The boys step back. Real student partitions take the board — one region per place, and the foreman's one-go 130.",
      goal: "Compare partitions and name a reusable one in the Sijill.",
      pull: "Same roof, same price — different cuts.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both reach 804", "Comparing 600+180+24 to 780+24", "Naming the consequence of each cut"],
        connect: "Which cut would you trust for a four-place number, and why?",
        misconception: "Believing only one partition is the 'real' area model."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "One region for each place. Multiply each region. Add them all.",
      goal: "Build the area-model rule publicly from the two cuts compared.",
      pull: "The estimate 780 was the model's safety net all along.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Re-running 600 + 180 + 24 = 804", "Checking against 780"],
        connect: "Which part of the rule would catch a forgotten held part?",
        misconception: "Adding the regions before every region is priced."
      }
    },
    {
      phase: "monitor",
      title: "The foreman checks <em>against the estimate</em>",
      lead: "The model says 804; the estimate said 780. The foreman lines them up before he signs — the class chooses what to check.",
      goal: "Use the estimate to approve or challenge the model.",
      pull: "804 lands a held 24 away from 780 — the model and the estimate agree.",
      rail: {
        launch: "Ask which number the check compares before the sign-off.",
        monitor: ["Placing 804 next to 780", "Naming the gap as the held 24", "Signing the slip"],
        connect: "What would it mean if the model landed far from 780?",
        misconception: "Signing the model without checking it against the estimate."
      }
    },
    {
      phase: "swyk",
      title: "The class signs only a price it can <em>re-cut</em>",
      lead: "A fresh panel order: 4 panels of 213 riyals. Use an area model — and be ready to show the cut that built your price.",
      goal: "Multiply with an area model independently and state the partition.",
      pull: "A price you can re-cut into 800 + 40 + 12 is a price you can defend.",
      rail: {
        launch: "Two minutes. Require the regions, not only the total.",
        monitor: ["Cutting 213 into 200 + 10 + 3", "Pricing 800, 40, 12", "Adding to 852"],
        connect: "Where did the 800 come from, and the 12?",
        misconception: "Answering 812 by pricing 200 + 10 + 3 as 800 + 10 + 12."
      }
    },
    {
      phase: "connect",
      title: "The roof is priced — <em>and the courtyard appears</em>",
      lead: "The long roof is priced and signed: 804, defended against 780. Then the workshop's courtyard is measured — and its side does not split as evenly as 134 did.",
      goal: "Close on one action: cut, price, add — on your own number.",
      pull: "Tomorrow: the courtyard with an awkward side.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Re-cutting products at the places", "Checking against the estimate", "Ready for awkward sides"],
        connect: "Where have you priced something by cutting it into friendly parts?",
        misconception: "Remembering the roof but not the cut-price-add rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const COLS = [{ v: 100 }, { v: 30 }, { v: 4 }];
    const [n, setN] = useState(1);
    const [shown, setShown] = useState(1);
    const [cut, setCut] = useState(3);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="A long roof to price"
            text="The lantern shows the grove's long roof: six panels of 134 riyals each, and a price the foreman refuses to count digit by digit. He says the price is easier when the roof is cut into useful parts."
            clue="The cuts sit at the place values">
            <NoticeWonder draw={drawStory34} height={254} award={award}
              notices={["Six panels of 134", "The price is not counted yet", "134 hides 100 + 30 + 4", "The foreman talks about cuts"]}
              wonders={["Where should the cuts go?", "Why would cutting make pricing easier?", "What does each cut give you?"]}
              footnote="The story sets the roof. The partition is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The class locks the price before the cuts"
            text="Omar rounds the panel to 130 and Zayd computes 6 × 130 = 780. The exact price must land near 780 — or the model is wrong."
            clue="780 is the safety net for 804">
            <LaunchEstimate draw={makeArea(3)} height={254} award={award}
              label="About how much for the long roof? (6 × 134)"
              min={500} max={1000} start={780} unit="riyals"
              after="Locked. Now let us cut the roof region by region."
              note="6 × 100 is easy. 6 × 134 becomes easy once it is cut up. Prices are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd cuts the roof at the places"
            text="He can add one region at a time, cutting at the 100, then the 30, then the 4. The class chooses the cut before it appears."
            clue="The widths follow the place values">
            <ExploreChips draw={makeArea(n)} height={254}
              label="Add one region at a time"
              value={n}
              onPick={(v) => setN(v)}
              chips={COLS.map((c, k) => ({ v: k + 1, label: "+ " + c.v }))}
              caption={<MathEl omml={M.decompose} size="xl" display="block" />}
              footnote="The widths follow the place values — that is why they are not equal." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar prices one region at a time"
            text="He can write the partial product for each region as it appears. The class chooses the region before its price is written."
            clue="Every region has to appear in the list">
            <ExploreChips draw={makeLadder(shown)} height={254}
              label="Write the partial products"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={COLS.map((c, k) => ({ v: k + 1, label: k === 0 ? "first part" : "+ part " + (k + 1) }))}
              caption={<MathEl omml={M.parts} size="xl" display="block" />}
              footnote="One region for each place — 600, then 180, then 24." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The price slip needs regions and a sum"
            text="Omar reads each line while Zayd files it. The class commits all four before the folio signs the slip."
            clue="Regions are parts of the price. The sum is the price.">
            <CardSort award={award} columns={2} commitLabel="File the four lines"
              items={[
                { id: "s1", text: "6 × 100 = 600", target: "t1" },
                { id: "s2", text: "6 × 30 = 180", target: "t1" },
                { id: "s3", text: "6 × 4 = 24", target: "t1" },
                { id: "s4", text: "600 + 180 + 24 = 804", target: "t2" }
              ]}
              targets={[
                { id: "t1", label: "Region of the model" },
                { id: "t2", label: "Sum of the regions" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The foreman offers a shortcut cut"
            text="The foreman offers a second partition: price the 130-part in one go — 6 × 130 = 780 — and hold the 4 for the end. The class chooses the cut before the model shows it."
            clue="Fewer regions to track — the held part has to come back">
            <ExploreChips draw={makeArea(cut)} height={254}
              label="Which cut does the foreman sign?"
              value={cut}
              onPick={(v) => setCut(v)}
              chips={[{ v: 3, label: "three regions: 100 · 30 · 4" }, { v: 2, label: "two regions: 130 · 4" }]}
              caption={<MathEl omml={M.decompose} size="lg" display="block" />}
              footnote="The two-region cut prices 780 in one go — and holds the 24." />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest partitions now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="Same roof, same price — different cuts">
          <CompareConnect award={award}
            left={{ name: "Aya's cut — one region per place", omml: M.parts, h: 92,
                    quote: "600 + 180 + 24 — every place gets its own region, nothing held back." }}
            right={{ name: "Musa's cut — price the 130 in one go", omml: M.estimate, h: 92,
                     quote: "780 + 24 — fewer regions to track, but the 24 has to come back." }}
            same={["Both reach 804", "Both cut at place values", "Both can be re-checked"]}
            diff={["Aya's never holds a part", "Musa's holds the 24 until the end", "Musa's shortcut gets riskier as the places grow"]} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two cuts compared."
            clue="One region for each place · multiply · add them all">
            <BoardScreen draw={drawBoard34} height={380}
              caption="The estimate 780 was the model's safety net all along." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="zayd" pose="question"
            title="The foreman checks against the estimate"
            text="The model says 804; the estimate said 780. The foreman lines them up before he signs — the class chooses what to check."
            clue="804 lands a held 24 away from 780">
            <ExploreChips draw={makeArea(cut)} height={254}
              label="What does the check compare?"
              value={cut}
              onPick={(v) => setCut(v)}
              chips={[{ v: 3, label: "the full model — 804" }, { v: 2, label: "the 130 part — 780, hold 24" }]}
              caption={<MathEl omml={M.estimate} size="lg" display="block" />}
              footnote="804 sits next to 780, a held 24 away — the foreman signs the slip." />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The class signs only a price it can re-cut"
            text="A fresh panel order: 4 panels of 213 riyals. Use an area model — and be ready to show the cut that built your price."
            clue="213 cuts into 200 · 10 · 3">
            <ShowWhatYouKnow award={award}
              prompt="Use an area model to work out 4 × 213."
              options={[{ v: "a", text: "812" }, { v: "b", text: "852" }, { v: "c", text: "840" }, { v: "d", text: "8,412" }]}
              right="b"
              support={{
                yes: "Yes — 4 × 200 = 800, 4 × 10 = 40, 4 × 3 = 12; 800 + 40 + 12 = 852.",
                notYet: "Not yet — cut the 213 at its places, price each region, then add them.",
                draw: drawSupport34, h: 84,
                hint: "What is 4 of each part of 213?"
              }} />
          </StoryShell>
        );

      case 10:
        return (
          <StoryHandoff
            title="The roof is priced and signed"
            text="The long roof is priced at 804 and signed against the 780 estimate. Then the workshop's courtyard is measured out — and its side does not split as evenly as 134 did."
            artifact="Grove plan · roof priced by partitioned area"
            next="The courtyard's side does not split as evenly — the next panel needs a trickier cut.">
            <Closing game={game} omml={M.answer}
              action="Tonight: cut a three-place number at its places, price each region, and add — on a number of your own." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
