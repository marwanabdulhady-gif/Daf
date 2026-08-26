/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-9 · Divide Whole Numbers by Unit Fractions
   Standard 5.NF.B.7b   I can ... work out how many unit fractions fit inside a
   whole number, and see why the answer is bigger than the number.
   =========================================================================== */

const M = {
  problem: om(mt("3\u00f7"), mfrac(1, 4)),
  question: om(mnor("how many quarters fit inside 3 wholes?")),
  answer: om(mt("3\u00f7"), mfrac(1, 4), mt("=12")),
  perWhole: om(mnor("4 quarters in each whole, and there are 3 wholes")),
  bigger: om(mnor("dividing by a piece smaller than one gives a bigger answer")),
  general: om(mt("n\u00f7"), mfrac(1, "b"), mt("=n\u00d7b")),
  rule: om(mnor("ask how many pieces fit \u00b7 that is multiplying, not shrinking")),
  swyk: om(mt("5\u00f7"), mfrac(1, 3)),
  swykAnswer: om(mt("5\u00d73=15"))
};

/* the wholes, cut into unit fractions and counted */
const makeCount179 = (den) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124, wholes = 3;
  const gap = 12, ww = (w - gap * (wholes - 1)) / wholes;

  for (let g = 0; g < wholes; g++) {
    const gx = x + g * (ww + gap);
    for (let p = 0; p < den; p++) {
      const idx = g * den + p;
      const a = Math.min(1, Math.max(0, (frame / 4 - idx * 2.2) / 9)) * 0.35 + 0.65;
      ctx.save();
      ctx.globalAlpha = a;
      D.rr(ctx, gx + (p * ww) / den + 1.2, 66, ww / den - 2.4, 56, 4);
      ctx.fillStyle = "#388C46";
      ctx.globalAlpha = a * 0.55;
      ctx.fill();
      ctx.globalAlpha = a;
      ctx.strokeStyle = "rgba(234,244,242,.8)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
    }
    ctx.save();
    D.rr(ctx, gx, 64, ww, 60, 6);
    ctx.strokeStyle = "rgba(234,244,242,.9)"; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "1 whole", gx + ww / 2, 142,
      { size: 11.5, col: "rgba(234,244,242,.6)", font: "mono", weight: 600 });
  }
  const total = den * wholes;
  D.txt(ctx, "how many 1/" + den + " pieces fit inside 3 wholes?", W / 2, 30,
    { size: 13.5, col: "rgba(234,244,242,.7)", font: "marker" });
  D.txt(ctx, den + " in each whole, " + wholes + " wholes, so " + total + " altogether",
    W / 2, H - 34, { size: 15, col: "#EAF4F2", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "3 \u00f7 1/" + den + " = " + total, W / 2, H - 12,
    { size: 15, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

/* why the answer grows */
const makeGrow179 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [
    { s: "3 \u00f7 1 = 3", note: "three whole pieces fit", col: "#EAF4F2" },
    { s: "3 \u00f7 1/2 = 6", note: "halves are smaller, so more of them fit", col: "#2D70B3" },
    { s: "3 \u00f7 1/4 = 12", note: "quarters are smaller again", col: "#34D399" }
  ];
  for (let r = 0; r <= step && r < rows.length; r++) {
    const fresh = r === step;
    D.txt(ctx, rows[r].s, W / 2, 60 + r * 56,
      { size: 26, col: rows[r].col, font: "marker",
        alpha: fresh ? 0.72 + Math.sin(frame / 14) * 0.24 : 1 });
    if (fresh) {
      D.txt(ctx, rows[r].note, W / 2, 86 + r * 56,
        { size: 11.5, col: "rgba(234,244,242,.62)", font: "marker" });
    }
  }
  D.txt(ctx, "the smaller the piece, the more of them fit", W / 2, 26,
    { size: 13, col: "#C9A227", font: "marker" });
  D.txt(ctx, step >= 2 ? "so the answer gets bigger, not smaller"
       : "keep making the piece smaller",
    W / 2, H - 12, { size: 13.5, col: step >= 2 ? "#34D399" : "rgba(234,244,242,.62)",
      font: "marker" });
};

const drawWarm179 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124, gap = 12, ww = (w - gap * 2) / 3;
  for (let g = 0; g < 3; g++) {
    const a = D.at(f, 20 + g * 110, 150 + g * 110);
    if (a <= 0) continue;
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, x + g * (ww + gap), 78, ww, 60, 7);
    ctx.strokeStyle = "#6042A6"; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.restore();
  }
  D.txt(ctx, "three whole trays, uncut", W / 2, 34,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 440, 530) });
};

