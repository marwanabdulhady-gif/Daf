/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-7 · Subtract Across Zeros
   Standard 4.NBT.B.4   I can ... subtract from a number with zeros by
   regrouping across more than one place.
   =========================================================================== */

const M = {
  problem: om(mt("4,000-1,362")),
  answer: om(mt("4,000-1,362=2,638")),
  rename: om(mt("4,000"), mnor(" is also "), mt("3"), mnor(" thousands "), mt("9"), mnor(" hundreds "), mt("9"), mnor(" tens "), mt("10"), mnor(" ones")),
  chain: om(mnor("keep going left until you find something to trade")),
  estimate: om(mt("4,000-1,400=2,600")),
  check: om(mt("2,638+1,362=4,000")),
  swyk: om(mt("6,000-2,475")),
  swykAnswer: om(mt("6,000-2,475=3,525"))
};

/* Launch: an empty shelf — nothing in the ones, tens or hundreds to take from */
const drawZeros = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 300), p3 = D.at(f, 310, 440);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.pvChart(ctx, { x: 40, y: 34, w: W - 80, digits: "4000", slots: 4, prog: p1, rowH: 32, t: frame });
  if (p2 > 0) {
    ["ones", "tens", "hundreds"].forEach((name, n) => {
      const a = D.at(p2, n * 0.25, n * 0.25 + 0.5);
      if (a <= 0) return;
      const cw = (W - 80) / 4;
      const cx = 40 + (3 - n) * cw + cw / 2;
      D.txt(ctx, "empty", cx, 158, { size: 11, col: "#C74440", font: "marker", alpha: a });
    });
  }
  if (p3 > 0) {
    D.txt(ctx, "we need to take away 1,362", W / 2, 190,
      { size: 15, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "but there is nothing to take from", W / 2, H - 20,
      { size: 14, col: "#C74440", font: "marker", alpha: D.at(f, 380, 460) });
  }
};

/* Monitor A: the borrow chain, one hop at a time */
const makeChain = (hop) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const stages = ["4000", "3(10)00", "39(10)0", "399(10)"];
  const digitSets = [["4", "0", "0", "0"], ["3", "10", "0", "0"], ["3", "9", "10", "0"], ["3", "9", "9", "10"]];
  const labels = [
    "no ones, no tens, no hundreds",
    "take one thousand — it becomes 10 hundreds",
    "take one hundred — it becomes 10 tens",
    "take one ten — it becomes 10 ones"
  ];
  const cw = 74, x0 = W / 2 - 2 * cw;
  const names = ["thousands", "hundreds", "tens", "ones"];
  digitSets[hop].forEach((d, i) => {
    const changed = digitSets[hop][i] !== digitSets[0][i];
    D.txt(ctx, names[i], x0 + i * cw + cw / 2, 46,
      { size: 10, col: "rgba(234,244,242,.45)", font: "mono", weight: 600 });
    ctx.save();
    ctx.globalAlpha = 1;
    D.rr(ctx, x0 + i * cw + 6, 62, cw - 12, 52, 8);
    ctx.strokeStyle = changed ? "#C9A227" : "rgba(234,244,242,.22)";
    ctx.lineWidth = changed ? 2 : 1;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, d, x0 + i * cw + cw / 2, 90,
      { size: 26, col: changed ? "#C9A227" : "#EAF4F2", font: "marker" });
  });
  if (hop > 0) {
    const fromI = hop - 1;
    const ax0 = x0 + fromI * cw + cw / 2, ax1 = x0 + hop * cw + cw / 2;
    const pts = [];
    for (let s = 0; s <= 14; s++) {
      const t = s / 14;
      pts.push([ax0 + (ax1 - ax0) * t, 138 + Math.sin(Math.PI * t) * 20]);
    }
    D.marker(ctx, pts, 1, "#FA7E19", 2.2);
  }
  D.txt(ctx, labels[hop], W / 2, H - 42, { size: 14, col: hop === 3 ? "#34D399" : "#C9A227", font: "marker" });
  if (hop === 3) D.txt(ctx, "still 4,000 — just renamed", W / 2, H - 18,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
};

const makeColumnZeros = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 96, y: 30, w: 192, a: 4000, b: 1362, op: "-", prog: step / 4, t: frame, cw: 44 });
  const notes = ["set it up", "ones: nothing to take from — start the chain",
                 "tens: 9 − 6 = 3", "hundreds: 9 − 3 = 6", "thousands: 3 − 1 = 2"];
  D.txt(ctx, notes[step], W / 2, H - 18, { size: 13.5, col: step === 4 ? "#34D399" : "#C9A227", font: "marker" });
};

