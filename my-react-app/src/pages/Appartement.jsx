import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../api/fetchData';
import Slideshow from '../components/slideShow.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

/**
 * Component that displays detailed information about a specific apartment
 * @component
 * @returns {JSX.Element} Apartment details or loading/error states
 */
const Appartement = () => {
  /**
   * Get the id parameter from the URL
   */
  const { id } = useParams();
  const navigate = useNavigate();
  
  /**
   * State for storing the apartment data
   * @type {[Object|null, Function]}
   */
  const [appartement, setAppartement] = useState(null);
  
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
   * Fetches specific apartment data on component mount
   * @function
   * @async
   */
  useEffect(() => {
    const getAppartementDetails = async () => {
      try {
        // Fetch all apartments data
        const allData = await fetchData();
        
        // Find the specific apartment by id
        const foundAppartement = allData.find(item => item.id === id);
        
        if (foundAppartement) {
          setAppartement(foundAppartement);
        } else {
          // If no apartment is found with this id, throw an error
          throw new Error("Appartement non trouvé");
        }
        
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    
    getAppartementDetails();
  }, [id]); // Re-run when id changes

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => navigate('/')}>Retour à la liste</button>
      </div>
    );
  }

  // Prepare images array for the slideshow
  // Use cover as default and pictures array if available
  const slideshowImages = appartement.pictures && appartement.pictures.length > 0 
    ? appartement.pictures 
    : [appartement.cover];

  // Render apartment details
  return (
    <div className='appartement'>
    <Header />
    <div className="appartement__details">
      <h1>{appartement.title}</h1>
      
      {/* Slideshow component with apartment images */}
      <div className="appartement-slideshow">
        <Slideshow images={slideshowImages} />
      </div>
      
      <div className="appartement__info">
        <p className="location">{appartement.location}</p>
        
        {/* Display tags if available */}
        {appartement.tags && (
          <div className="tags">
            {appartement.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
        
        {/* Host information */}
        {appartement.host && (
          <div className="host">
            <p>{appartement.host.name}</p>
            {appartement.host.picture && (
              <img src={appartement.host.picture} alt={appartement.host.name} />
            )}
          </div>
        )}
        
        {/* Rating */}
        {appartement.rating && (
          <div className="rating">
            <p>Note: {appartement.rating}/5</p>
          </div>
        )}
        
        {/* Description */}
        <div className="description">
          <p>{appartement.description}</p>
        </div>
        
        {/* Equipments if available */}
        {appartement.equipments && (
          <div className="equipments">
            <h2>Équipements</h2>
            <ul>
              {appartement.equipments.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <button onClick={() => navigate('/')}>Retour à la liste</button>
    </div>
    <Footer />
    </div>
  );
};

export default Appartement;