# Dar Al Fikr · Interactive Math Slides Skill — English edition (`daf_math_slides_en.md`)

> **What this is.** The master specification for generating **single-file, highly interactive, gamified HTML math lessons** in the Dar Al Fikr Schools visual identity, **written and rendered entirely in English (LTR)**, structured on **The Seven Stages** (Preparation at home → Intelligent Diagnose → Knowledge Building → Practice → Production / B → Mastery Gate → Smart Production), with the Amplify Desmos Math routines as the component library inside those stages.
>
> It merges three parents:
> - **`html_slides_replicator`** — the single-file React + GSAP + Three.js engine, glassmorphism system, error boundaries, overview mini-map, and the Babel guardrails.
> - **Syntax Academy deck style** — one idea per screen, colour that shifts with the chapter, and *concepts that get **drawn** while they are explained* (live canvas, marker strokes, a real board).
> - **Amplify Desmos Math in Action** — problem-based, low-floor/high-ceiling, invitational routines, and *student thinking made visible* before the teacher names the math.
>
> **Two non-negotiables:**
> 1. **Every fraction, radical, exponent, operator and math symbol is authored in OMML.** See §5. No LaTeX. No PNG equations. No `<sup>3</sup>/<sub>4</sub>` hacks.
> 2. **English only.** One language, one direction, one string per label. No `{ar, en}` objects, no `dir` toggle, no RTL mirroring, no Eastern-Arabic numerals. See §2.
>
> *(There is a bilingual AR/EN sibling of this skill: `daf_math_slides.md`. Use that one when the deck must serve an Arabic-medium class. Do not mix the two.)*

---

## 0) ⛔️ Before you write a single line of code

**Ask, then wait for the answer.** A deck built on a guess is a deck built twice.

> **What is the lesson?** And tell me, if you know:
> - **Grade + strand** (e.g. Grade 6 · fractions · dividing by a unit fraction)
> - **The one thing students should be able to do at the end** — a single observable action
> - **Class length** — 45 min ⇒ 10–12 screens · 60 min ⇒ 14–16 screens
> - **Devices** — one shared projector, or a device per student/pair?

If the answer is broad (*"a deck about fractions"*), **narrow it with exactly one more question** before building. A lesson about all of fractions is a lesson about none of them.

Then **show the screen map** (screen title + lesson phase + interaction type + the math goal it serves) and get approval. **Only then build.**

### The one-sentence identity

> One `.html` file · Dar Al Fikr teal and gold · Islamic-geometry motifs · English, left-to-right · a 16:9 stage · colour that shifts with the lesson phase · **a live canvas on every concept screen that draws the math as it is explained** · a gamified XP/streak/badge layer · and **every symbol authored in OMML**.

**One lesson = one file.** Not a website. Not a landing page. Not a slide export.

---

## 1) Dar Al Fikr Design System

The Dar Al Fikr mark is a **teal eight-point Islamic star** beside a bilingual wordmark (مدارس دار الفكر · *The House Of Faith, Righteousness & Wisdom*). The deck inherits that: **calm teal ground, gold for honour and achievement, geometry for structure.**

### 1.1 Root tokens (paste verbatim)

```css
:root {
  /* ---- Dar Al Fikr brand ---- */
  --daf-teal:   #12857C;   /* primary — sampled from the school mark */
  --daf-teal-2: #1AA79B;   /* lighter twin, for gradients */
  --daf-deep:   #0A5F58;   /* deep teal — headers, footer bar */
  --daf-gold:   #C9A227;   /* achievement, badges, XP */
  --daf-gold-2: #E3C05A;
  --daf-ink:    #10242B;   /* primary text */
  --daf-ink-2:  #47616A;   /* secondary text */
  --daf-mint:   #E8F6F4;   /* tinted surface */
  --daf-paper:  #F7FBFA;   /* page ground */
  --daf-line:   #CDE7E3;   /* hairlines */
  --daf-grad:   linear-gradient(135deg, var(--daf-teal), var(--daf-teal-2));
  --daf-gold-grad: linear-gradient(135deg, var(--daf-gold), var(--daf-gold-2));

  /* ---- PHASE COLOUR — this is the variable that changes per screen ---- */
  --c:   #6042A6;
  --c-2: #8B6FD4;
  --c-grad: linear-gradient(90deg, var(--c), var(--c-2));

  /* ---- Desmos math-object palette (graphs, cards, manipulatives) ---- */
  --m-blue:   #2D70B3;
  --m-red:    #C74440;
  --m-green:  #388C46;
  --m-purple: #6042A6;
  --m-orange: #FA7E19;

  /* ---- feedback ---- */
  --ok:   #388C46;
  --warn: #E0A526;
  --stop: #C74440;

  --ease:   cubic-bezier(0.16, 1, 0.3, 1);
  --bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 1.2 Phase colours — colour tells you where you are in the lesson

Every screen sets `--c` / `--c-2` from its phase. **Nothing inside a screen may hard-code a colour** — it reads `var(--c)`.

The four **stage screens** (Preparation, Intelligent Diagnose, Practice, Production) have their own
phases; the working screens inside Knowledge Building and Smart Production keep the lesson phases
below. "Show What You Know" is now the **Mastery Gate** — same phase colour, new name, and it now
routes students.

| Lesson phase | Meaning | `--c` → `--c-2` |
|---|---|---|
| **Preparation** | Stage 1 — the compressed briefing, sent before class. | `#4A6FA5` → `#7292BE` |
| **Intelligent Diagnose** | Stage 2 — the gap map, not a grade. | `#6042A6` → `#8B6FD4` |
| **Warm-Up** | Invitation. Everyone can contribute. (Stage 3 cold open.) | `#6042A6` → `#8B6FD4` |
| **Launch** | Create the need. Build curiosity. | `#FA7E19` → `#FFA94D` |
| **Monitor / Explore** | Students work; thinking becomes visible. | `#2D70B3` → `#4A9BE0` |
| **Connect** | Strategies compared side by side. | `#12857C` → `#1AA79B` |
| **Synthesis** | The math gets named and boxed — the modelled example. | `#388C46` → `#5CB863` |
| **Practice** | Stage 4 — guided, then independent; feedback in seconds. | `#B3488F` → `#D87BB4` |
| **Production** | Stage 5 — the new situation and the critic. | `#C9A227` → `#E3C05A` |
| **Mastery Gate** | Stage 6 — one task that decides the next path. | `#C74440` → `#E0665F` |

