const LESSON = {
  code: "2-4",
  storageKey: "daf-g4-t2-l4",
  title: "Add Greater Numbers",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-4 · 4.NBT.B.4",
  math: M,
  ixl: ["26W", "X8G", "KTH", "ERL"],

  metas: [
    {
      phase: "warmup",
      title: "A <em>city-sized</em> order",
      lead: "The second bundle has landed under the awning — two days of city orders, and numbers the old columns were not built for.",
      goal: "An invitation — the ledger's columns must grow without losing a place.",
      pull: "142,857 and 96,344 both want the same ledger.",
      rail: {
        launch: "Fictional frame. Ask only: what is different about these numbers, and what must change?",
        monitor: ["Noticing the six places", "Noticing the empty hundred-thousands in 96,344", "Wonding where the carry will travel"],
        connect: "What breaks first when the columns grow?",
        misconception: "Reading 96,344 as if the missing hundred-thousands were a zero that changes the total."
      }
    },
    {
      phase: "launch",
      title: "Omar estimates before the <em>big columns</em> open",
      lead: "142,857 + 96,344. The estimate goes in first — the exact total will be checked against it.",
      goal: "Estimate a six-place sum before computing it.",
      pull: "The estimate is the safety net for the big numbers too.",
      rail: {
        launch: "State that the order quantities are simulated planning data.",
        monitor: ["Rounding to the nearest thousand", "Adding 143,000 + 96,000", "Keeping the estimate visible"],
        connect: "What would a wrong total look like next to 239,000?",
        misconception: "Skipping the estimate because six places 'look exact enough'."
      }
    },
    {
      phase: "monitor",
      title: "Zayd steps through the <em>long columns</em>",
      lead: "He can step the addition place by place through six places — the class chooses the place before each carry travels.",
      goal: "Add greater whole numbers with multi-place carry chains.",
      pull: "7 + 4 = 11, then 1 + 5 + 4 = 10 — the carry chain does not stop early.",
      rail: {
        launch: "Predict the column total before revealing it.",
        monitor: ["Following the carry through the tens", "Handling the 10 in the hundreds", "Writing each carry"],
        connect: "Why did the hundreds column need a second carry?",
        misconception: "Dropping a carry in the middle of the chain."
      }
    },
    {
      phase: "monitor",
      title: "Omar stacks a <em>third number</em>",
      lead: "The warehouse slip adds 6,120 to the same column. He can add a third addend — the class watches what three digits in a column do.",
      goal: "Add three whole numbers, handling a column total that carries 2.",
      pull: "Three digits in a column can carry 2 — not just 1.",
      rail: {
        launch: "Ask which column overflows past one ten before it appears.",
        monitor: ["Adding 12,450 + 8,375 + 6,120", "Carrying 2 from the tens", "Comparing to the running total"],
        connect: "Which column carried 2, and how do you know?",
        misconception: "Carrying only 1 because 'columns only carry one'."
      }
    },
    {
      phase: "monitor",
      title: "The slip's lines need <em>places and carries</em>",
      lead: "Four lines of the warehouse slip are mixed up. The class files each as a place or a carry before the folio commits.",
      goal: "Separate alignment decisions from carry decisions in a record.",
      pull: "Line up the places, not the edges — then follow every carry left.",
      rail: {
        launch: "Do not grade until the class commits to all four lines.",
        monitor: ["Naming the alignment", "Naming 7 + 4 = 11", "Naming 1 + 5 + 4 = 10"],
        connect: "Which mistake would a wrong alignment make first?",
        misconception: "Lining up the left edges and letting the ones land in the tens."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em> to the city total",
      lead: "The boys step back. Real student methods for the big columns take the board.",
      goal: "Compare methods and name a reusable one in the Sijill.",
      pull: "One method estimates first; one follows the carry chain.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both reach 239,201", "Comparing the estimate check to the carry chain", "Explaining which they trust and why"],
        connect: "Which part of the record catches a dropped carry?",
        misconception: "Believing the estimate and the columns must agree exactly."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Line up the places, not the edges. Carry every ten left. Check against the estimate.",
      goal: "Build the greater-addition rule publicly from the methods compared.",
      pull: "The columns can grow; the places do not move.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Placing the empty place in 96,344", "Checking against 239,000"],
        connect: "Which part of the rule protects the empty hundred-thousands?",
        misconception: "Writing a 0 in the empty place and treating it as a digit that was added."
      }
    },
    {
      phase: "swyk",
      title: "Omar signs only a total he can <em>check two ways</em>",
      lead: "A final city slip: 205,368 + 47,915. Total it — and be ready to check it against the estimate.",
      goal: "Add greater numbers independently and verify against the estimate.",
      pull: "A two-way checked total signs the city order.",
      rail: {
        launch: "Two minutes. Require the check, not only the total.",
        monitor: ["Following the carry through the thousands", "Rounding to 205,000 + 48,000", "Comparing 253,283 to 253,000"],
        connect: "How close did the exact total land to the estimate?",
        misconception: "A total that agrees with the estimate but has a dropped carry in the tens."
      }
    },
    {
      phase: "connect",
      title: "The city order is <em>audited</em>",
      lead: "The city total is filed, checked two ways. Then the council approves the spend — and the class must report what remains in the reserve, honestly.",
      goal: "Close on one action: add a big pair and check it against your estimate.",
      pull: "Tomorrow: the council spends — what is left, and how do you prove it?",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Writing totals with two-way checks", "Trusting the estimate as a net", "Ready to subtract"],
        connect: "Where does your city add big numbers and check them?",
        misconception: "Remembering the city order but not the line-up-and-carry rule."
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
            title="Numbers the columns were not built for"
            text="The lantern shows the second bundle: two days of city orders, 142,857 and 96,344. The souq ledger's columns were drawn for three places. These want six."
            clue="The columns must grow — the places do not move">
            <NoticeWonder draw={drawPilgrims} height={256} award={award}
              notices={["Both numbers have six places", "96,344 has nothing in the hundred thousands", "The carry will travel far", "Yesterday's estimate habit is still available"]}
              wonders={["Where does the carry chain end?", "What does an empty place do?", "How big can the total be?"]}
              footnote="The story raises the size. The place-value rule is the same." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar nets the big total before opening the columns"
            text="Omar rounds both orders to the nearest thousand and locks the estimate — the safety net goes in before the long columns do."
            clue="143,000 + 96,000 first">
            <LaunchEstimate draw={drawPilgrims} height={256} award={award}
              label="About how many over the two days? (142,857 + 96,344)"
              min={150000} max={350000} start={240000} unit="items"
              after="Locked. Keep 239,000 in view — the exact total will be checked against it."
              note="The estimate is the safety net for the big numbers too. Quantities are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd follows the carry chain"
            text="He can step the addition through six places. The class chooses the place before each carry travels — the chain does not stop early."
            clue="7 + 4 = 11, then 1 + 5 + 4 = 10">
            <ExploreChips draw={makeBigAdd(step)} height={252}
              label="Step through the columns of 142,857 + 96,344"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "set up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }, { v: 4, label: "thousands" }, { v: 5, label: "hundred-thousands" }]}
              caption={<MathEl omml={M.answer} size="lg" display="block" />}
              footnote="The carry chain travels left until a column stays under ten." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar stacks a third slip into the column"
            text="The warehouse slip adds 6,120 to the same stack. He can add a third addend — the class watches what three digits in a column do."
            clue="Three digits in a column can carry 2">
            <ExploreChips draw={makeThreeAddends(shown)} height={252}
              label="Add the warehouse slip to the stack"
              value={shown}
              onPick={(v) => setShown(v)}
              chips={[{ v: 1, label: "one number" }, { v: 2, label: "two" }, { v: 3, label: "three" }]}
              caption={<MathEl omml={M.three} size="lg" display="block" />}
              footnote="12,450 + 8,375 + 6,120 = 26,945 — the tens column carried 2." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The warehouse slip's lines are mixed up"
            text="Omar reads each line while Zayd files it. The class commits every line to a place or a carry before the folio signs."
            clue="Places come first. Carries follow the places.">
            <CardSort award={award} columns={2} commitLabel="File the four lines"
              items={[
                { id: "s1", text: "Line up the ones under the ones", target: "t1" },
                { id: "s2", text: "96,344 keeps an empty hundred-thousands", target: "t1" },
                { id: "s3", text: "7 + 4 = 11 → carry 1", target: "t2" },
                { id: "s4", text: "1 + 5 + 4 = 10 → carry 1", target: "t2" }
              ]}
              targets={[
                { id: "t1", label: "Place" },
                { id: "t2", label: "Carry" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest big-number methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One method estimates first; one follows the carry chain">
          <CompareConnect award={award}
            left={{ name: "Lina's way — estimate, then columns", omml: M.estimate, h: 92,
                    quote: "239,000 first — then the columns must land within a few hundred of it." }}
            right={{ name: "Omar's way — the carry chain", omml: M.carryChain, h: 92,
                     quote: "I follow each carry left until a column stays under ten." }}
            same={["Both reach 239,201", "Both line up the places, not the edges", "Both trust place value, not the look of the number"]}
            diff={["Lina's estimate catches a dropped carry", "Omar's chain shows where each ten went", "Lina's is the check; Omar's is the build"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Line up the places · carry every ten · check the estimate">
            <BoardScreen draw={drawBoard24} height={380}
              caption="The columns can grow; the places do not move." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a total checked two ways"
            text="A final city slip: 205,368 + 47,915. Total it — then check the total against the estimate you would lock."
            clue="205,000 + 48,000 is the net">
            <ShowWhatYouKnow award={award}
              prompt="Add 205,368 + 47,915."
              omml={M.swyk}
              options={[{ v: "a", text: "253,283" }, { v: "b", text: "252,283" }, { v: "c", text: "253,183" }, { v: "d", text: "263,283" }]}
              right="a"
              support={{
                yes: "Yes — and the estimate 205,000 + 48,000 = 253,000 lands right next to it. Two ways, one total.",
                notYet: "Not yet — line up the places and follow every carry left, then check the estimate.",
                draw: drawSupport24, h: 84,
                hint: "Which column carried into the hundred-thousands?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The city order is audited"
            text="Omar files the city total, checked two ways. The council approves the spend — and the reserve must now be reported honestly: what is left, and how do you prove it?"
            artifact="Souq ledger · audited city order (two-way check)"
            next="The council spends — what remains in the reserve, and how do you prove the difference?">
            <Closing game={game} omml={M.lineUp}
              action="Tonight: add two big numbers, line up the places, and check the total against your estimate." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
