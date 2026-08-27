/* ===========================================================================
   SAVVAS enVision Mathematics · Grade 4 · Topic 1
   LESSON 1-4 · Round Whole Numbers                    Standard: 4.NBT.A.3
   I can ... round a multi-digit whole number to any place, using a number
            line or place value.
   Story beat: "The supply officer cannot count every box" — Omar leads.
   =========================================================================== */

const M = {
  crowd: om(mt("4,382")),
  toThousand: om(mt("4,382"), mnor(" rounds to "), mt("4,000")),
  toHundred: om(mt("4,382"), mnor(" rounds to "), mt("4,400")),
  toTen: om(mt("4,382"), mnor(" rounds to "), mt("4,380")),
  halfway: om(mnor("halfway between "), mt("4,000"), mnor(" and "), mt("5,000"), mnor(" is "), mt("4,500")),
  rule: om(mnor("at or past halfway, round up")),
  boundary: om(mt("250"), mnor(" rounds to "), mt("300")),
  swyk: om(mt("6,748")),
  swykAnswer: om(mt("6,748"), mnor(" rounds to "), mt("6,700"))
};

/* ---- lesson-specific drawings ------------------------------------------- */

/* Cold open: the supply ledger counting in real time */
const drawLedger = (ctx, W, H, frame) => {
  const CYCLE = 1000, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "SUPPLY LEDGER — count in progress", W / 2, 26,
    { size: 11, col: "rgba(234,244,242,.55)", font: "mono", weight: 700 });
  const rows = 8;
  for (let r = 0; r < rows; r++) {
    const a = D.at(f, r * 60, r * 60 + 160);
    if (a <= 0) continue;
    const y = 48 + r * 24;
    ctx.save(); ctx.globalAlpha = a;
    D.marker(ctx, [[70, y], [W - 70, y]], 1, "rgba(234,244,242,.14)", 1);
    ctx.restore();
    D.txt(ctx, ["boxes", "crates", "tanks", "tables", "chairs", "lamps", "carts", "rugs"][r],
      96, y, { size: 12, col: "rgba(234,244,242,.75)", font: "marker", alpha: a });
  }
  const p = D.at(f, 300, 700);
  D.txt(ctx, "running total: 4,382 so far…", W / 2, H - 40,
    { size: 17, col: "#C9A227", font: "marker", alpha: p });
  D.txt(ctx, "the exact total arrives tomorrow. The council needs a number today.",
    W / 2, H - 16, { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 620, 800) });
};

/* Warm-Up: a number line with the halfway point appearing */
const drawHalfway = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  const p = D.at(f, 0, 200);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.roundLine(ctx, { x: 60, y: H / 2 + 6, w: W - 120, lo: 4000, hi: 5000, value: null, prog: p });
  D.txt(ctx, "what is special about the dashed line?", W / 2, H - 18,
    { size: 13, col: "#C9A227", font: "marker", alpha: D.at(f, 200, 280) });
};

/* Launch: the counting hall — 4,382 counted, the report says "about 4,000" */
const drawStadium = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 100, 300);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  ctx.save();
  ctx.globalAlpha = 0.22 * p1;
  D.rr(ctx, W / 2 - 90, H - 96, 180, 62, 8);
  ctx.fillStyle = "#388C46"; ctx.fill();
  ctx.restore();
  D.marker(ctx, [[W / 2 - 90, H - 65], [W / 2 + 90, H - 65]], p1, "rgba(234,244,242,.4)", 1.4);
  const rows = 7, per = 34;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < per; c++) {
      const idx = r * per + c;
      const a = D.at(p2, idx / (rows * per), idx / (rows * per) + 0.08);
      if (a <= 0) continue;
      ctx.save();
      ctx.globalAlpha = a * 0.75;
      ctx.beginPath();
      ctx.arc(24 + c * ((W - 48) / (per - 1)), 44 + r * 15, 3.1, 0, Math.PI * 2);
      ctx.fillStyle = (idx % 5 === 0) ? "#C9A227" : "#12857C";
      ctx.fill();
      ctx.restore();
    }
  }
  D.txt(ctx, "4,382 boxes counted so far", W / 2, 24, { size: 15, col: "#C9A227", font: "marker", alpha: p1 });
  D.txt(ctx, "the planning report will say about 4,000", W / 2, H - 18,
    { size: 13, col: "#EAF4F2", font: "marker", alpha: D.at(f, 300, 380) });
};

