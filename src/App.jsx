import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import ErrorPage from "./Error";
import MoviesList from "./pages/MoviesList";

import './styles/global.scss'
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieDetailsPageWrapper from "./pages/MovieDetailsPageWrapper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { moviesSliceActions } from "./store/movies-slide";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/movies/:dayId',
        element: <MoviesList />,
        children: [
          {
            path: 'movie-id',
            element: <MovieDetailsPageWrapper />,
            children: [
              {
                index: true,
                path: ':movieId',
                element: <MovieDetailsPage />
              }
            ]
          }
        ]
      }
    ]
  }
])

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(moviesSliceActions.cookiePlaceHandler());
  }, [])

  return <RouterProvider router={router} />;
}

export default App;
