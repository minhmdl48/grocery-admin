import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../utils/auth';

const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const token = getToken();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await axios.get(`https://zippy-enchantment-production.up.railway.app/api/v1/product/product-by-category/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Unexpected response format:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [categoryId, token]);

  return (
    <Box m={2}>
      <Typography variant="h4" mb={2}>
        Products
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price} VND</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductsByCategory;