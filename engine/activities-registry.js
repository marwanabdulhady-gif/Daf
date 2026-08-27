/**
 * engine/activities-registry.js
 * 
 * Maps lesson codes (1-1 through 17-10) to their corresponding Chapter
 * STEAM Activity, Manipulative, and AI-in-the-Loop challenge configuration,
 * with exact matching filenames (<lesson-file>-activity.html).
 */

const fs = require("fs");
const path = require("path");

function getActivityForLesson(lessonCode) {
  if (!lessonCode) return null;
  const norm = lessonCode.replace(".", "-");
  const parts = norm.split("-");
  const chNum = parseInt(parts[0], 10) || 13;

  const TOPIC_NAMES = {
    1: { title: "Place-Value Harbor: Interactive Census Chart", badge: "Chapter 01 · Place Value Lab", col: "#6042a6" },
    2: { title: "The Souq of Sums: Mental Math & Regrouping Simulator", badge: "Chapter 02 · Addition & Subtraction", col: "#6042a6" },
    3: { title: "Product Palm Grove: 1-Digit Area Model Lab", badge: "Chapter 03 · 1-Digit Multiplication", col: "#fa7e19" },
    4: { title: "The Tower of Times: 2-Digit Area Model Builder", badge: "Chapter 04 · 2-Digit Multiplication", col: "#fa7e19" },
    5: { title: "Division Dunes: Partial Quotients Sandbox", badge: "Chapter 05 · Division Strategies", col: "#fa7e19" },
    6: { title: "Caravan Crossroads: Multi-Step Strip Model Lab", badge: "Chapter 06 · Multi-Step Problem Solving", col: "#fa7e19" },
    7: { title: "Factor Reef: Factor Rainbow & Primes Explorer", badge: "Chapter 07 · Factors & Multiples", col: "#fa7e19" },
    8: { title: "The Fraction Isles: Equivalent Fraction Strips", badge: "Chapter 08 · Fraction Equivalence", col: "#2d70b3" },
    9: { title: "Kunafa Kitchens: Like Denominator Fraction Slicer", badge: "Chapter 09 · Fraction Addition", col: "#2d70b3" },
    10: { title: "The Scaling Strait: Whole Number × Fraction Lab", badge: "Chapter 10 · Fraction Multiplication", col: "#2d70b3" },
    11: { title: "The Pearl Ledger: Fractional Line Plot Studio", badge: "Chapter 11 · Line Plots", col: "#c74440" },
    12: { title: "Decimal Docks: Tenths & Hundredths Grid Tool", badge: "Chapter 12 · Decimal Place Value", col: "#c74440" },
    13: { title: "The Measure Market: Unit Equivalence & Boss Battle", badge: "Chapter 13 · Measurement Boss Battle", col: "#12857c" },
    14: { title: "Pattern Oasis: Sequence & Repeating Shapes Lab", badge: "Chapter 14 · Algebra Patterns", col: "#388c46" },
    15: { title: "Angle Heights: Interactive Protractor Studio", badge: "Chapter 15 · Angle Measurement", col: "#b3488f" },
    16: { title: "Geometry Gardens: Lines & Symmetry Studio", badge: "Chapter 16 · Geometry & Symmetry", col: "#b3488f" },
    17: { title: "Step-Up to Grade 5 & General Revision Arena", badge: "Chapter 17 · Extension Arena", col: "#0a5f58" }
  };

  const tInfo = TOPIC_NAMES[chNum] || TOPIC_NAMES[1];
  
  // Find matching activity file in html/activities
  let actFile = null;
  try {
    const actDir = path.resolve(__dirname, "..", "html", "activities");
    if (fs.existsSync(actDir)) {
      const files = fs.readdirSync(actDir);
      actFile = files.find(f => f.startsWith("lesson-" + norm + "-") && f.endsWith("-activity.html")) || null;
    }
  } catch (e) {}

  return {
    id: "lesson-" + norm + "-activity",
    title: tInfo.title,
    badge: tInfo.badge,
    description: "Interactive STEAM Activity Lab with live manipulative sandbox and Stage 5 AI-in-the-loop defense prompts.",
    file: actFile,
    col: tInfo.col
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getActivityForLesson
  };
}
