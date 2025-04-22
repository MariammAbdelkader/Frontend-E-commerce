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
    mb:4,
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#1600c9",
      borderRadius: "4px",
    },
  },

  card: {
    borderRadius: 4,
    height:"450px",
    mr:1,
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: 6,
    },
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
      color: "#c62828",
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
  reviewWindow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "400px",
  },
  arrowButton: {
    fontSize: "2rem",
    padding: 0,
    transition: "transform 0.3s ease, opacity 0.5s ease",
    opacity: 1,
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  arrowIcon: {
    color: "#fff",
  },
  reviewCard: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "20px",
    margin: "0 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  userName: {
    fontWeight: "bold",
    fontSize: "1rem",
    marginBottom: "5px",
  },
  stars: {
    color: "#ffb400",
    fontSize: "1.2rem",
    marginBottom: "15px",
  },
  reviewText: {
    fontStyle: "italic",
    textAlign: "center",
    color: "#555",
    marginBottom: "15px",
  },
  closeButton: {
    marginTop: "auto",
    backgroundColor: "#ff4c61",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "20px",
    padding: "6px 20px",
    textTransform: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
  noReviewText: {
    color: "#fff",
    textAlign: "center",
  },
};

export default styles;
