/*
 * TaskEdit.js - Task Edit Component
 *
 * This module defines the TaskEdit component responsible for editing a task.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces.
 * - dayjs: A minimalist JavaScript library for parsing, validating, manipulating, and displaying dates and times.
 * - MUI components: Material-UI components for building the user interface.
 * - useTask: Custom hook from the TaskContext for managing tasks.
 * - @mui/x-date-pickers: Material-UI date pickers and localization provider.
 * - styles/TaskEdit.css: CSS styles for the TaskEdit component.
 */

import React from "react";
import dayjs from "dayjs";
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useTask } from "../contexts/TaskContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../styles/TaskModal.css"; // Import the CSS file

/**
 * TaskEdit - Component for editing a task.
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the modal.
 */
const TaskEdit = ({ onClose }) => {
  // From TaskContext
  const { editedTask, setEditedTask, editTask } = useTask();

  /**
   * handleEditSave - Handles the saving of edited task.
   */
  const handleEditSave = async () => {
    const response = await editTask(editedTask);

    if (response === true) {
      // Close the modal
      onClose();
    }
  };

  return (
    <>
      <button className="close-button task-edit-close-button" onClick={onClose}>
        <span>&times;</span>
      </button>
      <h2>Edit Task</h2>
      <>
        <TextField
          required
          className="Boxes"
          label="Task Name"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
        />
        <FormControl required className="Boxes">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={editedTask.status}
            onChange={(e) =>
              setEditedTask({ ...editedTask, status: e.target.value })
            }
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
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({ ...editedTask, priority: e.target.value })
            }
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
            className="Boxes"
            label="Due date *"
            value={dayjs(editedTask.dueDate)}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                dueDate: dayjs(e).format("MM/DD/YYYY"),
              })
            }
          />
        </LocalizationProvider>
        <Button onClick={handleEditSave} variant="contained" className="save">
          Save
        </Button>
      </>
    </>
  );
};

export default TaskEdit;
