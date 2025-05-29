import React, { useState, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from "@mui/material";

const OTPDialog = ({ open, handleClose, handleConfirm }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // يقبل رقم واحد بس
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value entered
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
    if (code.length === 6) {
      handleConfirm(code);
    } else {
      alert("Please enter the 6-digit code.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>🔐 Enter Verification Code</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} justifyContent="center" sx={{ mt: 1 }}>
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
