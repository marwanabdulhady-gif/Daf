/* ===========================================================================
   Grade 4 · Topic 13 · LESSON 13-1 · Equivalence with Customary Units of
   Length
   Standard 4.MD.A.1   I can ... convert a larger customary length unit into a
   smaller one, and say why the number always gets bigger.
   =========================================================================== */

const M = {
  footInch: om(mnor("1 foot = 12 inches")),
  yardFoot: om(mnor("1 yard = 3 feet")),
  yardInch: om(mnor("1 yard = 36 inches")),
  three: om(mt("3\u00d712=36")),
  bigToSmall: om(mnor("bigger unit \u2192 smaller unit \u00b7 multiply")),
  mileFeet: om(mnor("1 mile = 5,280 feet")),
  rule: om(mnor("multiply by how many small units fit inside one big one")),
  hard: om(mnor("2 yards 1 foot = ? inches")),
  hard: om(mnor("2 yards 1 foot = ? inches")),
  swyk: om(mnor("5 feet = ? inches")),
  swykAnswer: om(mt("5\u00d712=60"))
};

/* the equivalence bar: one big unit over n small ones */
const makeBar131 = (pair) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const pairs = {
    ft: { n: 12, big: "foot", small: "inch", copies: 1, note: "a ruler is exactly one foot long" },
    yd: { n: 3, big: "yard", small: "foot", copies: 1, note: "a long stride is about one yard" },
    yd3: { n: 36, big: "yard", small: "inch", copies: 1, note: "three feet, each of twelve inches" },
    two: { n: 12, big: "foot", small: "inch", copies: 2, note: "two feet is two lots of twelve" }
  };
  const j = pairs[pair];
  D.txt(ctx, j.note, W / 2, 26, { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });
  D.unitBar(ctx, { x: 62, y: 60, w: W - 124, h: 36, n: j.n, big: j.big, small: j.small,
    copies: j.copies, prog: 1, bigCol: "#2D70B3", smallCol: "#FA7E19" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, "the length never changed \u2014 only the unit you count in",
    W / 2, H - 14, { size: 13, col: "#34D399", font: "marker", alpha: pulse + 0.4 });
};

/* the conversion table, filled a row at a time */
const makeTable131 = (rows) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const all = [["1", "12"], ["2", "24"], ["3", "36"], ["4", "48"], ["5", "60"]];
  D.table(ctx, { x: 92, y: 42, w: W - 184, rh: 30, head: ["feet", "inches"],
    rows: all.slice(0, rows), prog: 1 });
  if (rows >= 3) {
    const pulse = 0.5 + Math.sin(frame / 14) * 0.28;
    D.txt(ctx, "every extra foot adds another twelve", W / 2, H - 34,
      { size: 14, col: "#C9A227", font: "marker", alpha: pulse + 0.4 });
    D.txt(ctx, "so feet \u00d7 12 = inches", W / 2, H - 12,
      { size: 13, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, "watch the right-hand column", W / 2, H - 14,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

const drawWarm131 = (ctx, W, H, frame) => {
  const CYCLE = 580, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the same length, measured twice", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.unitBar(ctx, { x: 62, y: 62, w: W - 124, h: 36, n: 12, big: "foot", small: "inch",
    copies: 1, prog: D.at(f, 40, 440), bigCol: "#6042A6", smallCol: "#6042A6", label: false });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 440, 530) });
};

