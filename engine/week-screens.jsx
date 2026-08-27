/* ===========================================================================
   THE WEEK LAYER · the printed page, taught

   Everything here comes from ONE source: the week file that the department
   wrote (weeks/week-02.md, weeks/S2 week-01 (7).md …). scripts/
   extract-week-content.js slices that page into blocks, items and figures,
   scripts/stamp-weeks.js stamps the slice for this lesson into the deck as
   window.DAF_WEEK, and this file renders it as real slides:

     week:open      the week, the "I can…", the Essential Question, Solve & Share
     week:bridge    the Visual Learning Bridge, with its own model on the board
     week:example   the Another Example, worked
     week:practice  Do You Understand? · Do You Know How? · Independent Practice
     week:problem   the Problem Solving / HOT page, as printed
     week:assess    Assessment Practice, self-marked
     week:close     homework, vocabulary, the week's STEM page, muhasabah

   The rule the deck obeys is the rule on top of every week file: every number,
   example and problem stays exactly as printed. Where the printed text makes
   an answer computable the deck marks itself in seconds; where it does not,
   the item goes to the board — the deck never invents an answer.

   With no window.DAF_WEEK (the plain html/ decks, the chapter copies) every
   one of these functions returns null and the lesson runs exactly as before.
   ========================================================================== */

const WEEK = (typeof window !== "undefined" && window.DAF_WEEK) || null;
const WEEK_L = WEEK && WEEK.lessons ? (WEEK.lessons[LESSON.code] || null) : null;

