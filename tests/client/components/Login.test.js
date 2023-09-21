/*
 * Login.test.js - Unit Tests for Login Component
 *
 * This module contains unit tests for the Login component, which handles user authentication.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - render, fireEvent, waitFor, cleanup: Functions from @testing-library/react for testing React components
 * - @testing-library/jest-dom/extend-expect: Extends Jest expect with additional matchers
 * - Login: Login component to be tested
 * - useAuth function from ../contexts/AuthContext: Mocked AuthContext for testing
 */

import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../../../client/src/components/Login";

// Mock the useAuth hook
jest.mock("../../../client/src/contexts/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(),
    setLoggedIn: jest.fn(),
    openSignUpModal: jest.fn(),
    openForgotPasswordModal: jest.fn(),
  }),
}));

describe("Login Component", () => {
  afterEach(cleanup); // Clean up after each test

  it("renders correctly", () => {
    const { getByLabelText, getByText } = render(<Login onClose={() => {}} />);

    // Check if specific elements are present
    expect(getByLabelText("Email Address")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Log In")).toBeInTheDocument();
    expect(getByText("Forgot your password?")).toBeInTheDocument();
    expect(getByText("Don't have an account?")).toBeInTheDocument();
  });

  it("calls login function on form submission", async () => {
    const { getByLabelText, getByText } = render(<Login onClose={() => {}} />);
    const emailInput = getByLabelText("Email Address");
    const passwordInput = getByLabelText("Password");
    const loginButton = getByText("Log In");

    // Mock the login function to return true
    const {
      login,
      setLoggedIn,
    } = require("../../../client/src/contexts/AuthContext");
    login.mockResolvedValue(true);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(setLoggedIn).toHaveBeenCalledWith(true);
    });
  });
});
