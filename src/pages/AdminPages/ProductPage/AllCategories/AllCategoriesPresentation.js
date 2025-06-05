import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Collapse,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./AllCategoriesStyles";
import useAllCategoriesContainer from "./AllCategoriesContainer";

const CategoryTable = () => {
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

  const [openIndex, setOpenIndex] = useState(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState({
    parentIndex: null,
    subIndex: null,
  });

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedSubIndex({ parentIndex: null, subIndex: null });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setSelectedSubIndex({ parentIndex: null, subIndex: null });
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        All Categories
      </Typography>

      <Paper sx={styles.paper}>
        <TableContainer>
          <Table>
            <TableHead sx={styles.tableHead}>
              <TableRow>
                <TableCell sx={styles.tableHeadCell}>Category Id</TableCell>
                <TableCell sx={styles.tableHeadCell}>Category Name</TableCell>
                <TableCell sx={styles.tableHeadCell}>Actions</TableCell>

                <TableCell sx={styles.tableHeadCell} align="right">
                  SubCategories
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categories.map((cat, index) => (
                <React.Fragment key={cat.categoryId || index}>
                  <TableRow
                    sx={{ "&:hover": { backgroundColor: "#eee" } }}
                    onClick={() => handleToggle(index)}>
                    <TableCell sx={styles.categoryCell}>
                      #{cat.categoryId}
                    </TableCell>
                    <TableCell sx={styles.categoryCell}>{cat.name}</TableCell>
                    <TableCell sx={styles.categoryCell}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <IconButton
                          onClick={() => handleDeleteCategory(cat.categoryId)}>
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenDialog("editCategory", cat)}>
                          <EditIcon sx={{ color: "blue" }} />
                        </IconButton>
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        endIcon={
                          openIndex === index ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )
                        }
                        onClick={() => handleToggle(index)}
                        sx={styles.viewMoreButton}>
                        View More
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      sx={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={3}>
                      <Collapse
                        in={openIndex === index}
                        timeout="auto"
                        unmountOnExit>
                        <Box sx={{ mt: 1, ml: 2, width: "100%" }}>
                          <Box sx={styles.subcategoryHeaderBox}>
                            <Typography
                              variant="subtitle1"
                              sx={styles.subcategoryHeaderText}>
                              SubCategories
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={styles.addSubCategoryButton}
                              onClick={() =>
                                handleOpenDialog("addSubcategory", {
                                  parentCategoryId: cat.categoryId,
                                  categoryId: cat.categoryId,
                                })
                              }>
                              + Add a new SubCategory
                            </Button>
                          </Box>

                          <Box component="ul" sx={styles.subcategoryList}>
                            {cat.subcategories.map((sub, i) => (
                              <Box
                                key={sub.id || i}
                                component="li"
                                sx={styles.subcategoryItem}>
                                <Box
                                  component="span"
                                  sx={styles.subcategoryName}
                                  onClick={() =>
                                    setSelectedSubIndex({
                                      parentIndex: index,
                                      subIndex: i,
                                    })
                                  }>
                                  {sub.name}
                                </Box>

                                {selectedSubIndex.parentIndex === index &&
                                  selectedSubIndex.subIndex === i && (
                                    <Box ref={popupRef} sx={styles.popupBox}>
                                      <Typography
                                        variant="subtitle2"
                                        sx={styles.popupTitle}>
                                        Choose an action
                                      </Typography>
                                      <Box sx={styles.popupButtonsBox}>
                                        <Button
                                          sx={styles.editButton}
                                          onClick={() =>
                                            handleOpenDialog(
                                              "editSubcategory",
                                              {
                                                ...sub,
                                                categoryId: cat.categoryId,
                                              }
                                            )
                                          }>
                                          Edit
                                        </Button>

                                        <Button
                                          variant="contained"
                                          size="small"
                                          sx={styles.deleteButton}
                                          onClick={() =>
                                            handleOpenDialog(
                                              "deleteSubcategory",
                                              {
                                                ...sub,
                                                categoryId: cat.categoryId,
                                              }
                                            )
                                          }>
                                          Delete
                                        </Button>
                                      </Box>
                                    </Box>
                                  )}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={styles.footerBox}>
        <Typography variant="body2" sx={styles.footerText}>
          If you want to add a new Category just press the button here!
        </Typography>
        <Button
          variant="outlined"
          sx={styles.addCategoryButton}
          onClick={() => handleOpenDialog("addCategory")}>
          + Add a new category
        </Button>
      </Box>

      {/* Add/Edit Category Dialog */}
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

      {/* Add/Edit Subcategory Dialog */}
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

      {/* Delete Confirmation Dialog */}
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

export default CategoryTable;
