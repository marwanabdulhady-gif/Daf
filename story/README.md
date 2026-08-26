# Story curriculum data

`story-map.json` is the source of truth for the **Lantern of Numeria** narrative layer. It covers
all 17 curriculum topics and all 114 lessons and remains separate from `curriculum.json` so story,
source and religious review status never alter the mathematical scope. Lesson `1-1` is the first
implemented vertical slice; the remaining lesson records are the rollout plan.

`stem-sources.json` (schema v2) stores student wording, inquiry prompts, teacher cautions and links
for reviewed STEM windows. Every source carries an `accessed` date (the last verification fetch) —
the foundation check rejects missing or future dates. An optional per-window `image` record holds
the provenance that any future imagery needs before it may ship student-facing: `kind`
(`historical-object / modern-reconstruction / original-illustration / student-work`), `rights`
(license + holder), `credit`, `source` (https URL) and `date`. Reconstructions must be labelled as
reconstructions, and until that rule is demonstrated **no built deck may contain any `<img>`
element** (foundation check). `scripts/story-for-lesson.js` extracts only the payload needed by one
standalone deck, and `scripts/story-payload.js` is the single code path both the build and the
foundation check use, so an embedded payload can never drift from this data silently.

`amanah-sources.json` is the blocked registry for sacred-history (Amanah) windows. Its states are
`draft → pending-review → approved / blocked / rejected`. A window may ship student-facing **only**
as `approved` with the complete six-field audit record — exact `studentText`, `source`,
`translation`, `reviewer`, `reviewDate` (per the plan page and `docs/research/README.md`; web
research is not a substitute for qualified school/Islamic Studies approval). The 17 planned unit
Seerah windows live here as `pending-review` with `studentText: null`; they are visible to teachers
in the registry and in review tooling, never in a deck. `AmanahWindow` (in
`engine/story-components.jsx`) renders only approved windows, and the payload embeds only approved
ones — a double gate enforced by `npm run check:story`.

## Source registry status vocabulary

Every window in `stem-sources.json` carries one controlled status:

| Status | Meaning | May ship student-facing? |
|---|---|---|
| `source-checked` | Wording verified against cited sources, teacher note set | **Yes** — the only publishable status |
| `pending-review` | Drafted but not yet source- or reviewer-checked | No — registry only |
| `blocked` | On hold (disagreement, rights, or review outstanding) | No — registry only |
| `rejected` | Claim declined by the research gate | No — kept for the record |

`story-for-lesson.js` embeds `source-checked` windows only, and `npm run check:story` fails if a
deck embeds anything else, a status leaves the vocabulary, or a required field/https source is
missing. Amanah (Seerah) windows never live in this file: they require the qualified-review
infrastructure of roadmap PR 02, and until then no deck may render the Amanah lane at all (the
foundation check enforces this).

## Prohibited attribution wording

Student-facing STEM `studentText` must not use `invented`, `first to`, `discovered zero` or
`sole inventor` (the numeral tradition is cumulative and cross-cultural — see the PR 01 research
gate, claim H2). Unit STEM anchors in `story-map.json` may quote such wording only to reject it
(e.g. "without claiming that one culture invented irrigation"). The foundation check enforces both
scopes.

## Truth-status model

The proposal keeps three kinds of content separate:

1. **Fictional frame** — Omar and Zayd are the two boy protagonists; the lantern and Numeria form
   their story world. They may speak, make decisions and experience design consequences. Both boys
   reason, build and revise; their instructional lead roles rotate.
2. **Documented STEM history** — source-checked accounts of people, manuscripts, instruments and
   engineering practices. Claims must distinguish invention, development, description,
   transmission and reconstruction.
3. **Seerah / Amanah Window** — qualified-review content only. The Prophet Muhammad ﷺ and his
   companions are never fictionalized, depicted, assigned invented dialogue or quantities, or used
   as game characters.

## Schema

Each unit records its chapter title, driving question, unit artifact, STEM history anchor, protected
Seerah window, PBL product and bridge to the next unit. `screenDesign` defines flexible phases,
authoring rules and six planning shapes. There is no course-wide slide quota.

Each lesson records:

- `storyBeat` — its chapter-level episode title;
- `technique` — the storytelling move being used;
- `storyMove` — the problem or reveal that creates the mathematical need;
- `studentMission` — the observable mathematical action;
- `handoff` — the object or unanswered need that opens the next lesson;
- `screenPlan` — a lesson-specific shape, recommended count, non-binding planning band and rationale.

## Generate the readable plan

From the repository root:

```bash
npm run build:story-plan
```

This writes `docs/plans/storytelling-curriculum-plan.html`, a standalone, searchable plan suitable
for review and printing.

## Durable class folio state (localStorage)

Each built deck carries `engine/folio-state.js`: a per-class record of restored folio pages in
localStorage on the classroom computer (key `daf.folio.v1`).

- **What it stores:** class name → lesson codes → ISO timestamps. **Nothing else** — no student
  names, no scores, no free text. Student records remain in the per-lesson dojo session log,
  exported on demand. Under Saudi PDPL this is not personal data (it identifies a class, not a
  person); the design still minimises and keeps it local-only.
