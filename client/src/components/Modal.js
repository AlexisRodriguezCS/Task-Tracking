/*
 * Modal.js - Modal Component
 *
 * This module contains the Modal component for displaying modal content.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - useEffect and useRef hooks for managing component effects and refs
 * - "../styles/Modal.css": Stylesheet for the Modal component
 */

import React from "react";
import "../styles/Modal.css";

/**
 * Modal - Component for displaying a modal dialog.
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {ReactNode} props.children - Content to display within the modal.
 */
const Modal = ({ children }) => {
  // const modalContainerRef = useRef(null);

  /**
   * handleClickOutside - Function to handle clicks outside the modal.
   * @param {Event} e - The click event.
   */
  // const handleClickOutside = (e) => {
  //   if (modalContainerRef.current && modalContainerRef.current === e.target) {
  //     onClose();
  //   }
  // };

  // // Add event listener when the component mounts
  // useEffect(() => {
  //   modalContainerRef.current.addEventListener("click", handleClickOutside);
  // }, []);

  return (
    <div className="modal-container">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
