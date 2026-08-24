/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-1 · Understand Decimal Place Value
   Standard 5.NBT.A.3a   I can ... read and write decimals to thousandths, and
   say what each place is worth.
   =========================================================================== */

const M = {
  places: om(mnor("ones \u00b7 tenths \u00b7 hundredths \u00b7 thousandths")),
  thousandth: om(mfrac(1, 1000), mnor(" = 0.001")),
  expanded: om(mnor("3.045 = 3 + "), mfrac(0, 10), mnor(" + "), mfrac(4, 100), mnor(" + "), mfrac(5, 1000)),
  tenTimes: om(mnor("each place to the right is a tenth of the one before")),
  zeroHolds: om(mnor("the zero in the tenths place is holding a seat")),
  wordForm: om(mnor("three and forty five thousandths")),
  rule: om(mnor("read the whole \u00b7 say \u201cand\u201d \u00b7 read the rest, then name the last place")),
  swyk: om(mnor("which digit is in the hundredths place of 6.207?")),
  swykAnswer: om(mnor("zero"))
};

/* the chart, one place highlighted at a time */
const makeChart171 = (place) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.decChart(ctx, { x: 66, y: 42, w: W - 132, digits: "3.045", prog: 1, highlight: place,
    caption: "three and forty five thousandths" });
  const worth = ["3 ones = 3", "0 tenths = 0", "4 hundredths = 0.04", "5 thousandths = 0.005"];
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, worth[place], W / 2, H - 34,
    { size: 16, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
  D.txt(ctx, place === 1 ? "a zero still occupies its place \u2014 it is not nothing"
       : "the place decides what the digit is worth",
    W / 2, H - 12, { size: 12.5, col: "#C9A227", font: "marker" });
};

/* the ten-times-smaller staircase */
const makeStair171 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const labels = ["1", "0.1", "0.01", "0.001"];
  const names = ["one", "one tenth", "one hundredth", "one thousandth"];
  const bw = (W - 90) / 4;
  for (let k = 0; k <= step && k < 4; k++) {
    const bx = 45 + k * bw;
    const a = k === step ? 0.65 + Math.sin(frame / 14) * 0.3 : 1;
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, bx + 8, 56 + k * 12, bw - 16, 56, 9);
    ctx.strokeStyle = ["#6042A6", "#2D70B3", "#388C46", "#FA7E19"][k];
    ctx.lineWidth = k === step ? 2.4 : 1.4;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, labels[k], bx + bw / 2, 84 + k * 12,
      { size: 21, col: ["#6042A6", "#2D70B3", "#388C46", "#FA7E19"][k], font: "marker", alpha: a });
    D.txt(ctx, names[k], bx + bw / 2, 126 + k * 12,
      { size: 10.5, col: "rgba(234,244,242,.6)", font: "mono", weight: 600, alpha: a });
    if (k > 0) {
      D.txt(ctx, "\u00f7 10", bx - 2, 62 + k * 12,
        { size: 11, col: "#C9A227", font: "mono", weight: 700, alpha: a });
    }
  }
  D.txt(ctx, "each step to the right is ten times smaller", W / 2, 28,
    { size: 13, col: "rgba(234,244,242,.68)", font: "marker" });
  D.txt(ctx, step === 3 ? "a thousandth is a tenth of a hundredth"
       : "keep going right",
    W / 2, H - 12, { size: 13, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawWarm171 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.decChart(ctx, { x: 66, y: 48, w: W - 132, digits: "3.045",
    prog: D.at(f, 20, 420) });
  D.txt(ctx, "a number with three digits after the point", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 440, 530) });
};

