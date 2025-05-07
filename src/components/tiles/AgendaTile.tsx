import React, { useState, useRef, useEffect } from 'react';
import { Tile } from '../shared/Tile';
import { readTripData } from '../../utils/readTripData';

interface DayScheduleProps {
  date: string;
  dayNumber: string;
  month: string;
  isToday: boolean;
  activities: Array<{ time: string; activity: string }>;
  onHeightChange: (height: number) => void;
  renderContent: (content: string) => React.ReactNode;
}

const DaySchedule: React.FC<DayScheduleProps> = ({ 
  date, 
  dayNumber, 
  month, 
  isToday, 
  activities, 
  onHeightChange,
  renderContent 
}) => {
  const [isOpen, setIsOpen] = useState(isToday);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const newHeight = contentRef.current.scrollHeight;
      setContentHeight(newHeight);
      onHeightChange(isOpen ? newHeight : 0);
    }
  }, [isOpen, onHeightChange]);

  return (
    <div className="day-schedule has-background-dark has-text-white mb-2">
      <div 
        className="day-header p-4" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <h3 className="has-text-white mb-0">{date} {dayNumber} {month}</h3>
      </div>
      <div 
        ref={contentRef}
        className="schedule-content"
        style={{
          height: isOpen ? `${contentHeight}px` : '0',
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out'
        }}
      >
        <div className="schedule-grid p-4">
          {activities.map((activity, index) => (
            <div key={index} className="columns is-mobile mb-2">
              <div className="column is-one-third has-background-danger-dark p-2">{activity.time}</div>
              <div className="column has-text-left p-2">{renderContent(activity.activity)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AgendaContent: React.FC = () => {
  const [_totalHeight, setTotalHeight] = useState(0);
  const heightsMap = useRef<{ [key: number]: number }>({});
  const [schedule, setSchedule] = useState<Array<{
    date: string;
    dayNumber: string;
    month: string;
    activities: Array<{ time: string; activity: string }>;
  }>>([]);

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

  useEffect(() => {
    const loadTripData = async () => {
      try {
        const data = await readTripData();
        
        // Filter agenda items and transform them
        const agendaItems = data.filter((item: any) => item.Category === 'Agenda');
        
        // Group activities by date
        const groupedActivities = agendaItems.reduce((acc: any, item: any) => {
          const [dayName, dayNumber, month] = item.Subcategory.split(' ');
          
          const existingDay = acc.find((d: any) => 
            d.date === dayName && 
            d.dayNumber === dayNumber && 
            d.month === month
          );

          if (existingDay) {
            existingDay.activities.push({
              time: item.Item,
              activity: item.Details
            });
          } else {
            acc.push({
              date: dayName,
              dayNumber: dayNumber,
              month: month,
              activities: [{
                time: item.Item,
                activity: item.Details
              }]
            });
          }
          
          return acc;
        }, []);

        console.log('Transformed agenda data:', groupedActivities);
        setSchedule(groupedActivities);
      } catch (error) {
        console.error('Error loading agenda data:', error);
      }
    };
    loadTripData();
  }, []);

  const handleDayHeightChange = (index: number, height: number) => {
    heightsMap.current[index] = height;
    const newTotalHeight = Object.values(heightsMap.current).reduce((sum, h) => sum + h, 0);
    setTotalHeight(newTotalHeight);
  };

  return (
    <div style={{ height: 'auto' }}>
      {schedule.map((day, index) => (
        <DaySchedule
          key={index}
          date={day.date}
          dayNumber={day.dayNumber}
          month={day.month}
          activities={day.activities}
          onHeightChange={(height) => handleDayHeightChange(index, height)}
          renderContent={renderContent} isToday={false}        />
      ))}
    </div>
  );
};

export const AgendaTile = () => (
  <Tile 
    title="AGENDA" 
    image="/trip-calendar.jpg"
  >
    <AgendaContent />
  </Tile>
);