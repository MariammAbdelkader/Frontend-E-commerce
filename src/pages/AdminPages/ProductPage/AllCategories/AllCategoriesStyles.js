const styles = {
  // Container and Layout
  container: {
    p: 4,
    backgroundColor: "#f5f5f5",
    maxHeight: "100vh",
  },
  paper: {
    ml: 2,
    maxHeight: "63vh",
    overflowY: "auto",
    borderRadius: 2,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#e0e0e0",
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

  // Titles and Text
  title: {
    fontWeight: "bold",
    color: "#150088",
    mb: 2,
  },
  tableHead: {
    backgroundColor: "#150088",
  },
  tableHeadCell: {
    color: "#fff",
    fontWeight: "bold",
  },
  categoryCell: {
    color: "#150088",
    fontWeight: "bold",
  },
  subcategoryHeaderText: {
    fontWeight: "bold",
    color: "#150088",
  },
  footerText: {
    fontWeight: "bold",
    color: "#150088",
  },
  popupTitle: {
    fontWeight: "bold",
    color: "#150088",
    mb: 1,
  },

  // Header and Footer Boxes
  subcategoryHeaderBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    m: 2,
  },
  footerBox: {
    mt: 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Lists
  subcategoryList: {
    pl: 3,
    pr: 0,
    m: 0,
    listStyleType: "disc",
  },
  subcategoryItem: {
    mb: 2,
    color: "#150088",
    fontWeight: 500,
    position: "relative",
    listStylePosition: "inside",
  },
  subcategoryName: {
    cursor: "pointer",
    display: "inline",
    "&:hover": {
      textDecoration: "underline",
      backgroundColor: "#9aadd3",
    },
  },

  // Popup Box
  popupBox: {
    position: "absolute",
    top: "100%",
    textAlign: "center",
    left: 0,
    mt: "4px",
    zIndex: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    p: 2,
    borderRadius: "6px",
    boxShadow: 3,
    minWidth: "200px",
  },
  popupButtonsBox: {
    display: "flex",
    gap: 2,
    justifyContent: "center",
  },

  // Buttons
  viewMoreButton: {
    color: "#150088",
    fontWeight: "bold",
    textTransform: "none",
  },
  addSubCategoryButton: {
    borderColor: "#150088",
    color: "#150088",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#eee" },
  },
  addCategoryButton: {
    borderColor: "#150088",
    color: "#150088",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#eee" },
  },
  editButton: {
    backgroundColor: "#150088",
    color: "#fff",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#110066",
    },
  },
  deleteButton: {
    backgroundColor: "#ff3b3b",
    color: "#fff",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#cc0000",
    },
  },

  // Dialogs
  dialogTitle: {
    fontWeight: "bold",
  },
  dialogTextField: {
    margin: "dense",
    fullWidth: true,
  },
  dialogActions: {
    display: "flex",
    width: "500px",
  },
  dialogCancelButton: {
    background: "#ff3b3b",
    color: "white",
    borderRadius: "8px",
    padding: "10px 18px",
    fontWeight: "bold",
    textTransform: "none",
    mb: 2,
    "&:hover": { background: "#cc0000" },
  },
  dialogSaveButton: {
    background: "#1B0099",
    color: "white",
    borderRadius: "8px",
    padding: "10px 18px",
    fontWeight: "bold",
    textTransform: "none",
    mb: 2,
    mr: 2,
    "&:hover": { background: "#140077" },
  },
};

export default styles;
