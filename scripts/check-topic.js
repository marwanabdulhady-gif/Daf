// Deep check: does every lesson in a topic exist, match the curriculum, and hold together?
const fs = require("fs"), path = require("path");
const babel = require("@babel/standalone");
const topicN = Number(process.argv[2]);
const cur = JSON.parse(fs.readFileSync("curriculum.json", "utf8"));
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
      if (metas !== 10 || cases !== 10) problems.push(`screens ${metas}/${cases}`);
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
