/* Splice a story LESSON object into a baseline lesson file.
   Keeps the baseline header, M object and canvas draws byte-identical;
   replaces only the LESSON object. Compile-checks the result with babel.
   Usage (from repo root): node staging/splice.js lessons/2-1.jsx staging/lesson-blocks/2-1.jsx staging/lessons-2/2-1.jsx */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/standalone");
const ROOT = "/home/user/Daf";
const [base, block, out] = process.argv.slice(2);
const baseSrc = fs.readFileSync(path.join(ROOT, base), "utf8");
const blockSrc = fs.readFileSync(path.join(ROOT, block), "utf8").trim();
const idx = baseSrc.indexOf("const LESSON = {");
if (idx === -1) { console.error("no 'const LESSON = {' anchor in " + base); process.exit(1); }
const head = baseSrc.slice(0, idx);
const full = head + blockSrc + "\n";
try {
  babel.transform(full, { presets: ["react"] });
} catch (e) {
  console.error("COMPILE FAIL:\n" + e.message);
  process.exit(1);
}
fs.mkdirSync(path.dirname(path.join(ROOT, out)), { recursive: true });
fs.writeFileSync(path.join(ROOT, out), full);
console.log("spliced + compiled OK: " + out + " (" + full.split("\n").length + " lines)");
