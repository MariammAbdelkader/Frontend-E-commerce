const ProductCardStyles = {
  card: {
    position: "relative",
    width: 300,
    height: 400,
    bgcolor: "#2e2e2e",
    color: "white",
    borderRadius: 2,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardMedia: {
    height: 140,
    objectFit: "cover",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 180px)",
    justifyContent: "space-between",
    p: 2,
  },
  title: {
    fontWeight: 600,
    mb: 1,
    wordWrap: "break-word",
  },
  description: {
    color: "gray",
    mb: 1,
    wordWrap: "break-word",
    flex: 1,
  },
  category: {
    color: "gray",
    mb: 1,
    wordWrap: "break-word",
  },
  price: {
    fontWeight: 500,
    mt: 1,
  },
  addButton: {
    mt: 2,
    background: "linear-gradient(45deg, #FF5722, #FF9800)",
    color: "white",
    "&:hover": {
      background: "linear-gradient(45deg, #FF9800, #FF5722)",
    },
  },
  discountBadgeProduct: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#d32f2f",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    boxShadow: 2,
    zIndex: 1,
  },

  discountBadgeCategory: {
    position: "absolute",
    top: 44,
    right: 12,
    backgroundColor: "#1976d2",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    boxShadow: 2,
    zIndex: 1,
  },
};

export default ProductCardStyles;
