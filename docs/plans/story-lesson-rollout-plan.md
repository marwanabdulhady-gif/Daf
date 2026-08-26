# Story lesson rollout plan · Lantern of Numeria

**Date:** 2026-08-25 · **Status:** working plan for the ordered PR program (issues #1–#12)
**Companion docs:** [`docs/roadmap/storytelling-pr-roadmap.md`](roadmap/storytelling-pr-roadmap.md) ·
[`docs/research/README.md`](research/README.md) · [`story/README.md`](../story/README.md)

This plan turns the merged Lesson 1-1 completion report into the **deliverable standard** every
story lesson must meet, and lays out the execution of the program from its current state through
PR 12 — including the full content plan for the next PR (PR 03 · Topic 1, issue #3).

---

## 1 · The deliverable standard (proven by Lesson 1-1)

Every story lesson ships the same shape. A lesson's completion report (in its PR description)
follows this template: *lesson sequence · what is now working · validation*.

### 1.1 Lesson sequence — the proven 10-beat arc (1-1 shape)

1. **Cold open** — the brass lantern reveals the unit's damaged object (1-1: the census folio).
2. **Real-world need** — Omar identifies the record at stake (simulated local data, labelled).
3. **Model building** — Zayd constructs the manipulable model for the lesson's concept.
4. **Evidence** — Omar converts the object into an auditable mathematical record.
5. **Complication** — the class repairs/commits something damaged (the mission's core act).
6. **Student voices** — the boys step back; real classroom strategies are compared; one method
   is named in the Sijill.
7. **Synthesis** — the shared rule is drawn onto the Evidence Board (board screen).
8. **STEM history** — a `STEMWindow` (registry-backed, source-checked) investigates the concept's
   documented history; teacher notes carry the sources.
9. **Mathematical decision** — the class defends the choice that restores the unit object.
10. **Artifact and handoff** — the unit artifact is updated (`StoryHandoff` + folio stamp); a
    concrete cliffhanger creates the next lesson's need.

Other `screenPlan` shapes keep the same beats but change the weight: **strategy workshop**
(9 screens) tightens 3–5 into compare–practise–choose; **reasoning studio** (12–16 screens)
expands 5–7 with competing approaches, critique and revision. The plan's band is a guide, not a
cap — each screen must earn its place (guardrail 14: the math is the mechanic).

### 1.2 The standard checklist (every story lesson)

- **Characters** — Omar (evidence keeper, carries the Evidence Folio) and Zayd (model builder,
  carries the model/grid); poses: observe, question, build, present; **roles rotate across
  lessons** (no fixed "always right" / "always hands-on" boy).
- **Story visuals** — lantern; unit's damaged object; the unit's shape motif; character ribbons;
  `Our story` and (where present) `History of useful knowledge` truth labels; folio progress
  (stamps, with position fallback); artifact update; mathematical cliffhanger.
- **Gamification** — folio fragments restore only through mathematical evidence; **no points for
  opening story panels or looking at characters**; estimates, class commitments, Sijill and dojo
  attribution continue unchanged.
- **Real-world/STEM** — civic numbers are explicitly **simulated planning data**; STEM wording is
  cumulative and cross-cultural (never "one person invented X"); teacher source notes are visible
  with live, dated sources (registry `accessed` dates).
- **Build architecture** — the build embeds the characters, unit info, lesson mission, folio
  position, PBL artifact, handoff and relevant registry windows; standalone HTML delivery is
  preserved; `check:story` proves the embedded payload matches the story data.
- **Seerah lane** — an Amanah Window appears **only** at a selected unit moment, **only** when a
  registry window is `approved` with the six-field audit record; it is never mixed into lessons
  to satisfy a template.
- **Cinematic style (English edition)** — dark stage on the four story-carrying screens (cold
  open, board, STEM window, handoff), light frame on working math screens; every concept canvas
  teaches on time (staged CYCLE, rebuilds from start); board drawn with marker strokes, names
  after the shape; staggered reveals (motion-safe); unit identity color threaded; pull-lines
  point forward. Full spec: [`cinematic-english-style-plan.md`](cinematic-english-style-plan.md).
  Zero XP anywhere in the style layer.
- **Validation bar** — `npm test` · `npm run check:story` (plan + foundation) · `npm run verify`
  (all decks, guardrails) · `npm run check:topic -- N` · `npm run sweep:topic -- N` (browser) ·
  projector/reduced-motion check by a human. Zero failures.

---

## 2 · Program state (2026-08-25)

| Item | State |
|---|---|
| PR 01 · foundation + 1-1 slice | **Merged** (#13). Canonical gate issue #1. |
| PR 01a · foundation audit & completion | **Built, validated, PR #15 (draft).** Blocked on: close issue #14 as `gate: passed`, merge #15 (merge commit). |
| PR 02 · source/review infrastructure + durable story state | **Built, validated, committed locally** (research + implementation + 115 re-stamped decks). Pushes and opens once #15 merges. Gate issues: **#2** (canonical) / #16 (log). |
| Canonical gate issues | #1–#12 exist and stay open as the ordered tracker; each PR links its issue. |
| Human dependencies | Issue/PR state changes (close/merge) require the repo owner — the agent integration has no issue/PR write permission. |

**Immediate path:** close #14 → merge #15 (merge commit) → agent pushes PR 02 commits → gate
closed on #2 → PR 02 opens for review.

---

## 3 · The ordered plan (PR 02 → 12)

For each PR: **gate** (research issue + report before implementation), **deliverables**, **exit
criteria** (all of §1.2's validation bar plus the PR-specific items). Scope and gate topics are
the roadmap's; the execution notes here add what changes in the repo and what the report owes.

### PR 02 · source/review infrastructure + durable story state — **issue #2** (built)
- **Delivered:** registry v2 (`accessed` dates, image provenance record); `amanah-sources.json`
  blocked registry (17 unit windows `pending-review`, `studentText: null`); `AmanahWindow`
  approved-only component; folio state (`daf.folio.v1`) with handoff stamp, export and reset;
  TeacherRail Sources section (projector-legible); foundation-check extensions (approved-only
  embedding, raw-lane ban, `<img>` phase rule).
- **Report owes:** the six PR 02 research questions answered (S1–S7), privacy boundary
  (class-level state, not personal data under Saudi PDPL), and the note that the first real
  Amanah approval is due with PR 03's Seerah review.
- **Exit:** full suite green; reviewer browser sweep of 1-1 (folio stamp/export/reset, rail
  sources) + projector pass.

### PR 03 · complete Topic 1 — **issue #3** (content plan in §4)
- **Gate:** current civic-data candidates (all remain simulated); place-value history for 1-2's
  window; **Al-Amin source packet + qualified school review** for the unit's Seerah window
  (Makkah before revelation — no portrait, role-play or invented transaction); Grade 4
  place-value misconception set.
- **Deliverables:** lessons 1-2…1-5 authored at planned lengths (10 / 9 / 9 / 14 screens);
  completed census folio + place-value key artifact; one-page **population and services brief**
  (unit PBL product) as the Topic 1 exhibition brief; real handoffs in the story map for all
  five lessons (plan checker enforces); the approved Al-Amin Amanah Window placed at the unit's
  selected moment (candidate: the 1-5 seal).
- **Exit:** `sweep:topic 1` + projector; unit exhibition brief ready for the class to present.

### PR 04 · Topics 2–4 · ledgers, arrays and workshop systems — **issue #4**
- **Gate:** historical bookkeeping/paper; Banu Musa/al-Jazari mechanisms attributed carefully;
  local budget/material contexts; addition/multiplication misconceptions. First imagery
  candidate (mechanisms) — the `<img>` phase rule lifts **window by window** as provenance
  records are demonstrated (S4). **Plus (style plan):** cinematic-stage projector readability
  and reduced-motion behavior for the dark stage variant.
- **Deliverables:** 21 story lessons (2-1…4-7); ledger/array/workshop artifacts; source cards;
  unit handoffs. **Plus the cinematic engine pass** (dark stage, board finish, staggered
  reveals, unit color thread, D5/D6 checkers) — its `rebuild-all.sh` restamps all 115 decks,
  so the existing lessons inherit the style with zero per-lesson rework
  (`cinematic-english-style-plan.md` §4–5).

### PR 05 · Topics 5–7 · distribution, decisions and modular design — **issue #5**
- **Gate:** non-sacred logistics; al-Idrisi/cartography; geometric-design attribution;
  **Hijrah and Madinah-community qualified review** (second real Amanah approval).
- **Deliverables:** division/multi-step/factors-multiples lessons; Act I public product.

### PR 06 · Topics 8–10 · fair shares, fraction operations and time — **issue #6**
- **Gate:** irrigation/survey history; recipe/pharmacy provenance; timekeeping instruments;
  fair-dealing/generosity/shura review; fraction misconception audit.
- **Deliverables:** fraction/water/kitchen/time arc, models, artifacts, source cards.

### PR 07 · Topics 11–12 · data and decimals — **issue #7**
- **Gate:** Jeddah/Red Sea data ownership and sampling; pearling claims; al-Kashi/decimal
  attribution; Hudaybiyyah review; money/data privacy.
- **Deliverables:** student/class data workflow, line-plot evidence board, decimal procurement
  audit, source metadata.

### PR 08 · Topic 13 · honest measurement + source-safe boss — **issue #8**
- **Gate:** al-Khazini/Balance of Wisdom; units and calibration; authenticated honest-measure
  source + qualified review; perimeter/area misconceptions.
- **Deliverables:** measurement labs, calibrated field kit, reviewed Amanah Window, **redesigned
  source-safe boss** (boss 13 currently has no story payload — it joins the story map here, and
  the `DAF_STORY = null` rule for unmapped decks ends for it).

### PR 09 · Topics 14–16 · patterns, optics and architecture — **issue #9**
- **Gate:** algorithm terminology; al-Khwarizmi scope; Ibn al-Haytham/optics; architectural
  provenance; opening of Makkah/Farewell Sermon qualified review.
- **Deliverables:** pattern algorithm, shade-arm prototype, pavilion plan, three truth lanes
  exercised, Act III exhibition.

### PR 10 · Topic 17 + final exhibition — **issue #10**
- **Gate:** Grade 5 boundary audit; model materials/safety; exhibition/privacy/photography
  policy; legacy-window qualified review.
- **Deliverables:** Grade 5 bridge, volume model, evidence portfolio, public exhibition,
  next-class letter (the frame story can continue).

### PR 11 · whole-course progression and assessment — **issue #11**
- **Gate:** motivation/points evidence; validity of XP-to-marks conversion; assessment fairness;
  data privacy; parent-facing reporting.
- **Deliverables:** final folio/map progression, balanced boss/review model, PBL rubrics,
  reports, safe persistence.

### PR 12 · accessibility, performance and release audit — **issue #12**
- **Gate:** WCAG 2.2 mapping; reduced motion; screen reader/MathML; projector tests; offline/CDN
  risks; source completeness; classroom pilot results; **dark-stage contrast and
  screen-reader parity for the cinematic frame** (style plan §5).
- **Deliverables:** canvas reduced-motion mode, keyboard/focus audit, responsive/projector QA,
  offline policy, source and religious sign-off report, final 114-lesson sweep.

---

## 4 · PR 03 in detail — Topic 1: "The census in the brass lantern"

**Unit question:** *Can the class recover a damaged city census without changing what any digit
means?* · **Artifact:** a restored census folio and place-value key · **PBL product:** a one-page
population and services brief for the fictional city of Numeria.
**Bridge forward:** *The recovered population is much larger than expected. The council cannot
plan services until the damaged budget ledger is audited.* (opens Chapter 2)

| Lesson | Beat (story map) | Story move | Student mission | Screen plan |
|---|---|---|---|---|
| 1-2 | The digit that moved one chair | A digit slides one place in the lantern projection, changing the whole district count | Explain the ten-times relationship; rebuild the place-value key | concept discovery · 10 (9–12) |
| 1-3 | Two districts, one clinic | Two district cards both claim to serve the larger population; only comparison evidence settles it | Compare whole numbers; recommend the first clinic location | strategy workshop · 9 (8–11) |
| 1-4 | The supply officer cannot count every box | Exact totals arrive too late; the council needs a useful estimate now | Round each population to the requested place; justify why that precision is enough | strategy workshop · 9 (8–11) |
| 1-5 | The seal of the first folio | Two teams defend different population statements before the council; a sound argument earns the seal | Construct an evidence-based argument; the seal reveals the budget ledger | reasoning studio · 14 (12–16) |

**Handoffs to author** (map records 1-2…1-4 still carry generic authoring instructions; the plan
checker forbids that once a lesson is marked implemented): 1-2 → the comparison need ("two
districts claim the bigger population"); 1-3 → the estimation need ("exact counts arrive too
late"); 1-4 → the argument need ("two statements, one seal"). 1-5's handoff is already the unit
bridge above.

**Seerah window (Al-Amin — qualified review required):** *Chronology window: Makkah before
revelation. Al-Amin and the meaning of trust. Use only a source-approved account; no portrait,
role-play or invented transaction.* Placement candidate: **1-5, the seal moment** — trust is the
theme of a sealed, defensible record. It ships only as `approved` with the six-field audit
record; until then it stays `pending-review` in `amanah-sources.json`, invisible to decks.

**Per-lesson authoring procedure (applies to every lesson in every PR):**
1. **Research gate first** — new factual/STEM/civic claims for the lesson are recorded in that
   PR's report (decision matrix) before code.
2. **Story map** — confirm beat/move/mission; write the real handoff.
3. **Author** `lessons/N-N.jsx` — `StoryShell` lanes, `STEMWindow` (registry-backed),
   `StoryHandoff`; characters rotate their leads.
4. **Build** `./build.sh` — the payload embeds automatically.
5. **Mark** `implementationStatus` in `story-map.json` — plan checker then enforces the real
   handoff; foundation checker enforces deck/payload consistency.
6. **Validate** — `npm run check:story`, `npm run verify`, `npm run check:topic -- N`,
   `npm run sweep:topic -- N`.
7. **Human pass** — projector + reduced motion + character readability.
8. **Report** — PR description follows §1's template (sequence · now working · validation).

---

## 5 · Standing rules (from the roadmap — non-negotiable)

1. **Research first** — no implementation PR opens before its gate report passes; research
   commits may precede implementation in the same branch cycle.
2. **Ordered** — a later PR must not open until the preceding PR is merged; the session branch
   is reused only after the prior PR closes.
3. **Sacred content** — never published without the six-field qualified review; `pending-review`
   items live only in the blocked registry; no invented dialogue, data or motives.
4. **Data** — simulated numbers are visibly simulated; class state is class-level only,
   local-only, exportable, resettable (PR 02).
5. **Math is the mechanic** — guardrail 14 audit in every PR: no advancing without the math.

## 6 · Open items and risks

- **Human merge loop:** #14 close + #15 merge are prerequisites for everything below (agent has
  no issue/PR write permission).
- **Browser sweeps** run on the reviewer's machine (no Chrome in the agent sandbox); projector
  passes are human checks.
- **Qualified reviewer pipeline** is an external dependency for PRs 03, 05, 07, 08, 09, 10 —
  schedule reviews early; the registry holds windows in `pending-review` meanwhile.
- **Imagery** is banned from decks until provenance records are demonstrated (PR 04 is the first
  candidate); the SVG character system is the default visual language.
- **Safari 7-day storage eviction** may clear folio stamps between visits; the export backup and
  position-based fallback contain it (revisit in PR 12 if the school reports loss).
