import axios from "axios";
import { handleError } from "../utilities/Errorhandling";


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
    return handleError(error)
    
  }
};


// export const loginWithGoogle = async (token) => {
//   const res = await axios.post(
//     `${API_BASE_URL}/auth/google`,
//     { token },
//     {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     }
//   );

//   return res.data;
// };

export const loginWithGoogle = async (token) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/auth/google`,
      { token },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Google login failed. Please try again.",
    };
  }
};