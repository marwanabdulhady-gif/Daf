const puppeteer = require("puppeteer");
const fs = require("fs"), path = require("path");
(async () => {
  const files = fs.readdirSync("html").filter(f => f.endsWith(".html")).sort();
  const b = await puppeteer.launch({ args: ["--no-sandbox"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 810 });
  let allErrs = [];
  p.on("pageerror", e => allErrs.push("PAGEERROR: " + e.message));
  p.on("console", m => { if (m.type() === "error") allErrs.push("CONSOLE: " + m.text().slice(0, 150)); });
  const wait = ms => new Promise(r => setTimeout(r, ms));

  for (const f of files) {
    const url = "file://" + path.resolve("html", f);
    const before = allErrs.length;
    let painted = 0, maths = 0, canvases = 0;
    for (let s = 0; s < 10; s++) {
      await p.goto(url + "?slide=" + s, { waitUntil: "networkidle2", timeout: 60000 });
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
      await wait(1300);
      const info = await p.evaluate(() => ({
        h1: !!document.querySelector("h1"),
        m: document.querySelectorAll("math").length,
        c: document.querySelectorAll("canvas:not(.ambient)").length,
        // every interactive control must be clickable without throwing
        btns: document.querySelectorAll(".glass-card, .btn").length
      }));
      if (info.h1) painted++;
      maths += info.m; canvases += info.c;
      // click every card/button on the screen
      await p.evaluate(() => {
        document.querySelectorAll(".visual .glass-card, .visual .btn").forEach(el => { try { el.click(); } catch (e) {} });
      });
      await wait(400);
    }
    const errs = allErrs.length - before;
    console.log(`${errs === 0 ? "PASS" : "FAIL"}  ${f.padEnd(52)} screens painted ${painted}/10 · ${maths} MathML · ${canvases} canvases · ${errs} errors`);
  }
  console.log(allErrs.length ? "\n" + [...new Set(allErrs)].join("\n") : "\nNO CONSOLE ERRORS ACROSS ALL LESSONS");
  await b.close();
})();
