const fs = require("fs");
const f = "engine/story-components.jsx";
let s = fs.readFileSync(f, "utf8");
const cast = fs.readFileSync("/tmp/support-character.jsx", "utf8");

// 1. insert the supporting cast after StoryLantern (before UnitShapeMotif)
const anchor1 = "function UnitShapeMotif({ topic }) {";
if (!s.includes(anchor1)) throw new Error("anchor1 missing");
s = s.replace(anchor1, cast + "\n" + anchor1);

// 2. StoryShell: support prop
const sig1 = "function StoryShell({ lane, character, pose, title, text, clue, children, compact }) {";
if (!s.includes(sig1)) throw new Error("sig1 missing");
s = s.replace(sig1, "function StoryShell({ lane, character, pose, support, title, text, clue, children, compact }) {");

const cast1 = `            : character ? <StoryCharacter id={character} pose={pose} size={60} />
            : <StoryLantern size={54} />}
        </div>`;
if (!s.includes(cast1)) throw new Error("cast1 missing");
s = s.replace(cast1, `            : character ? <StoryCharacter id={character} pose={pose} size={60} />
            : <StoryLantern size={54} />}
          {support ? <SupportCharacter id={support} size={46} /> : null}
        </div>`);

// 3. StoryHandoff: support prop passthrough
const sig2 = "function StoryHandoff({ title, text, artifact, next, children }) {";
if (!s.includes(sig2)) throw new Error("sig2 missing");
s = s.replace(sig2, "function StoryHandoff({ title, text, artifact, next, support, children }) {");

const shell2 = `    <StoryShell lane="fiction" character="both" pose="present" title={title} text={text}
      clue={next ? "Next folio clue · " + next : null}>`;
if (!s.includes(shell2)) throw new Error("shell2 missing");
s = s.replace(shell2, `    <StoryShell lane="fiction" character="both" pose="present" support={support} title={title} text={text}
      clue={next ? "Next folio clue · " + next : null}>`);

fs.writeFileSync(f, s);
console.log("engine patched: SupportCharacter + support props");
