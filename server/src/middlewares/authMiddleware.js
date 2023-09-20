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

// const jwt = require("jsonwebtoken");

// // Load environment variables from .env
// require("dotenv").config();

// /**
//  * authMiddleware - Middleware function to handle user authentication.
//  * Checks for a valid JWT in the Authorization header.
//  * If the token is valid, sets the authenticated user in the request.
//  * If the token is missing or invalid, returns a 401 Unauthorized response.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  * @param {function} next - Next middleware function.
//  */
// function authMiddleware(req, res, next) {
//   // Get the token from the request headers
//   const token = req.headers.authorization?.replace(/^Bearer\s/, "");

//   // If no token is provided, deny access
//   if (!token) {
//     // console.log("First Error");
//     res.status = 401;
//     res.data = { error: "Access denied. Token missing." };
//     return;
//     // return res.status(401).json({ error: "Access denied. Token missing." });
//   }

//   try {
//     // Verify the token using the secret key from .env
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     // Attach the decoded user data to the request for future use
//     req.user = { userId: decoded.userId };
//     // Move to the next middleware
//     next();
//   } catch (error) {
//     // console.log("Second Error");
//     res.status = 401;
//     res.data = { error: "Invalid token." };
//     // res.status(401).json({ error: "Invalid token." });
//   }
// }

// // Export the middleware function
// module.exports = authMiddleware;

// /*
//  * authMiddleware.js - Authentication Middleware
//  *
//  * This module defines a middleware function for user authentication.
//  * It checks for a valid JSON Web Token (JWT) in the Authorization header
//  * and in cookies of incoming requests to protect routes that require authentication.
//  *
//  * Dependencies:
//  * - jwt: Library for creating and verifying JSON Web Tokens
//  * - cookie-parser: Library for parsing cookies in Express
//  */

// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

// // Load environment variables from .env
// require("dotenv").config();

// /**
//  * authMiddleware - Middleware function to handle user authentication.
//  * Checks for a valid JWT in the Authorization header and in cookies.
//  * If the token is valid, sets the authenticated user in the request.
//  * If the token is missing or invalid, returns a 401 Unauthorized response.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  * @param {function} next - Next middleware function.
//  */
// function authMiddleware(req, res, next) {
//   // Use the cookie-parser middleware to parse cookies
//   cookieParser()(req, res, () => {
//     // First, try to get the token from the headers
//     const tokenFromHeader = req.headers.authorization?.replace(/^Bearer\s/, "");

//     // Then, try to get the token from cookies
//     const tokenFromCookie = req.cookies["connect.sid"];

//     // If no token is provided from either source, deny access
//     if (!tokenFromHeader && !tokenFromCookie) {
//       return res.status(401).json({ error: "Access denied. Token missing." });
//     }

//     try {
//       // Try to verify the token from the headers (if present)
//       if (tokenFromHeader) {
//         const decodedTokenFromHeader = jwt.verify(
//           tokenFromHeader,
//           process.env.SECRET_KEY
//         );
//         req.user = { userId: decodedTokenFromHeader.userId };
//       }

//       // Try to verify the token from cookies (if present)
//       if (tokenFromCookie) {
//         const decodedTokenFromCookie = jwt.verify(
//           tokenFromCookie,
//           process.env.SECRET_KEY
//         );
//         req.user = { userId: decodedTokenFromCookie.userId };
//       }

//       // Move to the next middleware
//       next();
//     } catch (error) {
//       console.log("Here: " + error);
//       return res.status(401).json({ error: "Access denied. Invalid token." });
//     }
//   });
// }

// // Export the middleware function
// module.exports = authMiddleware;
