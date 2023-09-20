/*
 * userController.js - User Controller
 *
 * This module contains the controller functions for handling user-related routes.
 *
 * Dependencies:
 * - User model from models/userModel
 * - jwt: Library for creating and verifying JSON Web Tokens
 */

const User = require("../../../server/src/models/userModel"); // Import the User model from models/user.js
const Task = require("../../../server/src/models/tasksModel");
const validator = require("validator"); // Import the 'validator' library to check if the email is valid
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

// Load environment variables from .env
require("dotenv").config();

/**
 * syncTasksToUser - Handles the synchronization of tasks to a user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} user - The user object.
 */
const syncTasksToUser = async (req, res, user) => {
  // Check if the user has an anonymous identifier cookie
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const anonymousIdentifier = cookies.anonymousIdentifier;

  if (anonymousIdentifier) {
    user.anonymousIdentifier = anonymousIdentifier;

    // Find tasks with the same anonymous identifier and update userId
    await Task.updateMany(
      {
        anonymousIdentifier,
        userId: null, // Only update tasks not yet associated with a user
      },
      {
        $set: {
          userId: user._id,
          isAnonymous: false,
          anonymousIdentifier: null || "",
        },
      }
    );

    // Clear the anonymous identifier cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("anonymousIdentifier", "", {
        expires: new Date(0),
      })
    );
  }
};

/**
 * registerUser - Controller function to register a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
// Register a new user
async function registerUser(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({ email, password });

    // Server-side validation for password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    // Call the syncTasksToUser function
    await syncTasksToUser(req, res, newUser);

    // Save the user
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering user" });
  }
}

/**
 * loginUser - Controller function to authenticate a user and set JWT as an HttpOnly cookie.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Couldn't find an account associated with this email.",
      });
    }

    // Compare passwords for authentication
    const isAuthenticated = await user.comparePassword(password);
    if (!isAuthenticated) {
      return res
        .status(401)
        .json({ error: "That password was incorrect. Please try again." });
    }

    // Call the syncTasksToUser function
    await syncTasksToUser(req, res, user);

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // Set the JWT as an HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      secure: false, // Set this to true when using HTTPS
      expires: new Date(new Date().getTime() + 100 * 1000),
      sameSite: "None", // Add this line
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
}

/**
 * getUserProfile - Controller function to get user profile.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function getUserProfile(req, res) {
  // The user's ID is stored in req.user after authentication middleware
  const userId = req.user.userId;

  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
}

/**
 * checkAuth - Controller function to check user's authentication status.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function checkAuth(req, res) {
  // If the middleware has successfully authenticated the user, the user is authenticated
  res.status(200).json({ message: "Authenticated" });
}

/**
 * handleLogout - Controller function to handle user logout.
 * Clears the authentication cookie to log the user out.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
function handleLogout(req, res) {
  // Clear the authentication cookie to log the user out
  res.clearCookie("authToken", {
    httpOnly: true,
    domain: "localhost",
    path: "/",
    secure: false, // Set this to true when using HTTPS
    sameSite: "None", // Add this line
  });

  res.status(200).json({ message: "Logged out successfully" });
}

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  handleLogout,
  checkAuth,
};
