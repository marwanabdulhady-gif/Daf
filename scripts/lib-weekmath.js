#!/usr/bin/env node
/* ===========================================================================
   lib-weekmath.js — the arithmetic reader used by extract-week-content.js.

   The week files are the printed textbook: every number in them is sacred
   ("do not change the math"). This module never rewrites a number — it only
   READS the ones that are already on the page, so a deck can mark itself,
   draw the right model, and show a worked answer for items whose answer is
   genuinely computable from what is printed.

   Anything it is not sure about comes back as null, and the deck then shows
   the item as a board/whiteboard task instead of inventing an answer.
   =========================================================================== */
"use strict";

/* ---- unicode fraction repair (the decks ban ¼ ½ ¾ glyphs, G4b) ---------- */
const VULGAR = {
  "\u00bc": "1/4", "\u00bd": "1/2", "\u00be": "3/4",
  "\u2150": "1/7", "\u2151": "1/9", "\u2152": "1/10",
  "\u2153": "1/3", "\u2154": "2/3",
  "\u2155": "1/5", "\u2156": "2/5", "\u2157": "3/5", "\u2158": "4/5",
  "\u2159": "1/6", "\u215a": "5/6",
  "\u215b": "1/8", "\u215c": "3/8", "\u215d": "5/8", "\u215e": "7/8",
  "\u215f": "1/", "\u2189": "0/3"
};
const SUPER = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5",
  "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
const SUB = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
  "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };

/* the superscript digits are split across two blocks: ¹²³ live in Latin-1,
   ⁰⁴-⁹ in Superscripts and Subscripts — a [⁰-⁹] class misses the first three */
const SUP_C = "\\u00b9\\u00b2\\u00b3\\u2070\\u2074-\\u2079";
const SUB_C = "\\u2080-\\u2089";

/* Turn "¹⁰⁄₁₂", "⅚", "3/8" and "2 3/5" into the plain "n/d" the decks print. */
function flatFractions(s) {
  let out = String(s == null ? "" : s);
  /* stacked super/subscript fraction: ¹⁰⁄₁₂ or ¹⁰/₁₂ → 10/12 */
  out = out.replace(new RegExp("[" + SUP_C + "]+[\u2044\/]\s*[" + SUB_C + "]+", "g"), (m) => {
    const parts = m.split(/[\u2044\/]/);
    const n = [...parts[0]].map((c) => SUPER[c]).join("");
    const d = [...parts[1]].map((c) => SUB[c]).join("");
    return n + "/" + d;
  });
  /* a vulgar fraction after a digit is a mixed number — keep the gap, or
     "2½" would silently become 21/2 */
  out = out.replace(/([0-9])?([\u00bc\u00bd\u00be\u2150-\u215f\u2189])/g,
    (m, lead, ch) => (VULGAR[ch] == null ? m : (lead ? lead + " " : "") + VULGAR[ch]));
  /* a bare run of superiors over a run of subscripts, written with a slash */
  out = out.replace(new RegExp("[" + SUP_C + "]+(?=\s*[\/]\s*[" + SUB_C + "]+)", "g"), (m) => [...m].map((c) => SUPER[c]).join(""));
  out = out.replace(new RegExp("(?<=[\\/\\s]|^)[" + SUB_C + "]+", "g"), (m) =>
    new RegExp("^[" + SUB_C + "]+$").test(m) ? [...m].map((c) => SUB[c]).join("") : m);
  return out;
}

/* ---- number forms -------------------------------------------------------- */
const PLACES = ["ones", "tens", "hundreds", "thousands", "ten thousands",
  "hundred thousands", "millions"];
const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven",
  "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
  "eighty", "ninety"];

function under1000(n) {
  const out = [];
  if (n >= 100) { out.push(ONES[Math.floor(n / 100)] + " hundred"); n %= 100; }
  if (n >= 20) { out.push(TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "")); }
  else if (n > 0) out.push(ONES[n]);
  return out.join(" ").trim();
}

