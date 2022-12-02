const fs = require("fs");

const file = fs.readFileSync("./1.csv", "utf-8");
const data = file.split("\n");

let top3 = [0, 0, 0];
let currentTotal = 0;

data.forEach((calories) => {
  const cal = parseInt(calories);
  if (cal) {
    currentTotal += cal;
    return;
  }

  if (!cal) {
    const index = top3.findIndex((val) => currentTotal > val);
    if (index > -1) {
      top3.splice(index, 0, currentTotal);
      top3 = top3.slice(0, 3);
    }

    currentTotal = 0;
    return;
  }
});

console.log(`Part 1 - Highest calory: ${top3[0]}`);
console.log(`Part 2 - Top 3 sum: ${top3.reduce((acc, val) => acc + val, 0)}`);
