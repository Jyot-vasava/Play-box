import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Star } from "lucide-react";

const UpdateMovie = () => {
  const { id } = useParams(); // Get movie ID from route parameters
  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: "",
    rating: 0,
    genre: "",
    tier: "silver",
  });

  const [modifiedFields, setModifiedFields] = useState({}); // Tracks which fields were modified
  const [selectedImage, setSelectedImage] = useState(null); // Tracks selected image file
  const [selectedVideo, setSelectedVideo] = useState(null); // Tracks selected video file
  const [hoveredRating, setHoveredRating] = useState(0); // Tracks hovered star rating
  const [loading, setLoading] = useState(false); // Tracks loading state for API requests

  // Fetch initial movie data and genres
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();
  const [updateMovie] = useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  // Populate movieData with the initial movie data once it is fetched
  useEffect(() => {
    if (initialMovieData) {
      const formattedData = {
        ...initialMovieData,
        cast: Array.isArray(initialMovieData.cast)
          ? initialMovieData.cast
          : initialMovieData.cast.split(",").map((item) => item.trim()), // Normalize cast to an array
      };
      setMovieData(formattedData);
      setModifiedFields({});
    }
  }, [initialMovieData]);

  // Handles input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "year") {
      // Ensure the year is numeric and within 4 digits
      if (value.length <= 4 && /^[0-9]*$/.test(value)) {
        newValue = parseInt(value) || "";
      } else {
        newValue = movieData.year; // Revert to previous value if invalid
      }
    }

    if (initialMovieData) {
      const initialValue = initialMovieData[name];
      let hasChanged = false;

      if (name === "cast") {
        // Normalize and compare the cast values
        const normalizedBackendCast = initialMovieData.cast
          .map((item) => item.trim())
          .join(",");
        const normalizedInputCast = value
          .split(",")
          .map((item) => item.trim())
          .join(",");
        hasChanged = normalizedInputCast !== normalizedBackendCast;
      } else {
        hasChanged = newValue !== initialValue; // Compare other fields directly
      }

      if (hasChanged) {
        setModifiedFields((prev) => ({
          ...prev,
          [name]: true, // Mark field as modified
        }));
      } else {
        const updatedModifiedFields = { ...modifiedFields };
        delete updatedModifiedFields[name]; // Unmark field if unchanged
        setModifiedFields(updatedModifiedFields);
      }
    }

    setMovieData((prev) => ({ ...prev, [name]: newValue })); // Update state
  };

  // Handles image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setModifiedFields((prev) => ({ ...prev, image: true })); // Mark image as modified
    }
  };

  // Handles video file input change
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setSelectedVideo(file);
    if (file) {
      setModifiedFields((prev) => ({ ...prev, video: true })); // Mark video as modified
    }
  };

  // Handles star rating changes
  const handleRatingChange = (rating) => {
    setMovieData((prev) => ({ ...prev, rating }));

    if (initialMovieData && initialMovieData.rating !== rating) {
      setModifiedFields((prev) => ({
        ...prev,
        rating: true, // Mark rating as modified
      }));
    } else {
      const updatedModifiedFields = { ...modifiedFields };
      delete updatedModifiedFields.rating; // Unmark rating if unchanged
      setModifiedFields(updatedModifiedFields);
    }
  };

  // Handles form submission to update movie
  const handleUpdateMovie = async () => {
    try {
      if (
        Object.keys(modifiedFields).length === 0 &&
        !selectedImage &&
        !selectedVideo
      ) {
        toast.info("No changes detected"); // Notify if no changes
        return;
      }

      const formData = new FormData();

      Object.keys(modifiedFields).forEach((field) => {
        if (field === "cast") {
          formData.append("cast", JSON.stringify(movieData.cast));
        } else if (field === "detail") {
          formData.append("detail", movieData.detail.trim());
        } else {
          formData.append(field, movieData[field]);
        }
      });

      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      if (selectedVideo) {
        formData.append("video", selectedVideo);
      }

      setLoading(true);
      const response = await axios.put(
        `https://playbox-5v09.onrender.com/api/v1/movies/update-movie/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Movie updated successfully!");
        setTimeout(() => {
          window.location.href = "/admin/movies-list"; // Redirect after success
        }, 1000);
      } else {
        toast.error(response.data.message || "Update failed!");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error(error.response?.data?.message || "Failed to update movie");
    } finally {
      setLoading(false);
    }
  };

  // Handles movie deletion
  const handleDeleteMovie = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        setLoading(true);
        const response = await axios.delete(
          `https://playbox-5v09.onrender.com/api/v1/movies/delete-movie/${id}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success(response.data.message || "Movie deleted successfully!");
          setTimeout(() => {
            window.location.href = "/admin/movies-list"; // Redirect after deletion
          }, 1000);
        } else {
          toast.error(response.data.message || "Deletion failed!");
        }
      } catch (error) {
        console.error("Error deleting movie:", error);
        toast.error(error.response?.data?.message || "Failed to delete movie");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      {/* Main container */}
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-xl shadow-xl p-8">
        {/* Page heading */}
        <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-700">
          Update Movie
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">{/* Form fields for movie details */}</div>
          {/* Right Column */}
          <div className="space-y-6">{/* Form fields for media uploads */}</div>
        </div>
        {/* Action Buttons */}
      </div>
    </div>
  );
};

export default UpdateMovie;
