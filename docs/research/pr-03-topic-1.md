# PR 03 research · Complete Topic 1 (lessons 1-2 to 1-5)

**Research completed:** 2026-08-25
**Scope:** research gate for PR 03 — authoring Topic 1 lessons 1-2…1-5 as story lessons
(place-value relationships, comparison, rounding, argument construction), the unit artifact
and exhibition brief, the second STEM window, the Al-Amin Seerah review packet, and the Grade 4
place-value misconception set the screens must anticipate.
**Religious scope:** the Al-Amin window (Makkah before revelation) is drafted **for qualified
school/Islamic Studies review only**. It stays `pending-review` in the blocked registry with
`studentText: null`; web research is not a substitute for the reviewer. No Seerah content ships
in this PR unless the review has passed before merge.
**Linked issues:** [#3](https://github.com/marwanabdulhady-gif/Daf/issues/3) (canonical roadmap
gate issue for PR 03).

## Questions investigated

1. Which Grade 4 place-value misconceptions must lessons 1-2…1-5 anticipate, and which screen
   in each lesson answers each misconception?
2. Is there a documented, cautiously wordable historical basis for a second STEM window in Topic 1
   (beyond 1-1's Hindu-Arabic numeral window), and what exact student wording does the evidence
   support?
3. What must the Al-Amin Seerah review packet contain so a qualified school reviewer can approve
   or reject it on the record — and what must remain out of student-facing decks until then?
4. Do any of these lessons require **current** civic data, or do they stay on the simulated-data
   model established in PR 01 (decision D1)?

## Evidence and decision matrix

| ID | Finding / proposed claim | Evidence | Decision | Implementation consequence |
|---|---|---|---|---|
| M1 | The four recurring Grade 4 place-value misconception families are: (a) **zero treated as "nothing"** — students omit needed zeros (105 written as 15) or say zero "doesn't count"; (b) **digit vs. digit-value confusion** — the digit 4 in 456 is "4", not 400; (c) **digit-quantity vs. magnitude in comparison** — 1,000 judged smaller than 999 "because it has a zero in it"; (d) **"add a zero" as the meaning of ×10** — a procedural rule that obscures the ten-times relationship (and breaks with the trailing-zero ambiguity, e.g. 23 × 10 is not 230-by-appending to 23). | [ERIC EJ1331358 — understanding of place value in 7–8-year-olds (2022)](https://files.eric.ed.gov/fulltext/EJ1331358.pdf) (zero-as-nothing; digit/place confusion; "add 0 to the end" for ×10); [ERIC EJ1304867 — teaching place value to students with LD (Rojo et al.)](https://files.eric.ed.gov/fulltext/EJ1304867.pdf) (105→15 omission errors; 35→305 transcription; warns against calling zeros mere "placeholders" so students don't think they have no value); [JIRPE 2025/26 — fourth-grade diagnostic, Indonesia](https://ejournal.papanda.org/index.php/jirpe/article/download/2559/1740) (1,000 < 999 "because it has a zero"; zero-placeholder item at 50% success); [Fen Rivers Academy misconception inventory (2023)](https://thebridgetrust.academy/wp-content/uploads/2023/08/fen-rivers-misconceptions-in-mathematics.pdf) | **Accepted** | Misconception-to-screen map: (a) 1-2 "empty place is still a place" + 1-3 comparison with embedded zeros; (b) 1-2 place-value key (digit × place); (c) 1-3 district cards with different digit counts; (d) 1-2 launch — the sliding digit changes the district count ten-fold, and the explicit check "adding a zero to 23 does not make the value story true" is written into the rail's anticipated-misconception line. |
| M2 | Rounding (1-4) misconceptions are the nearest-place family: always-rounding-up, treating the halfway digit as automatically "up" without a reference direction, and rounding before comparing (changing the numbers being compared). | Same ERIC/JIRPE/Fen Rivers corpus (positionality and magnitude transfer); standard Grade 4 assessment practice (rounding to the requested place with justification is the CCSS-aligned skill, 4.NBT.A.3) | **Accepted with caution** | 1-4's mission is "round to the requested place **and explain why that precision is enough**" — the justification step is the guard. The supply-officer scenario makes "too late" the cost of exactness and "useless precision" the cost of wrong rounding. |
| H1 | A second Topic 1 STEM window is supportable for lesson 1-2 on the question **"why must a written record keep every digit in its place?"** Al-Khwarizmi's own stated purpose for written calculation — inheritance, legacies, partition, lawsuits, trade, measuring of lands — is a documented account of calculation in service of records and administration; positional notation is what makes such records checkable. | [MacTutor · Al-Khwarizmi](https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/) (Rosen translation quote: "cases of inheritance, legacies, partition, lawsuits, and trade… the measuring of lands, the digging of canals"), re-verified 2026-08-24; [Britannica · Zero](https://www.britannica.com/science/zero-mathematics) (positional notation), re-verified 2026-08-24 | **Accepted with cautious wording** | Window `t1-records-that-keep-their-place` on 1-2: student wording uses only "written records", "checkable", "position kept a record honest" — no "first", "invented", or single-culture claims. Teacher note: the account is of documented *use* of positional calculation in administration/trade, not of invention. |
| H2 | 1-1's window stays as-is; no new numeral-history claims are needed for 1-3…1-5 (comparison, rounding and argument are modern-math skills with no historical STEM anchor in the unit plan). | `story/story-map.json` unit 1 STEM anchor; PR 01 report H1/H2 | **Accepted** | Only one new registry window in this PR (H1). 1-3…1-5 run STEM-window-free; the unit anchor is already carried by the 1-1/1-2 windows. |
| S1 | The Al-Amin episode (pre-revelation Makkah; the title "Al-Amin, the trustworthy"; the Ka'ba renovation arbitration) is attested in the standard seerah lineage — Ibn Ishaq's Sīra (d. ca. 767), surviving in Ibn Hisham's recension (d. 828/833), translated by Albert Guillaume (Oxford) — and the renovation account includes a Jeddah-adjacent detail (a Byzantine shipwreck at Shua'iba near Jeddah brought building stone), which suits this Jeddah-based curriculum. The episode is suitable for a short, reverent, chronological values card: trust is earned through honest dealing, and a fair decision can prevent conflict. | [Ibn Ishaq's Sīra via Ibn Hisham recension — scholarly overview of the text's transmission](https://www.islamiqate.com/57/whats-your-opinion-the-seerah-prophet-muhammed-written-ishaq) (transmission chain; Guillaume translation pp. 84–87 for the Ka'ba arbitration); [Last Prophet · The Ka'ba Arbitration (summary account)](https://lastprophet.info/6-the-ka-ba-arbitration) (age ~35, 605 CE, cloth-and-corners arbitration) — used only as a cross-check, **not** as the review source | **Qualified — review required** | `docs/review/amanah-alamin-topic1.md` carries the full packet: proposed student text **DRAFT**, values focus, source candidates (Ibn Ishaq via Ibn Hisham; Guillaume translation), the six audit fields left for the reviewer, and the explicit constraints (no portrait, no role-play, no invented dialogue/quantities, chronology only). Registry entry `t1-seerah` stays `pending-review`, `studentText: null`. Placement candidate: the 1-5 seal moment (trust = a sealed, defensible record). **If the review has not passed by merge, the window simply does not appear in 1-5; the lesson ships without it.** |
| D1 | No lesson in Topic 1 needs **current** civic data. District populations, clinic catchments and supply counts are all simulated at Grade 4 scale; the simulation label policy of PR 01 (decision D1: 4,697,000 is a simulated planning figure) extends to every new number. | PR 01 research report D1; `docs/research/README.md` ("Simulated data: explicit label on the student screen") | **Accepted** | Every new civic number in 1-2…1-5 carries the `simulated` label on its student screen (the foundation check asserts this for the pilot; the same wording pattern is applied and the PR's sweep verifies it). No real district statistics are cited anywhere. |
| A1 | The 14-screen 1-5 reasoning studio needs a public argument format the class can hold on one screen: claim → evidence (the number work) → why the rival's case fails → seal. MP.3 (construct viable arguments and critique others' reasoning) is the standard. | CCSS-Math MP.3; `curriculum.json` 1-5 entry (MP.3, IXL EFV) | **Accepted** | 1-5 builds a two-team argument board (teams defend 4,697,000 vs. a corrupted 4,679,000 reading of the census line); the seal lands only when the class can state the evidence that decides it. The Sijill names the argument's structure, not a student. |

## Student-facing wording

- **New STEM window (1-2)** — approved draft wording for the registry:
  > Written records need every digit to stay in its place. In the medieval Islamic world,
  > positional numerals helped keep accounts, trade and administrative records checkable:
  > move a digit one place and the record changes. Scholars such as al-Khwarizmi described
  > written calculation as a tool for inheritance, trade, disputes and land measures. A record
  > you can re-check is a record people can trust.
  Cautious-wording check: no `invented / first to / sole` forms; "helped keep … checkable" and
  "described" are the attribution verbs.
- **No Seerah student-facing wording is approved.** The packet's draft text exists only in
  `docs/review/amanah-alamin-topic1.md` as DRAFT for the qualified reviewer; the registry keeps
  `studentText: null`.
- All other new student text (scenarios, prompts, labels) contains no factual claims requiring
  sources; civic numbers are simulated and labelled.

## Mathematical verification

- **1-2 (4.NBT.A.1):** the ten-times relationship is the standard enVision content: a digit one
  place left is worth 10 × its value one place right. Screen values checked: 4,697,000 → move the
  7 (thousands) one place left = 70,000; 23 → 230 is "23 tens", not "23 with a zero appended"
  (the M1(d) guard); 6,000 = 60 hundreds. All displayed forms re-checked for place-value
  equivalence.
- **1-3 (4.NBT.A.2):** comparison pairs chosen to force digit-count reasoning: 4,697,000 vs
  999,999 (six digits < seven digits — the M1(c) guard), 4,679,000 vs 4,697,000 (same length,
  decide at the first differing digit), 305,072 vs 350,072 (the zero in the hundreds does not
  make the first number smaller — M1(a) guard). All ordering claims re-checked.
- **1-4 (4.NBT.A.3):** rounding checks: 4,697,000 to the nearest thousand = 4,697,000 (the 0 in
  the hundreds < 5); to the nearest hundred thousand = 4,700,000 (the 9 in the ten-thousands ≥ 5);
  347,215 to the nearest ten thousand = 350,000 (7 ≥ 5); 342,215 to the nearest ten thousand =
  340,000 (2 < 5). The "halfway" case (5 exactly) is used once, with the classroom convention
  stated on the board screen ("5 and above rounds up") — the justification step, not the rule
  recital, is the scored act.
- **1-5 (MP.3):** the deciding pair is 4,697,000 (restored) vs 4,679,000 (corrupted reading):
  the difference is 18,000, decided at the ten-thousands place (9 vs 7). The argument board's
  evidence row is the expanded difference `4,697,000 − 4,679,000 = 18,000`, re-checked.
- No new standards are introduced; `curriculum.json` standards and IXL codes are unchanged.

## Open risks and deferred work

1. **Qualified review is the critical path** for the Seerah window. If the school reviewer has
   not returned the signed six-field record by merge, 1-5 ships without the Amanah Window and
   the registry entry stays `pending-review` (the deck is not blocked on it).
2. The second STEM window's historical claim (H1) is deliberately about **documented use**, not
   invention; if a later PR wants a stronger claim it needs its own two-source gate.
3. The "5 and above rounds up" convention is stated as classroom convention; a reviewer should
   confirm it matches the school's rounding policy before the projector pass.
4. Browser sweeps and the projector pass remain reviewer-side (no Chrome in the agent sandbox).
5. Role rotation: 1-1 led with Omar; 1-2 leads with Zayd (model builder drives the sliding
   frame), 1-3 with both (teams), 1-4 with Omar (evidence), 1-5 with both — the rotation is
   recorded in each lesson's rail note.

## Reviewer status

Qualified religious reviewer: **not yet engaged — scheduled.** The packet
(`docs/review/amanah-alamin-topic1.md`) is ready for the school's Islamic Studies reviewer;
the window ships only on a six-field `approved` record. No sacred content ships with this
PR's code.
Source reviewer: MacTutor and Britannica re-verified 2026-08-24 (PR 01a); the ERIC and JIRPE
misconception sources fetched 2026-08-25 (M1/M2).

## Gate verdict

**PASS** — the four gate questions are answered: the misconception set is mapped to specific
screens, the second STEM window has a cautiously worded documented basis, the Al-Amin packet is
review-ready with a defined no-review fallback (the lesson ships without it), and all new civic
data stays simulated and labelled. Topic 1 may be authored; the Seerah window remains blocked on
qualified review by design.
