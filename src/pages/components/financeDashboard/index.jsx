import * as React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './style.scss';
import CountUp from 'react-countup';
import DataTable from './dataTable';
import axios from "axios";
import config from "../../../config";
import { useState } from 'react';
import { useEffect } from 'react';
const { backend_url } = config;

const FinanceDashboard = () => {
  const [creditLimit, setCreditLimit] = useState(0);
  const [utilizedLimit, setUtilizedLimit] = useState(0);
  const [availableLimit, setAvailableLimit] = useState(0);


  // api for fetching credit limit available limit and utilised limit
  const fetchCreditLimits = async () => {
   try {
    const token = localStorage.getItem("token");
     
     const { data } = await axios.get(`${backend_url}/fetch-limits-for-mdd`, {
       headers: {
         Authorization: `Bearer ${token}`, 
       },
     });

     if (data.success) {
       setCreditLimit(data.data.creditLimit);
       setUtilizedLimit(data.data.utilizedLimit);
       setAvailableLimit(data.data.availableLimit);
     } else {
       console.error(data.message);
     }
   } catch (error) {
     console.error('Error fetching credit limits:', error);
   }
 };
  useEffect(() => {
   fetchCreditLimits();
 }, []);
  const miniChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  const generateRandomData = (points) =>
    Array.from({ length: points }, () => Math.floor(Math.random() * 100));

  const miniChartDataGreen = {
    labels: Array(30).fill(''),
    datasets: [
      {
        data: generateRandomData(30),
        borderColor: 'rgba(76, 175, 80, 1)', // Green color
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const miniChartDataRed = {
    labels: Array(30).fill(''),
    datasets: [
      {
        data: generateRandomData(30),
        borderColor: 'rgba(244, 67, 54, 1)', // Red color
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const miniChartDataBlue = {
    labels: Array(30).fill(''),
    datasets: [
      {
        data: generateRandomData(30),
        borderColor: 'rgba(33, 150, 243, 1)', // Blue color
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Data for the large charts
  const lineChartData = {
    labels: Array.from({ length: 30 }, (_, i) => `Apr ${i + 1}`),
    datasets: [
      {
        label: 'Sessions',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 25000)),
        fill: true,
        backgroundColor: 'rgba(38, 198, 218, 0.2)',
        borderColor: 'rgba(38, 198, 218, 1)',
        borderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Page Views',
        data: [5000, 7000, 8000, 12000, 15000, 10000, 8000],
        backgroundColor: 'rgba(38, 198, 218, 0.6)',
      },
      {
        label: 'Downloads',
        data: [3000, 5000, 6000, 9000, 12000, 8000, 6000],
        backgroundColor: 'rgba(38, 150, 218, 0.6)',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };
// Function to format numbers in Indian currency style
const formatIndianCurrency = (num) => {
 return new Intl.NumberFormat('en-IN').format(num);
};
  return (
   <div className="dashboard">
    {/* Cards */}
    <div className="dashboard_all_box">
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h3>Total Credit Limit</h3>
        </div>
        <h1>
          ₹
          <CountUp 
            end={creditLimit} 
            duration={2} 
            formattingFn={formatIndianCurrency} 
          />
        </h1>
        <div className="mini-chart">
          <Line data={miniChartDataGreen} options={miniChartOptions} />
        </div>
      </div>
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h3>Used Credit Limit</h3>
        </div>
        <h1>
          ₹
          <CountUp 
            end={utilizedLimit} 
            duration={2} 
            formattingFn={formatIndianCurrency} 
          />
        </h1>
        <div className="mini-chart">
          <Line data={miniChartDataRed} options={miniChartOptions} />
        </div>
      </div>
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h3>Available Credit Limit</h3>
        </div>
        <h1>
          ₹
          <CountUp 
            end={availableLimit} 
            duration={2} 
            formattingFn={formatIndianCurrency} 
          />
        </h1>
        <div className="mini-chart">
          <Line data={miniChartDataBlue} options={miniChartOptions} />
        </div>
      </div>
    </div>

    {/* Graphs */}
    <div className="dashboard-charts">
      <div className="chart-box">
        <h3>Sessions</h3>
        <p>Sessions per day for the last 30 days</p>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
      <div className="chart-box">
        <h3>Page views and downloads</h3>
        <p>Page views and downloads for the last 6 months</p>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
    {/* Table */}
    <div className="table">
      <DataTable />
    </div>
  </div>
  );
};

export default FinanceDashboard;
