/*
 * taskRoutes.js - Task API Routes
 *
 * This module defines the API routes for managing tasks.
 * It includes endpoints for getting all tasks, getting a task by ID,
 * creating a new task, updating a task, and deleting a task.
 *
 * Dependencies:
 * - express: Express.js framework for building web applications
 * - taskController: Controller functions for handling task-related routes
 */

const express = require("express"); // Import the Express module
const router = express.Router(); // Create an instance of Express router
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

// Starts backend(free hosting)
router.get("/start-backend", taskController.startBackend);

// GET all tasks
router.get("/", authMiddleware, taskController.getAllTasks);

// GET task by ID
router.get("/:taskId", taskController.getTaskById);

// POST create task
router.post("/", authMiddleware, taskController.createTask);

// PUT update task
router.put("/:taskId", taskController.updateTask);

// DELETE task
router.delete("/:taskId", taskController.deleteTask);

// Export the router for use in other files
module.exports = router;
