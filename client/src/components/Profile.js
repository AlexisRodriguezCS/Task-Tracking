/*
 * Profile.js - Profile Component
 *
 * This module contains the Profile component for user profile management.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - useState: Hook for managing component-level state in functional components
 * - useAuth function from ../contexts/AuthContext
 * - Profile.css: Stylesheet for the Profile component
 */

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Profile.css";

/**
 * Profile - Component for user profile management.
 */
const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();

  /**
   * toggleDropdown - Function to toggle the dropdown.
   */
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  /**
   * handleLogout - Function to handle user logout.
   */
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="profile-container">
      <div className="svg-container">
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleDropdown}
        >
          <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z" />
          <path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z" />
        </svg>
      </div>
      {showDropdown && (
        <div className="dropdown">
          <button>Settings</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
