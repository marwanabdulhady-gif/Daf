/* ===========================================================================
   Grade 4 · Topic 17 · LESSON 17-5 · Find Common Denominators
   Standard 5.NF.A.1   I can ... rewrite two fractions so their pieces are the
   same size, ready to be added or compared.
   =========================================================================== */

const M = {
  pair: om(mfrac(1, 2), mnor(" and "), mfrac(1, 3)),
  cut: om(mnor("cut the halves into three and the thirds into two")),
  common: om(mfrac(1, 2), mt("="), mfrac(3, 6), mnor(" and "), mfrac(1, 3), mt("="), mfrac(2, 6)),
  why: om(mnor("only pieces of the same size can be counted together")),
  product: om(mnor("multiplying the denominators always gives a common one")),
  smaller: om(mnor("sometimes a smaller common denominator exists")),
  rule: om(mnor("find a denominator both can reach \u00b7 rename both \u00b7 keep the value")),
  swyk: om(mfrac(1, 4), mnor(" and "), mfrac(1, 6)),
  swykAnswer: om(mnor("twelfths"))
};

/* the two bars, cut until the pieces match */
const makeCut175 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 68, w = W - 136;
  const dens = step === 0 ? [2, 3] : [6, 6];
  const nums = step === 0 ? [1, 1] : [3, 2];
  const splits = step === 1 ? [3, 2] : [1, 1];

  D.fracBar(ctx, { x: x, y: 56, w: w, h: 42, den: step === 0 ? 2 : 2, num: 1,
    split: step >= 1 ? 3 : 1, prog: 1, col: "#2D70B3", label: false });
  D.txt(ctx, step === 0 ? "1/2" : "1/2 = 3/6", x - 6, 44,
    { size: 13.5, col: "#2D70B3", font: "marker" });

  D.fracBar(ctx, { x: x, y: 134, w: w, h: 42, den: 3, num: 1,
    split: step >= 1 ? 2 : 1, prog: 1, col: "#FA7E19", label: false });
  D.txt(ctx, step === 0 ? "1/3" : "1/3 = 2/6", x - 6, 122,
    { size: 13.5, col: "#FA7E19", font: "marker" });

  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  if (step === 0) {
    D.txt(ctx, "the pieces are different sizes \u2014 they cannot be counted together",
      W / 2, H - 14, { size: 13.5, col: "#E0665F", font: "marker", alpha: pulse + 0.4 });
  } else if (step === 1) {
    D.txt(ctx, "cut each half into three and each third into two", W / 2, H - 34,
      { size: 13.5, col: "#C9A227", font: "marker" });
    D.txt(ctx, "both bars now have six equal pieces", W / 2, H - 12,
      { size: 13, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
  } else {
    D.txt(ctx, "3/6 and 2/6 \u2014 same size pieces at last", W / 2, H - 34,
      { size: 15, col: "#34D399", font: "marker" });
    D.txt(ctx, "nothing was added or taken away, only re-cut", W / 2, H - 12,
      { size: 12.5, col: "#C9A227", font: "marker" });
  }
};

/* choosing a common denominator */
const makeChoose175 = (den) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 68, w = W - 136;
  const works = den % 4 === 0 && den % 6 === 0;

  D.fracBar(ctx, { x: x, y: 60, w: w, h: 38, den: 4, num: 1,
    split: works ? den / 4 : 1, prog: 1, col: "#2D70B3", label: false });
  D.txt(ctx, "1/4", x - 6, 48, { size: 13, col: "#2D70B3", font: "marker" });
  D.fracBar(ctx, { x: x, y: 132, w: w, h: 38, den: 6, num: 1,
    split: works ? den / 6 : 1, prog: 1, col: "#FA7E19", label: false });
  D.txt(ctx, "1/6", x - 6, 120, { size: 13, col: "#FA7E19", font: "marker" });

  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, "try " + den + " as the common denominator", W / 2, 26,
    { size: 13.5, col: "rgba(234,244,242,.68)", font: "marker" });
  D.txt(ctx, works ? "both bars reach " + den + " \u2014 it works"
       : den + " is not reachable from both 4 and 6",
    W / 2, H - 34, { size: 15, col: works ? "#34D399" : "#E0665F", font: "marker",
      alpha: pulse + 0.4 });
  D.txt(ctx, den === 12 ? "twelve is the smallest that works"
       : den === 24 ? "24 works too, but the pieces are needlessly tiny"
       : "pick a number both denominators divide into",
    W / 2, H - 12, { size: 12.5, col: "#C9A227", font: "marker" });
};

const drawWarm175 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 68, y: 68, w: W - 136, h: 44, den: 2, num: 1,
    prog: D.at(f, 20, 240), col: "#6042A6", label: false });
  D.fracBar(ctx, { x: 68, y: 146, w: W - 136, h: 44, den: 3, num: 1,
    prog: D.at(f, 240, 460), col: "#6042A6", label: false });
  D.txt(ctx, "two bars, cut into different numbers of pieces", W / 2, 30,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 470, 560) });
};

