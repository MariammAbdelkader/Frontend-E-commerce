import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Rating,
  Divider
} from '@mui/material';

const ReviewsDialog = ({ open, onClose, reviews }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: '500px',
          maxWidth: '95%',
        },
      }}
    >
      <DialogTitle>Product Reviews</DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {reviews.length === 0 ? (
          <Typography>No reviews yet.</Typography>
        ) : (
          reviews.map((rev, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Rating value={rev.rating} readOnly size="small" />
              <Typography variant="body2">{rev.comment}</Typography>
              {index !== reviews.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewsDialog;
