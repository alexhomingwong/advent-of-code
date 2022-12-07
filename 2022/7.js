const fs = require("fs");

const file = fs.readFileSync("./7.csv", "utf-8");
const data = file.split("\n");

const tree = { size: 0, children: {} };
let pwd = "/";
const MAX_SIZE = 70000000;
const REQUIRED_SIZE = 30000000;

const isCommand = (line) => line[0] === "$";

const addDirToTree = (tree, path) => {
  const dir = path.shift();
  if (!dir) return;
  if (!tree.children) tree.children = {};
  if (!tree.children[dir]) tree.children[dir] = { size: 0, children: {} };
  return addDirToTree(tree.children[dir], path);
};

const addFileToTree = (tree, path, file, size) => {
  const dir = path.shift();
  if (!dir) {
    tree.size = tree.size + parseInt(size);
    tree[file] = size;
    return;
  }
  tree.size += parseInt(size);
  return addFileToTree(tree.children[dir], path, file, size);
};

const cd = (opt) => {
  const path = pwd.split("/").filter((dir) => dir);

  if (opt === "/") {
    pwd = "/";
    return;
  } else if (opt === "..") {
    path.pop();
  } else {
    path.push(opt);
    addDirToTree(tree, [...path]);
  }

  pwd = `/${path.join("/")}`;
};

data.forEach((cli) => {
  if (isCommand(cli)) {
    const [_, cmd, opt] = cli.split(" ");
    if (cmd === "cd") {
      cd(opt);
    }
  } else {
    const [size, file] = cli.split(" ");

    if (size === "dir") return;

    addFileToTree(
      tree,
      pwd.split("/").filter((dir) => dir),
      file,
      size
    );
  }
});

let sum1 = 0;
const collection = [];

const remainingSpace = MAX_SIZE - tree.size;
console.log("Remaing space on disk: ", remainingSpace);

const spaceToRemove = REQUIRED_SIZE - remainingSpace;
console.log("Need to delete: ", spaceToRemove);

const sumTree = (tree) => {
  if (tree.size < 100000) sum1 += tree.size;
  if (tree.size >= spaceToRemove) collection.push(tree.size);

  Object.keys(tree).forEach((key) => {
    if (typeof tree[key] === "object") return sumTree(tree[key]);
  });
};

sumTree(tree);
console.log("Part 1: ", sum1);

collection.sort((a, b) => a - b);

console.log("Part 2: ", collection[0]);
