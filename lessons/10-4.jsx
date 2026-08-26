/* ===========================================================================
   Grade 4 · Topic 10 · LESSON 10-4 · Solve Time Problems
   Standard 4.MD.A.2   I can ... find elapsed time, and add or subtract times
   using a number line rather than guessing.
   =========================================================================== */

const M = {
  start: om(mnor("3:45 p.m.")),
  finish: om(mnor("5:20 p.m.")),
  hop1: om(mnor("15 min to 4:00")),
  hop2: om(mnor("1 hour to 5:00")),
  hop3: om(mnor("20 min to 5:20")),
  total: om(mt("15+60+20=95"), mnor(" minutes")),
  asMixed: om(mnor("95 minutes = 1 hour 35 minutes")),
  hourFrac: om(mfrac(1, 4), mnor(" of an hour = 15 minutes")),
  hourFracs: {
    2: om(mfrac(1, 2), mnor(" of an hour = 30 minutes")),
    3: om(mfrac(1, 3), mnor(" of an hour = 20 minutes")),
    4: om(mfrac(1, 4), mnor(" of an hour = 15 minutes")),
    6: om(mfrac(1, 6), mnor(" of an hour = 10 minutes")),
    12: om(mfrac(1, 12), mnor(" of an hour = 5 minutes"))
  },
  rule: om(mnor("hop to the next hour \u00b7 hop the whole hours \u00b7 hop the rest")),
  swyk: om(mnor("2:50 p.m. to 4:15 p.m.")),
  swykAnswer: om(mnor("1 hour 25 minutes"))
};

/* two clocks, start and finish, with the hands drawn in */
const makeClocks104 = (which) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const r = Math.min(66, H * 0.27);
  const cy = H / 2 - 6;
  const sweep = (Math.sin(frame / 60) + 1) / 2 * 0.35 + 0.65;

  D.clock(ctx, { cx: W * 0.28, cy: cy, r: r, h: 3, m: 45,
    prog: which === "finish" ? 1 : sweep,
    label: "3:45 p.m.", caption: "the match kicks off",
    hourCol: which === "start" ? "#C9A227" : "rgba(201,162,39,.45)",
    minCol: which === "start" ? "#2D70B3" : "rgba(45,112,179,.45)" });

  D.clock(ctx, { cx: W * 0.72, cy: cy, r: r, h: 5, m: 20,
    prog: which === "start" ? 1 : sweep,
    label: "5:20 p.m.", caption: "the whistle goes",
    hourCol: which === "finish" ? "#C9A227" : "rgba(201,162,39,.45)",
    minCol: which === "finish" ? "#388C46" : "rgba(56,140,70,.45)" });

  D.txt(ctx, "how long did the match last?", W / 2, H - 12,
    { size: 13.5, col: "#C9A227", font: "marker" });
};

/* the open number line, hop by hop */
const makeHops104 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const all = [
    { label: "3:45", mins: 225 },
    { label: "4:00", mins: 240, hopCol: "#FA7E19" },
    { label: "5:00", mins: 300, hopCol: "#2D70B3", hopLabel: "1 hour" },
    { label: "5:20", mins: 320, hopCol: "#388C46" }
  ];
  const stops = all.slice(0, Math.max(2, step + 2));
  /* keep the full span so the line does not jump around while stepping */
  const shown = stops.concat(step + 2 < all.length
    ? [{ label: "5:20", mins: 320, ghost: true, col: "rgba(234,244,242,.3)" }] : []);
  D.timeLine(ctx, { x: 62, y: H / 2 - 4, w: W - 124, stops: shown, prog: 1, hop: 36,
    total: step >= 2 ? "15 + 60 + 20 = 95 minutes" : null });
  D.txt(ctx, ["hop to the next o'clock", "now hop the whole hours", "now hop the last minutes"][step],
    W / 2, 26, { size: 14, col: "#EAF4F2", font: "marker" });
  if (step >= 2) {
    const pulse = 0.6 + Math.sin(frame / 15) * 0.3;
    D.txt(ctx, "95 minutes is 1 hour 35 minutes", W / 2, H - 12,
      { size: 13, col: "#34D399", font: "marker", alpha: pulse + 0.3 });
  }
};

