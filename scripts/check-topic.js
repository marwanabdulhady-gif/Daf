// Deep check: does every lesson in a topic exist, match the curriculum, and hold together?
const fs = require("fs"), path = require("path");
const babel = require("@babel/standalone");
const topicN = Number(process.argv[2]);
const cur = JSON.parse(fs.readFileSync("curriculum.json", "utf8"));
const storyFile = "story/story-map.json";
const story = fs.existsSync(storyFile) ? JSON.parse(fs.readFileSync(storyFile, "utf8")) : null;
const planByCode = {};
if (story) story.units.forEach((u) => u.lessons.forEach((l) => {
  if (l.screenPlan && l.implementationStatus) planByCode[l.code] = l.screenPlan;
}));
const topic = cur.topics.find((t) => t.n === topicN);
const files = fs.readdirSync("html");
let fail = 0;
console.log(`Topic ${topic.n} — ${topic.title}\n`);
for (const l of topic.lessons) {
  const f = files.find((x) => x.startsWith("lesson-" + l.code + "-"));
  const problems = [];
  if (!f) problems.push("NO FILE");
  else {
    const src = fs.readFileSync(path.join("html", f), "utf8");
    const m = src.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/);
    if (!m) problems.push("no babel block");
    else {
      const jsx = m[1];
      try { babel.transform(jsx, { presets: ["react"] }); } catch (e) { problems.push("babel: " + e.message.slice(0, 60)); }
      const metas = (jsx.match(/^\s*\{?\s*phase: "/gm) || []).length;
      const cases = (jsx.match(/^\s*case \d+:/gm) || []).length;
      if (metas !== cases) problems.push(`screens ${metas}/${cases} mismatch`);
      /* Flexible screen plans (PR 01+): an IMPLEMENTED lesson's deck must sit
         inside its story-map planning band. Unauthored lessons keep the legacy
         10-screen baseline check until their own PR authors them. */
      const plan = planByCode[l.code];
      if (plan) {
        const [lo, hi] = String(plan.planningBand).split("–").map(Number);
        if (metas < lo || metas > hi)
          problems.push(`screens ${metas} outside planning band ${lo}–${hi}`);
      } else if (metas !== 10) {
        problems.push(`screens ${metas} (expected 10, no screen plan)`);
      }
      if (!jsx.includes(`code: "${l.code}"`)) problems.push("LESSON.code mismatch");
      if (!jsx.includes(l.title)) problems.push("title mismatch");
      for (const c of (l.ixl || [])) if (!jsx.includes(`"${c}"`)) problems.push("missing IXL " + c);
      if (!/D\.board\(/.test(jsx)) problems.push("no board screen");
      if (!/m:oMath/.test(jsx)) problems.push("no OMML");
      if (/[\u0600-\u06FF]/.test(src)) problems.push("arabic characters");
      const sizeKB = Math.round(src.length / 1024);
      if (sizeKB < 100) problems.push("suspiciously small (" + sizeKB + "KB)");
    }
  }
  if (problems.length) { fail++; console.log(`  FAIL  ${l.code}  ${l.title}\n        ${problems.join(" · ")}`); }
  else console.log(`  OK    ${l.code}  ${l.title}`);
}
console.log(`\n${topic.lessons.length - fail}/${topic.lessons.length} lessons complete and consistent`);
process.exit(fail ? 1 : 0);
