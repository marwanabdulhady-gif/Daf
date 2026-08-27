/**
 * scripts/organize.js
 * 
 * Organizes the Grade 4 Mathematics curriculum, interactive lessons,
 * and STEAM activities into dedicated Chapters and Weekly Schedule folders
 * for Academic Year 2026 - 2027.
 * 
 * Ensures:
 * - Activity files have matching naming: <lesson-name>-activity.html
 * - Full Dar Al Fikr styling and structure
 * - Clean sync across chapters/ and weeks/
 */

const fs = require("fs");
const path = require("path");

// Run build-activities first to ensure all 115 activity files are fresh
require("./build-activities");

const ROOT = path.resolve(__dirname, "..");
const cur = JSON.parse(fs.readFileSync(path.join(ROOT, "curriculum.json"), "utf8"));
const htmlFiles = fs.readdirSync(path.join(ROOT, "html")).filter(f => f.endsWith(".html") && !f.endsWith("-activity.html"));
const lessonFiles = fs.readdirSync(path.join(ROOT, "lessons")).filter(f => f.endsWith(".jsx"));
const activitiesDir = path.join(ROOT, "html", "activities");
const activityFiles = fs.existsSync(activitiesDir) ? fs.readdirSync(activitiesDir).filter(f => f.endsWith("-activity.html")) : [];

function getHtmlFile(code) {
  const norm = code.replace(".", "-");
  return htmlFiles.find(f => f.startsWith(`lesson-${norm}-`));
}

function getJsxFile(code) {
  const norm = code.replace(".", "-");
  return lessonFiles.find(f => f === `${norm}.jsx`);
}

function getActivityFile(code) {
  const norm = code.replace(".", "-");
  return activityFiles.find(f => f.startsWith(`lesson-${norm}-`) && f.endsWith("-activity.html"));
}

function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function sanitizeFolderName(name) {
  return name
    .replace(/[:,]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "");
}

// 16 Chapters definition (+ Topic 17 extension)
const CHAPTERS = [
  { n: 1, title: "Generalize Place Value Understanding" },
  { n: 2, title: "Fluently Add and Subtract Multi-Digit Whole Numbers" },
  { n: 3, title: "Use Strategies and Properties to Multiply by 1-Digit Numbers" },
  { n: 4, title: "Use Strategies and Properties to Multiply by 2-Digit Numbers" },
  { n: 5, title: "Use Strategies and Properties to Divide by 1-Digit Numbers" },
  { n: 6, title: "Use Operations with Whole Numbers to Solve Problems" },
  { n: 7, title: "Factors and Multiples" },
  { n: 8, title: "Extend Understanding of Fraction Equivalence and Ordering" },
  { n: 9, title: "Understand Addition and Subtraction of Fractions" },
  { n: 10, title: "Extend Multiplication Concepts to Fractions" },
  { n: 11, title: "Represent and Interpret Data on Line Plots" },
  { n: 12, title: "Understand and Compare Decimals" },
  { n: 13, title: "Measurement: Find Equivalence in Units of Measure" },
  { n: 14, title: "Algebra: Generate and Analyze Patterns" },
  { n: 15, title: "Geometric Measurement: Understand Concepts of Angles and Angle Measurement" },
  { n: 16, title: "Lines, Angles, and Shapes" },
  { n: 17, title: "Step-Up to Grade 5" }
];

