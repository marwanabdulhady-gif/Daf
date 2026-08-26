/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-5 · Subtract Whole Numbers
   Standard 4.NBT.B.4   I can ... subtract multi-digit numbers using the
   standard algorithm, and explain the regrouping.
   =========================================================================== */

const M = {
  problem: om(mt("534-268")),
  answer: om(mt("534-268=266")),
  estimate: om(mt("530-270=260")),
  regroup: om(mt("4"), mnor(" ones cannot take "), mt("8"), mnor(" — trade a ten")),
  traded: om(mt("14-8=6")),
  check: om(mt("266+268=534")),
  swyk: om(mt("725-348")),
  swykAnswer: om(mt("725-348=377"))
};

const drawStock = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 290), p3 = D.at(f, 300, 430);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the canteen stockroom", W / 2, 24, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.strip(ctx, {
    x: 60, y: 62, w: W - 120, h: 46, prog: p2, total: 534,
    parts: [{ v: 268, label: "268 sold", col: "#C74440" }, { v: 266, label: "?", col: "#2D70B3" }]
  });
  if (p3 > 0) {
    D.txt(ctx, "534 juice cartons at the start", W / 2, 142,
      { size: 13.5, col: "rgba(234,244,242,.75)", font: "marker", alpha: p3 });
    D.txt(ctx, "how many are left?", W / 2, H - 20, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const makeColumnSub = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 90, y: 30, w: 180, a: 534, b: 268, op: "-", prog: step / 3, t: frame, cw: 42 });
  const notes = ["start with the ones", "4 cannot take 8 — trade a ten, now 14 − 8 = 6",
                 "2 tens cannot take 6 — trade a hundred, now 12 − 6 = 6", "4 − 2 = 2 hundreds"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 13.5, col: step === 3 ? "#34D399" : "#C9A227", font: "marker" });
};

const makeTrade = (traded) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = 8, base = H - 74;
  /* three tens rods and four ones, then one rod breaks into ten ones */
  const rods = traded ? 2 : 3;
  const ones = traded ? 14 : 4;
  for (let r = 0; r < rods; r++) {
    D.digitBlocks(ctx, { x: 80 + r * 26, y: base - s * 10, unit: 10, prog: 1, col: "#2D70B3", s: s });
  }
  for (let o = 0; o < ones; o++) {
    const col = o < (ones - (traded ? 10 : 0)) ? "#FA7E19" : "#C9A227";
    D.digitBlocks(ctx, {
      x: 210 + (o % 7) * 14, y: base - s - Math.floor(o / 7) * 14, unit: 1, prog: 1, col: col, s: s
    });
  }
  D.txt(ctx, rods + " tens", 106, base + 22, { size: 12.5, col: "#2D70B3", font: "marker" });
  D.txt(ctx, ones + " ones", 254, base + 22, { size: 12.5, col: "#FA7E19", font: "marker" });
  D.txt(ctx, traded ? "one ten became ten ones — now 14 ones can give away 8"
                    : "4 ones cannot give away 8",
    W / 2, 36, { size: 14.5, col: traded ? "#34D399" : "#C74440", font: "marker" });
  if (!traded) D.txt(ctx, "tap to trade a ten", W / 2, H - 16,
    { size: 12.5, col: "#C9A227", font: "marker" });
};

const drawBoard25 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "What does crossing out really mean?" });
  const p1 = D.at(f, 20, 210), p2 = D.at(f, 220, 380), p3 = D.at(f, 390, 550), p4 = D.at(f, 550, 700);
  D.columnOp(ctx, { x: W / 2 - 176, y: 86, w: 176, a: 534, b: 268, op: "-", prog: p1, t: frame, cw: 46 });
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
  D.columnOp(ctx, { x: W / 2 - 70, y: -14, w: 140, a: 725, b: 348, op: "-", prog: 1, cw: 34 });
};

