import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { Search } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner3.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();

  // Fetch all movies, genres, and categorized movie data using RTK Query hooks
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  // Access state values for movie filters and filtered movies from Redux store
  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  // Extract unique movie years from the data for use in filtering options
  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  // Populate Redux store with movie data and derived values on component load
  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  console.log("moviesFilter", moviesFilter);

  // Update the movies filter state and filteredMovies state when search input changes
  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    // Filter movies based on the search term (case-insensitive match)
    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    // Update the filtered movies state
    dispatch(setFilteredMovies(filteredMovies));
  };

  // Handle filtering movies by genre when a genre option is clicked
  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  // Handle filtering movies by year when a year is selected
  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  // Handle sorting movies based on the selected option (new, top, or random movies)
  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;
      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
      <>
        {/* Main section for the banner */}
        <section>
          <div
            className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover"
            style={{ backgroundImage: `url(${banner})` }}
          >
            {/* Overlay gradient to enhance text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

            {/* Main text content in the banner */}
            <div className="relative pt-32 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center">
                <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight">
                  Play<span className="text-blue-500">Box</span>
                </h1>
                <p className="text-xl font-bold md:text-2xl text-gray-300 max-w-2xl mx-auto">
                  Cinematic Odyssey: Unveiling the Magic of Movies
                </p>
              </div>
            </div>  

            {/* Search input field */}
            <section className="absolute -bottom-[5rem]">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full h-12 pl-12 pr-4 rounded-full bg-white border border-gray-700 text-gray placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Search for movies..."
                  value={moviesFilter.searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Filters for genre, year, and sorting options */}
              <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
                {/* Dropdown for selecting genres */}
                <select
                  className="border p-2 rounded-lg text-black"
                  value={moviesFilter?.selectedGenre}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value="">Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>

                {/* Dropdown for selecting year */}
                <select
                  className="border p-2 rounded-lg ml-4 text-black"
                  value={moviesFilter?.selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value="">Year</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                {/* Dropdown for sorting movies */}
                <select
                  className="border p-2 rounded-lg ml-4 text-black"
                  value={moviesFilter?.selectedSort[0]}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </section>
            </section>
          </div>

          {/* Display list of filtered movies */}
          <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
            {filteredMovies?.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </section>
        </section>
      </>
    </div>
  );
};

export default AllMovies;
