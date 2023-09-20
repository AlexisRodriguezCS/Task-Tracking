/*
 * AuthContext.js - Authentication Context
 *
 * This module contains the context and controller functions for handling authentication.
 *
 * Dependencies:
 * - axios: Library for making HTTP requests
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const backendURL = "https://task-tracking-app.onrender.com";
  // const backendURL = "http://localhost:3001";

  /**
   * login - Controller function to log in a user.
   * @param {Object} credentials - The user's login credentials.
   * @param {string} credentials.email - The user's email address.
   * @param {string} credentials.password - The user's password.
   * @returns {boolean|Object} - True for successful login, or an object with success and error properties on failure.
   */
  const login = async (credentials) => {
    try {
      // Make a POST request to your API endpoint for user login
      const response = await axios.post(`${backendURL}/api/users/login`, {
        email: credentials.email,
        password: credentials.password,
        withCredentials: true,
      });

      if (response.status === 200) {
        // Store the token in localStorage
        const token = response.data.token;
        localStorage.setItem("authToken", token);

        // Update the loggedIn state to true
        setLoggedIn(true);

        return true; // Return true to indicate a successful login
      }

      return false;
    } catch (error) {
      // Return false for a failed login with error
      return { success: false, error: error.response.data.error };
    }
  };

  /**
   * signup - Controller function to sign up a new user.
   * @param {Object} credentials - The user's signup credentials.
   * @param {string} credentials.email - The user's email address.
   * @param {string} credentials.password - The user's password.
   * @returns {boolean|Object} - True for successful signup, or an object with success and error properties on failure.
   */
  const signup = async (credentials) => {
    try {
      // Make a POST request to your API endpoint for user signup
      const response = await axios.post(`${backendURL}/api/users/register`, {
        email: credentials.email,
        password: credentials.password,
        withCredentials: true,
      });

      if (response.status === 201) {
        return true; // Return true to indicate a successful signup
      }

      return false;
    } catch (error) {
      // Return false for a failed signup with error
      return { success: false, error: error.response.data.error };
    }
  };

  /**
   * checkAuthStatus - Controller function to check the authentication status of the user.
   * @returns {boolean|Object} - True for authenticated, false for not authenticated, or an object with success and error properties on failure.
   */
  const checkAuthStatus = async () => {
    try {
      // Check if the token is stored in localStorage
      const token = localStorage.getItem("authToken");

      if (token) {
        // Include the token in the request headers
        const response = await axios.get(`${backendURL}/api/users/check-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setLoggedIn(true);
          return true;
        }
      }
      setLoggedIn(false);
      return false;
    } catch (error) {
      setLoggedIn(false);
      // Return false for a failed authentication status with error
      return { success: false, error: error.response.data.error };
    }
  };

  /**
   * logout - Controller function to log out the user.
   */
  const logout = async () => {
    try {
      await axios.post(`${backendURL}/api/users/logout`, null, {
        withCredentials: true, // Include cookies in the request
      });

      // Clear the authToken from localStorage or do any other necessary cleanup
      localStorage.removeItem("authToken");

      setLoggedIn(false);
    } catch (error) {
      console.error("Error logging out: ", error);
      return { success: false, error: error.response.data.error };
    }
  };

  /**
   * openLoginModal - Function to open the login modal
   */
  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignUpModal(false);
    setShowForgotPasswordModal(false);
  };

  /**
   * openSignUpModal - Function to open the sign-up modal
   */
  const openSignUpModal = () => {
    setShowSignUpModal(true);
    setShowLoginModal(false);
    setShowForgotPasswordModal(false);
  };

  /**
   * openForgotPasswordModal - Function to open the forgot password modal
   */
  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  useEffect(() => {
    // Check authentication status when the app loads
    checkAuthStatus();
  }, []);

  const value = {
    login,
    signup,
    checkAuthStatus,
    logout,
    loggedIn,
    setLoggedIn,
    openLoginModal,
    openSignUpModal,
    openForgotPasswordModal,
    showLoginModal,
    setShowLoginModal,
    showSignUpModal,
    setShowSignUpModal,
    showForgotPasswordModal,
    setShowForgotPasswordModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