// Semester 1 (2026 - 2027)
const SEMESTER_1 = [
  {
    week: 1,
    title: "Orientation, Reinforcement & Diagnostic Assessment",
    folderName: "Week-01-Orientation-Reinforcement-Diagnostic-Assessment",
    lessons: [],
    activities: [
      "Orientation & Classroom Routines",
      "Reinforcement of Prerequisite Skills",
      "Diagnostic Assessment (Math Gap Map & Readiness)"
    ]
  },
  {
    week: 2,
    title: "Numbers Through One Million, Place Value & Comparing Whole Numbers",
    folderName: "Week-02-Place-Value-Through-One-Million",
    lessons: ["1.1", "1.2", "1.3"]
  },
  {
    week: 3,
    title: "Rounding Whole Numbers & Finding Sums/Differences with Mental Math",
    folderName: "Week-03-Rounding-and-Mental-Sums",
    lessons: ["1.4", "2.1"]
  },
  {
    week: 4,
    title: "Estimating Sums/Differences & Adding Multi-Digit Whole Numbers",
    folderName: "Week-04-Estimating-and-Adding-Whole-Numbers",
    lessons: ["2.2", "2.3", "2.4"]
  },
  {
    week: 5,
    title: "Subtracting Whole Numbers, Greater Numbers & Subtracting Across Zeros",
    folderName: "Week-05-Subtracting-Whole-and-Greater-Numbers",
    lessons: ["2.5", "2.6", "2.7"]
  },
  {
    week: 6,
    title: "Multiplying Multiples of 10, 100, 1000, Estimating Products & Arrays",
    folderName: "Week-06-Multiplication-by-10-100-1000-and-Arrays",
    lessons: ["3.1", "3.2", "3.3"]
  },
  {
    week: 7,
    title: "Area Models, Mental Math Multiplication & Problem Solving (Model with Math)",
    folderName: "Week-07-Area-Models-Mental-Math-and-Modeling",
    lessons: ["3.4", "3.6", "3.8"]
  },
  {
    week: 8,
    title: "Multiplying Multiples of 10, 2-Digit Models & Rounding/Compatible Estimation",
    folderName: "Week-08-Multiplying-2-Digit-Numbers",
    lessons: ["4.1", "4.2", "4.3"]
  },
  {
    week: 9,
    title: "Area Models / Partial Products & Mental Math Quotients / Estimates",
    folderName: "Week-09-Area-Models-and-Mental-Division",
    lessons: ["4.5", "5.1", "5.2"]
  },
  {
    week: 10,
    title: "Estimating Greater Dividends, Interpreting Remainders & Partial Quotients",
    folderName: "Week-10-Remainders-and-Partial-Quotients",
    lessons: ["5.3", "5.4", "5.5"]
  },
  {
    week: 11,
    title: "Partial Quotients (Greater Dividends) & Solving Comparison Problems",
    folderName: "Week-11-Greater-Dividends-and-Comparison-Problems",
    lessons: ["5.6", "6.1", "6.2"]
  },
  {
    week: 12,
    title: "Multi-Step Problem Modeling, Solving & Perseverance",
    folderName: "Week-12-Multi-Step-Problem-Solving",
    lessons: ["6.3", "6.5", "6.6"]
  },
  {
    week: 13,
    title: "Understanding Factors, Finding Factors & Repeated Reasoning",
    folderName: "Week-13-Understanding-Factors-and-Reasoning",
    lessons: ["7.1", "7.2", "7.3"]
  },
  {
    week: 14,
    title: "Prime and Composite Numbers & Multiples",
    folderName: "Week-14-Prime-Composite-and-Multiples",
    lessons: ["7.4", "7.5"]
  },
  {
    week: 15,
    title: "Equivalent Fractions (Area Models, Number Lines & Multiplication)",
    folderName: "Week-15-Equivalent-Fractions-Area-and-Number-Lines",
    lessons: ["8.1", "8.2", "8.3"]
  },
  {
    week: 16,
    title: "Equivalent Fractions (Division, Benchmarks & Comparing Fractions)",
    folderName: "Week-16-Equivalent-Fractions-Division-and-Comparing",
    lessons: ["8.4", "8.5", "8.6"]
  },
  {
    week: 17,
    title: "General Revision",
    folderName: "Week-17-General-Revision",
    lessons: [],
    activities: [
      "Comprehensive Semester 1 Review (Chapters 1 - 8)",
      "Focus Areas: Place Value, Whole Number Operations, Multiplication, Division, Factors & Fractions",
      "Interactive Review Decks & Formative Practice"
    ]
  },
  {
    week: 18,
    title: "General Revision",
    folderName: "Week-18-General-Revision",
    lessons: [],
    activities: [
      "Mastery Practice & Mock Assessment",
      "Individualized Intervention / IXL Skill Reinforcement",
      "Exam Preparation & Problem Solving Defense"
    ]
  },
  {
    week: 19,
    title: "SEMESTER 1 - FINAL EXAMINATIONS",
    folderName: "Week-19-Final-Examinations",
    lessons: [],
    activities: [
      "Semester 1 Final Examinations Administration",
      "Mastery Gate & Summative Assessment Evaluation"
    ]
  }
];

