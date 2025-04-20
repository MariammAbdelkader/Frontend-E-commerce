const styles = {
  bigBox: {
    display: "flex",
    flexDirection: "column",
    minHeight: "83vh",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    padding: "8px 8px",
    zIndex: 1,
    color: "#1b0099",
  },
  headerBox: {
    backgroundColor: "#1600c9",
    color: "#fff",
    borderRadius: 2,
    p: 2,
  },
  categoryBox: {
    backgroundColor: "#1600c9",
    color: "#fff",
    borderRadius: 2,
    p: 2,
    mb: 1,
  },
  subcategoryBox: {
    maxHeight: "110px",
    overflowY: "auto",
    pr: 1,
    scrollbarColor: "#fff transparent",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#3b0dab",
      borderRadius: "4px",
    },
  },
  scrollableContainer: {
    maxHeight: "360px",
    overflowY: "auto",
    scrollbarColor: "#3b0dab transparent",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#3b0dab",
      borderRadius: "4px",
    },
    mt: 2,
  },
  addSubcategoryButton: {
    borderColor: "#fff",
    color: "#fff",
    textTransform: "none",
    borderStyle: "dashed",
  },
  categoryTypography: {
    fontWeight: "bold",
    mt: 1,
  },
  subcategoryTypography: {
    fontWeight: "bold",
    color: "textSecondary",
    mt: 1,
  },
  iconButton: {
    size: "small",
    color: "yellow",
  },
  deleteIconButton: {
    size: "small",
    color: "red",
  },
  footerBox: {
    backgroundColor: "#1600c9",
    color: "#fff",
    borderRadius: 2,
    p: 2,
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    zIndex: 1,
  },
  footerTypography: {
    fontWeight: "bold",
  },
  addCategoryButton: {
    borderColor: "#fff",
    color: "#fff",
    textTransform: "none",
    ml: 2,
    borderStyle: "dashed",
  },
  dialogTitle: {
    fontWeight: "bold",
  },
  dialogTextField: {
    margin: "dense",
    fullWidth: true,
  },
  dialogActions: {
    display: "flex",
  },
  dialogCancelButton: {
    background: "#999",
    color: "black",
    borderRadius: "8px",
    padding: "10px 18px",
    fontWeight: "bold",
    textTransform: "none",
    mb: 2,
    "&:hover": { background: "#b3b3b3" },
  },
  dialogSaveButton: {
    background: "#1B0099",
    color: "white",
    borderRadius: "8px",
    padding: "10px 18px",
    fontWeight: "bold",
    textTransform: "none",
    mb: 2,
    "&:hover": { background: "#140077" },
  },
};

export default styles;
