import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  BarElement,
  Legend,
  Tooltip,
  CategoryScale,
} from "chart.js";

const ColumnChart = ({ jobsCount, cvsCount, companiesCount, usersCount }) => {
  ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    BarController,
    BarElement,
    Title,
    Legend,
    Tooltip,
    CategoryScale
  );
  const initialChartData = {
    labels: [],
    datasets: [], // Initially no datasets
  };

  const [chartData, setChartData] = useState(initialChartData);

  console.log(jobsCount, cvsCount, usersCount, companiesCount);
  useEffect(() => {
    setChartData({
      labels: ["Công việc", "CV", "Công ty", "Người dùng"],
      datasets: [
        {
          label: "Số lượng",
          data: [jobsCount, cvsCount, companiesCount, usersCount],

          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [jobsCount, cvsCount, companiesCount, usersCount]);
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
      title: {
        display: true,
        text: "Thống kê số liệu",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {chartData && chartData.datasets.length > 0 && (
        <Bar data={chartData} options={options} />
      )}
    </>
  );
};

export default ColumnChart;
