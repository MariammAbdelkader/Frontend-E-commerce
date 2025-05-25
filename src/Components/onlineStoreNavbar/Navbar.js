import React from "react";
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

import NavbarStyles from "./NavbarStyles";
import useNavbarContainer from "./NavbarContainer";

const Navbar = () => {
  const {
    cartItems,
    cartCount,
    totalPrice,
    isCartOpen,
    isProfileMenuOpen,
    cartAnchorEl,
    profileAnchorEl,
    handleCartClick,
    handleCartClose,
    handleProfileClick,
    handleMenuClose,
    handleSignOut,
    handleProfile,
    handleLinkClick,
    handleProceedToCheckout,
    removeItemFromCart,
  } = useNavbarContainer();

  return (
    <Box sx={NavbarStyles.container}>
      <Box display="flex" alignItems="center" gap={1}>
        <Paper component="form" sx={NavbarStyles.searchBar}>
          <InputBase
            placeholder="Search for a product"
            sx={NavbarStyles.inputBase}
            inputProps={{ "aria-label": "search products" }}
          />
          <IconButton type="submit" sx={NavbarStyles.iconButton}>
            <SearchIcon />
          </IconButton>
        </Paper>
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
        <IconButton
          sx={NavbarStyles.iconButtonProfile}
          onClick={handleProfileClick}>
          <AccountCircleIcon sx={{ fontSize: "inherit" }} />
        </IconButton>

        <IconButton sx={NavbarStyles.iconButtonCart} onClick={handleCartClick}>
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={profileAnchorEl}
          open={isProfileMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: NavbarStyles.profileMenu }}>
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
          <MenuItem onClick={handleProfile} sx={NavbarStyles.menuItem}>
            <ListItemIcon sx={NavbarStyles.listItemIcon}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="View Profile" />
          </MenuItem>
          <MenuItem onClick={handleSignOut} sx={NavbarStyles.menuItem}>
            <ListItemIcon sx={NavbarStyles.listItemIcon}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </MenuItem>
        </Menu>
      </Box>

      <Menu
        anchorEl={cartAnchorEl}
        open={isCartOpen}
        onClose={handleCartClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: NavbarStyles.cartMenu }}>
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
                      Price: ${item.pricePerOneItem}
                    </Typography>
                  </Box>
                </CardContent>
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
          <Typography sx={NavbarStyles.totalPrice}>${totalPrice}</Typography>
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
  );
};

export default Navbar;
