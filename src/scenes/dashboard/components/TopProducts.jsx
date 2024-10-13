import React, { useEffect, useState } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import { getToken } from '../../../utils/auth';

const TopProducts = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const token = getToken();
        const response = await axios.get('https://groceries-production.up.railway.app/api/v1/dashboard/top-product', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.status === 'success') {
          setTopProducts(response.data.data.data);
        }
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <Box mt={4} sx={{ width: '50%' }}>
      <Typography variant="h6" gutterBottom>
        Top Products
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '5%' }}>Image</TableCell>
              <TableCell sx={{ width: '40%' }}>Product</TableCell>
              <TableCell align="right" sx={{ width: '30%' }}>Sales</TableCell>
              <TableCell align="right" sx={{ width: '30%' }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell sx={{ width: '5%' }}>
                  <img src={product.image} alt={product.name} width="50" />
                </TableCell>
                <TableCell sx={{ width: '40%' }}>{product.name}</TableCell>
                <TableCell align="right" sx={{ width: '30%' }}>{product.total_quantity}</TableCell>
                <TableCell align="right" sx={{ width: '30%' }}>{product.price} VND</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopProducts;