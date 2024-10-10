const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-1", "root", "Faroukayoo@24", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
