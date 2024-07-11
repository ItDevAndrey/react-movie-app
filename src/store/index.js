import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./movies-slide";

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer
  }
})

export default store;