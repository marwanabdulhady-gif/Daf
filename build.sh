#!/bin/bash
# build.sh 1-1 "Numbers Through One Million"
set -e
CODE=$1
TITLE=$2
SRC="lessons/${CODE}.jsx"
OUT="html/lesson-${CODE}-$(echo "$TITLE" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-').html"
[ -f "$SRC" ] || { echo "no such lesson: $SRC"; exit 1; }

sed "s|<!--PAGE_TITLE-->|Dar Al Fikr · Grade 4 · Lesson ${CODE} — ${TITLE}|" engine/head.html > "$OUT"
echo '    <script>' >> "$OUT"
cat engine/omml.js engine/draw.js engine/folio-state.js >> "$OUT"
printf '    </%s>\n' "script" >> "$OUT"
# --- class roster, stamped in at build time so the deck works with no server ---
printf '    <script>window.DAF_ROSTER = ' >> "$OUT"
cat roster.json >> "$OUT"
printf ';</%s>\n' "script" >> "$OUT"
# --- lesson-specific story payload: characters, folio, STEM source notes ---
printf '    <script>window.DAF_STORY = ' >> "$OUT"
node scripts/story-for-lesson.js "$CODE" >> "$OUT"
printf ';</%s>\n' "script" >> "$OUT"
# --- the seven-stage plan for this lesson ({} for review decks like bosses) ---
printf '    <script>window.DAF_STAGE = ' >> "$OUT"
node scripts/stage-for-lesson.js "$CODE" >> "$OUT"
printf ';</%s>\n' "script" >> "$OUT"
echo '    <script type="text/babel" data-presets="daf-react">' >> "$OUT"
cat engine/primitives.jsx engine/story-components.jsx engine/routines.jsx "$SRC" engine/app.jsx >> "$OUT"
printf '    </%s>\n' "script" >> "$OUT"
printf '  </body>\n</html>\n' >> "$OUT"
echo "built $OUT ($(wc -l < "$OUT") lines, $(du -h "$OUT" | cut -f1))"
