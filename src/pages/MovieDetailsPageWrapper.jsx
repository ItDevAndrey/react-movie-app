import React from 'react';
import { Outlet } from 'react-router-dom';

function MovieDetailsPageWrapper() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default MovieDetailsPageWrapper;