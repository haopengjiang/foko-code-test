const mysql = require("mysql");
const { createPool } = require("mysql");

const pool = mysql.createConnection({
   host: process.env.MYSQL_HOST || "localhost",
   user: process.env.MYSQL_USER || "root",
   password: process.env.MYSQL_PASS || "1q2w3e4r5t",
   database: process.env.MYSQL_DB   || "foko"
 });

pool.connect(function(err) {
  if (err) {
      console.log(err);
    return;
  }
  console.log("Database Connected successfully...");
});

module.exports = pool;