const drawStory175 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two trays of kunafa, cut differently", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: 66, y: 62, w: W - 132, h: 40, den: 2, num: 1,
    prog: D.at(f, 50, 260), col: "#FA7E19", label: false });
  D.fracBar(ctx, { x: 66, y: 136, w: W - 132, h: 40, den: 3, num: 1,
    prog: D.at(f, 200, 400), col: "#2D70B3", label: false });
  if (p3 > 0) {
    D.txt(ctx, "how much kunafa is there altogether?", W / 2, H - 12,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard175 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Make the pieces the same size" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 280, 520), p3 = D.at(f, 560, 760), p4 = D.at(f, 780, 940);
  const x = 150, w = W - 300;

  D.fracBar(ctx, { x: x, y: 108, w: w, h: 44, den: 2, num: 1, prog: p1,
    col: "#2D70B3", label: false });
  D.txt(ctx, "1/2", x - 40, 130, { size: 16, col: "#2D70B3", font: "marker", alpha: p1 });
  D.fracBar(ctx, { x: x, y: 186, w: w, h: 44, den: 3, num: 1, prog: p1,
    col: "#FA7E19", label: false });
  D.txt(ctx, "1/3", x - 40, 208, { size: 16, col: "#FA7E19", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.fracBar(ctx, { x: x, y: 264, w: w, h: 44, den: 2, num: 1, split: 3, prog: p2,
      col: "#388C46", label: false });
    D.txt(ctx, "3/6", x - 40, 286, { size: 16, col: "#388C46", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "1/2 = 3/6      1/3 = 2/6", W / 2, 344,
      { size: 22, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "renaming changes the name, never the amount",
      W / 2, H - 24, { size: 15, col: "rgba(234,244,242,.78)", font: "marker", alpha: p4 });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 870, 950), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport175 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracBar(ctx, { x: 26, y: 12, w: W - 52, h: 26, den: 4, num: 1, split: 3, prog: 1,
    col: "#2D70B3", label: false });
  D.fracBar(ctx, { x: 26, y: 56, w: W - 52, h: 26, den: 6, num: 1, split: 2, prog: 1,
    col: "#FA7E19", label: false });
  D.txt(ctx, "quarters into three, sixths into two \u2014 both reach twelfths",
    W / 2, H - 6, { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "17-5",
  storageKey: "daf-g4-t17-l5",
  title: "Find Common Denominators",
  unit: "GRADE 4 · TOPIC 17 · LESSON 17-5 · 5.NF.A.1",
  math: M,
  ixl: ["72R"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two bars of the same length, cut into different numbers of pieces. No question yet.",
      goal: "Notice that the pieces do not match before anyone tries to add them.",
      pull: "The bars are equal. The pieces are not.",
      rail: { launch: "Describe the two bars. Do not add anything yet.",
        monitor: ["Noticing the bars are the same length", "Counting the pieces", "Noticing the pieces differ"],
        connect: "Could you count the pieces of both bars together?",
        misconception: "Believing the bar with more pieces is longer." } },

    { phase: "launch", title: "Two trays of <em>kunafa</em>",
      lead: "Half of one tray is left and a third of another. Estimate how much kunafa there is altogether.",
      goal: "Create the need for a common denominator.",
      pull: "Now let us make the pieces match.",
      rail: { launch: "More or less than one whole tray? Commit first.",
        monitor: ["Estimating just over three quarters", "Adding to 2/5", "Reasoning from the bars"],
        connect: "Why can't we add the halves and thirds directly?",
        misconception: "Answering 2/5 by adding tops and bottoms." } },

    { phase: "monitor", title: "Cut until they <em>match</em>",
      lead: "Cut each half into three and each third into two. Now every piece is a sixth.",
      goal: "The common denominator is produced by re-cutting, not by a rule.",
      pull: "But which denominator should you pick?",
      rail: { launch: "How many pieces will each bar have after the cut?",
        monitor: ["Cutting into six", "Renaming the fractions", "Changing the shaded amount"],
        connect: "Did the shaded amount change when we cut?",
        misconception: "Believing re-cutting makes the fraction bigger." } },

    { phase: "monitor", title: "Which <em>denominator</em>?",
      lead: "Try several. Only the ones both bars can reach will do.",
      goal: "A common denominator is a number both denominators divide into.",
      pull: "Now judge some renamings.",
      rail: { launch: "Predict whether each one will work.",
        monitor: ["Testing divisibility", "Choosing the product", "Choosing the smallest"],
        connect: "Why does multiplying the denominators always work?",
        misconception: "Adding the denominators to find a common one." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each renaming. No grading until the class commits.",
      goal: "Practise renaming without changing value.",
      pull: "Two students chose different common denominators.",
      rail: { launch: "For each one, check the value did not change.",
        monitor: ["Checking the multiplier", "Checking both parts were multiplied", "Sketching a bar"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Multiplying only the denominator." } },

    { phase: "connect", title: "Two common <em>denominators</em>",
      lead: "Bashir used twelve. Ibrahim used twenty four. Both work.",
      goal: "The smallest is tidiest but any common denominator is valid.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one they would rather write.",
        monitor: ["Using the smallest", "Using the product", "Comparing the two"],
        connect: "Which one gives simpler numbers?",
        misconception: "Believing only the smallest is allowed." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Halves become sixths. Thirds become sixths. Now they can be counted together.",
      goal: "The moment the common denominator idea is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Cut both bars with them.",
        monitor: ["Predicting the pieces", "Renaming both", "Checking the amount held"],
        connect: "Who can say why renaming is safe?",
        misconception: "Renaming one fraction and forgetting the other." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Three steps, and any pair of fractions can be brought together.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Finding a common denominator", "Renaming both", "Checking the value"],
        connect: "What is a denominator that always works?",
        misconception: "Renaming without multiplying the numerator too." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on choosing a denominator.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. What can both 4 and 6 reach?",
        monitor: ["Choosing twelfths", "Choosing tenths", "Choosing twenty fourths"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering tenths by adding 4 and 6." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: actually adding fractions with unlike denominators.",
      rail: { launch: "Three students name a common denominator.",
        monitor: ["Finds one reliably", "Still adds denominators", "Ready to add"],
        connect: "Who is finding a common denominator at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [den, setDen] = useState(12);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm175} height={256} award={award}
          notices={["Both bars are the same length", "One is cut into two", "The other into three", "The pieces are different sizes"]}
          wonders={["Could I add them?", "Can I make the pieces match?", "How many pieces would that take?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory175} height={256} award={award}
          label="How much kunafa altogether?" min={1} max={12} start={5} unit="/ 6 tray"
          after="Locked. Now let us make the pieces the same size."
          note="A half is more than a third, and together they are less than one whole." />;

      case 2:
        return <ExploreChips draw={makeCut175(step)} height={256}
          label="Cut until the pieces match" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "as they are" }, { v: 1, label: "cut both bars" },
                  { v: 2, label: "read the new names" }]}
          caption={<MathEl omml={M.common} size="lg" display="block" />}
          footnote="Nothing was added or removed — the bars were only re-cut." />;

      case 3:
        return <ExploreChips draw={makeChoose175(den)} height={256}
          label="Which denominator works?" value={den}
          onPick={(v) => setDen(v)}
          chips={[{ v: 10, label: "10" }, { v: 12, label: "12" }, { v: 24, label: "24" }]}
          caption={<MathEl omml={M.product} size="lg" display="block" />}
          footnote="Any number both denominators divide into will do — the smallest is tidiest." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "1/2 = 3/6", target: "yes" },
                  { id: "c2", text: "1/2 = 1/6", target: "no" },
                  { id: "c3", text: "1/3 = 2/6", target: "yes" },
                  { id: "c4", text: "1/3 = 3/6", target: "no" }]}
          targets={[{ id: "yes", label: "same value, new name" },
                    { id: "no", label: "not yet — the amount changed" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Bashir's way — the smallest", omml: M.common, h: 92,
            quote: "Twelve is the smallest number both four and six divide into." }}
          right={{ name: "Ibrahim's way — multiply them", omml: M.product, h: 92,
            quote: "Four times six is twenty four, and that always works." }}
          same={["Both give a common denominator", "Both keep the values", "Both allow adding"]}
          diff={["Bashir's numbers stay small", "Ibrahim never has to think", "Ibrahim may need to simplify"]} />;

      case 6:
        return <BoardScreen draw={drawBoard175} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "find a denominator both can reach, rename both, keep the value" }]}
          hand={"what can both denominators reach? · rename both · check nothing changed"}
          cards={[{ title: "The pair we renamed", omml: M.common, note: "halves and thirds became sixths" },
                  { title: "Tap for the safe shortcut", omml: M.smaller, revealOmml: M.product, reveal: true,
                    note: "multiplying the denominators never fails" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="What is a common denominator for one quarter and one sixth?" omml={M.swyk}
          options={[{ v: "a", text: "tenths" }, { v: "b", text: "twelfths" }, { v: "c", text: "sixths" }, { v: "d", text: "quarters" }]}
          right="b"
          support={{ yes: "Yes — quarters cut into three and sixths cut into two both give twelfths.",
            notYet: "Not yet — the denominator must be reachable from both 4 and 6.",
            draw: drawSupport175, h: 100, hint: "Twelve divides by both four and six." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Pick two fractions at home with different denominators and rename both to match." />;

      default: return null;
    }
  }
};
