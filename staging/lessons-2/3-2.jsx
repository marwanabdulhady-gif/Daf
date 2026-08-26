/* ===========================================================================
   Grade 4 · Topic 3 · LESSON 3-2 · Estimate Products
   Standard 4.NBT.B.5   I can ... estimate a product by rounding, and decide
   whether an answer is reasonable.
   =========================================================================== */

const M = {
  problem: om(mt("8×235")),
  estimate: om(mt("8×200=1,600")),
  closer: om(mt("8×240=1,920")),
  exact: om(mt("8×235=1,880")),
  under: om(mnor("rounded down → the real answer is bigger")),
  over: om(mnor("rounded up → the real answer is smaller")),
  rule: om(mnor("round one factor to a basic fact you know")),
  swyk: om(mt("6×512")),
  swykAnswer: om(mt("6×500=3,000"))
};

const drawCrates = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 320), p3 = D.at(f, 330, 450);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "boxes of dates for the market", W / 2, 24,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let c = 0; c < 8; c++) {
    const a = D.at(p2, c / 8, c / 8 + 0.35);
    if (a <= 0) continue;
    const bx = 40 + (c % 4) * ((W - 100) / 4);
    const by = 52 + Math.floor(c / 4) * 62;
    ctx.save();
    ctx.globalAlpha = a * 0.9;
    D.rr(ctx, bx, by, (W - 130) / 4, 46, 7);
    ctx.fillStyle = "#FA7E19"; ctx.globalAlpha = a * 0.2; ctx.fill();
    ctx.globalAlpha = a; ctx.strokeStyle = "#FA7E19"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "235", bx + (W - 130) / 8, by + 25, { size: 15, col: "#EAF4F2", font: "marker", alpha: a });
  }
  if (p3 > 0) D.txt(ctx, "8 boxes · about how many dates?", W / 2, H - 18,
    { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
};

const makeRoundFactor = (to) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cfg = to === 100 ? { lo: 200, hi: 300 } : { lo: 230, hi: 240 };
  D.roundLine(ctx, { x: 62, y: 88, w: W - 124, lo: cfg.lo, hi: cfg.hi, value: 235, prog: 1 });
  const rounded = to === 100 ? 200 : 240;
  D.txt(ctx, "8 × " + rounded + " = " + (8 * rounded).toLocaleString("en-US"), W / 2, H - 46,
    { size: 19, col: "#C9A227", font: "marker" });
  D.txt(ctx, to === 100 ? "rounded down, so the real answer is bigger"
                        : "rounded up, so the real answer is smaller",
    W / 2, H - 18, { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const makeOverUnder = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const exact = 1880;
  const est = which === "under" ? 1600 : 1920;
  const x = 60, w = W - 120, y = H / 2 + 8;
  const lo = 1500, hi = 2000;
  const px = (n) => x + ((n - lo) / (hi - lo)) * w;
  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.7)", 2.2);
  [1500, 1600, 1700, 1800, 1900, 2000].forEach((n) => {
    ctx.save(); ctx.strokeStyle = "rgba(234,244,242,.35)"; ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.moveTo(px(n), y - 6); ctx.lineTo(px(n), y + 6); ctx.stroke(); ctx.restore();
    D.txt(ctx, n.toLocaleString("en-US"), px(n), y + 24,
      { size: 9.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 500 });
  });
  ctx.save(); ctx.beginPath(); ctx.arc(px(exact), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#34D399"; ctx.fill(); ctx.restore();
  D.txt(ctx, "exact 1,880", px(exact), y - 26, { size: 12.5, col: "#34D399", font: "marker" });
  ctx.save(); ctx.beginPath(); ctx.arc(px(est), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#C9A227"; ctx.fill(); ctx.restore();
  D.txt(ctx, "estimate " + est.toLocaleString("en-US"), px(est), y + 52,
    { size: 12.5, col: "#C9A227", font: "marker" });
  D.txt(ctx, which === "under" ? "an under-estimate — safe if you must not over-order"
                              : "an over-estimate — safe if you must not run short",
    W / 2, 36, { size: 14, col: "#EAF4F2", font: "marker" });
};

const drawBoard32 = (ctx, W, H, frame) => {
  const CYCLE = 740, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "About how many?" });
  const p1 = D.at(f, 20, 140), p2 = D.at(f, 150, 330), p3 = D.at(f, 340, 490), p4 = D.at(f, 490, 640);
  D.txt(ctx, "8 × 235", W / 2, 96, { size: 30, col: "#EAF4F2", font: "marker", alpha: p1 });
  if (p2 > 0) D.roundLine(ctx, { x: 90, y: 176, w: W - 180, lo: 200, hi: 300, value: 235, prog: p2 });
  if (p3 > 0) {
    D.txt(ctx, "235 is nearer to 200", W / 2, 250, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "8 × 2 = 16, so 8 × 200 = 1,600", W / 2, 282,
      { size: 17, col: "#34D399", font: "marker", alpha: D.at(f, 390, 470) });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "round to a fact you know, then attach the place",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 530, 610) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 570, 670), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport32 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.roundLine(ctx, { x: 40, y: 34, w: W - 80, lo: 500, hi: 600, value: 512, prog: 1 });
};

