/* ===========================================================================
   Grade 4 · Topic 9 · LESSON 9-8 · Add Mixed Numbers
   Standard 4.NF.B.3c   I can ... add mixed numbers when the fraction parts make
   more than one whole.
   =========================================================================== */

const M = {
  a: om(mt("2"), mfrac(3, 5)),
  b: om(mt("1"), mfrac(4, 5)),
  answer: om(mt("2"), mfrac(3, 5), mt("+"), mt("1"), mfrac(4, 5), mt("=4"), mfrac(2, 5)),
  improper: om(mt("2"), mfrac(3, 5), mt("="), mfrac(13, 5)),
  regroupTxt: om(mnor("seven fifths is one whole and two fifths")),
  other: om(mfrac(13, 5), mt("+"), mfrac(9, 5), mt("="), mfrac(22, 5)),
  rule: om(mnor("if the parts make a whole, carry it across")),
  swyk: om(mt("1"), mfrac(5, 8), mt("+"), mt("2"), mfrac(6, 8)),
  swykAnswer: om(mt("4"), mfrac(3, 8))
};

/* the two mixed numbers, then the result, as wholes-and-parts bars */
const makeMixed98 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  D.mixedBar(ctx, { x: x, y: 44, w: w, wholes: 5, den: 5, num: 13, h: 30,
    prog: 1, col: "#2D70B3" });
  if (step >= 1) {
    D.mixedBar(ctx, { x: x, y: 118, w: w, wholes: 5, den: 5, num: 9, h: 30,
      prog: 1, col: "#FA7E19" });
  }
  if (step >= 2) {
    D.mixedBar(ctx, { x: x, y: 192, w: w, wholes: 5, den: 5, num: 22, h: 30,
      prog: 1, col: "#388C46" });
  }
  const caps = ["2 and 3 fifths", "1 and 4 fifths joining", "4 and 2 fifths altogether"];
  D.txt(ctx, caps[step], W / 2, 24, { size: 14, col: step === 2 ? "#34D399" : "#C9A227", font: "marker" });
};

