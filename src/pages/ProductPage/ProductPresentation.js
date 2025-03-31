import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "./ProductStyles";
import useProductContainer from "./ProductContainer";

const ProductPresentation = ({ activeSubItem }) => {
  const {
    open,
    productData,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    fileInputRef,
    handleUploadClick,
    handleFileChange,
  } = useProductContainer();

  if (activeSubItem !== "Add New Product") {
    return null;
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Get Ready to Sell
      </Typography>

      {/* Add Product Section */}
      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          Add a New Product
        </Typography>
        <Typography variant="body2" sx={styles.description}>
          You can add a single product here
        </Typography>
        <Button variant="contained" sx={styles.addButton} onClick={handleOpen}>
          Add Product
        </Button>
      </Box>

      {/* Separator */}
      <Box sx={styles.separatorContainer}>
        <Box sx={styles.separatorLine} />
        <Typography variant="body2" sx={styles.orText}>
          Or
        </Typography>
        <Box sx={styles.separatorLine} />
      </Box>

      {/* Upload CSV Section */}
      <Box
        sx={styles.uploadContainer}
        onClick={handleUploadClick}
        style={{ cursor: "pointer" }}>
        <CloudUploadIcon sx={styles.uploadIcon} />
        <Typography variant="h6" sx={styles.uploadTitle}>
          Upload CSV File
        </Typography>
        <Typography variant="body2" sx={styles.uploadDescription}>
          Upload a CSV file to quickly add multiple products and streamline
          inventory management.
        </Typography>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".csv"
          onChange={handleFileChange}
        />
      </Box>

      {/* Add Product Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={styles.modalTitle}>Add New Product</DialogTitle>
        <DialogContent sx={styles.modalContainer}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            sx={styles.inputField}
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            sx={styles.inputField}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            sx={styles.inputField}
          />
          <TextField
            fullWidth
            label="Discount"
            name="discount"
            type="number"
            value={productData.discount}
            onChange={handleChange}
            sx={styles.inputField}
          />
        </DialogContent>
        <DialogActions sx={styles.buttonContainer}>
          <Button onClick={handleClose} sx={styles.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} sx={styles.saveButton}>
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductPresentation;
