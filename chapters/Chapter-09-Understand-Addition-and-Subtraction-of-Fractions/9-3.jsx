/* ===========================================================================
   Grade 4 · Topic 9 · LESSON 9-3 · Add Fractions with Like Denominators
   Standard 4.NF.B.3   I can ... add fractions with the same denominator
   without drawing anything.
   =========================================================================== */

const M = {
  a: om(mfrac(4, 10)),
  b: om(mfrac(5, 10)),
  answer: om(mfrac(4, 10), mt("+"), mfrac(5, 10), mt("="), mfrac(9, 10)),
  unitCount: om(mnor("4 tenths and 5 tenths is 9 tenths")),
  denSame: om(mnor("the denominator never changes \u2014 the pieces are the same size")),
  other: om(mfrac(1, 6), mt("+"), mfrac(4, 6), mt("="), mfrac(5, 6)),
  rule: om(mnor("add the pieces · keep the piece size")),
  swyk: om(mfrac(2, 6), mt("+"), mfrac(3, 6)),
  swykAnswer: om(mfrac(5, 6))
};

/* the bar model: pieces joined or taken away */
const makeBar93 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 66, w = W - 132;
  const shown = step >= 1 ? 9 : 4;
  D.fracBar(ctx, { x: x, y: 74, w: w, h: 54, den: 8, num: shown, prog: 1,
    col: step >= 2 ? "#388C46" : "#2D70B3", label: false });
  /* mark the second fraction's pieces */
  if (step >= 1) {
    ctx.save();
    ctx.globalAlpha = 0.55 + Math.sin(frame / 14) * 0.3;
    const pw = w / 8;
    D.rr(ctx, x + 3 * pw, 70, 2 * pw, 62, 6);
    ctx.strokeStyle = "#388C46"; ctx.lineWidth = 2.2; ctx.setLineDash([5, 4]); ctx.stroke();
    ctx.restore();
    D.txt(ctx, "+ 2 eighths", x + (3 + 2 / 2) * pw, 52,
      { size: 13, col: "#388C46", font: "marker" });
  }
  const caps = ["3 eighths shaded", "2 more eighths joining", "5 eighths altogether"];
  D.txt(ctx, caps[step], W / 2, H - 40, { size: 15, col: step === 2 ? "#34D399" : "#C9A227", font: "marker" });
  D.txt(ctx, step === 2 ? "the denominator did not move" : "the pieces are all the same size",
    W / 2, H - 16, { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker" });
};

/* the same move on a number line */
const makeLine93 = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 68, w = W - 136, y = H / 2 + 6;
  const px = D.fracLine(ctx, { x: x, y: y, w: w, den: 8, whole: 1, prog: 1, labelAll: true,
    marks: on ? [{ n: 5, den: 8, col: "#34D399" }] : [{ n: 3, den: 8, col: "#2D70B3" }] });
  if (on) {
    const from = px(3, 8), to = px(5, 8);
    const pts = [];
    for (var s = 0; s <= 16; s++) {
      const t = s / 16;
      pts.push([from + (to - from) * t, y - Math.sin(Math.PI * t) * 30]);
    }
    D.marker(ctx, pts, 1, "#388C46", 2.4);
    D.txt(ctx, "+ 2/8", (from + to) / 2, y - 46, { size: 13.5, col: "#388C46", font: "marker" });
  }
  D.txt(ctx, on ? "landed on 5/8" : "start at 3/8", W / 2, 34,
    { size: 14.5, col: on ? "#34D399" : "#EAF4F2", font: "marker" });
};

