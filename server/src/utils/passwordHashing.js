/*
 * hashPassword.js - Password Hashing Utility
 *
 * This module defines a utility function for hashing passwords using bcrypt.
 * The function takes a plain text password, generates a salt, and then
 * hashes the password with the salt to create a secure hash.
 *
 * Dependencies:
 * - bcrypt: Library for password hashing
 */

const bcrypt = require("bcrypt");

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - The hashed password.
 */
async function hashPassword(password) {
  if (!password) {
    throw new Error("Password cannot be empty");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

module.exports = hashPassword;
