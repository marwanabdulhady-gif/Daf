# Research gate for storytelling pull requests

No storytelling implementation pull request may be opened before its research gate is complete.
The gate exists to prevent attractive but inaccurate mathematics, history, civic data or sacred
content from entering student-facing decks.

## Required sequence

1. Open the ordered GitHub research issue for the intended PR.
2. Inventory every factual, mathematical, historical, real-world and religious claim the PR needs.
3. Prefer primary sources, standards bodies, scholarly reference works and institutional guidance.
4. Record findings in `docs/research/pr-NN-<scope>.md`.
5. Mark every proposed claim as `accepted`, `qualified`, `rejected` or `pending review`.
6. For Seerah, obtain qualified school/Islamic Studies approval. Web research is not a substitute.
7. Define the precise student-facing wording and the teacher-facing source note.
8. Identify risks, disagreements, synthetic data and unresolved gaps.
9. Run the research validator and all relevant curriculum/build checks.
10. Only then implement and open the PR, linking the research issue and report.

## Minimum evidence by content type

| Content | Minimum gate |
|---|---|
| Mathematics | curriculum standard plus independent calculation/model verification |
| Pedagogy | evidence review or guidance from a credible education/research institution |
| Historical STEM | two credible sources where a priority/attribution claim is made; cautious wording when evidence is incomplete |
| Current civic data | authoritative owner, geography/definition, publication date and retrieval date |
| Simulated data | explicit `simulated`, `fictional` or `classroom data` label on the student screen |
| Seerah/companions | cited source, translation, exact wording and qualified reviewer approval |
| Accessibility | applicable WCAG/CAST requirement plus keyboard, motion and screen-reader check |
| Images/reconstructions | rights/provenance record and a distinction between historical object and modern reconstruction |

## Automatic blockers

A PR must not ship when it contains:

- an unsupported “first,” “invented,” population, date or quotation;
- simulated data presented as a current fact;
- an unreviewed sacred-history window;
- invented dialogue or quantities attributed to sacred or historical figures;
- a historical reconstruction presented as an original object;
- a story interaction that can succeed without doing the mathematics;
- unresolved mathematical disagreement in a worked answer or model.

## Report template

Each report records: scope, research questions, source matrix, accepted and rejected claims,
student-facing wording, implementation decisions, open risks, reviewer status, and a signed gate
verdict. The pull-request template requires links to both the issue and report.
