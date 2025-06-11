import styles from './MyAssignments.module.css';
import React, { useEffect, useState } from 'react';
import {auth, db } from '../../../firebase/firbase'; // ודא שזה הנתיב הנכון
import { collection, getDocs } from 'firebase/firestore';

import TotalAverageChart from '/src/views/components/Charts/TotalAverageChart';
import CourseCreditsChart from '/src/views/components/Charts/CourseCreditsChart';
import OpenAssignmentsChart from '/src/views/components/Charts/OpenAssignmentsChart';
import SemesterGauge from '/src/views/components/Charts/SemesterGauge';

function MyAssignments() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const remindersRef = collection(db, 'users', user.uid, 'reminders');
        const snapshot = await getDocs(remindersRef);
        const data = snapshot.docs.map(doc => doc.data());
        setReminders(data);
      } catch (error) {
        console.error("שגיאה בשליפת התזכורות:", error);
      }
    };

    fetchReminders();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.parent}>
        <div className={styles.div1}>
          <TotalAverageChart />
        </div>
        <div className={styles.div2}>
          <CourseCreditsChart />
        </div>
        <div className={styles.div3}>
          <SemesterGauge />
        </div>
        <div className={styles.div5}>
          <OpenAssignmentsChart />
        </div>

        <div className={styles.div4}>
          <h3>🔔 Important reminders</h3>
          {reminders.length === 0 ? (
            <p>There are no reminders yet.</p>
          ) : (
            <ul>
              {reminders.map((reminder, index) => (
                <li key={index}>{reminder.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAssignments;
