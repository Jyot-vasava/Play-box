import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

// Extend the apiSlice with endpoints related to genres
export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to create a new genre
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRE_URL}`,
        method: "POST",
        body: newGenre,
      }),
    }),
    // Endpoint to update an existing genre by ID
    updateGenre: builder.mutation({
      query: ({ id, updateGenre }) => ({
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: updateGenre,
      }),
    }),
    // Endpoint to delete a genre by ID
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    // Endpoint to fetch all genres
    fetchGenres: builder.query({
      query: () => `${GENRE_URL}/genres`,
    }),
  }),
});

// Export hooks generated for the endpoints for use in components
export const {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} = genreApiSlice;
