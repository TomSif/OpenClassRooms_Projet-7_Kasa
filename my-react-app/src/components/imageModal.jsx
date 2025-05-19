import React, { useEffect, useRef } from 'react';

/**
 * Modal component for displaying images in fullscreen
 * @component
 * @param {Object} props - Component props
 * @param {string} props.imageSrc - URL of the image to display
 * @param {Function} props.onClose - Function to call when closing the modal
 * @returns {JSX.Element} ImageModal component
 */
const ImageModal = ({ imageSrc, onClose }) => {
  const modalRef = useRef(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore scroll when modal closes
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Close modal when clicking outside the image
  const handleBackdropClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div 
      className="image-modal__overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image en plein écran"
    >
      <div className="image-modal__content">
        <div className="image-modal__image-container" ref={modalRef}>
          <button 
            className="image-modal__close-btn"
            onClick={onClose}
            aria-label="Fermer"
            >
            &times;
          </button>
          <img 
            src={imageSrc} 
            alt="Vue agrandie" 
            className="image-modal__image" 
            onDoubleClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;