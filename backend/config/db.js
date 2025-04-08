import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to MongoDB 👍`);
  } catch (error) {
    // Log error and exit if connection fails
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
