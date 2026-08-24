/* ===========================================================================
   Grade 4 · Topic 9 · LESSON 9-9 · Subtract Mixed Numbers
   Standard 4.NF.B.3c   I can ... subtract mixed numbers, breaking a whole into
   parts when there are not enough to take away.
   =========================================================================== */

const M = {
  a: om(mt("3"), mfrac(1, 4)),
  b: om(mt("1"), mfrac(3, 4)),
  answer: om(mt("3"), mfrac(1, 4), mt("-"), mt("1"), mfrac(3, 4), mt("=1"), mfrac(2, 4)),
  improper: om(mt("3"), mfrac(1, 4), mt("="), mfrac(13, 4)),
  regroupTxt: om(mnor("break one whole into four quarters")),
  other: om(mfrac(13, 4), mt("-"), mfrac(7, 4), mt("="), mfrac(6, 4)),
  rule: om(mnor("if there are not enough parts, break a whole into parts")),
  swyk: om(mt("4"), mfrac(2, 6), mt("-"), mt("1"), mfrac(5, 6)),
  swykAnswer: om(mt("2"), mfrac(3, 6))
};

/* the two mixed numbers, then the result, as wholes-and-parts bars */
const makeMixed99 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  D.mixedBar(ctx, { x: x, y: 44, w: w, wholes: 4, den: 4, num: 13, h: 30,
    prog: 1, col: "#2D70B3" });
  if (step >= 1) {
    D.mixedBar(ctx, { x: x, y: 118, w: w, wholes: 4, den: 4, num: 7, h: 30,
      prog: 1, col: "#C74440" });
  }
  if (step >= 2) {
    D.mixedBar(ctx, { x: x, y: 192, w: w, wholes: 4, den: 4, num: 6, h: 30,
      prog: 1, col: "#388C46" });
  }
  const caps = ["3 and 1 quarter", "1 and 3 quarters to remove", "1 and 2 quarters left"];
  D.txt(ctx, caps[step], W / 2, 24, { size: 14, col: step === 2 ? "#34D399" : "#C9A227", font: "marker" });
};

