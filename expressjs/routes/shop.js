const path = require("path");

const express = require("express");

const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  console.log(adminData.products);
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"))

  // FOR PUG
  // res.render("shop", {
  //   prods: adminData.products,
  //   pageTitle: "Shop",
  //   path: "/",
  // });

  // FOR HBS
  res.render("shop", {
    prods: adminData.products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: adminData.products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
