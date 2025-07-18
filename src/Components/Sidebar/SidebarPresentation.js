import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  Home,
  ShoppingCart,
  Store,
  People,
  LocalOffer,
  Chat,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleItemClick = (text) => {
    if (text === "Online Store") {
      navigate("/store");
    } else {
      setActiveItem(text);
    }
  };

  return (
    <Box sx={styles.sidebar}>
      <Box component="img" src={Logo} alt="Logo" sx={styles.sidebarLogo} />
      <List sx={styles.sidebarList}>
        {sidebarItems.map(({ text, icon }) => (
          <ListItem
            button
            key={text}
            onClick={() => handleItemClick(text)}
            sx={styles.sidebarItem(activeItem === text)}>
            <ListItemIcon sx={{ minWidth: "unset", color: "inherit" }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={styles.listItemText} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
