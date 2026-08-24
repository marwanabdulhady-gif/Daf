/* ===========================================================================
   Grade 4 · Topic 8 · LESSON 8-2 · Equivalent Fractions: Number Lines
   Standard 4.NF.A.1   I can ... find equivalent fractions by looking for the
   same point on a number line.
   =========================================================================== */

const M = {
  half: om(mfrac(1, 2)),
  twoFourths: om(mfrac(2, 4)),
  threeSixths: om(mfrac(3, 6)),
  samePoint: om(mnor("one point \u00b7 many names")),
  chain: om(mfrac(1, 2), mt("="), mfrac(2, 4), mt("="), mfrac(3, 6)),
  thirds: om(mfrac(1, 3), mt("="), mfrac(2, 6)),
  rule: om(mnor("equivalent fractions land on the same point")),
  swyk: om(mfrac(2, 3)),
  swykAnswer: om(mfrac(2, 3), mt("="), mfrac(4, 6))
};

const makeLine = (den) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracLine(ctx, { x: 68, y: H / 2 + 6, w: W - 136, den: den, whole: 1, prog: 1, labelAll: den <= 6,
    marks: [{ n: den / 2, den: den, label: (den / 2) + "/" + den, col: "#C9A227" }] });
  D.txt(ctx, "cut the line into " + den + " equal steps", W / 2, 36,
    { size: 14, col: "#EAF4F2", font: "marker" });
  D.txt(ctx, "the gold point never moves", W / 2, H - 16,
    { size: 13.5, col: "#34D399", font: "marker" });
};

const makeStackLines = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const dens = [2, 4, 6];
  for (var k = 0; k < n; k++) {
    D.fracLine(ctx, { x: 68, y: 52 + k * 66, w: W - 136, den: dens[k], whole: 1, prog: 1,
      marks: [{ n: dens[k] / 2, den: dens[k], col: "#C9A227" }] });
  }
  if (n >= 3) {
    ctx.save();
    ctx.strokeStyle = "rgba(201,162,39,.7)"; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(68 + (W - 136) / 2, 34);
    ctx.lineTo(68 + (W - 136) / 2, 52 + 2 * 66 + 22);
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, "one vertical line hits all three", W / 2, H - 12,
      { size: 13.5, col: "#34D399", font: "marker" });
  } else {
    D.txt(ctx, "add the next line", W / 2, H - 12, { size: 13, col: "#C9A227", font: "marker" });
  }
};

