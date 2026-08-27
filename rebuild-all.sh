#!/bin/bash
# rebuild-all.sh — rebuild every built lesson and boss (use after an engine or roster change)
set -e
# the seven-stage plan is regenerated from the lesson sources first, so the
# stamped per-lesson DAF_STAGE payload always matches the lesson files
node scripts/make-stage-plan.js > /dev/null
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
node scripts/organize.js > /dev/null 2>&1 || true
echo "rebuilt $(ls html | wc -l) lessons"
