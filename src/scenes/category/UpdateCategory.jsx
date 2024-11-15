import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { getToken } from "../../utils/auth";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({ name: "", image: null });
  const token = getToken();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    if (categoryData.image instanceof File) {
      formData.append("image", categoryData.image);
    }

    console.log("Data being sent:", {
      id,
      name: categoryData.name,
      image:
        categoryData.image instanceof File
          ? categoryData.image.name
          : categoryData.image,
    });

    try {
      const response = await axios.post(
        `https://backendgrocery-production.up.railway.app/api/v1/category/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Category updated:", response.data);
      navigate("/categories");
    } catch (error) {
      console.error(
        "Error updating category:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setCategoryData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box m={2}>
      <Typography variant="h4">Edit Category</Typography>

      <TextField
        label="Category Name"
        name="name"
        value={categoryData.name}
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
        {!categoryData.image && (
          <Typography>
            Drag & drop an image here, or click to select one
          </Typography>
        )}
        {categoryData.image && (
          <Box mt={2}>
            <img
              src={URL.createObjectURL(categoryData.image)}
              alt="Category"
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

export default UpdateCategory;
