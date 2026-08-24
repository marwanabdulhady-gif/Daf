#!/bin/bash
# rebuild-all.sh — rebuild every built lesson and boss (use after an engine or roster change)
set -e
node -e '
const d=require("./curriculum.json");
for (const t of d.topics) for (const l of t.lessons)
  if (l.built) console.log(l.code + "\t" + l.title);
for (const b of (d.bosses||[]))
  if (b.built) console.log(b.code + "\t" + b.title);
' | while IFS=$'\t' read -r code title; do
  ./build.sh "$code" "$title" > /dev/null
done
node scripts/make-index.js > /dev/null 2>&1 || true
echo "rebuilt $(ls html | wc -l) lessons"
