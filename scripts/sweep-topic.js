const puppeteer = require("puppeteer");
const fs = require("fs"), path = require("path");
(async () => {
  const pref = "lesson-" + process.argv[2] + "-";
  const files = fs.readdirSync("html").filter(f => f.startsWith(pref)).sort();
  const b = await puppeteer.launch({ args: ["--no-sandbox"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 810 });
  let all = [];
  p.on("pageerror", e => all.push("PAGEERROR " + e.message));
  p.on("console", m => { if (m.type() === "error") all.push("CONSOLE " + m.text().slice(0, 120)); });
  const wait = ms => new Promise(r => setTimeout(r, ms));
  for (const f of files) {
    const before = all.length;
    const src = fs.readFileSync(path.join("html", f), "utf8");
    const total = (src.match(/^\s*\{?\s*phase: "/gm) || []).length;
    let painted = 0, maths = 0, canv = 0;
    for (let s = 0; s < total; s++) {
      await p.goto("file://" + path.resolve("html", f) + "?slide=" + s, { waitUntil: "networkidle2", timeout: 60000 });
      /* board mode: step through the section gate and the attendance gate */
      await new Promise(r => setTimeout(r, 350));
      await p.evaluate(() => {
        const pick = document.querySelector(".gate-sections .btn");
        if (pick) pick.click();
      });
      await new Promise(r => setTimeout(r, 250));
      await p.evaluate(() => {
        const start = [...document.querySelectorAll(".gate-card .btn")]
          .find(b => /Start the lesson/.test(b.textContent));
        if (start) start.click();
      });
      await wait(1100);
      const i = await p.evaluate(() => ({
        h1: !!document.querySelector("h1"),
        m: document.querySelectorAll("math").length,
        c: document.querySelectorAll("canvas:not(.ambient)").length
      }));
      if (i.h1) painted++; maths += i.m; canv += i.c;
      await p.evaluate(() => document.querySelectorAll(".visual .glass-card, .visual .btn").forEach(e => { try { e.click(); } catch (x) {} }));
      await wait(300);
    }
    const errs = all.length - before;
    console.log(`${errs ? "FAIL" : "PASS"}  ${f.replace(/^lesson-|\.html$/g, "").padEnd(52)} ${painted}/${total} screens · ${maths} MathML · ${canv} canvases`);
  }
  console.log(all.length ? "\n" + [...new Set(all)].join("\n") : "\nNO CONSOLE ERRORS");
  await b.close();
})();
