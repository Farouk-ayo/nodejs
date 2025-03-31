const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const Product = require("../models/product");
const Order = require("../models/order");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

exports.deleteFile = deleteFile;
