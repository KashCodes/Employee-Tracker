// connect to mysql here 
const mysql = require("mysql2");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'bootcamp',
  password: 'bootcamp',
  database: 'employee' 
});
console.log('Connected');
connection.connect(function (err) {
  if (err) {
    throw err;
  }
});

module.exports = connection;

