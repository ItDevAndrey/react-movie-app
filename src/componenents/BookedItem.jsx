import React from 'react';

function BookedItem({ message, moviePrice }) {
  return (
    <div className='booked-item'>
      {message} <span>{moviePrice}</span>
    </div>
  );
}

export default BookedItem;