- **What it is not:** not sync, not a server, not critical state. localStorage is best-effort
  (~5 MB per origin, evictable, and Safari drops script-writable storage after 7 days of no use),
  so when it is missing or cleared the deck simply falls back to position-based folio pips.
- **Controls:** the story handoff screen has a "Restore this folio page" tap (class record, no
  points); the dojo footer has **folio export** (JSON download the school can keep) and
  **reset folio** (with confirm). The retention note ships in the dojo footer.

## Embedded payload and foundation checks

Every built lesson deck carries `window.DAF_STORY` — the characters, its unit, its lesson record
and its publishable STEM windows — stamped in by `build.sh`. Decks for codes that are not in the
story map (bosses, until a later roadmap PR maps them) embed an explicit `null`. After editing
`story-map.json` or `stem-sources.json`, run `./rebuild-all.sh`; `npm run check:story` then verifies:

- the 114 flexible screen plans against `curriculum.json` (and that implemented lessons carry a
  real handoff, not the authoring instruction);
- the source registry schema (v2), controlled status vocabulary, re-verification dates,
  image-provenance records and prohibited-wording lints;
- the Amanah registry — approval-state vocabulary and the six-field record that `approved`
  requires, with no non-approved student-facing text;
- that every built deck's embedded payload matches the current story data exactly, and that any
  embedded Amanah window is fully approved;
- that no deck uses raw `lane="amanah"` (the `AmanahWindow` component is the only path) and that
  no deck contains an `<img>` element;
- that implemented lessons have a built deck and (for STEM lanes) their source URLs in the deck.

## Converting a lesson to the full story treatment (how the HTMLs get updated)

The built decks are **generated artifacts — never edit `html/` by hand.** A lesson's HTML
updates itself from three sources: `story/story-map.json` (the lesson record),
`story/stem-sources.json` (windows) and `lessons/N-N.jsx` (the lesson). Everything in the
standard checklist falls into one of two buckets:

**Automatic — the payload and components render them (no per-screen work):**
character ribbons, the unit shape motif, folio progress (stamp-aware: pips light from
`daf.folio.v1` stamps, position-based fallback), the `Our story` lane label, the
`History of useful knowledge` label with dated, source-visible teacher notes (where a window
renders), the artifact-update and cliffhanger UI, and the v2 payload itself (characters, unit,
mission, folio position, PBL artifact, handoff, windows + sources). The story layer carries
**zero award/XP wiring** — the only XP in a deck is the published economy on mathematical
acts. The Seerah lane is automatically empty: the registry has no approved windows, and
`AmanahWindow` plus the payload filter form an approved-only double gate.

**Authored — written into the lesson JSX and story map:**
the cold open (`character="lantern"` on the warmup screen), the simulated-data label on the
first civic number, the per-screen story lines (titles, text, clues), the role rotation, and
the real handoff.

**Recipe (per lesson, inside its roadmap PR):**

1. `story/story-map.json` — replace the generic handoff ("End on the object…") with the real
   handoff text; after authoring, set `"implementationStatus": "story-built"`.
2. `story/stem-sources.json` — only if this lesson is the unit's window lesson: add the window
   (status `source-checked`, `accessed` dates, cautious wording).
3. `lessons/N-N.jsx` — rewrite `metas` (phase/title/lead/goal/pull/rail) and the `Visual`
   switch at the lesson's planned screen count, keeping the existing OMML (`M`) object and
   canvas draws (the math does not change). Screen template at the 1-1 shape:
   - **0 warmup** — `StoryShell lane="fiction" character="lantern"` + `NoticeWonder` (cold open)
   - **1 launch** — `character="omar|zayd" pose="question"` + `LaunchEstimate` (note: *simulated*)
   - **2…n monitor** — `character="zayd" pose="build"` / `character="omar"` + `ExploreChips` /
     `CardSort` — roles rotate
   - **connect** — `character="both" pose="present"` + `CompareConnect` (student voices → Sijill)
   - **synth** — `BoardScreen`; on a window lesson instead `<STEMWindow window={STORY.stemWindows[0]}>`
   - **swyk** — `character="omar" pose="question"` + `ShowWhatYouKnow`
   - **last** — `StoryHandoff title text artifact next` + `Closing` (the cliffhanger)
   Never attach `award` to a story tag.
4. **Build** — `./build.sh N-N "Title"` stamps the v2 payload; after engine changes,
   `./rebuild-all.sh` restamps all 115 decks.
5. **Verify** — `npm run check:story` (proves the deck's payload matches the story data
   byte-for-byte, registry + sacred-lane guards), `npm run verify` (2,185 guardrail checks),
   `npm run check:topic -- N`, then the browser sweep and the 141-check standard audit
   (see `docs/plans/story-lesson-rollout-plan.md`).

Legacy decks (1-2…17-10 except the built ones) already carry the engine and v2 payload — they
simply do not use the story components yet; each roadmap PR authors its topic, and the
cinematic frame upgrade rides in with PR 04 (`docs/plans/cinematic-english-style-plan.md`).

