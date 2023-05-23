const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  port: 8889,
  database: "PedroDatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO movie_reviews (movieName, movie_reviewscol) VALUES ('inception', 'good movie'); ";
//   db.query(sqlInsert, (err, result) => {
//     res.send("Hello Miguel");
//   });
// });

app.get("/api/get", (req, res) => {
  const sqlInsert = "SELECT * FROM movie_reviews";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movie_reviewscol = req.body.movie_reviewscol;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movie_reviewscol) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movie_reviewscol], (err, result) => {
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
