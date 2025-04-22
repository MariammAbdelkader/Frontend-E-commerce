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
  gridWrapper: {
    maxHeight: "400px",
    overflowY: "auto",
    overflowX: "hidden",
    paddingBottom: "20px",
    height: "auto",
  },
  card: {
    width: "300px",
    background: "#fff",
    color: "#1b0099",
    borderRadius: "16px",
    border: "1px solid #1b0099",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out",
    height: "100%",
  },
  cardButtonEdit: {
    marginRight: "10px",
    backgroundColor: "#6200ea",
  },
  cardButtonRemove: {
    backgroundColor: "#d32f2f",
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
  },
  reviewContent: {
    width: "100%",
    height: "100%",
    padding: "20px",
    overflowY: "auto",
  },
  reviewTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  rating: {
    fontWeight: "bold",
  },
  createdAt: {
    textAlign: "right",
    fontSize: "0.8rem",
    color: "#888",
  },
  userId: {
    textAlign: "left",
    fontSize: "0.8rem",
    color: "#888",
  },
  comment: {
    marginTop: "10px",
    fontStyle: "italic",
    wordWrap: "break-word",
  },
  cardButtonReview: {
    marginTop: "10px",
    marginLeft: "8px",
    color: "#1976d2",
    borderColor: "#1976d2",
    textTransform: "none",
    fontWeight: "bold",
    padding: "6px 12px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#e3f2fd",
      borderColor: "#1565c0",
    },
  },
};

export default styles;
