/*
 * userRoute.js - User API Routes
 *
 * This module defines the API routes for managing users.
 * It includes endpoints for user registration, user login, user profile, and
 * tasks synchronization.
 *
 * Dependencies:
 * - express: Express.js framework for building web applications
 * - userController: Controller functions for handling user-related routes
 */

const express = require("express"); // Import the Express module
const router = express.Router(); // Create an instance of Express router
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// POST user registration
router.post("/register", userController.registerUser);

// POST user login
router.post("/login", userController.loginUser);

// GET user profile (requires authentication)
router.get("/profile", authMiddleware, userController.getUserProfile);

// POST user logout
router.post("/logout", userController.handleLogout);
//router.post("/logout", authMiddleware, userController.handleLogout);

// GET check-auth to verify user's authentication status
router.get("/check-auth", authMiddleware, userController.checkAuth);

// Export the router for use in other files
module.exports = router;
