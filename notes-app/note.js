const fs = require("fs");
const chalk = require("chalk");

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  // debugger;
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New Note added"));
  } else {
    console.log(chalk.red("Note title taken"));
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

const listNotes = function () {
  const notes = loadNotes();
  console.log(chalk.inverse("Your note"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = function (title) {
  const notes = loadNotes();

  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.bold.inverse(note.title), note.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
