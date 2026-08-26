# The Lantern of Numeria — The Tale of the Seventeen Doors

**Epic narrative architecture · the whole Grade 4 curriculum as one story**
**Status:** design document — supersedes the narrative portions of `story-lesson-rollout-plan.md` §4–§6 (which keep the math scope, screen shapes and PR gates). Source of truth for narrative data remains `story/story-map.json`; this document is the authoring contract for it.
**Companions:** `01-characters-and-arcs.md` (the cast, arcs, Muddler and minions, visual spec) · `02-quests.md` (all 17 quest dossiers with mission tables).

---

## 1 · The logline

In a school in Jeddah, two Grade 4 archivists — Omar, who trusts only written
evidence, and Zayd, who builds before he checks — find a brass lantern in the
school hall. Its light shows them **Numeria**, a city whose design archive has
been scattered across **seventeen damaged doors**, and a stain of confusion in
the margins that has been moving digits, swapping sums and mislabelling
measures all year. Every quest the class takes through one door turns numbers
into evidence — a restored census, an audited ledger, a grove and a workshop,
a shared caravan, a weighed reef, a read sea, an honest market, a built gate —
until, in the thirteenth door, they find the stain's face: **the Muddler of
the Measure Market**. He is beaten the only way he can be beaten: by a class
that reasons, not one that guesses. The year ends at the Grand Gate, and the
class signs **the letter forward** to the Grade 5 class: *the fog returns in
new units; the lantern is yours now.*

One line for the classroom: **pass the door by proving the number, not by
speed.**

## 2 · The three inspirations — and the job each does

The plan already borrows the Nights for *craft*. This architecture assigns each
inspiration a distinct structural job so the epic feels like all three without
imitating any of their plots:

| Inspiration | What we take | Structural job in the curriculum |
|---|---|---|
| **One Thousand and One Nights** | The frame narrator, nested accounts, recurring objects, delayed answers, clean cliffhangers | **The tale.** Each unit is one *tale of a door*; each lesson ends on a handoff that is a real cliffhanger (already built: the `StoryHandoff` screen). The STEM windows are the *tale within the tale* — a documented account told inside the fiction. The Muddler's face is **delayed** until door 13. |
| **Harry Potter** | The school as home base, the grimoire, the points, the map, the house ceremony, the duel | **The school year.** Dar Al Fikr's hall is home base. The **Evidence Folio** is the grimoire (already built: stamps, export, reset). Awards/dojo are the points. The **Map of the Doors** is the Marauder's Map (new folio screen). Each unit's exhibition is the **quest ceremony**. Boss lessons are **confrontations** (boss-13 is the prototype: HP bar, strike cards, phases). |
| **The Lord of the Rings** | The fellowship, the quest line, the midpoint battle, the minions, the handover | **The quest.** The class is the fellowship with rotating roles (scribe, builder, estimator, checker). The quest line leaves the hall into Jeddah's places and returns at the end. Door 13 is the midpoint battle in the Muddler's own market. His minions are the unit misconception sets, named and faced. The year ends with a handover — the letter forward — not a victory lap. |

