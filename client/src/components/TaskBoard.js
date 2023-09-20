/*
 * TaskBoard.js - Task Board Component
 *
 * This module contains the TaskBoard component for managing tasks on a board.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - TaskColumn: Component for displaying task columns
 * - TaskEdit: Component for editing tasks
 * - TaskAdd: Component for adding tasks
 * - Login: Login component
 * - SignUp: Sign-up component
 * - ForgotPassword: Forgot password component
 * - TaskContext: Context for handling tasks
 * - AuthContext: Context for handling users
 * - TaskBoard.css: Stylesheet for the TaskBoard component
 */

import React, { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import Modal from "./Modal";
import TaskEdit from "./TaskEdit";
import TaskAdd from "./TaskAdd";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { useAuth } from "../contexts/AuthContext";
import { useTask } from "../contexts/TaskContext";
import "../styles/TaskBoard.css";

/**
 * TaskBoard - Component for managing tasks on a board.
 */
const TaskBoard = () => {
  // Types of Tasks
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [needsReviewTasks, setNeedsReviewTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  // Track if TaskEdit, TaskAdd should be shown
  const [showTaskEdit, setShowTaskEdit] = useState(false);
  const [showTaskAdd, setShowTaskAdd] = useState(false);
  // Editing Task State
  const [status, setStatus] = useState("");
  // From TaskContext
  const { tasks } = useTask();
  // From AuthContext
  const {
    showLoginModal,
    setShowLoginModal,
    showSignUpModal,
    setShowSignUpModal,
    showForgotPasswordModal,
    setShowForgotPasswordModal,
  } = useAuth();

  useEffect(() => {
    // Group tasks by their status using reduce
    const groupedTasks = Object.values(tasks).reduce((groups, task) => {
      const status = task.status;

      // Initialize the group if it doesn't exist
      if (!groups[status]) {
        groups[status] = [];
      }

      // Add the task to the corresponding group
      groups[status].push(task);

      return groups;
    }, {});

    // Update state with grouped tasks
    setToDoTasks(groupedTasks["To-Do"] || []);
    setInProgressTasks(groupedTasks["In-Progress"] || []);
    setNeedsReviewTasks(groupedTasks["Needs-Review"] || []);
    setCompletedTasks(groupedTasks["Completed"] || []);
  }, [tasks]);

  /**
   * handleOpenEditTask - Function to open the TaskEdit component.
   */
  const handleOpenEditTask = () => {
    setShowTaskEdit(true);
  };

  /**
   * handleOpenAddTask - Function to open the TaskAdd component.
   * @param {string} value - The status of the task to be added.
   */
  const handleOpenAddTask = (value) => {
    setStatus(value);
    setShowTaskAdd(true);
  };

  return (
    <div className="task-board">
      <TaskColumn
        title="To-Do"
        status="To-Do"
        tasks={toDoTasks}
        handleOpenEditTask={handleOpenEditTask}
        handleOpenAddTask={handleOpenAddTask}
      />
      <TaskColumn
        title="In Progress"
        status="In-Progress"
        tasks={inProgressTasks}
        handleOpenEditTask={handleOpenEditTask}
        handleOpenAddTask={handleOpenAddTask}
      />
      <TaskColumn
        title="Needs Review"
        status="Needs-Review"
        tasks={needsReviewTasks}
        handleOpenEditTask={handleOpenEditTask}
        handleOpenAddTask={handleOpenAddTask}
      />
      <TaskColumn
        title="Completed"
        status="Completed"
        tasks={completedTasks}
        handleOpenEditTask={handleOpenEditTask}
        handleOpenAddTask={handleOpenAddTask}
      />
      {/* TaskEdit modal */}
      {showTaskEdit && (
        <Modal onClose={() => setShowTaskEdit(false)}>
          <TaskEdit onClose={() => setShowTaskEdit(false)} />
        </Modal>
      )}

      {/* TaskAdd modal */}
      {showTaskAdd && (
        <Modal onClose={() => setShowTaskAdd(false)}>
          <TaskAdd onClose={() => setShowTaskAdd(false)} status={status} />
        </Modal>
      )}

      {/* Login modal */}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <Login onClose={() => setShowLoginModal(false)} />
        </Modal>
      )}

      {/* SignUp modal */}
      {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <SignUp onClose={() => setShowSignUpModal(false)} />
        </Modal>
      )}

      {/* ForgotPassword modal */}
      {showForgotPasswordModal && (
        <Modal onClose={() => setShowForgotPasswordModal(false)}>
          <ForgotPassword onClose={() => setShowForgotPasswordModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default TaskBoard;
