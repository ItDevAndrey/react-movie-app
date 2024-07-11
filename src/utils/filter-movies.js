function filterMovies(movies, day) {
  let currentDateTime = new Date();
  let currentDate = currentDateTime.toISOString().split('T')[0]; 

  if (currentDate !== day) {
    return movies.sessions;
  }

  currentDateTime.setMinutes(currentDateTime.getMinutes() + 30);
  let currentHours = currentDateTime.getHours();
  let currentMinutes = currentDateTime.getMinutes();

  return movies.sessions.filter(session => {
    let [sessionHours, sessionMinutes] = session.data.split(':').map(Number);
    if (sessionHours > currentHours || (sessionHours === currentHours && sessionMinutes > currentMinutes)) {
      return true;
    }
    return false;
  });
}

export default filterMovies;