// Semester 2 (2026 - 2027)
const SEMESTER_2 = [
  {
    week: 1,
    title: "Equivalent Fractions (Area Models, Number Lines & Multiplication)",
    folderName: "Week-01-Fraction-Equivalence-Multiplication",
    lessons: ["8.1", "8.2", "8.3"]
  },
  {
    week: 2,
    title: "Equivalent Fractions (Division, Benchmarks & Comparing Fractions)",
    folderName: "Week-02-Equivalent-Fractions-Division-Comparing",
    lessons: ["8.4", "8.5", "8.6"]
  },
  {
    week: 3,
    title: "Model Addition of Fractions, Decompose Fractions & Add Like Denominators",
    folderName: "Week-03-Fraction-Addition-and-Decomposition",
    lessons: ["9.1", "9.2", "9.3"]
  },
  {
    week: 4,
    title: "Subtract Like Denominators, Add/Subtract Fractions & Mixed Numbers Modeling",
    folderName: "Week-04-Subtracting-Fractions-and-Mixed-Numbers",
    lessons: ["9.5", "9.6", "9.7"]
  },
  {
    week: 5,
    title: "Add Mixed Numbers, Subtract Mixed Numbers & Fractions as Multiples of Unit Fractions",
    folderName: "Week-05-Mixed-Numbers-and-Unit-Fractions",
    lessons: ["9.8", "9.9", "10.1"]
  },
  {
    week: 6,
    title: "Multiplying Fractions by Whole Numbers (Models & Symbols) & Time Problems",
    folderName: "Week-06-Multiplying-Fractions-and-Time-Problems",
    lessons: ["10.2", "10.3", "10.4"]
  },
  {
    week: 7,
    title: "Reading Line Plots, Making Line Plots & Using Line Plots to Solve Problems",
    folderName: "Week-07-Line-Plots",
    lessons: ["11.1", "11.2", "11.3"]
  },
  {
    week: 8,
    title: "Critique Reasoning & Fractions and Decimals (Representation & Number Lines)",
    folderName: "Week-08-Critique-Reasoning-and-Fractions-to-Decimals",
    lessons: ["11.4", "12.1", "12.2"]
  },
  {
    week: 9,
    title: "Comparing Decimals, Denominators of 10 and 100 & Word Problems with Money",
    folderName: "Week-09-Comparing-Decimals-Tenths-Hundredths-Money",
    lessons: ["12.3", "12.4", "12.5"]
  },
  {
    week: 10,
    title: "Decimal Structure & Equivalence with Customary Units (Length & Capacity)",
    folderName: "Week-10-Decimal-Structure-and-Customary-Length-Capacity",
    lessons: ["12.6", "13.1", "13.2"]
  },
  {
    week: 11,
    title: "Customary Weight & Metric Units (Length, Capacity and Mass)",
    folderName: "Week-11-Units-of-Weight-Metric-Length-Capacity-Mass",
    lessons: ["13.3", "13.4", "13.5"]
  },
  {
    week: 12,
    title: "Perimeter & Area Problems, Number Sequences & Number Rules",
    folderName: "Week-12-Perimeter-Area-Sequences-and-Number-Rules",
    lessons: ["13.6", "14.1", "14.2"]
  },
  {
    week: 13,
    title: "Repeating Shapes Patterns, Lines/Rays/Angles & Understanding Angles",
    folderName: "Week-13-Repeating-Shapes-and-Angle-Concepts",
    lessons: ["14.3", "15.1", "15.2"]
  },
  {
    week: 14,
    title: "Measure and Draw Angles & Add/Subtract Angle Measures",
    folderName: "Week-14-Measuring-Drawing-Adding-Subtracting-Angles",
    lessons: ["15.4", "15.5"]
  },
  {
    week: 15,
    title: "Lines & Classifying Triangles and Quadrilaterals",
    folderName: "Week-15-Lines-Triangles-and-Quadrilaterals",
    lessons: ["16.1", "16.2", "16.3"]
  },
  {
    week: 16,
    title: "Line Symmetry & Drawing Shapes with Line Symmetry",
    folderName: "Week-16-Line-Symmetry",
    lessons: ["16.4", "16.5"]
  },
  {
    week: 17,
    title: "General Revision",
    folderName: "Week-17-General-Revision",
    lessons: [],
    activities: [
      "Comprehensive Semester 2 Review (Chapters 8 - 16)",
      "Focus Areas: Fractions, Decimals, Measurement, Patterns & Geometry",
      "Interactive Review Decks & Formative Practice"
    ]
  },
  {
    week: 18,
    title: "General Revision",
    folderName: "Week-18-General-Revision",
    lessons: [],
    activities: [
      "Mastery Practice & Mock Assessment",
      "Individualized Intervention / IXL Skill Reinforcement",
      "Exam Preparation & Shape/Angle Problem Solving"
    ]
  },
  {
    week: 19,
    title: "SEMESTER 2 - FINAL EXAMINATIONS",
    folderName: "Week-19-Final-Examinations",
    lessons: [],
    activities: [
      "Semester 2 Final Examinations Administration",
      "Mastery Gate & End of Year Assessment Evaluation"
    ]
  }
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFileSafe(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

// Clean old files matching pattern
function cleanOldFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    if (item.startsWith("activity-ch") || item.startsWith("activity-sem") || item.startsWith("activity-week")) {
      try { fs.unlinkSync(path.join(dir, item)); } catch(e) {}
    }
  });
}

