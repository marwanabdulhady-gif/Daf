/* ===========================================================================
   Grade 4 · Topic 14 · LESSON 14-1 · Number Sequences
   Standard 4.OA.C.5   I can ... continue a number sequence from its rule, and
   describe a feature of the sequence the rule did not mention.
   =========================================================================== */

const M = {
  rule: om(mnor("start at 4 and add 6 each time")),
  seq: om(mnor("4 \u00b7 10 \u00b7 16 \u00b7 22 \u00b7 28 \u00b7 34")),
  hidden: om(mnor("every term is even, and the rule never said so")),
  shrink: om(mnor("start at 60 and subtract 8 each time")),
  shrinkSeq: om(mnor("60 \u00b7 52 \u00b7 44 \u00b7 36 \u00b7 28 \u00b7 20")),
  gap: om(mnor("the gap between terms is always the rule")),
  law: om(mnor("follow the rule \u00b7 then look for what it did not tell you")),
  swyk: om(mnor("start at 3, add 5. what is the fifth term?")),
  swykAnswer: om(mnor("3 \u00b7 8 \u00b7 13 \u00b7 18 \u00b7 23"))
};

const SEQ141 = [4, 10, 16, 22, 28, 34];

/* the sequence built on a number line, with the gaps drawn */
const makeSeq141 = (n) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 62, w = W - 124, y = 128;
  const max = 36;
  const px = (v) => x + (v / max) * w;

  D.marker(ctx, [[x, y], [x + w, y]], 1, "rgba(234,244,242,.8)", 2.2);
  for (let v = 0; v <= max; v += 4) {
    ctx.save();
    ctx.strokeStyle = "rgba(234,244,242,.35)"; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(px(v), y - 6); ctx.lineTo(px(v), y + 6); ctx.stroke();
    ctx.restore();
    D.txt(ctx, String(v), px(v), y + 22,
      { size: 10, col: "rgba(234,244,242,.5)", font: "mono", weight: 600 });
  }

  for (let k = 0; k < n; k++) {
    const v = SEQ141[k];
    const a = Math.min(1, Math.max(0, (frame / 5 - k * 6) / 12)) * 0.4 + 0.6;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(px(v), y, 7, 0, Math.PI * 2);
    ctx.fillStyle = v % 2 === 0 ? "#2D70B3" : "#C74440";
    ctx.fill();
    ctx.restore();
    D.txt(ctx, String(v), px(v), y - 22, { size: 13, col: "#EAF4F2", font: "marker", alpha: a });
    if (k > 0) {
      const from = px(SEQ141[k - 1]), to = px(v);
      const pts = [];
      for (let s = 0; s <= 14; s++) {
        const t = s / 14;
        pts.push([from + (to - from) * t, y + 34 + Math.sin(Math.PI * t) * 20]);
      }
      D.marker(ctx, pts, 1, "#388C46", 1.8);
      D.txt(ctx, "+6", (from + to) / 2, y + 68,
        { size: 11, col: "#388C46", font: "mono", weight: 700 });
    }
  }

  D.txt(ctx, "start at 4 and add 6 each time", W / 2, 30,
    { size: 14, col: "#C9A227", font: "marker" });
  const pulse = 0.5 + Math.sin(frame / 15) * 0.3;
  D.txt(ctx, n >= 6 ? "every single term landed on an even number"
       : "the jump never changes \u2014 that is what the rule means",
    W / 2, H - 12, { size: 13, col: n >= 6 ? "#34D399" : "rgba(234,244,242,.65)",
      font: "marker", alpha: pulse + 0.4 });
};

/* growing versus shrinking sequences */
const makeDir141 = (dir) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const seqs = {
    up: { vals: [4, 10, 16, 22, 28, 34], rule: "start at 4, add 6", col: "#388C46",
      note: "the terms grow \u2014 the rule adds" },
    down: { vals: [60, 52, 44, 36, 28, 20], rule: "start at 60, subtract 8", col: "#C74440",
      note: "the terms shrink \u2014 the rule subtracts" },
    dbl: { vals: [3, 6, 12, 24, 48, 96], rule: "start at 3, double", col: "#6042A6",
      note: "the gaps grow too \u2014 this rule multiplies" }
  };
  const j = seqs[dir];
  D.txt(ctx, j.rule, W / 2, 30, { size: 15, col: "#C9A227", font: "marker" });
  const bw = (W - 80) / 6;
  j.vals.forEach((v, k) => {
    const a = Math.min(1, Math.max(0, (frame / 5 - k * 5) / 12)) * 0.35 + 0.65;
    const bx = 40 + k * bw;
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, bx + 5, 66, bw - 10, 46, 8);
    ctx.strokeStyle = j.col; ctx.lineWidth = 1.8; ctx.stroke();
    ctx.restore();
    D.txt(ctx, String(v), bx + bw / 2, 92,
      { size: bw > 60 ? 20 : 16, col: j.col, font: "marker", alpha: a });
    if (k > 0) {
      const g = j.vals[k] - j.vals[k - 1];
      D.txt(ctx, (g > 0 ? "+" : "") + g, bx - 1, 134,
        { size: 11.5, col: "rgba(234,244,242,.6)", font: "mono", weight: 700, alpha: a });
    }
  });
  D.txt(ctx, "the gaps", 40 + bw * 0.32, 134,
    { size: 10.5, col: "rgba(234,244,242,.4)", font: "mono", weight: 600 });
  D.txt(ctx, j.note, W / 2, H - 30, { size: 14, col: j.col, font: "marker" });
  D.txt(ctx, dir === "dbl" ? "not every rule adds the same amount"
       : "the gap and the rule are the same thing",
    W / 2, H - 10, { size: 12, col: "rgba(234,244,242,.65)", font: "marker" });
};

