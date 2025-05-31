import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApartmentById } from "../api/fetchData"; // Fonction spécialisée
import Slideshow from "../components/slideShow.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import StarRating from "../components/Rating.jsx";
import Collapse from "../components/Collapse";

/**
 * Component that displays detailed information about a specific apartment.
 * Fetches data based on the apartment ID retrieved from the URL params.
 *
 * @component
 * @returns {JSX.Element} Complete apartment details view or loading/error fallback
 */
const Appartement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /**
   * Apartment data retrieved by ID from a static source.
   * @type {[Object|null, Function]}
   */
  const [appartement, setAppartement] = useState(null);

  /**
   * Tracks loading state while retrieving apartment data.
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(true);

  /**
   * Fetches apartment data on component mount and handles navigation on error.
   * In a real-world app, this could be asynchronous.
   */
  useEffect(() => {
    const getAppartementDetails = () => {
      try {
        const foundAppartement = getApartmentById(id);

        if (foundAppartement) {
          setAppartement(foundAppartement);
        } else {
          navigate("/Error");
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement :", err);
        navigate("/Error");
      }
    };

    getAppartementDetails();
  }, [id, navigate]);

  /**
   * Displays a loading state while fetching apartment data.
   * In a production-grade app, this could be replaced with a visual skeleton for better UX.
   */
  if (loading) {
    return (
      <>
        <Header />
        <div>Loading...</div>
        <Footer />
      </>
    );
  }

  /**
   * Prepares an array of images for the Slideshow component.
   * If no pictures are available, uses the cover image as fallback.
   * @type {string[]}
   */
  const slideshowImages =
    appartement.pictures && appartement.pictures.length > 0
      ? appartement.pictures
      : [appartement.cover];

  return (
    <div className="appartement">
      <div className="appartement__header">
        <Header />
      </div>

      <div className="appartement__details">
        {/* Slideshow component displaying images */}
        <div className="appartement-slideshow">
          <Slideshow images={slideshowImages} />
        </div>

        <div className="appartement__wrapper">
          {/* Title, location and tags */}
          <div className="appartement__info">
            <h1 className="appartement__title">{appartement.title}</h1>
            <p className="appartement__location">{appartement.location}</p>

            {/* Display tags if available */}
            {appartement.tags && (
              <ul className="appartement__tags">
                {appartement.tags.map((tag, index) => (
                  <li key={index} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Rating and host information */}
          <div className="appartement__host-rating">
            {/* Display rating using star component */}
            {appartement.rating && (
              <div className="appartement__rating">
                <StarRating rating={appartement.rating} />
              </div>
            )}

            {/* Display host name and picture */}
            {appartement.host && (
              <div className="appartement__host">
                <p className="appartement__host__name">
                  {appartement.host.name}
                </p>
                {appartement.host.picture && (
                  <img
                    className="appartement__host__picture"
                    src={appartement.host.picture}
                    alt={appartement.host.name}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Collapse sections for description and equipments */}
        <div className="appartement__collapse">
          {/* Description block */}
          <div className="appartement__description">
            <Collapse title="Description">
              <p className="appartement__description__paragraph">
                {appartement.description}
              </p>
            </Collapse>
          </div>

          {/* Equipments block if available */}
          <div className="appartement__equipements">
            {appartement.equipments && (
              <Collapse title="Équipements">
                <ul>
                  {appartement.equipments.map((item, index) => (
                    <li className="appartement__equipements__item" key={index}>
                      {item}
                    </li>
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
