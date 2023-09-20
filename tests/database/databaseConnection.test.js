/**
 * db.connection.test.js - Database Connection Test
 * This file contains a test to verify the database connection setup.
 * It uses the Mocha testing framework and the Chai assertion library.
 *
 * Dependencies:
 * - mongoose: MongoDB ODM (Object Data Modeling)
 * - chai: Assertion library for tests
 * - dotenv: Load environment variables from .env
 */

const mongoose = require("mongoose");
const expect = require("chai").expect;

// Load environment variables from .env using dotenv
require("dotenv").config();

// Define the test suite
describe("Database Connection Test", () => {
  /**
   * Test Case 1:
   * Database connection.
   * Should connect to the database.
   */
  it("Should connect to the database", (done) => {
    // Connect to the MongoDB database using the MONGO_URI environment variable
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get a reference to the Mongoose connection object
    const db = mongoose.connection;

    // Listen for the 'open' event to confirm successful connection
    db.once("open", () => {
      // Verify that the readyState is 1 (connected)
      expect(db.readyState).to.equal(1); // 1 means connected
      done(); // Signal test completion
    });

    // Listen for the 'error' event to handle connection errors
    db.on("error", (error) => {
      console.error("Connection error:", error);
      done(error); // Signal test failure with the error
    });

    db.close(); // Close the connection
  });

  /**
   * Test Case 2:
   * Database disconnection.
   * Should disconnect from the database.
   */
  it("Should disconnect from the database", (done) => {
    // Connect to the MongoDB database using the MONGO_URI environment variable
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get a reference to the Mongoose connection object
    const db = mongoose.connection;

    // Listen for the 'open' event to confirm successful connection
    db.once("open", () => {
      // Verify that the readyState is 1 (connected)
      expect(db.readyState).to.equal(1); // 1 means connected

      // Close the connection
      db.close(() => {
        // Verify that the readyState is 0 (disconnected)
        expect(db.readyState).to.equal(0); // 0 means disconnected
        done(); // Signal test completion
      });
    });

    // Listen for the 'error' event to handle connection errors
    db.on("error", (error) => {
      console.error("Connection error:", error);
      done(error); // Signal test failure with the error
    });
  });
});
