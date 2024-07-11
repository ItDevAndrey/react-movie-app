import React from 'react';
import '../styles/components/movie-seat.scss';

function MovieSeat({ seat, onClickHandler, bookedPlaces }) {
  let tippyData = `${Math.ceil(seat.number / 5)} Row, ${seat.number} place`;

  if (seat.booked) {
    tippyData = 'This seat is booked'
  }

  function bookPlaceHander() {
    if (!seat.booked) {
      onClickHandler(seat.number, tippyData);
    }
  }

  let isSelected = false;
  bookedPlaces.forEach(bookedItem => {
    if (bookedItem.number === seat.number) isSelected = true;
  });

  return (
    <div className={`movie-seat ${isSelected ? 'is-selected' : ''}`}
      data-tippy={tippyData}
      data-booked={seat.booked}
      onClick={bookPlaceHander}
    >

    </div>
  );
}

export default MovieSeat;