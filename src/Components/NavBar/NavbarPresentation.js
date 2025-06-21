import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { ArrowDropDown, Logout } from "@mui/icons-material";
import styles from "./NavbarStyles";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Services/LogoutServices";
import { getCustomerProfile } from "../../Services/CustomerServices";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getCustomerProfile();
      if (!res.success) {
        alert("Failed to fetch profile data");
        return;
      }
      setProfileData(res.profile);
    };

    fetchProfile();
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfile = () => {
    navigate("/adminprofile", { state: { profileData: profileData } });
    handleMenuClose();
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) navigate("/login");
  };

  return (
    <AppBar position="sticky" sx={styles.navbar}>
      <Toolbar>
        <Typography variant="h5" sx={styles.navbarTitle}>
          Shophoria
        </Typography>

        {/* Spacer to push avatar+menu to the right */}
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={styles.userWrapper}>
          {/* Optional notifications/messages icons */}
          {/* <IconButton onClick={handleNotifOpen} sx={{ color: "#1B0099", mr: 2 }}>
            <Badge badgeContent={notifications.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMessageOpen} sx={{ color: "#1B0099", mr: 3 }}>
            <Badge badgeContent={messages.length} color="error">
              <Mail />
            </Badge>
          </IconButton> */}

          <Avatar alt="User" src={profileData?.avatar || ""} sx={styles.avatar}>
            {profileData
              ? `${profileData.firstName.charAt(
                  0
                )}${profileData.lastName.charAt(0)}`
              : "U"}
          </Avatar>

          <Box onClick={handleMenuOpen} sx={styles.nameWrapper}>
            <Typography sx={styles.nameText}>
              {profileData
                ? `${profileData.firstName} ${profileData.lastName}`
                : "Loading..."}
            </Typography>
            <ArrowDropDown sx={styles.arrowIcon} />
          </Box>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: styles.dropdownPaper }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}>
          <Box sx={styles.profileBox} onClick={handleProfile}>
            <Avatar
              alt="User"
              src={profileData?.avatar || ""}
              sx={styles.avatar}>
              {profileData
                ? `${profileData.firstName.charAt(
                    0
                  )}${profileData.lastName.charAt(0)}`
                : "U"}
            </Avatar>
            <Box>
              <Typography sx={styles.profileName}>
                {profileData
                  ? `${profileData.firstName} ${profileData.lastName}`
                  : "User"}
              </Typography>
              <Typography sx={styles.profileSubtext}>View Profile</Typography>
            </Box>
          </Box>

          <Divider sx={styles.divider} />

          <MenuItem onClick={handleLogout} sx={styles.logoutItem}>
            <Logout fontSize="small" sx={styles.logoutIcon} />
            Sign Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
