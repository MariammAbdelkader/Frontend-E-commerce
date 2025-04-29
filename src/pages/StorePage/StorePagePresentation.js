import React from "react";
import { Box, GlobalStyles, Typography } from "@mui/material";
import Navbar from "../../Components/onlineStoreNavbar/Navbar";
import ProductRow from "../../Components/ProductRow/ProductRow";
import StorePageContainer from "./StorePageContainer";
import { StorePageStyles } from "./StorePageStyles";

const StorePage = () => {
  const {
    cartCount,
    cartAnchorEl,
    profileAnchorEl,
    cartItems,
    isCartOpen,
    isProfileMenuOpen,
    handleCartClick,
    handleProfileClick,
    handleMenuClose,
    handleSignOut,
    handleProfile,
    handleAddToCart,
    handleProceedToCheckout,
    handleCartClose,
    removeItemFromCart,
    grouped,
  } = StorePageContainer();

  return (
    <Box sx={StorePageStyles.container}>
      <GlobalStyles styles={StorePageStyles.globalStyles} />
      <Navbar
        cartCount={cartCount}
        onCartClick={handleCartClick}
        onProfileClick={handleProfileClick}
        profileAnchorEl={profileAnchorEl}
        isProfileMenuOpen={isProfileMenuOpen}
        handleMenuClose={handleMenuClose}
        onSignOut={handleSignOut}
        onProfile={handleProfile}
        cartItems={cartItems}
        cartAnchorEl={cartAnchorEl}
        isCartOpen={isCartOpen}
        handleCartClose={handleCartClose}
        handleProceedToCheckout={handleProceedToCheckout}
        removeItemFromCart={removeItemFromCart}
      />

      <Box sx={StorePageStyles.featuredSection}>
        <Typography variant="h4" sx={StorePageStyles.headerTitle}>
          Featured Products
        </Typography>
        <Typography variant="body1" sx={StorePageStyles.headerDescription}>
          Explore our best-selling items of the month.
        </Typography>
      </Box>

      <Box>
        {Object.entries(grouped).map(([category, items]) => (
          <ProductRow
            key={category}
            category={category}
            products={items}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StorePage;