### 1.3 Surfaces

Light, crisp, low-glare — projector-safe in a bright Jeddah classroom.

```css
body { background: linear-gradient(135deg, #F7FBFA 0%, #E8F6F4 55%, #F2FAF8 100%); }

.glass-panel {                       /* main visual container */
  background: rgba(255,255,255,.84);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--c) 22%, transparent);
  border-radius: 18px; padding: 24px;
  box-shadow: 0 20px 45px rgba(10,95,88,.08), 0 1px 2px rgba(255,255,255,.9) inset;
}

.glass-card {                        /* clickable student-facing card */
  background: rgba(255,255,255,.92);
  border: 1px solid var(--daf-line);
  border-radius: 14px; padding: 18px; cursor: pointer;
  transition: all .3s var(--ease);
}
.glass-card:hover, .glass-card.active {
  border-color: var(--c);
  transform: translateY(-3px);
  box-shadow: 0 16px 36px color-mix(in srgb, var(--c) 18%, transparent);
}

.board {                              /* the dark teaching board — see §4 */
  background: #0B1F24;
  border: 2px solid var(--daf-gold);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0,0,0,.22);
}
```

### 1.4 The geometry motif

The eight-point star from the mark is the deck's structural ornament. Use it as an **inline SVG** (never a raster) at ≤ 6% opacity behind the copy column, as the bullet before a learning goal, and as the badge frame in the gamification layer.

```html
<svg viewBox="0 0 100 100" class="daf-star" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-width="3">
    <rect x="22" y="22" width="56" height="56"/>
    <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)"/>
  </g>
</svg>
```

### 1.5 Typography

| Role | Face |
|---|---|
| Display / headings | **Cabinet Grotesk** 800–900 |
| Body | **Satoshi** 400–600 |
| Numbers, timers, code | **JetBrains Mono** 500–700 |
| Hand-written board labels | **Lemonada** 400–600 |
| Math | the browser's math face (`Cambria Math`, `STIX Two Math`, `Latin Modern Math`) |

`h1: clamp(30px, 3.2vw, 52px); line-height:.99; letter-spacing:-.045em`.

Only three font files are needed. Drop the Cairo import — it is dead weight in an English deck.

---

## 2) English-only rules

This edition ships **one language**. That is a constraint on the code, not only on the copy.

**Mandatory:**
- `<html lang="en" dir="ltr">`. Nothing in the deck sets `dir` at runtime; there is no language toggle and no `L` key.
- **Strings are plain strings.** `title: "What do you notice?"` — never `title: { ar: "…", en: "…" }`. A `{ar, en}` object anywhere in the content model is a build failure (Guardrail 6).
- **Western numerals everywhere**: `5 / 12`, never `٥ / ١٢`. `DAFMath` is called with the default `numerals: "western"`; never pass `"arabic"`.
- **`dir="rtl"` never appears** — not on an element, not in a style, not in a canvas label.
- **No Arabic characters** anywhere in the file (`U+0600`–`U+06FF`), including comments and the offline fallback notice.
- Physical CSS properties are fine now (`padding-left` etc.), but the logical ones (`padding-inline-start`) still read better — keep whichever you already have.
- Arrow logic is plain LTR: **right advances, left goes back.**

**Voice:** short, concrete, **sentence case**, second person, present tense. Speak to one student sitting in front of you. Em dash (—) for beats. The contrast pattern "X — not Y". One sentence per phase worth memorising.

Dar Al Fikr is a bilingual school, so English decks still carry **local context**: Jeddah, the Corniche, the Red Sea, dates and Ramadan portions, the school canteen, prayer-time schedules, the football pitch. Never a stock American context.

**Student names in worked strategies are local**: Layla, Yousef, Salma, Omar, Reem, Faisal. Naming the strategy after the student who used it is the Amplify Desmos *Connect* move.