const LESSON = {
  code: "3-2",
  storageKey: "daf-g4-t3-l2",
  title: "Estimate Products",
  unit: "GRADE 4 · TOPIC 3 · LESSON 3-2 · 4.NBT.B.5",
  math: M,
  ixl: ["WDG"],

  metas: [
    {
      phase: "warmup",
      title: "The foreman's <em>quick promise</em>",
      lead: "A date order has landed: eight boxes of 235. The foreman promises a number by sundown — and the exact count can wait.",
      goal: "An invitation — an estimate is a decision with a stated round.",
      pull: "The trader needs a number now. Exact can wait.",
      rail: {
        launch: "Fictional frame. Ask only: what number is needed, by when, and at what precision?",
        monitor: ["Noticing 8 × 235", "Finding a nearby friendly factor", "Wonding which way the round bends"],
        connect: "What makes an estimate defensible?",
        misconception: "Guessing a round number with no stated round."
      }
    },
    {
      phase: "launch",
      title: "Omar rounds <em>one factor</em> to a fact",
      lead: "Eight stays eight — it is already a fact. Omar rounds the 235 and locks the estimate the class can defend.",
      goal: "Estimate a product by rounding one factor to a friendly number.",
      pull: "8 × 200 = 1,600 — and the class knows which way it bends.",
      rail: {
        launch: "State that the order quantities are simulated planning data.",
        monitor: ["Keeping the 8 as the fact", "Rounding 235", "Locking 1,600"],
        connect: "Which factor was rounded, and to what place?",
        misconception: "Rounding both factors and losing the place the estimate was made at."
      }
    },
    {
      phase: "monitor",
      title: "Zayd shows the <em>two rounds</em>",
      lead: "He can round the 235 to the nearest hundred or the nearest ten — the class picks the round before the estimate appears.",
      goal: "Choose a round that fits the job, and state it.",
      pull: "The 8 stays as it is — it is already a fact you know.",
      rail: {
        launch: "Ask which round the sundown decision needs before revealing.",
        monitor: ["Rounding to 200", "Rounding to 240", "Comparing 1,600 and 1,920"],
        connect: "Which round costs more effort, and which is closer?",
        misconception: "Rounding to a 'nicer' number that is not a place round."
      }
    },
    {
      phase: "monitor",
      title: "Omar sizes the <em>bend</em> of each estimate",
      lead: "He can place each estimate against the exact product — the class chooses the estimate before its direction appears.",
      goal: "Say whether an estimate is under or over, and why.",
      pull: "Round the factor down → the real product is bigger. Round up → smaller.",
      rail: {
        launch: "Ask for the direction before the comparison line appears.",
        monitor: ["Placing 8 × 200 under", "Placing 8 × 240 over", "Reading the exact 1,880 against both"],
        connect: "Which estimate is safer for ordering dates — under or over?",
        misconception: "Saying an estimate is 'about right' without naming its direction."
      }
    },
    {
      phase: "monitor",
      title: "The three lines need <em>their labels</em>",
      lead: "Two estimates and the exact product are mixed up. The class labels each line before the folio files the order.",
      goal: "Separate under-estimates, over-estimates and the exact product in a record.",
      pull: "A labelled estimate is a defensible estimate.",
      rail: {
        launch: "Do not grade until the class commits to all three labels.",
        monitor: ["Naming 1,600 as under", "Naming 1,920 as over", "Naming 1,880 as exact"],
        connect: "Which label would the foreman sign for the sundown order?",
        misconception: "Filing the closer estimate as 'exact'."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em> to the estimate",
      lead: "The boys step back. Real student estimating methods take the board.",
      goal: "Compare methods and name a reusable one in the Sijill.",
      pull: "One method rounds to a fact; one sizes the error.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both reach a defensible estimate", "Comparing the fact-round to the error-size", "Explaining when each helps"],
        connect: "When does the under-estimate fail the job?",
        misconception: "Treating the faster estimate as the better one without naming the job."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Round one factor to a basic fact you know. Say the place. Say which way it bends.",
      goal: "Build the product-estimate rule publicly from the methods compared.",
      pull: "An estimate is a decision with a stated round.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Stating the place", "Stating the direction"],
        connect: "Which part of the rule makes the estimate re-checkable?",
        misconception: "An estimate with a number but no stated round."
      }
    },
    {
      phase: "swyk",
      title: "Omar signs only an estimate he can <em>defend</em>",
      lead: "A final order: 6 boxes of 512. Round to the nearest hundred and sign the estimate the trader will order by.",
      goal: "Estimate a product independently with a stated round.",
      pull: "A defended estimate signs the order.",
      rail: {
        launch: "Two minutes. Require the round and the direction, not only the number.",
        monitor: ["Rounding 512 to 500", "Naming 6 × 500 = 3,000", "Naming the direction (over)"],
        connect: "Why is 3,000 an over-estimate here?",
        misconception: "Answering 300 — the fact scaled by the wrong place."
      }
    },
    {
      phase: "connect",
      title: "The order is signed — <em>and the rows appear</em>",
      lead: "The date order is signed at 3,000, defended. Then the grove's new seating rows are set out — and counting by eye is not a method the grove plan can stand on.",
      goal: "Close on one action: defend an estimate you make.",
      pull: "Tomorrow: the rows themselves must tell the total.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Stating rounds", "Stating directions", "Ready for arrays"],
        connect: "Where does your family 'sign a number' on an estimate?",
        misconception: "Remembering the foreman's promise but not the round + direction rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [to, setTo] = useState(100);
    const [which, setWhich] = useState("under");

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="A number promised by sundown"
            text="The lantern shows the foreman's desk: a date order for eight boxes of 235, and a promise in the margin — a number by sundown. The exact count can wait. The estimate cannot."
            clue="The estimate must be defensible, not just close">
            <NoticeWonder draw={drawCrates} height={256} award={award}
              notices={["Eight boxes", "235 dates each", "A number is promised", "The exact total is not yet counted"]}
              wonders={["Which number should be rounded?", "Which way will the round bend?", "How close is close enough for an order?"]}
              footnote="The story sets the deadline. The estimate is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar rounds one factor to a fact"
            text="Omar keeps the 8 — it is already a fact — and rounds the 235. The class locks the estimate before the round is stated."
            clue="8 × 200 = 1,600, rounded to the nearest hundred">
            <LaunchEstimate draw={drawCrates} height={256} award={award}
              label="About how many dates in 8 boxes of 235?"
              min={1000} max={3000} start={1900} unit="dates"
              after="Locked. Now let us see which number you rounded — and which way it bends."
              note="The trader needs a number now. Exact can wait. Quantities are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd shows the two rounds"
            text="He can round the 235 to the nearest hundred or the nearest ten. The class picks the round before the estimate appears."
            clue="The 8 stays — it is already a fact">
            <ExploreChips draw={makeRoundFactor(to)} height={252}
              label="Round 235 to the …"
              value={to}
              onPick={(v) => setTo(v)}
              chips={[{ v: 100, label: "nearest hundred" }, { v: 10, label: "nearest ten" }]}
              caption={<MathEl omml={to === 100 ? M.estimate : M.closer} size="xl" display="block" />}
              footnote="Round one factor to a basic fact you know — and say the place." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar sizes the bend of each estimate"
            text="He can place each estimate against the exact product. The class chooses the estimate before its direction appears — round down and the real product is bigger."
            clue="Round down → bigger. Round up → smaller.">
            <ExploreChips draw={makeOverUnder(which)} height={252}
              label="Where does each estimate sit?"
              value={which}
              onPick={(v) => setWhich(v)}
              chips={[{ v: "under", label: "8 × 200" }, { v: "over", label: "8 × 240" }]}
              caption={<MathEl omml={M.exact} size="lg" display="block" />}
              footnote="The exact product is 1,880 — both estimates are defensible, in different directions." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The three lines need their labels"
            text="Omar reads each line while Zayd labels it. The class commits all three before the folio files the order."
            clue="Under, over, or exact — every line earns one">
            <CardSort award={award} columns={3} commitLabel="Label the three lines"
              items={[
                { id: "s1", text: "8 × 200 = 1,600", target: "t1" },
                { id: "s2", text: "8 × 240 = 1,920", target: "t2" },
                { id: "s3", text: "8 × 235 = 1,880", target: "t3" }
              ]}
              targets={[
                { id: "t1", label: "Under estimate" },
                { id: "t2", label: "Over estimate" },
                { id: "t3", label: "Exact" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest estimating methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One rounds to a fact; one sizes the error">
          <CompareConnect award={award}
            left={{ name: "Aya's way — round to a fact", omml: M.estimate, h: 92,
                    quote: "8 × 200 — the 8 is a fact I know, and 200 is the round I state." }}
            right={{ name: "Musa's way — size the error", omml: M.under, h: 92,
                     quote: "I round down, so the real answer is bigger — I know exactly which way." }}
            same={["Both state the round", "Both know the direction", "Both defend the number to the trader"]}
            diff={["Aya's lands fast", "Musa's names the error", "Aya + Musa together: round and size it"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Round one factor · state the place · state the bend">
            <BoardScreen draw={drawBoard32} height={380}
              caption="An estimate is a decision with a stated round." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only an estimate he can defend"
            text="A final order: 6 boxes of 512 dates. Round to the nearest hundred, state the bend, and sign the estimate the trader will order by."
            clue="512 sits near 500 — and you rounded down">
            <ShowWhatYouKnow award={award}
              prompt="Estimate 6 × 512 by rounding to the nearest hundred."
              options={[{ v: "a", text: "300" }, { v: "b", text: "3,000" }, { v: "c", text: "3,600" }, { v: "d", text: "30,000" }]}
              right="b"
              support={{
                yes: "Yes — 6 × 500 = 3,000, rounded down, so the exact product is a little bigger.",
                notYet: "Not yet — round the 512, keep the 6 as the fact, and state the bend.",
                draw: drawSupport32, h: 84,
                hint: "512 is near 500 — what is 6 × 500?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The order is signed — and the rows appear"
            text="Omar signs the date order at 3,000, defended: round stated, bend stated. Then the grove's new seating rows are set out under the shade — and counting by eye is not a method the grove plan can stand on."
            artifact="Grove plan · defended product estimate"
            next="The rows are set — the grove needs a method where the rows themselves tell the total.">
            <Closing game={game} omml={M.estimate}
              action="Tonight: estimate a product at home, state the round you made, and say which way it bends." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
