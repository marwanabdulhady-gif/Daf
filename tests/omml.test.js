const { DOMParser } = require("@xmldom/xmldom");
globalThis.__DAF_XML_PARSER__ = (xml) => new DOMParser().parseFromString(xml, "text/xml");
const DAFMath = require("../engine/omml.js");

const M = 'xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"';

const cases = [
  ["simple fraction 3/4",
    `<m:oMath ${M}><m:f><m:num><m:r><m:t>3</m:t></m:r></m:num><m:den><m:r><m:t>4</m:t></m:r></m:den></m:f></m:oMath>`,
    ["<mfrac>", "<mn>3</mn>", "<mn>4</mn>"]],

  ["mixed number 2 1/3",
    `<m:oMath ${M}><m:r><m:t>2</m:t></m:r><m:f><m:num><m:r><m:t>1</m:t></m:r></m:num><m:den><m:r><m:t>3</m:t></m:r></m:den></m:f></m:oMath>`,
    ["<mn>2</mn><mfrac>"]],

  ["skewed fraction",
    `<m:oMath ${M}><m:f><m:fPr><m:type m:val="skw"/></m:fPr><m:num><m:r><m:t>1</m:t></m:r></m:num><m:den><m:r><m:t>2</m:t></m:r></m:den></m:f></m:oMath>`,
    ['bevelled="true"']],

  ["linear fraction",
    `<m:oMath ${M}><m:f><m:fPr><m:type m:val="lin"/></m:fPr><m:num><m:r><m:t>a</m:t></m:r></m:num><m:den><m:r><m:t>b</m:t></m:r></m:den></m:f></m:oMath>`,
    ["<mo>/</mo>"]],

  ["square root",
    `<m:oMath ${M}><m:rad><m:radPr><m:degHide m:val="1"/></m:radPr><m:deg/><m:e><m:r><m:t>49</m:t></m:r></m:e></m:rad></m:oMath>`,
    ["<msqrt>", "<mn>49</mn>"]],

  ["cube root",
    `<m:oMath ${M}><m:rad><m:deg><m:r><m:t>3</m:t></m:r></m:deg><m:e><m:r><m:t>x</m:t></m:r></m:e></m:rad></m:oMath>`,
    ["<mroot>"]],

  ["exponent x^2",
    `<m:oMath ${M}><m:sSup><m:e><m:r><m:t>x</m:t></m:r></m:e><m:sup><m:r><m:t>2</m:t></m:r></m:sup></m:sSup></m:oMath>`,
    ["<msup>", "<mi>x</mi>"]],

  ["subscript a_n",
    `<m:oMath ${M}><m:sSub><m:e><m:r><m:t>a</m:t></m:r></m:e><m:sub><m:r><m:t>n</m:t></m:r></m:sub></m:sSub></m:oMath>`,
    ["<msub>"]],

  ["summation",
    `<m:oMath ${M}><m:nary><m:naryPr><m:chr m:val="∑"/><m:limLoc m:val="undOvr"/></m:naryPr><m:sub><m:r><m:t>i=1</m:t></m:r></m:sub><m:sup><m:r><m:t>n</m:t></m:r></m:sup><m:e><m:r><m:t>i</m:t></m:r></m:e></m:nary></m:oMath>`,
    ["<munderover>", "∑"]],

  ["delimiter (x+1)",
    `<m:oMath ${M}><m:d><m:e><m:r><m:t>x+1</m:t></m:r></m:e></m:d></m:oMath>`,
    ['fence="true"', "<mo>+</mo>"]],

  ["matrix 2x2",
    `<m:oMath ${M}><m:m><m:mr><m:e><m:r><m:t>1</m:t></m:r></m:e><m:e><m:r><m:t>2</m:t></m:r></m:e></m:mr><m:mr><m:e><m:r><m:t>3</m:t></m:r></m:e><m:e><m:r><m:t>4</m:t></m:r></m:e></m:mr></m:m></m:oMath>`,
    ["<mtable>", "<mtr>", "<mtd>"]],

  ["function sin(x)",
    `<m:oMath ${M}><m:func><m:fName><m:r><m:t>sin</m:t></m:r></m:fName><m:e><m:r><m:t>x</m:t></m:r></m:e></m:func></m:oMath>`,
    ["<mi>sin</mi>"]],

  ["bare fragment (no oMath wrapper)",
    `<m:f ${M}><m:num><m:r><m:t>5</m:t></m:r></m:num><m:den><m:r><m:t>8</m:t></m:r></m:den></m:f>`,
    ["<mfrac>", "<mn>5</mn>"]],

  ["no namespace declared at all",
    `<m:oMath><m:f><m:num><m:r><m:t>7</m:t></m:r></m:num><m:den><m:r><m:t>10</m:t></m:r></m:den></m:f></m:oMath>`,
    ["<mfrac>", "<mn>7</mn>", "<mn>10</mn>"]],

  ["minus normalised to U+2212",
    `<m:oMath ${M}><m:r><m:t>5-3</m:t></m:r></m:oMath>`,
    ["<mo>\u2212</mo>"]],

  ["normal text run",
    `<m:oMath ${M}><m:r><m:rPr><m:nor/></m:rPr><m:t>area</m:t></m:r></m:oMath>`,
    ["<mtext>area</mtext>"]],

  ["word inside math is a normal-text run",
    `<m:oMath ${M}><m:r><m:rPr><m:nor/></m:rPr><m:t>total cost</m:t></m:r><m:r><m:t>=30</m:t></m:r></m:oMath>`,
    ["<mtext>total cost</mtext>", "<mn>30</mn>"]],

  ["multi-letter variable splits into separate mi (Word behaviour)",
    `<m:oMath ${M}><m:r><m:t>kx</m:t></m:r></m:oMath>`,
    ["<mi>k</mi><mi>x</mi>"]],

  ["prescript via sPre",
    `<m:oMath ${M}><m:sPre><m:sub><m:r><m:t>1</m:t></m:r></m:sub><m:sup><m:r><m:t>2</m:t></m:r></m:sup><m:e><m:r><m:t>X</m:t></m:r></m:e></m:sPre></m:oMath>`,
    ["<mmultiscripts>", "<mprescripts/>"]],

  ["grouping character renders as munder",
    `<m:oMath ${M}><m:groupChr><m:groupChrPr><m:chr m:val="\u23df"/></m:groupChrPr><m:e><m:r><m:t>x+y</m:t></m:r></m:e></m:groupChr></m:oMath>`,
    ["<munder>"]],

  ["equation array",
    `<m:oMath ${M}><m:eqArr><m:e><m:r><m:t>x=1</m:t></m:r></m:e><m:e><m:r><m:t>y=2</m:t></m:r></m:e></m:eqArr></m:oMath>`,
    ['columnalign="left"']],

  ["nested fraction in fraction",
    `<m:oMath ${M}><m:f><m:num><m:f><m:num><m:r><m:t>1</m:t></m:r></m:num><m:den><m:r><m:t>2</m:t></m:r></m:den></m:f></m:num><m:den><m:r><m:t>3</m:t></m:r></m:den></m:f></m:oMath>`,
    ["<mfrac><mrow><mfrac>"]],

  ["malformed omml degrades safely",
    `<m:oMath ${M}><m:f><m:num>`,
    ["daf-math-error"]],
];

