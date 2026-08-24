/* ===========================================================================
   SAVVAS enVision Mathematics · Grade 4 · Topic 1
   LESSON 1-1 · Numbers Through One Million            Standard: 4.NBT.A.2
   I can ... read and write multi-digit whole numbers in standard form,
            expanded form and word form, using periods.
   =========================================================================== */

const M = {
  jeddahStandard: om(mt("4,697,000")),
  expandedShort: om(mt("4,000,000+600,000+90,000+7,000")),
  periodValue: om(mt("4 millions=4,000,000")),
  tenTimes: om(mt("1 million=1,000 thousands")),
  standard305: om(mt("305,072")),
  expanded305: om(mt("300,000+5,000+70+2")),
  compareForms: om(mt("62,415=60,000+2,000+400+10+5")),
  sixDigit: om(mt("874,203")),
  onePeriod: om(mnor("each period has "), mt("3"), mnor(" places")),
  millionAsFrac: om(mnor("1 million"), mt("=1,000×1,000"))
};

/* ---- lesson-specific drawings ------------------------------------------- */

/* Warm-Up: the place-value chart builds itself, period by period */
const drawChartIntro = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p = D.at(f, 0, 240);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvChart(ctx, { x: 22, y: 34, w: W - 44, digits: "4697000", slots: 9, prog: p, t: frame });
  D.txt(ctx, "the same three places, over and over", W / 2, H - 20,
    { size: 12, col: "#C9A227", font: "marker", alpha: D.at(f, 250, 330) });
};

/* Launch: Jeddah's population arriving digit by digit */
const drawJeddah = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 90), p2 = D.at(f, 80, 240), p3 = D.at(f, 250, 360);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  /* a skyline for Jeddah */
  const base = H - 30;
  const towers = [40, 74, 52, 96, 66, 120, 58, 82, 46];
  towers.forEach((h, i) => {
    const a = D.at(p1, i / towers.length, i / towers.length + 0.4);
    if (a <= 0) return;
    const bw = (W - 60) / towers.length;
    const bx = 30 + i * bw;
    ctx.save();
    ctx.globalAlpha = a * 0.5;
    D.rr(ctx, bx + 3, base - h, bw - 6, h, 3);
    ctx.fillStyle = i === 5 ? "#C9A227" : "#12857C";
    ctx.fill();
    ctx.restore();
  });
  D.txt(ctx, "Jeddah", W / 2, 26, { size: 13, col: "#C9A227", font: "marker", alpha: p1 });
  if (p2 > 0) {
    const digits = "4697000";
    const cw = 34, x0 = W / 2 - (digits.length * cw) / 2;
    for (let i = 0; i < digits.length; i++) {
      const a = D.at(p2, i / digits.length, i / digits.length + 0.3);
      if (a <= 0) continue;
      D.txt(ctx, digits[i], x0 + i * cw + cw / 2, H / 2 - 8,
        { size: 30, col: "#EAF4F2", font: "marker", alpha: a });
    }
    if (p3 > 0) {
      [1, 4].forEach((idx, n) => {
        const a = D.at(p3, n * 0.3, n * 0.3 + 0.5);
        D.txt(ctx, ",", x0 + idx * cw + cw - 3, H / 2 + 6,
          { size: 30, col: "#C9A227", font: "marker", alpha: a });
      });
      D.txt(ctx, "four million, six hundred ninety-seven thousand", W / 2, H / 2 + 44,
        { size: 13, col: "#C9A227", font: "marker", alpha: D.at(f, 330, 420) });
    }
  }
};

/* Monitor A: pick a period, see it light up in the chart */
const makeChartFocus = (hi) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvChart(ctx, { x: 22, y: 30, w: W - 44, digits: "874203", slots: 9, prog: 1, highlight: hi, t: frame });
  const names = ["hundred thousands", "ten thousands", "thousands", "hundreds", "tens", "ones"];
  const vals = ["800,000", "70,000", "4,000", "200", "0", "3"];
  D.txt(ctx, vals[hi] + "  —  " + names[hi], W / 2, H - 26,
    { size: 15, col: "#C9A227", font: "marker" });
};

