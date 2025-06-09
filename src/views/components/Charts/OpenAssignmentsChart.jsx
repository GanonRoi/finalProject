import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale);
import styles from './chart.module.css';

const OpenAssignmentsChart = () => {
  const data = {
    labels: ['JavaScript', 'React', 'UX/UI', 'WordPress'],
    datasets: [
      {
        label: 'Open Assignments',
        data: [50, 84, 29, 67],
        backgroundColor: '#74b9ff',
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        max: 100,
        ticks: { callback: value => `${value}%` },
      },
    },
  };

  return (
    <div>
      <h3>Open Assignments</h3>
      <div className={styles.OpenAssignmentsChart}>
      <Bar data={data} options={options}/>
      </div>
    </div>
  );
};

export default OpenAssignmentsChart;
