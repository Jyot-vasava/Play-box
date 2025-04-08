import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Controller to create a new genre
const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the name is provided
    if (!name) {
      return res.json({ error: "Name is required" });
    }

    // Check if the genre already exists
    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      return res.json({ error: "Already exists" });
    }

    // Create and save a new genre
    const genre = await new Genre({ name }).save();
    res.json(genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

// Controller to update an existing genre
const updateGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Find the genre by ID
    const genre = await Genre.findOne({ _id: id });

    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    // Update the genre name
    genre.name = name;

    // Save the updated genre
    const updatedGenre = await genre.save();
    res.json(updatedGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Controller to remove a genre by ID
const removeGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the genre by ID
    const removed = await Genre.findByIdAndDelete(id);

    if (!removed) {
      return res.status(404).json({ error: "Genre not found" });
    }

    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval server error" });
  }
});

// Controller to list all genres
// This function uses the asyncHandler to catch any asynchronous errors and handle them properly
const listGenres = asyncHandler(async (req, res) => {
  try {
    const all = await Genre.find({}); 
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

// Controller to read a single genre by its ID
// This function uses the asyncHandler to catch any asynchronous errors and handle them properly
const readGenre = asyncHandler(async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id }); 
    res.json(genre);
  } catch (error) {
    console.log(error); 
    return res.status(400).json(error.message);
  }
});

export { createGenre, updateGenre, removeGenre, listGenres, readGenre};
