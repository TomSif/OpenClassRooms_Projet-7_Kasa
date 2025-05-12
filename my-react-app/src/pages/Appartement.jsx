import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData } from '../api/fetchData';
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
          navigate('/error');
          return;
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement :', err);
        navigate('/error');
      }
    };
    
    getAppartementDetails();
  }, [id, navigate]); // Re-run when id changes

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
    <Header />
    <div className="appartement__details">

      {/* Slideshow component with apartment images */}
      <div className="appartement-slideshow">
        <Slideshow images={slideshowImages} />
      </div>
      
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