const drawBoard27 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "There is nothing next door — now what?" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 230, 400), p3 = D.at(f, 400, 570), p4 = D.at(f, 570, 720);
  D.columnOp(ctx, { x: W / 2 - 180, y: 82, w: 190, a: 4000, b: 1362, op: "-", prog: p1, t: frame, cw: 46 });
  if (p2 > 0) {
    D.txt(ctx, "0 ones cannot take 2", W / 2 + 96, 132, { size: 15, col: "#C74440", font: "marker", alpha: p2 });
    D.txt(ctx, "and the tens are empty too", W / 2 + 96, 158,
      { size: 13.5, col: "#C74440", font: "marker", alpha: D.at(f, 270, 350) });
  }
  if (p3 > 0) {
    D.txt(ctx, "keep going left", W / 2 + 96, 198, { size: 15, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "4,000 = 3 thousands, 9 hundreds,", W / 2 + 96, 226,
      { size: 12.5, col: "rgba(234,244,242,.8)", font: "marker", alpha: D.at(f, 440, 520) });
    D.txt(ctx, "9 tens and 10 ones", W / 2 + 96, 248,
      { size: 12.5, col: "rgba(234,244,242,.8)", font: "marker", alpha: D.at(f, 460, 540) });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "one thousand can be renamed all the way down to ten ones",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 610, 690) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 650, 750), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport27 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.columnOp(ctx, { x: W / 2 - 82, y: -14, w: 164, a: 6000, b: 2475, op: "-", prog: 1, cw: 34 });
};

