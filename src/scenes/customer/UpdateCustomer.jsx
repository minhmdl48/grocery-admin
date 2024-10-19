import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { getToken } from '../../utils/auth';

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    user_name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`https://zippy-enchantment-production.up.railway.app/api/v1/user/edit/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchCustomerData();
  }, [id, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`https://zippy-enchantment-production.up.railway.app/api/v1/user/update/${id}`, customerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Customer updated:', response.data);
      navigate('/customers');
    } catch (error) {
      console.error('Error updating customer:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleCancel = () => {
    navigate('/customers');
  };

  return (
    <Box m={2}>
      <Typography variant="h4">Edit User Profile</Typography>
      
      {error && <Alert severity="error">{error}</Alert>}
      
      <TextField
        label="User Name"
        name="user_name"
        value={customerData.user_name || ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={customerData.email || ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={customerData.password || ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        name="phone"
        value={customerData.phone || ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Box mt={4} display="flex" justifyContent="flex-start">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginRight: '8px' }}
          startIcon={<EditOutlinedIcon />}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          startIcon={<DeleteOutlinedIcon />}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateCustomer;