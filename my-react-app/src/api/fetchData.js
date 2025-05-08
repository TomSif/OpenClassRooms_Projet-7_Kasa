/**
 * Path to the JSON data file containing apartment listings
 * @constant
 * @type {string}
 */
const jsonUrl = '../../public/data/appartements.json';

/**
 * Fetches apartment data from JSON file
 * @async
 * @function fetchData
 * @throws {Error} When network response is not OK
 * @returns {Promise<Array>} Promise resolving to an array of apartment objects
 */
export const fetchData = async () => {
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
};