const drawStory171 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the 100 metre sprint at sports day", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const names = [["Layla", "13.402"], ["Reem", "13.42"], ["Sana", "13.4"]];
  names.forEach((r, k) => {
    const a = D.at(f, 60 + k * 90, 190 + k * 90);
    D.txt(ctx, r[0], W / 2 - 96, 74 + k * 40, { size: 16, col: "#EAF4F2", font: "marker", alpha: a });
    D.txt(ctx, r[1] + " s", W / 2 + 96, 74 + k * 40, { size: 20, col: "#FA7E19", font: "marker", alpha: a });
  });
  if (p3 > 0) {
    D.txt(ctx, "how many places after the point can a time need?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard171 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Every place is a tenth of the one before" });
  const p1 = D.at(f, 20, 300), p3 = D.at(f, 460, 680), p4 = D.at(f, 720, 920);

  D.decChart(ctx, { x: 170, y: 96, w: W - 340, digits: "3.045", prog: p1, highlight: 3 });

  if (p3 > 0) {
    D.txt(ctx, "3.045 = 3 + 0.04 + 0.005", W / 2, 248,
      { size: 24, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "read as: three and forty five thousandths", W / 2, 288,
      { size: 17, col: "#34D399", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "the zero in the tenths place is holding a seat, not adding nothing",
      W / 2, 338, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "drop it and the number becomes 3.45 \u2014 ten times bigger in that place",
      W / 2, H - 24, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 800, 900) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 860, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport171 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.decChart(ctx, { x: 26, y: 4, w: W - 52, digits: "6.207", prog: 1, highlight: 2, hRow: 28 });
};

const LESSON = {
  code: "17-1",
  storageKey: "daf-g4-t17-l1",
  title: "Understand Decimal Place Value",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-1 · 5.NBT.A.3a",
  math: M,
  ixl: ["5QD", "BZ2"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A place value chart fills in, and this time it crosses the decimal point. No question yet.",
      goal: "Meet the thousandths place before it is named.",
      pull: "There is one more column than you are used to.",
      rail: { launch: "Describe the chart. Do not read the number aloud yet.",
        monitor: ["Naming tenths and hundredths", "Noticing the extra column", "Noticing the zero"],
        connect: "What could the last column be called?",
        misconception: "Reading the digits after the point as a whole number." } },

    { phase: "launch", title: "Times at the <em>sprint</em>",
      lead: "Three sprint times are shown: 13.402, 13.42 and 13.4 seconds. How many places after the point can a time need?",
      goal: "Create the need for a place beyond hundredths.",
      pull: "Now let us name the places.",
      rail: { launch: "Commit to a number of places before we start.",
        monitor: ["Saying two", "Saying three", "Asking why times need so many"],
        connect: "Why would a race need thousandths of a second?",
        misconception: "Thinking 13.4 is longer than 13.402 because it has fewer digits." } },

    { phase: "monitor", title: "What each place is <em>worth</em>",
      lead: "Tap a column and read what that digit is actually worth.",
      goal: "Separate the digit from its value.",
      pull: "So how do the places relate to each other?",
      rail: { launch: "Predict the value before you tap.",
        monitor: ["Naming the place", "Naming the value", "Reading the digit alone"],
        connect: "What is the zero in the tenths place doing?",
        misconception: "Saying the 4 in 3.045 is worth four." } },

    { phase: "monitor", title: "Ten times <em>smaller</em>",
      lead: "One, one tenth, one hundredth, one thousandth. Each is a tenth of the last.",
      goal: "Extend the base-ten pattern to the right of the point.",
      pull: "Now judge some readings.",
      rail: { launch: "Predict the next step before you tap.",
        monitor: ["Dividing by ten", "Naming the places", "Losing track of the zeros"],
        connect: "How is this the same as the pattern in Topic 1?",
        misconception: "Believing the pattern changes at the decimal point." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each statement. No grading until the class commits.",
      goal: "Test place-value reading under scrutiny.",
      pull: "Two students read the same number differently.",
      rail: { launch: "For each one, point at the place being talked about.",
        monitor: ["Locating the place", "Reading the value", "Counting the places"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Calling the third place after the point 'hundredths'." } },

    { phase: "connect", title: "Two ways to <em>say it</em>",
      lead: "Noura read it digit by digit. Ziad named the last place.",
      goal: "The proper reading names the final place.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one tells you the size.",
        monitor: ["Reading digit by digit", "Naming the last place", "Using the word 'and'"],
        connect: "Which reading would help you compare two numbers?",
        misconception: "Saying 'point zero four five' as if it were a code." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Three and forty five thousandths. The zero is holding a seat.",
      goal: "The moment decimal place value is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Fill the chart with them, column by column.",
        monitor: ["Naming each place", "Reading the whole number", "Explaining the zero"],
        connect: "What happens if we delete the zero?",
        misconception: "Treating a placeholder zero as removable." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence for reading any decimal aloud correctly.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Reading the whole first", "Saying 'and'", "Naming the last place"],
        connect: "Where does the word 'and' belong?",
        misconception: "Using 'and' inside the whole number part." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on naming places.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Count the places from the point.",
        monitor: ["Counting to hundredths", "Answering 2", "Answering 0"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Counting the ones digit as the first place." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: comparing decimals that go to thousandths.",
      rail: { launch: "Three students name a place and its value.",
        monitor: ["Names all four places", "Still reads digits", "Ready to compare"],
        connect: "Who is reading a decimal at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [place, setPlace] = useState(0);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm171} height={256} award={award}
          notices={["There are four columns", "One column is new", "There is a zero after the point", "The point sits after the ones"]}
          wonders={["What is the last place called?", "Why is there a zero?", "How do I say this aloud?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory171} height={256} award={award}
          label="How many places after the point?" min={1} max={5} start={2} unit="places"
          after="Locked. Now let us name every place properly."
          note="A close race can be decided by a thousandth of a second." />;

      case 2:
        return <ExploreChips draw={makeChart171(place)} height={256}
          label="What is each digit worth?" value={place}
          onPick={(v) => setPlace(v)}
          chips={[{ v: 0, label: "ones" }, { v: 1, label: "tenths" },
                  { v: 2, label: "hundredths" }, { v: 3, label: "thousandths" }]}
          caption={<MathEl omml={M.expanded} size="lg" display="block" />}
          footnote="The digit tells you how many. The place tells you how big." />;

      case 3:
        return <ExploreChips draw={makeStair171(step)} height={256}
          label="Walk to the right" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "one" }, { v: 1, label: "tenth" },
                  { v: 2, label: "hundredth" }, { v: 3, label: "thousandth" }]}
          caption={<MathEl omml={M.tenTimes} size="lg" display="block" />}
          footnote="This is the same base ten pattern as Topic 1, continued to the right." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "a1", text: "in 3.045 the 4 is hundredths", target: "yes" },
                  { id: "a2", text: "in 3.045 the 4 is tenths", target: "no" },
                  { id: "a3", text: "0.001 is one thousandth", target: "yes" },
                  { id: "a4", text: "0.001 is one hundredth", target: "no" }]}
          targets={[{ id: "yes", label: "correct — count from the point" },
                    { id: "no", label: "not yet — count again" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Noura's way — digit by digit", omml: M.places, h: 92,
            quote: "Three point zero four five." }}
          right={{ name: "Ziad's way — name the last place", omml: M.wordForm, h: 92,
            quote: "Three and forty five thousandths." }}
          same={["Both describe 3.045", "Both are understood", "Both keep the zero"]}
          diff={["Noura reads symbols", "Ziad reads the value", "Only Ziad's tells you the size"]} />;

      case 6:
        return <BoardScreen draw={drawBoard171} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "read the whole, say and, read the rest, then name the last place" }]}
          hand={"whole number · 'and' · the digits after the point · the name of the last place"}
          cards={[{ title: "The number we read", omml: M.wordForm, note: "three and forty five thousandths" },
                  { title: "Tap for the placeholder", omml: M.thousandth, revealOmml: M.zeroHolds, reveal: true,
                    note: "the zero cannot be dropped" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Which digit is in the hundredths place of 6.207?" omml={M.swyk}
          options={[{ v: "a", text: "6" }, { v: "b", text: "2" }, { v: "c", text: "0" }, { v: "d", text: "7" }]}
          right="c"
          support={{ yes: "Yes — tenths is 2, hundredths is 0, thousandths is 7.",
            notYet: "Not yet — count the places starting just after the point.",
            draw: drawSupport171, h: 100, hint: "First place tenths, second place hundredths." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a decimal at home with three places and read it aloud the proper way." />;

      default: return null;
    }
  }
};
