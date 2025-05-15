const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  contentWrapper: {
    maxWidth: "1100px",
    width: "100%",
    padding: "20px",
  },
  filterWrapper: {
    marginBottom: "20px",
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
  productContainer: {
    width: "1130px",
    maxHeight: "72vh",
    overflowY: "auto",
    scrollbarWidth: "thin",
    mb: 4,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#1b0099",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "4px",
    },
  },

  card: {
    borderRadius: 4,
    height: "450px",
    position: "relative",
    mr: 1,
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: 6,
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
  cardMedia: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
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
      backgroundColor: "#ffebee",
      // color: "#c62828",
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
  dialogPaper: {
    backgroundColor: "#1b0099",
    borderRadius: "16px",
  },
  dialogTitle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  dialogPaperProps: { borderRadius: 4, p: 2 },
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    py: 4,
  },
  noReviewsText: {
    textAlign: "center",
  },
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
