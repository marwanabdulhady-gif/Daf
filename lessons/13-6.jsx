/* ===========================================================================
   Grade 4 · Topic 13 · LESSON 13-6 · Solve Perimeter and Area Problems
   Standard 4.MD.A.3   I can ... use the perimeter and area formulas for a
   rectangle, and find a missing side when one of them is known.
   =========================================================================== */

const M = {
  perim: om(mnor("P = 2 \u00d7 (l + w)")),
  area: om(mnor("A = l \u00d7 w")),
  worked: om(mt("2\u00d7(9+4)=26"), mnor(" m of fence")),
  workedArea: om(mt("9\u00d74=36"), mnor(" square metres")),
  missing: om(mnor("A = 36 and l = 9, so w = 36 \u00f7 9 = 4")),
  units: om(mnor("perimeter is a length \u00b7 area is squares")),
  rule: om(mnor("perimeter walks the edge \u00b7 area fills the inside")),
  hard: om(mnor("area is 48 sq m and one side is 6 m, find the perimeter")),
  swyk: om(mnor("l = 8 m, w = 3 m \u2014 find the perimeter")),
  swykAnswer: om(mt("2\u00d7(8+3)=22"))
};

/* the garden bed: perimeter traced, then area filled */
const makeGarden136 = (mode) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const bw = Math.min(W - 200, 342), bh = 112;
  const bx = (W - bw) / 2, by = 54;
  const prog = mode === "perimeter" ? (frame % 200) / 200 : 1;

  D.rectFig(ctx, { x: bx, y: by, w: bw, h: bh, long: 9, short: 4,
    longLabel: "9 m", shortLabel: "4 m", mode: mode, prog: mode === "perimeter" ? prog : 1,
    col: mode === "perimeter" ? "#FA7E19" : "#388C46",
    caption: mode === "perimeter" ? "2 \u00d7 (9 + 4) = 26 m of fence"
      : mode === "area" ? "9 \u00d7 4 = 36 square metres" : null });

  D.txt(ctx, mode === "perimeter" ? "walk all the way round the edge"
       : mode === "area" ? "cover the inside with one-metre squares"
       : "the school garden bed",
    W / 2, 24, { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  D.txt(ctx, mode === "perimeter" ? "the answer is a length, in metres"
       : mode === "area" ? "the answer is a count of squares, in square metres"
       : "nine metres by four metres",
    W / 2, H - 12, { size: 12.5, col: mode === "area" ? "#34D399" : "#C9A227", font: "marker" });
};

/* finding a missing side */
const makeMissing136 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const bw = Math.min(W - 220, 320), bh = 124;
  const bx = (W - bw) / 2, by = 58;

  D.rectFig(ctx, { x: bx, y: by, w: bw, h: bh, long: 9, short: 4,
    longLabel: "9 m", shortLabel: step >= 2 ? "4 m" : "?",
    mode: step >= 1 ? "area" : "none", prog: 1, col: "#2D70B3" });

  const rows = [
    "the area is 36 square metres",
    "the long side is 9 metres",
    "so 9 \u00d7 ? = 36, and ? is 4"
  ];
  const pulse = 0.55 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, rows[step], W / 2, H - 32,
    { size: 15, col: step === 2 ? "#34D399" : "#C9A227", font: "marker",
      alpha: step === 2 ? pulse + 0.4 : 1 });
  D.txt(ctx, step === 2 ? "area divided by one side gives the other side"
       : "the missing side is hiding inside the area",
    W / 2, H - 10, { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawWarm136 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const bw = Math.min(W - 220, 300), bh = 118;
  const bx = (W - bw) / 2, by = 58;
  D.rectFig(ctx, { x: bx, y: by, w: bw, h: bh, long: 9, short: 4,
    longLabel: "9 m", shortLabel: "4 m",
    mode: f < 300 ? "perimeter" : "area", prog: f < 300 ? D.at(f, 20, 280) : D.at(f, 320, 580),
    col: f < 300 ? "#FA7E19" : "#388C46" });
  D.txt(ctx, "the same rectangle, measured two different ways", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker" });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker" });
};

