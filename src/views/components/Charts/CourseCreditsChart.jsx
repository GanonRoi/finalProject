import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale);

const CourseCreditsChart = () => {
  const data = {
    labels: ['JavaScript', 'React', 'Web Development', 'WordPress', 'UX/UI'],
    datasets: [
      {
        label: 'Credit Points',
        data: [3, 1, 3, 2, 4],
        backgroundColor: '#f8a5c2',
      },
    ],
  };

  return (
    <div>
      <h3>Course Credits Points</h3>
      <Bar data={data} options={{ indexAxis: 'x' }} />
    </div>
  );
};

export default CourseCreditsChart;
