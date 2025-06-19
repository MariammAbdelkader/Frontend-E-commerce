import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ProductCardStyles from "./ProductCardStyles";

const ProductCard = ({ product, onAddToCart }) => {
  if (!product) return null;
  
  const imageUrl= product.images && product.images.length > 0 ? product.images[0].url : null;

  return (
    <Card sx={ProductCardStyles.card}>
      <CardMedia
        component="img"
        sx={ProductCardStyles.cardMedia}
        image={imageUrl}
        alt={product.name}
      />

      <CardContent sx={ProductCardStyles.cardContent}>
        <Typography variant="h6" sx={ProductCardStyles.title}>
          {product.name}
        </Typography>
        <Typography variant="body2" sx={ProductCardStyles.description}>
          {product.description}
        </Typography>
        <Typography variant="body2" sx={ProductCardStyles.category}>
          Subcategory: {product.subcategory}
        </Typography>

        {product.discountprice ? (
          <Typography variant="h6" sx={ProductCardStyles.price}>
            <span
              style={{
                textDecoration: "line-through",
                color: "gray",
                marginRight: 8,
              }}>
              ${product.price}
            </span>
            <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
              ${product.discountprice}
            </span>
          </Typography>
        ) : (
          <Typography variant="h6" sx={ProductCardStyles.price}>
            ${product.price}
          </Typography>
        )}

        {product.productDiscountPercentage && (
          <Box sx={ProductCardStyles.discountBadgeProduct}>
            {product.productDiscountPercentage}% OFF
          </Box>
        )}

        {product.categoryDiscountPercentage && (
          <Box sx={ProductCardStyles.discountBadgeCategory}>
            {product.categoryDiscountPercentage}% Category
          </Box>
        )}

        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            sx={{ ...ProductCardStyles.addButton, flex: 1 }}
            onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