const drawStory179 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "three kunafa trays for the school fair", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const x = 62, w = W - 124, gap = 12, ww = (w - gap * 2) / 3;
  for (let g = 0; g < 3; g++) {
    const a = D.at(f, 50 + g * 90, 170 + g * 90);
    if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha = a * 0.55;
    D.rr(ctx, x + g * (ww + gap), 68, ww, 58, 7);
    ctx.fillStyle = "#FA7E19"; ctx.fill();
    ctx.globalAlpha = a;
    ctx.strokeStyle = "rgba(234,244,242,.85)"; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
  }
  if (p3 > 0) {
    D.txt(ctx, "each portion is a quarter of a tray. how many portions?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard179 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "How many pieces fit inside?" });
  const p3 = D.at(f, 520, 720), p4 = D.at(f, 760, 920);
  const x = 160, w = W - 320, gap = 16, ww = (w - gap * 2) / 3;

  for (let g = 0; g < 3; g++) {
    for (let p = 0; p < 4; p++) {
      const idx = g * 4 + p;
      const a = D.at(f, 20 + idx * 34, 120 + idx * 34);
      if (a <= 0) continue;
      const gx = x + g * (ww + gap);
      ctx.save();
      ctx.globalAlpha = a * 0.55;
      D.rr(ctx, gx + (p * ww) / 4 + 1.5, 110, ww / 4 - 3, 74, 5);
      ctx.fillStyle = "#388C46"; ctx.fill();
      ctx.globalAlpha = a;
      ctx.strokeStyle = "rgba(234,244,242,.8)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.restore();
      D.txt(ctx, String(idx + 1), gx + (p + 0.5) * (ww / 4), 152,
        { size: 13, col: "#EAF4F2", font: "marker", alpha: a });
    }
  }
  if (p3 > 0) {
    D.txt(ctx, "4 quarters in each whole \u00d7 3 wholes = 12 portions", W / 2, 246,
      { size: 19, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "3 \u00f7 1/4 = 12", W / 2, 300,
      { size: 30, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "dividing by a piece smaller than one gives a bigger answer",
      W / 2, H - 24, { size: 15.5, col: "#34D399", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 860, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport179 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 24, w = W - 48, gap = 6, ww = (w - gap * 4) / 5;
  for (let g = 0; g < 5; g++) {
    for (let p = 0; p < 3; p++) {
      ctx.save();
      D.rr(ctx, x + g * (ww + gap) + (p * ww) / 3 + 1, 18, ww / 3 - 2, 34, 3);
      ctx.fillStyle = "#388C46"; ctx.globalAlpha = 0.5; ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "rgba(234,244,242,.7)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();
    }
  }
  D.txt(ctx, "3 thirds in each of 5 wholes = 15", W / 2, H - 8,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "17-9",
  storageKey: "daf-g4-t17-l9",
  title: "Divide Whole Numbers by Unit Fractions",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-9 · 5.NF.B.7b",
  math: M,
  ixl: ["QXJ", "EY2"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Three whole trays appear, uncut. No question yet.",
      goal: "Establish the whole before any cutting begins.",
      pull: "Nothing has been cut yet.",
      rail: { launch: "Describe what you see. Do not cut anything yet.",
        monitor: ["Counting three", "Noticing they are identical", "Suggesting cuts"],
        connect: "If we cut each one into quarters, how many pieces would there be?",
        misconception: "Counting the trays as pieces already." } },

    { phase: "launch", title: "Portions at the school <em>fair</em>",
      lead: "Three kunafa trays, and each portion is a quarter of a tray. Estimate how many portions there are.",
      goal: "Create the need for division by a unit fraction.",
      pull: "Now let us cut them.",
      rail: { launch: "More or fewer than three? Commit before you calculate.",
        monitor: ["Estimating twelve", "Estimating under three", "Reasoning four per tray"],
        connect: "Will there be more portions or fewer than three?",
        misconception: "Expecting division to give a smaller answer." } },

    { phase: "monitor", title: "Count the <em>pieces</em>",
      lead: "Cut the wholes into unit fractions and count everything.",
      goal: "Division by a unit fraction is a counting question.",
      pull: "So why does the answer grow?",
      rail: { launch: "Predict the count before you tap each piece size.",
        monitor: ["Counting per whole", "Multiplying by three", "Counting one by one"],
        connect: "What happened to the count when the pieces got smaller?",
        misconception: "Thinking smaller pieces means fewer of them." } },

    { phase: "monitor", title: "Why the answer <em>grows</em>",
      lead: "Divide three by one, then by a half, then by a quarter.",
      goal: "Make the counter-intuitive result feel inevitable.",
      pull: "Now judge some answers.",
      rail: { launch: "Predict what happens as the piece shrinks.",
        monitor: ["Noticing the answers grow", "Explaining why", "Expecting them to shrink"],
        connect: "What would 3 divided by one tenth be?",
        misconception: "Believing dividing always makes numbers smaller." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Practise the size sense for this operation.",
      pull: "Two students explained the same answer differently.",
      rail: { launch: "For each one ask: should the answer be bigger or smaller?",
        monitor: ["Checking the size", "Recomputing", "Sketching the pieces"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Giving an answer smaller than the whole number." } },

    { phase: "connect", title: "Two ways to <em>see it</em>",
      lead: "Anees counted the pieces in one whole and multiplied. Yousef counted all twelve.",
      goal: "Counting and multiplying agree, and one scales.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one survives twenty trays.",
        monitor: ["Counting all", "Counting per whole then multiplying", "Comparing"],
        connect: "Where does the multiplication come from?",
        misconception: "Believing the multiplication is a separate trick." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Four quarters in each whole, three wholes, twelve portions.",
      goal: "The moment division by a unit fraction is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Cut all three trays with them, counting aloud.",
        monitor: ["Counting per whole", "Multiplying", "Naming the total"],
        connect: "Who can say why the answer is bigger than three?",
        misconception: "Memorising 'multiply by the denominator' with no picture." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence, and the surprising answer stops being surprising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Asking how many fit", "Multiplying by the denominator", "Checking the size"],
        connect: "What is 6 divided by one fifth?",
        misconception: "Applying the rule without the 'how many fit' question." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on unit-fraction division.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. How many thirds fit in one whole?",
        monitor: ["Counting three per whole", "Multiplying by five", "Dividing instead"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 5/3 by treating it as a fraction of five." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: the last lesson — measuring volume with cubes.",
      rail: { launch: "Three students explain why the answer grows.",
        monitor: ["Counts the pieces", "Still expects a smaller answer", "Ready for volume"],
        connect: "Who is cutting something into equal pieces at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [den, setDen] = useState(2);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm179} height={256} award={award}
          notices={["There are three trays", "None of them are cut", "They are the same size", "Each one is one whole"]}
          wonders={["How many pieces if we cut them?", "Does the piece size matter?", "Would there be more than three?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory179} height={256} award={award}
          label="How many quarter-tray portions?" min={1} max={24} start={8} unit="portions"
          after="Locked. Now let us cut the trays."
          note="Each tray gives more than one portion, and there are three trays." />;

      case 2:
        return <ExploreChips draw={makeCount179(den)} height={256}
          label="Cut them into unit fractions" value={den}
          onPick={(v) => setDen(v)}
          chips={[{ v: 2, label: "halves" }, { v: 3, label: "thirds" },
                  { v: 4, label: "quarters" }, { v: 6, label: "sixths" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Count how many fit in one whole, then multiply by the number of wholes." />;

      case 3:
        return <ExploreChips draw={makeGrow179(step)} height={256}
          label="Watch the answer grow" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "÷ 1" }, { v: 1, label: "÷ 1/2" }, { v: 2, label: "÷ 1/4" }]}
          caption={<MathEl omml={M.bigger} size="lg" display="block" />}
          footnote="Nothing is being made bigger — you are just counting smaller pieces." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "g1", text: "3 ÷ 1/4 = 12", target: "yes" },
                  { id: "g2", text: "3 ÷ 1/4 = 3/4", target: "no" },
                  { id: "g3", text: "5 ÷ 1/3 = 15", target: "yes" },
                  { id: "g4", text: "5 ÷ 1/3 = 5/3", target: "no" }]}
          targets={[{ id: "yes", label: "bigger than the whole, as it must be" },
                    { id: "no", label: "not yet — that is a fraction of it" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Anees's way — count one whole", omml: M.perWhole, h: 92,
            quote: "Four quarters in one tray, and there are three trays." }}
          right={{ name: "Yousef's way — count them all", omml: M.answer, h: 92,
            quote: "I pointed at every piece: one, two, three ... twelve." }}
          same={["Both give 12", "Both cut into quarters", "Both count real pieces"]}
          diff={["Anees multiplies", "Yousef counts one by one", "Anees's works for twenty trays"]} />;

      case 6:
        return <BoardScreen draw={drawBoard179} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.general, alt: "n divided by one over b equals n times b" }]}
          hand={"how many pieces fit in one whole? · times the number of wholes"}
          cards={[{ title: "The division we counted", omml: M.answer, note: "twelve portions" },
                  { title: "Tap for the reason", omml: M.question, revealOmml: M.bigger, reveal: true,
                    note: "smaller pieces means more of them" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="How many thirds are there in 5 wholes?" omml={M.swyk}
          options={[{ v: "a", text: "5/3" }, { v: "b", text: "15" }, { v: "c", text: "8" }, { v: "d", text: "3" }]}
          right="b"
          support={{ yes: "Yes — three thirds in every whole, five wholes over.",
            notYet: "Not yet — the answer must be bigger than five, not smaller.",
            draw: drawSupport179, h: 96, hint: "5 × 3 = 15 thirds." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Cut something at home into equal pieces and count how many fit in two of them." />;

      default: return null;
    }
  }
};
