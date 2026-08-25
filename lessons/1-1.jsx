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
const makeChartFocus = (hi, onTap) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvChart(ctx, { x: 22, y: 30, w: W - 44, digits: "874203", slots: 9, prog: 1, highlight: hi, t: frame, onTap });
  const names = ["hundred thousands", "ten thousands", "thousands", "hundreds", "tens", "ones"];
  const vals = ["800,000", "70,000", "4,000", "200", "0", "3"];
  D.txt(ctx, vals[hi] + "  —  " + names[hi], W / 2, H - 26,
    { size: 15, col: "#C9A227", font: "marker" });
};

/* Monitor B: expanded form assembling under the number */
const makeExpanded = (shown, onTap) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const digits = "62415";
  const parts = ["60,000", "2,000", "400", "10", "5"];
  const cw = 40, x0 = W / 2 - (digits.length * cw) / 2;
  for (let i = 0; i < digits.length; i++) {
    const on = i < shown;
    if (onTap) D.tap(ctx, { x: x0 + i * cw, y: 24, w: cw, h: 44, value: i + 1, on: onTap });
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
      title: "The lantern opens a <em>damaged census</em>",
      lead: "Omar and Zayd find seven surviving digits, but the headings and commas are missing.",
      goal: "Notice the repeated place-value structure before anyone names a rule.",
      pull: "A city-planning record is hidden in those boxes.",
      rail: {
        launch: "This is our fictional frame. Ask only: what survives, and what seems to be missing?",
        monitor: ["Noticing the groups of three", "Noticing repeating place names", "Wondering where commas belong"],
        connect: "Which noticing could help an archivist rebuild the page?",
        misconception: "Treating the lantern as an answer machine. It reveals evidence, never a solution."
      }
    },
    {
      phase: "launch",
      title: "Numeria needs a <em>trustworthy population record</em>",
      lead: "The simulated planning folio uses 4,697,000. How should a city planner read and store it?",
      goal: "Connect large-number notation to a realistic civic data task.",
      pull: "Lock a prediction before the place-value model appears.",
      rail: {
        launch: "Clarify that 4,697,000 is simulated planning data, not a live Jeddah census figure.",
        monitor: ["Reading digit by digit", "Pausing at commas", "Naming millions and thousands"],
        connect: "How do the commas make this record easier to check aloud?",
        misconception: "Presenting a simulated number as a current population fact."
      }
    },
    {
      phase: "monitor",
      title: "Zayd asks: what is each digit <em>worth</em>?",
      lead: "A digit is not enough evidence. Its position decides its value.",
      goal: "Separate the digit from the value it carries in the civic record.",
      pull: "Omar wants every value written so another person can audit it.",
      rail: {
        launch: "Predict the value before selecting a place.",
        monitor: ["Reading the value from position", "Counting zeros", "Using a period name"],
        connect: "Why can the same digit represent different amounts?",
        misconception: "Saying the digit instead of its value."
      }
    },
    {
      phase: "monitor",
      title: "Omar rebuilds the <em>missing values</em>",
      lead: "Each recovered digit becomes one part of an expanded record.",
      goal: "Use expanded form as an auditable version of the place-value chart.",
      pull: "Three damaged records now need to be matched.",
      rail: {
        launch: "Ask which value will appear before revealing the next part.",
        monitor: ["Writing each value with zeros", "Skipping a zero digit correctly", "Checking the complete sum"],
        connect: "How does expanded form help someone detect a copying error?",
        misconception: "Writing 62,415 as 6 + 2 + 4 + 1 + 5."
      }
    },
    {
      phase: "monitor",
      title: "Three records need <em>correct matches</em>",
      lead: "Standard form and word form must point to exactly the same quantity.",
      goal: "Move between representations while protecting every placeholder zero.",
      pull: "The class has two methods for checking the matches.",
      rail: {
        launch: "Do not grade until the class commits to all three matches.",
        monitor: ["Matching from the greatest place", "Checking placeholder zeros", "Reading the words aloud"],
        connect: "Which feature gave you the strongest evidence?",
        misconception: "Matching records only because they look similar in length."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two methods</em>",
      lead: "The fictional boys step back. Real student strategies become the dialogue.",
      goal: "Compare methods and name a reusable strategy in the Sijill.",
      pull: "Zayd will draw the shared structure on the Evidence Board.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing periods inside the chart", "Preferring one representation", "Explaining why both work"],
        connect: "Where do both methods use groups of three?",
        misconception: "Treating one valid representation as the only real method."
      }
    },
    {
      phase: "synth",
      title: "The rule enters the <em>Evidence Folio</em>",
      lead: "Group from the right, mark the periods, then read each period by name.",
      goal: "Build the rule publicly from the strategies students just compared.",
      pull: "This place-value method has its own journey through history.",
      rail: {
        launch: "Draw with the class rather than presenting a completed rule.",
        monitor: ["Predicting the next grouping", "Starting from the right", "Restating the rule"],
        connect: "Which part of the rule prevents the most errors?",
        misconception: "Grouping in threes from the left."
      }
    },
    {
      phase: "synth",
      title: "A method travelled <em>across cultures</em>",
      lead: "Place value was developed, studied, explained and transmitted across generations.",
      goal: "Connect the mathematical rule to a source-checked history of useful knowledge.",
      pull: "Now use the method to repair the first census line.",
      rail: {
        launch: "Use developed, described and transmitted—not invented by one person.",
        monitor: ["Linking zero to place holding", "Connecting written methods to data records", "Asking how knowledge travelled"],
        connect: "Why would clear place value matter to a modern spreadsheet?",
        misconception: "Claiming that al-Khwarizmi single-handedly invented the numeral system."
      }
    },
    {
      phase: "swyk",
      title: "Can we restore the <em>first census line</em>?",
      lead: "Choose the record that preserves every place, including the empty ones.",
      goal: "Use independent evidence to complete the story decision.",
      pull: "A correct record restores the first fragment of Folio 1.",
      rail: {
        launch: "Two minutes. Require a place-value reason, not only an option letter.",
        monitor: ["Using the chart", "Counting places", "Protecting the zero in the hundreds place"],
        connect: "Which zero is doing important work?",
        misconception: "Ignoring a placeholder zero when translating words to digits."
      }
    },
    {
      phase: "connect",
      title: "Fragment one is <em>restored</em>",
      lead: "The population line is readable, checkable and ready for the unit services brief.",
      goal: "Close with a real-world transfer and a precise mathematical cliffhanger.",
      pull: "Next: one digit moves one place—and its value changes tenfold.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next mathematical need.",
        monitor: ["Explaining periods", "Using expanded form to audit", "Ready to discuss ten-times relationships"],
        connect: "Where might your family see a large number that must be copied accurately?",
        misconception: "Remembering the story but not the place-value method."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [place, setPlace] = useState(0);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The page with seven empty boxes"
            text="Omar sees a damaged civic folio. Zayd notices that the surviving places repeat in groups. The lantern reveals evidence—but never answers."
            clue="Rebuild the headings before reading the record">
            <NoticeWonder draw={drawChartIntro} height={238} award={award}
              notices={["The labels repeat", "There are groups of three", "Each group has a name", "Some places are empty"]}
              wonders={["Why groups of three?", "What comes after millions?", "Where do the commas belong?"]}
              footnote="Story evidence counts only when the class can describe the mathematical structure." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="A planner must be able to read the record aloud"
            text="The folio uses a simulated Jeddah planning figure. Omar marks it as model data so nobody mistakes it for a current census fact."
            clue="How many places must the restored record protect?">
            <LaunchEstimate draw={drawJeddah} height={235} award={award}
              label="How many digits does 4,697,000 have?"
              min={4} max={10} start={6} unit="digits"
              after="Locked. Now build the evidence instead of waiting for a reveal."
              note="Real planners use place value to store, compare and check large civic data. This lesson uses simulated data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds a movable place-value frame"
            text="He can slide a digit, but the class must predict what that position makes it worth before selecting it."
            clue="Digit and value are different pieces of evidence">
            <ExploreChips draw={makeChartFocus(place, setPlace)} height={225}
              label="Test a place in 874,203"
              value={place}
              onPick={(v) => setPlace(v)}
              chips={[
                { v: 0, label: "8" }, { v: 1, label: "7" }, { v: 2, label: "4" },
                { v: 3, label: "2" }, { v: 4, label: "0" }, { v: 5, label: "3" }
              ]}
              caption={<MathEl omml={M.sixDigit} size="xl" display="block" />}
              footnote="The digit tells how many. Position tells how much." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar turns the frame into an audit trail"
            text="A copied total is easier to check when every non-zero place is written as its full value."
            clue="Expanded form exposes a misplaced digit">
            <ExploreChips draw={makeExpanded(shown, setShown)} height={235}
              label="Build the value of each digit in 62,415"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[1, 2, 3, 4, 5].map((n) => ({ v: n, label: n + (n === 1 ? " digit" : " digits") }))}
              caption={<MathEl omml={M.compareForms} size="lg" display="block" />}
              footnote="Expanded form is the chart written as a checkable sum." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="Water blurred the links between three records"
            text="Omar checks the words while Zayd checks the places. The class must commit before the folio marks any match."
            clue="A zero may be empty, but its place is not optional">
            <CardSort award={award} columns={3} commitLabel="Seal the three matches"
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
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest methods now come from students in this room. Compare them, then preserve one useful method in the Sijill."
            clue="Two representations can protect the same value">
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
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The shared rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Group from the right, then name each period">
            <BoardScreen draw={drawBoard11} height={380}
              caption="The mathematical rule—not a story click—restores the folio heading." />
          </StoryShell>
        );

      case 7:
        return (
          <STEMWindow window={STORY && STORY.stemWindows && STORY.stemWindows[0]}>
            <RuleScreen award={award}
              ommls={[{ omml: M.onePeriod, alt: "each period has three places" }]}
              hand={"Group in threes from the right · comma between periods · read each period, then say its name"}
              cards={[
                { title: "The number we built", omml: M.jeddahStandard, note: "four million, six hundred ninety-seven thousand" },
                { title: "Tap to see it expanded", omml: M.standard305, revealOmml: M.expanded305, reveal: true,
                  note: "the zero in the hundreds place holds the place open" }
              ]} />
          </STEMWindow>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar will stamp only a record the class can defend"
            text="The choice must preserve every place. Give a place-value reason before the teacher reveals the model."
            clue="This evidence becomes the first line of the services brief">
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
          </StoryShell>
        );

      case 9:
        return (
          <StoryHandoff
            title="The first census fragment is restored"
            text="Omar files the checkable number record. Zayd notices that the same digit appears again—one chair to the left."
            artifact="Population and services brief · readable large-number record"
            next="What happens to a digit's value when it moves one place left?">
            <Closing game={game} omml={M.jeddahStandard}
              action="Find a large number on a real bill, ticket or information screen. Identify whether it is real data or an estimate, then read it aloud by periods." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
