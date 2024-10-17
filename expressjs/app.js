const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("670ec5e2ce74fd00e3b9da78")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://Faroukayo:Faroukayo@cluster0.2tlgmgj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
