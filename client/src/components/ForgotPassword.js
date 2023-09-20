/*
 * ForgotPassword.js - Forgot Password Component
 *
 * This module contains the ForgotPassword component for resetting a user's password.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - useState: Hook for managing component-level state in functional components
 * - TextField, Button: Components from the MUI (Material-UI) library
 * - Modal.css: Stylesheet for the Modal component
 */

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../styles/Modal.css";

/**
 * ForgotPassword - Component for resetting a user's password.
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the modal.
 */
const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  /**
   * handleResetPassword - Function to handle resetting the password.
   */
  const handleResetPassword = () => {
    // In a real app, you would have logic to send a reset password request
    // to your server and handle the response.
    // For this example, we'll just simulate a successful reset.
    console.log(email);
    setResetSuccess(true);
  };

  return (
    <>
      <button className="close-button" onClick={onClose}>
        <span>&times;</span>
      </button>
      {!resetSuccess ? (
        <form onSubmit={handleResetPassword}>
          <h1 className="modal-title">Forgot Password</h1>
          <label htmlFor="email">
            Enter your email to reset your password:
          </label>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained">
            Reset Password
          </Button>
        </form>
      ) : (
        <p>Password reset link has been sent to your email.</p>
      )}
    </>
  );
};

export default ForgotPassword;
