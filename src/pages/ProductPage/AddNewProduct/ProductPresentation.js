import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./ProductStyles";
import useProductContainer from "./ProductContainer";

const ProductPresentation = ({ activeSubItem }) => {
  const {
    open,
    loading,
    productData,
    categories,
    subCategories,
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

      <Box sx={styles.separatorContainer}>
        <Box sx={styles.separatorLine} />
        <Typography variant="body2" sx={styles.orText}>
          Or
        </Typography>
        <Box sx={styles.separatorLine} />
      </Box>

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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={styles.modalTitle}>Add New Product</DialogTitle>
        <DialogContent sx={styles.modalContainer}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                sx={styles.inputField}
                required
              />
              <FormControl fullWidth sx={styles.inputField}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  label="Category"
                  required
                >
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
                  name="subcategory"
                  value={productData.subcategory}
                  onChange={handleChange}
                  label="Subcategory"
                  required
                >
                {subCategories.map((scat) => (
                  <MenuItem key={scat.subcategoryId} value={String(scat.subcategoryId)}>
                    {scat.name}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={productData.price || ""}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    handleChange(e);
                  }
                }}
                sx={styles.inputField}
                required
              />
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={productData.quantity || ""}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    handleChange(e);
                  }
                }}
                sx={styles.inputField}
                required
              />
              <FormControl fullWidth sx={styles.inputField}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={productData.status}
                  onChange={handleChange}
                  label="Status"
                  required>
                  <MenuItem value="in-stock">In Stock</MenuItem>
                  <MenuItem value="out-of-stock">Out of Stock</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Product Description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                sx={styles.inputField}
              />
              <TextField
                fullWidth
                type="file"
                name="image"
                inputProps={{ accept: "image/*" }}
                onChange={handleChange}
                sx={styles.inputField}
              />
            </>
          )}
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
