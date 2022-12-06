const fs = require("fs");

const file = fs.readFileSync("./4.csv", "utf-8");
const data = file.split("\n");

let allOverlap = 0;

data.forEach((pair) => {
  const [pair1, pair2] = pair.split(",");
  const [lower1, upper1] = pair1.split("-").map((val) => parseInt(val));
  const [lower2, upper2] = pair2.split("-").map((val) => parseInt(val));

  let isOverlapping = false;

  if (
    (lower1 >= lower2 && upper1 <= upper2) ||
    (lower2 >= lower1 && upper2 <= upper1)
  ) {
    isOverlapping = true;
  }

  if (isOverlapping) {
    allOverlap += 1;
  }
});

console.log(`Part 1: ${allOverlap}`);

let anyOverlap = 0;

data.forEach((pair) => {
  const [pair1, pair2] = pair.split(",");
  const [lower1, upper1] = pair1.split("-").map((val) => parseInt(val));
  const [lower2, upper2] = pair2.split("-").map((val) => parseInt(val));

  const combined = [];

  // Sort it
  if (lower1 < lower2) {
    combined.push(lower1, upper1, lower2, upper2);
  } else {
    combined.push(lower2, upper2, lower1, upper1);
  }

  if (combined[1] >= combined[2]) {
    anyOverlap += 1;
  }
});

console.log(`Part 2: ${anyOverlap}`);
