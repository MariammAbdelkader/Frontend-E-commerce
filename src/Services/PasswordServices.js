import axios from "axios";
import { handleError } from "../utilities/Errorhandling";

import apiUrl from "../config/index";
const API_BASE_URL = `${apiUrl}/auth`;

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/request-password-change`,
      { currentPassword, newPassword },
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    console.log(response.data);

    return { message: response.data.message };
  } catch (error) {
    console.error("Error changing password:", error);
    return handleError(error);
  }
}

export const sendOtp = async ({ otp}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/verify-password-change`,
      { otp },
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    console.log(response.data);

    return { message: response.data.message };
  } catch (error) {
    console.error("Error changing password:", error);
    return handleError(error);
  }
}


export const forgotPassword = async ({email}) => {
  try {
    console.log(email)
    const response = await axios.post(
      `${API_BASE_URL}/request-password-reset`,
      {email},
      {
        withCredentials: true, 
      }
    );
    console.log(response.data);

    return { message: response.data.message };
  } catch (error) {
    console.error("Error changing password:", error);
    return handleError(error);
  }
}

export const sendOtpForgotPassword = async ({ email, otp, newPassword }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/verify-password-reset`,
      {  email, otp, newPassword  },
      {
        withCredentials: true, // Ensures cookies are sent with the request
      }
    );
    console.log(response.data);

    return { message: response.data.message };
  } catch (error) {
    console.error("Error changing password:", error);
    return handleError(error);
  }
}

