const fs = require("fs");

const file = fs.readFileSync("./3.csv", "utf-8");
const data = file.split("\n");

// Letter position in alphabet a-z = 1-26, A-Z = 27-52
const getLetterPriority = (letter) => {
  const codeNumber = letter.charCodeAt(0);
  // Uppercase
  if (codeNumber > 64 && codeNumber < 91) return codeNumber - 64 + 26;

  // Lowercase
  if (codeNumber > 96 && codeNumber < 123) return codeNumber - 96;
};

let totalNumber = 0;

data.forEach((rucksack) => {
  const compartmentLength = rucksack.length / 2;
  const com1 = rucksack.slice(0, compartmentLength);
  const com2 = rucksack.slice(compartmentLength);

  const duplicateItem = com1.split("").find((item) => com2.includes(item));

  totalNumber += getLetterPriority(duplicateItem);
});

console.log(`Part 1: ${totalNumber}`);

let groupTotal = 0;
let currentGroup = [];

data.forEach((rucksack, index) => {
  if (index % 3 === 0) currentGroup = [];

  currentGroup.push(rucksack);

  if (index % 3 === 2) {
    const [sack1, sack2, sack3] = currentGroup;
    console.log(currentGroup);
    const item = sack1.split("").find((item) => {
      return sack2.includes(item) && sack3.includes(item);
    });

    groupTotal += getLetterPriority(item);
  }
});

console.log(`Part 2: ${groupTotal}`);
