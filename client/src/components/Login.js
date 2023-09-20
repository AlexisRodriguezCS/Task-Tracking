/*
 * Login.js - Login Component
 *
 * This module contains the Login component for user authentication.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - useState: Hook for managing component-level state in functional components
 * - TextField and Button components from the @mui/material library
 * - useAuth function from ../contexts/AuthContext
 * - Modal.css: Stylesheet for the Modal component
 */

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Modal.css";

/**
 * Login - Component for user login.
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the Login component.
 */
const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, setLoggedIn, openSignUpModal, openForgotPasswordModal } =
    useAuth();

  /**
   * handleLogin - Function to handle user login.
   * @param {Object} e - Event object.
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginResult = await login({ email, password });

    if (loginResult === true) {
      // Login was successful
      // Set loggedIn to true
      setLoggedIn(true);
      // Clear any previous error message
      setErrorMessage("");

      onClose(); // Close the Login component
    } else {
      // Login failed, handle the error
      setErrorMessage(loginResult.error);
    }
  };

  return (
    <>
      <button className="close-button" onClick={onClose}>
        <span>&times;</span>
      </button>
      <form onSubmit={handleLogin}>
        <h1 className="modal-title">Log in</h1>
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
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div onClick={openForgotPasswordModal} className="links">
          Forgot your password?
        </div>
        <Button type="submit" fullWidth variant="contained">
          Log In
        </Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <span>
          Don't have an account?{" "}
          <button onClick={openSignUpModal} className="links">
            Sign up
          </button>
        </span>
      </form>
    </>
  );
};

export default Login;
