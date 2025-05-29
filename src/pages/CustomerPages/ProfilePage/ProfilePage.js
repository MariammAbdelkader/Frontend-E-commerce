import React, { useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Stack,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styles } from "./ProfilePageStyles";
import { useLocation } from "react-router-dom";
import { use } from "react";
import OTPDialog from "../../AdminPages/ProfilePage/OTPDialogWindow"
import {changePassword,sendOtp} from "../../../Services/PasswordServices";

const sidebarItems = ["Profile", "Password"];

const ProfilePage = () => {
  const [selectedItem, setSelectedItem] = useState("Profile");
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef();
  const [bgImage, setBgImage] = useState(null);
  const bgFileInputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const profileData = location.state?.profileData;
  const [userData, setUserData] = useState({})
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  


  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });
  const [passwordError, setPasswordError] = useState(false);
  const [emptypasswordError, setEmptypasswordError] = useState(true);


  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (file) setBgImage(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleGenderChange = (e) => {
    setUserData((prev) => ({ ...prev, gender: e.target.value }));
  };

 const handlePasswordChange = (field) => (e) => {
  const value = e.target.value;

  setPasswordData((prev) => {
    const updated = { ...prev, [field]: value };
    console.log(updated)

    if (field === "confirm" || field === "new") {
      setPasswordError(updated.confirm !== updated.new);
    }

    setEmptypasswordError(!(updated.confirm.length>0 && updated.new.length>0 && updated.current.length>0))
    console.log(emptypasswordError)
  
    return updated;
  });
};

const handleUpdatePassword = async () => {
    try {
      const response = await changePassword({ currentPassword:passwordData.current, newPassword:passwordData.new });
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


  const toggleVisibility = (field) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  useEffect(() => {
    if (profileData) {
      setUserData({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        email: profileData.email || "",
        address: profileData.address  || "",
        Gender: profileData.Gender || "",
      });
}},[emptypasswordError]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>
        <Box sx={styles.sidebarHeader}>
          <IconButton onClick={() => navigate("/store")}>
            {" "}
            <ChevronLeft />{" "}
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Settings
          </Typography>
        </Box>
        <List>
          {sidebarItems.map((item) => (
            <ListItemButton
              key={item}
              onClick={() => setSelectedItem(item)}
              sx={styles.listItem(item === selectedItem)}>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={styles.mainContent}>
        <Box sx={styles.coverContainer}>
          <Box sx={styles.coverBackground(bgImage)}>
            <IconButton
              onClick={() => bgFileInputRef.current.click()}
              sx={styles.coverCameraBtn}>
              <CameraAltIcon />
            </IconButton>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={bgFileInputRef}
              onChange={handleBgChange}
            />

            <Box sx={styles.avatarContainer}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  alt="User" 
                  src={profileData?.avatar || ""} 
                  sx={styles.avatarImage}
                />
                <IconButton
                  onClick={() => fileInputRef.current.click()}
                  sx={styles.avatarCameraBtn}>
                  <CameraAltIcon fontSize="small" />
                </IconButton>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </Box>
              <Box sx={styles.avatarTextContainer}>
                <Typography variant="h5" fontWeight={600}>
                  {selectedItem}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedItem === "Profile"
                    ? "Update your photo and personal details."
                    : "Change your password securely."}
                </Typography>
              </Box>
            </Box>

            <Box sx={styles.actionsContainer}>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" sx={styles.cancelBtn}>
                  Cancel
                </Button>
                <Button variant="contained" sx={styles.saveBtn}>
                  Save
                </Button>
              </Stack>
            </Box>
          </Box>

          <Box sx={styles.contentWrapper}>
            <Divider sx={{ my: 2 }} />

            {selectedItem === "Profile" ? (
              <>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="First Name"
                    value={userData.firstName}
                    margin="normal"
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Last Name"
                    value={userData.lastName}
                    margin="normal"
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <FormControl size="small" sx={{ flex: 1, marginTop: "16px" }}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={userData.gender}
                      onChange={handleGenderChange}
                      input={<OutlinedInput label="Gender" />}>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Email"
                    value={userData.email}
                    margin="normal"
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Address"
                    value={userData.address}
                    margin="normal"
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>

                <TextField
                  label="Bio"
                  value={userData.bio}
                  margin="normal"
                  disabled
                  fullWidth
                  multiline
                  rows={4}
                />
              </>
            ) : (
              <Box sx={styles.passwordSection}>
                <TextField
                  label="Current Password"
                  type={passwordData.showCurrent ? "text" : "password"}
                  value={passwordData.current}
                  onChange={handlePasswordChange("current")}
                  margin="normal"
                  size="small"
                  sx={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility("showCurrent")}
                          edge="end">
                          {passwordData.showCurrent ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="New Password"
                  type={passwordData.showNew ? "text" : "password"}
                  value={passwordData.new}
                  onChange={handlePasswordChange("new")}
                  margin="normal"
                  size="small"
                  sx={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility("showNew")}
                          edge="end">
                          {passwordData.showNew ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm New Password"
                  type={passwordData.showConfirm ? "text" : "password"}
                  value={passwordData.confirm}
                  onChange={handlePasswordChange("confirm")}
                  margin="normal"
                  size="small"
                  sx={{ width: "100%" }}
                  error={passwordError}
                  helperText={passwordError ? "Passwords do not match" : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility("showConfirm")}
                          edge="end"
                        >
                          {passwordData.showConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                  <Button
                      variant="contained"
                      sx={styles.changePasswordBtn}
                      disabled={passwordError||emptypasswordError}
                    onClick={handleUpdatePassword}
                    >
                    Change Password
                  </Button>
              <OTPDialog
                      open={otpDialogOpen}
                      handleClose={() => setOtpDialogOpen(false)}
                      handleConfirm={handleConfirmOtp}
                    />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
