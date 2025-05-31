import React from "react";
import {
  Box,
  GlobalStyles,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Grid,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import Navbar from "../../../Components/onlineStoreNavbar/Navbar";
import ProductRow from "../../../Components/ProductRow/ProductRow";
import StorePageContainer from "./StorePageContainer";
import { StorePageStyles } from "./StorePageStyles";

const StorePage = () => {
  const {
    handleAddToCart,
    handleCategoryChange,
    handleSubcategoryFilter,
    cartItems,
    cartCount,
    totalPrice,
    grouped,
    categories,
    subcategories,
    filters,
    error,
  } = StorePageContainer();

  return (
    <>
      <Box sx={StorePageStyles.container}>
        <GlobalStyles styles={StorePageStyles.globalStyles} />

        <Navbar
          cartItems={cartItems}
          totalPrice={totalPrice}
          cartCount={cartCount}
        />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={StorePageStyles.filterSection}>
          <FormControl sx={StorePageStyles.filterSelectStyles} size="small">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={filters.categoryId}
              onChange={handleCategoryChange}
              label="Category"
              required>
              {categories.map((cat) => (
                <MenuItem key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={StorePageStyles.filterSelectStyles} size="small">
            <InputLabel id="subcategory-label">Subcategory</InputLabel>
            <Select
              labelId="subcategory-label"
              name="subCategory"
              value={filters.subcategoryId}
              onChange={handleSubcategoryFilter}
              label="Subcategory"
              required>
              {subcategories.map((scat) => (
                <MenuItem key={scat.subcategoryId} value={scat.subcategoryId}>
                  {scat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

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
      <Box
        component="footer"
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          borderTop: "1px solid #444",
          mt: 8,
          pt: 6,
          pb: 4,
        }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Brand and Description */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Shophoria
              </Typography>
              <Typography variant="body2" color="gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </Typography>
              <Box mt={2}>
                {[Facebook, Twitter, Instagram, YouTube].map((Icon, index) => (
                  <IconButton
                    key={index}
                    sx={{ color: "#fff", mr: 1, border: "1px solid #555" }}>
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Box>
            </Grid>

            {/* Link Columns */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom>
                Company
              </Typography>
              {["About Us", "Blog", "Contact Us", "Career"].map((item) => (
                <Link
                  href="#"
                  key={item}
                  underline="hover"
                  color="gray"
                  display="block"
                  variant="body2">
                  {item}
                </Link>
              ))}
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom>
                Customer Services
              </Typography>
              {["My Account", "Track Your Order", "Return", "FAQ"].map(
                (item) => (
                  <Link
                    href="#"
                    key={item}
                    underline="hover"
                    color="gray"
                    display="block"
                    variant="body2">
                    {item}
                  </Link>
                )
              )}
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom>
                Our Information
              </Typography>
              {["Privacy", "User Terms & Conditions", "Return Policy"].map(
                (item) => (
                  <Link
                    href="#"
                    key={item}
                    underline="hover"
                    color="gray"
                    display="block"
                    variant="body2">
                    {item}
                  </Link>
                )
              )}
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" gutterBottom>
                Contact Info
              </Typography>
              <Typography variant="body2" color="gray">
                +0123-456-789
              </Typography>
              <Typography variant="body2" color="gray">
                example@gmail.com
              </Typography>
              <Typography variant="body2" color="gray">
                8502 Preston Rd. Inglewood, Maine 98380
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "#333", my: 4 }} />

          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="gray">
              © 2024 <span style={{ color: "#6cc24a" }}>Shophoria</span>. All
              Rights Reserved.
            </Typography>
            <Box>
              <Select
                value="English"
                variant="standard"
                disableUnderline
                sx={{ color: "gray", mr: 2 }}>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
              <Select
                value="USD"
                variant="standard"
                disableUnderline
                sx={{ color: "gray" }}>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default StorePage;
