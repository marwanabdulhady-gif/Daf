#!/bin/bash
# Temporary preview builder for staged lessons — writes to preview/topic2/,
# never touches tracked html/. Usage: ./staging/preview-build.sh 2-1 "Finding Sums and Differences with Mental Math"
set -e
CODE=$1
TITLE=$2
SRC="staging/lessons-2/${CODE}.jsx"
OUT="preview/topic2/lesson-${CODE}-$(echo "$TITLE" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-').html"
[ -f "$SRC" ] || { echo "no staged lesson: $SRC"; exit 1; }
mkdir -p preview/topic2
sed "s|<!--PAGE_TITLE-->|Dar Al Fikr · Grade 4 · Lesson ${CODE} — ${TITLE} (staged preview)|" engine/head.html > "$OUT"
echo '    <script>' >> "$OUT"
cat engine/omml.js engine/draw.js engine/folio-state.js >> "$OUT"
printf '    </%s>\n' "script" >> "$OUT"
printf '    <script>window.DAF_ROSTER = ' >> "$OUT"
cat roster.json >> "$OUT"
printf ';</%s>\n' "script" >> "$OUT"
printf '    <script>window.DAF_STORY = ' >> "$OUT"
node scripts/story-for-lesson.js "$CODE" >> "$OUT"
printf ';</%s>\n' "script" >> "$OUT"
echo '    <script type="text/babel" data-presets="daf-react">' >> "$OUT"
cat engine/primitives.jsx engine/story-components.jsx engine/routines.jsx "$SRC" engine/app.jsx >> "$OUT"
printf '    </%s>\n' "script" >> "$OUT"
printf '  </body>\n</html>\n'
echo "preview built $OUT"