const drawStory93 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the water bottle", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 66, y: 58, w: W - 132, h: 50, den: 8, num: 3, prog: p2, col: "#FA7E19" });
  if (p3 > 0) {
    D.txt(ctx, "the bottle was 4 tenths full, 5 tenths were added", W / 2, 150, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how full is the bottle now?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard93 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Joining pieces of the same size" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 430), p3 = D.at(f, 450, 620), p4 = D.at(f, 620, 760);
  const x = 108, w = W - 216, pw = w / 8;
  D.fracBar(ctx, { x: x, y: 116, w: w, h: 52, den: 8, num: 5, prog: p1,
    col: "#2D70B3", label: false });
  if (p2 > 0) {
    ctx.save();
    ctx.globalAlpha = p2;
    D.rr(ctx, x + 3 * pw, 112, 2 * pw, 60, 6);
    ctx.strokeStyle = "#388C46"; ctx.lineWidth = 2.4; ctx.setLineDash([6, 4]); ctx.stroke();
    ctx.restore();
    D.txt(ctx, "the 5 that joined", x + (3 + 2 / 2) * pw, 96,
      { size: 14, col: "#388C46", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.fracBar(ctx, { x: x, y: 216, w: w, h: 52, den: 8, num: 5, prog: p3, col: "#388C46", label: false });
    D.txt(ctx, "4/10 + 5/10 = 9/10", W / 2, 312, { size: 22, col: "#C9A227", font: "marker", alpha: D.at(f, 520, 610) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "you are counting eighths — so the answer is in eighths", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 750) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport93 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 18, w: W - 52, h: 34, den: 6, num: 5, prog: 1, col: "#2D70B3", label: false });
  D.txt(ctx, "five sixths — the pieces never changed size", W / 2, 74, { size: 12, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "9-3",
  storageKey: "daf-g4-t9-l3",
  title: "Add Fractions with Like Denominators",
  unit: "GRADE 4 · TOPIC 9 · LESSON 9-3 · 4.NF.B.3a",
  math: M,
  ixl: ["PDU"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A bar with some pieces shaded and a dashed box around two more. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "Two groups of the same size piece.",
      rail: { launch: "I am not asking for an answer. Just describe the bar.",
        monitor: ["Counting the shaded pieces", "Reading the denominator", "Noticing the dashed box"],
        connect: "Who noticed something nobody else did?",
        misconception: "Expecting the denominator to change." } },

    { phase: "launch", title: "Four tenths, then <em>five more</em>", lead: "The bottle was 4 tenths full. 5 more tenths were poured in. Estimate the total.",
      goal: "Create the need — same size pieces can simply be counted.",
      pull: "Estimate first, then move the pieces.",
      rail: { launch: "How much has gone? Do not calculate — look at the bar.",
        monitor: ["Counting pieces", "Adding the denominators too", "Asking about the denominator"],
        connect: "What happens to the size of the pieces?",
        misconception: "Answering 9/20 by adding both numbers." } },

    { phase: "monitor", title: "Add without <em>drawing</em>", lead: "Add the tops. Keep the bottom. Then check with the bar.",
      goal: "The written rule and the model must agree.", pull: "The same move looks different on a line.",
      rail: { launch: "Predict the answer before you step.",
        monitor: ["Counting the pieces", "Adding the denominators", "Watching the denominator"],
        connect: "Why does the bottom number stay 10?", misconception: "Changing the denominator to 20." } },

    { phase: "monitor", title: "The same move on a <em>line</em>", lead: "Start at three eighths and jump two eighths further.",
      goal: "A second representation for the same move.",
      pull: "Now sort some calculations.",
      rail: { launch: "Predict where the jump will land.",
        monitor: ["Jumping in unit fractions", "Landing correctly", "Losing count"],
        connect: "How is the jump the same as the shaded pieces?",
        misconception: "Counting tick marks instead of jumps." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each calculation. No grading until the class commits.",
      goal: "Catch the classic denominator error.",
      pull: "Two students explained the same answer differently.",
      rail: { launch: "Look at the denominators before anything else.",
        monitor: ["Checking the denominator", "Adding denominators", "Sketching to check"],
        connect: "What went wrong in the ones you rejected?",
        misconception: "Adding the denominators as well as the numerators." } },

    { phase: "connect", title: "Two ways to <em>say it</em>", lead: "Khalil counted tenths out loud. Rami just added the top numbers. Both got nine tenths.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Counting unit fractions", "Using the bar", "Using the line"],
        connect: "Which explanation would survive without a picture?",
        misconception: "Believing the picture is the only proof." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "Four tenths. Five more tenths. Nine tenths. The tenth never changed.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the result bar", "Naming the unit", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Writing 9/20 because both numbers were added." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the unit fraction", "Testing on a new pair", "Explaining the denominator"],
        connect: "What if the denominators were different?", misconception: "Assuming the rule works when the pieces are different sizes." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Watch the denominator.",
        monitor: ["Keeping the denominator", "Adding the denominators", "Sketching to check"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 9/24 by adding the denominators." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: taking fractions away with a model.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the bar", "Ready for the next step"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [on, setOn] = useState(false);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeBar93(2)} height={256} award={award}
          notices={["The bar is in tenths", "Some pieces are shaded", "A dashed box holds five more", "All the pieces match"]} wonders={["How many altogether?", "Does the bottom number change?", "Can I just add the tops?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory93} height={256} award={award}
          label="How much of the tray has gone?" min={1} max={8} start={5} unit="/ 8"
          after="Locked. Now let us move the pieces."
          note="Every piece is one tenth, so you are just counting tenths." />;

      case 2:
        return <ExploreChips draw={makeBar93(step)} height={256}
          label="Join the pieces" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "3 eighths" }, { v: 1, label: "bring in 2 more" }, { v: 2, label: "count them all" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Nothing was cut. Only pieces of the same size were joined." />;

      case 3:
        return <ExploreChips draw={makeLine93(on)} height={256}
          label="Jump along the line" value={on ? 1 : 0}
          onPick={(v) => setOn(v === 1)}
          chips={[{ v: 0, label: "start" }, { v: 1, label: "jump 2 eighths" }]}
          caption={<MathEl omml={M.unitCount} size="lg" display="block" />}
          footnote="Every jump is one unit fraction." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "a1", text: "4/10 + 5/10 = 9/10", target: "yes" }, { id: "a2", text: "3/8 + 2/8 = 5/16", target: "no" }, { id: "a3", text: "1/6 + 4/6 = 5/6", target: "yes" }, { id: "a4", text: "1/6 + 4/6 = 5/12", target: "no" }]}
          targets={[
            { id: "yes", label: "correct" },
            { id: "no", label: "wrong — look at the denominator" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Khalil's way — count the tenths", omml: M.unitCount, h: 92, quote: "One tenth, two, three ... nine tenths." }}
          right={{ name: "Rami's way — add the tops", omml: M.answer, h: 92, quote: "Four plus five is nine, and they are still tenths." }}
          same={["Both get 9/10", "Both keep the denominator", "Both treat a tenth as one thing"]} diff={["Khalil counts, Rami adds", "Rami is faster", "Khalil can see why the bottom stays"]} />;

      case 6:
        return <BoardScreen draw={drawBoard93} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "add the pieces · keep the piece size" }]}
          hand={"check the pieces are the same size · add the tops · keep the bottom"}
          cards={[
            { title: "The addition we modelled", omml: M.answer, note: "three eighths plus two eighths" },
            { title: "Tap for another one", omml: M.denSame, revealOmml: M.other, reveal: true,
              note: "the denominator stays put every time" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is five twelfths plus four twelfths?" omml={M.swyk} options={[{ v: "a", text: "9/24" }, { v: "b", text: "9/12" }, { v: "c", text: "20/12" }, { v: "d", text: "9/1" }]} right="b"
          support={{ yes: "Yes — 2 sixths and 3 sixths is 5 sixths.", notYet: "Not yet — the pieces do not change size.",
            draw: drawSupport93, h: 92, hint: "You are counting twelfths, so the answer is in twelfths." }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Add two fractions at home without drawing anything, then check with a sketch." />;

      default: return null;
    }
  }
};
