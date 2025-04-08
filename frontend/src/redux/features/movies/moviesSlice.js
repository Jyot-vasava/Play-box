import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice for managing movie-related state
const moviesSlice = createSlice({
  name: "movies", // Name of the slice
  initialState: {
    moviesFilter: {
      // Initial state for filtering movies
      searchTerm: "", // Search term used for filtering movies by name
      selectedGenre: "", // Selected genre for filtering movies
      selectedYear: "", // Selected year for filtering movies
      selectedSort: [], // Selected sorting criteria (e.g., new, top)
    },
    filteredMovies: [], // Array to store movies filtered based on criteria
    movieYears: [], // Array to store movie release years
    uniqueYear: [], // Array to store unique years for filtering
  },

  // Reducers to handle state changes based on actions
  reducers: {
    // Reducer to set the movies filter (search term, genre, year, etc.)
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },
    // Reducer to set the filtered movies list based on criteria
    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    // Reducer to set the list of movie release years
    setMovieYears: (state, action) => {
      state.movieYears = action.payload;
    },
    // Reducer to set the unique list of years for filtering
    setUniqueYears: (state, action) => {
      state.uniqueYear = action.payload;
    },
  },
});

// Export actions for use in components
export const {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} = moviesSlice.actions;

// Export the reducer to be used in the Redux store
export default moviesSlice.reducer;
