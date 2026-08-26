/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-6 · Subtract Greater Numbers
   Standard 4.NBT.B.4   I can ... subtract numbers up to six digits,
   keeping every place lined up.
   =========================================================================== */

const M = {
  problem: om(mt("482,517-96,348")),
  answer: om(mt("482,517-96,348=386,169")),
  estimate: om(mt("483,000-96,000=387,000")),
  regroup: om(mnor("line up the places, not the edges")),
  traded: om(mt("17-8=9")),
  check: om(mt("386,169+96,348=482,517")),
  swyk: om(mt("310,254-87,169")),
  swykAnswer: om(mt("310,254-87,169=223,085"))
};

const drawStock = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 290), p3 = D.at(f, 300, 430);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "two towns in Makkah Region", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, {
    x: 60, y: 62, w: W - 120, h: 46, prog: p2, total: 482517,
    parts: [{ v: 96348, label: "96,348", col: "#C74440" }, { v: 386169, label: "?", col: "#2D70B3" }]
  });
  if (p3 > 0) {
    D.txt(ctx, "482,517 people in the larger town", W / 2, 142,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: p3 });
    D.txt(ctx, "how many more than the smaller town?", W / 2, H - 20, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const makeColumnSub = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 132, y: 30, w: 264, a: 482517, b: 96348, op: "-", prog: step / 6, t: frame, cw: 26 });
  const notes = ["line the places up", "ones: 7 − 8 needs a trade, 17 − 8 = 9",
                 "tens: 0 − 4 needs a trade, 10 − 4 = 6", "hundreds: 4 − 3 = 1",
                 "thousands: 1 − 6 needs a trade, 11 − 6 = 5",
                 "ten thousands: 7 − 9 needs a trade, 17 − 9 = 8", "hundred thousands: 3 − 0 = 3"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 13.5, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeAlign = (mode) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = "482517", b = mode === 1 ? " 96348" : "96348 ";
  const cw = 46, x0 = W / 2 - 3 * cw;
  const names = ["hund. th.", "ten th.", "thousands", "hundreds", "tens", "ones"];
  for (let i = 0; i < 6; i++) {
    D.txt(ctx, names[i], x0 + i * cw + cw / 2, 40,
      { size: 9, col: "rgba(234,244,242,.45)", font: "mono", weight: 600 });
    ctx.save();
    D.rr(ctx, x0 + i * cw + 4, 54, cw - 8, 84, 7);
    ctx.strokeStyle = "rgba(234,244,242,.18)"; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
    D.txt(ctx, a[i], x0 + i * cw + cw / 2, 78, { size: 24, col: "#EAF4F2", font: "marker" });
    if (b[i] !== " ") {
      D.txt(ctx, b[i], x0 + i * cw + cw / 2, 118,
        { size: 24, col: mode === 1 ? "#34D399" : "#C74440", font: "marker" });
    }
  }
  D.txt(ctx, mode === 1 ? "lined up on the right — the ones sit under the ones"
                        : "lined up on the left — the 9 is pretending to be ten thousands",
    W / 2, H - 40, { size: 14, col: mode === 1 ? "#34D399" : "#C74440", font: "marker" });
  D.txt(ctx, mode === 1 ? "482,517 − 96,348 = 386,169" : "this gives a nonsense answer",
    W / 2, H - 16, { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
};

const drawBoard25 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "What does crossing out really mean?" });
  const p1 = D.at(f, 20, 210), p2 = D.at(f, 220, 380), p3 = D.at(f, 390, 550), p4 = D.at(f, 550, 700);
  D.columnOp(ctx, { x: W / 2 - 210, y: 86, w: 220, a: 482517, b: 96348, op: "-", prog: p1, t: frame, cw: 36 });
  if (p2 > 0) {
    D.txt(ctx, "4 ones cannot take 8", W / 2 + 86, 138, { size: 16, col: "#C74440", font: "marker", alpha: p2 });
    D.txt(ctx, "so trade one ten for ten ones", W / 2 + 86, 166,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 260, 350) });
  }
  if (p3 > 0) {
    D.txt(ctx, "3 tens becomes 2 tens", W / 2 + 86, 208, { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "4 ones becomes 14 ones", W / 2 + 86, 232, { size: 14, col: "#C9A227", font: "marker", alpha: D.at(f, 430, 510) });
    D.txt(ctx, "the number itself has not changed", W / 2 + 86, 262,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 470, 550) });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "regrouping renames the number — it never changes its value",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 590, 670) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 620, 720), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport25 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 100, y: -14, w: 200, a: 310254, b: 87169, op: "-", prog: 1, cw: 26 });
};

