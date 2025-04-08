import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

//  function to create a new user account
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, tier } = req.body;


  if (!username || !email || !password || !tier) {
    throw new Error("Please fill all the fields");
  }

  // Check if the user already exists based on their email
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send("User already exists");

  // Generate a salt and hash the user's password for security
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword, tier: tier });

  try {
  
    await newUser.save();

    // Create a token 
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      tier: newUser.tier,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// function for user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database based on the provided email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // Compare provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
      // If password matches, generate a token for the session
      createToken(res, existingUser._id);

    
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        tier: existingUser.tier,
      });
    } else {
    
      return res.status(401).json({ message: "Invalid Password" });
    }
  } else {
  
    return res.status(401).json({ message: "User not found" });
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  // Clear the JWT cookie by setting its value to an empty string
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// Get all users from the database 
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get the profile of the currently authenticated user
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Return user details excluding sensitive information
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      tier: user.tier, 
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// Update the profile of the currently authenticated user
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Update user details based on request body or keep existing values
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    // Hash the new password if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

  
    const updatedUser = await user.save();

    // Return updated user details excluding sensitive information
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin, 
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};