## 3) The Seven Stages

> **Content at home. Thinking in class. Evidence on the wall.**
>
> *A learning unit is not finished when the content has been covered. It is finished when the
> student can show what they made from it.*

Every deck is a **lesson run as seven stages**, not a slideshow of screens. The lesson file owns
the mathematical content (its `metas`, `Visual` cases, OMML and canvas drawings) — the stage
rebuild does not touch it. The **engine owns the stage structure**: it interleaves four stage
screens around each lesson's existing screens, and stamps the per-lesson stage data into the deck.

| # | Stage | Timing | What it has to achieve |
|---|---|---|---|
| 1 | **Preparation** | Before class | Compress the material and send it. First exposure happens at home, at the student's own pace. |
| 2 | **Intelligent Diagnose** | 5–8 min | Build a gap map, not a grade. What do they actually know? |
| 3 | **Knowledge Building** | 15–20 min | Close the flagged gaps, then model one richer example, thinking out loud. |
| 4 | **Practice** | 10–15 min | Guided, then independent — with feedback that arrives in seconds, not days. |
| 5 | **Production / B** *(Proof-Mastery Gate)* | 10–15 min | A genuinely new situation. **AI enters here — as a critic, never as an author.** |
| 6 | **Mastery Gate** | 5–8 min | One individual task that decides the next path for each student. |
| 7 | **Smart Production** | 5–8 min | A final product the student is willing to put their name on. |

**Three movements.** **Content at home** (stage 1) → **Thinking in class** (stages 2–5:
Diagnose → Build → Practice → Produce) → **Evidence on the wall** (stages 6–7: Mastery Gate +
Smart Production).

**The core principle:** *A learning unit is not measured by what was taught. It is measured by
what the student can show they made from it.*

### 3.1 Stage by stage

**1 · Preparation — before class.** The deck opens on the compressed briefing: the lesson's
headline objects (its first two OMML strings) and three home questions drawn from the lesson's own
Notice-and-Wonder or WODB prompts. The teacher sends it before class; first exposure happens at
home, at the student's own pace. The briefing is a *compression of what the lesson already says* —
not an extra lecture.

**2 · Intelligent Diagnose — 5–8 min.** Four checkpoint claims — generated from the lesson's
build-screen goals, action goals phrased as "I can …" — go on the **gap map**. The class votes
*We can* / *Not yet* on each, the canvas bars the votes, and the verdict names the gaps to close.
The deliverable is a **gap map, not a grade**: *an instrument for catching gaps, not for scoring
students.*

**3 · Knowledge Building — 15–20 min.** The lesson's own screens, in their original order — cold
open, launch, the exploration screens, the connects, and the **board**, where the teacher closes
the flagged gaps and models **one richer example, thinking out loud**. No new engine screen: the
engine draws the stage boundary around the lesson's arc.

**4 · Practice — 10–15 min.** The lesson's own formative check, run as a sprint with feedback in
seconds, not days:

- a **guided** item — the model stays open beside the question (headline objects + the hint);
- an **independent** item — the model opens only after a miss;
- the **harder lane**, where the lesson supplies one — paid for trying, right or wrong.

Right on the first try earns the sprint award through the dojo.

**5 · Production / B — the Proof-Mastery Gate, 10–15 min.** A genuinely new situation — the
lesson's story move and student mission from the story map — defended against a scripted critic
(*Hafizah · the proof critic*, tagged **critic — never author**). The order is fixed:

1. *Which method does your work rest on?* — three options; the right one is the lesson's own rule
   (its RuleScreen hand — or, where the lesson has none, the rule the board built publicly).
2. *The trap* — the critic names the lesson's anticipated misconception inside the new work; the
   class shows how its production dodges it.
3. *The reasoning* — the lesson's connect question, answered with a reason tied to structure, not
   to one answer.
4. *The transfer* — the mission's first move. The critic stops there — the work is the students'.

A wrong pick never reveals the correction: *the critic does not correct. It makes the class check
the evidence — defend it again.* **AI enters here — as a critic, never as an author.** The critic
raises and questions; it does not write the production, complete the work, or name which card is
right.

**6 · Mastery Gate — 5–8 min.** The lesson's formative check (Show What You Know), now **routing**:
right → **forward — mastered**; a miss → **reteach — revisit the model**, deep-linked to the
lesson's board screen. The teacher issues the lesson's IXL codes as the individual prescription.
**The gate lanes pay no XP** — routing is a judgement that sends students on, not a reward.

**7 · Smart Production — 5–8 min.** The **evidence wall**: the unit's artifact (the story map's
unit artifact, or the lesson's handoff artifact) as the card, and a slot grid where the class
posts what it made — a final product the student is willing to put their name on. Footnote:
*evidence on the wall — not what was taught, but what the class made from it.*

### 3.2 How the stages map onto the deck

- Four engine screens — the briefing, the gap map, the practice sprint and the critic board — are
  interleaved around the lesson's own screens. The engine finds the lesson's **last** formative
  check (Show What You Know): everything before it is Knowledge Building, the practice sprint and
  the critic land immediately before it, the check itself is the Mastery Gate (the gate lanes ride
  on it), and the lesson's closing screens after it form Smart Production (the evidence wall
  mounts on the final screen).
