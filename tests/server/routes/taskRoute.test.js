/**
 * taskRoutes.test.js - Task API Routes Tests
 *
 * This module contains tests for the task API routes.
 * It ensures that the endpoints for managing tasks are working as expected.
 *
 * Dependencies:
 * - chai: Assertion library for writing test assertions
 * - chai-http: HTTP plugin for making requests in tests
 * - app: The Express application to be tested
 * - connectDatabase: Function to establish a connection to the database
 * - Task: Mongoose model for tasks
 * - expect: Assertion function provided by chai
 *
 * Usage:
 * Run the tests using the Mocha test runner.
 * npx mocha /tests/server/controller/taskRoute.test.js
 */

const chai = require("chai"); // Assertion library
const chaiHttp = require("chai-http"); // HTTP plugin for making requests
const expect = chai.expect;
const app = require("../../../server/src/app"); // Import your Express application
const connectDatabase = require("../../../server/src/database/databaseConnection"); // Import the database connection utility

// Load environment variables from .env using dotenv
require("dotenv").config();

// Use chai-http plugin for making HTTP requests
chai.use(chaiHttp);

// Test suite for the Task Controller
describe("Task Controller", () => {
  let db; // Database connection
  let testTaskId; // ID of a test task

  // Run before all test cases
  before(async () => {
    // Connect to the MongoDB database using connectDatabase
    db = await connectDatabase();

    // Drop the collection to start fresh for testing
    await db.collection("tasks").deleteMany({});

    // Define sample tasks for testing
    const sampleTasks = [
      { title: "Task 1", description: "Description 1" },
      { title: "Task 2", description: "Description 2" },
    ];

    // Insert sample tasks into the database
    await db.collection("tasks").insertMany(sampleTasks);

    // Create a sample task
    const sampleTask = {
      title: "Sample Task",
      description: "This is a sample task.",
    };

    // Insert sample task into the database and save its ID
    const result = await db.collection("tasks").insertOne(sampleTask);
    testTaskId = result.insertedId.toString();
  });

  // Run after all test cases
  after(async () => {
    // Close the MongoDB connection after all tests are done
    db.close();
    // Forcefully exit the process
    process.exit(0);
  });

  // Test cases for Task API routes
  describe("Task API Routes", () => {
    /**
     * Test Case 1:
     * Getting all tasks.
     */
    it("should get all tasks", async () => {
      const res = await chai.request(app).get("/api/tasks");
      // Assertions for getting all tasks
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
    });

    /**
     * Test Case 2:
     * Getting a task by ID.
     */
    it("should get a task by ID", async () => {
      const res = await chai.request(app).get(`/api/tasks/${testTaskId}`);
      // Assertions for getting task by ID
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
    });

    /**
     * Test Case 3:
     * Creating a new task.
     */
    it("should create a new task", async () => {
      const newTaskData = {
        title: "New Task",
        description: "This is a new task.",
      };

      const res = await chai.request(app).post("/api/tasks").send(newTaskData);
      // Assertions for creating task
      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body.title).to.equal(newTaskData.title);
      expect(res.body.description).to.equal(newTaskData.description);
    });

    /**
     * Test Case 4:
     * Updating a task by ID.
     */
    it("should update a task by ID", async () => {
      // Retrieve the task by ID
      const getRes = await chai.request(app).get(`/api/tasks/${testTaskId}`);
      const originalTask = getRes.body;

      // Update the status to IN_PROGRESS
      originalTask.status = "IN_PROGRESS";

      // Send the updated task to the server
      const res = await chai
        .request(app)
        .put(`/api/tasks/${testTaskId}`)
        .send(originalTask);
      // Assertions for updating task by ID
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.title).to.equal(originalTask.title);
      expect(res.body.description).to.equal(originalTask.description);
      expect(res.body.status).to.equal("IN_PROGRESS");
    });

    /**
     * Test Case 5:
     * Deleting a task by ID.
     */
    it("should delete a task by ID", async () => {
      const res = await chai.request(app).delete(`/api/tasks/${testTaskId}`);
      // Assertions for deleting task by ID
      expect(res).to.have.status(204);
      expect(res.body).to.be.empty;
    });
  });
});
