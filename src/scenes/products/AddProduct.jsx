import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    quantity: '',
    weight: '',
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = getToken();
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await axios.get('https://backendgrocery-production.up.railway.app/api/v1/category/index', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProduct({
      ...product,
      image: file,
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      console.error('No token found');
      return;
    }

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category_id', product.category_id);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('weight', product.weight);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      const response = await axios.post('https://backendgrocery-production.up.railway.app/api/v1/product/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product added:', response.data);
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      if (error.response) {
        console.error('Server response:', error.response.data); // Log server response
      }
      setError('Failed to add product');
    }
  };

  return (
    <Box m={2}>
      <Typography variant="h4" mb={2}>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Weight"
          name="weight"
          value={product.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
          <input {...getInputProps()} />
          {product.image ? (
            <img src={URL.createObjectURL(product.image)} alt="Product" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          ) : (
            <p>Drag 'n' drop an image here, or click to select one</p>
          )}
        </div>
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;