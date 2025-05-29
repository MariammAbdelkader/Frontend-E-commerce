import axios from "axios";


import apiUrl from "../config/index"
const API_BASE_URL = `${apiUrl}`;

export const logout = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Ensures cookies (JWT) are sent & received
    });
  
    // console.log("Logout response:", response.data.message);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Server error. Please try again.",
    };
  }
};
