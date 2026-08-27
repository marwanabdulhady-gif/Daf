# PR 05 research · Topics 5–17 — Seven-Stages production deepening (66 lessons)

**Research completed:** 2026-08-27
**Scope:** the Seven-Stages deepening pass for every remaining topic after PR 04 —
**Topics 5–17 (66 lessons: 5-1…17-10)**, joining the already-deepened Topics 1–4 (28 lessons).
Each lesson now owns a researched, lesson-specific **Stage 5 Production** set (three STEAM builds,
one AI-in-the-loop), plus authored home questions (Stage 1), gap-map claims (Stage 2), a genuinely
new independent practice item and a harder lane (Stage 4), all in the unit's own story voice and
grounded in the `sources` carried by each `stage/topics/<n>.json` file.

**Research-first rule followed.** Before a topic's productions were written, approved Grade-4
STEM activities and real-experiment projects for that content were researched; every topic file
ships its `sources` list (checked by `scripts/check-stage-plan.js`, which fails a deepened topic
without them). The list below summarises what was used.

## Topic → real-experiment / approved-activity grounding

| Topic | Unit arc | Productions grounded in |
|---|---|---|
| 5 — Divide by 1-digit | The caravan of equal loads | Interpreting-remainders context decisions (round up / drop / report / share) per Illustrative Mathematics & 4.OA.A.3; charity donation distribution (FLDOE/CPALMS "Array for Charity"); measured fair-share water experiments (The Water Project; Cal Academy "A Drop in Your Cup"); Stanford DREME fair-sharing; NJ ag-society equal-row data |
| 6 — Whole-number problem solving | The council of competing plans | Multiplicative comparison models (4.OA.A.2); multi-step with a letter for the unknown and reasonableness estimates (4.OA.A.3); paper-bridge fair tests producing real "times as many" data (Science Buddies; WPI decision-matrix); open-ended fundraiser PBL; Data Nuggets; NGSS argument-from-evidence |
| 7 — Factors and multiples | The reef of hidden rectangles | Factor Factory array building and Factor City (mathteachercoach.com); 5-day "Plan a Field Day" PBL (4.OA.B.4); Candy-Boxes 1–36 rectangle wall and prime conjecture investigations; IM factor/multiple games; periodical-cicada prime 13/17-year cycles as real math-in-nature (LCM); Georgia Organics square-foot garden (arrays & division) |
| 8 — Fraction equivalence & ordering | The islands with different names | Student-built folded fraction strips and human number lines (SJSU math-institute practice); patty-paper layering; CPALMS "Are You My Equal?" / "Chocolate Fractions"; Cooking-School measuring-cup equivalence; NGSS argument-from-evidence for the construct-arguments lesson |
| 9 — Fraction addition & subtraction | The kitchen of shared trays | Like-denominator tray/bar models (4.NF.B.3); real measuring-cup joins and pour-backs; cooked recipe scaling; square-foot-garden cells that add to one whole (Georgia Organics); whole-and-loose-piece carrying and whole-breaking for mixed numbers |
| 10 — Fraction multiplication & time | The clockmaker's repeated portions | Fraction as repeated unit fraction (4.NF.B.4); real recipe doubling/halving; garden-plot multiplying-fractions STEM project (4.NF.B.4); repeated fractional batch fills; elapsed-time number-line "hop" model (4.MD.A.2) |
| 11 — Line plots | The pearl diver's evidence board | Measuring real pencils/insects/marshmallow throws to fractions and plotting (CPALMS MA.4.DP.1.1 tasks); seedling-growth line-plot garden lesson (UGA Extension, MD.B.4); plant fair-test data packets; fitness/paper-airplane data collection; Data Nuggets claim discipline for the critique lesson |
| 12 — Decimals | The docks of tenths and hundredths | Money as the tenths/hundredths model (riyal/halala, dimes/pennies grids; TEKS 4.2E family); decimal grid and number-line placements (4.NF.C.6/C.7); 10→100 trading (4.NF.C.5); transparent receipt/procurement money tasks (4.MD.A.2) |
| 13 — Measurement equivalence | The market of honest measures | Two-column conversion tables for customary and metric (4.MD.A.1); classroom area with one-foot squares (NJ ag-society); school-garden site survey and perimeter/area (Vivify; 4.MD.A.3); kitchen capacity/weight conversions; choose-the-tool precision (MP.5) |
| 14 — Patterns | The pattern hidden in the folios | Growing-figure staircase/tiling; input-output rule tables (4.OA.C.5); bead/bracelet and weaving repeating cores; tile-façade algorithms tested by an uninstructed builder (unplugged algorithm PBL) |
| 15 — Angles | The observatory of turning light | Clock/wheel 360° turn fractions (4.MD.C.5); unit-wedge angle filling; 5-day "Design a Playground" angles PBL (4.MD.C.6); paper sun-shade arm prototype; additive angles (C.7); appropriate-tools precision |
| 16 — Lines, angles, shapes | The garden of strong shapes | Classifying triangles and quadrilaterals with inclusive naming (4.G.A.1/A.2); fold-tests for line symmetry and grid mirror reflections (4.G.A.3); real-architecture line survey; counterexample reasoning (the 3-4-5 right scalene triangle) |
| 17 — Step-Up to Grade 5 | The grand gate and the letter forward | Decimal thousandths and decimal add/subtract & estimate (5.NBT); common-denominator unlike-fraction add/subtract (5.NF.A.1); fraction-of-a-whole scaling and whole ÷ unit fraction (5.NF.B); cube-packing box volume and l·w·h (5.MD.C) for the final pavilion exhibition model |

