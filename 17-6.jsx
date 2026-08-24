/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-6 · Add Fractions with Unlike Denominators
   Standard 5.NF.A.1   I can ... add two fractions whose pieces start out
   different sizes.
   =========================================================================== */

const M = {
  problem: om(mfrac(1, 2), mt("+"), mfrac(1, 3)),
  renamed: om(mfrac(3, 6), mt("+"), mfrac(2, 6)),
  answer: om(mfrac(1, 2), mt("+"), mfrac(1, 3), mt("="), mfrac(5, 6)),
  why: om(mnor("you can only count pieces that are the same size")),
  wrongWay: om(mfrac(1, 2), mt("+"), mfrac(1, 3), mt("\u2260"), mfrac(2, 5)),
  overOne: om(mfrac(3, 4), mt("+"), mfrac(2, 3), mt("="), mfrac(17, 12), mt("=1"), mfrac(5, 12)),
  rule: om(mnor("rename to a common denominator \u00b7 add the tops \u00b7 keep the bottom")),
  swyk: om(mfrac(1, 4), mt("+"), mfrac(1, 6)),
  swykAnswer: om(mfrac(5, 12))
};

/* the bars: rename, then join */
const makeAdd176 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 68, w = W - 136;

  if (step < 2) {
    D.fracBar(ctx, { x: x, y: 58, w: w, h: 40, den: 2, num: 1, split: step >= 1 ? 3 : 1,
      prog: 1, col: "#2D70B3", label: false });
    D.txt(ctx, step >= 1 ? "1/2 = 3/6" : "1/2", x - 6, 46,
      { size: 13, col: "#2D70B3", font: "marker" });
    D.fracBar(ctx, { x: x, y: 134, w: w, h: 40, den: 3, num: 1, split: step >= 1 ? 2 : 1,
      prog: 1, col: "#FA7E19", label: false });
    D.txt(ctx, step >= 1 ? "1/3 = 2/6" : "1/3", x - 6, 122,
      { size: 13, col: "#FA7E19", font: "marker" });
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    D.txt(ctx, step === 0 ? "different sized pieces \u2014 nothing can be counted yet"
         : "both bars are now in sixths",
      W / 2, H - 14, { size: 13.5, col: step === 0 ? "#E0665F" : "#34D399", font: "marker",
        alpha: pulse + 0.4 });
  } else {
    D.fracBar(ctx, { x: x, y: 78, w: w, h: 54, den: 6, num: 5, prog: 1,
      col: "#388C46", label: false });
    D.txt(ctx, "3 sixths joined by 2 sixths", W / 2, 52,
      { size: 13, col: "rgba(234,244,242,.68)", font: "marker" });
    D.txt(ctx, "1/2 + 1/3 = 5/6", W / 2, H - 34,
      { size: 19, col: "#C9A227", font: "marker" });
    D.txt(ctx, "one sixth short of the whole tray", W / 2, H - 12,
      { size: 12.5, col: "#34D399", font: "marker" });
  }
};

/* the written chain */
const makeChain176 = (line) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [
    { s: "1/2 + 1/3", col: "#EAF4F2", note: "the pieces do not match" },
    { s: "= 3/6 + 2/6", col: "#2D70B3", note: "both renamed into sixths" },
    { s: "= 5/6", col: "#34D399", note: "now the tops can simply be added" }
  ];
  for (let r = 0; r <= line && r < rows.length; r++) {
    const fresh = r === line;
    D.txt(ctx, rows[r].s, W / 2, 52 + r * 48,
      { size: 24, col: rows[r].col, font: "marker",
        alpha: fresh ? 0.72 + Math.sin(frame / 14) * 0.24 : 1 });
    if (fresh) {
      D.txt(ctx, rows[r].note, W / 2, 76 + r * 48,
        { size: 11.5, col: "rgba(234,244,242,.6)", font: "marker" });
    }
  }
  D.fracBar(ctx, { x: 62, y: H - 82, w: W - 124, h: 34, den: 6,
    num: line >= 2 ? 5 : line === 1 ? 3 : 3, prog: 1,
    col: line >= 2 ? "#388C46" : "#2D70B3", label: false });
  D.txt(ctx, line >= 2 ? "5 sixths" : line === 1 ? "3 sixths, so far" : "half a bar",
    W / 2, H - 12, { size: 12.5, col: "#C9A227", font: "marker" });
};

const drawWarm176 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 68, y: 68, w: W - 136, h: 42, den: 2, num: 1,
    prog: D.at(f, 20, 230), col: "#6042A6", label: false });
  D.txt(ctx, "+", W / 2, 130, { size: 26, col: "#C9A227", font: "marker",
    alpha: D.at(f, 220, 300) });
  D.fracBar(ctx, { x: 68, y: 148, w: W - 136, h: 42, den: 3, num: 1,
    prog: D.at(f, 250, 460), col: "#6042A6", label: false });
  D.txt(ctx, "a half and a third, waiting to be added", W / 2, 30,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
};

