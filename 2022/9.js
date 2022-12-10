const fs = require("fs");
const { exit } = require("process");

const file = fs.readFileSync("./9.csv", "utf-8");
const data = file.split("\n");

const moveHead = (dir, head) => {
  switch (dir) {
    case "L":
      head[0] -= 1;
      break;
    case "R":
      head[0] += 1;
      break;
    case "U":
      head[1] += 1;
      break;
    case "D":
      head[1] -= 1;
      break;
    default:
      break;
  }
};

const moveTail = (tail, head) => {
  // On the same position
  if (tail[0] === head[0] && head[1] === tail[1]) return;

  if (tail[0] === head[0] && head[1] !== tail[1]) {
    // Same X but different Y: Up and Down
    const diff = head[1] - tail[1];
    if (Math.abs(diff) > 1) {
      tail[1] += diff > 0 ? 1 : -1;
    }
  } else if (tail[0] !== head[0] && tail[1] === head[1]) {
    // Same Y but different X: Left and Right
    const diff = head[0] - tail[0];
    if (Math.abs(diff) > 1) {
      tail[0] += diff > 0 ? 1 : -1;
    }
  } else if (tail[0] !== head[0] && tail[1] !== head[1]) {
    // All different: diagonal
    const xDiff = head[0] - tail[0];
    const yDiff = head[1] - tail[1];
    // Super far diagonal
    if (Math.abs(xDiff) > 1 && Math.abs(yDiff) > 1) {
      tail[0] += xDiff > 1 ? 1 : -1;
      tail[1] += yDiff > 1 ? 1 : -1;
    } else if (Math.abs(yDiff) > 1) {
      const increment = yDiff > 1 ? 1 : -1;
      tail[0] = head[0];
      tail[1] += increment;
    } else if (Math.abs(xDiff) > 1) {
      const increment = xDiff > 1 ? 1 : -1;
      tail[0] += increment;
      tail[1] = head[1];
    }
  }
};

const isNewPos = (tail, uniquePos) =>
  !uniquePos.find((pos) => pos[0] === tail[0] && pos[1] === tail[1]);

const drawMap = (rope) => {
  const GRID_SIZE = 300;
  let grid = "";
  for (let y = GRID_SIZE - 1; y >= 0; y--) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const matchingKnot = rope.findIndex(
        (knot) => knot[0] === x && knot[1] === y
      );
      if (matchingKnot !== -1) grid += "#";
      else grid += ".";
    }
    grid += "\n";
  }
  return grid;
};

const getUniquePos = (ropeLength) => {
  // All pos = [ x, y ]
  const START_POS = [200, 100];
  const uniquePos = [[...START_POS]];

  const ROPE_LENGTH = ropeLength;

  const rope = [];

  for (let i = 0; i < ROPE_LENGTH; i++) {
    rope.push([...START_POS]);
  }

  data.forEach((cmd) => {
    const [dir, steps] = cmd.split(" ");
    const maxSteps = parseInt(steps);

    // console.log(cmd);

    for (let i = 0; i < maxSteps; i++) {
      moveHead(dir, rope[0]);

      for (let j = 1; j < rope.length; j++) {
        moveTail(rope[j], rope[j - 1]);
      }
      const tail = rope[rope.length - 1];
      if (isNewPos(tail, uniquePos)) uniquePos.push([...tail]);
    }
    //   console.log(drawMap([...rope]));
    //   console.log("-----------");
  });

  console.log(drawMap([...uniquePos]));
  return uniquePos.length;
};

console.log("Part 1: Unique positions for rope length 2: ", getUniquePos(2));
console.log("Part 2: Unique positions for rope length 10: ", getUniquePos(10));
