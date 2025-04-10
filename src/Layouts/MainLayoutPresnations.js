import React from "react";
import { Box, Typography } from "@mui/material";
import LayoutContainer from "./MainLayoutContainer";
import Sidebar from "../Components/Sidebar/SidebarPresentation";
import Navbar from "../Components/NavBar/NavbarPresentation";
import SubSidebar from "../Components/SubSidebar/SubsidebarPresentation";
import DiscountsPage from "../pages/DiscountPage/DiscountPresentation";
import ProductPresentation from "../pages/ProductPage/AddNewProduct/ProductPresentation";
import AllProducts from "../pages/ProductPage/AllProducts/AllProductsPresentation";
import styles from "./MainLayoutStyles";

// Return sub-sidebar items based on main item
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

  const renderMainContent = () => {
    if (activeItem === "Discounts") {
      return <DiscountsPage activeSubItem={activeSubItem} />;
    }

    if (activeItem === "Products") {
      if (activeSubItem === "All Products") {
        return <AllProducts activeSubItem={activeSubItem} />;
      } else if (activeSubItem === "Add New Product") {
        return <ProductPresentation activeSubItem={activeSubItem} />;
      }
    }

    return (
      <Typography variant="h4" sx={{ p: 3 }}>
        {activeItem || "Select a Section"}
      </Typography>
    );
  };

  return (
    <Box sx={styles.container}>
      <Sidebar activeItem={activeItem} setActiveItem={SetActiveItem} />

      <Box sx={styles.mainWrapper}>
        <Navbar />

        <Box sx={{ display: "flex", flex: 1 }}>
          {subSidebarItems.length > 0 && (
            <SubSidebar
              subSidebarItems={subSidebarItems}
              activeSubItem={activeSubItem}
              SetActiveSubItem={SetActiveSubItem}
            />
          )}

          <Box component="main" sx={styles.mainContent}>
            {renderMainContent()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayoutPresentation;