const drawStory176 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "painting the art room mural", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 66, y: 62, w: W - 132, h: 40, den: 2, num: 1,
    prog: D.at(f, 50, 260), col: "#FA7E19", label: false });
  D.txt(ctx, "Layla painted 1/2", W / 2, 118,
    { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker", alpha: D.at(f, 180, 280) });
  D.fracBar(ctx, { x: 66, y: 138, w: W - 132, h: 40, den: 3, num: 1,
    prog: D.at(f, 220, 420), col: "#2D70B3", label: false });
  if (p3 > 0) {
    D.txt(ctx, "Omar painted 1/3. how much of the mural is done?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard176 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Rename first, then add" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 280, 520), p3 = D.at(f, 560, 780), p4 = D.at(f, 800, 950);
  const x = 150, w = W - 300;

  D.fracBar(ctx, { x: x, y: 100, w: w, h: 42, den: 2, num: 1, prog: p1, col: "#2D70B3", label: false });
  D.txt(ctx, "1/2", x - 40, 121, { size: 15, col: "#2D70B3", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: x, y: 168, w: w, h: 42, den: 3, num: 1, prog: p1, col: "#FA7E19", label: false });
  D.txt(ctx, "1/3", x - 40, 189, { size: 15, col: "#FA7E19", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.fracBar(ctx, { x: x, y: 236, w: w, h: 42, den: 2, num: 1, split: 3, prog: p2,
      col: "#2D70B3", label: false });
    D.txt(ctx, "3/6", x - 40, 257, { size: 15, col: "#388C46", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.fracBar(ctx, { x: x, y: 304, w: w, h: 42, den: 6, num: 5, prog: p3,
      col: "#388C46", label: false });
    D.txt(ctx, "5/6", x - 40, 325, { size: 15, col: "#34D399", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "1/2 + 1/3 = 3/6 + 2/6 = 5/6", W / 2, H - 24,
      { size: 19, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 890, 955), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport176 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 22, w: W - 52, h: 40, den: 12, num: 5, prog: 1,
    col: "#2D70B3", label: false });
  D.txt(ctx, "3 twelfths and 2 twelfths make 5 twelfths", W / 2, H - 10,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "17-6",
  storageKey: "daf-g4-t17-l6",
  title: "Add Fractions with Unlike Denominators",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-6 · 5.NF.A.1",
  math: M,
  ixl: ["6PM", "7BJ"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A half and a third appear with a plus sign between them. No question yet.",
      goal: "Set up the mismatch that the whole lesson resolves.",
      pull: "These two cannot be counted together yet.",
      rail: { launch: "Describe the two bars. Do not add anything yet.",
        monitor: ["Naming both fractions", "Noticing the pieces differ", "Trying to add the numbers"],
        connect: "What stops us adding these straight away?",
        misconception: "Adding tops and bottoms to get 2/5." } },

    { phase: "launch", title: "Painting the <em>mural</em>",
      lead: "Layla painted half the mural and Omar painted a third of it. Estimate how much is done.",
      goal: "Create the need for renaming before adding.",
      pull: "Now let us make the pieces match.",
      rail: { launch: "More or less than the whole mural? Commit first.",
        monitor: ["Estimating just over three quarters", "Answering 2/5", "Reasoning from the bars"],
        connect: "Can the answer be smaller than a half?",
        misconception: "Answering 2/5, which is less than the half Layla painted." } },

    { phase: "monitor", title: "Rename, then <em>join</em>",
      lead: "Cut both bars into sixths, then count the shaded pieces.",
      goal: "Renaming is the whole difficulty; adding is then trivial.",
      pull: "Now write it down.",
      rail: { launch: "How many pieces will each bar have after the cut?",
        monitor: ["Cutting into sixths", "Renaming both", "Counting the total"],
        connect: "How many sixths did each person paint?",
        misconception: "Renaming one fraction and leaving the other." } },

    { phase: "monitor", title: "The written <em>chain</em>",
      lead: "One line at a time, with the bar underneath keeping it honest.",
      goal: "Every written step is checked against the model.",
      pull: "Now judge some finished work.",
      rail: { launch: "Predict the next line before you press.",
        monitor: ["Renaming both fractions", "Adding the tops", "Adding the bottoms too"],
        connect: "Which line do people skip?",
        misconception: "Jumping straight to adding without renaming." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each calculation. No grading until the class commits.",
      goal: "Catch the add-the-denominators error while it is cheap.",
      pull: "Two students added the same pair differently.",
      rail: { launch: "For each one, check whether the pieces were made to match.",
        monitor: ["Checking the rename", "Checking the denominator", "Estimating to test"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Writing 1/2 + 1/3 = 2/5." } },

    { phase: "connect", title: "Two common <em>denominators</em>",
      lead: "Reem used sixths. Faisal multiplied and used sixths too, by a different route.",
      goal: "Different routes, same renaming.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask whether the answers agree.",
        monitor: ["Finding the smallest", "Multiplying the denominators", "Comparing"],
        connect: "Why do both give 5/6?",
        misconception: "Believing a different route gives a different answer." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Halves and thirds become sixths. Three and two make five. Five sixths.",
      goal: "The moment unlike-denominator addition is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Cut both bars with them before adding anything.",
        monitor: ["Predicting the rename", "Adding the sixths", "Checking against the estimate"],
        connect: "Who can say the two steps in order?",
        misconception: "Adding before renaming." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Three steps, and any pair of fractions can be added.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Renaming", "Adding the tops", "Keeping the bottom"],
        connect: "What happens when the answer passes one whole?",
        misconception: "Adding the denominators as well." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on unlike-denominator addition.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Rename to twelfths first.",
        monitor: ["Renaming to twelfths", "Adding the tops", "Adding the bottoms"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 2/10 by adding tops and bottoms." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: the same move, but taking away.",
      rail: { launch: "Three students state the two steps.",
        monitor: ["Renames then adds", "Still adds denominators", "Ready to subtract"],
        connect: "Who is adding two fractions at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [line, setLine] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm176} height={256} award={award}
          notices={["One bar is cut into two", "The other into three", "Both bars are the same length", "There is a plus sign"]}
          wonders={["Can I add them?", "Do the pieces have to match?", "Will the answer pass one whole?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory176} height={256} award={award}
          label="How much of the mural is painted?" min={1} max={6} start={3} unit="/ 6"
          after="Locked. Now let us make the pieces the same size."
          note="A half plus a third must be more than a half and less than one." />;

      case 2:
        return <ExploreChips draw={makeAdd176(step)} height={256}
          label="Rename, then join" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "as they are" }, { v: 1, label: "cut into sixths" },
                  { v: 2, label: "join them" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Renaming changes the name of each amount, never the amount itself." />;

      case 3:
        return <ExploreChips draw={makeChain176(line)} height={256}
          label="Write the next line" value={line}
          onPick={(v) => setLine(v)}
          chips={[{ v: 0, label: "the problem" }, { v: 1, label: "rename both" }, { v: 2, label: "add" }]}
          caption={<MathEl omml={M.renamed} size="lg" display="block" />}
          footnote="The bar underneath never disagrees with the writing." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "d1", text: "1/2 + 1/3 = 5/6", target: "yes" },
                  { id: "d2", text: "1/2 + 1/3 = 2/5", target: "no" },
                  { id: "d3", text: "1/4 + 1/6 = 5/12", target: "yes" },
                  { id: "d4", text: "1/4 + 1/6 = 2/10", target: "no" }]}
          targets={[{ id: "yes", label: "correct — renamed first" },
                    { id: "no", label: "not yet — the pieces never matched" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Reem's way — smallest common denominator", omml: M.renamed, h: 92,
            quote: "Six is the smallest number two and three both divide into." }}
          right={{ name: "Faisal's way — multiply the denominators", omml: M.why, h: 92,
            quote: "Two times three is six, so I used sixths as well." }}
          same={["Both give 5/6", "Both rename both fractions", "Both keep the values"]}
          diff={["Reem searches for the smallest", "Faisal multiplies", "Faisal may need to simplify later"]} />;

      case 6:
        return <BoardScreen draw={drawBoard176} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "rename to a common denominator, add the tops, keep the bottom" }]}
          hand={"common denominator · rename both · add the tops · keep the bottom"}
          cards={[{ title: "The sum we modelled", omml: M.answer, note: "five sixths" },
                  { title: "Tap for one past a whole", omml: M.wrongWay, revealOmml: M.overOne, reveal: true,
                    note: "seventeen twelfths is one and five twelfths" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is one quarter plus one sixth?" omml={M.swyk}
          options={[{ v: "a", text: "2/10" }, { v: "b", text: "5/12" }, { v: "c", text: "2/12" }, { v: "d", text: "1/10" }]}
          right="b"
          support={{ yes: "Yes — 3 twelfths and 2 twelfths make 5 twelfths.",
            notYet: "Not yet — rename both to twelfths before adding anything.",
            draw: drawSupport176, h: 100, hint: "1/4 = 3/12 and 1/6 = 2/12." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Add two fractions at home with different denominators, and check with a sketch." />;

      default: return null;
    }
  }
};
