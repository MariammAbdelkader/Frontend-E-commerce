// src/services/chatbotService.js
// src/pages/ChatbotPage/ChatbotServices.js
import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/chatbot`; 

console.log("[ChatbotService] API_BASE_URL:", API_BASE_URL);

export const startConversation = async () => {
  try {
    console.log("[startConversation] Sending request to:", `${API_BASE_URL}/start-conversation`);
    const response = await axios.post(
        `${API_BASE_URL}/start-conversation`, 
        {}, 
        { withCredentials: true }
    );
    console.log("[startConversation] Response:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("[startConversation] Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error || "Failed to start conversation.",
    };
  }
};

export const sendMessage = async (conversationId, message) => {
  try {
    console.log("[sendMessage] Sending request to:", `${API_BASE_URL}/sendmessage`);
    console.log("[sendMessage] Payload:", { conversationId, message });
    const response = await axios.post(
      `${API_BASE_URL}/sendmessage`,
       { 
        conversationId: String(conversationId), 
        message: String(message) 
      },
      { 
        headers: { "Content-Type": "application/json" },
        withCredentials: true 
      });
    console.log("[sendMessage] Response:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("[sendMessage] Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.reply || "Failed to send message.",
    };
  }
};

export const getConversationMessages = async () => {
  try {
    console.log("[getConversationMessages] Sending request to:", `${API_BASE_URL}/chat`);
    const response = await axios.get(
        `${API_BASE_URL}/chat`
        , { withCredentials: true }
    );
    console.log("[getConversationMessages] Response:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("[getConversationMessages] Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error || "Failed to fetch messages.",
    };
  }
};

export const deleteConversation = async () => {
  try {
    console.log("[deleteConversation] Sending request to:", `${API_BASE_URL}/delete-conversation`);
    const response = await axios.delete(
        `${API_BASE_URL}/delete-conversation`
        , { withCredentials: true }
    );
    console.log("[deleteConversation] Response:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("[deleteConversation] Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error || "Failed to delete conversation.",
    };
  }
};