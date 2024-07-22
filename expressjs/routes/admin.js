const express = require("express");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  //   next(); // allows the request to continue to the next middlewate in the line
  // if you don't call next, the request will stop here
  res.send(
    '<form action="/admin/add- product" method="POST" ><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
