/**
 * Validates if a given value matches the expected data type.
 * @param {*} value - The value to be validated.
 * @param {string} expectedType - The expected data type (e.g., 'string', 'number', 'object', etc.).
 * @returns {boolean} - Returns true if the value matches the expected data type, false otherwise.
 */
export const validateType = (value, expectedType) => {
	return typeof value === expectedType && (expectedType !== "object" || value !== null);
};
