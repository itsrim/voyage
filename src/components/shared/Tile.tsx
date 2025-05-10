import React, { useState } from 'react';

interface TileProps {
  title: string;
  image: string;
  children: React.ReactNode;
}

export const Tile: React.FC<TileProps> = ({ title, image, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div 
      className="tile-container"
      style={{ cursor: 'pointer', marginBottom: '0' }}
    >
      <div
        className="tile-header"
        onClick={handleClick}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '150px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="tile-title"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
          }}
        >
          {title}
        </div>
      </div>

      {isOpen && (
        <div
          className="tile-content"
          style={{
            background: '#0a0a0a',
            color: 'white',
            padding: '16px'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
};
