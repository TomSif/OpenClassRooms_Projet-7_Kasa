// src/api/fetchData.js
const jsonUrl = '../../public/data/appartements.json';

export const fetchData = async () => {
    const response = await fetch(jsonUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };