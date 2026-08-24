# Ordered pull-request roadmap · Lantern of Numeria

This is a sequential program. A later PR must not open until the preceding PR is merged and its own
research gate is complete. The fixed Arena branch is reused only after each prior PR closes; opening
parallel PRs from the same head would duplicate unreviewed changes and violate the research-first rule.

## PR sequence

| Order | Pull request | Research gate before implementation | Principal deliverables | Depends on |
|---:|---|---|---|---|
| 01 | Foundation + Lesson 1-1 vertical slice | Storytelling evidence; mathematics representations; Grade 3–5 engineering/PBL; numeral-history attribution; data provenance; accessibility; religious scope | Organized repository, flexible screen plan, Omar/Zayd SVG system, truth-lane components, embedded story payload, source registry, Lesson 1-1, automated checks | — |
| 02 | Source/review infrastructure + durable story state | Offline/localStorage behavior; data retention/privacy; source-display usability; reconstruction/image rights; school review workflow | Research registry schema, Amanah approval states, image provenance fields, class folio/artifact state, export/reset controls, source and religious-review linting | 01 |
| 03 | Complete Topic 1 | Current civic-data candidates; place-value history; Al-Amin source packet and qualified school review; Grade 4 place-value misconceptions | Lessons 1-2 to 1-5 at planned flexible lengths, completed census/services artifact, Topic 1 exhibition brief | 02 |
| 04 | Topics 2–4 · ledgers, arrays and workshop systems | Historical bookkeeping/paper; mechanisms attributed to Banu Musa/al-Jazari; local budget/material contexts; addition/multiplication misconceptions | Story/STEM/PBL integration for Topics 2–4, source cards, unit artifacts and handoffs | 03 |
| 05 | Topics 5–7 · distribution, decisions and modular design | Non-sacred logistics; al-Idrisi/cartography; geometric design attribution; Hijrah and Madinah-community review by qualified school reviewer | Flexible lessons and artifacts for division, multistep operations, factors/multiples; Act I public product | 04 |
| 06 | Topics 8–10 · fair shares, fraction operations and time | Irrigation/survey history; recipe/pharmacy provenance; timekeeping instruments; fair-dealing/generosity/shura review; fraction misconception audit | Fraction/water/kitchen/time story arc, models, tests, artifacts and source cards | 05 |
| 07 | Topics 11–12 · data and decimals | Jeddah/Red Sea data ownership and sampling; pearling claims; al-Kashi/decimal attribution; Hudaybiyyah review; money/data privacy | Student/class data workflow, line-plot evidence board, decimal procurement audit, source metadata | 06 |
| 08 | Topic 13 · honest measurement + boss | Al-Khazini/Balance of Wisdom; units and calibration; authenticated honest-measure source and qualified review; perimeter/area misconceptions | Measurement labs, calibrated field kit, reviewed Amanah Window, redesigned source-safe unit boss | 07 |
| 09 | Topics 14–16 · patterns, optics and architecture | Algorithm terminology; al-Khwarizmi scope; Ibn al-Haytham/optics; architectural provenance; opening of Makkah/Farewell Sermon qualified review | Pattern algorithm, shade-arm prototype, pavilion plan, three truth lanes and Act III exhibition | 08 |
| 10 | Topic 17 + final exhibition | Grade 5 boundary audit; model materials/safety; exhibition/privacy/photography policy; legacy-window qualified review | Grade 5 bridge, volume model, evidence portfolio, public exhibition and next-class letter | 09 |
| 11 | Whole-course progression and assessment | Motivation/points evidence; validity of XP-to-marks conversion; assessment fairness; data privacy; parent-facing reporting | Final folio/map progression, balanced boss/review model, PBL rubrics, reports and safe persistence | 10 |
| 12 | Accessibility, performance and release audit | WCAG 2.2 mapping; reduced motion; screen reader/MathML; projector tests; offline/CDN risks; source completeness; classroom pilot results | Canvas reduced-motion mode, keyboard/focus audit, responsive/projector QA, offline policy, source and religious sign-off report, final 114-lesson sweep | 11 |

## Required artifacts in every PR

- `docs/research/pr-NN-<scope>.md`
- linked GitHub research issue
- claim/source decision matrix
- exact student-facing factual wording
- explicit list of rejected or qualified claims
- mathematics and standards check
- data provenance/synthetic-data labels
- Seerah reviewer status when applicable
- accessibility impact
- before/after lesson map
- build, unit-test, story-validator and browser/guardrail results

## Merge policy

- Research-only commits may precede implementation within the same ordered branch cycle.
- The implementation PR remains draft until the research issue is closed as `gate: passed`.
- A religious `pending review` item cannot be published student-facing; it may exist only in a blocked source registry.
- A PR with an unresolved false/unsupported claim is not mergeable.
- Later PRs must re-check any inherited source whose wording or use changes.
