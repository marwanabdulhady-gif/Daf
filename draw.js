/* =============================================================================
   DAF CANVAS TOOLKIT — the math gets DRAWN, not printed.
   Phase-gated drawing: at(f,a,b) gates each stage so the idea builds itself.
   ============================================================================= */
(function (global) {
  "use strict";

  function fit(canvas) {
    var ctx = canvas.getContext("2d");
    var state = { ctx: ctx, W: 0, H: 0 };
    function resize() {
      var dpr = Math.min(global.devicePixelRatio || 1, 2);
      var r = canvas.getBoundingClientRect();
      var w = Math.max(1, r.width), h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.W = w; state.H = h;
    }
    resize();
    var ro = null;
    if (global.ResizeObserver) { ro = new ResizeObserver(resize); ro.observe(canvas); }
    else global.addEventListener("resize", resize);
    state.destroy = function () {
      if (ro) ro.disconnect(); else global.removeEventListener("resize", resize);
    };
    return state;
  }

  function loop(draw) {
    var id, frame = 0, stopped = false;
    function tick() {
      if (stopped) return;
      try { draw(frame); } catch (e) {}
      frame++;
      id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return function () { stopped = true; if (id) cancelAnimationFrame(id); };
  }

  /* progress 0..1 between two frame numbers — THE STAGE GATE */
  function at(f, a, b) {
    if (f <= a) return 0;
    if (f >= b) return 1;
    return (f - a) / (b - a);
  }

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  /* ✍️ THE SIGNATURE MOVE — stroke a polyline progressively, like a marker */
  function marker(ctx, pts, prog, col, width) {
    if (!pts || pts.length < 2 || prog <= 0) return;
    var total = 0, segs = [];
    for (var i = 1; i < pts.length; i++) {
      var d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      segs.push(d); total += d;
    }
    var target = total * Math.min(1, prog);
    ctx.save();
    ctx.strokeStyle = col || "#EAF4F2";
    ctx.lineWidth = width || 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    var run = 0;
    for (var j = 1; j < pts.length; j++) {
      var seg = segs[j - 1];
      if (run + seg <= target) { ctx.lineTo(pts[j][0], pts[j][1]); run += seg; }
      else {
        var k = (target - run) / seg;
        ctx.lineTo(pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * k,
                   pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * k);
        break;
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  function rr(ctx, x, y, w, h, r) {
    r = Math.min(r || 8, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function txt(ctx, s, x, y, o) {
    o = o || {};
    ctx.save();
    var size = o.size || 15;
    var fam = o.font === "marker" ? '"Lemonada", cursive'
            : o.font === "mono" ? '"JetBrains Mono", monospace'
            : '"Cabinet Grotesk", sans-serif';
    ctx.font = (o.weight || 700) + " " + size + "px " + fam;
    ctx.fillStyle = o.col || "#EAF4F2";
    ctx.textAlign = o.align || "center";
    ctx.textBaseline = o.baseline || "middle";
    ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    ctx.fillText(s, x, y);
    ctx.restore();
  }

  /* THE BOARD — dark surface, dot grid, breathing gold frame */
  function board(ctx, W, H, o) {
    o = o || {};
    var t = o.t || 0;
    var pad = o.pad == null ? 6 : o.pad;
    ctx.save();
    rr(ctx, pad, pad, W - pad * 2, H - pad * 2, 16);
    ctx.fillStyle = "#0B1F24";
    ctx.fill();
    ctx.clip();
    ctx.fillStyle = "rgba(234,244,242,.07)";
    for (var x = pad + 14; x < W - pad; x += 26) {
      for (var y = pad + 14; y < H - pad; y += 26) {
        ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
    /* breathing gold frame */
    var breathe = 1 + Math.sin(t / 42) * 0.012;
    ctx.save();
    ctx.translate(W / 2, H / 2); ctx.scale(breathe, breathe); ctx.translate(-W / 2, -H / 2);
    rr(ctx, pad, pad, W - pad * 2, H - pad * 2, 16);
    ctx.strokeStyle = "rgba(201,162,39," + (0.55 + Math.sin(t / 42) * 0.2) + ")";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    if (o.title) txt(ctx, o.title, W / 2, pad + 24, { size: 13, col: "#C9A227", font: "mono", weight: 700 });
  }

  /* TAPE / BAR MODEL — the default fraction manipulative */
  function bar(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h;
    var n = Math.max(1, o.parts || 1);
    var prog = o.prog == null ? 1 : o.prog;
    var shaded = o.shaded == null ? 0 : o.shaded;
    var col = o.col || "#2D70B3";
    ctx.save();
    rr(ctx, x, y, w, h, 7);
    ctx.fillStyle = o.bg || "rgba(234,244,242,.08)";
    ctx.fill();
    var visible = Math.floor(n * prog + 0.0001);
    var partial = n * prog - visible;
    for (var i = 0; i < n; i++) {
      var pw = w / n;
      var px = x + i * pw;
      var reveal = i < visible ? 1 : i === visible ? partial : 0;
      if (reveal <= 0) continue;
      if (i < shaded) {
        ctx.save();
        rr(ctx, px + 1.5, y + 1.5, pw * reveal - 3, h - 3, 5);
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.82;
        ctx.fill();
        ctx.restore();
      }
      if (reveal >= 0.999 && i < n - 1) {
        ctx.beginPath();
        ctx.moveTo(px + pw, y + 2);
        ctx.lineTo(px + pw, y + h - 2);
        ctx.strokeStyle = "rgba(234,244,242,.55)";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      if (o.labels && reveal >= 0.999 && o.labels[i]) {
        txt(ctx, o.labels[i], px + pw / 2, y + h / 2, { size: o.labelSize || 13, col: "#EAF4F2", font: "marker", weight: 600 });
      }
    }
    rr(ctx, x, y, w, h, 7);
    ctx.strokeStyle = o.stroke || "rgba(234,244,242,.75)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  /* NUMBER LINE */
  function numberLine(ctx, o) {
    var x = o.x, y = o.y, w = o.w;
    var min = o.min == null ? 0 : o.min;
    var max = o.max == null ? 1 : o.max;
    var prog = o.prog == null ? 1 : o.prog;
    var col = o.col || "#EAF4F2";
    marker(ctx, [[x, y], [x + w, y]], prog, col, 2.4);
    if (prog < 0.35) return;
    var ticks = o.ticks || [];
    var tp = at(prog, 0.35, 0.85);
    for (var i = 0; i < ticks.length; i++) {
      var v = ticks[i].v == null ? ticks[i] : ticks[i].v;
      var frac = (v - min) / (max - min);
      if (frac > tp * 1.02) continue;
      var tx = x + w * frac;
      var big = ticks[i].big;
      ctx.save();
      ctx.strokeStyle = ticks[i].col || col;
      ctx.lineWidth = big ? 2.4 : 1.5;
      ctx.beginPath();
      ctx.moveTo(tx, y - (big ? 11 : 7));
      ctx.lineTo(tx, y + (big ? 11 : 7));
      ctx.stroke();
      ctx.restore();
      if (ticks[i].label) {
        txt(ctx, ticks[i].label, tx, y + 26, { size: 12, col: ticks[i].col || col, font: "marker", weight: 600 });
      }
    }
  }

  /* AREA GRID — arrays, area models */
  function areaGrid(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h;
    var rows = o.rows, cols = o.cols;
    var prog = o.prog == null ? 1 : o.prog;
    var shaded = o.shaded || 0;
    var cw = w / cols, ch = h / rows;
    var total = rows * cols;
    var shown = total * prog;
    ctx.save();
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var idx = r * cols + c;
        if (idx >= shown) continue;
        var cx = x + c * cw, cy = y + r * ch;
        rr(ctx, cx + 1, cy + 1, cw - 2, ch - 2, 3);
        ctx.fillStyle = idx < shaded ? (o.col || "#388C46") : "rgba(234,244,242,.09)";
        ctx.globalAlpha = idx < shaded ? 0.82 : 1;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(234,244,242,.45)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  /* an eight-point Dar Al Fikr star, drawn with the marker */
  function star8(ctx, cx, cy, r, prog, col, width) {
    var a = [], b = [];
    for (var i = 0; i <= 4; i++) {
      var t1 = (Math.PI / 2) * i + Math.PI / 4;
      a.push([cx + r * Math.cos(t1), cy + r * Math.sin(t1)]);
      var t2 = (Math.PI / 2) * i;
      b.push([cx + r * Math.cos(t2), cy + r * Math.sin(t2)]);
    }
    marker(ctx, a, Math.min(1, prog * 2), col, width || 2);
    marker(ctx, b, at(prog, 0.5, 1), col, width || 2);
  }

  function fig(ctx, x, y, col, prog) {
    prog = prog == null ? 1 : prog;
    if (prog <= 0) return;
    ctx.save();
    ctx.globalAlpha = prog;
    ctx.fillStyle = col || "#C9A227";
    ctx.beginPath(); ctx.arc(x, y - 15, 7, 0, Math.PI * 2); ctx.fill();
    rr(ctx, x - 8, y - 6, 16, 20, 6); ctx.fill();
    ctx.restore();
  }


  /* ---------------------------------------------------------------------
     COORDINATE PLANE — Desmos-style axes drawn left to right, then plotted.
     Returns a mapper so callers work in math coordinates, not pixels.
     --------------------------------------------------------------------- */
  function axes(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h;
    var xmax = o.xmax || 10, ymax = o.ymax || 10;
    var prog = o.prog == null ? 1 : o.prog;
    var col = o.col || "rgba(234,244,242,.75)";
    var map = {
      px: function (mx) { return x + (mx / xmax) * w; },
      py: function (my) { return y + h - (my / ymax) * h; }
    };
    /* grid */
    ctx.save();
    ctx.strokeStyle = o.grid || "rgba(234,244,242,.09)";
    ctx.lineWidth = 1;
    for (var gx = 1; gx <= xmax; gx++) {
      ctx.beginPath(); ctx.moveTo(map.px(gx), y); ctx.lineTo(map.px(gx), y + h); ctx.stroke();
    }
    for (var gy = 1; gy <= ymax; gy++) {
      ctx.beginPath(); ctx.moveTo(x, map.py(gy)); ctx.lineTo(x + w, map.py(gy)); ctx.stroke();
    }
    ctx.restore();
    /* axes drawn with the marker */
    marker(ctx, [[x, y + h], [x + w, y + h]], prog, col, 2.2);
    marker(ctx, [[x, y + h], [x, y]], prog, col, 2.2);
    if (o.xLabel) txt(ctx, o.xLabel, x + w / 2, y + h + 26, { size: 11, col: col, font: "marker", alpha: prog });
    if (o.yLabel) {
      ctx.save();
      ctx.translate(x - 30, y + h / 2); ctx.rotate(-Math.PI / 2);
      txt(ctx, o.yLabel, 0, 0, { size: 11, col: col, font: "marker", alpha: prog });
      ctx.restore();
    }
    /* tick numbers */
    if (prog > 0.7 && o.ticks !== false) {
      var step = o.xStep || 1;
      for (var t = step; t <= xmax; t += step) {
        txt(ctx, String(t), map.px(t), y + h + 12, { size: 9.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 500 });
      }
      var ystep = o.yStep || Math.max(1, Math.round(ymax / 5));
      for (var u = ystep; u <= ymax; u += ystep) {
        txt(ctx, String(u), x - 13, map.py(u), { size: 9.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 500 });
      }
    }
    return map;
  }

  /* a proportional line y = kx, swept out from the origin */
  function plotLine(ctx, map, k, xmax, prog, col, width) {
    var xEnd = xmax * Math.min(1, prog);
    marker(ctx, [[map.px(0), map.py(0)], [map.px(xEnd), map.py(k * xEnd)]], 1, col || "#2D70B3", width || 2.6);
  }

  /* plotted points, appearing one after another */
  function plotPoints(ctx, map, pts, prog, col, labels) {
    for (var i = 0; i < pts.length; i++) {
      var a = at(prog, i / pts.length, i / pts.length + 0.35);
      if (a <= 0) continue;
      var cx = map.px(pts[i][0]), cy = map.py(pts[i][1]);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5 * a, 0, Math.PI * 2);
      ctx.fillStyle = col || "#FA7E19";
      ctx.fill();
      ctx.strokeStyle = "rgba(11,31,36,.8)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
      if (labels && labels[i]) {
        txt(ctx, labels[i], cx, cy - 16, { size: 10.5, col: col || "#FA7E19", font: "marker", alpha: a });
      }
    }
  }

  /* a ratio table that fills in row by row */
  function table(ctx, o) {
    var x = o.x, y = o.y, w = o.w;
    var rows = o.rows, head = o.head || [];
    var cols = head.length || (rows[0] || []).length;
    var rh = o.rh || 26;
    var prog = o.prog == null ? 1 : o.prog;
    var cw = w / cols;
    ctx.save();
    for (var c = 0; c < cols; c++) {
      txt(ctx, head[c] || "", x + cw * (c + 0.5), y + rh / 2,
        { size: 11.5, col: "#C9A227", font: "mono", weight: 700 });
    }
    marker(ctx, [[x, y + rh], [x + w, y + rh]], Math.min(1, prog * 3), "rgba(201,162,39,.6)", 1.6);
    var shown = rows.length * prog;
    for (var r = 0; r < rows.length; r++) {
      if (r >= shown) continue;
      var a = Math.min(1, (shown - r) * 2);
      for (var k2 = 0; k2 < cols; k2++) {
        var cell = rows[r][k2];
        if (cell == null) continue;
        txt(ctx, String(cell), x + cw * (k2 + 0.5), y + rh * (r + 1.5),
          { size: 13, col: k2 === cols - 1 ? "#34D399" : "#EAF4F2", font: "marker", alpha: a });
      }
    }
    ctx.restore();
  }


  /* =====================================================================
     GRADE 4 · PLACE VALUE TOOLS
     ===================================================================== */

  var PERIODS = [
    { name: "millions", places: ["hundreds", "tens", "ones"] },
    { name: "thousands", places: ["hundreds", "tens", "ones"] },
    { name: "ones", places: ["hundreds", "tens", "ones"] }
  ];

  /* A Savvas-style place-value chart. `digits` is a string, right aligned.
     `highlight` is the index (from the left of the digit string) to ring. */
  function pvChart(ctx, o) {
    var x = o.x, y = o.y, w = o.w;
    var digits = String(o.digits || "");
    var slots = o.slots || 9;                    /* 9 = up to hundred millions */
    var prog = o.prog == null ? 1 : o.prog;
    var cw = w / slots;
    var hRow = o.rowH || 30;
    var yPeriod = y, yPlace = y + hRow * 0.78, yDigit = y + hRow * 1.7;
    var startSlot = slots - 3 * Math.ceil(slots / 3);
    var periodCount = Math.ceil(slots / 3);

    /* period bands */
    for (var p = 0; p < periodCount; p++) {
      var px = x + p * cw * 3;
      var a = at(prog, p * 0.12, p * 0.12 + 0.4);
      if (a <= 0) continue;
      ctx.save();
      ctx.globalAlpha = a;
      rr(ctx, px + 2, yPeriod, cw * 3 - 4, hRow * 0.72, 6);
      ctx.fillStyle = p % 2 ? "rgba(18,133,124,.16)" : "rgba(96,66,166,.16)";
      ctx.fill();
      ctx.restore();
      var pname = PERIODS[PERIODS.length - periodCount + p];
      txt(ctx, (pname ? pname.name : ""), px + cw * 1.5, yPeriod + hRow * 0.36,
        { size: 10.5, col: "#C9A227", font: "mono", weight: 700, alpha: a });
    }

    /* place labels + digit cells */
    var pad = slots - digits.length;
    for (var i = 0; i < slots; i++) {
      var cx = x + i * cw;
      var a2 = at(prog, 0.25 + (i / slots) * 0.5, 0.25 + (i / slots) * 0.5 + 0.3);
      if (a2 <= 0) continue;
      var place = ["hundreds", "tens", "ones"][i % 3];
      txt(ctx, place, cx + cw / 2, yPlace + 10,
        { size: 8.5, col: "rgba(234,244,242,.45)", font: "mono", weight: 500, alpha: a2 });
      ctx.save();
      ctx.globalAlpha = a2;
      rr(ctx, cx + 3, yDigit - 2, cw - 6, hRow * 1.05, 6);
      ctx.fillStyle = "rgba(234,244,242,.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(234,244,242,.22)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
      var d = i >= pad ? digits.charAt(i - pad) : "";
      if (d !== "") {
        var isHi = o.highlight != null && (i - pad) === o.highlight;
        txt(ctx, d, cx + cw / 2, yDigit + hRow * 0.52,
          { size: 21, col: isHi ? "#C9A227" : "#EAF4F2", font: "marker", alpha: a2 });
        if (isHi) {
          ctx.save();
          ctx.globalAlpha = a2 * (0.6 + Math.sin((o.t || 0) / 14) * 0.35);
          rr(ctx, cx + 3, yDigit - 2, cw - 6, hRow * 1.05, 6);
          ctx.strokeStyle = "#C9A227";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }
      }
      /* comma between periods */
      if (i % 3 === 2 && i < slots - 1 && i >= pad - 1 && digits.length > slots - i - 1) {
        txt(ctx, ",", cx + cw - 1, yDigit + hRow * 0.86,
          { size: 20, col: "#C9A227", font: "marker", alpha: a2 });
      }
    }
    return { cw: cw, yDigit: yDigit, rowH: hRow, pad: pad,
             cellX: function (i) { return x + i * cw; } };
  }

  /* base-ten blocks: 1 (unit), 10 (rod), 100 (flat), 1000 (cube) */
  function digitBlocks(ctx, o) {
    var x = o.x, y = o.y, unit = o.unit || 1, prog = o.prog == null ? 1 : o.prog;
    var col = o.col || "#2D70B3", s = o.s || 7;
    ctx.save();
    ctx.globalAlpha = prog;
    ctx.fillStyle = col;
    ctx.strokeStyle = "rgba(234,244,242,.55)";
    ctx.lineWidth = 0.8;
    if (unit === 1) {
      rr(ctx, x, y, s, s, 1.5); ctx.fill(); ctx.stroke();
    } else if (unit === 10) {
      for (var i = 0; i < 10; i++) { rr(ctx, x, y + i * s, s, s, 1.5); ctx.fill(); ctx.stroke(); }
    } else if (unit === 100) {
      for (var r = 0; r < 10; r++)
        for (var c = 0; c < 10; c++) { rr(ctx, x + c * s, y + r * s, s, s, 1.5); ctx.fill(); ctx.stroke(); }
    } else {
      for (var k = 0; k < 3; k++) {
        var off = k * 4;
        for (var r2 = 0; r2 < 10; r2++)
          for (var c2 = 0; c2 < 10; c2++) {
            rr(ctx, x + c2 * s + off, y + r2 * s - off, s, s, 1.5);
            ctx.fill(); ctx.stroke();
          }
      }
    }
    ctx.restore();
  }

  /* rounding number line: endpoints, halfway marker, the value snapping */
  function roundLine(ctx, o) {
    var x = o.x, y = o.y, w = o.w;
    var lo = o.lo, hi = o.hi, v = o.value;
    var prog = o.prog == null ? 1 : o.prog;
    var mid = (lo + hi) / 2;
    var px = function (n) { return x + ((n - lo) / (hi - lo)) * w; };
    marker(ctx, [[x, y], [x + w, y]], prog, "rgba(234,244,242,.75)", 2.4);
    if (prog < 0.3) return px;
    var fmt = function (n) { return n.toLocaleString("en-US"); };
    [[lo, "#EAF4F2"], [hi, "#EAF4F2"], [mid, "#C9A227"]].forEach(function (pair) {
      var n = pair[0], c = pair[1];
      var tx = px(n);
      ctx.save();
      ctx.strokeStyle = c; ctx.lineWidth = n === mid ? 2 : 2.6;
      if (n === mid) ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(tx, y - 13); ctx.lineTo(tx, y + 13); ctx.stroke();
      ctx.restore();
      txt(ctx, fmt(n), tx, y + 30, { size: 12, col: c, font: "marker" });
    });
    txt(ctx, "halfway", px(mid), y - 26, { size: 10.5, col: "#C9A227", font: "mono", weight: 700 });
    if (prog > 0.5 && v != null) {
      var vx = px(v);
      var up = v >= mid;
      ctx.save();
      ctx.beginPath(); ctx.arc(vx, y, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = up ? "#388C46" : "#C74440"; ctx.fill();
      ctx.restore();
      txt(ctx, fmt(v), vx, y - 46, { size: 15, col: up ? "#388C46" : "#C74440", font: "marker" });
      if (prog > 0.72) {
        var target = up ? hi : lo;
        var pts = [];
        for (var s2 = 0; s2 <= 14; s2++) {
          var t2 = s2 / 14;
          pts.push([vx + (px(target) - vx) * t2, y - Math.sin(Math.PI * t2) * 26]);
        }
        marker(ctx, pts, at(prog, 0.72, 1), up ? "#388C46" : "#C74440", 2.2);
      }
    }
    return px;
  }


  /* =====================================================================
     COLUMN ALGORITHM  ·  addition and subtraction with regrouping
     Reveals one column at a time, right to left, showing carries above the
     top number (addition) or the borrow chain (subtraction).
     ===================================================================== */
  function columnOp(ctx, o) {
    var a = String(o.a), b = String(o.b);
    var op = o.op || "+";
    var n = Math.max(a.length, b.length) + (op === "+" ? 1 : 0);
    a = new Array(n - a.length + 1).join(" ") + a;
    b = new Array(n - b.length + 1).join(" ") + b;
    var result = op === "+" ? (Number(o.a) + Number(o.b)) : (Number(o.a) - Number(o.b));
    var r = String(result);
    r = new Array(n - r.length + 1).join(" ") + r;

    var cw = o.cw || 34;
    var right = o.x + (o.w || n * cw);
    var xOf = function (i) { return right - (n - i) * cw + cw / 2; };
    var yCarry = o.y, yA = o.y + 34, yB = o.y + 70, yLine = o.y + 88, yR = o.y + 116;

    /* work out the carries or the borrow chain */
    var carries = new Array(n).fill(null);
    var topShown = a.split("");
    if (op === "+") {
      var c = 0;
      for (var i = n - 1; i >= 0; i--) {
        var da = a.charAt(i) === " " ? 0 : +a.charAt(i);
        var db = b.charAt(i) === " " ? 0 : +b.charAt(i);
        var sum = da + db + c;
        c = sum >= 10 ? 1 : 0;
        if (c && i > 0) carries[i - 1] = 1;
      }
    } else {
      var digs = a.split("").map(function (d) { return d === " " ? null : +d; });
      for (var j = n - 1; j >= 0; j--) {
        var ta = digs[j], tb = b.charAt(j) === " " ? 0 : +b.charAt(j);
        if (ta === null) continue;
        if (ta < tb) {
          var k = j - 1;
          while (k >= 0 && digs[k] === 0) { digs[k] = 9; carries[k] = 9; k--; }
          if (k >= 0 && digs[k] !== null) { digs[k] = digs[k] - 1; carries[k] = digs[k]; }
          digs[j] = ta + 10;
          carries[j] = digs[j];
        }
      }
      topShown = digs.map(function (d) { return d === null ? " " : String(d); });
    }

    var shown = Math.ceil((o.prog == null ? 1 : o.prog) * n);
    var revealFrom = n - shown;

    /* the two numbers */
    for (var q = 0; q < n; q++) {
      var dim = q < revealFrom ? 1 : 1;
      if (a.charAt(q) !== " ")
        txt(ctx, a.charAt(q), xOf(q), yA, { size: 27, col: "#EAF4F2", font: "marker", alpha: dim });
      if (b.charAt(q) !== " ")
        txt(ctx, b.charAt(q), xOf(q), yB, { size: 27, col: "#EAF4F2", font: "marker", alpha: dim });
    }
    txt(ctx, op, right - n * cw - 16, yB, { size: 26, col: "#C9A227", font: "marker" });
    marker(ctx, [[right - n * cw - 26, yLine], [right + 4, yLine]], 1, "rgba(234,244,242,.8)", 2.2);

    /* carries / borrows above the columns that have been reached */
    for (var m = 0; m < n; m++) {
      if (carries[m] == null || m < revealFrom) continue;
      if (op === "+") {
        txt(ctx, "1", xOf(m), yCarry, { size: 15, col: "#C9A227", font: "marker" });
      } else {
        /* cross out the original digit and write the regrouped one above */
        ctx.save();
        ctx.strokeStyle = "rgba(199,68,64,.85)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(xOf(m) - 11, yA + 10); ctx.lineTo(xOf(m) + 11, yA - 12);
        ctx.stroke();
        ctx.restore();
        txt(ctx, String(carries[m]), xOf(m), yCarry, { size: 15, col: "#C9A227", font: "marker" });
      }
    }

    /* the answer, right to left */
    for (var p = n - 1; p >= revealFrom; p--) {
      if (r.charAt(p) === " ") continue;
      txt(ctx, r.charAt(p), xOf(p), yR, { size: 29, col: "#34D399", font: "marker" });
    }

    /* highlight the live column */
    if (shown > 0 && shown < n + 1) {
      var live = n - shown;
      ctx.save();
      ctx.globalAlpha = 0.5 + Math.sin((o.t || 0) / 13) * 0.3;
      rr(ctx, xOf(live) - cw / 2 + 2, yCarry - 16, cw - 4, yR - yCarry + 32, 7);
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
    }
    return { result: result, xOf: xOf, yR: yR };
  }

  /* =====================================================================
     STRIP DIAGRAM  ·  the enVision bar model for reasoning problems
     parts: [{v, label, col}]   set label "?" for the unknown
     ===================================================================== */
  function strip(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h || 46;
    var parts = o.parts, prog = o.prog == null ? 1 : o.prog;
    var total = parts.reduce(function (s, p) { return s + p.v; }, 0);
    var cursor = x;
    for (var i = 0; i < parts.length; i++) {
      var pw = (parts[i].v / total) * w;
      var a = at(prog, i / parts.length, i / parts.length + 0.45);
      if (a > 0) {
        ctx.save();
        ctx.globalAlpha = a;
        rr(ctx, cursor + 1.5, y, pw - 3, h, 7);
        ctx.fillStyle = parts[i].col || "#2D70B3";
        ctx.globalAlpha = a * (parts[i].label === "?" ? 0.22 : 0.72);
        ctx.fill();
        ctx.globalAlpha = a;
        ctx.strokeStyle = parts[i].label === "?" ? "#C9A227" : "rgba(234,244,242,.7)";
        ctx.lineWidth = parts[i].label === "?" ? 2.2 : 1.6;
        if (parts[i].label === "?") ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.restore();
        txt(ctx, parts[i].label, cursor + pw / 2, y + h / 2,
          { size: 15, col: parts[i].label === "?" ? "#C9A227" : "#EAF4F2", font: "marker", alpha: a });
        if (parts[i].sub) {
          txt(ctx, parts[i].sub, cursor + pw / 2, y + h + 16,
            { size: 10.5, col: "rgba(234,244,242,.6)", font: "mono", weight: 600, alpha: a });
        }
      }
      cursor += pw;
    }
    /* the brace and total above */
    if (o.total != null && prog > 0.7) {
      var ta = at(prog, 0.7, 1);
      marker(ctx, [[x, y - 14], [x, y - 22], [x + w, y - 22], [x + w, y - 14]], ta, "rgba(201,162,39,.75)", 1.8);
      txt(ctx, String(o.total), x + w / 2, y - 34, { size: 15, col: "#C9A227", font: "marker", alpha: ta });
    }
  }


  /* =====================================================================
     ARRAY  ·  rows x cols of unit squares, optionally split at a column
     ===================================================================== */
  function array(ctx, o) {
    var rows = o.rows, cols = o.cols;
    var cell = o.cell || 12, gap = o.gap || 2;
    var x = o.x, y = o.y, prog = o.prog == null ? 1 : o.prog;
    var splitAt = o.splitAt || 0;          /* draw a gap after this column */
    var splitGap = splitAt ? (o.splitGap || 16) : 0;
    var total = rows * cols;
    var shown = total * prog;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var idx = r * cols + c;
        if (idx >= shown) continue;
        var cx = x + c * (cell + gap) + (splitAt && c >= splitAt ? splitGap : 0);
        var cy = y + r * (cell + gap);
        rr(ctx, cx, cy, cell, cell, 2);
        ctx.fillStyle = (splitAt && c >= splitAt) ? (o.col2 || "#FA7E19") : (o.col || "#2D70B3");
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(234,244,242,.35)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
    var wAll = cols * (cell + gap) - gap + splitGap;
    return { w: wAll, h: rows * (cell + gap) - gap,
             splitX: x + splitAt * (cell + gap) - gap / 2 + splitGap / 2 };
  }

  /* =====================================================================
     AREA MODEL  ·  the enVision partial-products rectangle
     cols: [{v, label}]  ·  rowV: the single factor  ·  reveals left to right
     ===================================================================== */
  function areaModel(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h || 96;
    var cols = o.cols, rowV = o.rowV;
    var prog = o.prog == null ? 1 : o.prog;
    var total = cols.reduce(function (s, c) { return s + c.v; }, 0);
    /* Blend the true proportions toward equal widths. A ones region that is
       4/134 of the rectangle is unreadable; textbooks draw these roughly to
       scale, not exactly to scale. Bigger place still means wider region. */
    var blend = o.toScale ? 1 : 0.5;
    var widths = cols.map(function (c) {
      return blend * (c.v / total) + (1 - blend) * (1 / cols.length);
    });
    var wsum = widths.reduce(function (s, v) { return s + v; }, 0);
    widths = widths.map(function (v) { return v / wsum; });
    var cursor = x;
    var palette = ["#2D70B3", "#FA7E19", "#6042A6", "#388C46", "#C74440"];
    var sum = 0;

    txt(ctx, String(rowV), x - 26, y + h / 2, { size: 20, col: "#C9A227", font: "marker" });

    for (var i = 0; i < cols.length; i++) {
      var cw = widths[i] * w;
      var a = at(prog, i / cols.length, i / cols.length + 0.5);
      if (a > 0) {
        ctx.save();
        ctx.globalAlpha = a * 0.24;
        rr(ctx, cursor + 1.5, y, cw - 3, h, 6);
        ctx.fillStyle = palette[i % palette.length];
        ctx.fill();
        ctx.globalAlpha = a;
        ctx.strokeStyle = palette[i % palette.length];
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
        txt(ctx, String(cols[i].v), cursor + cw / 2, y - 16,
          { size: 15, col: palette[i % palette.length], font: "marker", alpha: a });
        var prod = rowV * cols[i].v;
        sum += prod;
        if (o.showProducts !== false && at(prog, i / cols.length + 0.2, i / cols.length + 0.7) > 0) {
          txt(ctx, String(prod), cursor + cw / 2, y + h / 2,
            { size: 19, col: "#EAF4F2", font: "marker",
              alpha: at(prog, i / cols.length + 0.2, i / cols.length + 0.7) });
        }
      }
      cursor += cw;
    }
    if (o.showSum !== false && prog > 0.92) {
      var parts = cols.map(function (c) { return String(rowV * c.v); }).join(" + ");
      txt(ctx, parts + " = " + sum, x + w / 2, y + h + 30,
        { size: 16, col: "#34D399", font: "marker", alpha: at(prog, 0.92, 1) });
    }
    return sum;
  }

  /* =====================================================================
     PLACE-VALUE PATTERN  ·  3x4, 3x40, 3x400 ... with the zeros picked out
     ===================================================================== */
  function pvPattern(ctx, o) {
    var a = o.a, b = o.b, steps = o.steps || 4;
    var x = o.x, y = o.y, prog = o.prog == null ? 1 : o.prog;
    var lh = o.lh || 38;
    for (var i = 0; i < steps; i++) {
      var alpha = i < steps * prog ? 1 : 0.16;
      var zeros = new Array(i + 1).join("0");
      var factor = String(b) + zeros;
      var product = String(a * b) + zeros;
      var live = i === Math.floor(steps * prog) - 1;
      var cy = y + i * lh;
      txt(ctx, String(a), x, cy, { size: 20, col: "#EAF4F2", font: "marker", align: "right", alpha: alpha });
      txt(ctx, "\u00d7", x + 18, cy, { size: 17, col: "#C9A227", font: "marker", alpha: alpha });
      txt(ctx, String(b), x + 48, cy, { size: 20, col: "#EAF4F2", font: "marker", align: "right", alpha: alpha });
      if (zeros) txt(ctx, zeros, x + 52, cy, { size: 20, col: "#C9A227", font: "marker", align: "left", alpha: alpha });
      txt(ctx, "=", x + 108, cy, { size: 17, col: "rgba(234,244,242,.6)", font: "marker", alpha: alpha });
      txt(ctx, String(a * b), x + 168, cy, { size: 20, col: "#34D399", font: "marker", align: "right", alpha: alpha });
      if (zeros) txt(ctx, zeros, x + 172, cy, { size: 20, col: "#C9A227", font: "marker", align: "left", alpha: alpha });
      if (live) {
        ctx.save();
        ctx.globalAlpha = 0.5 + Math.sin((o.t || 0) / 14) * 0.3;
        rr(ctx, x - 34, cy - 17, 260, 34, 7);
        ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.8; ctx.stroke();
        ctx.restore();
      }
    }
  }


  /* =====================================================================
     AREA MODEL 2D  ·  2-digit x 2-digit — four regions in a grid
     rows / cols are decompositions, e.g. [{v:20},{v:4}] x [{v:30},{v:6}]
     Regions reveal in reading order; each shows its partial product.
     ===================================================================== */
  function areaModel2(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h;
    var rows = o.rows, cols = o.cols;
    var prog = o.prog == null ? 1 : o.prog;
    var blend = o.toScale ? 1 : 0.55;

    function widths(list, span) {
      var tot = list.reduce(function (s, c) { return s + c.v; }, 0);
      var f = list.map(function (c) { return blend * (c.v / tot) + (1 - blend) * (1 / list.length); });
      var fs = f.reduce(function (s, v) { return s + v; }, 0);
      return f.map(function (v) { return (v / fs) * span; });
    }
    var cw = widths(cols, w), rh = widths(rows, h);
    var palette = ["#2D70B3", "#FA7E19", "#6042A6", "#388C46"];
    var n = rows.length * cols.length;
    var sum = 0, cy = y;

    for (var r = 0; r < rows.length; r++) {
      var cx = x;
      for (var c = 0; c < cols.length; c++) {
        var idx = r * cols.length + c;
        var a = at(prog, idx / n, idx / n + 0.55);
        var prod = rows[r].v * cols[c].v;
        if (idx < n * prog) sum += prod;
        if (a > 0) {
          ctx.save();
          ctx.globalAlpha = a * 0.22;
          rr(ctx, cx + 1.5, cy + 1.5, cw[c] - 3, rh[r] - 3, 5);
          ctx.fillStyle = palette[idx % palette.length];
          ctx.fill();
          ctx.globalAlpha = a;
          ctx.strokeStyle = palette[idx % palette.length];
          ctx.lineWidth = 1.7;
          ctx.stroke();
          ctx.restore();
          txt(ctx, String(prod), cx + cw[c] / 2, cy + rh[r] / 2,
            { size: Math.min(20, rh[r] * 0.42), col: "#EAF4F2", font: "marker", alpha: a });
        }
        cx += cw[c];
      }
      cy += rh[r];
    }
    /* edge labels */
    var lx = x;
    for (var c2 = 0; c2 < cols.length; c2++) {
      txt(ctx, String(cols[c2].v), lx + cw[c2] / 2, y - 16,
        { size: 15, col: palette[c2 % palette.length], font: "marker" });
      lx += cw[c2];
    }
    var ly = y;
    for (var r2 = 0; r2 < rows.length; r2++) {
      txt(ctx, String(rows[r2].v), x - 24, ly + rh[r2] / 2,
        { size: 15, col: "#C9A227", font: "marker" });
      ly += rh[r2];
    }
    if (o.showSum !== false && prog > 0.94) {
      var parts = [];
      for (var r3 = 0; r3 < rows.length; r3++)
        for (var c3 = 0; c3 < cols.length; c3++) parts.push(rows[r3].v * cols[c3].v);
      var tot2 = parts.reduce(function (s, v) { return s + v; }, 0);
      txt(ctx, parts.join(" + ") + " = " + tot2.toLocaleString("en-US"),
        x + w / 2, y + h + 30, { size: 15, col: "#34D399", font: "marker", alpha: at(prog, 0.94, 1) });
    }
    return sum;
  }


  /* =====================================================================
     PARTIAL QUOTIENTS  ·  the ladder / box method
     chunks: [{q, label}] — how many groups pulled out at each step
     Shows the running dividend, each subtraction, and the quotient column.
     ===================================================================== */
  function partialQuotients(ctx, o) {
    var dividend = o.dividend, divisor = o.divisor;
    var chunks = o.chunks, shown = o.shown == null ? chunks.length : o.shown;
    var x = o.x, y = o.y, w = o.w || 200;
    var lh = o.lh || 32;
    var remaining = dividend;
    var qsum = 0;

    /* the division bracket */
    txt(ctx, String(divisor), x - 14, y + 14, { size: 19, col: "#C9A227", font: "marker", align: "right" });
    ctx.save();
    ctx.strokeStyle = "rgba(234,244,242,.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + 30);
    ctx.lineTo(x, y - 4);
    ctx.lineTo(x + w, y - 4);
    ctx.stroke();
    ctx.restore();
    txt(ctx, dividend.toLocaleString("en-US"), x + 16, y + 14,
      { size: 19, col: "#EAF4F2", font: "marker", align: "left" });

    var cy = y + lh;
    for (var i = 0; i < chunks.length; i++) {
      var a = i < shown ? 1 : 0.14;
      var take = chunks[i].q * divisor;
      txt(ctx, "\u2212 " + take.toLocaleString("en-US"), x + 16, cy,
        { size: 17, col: "#C74440", font: "marker", align: "left", alpha: a });
      txt(ctx, chunks[i].q.toLocaleString("en-US"), x + w + 54, cy,
        { size: 17, col: "#34D399", font: "marker", align: "right", alpha: a });
      txt(ctx, chunks[i].label || (chunks[i].q + " groups"), x + w + 70, cy,
        { size: 10, col: "rgba(234,244,242,.5)", font: "mono", weight: 600, align: "left", alpha: a });
      if (i < shown) { remaining -= take; qsum += chunks[i].q; }
      cy += lh * 0.62;
      if (i < shown) {
        marker(ctx, [[x + 10, cy - 8], [x + w - 6, cy - 8]], 1, "rgba(234,244,242,.35)", 1.2);
        txt(ctx, remaining.toLocaleString("en-US"), x + 16, cy + 10,
          { size: 17, col: "#EAF4F2", font: "marker", align: "left" });
      }
      cy += lh * 0.72;
    }

    /* the quotient column total */
    if (shown >= chunks.length) {
      marker(ctx, [[x + w + 12, cy - 22], [x + w + 60, cy - 22]], 1, "rgba(201,162,39,.7)", 1.8);
      txt(ctx, qsum.toLocaleString("en-US"), x + w + 54, cy,
        { size: 22, col: "#34D399", font: "marker", align: "right" });
      if (remaining > 0) {
        txt(ctx, "r " + remaining, x + w + 70, cy,
          { size: 14, col: "#C9A227", font: "marker", align: "left" });
      }
    }
    return { quotient: qsum, remainder: remaining };
  }

  /* =====================================================================
     SHARING  ·  counters dealt into equal groups, remainder left over
     ===================================================================== */
  function shareGroups(ctx, o) {
    var total = o.total, groups = o.groups;
    var dealt = o.dealt == null ? total : o.dealt;
    var x = o.x, y = o.y, w = o.w, h = o.h || 110;
    var per = Math.floor(total / groups), rem = total % groups;
    var gw = (w - (groups - 1) * 10) / groups;
    var s = o.s || 12;
    var cols = Math.max(1, Math.floor((gw - 8) / (s + 3)));

    for (var g = 0; g < groups; g++) {
      var gx = x + g * (gw + 10);
      ctx.save();
      rr(ctx, gx, y, gw, h, 8);
      ctx.strokeStyle = "rgba(234,244,242,.28)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
      var count = 0;
      for (var k = 0; k < total; k++) {
        if (k % groups !== g) continue;
        if (k >= dealt) break;
        var r = Math.floor(count / cols), c = count % cols;
        ctx.save();
        ctx.beginPath();
        ctx.arc(gx + 8 + c * (s + 3) + s / 2, y + 12 + r * (s + 3) + s / 2, s / 2, 0, Math.PI * 2);
        ctx.fillStyle = o.col || "#2D70B3";
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.restore();
        count++;
      }
      txt(ctx, String(count), gx + gw / 2, y + h + 16,
        { size: 13, col: "#EAF4F2", font: "marker" });
    }
    /* the leftovers */
    if (dealt >= total && rem > 0) {
      var rx = x + w + 18;
      ctx.save();
      rr(ctx, rx, y, 46, h, 8);
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.8; ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.restore();
      for (var m = 0; m < rem; m++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(rx + 23, y + 16 + m * (s + 4), s / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#C9A227";
        ctx.fill();
        ctx.restore();
      }
      txt(ctx, "left over", rx + 23, y + h + 16, { size: 11, col: "#C9A227", font: "marker" });
    }
    return { per: per, rem: rem };
  }


  /* =====================================================================
     FACTOR RECTANGLES  ·  every factor pair of n, drawn as an array
     ===================================================================== */
  function factorRects(ctx, o) {
    var n = o.n, pairs = o.pairs, active = o.active;
    var x = o.x, y = o.y, w = o.w, h = o.h;
    var cell = o.cell || 9, gap = 1.5;
    var slot = w / pairs.length;
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i];
      var on = active == null || i <= active;
      var live = i === active;
      var aw = p[1] * (cell + gap), ah = p[0] * (cell + gap);
      var cx = x + slot * i + slot / 2 - aw / 2;
      var cy = y + h / 2 - ah / 2;
      ctx.save();
      ctx.globalAlpha = on ? 1 : 0.13;
      for (var r = 0; r < p[0]; r++) {
        for (var c = 0; c < p[1]; c++) {
          rr(ctx, cx + c * (cell + gap), cy + r * (cell + gap), cell, cell, 2);
          ctx.fillStyle = live ? "#C9A227" : "#2D70B3";
          ctx.globalAlpha = on ? (live ? 0.85 : 0.7) : 0.13;
          ctx.fill();
        }
      }
      ctx.restore();
      txt(ctx, p[0] + " \u00d7 " + p[1], x + slot * i + slot / 2, y + h + 20,
        { size: 13, col: on ? (live ? "#C9A227" : "#EAF4F2") : "rgba(234,244,242,.25)", font: "marker" });
    }
  }

  /* =====================================================================
     NUMBER GRID  ·  1..n laid out in rows, with highlighted sets
     sets: [{ nums:[], col }]  — later sets draw over earlier ones
     ===================================================================== */
  function numberGrid(ctx, o) {
    var n = o.n || 100, cols = o.cols || 10;
    var x = o.x, y = o.y, w = o.w;
    var sets = o.sets || [];
    var cw = w / cols, ch = o.ch || cw * 0.72;
    for (var k = 1; k <= n; k++) {
      var r = Math.floor((k - 1) / cols), c = (k - 1) % cols;
      var cx = x + c * cw, cy = y + r * ch;
      var fill = null, ring = null;
      for (var s = 0; s < sets.length; s++) {
        if (sets[s].nums.indexOf(k) !== -1) {
          if (sets[s].ring) ring = sets[s].col; else fill = sets[s].col;
        }
      }
      ctx.save();
      rr(ctx, cx + 1, cy + 1, cw - 2, ch - 2, 3);
      ctx.fillStyle = fill || "rgba(234,244,242,.05)";
      ctx.globalAlpha = fill ? 0.75 : 1;
      ctx.fill();
      if (ring) {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = ring; ctx.lineWidth = 1.8; ctx.stroke();
      }
      ctx.restore();
      txt(ctx, String(k), cx + cw / 2, cy + ch / 2,
        { size: Math.min(11, ch * 0.42), col: fill ? "#0B1F24" : "rgba(234,244,242,.6)",
          font: "mono", weight: 700 });
    }
  }


  /* =====================================================================
     FRACTION BAR  ·  a whole cut into `den` parts, `num` of them shaded.
     `split` cuts every part into that many pieces — the equivalence move.
     ===================================================================== */
  function fracBar(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h || 52;
    var den = o.den, num = o.num;
    var split = o.split || 1;
    var prog = o.prog == null ? 1 : o.prog;
    var col = o.col || "#2D70B3";
    var pw = w / den;

    /* shaded region first, so the grid sits on top */
    var shadeW = (num / den) * w * Math.min(1, prog * 1.2);
    ctx.save();
    rr(ctx, x, y, w, h, 7);
    ctx.fillStyle = "rgba(234,244,242,.06)";
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    rr(ctx, x, y, w, h, 7);
    ctx.clip();
    ctx.fillStyle = col;
    ctx.globalAlpha = 0.72;
    ctx.fillRect(x, y, shadeW, h);
    ctx.restore();
    ctx.restore();

    /* the original cuts */
    for (var i = 1; i < den; i++) {
      ctx.save();
      ctx.strokeStyle = "rgba(234,244,242,.75)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(x + i * pw, y + 2);
      ctx.lineTo(x + i * pw, y + h - 2);
      ctx.stroke();
      ctx.restore();
    }
    /* the extra cuts from splitting */
    if (split > 1) {
      var sp = at(prog, 0.35, 1);
      for (var j = 0; j < den; j++) {
        for (var k = 1; k < split; k++) {
          ctx.save();
          ctx.globalAlpha = sp;
          ctx.strokeStyle = "#C9A227";
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(x + j * pw + (k * pw) / split, y + 4);
          ctx.lineTo(x + j * pw + (k * pw) / split, y + h - 4);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    ctx.save();
    rr(ctx, x, y, w, h, 7);
    ctx.strokeStyle = "rgba(234,244,242,.85)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    if (o.label !== false) {
      txt(ctx, (num * split) + " / " + (den * split), x + w / 2, y + h + 22,
        { size: 15, col: split > 1 ? "#C9A227" : "#EAF4F2", font: "marker" });
    }
    return { shadeW: shadeW, pw: pw };
  }

  /* =====================================================================
     FRACTION NUMBER LINE  ·  0..whole, cut into `den`, points marked
     marks: [{ n, den, label, col }]
     ===================================================================== */
  function fracLine(ctx, o) {
    var x = o.x, y = o.y, w = o.w;
    var den = o.den, whole = o.whole || 1;
    var prog = o.prog == null ? 1 : o.prog;
    marker(ctx, [[x, y], [x + w, y]], prog, "rgba(234,244,242,.8)", 2.2);
    if (prog < 0.3) return function (n, d) { return x + (n / d / whole) * w; };

    var px = function (n, d) { return x + (n / d / whole) * w; };
    var total = den * whole;
    for (var i = 0; i <= total; i++) {
      var big = i % den === 0;
      var tx = px(i, den);
      ctx.save();
      ctx.strokeStyle = big ? "rgba(234,244,242,.85)" : "rgba(234,244,242,.4)";
      ctx.lineWidth = big ? 2.2 : 1.3;
      ctx.beginPath();
      ctx.moveTo(tx, y - (big ? 12 : 7));
      ctx.lineTo(tx, y + (big ? 12 : 7));
      ctx.stroke();
      ctx.restore();
      if (big && o.bigLabels !== false) txt(ctx, String(i / den), tx, y + 30, { size: 13, col: "#EAF4F2", font: "marker" });
      else if (o.labelAll) txt(ctx, i + "/" + den, tx, y + 26,
        { size: 9.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 600 });
    }

    (o.marks || []).forEach(function (m, k) {
      var a = at(prog, 0.5 + k * 0.12, 0.5 + k * 0.12 + 0.4);
      if (a <= 0) return;
      var mx = px(m.n, m.den);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(mx, y, 7, 0, Math.PI * 2);
      ctx.fillStyle = m.col || "#C9A227";
      ctx.fill();
      ctx.restore();
      txt(ctx, m.label || (m.n + "/" + m.den), mx, y - 26 - (m.up ? 22 : 0),
        { size: 14, col: m.col || "#C9A227", font: "marker", alpha: a });
    });
    return px;
  }


  /* =====================================================================
     MIXED BAR  ·  several wholes side by side, each cut into `den`.
     `num` is the TOTAL number of pieces shaded across all the wholes.
     ===================================================================== */
  function mixedBar(ctx, o) {
    var wholes = o.wholes, den = o.den, num = o.num;
    var x = o.x, y = o.y, w = o.w, h = o.h || 46;
    var gap = o.gap == null ? 10 : o.gap;
    var prog = o.prog == null ? 1 : o.prog;
    var ww = (w - gap * (wholes - 1)) / wholes;
    var left = num;
    for (var k = 0; k < wholes; k++) {
      var gx = x + k * (ww + gap);
      var fill = Math.max(0, Math.min(den, left));
      left -= fill;
      var a = at(prog, k / wholes, k / wholes + 0.6);
      if (a <= 0) continue;
      ctx.save();
      ctx.globalAlpha = a;
      rr(ctx, gx, y, ww, h, 6);
      ctx.fillStyle = "rgba(234,244,242,.06)";
      ctx.fill();
      ctx.save();
      ctx.beginPath(); rr(ctx, gx, y, ww, h, 6); ctx.clip();
      ctx.fillStyle = o.col || "#2D70B3";
      ctx.globalAlpha = a * 0.72;
      ctx.fillRect(gx, y, (fill / den) * ww, h);
      ctx.restore();
      for (var i = 1; i < den; i++) {
        ctx.strokeStyle = "rgba(234,244,242,.6)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(gx + (i * ww) / den, y + 2);
        ctx.lineTo(gx + (i * ww) / den, y + h - 2);
        ctx.stroke();
      }
      rr(ctx, gx, y, ww, h, 6);
      ctx.strokeStyle = "rgba(234,244,242,.85)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    }
    if (o.label !== false) {
      var whole = Math.floor(num / den), rem = num % den;
      var lbl = whole > 0 ? (rem ? whole + " and " + rem + "/" + den : String(whole))
                          : num + "/" + den;
      txt(ctx, lbl, x + w / 2, y + h + 22, { size: 15, col: "#C9A227", font: "marker" });
    }
    return { ww: ww };
  }

  /* =====================================================================
     CLOCK  ·  an analogue face. `h` and `m` are the time; `prog` sweeps the
     minute hand in from 12 so the hands are drawn, never printed.
     ===================================================================== */
  function clock(ctx, o) {
    var cx = o.cx, cy = o.cy, r = o.r || 62;
    var prog = o.prog == null ? 1 : o.prog;
    var col = o.col || "#EAF4F2";
    var hh = o.h % 12, mm = o.m;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(234,244,242,.05)";
    ctx.fill();
    ctx.strokeStyle = col;
    ctx.globalAlpha = Math.min(1, prog * 3);
    ctx.lineWidth = 2.4;
    ctx.stroke();
    ctx.restore();

    /* minute ticks then the twelve numerals */
    for (var t = 0; t < 60; t++) {
      var a0 = (t / 60) * Math.PI * 2 - Math.PI / 2;
      var big = t % 5 === 0;
      ctx.save();
      ctx.globalAlpha = Math.min(1, prog * 3) * (big ? 0.85 : 0.35);
      ctx.strokeStyle = col;
      ctx.lineWidth = big ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a0) * (r - (big ? 11 : 6)), cy + Math.sin(a0) * (r - (big ? 11 : 6)));
      ctx.lineTo(cx + Math.cos(a0) * (r - 2), cy + Math.sin(a0) * (r - 2));
      ctx.stroke();
      ctx.restore();
    }
    if (o.numerals !== false) {
      for (var n = 1; n <= 12; n++) {
        var an = (n / 12) * Math.PI * 2 - Math.PI / 2;
        txt(ctx, String(n), cx + Math.cos(an) * (r - 22), cy + Math.sin(an) * (r - 22),
          { size: Math.max(9, r * 0.19), col: "rgba(234,244,242,.7)", font: "mono", weight: 700,
            alpha: at(prog, 0.1, 0.4) });
      }
    }

    /* the hands: minute sweeps first, hour follows it round */
    var sweep = at(prog, 0.35, 1);
    var mAng = (mm / 60) * sweep * Math.PI * 2 - Math.PI / 2;
    var hAng = ((hh + (mm / 60) * sweep) / 12) * Math.PI * 2 - Math.PI / 2;
    if (sweep > 0) {
      marker(ctx, [[cx, cy], [cx + Math.cos(hAng) * r * 0.52, cy + Math.sin(hAng) * r * 0.52]],
        1, o.hourCol || "#C9A227", 4.4);
      marker(ctx, [[cx, cy], [cx + Math.cos(mAng) * r * 0.78, cy + Math.sin(mAng) * r * 0.78]],
        1, o.minCol || "#2D70B3", 2.8);
    }
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 3.4, 0, Math.PI * 2);
    ctx.fillStyle = "#C9A227";
    ctx.globalAlpha = Math.min(1, prog * 3);
    ctx.fill();
    ctx.restore();

    if (o.label) {
      txt(ctx, o.label, cx, cy + r + 20,
        { size: 14, col: o.labelCol || "#C9A227", font: "marker", alpha: at(prog, 0.6, 1) });
    }
    if (o.caption) {
      txt(ctx, o.caption, cx, cy + r + 38,
        { size: 11, col: "rgba(234,244,242,.6)", font: "marker", alpha: at(prog, 0.7, 1) });
    }
    return { cx: cx, cy: cy, r: r };
  }

  /* =====================================================================
     TIME LINE  ·  an open number line for elapsed time.
     stops: [{ label, mins }] in order; hops are drawn between them with the
     number of minutes written over the arc.
     ===================================================================== */
  function timeLine(ctx, o) {
    var x = o.x, y = o.y, w = o.w;
    var stops = o.stops || [];
    var prog = o.prog == null ? 1 : o.prog;
    var lo = stops[0].mins, hi = stops[stops.length - 1].mins;
    var span = Math.max(1, hi - lo);
    var px = function (m) { return x + ((m - lo) / span) * w; };

    marker(ctx, [[x, y], [x + w, y]], Math.min(1, prog * 2.2), "rgba(234,244,242,.8)", 2.2);

    for (var i = 0; i < stops.length; i++) {
      var a = at(prog, 0.15 + (i / stops.length) * 0.5, 0.45 + (i / stops.length) * 0.5);
      if (a <= 0) continue;
      var tx = px(stops[i].mins);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.strokeStyle = stops[i].col || "#EAF4F2";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(tx, y - 10); ctx.lineTo(tx, y + 10);
      ctx.stroke();
      ctx.restore();
      txt(ctx, stops[i].label, tx, y + 28,
        { size: 12.5, col: stops[i].col || "#EAF4F2", font: "marker", alpha: a });
      if (stops[i].sub) {
        txt(ctx, stops[i].sub, tx, y + 45,
          { size: 10, col: "rgba(234,244,242,.55)", font: "mono", weight: 600, alpha: a });
      }
    }

    /* the hops */
    for (var k = 0; k + 1 < stops.length; k++) {
      var ha = at(prog, 0.4 + (k / stops.length) * 0.5, 0.7 + (k / stops.length) * 0.5);
      if (ha <= 0 || stops[k + 1].ghost) continue;
      var x1 = px(stops[k].mins), x2 = px(stops[k + 1].mins);
      var pts = [];
      for (var s = 0; s <= 18; s++) {
        var t = s / 18;
        pts.push([x1 + (x2 - x1) * t, y - Math.sin(Math.PI * t) * (o.hop || 32)]);
      }
      marker(ctx, pts, ha, stops[k + 1].hopCol || "#388C46", 2.2);
      var gap = stops[k + 1].mins - stops[k].mins;
      txt(ctx, (stops[k + 1].hopLabel || (gap + " min")), (x1 + x2) / 2, y - (o.hop || 32) - 12,
        { size: 12.5, col: stops[k + 1].hopCol || "#388C46", font: "marker", alpha: ha });
    }

    if (o.total) {
      var ta = at(prog, 0.86, 1);
      marker(ctx, [[x, y + 62], [x, y + 70], [x + w, y + 70], [x + w, y + 62]], ta, "rgba(201,162,39,.75)", 1.8);
      txt(ctx, o.total, x + w / 2, y + 86, { size: 15, col: "#C9A227", font: "marker", alpha: ta });
    }
    return px;
  }

  /* =====================================================================
     LINE PLOT  ·  a horizontal scale in fractional units with marks stacked
     above each tick.  counts is an object keyed by the numerator over `den`.
     e.g. { 0:2, 1:0, 2:3, 4:1 } on den 4 means 0, 2/4 and 1 whole.
     ===================================================================== */
  function linePlot(ctx, o) {
    var x = o.x, y = o.y, w = o.w;
    var den = o.den, max = o.max;            /* max is in units of 1/den */
    var prog = o.prog == null ? 1 : o.prog;
    var counts = o.counts || {};
    var col = o.col || "#2D70B3";
    var step = w / max;
    var px = function (n) { return x + (n / max) * w; };

    marker(ctx, [[x - 14, y], [x + w + 14, y]], Math.min(1, prog * 2.4), "rgba(234,244,242,.8)", 2.2);
    if (prog < 0.18) return px;

    /* ticks and fraction labels */
    for (var i = 0; i <= max; i++) {
      var big = i % den === 0;
      var tx = px(i);
      ctx.save();
      ctx.strokeStyle = big ? "rgba(234,244,242,.85)" : "rgba(234,244,242,.45)";
      ctx.lineWidth = big ? 2.2 : 1.3;
      ctx.beginPath();
      ctx.moveTo(tx, y - (big ? 9 : 5));
      ctx.lineTo(tx, y + (big ? 9 : 5));
      ctx.stroke();
      ctx.restore();
      var lab = o.labels ? o.labels[i]
        : (big ? String(i / den) : (o.labelAll === false ? null : (i % den) + "/" + den));
      if (lab) {
        txt(ctx, lab, tx, y + (big ? 26 : 23),
          { size: big ? 13 : 10, col: big ? "#EAF4F2" : "rgba(234,244,242,.6)",
            font: big ? "marker" : "mono", weight: 600 });
      }
    }
    if (o.axisLabel) {
      txt(ctx, o.axisLabel, x + w / 2, y + 48,
        { size: 12, col: "#C9A227", font: "marker", alpha: at(prog, 0.6, 1) });
    }

    /* the stacked marks — drawn as crosses, one per data point */
    var gapY = o.gapY || 17;
    var r = o.r || 5.4;
    var keys = Object.keys(counts);
    var total = 0;
    for (var q = 0; q < keys.length; q++) total += counts[keys[q]];
    var drawn = 0;
    for (var k = 0; k < keys.length; k++) {
      var n = +keys[k], c = counts[keys[k]];
      var cx = px(n);
      for (var m = 0; m < c; m++) {
        var a = at(prog, 0.25 + (drawn / Math.max(1, total)) * 0.6,
                         0.45 + (drawn / Math.max(1, total)) * 0.6);
        drawn++;
        if (a <= 0) continue;
        var cy = y - 16 - m * gapY;
        var hot = o.highlight != null && o.highlight === n;
        var c2 = hot ? (o.highlightCol || "#C9A227") : col;
        marker(ctx, [[cx - r, cy - r], [cx + r, cy + r]], a, c2, 2.2);
        marker(ctx, [[cx + r, cy - r], [cx - r, cy + r]], a, c2, 2.2);
      }
      if (c > 0 && o.showCounts) {
        txt(ctx, String(c), cx, y - 22 - c * gapY,
          { size: 11, col: "rgba(234,244,242,.6)", font: "mono", weight: 700,
            alpha: at(prog, 0.8, 1) });
      }
    }
    if (o.title) {
      txt(ctx, o.title, x + w / 2, o.titleY == null ? 20 : o.titleY,
        { size: 13, col: "#C9A227", font: "marker", alpha: Math.min(1, prog * 3) });
    }
    return px;
  }

  /* =====================================================================
     DECIMAL GRID  ·  a unit square cut into 10 strips or 100 small squares,
     with `shaded` hundredths filled.  The workhorse for Topic 12.
     ===================================================================== */
  function decGrid(ctx, o) {
    var x = o.x, y = o.y, s = o.s || 120;
    var tenths = o.tenths === true;          /* 10 strips instead of 100 cells */
    var shaded = o.shaded || 0;              /* always in hundredths */
    var prog = o.prog == null ? 1 : o.prog;
    var col = o.col || "#2D70B3";
    var n = tenths ? 10 : 100;
    var per = tenths ? 10 : 1;               /* hundredths per cell */
    var cells = Math.round(shaded / per);
    var cols = tenths ? 10 : 10;
    var rows = tenths ? 1 : 10;
    var cw = s / cols, ch = s / rows;

    ctx.save();
    rr(ctx, x, y, s, s, 6);
    ctx.fillStyle = "rgba(234,244,242,.05)";
    ctx.fill();
    ctx.restore();

    var shown = Math.round(cells * Math.min(1, prog * 1.15));
    for (var i = 0; i < shown; i++) {
      /* fill column by column so a full column IS one tenth-strip,
         matching the orientation of the tenths grid exactly */
      var c = tenths ? i : Math.floor(i / 10);
      var r2 = tenths ? 0 : i % 10;
      ctx.save();
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = col;
      ctx.fillRect(x + c * cw + 0.5, y + r2 * ch + 0.5, cw - 1, ch - 1);
      ctx.restore();
    }
    /* grid lines: thin for hundredths, thick every tenth */
    for (var g = 1; g < cols; g++) {
      ctx.save();
      ctx.strokeStyle = "rgba(234,244,242,.55)";
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(x + g * cw, y); ctx.lineTo(x + g * cw, y + s); ctx.stroke();
      ctx.restore();
    }
    if (!tenths) {
      for (var h = 1; h < rows; h++) {
        ctx.save();
        ctx.strokeStyle = "rgba(234,244,242,.35)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, y + h * ch); ctx.lineTo(x + s, y + h * ch); ctx.stroke();
        ctx.restore();
      }
    }
    ctx.save();
    rr(ctx, x, y, s, s, 6);
    ctx.strokeStyle = "rgba(234,244,242,.85)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    if (o.label) {
      txt(ctx, o.label, x + s / 2, y + s + 22,
        { size: 14, col: o.labelCol || "#C9A227", font: "marker", alpha: at(prog, 0.5, 1) });
    }
    if (o.sub) {
      txt(ctx, o.sub, x + s / 2, y + s + 40,
        { size: 11, col: "rgba(234,244,242,.6)", font: "marker", alpha: at(prog, 0.6, 1) });
    }
    return { cw: cw, ch: ch, cells: cells };
  }

  /* unit words pluralise, unit symbols do not: "36 inches" but "400 cm" */
  var UNIT_SYMBOLS = { mm: 1, cm: 1, m: 1, km: 1, L: 1, mL: 1, ml: 1,
                       g: 1, kg: 1, oz: 1, lb: 1, ft: 1, "in": 1, yd: 1, mi: 1 };
  function unitPlural(w, n) {
    if (n === 1 || UNIT_SYMBOLS[w]) return w;
    if (w === "foot") return "feet";
    if (/(ch|sh|s|x|z)$/.test(w)) return w + "es";
    return w + "s";
  }

  /* =====================================================================
     UNIT BAR  ·  one big unit on top, the same length cut into `n` small
     units underneath.  The whole point of a conversion made visible.
     ===================================================================== */
  function unitBar(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h || 34;
    var n = o.n;                                   /* small units in one big */
    var big = o.big, small = o.small;
    var copies = o.copies || 1;                    /* how many big units shown */
    var prog = o.prog == null ? 1 : o.prog;
    var gap = o.gap == null ? 8 : o.gap;
    var bw = (w - gap * (copies - 1)) / copies;

    /* the big units */
    for (var c = 0; c < copies; c++) {
      var bx = x + c * (bw + gap);
      var ba = at(prog, (c / copies) * 0.35, (c / copies) * 0.35 + 0.3);
      if (ba <= 0) continue;
      ctx.save();
      ctx.globalAlpha = ba;
      rr(ctx, bx, y, bw, h, 7);
      ctx.fillStyle = o.bigCol || "#2D70B3";
      ctx.globalAlpha = ba * 0.55;
      ctx.fill();
      ctx.globalAlpha = ba;
      ctx.strokeStyle = "rgba(234,244,242,.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
      txt(ctx, "1 " + big, bx + bw / 2, y + h / 2,
        { size: Math.min(15, bw * 0.16), col: "#EAF4F2", font: "marker", alpha: ba });
    }

    /* the small units underneath, drawn left to right */
    var y2 = y + h + (o.split == null ? 26 : o.split);
    var total = n * copies;
    var sw = w / total;
    var drawn = Math.round(total * Math.min(1, at(prog, 0.3, 1) * 1.05));
    for (var i = 0; i < drawn; i++) {
      var sx = x + i * sw;
      ctx.save();
      rr(ctx, sx + 0.8, y2, sw - 1.6, h, sw > 14 ? 4 : 2);
      ctx.fillStyle = o.smallCol || "#FA7E19";
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "rgba(234,244,242,.7)";
      ctx.lineWidth = sw > 10 ? 1.4 : 0.8;
      ctx.stroke();
      ctx.restore();
      if (sw > 26 && o.numbered !== false) {
        txt(ctx, String(i + 1), sx + sw / 2, y2 + h / 2,
          { size: Math.min(12, sw * 0.4), col: "#0B1F24", font: "mono", weight: 700 });
      }
    }

    /* the dashed ties showing the two rows are the same length */
    if (prog > 0.45) {
      var ta = at(prog, 0.45, 0.75);
      ctx.save();
      ctx.globalAlpha = ta * 0.6;
      ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 1.2; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + w, y + h); ctx.lineTo(x + w, y2); ctx.stroke();
      ctx.restore();
    }

    if (o.label !== false) {
      txt(ctx, copies + " " + unitPlural(big, copies) + " = " + total + " " + unitPlural(small, total),
        x + w / 2, y2 + h + 24,
        { size: 15, col: "#C9A227", font: "marker", alpha: at(prog, 0.7, 1) });
    }
    return { sw: sw, y2: y2 };
  }

  /* =====================================================================
     RECT FIG  ·  a labelled rectangle for perimeter and area work.
     mode: "perimeter" traces the border, "area" fills the unit squares.
     ===================================================================== */
  function rectFig(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h;
    var L = o.long, S = o.short;                   /* the two side lengths */
    var prog = o.prog == null ? 1 : o.prog;
    var mode = o.mode || "none";

    if (mode === "area") {
      var cw = w / L, ch = h / S;
      var total = L * S;
      var shown = total * Math.min(1, prog * 1.1);
      for (var r = 0; r < S; r++) {
        for (var c = 0; c < L; c++) {
          if (r * L + c >= shown) continue;
          ctx.save();
          rr(ctx, x + c * cw + 1, y + r * ch + 1, cw - 2, ch - 2, 3);
          ctx.fillStyle = o.col || "#388C46";
          ctx.globalAlpha = 0.55;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeStyle = "rgba(234,244,242,.4)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    /* the outline, drawn with the marker so it looks handmade */
    var border = [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
    marker(ctx, border, mode === "perimeter" ? prog : Math.min(1, prog * 3),
      mode === "perimeter" ? (o.col || "#FA7E19") : "rgba(234,244,242,.85)",
      mode === "perimeter" ? 3.2 : 2);

    var la = at(prog, 0.5, 0.9);
    txt(ctx, o.longLabel == null ? String(L) : o.longLabel, x + w / 2, y - 16,
      { size: 14, col: "#C9A227", font: "marker", alpha: la });
    txt(ctx, o.longLabel == null ? String(L) : o.longLabel, x + w / 2, y + h + 20,
      { size: 14, col: "#C9A227", font: "marker", alpha: la });
    txt(ctx, o.shortLabel == null ? String(S) : o.shortLabel, x - 22, y + h / 2,
      { size: 14, col: "#C9A227", font: "marker", alpha: la });
    txt(ctx, o.shortLabel == null ? String(S) : o.shortLabel, x + w + 22, y + h / 2,
      { size: 14, col: "#C9A227", font: "marker", alpha: la });

    if (o.caption) {
      txt(ctx, o.caption, x + w / 2, y + h + 46,
        { size: 15, col: mode === "area" ? "#34D399" : "#FA7E19", font: "marker",
          alpha: at(prog, 0.7, 1) });
    }
    return { cw: w / L, ch: h / S };
  }

  /* =====================================================================
     ANGLE FIG  ·  two rays from a vertex with the turn swept between them.
     Angles are in degrees, measured anticlockwise from `start` (0 = east).
     `protractor: true` lays a half-circle scale over the vertex.
     ===================================================================== */
  function angleFig(ctx, o) {
    var cx = o.cx, cy = o.cy, r = o.r || 90;
    var start = o.start == null ? 0 : o.start;
    var deg = o.deg;
    var prog = o.prog == null ? 1 : o.prog;
    var col = o.col || "#2D70B3";
    var rad = function (d) { return (-d * Math.PI) / 180; };   /* screen y is flipped */

    if (o.protractor) {
      var pr = r * 1.06;
      ctx.save();
      ctx.globalAlpha = Math.min(1, prog * 3) * 0.9;
      ctx.beginPath();
      ctx.arc(cx, cy, pr, rad(180), rad(0));
      ctx.lineTo(cx + pr, cy);
      ctx.closePath();
      ctx.fillStyle = "rgba(234,244,242,.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(234,244,242,.5)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
      for (var d = 0; d <= 180; d += 10) {
        var big = d % 30 === 0;
        var a1 = rad(d);
        ctx.save();
        ctx.globalAlpha = Math.min(1, prog * 3) * (big ? 0.8 : 0.4);
        ctx.strokeStyle = "rgba(234,244,242,.9)";
        ctx.lineWidth = big ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a1) * (pr - (big ? 12 : 7)), cy + Math.sin(a1) * (pr - (big ? 12 : 7)));
        ctx.lineTo(cx + Math.cos(a1) * pr, cy + Math.sin(a1) * pr);
        ctx.stroke();
        ctx.restore();
        if (big) {
          txt(ctx, String(d), cx + Math.cos(a1) * (pr - 24), cy + Math.sin(a1) * (pr - 24),
            { size: 9.5, col: "rgba(234,244,242,.55)", font: "mono", weight: 600,
              alpha: at(prog, 0.1, 0.4) });
        }
      }
    }

    /* the swept turn, drawn before the rays so the rays sit on top */
    var swept = deg * Math.min(1, at(prog, 0.15, 0.85));
    if (swept > 0.5 && !o.noArc) {
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r * 0.44, rad(start), rad(start + swept), true);
      ctx.closePath();
      ctx.fillStyle = o.arcCol || col;
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.44, rad(start), rad(start + swept), true);
      ctx.strokeStyle = o.arcCol || col;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    /* a right angle gets the square corner instead of an arc label */
    if (o.square && Math.abs(deg - 90) < 0.001 && prog > 0.5) {
      var s = r * 0.16;
      var u1 = [Math.cos(rad(start)), Math.sin(rad(start))];
      var u2 = [Math.cos(rad(start + 90)), Math.sin(rad(start + 90))];
      marker(ctx, [
        [cx + u1[0] * s, cy + u1[1] * s],
        [cx + (u1[0] + u2[0]) * s, cy + (u1[1] + u2[1]) * s],
        [cx + u2[0] * s, cy + u2[1] * s]
      ], 1, o.arcCol || col, 2);
    }

    /* the two rays */
    var len = r;
    marker(ctx, [[cx, cy], [cx + Math.cos(rad(start)) * len, cy + Math.sin(rad(start)) * len]],
      Math.min(1, prog * 2.5), o.rayCol || "#EAF4F2", 2.6);
    marker(ctx, [[cx, cy], [cx + Math.cos(rad(start + deg)) * len, cy + Math.sin(rad(start + deg)) * len]],
      at(prog, 0.2, 0.9), o.rayCol || "#EAF4F2", 2.6);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 3.4, 0, Math.PI * 2);
    ctx.fillStyle = "#C9A227";
    ctx.globalAlpha = Math.min(1, prog * 3);
    ctx.fill();
    ctx.restore();

    if (o.label !== false) {
      var mid = rad(start + deg / 2);
      txt(ctx, o.label == null ? deg + "\u00b0" : o.label,
        cx + Math.cos(mid) * r * 0.66, cy + Math.sin(mid) * r * 0.66,
        { size: 15, col: o.arcCol || "#C9A227", font: "marker", alpha: at(prog, 0.55, 1) });
    }
    if (o.caption) {
      txt(ctx, o.caption, cx, cy + 34,
        { size: 12.5, col: "rgba(234,244,242,.7)", font: "marker", alpha: at(prog, 0.65, 1) });
    }
    return { rad: rad };
  }

  /* =====================================================================
     POLY FIG  ·  a polygon from absolute points, with optional equal-side
     ticks, right-angle squares, parallel arrows and a mirror line.
     ===================================================================== */
  function polyFig(ctx, o) {
    var pts = o.pts;
    var prog = o.prog == null ? 1 : o.prog;
    var col = o.col || "#2D70B3";
    var n = pts.length;

    if (o.fill !== false) {
      ctx.save();
      ctx.globalAlpha = at(prog, 0.5, 1) * 0.2;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < n; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = col;
      ctx.fill();
      ctx.restore();
    }
    marker(ctx, pts.concat([pts[0]]), prog, col, o.width || 2.6);

    /* equal-side ticks: sideTicks[i] is how many ticks on side i */
    var ticks = o.sideTicks || [];
    for (var s = 0; s < ticks.length; s++) {
      if (!ticks[s]) continue;
      var a = pts[s], b = pts[(s + 1) % n];
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var L = Math.sqrt(dx * dx + dy * dy) || 1;
      var ux = dx / L, uy = dy / L;
      var nx = -uy, ny = ux;
      for (var t = 0; t < ticks[s]; t++) {
        var off = (t - (ticks[s] - 1) / 2) * 6;
        marker(ctx, [
          [mx + ux * off - nx * 6, my + uy * off - ny * 6],
          [mx + ux * off + nx * 6, my + uy * off + ny * 6]
        ], at(prog, 0.6, 1), o.tickCol || "#C9A227", 2);
      }
    }

    /* right-angle squares at the listed vertices */
    var rights = o.rightAngles || [];
    for (var k = 0; k < rights.length; k++) {
      var v = pts[rights[k]];
      var p1 = pts[(rights[k] + n - 1) % n], p2 = pts[(rights[k] + 1) % n];
      var e1 = norm2(p1[0] - v[0], p1[1] - v[1]);
      var e2 = norm2(p2[0] - v[0], p2[1] - v[1]);
      var q = 11;
      marker(ctx, [
        [v[0] + e1[0] * q, v[1] + e1[1] * q],
        [v[0] + (e1[0] + e2[0]) * q, v[1] + (e1[1] + e2[1]) * q],
        [v[0] + e2[0] * q, v[1] + e2[1] * q]
      ], at(prog, 0.6, 1), o.rightCol || "#FA7E19", 1.8);
    }

    /* the mirror line, dashed */
    if (o.mirror) {
      var ma = at(prog, 0.65, 1);
      ctx.save();
      ctx.globalAlpha = ma * (o.mirrorAlpha == null ? 0.9 : o.mirrorAlpha);
      ctx.strokeStyle = o.mirrorCol || "#34D399";
      ctx.lineWidth = 2.2;
      ctx.setLineDash([7, 5]);
      ctx.beginPath();
      ctx.moveTo(o.mirror[0][0], o.mirror[0][1]);
      ctx.lineTo(o.mirror[1][0], o.mirror[1][1]);
      ctx.stroke();
      ctx.restore();
    }

    if (o.label) {
      var lx = 0, ly = 0;
      for (var q2 = 0; q2 < n; q2++) { lx += pts[q2][0]; ly += pts[q2][1]; }
      txt(ctx, o.label, lx / n, o.labelY == null ? ly / n : o.labelY,
        { size: 13, col: o.labelCol || "#EAF4F2", font: "marker", alpha: at(prog, 0.7, 1) });
    }
  }

  function norm2(x, y) {
    var L = Math.sqrt(x * x + y * y) || 1;
    return [x / L, y / L];
  }

  /* =====================================================================
     LINE FIG  ·  the Grade 4 vocabulary of lines drawn in one box.
     kind: point | segment | ray | line | parallel | perpendicular | intersecting
     ===================================================================== */
  function lineFig(ctx, o) {
    var x = o.x, y = o.y, w = o.w, h = o.h;
    var prog = o.prog == null ? 1 : o.prog;
    var col = o.col || "#2D70B3";
    var kind = o.kind;
    var cx = x + w / 2, cy = y + h / 2;

    var dot = function (px, py, c) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, prog * 3);
      ctx.beginPath(); ctx.arc(px, py, 4.6, 0, Math.PI * 2);
      ctx.fillStyle = c || "#C9A227"; ctx.fill();
      ctx.restore();
    };
    var arrow = function (px, py, dx, dy) {
      var u = norm2(dx, dy);
      var p = norm2(-u[1], u[0]);
      marker(ctx, [
        [px - u[0] * 9 + p[0] * 5, py - u[1] * 9 + p[1] * 5],
        [px, py],
        [px - u[0] * 9 - p[0] * 5, py - u[1] * 9 - p[1] * 5]
      ], Math.min(1, prog * 2), col, 2.2);
    };

    if (kind === "point") {
      dot(cx, cy);
    } else if (kind === "segment") {
      marker(ctx, [[x + 20, cy], [x + w - 20, cy]], prog, col, 2.8);
      dot(x + 20, cy); dot(x + w - 20, cy);
    } else if (kind === "ray") {
      marker(ctx, [[x + 20, cy], [x + w - 12, cy]], prog, col, 2.8);
      dot(x + 20, cy);
      arrow(x + w - 12, cy, 1, 0);
    } else if (kind === "line") {
      marker(ctx, [[x + 12, cy], [x + w - 12, cy]], prog, col, 2.8);
      arrow(x + w - 12, cy, 1, 0);
      arrow(x + 12, cy, -1, 0);
    } else if (kind === "parallel") {
      marker(ctx, [[x + 12, cy - 20], [x + w - 12, cy - 20]], prog, col, 2.8);
      marker(ctx, [[x + 12, cy + 20], [x + w - 12, cy + 20]], at(prog, 0.2, 1), col, 2.8);
      arrow(x + w - 12, cy - 20, 1, 0); arrow(x + 12, cy - 20, -1, 0);
      arrow(x + w - 12, cy + 20, 1, 0); arrow(x + 12, cy + 20, -1, 0);
      marker(ctx, [[cx - 6, cy - 26], [cx, cy - 20], [cx - 6, cy - 14]], at(prog, 0.7, 1), "#C9A227", 1.8);
      marker(ctx, [[cx - 6, cy + 14], [cx, cy + 20], [cx - 6, cy + 26]], at(prog, 0.7, 1), "#C9A227", 1.8);
    } else if (kind === "perpendicular") {
      marker(ctx, [[x + 12, cy], [x + w - 12, cy]], prog, col, 2.8);
      marker(ctx, [[cx, y + 10], [cx, y + h - 10]], at(prog, 0.2, 1), col, 2.8);
      arrow(x + w - 12, cy, 1, 0); arrow(x + 12, cy, -1, 0);
      arrow(cx, y + 10, 0, -1); arrow(cx, y + h - 10, 0, 1);
      marker(ctx, [[cx + 12, cy], [cx + 12, cy - 12], [cx, cy - 12]],
        at(prog, 0.7, 1), "#FA7E19", 2);
    } else if (kind === "intersecting") {
      marker(ctx, [[x + 12, cy + 26], [x + w - 12, cy - 26]], prog, col, 2.8);
      marker(ctx, [[x + 12, cy - 30], [x + w - 12, cy + 22]], at(prog, 0.2, 1), col, 2.8);
      dot(cx + 4, cy - 3);
    }

    if (o.label) {
      txt(ctx, o.label, cx, y + h + 16,
        { size: 13, col: o.labelCol || "#C9A227", font: "marker", alpha: at(prog, 0.6, 1) });
    }
    if (o.sub) {
      txt(ctx, o.sub, cx, y + h + 34,
        { size: 10.5, col: "rgba(234,244,242,.6)", font: "marker", alpha: at(prog, 0.7, 1) });
    }
  }

  /* =====================================================================
     DECIMAL CHART  ·  a place value chart that crosses the decimal point.
     `digits` is a string like "3.045"; `highlight` rings one place.
     ===================================================================== */
  function decChart(ctx, o) {
    var x = o.x, y = o.y, w = o.w;
    var digits = String(o.digits || "");
    var prog = o.prog == null ? 1 : o.prog;
    var places = o.places || ["ones", "tenths", "hundredths", "thousandths"];
    var values = o.values || ["1", "0.1", "0.01", "0.001"];
    var n = places.length;
    var cw = w / n;
    var hRow = o.hRow || 34;

    var parts = digits.split(".");
    var whole = parts[0] || "0";
    var frac = parts[1] || "";
    var cells = [whole.charAt(whole.length - 1)];
    for (var f = 0; f < n - 1; f++) cells.push(frac.charAt(f) || "0");

    for (var i = 0; i < n; i++) {
      var cx = x + i * cw;
      var a = at(prog, i / n * 0.4, i / n * 0.4 + 0.4);
      if (a <= 0) continue;

      /* the header: place name and what one of them is worth */
      txt(ctx, places[i], cx + cw / 2, y + 12,
        { size: 10.5, col: "#C9A227", font: "mono", weight: 700, alpha: a });
      txt(ctx, values[i], cx + cw / 2, y + 28,
        { size: 9.5, col: "rgba(234,244,242,.5)", font: "mono", weight: 600, alpha: a });

      /* the digit box */
      ctx.save();
      ctx.globalAlpha = a;
      rr(ctx, cx + 4, y + 40, cw - 8, hRow, 7);
      ctx.fillStyle = "rgba(234,244,242,.05)";
      ctx.fill();
      ctx.strokeStyle = o.highlight === i ? "#C9A227" : "rgba(234,244,242,.4)";
      ctx.lineWidth = o.highlight === i ? 2.4 : 1.3;
      ctx.stroke();
      ctx.restore();
      txt(ctx, cells[i], cx + cw / 2, y + 40 + hRow / 2,
        { size: 24, col: o.highlight === i ? "#C9A227" : "#EAF4F2", font: "marker", alpha: a });

      /* the decimal point sits between the first two columns */
      if (i === 0) {
        txt(ctx, ".", cx + cw - 1, y + 40 + hRow * 0.82,
          { size: 26, col: "#C9A227", font: "marker", alpha: a });
      }
    }

    if (o.caption) {
      txt(ctx, o.caption, x + w / 2, y + 40 + hRow + 26,
        { size: 13, col: "rgba(234,244,242,.7)", font: "marker", alpha: at(prog, 0.7, 1) });
    }
    return { cw: cw, cellX: function (i) { return x + i * cw; } };
  }

  /* =====================================================================
     CUBE PRISM  ·  an isometric box of unit cubes for volume work.
     (x, y) is the top-back corner. L runs right-down, W runs left-down,
     H runs up.  `prog` fills the cubes in, layer by layer.
     ===================================================================== */
  function cubePrism(ctx, o) {
    var x = o.x, y = o.y, s = o.s || 22;
    var L = o.L, W = o.W, H = o.H;
    var prog = o.prog == null ? 1 : o.prog;
    var base = o.col || "#2D70B3";

    var ex = [s * 0.866, s * 0.5];      /* along the length, right and down */
    var ey = [-s * 0.866, s * 0.5];     /* along the width, left and down  */
    var ez = [0, -s];                   /* up                              */

    var total = L * W * H;
    var shown = Math.round(total * Math.min(1, prog * 1.06));
    var drawn = 0;

    var shade = function (hex, k) {
      var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16),
          b = parseInt(hex.slice(5, 7), 16);
      return "rgb(" + Math.round(r * k) + "," + Math.round(g * k) + "," + Math.round(b * k) + ")";
    };
    var face = function (pts, fill) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (var q = 1; q < pts.length; q++) ctx.lineTo(pts[q][0], pts[q][1]);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = "rgba(11,31,36,.55)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    for (var k = H - 1; k >= 0; k--) {
      for (var i = 0; i < L; i++) {
        for (var j = 0; j < W; j++) {
          if (drawn++ >= shown) continue;
          var ox = x + i * ex[0] + j * ey[0] + k * ez[0];
          var oy = y + i * ex[1] + j * ey[1] + k * ez[1];
          /* top face */
          face([[ox, oy], [ox + ex[0], oy + ex[1]],
                [ox + ex[0] + ey[0], oy + ex[1] + ey[1]], [ox + ey[0], oy + ey[1]]],
            shade(base, 1.25));
          /* left face (along the width) */
          face([[ox + ey[0], oy + ey[1]], [ox + ey[0] + ex[0], oy + ey[1] + ex[1]],
                [ox + ey[0] + ex[0], oy + ey[1] + ex[1] + s], [ox + ey[0], oy + ey[1] + s]],
            shade(base, 0.62));
          /* right face (along the length) */
          face([[ox + ex[0], oy + ex[1]], [ox + ex[0] + ey[0], oy + ex[1] + ey[1]],
                [ox + ex[0] + ey[0], oy + ex[1] + ey[1] + s], [ox + ex[0], oy + ex[1] + s]],
            shade(base, 0.86));
        }
      }
    }

    /* dimension labels along the three visible edges */
    if (o.labels !== false) {
      var la = at(prog, 0.6, 1);
      txt(ctx, o.lLabel == null ? String(L) : o.lLabel,
        x + (L / 2) * ex[0] + 30, y + (L / 2) * ex[1] - 24,
        { size: 13, col: "#C9A227", font: "marker", alpha: la });
      txt(ctx, o.wLabel == null ? String(W) : o.wLabel,
        x + (W / 2) * ey[0] - 30, y + (W / 2) * ey[1] - 24,
        { size: 13, col: "#C9A227", font: "marker", alpha: la });
      txt(ctx, o.hLabel == null ? String(H) : o.hLabel,
        x + L * ex[0] + W * ey[0] + 26, y + L * ex[1] + W * ey[1] + (s * H) / 2,
        { size: 13, col: "#C9A227", font: "marker", alpha: la });
    }
    if (o.caption) {
      txt(ctx, o.caption, x, y + L * ex[1] + W * ey[1] + s * 1.4 + 26,
        { size: 15, col: "#34D399", font: "marker", alpha: at(prog, 0.75, 1) });
    }
    return { shown: Math.min(shown, total), total: total };
  }

  global.DAFDraw = {
    fit: fit, loop: loop, at: at, ease: ease, easeOut: easeOut,
    marker: marker, rr: rr, txt: txt, board: board,
    bar: bar, numberLine: numberLine, areaGrid: areaGrid, star8: star8, fig: fig,
    axes: axes, plotLine: plotLine, plotPoints: plotPoints, table: table,
    pvChart: pvChart, digitBlocks: digitBlocks, roundLine: roundLine,
    columnOp: columnOp, strip: strip,
    array: array, areaModel: areaModel, areaModel2: areaModel2, pvPattern: pvPattern,
    partialQuotients: partialQuotients, shareGroups: shareGroups,
    factorRects: factorRects, numberGrid: numberGrid,
    fracBar: fracBar, fracLine: fracLine, mixedBar: mixedBar,
    clock: clock, timeLine: timeLine, linePlot: linePlot, decGrid: decGrid,
    unitBar: unitBar, rectFig: rectFig,
    angleFig: angleFig, polyFig: polyFig, lineFig: lineFig,
    decChart: decChart, cubePrism: cubePrism
  };
})(window);
