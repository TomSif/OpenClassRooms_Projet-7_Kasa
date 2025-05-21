import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApartmentById } from '../api/fetchData'; // Fonction spécialisée
import Slideshow from '../components/slideShow.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import StarRating from '../components/Rating.jsx';
import Collapse from '../components/Collapse';

/**
 * Component that displays detailed information about a specific apartment
 * @component
 * @returns {JSX.Element} Apartment details or loading/error states
 */
const Appartement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [appartement, setAppartement] = useState(null);
  const [loading, setLoading] = useState(true);
  
  /**
   * Finds specific apartment data on component mount
   * @function
   */
  useEffect(() => {
    const getAppartementDetails = () => {
      try {
        // Get the specific apartment using dedicated function
        const foundAppartement = getApartmentById(id);
        
        if (foundAppartement) {
          setAppartement(foundAppartement);
        } else {
          navigate('/Error');
          return;
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement :', err);
        navigate('/Error');
      }
    };
    
    getAppartementDetails();
  }, [id, navigate]);

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Prepare images array for the slideshow
  // Use cover as default and pictures array if available
  const slideshowImages = appartement.pictures && appartement.pictures.length > 0 
    ? appartement.pictures 
    : [appartement.cover];

  // Render apartment details
  return (
    <div className='appartement'>
      <div className="appartement__header">
        <Header />
      </div>
      <div className="appartement__details">
        {/* Slideshow component with apartment images */}
        <div className="appartement-slideshow">
          <Slideshow images={slideshowImages} />
        </div>

        <div className="appartement__wrapper">
          <div className="appartement__info">
            <h1 className='appartement__title'>{appartement.title}</h1>
            <p className="appartement__location">{appartement.location}</p>
            
            {/* Display tags if available */}
            {appartement.tags && (
            <ul className="appartement__tags">
              {appartement.tags.map((tag, index) => (
                <li key={index} className="tag">{tag}</li>
              ))}
            </ul>
            )}
          </div>

          {/* host and rating container */}
          <div className='appartement__host-rating'>
            {/* Rating */}
            {appartement.rating && (
              <div className="appartement__rating">
                <StarRating rating={appartement.rating}/>
              </div>
            )}
            
            {/* Host information */}
            {appartement.host && (
              <div className="appartement__host">
                <p className='appartement__host__name'>{appartement.host.name}</p>
                {appartement.host.picture && (
                  <img className="appartement__host__picture" src={appartement.host.picture} alt={appartement.host.name} />
                )}
              </div>
            )}
          </div>
        </div>

    
        <div className="appartement__collapse">
          {/* Description */}
          <div className="appartement__description">
            <Collapse title="Description">
              <p className="appartement__description__paragraph">{appartement.description}</p>
            </Collapse>
          </div>
          
          {/* Equipments if available */}
          <div className="appartement__equipements">
            {appartement.equipments && (
              <Collapse title="Équipements">
                  <ul>
                    {appartement.equipments.map((item, index) => (
                      <li className="appartement__equipements__item"key={index}>{item}</li>
                    ))}
                  </ul>
              </Collapse>
            )}
          </div>
        </div>
    </div>

    <Footer />
    </div>
  );
};

export default Appartement;