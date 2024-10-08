import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = getToken();
        const response = await axios.get('https://groceries-production.up.railway.app/api/v1/user/index', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const allCustomers = response.data.data.data;
        const userCustomers = allCustomers.filter(customer => customer.role === 'user');
        setCustomers(userCustomers);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`https://groceries-production.up.railway.app/api/v1/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleUpdateCustomer = (id) => {
    navigate(`/update-customer/${id}`);
  };

  const handleAddCustomer = () => {
    navigate('/add-customer');
  };

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.user_name}</TableCell>
                <TableCell>{new Date(customer.created_at).toLocaleString()}</TableCell>
                <TableCell>{new Date(customer.updated_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleUpdateCustomer(customer.id)} style={{ marginRight: '8px' }}>
                    Update
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteCustomer(customer.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customers;