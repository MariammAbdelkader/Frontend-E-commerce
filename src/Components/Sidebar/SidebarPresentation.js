import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Home,
  ShoppingCart,
  Store,
  People,
  LocalOffer,
  Chat,
  Settings,
} from "@mui/icons-material";
import Logo from "../../images/Logo.png";
import styles from "./SidebarStyles";

const sidebarItems = [
  { text: "Home", icon: <Home sx={{ fontSize: 22 }} /> },
  { text: "Orders", icon: <ShoppingCart sx={{ fontSize: 22 }} /> },
  { text: "Products", icon: <Store sx={{ fontSize: 22 }} /> },
  { text: "Customers", icon: <People sx={{ fontSize: 22 }} /> },
  { text: "Discounts", icon: <LocalOffer sx={{ fontSize: 22 }} /> },
  { text: "Online Store", icon: <Store sx={{ fontSize: 22 }} /> },
  { text: "Chatbot", icon: <Chat sx={{ fontSize: 22 }} /> },
];

const Sidebar = ({ activeItem, setActiveItem }) => {
  return (
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
  );
};

export default Sidebar;
