const fs = require("fs");

// const book = {
//   title: "Farouk goes to school",
//   author: "Farouk",
// };

// const bookJson = JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJson);

// const dataBuffer = fs.readFileSync("1-json.json");
// console.log(dataBuffer);
// const dataJSON = dataBuffer.toString();
// console.log(dataJSON);
// const data = JSON.parse(dataJSON);
// console.log(data.title);

const dataBuffer = fs.readFileSync("1-json.json");
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);

user.name = "Ayo";
user.age = 20;

const userJSON = JSON.stringify(user);
fs.writeFileSync("1-json.json", userJSON);