/* Monitor B: expanded form assembling under the number */
const makeExpanded = (shown) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const digits = "62415";
  const parts = ["60,000", "2,000", "400", "10", "5"];
  const cw = 40, x0 = W / 2 - (digits.length * cw) / 2;
  for (let i = 0; i < digits.length; i++) {
    const on = i < shown;
    D.txt(ctx, digits[i], x0 + i * cw + cw / 2, 46,
      { size: 30, col: on ? "#C9A227" : "#EAF4F2", font: "marker" });
    if (on) {
      const tx = x0 + i * cw + cw / 2;
      const ty = 96 + i * 34;
      D.marker(ctx, [[tx, 66], [tx, ty - 12]], 1, "rgba(201,162,39,.45)", 1.4);
      D.txt(ctx, parts[i], tx, ty, { size: 15, col: "#34D399", font: "marker" });
    }
  }
  if (shown === 5) {
    D.txt(ctx, "60,000 + 2,000 + 400 + 10 + 5", W / 2, H - 22,
      { size: 15, col: "#C9A227", font: "marker" });
  }
};

/* Board: periods, commas, and reading the number out loud */
const drawBoard11 = (ctx, W, H, frame) => {
  const CYCLE = 700, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "How do we read a big number?" });
  const p1 = D.at(f, 20, 130), p2 = D.at(f, 120, 260), p3 = D.at(f, 250, 400), p4 = D.at(f, 400, 540);

  const digits = "4697000";
  const cw = 40, x0 = W / 2 - (digits.length * cw) / 2, yD = 132;
  for (let i = 0; i < digits.length; i++) {
    const a = D.at(p1, i / digits.length, i / digits.length + 0.35);
    if (a <= 0) continue;
    D.txt(ctx, digits[i], x0 + i * cw + cw / 2, yD, { size: 32, col: "#EAF4F2", font: "marker", alpha: a });
  }

  /* group into periods of three, from the right */
  if (p2 > 0) {
    const groups = [[0, 1], [1, 4], [4, 7]];
    const labels = ["millions", "thousands", "ones"];
    const cols = ["#6042A6", "#2D70B3", "#388C46"];
    groups.forEach((g, n) => {
      const a = D.at(p2, n * 0.3, n * 0.3 + 0.5);
      if (a <= 0) return;
      const gx = x0 + g[0] * cw + 3, gw = (g[1] - g[0]) * cw - 6;
      ctx.save();
      ctx.globalAlpha = a * 0.9;
      D.rr(ctx, gx, yD - 30, gw, 58, 8);
      ctx.strokeStyle = cols[n]; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
      D.txt(ctx, labels[n], gx + gw / 2, yD + 52, { size: 12, col: cols[n], font: "marker", alpha: a });
    });
  }

  /* commas land between the periods */
  if (p3 > 0) {
    [1, 4].forEach((idx, n) => {
      const a = D.at(p3, n * 0.35, n * 0.35 + 0.5);
      D.txt(ctx, ",", x0 + idx * cw - 2, yD + 12, { size: 34, col: "#C9A227", font: "marker", alpha: a });
    });
    D.txt(ctx, "a comma goes between the periods", W / 2, yD + 92,
      { size: 13, col: "#C9A227", font: "marker", alpha: D.at(f, 300, 380) });
  }

  if (p4 > 0) {
    const yb = H - 52;
    D.marker(ctx, [[60, yb - 30], [W - 60, yb - 30]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "read each period, then say its name", W / 2, yb - 6,
      { size: 15, col: "#EAF4F2", font: "marker", alpha: D.at(f, 430, 500) });
    D.txt(ctx, "four million, six hundred ninety-seven thousand", W / 2, yb + 20,
      { size: 17, col: "#C9A227", font: "marker", alpha: D.at(f, 470, 540) });
    D.star8(ctx, W - 46, yb, 16, D.at(f, 500, 600), "rgba(201,162,39,.7)", 1.6);
  }
};

/* small chart used in the SWYK support panel */
const drawSupport11 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvChart(ctx, { x: 14, y: 8, w: W - 28, digits: "305072", slots: 6, prog: 1, rowH: 24 });
};

