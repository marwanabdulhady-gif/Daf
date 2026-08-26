/* ===========================================================================
   SAVVAS enVision Mathematics · Grade 4 · Topic 1
   LESSON 1-3 · Compare Whole Numbers                 Standard: 4.NBT.A.2
   I can ... compare two multi-digit numbers using place value, and record the
            comparison with the symbols for greater than, less than or equal.
   Story beat: "Two districts, one clinic" — both lead (role rotation resumes).
   =========================================================================== */

const M = {
  pair: om(mt("394,284>328,234")),
  pairLess: om(mt("328,234<394,284")),
  sameStart: om(mt("6,716>6,714")),
  equalPair: om(mt("12,050=12,050")),
  firstDiff: om(mnor("compare the first place that is "), mt("different")),
  swykAnswer: om(mt("350,072>305,072"))
};

/* ---- lesson-specific drawings ------------------------------------------- */

/* Cold open / launch: two district cards, each claiming to be bigger */
const drawClaim = (ctx, W, H, frame) => {
  const f = frame % 640;
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const cards = [
    { name: "EAST DISTRICT", num: "394,284", col: "#388C46", x: 18, a: D.at(f, 0, 240) },
    { name: "WEST DISTRICT", num: "328,234", col: "#2D70B3", x: W / 2 + 10, a: D.at(f, 160, 400) }
  ];
  const cw = W / 2 - 32;
  cards.forEach((c) => {
    if (c.a <= 0) return;
    ctx.save();
    ctx.globalAlpha = c.a;
    D.rr(ctx, c.x, 40, cw, H - 84, 12);
    ctx.fillStyle = "rgba(255,255,255,.05)"; ctx.fill();
    ctx.strokeStyle = c.col; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, c.name, c.x + cw / 2, 68, { size: 12, col: c.col, font: "mono", weight: 700, alpha: c.a });
    D.txt(ctx, c.num, c.x + cw / 2, 112, { size: 30, col: "#EAF4F2", font: "marker", alpha: c.a });
  });
  const claim = D.at(f, 300, 460);
  if (claim > 0) {
    D.txt(ctx, "“WE are the bigger district!”", W / 2, H - 44,
      { size: 15, col: "#C9A227", font: "marker", alpha: claim });
    D.txt(ctx, "both cards cannot be right — only evidence can settle it", W / 2, H - 20,
      { size: 12, col: "rgba(234,244,242,.6)", font: "marker", alpha: D.at(f, 380, 520) });
  }
};

/* two numbers aligned in a chart, scanning left to right */
const makeScanner = (step, onTap) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = "394284", b = "328234";
  const cw = Math.min(52, (W - 90) / 6), x0 = W / 2 - (6 * cw) / 2;
  const yA = 74, yB = 132;
  for (let i = 0; i < 6; i++) {
    const cx = x0 + i * cw + cw / 2;
    if (onTap) D.tap(ctx, { x: x0 + i * cw, y: yA - 26, w: cw, h: 84, value: i, on: onTap });
    const scanned = i < step;
    const active = i === step;
    const dim = i > step;
    const col = dim ? "rgba(234,244,242,.28)" : scanned ? "rgba(234,244,242,.62)" : "#EAF4F2";
    if (active) {
      ctx.save();
      ctx.globalAlpha = 0.55 + Math.sin(frame / 12) * 0.3;
      D.rr(ctx, cx - cw / 2 + 2, yA - 26, cw - 4, 84, 8);
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
    }
    D.txt(ctx, a[i], cx, yA, { size: 30, col: active ? "#C9A227" : col, font: "marker" });
    D.txt(ctx, b[i], cx, yB, { size: 30, col: active ? "#C9A227" : col, font: "marker" });
    if (scanned) D.txt(ctx, "same", cx, yB + 34, { size: 9.5, col: "rgba(52,211,153,.75)", font: "mono", weight: 700 });
  }
  if (step === 1) {
    D.txt(ctx, "9 is greater than 2 — stop here", W / 2, yB + 72, { size: 16, col: "#C9A227", font: "marker" });
    D.txt(ctx, "394,284 is the greater number", W / 2, H - 22, { size: 15, col: "#34D399", font: "marker" });
  } else if (step === 0) {
    D.txt(ctx, "start at the greatest place", W / 2, yB + 72, { size: 15, col: "#EAF4F2", font: "marker" });
  } else {
    D.txt(ctx, "we already knew at the ten thousands place", W / 2, yB + 72,
      { size: 13, col: "rgba(234,244,242,.55)", font: "marker" });
  }
};

