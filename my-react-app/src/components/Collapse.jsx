import { useState, useRef, useEffect } from 'react';
import '../styles/pages/_about.scss'; // adapte le chemin si besoin

function Collapse({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
  
    useEffect(() => {
      const content = contentRef.current;
      if (!content) return;
  
      if (isOpen) {
        content.style.maxHeight = "400px"; // fixe à 400px
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