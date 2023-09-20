/**
 * userController.test.js - User Controller Tests
 *
 * This module contains tests for the userController.js module.
 * It covers the controller functions for user registration, user login, and getting user profile.
 *
 * Dependencies:
 * - chai: Assertion library for making assertions in test cases.
 * - sinon: Library for creating spies, stubs, and mocks in tests.
 * - User model from models/userModel.
 * - Task model from models/task.
 * - userController: Controller functions for handling user-related routes.
 */

const chai = require("chai"); // Import the assertion library
const sinon = require("sinon"); // Import sinon for creating spies, stubs, and mocks
const User = require("../../../server/src/models/userModel"); // Import the User model
const userController = require("../../../server/src/controllers/userController"); // Import the userController
const expect = chai.expect;

// Test suite for user controller
describe("User Controller", () => {
  let res;
  let req;

  beforeEach(() => {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    req = {
      body: {},
      user: {},
    };
  });

  // Run after all test cases
  after(async () => {
    // Forcefully exit the process
    process.exit(0);
  });

  /**
   * Test Case 1:
   * Register a new user.
   */
  it("should register a new user", async () => {
    req.body = {
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
    };
    req.headers = {};
    const newUser = new User(req.body);

    const saveStub = sinon.stub(User.prototype, "save");
    saveStub.resolves(newUser);

    await userController.registerUser(req, res);

    expect(saveStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: "User registered successfully" })).to
      .be.true;

    saveStub.restore();
  });

  /**
   * Test Case 2:
   * Log in a user with valid credentials.
   */
  // it("should log in a user with valid credentials", async () => {
  //   const user = new User({
  //     email: "test@example.com",
  //     password: "testpassword",
  //   });

  //   const comparePasswordStub = sinon.stub(User.prototype, "comparePassword");
  //   comparePasswordStub.resolves(true);

  //   const token = "sampleToken";

  //   // here
  //   const jwtSignStub = sinon.stub(userController, "generateAuthToken");
  //   jwtSignStub.returns(token);

  //   req.body = {
  //     email: "test@example.com",
  //     password: "testpassword",
  //   };

  //   await userController.loginUser(req, res);

  //   expect(comparePasswordStub.calledOnce).to.be.true;
  //   expect(jwtSignStub.calledOnce).to.be.true;
  //   expect(res.status.calledWith(200)).to.be.true;
  //   expect(res.json.calledWith({ token })).to.be.true;

  //   comparePasswordStub.restore();
  //   jwtSignStub.restore();
  // });

  // /**
  //  * Test Case 3:
  //  * Fail to log in a user with invalid credentials.
  //  */
  // it("should fail to log in a user with invalid credentials", async () => {
  //   const user = new User({
  //     email: "test@example.com",
  //     password: "testpassword",
  //   });

  //   const comparePasswordStub = sinon.stub(User.prototype, "comparePassword");
  //   comparePasswordStub.resolves(false);

  //   req.body = {
  //     email: "test@example.com",
  //     password: "wrongpassword",
  //   };

  //   await userController.loginUser(req, res);

  //   expect(comparePasswordStub.calledOnce).to.be.true;
  //   expect(res.status.calledWith(401)).to.be.true;
  //   expect(res.json.calledWith({ error: "Invalid credentials" })).to.be.true;

  //   comparePasswordStub.restore();
  // });

  // /**
  //  * Test Case 4:
  //  * Get user profile with valid token.
  //  */
  // it("should get user profile with valid token", async () => {
  //   const userId = "user123";

  //   req.user.userId = userId;

  //   const user = new User({
  //     _id: userId,
  //     username: "testuser",
  //     email: "test@example.com",
  //   });

  //   const findByIdStub = sinon.stub(User, "findById");
  //   findByIdStub.withArgs(userId).resolves(user);

  //   await userController.getUserProfile(req, res);

  //   expect(findByIdStub.calledOnce).to.be.true;
  //   expect(res.status.calledWith(200)).to.be.true;
  //   expect(res.json.calledWith(user)).to.be.true;

  //   findByIdStub.restore();
  // });

  // /**
  //  * Test Case 5:
  //  * Fail to get user profile with invalid token.
  //  */
  // it("should fail to get user profile with invalid token", async () => {
  //   req.user.userId = "invalidUserId";

  //   const findByIdStub = sinon.stub(User, "findById");
  //   findByIdStub.resolves(null);

  //   await userController.getUserProfile(req, res);

  //   expect(findByIdStub.calledOnce).to.be.true;
  //   expect(res.status.calledWith(404)).to.be.true;
  //   expect(res.json.calledWith({ error: "User not found" })).to.be.true;

  //   findByIdStub.restore();
  // });
});
