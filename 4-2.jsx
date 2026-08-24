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
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A rectangle cut into two pieces. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "One side is friendly. The other has been made friendly.",
      rail: { launch: "I am not asking for a total. Just describe the rectangle.",
        monitor: ["Naming the two widths", "Noticing 40 down the side", "Adding 20 and 3"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the two regions as two separate problems." } },

    { phase: "launch", title: "Forty rows of <em>twenty-three</em>",
      lead: "A stadium block has 40 rows with 23 seats in each. Estimate first.",
      goal: "Create the need — 23 is awkward, 20 is not.",
      pull: "Cut the 23 and both pieces become easy.",
      rail: { launch: "Roughly how many seats? Round in your head.",
        monitor: ["Using 20 x 40", "Adding 23 forty times", "Guessing"],
        connect: "Which number is worth breaking apart?",
        misconception: "Splitting the 40 instead of the 23." } },

    { phase: "monitor", title: "Build the <em>model</em>",
      lead: "Add one region at a time. Each is a multiple-of-ten fact you already know.",
      goal: "Both partial products are multiples of ten.",
      pull: "Write those two pieces in a list.",
      rail: { launch: "Predict each region's product before you tap.",
        monitor: ["Using yesterday's zero rule", "Multiplying by 4 then adding a zero", "Losing a region"],
        connect: "How is 20 × 40 like 2 × 4?",
        misconception: "Writing 20 × 40 as 80." } },

    { phase: "monitor", title: "Add the <em>partial products</em>",
      lead: "Two pieces. Both must be counted.",
      goal: "Record and total the parts.",
      pull: "Match some models to their expressions.",
      rail: { launch: "Predict each line before you reveal it.",
        monitor: ["Listing both parts", "Adding as they go", "Dropping the smaller part"],
        connect: "What happens if you forget the 3 × 40?",
        misconception: "Stopping after the largest partial product." } },

    { phase: "monitor", title: "Match the <em>model</em>",
      lead: "Which pair of partial products belongs to that model? No grading until the class commits.",
      goal: "Read a model backwards.",
      pull: "Two students split the same product differently.",
      rail: { launch: "Look at the bigger region first.",
        monitor: ["Checking the tens part", "Checking the ones part", "Adding to test"],
        connect: "How did you know which belonged?",
        misconception: "Matching by the total instead of the parts." } },

    { phase: "connect", title: "Two ways to <em>split it</em>",
      lead: "Reem cut 23 into 20 and 3. Ammar cut the 40 into 4 tens. Both give 920.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Splitting by place value", "Splitting the multiple of ten", "Checking both totals"],
        connect: "Which split gives fewer pieces to add?",
        misconception: "Believing only one number may be split." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Cut the 23. Multiply each piece by 40. Add the pieces back.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the cut", "Naming each product", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Forgetting to add the parts at the end." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the split", "Testing on a new product", "Checking against an estimate"],
        connect: "What if BOTH numbers were awkward?",
        misconception: "Assuming one factor must always be a multiple of ten." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write both partial products.",
        monitor: ["Splitting 34 into 30 and 4", "Writing both parts", "Adding correctly"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Writing 30 × 20 as 60." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: estimating when both numbers are awkward.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the rectangle", "Ready for two awkward factors"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(1);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeModel(2)} height={252} award={award}
          notices={["It is cut into two", "One piece is much bigger", "40 is down the side", "20 and 3 make 23"]}
          wonders={["What is the total?", "Why cut it there?", "Do I add the pieces?"]} />;

      case 1:
        return <LaunchEstimate draw={drawSeats42} height={252} award={award}
          label="About how many seats?" min={400} max={1600} start={920} unit="seats"
          after="Locked. Now let us build it region by region."
          note="20 × 40 is easy. 23 × 40 becomes easy once it is cut up." />;

      case 2:
        return <ExploreChips draw={makeModel(n)} height={252}
          label="Add one region at a time"
          value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 1, label: "+ 20" }, { v: 2, label: "+ 3" }]}
          caption={<MathEl omml={M.split} size="lg" display="block" />}
          footnote="Both pieces are multiples of ten — the rule from yesterday still works." />;

      case 3:
        return <ExploreChips draw={makeLadder42(shown)} height={252}
          label="Write the partial products"
          value={shown}
          onPick={(v) => setShown(v)}
          chips={[{ v: 1, label: "the tens part" }, { v: 2, label: "add the ones part" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Every region has to appear in the list." />;

      case 4:
        return <CardSort award={award} columns={3}
          items={[
            { id: "q1", text: "800 + 120", target: "m1" },
            { id: "q2", text: "600 + 80", target: "m2" },
            { id: "q3", text: "1,500 + 150", target: "m3" }
          ]}
          targets={[
            { id: "m1", label: "23 × 40" }, { id: "m2", label: "34 × 20" }, { id: "m3", label: "55 × 30" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Reem's way — split the 23", omml: M.split, h: 92,
                  quote: "20 forties and 3 forties." }}
          right={{ name: "Ammar's way — split the 40", omml: M.partA, h: 92,
                   quote: "I did 23 × 4 first, then multiplied by ten." }}
          same={["Both get 920", "Both make the numbers friendlier", "Both use place value"]}
          diff={["Reem splits the awkward one, Ammar the tidy one",
                 "Ammar only does one multiplication", "Reem's shows both parts on the model"]} />;

      case 6:
        return <BoardScreen draw={drawBoard42} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "split the two-digit number, multiply each part by the ten" }]}
          hand={"cut the awkward factor at its tens \u00b7 multiply each piece \u00b7 add the pieces back"}
          cards={[
            { title: "The seats we counted", omml: M.answer, note: "our estimate was 800" },
            { title: "Tap to see both parts", omml: M.partA, revealOmml: M.partB, reveal: true,
              note: "the small part still matters" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Use a model to work out 34 × 20."
          omml={M.swyk}
          options={[{ v: "a", text: "608" }, { v: "b", text: "680" }, { v: "c", text: "68" }, { v: "d", text: "6,800" }]}
          right="b"
          support={{
            yes: "Yes — 30 × 20 = 600 and 4 × 20 = 80, and 600 + 80 = 680.",
            notYet: "Not yet — check that you added both regions.",
            draw: drawSupport42, h: 84,
            hint: "The two regions are 30 × 20 and 4 × 20."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a two-digit number at home and multiply it by 20 using two partial products." />;

      default: return null;
    }
  }
};
