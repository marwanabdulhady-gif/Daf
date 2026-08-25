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
  moduleSrc + "\nreturn { FOLIO_KEY, folioFor, folioStamp, folioReset };");
const mod = { exports: {} };
const { FOLIO_KEY, folioFor, folioStamp, folioReset } = fn(mod, mod.exports, globalThis);

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

console.log(`\nfolio-state: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