**What we do not take:** no wizards, no magic that solves math (the lantern
reveals and frames; it never computes), no evil that is actually evil (the
Muddler's confusion is a property, not malice), no house rivalry between
classes (the dojo points belong to the class, not against other classes).

## 3 · The frame: how a year becomes a tale

### 3.1 The lantern and the hall

The **Lantern of Numeria** is a brass lantern that lives in the school hall.
It is a *frame object*, not a character: it glows, it shows, it keeps the fog
at the margins while the class works — and it is also, practically, **the
projector**. Opening the projector is opening the tale; this mapping keeps the
fiction one step from the real classroom, the way the Nights' frame sits one
step from its listeners.

- **Tale open (≤90s, existing guardrail):** the lantern glows; the ribbon shows
  *The tale of door N: [door name]*; the quest-giver states the quest; the
  fellowship roles are named.
- **Tale close (≤45s):** the seal is earned on the climax screen; *the door
  opens*; the Map of the Doors lights one step; the handoff cliffhanger lands.

### 3.2 The seventeen doors

Numeria's archive has **seventeen doors**, one per curriculum topic. A door is
*damaged* (its folio water-stained, its records confused) and *opens* when the
class forges the door's artifact — the unit's PBL product, already in the story
map. The doors are not a line on a map; they are the spine: **every unit's
existing chapter name is its door name** (the census in the brass lantern, the
souq ledger with the missing total, …, the grand gate and the letter forward).
Nothing is renamed; the epic title wraps what exists.

### 3.3 The four acts (existing act names, epic meaning)

| Act | Doors | Existing act name | Epic meaning | The Muddler's form |
|---|---|---|---|---|
| I | 1–6 | Number, provision and systems | **The calling.** The fellowship forms; the class finds the stain's traces in the records and learns its rules: evidence, check, seal. | A **stain** — water damage, missing digits, silent zeros. The class investigates without meeting him. |
| II | 7–12 | Fair shares, evidence and exchange | **The journey.** The class travels the reef, the islands, the sea and the docks. The stain begins to *speak*: false claims, close calls, long labels. | A **whisper** — a beautiful but false claim inside confident reports. |
| III | 13–16 | Measure, pattern and design | **The confrontation.** Door 13 is the Muddler's own market: the great confrontation (boss-13). Then the class rebuilds — pattern, turning light, strong shapes. | The **fog** — a face, then a lifted market; after the boss he thins to a wisp. |
| IV | 17 | Transfer, exhibition and legacy | **The return.** The Grand Gate is built and tested; the class writes the letter forward and hands the lantern on. | A **wisp at the margins** — remembered, not gone: "the fog returns in new units." |

## 4 · The antagonist: the Muddler

Full profile, forms and the named minions live in `01-characters-and-arcs.md`
§5. The architecture's rules:

1. **He is a property, not a person.** The Muddler is the *fog of confusion*:
   digits moved, sums swapped, labels crossed. He is never a person, never a
   caricature, never attached to any real or sacred figure. He is labelled
   fictional on screen, like Numeria.
2. **He is defeated only by reasoning.** The existing boss-13 rule is the epic
   rule: *damage is dealt when the class proves an answer; the teacher lands
   the strike.* No speed runs, no brute force. His "healing" in boss-13 (a
   claim that *sounds* right heals him) is the model for every minion encounter
   in `02-quests.md`: each quest's trap is a statement that sounds right.
3. **His presence escalates across the acts** (stain → whisper → fog → wisp)
   and his minion is **named in each quest dossier** so a lesson's anticipated
   misconception (already in every lesson's teacher rail) can be narrated as
   *the fog whispers: …* on the student side without ever naming the villain
   before door 13.
4. **He is not the reason for the math.** The math is the city's work; the
   Muddler only makes the work *need* care. Remove him and the quest still
   stands (guardrail: narrative overhead is capped; math remains the mechanic).

## 5 · The artifact system (what the class carries)

| Artifact | What it is in the fiction | What it is in the product (status) |
|---|---|---|
| **The Evidence Folio** | The fellowship's grimoire: one page per lesson, stamped when the lesson's evidence is forged; bound per door, per act. | `engine/folio-state.js` — built: per-class stamps, export, reset; per-lesson stamp on the handoff screen (`StoryHandoff` folio stamp). |
| **The Map of the Doors** | The Marauder's Map: 17 doors in four acts; a door steps light per completed lesson and fully opens at the quest ceremony; fog-covered until the boss is won. | **New** — a folio screen driven by the same folio-state stamps (spec §7.2). Also a printable classroom poster. |
| **The Seal** | Earned on each door's climax (the reasoning-studio lesson): the council's seal on the door's artifact. | Built as the seal motif in unit 1's climax pattern (1-5) and each unit's final story screen. |
| **The Lantern** | The frame object/projector; keeps the fog at the margins. | The projector, narratively framed; no UI of its own. |
| **The Letter Forward** | The handover: the class's letter to Grade 5 — what the fog is, how to meet it, what the lantern is. | Door 17's final screen + the exhibition's closing document (PR 10's "next-class letter" — the frame continues). |

**Points (dojo):** unchanged mechanics, narrative voice: points are *the
lantern's light* — earned for thinking (the existing "points are for thinking,
not speed" closing line is the canonical phrasing and stays in every closing
meta).

