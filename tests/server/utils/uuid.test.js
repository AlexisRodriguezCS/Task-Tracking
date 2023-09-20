/**
 * uuid.test.js - UUID Utility Test Cases
 *
 * This module contains test cases for the UUID generation utility.
 *
 * Dependencies:
 * - Jest: JavaScript testing framework
 * - generateUUID: The UUID generation utility function
 *
 * Usage:
 * Run the tests in this file using the following command:
 * npx jest uuid
 */

const generateUUID = require("../../../server/src/utils/uuid");

describe("uuid.js - UUID Utility", () => {
  /**
   * Test Case 1:
   * Ensure that the generated UUID matches the expected pattern.
   */
  it("should generate a valid UUID", () => {
    // Define the pattern for a valid UUID
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    // Generate a UUID
    const uuid = generateUUID();

    // Check if the generated UUID matches the pattern
    expect(uuid).toMatch(uuidPattern);
  });

  /**
   * Test Case 2:
   * Ensure that consecutive UUIDs are unique.
   */
  it("should generate unique UUIDs", () => {
    // Generate two UUIDs
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();

    // Check if the generated UUIDs are not equal
    expect(uuid1).not.toBe(uuid2);
  });

  /**
   * Test Case 3:
   * Ensure that the generated UUID has the correct length.
   */
  it("should generate UUIDs of the correct length", () => {
    // Generate a UUID
    const uuid = generateUUID();

    // Check if the length of the generated UUID is 36
    expect(uuid.length).toBe(36);
  });

  /**
   * Test Case 4:
   * Ensure that multiple calls to generateUUID result in different UUIDs.
   */
  it("should generate different UUIDs on each call", () => {
    // Generate three UUIDs
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();
    const uuid3 = generateUUID();

    // Check if the generated UUIDs are all different
    expect(uuid1).not.toBe(uuid2);
    expect(uuid1).not.toBe(uuid3);
    expect(uuid2).not.toBe(uuid3);
  });
});
