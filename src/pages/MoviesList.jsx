import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import MovieItem from '../componenents/MovieItem';
import '../styles/pages/movies-list.scss'
import filterMovies from '../utils/filter-movies';

function MoviesList() {
  const params = useParams();
  const state = useSelector(state => state.movies)

  let dayName = '';

  const movies = state.find(dayObject => {
    const dayHandle = dayObject.day_name.split(',')[0];

    if (dayHandle === params.dayId) {
      dayName = dayObject.day_name;
      return dayObject.sessions;
    }

    return null;
  })

  let updateMovies = movies;

  if (movies?.sessions !== undefined) {
    updateMovies = filterMovies(movies, movies.day_name.split(',')[0]);
  }

  return (
    <>
      <h2>{dayName}</h2>
      {updateMovies && updateMovies.length > 0 ?
        <div className='movies-wrapper'>
          {updateMovies.map(movie => {
            const movieKey = params.dayId + movie.movie_id;
            return <MovieItem key={movieKey} movie={movie} />
          }
          )}
        </div> :
        <p>Sorry, but there are no movies for this day!</p>}
      <Outlet />
    </>
  );
}

export default MoviesList;