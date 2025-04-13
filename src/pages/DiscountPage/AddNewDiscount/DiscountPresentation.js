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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import useDiscount from "./DiscountContainer";
import styles from "./DiscountStyles";

const DiscountPresenter = ({ activeSubItem, categories = [] }) => {
  const {
    openCategoryDialog,
    openProductDialog,
    category,
    discountPercentage,
    startDate,
    endDate,
    productId,
    loading,
    errorMessage,
    successMessage,
    handleOpenCategoryDialog,
    handleCloseCategoryDialog,
    handleOpenProductDialog,
    handleCloseProductDialog,
    handleDiscountChange,
    handleSaveCategoryDiscount,
    handleSaveProductDiscount,
    setCategory,
    setProductId,
    setStartDate,
    setEndDate,
  } = useDiscount();

  if (activeSubItem !== "Add Discount") return null;

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Apply Discount
      </Typography>

      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          Add Discount to Category
        </Typography>
        <Typography variant="body1" sx={styles.description}>
          You can apply a discount to an entire category of products. This means
          that all products within the selected category will have the same
          discount applied automatically
        </Typography>
        <Typography variant="body2" sx={styles.infoText}>
          To proceed, simply click the button below to start adding a discount
          to a category. You’ll be able to specify the discount rate and
          category in the next steps
        </Typography>
        <Button
          variant="contained"
          sx={styles.addButton}
          onClick={handleOpenCategoryDialog}>
          Add Discount to Category
        </Button>
      </Box>

      <Box sx={styles.separatorContainer}>
        <Box sx={styles.separatorLine} />
        <Typography variant="body2" sx={styles.orText}>
          Or
        </Typography>
        <Box sx={styles.separatorLine} />
      </Box>

      <Dialog open={openCategoryDialog} onClose={handleCloseCategoryDialog}>
        <DialogTitle sx={styles.modalTitle}>Add Category Discount</DialogTitle>
        <DialogContent sx={styles.modalContainer}>
          <FormControl fullWidth sx={styles.inputField}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              required>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Discount Percentage (%)"
            type="number"
            variant="outlined"
            value={discountPercentage}
            onChange={handleDiscountChange}
            inputProps={{ min: 0, max: 100 }}
            sx={styles.inputField}
          />
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            variant="outlined"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={styles.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="End Date"
            type="date"
            variant="outlined"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={styles.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions sx={styles.buttonContainer}>
          <Button onClick={handleCloseCategoryDialog} sx={styles.cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveCategoryDiscount}
            sx={styles.saveButton}
            disabled={loading}>
            {loading ? "Saving..." : "Save Discount"}
          </Button>
        </DialogActions>
        {errorMessage && (
          <Alert severity="error" sx={{ padding: 2, margin: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ padding: 2, margin: 2 }}>
            {successMessage}
          </Alert>
        )}
      </Dialog>

      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          Add Discount to Product
        </Typography>
        <Typography variant="body1" sx={styles.description}>
          You can also apply a discount to a specific product. This allows you
          to offer targeted discounts on individual items
        </Typography>
        <Typography variant="body2" sx={styles.infoText}>
          To apply a discount to a product, click the button below. You'll be
          able to enter the product code and specify the discount rate for that
          product
        </Typography>
        <Button
          variant="contained"
          sx={styles.addButton}
          onClick={handleOpenProductDialog}>
          Add Discount to Product
        </Button>
      </Box>

      <Dialog open={openProductDialog} onClose={handleCloseProductDialog}>
        <DialogTitle sx={styles.modalTitle}>Add Product Discount</DialogTitle>
        <DialogContent sx={styles.modalContainer}>
          <TextField
            fullWidth
            label="Product ID"
            type="number"
            variant="outlined"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            sx={styles.inputField}
            required
          />
          <TextField
            fullWidth
            label="Discount Percentage (%)"
            type="number"
            variant="outlined"
            value={discountPercentage}
            onChange={handleDiscountChange}
            inputProps={{ min: 0, max: 100 }}
            sx={styles.inputField}
          />
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            variant="outlined"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={styles.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="End Date"
            type="date"
            variant="outlined"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={styles.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions sx={styles.buttonContainer}>
          <Button onClick={handleCloseProductDialog} sx={styles.cancelButton}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveProductDiscount}
            sx={styles.saveButton}
            disabled={loading}>
            {loading ? "Saving..." : "Save Discount"}
          </Button>
        </DialogActions>
        {errorMessage && (
          <Alert severity="error" sx={{ padding: 2, margin: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ padding: 2, margin: 2 }}>
            {successMessage}
          </Alert>
        )}
      </Dialog>
    </Box>
  );
};

export default DiscountPresenter;
