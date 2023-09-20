/*
 * server.js - Server Entry Point
 *
 * This file starts the Express server and listens on a specified port.
 * It imports the Express app from app.js and defines the port to listen on.
 * The server provides the backend functionality for the task management app.
 *
 * Dependencies:
 * - app: The Express app from app.js
 */

const app = require("./app"); // Import the Express app from app.js
const port = 3001; // Define the port for the server to listen on

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
