const LESSON = {
  code: "2-1",
  storageKey: "daf-g4-t2-l1",
  title: "Finding Sums and Differences with Mental Math",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-1 · 4.NBT.B.4",
  math: M,
  ixl: ["D7B", "D9R", "Q8M"],

  metas: [
    {
      phase: "warmup",
      title: "The merchant who <em>checked before ink dried</em>",
      lead: "Two prices on the souq ledger. The merchant's pen hovers — and the ink is still wet.",
      goal: "An invitation — every student has something to notice before any question.",
      pull: "One of those numbers is almost a friendly number.",
      rail: {
        launch: "Fictional frame. Ask only: what must the merchant check, and before when?",
        monitor: ["Noticing 199 is one short of 200", "Watching the pen wait", "Wonding what 'move one across' means"],
        connect: "Which number sits next to a friendly one?",
        misconception: "Thinking the total changes when an amount is moved across."
      }
    },
    {
      phase: "launch",
      title: "Sixty seconds before <em>the ink dries</em>",
      lead: "199 + 46, in the head, before the ledger line is committed. Lock your checked prediction.",
      goal: "Create the need — some numbers are easier to add than others.",
      pull: "Estimate first, then we will make it friendly.",
      rail: {
        launch: "State that the souq quantities are simulated planning data.",
        monitor: ["Estimating before the model", "Naming what made it easier", "Protecting the total"],
        connect: "What did your brain do before any pencil?",
        misconception: "Treating the souq numbers as current market prices."
      }
    },
    {
      phase: "monitor",
      title: "Zayd moves <em>one across</em>",
      lead: "Take from one part, give to the other. Watch what happens to the total.",
      goal: "Compensation: the total is protected when an amount moves across.",
      pull: "There is another way to make it easy. Let us jump instead.",
      rail: {
        launch: "Predict the new pair before moving the riyals.",
        monitor: ["Moving across", "Checking the total is unchanged", "Naming the strategy compensation"],
        connect: "Why does the total stay the same when one moves across?",
        misconception: "Taking from one part without giving the same amount to the other."
      }
    },
    {
      phase: "monitor",
      title: "Omar labels the <em>working</em> by strategy",
      lead: "Four pieces of the merchant's working, four names behind them. Commit to all four before the folio checks.",
      goal: "Name the strategies so students can choose one on purpose.",
      pull: "Now let us watch two students explain the same problem.",
      rail: {
        launch: "Do not grade until the class commits to all four matches.",
        monitor: ["Naming compensation", "Naming break apart", "Naming association"],
        connect: "Which strategy would you choose for 998 + 75?",
        misconception: "Sorting by the look of the expression rather than the strategy inside it."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em>",
      lead: "The boys step back. Real student strategies for making it easy take the board.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both methods reach the same total", "Preferring one method", "Explaining why both work"],
        connect: "Where do both methods protect the total?",
        misconception: "Treating one strategy as the only real one."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "Draw the two parts. Move one across. The total bar never changes length.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Applying it to a new pair", "Checking the total bar"],
        connect: "Which part of the rule stops the total from changing?",
        misconception: "Memorising 'move one' without knowing the total is protected."
      }
    },
    {
      phase: "swyk",
      title: "Omar stamps only a total he can <em>defend</em>",
      lead: "298 + 57 — the ink is still wet. What is the checked total, and what did you move?",
      goal: "Apply compensation independently to a new pair.",
      pull: "A defended total stamps the first mental-math line of the souq ledger.",
      rail: {
        launch: "Two minutes. Require the compensation, not only the answer.",
        monitor: ["Moving two across", "Making 300", "Checking 300 + 55"],
        connect: "What did you move, and where did it go?",
        misconception: "Answering 355 because it looks right, with no friendly-number reason."
      }
    },
    {
      phase: "connect",
      title: "The mental-math lines are <em>inked</em>",
      lead: "The first ledger lines are checked and committed. Then three sealed bids appear on the council table.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: is my answer even reasonable?",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Explaining compensation", "Using friendly numbers", "Ready to defend estimates"],
        connect: "Where have you 'moved across' to make something easier?",
        misconception: "Remembering the merchant but not the strategy."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [k, setK] = useState(1);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="The page before the ink dries"
            text="The lantern opens the souq ledger on a fresh line. Two prices are down, the merchant's pen is hovering, and the ink is still wet. A mental error now becomes a permanent record."
            clue="One of the two numbers sits one away from a friendly one">
            <NoticeWonder draw={drawCanteen} height={256} award={award}
              notices={["199 is one short of 200", "The pen has not committed", "No total is written yet", "An error would become ink"]}
              wonders={["What makes 199 + 46 hard?", "What sits next to 199?", "Can the total be protected?"]}
              footnote="The story sets the stakes. The mental strategy is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar checks before the record commits"
            text="Omar marks the souq quantities as simulated planning data — then asks for the checked total before any ink dries."
            clue="Lock a prediction before the model appears">
            <LaunchEstimate draw={drawCanteen} height={256} award={award}
              label="Sixty seconds: what is 199 + 46?"
              min={200} max={320} start={240} unit="riyals"
              after="Locked. Now let us see what the merchant's brain did to make it easy."
              note="Souq quantities here are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd builds the move-across frame"
            text="He can move riyals from one part to the other — but the class must predict the new pair before the frame moves."
            clue="Whatever you take, you give — the total does not move">
            <ExploreChips draw={makeCompensate(k)} height={250}
              label="Move riyals from the 46 to the 199"
              value={k}
              onPick={(v) => setK(v)}
              chips={[{ v: 0, label: "move 0" }, { v: 1, label: "move 1" }, { v: 2, label: "move 2" }, { v: 6, label: "move 6" }]}
              caption={<MathEl omml={M.compensated} size="xl" display="block" />}
              footnote="Move one across: 199 + 46 becomes 200 + 45 — the total is protected." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar labels the working by strategy"
            text="The merchant's working keeps its marks; Omar must match each one to the strategy behind it. The class commits to all four before the folio checks."
            clue="Compensation moves across. Break apart hops by place.">
            <CardSort award={award} columns={2} commitLabel="Name the four strategies"
              items={[
                { id: "s1", text: "199 + 46  →  200 + 45", target: "t1" },
                { id: "s2", text: "245 − 99  →  246 − 100", target: "t1" },
                { id: "s3", text: "199 + 40 + 6", target: "t2" },
                { id: "s4", text: "(199 + 1) + 45", target: "t2" }
              ]}
              targets={[
                { id: "t1", label: "Compensation" },
                { id: "t2", label: "Break apart & associate" }
              ]} />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest make-it-easy methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="Two routes, one protected total">
          <CompareConnect award={award}
            left={{ name: "Reem's way — compensate", omml: M.compensated, h: 92,
                    quote: "I take one from the 46 and give it to the 199 — the total does not move." }}
            right={{ name: "Tariq's way — break apart", omml: M.breakApart, h: 92,
                     quote: "I add the 40, then the 6 — place-value jumps, no carrying in my head." }}
            same={["Both reach 245", "Both protect the total", "Both use friendly numbers"]}
            diff={["Reem moves across, Tariq splits", "Reem's works best one-away from round", "Tariq's works for any pair"]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The shared rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Move across — the total never changes length">
            <BoardScreen draw={drawBoard21} height={380}
              caption="Mental math before the ink — check, then commit." />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar stamps only a total he can defend"
            text="A fresh line on the ledger: 298 + 57. Name the checked total — and say what you moved and where."
            clue="Two away from 300">
            <ShowWhatYouKnow award={award}
              prompt="The ink is still wet: 298 + 57. What is the checked total?"
              options={[{ v: "a", text: "355" }, { v: "b", text: "345" }, { v: "c", text: "353" }, { v: "d", text: "365" }]}
              right="a"
              support={{
                yes: "Yes — move two across: 300 + 55 = 355. The total was protected the whole way.",
                notYet: "Not yet — make it friendly. What sits right next to 298?",
                hint: "Move two from the 57 across to the 298: 300 + 55."
              }} />
          </StoryShell>
        );

      case 7:
        return (
          <StoryHandoff
            title="The first lines are inked"
            text="Omar files the checked mental-math lines. Zayd sees three sealed bid cards appear on the council table — the covers come off tomorrow, and each total must be reasonable before it is trusted."
            artifact="Souq ledger · mental-math checked lines"
            next="Three bids under sealed covers — which total is even possible?">
            <Closing game={game} omml={M.swykWork}
              action="Tonight: pick a near-round sum from real life, make it friendly in your head, and say what you moved across." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