function numberName(n) {
  n = Math.trunc(n);
  if (n === 0) return "zero";
  const scales = [[1e9, "billion"], [1e6, "million"], [1e3, "thousand"], [1, ""]];
  const parts = [];
  for (const [v, name] of scales) {
    const c = Math.floor(n / v);
    if (!c) continue;
    n %= v;
    parts.push((name ? under1000(c) + " " + name : under1000(c)).trim());
  }
  let s = parts.join(", ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function expandedForm(n, opts) {
  const joiner = (opts && opts.joiner) || " + ";
  const s = String(Math.trunc(n));
  const out = [];
  for (let i = 0; i < s.length; i++) {
    const d = +s[i];
    if (!d) continue;
    out.push(group(d + "0".repeat(s.length - i - 1)));
  }
  return out.join(joiner);
}

function group(n) {
  return String(Math.trunc(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function roundTo(n, place) {
  const p = typeof place === "number" ? place : PLACE_VALUE[place];
  if (!p) return null;
  const down = Math.floor(n / p) * p;
  const up = down + p;
  return (n - down) >= (up - n) ? up : down;
}

const PLACE_VALUE = {
  ones: 1, ten: 10, tens: 10, hundred: 100, hundreds: 100,
  thousand: 1e3, thousands: 1e3, "ten thousands": 1e4, "hundred thousands": 1e5,
  million: 1e6, millions: 1e6
};

/* ---- rationals: fractions and decimals live side by side ----------------- */
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }
function R(num, den) {
  if (den === 0) return null;
  if (Number.isInteger(num) && Number.isInteger(den)) {
    const g = gcd(num, den); num = num / g; den = den / g;
  } else { return { v: num / den, n: null, d: null }; }
  if (den < 0) { num = -num; den = -den; }
  return { n: num, d: den, v: num / den };
}
const add = (a, b) => (a.d != null && b.d != null) ? R(a.n * b.d + b.n * a.d, a.d * b.d) : R(a.v + b.v, 1);
const sub = (a, b) => (a.d != null && b.d != null) ? R(a.n * b.d - b.n * a.d, a.d * b.d) : R(a.v - b.v, 1);
const mul = (a, b) => (a.d != null && b.d != null) ? R(a.n * b.n, a.d * b.d) : R(a.v * b.v, 1);
const div = (a, b) => (a.d != null && b.d != null) ? (b.n === 0 ? null : R(a.n * b.d, a.d * b.n)) : R(a.v / b.v, 1);

function fmtR(r, opts) {
  if (!r) return null;
  const style = opts && opts.style;
  if (r.d === null || style === "dec") {
    const v = Math.round(r.v * 1e6) / 1e6;
    return String(v).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }
  if (r.d === 1) return group(r.n);
  const whole = Math.trunc(r.n / r.d);
  const rem = Math.abs(r.n) % r.d;
  if (whole !== 0 && style !== "improper") return whole + " " + rem + "/" + r.d;
  return (r.n < 0 ? "-" : "") + Math.abs(r.n) + "/" + r.d;
}

/* ---- the tiny expression reader ------------------------------------------ */
/* Numbers: 7,320 · 0.45 · 3/8 · 2 3/5 · 18 ÷ 2. Operators + − - × * ÷ /. */
function tokenize(src) {
  const s = flatFractions(src).replace(/[’']/g, "").replace(/[−–—]/g, "-")
    .replace(/\u00d7/g, "*").replace(/\u00f7/g, "/").replace(/,/g, "");
  const toks = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if ("+-*/()".indexOf(c) >= 0) { toks.push({ t: c }); i++; continue; }
    const m = s.slice(i).match(/^\d+(?:\.\d+)?/);
    if (m) {
      let j = i + m[0].length;
      /* a fraction right after an integer is a mixed number: 2 3/5 */
      const frac = s.slice(j).match(/^\s*(\d+)\s*\/\s*(\d+)/);
      if (frac && /^\d+$/.test(m[0])) {
        toks.push({ t: "num", v: R(+m[0] * +frac[1] + +frac[2], +frac[2]), text: m[0] + " " + frac[1] + "/" + frac[2] });
        i = j + frac[0].length; continue;
      }
      const simple = s.slice(j).match(/^\/(\d+)/);
      if (simple) { toks.push({ t: "num", v: R(+m[0], +simple[1]), text: m[0] + "/" + simple[1] }); i = j + simple[0].length; continue; }
      toks.push({ t: "num", v: decimal(m[0]), text: m[0] });
      i += m[0].length; continue;
    }
    i++; /* skip prose — the caller only feeds us maths */
  }
  return toks;
}
function decimal(s) {
  if (s.indexOf(".") < 0) return R(+s, 1);
  const den = Math.pow(10, s.split(".")[1].length);
  return R(Math.round(parseFloat(s) * den), den);
}

function evalToks(toks) {
  let pos = 0;
  const peek = () => toks[pos];
  const eat = (t) => { if (peek() && peek().t === t) { pos++; return true; } return false; };
  function expr() {
    let v = term();
    while (peek() && (peek().t === "+" || peek().t === "-")) {
      const op = peek().t; pos++;
      const b = term();
      if (v == null || b == null) return null;
      v = op === "+" ? add(v, b) : sub(v, b);
    }
    return v;
  }
  function term() {
    let v = factor();
    while (peek() && (peek().t === "*" || peek().t === "/")) {
      const op = peek().t; pos++;
      const b = factor();
      if (v == null || b == null) return null;
      v = op === "*" ? mul(v, b) : div(v, b);
    }
    return v;
  }
  function factor() {
    if (eat("(")) { const v = expr(); eat(")"); return v; }
    const t = peek();
    if (!t || t.t !== "num") return null;
    pos++;
    return t.v;
  }
  return expr();
}

/* Read a whole-number or fractional expression out of prose. Returns null
   unless the maths is the entire item (so we never answer a different
   question than the one that is printed). */
function readExpr(text) {
  const s = flatFractions(String(text || ""))
    .replace(/[−–—]/g, "-").replace(/[\u00d7*]/g, "\u00d7").replace(/[\u00f7/]/g, "\u00f7");
  const stripped = s.replace(/\([^)]*\)/g, "  ");
  const onlyMath = /^[\s\d.,\u00d7\u00f7+\-()\u00bd\/]*$/;
  const hasOp = /[\u00d7\u00f7]/.test(s) || /[\d\s)\.]\s*[+\-]\s*[\d(]/.test(s);
  if (!onlyMath.test(stripped.replace(/[+\-]/g, "")) || !hasOp) return null;
  const clean = s.replace(/[,\u00a0]/g, "").replace(/\u00bd/g, "1/2");
  if (!/[\d]/.test(clean)) return null;
  const toks = tokenize(clean);
  if (!toks.length) return null;
  const nums = toks.filter((t) => t.t === "num").length;
  if (nums < 2) return null;
  const r = evalToks(toks);
  if (!r) return null;
  return { value: r, expression: clean.replace(/\u00d7/g, " \u00d7 ").replace(/\u00f7/g, " \u00f7 ").replace(/\s+/g, " ").trim() };
}

/* ---- unit tables (printed equivalence, exactly as the book gives them) --- */
const LEN_FT = { inch: 1, in: 1, inches: 1, "in.": 1, foot: 12, feet: 12, ft: 12, "ft.": 12,
  yard: 36, yards: 36, yd: 36, "yd.": 36, mile: 63360, miles: 63360, mi: 63360, "mi.": 63360 };
const CAP = { cup: 1, cups: 1, "c.": 1, pint: 2, pints: 2, pt: 2, "pt.": 2, quart: 4, quarts: 4, qt: 4, "qt.": 4,
  gallon: 16, gallons: 16, gal: 16, "gal.": 16 };
const WT = { ounce: 1, ounces: 1, oz: 1, "oz.": 1, pound: 16, pounds: 16, lb: 16, "lb.": 16,
  ton: 32000, tons: 32000 };
const MET_L = { millimeter: 1, millimeters: 1, mm: 1, centimeter: 10, centimeters: 10, cm: 10,
  meter: 1000, meters: 1000, m: 1000, kilometer: 1e6, kilometers: 1e6, km: 1e6 };
const MET_C = { milliliter: 1, milliliters: 1, ml: 1, mL: 1, liter: 1000, liters: 1000, l: 1000, L: 1000,
  kiloliter: 1e6, kiloliters: 1e6, kl: 1e6, kL: 1e6 };
const MET_M = { milligram: 1, milligrams: 1, mg: 1, gram: 1000, grams: 1000, g: 1000,
  kilogram: 1e6, kilograms: 1e6, kg: 1e6 };

const UNIT_FAMILIES = [
  { head: "length (customary)", table: LEN_FT }, { head: "capacity", table: CAP },
  { head: "weight", table: WT }, { head: "length (metric)", table: MET_L },
  { head: "capacity (metric)", table: MET_C }, { head: "mass (metric)", table: MET_M }
];

function convert(text) {
  const s = flatFractions(String(text || ""));
  const m = s.match(/(-?[\d.,]+)\s*([A-Za-z.]+)\s*(?:=|is|to|as)\s*(-?[\d.,]*\s*_+|\?\s*)?\s*([A-Za-z.]+)?/i);
  if (!m) return null;
  const amount = parseFloat(m[1].replace(/,/g, ""));
  if (!isFinite(amount)) return null;
  const from = m[2].toLowerCase().replace(/\.$/, ""), to = (m[4] || "").toLowerCase().replace(/\.$/, "");
  for (const fam of UNIT_FAMILIES) {
    const t = fam.table;
    if (t[from] == null) continue;
    if (!to) return null;
    if (t[to] == null) continue;
    const v = amount * t[from] / t[to];
    return { value: v, from: m[2], to: m[4], family: fam.head, exact: true };
  }
  return null;
}

/* ---- clock times --------------------------------------------------------- */
function clockToMin(label) {
  const m = String(label).match(/(\d{1,2})\s*:\s*(\d{2})/);
  if (!m) return null;
  return (+m[1] % 12) * 60 + +m[2];
}
function minToClock(mins, suffix) {
  let h = Math.floor(((mins % 720) + 720) % 720 / 60);
  const mm = ((mins % 60) + 60) % 60;
  const ampm = ((mins % 720) + 720) % 720 >= 720 ? "" : "";
  return ((h % 12) || 12) + ":" + String(mm).padStart(2, "0") + (suffix ? " " + suffix : "") + (ampm || "");
}

module.exports = {
  VULGAR, SUPER, SUB, flatFractions, numberName, expandedForm, group, roundTo,
  PLACE_VALUE, R, add, sub, mul, div, fmtR, decimal, tokenize, evalToks, readExpr,
  convert, clockToMin, minToClock, LEN_FT, CAP, WT, MET_L, MET_C, MET_M, UNIT_FAMILIES
};
