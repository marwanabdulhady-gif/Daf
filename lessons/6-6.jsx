/* ===========================================================================
   Grade 4 · Topic 6 · LESSON 6-6 · Problem Solving: Make Sense and Persevere
   Standard MP.1   I can ... make sense of a problem with no obvious
   method, plan it, and keep going when the first idea stalls.
   =========================================================================== */

const M = {
  step1: om(mt("8×6=48")),
  step2: om(mt("48×3=144")),
  chain: om(mt("8×6=48"), mnor(", then "), mt("48×3=144")),
  hidden: om(mnor("one sitting was never worked out")),
  wrong: om(mt("200÷8=25")),
  rule: om(mnor("plan the order first — one sitting, then the rest")),
  swyk: om(mt("9×8=72")),
  swykAnswer: om(mt("72×2=144"))
};

/* the diagram growing one step at a time */
const makeChain66 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 60, w = W - 120;
  D.strip(ctx, { x: x, y: 58, w: w * 0.34, h: 42, prog: step >= 1 ? 1 : 0.001,
    total: step >= 1 ? 48 : "?", parts: [{ v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }] });
  if (step >= 1) D.txt(ctx, "step 1: 8×6=48", W / 2, 124, { size: 14.5, col: "#34D399", font: "marker" });
  if (step >= 2) {
    D.strip(ctx, { x: x, y: 162, w: w, h: 42, prog: 1, total: 144, parts: [{ v: 48, label: "48", col: "#388C46" }, { v: 48, label: "48", col: "#388C46" }, { v: 48, label: "48", col: "#388C46" }] });
    D.txt(ctx, "step 2: 48×3=144", W / 2, 234, { size: 14.5, col: "#34D399", font: "marker" });
  }
  D.txt(ctx, step === 2 ? "144 guests can be seated" : "the question is not answered yet",
    W / 2, H - 16, { size: 13.5, col: step === 2 ? "#C9A227" : "rgba(234,244,242,.6)", font: "marker" });
};

