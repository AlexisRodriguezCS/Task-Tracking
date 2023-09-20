/**
 * authMiddleware.test.js - Authentication Middleware Tests
 *
 * This module contains tests for the authMiddleware.js module. It simulates the behavior
 * of user authentication middleware by mocking Express request, response, and next functions,
 * as well as JWT verification process. It tests scenarios where the token is valid, missing, and invalid.
 *
 * Dependencies:
 * - jwt: Library for creating and verifying JSON Web Tokens
 * - chai: Assertion library for making assertions in test cases
 * - authMiddleware: Middleware function for user authentication
 */

const jwt = require("jsonwebtoken");
const expect = require("chai").expect;
const authMiddleware = require("../../../server/src/middlewares/authMiddleware");

// Load environment variables from .env
require("dotenv").config();

// Define mock objects
let req, res, next;

// Before each test case, initialize the mock objects
beforeEach(() => {
  req = { headers: {} };
  res = {
    status: (code) => ({
      json: (data) => ({ code, data }),
    }),
  };
  next = () => {};
});

// Set payload and options for the token
const payload = {
  userId: "user123",
};

const options = {
  expiresIn: "1h", // You can adjust the expiration time as needed
};

// Generate a token
const token = jwt.sign(payload, process.env.SECRET_KEY, options);

// Test suite for authMiddleware
describe("authMiddleware", () => {
  /**
   * Test Case 1:
   * Valid token.
   * Set user data if the token is valid.
   */
  it("Should set user data if token is valid", () => {
    // Set a valid token in the request header
    req.headers["Authorization"] = token;
    // Call the middleware
    authMiddleware(req, res, next);
    // Expect user data to be set in the request
    expect(req.user).to.deep.equal({ userId: "user123" });
  });

  /**
   * Test Case 2:
   * Missing token.
   * Return 401 if the token is missing.
   */
  it("Should return 401 if token is missing", () => {
    // Call the middleware without setting a token
    authMiddleware(req, res, next);
    // Expect a 401 response
    expect(res.status).to.equal(401);
    expect(res.data.error).to.equal("Access denied. Token missing.");
  });

  /**
   * Test Case 3:
   * Invalid token.
   * Return 401 if the token is invalid.
   */
  it("Should return 401 if token is invalid", () => {
    // Set an invalid token in the request header
    req.headers["Authorization"] = "invalidToken";
    // Call the middleware with an invalid token
    authMiddleware(req, res, next);
    // Expect a 401 response
    expect(res.status).to.equal(401);
    expect(res.data.error).to.equal("Invalid token.");
  });
});
