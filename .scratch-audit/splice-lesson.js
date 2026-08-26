const fs = require("fs");
const [file, blockPath] = process.argv.slice(2);
const block = fs.readFileSync(blockPath, "utf8");
const s = fs.readFileSync(file, "utf8");
const idx = s.indexOf("const LESSON = {");
if (idx === -1) throw new Error("no LESSON in " + file);
fs.writeFileSync(file, s.slice(0, idx) + block);
console.log("spliced", file);
