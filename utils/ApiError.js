/**
 * Custom error class for user errors.
 *
 * @class UserError
 * @extends Error
 *
 * @param {string} message - The error message.
 * @param {number} [statusCode=400] - The HTTP status code for the error (default is 400).
 * @param {string} [recommendation=''] - The recommendation or suggested solution for the error (default is an empty string).
 *
 * @property {string} name - The name of the error ('UserError').
 * @property {number} statusCode - The HTTP status code for the error.
 * @property {string} recommendation - The recommendation or suggested solution for the error.
 *
 * @example
 * throw new UserError('Invalid input', 400, 'Please provide valid input.');
 */
export class UserError extends Error {
  constructor(message, statusCode = 400, recommendation = '') {
    super(message);
    this.name = 'UserError';
    this.statusCode = statusCode;
    this.recommendation = recommendation;
    Object.setPrototypeOf(this, UserError.prototype);
  }
}

/**
 * Custom error class for server errors.
 *
 * @class ServerError
 * @extends Error
 *
 * @param {string} message - The error message.
 * @param {number} [statusCode=500] - The HTTP status code for the error (default is 500).
 *
 * @property {string} name - The name of the error ('ServerError').
 * @property {number} statusCode - The HTTP status code for the error.
 *
 * @example
 * throw new ServerError('Internal server error', 500);
 */
export class ServerError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