/* number line check: further right means greater */
const drawLinePlace = (ctx, W, H, frame) => {
  const CYCLE = 520, f = frame % CYCLE;
  const p1 = D.at(f, 0, 110), p2 = D.at(f, 100, 240), p3 = D.at(f, 240, 360);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const x = 56, w = W - 112, y = H / 2 + 10;
  const lo = 300000, hi = 400000;
  const px = (n) => x + ((n - lo) / (hi - lo)) * w;
  D.marker(ctx, [[x, y], [x + w, y]], p1, "rgba(234,244,242,.75)", 2.4);
  if (p1 > 0.6) {
    [[lo, "300,000"], [hi, "400,000"]].forEach((t) => {
      ctx.save(); ctx.strokeStyle = "#EAF4F2"; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(px(t[0]), y - 12); ctx.lineTo(px(t[0]), y + 12); ctx.stroke(); ctx.restore();
      D.txt(ctx, t[1], px(t[0]), y + 32, { size: 12, col: "#EAF4F2", font: "marker" });
    });
  }
  [[328234, "328,234", "#2D70B3", p2], [394284, "394,284", "#388C46", p3]].forEach((pt) => {
    if (pt[3] <= 0) return;
    ctx.save();
    ctx.globalAlpha = pt[3];
    ctx.beginPath(); ctx.arc(px(pt[0]), y, 7, 0, Math.PI * 2);
    ctx.fillStyle = pt[2]; ctx.fill();
    ctx.restore();
    D.txt(ctx, pt[1], px(pt[0]), y - 26, { size: 14, col: pt[2], font: "marker", alpha: pt[3] });
  });
  if (p3 > 0.8) D.txt(ctx, "further right means greater", W / 2, H - 18,
    { size: 13, col: "#C9A227", font: "marker" });
};

/* Board: the first-different-place rule */
const drawBoard13 = (ctx, W, H, frame) => {
  const CYCLE = 720, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "How do we compare two big numbers?" });
  const p1 = D.at(f, 20, 140), p2 = D.at(f, 140, 300), p3 = D.at(f, 300, 460), p4 = D.at(f, 460, 600);
  const a = "394284", b = "328234";
  const cw = 54, x0 = W / 2 - (6 * cw) / 2, yA = 120, yB = 176;
  for (let i = 0; i < 6; i++) {
    const aa = D.at(p1, i / 6, i / 6 + 0.4);
    if (aa <= 0) continue;
    const cx = x0 + i * cw + cw / 2;
    D.txt(ctx, a[i], cx, yA, { size: 30, col: "#EAF4F2", font: "marker", alpha: aa });
    D.txt(ctx, b[i], cx, yB, { size: 30, col: "#EAF4F2", font: "marker", alpha: aa });
  }
  if (p2 > 0) {
    const same = D.at(p2, 0, 0.5);
    D.rr(ctx, x0 + 2, yA - 24, cw - 4, (yB - yA) + 48, 8);
    ctx.strokeStyle = "rgba(52,211,153,.6)"; ctx.lineWidth = 2;
    ctx.globalAlpha = same; ctx.stroke(); ctx.globalAlpha = 1;
    D.txt(ctx, "same — keep going", x0 + cw / 2, yB + 44, { size: 11, col: "#34D399", font: "marker", alpha: same });
    const diff = D.at(p2, 0.5, 1);
    const cx = x0 + cw * 1.5;
    D.rr(ctx, x0 + cw + 2, yA - 24, cw - 4, (yB - yA) + 48, 8);
    ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2;
    ctx.globalAlpha = diff; ctx.stroke(); ctx.globalAlpha = 1;
    D.txt(ctx, "9 beats 2 — stop", cx, yB + 44, { size: 12, col: "#C9A227", font: "marker", alpha: diff });
  }
  if (p3 > 0) {
    D.marker(ctx, [[W / 2, yB + 66], [W / 2, yB + 92]], p3, "#C9A227", 2);
    D.txt(ctx, "394,284 > 328,234", W / 2, yB + 112,
      { size: 19, col: "#EAF4F2", font: "marker", alpha: p3 });
  }
  if (p4 > 0) {
    const yb = H - 44;
    D.marker(ctx, [[60, yb - 26], [W - 60, yb - 26]], p4, "rgba(201,162,39,.45)", 1.6);
    D.txt(ctx, "start at the greatest place; compare the first place that is different",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 540, 640), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport13 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = "305072", b = "350072";
  const cw = 44, x0 = W / 2 - (6 * cw) / 2;
  for (let i = 0; i < 6; i++) {
    const cx = x0 + i * cw + cw / 2;
    const diff = i === 1;
    if (diff) {
      D.rr(ctx, cx - cw / 2 + 2, 12, cw - 4, H - 24, 8);
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.stroke();
    }
    D.txt(ctx, a[i], cx, 30, { size: 18, col: diff ? "#C9A227" : "#EAF4F2", font: "marker" });
    D.txt(ctx, b[i], cx, 56, { size: 18, col: diff ? "#C9A227" : "#EAF4F2", font: "marker" });
  }
  D.txt(ctx, "first difference: 0 vs 5", W / 2, H - 10, { size: 11, col: "#C9A227", font: "marker" });
};