/* spot the missing middle step */
const makeHidden66 = (found) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const lines = [{ t: "There are 8 tables of 6 seats.", gap: false }, { t: "There are 3 sittings.", gap: false }, { t: "So 200 \u00f7 8 = 25 guests per table.", gap: true }];
  let y = 62;
  lines.forEach(function (l, k) {
    const flagged = found && l.gap;
    ctx.save();
    D.rr(ctx, 44, y - 18, W - 88, 38, 7);
    ctx.fillStyle = flagged ? "rgba(199,68,66,.18)" : "rgba(234,244,242,.04)";
    ctx.fill();
    if (flagged) { ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    D.txt(ctx, l.t, W / 2, y + 2, { size: 13.5, col: "#EAF4F2", font: "marker" });
    y += 48;
  });
  D.txt(ctx, found ? "200 ÷ 8 invents a number the story never gave" : "which number do you not actually have yet?",
    W / 2, H - 16, { size: 13.5, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

const drawStory66 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 340), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "seating the school dinner", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, { x: 60, y: 58, w: (W - 120) * 0.5, h: 40, prog: p2, parts: [{ v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }] });
  D.strip(ctx, { x: 60, y: 126, w: W - 120, h: 40, prog: p2, parts: [{ v: 48, label: "48", col: "#388C46" }, { v: 48, label: "48", col: "#388C46" }, { v: 48, label: "48", col: "#388C46" }] });
  if (p3 > 0) {
    D.txt(ctx, "8 tables of 6 seats · 3 sittings", W / 2, 192, { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "how many guests can be seated in all?", W / 2, H - 16, { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard66 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "When no method is obvious" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 420), p3 = D.at(f, 440, 620), p4 = D.at(f, 620, 770);
  const x = 96, w = W - 192;
  D.strip(ctx, { x: x, y: 112, w: w * 0.34, h: 44, prog: p1, total: p2 > 0 ? 48 : "?", parts: [{ v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }, { v: 6, label: "6", col: "#2D70B3" }] });
  if (p2 > 0) D.txt(ctx, "8×6=48", W / 2, 198, { size: 19, col: "#34D399", font: "marker", alpha: p2 });
  if (p3 > 0) {
    D.strip(ctx, { x: x, y: 232, w: w, h: 44, prog: p3, total: 144, parts: [{ v: 48, label: "48", col: "#388C46" }, { v: 48, label: "48", col: "#388C46" }, { v: 48, label: "48", col: "#388C46" }] });
    D.txt(ctx, "48×3=144", W / 2, 318, { size: 19, col: "#34D399", font: "marker", alpha: D.at(f, 500, 600) });
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "plan the order first \u2014 the numbers will not tell you", W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 660, 760) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 700, 800), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport66 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.strip(ctx, { x: 24, y: 26, w: W - 48, h: 38, prog: 1, total: 144, parts: [{ v: 72, label: "72", col: "#388C46" }, { v: 72, label: "72", col: "#388C46" }] });
};


/* Kareem's way: one table first — 6 seats × 3 sittings, then 8 tables */
const makeKareem66 = (step, onStep) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14); ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (onStep) D.tap(ctx, { x: 30, y: 40, w: W - 60, h: H - 80, value: 0, on: () => onStep((step + 1) % 3) });
  const rows = [
    { n: "1", t: "one table: 6 × 3 = 18 seats", col: "#2D70B3" },
    { n: "2", t: "eight tables: 18 × 8 = 144", col: "#FA7E19" }
  ];
  let y = 74;
  rows.forEach((r, k) => {
    const on = k < step;
    ctx.save();
    D.rr(ctx, 30, y - 18, W - 60, 42, 8);
    ctx.fillStyle = on ? "rgba(234,244,242,.06)" : "rgba(234,244,242,.02)";
    ctx.fill();
    ctx.strokeStyle = on ? r.col : "rgba(234,244,242,.15)";
    ctx.lineWidth = on ? 2 : 1; ctx.stroke();
    ctx.restore();
    D.txt(ctx, r.n, 52, y + 3, { size: 15, col: r.col, font: "mono", weight: 700, alpha: on ? 1 : 0.3 });
    D.txt(ctx, on ? r.t : "…", W / 2 + 30, y + 3, { size: 14.5, col: "#EAF4F2", font: "marker", alpha: on ? 1 : 0.25 });
    y += 54;
  });
  D.txt(ctx, step === 2 ? "different order, same 144 — the multiplication does not care"
                       : "Kareem groups by table, not by sitting",
    W / 2, H - 16, { size: 13, col: step === 2 ? "#34D399" : "#C9A227", font: "marker" });
};

