import express from "express";
const router = express.Router();

// Genre Controller functions
import {
  createGenre,
  updateGenre,
  removeGenre,
  listGenres,
  readGenre,
} from "../controllers/genreController.js";

// Auth Middleware for authentication and admin authorization
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Genre routes
router.route("/").post(authenticate, authorizeAdmin, createGenre); // Create a new genre
router.route("/:id").put(authenticate, authorizeAdmin, updateGenre); // Update an existing genre
router.route("/:id").delete(authenticate, authorizeAdmin, removeGenre); // Delete a genre
router.route("/genres").get(listGenres); // Get a list of all genres
router.route("/:id").get(readGenre); // Get details of a specific genre

export default router;
