/* Unit tests for the durable folio state (PR 02) — plain node, no browser. */
"use strict";

/* in-memory localStorage double */
const mem = {
  _m: {},
  getItem(k) { return Object.prototype.hasOwnProperty.call(this._m, k) ? this._m[k] : null; },
  setItem(k, v) { this._m[k] = String(v); },
  removeItem(k) { delete this._m[k]; }
};
globalThis.__DAF_FOLIO_LS__ = mem;

const fs = require("fs");
const path = require("path");
const moduleSrc = fs.readFileSync(path.join(__dirname, "..", "engine", "folio-state.js"), "utf8");
const fn = new Function("module", "exports", "globalThis",
  moduleSrc + "\nreturn { FOLIO_KEY, folioFor, folioStamp, folioReset, folioMerge, folioImportFile };");
const mod = { exports: {} };
const { FOLIO_KEY, folioFor, folioStamp, folioReset, folioMerge, folioImportFile } = fn(mod, mod.exports, globalThis);

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("  FAIL  " + m); } };

/* empty state */
ok(JSON.stringify(folioFor("4A")) === JSON.stringify({ lessons: {} }), "unknown class -> empty lessons");
ok(folioFor("") === undefined || folioFor("").lessons, "falsy class -> empty lessons");

/* stamp + read */
ok(folioStamp("4A", "1-1", true) === true, "stamp saves");
ok(typeof folioFor("4A").lessons["1-1"] === "string" &&
   !Number.isNaN(Date.parse(folioFor("4A").lessons["1-1"])), "stamped lesson carries an ISO timestamp");
ok(!folioFor("4B").lessons["1-1"], "other class is untouched");

/* stamp is idempotent and multi-lesson */
folioStamp("4A", "1-2", true);
ok(Object.keys(folioFor("4A").lessons).length === 2, "two lessons stamped");
folioStamp("4A", "1-1", true);
ok(Object.keys(folioFor("4A").lessons).length === 2, "re-stamp does not duplicate");

/* unstamp */
ok(folioStamp("4A", "1-1", false) === true, "unstamp saves");
ok(!folioFor("4A").lessons["1-1"], "unstamped lesson gone");
ok(!!folioFor("4A").lessons["1-2"], "other stamp survives unstamp");

/* privacy: only class key + lesson codes + timestamps, no other fields */
const raw = JSON.parse(mem.getItem(FOLIO_KEY));
const cls = raw.classes["4A"];
ok(Object.keys(cls).every((k) => ["lessons", "updatedAt"].includes(k)), "class record holds only lessons + updatedAt");
ok(Object.values(cls.lessons).every((v) => typeof v === "string"), "lesson values are timestamps only");
ok(!JSON.stringify(raw).match(/[a-z]+\s*:\s*"[A-Z][a-z]+ [A-Z][a-z]+"/), "no name-like strings in the store");

/* reset */
ok(folioReset("4A") === true, "reset saves");
ok(JSON.stringify(folioFor("4A")) === JSON.stringify({ lessons: {} }), "class cleared after reset");

/* storage failure degrades: no throw, returns false */
const dying = { getItem() { return mem.getItem.apply(mem, arguments); }, setItem() { throw new Error("QuotaExceededError"); } };
globalThis.__DAF_FOLIO_LS__ = dying;
ok(folioStamp("4C", "1-3", true) === false, "quota failure -> false, no throw");
globalThis.__DAF_FOLIO_LS__ = mem;

/* ---------------------------------------------------------------- import ---
   folioMerge is the return trip for folioExport: a backup made on one
   computer merges into another without ever removing a stamp. */

/* a fresh machine imports a backup */
folioReset("4D");
const backup = {
  app: "Dar Al Fikr Grade 4 Mathematics",
  key: FOLIO_KEY,
  exportedAt: new Date().toISOString(),
  class: "4D",
  state: { lessons: { "1-1": "2026-08-24T09:00:00.000Z", "1-2": "2026-08-25T09:00:00.000Z" } }
};
let r = folioMerge(backup);
ok(r.added === 2 && r.refreshed === 0 && r.rejected === 0, "fresh import adds both stamps");
ok(folioFor("4D").lessons["1-1"] === "2026-08-24T09:00:00.000Z", "imported stamp keeps its original timestamp");
ok(r.className === "4D", "import reports the class it wrote to");

/* importing the same file twice changes nothing (idempotent) */
r = folioMerge(backup);
ok(r.added === 0 && r.refreshed === 0 && r.unchanged === 2, "re-import is idempotent");
ok(Object.keys(folioFor("4D").lessons).length === 2, "re-import does not duplicate");

/* a newer local stamp wins; a stale backup cannot overwrite it */
folioStamp("4D", "1-2", true);                       /* now = today, newer than the backup */
const before = folioFor("4D").lessons["1-2"];
r = folioMerge(backup);
ok(r.refreshed === 0, "stale backup does not refresh a newer local stamp");
ok(folioFor("4D").lessons["1-2"] === before, "newer local stamp survives a stale import");

