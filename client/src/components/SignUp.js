/*
 * SignUp.js - Sign Up Component
 *
 * This module contains the SignUp component for user registration.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - Modal.css: Stylesheet for the Modal component
 * - RegistrationSuccess: Component for displaying a success message after registration
 */

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import RegistrationSuccess from "./RegistrationSuccess"; // Import the RegistrationSuccess component
import { useAuth } from "../contexts/AuthContext";
import "../styles/Modal.css";

/**
 * SignUp - Component for user registration.
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the sign-up modal.
 */
const SignUp = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Add a state for registration success

  const { signup, openLoginModal } = useAuth();

  /**
   * handleSignUp - Function to handle the sign-up process.
   * @param {Object} e - Form submission event.
   */
  const handleSignUp = async (e) => {
    e.preventDefault();

    const signupResult = await signup({ email, password });
    if (signupResult === true) {
      // Registration successful, set the registrationSuccess state to true
      setRegistrationSuccess(true);
      // Clear any previous error message
      setErrorMessage("");
    } else {
      // Signup failed, handle the error
      setErrorMessage(signupResult.error);
    }
  };

  return (
    <>
      {registrationSuccess ? (
        <RegistrationSuccess onClose={onClose} />
      ) : (
        <>
          <button className="close-button" onClick={onClose}>
            <span>&times;</span>
          </button>
          <form onSubmit={handleSignUp}>
            <h1 className="modal-title">Sign up</h1>
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
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained">
              Sign Up
            </Button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <span>
              Already have an account?{" "}
              <button onClick={openLoginModal} className="links">
                Log in
              </button>
            </span>
          </form>
        </>
      )}
    </>
  );
};

export default SignUp;
