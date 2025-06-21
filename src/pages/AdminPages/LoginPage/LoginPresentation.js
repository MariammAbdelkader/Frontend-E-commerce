import React from "react";
import { useState } from "react";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../../Services/LoginServices";
import { loginStyles } from "./LoginStyles";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import LoginContainer from "./LoginContainer";
import { forgotPassword, sendOtpForgotPassword } from "../../../Services/PasswordServices";
import OTPDialog from "./OTPDialogWindow";

 const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

 

const LoginPresentation = () => {
  const {
    showPassword,
    handleTogglePassword,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    errors,
  } = LoginContainer();

const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  
const handleGoogleLogin = async (credentialResponse) => {
  try {
    const response = await loginWithGoogle(credentialResponse.credential);

    if (response.success) {
      localStorage.setItem("token", "some-value");
      const role = response.data.user?.role;
      if (role === "Admin") {
        window.location.href = "/main";
      } else {
        window.location.href = "/store";
      }
    } else {
      console.error("Google login failed:", response.error);
    }
  } catch (err) {
    console.error("Unexpected Google login error:", err.message);
  }
};


  const handleForgotPassword = async () => {
    try {
      const response = await forgotPassword({email});
      if (response.message) {
        setOtpDialogOpen(true);
      } else {
        alert("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
  };

  const handleConfirmOtp = async (code,newPassword) => {
      try {
        const response = await sendOtpForgotPassword({  email, otp: code, newPassword });
        if (response.message) {
          alert(response.message);
          setOtpDialogOpen(false);
        } else {
          alert("Failed to update password. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("An error occurred while verifying OTP.");
      }
    };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={loginStyles.gridContainer}>
        <Paper elevation={3} sx={loginStyles.paperContainer}>
          <Box sx={loginStyles.leftContainer}>
            <Typography variant="h5" sx={loginStyles.title}>
              Sign in
            </Typography>

            <Box sx={loginStyles.googleButtonContainer}>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log("Google login failed")}
                locale="en"
              />
            </Box>

            <Divider sx={loginStyles.divider}>OR</Divider>

            {/* Email Field */}
            <TextField
              fullWidth
              placeholder="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={loginStyles.icon} />
                  </InputAdornment>
                ),
              }}
              sx={loginStyles.inputField}
              required
            />

            {/* Password Field */}
            <TextField
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={loginStyles.lockIcon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? (
                        <Visibility sx={loginStyles.passwordVisibilityIcon} />
                      ) : (
                        <VisibilityOff sx={loginStyles.icon} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={loginStyles.inputField}
              required
            />

            <Typography
            variant="body2"
            sx={{ ...loginStyles.forgotPassword, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={()=>handleForgotPassword()}
          >
            Forgot Your Password?
          </Typography>

           <OTPDialog
                    open={otpDialogOpen}
                    handleClose={() => setOtpDialogOpen(false)}
                    handleConfirm={handleConfirmOtp}
                  />


            {/* Sign In Button */}
            <Button
              variant="contained"
              fullWidth
              sx={loginStyles.button}
              onClick={handleLogin}>
              SIGN IN
            </Button>

            {/* Show API error below the button */}
            {errors.apiError && (
              <Typography
                variant="body2"
                sx={{ color: "red", textAlign: "center", mt: 3 }}>
                {errors.apiError}
              </Typography>
            )}
          </Box>

          <Box sx={loginStyles.rightContainer}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Hello, Friend!
            </Typography>
            <Typography variant="body2" textAlign="center" mt={1} mb={2}>
              Register with your personal details to use all of site features
            </Typography>

            <Button
              variant="outlined"
              sx={loginStyles.signUpButton}
              onClick={handleSignUp}>
              SIGN UP
            </Button>
          </Box>
        </Paper>
      </Grid>
    </GoogleOAuthProvider>
  );
};

export default LoginPresentation;
