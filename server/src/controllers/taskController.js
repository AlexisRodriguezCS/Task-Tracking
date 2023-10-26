/*
 * taskController.js - Task Controller
 *
 * This module contains the controller functions for handling task-related routes.
 *
 * Dependencies:
 * - Task model from models/tasksModel
 */

const generateUUID = require("../utils/uuid");
const Task = require("../models/tasksModel");
const cookie = require("cookie");

/**
 * createTaskForAuthenticatedUser - Create a task for an authenticated user.
 *
 * @param {string} userId - The ID of the authenticated user.
 * @param {string} title - The title of the task.
 * @param {string} status - The status of the task.
 * @param {string} priority - The priority of the task.
 * @param {Date} dueDate - The due date of the task.
 * @returns {Promise} A promise that resolves with the created task.
 */
async function createTaskForAuthenticatedUser(
  userId,
  title,
  status,
  priority,
  dueDate
) {
  const newTask = new Task({
    title,
    status,
    priority,
    dueDate,
    userId,
  });

  return newTask.save();
}

/**
 * createTaskForAnonymousUser - Create a task for an anonymous user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} title - The title of the task.
 * @param {string} status - The status of the task.
 * @param {string} priority - The priority of the task.
 * @param {Date} dueDate - The due date of the task.
 * @returns {Promise} A promise that resolves with the created task.
 */
async function createTaskForAnonymousUser(
  req,
  res,
  title,
  status,
  priority,
  dueDate
) {
  // Retrieve the anonymous identifier from the cookie
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const anonymousIdentifier = cookies.anonymousIdentifier;

  // Generate a unique identifier (UUID)
  const uniqueIdentifier = generateUUID();

  if (anonymousIdentifier) {
    // Anonymous user, use the existing identifier
    const newTask = new Task({
      title,
      status,
      priority,
      dueDate,
      isAnonymous: true,
      anonymousIdentifier,
    });

    return await newTask.save();
  } else {
    // New anonymous user, generate and store an identifier
    const newTask = new Task({
      title,
      status,
      priority,
      dueDate,
      isAnonymous: true,
      anonymousIdentifier: uniqueIdentifier,
    });
    // Calculate the expiration date (one month from the current time)
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1);

    // Store the unique identifier in a cookie
    setAnonymousIdentifierCookie(res, uniqueIdentifier, expirationDate);

    return newTask.save();
  }
}

/**
 * setAnonymousIdentifierCookie - Set the anonymous identifier cookie.
 *
 * @param {Object} res - Express response object.
 * @param {string} uniqueIdentifier - The unique identifier value.
 * @param {Date} expirationDate - The expiration date for the cookie.
 */
function setAnonymousIdentifierCookie(res, uniqueIdentifier, expirationDate) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("anonymousIdentifier", uniqueIdentifier, {
      expires: expirationDate,
    })
  );
}

/**
 * createTask - Create a task for either an authenticated or anonymous user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function createTask(req, res) {
  const { title, status, priority, dueDate } = req.body;
  if (req.user) {
    // User is authenticated, create task for authenticated user
    try {
      const newTask = await createTaskForAuthenticatedUser(
        req.user.userId,
        title,
        status,
        priority,
        dueDate
      );
      res.status(201).json(newTask);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error creating task for authenticated user" });
    }
  } else {
    // User is anonymous, create task for anonymous user
    try {
      const newTask = await createTaskForAnonymousUser(
        req,
        res,
        title,
        status,
        priority,
        dueDate
      );
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Error creating task for anonymous user" });
    }
  }
}

/**
 * getAllTasks - Controller function to get all tasks.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function getAllTasks(req, res) {
  try {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const anonymousIdentifier = cookies.anonymousIdentifier;

    if (req.user) {
      const tasks = await Task.find({ userId: req.user.userId });
      res.status(200).json(tasks);
    } else if (anonymousIdentifier) {
      const tasks = await Task.find({ anonymousIdentifier });
      res.status(200).json(tasks);
    } else {
      res.status(400).json({ error: "User identification missing" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
}

/**
 * getTaskById - Controller function to get a task by ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function getTaskById(req, res) {
  const taskId = req.params.taskId;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error fetching task" });
  }
}

/**
 * updateTask - Controller function to update a task by ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function updateTask(req, res) {
  const taskId = req.params.taskId;
  const updatedData = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
}

/**
 * deleteTask - Controller function to delete a task by ID.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function deleteTask(req, res) {
  const taskId = req.params.taskId;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
}

/**
 * startBackend - Controller function to start the backend.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function startBackend(req, res) {
  try {
    // Send a success message in JSON format to indicate that the backend has been started
    res.status(200).json({ message: "Backend started successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error starting the backend" });
  }
}

// Export the controller functions
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  startBackend,
};
