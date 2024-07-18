const http = require("http");
const route = require("./route");

// const server = http.createServer(route);
const server = http.createServer(route.handler);
console.log(route.someText);

server.listen("3000");
