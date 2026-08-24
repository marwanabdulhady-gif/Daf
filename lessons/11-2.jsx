/* ===========================================================================
   Grade 4 · Topic 11 · LESSON 11-2 · Make Line Plots
   Standard 4.MD.B.4   I can ... choose a scale, draw it, and turn a list of
   fractional measurements into a line plot.
   =========================================================================== */

const M = {
  data: om(mnor("ribbon lengths in metres")),
  smallest: om(mfrac(2, 8)),
  largest: om(mfrac(8, 8)),
  scaleChoice: om(mnor("the scale must use the smallest piece in the data")),
  tally: om(mt("1+2+4+2+3+2=14"), mnor(" ribbons")),
  eighths: om(mnor("eighths, because one ribbon measured "), mfrac(3, 8)),
  rule: om(mnor("find the range \u00b7 pick the unit \u00b7 draw the scale \u00b7 mark every value")),
  swyk: om(mnor("data in halves and quarters \u2014 which scale?")),
  swykAnswer: om(mnor("quarters"))
};

/* the raw list of measurements, in eighths */
const RIB12 = [2, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 6, 8, 8];
const COUNTS12 = RIB12.reduce((a, v) => { a[v] = (a[v] || 0) + 1; return a; }, {});

/* step 1: the raw list. step 2: the empty scale. step 3: the plot. */
const makeBuild112 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();

  if (step === 0) {
    D.txt(ctx, "the fourteen ribbons, straight off the measuring tape", W / 2, 22,
      { size: 12.5, col: "#C9A227", font: "marker" });
    const perRow = 7, cw = (W - 90) / perRow;
    RIB12.forEach((v, k) => {
      const a = Math.min(1, Math.max(0, (frame / 5 - k * 3) / 10));
      const bx = 45 + (k % perRow) * cw, by = 62 + Math.floor(k / perRow) * 62;
      ctx.save();
      ctx.globalAlpha = a;
      D.rr(ctx, bx + 4, by, cw - 12, 40, 8);
      ctx.strokeStyle = "rgba(234,244,242,.3)"; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.restore();
      D.txt(ctx, v + "/8", bx + cw / 2 - 2, by + 24,
        { size: 15, col: "#FA7E19", font: "marker", alpha: a });
    });
    D.txt(ctx, "a list is impossible to read at a glance", W / 2, H - 14,
      { size: 13, col: "rgba(234,244,242,.65)", font: "marker" });
  } else if (step === 1) {
    D.txt(ctx, "smallest is 2/8, largest is 8/8 \u2014 so the scale runs 0 to 1 in eighths",
      W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker" });
    D.linePlot(ctx, { x: 80, y: H - 92, w: W - 160, den: 8, max: 8, counts: {},
      prog: 1, axisLabel: "length in metres" });
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    D.txt(ctx, "the scale is drawn before a single mark goes on", W / 2, H - 12,
      { size: 13, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
  } else {
    D.linePlot(ctx, { x: 80, y: H - 92, w: W - 160, den: 8, max: 8, counts: COUNTS12,
      prog: 1, col: "#388C46", showCounts: true,
      title: "Ribbon lengths for the school banner",
      axisLabel: "length in metres" });
    D.txt(ctx, "fourteen ribbons, fourteen crosses", W / 2, H - 12,
      { size: 13, col: "#34D399", font: "marker" });
  }
};

/* choose the scale — right and wrong */
const makeScale112 = (den) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const ok = den === 8;
  /* re-express the data in the chosen unit; anything that does not land is lost */
  const counts = {};
  let lost = 0;
  RIB12.forEach((v) => {
    const scaled = (v / 8) * den;
    if (Math.abs(scaled - Math.round(scaled)) < 0.001) {
      const k = Math.round(scaled);
      counts[k] = (counts[k] || 0) + 1;
    } else lost++;
  });
  D.linePlot(ctx, { x: 80, y: H - 92, w: W - 160, den: den, max: den, counts: counts,
    prog: 1, col: ok ? "#388C46" : "#C74440", axisLabel: "length in metres" });
  D.txt(ctx, ok ? "eighths \u2014 every ribbon lands on a tick"
       : "the scale is in " + (den === 2 ? "halves" : den === 4 ? "quarters" : "sixteenths"),
    W / 2, 22, { size: 13.5, col: ok ? "#34D399" : "#E0665F", font: "marker" });
  if (!ok) {
    const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
    D.txt(ctx, lost > 0 ? lost + " ribbons have nowhere to go on this scale"
         : "it works, but the ticks are twice as crowded as they need to be",
      W / 2, H - 12, { size: 13, col: "#E0665F", font: "marker", alpha: pulse + 0.4 });
  } else {
    D.txt(ctx, "the unit has to be small enough for the smallest piece in the data",
      W / 2, H - 12, { size: 12.5, col: "#C9A227", font: "marker" });
  }
};

const drawWarm112 = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the same fourteen ribbons, twice", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  const perRow = 7, cw = (W - 90) / perRow;
  RIB12.forEach((v, k) => {
    const a = D.at(f, 40 + k * 8, 120 + k * 8);
    D.txt(ctx, v + "/8", 45 + (k % perRow) * cw + cw / 2, 58 + Math.floor(k / perRow) * 26,
      { size: 13.5, col: "rgba(234,244,242,.55)", font: "mono", weight: 700, alpha: a });
  });
  D.linePlot(ctx, { x: 80, y: H - 46, w: W - 160, den: 8, max: 8, counts: COUNTS12,
    prog: D.at(f, 200, 500), col: "#6042A6", labelAll: false });
};

