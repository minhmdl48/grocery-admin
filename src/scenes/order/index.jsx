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
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { getToken } from "../../utils/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async (page) => {
      const token = getToken();
      try {
        const response = await axios.get(
          `https://backendgrocery-production.up.railway.app/api/v1/user/order-history-cms?page=${page}`,
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
          phone: order.phone,
          address: order.address,
          orderItems: order.order_items, // Add order items to the order object
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    setLoading(true);
    setExpandedOrderId(null); // Reset expanded order when changing pages
  };

  const handleAccordionChange = (orderId) => (event, isExpanded) => {
    setExpandedOrderId(isExpanded ? orderId : null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const token = getToken();
    try {
      await axios.post(
        `https://backendgrocery-production.up.railway.app/api/v1/user/update-order-status`,
        { status: newStatus, order_id: orderId },
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
      console.error("Failed to update order status", error);
    }
  };

  return (
    <Box m={2}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.phone}</TableCell>
                      <TableCell>{order.address}</TableCell>
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
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            setExpandedOrderId(
                              expandedOrderId === order.id ? null : order.id
                            )
                          }
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {expandedOrderId === order.id && (
                      <TableRow>
                        <TableCell colSpan={9}>
                          <Accordion expanded>
                            <AccordionDetails>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Product Image</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {order.orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                      <TableCell>
                                        <img
                                          src={item.product.image}
                                          alt={item.product.name}
                                          style={{ width: '50px', height: '50px' }}
                                        />
                                      </TableCell>
                                      <TableCell>{item.product.name}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>{item.product.price} VND</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </AccordionDetails>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
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
        </>
      )}
    </Box>
  );
};

export default Orders;