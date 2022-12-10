const fs = require("fs");

const file = fs.readFileSync("./10.csv", "utf-8");
const data = file.split("\n");

let signal = 1;
let cycle = 0;

let answer = 0;

const checkSignal = () => {
  if ((cycle % 40) - 20 === 0) {
    answer += signal * cycle;
  }
};

data.forEach((line, index) => {
  const [action, value] = line.split(" ");
  const int = parseInt(value);

  for (let i = 0; i < 2; i++) {
    cycle++;
    checkSignal();
    if (!value) break;
  }

  if (value) signal += int;
});

console.log("Part 1: ", answer);

let crtCycle = 0;
let pixelStartPos = 1;
let crt = "";

const drawCrt = () => {
  const pixelPos = [0, 0, 0].map((el, index) => pixelStartPos + index);

  const drawPixel = pixelPos.includes(crtCycle % 40);
  crt += drawPixel ? "#" : ".";

  if (crtCycle % 40 === 0) {
    crt += "\n";
  }
};

data.forEach((line, index) => {
  const [action, value] = line.split(" ");
  const int = parseInt(value);

  for (let i = 0; i < 2; i++) {
    crtCycle++;
    drawCrt();
    if (!value) break;
  }

  if (value) {
    pixelStartPos += int;
  }
});

console.log("Part 2:");
console.log(crt);
