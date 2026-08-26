/* ===========================================================================
   Grade 4 · Topic 2 · LESSON 2-2 · Estimate Sums and Differences
   Standard 4.NBT.B.4     I can ... estimate sums and differences of
   multi-digit numbers, and say whether an answer is reasonable.
   =========================================================================== */

const M = {
  problem: om(mt("4,285+3,671")),
  roundThousand: om(mt("4,000+4,000=8,000")),
  roundHundred: om(mt("4,300+3,700=8,000")),
  exact: om(mt("4,285+3,671=7,956")),
  diffProblem: om(mt("8,142-2,905")),
  diffEstimate: om(mt("8,000-3,000=5,000")),
  swyk: om(mt("5,218+2,874")),
  swykEstimate: om(mt("5,000+3,000=8,000")),
  reasonable: om(mnor("close enough to check the answer"))
};

/* Warm-Up / Launch: a receipt, and the estimate hovering beside it */
const drawReceipt = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 260), p3 = D.at(f, 270, 420);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  ctx.save();
  ctx.globalAlpha = p1 * 0.9;
  D.rr(ctx, W / 2 - 116, 26, 232, H - 74, 10);
  ctx.strokeStyle = "rgba(234,244,242,.4)"; ctx.lineWidth = 1.6; ctx.stroke();
  ctx.restore();
  D.txt(ctx, "book fair", W / 2, 48, { size: 12, col: "#C9A227", font: "marker", alpha: p1 });

  const rows = [["Monday", 4285], ["Tuesday", 3671]];
  rows.forEach((r, n) => {
    const a = D.at(p2, n * 0.4, n * 0.4 + 0.5);
    if (a <= 0) return;
    D.txt(ctx, r[0], W / 2 - 92, 84 + n * 34, { size: 13, col: "rgba(234,244,242,.7)", font: "marker", align: "left", alpha: a });
    D.txt(ctx, r[1].toLocaleString("en-US"), W / 2 + 92, 84 + n * 34,
      { size: 17, col: "#EAF4F2", font: "marker", align: "right", alpha: a });
  });

  if (p3 > 0) {
    D.marker(ctx, [[W / 2 - 96, 136], [W / 2 + 96, 136]], p3, "rgba(234,244,242,.5)", 1.6);
    D.txt(ctx, "about how many books?", W / 2, 168, { size: 14, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "4,000 + 4,000 = 8,000", W / 2, H - 34,
      { size: 19, col: "#34D399", font: "marker", alpha: D.at(f, 360, 450) });
  }
};

/* Monitor A: round both addends on their own line */
const makeRoundBoth = (place) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cfg = place === 1000
    ? [{ v: 4285, lo: 4000, hi: 5000 }, { v: 3671, lo: 3000, hi: 4000 }]
    : [{ v: 4285, lo: 4200, hi: 4300 }, { v: 3671, lo: 3600, hi: 3700 }];
  cfg.forEach((c, n) => {
    D.roundLine(ctx, { x: 62, y: 62 + n * 96, w: W - 124, lo: c.lo, hi: c.hi, value: c.v, prog: 1 });
  });
  const est = place === 1000 ? "4,000 + 4,000 = 8,000" : "4,300 + 3,700 = 8,000";
  D.txt(ctx, est, W / 2, H - 18, { size: 16, col: "#C9A227", font: "marker" });
};