/* whole numbers and fraction parts handled separately */
const makeParts99 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2;
  D.txt(ctx, "wholes", cx - 140, 46, { size: 12.5, col: "#C9A227", font: "mono", weight: 700 });
  D.txt(ctx, "parts", cx + 110, 46, { size: 12.5, col: "#C9A227", font: "mono", weight: 700 });
  D.marker(ctx, [[cx - 12, 34], [cx - 12, 200]], 1, "rgba(234,244,242,.25)", 1.4);

  D.txt(ctx, "3", cx - 140, 88, { size: 26, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "1/4", cx + 110, 88, { size: 22, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "- 1", cx - 140, 130, { size: 26, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "- 3/4", cx + 110, 130, { size: 22, col: "#EAF4F2", font: "marker" });
  D.marker(ctx, [[cx - 190, 150], [cx + 160, 150]], 1, "rgba(234,244,242,.6)", 1.8);

  if (step >= 1) {
    D.txt(ctx, "2", cx - 140, 184, { size: 26, col: "#34D399", font: "marker" });
    D.txt(ctx, "5/4", cx + 110, 184, { size: 22, col: "#34D399", font: "marker" });
  }
  if (step >= 2) {
    ctx.save();
    ctx.globalAlpha = 0.55 + Math.sin(frame / 13) * 0.3;
    D.rr(ctx, cx + 40, 164, 140, 40, 7);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "3 1/4 becomes 2 and 5/4", W / 2, H - 38, { size: 14.5, col: "#C9A227", font: "marker" });
    D.txt(ctx, "1 and 2/4", W / 2, H - 14, { size: 16, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, step === 1 ? "not enough quarters — break a whole" : "keep the wholes and the parts apart",
      W / 2, H - 16, { size: 13.5, col: "#C9A227", font: "marker" });
  }
};

const drawStory99 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "a roll of cloth", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.mixedBar(ctx, { x: 60, y: 54, w: W - 120, wholes: 4, den: 4, num: 13, h: 36,
    prog: p2, col: "#FA7E19" });
  D.mixedBar(ctx, { x: 60, y: 134, w: W - 120, wholes: 4, den: 4, num: 7, h: 36,
    prog: p2, col: "#6042A6" });
  if (p3 > 0) D.txt(ctx, "how much cloth is left?", W / 2, H - 14,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard99 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Not enough parts to take away" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 620), p4 = D.at(f, 620, 760);
  const x = 100, w = W - 200;
  D.mixedBar(ctx, { x: x, y: 106, w: w, wholes: 4, den: 4, num: 13, h: 40, prog: p1, col: "#2D70B3" });
  if (p2 > 0) D.mixedBar(ctx, { x: x, y: 194, w: w, wholes: 4, den: 4, num: 7, h: 40, prog: p2, col: "#C74440" });
  if (p3 > 0) D.mixedBar(ctx, { x: x, y: 282, w: w, wholes: 4, den: 4, num: 6, h: 40, prog: p3, col: "#388C46" });
  if (p4 > 0) {
    const yb = H - 34;
    D.marker(ctx, [[70, yb - 24], [W - 70, yb - 24]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "one whole becomes four quarters — the amount never changed", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 750) });
    D.star8(ctx, W - 46, yb - 4, 15, D.at(f, 700, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport99 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.mixedBar(ctx, { x: 24, y: 14, w: W - 48, wholes: 4, den: 6, num: 15, h: 30,
    prog: 1, col: "#388C46" });
};

const LESSON = {
  code: "9-9",
  storageKey: "daf-g4-t9-l9",
  title: "Subtract Mixed Numbers",
  unit: "GRADE 4 · TOPIC 9 · LESSON 9-9 · 4.NF.B.3c",
  math: M,
  ixl: ["SLQ", "QRB", "S9V"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A long bar and a shorter one to be taken from it. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "The parts of the smaller one are bigger than the parts of the larger.",
      rail: { launch: "I am not asking for an answer. Just describe the bars.",
        monitor: ["Counting the full wholes", "Counting the leftover parts", "Reading the labels"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading a mixed number as two separate numbers." } },

    { phase: "launch", title: "Not enough <em>quarters</em>", lead: "Three and one quarter metres of cloth. One and three quarters are cut off. Estimate what is left.",
      goal: "Create the need — wholes and parts behave differently.",
      pull: "Estimate first, then keep them apart.",
      rail: { launch: "Try to take the quarters away first. What stops you?",
        monitor: ["Taking the smaller part from the larger", "Handling wholes and parts separately", "Guessing"],
        connect: "What are the two different kinds of thing here?",
        misconception: "Doing 3/4 minus 1/4 because it is easier." } },

    { phase: "monitor", title: "Take the <em>bar</em> away", lead: "Watch a whole break open to make enough quarters.",
      goal: "Regrouping in subtraction is the same trade as in whole numbers.", pull: "Now write it without the bars.",
      rail: { launch: "Predict the result bar before you tap.",
        monitor: ["Watching the wholes", "Watching the parts", "Losing a whole"],
        connect: "Where did the extra quarters come from?", misconception: "Flipping the fraction subtraction to avoid regrouping." } },

    { phase: "monitor", title: "Wholes and <em>parts</em>, separately",
      lead: "Break one whole into quarters, then subtract each column.",
      goal: "A whole becomes parts so the parts column can pay.", pull: "Now sort some answers.",
      rail: { launch: "Predict each column before you step.",
        monitor: ["Keeping the columns apart", "Mixing them up", "Subtracting the wrong way round"],
        connect: "How many quarters does one whole give you?", misconception: "Taking 1/4 from 3/4 instead of regrouping." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Catch the classic mixed-number errors.",
      pull: "Two students set the same problem out differently.",
      rail: { launch: "Check the wholes and the parts separately.",
        monitor: ["Checking both columns", "Estimating first", "Guessing"],
        connect: "What went wrong in the ones you rejected?",
        misconception: "Subtracting the smaller fraction from the larger regardless of position." } },

    { phase: "connect", title: "Two ways to <em>set it out</em>", lead: "Hala broke a whole into quarters. Ziad turned both into quarters first. Both got one and two quarters.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Keeping mixed numbers", "Converting to improper", "Checking both agree"],
        connect: "Which way is safer when regrouping is needed?",
        misconception: "Believing only one setting-out is allowed." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "Three and one quarter becomes two and five quarters. Now the subtraction works.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the result", "Naming the regroup", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Reversing the fraction subtraction to avoid the trade." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the two columns", "Testing on a new pair", "Explaining the regroup"],
        connect: "How is this the same as regrouping in column subtraction?", misconception: "Believing fractions need a different kind of borrowing." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Wholes in one column, parts in the other.",
        monitor: ["Separating the columns", "Regrouping correctly", "Guessing"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Taking 2/6 from 5/6 to avoid regrouping." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: fraction problems in words.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the bars", "Ready for word problems"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [ps, setPs] = useState(0);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeMixed99(2)} height={260} award={award}
          notices={["The top bar has three wholes", "It has only one quarter spare", "The bottom bar has three quarters", "You cannot take 3 from 1"]} wonders={["How can I take away more parts than I have?", "Do I break a whole?", "What is left?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory99} height={256} award={award}
          label="About how much cloth is left?" min={1} max={4} start={2} unit="m"
          after="Locked. Now let us keep the wholes and the parts apart."
          note="There is only one quarter spare, and three must go." />;

      case 2:
        return <ExploreChips draw={makeMixed99(step)} height={260}
          label="Take the second bar away" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the starting amount" }, { v: 1, label: "mark what goes" }, { v: 2, label: "what is left" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="One whole is four quarters. Nothing was added or lost." />;

      case 3:
        return <ExploreChips draw={makeParts99(ps)} height={256}
          label="Two columns" value={ps}
          onPick={(v) => setPs(v)}
          chips={[{ v: 0, label: "set it out" }, { v: 1, label: "work each column" }, { v: 2, label: "break a whole" }]}
          caption={<MathEl omml={M.regroupTxt} size="lg" display="block" />}
          footnote="Two and five quarters is exactly the same as three and one quarter." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "u1", text: "3 1/4 − 1 3/4 = 1 2/4", target: "yes" }, { id: "u2", text: "3 1/4 − 1 3/4 = 2 2/4", target: "no" }, { id: "u3", text: "4 2/6 − 1 5/6 = 2 3/6", target: "yes" }, { id: "u4", text: "4 2/6 − 1 5/6 = 3 3/6", target: "no" }]}
          targets={[
            { id: "yes", label: "correct" },
            { id: "no", label: "wrong" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Hala's way — break a whole", omml: M.answer, h: 92, quote: "I turned one whole into four quarters first." }}
          right={{ name: "Ziad's way — all in quarters", omml: M.other, h: 92, quote: "Thirteen quarters take seven quarters is six quarters." }}
          same={["Both get 1 2/4", "Both keep the quarter as the unit", "Both need the same trade"]} diff={["Hala trades one whole", "Ziad converts everything", "Hala's wholes stay visible"]} />;

      case 6:
        return <BoardScreen draw={drawBoard99} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "if there are not enough parts, break a whole into parts" }]}
          hand={"not enough parts? · break one whole into parts · then subtract each column"}
          cards={[
            { title: "The difference we found", omml: M.answer, note: "after breaking one whole open" },
            { title: "Tap for the improper way", omml: M.improper, revealOmml: M.other, reveal: true,
              note: "same answer, different route" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is four and two sixths minus one and five sixths?" omml={M.swyk} options={[{ v: "a", text: "3 3/6" }, { v: "b", text: "2 3/6" }, { v: "c", text: "3 much" }, { v: "d", text: "2 5/6" }]} right="b"
          support={{ yes: "Yes — 4 2/6 becomes 3 and 8/6, then 8/6 minus 5/6 is 3/6.", notYet: "Not yet — deal with the wholes and the parts separately.",
            draw: drawSupport99, h: 84, hint: "There are not enough sixths. Break one whole into six sixths." }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Cut a length at home and describe what is left using wholes and parts." />;

      default: return null;
    }
  }
};
