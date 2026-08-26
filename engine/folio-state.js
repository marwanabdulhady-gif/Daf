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
   pips fall back to position-based), and one tap can export a JSON backup.
   There is no server, no sync and no cross-machine state.
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
