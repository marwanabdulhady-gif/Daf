/* ===========================================================================
   Grade 4 · Topic 4 · LESSON 4-2 · Use Models to Multiply 2-Digit Numbers by
   Multiples of 10                    Standard 4.NBT.B.5
   I can ... use a model to multiply a 2-digit number by a multiple of ten.
   =========================================================================== */

const M = {
  problem: om(mt("23\u00d740")),
  split: om(mt("20\u00d740"), mnor(" and "), mt("3\u00d740")),
  partA: om(mt("20\u00d740=800")),
  partB: om(mt("3\u00d740=120")),
  answer: om(mt("23\u00d740=920")),
  estimate: om(mt("20\u00d740=800")),
  rule: om(mnor("split the two-digit number \u00b7 multiply each part by the ten")),
  swyk: om(mt("34\u00d720")),
  swykAnswer: om(mt("600+80=680"))
};

const COLS = [{ v: 20 }, { v: 3 }];

const makeModel = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel(ctx, { x: 66, y: 76, w: W - 118, h: 92, rowV: 40,
    cols: COLS.slice(0, n), prog: 1, showSum: n === 2 });
  D.txt(ctx, n === 2 ? "both parts counted" : "one part is still missing",
    W / 2, H - 16, { size: 13, col: n === 2 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeLadder42 = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [["20 × 40", 800, "#2D70B3"], ["3 × 40", 120, "#FA7E19"]];
  rows.forEach(function (r, k) {
    var a = k < shown ? 1 : 0.18;
    D.txt(ctx, r[0], W / 2 - 46, 78 + k * 46, { size: 20, col: r[2], font: "marker", align: "right", alpha: a });
    D.txt(ctx, "=", W / 2 - 20, 78 + k * 46, { size: 16, col: "rgba(234,244,242,.55)", font: "marker", alpha: a });
    D.txt(ctx, String(r[1]), W / 2 + 66, 78 + k * 46,
      { size: 22, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
  });
  if (shown === 2) {
    D.marker(ctx, [[W / 2 - 116, 148], [W / 2 + 76, 148]], 1, "rgba(201,162,39,.6)", 1.8);
    D.txt(ctx, "920", W / 2 + 66, 180, { size: 27, col: "#34D399", font: "marker", align: "right" });
  }
  D.txt(ctx, shown === 2 ? "both partial products, added" : "one partial product at a time",
    W / 2, H - 16, { size: 13, col: "#C9A227", font: "marker" });
};

const drawSeats42 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the stadium block", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.areaModel(ctx, { x: 72, y: 58, w: W - 128, h: 80, rowV: 40, cols: COLS, prog: p2,
    showProducts: p3 > 0.3, showSum: false });
  if (p3 > 0) D.txt(ctx, "40 rows of 23 seats — how many seats?", W / 2, H - 16,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard42 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Split the awkward number" });
  const p1 = D.at(f, 20, 260), p2 = D.at(f, 280, 460), p3 = D.at(f, 480, 660);
  D.areaModel(ctx, { x: 108, y: 120, w: W - 200, h: 112, rowV: 40, cols: COLS, prog: p1, showSum: false });
  if (p2 > 0) {
    D.txt(ctx, "800 + 120", W / 2, 292, { size: 20, col: "#EAF4F2", font: "marker", alpha: p2 });
    D.txt(ctx, "= 920", W / 2, 330, { size: 26, col: "#34D399", font: "marker", alpha: D.at(f, 350, 440) });
  }
  if (p3 > 0) {
    var yb = H - 40;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p3, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "23 is awkward — 20 and 3 are not",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 520, 620) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 560, 660), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport42 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.areaModel(ctx, { x: 44, y: 26, w: W - 84, h: 44, rowV: 20,
    cols: [{ v: 30 }, { v: 4 }], prog: 1, showSum: false });
};

