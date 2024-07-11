import React from 'react';
import '../styles/components/movie-item.scss';
import formatPrice from '../utils/price-formatter';
import { Link, useParams } from 'react-router-dom';

function MovieItem({ movie }) {
  const params = useParams();

  return (
    <Link to={`/movies/${params.dayId}/movie-id/${movie.movie_id}`}
      className={`movie-item ${params.movieId === movie.movie_id ? 'is-active' : ''} ${movie.noTickets ? 'is-empty' : ''}`}
    >
      <div className="movie-item-content">
        {movie.noTickets === false ?
          <>
            <div className="movie-item-name">{movie.movie_name}</div>
            <div className="movie-item-data">{movie.data}</div>
            <div className="movie-item-price">{formatPrice(movie.price)}</div>
          </> :
          <>
            <div className='movie-item-message'>No tickets available</div>
          </>
        }
      </div>
      {movie.image ?
        <div className='movie-item-image image-overlay'>
          <img src={movie.image} alt={movie.movie_name} />
        </div> :
        null
      }
    </Link>
  );
}

export default MovieItem;