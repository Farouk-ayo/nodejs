const fs = require("fs");
const add = require("./utils.js");

const sum = add(3, 5);
console.log(sum);

fs.writeFileSync("notes.txt", "This file was created by No dejs ");
fs.fs.appendFileSync("notes.txt", "  i lIVE IN nigeria");
