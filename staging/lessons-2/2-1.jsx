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
    {
      phase: "warmup",
      title: "The merchant who <em>checked before ink dried</em>",
      lead: "Two prices on the souq ledger. The merchant's pen hovers — and the ink is still wet.",
      goal: "An invitation — every student has something to notice before any question.",
      pull: "One of those numbers is almost a friendly number.",
      rail: {
        launch: "Fictional frame. Ask only: what must the merchant check, and before when?",
        monitor: ["Noticing 199 is one short of 200", "Watching the pen wait", "Wonding what 'move one across' means"],
        connect: "Which number sits next to a friendly one?",
        misconception: "Thinking the total changes when an amount is moved across."
      }
    },
    {
      phase: "launch",
      title: "Sixty seconds before <em>the ink dries</em>",
      lead: "199 + 46, in the head, before the ledger line is committed. Lock your checked prediction.",
      goal: "Create the need — some numbers are easier to add than others.",
      pull: "Estimate first, then we will make it friendly.",
      rail: {
        launch: "State that the souq quantities are simulated planning data.",
        monitor: ["Estimating before the model", "Naming what made it easier", "Protecting the total"],
        connect: "What did your brain do before any pencil?",
        misconception: "Treating the souq numbers as current market prices."
      }
    },
    {
      phase: "monitor",
      title: "Zayd moves <em>one across</em>",
      lead: "Take from one part, give to the other. Watch what happens to the total.",
      goal: "Compensation: the total is protected when an amount moves across.",
      pull: "There is another way to make it easy. Let us jump instead.",
      rail: {
        launch: "Predict the new pair before moving the riyals.",
        monitor: ["Moving across", "Checking the total is unchanged", "Naming the strategy compensation"],
        connect: "Why does the total stay the same when one moves across?",
        misconception: "Taking from one part without giving the same amount to the other."
      }
    },
    {
      phase: "monitor",
      title: "Omar labels the <em>working</em> by strategy",
      lead: "Four pieces of the merchant's working, four names behind them. Commit to all four before the folio checks.",
      goal: "Name the strategies so students can choose one on purpose.",
      pull: "Now let us watch two students explain the same problem.",
      rail: {
        launch: "Do not grade until the class commits to all four matches.",
        monitor: ["Naming compensation", "Naming break apart", "Naming association"],
        connect: "Which strategy would you choose for 998 + 75?",
        misconception: "Sorting by the look of the expression rather than the strategy inside it."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em>",
      lead: "The boys step back. Real student strategies for making it easy take the board.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both methods reach the same total", "Preferring one method", "Explaining why both work"],
        connect: "Where do both methods protect the total?",
        misconception: "Treating one strategy as the only real one."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Draw the two parts. Move one across. The total bar never changes length.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Applying it to a new pair", "Checking the total bar"],
        connect: "Which part of the rule stops the total from changing?",
        misconception: "Memorising 'move one' without knowing the total is protected."
      }
    },
    {
      phase: "swyk",
      title: "Omar stamps only a total he can <em>defend</em>",
      lead: "298 + 57 — the ink is still wet. What is the checked total, and what did you move?",
      goal: "Apply compensation independently to a new pair.",
      pull: "A defended total stamps the first mental-math line of the souq ledger.",
      rail: {
        launch: "Two minutes. Require the compensation, not only the answer.",
        monitor: ["Moving two across", "Making 300", "Checking 300 + 55"],
        connect: "What did you move, and where did it go?",
        misconception: "Answering 355 because it looks right, with no friendly-number reason."
      }
    },
    {
      phase: "connect",
      title: "The mental-math lines are <em>inked</em>",
      lead: "The first ledger lines are checked and committed. Then three sealed bids appear on the council table.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: is my answer even reasonable?",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Explaining compensation", "Using friendly numbers", "Ready to defend estimates"],
        connect: "Where have you 'moved across' to make something easier?",
        misconception: "Remembering the merchant but not the strategy."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [k, setK] = useState(1);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The page before the ink dries"
            text="The lantern opens the souq ledger on a fresh line. Two prices are down, the merchant's pen is hovering, and the ink is still wet. A mental error now becomes a permanent record."
            clue="One of the two numbers sits one away from a friendly one">
            <NoticeWonder draw={drawCanteen} height={256} award={award}
              notices={["199 is one short of 200", "The pen has not committed", "No total is written yet", "An error would become ink"]}
              wonders={["What makes 199 + 46 hard?", "What sits next to 199?", "Can the total be protected?"]}
              footnote="The story sets the stakes. The mental strategy is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar checks before the record commits"
            text="Omar marks the souq quantities as simulated planning data — then asks for the checked total before any ink dries."
            clue="Lock a prediction before the model appears">
            <LaunchEstimate draw={drawCanteen} height={256} award={award}
              label="Sixty seconds: what is 199 + 46?"
              min={200} max={320} start={240} unit="riyals"
              after="Locked. Now let us see what the merchant's brain did to make it easy."
              note="Souq quantities here are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds the move-across frame"
            text="He can move riyals from one part to the other — but the class must predict the new pair before the frame moves."
            clue="Whatever you take, you give — the total does not move">
            <ExploreChips draw={makeCompensate(k)} height={250}
              label="Move riyals from the 46 to the 199"
              value={k}
              onPick={(v) => setK(v)}
              chips={[{ v: 0, label: "move 0" }, { v: 1, label: "move 1" }, { v: 2, label: "move 2" }, { v: 6, label: "move 6" }]}
              caption={<MathEl omml={M.compensated} size="xl" display="block" />}
              footnote="Move one across: 199 + 46 becomes 200 + 45 — the total is protected." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar labels the working by strategy"
            text="The merchant's working keeps its marks; Omar must match each one to the strategy behind it. The class commits to all four before the folio checks."
            clue="Compensation moves across. Break apart hops by place.">
            <CardSort award={award} columns={2} commitLabel="Name the four strategies"
              items={[
                { id: "s1", text: "199 + 46  →  200 + 45", target: "t1" },
                { id: "s2", text: "245 − 99  →  246 − 100", target: "t1" },
                { id: "s3", text: "199 + 40 + 6", target: "t2" },
                { id: "s4", text: "(199 + 1) + 45", target: "t2" }
              ]}
              targets={[
                { id: "t1", label: "Compensation" },
                { id: "t2", label: "Break apart & associate" }
              ]} />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest make-it-easy methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="Two routes, one protected total">
          <CompareConnect award={award}
            left={{ name: "Reem's way — compensate", omml: M.compensated, h: 92,
                    quote: "I take one from the 46 and give it to the 199 — the total does not move." }}
            right={{ name: "Tariq's way — break apart", omml: M.breakApart, h: 92,
                     quote: "I add the 40, then the 6 — place-value jumps, no carrying in my head." }}
            same={["Both reach 245", "Both protect the total", "Both use friendly numbers"]}
            diff={["Reem moves across, Tariq splits", "Reem's works best one-away from round", "Tariq's works for any pair"]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The shared rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Move across — the total never changes length">
            <BoardScreen draw={drawBoard21} height={380}
              caption="Mental math before the ink — check, then commit." />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar stamps only a total he can defend"
            text="A fresh line on the ledger: 298 + 57. Name the checked total — and say what you moved and where."
            clue="Two away from 300">
            <ShowWhatYouKnow award={award}
              prompt="The ink is still wet: 298 + 57. What is the checked total?"
              options={[{ v: "a", text: "355" }, { v: "b", text: "345" }, { v: "c", text: "353" }, { v: "d", text: "365" }]}
              right="a"
              support={{
                yes: "Yes — move two across: 300 + 55 = 355. The total was protected the whole way.",
                notYet: "Not yet — make it friendly. What sits right next to 298?",
                hint: "Move two from the 57 across to the 298: 300 + 55."
              }} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryHandoff
            title="The first lines are inked"
            text="Omar files the checked mental-math lines. Zayd sees three sealed bid cards appear on the council table — the covers come off tomorrow, and each total must be reasonable before it is trusted."
            artifact="Souq ledger · mental-math checked lines"
            next="Three bids under sealed covers — which total is even possible?">
            <Closing game={game} omml={M.swykWork}
              action="Tonight: pick a near-round sum from real life, make it friendly in your head, and say what you moved across." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
