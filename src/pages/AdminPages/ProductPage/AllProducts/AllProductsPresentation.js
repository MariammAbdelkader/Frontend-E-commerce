import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Rating,
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
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import dayjs from "dayjs";

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
    current,
    open,
    loading,
    handlePrev,
    handleNext,
    currentIndex,
    reviews,
    handleOpenReviewDialog,
    handleCloseReviewDialog,
  } = useProductContainer();

  const renderStatus = (status) => {
    let statusColor = "#43a047";
    if (status === "out_of_stock") {
      statusColor = "#e53935";
    } else if (status === "Coming Soon") {
      statusColor = "#fbc02d";
    }

    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          backgroundColor: statusColor,
          color: "#fff",
          padding: "2px 8px",
          borderRadius: "12px",
          fontWeight: "bold",
        }}>
        {status}
      </Typography>
    );
  };

  return (
    <div style={styles.productcontainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.filterWrapper}>
          <TextField
            label="Search products"
            variant="outlined"
            value={filters.searchTerm}
            onChange={handleSearch}
            style={styles.searchInput}
            size="small"
          />
          <FormControl style={styles.formControl} size="small">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={filters.categoryId}
              onChange={handleCategoryFilter}
              label="Category"
              required>
              {categories.map((cat) => (
                <MenuItem key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={styles.formControl} size="small">
            <InputLabel id="subcategory-label">Subcategory</InputLabel>
            <Select
              labelId="subcategory-label"
              name="subCategory"
              value={filters.subcategoryId}
              onChange={handleSubcategoryFilter}
              label="Subcategory"
              required>
              {subcategories.map((scat) => (
                <MenuItem key={scat.subcategoryId} value={scat.subcategoryId}>
                  {scat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Price less than"
            variant="outlined"
            size="small"
            value={price}
            onChange={handlePriceFilter}
            style={styles.searchInput}
            type="number"
            inputProps={{ min: 1, step: 1 }}
          />
        </div>

        <Box sx={styles.productContainer}>
          <Grid container spacing={3}>
            {products.length > 0 ? (
              products.map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={styles.card}>
                    {/* Conditional discount badges */}
                    {product.productDiscountPercentage && (
                      <Box sx={styles.discountBadgeProduct}>
                        {product.productDiscountPercentage}% OFF
                      </Box>
                    )}
                    {product.categoryDiscountPercentage && (
                      <Box sx={styles.discountBadgeCategory}>
                        {product.categoryDiscountPercentage}% Category
                      </Box>
                    )}
                    <CardMedia
                      component="img"
                      height="180"
                      image={product.images?.[0]?.url}
                      alt={product.name}
                      sx={styles.cardMedia}
                    />
                    <CardContent sx={styles.cardcontent}>
                      {/* Name */}
                      <Box pb={1}>
                        <Typography variant="h6" fontWeight="bold">
                          {product.name}
                        </Typography>
                      </Box>

                      {/* Category/Subcategory */}
                      <Box sx={{ minHeight: "40px" }}>
                        <Typography variant="body2" color="text.secondary">
                          {product.category} → {product.subcategory}
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Box sx={styles.cardDiscription}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom>
                          {product.description}
                        </Typography>
                      </Box>

                      {/* Price and Rating */}
                      <Box sx={styles.cardPriceBox}>
                        {product.discountprice ? (
                          <Typography>
                            <span style={styles.cardPrice}>
                              ${product.price}
                            </span>
                            <span style={styles.cardDiscountPrice}>
                              ${product.discountprice}
                            </span>
                          </Typography>
                        ) : (
                          <Typography variant="body1" fontWeight="bold">
                            ${product.price}
                          </Typography>
                        )}
                        {product.rate > 0 ? (
                          <Rating
                            value={product.rate}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                        ) : (
                          <Box />
                        )}
                      </Box>
                    </CardContent>
                    {/* Stock Status */}
                    <Box px={2} pb={2}>
                      {renderStatus(product.status)}
                    </Box>
                    <Box px={2} pb={2}>
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between">
                        <Button
                          variant="contained"
                          size="small"
                          fullWidth
                          onClick={() => handleEdit(product)}
                          sx={styles.buttonEdit}>
                          Edit
                        </Button>
                        <Button
                          size="small"
                          fullWidth
                          onClick={() => handleDeleteConfirmation(product)}
                          sx={styles.buttonRemove}>
                          Remove
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          fullWidth
                          onClick={() => handleOpenReviewDialog(product)}
                          sx={styles.buttonReview}>
                          Review
                        </Button>
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No products found.</Typography>
            )}
          </Grid>
        </Box>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteCancel}
          PaperProps={{ sx: styles.dialogPaper }}>
          <DialogTitle sx={styles.dialogTitle}>Confirm Deletion</DialogTitle>
          <DialogContent sx={styles.dialogContent}>
            <Typography>
              Are you sure you want to delete this product?
            </Typography>
          </DialogContent>
          <DialogActions sx={styles.dialogActions}>
            <Button onClick={handleDeleteCancel} sx={styles.cancelButton}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} sx={styles.deleteButton}>
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
              sx={styles.inputField}
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
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity || ""}
                onChange={handleFormChange}
                sx={styles.inputField}
                required
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
              onChange={handleFormChange}
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

        <Dialog
          open={open}
          onClose={handleCloseReviewDialog}
          maxWidth="sm"
          fullWidth
          style={styles.dialogPaperProps}>
          <DialogContent>
            {loading ? (
              <Box sx={styles.loadingBox}>
                <CircularProgress />
              </Box>
            ) : reviews.length === 0 ? (
              <Typography sx={styles.noReviewsText}>No reviews yet.</Typography>
            ) : (
              <Box sx={styles.reviewContainer}>
                <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                  <ArrowBackIos />
                </IconButton>

                <Box flex={1} px={2} textAlign="center">
                  <Typography variant="h6" sx={styles.commentText}>
                    "{current.comment}"
                  </Typography>

                  <Box sx={styles.ratingBox}>
                    <Rating value={current.rating} readOnly precision={0.5} />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={styles.dateText}>
                    {dayjs(current.createdAt).format("MMM D, YYYY")}
                  </Typography>

                  <Stack sx={styles.userStack}>
                    <Avatar src={current.avatar} />
                    <Box sx={styles.userInfoText}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {current.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{current.userId}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <IconButton
                  onClick={handleNext}
                  disabled={currentIndex === reviews.length - 1}>
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductList;
