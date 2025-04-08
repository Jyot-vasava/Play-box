
// Utility function to handle asynchronous route handlers and middleware
// It ensures that errors occurring in asynchronous functions are properly caught and passed to the error-handling mechanism
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch((error) => {
      // Catch any errors
      res.status(500).json({ message: error.message });
    });
};

export default asyncHandler;
