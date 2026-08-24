/* ===========================================================================
   SAVVAS enVision Mathematics · Grade 4 · Topic 1
   LESSON 1-5 · Problem Solving: Construct Arguments     Standard: MP.3
   I can ... construct a math argument about place value, and critique the
            reasoning of others.
   =========================================================================== */

const M = {
  claim: om(mt("13,637"), mnor(" and "), mt("13,533")),
  evidence: om(mt("600>500")),
  conclusion: om(mt("13,637>13,533")),
  weakClaim: om(mnor("it just looks bigger")),
  digitCount: om(mnor("both have "), mt("5"), mnor(" digits")),
  swykPair: om(mt("28,405"), mnor(" and "), mt("28,450")),
  swykAnswer: om(mt("28,405<28,450")),
  tensPlace: om(mt("0<5")),
  goodArgument: om(mnor("claim"), mt("+"), mnor("evidence"), mt("+"), mnor("conclusion"))
};

/* ---- drawings ------------------------------------------------------------ */

/* Warm-Up: two speech bubbles, one with numbers and one without */
const drawTwoClaims = (ctx, W, H, frame) => {
  const CYCLE = 560, f = frame % CYCLE;
  const p1 = D.at(f, 0, 120), p2 = D.at(f, 120, 260), p3 = D.at(f, 270, 380);
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();

  const bubble = (x, y, w, h, col, a) => {
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, x, y, w, h, 12);
    ctx.fillStyle = "rgba(234,244,242,.05)";
    ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 24, y + h); ctx.lineTo(x + 38, y + h + 14); ctx.lineTo(x + 46, y + h);
    ctx.fillStyle = "rgba(234,244,242,.05)"; ctx.fill(); ctx.stroke();
    ctx.restore();
  };

  const bw = W / 2 - 34;
  bubble(22, 34, bw, 96, "#C74440", p1);
  D.fig(ctx, 60, H - 34, "#C74440", p1);
  D.txt(ctx, "Gerald", 60, H - 10, { size: 11, col: "#C74440", font: "marker", alpha: p1 });
  if (p2 > 0) {
    D.txt(ctx, "My city is bigger.", 22 + bw / 2, 66, { size: 15, col: "#EAF4F2", font: "marker", alpha: p2 });
    D.txt(ctx, "The number just looks bigger.", 22 + bw / 2, 96,
      { size: 12.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: p2 });
  }

  bubble(W / 2 + 12, 34, bw, 96, "#388C46", p1);
  D.fig(ctx, W / 2 + 50, H - 34, "#388C46", p1);
  D.txt(ctx, "Emily", W / 2 + 50, H - 10, { size: 11, col: "#388C46", font: "marker", alpha: p1 });
  if (p3 > 0) {
    D.txt(ctx, "My city is bigger.", W / 2 + 12 + bw / 2, 60, { size: 15, col: "#EAF4F2", font: "marker", alpha: p3 });
    D.txt(ctx, "13,637 and 13,533 match until", W / 2 + 12 + bw / 2, 86,
      { size: 12, col: "#C9A227", font: "marker", alpha: p3 });
    D.txt(ctx, "the hundreds, and 600 beats 500.", W / 2 + 12 + bw / 2, 106,
      { size: 12, col: "#C9A227", font: "marker", alpha: p3 });
  }
};

