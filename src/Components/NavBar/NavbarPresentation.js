import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  InputBase,
  Avatar,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import styles from "./NavbarStyles";

const Navbar = () => {
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
        <Typography variant="body1" sx={styles.userGreeting}>
          Hi, Mohamed Fareed
        </Typography>
        <Avatar alt="User" src="/profile.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
