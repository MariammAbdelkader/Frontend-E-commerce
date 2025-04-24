import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./ViewDiscountsStyles";
import useViewDiscounts from "./ViewDiscountsContainer";

const ViewDiscounts = () => {
  const {
    discounts,
    editDialogOpen,
    editingDiscount,
    confirmDialogOpen,
    getStatus,
    handleEdit,
    handleDialogChange,
    handleSave,
    confirmDelete,
    setEditDialogOpen,
    setConfirmDialogOpen,
    setSelectedDiscountId,
    setSelectedDiscountType,
    selectedDiscountId,
  } = useViewDiscounts();

  // Function to handle setting the discount id and type, then opening the confirmation dialog
  const handleDeleteClick = (discount, index) => {
    const discountWithId = {
      ...discount,
      id: discount.id || discount.discountId || index,
    };

    console.log("Selected discount for deletion:", discountWithId);

    if (discountWithId.id) {
      setSelectedDiscountId(discountWithId.id);
      setSelectedDiscountType(discount.productName ? "product" : "category");
      setConfirmDialogOpen(true);
    } else {
      console.error("Discount ID is missing");
    }
  };

  useEffect(() => {
    if (selectedDiscountId) {
      console.log("Selected Discount ID in useEffect:", selectedDiscountId);
    }
  }, [selectedDiscountId]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={styles.typographyStyle}>
        View Discounts
      </Typography>

      <Paper elevation={2}>
        <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1b0099" }}>
                <TableCell sx={styles.headerCellStyle}>
                  Category / Product
                </TableCell>
                <TableCell sx={styles.headerCellStyle}>Discount Rate</TableCell>
                <TableCell sx={styles.headerCellStyle}>Start Date</TableCell>
                <TableCell sx={styles.headerCellStyle}>End Date</TableCell>
                <TableCell sx={styles.headerCellStyle}>Status</TableCell>
                <TableCell align="center" sx={styles.headerCellStyle}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discounts.map((discount, index) => (
                <TableRow key={index} sx={styles.tableRowStyle}>
                  <TableCell>
                    {discount.categoryName
                      ? discount.categoryName
                      : discount.productName || "N/A"}
                  </TableCell>
                  <TableCell>
                    {discount.percentage
                      ? `${discount.percentage}%`
                      : discount.rate
                      ? `${discount.rate}%`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      discount.begin || discount.startDate
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      discount.end || discount.endDate
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatus(discount)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setSelectedDiscountId(discount.id);
                        setSelectedDiscountType(
                          discount.productName ? "product" : "category"
                        );
                        handleEdit({
                          ...discount,
                          rate: discount.percentage || discount.rate,
                          startDate: discount.begin || discount.startDate,
                          endDate: discount.end || discount.endDate,
                        });
                      }}
                      sx={styles.actionButtonStyle}
                    >
                      <EditIcon sx={{ color: "#1b0099" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(discount, index)} // Pass index as fallback for ID
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            m: 0,
          },
        }}
      >
        <DialogTitle>Edit Discount</DialogTitle>
        <DialogContent sx={styles.dialogStyles.dialogContent}>
          <TextField
            label="Discount Rate"
            name="rate"
            value={editingDiscount?.rate || ""}
            onChange={handleDialogChange}
            fullWidth
            sx={styles.dialogStyles.textField}
          />
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={editingDiscount?.startDate || ""}
            onChange={handleDialogChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={editingDiscount?.endDate || ""}
            onChange={handleDialogChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={styles.buttonStyles.saveButton}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure that you want to expire this discount?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Expire
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewDiscounts;
