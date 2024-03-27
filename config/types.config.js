import {
  validateRegex,
  validateArray,
  validateEmail,
  validateMongodbId,
  validateType,
} from '../utils/validator.js';

/**
 * Configuration Map for Data Type Validation
 *
 * This module defines a configuration map that facilitates data type validation
 * and error handling. It provides predefined configurations for different data types
 * and custom validation patterns.
 *
 * @module typeConfigs
 */

/**
 * Validation rules and error messages for different data types.
 *
 * @typedef {object} TypeValidationConfig
 * @property {Function} validate - Validation function for the specific data type.
 * @property {string} errorMessage - Error message for the specific data type validation.
 */

/**
 * Configuration object for defining validation rules and error messages.
 * @type {Object.<string, TypeValidationConfig>}
 */

const typeConfigs = {
  string: {
    type: 'string',
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateType(value, this.type);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid data type. Expected a string.';
    },
  },
  number: {
    type: 'number',
    validate: function (value) {
      if (value !== '' && value !== undefined) {
        return validateType(value, this.type);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid data type. Expected a number.';
    },
  },
  boolean: {
    type: 'boolean',
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateType(value, this.type);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid data type. Expected a boolean.';
    },
  },
  function: {
    type: 'function',
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateType(value, this.type);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid data type. Expected a function.';
    },
  },
  object: {
    type: 'object',
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateType(value, this.type);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid data type. Expected an object.';
    },
  },
  required: {
    validate: function (value) {
      return value !== undefined && value !== null && value !== ''
        ? true
        : false;
    },
    errorMessage: function () {
      return 'This field is required.';
    },
  },
  numberGreaterThan: {
    comparisonValue: null,
    validate: function ({ value, comparisonValue }) {
      this.comparisonValue = comparisonValue;
      return validateType(value, 'number') && value >= comparisonValue;
    },
    errorMessage: function () {
      return `Value must be greater than the ${this.comparisonValue}.`;
    },
  },
  numberLessThan: {
    comparisonValue: null,
    validate: function ({ value, comparisonValue }) {
      this.comparisonValue = comparisonValue;
      return validateType(value, 'number') && value <= comparisonValue;
    },
    errorMessage: function () {
      return `Value must be less than the ${this.comparisonValue}.`;
    },
  },
  stringLenghtLessThan: {
    comparisonValue: null,
    validate: function ({ value, comparisonValue }) {
      this.comparisonValue = comparisonValue;
      return validateType(value, 'string') && value.length <= comparisonValue;
    },
    errorMessage: function () {
      return `String must be less than the ${this.comparisonValue}.`;
    },
  },
  stringLenghtGreaterThan: {
    comparisonValue: null,
    validate: function ({ value, comparisonValue }) {
      this.comparisonValue = comparisonValue;
      return validateType(value, 'string') && value.length >= comparisonValue;
    },
    errorMessage: function () {
      return `String must be greater than the ${this.comparisonValue}.`;
    },
  },
  matchesExpectedValue: {
    validate: function ({ value, expectedValue }) {
      return value === expectedValue;
    },
    errorMessage: function () {
      return `Value does not match the expected value`;
    },
  },
  enum: {
    validate: function ({ value, expectedValue }) {
      return expectedValue?.includes(value);
    },
    errorMessage: function () {
      return `Value is not one of the expected values`;
    },
  },
  matchesExpectedMaxLength: {
    validate: function ({ value, expectedMaxLength }) {
      return value.length <= expectedMaxLength;
    },
    errorMessage: function () {
      return `Value does not match the expected max length`;
    },
  },
  mongodbId: {
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateMongodbId(value);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid MongoDB ID format.';
    },
  },
  array: {
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateArray(value);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid data type. Expected an array.';
    },
  },
  arrayWithRequiredLength: {
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateArray(value) && value.length > 0;
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid data or length. Expected a non-empty array.';
    },
  },
  arrayWithDuplicatedValue: {
    validate: function (value) {
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        validateArray(value)
      ) {
        const uniqueData = new Set(value);
        return uniqueData.size === value.length;
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid data or length. Expected a non-empty array with duplicate values.';
    },
  },
  email: {
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateEmail(value);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid email format.';
    },
  },
  datePattern: {
    pattern:
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/,
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateRegex(value, this.pattern);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid date format. Expected YYYY-MM-DD hh:mm:ss';
    },
  },
  indonesianPhoneNumberPattern: {
    pattern: /^(0|\+62)\d{9,13}$/,
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateRegex(value, this.pattern);
      }
    },
    errorMessage: function () {
      return 'Invalid Indonesian phone number.';
    },
  },
  universalPhoneNumberPattern: {
    pattern: /^(\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})$/,
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateRegex(value, this.pattern);
      }
    },
    errorMessage: function () {
      return 'Invalid universal phone number.';
    },
  },
  passwordPattern: {
    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    validate: function (value) {
      if (value !== undefined && value !== null && value !== '') {
        return validateRegex(value, this.pattern);
      }
      return true;
    },
    errorMessage: function () {
      return 'Invalid password format. Must contain at least one uppercase letter and one digit.';
    },
  },
  noRekPattern: {
    pattern: /^\d{10}$/,
    validate: function (value) {
      return validateRegex(value, this.pattern);
    },
    errorMessage: function () {
      return 'Invalid no rekening format.';
    },
  },
};

export default typeConfigs;
