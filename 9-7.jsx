/* ===========================================================================
   Grade 4 · Topic 9 · LESSON 9-7 · Model Addition and Subtraction of Mixed Numbers
   Standard 4.NF.B.3c   I can ... add and subtract mixed numbers using bars that
   show wholes and parts.
   =========================================================================== */

const M = {
  a: om(mt("1"), mfrac(2, 4)),
  b: om(mt("1"), mfrac(1, 4)),
  answer: om(mt("1"), mfrac(2, 4), mt("+"), mt("1"), mfrac(1, 4), mt("=2"), mfrac(3, 4)),
  improper: om(mt("1"), mfrac(2, 4), mt("="), mfrac(6, 4)),
  regroupTxt: om(mnor("wholes with wholes · parts with parts")),
  other: om(mfrac(6, 4), mt("+"), mfrac(5, 4), mt("="), mfrac(11, 4)),
  rule: om(mnor("add the wholes, add the parts, then tidy up")),
  swyk: om(mt("2"), mfrac(1, 4), mt("+"), mt("1"), mfrac(1, 4)),
  swykAnswer: om(mt("3"), mfrac(2, 4))
};

/* the two mixed numbers, then the result, as wholes-and-parts bars */
const makeMixed97 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  D.mixedBar(ctx, { x: x, y: 44, w: w, wholes: 3, den: 4, num: 6, h: 30,
    prog: 1, col: "#2D70B3" });
  if (step >= 1) {
    D.mixedBar(ctx, { x: x, y: 118, w: w, wholes: 3, den: 4, num: 5, h: 30,
      prog: 1, col: "#FA7E19" });
  }
  if (step >= 2) {
    D.mixedBar(ctx, { x: x, y: 192, w: w, wholes: 3, den: 4, num: 11, h: 30,
      prog: 1, col: "#388C46" });
  }
  const caps = ["1 and 2 quarters", "1 and 1 quarter joining", "2 and 3 quarters altogether"];
  D.txt(ctx, caps[step], W / 2, 24, { size: 14, col: step === 2 ? "#34D399" : "#C9A227", font: "marker" });
};