const topicMap = {};
cur.topics.forEach(t => {
  topicMap[t.n] = t;
});

// Build CHAPTERS folder hierarchy
console.log("Creating chapters/ folder structure and distributing lessons & matching activities...");
const chaptersDir = path.join(ROOT, "chapters");
ensureDir(chaptersDir);

let chaptersReadme = `# Grade 4 Mathematics — Chapters Organization\n\n`;
chaptersReadme += `This directory organizes all Savvas enVision Grade 4 mathematics interactive lessons and STEAM activities by Chapter (Chapters 1 to 16, plus Grade 5 Step-Up Topic 17).\n\n`;
chaptersReadme += `| Chapter | Title | Lessons | Interactive Decks | Activities Included |\n`;
chaptersReadme += `|---|---|---|---|---|\n`;

CHAPTERS.forEach(ch => {
  const folderName = `Chapter-${pad2(ch.n)}-${sanitizeFolderName(ch.title)}`;
  const chDir = path.join(chaptersDir, folderName);
  ensureDir(chDir);
  cleanOldFiles(chDir);

  const topicData = topicMap[ch.n];
  const topicLessons = topicData ? topicData.lessons : [];
  const boss = (cur.bosses || []).find(b => b.topic === ch.n);

  let readme = `# Chapter ${ch.n}: ${ch.title}\n\n`;
  readme += `**Savvas enVision Mathematics (Grade 4) — Dar Al Fikr Schools (Academic Year 2026 - 2027)**\n\n`;
  if (topicData && topicData.standards) {
    readme += `**Standards:** \`${topicData.standards}\`\n\n`;
  }
  readme += `## Lessons & Interactive Activities in this Chapter\n\n`;
  readme += `| Lesson Code | Lesson Title | Standard | IXL Codes | Lesson Slide Deck | STEAM Activity Lab |\n`;
  readme += `|---|---|---|---|---|---|\n`;

  topicLessons.forEach(l => {
    const htmlFile = getHtmlFile(l.code);
    const jsxFile = getJsxFile(l.code);
    const actFile = getActivityFile(l.code);

    if (htmlFile) copyFileSafe(path.join(ROOT, "html", htmlFile), path.join(chDir, htmlFile));
    if (jsxFile) copyFileSafe(path.join(ROOT, "lessons", jsxFile), path.join(chDir, jsxFile));
    if (actFile) copyFileSafe(path.join(activitiesDir, actFile), path.join(chDir, actFile));

    const htmlLink = htmlFile ? `[\`${htmlFile}\`](${htmlFile})` : "—";
    const actLink = actFile ? `[\`${actFile}\`](${actFile})` : "—";
    const ixlCodes = (l.ixl || []).join(" · ") || "—";
    readme += `| **${l.code}** | ${l.title} | \`${l.standard || topicData.standards || "—"}\` | ${ixlCodes} | ${htmlLink} | ${actLink} |\n`;
  });

  if (boss) {
    const bossHtml = getHtmlFile(boss.code);
    const bossJsx = getJsxFile(boss.code);
    const bossAct = getActivityFile(boss.code);
    if (bossHtml) copyFileSafe(path.join(ROOT, "html", bossHtml), path.join(chDir, bossHtml));
    if (bossJsx) copyFileSafe(path.join(ROOT, "lessons", bossJsx), path.join(chDir, bossJsx));
    if (bossAct) copyFileSafe(path.join(activitiesDir, bossAct), path.join(chDir, bossAct));
    readme += `| **BOSS** | ${boss.title || boss.name} | Review Battle | — | [\`${bossHtml}\`](${bossHtml}) | [\`${bossAct}\`](${bossAct}) |\n`;
  }

  readme += `\n## How to Open\n\n`;
  readme += `- **Lesson Slides**: Open any \`lesson-*.html\` file directly in your browser for the full 7-stage interactive lesson.\n`;
  readme += `- **Activity Labs**: Open any \`lesson-*-activity.html\` file directly for the dedicated STEAM production sandbox and manipulative.\n`;

  fs.writeFileSync(path.join(chDir, "README.md"), readme);

  chaptersReadme += `| [**Chapter ${ch.n}**](./${folderName}) | ${ch.title} | ${topicLessons.length} lessons | Interactive HTML & JSX | Matching \`*-activity.html\` Decks |\n`;
});

