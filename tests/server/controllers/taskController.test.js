/**
 * taskController.test.js - Task Controller Tests
 *
 * This module contains tests for the controller functions in taskController.js.
 * It covers the getAllTasks, getTaskById, createTask, updateTask, and deleteTask functions.
 *
 * Dependencies:
 * - chai: Assertion library for testing
 * - sinon: Library for creating spies, stubs, and mocks in tests
 * - chai-http: Chai plugin for making HTTP requests and assertions
 * - app: Express app instance from the main app.js file
 * - Task model from models/tasksModel
 * - taskController: Controller functions for handling task-related routes
 */

const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const { app } = require("../../../server/src/app");
const Task = require("../../../server/src/models/tasksModel");
const taskController = require("../../../server/src/controllers/taskController");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Task Controller", () => {
  let res;
  let req;

  beforeEach(() => {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
      end: sinon.spy(),
    };

    req = {
      params: {},
      body: {},
    };
  });

  // Run after all test cases
  after(async () => {
    // Forcefully exit the process
    process.exit(0);
  });

  /**
   * Test Case 1:
   * Getting all tasks.
   */
  describe("getAllTasks", () => {
    it("should return all tasks", async () => {
      // Stub the Task.find function to resolve with mock data
      const findStub = sinon.stub(Task, "find");
      findStub.resolves([
        { title: "Task 1", description: "Test description 1" },
        { title: "Task 2", description: "Test description 2" },
      ]);

      // Call the getAllTasks controller function
      await taskController.getAllTasks(req, res);

      // Assertions
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(
        res.json.calledWith([
          { title: "Task 1", description: "Test description 1" },
          { title: "Task 2", description: "Test description 2" },
        ])
      ).to.be.true;

      // Restore the stub
      findStub.restore();
    });
  });

  /**
   * Test Case 2:
   * Getting a task by ID.
   */
  describe("getTaskById", () => {
    it("should return a task by ID", async () => {
      // Set the task ID in the request parameters
      req.params.taskId = "123";
      // Mock task data
      const taskMock = { title: "Mock Task" };
      // Stub the Task.findById function to resolve with mock data
      const findByIdStub = sinon.stub(Task, "findById");
      findByIdStub.withArgs("123").resolves(taskMock);

      // Call the getTaskById controller function
      await taskController.getTaskById(req, res);

      // Assertions
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith(taskMock)).to.be.true;

      // Restore the stub
      findByIdStub.restore();
    });

    it("should return an error if task not found", async () => {
      // Set the task ID in the request parameters
      req.params.taskId = "456";
      // Stub the Task.findById function to resolve with null (task not found)
      const findByIdStub = sinon.stub(Task, "findById");
      findByIdStub.withArgs("456").resolves(null);

      // Call the getTaskById controller function
      await taskController.getTaskById(req, res);

      // Assertions
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Task not found" })).to.be.true;

      // Restore the stub
      findByIdStub.restore();
    });
  });

  /**
   * Test Case 3:
   * Creating a new task.
   */
  describe("createTask", () => {
    it("should create a new task", async () => {
      // Set the task data in the request body
      req.body = { title: "New Task", description: "Test description" };
      req.headers = {};
      const res = {
        status: sinon.stub(),
        json: sinon.stub(),
        setHeader: sinon.stub(), // Create a spy for setHeader
      };
      res.status.returns(res);
      res.json.returns(res);

      // Stub the Task.prototype.save function to resolve with mock data
      const saveStub = sinon.stub(Task.prototype, "save");
      saveStub.resolves({ title: "New Task", description: "Test description" });

      // Call the createTask controller function
      await taskController.createTask(req, res);

      // Assertions
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(
        res.json.calledWith({
          title: "New Task",
          description: "Test description",
        })
      ).to.be.true;

      // Restore the stub
      saveStub.restore();
    });

    it("should return an error if task creation fails", async () => {
      // Set the task data in the request body
      req.body = { title: "New Task", description: "Test description" };
      req.headers = {};
      const res = {
        status: sinon.stub(),
        json: sinon.stub(),
        setHeader: sinon.stub(), // Create a spy for setHeader
      };
      res.status.returns(res);
      res.json.returns(res);

      // Stub the Task.prototype.save function to reject with an error
      const saveStub = sinon.stub(Task.prototype, "save");
      saveStub.rejects(new Error("Error creating task"));

      // Call the createTask controller function
      await taskController.createTask(req, res);

      // Assertions
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Error creating task" })).to.be.true;

      // Restore the stub
      saveStub.restore();
    });
  });

  /**
   * Test Case 4:
   * Updating a task by ID.
   */
  describe("updateTask", () => {
    it("should update a task by ID", async () => {
      // Set the task ID in the request parameters
      req.params.taskId = "123";
      // Set the updated task data in the request body
      req.body = { title: "Updated Task" };
      // Stub the Task.findByIdAndUpdate function to resolve with mock data
      const findByIdAndUpdateStub = sinon.stub(Task, "findByIdAndUpdate");
      findByIdAndUpdateStub
        .withArgs("123", req.body, { new: true })
        .resolves({ _id: "123", title: "Updated Task" });

      // Call the updateTask controller function
      await taskController.updateTask(req, res);

      // Assertions
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ _id: "123", title: "Updated Task" })).to.be
        .true;

      // Restore the stub
      findByIdAndUpdateStub.restore();
    });

    it("should return an error if task not found", async () => {
      // Set the task ID in the request parameters
      req.params.taskId = "456";
      // Set the updated task data in the request body
      req.body = { title: "Updated Task" };
      // Stub the Task.findByIdAndUpdate function to resolve with null (task not found)
      const findByIdAndUpdateStub = sinon.stub(Task, "findByIdAndUpdate");
      findByIdAndUpdateStub.withArgs("456").resolves(null);

      // Call the updateTask controller function
      await taskController.updateTask(req, res);

      // Assertions
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Task not found" })).to.be.true;

      // Restore the stub
      findByIdAndUpdateStub.restore();
    });

    it("should return an error if task update fails", async () => {
      // Set the task ID in the request parameters
      req.params.taskId = "123";
      // Set the updated task data in the request body
      req.body = { title: "Updated Task" };
      // Stub the Task.findByIdAndUpdate function to reject with an error
      const findByIdAndUpdateStub = sinon.stub(Task, "findByIdAndUpdate");
      findByIdAndUpdateStub.rejects(new Error("Error updating task"));

      // Call the updateTask controller function
      await taskController.updateTask(req, res);

      // Assertions
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Error updating task" })).to.be.true;

      // Restore the stub
      findByIdAndUpdateStub.restore();
    });
  });

  /**
   * Test Case 5:
   * Deleting a task by ID.
   */
  describe("deleteTask", () => {
    it("should delete a task by ID", async () => {
      // Set the task ID in the request parameters
      req.params.taskId = "123";
      // Stub the Task.findByIdAndDelete function to resolve with mock data
      const findByIdAndDeleteStub = sinon.stub(Task, "findByIdAndDelete");
      findByIdAndDeleteStub.resolves({ _id: "123" });

      // Call the deleteTask controller function
      await taskController.deleteTask(req, res);

      // Assertions
      expect(res.status.calledWith(204)).to.be.true;
      expect(res.end.calledOnce).to.be.true;

      // Restore the stub
      findByIdAndDeleteStub.restore();
    });

    it("should return an error if task not found", async () => {
      // Set the task ID in the request parameters
      req.params.taskId = "456";
      // Stub the Task.findByIdAndDelete function to resolve with null (task not found)
      const findByIdAndDeleteStub = sinon.stub(Task, "findByIdAndDelete");
      findByIdAndDeleteStub.resolves(null);

      // Call the deleteTask controller function
      await taskController.deleteTask(req, res);

      // Assertions
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Task not found" })).to.be.true;

      // Restore the stub
      findByIdAndDeleteStub.restore();
    });

    it("should return an error if task deletion fails", async () => {
      // Set the task ID in the request parameters
      req.params.taskId = "123";
      // Stub the Task.findByIdAndDelete function to reject with an error
      const findByIdAndDeleteStub = sinon.stub(Task, "findByIdAndDelete");
      findByIdAndDeleteStub.rejects(new Error("Error deleting task"));

      // Call the deleteTask controller function
      await taskController.deleteTask(req, res);

      // Assertions
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Error deleting task" })).to.be.true;

      // Restore the stub
      findByIdAndDeleteStub.restore();
    });
  });
});
