const styles = {
  headerCellStyle: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  typographyStyle: {
    color: "#1b0099",
    fontWeight: "bold",
  },
  dialogStyles: {
    dialogPaper: { width: "600px" },
    dialogContent: { display: "flex", flexDirection: "column", gap: 2, mt: 1 },
    textField: { marginTop: "10px" },
  },
  buttonStyles: {
    saveButton: { backgroundColor: "#1b0099", margin: "10px" },
  },
  tableRowStyle: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  actionButtonStyle: {
    color: "#1b0099",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
};

export default styles;
