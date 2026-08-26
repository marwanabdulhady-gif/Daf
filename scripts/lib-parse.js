/* ===========================================================================
   lib-parse · tiny restricted reader for the lesson sources.

   The lesson files are authored JSX, not JSON. The fields this repo needs to
   read from them (metas, SWYK blocks, strategy lists) are *restricted
   literals*: objects, arrays, "strings" (with escapes), numbers, true /
   false / null and bare identifiers (M.someKey, drawSupport11). Nothing else.
   This reader handles exactly that grammar and throws on anything wilder, so
   a future lesson that starts putting live JSX in these fields fails loudly
   in the stage-plan build instead of shipping broken data.
   =========================================================================== */
"use strict";

function skipWs(src, i) {
  while (i < src.length && /[ \t\r\n,]/.test(src[i])) i++;
  return i;
}

/* Read a quoted string starting at i (src[i] is the quote). Returns index just
   past the closing quote. Handles backslash escapes. */
function readString(src, i) {
  const q = src[i];
  let j = i + 1;
  while (j < src.length) {
    if (src[j] === "\\") { j += 2; continue; }
    if (src[j] === q) return j + 1;
    j++;
  }
  throw new Error("unterminated string at " + i);
}

/* Parse a literal starting at i. Returns [value, nextIndex]. */
function parseLit(src, i) {
  i = skipWs(src, i);
  const c = src[i];
  if (c === undefined) throw new Error("unexpected end of input at " + i);
  if (c === "{") {
    const obj = {};
    let j = i + 1;
    for (;;) {
      j = skipWs(src, j);
      if (src[j] === "}") return [obj, j + 1];
      let key, kEnd;
      if (src[j] === '"') {
        kEnd = readString(src, j);
        key = JSON.parse(src.slice(j, kEnd));
      } else {
        kEnd = j;
        while (kEnd < src.length && /[A-Za-z0-9_$]/.test(src[kEnd])) kEnd++;
        key = src.slice(j, kEnd);
        if (!key) throw new Error("bad key at " + j);
      }
      j = skipWs(src, kEnd);
      if (src[j] !== ":") throw new Error("expected : at " + j);
      const [v, nk] = parseLit(src, j + 1);
      obj[key] = v;
      j = nk;
    }
  }
  if (c === "[") {
    const arr = [];
    let j = i + 1;
    for (;;) {
      j = skipWs(src, j);
      if (src[j] === "]") return [arr, j + 1];
      const [v, nk] = parseLit(src, j);
      arr.push(v);
      j = nk;
    }
  }
  if (c === '"' || c === "'") {
    const j = readString(src, i);
    const raw = src.slice(i, j);
    let val;
    try { val = c === '"' ? JSON.parse(raw) : raw.slice(1, -1); }
    catch (e) { throw new Error("bad string at " + i); }
    return [val, j];
  }
  let j = i;
  while (j < src.length && /[A-Za-z0-9_$.]/.test(src[j])) j++;
  const tok = src.slice(i, j);
  if (!tok) throw new Error("unparseable token at " + i);
  if (tok === "true") return [true, j];
  if (tok === "false") return [false, j];
  if (tok === "null") return [null, j];
  if (/^-?\d+(\.\d+)?$/.test(tok)) return [Number(tok), j];
  return [{ __id: tok }, j];
}

/* Find the opening tag of the first element named `name` (or the first one
   after `after`). Returns the tag source from `<name` through the `>` that
   closes the tag — attributes only, no children. */
function openTagAt(src, name, after) {
  const start = src.indexOf("<" + name, after || 0);
  if (start < 0) return null;
  let j = start + 1;
  let depth = 0;
  while (j < src.length) {
    const c = src[j];
    if (c === '"' || c === "'") { j = readString(src, j); continue; }
    if (c === "{") {
      let d = 1; j++;
      while (j < src.length && d > 0) {
        if (src[j] === '"' || src[j] === "'") { j = readString(src, j); continue; }
        if (src[j] === "{") d++;
        else if (src[j] === "}") d--;
        j++;
      }
      continue;
    }
    if (c === ">" && depth === 0) return src.slice(start, j + 1);
    if (c === "<") depth++; // nested JSX inside an attribute expression
    else if (c === "/" && depth > 0) depth--;
    j++;
  }
  throw new Error("unterminated opening tag " + name);
}

/* From an opening tag: extract attribute `name`.
   - plain string attr  name="value"      -> the string
   - expression attr    name={{...}}      -> parsed literal (identifier refs
     come back as {__id:"M.key"})
   Returns null when absent. */
function attr(tagSrc, name) {
  const re = new RegExp("(?:^|\\s)" + name + "=\"((?:[^\"\\\\]|\\\\.)*)\"");
  const sm = tagSrc.match(re);
  if (sm) return sm[1].replace(/\\(["'\\])/g, "$1");
  const re2 = new RegExp("(?:^|\\s)" + name + "=(\\{)");
  const em = tagSrc.match(re2);
  if (!em) return null;
  let j = em.index + em[0].length; // at the char after "{"
  let d = 1;
  while (j < tagSrc.length && d > 0) {
    if (tagSrc[j] === '"' || tagSrc[j] === "'") { j = readString(tagSrc, j); continue; }
    if (tagSrc[j] === "{") d++;
    else if (tagSrc[j] === "}") d--;
    j++;
  }
  if (d !== 0) throw new Error("unbalanced attr " + name);
  const [v] = parseLit(tagSrc, em.index + em[0].length);
  return v;
}

/* Normalize a parsed literal for shipping as plain JSON: identifier refs
   (M.key, drawFoo) become {id:"M.key"}; everything else passes through. */
function normalize(v) {
  if (v === null || typeof v === "number" || typeof v === "boolean") return v;
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(normalize);
  if (typeof v === "object") {
    if (v.__id) return { id: v.__id };
    const out = {};
    for (const k of Object.keys(v)) out[k] = normalize(v[k]);
    return out;
  }
  throw new Error("cannot normalize " + typeof v);
}

module.exports = { parseLit, readString, openTagAt, attr, normalize };
