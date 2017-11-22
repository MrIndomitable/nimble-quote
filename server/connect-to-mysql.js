var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysqlpw'
});

connection.connect();

connection.query('CREATE DATABASE IF NOT EXISTS nimble_quote;');
connection.query('use nimble_quote;');
connection.query('CREATE TABLE IF NOT EXISTS users (' +
  'id VARCHAR(50) NOT NULL,' +
  'email VARCHAR(100) NOT NULL UNIQUE,' +
  'password VARCHAR(200),' +
  'PRIMARY KEY (id)' +
  ');');

connection.query('INSERT INTO users (id, email, password)' +
  'VALUES ("id", "moshe", "pass");');

connection.query('SELECT * FROM users', function (error, results) {
  console.log(error);
  console.log(results);
});

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();