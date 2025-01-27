import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../componenents/MainNavigation';

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;