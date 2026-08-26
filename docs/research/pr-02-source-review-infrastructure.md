# PR 02 research · Source/review infrastructure + durable story state

**Research completed:** 2026-08-24
**Scope:** the research gate for PR 02 — registry schema v2 (re-verification dates, image
provenance, rights), Amanah approval states and the Amanah Window component, class
folio/artifact state in localStorage with export and reset controls, source-display
usability on the projector, and the source/religious-review linting that enforces all of it.
**Religious scope:** no Seerah or companion account is published by this PR. The planned unit
Seerah windows enter a new blocked registry in `pending-review` state with no student-facing
text; qualified school/Islamic Studies review happens in the PRs that author each window
(roadmap PRs 05, 08, 09, 10).
**Linked issues:** [#2](https://github.com/marwanabdulhady-gif/Daf/issues/2) (canonical
roadmap gate issue for PR 02) and
[#16](https://github.com/marwanabdulhady-gif/Daf/issues/16) (this gate's detailed log).

## Questions investigated

1. What are the reliable, documented semantics of localStorage for classrooms used offline
   (limits, persistence, eviction, failure modes), and what storage design follows from them?
2. What may a class-level folio state store — and must not store — so that no personal student
   data exists in browser storage, under Saudi PDPL and sound children's-data practice?
3. How should teacher-facing source notes be presented on a projector so source-checking is a
   one-tap, legible teacher action (WCAG 1.4.4)?
4. What provenance and rights record is required before an image of a historical object, or a
   modern reconstruction, may ship student-facing?
5. What fields and state transitions make a qualified school/Islamic Studies review of an
   Amanah Window auditable, and what must remain teacher-only until approved?

## Evidence and decision matrix

| ID | Finding / proposed claim | Evidence | Decision | Implementation consequence |
|---|---|---|---|---|
| S1 | localStorage is ~5 MB per origin, best-effort, and can be evicted: browsers apply LRU origin eviction under storage pressure, Safari removes script-writable storage after 7 days without user interaction, writes throw `QuotaExceededError` at the limit, and `navigator.storage.estimate()/persist()` are the only reliability levers. | [MDN · Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API); [MDN · Browser storage limits and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria); [storage-limit test write-up (Chrome, 2025)](https://dev.to/tommykw/testing-storage-limits-of-localstorage-and-sessionstorage-in-chrome-21ab) | **Accepted** | Folio state must be (a) tiny — a few KB of JSON, never media; (b) non-critical — every deck works identically when storage is missing, cleared or evicted; (c) exportable — one tap produces a JSON backup; (d) single-machine — state is per classroom computer, with no sync and no server. |
| S2 | Saudi PDPL (Royal Decree M/19, in force 14 Sept 2023, fully enforced since 14 Sept 2024, regulator SDAIA) defines personal data as information relating to an identifiable person; fully anonymized data is outside scope; for children, a legal guardian may consent on the child's behalf. A class-level record keyed by class name, holding lesson codes and timestamps only, is not personal data, and the export/reset pair gives the school erasure control. | [ICLG · Data Protection Laws and Regulations — Saudi Arabia (2026)](https://iclg.com/practice-areas/data-protection-laws-and-regulations/saudi-arabia/); [Multilaw · Data Protection Guide — Saudi Arabia](https://www.multilaw.com/Multilaw/Multilaw/Data_Protection_Laws_Guide/DataProtection_Guide_SaudiArabia.aspx) | **Accepted** | The folio state stores **only** class name, lesson codes and ISO timestamps — never student names, never per-student story or score data (student scores remain in the per-lesson dojo session log, exported on demand, as today). No server, no transfer, no cross-class linking. A retention note ships in the teacher UI. |
| S3 | WCAG 1.4.4 (Level AA) requires text to resize to 200% without loss of content or functionality and does not mandate a pixel minimum; practical guidance is 16px-equivalent body text, relative units, no clipping. The current STEM source note is a 9.5px `<details>` — adequate at arm's length, not at projector distance. | [W3C · WCAG 2.1 SC 1.4.4 Resize Text](https://www.w3.org/TR/WCAG21/#resize-text) | **Accepted** | Teacher-facing source notes move into the Teacher Rail (T) — a readable 12px section listing each STEM window's title, status, teacher note and source links — while the compact `<details>` stays on the card. One tap, no student-facing change. |
| S4 | A photograph or scan can carry rights independent of the underlying public-domain object (in US law, angled photographs of 3D objects can be original works), and institutions may attach license conditions to reproductions; the Met's Open Access program (CC0 for public-domain images) is the model for an institutional open-license policy, and the "copyfraud" literature warns that mislabeling rights on reproductions is an ethics problem. Therefore student-facing imagery needs an explicit provenance record and a reconstruction label. | [The Met · Image and Data Resources (Open Access, CC0)](https://www.metmuseum.org/policies/image-resources); [JCMS · The Public Domain vs. the Museum (2014)](https://jcms-journal.com/articles/10.5334/jcms.1021217) | **Accepted** | Registry schema v2 adds an optional per-window `image` provenance record: `kind` (`historical-object / modern-reconstruction / original-illustration / student-work`), `rights` (license + holder), `credit`, `source` (https URL), `date`. Rule: no image may ship student-facing without a complete provenance record; reconstructions must be labelled as reconstructions; original vector illustrations (the existing SVG system) and open-license images are the preferred sources. No built deck may contain any `<img>` element until provenance is demonstrated — enforced by the foundation check. |
| S5 | The approved content model already defines the audit record for sacred content: exact student-facing text, primary/approved secondary source, translation used, Islamic Studies reviewer, review date and status — and unapproved cards remain teacher-only placeholders. Web research is explicitly not a substitute for qualified school/Islamic Studies approval. | `docs/plans/storytelling-curriculum-plan.html` ("Required record for every Amanah Window"); `docs/research/README.md` (step 6); roadmap merge policy ("a religious pending-review item cannot be published student-facing; it may exist only in a blocked source registry") | **Accepted** | New `story/amanah-sources.json` with state machine `draft → pending-review → approved / blocked / rejected`. `approved` requires all six audit fields; only approved windows with non-empty `studentText` embed into decks; `AmanahWindow` renders approved windows only (reverent, non-gamified: no XP, no clue mechanics, no invented dialogue), and shows a teacher-only placeholder otherwise. The 17 planned unit Seerah windows seed the registry as `pending-review` (blocked from student-facing) with `studentText: null`. |
| S6 | The plan page's "Shared components to add" listed `AmanahWindow` as unbuilt; PR 01a's audit (F6) added a build-time ban on `lane="amanah"` as the interim guard. PR 02 closes that guard into a reviewed component path. | `docs/research/pr-01-followup-foundation-audit.md` F6; `engine/story-components.jsx` | **Accepted** | `AmanahWindow` is the only code path that renders the Amanah lane; the build-time lint stays and now additionally forbids raw `lane="amanah"` in lesson files while requiring the component to be payload-driven. |
| S7 | Artifact-stage tracking (per unit artifact milestones) is not defined by the curriculum data yet; only the folio's lesson-stamp history is well-founded. | `story/story-map.json` (unit `artifact` is a one-line description, no stages) | **Qualified** | PR 02 ships durable **folio** state (stamped lessons, per class) and defers artifact *stage* state to the PRs that author each unit's artifact workflow (PR 03 onward), which must define the stages first. |

## Student-facing wording

- No new student-facing historical, civic or sacred wording is introduced by this PR.
- The 17 seeded Amanah windows carry **only** the plan's topic descriptions (planning text,
  teacher-facing), with `studentText: null` until a qualified reviewer approves exact wording.
- The stem-window studentText from PR 01 is unchanged; its two registry sources keep their
  2026-08-24 re-verification and now record that date as a mandatory `accessed` field going
  forward.
- New teacher-facing strings (rail "Sources" section, folio export/reset labels, retention
  note) contain no factual claims requiring sources.

## Mathematical verification

- No mathematics is introduced by PR 02: the change surface is storage, registry schema,
  linting and two teacher-facing UI sections.
- Folio pips derive from `numberInUnit` (already verified in PR 01: index + 1 of
  `lessonCount`) and from stamped lesson codes, which are curriculum codes — no new values,
  units or worked answers.
- The rebuild that ships these engine changes is checked as in PR 01a: no OMML string, canvas
  or roster content may change in any lesson deck; `npm run verify` (2,185 guardrail checks)
  and `npm test` must pass unchanged.

## Automated checks added or extended

1. `scripts/story-payload.js`: registry v2 awareness — sources must carry `accessed` dates;
   `amanahWindows` in the payload are **approved-only** (status + reviewer + reviewDate +
   non-empty studentText); image provenance validated before embedding.
2. `scripts/check-story-foundation.js`:
   - registry v2: `accessed` date required and well-formed (no future dates);
   - Amanah registry schema + state vocabulary + the six-field approval rule;
   - no non-approved Amanah window embedded in any deck; no `<img>` in any built deck;
   - folio-state schema sanity (versioned, class-keyed, no student-name fields).
3. `engine/app.jsx` + `engine/story-components.jsx`: TeacherRail "Sources" section;
   `AmanahWindow` component (approved-only, non-gamified); folio stamp control on the story
   handoff; folio export/reset in the dojo footer with a retention note.

## Open risks and deferred work

1. Safari's 7-day eviction means a class that uses the computer once a week for weeks may lose
   folio stamps between visits; the export backup and the non-critical design (position-based
   pips remain the fallback) contain this. Mitigation: encourage export at term boundaries;
   revisit if the school reports loss.
2. Multi-room schools get one folio state per browser profile per machine; there is no sync by
   design. A shared-machine workflow (one teacher account per room) is the assumption.
3. No Amanah window is approved yet — the component and state machine ship exercised by the
   `pending-review` registry and by negative tests, not by live sacred content. First real
   approval arrives with roadmap PR 05 (Hijrah/Madinah window) and requires the school's
   qualified reviewer.
4. The `<img>` ban is a phase rule: it will be relaxed window-by-window as provenance records
   are demonstrated, starting with PR 04's mechanism imagery.
5. Storage quota errors are caught and degrade silently (position-based pips); the teacher
   sees a one-line note in the rail when a stamp could not be saved.
6. No Seerah content is approved by this report; reviewer engagement is scheduled with the
   PRs that author each window, not here.

## Reviewer status

Qualified religious reviewer: **not engaged in this PR — by design.** No sacred content ships;
the seeded registry entries are `pending-review` placeholders without student-facing text.
The approval workflow they will pass through is defined and check-enforced (S5).
Source reviewer: registry `accessed` dates re-verified 2026-08-24 (Met, WCAG, MDN, PDPL
sources fetched this week; MacTutor and Britannica re-verified in PR 01a).

## Gate verdict

**PASS** — the PR 02 research questions are answered with cited evidence, the claim/source
decision matrix records accepted and qualified findings (S1–S7), the student-facing surface is
unchanged except for teacher-only additions, no sacred content ships, and the completion work
(registry v2, Amanah approval states, folio state with export/reset, rail source display,
linting) is scoped, privacy-checked and check-verified. PR 02 may proceed on the ordered
branch once PR 01a (#15) is merged.
