const fs = require("fs");

const file = fs.readFileSync("./5.csv", "utf-8");
const data = file.split("\n");

let map = [];
let map2 = [];

const cutOff = 8;

data.forEach((line, index) => {
  // Format the map
  if (index < cutOff) {
    line.split("").forEach((val, index) => {
      if (index % 4 === 1) {
        const stackNumber = Math.floor(index / 4);
        const crate = val;

        if (!map[stackNumber]) {
          map.push([crate]);
          map2.push([crate]);
        } else {
          map[stackNumber].unshift(crate);
          map2[stackNumber].unshift(crate);
        }
      }
    });
  }

  // Clean the map
  if (index === cutOff) {
    map = map.map((stack) => stack.filter((crate) => crate !== " "));
    map2 = map2.map((stack) => stack.filter((crate) => crate !== " "));
  }

  // Begin the instructions
  if (index > cutOff + 1) {
    const [qty, stackX, stackY] = line
      .split(" ")
      .map((val) => parseInt(val))
      .filter((val) => val);

    const removedItems = map[stackX - 1].splice(
      map[stackX - 1].length - qty,
      qty
    );

    removedItems.reverse().forEach((item) => {
      map[stackY - 1].push(item);
    });

    const removedItems2 = map2[stackX - 1].splice(
      map2[stackX - 1].length - qty,
      qty
    );

    map2[stackY - 1].push(...removedItems2);
  }
});

let answer1 = "";
map.forEach((stack) => (answer1 += stack[stack.length - 1]));
console.log(`Part 1: ${answer1}`);

let answer2 = "";
map2.forEach((stack) => (answer2 += stack[stack.length - 1]));
console.log(`Part 2: ${answer2}`);
