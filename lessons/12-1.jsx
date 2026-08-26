/* ===========================================================================
   Grade 4 · Topic 12 · LESSON 12-1 · Fractions and Decimals
   Standard 4.NF.C.6   I can ... write tenths and hundredths as decimals, and
   read a decimal back as a fraction.
   =========================================================================== */

const M = {
  tenth: om(mfrac(1, 10), mnor(" = 0.1")),
  seven: om(mfrac(7, 10), mnor(" = 0.7")),
  hundredth: om(mfrac(1, 100), mnor(" = 0.01")),
  thirtyFive: om(mfrac(35, 100), mnor(" = 0.35")),
  sameThing: om(mfrac(7, 10), mt("="), mfrac(70, 100), mnor(" = 0.70 = 0.7")),
  placeNames: om(mnor("the first place is tenths, the second is hundredths")),
  rule: om(mnor("the denominator names the place \u00b7 the numerator fills it")),
  swyk: om(mfrac(9, 100)),
  swykAnswer: om(mnor("0.09"))
};

/* the grid: tenths or hundredths, shaded and named */
const makeGrid121 = (mode) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(126, H - 108);
  const cy = 40;

  const jobs = {
    one10: { tenths: true, shaded: 10, label: "1/10", sub: "one strip out of ten", dec: "0.1" },
    seven10: { tenths: true, shaded: 70, label: "7/10", sub: "seven strips out of ten", dec: "0.7" },
    one100: { tenths: false, shaded: 1, label: "1/100", sub: "one small square out of a hundred", dec: "0.01" },
    t35: { tenths: false, shaded: 35, label: "35/100", sub: "three whole strips and five more squares", dec: "0.35" }
  };
  const j = jobs[mode];
  D.decGrid(ctx, { x: W / 2 - s - 30, y: cy, s: s, tenths: j.tenths, shaded: j.shaded,
    prog: 1, col: j.tenths ? "#2D70B3" : "#6042A6", label: j.label, sub: j.sub });

  /* the decimal, written large next to the grid */
  const bx = W / 2 + 34;
  D.txt(ctx, j.dec, bx + 60, cy + s / 2 - 6, { size: 46, col: "#C9A227", font: "marker" });
  D.txt(ctx, "read it as \u201c" + (mode === "one10" ? "one tenth" : mode === "seven10" ? "seven tenths"
        : mode === "one100" ? "one hundredth" : "thirty five hundredths") + "\u201d",
    bx + 60, cy + s / 2 + 32, { size: 12, col: "rgba(234,244,242,.7)", font: "marker" });

  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, j.tenths ? "one place after the point \u2014 tenths"
       : "two places after the point \u2014 hundredths",
    W / 2, H - 14, { size: 13.5, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

/* the equivalence: 7/10 and 70/100 shade the same amount */
const makeSame121 = (on) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(124, H - 110);
  D.decGrid(ctx, { x: W / 2 - s - 34, y: 34, s: s, tenths: true, shaded: 70, prog: 1,
    col: "#2D70B3", label: "7/10 = 0.7", sub: "seven strips" });
  ctx.save();
  ctx.globalAlpha = on ? 1 : 0.25;
  D.decGrid(ctx, { x: W / 2 + 34, y: 34, s: s, tenths: false, shaded: 70, prog: 1,
    col: "#388C46", label: on ? "70/100 = 0.70" : "?", sub: on ? "seventy small squares" : "cut each strip into ten" });
  ctx.restore();
  if (on) {
    const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
    D.txt(ctx, "exactly the same amount is shaded", W / 2, H - 30,
      { size: 14.5, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
    D.txt(ctx, "so 0.7 and 0.70 are the same number", W / 2, H - 10,
      { size: 12.5, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, "tap to cut every strip into ten", W / 2, H - 18,
      { size: 13, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

const drawWarm121 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = Math.min(118, H - 106);
  D.decGrid(ctx, { x: W / 2 - s - 30, y: 34, s: s, tenths: true, shaded: 30,
    prog: D.at(f, 20, 260), col: "#6042A6", label: "?" });
  D.decGrid(ctx, { x: W / 2 + 30, y: 34, s: s, tenths: false, shaded: 30,
    prog: D.at(f, 260, 500), col: "#6042A6", label: "?" });
  D.txt(ctx, "two squares, the same amount shaded, cut differently", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 480, 560) });
};

const drawStory121 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 380, 520);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the class mosaic for the school entrance", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const s = Math.min(132, H - 100);
  D.decGrid(ctx, { x: W / 2 - s / 2, y: 44, s: s, tenths: false, shaded: 35,
    prog: D.at(f, 70, 340), col: "#FA7E19", label: null });
  if (p3 > 0) {
    D.txt(ctx, "35 of the 100 tiles are teal. what fraction of the mosaic is that?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard121 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "The denominator names the place" });
  const p1 = D.at(f, 20, 240), p2 = D.at(f, 260, 480), p3 = D.at(f, 500, 700), p4 = D.at(f, 720, 920);
  const s = 118;

  D.decGrid(ctx, { x: W / 2 - s - 40, y: 96, s: s, tenths: true, shaded: 70, prog: p1,
    col: "#2D70B3", label: "7/10", sub: "one place: tenths" });
  if (p2 > 0) {
    D.decGrid(ctx, { x: W / 2 + 40, y: 96, s: s, tenths: false, shaded: 35, prog: p2,
      col: "#6042A6", label: "35/100", sub: "two places: hundredths" });
  }
  if (p3 > 0) {
    D.txt(ctx, "0.7", W / 2 - s / 2 - 40, 268, { size: 30, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "0.35", W / 2 + s / 2 + 40, 268, { size: 30, col: "#C9A227", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "one place after the point is tenths \u00b7 two places is hundredths",
      W / 2, 322, { size: 16, col: "#EAF4F2", font: "marker", alpha: p4 });
    D.txt(ctx, "the decimal point does not separate two numbers \u2014 it marks where the whole ends",
      W / 2, H - 26, { size: 13.5, col: "#C9A227", font: "marker", alpha: D.at(f, 800, 900) });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 850, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport121 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const s = H - 24;
  D.decGrid(ctx, { x: W / 2 - s / 2, y: 12, s: s, tenths: false, shaded: 9, prog: 1,
    col: "#2D70B3", label: null });
  D.txt(ctx, "nine small squares out of a hundred \u2014 nothing fills a whole strip",
    W / 2 + s / 2 + 90, H / 2, { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "12-1",
  storageKey: "daf-g4-t12-l1",
  title: "Fractions and Decimals",
  unit: "GRADE 4 · TOPIC 12 · LESSON 12-1 · 4.NF.C.6",
  math: M,
  ixl: ["TPV", "6P7", "B7E"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two squares with the same amount shaded, cut two different ways. No question yet.",
      goal: "Put equivalence on the table before decimals are named.",
      pull: "The same amount, counted twice.",
      rail: { launch: "Describe both squares. Do not name any numbers yet.",
        monitor: ["Counting the strips", "Counting the small squares", "Saying the shading matches"],
        connect: "Which square would you rather count?",
        misconception: "Believing more pieces means more shaded." } },

    { phase: "launch", title: "The mosaic at the <em>entrance</em>",
      lead: "The class mosaic is a hundred tiles. Thirty five of them are teal. Estimate what fraction that is.",
      goal: "Create the need for a shorter way to write hundredths.",
      pull: "Now let us name the places.",
      rail: { launch: "Roughly what part of the mosaic is teal? Commit first.",
        monitor: ["Estimating about a third", "Counting whole strips", "Saying 35 out of 100"],
        connect: "How would you write that without saying 'out of a hundred'?",
        misconception: "Reading 35/100 as thirty five wholes." } },

    { phase: "monitor", title: "One place, then <em>two</em>",
      lead: "Shade the grid and read the decimal that goes with it.",
      goal: "Tie each decimal place to a physical cut of the square.",
      pull: "But are 0.7 and 0.70 different?",
      rail: { launch: "Predict the decimal before you tap.",
        monitor: ["Naming tenths", "Naming hundredths", "Counting the places after the point"],
        connect: "What decides how many places you need?",
        misconception: "Writing 35/100 as 0.35 but reading it as 'point thirty five'." } },

    { phase: "monitor", title: "Is 0.70 different from <em>0.7</em>?",
      lead: "Cut every strip into ten and count again.",
      goal: "Trailing zeros do not change the amount.",
      pull: "Now sort some pairs.",
      rail: { launch: "Predict what happens to the shading when we cut.",
        monitor: ["Counting 70 squares", "Seeing the shading is unchanged", "Insisting 0.70 is bigger"],
        connect: "Why does the extra zero change nothing?",
        misconception: "Believing 0.70 is ten times 0.7." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each pair. Nothing is graded until the class commits.",
      goal: "Practise moving between fraction and decimal in both directions.",
      pull: "Two students wrote the same amount differently.",
      rail: { launch: "Count the places after the point before anything else.",
        monitor: ["Matching places to denominators", "Checking with a grid", "Misplacing the zero"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Writing 9/100 as 0.9." } },

    { phase: "connect", title: "Two ways to <em>write it</em>",
      lead: "Bashir wrote seven tenths. Ziad wrote seventy hundredths. Both shaded the same square.",
      goal: "Equivalent fractions become equivalent decimals.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which is easier to add to a hundredths number.",
        monitor: ["Converting tenths to hundredths", "Comparing the shading", "Preferring the shorter form"],
        connect: "When would you deliberately write 0.70?",
        misconception: "Thinking one of the two forms is 'more correct'." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Tenths in the first place. Hundredths in the second. The square proves it.",
      goal: "The moment place value for decimals is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw both grids with them before naming any place.",
        monitor: ["Predicting the decimal", "Naming the place", "Restating the rule"],
        connect: "Who can say what the second place counts?",
        misconception: "Reading the digits after the point as a whole number." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence linking every fraction in tenths or hundredths to a decimal.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Naming the place from the denominator", "Filling it with the numerator", "Handling a single digit"],
        connect: "What has to happen when the numerator has only one digit?",
        misconception: "Forgetting the placeholder zero in 9/100." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on the placeholder zero.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. How many places does hundredths need?",
        monitor: ["Using two places", "Writing 0.9", "Sketching a grid to check"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 0.9 because the numerator is 9." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: putting decimals on a number line.",
      rail: { launch: "Three students name a decimal they read today.",
        monitor: ["Converts both ways", "Still needs the grid", "Ready for the number line"],
        connect: "Who is finding decimals on a price label tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [mode, setMode] = useState("one10");
    const [on, setOn] = useState(false);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm121} height={256} award={award}
          notices={["One square is cut into ten strips", "The other is cut into a hundred", "The same amount is shaded", "Three strips equals thirty squares"]}
          wonders={["Are they the same number?", "Which one is easier to write?", "Could I write this without a fraction?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory121} height={256} award={award}
          label="How many of the hundred tiles are teal?" min={5} max={95} start={50} unit="tiles"
          after="Locked. Now let us name the places properly."
          note="The whole mosaic is one hundred tiles, so every tile is one hundredth." />;

      case 2:
        return <ExploreChips draw={makeGrid121(mode)} height={256}
          label="Shade it and read the decimal" value={mode}
          onPick={(v) => setMode(v)}
          chips={[{ v: "one10", label: "1/10" }, { v: "seven10", label: "7/10" },
                  { v: "one100", label: "1/100" }, { v: "t35", label: "35/100" }]}
          caption={<MathEl omml={M.thirtyFive} size="xl" display="block" />}
          footnote="The denominator tells you which place to write in." />;

      case 3:
        return <ExploreChips draw={makeSame121(on)} height={256}
          label="Cut the strips into ten" value={on ? 1 : 0}
          onPick={(v) => setOn(v === 1)}
          chips={[{ v: 0, label: "seven tenths" }, { v: 1, label: "cut into hundredths" }]}
          caption={<MathEl omml={M.sameThing} size="lg" display="block" />}
          footnote="A zero on the end of a decimal adds nothing to the amount." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "a1", text: "7/10 = 0.7", target: "yes" },
                  { id: "a2", text: "9/100 = 0.9", target: "no" },
                  { id: "a3", text: "35/100 = 0.35", target: "yes" },
                  { id: "a4", text: "3/10 = 0.03", target: "no" }]}
          targets={[{ id: "yes", label: "correct — the place matches the denominator" },
                    { id: "no", label: "not yet — count the places" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Bashir's way — tenths", omml: M.seven, h: 92,
            quote: "Seven strips out of ten. One place after the point." }}
          right={{ name: "Ziad's way — hundredths", omml: M.sameThing, h: 92,
            quote: "I cut every strip into ten. Seventy out of a hundred." }}
          same={["Both shade the same amount", "Both are 0.7", "Both are less than one whole"]}
          diff={["Bashir uses tenths", "Ziad uses hundredths", "Ziad's is easier to add to 0.35"]} />;

      case 6:
        return <BoardScreen draw={drawBoard121} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "the denominator names the place, the numerator fills it" }]}
          hand={"tenths → one place · hundredths → two places · pad with a zero if you must"}
          cards={[{ title: "Tenths", omml: M.seven, note: "one place after the point" },
                  { title: "Tap for hundredths", omml: M.placeNames, revealOmml: M.thirtyFive, reveal: true,
                    note: "two places after the point" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="How do you write nine hundredths as a decimal?" omml={M.swyk}
          options={[{ v: "a", text: "0.9" }, { v: "b", text: "0.09" }, { v: "c", text: "9.00" }, { v: "d", text: "0.900" }]}
          right="b"
          support={{ yes: "Yes — hundredths need two places, so the tenths place holds a zero.",
            notYet: "Not yet — nine small squares do not fill a whole strip.",
            draw: drawSupport121, h: 100, hint: "0.9 would be nine whole strips, which is ninety squares." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find three price labels at home and say each one as a fraction of a riyal." />;

      default: return null;
    }
  }
};