## 6 · The fellowship: student roles

Every quest names four rotating fellowship roles (2–4 students each, rotated by
the teacher). Roles map to the lesson phases, so the roles *are* the pedagogy:

| Role | Phase it owns | Job in a mission |
|---|---|---|
| **The Scribe** | handoff / folio | Keeps the numbers the class commits; stamps the folio page. |
| **The Builder** | monitor | Holds the live canvas (the model) and calls the next move. |
| **The Estimator** | launch | Locks the class's prediction before the model moves. |
| **The Checker** | connect / climax | Runs the check (add back, compare, re-measure) before any claim is signed. |

Roles rotate per quest so every student stands in each seat; the roster is
teacher-set (no student is labelled "the checker" for the year — the Muddler
feeds on labels).

## 7 · How the narrative lives in the existing engine (build spec)

### 7.1 Payload and ribbons

`story/story-map.json` already carries, per unit: `chapter`, `act`, `question`,
`artifact`, `pbl`, `bridge`, `stem`, `seerah`; per lesson: `storyBeat`,
`technique`, `storyMove`, `studentMission`, `handoff`, `screenPlan`. The
payload (`story-payload.js`) already embeds all of it. **Add one small object
per lesson** (data change, check-compatible):

```json
"quest": {
  "door": 4, "doorName": "The workshop tower",
  "mission": 6, "missionName": "The final production schedule",
  "questGiver": "The Foreman", "fogWhisper": "A missing line changes the total by a whole region."
}
```

