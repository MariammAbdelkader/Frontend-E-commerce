import React from "react";
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
import styles from "./AllCategoriesStyles";
import useAllCategoriesContainer from "./AllCategoriesContainer";

const CategoryManager = () => {
  const {
    categories,
    dialog,
    formData,
    setFormData,
    handleOpenDialog,
    handleCloseDialog,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleAddSubcategory,
    handleEditSubcategory,
    handleDeleteSubcategory,
  } = useAllCategoriesContainer();

  return (
    <Box sx={styles.bigBox}>
      <Typography variant="h5" fontWeight="bold" sx={styles.stickyHeader}>
        All Categories
      </Typography>

      <Box sx={styles.headerBox}>
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

      <Box sx={styles.scrollableContainer}>
        {categories.map((cat) => (
          <Box key={cat.categoryId} sx={styles.categoryBox}>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography sx={styles.categoryTypography}>
                  #{cat.categoryId}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ display: "flex", gap: 1 }}>
                <Typography sx={styles.categoryTypography}>
                  {cat.categoryName}
                </Typography>
                <IconButton
                  onClick={() => handleOpenDialog("editCategory", cat)}
                  sx={styles.iconButton}>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleOpenDialog("deleteCategory", cat)}
                  sx={styles.deleteIconButton}>
                  <Delete />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <Box sx={styles.subcategoryBox}>
                  {cat.subcategories.map((sub) => (
                    <Box key={sub.id} sx={{ display: "flex", gap: 1 }}>
                      <Typography sx={styles.subcategoryTypography}>
                        {sub.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          handleOpenDialog("editSubcategory", {
                            ...sub,
                            categoryId: cat.categoryId,
                          })
                        }
                        sx={styles.iconButton}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleOpenDialog("deleteSubcategory", {
                            ...sub,
                            categoryId: cat.categoryId,
                          })
                        }
                        sx={styles.deleteIconButton}>
                        <Delete />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
            <Box>
              <Button
                variant="outlined"
                sx={styles.addSubcategoryButton}
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

      <Box sx={styles.footerBox}>
        <Typography sx={styles.footerTypography}>
          If you want to add a new Category just press the button here!
        </Typography>
        <Button
          variant="outlined"
          sx={styles.addCategoryButton}
          onClick={() => handleOpenDialog("addCategory")}>
          + add new Category
        </Button>
      </Box>

      <Dialog
        open={
          dialog.open && ["addCategory", "editCategory"].includes(dialog.type)
        }
        onClose={handleCloseDialog}>
        <DialogTitle sx={styles.dialogTitle}>
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
            sx={styles.dialogTextField}
          />
          <TextField
            label="Category ID"
            fullWidth
            margin="dense"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            sx={styles.dialogTextField}
          />
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button onClick={handleCloseDialog} sx={styles.dialogCancelButton}>
            Cancel
          </Button>
          <Button
            onClick={
              dialog.type === "addCategory"
                ? handleAddCategory
                : handleEditCategory
            }
            sx={styles.dialogSaveButton}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={
          dialog.open &&
          ["addSubcategory", "editSubcategory"].includes(dialog.type)
        }
        onClose={handleCloseDialog}>
        <DialogTitle sx={styles.dialogTitle}>
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
            sx={styles.dialogTextField}
          />
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button onClick={handleCloseDialog} sx={styles.dialogCancelButton}>
            Cancel
          </Button>
          <Button
            onClick={
              dialog.type === "addSubcategory"
                ? handleAddSubcategory
                : handleEditSubcategory
            }
            sx={styles.dialogSaveButton}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialog.open && dialog.type.startsWith("delete")}
        onClose={handleCloseDialog}>
        <DialogTitle sx={styles.dialogTitle}>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this{" "}
            {dialog.type.includes("Subcategory") ? "Subcategory" : "Category"}?
          </Typography>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Button onClick={handleCloseDialog} sx={styles.dialogCancelButton}>
            Cancel
          </Button>
          <Button
            onClick={
              dialog.type === "deleteCategory"
                ? handleDeleteCategory
                : handleDeleteSubcategory
            }
            color="error"
            sx={styles.dialogSaveButton}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManager;
