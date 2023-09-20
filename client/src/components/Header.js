/*
 * Header.js - Header Component
 *
 * This module contains the Header component for the application.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - Profile: Profile component
 * - useAuth function from ../contexts/AuthContext
 * - Header.css: Stylesheet for the Header component
 */

import React from "react";
import Profile from "./Profile";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Header.css";

/**
 * Header - Component for rendering the application header.
 */
function Header() {
  const { loggedIn, openLoginModal, openSignUpModal } = useAuth();

  return (
    <nav className="header">
      <div className="header-content">
        <div className="title">Task Tracker</div>
        <ul className="nav-links">
          {loggedIn ? (
            <Profile />
          ) : (
            <>
              <li>
                <button className="button login" onClick={openLoginModal}>
                  Log in
                </button>
              </li>
              <li>
                <button className="button signup" onClick={openSignUpModal}>
                  Sign up
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
