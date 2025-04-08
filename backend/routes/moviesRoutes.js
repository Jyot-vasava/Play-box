import express from "express";
import multer from "multer";
const router = express.Router();

// Configure multer to store files in memory as buffers for processing
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Controllers
import {
  createMovie,    
  updateMovie,    
  deleteMovie,    
  deleteComment,
  getAllMovies,
  getSpecificMovie,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
  movieReview
} from "../controllers/movieController.js";

// Middlewares
import {
  authenticate,    
  authorizeAdmin,  
} from "../middlewares/authMiddleware.js";

import checkId from "../middlewares/checkId.js";


// Public Routes - Accessible to all authenticated users
router.get("/all-movies", authenticate, getAllMovies);  // Get all movies, requires authentication
router.get("/specific-movie/:id", getSpecificMovie);    // Get a specific movie by ID
router.get("/new-movies", authenticate, getNewMovies);  // Get new movie releases, requires authentication
router.get("/top-movies", authenticate, getTopMovies);  // Get top-rated movies, requires authentication
router.get("/random-movies", authenticate, getRandomMovies); // Get random movie suggestions, requires authentication


// Restricted Routes - Accessible to authenticated users
router.post("/:id/reviews", authenticate, checkId, movieReview); // Add a review to a movie by ID, requires authentication


// Admin routes - Admin authentication and admin authorization Requires

// Route to create a new movie
// Supports image and video uploads using multer
router.post(
  "/create-movie",
  authenticate, 
  authorizeAdmin, 
  upload.fields([{ name: "image" }, { name: "video" }]), // Upload image and video as buffers
  createMovie
);

// Route to update an existing movie by ID
// Supports image and video uploads using multer
router.put(
  "/update-movie/:id",
  authenticate, 
  authorizeAdmin, 
  upload.fields([{ name: "image" }, { name: "video" }]), // Upload image and video as buffers
  updateMovie
);

// Route to delete a movie by ID
router.delete(
  "/delete-movie/:id",
  authenticate, 
  authorizeAdmin, 
  deleteMovie
);

// Route to delete a comment from a movie
router.delete(
  "/delete-comment",
  authenticate, 
  authorizeAdmin, 
  deleteComment
);

export default router;
