import { useState } from 'react';

/**
 * Collapse component that toggles visibility of content with animation.
 * @param {Object} props
 * @param {string} props.title - The visible clickable title
 * @param {React.ReactNode} props.children - Content to show/hide
 */
function Collapse({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapse">
      <button
        className="collapse-toggle"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        {title}
        <span className={`arrow ${isOpen ? "open" : ""}`} />
      </button>

      <div className={`collapse-content ${isOpen ? "open" : ""}`}>
        <div className="collapse-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Collapse;
