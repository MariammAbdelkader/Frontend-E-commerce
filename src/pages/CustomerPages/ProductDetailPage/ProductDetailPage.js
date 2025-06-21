import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useProductDetailContainer } from "./ProductDetailContainer";
import styles from "./ProductDetailStyles";
import ReviewDialog from "./RatingDialoage";
import ReviewsDialog from "./ReviewsDialoage";

const colors = [
  { name: "Red", hex: "#ff0000" },
  { name: "Green", hex: "#00ff00" },
  { name: "Blue", hex: "#0000ff" },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    product,
    images,
    currentIndex,
    quantity,
    handlePrev,
    handleNext,
    handleThumbClick,
    handleAddOneMore,
    handleRemoveOne,
    handleBuyNow,
    selectedColor,
    handleSelectColor,
  } = useProductDetailContainer(location.state?.product, id, navigate);

  const [openReviews, setOpenReviews] = useState(false);

  if (!product) {
    return <Typography p={4}>Product not found</Typography>;
  }

  return (
    <>
      <Box display="flex" alignItems="center" p={2}>
        <IconButton onClick={() => navigate("/store")} sx={styles.backButton}>
          <ChevronLeft fontSize="small" />
        </IconButton>
        <Typography sx={styles.backText}>Back</Typography>
      </Box>

      <Box display="flex" p={4} sx={styles.mainContainer}>
        {/* Left: Image Section */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={styles.imageSection}>
          <IconButton onClick={handlePrev} sx={styles.arrowButtonLeft}>
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={handleNext} sx={styles.arrowButtonRight}>
            <ChevronRightIcon fontSize="large" />
          </IconButton>

          <Box
            component="img"
            src={images[currentIndex]?.url}
            alt={`Product image ${currentIndex + 1}`}
            sx={styles.mainImage}
          />

          <Box display="flex" gap={2}>
            {images.map((img, i) => (
              <Paper
                key={i}
                elevation={3}
                sx={styles.thumbPaper(i === currentIndex)}
                onClick={() => handleThumbClick(i)}>
                <img
                  src={img?.url}
                  alt={`thumb-${i}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Right: Info Section */}
        <Box flex={1} sx={styles.infoSection}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={styles.overline}>
            {`${product.category?.toUpperCase()} / ${product.subcategory?.toUpperCase()}`}
          </Typography>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {product.name}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <StarIcon sx={styles.ratingIcon} />
            <Typography variant="body1">
              {product.rate || "--"} ·{" "}
              <span
                style={{
                  color: "gray",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setOpenReviews(true)}>
                {product.reviewCount || "0"} Reviews
              </span>
            </Typography>
            <ReviewsDialog
              open={openReviews}
              onClose={() => setOpenReviews(false)}
              reviews={product.review}
            />
          </Box>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            {colors.map((color) => (
              <div
                key={color.name}
                onClick={() => handleSelectColor(color)}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: color.hex,
                  border:
                    selectedColor?.name === color.name
                      ? "3px solid black"
                      : "1px solid gray",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {selectedColor && (
            <Typography variant="body2" mt={1} mb={2}>
              Selected color: {selectedColor.name}
            </Typography>
          )}

          <Typography variant="body1" color="text.secondary" mb={3}>
            {product.description}
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid item>
              <Typography fontWeight="bold">Discount for Product</Typography>
              <Typography color="gray">
                {product.productDiscountPercentage || "N/A"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontWeight="bold">Discount for Category</Typography>
              <Typography color="gray">
                {product.categoryDiscountPercentage || "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={styles.priceStyle}>
            $
            {(
              (product.discountprice ? product.discountprice : product.price) *
              quantity
            ).toFixed(2)}
          </Typography>

          <Box sx={styles.quantityWrapper}>
            <IconButton onClick={() => handleRemoveOne(product)}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography mx={2} fontSize="1.2rem">
              {product.quantity ? product.quantity : quantity}
            </Typography>
            <IconButton onClick={() => handleAddOneMore(product)}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={handleBuyNow}
              sx={styles.buyNowButton}>
              BUY NOW
            </Button>

            <ReviewDialog productId={product.productId} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetailPage;
