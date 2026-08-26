const fs = require("fs");
const p = "scripts/story-payload.js";
let s = fs.readFileSync(p, "utf8");
const anchor = "    characters: (map.characters.main || []).map(({ id, name, gender, role, functions }) =>\n      ({ id, name, gender, role, functions })),";
const neu = anchor + "\n    /* Supporting fictional cast (docs/plans/narrative/03): quest givers, the\n       guide and the rival. Fiction lane only — never rendered in stem/amanah. */\n    supporting: (map.characters.supporting || []).map(({ id, name, role, doors, prop }) =>\n      ({ id, name, role, doors, prop })),";
if (!s.includes(anchor)) throw new Error("payload anchor not found");
s = s.replace(anchor, neu);
fs.writeFileSync(p, s);
console.log("payload extended");
