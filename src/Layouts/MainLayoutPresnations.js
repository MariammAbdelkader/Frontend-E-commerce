import React from "react";
import { Box, Typography } from "@mui/material";
import LayoutContainer from "./MainLayoutContainer";
import Sidebar from "../Components/Sidebar/SidebarPresentation";
import Navbar from "../Components/NavBar/NavbarPresentation";
import SubSidebar from "../Components/SubSidebar/SubsidebarPresentation";
import DiscountsPage from "../pages/DiscountPage/DiscountPresentation";
import ProductPage from "../pages/ProductPage/ProductPresentation"; // ✅ Import Product Page
import styles from "./MainLayoutStyles";

// Function to get sidebar items for Discounts & Products
const getSubSidebarItems = (activeItem) => {
  const sidebarOptions = {
    Products: [
      { id: "all-products", text: "All Products" },
      { id: "add-product", text: "Add New Product" },
    ],
    Discounts: [
      { id: "add-discount", text: "Add Discount" },
      { id: "view-discount", text: "View Discount" },
    ],
  };
  return sidebarOptions[activeItem] || [];
};

const MainLayoutPresentation = () => {
  const { activeItem, SetActiveItem, activeSubItem, SetActiveSubItem } =
    LayoutContainer();

  const subSidebarItems = getSubSidebarItems(activeItem);

  return (
    <Box sx={styles.container}>
      {/* Sidebar Component */}
      <Sidebar activeItem={activeItem} setActiveItem={SetActiveItem} />

      <Box sx={styles.mainWrapper}>
        {/* Navbar Component */}
        <Navbar />

        <Box sx={{ display: "flex", flex: 1 }}>
          {/* ✅ Show SubSidebar for Products & Discounts */}
          {subSidebarItems.length > 0 && (
            <SubSidebar
              subSidebarItems={subSidebarItems}
              activeSubItem={activeSubItem}
              SetActiveSubItem={SetActiveSubItem}
            />
          )}

          {/* ✅ Render Pages Dynamically */}
          <Box component="main" sx={styles.mainContent}>
            {activeItem === "Discounts" ? (
              <DiscountsPage activeSubItem={activeSubItem} />
            ) : activeItem === "Products" ? (
              <ProductPage activeSubItem={activeSubItem} />
            ) : (
              <Typography variant="h4">
                {activeItem || "Select a Section"}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayoutPresentation;