/* Monitor A: an argument assembling from the pieces the student picks */
const makeArgument = (picked) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const rows = [
    { key: "claim", label: "Claim", text: "Gerald's city has more people.", col: "#6042A6" },
    { key: "numbers", label: "Numbers", text: "13,637 and 13,533", col: "#2D70B3" },
    { key: "place", label: "Place value", text: "They match until the hundreds place.", col: "#FA7E19" },
    { key: "compare", label: "Compare", text: "600 is greater than 500.", col: "#C9A227" },
    { key: "conclusion", label: "So", text: "13,637 is greater than 13,533.", col: "#388C46" }
  ];
  let y = 34;
  rows.forEach((r) => {
    const on = picked.indexOf(r.key) !== -1;
    ctx.save();
    ctx.globalAlpha = on ? 1 : 0.22;
    D.rr(ctx, 26, y, W - 52, 34, 8);
    ctx.fillStyle = on ? "rgba(234,244,242,.07)" : "rgba(234,244,242,.03)";
    ctx.fill();
    ctx.strokeStyle = on ? r.col : "rgba(234,244,242,.15)";
    ctx.lineWidth = on ? 1.8 : 1;
    ctx.stroke();
    ctx.restore();
    D.txt(ctx, r.label, 74, y + 17, { size: 11, col: r.col, font: "mono", weight: 700, alpha: on ? 1 : 0.3 });
    D.txt(ctx, on ? r.text : "…", W / 2 + 44, y + 17,
      { size: 13.5, col: "#EAF4F2", font: "marker", alpha: on ? 1 : 0.25 });
    y += 42;
  });
  const done = picked.length === 5;
  D.txt(ctx, done ? "that is a complete argument" : "a claim on its own is not an argument",
    W / 2, H - 16, { size: 13, col: done ? "#34D399" : "rgba(234,244,242,.55)", font: "marker" });
};

