/*
 * RegistrationSuccess.js - Registration Success Component
 *
 * This module contains the RegistrationSuccess component for displaying a success message
 * when a user's registration is successful.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - Modal.css: Stylesheet for the Modal component
 */

import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Modal.css";

/**
 * RegistrationSuccess - Component to display a success message for registration.
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the success message.
 */
const RegistrationSuccess = ({ onClose }) => {
  const { openLoginModal } = useAuth();

  /**
   * handleLoginClick - Function to handle the click event for logging in.
   */
  const handleLoginClick = () => {
    onClose(); // Close the success message
    openLoginModal(); // Open the Login component
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <span>&times;</span>
        </button>
        <h1 className="modal-title">Registration Successful</h1>
        <p>Your account has been successfully registered.</p>{" "}
        <p>
          You can now{" "}
          <button onClick={handleLoginClick} className="links">
            Log in
          </button>
          .
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
