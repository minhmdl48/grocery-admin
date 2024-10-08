import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const recentTransactions = [
    { id: 1, name: "Minh", date: "2024-09-01", amount: "500,000VND", status: "Completed" },
    { id: 2, name: "Minh 2", date: "2024-09-03", amount: "1,000,000VND", status: "Pending" },
    { id: 3, name: "Nguyen", date: "2024-09-04", amount: "750,000VND", status: "Failed" },
  ];
  
  const RecentTransactions = () => {
    return (
      <Box mt={4} sx={{width: '50%'}} >
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{width: '10%'}}>Name</TableCell>
                <TableCell sx={{width: '10%'}}>Date</TableCell>
                <TableCell align="right" sx={{width: '5%'}}>Amount</TableCell>
                <TableCell sx={{width: '20%'}}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell sx={{width: '10%'}}>{transaction.name}</TableCell>
                  <TableCell sx={{width: '10%'}}>{transaction.date}</TableCell>
                  <TableCell align="right" sx={{width: '5%'}}>{transaction.amount}</TableCell>
                  <TableCell sx={{width: '10%'}}>{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default RecentTransactions;