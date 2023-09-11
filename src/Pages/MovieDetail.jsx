import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCredits from "../Components/credits/MovieCredits";
import ShowTrailer from "../Components/Show Trailer/ShowTrailer";
import "./MovieDetail.css";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false); // New state for favorite status
  const { id } = useParams();

  useEffect(() => {
    getData();
  }); // Make sure to re-fetch data when ID changes

  function getData() {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=306f43dc590e94a7d640f7c80bc4b3fc&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieDetail(data));
  }

  const addToWatchlist = () => {
    const currentWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
    const isAlreadyInWatchlist = currentWatchlist.some(movie => movie.id === id);
  
    if (!isAlreadyInWatchlist) {
      currentWatchlist.push({
        id: movieDetail.id,
        title: movieDetail.title,
        poster_path: movieDetail.poster_path
      });
  
      localStorage.setItem('watchlist', JSON.stringify(currentWatchlist));
      alert("Added to Watchlist!");
    } else {
      alert("Movie is already in Watchlist!");
    }
  };
  

  const [notification, setNotification] = useState(null);

  // Function to handle toggling favorite status
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    setNotification("Movie added to favorites");
    setTimeout(() => {
      setNotification(null);
    }, 2000); // Clear the notification after 2 seconds
  };
  const notificationStyle = {
    fontSize: '3.5rem', // Adjust font size
  };
  const playMovie = () => {
    setNotification("Movie is being played");
    setTimeout(() => {
      setNotification(null);
    }, 2000);  // Display notification
  };

  return (
    <>
      <main className="main">
        <div className="main-hero">
          <img
            src={`https://image.tmdb.org/t/p/original${
              movieDetail ? movieDetail.backdrop_path : ""
            }`}
            alt={movieDetail.title}
            className="hero-img"
          />
        </div>
        <div className="main-parent">
          <h1 className="main-title">{movieDetail ? movieDetail.title : ""}</h1>
          <div className="child">
            <div className="pic-img">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movieDetail ? movieDetail.poster_path : ""
                }`}
                alt={movieDetail.original_title}
                className="movie-pic"
              />
            </div>
            <div className="detail-p">
              <h2>
                {movieDetail ? movieDetail.vote_average : ""}{" "}
                <i style={{ color: "gold" }} className="fas fa-star" />{" "}
              </h2>
              <h4>{movieDetail.release_date}</h4>
              <p>{movieDetail.overview}</p>
            </div>
            <br />
            <br />
            <div className="button-row">
            <button
            className="play-button"
            onClick={playMovie} // Call playMovie function
          >
            WATCH NOW
          </button>
              <button className="watchlist-button" onClick={addToWatchlist}>
                Add to Watchlist
              </button>
              <button
                className={`favorite-button ${isFavorited ? "favorited" : ""}`}
                onClick={toggleFavorite}
              >
                <i
                  className={`fas fa-heart ${isFavorited ? "favorited" : ""}`}
                  style={{ fontSize: "24px" }}
                />
              </button>
              <div
                className={`notification ${notification ? "active" : ""}`}
                style={notificationStyle}
              >
                {notification}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </main>
      <ShowTrailer id={id} />
      <MovieCredits id={id} />
    </>
  );
};

export default MovieDetail;
