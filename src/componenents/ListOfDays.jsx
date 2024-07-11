import React from 'react';
import { useSelector } from 'react-redux';
import Day from './Day';
import '../styles/components/list-of-days.scss';

function ListOfDays() {
  const state = useSelector(state => state.movies);

  return (
    <div className="list-of-days">
      {state?.map(movieObject => {
        const key = 'list-of-days' + movieObject.day_name;

        return (
          <Day key={key} text={movieObject.day_name} image={movieObject.image} index={movieObject.day_name} />
        )
      })}
    </div>
  );
}

export default ListOfDays;