import axios from "axios";


import apiUrl from "../config/index"
const API_BASE_URL = `${apiUrl}`;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Ensures cookies (JWT) are sent & received
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Server error. Please try again.",
    };
  }
};

export const loginWithGoogle = async (googleToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/google-login`, { token: googleToken }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Google login failed. Please try again.",
    };
  }
};