/* whole numbers and fraction parts handled separately */
const makeParts97 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2;
  D.txt(ctx, "wholes", cx - 140, 46, { size: 12.5, col: "#C9A227", font: "mono", weight: 700 });
  D.txt(ctx, "parts", cx + 110, 46, { size: 12.5, col: "#C9A227", font: "mono", weight: 700 });
  D.marker(ctx, [[cx - 12, 34], [cx - 12, 200]], 1, "rgba(234,244,242,.25)", 1.4);

  D.txt(ctx, "1", cx - 140, 88, { size: 26, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "2/4", cx + 110, 88, { size: 22, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "+ 1", cx - 140, 130, { size: 26, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "+ 1/4", cx + 110, 130, { size: 22, col: "#EAF4F2", font: "marker" });
  D.marker(ctx, [[cx - 190, 150], [cx + 160, 150]], 1, "rgba(234,244,242,.6)", 1.8);

  if (step >= 1) {
    D.txt(ctx, "2", cx - 140, 184, { size: 26, col: "#34D399", font: "marker" });
    D.txt(ctx, "3/4", cx + 110, 184, { size: 22, col: "#34D399", font: "marker" });
  }
  if (step >= 2) {
    ctx.save();
    ctx.globalAlpha = 0.55 + Math.sin(frame / 13) * 0.3;
    D.rr(ctx, cx + 40, 164, 140, 40, 7);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "no regrouping needed here", W / 2, H - 38, { size: 14.5, col: "#C9A227", font: "marker" });
    D.txt(ctx, "2 and 3/4", W / 2, H - 14, { size: 16, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, step === 1 ? "two wholes and three quarters" : "keep the wholes and the parts apart",
      W / 2, H - 16, { size: 13.5, col: "#C9A227", font: "marker" });
  }
};

const drawStory97 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two lengths of ribbon", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.mixedBar(ctx, { x: 60, y: 54, w: W - 120, wholes: 3, den: 4, num: 6, h: 36,
    prog: p2, col: "#FA7E19" });
  D.mixedBar(ctx, { x: 60, y: 134, w: W - 120, wholes: 3, den: 4, num: 5, h: 36,
    prog: p2, col: "#6042A6" });
  if (p3 > 0) D.txt(ctx, "how much ribbon altogether?", W / 2, H - 14,
    { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
};

const drawBoard97 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Wholes with wholes, parts with parts" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 620), p4 = D.at(f, 620, 760);
  const x = 100, w = W - 200;
  D.mixedBar(ctx, { x: x, y: 106, w: w, wholes: 3, den: 4, num: 6, h: 40, prog: p1, col: "#2D70B3" });
  if (p2 > 0) D.mixedBar(ctx, { x: x, y: 194, w: w, wholes: 3, den: 4, num: 5, h: 40, prog: p2, col: "#FA7E19" });
  if (p3 > 0) D.mixedBar(ctx, { x: x, y: 282, w: w, wholes: 3, den: 4, num: 11, h: 40, prog: p3, col: "#388C46" });
  if (p4 > 0) {
    const yb = H - 34;
    D.marker(ctx, [[70, yb - 24], [W - 70, yb - 24]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "two whole bars and three quarter pieces — count them separately", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 750) });
    D.star8(ctx, W - 46, yb - 4, 15, D.at(f, 700, 790), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport97 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.mixedBar(ctx, { x: 24, y: 14, w: W - 48, wholes: 4, den: 4, num: 14, h: 30,
    prog: 1, col: "#388C46" });
};

const LESSON = {
  code: "9-7",
  storageKey: "daf-g4-t9-l7",
  title: "Model Addition and Subtraction of Mixed Numbers",
  unit: "GRADE 4 · TOPIC 9 · LESSON 9-7 · 4.NF.B.3c",
  math: M,
  ixl: ["CSJ"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two bars, each with full wholes and some extra pieces. No question yet.", goal: "An invitation — every student has something to say.",
      pull: "One kind of thing is whole. The other is not.",
      rail: { launch: "I am not asking for an answer. Just describe the bars.",
        monitor: ["Counting the full wholes", "Counting the leftover parts", "Reading the labels"],
        connect: "Who noticed something nobody else did?",
        misconception: "Reading a mixed number as two separate numbers." } },

    { phase: "launch", title: "One and a bit, <em>twice</em>", lead: "One and two quarters of ribbon, plus one and one quarter. Estimate the total.",
      goal: "Create the need — wholes and parts behave differently.",
      pull: "Estimate first, then keep them apart.",
      rail: { launch: "Roughly how much? Look at the whole bars first.",
        monitor: ["Adding all four numbers together", "Handling wholes and parts separately", "Guessing"],
        connect: "What are the two different kinds of thing here?",
        misconception: "Adding 1+2+1+1 to get 5." } },

    { phase: "monitor", title: "Join the <em>bars</em>", lead: "Line them up and see how much there is in total.",
      goal: "Mixed numbers add like two separate collections.", pull: "Now write it without the bars.",
      rail: { launch: "Predict the result bar before you tap.",
        monitor: ["Watching the wholes", "Watching the parts", "Losing a whole"],
        connect: "Where did the two wholes come from?", misconception: "Merging the wholes and the parts into one count." } },

    { phase: "monitor", title: "Wholes and <em>parts</em>, separately",
      lead: "Write the wholes in one column and the parts in the other.",
      goal: "Two columns keep the two kinds of thing apart.", pull: "Now sort some answers.",
      rail: { launch: "Predict each column before you step.",
        monitor: ["Keeping the columns apart", "Mixing them up", "Adding across the columns"],
        connect: "Why must the columns stay separate?", misconception: "Adding a whole to a numerator." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Catch the classic mixed-number errors.",
      pull: "Two students set the same problem out differently.",
      rail: { launch: "Check the wholes and the parts separately.",
        monitor: ["Checking both columns", "Estimating first", "Guessing"],
        connect: "What went wrong in the ones you rejected?",
        misconception: "Adding the whole numbers to the numerators." } },

    { phase: "connect", title: "Two ways to <em>set it out</em>", lead: "Aya kept them as mixed numbers. Sami turned both into quarters first. Both got two and three quarters.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Keeping mixed numbers", "Converting to improper", "Checking both agree"],
        connect: "Which way is safer when regrouping is needed?",
        misconception: "Believing only one setting-out is allowed." } },

    { phase: "synth", title: "On the <em>board</em>", lead: "One and two quarters. One and one quarter. Two wholes and three quarters.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the result", "Naming the regroup", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Writing 2 3/8 by adding the denominators." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the two columns", "Testing on a new pair", "Explaining the regroup"],
        connect: "What if the parts add up to more than one whole?", misconception: "Leaving an improper fraction in the answer without regrouping." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Wholes in one column, parts in the other.",
        monitor: ["Separating the columns", "Regrouping correctly", "Guessing"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Adding the denominators to get eighths." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: when the parts add up to more than a whole.",
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
        return <NoticeWonder draw={makeMixed97(2)} height={260} award={award}
          notices={["Each bar has a full whole", "There are extra quarters", "The pieces are the same size", "The bars are different lengths"]} wonders={["How much altogether?", "Do I add the wholes first?", "What if the parts make a whole?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory97} height={256} award={award}
          label="About how much ribbon altogether?" min={1} max={4} start={3} unit="m"
          after="Locked. Now let us keep the wholes and the parts apart."
          note="Two whole bars, and some quarters left over." />;

      case 2:
        return <ExploreChips draw={makeMixed97(step)} height={260}
          label="Join the two bars" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "first amount" }, { v: 1, label: "add the second" }, { v: 2, label: "the total" }]}
          caption={<MathEl omml={M.answer} size="xl" display="block" />}
          footnote="The whole bars stack up. The quarters stack up." />;

      case 3:
        return <ExploreChips draw={makeParts97(ps)} height={256}
          label="Two columns" value={ps}
          onPick={(v) => setPs(v)}
          chips={[{ v: 0, label: "set it out" }, { v: 1, label: "work each column" }, { v: 2, label: "tidy up" }]}
          caption={<MathEl omml={M.regroupTxt} size="lg" display="block" />}
          footnote="Nothing crosses between the columns unless the parts make a whole." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[{ id: "m1", text: "1 2/4 + 1 1/4 = 2 3/4", target: "yes" }, { id: "m2", text: "1 2/4 + 1 1/4 = 2 3/8", target: "no" }, { id: "m3", text: "2 1/5 + 1 3/5 = 3 4/5", target: "yes" }, { id: "m4", text: "2 1/5 + 1 3/5 = 3 4/10", target: "no" }]}
          targets={[
            { id: "yes", label: "correct" },
            { id: "no", label: "wrong" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Aya's way — keep them mixed", omml: M.answer, h: 92, quote: "Wholes with wholes, quarters with quarters." }}
          right={{ name: "Sami's way — all in quarters", omml: M.other, h: 92, quote: "Six quarters plus five quarters is eleven quarters." }}
          same={["Both get 2 3/4", "Both keep the quarter as the unit", "Both can be checked on the bars"]} diff={["Aya works in two columns", "Sami works in one", "Sami must convert back at the end"]} />;

      case 6:
        return <BoardScreen draw={drawBoard97} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "add the wholes, add the parts, then tidy up" }]}
          hand={"add the wholes · add the parts · if the parts make a whole, move it across"}
          cards={[
            { title: "The total we found", omml: M.answer, note: "two wholes and three quarters" },
            { title: "Tap for the improper way", omml: M.improper, revealOmml: M.other, reveal: true,
              note: "same answer, different route" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is two and one quarter plus one and one quarter?" omml={M.swyk} options={[{ v: "a", text: "3 2/8" }, { v: "b", text: "3 2/4" }, { v: "c", text: "4 2/4" }, { v: "d", text: "3 1/4" }]} right="b"
          support={{ yes: "Yes — 2 + 1 = 3 wholes, and 1/4 + 1/4 = 2/4.", notYet: "Not yet — deal with the wholes and the parts separately.",
            draw: drawSupport97, h: 84, hint: "Add the wholes. Then add the quarters. Keep them apart." }} />;

      case 9:
        return <Closing game={game} omml={M.rule} action="Measure two lengths at home in whole units and parts, then add them." />;

      default: return null;
    }
  }
};
