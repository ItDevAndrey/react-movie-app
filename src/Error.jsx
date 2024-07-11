import React from 'react';
import MainNavigation from './componenents/MainNavigation';

function ErrorPage() {
  return (
    <div>
      <MainNavigation />
      <main>
        <h1>An error occured!</h1>
        <p>Cound not find this page!</p>
      </main>
    </div>
  );
}

export default ErrorPage;