const LESSON = {
  code: "2-5",
  storageKey: "daf-g4-t2-l5",
  title: "Subtract Whole Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-5 · 4.NBT.B.4",
  math: M,
  ixl: ["FCP", "6SZ"],

  metas: [
    {
      phase: "warmup",
      title: "What remains in the <em>reserve</em>",
      lead: "The council has approved the spend. The reserve jar on the ledger must now be reported — honestly, to the last item.",
      goal: "An invitation — subtraction is what is left, and the report must prove it.",
      pull: "534 was in the reserve. 268 went out the door.",
      rail: {
        launch: "Fictional frame. Ask only: what happened to the reserve, and what must be reported?",
        monitor: ["Noticing the approved spend", "Wonding how much is left", "Noticing the report needs proof"],
        connect: "What would 'what is left' look like without a check?",
        misconception: "Reporting the spend as if it were the remainder."
      }
    },
    {
      phase: "launch",
      title: "Zayd nets the remainder <em>before the columns</em>",
      lead: "534 − 268. Zayd rounds both and locks the estimate — the remainder will be checked against it.",
      goal: "Estimate a difference before computing it.",
      pull: "530 − 270 = 260 — the remainder should land near there.",
      rail: {
        launch: "State that the reserve and spend figures are simulated planning data.",
        monitor: ["Rounding 534 and 268", "Subtracting the friendly numbers", "Keeping the estimate visible"],
        connect: "What would a wrong remainder look like next to 260?",
        misconception: "Subtracting the digits from left to right, the way the numbers are read."
      }
    },
    {
      phase: "monitor",
      title: "Zayd steps through the <em>subtraction columns</em>",
      lead: "He can step the subtraction place by place — the class chooses the place before the rename happens.",
      goal: "Subtract by columns from the ones place, renaming when a place cannot pay.",
      pull: "4 ones cannot take 8 — the ten must trade before the ones column closes.",
      rail: {
        launch: "Predict what the ones column needs before the trade.",
        monitor: ["Starting at the ones", "Renaming one ten as ten ones", "Subtracting 14 − 8"],
        connect: "Why can the ones column not close at 4 − 8?",
        misconception: "Answering 8 − 4 in the ones column because subtraction 'works both ways' — it does not."
      }
    },
    {
      phase: "monitor",
      title: "Omar shows <em>the trade</em> two ways",
      lead: "He can show the ones column before and after the trade. The class picks the moment before the rename appears.",
      goal: "See the rename: three tens and four ones is the same amount as two tens and fourteen ones.",
      pull: "A crossed-out digit is renamed, not reduced — the amount never moves.",
      rail: {
        launch: "Ask what the whole number is worth before and after the trade.",
        monitor: ["Comparing 3 tens 4 ones to 2 tens 14 ones", "Naming the amount unchanged", "Subtracting 14 − 8 = 6"],
        connect: "What did the trade give the ones column, and what did it cost the tens?",
        misconception: "Thinking the trade made the number smaller."
      }
    },
    {
      phase: "monitor",
      title: "The report needs <em>an add-back check</em>",
      lead: "Four lines of the reserve report are mixed up. The class files each as an add-back check or part of the story before the folio signs.",
      goal: "Verify a difference by adding the remainder back to the spend.",
      pull: "266 + 268 = 534 — the reserve is exactly what it was.",
      rail: {
        launch: "Do not grade until the class commits to all four lines.",
        monitor: ["Naming 266 + 268 = 534 as the check", "Rejecting 268 − 266", "Naming the estimate"],
        connect: "Which line would the auditor ask for first?",
        misconception: "Reporting the remainder with no way to re-run it."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em> to the remainder",
      lead: "The boys step back. Real student methods for subtracting take the board.",
      goal: "Compare methods and name a reusable one in the Sijill.",
      pull: "One method trades and subtracts; one adds back to prove it.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both reach 266", "Comparing the trade to the add-back", "Explaining which they trust and why"],
        connect: "When is the add-back check the faster path?",
        misconception: "Believing the trade is the whole method, with no check beside it."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Subtract by place from the right. Rename when a place cannot pay. Add the remainder back to prove it.",
      goal: "Build the subtraction rule publicly from the methods compared.",
      pull: "The reserve is reported when the add-back closes the jar.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Showing the rename", "Running the add-back"],
        connect: "Which part of the report proves the subtraction, not just the answer?",
        misconception: "Treating the equals sign as 'the answer is coming' instead of same value."
      }
    },
    {
      phase: "swyk",
      title: "Zayd reports only a remainder he can <em>close</em>",
      lead: "A second reserve: 725 items in, 348 spent. Report the remainder — and be ready to add it back.",
      goal: "Subtract independently and verify by adding back.",
      pull: "A closed add-back signs the second reserve report.",
      rail: {
        launch: "Two minutes. Require the add-back, not only the difference.",
        monitor: ["Renaming in the ones column", "Subtracting 15 − 8", "Checking 377 + 348 = 725"],
        connect: "Which column needed the rename, and what did it trade?",
        misconception: "A remainder that does not add back to the starting total."
      }
    },
    {
      phase: "connect",
      title: "The reserve is reported <em>and closed</em>",
      lead: "Both reserve reports are filed: remainders with add-backs that close the jar. Then the warehouse expansion plan arrives — the reserve and the spend now stretch across more places.",
      goal: "Close on one action: subtract a real pair and add the difference back.",
      pull: "Tomorrow: the same rule, six places long.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Writing remainders with add-backs", "Trusting the rename", "Ready for bigger columns"],
        connect: "Where do you 'add it back' to check in real life?",
        misconception: "Remembering the reserve jar but not the rename-and-check rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [traded, setTraded] = useState(false);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The jar must be reported honestly"
            text="The lantern opens the ledger on the reserve: 534 items were in the jar, and the council has approved spending 268. What remains must be reported — and the report must prove itself."
            clue="Subtraction is what is left — and the proof is the add-back">
            <NoticeWonder draw={drawStock} height={256} award={award}
              notices={["534 was in the reserve", "268 went out the door", "The remainder is not written", "The report needs proof"]}
              wonders={["How much is left?", "How would the report prove it?", "What if a column cannot pay?"]}
              footnote="The story opens the jar. The subtraction is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="zayd" pose="question"
            title="Zayd nets the remainder before the columns"
            text="Zayd rounds both figures — 530 and 270 — and locks the estimate. The exact remainder will be checked against it, like every total before it."
            clue="530 − 270 = 260">
            <LaunchEstimate draw={drawStock} height={256} award={award}
              label="About how many are left? (534 − 268)"
              min={100} max={400} start={260} unit="items"
              after="Locked. Keep 260 in view — the exact remainder will be checked against it."
              note="The remainder is reported to the council — figures are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd steps through the subtraction columns"
            text="He can step the subtraction place by place. The class chooses the place before the rename happens — the ones column cannot close at 4 − 8."
            clue="4 ones cannot take 8 — a ten must trade">
            <ExploreChips draw={makeColumnSub(step)} height={252}
              label="Step through the columns of 534 − 268"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "set it up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }]}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="A crossed-out digit is renamed, not reduced." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar shows the trade before and after"
            text="He can show the ones column both ways. The class picks the moment before the rename appears — the amount never moves."
            clue="Three tens and four ones = two tens and fourteen ones">
            <ExploreChips draw={makeTrade(traded)} height={252}
              label="When does the ones column get its ten?"
              value={traded ? 1 : 0}
              onPick={(v) => setTraded(v === 1)}
              chips={[{ v: 0, label: "before the trade" }, { v: 1, label: "after the trade" }]}
              caption={<MathEl omml={traded ? M.traded : M.regroup} size="lg" display="block" />}
              footnote="The trade gives the ones column ten more — the whole number is unchanged." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The reserve report is mixed up"
            text="Omar reads each line while Zayd files it. The class commits every line to an add-back check or part of the story before the folio signs."
            clue="The add-back closes the jar: remainder + spend = reserve">
            <CardSort award={award} columns={2} commitLabel="File the four lines"
              items={[
                { id: "s1", text: "266 + 268 = 534", target: "t1" },
                { id: "s2", text: "268 − 266 = 2", target: "t2" },
                { id: "s3", text: "530 − 270 = 260", target: "t2" },
                { id: "s4", text: "The remainder is 266", target: "t2" }
              ]}
              targets={[
                { id: "t1", label: "Add-back check" },
                { id: "t2", label: "Part of the story" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest subtracting methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One method trades and subtracts; one adds back to prove it">
          <CompareConnect award={award}
            left={{ name: "Aya's way — trade, then subtract", omml: M.traded, h: 92,
                    quote: "I rename one ten as ten ones, and the ones column can finally pay." }}
            right={{ name: "Musa's way — add it back", omml: M.check, h: 92,
                     quote: "266 + 268 = 534 — if the jar closes, the subtraction is true." }}
            same={["Both reach 266", "Both start at the ones place", "Both trust the rename, not the look"]}
            diff={["Aya's shows the trade", "Musa's shows the proof", "Aya builds the answer, Musa verifies it"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Subtract by place · rename when it cannot pay · add it back">
            <BoardScreen draw={drawBoard25} height={380}
              caption="The reserve is reported when the add-back closes the jar." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Zayd reports only a remainder he can close"
            text="A second reserve: 725 items in, 348 spent. Report the remainder — and be ready to add it back to the spend."
            clue="15 − 8 in the ones, after the rename">
            <ShowWhatYouKnow award={award}
              prompt="Subtract 725 − 348."
              omml={M.swyk}
              options={[{ v: "a", text: "377" }, { v: "b", text: "387" }, { v: "c", text: "375" }, { v: "d", text: "477" }]}
              right="a"
              support={{
                yes: "Yes — and 377 + 348 = 725 closes the jar exactly.",
                notYet: "Not yet — rename in the ones column, subtract, then add the remainder back.",
                draw: drawSupport25, h: 84,
                hint: "Which column needed the rename?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The reserve is reported and closed"
            text="Both reserve reports are filed, each with the add-back that closes its jar. Then the warehouse expansion plan lands on the desk — the reserve and the spend now stretch across six places."
            artifact="Souq ledger · reserve reports (differences + add-backs)"
            next="The warehouse expansion plan arrives — the same rule, six places long.">
            <Closing game={game} omml={M.check}
              action="Tonight: subtract a real pair, and add the difference back to prove it." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
