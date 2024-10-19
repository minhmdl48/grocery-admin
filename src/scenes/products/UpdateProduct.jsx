import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { getToken } from "../../utils/auth";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    weight: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `https://zippy-enchantment-production.up.railway.app/api/v1/product/edit/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://zippy-enchantment-production.up.railway.app/api/v1/category/index",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProductData();
    fetchCategories();
  }, [id, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("category_id", productData.category_id);
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);
    formData.append("weight", productData.weight);
    if (productData.image instanceof File) {
      formData.append("image", productData.image);
    }

    console.log("Data being sent:", {
      id,
      ...productData,
      image:
        productData.image instanceof File
          ? productData.image.name
          : productData.image,
    });

    try {
      const response = await axios.post(
        `https://zippy-enchantment-production.up.railway.app/api/v1/product/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product updated:", response.data);
      navigate("/products");
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProductData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box m={2}>
      <Typography variant="h4">Update Product</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="category_id"
          value={productData.category_id || ""}
          onChange={handleInputChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Name"
        name="name"
        value={productData.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={productData.description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        value={productData.price}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        value={productData.quantity}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Weight"
        name="weight"
        value={productData.weight}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Box
        {...getRootProps()}
        border="1px dashed gray"
        p={5}
        textAlign="center"
        mt={2}
      >
        <input {...getInputProps()} />
        {!productData.image && (
          <Typography>
            Drag & drop an image here, or click to select one
          </Typography>
        )}
        {productData.image && (
          <Box mt={2}>
            <img
              src={URL.createObjectURL(productData.image)}
              alt="Product"
              style={{ width: "200px", height: "auto" }}
            />
          </Box>
        )}
      </Box>
      <Box mt={4} display="flex" justifyContent="flex-start">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginRight: "8px" }}
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

export default UpdateProduct;
