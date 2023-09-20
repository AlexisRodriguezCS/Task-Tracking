/*
 * TaskColumn.js - Task Column Component
 *
 * This module defines the TaskColumn component responsible for displaying a column of tasks.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces.
 * - TaskCard: Component for displaying individual task cards.
 * - styles/TaskColumn.css: CSS styles for the TaskColumn component.
 */

import React from "react";
import TaskCard from "./TaskCard";
import "../styles/TaskColumn.css";

/**
 * TaskColumn - Component for displaying a column of tasks.
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the column.
 * @param {string} props.status - The status of the tasks in the column.
 * @param {Object} props.tasks - The tasks to display in the column.
 * @param {Function} props.handleOpenEditTask - Function to open the edit task modal.
 * @param {Function} props.handleOpenAddTask - Function to open the add task modal.
 */
const TaskColumn = ({
  title,
  status,
  tasks,
  handleOpenEditTask,
  handleOpenAddTask,
}) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-top-left">
          <p className={status}>{title}</p>
          <p className="tasks-length">{tasks.length}</p>
        </div>
        {/* <div className="column-top-right">
          <button>&#8943;</button>
          <button onClick={() => handleOpenAddTask(status)}>&#43;</button>
        </div> */}
      </div>
      {Object.keys(tasks).map((taskId) => (
        <TaskCard
          key={taskId}
          task={tasks[taskId]}
          handleOpenEditTask={() => handleOpenEditTask()}
        />
      ))}
      <button onClick={() => handleOpenAddTask(status)} className="new-task">
        &#43; New
      </button>
    </div>
  );
};

export default TaskColumn;
