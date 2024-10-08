import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import LineChart from './components/LineChart';
import TopProducts from './components/TopProducts'; // Import TopProducts component
import RecentTransactions from './components/RecentTransactions'; // Import RecentTransactions component
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/auth'; // Adjust the import path as necessary

const Dashboard = () => {
  const [statsData, setStatsData] = useState([]);
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    // Fetch stats data or other initialization logic here
  }, [token]);

  return (
    <Box m={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" />
      </Box>
      <Box display="flex" justifyContent="start" mt={4}>
        {statsData.map((stat, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
            m={2}
          >
            <Typography variant="h6">{stat.title}</Typography>
            <Typography variant="body1">{stat.value}</Typography>
          </Box>
        ))}
      </Box>
      <Box mt={4}>
        <LineChart />
      </Box>
      <Box justifyContent="space-between" mt={4}>
        <Box mr={4} mt={2} >
          <TopProducts />
        </Box>
        <Box mr={4} mt={2}>
          <RecentTransactions />
        </Box>
      </Box>
    </Box>
);
}

export default Dashboard;