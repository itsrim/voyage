import React from 'react';

export const renderContent = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const clean = content.replace(/\\n/g, '\n'); // ← ici

  return clean.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      if (/\.(jpeg|jpg|gif|png|webp)$/i.test(part)) {
        return (
          <div key={index} className="mb-2">
            <img src={part} alt="img" style={{ maxWidth: '100%' }} />
          </div>
        );
      }
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
    return part.split('\n').map((line, i) => (
      <React.Fragment key={`${index}-${i}`}>
        {line}<br />
      </React.Fragment>
    ));
  });
};
