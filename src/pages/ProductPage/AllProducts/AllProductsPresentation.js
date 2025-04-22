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
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion, AnimatePresence } from "framer-motion";

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
    reviewDialogOpen,
    handleOpenReviewDialog,
    handleCloseReviewDialog,
    handleNextReview,
    handlePreviousReview,
    currentReview,
    direction,
    calculateDiscountedPrice,
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
    <div style={styles.container}>
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
              value={filters.category}
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

        {/* <Box style={styles.titleBox}>
          <Typography variant="h6" style={styles.titleText}>
            Our products
          </Typography>
        </Box> */}

        <Box sx={styles.productContainer}>
          <Grid container spacing={3}>
            {products.length > 0 ? (
              products.map((product, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={styles.card}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={product.images?.[0]?.url}
                      alt={product.name}
                      sx={styles.cardMedia}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.category} → {product.subcategory}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                        gutterBottom>
                        {product.description}
                      </Typography>
                      <Typography variant="body2" mb={1}>
                        Quantity: {product.quantity}
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center">
                        {product.status === "discounted" ? (
                          <Typography>
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "gray",
                                marginRight: 8,
                              }}>
                              ${product.price}
                            </span>
                            <span
                              style={{ color: "#d32f2f", fontWeight: "bold" }}>
                              $
                              {calculateDiscountedPrice(
                                product.price,
                                product.categoryDiscountPercentage,
                                product.productDiscountPercentage
                              )}
                            </span>
                          </Typography>
                        ) : (
                          <Typography variant="body1" fontWeight="bold">
                            {product.price} $
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
                          ""
                        )}
                      </Box>
                      {renderStatus(product.status)}
                    </CardContent>
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

        <Dialog
          open={reviewDialogOpen}
          onClose={handleCloseReviewDialog}
          maxWidth="xs"
          fullWidth
          PaperProps={{ style: styles.dialogPaper }}>
          <DialogTitle style={styles.dialogTitle}>Product Reviews</DialogTitle>

          <DialogContent>
            <div style={styles.reviewWindow}>
              {/* Left Arrow */}
              <IconButton
                style={styles.arrowButton}
                onClick={handlePreviousReview}>
                <ArrowBackIcon style={styles.arrowIcon} />
              </IconButton>

              {/* Animated Review Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview?.id || "no-review"}
                  style={styles.reviewCard}
                  initial={{
                    opacity: 0,
                    x: direction === "right" ? 100 : -100,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
                  transition={{ duration: 0.4 }}>
                  {currentReview ? (
                    <>
                      <img
                        src="/path-to-default-avatar.png"
                        alt="User"
                        style={styles.avatar}
                      />
                      <Typography variant="subtitle1" style={styles.userName}>
                        {currentReview.userId}
                      </Typography>
                      <div style={styles.stars}>
                        {"★".repeat(currentReview.rating)}
                        {"☆".repeat(5 - currentReview.rating)}
                      </div>
                      <Typography variant="body1" style={styles.reviewText}>
                        {currentReview.comment}
                      </Typography>
                      <Button
                        onClick={handleCloseReviewDialog}
                        style={styles.closeButton}>
                        Close
                      </Button>
                    </>
                  ) : (
                    <Typography variant="body2" style={styles.noReviewText}>
                      No review available
                    </Typography>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Right Arrow */}
              <IconButton style={styles.arrowButton} onClick={handleNextReview}>
                <ArrowForwardIcon style={styles.arrowIcon} />
              </IconButton>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductList;
