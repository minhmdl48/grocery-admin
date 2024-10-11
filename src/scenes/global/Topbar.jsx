import React, { useState, useContext } from 'react';
import { Box, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useTheme } from '@emotion/react';
import { tokens } from "../../theme";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../utils/auth';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.pallette);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const token = getToken();

  const handlePersonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      if (!token) {
        console.error('No token found');
        return;
      }
      await axios.post('https://groceries-production.up.railway.app/api/v1/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* search bar */}
      <Box
        display="flex"
        backgroundColor={colors.primary[100]}
        borderRadius="3px"
      >
        <InputBase
          placeholder="Search"
          sx={{ ml: 2, flex: 1 }}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      {/* right side icons */}
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handlePersonClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;