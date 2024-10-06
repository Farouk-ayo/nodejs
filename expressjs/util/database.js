const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-1",
  password: "Faroukayoo@24",
});

module.exports = pool.promise();
