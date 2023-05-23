import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movie_reviewscol: review,
    }).then(() => {
      alert("success");
    });
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        ></input>
        <label>Review: </label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></input>
        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((val) => {
          return (
            <h1>
              Movie Name: {val.movieName} | Movie Review: {val.movie_reviewscol}
            </h1>
          );
        })}
      </div>
    </div>
  );
}

export default App;
