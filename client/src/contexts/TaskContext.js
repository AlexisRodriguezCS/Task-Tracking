/*
 * TaskContext.js - Task Context
 *
 * This module contains the context and controller functions for handling tasks.
 *
 * Dependencies:
 * - useAuth function from ../contexts/AuthContext
 * - axios: Library for making HTTP requests
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const TaskContext = createContext();

export const useTask = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const [editedTask, setEditedTask] = useState(null);

  const { loggedIn } = useAuth();
  const backendURL = "https://task-tracking-app.onrender.com";
  // const backendURL = "http://localhost:3001";

  /**
   * fetchTasks - Controller function to fetch tasks.
   */
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${backendURL}/api/tasks`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // Convert the fetched tasks into a hashmap for efficient access
        const tasksData = response.data;
        const tasksMap = {};
        tasksData.forEach((task) => {
          tasksMap[task._id] = task;
        });
        setTasks(tasksMap);
      }
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  // Define a separate effect for handling login and logout
  useEffect(() => {
    if (loggedIn) {
      // If logged in, fetch tasks
      fetchTasks();
    } else {
      // If logged out, reset tasks to an empty object
      setTasks({});
    }
  }, [loggedIn]);

  /**
   * addTask - Controller function to add a new task.
   * @param {Object} newTask - The new task to be added.
   */
  const addTask = async (newTask) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${backendURL}/api/tasks`, newTask, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // Add the new task to the tasks hashmap
        setTasks((prevTasks) => ({
          ...prevTasks,
          [response.data._id]: response.data,
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error creating task: ", error);
      return { success: false, error: error.response.data.error };
    }
  };

  /**
   * editTask - Controller function to edit a task.
   * @param {Object} editedTask - The edited task.
   */
  const editTask = async (editedTask) => {
    try {
      const response = await axios.put(
        `${backendURL}/api/tasks/${editedTask._id}`,
        editedTask,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Update the tasks hashmap with the edited task
        setTasks((prevTasks) => ({
          ...prevTasks,
          [editedTask._id]: editedTask,
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating task: ", error);
      return { success: false, error: error.response.data.error };
    }
  };

  /**
   * deleteTask - Controller function to delete a task.
   * @param {string} taskId - The ID of the task to be deleted.
   */
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`${backendURL}/api/tasks/${taskId}`, {
        withCredentials: true,
      });

      if (response.status === 204) {
        // Remove the deleted task from the tasks hashmap
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          delete updatedTasks[taskId];
          return updatedTasks;
        });
      }
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const value = {
    tasks,
    fetchTasks,
    addTask,
    editTask,
    deleteTask,
    editedTask,
    setEditedTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskContext;
