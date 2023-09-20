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

import React from "react";
import TaskBoard from "../components/TaskBoard";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <TaskBoard />
    </div>
  );
};

export default Home;
