# Story curriculum data

`story-map.json` is the source of truth for the proposed **Lantern of Numeria** narrative layer.
It covers all 17 curriculum topics and all 114 lessons, but it is intentionally separate from
`curriculum.json` until the school approves the frame.

## Truth-status model

The proposal keeps three kinds of content separate:

1. **Fictional frame** — Mariam, Zayd, the lantern and Numeria. These characters may speak, make
   decisions and experience design consequences.
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