/* ---- the lesson ---------------------------------------------------------- */
const LESSON = {
  code: "1-1",
  storageKey: "daf-g4-t1-l1",
  title: "Numbers Through One Million",
  unit: "GRADE 4 · TOPIC 1 · LESSON 1-1 · 4.NBT.A.2",
  math: M,
  ixl: ["4R6", "7WT", "5G4", "2PZ", "Z47"],

  metas: [
    {
      phase: "warmup",
      title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "One chart. No question yet. Every noticing counts.",
      goal: "An invitation — every student has something to say.",
      pull: "Those repeating words have a name. We will get to it.",
      rail: {
        launch: "I am not asking a question yet. Just look, then tell me one thing.",
        monitor: ["Noticing the labels repeat", "Noticing the groups of three", "Noticing the colours change"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the chart right to left instead of naming places from the right."
      }
    },
    {
      phase: "launch",
      title: "How many people live in <em>Jeddah</em>?",
      lead: "About 4,697,000. Say that out loud. Where do you pause?",
      goal: "Create the need — a big number is easier to read in chunks.",
      pull: "Estimate first, then we will build the number together.",
      rail: {
        launch: "Try to say it without stopping. Now try again and pause where the commas are.",
        monitor: ["Reading digit by digit", "Pausing at the commas", "Naming millions and thousands"],
        connect: "What did the commas do for your voice?",
        misconception: "Reading 4,697,000 as four six nine seven. Do not correct it — ask them to try again with pauses."
      }
    },
    {
      phase: "monitor",
      title: "Every digit has a <em>place</em> and a <em>value</em>",
      lead: "Tap a place. Watch what that digit is actually worth.",
      goal: "Separate the digit from the value it carries.",
      pull: "Now let us write all of those values down at once.",
      rail: {
        launch: "Predict the value before you tap.",
        monitor: ["Reading the value off the chart", "Counting zeros", "Using the period name"],
        connect: "Why is the 7 worth 70,000 and not 7?",
        misconception: "Saying the digit instead of its value."
      }
    },
    {
      phase: "monitor",
      title: "Break it apart — <em>expanded form</em>",
      lead: "Add one digit at a time and watch the value drop out underneath.",
      goal: "Expanded form is the chart, written as a sum.",
      pull: "Three ways to write one number. Can you match them?",
      rail: {
        launch: "Predict the next value before you reveal it.",
        monitor: ["Writing each value with its zeros", "Skipping the zero digit", "Checking the sum"],
        connect: "What happens to a place that holds a zero?",
        misconception: "Writing 62,415 as 6 + 2 + 4 + 1 + 5."
      }
    },
    {
      phase: "monitor",
      title: "Match the <em>three forms</em>",
      lead: "Standard, expanded, and word form all describe the same number.",
      goal: "Move fluently between the three representations.",
      pull: "Two students matched these differently. Let us look.",
      rail: {
        launch: "There is no single right order — only a right match.",
        monitor: ["Matching by the first digit", "Matching by counting places", "Reading the word form aloud"],
        connect: "How did you know that one belonged there?",
        misconception: "Matching by how long the number looks."
      }
    },
    {
      phase: "connect",
      title: "Two ways to <em>read it</em>",
      lead: "Sara reads by periods. Khalid counts places first. Both are correct.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: {
        launch: "Show both without judging either.",
        monitor: ["Seeing the periods inside the counting", "Preferring the chart", "Reading straight off the commas"],
        connect: "Where do both students use the number three?",
        misconception: "Treating one method as the real method."
      }
    },
    {
      phase: "synth",
      title: "On the <em>board</em>",
      lead: "Group the digits in threes from the right. Put a comma between the groups. Read each group, then say its name.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: {
        launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Grouping from the right", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Grouping in threes from the left."
      }
    },
    {
      phase: "synth",
      title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: {
        launch: "Read it together, one voice.",
        monitor: ["Linking periods to commas", "Testing it on a new number", "Asking about a zero in the middle"],
        connect: "Does the rule still work when a period holds a zero?",
        misconception: "Dropping a period that is all zeros when reading aloud."
      }
    },
    {
      phase: "swyk",
      title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: {
        launch: "Two minutes. Write your thinking, not just your answer.",
        monitor: ["Using the chart", "Counting places", "Checking the zero in the tens"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Ignoring the zero and reading three hundred five thousand seventy-two as 305,72."
      }
    },
    {
      phase: "connect",
      title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: what is a digit worth compared to the one on its right?",
      rail: {
        launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the chart", "Ready for place value relationships"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [place, setPlace] = useState(0);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return (
          <NoticeWonder draw={drawChartIntro} height={262} award={award}
            notices={["The labels repeat", "There are groups of three", "Each group has a name", "Some places are empty"]}
            wonders={["Why groups of three?", "What comes after millions?", "Why the commas?"]} />
        );

      case 1:
        return (
          <LaunchEstimate draw={drawJeddah} height={268} award={award}
            label="How many digits does Jeddah's population have?"
            min={4} max={10} start={6} unit="digits"
            after="Locked. Now let us look at what each of those digits is worth."
            note="A number this big is easier to say in chunks than all at once." />
        );

      case 2:
        return (
          <ExploreChips draw={makeChartFocus(place)} height={250}
            label="Tap a place in 874,203"
            value={place}
            onPick={(v) => setPlace(v)}
            chips={[
              { v: 0, label: "8" }, { v: 1, label: "7" }, { v: 2, label: "4" },
              { v: 3, label: "2" }, { v: 4, label: "0" }, { v: 5, label: "3" }
            ]}
            caption={<MathEl omml={M.sixDigit} size="xl" display="block" />}
            footnote="The digit tells you how many. The place tells you how much." />
        );

      case 3:
        return (
          <ExploreChips draw={makeExpanded(shown)} height={272}
            label="Reveal the value of each digit in 62,415"
            value={shown}
            onPick={(v) => setShown(v)}
            chips={[1, 2, 3, 4, 5].map((n) => ({ v: n, label: n + (n === 1 ? " digit" : " digits") }))}
            caption={<MathEl omml={M.compareForms} size="lg" display="block" />}
            footnote="Expanded form is just the chart, written as a sum." />
        );

      case 4:
        return (
          <CardSort award={award} columns={3}
            items={[
              { id: "s1", text: "305,072", target: "t1" },
              { id: "s2", text: "350,072", target: "t2" },
              { id: "s3", text: "305,702", target: "t3" }
            ]}
            targets={[
              { id: "t1", label: "three hundred five thousand, seventy-two" },
              { id: "t2", label: "three hundred fifty thousand, seventy-two" },
              { id: "t3", label: "three hundred five thousand, seven hundred two" }
            ]} />
        );

      case 5:
        return (
          <CompareConnect award={award}
            left={{
              name: "Sara's way — read by periods", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 400, 0, 140);
                D.txt(ctx, "4 | 697 | 000", W / 2, H / 2 - 8, { size: 20, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "million · thousand · ones", W / 2, H / 2 + 22,
                  { size: 11, col: "#C9A227", font: "marker", alpha: D.at(frame % 400, 120, 220) });
              },
              quote: "I chop it into threes and name each chunk."
            }}
            right={{
              name: "Khalid's way — count the places", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                D.pvChart(ctx, { x: 10, y: 6, w: W - 20, digits: "4697000", slots: 7, prog: 1, rowH: 21 });
              },
              quote: "I put it in the chart and read the biggest place."
            }}
            same={["Both get four million, six hundred ninety-seven thousand",
                   "Both use groups of three",
                   "Both start from the left to say it"]}
            diff={["Sara chunks, Khalid counts places",
                   "Khalid needs the chart, Sara does not",
                   "Sara is faster once she trusts the commas"]} />
        );

      case 6:
        return <BoardScreen draw={drawBoard11} height={430} />;

      case 7:
        return (
          <RuleScreen award={award}
            ommls={[{ omml: M.onePeriod, alt: "each period has three places" }]}
            hand={"Group in threes from the right · comma between periods · read each period, then say its name"}
            cards={[
              { title: "The number we built", omml: M.jeddahStandard, note: "four million, six hundred ninety-seven thousand" },
              { title: "Tap to see it expanded", omml: M.standard305, revealOmml: M.expanded305, reveal: true,
                note: "the zero in the hundreds place holds the place open" }
            ]} />
        );

      case 8:
        return (
          <ShowWhatYouKnow award={award}
            prompt="Which number is three hundred five thousand, seventy-two?"
            options={[{ v: "a", text: "35,072" }, { v: "b", text: "305,072" }, { v: "c", text: "305,720" }, { v: "d", text: "350,072" }]}
            right="b"
            support={{
              yes: "Yes — the hundreds place holds a zero, and the tens hold 7.",
              notYet: "Not yet — put it in the chart first.",
              draw: drawSupport11, h: 84,
              hint: "Which places have nothing in them? A zero holds that place open."
            }} />
        );

      case 9:
        return (
          <Closing game={game} omml={M.jeddahStandard}
            action="Find a number with more than four digits at home — on a bill, a car, a phone — and read it out loud by periods." />
        );

      default:
        return null;
    }
  }
};
