import React from "react";
import { Box, Typography } from "@mui/material";
import LayoutContainer from "./MainLayoutContainer";
import Sidebar from "../Components/Sidebar/SidebarPresentation";
import Navbar from "../Components/NavBar/NavbarPresentation";
import SubSidebar from "../Components/SubSidebar/SubsidebarPresentation";
import DiscountsPage from "../pages/DiscountPage/DiscountPresentation"; // Import Discounts Page
import styles from "./MainLayoutStyles";

const getSubSidebarItems = (activeItem) => {
  switch (activeItem) {
    case "Products":
      return [{ text: "All Products" }, { text: "Add New Product" }];
    case "Discounts":
      return [{ text: "Add Discount" }, { text: "View Discount" }];
    default:
      return [];
  }
};

const MainLayoutPresentation = () => {
  const { activeItem, SetActiveItem, activeSubItem, SetActiveSubItem } =
    LayoutContainer();

  const subSidebarItems = getSubSidebarItems(activeItem);

  return (
    <Box sx={styles.container}>
      <Sidebar activeItem={activeItem} setActiveItem={SetActiveItem} />

      <Box sx={styles.mainWrapper}>
        <Navbar />
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* ✅ Show sub-sidebar only for Products and Discounts */}
          {subSidebarItems.length > 0 && (
            <SubSidebar
              subSidebarItems={subSidebarItems}
              activeSubItem={activeSubItem}
              SetActiveSubItem={SetActiveSubItem}
            />
          )}

          {/* ✅ Render content dynamically based on active section */}
          <Box component="main" sx={styles.mainContent}>
            {activeItem === "Discounts" ? (
              <DiscountsPage activeSubItem={activeSubItem} />
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
