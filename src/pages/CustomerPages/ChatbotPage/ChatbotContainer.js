import { useState, useEffect, useRef } from "react";
import {
  startConversation,
  sendMessage,
  getConversationMessages,
  deleteConversation,
} from "../../../Services/ChatbotServices";

export default function useChatbot() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I'm Kimmy, your AI assistant! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const messagesEndRef = useRef(null);

  const startAndFetch = async () => {
    setLoading(true);
    setError(null);
    const startResponse = await startConversation();
    if (startResponse.success) {
      setConversationId(startResponse.data.conversationId);
      const messagesResponse = await getConversationMessages();
      setLoading(false);
      if (
        messagesResponse.success &&
        messagesResponse.data &&
        messagesResponse.data.messages
      ) {
        setMessages([
          {
            from: "bot",
            text: "Hi, I'm Kimmy, your AI assistant! How can I help you today?",
          },
          ...messagesResponse.data.messages.map((msg) => ({
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

  const handleSendMessage = async () => {
    if (!input.trim() || !conversationId) return;
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
      setMessages([
        {
          from: "bot",
          text: "Hi, I'm Kimmy, your AI assistant! How can I help you today?",
        },
      ]);
      setConversationId(null);
      startAndFetch();
    } else {
      setError(response.error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    startAndFetch();
  }, []);

  const handleSelectChat = (chatKey) => {
    setActiveChat(chatKey);
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    setConversationId,
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
  };
}
