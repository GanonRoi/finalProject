import React from 'react';
import GaugeChart from 'react-gauge-chart';

const SemesterGauge = () => {
  return (
    <div>
      <h3>Time left until the semester end</h3>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={20}
        percent={0.25} // 25% זמן נותר
        colors={['#FF8286', '#FFE0E2', '#FFE0E2']}
      />
    </div>
  );
};

export default SemesterGauge;
