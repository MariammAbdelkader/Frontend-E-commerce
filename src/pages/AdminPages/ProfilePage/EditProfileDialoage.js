import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";

const EditProfileDialog = ({ open, handleClose, userData, handleSave }) => {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (userData) setFormValues(userData);
  }, [userData]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    handleSave(formValues);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile Info</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              value={formValues.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              value={formValues.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              value={formValues.phoneNumber || ""}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={formValues.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={formValues.gender || ""}
                onChange={(e) => handleChange("Gender", e.target.value)}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={formValues.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
