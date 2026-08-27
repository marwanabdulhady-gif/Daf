/* ===========================================================================
   Grade 4 · Topic 16 · LESSON 16-6 · Problem Solving: Critique Reasoning
   Standard MP.3 · 4.G.A   I can ... judge a geometry claim, and use a single
   counter-example to settle it.
   =========================================================================== */

const M = {
  claim: om(mnor("\u201call rectangles are squares\u201d")),
  counter: om(mnor("one shape that breaks the claim is enough")),
  example: om(mnor("a 6 by 2 rectangle is not a square \u2014 the claim fails")),
  everySome: om(mnor("\u201cevery\u201d needs a proof \u00b7 \u201csome\u201d needs one example")),
  goodClaim: om(mnor("\u201call squares are rectangles\u201d holds \u2014 no counter-example exists")),
  vague: om(mnor("\u201cit looks symmetrical\u201d is not evidence")),
  rule: om(mnor("to break a claim, find one shape \u00b7 to keep it, check the definition")),
  swyk: om(mnor("\u201call triangles with a right angle are isosceles\u201d")),
  swykAnswer: om(mnor("false \u2014 a 3, 4, 5 triangle breaks it"))
};

/* the claim, and the counter-example that kills it */
const makeCounter166 = (step) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "\u201call rectangles are squares\u201d", W / 2, 34,
    { size: 18, col: step >= 2 ? "#E0665F" : "#C9A227", font: "marker" });

  if (step >= 1) {
    const cx = W / 2 - 100, cy = H / 2 + 22;
    D.polyFig(ctx, { pts: [[cx - 96, cy - 32], [cx + 96, cy - 32], [cx + 96, cy + 32], [cx - 96, cy + 32]],
      prog: 1, col: "#2D70B3", rightAngles: [0, 1, 2, 3], sideTicks: [1, 2, 1, 2], fill: true });
    D.txt(ctx, "6 by 2 \u2014 a rectangle", cx, cy + 58,
      { size: 13, col: "#EAF4F2", font: "marker" });
  }
  if (step >= 2) {
    const pulse = 0.5 + Math.sin(frame / 13) * 0.3;
    D.txt(ctx, "but the sides are not all equal", W / 2 + 130, H / 2 + 4,
      { size: 14.5, col: "#E0665F", font: "marker", alpha: pulse + 0.4 });
    D.txt(ctx, "so it is not a square", W / 2 + 130, H / 2 + 30,
      { size: 14.5, col: "#E0665F", font: "marker" });
    D.txt(ctx, "one counter-example ends the argument", W / 2, H - 14,
      { size: 13.5, col: "#C9A227", font: "marker" });
  } else {
    D.txt(ctx, step === 0 ? "is this claim true?" : "find one shape that breaks it",
      W / 2, H - 14, { size: 13, col: "rgba(234,244,242,.65)", font: "marker" });
  }
};

/* four claims to judge */
const makeJudge166 = (key) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const claims = {
    a: { s: "all squares are rectangles", ok: true, why: "every square passes the rectangle test" },
    b: { s: "all rectangles are squares", ok: false, why: "a 6 by 2 rectangle breaks it" },
    c: { s: "every triangle has 3 sides", ok: true, why: "that is what triangle means" },
    d: { s: "every shape has a line of symmetry", ok: false, why: "a scalene triangle has none" }
  };
  const j = claims[key];
  D.txt(ctx, "\u201c" + j.s + "\u201d", W / 2, 46,
    { size: 19, col: j.ok ? "#34D399" : "#E0665F", font: "marker" });

  /* the evidence, drawn */
  const cx = W / 2, cy = H / 2 + 30, s = 44;
  if (key === "b") {
    D.polyFig(ctx, { pts: [[cx - 92, cy - 26], [cx + 92, cy - 26], [cx + 92, cy + 26], [cx - 92, cy + 26]],
      prog: 1, col: "#C74440", sideTicks: [1, 2, 1, 2], fill: true });
  } else if (key === "d") {
    D.polyFig(ctx, { pts: [[cx - 80, cy + 30], [cx - 12, cy - 40], [cx + 96, cy + 30]],
      prog: 1, col: "#C74440", fill: true });
  } else if (key === "a") {
    D.polyFig(ctx, { pts: [[cx - s, cy - s], [cx + s, cy - s], [cx + s, cy + s], [cx - s, cy + s]],
      prog: 1, col: "#388C46", rightAngles: [0, 1, 2, 3], sideTicks: [1, 1, 1, 1], fill: true });
  } else {
    D.polyFig(ctx, { pts: [[cx - 70, cy + 28], [cx, cy - 38], [cx + 70, cy + 28]],
      prog: 1, col: "#388C46", fill: true });
  }

  const pulse = 0.5 + Math.sin(frame / 14) * 0.3;
  D.txt(ctx, (j.ok ? "holds \u2014 " : "fails \u2014 ") + j.why, W / 2, H - 14,
    { size: 13.5, col: j.ok ? "#34D399" : "#E0665F", font: "marker", alpha: pulse + 0.4 });
};