const LESSON = {
  code: "4-2",
  storageKey: "daf-g4-t4-l2",
  title: "Use Models to Multiply 2-Digit Numbers by Multiples of 10",
  unit: "GRADE 4 · TOPIC 4 · LESSON 4-2 · 4.NBT.B.5",
  math: M,
  ixl: ["YJH"],

  metas: [
    { phase: "warmup", title: "The long <em>order card</em>",
      lead: "The long order card: 23 panels for each of 40 customers. The model is already cut into two — one piece much bigger than the other.",
      goal: "Notice the split: 23 is 20 and 3, and the 40 waits down the side.",
      pull: "Both pieces are multiples of ten — the rule from yesterday still works.",
      rail: { launch: "Fictional frame. Look at the cut model — no total yet.",
        monitor: ["Seeing the 20 and the 3", "Noticing the 40 down the side", "Wonding why it was cut there"],
        connect: "Why cut the 23 at the ten?",
        misconception: "Thinking the model must be cut into equal pieces." } },

    { phase: "launch", title: "About how many <em>seats</em>?",
      lead: "23 × 40. Lock the estimate before the regions are built.",
      goal: "Estimate the product before the model is filled.",
      pull: "20 × 40 is easy. 23 × 40 becomes easy once it is cut up.",
      rail: { launch: "Give the estimate and what you rounded.",
        monitor: ["Rounding 23 to 20", "Multiplying 20 × 40", "Saying the exact answer is a bit more"],
        connect: "Why is the exact answer bigger than 800?",
        misconception: "Estimating the rows instead of the row length." } },

    { phase: "monitor", title: "Zayd fills the <em>regions</em>",
      lead: "20 × 40 first, then 3 × 40 — every piece is a multiple-of-ten product.",
      goal: "Multiply each region by the ten; the old rule does the work.",
      pull: "Both pieces are multiples of ten — the rule from yesterday still works.",
      rail: { launch: "Predict each region before it is filled.",
        monitor: ["Multiplying 20 × 40", "Multiplying 3 × 40", "Naming the place each zero belongs to"],
        connect: "Which region is bigger, and by how many hundreds?",
        misconception: "Dropping the 3 × 40 region from the total." } },

    { phase: "monitor", title: "The <em>partial products</em>",
      lead: "800 and 120 — every region has to appear in the list.",
      goal: "Write the partial products and add them once.",
      pull: "Every region has to appear in the list.",
      rail: { launch: "Which region first?",
        monitor: ["Writing 20 × 40 = 800", "Writing 3 × 40 = 120", "Adding 920"],
        connect: "What would the total be if a region was missing?",
        misconception: "Answering 800 and forgetting the ones part." } },

    { phase: "monitor", title: "Match the <em>model</em>",
      lead: "Three partial-product sums. Each one belongs to one order card.",
      goal: "Read two-part models back to their products.",
      pull: "The parts always match the digits.",
      rail: { launch: "Name the digits each sum's parts describe.",
        monitor: ["Reading 800 + 120 as 23 × 40", "Reading 600 + 80 as 34 × 20", "Checking the parts match"],
        connect: "How do you know which product a model belongs to?",
        misconception: "Matching by the bigger part only." } },

    { phase: "connect", title: "Reem splits the <em>23</em>. Ammar splits the <em>40</em>",
      lead: "Reem: 20 forties and 3 forties. Ammar: 23 × 4, then multiply by ten. Both get 920.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing which factor was split", "Checking both reach 920", "Saying which is quicker"],
        connect: "Which split would you use for 27 × 50?",
        misconception: "Believing only the tidy factor may be split." } },

    { phase: "synth", title: "On the <em>board</em>: split the two-digit number",
      lead: "Split at the ten. Multiply each part by the ten. Add the parts.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Naming each region", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Splitting the 40 into 4 and 0 and losing the ten." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "Split the two-digit number. Multiply each part by the ten.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the split", "Multiplying each part", "Testing on a new order"],
        connect: "Which part is easier to forget?",
        misconception: "Multiplying only the tens part." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "34 × 20 — split the 34, multiply each part by the ten.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show both parts.",
        monitor: ["Splitting 34 at 30", "Multiplying each part by 20", "Adding 600 + 80"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 680 with only 600 + 20 shown." } },

    { phase: "connect", title: "The long order is <em>modelled</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: before any cutting, the beams must be estimated.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain the split", "Still multiplies only one part", "Ready for estimation"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The long order card"
            text="The long order card: 23 panels for each of 40 customers. The model is already cut into two — one piece much bigger than the other."
            clue="23 is 20 and 3 — and the 40 waits down the side.">
            <NoticeWonder draw={makeModel(2)} height={252} award={award}
              notices={["It is cut into two", "One piece is much bigger", "40 is down the side", "20 and 3 make 23"]}
              wonders={["What is the total?", "Why cut it there?", "Do I add the pieces?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The estimate before the model"
            text="Omar asks for the estimate before the regions are filled — the order card needs a number the workshop can trust."
            clue="20 × 40 is easy. 23 × 40 becomes easy once it is cut up.">
            <LaunchEstimate draw={drawSeats42} height={252} award={award}
              label="About how many seats?" min={400} max={1600} start={920} unit="seats"
              after="Locked. Now let us build it region by region."
              note="The order counts are simulated — the model works on any two-digit by ten." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd fills the regions"
            text="He can fill one region at a time — the class must predict each product before it appears."
            clue="Both pieces are multiples of ten">
            <ExploreChips draw={makeModel(n)} height={252}
              label="Add one region at a time"
              value={n}
              onPick={(v) => setN(v)}
              chips={[{ v: 1, label: "+ 20" }, { v: 2, label: "+ 3" }]}
              caption={<MathEl omml={M.split} size="lg" display="block" />}
              footnote="Both pieces are multiples of ten — the rule from yesterday still works." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The partial products"
            text="He can reveal each partial — the class must see that every region appears in the list."
            clue="Every region has to appear in the list">
            <ExploreChips draw={makeLadder42(shown)} height={252}
              label="Write the partial products"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[{ v: 1, label: "the tens part" }, { v: 2, label: "add the ones part" }]}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="Every region has to appear in the list." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="Match the model"
            text="Omar and Zayd lay three partial-product sums on the table. Each one belongs to one order card."
            clue="The parts always match the digits">
            <CardSort award={award} columns={3}
              items={[
                { id: "q1", text: "800 + 120", target: "m1" },
                { id: "q2", text: "600 + 80", target: "m2" },
                { id: "q3", text: "1,500 + 150", target: "m3" }
              ]}
              targets={[
                { id: "m1", label: "23 × 40" }, { id: "m2", label: "34 × 20" }, { id: "m3", label: "55 × 30" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 920"
            text="Reem splits the 23. Ammar splits the 40 and does one multiplication. Both get 920."
            clue="The comparison produces the rule">
            <CompareConnect award={award}
              left={{ name: "Reem's way — split the 23", omml: M.split, h: 92,
                      quote: "20 forties and 3 forties." }}
              right={{ name: "Ammar's way — split the 40", omml: M.partA, h: 92,
                       quote: "I did 23 × 4 first, then multiplied by ten." }}
              same={["Both get 920", "Both make the numbers friendlier", "Both use place value"]}
              diff={["Reem splits the awkward one, Ammar the tidy one",
                     "Ammar only does one multiplication", "Reem's shows both parts on the model"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The model is drawn, not declared"
            text="Zayd builds only what the class can justify: the split at the ten, each part multiplied by the ten, the parts added."
            clue="Split the two-digit number · multiply each part by the ten">
            <BoardScreen draw={drawBoard42} height={430}
              caption="Split the two-digit number · multiply each part by the ten." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="The rule goes into the tower's plan with its reason, not alone."
            clue="Both parts, both times the ten">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "split the two-digit number · multiply each part by the ten" }]}
              hand={"split the two-digit number at its ten · multiply each part by the ten · add the parts"}
              cards={[
                { title: "The model we built", omml: M.answer, note: "800 from the 20, 120 from the 3" },
                { title: "Tap to see the split", omml: M.problem, revealOmml: M.split, reveal: true,
                  note: "the 23 becomes 20 and 3" }
              ]} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only an order with both parts"
            text="34 × 20. Show the split — and both partial products."
            clue="600 + 80 = 680">
            <ShowWhatYouKnow award={award}
              prompt="Use a model to work out 34 × 20."
              omml={M.swyk}
              options={[{ v: "a", text: "680" }, { v: "b", text: "600" }, { v: "c", text: "640" }, { v: "d", text: "6,800" }]}
              right="a"
              support={{
                yes: "Yes — 30 × 20 = 600 and 4 × 20 = 80, so 680.",
                notYet: "Not yet — did you multiply both parts by the ten?",
                draw: drawSupport42, h: 84,
                hint: "The 34 splits into 30 and 4. Both parts meet the 20."
              }} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The long order is modelled"
            text="Omar signs the order with both parts beside it. The foreman spreads the next plan: a run of beams, and a warning — before any cutting, the estimate must say whether they fit."
            artifact="Tower plan · long order modelled"
            next="Before any cutting, the class must choose rounding or compatible numbers for a safe estimate. Will the beams fit?">
            <Closing game={game} omml={M.rule}
              action="Split a two-digit number by a multiple of ten tonight and show both partial products." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