/* Monitor B: how close is the estimate to the exact answer? */
const makeCloseness = (place) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const exact = 7956;
  const est = place === 1000 ? 8000 : place === 100 ? 8000 : 7960;
  const x = 56, w = W - 112, y = H / 2 + 6;
  const lo = 7800, hi = 8100;
  const px = (n) => x + ((n - lo) / (hi - lo)) * w;
  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.7)", 2.2);
  [7800, 7900, 8000, 8100].forEach((n) => {
    ctx.save(); ctx.strokeStyle = "rgba(234,244,242,.4)"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(px(n), y - 7); ctx.lineTo(px(n), y + 7); ctx.stroke(); ctx.restore();
    D.txt(ctx, n.toLocaleString("en-US"), px(n), y + 24, { size: 10.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 500 });
  });
  ctx.save();
  ctx.beginPath(); ctx.arc(px(exact), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#34D399"; ctx.fill(); ctx.restore();
  D.txt(ctx, "exact 7,956", px(exact), y - 26, { size: 12.5, col: "#34D399", font: "marker" });

  ctx.save();
  ctx.beginPath(); ctx.arc(px(est), y, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = "#C9A227"; ctx.fill(); ctx.restore();
  D.txt(ctx, "estimate " + est.toLocaleString("en-US"), px(est), y + 50, { size: 12.5, col: "#C9A227", font: "marker" });

  const gap = Math.abs(est - exact);
  D.txt(ctx, "off by " + gap, W / 2, 34, { size: 15, col: gap <= 20 ? "#34D399" : "#FA7E19", font: "marker" });
  D.txt(ctx, place === 10 ? "rounding to a smaller place gets you closer"
                          : "close enough to check whether an answer makes sense",
    W / 2, H - 14, { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawBoard22 = (ctx, W, H, frame) => {
  const CYCLE = 740, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Is that answer reasonable?" });
  const p1 = D.at(f, 20, 150), p2 = D.at(f, 150, 320), p3 = D.at(f, 320, 480), p4 = D.at(f, 470, 630);

  D.txt(ctx, "4,285 + 3,671", W / 2, 96, { size: 28, col: "#EAF4F2", font: "marker", alpha: p1 });

  if (p2 > 0) {
    D.roundLine(ctx, { x: 84, y: 168, w: W - 168, lo: 4000, hi: 5000, value: 4285, prog: p2 });
  }
  if (p3 > 0) {
    D.roundLine(ctx, { x: 84, y: 268, w: W - 168, lo: 3000, hi: 4000, value: 3671, prog: p3 });
  }
  if (p4 > 0) {
    const yb = H - 42;
    D.marker(ctx, [[70, yb - 28], [W - 70, yb - 28]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "4,000 + 4,000 = 8,000 — so the answer should be near 8,000",
      W / 2, yb - 2, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 510, 590) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 550, 650), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport22 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.roundLine(ctx, { x: 40, y: 32, w: W - 80, lo: 5000, hi: 6000, value: 5218, prog: 1 });
};

const LESSON = {
  code: "2-2",
  storageKey: "daf-g4-t2-l2",
  title: "Estimate Sums and Differences",
  unit: "GRADE 4 · TOPIC 2 · LESSON 2-2 · 4.NBT.B.4",
  math: M,
  ixl: ["DU5", "5TQ", "5F9", "GWS"],

  metas: [
    {
      phase: "warmup",
      title: "Three bids under <em>sealed covers</em>",
      lead: "Three bid cards sit on the council table, faces down. The totals are hidden until the class commits.",
      goal: "An invitation — a reasonable total must be defended, not guessed.",
      pull: "One of those bids may be impossible.",
      rail: {
        launch: "Fictional frame. Ask only: what is being decided, and what is hidden?",
        monitor: ["Noticing the covers are sealed", "Wonding what 'reasonable' means", "Noticing the numbers in the order"],
        connect: "Can a bid be wrong before it is opened?",
        misconception: "Thinking the sealed total will be accepted on authority alone."
      }
    },
    {
      phase: "launch",
      title: "The ledger needs a number <em>by lunchtime</em>",
      lead: "4,285 boxes plus 3,671 boxes. The council cannot wait for the exact sum — lock your reasonable total.",
      goal: "Estimate a sum and be ready to defend the precision.",
      pull: "Round each number first, then add the friendly numbers.",
      rail: {
        launch: "State that the order quantities are simulated planning data.",
        monitor: ["Rounding both addends", "Choosing a place", "Saying why that precision is enough"],
        connect: "What job does the estimate have to do?",
        misconception: "Treating the order quantities as current market figures."
      }
    },
    {
      phase: "monitor",
      title: "Zayd rounds <em>both ends</em>",
      lead: "He can round each addend to a chosen place — the class picks the place before the frame rounds.",
      goal: "Round both addends to the same place, then add the friendly numbers.",
      pull: "Thousands and hundreds both land near 8,000 — but they cost different effort.",
      rail: {
        launch: "Predict the friendly pair before rounding.",
        monitor: ["Rounding 4,285 and 3,671 to the same place", "Adding the friendly numbers", "Comparing the two estimates"],
        connect: "Why do thousands and hundreds both reach about 8,000?",
        misconception: "Rounding only one addend."
      }
    },
    {
      phase: "monitor",
      title: "Omar checks <em>how close is close enough</em>",
      lead: "He lines each estimate against the exact answer. The class chooses the precision before the closeness appears.",
      goal: "Compare estimates with the exact answer and choose precision that fits the job.",
      pull: "Closer costs more effort. Choose the estimate that fits the job.",
      rail: {
        launch: "Ask which estimate the council would sign before revealing closeness.",
        monitor: ["Comparing to the exact 7,956", "Naming the trade-off", "Defending a choice"],
        connect: "Which estimate is 'close enough' for a lunchtime decision?",
        misconception: "Believing the exact answer is always required before deciding."
      }
    },
    {
      phase: "monitor",
      title: "The sealed bids are <em>opened</em>",
      lead: "Three totals, three covers. The class must mark each bid possible or impossible before the folio checks.",
      goal: "Reject an impossible bid using a reasoned estimate.",
      pull: "An estimate strong enough to rule something out is a real tool.",
      rail: {
        launch: "Do not grade until the class commits to all three bids.",
        monitor: ["Comparing each bid to the 8,000 region", "Ruling out 11,956", "Accepting 8,056 as possible"],
        connect: "Which bid needed the least evidence to reject?",
        misconception: "Accepting a bid because it looks tidy."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two ways to estimate</em>",
      lead: "The boys step back. Real student estimating strategies take the board.",
      goal: "Compare strategies and name a reusable one in the Sijill.",
      pull: "One method is faster; one is closer.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Seeing both reach the 8,000 region", "Naming the trade-off", "Explaining when each helps"],
        connect: "When is 'faster' the better estimate?",
        misconception: "Treating one estimating method as the only one."
      }
    },
    {
      phase: "synth",
      title: "The estimate rule is drawn onto the <em>Evidence Board</em>",
      lead: "Round both, add the friendly numbers, and say why the precision is enough.",
      goal: "Build the estimating rule publicly from the strategies compared.",
      pull: "An estimate is a decision with a reason.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Naming the place chosen", "Stating the job the estimate does"],
        connect: "Which part of the rule makes the estimate defensible?",
        misconception: "Rounding with no stated place or reason."
      }
    },
    {
      phase: "swyk",
      title: "Omar signs only an estimate he can <em>defend</em>",
      lead: "A final bid card: 5,218 + 2,874. Round both to the nearest thousand and sign the total.",
      goal: "Estimate independently with a stated place.",
      pull: "A defended estimate stamps the second line of the souq ledger.",
      rail: {
        launch: "Two minutes. Require the rounding, not only the number.",
        monitor: ["Rounding 5,218 and 2,874", "Adding 5,000 + 3,000", "Stating the place"],
        connect: "What place did you choose, and why was it enough?",
        misconception: "Answering 8,100 when the job asks for the nearest thousand."
      }
    },
    {
      phase: "connect",
      title: "The reasonable bid is <em>trusted</em>",
      lead: "The ledger line is estimated, defended and trusted. Then the first market row arrives — and it must be combined exactly, with a check beside the total.",
      goal: "Close on one action: defend a real estimate you make.",
      pull: "Tomorrow: the first market row, combined exactly.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next need.",
        monitor: ["Defending a place choice", "Comparing to the exact when available", "Ready for exact addition"],
        connect: "Where in your week do you need 'close enough' rather than exact?",
        misconception: "Remembering the sealed bids but not the estimate rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [place, setPlace] = useState(1000);
    const [close, setClose] = useState(1000);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Three bids, three sealed covers"
            text="The lantern shows three bid cards on the council table, faces down. The souq order is 4,285 boxes plus 3,671 — but no total is trusted until the class can defend it."
            clue="A bid can be rejected before it is opened">
            <NoticeWonder draw={drawReceipt} height={256} award={award}
              notices={["The covers are sealed", "The order has two quantities", "No total is written", "The council must decide by lunchtime"]}
              wonders={["What makes a bid reasonable?", "How close is close enough?", "Can a bid be impossible?"]}
              footnote="The story seals the stakes. The estimate is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar needs a number by lunchtime"
            text="Omar marks the order quantities as simulated planning data — then asks for a total the council can act on before the exact sum is ready."
            clue="Lock a prediction before the rounding frame appears">
            <LaunchEstimate draw={drawReceipt} height={256} award={award}
              label="About how many boxes in total? (4,285 + 3,671)"
              min={6000} max={10000} start={8000} unit="boxes"
              after="Locked. Now let us see how you would defend that number."
              note="The ledger needs a number by lunchtime, not a perfect one. Quantities are simulated planning data." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd rounds both ends"
            text="He can round each addend to a chosen place. The class picks the place before the frame rounds."
            clue="Round both addends to the same place">
            <ExploreChips draw={makeRoundBoth(place)} height={250}
              label="Round both numbers to the …"
              value={place}
              onPick={(v) => setPlace(v)}
              chips={[{ v: 1000, label: "nearest thousand" }, { v: 100, label: "nearest hundred" }]}
              caption={<MathEl omml={place === 1000 ? M.roundThousand : M.roundHundred} size="xl" display="block" />}
              footnote="Round each addend first, then add the friendly numbers." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar checks how close is close enough"
            text="He lines each estimate against the exact answer. The class chooses the precision before the closeness appears."
            clue="Closer costs more effort">
            <ExploreChips draw={makeCloseness(close)} height={252}
              label="Compare each estimate with the exact answer"
              value={close}
              onPick={(v) => setClose(v)}
              chips={[{ v: 1000, label: "to thousands" }, { v: 100, label: "to hundreds" }, { v: 10, label: "to tens" }]}
              caption={<MathEl omml={M.exact} size="lg" display="block" />}
              footnote="The exact sum is 7,956. Choose the estimate that fits the job." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The sealed bids are opened"
            text="Omar reads each bid while Zayd holds the 8,000 region in view. The class marks each bid possible or impossible before the folio checks."
            clue="One bid cannot be right — the estimate says so">
            <CardSort award={award} columns={2} commitLabel="Judge the three bids"
              items={[
                { id: "s1", text: "Bid A · 7,956", target: "t1" },
                { id: "s2", text: "Bid B · 11,956", target: "t2" },
                { id: "s3", text: "Bid C · 8,056", target: "t1" }
              ]}
              targets={[
                { id: "t1", label: "Possible" },
                { id: "t2", label: "Impossible" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest estimating methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One method is faster; one is closer">
          <CompareConnect award={award}
            left={{ name: "Dana's way — round both up-ish", omml: M.roundThousand, h: 92,
                    quote: "4,000 and 4,000 — fast, and I know my answer is a little big." }}
            right={{ name: "Bilal's way — one up, one down", omml: M.roundHundred, h: 92,
                     quote: "4,300 and 3,700 — the errors cancel and I land closer." }}
            same={["Both land near 8,000", "Both round before adding", "Both are useful for the ledger"]}
            diff={["Dana knows hers is too big", "Bilal's is closer to the exact answer", "Dana's is faster to do in her head"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The estimate rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Round both · add friendly · state the reason">
            <BoardScreen draw={drawBoard22} height={380}
              caption="An estimate is a decision with a reason — not a guess." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar signs only an estimate he can defend"
            text="A final bid card: 5,218 + 2,874. Round both to the nearest thousand and sign the total the ledger will carry."
            clue="5,218 sits near 5,000; 2,874 sits near 3,000">
            <ShowWhatYouKnow award={award}
              prompt="Estimate 5,218 + 2,874 by rounding both to the nearest thousand."
              omml={M.swyk}
              options={[{ v: "a", text: "7,000" }, { v: "b", text: "8,000" }, { v: "c", text: "8,100" }, { v: "d", text: "9,000" }]}
              right="b"
              support={{
                yes: "Yes — 5,000 + 3,000 = 8,000. Both addends were rounded to the nearest thousand first.",
                notYet: "Not yet — round each addend to the nearest thousand, then add the friendly numbers.",
                hint: "Which thousand does 2,874 sit closest to?"
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The reasonable bid is trusted"
            text="Omar signs the defended estimate and files the bid. Zayd turns to the market row just arriving under the awning — its receipts must now be combined exactly, with a check written beside the total."
            artifact="Souq ledger · defended estimate line"
            next="The first market row must be combined exactly — with a check beside the total.">
            <Closing game={game} omml={M.roundThousand}
              action="Tonight: estimate a real total by rounding both parts, and say the place you chose and why it was enough." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