- The per-lesson data (stage screen copy, home questions, claims, sprint items, the critic, the
  gate, the wall) is generated **deterministically** into `stage/stage-plan.json` by
  `scripts/make-stage-plan.js` — same inputs, same bytes — and stamped into each built deck as
  `window.DAF_STAGE` at build time.
- **The deepening pass is authored, topic by topic.** Each topic may ship a
  `stage/topics/<n>.json` that replaces the generated fields with content that holds up to the
  spec: stage 1 home questions that work as *first exposure at home*; stage 2 claims that probe
  what the class **actually knows** (prerequisites and entry skills — not the lesson's own goals);
  a stage 4 independent item that is genuinely new (new numbers, new context — never the guided
  item re-shown); the harder lane; and stage-screen copy in the unit's story voice. The generated
  plan is the floor; the topic file is the authored layer on top. `npm run check:stages` reports
  how many of the 17 topics are deepened, and asserts that wherever a topic file exists, the
  independent item differs from the guided one and the harder lane is complete.
- Every screen's header carries its **stage chip**: *Stage N · name · timing*.
- Decks without a stage plan (the topic bosses) run the classic lesson format: no stage chips, no
  stamp.

**The old architecture → the stages.** The Amplify Desmos routines survive as the *component
library inside the stages* — not as the lesson structure:

| Amplify-Desmos phase | Where it lives now |
|---|---|
| Warm-Up (invitational routines) | Stage 3 cold open — and the home questions of stage 1 |
| Launch | Stage 3 — the need is still created in class |
| Monitor / Explore | Stages 3 and 4 — exploration in the build; the practice sprint |
| Connect | Stage 3 — strategies compared side by side |
| Synthesis / the board | Stage 3 — the modelled example, thinking out loud |
| Show What You Know | Stage 6 — the Mastery Gate that routes |
| Handoff / close | Stage 7 — the evidence wall |

### 3.3 The invitational routines (the component library)

Each is a ready-made interactive component — see §7 for the component contracts. In the staged
decks they run inside Knowledge Building (and their prompts feed the stage-1 home questions).

| Routine | Component | The move |
|---|---|---|
| **Notice and Wonder** | `<NoticeWonder>` | An image/graph + two collectors. Every contribution is valid. |
| **Which One Doesn't Belong** | `<WODB>` | Four cards; *every* card has a defensible reason. Reveal counts only after voting. |
| **Number Talk** | `<NumberTalk>` | One expression in OMML, mental strategies collected as chips. |
| **Estimation** | `<EstimationBand>` | Too low / just right / too high — a slider, then the reveal. |
| **Card Sort** | `<CardSort>` | Drag cards into categories; no auto-grading until the class commits. |
| **Think–Pair–Share** | `<ThinkPairShare>` | Three timed stages with a visible timer per stage. |
| **Compare and Connect** | `<CompareConnect>` | Two strategies side by side, with a "same / different" collector. |
| **Frayer Model** | `<Frayer>` | Definition · characteristics · examples · non-examples. |

### 3.4 Launch–Monitor–Connect facilitator rail

Every Monitor screen carries a collapsible teacher rail (toggle key `T`) with:
- **Launch line** — the exact sentence to say out loud.
- **Monitor for** — 3 named strategies to look for, each with a "select this student" button that adds their strategy to the Connect screen.
- **Connect question** — the question that ties the selected strategies to the goal.
- **Anticipated misconception** — and the *question* that surfaces it (never the correction).

---

## 4) The live canvas — the heart of the style

> **The math is not printed. It is drawn while it is explained.**

Every concept screen owns exactly one `<canvas>`. **A static image where an animation belongs is a defect.**

### 4.1 Phase-gated drawing (never a loop that just spins)

```js
const CYCLE = 600;                 // ~10s at 60fps
const f = frame % CYCLE;

const p1 = at(f,   0,  90);        // stage 1: the structure is drawn
const p2 = at(f,  80, 200);        // stage 2: the objects appear
const p3 = at(f, 190, 320);        // stage 3: the labels get written
const p4 = at(f, 400, 470);        // stage 4: the conclusion closes it
```

The drawing **builds the idea in front of the class** and restarts on its own, so a student who looks up at any moment finds it alive.

### 4.2 The canvas toolkit (ship these helpers in every file)

| Helper | Does |
|---|---|
| `fit(canvas)` | DPR + `ResizeObserver` → returns a live `{ctx, W, H}` |
| `loop(draw)` | rAF loop that hands `draw` the frame number |
| `at(f,a,b)` | 0..1 progress between two frames — **the stage gate** |
| `ease(t)` | smoothing |
| `marker(ctx, pts, prog, col)` | ✍️ **the signature move** — strokes a path progressively, like a marker on a board |
| `board(ctx, W, H, {title})` | the dark board surface + dot grid + breathing gold frame |
| `txt(ctx, s, x, y, {font:'marker'})` | text; `marker` uses **Lemonada** so it reads as hand-written |
| `numberLine(ctx, {min,max,ticks,marks,prog})` | animated number line |
| `bar(ctx, {parts, prog})` | tape/bar model — **the default fraction manipulative** |
| `areaGrid(ctx, {rows,cols,shaded,prog})` | area model for fractions, multiplication, arrays |
| `axes(ctx, {xr,yr})` + `plot(ctx, fn, prog)` | Desmos-style graph drawn left to right |
| `fig(ctx, x, y, col)` | a small figure — for context/story problems |

**Drawing palette:** use the Desmos math-object colours (`--m-blue`, `--m-red`, `--m-green`, `--m-purple`, `--m-orange`) plus chalk `#EAF4F2`. Objects that are *the same mathematical thing* keep the same colour across every screen of the deck.

### 4.3 The board — at least one per deck

The single most important idea in the lesson is **drawn on the board**, not displayed:
- Surface `#0B1F24`, faint dot grid, **gold frame that breathes** (2–3% scale oscillation).
- Strokes appear progressively via `marker()`.
- **Labels are written after the shape finishes**, in `Lemonada`, so they look hand-added.

That is the "the lesson was taught" moment as opposed to "the lesson was displayed." **A deck with no board is incomplete.**

---

## 5) 🔢 OMML — the mandatory math markup

> **RULE: every fraction, radical, exponent, subscript, operator, matrix and math symbol in a Dar Al Fikr deck is authored in OMML (Office Math Markup Language, `http://schemas.openxmlformats.org/officeDocument/2006/math`) and rendered through `DAFMath`.**
>
> **Not LaTeX. Not MathJax input. Not an image. Not Unicode-fraction characters (`¾`). Not `<sup>`/`<sub>`. Not "3/4" typed as text.**

### 5.1 Why OMML

One source of truth. The identical `<m:oMath>` string that renders on the slide can be pasted straight into a Word worksheet, a PowerPoint, or an exported `.docx` answer key and remains a **live, editable Word equation** — searchable, restyleable, accessible, and reusable by the teacher. LaTeX cannot do that; a PNG certainly cannot.

### 5.2 Authoring

Store math in the content model as OMML strings, never as prose:

```jsx
const MATH = {
  threeQuarters: `<m:oMath><m:f><m:num><m:r><m:t>3</m:t></m:r></m:num>
                  <m:den><m:r><m:t>4</m:t></m:r></m:den></m:f></m:oMath>`,

  divideByUnit: `<m:oMath>
    <m:r><m:t>6÷</m:t></m:r>
    <m:f><m:num><m:r><m:t>1</m:t></m:r></m:num><m:den><m:r><m:t>3</m:t></m:r></m:den></m:f>
    <m:r><m:t>=18</m:t></m:r></m:oMath>`,
};
```

Render it declaratively:

```jsx
<Math omml={MATH.threeQuarters} display="inline" />
<Math omml={MATH.divideByUnit} display="block" />
```

Note there is **no `numerals` prop** in this edition. The renderer defaults to western digits and stays there.

`<Math>` is a thin wrapper over `DAFMath.toMathML()` (shipped in `reference/omml.js`, MIT-clean, no dependencies, ~330 lines) which converts OMML → **MathML** at runtime. Browsers render MathML natively; no CDN required, so **math still renders when the file is opened offline.**

### 5.3 The OMML elements you will actually use

| Math | OMML element | Renders as |
|---|---|---|
| Fraction | `m:f` + `m:num` / `m:den` | `mfrac` |
| Diagonal fraction | `m:f` with `<m:type m:val="skw"/>` | `mfrac bevelled` |
| Stacked (no bar) | `<m:type m:val="noBar"/>` | binomial coefficient |
| Square root | `m:rad` + `<m:degHide m:val="1"/>` | `msqrt` |
| nth root | `m:rad` + `m:deg` | `mroot` |
| Power | `m:sSup` | `msup` |
| Index | `m:sSub` | `msub` |
| Both | `m:sSubSup` | `msubsup` |
| Σ / ∫ / ∏ | `m:nary` + `<m:chr m:val="∑"/>` | `munderover` |
| Brackets | `m:d` + `m:begChr` / `m:endChr` | stretchy fences |
| sin, log, … | `m:func` + `m:fName` | function application |
| Matrix / array | `m:m` + `m:mr` + `m:e` | `mtable` |
| Multi-line working | `m:eqArr` | left-aligned `mtable` |
| Over/under bar | `m:bar`, `m:groupChr` | `mover` / `munder` |
| Plain word inside math | `m:r` with `<m:rPr><m:nor/></m:rPr>` | `mtext` |

`DAFMath` also **normalises what authors type**: `-` → `−` (U+2212), `*` → `⋅`, `<=` → `≤`, `!=` → `≠`. So authors write natural ASCII inside `m:t` and still get correct typography.

### 5.4 OMML rules

1. **Every** number that is part of a mathematical statement goes in OMML. A number in ordinary prose ("we have 4 groups") stays prose.
2. Never nest raw HTML inside `m:t`. Escape `<`, `>`, `&`.
3. A word inside an equation (`area`, `cost`, `cups`) goes in a **normal-text run** — `<m:r><m:rPr><m:nor/></m:rPr><m:t>cost</m:t></m:r>` — so it renders upright as `<mtext>` instead of italic variables.
4. Canvas drawings cannot host MathML — when the board needs an equation, draw the glyphs with `txt()` **and** place the OMML twin in the screen's `mathSources[]` array so the export keeps it.
5. Every deck ends with an auto-generated **`Math inventory`** (press `M`) listing every OMML string in the file — this is what the teacher copies into Word.

### 5.5 Accessibility

MathML output is screen-reader native. Add a human sentence per expression:

```jsx
<Math omml={MATH.threeQuarters} alt="three fourths" />
```
→ renders `aria-label` on the wrapping element, `role="math"`.

---

## 6) Gamification layer

Light, honourable, never humiliating. It rewards **thinking**, not speed alone.

### 6.1 The economy

| Element | Rule |
|---|---|
| **XP** | Published rate, visible to the students: estimate locked 5 · class commit 5 · sprint item right first try 10 · standard question right first time 15 · harder lane 15 (paid for trying) + 25 if right · production defended 15 · method named into the Sijill 30 (teacher-tapped) · exhibition 50 (teacher-issued). **Nothing is earned by clicking; the Mastery Gate lanes pay nothing.** Ceiling ≈ 90 XP per lesson, 120 with a Sijill entry. |
| **Streak** | Consecutive screens with a contribution. Breaks silently — **never** a red "you lost it" |
| **Badges** | Gold eight-point star frames on a year-long ladder. `Estimator` · `Model Builder` · `Strategy Spotter` · `Precise Notation` |
| **Team mode** | 2–6 named teams; the teacher awards XP with number keys `1`–`6` |
| **Progress ring** | Teal ring in the header fills across the lesson phases |

### 6.2 Rules of the game

- **Every card in a WODB / Notice-and-Wonder scores.** There is no wrong contribution in an invitational routine.
- **No public failure state.** Wrong answers get *"not yet — try the model"*, and the model opens.
- **No countdown pressure on thinking time.** Timers are visible and teacher-controlled (`Start` / `Pause`), never automatic.
- **Never insult the learner or the tool.** Say the consequence instead: not *"wrong"* but *"this model gives a different answer — which one matches the story?"*
- Celebrate with **geometry, not confetti**: the eight-point star assembles itself from strokes when a badge unlocks (`gsap` scale + `stagger` on the SVG paths).

### 6.3 Components

`<XPBar>` · `<Badge kind>` · `<TeamBoard teams>` · `<StreakDot n>` · `<PhaseRing phases current>` · `<RewardBurst on>`

State lives in one `useReducer` `game` store, persisted to `localStorage` under `daf-lesson-<slug>` so a paused lesson resumes after a projector reboot.

---

## 7) Technical architecture (inherited from `html_slides_replicator`)

### 7.1 Single file, zero build

`<!doctype html>` → one file containing HTML, CSS tokens, base64/inline-SVG logos, React 18, Babel-standalone JSX, GSAP, optional Three.js, `DAFMath`, and all lesson content.

### 7.2 Exact CDN registry

```html
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800;900&family=Lemonada:wght@400;600&display=swap" rel="stylesheet"/>
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=satoshi@400,500,700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
<script src="https://cdn.tailwindcss.com"></script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<!-- REQUIRED: pin the classic JSX runtime — see Guardrail 13 -->
<script>
  if (window.Babel && Babel.availablePresets && Babel.availablePresets["react"]) {
    Babel.registerPreset("daf-react", { presets: [[Babel.availablePresets["react"], { runtime: "classic" }]] });
  }
</script>
<!-- Three.js ONLY if the lesson has a genuine 3D object (solids, nets, volume) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

**`DAFMath` and the canvas toolkit are inlined, not CDN'd** — math and drawings must survive an offline classroom.

### 7.3 Screen shell

```jsx
<div className="screen" data-phase="monitor">
  <div className="phase-tag">{PHASES[meta.phase].label}</div>   {/* coloured by var(--c) */}
  <h1>The title — with <em>one gradient phrase</em></h1>
  <p className="lead">One or two lines. Never a paragraph.</p>
  <div className="stage"><Boundary><Visual i={i}/></Boundary></div>
  <footer className="sf">
    <span>Dar Al Fikr Schools</span>
    <PhaseRing/>
    <span className="pull">{/* a line that pulls to the next screen */}</span>
  </footer>
</div>
```

**Binding rules**
- Each element enters with a staggered reveal (`revealUp`, `.08s` apart) — GSAP auto-stagger on `.glass-panel, .glass-card, .gsap-auto` keyed to `meta.title`.
- The footer ends with a **line that pulls forward**, not a summary.
- `<Boundary>` (self-resetting error boundary) wraps every visual **and** the ambient canvas.
- Keyboard: `→` next · `←` back · `Space` next · `Home`/`End` · `R` replay animation · `O` overview mini-map · `T` teacher rail · `M` math inventory · `Esc` close. **No `L` key — there is nothing to toggle.**
- Keyboard shortcuts **must not hijack form controls**. Bail out of the global `keydown` handler when `e.target` is an `input`, `textarea`, `select`, or `contentEditable` — otherwise a student nudging a slider with the arrow keys changes the screen instead of the value. `Escape` is the one exception.
- `?slide=n` deep link and `postMessage {type:'set-slide'}` sync for a second screen.

### 7.4 Motion levels

| Level | Tool | Use for |
|---|---|---|
| 1 | CSS transitions | screen entry, hovers, card states |
| 2 | **Canvas** (§4) | **the math being drawn — the default** |
| 3 | GSAP timelines | multi-step transformations, card sorts, reveals, badge bursts |
| 4 | Three.js | **only** genuine 3D math: solids, nets, cross-sections, volume. Max 2 per deck. |

Always guard: `if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches)`, and **never target an element before it mounts** — put the tween in a `useEffect` keyed to the state that renders it.

---

## 8) Guardrails — mandatory, for bug-free execution

**Guardrail 1 — Never leave a naked `>` or `->` in JSX text.** Babel-standalone throws `SyntaxError: Unexpected token '>'` and the whole deck goes blank.
- ❌ `<p>when x > 5 …</p>` ❌ `<div>halve -> halve again</div>`
- ✅ `<p>when x is greater than 5 …</p>` ✅ `<div>halve → halve again</div>` (`\u2192` or `&gt;`)

**Guardrail 2 — Always quote CSS variables in JS style objects.**
- ❌ `style={{ color: var(--c) }}` → `ReferenceError`
- ✅ `style={{ color: "var(--c)" }}`

**Guardrail 3 — Sentence case for everything a student or teacher reads.**
- ❌ `SHOW WHAT YOU KNOW` / `COMPARE THE MODELS`
- ✅ `Show what you know` / `Compare the models`

**Guardrail 4 — Math is OMML.** A literal `3/4`, a `¾`, a `<sup>2</sup>`, or a LaTeX `\frac{}{}` anywhere in a deck is a build failure. (§5)

**Guardrail 5 — English only, enforced by grep.** The built file must contain **zero** characters in `U+0600`–`U+06FF`, zero occurrences of `dir="rtl"`, and zero `numerals: "arabic"`. Comments and the offline notice included.

**Guardrail 6 — No bilingual scaffolding left behind.** No `{ ar:` / `en: }` string objects, no `lang` state, no `setLang`, no `STR[k][lang]` lookup, no `L` key handler. Porting a bilingual deck by only deleting the Arabic strings leaves this machinery in place — strip it.

**Guardrail 7 — No static image where an animation belongs.** Every concept screen earns a canvas.

**Guardrail 8 — One idea per screen.** If a screen needs two headings, it is two screens.

**Guardrail 9 — Never show the answer on a Monitor screen.** The exploration screen supports strategies; it does not resolve them.

**Guardrail 10 — Never insult the learner or the tool.** State the consequence instead.

**Guardrail 11 — Offline fallback.** Wrap `createRoot` in `try/catch` and render a readable notice (in both languages) if the CDNs did not load.

**Guardrail 12 — `metas.length` must equal the number of cases in `Visual({i})`.** Assert it at boot: `console.assert(metas.length === SCREENS, 'screen count mismatch')`.

**Guardrail 13 — Force the *classic* JSX runtime.** Babel 8's `preset-react` defaults to the **automatic** runtime, which emits `import { jsx } from "react/jsx-runtime"` into a classic `<script>`. The browser throws *"Cannot use import statement outside a module"* inside `appendChild`, and **the entire deck renders blank with no obvious cause.** Because `data-presets` cannot carry options, register a classic preset first:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script>
  if (window.Babel && Babel.availablePresets && Babel.availablePresets["react"]) {
    Babel.registerPreset("daf-react", {
      presets: [[Babel.availablePresets["react"], { runtime: "classic" }]]
    });
  }
</script>
...
<script type="text/babel" data-presets="daf-react"> /* the deck */ </script>
```

