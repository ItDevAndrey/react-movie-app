import React from 'react';
import { Link } from 'react-router-dom';

function Day({ text, image }) {
  const handles = text.split(',');

  return (
    <Link to={`/movies/${handles[0]}`} className='day-item'>
      <div className="day-item-text">
        <span>{handles[0]}</span>
        <span>{handles[1]}</span>
      </div>
      {image &&
        <div className="image-overlay">
          <img src={image} alt={`Movies - ${text}`} />
        </div>
      }
    </Link>
  );
}

export default Day;