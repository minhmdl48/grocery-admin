import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const initialOrders = [
  { id: 1, date: '2023-01-01', customer: 'Minh ', paymentStatus: 'Paid', orderStatus: 'Shipped', total: '100,000VND' },
  { id: 2, date: '2023-01-02', customer: 'Ngoc', paymentStatus: 'Pending', orderStatus: 'Processing', total: '200,000VND' },
  { id: 3, date: '2023-01-03', customer: 'Nguyen', paymentStatus: 'Paid', orderStatus: 'Delivered', total: '400,000VND' },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);

  return (
    <Box m={2}>
      <Typography variant="h4" mb={2}>Orders</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;