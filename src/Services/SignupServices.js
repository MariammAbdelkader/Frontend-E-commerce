import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;


export const signupUser = async (userData) => {
  try {

    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData, {
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
