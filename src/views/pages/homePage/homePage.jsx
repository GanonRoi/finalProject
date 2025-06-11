import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import isSameDay from 'date-fns/isSameDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { db, auth } from '../../../firebase/firbase';
import { collection, getDocs, deleteDoc, doc, addDoc, query, where } from 'firebase/firestore';

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

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const eventsSnapshot = await getDocs(collection(db, 'users', user.uid, 'events'));
        const eventsFromDB = eventsSnapshot.docs.map(docSnap => {
          const data = docSnap.data();
          const eventDate = new Date(data.dueDate);
          return {
            id: docSnap.id,
            title: data.title,
            start: eventDate,
            end: eventDate,
            allDay: true,
          };
        });

        const remindersSnapshot = await getDocs(collection(db, 'users', user.uid, 'reminders'));
        const remindersFromDB = remindersSnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          text: docSnap.data().text,
        }));

        setUserEvents(eventsFromDB);
        setReminders(remindersFromDB);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await deleteDoc(doc(db, 'users', user.uid, 'events', eventId));
      setUserEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const handleAddReminder = async () => {
    const user = auth.currentUser;
    if (!user || !newReminder.trim()) return;
    try {
      const docRef = await addDoc(collection(db, 'users', user.uid, 'reminders'), { text: newReminder });
      setReminders(prev => [...prev, { id: docRef.id, text: newReminder }]);
      setNewReminder('');
    } catch (err) {
      console.error('Error adding reminder:', err);
    }
  };

  const handleDeleteReminder = async (reminderId) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await deleteDoc(doc(db, 'users', user.uid, 'reminders', reminderId));
      setReminders(prev => prev.filter(rem => rem.id !== reminderId));
    } catch (err) {
      console.error('Error deleting reminder:', err);
    }
  };

  const eventsForSelectedDate = selectedDate
    ? userEvents.filter(event => isSameDay(event.start, selectedDate))
    : [];

  return (
    <>
      <div className={styles.statusBar}>
        <div className={styles.statusCard}>
          <span className={styles.statusText}>Open tasks</span>
          <span className={styles.statusNumber}>4</span>
        </div>
        <div className={styles.statusCard}>
          <span className={styles.statusText}>Submitted tasks</span>
          <span className={styles.statusNumber}>2</span>
        </div>
        <div className={styles.statusCard}>
          <span className={styles.statusText}>friend notification</span>
          <span className={styles.statusNumber}>0</span>
        </div>
      </div>

      <div className={styles.mainDiv}>
        <div className={styles.sideBoxes}>
          <div className={styles.box}>
            <h3>🔔 Important Reminders</h3>
            <ul>
              {reminders.map((reminder) => (
                <li key={reminder.id}>
                  {reminder.text}
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className={styles.deleteBtn}
                    style={{ marginLeft: '10px' }}
                  >❌</button>
                </li>
              ))}
            </ul>
            <div className={styles.reminderForm}>
              <input
                type="text"
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                placeholder="Add reminder"
              />
              <button onClick={handleAddReminder}>Submit</button>
            </div>
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
            events={userEvents}
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
                  <div key={index} className={styles.eventRow}>
                    <span>📌 {event.title}</span>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteEvent(event.id)}
                    >❌</button>
                  </div>
                ))
              ) : (
                <p>No events.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
