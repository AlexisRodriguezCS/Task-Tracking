/*
 * RegistrationSuccess.test.js - Unit Tests for RegistrationSuccess Component
 *
 * This module contains unit tests for the RegistrationSuccess component, which displays a success message
 * when a user's registration is successful.
 *
 * Dependencies:
 * - React: JavaScript library for building user interfaces
 * - render, fireEvent, cleanup: Functions from @testing-library/react for testing React components
 * - @testing-library/jest-dom/extend-expect: Extends Jest expect with additional matchers
 * - RegistrationSuccess: RegistrationSuccess component to be tested
 * - useAuth function from ../contexts/AuthContext: Mocked AuthContext for testing
 */

import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RegistrationSuccess from "../../../client/src/components/RegistrationSuccess";

// Mock the useAuth hook
jest.mock("../../../client/src/contexts/AuthContext", () => ({
  useAuth: () => ({
    openLoginModal: jest.fn(),
  }),
}));

describe("RegistrationSuccess Component", () => {
  afterEach(cleanup); // Clean up after each test

  it("renders correctly", () => {
    const { getByText } = render(<RegistrationSuccess onClose={() => {}} />);

    // Check if specific elements are present
    expect(getByText("Registration Successful")).toBeInTheDocument();
    expect(
      getByText("Your account has been successfully registered.")
    ).toBeInTheDocument();
    expect(getByText("Log in")).toBeInTheDocument();
  });

  it("calls openLoginModal function on 'Log in' button click", () => {
    const { getByText } = render(<RegistrationSuccess onClose={() => {}} />);
    const loginButton = getByText("Log in");

    fireEvent.click(loginButton);

    const {
      openLoginModal,
    } = require("../../../client/src/contexts/AuthContext");
    expect(openLoginModal).toHaveBeenCalledTimes(1);
  });
});