const LESSON = {
  code: "2-7",
  storageKey: "daf-g4-t2-l7",
  title: "Subtract Across Zeros",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-7 · 4.NBT.B.4",
  math: M,
  ixl: ["LZZ"],

  metas: [
    {
      phase: "warmup",
      title: "The line of <em>silent zeros</em>",
      lead: "A water stain has cracked open the next ledger page. The regrouping marks are gone — and the subtraction waits on a line of silent zeros.",
      goal: "An invitation — 4,000 − 1,362 cannot pay from the ones. Something must trade.",
      pull: "4,000 looks simple. Its zeros are not empty — they are waiting.",
      rail: {
        launch: "Fictional frame. Ask only: what is damaged, and what is the subtraction stuck on?",
        monitor: ["Noticing the zeros in 4,000", "Wonding where the trade must start", "Noticing the ones cannot pay 2"],
        connect: "What can 4,000 be renamed as?",
        misconception: "Treating the zeros as 'nothing' that needs no renaming."
      }
    },
    {
      phase: "launch",
      title: "Omar nets the difference <em>before the chain</em>",
      lead: "4,000 − 1,362. Omar rounds the spend to 1,400 and locks the region the answer must land in.",
      goal: "Estimate across-zeros subtraction before computing it.",
      pull: "4,000 − 1,400 = 2,600 — the remainder lands near there.",
      rail: {
        launch: "State that the ledger figures are simulated planning data.",
        monitor: ["Rounding 1,362 to 1,400", "Subtracting the friendly numbers", "Keeping 2,600 in view"],
        connect: "What would a wrong difference look like next to 2,600?",
        misconception: "Subtracting 4 − 1, 0 − 3, 0 − 6, 0 − 2 digit by digit from the left."
      }
    },
    {
      phase: "monitor",
      title: "Zayd hops left to find <em>something to trade</em>",
      lead: "He can hop the trade left through the zeros — the class chooses the hop before the rename appears.",
      goal: "Chain the rename left through zeros until a place can pay.",
      pull: "Keep going left until you find something to trade.",
      rail: {
        launch: "Ask what each zero is hiding before the hop.",
        monitor: ["Hopping from the tens to the hundreds to the thousands", "Renaming 4 thousands as 3 thousands 10 hundreds", "Following the chain to 10 ones"],
        connect: "Why does the chain stop at the thousands?",
        misconception: "Stopping the rename at the first zero because 'there is nothing there'."
      }
    },
    {
      phase: "monitor",
      title: "Omar steps through the <em>renamed columns</em>",
      lead: "With the row renamed, he can step the subtraction place by place — the class chooses the place before each column closes.",
      goal: "Subtract the renamed row: 9, 9, then 10 in the ones.",
      pull: "9, 9, then 10 — that is what the chain leaves behind.",
      rail: {
        launch: "Predict each column's renamed digit before it closes.",
        monitor: ["Subtracting 10 − 2", "Subtracting 9 − 6", "Carrying the renamed row through to 3 thousands"],
        connect: "Which column shows the whole chain at once?",
        misconception: "Writing 4,000 − 1,362 as 3 thousand, 9 hundred, 9 tens, 10 ones and stopping there."
      }
    },
    {
      phase: "monitor",
      title: "The renamed row must be <em>inked by place</em>",
      lead: "Four renamed values, four places. The class inks each value into its place before the folio commits.",
      goal: "Record the full rename: 3 thousands, 9 hundreds, 9 tens, 10 ones.",
      pull: "Every trade renames the number. The value never moves.",
      rail: {
        launch: "Do not grade until the class inks all four places.",
        monitor: ["Placing 3 in the thousands", "Placing 9 in the hundreds and tens", "Placing 10 in the ones"],
        connect: "How do you know the rename kept the amount?",
        misconception: "Renaming only the ones place and leaving the chain unfinished."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways</em> through the zeros",
      lead: "The boys step back. Real student methods for the across-zeros rename take the board.",
      goal: "Compare methods and name a reusable one in the Sijill.",
      pull: "One renames the whole row at once; one trades place by place.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both reach 2,638", "Comparing the whole-row rename to the hop chain", "Explaining which they trust and why"],
        connect: "When is the whole-row rename the faster path?",
        misconception: "Believing the two methods should give different answers."
      }
    },
    {
      phase: "synth",
      title: "The rule is drawn onto the <em>Evidence Board</em>",
      lead: "When a place cannot pay, hop left until it can. Rename the whole chain. Then subtract — and add it back.",
      goal: "Build the across-zeros rule publicly from the methods compared.",
      pull: "The value never moves. The names change so the subtraction can pay.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Showing the full chain", "Running the add-back 2,638 + 1,362 = 4,000"],
        connect: "Which part of the chain would break first if it stopped early?",
        misconception: "A difference that adds back to 4,000 but came from an unfinished rename."
      }
    },
    {
      phase: "swyk",
      title: "Omar signs only a difference that <em>adds back</em>",
      lead: "A fresh across-zeros slip: 6,000 − 2,475. Report the difference — and be ready to add it back to 6,000.",
      goal: "Subtract across zeros independently and verify by adding back.",
      pull: "A closed add-back signs the across-zeros report.",
      rail: {
        launch: "Two minutes. Require the chain and the add-back, not only the difference.",
        monitor: ["Renaming 6,000 through the chain", "Subtracting 10 − 5 in the ones", "Checking 3,525 + 2,475 = 6,000"],
        connect: "How many places did the chain rename?",
        misconception: "A difference near 3,500 that fails the add-back to 6,000."
      }
    },
    {
      phase: "connect",
      title: "The zeros are crossed — <em>and annotated</em>",
      lead: "The across-zeros page is restored: every trade annotated, the add-back closed. Then the auditor lays a polished solution under the seal — and a polished answer can still hide a faulty step.",
      goal: "Close on one action: subtract across zeros and annotate every trade.",
      pull: "Tomorrow: the auditor's challenge.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Writing the full rename", "Annotating each trade", "Closing the add-back"],
        connect: "Where else have you had to 'hop left' to find something that could pay?",
        misconception: "Remembering the silent zeros but not the hop-and-rename rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [hop, setHop] = useState(0);
    const [step, setStep] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="A subtraction stuck on silent zeros"
            text="The lantern shows the water-damaged page: 4,000 − 1,362, with every regrouping mark washed away. The ones cannot pay 2 — and the zeros between them look empty."
            clue="The zeros are not empty. They are waiting to be renamed.">
            <NoticeWonder draw={drawZeros} height={256} award={award}
              notices={["The ones cannot pay 2", "The tens and hundreds hold zeros", "The thousands holds 4", "The regrouping marks are gone"]}
              wonders={["Where must the trade start?", "What is 4,000 renamed as?", "How far left does the chain run?"]}
              footnote="The story breaks the page. The rename chain is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar nets the difference before the chain"
            text="Omar rounds the spend to 1,400 and locks the region: the answer must land near 2,600, or the columns are wrong."
            clue="4,000 − 1,400 = 2,600">
            <LaunchEstimate draw={drawZeros} height={256} award={award}
              label="About what is 4,000 − 1,362?"
              min={1500} max={4000} start={2600} unit="items"
              after="Locked. Keep 2,600 in view — the exact difference will be checked against it."
              note="Ledger figures are simulated planning data. The region is the safety net." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd hops left through the zeros"
            text="He can hop the trade left through the row — the class chooses each hop before the rename appears. The chain stops where something can pay."
            clue="Keep going left until you find something to trade">
            <ExploreChips draw={makeChain(hop)} height={252}
              label="Where does the trade start?"
              value={hop}
              onPick={(v) => setHop(v)}
              chips={[{ v: 0, label: "stuck" }, { v: 1, label: "trade a thousand" }, { v: 2, label: "trade a hundred" }, { v: 3, label: "trade a ten" }]}
              caption={<MathEl omml={M.rename} size="lg" display="block" />}
              footnote="4,000 is also 3 thousands, 9 hundreds, 9 tens, 10 ones." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar steps through the renamed columns"
            text="With the row renamed, he can step the subtraction place by place. The class chooses the place before each column closes — 9, 9, then 10 in the ones."
            clue="The chain leaves 9, 9, then 10 behind">
            <ExploreChips draw={makeColumnZeros(step)} height={252}
              label="Step through the renamed columns of 4,000 − 1,362"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "set up" }, { v: 1, label: "ones" }, { v: 2, label: "tens" }, { v: 3, label: "hundreds" }, { v: 4, label: "thousands" }]}
              caption={<MathEl omml={M.answer} size="xl" display="block" />}
              footnote="9, 9, then 10 — that is what the chain leaves behind." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The renamed row must be inked by place"
            text="Four renamed values, four places. Omar reads each value while Zayd inks it into its place — the class commits all four before the folio signs."
            clue="3 thousands · 9 hundreds · 9 tens · 10 ones">
            <CardSort award={award} columns={4} commitLabel="Ink the renamed row"
              items={[
                { id: "s1", text: "3", target: "t1" },
                { id: "s2", text: "9", target: "t2" },
                { id: "s3", text: "9", target: "t3" },
                { id: "s4", text: "10", target: "t4" }
              ]}
              targets={[
                { id: "t1", label: "thousands" },
                { id: "t2", label: "hundreds" },
                { id: "t3", label: "tens" },
                { id: "t4", label: "ones" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest across-zeros methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One renames the whole row at once; one trades place by place">
          <CompareConnect award={award}
            left={{ name: "Aya's way — rename the whole row", omml: M.rename, h: 92,
                    quote: "I see 4,000 as 3,990 with 10 ones — the whole chain in one look." }}
            right={{ name: "Musa's way — trade place by place", omml: M.chain, h: 92,
                     quote: "I hop left one place at a time until something can pay." }}
            same={["Both reach 2,638", "Both keep the amount unchanged", "Both close with the add-back"]}
            diff={["Aya's is one big rename", "Musa's shows each hop", "Aya's is faster; Musa's is easier to check"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Hop left · rename the chain · subtract · add it back">
            <BoardScreen draw={drawBoard27} height={380}
              caption="The value never moves. The names change so the subtraction can pay." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only a difference that adds back"
            text="A fresh across-zeros slip: 6,000 − 2,475. Report the difference — and be ready to add it back to 6,000."
            clue="The chain renames three places">
            <ShowWhatYouKnow award={award}
              prompt="Subtract 6,000 − 2,475."
              omml={M.swyk}
              options={[{ v: "a", text: "3,525" }, { v: "b", text: "3,575" }, { v: "c", text: "3,425" }, { v: "d", text: "4,525" }]}
              right="a"
              support={{
                yes: "Yes — and 3,525 + 2,475 = 6,000 closes the page exactly.",
                notYet: "Not yet — rename the chain through the zeros, subtract, then add the difference back.",
                draw: drawSupport27, h: 84,
                hint: "How many places does the chain rename?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The zeros are crossed and annotated"
            text="The across-zeros page is restored: every trade annotated, the add-back closed. Then the auditor lays a polished solution under the seal — and a polished answer can still hide a faulty step."
            artifact="Souq ledger · across-zeros page (annotated trades + add-back)"
            next="The auditor's challenge: a polished solution under the seal — can the class sign it?">
            <Closing game={game} omml={M.check}
              action="Tonight: subtract across the zeros of a real number and annotate every trade you make." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
