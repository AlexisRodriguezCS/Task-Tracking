/**
 * Home Component
 *
 * Description:
 * The Home component serves as the main page of the application. It displays the TaskBoard
 * component, which organizes tasks into different columns based on their status.
 *
 * Dependencies:
 * - React: The core library for building user interfaces in React applications.
 * - TaskBoard: A custom component that displays and manages tasks.
 * - "../styles/Home.css": The stylesheet for styling the Home component.
 *
 * Usage:
 * 1. Import this component in your application where you want to display the main page.
 * 2. Place it within a relevant container or layout.
 * 3. This component renders the TaskBoard component, which in turn manages the task display.
 *
 * Comments:
 * - This component doesn't have any specific logic but serves as the entry point for the application.
 * - It renders the TaskBoard component, which handles the organization and display of tasks.
 */

import React, { useState, useEffect } from "react";
import TaskBoard from "../components/TaskBoard";
import LoadingModal from "../components/LoadingModal";
import "../styles/Home.css";

const Home = () => {
  const [loading, setLoading] = useState(false); // State to manage loading modal visibility

  // Function to start the backend and show the loading modal
  const startBackend = () => {
    setLoading(true); // Show the loading modal

    // Make a request to the backend to start it
    fetch("https://task-tracking-app.onrender.com/api/tasks/start-backend", {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false); // Hide the loading modal on success
          console.log("Backend started successfully.");
        } else {
          setLoading(false); // Hide the loading modal on error
          console.error(
            "Failed to start the backend. Status code: " + response.status
          );
        }
      })
      .catch((error) => {
        setLoading(false); // Hide the loading modal on error
        console.error("Error while starting the backend:", error);
      });
  };

  // Trigger startBackend when the component mounts
  useEffect(() => {
    startBackend();
  }, []); // The empty dependency array ensures it runs only once on mount

  return (
    <div className="home-container">
      <TaskBoard />
      {loading && <LoadingModal />}
    </div>
  );
};

export default Home;
