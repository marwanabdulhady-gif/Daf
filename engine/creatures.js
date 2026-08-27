/* ===========================================================================
   THE FOG GREMLINS · creature engine (pure canvas, D = draw.js)
   ---------------------------------------------------------------------------
   One friendly, blocky, NON-HUMAN trickster per unit (Topics 1–17) + the
   Muddler boss — designed like a ClassDojo monster crossed with a Minecraft /
   Roblox avatar: chunky toy-BLOCK body, big square eyes, modular little arms
   and feet, horn / antenna / wing stud parts. Cute, never scary, non-violent:
   the class never strikes it — they prove the math and it gets *correct-ted*
   (tamed), turning a helper.

   States:
     · 'trap'  — puffed up, smug square brow, smirk, holding the broken math
     · 'tamed' — happy arc eyes, open block smile, the prop fixed
     · 'peek'  — small, curious, wide eyes — the recurring companion that
                 peeks into the story / knowledge screens

   Archetypes:
     blob   — chunky Dojo-style monster with little horns (most units)
     dragon — blocky Minecraft-style body, block wings + spine studs (3,4,8,13)
     alien  — blocky Roblox-style little robot with antennae (10,14,15,17)
   =========================================================================== */

var GREMLINS = {
  "1":  { kind: "blob",   col: ["#7d8ea6", "#566677"], prop: "shifter",
          name: "Digit-Shifter", trap: "The number didn't change — a digit just moved a chair." },
  "2":  { kind: "blob",   col: ["#d89a55", "#b07135"], prop: "swap",
          name: "The Swapper", trap: "Same two numbers, so the answer is the same." },
  "3":  { kind: "dragon", col: ["#f0b429", "#c98e14"], prop: "rows",
          name: "Tile-Counter", trap: "Just count them all — counting never lies." },
  "4":  { kind: "dragon", col: ["#f2913f", "#cf6f24"], prop: "zeros",
          name: "Zero-Attacher", trap: "Multiply the small numbers and stick the zeros on the end." },
  "5":  { kind: "blob",   col: ["#5fa89a", "#3f7d72"], prop: "remainder",
          name: "Remainder-Dropper", trap: "The leftover doesn't matter — the whole groups are the answer." },
  "6":  { kind: "blob",   col: ["#a87fc4", "#81609e"], prop: "rusher",
          name: "The Rusher", trap: "This path is already working — why change it?" },
  "7":  { kind: "blob",   col: ["#46b3a6", "#318278"], prop: "pair",
          name: "Missing-Pair", trap: "You've found the shapes — the ones you didn't find don't exist." },
  "8":  { kind: "dragon", col: ["#5fb2e6", "#3a86b8"], prop: "twins",
          name: "Close-Islands", trap: "They look different, so they must be different." },
  "9":  { kind: "blob",   col: ["#e5809a", "#bb5473"], prop: "tray",
          name: "Tray-Mixer", trap: "Same pieces, different trays — the total is the same." },
  "10": { kind: "alien",  col: ["#8498bd", "#5f7396"], prop: "clock",
          name: "Late-Batch", trap: "The batches are the same size, so the clock doesn't matter." },
  "11": { kind: "blob",   col: ["#4fb3a6", "#358077"], prop: "parrot",
          name: "False-Claim", trap: "The report is confident and the plot looks right — that's enough." },
  "12": { kind: "blob",   col: ["#9b82cc", "#745fa0"], prop: "label",
          name: "Longer-Label", trap: "More digits means more — the longer label is the bigger number." },
  "13": { kind: "dragon", col: ["#d6b033", "#a8871a"], prop: "scales",
          name: "Loose-Wedge", trap: "It looks like a right angle — measuring just slows you down." },
  "14": { kind: "alien",  col: ["#7d94d8", "#5a70b4"], prop: "pattern",
          name: "Pattern-Breaker", trap: "It held for three steps, so the rule is the rule." },
  "15": { kind: "alien",  col: ["#7b90e0", "#566bc2"], prop: "wedge",
          name: "Wobble-Wedge", trap: "Set the arm by eye — the wedges only slow you down." },
  "16": { kind: "blob",   col: ["#69b07c", "#4a8b5d"], prop: "shapes",
          name: "Confident-Classifier", trap: "It has the sides I checked — the property I missed can't matter." },
  "17": { kind: "alien",  col: ["#c07dd9", "#9657b4"], prop: "wisp",
          name: "The New Fog", trap: "A hundredth is smaller than a tenth — so 0.9 must be less than 0.95… right?" },
  boss: { kind: "blob",   col: ["#566474", "#33404c"], prop: "muddler",
          name: "The Muddler", trap: "5 metres is 50 centimetres. Agree, and I am fed." }
};

