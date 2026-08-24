/* ===========================================================================
   Grade 4 · Topic 12 · LESSON 12-2 · Fractions and Decimals on the Number Line
   Standard 4.NF.C.6   I can ... place tenths and hundredths on a number line
   and read a point off it as either a fraction or a decimal.
   =========================================================================== */

const M = {
  point: om(mnor("0.6 = ") , mfrac(6, 10)),
  between: om(mnor("0.64 sits between 0.6 and 0.7")),
  zoom: om(mnor("zoom in and each tenth splits into ten hundredths")),
  mixedDec: om(mt("1"), mfrac(3, 10), mnor(" = 1.3")),
  nearest: om(mnor("0.64 is nearer to 0.6 than to 0.7")),
  rule: om(mnor("tenths cut the whole \u00b7 hundredths cut each tenth")),
  swyk: om(mnor("which point is 0.45?")),
  swykAnswer: om(mnor("between 0.4 and 0.5, closer to the middle"))
};

/* the two-level line: tenths on top, one tenth zoomed underneath */
const makeZoom122 = (level) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 70, w = W - 140;

  D.txt(ctx, "one whole, cut into ten", W / 2, 26,
    { size: 12.5, col: "rgba(234,244,242,.65)", font: "marker" });

  const px = D.fracLine(ctx, { x: x, y: 76, w: w, den: 10, whole: 1, prog: 1, labelAll: true,
    marks: [{ n: 6, den: 10, col: "#2D70B3", label: "0.6" }] });

  if (level >= 1) {
    /* the zoom window on the gap from 0.6 to 0.7 */
    const a = px(6, 10), b = px(7, 10);
    const pulse = 0.5 + Math.sin(frame / 15) * 0.28;
    ctx.save();
    ctx.globalAlpha = pulse + 0.4;
    D.rr(ctx, a, 60, b - a, 34, 6);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.marker(ctx, [[a, 96], [x, 154]], 1, "rgba(201,162,39,.45)", 1.4);
    D.marker(ctx, [[b, 96], [x + w, 154]], 1, "rgba(201,162,39,.45)", 1.4);

    const px2 = D.fracLine(ctx, { x: x, y: 180, w: w, den: 10, whole: 1, prog: 1,
      labelAll: false, bigLabels: false,
      marks: level >= 2 ? [{ n: 4, den: 10, col: "#34D399", label: "0.64" }] : [] });
    const stops = [[0, "0.60"], [5, "0.65"], [10, "0.70"]];
    stops.forEach((st) => {
      D.txt(ctx, st[1], px2(st[0], 10), 208,
        { size: 12, col: "#EAF4F2", font: "mono", weight: 700 });
    });
  }

  D.txt(ctx, level === 0 ? "find six tenths on the line"
       : level === 1 ? "that one tenth, cut into ten again \u2014 hundredths"
       : "0.64 lives four hundredths past 0.6",
    W / 2, H - 12, { size: 13.5, col: level === 2 ? "#34D399" : "#C9A227", font: "marker" });
};

/* drag-free placement practice: which point is the given value? */
const makePlace122 = (pick) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 74, w = W - 148, y = H / 2 + 8;
  const px = D.fracLine(ctx, { x: x, y: y, w: w, den: 10, whole: 2, prog: 1 });

  const pts = { a: 3, b: 13, c: 17 };
  Object.keys(pts).forEach((k) => {
    const cx = px(pts[k], 10);
    const on = pick === k;
    ctx.save();
    ctx.globalAlpha = on ? 1 : 0.5;
    ctx.beginPath(); ctx.arc(cx, y, on ? 8 : 5.5, 0, Math.PI * 2);
    ctx.fillStyle = on ? "#34D399" : "#6042A6"; ctx.fill();
    ctx.restore();
    D.txt(ctx, k.toUpperCase(), cx, y - 24,
      { size: 13, col: on ? "#34D399" : "rgba(234,244,242,.55)", font: "marker" });
  });

  D.txt(ctx, "which point is one and three tenths?", W / 2, 30,
    { size: 14, col: "#C9A227", font: "marker" });
  if (pick) {
    const ok = pick === "b";
    const vals = { a: "0.3", b: "1.3", c: "1.7" };
    D.txt(ctx, "point " + pick.toUpperCase() + " is " + vals[pick],
      W / 2, H - 34, { size: 15, col: ok ? "#34D399" : "#E0665F", font: "marker" });
    D.txt(ctx, ok ? "one whole and three tenths \u2014 that is 1.3"
         : "count the whole numbers first, then the tenths",
      W / 2, H - 12, { size: 12, col: ok ? "#C9A227" : "#E0665F", font: "marker" });
  } else {
    D.txt(ctx, "tap a point", W / 2, H - 14,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker" });
  }
};

