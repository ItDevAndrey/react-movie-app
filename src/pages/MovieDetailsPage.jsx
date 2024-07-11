import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MovieSeat from '../componenents/MovieSeat';
import '../styles/pages/movie-details-page.scss';
import MovieDetailsAside from '../componenents/MovieDetailsAside';
import { moviesSliceActions } from '../store/movies-slide';
import formatPrice from '../utils/price-formatter';

function MovieDetailsPage() {
  const [bookedPlaces, setBookedPlaces] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const movies = useSelector(state => state.movies);

  // eslint-disable-next-line
  const dayItem = movies.find(dayObject => {
    const dayHandle = dayObject.day_name.split(',')[0];

    if (dayHandle === params.dayId) {
      return dayObject;
    }
  })

  // eslint-disable-next-line
  const movieItem = dayItem.sessions.find(movie => {
    if (movie.movie_id === params.movieId) {
      return movie;
    }
  })

  useEffect(() => {
    setBookedPlaces([]);
  }, [movieItem])


  function bookPlacesHandler(item, tippyData) {
    const newItem = {
      number: item,
      message: tippyData
    }

    setBookedPlaces((prevState) => {
      let hasItem = false;

      prevState.forEach(stateItem => {
        if (stateItem.number === item) hasItem = true;
      });

      if (hasItem) {
        return prevState.filter(stateItem => stateItem.number !== item);
      }
      return [...prevState, newItem]
    })
  }


  function bookReduxPlaces() {
    const bookedPlacesRedux = {
      dayId: params.dayId,
      movieId: params.movieId,
      bookedPlaces: []
    }

    bookedPlaces.forEach(({ number }) => bookedPlacesRedux.bookedPlaces.push(number));

    dispatch(moviesSliceActions.bookPlace(bookedPlacesRedux));
    setSuccessMessage('Successfully!')

    setTimeout(() => {
      setSuccessMessage('');
    }, 1500);
  }

  useEffect(() => {
    setTimeout(() => {
      if (movieItem.noTickets) {
        navigate(`/movies/${params.dayId}`)
      }
    }, 1500);
    // eslint-disable-next-line
  }, [successMessage, movieItem, navigate])

  return (
    <div className='movie-details-page'>
      <Link to={`/movies/${params.dayId}`} className='back-button'>Go back</Link>
      <h2>{movieItem.movie_name}</h2>
      <p className="movie-info">Price: {formatPrice(movieItem.price)}</p>
      <p className='movie-info'>Time: {movieItem.data}</p>
      <div className="movie-details-page--wrapper">
        <div className="movie-seats">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 806 21" fill="#fff">
            <path d="M3.2,20l-2,0.2l-0.3-4l2-0.2C136.2,5.3,269.6,0,403,0s266.8,5.3,400.2,16l2,0.2l-0.3,4l-2-0.2 C669.5,9.3,536.3,4,403,4S136.4,9.3,3.2,20z"></path>
          </svg>
          <div className="name">Screen</div>
          <div className="movie-seats-wrapper">
            {movieItem.seats.map(seat => {
              const seatKey = 'seat' + seat.number;
              return <MovieSeat key={seatKey} seat={seat} bookedPlaces={bookedPlaces} onClickHandler={(item, tippyData) => bookPlacesHandler(item, tippyData)} />
            })}
          </div>
        </div>
        <MovieDetailsAside
          bookedPlaces={bookedPlaces}
          moviePrice={movieItem.price}
          onClickHandler={() => bookReduxPlaces()}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
}

export default MovieDetailsPage;