## STEAM production choices, by design

- **Three options per lesson** (112 of 114 lessons; the generated two-option floor remains only where
  no authored topic applies — none remain). The artifact kinds actually used across 114 lessons:
  video 64, model 61, mini-project 39, poster 41, map 28, design 26, presentation 33, drawing 43,
  song 5 — covering every form the brief names (presentation, model, design, map, song, video,
  poster, drawing, mini-project).
- **Exactly one AI-in-the-loop option per lesson.** In every case the student does the mathematics,
  building, folding, pouring, counting or filming; the AI proposes, estimates, audits, challenges or
  researches, and the student verifies each result (multiply-back, fold overlay, recount, measure)
  and is expected to catch and correct the AI's mistakes — **AI as critic, never author.**
- **The STEM cycle (ask → plan → build → test → share) is written into every option** as a `stem`
  field, so the production is a build with a test, not a worksheet answer.
- **Unit artifacts close each unit:** each topic's last lesson offers the unit artifact itself as a
  mini-project build (dispatch board, decision board, scheduling kit, evidence board, procurement
  sheet, calibrated site plan, programmable façade, shade prototype, pavilion plan, exhibition model).

## Validation

- `npm run build:stages` → "17 of 17 topics deepened (114 lessons)".
- `npm run check:stages` → **stage plan OK · 114 lessons · 7 stages each · 17 of 17 topics
  deepened (114 lessons)** — the checker independently enforces: 2–3 production options, one
  `ai: true` option with kind+task+STEM cycle, a genuinely new independent item, a complete harder
  lane, three home questions, four gap claims, sources present, English-only and OMML-only.
- Every lesson HTML was rebuilt so the stamped `window.DAF_STAGE` payload carries the authored
  productions; all 114 lesson decks were verified to embed a valid 2–3 option / one-AI production.

## Open notes

1. `node scripts/smoke-stage.js` (jsdom full-deck drive) could not run in this sandbox because
   `jsdom`/network install is unavailable; it ran in the prior PR environment and remains the
   render-smoke step. The stage plan itself passes all structural checks, and every deck rebuilt
   without error with the new payload stamped.