/* fractions of an hour — the link back to this topic */
const makeHourFrac104 = (den) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const r = Math.min(58, H * 0.26);
  D.clock(ctx, { cx: W * 0.24, cy: H / 2 - 4, r: r, h: 12, m: 60 / den,
    prog: 1, numerals: false, label: null, minCol: "#FA7E19" });
  /* shade the sector of the hour */
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(W * 0.24, H / 2 - 4);
  ctx.arc(W * 0.24, H / 2 - 4, r * 0.78, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2) / den);
  ctx.closePath();
  ctx.fillStyle = "#FA7E19"; ctx.globalAlpha = 0.35; ctx.fill();
  ctx.restore();

  D.fracBar(ctx, { x: W * 0.45, y: H / 2 - 28, w: W * 0.46, h: 46, den: den, num: 1,
    prog: 1, col: "#FA7E19", label: false });
  D.txt(ctx, "1/" + den + " of an hour", W * 0.45 + W * 0.23, H / 2 + 40,
    { size: 14, col: "#C9A227", font: "marker" });
  D.txt(ctx, "= " + (60 / den) + " minutes", W / 2, H - 16,
    { size: 15, col: "#34D399", font: "marker" });
  D.txt(ctx, "one hour is 60 minutes, cut into " + den + " equal parts", W / 2, 24,
    { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawStory104 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 110, 320), p3 = D.at(f, 340, 480);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the school football match", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  const r = Math.min(56, H * 0.24);
  D.clock(ctx, { cx: W * 0.27, cy: H / 2 + 4, r: r, h: 3, m: 45, prog: p2,
    label: "3:45 p.m.", caption: "kick off" });
  D.clock(ctx, { cx: W * 0.73, cy: H / 2 + 4, r: r, h: 5, m: 20, prog: D.at(f, 200, 400),
    label: "5:20 p.m.", caption: "final whistle" });
  if (p3 > 0) {
    D.txt(ctx, "estimate how many minutes the match lasted", W / 2, H - 12,
      { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard104 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Hop to the friendly time first" });
  const p1 = D.at(f, 20, 200), p3 = D.at(f, 520, 720), p4 = D.at(f, 740, 920);
  const r = 48;

  D.clock(ctx, { cx: 108, cy: 130, r: r, h: 3, m: 45, prog: p1, label: "3:45", caption: "start" });
  D.clock(ctx, { cx: W - 108, cy: 130, r: r, h: 5, m: 20, prog: D.at(f, 120, 300),
    label: "5:20", caption: "finish" });

  const stops = [
    { label: "3:45", mins: 225 },
    { label: "4:00", mins: 240, hopCol: "#FA7E19" },
    { label: "5:00", mins: 300, hopCol: "#2D70B3", hopLabel: "1 hour" },
    { label: "5:20", mins: 320, hopCol: "#388C46" }
  ];
  D.timeLine(ctx, { x: 192, y: 268, w: W - 384, stops: stops,
    prog: D.at(f, 260, 660), hop: 30,
    total: p3 > 0 ? "15 + 60 + 20 = 95 minutes" : null });

  if (p4 > 0) {
    D.txt(ctx, "95 minutes = 1 hour 35 minutes", W / 2, H - 26,
      { size: 19, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 40, H - 30, 14, D.at(f, 840, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport104 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.timeLine(ctx, { x: 34, y: 34, w: W - 68, hop: 20,
    stops: [{ label: "2:50", mins: 170 },
            { label: "3:00", mins: 180, hopCol: "#FA7E19" },
            { label: "4:00", mins: 240, hopCol: "#2D70B3", hopLabel: "1 hour" },
            { label: "4:15", mins: 255, hopCol: "#388C46" }],
    prog: 1 });
};

const LESSON = {
  code: "10-4",
  storageKey: "daf-g4-t10-l4",
  title: "Solve Time Problems",
  unit: "GRADE 4 · TOPIC 10 · LESSON 10-4 · 4.MD.A.2",
  math: M,
  ixl: ["QDA", "K2S", "VD2"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two clock faces. The hands are drawn in front of you. No question yet.",
      goal: "Read the clocks before any arithmetic is asked for.",
      pull: "One clock is later than the other.",
      rail: { launch: "Just read the two clocks aloud. Nothing else yet.",
        monitor: ["Reading the hour hand correctly", "Reading minutes in fives", "Noticing which is later"],
        connect: "How do you know which clock is later?",
        misconception: "Reading 3:45 as 4:45 because the hour hand is nearly at 4." } },

    { phase: "launch", title: "Kick off to <em>final whistle</em>",
      lead: "The match started at 3:45 p.m. and ended at 5:20 p.m. Estimate the length in minutes.",
      goal: "Create the need for a reliable method instead of counting on fingers.",
      pull: "Now let us hop it out.",
      rail: { launch: "More than an hour or less? Commit, then choose a number.",
        monitor: ["Estimating just over 90 minutes", "Subtracting 45 from 20", "Reasoning hour by hour"],
        connect: "Who used the hours first and the minutes after?",
        misconception: "Doing 5:20 minus 3:45 as if it were 520 minus 345." } },

    { phase: "monitor", title: "Hop to the <em>friendly time</em>",
      lead: "Jump to the next o'clock, then across the whole hours, then the last few minutes.",
      goal: "The open number line replaces guesswork with three clean hops.",
      pull: "Time also comes in fractions of an hour.",
      rail: { launch: "Which hop should come first, and why that one?",
        monitor: ["Hopping to 4:00 first", "Counting whole hours", "Adding the three hops"],
        connect: "Why is the first hop the awkward one?",
        misconception: "Treating an hour as 100 minutes when adding." } },

    { phase: "monitor", title: "Fractions of an <em>hour</em>",
      lead: "An hour is sixty minutes. Cut it into equal parts and read the minutes.",
      goal: "Tie this lesson back to the fraction work in the rest of the topic.",
      pull: "Now judge some finished work.",
      rail: { launch: "Predict the minutes before you tap.",
        monitor: ["Dividing 60 by the denominator", "Recognising a quarter hour", "Confusing a half hour with 50 minutes"],
        connect: "Which fractions of an hour give whole minutes?",
        misconception: "Reading half an hour as 50 minutes because half of 100 is 50." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each answer. No grading until the class commits.",
      goal: "Expose the base-sixty errors as a group.",
      pull: "Two students found the same answer differently.",
      rail: { launch: "Check whether anybody treated the hour as 100 minutes.",
        monitor: ["Checking the hour boundary", "Recomputing with hops", "Estimating first"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Subtracting minutes column-style without regrouping sixty." } },

    { phase: "connect", title: "Two ways to <em>find it</em>",
      lead: "Anees counted forward in hops. Faisal took the whole hour off first and adjusted.",
      goal: "Compare counting on with subtracting back.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both methods without endorsing either.",
        monitor: ["Counting on in hops", "Subtracting and adjusting", "Checking with the clocks"],
        connect: "Which method is safer when the minutes are awkward?",
        misconception: "Believing only one of the two methods is allowed." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Two clocks, one line, three hops, ninety five minutes.",
      goal: "The moment the method is taught, not displayed.",
      pull: "Say it as a rule.",
      rail: { launch: "Draw the line under the clocks and hop it with them.",
        monitor: ["Predicting the next hop", "Adding the hops", "Renaming into hours and minutes"],
        connect: "Who can say the three hops in order?",
        misconception: "Forgetting to convert 95 minutes into hours and minutes." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Three hops, every time, for any pair of times.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read the three hops aloud together.",
        monitor: ["Naming the friendly time", "Counting whole hours", "Renaming the total"],
        connect: "What changes if the start is already on the hour?",
        misconception: "Applying the rule without checking a.m. and p.m." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on elapsed time.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Hop to three o'clock first.",
        monitor: ["Hopping to the next hour", "Counting whole hours", "Renaming the minutes"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 1 hour 65 minutes without renaming." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: modelling a problem with maths of your own choosing.",
      rail: { launch: "Three students name a time they worked out today.",
        monitor: ["Confident with the hops", "Still needs the clocks", "Ready for word problems"],
        connect: "Who is timing something at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [den, setDen] = useState(4);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeClocks104("start")} height={256} award={award}
          notices={["The left clock says 3:45", "The right clock says 5:20", "The right one is later", "The hour hand is between numbers"]}
          wonders={["How long is that?", "Is it more than an hour?", "Do I subtract the numbers?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory104} height={256} award={award}
          label="How many minutes did the match last?" min={30} max={150} start={80} unit="min"
          after="Locked. Now let us hop from one time to the other."
          note="An hour is sixty minutes, not one hundred." />;

      case 2:
        return <ExploreChips draw={makeHops104(step)} height={256}
          label="Take the hops in order" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "hop to 4:00" }, { v: 1, label: "hop the whole hours" }, { v: 2, label: "hop the last minutes" }]}
          caption={<MathEl omml={M.total} size="xl" display="block" />}
          footnote="The first hop is always to the next o'clock." />;

      case 3:
        return <ExploreChips draw={makeHourFrac104(den)} height={256}
          label="Cut the hour into equal parts" value={den}
          onPick={(v) => setDen(v)}
          chips={[{ v: 2, label: "halves" }, { v: 3, label: "thirds" }, { v: 4, label: "quarters" },
                  { v: 6, label: "sixths" }, { v: 12, label: "twelfths" }]}
          caption={<MathEl omml={M.hourFracs[den]} size="lg" display="block" />}
          footnote="Sixty divides neatly, which is exactly why clocks use it." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "f1", text: "3:45 to 5:20 is 95 min", target: "yes" },
                  { id: "f2", text: "3:45 to 5:20 is 75 min", target: "no" },
                  { id: "f3", text: "half an hour is 30 min", target: "yes" },
                  { id: "f4", text: "half an hour is 50 min", target: "no" }]}
          targets={[{ id: "yes", label: "correct — sixty minutes to the hour" },
                    { id: "no", label: "not yet — check the hour boundary" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Anees's way — count forward", omml: M.total, h: 92,
            quote: "Fifteen up to four, one whole hour, then twenty more." }}
          right={{ name: "Faisal's way — go back from 5:20", omml: M.asMixed, h: 92,
            quote: "An hour and a half back is 3:50. That is five minutes too far, so 1 hour 35." }}
          same={["Both give 1 hour 35 minutes", "Both respect sixty minutes to the hour", "Both can be checked on the clocks"]}
          diff={["Anees counts on, Faisal counts back", "Faisal has to adjust at the end", "Anees's hops are easier to say aloud"]} />;

      case 6:
        return <BoardScreen draw={drawBoard104} height={430}
          caption="The awkward hop is always the first one — get to the o'clock, then the hours are easy." />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "hop to the next hour, hop the whole hours, hop the rest" }]}
          hand={"hop to the o'clock · hop the whole hours · hop the leftover minutes · rename"}
          cards={[{ title: "The match we timed", omml: M.total, note: "fifteen, sixty and twenty" },
                  { title: "Tap to rename it", omml: M.hop2, revealOmml: M.asMixed, reveal: true,
                    note: "ninety five minutes is not ninety five hundredths of an hour" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Layth starts her homework at 2:50 p.m. and finishes at 4:15 p.m. How long did it take?"
          omml={M.swyk}
          options={[{ v: "a", text: "1 h 65 min" }, { v: "b", text: "2 h 25 min" }, { v: "c", text: "1 h 25 min" }, { v: "d", text: "1 h 35 min" }]}
          right="c"
          support={{ yes: "Yes — 10 minutes, then 1 hour, then 15 minutes.",
            notYet: "Not yet — hop to three o'clock first.",
            draw: drawSupport104, h: 100, hint: "10 + 60 + 15 = 85 minutes, which is 1 hour 25 minutes." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Time how long dinner takes tonight, and write it as hours and minutes using three hops." />;

      default: return null;
    }
  }
};
