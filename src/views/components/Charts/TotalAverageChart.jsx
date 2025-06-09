import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import styles from './chart.module.css';

const TotalAverageChart = () => {
  const data = {
    labels: ['JavaScript', 'React', 'Web Development', 'WordPress', 'UX/UI'],
    datasets: [
      {
        label: 'Average',
        data: [28.3, 19.4, 3.7, 15.8, 32.8],
        backgroundColor: ['#251850', '#8F71F0', '#AF9EE9', '#8B7BBF', '#18035D'],
      },
    ],
  };
   const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
  };


  return (
    <div>
      <h3>My Total Average</h3>
      <div className={styles.Doughnut}>
      <Doughnut data={data}options={options} />
      <p>Overall Average: <strong>93.2</strong></p>
      </div>
    </div>
  );
};

export default TotalAverageChart;