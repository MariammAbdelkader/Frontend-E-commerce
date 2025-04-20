import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const CategoryManager = () => {
  const [categories, setCategories] = useState([
    {
      categoryId: "1",
      categoryName: "Electronics",
      subcategories: [
        { id: "1", name: "Mobile phones" },
        { id: "2", name: "Laptops & Computers" },
        { id: "3", name: "Tablets" },
        { id: "4", name: "Televisions" },
        { id: "5", name: "Cameras & Photography" },
        { id: "6", name: "Headphones" },
        { id: "7", name: "Smart Watches" },
      ],
    },
    {
      categoryId: "2",
      categoryName: "Furniture",
      subcategories: [
        { id: "1", name: "Sofas" },
        { id: "2", name: "Chairs" },
        { id: "3", name: "Tables" },
        { id: "4", name: "Cabinets" },
        { id: "5", name: "Beds" },
      ],
    },
    {
      categoryId: "3",
      categoryName: "Fashion",
      subcategories: [
        { id: "1", name: "Men's Clothing" },
        { id: "2", name: "Women's Clothing" },
        { id: "3", name: "Footwear" },
        { id: "4", name: "Accessories" },
      ],
    },
    {
      categoryId: "4",
      categoryName: "Beauty & Health",
      subcategories: [
        { id: "1", name: "Makeup" },
        { id: "2", name: "Skincare" },
        { id: "3", name: "Hair Care" },
        { id: "4", name: "Fragrances" },
      ],
    },
    {
      categoryId: "5",
      categoryName: "Home Appliances",
      subcategories: [
        { id: "1", name: "Refrigerators" },
        { id: "2", name: "Washing Machines" },
        { id: "3", name: "Air Conditioners" },
        { id: "4", name: "Microwaves" },
        { id: "5", name: "Dishwashers" },
      ],
    },
  ]);

  const [dialog, setDialog] = useState({ open: false, type: "", data: null });
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryId: "",
    subcategoryName: "",
    subcategoryId: "",
  });

  const handleOpenDialog = (type, data = null) => {
    setDialog({ open: true, type, data });
    if (type === "editCategory" || type === "addCategory") {
      setFormData({
        categoryName: data?.categoryName || "",
        categoryId: data?.categoryId || "",
      });
    } else if (type === "editSubcategory" || type === "addSubcategory") {
      setFormData({
        subcategoryName: data?.name || "",
        subcategoryId: data?.id || "",
        categoryId: data?.categoryId || "",
      });
    }
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, type: "", data: null });
    setFormData({
      categoryName: "",
      categoryId: "",
      subcategoryName: "",
      subcategoryId: "",
    });
  };

  const handleAddOrEdit = () => {
    if (dialog.type === "addCategory") {
      setCategories([
        ...categories,
        {
          categoryId: formData.categoryId,
          categoryName: formData.categoryName,
          subcategories: [],
        },
      ]);
    } else if (dialog.type === "editCategory") {
      setCategories(
        categories.map((cat) =>
          cat.categoryId === dialog.data.categoryId
            ? {
                ...cat,
                categoryName: formData.categoryName,
                categoryId: formData.categoryId,
              }
            : cat
        )
      );
    } else if (dialog.type === "addSubcategory") {
      setCategories(
        categories.map((cat) =>
          cat.categoryId === formData.categoryId
            ? {
                ...cat,
                subcategories: [
                  ...cat.subcategories,
                  { id: Date.now().toString(), name: formData.subcategoryName },
                ],
              }
            : cat
        )
      );
    } else if (dialog.type === "editSubcategory") {
      setCategories(
        categories.map((cat) =>
          cat.categoryId === formData.categoryId
            ? {
                ...cat,
                subcategories: cat.subcategories.map((sub) =>
                  sub.id === formData.subcategoryId
                    ? { ...sub, name: formData.subcategoryName }
                    : sub
                ),
              }
            : cat
        )
      );
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    if (dialog.type === "deleteCategory") {
      setCategories(
        categories.filter((cat) => cat.categoryId !== dialog.data.categoryId)
      );
    } else if (dialog.type === "deleteSubcategory") {
      setCategories(
        categories.map((cat) =>
          cat.categoryId === dialog.data.categoryId
            ? {
                ...cat,
                subcategories: cat.subcategories.filter(
                  (sub) => sub.id !== dialog.data.id
                ),
              }
            : cat
        )
      );
    }
    handleCloseDialog();
  };

  return (
    <Box px={2} py={2}>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={2}
        sx={{
          position: "sticky",
          top: 0,
          padding: "8px 8px",
          zIndex: 1,
          color: "#1b0099",
        }}>
        All Categories
      </Typography>

      <Box
        sx={{
          backgroundColor: "#1600c9",
          color: "#fff",
          borderRadius: 2,
          p: 2,
        }}>
        <Grid container>
          <Grid item xs={4}>
            <Typography fontWeight="bold">CategoryId</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="bold">CategoryName</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="bold">SubCategories</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          maxHeight: "340px",
          overflowY: "auto",
          scrollbarColor: "#3b0dab transparent",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#3b0dab",
            borderRadius: "4px",
          },
          mt: 2,
        }}>
        {categories.map((cat) => (
          <Box
            key={cat.categoryId}
            sx={{
              backgroundColor: "#1600c9",
              color: "#fff",
              borderRadius: 2,
              p: 2,
              mb: 1,
            }}>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography fontWeight="bold">#{cat.categoryId}</Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography fontWeight="bold">{cat.categoryName}</Typography>
                <IconButton
                  size="small"
                  sx={{ color: "yellow" }}
                  onClick={() => handleOpenDialog("editCategory", cat)}>
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "red" }}
                  onClick={() => handleOpenDialog("deleteCategory", cat)}>
                  <Delete />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                {cat.subcategories.map((sub) => (
                  <Box
                    key={sub.id}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography fontWeight="bold">{sub.name}</Typography>
                    <IconButton
                      size="small"
                      sx={{ color: "yellow" }}
                      onClick={() =>
                        handleOpenDialog("editSubcategory", {
                          ...sub,
                          categoryId: cat.categoryId,
                        })
                      }>
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: "red" }}
                      onClick={() =>
                        handleOpenDialog("deleteSubcategory", {
                          ...sub,
                          categoryId: cat.categoryId,
                        })
                      }>
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </Grid>
            </Grid>

            <Box>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#fff",
                  color: "#fff",
                  textTransform: "none",
                  borderStyle: "dashed",
                }}
                onClick={() =>
                  handleOpenDialog("addSubcategory", {
                    categoryId: cat.categoryId,
                  })
                }>
                + add new Subcategory
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: "#1600c9",
          color: "#fff",
          borderRadius: 2,
          p: 2,
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          bottom: 0,
          zIndex: 1,
        }}>
        <Typography fontWeight="bold">
          If you want to add a new Category just press the button here!
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#fff",
            color: "#fff",
            textTransform: "none",
            ml: 2,
            borderStyle: "dashed",
          }}
          onClick={() => handleOpenDialog("addCategory")}>
          + add new Category
        </Button>
      </Box>

      <Dialog
        open={
          dialog.open && ["addCategory", "editCategory"].includes(dialog.type)
        }
        onClose={handleCloseDialog}>
        <DialogTitle>
          {dialog.type === "addCategory" ? "Add Category" : "Edit Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            fullWidth
            margin="dense"
            value={formData.categoryName}
            onChange={(e) =>
              setFormData({ ...formData, categoryName: e.target.value })
            }
          />
          <TextField
            label="Category ID"
            fullWidth
            margin="dense"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={
          dialog.open &&
          ["addSubcategory", "editSubcategory"].includes(dialog.type)
        }
        onClose={handleCloseDialog}>
        <DialogTitle>
          {dialog.type === "addSubcategory"
            ? "Add Subcategory"
            : "Edit Subcategory"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Subcategory Name"
            fullWidth
            margin="dense"
            value={formData.subcategoryName}
            onChange={(e) =>
              setFormData({ ...formData, subcategoryName: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialog.open && dialog.type.startsWith("delete")}
        onClose={handleCloseDialog}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this{" "}
            {dialog.type.includes("Subcategory") ? "Subcategory" : "Category"}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManager;
