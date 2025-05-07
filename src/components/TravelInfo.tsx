import React from 'react';
import { DestinationTile } from './tiles/DestinationTile';
import { TransportTile } from './tiles/TransportTile';
import { AgendaTile } from './tiles/AgendaTile';
import { InfoTile } from './tiles/InfoTile';
import { ContactTile } from './tiles/ContactTile';

export const TravelInfo: React.FC = () => {
  return (
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
  );
};