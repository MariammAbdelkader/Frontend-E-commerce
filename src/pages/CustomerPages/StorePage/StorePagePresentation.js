import React from "react";
import {
  Box,
  GlobalStyles,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Navbar from "../../../Components/onlineStoreNavbar/Navbar";
import ProductRow from "../../../Components/ProductRow/ProductRow";
import StorePageContainer from "./StorePageContainer";
import { StorePageStyles } from "./StorePageStyles";

const StorePage = () => {
  const {
    cartCount,
    setCartCount,
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
    categories,
    subcategories,
    filters,
    setFilters,
    error,
  } = StorePageContainer();

  const handleCategoryChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: e.target.value,
      subcategoryId: "",
    }));
  };

  const handleSubcategoryChange = (e) => {
    setFilters((prev) => ({ ...prev, subcategoryId: e.target.value }));
  };

  return (
    <Box sx={StorePageStyles.container}>
      <GlobalStyles styles={StorePageStyles.globalStyles} />
      <Navbar
        cartCount={cartCount}
        setCartCount={setCartCount}
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

      <Box sx={StorePageStyles.filterSection}>
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.categoryId}
            onChange={handleCategoryChange}
            label="Category">
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={filters.subcategoryId}
            onChange={handleSubcategoryChange}
            label="Subcategory">
            <MenuItem value="">All</MenuItem>
            {subcategories.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

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