const drawWarm141 = (ctx, W, H, frame) => {
  const CYCLE = 600, f = frame % CYCLE;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "a list that knows where it is going", W / 2, 28,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: D.at(f, 0, 90) });
  const vals = ["4", "10", "16", "22", "?", "?"];
  const bw = (W - 80) / 6;
  vals.forEach((v, k) => {
    const a = D.at(f, 50 + k * 65, 160 + k * 65);
    D.txt(ctx, v, 40 + k * bw + bw / 2, 116,
      { size: 28, col: v === "?" ? "#C9A227" : "#6042A6", font: "marker", alpha: a });
  });
  D.txt(ctx, "no question yet \u2014 just look", W / 2, H - 12,
    { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 480, 570) });
};

const drawStory141 = (ctx, W, H, frame) => {
  const CYCLE = 620, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p3 = D.at(f, 390, 530);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "chairs for the school assembly", W / 2, 22,
    { size: 12.5, col: "#C9A227", font: "marker", alpha: p1 });
  for (let row = 0; row < 4; row++) {
    const count = 4 + row * 6;
    const a = D.at(f, 60 + row * 70, 180 + row * 70);
    if (a <= 0) continue;
    const cw = Math.min(14, (W - 160) / 22);
    for (let c = 0; c < count; c++) {
      ctx.save();
      ctx.globalAlpha = a * 0.8;
      D.rr(ctx, 62 + c * (cw + 2), 52 + row * 32, cw, 18, 3);
      ctx.fillStyle = "#FA7E19"; ctx.fill();
      ctx.restore();
    }
    D.txt(ctx, "row " + (row + 1) + ": " + count, W - 74, 61 + row * 32,
      { size: 11.5, col: "rgba(234,244,242,.7)", font: "mono", weight: 600, alpha: a });
  }
  if (p3 > 0) {
    D.txt(ctx, "each row has six more chairs. how many in row six?",
      W / 2, H - 14, { size: 13.5, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

const drawBoard141 = (ctx, W, H, frame) => {
  const CYCLE = 940, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "Follow the rule, then look harder" });
  const p3 = D.at(f, 520, 720), p4 = D.at(f, 740, 920);
  const x = 150, w = W - 300, y = 190;
  const px = (v) => x + (v / 36) * w;

  D.txt(ctx, "start at 4 and add 6 each time", W / 2, 100,
    { size: 18, col: "#C9A227", font: "marker", alpha: D.at(f, 20, 180) });

  D.marker(ctx, [[x, y], [x + w, y]], D.at(f, 120, 300), "rgba(234,244,242,.8)", 2.2);
  SEQ141.forEach((v, k) => {
    const a = D.at(f, 200 + k * 55, 300 + k * 55);
    if (a <= 0) return;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(px(v), y, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#2D70B3"; ctx.fill();
    ctx.restore();
    D.txt(ctx, String(v), px(v), y - 22, { size: 14, col: "#EAF4F2", font: "marker", alpha: a });
  });

  if (p3 > 0) {
    D.txt(ctx, "every term is even \u2014 and the rule never mentioned even numbers",
      W / 2, 268, { size: 16, col: "#388C46", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    D.txt(ctx, "a sequence always tells you more than its rule does",
      W / 2, 320, { size: 19, col: "#C9A227", font: "marker", alpha: p4 });
    D.txt(ctx, "start even, add even \u2014 it can never become odd",
      W / 2, H - 24, { size: 14, col: "rgba(234,244,242,.75)", font: "marker", alpha: D.at(f, 810, 910) });
    D.star8(ctx, W - 44, H - 28, 14, D.at(f, 850, 930), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport141 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const vals = [3, 8, 13, 18, 23];
  const bw = (W - 40) / 5;
  vals.forEach((v, k) => {
    D.txt(ctx, String(v), 20 + k * bw + bw / 2, 34,
      { size: 20, col: k === 4 ? "#34D399" : "#2D70B3", font: "marker" });
    if (k > 0) D.txt(ctx, "+5", 20 + k * bw, 66,
      { size: 10.5, col: "rgba(234,244,242,.6)", font: "mono", weight: 700 });
  });
  D.txt(ctx, "five terms, four jumps of five", W / 2, H - 6,
    { size: 11, col: "#C9A227", font: "marker" });
};

const LESSON = {
  code: "14-1",
  storageKey: "daf-g4-t14-l1",
  title: "Number Sequences",
  unit: "GRADE 4 · TOPIC 14 · LESSON 14-1 · 4.OA.C.5",
  math: M,
  ixl: ["DWF", "C9H", "35J"],

  metas: [
    { phase: "warmup", title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Four numbers appear, then two question marks. No question yet.",
      goal: "Let the class find the jump before it is named.",
      pull: "Every gap here is identical.",
      rail: { launch: "Describe the list. Do not fill in the question marks yet.",
        monitor: ["Naming the gap", "Noticing all the terms are even", "Reading it aloud"],
        connect: "What is the same about every jump?",
        misconception: "Looking for a pattern in the digits instead of the gaps." } },

    { phase: "launch", title: "Chairs for the <em>assembly</em>",
      lead: "Row one has 4 chairs, and each row has six more than the one before. Estimate how many chairs are in row six.",
      goal: "Create the need to follow a rule several steps.",
      pull: "Now let us walk it out.",
      rail: { launch: "Commit to a number before you calculate.",
        monitor: ["Adding six repeatedly", "Multiplying by six", "Losing count of the rows"],
        connect: "How many jumps are there between row one and row six?",
        misconception: "Making six jumps to reach the sixth term instead of five." } },

    { phase: "monitor", title: "Walk the <em>rule</em>",
      lead: "Start at four. Add six. Again. Watch the gaps as well as the terms.",
      goal: "The rule and the gap are shown to be the same thing.",
      pull: "But not every rule adds.",
      rail: { launch: "Predict the next term before you tap.",
        monitor: ["Adding six each time", "Noticing the constant gap", "Noticing every term is even"],
        connect: "Did anybody notice something the rule never mentioned?",
        misconception: "Believing the gap changes as the numbers get bigger." } },

    { phase: "monitor", title: "Up, down, or <em>doubling</em>",
      lead: "Three rules, three very different sequences.",
      goal: "A rule can add, subtract or multiply.",
      pull: "Now judge some continuations.",
      rail: { launch: "Predict what the gaps will do in each one.",
        monitor: ["Reading the gaps", "Spotting the shrinking sequence", "Spotting the growing gaps"],
        connect: "Which sequence has gaps that are not all the same?",
        misconception: "Assuming every sequence has a constant gap." } },

    { phase: "monitor", title: "Right or <em>wrong</em>?",
      lead: "Sort each continuation. No grading until the class commits.",
      goal: "Practise applying a rule correctly, including off-by-one.",
      pull: "Two students found the sixth term differently.",
      rail: { launch: "For each one, check the gap between the last two terms.",
        monitor: ["Checking the gap", "Recomputing", "Checking the direction"],
        connect: "Explain the rejected ones out loud.",
        misconception: "Applying the rule an extra time." } },

    { phase: "connect", title: "Two ways to reach <em>term six</em>",
      lead: "Bashir added six five times. Ziad worked out five jumps of six and added it to four.",
      goal: "Repeated addition and a single multiplication agree.",
      pull: "Let us put it on the board.",
      rail: { launch: "Show both. Ask why five jumps and not six.",
        monitor: ["Adding repeatedly", "Multiplying the jumps", "Counting the jumps carefully"],
        connect: "Why is it five jumps to reach the sixth term?",
        misconception: "Multiplying by six because it is the sixth term." } },

    { phase: "synth", title: "On the <em>board</em>",
      lead: "Four, ten, sixteen, twenty two. Every one of them even, and the rule never said so.",
      goal: "The moment the hidden-feature idea is taught.",
      pull: "Say it in one sentence.",
      rail: { launch: "Plot the terms with them, then ask what else they see.",
        monitor: ["Predicting terms", "Spotting the evenness", "Explaining why it must stay even"],
        connect: "Why can this sequence never produce an odd number?",
        misconception: "Believing the rule tells you everything about the sequence." } },

    { phase: "synth", title: "The rule \u2014 <em>and why it works</em>",
      lead: "Two jobs: follow the rule, then look for what it hid.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know \u2014 one question.",
      rail: { launch: "Read it aloud, once, together.",
        monitor: ["Following the rule", "Counting the jumps", "Naming a hidden feature"],
        connect: "What hidden feature would 'start at 5, add 10' have?",
        misconception: "Stopping as soon as the terms are written." } },

    { phase: "swyk", title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check on applying a rule.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. How many jumps to the fifth term?",
        monitor: ["Making four jumps", "Making five jumps", "Writing out the terms"],
        connect: "Collect answers to open tomorrow.",
        misconception: "Answering 28 by making five jumps instead of four." } },

    { phase: "connect", title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action for tonight.",
      pull: "Tomorrow: writing the rule when only the numbers are given.",
      rail: { launch: "Three students name a hidden feature they found.",
        monitor: ["Follows and inspects", "Only follows", "Ready to find rules"],
        connect: "Who is making a sequence at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [n, setN] = useState(2);
    const [dir, setDir] = useState("up");

    switch (i) {
      case 0:
        return <NoticeWonder draw={drawWarm141} height={256} award={award}
          notices={["The gap is always six", "All the numbers are even", "It keeps growing", "It starts at four"]}
          wonders={["What comes next?", "Will it ever be odd?", "What is the tenth one?"]} />;

      case 1:
        return <LaunchEstimate draw={drawStory141} height={256} award={award}
          label="How many chairs in row six?" min={4} max={60} start={20} unit="chairs"
          after="Locked. Now let us walk the rule out."
          note="Row one has four, and every row after adds another six." />;

      case 2:
        return <ExploreChips draw={makeSeq141(n)} height={256}
          label="Add one term at a time" value={n}
          onPick={(v) => setN(v)}
          chips={[{ v: 2, label: "2 terms" }, { v: 4, label: "4 terms" }, { v: 6, label: "6 terms" }]}
          caption={<MathEl omml={M.hidden} size="xl" display="block" />}
          footnote="Watch the gaps underneath as much as the numbers above." />;

      case 3:
        return <ExploreChips draw={makeDir141(dir)} height={256}
          label="Three different rules" value={dir}
          onPick={(v) => setDir(v)}
          chips={[{ v: "up", label: "add 6" }, { v: "down", label: "subtract 8" }, { v: "dbl", label: "double" }]}
          caption={<MathEl omml={M.gap} size="lg" display="block" />}
          footnote="A rule can add, take away, or multiply — the gaps tell you which." />;

      case 4:
        return <CardSort award={award} columns={2}
          commitLabel="The class is ready — check"
          items={[{ id: "a1", text: "4, 10, 16, 22 → next is 28", target: "yes" },
                  { id: "a2", text: "4, 10, 16, 22 → next is 26", target: "no" },
                  { id: "a3", text: "60, 52, 44 → next is 36", target: "yes" },
                  { id: "a4", text: "60, 52, 44 → next is 40", target: "no" }]}
          targets={[{ id: "yes", label: "correct — the gap held" },
                    { id: "no", label: "not yet — check the gap" }]} />;

      case 5:
        return <CompareConnect award={award}
          left={{ name: "Bashir's way — add it five times", omml: M.seq, h: 92,
            quote: "Four, ten, sixteen, twenty two, twenty eight, thirty four." }}
          right={{ name: "Ziad's way — five jumps at once", omml: M.rule, h: 92,
            quote: "Five jumps of six is thirty, and four plus thirty is thirty four." }}
          same={["Both give 34", "Both use five jumps", "Both start at four"]}
          diff={["Bashir writes every term", "Ziad multiplies", "Ziad's works for the hundredth term"]} />;

      case 6:
        return <BoardScreen draw={drawBoard141} height={430} />;

      case 7:
        return <RuleScreen award={award}
          ommls={[{ omml: M.law, alt: "follow the rule, then look for what it did not tell you" }]}
          hand={"apply the rule · count the jumps carefully · then look for a hidden feature"}
          cards={[{ title: "The sequence we built", omml: M.seq, note: "start at 4, add 6" },
                  { title: "Tap for a shrinking one", omml: M.shrink, revealOmml: M.shrinkSeq, reveal: true,
                    note: "the rule can subtract just as easily" }]} />;

      case 8:
        return <ShowWhatYouKnow award={award}
          prompt="Start at 3 and add 5 each time. What is the fifth term?" omml={M.swyk}
          options={[{ v: "a", text: "18" }, { v: "b", text: "23" }, { v: "c", text: "28" }, { v: "d", text: "15" }]}
          right="b"
          support={{ yes: "Yes — four jumps of five from three gives twenty three.",
            notYet: "Not yet — there are four jumps between the first and fifth terms.",
            draw: drawSupport141, h: 96, hint: "3, 8, 13, 18, 23 — count the terms, not the jumps." }} />;

      case 9:
        return <Closing game={game} omml={M.law}
          action="Invent a rule, write six terms, and find something true about them the rule never said." />;

      default: return null;
    }
  }
};
