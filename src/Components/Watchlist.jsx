import React from 'react';
import './Watchlist.css'; 
const Watchlist = () => {
  const clearWatchlist = () => {
    localStorage.removeItem('watchlist');
    window.location.reload(); // Reload the page to reflect the changes
  };

  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  return (
    <div>
      <h1>Watchlist</h1>
      {watchlist.length > 0 && (
        <button  className="clear-watchlist-button" onClick={clearWatchlist}>Clear Watchlist</button>
      )}
      <ul className="watchlist">
        {watchlist.map(movie => (
          <li key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <span className="title">{movie.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
