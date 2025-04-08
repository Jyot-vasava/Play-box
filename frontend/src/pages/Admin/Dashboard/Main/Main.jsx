import React from "react";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Dashboard Container */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards Grid */}
        <div className="flex flex-col items-center lg:grid lg:grid-cols-3 gap-4 mb-8 mt-[2rem]">
          {/* Center cards on small screens, grid on large screens */}
          <div className="w-full sm:w-2/3 lg:w-full transform transition-transform hover:scale-105">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              gradient="from-teal-500 to-lime-400"
            />
          </div>
          <div className="w-full sm:w-2/3 lg:w-full transform transition-transform hover:scale-105">
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              gradient="from-[#CCC514] to-[#CDCB8E]"
            />
          </div>
          <div className="w-full sm:w-2/3 lg:w-full transform transition-transform hover:scale-105">
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              gradient="from-green-500 to-lime-400"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white mb-2 sm:mb-0">
              Top Content
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-400">
                Total Comments: {sumOfCommentsLength}
              </span>
            </div>
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {topMovies?.map((movie) => (
              <div
                key={movie._id}
                className="transform transition-all hover:scale-105"
              >
                <VideoCard
                  image={movie.image}
                  title={movie.name}
                  date={movie.year}
                  comments={movie.numReviews}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {(!topMovies || topMovies.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-400">No content available</p>
            </div>
          )}
        </div>

        {/* Loading States */}
        {(!visitors || !allMovies) && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
              <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
              <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;