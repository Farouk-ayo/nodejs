const express = require("express");
const bodyParser = require("body-parser");
const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const MONGODB_URL =
  "mongodb+srv://Faroukayo:Faroukayo@cluster0.2tlgmgj.mongodb.net/feeds?retryWrites=true&w=majority&appName=Cluster0";
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// app.use(bodyParser.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
); // application/json
app.use("/images", express.static(path.join(__dirname, "images"))); // Serve images from the images directory

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
