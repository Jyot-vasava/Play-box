// NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 404 Header */}
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-gray-900">404</h1>
          <div className="h-2 w-20 bg-blue-500 mx-auto rounded-full" />
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg">
            Sorry, we couldn't find the page you're looking for. It might have
            been removed, renamed, or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go Back
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default NotFound;