const drawTrack = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 130), p2 = D.at(f, 130, 330), p3 = D.at(f, 350, 470);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "the running track", W / 2, 22, { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.fracLine(ctx, { x: 68, y: 96, w: W - 136, den: 4, whole: 1, prog: p2, labelAll: true,
    marks: p3 > 0.3 ? [{ n: 2, den: 4, label: "here", col: "#FA7E19" }] : [] });
  if (p3 > 0) {
    D.txt(ctx, "Salma stopped halfway round", W / 2, 158,
      { size: 13.5, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "what else could we call that point?", W / 2, H - 16,
      { size: 14.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard82 = (ctx, W, H, frame) => {
  const CYCLE = 800, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "One point, many names" });
  const p1 = D.at(f, 20, 200), p2 = D.at(f, 220, 400), p3 = D.at(f, 420, 600), p4 = D.at(f, 600, 750);
  const dens = [2, 4, 6];
  const ps = [p1, p2, p3];
  for (var k = 0; k < 3; k++) {
    if (ps[k] <= 0) continue;
    D.fracLine(ctx, { x: 110, y: 118 + k * 76, w: W - 220, den: dens[k], whole: 1, prog: ps[k],
      marks: [{ n: dens[k] / 2, den: dens[k], col: "#C9A227" }] });
  }
  if (p3 > 0.6) {
    ctx.save();
    ctx.globalAlpha = D.at(f, 520, 620);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2.4; ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(110 + (W - 220) / 2, 96);
    ctx.lineTo(110 + (W - 220) / 2, 300);
    ctx.stroke();
    ctx.restore();
  }
  if (p4 > 0) {
    const yb = H - 38;
    D.marker(ctx, [[70, yb - 26], [W - 70, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "same distance from zero \u2014 same fraction, different name",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: D.at(f, 640, 730) });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 680, 780), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport82 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.fracLine(ctx, { x: 30, y: 40, w: W - 60, den: 6, whole: 1, prog: 1, labelAll: true,
    marks: [{ n: 4, den: 6, col: "#C9A227" }] });
};

const LESSON = {
  code: "8-2",
  storageKey: "daf-g4-t8-l2",
  title: "Equivalent Fractions: Number Lines",
  unit: "GRADE 4 · TOPIC 8 · LESSON 8-2 · 4.NF.A.1",
  math: M,
  ixl: ["WQL", "CLW"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "A line from 0 to 1 with a point marked on it. No question yet.",
      goal: "An invitation — every student has something to say.",
      pull: "That point is going to collect several names.",
      rail: { launch: "I am not asking what the point is called. Just describe the line.",
        monitor: ["Counting the steps", "Noticing 0 and 1", "Spotting the halfway point"],
        connect: "Who noticed something nobody else did?",
        misconception: "Counting tick marks instead of intervals." } },

    { phase: "launch", title: "Salma stopped <em>halfway</em>",
      lead: "The track is marked in quarters. She stopped at the halfway point. Estimate which mark.",
      goal: "Create the need — the same place can be named more than one way.",
      pull: "Cut the line differently and the name changes.",
      rail: { launch: "Point at the halfway mark. Now read its label. Are they the same thing?",
        monitor: ["Saying one half", "Saying two quarters", "Arguing which is right"],
        connect: "Can both names be correct at once?",
        misconception: "Believing a point can only have one correct name." } },

    { phase: "monitor", title: "Cut the line <em>differently</em>",
      lead: "Two steps, four steps, six steps. Watch the gold point.",
      goal: "Equivalence on a line is one location, several labels.",
      pull: "Stack the lines and see it all at once.",
      rail: { launch: "Predict the new name before you tap.",
        monitor: ["Counting steps to the point", "Doubling both numbers", "Losing the point"],
        connect: "What stayed the same every time?",
        misconception: "Thinking the point moves when the cuts change." } },

    { phase: "monitor", title: "Stack the <em>lines</em>",
      lead: "Three lines, one vertical cut through all of them.",
      goal: "Aligned lines make equivalence undeniable.",
      pull: "Now match some equivalent pairs.",
      rail: { launch: "Predict where the vertical line will cross the next one.",
        monitor: ["Aligning the lines", "Reading each label", "Checking the distance from zero"],
        connect: "Why does one vertical line hit all three points?",
        misconception: "Comparing labels instead of positions." } },

    { phase: "monitor", title: "Same point or <em>not</em>?",
      lead: "Sort each pair. No grading until the class commits.",
      goal: "Apply the test to unfamiliar pairs.",
      pull: "Two students found the same equivalence differently.",
      rail: { launch: "Sketch a quick line before you decide.",
        monitor: ["Sketching to check", "Doubling to check", "Guessing"],
        connect: "Which pair was hardest, and why?",
        misconception: "Assuming any two fractions with even numbers are equivalent." } },

    { phase: "connect", title: "Two ways to <em>be sure</em>",
      lead: "Lubna measured from zero. Tamer counted steps. Both say one half is three sixths.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Measuring distance", "Counting steps", "Doing both"],
        connect: "Whose way works without drawing anything?",
        misconception: "Believing you must always draw to be sure." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Three lines. Three names. One distance from zero.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next line", "Watching the vertical", "Restating it in their own words"],
        connect: "Who can say the rule in one sentence?",
        misconception: "Memorising the three fractions instead of the idea." } },

    { phase: "synth", title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming the same-point test", "Testing on thirds", "Linking back to the bar"],
        connect: "How is this the same as yesterday's bars?",
        misconception: "Treating lines and bars as two different rules." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.", pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Sketch the line before you answer.",
        monitor: ["Doubling both numbers", "Counting sixths", "Guessing"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Answering 2/6 by doubling only the denominator." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Tomorrow: making equivalent fractions without drawing at all.",
      rail: { launch: "Ask three students to say the rule in their own words.",
        monitor: ["Able to explain it to someone else", "Still needs the line", "Ready to multiply"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [den, setDen] = useState(2);
    const [n, setN] = useState(1);

    switch (i) {
      case 0:
        return <NoticeWonder draw={makeLine(4)} height={252} award={award}
          notices={["It goes from 0 to 1", "There are four steps", "A point is marked", "The point is halfway"]}
          wonders={["What is that point called?", "Could it have another name?", "What if there were more steps?"]} />;

      case 1:
        return <LaunchEstimate draw={drawTrack} height={256} award={award}
          label="Which quarter mark is halfway?" min={1} max={4} start={2} unit="/ 4"
          after="Locked. Now let us cut the line other ways."
          note="One half and two quarters might be the same place." />;

      case 2:
        return <ExploreChips draw={makeLine(den)} height={252}
          label="Cut the line into ..."
          value={den}
          onPick={(v) => setDen(v)}
          chips={[{ v: 2, label: "2 steps" }, { v: 4, label: "4 steps" }, { v: 6, label: "6 steps" }]}
          caption={<MathEl omml={den === 2 ? M.half : den === 4 ? M.twoFourths : M.threeSixths} size="xl" display="block" />}
          footnote="More steps, smaller steps, same distance from zero." />;

      case 3:
        return <ExploreChips draw={makeStackLines(n)} height={252}
          label="Stack the lines"
          value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 1, label: "halves" }, { v: 2, label: "+ quarters" }, { v: 3, label: "+ sixths" }]}
          caption={<MathEl omml={M.chain} size="xl" display="block" />}
          footnote="If the points line up, the fractions are equivalent." />;

      case 4:
        return <CardSort award={award} columns={2}
          items={[
            { id: "l1", text: "1/2 and 4/8", target: "yes" },
            { id: "l2", text: "1/4 and 2/6", target: "no" },
            { id: "l3", text: "1/3 and 2/6", target: "yes" },
            { id: "l4", text: "2/3 and 3/4", target: "no" }
          ]}
          targets={[
            { id: "yes", label: "same point on the line" },
            { id: "no", label: "different points" }
          ]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Lubna's way — measure from zero", omml: M.samePoint, h: 92,
                  quote: "It is the same distance along, so it is the same number." }}
          right={{ name: "Tamer's way — count the steps", omml: M.chain, h: 92,
                   quote: "Three of the six steps is the same as one of the two." }}
          same={["Both say the point is unchanged", "Both use the same line", "Both get three sixths"]}
          diff={["Lubna measures, Tamer counts", "Tamer's works without a ruler", "Lubna's shows why instantly"]} />;

      case 6:
        return <BoardScreen draw={drawBoard82} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "equivalent fractions land on the same point" }]}
          hand={"same distance from zero \u00b7 same number \u00b7 the name depends only on how you cut the line"}
          cards={[
            { title: "The point we named", omml: M.chain, note: "three names, one place" },
            { title: "Tap to try thirds", omml: M.half, revealOmml: M.thirds, reveal: true,
              note: "the same idea with a different cut" }
          ]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="On a line cut into sixths, which point is the same as two thirds?"
          omml={M.swyk}
          options={[{ v: "a", text: "2/6" }, { v: "b", text: "4/6" }, { v: "c", text: "3/6" }, { v: "d", text: "5/6" }]}
          right="b"
          support={{
            yes: "Yes — 2/3 = 4/6. Both numbers doubled.",
            notYet: "Not yet — count the sixths up to two thirds.",
            draw: drawSupport82, h: 78,
            hint: "Each third is two sixths, so two thirds is four sixths."
          }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Draw a line from 0 to 1 at home, cut it two different ways, and mark the same point twice." />;

      default: return null;
    }
  }
};
