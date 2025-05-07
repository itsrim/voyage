import { Tile } from '../shared/Tile';

const renderContent = (content: string) => {
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