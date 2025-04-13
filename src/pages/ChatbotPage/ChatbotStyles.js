const ChatbotStyles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    p: 3,
    gap: 3,
    height: "70vh",
    flexDirection: "row-reverse",
  },
  infoPanel: {
    width: "32%",
    p: 3,
    backgroundColor: "#f9f9ff",
    borderRadius: 3,
    boxShadow: 3,
    overflowY: "auto",
  },
  chatArea: {
    width: "65%",
    p: 5,
    borderRadius: 3,
    backgroundColor: "#fff",
    boxShadow: 4,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    mb: 2,
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    mb: 2,
    pr: 1,
    display: "flex",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#1b0099",
      borderRadius: "4px",
    },
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: 2,
    px: 2,
    py: 0.5,
    "&:hover": {
      borderColor: "#1b0099",
    },
  },
  textField: {
    fontSize: "0.9rem",
    "&:hover": {
      color: "#1b0099",
    },
  },
  sendIcon: {
    color: "#1b0099",
  },
  messageBubbleUser: {
    p: 1.2,
    maxWidth: "80%",
    alignSelf: "flex-end",
    backgroundColor: "#cfe2ff",
    color: "#000",
    borderRadius: 2,
  },
  messageBubbleBot: {
    p: 1.2,
    maxWidth: "80%",
    alignSelf: "flex-start",
    backgroundColor: "#2a0a91",
    color: "#fff",
    borderRadius: 2,
  },
};

export default ChatbotStyles;
