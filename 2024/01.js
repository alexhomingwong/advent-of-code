const fs = require("fs");
console.time("Prep file");
const file = fs.readFileSync("./01.txt", "utf-8");

const data = file.split("\n").map((line) => line.split(" ").filter((id) => id));
console.timeEnd("Prep file");

console.time("Part 1");
const list1 = [];
const list2 = [];

data.forEach(([one, two]) => {
  list1.push(one);
  list2.push(two);
});

list1.sort();
list2.sort();

let totalDistance = 0;

list1.forEach((_id, index) => {
  totalDistance += Math.abs(list1[index] - list2[index]);
});

console.timeEnd("Part 1");
console.log("Part 1: ", totalDistance);
console.time("Part 2");
const commonIndex = {};

list2.forEach((num) => {
  if (!commonIndex[num]) {
    commonIndex[num] = 1;
    return;
  }

  commonIndex[num] += 1;
});

let similarityScore = 0;

list1.forEach((num) => {
  if (commonIndex[num]) {
    similarityScore += num * commonIndex[num];
  }
});
console.timeEnd("Part 2");
console.log("Part 2: ", similarityScore);
