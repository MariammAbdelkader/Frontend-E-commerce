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
    categories,
    subcategories,
    filters,
    openDeleteDialog,
    formData,
    openDialog,
    handleSearch,
    handleCategoryFilter,
    handleSubcategoryFilter,
    price,
    handlePriceFilter,
    handleEdit,
    handleFormChange,
    handleImageChange,
    handleSaveEdit,
    setOpenDialog,
    handleDeleteConfirmation,
    handleDeleteCancel,
    handleDeleteConfirm,
  } = useProductContainer();

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.filterWrapper}>
          <TextField
            label="Search products"
            variant="outlined"
            value={filters.searchTerm}
            onChange={handleSearch}
            style={styles.searchInput}
          />
          <FormControl style={styles.formControl}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={handleCategoryFilter}
              label="Category">
              <MenuItem value="All">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={styles.formControl}>
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={filters.subcategory}
              onChange={handleSubcategoryFilter}
              label="Subcategory">
              <MenuItem value="All">All Subcategories</MenuItem>
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory.id} value={subcategory.name}>
                  {subcategory.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Price less than"
            variant="outlined"
            value={price}
            onChange={handlePriceFilter}
            style={styles.searchInput}
            type="number"
            inputProps={{ min: 1, step: 1 }}
          />
        </div>

        <Box style={styles.titleBox}>
          <Typography variant="h6" style={styles.titleText}>
            Our products
          </Typography>
        </Box>

        <div style={styles.gridWrapper}>
          <Grid container spacing={4}>
            {products.length > 0 ? (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card sx={styles.card}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={product.images?.[0]?.url}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="inherit"
                        fontWeight="bold">
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
                        onClick={() => handleDeleteConfirmation(product)}
                        style={styles.cardButtonRemove}>
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No products found.</Typography>
            )}
          </Grid>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this product?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Product Dialog */}
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
            <FormControl fullWidth sx={styles.inputField}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                label="Category"
                required>
                {categories.map((cat) => (
                  <MenuItem key={cat.categoryId} value={String(cat.categoryId)}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={styles.inputField}>
              <InputLabel id="subcategory-label">Subcategory</InputLabel>
              <Select
                labelId="subcategory-label"
                name="subCategory"
                value={formData.subcategory}
                onChange={handleFormChange}
                label="Subcategory"
                required>
                {subcategories.map((scat) => (
                  <MenuItem
                    key={scat.subcategoryId}
                    value={String(scat.subcategoryId)}>
                    {scat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
