import React, { useMemo } from 'react';
import { getApartmentData } from '../api/fetchData';
import { Link } from 'react-router-dom';

/**
 * Component that displays a list of apartments
 * Optimized with useMemo since data is static
 * @component
 * @returns {JSX.Element} List of apartment cards
 */
const AppartementList = () => {
  const appartements = useMemo(() => {
    try {
      return getApartmentData();
    } catch (err) {
      console.error('Erreur de chargement :', err);
      return [];
    }
  }, []); // Aucune dépendance = calcul unique

  return (
    <ul className='cards__container'>
      {appartements.map(appartement => (
        <li key={appartement.id} className='cards'>
          <Link to={`/appartement/${appartement.id}`} className="cards__link"> 
            <div className="cards__img-container">
              <img className="cards__img" src={appartement.cover} alt={appartement.title} />
              <span className='cards-title'>{appartement.title}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AppartementList;