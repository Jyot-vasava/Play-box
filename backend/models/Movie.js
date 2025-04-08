import mongoose from "mongoose";

//schema for movie reviews
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },

    comment: { type: String, required: true },
    // Reference to the user who made the review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Refers to the 'User' model
    },
  },
  { timestamps: true } 
);

//schema for movies
const movieSchema = new mongoose.Schema(
  {

    name: { type: String, required: true },

    image: { type: String }, // image url

    video: { type: String }, // video url

    year: { type: Number, required: true },

    rating: { type: Number, required: true },

    genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true }, // reference to Genre Schema

    detail: { type: String, required: true },

    cast: [{ type: String }], // Array os string

    reviews: [reviewSchema],

    numReviews: { type: Number, required: true, default: 0 },

    createdAt: { type: Date, default: Date.now },
    tier: {
      type: [String], // Array of strings to allow multiple tiers
      enum: ['gold', 'silver', 'platinum'], 
      required: true, 
    },
  },
  { timestamps: true } 
);

// Create the Movie Model
const Movie = mongoose.model("Movie", movieSchema);

export default Movie; 
