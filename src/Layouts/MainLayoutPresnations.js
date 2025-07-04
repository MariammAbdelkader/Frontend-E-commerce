import React from "react";
import { Box } from "@mui/material";
import LayoutContainer from "./MainLayoutContainer";
import Sidebar from "../Components/Sidebar/SidebarPresentation";
import Navbar from "../Components/NavBar/NavbarPresentation";
import SubSidebar from "../Components/SubSidebar/SubsidebarPresentation";
import DiscountPresentation from "../pages/AdminPages/DiscountPage/AddNewDiscount/DiscountPresentation";
import ViewDiscounts from "../pages/AdminPages/DiscountPage/ViewDiscounts/ViewDiscounts";
import ProductPresentation from "../pages/AdminPages/ProductPage/AddNewProduct/ProductPresentation";
import AllProducts from "../pages/AdminPages/ProductPage/AllProducts/AllProductsPresentation";
import AllCategories from "../pages/AdminPages/ProductPage/AllCategories/AllCategoriesPresentation";
import ChatbotPage from "../pages/AdminPages/ChatbotPage/ChatbotPresentation";
import OrdersPagePresentation from "../pages/AdminPages/OrdersPage/OrdersPagePresentation";
import CustomerPage from "../pages/AdminPages/Customers/CustomerPagePresentation";
import styles from "./MainLayoutStyles";

import DashboardContainer from "../pages/AdminPages/DashboardPage/DashboardContainer";

const getSubSidebarItems = (activeItem) => {
  const sidebarOptions = {
    Products: [
      { id: "All Products", text: "All Products" },
      { id: "All Categories", text: "All Categories" },
      { id: "Add New Product", text: "Add New Product" },
    ],
    Discounts: [
      { id: "Add Discount", text: "Add Discount" },
      { id: "View Discount", text: "View Discount" },
    ],
    Orders: [{ id: "View Orders", text: "View Orders" }],
    Chatbot: [],
    Customers: [{ id: "All Customers", text: "All Customers" }],
  };
  return sidebarOptions[activeItem] || [];
};

const MainLayoutPresentation = () => {
  const { activeItem, SetActiveItem, activeSubItem, SetActiveSubItem } =
    LayoutContainer();

  const subSidebarItems = getSubSidebarItems(activeItem);

  const renderMainContent = () => {
    if (activeItem === "Products") {
      if (activeSubItem === "All Products") {
        return <AllProducts activeSubItem={activeSubItem} />;
      } else if (activeSubItem === "Add New Product") {
        return <ProductPresentation activeSubItem={activeSubItem} />;
      } else if (activeSubItem === "All Categories") {
        return <AllCategories activeSubItem={activeSubItem} />;
      }
    }

    if (activeItem === "Discounts") {
      if (activeSubItem === "Add Discount") {
        return <DiscountPresentation activeSubItem={activeSubItem} />;
      } else if (activeSubItem === "View Discount") {
        return <ViewDiscounts activeSubItem={activeSubItem} />;
      }
    }

    if (activeItem === "Orders") {
      if (activeSubItem === "View Orders") {
        return <OrdersPagePresentation activeSubItem={activeSubItem} />;
      }
    }

    if (activeItem === "Chatbot") {
      return <ChatbotPage />;
    }

    if (activeItem === "Customers") {
      if (activeSubItem === "All Customers") {
        return <CustomerPage />;
      }
    }

    if (activeItem === "Home") {
      return <DashboardContainer />;
    }

    return null;
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
