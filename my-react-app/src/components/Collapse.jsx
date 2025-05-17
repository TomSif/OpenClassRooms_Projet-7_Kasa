import { useState, useRef, useEffect } from 'react';

/**
 * Collapse component that toggles visibility of content with animation.
 * @param {Object} props
 * @param {string} props.title - The visible clickable title
 * @param {React.ReactNode} props.children - Content to show/hide
 */
function Collapse({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (isOpen) {
      const scrollHeight = content.scrollHeight;
      content.style.maxHeight = scrollHeight + "px";
    } else {
      content.style.maxHeight = "0px";
    }
  }, [isOpen]);

  return (
    <div className="collapse">
      <button
        className="collapse-toggle"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-controls="collapse-content"
      >
        {title}
        <span className={`arrow ${isOpen ? "open" : ""}`} />
      </button>

      <div
        id="collapse-content"
        ref={contentRef}
        className="collapse-content"
        aria-hidden={!isOpen}
      >
        <div className="collapse-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Collapse;
