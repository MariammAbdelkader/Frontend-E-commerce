export const styles = {
  cartContainer: {
    bgcolor: "transparent",
    maxHeight: "100vh",
    maxWidth: "600px",
    margin: "auto",
    mt: 6,
  },
  backButton: {
    color: "black",
    border: "1px solid black",
    backgroundColor: "transparent",
    padding: "2px",
    m: 2,
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  backText: {
    variant: "h6",
    fontWeight: "500",
  },
  cartTitle: {
    fontWeight: "500",
    fontSize: "2rem",
  },
  cartItemsContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cartItemsScroll: {
    flex: "1 1 auto",
    overflowY: "auto",
    maxHeight: "400px",
    padding: "10px",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "black",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-button": {
      display: "none",
    },
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "#fff",
    mb: 2,
    p: 2,
    border: "1px solid #e0e0e0",
  },
  cartItemDetails: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  cartItemImage: {
    width: 100,
    height: 80,
    objectFit: "cover",
    mr: 2,
  },
  cartItemDescription: {
    color: "gray",
    whiteSpace: "normal",
    wordBreak: "break-word",
  },
  cartItemPrice: {
    width: 100,
    textAlign: "center",
    fontWeight: 500,
  },
  cartItemActions: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  couponField: {
    flex: 1,
    mr: 2,
    "& .MuiOutlinedInput-root": {
      bgcolor: "#fff",
      borderRadius: 0,
      "& fieldset": { borderColor: "#ccc" },
    },
  },
  applyButton: {
    px: 3,
    color: "black",
    borderColor: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "black",
      borderColor: "black",
    },
  },
  cartTotalsContainer: {
    bgcolor: "#fff",
    border: "1px solid #e0e0e0",
    p: 3,
    minHeight: "300px",
    mt: 1,
  },
  cartTotalsTitle: {
    variant: "h6",
    gutterBottom: true,
  },
  cartTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    mb: 2,
  },
  totalRowBold: {
    fontWeight: "bold",
  },
  checkoutButton: {
    bgcolor: "#000",
    color: "#fff",
    mt: 6,
    mb: 2,
    py: 1.5,
    fontWeight: 500,
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      bgcolor: "black",
      transform: "scale(1.03)",
    },
  },
  continueButton: {
    justifyContent: "center",
    color: "black",
    "&:hover": {
      bgcolor: "#f0f0f0",
    },
  },
};
