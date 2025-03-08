import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const signupUser = async (userData) => {
  try {

    const response = await axios.post(`${API_BASE_URL}/signup`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Ensures cookies (JWT) are sent & received
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong. Please try again later.",
    };
  }
};
