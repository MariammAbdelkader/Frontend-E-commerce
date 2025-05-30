import React from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Button,
  GlobalStyles,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon, ArrowForward, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ChatbotStyles from "./ChatbotStyles";
import useChatbot from "./ChatbotContainer";

const ProductAssistant = () => {
  const navigate = useNavigate();

  const {
    messages,
    setMessages,
    input,
    setInput,
    loading,
    error,
    activeChat,
    setActiveChat,
    messagesEndRef,
    startAndFetch,
    handleSendMessage,
    handleInputChange,
    handleKeyPress,
    handleEndConversation,
    handleSelectChat,
  } = useChatbot();

  const goToStore = () => {
    navigate("/store");
  };

  const listItemStyle = ChatbotStyles.listItem;

  return (
    <>
      <GlobalStyles styles={ChatbotStyles.globalStyles} />

      <Box sx={ChatbotStyles.container}>
        {/* Sidebar */}
        <Box sx={ChatbotStyles.sidebar}>
          <Box>
            <Box sx={ChatbotStyles.sidebarHeader}>
              <IconButton
                onClick={goToStore}
                sx={ChatbotStyles.sidebarIconBtn}
                aria-label="Return to store">
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" sx={ChatbotStyles.sidebarTitle} noWrap>
                Shophoria
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={ChatbotStyles.newChatBtn}
              fullWidth
              onClick={() => {
                setActiveChat(null);
                setMessages([
                  {
                    from: "bot",
                    text: "Hi, I'm Kimmy, your AI assistant! How can I help you today?",
                  },
                ]);
                setInput("");
                startAndFetch();
              }}>
              New Chat
            </Button>

            <Typography sx={ChatbotStyles.recentChatsTitle}>
              Recent Chats
            </Typography>
            <List dense>
              <ListItem
                button
                sx={listItemStyle}
                selected={activeChat === "help-sneakers"}
                onClick={() => handleSelectChat("help-sneakers")}>
                <ListItemText primary="🛒 Help buying sneakers" />
              </ListItem>
              <ListItem
                button
                sx={listItemStyle}
                selected={activeChat === "best-headphones"}
                onClick={() => handleSelectChat("best-headphones")}>
                <ListItemText primary="🎧 Best headphones under $100" />
              </ListItem>
              <ListItem
                button
                sx={listItemStyle}
                selected={activeChat === "track-order"}
                onClick={() => handleSelectChat("track-order")}>
                <ListItemText primary="📦 Track my order" />
              </ListItem>
            </List>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={ChatbotStyles.mainContent}>
          <Box textAlign="center" mb={4}>
            <Avatar sx={ChatbotStyles.avatar}>🛍️</Avatar>
            <Typography variant="h5" sx={ChatbotStyles.welcomeText}>
              Welcome, Shopper! 👋
            </Typography>
            <Typography sx={ChatbotStyles.subtitleText}>
              Need help choosing the right product? I’m here to assist you every
              step of the way.
            </Typography>
          </Box>

          {/* Chat messages area */}
          <Box sx={ChatbotStyles.messagesBox}>
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={
                  msg.from === "bot"
                    ? ChatbotStyles.messageBubbleBot
                    : ChatbotStyles.messageBubbleUser
                }>
                {msg.text}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input and send button */}
          <Box display="flex" alignItems="center">
            <TextField
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              disabled={loading}
              sx={ChatbotStyles.inputField}
              InputProps={ChatbotStyles.inputProps}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              sx={ChatbotStyles.sendBtn}
              aria-label="Send message">
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <ArrowForward />
              )}
            </IconButton>
          </Box>

          {/* Optionally, error message */}
          {error && (
            <Typography sx={ChatbotStyles.errorText}>{error}</Typography>
          )}

          {/* End conversation button */}
          <Box sx={ChatbotStyles.endConversationBox}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEndConversation}
              disabled={loading}
              size="small"
              sx={ChatbotStyles.endConversationButton}>
              End Conversation
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductAssistant;
