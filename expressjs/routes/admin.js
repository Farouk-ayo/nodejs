const express = require("express");
// check the helper function in the util for the rootDir
const rootDir = require("../util/path");
const path = require("path");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  //   next(); // allows the request to continue to the next middlewate in the line
  // if you don't call next, the request will stop here
  res.sendFile(path.join(rootDir, "../", "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
