/*
 * app.js - Task Management API Server
 * This file sets up the Express server, connects to MongoDB, and defines routes.
 *
 * Dependencies:
 * - express: Web framework for Node.js
 * - body-parser: Middleware for parsing JSON data in requests
 * - dotenv: Load environment variables from .env file
 * - databaseConnection: Custom database connection function
 * - userRoutes: Custom route definitions for users
 * - taskRoutes: Custom route definitions for tasks
 */

// Load required modules
const express = require("express"); // Import Express web framework
const bodyParser = require("body-parser"); // Middleware to parse request bodies
const databaseConnection = require("../src/database/databaseConnection");
const userRoutes = require("./routes/userRoute");
const taskRoutes = require("./routes/taskRoute");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express(); // Create an instance of Express
app.use(cookieParser());

const frontendUrl = "https://trask-tracking-app.netlify.app";
// const frontendUrl = "http://localhost:3000";

app.use(
  cors({
    origin: frontendUrl, // Update to match your frontend URL
    credentials: true, // Allow cookies and other credentials to be sent
  })
);

// Load environment variables from .env
require("dotenv").config();

// Use body-parser middleware to parse JSON data in requests
app.use(bodyParser.json());

// Use the 'express-session' middleware to create a session and set an HttpOnly cookie
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, // Set HttpOnly to true to prevent JavaScript access
    },
  })
);

// Use the imported route files as middleware
app.use("/api/users", userRoutes); // Use user routes
app.use("/api/tasks", taskRoutes); // Use task routes

// Connect to the MongoDB database using the custom connection function
databaseConnection().then(() => {
  // Define a simple welcome route for the root URL
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Task Management API!" });
  });

  // Error handling middleware to catch and handle errors
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong on the server" });
  });

  // Start the server on the specified port
  // const PORT = process.env.PORT || 3001; // Default to 3001
  // app.listen(PORT, () => {
  //   console.log(`Server is running on port ${PORT}`);
  // });
});

module.exports = app;
