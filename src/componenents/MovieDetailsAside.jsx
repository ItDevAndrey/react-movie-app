import React from 'react';
import BookedItem from './BookedItem';
import formatPrice from '../utils/price-formatter';

function MovieDetailsAside({ bookedPlaces, moviePrice, onClickHandler, successMessage }) {
  const buttonMessage = bookedPlaces.length === 1 ? 'ticket' : 'tickets';
  const ticketsPrice = formatPrice(bookedPlaces.length * moviePrice);

  return (
    <aside className='movie-aside'>
      {bookedPlaces.length > 0 ?
        <>
          <div className='booked-items-wrapper'>
            {bookedPlaces.map(bookedItem => {
              return <BookedItem key={bookedItem.message} message={bookedItem.message} moviePrice={formatPrice(moviePrice)} />
            }
            )}
          </div>
          <div className='movie-aside-footer'
            onClick={onClickHandler}
          >
            Book {buttonMessage} - {ticketsPrice}
          </div>
        </>
        :
        <p className={`aside-message ${successMessage !== '' ? 'success' : ''}`}>
          {successMessage === '' ? 'Please select a place or places' : successMessage}
        </p>
      }
    </aside>
  );
}

export default MovieDetailsAside;