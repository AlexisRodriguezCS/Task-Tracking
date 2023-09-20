/**
 * passwordHashing.test.js - Password Hashing Function Test
 *
 * This module contains tests for the password hashing function.
 * It ensures that the password hashing function produces the expected hashed output.
 *
 * Dependencies:
 * - chai: Assertion library for tests
 * - hashPassword: The password hashing function
 * - chai-as-promised: Chai extension to work with promises for better assertion handling
 *
 * Usage:
 * Run the tests in this file using the following command:
 * npx mocha .\tests\server\utils\passwordHashing.test.js
 */

const chai = require("chai"); // Import the assertion library
const hashPassword = require("../../../server/src/utils/passwordHashing"); // Import the password hashing function
const chaiAsPromised = require("chai-as-promised"); // Import the chai-as-promised extension

chai.use(chaiAsPromised);
const expect = chai.expect; // Create an assertion object

// Test suite for the Password Hashing Function
describe("Password Hashing Function", () => {
  /**
   * Test Case 1:
   * Hashing a password correctly.
   */
  it("should hash a password correctly", async () => {
    // Define the plain password to be hashed
    const plainPassword = "testpassword1";

    // Hash the plain password using the hashPassword function
    const hashedPassword = await hashPassword(plainPassword);

    // Perform assertions to check if hashing is working as expected
    expect(hashedPassword).to.exist; // Ensure a hashed password is generated
  });

  /**
   * Test Case 2:
   * Hashing the same password should result in different hashes.
   */
  it("should produce different hashes for the same password", async () => {
    // Define the plain password
    const plainPassword = "testpassword1";

    // Hash the plain password twice
    const hashedPassword1 = await hashPassword(plainPassword);
    const hashedPassword2 = await hashPassword(plainPassword);

    // Perform assertions to check if two hashes are different
    expect(hashedPassword1).to.not.equal(hashedPassword2);
  });

  /**
   * Test Case 3:
   * Hashing an empty password should result in an error.
   */
  it("should throw an error when hashing an empty password", async () => {
    // Define an empty password
    const emptyPassword = "";

    // Perform assertions to check if an error is thrown
    await expect(hashPassword(emptyPassword)).to.be.rejectedWith(
      Error,
      "Password cannot be empty"
    );
  });
});
