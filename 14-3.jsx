/* ===========================================================================
   Grade 4 · Topic 14 · LESSON 14-3 · Patterns: Repeating Shapes
   Standard 4.OA.C.5   I can ... find the core of a repeating pattern and use
   division to say what the hundredth shape will be.
   =========================================================================== */

const M = {
  core: om(mnor("the core is star, moon, moon \u2014 three shapes long")),
  position: om(mnor("shape 12 \u00f7 3 = 4 with nothing left over")),
  remainder: om(mnor("the remainder tells you where in the core you land")),
  worked: om(mt("20\u00f73=6"), mnor(" r 2 \u2014 so the second shape of the core")),
  wrongWay: om(mnor("drawing all twenty is slow and easy to get wrong")),
  bigOne: om(mt("100\u00f73=33"), mnor(" r 1 \u2014 a star")),
  rule: om(mnor("divide the position by the core length \u00b7 read the remainder")),
  swyk: om(mnor("core of 4 \u00b7 what is shape 27?")),
  swykAnswer: om(mt("27\u00f74=6"), mnor(" r 3"))
};

/* draw the eight-point star, a crescent and a square as pattern shapes */
const shape143 = (ctx, kind, cx, cy, r, col, a) => {
  ctx.save();
  ctx.globalAlpha = a;
  if (kind === 0) {
    D.star8(ctx, cx, cy, r, 1, col, 2);
  } else if (kind === 1) {
    /* a real crescent: the outer circle minus an offset inner one, built as a
       single path so it never has to punch a hole in the background */
    const R = r * 0.88, d = R * 0.42, ri = R * 0.86;
    const t1 = Math.acos((d * d + R * R - ri * ri) / (2 * d * R));
    const px = (d * d + R * R - ri * ri) / (2 * d);
    const py = Math.sqrt(Math.max(0, R * R - px * px));
    const t2 = Math.atan2(py, px - d);
    ctx.beginPath();
    ctx.arc(cx, cy, R, t1, Math.PI * 2 - t1, false);
    ctx.arc(cx + d, cy, ri, Math.PI * 2 - t2, t2, true);
    ctx.closePath();
    ctx.fillStyle = col;
    ctx.globalAlpha = a * 0.75;
    ctx.fill();
    ctx.globalAlpha = a;
    ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.stroke();
  } else {
    D.rr(ctx, cx - r * 0.72, cy - r * 0.72, r * 1.44, r * 1.44, 4);
    ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.stroke();
  }
  ctx.restore();
};

const CORE143 = [0, 1, 1];                     /* star, moon, moon */
const COLS143 = ["#C9A227", "#2D70B3", "#2D70B3"];

/* the strip of shapes, with the core boxed */
const makeStrip143 = (mode) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const n = 12, sw = (W - 80) / n, y = 130;

  for (let k = 0; k < n; k++) {
    const kind = CORE143[k % 3];
    const a = Math.min(1, Math.max(0, (frame / 4 - k * 4) / 12)) * 0.35 + 0.65;
    const inCore = mode !== "plain" && k < 3;
    shape143(ctx, kind, 40 + k * sw + sw / 2, y, Math.min(17, sw * 0.34),
      inCore ? COLS143[k % 3] : (mode === "plain" ? COLS143[k % 3] : "rgba(160,190,200,.55)"), a);
    D.txt(ctx, String(k + 1), 40 + k * sw + sw / 2, y + 36,
      { size: 10.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 600, alpha: a });
  }

  if (mode !== "plain") {
    const pulse = 0.5 + Math.sin(frame / 15) * 0.28;
    ctx.save();
    ctx.globalAlpha = pulse + 0.4;
    D.rr(ctx, 40 + 2, y - 30, sw * 3 - 4, 60, 9);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "the core \u2014 three shapes", 40 + sw * 1.5, y - 42,
      { size: 12, col: "#C9A227", font: "marker" });
  }
  if (mode === "count") {
    /* ring shape 12 */
    ctx.save();
    ctx.globalAlpha = 0.5 + Math.sin(frame / 12) * 0.3;
    ctx.beginPath();
    ctx.arc(40 + 11 * sw + sw / 2, y, Math.min(24, sw * 0.48), 0, Math.PI * 2);
    ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "12 \u00f7 3 = 4, nothing left over \u2014 the last shape of the core",
      W / 2, H - 32, { size: 14, col: "#34D399", font: "marker" });
    D.txt(ctx, "so shape 12 is a moon", W / 2, H - 10,
      { size: 12.5, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, mode === "plain" ? "star, moon, moon, star, moon, moon ..."
         : "the whole strip is that core, over and over",
      W / 2, H - 14, { size: 13, col: "rgba(234,244,242,.7)", font: "marker" });
  }
};

