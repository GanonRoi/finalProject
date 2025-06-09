import React, { useState } from 'react';
import styles from './Home.module.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import isSameDay from 'date-fns/isSameDay';
import enUS from 'date-fns/locale/en-US';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
  defaultLocale: 'en-US',
});

const events = [
  {
    title: 'JavaScript task due',
    start: new Date(2025, 5, 9), // יוני = חודש 5
    end: new Date(2025, 5, 9),
    allDay: true,
  },
  {
    title: 'UX Review',
    start: new Date(2025, 5, 9),
    end: new Date(2025, 5, 9),
    allDay: true,
  },
];

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
  };

  const eventsForSelectedDate = selectedDate
    ? events.filter(event => isSameDay(event.start, selectedDate))
    : [];

  return (
    <div className={styles.mainDiv}>
      <div className={styles.sideBoxes}>
        <div className={styles.box}>
          <h3>🔔 Important Reminders</h3>
          <p>Don't forget to submit your JavaScript assignment!</p>
        </div>
        <div className={styles.box}>
          <h3>📌 Open Tasks</h3>
          <p>React project, UX/UI design, Database work.</p>
        </div>
        <div className={styles.box}>
          <h3>💡 Tip of the Day</h3>
          <p>Use `useEffect` wisely to avoid re-renders.</p>
        </div>
      </div>
      <div className={styles.calendarBox}>
        <h2>Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: 500 }}
        />
        {selectedDate && (
          <div className={styles.eventInfoBox}>
            <h4>Events on {format(selectedDate, 'MMMM d, yyyy')}:</h4>
            {eventsForSelectedDate.length > 0 ? (
              eventsForSelectedDate.map((event, index) => (
                <p key={index}>📌 {event.title}</p>
              ))
            ) : (
              <p>No events.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
