/*
 * authMiddleware.js - Authentication Middleware
 *
 * This module defines a middleware function for user authentication.
 * It checks for a valid JSON Web Token (JWT) in the Authorization header
 * of incoming requests to protect routes that require authentication.
 *
 * Dependencies:
 * - jwt: Library for creating and verifying JSON Web Tokens
 */

const jwt = require("jsonwebtoken");

// Load environment variables from .env
require("dotenv").config();

/**
 * authMiddleware - Middleware function to handle user authentication.
 * Checks for a valid JWT in the Authorization header.
 * If the token is valid, sets the authenticated user in the request.
 * If the token is missing or invalid, proceeds without setting `req.user`.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
function authMiddleware(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization?.replace(/^Bearer\s/, "");

  // If no token is provided, proceed without setting `req.user`
  if (!token) {
    next(); // Continue to the next middleware or route handler
    return;
  }

  try {
    // Verify the token using the secret key from .env
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Attach the decoded user data to the request for future use
    req.user = { userId: decoded.userId };
    // Move to the next middleware
    next();
  } catch (error) {
    // Handle token verification errors, but still proceed without setting `req.user`
    next();
  }
}

// Export the middleware function
module.exports = authMiddleware;