const LESSON = {
  code: "6-6",
  storageKey: "daf-g4-t6-l6",
  title: "Problem Solving: Make Sense and Persevere",
  unit: "GRADE 4 · TOPIC 6 · LESSON 6-6 · MP.1",
  math: M,
  ixl: ["R8U"],

  metas: [
    { phase: "warmup", title: "The plan that <em>would not cooperate</em>",
      lead: "8 tables of 6 seats, 3 sittings. Three numbers, and no method written on the page — the plan will only work if the class finds its order.",
      goal: "Notice a plan with no obvious method: the numbers must be made to talk.",
      pull: "Three numbers, and no method written on the page.",
      rail: { launch: "Fictional frame. Look at the numbers — no working yet.",
        monitor: ["Counting the tables", "Counting the sittings", "Wonding which number to touch first"],
        connect: "Which two numbers belong together first?",
        misconception: "Dividing the seats by the sittings — one table's seats are not all the guests." } },

    { phase: "launch", title: "About how many guests <em>in all</em>?",
      lead: "8 × 6 = 48 per sitting, and 48 × 3 ≈ 150. The estimate says the answer sits near 150.",
      goal: "Create the need — estimate the final answer before the plan is found.",
      pull: "The guest count is simulated — the perseverance works on any plan.",
      rail: { launch: "Give a guest range and say the two steps you used.",
        monitor: ["Estimating one sitting", "Multiplying by 3", "Checking the range"],
        connect: "Why estimate before the method is found?",
        misconception: "Estimating with the wrong pair — 8 × 3 instead of 8 × 6 × 3." } },

    { phase: "monitor", title: "The tempting path <em>reaches a dead end</em>",
      lead: "A polished plan says 200 ÷ 8 = 25 guests per table. The number 200 is not in the story — the path was tempting, and it died there.",
      goal: "Name a dead end as a finding, not a failure.",
      pull: "200 ÷ 8 invents a number the story never gave.",
      rail: { launch: "Each line must use a number the story gives.",
        monitor: ["Checking where 200 came from", "Flagging the invented number", "Naming the dead end"],
        connect: "What did the tempting path do wrong?",
        misconception: "Giving up when the first path fails." } },

    { phase: "monitor", title: "Rana's <em>new representation</em>",
      lead: "One sitting first: 8 tables × 6 seats = 48. Then the three sittings: 48 × 3 = 144. The new representation saves the plan.",
      goal: "Persist with a new representation when the first path dies.",
      pull: "The answer to step 1 becomes a number you need in step 2.",
      rail: { launch: "Before step 2: which number from step 1 is it using?",
        monitor: ["Finding 48 first", "Multiplying 48 × 3", "Naming the middle answer"],
        connect: "Why did the new representation work where the old one died?",
        misconception: "Trying the same dead path a second time." } },

    { phase: "monitor", title: "One step or <em>two</em>?",
      lead: "Four dinner questions. Each one needs one step — or two.",
      goal: "Recognise the hidden middle step in a two-operations plan.",
      pull: "Do I already know every number I need?",
      rail: { launch: "Say the middle answer before you place the question.",
        monitor: ["Checking what is given", "Counting the unknowns", "Solving first, sorting after"],
        connect: "What made the two-step ones different?",
        misconception: "Counting the numbers in the question instead of the unknowns." } },

    { phase: "monitor", title: "Kareem groups <em>by table</em>, not by sitting",
      lead: "One table: 6 seats × 3 sittings = 18. Eight tables: 18 × 8 = 144. A different order, the same 144.",
      goal: "See that the order of multiplying does not matter — and that both orders are worth writing down.",
      pull: "The multiplication does not care which order you work in.",
      rail: { launch: "Before each step: which grouping is it?",
        monitor: ["Grouping by table", "Multiplying 18 × 8", "Comparing to Rana's 144"],
        connect: "Why do both orders reach 144?",
        misconception: "Believing only one grouping is correct." } },

    { phase: "connect", title: "Two merchants, one <em>144</em>",
      lead: "Rana groups by sitting. Kareem groups by table. Both reach 144 — and both plans survive the re-check.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Comparing the groupings", "Checking both reach 144", "Saying which is easier to defend"],
        connect: "Which plan would you defend to the council, and why?",
        misconception: "Discarding a plan that reached the same answer a different way." } },

    { phase: "synth", title: "On the <em>board</em>: plan the order first",
      lead: "The numbers will not tell you the method — the plan does. One sitting, then the rest; or one table, then the rest.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Naming the grouping", "Building the chain", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Answering with one table's 18 instead of the dinner's 144." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "A dead end is a finding. Keep the question, change the representation, and the plan cooperates.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the dead end", "Choosing the new representation", "Testing on a new plan"],
        connect: "What is the sign that a path is a dead end?",
        misconception: "Keeping an invented number because the path was started." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "A hall has 9 rows of 8 chairs, used for 2 shows. How many seats are used in all?",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Show the grouping you chose.",
        monitor: ["Finding 9 × 8", "Multiplying 72 × 2", "Naming the middle answer"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 72 — one show was called the whole dinner." } },

    { phase: "monitor", title: "The plan asks for <em>steadiness</em>",
      lead: "Before the seal, the class says what the dinner taught it about not giving up.",
      goal: "Close the quest on the standard, not the score.",
      pull: "A plan you can re-check is a plan people can trust.",
      rail: { launch: "Ask for the rule in students' own words before the seal.",
        monitor: ["Naming the dead end", "Naming the new representation", "Saying 'persevere' unprompted"],
        connect: "What would you refuse to sign, and why?",
        misconception: "Treating persistence as repeating the failed path." } },

    { phase: "connect", title: "The dinner is <em>seated</em>",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next door: a tile with more than one shape — the module that must fit every design.",
      rail: { launch: "Ask three students how they would save a dead-end plan.",
        monitor: ["Able to explain the new representation", "Still gives up at the dead end", "Ready for the module tile"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [found, setFound] = useState(false);
    const [kareem, setKareem] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The plan that would not cooperate"
            text="8 tables of 6 seats, 3 sittings. Three numbers, and no method written on the page — the plan will only work if the class finds its order."
            clue="Three numbers, and no method written on the page.">
            <NoticeWonder draw={drawStory66} height={256} award={award}
              notices={["Eight equal tables", "Three equal sittings", "The bars are different lengths", "There is a question mark"]}
              wonders={["How many in one sitting?", "Do I multiply twice?", "Which comes first?"]} />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The guest range, before the plan"
            text="Omar asks the dinner's question: about how many guests in all — with a fast range, before the method is found?"
            clue="8 × 6 = 48 per sitting, and 48 × 3 ≈ 150.">
            <LaunchEstimate draw={drawStory66} height={256} award={award}
              label="About how many guests in all?" min={40} max={300} start={144} unit="guests"
              after="Locked. Now let us find the number nobody gave us."
              note="The guest count is simulated — the perseverance works on any plan." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The tempting path reaches a dead end"
            text="A polished plan on the board: 200 ÷ 8 = 25 guests per table. Omar reads it line by line — the number 200 is not in the story."
            clue="200 ÷ 8 invents a number the story never gave.">
            <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              <Sketch draw={makeHidden66(found)} height={252} />
              <div style={{ textAlign: "center" }}>
                <button className="btn btn-primary" disabled={found}
                  style={{ opacity: found ? 0.5 : 1 }}
                  onClick={() => { setFound(true); }}>
                  <Icon name="fa-magnifying-glass" /> Show the number that was never in the story
                </button>
              </div>
              <div className="glass-card" style={{ cursor: "default", textAlign: "center", background: "var(--daf-mint)" }}>
                <MathEl omml={M.hidden} size="lg" display="block" />
              </div>
            </div>
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Rana's new representation"
            text="The dead end named, Rana changes the picture: one sitting first — 8 tables × 6 seats — then the three sittings."
            clue="One sitting first — the answer to step 1 becomes the number step 2 needs.">
            <ExploreChips draw={makeChain66(step)} height={266}
              label="How many guests altogether?"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "the question" }, { v: 1, label: "step 1" }, { v: 2, label: "step 2" }]}
              caption={<MathEl omml={M.chain} size="lg" display="block" />}
              footnote="The answer to step 1 becomes a number you need in step 2." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both"
            title="One step or two?"
            text="Omar and Zayd lay four dinner questions on the table. Each one needs one step — or two."
            clue="Do I already know every number I need?">
            <CardSort award={award} columns={2}
              items={[{ id: "t1", text: "How many seats in one sitting?", target: "one" }, { id: "t2", text: "How many guests altogether?", target: "two" }, { id: "t3", text: "How many seats at one table?", target: "one" }, { id: "t4", text: "How many more sittings for 200 guests?", target: "two" }]}
              targets={[
                { id: "one", label: "one step" },
                { id: "two", label: "two steps — something must be found first" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Kareem groups by table"
            text="Kareem's new representation: one table — 6 seats × 3 sittings = 18. Then eight tables: 18 × 8 = 144."
            clue="A different order, the same 144.">
            <ExploreChips draw={makeKareem66(kareem, setKareem)} height={256}
              label="Kareem's way — one table first"
              value={kareem}
              onPick={(v) => setKareem(v)}
              chips={[{ v: 0, label: "the question" }, { v: 1, label: "one table" }, { v: 2, label: "eight tables" }]}
              caption={<MathEl omml={M.answer} size="lg" display="block" />}
              footnote="The multiplication does not care which order you work in." />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="both"
            title="Two merchants, one 144"
            text="Rana groups by sitting. Kareem groups by table. Both reach 144 — and both plans survive the re-check."
            clue="The comparison produces the rule.">
            <CompareConnect award={award}
              left={{ name: "Rana's way — one sitting first", omml: M.step1, h: 92, quote: "8 tables of 6 is 48, then three sittings." }}
              right={{ name: "Kareem's way — one table first", omml: M.chain, h: 92, quote: "One table seats 6 three times, so 18 — then eight tables." }}
              same={["Both get 144", "Both use all three numbers", "Both multiply twice"]}
              diff={["Rana groups by sitting, Kareem by table", "The order of multiplying does not matter", "Both plans are worth writing down"]} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The plan is drawn, not declared"
            text="Zayd builds only what the class can justify: the dead end named, the new representation chosen, the check ready."
            clue="Plan the order first — one sitting, then the rest.">
            <BoardScreen draw={drawBoard66} height={430}
              caption="Plan the order first — one sitting, then the rest." />
          </StoryShell>
        );

      case 8:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule — and why it works"
            text="A dead end is a finding. Keep the question, change the representation, and the plan cooperates."
            clue="The new representation is part of the argument.">
            <RuleScreen award={award}
              ommls={[{ omml: M.rule, alt: "plan the order first — one sitting, then the rest" }]}
              hand={"name the dead end · keep the question · change the representation · check both ways"}
              cards={[
                { title: "The middle step", omml: M.step1, note: "one sitting: 8 × 6 = 48" },
                { title: "Tap for the other order", omml: M.wrong, revealOmml: M.step2, reveal: true,
                  note: "Kareem's table-first order reaches the same 144" }
              ]} />
          </StoryShell>
        );

      case 9:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs the seated plan"
            text="9 rows of 8 chairs, 2 shows. Choose your grouping — then the middle step."
            clue="72 is one show. The question asks for both.">
            <ShowWhatYouKnow award={award}
              prompt="A hall has 9 rows of 8 chairs, used for 2 shows. How many seats are used in all?"
              omml={M.swyk}
              options={[{ v: "a", text: "72" }, { v: "b", text: "144" }, { v: "c", text: "19" }, { v: "d", text: "36" }]}
              right="b"
              support={{
                yes: "Yes — 9 × 8 = 72 seats for one show, and 72 × 2 = 144 in all.",
                notYet: "Not yet — what did you have to work out before you could answer?",
                draw: drawSupport66, h: 82,
                hint: "Find one show first, then double it."
              }} />
          </StoryShell>
        );

      case 10:
        return (
          <AmanahWindow window={STORY && STORY.amanahWindows && STORY.amanahWindows[0]}>
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#10242B", marginBottom: "14px" }}>Steadiness</div>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#10242B", maxWidth: "520px", margin: "0 auto 10px" }}>
                The dinner taught the class what steadiness looks like in work: a path fails, the number is kept, the picture changes, and the plan is checked twice. Care that survives a dead end is the care people can rely on.
              </p>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5B6B70", maxWidth: "520px", margin: "0 auto" }}>
                The dinner plan is signed when its answer survives a second representation.
              </p>
            </div>
          </AmanahWindow>
        );

      case 11:
        return (
          <StoryHandoff
            title="The dinner is seated"
            text="Omar signs the seated plan: the dead end named, the two representations checked, the 144 defended. But the city's next design is different: a single tile that must fit every space — and only some numbers will let it."
            artifact="Council board · persevered plan"
            next="A tile with more than one shape — the module that must fit every design.">
            <Closing game={game} omml={M.rule}
              action="Find a problem at home with three numbers and write your plan before solving it." />
          </StoryHandoff>
        );

      default: return null;
    }
  }
};
