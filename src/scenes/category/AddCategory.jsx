import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { getToken } from '../../utils/auth'; // Adjust the import path as necessary

const AddCategory = () => {
  const [category, setCategory] = useState({ name: '', image: null });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = getToken();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = category.name ? "" : "This field is required.";
    tempErrors.image = category.image ? "" : "This field is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('name', category.name);
      formData.append('image', category.image);

      try {
        const response = await axios.post('https://groceries-production.up.railway.app/api/v1/category/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Category added:", response.data);
        navigate("/categories");
      } catch (error) {
        console.error('Error adding category:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      }
    }
  };

  const onDrop = (acceptedFiles) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      image: acceptedFiles[0],
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Box m={2}>
      <Typography variant="h4" mb={2}>
        Add Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          name="name"
          value={category.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <Box {...getRootProps()} border="1px dashed grey" p={2} textAlign="center" mb={2}>
          <input {...getInputProps()} />
          {category.image ? (
            <Typography>{category.image.name}</Typography>
          ) : (
            <Typography>Drag 'n' drop an image here, or click to select one</Typography>
          )}
        </Box>
        {errors.image && <Typography color="error">{errors.image}</Typography>}
        <Button variant="contained" color="primary" type="submit">
          Add Category
        </Button>
      </form>
    </Box>
  );
};

export default AddCategory;