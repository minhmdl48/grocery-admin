import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken} from '../../utils/auth';
import { TextField } from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = getToken();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('token:', token);
        const response = await axios.get('https://backendgrocery-production.up.railway.app/api/v1/product/index', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            keyword,
          }
        });
        console.log('Response:', response);
        setProducts(response.data.data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [token, page, keyword]);

  const handleAddProduct = () => {
    navigate('/products/add');
  };

  const handleEditProduct = async (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleDeleteProduct = async (id) => {
    await axios.get(`https://backendgrocery-production.up.railway.app/api/v1/product/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Box m={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" color="primary" startIcon={<AddOutlinedIcon />} onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Page"
          type="number"
          value={page}
          onChange={handlePageChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Search"
          value={keyword}
          onChange={handleKeywordChange}
          variant="outlined"
          size="small"
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell><img src={product.image} alt={product.name} width="50" /></TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.weight}</TableCell>
                <TableCell>{product.price} VND</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditProduct(product.id)}><EditOutlinedIcon /></Button>
                  <Button onClick={() => handleDeleteProduct(product.id)}><DeleteOutlinedIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Products;