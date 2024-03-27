/**
 * Returns the short year like '22'.
 * @returns {string} The short year.
 */
function shortYear() {
  return new Date().getFullYear().toString().substr(-2);
}

/**
 * Returns the current month '2022'.
 * @returns {string} The full year.
 */
function fullYear() {
  return new Date().getFullYear().toString();
}

/**
 * Returns the current month.
 * @returns {string} The current month.
 */
function month() {
  const currentMonth = new Date().getMonth() + 1;
  return currentMonth.toString();
}

/**
 * Adds the specified number of days to a given date.
 * @param {Date} date - The base date.
 * @param {number} days - The number of days to add.
 * @returns {Date} The resulting date after adding the specified days.
 */
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Gets the current local date and time.
 * @returns {Date} The current local date and time.
 */
function getCurrentDateTime() {
  const utcDate = new Date(); // create a Date object representing the current UTC time
  const localOffset = utcDate.getTimezoneOffset(); // get the local time zone offset in minutes
  const localDate = new Date(
    utcDate.setMinutes(utcDate.getMinutes() - localOffset),
  ); // subtract the offset from the UTC time to get the local time

  return localDate;
}

/**
 * Translates a raw date string to the format 'YYYY-MM-DD Day HH:MM:SS'.
 * @param {string} rawDate - The raw date string in the format 'YYYY-MM-DDTHH:MM:SS.SSSZ'.
 * @returns {string} The translated date string in the format 'YYYY-MM-DD Day HH:MM:SS'.
 */
function translateRawDate(rawDate) {
  const d = new Date(rawDate);
  const formattedDate = d.toISOString().split('T')[0];
  const formattedTime = d.toISOString().split('T')[1].split('.')[0];
  const day = getDayOfWeek(d.getDay());

  return `${formattedDate} ${day} ${formattedTime}`;
}

// Helper function to get the day of the week as a string
function getDayOfWeek(dayIndex) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[dayIndex];
}

/**
 * Converts a date string to milliseconds since January 1, 1970.
 * @param {string} dateString - The date string in the format 'YYYY-MM-DD  HH:MM:SS'.
 * @returns {number} The number of milliseconds since January 1, 1970.
 */
function dateToMilliseconds(dateString) {
  const dateObj = new Date(dateString);
  return dateObj.getTime() / 1000;
}

function convertFromMiliseconds(unixDate) {
  return new Date(unixDate * 1000);
}

function customDate(dateString) {
  const customDate = new Date(dateString);
  const unixDate = customDate.getTime() / 1000;
  return { customDate, unixDate };
}
// const dateStr = '2023-02-14 07:39:46';
// const milliseconds = dateToMilliseconds(dateStr);
// console.log(milliseconds);

export default {
  shortYear,
  fullYear,
  month,
  addDays,
  getCurrentDateTime,
  translateRawDate,
  dateToMilliseconds,
  convertFromMiliseconds,
  customDate,
};
