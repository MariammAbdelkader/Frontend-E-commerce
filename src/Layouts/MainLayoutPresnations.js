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
  Button,
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
import Logo from "../images/Logo.png";
import styles from "./MainLayoutStyles";
import LayoutContainer from "./MainLatoutContainer";
import Sidebar from "../Components/Sidebar/SidebarPresentation";
import Navbar from "../Components/NavBar/NavbarPresentation";
import SubSidebar from "../Components/SubSidebar/SubsidebarPresentation"
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

const MainLayoutPresnations = () => {
  const { activeItem,SetActiveItem, activeSubItem,SetActiveSubItem} = LayoutContainer();
  
  return (
    <Box sx={styles.container}>
      <Sidebar activeItem={activeItem} setActiveItem={SetActiveItem} />
      
      <Box sx={styles.mainWrapper}>
        <Navbar /> {/* Use Navbar component */}

            <Box sx={{ display: "flex", flex: 1 }}>
                <SubSidebar subSidebarItems={subSidebarItems} activeSubItem={activeSubItem} SetActiveSubItem={SetActiveSubItem}/>
                
                
                <Box component="main" sx={styles.mainContent}>
                  <Button>{activeItem}</Button>
                  <Button>{activeSubItem}</Button>
                </Box>
            </Box>
        
      </Box>
      
    </Box>
  );
};


export default MainLayoutPresnations;
