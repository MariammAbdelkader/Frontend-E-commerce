const ChatbotStyles = {
  globalStyles: {
    html: { margin: 0, padding: 0, height: "100%" },
    body: { margin: 0, padding: 0, height: "100%", backgroundColor: "#121212" },
    "#root": { height: "100%" },
  },

  container: {
    height: "100vh",
    display: "flex",
    overflow: "hidden",
    backgroundColor: "#121212",
  },

  sidebar: {
    width: 260,
    bgcolor: "#1e1e1e",
    p: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid #333",
  },

  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },

  sidebarIconBtn: {
    color: "#fff",
    mr: 1,
  },

  sidebarTitle: {
    fontWeight: "bold",
    color: "#fff",
    noWrap: true,
  },

  newChatBtn: {
    mb: 2,
    borderRadius: 3,
    backgroundColor: "#00bcd4",
    color: "#000",
    "&:hover": { backgroundColor: "#00acc1" },
  },

  recentChatsTitle: {
    fontWeight: "bold",
    mt: 3,
    mb: 1,
    color: "#ccc",
  },

  listItem: {
    color: "#fff",
    cursor: "pointer",
    "&.Mui-selected": {
      backgroundColor: "#333",
      fontWeight: "bold",
    },
    "&:hover": {
      backgroundColor: "#222",
    },
  },

  mainContent: {
    flex: 1,
    p: 4,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },

  avatar: {
    mx: "auto",
    width: 60,
    height: 60,
    backgroundColor: "#444",
    mb: 1,
  },

  welcomeText: {
    fontWeight: "bold",
    color: "#fff",
  },

  subtitleText: {
    color: "#aaa",
    mb: 2,
  },

  messagesBox: {
    flex: 1,
    bgcolor: "#1e1e1e",
    borderRadius: 3,
    p: 2,
    mb: 2,
    overflow: "auto",
    scrollbarWidth: "thin",
  },

  messageBubbleBot: {
    mb: 1,
    maxWidth: "75%",
    ml: 0,
    bgcolor: "#333",
    color: "#fff",
    p: 1.5,
    borderRadius: 2,
    wordBreak: "break-word",
  },

  messageBubbleUser: {
    mb: 1,
    maxWidth: "75%",
    ml: "auto",
    bgcolor: "#00bcd4",
    color: "#000",
    p: 1.5,
    borderRadius: 2,
    wordBreak: "break-word",
  },

  inputField: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    borderRadius: 3,
    input: { color: "#fff" },
  },

  inputProps: {
    style: { color: "#fff" },
  },

  sendBtn: {
    ml: 1,
    backgroundColor: "#00bcd4",
    color: "#000",
  },

  errorText: {
    color: "error.main",
    mt: 1,
    fontSize: 12,
  },

  endConversationBox: {
    mt: 2,
    textAlign: "right",
  },
  endConversationButton: {
    borderColor: "#d32f2f",
    color: "#d32f2f",
    fontWeight: "bold",
    textTransform: "none",
    padding: "6px 16px",
    "&:hover": {
      backgroundColor: "#d32f2f",
      color: "#fff",
      borderColor: "#d32f2f",
    },
    "&:disabled": {
      borderColor: "#f4a3a3",
      color: "#f4a3a3",
    },
    borderRadius: "8px",
  },
};

export default ChatbotStyles;