let pass = 0, fail = 0;
for (const [name, omml, expects] of cases) {
  const out = DAFMath.toMathML(omml, { display: "inline" });
  const missing = expects.filter((e) => !out.includes(e));
  if (missing.length === 0) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + "\n        missing: " + JSON.stringify(missing) + "\n        got: " + out); }
}

// ENGLISH EDITION: digits must stay western even if a caller asks otherwise
const west = DAFMath.toMathML(`<m:oMath ${M}><m:f><m:num><m:r><m:t>3</m:t></m:r></m:num><m:den><m:r><m:t>4</m:t></m:r></m:den></m:f></m:oMath>`, { numerals: "arabic" });
if (west.includes("<mn>3</mn>") && !/[\u0660-\u0669]/.test(west)) { pass++; console.log("  PASS  digits stay western (english edition)"); }
else { fail++; console.log("  FAIL  digits stay western -> " + west); }

// the renderer itself must contain no arabic-script support
const fsrc = require("fs").readFileSync(__dirname + "/../engine/omml.js", "utf8");
if (!/[\u0600-\u06FF]/.test(fsrc) && !/dir="rtl"/.test(fsrc)) { pass++; console.log("  PASS  renderer source is arabic-free"); }
else { fail++; console.log("  FAIL  renderer source still carries arabic/RTL support"); }

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
