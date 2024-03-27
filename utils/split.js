import { ServerError } from './ApiError.js';

/**
 * Splits the URL parameters using a regular expression and returns an array of segments.
 *
 * @param {string} urlParams - The URL parameters to be processed.
 * @returns {string[]} An array of segments extracted from the URL parameters.
 * @throws {ServerError} If the input is not a string.
 * @throws {Error} If the input does not match the expected URL structure.
 *
 * @example
 * const urlParams = "https://example.com/api/v1/resource/item/123?name=resource";
 * const segments = splittingUrl(urlParams);
 * // segments will be ["resource", "item", "123"]
 */
const splitUrl = (urlParams) => {
  const match = urlParams.match(/api\/v\d+\/([^?]+)/i);

  if (!match) {
    throw new ServerError('Unexpected URL structure.');
  }

  const segments = match[1].split('/');

  if (segments.length === 0) {
    throw new ServerError('Unexpected URL structure.');
  }

  return segments;
};

export default splitUrl;
