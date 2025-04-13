import React from "react";
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
  } = useViewDiscounts();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={styles.typographyStyle}>
        View Discounts
      </Typography>

      <Paper elevation={2}>
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
            {discounts.map((discount) => (
              <TableRow key={discount.id} sx={styles.tableRowStyle}>
                <TableCell>{discount.target}</TableCell>
                <TableCell>{discount.rate}</TableCell>
                <TableCell>{discount.startDate}</TableCell>
                <TableCell>{discount.endDate}</TableCell>
                <TableCell>{getStatus(discount.endDate)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      setSelectedDiscountId(discount.id);
                      setSelectedDiscountType(discount.type);
                      handleEdit(discount);
                    }}
                    sx={styles.actionButtonStyle}>
                    <EditIcon sx={{ color: "#1b0099" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setSelectedDiscountId(discount.id);
                      setSelectedDiscountType(discount.type);
                      setConfirmDialogOpen(true);
                    }}
                    color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="md"
        sx={styles.dialogStyles.dialogPaper}>
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
            sx={styles.buttonStyles.saveButton}>
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
            Are you sure that you want to delete this discount?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewDiscounts;
