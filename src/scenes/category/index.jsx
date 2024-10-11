import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Grid2 from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../utils/auth';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const token = getToken();

  const fetchCategories = async () => {
    try {
      if (!token) {
        console.error('No token found');
        return;
      }
      console.log('token:', token);
      const response = await axios.get('https://groceries-production.up.railway.app/api/v1/category/index', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          keyword,
        },
      });
      console.log('Response:', response);
      const data = response.data.data.data;
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Unexpected response format:', data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token, page, keyword]);

  const handleAddCategory = () => {
    navigate('/categories/add');
  };

  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleUpdateCategory = async (id, updatedData) => {
    navigate(`/update-category/${id}`);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.get(`https://groceries-production.up.railway.app/api/v1/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Category deleted:', response.data);

      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCategoryClick = (id) => {
    navigate(`/categories/${id}`);
  };

  return (
    <Box m={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Categories</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Page"
          type="number"
          value={page}
          onChange={handlePageChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Keyword"
          value={keyword}
          onChange={handleKeywordChange}
          variant="outlined"
          size="small"
        />
      </Box>
      <Grid2 container spacing={2}>
        {categories.map((category) => (
          <Grid2 item xs={12} sm={6} md={4} key={category.id}>
            <Card onClick={() => handleCategoryClick(category.id)}>
              <CardMedia
                component="img"
                height="150"
                image={category.image}
                alt={category.name}
              />
              <CardContent>
                <Typography variant="h6">{category.name}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateCategory(category.id, { name: 'Updated Name', image: 'Updated Image URL' });
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(category.id);
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Categories;