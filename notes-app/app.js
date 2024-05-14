// const fs = require("fs");
const add = require("./utils.js");
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const command = process.argv[2];

//customize yargs version
yargs.version("1.1.1");

console.log(process.argv);
console.log(yargs.argv);

//create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  handler: function () {
    console.log("Adding a new note!");
  },
});

//remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: function () {
    console.log("Removing the note!");
  },
});

// list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler: function () {
    console.log("Listing out all notes!");
  },
});

//read comment
yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function () {
    console.log("Reading a note!");
  },
});

//add , remove, read, list

if (command === "add") {
  console.log("Adding Note");
} else if (command === "remove") {
  console.log("Removing Note");
}

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
