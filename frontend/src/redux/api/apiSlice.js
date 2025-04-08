import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { MOVIE_URL, BASE_URL } from "../constants";

// Create a base query using the base URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create an API slice to manage API requests using Redux Toolkit Query
export const apiSlice = createApi({
  // Configure the base query for API requests
  baseQuery: fetchBaseQuery({
    baseUrl: MOVIE_URL, // Set base URL for movie-related API requests
    credentials: "include", // Include credentials (e.g., cookies) in API requests
  }),
  // Endpoints can be defined here or injected in other slices
  endpoints: (builder) => ({}),
});