The `StoryShell` ribbon then renders a header line *Door 4 · Mission 6 — The
final production schedule* (pure display; no new interactivity). The
`fogWhisper` is student-facing trap phrasing drawn from the lesson's
`rail.misconception` (narrated, never as the villain's voice before door 13).

### 7.2 The Map of the Doors (new folio screen)

- Data: the existing folio stamps (`daf.folio.v1`, per class, per lesson) +
  `story-map` door list. No new persistence.
- Render: 17 door icons in four act-rows (light stage, gold frame). A door
  fills with stamped lessons (gold pips); a quest ceremony (all lessons stamped)
  lights the door; door 13's icon carries a faint fog until the boss lesson is
  completed (boss-13 already records completion via its own flow).
- Entry: from the folio overlay (existing `FolioProgress` area) — one tap.
- Poster: same layout, print CSS, for the classroom wall (the "Marauder's
  Map" the class updates by hand with a magnet or sticker — the physical
  version is part of the quest ceremony).

### 7.3 Confrontations (boss template)

boss-13 is the **prototype of a reusable confrontation pattern**:
HP bar → phases (identify → execute → defend → strategy → final strike) →
strike cards with `dmg` → "heals on a claim that sounds right" → the Measure
Market reopens. The template generalises to **small confrontations** at quest
climaxes where the curriculum already has a reasoning boss shape
(candidates: 5-10 the dispatch board, 9-10 the event manager's model,
12-6 the structure under the notation, 17 the gate's final test). Roadmap PRs
05–10 author them as needed; the template is specified here, not built now.
**Only door 13 is the great confrontation** — the others are skirmishes with a
named minion, never the Muddler's face.

### 7.4 Exhibitions as quest ceremonies

Each unit's PBL exhibition (already in the story map per unit) is the **quest
ceremony**: the class presents the door's artifact to the council; the seal is
pressed; the Map of the Doors lights; the next tale opens on the next lesson's
first screen. Ceremony length stays inside the 90s/45s guardrails.

## 8 · Character development engine (summary)

Full arcs in `01-characters-and-arcs.md`. The engine's rules:

1. **Two protagonists, opposite flaws.** Omar trusts only what is written and
   is afraid to commit (the ink is still wet); Zayd builds before he checks
   (the lift is jammed). The year is them *swapping* their best habits: Omar
   learns to trust a model before the ink dries; Zayd learns to check before
   he builds. Their final beat is each stating the other's habit as his own.
2. **One arc beat per door.** Every quest dossier in `02-quests.md` carries
   the door's beat line for Omar and for Zayd; ribbon copy (title/text/clue)
   is written from it. No door may move the arc sideways — a beat either
   advances a character or is earned by the plot (a setback).
3. **Growth is visible, not told.** Costume/props shift per act (Omar: quill →
   folio-and-seal; Zayd: blocks → compass and protractor); poses grow from the
   existing three (`question`, `build`, `present`) to the extended set
   (`doubt`, `decide`, `defend`, `celebrate`); the ensemble (Hassan the Rounder,
   Musa the Splitter, and the named students already in the decks) carries the
   class's point of view, so the protagonists stay two, not twenty.
4. **The Muddler is the class's mirror.** His minions are the class's own
   anticipated misconceptions; defeating a minion is the class correcting
   itself. This keeps the villain pedagogically honest: he has no power over a
   student who checks.

## 9 · Guardrails (carried forward, made explicit)

All existing guardrails in `story/story-map.json` and the foundation check
stand. Added by this document:

- The **Muddler, the fog and Numeria are labelled fictional** on screen
  (existing convention: fiction lane vs documented-account treatment).
- **No depiction of the Prophet Muhammad ﷺ or the named companions** anywhere
  in the quest frame; the Amanah (Seerah) windows remain a separate, reverent,
  non-gamified lane (approved-only, six-field record). No sacred event is a
  mission, a boss, a reward or a role-play.
- **The lantern reveals; it never computes.** No mechanic may let the lantern
  "solve" a problem; it frames, shows and keeps the margins.
- **Simulated data stays simulated**: every civic number in a mission carries
  the existing simulated label (foundation-check pattern).
- **Narrative overhead stays capped** (90s open / 45s close); the math is the
  mechanic.
- **The Nights are borrowed as craft** (frame, nesting, objects, cliffhangers),
  not as plot: no Scheherazade narrative is retold; the tale belongs to the
  class.

## 10 · Roadmap: what each PR builds (narrative layer)

| PR | Curriculum | Narrative deliverables (this document) |
|---|---|---|
| **05** | Topics 5–7 | Story lessons with door/mission headers (payload `quest` object live); Map of the Doors v1 (folio screen + poster); fellowship roles named in quest openers; Muddler-as-stain threads in 5-4 (the passengers left at the gate) and 7-4 (the indivisible border tile). |
| **06** | Topics 8–10 | Muddler-as-whisper threads (8-6 the close islands, 11-4 the beautiful but false claim); Hassan/Musa ensemble beats per `01` §4; small-confrontation template spec frozen for 9-10. |
| **07** | Topics 11–12 | The whisper sharpens (11-4, 12-3 the longer label); Map of the Doors shows fog density rising toward door 13. |
| **08** | Topic 13 + boss | **The reveal.** The Muddler's face (boss-13 art already built); his four forms named in the boss's opening; post-boss: the market reopens, the fog thins. |
| **09** | Topics 14–16 | The rebuilding arc: Omar and Zayd's swapped habits visible in ribbon copy; the architect's confident error (16-6) as the last named minion skirmish. |
| **10** | Topic 17 + exhibition | The Grand Gate; the letter forward written *by the class* (exhibition product); the wisp at the margins; the lantern handed on. |
| **11** | Progression/assessment | Map of the Doors as the progression view (per-class stamps already exist); balanced boss model across the small confrontations. |
| **12** | Release | Reduced-motion fog; screen-reader parity for the map; projector contrast on door screens; the 114-lesson sweep includes the new headers. |

Nothing in this document changes math scope, standards, IXL codes, screen
shapes or the PR gates — it gives the existing story spine its epic frame, its
villain, its growing cast and its map.
