import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
  Typography,
} from "@mui/material";

import { addReview } from "../../../Services/ReviewService";
const ReviewDialog = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = async () => {
    console.log("Rate:", rate);
    console.log("Comment:", comment);
    const review = await addReview({ productId, rate, comment });

    if (review.success) {
      alert(review.message);
    }
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 3,
          background: "linear-gradient(45deg, #FF6D00, #FFA040)",
          color: "#fff",
          fontWeight: "bold",
          "&:hover": {
            background: "linear-gradient(45deg, #FFA040, #FF6D00)",
          },
        }}
        onClick={handleOpen}>
        Leave a Review
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "95%",
          },
        }}>
        <DialogTitle>Leave a Review</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>Rating:</Typography>
            <Rating
              value={rate}
              onChange={(e, newValue) => setRate(newValue)}
            />
          </Box>
          <TextField
            label="Comment"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="primary"
            disabled={rate === 0 || comment.trim() === ""}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewDialog;