const drawWarm166 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "four claims about shapes", W / 2, 26,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  const claims = ["all squares are rectangles", "all rectangles are squares",
    "every triangle has 3 sides", "every shape has a line of symmetry"];
  claims.forEach((s, k) => {
    const a = D.at(f, 50 + k * 90, 170 + k * 90);
    D.txt(ctx, "\u201c" + s + "\u201d", W / 2, 72 + k * 38,
      { size: 15, col: "#6042A6", font: "marker", alpha: a });
  });
  D.txt(ctx, "no verdicts yet \u2014 just read them", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 460, 550) });
};

const drawStory166 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "an argument in the Grade 4 classroom", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  D.txt(ctx, "Qais says: \u201call rectangles are squares\u201d", W / 2, 74,
    { size: 16, col: "#FA7E19", font: "marker", alpha: D.at(f, 60, 200) });
  D.txt(ctx, "Ziad says: \u201cno they are not\u201d", W / 2, 112,
    { size: 16, col: "#2D70B3", font: "marker", alpha: D.at(f, 200, 340) });
  if (p3 > 0) {
    D.txt(ctx, "how many shapes does Ziad need to draw to win?",
      W / 2, H - 12, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard166 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "One counter-example is enough" });
  const p1 = D.at(f, 20, 220), p2 = D.at(f, 240, 460), p3 = D.at(f, 480, 700), p4 = D.at(f, 720, 920);

  D.txt(ctx, "\u201call rectangles are squares\u201d", W / 2, 106,
    { size: 21, col: "#C9A227", font: "marker", alpha: p1 });

  if (p2 > 0) {
    const cx = W / 2 - 130, cy = 218;
    D.polyFig(ctx, { pts: [[cx - 120, cy - 40], [cx + 120, cy - 40], [cx + 120, cy + 40], [cx - 120, cy + 40]],
      prog: p2, col: "#2D70B3", rightAngles: [0, 1, 2, 3], sideTicks: [1, 2, 1, 2], fill: true });
    D.txt(ctx, "6 by 2", cx, cy + 68, { size: 15, col: "#EAF4F2", font: "marker", alpha: p2 });
  }
  if (p3 > 0) {
    D.txt(ctx, "four right angles \u2014 so it is a rectangle", W / 2 + 170, 190,
      { size: 15, col: "#34D399", font: "marker", alpha: p3 });
    D.txt(ctx, "sides are not all equal \u2014 so not a square", W / 2 + 170, 224,
      { size: 15, col: "#E0665F", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "the claim is false, and one shape proved it", W / 2, 320,
      { size: 19, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "to break an \u201call\u201d claim, find one \u00b7 to keep it, check the definition",
      W / 2, H - 24, { size: 14.5, col: "rgba(234,244,242,.78)", font: "marker", alpha: D.at(f, 810, 910) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 860, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport166 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cx = W / 2 - 40, cy = H / 2;
  D.polyFig(ctx, { pts: [[cx - 44, cy + 26], [cx - 44, cy - 30], [cx + 46, cy + 26]],
    prog: 1, col: "#C74440", rightAngles: [0], fill: true });
  D.txt(ctx, "a right angle, and no two sides equal", W / 2 + 100, cy,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "16-6",
  storageKey: "daf-g4-t16-l6",
  title: "Problem Solving: Critique Reasoning",
  unit: "GRADE 4 · TOPIC 16 · LESSON 16-6 · MP.3 · 4.G.A",
  math: M,
  ixl: ["C98", "SKK"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Four claims about shapes appear one at a time. No verdicts yet.",
      goal: "Get the claims into the room before anyone votes.",
      pull: "Two of these are true and two are not.",
      rail: { launch: "Read all four. Do not decide yet.",
        monitor: ["Spotting the reversed pair", "Reading 'every' carefully", "Recalling the hierarchy"],
        connect: "Which two claims are almost the same sentence?",
        misconception: "Reading 'all A are B' as 'all B are A'." } },

    { phase: "launch", title: "An argument in <em>class</em>",
      lead: "Qais claims all rectangles are squares. Ziad disagrees. Estimate how many shapes Ziad must draw to win.",
      goal: "Create the need for the counter-example idea.",
      pull: "Now let us find that one shape.",
      rail: { launch: "Commit to a number of shapes before we start.",
        monitor: ["Saying one", "Saying many", "Asking what would count"],
        connect: "Would drawing lots of rectangles help Qais?",
        misconception: "Believing you must check every shape to disprove a claim." } },

    { phase: "monitor", title: "One shape ends <em>it</em>",
      lead: "Find a rectangle that is not a square and the claim is finished.",
      goal: "A single counter-example disproves an 'all' claim.",
      pull: "Now judge four claims.",
      rail: { launch: "What would the shape have to look like?",
        monitor: ["Drawing a long rectangle", "Checking it is a rectangle", "Checking it is not a square"],
        connect: "Why does one shape settle it?",
        misconception: "Offering an example that is not a rectangle at all." } },

    { phase: "monitor", title: "Holds or <em>fails</em>?",
      lead: "Four claims. Two survive, two do not.",
      goal: "Practise deciding, with evidence attached.",
      pull: "Now sort some reasoning.",
      rail: { launch: "For each claim, try to break it first.",
        monitor: ["Searching for a counter-example", "Checking the definition", "Guessing"],
        connect: "Which claim was hardest to be sure about?",
        misconception: "Accepting a claim because no counter-example came to mind quickly." } },

    { phase: "monitor", title: "Sound or <em>not yet</em>?",
      lead: "Sort each piece of reasoning. No grading until the class commits.",
      goal: "Critique the argument, not the verdict.",
      pull: "Two students disagreed about a claim.",
      rail: { launch: "Ask of each one: what evidence is actually offered?",
        monitor: ["Naming the counter-example", "Citing the definition", "Arguing from appearance"],
        connect: "Which reasoning would convince a stranger?",
        misconception: "Treating 'it looks like it' as evidence." } },

    { phase: "connect", title: "Two ways to <em>settle it</em>",
      lead: "Anees drew a counter-example. Ibrahim quoted the definition of a square.",
      goal: "Breaking a claim and keeping one need different evidence.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask which one proves and which one disproves.",
        monitor: ["Using a counter-example", "Using a definition", "Noticing the difference"],
        connect: "Which method can never prove an 'all' claim true?",
        misconception: "Believing examples can prove an 'all' claim." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Four right angles makes it a rectangle. Unequal sides means it is not a square.",
      goal: "The moment the counter-example method is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw the counter-example with them and check both halves.",
        monitor: ["Checking it is a rectangle", "Checking it is not a square", "Stating the verdict"],
        connect: "Who can say why one shape is enough?",
        misconception: "Forgetting to check the example really is a rectangle." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Two different jobs, two different kinds of evidence.",
      goal: "Generalise the habit, not this verdict.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Choosing a counter-example", "Choosing a definition", "Stating the verdict"],
        connect: "How many examples prove an 'all' claim?",
        misconception: "Thinking three examples is a proof." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on counter-examples.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Try to break the claim first.",
        monitor: ["Finding a 3-4-5 triangle", "Accepting the claim", "Explaining the break"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Accepting the claim because the first example they picture is isosceles." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close the topic on a habit, not a fact.",
      pull: "Tomorrow: Topic 17 — the step up to Grade 5.",
      rail: { launch: "Three students give a counter-example to something.",
        monitor: ["Reaches for a counter-example", "Argues from appearance", "Ready for Grade 5"],
        connect: "Who is testing a claim at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [key, setKey] = useState("a");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm166} height={256} award={award}
          notices={["Two claims are about rectangles and squares", "One is about triangles", "One says 'every shape'", "Two are the same words reversed"]}
          wonders={["Which ones are true?", "How would I prove one?", "Is one shape enough?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory166} height={256} award={award}
          label="How many shapes must Ziad draw to win?" min={1} max={20} start={5} unit="shapes"
          after="Locked. Now let us find the shape that settles it."
          note="Think about what would have to be true for Qais's claim to survive." />;

      case 2:
        return <ExploreChips draw={makeCounter166(step)} height={256}
          label="Build the counter-example" value={step}
          onPick={(v) => setStep(v)}
          chips={[{ v: 0, label: "the claim" }, { v: 1, label: "draw a rectangle" },
                  { v: 2, label: "check the sides" }]}
          caption={<MathEl omml={M.example} size="xl" display="block" />}
          footnote="The example must genuinely be a rectangle, or it proves nothing." />;

      case 3:
        return <ExploreChips draw={makeJudge166(key)} height={256}
          label="Judge each claim" value={key}
          onPick={(v) => setKey(v)}
          chips={[{ v: "a", label: "squares → rectangles" }, { v: "b", label: "rectangles → squares" },
                  { v: "c", label: "triangles have 3 sides" }, { v: "d", label: "every shape has symmetry" }]}
          caption={<MathEl omml={M.everySome} size="lg" display="block" />}
          footnote="Try to break every claim before you agree with it." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "f1", text: "a 6 by 2 rectangle disproves it", target: "yes" },
                  { id: "f2", text: "I drew three squares, so it is true", target: "no" },
                  { id: "f3", text: "the definition says four right angles", target: "yes" },
                  { id: "f4", text: "it looks right to me", target: "no" }]}
          targets={[{ id: "yes", label: "sound reasoning" },
                    { id: "no", label: "not yet — that is not evidence" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Anees's way — a counter-example", omml: M.counter, h: 92,
            quote: "I drew one rectangle that is not a square. The claim is dead." }}
          right={{ name: "Ibrahim's way — the definition", omml: M.goodClaim, h: 92,
            quote: "A square has four right angles and parallel sides, so it passes the rectangle test." }}
          same={["Both give real evidence", "Both name a specific reason", "Both settle a claim"]}
          diff={["Anees breaks a claim", "Ibrahim keeps one", "Only a definition can prove 'all'"]} />;

      case 6:
        return <BoardScreen draw={drawBoard166} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.rule, alt: "to break a claim find one shape; to keep it, check the definition" }]}
          hand={"try to break it first · one counter-example is enough · otherwise check the definition"}
          cards={[{ title: "The claim we broke", omml: M.example, note: "one shape did it" },
                  { title: "Tap for bad evidence", omml: M.everySome, revealOmml: M.vague, reveal: true,
                    note: "appearance is never a reason" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Is this true: all triangles with a right angle are isosceles?" omml={M.swyk}
          options={[{ v: "a", text: "true" }, { v: "b", text: "false — 3, 4, 5 breaks it" },
                    { v: "c", text: "true for small ones" }, { v: "d", text: "cannot be decided" }]}
          right="b"
          support={{ yes: "Yes — a 3, 4, 5 triangle has a right angle and no two equal sides.",
            notYet: "Not yet — try to find a right triangle whose sides are all different.",
            draw: drawSupport166, h: 96, hint: "One counter-example is all it takes." }} />;

      case 9:
        return <Closing game={game} omml={M.rule}
          action="Make an 'all shapes...' claim at home and challenge someone to break it." />;

      default: return null;
    }
  }
};