function gremlinKey(code) {
  if (code === "boss" || /^boss/.test(String(code))) return "boss";
  var n = parseInt(String(code).split("-")[0], 10);
  return String(n);
}
function gremlinFor(code) { return GREMLINS[gremlinKey(code)] || GREMLINS["1"]; }

/* small rounded-rect block helper (blocky Minecraft/Roblox corners) */
function blk(ctx, x, y, w, h, r, fill, stroke, lw) {
  r = Math.min(r == null ? 7 : r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 2; ctx.stroke(); }
}

function drawGremlin(ctx, cx, baseY, o) {
  o = o || {};
  var state = o.state === "tamed" ? "tamed" : o.state === "peek" ? "peek" : "trap";
  var frame = o.frame || 0;
  var r = o.r || 60, s = r / 60;
  var g = gremlinFor(o.code || "1");
  var bob = Math.sin(frame / 24) * 2.2 * s;

  var bodyW = r * 1.5, bodyH = r * 1.42;
  var cy = baseY - bodyH * 0.52 + bob;
  var top = cy - bodyH / 2, left = cx - bodyW / 2, right = cx + bodyW / 2;

  ctx.save();
  if (o.alpha != null) ctx.globalAlpha = o.alpha;
  ctx.lineJoin = "round";

  /* blocky shadow */
  ctx.fillStyle = "rgba(16,36,43,.12)";
  blk(ctx, cx - bodyW * 0.42, baseY - 4 * s, bodyW * 0.84, 10 * s, 5 * s, "rgba(16,36,43,.12)");

  /* ---- modular side parts (behind the body) ---- */
  /* little block arms */
  var armSwing = Math.sin(frame / 16) * 3 * s * (state === "tamed" ? 1.6 : 0.6);
  [-1, 1].forEach(function (side) {
    var ax = side < 0 ? left - 12 * s : right - 2 * s;
    var ay = cy - bodyH * 0.12 + armSwing * side;
    ctx.save();
    ctx.translate(ax + 7 * s, ay);
    ctx.rotate(side * 0.18 + (state === "tamed" ? side * -0.5 : 0));
    blk(ctx, -7 * s, -7 * s, 14 * s, 26 * s, 5 * s, g.col[1]);
    ctx.restore();
  });

  /* kind extras */
  if (g.kind === "dragon") {
    /* blocky wings */
    [-1, 1].forEach(function (side) {
      var wx = side < 0 ? left + 4 * s : right - 4 * s;
      var wy = cy - bodyH * 0.42 + Math.sin(frame / 20 + side) * 3 * s;
      ctx.fillStyle = g.col[1];
      ctx.beginPath();
      ctx.moveTo(wx, wy + 10 * s);
      ctx.lineTo(wx + side * r * 0.52, wy - r * 0.42);
      ctx.lineTo(wx + side * r * 0.30, wy + r * 0.16);
      ctx.lineTo(wx + side * r * 0.10, wy + r * 0.26);
      ctx.closePath(); ctx.fill();
    });
    /* spine studs (Minecraft-style bumps on top) */
    ctx.fillStyle = g.col[1];
    for (var si = -1; si <= 1; si++) {
      blk(ctx, cx + si * 20 * s - 6 * s, top - 10 * s + Math.abs(si) * 5 * s,
        12 * s, 12 * s, 3 * s, g.col[1]);
    }
  } else if (g.kind === "alien") {
    /* blocky antennae with glowing square tips */
    [-1, 1].forEach(function (side) {
      var ax = cx + side * r * 0.34, ay = top;
      ctx.strokeStyle = g.col[1]; ctx.lineWidth = 5 * s; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(ax, ay);
      ctx.lineTo(ax + side * r * 0.16, ay - r * 0.34); ctx.stroke();
      var tipGlow = 0.6 + Math.sin(frame / 14 + side) * 0.35;
      blk(ctx, ax + side * r * 0.16 - 6 * s, ay - r * 0.34 - 12 * s,
        12 * s, 12 * s, 3 * s, g.col[0]);
      ctx.fillStyle = "rgba(255,255,255," + (0.35 + tipGlow * 0.5) + ")";
      blk(ctx, ax + side * r * 0.16 - 3 * s, ay - r * 0.34 - 9 * s, 6 * s, 6 * s, 2 * s,
        "rgba(255,255,255," + (0.4 + tipGlow * 0.5) + ")");
    });
  } else {
    /* Dojo-style little block horns */
    ctx.fillStyle = g.col[1];
    [-1, 1].forEach(function (side) {
      var hx = cx + side * bodyW * 0.30, hy = top;
      ctx.beginPath();
      ctx.moveTo(hx - 8 * s, hy);
      ctx.lineTo(hx + side * 2 * s, hy - r * 0.26);
      ctx.lineTo(hx + 9 * s, hy);
      ctx.closePath(); ctx.fill();
    });
  }

  /* ---- the chunky block body ---- */
  var grd = ctx.createLinearGradient(0, top, 0, top + bodyH);
  grd.addColorStop(0, g.col[0]); grd.addColorStop(1, g.col[1]);
  var puffed = state === "trap" ? 1.05 : 1;
  blk(ctx, cx - (bodyW * puffed) / 2, top, bodyW * puffed, bodyH, 16 * s, grd,
    state === "trap" ? "rgba(255,255,255,.5)" : null, 3 * s);

  /* lighter belly block */
  blk(ctx, cx - bodyW * 0.30, cy - bodyH * 0.02, bodyW * 0.60, bodyH * 0.52, 12 * s,
    "rgba(255,255,255,.16)");

  /* feet — chunky blocks */
  ctx.fillStyle = g.col[1];
  var feetN = g.kind === "alien" ? 3 : 2;
  for (var fi = 0; fi < feetN; fi++) {
    var fx = cx + (fi - (feetN - 1) / 2) * bodyW * 0.42;
    blk(ctx, fx - 11 * s, baseY - 12 * s, 22 * s, 14 * s, 5 * s, g.col[1]);
  }

  /* ---- big square Dojo eyes ---- */
  var ew = r * 0.30, eh = r * 0.34, eyeGap = r * 0.30, eyeY = cy - r * 0.14;
  [-1, 1].forEach(function (side) {
    var ex = cx + side * eyeGap - ew / 2;
    blk(ctx, ex, eyeY - eh / 2, ew, eh, 7 * s, "#F7FBFA", "#10242B", 2.5 * s);
    if (state === "tamed") {
      /* happy block-arc eyes */
      ctx.strokeStyle = "#10242B"; ctx.lineWidth = 3.4 * s; ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(cx + side * eyeGap, eyeY + eh * 0.18, eh * 0.42, Math.PI * 1.12, Math.PI * 1.88);
      ctx.stroke();
    } else if (state === "peek") {
      /* wide curious eyes — big pupils */
      var py = eyeY + eh * 0.12 + Math.sin(frame / 40) * 1.5 * s;
      blk(ctx, cx + side * eyeGap - ew * 0.26, py - ew * 0.26, ew * 0.52, ew * 0.52, 4 * s, "#10242B");
      blk(ctx, cx + side * eyeGap - ew * 0.26 + 3 * s, py - ew * 0.26 + 3 * s, ew * 0.18, ew * 0.18, 2 * s, "#fff");
    } else {
      /* trap: smug — square pupils looking aside */
      var ty = eyeY + eh * 0.14;
      blk(ctx, cx + side * eyeGap - ew * 0.24 + side * 3 * s, ty - ew * 0.24, ew * 0.48, ew * 0.48, 3 * s, "#10242B");
      /* the smug square eyebrow */
      ctx.strokeStyle = "#10242B"; ctx.lineWidth = 4 * s; ctx.lineCap = "square";
      ctx.beginPath();
      ctx.moveTo(ex - 2 * s, eyeY - eh * 0.62);
      ctx.lineTo(ex + ew + 2 * s, eyeY - eh * 0.74);
      ctx.stroke();
    }
  });

  /* mouth — blocky smirk (trap/peek) or open block smile (tamed) */
  var my = cy + r * 0.34, mw = r * 0.16;
  ctx.strokeStyle = "#10242B"; ctx.lineWidth = 3.6 * s; ctx.lineCap = "round";
  if (state === "tamed") {
    ctx.fillStyle = "#10242B";
    ctx.beginPath(); ctx.arc(cx, my - mw * 0.2, mw, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.closePath(); ctx.fill();
    /* a little gold tooth */
    ctx.fillStyle = "#f4d47a";
    blk(ctx, cx - 4 * s, my + mw * 0.5, 8 * s, 7 * s, 2 * s, "#f4d47a");
  } else {
    ctx.beginPath();
    ctx.moveTo(cx - mw, my);
    ctx.lineTo(cx + mw, my - (state === "peek" ? 0 : 5 * s));
    ctx.stroke();
  }

  /* cheeks */
  ctx.fillStyle = "rgba(255,255,255,.25)";
  [-1, 1].forEach(function (side) {
    blk(ctx, cx + side * r * 0.46 - 5 * s, cy + r * 0.16, 10 * s, 7 * s, 3 * s, "rgba(255,255,255,.22)");
  });

  /* ---- the math prop it fumbles with (only in trap/tamed, hidden in peek) ---- */
  if (state !== "peek") drawGremlinProp(ctx, g.prop, cx, cy, r, s, state, frame, g);

  ctx.restore();
}

/* blocky math props. trap = broken/misplaced, tamed = corrected. */
function drawGremlinProp(ctx, prop, bx, by, r, s, state, frame, g) {
  var px = bx, py = by + r * 0.74;
  var tamed = state === "tamed";
  var gold = "#C9A227", teal = "#12857c", ink = "#10242B", warn = "#c74440";
  ctx.save();
  ctx.textAlign = "center"; ctx.textBaseline = "middle";

  switch (prop) {
    case "remainder": {
      /* a little bundle of blocks it drops in trap, carries in tamed */
      var droop = tamed ? 0 : r * 0.26 + Math.sin(frame / 20) * 2;
      ctx.strokeStyle = gold; ctx.lineWidth = 3 * s; ctx.lineCap = "round";
      [-1, 0, 1].forEach(function (k) {
        blk(ctx, px + k * 13 * s + (tamed ? 0 : k * 3 * s) - 6 * s,
          py + droop - Math.abs(k) * 5 * s - 6 * s, 13 * s, 13 * s, 3 * s, "#e9c46a", "#a07f16", 2 * s);
      });
      ctx.beginPath();
      ctx.moveTo(px - 14 * s, py + droop - 12 * s);
      ctx.lineTo(px + 14 * s, py + droop + 6 * s);
      ctx.stroke();
      if (tamed) { ctx.fillStyle = teal; ctx.font = "800 " + (10 * s) + "px 'JetBrains Mono', monospace";
        ctx.fillText("✓ kept", px, py + 26 * s); }
      break;
    }
    case "label": case "shifter": {
      /* a blocky stretched word-label */
      var w = (tamed ? r * 0.52 : r * 0.78) * (prop === "shifter" ? 0.85 : 1);
      blk(ctx, px - w / 2, py - 13 * s, w, 24 * s, 7 * s, tamed ? "#e8f6f4" : "#fff6d8",
        tamed ? teal : "#b08a1a", 3 * s);
      ctx.fillStyle = ink; ctx.font = "800 " + (11 * s) + "px 'JetBrains Mono', monospace";
      ctx.fillText(prop === "label" ? (tamed ? "0.9=0.90" : "0.095!") : "3142", px, py);
      if (!tamed) {
        ctx.strokeStyle = warn; ctx.lineWidth = 3.4 * s;
        ctx.beginPath(); ctx.moveTo(px - w * 0.36, py - 9 * s); ctx.lineTo(px - w * 0.16, py + 9 * s); ctx.stroke();
      }
      break;
    }
    case "twins": case "shapes": {
      /* two near-identical block tiles */
      [-1, 1].forEach(function (side) {
        var tx = px + side * 17 * s - 12 * s;
        blk(ctx, tx, py - 13 * s, 24 * s, 26 * s, 6 * s, tamed ? teal : "#3a82b0");
        /* two square eyes on each tile */
        blk(ctx, tx + 6 * s, py - 5 * s, 5 * s, 5 * s, 1.5 * s, "#F7FBFA");
        blk(ctx, tx + 15 * s, py - 5 * s, 5 * s, 5 * s, 1.5 * s, "#F7FBFA");
      });
      if (tamed) { ctx.strokeStyle = gold; ctx.lineWidth = 3 * s;
        ctx.beginPath(); ctx.arc(px, py + 2 * s, r * 0.30, 0, Math.PI * 2); ctx.stroke(); }
      break;
    }
    case "parrot": {
      /* a confident blocky claim-bird */
      ctx.fillStyle = tamed ? teal : warn;
      blk(ctx, px - 15 * s, py - 12 * s, 30 * s, 24 * s, 7 * s, tamed ? teal : warn);
      blk(ctx, px + 8 * s, py - 22 * s, 16 * s, 14 * s, 5 * s, tamed ? teal : warn);
      /* beak */
      ctx.fillStyle = "#f4c542";
      ctx.beginPath();
      ctx.moveTo(px + 23 * s, py - 17 * s); ctx.lineTo(px + 32 * s, py - 14 * s); ctx.lineTo(px + 23 * s, py - 11 * s);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#F7FBFA";
      if (tamed) {
        ctx.strokeStyle = "#F7FBFA"; ctx.lineWidth = 2.4 * s; ctx.lineCap = "round";
        ctx.beginPath(); ctx.arc(px + 16 * s, py - 15 * s, 3 * s, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
      } else {
        blk(ctx, px + 14 * s, py - 17 * s, 5 * s, 5 * s, 1.5 * s, "#F7FBFA");
      }
      break;
    }
    case "zeros": case "scales": case "wisp": case "muddler": {
      /* measure wisps it stirs (block dashes), corrected gold star when tamed */
      var col = tamed ? teal : "#8a93a4";
      ctx.lineCap = "round";
      for (var i = -1; i <= 1; i++) {
        ctx.strokeStyle = col; ctx.globalAlpha = tamed ? 0.95 : 0.55 - Math.abs(i) * 0.12;
        ctx.lineWidth = 4 * s;
        var wy = py + i * 9 * s;
        ctx.beginPath(); ctx.moveTo(px - 26 * s, wy);
        ctx.lineTo(px - 8 * s, wy + Math.sin(frame / 16 + i) * 2);
        ctx.moveTo(px + 8 * s, wy + Math.sin(frame / 16 + i) * 2);
        ctx.lineTo(px + 26 * s, wy);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      if (tamed && D) D.star8(ctx, px, py + r * 0.40, 9 * s, 1, gold, 2);
      break;
    }
    default: {
      blk(ctx, px - 12 * s, py - 12 * s, 24 * s, 24 * s, 6 * s, tamed ? teal : g.col[1]);
      ctx.fillStyle = "#F7FBFA"; ctx.font = "800 " + (14 * s) + "px 'JetBrains Mono', monospace";
      ctx.fillText(tamed ? "✓" : "?", px, py);
    }
  }
  ctx.restore();
}

if (typeof D !== "undefined" && D) {
  D.gremlin = drawGremlin;
  D.gremlinFor = gremlinFor;
  D.GREMLINS = GREMLINS;
}
window.drawGremlin = drawGremlin;
window.gremlinFor = gremlinFor;
window.GREMLINS = GREMLINS;
