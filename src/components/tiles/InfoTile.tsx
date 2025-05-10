import { renderContent } from '../../utils/renderContent';
import { Tile } from '../shared/Tile';

export const InfoTile = () => (
  <Tile 
    title="INFORMATIONS PRATIQUES" 
    image="/voyage/trip-info.jpg"
  >
    <div>
      <h3>Practical Information</h3>
      <ul>
        {['Emergency Numbers', 'Local Customs', 'Currency Information'].map((item, index) => (
          <li key={index}>{renderContent(item)}</li>
        ))}
      </ul>
    </div>
  </Tile>
);