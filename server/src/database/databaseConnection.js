/*
 * databaseConnection.js - Database Connection Module
 *
 * This module establishes a connection to the MongoDB database using Mongoose.
 * It exports a function that returns the database connection object.
 *
 * Dependencies:
 * - mongoose: MongoDB object modeling tool
 *
 * Usage:
 * Import and call the connectDatabase function to establish a connection.
 * The function returns the database connection object.
 */

const mongoose = require("mongoose");

// Load environment variables from .env
require("dotenv").config();

/**
 * connectDatabase - Establishes a connection to the MongoDB database.
 * @returns {Object} The Mongoose database connection object.
 */
module.exports = async function connectDatabase() {
  try {
    // Establish the connection using provided options
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    // Set up event listeners for connection errors and successful connections
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    return db; // Return the database connection object
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
