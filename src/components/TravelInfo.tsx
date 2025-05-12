import React, { useState, useEffect } from 'react';
import { readTripData } from '../utils/readTripData';
import { DestinationTile } from './tiles/DestinationTile';
import { TransportTile } from './tiles/TransportTile';
import { AgendaTile } from './tiles/AgendaTile';
import { InfoTile } from './tiles/InfoTile';
import { ContactTile } from './tiles/ContactTile';

export const TravelInfo: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState('/voyage/trip-background.jpg');

  useEffect(() => {
    const loadBackgroundImage = async () => {
      try {
        const data = await readTripData();
        const backgroundEntry = data.find((item: any) => 
          item.Category === 'trip-background'
        );
        
        // Vérifie si une URL est fournie dans la colonne Subcategory
        if (backgroundEntry?.Subcategory && backgroundEntry.Subcategory.trim() !== '') {
          setBackgroundImage(backgroundEntry.Subcategory.trim());
        }
        // Si aucune URL n'est trouvée, l'image par défaut reste '/trip-background.jpg'
      } catch (error) {
        console.error('Error loading background image:', error);
        // En cas d'erreur, l'image par défaut reste '/trip-background.jpg'
      }
    };

    loadBackgroundImage();
  }, []);

  return (
    <div 
      className="background-container"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <div className="travel-container" style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '16px'
      }}>
        <header style={{
          padding: '20px 0',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Portugal</h1>
          <p>13-21 Juillet 2025</p>
        </header>

        <div className="tiles-grid" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0'
        }}>
          <DestinationTile />
          <TransportTile />
          <AgendaTile />
          <InfoTile />
          <ContactTile />
        </div>
      </div>
    </div>
  );
};
