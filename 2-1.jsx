/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-1 · Finding Sums and Differences with Mental Math
   Standard 4.NBT.B.4     I can ... use properties and compensation to add and
   subtract in my head.
   =========================================================================== */

const M = {
  problem: om(mt("199+46")),
  compensated: om(mt("200+45=245")),
  moveOne: om(mnor("move "), mt("1"), mnor(" across, the total does not change")),
  breakApart: om(mt("199+40+6")),
  assoc: om(mt("(199+1)+45")),
  sub: om(mt("245-99")),
  subComp: om(mt("246-100=146")),
  swyk: om(mt("298+57")),
  swykWork: om(mt("300+55=355"))
};

const money = (n) => n + " riyals";

/* Warm-Up / Launch: the canteen counter, two prices, then the swap */
const drawCanteen = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 100), p2 = D.at(f, 100, 250), p3 = D.at(f, 260, 420);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "school canteen", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });

  const items = [
    { name: "juice carton", v: 199, x: W * 0.3, col: "#FA7E19" },
    { name: "sandwich", v: 46, x: W * 0.7, col: "#2D70B3" }
  ];
  items.forEach((it, n) => {
    const a = D.at(p1, n * 0.3, n * 0.3 + 0.6);
    if (a <= 0) return;
    ctx.save();
    ctx.globalAlpha = a * 0.8;
    D.rr(ctx, it.x - 52, 46, 104, 54, 9);
    ctx.strokeStyle = it.col; ctx.lineWidth = 1.8; ctx.stroke();
    ctx.restore();
    D.txt(ctx, it.name, it.x, 64, { size: 11.5, col: it.col, font: "marker", alpha: a });
    D.txt(ctx, String(it.v), it.x, 88, { size: 22, col: "#EAF4F2", font: "marker", alpha: a });
  });

  if (p2 > 0) {
    D.txt(ctx, "199 + 46", W / 2, 132, { size: 22, col: "#EAF4F2", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    /* the single riyal hops across */
    const t = D.at(f, 260, 360);
    const x0 = items[1].x, x1 = items[0].x;
    const hx = x0 + (x1 - x0) * D.easeOut(t);
    const hy = 168 - Math.sin(Math.PI * t) * 26;
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(hx, hy, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#C9A227"; ctx.fill();
    ctx.restore();
    D.txt(ctx, "1", hx, hy, { size: 12, col: "#0B1F24", font: "marker" });
    if (t >= 1) {
      D.txt(ctx, "200 + 45 = 245", W / 2, H - 26,
        { size: 20, col: "#34D399", font: "marker", alpha: D.at(f, 360, 430) });
    }
  }
};

/* Monitor A: the compensation slider */
const makeCompensate = (k) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = 199 + k, b = 46 - k;
  const x = 50, w = W - 100, y = H / 2 + 6;
  const total = 245;
  const aw = (a / total) * w;
  D.strip(ctx, {
    x: x, y: y - 26, w: w, h: 50, prog: 1, total: 245,
    parts: [
      { v: a, label: String(a), col: "#FA7E19" },
      { v: b, label: String(b), col: "#2D70B3" }
    ]
  });
  D.txt(ctx, a + " + " + b + " = 245", W / 2, y + 60, { size: 19, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, k === 1 ? "now it is easy in your head" : "the total never moves",
    W / 2, H - 18, { size: 13, col: k === 1 ? "#34D399" : "#C9A227", font: "marker" });
};

/* Monitor B: breaking the second addend apart by place value */
const makeBreakApart = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const stops = [199, 239, 245];
  const labels = ["start at 199", "+ 40", "+ 6"];
  const x = 54, w = W - 108, y = H / 2 + 14;
  const lo = 190, hi = 250;
  const px = (n) => x + ((n - lo) / (hi - lo)) * w;
  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.7)", 2.2);
  [190, 200, 210, 220, 230, 240, 250].forEach((n) => {
    ctx.save(); ctx.strokeStyle = "rgba(234,244,242,.4)"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(px(n), y - 7); ctx.lineTo(px(n), y + 7); ctx.stroke(); ctx.restore();
    D.txt(ctx, String(n), px(n), y + 24, { size: 10, col: "rgba(234,244,242,.5)", font: "mono", weight: 500 });
  });
  for (let i = 0; i <= step; i++) {
    ctx.save();
    ctx.beginPath(); ctx.arc(px(stops[i]), y, 6, 0, Math.PI * 2);
    ctx.fillStyle = i === step ? "#C9A227" : "rgba(52,211,153,.8)"; ctx.fill();
    ctx.restore();
    D.txt(ctx, String(stops[i]), px(stops[i]), y - 24, { size: 13, col: "#EAF4F2", font: "marker" });
    if (i > 0) {
      const pts = [];
      for (let s = 0; s <= 14; s++) {
        const t = s / 14;
        pts.push([px(stops[i - 1]) + (px(stops[i]) - px(stops[i - 1])) * t, y - Math.sin(Math.PI * t) * 30]);
      }
      D.marker(ctx, pts, 1, "#FA7E19", 2.2);
      D.txt(ctx, labels[i], (px(stops[i - 1]) + px(stops[i])) / 2, y - 52,
        { size: 12, col: "#FA7E19", font: "marker" });
    }
  }
  D.txt(ctx, step === 2 ? "199 + 40 + 6 = 245" : "break the 46 into friendly jumps",
    W / 2, H - 16, { size: 14, col: step === 2 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawBoard21 = (ctx, W, H, frame) => {
  const CYCLE = 720, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Make one number friendly" });
  const p1 = D.at(f, 20, 140), p2 = D.at(f, 140, 300), p3 = D.at(f, 300, 470), p4 = D.at(f, 460, 620);

  D.txt(ctx, "199 + 46", W / 2, 100, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.strip(ctx, {
      x: 90, y: 148, w: W - 180, h: 44, prog: p2, total: 245,
      parts: [{ v: 199, label: "199", col: "#FA7E19" }, { v: 46, label: "46", col: "#2D70B3" }]
    });
  }
  if (p3 > 0) {
    D.strip(ctx, {
      x: 90, y: 250, w: W - 180, h: 44, prog: p3, total: 245,
      parts: [{ v: 200, label: "200", col: "#FA7E19" }, { v: 45, label: "45", col: "#2D70B3" }]
    });
    D.txt(ctx, "give 1 to the 199, take 1 from the 46", W / 2, 316,
      { size: 14, col: "#C9A227", font: "marker", alpha: D.at(f, 340, 420) });
  }
  if (p4 > 0) {
    const yb = H - 44;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "the total stays the same — only the parts moved", W / 2, yb - 2,
      { size: 16, col: "#C9A227", font: "marker", alpha: D.at(f, 500, 580) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 540, 640), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport21 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, {
    x: 24, y: 30, w: W - 48, h: 38, prog: 1, total: 355,
    parts: [{ v: 300, label: "300", col: "#FA7E19" }, { v: 55, label: "55", col: "#2D70B3" }]
  });
};

const LESSON = {
  code: "2-1",
  storageKey: "daf-g4-t2-l1",
  title: "Finding Sums and Differences with Mental Math",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-1 · 4.NBT.B.4",
  math: M,
  ixl: ["D7B", "D9R", "Q8M"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two prices at the canteen. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "One of those numbers is almost a friendly number.",
      rail: { launch: "I am not asking for a total yet. Just look at the two prices.",
        monitor: ["Noticing 199 is nearly 200", "Adding straight away", "Noticing the 46 is small"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reaching for paper before looking at the numbers." } },

    { phase: "launch", title: "Can you do it <em>in your head</em>?",
      lead: "199 + 46. No pencil. What did your brain do first?",
      goal: "Create the need — some numbers are easier to add than others.",
      pull: "Estimate first, then we will make it friendly.",
      rail: { launch: "Hands down, eyes on the board. What is the total? How did you get it?",
        monitor: ["Counting on by ones", "Rounding 199 to 200 and adjusting", "Splitting the 46"],
        connect: "Who changed the numbers before adding them?",
        misconception: "Believing mental maths means the written method done silently." } },

    { phase: "monitor", title: "Move <em>one</em> across",
      lead: "Take from one part, give to the other. Watch the total.",
      goal: "Compensation: the total is protected when you move an amount across.",
      pull: "There is another way to make it easy. Let us jump instead.",
      rail: { launch: "Predict the total before you move anything.",
        monitor: ["Watching the total bar", "Checking both new numbers", "Explaining why the total holds"],
        connect: "Why does the total not change?",
        misconception: "Adding 1 to one part without taking it from the other." } },

    { phase: "monitor", title: "Break it into <em>friendly jumps</em>",
      lead: "Split the 46 by place value and hop along the line.",
      goal: "Decomposition: add the tens, then the ones.",
      pull: "Two students, two strategies. Which is which?",
      rail: { launch: "Predict where each jump will land.",
        monitor: ["Jumping tens then ones", "Jumping to the next ten first", "Counting in ones"],
        connect: "Which jump did the heavy lifting?",
        misconception: "Splitting the wrong addend and losing track." } },

    { phase: "monitor", title: "Which <em>strategy</em> is it?",
      lead: "Match each piece of working to the strategy behind it.",
      goal: "Name the strategies so students can choose one on purpose.",
      pull: "Now let us watch two students explain the same problem.",
      rail: { launch: "Read each one out loud before you place it.",
        monitor: ["Looking for a changed number", "Looking for a split", "Checking the total"],
        connect: "How could you tell them apart?",
        misconception: "Thinking any mental method is compensation." } },

    { phase: "connect", title: "Two ways to <em>make it easy</em>",
      lead: "Salma compensated. Rayan broke it apart. Both got 245.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Seeing 200 inside both", "Preferring the number line", "Choosing by the numbers in front of them"],
        connect: "Which strategy would you choose for 402 minus 199?",
        misconception: "Believing one strategy must always be used." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Draw the two parts. Move one across. The total bar never changes length.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next stroke", "Watching the total bar", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Treating the bar as a picture rather than a promise about the total." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Linking to the bar", "Testing on a subtraction", "Asking whether it works both ways"],
        connect: "Does compensation work for subtraction too?",
        misconception: "Using addition compensation rules on a subtraction without adjusting." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the friendly numbers you used.",
        monitor: ["Making 300", "Splitting the 57", "Adding straight down"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Adding 2 to 298 and forgetting to take 2 from 57." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: is my answer even reasonable?",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready to estimate"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [k, setK] = useState(0);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawCanteen} height={256} award={award}
          notices={["199 is nearly 200", "One price is much bigger", "They are both under 250", "46 is small"]}
          wonders={["What is the total?", "Could I round the 199?", "Is there a quick way?"]} />;

      case 1:
        return <LaunchEstimate draw={drawCanteen} height={256} award={award}
          label="What is 199 + 46?" min={200} max={300} start={250} unit="riyals"
          after="Locked. Now let us see what your brain did to make it easy."
          note="Adding 200 is easy. Adding 199 is not. That difference is the whole lesson." />;

      case 2:
        return <ExploreChips draw={makeCompensate(k)} height={250}
          label="Move riyals from the sandwich to the juice"
          value={k}
          onPick={(v) => setK(v)}
          chips={[{ v: 0, label: "move 0" }, { v: 1, label: "move 1" }, { v: 2, label: "move 2" }, { v: 6, label: "move 6" }]}
          caption={<MathEl omml={M.compensated} size="xl" display="block" />}
          footnote="Whatever you take from one part you must give to the other." />;

      case 3:
        return <ExploreChips draw={makeBreakApart(step)} height={252}
          label="Add the 46 in friendly jumps"
          value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "start" }, { v: 1, label: "+ 40" }, { v: 2, label: "+ 6" }]}
          caption={<MathEl omml={M.breakApart} size="xl" display="block" />}
          footnote="Tens first, then ones — the same order as the place-value chart." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "w1", text: "200 + 45", target: "comp" },
            { id: "w2", text: "199 + 40 + 6", target: "split" },
            { id: "w3", text: "246 − 100", target: "comp" },
            { id: "w4", text: "245 − 45 − 54", target: "split" }
          ]}
          targets={[
            { id: "comp", label: "compensation — a number was changed to make it friendly" },
            { id: "split", label: "breaking apart — a number was split by place value" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Salma's way — compensate", omml: M.compensated, h: 92,
                  quote: "I gave the 199 one riyal from the 46." }}
          right={{ name: "Rayan's way — break apart", omml: M.breakApart, h: 92,
                   quote: "I added the forty first, then the six." }}
          same={["Both get 245", "Both avoid writing it down", "Both make a friendly number on the way"]}
          diff={["Salma changes a number, Rayan splits one", "Rayan takes two steps", "Salma's is faster when a number is near a ten"]} />;

      case 6:
        return <BoardScreen draw={drawBoard21} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.moveOne, alt: "move one across, the total does not change" }]}
          hand={"take from one part · give the same to the other · the total is safe"}
          cards={[
            { title: "The sum we built", omml: M.compensated, note: "199 became 200, 46 became 45" },
            { title: "Tap to test it on a subtraction", omml: M.sub, revealOmml: M.subComp, reveal: true,
              note: "for subtraction, add the same amount to both numbers" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Add 298 + 57 in your head. Which friendly pair did you use?"
          omml={M.swyk}
          options={[{ v: "a", text: "300 + 55" }, { v: "b", text: "300 + 57" }, { v: "c", text: "290 + 57" }, { v: "d", text: "298 + 60" }]}
          right="a"
          support={{
            yes: "Yes — give 2 to the 298 and take 2 from the 57. Total 355.",
            notYet: "Not yet — whatever you give, you must take.",
            draw: drawSupport21, h: 82,
            hint: "You added 2 to make 300. Where did those 2 riyals have to come from?"
          }} />;

      case 9:
        return <Closing game={game} omml={M.moveOne}
          action="Add two prices in your head at the shop tonight, and tell someone which number you made friendly." />;

      default: return null;
    }
  }
};