/* Monitor A: round a chosen value on a 4,000 to 5,000 line */
const makeRounder = (v, onVal) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const lo = 4000, hi = 5000, lx = 62, lw = W - 124, ly = H / 2 + 10;
  if (onVal) D.tap(ctx, { x: lx, y: ly - 44, w: lw, h: 88, value: 0, on: (v2, tx) => {
    const nv = Math.round((lo + (tx - lx) / lw * (hi - lo)) / 10) * 10;
    onVal(Math.max(lo, Math.min(hi, nv)));
  }});
  D.roundLine(ctx, { x: lx, y: ly, w: lw, lo: lo, hi: hi, value: v, prog: 1 });
  const up = v >= 4500;
  D.txt(ctx, v.toLocaleString("en-US") + " rounds to " + (up ? "5,000" : "4,000"),
    W / 2, H - 16, { size: 15, col: up ? "#388C46" : "#C74440", font: "marker" });
};

/* Monitor B: the same number rounded to three different places */
const makeRoundPlace = (place) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cfg = {
    1000: { lo: 4000, hi: 5000 },
    100: { lo: 4300, hi: 4400 },
    10: { lo: 4380, hi: 4390 }
  }[place];
  D.roundLine(ctx, { x: 62, y: H / 2 + 12, w: W - 124, lo: cfg.lo, hi: cfg.hi, value: 4382, prog: 1 });
  const names = { 1000: "nearest thousand", 100: "nearest hundred", 10: "nearest ten" };
  const results = { 1000: "4,000", 100: "4,400", 10: "4,380" };
  D.txt(ctx, "to the " + names[place], W / 2, 26, { size: 13, col: "#C9A227", font: "marker" });
  D.txt(ctx, "4,382 rounds to " + results[place], W / 2, H - 14, { size: 16, col: "#EAF4F2", font: "marker" });
};

