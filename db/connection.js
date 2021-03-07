// connect to mysql here 
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  user: process.env.username,
  password: process.env.password,
  database: process.env.database
});
console.log('Connected');
connection.connect(function (err) {
  if (err) {
    throw err;
  }
});

module.exports = connection;

