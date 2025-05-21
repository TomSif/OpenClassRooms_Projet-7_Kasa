/**
 * StarRating component that displays a rating as stars.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.rating - The rating value to display (between 0 and 5).
 * @returns {JSX.Element} A set of star icons representing the rating.
 * 
 * @example
 * // Example usage
 * <StarRating rating={3} />
 */
import { FaStar } from 'react-icons/fa'; // import star icon 

const StarRating = ({ rating }) => {
  return (
    <div className="appartement__rating__star">
      {[...Array(5)].map((_, index) => (
        <FaStar className='star-icon'
          key={index}
          color={index < rating ? '#FF6060' : '#E3E3E3'} // red or gray
        />
      ))}
    </div>
  );
};

export default StarRating;