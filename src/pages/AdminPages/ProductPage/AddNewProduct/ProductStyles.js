const styles = {
  container: {
    maxWidth: 1000,
    textAlign: "left",
    p: 3,
  },
  title: {
    fontWeight: "bold",
    mb: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  description: {
    color: "textSecondary",
    mb: 3,
  },
  addButton: {
    background: "#1B0099",
    color: "white",
    borderRadius: "20px",
    px: 3,
    py: 1,
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": { background: "#1B0099" },
  },
  separatorContainer: {
    display: "flex",
    alignItems: "center",
    my: 4,
    maxWidth: 750,
  },
  separatorLine: {
    flex: 1,
    height: "1px",
    background: "#1B0099",
  },
  orText: {
    mx: 2,
    color: "#1B0099",
  },
  uploadContainer: {
    border: "1px dashed #1B0099",
    borderRadius: "8px",
    p: 4,
    maxWidth: 750,
    height: "180px",
    textAlign: "center",
    cursor: "pointer",
    "&:hover": { background: "#f9f9f9" },
  },
  uploadIcon: {
    fontSize: 50,
    color: "#1B0099",
    mt: "20px",
  },
  uploadTitle: {
    fontWeight: "bold",
    color: "#1B0099",
    mb: 2,
  },
  uploadDescription: {
    color: "textSecondary",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1300,
  },
  modalContainer: {
    background: "white",
    borderRadius: "12px",
    px: "24px",
    width: "550px",
    textAlign: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: "20px",
    my: 1,
    color: "#1B0099",
  },
  inputField: {
    width: "100%",
    marginBottom: "12px",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    background: "transparent",
  },
  muiInputField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
  saveButton: {
    background: "#1B0099",
    color: "white",
    borderRadius: "8px",
    padding: "10px 18px",
    fontWeight: "bold",
    textTransform: "none",
    mb: 2,
    "&:hover": { background: "#140077" },
  },
  cancelButton: {
    background: "#999",
    color: "black",
    borderRadius: "8px",
    padding: "10px 18px",
    fontWeight: "bold",
    textTransform: "none",
    mb: 2,
    "&:hover": { background: "#b3b3b3" },
  },
};

export default styles;