fs.writeFileSync(path.join(chaptersDir, "README.md"), chaptersReadme);

// Build WEEKS folder hierarchy
console.log("Creating weeks/ folder structure and distributing scheduled lessons & activities...");
const weeksDir = path.join(ROOT, "weeks");
ensureDir(weeksDir);

const s1Dir = path.join(weeksDir, "Semester-1");
const s2Dir = path.join(weeksDir, "Semester-2");
ensureDir(s1Dir);
ensureDir(s2Dir);

let weeksReadme = `# Grade 4 Mathematics — Weekly Curriculum Distribution (2026 - 2027)\n\n`;
weeksReadme += `Organized by Semester and Week according to the Math Department Curriculum Distribution for Academic Year **2026 - 2027**:\n\n`;
weeksReadme += `- **[Semester 1 (2026 - 2027)](./Semester-1)**: Weeks 1 to 19 (Place value, Addition/Subtraction, Multiplication, Division, Factors, Equivalent Fractions)\n`;
weeksReadme += `- **[Semester 2 (2026 - 2027)](./Semester-2)**: Weeks 1 to 19 (Fractions, Decimals, Measurement, Patterns, Geometry & Angles)\n\n`;

// Helper to write semester week folder
function buildSemesterWeeks(semesterList, semesterDir, semesterName, academicYear) {
  let semReadme = `# Math Department Curriculum Distribution — ${semesterName} (${academicYear})\n\n`;
  semReadme += `**Savvas enVision Mathematics — Grade 4 · Dar Al Fikr Schools**\n\n`;
  semReadme += `| Week | Title | Lessons Scheduled | Lesson Decks & Activity Labs | Folder Link |\n`;
  semReadme += `|---|---|---|---|---|\n`;

  semesterList.forEach(w => {
    const weekFolder = path.join(semesterDir, w.folderName);
    ensureDir(weekFolder);
    cleanOldFiles(weekFolder);

    let weekDoc = `# ${semesterName} — Week ${w.week}: ${w.title}\n\n`;
    weekDoc += `**Academic Year:** ${academicYear}  \n`;
    weekDoc += `**Department:** Mathematics · Grade 4  \n\n`;

    if (w.lessons && w.lessons.length > 0) {
      weekDoc += `## Lessons & STEAM Activities Scheduled\n\n`;
      weekDoc += `| Lesson Code | Lesson Title | Chapter | Standard | IXL Codes | Lesson Slide Deck | STEAM Activity Lab |\n`;
      weekDoc += `|---|---|---|---|---|---|---|\n`;

      w.lessons.forEach(code => {
        const norm = code.replace(".", "-");
        const parts = norm.split("-");
        const chNum = parseInt(parts[0], 10);
        const tData = topicMap[chNum];
        const lData = tData ? tData.lessons.find(l => l.code === norm || l.code === code) : null;
        const lTitle = lData ? lData.title : code;
        const lStd = lData ? (lData.standard || tData.standards) : "—";
        const lIxl = (lData && lData.ixl) ? lData.ixl.join(" · ") : "—";

        const htmlFile = getHtmlFile(code);
        const jsxFile = getJsxFile(code);
        const actFile = getActivityFile(code);

        if (htmlFile) copyFileSafe(path.join(ROOT, "html", htmlFile), path.join(weekFolder, htmlFile));
        if (jsxFile) copyFileSafe(path.join(ROOT, "lessons", jsxFile), path.join(weekFolder, jsxFile));
        if (actFile) copyFileSafe(path.join(activitiesDir, actFile), path.join(weekFolder, actFile));

        const htmlLink = htmlFile ? `[\`${htmlFile}\`](${htmlFile})` : "—";
        const actLink = actFile ? `[\`${actFile}\`](${actFile})` : "—";
        weekDoc += `| **${code}** | ${lTitle} | Chapter ${chNum} | \`${lStd}\` | ${lIxl} | ${htmlLink} | ${actLink} |\n`;
      });
    }

    if (w.activities && w.activities.length > 0) {
      weekDoc += `## Focus Activities & Review\n\n`;
      w.activities.forEach(act => {
        weekDoc += `- **${act}**\n`;
      });
      weekDoc += `\n`;
    }

    weekDoc += `\n## Instructions for Teachers & Students\n\n`;
    weekDoc += `- **Interactive Slides:** Launch the \`lesson-*.html\` file in any browser for class presentation and student exploration.\n`;
    weekDoc += `- **STEAM Activity Labs:** Launch \`lesson-*-activity.html\` for the dedicated interactive sandbox and student build tasks.\n`;

    fs.writeFileSync(path.join(weekFolder, "README.md"), weekDoc);

    const lessonsSummary = w.lessons.length > 0 ? w.lessons.map(l => `Lesson ${l}`).join(", ") : (w.activities || []).join(", ");
    semReadme += `| **Week ${w.week}** | ${w.title} | ${lessonsSummary} | Interactive Slides & Activity Labs | [Open Folder](./${w.folderName}) |\n`;
  });

  fs.writeFileSync(path.join(semesterDir, "README.md"), semReadme);
}

