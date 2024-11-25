import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Pagination,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { TextField } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("token:", token);
        const response = await axios.get(
          "https://backendgrocery-production.up.railway.app/api/v1/product/index",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              keyword,
            },
          }
        );
        console.log("Response:", response);
        setProducts(response.data.data.data || []);
        setTotalPages(response.data.data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token, currentPage, keyword]);

  const handleAddProduct = () => {
    navigate("/products/add");
  };

  const handleEditProduct = async (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    setLoading(true);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleDeleteProduct = async (id) => {
    await axios.get(
      `https://backendgrocery-production.up.railway.app/api/v1/product/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <Box m={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddOutlinedIcon />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Search"
          value={keyword}
          onChange={handleKeywordChange}
          variant="outlined"
          size="small"
        />
      </Box>
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
                  <TableCell>Image</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img src={product.image} alt={product.name} width="50" />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.weight}</TableCell>
                    <TableCell>{product.price} VND</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditProduct(product.id)}>
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
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
        </>
      )}
    </Box>
  );
};

export default Products;
