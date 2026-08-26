const fs = require("fs");
const babel = require("@babel/standalone");
const files = process.argv.slice(2);
const parts = ["engine/primitives.jsx", "engine/story-components.jsx", "engine/routines.jsx"].concat(files, ["engine/app.jsx"]);
const jsx = parts.map(p => fs.readFileSync(p, "utf8")).join("\n");
try { babel.transform(jsx, { presets: [["react", { runtime: "classic" }]] }); console.log("babel OK"); }
catch (e) { console.error("BABEL FAIL:", e.message); process.exit(1); }
