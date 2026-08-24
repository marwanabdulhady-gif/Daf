/* ===========================================================================
   SAVVAS enVision Mathematics · Grade 4 · Topic 1
   LESSON 1-4 · Round Whole Numbers                      Standard: 4.NBT.A.3
   I can ... round a multi-digit whole number to any place, using a number
            line or place value.
   =========================================================================== */

const M = {
  crowd: om(mt("4,382")),
  toThousand: om(mt("4,382"), mnor(" rounds to "), mt("4,000")),
  toHundred: om(mt("4,382"), mnor(" rounds to "), mt("4,400")),
  toTen: om(mt("4,382"), mnor(" rounds to "), mt("4,380")),
  halfway: om(mnor("halfway between "), mt("4,000"), mnor(" and "), mt("5,000"), mnor(" is "), mt("4,500")),
  rule: om(mnor("at or past halfway → round up")),
  boundary: om(mt("250"), mnor(" rounds to "), mt("300")),
  swyk: om(mt("6,748")),
  swykAnswer: om(mt("6,748"), mnor(" rounds to "), mt("6,700"))
};

/* ---- drawings ------------------------------------------------------------ */

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

/* Launch: a stadium crowd */
const drawStadium = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 100, 300);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  /* pitch */
  ctx.save();
  ctx.globalAlpha = 0.22 * p1;
  D.rr(ctx, W / 2 - 90, H - 96, 180, 62, 8);
  ctx.fillStyle = "#388C46"; ctx.fill();
  ctx.restore();
  D.marker(ctx, [[W / 2 - 90, H - 65], [W / 2 + 90, H - 65]], p1, "rgba(234,244,242,.4)", 1.4);

  /* crowd dots */
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
  D.txt(ctx, "4,382 fans", W / 2, 24, { size: 15, col: "#C9A227", font: "marker", alpha: p1 });
  D.txt(ctx, "the newspaper wrote about 4,000", W / 2, H - 18,
    { size: 13, col: "#EAF4F2", font: "marker", alpha: D.at(f, 300, 380) });
};

