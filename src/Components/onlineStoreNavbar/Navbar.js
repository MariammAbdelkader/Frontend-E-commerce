import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  Paper,
  InputBase,
  Divider,
  Avatar,
  ListItemIcon,
  ListItemText,
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
import ReplayIcon from "@mui/icons-material/Replay";
import returnIcon from "../../images/returnicon.png";
import { SmartToy } from "@mui/icons-material";
import NavbarStyles from "./NavbarStyles";
import useNavbarContainer from "./NavbarContainer";

const Navbar = ({ cartItems, totalPrice, cartCount }) => {
  const {
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
    profileData,
    handleReturn,
    searchTerm,
    handleSearchInputChange,
    handleSearchSubmit,
    handleKeyDown,
  } = useNavbarContainer();

  return (
    <Box sx={NavbarStyles.container}>
      <Box display="flex" alignItems="center" gap={1}>
        <Paper
          component="form"
          onSubmit={handleSearchSubmit}
          sx={NavbarStyles.searchBar}>
          <InputBase
            placeholder="Search for a product"
            sx={NavbarStyles.inputBase}
            inputProps={{ "aria-label": "search products" }}
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
          />
          <IconButton type="submit" sx={NavbarStyles.iconButton}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Box sx={NavbarStyles.flexCenterGap3}>
        <Tooltip title="Return a product">
          <IconButton onClick={handleReturn} sx={{ width: 40, height: 40 }}>
            <img
              src={returnIcon}
              alt="Return Product"
              style={{ width: 35, height: 35 }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chatbot">
          <IconButton
            sx={NavbarStyles.navLinks}
            onClick={() => handleLinkClick("/userChatbot")}>
            <SmartToy />
          </IconButton>
        </Tooltip>
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
              src={profileData?.avatar || ""}
              sx={NavbarStyles.avatarStyle}>
              {profileData
                ? `${profileData.firstName.charAt(
                    0
                  )}${profileData.lastName.charAt(0)}`
                : "U"}
            </Avatar>
            <Box sx={{ minWidth: 800 }}>
              <Typography sx={NavbarStyles.menuItem}>
                {profileData
                  ? `${profileData.firstName} ${profileData.lastName}`
                  : "User"}
              </Typography>
              <Typography
                variant="body2"
                color="gray"
                sx={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}>
                {profileData ? `${profileData.email}` : "No email provided"}
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
                      Price: ${item.pricePerOneItem * item.quantity}
                    </Typography>
                  </Box>
                </CardContent>
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