/* a newer backup stamp does win */
const newer = { class: "4D", state: { lessons: { "1-1": "2030-01-01T00:00:00.000Z" } } };
r = folioMerge(newer);
ok(r.refreshed === 1, "newer backup stamp refreshes the local one");
ok(folioFor("4D").lessons["1-1"] === "2030-01-01T00:00:00.000Z", "refreshed stamp holds the newer timestamp");

/* merge is non-destructive: importing never removes a stamp */
folioStamp("4D", "2-1", true);
r = folioMerge(backup);                              /* backup has no 2-1 */
ok(!!folioFor("4D").lessons["2-1"], "a stamp absent from the backup is kept");

/* raw JSON text is accepted, exactly as a FileReader hands it over */
folioReset("4E");
r = folioMerge(JSON.stringify({ class: "4E", state: { lessons: { "3-4": "2026-09-01T09:00:00.000Z" } } }));
ok(r.added === 1 && !!folioFor("4E").lessons["3-4"], "raw JSON text imports");

/* boss codes are valid lesson codes */
folioReset("4F");
r = folioMerge({ class: "4F", state: { lessons: { "boss-13": "2026-09-02T09:00:00.000Z" } } });
ok(r.added === 1 && r.rejected === 0, "boss-13 imports as a lesson stamp");

/* junk entries are rejected, good ones still land */
folioReset("4G");
r = folioMerge({ class: "4G", state: { lessons: {
  "4-1": "2026-09-03T09:00:00.000Z",               /* good */
  "Robert Smith": "2026-09-03T09:00:00.000Z",      /* not a lesson code */
  "4-2": 42,                                        /* not a timestamp string */
  "4-3": "not a date",                              /* unparseable timestamp */
  "4-4": "2026-09-04T09:00:00.000Z"                /* good */
} } });
ok(r.added === 2, "only the two well-formed stamps import");
ok(r.rejected === 3, "three malformed entries are rejected");
ok(!folioFor("4G").lessons["Robert Smith"], "a name-like key is refused");
ok(Object.keys(folioFor("4G").lessons).sort().join(",") === "4-1,4-4", "exactly the valid codes were written");

/* malformed payloads report an error and write nothing */
const snapshot = mem.getItem(FOLIO_KEY);
const bad = [
  null,
  "not json at all",
  "[1,2,3]",
  JSON.stringify({ class: "4H" }),                  /* no state */
  JSON.stringify({ class: "4H", state: {} }),       /* no lessons */
  JSON.stringify({ state: { lessons: { "5-1": "2026-09-05T09:00:00.000Z" } } }) /* no class */
];
let allErrored = true;
for (const b of bad) { const res = folioMerge(b); if (!res.error) { allErrored = false; console.log("    no error for: " + JSON.stringify(b).slice(0, 60)); } }
ok(allErrored, "every malformed payload returns { error }");
ok(mem.getItem(FOLIO_KEY) === snapshot, "a rejected payload writes nothing to storage");
ok(!folioFor("4H").lessons["5-1"], "a payload with no class name imports nothing");

/* an empty backup is a no-op, not an error */
r = folioMerge({ class: "4I", state: { lessons: {} } });
ok(!r.error && r.added === 0 && r.rejected === 0, "empty backup is a clean no-op");

/* import degrades like every other write: quota failure -> error, no throw */
globalThis.__DAF_FOLIO_LS__ = dying;
r = folioMerge({ class: "4J", state: { lessons: { "6-1": "2026-09-06T09:00:00.000Z" } } });
ok(!!r.error, "import on failing storage reports an error");
globalThis.__DAF_FOLIO_LS__ = mem;
ok(!folioFor("4J").lessons["6-1"], "failed import wrote nothing");

/* privacy holds after an import: the store still carries only codes + timestamps */
folioMerge({ class: "4K", state: { lessons: { "7-2": "2026-09-07T09:00:00.000Z" } } });
const rawAfter = JSON.parse(mem.getItem(FOLIO_KEY));
ok(Object.keys(rawAfter.classes["4K"]).every((k) => ["lessons", "updatedAt"].includes(k)), "imported class record holds only lessons + updatedAt");
ok(Object.values(rawAfter.classes["4K"].lessons).every((v) => typeof v === "string" && !Number.isNaN(Date.parse(v))), "imported lesson values are timestamps only");

/* the browser half degrades without a DOM: error via the callback, no throw,
   no write — the same contract as every other folio call */
ok(typeof folioMerge === "function", "folioMerge is exported");
let importReport = "not called";
const noDom = folioImportFile((r) => { importReport = r; });
ok(!!(noDom && noDom.error), "folioImportFile without a DOM returns { error }");
ok(!!(importReport && importReport.error), "folioImportFile reports through its callback too");
ok(JSON.stringify(folioFor("4K")) === JSON.stringify({ lessons: { "7-2": "2026-09-07T09:00:00.000Z" } }),
   "a refused import leaves the store untouched");

console.log(`\nfolio-state: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
