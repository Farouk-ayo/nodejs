const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.method, req.url, req.headers);
  //   process.exit();
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> My First Page</title></head>");
  res.write("<body><h1>Hello from my Node js server</h1></body>");
  res.write("</body>");
  res.end();
});

server.listen("3000");
