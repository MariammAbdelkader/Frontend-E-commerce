import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "./LoginServices";
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

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

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
  } = LoginContainer();

  const handleGoogleLogin = async (credentialResponse) => {
    await loginWithGoogle(credentialResponse.credential);
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

            <TextField
              fullWidth
              placeholder="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={loginStyles.icon} />
                  </InputAdornment>
                ),
              }}
              sx={loginStyles.inputField}
            />

            <TextField
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            />

            <Typography variant="body2" sx={loginStyles.forgotPassword}>
              Forgot Your Password?
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={loginStyles.button}
              onClick={handleLogin}>
              SIGN IN
            </Button>
          </Box>

          <Box sx={loginStyles.rightContainer}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Hello, Friend!
            </Typography>
            <Typography variant="body2" textAlign="center" mt={1} mb={2}>
              Register with your Personal details to use all of site features
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