const drawStory131 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the ribbon for the sports day banner", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.unitBar(ctx, { x: 58, y: 62, w: W - 116, h: 34, n: 3, big: "yard", small: "foot",
    copies: 3, prog: D.at(f, 60, 360), bigCol: "#FA7E19", smallCol: "#2D70B3" });
  if (p3 > 0) {
    D.txt(ctx, "the ribbon is 3 yards. how many feet is that?", W / 2, H - 14,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard131 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Bigger unit into smaller unit" });
  const p1 = D.at(f, 20, 300), p3 = D.at(f, 480, 700), p4 = D.at(f, 720, 920);

  D.unitBar(ctx, { x: 130, y: 100, w: W - 260, h: 34, n: 12, big: "foot", small: "inch",
    copies: 1, prog: p1, bigCol: "#2D70B3", smallCol: "#FA7E19" });

  if (p3 > 0) {
    D.table(ctx, { x: 220, y: 226, w: W - 440, rh: 26,
      head: ["feet", "inches"], rows: [["1", "12"], ["2", "24"], ["3", "36"]], prog: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "feet \u00d7 12 = inches", W / 2, 348,
      { size: 24, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "the number gets bigger because the unit got smaller",
      W / 2, H - 26, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 790, 900) });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 840, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport131 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.unitBar(ctx, { x: 26, y: 12, w: W - 52, h: 20, n: 12, big: "foot", small: "inch",
    copies: 5, prog: 1, bigCol: "#2D70B3", smallCol: "#FA7E19", numbered: false,
    split: 12, label: false });
  D.txt(ctx, "five feet, each holding twelve inches", W / 2, H - 8,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "13-1",
  storageKey: "daf-g4-t13-l1",
  title: "Equivalence with Customary Units of Length",
  unit: "GRADE 4 · TOPIC 13 · LESSON 13-1 · 4.MD.A.1",
  math: M,
  ixl: ["M97", "T8A"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "One long bar, and underneath it the same length cut into small pieces. No question yet.",
      goal: "Establish that a conversion is one length described twice.",
      pull: "Both rows end in exactly the same place.",
      rail: { launch: "Describe the two rows. Do not name any units yet.",
        monitor: ["Counting the small pieces", "Noticing the ends line up", "Naming the units"],
        connect: "Which row has more pieces? Which row is longer?",
        misconception: "Believing the row with more pieces is the longer one." } },

    { phase: "launch", title: "Three yards of <em>ribbon</em>",
      lead: "The sports day banner needs 3 yards of ribbon. Estimate how many feet that is.",
      goal: "Create the need for a conversion rule instead of a guess.",
      pull: "Now let us see one unit inside the other.",
      rail: { launch: "Commit to a number of feet before you calculate.",
        monitor: ["Estimating nine", "Estimating three", "Reasoning three per yard"],
        connect: "Will the number of feet be more or fewer than three?",
        misconception: "Answering 3 because there are 3 yards." } },

    { phase: "monitor", title: "One unit <em>inside</em> another",
      lead: "Lay the small unit end to end until it fills the big one.",
      goal: "The conversion factor is counted, not memorised first.",
      pull: "Now put it in a table.",
      rail: { launch: "Predict how many will fit before you tap.",
        monitor: ["Counting the small units", "Naming the factor", "Handling two big units"],
        connect: "What happens to the count when there are two big units?",
        misconception: "Thinking a yard holds 12 feet because a foot holds 12 inches." } },

    { phase: "monitor", title: "Build the <em>table</em>",
      lead: "One row at a time. Watch what the right-hand column does.",
      goal: "The table exposes the multiplication.",
      pull: "Now judge some conversions.",
      rail: { launch: "Predict the next row before you press.",
        monitor: ["Adding twelve each time", "Multiplying by twelve", "Adding one each time"],
        connect: "How would you get row twenty without writing rows four to nineteen?",
        misconception: "Continuing the pattern by adding one instead of twelve." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each conversion. No grading until the class commits.",
      goal: "Catch the divide-instead-of-multiply error.",
      pull: "Two students converted the same length differently.",
      rail: { launch: "For each one ask: is the answer a bigger number than we started with?",
        monitor: ["Checking the direction", "Recomputing", "Sketching the bar"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Dividing when converting a big unit into a small one." } },

    { phase: "connect", title: "Two ways to <em>convert</em>",
      lead: "Joud went yards to feet to inches. Qais multiplied by thirty six in one go.",
      goal: "A two-step conversion and a one-step conversion agree.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask where the thirty six came from.",
        monitor: ["Converting in two steps", "Using 36 directly", "Checking one against the other"],
        connect: "Why is 3 × 12 the same as multiplying by 36?",
        misconception: "Adding 3 and 12 to get the yard-to-inch factor." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "One foot holds twelve inches. So feet times twelve gives inches. Every time.",
      goal: "The moment the direction rule is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Build the bar with them before writing anything.",
        monitor: ["Predicting the table", "Naming the operation", "Restating the rule"],
        connect: "Who can say why the number gets bigger?",
        misconception: "Memorising the factor without the direction." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence for every big-to-small conversion in this topic.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Naming the factor", "Choosing to multiply", "Checking the answer is bigger"],
        connect: "What would change if we went the other way?",
        misconception: "Applying the rule without checking which unit is bigger." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on big-to-small length conversion.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. How many inches in one foot?",
        monitor: ["Multiplying by twelve", "Dividing by twelve", "Sketching the bar"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 17 by adding 5 and 12." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: the same idea for cups, pints, quarts and gallons.",
      rail: { launch: "Three students say the rule in their own words.",
        monitor: ["Converts confidently", "Still unsure of the direction", "Ready for capacity"],
        connect: "Who is measuring something in two units tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [pair, setPair] = useState("ft");
    const [rows, setRows] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm131} height={256} award={award}
          notices={["The two rows are the same length", "The bottom row has twelve pieces", "Every small piece matches", "The ends line up exactly"]}
          wonders={["What are the pieces called?", "Does this work for other units?", "Which number is bigger?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory131} height={256} award={award}
          label="How many feet of ribbon?" min={1} max={15} start={5} unit="feet"
          after="Locked. Now let us count one unit inside the other."
          note="A yard is a long stride; a foot is about the length of a ruler." />;

      case 2:
        return <ExploreChips draw={makeBar131(pair)} height={256}
          label="Fit the small unit inside the big one" value={pair}
          onPick={(v) => setPair(v)}
          chips={[{ v: "ft", label: "foot → inches" }, { v: "yd", label: "yard → feet" },
                  { v: "yd3", label: "yard → inches" }, { v: "two", label: "2 feet → inches" }]}
          caption={<MathEl omml={M.yardInch} size="xl" display="block" />}
          footnote="The bar never changes length — only the unit you count in." />;

      case 3:
        return <ExploreChips draw={makeTable131(rows)} height={256}
          label="Fill the table" value={rows}
          onPick={(v) => setRows(v)}
          chips={[{ v: 1, label: "1 row" }, { v: 3, label: "3 rows" }, { v: 5, label: "5 rows" }]}
          caption={<MathEl omml={M.bigToSmall} size="lg" display="block" />}
          footnote="Each new foot adds twelve inches — that is what multiplying means." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "a1", text: "4 feet = 48 inches", target: "yes" },
                  { id: "a2", text: "4 feet = 16 inches", target: "no" },
                  { id: "a3", text: "2 yards = 6 feet", target: "yes" },
                  { id: "a4", text: "2 yards = 24 feet", target: "no" }]}
          targets={[{ id: "yes", label: "correct — multiplied by the right factor" },
                    { id: "no", label: "not yet — check the factor" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Joud's way — two steps", omml: M.three, h: 92,
            quote: "One yard is 3 feet. Each foot is 12 inches. So 3 lots of 12." }}
          right={{ name: "Qais's way — one step", omml: M.yardInch, h: 92,
            quote: "I just remembered a yard is 36 inches." }}
          same={["Both give 36 inches", "Both describe one yard", "Both make the number bigger"]}
          diff={["Joud converts twice", "Qais uses one fact", "Joud's works even if you forget 36"]} />;

      case 6:
        return <BoardScreen draw={drawBoard131} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "multiply by how many small units fit inside one big one" }]}
          hand={"which unit is bigger? · how many small ones fit inside? · multiply"}
          cards={[{ title: "The conversion we built", omml: M.footInch, note: "twelve small units in one big one" },
                  { title: "Tap for a very large one", omml: M.yardFoot, revealOmml: M.mileFeet, reveal: true,
                    note: "the rule does not care how big the factor is" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          hard={{ prompt: "The sports day banner ribbon is 2 yards 1 foot long. How many inches is that?", omml: M.hard,
                  answer: "84 inches",
                  hint: "2 yards is 6 feet, plus 1 makes 7 feet \u2014 and 7 \u00d7 12 = 84." }}
          hard={{ prompt: "The harder one \u2014 two steps.", omml: M.hard,
                  answer: "84 inches",
                  hint: "2 yards is 6 feet, plus 1 makes 7 feet \u2014 and 7 \u00d7 12 = 84." }}
          prompt="Yousef's desk is 5 feet long. How many inches is that?" omml={M.swyk}
          options={[{ v: "a", text: "17 in" }, { v: "b", text: "60 in" }, { v: "c", text: "5 in" }, { v: "d", text: "7 in" }]}
          right="b"
          support={{ yes: "Yes — five feet, each holding twelve inches.",
            notYet: "Not yet — inches are smaller, so there must be more of them.",
            draw: drawSupport131, h: 100, hint: "5 × 12 = 60, because each foot contributes twelve inches." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Measure something at home in feet, then work out the same length in inches." />;

      default: return null;
    }
  }
};
