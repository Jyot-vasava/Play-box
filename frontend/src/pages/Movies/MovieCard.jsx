import { Link } from "react-router-dom";

// Functional component for rendering a movie card
const MovieCard = ({ movie }) => {
  return (
    <div key={movie._id} className="relative group m-[2rem]">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image} // Movie image source
          alt={movie.name} // Alt text for the image
          className="w-[15rem] h-[20rem] rounded m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
        {/* Image with hover effect for transition and opacity */}
      </Link>

      <p className="absolute top-[85%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.name}
      </p>
      {/* Movie name that appears on hover */}
    </div>
  );
};

export default MovieCard;
