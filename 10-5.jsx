/* ===========================================================================
   Grade 4 · Topic 10 · LESSON 10-5 · Problem Solving: Model with Math
   Standard 4.NF.B.4c / MP.4   I can ... turn a real situation into a picture,
   then into an equation, and check the answer against the situation.
   =========================================================================== */

const M = {
  situation: om(mnor("8 prayer mats \u00b7 each 5/6 of a metre long")),
  equation: om(mt("8\u00d7"), mfrac(5, 6)),
  answer: om(mt("8\u00d7"), mfrac(5, 6), mt("="), mfrac(40, 6), mt("=6"), mfrac(4, 6)),
  checkBack: om(mnor("6 whole metres and a bit \u2014 that matches 8 mats of nearly a metre")),
  wrongModel: om(mt("8+"), mfrac(5, 6), mt("=8"), mfrac(5, 6)),
  otherModel: om(mt("5\u00d7"), mfrac(3, 4), mt("="), mfrac(15, 4), mt("=3"), mfrac(3, 4)),
  rule: om(mnor("picture \u2192 equation \u2192 answer \u2192 check it against the story")),
  swyk: om(mt("6\u00d7"), mfrac(2, 3)),
  swykAnswer: om(mfrac(12, 3), mt("=4"))
};

/* the four-step modelling cycle, one step at a time */
const makeCycle105 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();

  const heads = ["the story", "the picture", "the equation", "the check"];
  const cols = ["#FA7E19", "#2D70B3", "#6042A6", "#388C46"];
  const bw = (W - 100) / 4;
  for (let k = 0; k < 4; k++) {
    const on = k <= step;
    const bx = 50 + k * bw;
    ctx.save();
    ctx.globalAlpha = on ? 1 : 0.22;
    D.rr(ctx, bx + 4, 20, bw - 8, 34, 8);
    ctx.strokeStyle = cols[k]; ctx.lineWidth = k === step ? 2.4 : 1.4;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, heads[k], bx + bw / 2, 37,
      { size: 12.5, col: on ? cols[k] : "rgba(234,244,242,.3)", font: "marker" });
    if (k < 3) {
      D.txt(ctx, "\u2192", bx + bw + 1, 37,
        { size: 15, col: k < step ? "#C9A227" : "rgba(234,244,242,.2)", font: "marker" });
    }
  }

  if (step === 0) {
    D.txt(ctx, "8 prayer mats are laid in a row.", W / 2, 96, { size: 16, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, "Each mat is five sixths of a metre long.", W / 2, 124, { size: 16, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, "How long is the row?", W / 2, 158, { size: 16, col: "#C9A227", font: "marker" });
    D.txt(ctx, "what is being repeated, and how many times?", W / 2, H - 18,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker" });
  } else if (step === 1) {
    for (let g = 0; g < 8; g++) {
      const a = Math.min(1, Math.max(0, (frame / 6 - g * 4) / 12));
      if (a <= 0) continue;
      ctx.save(); ctx.globalAlpha = a;
      D.fracBar(ctx, { x: 46 + (g % 4) * ((W - 92) / 4), y: 74 + Math.floor(g / 4) * 58,
        w: (W - 92) / 4 - 10, h: 30, den: 6, num: 5, prog: 1, col: "#2D70B3", label: false });
      ctx.restore();
    }
    D.txt(ctx, "eight identical mats \u2014 five sixth-pieces in each", W / 2, H - 18,
      { size: 13, col: "#C9A227", font: "marker" });
  } else if (step === 2) {
    D.txt(ctx, "8 \u00d7 5/6", W / 2, 100, { size: 30, col: "#6042A6", font: "marker" });
    D.txt(ctx, "= 40/6", W / 2, 142, { size: 26, col: "#C9A227", font: "marker" });
    D.txt(ctx, "= 6 and 4/6 metres", W / 2, 180, { size: 24, col: "#34D399", font: "marker" });
    D.txt(ctx, "eight groups, five sixth-pieces each, forty sixth-pieces", W / 2, H - 18,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker" });
  } else {
    D.mixedBar(ctx, { x: 46, y: 84, w: W - 92, wholes: 7, den: 6, num: 40, h: 42,
      prog: 1, col: "#388C46", label: false });
    const pulse = 0.6 + Math.sin(frame / 14) * 0.3;
    D.txt(ctx, "each mat is a bit more than three quarters of a metre", W / 2, 158,
      { size: 13.5, col: "#EAF4F2", font: "marker" });
    D.txt(ctx, "so eight of them must land between 6 and 8 metres \u2014 and 6 and 4/6 does",
      W / 2, 184, { size: 13, col: "rgba(234,244,242,.75)", font: "marker" });
    D.txt(ctx, "the answer survives the story", W / 2, H - 18,
      { size: 14, col: "#34D399", font: "marker", alpha: pulse + 0.3 });
  }
};

/* choose the equation that matches the story */
const makeMatch105 = (pick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "8 mats, each 5/6 of a metre", W / 2, 26, { size: 14, col: "#C9A227", font: "marker" });

  const opts = [
    { k: "add", s: "8 + 5/6", note: "this is one mat plus eight metres of nothing", bad: true },
    { k: "mult", s: "8 \u00d7 5/6", note: "eight copies of one mat", bad: false },
    { k: "div", s: "8 \u00f7 5/6", note: "this asks how many mats fit in 8 metres", bad: true }
  ];
  const bw = (W - 80) / 3;
  opts.forEach((o, k) => {
    const bx = 40 + k * bw;
    const on = pick === o.k;
    ctx.save();
    ctx.globalAlpha = on ? 1 : 0.4;
    D.rr(ctx, bx + 6, 52, bw - 12, 56, 9);
    ctx.strokeStyle = on ? (o.bad ? "#C74440" : "#388C46") : "rgba(234,244,242,.3)";
    ctx.lineWidth = on ? 2.4 : 1.3;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, o.s, bx + bw / 2, 82,
      { size: 19, col: on ? (o.bad ? "#E0665F" : "#34D399") : "rgba(234,244,242,.55)", font: "marker" });
  });

  const chosen = opts.find((o) => o.k === pick);
  if (chosen) {
    D.txt(ctx, chosen.note, W / 2, 138,
      { size: 13.5, col: chosen.bad ? "#E0665F" : "#34D399", font: "marker" });
    if (!chosen.bad) {
      D.mixedBar(ctx, { x: 52, y: 160, w: W - 104, wholes: 7, den: 6, num: 40, h: 32,
        prog: 1, col: "#388C46", label: false });
      D.txt(ctx, "40 sixth-pieces = 6 and 4/6 metres", W / 2, H - 16,
        { size: 13, col: "#C9A227", font: "marker" });
    } else {
      const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
      D.txt(ctx, "read the story again \u2014 what is repeated?", W / 2, H - 16,
        { size: 13, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
    }
  } else {
    D.txt(ctx, "pick the equation that matches the story", W / 2, 138,
      { size: 13.5, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

const drawStory105 = (ctx, W, H, frame) => {
  const CYCLE = 700, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 420, 560);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "prayer mats in the school hall", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let g = 0; g < 8; g++) {
    const a = D.at(f, 90 + g * 34, 190 + g * 34);
    if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha = a;
    D.fracBar(ctx, { x: 44 + (g % 4) * ((W - 88) / 4), y: 52 + Math.floor(g / 4) * 54,
      w: (W - 88) / 4 - 8, h: 28, den: 6, num: 5, prog: 1, col: "#FA7E19", label: false });
    ctx.restore();
  }
  if (p3 > 0) {
    D.txt(ctx, "each mat is 5/6 of a metre. how long is the whole row?",
      W / 2, H - 16, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard105 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Story \u2192 picture \u2192 equation \u2192 check" });
  const p1 = D.at(f, 20, 180), p2 = D.at(f, 200, 440), p3 = D.at(f, 460, 640), p4 = D.at(f, 660, 940);

  D.txt(ctx, "8 mats, each 5/6 of a metre", W / 2, 88,
    { size: 17, col: "#FA7E19", font: "marker", alpha: p1 });

  if (p2 > 0) {
    for (let g = 0; g < 8; g++) {
      const a = D.at(f, 200 + g * 26, 280 + g * 26);
      if (a <= 0) continue;
      ctx.save(); ctx.globalAlpha = a;
      D.fracBar(ctx, { x: 100 + (g % 4) * ((W - 200) / 4), y: 112 + Math.floor(g / 4) * 46,
        w: (W - 200) / 4 - 10, h: 26, den: 6, num: 5, prog: 1, col: "#2D70B3", label: false });
      ctx.restore();
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "8 \u00d7 5/6 = 40/6", W / 2, 236, { size: 24, col: "#6042A6", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.mixedBar(ctx, { x: 100, y: 264, w: W - 200, wholes: 7, den: 6, num: 40, h: 36,
      prog: p4, col: "#388C46", label: false });
    D.txt(ctx, "= 6 and 4/6 metres", W / 2, 336,
      { size: 22, col: "#C9A227", font: "marker", alpha: D.at(f, 740, 840) });
    const yb = H - 30;
    D.marker(ctx, [[70, yb - 22], [W - 70, yb - 22]], D.at(f, 800, 900), "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "does it make sense in the hall? eight mats, just under seven metres \u2014 yes",
      W / 2, yb, { size: 14.5, col: "#C9A227", font: "marker", alpha: D.at(f, 820, 930) });
    D.star8(ctx, W - 44, yb - 2, 15, D.at(f, 860, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport105 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.mixedBar(ctx, { x: 22, y: 14, w: W - 44, wholes: 4, den: 3, num: 12, h: 30, prog: 1,
    col: "#2D70B3", label: false });
  D.txt(ctx, "six groups of two thirds fills exactly four wholes", W / 2, 68,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "10-5",
  storageKey: "daf-g4-t10-l5",
  title: "Problem Solving: Model with Math",
  unit: "GRADE 4 · TOPIC 10 · LESSON 10-5 · 4.NF.B.4c · MP.4",
  math: M,
  ixl: ["LX8", "7B3", "5SJ"],

  metas: [
    { phase: "warmup", title: "Which one <em>doesn't belong</em>?",
      lead: "Four ways of writing about eight mats. Every card has a defensible reason.",
      goal: "Surface the difference between adding, multiplying and dividing before the problem.",
      pull: "Only one of these matches the hall.",
      rail: { launch: "Pick a card and say why. There is no single intended answer.",
        monitor: ["Arguing from the operation", "Arguing from the size of the answer", "Arguing from the story"],
        connect: "Which card would you cross out if you saw the mats laid out?",
        misconception: "Choosing an operation by keyword instead of by meaning." } },

    { phase: "launch", title: "Eight mats in the <em>hall</em>",
      lead: "Eight prayer mats are laid end to end. Each one is five sixths of a metre long. Estimate the length of the row.",
      goal: "Create the need to model before calculating.",
      pull: "Now walk the modelling cycle.",
      rail: { launch: "Each mat is a bit under a metre. So the row is roughly what?",
        monitor: ["Reasoning from 'nearly a metre each'", "Guessing under one metre", "Estimating between six and eight"],
        connect: "Why must the answer be less than eight metres?",
        misconception: "Estimating over eight because multiplication 'makes things bigger'." } },

    { phase: "monitor", title: "Story, picture, equation, <em>check</em>",
      lead: "Four steps. Take them in order and do not skip the last one.",
      goal: "Make the modelling cycle visible as a routine, not an accident.",
      pull: "Now choose the right equation from scratch.",
      rail: { launch: "Before we draw, what is being repeated?",
        monitor: ["Identifying the repeated quantity", "Drawing eight equal bars", "Checking against the estimate"],
        connect: "Which step would you be most tempted to skip?",
        misconception: "Writing an equation before understanding what repeats." } },

    { phase: "monitor", title: "Which <em>equation</em> matches?",
      lead: "Three equations. Only one of them describes the hall.",
      goal: "Operation choice is a modelling decision, not a keyword hunt.",
      pull: "Now judge some finished work.",
      rail: { launch: "Say out loud what each equation would mean in the hall.",
        monitor: ["Rejecting addition", "Rejecting division", "Justifying multiplication"],
        connect: "What real question would the division one answer?",
        misconception: "Choosing addition because the word 'and' appears in the story." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each solution. No grading until the class commits.",
      goal: "Practise checking an answer against the situation.",
      pull: "Two students modelled it differently.",
      rail: { launch: "For each one ask: could this be true in the hall?",
        monitor: ["Checking against the estimate", "Recomputing", "Checking the units"],
        connect: "Which wrong answer was the most tempting, and why?",
        misconception: "Accepting an answer that contradicts the estimate." } },

    { phase: "connect", title: "Two ways to <em>model it</em>",
      lead: "Omar drew every mat. Salma wrote one equation straight away. Both must survive the check.",
      goal: "A drawing and an equation are two models of the same situation.",
      pull: "On the board.",
      rail: { launch: "Show both. Ask which one is easier to explain to a parent.",
        monitor: ["Drawing all eight", "Writing the equation first", "Checking both against the story"],
        connect: "What does Omar's drawing show that Salma's equation hides?",
        misconception: "Believing the equation is 'proper maths' and the drawing is not." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "The story becomes a picture, the picture becomes an equation, the answer goes back to the hall.",
      goal: "The moment the routine is taught, not displayed.",
      pull: "Say the cycle in one sentence.",
      rail: { launch: "Build all four steps with them, in order.",
        monitor: ["Predicting the equation", "Predicting the answer", "Insisting on the check"],
        connect: "Who can name all four steps without looking?",
        misconception: "Stopping at the answer and skipping the check." } },

    { phase: "synth", title: "The routine \u2014 <em>and why it works</em>",
      lead: "Four steps that work for every word problem in this book.",
      goal: "Generalise the process, not just this answer.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the four steps aloud, once, together.",
        monitor: ["Naming the repeated quantity", "Writing the equation", "Checking the answer"],
        connect: "Which step catches the most mistakes?",
        misconception: "Treating the check as optional decoration." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on modelling.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Say what repeats before you write.",
        monitor: ["Choosing multiplication", "Multiplying only the numerator", "Checking against the story"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 12/18 by multiplying the denominator." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close the topic on a habit, not a fact.",
      pull: "Tomorrow: Topic 11 — reading and making line plots.",
      rail: { launch: "Three students name the four steps.",
        monitor: ["Models before calculating", "Still jumps to the numbers", "Checks the answer every time"],
        connect: "Who is modelling a problem at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [pick, setPick] = useState(null);

    switch (i) {
      case 0:
        return <WODB award={award}
          prompt="Pick a card. Every one of them has a defensible reason."
          cards={[
            { id: "g1", text: "8 × 5/6", why: "The only one that means eight copies of a mat." },
            { id: "g2", text: "8 + 5/6", why: "The only one that adds instead of repeating." },
            { id: "g3", text: "8 ÷ 5/6", why: "The only one that asks how many mats fit in eight metres." },
            { id: "g4", text: "5/6 × 5/6", why: "The only one with no whole number in it at all." }
          ]} />;

      case 1:
        return <LaunchEstimate draw={drawStory105} height={256} award={award}
          label="How long is the row of mats?" min={1} max={12} start={6} unit="metres"
          after="Locked. Now let us model it properly."
          note="Each mat is a bit more than three quarters of a metre, and there are eight of them." />;

      case 2:
        return <ExploreChips draw={makeCycle105(step)} height={256}
          label="Walk the four steps" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the story" }, { v: 1, label: "the picture" },
                  { v: 2, label: "the equation" }, { v: 3, label: "the check" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="The check is not optional — it is where mistakes get caught." />;

      case 3:
        return <ExploreChips draw={makeMatch105(pick)} height={256}
          label="Which equation matches the hall?" value={pick}
          onPick={(v) => setPick(v)}
          chips={[{ v: "add", label: "8 + 5/6" }, { v: "mult", label: "8 × 5/6" }, { v: "div", label: "8 ÷ 5/6" }]}
          caption={<MathEl omml={M.situation} size="lg" display="block" />}
          footnote="Say each equation as a sentence about the hall before you choose." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "h1", text: "8 × 5/6 = 40/6", target: "yes" },
                  { id: "h2", text: "8 × 5/6 = 40/48", target: "no" },
                  { id: "h3", text: "40/6 = 6 and 4/6", target: "yes" },
                  { id: "h4", text: "8 × 5/6 = 8 and 5/6", target: "no" }]}
          targets={[{ id: "yes", label: "survives the check" },
                    { id: "no", label: "not yet — it fails the story" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Omar's way — draw every mat", draw: drawSupport105, h: 92,
            quote: "I drew all eight, then counted the sixth-pieces." }}
          right={{ name: "Salma's way — one equation", omml: M.answer, h: 92,
            quote: "Eight copies, so eight times five sixths. Then I checked it was about seven metres." }}
          same={["Both give 6 and 4/6 metres", "Both keep sixths as the piece", "Both check against the hall"]}
          diff={["Omar counts, Salma calculates", "Salma's works for eighty mats", "Omar's shows the repeat"]} />;

      case 6:
        return <BoardScreen draw={drawBoard105} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "picture, equation, answer, check it against the story" }]}
          hand={"what repeats? · draw it · write it · answer it · does it fit the story?"}
          cards={[{ title: "The model we built", omml: M.answer, note: "eight mats, six and four sixths metres" },
                  { title: "Tap for the model that fails", omml: M.checkBack, revealOmml: M.wrongModel, reveal: true,
                    note: "adding instead of repeating gives an answer bigger than the hall" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Six bottles of laban are each two thirds full. How much laban is there altogether?"
          omml={M.swyk}
          options={[{ v: "a", text: "12/18" }, { v: "b", text: "8/3" }, { v: "c", text: "4" }, { v: "d", text: "6 and 2/3" }]}
          right="c"
          support={{ yes: "Yes — 12 third-pieces, which fills exactly four bottles.",
            notYet: "Not yet — six copies of two thirds is twelve thirds.",
            draw: drawSupport105, h: 92, hint: "Multiply the numerator only, then rename: 12/3 = 4." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a repeated fraction at home — slices, cups, steps — and model it with a picture and an equation." />;

      default: return null;
    }
  }
};
