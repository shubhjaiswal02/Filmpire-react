import MovieCard from './MovieCard'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './MovieList.css'
const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  const { type } = useParams();

  useEffect(() => {
    getData()
  })
  

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=306f43dc590e94a7d640f7c80bc4b3fc&language=en-US`)
      .then(res => res.json())
      .then(data => setMovieList(data.results))
  }

  return (
    <div className='movie-list'>
      <h2 className="list-title text-center">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list-cards">
        {
          movieList.map(movie => (
            <MovieCard movie={movie} key={movie.title} />
          ))
        }
      </div>

    </div>
  )
}

export default MovieList