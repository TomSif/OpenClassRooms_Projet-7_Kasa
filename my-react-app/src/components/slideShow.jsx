import React, { useState, useEffect, useCallback } from 'react';

/**
 * Slideshow component that displays images with navigation arrows and indicator dots
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
    <div className="slideshow-container">
      {/* Current image display */}
      <div className="slide">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slide-image" />
        
        {/* Counter display - only show if multiple images */}
        {showNavigation && (
          <div className="slide-counter">
            {currentIndex + 1} / {totalSlides}
          </div>
        )}
      </div>

      {/* Navigation arrows - only show if multiple images */}
      {showNavigation && (
        <>
          <button className="arrow prev-arrow" onClick={prevSlide}>
            &lt;
          </button>
          <button className="arrow next-arrow" onClick={nextSlide}>
            &gt;
          </button>
        </>
      )}

      {/* Indicator dots - only show if multiple images */}
      {showNavigation && (
        <div className="dots-container">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slideshow;