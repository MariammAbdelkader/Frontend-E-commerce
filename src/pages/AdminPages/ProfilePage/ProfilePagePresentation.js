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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate, useLocation } from "react-router-dom";
import { changePassword, sendOtp } from "../../../Services/PasswordServices";
import OTPDialog from "./OTPDialogWindow";
import Styles from "./ProfilePageStyles";
import EditProfileDialog from './EditProfileDialoage'
import { updateCustomerProfile } from "../../../Services/CustomerServices";

const ProfilePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const isUpdateDisabled =
    !currentPassword || !newPassword || !confirmNewPassword || passwordError;
  const location = useLocation();
  const profileData = location.state?.profileData;
  const navigate = useNavigate();

  useEffect(() => {
    setShowPage(true);
  }, []);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await changePassword({ currentPassword, newPassword });
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

  const handleConfirmOtp = async (code) => {
    try {
      const response = await sendOtp({ otp: code });
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

const handleSave=async (updatedValues)=>{

  const data={
    firstName:updatedValues.firstName,
    lastName:updatedValues.lastName,
    email:updatedValues.email,
    address:updatedValues.address,
    Gender:updatedValues.Gender,
    phoneNumber:updatedValues.phoneNumber,


  }
    const result = await updateCustomerProfile(data);
    if (result.success) {
      alert("Profile updated successfully!");
      setEditDialogOpen(false);
    } else {
      alert(result.error);
    }
}



  return (
    <Fade in={showPage} timeout={800}>
      <Box sx={{ minHeight: "100vh", p: 2 }}>
        <AppBar position="static" elevation={0} sx={Styles.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/main")}
              sx={Styles.backButton}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={Styles.pageTitle}>
              My Profile
            </Typography>
          </Toolbar>
        </AppBar>

        <Box maxWidth="lg" mx="auto" mt={4}>
          <Card
            sx={{ borderRadius: 3, boxShadow: 4, overflow: "hidden", p: 3 }}>
            <Box>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="none"
                sx={{
                  bgcolor: "white",
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}>
                <Tab
                  label="Profile Info"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#1b0099",
                    bgcolor: "white",
                    borderRadius: "8px",
                    "&.Mui-selected": {
                      color: "white",
                      bgcolor: "#1b0099",
                    },
                  }}
                />
                <Tab
                  label="Change Password"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#1b0099",
                    bgcolor: "white",
                    borderRadius: "8px",
                    "&.Mui-selected": {
                      color: "white",
                      bgcolor: "#1b0099",
                    },
                  }}
                />
              </Tabs>
            </Box>

            <CardContent>
              {/* PROFILE INFO TAB */}
              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        py: 3,
                      }}>
                      <Avatar
                        src={profileData.avatar}
                        sx={{ width: 80, height: 80 }}
                      />
                      <Box>
                        <Typography variant="h5">
                          {profileData.firstName} {profileData.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {profileData.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {[
                    ["First Name", profileData.firstName],
                    ["Last Name", profileData.lastName],
                    ["Phone Number", profileData.phoneNumber || "N/A"],
                    ["Gender", profileData.Gender || "N/A"],
                    ["Address", profileData.address || "N/A"],
                  ].map(([label, value], index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "#fff",
                          borderRadius: 2,
                          boxShadow: 1,
                          borderLeft: "4px solid #1976d2",
                        }}>
                        <Typography variant="caption" color="#1b0099">
                          {label}
                        </Typography>
                        <Typography variant="body1">{value}</Typography>
                      </Box>
                    </Grid>
                  ))}

                  <Grid item xs={12} textAlign="right">
                    <Button
                      onClick={() => setEditDialogOpen(true)}
                      sx={{
                        borderRadius: "8px",
                        borderWidth: 2,
                        color: "#fff",
                        backgroundColor: "#1b0099",
                        padding: "10px 30px",
                        mr: "20px",
                        fontWeight: "600",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#150074",
                          transition: "background-color 0.3s ease",
                        },
                      }}>
                      Edit Profile
                    </Button>

                    <EditProfileDialog
                      open={editDialogOpen}
                      handleClose={() => setEditDialogOpen(false)}
                      userData={profileData}
                     handleSave={handleSave}

                    />
                  </Grid>
                </Grid>
              )}

              {/* CHANGE PASSWORD TAB */}
              {tabValue === 1 && (
                <Box maxWidth="sm" mx="auto">
                  <Divider sx={{ my: 4 }} />
                  <Grid container spacing={3}>
                    {[
                      {
                        label: "Current Password",
                        value: currentPassword,
                        onChange: setCurrentPassword,
                        show: showCurrentPwd,
                        setShow: setShowCurrentPwd,
                      },
                      {
                        label: "New Password",
                        value: newPassword,
                        onChange: setNewPassword,
                        show: showNewPwd,
                        setShow: setShowNewPwd,
                      },
                      {
                        label: "Confirm New Password",
                        value: confirmNewPassword,
                        onChange: (val) => {
                          setConfirmNewPassword(val);
                          setPasswordError(val !== newPassword);
                        },
                        show: showConfirmPwd,
                        setShow: setShowConfirmPwd,
                      },
                    ].map(({ label, value, onChange, show, setShow }, i) => (
                      <Grid item xs={12} key={i}>
                        <TextField
                          fullWidth
                          label={label}
                          type={show ? "text" : "password"}
                          variant="outlined"
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          error={label.includes("Confirm") && passwordError}
                          helperText={
                            label.includes("Confirm") && passwordError
                              ? "Passwords do not match"
                              : ""
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShow(!show)}
                                  edge="end"
                                  sx={{
                                    color: "gray",
                                    "&:hover": {
                                      color: "#1b0099",
                                    },
                                    ...(show && {
                                      color: "#1b0099",
                                      "&:hover": {
                                        color: "#150074",
                                      },
                                    }),
                                  }}
                                  aria-label={
                                    show ? "Hide password" : "Show password"
                                  }>
                                  {show ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12} textAlign="right">
                      <Button
                        sx={{
                          borderRadius: "8px",
                          borderWidth: 2,
                          color: isUpdateDisabled ? "#999" : "#fff",
                          backgroundColor: isUpdateDisabled
                            ? "#fff"
                            : "#1b0099",
                          padding: "10px 30px",
                          fontWeight: "600",
                          textTransform: "none",
                          borderColor: isUpdateDisabled
                            ? "#ccc"
                            : "transparent",
                          "&:hover": {
                            backgroundColor: isUpdateDisabled
                              ? "#fff"
                              : "#150074",
                            transition: "background-color 0.3s ease",
                          },
                        }}
                        disabled={isUpdateDisabled}
                        onClick={handleUpdatePassword}>
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
