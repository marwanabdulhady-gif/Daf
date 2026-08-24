/* =============================================================================
   DAF-OMML  ·  Office Math Markup Language → MathML runtime renderer
   -----------------------------------------------------------------------------
   Every fraction, radical, exponent and math symbol in a Dar Al Fikr math deck
   is AUTHORED IN OMML (the same markup Word/PowerPoint stores in document.xml).
   This module is the only thing allowed to turn that OMML into pixels.

   Why: one source of truth. The exact same <m:oMath> string that renders in the
   HTML slide can be pasted into a .docx worksheet, a .pptx, or an exported PDF
   and it stays a real, editable equation — never an image, never LaTeX.

   Public API
     DAFMath.toMathML(ommlString, opts) -> MathML string
     DAFMath.render(el, ommlString, opts)
     DAFMath.hydrate(root)      // renders every [data-omml] node in the DOM

   ENGLISH EDITION: western digits only, no RTL handling anywhere.
   opts: { display:'block'|'inline' }
   ============================================================================= */
(function (global) {
  "use strict";

  var M_NS = "http://schemas.openxmlformats.org/officeDocument/2006/math";

  /* ---------- helpers ----------------------------------------------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function localName(node) {
    return node.localName || String(node.nodeName).replace(/^.*:/, "");
  }

  /* children of `node` whose local name is in `names` (array or single) */
  function kids(node, names) {
    var want = names ? [].concat(names) : null;
    var out = [];
    var c = node.firstChild;
    while (c) {
      if (c.nodeType === 1 && (!want || want.indexOf(localName(c)) !== -1)) out.push(c);
      c = c.nextSibling;
    }
    return out;
  }

  function kid(node, name) {
    var k = kids(node, name);
    return k.length ? k[0] : null;
  }

  /* read m:val of a property child, e.g. mval(fPr,'type') */
  function mval(node, name) {
    if (!node) return null;
    var el = kid(node, name);
    if (!el) return null;
    return (
      el.getAttribute("m:val") ||
      el.getAttributeNS(M_NS, "val") ||
      el.getAttribute("val") ||
      ""
    );
  }

  function textOf(node) {
    var s = "";
    (function walk(n) {
      var c = n.firstChild;
      while (c) {
        if (c.nodeType === 3 || c.nodeType === 4) s += c.nodeValue;
        else if (c.nodeType === 1) walk(c);
        c = c.nextSibling;
      }
    })(node);
    return s;
  }

  function wrap(parts) {
    if (parts.length === 1) return parts[0];
    return "<mrow>" + parts.join("") + "</mrow>";
  }

  /* ---------- run text → <mn> / <mi> / <mo> ------------------------------- */
  var OPERATORS = "+\u2212-\u00b1\u2213\u00d7\u00f7*/=\u2260<>\u2264\u2265\u2248\u221d\u2192\u21d2\u21d4\u2234\u2235\u222a\u2229\u2208\u2209\u2282\u2283\u2286\u2287\u00ac\u2227\u2228|,;:!%\u00b0\u2032\u2033\u22c5\u2218\u2245\u2261\u223c";
  var FENCES = "()[]{}\u2308\u2309\u230a\u230b\u2016";

  /* normalise the ASCII characters authors type into true math glyphs */
  var GLYPH = { "-": "\u2212", "*": "\u22c5", "<=": "\u2264", ">=": "\u2265", "!=": "\u2260", "~=": "\u2248" };


  /* MathML collapses leading/trailing whitespace inside <mtext>, which silently
     glues a normal-text run to the maths beside it ("4,382rounds to4,000").
     Preserve the author's edge spaces as non-breaking spaces. */
  function keepEdgeSpaces(s) {
    return String(s)
      .replace(/^[ \t]+/, function (m) { return new Array(m.length + 1).join("\u00a0"); })
      .replace(/[ \t]+$/, function (m) { return new Array(m.length + 1).join("\u00a0"); });
  }

  function tokenizeRunText(t, opts) {
    var out = [];
    var i = 0;
    while (i < t.length) {
      var ch = t.charAt(i);

      /* whitespace */
      if (/\s/.test(ch)) {
        var ws = "";
        while (i < t.length && /\s/.test(t.charAt(i))) { ws += t.charAt(i); i++; }
        out.push('<mspace width="0.28em"/>');
        continue;
      }

      /* number (supports decimal point and thousands comma inside digits) */
      if (/[0-9]/.test(ch)) {
        var num = "";
        while (i < t.length && /[0-9]/.test(t.charAt(i))) { num += t.charAt(i); i++; }
        if (t.charAt(i) === "." && /[0-9]/.test(t.charAt(i + 1) || "")) {
          num += ".";
          i++;
          while (i < t.length && /[0-9]/.test(t.charAt(i))) { num += t.charAt(i); i++; }
        }
        out.push("<mn>" + esc(num) + "</mn>");
        continue;
      }

      /* two-char operators */
      var two = t.substr(i, 2);
      if (GLYPH[two]) { out.push("<mo>" + esc(GLYPH[two]) + "</mo>"); i += 2; continue; }

      /* fences get stretchy=false so they don't grow oddly in a plain run */
      if (FENCES.indexOf(ch) !== -1) {
        out.push('<mo stretchy="false">' + esc(ch) + "</mo>");
        i++;
        continue;
      }

      if (OPERATORS.indexOf(ch) !== -1) {
        out.push("<mo>" + esc(GLYPH[ch] || ch) + "</mo>");
        i++;
        continue;
      }

      /* identifier: latin/greek/arabic letters. Multi-letter latin runs stay as
         one <mi> only when they are a known function name, else split so that
         "xy" renders as x·y in italic like Word does. */
      if (/[A-Za-z\u0370-\u03ff]/.test(ch)) {
        var word = "";
        while (i < t.length && /[A-Za-z\u0370-\u03ff]/.test(t.charAt(i))) {
          word += t.charAt(i);
          i++;
        }
        if (/^(sin|cos|tan|sec|csc|cot|log|ln|exp|lim|max|min|gcd|lcm|det|mod)$/i.test(word)) {
          out.push("<mi>" + esc(word) + "</mi>");
        } else {
          for (var j = 0; j < word.length; j++) out.push("<mi>" + esc(word.charAt(j)) + "</mi>");
        }
        continue;
      }

      out.push("<mo>" + esc(ch) + "</mo>");
      i++;
    }
    return out.join("");
  }


  /* ---------- element dispatch -------------------------------------------- */
  function convertNodes(nodes, opts) {
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      var s = convert(nodes[i], opts);
      if (s) out.push(s);
    }
    return out.join("");
  }

  function convertChildren(node, opts) {
    return convertNodes(kids(node), opts);
  }

  /* argument slot (m:e, m:num, m:den ...) always becomes exactly one box */
  function slot(node, opts) {
    if (!node) return "<mrow/>";
    var inner = convertChildren(node, opts);
    if (!inner) return "<mrow/>";
    return "<mrow>" + inner + "</mrow>";
  }

  function convert(node, opts) {
    if (node.nodeType === 3) return "";
    if (node.nodeType !== 1) return "";
    var n = localName(node);

    switch (n) {
      /* ---- containers ---- */
      case "oMathPara":
      case "oMath":
        return convertChildren(node, opts);

      /* ---- property blocks are metadata, never rendered ---- */
      case "fPr": case "radPr": case "sSupPr": case "sSubPr": case "sSubSupPr":
      case "naryPr": case "dPr": case "funcPr": case "mPr": case "barPr":
      case "accPr": case "groupChrPr": case "limLowPr": case "limUppPr":
      case "eqArrPr": case "boxPr": case "borderBoxPr": case "phantPr":
      case "sPrePr": case "mcPr": case "mprPr": case "argPr": case "ctrlPr":
      case "rPr":
        return "";

      /* ---- run ---- */
      case "r": {
        var rPr = kid(node, "rPr");
        var isNormal = rPr && kid(rPr, "nor");
        var txt = kids(node, "t").map(textOf).join("");
        if (!txt) txt = textOf(node);
        if (!txt) return "";
        if (isNormal) return "<mtext>" + esc(keepEdgeSpaces(txt)) + "</mtext>";
        return tokenizeRunText(txt, opts);
      }
      case "t":
        return tokenizeRunText(textOf(node), opts);

      /* ---- fraction ---- */
      case "f": {
        var type = mval(kid(node, "fPr"), "type") || "bar";
        var num = slot(kid(node, "num"), opts);
        var den = slot(kid(node, "den"), opts);
        if (type === "lin") return "<mrow>" + num + "<mo>/</mo>" + den + "</mrow>";
        if (type === "skw")
          return '<mfrac bevelled="true">' + num + den + "</mfrac>";
        if (type === "noBar")
          return '<mfrac linethickness="0">' + num + den + "</mfrac>";
        return "<mfrac>" + num + den + "</mfrac>";
      }

      /* ---- radical ---- */
      case "rad": {
        var radPr = kid(node, "radPr");
        var degHide = mval(radPr, "degHide");
        var deg = kid(node, "deg");
        var body = slot(kid(node, "e"), opts);
        var hidden = degHide === "1" || degHide === "on" || degHide === "true" ||
          !deg || !convertChildren(deg, opts);
        if (hidden) return "<msqrt>" + body + "</msqrt>";
        return "<mroot>" + body + slot(deg, opts) + "</mroot>";
      }

      /* ---- scripts ---- */
      case "sSup":
        return "<msup>" + slot(kid(node, "e"), opts) + slot(kid(node, "sup"), opts) + "</msup>";
      case "sSub":
        return "<msub>" + slot(kid(node, "e"), opts) + slot(kid(node, "sub"), opts) + "</msub>";
      case "sSubSup":
        return "<msubsup>" + slot(kid(node, "e"), opts) + slot(kid(node, "sub"), opts) +
          slot(kid(node, "sup"), opts) + "</msubsup>";
      case "sPre":
        return "<mmultiscripts>" + slot(kid(node, "e"), opts) + "<mprescripts/>" +
          slot(kid(node, "sub"), opts) + slot(kid(node, "sup"), opts) + "</mmultiscripts>";

      /* ---- n-ary (sum, integral, product) ---- */
      case "nary": {
        var np = kid(node, "naryPr");
        var chr = mval(np, "chr") || "\u222b";
        var limLoc = mval(np, "limLoc") || "subSup";
        var subHide = mval(np, "subHide") === "1";
        var supHide = mval(np, "supHide") === "1";
        var sub = subHide ? null : kid(node, "sub");
        var sup = supHide ? null : kid(node, "sup");
        var op = '<mo largeop="true">' + esc(chr) + "</mo>";
        var scripted;
        if (!sub && !sup) scripted = op;
        else if (limLoc === "undOvr") {
          if (sub && sup) scripted = "<munderover>" + op + slot(sub, opts) + slot(sup, opts) + "</munderover>";
          else if (sub) scripted = "<munder>" + op + slot(sub, opts) + "</munder>";
          else scripted = "<mover>" + op + slot(sup, opts) + "</mover>";
        } else {
          if (sub && sup) scripted = "<msubsup>" + op + slot(sub, opts) + slot(sup, opts) + "</msubsup>";
          else if (sub) scripted = "<msub>" + op + slot(sub, opts) + "</msub>";
          else scripted = "<msup>" + op + slot(sup, opts) + "</msup>";
        }
        return "<mrow>" + scripted + slot(kid(node, "e"), opts) + "</mrow>";
      }

      /* ---- delimiter ---- */
      case "d": {
        var dPr = kid(node, "dPr");
        var beg = mval(dPr, "begChr");
        var end = mval(dPr, "endChr");
        var sep = mval(dPr, "sepChr");
        if (beg === null) beg = "(";
        if (end === null) end = ")";
        if (sep === null) sep = "|";
        var es = kids(node, "e");
        var parts = [];
        if (beg !== "") parts.push('<mo fence="true" stretchy="true">' + esc(beg) + "</mo>");
        for (var q = 0; q < es.length; q++) {
          if (q > 0 && sep !== "") parts.push('<mo separator="true">' + esc(sep) + "</mo>");
          parts.push(slot(es[q], opts));
        }
        if (end !== "") parts.push('<mo fence="true" stretchy="true">' + esc(end) + "</mo>");
        return "<mrow>" + parts.join("") + "</mrow>";
      }

      /* ---- function apply ---- */
      case "func":
        return "<mrow>" + slot(kid(node, "fName"), opts) +
          '<mo>\u2061</mo>' + slot(kid(node, "e"), opts) + "</mrow>";

      /* ---- limits ---- */
      case "limLow":
        return "<munder>" + slot(kid(node, "e"), opts) + slot(kid(node, "lim"), opts) + "</munder>";
      case "limUpp":
        return "<mover>" + slot(kid(node, "e"), opts) + slot(kid(node, "lim"), opts) + "</mover>";

      /* ---- bar / accent / grouping char ---- */
      case "bar": {
        var pos = mval(kid(node, "barPr"), "pos") || "bot";
        var b = slot(kid(node, "e"), opts);
        return pos === "top"
          ? "<mover>" + b + '<mo stretchy="true">\u00af</mo></mover>'
          : "<munder>" + b + '<mo stretchy="true">\u005f</mo></munder>';
      }
      case "acc": {
        var accChr = mval(kid(node, "accPr"), "chr") || "\u0302";
        return "<mover>" + slot(kid(node, "e"), opts) + "<mo>" + esc(accChr) + "</mo></mover>";
      }
      case "groupChr": {
        var gp = kid(node, "groupChrPr");
        var gchr = mval(gp, "chr") || "\u23df";
        var vertJc = mval(gp, "vertJc") || "bot";
        var g = slot(kid(node, "e"), opts);
        return vertJc === "top"
          ? "<mover>" + g + '<mo stretchy="true">' + esc(gchr) + "</mo></mover>"
          : "<munder>" + g + '<mo stretchy="true">' + esc(gchr) + "</mo></munder>";
      }

      /* ---- matrix ---- */
      case "m": {
        var rows = kids(node, "mr").map(function (r) {
          return "<mtr>" + kids(r, "e").map(function (c) {
            return "<mtd>" + convertChildren(c, opts) + "</mtd>";
          }).join("") + "</mtr>";
        }).join("");
        return "<mtable>" + rows + "</mtable>";
      }

      /* ---- equation array ---- */
      case "eqArr": {
        var lines = kids(node, "e").map(function (e) {
          return "<mtr><mtd>" + convertChildren(e, opts) + "</mtd></mtr>";
        }).join("");
        return '<mtable columnalign="left">' + lines + "</mtable>";
      }

      /* ---- boxes & phantoms ---- */
      case "box":
        return slot(kid(node, "e"), opts);
      case "borderBox":
        return '<menclose notation="box">' + slot(kid(node, "e"), opts) + "</menclose>";
      case "phant":
        return "<mphantom>" + slot(kid(node, "e"), opts) + "</mphantom>";

      /* ---- generic argument holders ---- */
      case "e": case "num": case "den": case "sub": case "sup":
      case "deg": case "lim": case "fName": case "mr":
        return convertChildren(node, opts);

      default:
        return convertChildren(node, opts);
    }
  }

  /* ---------- parsing ------------------------------------------------------ */
  function parseXML(src) {
    var xml = String(src).trim();
    /* auto-declare the math namespace so authors can paste bare OMML */
    if (!/xmlns:m=/.test(xml)) {
      xml = xml.replace(/^<(m:)?(oMathPara|oMath)\b/, function (full) {
        return full + ' xmlns:m="' + M_NS + '"';
      });
    }
    if (!/^<(m:)?(oMathPara|oMath)\b/.test(xml)) {
      xml = '<m:oMath xmlns:m="' + M_NS + '">' + xml + "</m:oMath>";
    }
    var doc;
    if (typeof DOMParser !== "undefined") {
      doc = new DOMParser().parseFromString(xml, "text/xml");
    } else if (global.__DAF_XML_PARSER__) {
      doc = global.__DAF_XML_PARSER__(xml);
    } else {
      throw new Error("No XML parser available");
    }
    var err = doc.getElementsByTagName("parsererror");
    if (err && err.length) throw new Error("OMML parse error: " + textOf(err[0]).slice(0, 160));
    return doc.documentElement;
  }

  /* ---------- public ------------------------------------------------------- */
  function toMathML(omml, opts) {
    opts = opts || {};
    var root;
    try {
      root = parseXML(omml);
    } catch (e) {
      return '<mtext class="daf-math-error">' + esc(e.message) + "</mtext>";
    }
    var body = convert(root, opts);
    if (!body) body = "<mrow/>";
    var attrs =
      'xmlns="http://www.w3.org/1998/Math/MathML"' +
      ' display="' + (opts.display === "inline" ? "inline" : "block") + '"' +
      ' dir="ltr"' +
      ' class="daf-math"';
    return "<math " + attrs + ">" + body + "</math>";
  }

  function render(el, omml, opts) {
    if (!el) return;
    try {
      el.innerHTML = toMathML(omml, opts);
    } catch (e) {
      el.textContent = "math error";
    }
  }

  /* Renders every declarative math node inside `root`:
       <span data-omml="<m:f>...</m:f>"></span>
       <script type="application/xml" class="daf-omml" data-target="#id">...   */
  function hydrate(root) {
    root = root || document;
    var nodes = root.querySelectorAll("[data-omml]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.getAttribute("data-omml-done") === "1") continue;
      render(el, el.getAttribute("data-omml"), {
        display: el.getAttribute("data-display") || "inline"
      });
      el.setAttribute("data-omml-done", "1");
    }
  }


  var API = { toMathML: toMathML, render: render, hydrate: hydrate, NS: M_NS };
  global.DAFMath = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : globalThis);
