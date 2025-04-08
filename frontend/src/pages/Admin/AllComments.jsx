import React from "react";
import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react";

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery(); // Fetching all movies and their reviews
  const [deleteComment] = useDeleteCommentMutation(); // Mutation hook for deleting a comment

  // Handler for deleting a comment
  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId }); // API call to delete the comment
      toast.success("Comment Deleted"); // Show success notification
      refetch(); // Refetch the updated movie data
    } catch (error) {
      console.error("Error deleting comment: ", error); // Log any errors
    }
  };

  return (
    <div className="min-h-screen bg-[#ebf5fb] mt-[50px]">
      {" "}
      {/* Container with minimum height */}
      <ToastContainer position="top-right" />{" "}
      {/* Toast notification container */}
      <div className="flex flex-col lg:flex-row">
        {" "}
        {/* Flex layout for responsiveness */}
        <main className="flex-1 p-4 lg:p-8">
          {" "}
          {/* Main content area */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#2c3e50] lg:text-3xl">
              All Comments
            </h1>
            <p className="mt-2 text-[#5d6d7e]">
              Manage and moderate user comments
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {" "}
            {/* Grid layout for comments */}
            {movies?.map((movie) =>
              movie.reviews.map((review) => (
                <div
                  key={review._id} // Unique key for each review
                  className="bg-[#f8fbfd] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-[#d4e6f1]"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      {" "}
                      {/* Header with name and delete button */}
                      <div>
                        <h3 className="font-semibold text-[#2c3e50]">
                          {review.name} {/* Reviewer's name */}
                        </h3>
                        <p className="text-sm text-[#5d6d7e]">
                          Movie:{" "}
                          <span className="text-[#3498db]">{movie.name}</span>{" "}
                          {/* Movie name */}
                        </p>
                      </div>
                      <button
                        onClick={
                          () => handleDeleteComment(movie._id, review._id) // Delete handler
                        }
                        className="p-1.5 text-[#95a5a6] hover:text-[#e74c3c] transition-colors duration-200 rounded-full hover:bg-[#fdf2f1]"
                        aria-label="Delete comment"
                      >
                        <Trash2 size={18} /> {/* Trash icon */}
                      </button>
                    </div>

                    <div className="mt-4">
                      <p className="text-[#34495e] line-clamp-3 leading-relaxed">
                        {review.comment} {/* Review comment */}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#d4e6f1]">
                      {" "}
                      {/* Footer with comment date */}
                      <time className="text-sm text-[#7f8c8d]">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}{" "}
                        {/* Formatted review creation date */}
                      </time>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Message when no comments are available */}
          {(!movies ||
            movies.length === 0 ||
            movies.every((m) => m.reviews.length === 0)) && (
            <div className="text-center py-12">
              <p className="text-[#7f8c8d]">No comments found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllComments;
