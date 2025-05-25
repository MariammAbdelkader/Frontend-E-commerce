import React from "react";
import {
  Box,
  Typography,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Close";
import ChevronLeft from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { styles } from "./CartPageStyles";
import { useCartPage } from "./CartPageContainer";

const CartPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialItems =
    JSON.parse(localStorage.getItem("cartItems")) || state?.cartItems || [];

  const { cartItems, coupon, setCoupon, updateQuantity, removeItem, subtotal } =
    useCartPage(initialItems);

  return (
    <Box sx={styles.cartContainer}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton
          onClick={() => navigate("/store", { state: { cartItems } })}
          sx={styles.backButton}>
          <ChevronLeft fontSize="small" />
        </IconButton>
        <Typography sx={styles.backText}>Back</Typography>
      </Box>

      <Typography sx={styles.cartTitle}>YOUR CART</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={styles.cartItemsContainer}>
            <Box sx={styles.cartItemsScroll}>
              {cartItems.length === 0 ? (
                <Typography variant="h6" ml={3} color="textSecondary">
                  Your cart is empty.
                </Typography>
              ) : (
                cartItems.map((item, index) => (
                  <Box key={index} sx={styles.cartItem}>
                    <Box sx={styles.cartItemDetails}>
                      <CardMedia
                        component="img"
                        sx={styles.cartItemImage}
                        image={item.imgUrl}
                        alt={item.name}
                      />
                      <Box flex={1}>
                        <Typography fontWeight={500}>{item.name}</Typography>
                        <Typography
                          variant="body2"
                          sx={styles.cartItemDescription}>
                          {item.description}
                        </Typography>
                      </Box>

                      <Typography sx={styles.cartItemPrice}>
                        ${item.pricePerOneItem}
                      </Typography>

                      <Box sx={styles.cartItemActions}>
                        <IconButton onClick={() => updateQuantity(index, -1)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton onClick={() => updateQuantity(index, 1)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <Typography fontWeight="500" sx={{ mx: 2 }}>
                          ${(item.pricePerOneItem * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton onClick={() => removeItem(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))
              )}
            </Box>

            <Box display="flex" mx={1} mt={4}>
              <TextField
                placeholder="Coupon code"
                value={coupon}
                size="small"
                onChange={(e) => setCoupon(e.target.value)}
                variant="outlined"
                sx={styles.couponField}
              />
              <Button variant="outlined" sx={styles.applyButton}>
                APPLY
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={styles.cartTotalsContainer}>
            <Typography sx={styles.cartTotalsTitle}>CART TOTALS</Typography>
            <Divider sx={{ my: 3 }} />

            <Box sx={styles.cartTotalRow}>
              <Typography>Shipping (3-5 Business Days)</Typography>
              <Typography>Free</Typography>
            </Box>
            <Box sx={styles.cartTotalRow}>
              <Typography>
                TAX (estimated for the United States (US))
              </Typography>
              <Typography>$0</Typography>
            </Box>
            <Box sx={styles.cartTotalRow}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={styles.cartTotalRow}>
              <Typography sx={styles.totalRowBold}>Total</Typography>
              <Typography sx={styles.totalRowBold}>
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Button variant="contained" fullWidth sx={styles.checkoutButton}>
              PROCEED TO CHECKOUT
            </Button>
            <Button
              fullWidth
              startIcon={<ChevronLeft />}
              sx={styles.continueButton}
              onClick={() => navigate("/store", { state: { cartItems } })}>
              CONTINUE SHOPPING
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
