/**
 * engine/activities-registry.js
 * 
 * Maps lesson codes (1-1 through 17-10) to their corresponding Chapter
 * STEAM Activity, Manipulative, and AI-in-the-Loop challenge configuration.
 */

const ACTIVITIES_BY_CHAPTER = {
  1: {
    id: "ch01",
    title: "Place-Value Harbor: Interactive Census Chart",
    badge: "Chapter 01 · Place Value Lab",
    description: "Explore numbers up to 1,000,000 across periods (Millions, Thousands, Ones) and model the 10x value shift.",
    file: "activity-ch01-place-value-census-chart.html",
    stem: {
      ask: "How does the position of each digit in a 6-digit census number determine its total worth?",
      plan: "Deconstruct a civic population number into standard, expanded, and period forms.",
      build: "Construct an annotated place-value chart showing the 10x value growth across adjacent columns.",
      share: "Read your multi-digit figure aloud period-by-period and defend each zero's role as a place holder."
    },
    ai: "Ask AI to generate a population figure with identical digits in two places (e.g. 70,700) and explain how many times greater the first digit is than the second.",
    kind: "placeValueChart"
  },
  2: {
    id: "ch02",
    title: "The Souq of Sums: Mental Math & Regrouping Simulator",
    badge: "Chapter 02 · Addition & Subtraction",
    description: "Simulate multi-digit addition with regrouping and subtraction across zeros using interactive ledger strips.",
    file: "activity-ch02-souq-of-sums-mental-math.html",
    stem: {
      ask: "How does regrouping work step-by-step when subtracting across consecutive zeros?",
      plan: "Model multi-digit transactions using place-value borrowing and mental compensation strategies.",
      build: "Simulate trade ledger balances and verify each regrouping step visually.",
      share: "Defend your mental subtraction strategy (compensation vs standard algorithm) to a peer."
    },
    ai: "Ask AI to critique why students often make the error of writing 5004 - 2378 = 3374 instead of 2626.",
    kind: "additionSubtraction"
  },
  3: {
    id: "ch03",
    title: "Product Palm Grove: 1-Digit Area Model Lab",
    badge: "Chapter 03 · 1-Digit Multiplication",
    description: "Deconstruct 1-digit by 3-digit products into visual partial-product rectangles in the palm grove.",
    file: "activity-ch03-area-model-multiplication-lab.html",
    stem: {
      ask: "How do partial products combine to give the total area of a multi-section palm grove?",
      plan: "Break the multi-digit factor into hundreds, tens, and ones, then multiply each region.",
      build: "Draw the scaled rectangular area model and label each partition with its partial product.",
      share: "Present your decomposed model and verify the sum matches the standard multiplication algorithm."
    },
    ai: "Ask AI to verify if breaking 6 x 345 into (6 x 300) + (6 x 40) + (6 x 5) uses the distributive property correctly.",
    kind: "areaModel1D"
  },
  4: {
    id: "ch04",
    title: "The Tower of Times: 2-Digit Area Model Builder",
    badge: "Chapter 04 · 2-Digit Multiplication",
    description: "Construct 4-box area models to calculate 2-digit by 2-digit products floor-by-floor.",
    file: "activity-ch04-tower-of-times-partial-products.html",
    stem: {
      ask: "How do 4 rectangular sub-areas combine when multiplying two 2-digit factors?",
      plan: "Decompose both factors into tens and ones, setting up a 2x2 partial product grid.",
      build: "Calculate each floor's partial product (tens×tens, tens×ones, ones×tens, ones×ones) and sum them.",
      share: "Present your Tower calculation and explain how rounding helps verify if the product is reasonable."
    },
    ai: "Ask AI to generate a common estimation trap where rounding 42x35 gives 40x40=1600 instead of 40x35=1400.",
    kind: "areaModel2D"
  },
  5: {
    id: "ch05",
    title: "Division Dunes: Partial Quotients Sandbox",
    badge: "Chapter 05 · Division Strategies",
    description: "Explore sharing caravan cargo into equal loads and calculating partial quotients with remainders.",
    file: "activity-ch05-division-dunes-quotient-lab.html",
    stem: {
      ask: "How can large caravan supplies be distributed equally using partial quotient chunks?",
      plan: "Identify easy multiple chunks (e.g. 100x, 10x) to subtract from the total dividend.",
      build: "Track each partial quotient on the division dunes board until the remainder is smaller than the divisor.",
      share: "Explain what happens to the remainder in real-life contexts (drop it, round up, or split it)."
    },
    ai: "Ask AI to generate three real-life word problems where the remainder is handled differently (one where you add 1 camel, one where you drop it).",
    kind: "divisionSandbox"
  },
  6: {
    id: "ch06",
    title: "Caravan Crossroads: Multi-Step Strip Model Lab",
    badge: "Chapter 06 · Multi-Step Problem Solving",
    description: "Construct multi-part strip diagrams to break complex, multi-operation word problems into manageable steps.",
    file: "activity-ch06-caravan-multi-step-problem-lab.html",
    stem: {
      ask: "How do comparison bars help us identify whether to multiply, add, or subtract first in multi-step scenarios?",
      plan: "Draw strip diagrams comparing Caravan A and Caravan B before calculating the combined total.",
      build: "Calculate the hidden sub-step (Caravan B amount) before answering the main question (Total sacks).",
      share: "Explain your multi-step equation: Total = A + (N × A) to a partner."
    },
    ai: "Ask AI to critique a student solution that adds 120 + 3 instead of multiplying 120 x 3.",
    kind: "stripDiagrams"
  },
  7: {
    id: "ch07",
    title: "Factor Reef: Factor Rainbow & Primes Explorer",
    badge: "Chapter 07 · Factors & Multiples",
    description: "Discover all factor pairs of a target number, construct factor rainbows, and classify as prime or composite.",
    file: "activity-ch07-factor-reef-pairs-explorer.html",
    stem: {
      ask: "How do factor pairs reveal whether a reef number is prime or composite?",
      plan: "Test divisibility from 1 up to the square root of the number to identify all pair bonds.",
      build: "Construct a visual factor rainbow connecting each complementary factor pair.",
      share: "Present your factor rainbow and explain why 1 is neither prime nor composite."
    },
    ai: "Ask AI to generate a list of all prime numbers under 50 and verify how many have exactly 2 factors.",
    kind: "factorRainbow"
  },
  8: {
    id: "ch08",
    title: "The Fraction Isles: Equivalent Fraction Strips",
    badge: "Chapter 08 · Fraction Equivalence",
    description: "Align fraction strips and number lines to visually prove equivalence between halves, fourths, sixths, and eighths.",
    file: "activity-ch08-fraction-isles-equivalence-strips.html",
    stem: {
      ask: "Why does multiplying both numerator and denominator by the same number create an equivalent fraction?",
      plan: "Model original fraction bar and split each part by multiplier 'n' to produce equal area.",
      build: "Show that 2/3 and 4/6 cover the exact same distance on the 0-to-1 number line.",
      share: "Demonstrate benchmark comparison using 1/2 as the reference point."
    },
    ai: "Ask AI to generate two fractions that appear close (e.g. 5/8 and 7/12) and prove which is greater using benchmarks.",
    kind: "fractionStrips"
  },
  9: {
    id: "ch09",
    title: "Kunafa Kitchens: Like Denominator Fraction Slicer",
    badge: "Chapter 09 · Fraction Addition",
    description: "Slice circular kunafa trays to add and subtract fractions with like denominators and mixed numbers.",
    file: "activity-ch09-kunafa-kitchen-fraction-addition.html",
    stem: {
      ask: "Why does the denominator stay the same when we combine slices with equal unit sizes?",
      plan: "Shade slices from Tray 1 and Tray 2 into a combined tray model.",
      build: "Identify when the sum forms an improper fraction (e.g. 7/8 + 3/8 = 10/8 = 1 2/8).",
      share: "Demonstrate decomposing mixed numbers into whole units and leftover fractional slices."
    },
    ai: "Ask AI to critique why adding numerators AND denominators (e.g. 3/8 + 4/8 = 7/16) is mathematically incorrect.",
    kind: "circularFractions"
  },
  10: {
    id: "ch10",
    title: "The Scaling Strait: Whole Number × Fraction Lab",
    badge: "Chapter 10 · Fraction Multiplication",
    description: "Scale repeated unit fractions to multiply whole numbers by fractions and solve elapsed time problems.",
    file: "activity-ch10-scaling-strait-fraction-multiplier.html",
    stem: {
      ask: "How is multiplying 4 × 2/5 identical to repeated hops on a fractional number line?",
      plan: "Model n copies of a/b as (n × a) / b.",
      build: "Plot the successive hops along the open number line to find the total distance.",
      share: "Connect fraction scaling to elapsed time problems (e.g. 3 sessions of 3/4 hour = 9/4 = 2 1/4 hours)."
    },
    ai: "Ask AI to generate a recipe scaling word problem involving 6 batches of 2/3 cup flour and solve it with mixed numbers.",
    kind: "scalingLine"
  },
  11: {
    id: "ch11",
    title: "The Pearl Ledger: Fractional Line Plot Studio",
    badge: "Chapter 11 · Line Plots",
    description: "Plot pearl diver hauls measured in eighths and quarters of an inch on an interactive fractional line plot.",
    file: "activity-ch11-pearl-ledger-line-plot-diver.html",
    stem: {
      ask: "How does a line plot help us find the difference between the largest and smallest pearl sizes collected?",
      plan: "Mark an 'X' above each measurement tick on the fractional scale.",
      build: "Analyze the pearl cluster and calculate total weight and range of measurements.",
      share: "Critique a sample conclusion about which measurement frequency was most common."
    },
    ai: "Ask AI to generate 8 fractional measurements and create a question asking for the total combined length of all pearls greater than 1/2 inch.",
    kind: "linePlotStudio"
  },
  12: {
    id: "ch12",
    title: "Decimal Docks: Tenths & Hundredths Grid Tool",
    badge: "Chapter 12 · Decimal Place Value",
    description: "Compare tenths and hundredths side-by-side using 10-strip and 100-grid visual models and money conversions.",
    file: "activity-ch12-decimal-docks-tenths-hundredths.html",
    stem: {
      ask: "Why is 0.7 equivalent to 0.70 and greater than 0.45?",
      plan: "Color 7 tenths strips and 45 hundredths cells to compare overall area.",
      build: "Write decimal comparisons using >, <, and = signs.",
      share: "Connect hundredths to Saudi Riyals and halalas (e.g. 0.45 SAR = 45 halalas)."
    },
    ai: "Ask AI to explain the misconception where students think 0.45 is larger than 0.7 because 45 is greater than 7.",
    kind: "decimalGrids"
  },
  13: {
    id: "ch13",
    title: "The Measure Market: Unit Equivalence & Boss Battle",
    badge: "Chapter 13 · Measurement Boss Battle",
    description: "Convert units of length, capacity, and mass to defeat The Muddler of the Measure Market in a whole-class review duel.",
    file: "activity-ch13-boss-measure-market-battle.html",
    stem: {
      ask: "How do multiplicative ratios convert larger metric units into smaller equivalents?",
      plan: "Construct conversion tables (1 m = 100 cm, 1 L = 1000 mL, 1 kg = 1000 g).",
      build: "Calculate perimeter and area of trading stalls to solve the boss riddles.",
      share: "Present your unit conversion table to claim victory over The Muddler."
    },
    ai: "Ask AI to generate three tricky measurement multi-step questions involving perimeter of gardens and converting remaining centimeters.",
    kind: "measureBattle"
  },
  14: {
    id: "ch14",
    title: "Pattern Oasis: Sequence & Repeating Shapes Lab",
    badge: "Chapter 14 · Algebra Patterns",
    description: "Generate arithmetic number rules and repeating geometric sequences to predict future pattern terms.",
    file: "activity-ch14-pattern-oasis-sequence-builder.html",
    stem: {
      ask: "What features (odd/even, unit digit patterns) appear in a sequence that follow a consistent rule?",
      plan: "Calculate the first 6 terms of the number rule and analyze pattern features.",
      build: "Construct a repeating shape pattern and predict the 20th shape in the sequence.",
      share: "Explain why every term in 'start at 4, add 6' will always end in an even digit (4, 0, 6, 2, 8)."
    },
    ai: "Ask AI to give a pattern rule with both an addition and subtraction step and solve for the 10th term.",
    kind: "patternSequences"
  },
  15: {
    id: "ch15",
    title: "Angle Heights: Interactive Protractor Studio",
    badge: "Chapter 15 · Angle Measurement",
    description: "Measure angles in degrees using a circular 360° and 180° protractor and solve additive angle puzzles.",
    file: "activity-ch15-angle-heights-protractor-lab.html",
    stem: {
      ask: "How does a protractor relate 1/360th unit turns to full degree angles?",
      plan: "Align the vertex and baseline ray with 0° on the protractor scale.",
      build: "Measure acute, right, and obtuse angles and find missing adjacent angle values.",
      share: "Demonstrate that two adjacent angles forming a straight line sum to 180°."
    },
    ai: "Ask AI to generate a geometric puzzle with three adjacent angles that form a 90° right angle, with one angle unknown.",
    kind: "protractorStudio"
  },
  16: {
    id: "ch16",
    title: "Geometry Gardens: Lines & Symmetry Studio",
    badge: "Chapter 16 · Geometry & Symmetry",
    description: "Classify 2D shapes (triangles, quadrilaterals) and draw lines of symmetry across garden polygons.",
    file: "activity-ch16-geometry-gardens-symmetry-studio.html",
    stem: {
      ask: "How do lines of symmetry divide a 2D geometric shape into congruent mirror halves?",
      plan: "Identify parallel and perpendicular sides, angles, and symmetrical fold lines.",
      build: "Draw dashed lines of symmetry across regular and irregular quadrilaterals.",
      share: "Classify triangles by side length (equilateral, isosceles, scalene) and angle type."
    },
    ai: "Ask AI to explain why a parallelogram has NO lines of symmetry even though opposite sides are congruent.",
    kind: "geometrySymmetry"
  },
  17: {
    id: "ch17",
    title: "Step-Up to Grade 5 & General Revision Arena",
    badge: "Chapter 17 · Extension Arena",
    description: "Explore fifth-grade preview concepts (decimals to thousandths, unlike fractions, and volume of rectangular prisms).",
    file: "activity-sem2-general-revision-arena.html",
    stem: {
      ask: "How does 3D volume extend our understanding of 2D rectangular area?",
      plan: "Pack unit cubes layer by layer to derive Volume = Length × Width × Height.",
      build: "Model decimal hundredths to thousandths transitions on place value charts.",
      share: "Defend your strategy for finding common denominators when adding unlike fractions."
    },
    ai: "Ask AI to generate a volume-packing problem with a prism measuring 4 × 3 × 5 and explain how layers relate to area.",
    kind: "stepUpVolume"
  }
};

function getActivityForLesson(lessonCode) {
  if (!lessonCode) return null;
  if (lessonCode.startsWith("boss-")) {
    const bTopic = parseInt(lessonCode.replace("boss-", ""), 10);
    return ACTIVITIES_BY_CHAPTER[bTopic] || ACTIVITIES_BY_CHAPTER[13];
  }
  const norm = lessonCode.replace(".", "-");
  const parts = norm.split("-");
  const chNum = parseInt(parts[0], 10);
  return ACTIVITIES_BY_CHAPTER[chNum] || null;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ACTIVITIES_BY_CHAPTER,
    getActivityForLesson
  };
}
