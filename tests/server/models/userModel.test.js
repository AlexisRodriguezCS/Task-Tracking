/**
 * user.test.js - User Model Tests
 *
 * This module contains tests for the User model's password hashing and authentication methods.
 * It ensures that the User model's password hashing and authentication methods are working as expected.
 *
 * Dependencies:
 * - chai: Assertion library for making assertions in test cases.
 * - chai-as-promised: Chai extension to work with promises for better assertion handling.
 * - User: The User model to be tested
 * - hashPassword: The password hashing utility
 * - connectDatabase: Database connection utility
 */

const expect = require("chai").expect; // Import the assertion library
const User = require("../../../server/src/models/userModel"); // Import the User model
const hashPassword = require("../../../server/src/utils/passwordHashing"); // Import the password hashing utility
const connectDatabase = require("../../../server/src/database/databaseConnection"); // Import the database connection utility

// Test suite for the User Model
describe("User Model", () => {
  let db; // Database connection instance

  // Connect to the MongoDB Atlas cluster before running tests
  before(async () => {
    // Connect to the MongoDB database using connectDatabase
    db = await connectDatabase();

    // Drop the collection to start fresh for testing
    await db.collection("users").deleteMany({});
  });

  // Close the MongoDB Atlas connection after all tests are done
  after(async () => {
    await db.close();
  });

  /**
   * Test Case 1:
   * Hashing password before saving.
   */
  it("should hash the password before saving", async () => {
    // Define user data with plain-text password
    const userData = {
      username: "testuser1",
      email: "test@example1.com",
      password: "testpassword",
    };

    // Create a new User instance with the data
    const user = new User(userData);

    // Save the user to the database
    const savedUser = await db.collection("users").insertOne(user);

    // Make sure the saved password is hashed
    expect(savedUser.password).to.not.equal(userData.password);
  });

  /**
   * Test Case 2:
   * Validating required fields.
   */
  it("should require username, email, and password fields", async () => {
    // Create a user without providing required fields
    const user = new User();

    let error;
    try {
      // Validate the user, capturing any validation error
      await user.validate();
    } catch (err) {
      error = err;
    }

    // Expect validation errors for missing fields
    expect(error.errors.username).to.exist;
    expect(error.errors.email).to.exist;
    expect(error.errors.password).to.exist;
  });

  /**
   * Test Case 3:
   * Comparing passwords for user authentication.
   */
  it("should compare passwords for user authentication", async () => {
    // Define user data with plain-text password
    const userData = {
      username: "testuser2",
      email: "test@example2.com",
      password: "testpassword2",
    };

    // Hash the password using the password hashing function
    const hashedPassword = await hashPassword(userData.password);

    // Create a new User instance with hashed password
    const user = new User({
      ...userData,
      password: hashedPassword,
    });

    // Save the user to the database
    await db.collection("users").insertOne(user);

    // Check password authentication
    const authenticated = await user.comparePassword("testpassword2");
    expect(authenticated).to.be.true;

    const notAuthenticated = await user.comparePassword("wrongpassword");
    expect(notAuthenticated).to.be.false;
  });

  /**
   * Test Case 4:
   * Storing the unique identifier for anonymous tasks.
   */
  it("should store the unique identifier for anonymous tasks", async () => {
    // Define user data with anonymous identifier
    const userData = {
      username: "testuser3",
      email: "test@example3.com",
      password: "testpassword3",
      anonymousIdentifier: "abc123",
    };

    // Create a new User instance with the data
    const user = new User(userData);

    // Save the user to the database
    const savedUser = await db.collection("users").insertOne(user);

    // Retrieve the saved user from the database
    const retrievedUser = await db.collection("users").findOne({
      _id: savedUser.insertedId,
    });

    // Expect the retrieved anonymous identifier to match the input
    expect(retrievedUser.anonymousIdentifier).to.equal(
      userData.anonymousIdentifier
    );
  });
});
