const fs = require("fs");

const file = fs.readFileSync("./2.csv", "utf-8");
const data = file.split("\n");

// const cypher = {
//   X: {
//     point: 1,
//     A: 3,
//     B: 0,
//     C: 6,
//   },
//   Y: {
//     point: 2,
//     A: 6,
//     B: 3,
//     C: 0,
//   },
//   Z: {
//     point: 3,
//     A: 0,
//     B: 6,
//     C: 3,
//   },
// };

// let sum = 0;

// data.forEach((strat) => {
//   const [x, y] = strat.split(" ");
//   sum += cypher[y][x] + cypher[y].point;
// });

// console.log(sum);

const map = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

let sum = 0;

data.forEach((strat) => {
  const [x, y] = strat.split(" ");

  const opp = map[x];
  const me = map[y];

  // Draw
  if (opp === me) {
    sum += me + 3;
    return;
  }

  // Win
  const newOpp = opp + 1 === 4 ? 1 : opp + 1;
  if (newOpp === me) {
    sum += me + 6;
    return;
  }

  // Lose
  sum += me;
});

console.log(`Part 1: Total score is ${sum}`);

const map2 = {
  A: 1,
  B: 2,
  C: 3,
  X: 0,
  Y: 3,
  Z: 6,
};

let sum2 = 0;
data.forEach((strat) => {
  const [x, y] = strat.split(" ");

  // Match outcome points
  sum2 += map2[y];
  console.log(sum2);

  // Draw
  if (y === "Y") {
    sum2 += map2[x];
    return;
  }

  // Lose
  if (y === "X") {
    sum2 += map2[x] - 1 === 0 ? 3 : map2[x] - 1;
    return;
  }

  // Win
  if (y === "Z") {
    sum2 += map2[x] + 1 === 4 ? 1 : map2[x] + 1;
    return;
  }
});

console.log(`Part 2: Total score is ${sum2}`);
