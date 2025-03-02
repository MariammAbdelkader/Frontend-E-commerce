import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { SignupStyles } from "./SignupStyles";
import SignupContainer from "./SignupContainer";

const SignUpPage = () => {
  const {
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    handleSignup,
    handleSignIn,
    loading,
  } = SignupContainer();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={SignupStyles.gridContainer}>
      <Paper elevation={3} sx={SignupStyles.paperContainer}>
        {/* Left Section - Sign In */}
        <Box sx={SignupStyles.leftContainer}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" textAlign="center" mt={1} mb={2}>
            Enter your personal details to use all site features.
          </Typography>
          <Button
            variant="outlined"
            sx={SignupStyles.signInButton}
            onClick={handleSignIn}>
            SIGN IN
          </Button>
        </Box>

        {/* Right Section - Sign Up Form */}
        <Box sx={SignupStyles.rightContainer}>
          <Typography variant="h5" sx={SignupStyles.title}>
            Create Account
          </Typography>

          {/* First Name */}
          <TextField
            fullWidth
            placeholder="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={SignupStyles.iconStyle} />
                </InputAdornment>
              ),
            }}
            sx={SignupStyles.inputField}
          />

          {/* Last Name */}
          <TextField
            fullWidth
            placeholder="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={SignupStyles.iconStyle} />
                </InputAdornment>
              ),
            }}
            sx={SignupStyles.inputField}
          />

          {/* Email */}
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
                  <Email sx={SignupStyles.iconStyle} />
                </InputAdornment>
              ),
            }}
            sx={SignupStyles.inputField}
          />

          {/* Password */}
          <TextField
            fullWidth
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={SignupStyles.iconStyle} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Visibility sx={SignupStyles.iconStyle} />
                    ) : (
                      <VisibilityOff sx={SignupStyles.iconStyle} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={SignupStyles.inputField}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={SignupStyles.iconStyle} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <Visibility sx={SignupStyles.iconStyle} />
                    ) : (
                      <VisibilityOff sx={SignupStyles.iconStyle} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={SignupStyles.inputField}
          />
          {/* Backend Error Message */}
          {errors.apiError && (
            <Typography color="error" sx={{ mt: 1, mb: 1 }}>
              {errors.apiError}
            </Typography>
          )}

          {/* Sign Up Button */}
          <Button
            variant="contained"
            sx={SignupStyles.signUpButton}
            onClick={handleSignup}
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "SIGN UP"}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default SignUpPage;
