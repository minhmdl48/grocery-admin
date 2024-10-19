import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { getToken } from "../../utils/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async (page) => {
      const token = getToken();
      try {
        const response = await axios.get(
          `https://zippy-enchantment-production.up.railway.app/api/v1/user/order-history-cms?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedOrders = response.data.data.data.map((order) => ({
          id: order.id,
          date: new Date(order.created_at).toLocaleDateString(),
          customer: order.user_id, // Assuming user_id is the customer identifier
          paymentStatus: order.payment_status,
          orderStatus: order.order_status,
          total: `${order.total_amount} VND`,
        }));
        setOrders(fetchedOrders);
        setTotalPages(response.data.data.total_pages);
      } catch (error) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(currentPage);
  }, [currentPage]);

  const handleStatusChange = async (orderId, newStatus) => {
    const token = getToken();
    try {
      await axios.post(
        "https://zippy-enchantment-production.up.railway.app/api/v1/user/update-order-status",
        {
          status: newStatus,
          order_id: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      setError("Failed to update order status");
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box m={2}>
      <Typography variant="h4" mb={2}>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>
                  <Select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Orders;
