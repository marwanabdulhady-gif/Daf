# Cinematic English style · application plan

**Status:** program plan (extends `story-lesson-rollout-plan.md`). Applies the Syntax Academy
presentation style — dark cinematic stage, live canvases that teach on time, a marker-drawn
board, one idea per slide, pull-lines forward — to the Daf lessons **in the English edition
first** (LTR, Western digits, English copy; the Arabic/RTL variant is explicitly deferred).

**Source:** the Syntax Academy prompt (attached 2026-08-25) + its reference deck
(`github.com/mostfamohamedrgab/syntax-deck-demo`).

## 1 · What the style actually is

One page, one 16:9 stage, dark near-black frame, an accent color that changes with the chapter,
staggered element reveals, a footer pull-line that pulls to the next slide — and, above all,
**every concept screen carries a canvas that teaches on time**: the idea is drawn in staged
phases (shape → elements → names → conclusion) over one cycle, then rebuilds itself, so the
screen is alive from any entry moment. The core idea of each piece is **drawn on a board**
(dark surface, dot grid, breathing gradient frame, marker strokes, handwritten names) —
"the lesson explained, not displayed". One idea per slide. No static image in place of
animation.

## 2 · What the engine already has (the honest mapping)

| Style requirement | Daf equivalent | Status |
|---|---|---|
| `at(f, a, b)` phase gates over one CYCLE | `D.at(f, a, b)` + per-draw CYCLE | **Already the pattern** in every baseline and story draw |
| `marker(ctx, pts, prog, col)` progressive stroke | `D.marker` | ✅ exists |
| `board(ctx, W, H, {title})` board surface | `D.board` — a board screen is already a **required guardrail** in every deck | ✅ exists, needs the cinematic finish (D2) |
| `txt` with `font: "marker"` (Lemonada handwriting) | `D.txt(..., {font:"marker"})`, Lemonada already loaded in `head.html` | ✅ exists |
| Per-chapter accent (`--c`), everything coloured from it | `--c/--c-2/--c-grad` set per screen phase in `app.jsx` | ✅ exists per phase; add unit-level identity (D4) |
| Footer pull-line to the next slide | every meta has a `pull` string rendered in the footer | ✅ exists; codify as a check (D6) |
| 16:9 stage, one idea per screen | projector deck + flexible-screen rule "one distinct cognitive act per screen" | ✅ exists |
| Staggered element reveals | screen-level `screenIn` animation only | ⚠ missing → D3 |
| Dark cinematic frame | light classroom frame; canvas panels are already dark (`#0B1F24`) | ⚠ the main gap → D1 |
| Eastern Arabic numerals + RTL | **not applicable** — English edition guardrails (G5a/G5b: English only, no RTL) | deferred (see §6) |

**Conclusion:** the drawing layer is already this style. The work is a **frame upgrade**
(engine + CSS), one board finish, one staging pass, one color thread, and two checker rules —
not a redesign. Every one of the 115 existing decks already has CYCLE-gated canvases and a
board screen, so the style lands course-wide via one `rebuild-all.sh`.

## 3 · Design decisions

**D1 — Hybrid frame (the key call).** The dark cinematic stage applies to the
**story-carrying screens**: cold open, board synthesis, STEM window, and the handoff
cliffhanger (the four "act" moments of every lesson). The **working math screens stay the
light classroom frame** — projector legibility for students reading dense models, the
teacher rail's contrast, and the existing print/photograph workflow are documented
classroom constraints. The contrast *is* the cinema: the deck dips into the dark frame for
the story beats and returns to the working surface for the math. Guardrail 14 is untouched —
the dark screens are evidence frames and synthesis, never the scored interaction.

**D2 — Board finish (one `D.board` upgrade, all decks benefit).** Surface `#0a0a13` with a
light dot grid; a breathing brand-gradient frame (opacity oscillation on the existing
CYCLE); marker strokes drawn progressively (existing); names written in the Lemonada marker
font **after** the shape completes (authoring rule; check in D5). The board stays the
required synthesis screen per lesson.

**D3 — Staggered reveals.** Screen children enter with a 0.08s stagger (CSS
`animation-delay: calc(var(--i) * .08s)` set by the shell render), matching the style's
`revealUp` discipline. Fully disabled under `prefers-reduced-motion` (static state, per the
PR 01a A1 decision and the PR 12 accessibility scope).

**D4 — Unit color identity thread.** Each topic already owns a color in the map
(`make-index.js` region palette). The payload gains `topicColor`; the story motif, ribbon
accent, board frame and folio pips tint to the unit identity while phase colors continue to
drive the working surface — the style's "color changes with the chapter" at unit level.

**D5 — "Teaches on time" as a hard rule + checker.** A concept screen's draw must build the
idea in staged phases over one CYCLE (shape → elements → names → conclusion) and rebuild
from the start — never a static picture, never a decoration that loops without teaching.
New guardrail in `verify.js`: concept screens (warmup/launch/monitor/synth) whose draw
lacks `CYCLE`/`D.at` gating fail the build check; the existing no-`<img>` rule already bans
static imagery.

