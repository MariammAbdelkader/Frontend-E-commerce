import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import useProductContainer from "./ProductContainer";

const ProductPresentation = () => {
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

  return (
    <>
      <Tooltip title="Add Product">
        <IconButton onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Upload CSV">
        <IconButton onClick={handleUploadClick}>
          <UploadFileIcon />
        </IconButton>
      </Tooltip>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 400,
          }}>
          <TextField
            label="Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            fullWidth>
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Subcategory"
            name="subcategory"
            value={productData.subcategory}
            onChange={handleChange}
            fullWidth
            disabled={!productData.category}>
            {subCategories.map((sub) => (
              <MenuItem key={sub._id} value={sub._id}>
                {sub.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            type="number"
            fullWidth
          />

          <TextField
            label="Quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            type="number"
            fullWidth
          />

          <TextField
            label="Status"
            name="status"
            value={productData.status}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <Button variant="outlined" component="label">
            Upload Image
            <input
              type="file"
              hidden
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained">
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductPresentation;