> This one bites silently: `babel.transform(src, {presets:['react']})` in Node still *succeeds*, so a compile-only check passes while the browser stays blank. Always load the built file in a real browser once.

---

## 9) Content voice

- Short, concrete, **sentence case**, second person. Speak to one student, not to a room.
- Em dash (—) for beats. The contrast pattern "X — not Y". One sentence per phase worth memorising.
- **Never insult the learner or the tool.** State the consequence instead: not *"wrong"*, but *"this model gives a different answer — which one matches the story?"*
- **Local context, in English**: Jeddah, the Corniche, the Red Sea, dates and Ramadan portions, the school canteen, the football pitch, prayer-time schedules. Never a stock American context.
- **Local names** on student strategies: Layla, Yousef, Salma, Omar, Reem, Faisal. Naming a strategy after its student is the Amplify Desmos *Connect* move.
- Read every visible string once against Guardrail 3 (sentence case) before shipping.

## 10) Files this skill produces

| File | What |
|---|---|
| `lesson-<grade>-<topic>.html` | **The deliverable.** One self-contained interactive lesson — stage screens included. |
| `reference/lesson-g7-proportional-relationships.html` | A complete, verified worked example — Grade 7, finding the constant of proportionality, 11 screens, English only. **Start here: copy it and replace the content model.** |
| `reference/omml.js` | The OMML → MathML renderer (~330 lines, no dependencies). Inline it into the deck; keep the standalone copy for tests. |
| `reference/_b_draw.js` | The canvas toolkit (`DAFDraw`). Inline it too. |
| `reference/omml.test.js` | 21 OMML conversion tests. `node omml.test.js` |
| `reference/verify.js` | 18 automated guardrail checks against a built deck. `node verify.js` |
| `reference/build.sh` | Concatenates the `_a`/`_b`/`_c*` source parts into the single-file deck, and stamps the lesson's `window.DAF_STAGE` plan. |
| `stage/stage-plan.json` | The per-lesson seven-stage data for every lesson — generated, committed, stamped into the decks. |
| `stage/topics/<n>.json` | The per-topic deepening pass: authored home questions, gap-map claims, independent items, harder lanes and stage-screen voice for one topic. |
| `scripts/make-stage-plan.js` | The stage-plan generator. Reads each lesson's own content (prompts, goals, formative check, board, IXL codes) plus the story map; deterministic (FNV-seeded shuffles). |
| `scripts/lib-parse.js` | The restricted JS-literal parser the generator uses to read lesson sources without executing them. |
| `scripts/check-stage-plan.js` | Independent validator for the stage plan (`npm run check:stages`) — 7 stages per lesson, every critic/challenge option a non-empty string. |
| `scripts/smoke-stage.js` | jsdom render + full stage-walk pass: every screen paints, every stage is played (gap map → sprint → critic → gate lane → wall post). |

