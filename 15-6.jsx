/* ===========================================================================
   Grade 4 · Topic 15 · LESSON 15-6 · Problem Solving: Use Appropriate Tools
   Standard MP.5 · 4.MD.C   I can ... choose the right tool for a measuring
   job, and say why the other tools would not do.
   =========================================================================== */

const M = {
  tools: om(mnor("ruler \u00b7 protractor \u00b7 square corner \u00b7 mental benchmark")),
  matchAngle: om(mnor("an angle in degrees needs a protractor")),
  matchLength: om(mnor("a length in centimetres needs a ruler")),
  benchmark: om(mnor("\u201cmore or less than a right angle?\u201d needs no tool at all")),
  overkill: om(mnor("a protractor cannot tell you how long a ray is")),
  estimateFirst: om(mnor("estimate first \u00b7 the tool confirms, it does not think")),
  rule: om(mnor("match the tool to the question, not to the picture")),
  swyk: om(mnor("is this corner square? which tool?")),
  swykAnswer: om(mnor("a square corner is enough"))
};

/* the job, and the three tools competing for it */
const makeTool156 = (job) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const jobs = {
    angle: { q: "how many degrees is this corner?", best: "protractor",
      why: "only the protractor reads degrees" },
    length: { q: "how long is this ray?", best: "ruler",
      why: "a protractor measures turn, not length" },
    square: { q: "is this corner square?", best: "square corner",
      why: "you only need yes or no, so the corner of a page is enough" }
  };
  const j = jobs[job];
  D.txt(ctx, j.q, W / 2, 30, { size: 15, col: "#C9A227", font: "marker" });

  const tools = ["ruler", "protractor", "square corner"];
  const bw = (W - 80) / 3;
  tools.forEach((t, k) => {
    const bx = 40 + k * bw, best = t === j.best;
    ctx.save();
    ctx.globalAlpha = best ? 1 : 0.36;
    D.rr(ctx, bx + 10, 62, bw - 20, 80, 10);
    ctx.strokeStyle = best ? "#34D399" : "rgba(234,244,242,.35)";
    ctx.lineWidth = best ? 2.4 : 1.3;
    ctx.stroke();
    ctx.restore();
    /* a tiny icon of each tool, drawn not printed */
    const icx = bx + bw / 2, icy = 96;
    ctx.save();
    ctx.globalAlpha = best ? 1 : 0.36;
    if (t === "ruler") {
      D.rr(ctx, icx - 40, icy - 9, 80, 18, 3);
      ctx.strokeStyle = best ? "#34D399" : "rgba(234,244,242,.5)"; ctx.lineWidth = 1.6; ctx.stroke();
      for (let m = 1; m < 8; m++) {
        ctx.beginPath();
        ctx.moveTo(icx - 40 + m * 10, icy - 9);
        ctx.lineTo(icx - 40 + m * 10, icy - 9 + (m % 2 ? 6 : 10));
        ctx.stroke();
      }
    } else if (t === "protractor") {
      ctx.beginPath();
      ctx.arc(icx, icy + 8, 30, Math.PI, 0);
      ctx.closePath();
      ctx.strokeStyle = best ? "#34D399" : "rgba(234,244,242,.5)"; ctx.lineWidth = 1.6; ctx.stroke();
      for (let m = 0; m <= 6; m++) {
        const ang = Math.PI + (m / 6) * Math.PI;
        ctx.beginPath();
        ctx.moveTo(icx + Math.cos(ang) * 24, icy + 8 + Math.sin(ang) * 24);
        ctx.lineTo(icx + Math.cos(ang) * 30, icy + 8 + Math.sin(ang) * 30);
        ctx.stroke();
      }
    } else {
      D.marker(ctx, [[icx - 24, icy - 16], [icx - 24, icy + 16], [icx + 24, icy + 16]],
        1, best ? "#34D399" : "rgba(234,244,242,.5)", 2.2);
      D.marker(ctx, [[icx - 14, icy + 16], [icx - 14, icy + 6], [icx - 24, icy + 6]],
        1, best ? "#34D399" : "rgba(234,244,242,.5)", 1.5);
    }
    ctx.restore();
    D.txt(ctx, t, icx, 158,
      { size: 12.5, col: best ? "#34D399" : "rgba(234,244,242,.45)", font: "marker" });
  });

  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, j.why, W / 2, H - 30,
    { size: 14, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
  D.txt(ctx, "the question decides the tool, not the picture", W / 2, H - 10,
    { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
};

/* estimate first, then confirm with the tool */
const makeConfirm156 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 40, cy = H - 48, r = Math.min(140, H - 78);

  D.angleFig(ctx, { cx: cx, cy: cy, r: r, start: 0, deg: 115,
    protractor: step >= 2, prog: 1,
    col: "#2D70B3", arcCol: step >= 2 ? "#34D399" : "#C9A227",
    label: step === 0 ? "?" : step === 1 ? "more than 90" : "115\u00b0" });

  if (step >= 1) {
    D.angleFig(ctx, { cx: cx, cy: cy, r: r * 0.5, start: 0, deg: 90, prog: 1,
      col: "rgba(0,0,0,0)", arcCol: "rgba(250,126,25,.75)", label: false, square: true });
  }
  const heads = ["an angle to measure", "compare it with a square corner first",
    "now the protractor confirms it"];
  D.txt(ctx, heads[step], W / 2, 26, { size: 13.5, col: "rgba(234,244,242,.68)", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, step === 2 ? "115 is over 90 \u2014 the estimate and the tool agree"
       : step === 1 ? "it opens wider than the square corner, so it must beat 90"
       : "resist reaching for the tool straight away",
    W / 2, H - 12, { size: 13, col: step === 2 ? "#34D399" : "#C9A227", font: "marker",
      alpha: pulse + 0.4 });
};

const drawWarm156 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "three questions about the same drawing", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  const qs = ["how long is this ray?", "how many degrees is this corner?", "is this corner square?"];
  qs.forEach((s, k) => {
    const a = D.at(f, 50 + k * 120, 190 + k * 120);
    D.txt(ctx, s, W / 2, 78 + k * 36, { size: 16, col: "#6042A6", font: "marker", alpha: a });
  });
  D.txt(ctx, "no question yet \u2014 well, three of them", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 480, 570) });
};

