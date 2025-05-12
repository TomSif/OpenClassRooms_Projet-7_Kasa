import React, { useState, useEffect, useCallback } from 'react';

/**
 * Slideshow component that displays images with navigation arrows and counter
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.images - Array of image URLs to display
 * @returns {JSX.Element} Slideshow component
 */

const Slideshow = ({ images }) => {
  // State to track current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Calculate total slides
  const totalSlides = images.length;


  /**
   * Navigate to the next slide with infinite scrolling
   * @function
   */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);


  /**
   * Navigate to the previous slide with infinite scrolling
   * @function
   */
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);



  /**
   * Handle keyboard navigation
   * @function
   * @param {KeyboardEvent} event - Keyboard event
   */

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  }, [nextSlide, prevSlide]);



  // Add keyboard event listeners on mount and remove on unmount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);



  // Don't render slideshow if no images
  if (!images || images.length === 0) {
    return <div className="slideshow-container">Aucune image disponible</div>;
  }


  // Don't show navigation if only one image
  const showNavigation = images.length > 1;




  return (
    <div className="slideshow">
      {/* Current image display */}
      <div className="slideshow__window">
        <div
          className="slideshow__track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="slideshow__image"
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows - only show if multiple images */}
      {showNavigation && (
        <>
          <button className="slideshow__arrow prev-arrow" onClick={prevSlide}>
            <span className="s__arrow"></span>
          </button>
          <button className="slideshow__arrow next-arrow" onClick={nextSlide}>
            <span className="s__arrow"></span>
          </button>
        </>
      )}
    </div>
  );
};

export default Slideshow;