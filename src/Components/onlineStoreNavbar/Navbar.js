import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Paper,
  InputBase,
  Divider,
  Avatar,
  ListItemIcon,
  ListItemText,
  Select,
  CardContent,
  CardMedia,
  Card,
  Button,
  List,
  ListItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import NavbarStyles from "./NavbarStyles";
import { getCart } from "../../Services/CartServices";

const Navbar = ({
  setCartCount,
  onCartClick,
  onProfileClick,
  profileAnchorEl,
  isProfileMenuOpen,
  handleMenuClose,
  onSignOut,
  onProfile,
  cartAnchorEl,
  isCartOpen,
  handleCartClose,
  handleProceedToCheckout,
  removeItemFromCart,
}) => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const handleLinkClick = (path) => {
    navigate(path);
  };

  // Fetch cart items from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        if (response && Array.isArray(response)) {
          setCartItems(response);

          // Calculate total quantity for cartCount
          const count = response.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(count);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCart();

    const handleCartChange = () => {
      fetchCart();
    };

    window.addEventListener("cartUpdated", handleCartChange);

    return () => {
      window.removeEventListener("cartUpdated", handleCartChange);
    };
  }, [setCartCount]);

  return (
    <>
      <Box sx={NavbarStyles.container}>
        {/* Search Bar */}
        <Box display="flex" alignItems="center" gap={1}>
          <Paper component="form" sx={NavbarStyles.searchBar}>
            <InputBase
              placeholder="Search for a product"
              sx={NavbarStyles.inputBase}
              inputProps={{ "aria-label": "search products" }}
            />
            <IconButton
              type="submit"
              sx={NavbarStyles.iconButton}
              aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          {/* Sort Select Dropdown */}
          <Select
            defaultValue="popular"
            variant="outlined"
            size="small"
            sx={NavbarStyles.selectDropdown}>
            <MenuItem value="popular">Popular</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </Box>

        <Box sx={NavbarStyles.flexCenterGap10}>
          {/* Navigation Links */}
          <Typography
            sx={NavbarStyles.navLinks}
            onClick={() => handleLinkClick("/store")}>
            Store
          </Typography>
          <Typography
            sx={NavbarStyles.navLinks}
            onClick={() => handleLinkClick("/chatbot")}>
            Chatbot
          </Typography>
          <Typography
            sx={NavbarStyles.navLinks}
            onClick={() => handleLinkClick("/about")}>
            About
          </Typography>
          <Typography
            sx={NavbarStyles.navLinks}
            onClick={() => handleLinkClick("/faq")}>
            FAQ
          </Typography>
        </Box>

        <Box sx={NavbarStyles.flexCenterGap3}>
          {/* Profile Button */}
          <IconButton
            sx={NavbarStyles.iconButtonProfile}
            onClick={onProfileClick}>
            <AccountCircleIcon sx={{ fontSize: "inherit" }} />
          </IconButton>

          {/* Cart Button */}
          <IconButton sx={NavbarStyles.iconButtonCart} onClick={onCartClick}>
            <Badge
              badgeContent={
                cartItems.length > 0
                  ? cartItems.reduce((sum, i) => sum + i.quantity, 0)
                  : null
              }
              color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileAnchorEl}
            open={isProfileMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: NavbarStyles.profileMenu,
            }}>
            {/* User Info Section */}
            <Box sx={NavbarStyles.flexCenterGap2Padding}>
              <Avatar
                alt="User"
                src="/avatar.png"
                sx={NavbarStyles.avatarStyle}
              />
              <Box>
                <Typography fontWeight={600} fontSize={15}>
                  Mohamed Fareed
                </Typography>
                <Typography variant="body2" color="gray">
                  fareed@example.com
                </Typography>
              </Box>
            </Box>

            <Divider sx={NavbarStyles.dividerStyle} />

            {/* View Profile and Sign Out Menu Items */}
            <MenuItem onClick={onProfile} sx={NavbarStyles.menuItem}>
              <ListItemIcon sx={NavbarStyles.listItemIcon}>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="View Profile" />
            </MenuItem>

            <MenuItem onClick={onSignOut} sx={NavbarStyles.menuItem}>
              <ListItemIcon sx={NavbarStyles.listItemIcon}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </MenuItem>
          </Menu>
        </Box>

        {/* Cart Menu */}
        <Menu
          anchorEl={cartAnchorEl}
          open={isCartOpen}
          onClose={handleCartClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: NavbarStyles.cartMenu,
          }}>
          <Typography sx={NavbarStyles.typographyBold}>Your Cart</Typography>

          <List sx={NavbarStyles.scrollableList}>
            {cartItems.map((item, index) => (
              <ListItem key={index} sx={NavbarStyles.cartItem}>
                <Card sx={NavbarStyles.cart}>
                  <CardMedia
                    component="img"
                    sx={NavbarStyles.cardMedia}
                    image={item.imgUrl}
                    alt={item.name}
                  />
                  <CardContent sx={NavbarStyles.cardContent}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                    <Box display="flex" mt={1}>
                      <Typography variant="caption" mr={2} color="gray">
                        Qty: {item.quantity}
                      </Typography>
                      <Typography variant="caption" color="gray">
                        Price: $
                        {item.discountprice ? item.discountprice : item.price}
                      </Typography>
                    </Box>
                  </CardContent>

                  {/* Remove from Cart Icon */}
                  <IconButton
                    sx={NavbarStyles.removeButton}
                    onClick={() => removeItemFromCart(item.name)}>
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </ListItem>
            ))}
          </List>

          <Divider sx={NavbarStyles.dividerStyle2} />

          <Box sx={NavbarStyles.flexBetween}>
            <Typography sx={NavbarStyles.totalPrice}>Total</Typography>
            <Typography sx={NavbarStyles.totalPrice}>
              $
              {cartItems
                .reduce(
                  (total, item) =>
                    total + (item.discountprice || item.price) * item.quantity,
                  0
                )
                .toFixed(2)}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={NavbarStyles.checkoutButton}
            onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </Button>
        </Menu>
      </Box>
    </>
  );
};

export default Navbar;
