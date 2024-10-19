import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await axios.post(
        "https://zippy-enchantment-production.up.railway.app/api/v1/user/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        setResponseMessage("User created successfully!");
        navigate("/customers");
      } else {
        setResponseMessage("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setResponseMessage("An error occurred while creating the user.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User Name"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create User
        </Button>
      </form>
      {responseMessage && (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          {responseMessage}
        </Typography>
      )}
    </Box>
  );
};

export default CreateUser;
