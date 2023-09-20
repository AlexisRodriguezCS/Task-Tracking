/*
 * cleanupTasks.js - Database Cleanup Tasks
 *
 * This module defines cleanup tasks to be executed periodically
 * to remove anonymous tasks older than a certain threshold.
 *
 * Dependencies:
 * - AnonymousTask model from models/anonymousTaskModel
 */

const AnonymousTask = require("../models/anonymousTaskModel");
const connectDatabase = require("../database/databaseConnection");

/**
 * cleanUpAnonymousTasks - Cleans up anonymous tasks older than the specified duration.
 */
async function cleanUpAnonymousTasks() {
  try {
    // Establish a connection to the database
    const db = await connectDatabase();

    // Calculate the date threshold for anonymous task cleanup (e.g., 7 days ago)
    const thresholdDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Delete anonymous tasks older than the threshold date
    const result = await AnonymousTask.deleteMany({
      createdAt: { $lt: thresholdDate },
    });

    console.log(
      `Cleanup completed. ${result.deletedCount} anonymous tasks deleted.`
    );

    // Close the database connection
    db.close();
  } catch (error) {
    console.error("Error during cleanup:", error.message);
  }
}

// Schedule the cleanup task to run periodically (e.g., once a day)
// setInterval(cleanUpAnonymousTasks, 24 * 60 * 60 * 1000); // Every 24 hours

// Export the cleanup function (optional, for manual cleanup trigger)
module.exports = cleanUpAnonymousTasks;
