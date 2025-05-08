import { useState, useRef, useEffect } from 'react';
import '../styles/pages/_about.scss'; // adjust path if needed

/**
 * Collapse component that shows/hides content with a toggle animation.
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The visible title that toggles the content
 * @param {React.ReactNode} props.children - Content to be shown/hidden
 * @returns {JSX.Element} Collapse component JSX
 */
function Collapse({ title, children }) {
    /**
     * State that controls whether the collapse is open or closed
     */
    const [isOpen, setIsOpen] = useState(false);
    
    /**
     * Ref to the content DOM element for height animation
     */
    const contentRef = useRef(null);

    /**
     * Effect that handles the open/close animation
     * by adjusting the content element's styles
     */
    useEffect(() => {
      const content = contentRef.current;
      if (!content) return;
  
      if (isOpen) {
        content.style.maxHeight = "400px"; // fixed at 400px
        content.style.padding = "20px 40px";
      } else {
        content.style.maxHeight = "0";
        content.style.padding = "0 40px";
      }
    }, [isOpen]);
  
    return (
      <div className="details">
        <div className="summary" onClick={() => setIsOpen(prev => !prev)}>
          {title}
          <span className={`arrow ${isOpen ? "open" : ""}`} />
        </div>
  
        <div ref={contentRef} className="content">
          {children}
        </div>
      </div>
    );
}
  
export default Collapse;