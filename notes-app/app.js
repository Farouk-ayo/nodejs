// const validator = require("validator");
// const chalk = require("chalk");
const yargs = require("yargs");
const command = process.argv[2];
const note = require("./note.js");

//customize yargs version
yargs.version("1.1.1");

// add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    note.addNote(argv.title, argv.body);
  },
});

//remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    note.removeNote(argv.title);
  },
});

// list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler: function () {
    note.listNotes();
  },
});

//read comment
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Read Note",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    note.readNote(argv.title);
  },
});

//add , remove, read, list

if (command === "add") {
  console.log("Adding Note");
} else if (command === "remove") {
  console.log("Removing Note");
}

yargs.parse();

// console.log(validator.isEmail("example.com"));
// console.log(chalk.red.inverse.bold("Error"));

// console.log(validator.isURL("https://ayo.com"));
// const sum = add(3, 4);
// console.log(sum);

// fs.writeFileSync("notes.txt", "This file was created by No dejs ");
// fs.appendFileSync("notes.txt", "  i lIVE IN nigeria");