const drawStory112 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "ribbons for the school banner", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const perRow = 7, cw = (W - 90) / perRow;
  RIB12.forEach((v, k) => {
    const a = D.at(f, 60 + k * 18, 160 + k * 18);
    if (a <= 0) return;
    ctx.save();
    ctx.globalAlpha = a * 0.85;
    D.rr(ctx, 45 + (k % perRow) * cw + 5, 56 + Math.floor(k / perRow) * 58,
      Math.max(8, (v / 8) * (cw - 16)), 26, 4);
    ctx.fillStyle = "#FA7E19"; ctx.fill();
    ctx.restore();
    D.txt(ctx, v + "/8", 45 + (k % perRow) * cw + cw / 2 - 3,
      92 + Math.floor(k / perRow) * 58,
      { size: 10.5, col: "rgba(234,244,242,.6)", font: "mono", weight: 700, alpha: a });
  });
  if (p3 > 0) {
    D.txt(ctx, "which length turned up most often?", W / 2, H - 14,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard112 = (ctx, W, H, frame) => {
  const CYCLE = 980, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Building a line plot from a list" });
  const p1 = D.at(f, 20, 180), p2 = D.at(f, 200, 360), p3 = D.at(f, 380, 720), p4 = D.at(f, 760, 950);

  D.txt(ctx, "1 · find the smallest and the largest: 2/8 and 8/8", W / 2, 96,
    { size: 15, col: "#FA7E19", font: "marker", alpha: p1 });
  if (p2 > 0) {
    D.txt(ctx, "2 · pick the unit the data actually uses: eighths", W / 2, 128,
      { size: 15, col: "#2D70B3", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "3 · draw the scale, then mark every value once", W / 2, 160,
      { size: 15, col: "#6042A6", font: "marker", alpha: p3 });
    D.linePlot(ctx, { x: 150, y: 300, w: W - 300, den: 8, max: 8, counts: COUNTS12,
      prog: D.at(f, 400, 740), col: "#388C46", showCounts: true,
      axisLabel: "length in metres" });
  }
  if (p4 > 0) {
    D.txt(ctx, "the number of crosses must equal the number of measurements",
      W / 2, H - 26, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 30, 15, D.at(f, 850, 960), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport112 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.linePlot(ctx, { x: 46, y: H - 32, w: W - 92, den: 4, max: 4,
    counts: { 1: 2, 2: 3, 3: 1 }, prog: 1, col: "#2D70B3", r: 4.2, gapY: 12 });
};

const LESSON = {
  code: "11-2",
  storageKey: "daf-g4-t11-l2",
  title: "Make Line Plots",
  unit: "GRADE 4 · TOPIC 11 · LESSON 11-2 · 4.MD.B.4",
  math: M,
  ixl: ["GNT"],

  metas: [
    { phase: "warmup", title: "Which one <em>doesn't belong</em>?",
      lead: "Four possible scales for the same data. Every one has a defensible reason.",
      goal: "Put the scale decision on the table before anybody plots anything.",
      pull: "Only one of them fits the data comfortably.",
      rail: { launch: "Pick a scale and say why. No single intended answer.",
        monitor: ["Arguing from the smallest value", "Arguing from crowding", "Arguing from the largest value"],
        connect: "Which one would you actually draw, and why?",
        misconception: "Choosing the scale by habit rather than by the data." } },

    { phase: "launch", title: "Fourteen ribbons, <em>one list</em>",
      lead: "Fourteen ribbons for the school banner, all measured in eighths of a metre. Estimate how many were the same length as the most common one.",
      goal: "Create the need for a display — a list hides the pattern.",
      pull: "Now let us build the plot.",
      rail: { launch: "Try to answer from the list alone. Notice how hard that is.",
        monitor: ["Scanning the list", "Trying to group by eye", "Asking for a picture"],
        connect: "What is annoying about answering from a list?",
        misconception: "Believing the list and the plot hold different information." } },

    { phase: "monitor", title: "List, scale, <em>plot</em>",
      lead: "Three steps in order. The scale goes on before any mark does.",
      goal: "Make the construction sequence explicit.",
      pull: "But which unit should the scale use?",
      rail: { launch: "What has to be decided before we can draw anything?",
        monitor: ["Finding the smallest and largest", "Drawing the scale first", "Marking each value once"],
        connect: "Why draw the whole scale before plotting?",
        misconception: "Drawing only the ticks that have data on them." } },

    { phase: "monitor", title: "Choosing the <em>unit</em>",
      lead: "Try each scale on the same data and see what breaks.",
      goal: "The unit must be small enough for the smallest piece in the data.",
      pull: "Now judge some finished plots.",
      rail: { launch: "Predict what happens to 3/8 on a scale of quarters.",
        monitor: ["Noticing values with nowhere to go", "Noticing crowding", "Justifying eighths"],
        connect: "Why not use sixteenths to be safe?",
        misconception: "Assuming a finer scale is always better." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each statement about making the plot. No grading until the class commits.",
      goal: "Catch the classic construction errors as a group.",
      pull: "Two students built the plot differently.",
      rail: { launch: "Check the number of marks against the number of ribbons.",
        monitor: ["Counting the marks", "Checking the scale", "Checking equal spacing"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Leaving out ticks that have no data on them." } },

    { phase: "connect", title: "Two ways to <em>build it</em>",
      lead: "Salma tallied first, then drew the stacks. Ibrahim marked each ribbon as he read it.",
      goal: "Compare a tally-first route with a mark-as-you-go route.",
      pull: "Let us build it on the board.",
      rail: { launch: "Show both. Ask which one is easier to check.",
        monitor: ["Tallying first", "Marking one at a time", "Crossing off the list"],
        connect: "Which method makes it easy to prove nothing was missed?",
        misconception: "Believing only one order is allowed." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Range, unit, scale, marks. In that order, every time.",
      goal: "The moment the construction routine is taught.",
      pull: "Say the four steps.",
      rail: { launch: "Draw all four steps with them.",
        monitor: ["Predicting the unit", "Predicting a stack height", "Checking the total"],
        connect: "Who can say all four steps without looking?",
        misconception: "Skipping the range and guessing the scale." } },

    { phase: "synth", title: "The routine \u2014 <em>and why it works</em>",
      lead: "Four steps that work for any set of fractional measurements.",
      goal: "Generalise the process, not just this plot.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the four steps aloud, once.",
        monitor: ["Naming the unit", "Drawing every tick", "Checking the count"],
        connect: "What is the very last check you should do?",
        misconception: "Forgetting to check the marks against the data count." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on choosing a scale.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Find the smallest piece in the data.",
        monitor: ["Identifying the smallest unit", "Choosing quarters", "Choosing halves"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Choosing halves because most values are halves." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: using a line plot to answer harder questions.",
      rail: { launch: "Three students name the four steps.",
        monitor: ["Can build one unaided", "Still needs the steps", "Ready for problems"],
        connect: "Who is plotting something at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [den, setDen] = useState(8);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Which scale doesn't belong for data measured in eighths?"
          cards={[
            { id: "b1", text: "halves", why: "Too coarse — most of the ribbons would have nowhere to go." },
            { id: "b2", text: "quarters", why: "Still too coarse — 3/8 and 5/8 land between ticks." },
            { id: "b3", text: "eighths", why: "The only one where every ribbon lands exactly on a tick." },
            { id: "b4", text: "sixteenths", why: "The only one with twice as many ticks as the data needs." }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawStory112} height={256} award={award}
          label="How many ribbons share the most common length?" min={1} max={10} start={3} unit="ribbons"
          after="Locked. A list is a terrible way to answer that."
          note="Every ribbon was measured to the nearest eighth of a metre." />;

      case 2:
        return <ExploreChips draw={makeBuild112(step)} height={256}
          label="Build it in order" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the list" }, { v: 1, label: "draw the scale" }, { v: 2, label: "mark every value" }]}
          caption={<MathEl omml={M.tally} size="xl" display="block" />}
          footnote="The number of crosses must match the number of ribbons." />;

      case 3:
        return <ExploreChips draw={makeScale112(den)} height={256}
          label="Try each scale on the same data" value={den}
          onPick={(v) => setDen(v)}
          chips={[{ v: 2, label: "halves" }, { v: 4, label: "quarters" },
                  { v: 8, label: "eighths" }, { v: 16, label: "sixteenths" }]}
          caption={<MathEl omml={M.scaleChoice} size="lg" display="block" />}
          footnote="Too coarse and the data will not fit; too fine and the plot is hard to read." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "draw every tick, even empty ones", target: "yes" },
                  { id: "c2", text: "only draw ticks that have data", target: "no" },
                  { id: "c3", text: "14 ribbons means 14 crosses", target: "yes" },
                  { id: "c4", text: "14 ribbons means 6 crosses", target: "no" }]}
          targets={[{ id: "yes", label: "good practice" },
                    { id: "no", label: "not yet — the plot would lie" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Salma's way — tally first", omml: M.tally, h: 92,
            quote: "I counted how many of each length, then drew the stacks." }}
          right={{ name: "Ibrahim's way — mark as you read", draw: drawSupport112, h: 92,
            quote: "I put a cross for each ribbon and crossed it off my list." }}
          same={["Both give the same plot", "Both use every measurement once", "Both need the scale drawn first"]}
          diff={["Salma counts before drawing", "Ibrahim draws as he goes", "Ibrahim's list proves nothing was missed"]} />;

      case 6:
        return <BoardScreen draw={drawBoard112} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "find the range, pick the unit, draw the scale, mark every value" }]}
          hand={"smallest and largest · choose the unit · draw every tick · one mark per measurement"}
          cards={[{ title: "The unit we chose", omml: M.eighths, note: "the data decided it, not us" },
                  { title: "Tap for the final check", omml: M.scaleChoice, revealOmml: M.tally, reveal: true,
                    note: "count the crosses against the list" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A set of measurements contains 1/2, 3/4, 1 and 1/4. Which scale should the line plot use?"
          omml={M.swyk}
          options={[{ v: "a", text: "wholes" }, { v: "b", text: "halves" }, { v: "c", text: "quarters" }, { v: "d", text: "eighths" }]}
          right="c"
          support={{ yes: "Yes — quarters is the smallest piece in the data.",
            notYet: "Not yet — 3/4 has nowhere to go on a scale of halves.",
            draw: drawSupport112, h: 96, hint: "Look for the smallest piece anyone actually measured." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Measure eight objects at home to the nearest quarter unit and draw the line plot." />;

      default: return null;
    }
  }
};