Working on the parts (`_a_head.html`, `_b_draw.js`, `_c1_content.jsx`, `_c2_primitives.jsx`, `_c3_visuals.jsx`, `_c4_app.jsx`) and running `./build.sh` keeps a 2,500-line deck editable. The shipped artefact is still **one file**.

---

## 11) Build order

1. **Ask the lesson question. Wait.** ← the step that saves the rebuild
2. **Show the screen map** (screen · phase · interaction · math goal) and get approval.
3. Write the **content model first**: `metas[]` + `MATH{}` OMML strings + `STR{}` label strings. No visuals yet.
4. Build the **interaction components** for the routines you chose.
5. Build the **canvas drawings** — one per concept, **at least one on the board**.
6. Add the **gamification layer** and the **teacher rail**.
7. **Generate the stage plan** — `npm run build:stages` (or `rebuild-all.sh`, which regenerates it first). The plan is derived from the lesson's own content — the home questions from its prompts, the claims from its build-screen goals, the sprint from its formative check, the critic from its story-map beat, the gate from its IXL codes and board, the wall from its unit artifact. Nothing stage-specific is authored by hand.
8. **Verify** (§12), then ship one file.

---

## 12) Verification checklist

Run all of it before calling a deck done.

Two harnesses ship with the skill — run both, then open the file in a real browser.

