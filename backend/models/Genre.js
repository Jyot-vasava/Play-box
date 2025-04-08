// Importing mongoose, a MongoDB object modeling tool for Node.js

import mongoose from "mongoose";

// Defining the schema for the Genre

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

// Exporting the model created with the defined schema which will allow other files to interact with the Genre collection in MongoDB
export default mongoose.model("Genre", genreSchema);