buildSemesterWeeks(SEMESTER_1, s1Dir, "Semester 1", "2026 - 2027");
buildSemesterWeeks(SEMESTER_2, s2Dir, "Semester 2", "2026 - 2027");
fs.writeFileSync(path.join(weeksDir, "README.md"), weeksReadme);

// Build top-level CURRICULUM_DISTRIBUTION.md
console.log("Generating CURRICULUM_DISTRIBUTION.md...");
let masterDoc = `# Savvas enVision Grade 4 Mathematics — Curriculum Distribution & Lesson Organization (2026 - 2027)\n\n`;
masterDoc += `**Dar Al Fikr Schools · Math Department · Academic Year 2026 - 2027**\n\n`;
masterDoc += `This repository provides complete lesson decks and matching STEAM activity labs arranged into three structured views:\n`;
masterDoc += `1. **[Chapters Directory (1 to 16)](chapters/README.md)** — All 16 core chapters, Topic 17 Step-Up, slide decks, and matching \`*-activity.html\` labs.\n`;
masterDoc += `2. **[Weekly Schedules Directory (2026 - 2027)](weeks/README.md)** — Distributed into Semester 1 and Semester 2 (Weeks 1 to 19).\n`;
masterDoc += `3. **[Interactive Activities Directory](html/activities/README.md)** — All 115 matching standalone interactive activity decks.\n\n`;

