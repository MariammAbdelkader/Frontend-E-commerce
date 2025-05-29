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
  IconButton,
  Badge,
} from "@mui/material";
import {
  Search,
  ArrowDropDown,
  Logout,
  Settings,
  HelpOutline,
  AccessibilityNew,
  Notifications,
  Mail,
} from "@mui/icons-material";
import styles from "./NavbarStyles";
import { useNavigate } from "react-router-dom";
import{logout} from "../../Services/LogoutServices";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [messageAnchorEl, setMessageAnchorEl] = useState(null);

  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: "New order received", time: "2 mins ago" },
    { id: 2, title: "Product out of stock", time: "10 mins ago" },
    { id: 3, title: "Customer left a review", time: "1 hour ago" },
    { id: 4, title: "Weekly sales report", time: "Yesterday" },
  ];

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      text: "Hey! Are you available for a quick call?",
      initials: "JD",
    },
    {
      id: 2,
      sender: "Alice Smith",
      text: "The meeting is scheduled at 3PM.",
      initials: "AS",
    },
    {
      id: 3,
      sender: "Bob Williams",
      text: "Thanks for the update!",
      initials: "BW",
    },
  ];

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogout = async() => {
      const res=await logout();
      if (res.success) 
        navigate("/login");

  };

  const handleNotifOpen = (event) => setNotifAnchorEl(event.currentTarget);
  const handleNotifClose = () => setNotifAnchorEl(null);

  const handleMessageOpen = (event) => setMessageAnchorEl(event.currentTarget);
  const handleMessageClose = () => setMessageAnchorEl(null);

  return (
    <AppBar position="sticky" sx={styles.navbar}>
      <Toolbar>
        <Typography variant="h5" sx={styles.navbarTitle}>
          Shophoria
        </Typography>

        <Box sx={styles.searchWrapper}>
          <Paper component="form" sx={styles.searchBox}>
            <Search sx={styles.searchIcon} />
            <InputBase sx={{ flex: 1 }} placeholder="Search..." />
          </Paper>
        </Box>

        <Box sx={styles.userWrapper}>
          <IconButton
            onClick={handleNotifOpen}
            sx={{ color: "#1B0099", mr: 2 }}>
            <Badge badgeContent={notifications.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleMessageOpen}
            sx={{ color: "#1B0099", mr: 3 }}>
            <Badge badgeContent={messages.length} color="error">
              <Mail />
            </Badge>
          </IconButton>

          <Avatar alt="User" src="/profile.jpg" sx={styles.avatar}>
            MF
          </Avatar>

          <Box onClick={handleMenuOpen} sx={styles.nameWrapper}>
            <Typography sx={styles.nameText}>Mohamed Fareed</Typography>
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

        {/* Notifications Menu */}
        <Menu
          anchorEl={notifAnchorEl}
          open={Boolean(notifAnchorEl)}
          onClose={handleNotifClose}
          PaperProps={{ sx: styles.notifPaper }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}>
          <Typography sx={styles.notifTitle}>Notifications</Typography>
          {notifications.map((notif) => (
            <MenuItem
              key={notif.id}
              onClick={handleNotifClose}
              sx={styles.notifItem}>
              <Box sx={styles.notifLeft}>
                <Avatar sx={styles.notifNumber}>{notif.id}</Avatar>
              </Box>
              <Box sx={styles.notifRight}>
                <Typography sx={styles.notifItemTitle}>
                  {notif.title}
                </Typography>
                <Typography sx={styles.notifItemTime}>{notif.time}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Messages Menu */}
        <Menu
          anchorEl={messageAnchorEl}
          open={Boolean(messageAnchorEl)}
          onClose={handleMessageClose}
          PaperProps={{ sx: styles.msgPaper }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}>
          <Typography sx={styles.msgTitle}>Messages</Typography>
          {messages.map((msg) => (
            <MenuItem
              key={msg.id}
              onClick={handleMessageClose}
              sx={styles.msgItem}>
              <Avatar sx={styles.msgAvatar}>{msg.initials}</Avatar>
              <Box>
                <Typography sx={styles.msgSender}>{msg.sender}</Typography>
                <Typography sx={styles.msgText}>{msg.text}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