/* Monitor B: spot the gap in a flawed argument */
const makeCritique = (found) => (ctx, W, H, frame) => {
  D.rr(ctx, 0, 0, W, H, 14);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  D.txt(ctx, "Gerald's argument", W / 2, 28, { size: 13, col: "#C74440", font: "marker" });
  const lines = [
    { t: "Both numbers have 5 digits.", ok: true },
    { t: "So they are about the same size.", ok: true },
    { t: "Mine starts with 1 and so does hers.", ok: true },
    { t: "So my city must be bigger.", ok: false }
  ];
  let y = 66;
  lines.forEach((l, n) => {
    const flagged = found && !l.ok;
    ctx.save();
    ctx.globalAlpha = 1;
    D.rr(ctx, 30, y - 15, W - 60, 32, 7);
    ctx.fillStyle = flagged ? "rgba(199,68,64,.18)" : "rgba(234,244,242,.04)";
    ctx.fill();
    if (flagged) {
      ctx.strokeStyle = "#C74440"; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.restore();
    D.txt(ctx, l.t, W / 2, y + 2, { size: 13.5, col: "#EAF4F2", font: "marker" });
    y += 42;
  });
  D.txt(ctx, found ? "the last step has no evidence behind it"
                   : "which step does not follow from the one before?",
    W / 2, H - 18, { size: 13, col: found ? "#C74440" : "#C9A227", font: "marker" });
};

/* Board: the anatomy of a good argument */
const drawBoard15 = (ctx, W, H, frame) => {
  const CYCLE = 780, f = frame % CYCLE;
  D.board(ctx, W, H, { t: frame, title: "What makes an argument, not a guess?" });
  const stages = [
    { p: [20, 150], label: "Claim", text: "Gerald's city has more people.", col: "#6042A6" },
    { p: [140, 290], label: "Evidence", text: "13,637 and 13,533 — hundreds place: 600 and 500", col: "#2D70B3" },
    { p: [280, 430], label: "Reason", text: "The first place that differs decides it.", col: "#FA7E19" },
    { p: [420, 570], label: "Conclusion", text: "So 13,637 is greater than 13,533.", col: "#388C46" }
  ];
  let y = 96;
  stages.forEach((s) => {
    const a = D.at(f, s.p[0], s.p[1]);
    if (a <= 0) { y += 74; return; }
    ctx.save();
    ctx.globalAlpha = a;
    D.rr(ctx, 62, y - 22, W - 124, 52, 9);
    ctx.strokeStyle = s.col; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    D.txt(ctx, s.label, 118, y + 3, { size: 12.5, col: s.col, font: "mono", weight: 700, alpha: a });
    D.txt(ctx, s.text, W / 2 + 52, y + 3, { size: 14, col: "#EAF4F2", font: "marker", alpha: a });
    if (y > 96) {
      D.marker(ctx, [[W / 2, y - 44], [W / 2, y - 26]], a, "rgba(201,162,39,.6)", 2);
    }
    y += 74;
  });
  const p4 = D.at(f, 560, 700);
  if (p4 > 0) {
    const yb = H - 38;
    D.txt(ctx, "numbers · place value · a conclusion that answers the question",
      W / 2, yb, { size: 15, col: "#C9A227", font: "marker", alpha: p4 });
    D.star8(ctx, W - 46, yb - 2, 16, D.at(f, 620, 720), "rgba(201,162,39,.7)", 1.6);
  }
};

const drawSupport15 = (ctx, W, H) => {
  ctx.clearRect(0, 0, W, H);
  D.rr(ctx, 0, 0, W, H, 10);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  const a = "28405", b = "28450";
  const cw = Math.min(40, (W - 40) / 5), x0 = W / 2 - (5 * cw) / 2;
  for (let i = 0; i < 5; i++) {
    const cx = x0 + i * cw + cw / 2;
    const same = a[i] === b[i];
    D.txt(ctx, a[i], cx, 26, { size: 21, col: same ? "rgba(234,244,242,.5)" : "#C9A227", font: "marker" });
    D.txt(ctx, b[i], cx, 58, { size: 21, col: same ? "rgba(234,244,242,.5)" : "#C9A227", font: "marker" });
  }
  D.txt(ctx, "tens place", x0 + 3.5 * cw, 80, { size: 10, col: "#C9A227", font: "mono", weight: 700 });
};

/* ---- the lesson ---------------------------------------------------------- */
const LESSON = {
  code: "1-5",
  storageKey: "daf-g4-t1-l5",
  title: "Problem Solving: Construct Arguments",
  unit: "GRADE 4 · TOPIC 1 · LESSON 1-5 · MP.3",
  math: M,
  ixl: ["EFV", "XVJ"],

  metas: [
    { phase: "warmup",
      title: "What do you <em>notice</em>? What do you <em>wonder</em>?",
      lead: "Two students say the same thing. One of them shows their thinking.",
      goal: "An invitation — every student has something to say.",
      pull: "Both said the same words. Only one of them said why.",
      rail: { launch: "I am not asking who is right. Just tell me what you see.",
        monitor: ["Noticing one has numbers", "Noticing both make the same claim", "Noticing the word because is missing"],
        connect: "Who noticed something nobody else did?",
        misconception: "Deciding who is right before reading the reasoning." } },

    { phase: "launch",
      title: "Is <em>it looks bigger</em> a reason?",
      lead: "Gerald says his city is bigger because the number looks bigger. Is that enough?",
      goal: "Create the need — a claim without evidence convinces nobody.",
      pull: "Let us build an argument that would convince Gerald.",
      rail: { launch: "Would that convince you? Turn and tell your partner.",
        monitor: ["Accepting it", "Rejecting it without saying why", "Asking to see the numbers"],
        connect: "What would Gerald have to add to convince you?",
        misconception: "A confident voice counts as evidence. Do not correct it — ask what would change their mind." } },

    { phase: "monitor",
      title: "Build the <em>argument</em>",
      lead: "Add one piece at a time. Watch when it starts to convince you.",
      goal: "An argument has parts, and each one does a job.",
      pull: "Now let us look at an argument that is missing a part.",
      rail: { launch: "Add the pieces in any order. Say out loud when it becomes convincing.",
        monitor: ["Starting with the claim", "Starting with the numbers", "Leaving out the conclusion"],
        connect: "Which piece made the biggest difference?",
        misconception: "Thinking more sentences means a stronger argument." } },

    { phase: "monitor",
      title: "Find the <em>gap</em>",
      lead: "Every line here is true. One of them still does not follow.",
      goal: "Critique the reasoning of others — the other half of MP.3.",
      pull: "True sentences are not the same as a proof.",
      rail: { launch: "Read it line by line. Where does it stop making sense?",
        monitor: ["Checking each line is true", "Looking for the jump", "Rewriting the last line"],
        connect: "What evidence is missing from the last line?",
        misconception: "If every sentence is true the argument must be valid." } },

    { phase: "monitor",
      title: "Argument or <em>guess</em>?",
      lead: "Sort each statement. No grading until the class commits.",
      goal: "Tell evidence apart from opinion.",
      pull: "Two students wrote the same argument different lengths.",
      rail: { launch: "Read each card out loud before you place it.",
        monitor: ["Looking for numbers", "Looking for the word because", "Checking it answers the question"],
        connect: "What did every good one have in common?",
        misconception: "Counting length as quality." } },

    { phase: "connect",
      title: "Two ways to <em>convince</em>",
      lead: "Rana wrote three sentences. Adel wrote one. Both are complete.",
      goal: "The comparison produces the rule — not the teacher.",
      pull: "Now we put it on the board.",
      rail: { launch: "Show both without judging either.",
        monitor: ["Finding the evidence in both", "Preferring the longer one", "Noticing the short one still names the place"],
        connect: "What does the short argument still contain?",
        misconception: "Longer is always better." } },

    { phase: "synth",
      title: "On the <em>board</em>",
      lead: "Claim. Evidence. Reason. Conclusion. Each one earns its place.",
      goal: "The moment the lesson is taught — not displayed.",
      pull: "Say it in one sentence.",
      rail: { launch: "Draw it with them, do not present it to them.",
        monitor: ["Predicting the next box", "Naming the missing piece", "Restating it in their own words"],
        connect: "Who can say what makes an argument in one sentence?",
        misconception: "Treating the four boxes as a form to fill in rather than a way to think." } },

    { phase: "synth",
      title: "The rule — <em>and why it works</em>",
      lead: "One sentence worth memorising.",
      goal: "Generalise after the model, never before it.",
      pull: "Show what you know — one question only.",
      rail: { launch: "Read it together, one voice.",
        monitor: ["Naming all three parts", "Testing it on their own writing", "Asking about arguments with pictures"],
        connect: "Can a drawing be evidence?",
        misconception: "Believing only words count as an argument." } },

    { phase: "swyk",
      title: "<em>Show</em> what you know",
      lead: "One question. Quick for you, useful for your teacher.",
      goal: "A daily formative check.",
      pull: "Well done. Let us see what you collected today.",
      rail: { launch: "Two minutes. Choose the argument, then say why the others fail.",
        monitor: ["Checking for numbers", "Checking the place value reason", "Checking the conclusion"],
        connect: "Collect responses to open tomorrow.",
        misconception: "Choosing the longest option." } },

    { phase: "connect",
      title: "What you <em>collected</em> today",
      lead: "Points are for thinking, not for speed.",
      goal: "Close on one action a student can actually do tonight.",
      pull: "Next topic: adding and subtracting multi-digit numbers.",
      rail: { launch: "Ask three students to say what makes an argument.",
        monitor: ["Able to explain it to someone else", "Still needs the four boxes", "Ready for Topic 2"],
        connect: "Who is teaching it at home tonight?",
        misconception: "Chasing points instead of understanding." } }
  ],

  Visual: function ({ i, award, game }) {
    const [picked, setPicked] = useState([]);
    const [found, setFound] = useState(false);
    const order = ["claim", "numbers", "place", "compare", "conclusion"];

    switch (i) {
      case 0:
        return (
          <NoticeWonder draw={drawTwoClaims} height={262} award={award}
            notices={["They say the same thing", "Only one shows numbers", "One says because", "One mentions the hundreds place"]}
            wonders={["Which one would convince a friend?", "Is a loud claim enough?", "What is missing on the left?"]}
            footnote="Both students may be right. Only one of them has shown it." />
        );

      case 1:
        return (
          <LaunchEstimate draw={drawTwoClaims} height={262} award={award}
            label="How convincing is it looks bigger, out of 10?"
            min={0} max={10} start={5} unit="/ 10"
            after="Locked. Now let us build something that would score a 10."
            note="A claim tells you what someone thinks. An argument tells you why." />
        );

      case 2:
        return (
          <ExploreChips draw={makeArgument(picked)} height={270}
            label="Add a piece to the argument"
            value={null}
            onPick={(v) => {
              if (picked.indexOf(v) !== -1) return;
              const next = picked.concat([v]);
              setPicked(next);
            }}
            chips={order.map((k) => ({
              v: k,
              label: (picked.indexOf(k) !== -1 ? "✓ " : "+ ") +
                     ({ claim: "Claim", numbers: "Numbers", place: "Place value", compare: "Compare", conclusion: "Conclusion" })[k]
            }))}
            caption={<MathEl omml={M.conclusion} size="xl" display="block" />}
            footnote="Evidence is what turns a claim into an argument." />
        );

      case 3:
        return (
          <div className="glass-panel" style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
            <Sketch draw={makeCritique(found)} height={258} />
            <div style={{ textAlign: "center" }}>
              <button className="btn btn-primary" disabled={found}
                style={{ opacity: found ? 0.5 : 1 }}
                onClick={() => { setFound(true); }}>
                <Icon name="fa-magnifying-glass" /> Show the step that does not follow
              </button>
            </div>
            <div className="glass-card" style={{ cursor: "default", textAlign: "center", background: "var(--daf-mint)" }}>
              <MathEl omml={M.digitCount} size="lg" display="block" />
              <div style={{ fontSize: "11px", color: "var(--daf-ink-2)", marginTop: "6px" }}>
                Same number of digits tells you they are close. It does not tell you which is greater.
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <CardSort award={award} columns={2} commitLabel="The class is ready — check"
            items={[
              { id: "a1", text: "600 is greater than 500, so 13,637 wins", target: "arg" },
              { id: "a2", text: "It just looks bigger to me", target: "guess" },
              { id: "a3", text: "I counted the digits and guessed", target: "guess" },
              { id: "a4", text: "They match until the hundreds place", target: "arg" }
            ]}
            targets={[
              { id: "arg", label: "an argument — it uses numbers and place value" },
              { id: "guess", label: "a guess — no evidence behind it" }
            ]} />
        );

      case 5:
        return (
          <CompareConnect award={award}
            left={{ name: "Rana's way — three sentences", h: 96,
              draw: (ctx, W, H, frame) => {
                ctx.clearRect(0, 0, W, H);
                D.rr(ctx, 0, 0, W, H, 9);
                ctx.fillStyle = "#0B1F24"; ctx.fill();
                const p = D.at(frame % 420, 0, 180);
                const lines = ["Both start with 13,", "then 6 hundreds beats 5 hundreds,", "so 13,637 is greater."];
                lines.forEach((t, n) => {
                  const a = D.at(p, n / 3, n / 3 + 0.4);
                  D.txt(ctx, t, W / 2, 26 + n * 26, { size: 12.5, col: "#EAF4F2", font: "marker", alpha: a });
                });
              },
              quote: "I walked through it step by step." }}
            right={{ name: "Adel's way — one sentence", omml: M.evidence, h: 96,
              quote: "The hundreds place decides it: 600 beats 500." }}
            same={["Both name the hundreds place", "Both use real numbers", "Both reach the same conclusion"]}
            diff={["Rana shows every step", "Adel trusts the reader to know the rule",
                   "Rana's is easier to follow the first time"]} />
        );

      case 6:
        return <BoardScreen draw={drawBoard15} height={430} />;

      case 7:
        return (
          <RuleScreen award={award}
            ommls={[{ omml: M.goodArgument, alt: "claim plus evidence plus conclusion" }]}
            hand={"say what you think · show the numbers and the place value · finish with a conclusion that answers the question"}
            cards={[
              { title: "The argument we built", omml: M.conclusion, note: "decided at the hundreds place" },
              { title: "Tap to see the evidence", omml: M.claim, revealOmml: M.evidence, reveal: true,
                note: "the numbers are the evidence" }
            ]} />
        );

      case 8:
        return (
          <ShowWhatYouKnow award={award}
            prompt="Which is the complete argument that 28,450 is greater than 28,405?"
            omml={M.swykPair}
            options={[
              { v: "a", text: "It is bigger" },
              { v: "b", text: "5 tens beats 0 tens" },
              { v: "c", text: "Both have 5 digits" },
              { v: "d", text: "I checked twice" }
            ]}
            right="b"
            support={{
              yes: "Yes — it names the deciding place and compares the values there.",
              notYet: "Not yet — which place is the first one that differs?",
              draw: drawSupport15, h: 92,
              hint: "The gold digits are the first ones that differ. What are they worth?"
            }} />
        );

      case 9:
        return (
          <Closing game={game} omml={M.goodArgument}
            action="Make a claim about two numbers at home, then give one piece of evidence for it." />
        );

      default:
        return null;
    }
  }
};
