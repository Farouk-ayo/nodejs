const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  //   next(); // allows the request to continue to the next middlewate in the line
  // if you don't call next, the request will stop here
  res.send(
    '<form action="/product" method="POST" ><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
