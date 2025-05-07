import React, { useState, useEffect } from 'react';
import { Tile } from '../shared/Tile';
import { readTripData } from '../../utils/readTripData';

const DestinationContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cities');
  const [destination, setDestination] = useState({
    cities: [] as string[],
    hotel: '',
    weather: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await readTripData();
        const destinationData = data.filter((item: any) => item.Category === 'Destination');
        
        setDestination({
          cities: destinationData
            .filter((item: any) => item.Subcategory === 'Cities')
            .map((item: any) => item.Item), // Should probably use Details instead of Item
          hotel: destinationData.find((item: any) => item.Subcategory === 'Hotel')?.Item || '', // Should use Details
          weather: destinationData.find((item: any) => item.Subcategory === 'Weather')?.Item || '' // Should use Details
        });
      } catch (error) {
        console.error('Error loading destination data:', error);
      }
    };
    loadData();
  }, []);

  const renderContent = (content: string) => {
    // Check if content contains a URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (urlRegex.test(content)) {
      return content.split(urlRegex).map((part, index) => {
        if (urlRegex.test(part)) {
          return (
            <a 
              key={index} 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer"
              className="has-text-info"
            >
              {part}
            </a>
          );
        }
        return part;
      });
    }
    return content;
  };

  return (
    <div className="content">
      <div className="tabs is-boxed">
        <ul>
          <li className={activeTab === 'cities' ? 'is-active' : ''}>
            <a onClick={() => setActiveTab('cities')}>
              <span>Cities</span>
            </a>
          </li>
          <li className={activeTab === 'hotel' ? 'is-active' : ''}>
            <a onClick={() => setActiveTab('hotel')}>
              <span>Hotel</span>
            </a>
          </li>
          <li className={activeTab === 'weather' ? 'is-active' : ''}>
            <a onClick={() => setActiveTab('weather')}>
              <span>Weather</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="box has-background-dark has-text-white" style={{ minHeight: '300px' }}>
        {activeTab === 'cities' && (
          <div className="cities-content">
            {destination.cities.map((city, index) => (
              <div key={index} className="mb-4">{renderContent(city)}</div>
            ))}
          </div>
        )}
        {activeTab === 'hotel' && (
          <div className="hotel-content">
            <div className="mb-4">{renderContent(destination.hotel)}</div>
          </div>
        )}
        {activeTab === 'weather' && (
          <div className="weather-content">
            <div className="mb-4">{renderContent(destination.weather)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const DestinationTile = () => (
  <Tile 
    title="DESTINATION" 
    image="/trip-destination.jpg"
  >
    <DestinationContent />
  </Tile>
);