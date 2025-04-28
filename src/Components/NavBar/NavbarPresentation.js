import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Search,
  ArrowDropDown,
  Logout,
  Settings,
  HelpOutline,
  AccessibilityNew,
} from "@mui/icons-material";
import styles from "./NavbarStyles";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogout = () => {
    navigate("/login");
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" sx={styles.navbar}>
      <Toolbar>
        <Typography variant="h5" fontWeight="bold" sx={styles.navbarTitle}>
          Shophoria
        </Typography>

        <Box sx={styles.searchWrapper}>
          <Paper component="form" sx={styles.searchBox}>
            <Search sx={styles.searchIcon} />
            <InputBase sx={{ flex: 1 }} placeholder="Search..." />
          </Paper>
        </Box>

        <Box sx={styles.userWrapper}>
          <Avatar alt="User" src="/profile.jpg" sx={styles.avatar}>
            MF
          </Avatar>

          <Box onClick={handleMenuOpen} sx={styles.nameWrapper}>
            <Typography sx={styles.nameText}>Mohamed Fareed</Typography>
            <ArrowDropDown sx={styles.arrowIcon} />
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: styles.dropdownPaper }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}>
          <Box sx={styles.profileBox} onClick={handleProfile}>
            <Avatar alt="User" src="/profile.jpg" sx={styles.avatar}>
              MF
            </Avatar>
            <Box>
              <Typography sx={styles.profileName}>Mohamed Fareed</Typography>
              <Typography sx={styles.profileSubtext}>View Profile</Typography>
            </Box>
          </Box>

          <Divider sx={styles.divider} />

          <MenuItem sx={styles.menuItem}>
            <Settings fontSize="small" sx={styles.iconInMenu} />
            Settings
          </MenuItem>

          <MenuItem sx={styles.menuItem}>
            <HelpOutline fontSize="small" sx={styles.iconInMenu} />
            Help
          </MenuItem>

          <MenuItem sx={styles.menuItem}>
            <AccessibilityNew fontSize="small" sx={styles.iconInMenu} />
            Accessibility
          </MenuItem>

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
