# Dar Al Fikr · Interactive Math Slides Skill — English edition (`daf_math_slides_en.md`)

> **What this is.** The master specification for generating **single-file, highly interactive, gamified HTML math lessons** in the Dar Al Fikr Schools visual identity, **written and rendered entirely in English (LTR)**, structured on the **Amplify Desmos Math** lesson architecture (Warm-Up → Launch → Monitor → Connect → Synthesis → Show What You Know).
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

| Lesson phase | Meaning | `--c` → `--c-2` |
|---|---|---|
| **Warm-Up** | Invitation. Everyone can contribute. | `#6042A6` → `#8B6FD4` |
| **Launch** | Create the need. Build curiosity. | `#FA7E19` → `#FFA94D` |
| **Monitor / Explore** | Students work; thinking becomes visible. | `#2D70B3` → `#4A9BE0` |
| **Connect** | Strategies compared side by side. | `#12857C` → `#1AA79B` |
| **Synthesis** | The math gets named and boxed. | `#388C46` → `#5CB863` |
| **Show What You Know** | Daily formative check. | `#C74440` → `#E0665F` |

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

## 3) Amplify-Desmos lesson architecture

Every deck is a **lesson**, not a slideshow. Screens are grouped into the ADM structure.

| # | Phase | What happens on screen | Screens |
|---|---|---|---|
| 1 | **Warm-Up** | An invitational routine — low floor, every student has something to say. No new vocabulary yet. | 1–2 |
| 2 | **Launch** | A short whole-class moment that creates the *need* for the math. Curiosity, a puzzle, something broken. | 1 |
| 3 | **Monitor / Explore** | Students work. The screen supports *their* strategies — sliders, card sorts, drag models. The answer is not shown. | 3–5 |
| 4 | **Connect** | Two or three student strategies side by side. "How are these the same? How are they different?" | 1–2 |
| 5 | **Synthesis** | The math is named and boxed on the **board**. One sentence worth memorising. | 1–2 |
| 6 | **Show What You Know** | One short formative item. Fast to answer, high information for the teacher. | 1 |

### 3.1 The invitational routines (pick one for the Warm-Up)

Each is a ready-made interactive component — see §7 for the component contracts.

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

### 3.2 Launch–Monitor–Connect facilitator rail

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
| **XP** | +10 contribute to a Warm-Up · +25 finish an exploration · +40 explain a strategy on Connect · +50 Show What You Know |
| **Streak** | Consecutive screens with a contribution. Breaks silently — **never** a red "you lost it" |
| **Badges** | Gold eight-point star frames. `Estimator` · `Model Builder` · `Strategy Spotter` · `Precise Notation` · `Helped a Peer` |
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
| `lesson-<grade>-<topic>.html` | **The deliverable.** One self-contained interactive lesson. |
| `reference/lesson-g7-proportional-relationships.html` | A complete, verified worked example — Grade 7, finding the constant of proportionality, 11 screens, English only. **Start here: copy it and replace the content model.** |
| `reference/omml.js` | The OMML → MathML renderer (~330 lines, no dependencies). Inline it into the deck; keep the standalone copy for tests. |
| `reference/_b_draw.js` | The canvas toolkit (`DAFDraw`). Inline it too. |
| `reference/omml.test.js` | 21 OMML conversion tests. `node omml.test.js` |
| `reference/verify.js` | 18 automated guardrail checks against a built deck. `node verify.js` |
| `reference/build.sh` | Concatenates the `_a`/`_b`/`_c*` source parts into the single-file deck. |

Working on the parts (`_a_head.html`, `_b_draw.js`, `_c1_content.jsx`, `_c2_primitives.jsx`, `_c3_visuals.jsx`, `_c4_app.jsx`) and running `./build.sh` keeps a 2,500-line deck editable. The shipped artefact is still **one file**.

---

## 11) Build order

1. **Ask the lesson question. Wait.** ← the step that saves the rebuild
2. **Show the screen map** (screen · phase · interaction · math goal) and get approval.
3. Write the **content model first**: `metas[]` + `MATH{}` OMML strings + `STR{}` label strings. No visuals yet.
4. Build the **interaction components** for the routines you chose.
5. Build the **canvas drawings** — one per concept, **at least one on the board**.
6. Add the **gamification layer** and the **teacher rail**.
7. **Verify** (§12), then ship one file.

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
- [ ] XP/streak/badges award and persist across a reload.
- [ ] Opening the file with the network off shows the offline notice — and the **math still renders** (MathML is native).
- [ ] Projector check: legible from the back of the room at 1280×720.

---

*Dar Al Fikr Schools — The House Of Faith, Righteousness & Wisdom.*
*English edition. Lesson architecture after Amplify Desmos Math. Engine after `html_slides_replicator`. Drawing style after Syntax Academy.*
