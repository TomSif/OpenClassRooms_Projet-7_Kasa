// api/fetchData.js
import appartements from '../assets/data/appartements.json';

/**
 * Gets all apartment data from imported JSON
 * @function getApartmentData
 * @returns {Array} Array of apartment objects
 */
export const getApartmentData = () => {
    return appartements;
};

/**
 * Gets a specific apartment by ID
 * @function getApartmentById
 * @param {string} id - The apartment ID
 * @returns {Object|null} The apartment object or null if not found
 */
export const getApartmentById = (id) => {
    return appartements.find(apartment => apartment.id === id) || null;
};