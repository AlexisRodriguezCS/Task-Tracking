/**
 * LoadingModal Component
 *
 * Description:
 * The LoadingModal component displays a loading animation with an optional message.
 * It is used to indicate that a background process is in progress, such as starting the backend.
 *
 * Dependencies:
 * - React: The core library for building user interfaces in React applications.
 * - "./LoadingModal.css": The stylesheet for styling the LoadingModal component.
 *
 * Usage:
 * 1. Import this component in your application where you want to display a loading animation.
 * 2. Control its visibility using a state variable (e.g., loading) in your parent component.
 *
 * Comments:
 * - This component is meant to be displayed as an overlay during background processes.
 * - It includes a loading spinner and an optional loading message.
 */

import React from "react";
import "../styles/LoadingModal.css";

const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <div className="loading-content">
        <div className="loader"></div>
        <p>Starting Backend...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
