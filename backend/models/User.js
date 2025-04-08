import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true, 
    },

    email: {
      type: String,
      required: true, 
      unique: true, 
    },

    password: {
      type: String,
      required: true, 
    },

    isAdmin: {
      type: Boolean,
      default: false, 
    },
    
    tier: {
      type: String,
      enum: ['gold', 'silver', 'platinum'], 
      default: 'silver', // Defaults to 'silver' tier if not provided
      required: true, 
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
