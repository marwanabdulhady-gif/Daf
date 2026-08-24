# PR 01 research · Story foundation and Lesson 1-1 vertical slice

**Research completed:** 2026-08-24  
**Scope:** repository organization, flexible screen architecture, Omar and Zayd story components,
Lesson 1-1 civic-data frame, Hindu-Arabic place-value STEM window, folio/artifact progression and
source-visible teacher notes.  
**Religious scope:** no Seerah or companion account is published in this PR.

## Questions investigated

1. Is narrative use in mathematics sufficiently supported to justify a small pilot?
2. Which safeguards stop story and visual variety from obscuring mathematical structure?
3. What constitutes age-appropriate STEM/PBL work rather than an end-of-unit craft?
4. Is the Lesson 1-1 account of Hindu-Arabic numerals and al-Khwarizmi accurate?
5. Can the number 4,697,000 be represented as current Jeddah population data?
6. Which accessibility requirements affect the new character and motion layer?

## Evidence and decision matrix

| ID | Finding / proposed claim | Evidence | Decision | Implementation consequence |
|---|---|---|---|---|
| P1 | Digital storytelling can contextualize abstract mathematics and support reasoning, motivation and collaboration, but the evidence base contains many small and short-term studies. | [Digital Storytelling in Teaching and Learning Mathematics: PRISMA review (Education Sciences, 2025)](https://www.mdpi.com/2227-7102/15/11/1548) | **Qualified** | Implement one vertical slice first; do not claim proven whole-course impact. Measure whether story supports or distracts from mathematics before scaling. |
| P2 | Manipulatives and visual representations can support understanding and problem solving, but too many simultaneous representations may confuse learners. Genuine problem-solving tasks should not merely be routine exercises placed in a context. | [EEF, Improving Mathematics in Key Stages 2 and 3 (2022 report)](https://files.eric.ed.gov/fulltext/ED634883.pdf) | **Accepted** | One cognitive act per screen; character ribbons stay secondary; compare a limited number of representations; the mathematical act—not story recall—resolves the mission. |
| P3 | Grade 3–5 engineering design should define criteria/constraints, compare possible solutions, and use fair tests to find improvements. | [NGSS 3–5 Engineering Design](https://www.nextgenscience.org/topic-arrangement/3-5engineering-design) and [NASA JPL Grades 3–5 engineering guidance](https://www.jpl.nasa.gov/edu/resources/collection/engineering-in-the-classroom/ngss-engineering-grades-3-5/) | **Accepted** | Unit artifacts follow ask, criteria, model/test, compare, revise and communicate. Lesson 1-1 contributes an auditable record rather than a decorative product. |
| P4 | High-quality PBL keeps learning goals and standards central and uses inquiry, authenticity, voice/choice, reflection, critique/revision and a public product. Project cadence should fit the standard rather than add an unrelated calendar burden. | [PBLWorks description of standards-aligned Gold Standard PBL](https://www.pblworks.org/news/pblworks-creates-pblworks-teachtm-help-schools-and-districts-scale-project-based-learning) | **Accepted** | One cumulative artifact per unit, not 114 crafts. Mathematical evidence carries the artifact forward. |
| P5 | UDL calls for multiple means of engagement, representation, and action/expression. | [CAST, Universal Design for Learning](https://www.cast.org/what-we-do/universal-design-for-learning/) and [CAST UDL Guidelines 3.0](https://udlguidelines.cast.org/more/about-guidelines-3-0/) | **Accepted** | Keep OMML, spoken discussion, animated/static models, keyboard interaction and multiple response forms. Character identity or color never carries required information alone. |
| A1 | Non-essential interaction-triggered motion should be disableable; a reduced-motion preference is an appropriate implementation mechanism. | [W3C WCAG 2.1, SC 2.3.3](https://www.w3.org/TR/WCAG21/#animation-from-interactions) | **Accepted with follow-up** | Existing GSAP entry motion already checks reduced-motion. A complete canvas-motion control remains an explicit final accessibility work item and must be resolved before whole-course release. |
| H1 | The decimal place-value numeral tradition developed in India and was studied and transmitted through scholars working in the Islamic world. Al-Khwarizmi wrote on calculation with Hindu numerals; the original Arabic arithmetic text is lost and changed Latin descendants survive. | [MacTutor, Al-Khwarizmi](https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/) and [Britannica, Zero](https://www.britannica.com/science/zero-mathematics) | **Accepted with cautious wording** | Student text says “developed,” “studied,” “explained” and “transmitted.” Teacher note records that the original Arabic text is lost. |
| H2 | “Al-Khwarizmi invented our numerals/zero/place value.” | Same sources as H1; both describe Indian origins and transmission. | **Rejected** | This wording is prohibited in Lesson 1-1 and future decks. |
| D1 | 4,697,000 is the current population of Jeddah. | No authoritative, definition-matched and current source was established for this exact number during the gate. City/governorate/metro definitions can differ. | **Rejected as a fact** | The screen explicitly calls it a **simulated planning figure**, not a live census claim. |
| R1 | A Seerah account should accompany every lesson. | Internal religious-risk audit plus project review policy. No qualified reviewer approval supplied for this PR. | **Rejected** | Lesson 1-1 contains no Amanah Window. Sacred content remains blocked until its own qualified-review gate passes. |

## Approved student-facing historical wording

> The digits we use belong to the Hindu-Arabic numeral tradition. Place-value methods developed in
> India. Scholars working in the Islamic world studied, explained and transmitted them. Around the
> ninth century, al-Khwarizmi wrote about calculating with Hindu numerals. Knowledge travelled
> because people made methods clear enough for others to use.

This deliberately describes a knowledge journey rather than assigning sole invention to one person.

## Mathematical verification

- Standard: `4.NBT.A.2`.
- All displayed forms were checked for place-value equivalence.
- `4,697,000` has seven digits and periods `4 | 697 | 000`.
- `62,415 = 60,000 + 2,000 + 400 + 10 + 5`.
- “three hundred five thousand, seventy-two” is `305,072`; zeros preserve the hundreds and ones-place structure.
- Existing OMML tests and lesson guardrails pass after the story integration.

## Design findings applied

- Omar and Zayd are explicitly fictional Grade 4 boys; neither represents a historical or sacred person.
- The fiction and STEM lanes have distinct labels and visual treatments.
- The lantern reveals evidence, never solutions.
- The story ribbon occupies secondary visual space; mathematical models remain central.
- Folio progress is not awarded for clicking.
- The closing transfer asks students to distinguish real data from an estimate.
- Source links and a caution note are exposed in the teacher-facing STEM details.

## Open risks and deferred work

1. The storytelling evidence is promising but not sufficient to justify automatic course-wide rollout; classroom observation is required after Topic 1.
2. Canvas loops require a comprehensive reduced-motion strategy before final release; this is scheduled in the final accessibility PR.
3. The simulated civic problem is authentic in process, not a claim about a current government planning task.
4. No Seerah content is approved by this report.
5. Character appearance and projector readability require teacher/user review in the live pilot.

## Gate verdict

**PASS for a limited Lesson 1-1 vertical slice and shared foundation.**  
**NOT approval for automatic rollout to the remaining 113 lessons.** Each ordered PR requires its
own completed research report, source matrix and—where relevant—qualified religious review.
