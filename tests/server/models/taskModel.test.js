/**
 * task.test.js - Task Model Tests
 *
 * This module contains tests for the Task model's creation and validation.
 * It ensures that tasks can be created with the required fields and that
 * validation for required fields is working as expected.
 *
 * Dependencies:
 * - chai: Assertion library for making assertions in test cases
 * - Task: The Task model to be tested
 * - connectDatabase: Database connection utility
 */

const expect = require("chai").expect; // Import the assertion library
const Task = require("../../../server/src/models/tasksModel"); // Import the Task model
const connectDatabase = require("../../../server/src/database/databaseConnection"); // Import the database connection utility

// Test suite for the Task Model
describe("Task Model", () => {
  let db; // Database connection instance

  // Clear the database before running tests
  before(async () => {
    // Connect to the MongoDB database using connectDatabase
    db = await connectDatabase();

    // Drop the collection to start fresh for testing
    await db.collection("tasks").deleteMany({});
  });

  // After all tests, close the database connection
  after(async () => {
    await db.close();
  });

  /**
   * Test Case 1:
   * Creating a new task.
   */
  it("should create a new task", async () => {
    // Define the data for a new task
    const taskData = new Task({
      title: "New Task",
      description: "This is a new test task.",
    });

    // Insert the task into the collection
    const result = await db.collection("tasks").insertOne(taskData);

    // Query the inserted task using its _id
    const insertedTask = await db
      .collection("tasks")
      .findOne({ _id: result.insertedId });

    // Expect the insertion to be successful
    expect(insertedTask.title).to.equal(taskData.title);
    expect(insertedTask.description).to.equal(taskData.description);
  });

  /**
   * Test Case 2:
   * Validating required fields.
   */
  it("should require title and description fields", async () => {
    // Create a task without title and description
    const taskData = {};

    // Create a new Task instance with the incomplete data
    const task = new Task(taskData);

    // Attempt to insert the task
    let error;
    try {
      await task.save();
    } catch (err) {
      error = err;
    }

    // Expect a validation error
    expect(error).to.exist;
    expect(error.message).to.include("title");
    expect(error.message).to.include("description");
  });

  /**
   * Test Case 3:
   * Default status should be 'TODO'.
   */
  it("should have default status 'TODO'", async () => {
    // Define the data to insert
    const taskData = new Task({
      title: "Test Task",
      description: "This is a test task.",
    });

    // Insert the document into the collection
    const result = await db.collection("tasks").insertOne(taskData);

    // Query the inserted document using its _id as a string
    const insertedTask = await db
      .collection("tasks")
      .findOne({ _id: result.insertedId });

    // Expect the insertion to be successful
    expect(insertedTask.status).to.equal("TODO");
  });

  /**
   * Test Case 4:
   * Set userId and isAnonymous fields.
   */
  it("should set userId and isAnonymous fields", async () => {
    // Define the data for a new task with userId and isAnonymous fields
    const taskData = new Task({
      title: "New Task",
      description: "This is a new test task.",
      userId: "user123",
      isAnonymous: true,
    });

    // Insert the task into the collection
    const result = await db.collection("tasks").insertOne(taskData);

    // Query the inserted task using its _id
    const insertedTask = await db
      .collection("tasks")
      .findOne({ _id: result.insertedId });

    // Expect the inserted fields to match the provided values
    expect(insertedTask.userId).to.equal(taskData.userId);
    expect(insertedTask.isAnonymous).to.equal(taskData.isAnonymous);
  });
});
