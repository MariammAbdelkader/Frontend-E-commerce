import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Fade,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  MenuItem,

} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { styles } from "./ProfilePageStyles";
import { useLocation } from "react-router-dom";
import {changePassword,sendOtp} from "../../../Services/PasswordServices";

import OTPDialog from "./OTPDialogWindow"

const ProfilePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);

  const location = useLocation();
  const profileData = location.state?.profileData;
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
    const handleUpdatePassword = async () => {
    try {
      const response = await changePassword({ currentPassword, newPassword });
      if (response.message) {
            setOtpDialogOpen(true)
      } else {
        alert("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
  } 

  const handleConfirmOtp = async (code) => {
   try {
      const response = await sendOtp({ otp:code });
      if (response.message) {
        alert(response.message);
        setOtpDialogOpen(false)
      } else {
        alert("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
};


  useEffect(() => {
    setShowPage(true);
  }, []);

  return (
    <Fade in={showPage} timeout={800}>
      <Box sx={styles.pageContainer}>
        <AppBar position="static" elevation={0} sx={styles.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/main")}
              sx={styles.backButton}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={styles.pageTitle}>
              My Profile
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={styles.mainContent}>
          <Card sx={styles.card}>
            <Box sx={styles.tabsContainer}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="inherit"
                TabIndicatorProps={{ style: styles.tabIndicator }}>
                <Tab label="Profile Info" sx={styles.tab} />
                <Tab label="Change Password" sx={styles.tab} />
              </Tabs>
            </Box>

           <CardContent sx={styles.cardContent}>
        {tabValue === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} textAlign="center">
              <Avatar src={profileData.avatar} sx={styles.avatar} />
              <Typography variant="h6" sx={styles.avatarName}>
                {profileData.firstName} {profileData.lastName}
              </Typography>
            </Grid>

            {[
              { label: "First Name", value: profileData.firstName },
              { label: "Last Name", value: profileData.lastName },
              { label: "Email", value: profileData.email },
              { label: "Phone Number", value: profileData.phoneNumber || "N/A" },
            ].map((field, index) => (
              <Grid key={index} item xs={12} md={6}>
                <Typography variant="subtitle2" sx={styles.labelText}>
                  {field.label}
                </Typography>
                <Typography variant="body1" sx={styles.valueText}>
                  {field.value}
                </Typography>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={styles.labelText}>
                Address
              </Typography>
              <Typography variant="body1" sx={styles.valueText}>
                {profileData.address || "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={styles.labelText}>
                Gender
              </Typography>
              <Typography variant="body1" sx={styles.valueText}>
                {profileData.Gender || "N/A"}
              </Typography>
            </Grid>

      <Grid item xs={12} textAlign="right">
        <Button variant="contained" sx={styles.saveButton}>
          Edit Profile
        </Button>
      </Grid>
    </Grid>
  )}

  {tabValue === 1 && (
    <Box maxWidth="sm" mx="auto">
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={3}>
        {["Current Password", "New Password", "Confirm New Password"].map(
          (label, index) => (
            <Grid key={index} item xs={12}>
              <TextField
                fullWidth
                label={label}
                type="password"
                variant="outlined"
                InputProps={{ sx: styles.inputField }}
                value={
                  index === 0
                    ? currentPassword
                    : index === 1
                    ? newPassword
                    : confirmNewPassword
                }
                onChange={(e) =>
                  index === 0
                    ? setCurrentPassword(e.target.value)
                    : index === 1
                    ? setNewPassword(e.target.value)
                    : (setConfirmNewPassword(e.target.value),
                      setPasswordError(e.target.value !== newPassword))
                }
                error={index === 2 && passwordError}
                helperText={
                  index === 2 && passwordError ? "Passwords do not match" : ""
                }
              />
            </Grid>
          )
        )}

        <Grid item xs={12} textAlign="right">
          <Button
            variant="contained"
            onClick={handleUpdatePassword}
            sx={styles.updatePasswordButton}
            disabled={passwordError}
          >
            Update Password
          </Button>
        </Grid>
      </Grid>
      <OTPDialog
        open={otpDialogOpen}
        handleClose={() => setOtpDialogOpen(false)}
        handleConfirm={handleConfirmOtp}
      />
    </Box>
  )}
</CardContent>

          </Card>
        </Box>
      </Box>
    </Fade>
  );
};

export default ProfilePage;
