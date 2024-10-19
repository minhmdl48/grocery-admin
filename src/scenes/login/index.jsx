import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    const PUBLIC_ROUTES = ["login", "forgot-password", "register", "documentation"];
    const isPublicPage = PUBLIC_ROUTES.some(route => window.location.href.includes(route));

    if (!TOKEN && !isPublicPage) {
      console.log("🚀 ~ useEffect ~ isPublicPage:", isPublicPage)
      return;
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

      axios.interceptors.request.use(function (config) {
        // Show global loading indicator
        document.body.classList.add('loading-indicator');
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

      axios.interceptors.response.use(function (response) {
        // Hide global loading indicator
        document.body.classList.remove('loading-indicator');
        return response;
      }, function (error) {
        document.body.classList.remove('loading-indicator');
        return Promise.reject(error);
      });

    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://zippy-enchantment-production.up.railway.app/api/v1/auth/login", {
        email,
        password,
      });
      if (response && response.data) {
        const { access_token } = response.data;
        localStorage.setItem("token", access_token);
        navigate("/dashboard");
      } else {
        setError("Unexpected response structure");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during login");
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" ms={4} mb={2}>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'gray',
                },
                '&:hover fieldset': {
                  borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'gray',
                },
                '&:hover fieldset': {
                  borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
            }}
          />
          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}
          <Box display="flex" justifyContent="center" mt={3}>
            <Button type="submit" variant="contained" color="secondary">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;