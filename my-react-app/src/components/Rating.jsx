import { FaStar } from 'react-icons/fa'; // Ou toute autre icône d’étoile

const StarRating = ({ rating }) => {
  return (
    <div className="appartement__rating__star">
      {[...Array(5)].map((_, index) => (
        <FaStar className='star-icon'
          key={index}
          color={index < rating ? '#FF6060' : '#E3E3E3'} // jaune ou gris
        />
      ))}
    </div>
  );
};

export default StarRating;