/* Monitor A: round a chosen value on a 4,000 to 5,000 line */
const makeRounder = (v) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.roundLine(ctx, { x: 62, y: H / 2 + 10, w: W - 124, lo: 4000, hi: 5000, value: v, prog: 1 });
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
    { phase: "warmup",
      title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A number line with one dashed mark. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "That dashed line is going to do all the work today.",
      rail: { launch: "I am not asking anything yet. Just look at the dashed line.",
        monitor: ["Noticing it sits in the middle", "Naming 4,500", "Noticing the two ends are friendly numbers"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading the dashed line as a starting point rather than a midpoint." } },

    { phase: "launch",
      title: "The newspaper said <em>about 4,000</em>",
      lead: "4,382 fans came to the match. Why would anyone write 4,000 instead?",
      goal: "Create the need — a friendly number is easier to hold in your head.",
      pull: "Estimate first, then we will place it exactly.",
      rail: { launch: "Is the newspaper wrong? Talk to your partner for thirty seconds.",
        monitor: ["Saying it is wrong", "Saying it is close enough", "Saying it depends what you need it for"],
        connect: "When is about good enough, and when is it not?",
        misconception: "Rounding is the same as guessing. Do not correct it — ask what makes it different." } },

    { phase: "monitor",
      title: "Which end is it <em>closer to</em>?",
      lead: "Drop a number on the line and watch which way it jumps.",
      goal: "Rounding is a question about distance, not a trick with digits.",
      pull: "Same number, different question. Round it to a different place.",
      rail: { launch: "Predict which way it will jump before you tap.",
        monitor: ["Comparing distances by eye", "Using the halfway point", "Looking only at the digit"],
        connect: "What happens to a number sitting exactly on halfway?",
        misconception: "Rounding down when the number is exactly at halfway." } },

    { phase: "monitor",
      title: "Round the <em>same number</em> three ways",
      lead: "4,382 to the nearest thousand, hundred, and ten. All three are correct.",
      goal: "The place you round to changes the answer.",
      pull: "Which numbers all round to the same place? Let us sort.",
      rail: { launch: "Before you tap, predict what changes and what stays.",
        monitor: ["Zooming into a smaller interval", "Using the digit to the right", "Checking against the line"],
        connect: "Which digit did you look at each time?",
        misconception: "Using the same digit no matter which place is asked for." } },

    { phase: "monitor",
      title: "Sort by <em>where they land</em>",
      lead: "Each number rounds to one of these. No grading until the class commits.",
      goal: "Apply rounding in an unfamiliar direction.",
      pull: "Two students explained the boundary case differently.",
      rail: { launch: "Say each number out loud before you place it.",
        monitor: ["Finding halfway first", "Using the digit rule", "Sketching a quick line"],
        connect: "Which one was hardest, and why?",
        misconception: "Rounding 250 down to 200." } },

    { phase: "connect",
      title: "Two ways to <em>decide</em>",
      lead: "Hessa drew the line. Tariq looked at one digit. Both get there.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Seeing the digit rule inside the line", "Preferring the drawing", "Using the digit but checking on the line"],
        connect: "Where is the halfway point hiding in Tariq's method?",
        misconception: "Believing the digit rule is a separate, magical rule." } },

    { phase: "synth",
      title: "On the <em>board</em>",
      lead: "Mark the two ends. Find halfway. Put the number on the line. Jump to the nearer end.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Finding halfway first", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Jumping before finding halfway." } },

    { phase: "synth",
      title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Linking to distance", "Testing on a boundary number", "Asking about rounding to millions"],
        connect: "Why does exactly halfway round up?",
        misconception: "Thinking halfway is closer to the lower end." } },

    { phase: "swyk",
      title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Write your thinking, not just your answer.",
        monitor: ["Finding halfway", "Using the tens digit", "Sketching the line"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Rounding to the nearest ten when asked for the nearest hundred." } },

    { phase: "connect",
      title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: how do you prove a claim about numbers?",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the line", "Ready to build arguments"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [val, setVal] = useState(4382);
    const [place, setPlace] = useState(1000);

    switch (i) {
      case 0:
        return (
          <NoticeWonder draw={drawHalfway} height={250} award={award}
            notices={["It is exactly in the middle", "The ends are friendly numbers", "It is drawn with dashes", "It says 4,500"]}
            wonders={["Why mark the middle?", "What if a number sits on it?", "Does every line have one?"]} />
        );

      case 1:
        return (
          <LaunchEstimate draw={drawStadium} height={266} award={award}
            label="Round 4,382 to the nearest thousand"
            min={3000} max={6000} start={4500} unit=""
            after="Locked. Now let us place 4,382 on a line and see."
            note="Rounding is not guessing — it is choosing the nearer friendly number." />
        );

      case 2:
        return (
          <ExploreChips draw={makeRounder(val)} height={252}
            label="Drop a number on the line"
            value={val}
            onPick={(v) => setVal(v)}
            chips={[
              { v: 4120, label: "4,120" }, { v: 4382, label: "4,382" },
              { v: 4500, label: "4,500" }, { v: 4790, label: "4,790" }
            ]}
            caption={<MathEl omml={M.halfway} size="lg" display="block" />}
            footnote="Exactly halfway rounds up — that is the agreement mathematicians made." />
        );

      case 3:
        return (
          <ExploreChips draw={makeRoundPlace(place)} height={252}
            label="Round 4,382 to the ..."
            value={place}
            onPick={(v) => setPlace(v)}
            chips={[
              { v: 1000, label: "nearest thousand" }, { v: 100, label: "nearest hundred" }, { v: 10, label: "nearest ten" }
            ]}
            caption={<MathEl omml={place === 1000 ? M.toThousand : place === 100 ? M.toHundred : M.toTen} size="xl" display="block" />}
            footnote="Zoom in and the two ends get closer together." />
        );

      case 4:
        return (
          <CardSort award={award} columns={3} commitLabel="The class is ready — check where they land"
            items={[
              { id: "r1", text: "247", target: "b200" },
              { id: "r2", text: "250", target: "b300" },
              { id: "r3", text: "349", target: "b300" }
            ]}
            targets={[
              { id: "b200", label: "rounds to 200 (nearest hundred)" },
              { id: "b300", label: "rounds to 300 (nearest hundred)" },
              { id: "b400", label: "rounds to 400 (nearest hundred)" }
            ]} />
        );

      case 5:
        return (
          <CompareConnect award={award}
            left={{
              name: "Hessa's way — draw the line", h: 96,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                D.roundLine(ctx, { x: 30, y: H / 2, w: W - 60, lo: 4000, hi: 5000, value: 4382,
                                   prog: D.at(frame % 400, 0, 150) });
              },
              quote: "I drew it and looked at which end was nearer."
            }}
            right={{ name: "Tariq's way — check one digit", omml: M.toThousand, h: 96,
                     quote: "The hundreds digit is 3, so it stays at 4,000." }}
            same={["Both give 4,000", "Both care about halfway", "Both look at the place to the right"]}
            diff={["Hessa draws, Tariq checks a digit", "Tariq is faster once he trusts it",
                   "Hessa can see why it is true"]} />
        );

      case 6:
        return <BoardScreen draw={drawBoard14} height={430} />;

      case 7:
        return (
          <RuleScreen award={award}
            ommls={[{ omml: M.rule, alt: "at or past halfway, round up" }]}
            hand={"find the two friendly ends · find halfway · is the number before it or past it?"}
            cards={[
              { title: "The number we rounded", omml: M.toThousand, note: "4,382 sits before 4,500" },
              { title: "Tap to test the boundary", omml: om(mt("250")), revealOmml: M.boundary, reveal: true,
                note: "exactly halfway rounds up" }
            ]} />
        );

      case 8:
        return (
          <ShowWhatYouKnow award={award}
            prompt="Round 6,748 to the nearest hundred."
            omml={M.swyk}
            options={[
              { v: "a", text: "6,700" }, { v: "b", text: "6,800" },
              { v: "c", text: "6,750" }, { v: "d", text: "7,000" }
            ]}
            right="a"
            support={{
              yes: "Yes — 6,748 sits before halfway, so it stays at 6,700.",
              notYet: "Not yet — find the two hundreds it sits between.",
              draw: drawSupport14, h: 84,
              hint: "Halfway between 6,700 and 6,800 is 6,750. Is 6,748 before it or past it?"
            }} />
        );

      case 9:
        return (
          <Closing game={game} omml={M.rule}
            action="Find a price at home and round it to the nearest ten riyals. Tell someone why." />
        );

      default:
        return null;
    }
  }
};
