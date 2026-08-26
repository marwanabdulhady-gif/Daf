const LESSON = {
  code: "2-3",
  storageKey: "daf-g4-t2-l3",
  title: "Add Whole Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-3 · 4.NBT.B.4",
  math: M,
  ixl: ["DWQ", "M8W"],

  metas: [
    {
      phase: "warmup",
      title: "The <em>first market row</em>",
      lead: "Receipts from the first market row are stacked under the awning. Every one of them must land in the ledger.",
      goal: "An invitation — a row of small totals becomes one exact total.",
      pull: "The receipts will not add themselves. The columns will.",
      rail: {
        launch: "Fictional frame. Ask only: what must be combined, and why exactly?",
        monitor: ["Noticing the row of receipts", "Wonding how many items in total", "Noticing the estimate from 2-2 is still in the ledger"],
        connect: "How does the exact total check the estimate from yesterday?",
        misconception: "Adding receipts left to right in any order without aligning places."
      }
    },
    {
      phase: "launch",
      title: "The row must total <em>exactly</em>",
      lead: "268 + 154 items from the first row. Lock your estimate first — the exact total will be checked against it.",
      goal: "Estimate, then add exactly, with the estimate as a safety net.",
      pull: "An estimate is not a guess. It is your safety net.",
      rail: {
        launch: "State that the row quantities are simulated planning data.",
        monitor: ["Estimating before the columns", "Keeping the estimate visible", "Preparing to compare"],
        connect: "What would a wrong total look like next to your estimate?",
        misconception: "Skipping the estimate because the exact sum is 'easy enough'."
      }
    },
    {
      phase: "monitor",
      title: "Zayd steps through the <em>columns</em>",
      lead: "He can step the column addition one place at a time — the class chooses the place before the carry travels.",
      goal: "Add by columns from the ones place, carrying as the total exceeds nine.",
      pull: "The carry travels left. The estimate waits to check.",
      rail: {
        launch: "Predict the column total before revealing it.",
        monitor: ["Starting at the ones", "Trading ten ones for a ten", "Writing the carry"],
        connect: "Why must the carry travel left?",
        misconception: "Regrouping the ones but forgetting to adjust the tens column."
      }
    },
    {
      phase: "monitor",
      title: "Omar rebuilds the total <em>by place</em>",
      lead: "He writes the same sum as place-value parts — the expanded form is the check beside the total.",
      goal: "Use expanded form to verify the column total, place by place.",
      pull: "The check beside the total is what makes the ledger trustworthy.",
      rail: {
        launch: "Ask which place reveals the second carry before it appears.",
        monitor: ["Adding 200 + 100, 60 + 50, 8 + 4", "Trading within the tens", "Comparing to the column total"],
        connect: "Which form shows why the tens column became 12?",
        misconception: "Writing 268 + 154 as 2 + 6 + 8 + 1 + 5 + 4."
      }
    },
    {
      phase: "monitor",
      title: "The row's record needs <em>regroups and checks</em>",
      lead: "Four lines of the row's working are mixed up. The class sorts each into regrouping or checking before the folio commits.",
      goal: "Separate the regrouping decisions from the verification steps in a record.",
      pull: "A ledger line is trusted when both its regroups and its check are visible.",
      rail: {
        launch: "Do not grade until the class commits to all four lines.",
        monitor: ["Naming 8 + 4 = 12 as a regroup", "Naming 1 + 6 + 5 = 12 tens as a regroup", "Naming 270 + 150 = 420 as a check"],
        connect: "Which line could the ledger live without?",
        misconception: "Writing the total with no visible regroup or check beside it."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em> to the same total",
      lead: "The boys step back. Real student methods for adding the row take the board.",
      goal: "Compare methods and name a reusable one in the Sijill.",
      pull: "Noor shows why. Kareem is faster. Both get 422.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both reach 422", "Comparing the visible carry to the expanded parts", "Explaining which they trust and why"],
        connect: "When is the slower method the safer one?",
        misconception: "Believing only the column method is the real addition."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Add by place from the right; trade when a column passes nine; write the check beside the total.",
      goal: "Build the addition rule publicly from the methods compared.",
      pull: "The check beside the total is what the council signs.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Placing the check", "Comparing to the estimate"],
        connect: "Which part of the record would the auditor ask for first?",
        misconception: "Treating the equals sign as 'the answer is coming' instead of same value."
      }
    },
    {
      phase: "swyk",
      title: "Omar seals only a row he can <em>re-check</em>",
      lead: "A second row arrives: 376 + 248. Total it, and be ready to show the regroup that decides it.",
      goal: "Add exactly with visible regroups, independently.",
      pull: "A re-checkable total seals the first market row of the ledger.",
      rail: {
        launch: "Two minutes. Require the regroup, not only the total.",
        monitor: ["Adding 6 + 8 = 14", "Writing the carry", "Checking 6 + 4 + 1 = 11"],
        connect: "Which column produced the second carry?",
        misconception: "Carrying the 1 but adding it twice — or not at all."
      }
    },
    {
      phase: "connect",
      title: "The first market row is <em>in the ledger</em>",
      lead: "The row is totalled, checked and filed. Then a second bundle arrives under the awning — city-sized, and bigger than the old columns were designed for.",
      goal: "Close on one action: add a real pair and write the check beside it.",
      pull: "Tomorrow: the columns must grow without losing a place.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Writing totals with checks", "Comparing to estimates", "Ready for bigger numbers"],
        connect: "Where do you keep a 'check beside the total' in real life?",
        misconception: "Remembering the market row but not the regroup-and-check rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [shown, setShown] = useState(1);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Receipts under the awning"
            text="The lantern shows the first market row's receipts stacked on the merchant's table. Yesterday's estimate is still in the ledger — today the row must be totalled exactly."
            clue="Small totals, one exact total, one check">
            <NoticeWonder draw={drawLibrary} height={256} award={award}
              notices={["Each receipt has its own total", "The row's total is missing", "Yesterday's estimate is still filed", "The columns are aligned"]}
              wonders={["How many items in the whole row?", "Where would a wrong total show up?", "What proves a total is right?"]}
              footnote="The story supplies the row. The addition is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar wants the estimate before the exact"
            text="Omar keeps yesterday's habit alive: the row's estimate is locked first, so the exact total has a safety net to be checked against."
            clue="The estimate is the safety net, not the answer">
            <LaunchEstimate draw={drawLibrary} height={256} award={award}
              label="About how many items in the first row? (268 + 154)"
              min={300} max={600} start={420} unit="items"
              after="Locked. Keep that number — you will check the exact total against it."
              note="An estimate is not a guess. It is your safety net. Quantities are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd steps through the columns"
            text="He can step the addition one place at a time. The class chooses the place before the carry travels."
            clue="The carry travels left">
            <ExploreChips draw={makeColumnAdd(step)} height={252}
              label="Step through the columns of 268 + 154"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "set it up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }]}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="Always start on the right. The carry travels left." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar rebuilds the total by place"
            text="He writes the same sum as place-value parts — the expanded form beside the columns, the check the ledger can re-run."
            clue="The check beside the total is what makes it trustworthy">
            <ExploreChips draw={makeExpandedAdd(shown)} height={252}
              label="Reveal each place of 200+100, 60+50, 8+4"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[{ v: 1, label: "hundreds" }, { v: 2, label: "+ tens" }, { v: 3, label: "+ ones" }]}
              caption={<MathEl omml={M.regroupTens} size="lg" display="block" />}
              footnote="110 tens is more than a hundred — that extra hundred is the second carry." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The row's record is mixed up"
            text="Omar reads each line of the row's working while Zayd sorts it. The class commits every line to regrouping or checking before the folio files it."
            clue="Regroups change the places. Checks re-run the total.">
            <CardSort award={award} columns={2} commitLabel="File the four lines"
              items={[
                { id: "s1", text: "8 + 4 = 12 → 1 ten 2 ones", target: "t1" },
                { id: "s2", text: "1 + 6 + 5 = 12 tens", target: "t1" },
                { id: "s3", text: "270 + 150 = 420", target: "t2" },
                { id: "s4", text: "268 + 154 = 422", target: "t2" }
              ]}
              targets={[
                { id: "t1", label: "Regroup" },
                { id: "t2", label: "Check" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest adding methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="Noor shows why. Kareem is faster.">
          <CompareConnect award={award}
            left={{ name: "Noor's way — expanded by place", omml: M.expanded, h: 92,
                    quote: "I add the hundreds, then the tens, then the ones — and I can see every trade." }}
            right={{ name: "Kareem's way — columns", omml: M.answer, h: 92,
                     quote: "My carry is a small 1, and the total is done before I finish the sentence." }}
            same={["Both get 422", "Both start from the ones", "Both trade ten ones for a ten"]}
            diff={["Noor writes every part", "Kareem's carry is a small 1", "Noor's shows why, Kareem's is faster"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Add by place · trade past nine · write the check">
            <BoardScreen draw={drawBoard23} height={380}
              caption="Add by place, check by place — the ledger signs what it can re-run." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar seals only a row he can re-check"
            text="A second row arrives before the first is filed: 376 + 248. Total it — and be ready to show the regroup that decides it."
            clue="6 + 8 passes nine — the carry must travel">
            <ShowWhatYouKnow award={award}
              prompt="Add 376 + 248."
              omml={M.swyk}
              options={[{ v: "a", text: "514" }, { v: "b", text: "614" }, { v: "c", text: "624" }, { v: "d", text: "5,114" }]}
              right="c"
              support={{
                yes: "Yes — 6 + 8 = 14, carry one; 7 + 4 + 1 = 12, carry one; 3 + 2 + 1 = 6. The total is 624.",
                notYet: "Not yet — start at the ones and follow each carry left.",
                draw: drawSupport23, h: 84,
                hint: "Which column produced the second carry?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The first market row is filed"
            text="Omar files the row: total 422, check beside it, estimate that agreed. Zayd turns as a second bundle drops under the awning — city-sized numbers, and the old columns were not designed for them."
            artifact="Souq ledger · first market row (total + check)"
            next="A second bundle arrives — city-sized, and bigger than the old columns were designed for.">
            <Closing game={game} omml={M.answer}
              action="Tonight: add a real pair of numbers and write the check beside the total, the way the ledger does." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