const drawStory136 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 380, 520);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the new garden bed by the school gate", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const bw = Math.min(W - 220, 300), bh = 112;
  D.rectFig(ctx, { x: (W - bw) / 2, y: 56, w: bw, h: bh, long: 9, short: 4,
    longLabel: "9 m", shortLabel: "4 m", mode: "none", prog: D.at(f, 60, 340),
    col: "#FA7E19" });
  if (p3 > 0) {
    D.txt(ctx, "how much fence is needed to go all the way round?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard136 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Perimeter walks the edge, area fills the inside" });
  const p1 = D.at(f, 20, 300), p2 = D.at(f, 320, 620), p4 = D.at(f, 700, 940);
  const bw = 250, bh = 108;

  D.rectFig(ctx, { x: W / 2 - bw - 70, y: 118, w: bw, h: bh, long: 9, short: 4,
    longLabel: "9 m", shortLabel: "4 m", mode: "perimeter", prog: p1, col: "#FA7E19",
    caption: p1 > 0.7 ? "2 \u00d7 (9 + 4) = 26 m" : null });

  if (p2 > 0) {
    D.rectFig(ctx, { x: W / 2 + 70, y: 118, w: bw, h: bh, long: 9, short: 4,
      longLabel: "9 m", shortLabel: "4 m", mode: "area", prog: p2, col: "#388C46",
      caption: p2 > 0.7 ? "9 \u00d7 4 = 36 sq m" : null });
  }
  if (p4 > 0) {
    D.txt(ctx, "same rectangle, two completely different questions", W / 2, 300,
      { size: 17, col: "#EAF4F2", font: "marker", alpha: p4 });
    D.txt(ctx, "26 metres of fence \u00b7 36 square metres of soil", W / 2, 336,
      { size: 19, col: "#C9A227", font: "marker", alpha: D.at(f, 760, 870) });
    D.txt(ctx, "if you know the area and one side, divide to get the other",
      W / 2, H - 24, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 830, 940) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport136 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const bw = Math.min(W - 140, 190);
  D.rectFig(ctx, { x: (W - bw) / 2, y: 24, w: bw, h: 52, long: 8, short: 3,
    longLabel: "8 m", shortLabel: "3 m", mode: "perimeter", prog: 1, col: "#FA7E19" });
  D.txt(ctx, "8 + 3 + 8 + 3 = 22 m all the way round", W / 2, H - 6,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "13-6",
  storageKey: "daf-g4-t13-l6",
  title: "Solve Perimeter and Area Problems",
  unit: "GRADE 4 · TOPIC 13 · LESSON 13-6 · 4.MD.A.3",
  math: M,
  ixl: ["UPZ", "HNX"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "One rectangle. First its edge is traced, then its inside is filled. No question yet.",
      goal: "Separate the two measurements before either is named.",
      pull: "Two different things are being measured here.",
      rail: { launch: "Describe both animations. Do not use the words perimeter or area yet.",
        monitor: ["Describing the edge", "Describing the squares", "Noticing the side labels"],
        connect: "Which one would you use to buy fence?",
        misconception: "Believing the edge and the inside give the same number." } },

    { phase: "launch", title: "Fencing the <em>garden bed</em>",
      lead: "The new bed by the gate is 9 metres by 4 metres. Estimate the fence needed to go round it.",
      goal: "Create the need for perimeter, in a situation where area would be wrong.",
      pull: "Now let us walk the edge.",
      rail: { launch: "Commit to a number of metres before you calculate.",
        monitor: ["Adding all four sides", "Adding only two", "Multiplying the sides"],
        connect: "Would multiplying the sides answer this question?",
        misconception: "Answering 36 by finding the area instead." } },

    { phase: "monitor", title: "Edge or <em>inside</em>?",
      lead: "Trace the edge for perimeter. Cover the inside for area.",
      goal: "Two measurements, two units, one rectangle.",
      pull: "Now work backwards from the area.",
      rail: { launch: "Predict which answer will be the bigger number.",
        monitor: ["Adding four sides", "Counting the squares", "Confusing the two"],
        connect: "Why is one answer in metres and the other in square metres?",
        misconception: "Giving an area in metres rather than square metres." } },

    { phase: "monitor", title: "Find the <em>missing side</em>",
      lead: "The area is 36 square metres and one side is 9 metres. Find the other side.",
      goal: "Reverse the area formula using division.",
      pull: "Now judge some finished work.",
      rail: { launch: "What multiplication would give thirty six?",
        monitor: ["Dividing 36 by 9", "Guessing and checking", "Subtracting instead"],
        connect: "Why is division the right move here?",
        misconception: "Subtracting 9 from 36 to find the missing side." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Force attention to which measurement was actually asked for.",
      pull: "Two students solved the same problem differently.",
      rail: { launch: "For each one ask: is this a length or a count of squares?",
        monitor: ["Checking the unit", "Recomputing", "Reading the question again"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Reporting an area when the question asked for a perimeter." } },

    { phase: "connect", title: "Two ways to find the <em>perimeter</em>",
      lead: "Ziad added all four sides. Noura added one long and one short, then doubled.",
      goal: "The formula is a shortcut for a sum everyone can see.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask where the doubling comes from.",
        monitor: ["Adding four sides", "Doubling the pair", "Checking they agree"],
        connect: "Why does doubling one long and one short work?",
        misconception: "Doubling only one of the two sides." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Twenty six metres of fence. Thirty six square metres of soil. Same rectangle.",
      goal: "The moment the two ideas are separated for good.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw both rectangles side by side.",
        monitor: ["Predicting the perimeter", "Predicting the area", "Naming the units"],
        connect: "Who can say the difference in one sentence?",
        misconception: "Blurring the two formulas together." } },

    { phase: "synth", title: "The rules \u2014 <em>and why they work</em>",
      lead: "Two formulas, and a way to reverse either one.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read both formulas aloud, once.",
        monitor: ["Using the right formula", "Naming the unit", "Reversing with division"],
        connect: "How do you get a side back out of the area?",
        misconception: "Using the perimeter formula for an area question." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on perimeter.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Walk all the way round in your head.",
        monitor: ["Adding all four sides", "Multiplying the sides", "Doubling the pair"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 24 by multiplying instead of adding." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: getting the units right every single time.",
      rail: { launch: "Three students state the two formulas.",
        monitor: ["Separates the two", "Still mixes them", "Ready for precision"],
        connect: "Who is measuring a room at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [mode, setMode] = useState("none");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm136} height={256} award={award}
          notices={["The edge gets traced", "Then the inside fills with squares", "The sides say 9 m and 4 m", "There are 36 squares"]}
          wonders={["Are those two different answers?", "Which one is the fence?", "Why square metres?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory136} height={256} award={award}
          label="How many metres of fence?" min={10} max={50} start={20} unit="m"
          after="Locked. Now let us walk all the way round."
          note="You have to pass along every side once, and there are four of them." />;

      case 2:
        return <ExploreChips draw={makeGarden136(mode)} height={256}
          label="Measure it two ways" value={mode}
          onPick={(v) => setMode(v)}
          chips={[{ v: "none", label: "just the bed" }, { v: "perimeter", label: "trace the edge" },
                  { v: "area", label: "fill the inside" }]}
          caption={<MathEl omml={M.worked} size="xl" display="block" />}
          footnote="One answer is a length. The other is a count of squares." />;

      case 3:
        return <ExploreChips draw={makeMissing136(step)} height={256}
          label="Work backwards from the area" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the area is 36" }, { v: 1, label: "one side is 9" }, { v: 2, label: "find the other" }]}
          caption={<MathEl omml={M.missing} size="lg" display="block" />}
          footnote="Multiplication built the area, so division takes it apart." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "d1", text: "P = 26 m", target: "yes" },
                  { id: "d2", text: "P = 36 m", target: "no" },
                  { id: "d3", text: "A = 36 sq m", target: "yes" },
                  { id: "d4", text: "A = 26 sq m", target: "no" }]}
          targets={[{ id: "yes", label: "correct for this 9 by 4 bed" },
                    { id: "no", label: "not yet — wrong measurement" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Ziad's way — add four sides", omml: M.units, h: 92,
            quote: "Nine plus four plus nine plus four. Twenty six." }}
          right={{ name: "Noura's way — double the pair", omml: M.perim, h: 92,
            quote: "One long and one short is thirteen. Then double it." }}
          same={["Both give 26 m", "Both use every side once", "Both answer in metres"]}
          diff={["Ziad adds four numbers", "Noura adds two then doubles", "Noura's is the formula"]} />;

      case 6:
        return <BoardScreen draw={drawBoard136} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.perim, alt: "perimeter equals two times length plus width" },
                  { omml: M.area, alt: "area equals length times width" }]}
          hand={"fence → perimeter, in metres · soil → area, in square metres"}
          cards={[{ title: "The perimeter we walked", omml: M.worked, note: "a length" },
                  { title: "Tap for the reverse", omml: M.workedArea, revealOmml: M.missing, reveal: true,
                    note: "area and one side gives the other" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          hard={{ prompt: "A garden bed has an area of 48 square metres and one side is 6 m. How much fence goes round it?", omml: M.hard,
                  answer: "28 m",
                  hint: "48 \u00f7 6 = 8, so the sides are 6 and 8, and 2 \u00d7 (6 + 8) = 28." }}
          prompt="A rug is 8 metres long and 3 metres wide. What is its perimeter?" omml={M.swyk}
          options={[{ v: "a", text: "24 m" }, { v: "b", text: "11 m" }, { v: "c", text: "22 m" }, { v: "d", text: "24 sq m" }]}
          right="c"
          support={{ yes: "Yes — 8 + 3 + 8 + 3, or double eleven.",
            notYet: "Not yet — perimeter adds the sides; multiplying gives the area.",
            draw: drawSupport136, h: 100, hint: "Walk all the way round: two long sides and two short ones." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Measure a table at home and work out both its perimeter and its area." />;

      default: return null;
    }
  }
};