masterDoc += `## Table of Contents\n\n`;
masterDoc += `- [1. Chapters Overview (Chapters 1 to 16)](#1-chapters-overview)\n`;
masterDoc += `- [2. Semester 1 Distribution (2026 - 2027)](#2-semester-1-distribution-2026---2027)\n`;
masterDoc += `- [3. Semester 2 Distribution (2026 - 2027)](#3-semester-2-distribution-2026---2027)\n\n`;

masterDoc += `## 1. Chapters Overview\n\n`;
masterDoc += `| Chapter | Chapter Title | Lessons | Lesson Decks & STEAM Activity Labs | Folder |\n`;
masterDoc += `|---|---|---|---|---|\n`;
CHAPTERS.forEach(ch => {
  const folderName = `Chapter-${pad2(ch.n)}-${sanitizeFolderName(ch.title)}`;
  const t = topicMap[ch.n];
  masterDoc += `| **Chapter ${ch.n}** | ${ch.title} | ${t ? t.lessons.length : 0} lessons | \`lesson-*.html\` + \`lesson-*-activity.html\` | [\`chapters/${folderName}\`](chapters/${folderName}) |\n`;
});

masterDoc += `\n## 2. Semester 1 Distribution (2026 - 2027)\n\n`;
masterDoc += `| Week | Focus / Title | Scheduled Lessons | Decks & Activities | Folder |\n`;
masterDoc += `|---|---|---|---|---|\n`;
SEMESTER_1.forEach(w => {
  const lStr = w.lessons.length > 0 ? w.lessons.map(l => `\`${l}\``).join(", ") : (w.notes || []).join(", ");
  masterDoc += `| **Week ${pad2(w.week)}** | ${w.title} | ${lStr} | \`lesson-*.html\` + \`*-activity.html\` | [\`weeks/Semester-1/${w.folderName}\`](weeks/Semester-1/${w.folderName}) |\n`;
});

masterDoc += `\n## 3. Semester 2 Distribution (2026 - 2027)\n\n`;
masterDoc += `| Week | Focus / Title | Scheduled Lessons | Decks & Activities | Folder |\n`;
masterDoc += `|---|---|---|---|---|\n`;
SEMESTER_2.forEach(w => {
  const lStr = w.lessons.length > 0 ? w.lessons.map(l => `\`${l}\``).join(", ") : (w.notes || []).join(", ");
  masterDoc += `| **Week ${pad2(w.week)}** | ${w.title} | ${lStr} | \`lesson-*.html\` + \`*-activity.html\` | [\`weeks/Semester-2/${w.folderName}\`](weeks/Semester-2/${w.folderName}) |\n`;
});

fs.writeFileSync(path.join(ROOT, "CURRICULUM_DISTRIBUTION.md"), masterDoc);

console.log("Organization complete! All matching activity files are synchronized.");