/* whole numbers and fraction parts handled separately */
const makeParts98 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2;
  D.txt(ctx, "wholes", cx - 140, 46, { size: 12.5, col: "#C9A227", font: "mono", weight: 700 });
  D.txt(ctx, "parts", cx + 110, 46, { size: 12.5, col: "#C9A227", font: "mono", weight: 700 });
  D.marker(ctx, [[cx - 12, 34], [cx - 12, 200]], 1, "rgba(234,244,242,.25)", 1.4);

  D.txt(ctx, "2", cx - 140, 88, { size: 26, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "3/5", cx + 110, 88, { size: 22, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "+ 1", cx - 140, 130, { size: 26, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "+ 4/5", cx + 110, 130, { size: 22, col: "#EAF4F2", font: "marker" });
  D.marker(ctx, [[cx - 190, 150], [cx + 160, 150]], 1, "rgba(234,244,242,.6)", 1.8);

  if (step >= 1) {
    D.txt(ctx, "3", cx - 140, 184, { size: 26, col: "#34D399", font: "marker" });
    D.txt(ctx, "7/5", cx + 110, 184, { size: 22, col: "#34D399", font: "marker" });
  }
  if (step >= 2) {
    ctx.save();
    ctx.globalAlpha = 0.55 + Math.sin(frame / 13) * 0.3;
    D.rr(ctx, cx + 40, 164, 140, 40, 7);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "7 fifths = 1 whole and 2 fifths", W / 2, H - 38, { size: 14.5, col: "#C9A227", font: "marker" });
    D.txt(ctx, "4 and 2/5", W / 2, H - 14, { size: 16, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, step === 1 ? "3 wholes and 7 fifths — not tidy yet" : "keep the wholes and the parts apart",
      W / 2, H - 16, { size: 13.5, col: "#C9A227", font: "marker" });
  }
};

const drawStory98 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two jugs of juice", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.mixedBar(ctx, { x: 60, y: 54, w: W - 120, wholes: 5, den: 5, num: 13, h: 36,
    prog: p2, col: "#FA7E19" });
  D.mixedBar(ctx, { x: 60, y: 134, w: W - 120, wholes: 5, den: 5, num: 9, h: 36,
    prog: p2, col: "#6042A6" });
  if (p3 > 0) D.txt(ctx, "how much juice altogether?", W / 2, H - 14,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard98 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "When the parts overflow" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 620), p4 = D.at(f, 620, 760);
  const x = 100, w = W - 200;
  D.mixedBar(ctx, { x: x, y: 106, w: w, wholes: 5, den: 5, num: 13, h: 40, prog: p1, col: "#2D70B3" });
  if (p2 > 0) D.mixedBar(ctx, { x: x, y: 194, w: w, wholes: 5, den: 5, num: 9, h: 40, prog: p2, col: "#FA7E19" });
  if (p3 > 0) D.mixedBar(ctx, { x: x, y: 282, w: w, wholes: 5, den: 5, num: 22, h: 40, prog: p3, col: "#388C46" });
  if (p4 > 0) {
    const yb = H - 34;
    D.marker(ctx, [[70, yb - 24], [W - 70, yb - 24]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "seven fifths does not fit in one whole — one whole moves across", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 750) });
    D.star8(ctx, W - 46, yb - 4, 15, D.at(f, 700, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport98 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.mixedBar(ctx, { x: 24, y: 14, w: W - 48, wholes: 5, den: 8, num: 35, h: 30,
    prog: 1, col: "#388C46" });
};

const LESSON = {
  code: "9-8",
  storageKey: "daf-g4-t9-l8",
  title: "Add Mixed Numbers",
  unit: "GRADE 4 · TOPIC 9 · LESSON 9-8 · 4.NF.B.3c",
  math: M,
  ixl: ["AXT"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two bars with wholes and parts. The parts look like a lot. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "Those parts might not stay parts.",
      rail: { launch: "I am not asking for an answer. Just describe the bars.",
        monitor: ["Counting the full wholes", "Counting the leftover parts", "Reading the labels"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading a mixed number as two separate numbers." } },

    { phase: "launch", title: "When the parts <em>overflow</em>", lead: "Two and three fifths, plus one and four fifths. Estimate the total.",
      goal: "Create the need — wholes and parts behave differently.",
      pull: "Estimate first, then keep them apart.",
      rail: { launch: "Add the whole bars first. Now look at the parts — what do you notice?",
        monitor: ["Answering 3 and 7 fifths", "Handling wholes and parts separately", "Guessing"],
        connect: "What are the two different kinds of thing here?",
        misconception: "Leaving 7/5 in the answer without regrouping." } },

    { phase: "monitor", title: "Join the <em>bars</em>", lead: "Watch what happens when the parts pass a whole.",
      goal: "A full whole must be moved into the wholes column.", pull: "Now write it without the bars.",
      rail: { launch: "Predict the result bar before you tap.",
        monitor: ["Watching the wholes", "Watching the parts", "Losing a whole"],
        connect: "Why can the answer not be 3 and 7 fifths?", misconception: "Leaving an improper fraction part in the answer." } },

    { phase: "monitor", title: "Wholes and <em>parts</em>, separately",
      lead: "Add the wholes, add the parts, then look at the parts again.",
      goal: "Regrouping is the tidy-up step.", pull: "Now sort some answers.",
      rail: { launch: "Predict each column before you step.",
        monitor: ["Keeping the columns apart", "Mixing them up", "Forgetting to regroup"],
        connect: "How many fifths make one whole?", misconception: "Writing 3 7/5 as the final answer." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Catch the classic mixed-number errors.",
      pull: "Two students set the same problem out differently.",
      rail: { launch: "Check the wholes and the parts separately.",
        monitor: ["Checking both columns", "Estimating first", "Guessing"],
        connect: "What went wrong in the ones you rejected?",
        misconception: "Leaving the fraction part greater than one." } },

    { phase: "connect", title: "Two ways to <em>set it out</em>", lead: "Dana added and then regrouped. Faris turned everything into fifths first. Both got four and two fifths.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Keeping mixed numbers", "Converting to improper", "Checking both agree"],
        connect: "Which way is safer when regrouping is needed?",
        misconception: "Believing only one setting-out is allowed." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "Three wholes, seven fifths. Seven fifths is one whole and two fifths. Four and two fifths.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the result", "Naming the regroup", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Stopping at 3 and 7 fifths." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the two columns", "Testing on a new pair", "Explaining the regroup"],
        connect: "How do you know when regrouping is needed?", misconception: "Regrouping when the parts are still under a whole." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Wholes in one column, parts in the other.",
        monitor: ["Separating the columns", "Regrouping correctly", "Guessing"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 3 11/8 without regrouping." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: subtracting when there are not enough parts.",
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
        return <NoticeWonder draw={makeMixed98(2)} height={260} award={award}
          notices={["Both have whole bars", "The parts are nearly full", "The pieces are fifths", "Together they pass a whole"]} wonders={["Will the parts make a whole?", "What happens then?", "How many wholes in the end?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory98} height={256} award={award}
          label="About how much juice altogether?" min={1} max={6} start={4} unit="L"
          after="Locked. Now let us keep the wholes and the parts apart."
          note="Three fifths and four fifths is more than one whole." />;

      case 2:
        return <ExploreChips draw={makeMixed98(step)} height={260}
          label="Join the two bars" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "first amount" }, { v: 1, label: "add the second" }, { v: 2, label: "tidy the result" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="Seven fifths does not fit in one whole." />;

      case 3:
        return <ExploreChips draw={makeParts98(ps)} height={256}
          label="Two columns" value={ps}
          onPick={(v) => setPs(v)}
          chips={[{ v: 0, label: "set it out" }, { v: 1, label: "work each column" }, { v: 2, label: "regroup" }]}
          caption={<MathEl omml={M.regroupTxt} size="lg" display="block" />}
          footnote="Five fifths make one whole, so it moves to the other column." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "r1", text: "2 3/5 + 1 4/5 = 4 2/5", target: "yes" }, { id: "r2", text: "2 3/5 + 1 4/5 = 3 7/5", target: "no" }, { id: "r3", text: "1 5/8 + 2 6/8 = 4 3/8", target: "yes" }, { id: "r4", text: "1 5/8 + 2 6/8 = 3 11/8", target: "no" }]}
          targets={[
            { id: "yes", label: "correct" },
            { id: "no", label: "wrong" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Dana's way — add then regroup", omml: M.answer, h: 92, quote: "Three and seven fifths, then I tidied it." }}
          right={{ name: "Faris's way — all in fifths", omml: M.other, h: 92, quote: "Thirteen fifths plus nine fifths is twenty-two fifths." }}
          same={["Both get 4 2/5", "Both keep the fifth as the unit", "Both need a tidy-up at the end"]} diff={["Dana regroups at the end", "Faris converts twice", "Dana's wholes are visible all the way"]} />;

      case 6:
        return <BoardScreen draw={drawBoard98} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "if the parts make a whole, carry it across" }]}
          hand={"add the wholes · add the parts · if the parts make a whole or more, carry it across"}
          cards={[
            { title: "The total we found", omml: M.answer, note: "regrouped from 3 and 7 fifths" },
            { title: "Tap for the improper way", omml: M.improper, revealOmml: M.other, reveal: true,
              note: "same answer, different route" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is one and five eighths plus two and six eighths?" omml={M.swyk} options={[{ v: "a", text: "3 11/8" }, { v: "b", text: "4 3/8" }, { v: "c", text: "3 3/8" }, { v: "d", text: "4 11/8" }]} right="b"
          support={{ yes: "Yes — 3 wholes and 11 eighths, and 11 eighths is 1 whole and 3 eighths.", notYet: "Not yet — deal with the wholes and the parts separately.",
            draw: drawSupport98, h: 84, hint: "Eight eighths make one whole. How many are left over?" }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Add two mixed measurements at home and check whether the parts make a whole." />;

      default: return null;
    }
  }
};
