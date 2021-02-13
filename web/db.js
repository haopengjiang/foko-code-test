const mysql = require("mysql");
const { createPool } = require("mysql");

const pool = mysql.createConnection({
    host            : 'localhost',
    port            : 3333,
    user            : 'mysql',
    password        : 'password',
    database        : 'foko'
 });

pool.connect(function(err) {
  if (err) {
      console.log(err);
    return;
  }
  console.log('Database Connected successfully...');
});

module.exports = pool;