/*
 * TaskAdd.js - Task Add Component
 *
 * This module contains the TaskAdd component for adding a new task.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - dayjs: Library for parsing and formatting dates
 * - TaskContext: Context for handling tasks
 * - TaskEdit.css: Stylesheet for the Task Edit component
 */

import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTask } from "../contexts/TaskContext";
import "../styles/TaskModal.css"; // Import the CSS file

/**
 * TaskAdd - Component for adding a new task.
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the task add modal.
 * @param {string} props.status - The status of the new task.
 */
const TaskAdd = ({ onClose, status }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("Walk the dog");
  const [newTaskStatus, setNewTaskStatus] = useState(status);
  const [newTaskPrio, setNewTaskPrio] = useState("Low");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const { addTask } = useTask();

  /**
   * handleAddSave - Function to handle saving a new task.
   */
  const handleAddSave = async () => {
    const newTask = {
      title: newTaskTitle,
      status: newTaskStatus,
      priority: newTaskPrio,
      dueDate: selectedDate,
    };
    // Close the modal
    const response = await addTask(newTask);
    if (response === true) {
      onClose();
    }
  };

  return (
    <>
      <button className="close-button task-edit-close-button" onClick={onClose}>
        <span>&times;</span>
      </button>
      <h2>Add Task</h2>
      <>
        <TextField
          required
          className="Boxes"
          label="Name"
          defaultValue={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <FormControl required className="Boxes">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={newTaskStatus}
            onChange={(e) => setNewTaskStatus(e.target.value)}
          >
            <MenuItem disabled value="">
              <em>Status</em>
            </MenuItem>
            <MenuItem value="To-Do">To-Do</MenuItem>
            <MenuItem value="In-Progress">In Progress</MenuItem>
            <MenuItem value="Needs-Review">Needs Review</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl required className="Boxes">
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            value={newTaskPrio}
            onChange={(e) => setNewTaskPrio(e.target.value)}
          >
            <MenuItem disabled value="">
              <em>Priority</em>
            </MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="HIGH">HIGH</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            className="Boxes"
            label="Due date *"
            defaultValue={selectedDate}
            onChange={(e) => setSelectedDate(dayjs(e).format("MM/DD/YYYY"))}
          />
        </LocalizationProvider>
        <Button onClick={handleAddSave} variant="contained" className="save">
          Save
        </Button>
      </>
    </>
  );
};

export default TaskAdd;
