/**
 * userRoute.test.js - User Route Tests
 *
 * This module contains tests for the user routes defined in userRoute.js.
 * It covers the user registration, user login, and user profile endpoints.
 *
 * Dependencies:
 * - chai: Assertion library for making assertions in test cases.
 * - chai-http: Chai plugin for making HTTP requests and assertions.
 * - app: Express app instance from the main app.js file.
 * - User model from models/userModel.
 * - userController: Controller functions for handling user-related routes.
 */

const chai = require("chai"); // Import the assertion library
const chaiHttp = require("chai-http"); // Import the chai-http plugin
const jwt = require("jsonwebtoken");
const app = require("../../../server/src/app"); // Import the Express app instance
const User = require("../../../server/src/models/userModel"); // Import the User model
const expect = chai.expect;
const connectDatabase = require("../../../server/src/database/databaseConnection"); // Import the database connection utility

chai.use(chaiHttp); // Use the chai-http plugin

// Load environment variables from .env
require("dotenv").config();

// Test suite for user routes
describe("User Routes", () => {
  // Clear the users collection before running tests
  before(async () => {
    // Connect to the MongoDB database using connectDatabase
    db = await connectDatabase();
    // Drop the collection to start fresh for testing
    await db.collection("users").deleteMany({});
  });

  // Run after all test cases
  after(async () => {
    // Close the MongoDB connection after all tests are done
    db.close();
    // Forcefully exit the process
    process.exit(0);
  });

  /**
   * Test Case 1:
   * User registration.
   */
  it("should register a new user", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
    };

    const res = await chai
      .request(app)
      .post("/api/users/register")
      .send(userData);

    expect(res).to.have.status(201);
    expect(res.body.message).to.equal("User registered successfully");
  });

  /**
   * Test Case 2:
   * User login.
   */
  it("should log in a user", async () => {
    const loginData = {
      email: "test@example.com",
      password: "testpassword",
    };

    const res = await chai
      .request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(res).to.have.status(200);
    expect(res.body.token).to.exist;
  });

  /**
   * Test Case 3:
   * Get user profile.
   */
  it("should get user profile", async () => {
    const user = new User({
      username: "testuser2",
      email: "test2@example.com",
      password: "testpassword2",
    });

    await user.save();

    // Generate a valid token for an authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const res = await chai
      .request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body.username).to.equal(user.username);
    expect(res.body.email).to.equal(user.email);
    expect(res.body.password).to.not.exist;
  });
});