/* the division method for a far position */
const makeFar143 = (pos) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const q = Math.floor(pos / 3), r = pos % 3;
  const idx = r === 0 ? 2 : r - 1;

  D.txt(ctx, "which shape is number " + pos + "?", W / 2, 30,
    { size: 15, col: "#C9A227", font: "marker" });
  D.txt(ctx, pos + " \u00f7 3 = " + q + (r ? " r " + r : " exactly"), W / 2, 74,
    { size: 26, col: "#2D70B3", font: "marker" });
  D.txt(ctx, r === 0 ? "no remainder \u2014 you land on the last shape of the core"
       : "remainder " + r + " \u2014 you land on shape " + r + " of the core",
    W / 2, 106, { size: 12.5, col: "rgba(234,244,242,.68)", font: "marker" });

  /* the core, with the landing shape ringed */
  const sw = 74, x0 = W / 2 - sw * 1.5;
  for (let k = 0; k < 3; k++) {
    const on = k === idx;
    shape143(ctx, CORE143[k], x0 + k * sw + sw / 2, 158, 20,
      on ? "#34D399" : "rgba(160,190,200,.5)", 1);
    D.txt(ctx, String(k + 1), x0 + k * sw + sw / 2, 190,
      { size: 10.5, col: "rgba(234,244,242,.45)", font: "mono", weight: 600 });
    if (on) {
      ctx.save();
      ctx.globalAlpha = 0.5 + Math.sin(frame / 13) * 0.3;
      ctx.beginPath();
      ctx.arc(x0 + k * sw + sw / 2, 158, 28, 0, Math.PI * 2);
      ctx.strokeStyle = "#34D399"; ctx.lineWidth = 2.4; ctx.stroke();
      ctx.restore();
    }
  }
  D.txt(ctx, "shape " + pos + " is a " + (CORE143[idx] === 0 ? "star" : "moon"),
    W / 2, H - 14, { size: 14, col: "#34D399", font: "marker" });
};

const drawWarm143 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const n = 12, sw = (W - 80) / n;
  for (let k = 0; k < n; k++) {
    const a = D.at(f, 20 + k * 34, 110 + k * 34);
    if (a <= 0) continue;
    shape143(ctx, CORE143[k % 3], 40 + k * sw + sw / 2, H / 2 + 6,
      Math.min(18, sw * 0.36), COLS143[k % 3], a);
  }
  D.txt(ctx, "a strip of shapes, left to right", W / 2, 28,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 14,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 460, 550) });
};

