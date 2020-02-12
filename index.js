const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
// https://github.com/mysqljs/mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "rihab",
  password: "rihab",
  database: "test"
});

// Initialize the app
const app = express();

// to avoid cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// https://expressjs.com/en/guide/routing.html
app.get("/", function(req, res) {
  connection.connect();

  connection.query(
    'SELECT CASE WHEN konto =2300 THEN "Neutraler Aufwand" END AS konto,format(SUM(`MVZ Monat 1 (mit Soll/Haben-Kz)`)/100,2) AS Januar, format(SUM(`MVZ Monat 2 (mit Soll/Haben-Kz)`)/100,2) AS Februar,format(SUM(`MVZ Monat 3 (mit Soll/Haben-Kz)`)/100,2) AS `März`,format(SUM(`MVZ Monat 4 (mit Soll/Haben-Kz)`)/100,2) AS Apri,format(SUM(`MVZ Monat 5 (mit Soll/Haben-Kz)`)/100,2) AS Mai,format(SUM(`MVZ Monat 6 (mit Soll/Haben-Kz)`)/100,2) AS Juni,format(SUM(`MVZ Monat 7 (mit Soll/Haben-Kz)`)/100,2) AS Juli,format(SUM(`MVZ Monat 8 (mit Soll/Haben-Kz)`)/100,2) AS August,format(SUM(`MVZ Monat 9 (mit Soll/Haben-Kz)`)/100,2) AS September,format(SUM(`MVZ Monat 10 (mit Soll/Haben-Kz)`)/100,2) AS Oktober,format(SUM(`MVZ Monat 11 (mit Soll/Haben-Kz)`)/100,2) AS November,format(SUM(`MVZ Monat 12 (mit Soll/Haben-Kz)`)/100,2) As Dezember FROM `susa_m199` WHERE konto = 2300 or konto =2110 or konto=2301 or konto=2306 or konto=2309 or konto=2382 or konto=2382 or konto=2653 or konto=2657 or konto=2658 GROUP BY konto;',
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );

  connection.end();
});
// Start the server
app.listen(3006, () => {
  console.log("Go to http://localhost:3006 to see posts");
});
