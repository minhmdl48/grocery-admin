import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`https://groceries-production.up.railway.app/api/v1/category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategoryData(response.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [id, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://groceries-production.up.railway.app/api/v1/category/update/${id}`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Category updated:', response.data);
      navigate('/categories');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setCategoryData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box m={2}>
      <Typography variant="h4">Update Category</Typography>
      
      <Typography variant="h6">{categoryData.name}</Typography>
      {categoryData.image && (
        <img src={categoryData.image} alt={categoryData.name} style={{ width: '200px', height: 'auto' }} />
      )}
      <TextField
        label="Category Name"
        name="name"
        value={categoryData.name || ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Box {...getRootProps()} border="1px dashed gray" p={2} textAlign="center" mt={2}>
        <input {...getInputProps()} />
        <Typography>Drag & drop an image here, or click to select one</Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleSave} mt={4}>
        Save
      </Button>
    </Box>
  );
};

export default UpdateCategory;