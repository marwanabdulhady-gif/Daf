/* ===========================================================================
   DURABLE STORY STATE · class folio stamps (PR 02)

   What this is: a per-class record of which lesson folio pages the class has
   restored, kept in localStorage on this computer only. It is class-level
   data — class name, lesson code and timestamps — and never stores student
   names, scores or anything personal (student records stay in the dojo
   session log, which is exported on demand).

   Design follows the research gate (docs/research/pr-02-source-review-infrastructure.md,
   S1/S2): the state is tiny, best-effort and NON-CRITICAL — when storage is
   missing, cleared or evicted every deck behaves exactly as before (folio
   pips fall back to position-based), and one tap can export a JSON backup and
   another can merge that backup back in on a different computer.
   There is no server, no sync and no cross-machine state: moving between
   machines is an explicit teacher action (export here, import there).
   =========================================================================== */
const FOLIO_KEY = "daf.folio.v1";

function folioStorage() {
  /* test hook (node): an in-memory store object, mirroring __DAF_XML_PARSER__ */
  if (typeof globalThis !== "undefined" && globalThis.__DAF_FOLIO_LS__) return globalThis.__DAF_FOLIO_LS__;
  try { return (typeof window !== "undefined" && window.localStorage) || null; }
  catch (e) { return null; }
}

function folioLoad() {
  const ls = folioStorage();
  if (!ls) return { version: 1, classes: {} };
  try {
    const st = JSON.parse(ls.getItem(FOLIO_KEY) || "{}") || {};
    if (!st.classes) st.classes = {};
    return st;
  } catch (e) { return { version: 1, classes: {} }; }
}

function folioSave(st) {
  const ls = folioStorage();
  if (!ls) return false;
  try {
    st.version = 1;
    ls.setItem(FOLIO_KEY, JSON.stringify(st));
    return true;
  } catch (e) { return false; } /* quota or disabled storage: degrade silently */
}

/* Stamped lessons for one class: { "1-1": "2026-08-24T09:00:00.000Z", ... } */
function folioFor(className) {
  if (!className) return { lessons: {} };
  const c = folioLoad().classes[className];
  return { lessons: (c && c.lessons) || {} };
}

/* Stamp (on !== false) or unstamp (on === false) one lesson for a class.
   Returns true when the change was saved to this computer. */
function folioStamp(className, code, on) {
  if (!className || !code) return false;
  const st = folioLoad();
  const c = st.classes[className] || (st.classes[className] = { lessons: {} });
  if (!c.lessons) c.lessons = {};
  if (on === false) delete c.lessons[code];
  else c.lessons[code] = new Date().toISOString();
  c.updatedAt = new Date().toISOString();
  return folioSave(st);
}

/* Clear the whole class folio on this computer. */
function folioReset(className) {
  if (!className) return true;
  const st = folioLoad();
  delete st.classes[className];
  return folioSave(st);
}

/* Export the class folio as a JSON file the school can keep. */
function folioExport(className) {
  const data = JSON.stringify({
    app: "Dar Al Fikr Grade 4 Mathematics",
    key: FOLIO_KEY,
    exportedAt: new Date().toISOString(),
    class: className,
    state: folioFor(className)
  }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "daf-" + String(className).replace(/[^\w.-]+/g, "-") + "-folio.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 400);
}

/* Import the return trip for folioExport.

   A teacher exports on the classroom machine, carries the JSON to the second
   machine (or back after a rebuild) and merges it in. Deliberately
   NON-DESTRUCTIVE: a merge adds or refreshes stamps and never removes one, so
   importing the same file twice is identical to importing it once, and a stale
   backup can never erase work this computer has already recorded. The
   per-lesson timestamp decides the winner, so the newest stamp survives either
   way round.

   `payload` is either the parsed object or the raw JSON text produced by
   folioExport. Returns { added, refreshed, unchanged, rejected, className }
   where `rejected` counts lesson entries the backup was not allowed to carry
   (anything that is not a lesson code -> timestamp pair), or { error } when
   the payload is not a folio backup at all. Nothing is stored unless at least
   one valid entry survives, and storage failure reports error, never throws. */
function folioMerge(payload) {
  let doc = payload;
  if (typeof payload === "string") {
    try { doc = JSON.parse(payload); } catch (e) { return { error: "That file is not valid JSON." }; }
  }
  if (!doc || typeof doc !== "object" || Array.isArray(doc)) return { error: "That file is not a folio backup." };
  const stt = doc.state;
  if (!stt || typeof stt !== "object" || Array.isArray(stt) ||
      !stt.lessons || typeof stt.lessons !== "object" || Array.isArray(stt.lessons)) {
    return { error: "That file has no class folio stamps in it." };
  }
  const className = (typeof doc.class === "string" && doc.class.trim()) ? doc.class.trim() : null;
  if (!className) return { error: "That backup does not say which class it belongs to." };
  /* the same shapes folioStamp will write: "1-1", "17-10" or "boss-13" */
  const CODE = /^(?:\d+-\d+|boss-\d+)$/;
  const st = folioLoad();
  const c = st.classes[className] || (st.classes[className] = { lessons: {} });
  if (!c.lessons) c.lessons = {};
  const out = { added: 0, refreshed: 0, unchanged: 0, rejected: 0, className: className };
  for (const key of Object.keys(stt.lessons)) {
    const stamp = stt.lessons[key];
    if (!CODE.test(key) || typeof stamp !== "string" || Number.isNaN(Date.parse(stamp))) { out.rejected++; continue; }
    const prev = c.lessons[key];
    if (prev === undefined) { c.lessons[key] = stamp; out.added++; }
    else if (prev === stamp) { out.unchanged++; }
    else if (Date.parse(stamp) > Date.parse(prev)) { c.lessons[key] = stamp; out.refreshed++; }
    else { out.unchanged++; } /* this computer already holds the newer stamp */
  }
  if (!out.added && !out.refreshed) return out; /* nothing to write: leave storage alone */
  c.updatedAt = new Date().toISOString();
  if (!folioSave(st)) return { error: "This computer would not save the import (storage full or blocked)." };
  return out;
}

/* Browser half: open a file picker and merge the chosen backup.
   Calls `done(result)` — { added, refreshed, unchanged, rejected, className }
   on success, or { error } on any failure. Never throws. */
function folioImportFile(done) {
  const report = (r) => { try { if (done) done(r); } catch (e) {} return r; };
  try {
    if (typeof document === "undefined" || !document.createElement) return report({ error: "File import needs a browser." });
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = ".json,application/json";
    inp.style.position = "fixed";
    inp.style.left = "-9999px";
    inp.addEventListener("change", () => {
      const file = inp.files && inp.files[0];
      const finish = () => { setTimeout(() => { try { inp.remove(); } catch (e) {} }, 400); };
      if (!file) return (finish(), report({ error: "No file was chosen." }));
      const reader = new FileReader();
      reader.onload = () => { const r = folioMerge(String(reader.result)); finish(); report(r); };
      reader.onerror = () => { finish(); report({ error: "That file could not be read." }); };
      try { reader.readAsText(file); }
      catch (e) { finish(); report({ error: "That file could not be read." }); }
    });
    document.body.appendChild(inp);
    inp.click();
    return true;
  } catch (e) { return report({ error: "File import is not available here." }); }
}
