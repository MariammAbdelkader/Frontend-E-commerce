const styles = {
  // === Main Layout Containers ===
  productcontainer: {
    display: "flex",
    justifyContent: "center",
    padding: 0,
  },
  contentWrapper: {
    maxWidth: "1100px",
    paddingTop: "20px",
  },

  // === Title Section ===
  titleBox: {
    marginBottom: "20px",
    borderBottom: "2px solid #1b0099",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "center",
  },
  titleText: {
    color: "#1b0099",
    fontWeight: "bold",
    fontSize: "25px",
  },

  // === Filters & Inputs Section ===
  filterWrapper: {
    marginBottom: "25px",
    display: "flex",
    gap: "20px",
  },
  searchInput: {
    width: "300px",
  },
  formControl: {
    minWidth: 200,
  },
  inputField: {
    marginTop: "12px",
    marginBottom: "12px",
  },

  // === Scroll Container for Products Grid ===

  productContainer: {
    width: "1130px",
    maxHeight: "72vh",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#150088 #fff",
    mb: 4,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#150088",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#0f0060",
    },
  },

  // === Individual Product Card ===
  card: {
    borderRadius: 2,
    position: "relative",
    minHeight: "410px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    mr: 1,
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.001)",
      boxShadow: 6,
    },
  },
  cardMedia: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardcontent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardDiscription: {
    minHeight: 48,
    mt: 1,
  },
  cardPriceBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: {
    textDecoration: "line-through",
    color: "gray",
    marginRight: 8,
  },
  cardDiscountPrice: {
    color: "#d32f2f",
    fontWeight: "bold",
  },

  // === Discount Badges on Cards ===
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

  // === Buttons on Cards ===
  buttonEdit: {
    backgroundColor: "#43a047",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
  buttonRemove: {
    color: "#fff",
    backgroundColor: "#e53935",
    fontWeight: "bold",
    padding: "0px 20px",
    "&:hover": {
      backgroundColor: "#c62828",
    },
  },
  buttonReview: {
    backgroundColor: "#1600c9",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#0f009c",
    },
  },

  // === Dialog Styles (including Delete Confirmation) ===
  dialogPaper: {
    padding: 2,
    minWidth: 300,
  },
  dialogTitle: {
    fontWeight: "bold",
    fontSize: "1.25rem",
    color: "#150088",
  },
  dialogContent: {
    fontSize: "1rem",
    color: "#333",
  },
  dialogActions: {
    justifyContent: "space-between",
    padding: "8px 24px",
  },
  cancelButton: {
    color: "#150088",
    textTransform: "none",
    fontWeight: "bold",
  },
  deleteButton: {
    color: "#fff",
    backgroundColor: "#d32f2f",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
  },

  dialogFileInput: {
    width: "100%",
    marginBottom: "12px",
    marginTop: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    background: "transparent",
  },
  dialogButtonCancel: {
    backgroundColor: "#d32f2f",
    color: "#fff",
  },
  dialogButtonSave: {
    backgroundColor: "#1b0099",
    color: "#fff",
  },
  dialogPaperProps: {
    borderRadius: 4,
    p: 2,
  },

  // === Loading & Empty States ===
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    py: 4,
  },
  noReviewsText: {
    textAlign: "center",
  },

  // === Reviews Section ===
  reviewContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentText: {
    fontStyle: "italic",
  },
  ratingBox: {
    mt: 2,
  },
  dateText: {
    mt: 1,
  },
  userStack: {
    direction: "row",
    spacing: 2,
    alignItems: "center",
    justifyContent: "center",
    mt: 3,
  },
  userInfoText: {
    textAlign: "left",
  },
};

export default styles;
