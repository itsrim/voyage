import { renderContent } from '../../utils/renderContent';
import { Tile } from '../shared/Tile';

export const ContactTile = () => (
  <Tile 
    title="CONTACTS" 
    image="/voyage/trip-contacts.jpg"
  >
    <div>
      <h3>Important Contacts</h3>
      <ul>
        {['Hotel Contact', 'Emergency Numbers', 'Tour Guides'].map((item, index) => (
          <li key={index}>{renderContent(item)}</li>
        ))}
      </ul>
    </div>
  </Tile>
);