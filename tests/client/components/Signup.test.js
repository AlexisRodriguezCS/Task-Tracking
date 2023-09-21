/*
 * SignUp.test.js - Unit Tests for SignUp Component
 *
 * This module contains unit tests for the SignUp component, which handles user registration.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - render, fireEvent, waitFor, cleanup: Functions from @testing-library/react for testing React components
 * - @testing-library/jest-dom/extend-expect: Extends Jest expect with additional matchers
 * - SignUp: SignUp component to be tested
 * - RegistrationSuccess: RegistrationSuccess component for displaying a success message after registration
 * - useAuth function from ../contexts/AuthContext: Mocked AuthContext for testing
 */

import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignUp from "../../../client/src/components/SignUp";

// Mock the useAuth hook
jest.mock("../../../client/src/contexts/AuthContext", () => ({
  useAuth: () => ({
    signup: jest.fn(),
    openLoginModal: jest.fn(),
  }),
}));

describe("SignUp Component", () => {
  afterEach(cleanup); // Clean up after each test

  it("renders correctly", () => {
    const { getByLabelText, getByText } = render(<SignUp onClose={() => {}} />);

    // Check if specific elements are present
    expect(getByLabelText("Email Address")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Sign Up")).toBeInTheDocument();
    expect(getByText("Already have an account?")).toBeInTheDocument();
  });

  it("calls signup function on form submission", async () => {
    const { getByLabelText, getByText } = render(<SignUp onClose={() => {}} />);
    const emailInput = getByLabelText("Email Address");
    const passwordInput = getByLabelText("Password");
    const signUpButton = getByText("Sign Up");

    // Mock the signup function to return true
    const { signup } = require("../../../client/src/contexts/AuthContext");
    signup.mockResolvedValue(true);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
