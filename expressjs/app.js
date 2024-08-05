const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const app = express();

// the default file layout for hbs is main.hbs
// app.engine(
//   ".hbs",
//   engine({
//     extname: "hbs",
//     defaultLayout: "main-layout",
//     layoutsDir: "views/layouts",
//   })
// );
// app.set("view engine", "hbs");
// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

// const adminRoutes = require("./routes/admin");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/admin", adminRoutes);
app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
  });
});
// const server = http.createServer(app);
// server.listen("3000");
// or 👇
app.listen(3000);
