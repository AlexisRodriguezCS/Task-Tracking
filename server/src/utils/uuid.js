/*
 * uuid.js - Utility function to generate UUIDs
 *
 * This module defines a function to generate a Universally Unique Identifier (UUID).
 * It can be used to create unique identifiers for tasks created by anonymous users.
 *
 * Usage:
 * const generateUUID = require("../utils/uuid");
 * const uniqueIdentifier = generateUUID();
 */

/**
 * generateUUID - Generates a Universally Unique Identifier (UUID).
 * @returns {string} A unique identifier.
 */
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

module.exports = generateUUID;
