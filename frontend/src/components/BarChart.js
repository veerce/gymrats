import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const DailyCapacityTrends = ({ chartData }) => {

    const options = {
        plugins: {
          legend: {
            display: false, 
          },
        },
        scales: {
          x: { 
            grid: {
              display: false, 
            },
          },
          y: { 
            beginAtZero: true, 
          },
        },
        maintainAspectRatio: false
      };
    return (

    
    <div style={{ position: 'relative', height: '30vh', width: '80vw' }}>
        <h2 style={{color: 'white'}}>Daily Capacity Trends</h2>
        <Bar data={chartData} options={options} />
    </div>
    );
};
    
export default DailyCapacityTrends;