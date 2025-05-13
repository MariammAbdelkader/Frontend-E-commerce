// src/pages/ChatbotPage/ChatbotContainer.js
import React, { useState, useEffect, useRef } from "react";
import ChatbotUIContent from "./ChatbotUIContent";
import {
    startConversation,
    sendMessage,
    getConversationMessages,
    deleteConversation,
} from "./ChatbotServices"; // Corrected import

const ChatbotContainer = () => {
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi, I'm Kimmy, your AI assistant! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    const startAndFetch = async () => { // Moved outside useEffect
        setLoading(true);
        const startResponse = await startConversation();
        if (startResponse.success) {
            setConversationId(startResponse.data.conversationId);
            const messagesResponse = await getConversationMessages();
            setLoading(false);
            if (messagesResponse.success && messagesResponse.data && messagesResponse.data.messages) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    ...messagesResponse.data.messages.map(msg => ({
                        from: msg.senderType,
                        text: msg.messageContent,
                    })),
                ]);
            } else if (messagesResponse.error) {
                setError(messagesResponse.error);
            }
        } else if (startResponse.error) {
            setLoading(false);
            setError(startResponse.error);
        }
    };

    useEffect(() => {
        startAndFetch(); // Call it here
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendMessage = async () => {
        if (!input.trim() || !conversationId) return;
        console.log(`body details:  ${input } , ${conversationId}`)
        const newMessage = { from: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput("");

        setLoading(true);
        const response = await sendMessage(conversationId, input);
        setLoading(false);

        if (response.success) {
            const botReply = { from: "bot", text: response.data.reply };
            setMessages((prevMessages) => [...prevMessages, botReply]);
        } else {
            setError(response.error);
            // Optionally, add the user's message back if sending failed
            // setMessages((prevMessages) => prevMessages.slice(0, -1));
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !loading) {
            handleSendMessage();
        }
    };

    const handleEndConversation = async () => {
        setLoading(true);
        const response = await deleteConversation();
        setLoading(false);
        if (response.success) {
            setMessages([{ from: "bot", text: "Hi, I'm Kimmy, your AI assistant! How can I help you today?" }]);
            setConversationId(null);
            startAndFetch(); // Call it here
        } else {
            setError(response.error);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <ChatbotUIContent
            messages={messages}
            input={input}
            onInputChange={handleInputChange}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            messagesEndRef={messagesEndRef}
            loading={loading}
            error={error}
            onEndConversation={handleEndConversation}
        />
    );
};

export default ChatbotContainer;