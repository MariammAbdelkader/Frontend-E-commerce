// src/pages/ChatbotPage/ChatbotUIContent.js
import React, { useEffect,useState, useRef } from "react";
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
    Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatbotStyles from "./ChatbotStyles";

import { getCustomerProfile} from "../../../Services/CustomerServices";


const ChatbotUIContent = ({
    messages,
    input,
    onInputChange,
    onSendMessage,
    onKeyPress,
    messagesEndRef,
    loading,
    error,
    onEndConversation,
}) => {


    const [profiledata,setProfileData] =useState("");

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, messagesEndRef]);

    
    useEffect(()=>{
        const fetchProfile= async()=>{
            const data= await getCustomerProfile();
            setProfileData(data.profile)
        }
        fetchProfile();
    }
    ,[])


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
                    Hello  {profiledata.firstName}👋!
                </Typography>

                <Box sx={ChatbotStyles.scrollArea}>
                    <Stack spacing={1.5}>
                        {messages && messages.map((msg, i) => (
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
                        onChange={onInputChange}
                        onKeyPress={onKeyPress}
                        InputProps={{
                            disableUnderline: true,
                            sx: ChatbotStyles.textField,
                        }}
                    />
                    <IconButton sx={ChatbotStyles.sendIcon} onClick={onSendMessage}>
                        <SendIcon />
                    </IconButton>
                </Box>

                {loading && <Typography>Loading...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                {onEndConversation && (
                    <Button onClick={onEndConversation} sx={{ mt: 2 }}>
                        End Conversation
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ChatbotUIContent;