const drawWarm122 = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracLine(ctx, { x: 70, y: H / 2 + 6, w: W - 140, den: 10, whole: 1,
    prog: D.at(f, 20, 320), labelAll: true,
    marks: [{ n: 6, den: 10, col: "#6042A6", label: "?" }] });
  D.txt(ctx, "a line from zero to one, and a dot on it", W / 2, 32,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 340, 440) });
};

const drawStory122 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 380, 520);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the 100 metre track on sports day", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracLine(ctx, { x: 70, y: H / 2 + 14, w: W - 140, den: 10, whole: 1,
    prog: D.at(f, 60, 340), labelAll: true,
    marks: [{ n: 6, den: 10, col: "#FA7E19", label: "Layla" }] });
  if (p3 > 0) {
    D.txt(ctx, "Layla has run 0.64 of the way. where exactly is that?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard122 = (ctx, W, H, frame) => {
  const CYCLE = 920, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Zooming from tenths into hundredths" });
  const p2 = D.at(f, 300, 560), p3 = D.at(f, 580, 760), p4 = D.at(f, 780, 900);
  const x = 130, w = W - 260;

  const px = D.fracLine(ctx, { x: x, y: 130, w: w, den: 10, whole: 1,
    prog: D.at(f, 20, 280), labelAll: true,
    marks: [{ n: 6, den: 10, col: "#2D70B3", label: "0.6" }] });

  if (p2 > 0) {
    const a = px(6, 10), b = px(7, 10);
    ctx.save();
    ctx.globalAlpha = p2;
    D.rr(ctx, a, 112, b - a, 36, 6);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.restore();
    D.marker(ctx, [[a, 150], [x, 216]], p2, "rgba(201,162,39,.5)", 1.5);
    D.marker(ctx, [[b, 150], [x + w, 216]], p2, "rgba(201,162,39,.5)", 1.5);
  }
  if (p3 > 0) {
    const px2 = D.fracLine(ctx, { x: x, y: 244, w: w, den: 10, whole: 1, prog: p3,
      labelAll: false, bigLabels: false, marks: [{ n: 4, den: 10, col: "#34D399", label: "0.64" }] });
    D.txt(ctx, "0.60", px2(0, 10), 276, { size: 12.5, col: "#EAF4F2", font: "mono", weight: 700, alpha: p3 });
    D.txt(ctx, "0.70", px2(10, 10), 276, { size: 12.5, col: "#EAF4F2", font: "mono", weight: 700, alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "every tenth holds ten hundredths \u2014 the line never runs out of room",
      W / 2, 332, { size: 16, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "0.64 is nearer to 0.6 than to 0.7",
      W / 2, H - 26, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 820, 890) });
    D.star8(ctx, W - 44, H - 30, 14, D.at(f, 840, 910), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport122 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracLine(ctx, { x: 34, y: H / 2 - 4, w: W - 68, den: 10, whole: 1, prog: 1, labelAll: true,
    marks: [{ n: 4.5, den: 10, col: "#C9A227", label: "0.45" }] });
};

const LESSON = {
  code: "12-2",
  storageKey: "daf-g4-t12-l2",
  title: "Fractions and Decimals on the Number Line",
  unit: "GRADE 4 · TOPIC 12 · LESSON 12-2 · 4.NF.C.6",
  math: M,
  ixl: ["N93", "EWY", "2N9"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A number line from zero to one, ten ticks, and a dot. No question yet.",
      goal: "Recover the tenths line before hundredths are introduced.",
      pull: "That dot is going to need a name.",
      rail: { launch: "Describe the line. Do not name the dot yet.",
        monitor: ["Counting the ticks", "Naming a tick as a tenth", "Locating the dot"],
        connect: "How many ticks are between zero and one?",
        misconception: "Counting the ticks rather than the gaps." } },

    { phase: "launch", title: "How far has Layla <em>run</em>?",
      lead: "Layla has run 0.64 of the hundred metre track. Estimate where that is on the line.",
      goal: "Create the need for a scale finer than tenths.",
      pull: "Now zoom in.",
      rail: { launch: "Between which two tenths does it fall? Commit.",
        monitor: ["Placing it after 0.6", "Placing it after 0.7", "Reading 0.64 as sixty four tenths"],
        connect: "Why can't we point at it exactly on this line?",
        misconception: "Reading 0.64 as bigger than 0.7 because 64 is bigger than 7." } },

    { phase: "monitor", title: "Zoom into <em>one tenth</em>",
      lead: "Take the gap from 0.6 to 0.7 and cut it into ten.",
      goal: "Hundredths are made by cutting a tenth, not by adding new numbers.",
      pull: "Now place some points on a longer line.",
      rail: { launch: "Predict how many pieces that one tenth will become.",
        monitor: ["Naming ten hundredths", "Reading 0.64 in the zoom", "Losing the connection to the top line"],
        connect: "What would happen if we zoomed again?",
        misconception: "Believing hundredths need a completely different line." } },

    { phase: "monitor", title: "Which point is <em>1.3</em>?",
      lead: "The line runs past one now. Read the whole first, then the tenths.",
      goal: "Extend the reading to numbers greater than one.",
      pull: "Now judge some placements.",
      rail: { launch: "Say the number as 'one whole and how many tenths'.",
        monitor: ["Counting past one", "Reading 1.3 as 13 tenths", "Confusing 0.3 with 1.3"],
        connect: "How is 1.3 written as a mixed number?",
        misconception: "Ignoring the whole number part when reading a point." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each placement. No grading until the class commits.",
      goal: "Catch the 'longer decimal means bigger' error early.",
      pull: "Two students placed the same number differently.",
      rail: { launch: "Ask of each one: between which two tenths does it sit?",
        monitor: ["Bracketing between tenths", "Checking the whole number", "Reading extra digits as size"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Placing 0.64 to the right of 0.7." } },

    { phase: "connect", title: "Two ways to <em>find it</em>",
      lead: "Reem counted tenths then hundredths. Ibrahim renamed 0.64 as 64 hundredths and counted from zero.",
      goal: "Two routes to the same point, both defensible.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which is faster with a hundred ticks.",
        monitor: ["Counting in two stages", "Counting 64 hundredths", "Checking against a benchmark"],
        connect: "Which one would you use for 0.07?",
        misconception: "Believing only one counting route is valid." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Tenths cut the whole. Hundredths cut each tenth. Nothing new is invented.",
      goal: "The moment the zoom idea is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw the zoom with them, funnel lines and all.",
        monitor: ["Predicting the sub-ticks", "Locating 0.64", "Comparing with 0.6 and 0.7"],
        connect: "Who can say what one small tick is worth?",
        misconception: "Treating the zoomed line as a different number line." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "One sentence that lets you place any decimal you meet this year.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Bracketing between tenths", "Naming the nearest tenth", "Reading past one"],
        connect: "Which two tenths does 0.07 sit between?",
        misconception: "Assuming a decimal always sits between zero and one." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on locating hundredths.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Which two tenths does it fall between?",
        monitor: ["Bracketing 0.4 and 0.5", "Placing it halfway", "Placing it after 0.5"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Placing 0.45 next to 0.9 because 45 is nearly half of 100." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: comparing two decimals without a picture.",
      rail: { launch: "Three students place a decimal on an imaginary line.",
        monitor: ["Brackets confidently", "Still needs the zoom", "Ready to compare"],
        connect: "Who is finding a decimal on a scale at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [level, setLevel] = useState(0);
    const [pick, setPick] = useState(null);

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm122} height={256} award={award}
          notices={["The line runs from zero to one", "There are ten equal gaps", "The dot sits past the middle", "Each gap is a tenth"]}
          wonders={["What is the dot called?", "Could a number sit between two ticks?", "How would I write it?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory122} height={256} award={award}
          label="Which tenth is Layla nearest to?" min={0} max={10} start={5} unit="/ 10"
          after="Locked. Now we need a finer scale."
          note="0.64 is more than six tenths but less than seven tenths." />;

      case 2:
        return <ExploreChips draw={makeZoom122(level)} height={256}
          label="Zoom in on the tenth" value={level}
          onPick={(v) => setLevel(v)}
          chips={[{ v: 0, label: "tenths" }, { v: 1, label: "zoom into 0.6 → 0.7" }, { v: 2, label: "find 0.64" }]}
          caption={<MathEl omml={M.between} size="xl" display="block" />}
          footnote="Cutting a tenth into ten is exactly how hundredths are made." />;

      case 3:
        return <ExploreChips draw={makePlace122(pick)} height={256}
          label="Read the point" value={pick}
          onPick={(v) => setPick(v)}
          chips={[{ v: "a", label: "point A" }, { v: "b", label: "point B" }, { v: "c", label: "point C" }]}
          caption={<MathEl omml={M.mixedDec} size="lg" display="block" />}
          footnote="Count the whole numbers before you count the tenths." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "b1", text: "0.64 sits between 0.6 and 0.7", target: "yes" },
                  { id: "b2", text: "0.64 sits to the right of 0.7", target: "no" },
                  { id: "b3", text: "1.3 sits between 1 and 2", target: "yes" },
                  { id: "b4", text: "0.45 sits between 0.9 and 1", target: "no" }]}
          targets={[{ id: "yes", label: "correct — check the tenths first" },
                    { id: "no", label: "not yet — more digits is not bigger" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Reem's way — two stages", omml: M.between, h: 92,
            quote: "Six tenths first, then four more hundredths." }}
          right={{ name: "Ibrahim's way — all hundredths", omml: M.zoom, h: 92,
            quote: "0.64 is sixty four hundredths. I counted from zero." }}
          same={["Both land on the same point", "Both use hundredths", "Both agree it is under 0.7"]}
          diff={["Reem counts in two stages", "Ibrahim counts in one", "Reem's is faster to say out loud"]} />;

      case 6:
        return <BoardScreen draw={drawBoard122} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "tenths cut the whole, hundredths cut each tenth" }]}
          hand={"which two tenths? · then how many hundredths past the first one"}
          cards={[{ title: "The point we found", omml: M.between, note: "sixty four hundredths" },
                  { title: "Tap for the nearest tenth", omml: M.point, revealOmml: M.nearest, reveal: true,
                    note: "four hundredths past 0.6, six short of 0.7" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Where does 0.45 belong on a number line from 0 to 1?" omml={M.swyk}
          options={[{ v: "a", text: "past 0.9" }, { v: "b", text: "between 0.4 and 0.5" },
                    { v: "c", text: "between 0 and 0.1" }, { v: "d", text: "exactly on 0.5" }]}
          right="b"
          support={{ yes: "Yes — four tenths and five more hundredths.",
            notYet: "Not yet — the first digit after the point is the tenths.",
            draw: drawSupport122, h: 100, hint: "0.45 is four tenths plus a bit, so it sits just before the halfway mark." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Draw a line from 0 to 1 and mark three decimals on it, including one with two places." />;

      default: return null;
    }
  }
};
