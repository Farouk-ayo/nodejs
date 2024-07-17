const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    // res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> My First Page</title></head>");

    // the name of the input here must be noted , because it will come out in the parsed body
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</body>");
    res.write("</html>");

    // use return so that the rest wont run
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  //   console.log(req.method, req.url, req.headers);
  //   process.exit();
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> My First Page</title></head>");
  res.write("<body><h1>Hello from my Node js server</h1></body>");
  res.write("</body>");
  res.write("</html>");
  res.end();
};

// first method
// module.exports = requestHandler;

// second method
// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard coded text",
// };

//third method
// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded text";

// fourth method
exports.handler = requestHandler;
exports.someText = "Some hard coded text";
