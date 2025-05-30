export const StorePageStyles = {
  container: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    p: 1,
  },
  globalStyles: {
    html: { margin: 0, padding: 0, height: "100%" },
    body: {
      margin: 0,
      padding: 0,
      height: "100%",
      backgroundColor: "#121212",
    },
    "#root": { height: "100%" },
  },
  header: {
    marginTop: "24px",
    padding: "32px",
    borderRadius: "16px",
    backgroundColor: "#1e1e1e",
    color: "white",
    textAlign: "center",
  },
  headerTitle: {
    height: "150px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  headerDescription: {
    color: "gray",
  },
  featuredSection: {
    my: 3,
    p: 4,
    borderRadius: 2,
    bgcolor: "#1e1e1e",
    color: "white",
    textAlign: "center",
  },
  filterSection: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
    my: 3,
    pr: 2,
  },

  filterSelectStyles: {
    minWidth: 200,
    "& .MuiInputBase-root": {
      color: "#FFF",
      borderColor: "#FFF",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFF",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFF",
    },
    "& .MuiInputLabel-root": {
      color: "#FFF",
    },
    "& .MuiSvgIcon-root": {
      color: "#FFF",
    },
  },
};
