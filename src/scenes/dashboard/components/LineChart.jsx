import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart() {
 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: 'Orders Over Time',
        size: 20,
        align : 'start',
      }
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Monthly Orders',
        data: labels.map(() => { return Math.random() * 100 + 500 }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  };

  return (
    <Card title={"Orders Over Time"}>
      <Line data={data} options={options} />
    </Card>
  )
}

export default LineChart;