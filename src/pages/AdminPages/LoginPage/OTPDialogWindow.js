import React, { useState, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from "@mui/material";

const OTPDialog = ({ open, handleClose, handleConfirm }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");
    if (code.length === 6 && newPassword) {
      handleConfirm(code, newPassword);
    } else {
      alert("Please enter the 6-digit code and new password.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>🔐 Reset Password</DialogTitle>
      <DialogContent>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 3, mt: 1 }}
        />

        <Grid container spacing={1} justifyContent="center">
          {otp.map((digit, index) => (
            <Grid item key={index}>
              <TextField
                inputRef={(el) => (inputsRef.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "22px", width: "50px", height: "50px" },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OTPDialog;
