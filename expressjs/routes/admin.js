const express = require("express");

// check the helper function in the util for the rootDir

// const rootDir = require("../util/path");

const path = require("path");
const { render } = require("pug");

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  //   next(); // allows the request to continue to the next middlewate in the line
  // if you don't call next, the request will stop here
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });
  res.redirect("/");
});

// module.exports = router;
exports.routes = router;
exports.products = products;