/* ---- the lesson ---------------------------------------------------------- */
const LESSON = {
  code: "1-3",
  storageKey: "daf-g4-t1-l3",
  title: "Compare Whole Numbers",
  unit: "GRADE 4 · TOPIC 1 · LESSON 1-3 · 4.NBT.A.2",
  math: M,
  ixl: ["6Y2", "USN", "94E"],

  metas: [
    {
      phase: "warmup",
      title: "Two districts, <em>one claim each</em>",
      lead: "Two district cards surface in the lantern projection — and both of them claim to be the bigger district.",
      goal: "Notice that both claims cannot be true and that evidence, not volume, settles it.",
      pull: "The council needs a comparison it can defend.",
      rail: {
        launch: "Fictional frame. Ask only: what do the two cards both claim, and can both be right?",
        monitor: ["Noticing both cards claim bigger", "Comparing digit counts", "Wonding what settles it"],
        connect: "What kind of evidence would settle a claim like this?",
        misconception: "Thinking the louder or flashier card wins."
      }
    },
    {
      phase: "launch",
      title: "The council must place the <em>first clinic</em>",
      lead: "East district says 394,284 people; West district says 328,234. Lock a prediction: how many places must we check?",
      goal: "Predict where the comparison will be decided before scanning.",
      pull: "The district figures are simulated planning data.",
      rail: {
        launch: "State that the district counts are simulated planning data.",
        monitor: ["Predicting the deciding place", "Noticing the shared 3", "Arguing from the left"],
        connect: "Why start at the greatest place rather than the smallest?",
        misconception: "Comparing from the ones place because it is easier to read."
      }
    },
    {
      phase: "monitor",
      title: "Zayd scans <em>from the left</em>",
      lead: "His scanner highlights one place at a time. The class chooses where the numbers first differ.",
      goal: "Find the first differing place and stop there.",
      pull: "Every earlier place said 'same' — that is evidence too.",
      rail: {
        launch: "Predict the deciding place before the scan reveals it.",
        monitor: ["Checking places left to right", "Saying 'same' for equal places", "Stopping at the first difference"],
        connect: "Why can we stop instead of checking every digit?",
        misconception: "Adding up digits from both numbers to compare totals."
      }
    },
    {
      phase: "monitor",
      title: "Omar checks on the <em>number line</em>",
      lead: "A different representation, the same verdict: further right means greater.",
      goal: "Confirm the chart comparison with a second representation.",
      pull: "Two representations agreeing is stronger evidence.",
      rail: {
        launch: "Ask where each district sits before the dots appear.",
        monitor: ["Placing numbers on the line", "Reading distance as magnitude", "Matching both representations"],
        connect: "Which representation settled it faster for you — and why?",
        misconception: "Placing by how long the number looks when written."
      }
    },
    {
      phase: "monitor",
      title: "Three claims need <em>symbols</em>",
      lead: "The council's record must use >, < or =. Commit to all three comparisons before the folio checks.",
      goal: "Record comparisons with symbols, including different digit counts and equal pairs.",
      pull: "One pair has a zero doing important work.",
      rail: {
        launch: "Do not grade until the class commits to all three symbols.",
        monitor: ["Comparing digit counts first", "Scanning same-length pairs", "Accepting equality as an answer"],
        connect: "Which comparison surprised you most?",
        misconception: "Judging 1,000 smaller than 999 'because it has a zero in it' — digit count beats zeros."
      }
    },
    {
      phase: "connect",
      title: "The class brings <em>two methods</em>",
      lead: "The boys step back. Real student strategies for comparing take the board.",
      goal: "Compare methods and name the reusable rule in the Sijill.",
      pull: "One method has a shortcut — and a limit.",
      rail: {
        launch: "Replace the sample names with students from this room when possible.",
        monitor: ["Digit-count shortcut vs full scan", "Checking where the shortcut fails", "Explaining both"],
        connect: "When does the digit-count shortcut fail, and what do you fall back on?",
        misconception: "Believing one method is the only correct way to compare."
      }
    },
    {
      phase: "synth",
      title: "The rule enters the <em>Evidence Folio</em>",
      lead: "Start at the greatest place; compare the first place that is different.",
      goal: "Build the comparison rule publicly from the strategies just compared.",
      pull: "The clinic placement now rests on a defensible record.",
      rail: {
        launch: "Draw with the class rather than presenting a finished rule.",
        monitor: ["Restating the rule", "Applying it to a new pair", "Using symbols correctly"],
        connect: "Which part of the rule prevents comparing from the wrong end?",
        misconception: "Comparing the first digits only, without checking they are the same."
      }
    },
    {
      phase: "swyk",
      title: "Can the council place the <em>clinic</em>?",
      lead: "A supply card is smudged: is the district 305,072 or 350,072 — and which reading is the greater number?",
      goal: "Use the first-different-place rule independently with embedded zeros.",
      pull: "A defended comparison stamps the third fragment of Folio 1.",
      rail: {
        launch: "Two minutes. Require the deciding place, not only an option letter.",
        monitor: ["Scanning from the greatest place", "Reading the zero in the ten-thousands", "Naming the deciding place"],
        connect: "Which place decided it — and what was doing the work there?",
        misconception: "Letting the zero in 305,072 feel like 'nothing' instead of a place that holds 0 ten-thousands."
      }
    },
    {
      phase: "connect",
      title: "Fragment three is <em>restored</em>",
      lead: "The clinic goes to the bigger district — on evidence. Then the supply ledger raises a new problem.",
      goal: "Close with a transfer task and the estimation cliffhanger.",
      pull: "Next: exact totals arrive too late — the council needs a useful estimate now.",
      rail: {
        launch: "Name the artifact contribution, then reveal only the next mathematical need.",
        monitor: ["Explaining the deciding place", "Using symbols", "Ready to estimate"],
        connect: "Where does your community compare two numbers to make a decision?",
        misconception: "Remembering the clinic story but not the comparison rule."
      }
    }
  ],

  Visual: function ({ i, award, game }) {
    const [step, setStep] = useState(0);
    const [linePick, setLinePick] = useState(0);

    switch (i) {
      case 0:
        return (
          <StoryShell lane="fiction" character="lantern"
            title="Two districts, one claim each"
            text="Omar and Zayd lift two district cards from the census folio. Each one claims to be the bigger district. The lantern shows the numbers — and refuses to pick a side."
            clue="Claims are not evidence. What is?">
            <NoticeWonder draw={drawClaim} height={238} award={award}
              notices={["Both cards claim 'bigger'", "Both numbers have six digits", "They share the first digit", "One claim must be wrong"]}
              wonders={["How do we know which number is really larger?", "Do we need every digit to decide?", "What if one number had more digits?"]}
              footnote="The claim is the story. The comparison is the mathematics." />
          </StoryShell>
        );

      case 1:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="The clinic goes to the bigger district"
            text="Omar marks the district counts as simulated planning data — then asks how far the council must scan before the claim settles."
            clue="Lock a prediction before the scanner moves">
            <LaunchEstimate draw={drawClaim} height={235} award={award}
              label="How many places must we check before 394,284 and 328,234 settle?"
              min={1} max={6} start={4} unit="places"
              after="Locked. Now scan and see where the evidence lands."
              note="District counts here are simulated planning data — the rule works on any pair." />
          </StoryShell>
        );

      case 2:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="Zayd's scanner starts at the left"
            text="He can highlight any place, but the class must name the first place that differs before the scan confirms it."
            clue="Same is evidence too — it tells you to keep going">
            <ExploreChips draw={makeScanner(step, setStep)} height={225}
              label="Where do the two numbers first differ?"
              value={step}
              onPick={(v) => setStep(v)}
              chips={[{ v: 0, label: "hundred thousands" }, { v: 1, label: "ten thousands" }, { v: 2, label: "thousands" }, { v: 3, label: "hundreds" }]}
              caption={<MathEl omml={M.pair} size="lg" display="block" />}
              footnote="Start at the greatest place; stop at the first difference." />
          </StoryShell>
        );

      case 3:
        return (
          <StoryShell lane="fiction" character="omar"
            title="Omar checks on the number line"
            text="A second representation, the same verdict. He wants both methods agreeing before the council hears one answer."
            clue="Further right means greater">
            <ExploreChips draw={drawLinePlace} height={225}
              label="Which district sits further right?"
              value={linePick}
              onPick={(v) => setLinePick(v)}
              chips={[{ v: 0, label: "East · 394,284" }, { v: 1, label: "West · 328,234" }]}
              caption={<MathEl omml={M.pairLess} size="lg" display="block" />}
              footnote="Two representations agreeing is stronger evidence than either alone." />
          </StoryShell>
        );

      case 4:
        return (
          <StoryShell lane="fiction" character="both" pose="question"
            title="The record needs symbols, not words"
            text="Omar reads each pair aloud while Zayd places the symbol. The class must commit to all three before the folio checks."
            clue="One pair has different digit counts. One pair is equal.">
            <CardSort award={award} columns={3} commitLabel="Seal the comparison record"
              items={[
                { id: "s1", text: "4,697,000  vs  999,999", target: "t1" },
                { id: "s2", text: "4,679,000  vs  4,697,000", target: "t2" },
                { id: "s3", text: "12,050  vs  12,050", target: "t3" }
              ]}
              targets={[
                { id: "t1", label: ">" },
                { id: "t2", label: "<" },
                { id: "t3", label: "=" }
              ]} />
          </StoryShell>
        );

      case 5:
        return (
          <StoryShell lane="fiction" character="both" pose="present"
            title="Omar and Zayd step out of the way"
            text="The strongest comparison methods now come from students in this room. Compare them, then preserve one in the Sijill."
            clue="One method has a shortcut — and a limit">
          <CompareConnect award={award}
            left={{
              name: "Hani's way — count digits first", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 400, 0, 140);
                D.txt(ctx, "4,697,000 has 7 digits", W / 2, H / 2 - 14, { size: 16, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "999,999 has 6 digits", W / 2, H / 2 + 12, { size: 16, col: "#EAF4F2", font: "marker", alpha: D.at(frame % 400, 120, 240) });
                D.txt(ctx, "7 digits beats 6 digits — done", W / 2, H / 2 + 38, { size: 12, col: "#C9A227", font: "marker", alpha: D.at(frame % 400, 220, 330) });
              },
              quote: "Different digit counts? The longer one is greater."
            }}
            right={{
              name: "Khalid's way — scan the first difference", h: 88,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 400, 0, 140);
                D.txt(ctx, "4,6 7 9,000 vs 4,6 9 7,000", W / 2, H / 2 - 8, { size: 17, col: "#EAF4F2", font: "marker", alpha: p });
                D.txt(ctx, "same… same… 7 vs 9 → stop", W / 2, H / 2 + 22, { size: 12, col: "#34D399", font: "marker", alpha: D.at(frame % 400, 160, 280) });
              },
              quote: "Same length? Scan left and stop at the first difference."
            }}
            same={["Both start at the greatest place",
                   "Both use place value, not size of writing",
                   "Both can be checked on the number line"]}
            diff={["Hani's shortcut needs different digit counts",
                   "Khalid's scan works for every pair",
                   "When the counts match, Hani falls back to Khalid's scan"]} />
          </StoryShell>
        );

      case 6:
        return (
          <StoryShell lane="fiction" character="zayd" pose="build"
            title="The shared rule is drawn into the Evidence Folio"
            text="Zayd builds only what the class can justify from the two student methods."
            clue="Greatest place first · first difference decides">
            <BoardScreen draw={drawBoard13} height={380}
              caption="The comparison rule — not a claim — places the clinic." />
          </StoryShell>
        );

      case 7:
        return (
          <StoryShell lane="fiction" character="omar" pose="question"
            title="Omar defends the record the council will sign"
            text="A smudged supply card leaves two readings. Name the greater number — and the place that decided it."
            clue="The zero is holding a place, not disappearing">
            <ShowWhatYouKnow award={award}
              prompt="The card reads 305,072 or 350,072. Which is the greater number?"
              options={[{ v: "a", text: "305,072" }, { v: "b", text: "350,072" }, { v: "c", text: "They are equal" }, { v: "d", text: "Cannot be compared" }]}
              right="b"
              support={{
                yes: "Yes — the ten-thousands places differ first: 5 beats 0, so 350,072 is greater.",
                notYet: "Not yet — scan from the greatest place. Which place is the first to differ?",
                draw: drawSupport13, h: 84,
                hint: "The zero in 305,072 holds the ten-thousands place open."
              }} />
          </StoryShell>
        );

      case 8:
        return (
          <StoryHandoff
            title="The comparison is sealed"
            text="The clinic goes to the bigger district — on evidence the council can re-check. Then Zayd opens the supply ledger: exact totals will arrive too late."
            artifact="Population and services brief · clinic placement record"
            next="Exact counts arrive too late — the council needs a useful estimate now.">
            <Closing game={game} omml={M.swykAnswer}
              action="Compare two real numbers (distances, prices, populations). Record which place settled it and write the comparison with a symbol." />
          </StoryHandoff>
        );

      default:
        return null;
    }
  }
};