/* ---- inline text: bold, italics, code, and stacked fractions ------------- */
function wkFracNodes(str, keyBase) {
  const out = [];
  const re = /(\d+)\s*\/\s*(\d+)/g;
  let last = 0, m, n = 0;
  while ((m = re.exec(str))) {
    if (m.index > last) out.push(str.slice(last, m.index));
    out.push(<span key={(keyBase || "f") + (n++)} className="wk-frac">
      <i>{m[1]}</i><em>/</em><b>{m[2]}</b>
    </span>);
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push(str.slice(last));
  return out.length ? out : [str];
}
function WkRuns({ runs, className }) {
  const list = runs && runs.length ? runs : [{ t: "t", v: "" }];
  return (
    <span className={className || "wk-runs"}>
      {list.map((r, i) => {
        const v = String(r.v || "");
        if (r.t === "b") return <strong key={i}>{wkFracNodes(v, "b" + i)}</strong>;
        if (r.t === "i") return <em key={i}>{wkFracNodes(v, "i" + i)}</em>;
        if (r.t === "c") return <code key={i}>{v}</code>;
        return <span key={i}>{wkFracNodes(v, "t" + i)}</span>;
      })}
    </span>
  );
}
/* a math-looking line gets the mono-gold treatment, not a paragraph */
function wkIsMathLine(s) {
  return /^[\s\d.,;=<>+\u2212\u00d7\u00f7()\u00bd\/%\u00b0-]+$/.test(String(s || "").replace(/[a-z]/gi, ""))
    && /\d/.test(String(s || ""));
}

const WkTable = ({ head, rows }) => (
  <div className="wk-table-wrap scroll-y">
    <table className="wk-table">
      {head && head.length > 0 && <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>}
      <tbody>
        {(rows || []).map((r, i) => (
          <tr key={i}>{(r || []).map((c, j) => <td key={j}>{wkFracNodes(String(c == null ? "" : c), i + "-" + j)}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

function WkBlock({ b }) {
  if (!b) return null;
  switch (b.t) {
    case "p":
      return wkIsMathLine(b.text)
        ? <div className="wk-math"><WkRuns runs={b.runs} /></div>
        : <p className="wk-p"><WkRuns runs={b.runs} /></p>;
    case "list":
      return (
        <ul className="wk-list">
          {(b.items || []).map((it, i) => <li key={i}><WkRuns runs={it.runs} /></li>)}
        </ul>
      );
    case "nums":
      return (
        <ol className="wk-list">
          {(b.items || []).map((it, i) => <li key={i}><WkRuns runs={it.runs} /></li>)}
        </ol>
      );
    case "steps":
      return (
        <div className="wk-steps">
          {(b.items || []).map((it, i) => (
            <div key={i} className="wk-step">
              <span className="wk-step-tag">{it.label}</span>
              <span><WkRuns runs={it.runs} /></span>
            </div>
          ))}
        </div>
      );
    case "kv":
      return (
        <div className={"wk-kv" + (wkIsMathLine(b.text) ? " is-math" : "")}>
          <b>{b.label}</b>
          <span>{wkIsMathLine(b.text)
            ? <MathLine text={b.text} />
            : <WkRuns runs={b.runs} />}</span>
        </div>
      );
    case "code":
      return <pre className="wk-code">{(b.lines || []).join("\n")}</pre>;
    case "table":
      return (
        <div className="wk-tableblock">
          <WkTable head={b.head} rows={b.rows} />
          {b.fig && <WeekFig fig={b.fig} height={168} />}
        </div>
      );
    default:
      return null;
  }
}
const MathLine = ({ text }) => <span className="wk-eq"><WkRuns runs={[{ t: "t", v: String(text || "") }]} /></span>;

const WkBlocks = ({ blocks, max }) => {
  const list = (blocks || []).filter(Boolean).slice(0, max || 99);
  return (
    <div className="wk-blocks">
      {list.map((b, i) => <WkBlock key={i} b={b} />)}
    </div>
  );
};

/* ==========================================================================
   THE MODEL COMPILER · a printed item becomes a live drawing
   ========================================================================== */
function wkPanel(ctx, W, H, title, t) {
  D.rr(ctx, 0, 0, W, H, 12);
  ctx.fillStyle = "#0B1F24"; ctx.fill();
  if (title) D.txt(ctx, title, W / 2, 18, { size: 12, col: "rgba(234,244,242,.62)", font: "marker", alpha: D.at(t, 0, 120) });
}
function wkNote(ctx, W, H, s, col, prog) {
  D.txt(ctx, String(s), W / 2, H - 14, { size: 13.5, col: col || "#C9A227", font: "marker", alpha: prog });
}
function wkGcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = b; b = a % b; a = t; } return a || 1; }
function wkLcm(a, b) { return (a * b) / wkGcd(a, b); }
/* split a factor into its place values: 700 → 700 · 13 → 10 + 3 · 25 → 20 + 5 */
function wkParts(n) {
  const s = String(Math.trunc(Math.abs(+n || 0)));
  const out = [];
  for (let i = 0; i < s.length; i++) { const d = +s[i]; if (d) out.push(d * Math.pow(10, s.length - 1 - i)); }
  return out.length ? out : [0];
}
function wkExpanded(n) {
  const s = String(Math.trunc(n)); const out = [];
  for (let i = 0; i < s.length; i++) { const d = +s[i]; if (d) out.push(d + "0".repeat(s.length - i - 1)); }
  return out.map((v) => Number(v).toLocaleString("en-US")).join(" + ");
}
function wkChunks(dividend, divisor) {
  const chunks = []; let rem = dividend;
  const steps = [1000, 100, 10, 1];
  for (const p of steps) {
    while (rem - divisor * p >= 0) { rem -= divisor * p; chunks.push({ q: p, label: p + " groups of " + divisor }); }
    if (chunks.length > 6) break;
  }
  if (rem > 0 && rem < divisor) chunks.push({ q: 0, label: "remainder " + rem });
  if (!chunks.length) chunks.push({ q: 0, label: "start with a chunk you know" });
  return chunks;
}

function drawWeekFig(fig) {
  return (ctx, W, H, frame) => {
    if (!fig) { wkPanel(ctx, W, H, null, frame); return; }
    const CY = 700, f = frame % CY;
    const p = D.at(f, 0, 200);
    switch (fig.kind) {

      /* two numbers, one box — the comparison made visible */
      case "compare": {
        wkPanel(ctx, W, H, "compare the values, place by place", frame);
        const a = +fig.a, b = +fig.b;
        const max = Math.max(Math.abs(a), Math.abs(b), 1);
        const bw = (W - 190) / 2, y = H / 2 - 14;
        [[a, 40, "#2D70B3"], [b, 40 + bw + 110, "#FA7E19"]].forEach(([v, x, col], i) => {
          const w = Math.max(16, (Math.abs(v) / max) * bw);
          const ap = D.at(f, 40 + i * 90, 190 + i * 90);
          ctx.save(); ctx.globalAlpha = ap * 0.75;
          D.rr(ctx, x, y, w, 34, 7); ctx.fillStyle = col; ctx.fill();
          ctx.restore();
          D.rr(ctx, x, y, w, 34, 7); ctx.strokeStyle = "rgba(234,244,242,.6)"; ctx.lineWidth = 1.6; ctx.stroke();
          D.txt(ctx, Number(v).toLocaleString("en-US"), x + w / 2, y + 52, { size: 17, col: "#EAF4F2", font: "marker", alpha: ap });
        });
        const sym = a > b ? ">" : a < b ? "<" : "=";
        D.txt(ctx, sym, W / 2, y + 16, { size: 30, col: "#C9A227", font: "marker", alpha: D.at(f, 220, 320) });
        wkNote(ctx, W, H, a === b ? "equal — the same value, two spellings"
          : (a > b ? Number(a).toLocaleString("en-US") : Number(b).toLocaleString("en-US")) + " is greater; the difference is "
            + Math.abs(a - b).toLocaleString("en-US"), "#34D399", D.at(f, 300, 420));
        return;
      }

      /* place value: the chart, then the number read apart */
      case "pv": {
        wkPanel(ctx, W, H, "the place decides the value", frame);
        const digits = String(fig.digits || "");
        D.pvChart(ctx, { x: 26, y: 34, w: W - 52, digits, slots: Math.max(6, Math.ceil(digits.length / 3) * 3), prog: p, t: frame });
        const n = +digits;
        if (!isNaN(n)) {
          const pe = D.at(f, 260, 400);
          D.txt(ctx, wkExpanded(n), W / 2, H - 34, { size: 15, col: "#34D399", font: "marker", alpha: pe });
          wkNote(ctx, W, H, "expanded form is the chart written as a sum", "#C9A227", D.at(f, 360, 480));
        }
        return;
      }

      /* rounding on the number line */
      case "round": {
        wkPanel(ctx, W, H, "which end is it closer to?", frame);
        const lo = +fig.lo, hi = +fig.hi, v = +fig.value;
        D.roundLine(ctx, { x: 46, y: H / 2 - 6, w: W - 92, lo, hi, value: v, prog: p });
        const mid = (lo + hi) / 2;
        const up = v - mid >= 0;
        const pa = D.at(f, 300, 430);
        D.marker(ctx, [[46 + (W - 92) * ((v - lo) / (hi - lo)), H / 2 + 16],
                      [46 + (W - 92) * ((( up ? hi : lo) - lo) / (hi - lo)), H / 2 + 44]], pa, "rgba(201,162,39,.8)", 2);
        wkNote(ctx, W, H, Number(v).toLocaleString("en-US") + " → " + Number(up ? hi : lo).toLocaleString("en-US")
          + "  ·  " + (v - mid >= 0 ? "at or past the halfway " + mid.toLocaleString("en-US") + ", round up"
            : "below the halfway " + mid.toLocaleString("en-US") + ", round down"), "#34D399", pa);
        return;
      }

      /* the standard algorithm, in columns */
      case "col": {
        wkPanel(ctx, W, H, fig.op === "-" ? "subtract — regroup where you must" : "add — ones first, then carry", frame);
        const a = Number(fig.a), b = Number(fig.b);
        const cw = W > 380 ? 46 : 34;
        const wid = (String(a).length + 1) * cw + 20;
        D.columnOp(ctx, { x: W / 2 - wid / 2, y: 30, w: wid, a, b, op: fig.op || "+", prog: D.at(f, 0, 420), t: frame, cw });
        const r = fig.op === "-" ? a - b : a + b;
        wkNote(ctx, W, H, (fig.op === "-" ? "difference " : "sum ") + (Math.round(r * 1000) / 1000).toLocaleString("en-US"),
          "#34D399", D.at(f, 430, 540));
        return;
      }

      /* multiplication as an area model with the partial products */
      case "mult": {
        wkPanel(ctx, W, H, "break the factor apart, multiply each piece", frame);
        const a = +fig.a, b = +fig.b;
        const cols = wkParts(b).map((v) => ({ v }));
        D.areaModel(ctx, { x: 60, y: 44, w: W - 100, h: Math.min(96, H - 110), rowV: a, cols, prog: p, showSum: true });
        wkNote(ctx, W, H, a + " \u00d7 " + b + " = " + (a * b).toLocaleString("en-US"), "#34D399", D.at(f, 380, 480));
        return;
      }

      /* division as partial quotients */
      case "div": {
        wkPanel(ctx, W, H, "take out chunks you can do in your head", frame);
        const a = +fig.a, b = +fig.b;
        const chunks = wkChunks(a, b);
        const shown = Math.max(1, Math.floor(chunks.length * Math.min(1, f / 420) + 0.0001));
        D.partialQuotients(ctx, { dividend: a, divisor: b, chunks, shown, x: W / 2 - 90, y: 34, w: Math.min(210, W - 150), lh: 26 });
        const q = Math.floor(a / b), r = a - q * b;
        wkNote(ctx, W, H, a + " \u00f7 " + b + " = " + q + (r ? " R " + r : " (no remainder)"), "#34D399", D.at(f, 420, 520));
        return;
      }

      /* fractions as bars over the same whole */
      case "frac": {
        wkPanel(ctx, W, H, "the same whole, cut differently", frame);
        const fr = (fig.fracs || []).slice(0, 3);
        const bh = Math.min(40, (H - 70) / Math.max(1, fr.length));
        fr.forEach((fr1, i) => {
          const a = D.at(f, i * 90, i * 90 + 200);
          D.fracBar(ctx, { x: 40, y: 32 + i * (bh + 14), w: W - 80, h: bh, den: fr1.d, num: fr1.n, prog: a,
            col: ["#2D70B3", "#FA7E19", "#388C46"][i % 3], label: false });
          D.txt(ctx, fr1.n + "/" + fr1.d, W - 22, 32 + i * (bh + 14) + bh / 2,
            { size: 15, col: "#EAF4F2", font: "marker", alpha: a, align: "left" });
        });
        if (fr.length === 2) {
          const eq = fr[0].n * fr[1].d === fr[1].n * fr[0].d;
          wkNote(ctx, W, H, fr[0].n + "/" + fr[0].d + (eq ? " = " : " \u2260 ") + fr[1].n + "/" + fr[1].d
            + (eq ? " — same amount, different pieces" : " — different amounts"), "#34D399", D.at(f, 300, 420));
        } else {
          wkNote(ctx, W, H, "numerator counts the pieces · denominator cuts the whole", "#C9A227", D.at(f, 300, 420));
        }
        return;
      }

      /* fractions on a number line */
      case "fracline": {
        wkPanel(ctx, W, H, "the same point on the line, two names", frame);
        const fr = (fig.fracs || []).slice(0, 4);
        let den = fr.length ? fr[0].d : 4;
        fr.forEach((x) => { den = wkLcm(den, x.d); });
        den = Math.min(den, 24);
        D.fracLine(ctx, { x: 44, y: H / 2, w: W - 88, den, whole: 1, prog: p, labelAll: true,
          marks: fr.map((x) => ({ n: Math.round(x.n * den / x.d), den, col: "#34D399" })) });
        wkNote(ctx, W, H, fr.map((x) => x.n + "/" + x.d).join("  ·  "), "#C9A227", D.at(f, 320, 440));
        return;
      }

      /* mixed numbers: the same pieces, regrouped */
      case "mixed": {
        wkPanel(ctx, W, H, "improper and mixed — the same amount", frame);
        const fr = (fig.fracs || [])[0] || { n: 3, d: 4 };
        const wholes = Math.max(1, Math.ceil(fr.n / fr.d));
        D.mixedBar(ctx, { x: 44, y: 38, w: W - 88, wholes, den: fr.d, num: fr.n, h: Math.min(52, H - 100), prog: p, col: "#388C46", label: false });
        const w = Math.floor(fr.n / fr.d), rem = fr.n - w * fr.d;
        wkNote(ctx, W, H, fr.n + "/" + fr.d + " = " + (w ? w + " " : "") + rem + "/" + fr.d, "#34D399", D.at(f, 300, 420));
        return;
      }

      /* decimals on the hundredths grid */
      case "dec": {
        wkPanel(ctx, W, H, "tenths and hundredths, shaded", frame);
        const v = +fig.value;
        const hundredths = Math.round((v % 1) * 100);
        D.decGrid(ctx, { x: W / 2 - 78, y: 26, s: Math.min(140, H - 66), tenths: hundredths % 10 !== 0 ? false : true,
          shaded: hundredths || 100, prog: p, col: "#6042A6",
          label: String(v), sub: (Math.floor(v) ? Math.floor(v) + " whole" : "") });
        wkNote(ctx, W, H, v + " = " + hundredths + "/100" + (Math.floor(v) ? " plus " + Math.floor(v) + " whole(s)" : ""),
          "#34D399", D.at(f, 300, 420));
        return;
      }

      /* a strip diagram for anything part-to-whole, money included */
      case "strip": {
        wkPanel(ctx, W, H, "one strip, the parts inside it", frame);
        const parts = (fig.parts || []).map((x, i) => ({
          v: Math.max(0.0001, +x.v || 0), label: String(x.label == null ? x.v : x.label),
          col: ["#FA7E19", "#2D70B3", "#388C46", "#6042A6", "#C74440"][i % 5]
        }));
        if (!parts.length) { wkNote(ctx, W, H, "draw the parts, then the question mark", "#C9A227", 1); return; }
        parts[parts.length - 1] = Object.assign({}, parts[parts.length - 1], { label: parts[parts.length - 1].label + "" });
        const total = parts.reduce((s, x) => s + x.v, 0);
        D.strip(ctx, { x: 40, y: H / 2 - 8, w: W - 80, h: 46, parts, prog: p, total: fig.total != null ? fig.total : Math.round(total * 100) / 100 });
        wkNote(ctx, W, H, fig.note || ("the parts add to " + (Math.round(total * 100) / 100).toLocaleString("en-US")), "#C9A227", D.at(f, 300, 420));
        return;
      }

      /* the quantities of a word problem, lined up against each other */
      case "bars": {
        wkPanel(ctx, W, H, "the quantities in the problem", frame);
        const nums = (fig.nums || []).slice(0, 5).map(Number).filter((x) => isFinite(x));
        const max = Math.max.apply(null, nums.concat([1]));
        const bh = Math.min(30, (H - 60) / Math.max(1, nums.length));
        nums.forEach((v, i) => {
          const a = D.at(f, i * 80, i * 80 + 190);
          const w = Math.max(10, (v / max) * (W - 190));
          D.rr(ctx, 40, 30 + i * (bh + 10), w, bh, 6);
          ctx.save(); ctx.globalAlpha = a * 0.72;
          ctx.fillStyle = ["#2D70B3", "#FA7E19", "#388C46", "#6042A6", "#C74440"][i % 5]; ctx.fill();
          ctx.restore();
          D.rr(ctx, 40, 30 + i * (bh + 10), w, bh, 6);
          ctx.strokeStyle = "rgba(234,244,242,.55)"; ctx.lineWidth = 1.5; ctx.stroke();
          D.txt(ctx, v.toLocaleString("en-US"), 46 + w, 30 + i * (bh + 10) + bh / 2,
            { size: 14, col: "#EAF4F2", font: "marker", alpha: a, align: "left" });
        });
        wkNote(ctx, W, H, "compare the longest bar with the shortest, then decide the operation",
          "#C9A227", D.at(f, nums.length * 80 + 120, nums.length * 80 + 240));
        return;
      }

      /* a clock, for elapsed-time and time problems */
      case "clock": {
        wkPanel(ctx, W, H, "the hour hand and the minute hand", frame);
        D.clock(ctx, { cx: W / 2 - (fig.to ? 78 : 0), cy: H / 2 + 4, r: Math.min(64, H / 2 - 22),
          h: +fig.h || 0, m: +fig.m || 0, prog: p, label: (fig.h % 12 || 12) + ":" + String(fig.m || 0).padStart(2, "0") });
        if (fig.to) {
          D.clock(ctx, { cx: W / 2 + 86, cy: H / 2 + 4, r: Math.min(56, H / 2 - 26),
            h: +fig.to.h || 0, m: +fig.to.m || 0, prog: D.at(f, 160, 380),
            label: (fig.to.h % 12 || 12) + ":" + String(fig.to.m || 0).padStart(2, "0"),
            hourCol: "rgba(201,162,39,.55)", minCol: "#388C46" });
          D.marker(ctx, [[W / 2 - 6, H / 2 - 34], [W / 2 + 30, H / 2 - 44]], D.at(f, 260, 420), "#34D399", 2.2);
        }
        wkNote(ctx, W, H, fig.note || "count the minutes in hops, not one by one", "#C9A227", D.at(f, 340, 460));
        return;
      }

      /* angles */
      case "angle": {
        wkPanel(ctx, W, H, "the opening, not the length of the rays", frame);
        const deg = Math.max(1, Math.min(360, +fig.deg || 45));
        D.angleFig(ctx, { cx: W / 2 - 30, cy: H - 34, r: Math.min(104, H - 58), start: 0, deg,
          prog: p, col: "#2D70B3", arcCol: "#C9A227", label: deg + "\u00b0", square: deg === 90, protractor: !!fig.protractor });
        const kind = deg < 90 ? "acute" : deg === 90 ? "right" : deg < 180 ? "obtuse" : deg === 180 ? "straight" : "reflex";
        wkNote(ctx, W, H, deg + "\u00b0 \u2014 " + (/^[aeiou]/.test(kind) ? "an " : "a ") + kind + " angle"
          + (deg === 90 ? "" : " (" + Math.abs(90 - deg) + "\u00b0 from a right angle)"), "#34D399", D.at(f, 280, 400));
        return;
      }

      /* points, lines, rays, segments, parallel and perpendicular */
      case "lines": {
        wkPanel(ctx, W, H, "name the figure by its ends", frame);
        D.lineFig(ctx, { x: 46, y: H / 2 - 24, w: W - 92, h: 46, kind: fig.lineKind || "segment",
          prog: p, col: "#2D70B3", label: fig.lineKind || "segment" });
        const ends = { segment: "2 endpoints", ray: "1 endpoint, one direction", line: "no endpoints, both directions",
          parallel: "same distance apart, never meeting", perpendicular: "meet at a right angle" };
        wkNote(ctx, W, H, (fig.lineKind || "segment") + " — " + (ends[fig.lineKind] || ends.segment), "#C9A227", D.at(f, 300, 420));
        return;
      }

      /* shapes for classification and symmetry */
      case "shape": case "symmetry": {
        wkPanel(ctx, W, H, fig.kind === "symmetry" ? "does the fold land on itself?" : "count the sides, look at the angles", frame);
        const cx = W / 2, cy = H / 2, r = Math.min(64, H / 2 - 20);
        const name = String(fig.name || "shape").toLowerCase();
        let pts, right = [];
        if (/square|symmetr/.test(name) || fig.kind === "symmetry") {
          pts = [[cx - r, cy - r], [cx + r, cy - r], [cx + r, cy + r], [cx - r, cy + r]]; right = [0, 1, 2, 3];
        } else if (/rectangle/.test(name)) {
          pts = [[cx - r * 1.4, cy - r * 0.8], [cx + r * 1.4, cy - r * 0.8], [cx + r * 1.4, cy + r * 0.8], [cx - r * 1.4, cy + r * 0.8]]; right = [0, 1];
        } else if (/rhombus|parallelogram/.test(name)) {
          pts = [[cx - r * 0.4, cy - r], [cx + r * 1.2, cy - r], [cx + r * 0.4, cy + r], [cx - r * 1.2, cy + r]];
        } else if (/trapezoid/.test(name)) {
          pts = [[cx - r * 1.3, cy + r * 0.8], [cx + r * 1.3, cy + r * 0.8], [cx + r * 0.5, cy - r * 0.8], [cx - r * 0.6, cy - r * 0.8]];
        } else if (/pentagon/.test(name)) {
          pts = [0, 1, 2, 3, 4].map((i) => [cx + Math.sin(i * 1.2566) * r, cy - Math.cos(i * 1.2566) * r]);
        } else if (/hexagon/.test(name)) {
          pts = [0, 1, 2, 3, 4, 5].map((i) => [cx + Math.sin(i * 1.0472) * r, cy - Math.cos(i * 1.0472) * r]);
        } else if (/isosceles/.test(name)) {
          pts = [[cx - r, cy + r * 0.8], [cx + r, cy + r * 0.8], [cx, cy - r]];
        } else if (/equilateral/.test(name)) {
          pts = [[cx - r, cy + r * 0.7], [cx + r, cy + r * 0.7], [cx, cy - r]];
        } else if (/right/.test(name)) {
          pts = [[cx - r, cy - r], [cx - r, cy + r], [cx + r, cy + r]]; right = [1];
        } else {
          pts = [[cx - r * 1.1, cy + r * 0.9], [cx + r * 1.1, cy + r * 0.9], [cx + r * 0.2, cy - r]];
        }
        D.polyFig(ctx, { pts, prog: p, col: "#6042A6", rightAngles: right, fill: true,
          mirror: fig.kind === "symmetry" ? "vertical" : undefined });
        wkNote(ctx, W, H, fig.kind === "symmetry" ? "a line of symmetry folds the shape onto itself"
          : (name + " — " + pts.length + " sides"), "#34D399", D.at(f, 300, 430));
        return;
      }

      /* perimeter and area of a rectangle */
      case "rect": {
        wkPanel(ctx, W, H, fig.mode === "perimeter" ? "the fence goes round" : "the grass covers", frame);
        const L = +fig.long || 4, S = +fig.short || 2;
        const maxSide = Math.max(L, S, 1);
        const bw = Math.min(W - 120, 300), scale = bw / maxSide;
        D.rectFig(ctx, { x: W / 2 - (L * scale) / 2, y: 30, w: L * scale, h: Math.min(H - 96, S * scale),
          long: L, short: S, prog: p, mode: fig.mode === "perimeter" ? "perimeter" : "area",
          longLabel: String(L), shortLabel: String(S) });
        wkNote(ctx, W, H, "area = " + L + " \u00d7 " + S + " = " + (L * S).toLocaleString("en-US")
          + "  ·  perimeter = 2 \u00d7 (" + L + " + " + S + ") = " + (2 * (L + S)).toLocaleString("en-US"),
          "#34D399", D.at(f, 320, 440));
        return;
      }

      /* volume with unit cubes */
      case "cube": {
        wkPanel(ctx, W, H, "how many cubes fill it?", frame);
        const L = Math.max(1, Math.round(+fig.L || 3)), Wd = Math.max(1, Math.round(+fig.W || 2)), Hh = Math.max(1, Math.round(+fig.H || 2));
        D.cubePrism(ctx, { x: W / 2 - (L + Wd) * 9, y: H - 26, s: Math.min(20, (H - 60) / (L + Hh + 2)),
          L, W: Wd, H: Hh, prog: p, col: "#2D70B3", lLabel: String(L), wLabel: String(Wd), hLabel: String(Hh) });
        wkNote(ctx, W, H, L + " \u00d7 " + Wd + " \u00d7 " + Hh + " = " + (L * Wd * Hh) + " unit cubes", "#34D399", D.at(f, 320, 440));
        return;
      }

      /* factors and multiples */
      case "factor": {
        wkPanel(ctx, W, H, fig.mode === "multiples" ? "multiples keep adding the same number" : "every rectangle of that many squares", frame);
        const n = Math.max(1, Math.round(+fig.n || 12));
        if (fig.mode === "multiples") {
          const nums = [];
          for (let k = 1; k * n <= 100 && nums.length < 24; k++) nums.push(k * n);
          D.numberGrid(ctx, { n: 100, cols: 10, x: W / 2 - Math.min(W - 60, 320) / 2, y: 30, w: Math.min(W - 60, 320),
            ch: Math.min(20, (H - 60) / 10), sets: [{ nums, col: "#388C46" }] });
          wkNote(ctx, W, H, nums.slice(0, 8).join(", ") + (nums.length > 8 ? " …" : ""), "#C9A227", D.at(f, 340, 460));
        } else {
          const pairs = [];
          for (let a = 1; a * a <= n; a++) if (n % a === 0) pairs.push([a, n / a]);
          D.factorRects(ctx, { n, pairs, active: pairs.length - 1, x: 30, y: 28, w: W - 60, h: H - 78,
            cell: Math.max(5, Math.min(11, Math.floor((W - 80) / (pairs.length * (n + 1))))) });
          wkNote(ctx, W, H, "factors of " + n + ": " + pairs.reduce((acc, pr) => acc.concat([pr[0], pr[1]]), []).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b).join(", "),
            "#34D399", D.at(f, 340, 460));
        }
        return;
      }

      /* patterns and rules */
      case "seq": {
        wkPanel(ctx, W, H, "the rule decides every next term", frame);
        let nums = (fig.nums || []).map(Number).filter((x) => isFinite(x));
        if (nums.length < 3 && fig.rule) {
          nums = [];
          let v = +fig.rule.start;
          for (let i = 0; i < 8; i++) { nums.push(v); v += (fig.rule.op === "-" ? -1 : 1) * (+fig.rule.step || 1); }
        }
        if (nums.length < 2) { wkNote(ctx, W, H, "name the rule first, then extend", "#C9A227", 1); return; }
        const lo = Math.min.apply(null, nums), hi = Math.max.apply(null, nums);
        const xs = W - 90, ys = H - 74;
        const map = D.axes(ctx, { x: 44, y: 26, w: xs, h: ys, xmax: Math.max(6, nums.length + 1),
          ymax: Math.max(1, hi), prog: p, xLabel: "term", yLabel: "value", xStep: 1 });
        D.plotPoints(ctx, map, nums.map((v, i) => [i + 1, v]), D.at(f, 100, 420), "#2D70B3", nums.map(String));
        const d = nums.length > 1 ? nums[1] - nums[0] : 0;
        wkNote(ctx, W, H, "next terms: " + [1, 2, 3].map((k) => nums[nums.length - 1] + d * k).join(", ")
          + (d ? "  ·  the rule is " + (d > 0 ? "add " + d : "subtract " + -d) : ""), "#34D399", D.at(f, 420, 540));
        return;
      }

      /* a line plot made from the printed data */
      case "lineplot": {
        wkPanel(ctx, W, H, "the class data, in fractions of a unit", frame);
        const den = Math.max(1, +fig.den || 8);
        const counts = {};
        let maxIdx = den;
        (fig.counts || []).forEach((c) => {
          const idx = Math.round((+c.at) || 0);
          counts[idx] = (counts[idx] || 0) + (+c.count || 1);
          maxIdx = Math.max(maxIdx, idx);
        });
        D.linePlot(ctx, { x: 50, y: H - 62, w: W - 100, den, max: Math.max(den, maxIdx), counts,
          prog: p, col: "#2D70B3", showCounts: true, axisLabel: fig.axisLabel || "measured to the nearest " + (den > 1 ? "1/" + den : "whole") });
        return;
      }

      /* an input–output table plotted */
      case "plotpoints": {
        wkPanel(ctx, W, H, "the table, then the rule", frame);
        const rows = (fig.rows || []).filter((r) => r && r.length >= 2 && r[0] != null && r[1] != null);
        if (!rows.length) { wkNote(ctx, W, H, "read the table down the columns", "#C9A227", 1); return; }
        const xmax = Math.max.apply(null, rows.map((r) => r[0]).concat([4]));
        const ymax = Math.max.apply(null, rows.map((r) => r[1]).concat([4]));
        const map = D.axes(ctx, { x: 46, y: 24, w: W - 96, h: H - 74, xmax, ymax, prog: p, xStep: 1 });
        D.plotPoints(ctx, map, rows.map((r) => [r[0], r[1]]), D.at(f, 60, 380), "#388C46");
        const d = rows.length > 1 ? rows[1][1] - rows[0][1] : 0;
        wkNote(ctx, W, H, (fig.head ? fig.head.join("  \u2192  ") : "in \u2192 out") + (d ? "  ·  step " + d : ""),
          "#C9A227", D.at(f, 400, 500));
        return;
      }

      /* a plain data table, drawn — the fallback that always has something true to show */
      case "table": {
        wkPanel(ctx, W, H, "read the data across, then down", frame);
        D.table(ctx, { x: 34, y: 26, w: W - 68, rh: 24, head: fig.head || [], rows: fig.rows || [], prog: p });
        return;
      }

      /* measurement equivalence: the same length in two units */
      case "unit": {
        wkPanel(ctx, W, H, "the same length, two units", frame);
        D.unitBar(ctx, { x: 46, y: H / 2 - 34, w: W - 92, h: 30, n: +fig.n || 1, big: fig.big || "foot",
          small: fig.small || "inch", copies: +fig.copies || 1, prog: p, bigCol: "#2D70B3", smallCol: "#FA7E19" });
        wkNote(ctx, W, H, (fig.n || 1) + " " + (fig.big || "foot") + " = " + ((fig.n || 1) * (fig.copies || 12)) + " " + (fig.small || "inch"),
          "#34D399", D.at(f, 320, 440));
        return;
      }

      default: {
        wkPanel(ctx, W, H, null, frame);
        wkNote(ctx, W, H, "model it on the board", "#C9A227", 1);
      }
    }
  };
}

/* the drawing for a figure is cached by its content so <Sketch> is not
   restarted on every render of the same item */
const WK_FIG_CACHE = {};
function wkFigDraw(fig) {
  const key = JSON.stringify(fig);
  if (!WK_FIG_CACHE[key]) WK_FIG_CACHE[key] = drawWeekFig(fig);
  return WK_FIG_CACHE[key];
}
function WeekFig({ fig, height, caption }) {
  if (!fig) return null;
  return (
    <div className="wk-fig">
      <Sketch draw={wkFigDraw(fig)} height={height || 176} />
      {caption && <div className="wk-fig-cap">{caption}</div>}
    </div>
  );
}

/* ==========================================================================
   THE SLIDES
   ========================================================================== */
function WkTag({ children, tone }) {
  if (!children) return null;
  return <span className={"wk-tag" + (tone ? " wk-tag-" + tone : "")}>{children}</span>;
}
function WkSectionHead({ label, title, sub }) {
  return (
    <div className="wk-sec">
      {label && <div className="wk-sec-label"><Icon name="fa-book-open" /> {label}</div>}
      <h3>{title}</h3>
      {sub && <p className="wk-sec-sub"><WkRuns runs={[{ t: "t", v: sub }]} /></p>}
    </div>
  );
}

/* ---- one printed item, with the model and the answer key ----------------- */
function WkItem({ it, open, onToggle, mode, idx }) {
  const [shown, setShown] = useState(false);
  const [self, setSelf] = useState(null);
  const reveal = () => { setShown(true); if (onToggle) onToggle(); };
  const opts = it.options && it.options.length ? it.options : null;
  /* the answer the printed numbers gave us, matched back to a choice — the
     text of every option is on the page too, so this is a match, not a guess */
  const key = (v) => String(v == null ? "" : v).replace(/,/g, "").replace(/[^0-9.<>=/\-]/g, "");
  const rightOf = opts && it.answer
    ? (opts.find((o) => key(o.text).length > 0 && key(it.answer).indexOf(key(o.text)) >= 0) || null)
    : null;
  const answered = !!it.answer;
  return (
    <div className={"wk-item" + (shown || open ? " open" : "")}>
      <div className="wk-item-top">
        <span className="wk-item-n mono">{it.n != null ? it.n : (idx != null ? idx + 1 : "\u2022")}</span>
        <div className="wk-item-text"><WkRuns runs={it.runs} /></div>
        {it.tag && <WkTag tone={/higher|hot|challenge/i.test(it.tag) ? "gold" : /stem/i.test(it.tag) ? "green" : ""}>{it.tag}</WkTag>}
      </div>
      {it.dir && <div className="wk-item-dir"><Icon name="fa-arrow-down-1-9" /> {it.dir}</div>}
      {it.checkbox && (
        <div className="wk-boxes">{it.checkbox.map((c, i) => <label key={i}><span className="wk-box" />{c}</label>)}</div>
      )}
      {opts && (
        <div className="wk-opts">
          {opts.map((o) => (
            <div key={o.v} className={"wk-opt" + (rightOf && rightOf.v === o.v ? " right" : "")}
              onClick={() => setSelf(rightOf ? (o.v === rightOf.v ? "ok" : "no") : "seen")}>
              <b className="mono">{o.v}</b><span>{o.text}</span>
              {self && rightOf && o.v === rightOf.v && <span className="wk-opt-mark"><Icon name="fa-check" /></span>}
            </div>
          ))}
        </div>
      )}
      {it.table && <WkTable head={it.table.head} rows={it.table.rows} />}
      {it.work && (
        <pre className="wk-code">{(shown && it.workSolved ? it.workSolved : it.work).join("\n")}</pre>
      )}
      {it.fig && <WeekFig fig={it.fig} height={150} />}
      {!opts && it.fig && <div className="wk-item-hint"><Icon name="fa-pen-ruler" /> the printed numbers, modelled — no answer invented</div>}
      <div className="wk-item-foot">
        {!shown ? (
          <button className="btn btn-sm btn-ghost" onClick={reveal}>
            <Icon name={answered ? "fa-key" : "fa-chalkboard"} /> {answered ? "Check my answer" : "Show the model"}
          </button>
        ) : (
          <div className="wk-item-ans">
            {it.answer
              ? <span><b><Icon name="fa-circle-check" /> {it.answer}</b><i>{it.answerNote}</i></span>
              : <span><b><Icon name="fa-hand" /> Board it</b><i>this one is discussion — the page prints no single answer, so the class justifies its own</i></span>}
            {!opts && it.answer && (
              <div className="wk-self">
                <button className={"btn btn-sm " + (self === "ok" ? "btn-primary" : "btn-ghost")}
                  onClick={() => { setSelf("ok"); if (onToggle) onToggle("ok"); }}>I had it</button>
                <button className={"btn btn-sm " + (self === "no" ? "btn-primary" : "btn-ghost")}
                  onClick={() => setSelf("no")}>Not yet — model again</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- a lane of printed items, paged so nothing is hidden ----------------- */
function WkItemList({ items, per, label, award, onAllDone }) {
  const list = items || [];
  const size = per || 4;
  const pages = Math.max(1, Math.ceil(list.length / size));
  const [pg, setPg] = useState(0);
  const [checked, setChecked] = useState(0);
  if (!list.length) return null;
  const slice = list.slice(pg * size, pg * size + size);
  return (
    <div className="wk-lane">
      <div className="wk-lane-head">
        <b>{label}</b>
        <span className="mono">{list.length} {list.length === 1 ? "item" : "items"} · as printed</span>
        {pages > 1 && (
          <span className="wk-pager">
            <button className="btn btn-sm btn-ghost" disabled={pg === 0} onClick={() => setPg(pg - 1)}><Icon name="fa-chevron-left" /></button>
            <span className="mono">{pg + 1} / {pages}</span>
            <button className="btn btn-sm btn-ghost" disabled={pg >= pages - 1}
              onClick={() => { if (pg >= pages - 1) { if (onAllDone) onAllDone(); } setPg(Math.min(pages - 1, pg + 1)); }}><Icon name="fa-chevron-right" /></button>
          </span>
        )}
      </div>
      {slice.map((it, i) => (
        <WkItem key={(it.n || i) + "-" + pg} it={it} idx={pg * size + i}
          onToggle={(v) => { if (v === "ok") { setChecked((c) => c + 1); if (award) award(XP.sprint, "correct", "Week practice — checked honestly", "self"); } }} />
      ))}
    </div>
  );
}

/* ---- 1 · the week opens: what the page says we are here for -------------- */
function WeekOpen({ award, game }) {
  const W1 = WEEK, L = WEEK_L;
  const secs = (L && L.sections) || {};
  const solve = secs.solveShare;
  const eqs = (secs.essentialQuestion && (secs.essentialQuestion.questions ||
      (secs.essentialQuestion.blocks || []).map((b) => b.text).filter(Boolean))) || [];
  const questions = eqs.length ? eqs : (W1.essentialQuestions || []);
  const items = [
    L && L.iCan ? { t: "p", text: "I can " + L.iCan, runs: [{ t: "b", v: "I can " }, { t: "t", v: L.iCan }] } : null,
    L && L.iCanAlso ? { t: "p", text: "I can also " + L.iCanAlso, runs: [{ t: "b", v: "I can also " }, { t: "t", v: L.iCanAlso }] } : null
  ].filter((b) => b && b.text);
  return (
    <div className="wk-panel glass-panel">
      <div className="wk-open-head">
        <div className="wk-badge">
          <span>Semester {W1.semester}</span>
          <b>Week {String(W1.week).padStart(2, "0")}</b>
          {W1.year && <span className="mono">{W1.year}</span>}
        </div>
        <div className="wk-open-title">
          <h2>{L ? L.title : W1.title}</h2>
          <div className="wk-open-sub">
            {W1.focus && <span><Icon name="fa-bullseye" /> {W1.focus}</span>}
            {W1.topic && <span><Icon name="fa-layer-group" /> {W1.topic}</span>}
            {L && L.page && <span className="mono"><Icon name="fa-book" /> enVision {L.page}</span>}
          </div>
        </div>
      </div>

      <div className="wk-cols">
        <div className="wk-col">
          <WkBlocks blocks={items} />
          {questions.length > 0 && (
            <div className="wk-eq-box">
              <b><Icon name="fa-circle-question" /> {questions.length > 1 ? "Essential Questions" : "Essential Question"}</b>
              {questions.map((q, i) => <p key={i}>{q}</p>)}
            </div>
          )}
          {solve && (
            <div className="wk-solve">
              <b><Icon name="fa-share-nodes" /> Solve & Share — as printed</b>
              <WkBlocks blocks={solve.blocks} />
              {solve.lookBack && <div className="wk-lookback"><Icon name="fa-rotate" /> <b>Look Back!</b> {solve.lookBack}</div>}
            </div>
          )}
        </div>
        <div className="wk-col">
          <div className="wk-fig">
            <Sketch draw={drawWeekRoute(W1, L)} height={196} />
          </div>
          {(W1.fikr || []).length > 0 && (
            <div className="wk-fikr">
              <b>This week's FIKR routine · {W1.cycle || "content at home, thinking in class, evidence on the wall"}</b>
              <div className="wk-fikr-grid">
                {W1.fikr.map((s, i) => (
                  <div key={i} className="wk-fikr-cell">
                    <span className="mono">{s.time}</span>
                    <b>{s.stage}</b>
                    <p>{s.do}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="wk-foot">
        <span><Icon name="fa-mosque" /> {W1.iqra || "Begin with Bismillah. Seek knowledge as a trust."}</span>
        <span className="mono">Dar Al Fikr Boys School · Jeddah · Vision 2030</span>
      </div>
    </div>
  );
}

/* the week route — this lesson inside the week's plan, drawn as a path */
function drawWeekRoute(W1, L) {
  const codes = Object.keys(W1.lessons || {});
  return (ctx, W, H, frame) => {
    wkPanel(ctx, W, H, null, frame);
    const f = frame % 900;
    const y = H / 2 + 6, n = Math.max(1, codes.length);
    const x0 = 34, x1 = W - 34;
    D.marker(ctx, [[x0, y], [x1, y]], D.at(f, 0, 200), "rgba(234,244,242,.55)", 2);
    codes.forEach((code, i) => {
      const cx = n === 1 ? (x0 + x1) / 2 : x0 + (x1 - x0) * (i / (n - 1));
      const on = L && code === L.code;
      const a = D.at(f, 120 + i * 90, 260 + i * 90);
      D.star8(ctx, cx, y, on ? 15 : 10, a, on ? "#C9A227" : "rgba(234,244,242,.6)", 1.8);
      D.txt(ctx, "Lesson " + code, cx, y - 26, { size: 12.5, col: on ? "#C9A227" : "rgba(234,244,242,.72)", font: "marker", alpha: a });
      const title = ((W1.lessons[code] || {}).title || "").split(" ")[0];
      D.txt(ctx, title, cx, y + 30, { size: 10.5, col: "rgba(234,244,242,.55)", font: "mono", weight: 600, alpha: a });
    });
    const b = D.at(f, 520, 700);
    D.txt(ctx, (W1.kind === "lesson" ? "semester " + W1.semester + " · week " + String(W1.week).padStart(2, "0") : W1.kind) +
      " · " + (W1.focus || ""), W / 2, 18, { size: 11.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: b });
  };
}

/* ---- 2 · the Visual Learning Bridge, modelled live ----------------------- */
function WeekBridge({ award }) {
  const L = WEEK_L, s = (L.sections || {}).bridge;
  const other = (L.sections || {}).solveShare;
  const blocks = (s && s.blocks) || [];
  const fig = firstFig(s) || firstFig(other);
  return (
    <div className="wk-panel glass-panel">
      <WkSectionHead label={(s && s.heading) || "Visual Learning Bridge"}
        title="Think aloud on the bridge — a richer example than the homework clip"
        sub={WEEK.lessons[L.code].iCan ? "I can " + WEEK.lessons[L.code].iCan : ""} />
      <div className={"wk-cols" + (fig ? "" : " single")}>
        <div className="wk-col">
          <WkBlocks blocks={blocks} max={7} />
          {(s && s.items || []).length > 0 && <WkItemList items={s.items} label="Worked on the page" per={3} />}
        </div>
        <div className="wk-col">
          {fig && <WeekFig fig={fig} height={200} caption="the same idea, drawn live on the board" />}
          {s && s.convince && (
            <div className="wk-convince">
              <b><Icon name="fa-scale-balanced" /> Convince Me!</b>
              <p>{s.convince}</p>
            </div>
          )}
        </div>
      </div>
      {blocks.length > 7 && <div className="wk-more mono">p. continuation on the printed page — {blocks.length - 7} more block(s) as written</div>}
    </div>
  );
}
/* how much printed material a section actually carries — an empty or
   one-line section never earns a whole slide of its own */
function wkSize(sec) {
  if (!sec) return 0;
  let n = 0;
  (sec.blocks || []).forEach((b) => {
    n += String(b.text || b.label || "").length;
    if (b.items) b.items.forEach((x) => { n += String(x.text || "").length; });
    if (b.rows) n += 60 * b.rows.length;
    if (b.lines) n += 24 * b.lines.length;
  });
  ["items", "understand", "knowHow"].forEach((k) => (sec[k] || []).forEach((it) => { n += 40 + String(it.text || "").length; }));
  return n;
}
function firstFig(sec) {
  if (!sec) return null;
  if (sec.fig) return sec.fig;      /* the section's own model, from the page */
  const b = (sec.blocks || []).find((x) => x && x.fig);
  if (b) return b.fig;
  const it = (sec.items || []).concat(sec.knowHow || [], sec.understand || []).find((x) => x.fig);
  return it ? it.fig : null;
}

/* ---- 3 · the Another Example, worked ------------------------------------ */
function WeekExample() {
  const L = WEEK_L, s = (L.sections || {}).anotherExample;
  if (wkSize(s) < 60) return null;
  const blocks = (s && s.blocks) || [];
  const items = (s && s.items) || [];
  const fig = firstFig(s);
  return (
    <div className="wk-panel glass-panel">
      <WkSectionHead label={s.heading || "Another Example"} title="One more, worked in front of them"
        sub={s && s.stem ? s.stem : ""} />
      <div className={"wk-cols" + (fig || items.length ? "" : " single")}>
        <div className="wk-col"><WkBlocks blocks={blocks} max={8} /></div>
        <div className="wk-col">
          {items.length > 0 && <WkItemList items={items} label="As printed on the page" per={3} />}
          {fig && <WeekFig fig={fig} height={190} caption="the example above, drawn" />}
        </div>
      </div>
    </div>
  );
}

/* ---- 4 · guided then independent, on the printed items ------------------- */
function WeekPractice({ award }) {
  const L = WEEK_L, secs = L.sections || {};
  const g = secs.guided || {}, ind = secs.independent || {};
  const lanes = [
    g.understand && g.understand.length ? { key: "u", label: "Do You Understand? — say it out loud", items: g.understand } : null,
    g.knowHow && g.knowHow.length ? { key: "k", label: "Do You Know How? — guided, the model stays open", items: g.knowHow } : null,
    (ind.items && ind.items.length ? ind.items : []).length ? { key: "i", label: "Independent Practice — no model until it is missed", items: ind.items } : null,
    g.items && g.items.length ? { key: "g", label: "Guided Practice — as printed", items: g.items } : null,
    !((g.understand || g.knowHow || g.items || []).length) && !ind.items ? { key: "q", label: "Quick Practice — as printed", items: (secs.quickPractice || {}).items || [] } : null
  ].filter((x) => x && x.items.length);
  const [lane, setLane] = useState(0);
  const stem = [g.stem, ind.stem].filter(Boolean).join(" ");
  if (!lanes.length) {
    return (
      <div className="wk-panel glass-panel">
        <WkSectionHead label="Practice" title="This week's page carries no numbered run — use the model above" />
        <WkBlocks blocks={(g.blocks || []).concat(ind.blocks || [], (secs.quickPractice || {}).blocks || [])} max={9} />
      </div>
    );
  }
  return (
    <div className="wk-panel glass-panel">
      <div className="wk-lanes">
        {lanes.map((l, i) => (
          <button key={l.key} className={"wk-lane-btn" + (i === lane ? " on" : "")} onClick={() => setLane(i)}>{l.label}</button>
        ))}
        <span className="wk-amanah"><Icon name="fa-hand-holding-heart" /> Amanah before self-mark</span>
      </div>
      {stem && <p className="wk-stem"><WkRuns runs={[{ t: "t", v: stem }]} /></p>}
      <WkItemList items={lanes[lane].items} label={lanes[lane].label} per={4} award={award} />
    </div>
  );
}

/* ---- 5 · the Problem Solving page, new situation ------------------------- */
function WeekProblem({ award }) {
  const L = WEEK_L, s = (L.sections || {}).problemSolving || {};
  const items = s.items || [];
  return (
    <div className="wk-panel glass-panel">
      <WkSectionHead label={s.heading || "Problem Solving"}
        title="A new situation — the AI is a critic, never the author"
        sub={s.stem || ""} />
      <div className="wk-cols">
        <div className="wk-col">
          {items.length ? <WkItemList items={items} label="Problem solving · as printed" per={3} award={award} />
            : <WkBlocks blocks={s.blocks || []} max={8} />}
        </div>
        <div className="wk-col">
          {(s.blocks || []).filter((b) => b.t === "table").map((b, i) => (
            <div key={i} className="wk-fig"><WkTable head={b.head} rows={b.rows} /></div>
          ))}
          {(() => {
            const f = items.map((x) => x.fig).filter(Boolean)[0] || firstFig(s);
            return f ? <WeekFig fig={f} height={190} caption="model the situation before anyone writes a number" /> : null;
          })()}
          {s.lookBack && <div className="wk-lookback"><Icon name="fa-rotate" /> <b>Look Back!</b> {s.lookBack}</div>}
          <div className="wk-critic">
            <b><Icon name="fa-robot" /> Ask the AI to challenge you</b>
            <p>Read your own sentence first. Then ask it: what did I assume? Which number did I not use? Would my method survive a different story?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- 6 · Assessment Practice, self-marked -------------------------------- */
function WeekAssess({ award }) {
  const L = WEEK_L, s = (L.sections || {}).assessment || {};
  const items = s.items || [];
  const [done, setDone] = useState(0);
  if (!items.length && !(s.blocks || []).length) return null;
  return (
    <div className="wk-panel glass-panel">
      <WkSectionHead label={s.heading || "Assessment Practice"}
        title="One item, individual, no notes — the gate that routes" />
      {items.length ? (
        <div className="wk-assess-grid">
          {items.slice(0, 6).map((it, i) => (
            <WkItem key={i} it={it} idx={i} onToggle={(v) => v === "ok" && setDone((d) => d + 1)} />
          ))}
        </div>
      ) : <WkBlocks blocks={s.blocks} max={6} />}
      <div className="wk-gate-note">
        <span><Icon name="fa-shoe-prints" /> {done} of {Math.min(6, items.length || 1)} checked honestly</span>
        <span className="mono">forward if it held · back to the model if it did not</span>
      </div>
    </div>
  );
}

/* ---- 7 · the week closes: homework, vocabulary, STEM, muhasabah --------- */
function WeekClose() {
  const W1 = WEEK, L = WEEK_L;
  const secs = (L && L.sections) || {};
  const vocab = secs.vocabulary && (secs.vocabulary.blocks || []).length ? secs.vocabulary : null;
  const stem = W1.stem || (secs.stem && secs.stem) || null;
  const list = (W1.sections || []).filter((s) => /homework|fluency|notes|exit/i.test(s.heading));
  const days = (W1.sections || []).filter((s) => /diagnostic|orientation|review what you know/i.test(s.heading));
  return (
    <div className="wk-panel glass-panel">
      <WkSectionHead label={"Week " + String(W1.week).padStart(2, "0") + " · closing"}
        title="Signed work, then muhasabah, then salam" />
      <div className="wk-cols">
        <div className="wk-col">
          {W1.homework && (
            <div className="wk-card">
              <b><Icon name="fa-house-chimney-window" /> Homework / fluency</b>
              <WkBlocks blocks={W1.homework.blocks} max={5} />
              {W1.homework.items && <WkItemList items={W1.homework.items} label="As printed" per={3} />}
            </div>
          )}
          {!W1.homework && list.map((s, i) => (
            <div key={i} className="wk-card">
              <b><Icon name="fa-house-chimney-window" /> {s.heading}</b>
              <WkBlocks blocks={s.blocks} max={4} />
              {s.items && s.items.length ? <WkItemList items={s.items} label="Items" per={3} /> : null}
            </div>
          ))}
          {!W1.homework && !list.length && days.length > 0 && days.map((s, i) => (
            <div key={i} className="wk-card">
              <b><Icon name="fa-clipboard-list" /> {s.heading}</b>
              <WkBlocks blocks={s.blocks} max={4} />
              {s.items && <WkItemList items={s.items} label="Practice items" per={3} />}
            </div>
          ))}
          {vocab && (
            <div className="wk-card">
              <b><Icon name="fa-spell-check" /> Vocabulary of this lesson</b>
              <WkBlocks blocks={vocab.blocks} max={3} />
            </div>
          )}
        </div>
        <div className="wk-col">
          {stem && (
            <div className="wk-card wk-stem-card">
              <b><Icon name="fa-flask" /> enVision STEM · this week</b>
              <WkBlocks blocks={(stem.blocks || []).slice(0, 5)} max={5} />
              {stem.items && <WkItemList items={stem.items} label="STEM items" per={3} />}
            </div>
          )}
          <div className="wk-card">
            <b><Icon name="fa-laptop" /> Go online</b>
            <p className="wk-p">SavvasRealize.com — Visual Learning for this lesson, Math Tools, Games,
              Practice Buddy and the Glossary (read it in English, say it in the classroom words: maqam, kasr, riyal).</p>
          </div>
          <div className="wk-card wk-muha">
            <b><Icon name="fa-moon" /> Muhasabah before the salam</b>
            <ul className="wk-list">
              <li>What did I make that I would put my name on?</li>
              <li>Which number did I copy exactly as printed — and where was I tempted to guess?</li>
              <li>Who can I explain this to on the way out?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- dispatch ------------------------------------------------------------ */
function WeekScreens({ k }) {
  if (!WEEK || !WEEK_L) return null;
  switch (k) {
    case "open": return <WeekOpen />;
    case "bridge": return <WeekBridge />;
    case "example": return WEEK_L.sections && WEEK_L.sections.anotherExample ? <WeekExample /> : null;
    case "practice": return <WeekPractice />;
    case "problem": return WEEK_L.sections && (WEEK_L.sections.problemSolving || WEEK_L.sections.stem) ? <WeekProblem /> : null;
    case "assess": return WEEK_L.sections && WEEK_L.sections.assessment ? <WeekAssess /> : null;
    case "close": return <WeekClose />;
    default: return null;
  }
}

/* ==========================================================================
   THE ARC · where the week's screens sit inside the seven stages
     open      → the very start of Knowledge Building (stage 3)
     bridge/example → the end of Knowledge Building, before the sprint
     practice  → stage 4, right after the engine's own sprint
     problem   → stage 5, right after the critic
     assess    → stage 6, after the lesson's gate check
     close     → stage 7, last
   ========================================================================== */
function weekScreenPlan() {
  if (!WEEK || !WEEK_L) return [];
  const secs = WEEK_L.sections || {};
  const out = [];
  const push = (anchor, key, phase, stage, title, lead, goal, pull, rail) =>
    out.push({ anchor, key, phase, stage, meta: { phase, title, lead, goal, pull, rail } });

  push("build-start", "open", "warmup", 3,
    "The week opens on <em>the printed page</em>",
    "Semester " + WEEK.semester + " · Week " + String(WEEK.week).padStart(2, "0") + " — " + (WEEK.focus || WEEK.title || "") +
    (WEEK_L.iCan ? ". I can " + WEEK_L.iCan : "."),
    "Arrive knowing what this lesson is for: the book's own words, not a summary of them.",
    "Every number on this slide came off the week file, unedited.",
    railFor("Read the I-can statement from the page, then the Essential Question. Niyyah first — the boys name why they are here.",
      ["They can say the goal in their own words", "They can point at the number the page used", "Nobody has answered for them yet"],
      "Which sentence on this page will you still be able to prove by Friday?",
      "Paraphrasing the objective until it stops meaning anything."));

  if (wkSize(secs.bridge) + wkSize(secs.solveShare) >= 60) {
    push("build-end", "bridge", "monitor", 3,
      "The <em>Visual Learning Bridge</em>, modelled live",
      "A richer example than the homework clip — think aloud over the page's own bridge, then answer Convince Me!",
      "Close the flagged gaps on the model the book actually printed.",
      "The clip at home and the live model are not the same thing.",
      railFor("Project the bridge, cover the answer, and solve it in front of them while saying what you are noticing.",
        ["They follow the model, not the memo", "They name the step before writing it", "The Convince Me! prompt is argued, not answered"],
        "Where would this model break, and what would you do then?",
        "Reading the worked example as the answer instead of as the method."));
  }
  if (wkSize(secs.anotherExample) >= 60) {
    push("build-end", "example", "connect", 3,
      "<em>Another Example</em> — the second case on the page",
      "The book gives a second number story for the same idea. Work it, then compare the two methods.",
      "See that the same method carries a different story.",
      "Two examples, one rule.",
      railFor("Let a boy take the board for this one while the rest check against the first example.",
        ["The method transfers", "The numbers are copied exactly", "The class challenges the working, not the boy"],
        "What stayed the same between the two examples?",
        "Memorising the second example as a separate recipe."));
  }
  push("practice", "practice", "practice", 4,
    "The week's own <em>practice</em> items",
    "Do You Understand? · Do You Know How? · Independent Practice — the printed run, in the book's order, with the model available and the check honest.",
    "Practice on the page the boys will be marked from.",
    "Amanah before self-mark: Allah sees what the teacher does not.",
    railFor("Two guided items with the model open, then four independent with it closed — exactly the FIKR frame.",
      ["They attempt the printed item, not an easier one", "The model is used, not copied", "Self-mark happens after the attempt"],
      "Which item did you nearly get, and what was the slip?",
      "Revealing the answer key before the boy has committed to his own."));

  if (wkSize(secs.problemSolving) + wkSize(secs.stem) >= 60) {
    push("produce", "problem", "produce", 5,
      "<em>Problem solving</em> — the page's new situations",
      "Comparison, HOT, multi-step and STEM items exactly as printed, none of them pre-solved for you.",
      "Transfer the method into a story the practice items did not use.",
      "The AI may challenge the work. It may not write it.",
      railFor("Choose one item the class has not already used, and let the critic be a question rather than an answer.",
        ["The situation is new to them", "The numbers are the book's numbers", "The reasoning is spoken before it is written"],
        "Would your method work if the story changed but the numbers stayed?",
        "Accepting a generated solution as evidence of understanding."));
  }
  if (wkSize(secs.assessment) >= 60) {
    push("gate", "assess", "swyk", 6,
      "<em>Assessment Practice</em> — the gate item",
      "One individual item from the printed assessment. It decides the next path; it is not a grade.",
      "Route each boy forward or back to the model on evidence.",
      "No notes, no help, no shame — just the answer and the reason.",
      railFor("Give the item, collect the answers, then name the two routes out loud: forward, or back to the board.",
        ["The item was attempted alone", "The reason is written beside the answer", "The route is decided by the evidence"],
        "What will you do differently if the model is your next stop?",
        "Treating the gate as a score to be protected."));
  }
  push("end", "close", "synth", 7,
    "The week <em>closes with signed work</em>",
    "Homework and fluency from the file, the vocabulary of the lesson, this week's STEM page, then muhasabah.",
    "Leave the room with something that carries your name.",
    "Content at home. Thinking in class. Evidence on the wall.",
    railFor("Signed product first — a three-line explanation or a labelled diagram with the name on it — then the three muhasabah questions.",
      ["The product is signed", "The vocabulary is said out loud", "The homework is the page, not a new worksheet"],
      "Whose method from today will you borrow tomorrow?",
      "Ending with a worksheet instead of a product."));
  return out;
}
function railFor(launch, monitor, connect, misconception) {
  return { launch, monitor: monitor || [], connect: connect || "", misconception: misconception || "" };
}