```bash
node reference/omml.test.js   # 21 OMML → MathML conversion tests
node reference/verify.js      # 18 guardrail checks against the built deck
```

- [ ] `@babel/standalone` compiles the script block with **zero** errors.
- [ ] The deck actually **paints** in a real browser — a compile-only pass does not catch Guardrail 13.
- [ ] `metas.length === SCREENS` and every index renders.
- [ ] **`node reference/omml.test.js` → 21 passed, 0 failed.**
- [ ] Every equation in the deck traces back to an OMML string; **grep the file for `\frac`, `¾`, `<sup>`, and bare `/` between digits — all must be absent.**
- [ ] Canvases animate, restart on their own, and survive a window resize (DPR + `ResizeObserver`).
- [ ] The phase colour changes on every phase boundary; no hard-coded hex inside a screen.
- [ ] `grep -P '[\x{0600}-\x{06FF}]'` on the built file returns nothing, and `dir="rtl"` appears zero times.
- [ ] No `{ ar:` objects, no `lang` state, no `L` key handler survive from the bilingual edition.
- [ ] Every button, card and slider clicks without a null-target GSAP error.
- [ ] At least one board screen exists.
- [ ] **The seven stages hold**: `npm run check:stages` passes — every lesson plan has all seven
      stages, and every critic/challenge option is a non-empty string.
- [ ] **The deck walks the stages**: `node scripts/smoke-stage.js <code>` passes — every screen
      paints in jsdom and the full walk plays (gap-map verdict → sprint complete → production
      accepted → gate lane chosen → evidence wall posted).
- [ ] Every screen's stage chip reads *Stage N · name · timing*; decks without a stage plan
      (bosses) carry none.
- [ ] XP/streak/badges award and persist across a reload.
- [ ] Opening the file with the network off shows the offline notice — and the **math still renders** (MathML is native).
- [ ] Projector check: legible from the back of the room at 1280×720.

---

*Dar Al Fikr Schools — The House Of Faith, Righteousness & Wisdom.*
*English edition. Lesson architecture: The Seven Stages, built on the Amplify Desmos Math routines. Engine after `html_slides_replicator`. Drawing style after Syntax Academy.*
