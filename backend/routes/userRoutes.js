import express from "express";

import {
  createUser, 
  loginUser, 
  logoutCurrentUser, 
  getAllUsers, 
  getCurrentUserProfile, 
  updateCurrentUserProfile, 
} from "../controllers/userController.js";

// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"; 

const router = express.Router(); 

// Route to create a new user 
router.post("/", createUser);
// Route to get all users, only accessible by an admin (requires authentication and admin authorization)
router.get("/", authenticate, authorizeAdmin, getAllUsers);

// Route to login a user 
router.post("/auth", loginUser);
// Route to logout the current user 
router.post("/logout", logoutCurrentUser);

// Route to fetch the current user profile, only accessible by authenticated users
router.get("/profile", authenticate, getCurrentUserProfile); 
// Route to update the current user profile, only accessible by authenticated users
router.put("/profile", authenticate, updateCurrentUserProfile);

export default router;