**D6 — Copy discipline (codify what we already do).** One idea per screen (existing
flexible-screen rule); the footer `pull` must point forward, not summarize (new check for
implemented lessons: `pull` non-empty and not a recap pattern); the style's "X — not Y"
phrasing is already the rail's misconception-line format; each screen keeps exactly one
memorizable line — the `lead`.

**D7 — Interaction budget.** All style elements are zero-XP: no points for the dark frame,
the board, or any reveal (the published XP economy and guardrail 14 are untouched).
Interactions stay exactly as they are — chips, card sorts, estimate locks, SWYK, dojo —
because in this program the interaction **is** the mathematics.

**D8 — Teacher-paced, not autoplay.** The reference style is a recorded video; the Daf deck
is teacher-paced on the projector (the math must happen in the room). The deck keeps
teacher pacing; the cinematic feel is available on demand — `R` already replays the current
animation, which is the "video moment" when the teacher wants it.

## 4 · Engine change list (file level)

| File | Change |
|---|---|
| `engine/head.html` | dark-stage CSS (stage variant, reveal stagger, reduced-motion off-switch); topic-identity vars |
| `engine/draw.js` | `D.board` cinematic finish (dot grid, breathing frame) |
| `engine/app.jsx` | `topicColor` → CSS identity vars; staggered child delays on screen render |
| `engine/story-components.jsx` | `stage` variant on `StoryShell`/`STEMWindow`/`StoryHandoff` (D1 set of screens) |
| `engine/routines.jsx` | `BoardScreen` uses the upgraded board; reveal-aware markup |
| `scripts/story-payload.js` | payload gains `topicColor` (from the map region palette) |
| `scripts/verify.js` | D5 guardrail (phase-gated concept canvases) + D6 pull check |
| `story/story-map.json` | no content change; unit colors already live in `make-index.js` (single source) |
| `rebuild-all.sh` | unchanged — restamps all 115 decks with the new frame (seconds) |

## 5 · Integration with the program (where it rides)

- **PR 04 (Topics 2–4)** carries the engine pass:
  - its research gate gains one question — *cinematic-stage projector readability and
    reduced-motion behavior* (dark-frame contrast on classroom projectors; screen-reader
    parity for the stage variant);
  - implementation = §4 change list + Topics 2–4 authored to the full teaches-on-time
    standard (the Topic 2 briefs already specify per-screen canvases);
  - its `rebuild-all.sh` restamps **all 115 decks** — the existing Topic 1 lessons and the
    109 legacy decks inherit the style with zero per-lesson rework, because their canvases
    already teach on time and every deck already has a board screen.
- **PR 05–10:** every newly authored lesson ships to the standard by default (authoring
  procedure step 3 gains the style checklist below).
- **PR 12 (release audit):** accessibility pass over the dark stage (WCAG contrast on
  projector, reduced motion, screen reader), the final reduced-motion audit already planned.
- **Standard audit:** the 141-check Topic 1 pattern gains 5 style checks (stage screens
  dark-framed · board finish present · reveals staggered and motion-safe · unit color
  threaded · concept canvases phase-gated) — applied from Topic 2 onward.

## 6 · English edition first (scope boundary)

The English edition is the only target of this plan: LTR navigation (right = next, left =
back), Western digits, English copy — all already enforced by guardrails G5a/G5b/G6. The
Arabic/RTL variant (RTL arrow logic, Eastern Arabic numerals in the UI, Arabic type,
Arabic copy) is a **separate future edition**, not part of the 12-PR program; it would need
its own research gate (bidi canvas text, numerals, fonts, guardrail rework) and its own
roadmap. Nothing in this plan blocks it later.

## 7 · Per-lesson style checklist (authoring procedure add-on)

- [ ] cold open, board, STEM window and handoff screens use the dark stage variant
- [ ] working math screens keep the light frame
- [ ] every concept canvas teaches on time: CYCLE + staged `D.at` phases, rebuilds from start
- [ ] the board draws the core idea with marker strokes; names written after the shape
- [ ] elements reveal staggered; `prefers-reduced-motion` renders the static state
- [ ] unit identity color threads through motif/ribbon/board frame
- [ ] footer pull points forward; one memorizable lead line per screen
- [ ] zero new XP anywhere in the style layer

## 8 · Risks

1. **Projector contrast on the dark stage** — the one real readability risk; gated in PR 04
   research (measured on a classroom projector during the sweep) with the light-frame
   fallback already inherent to the hybrid design.
2. **Motion** — the breathing frame and reveals are ambient; the PR 12 reduced-motion audit
   owns the full canvas-motion strategy (PR 01a A1). The D3 off-switch ships with the
   engine pass, not later.
3. **Drift** — the style must stay a frame, not a content change: the D5/D6 checkers plus
   the guardrail suite (2,185 checks) keep the math and the standard intact across all 115
   restamped decks.
