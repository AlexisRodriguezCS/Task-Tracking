/*
 * task.js - Task Model
 *
 * This module defines the Mongoose schema for the Task model.
 *
 * Dependencies:
 * - mongoose: Mongoose library for MongoDB integration
 */

const mongoose = require("mongoose");
const dayjs = require("dayjs");

// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["To-Do", "In-Progress", "Needs-Review", "Completed"],
    default: "To-Do",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "HIGH"],
    default: "Medium",
  },
  dueDate: {
    type: Date,
    default: dayjs().add(1, "day").toDate(), // Set the default value to tomorrow
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  anonymousIdentifier: {
    type: String,
  },
});

// Create the Task model using the schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
