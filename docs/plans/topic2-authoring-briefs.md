# Topic 2 authoring briefs · "The souq ledger with the missing total"

**Status: shooting scripts for PR 04 implementation (issues #4).** Untracked until PR 04 opens.
**Research gate:** `docs/research/pr-04-topics-2-4.md` (PASS). Story data: `story/story-map.json` unit 2.
**Unit:** Q — *Can the class make a public budget trustworthy when part of the ledger is damaged?*
**Artifact:** an audited addition-and-subtraction ledger · **PBL:** create and peer-audit a budget
for school reading corners · **STEM window:** `t2-ledgers-that-paper-made` on 2-8 (draft JSON in
`topics2-4-stem-windows-draft.json`) · **Seerah:** `t2-seerah` (first revelation / command to read)
— packet ready at `docs/review/amanah-first-revelation-topic2.md`, placement candidate 2-8 screen 12,
ships only on six-field approval · **Bridge:** the repeated-batch order card → Chapter 3 multiplication.
**Role rotation:** 2-1 Omar · 2-2 Zayd · 2-3 both · 2-4 Omar · 2-5 Zayd · 2-6 both · 2-7 Omar · 2-8 both.
**Misconception map (gate A1):** regroup-without-adjusting → 2-3 screens 2/4; subtraction-as-commutative
(73−25 answered 5−3) → 2-5 screen 3 rail; across-zeros chain → 2-7; equals-as-"answer is coming" →
2-3/2-4 board rails; estimate-before-algorithm → 2-1/2-2 launch locks.
**Baseline reuse:** every `lessons/2-x.jsx` file keeps its OMML (`M` object) and draw functions;
the story version rewrites the LESSON object (metas + Visual) exactly as Topic 1 was reworked.

Per-lesson format: `screen · component · story line`. All screens: `simulated` label on the first
civic number; story ribbons on every screen; no award on story components.

---

## 2-1 · The merchant who checked before ink dried (compact practice, 8, 7–9)
Mental sums and differences (4.NBT.B.4) · baseline ixl `["D7B","D9R","Q8M"]` (kept as-is).
M: 199+46, 200+45=245, move-1 rule, 199+40+6, (199+1)+45, 245−99, 246−100=146, SWYK 298+57→300+55=355.
Draws: drawCanteen, makeCompensate, makeBreakApart, drawBoard21, drawSupport21.

| # | Screen |
|---|---|
| 0 | warmup · lantern · `NoticeWonder` (drawCanteen) — the merchant's pen hovers over `199 + 46`; fresh ink waits; the error would become permanent. Notices: near-round numbers / pen hovering / no total yet / errors become ink. Wonders: how to check before committing / what 199+46 sits next to / what "move one across" means. |
| 1 | launch · omar · `LaunchEstimate` — "Sixty seconds before the ink dries: what's your checked prediction for 199 + 46?" (min 200, max 320, start 240, unit total). after: "Locked. Now check it the way the merchant does." note: souq quantities are simulated. |
| 2 | monitor · zayd · `ExploreChips` — chips: `199+46 as-is / 200+45 compensated / 200+46 / 190+46` → makeCompensate. caption OMML compensated; footnote "move one across — the total does not change". |
| 3 | monitor · both · `CardSort` — "Ink the checked lines": items `199+46→200+45`, `245−99→246−100`, `199+40+6`, `(199+1)+45` → targets `Compensation / Break apart & associate` (columns 2). commitLabel "Ink the checked lines". |
| 4 | connect · both · `CompareConnect` — Aya "round to friendly, adjust back" vs Musa "break into hundreds, tens, ones" (quotes drawn from the two methods). |
| 5 | synth · zayd · `BoardScreen` (drawBoard21) — "Mental math before the ink: check, then commit." |
| 6 | swyk · omar · `ShowWhatYouKnow` — "The ink is still wet: 298 + 57. What is the checked total?" options 355(right) / 345 / 353 / 365. yes: "300 + 55 = 355 — move two across; the total does not change." hint: "Move two across to make 300." draw: drawSupport21. |
| 7 | connect · `StoryHandoff` — artifact "Souq ledger · mental-math checked lines"; next "Three bids sit under sealed covers — which total is even possible?" Closing action: pick a near-round sum from real life, check it mentally, say what you moved. |

## 2-2 · Three bids under sealed covers (compact practice, 8, 7–9)
Estimate sums and differences (4.NBT.B.4) · baseline ixl `["DU5","5TQ","5F9","GWS"]` (kept as-is).
M: 4,285+3,671; 4,000+4,000=8,000; 4,300+3,700=8,000; exact 7,956; 8,142−2,905; 8,000−3,000=5,000; SWYK 5,218+2,874→5,000+3,000=8,000.
Draws: drawReceipt, makeRoundBoth, makeCloseness, drawBoard22, drawSupport22.

| # | Screen |
|---|---|
| 0 | warmup · lantern · `NoticeWonder` (drawReceipt) — three sealed bid cards on the council table. |
| 1 | launch · omar · `LaunchEstimate` — "Before the covers open: what total do you trust for 4,285 + 3,671?" (estimate to the nearest hundred or thousand; min 6000 max 10000 start 8000 unit "estimate"). |
| 2 | monitor · zayd · `ExploreChips` — makeRoundBoth: chips `round both to thousands / round both to hundreds / exact sum` → show 8,000 / 8,000 / 7,956; caption roundThousand/roundHundred/exact. |
| 3 | monitor · both · `CardSort` — "Which bid could be real?" items bid A `7,956`, bid B `11,956`, bid C `8,056` → targets `Possible / Impossible` (columns 2). The impossible bid is the unit's first caught error. |
| 4 | monitor · omar · `ExploreChips` — makeCloseness on the difference: chips `thousands / hundreds / exact` for 8,142−2,905 (5,000 estimate); rail: "how close is close enough?" |
| 5 | connect · both · `CompareConnect` — Aya "round both, add the rounds" vs Musa "front-end, then adjust". |
| 6 | synth · zayd · `BoardScreen` (drawBoard22) — "An estimate is a decision with a reason." |
| 7 | swyk · omar · `ShowWhatYouKnow` — "The council opens the final cover: 5,218 + 2,874. Which total is reasonable?" options 8,000(right) / 7,000 / 9,000 / 8,092. yes: "5,000 + 3,000 = 8,000 — close enough to check the answer." draw: drawSupport22. |
| 8→7 | (band allows 8: merge 4 into 3 if preferred) — **build at 8 screens: merge screen 4 into screen 2's chip set** (both problems in one estimate-toolbox screen). |
| handoff | `StoryHandoff` — artifact "Souq ledger · reasonable bid unsealed"; next "The first market row must be combined exactly — with a check beside the total." Closing: estimate a real sum two ways; say which precision the decision needed. |

## 2-3 · The first market row (strategy workshop, 9, 8–11)
Add whole numbers (4.NBT.B.4) · baseline ixl `["DWQ","M8W"]`.
M: 268+154; expanded 200+100, 60+50, 8+4; 8+4=12 (1 ten 2 ones); 1+6+5=12 tens; 422; 270+150=420; SWYK 376+248=624.
Draws: drawLibrary (→ market row), makeColumnAdd, makeExpandedAdd, drawBoard23, drawSupport23.

| # | Screen |
|---|---|
| 0 | warmup · lantern · `NoticeWonder` (drawLibrary) — receipts from the first market row under the awning. |
| 1 | launch · omar · `LaunchEstimate` — "The row's total before the ledger: 268 + 154." (min 350 max 500 start 420 unit total). |
| 2 | monitor · zayd · `ExploreChips` — makeColumnAdd: chips `ones / tens / hundreds` step the column; rail: "regroup, then adjust — check both columns" (A1a). |
| 3 | monitor · omar · `ExploreChips` — makeExpandedAdd: chips step 200+100, 60+50, 8+4; caption expanded; footnote "the expanded form is the check beside the total". |
| 4 | monitor · both · `CardSort` — "Record the check": items `8+4=12 → 1 ten 2 ones`, `1+6+5=12 tens`, `270+150=420`, `268+154=422` → targets `Regroup / Check` (columns 2). |
| 5 | connect · both · `CompareConnect` — Aya "column with carries" vs Musa "expanded by place". |
| 6 | synth · zayd · `BoardScreen` (drawBoard23) — "Add by place, check by place." rail: equals means same value, not "answer is coming" (A1d). |
| 7 | swyk · omar · `ShowWhatYouKnow` — "376 + 248 — the checked total?" options 624(right) / 614 / 634 / 622. draw: drawSupport23. |
| 8 | handoff · `StoryHandoff` — artifact "Souq ledger · first market row (total + check)"; next "A second bundle arrives — city-sized, and bigger than the old columns." Closing: add two real receipts; write the check beside the total. |

## 2-4 · A city-sized order (strategy workshop, 9, 8–11)
Add greater whole numbers (4.NBT.B.4) · baseline ixl `["26W","X8G","KTH","ERL"]`.
M: 142,857+96,344=239,201; 143,000+96,000=239,000; 12,450+8,375+6,120=26,945; line up places not edges; 7+4=11, 1+5+4=10; SWYK 205,368+47,915=253,283.
Draws: drawPilgrims (→ city order), makeBigAdd, makeThreeAddends, drawBoard24, drawSupport24.

| # | Screen |
|---|---|
| 0 | warmup · lantern · `NoticeWonder` (drawPilgrims) — a second bundle arrives; the numbers outgrow the old columns. |
| 1 | launch · omar · `LaunchEstimate` — "142,857 + 96,344 — the estimate before the exact." (min 200,000 max 260,000 start 239,000 unit estimate). |
| 2 | monitor · zayd · `ExploreChips` — makeBigAdd: chips `ones…hundred-thousands` step the carry chain; rail: "7+4=11, then 1+5+4=10 — the carry chain". |
| 3 | monitor · omar · `ExploreChips` — makeThreeAddends: chips light `12,450 / 8,375 / 6,120`; caption lineUp: "line up the places, not the edges". |
| 4 | monitor · both · `CardSort` — carry-chain parts → targets `Carry / Column total` (columns 2). |
| 5 | connect · both · `CompareConnect` — Aya "estimate first, then exact" vs Musa "carry chain, one column at a time". |
| 6 | synth · zayd · `BoardScreen` (drawBoard24) — "Redesign the columns: the places don't change." |
| 7 | swyk · omar · `ShowWhatYouKnow` — "205,368 + 47,915" options 253,283(right) / 252,283 / 253,183 / 263,283. draw: drawSupport24. |
| 8 | handoff · `StoryHandoff` — artifact "City order · audited total"; next "The council approves the spend — what remains in the reserve, and how do you prove it?" Closing: add three numbers from a real list; line up the places. |

## 2-5 · What remains in the reserve (strategy workshop, 9, 8–11)
Subtract whole numbers (4.NBT.B.4) · baseline ixl `["FCP","6SZ"]`.
M: 534−268=266; 530−270=260; "4 ones cannot take 8 — trade a ten"; 14−8=6; 266+268=534; SWYK 725−348=377.
Draws: drawStock, makeColumnSub, makeTrade, drawBoard25, drawSupport25.

| # | Screen |
|---|---|
| 0 | warmup · lantern · `NoticeWonder` (drawStock) — the reserve; the council's approved spend is written beside it. |
| 1 | launch · omar · `LaunchEstimate` — "534 − 268 — the reserve, estimated first." (min 200 max 350 start 266→start 250 unit estimate). |
| 2 | monitor · zayd · `ExploreChips` — makeColumnSub: chips step the subtraction column. |
| 3 | monitor · omar · `ExploreChips` — makeTrade: chips `trade a ten / trade a hundred / no trade` → 14−8=6; **rail: "4 ones cannot take 8 — subtraction does not commute: never answer 8−4 instead of ungrouping" (A1b).** |
| 4 | monitor · both · `CardSort` — "Check by adding back": items `266+268=534`, `268−266`, `530−270=260`, `266` → targets `Check / Part of the story` (columns 2). |
| 5 | connect · both · `CompareConnect` — Aya "trade, then subtract" vs Musa "add back to verify". |
| 6 | synth · zayd · `BoardScreen` (drawBoard25) — "Subtract by place; verify by adding back." |
| 7 | swyk · omar · `ShowWhatYouKnow` — "725 − 348" options 377(right) / 387 / 375 / 477. draw: drawSupport25. |
| 8 | handoff · `StoryHandoff` — artifact "Reserve report · difference + check"; next "The warehouse expansion plan arrives — the reserve and the spend now stretch across more places." Closing: subtract two real amounts; add the difference back. |

## 2-6 · The warehouse expansion (strategy workshop, 9, 8–11)
Subtract greater whole numbers (4.NBT.B.4) · baseline ixl `["TSJ","WLN","YPD"]`.
M: 482,517−96,348=386,169; 483,000−96,000=387,000; line up places; 17−8=9; 386,169+96,348=482,517; SWYK 310,254−87,169=223,085.
Draws: drawStock (variant), makeColumnSub, makeAlign, drawBoard25 (variant title), drawSupport25 (variant).

| # | Screen |
|---|---|
| 0 | warmup · lantern · `NoticeWonder` — the expansion plan beside the reserve. |
| 1 | launch · omar · `LaunchEstimate` — "482,517 − 96,348." (min 300,000 max 450,000 start 387,000 unit estimate). |
| 2 | monitor · zayd · `ExploreChips` — makeAlign: chips `line up the places / line up the edges` → the wrong column misread; rail "line up the places, not the edges". |
| 3 | monitor · omar · `ExploreChips` — makeColumnSub (greater): chips step 17−8=9 etc. |
| 4 | monitor · both · `CardSort` — add-back check `386,169+96,348=482,517` → targets `Check / Part of the story`. |
| 5 | connect · both · `CompareConnect` — Aya "estimate, subtract, add back" vs Musa "align, trade, verify". |
| 6 | synth · zayd · `BoardScreen` (variant) — "The expansion holds: places aligned, trades shown." |
| 7 | swyk · omar · `ShowWhatYouKnow` — "310,254 − 87,169" options 223,085(right) / 223,185 / 213,085 / 233,085. |
| 8 | handoff · `StoryHandoff` — artifact "Expansion report · verified"; next "Water damage erases the regrouping marks — across a line of silent zeros." Closing: subtract two five-place numbers; line them up. |

## 2-7 · The line of silent zeros (strategy workshop, 9, 8–11)
Subtract across zeros (4.NBT.B.4) · baseline ixl `["LZZ"]`.
M: 4,000−1,362=2,638; 4,000 = 3 thousands 9 hundreds 9 tens 10 ones; "keep going left until you find something to trade"; 4,000−1,400=2,600; 2,638+1,362=4,000; SWYK 6,000−2,475=3,525.
Draws: drawZeros, makeChain, makeColumnZeros, drawBoard27, drawSupport27.

| # | Screen |
|---|---|
| 0 | warmup · lantern · `NoticeWonder` (drawZeros) — water damage erased the regrouping marks; a line of silent zeros. |
| 1 | launch · omar · `LaunchEstimate` — "4,000 − 1,362." (min 2,000 max 3,200 start 2,600 unit estimate). |
| 2 | monitor · zayd · `ExploreChips` — makeChain: chips `trade from the tens / trade from the hundreds / trade from the thousands` → the chain hops left until it finds something to trade. |
| 3 | monitor · omar · `ExploreChips` — makeColumnZeros: chips step the column; the renamed row 3·9·9·10 appears. |
| 4 | monitor · both · `CardSort` — "Ink the renamed row": items `3 thousands / 9 hundreds / 9 tens / 10 ones` → targets `thousands / hundreds / tens / ones` (columns 4). commitLabel "Ink the renamed row". |
| 5 | connect · both · `CompareConnect` — Aya "rename the whole row at once" vs Musa "trade one place at a time". |
| 6 | synth · zayd · `BoardScreen` (drawBoard27) — "Silent zeros: the trade keeps going left." |
| 7 | swyk · omar · `ShowWhatYouKnow` — "6,000 − 2,475" options 3,525(right) / 3,575 / 3,425 / 4,525. draw: drawSupport27. |
| 8 | handoff · `StoryHandoff` — artifact "Across-zeros ledger · every trade annotated"; next "The auditor lays a polished solution under the seal — but a polished answer can still hide a faulty step." Closing: subtract across two zeros; annotate every trade. |

## 2-8 · The auditor's challenge (reasoning studio, 14, 12–16)
Problem solving: reasoning (MP.2) · baseline ixl `["CZM","RJJ","F5H"]`. **Unit climax: STEM window + Seerah candidate.**
M: 1,284 and 867; 1,284+867=2,151; 2,151−867=1,284; 1,284−867=417; 2,151 then 2,500−2,151=349; "what is missing — a part, or the whole?"; SWYK 2,340+1,875=4,215 then 5,000−4,215=785.
Draws: makeDiagram, drawFair, makeTwoStep, drawBoard28, drawSupport28.

| # | Screen |
|---|---|
| 0 | warmup · lantern · `NoticeWonder` (drawFair) — the auditor's desk; a polished solution under the seal. |
| 1 | launch · omar · `WODB` — four audit cards, three valid reasonings and one hidden gap; "which one does not belong?" |
| 2 | monitor · zayd · `ExploreChips` — makeDiagram: chips `part + part / whole − part / compare` → the diagram for 1,284 and 867. |
| 3 | monitor · omar · `ExploreChips` — "what is missing": chips `a part / the whole / the difference` → caption OMML question. |
| 4 | monitor · both · `CardSort` — classify: `1,284+867=2,151 / 2,151−867=1,284 / 1,284−867=417 / 2,500−2,151=349` → targets `Part-part / Whole-part / Compare / Two-step` (columns 4). |
| 5 | monitor · omar · `ExploreChips` — makeTwoStep: chips step the two-step budget problem (2,500; 1,284+867; 349). |
| 6 | connect · both · `CompareConnect` — Aya "diagram first, then equation" vs Musa "equation, then name the parts". |
| 7 | monitor · zayd · critique (1-5 makeCritique pattern) — the polished solution's hidden gap: "the total is 2,151, so the remainder is 2,151" (second step missing); chips `no gap / the gap is the second step`. |
| 8 | monitor · omar · revision — chips `2,500−2,151=349 / 2,151−867 / 2,500−1,284` → the corrected two-step appears. |
| 9 | synth · zayd · `BoardScreen` (drawBoard28) — "Sign only what the parts prove." |
| 10 | swyk · omar · `ShowWhatYouKnow` — "Budget 5,000; rows 2,340 and 1,875. The remainder?" options 785(right) / 1,145 / 2,151 / 784. yes: "2,340+1,875=4,215, then 5,000−4,215=785 — both steps, in order." draw: drawSupport28. |
| 11 | synth · zayd · `STEMWindow` t2-ledgers-that-paper-made — "Why ledgers can be re-checked" (paper/ledgers window; RuleScreen-style ommls: partPart, twoStep). |
| 12 | monitor · both · **Seerah placement** — `AmanahWindow` t2-seerah (first revelation / command to read) wrapping the "the seal asks for evidence" reflection; **renders only when approved**, children-only otherwise (fallback by design). |
| 13 | handoff · `StoryHandoff` — artifact "Audited ledger · signed"; next "An order card slips from under the cover — every item listed in repeated batches. The workshop needs multiplication, not repeated addition." Closing: name a two-step problem from life; write both steps before the answer. |

---

## Implementation procedure (per topic, per the rollout plan)

1. Author the eight `lessons/2-x.jsx` story versions (baseline M + draws reused).
2. Story map: real handoffs for 2-1…2-7 (texts above), `implementationStatus: story-built`.
3. Register `t2-ledgers-that-paper-made` in `stem-sources.json` (JSON in the draft file).
4. Build each lesson; after each topic rebuild run: `check:story`, `verify`, `check:topic -- 2`,
   standard-compliance audit (141-check pattern), `sweep:topic -- 2` (reviewer-side).
5. Exhibit: the reading-corner budget PBL (unit 2 public product) — brief follows the Topic 1
   exhibition-brief template.
