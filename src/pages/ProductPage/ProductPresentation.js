import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  InputBase,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import {
  Search,
  Home,
  ShoppingCart,
  Store,
  People,
  LocalOffer,
  Chat,
  Settings,
} from "@mui/icons-material";
import Logo from "../../images/Logo.png";
import styles from "./ProductStyles";
import ProductContainer from "./ProductContainer";

const sidebarItems = [
  { text: "Home", icon: <Home sx={{ fontSize: 22 }} /> },
  { text: "Orders", icon: <ShoppingCart sx={{ fontSize: 22 }} /> },
  { text: "Products", icon: <Store sx={{ fontSize: 22 }} /> },
  { text: "Customers", icon: <People sx={{ fontSize: 22 }} /> },
  { text: "Discounts", icon: <LocalOffer sx={{ fontSize: 22 }} /> },
  { text: "Online Store", icon: <Store sx={{ fontSize: 22 }} /> },
  { text: "Chatbot", icon: <Chat sx={{ fontSize: 22 }} /> },
];

const subSidebarItems = [{ text: "All Products" }, { text: "Add New Product" }];

const ProductPresentation = () => {
  const { activeItem, setActiveItem, activeSubItem, setActiveSubItem } =
    ProductContainer();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>
        <Box component="img" src={Logo} alt="Logo" sx={styles.sidebarLogo} />
        <List sx={styles.sidebarList}>
          {sidebarItems.map(({ text, icon }) => (
            <ListItem
              button
              key={text}
              onClick={() => setActiveItem(text)}
              sx={styles.sidebarItem(activeItem === text)}>
              <ListItemIcon sx={{ minWidth: "unset", color: "inherit" }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={styles.listItemText} />
            </ListItem>
          ))}
        </List>
        <Divider sx={styles.divider} />
        <ListItem button sx={styles.settingsItem}>
          <ListItemIcon sx={{ minWidth: "unset", color: "inherit" }}>
            <Settings sx={{ fontSize: 22 }} />
          </ListItemIcon>
          <ListItemText primary="Settings" sx={styles.listItemText} />
        </ListItem>
      </Box>

      <Box sx={styles.mainWrapper}>
        <AppBar position="static" sx={styles.navbar}>
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

        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {activeItem === "Products" && (
            <Box sx={styles.subSidebar}>
              <List>
                {subSidebarItems.map(({ text }) => (
                  <ListItem
                    button
                    key={text}
                    onClick={() => setActiveSubItem(text)}
                    sx={styles.subSidebarItem(activeSubItem === text)}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Box component="main" sx={styles.mainContent}>
            {/* Main Content Goes Here */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPresentation;
