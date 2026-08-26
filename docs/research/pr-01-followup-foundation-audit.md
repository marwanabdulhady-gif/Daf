# PR 01 follow-up research · Story foundation audit and completion

**Research completed:** 2026-08-24
**Scope:** audit of the merged PR 01 storytelling foundation — `story/story-map.json`,
`story/stem-sources.json`, `engine/story-components.jsx`, `scripts/story-for-lesson.js`, the
embedded `DAF_STORY` payload in all 115 built decks, Lesson 1-1, and the automated checks — and
the completion work required before PR 02 (source/review infrastructure + durable story state) opens.
**Religious scope:** no Seerah or companion account is published by this PR. The audit verifies that
no Amanah window content has shipped and adds a build-time guard against shipping any.
**Linked issue:** [#14](https://github.com/marwanabdulhady-gif/Daf/issues/14)

## Questions investigated

1. Does the merged PR 01 foundation match its research-gate claims, deliverable by deliverable?
2. What automated protection is missing from the source registry and the embedded story payload that PR 02 depends on?
3. Does shipped Lesson 1-1 student-facing wording match the PR 01 approved wording, and do the registry sources remain live and accurate?
4. Which findings are blockers for PR 02, and what exactly does "foundation complete" mean?

## Deliverable audit · PR 01 claims vs. what shipped

| PR 01 deliverable (roadmap) | Status | Finding |
|---|---|---|
| Organized repository | Verified | `story/`, `docs/research/`, `engine/story-components.jsx`, `scripts/` as planned |
| Flexible screen plan | Verified | `check:story` passes: 114 lessons, 6 shapes, bands and targets valid |
| Omar/Zayd SVG system | Verified | `StoryCharacter` with `role="img"`, `aria-label` and `<title>`; fictional, non-sacred |
| Truth-lane components | Partial | Fiction and STEM lanes ship and render; the Amanah lane has CSS and a registry slot but no review gate — F6 |
| Embedded story payload | Partial | `build.sh` stamps `DAF_STORY`, but only Lesson 1-1 was rebuilt; 114 decks carry no payload — F1 |
| Source registry | Partial | `stem-sources.json` exists with wording, teacher note and two live sources, but has no schema, no status control and no validation — F2 |
| Lesson 1-1 vertical slice | Verified | Payload fresh, wording character-identical to the PR 01 approved text, lane labels and simulated-data label present — F4, F7 |
| Automated checks | Partial | Plan, research-gate and 19 guardrail checks exist; payload freshness, registry schema and sacred-lane protection are absent — F2, F6, F8 |

## Evidence and decision matrix

| ID | Finding / proposed claim | Evidence | Decision | Implementation consequence |
|---|---|---|---|---|
| F1 | 114 of 115 built decks (all lessons except 1-1, plus boss 13) carry no `DAF_STORY` payload. A rebuild of Lesson 1-2 against the committed file differs **only** by the three PR 01 story-layer hunks (story CSS in `head.html`, the `DAF_STORY` script block, `story-components.jsx`) — no OMML, canvas or roster change. | Rebuild diff of `html/lesson-1-2-*.html`; `build.sh` payload stamping; `story-for-lesson.js` | **Accepted** | Run `./rebuild-all.sh` to stamp every deck consistently; add a payload-freshness check so the gap can never reopen silently. |
| F2 | `stem-sources.json` is free-form: its single window carries the uncontrolled status `source-checked draft`, and nothing validates schema, lesson codes, topic consistency, source URLs or status. PR 02's Amanah approval states and source linting build on this registry. | `story/stem-sources.json`; absence of any validator; `docs/research/README.md` status model (`accepted / qualified / rejected / pending review`) | **Accepted** | Controlled status vocabulary `source-checked / pending-review / blocked / rejected`; only `source-checked` is publishable; new `check-story-foundation.js` validates the registry; `story-for-lesson.js` embeds publishable windows only. |
| F3 | A coarse scan finds the word "invented" in 5 files (story-map, registry, Lesson 1-1 deck, Lesson 12-2 deck, plan HTML). Every occurrence is either a negative/policy usage ("not invented by one person", "without claiming that one culture invented irrigation", "avoids 'invented algorithms' simplification", "no religious figure is assigned invented food amounts", "avoid simplistic 'X invented Y' claims", "suppliers of invented data"), a teacher-facing launch/misconception line, or a student math statement about tenths/hundredths ("Nothing new is invented"). No historical invention-attribution claim ships student-facing. | Full-context grep across `story/`, `html/`, `docs/plans/`; PR 01 rejected claim H2 ("Al-Khwarizmi invented our numerals/zero/place value") | **Qualified** | A scoped lint: flat ban on `invented / first to / discovered zero / sole inventor` in student-facing STEM `studentText`; negation-aware rule for unit STEM anchors. All current content passes; the rule guards future authoring. |
| F4 | Shipped Lesson 1-1 STEM-window `studentText` is character-identical to the PR 01 approved student-facing historical wording, and both registry sources are live and consistent with that wording. | Programmatic character comparison of the embedded payload vs. `docs/research/pr-01-foundation-and-lesson-1-1.md`; [MacTutor · Al-Khwarizmi](https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/) fetched 2026-08-24 — "Al-Khwarizmi was an Islamic mathematician who wrote on Hindu-Arabic numerals"; [Britannica · Zero](https://www.britannica.com/science/zero-mathematics) fetched 2026-08-24, reachable | **Accepted** | Wording re-confirmed, no change. The foundation check pins the registry as the single source of the embedded wording. |
| F5 | 97 of 114 story-map `handoff` fields are generic author instructions ("End on the object or unanswered need that opens …"), including the only built lesson, 1-1, whose shipped deck carries the real handoff. | `story/story-map.json`; `lessons/1-1.jsx` handoff screen | **Accepted** | 1-1's map handoff is replaced with the shipped handoff text; the plan checker forbids generic handoffs on any lesson once it is marked implemented. The remaining 113 stay instructions until their own PR authors the lesson (roadmap PRs 03–10). |
| F6 | `StoryShell` accepts `lane="amanah"` with no review gate; the lane has CSS and a `STORY_LANES` entry, so an unreviewed sacred window could be authored into a deck. No current deck uses the lane. | `engine/story-components.jsx`; grep of all decks; merge policy in `docs/roadmap/storytelling-pr-roadmap.md` ("A religious `pending review` item cannot be published student-facing") | **Qualified** | Build-time lint: no built deck may contain `lane="amanah"`. The runtime block and the Amanah approval-state component are PR 02 scope (its research gate must cover them). |
| F7 | Lesson 1-1 labels its civic number as simulated in two places: "The folio uses a simulated Jeddah planning figure" (screen text) and "This lesson uses simulated data" (launch note). This satisfies the PR 01 decision D1 (4,697,000 is a simulated planning figure, not a census claim). | `lessons/1-1.jsx`; built deck; PR 01 decision D1 | **Accepted** | The foundation check asserts the `simulated` label and the lane labels (`Our story`, `History of useful knowledge`) and the registry source URLs in the built pilot deck. |
| F8 | `check-research-gate.js` requires five headings, two source links and a bold PASS, but the `docs/research/README.md` template also requires student-facing wording and reviewer status, which no validator enforces. | `scripts/check-research-gate.js` vs. `docs/research/README.md`; PR 01 report satisfies both new rules | **Accepted** | Additive validator rules (a student-facing wording section; a reviewer/religious-scope statement), backward compatible with the PR 01 report. |
| F9 | The plan page lists `StoryRecap` and `MissionCard` as components to add; PR 01 shipped `StoryShell`, which carries the mission title, text, clue and folio progress, so the pilot does not need separate cards. `StoryRecap` (cross-lesson callback) is only needed once a second story lesson exists. | `engine/story-components.jsx`; `lessons/1-1.jsx`; `docs/plans/storytelling-curriculum-plan.html` | **Qualified** | No action now. `StoryRecap` is deferred to PR 03, which authors the second Topic 1 story lesson; re-check then. |
| F10 | Boss 13 has no story payload; `story-for-lesson.js` emits `null` for codes absent from the story map, and boss decks were built before the stamping step existed. | `scripts/story-for-lesson.js`; `html/lesson-boss-13-*.html` | **Accepted** | The rebuild stamps an explicit `null` boss payload; the foundation check requires `null` (or a valid mapped payload once a boss joins the story map). |

## Student-facing wording

- **Re-confirmed, unchanged.** The Lesson 1-1 STEM window ships exactly the PR 01 approved wording:
  > The digits we use belong to the Hindu-Arabic numeral tradition. Place-value methods developed in
  > India. Scholars working in the Islamic world studied, explained and transmitted them. Around the
  > ninth century, al-Khwarizmi wrote about calculating with Hindu numerals. Knowledge travelled
  > because people made methods clear enough for others to use.
- Both registry sources were re-fetched on 2026-08-24 and remain consistent with that wording
  (see F4). The registry — not the deck — is the single source of this text; the foundation check
  enforces that the embedded copy matches the registry byte for byte.
- No new historical, civic or sacred claims are introduced by this PR. No student-facing wording
  changes; the only data edits are the Lesson 1-1 handoff text (F5) and the registry status token (F2).

## Mathematical verification

- No new mathematics is introduced by this PR. The audit re-verified the shipped Lesson 1-1 values
  against the PR 01 report: `4,697,000` has seven digits with periods `4 | 697 | 000`;
  `62,415 = 60,000 + 2,000 + 400 + 10 + 5`; "three hundred five thousand, seventy-two" is `305,072`
  with the zero holding the hundreds place; the four-option reveal screen marks `305,072` correct.
- The rebuild that closes F1 was verified to change only story-layer content: the 1-2 diff contains
  exactly the story CSS block, the `DAF_STORY` script and `story-components.jsx` — no OMML strings,
  no canvas code, no roster data. All 114 lesson screens and the boss remain byte-identical in their
  mathematical payload.
- Baseline before completion work: `npm test` 25/25; `npm run verify` 115 decks, 2,185 guardrail
  checks, 0 failures; `npm run check:story` and `npm run check:topic -- 1` pass.

## Automated checks added or extended

1. `scripts/check-story-foundation.js` (new, run by `npm run check:story`):
   - registry schema, unique ids, valid lesson codes, topic consistency, https source URLs;
   - controlled status vocabulary; only `source-checked` windows embed;
   - scoped prohibited-claim lint (F3) on student-facing STEM text and unit STEM anchors;
   - payload freshness for every built lesson deck and explicit `null` for boss decks;
   - sacred-lane guard: no `lane="amanah"` in any built deck, no Amanah payload fields (F6);
   - built lessons must exist in `html/` and must carry a real (non-generic) handoff (F5);
   - pilot deck must carry the lane labels, the simulated-data label and its registry source URLs (F4, F7);
   - story data is Arabic-script-free.
2. `scripts/check-story-plan.js`: built-lesson handoff rule (F5).
3. `scripts/check-research-gate.js`: student-facing wording and reviewer-status rules (F8).
4. `scripts/story-for-lesson.js`: embeds publishable windows only (F2).

## Open risks and deferred work

1. **Browser sweep:** the sandbox cannot download a Chrome binary, so `npm run sweep:topic -- 1`
   could not run here. The rebuild changed no mathematical content (verified by diff), but the
   reviewer must run the Topic 1 browser sweep (and a projector pass) before merging.
2. The 113 remaining handoff instructions stay in `story-map.json` until each lesson is authored by
   its roadmap PR; the plan checker enforces a real handoff at that moment.
3. The Amanah lane runtime block and approval-state component are PR 02 scope; the build-time lint
   (F6) is the interim guard.
4. `StoryRecap` is deferred to PR 03 (first moment a second story lesson exists) — F9.
5. Source liveness is a point-in-time check (2026-08-24). PR 02's source infrastructure should add
   re-verification dates and archival for links.
6. No Seerah content is approved by this report; no qualified reviewer engagement is required for
   this PR because no sacred content ships.

## Reviewer status

Qualified religious reviewer: **not engaged — not applicable** (no Seerah/companion content in scope).
Source reviewer: al-Khwarizmi/Hindu-Arabic wording re-verified against the two live registry sources
on 2026-08-24 (F4).

## Gate verdict

**PASS** — the PR 01 foundation audit is complete: every PR 01 deliverable is verified or its gap is
recorded (F1–F10), the student-facing historical wording is re-confirmed against live sources, and
the completion work (uniform payload stamping, controlled source registry, foundation checks,
sacred-lane guard, handoff integrity) is scoped and validated. This closes the foundation before
PR 02 opens; it is not approval of PR 02's scope, which requires its own research gate.
