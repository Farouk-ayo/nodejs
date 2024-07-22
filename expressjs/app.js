const http = require("http");
const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  console.log("This always run");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("in the middleware");
  //   next(); // allows the request to continue to the next middlewate in the line
  // if you don't call next, the request will stop here
  res.send(
    '<form action="/product" method="POST" ><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("in another middleware"); //second middleware
  //   you can also override with the normal node js setHeaders and all
  res.send("<h1>Hello from Express!</h1>");
});

// const server = http.createServer(app);
// server.listen("3000");
// or 👇
app.listen(3000);