const drawStory156 = (ctx, W, H, frame) => {
  const CYCLE = 640, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 400, 540);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "checking the new noticeboard is hung straight", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.polyFig(ctx, { pts: [[W / 2 - 130, 62], [W / 2 + 130, 70], [W / 2 + 130, 168], [W / 2 - 130, 160]],
    prog: D.at(f, 60, 340), col: "#FA7E19", rightAngles: [0], fill: true });
  if (p3 > 0) {
    D.txt(ctx, "which tool tells you whether the corner is square?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard156 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Match the tool to the question" });
  const p3 = D.at(f, 520, 720), p4 = D.at(f, 760, 920);

  const rows = [
    { q: "how long?", t: "ruler", col: "#2D70B3", at: [20, 200] },
    { q: "how many degrees?", t: "protractor", col: "#FA7E19", at: [220, 400] },
    { q: "is it square?", t: "a square corner", col: "#388C46", at: [420, 600] }
  ];
  rows.forEach((j, k) => {
    const a = D.at(f, j.at[0], j.at[1]);
    if (a <= 0) return;
    D.txt(ctx, j.q, W / 2 - 130, 116 + k * 52,
      { size: 17, col: "#EAF4F2", font: "marker", alpha: a });
    D.txt(ctx, "\u2192", W / 2 + 20, 116 + k * 52,
      { size: 17, col: "#C9A227", font: "marker", alpha: a });
    D.txt(ctx, j.t, W / 2 + 150, 116 + k * 52,
      { size: 17, col: j.col, font: "marker", alpha: a });
  });

  if (p3 > 0) {
    D.txt(ctx, "and before any tool: estimate", W / 2, 296,
      { size: 18, col: "#34D399", font: "marker", alpha: p3 });
    D.angleFig(ctx, { cx: W / 2, cy: 384, r: 76, start: 0, deg: 115, prog: p3,
      col: "#2D70B3", arcCol: "#C9A227", label: "115\u00b0" });
  }
  if (p4 > 0) {
    D.txt(ctx, "the tool confirms your thinking \u2014 it never does the thinking",
      W / 2, H - 22, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 26, 14, D.at(f, 860, 935), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport156 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.polyFig(ctx, { pts: [[26, 16], [W - 26, 16], [W - 26, H - 20], [26, H - 20]],
    prog: 1, col: "#2D70B3", rightAngles: [0, 1], fill: false });
  D.txt(ctx, "a yes-or-no question needs no numbers", W / 2, H - 4,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "15-6",
  storageKey: "daf-g4-t15-l6",
  title: "Problem Solving: Use Appropriate Tools",
  unit: "GRADE 4 · TOPIC 15 · LESSON 15-6 · MP.5 · 4.MD.C",
  math: M,
  ixl: ["JBL"],

  metas: [
    { phase: "warmup", title: "Which one <em>doesn't belong</em>?",
      lead: "Four measuring tools. Every one of them has a defensible reason.",
      goal: "Put tool choice on the table before any job appears.",
      pull: "One of these is not really a tool at all.",
      rail: { launch: "Pick a tool and say why. No single intended answer.",
        monitor: ["Arguing from what it measures", "Arguing from precision", "Spotting the mental one"],
        connect: "Which one do you already carry everywhere?",
        misconception: "Believing a measurement always needs an instrument." } },

    { phase: "launch", title: "The new <em>noticeboard</em>",
      lead: "The caretaker wants to know whether the noticeboard corner is square. How many tools would do the job?",
      goal: "Create the need to match a tool to a question.",
      pull: "Now let us match each job to its tool.",
      rail: { launch: "Commit to a number of tools that could answer this.",
        monitor: ["Choosing a protractor", "Choosing a square corner", "Choosing a ruler"],
        connect: "Does the caretaker need a number, or just yes or no?",
        misconception: "Reaching for the most precise tool automatically." } },

    { phase: "monitor", title: "One job, three <em>tools</em>",
      lead: "Change the question and watch which tool lights up.",
      goal: "The question, not the picture, decides the tool.",
      pull: "But do not reach for the tool first.",
      rail: { launch: "Say which tool you would grab, then tap.",
        monitor: ["Matching degrees to protractor", "Matching length to ruler", "Accepting a square corner"],
        connect: "Why can't a protractor answer the length question?",
        misconception: "Assuming the protractor is always the better tool." } },

    { phase: "monitor", title: "Estimate <em>first</em>",
      lead: "Compare with a square corner before you pick anything up.",
      goal: "The estimate is what makes a measurement trustworthy.",
      pull: "Now judge some choices.",
      rail: { launch: "More or less than a right angle? Answer before the tool appears.",
        monitor: ["Comparing to 90", "Waiting for the tool", "Checking the tool against the estimate"],
        connect: "What would you do if the tool disagreed with your estimate?",
        misconception: "Believing the tool cannot be misread." } },

    { phase: "monitor", title: "Good choice or <em>not yet</em>?",
      lead: "Sort each tool choice. No grading until the class commits.",
      goal: "Practise justifying a tool, not just naming one.",
      pull: "Two students chose different tools for the same job.",
      rail: { launch: "For each one ask: what does the question actually want?",
        monitor: ["Matching to the question", "Matching to the picture", "Justifying out loud"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Choosing a tool because it is the one on the desk." } },

    { phase: "connect", title: "Two reasonable <em>choices</em>",
      lead: "Layla used a protractor to check the corner. Omar used the corner of his exercise book.",
      goal: "Both work; one is faster and enough.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask whether either one is wrong.",
        monitor: ["Using the protractor", "Using a square corner", "Judging which is enough"],
        connect: "When would Omar's method not be enough?",
        misconception: "Believing the simpler tool is always inferior." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "How long? A ruler. How many degrees? A protractor. Is it square? A corner will do.",
      goal: "The moment tool choice is taught as reasoning.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build the three pairings with them.",
        monitor: ["Predicting each pairing", "Naming the estimate step", "Restating the rule"],
        connect: "What comes before every one of these tools?",
        misconception: "Skipping the estimate." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that stops you measuring the wrong thing accurately.",
      goal: "Generalise the habit, not the tool list.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Reading the question first", "Choosing the tool", "Estimating before measuring"],
        connect: "What does the tool actually contribute?",
        misconception: "Letting the tool replace the thinking." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on tool choice.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Does the question want a number?",
        monitor: ["Noticing it is yes-or-no", "Choosing a protractor", "Justifying the choice"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Choosing a protractor for a yes-or-no question." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close the topic on a habit, not a fact.",
      pull: "Tomorrow: Topic 16 — lines, angles and shapes.",
      rail: { launch: "Three students match a job to a tool.",
        monitor: ["Reads the question first", "Grabs a tool first", "Ready for shapes"],
        connect: "Who is choosing a tool at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [job, setJob] = useState("angle");
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Pick a card. Every one of them has a defensible reason."
          cards={[
            { id: "a1", text: "ruler", why: "The only one that measures length." },
            { id: "a2", text: "protractor", why: "The only one that reads degrees." },
            { id: "a3", text: "square corner", why: "The only one that answers yes or no." },
            { id: "a4", text: "your own estimate", why: "The only one that is not an object at all." }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawStory156} height={256} award={award}
          label="How many of the tools could answer this?" min={1} max={4} start={2} unit="tools"
          after="Locked. Now let us match each job to its tool."
          note="The caretaker only wants to know whether it is square — not by how much." />;

      case 2:
        return <ExploreChips draw={makeTool156(job)} height={256}
          label="Change the question" value={job}
          onPick={(v) => setJob(v)}
          chips={[{ v: "angle", label: "how many degrees?" }, { v: "length", label: "how long?" },
                  { v: "square", label: "is it square?" }]}
          caption={<MathEl omml={M.tools} size="xl" display="block" />}
          footnote="The question decides the tool. The picture never does." />;

      case 3:
        return <ExploreChips draw={makeConfirm156(step)} height={256}
          label="Estimate, then confirm" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the angle" }, { v: 1, label: "compare with a corner" },
                  { v: 2, label: "now measure" }]}
          caption={<MathEl omml={M.estimateFirst} size="lg" display="block" />}
          footnote="If the tool disagrees with a good estimate, check the tool." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "degrees → protractor", target: "yes" },
                  { id: "b2", text: "degrees → ruler", target: "no" },
                  { id: "b3", text: "is it square? → square corner", target: "yes" },
                  { id: "b4", text: "how long? → protractor", target: "no" }]}
          targets={[{ id: "yes", label: "the tool fits the question" },
                    { id: "no", label: "not yet — wrong kind of answer" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Layla's way — measure it", omml: M.matchAngle, h: 92,
            quote: "I put the protractor on and read 90 exactly." }}
          right={{ name: "Omar's way — compare it", omml: M.benchmark, h: 92,
            quote: "I held my book corner against it. It matched, so it is square." }}
          same={["Both answer the question", "Both are correct", "Both check the same corner"]}
          diff={["Layla gets a number", "Omar gets yes or no", "Omar's is faster and enough here"]} />;

      case 6:
        return <BoardScreen draw={drawBoard156} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "match the tool to the question, not to the picture" }]}
          hand={"what does the question want? · estimate · then pick the tool that gives it"}
          cards={[{ title: "Degrees need a protractor", omml: M.matchAngle, note: "only it reads turn" },
                  { title: "Tap for the limit", omml: M.matchLength, revealOmml: M.overkill, reveal: true,
                    note: "a protractor cannot measure length" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="You only need to know whether a corner is square. Which tool is enough?"
          omml={M.swyk}
          options={[{ v: "a", text: "a ruler" }, { v: "b", text: "a protractor" },
                    { v: "c", text: "a square corner" }, { v: "d", text: "no tool at all" }]}
          right="c"
          support={{ yes: "Yes — a yes-or-no question needs no numbers.",
            notYet: "Not yet — you do not need a degree measurement to answer yes or no.",
            draw: drawSupport156, h: 96, hint: "The corner of a book or a page will settle it instantly." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Pick a measuring job at home, name the tool, and say why the others would not do." />;

      default: return null;
    }
  }
};