/* Board: the halfway rule */
const drawBoard14 = (ctx, W, H, frame) => {
  const CYCLE = 760, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Which one is it closer to?" });
  const p1 = D.at(f, 20, 150), p2 = D.at(f, 140, 280), p3 = D.at(f, 280, 440), p4 = D.at(f, 440, 600);
  const x = 78, w = W - 156, y = 190;
  const px = (n) => x + ((n - 4000) / 1000) * w;
  D.marker(ctx, [[x, y], [x + w, y]], p1, "rgba(234,244,242,.75)", 2.6);
  if (p1 > 0.7) {
    [[4000, "4,000", "#EAF4F2"], [5000, "5,000", "#EAF4F2"]].forEach((t) => {
      ctx.save(); ctx.strokeStyle = t[2]; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.moveTo(px(t[0]), y - 14); ctx.lineTo(px(t[0]), y + 14); ctx.stroke(); ctx.restore();
      D.txt(ctx, t[1], px(t[0]), y + 36, { size: 15, col: t[2], font: "marker" });
    });
  }
  if (p2 > 0) {
    ctx.save();
    ctx.globalAlpha = p2;
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(px(4500), y - 40); ctx.lineTo(px(4500), y + 22); ctx.stroke();
    ctx.restore();
    D.txt(ctx, "halfway", px(4500), y - 52, { size: 13, col: "#C9A227", font: "marker", alpha: p2 });
    D.txt(ctx, "4,500", px(4500), y + 36, { size: 14, col: "#C9A227", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    const vx = px(4382);
    ctx.save();
    ctx.globalAlpha = p3;
    ctx.beginPath(); ctx.arc(vx, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#C74440"; ctx.fill();
    ctx.restore();
    D.txt(ctx, "4,382", vx, y - 26, { size: 16, col: "#C74440", font: "marker", alpha: p3 });
    D.txt(ctx, "before halfway", vx, y + 62, { size: 12, col: "#C74440", font: "marker", alpha: D.at(f, 340, 420) });
    const pts = [];
    for (let s = 0; s <= 16; s++) {
      const t = s / 16;
      pts.push([vx + (px(4000) - vx) * t, y - Math.sin(Math.PI * t) * 34]);
    }
    D.marker(ctx, pts, D.at(f, 360, 440), "#C74440", 2.4);
  }
  if (p4 > 0) {
    const yb = H - 44;
    D.marker(ctx, [[60, yb - 30], [W - 60, yb - 30]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "find halfway · at or past it, round up · before it, round down",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 480, 560) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 520, 620), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport14 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.roundLine(ctx, { x: 44, y: H / 2 + 2, w: W - 88, lo: 6700, hi: 6800, value: 6748, prog: 1 });
};

/* ---- the lesson ---------------------------------------------------------- */
const LESSON = {
  code: "1-4",
  storageKey: "daf-g4-t1-l4",
  title: "Round Whole Numbers",
  unit: "GRADE 4 · TOPIC 1 · LESSON 1-4 · 4.NBT.A.3",
  math: M,
  ixl: ["QV7", "CT2"],

  metas: [
    {
      phase: "warmup",
      title: "The officer <em>cannot count every box</em>",
      lead: "The supply ledger is still counting. The exact total arrives tomorrow — the council needs a number today.",
      goal: "Feel the difference between an exact count and a usable estimate.",
      pull: "An estimate is not a guess — it is a number with a reason.",
      rail: {
        launch: "Fictional frame. Ask only: what is the ledger doing, and what is it missing?",
        monitor: ["Noticing the count is in progress", "Wondering what 'usable' means", "Asking what the council needs"],
        connect: "When have you needed a number before the exact one was ready?",
        misconception: "Thinking an estimate is a made-up number rather than a reasoned one."
      }
    },
    {
      phase: "launch",
      title: "The report needs <em>about</em>, not <em>exactly</em>",
      lead: "4,382 boxes are counted so far. The planning report will round to the nearest thousand. Lock your number.",
      goal: "Round 4,382 to the nearest thousand with a prediction first.",
      pull: "The counts in this lesson are simulated planning data.",
      rail: {
        launch: "State that the supply counts are simulated planning data.",
        monitor: ["Naming the requested place", "Guessing before the line", "Saying about vs exactly"],
        connect: "Why would the council use about 4,000 instead of 4,382?",
        misconception: "Writing the exact count where the form asks for the nearest thousand."
      }
    },
    {
      phase: "monitor",
      title: "Zayd marks the <em>halfway point</em>",
      lead: "His line runs from 4,000 to 5,000 with a dashed line in the middle. Test which side each value lands on.",
      goal: "Use the halfway point to decide round-up or round-down.",
      pull: "Before halfway rounds down; at or past halfway rounds up.",
      rail: {
        launch: "Predict the side before the dot lands.",
        monitor: ["Finding halfway at 4,500", "Reading the dashed line", "Deciding sides for 4,382 and 4,700"],
        connect: "What makes 4,500 the number that matters?",
        misconception: "Rounding up always, without checking the halfway point."
      }
    },
    {
      phase: "monitor",
      title: "Omar rounds <em>to three places</em>",
      lead: "The same 4,382 becomes a different useful number depending on the place requested.",
      goal: "Round to the requested place, not the most familiar one.",
      pull: "The requested place sets the halfway point.",
      rail: {
        launch: "Ask for the halfway point of the requested place before revealing the result.",
        monitor: ["Changing the place changes the answer", "Finding each halfway point", "Reading the result line"],
        connect: "Which place gives the least useful number here — and why?",
        misconception: "Rounding to the nearest ten out of habit when the form asks for the nearest thousand."
      }
    },
    {
      phase: "monitor",
      title: "Three orders need <em>rounded counts</em>",
      lead: "The supply officer's sheet has three requests. Commit to all three before the folio checks.",
      goal: "Round multi-digit numbers to the requested place with embedded zeros.",
      pull: "One pair differs by only five in the deciding place.",
      rail: {
        launch: "Do not grade until the class commits to all three.",
        monitor: ["Finding the halfway of each requested place", "Handling the 2 in 342,215", "Handling the 7 in 347,215"],
        connect: "Which request needed the most care, and why?",
        misconception: "Rounding before checking the requested place — 342,215 to the nearest ten-thousand is 340,000, not 342,000."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two methods</em>",
      lead: "The boys step back. Real student strategies for the halfway rule take the board.",
      goal: "Compare methods and name the reusable rule in the Sijill.",
      pull: "One method draws the rule; one method reads the digit.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Drawing halfway vs reading the rounding digit", "Agreeing at exactly 5", "Explaining both"],
        connect: "When do both methods give the same answer — always, or only sometimes?",
        misconception: "Believing '5 means up' without knowing which 5 — the 5 of the requested place's halfway."
      }
    },
    {
      phase: "synth",
      title: "The rule enters the <em>Evidence Folio</em>",
      lead: "Find halfway for the requested place. At or past it, round up; before it, round down.",
      goal: "Build the rounding rule publicly from the strategies just compared.",
      pull: "The supply order now rests on a defensible estimate.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Naming halfway for a new place", "Applying it to 250 → 300"],
        connect: "Why is 'at halfway' rounded up in this classroom?",
        misconception: "Treating the classroom convention (5 rounds up) as the only possible rule anywhere."
      }
    },
    {
      phase: "swyk",
      title: "Can the council sign the <em>tank order</em>?",
      lead: "The exact tank count is 6,748; the order form asks for the nearest hundred. Defend the number that goes on the form.",
      goal: "Round independently to the requested place with a halfway check.",
      pull: "A defended estimate stamps the fourth fragment of Folio 1.",
      rail: {
        launch: "Two minutes. Require the halfway point, not only an option letter.",
        monitor: ["Finding halfway at 6,750", "Placing 6,748 before it", "Writing 6,700 on the form"],
        connect: "Which place decided it — and where is the halfway point of that place?",
        misconception: "Rounding 6,748 up to 6,800 because '8 is big' — the tens digit does not round to the nearest hundred."
      }
    },
    {
      phase: "connect",
      title: "Fragment four is <em>restored</em>",
      lead: "The order goes out with a number the council can defend. Then two teams step up to the council table.",
      goal: "Close with a transfer task and the argument cliffhanger.",
      pull: "Next: two teams, two population statements, one seal.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next mathematical need.",
        monitor: ["Explaining the halfway check", "Writing rounded numbers", "Ready to argue from evidence"],
        connect: "Where does your family use an estimate instead of an exact number?",
        misconception: "Remembering the supply story but not the halfway rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [val, setVal] = useState(4382);
    const [place, setPlace] = useState(1000);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The ledger that never finishes counting"
            text="The lantern shows the supply ledger mid-count: boxes, crates, tanks, tables — a running total that is not yet final. The exact number arrives tomorrow."
            clue="What kind of number can the council use today?">
            <NoticeWonder draw={drawLedger} height={238} award={award}
              notices={["The count is still running", "There is a running total", "The exact total is not ready", "The report needs a number today"]}
              wonders={["What makes an estimate useful?", "How close does 'close' need to be?", "What tells you which way to go?"]}
              footnote="An estimate is a number with a reason — the reason is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The report needs 'about', not 'exactly'"
            text="Omar marks the supply counts as simulated planning data — then asks what the planning report should say about 4,382 boxes."
            clue="Lock a prediction before the line appears">
            <LaunchEstimate draw={drawStadium} height={235} award={award}
              label="To the nearest thousand, what does the report say?"
              min={3000} max={6000} start={4000} unit="boxes"
              after="Locked. Now find the halfway point and check your number."
              note="All counts in this lesson are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd marks the halfway point"
            text="His line runs from 4,000 to 5,000 with a dashed line exactly in the middle. The class picks a value; the line decides its side."
            clue="Before halfway rounds down · at or past halfway rounds up">
            <ExploreChips draw={makeRounder(val, setVal)} height={225}
              label="Which side of halfway does this value land on?"
              value={val}
              onPick={(v) => setVal(v)}
              chips={[{ v: 4382, label: "4,382" }, { v: 4500, label: "4,500" }, { v: 4700, label: "4,700" }, { v: 4900, label: "4,900" }]}
              caption={<MathEl omml={M.halfway} size="lg" display="block" />}
              footnote="The dashed line is 4,500 — the halfway point of the thousands." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar rounds to three different places"
            text="The same 4,382 becomes a different useful number depending on the place the form requests. Pick the place the form asks for."
            clue="The requested place sets the halfway point">
            <ExploreChips draw={makeRoundPlace(place)} height={225}
              label="Which place does the form request?"
              value={place}
              onPick={(v) => setPlace(v)}
              chips={[{ v: 1000, label: "nearest thousand" }, { v: 100, label: "nearest hundred" }, { v: 10, label: "nearest ten" }]}
              caption={<MathEl omml={M.toThousand} size="lg" display="block" />}
              footnote="Different requested places give different useful numbers." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="Three orders on the supply sheet"
            text="Omar reads each request while Zayd places the rounded count. The class must commit to all three before the folio checks."
            clue="One pair differs by only five in the deciding place">
            <CardSort award={award} columns={3} commitLabel="Seal the estimate sheet"
              items={[
                { id: "s1", text: "4,382 → nearest hundred", target: "t1" },
                { id: "s2", text: "342,215 → nearest ten-thousand", target: "t2" },
                { id: "s3", text: "347,215 → nearest ten-thousand", target: "t3" }
              ]}
              targets={[
                { id: "t1", label: "4,400" },
                { id: "t2", label: "340,000" },
                { id: "t3", label: "350,000" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest halfway methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One method draws the rule; one reads the digit">
          <CompareConnect award={award}
            left={{
              name: "Hani's way — draw the halfway", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 400, 0, 140);
                D.marker(ctx, [[60, H / 2], [W - 60, H / 2]], p, "rgba(234,244,242,.7)", 2.2);
                D.txt(ctx, "4,000", 78, H / 2 - 12, { size: 13, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "5,000", W - 108, H / 2 - 12, { size: 13, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "4,500 ← halfway", W / 2, H / 2 - 12, { size: 13, col: "#C9A227", font: "marker", alpha: D.at(frame % 400, 140, 260) });
                D.txt(ctx, "4,382 is before it → 4,000", W / 2, H / 2 + 22, { size: 12, col: "#34D399", font: "marker", alpha: D.at(frame % 400, 220, 330) });
              },
              quote: "I draw the line, find halfway, and see which side it sits on."
            }}
            right={{
              name: "Musa's way — read the rounding digit", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 400, 0, 140);
                D.txt(ctx, "4,382", W / 2, H / 2 - 12, { size: 20, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "rounding digit (hundreds) is 3", W / 2, H / 2 + 16, { size: 12, col: "#2D70B3", font: "marker", alpha: D.at(frame % 400, 160, 280) });
                D.txt(ctx, "3 is before 5 → round down", W / 2, H / 2 + 38, { size: 12, col: "#34D399", font: "marker", alpha: D.at(frame % 400, 260, 370) });
              },
              quote: "I read the digit one place right of the requested place: under 5 down, 5 or more up."
            }}
            same={["Both find the halfway of the requested place",
                   "Both round up at or past halfway",
                   "Both give 4,000 for 4,382 to the nearest thousand"]}
            diff={["Hani draws it, Musa reads it",
                   "Hani's method shows the reason visually",
                   "Musa's method is faster for long numbers"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The shared rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Halfway decides · 5 and above goes up">
            <BoardScreen draw={drawBoard14} height={380}
              caption="The halfway rule — not a guess — turns exact counts into usable estimates." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only an order he can defend"
            text="The tank count is 6,748; the form asks for the nearest hundred. Name the number that goes on the form — and its halfway check."
            clue="The halfway point is 6,750">
            <ShowWhatYouKnow award={award}
              prompt="The order form asks for the nearest hundred. Which number goes on it?"
              options={[{ v: "a", text: "6,700" }, { v: "b", text: "6,800" }, { v: "c", text: "6,750" }, { v: "d", text: "6,748" }]}
              right="a"
              support={{
                yes: "Yes — halfway between 6,700 and 6,800 is 6,750, and 6,748 sits before it, so it rounds down to 6,700.",
                notYet: "Not yet — find the halfway point of the hundreds and see which side 6,748 sits on.",
                draw: drawSupport14, h: 84,
                hint: "Halfway between 6,700 and 6,800 is 6,750."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The estimate sheet is sealed"
            text="The supply order goes out with a number the council can defend. Omar closes the ledger — and two teams step up to the council table, each holding a different population statement."
            artifact="Population and services brief · estimate sheet"
            next="Two teams will defend different population statements before the council. A sound argument earns the seal.">
            <Closing game={game} omml={M.swykAnswer}
              action="Round a real number to two different places. Write down why each estimate is useful for a different decision." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
