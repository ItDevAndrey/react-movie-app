import { createSlice } from "@reduxjs/toolkit";
import initialState from '../utils/db.json'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function formatDate(date) {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
}

function getDayName(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

initialState.forEach((movie, index) => {
  let date = new Date();
  date.setDate(date.getDate() + index);
  let formattedDate = formatDate(date);
  let dayName = getDayName(date);
  movie.day_name = `${formattedDate}, ${dayName}`;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    bookPlace(state, action) {
      const data = action.payload;
      let noTickets = true;

      const activeIndexDay = state.findIndex(dayObject => dayObject.day_name.includes(data.dayId));
      const activeSessionIndex = state[activeIndexDay].sessions.findIndex(sessionObject => sessionObject.movie_id === data.movieId);

      state[activeIndexDay].sessions[activeSessionIndex].seats.forEach(seat => {
        if (data.bookedPlaces.includes(seat.number)) {
          seat.booked = true;
        }
      });

      state[activeIndexDay].sessions[activeSessionIndex].seats.forEach(seat => {
        if (seat.booked === false) {
          noTickets = false;
        }
      })

      state[activeIndexDay].sessions[activeSessionIndex].noTickets = noTickets;

      const bookedPlaces = {};

      state.forEach(dayItem => {
        const dayKey = dayItem.day_name;
        let hasBookedSessions = false;

        const daySessions = {};

        dayItem.sessions.forEach(sessionItem => {
          const sessionKey = sessionItem.movie_id;
          const bookedPlacesArray = [];

          sessionItem.seats.forEach(seat => {
            if (seat.booked === true) {
              bookedPlacesArray.push(seat.number);
            }
          });

          if (bookedPlacesArray.length > 0) {
            daySessions[sessionKey] = bookedPlacesArray;
            hasBookedSessions = true;
          }
        });

        if (hasBookedSessions) {
          bookedPlaces[dayKey] = daySessions;
        }
      });

      const cookieData = JSON.stringify(bookedPlaces);
      cookies.set('recently_booked_tickets', cookieData, { path: '/' });
    },
    cookiePlaceHandler(state, action) {
      const cookieData = cookies.get('recently_booked_tickets');

      if (cookieData) {
        state.forEach(dayItem => {
          if (cookieData[dayItem.day_name]) {
            dayItem.sessions.forEach(sessionItem => {
              const sessionObj = cookieData[dayItem.day_name][sessionItem.movie_id];
              if (sessionObj) {
                sessionItem.seats.forEach(seatItem => {
                  if (sessionObj.includes(seatItem.number)) {
                    seatItem.booked = true;
                  }
                })

                if (sessionObj.length === sessionItem.seats.length) sessionItem.noTickets = true;
              }
            });
          }
        })
      }
    }
  }
})

export const moviesSliceActions = moviesSlice.actions;
export default moviesSlice;