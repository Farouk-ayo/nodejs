// const fs = require("fs");
const add = require("./utils.js");
const validator = require("validator");
const chalk = require("chalk");

console.log(validator.isEmail("example.com"));
console.log(chalk.red.inverse.bold("Error"));

console.log(validator.isURL("https://ayo.com"));
const getNotes = require("./note.js");

const msg = getNotes();
console.log(msg);

const sum = add(3, 4);
console.log(sum);

// fs.writeFileSync("notes.txt", "This file was created by No dejs ");
// fs.appendFileSync("notes.txt", "  i lIVE IN nigeria");
