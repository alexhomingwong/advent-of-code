const fs = require("fs");
const { exit } = require("process");

const file = fs.readFileSync("./8.csv", "utf-8");
const data = file.split("\n");

const forest = data.map((line) => {
  return line.split("").map((tree) => parseInt(tree));
});

const isVisibleY = (tree, x, y, forest) => {
  const aboveTrees = [];
  const belowTrees = [];
  forest.forEach((trees, fIndex) => {
    if (x !== fIndex) {
      trees.forEach((t, tIndex) => {
        if (tIndex === y) {
          if (fIndex < x) {
            aboveTrees.push(t);
          } else {
            belowTrees.push(t);
          }
        }
      });
    }
  });

  return aboveTrees.every((t) => tree > t) || belowTrees.every((t) => tree > t);
};

const isVisibleX = (tree, y, trees) => {
  const leftTrees = [];
  const rightTrees = [];

  trees.forEach((t, index) => {
    if (index < y) {
      leftTrees.push(t);
    } else if (index > y) {
      rightTrees.push(t);
    }
  });

  return leftTrees.every((t) => tree > t) || rightTrees.every((t) => tree > t);
};

let visibleTrees = 0;

forest.forEach((trees, forestIndex, forestSelf) => {
  // Handle the first and last line
  if (forestIndex === 0 || forestIndex === forestSelf.length - 1) {
    visibleTrees += trees.length;
    return;
  }

  trees.forEach((tree, treesIndex, treesSelf) => {
    // Handle the first and last tree of each line
    if (treesIndex === 0 || treesIndex === treesSelf.length - 1) {
      visibleTrees++;
      return;
    }

    const yVisible = isVisibleY(tree, forestIndex, treesIndex, forestSelf);
    if (yVisible) {
      visibleTrees++;
      return;
    }

    const xVisible = isVisibleX(tree, treesIndex, treesSelf);
    if (xVisible) {
      visibleTrees++;
      return;
    }
  });
});

console.log("Part 1 - Visible trees: ", visibleTrees);

console.log(testForest);

const getYScore = (tree, x, y, forest) => {
  const aboveTrees = [];
  const belowTrees = [];
  forest.forEach((trees, fIndex) => {
    if (x !== fIndex) {
      trees.forEach((t, tIndex) => {
        if (tIndex === y) {
          if (fIndex < x) {
            aboveTrees.push(t);
          } else {
            belowTrees.push(t);
          }
        }
      });
    }
  });

  let upScore = 0;
  let downScore = 0;

  aboveTrees.reverse();

  for (let i = 0; i < aboveTrees.length; i++) {
    upScore++;
    if (tree <= aboveTrees[i]) break;
  }

  for (let i = 0; i < belowTrees.length; i++) {
    downScore++;
    if (tree <= belowTrees[i]) break;
  }

  return [upScore, downScore];
};

const getXScore = (tree, y, trees) => {
  const leftTrees = [];
  const rightTrees = [];

  trees.forEach((t, index) => {
    if (index < y) {
      leftTrees.push(t);
    } else if (index > y) {
      rightTrees.push(t);
    }
  });

  leftTrees.reverse();

  let leftScore = 0;
  let rightScore = 0;

  for (let i = 0; i < leftTrees.length; i++) {
    leftScore++;
    if (tree <= leftTrees[i]) break;
  }

  for (let i = 0; i < rightTrees.length; i++) {
    rightScore++;
    if (tree <= rightTrees[i]) break;
  }

  return [leftScore, rightScore];
};

let currentHighScenic = 0;

forest.forEach((trees, forestIndex, forestSelf) => {
  // Ignore trees on edge as it will equal to 0 score
  if (forestIndex === 0 || forestIndex === forestSelf.length - 1) {
    return;
  }

  trees.forEach((tree, treesIndex, treesSelf) => {
    // Ignore trees on edge as it will equal to 0 score
    if (treesIndex === 0 || treesIndex === treesSelf.length - 1) {
      return;
    }

    const [upScore, belowScore] = getYScore(
      tree,
      forestIndex,
      treesIndex,
      forestSelf
    );

    const [leftScore, rightScore] = getXScore(tree, treesIndex, treesSelf);

    const score = upScore * belowScore * leftScore * rightScore;

    if (score > currentHighScenic) currentHighScenic = score;
  });
});

console.log("Part 2 - Highest scenic score: ", currentHighScenic);
