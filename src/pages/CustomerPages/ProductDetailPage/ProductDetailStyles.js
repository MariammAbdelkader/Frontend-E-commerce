const ProductDetailStyles = {
  backButton: {
    color: "black",
    border: "1px solid black",
    backgroundColor: "transparent",
    padding: "2px",
    mr: 1,
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  backText: {
    variant: "h6",
    fontWeight: "500",
  },
  mainContainer: {
    maxHeight: "100vh",
    gap: 6,
  },
  imageSection: {
    backgroundColor: "#fff",
    borderRadius: 4,
    p: 3,
    ml: 10,
    boxShadow: 2,
    minHeight: "73vh",
    position: "relative",
  },
  arrowButtonLeft: {
    position: "absolute",
    top: "50%",
    left: 8,
    transform: "translateY(-50%)",
    color: "#FF6D00",
    "&:hover": {
      backgroundColor: "rgba(255, 109, 0, 0.3)",
    },
    zIndex: 10,
  },
  arrowButtonRight: {
    position: "absolute",
    top: "50%",
    right: 8,
    transform: "translateY(-50%)",
    color: "#FF6D00",
    "&:hover": {
      backgroundColor: "rgba(255, 109, 0, 0.3)",
    },
    zIndex: 10,
  },
  mainImage: {
    width: "320px",
    height: "auto",
    borderRadius: 4,
    objectFit: "contain",
    mb: 2,
  },
  thumbPaper: (selected) => ({
    width: 64,
    height: 64,
    borderRadius: 2,
    overflow: "hidden",
    cursor: "pointer",
    border: selected ? "2px solid #FF6D00" : "none",
    transition: "border 0.3s",
  }),
  infoSection: {
    px: 2,
  },
  overline: {
    letterSpacing: 1,
  },
  ratingIcon: {
    color: "#FF9F1C",
    mr: 1,
  },
  priceStyle: {
    fontWeight: 700,
    color: "#2D2D2D",
    mb: 3,
  },
  quantityWrapper: {
    display: "flex",
    alignItems: "center",
    mb: 4,
  },
  buyNowButton: {
    px: 4,
    py: 1.5,
    borderRadius: 3,
    background: "linear-gradient(45deg, #FF6D00, #FFA040)",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      background: "linear-gradient(45deg, #FFA040, #FF6D00)",
    },
  },
  addToCartButton: {
    px: 4,
    py: 1.5,
    borderRadius: 3,
    color: "#FF6D00",
    borderColor: "#FF6D00",
    fontWeight: "bold",
    "&:hover": {
      borderColor: "#FFA040",
      color: "#FFA040",
    },
  },
};

export default ProductDetailStyles;
