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
} from "@mui/material";
import { getToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

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
          "https://groceries-production.up.railway.app/api/v1/user/index",
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
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomers();
  }, [token, page, keyword]);

  const handleDeleteCustomer = async (id) => {
    try {
      const token = getToken();
      await axios.get(
        `https://groceries-production.up.railway.app/api/v1/user/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleUpdateCustomer = (id) => {
    navigate(`/user/edit/${id}`);
  };

  const handleAddCustomer = () => {
    navigate("/create-user");
  };

  return (
    <Box m={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Customer</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCustomer}
        >
          Add Customer
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
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.user_name}</TableCell>
                <TableCell>
                  {new Date(customer.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(customer.updated_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateCustomer(customer.id)}
                    style={{ marginRight: "8px" }}
                    startIcon={<EditOutlinedIcon />}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteCustomer(customer.id)}
                    startIcon={<DeleteOutlinedIcon />}
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
