const styles = {
  container: {
    maxWidth: 1000,
    textAlign: "left",
    p: 3,
    pb: 0,
    overflowY: "auto",
    maxHeight: "78vh",
    direction: "rtl",
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
  title: {
    fontWeight: "bold",
    mb: 4,
    color: "#1B0099",
  },
  section: {
    marginBottom: "3rem",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: "1.25rem",
    marginBottom: "1rem",
  },
  description: {
    color: "gray",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  infoText: {
    color: "gray",
    marginBottom: "1rem",
    fontSize: "0.875rem",
  },
  addButton: {
    background: "#1B0099",
    color: "white",
    borderRadius: "20px",
    px: 3,
    py: 1.5,
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": { background: "#1B0099" },
    marginTop: "1rem",
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
    fontWeight: "bold",
  },
  modalContainer: {
    background: "white",
    borderRadius: "12px",
    px: "24px",
    width: "600px",
    textAlign: "center",
    position: "relative",
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