const drawStory143 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the tile border around the school courtyard", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const n = 14, sw = (W - 70) / n;
  for (let k = 0; k < n; k++) {
    const a = D.at(f, 50 + k * 24, 130 + k * 24);
    if (a <= 0) continue;
    shape143(ctx, CORE143[k % 3], 35 + k * sw + sw / 2, H / 2 - 4,
      Math.min(16, sw * 0.36), COLS143[k % 3], a);
  }
  if (p3 > 0) {
    D.txt(ctx, "the border has a hundred tiles. what is tile number 100?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard143 = (ctx, W, H, frame) => {
  const CYCLE = 960, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Find the core, then divide" });
  const p2 = D.at(f, 320, 520), p3 = D.at(f, 540, 740), p4 = D.at(f, 760, 940);
  const n = 12, sw = (W - 300) / n, x0 = 150;

  for (let k = 0; k < n; k++) {
    const a = D.at(f, 20 + k * 22, 110 + k * 22);
    if (a <= 0) continue;
    shape143(ctx, CORE143[k % 3], x0 + k * sw + sw / 2, 128, 16, COLS143[k % 3], a);
  }
  if (p2 > 0) {
    ctx.save();
    ctx.globalAlpha = p2;
    D.rr(ctx, x0 + 2, 100, sw * 3 - 4, 56, 9);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, "the core is three shapes long", W / 2, 196,
      { size: 16, col: "#C9A227", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "100 \u00f7 3 = 33 remainder 1", W / 2, 250,
      { size: 26, col: "#2D70B3", font: "marker", alpha: p3 });
    D.txt(ctx, "thirty three whole cores, then one more shape",
      W / 2, 282, { size: 14, col: "rgba(234,244,242,.7)", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "tile 100 is a star \u2014 the first shape of the core", W / 2, 330,
      { size: 20, col: "#34D399", font: "marker", alpha: p4 });
    D.txt(ctx, "nobody drew a hundred tiles \u2014 division did the work",
      W / 2, H - 24, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 840, 940) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 880, 955), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport143 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "27 \u00f7 4 = 6 remainder 3", W / 2, 34, { size: 19, col: "#2D70B3", font: "marker" });
  D.txt(ctx, "six whole cores, then three more shapes", W / 2, 66,
    { size: 12, col: "rgba(234,244,242,.7)", font: "marker" });
  D.txt(ctx, "so shape 27 is the third shape of the core", W / 2, H - 8,
    { size: 11.5, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "14-3",
  storageKey: "daf-g4-t14-l3",
  title: "Patterns: Repeating Shapes",
  unit: "GRADE 4 · TOPIC 14 · LESSON 14-3 · 4.OA.C.5",
  math: M,
  ixl: ["AKK", "V68", "KG8", "FNW"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Twelve shapes appear along a strip, left to right. No question yet.",
      goal: "Let the class find the repeat before it is named.",
      pull: "A short piece of this strip keeps coming back.",
      rail: { launch: "Describe the strip. Do not predict anything yet.",
        monitor: ["Reading the shapes aloud", "Spotting the repeat", "Counting how long it is"],
        connect: "How much of the strip do you actually need to see?",
        misconception: "Reading the pattern as star-moon rather than star-moon-moon." } },

    { phase: "launch", title: "The courtyard <em>tile border</em>",
      lead: "The border round the courtyard has a hundred tiles in this pattern. Estimate what tile 100 looks like.",
      goal: "Create the need for a method that skips ninety nine drawings.",
      pull: "Now let us find the core.",
      rail: { launch: "Commit to a shape before you count anything.",
        monitor: ["Guessing from the last visible tile", "Counting in threes", "Asking for a rule"],
        connect: "Could you draw a hundred tiles accurately?",
        misconception: "Assuming tile 100 must be the last shape of a core." } },

    { phase: "monitor", title: "Find the <em>core</em>",
      lead: "The core is the shortest piece that repeats. Box it, then check.",
      goal: "Identify and verify the repeating unit.",
      pull: "Now reach a tile you cannot see.",
      rail: { launch: "How short can the repeating piece be?",
        monitor: ["Boxing three shapes", "Boxing two", "Checking the box repeats"],
        connect: "How do you know the core is three and not six?",
        misconception: "Choosing a core that is two cores long." } },

    { phase: "monitor", title: "Divide to reach <em>any</em> tile",
      lead: "Divide the position by the core length. The remainder tells you where you land.",
      goal: "Division with remainder becomes a pattern tool.",
      pull: "Now judge some predictions.",
      rail: { launch: "Predict the remainder before you tap.",
        monitor: ["Dividing by three", "Reading the remainder", "Handling remainder zero"],
        connect: "What does a remainder of zero mean here?",
        misconception: "Reading remainder 0 as the first shape of the core." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each prediction. No grading until the class commits.",
      goal: "Practise the division method under scrutiny.",
      pull: "Two students predicted the same tile differently.",
      rail: { launch: "For each one, do the division out loud.",
        monitor: ["Doing the division", "Reading the remainder", "Counting on from the last tile"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Using the quotient instead of the remainder." } },

    { phase: "connect", title: "Two ways to reach tile <em>twenty</em>",
      lead: "Salma drew all twenty. Ibrahim divided twenty by three.",
      goal: "Drawing works but does not scale; division does.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one survives tile one thousand.",
        monitor: ["Drawing them all", "Dividing", "Checking they agree"],
        connect: "What is the risk in Salma's method?",
        misconception: "Believing division is guessing." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "A hundred divided by three is thirty three, remainder one. So a star.",
      goal: "The moment the division method is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Box the core with them before dividing anything.",
        monitor: ["Naming the core length", "Doing the division", "Reading the remainder"],
        connect: "Who can say what the remainder tells you?",
        misconception: "Forgetting to say what remainder zero means." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Two steps, and no repeating pattern can surprise you again.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Finding the core length", "Dividing", "Reading the remainder correctly"],
        connect: "What do you do when the remainder is zero?",
        misconception: "Dividing by the number of different shapes rather than the core length." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on the division method.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Divide by the core length first.",
        monitor: ["Dividing 27 by 4", "Reading remainder 3", "Using the quotient"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering with the sixth shape instead of the third." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: using structure to crack a harder pattern problem.",
      rail: { launch: "Three students explain the remainder rule.",
        monitor: ["Divides confidently", "Still draws it out", "Ready for structure"],
        connect: "Who is finding a repeating pattern at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [mode, setMode] = useState("plain");
    const [pos, setPos] = useState(7);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm143} height={256} award={award}
          notices={["Star, moon, moon, over and over", "There are two moons for every star", "The pattern repeats", "There are twelve shapes"]}
          wonders={["What is shape twenty?", "How long is the repeat?", "Could I skip ahead?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory143} height={256} award={award}
          label="Which shape do you think tile 100 is? (1 star, 2 moon)" min={1} max={2} start={1} unit=""
          after="Locked. Now let us find the core and divide."
          note="The pattern repeats, so tile 100 must be one of the core shapes." />;

      case 2:
        return <ExploreChips draw={makeStrip143(mode)} height={256}
          label="Find the repeating core" value={mode}
          onPick={(v) => setMode(v)}
          chips={[{ v: "plain", label: "the strip" }, { v: "core", label: "box the core" },
                  { v: "count", label: "find shape 12" }]}
          caption={<MathEl omml={M.core} size="xl" display="block" />}
          footnote="The core is the shortest piece that, repeated, makes the whole strip." />;

      case 3:
        return <ExploreChips draw={makeFar143(pos)} height={256}
          label="Divide to reach a far tile" value={pos}
          onPick={(v) => setPos(v)}
          chips={[{ v: 7, label: "tile 7" }, { v: 12, label: "tile 12" },
                  { v: 20, label: "tile 20" }, { v: 100, label: "tile 100" }]}
          caption={<MathEl omml={M.remainder} size="lg" display="block" />}
          footnote="Remainder 1 means the first core shape; remainder 0 means the last one." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "c1", text: "tile 20 → 20 ÷ 3 = 6 r 2", target: "yes" },
                  { id: "c2", text: "tile 20 → the 6th shape", target: "no" },
                  { id: "c3", text: "tile 12 → no remainder, last of core", target: "yes" },
                  { id: "c4", text: "tile 12 → first of core", target: "no" }]}
          targets={[{ id: "yes", label: "correct — remainder read properly" },
                    { id: "no", label: "not yet — that is the quotient" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Salma's way — draw them all", omml: M.wrongWay, h: 92,
            quote: "I drew twenty shapes and looked at the last one." }}
          right={{ name: "Ibrahim's way — divide", omml: M.worked, h: 92,
            quote: "Twenty divided by three is six remainder two. Second shape of the core." }}
          same={["Both give a moon", "Both use the core of three", "Both are correct here"]}
          diff={["Salma draws twenty shapes", "Ibrahim does one division", "Only Ibrahim's reaches tile 1,000"]} />;

      case 6:
        return <BoardScreen draw={drawBoard143} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "divide the position by the core length and read the remainder" }]}
          hand={"how long is the core? · divide the position by it · the remainder is your answer"}
          cards={[{ title: "The core we found", omml: M.core, note: "three shapes, repeated" },
                  { title: "Tap for tile one hundred", omml: M.position, revealOmml: M.bigOne, reveal: true,
                    note: "one division instead of a hundred drawings" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="A pattern has a core of 4 shapes. Which shape of the core is number 27?"
          omml={M.swyk}
          options={[{ v: "a", text: "the 6th" }, { v: "b", text: "the 3rd" }, { v: "c", text: "the 4th" }, { v: "d", text: "the 1st" }]}
          right="b"
          support={{ yes: "Yes — 27 ÷ 4 = 6 remainder 3, so the third shape of the core.",
            notYet: "Not yet — six is how many whole cores fit, not where you land.",
            draw: drawSupport143, h: 100, hint: "The remainder tells you the position inside the core." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Find a repeating pattern at home — tiles, a fence, a fabric — and predict its fiftieth item." />;

      default: return null;
    }
  }
};
