/*
 * TaskCard.js - Task Card Component
 *
 * This module defines the TaskCard component responsible for displaying individual task cards.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces.
 * - Button: Material-UI component for buttons.
 * - useTask: Custom hook from the TaskContext for managing tasks.
 * - TaskContext: Custom context for handling tasks.
 * - styles/TaskCard.css: CSS styles for the TaskCard component.
 */

import React, { useState } from "react";
import { Button } from "@mui/material";
import { useTask } from "../contexts/TaskContext";
import "../styles/TaskCard.css";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

// Define the long press delay duration (in milliseconds)
const LONG_PRESS_DELAY = 500; // 500 milliseconds (adjust as needed)

/**
 * TaskCard - Component for displaying a task card.
 * @param {Object} props - Component props.
 * @param {Object} props.task - The task to display.
 * @param {Function} props.handleOpenEditTask - Function to open the edit task modal.
 */
const TaskCard = ({ task, handleOpenEditTask }) => {
  const [isHovered, setIsHovered] = useState(false);
  let longPressTimer = null;

  // From TaskContext
  const { deleteTask, setEditedTask } = useTask();

  /**
   * handleEditTask - Function to set the edited task and open the edit task modal.
   */
  const handleEditTask = () => {
    setEditedTask(task);
    handleOpenEditTask();
  };

  /**
   * handleMouseEnter - Function to handle mouse enter event.
   */
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  /**
   * handleMouseLeave - Function to handle mouse leave event.
   */
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  /**
   * handleTouchStart - Function to handle touch start event.
   */
  const handleTouchStart = () => {
    longPressTimer = setTimeout(() => {
      setIsHovered(true);
    }, LONG_PRESS_DELAY);
  };

  /**
   * handleTouchEnd - Function to handle touch end event.
   */
  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
    if (!isHovered) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className={`task ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {isHovered && (
        <div className="task-buttons">
          <Button
            type="submit"
            variant="contained"
            sx={{
              "line-height": "normal",
            }}
            onClick={() => handleEditTask()}
          >
            Edit
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              "line-height": "normal",
            }}
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </Button>
        </div>
      )}
      <h4 className="task-title">{task.title}</h4>
      <div className={`task-priority ${task.priority}`}>
        <p>{task.priority}</p>
      </div>
      <p className="task-date">
        {new Date(task.dueDate).toLocaleDateString("en-US", options)}
      </p>
    </div>
  );
};

export default TaskCard;
