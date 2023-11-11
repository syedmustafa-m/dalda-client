import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      chartInstance.data.labels = ['Total', 'Approved', 'Work', 'Rejected', 'Implemented'];
      chartInstance.data.datasets[0].data = [
        data.CountTotal,
        data.ApprovedTotal,
        data.WorkTotal,
        data.RejectedTotal,
        data.ImplementedTotal,
      ];
      chartInstance.update();
    }
  }, [data]);

  const chartData = {
    labels: ['Total', 'Approved', 'Work', 'Rejected', 'Implemented'],
    datasets: [
      {
        label: 'Idea Status Count',
        data: [
          data.CountTotal,
          data.ApprovedTotal,
          data.WorkTotal,
          data.RejectedTotal,
          data.ImplementedTotal,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  return <Bar ref={chartRef} data={chartData} options={chartOptions} />;
};

export default BarChart;
