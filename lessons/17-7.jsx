/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-7 · Subtract Fractions with Unlike
   Denominators
   Standard 5.NF.A.1   I can ... subtract two fractions whose pieces start out
   different sizes, and check by adding back.
   =========================================================================== */

const M = {
  problem: om(mfrac(3, 4), mt("\u2212"), mfrac(1, 3)),
  renamed: om(mfrac(9, 12), mt("\u2212"), mfrac(4, 12)),
  answer: om(mfrac(3, 4), mt("\u2212"), mfrac(1, 3), mt("="), mfrac(5, 12)),
  why: om(mnor("only pieces of the same size can be taken away")),
  checkBack: om(mfrac(5, 12), mt("+"), mfrac(4, 12), mt("="), mfrac(9, 12)),
  compareUse: om(mnor("the same renaming also tells you which is bigger")),
  rule: om(mnor("rename to a common denominator \u00b7 subtract the tops \u00b7 check by adding back")),
  swyk: om(mfrac(1, 2), mt("\u2212"), mfrac(1, 5)),
  swykAnswer: om(mfrac(3, 10))
};

/* the bar: rename, then take away */
const makeSub177 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 68, w = W - 136;

  if (step === 0) {
    D.fracBar(ctx, { x: x, y: 58, w: w, h: 44, den: 4, num: 3, prog: 1,
      col: "#2D70B3", label: false });
    D.txt(ctx, "3/4 on the plate", x - 6, 46, { size: 13, col: "#2D70B3", font: "marker" });
    D.fracBar(ctx, { x: x, y: 140, w: w, h: 44, den: 3, num: 1, prog: 1,
      col: "#C74440", label: false });
    D.txt(ctx, "1/3 is taken", x - 6, 128, { size: 13, col: "#C74440", font: "marker" });
    const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
    D.txt(ctx, "quarters and thirds \u2014 you cannot take one from the other yet",
      W / 2, H - 14, { size: 13.5, col: "#E0665F", font: "marker", alpha: pulse + 0.4 });
  } else if (step === 1) {
    D.fracBar(ctx, { x: x, y: 58, w: w, h: 44, den: 4, num: 3, split: 3, prog: 1,
      col: "#2D70B3", label: false });
    D.txt(ctx, "3/4 = 9/12", x - 6, 46, { size: 13, col: "#388C46", font: "marker" });
    D.fracBar(ctx, { x: x, y: 140, w: w, h: 44, den: 3, num: 1, split: 4, prog: 1,
      col: "#C74440", label: false });
    D.txt(ctx, "1/3 = 4/12", x - 6, 128, { size: 13, col: "#388C46", font: "marker" });
    D.txt(ctx, "both bars are now in twelfths", W / 2, H - 14,
      { size: 13.5, col: "#34D399", font: "marker" });
  } else {
    D.fracBar(ctx, { x: x, y: 80, w: w, h: 54, den: 12, num: 9, prog: 1,
      col: "#2D70B3", label: false });
    /* the four twelfths being removed */
    const pw = w / 12;
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    ctx.save();
    ctx.globalAlpha = pulse + 0.4;
    D.rr(ctx, x + 5 * pw, 76, 4 * pw, 62, 6);
    ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2.4; ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, "take 4 twelfths", x + 7 * pw, 58, { size: 12.5, col: "#C74440", font: "marker" });
    D.txt(ctx, "9 \u2212 4 = 5 twelfths left", W / 2, H - 34,
      { size: 17, col: "#34D399", font: "marker" });
    D.txt(ctx, "3/4 \u2212 1/3 = 5/12", W / 2, H - 12,
      { size: 14, col: "#C9A227", font: "marker" });
  }
};

/* the check: add the answer back */
const makeCheck177 = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 68, w = W - 136;

  D.fracBar(ctx, { x: x, y: 64, w: w, h: 44, den: 12, num: 5, prog: 1,
    col: "#388C46", label: false });
  D.txt(ctx, "the answer: 5/12", x - 6, 52, { size: 13, col: "#388C46", font: "marker" });

  ctx.save();
  ctx.globalAlpha = on ? 1 : 0.25;
  D.fracBar(ctx, { x: x, y: 142, w: w, h: 44, den: 12, num: 9, prog: 1,
    col: on ? "#2D70B3" : "#2D70B3", label: false });
  ctx.restore();
  D.txt(ctx, on ? "5/12 + 4/12 = 9/12 = 3/4" : "add the 4/12 back", x - 6, 130,
    { size: 13, col: on ? "#2D70B3" : "rgba(234,244,242,.5)", font: "marker" });

  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, on ? "back where we started \u2014 the subtraction was right"
       : "tap to put the taken pieces back",
    W / 2, H - 14, { size: 13.5, col: on ? "#34D399" : "rgba(234,244,242,.62)",
      font: "marker", alpha: on ? pulse + 0.4 : 1 });
};

