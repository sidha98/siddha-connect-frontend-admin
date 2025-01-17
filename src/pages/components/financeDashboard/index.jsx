import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './style.scss';
import CountUp from 'react-countup';
import DataTable from './dataTable';
import axios from 'axios';
import config from '../../../config';

const { backend_url } = config;

const FinanceDashboard = () => {
  const [creditLimit, setCreditLimit] = useState(0);
  const [utilizedLimit, setUtilizedLimit] = useState(0);
  const [availableLimit, setAvailableLimit] = useState(0);
  const [sessionsData, setSessionsData] = useState([]);

// Fetch Credit Limits and Tally Transactions
const fetchCreditLimitsAndTransactions = async () => {
 try {
   const token = localStorage.getItem('token');
   
   // Fetch credit limits
   const creditLimitResponse = await axios.get(`${backend_url}/fetch-limits-for-mdd`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });

   if (creditLimitResponse.data.success) {
     setCreditLimit(creditLimitResponse.data.data.creditLimit);
     setUtilizedLimit(creditLimitResponse.data.data.utilizedLimit);
     setAvailableLimit(creditLimitResponse.data.data.availableLimit);
   }

   // Fetch tally transactions
   const tallyResponse = await axios.get(
     `${backend_url}/get-tally-transactions-for-dealer`,
     {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }
   );

   // Process tally transactions to group by date
   const groupedData = tallyResponse.data.reduce((acc, transaction) => {
     const date = new Date(transaction.DATE).toISOString().split('T')[0]; // Extract date only
     const amount = parseFloat(transaction.AMOUNT);
     acc[date] = (acc[date] || 0) + amount;
     return acc;
   }, {});

   // Convert to array and sort the dates
   const sortedDates = Object.keys(groupedData).sort();
   const formattedData = sortedDates.map((date) => ({
     date,
     amount: groupedData[date],
   }));

   setSessionsData(formattedData);

 } catch (error) {
   console.error('Error fetching data:', error);
 }
};

// Use `useEffect` to call the combined function
useEffect(() => {
 fetchCreditLimitsAndTransactions();
}, []);

// Calculate daily utilized credit limit as a proportion of total utilized limit
const dailyUtilizedLimit = sessionsData.map((item) => {
 const dailyLimit = (utilizedLimit / sessionsData.length); // Divide utilized limit by number of days
 return dailyLimit;
});

// Prepare data for the line chart
const lineChartData = {
 labels: sessionsData.map((item) => item.date),
 datasets: [
   {
     label: 'Credit Limit Used',
     data: sessionsData.map((item) => item.amount),
     fill: true,
     backgroundColor: 'rgba(38, 198, 218, 0.2)',
     borderColor: 'rgba(38, 198, 218, 1)',
     borderWidth: 2,
   },
   {
     label: 'Utilized Credit Limit',
     data: dailyUtilizedLimit, // Display the daily utilized limit
     fill: true,
     backgroundColor: 'rgba(244, 67, 54, 0.2)', // Red color for utilized limit
     borderColor: 'rgba(244, 67, 54, 1)', // Red color for the utilized limit line
     borderWidth: 2,
   },
 ],
};

// Line chart options
const lineChartOptions = {
 responsive: true,
 plugins: {
   legend: { display: true },
 },
 scales: {
   x: { grid: { display: false } },
   y: { beginAtZero: true },
 },
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

  // Format numbers in Indian currency
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
          <h3>Limit</h3>
          <p>Limit used according to date</p>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="chart-box">
        <h3>Orders</h3>
        <p>Orders in each month</p>
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
