const fs = require("fs");

const readFile = fs.readFileSync("../1-node-farm/txt/read-this.txt", "utf-8");

console.log(readFile);
