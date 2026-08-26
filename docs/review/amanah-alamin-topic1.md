# Amanah window review packet · Topic 1 · Al-Amin, the trustworthy

**Status: DRAFT — awaiting qualified school/Islamic Studies review.**
Web research is not a substitute for this review (per `docs/research/README.md`).
**Registry entry:** `story/amanah-sources.json` → `t1-seerah`, status `pending-review`,
`studentText: null` — the window is invisible to every deck until a six-field `approved`
record exists.
**Placement candidate:** lesson 1-5, the seal moment — a sealed census record is earned the
same way trust is earned: with evidence every side can check.
**No-review fallback:** if review has not passed by the PR 03 merge, lesson 1-5 ships without
the Amanah Window; the registry entry stays `pending-review`; approval later is a one-line
swap plus rebuild.

## Non-negotiable constraints (from the approved content model)

- No depiction of the Prophet Muhammad ﷺ; no portrait, icon or illustration of him.
- No role-play, no invented dialogue, no invented quantities, no motives beyond the source.
- Chronological and reverent; values reflection **follows the mathematics** of the lesson and is
  never a game mechanic (no XP, no stamps, no characters in the window).
- The reviewer's exact text is what ships, word for word; the draft below is a proposal only.
- English edition constraint: student-facing text must pass the deck guardrails (no Arabic
  script). "Prophet Muhammad ﷺ" follows the repository's documentation convention; the reviewer
  should confirm the school's typography policy for the shipped string.

## Theme

Trust (amanah) and honest dealing; a fair, verifiable decision prevents conflict.

## Source candidates for the reviewer's consideration

- Ibn Ishaq, *Sīrat Rasūl Allāh* (d. ca. 767), as preserved in Ibn Hisham's recension
  (d. 828/833) — the Meccan period, Ka'ba arbitration passage.
- English translation of reference: Albert Guillaume, *Muhammad: His Life Based on the
  Traditional Sources* (Oxford) — Ka'ba arbitration in the Meccan-period chapter.
- The reviewer may designate any other approved source or text; the citations above support
  review only and do not substitute for the approved source recorded in the audit fields.

## Chronology anchors (for the reviewer to confirm or correct)

- Pre-revelation Makkah. The Prophet Muhammad ﷺ was known to his neighbours as **Al-Amin**
  (the trustworthy) and **As-Sadiq** (the truthful); people entrusted him with their goods and
  deposits.
- The Ka'ba was renovated after fire and flood damage; a shipwreck near Jeddah (Shu'ayba)
  supplied building stone for the work — a local detail that suits this Jeddah-based curriculum.
- The clans disputed who should return the Black Stone to its corner; they agreed the next man
  to arrive would arbitrate; when he came they said, "Al-Amin" — they accepted his judgment.
- Each clan lifted the Stone on a shared cloth; he placed it in its position; a possible
  conflict became a shared act of honor.
- Cross-check note: age approximately 35, ca. 605 CE, per secondary summaries used during
  research; the reviewer's approved text governs any date or age stated.

## Proposed student-facing text (DRAFT — the reviewer's text ships)

> The people of Makkah knew the Prophet Muhammad ﷺ as Al-Amin, the trustworthy. What people
> entrusted to him was kept, and his word was relied on.
>
> When the clans of Makkah disputed who should return the Black Stone to the Ka'ba after
> rebuilding it, they agreed that the next man they met would decide. When he came, they said:
> "Al-Amin." Each clan lifted the Stone on a shared cloth, and he placed it in its position. A
> fair decision, trusted by every side, turned a possible conflict into a shared act of honor.
>
> **Values reflection — amanah, trust:** trust is earned by honest dealing. A decision or a
> record that everyone can check is a decision or a record that everyone can trust. That is the
> same test the census record passed in this lesson: the seal was earned with evidence, not
> with authority.

## The six audit fields (completed by the reviewer; all required for `approved`)

| Field | Value |
|---|---|
| `studentText` (exact text that ships) | — |
| `source` (approved source) | — |
| `translation` (translation used) | — |
| `reviewer` (name and role) | — |
| `reviewDate` (ISO date) | — |
| `status` | `pending-review` → `approved` / `blocked` / `rejected` |

## Reviewer checklist

- [ ] Chronology confirmed against the approved source; dates/ages corrected if needed
- [ ] Exact student text approved (or replaced)
- [ ] No depiction, role-play, invented dialogue, quantities or motives
- [ ] Values reflection tied to this lesson's mathematics (the seal / a verifiable record)
- [ ] English-edition typography confirmed for the shipped string
- [ ] Six-field record signed and recorded in `story/amanah-sources.json`
