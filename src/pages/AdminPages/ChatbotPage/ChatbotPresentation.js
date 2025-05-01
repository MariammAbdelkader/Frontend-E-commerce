import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatbotStyles from "./ChatbotStyles";

const ChatBotUI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I'm Kimmy, your AI assistant! How can I help you today?",
    },
  ]);

  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Thanks for your message! (Simulated response)",
        },
      ]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={ChatbotStyles.wrapper}>
      {/* RIGHT SECTION - Info Panel */}
      <Box sx={ChatbotStyles.infoPanel}>
        <Typography variant="h5" fontWeight="bold" color="#1b0099" mb={2}>
          Meet Kimmy 🤖
        </Typography>
        <Typography variant="body1" mb={2}>
          Kimmy is your AI assistant ready to help you with anything on the
          platform.
        </Typography>
        <Typography variant="body1">Here’s what you can do:</Typography>

        <List dense>
          {[
            "Add or update your products",
            "Apply and manage discounts",
            "Search for items quickly",
            "Get step-by-step guidance",
            "Interact using natural language",
          ].map((feature, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: "#1b0099" }} />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* LEFT SECTION - Chat Interface */}
      <Box sx={ChatbotStyles.chatArea}>
        <Typography variant="h6" sx={ChatbotStyles.title}>
          Hello Mohamed 👋!
        </Typography>

        <Box sx={ChatbotStyles.scrollArea}>
          <Stack spacing={1.5}>
            {messages.map((msg, i) => (
              <Paper
                key={i}
                sx={
                  msg.from === "user"
                    ? ChatbotStyles.messageBubbleUser
                    : ChatbotStyles.messageBubbleBot
                }>
                {msg.text}
              </Paper>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
        </Box>

        <Box sx={ChatbotStyles.inputContainer}>
          <TextField
            variant="standard"
            fullWidth
            placeholder="Say what you want and Kimmy will surprise you........."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              disableUnderline: true,
              sx: ChatbotStyles.textField,
            }}
          />
          <IconButton sx={ChatbotStyles.sendIcon} onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBotUI;
