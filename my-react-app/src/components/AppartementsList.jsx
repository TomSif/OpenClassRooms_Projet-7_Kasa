import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/fetchData';
import { Link } from 'react-router-dom';

/**
 * Component that fetches and displays a list of apartments
 * @component
 * @returns {JSX.Element} List of apartment cards or loading/error states
 */
const AppartementList = () => {
  /**
   * State for storing the list of apartments
   * @type {[Array, Function]}
   */
  const [appartements, setAppartements] = useState([]);

  /**
   * State for tracking loading status
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(true);

  /**
   * State for storing potential error
   * @type {[null|Error, Function]}
   */
  const [error, setError] = useState(null);

  /**
   * Fetches apartment data on component mount
   * @function
   * @async
   */
  useEffect(() => {
    const getAppartements = async () => {
      try {
        const data = await fetchData();
        setAppartements(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    
    getAppartements();
  }, []);

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  /**
   * Renders the list of apartment cards
   * @returns {JSX.Element} UL element containing apartment cards
   */
  return (
    <ul className='cards__container'>
      {appartements.map(appartement => (
        <li key={appartement.id} className='cards'>
          <Link to={`/appartement/${appartement.id}`} className="cards__link"> 
            <img src={appartement.cover} alt={appartement.title} />
            <span className='cards-title'>{appartement.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AppartementList;