const LESSON = {
  code: "2-6",
  storageKey: "daf-g4-t2-l6",
  title: "Subtract Greater Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-6 · 4.NBT.B.4",
  math: M,
  ixl: ["TSJ", "WLN", "YPD"],

  metas: [
    {
      phase: "warmup",
      title: "The <em>warehouse expansion</em>",
      lead: "The expansion plan lands on the desk: 482,517 in the reserve, 96,348 committed to the build. The difference is the report.",
      goal: "An invitation — the reserve rule again, six places long.",
      pull: "483,000 − 96,000 says where the answer will land.",
      rail: {
        launch: "Fictional frame. Ask only: what is being subtracted from what, and how long is the column?",
        monitor: ["Noticing the six places", "Estimating the difference region", "Wonding where the renames will happen"],
        connect: "Which column will need a rename first?",
        misconception: "Subtracting the shorter number's digits against the wrong column."
      }
    },
    {
      phase: "launch",
      title: "The class nets the difference <em>before the columns</em>",
      lead: "482,517 − 96,348. Both net the difference the same way the reserve was netted: estimate first, exact second.",
      goal: "Estimate a six-place difference before computing it.",
      pull: "387,000 is where the remainder should land.",
      rail: {
        launch: "State that the reserve and build figures are simulated planning data.",
        monitor: ["Rounding 482,517 and 96,344 to the nearest thousand", "Subtracting the friendly numbers", "Keeping 387,000 in view"],
        connect: "What would a wrong difference look like next to 387,000?",
        misconception: "Aligning the left edges so the ones land in the tens."
      }
    },
    {
      phase: "monitor",
      title: "Zayd lines the numbers up <em>two ways</em>",
      lead: "He can show the same two numbers aligned left and aligned right. The class picks the alignment before the columns are drawn.",
      goal: "Line up the places, not the edges — the ones under the ones, and the rest follow.",
      pull: "A five-digit number has nothing in the hundred-thousands. Line up the ones and the rest follow.",
      rail: {
        launch: "Ask what the left alignment does to the ones column before revealing it.",
        monitor: ["Comparing the two alignments", "Naming the ones-under-ones rule", "Seeing the empty hundred-thousands"],
        connect: "Which alignment lets the places speak to each other?",
        misconception: "Right-aligning by the last digit of the shorter number's label instead of its ones."
      }
    },
    {
      phase: "monitor",
      title: "Omar steps through the <em>long subtraction</em>",
      lead: "He can step the subtraction place by place through six places — the class chooses the place before each rename.",
      goal: "Subtract greater whole numbers with chained renames.",
      pull: "17 − 8 = 9 in the ones, after the rename travels.",
      rail: {
        launch: "Predict the rename before it happens.",
        monitor: ["Following the rename through the tens", "Handling 2 − 6 after the borrow", "Writing each renamed digit"],
        connect: "Which column needed two renames?",
        misconception: "Forgetting that a borrowed ten changes the column above it."
      }
    },
    {
      phase: "monitor",
      title: "The expansion report needs <em>its add-back</em>",
      lead: "Four lines of the expansion report are mixed up. The class files each as the add-back check or part of the working before the folio signs.",
      goal: "Verify a greater difference by adding it back to the build cost.",
      pull: "386,169 + 96,348 = 482,517 — the reserve is exactly what it was.",
      rail: {
        launch: "Do not grade until the class commits to all four lines.",
        monitor: ["Naming the add-back", "Rejecting the impossible subtraction", "Naming the rename step"],
        connect: "Which line would the auditor ask for first?",
        misconception: "Filing the estimate as if it were the check."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em> to the difference",
      lead: "The boys step back. Real student methods for the long subtraction take the board.",
      goal: "Compare methods and name a reusable one in the Sijill.",
      pull: "One nets the region first; one follows the renames.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both reach 386,169", "Comparing the estimate region to the rename chain", "Explaining which they trust and why"],
        connect: "Which part of the report catches a dropped rename?",
        misconception: "A difference that lands near the estimate but fails the add-back."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Line up the places. Rename when a place cannot pay. Add the difference back to close the reserve.",
      goal: "Build the greater-subtraction rule publicly from the methods compared.",
      pull: "The expansion is approved when the add-back closes the reserve.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Showing the chained rename", "Running the add-back"],
        connect: "Which part of the report proves the subtraction at six places?",
        misconception: "Trusting the estimate region in place of the add-back."
      }
    },
    {
      phase: "swyk",
      title: "The class signs only a difference it can <em>close</em>",
      lead: "A final expansion slip: 310,254 in, 87,169 committed. Report the difference — and be ready to add it back.",
      goal: "Subtract greater numbers independently and verify by adding back.",
      pull: "A closed add-back signs the expansion report.",
      rail: {
        launch: "Two minutes. Require the add-back, not only the difference.",
        monitor: ["Following the rename through the thousands", "Subtracting column by column", "Checking 223,085 + 87,169 = 310,254"],
        connect: "Which column needed the longest rename chain?",
        misconception: "A difference that lands near 223,000 but does not add back."
      }
    },
    {
      phase: "connect",
      title: "The expansion is approved — <em>and verified</em>",
      lead: "The expansion report is filed with its add-back. Then the ledger page cracks open under a water stain — and the regrouping marks across the zeros are gone.",
      goal: "Close on one action: subtract a big pair and add the difference back.",
      pull: "Tomorrow: the line of silent zeros.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Writing differences with add-backs", "Trusting the rename chain", "Ready for zeros in the middle"],
        connect: "Where has a check 'closed the jar' for you in real life?",
        misconception: "Remembering the warehouse but not the align-rename-verify rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [align, setAlign] = useState(1);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The expansion plan on the desk"
            text="The lantern opens the ledger on the warehouse expansion: 482,517 in the reserve, 96,348 committed to the build. The difference is the report — and the report must prove itself, like every reserve before it."
            clue="The same rule, six places long">
            <NoticeWonder draw={drawStock} height={256} award={award}
              notices={["Both figures have six places", "The reserve is much larger", "The estimate region is near 387,000", "The add-back habit is already filed"]}
              wonders={["Where will the renames happen?", "What does the empty hundred-thousands do?", "How will the report prove itself?"]}
              footnote="The story raises the size again. The rule is unchanged." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The class nets the difference together"
            text="Omar and Zayd round the figures the same way the reserve was netted — 483,000 and 96,000 — and lock the region the answer must land in."
            clue="483,000 − 96,000 = 387,000">
            <LaunchEstimate draw={drawStock} height={256} award={award}
              label="About how much more is in the reserve? (482,517 − 96,348)"
              min={200000} max={500000} start={390000} unit="items"
              after="Locked. Keep 387,000 in view — the exact difference will be checked against it."
              note="Figures are simulated planning data. The region is the safety net." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd lines the numbers up two ways"
            text="He can show the same two numbers aligned left and aligned right. The class picks the alignment before the columns are drawn."
            clue="Ones under the ones — the rest follow">
            <ExploreChips draw={makeAlign(align)} height={252}
              label="How should the two numbers be lined up?"
              value={align}
              onPick={(v) => setAlign(v)}
              chips={[{ v: 0, label: "align left" }, { v: 1, label: "align right" }]}
              caption={<MathEl omml={align === 1 ? M.answer : M.regroup} size="lg" display="block" />}
              footnote="A five-digit number has nothing in the hundred-thousands. Line up the ones and the rest follow." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar steps through the long subtraction"
            text="He can step the subtraction place by place through six places. The class chooses the place before each rename — 17 − 8 = 9 after the rename travels."
            clue="The rename chain does not stop at the first borrow">
            <ExploreChips draw={makeColumnSub(step)} height={252}
              label="Step through the columns of 482,517 − 96,348"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "set up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }, { v: 4, label: "thousands" }, { v: 5, label: "hundred-thousands" }]}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="A crossed-out digit is renamed, not reduced." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The expansion report is mixed up"
            text="Omar reads each line while Zayd files it. The class commits every line to the add-back check or part of the working before the folio signs."
            clue="The add-back closes the reserve: difference + build cost = reserve">
            <CardSort award={award} columns={2} commitLabel="File the four lines"
              items={[
                { id: "s1", text: "386,169 + 96,348 = 482,517", target: "t1" },
                { id: "s2", text: "483,000 − 96,000 = 387,000", target: "t2" },
                { id: "s3", text: "96,348 − 386,169", target: "t2" },
                { id: "s4", text: "17 − 8 = 9 after the rename", target: "t2" }
              ]}
              targets={[
                { id: "t1", label: "Add-back check" },
                { id: "t2", label: "Part of the working" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest long-subtraction methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One nets the region first; one follows the renames">
          <CompareConnect award={award}
            left={{ name: "Lina's way — net the region first", omml: M.estimate, h: 92,
                    quote: "387,000 first — the answer must land in that region or the columns are wrong." }}
            right={{ name: "Omar's way — follow the renames", omml: M.traded, h: 92,
                     quote: "I follow each rename left until every column has paid." }}
            same={["Both reach 386,169", "Both line up the places, not the edges", "Both close the reserve with the add-back"]}
            diff={["Lina's region catches a dropped rename", "Omar's chain shows where each ten went", "Lina's is the net, Omar's is the build"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Line up the places · rename when it cannot pay · add it back">
            <BoardScreen draw={drawBoard25} height={380}
              caption="The expansion is approved when the add-back closes the reserve." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The class signs only a difference it can close"
            text="A final expansion slip: 310,254 in, 87,169 committed. Report the difference — and be ready to add it back."
            clue="The rename chain runs through the thousands">
            <ShowWhatYouKnow award={award}
              prompt="Subtract 310,254 − 87,169."
              omml={M.swyk}
              options={[{ v: "a", text: "223,085" }, { v: "b", text: "223,185" }, { v: "c", text: "213,085" }, { v: "d", text: "233,085" }]}
              right="a"
              support={{
                yes: "Yes — and 223,085 + 87,169 = 310,254 closes the reserve exactly.",
                notYet: "Not yet — line up the places, follow the rename chain, then add the difference back.",
                draw: drawSupport25, h: 84,
                hint: "Which column needed the longest rename chain?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The expansion is approved and verified"
            text="The expansion report is filed with the add-back that closes the reserve. Then a water stain cracks open the next ledger page — and the regrouping marks across the line of zeros are gone."
            artifact="Souq ledger · expansion report (difference + add-back)"
            next="Water damage erased the regrouping marks — across a line of silent zeros.">
            <Closing game={game} omml={M.check}
              action="Tonight: subtract two big numbers and add the difference back to close the reserve." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
