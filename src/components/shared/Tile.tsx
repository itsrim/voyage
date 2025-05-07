import React, { useState, useRef, useEffect } from 'react';

interface TileProps {
  title: string;
  image: string;
  children: React.ReactNode;
}

export const Tile: React.FC<TileProps> = ({ title, image, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
      }
    };

    // Update height when content changes
    updateHeight();

    // Add resize observer to handle dynamic content changes
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(contentRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [children, isOpen]); // Add isOpen to dependencies

  const handleClick = (e: React.MouseEvent) => {
    if (!contentRef.current?.contains(e.target as Node)) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div 
      className="tile-container" 
      onClick={handleClick}
      style={{ 
        cursor: 'pointer',
        marginBottom: '0'
      }}
    >
      <div className="tile-header" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '150px',
        position: 'relative',
        borderRadius: '0',
        overflow: 'hidden'
      }}>
        <div className="tile-title" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {title}
        </div>
      </div>
      
      <div 
        ref={contentRef}
        className="tile-content"
        style={{
          height: isOpen ? `${contentHeight}px` : '0',
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out',
          background: '#0a0a0a', // Dark background
          padding: isOpen ? '16px' : '0 16px',
          marginTop: '0',
          color: 'white', // White text
          borderRadius: '0'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};