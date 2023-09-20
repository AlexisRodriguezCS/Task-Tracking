/*
 * user.js - User Model
 *
 * This module defines the Mongoose schema for the User model,
 * including password hashing and authentication methods.
 *
 * Dependencies:
 * - mongoose: Mongoose library for MongoDB integration
 * - bcrypt: Library for password hashing
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Store the unique identifier for anonymous tasks(then store in cookie)
  anonymousIdentifier: {
    type: String,
  },
});

// Hash user's password before saving it to the database
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  // Generate a salt to hash the password
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords for user authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
