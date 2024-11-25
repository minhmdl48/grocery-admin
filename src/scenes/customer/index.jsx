import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { getToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const token = getToken();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://backendgrocery-production.up.railway.app/api/v1/user/index",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page,
              keyword,
            },
          }
        );
        const allCustomers = response.data.data.data;
        const userCustomers = allCustomers.filter(
          (customer) => customer.role === "user"
        );
        setCustomers(userCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [page, keyword, token]);

  const handleChat = (customerId) => {
    navigate(`/chat/${customerId}`);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.get(
        `https://backendgrocery-production.up.railway.app/api/v1/user/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== id)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <Box mb={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/create-user")}
        >
          Add Customer
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.user_name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ChatIcon />}
                    onClick={() => handleChat(customer.id)}
                  >
                    Chat
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => navigate(`/user/edit/${customer.id}`)}
                    style={{ marginLeft: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteOutlinedIcon />}
                    onClick={() => handleDeleteCustomer(customer.id)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customers;
