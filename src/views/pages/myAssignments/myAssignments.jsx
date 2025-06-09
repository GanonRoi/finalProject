import styles from './MyAssignments.module.css';
import React from 'react';
import TotalAverageChart from '/src/views/components/Charts/TotalAverageChart';
import CourseCreditsChart from '/src/views/components/Charts/CourseCreditsChart';
import OpenAssignmentsChart from '/src/views/components/Charts/OpenAssignmentsChart';
import SemesterGauge from '/src/views/components/Charts/SemesterGauge';

 
function MyAssignments() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.parent}>
      <div className={styles.div1}>
        <TotalAverageChart  />
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
        <h3> Important reminders</h3>
      </div>
      </div>
    </div>
  );
}

export default MyAssignments;
