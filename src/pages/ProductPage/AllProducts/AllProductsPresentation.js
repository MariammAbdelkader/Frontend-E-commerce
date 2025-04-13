import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import useProductContainer from "./AllProductsContainer";
import styles from "./AllProductsStyles";

const ProductList = () => {
  const {
    products,
    searchTerm,
    categoryFilter,
    statusFilter,
    openDialog,
    formData,
    handleSearch,
    handleCategoryFilter,
    handleStatusFilter,
    handleEdit,
    handleFormChange,
    handleImageChange,
    handleSaveEdit,
    handleRemove,
    setOpenDialog,
  } = useProductContainer();

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.filterWrapper}>
          <TextField
            label="Search products"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchInput}
          />
          <FormControl style={styles.formControl}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={handleCategoryFilter}
              label="Category">
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Category A">Category A</MenuItem>
              <MenuItem value="Category B">Category B</MenuItem>
              <MenuItem value="Category C">Category C</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={styles.formControl}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusFilter}
              label="Status">
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Out of Stock">Out of Stock</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Box style={styles.titleBox}>
          <Typography variant="h6" style={styles.titleText}>
            Our products
          </Typography>
        </Box>

        <div style={styles.gridWrapper}>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={styles.card}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" color="inherit" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="inherit">
                      <strong>Category:</strong> {product.category}
                    </Typography>
                    <Typography variant="body2" color="inherit">
                      <strong>Subcategory:</strong> {product.subcategory}
                    </Typography>
                    <Typography variant="body2" color="inherit">
                      <strong>Price:</strong> {product.price}
                    </Typography>
                    <Typography variant="body2" color="inherit">
                      <strong>Status:</strong> {product.status}
                    </Typography>
                    <Typography variant="body2" color="inherit" paragraph>
                      <strong>Description:</strong> {product.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEdit(product)}
                      style={styles.cardButtonEdit}>
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemove(product.id)}
                      style={styles.cardButtonRemove}>
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
            />
            <TextField
              label="Subcategory"
              variant="outlined"
              fullWidth
              margin="normal"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleFormChange}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
            />
            <TextField
              label="Status"
              variant="outlined"
              fullWidth
              margin="normal"
              name="status"
              value={formData.status}
              onChange={handleFormChange}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              type="file"
              name="image"
              onChange={handleImageChange}
              sx={styles.dialogFileInput}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDialog(false)}
              color="primary"
              style={styles.dialogButtonCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              color="primary"
              style={styles.dialogButtonSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductList;