const drawWarm177 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 68, y: 68, w: W - 136, h: 44, den: 4, num: 3,
    prog: D.at(f, 20, 230), col: "#6042A6", label: false });
  D.txt(ctx, "\u2212", W / 2, 130, { size: 28, col: "#C9A227", font: "marker",
    alpha: D.at(f, 220, 300) });
  D.fracBar(ctx, { x: 68, y: 148, w: W - 136, h: 44, den: 3, num: 1,
    prog: D.at(f, 250, 460), col: "#6042A6", label: false });
  D.txt(ctx, "three quarters, and a third to take away", W / 2, 30,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
};

const drawStory177 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the kunafa tray after break", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 66, y: 62, w: W - 132, h: 42, den: 4, num: 3,
    prog: D.at(f, 50, 260), col: "#FA7E19", label: false });
  D.txt(ctx, "3/4 of the tray was left", W / 2, 120,
    { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker", alpha: D.at(f, 180, 280) });
  D.fracBar(ctx, { x: 66, y: 140, w: W - 132, h: 42, den: 3, num: 1,
    prog: D.at(f, 220, 420), col: "#C74440", label: false });
  if (p3 > 0) {
    D.txt(ctx, "Grade 5 took 1/3 of a tray. how much is left now?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard177 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Rename first, then take away" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 280, 520), p3 = D.at(f, 560, 780), p4 = D.at(f, 800, 950);
  const x = 150, w = W - 300;

  D.fracBar(ctx, { x: x, y: 100, w: w, h: 42, den: 4, num: 3, prog: p1, col: "#2D70B3", label: false });
  D.txt(ctx, "3/4", x - 40, 121, { size: 15, col: "#2D70B3", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: x, y: 168, w: w, h: 42, den: 3, num: 1, prog: p1, col: "#C74440", label: false });
  D.txt(ctx, "1/3", x - 40, 189, { size: 15, col: "#C74440", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.fracBar(ctx, { x: x, y: 236, w: w, h: 42, den: 4, num: 3, split: 3, prog: p2,
      col: "#2D70B3", label: false });
    D.txt(ctx, "9/12", x - 42, 257, { size: 15, col: "#388C46", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.fracBar(ctx, { x: x, y: 304, w: w, h: 42, den: 12, num: 5, prog: p3,
      col: "#388C46", label: false });
    D.txt(ctx, "5/12", x - 42, 325, { size: 15, col: "#34D399", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "9 twelfths take 4 twelfths leaves 5 twelfths", W / 2, H - 24,
      { size: 18, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 890, 955), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport177 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 22, w: W - 52, h: 40, den: 10, num: 3, prog: 1,
    col: "#2D70B3", label: false });
  D.txt(ctx, "5 tenths take 2 tenths leaves 3 tenths", W / 2, H - 10,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "17-7",
  storageKey: "daf-g4-t17-l7",
  title: "Subtract Fractions with Unlike Denominators",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-7 · 5.NF.A.1",
  math: M,
  ixl: ["D7F", "KKS"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Three quarters, a minus sign, and a third. No question yet.",
      goal: "Set up the same mismatch as yesterday, now for subtraction.",
      pull: "The pieces still do not match.",
      rail: { launch: "Describe the two bars. Do not subtract anything yet.",
        monitor: ["Naming both fractions", "Noticing the pieces differ", "Recalling yesterday"],
        connect: "What did we do yesterday when the pieces did not match?",
        misconception: "Subtracting tops and bottoms to get 2/1." } },

    { phase: "launch", title: "The kunafa tray after <em>break</em>",
      lead: "Three quarters of a tray were left, then Grade 5 took a third of a tray. Estimate what is left.",
      goal: "Create the need for renaming before subtracting.",
      pull: "Now let us make the pieces match.",
      rail: { launch: "More or less than half a tray? Commit first.",
        monitor: ["Estimating just under a half", "Answering 2/1", "Reasoning from the bars"],
        connect: "Must the answer be smaller than three quarters?",
        misconception: "Expecting the answer to be bigger than what we started with." } },

    { phase: "monitor", title: "Rename, then <em>take away</em>",
      lead: "Cut both bars into twelfths, then remove four of them.",
      goal: "Renaming is the whole difficulty; subtracting is then counting.",
      pull: "But how do you know the answer is right?",
      rail: { launch: "How many twelfths is three quarters?",
        monitor: ["Renaming to twelfths", "Counting what is removed", "Counting what is left"],
        connect: "How many twelfths did Grade 5 take?",
        misconception: "Renaming only the first fraction." } },

    { phase: "monitor", title: "Check by adding it <em>back</em>",
      lead: "Put the taken pieces back and you should land where you started.",
      goal: "Subtraction is checked by addition, always.",
      pull: "Now judge some finished work.",
      rail: { launch: "What should we get if the answer is right?",
        monitor: ["Adding the answer back", "Landing on 9/12", "Skipping the check"],
        connect: "Why is this a proper check and not just a repeat?",
        misconception: "Re-doing the subtraction as a 'check'." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each calculation. No grading until the class commits.",
      goal: "Catch the subtract-the-denominators error.",
      pull: "Two students subtracted the same pair differently.",
      rail: { launch: "For each one, check the pieces were made to match.",
        monitor: ["Checking the rename", "Checking the denominator", "Adding back to test"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Writing 3/4 − 1/3 = 2/1." } },

    { phase: "connect", title: "Subtracting and <em>comparing</em>",
      lead: "Joud subtracted to find the difference. Ziad used the same renaming to say which was bigger.",
      goal: "One renaming answers two questions.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask what they have in common.",
        monitor: ["Renaming to twelfths", "Subtracting", "Comparing"],
        connect: "What did both students have to do first?",
        misconception: "Believing comparing and subtracting need different setups." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Nine twelfths take four twelfths leaves five twelfths.",
      goal: "The moment unlike-denominator subtraction is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Cut both bars with them before removing anything.",
        monitor: ["Predicting the rename", "Counting what is left", "Checking by adding back"],
        connect: "Who can say the three steps?",
        misconception: "Subtracting before renaming." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Three steps, and the last one is the check.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Renaming", "Subtracting the tops", "Adding back to check"],
        connect: "What does the check actually prove?",
        misconception: "Skipping the check because the answer 'looks fine'." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on unlike-denominator subtraction.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Rename to tenths first.",
        monitor: ["Renaming to tenths", "Subtracting the tops", "Subtracting the bottoms"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 0/3 by subtracting tops and bottoms." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: multiplying a whole number by a fraction.",
      rail: { launch: "Three students state the three steps.",
        monitor: ["Renames, subtracts, checks", "Skips the check", "Ready to multiply"],
        connect: "Who is subtracting two fractions at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [on, setOn] = useState(false);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm177} height={256} award={award}
          notices={["The top bar is in quarters", "The bottom is in thirds", "Three quarters are shaded", "There is a minus sign"]}
          wonders={["Can I take one from the other?", "Do the pieces have to match again?", "Will there be any left?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory177} height={256} award={award}
          label="How much tray is left?" min={1} max={12} start={5} unit="/ 12"
          after="Locked. Now let us make the pieces the same size."
          note="Three quarters take away a third must leave less than a half." />;

      case 2:
        return <ExploreChips draw={makeSub177(step)} height={256}
          label="Rename, then take away" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "as they are" }, { v: 1, label: "cut into twelfths" },
                  { v: 2, label: "take it away" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Twelve is the smallest number four and three both divide into." />;

      case 3:
        return <ExploreChips draw={makeCheck177(on)} height={256}
          label="Check by adding it back" value={on ? 1 : 0}
          onPick={(v) => setOn(v === 1)}
          chips={[{ v: 0, label: "the answer" }, { v: 1, label: "add the pieces back" }]}
          caption={<MathEl omml={M.checkBack} size="lg" display="block" />}
          footnote="If adding the answer back does not land where you started, something is wrong." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "e1", text: "3/4 − 1/3 = 5/12", target: "yes" },
                  { id: "e2", text: "3/4 − 1/3 = 2/1", target: "no" },
                  { id: "e3", text: "1/2 − 1/5 = 3/10", target: "yes" },
                  { id: "e4", text: "1/2 − 1/5 = 0/3", target: "no" }]}
          targets={[{ id: "yes", label: "correct — renamed first" },
                    { id: "no", label: "not yet — the pieces never matched" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Joud's way — find the difference", omml: M.renamed, h: 92,
            quote: "Nine twelfths take four twelfths leaves five twelfths." }}
          right={{ name: "Ziad's way — compare them", omml: M.compareUse, h: 92,
            quote: "Nine twelfths beats four twelfths, so three quarters is the bigger one." }}
          same={["Both rename to twelfths", "Both use the same two bars", "Both need matching pieces"]}
          diff={["Joud subtracts", "Ziad compares", "One renaming answered both questions"]} />;

      case 6:
        return <BoardScreen draw={drawBoard177} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "rename to a common denominator, subtract the tops, check by adding back" }]}
          hand={"common denominator · rename both · subtract the tops · add the answer back to check"}
          cards={[{ title: "The difference we found", omml: M.answer, note: "five twelfths" },
                  { title: "Tap for the check", omml: M.why, revealOmml: M.checkBack, reveal: true,
                    note: "back to nine twelfths, exactly" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is one half minus one fifth?" omml={M.swyk}
          options={[{ v: "a", text: "0/3" }, { v: "b", text: "3/10" }, { v: "c", text: "1/3" }, { v: "d", text: "2/7" }]}
          right="b"
          support={{ yes: "Yes — 5 tenths take 2 tenths leaves 3 tenths.",
            notYet: "Not yet — rename both to tenths before you subtract.",
            draw: drawSupport177, h: 100, hint: "1/2 = 5/10 and 1/5 = 2/10." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Subtract two fractions at home with different denominators, then add your answer back to check." />;

      default: return null;
    }
  }
};
